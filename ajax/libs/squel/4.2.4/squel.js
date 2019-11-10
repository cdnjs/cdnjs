/*
Copyright (c) 2014 Ramesh Nair (hiddentao.com)

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
*/


(function() {
  var getValueHandler, registerValueHandler, squel, _buildSquel, _clone, _extend, _isArray, _isPlainObject,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _extend = function() {
    var dst, k, sources, src, v, _i, _len;
    dst = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (sources) {
      for (_i = 0, _len = sources.length; _i < _len; _i++) {
        src = sources[_i];
        if (src) {
          for (k in src) {
            if (!__hasProp.call(src, k)) continue;
            v = src[k];
            dst[k] = v;
          }
        }
      }
    }
    return dst;
  };

  _isPlainObject = function(obj) {
    return obj.constructor.prototype === Object.prototype;
  };

  _isArray = function(obj) {
    return obj.constructor.prototype === Array.prototype;
  };

  _clone = function(src) {
    var k, ret, v;
    if (!src) {
      return src;
    }
    if ('function' === typeof src.clone) {
      return src.clone();
    } else if (_isPlainObject(src) || _isArray(src)) {
      ret = new src.constructor;
      for (k in src) {
        if (!__hasProp.call(src, k)) continue;
        v = src[k];
        if ('function' !== typeof v) {
          ret[k] = _clone(v);
        }
      }
      return ret;
    } else {
      return JSON.parse(JSON.stringify(src));
    }
  };

  registerValueHandler = function(handlers, type, handler) {
    var typeHandler, _i, _len;
    if ('function' !== typeof type && 'string' !== typeof type) {
      throw new Error("type must be a class constructor or string denoting 'typeof' result");
    }
    if ('function' !== typeof handler) {
      throw new Error("handler must be a function");
    }
    for (_i = 0, _len = handlers.length; _i < _len; _i++) {
      typeHandler = handlers[_i];
      if (typeHandler.type === type) {
        typeHandler.handler = handler;
        return;
      }
    }
    return handlers.push({
      type: type,
      handler: handler
    });
  };

  getValueHandler = function() {
    var handlerLists, handlers, typeHandler, value, _i, _j, _len, _len1;
    value = arguments[0], handlerLists = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = handlerLists.length; _i < _len; _i++) {
      handlers = handlerLists[_i];
      for (_j = 0, _len1 = handlers.length; _j < _len1; _j++) {
        typeHandler = handlers[_j];
        if (typeHandler.type === typeof value || (typeof typeHandler.type !== 'string' && value instanceof typeHandler.type)) {
          return typeHandler.handler;
        }
      }
    }
    return void 0;
  };

  _buildSquel = function(flavour) {
    var cls, _ref, _ref1, _ref2, _ref3, _ref4, _ref5, _squel;
    if (flavour == null) {
      flavour = null;
    }
    cls = {};
    cls.DefaultQueryBuilderOptions = {
      autoQuoteTableNames: false,
      autoQuoteFieldNames: false,
      autoQuoteAliasNames: true,
      nameQuoteCharacter: '`',
      tableAliasQuoteCharacter: '`',
      fieldAliasQuoteCharacter: '"',
      valueHandlers: [],
      parameterCharacter: '?',
      numberedParameters: false,
      numberedParametersPrefix: '$',
      numberedParametersStartAt: 1,
      replaceSingleQuotes: false,
      singleQuoteReplacement: '\'\'',
      separator: ' '
    };
    cls.globalValueHandlers = [];
    cls.registerValueHandler = function(type, handler) {
      return registerValueHandler(cls.globalValueHandlers, type, handler);
    };
    cls.Cloneable = (function() {
      function Cloneable() {}

      Cloneable.prototype.clone = function() {
        var newInstance;
        newInstance = new this.constructor;
        return _extend(newInstance, _clone(_extend({}, this)));
      };

      return Cloneable;

    })();
    cls.BaseBuilder = (function(_super) {
      __extends(BaseBuilder, _super);

      function BaseBuilder(options) {
        this._sanitizeNestableQuery = __bind(this._sanitizeNestableQuery, this);
        var defaults;
        defaults = JSON.parse(JSON.stringify(cls.DefaultQueryBuilderOptions));
        this.options = _extend({}, defaults, options);
      }

      BaseBuilder.prototype.registerValueHandler = function(type, handler) {
        registerValueHandler(this.options.valueHandlers, type, handler);
        return this;
      };

      BaseBuilder.prototype._getObjectClassName = function(obj) {
        var arr;
        if (obj && obj.constructor && obj.constructor.toString) {
          arr = obj.constructor.toString().match(/function\s*(\w+)/);
          if (arr && arr.length === 2) {
            return arr[1];
          }
        }
        return void 0;
      };

      BaseBuilder.prototype._sanitizeCondition = function(condition) {
        if (!(condition instanceof cls.Expression)) {
          if ("string" !== typeof condition) {
            throw new Error("condition must be a string or Expression instance");
          }
        }
        return condition;
      };

      BaseBuilder.prototype._sanitizeName = function(value, type) {
        if ("string" !== typeof value) {
          throw new Error("" + type + " must be a string");
        }
        return value;
      };

      BaseBuilder.prototype._sanitizeField = function(item, formattingOptions) {
        var quoteChar;
        if (formattingOptions == null) {
          formattingOptions = {};
        }
        if (item instanceof cls.QueryBuilder) {
          item = "(" + item + ")";
        } else {
          item = this._sanitizeName(item, "field name");
          if (this.options.autoQuoteFieldNames) {
            quoteChar = this.options.nameQuoteCharacter;
            if (formattingOptions.ignorePeriodsForFieldNameQuotes) {
              item = "" + quoteChar + item + quoteChar;
            } else {
              item = item.split('.').map(function(v) {
                if ('*' === v) {
                  return v;
                } else {
                  return "" + quoteChar + v + quoteChar;
                }
              }).join('.');
            }
          }
        }
        return item;
      };

      BaseBuilder.prototype._sanitizeNestableQuery = function(item) {
        if (item instanceof cls.QueryBuilder && item.isNestable()) {
          return item;
        }
        throw new Error("must be a nestable query, e.g. SELECT");
      };

      BaseBuilder.prototype._sanitizeTable = function(item, allowNested) {
        var e, sanitized;
        if (allowNested == null) {
          allowNested = false;
        }
        if (allowNested) {
          if ("string" === typeof item) {
            sanitized = item;
          } else {
            try {
              sanitized = this._sanitizeNestableQuery(item);
            } catch (_error) {
              e = _error;
              throw new Error("table name must be a string or a nestable query instance");
            }
          }
        } else {
          sanitized = this._sanitizeName(item, 'table name');
        }
        if (this.options.autoQuoteTableNames) {
          return "" + this.options.nameQuoteCharacter + sanitized + this.options.nameQuoteCharacter;
        } else {
          return sanitized;
        }
      };

      BaseBuilder.prototype._sanitizeTableAlias = function(item) {
        var sanitized;
        sanitized = this._sanitizeName(item, "table alias");
        if (this.options.autoQuoteAliasNames) {
          return "" + this.options.tableAliasQuoteCharacter + sanitized + this.options.tableAliasQuoteCharacter;
        } else {
          return sanitized;
        }
      };

      BaseBuilder.prototype._sanitizeFieldAlias = function(item) {
        var sanitized;
        sanitized = this._sanitizeName(item, "field alias");
        if (this.options.autoQuoteAliasNames) {
          return "" + this.options.fieldAliasQuoteCharacter + sanitized + this.options.fieldAliasQuoteCharacter;
        } else {
          return sanitized;
        }
      };

      BaseBuilder.prototype._sanitizeLimitOffset = function(value) {
        value = parseInt(value);
        if (0 > value || isNaN(value)) {
          throw new Error("limit/offset must be >= 0");
        }
        return value;
      };

      BaseBuilder.prototype._sanitizeValue = function(item) {
        var itemType, typeIsValid;
        itemType = typeof item;
        if (null === item) {

        } else if ("string" === itemType || "number" === itemType || "boolean" === itemType) {

        } else if (item instanceof cls.QueryBuilder && item.isNestable()) {

        } else if (item instanceof cls.FunctionBlock) {

        } else {
          typeIsValid = void 0 !== getValueHandler(item, this.options.valueHandlers, cls.globalValueHandlers);
          if (!typeIsValid) {
            throw new Error("field value must be a string, number, boolean, null or one of the registered custom value types");
          }
        }
        return item;
      };

      BaseBuilder.prototype._escapeValue = function(value) {
        if (true !== this.options.replaceSingleQuotes) {
          return value;
        }
        return value.replace(/\'/g, this.options.singleQuoteReplacement);
      };

      BaseBuilder.prototype._formatCustomValue = function(value, asParam) {
        var customHandler;
        if (asParam == null) {
          asParam = false;
        }
        customHandler = getValueHandler(value, this.options.valueHandlers, cls.globalValueHandlers);
        if (customHandler) {
          value = customHandler(value, asParam);
        }
        return value;
      };

      BaseBuilder.prototype._formatValueAsParam = function(value) {
        var p,
          _this = this;
        if (Array.isArray(value)) {
          return value.map(function(v) {
            return _this._formatValueAsParam(v);
          });
        } else {
          if (value instanceof cls.QueryBuilder && value.isNestable()) {
            value.updateOptions({
              "nestedBuilder": true
            });
            return p = value.toParam();
          } else if (value instanceof cls.Expression) {
            return p = value.toParam();
          } else {
            return this._formatCustomValue(value, true);
          }
        }
      };

      BaseBuilder.prototype._formatValue = function(value, formattingOptions) {
        var customFormattedValue, escapedValue,
          _this = this;
        if (formattingOptions == null) {
          formattingOptions = {};
        }
        customFormattedValue = this._formatCustomValue(value);
        if (customFormattedValue !== value) {
          return "(" + customFormattedValue + ")";
        }
        if (Array.isArray(value)) {
          value = value.map(function(v) {
            return _this._formatValue(v);
          });
          value = "(" + (value.join(', ')) + ")";
        } else {
          if (null === value) {
            value = "NULL";
          } else if ("boolean" === typeof value) {
            value = value ? "TRUE" : "FALSE";
          } else if (value instanceof cls.QueryBuilder) {
            value = "(" + value + ")";
          } else if (value instanceof cls.Expression) {
            value = "(" + value + ")";
          } else if ("number" !== typeof value) {
            if (formattingOptions.dontQuote) {
              value = "" + value;
            } else {
              escapedValue = this._escapeValue(value);
              value = "'" + escapedValue + "'";
            }
          }
        }
        return value;
      };

      return BaseBuilder;

    })(cls.Cloneable);
    cls.Expression = (function(_super) {
      __extends(Expression, _super);

      Expression.prototype.tree = null;

      Expression.prototype.current = null;

      function Expression(options) {
        var defaults,
          _this = this;
        Expression.__super__.constructor.call(this);
        defaults = JSON.parse(JSON.stringify(cls.DefaultQueryBuilderOptions));
        this.options = _extend({}, defaults, options);
        this.tree = {
          parent: null,
          nodes: []
        };
        this.current = this.tree;
        this._begin = function(op) {
          var new_tree;
          new_tree = {
            type: op,
            parent: _this.current,
            nodes: []
          };
          _this.current.nodes.push(new_tree);
          _this.current = _this.current.nodes[_this.current.nodes.length - 1];
          return _this;
        };
      }

      Expression.prototype.and_begin = function() {
        return this._begin('AND');
      };

      Expression.prototype.or_begin = function() {
        return this._begin('OR');
      };

      Expression.prototype.end = function() {
        if (!this.current.parent) {
          throw new Error("begin() needs to be called");
        }
        this.current = this.current.parent;
        return this;
      };

      Expression.prototype.and = function(expr, param) {
        if (!expr || "string" !== typeof expr) {
          throw new Error("expr must be a string");
        }
        this.current.nodes.push({
          type: 'AND',
          expr: expr,
          para: param
        });
        return this;
      };

      Expression.prototype.or = function(expr, param) {
        if (!expr || "string" !== typeof expr) {
          throw new Error("expr must be a string");
        }
        this.current.nodes.push({
          type: 'OR',
          expr: expr,
          para: param
        });
        return this;
      };

      Expression.prototype.toString = function() {
        if (null !== this.current.parent) {
          throw new Error("end() needs to be called");
        }
        return this._toString(this.tree);
      };

      Expression.prototype.toParam = function() {
        if (null !== this.current.parent) {
          throw new Error("end() needs to be called");
        }
        return this._toString(this.tree, true);
      };

      Expression.prototype._toString = function(node, paramMode) {
        var child, cv, inStr, nodeStr, params, str, _i, _len, _ref,
          _this = this;
        if (paramMode == null) {
          paramMode = false;
        }
        str = "";
        params = [];
        _ref = node.nodes;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          child = _ref[_i];
          if (child.expr != null) {
            nodeStr = child.expr;
            if (void 0 !== child.para) {
              if (!paramMode) {
                nodeStr = nodeStr.replace(this.options.parameterCharacter, this._formatValue(child.para));
              } else {
                cv = this._formatValueAsParam(child.para);
                if (((cv != null ? cv.text : void 0) != null)) {
                  params = params.concat(cv.values);
                  nodeStr = nodeStr.replace(this.options.parameterCharacter, "(" + cv.text + ")");
                } else {
                  params = params.concat(cv);
                }
                if (Array.isArray(child.para)) {
                  inStr = Array.apply(null, new Array(child.para.length)).map(function() {
                    return _this.options.parameterCharacter;
                  });
                  nodeStr = nodeStr.replace(this.options.parameterCharacter, "(" + (inStr.join(', ')) + ")");
                }
              }
            }
          } else {
            nodeStr = this._toString(child, paramMode);
            if (paramMode) {
              params = params.concat(nodeStr.values);
              nodeStr = nodeStr.text;
            }
            if ("" !== nodeStr) {
              nodeStr = "(" + nodeStr + ")";
            }
          }
          if ("" !== nodeStr) {
            if ("" !== str) {
              str += " " + child.type + " ";
            }
            str += nodeStr;
          }
        }
        if (paramMode) {
          return {
            text: str,
            values: params
          };
        } else {
          return str;
        }
      };

      /*
      Clone this expression.
      
      Note that the algorithm contained within this method is probably non-optimal, so please avoid cloning large
      expression trees.
      */


      Expression.prototype.clone = function() {
        var newInstance, _cloneTree;
        newInstance = new this.constructor;
        (_cloneTree = function(node) {
          var child, _i, _len, _ref, _results;
          _ref = node.nodes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            if (child.expr != null) {
              _results.push(newInstance.current.nodes.push(_clone(child)));
            } else {
              newInstance._begin(child.type);
              _cloneTree(child);
              if (!this.current === child) {
                _results.push(newInstance.end());
              } else {
                _results.push(void 0);
              }
            }
          }
          return _results;
        })(this.tree);
        return newInstance;
      };

      return Expression;

    })(cls.BaseBuilder);
    cls.Block = (function(_super) {
      __extends(Block, _super);

      function Block() {
        _ref = Block.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Block.prototype.exposedMethods = function() {
        var attr, ret, value;
        ret = {};
        for (attr in this) {
          value = this[attr];
          if (typeof value === "function" && attr.charAt(0) !== '_' && !cls.Block.prototype[attr]) {
            ret[attr] = value;
          }
        }
        return ret;
      };

      Block.prototype.buildStr = function(queryBuilder) {
        return '';
      };

      Block.prototype.buildParam = function(queryBuilder) {
        return {
          text: this.buildStr(queryBuilder),
          values: []
        };
      };

      return Block;

    })(cls.BaseBuilder);
    cls.StringBlock = (function(_super) {
      __extends(StringBlock, _super);

      function StringBlock(options, str) {
        StringBlock.__super__.constructor.call(this, options);
        this.str = str;
      }

      StringBlock.prototype.buildStr = function(queryBuilder) {
        return this.str;
      };

      return StringBlock;

    })(cls.Block);
    cls.AbstractValueBlock = (function(_super) {
      __extends(AbstractValueBlock, _super);

      function AbstractValueBlock(options) {
        AbstractValueBlock.__super__.constructor.call(this, options);
        this._str = '';
        this._values = [];
      }

      AbstractValueBlock.prototype._setValue = function() {
        var str, values;
        str = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        this._str = str;
        this._values = values;
        return this;
      };

      AbstractValueBlock.prototype.buildStr = function(queryBuilder) {
        var c, finalStr, idx, str, values, _i, _ref1;
        str = this._str;
        finalStr = '';
        values = [].concat(this._values);
        for (idx = _i = 0, _ref1 = str.length; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; idx = 0 <= _ref1 ? ++_i : --_i) {
          c = str.charAt(idx);
          if (this.options.parameterCharacter === c && 0 < values.length) {
            c = values.shift();
          }
          finalStr += c;
        }
        return finalStr;
      };

      AbstractValueBlock.prototype.buildParam = function(queryBuilder) {
        return {
          text: this._str,
          values: this._values
        };
      };

      return AbstractValueBlock;

    })(cls.Block);
    cls.FunctionBlock = (function(_super) {
      __extends(FunctionBlock, _super);

      function FunctionBlock() {
        _ref1 = FunctionBlock.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      FunctionBlock.prototype["function"] = function() {
        var str, values;
        str = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this._setValue.apply(this, [str].concat(values));
      };

      return FunctionBlock;

    })(cls.AbstractValueBlock);
    cls.fval = function() {
      var inst, str, values;
      str = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      inst = new cls.FunctionBlock();
      return inst["function"].apply(inst, [str].concat(values));
    };
    cls.registerValueHandler(cls.FunctionBlock, function(value, asParam) {
      if (asParam == null) {
        asParam = false;
      }
      if (asParam) {
        return value.buildParam();
      } else {
        return value.buildStr();
      }
    });
    cls.AbstractTableBlock = (function(_super) {
      __extends(AbstractTableBlock, _super);

      function AbstractTableBlock(options) {
        AbstractTableBlock.__super__.constructor.call(this, options);
        this.tables = [];
      }

      AbstractTableBlock.prototype._table = function(table, alias) {
        if (alias == null) {
          alias = null;
        }
        if (alias) {
          alias = this._sanitizeTableAlias(alias);
        }
        table = this._sanitizeTable(table, this.options.allowNested || false);
        if (this.options.singleTable) {
          this.tables = [];
        }
        return this.tables.push({
          table: table,
          alias: alias
        });
      };

      AbstractTableBlock.prototype._hasTable = function() {
        return 0 < this.tables.length;
      };

      AbstractTableBlock.prototype.buildStr = function(queryBuilder) {
        var table, tables, _i, _len, _ref2;
        if (!this._hasTable()) {
          return "";
        }
        tables = "";
        _ref2 = this.tables;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          table = _ref2[_i];
          if ("" !== tables) {
            tables += ", ";
          }
          if ("string" === typeof table.table) {
            tables += table.table;
          } else {
            tables += "(" + table.table + ")";
          }
          if (table.alias) {
            tables += " " + table.alias;
          }
        }
        return tables;
      };

      AbstractTableBlock.prototype._buildParam = function(queryBuilder, prefix) {
        var blk, p, paramStr, params, ret, v, _i, _j, _k, _len, _len1, _len2, _ref2, _ref3;
        if (prefix == null) {
          prefix = null;
        }
        ret = {
          text: "",
          values: []
        };
        params = [];
        paramStr = "";
        if (!this._hasTable()) {
          return ret;
        }
        _ref2 = this.tables;
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          blk = _ref2[_i];
          if ("string" === typeof blk.table) {
            p = {
              "text": "" + blk.table,
              "values": []
            };
          } else if (blk.table instanceof cls.QueryBuilder) {
            blk.table.updateOptions({
              "nestedBuilder": true
            });
            p = blk.table.toParam();
          } else {
            blk.updateOptions({
              "nestedBuilder": true
            });
            p = blk.buildParam(queryBuilder);
          }
          p.table = blk;
          params.push(p);
        }
        for (_j = 0, _len1 = params.length; _j < _len1; _j++) {
          p = params[_j];
          if (paramStr !== "") {
            paramStr += ", ";
          } else {
            if ((prefix != null) && prefix !== "") {
              paramStr += "" + prefix + " " + paramStr;
            }
            paramStr;
          }
          if ("string" === typeof p.table.table) {
            paramStr += "" + p.text;
          } else {
            paramStr += "(" + p.text + ")";
          }
          if (p.table.alias != null) {
            paramStr += " " + p.table.alias;
          }
          _ref3 = p.values;
          for (_k = 0, _len2 = _ref3.length; _k < _len2; _k++) {
            v = _ref3[_k];
            ret.values.push(this._formatCustomValue(v));
          }
        }
        ret.text += paramStr;
        return ret;
      };

      AbstractTableBlock.prototype.buildParam = function(queryBuilder) {
        return this._buildParam(queryBuilder);
      };

      return AbstractTableBlock;

    })(cls.Block);
    cls.UpdateTableBlock = (function(_super) {
      __extends(UpdateTableBlock, _super);

      function UpdateTableBlock() {
        _ref2 = UpdateTableBlock.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      UpdateTableBlock.prototype.table = function(table, alias) {
        if (alias == null) {
          alias = null;
        }
        return this._table(table, alias);
      };

      return UpdateTableBlock;

    })(cls.AbstractTableBlock);
    cls.FromTableBlock = (function(_super) {
      __extends(FromTableBlock, _super);

      function FromTableBlock() {
        _ref3 = FromTableBlock.__super__.constructor.apply(this, arguments);
        return _ref3;
      }

      FromTableBlock.prototype.from = function(table, alias) {
        if (alias == null) {
          alias = null;
        }
        return this._table(table, alias);
      };

      FromTableBlock.prototype.buildStr = function(queryBuilder) {
        var tables;
        tables = FromTableBlock.__super__.buildStr.call(this, queryBuilder);
        if (tables.length) {
          return "FROM " + tables;
        } else {
          return "";
        }
      };

      FromTableBlock.prototype.buildParam = function(queryBuilder) {
        return this._buildParam(queryBuilder, "FROM");
      };

      return FromTableBlock;

    })(cls.AbstractTableBlock);
    cls.IntoTableBlock = (function(_super) {
      __extends(IntoTableBlock, _super);

      function IntoTableBlock(options) {
        IntoTableBlock.__super__.constructor.call(this, options);
        this.table = null;
      }

      IntoTableBlock.prototype.into = function(table) {
        return this.table = this._sanitizeTable(table, false);
      };

      IntoTableBlock.prototype.buildStr = function(queryBuilder) {
        if (!this.table) {
          throw new Error("into() needs to be called");
        }
        return "INTO " + this.table;
      };

      return IntoTableBlock;

    })(cls.Block);
    cls.GetFieldBlock = (function(_super) {
      __extends(GetFieldBlock, _super);

      function GetFieldBlock(options) {
        GetFieldBlock.__super__.constructor.call(this, options);
        this._fieldAliases = {};
        this._fields = [];
      }

      GetFieldBlock.prototype.fields = function(_fields, options) {
        var alias, field, _i, _len, _results, _results1;
        if (options == null) {
          options = {};
        }
        if (Array.isArray(_fields)) {
          _results = [];
          for (_i = 0, _len = _fields.length; _i < _len; _i++) {
            field = _fields[_i];
            _results.push(this.field(field, null, options));
          }
          return _results;
        } else {
          _results1 = [];
          for (field in _fields) {
            alias = _fields[field];
            _results1.push(this.field(field, alias, options));
          }
          return _results1;
        }
      };

      GetFieldBlock.prototype.field = function(field, alias, options) {
        if (alias == null) {
          alias = null;
        }
        if (options == null) {
          options = {};
        }
        field = this._sanitizeField(field, options);
        if (alias) {
          alias = this._sanitizeFieldAlias(alias);
        }
        if (this._fieldAliases[field] === alias) {
          return;
        }
        this._fieldAliases[field] = alias;
        return this._fields.push({
          name: field,
          alias: alias
        });
      };

      GetFieldBlock.prototype.buildStr = function(queryBuilder) {
        var field, fields, _i, _len, _ref4;
        if (!queryBuilder.getBlock(cls.FromTableBlock)._hasTable()) {
          return "";
        }
        fields = "";
        _ref4 = this._fields;
        for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
          field = _ref4[_i];
          if ("" !== fields) {
            fields += ", ";
          }
          fields += field.name;
          if (field.alias) {
            fields += " AS " + field.alias;
          }
        }
        if ("" === fields) {
          return "*";
        } else {
          return fields;
        }
      };

      return GetFieldBlock;

    })(cls.Block);
    cls.AbstractSetFieldBlock = (function(_super) {
      __extends(AbstractSetFieldBlock, _super);

      function AbstractSetFieldBlock(options) {
        AbstractSetFieldBlock.__super__.constructor.call(this, options);
        this.fieldOptions = [];
        this.fields = [];
        this.values = [];
      }

      AbstractSetFieldBlock.prototype._set = function(field, value, options) {
        var index;
        if (options == null) {
          options = {};
        }
        if (this.values.length > 1) {
          throw new Error("Cannot call set or setFields on multiple rows of fields.");
        }
        if (void 0 !== value) {
          value = this._sanitizeValue(value);
        }
        index = this.fields.indexOf(this._sanitizeField(field, options));
        if (index !== -1) {
          this.values[0][index] = value;
          this.fieldOptions[0][index] = options;
        } else {
          this.fields.push(this._sanitizeField(field, options));
          index = this.fields.length - 1;
          if (Array.isArray(this.values[0])) {
            this.values[0][index] = value;
            this.fieldOptions[0][index] = options;
          } else {
            this.values.push([value]);
            this.fieldOptions.push([options]);
          }
        }
        return this;
      };

      AbstractSetFieldBlock.prototype._setFields = function(fields, options) {
        var field;
        if (options == null) {
          options = {};
        }
        if (typeof fields !== 'object') {
          throw new Error("Expected an object but got " + typeof fields);
        }
        for (field in fields) {
          if (!__hasProp.call(fields, field)) continue;
          this._set(field, fields[field], options);
        }
        return this;
      };

      AbstractSetFieldBlock.prototype._setFieldsRows = function(fieldsRows, options) {
        var field, i, index, value, _i, _ref4, _ref5;
        if (options == null) {
          options = {};
        }
        if (!Array.isArray(fieldsRows)) {
          throw new Error("Expected an array of objects but got " + typeof fieldsRows);
        }
        this.fields = [];
        this.values = [];
        for (i = _i = 0, _ref4 = fieldsRows.length; 0 <= _ref4 ? _i < _ref4 : _i > _ref4; i = 0 <= _ref4 ? ++_i : --_i) {
          _ref5 = fieldsRows[i];
          for (field in _ref5) {
            if (!__hasProp.call(_ref5, field)) continue;
            index = this.fields.indexOf(this._sanitizeField(field, options));
            if (0 < i && -1 === index) {
              throw new Error('All fields in subsequent rows must match the fields in the first row');
            }
            if (-1 === index) {
              this.fields.push(this._sanitizeField(field, options));
              index = this.fields.length - 1;
            }
            value = this._sanitizeValue(fieldsRows[i][field]);
            if (Array.isArray(this.values[i])) {
              this.values[i][index] = value;
              this.fieldOptions[i][index] = options;
            } else {
              this.values[i] = [value];
              this.fieldOptions[i] = [options];
            }
          }
        }
        return this;
      };

      AbstractSetFieldBlock.prototype.buildStr = function() {
        throw new Error('Not yet implemented');
      };

      AbstractSetFieldBlock.prototype.buildParam = function() {
        throw new Error('Not yet implemented');
      };

      return AbstractSetFieldBlock;

    })(cls.Block);
    cls.SetFieldBlock = (function(_super) {
      __extends(SetFieldBlock, _super);

      function SetFieldBlock() {
        _ref4 = SetFieldBlock.__super__.constructor.apply(this, arguments);
        return _ref4;
      }

      SetFieldBlock.prototype.set = function(field, value, options) {
        return this._set(field, value, options);
      };

      SetFieldBlock.prototype.setFields = function(fields, options) {
        return this._setFields(fields, options);
      };

      SetFieldBlock.prototype.buildStr = function(queryBuilder) {
        var field, fieldOptions, i, str, value, _i, _ref5;
        if (0 >= this.fields.length) {
          throw new Error("set() needs to be called");
        }
        str = "";
        for (i = _i = 0, _ref5 = this.fields.length; 0 <= _ref5 ? _i < _ref5 : _i > _ref5; i = 0 <= _ref5 ? ++_i : --_i) {
          field = this.fields[i];
          if ("" !== str) {
            str += ", ";
          }
          value = this.values[0][i];
          fieldOptions = this.fieldOptions[0][i];
          if (typeof value === 'undefined') {
            str += field;
          } else {
            str += "" + field + " = " + (this._formatValue(value, fieldOptions));
          }
        }
        return "SET " + str;
      };

      SetFieldBlock.prototype.buildParam = function(queryBuilder) {
        var field, i, p, str, v, vals, value, _i, _j, _len, _ref5, _ref6;
        if (0 >= this.fields.length) {
          throw new Error("set() needs to be called");
        }
        str = "";
        vals = [];
        for (i = _i = 0, _ref5 = this.fields.length; 0 <= _ref5 ? _i < _ref5 : _i > _ref5; i = 0 <= _ref5 ? ++_i : --_i) {
          field = this.fields[i];
          if ("" !== str) {
            str += ", ";
          }
          value = this.values[0][i];
          if (typeof value === 'undefined') {
            str += field;
          } else {
            p = this._formatValueAsParam(value);
            if ((p != null ? p.text : void 0) != null) {
              str += "" + field + " = (" + p.text + ")";
              _ref6 = p.values;
              for (_j = 0, _len = _ref6.length; _j < _len; _j++) {
                v = _ref6[_j];
                vals.push(v);
              }
            } else {
              str += "" + field + " = " + this.options.parameterCharacter;
              vals.push(p);
            }
          }
        }
        return {
          text: "SET " + str,
          values: vals
        };
      };

      return SetFieldBlock;

    })(cls.AbstractSetFieldBlock);
    cls.InsertFieldValueBlock = (function(_super) {
      __extends(InsertFieldValueBlock, _super);

      function InsertFieldValueBlock() {
        _ref5 = InsertFieldValueBlock.__super__.constructor.apply(this, arguments);
        return _ref5;
      }

      InsertFieldValueBlock.prototype.set = function(field, value, options) {
        if (options == null) {
          options = {};
        }
        return this._set(field, value, options);
      };

      InsertFieldValueBlock.prototype.setFields = function(fields, options) {
        return this._setFields(fields, options);
      };

      InsertFieldValueBlock.prototype.setFieldsRows = function(fieldsRows, options) {
        return this._setFieldsRows(fieldsRows, options);
      };

      InsertFieldValueBlock.prototype._buildVals = function() {
        var formattedValue, i, j, vals, _i, _j, _ref6, _ref7;
        vals = [];
        for (i = _i = 0, _ref6 = this.values.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; i = 0 <= _ref6 ? ++_i : --_i) {
          for (j = _j = 0, _ref7 = this.values[i].length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; j = 0 <= _ref7 ? ++_j : --_j) {
            formattedValue = this._formatValue(this.values[i][j], this.fieldOptions[i][j]);
            if ('string' === typeof vals[i]) {
              vals[i] += ', ' + formattedValue;
            } else {
              vals[i] = '' + formattedValue;
            }
          }
        }
        return vals;
      };

      InsertFieldValueBlock.prototype._buildValParams = function() {
        var i, j, p, params, str, v, vals, _i, _j, _k, _len, _ref6, _ref7, _ref8;
        vals = [];
        params = [];
        for (i = _i = 0, _ref6 = this.values.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; i = 0 <= _ref6 ? ++_i : --_i) {
          for (j = _j = 0, _ref7 = this.values[i].length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; j = 0 <= _ref7 ? ++_j : --_j) {
            p = this._formatValueAsParam(this.values[i][j]);
            if ((p != null ? p.text : void 0) != null) {
              str = p.text;
              _ref8 = p.values;
              for (_k = 0, _len = _ref8.length; _k < _len; _k++) {
                v = _ref8[_k];
                params.push(v);
              }
            } else {
              str = this.options.parameterCharacter;
              params.push(p);
            }
            if ('string' === typeof vals[i]) {
              vals[i] += ", " + str;
            } else {
              vals[i] = "" + str;
            }
          }
        }
        return {
          vals: vals,
          params: params
        };
      };

      InsertFieldValueBlock.prototype.buildStr = function(queryBuilder) {
        if (0 >= this.fields.length) {
          return '';
        }
        return "(" + (this.fields.join(', ')) + ") VALUES (" + (this._buildVals().join('), (')) + ")";
      };

      InsertFieldValueBlock.prototype.buildParam = function(queryBuilder) {
        var i, params, str, vals, _i, _ref6, _ref7;
        if (0 >= this.fields.length) {
          return {
            text: '',
            values: []
          };
        }
        str = "";
        _ref6 = this._buildValParams(), vals = _ref6.vals, params = _ref6.params;
        for (i = _i = 0, _ref7 = this.fields.length; 0 <= _ref7 ? _i < _ref7 : _i > _ref7; i = 0 <= _ref7 ? ++_i : --_i) {
          if ("" !== str) {
            str += ", ";
          }
          str += this.fields[i];
        }
        return {
          text: "(" + str + ") VALUES (" + (vals.join('), (')) + ")",
          values: params
        };
      };

      return InsertFieldValueBlock;

    })(cls.AbstractSetFieldBlock);
    cls.InsertFieldsFromQueryBlock = (function(_super) {
      __extends(InsertFieldsFromQueryBlock, _super);

      function InsertFieldsFromQueryBlock(options) {
        InsertFieldsFromQueryBlock.__super__.constructor.call(this, options);
        this._fields = [];
        this._query = null;
      }

      InsertFieldsFromQueryBlock.prototype.fromQuery = function(fields, selectQuery) {
        var _this = this;
        this._fields = fields.map((function(v) {
          return _this._sanitizeField(v);
        }));
        return this._query = this._sanitizeNestableQuery(selectQuery);
      };

      InsertFieldsFromQueryBlock.prototype.buildStr = function(queryBuilder) {
        if (0 >= this._fields.length) {
          return '';
        }
        return "(" + (this._fields.join(', ')) + ") (" + (this._query.toString()) + ")";
      };

      InsertFieldsFromQueryBlock.prototype.buildParam = function(queryBuilder) {
        var qryParam;
        if (0 >= this._fields.length) {
          return {
            text: '',
            values: []
          };
        }
        qryParam = this._query.toParam();
        return {
          text: "(" + (this._fields.join(', ')) + ") (" + qryParam.text + ")",
          values: qryParam.values
        };
      };

      return InsertFieldsFromQueryBlock;

    })(cls.Block);
    cls.DistinctBlock = (function(_super) {
      __extends(DistinctBlock, _super);

      function DistinctBlock(options) {
        DistinctBlock.__super__.constructor.call(this, options);
        this.useDistinct = false;
      }

      DistinctBlock.prototype.distinct = function() {
        return this.useDistinct = true;
      };

      DistinctBlock.prototype.buildStr = function(queryBuilder) {
        if (this.useDistinct) {
          return "DISTINCT";
        } else {
          return "";
        }
      };

      return DistinctBlock;

    })(cls.Block);
    cls.GroupByBlock = (function(_super) {
      __extends(GroupByBlock, _super);

      function GroupByBlock(options) {
        GroupByBlock.__super__.constructor.call(this, options);
        this.groups = [];
      }

      GroupByBlock.prototype.group = function(field) {
        field = this._sanitizeField(field);
        return this.groups.push(field);
      };

      GroupByBlock.prototype.buildStr = function(queryBuilder) {
        var f, groups, _i, _len, _ref6;
        groups = "";
        if (0 < this.groups.length) {
          _ref6 = this.groups;
          for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
            f = _ref6[_i];
            if ("" !== groups) {
              groups += ", ";
            }
            groups += f;
          }
          groups = "GROUP BY " + groups;
        }
        return groups;
      };

      return GroupByBlock;

    })(cls.Block);
    cls.OffsetBlock = (function(_super) {
      __extends(OffsetBlock, _super);

      function OffsetBlock(options) {
        OffsetBlock.__super__.constructor.call(this, options);
        this.offsets = null;
      }

      OffsetBlock.prototype.offset = function(start) {
        start = this._sanitizeLimitOffset(start);
        return this.offsets = start;
      };

      OffsetBlock.prototype.buildStr = function(queryBuilder) {
        if (this.offsets) {
          return "OFFSET " + this.offsets;
        } else {
          return "";
        }
      };

      return OffsetBlock;

    })(cls.Block);
    cls.AbstractConditionBlock = (function(_super) {
      __extends(AbstractConditionBlock, _super);

      function AbstractConditionBlock(conditionVerb, options) {
        this.conditionVerb = conditionVerb;
        AbstractConditionBlock.__super__.constructor.call(this, options);
        this.conditions = [];
      }

      AbstractConditionBlock.prototype._condition = function() {
        var c, condition, finalCondition, finalValues, idx, inValues, item, nextValue, t, values, _i, _j, _len, _ref6;
        condition = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        condition = this._sanitizeCondition(condition);
        finalCondition = "";
        finalValues = [];
        if (condition instanceof cls.Expression) {
          t = condition.toParam();
          finalCondition = t.text;
          finalValues = t.values;
        } else {
          for (idx = _i = 0, _ref6 = condition.length; 0 <= _ref6 ? _i < _ref6 : _i > _ref6; idx = 0 <= _ref6 ? ++_i : --_i) {
            c = condition.charAt(idx);
            if (this.options.parameterCharacter === c && 0 < values.length) {
              nextValue = values.shift();
              if (Array.isArray(nextValue)) {
                inValues = [];
                for (_j = 0, _len = nextValue.length; _j < _len; _j++) {
                  item = nextValue[_j];
                  inValues.push(this._sanitizeValue(item));
                }
                finalValues = finalValues.concat(inValues);
                finalCondition += "(" + (((function() {
                  var _k, _len1, _results;
                  _results = [];
                  for (_k = 0, _len1 = inValues.length; _k < _len1; _k++) {
                    item = inValues[_k];
                    _results.push(this.options.parameterCharacter);
                  }
                  return _results;
                }).call(this)).join(', ')) + ")";
              } else {
                finalCondition += this.options.parameterCharacter;
                finalValues.push(this._sanitizeValue(nextValue));
              }
            } else {
              finalCondition += c;
            }
          }
        }
        if ("" !== finalCondition) {
          return this.conditions.push({
            text: finalCondition,
            values: finalValues
          });
        }
      };

      AbstractConditionBlock.prototype.buildStr = function(queryBuilder) {
        var c, cond, condStr, idx, pIndex, _i, _j, _len, _ref6, _ref7;
        if (0 >= this.conditions.length) {
          return "";
        }
        condStr = "";
        _ref6 = this.conditions;
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          cond = _ref6[_i];
          if ("" !== condStr) {
            condStr += ") AND (";
          }
          if (0 < cond.values.length) {
            pIndex = 0;
            for (idx = _j = 0, _ref7 = cond.text.length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; idx = 0 <= _ref7 ? ++_j : --_j) {
              c = cond.text.charAt(idx);
              if (this.options.parameterCharacter === c) {
                condStr += this._formatValue(cond.values[pIndex++]);
              } else {
                condStr += c;
              }
            }
          } else {
            condStr += cond.text;
          }
        }
        return "" + this.conditionVerb + " (" + condStr + ")";
      };

      AbstractConditionBlock.prototype.buildParam = function(queryBuilder) {
        var cond, condStr, i, p, qv, ret, str, v, _i, _j, _k, _len, _len1, _len2, _ref6, _ref7, _ref8;
        ret = {
          text: "",
          values: []
        };
        if (0 >= this.conditions.length) {
          return ret;
        }
        condStr = "";
        _ref6 = this.conditions;
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          cond = _ref6[_i];
          if ("" !== condStr) {
            condStr += ") AND (";
          }
          str = cond.text.split(this.options.parameterCharacter);
          i = 0;
          _ref7 = cond.values;
          for (_j = 0, _len1 = _ref7.length; _j < _len1; _j++) {
            v = _ref7[_j];
            if (str[i] != null) {
              condStr += "" + str[i];
            }
            p = this._formatValueAsParam(v);
            if (((p != null ? p.text : void 0) != null)) {
              condStr += "(" + p.text + ")";
              _ref8 = p.values;
              for (_k = 0, _len2 = _ref8.length; _k < _len2; _k++) {
                qv = _ref8[_k];
                ret.values.push(qv);
              }
            } else {
              condStr += this.options.parameterCharacter;
              ret.values.push(p);
            }
            i = i + 1;
          }
          if (str[i] != null) {
            condStr += "" + str[i];
          }
        }
        ret.text = "" + this.conditionVerb + " (" + condStr + ")";
        return ret;
      };

      return AbstractConditionBlock;

    })(cls.Block);
    cls.WhereBlock = (function(_super) {
      __extends(WhereBlock, _super);

      function WhereBlock(options) {
        WhereBlock.__super__.constructor.call(this, 'WHERE', options);
      }

      WhereBlock.prototype.where = function() {
        var condition, values;
        condition = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this._condition.apply(this, [condition].concat(__slice.call(values)));
      };

      return WhereBlock;

    })(cls.AbstractConditionBlock);
    cls.HavingBlock = (function(_super) {
      __extends(HavingBlock, _super);

      function HavingBlock(options) {
        HavingBlock.__super__.constructor.call(this, 'HAVING', options);
      }

      HavingBlock.prototype.having = function() {
        var condition, values;
        condition = arguments[0], values = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
        return this._condition.apply(this, [condition].concat(__slice.call(values)));
      };

      return HavingBlock;

    })(cls.AbstractConditionBlock);
    cls.OrderByBlock = (function(_super) {
      __extends(OrderByBlock, _super);

      function OrderByBlock(options) {
        OrderByBlock.__super__.constructor.call(this, options);
        this.orders = [];
        this._values = [];
      }

      OrderByBlock.prototype.order = function() {
        var asc, field, values;
        field = arguments[0], asc = arguments[1], values = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        field = this._sanitizeField(field);
        if (asc === void 0) {
          asc = true;
        }
        if (asc !== null) {
          asc = !!asc;
        }
        this._values = values;
        return this.orders.push({
          field: field,
          dir: asc
        });
      };

      OrderByBlock.prototype._buildStr = function(toParam) {
        var c, fstr, idx, o, orders, pIndex, _i, _j, _len, _ref6, _ref7;
        if (toParam == null) {
          toParam = false;
        }
        if (0 < this.orders.length) {
          pIndex = 0;
          orders = "";
          _ref6 = this.orders;
          for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
            o = _ref6[_i];
            if ("" !== orders) {
              orders += ", ";
            }
            fstr = "";
            if (!toParam) {
              for (idx = _j = 0, _ref7 = o.field.length; 0 <= _ref7 ? _j < _ref7 : _j > _ref7; idx = 0 <= _ref7 ? ++_j : --_j) {
                c = o.field.charAt(idx);
                if (this.options.parameterCharacter === c) {
                  fstr += this._formatValue(this._values[pIndex++]);
                } else {
                  fstr += c;
                }
              }
            } else {
              fstr = o.field;
            }
            orders += "" + fstr;
            if (o.dir !== null) {
              orders += " " + (o.dir ? 'ASC' : 'DESC');
            }
          }
          return "ORDER BY " + orders;
        } else {
          return "";
        }
      };

      OrderByBlock.prototype.buildStr = function(queryBuilder) {
        return this._buildStr();
      };

      OrderByBlock.prototype.buildParam = function(queryBuilder) {
        var _this = this;
        return {
          text: this._buildStr(true),
          values: this._values.map(function(v) {
            return _this._formatValueAsParam(v);
          })
        };
      };

      return OrderByBlock;

    })(cls.Block);
    cls.LimitBlock = (function(_super) {
      __extends(LimitBlock, _super);

      function LimitBlock(options) {
        LimitBlock.__super__.constructor.call(this, options);
        this.limits = null;
      }

      LimitBlock.prototype.limit = function(max) {
        max = this._sanitizeLimitOffset(max);
        return this.limits = max;
      };

      LimitBlock.prototype.buildStr = function(queryBuilder) {
        if (this.limits || this.limits === 0) {
          return "LIMIT " + this.limits;
        } else {
          return "";
        }
      };

      return LimitBlock;

    })(cls.Block);
    cls.JoinBlock = (function(_super) {
      __extends(JoinBlock, _super);

      function JoinBlock(options) {
        JoinBlock.__super__.constructor.call(this, options);
        this.joins = [];
      }

      JoinBlock.prototype.join = function(table, alias, condition, type) {
        if (alias == null) {
          alias = null;
        }
        if (condition == null) {
          condition = null;
        }
        if (type == null) {
          type = 'INNER';
        }
        table = this._sanitizeTable(table, true);
        if (alias) {
          alias = this._sanitizeTableAlias(alias);
        }
        if (condition) {
          condition = this._sanitizeCondition(condition);
        }
        this.joins.push({
          type: type,
          table: table,
          alias: alias,
          condition: condition
        });
        return this;
      };

      JoinBlock.prototype.left_join = function(table, alias, condition) {
        if (alias == null) {
          alias = null;
        }
        if (condition == null) {
          condition = null;
        }
        return this.join(table, alias, condition, 'LEFT');
      };

      JoinBlock.prototype.right_join = function(table, alias, condition) {
        if (alias == null) {
          alias = null;
        }
        if (condition == null) {
          condition = null;
        }
        return this.join(table, alias, condition, 'RIGHT');
      };

      JoinBlock.prototype.outer_join = function(table, alias, condition) {
        if (alias == null) {
          alias = null;
        }
        if (condition == null) {
          condition = null;
        }
        return this.join(table, alias, condition, 'OUTER');
      };

      JoinBlock.prototype.left_outer_join = function(table, alias, condition) {
        if (alias == null) {
          alias = null;
        }
        if (condition == null) {
          condition = null;
        }
        return this.join(table, alias, condition, 'LEFT OUTER');
      };

      JoinBlock.prototype.full_join = function(table, alias, condition) {
        if (alias == null) {
          alias = null;
        }
        if (condition == null) {
          condition = null;
        }
        return this.join(table, alias, condition, 'FULL');
      };

      JoinBlock.prototype.cross_join = function(table, alias, condition) {
        if (alias == null) {
          alias = null;
        }
        if (condition == null) {
          condition = null;
        }
        return this.join(table, alias, condition, 'CROSS');
      };

      JoinBlock.prototype.buildStr = function(queryBuilder) {
        var j, joins, _i, _len, _ref6;
        joins = "";
        _ref6 = this.joins || [];
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          j = _ref6[_i];
          if (joins !== "") {
            joins += " ";
          }
          joins += "" + j.type + " JOIN ";
          if ("string" === typeof j.table) {
            joins += j.table;
          } else {
            joins += "(" + j.table + ")";
          }
          if (j.alias) {
            joins += " " + j.alias;
          }
          if (j.condition) {
            joins += " ON (" + j.condition + ")";
          }
        }
        return joins;
      };

      JoinBlock.prototype.buildParam = function(queryBuilder) {
        var blk, cp, joinStr, p, params, ret, v, _i, _j, _k, _len, _len1, _len2, _ref6, _ref7;
        ret = {
          text: "",
          values: []
        };
        params = [];
        joinStr = "";
        if (0 >= this.joins.length) {
          return ret;
        }
        _ref6 = this.joins;
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          blk = _ref6[_i];
          if ("string" === typeof blk.table) {
            p = {
              "text": "" + blk.table,
              "values": []
            };
          } else if (blk.table instanceof cls.QueryBuilder) {
            blk.table.updateOptions({
              "nestedBuilder": true
            });
            p = blk.table.toParam();
          } else {
            blk.updateOptions({
              "nestedBuilder": true
            });
            p = blk.buildParam(queryBuilder);
          }
          if (blk.condition instanceof cls.Expression) {
            cp = blk.condition.toParam();
            p.condition = cp.text;
            p.values = p.values.concat(cp.values);
          } else {
            p.condition = blk.condition;
          }
          p.join = blk;
          params.push(p);
        }
        for (_j = 0, _len1 = params.length; _j < _len1; _j++) {
          p = params[_j];
          if (joinStr !== "") {
            joinStr += " ";
          }
          joinStr += "" + p.join.type + " JOIN ";
          if ("string" === typeof p.join.table) {
            joinStr += p.text;
          } else {
            joinStr += "(" + p.text + ")";
          }
          if (p.join.alias) {
            joinStr += " " + p.join.alias;
          }
          if (p.condition) {
            joinStr += " ON (" + p.condition + ")";
          }
          _ref7 = p.values;
          for (_k = 0, _len2 = _ref7.length; _k < _len2; _k++) {
            v = _ref7[_k];
            ret.values.push(this._formatCustomValue(v));
          }
        }
        ret.text += joinStr;
        return ret;
      };

      return JoinBlock;

    })(cls.Block);
    cls.UnionBlock = (function(_super) {
      __extends(UnionBlock, _super);

      function UnionBlock(options) {
        UnionBlock.__super__.constructor.call(this, options);
        this.unions = [];
      }

      UnionBlock.prototype.union = function(table, type) {
        if (type == null) {
          type = 'UNION';
        }
        table = this._sanitizeTable(table, true);
        this.unions.push({
          type: type,
          table: table
        });
        return this;
      };

      UnionBlock.prototype.union_all = function(table) {
        return this.union(table, 'UNION ALL');
      };

      UnionBlock.prototype.buildStr = function(queryBuilder) {
        var j, unionStr, _i, _len, _ref6;
        unionStr = "";
        _ref6 = this.unions || [];
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          j = _ref6[_i];
          if (unionStr !== "") {
            unionStr += " ";
          }
          unionStr += "" + j.type + " ";
          if ("string" === typeof j.table) {
            unionStr += j.table;
          } else {
            unionStr += "(" + j.table + ")";
          }
        }
        return unionStr;
      };

      UnionBlock.prototype.buildParam = function(queryBuilder) {
        var blk, p, params, ret, unionStr, v, _i, _j, _k, _len, _len1, _len2, _ref6, _ref7;
        ret = {
          text: "",
          values: []
        };
        params = [];
        unionStr = "";
        if (0 >= this.unions.length) {
          return ret;
        }
        _ref6 = this.unions || [];
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          blk = _ref6[_i];
          if ("string" === typeof blk.table) {
            p = {
              "text": "" + blk.table,
              "values": []
            };
          } else if (blk.table instanceof cls.QueryBuilder) {
            blk.table.updateOptions({
              "nestedBuilder": true
            });
            p = blk.table.toParam();
          } else {
            blk.updateOptions({
              "nestedBuilder": true
            });
            p = blk.buildParam(queryBuilder);
          }
          p.type = blk.type;
          params.push(p);
        }
        for (_j = 0, _len1 = params.length; _j < _len1; _j++) {
          p = params[_j];
          if (unionStr !== "") {
            unionStr += " ";
          }
          unionStr += "" + p.type + " (" + p.text + ")";
          _ref7 = p.values;
          for (_k = 0, _len2 = _ref7.length; _k < _len2; _k++) {
            v = _ref7[_k];
            ret.values.push(this._formatCustomValue(v));
          }
        }
        ret.text += unionStr;
        return ret;
      };

      return UnionBlock;

    })(cls.Block);
    cls.QueryBuilder = (function(_super) {
      __extends(QueryBuilder, _super);

      function QueryBuilder(options, blocks) {
        var block, methodBody, methodName, _fn, _i, _len, _ref6, _ref7,
          _this = this;
        QueryBuilder.__super__.constructor.call(this, options);
        this.blocks = blocks || [];
        _ref6 = this.blocks;
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          block = _ref6[_i];
          _ref7 = block.exposedMethods();
          _fn = function(block, name, body) {
            return _this[name] = function() {
              body.apply(block, arguments);
              return _this;
            };
          };
          for (methodName in _ref7) {
            methodBody = _ref7[methodName];
            if (this[methodName] != null) {
              throw new Error("" + (this._getObjectClassName(this)) + " already has a builder method called: " + methodName);
            }
            _fn(block, methodName, methodBody);
          }
        }
      }

      QueryBuilder.prototype.registerValueHandler = function(type, handler) {
        var block, _i, _len, _ref6;
        _ref6 = this.blocks;
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          block = _ref6[_i];
          block.registerValueHandler(type, handler);
        }
        QueryBuilder.__super__.registerValueHandler.call(this, type, handler);
        return this;
      };

      QueryBuilder.prototype.updateOptions = function(options) {
        var block, _i, _len, _ref6, _results;
        this.options = _extend({}, this.options, options);
        _ref6 = this.blocks;
        _results = [];
        for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
          block = _ref6[_i];
          _results.push(block.options = _extend({}, block.options, options));
        }
        return _results;
      };

      QueryBuilder.prototype.toString = function() {
        var block;
        return ((function() {
          var _i, _len, _ref6, _results;
          _ref6 = this.blocks;
          _results = [];
          for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
            block = _ref6[_i];
            _results.push(block.buildStr(this));
          }
          return _results;
        }).call(this)).filter(function(v) {
          return 0 < v.length;
        }).join(this.options.separator);
      };

      QueryBuilder.prototype.toParam = function(options) {
        var block, blocks, i, old, regex, result, _ref6,
          _this = this;
        if (options == null) {
          options = void 0;
        }
        old = this.options;
        if (options != null) {
          this.options = _extend({}, this.options, options);
        }
        result = {
          text: '',
          values: []
        };
        blocks = (function() {
          var _i, _len, _ref6, _results;
          _ref6 = this.blocks;
          _results = [];
          for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
            block = _ref6[_i];
            _results.push(block.buildParam(this));
          }
          return _results;
        }).call(this);
        result.text = ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = blocks.length; _i < _len; _i++) {
            block = blocks[_i];
            _results.push(block.text);
          }
          return _results;
        })()).filter(function(v) {
          return 0 < v.length;
        }).join(this.options.separator);
        result.values = (_ref6 = []).concat.apply(_ref6, (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = blocks.length; _i < _len; _i++) {
            block = blocks[_i];
            _results.push(block.values);
          }
          return _results;
        })());
        if (this.options.nestedBuilder == null) {
          if (this.options.numberedParameters || ((options != null ? options.numberedParametersStartAt : void 0) != null)) {
            i = 1;
            if (this.options.numberedParametersStartAt != null) {
              i = this.options.numberedParametersStartAt;
            }
            regex = new RegExp("\\" + this.options.parameterCharacter, 'g');
            result.text = result.text.replace(regex, function() {
              return "" + _this.options.numberedParametersPrefix + (i++);
            });
          }
        }
        this.options = old;
        return result;
      };

      QueryBuilder.prototype.clone = function() {
        var block;
        return new this.constructor(this.options, (function() {
          var _i, _len, _ref6, _results;
          _ref6 = this.blocks;
          _results = [];
          for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
            block = _ref6[_i];
            _results.push(block.clone());
          }
          return _results;
        }).call(this));
      };

      QueryBuilder.prototype.isNestable = function() {
        return false;
      };

      QueryBuilder.prototype.getBlock = function(blockType) {
        return this.blocks.filter(function(b) {
          return b instanceof blockType;
        })[0];
      };

      return QueryBuilder;

    })(cls.BaseBuilder);
    cls.Select = (function(_super) {
      __extends(Select, _super);

      function Select(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [
          new cls.StringBlock(options, 'SELECT'), new cls.FunctionBlock(options), new cls.DistinctBlock(options), new cls.GetFieldBlock(options), new cls.FromTableBlock(_extend({}, options, {
            allowNested: true
          })), new cls.JoinBlock(_extend({}, options, {
            allowNested: true
          })), new cls.WhereBlock(options), new cls.GroupByBlock(options), new cls.HavingBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options), new cls.OffsetBlock(options), new cls.UnionBlock(_extend({}, options, {
            allowNested: true
          }))
        ]);
        Select.__super__.constructor.call(this, options, blocks);
      }

      Select.prototype.isNestable = function() {
        return true;
      };

      return Select;

    })(cls.QueryBuilder);
    cls.Update = (function(_super) {
      __extends(Update, _super);

      function Update(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [new cls.StringBlock(options, 'UPDATE'), new cls.UpdateTableBlock(options), new cls.SetFieldBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)]);
        Update.__super__.constructor.call(this, options, blocks);
      }

      return Update;

    })(cls.QueryBuilder);
    cls.Delete = (function(_super) {
      __extends(Delete, _super);

      function Delete(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [
          new cls.StringBlock(options, 'DELETE'), new cls.FromTableBlock(_extend({}, options, {
            singleTable: true
          })), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)
        ]);
        Delete.__super__.constructor.call(this, options, blocks);
      }

      return Delete;

    })(cls.QueryBuilder);
    cls.Insert = (function(_super) {
      __extends(Insert, _super);

      function Insert(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.InsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options)]);
        Insert.__super__.constructor.call(this, options, blocks);
      }

      return Insert;

    })(cls.QueryBuilder);
    _squel = {
      VERSION: '4.2.4',
      flavour: flavour,
      expr: function(options) {
        return new cls.Expression(options);
      },
      select: function(options, blocks) {
        return new cls.Select(options, blocks);
      },
      update: function(options, blocks) {
        return new cls.Update(options, blocks);
      },
      insert: function(options, blocks) {
        return new cls.Insert(options, blocks);
      },
      "delete": function(options, blocks) {
        return new cls.Delete(options, blocks);
      },
      registerValueHandler: cls.registerValueHandler,
      fval: cls.fval
    };
    _squel.remove = _squel["delete"];
    _squel.cls = cls;
    return _squel;
  };

  squel = _buildSquel();

  if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
    define(function() {
      return squel;
    });
  } else if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = squel;
  } else {
    if (typeof window !== "undefined" && window !== null) {
      window.squel = squel;
    }
  }

  squel.flavours = {};

  squel.useFlavour = function(flavour) {
    var s;
    if (flavour == null) {
      flavour = null;
    }
    if (!flavour) {
      return squel;
    }
    if (squel.flavours[flavour] instanceof Function) {
      s = _buildSquel(flavour);
      squel.flavours[flavour].call(null, s);
      return s;
    } else {
      throw new Error("Flavour not available: " + flavour);
    }
  };

  /*
  Copyright (c) Ramesh Nair (hiddentao.com)
  
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
  */


  squel.flavours['postgres'] = function(_squel) {
    var cls;
    cls = _squel.cls;
    cls.DefaultQueryBuilderOptions.numberedParameters = true;
    cls.DefaultQueryBuilderOptions.numberedParametersStartAt = 1;
    cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = false;
    cls.ReturningBlock = (function(_super) {
      __extends(ReturningBlock, _super);

      function ReturningBlock(options) {
        ReturningBlock.__super__.constructor.call(this, options);
        this._str = null;
      }

      ReturningBlock.prototype.returning = function(ret) {
        return this._str = this._sanitizeField(ret);
      };

      ReturningBlock.prototype.buildStr = function() {
        if (this._str) {
          return "RETURNING " + this._str;
        } else {
          return "";
        }
      };

      return ReturningBlock;

    })(cls.Block);
    cls.Insert = (function(_super) {
      __extends(Insert, _super);

      function Insert(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.InsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options), new cls.ReturningBlock(options)]);
        Insert.__super__.constructor.call(this, options, blocks);
      }

      return Insert;

    })(cls.QueryBuilder);
    cls.Update = (function(_super) {
      __extends(Update, _super);

      function Update(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [
          new cls.StringBlock(options, 'UPDATE'), new cls.UpdateTableBlock(options), new cls.SetFieldBlock(options), new cls.FromTableBlock(_extend({}, options, {
            allowNested: true
          })), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options), new cls.ReturningBlock(options)
        ]);
        Update.__super__.constructor.call(this, options, blocks);
      }

      return Update;

    })(cls.QueryBuilder);
    return cls.Delete = (function(_super) {
      __extends(Delete, _super);

      function Delete(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [
          new cls.StringBlock(options, 'DELETE'), new cls.FromTableBlock(_extend({}, options, {
            singleTable: true
          })), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options), new cls.ReturningBlock(options)
        ]);
        Delete.__super__.constructor.call(this, options, blocks);
      }

      return Delete;

    })(cls.QueryBuilder);
  };

  /*
  Copyright (c) Ramesh Nair (hiddentao.com)
  
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
  */


  squel.flavours['mysql'] = function(_squel) {
    var cls, _ref, _ref1;
    cls = _squel.cls;
    cls.TargetTableBlock = (function(_super) {
      __extends(TargetTableBlock, _super);

      function TargetTableBlock() {
        _ref = TargetTableBlock.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      TargetTableBlock.prototype.target = function(table) {
        return this._setValue(this._sanitizeTable(table));
      };

      return TargetTableBlock;

    })(cls.AbstractValueBlock);
    cls.MysqlOnDuplicateKeyUpdateBlock = (function(_super) {
      __extends(MysqlOnDuplicateKeyUpdateBlock, _super);

      function MysqlOnDuplicateKeyUpdateBlock() {
        _ref1 = MysqlOnDuplicateKeyUpdateBlock.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      MysqlOnDuplicateKeyUpdateBlock.prototype.onDupUpdate = function(field, value, options) {
        return this._set(field, value, options);
      };

      MysqlOnDuplicateKeyUpdateBlock.prototype.buildStr = function() {
        var field, fieldOptions, i, str, value, _i, _ref2;
        str = "";
        for (i = _i = 0, _ref2 = this.fields.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; i = 0 <= _ref2 ? ++_i : --_i) {
          field = this.fields[i];
          if ("" !== str) {
            str += ", ";
          }
          value = this.values[0][i];
          fieldOptions = this.fieldOptions[0][i];
          if (typeof value === 'undefined') {
            str += field;
          } else {
            str += "" + field + " = " + (this._formatValue(value, fieldOptions));
          }
        }
        if (str === "") {
          return "";
        } else {
          return "ON DUPLICATE KEY UPDATE " + str;
        }
      };

      MysqlOnDuplicateKeyUpdateBlock.prototype.buildParam = function(queryBuilder) {
        var field, i, str, vals, value, _i, _ref2;
        str = "";
        vals = [];
        for (i = _i = 0, _ref2 = this.fields.length; 0 <= _ref2 ? _i < _ref2 : _i > _ref2; i = 0 <= _ref2 ? ++_i : --_i) {
          field = this.fields[i];
          if ("" !== str) {
            str += ", ";
          }
          value = this.values[0][i];
          if (typeof value === 'undefined') {
            str += field;
          } else {
            str += "" + field + " = " + this.options.parameterCharacter;
            vals.push(this._formatValueAsParam(value));
          }
        }
        return {
          text: str === "" ? "" : "ON DUPLICATE KEY UPDATE " + str,
          values: vals
        };
      };

      return MysqlOnDuplicateKeyUpdateBlock;

    })(cls.AbstractSetFieldBlock);
    cls.Insert = (function(_super) {
      __extends(Insert, _super);

      function Insert(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.InsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options), new cls.MysqlOnDuplicateKeyUpdateBlock(options)]);
        Insert.__super__.constructor.call(this, options, blocks);
      }

      return Insert;

    })(cls.QueryBuilder);
    return cls.Delete = (function(_super) {
      __extends(Delete, _super);

      function Delete(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [
          new cls.StringBlock(options, 'DELETE'), new cls.TargetTableBlock(options), new cls.FromTableBlock(_extend({}, options, {
            singleTable: true
          })), new cls.JoinBlock(options), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)
        ]);
        Delete.__super__.constructor.call(this, options, blocks);
      }

      return Delete;

    })(cls.QueryBuilder);
  };

  /*
  Copyright (c) Ramesh Nair (hiddentao.com)
  
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
  */


  _extend = function() {
    var dst, k, sources, src, v, _i, _len;
    dst = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (sources) {
      for (_i = 0, _len = sources.length; _i < _len; _i++) {
        src = sources[_i];
        if (src) {
          for (k in src) {
            if (!__hasProp.call(src, k)) continue;
            v = src[k];
            dst[k] = v;
          }
        }
      }
    }
    return dst;
  };

  squel.flavours['mssql'] = function(_squel) {
    var cls;
    cls = _squel.cls;
    cls.DefaultQueryBuilderOptions.replaceSingleQuotes = true;
    cls.DefaultQueryBuilderOptions.autoQuoteAliasNames = false;
    cls.DefaultQueryBuilderOptions.numberedParametersPrefix = '@';
    _squel.registerValueHandler(Date, function(date) {
      return "'" + (date.getUTCFullYear()) + "-" + (date.getUTCMonth() + 1) + "-" + (date.getUTCDate()) + " " + (date.getUTCHours()) + ":" + (date.getUTCMinutes()) + ":" + (date.getUTCSeconds()) + "'";
    });
    cls.MssqlLimitOffsetTopBlock = (function(_super) {
      var LimitBlock, OffsetBlock, ParentBlock, TopBlock, _limit, _ref, _ref1, _ref2;

      __extends(MssqlLimitOffsetTopBlock, _super);

      function MssqlLimitOffsetTopBlock(options) {
        MssqlLimitOffsetTopBlock.__super__.constructor.call(this, options);
        this.limits = null;
        this.offsets = null;
      }

      _limit = function(max) {
        max = this._sanitizeLimitOffset(max);
        return this._parent.limits = max;
      };

      ParentBlock = (function(_super1) {
        __extends(ParentBlock, _super1);

        function ParentBlock(parent) {
          ParentBlock.__super__.constructor.call(this, parent.options);
          this._parent = parent;
        }

        return ParentBlock;

      })(cls.Block);

      LimitBlock = (function(_super1) {
        __extends(LimitBlock, _super1);

        function LimitBlock() {
          _ref = LimitBlock.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        LimitBlock.prototype.limit = _limit;

        LimitBlock.prototype.buildStr = function(queryBuilder) {
          if (this._parent.limits && this._parent.offsets) {
            return "FETCH NEXT " + this._parent.limits + " ROWS ONLY";
          } else {
            return "";
          }
        };

        return LimitBlock;

      })(ParentBlock);

      TopBlock = (function(_super1) {
        __extends(TopBlock, _super1);

        function TopBlock() {
          _ref1 = TopBlock.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        TopBlock.prototype.top = _limit;

        TopBlock.prototype.buildStr = function(queryBuilder) {
          if (this._parent.limits && !this._parent.offsets) {
            return "TOP (" + this._parent.limits + ")";
          } else {
            return "";
          }
        };

        return TopBlock;

      })(ParentBlock);

      OffsetBlock = (function(_super1) {
        __extends(OffsetBlock, _super1);

        function OffsetBlock() {
          this.offset = __bind(this.offset, this);
          _ref2 = OffsetBlock.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        OffsetBlock.prototype.offset = function(start) {
          start = this._sanitizeLimitOffset(start);
          return this._parent.offsets = start;
        };

        OffsetBlock.prototype.buildStr = function(queryBuilder) {
          if (this._parent.offsets) {
            return "OFFSET " + this._parent.offsets + " ROWS";
          } else {
            return "";
          }
        };

        return OffsetBlock;

      })(ParentBlock);

      MssqlLimitOffsetTopBlock.prototype.LIMIT = function(options) {
        this.constructor(options);
        return new LimitBlock(this);
      };

      MssqlLimitOffsetTopBlock.prototype.TOP = function(options) {
        this.constructor(options);
        return new TopBlock(this);
      };

      MssqlLimitOffsetTopBlock.prototype.OFFSET = function(options) {
        this.constructor(options);
        return new OffsetBlock(this);
      };

      return MssqlLimitOffsetTopBlock;

    }).call(this, cls.Block);
    cls.MssqlUpdateTopBlock = (function(_super) {
      var _limit;

      __extends(MssqlUpdateTopBlock, _super);

      function MssqlUpdateTopBlock(options) {
        MssqlUpdateTopBlock.__super__.constructor.call(this, options);
        this.limits = null;
      }

      _limit = function(max) {
        max = this._sanitizeLimitOffset(max);
        return this.limits = max;
      };

      MssqlUpdateTopBlock.prototype.limit = _limit;

      MssqlUpdateTopBlock.prototype.top = _limit;

      MssqlUpdateTopBlock.prototype.buildStr = function(queryBuilder) {
        if (this.limits) {
          return "TOP (" + this.limits + ")";
        } else {
          return "";
        }
      };

      return MssqlUpdateTopBlock;

    })(cls.Block);
    cls.MssqlInsertFieldValueBlock = (function(_super) {
      __extends(MssqlInsertFieldValueBlock, _super);

      function MssqlInsertFieldValueBlock(options) {
        MssqlInsertFieldValueBlock.__super__.constructor.call(this, options);
        this.outputs = [];
      }

      MssqlInsertFieldValueBlock.prototype.output = function(fields) {
        var f, _i, _len, _results;
        if ('string' === typeof fields) {
          return this.outputs.push("INSERTED." + (this._sanitizeField(fields)));
        } else {
          _results = [];
          for (_i = 0, _len = fields.length; _i < _len; _i++) {
            f = fields[_i];
            _results.push(this.outputs.push("INSERTED." + (this._sanitizeField(f))));
          }
          return _results;
        }
      };

      MssqlInsertFieldValueBlock.prototype.buildStr = function(queryBuilder) {
        if (0 >= this.fields.length) {
          throw new Error("set() needs to be called");
        }
        return "(" + (this.fields.join(', ')) + ") " + (this.outputs.length !== 0 ? "OUTPUT " + (this.outputs.join(', ')) + " " : '') + "VALUES (" + (this._buildVals().join('), (')) + ")";
      };

      MssqlInsertFieldValueBlock.prototype.buildParam = function(queryBuilder) {
        var i, params, str, vals, _i, _ref, _ref1;
        if (0 >= this.fields.length) {
          throw new Error("set() needs to be called");
        }
        str = "";
        _ref = this._buildValParams(), vals = _ref.vals, params = _ref.params;
        for (i = _i = 0, _ref1 = this.fields.length; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          if ("" !== str) {
            str += ", ";
          }
          str += this.fields[i];
        }
        return {
          text: "(" + str + ") " + (this.outputs.length !== 0 ? "OUTPUT " + (this.outputs.join(', ')) + " " : '') + "VALUES (" + (vals.join('), (')) + ")",
          values: params
        };
      };

      return MssqlInsertFieldValueBlock;

    })(cls.InsertFieldValueBlock);
    cls.MssqlUpdateDeleteOutputBlock = (function(_super) {
      __extends(MssqlUpdateDeleteOutputBlock, _super);

      function MssqlUpdateDeleteOutputBlock(options) {
        MssqlUpdateDeleteOutputBlock.__super__.constructor.call(this, options);
        this._outputs = [];
      }

      MssqlUpdateDeleteOutputBlock.prototype.outputs = function(_outputs) {
        var alias, output, _results;
        _results = [];
        for (output in _outputs) {
          alias = _outputs[output];
          _results.push(this.output(output, alias));
        }
        return _results;
      };

      MssqlUpdateDeleteOutputBlock.prototype.output = function(output, alias) {
        if (alias == null) {
          alias = null;
        }
        output = this._sanitizeField(output);
        if (alias) {
          alias = this._sanitizeFieldAlias(alias);
        }
        return this._outputs.push({
          name: this.options.forDelete ? "DELETED." + output : "INSERTED." + output,
          alias: alias
        });
      };

      MssqlUpdateDeleteOutputBlock.prototype.buildStr = function(queryBuilder) {
        var output, outputs, _i, _len, _ref;
        outputs = "";
        if (this._outputs.length > 0) {
          _ref = this._outputs;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            output = _ref[_i];
            if ("" !== outputs) {
              outputs += ", ";
            }
            outputs += output.name;
            if (output.alias) {
              outputs += " AS " + output.alias;
            }
          }
          outputs = "OUTPUT " + outputs;
        }
        return outputs;
      };

      return MssqlUpdateDeleteOutputBlock;

    })(cls.Block);
    cls.Select = (function(_super) {
      __extends(Select, _super);

      function Select(options, blocks) {
        var limitOffsetTopBlock;
        if (blocks == null) {
          blocks = null;
        }
        limitOffsetTopBlock = new cls.MssqlLimitOffsetTopBlock(options);
        blocks || (blocks = [
          new cls.StringBlock(options, 'SELECT'), new cls.DistinctBlock(options), limitOffsetTopBlock.TOP(options), new cls.GetFieldBlock(options), new cls.FromTableBlock(_extend({}, options, {
            allowNested: true
          })), new cls.JoinBlock(_extend({}, options, {
            allowNested: true
          })), new cls.WhereBlock(options), new cls.GroupByBlock(options), new cls.OrderByBlock(options), limitOffsetTopBlock.OFFSET(options), limitOffsetTopBlock.LIMIT(options), new cls.UnionBlock(_extend({}, options, {
            allowNested: true
          }))
        ]);
        Select.__super__.constructor.call(this, options, blocks);
      }

      Select.prototype.isNestable = function() {
        return true;
      };

      return Select;

    })(cls.QueryBuilder);
    cls.Update = (function(_super) {
      __extends(Update, _super);

      function Update(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [new cls.StringBlock(options, 'UPDATE'), new cls.MssqlUpdateTopBlock(options), new cls.UpdateTableBlock(options), new cls.SetFieldBlock(options), new cls.MssqlUpdateDeleteOutputBlock(options), new cls.WhereBlock(options)]);
        Update.__super__.constructor.call(this, options, blocks);
      }

      return Update;

    })(cls.QueryBuilder);
    cls.Delete = (function(_super) {
      __extends(Delete, _super);

      function Delete(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [
          new cls.StringBlock(options, 'DELETE'), new cls.FromTableBlock(_extend({}, options, {
            singleTable: true
          })), new cls.JoinBlock(options), new cls.MssqlUpdateDeleteOutputBlock(_extend({}, options, {
            forDelete: true
          })), new cls.WhereBlock(options), new cls.OrderByBlock(options), new cls.LimitBlock(options)
        ]);
        Delete.__super__.constructor.call(this, options, blocks);
      }

      return Delete;

    })(cls.QueryBuilder);
    return cls.Insert = (function(_super) {
      __extends(Insert, _super);

      function Insert(options, blocks) {
        if (blocks == null) {
          blocks = null;
        }
        blocks || (blocks = [new cls.StringBlock(options, 'INSERT'), new cls.IntoTableBlock(options), new cls.MssqlInsertFieldValueBlock(options), new cls.InsertFieldsFromQueryBlock(options)]);
        Insert.__super__.constructor.call(this, options, blocks);
      }

      return Insert;

    })(cls.QueryBuilder);
  };

}).call(this);
