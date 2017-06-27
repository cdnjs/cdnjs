(function() {

// CommonJS require()

function require(p){
    var path = require.resolve(p)
      , mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
      mod.exports = {};
      mod.call(mod.exports, mod, mod.exports, require.relative(path));
    }
    return mod.exports;
  }

require.modules = {};

require.resolve = function (path){
    var orig = path
      , reg = path + '.js'
      , index = path + '/index.js';
    return require.modules[reg] && reg
      || require.modules[index] && index
      || orig;
  };

require.register = function (path, fn){
    require.modules[path] = fn;
  };

require.relative = function (parent) {
    return function(p){
      if ('.' != p.charAt(0)) return require(p);
      
      var path = parent.split('/')
        , segs = p.split('/');
      path.pop();
      
      for (var i = 0; i < segs.length; i++) {
        var seg = segs[i];
        if ('..' == seg) path.pop();
        else if ('.' != seg) path.push(seg);
      }

      return require(path.join('/'));
    };
  };


require.register("cache.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies.
 */



/**
 * Basic cache for client mode.
 *
 * Constructor.
 *
 * @api public
 */

function Cache() {
  this._cache = {};
}


/**
 * Set `key` to `value`.
 *
 * @param {String} key
 * @param {Mixed} value
 * @api public
 */

Cache.prototype.cache = function(key, value) {
  if(_.isUndefined(value)) return;
  this._cache[key] = value;
};


/**
 * Get `key`.
 *
 * @param {String} key
 * @return {Mixed}
 * @api public
 */

Cache.prototype.get = function(key) {
  return this._cache[key];
};


/**
 * Module exports.
 */

module.exports = Cache;
}); // module: cache.js

require.register("compiler.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var token = require('./token');
var utils = require('./utils');


/**
 * Constants
 */

var TAG_OPENING_DELIMITER = '{{';
var TAG_CLOSING_DELIMITER = '}}';
var TAG_OPENING_DELIMITER_LENGTH = TAG_OPENING_DELIMITER.length;
var TAG_NAME_MATCH = /^(\/)?\s*([^\s\}\(]*)/;


/**
 * Initialize `Compiler` with the given `Template`, from the given `source`,
 * with `options`.
 *
 * @param {String} source
 * @api private
 */

var Compiler = module.exports = function(template) {
  this.template = template;
  this.source = template.template;
  this.options = template.options;
  this.helpers = {};
  this.__compilationEnd = [];
};


/**
 * Compile template to a native JS function, and invoke
 * `callback(err, compiled)`.
 *
 * @param {Function} callback
 * @api private
 */

Compiler.prototype.compile = function(callback) {
  var _this = this;

  // Callback for utils.applyAll
  function onProcessed(err, processed) {
    if(err) return callback(err);
    _this._tokenize(processed, onTokenized);
  }

  // Callback for Compiler#_tokenize
  function onTokenized(err, tokenized) {
    if(err) return callback(err);
    tokenized.compile(_this, onCompiled);
  }

  // Callback for Compiler#_compileTokens
  function onCompiled(err, compiled) {
    if(err) return callback(err);

    var func = new Function("$template",
                            "$tools",
                            "_",
                            "$data",
                            "$helpers",
                            "$callback",
                            compiled);

    func.$helpers = _this.helpers;

    callback(null, func);
  }

  // Apply tag before processors
  utils.applyAll(this.source, token.tagBeforeProcessors, [this], onProcessed);
};


/**
 * Tokenize template, and invoke `callback(err, tokenized)`.
 *
 * @param {Function} callback
 * @api private
 */

Compiler.prototype._tokenize = function(source, callback) {
  var workingSource = source;
  var currentToken = new token.RootToken();
  var rootToken = currentToken;
  var inToken = false;
  var currentPart;

  // Lookup templates in document, and build parse tree
  while(true) {
    var nextInflexion = workingSource.search(inToken ?
                                               TAG_CLOSING_DELIMITER :
                                               TAG_OPENING_DELIMITER
                                             );

    if(nextInflexion === -1) {
      this._pushLiteralToken(rootToken, currentToken, workingSource);
      break;
    } else {
      if(inToken) nextInflexion = nextInflexion + TAG_OPENING_DELIMITER_LENGTH;

      currentPart = workingSource.slice(0, nextInflexion);
      workingSource = workingSource.slice(nextInflexion);

      if(!inToken) {
        this._pushLiteralToken(rootToken, currentToken, currentPart);
      } else {
        currentPart = currentPart.slice(2, -2);
        try {
          currentToken = this._pushToken(rootToken, currentToken, currentPart);
        } catch(err) {
          return callback(err);
        }
      }

      inToken = !inToken;
    }
  }

  // Ensure we are at root level
  if(rootToken !== currentToken) {
    return callback(new Error('Tokenization error: unexpected end of file, ' +
                              'expected `' +
                              currentToken.tag.tagName +
                              '`.'
                              ));
  }

  callback(null, rootToken);
};


/**
 * Create `LiteralToken` with `literal`, and append it to `parent`.
 *
 * @param {BaseToken} parent
 * @param {String} literal
 * @api private
 */

Compiler.prototype._pushLiteralToken = function(root, parent, literal) {
  if(!literal.length) return;
  parent.children.push(new token.LiteralToken(literal, root));
};


/**
 * Create `BaseToken` from tag `tag`, and append it to `current`.
 * Return the new working token.
 *
 * @param {BaseToken} current
 * @param {String} tag
 * @return {BaseToken} New working token.
 * @api private
 */

Compiler.prototype._pushToken = function(root, current, tag) {
  var match = tag.match(TAG_NAME_MATCH);
  var tagName = match[2];
  var openingTag = match[1] !== '/';
  var tagType = current.lookupTag(tagName);
  var newToken;

  // Check whether we know this tag
  if(!tagType) {
    throw new Error('Tokenization error: Unknown tag `' + tagName + '`.');
  }

  // Handle intermediate tags
  if(tagType.isIntermediate) {

    // If we already are in an intermediate tag, close it
    if(current.tagType.isIntermediate) current = current.parent;

    // Push the tag to the stack
    newToken = new token.IntermediateToken(tag,
                                               tagType,
                                               root,
                                               current,
                                               [],
                                               this.options);
    current.intermediate.push(newToken);
    return newToken;

  }

  // Handle block tags
  else if(tagType.isBlock) {

    // Handle opening tags
    if(openingTag) {
      newToken = new token.BlockToken(tag,
                                      tagType,
                                      root,
                                      current,
                                      [],
                                      this.options);

      current.children.push(newToken);
      return newToken;

    // Handle closing tags
    } else {
      if(!current.parent) {
        throw new Error('Tokenization error: unexpected `' +
                        tagName +
                        '` tag at root level.'
                        );
      }

      if(current.tagType.isIntermediate) {
        current = current.parent;
      }

      if(current.tagType.tagName !== tagName) {
        throw new Error('Tokenization error: unexpected `' +
                        tagName +
                        '` tag, expected `' +
                        current.tag.tagName +
                        '`.'
                        );
      }
      return current.parent;
    }
  }

  // Handle leaf tags
  else {

    // Ensure we don't have a closing tag
    if(!openingTag) {
      throw new Error('Tokenization error: `' +
                      tagName +
                      '` is not a block tag.'
                      );
    }

    newToken = new token.LeafToken(tag,
                                   tagType,
                                   root,
                                   current,
                                   this.options);

    current.children.push(newToken);
    return current;
  }
};


Compiler.prototype.registerTemplateHelper = function(name, helper) {
  this.helpers[name] = helper;
};
}); // module: compiler.js

require.register("filter.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/*
 * Module dependencies
 */



/*
 * Apply `filters` to `input`, and return output.
 *
 * @param {String} input
 * @param {Mixed[]} filters
 * @return {String}
 * @api private
 */

function filter(input, filters) {
  var unknownFilter;
  filters.forEach(function(filterName) {
    var filterArgs = [];
    if(_.isArray(filterName)) {
      filterArgs = filterName.slice(1);
      filterName = filterName[0];
    }
    var filterFunction = module.exports.filters[filterName];
    if(!filterFunction) {
      unknownFilter = filterName;
      return false;
    }
    input = filterFunction.apply(this, [input].concat(filterArgs));
  });
  if(unknownFilter) {
    throw new Error('Rendering error: Unknown filter `' +
                    unknownFilter +
                    '`.'
                    );
  }
  return input;
}


/*
 * Module exports
 */

module.exports = filter;
var filters = module.exports.filters = {};


/*
 * Read tags from tags directory
 */

function loadFilters(loadedFiles) {
  loadedFiles = loadedFiles || frame.files.requireDir(__dirname + '/filters/');
  for(var file in loadedFiles) {
    var fileFilters = loadedFiles[file];
    for(var filter in fileFilters) {
      filters[filter] = fileFilters[filter];
    }
  }
}
 var files = ['base', 'datetime'];
 var acc = {};
 _.each(files, function(file) {
   acc[file] = require('./filters/' + file);
 });
 loadFilters(acc);

}); // module: filter.js

require.register("filters/base.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 *
 * Partly based on Swig
 * @see https://github.com/paularmstrong/swig
 */


/**
 * Module dependencies
 */

var tools = require('../tools');
var utils = require('../utils');


/**
 * Escape HTML in `input`.
 *
 * @param {String} input
 * @return {String}
 * @api private
 */

exports.escape = function(input) {
  if(input === null || input === undefined) return '';
  if(utils.isIterable(input)) {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.escape(value);
    });
    return acc;
  }
  return tools.escape(input);
};


/**
 * Escape HTML in `input` if not marked as safe.
 *
 * @param {String} input
 * @return {String}
 * @api private
 */

exports.escapeIfUnsafe = function(input) {
  if(input === null || input === undefined) return '';
   if(utils.isIterable(input)) {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.escapeIfUnsafe(value);
    });
    return acc;
  }
  return tools.escapeIfUnsafe(input);
};


/**
 * Capitalize `input`.
 *
 * @param {Mixed} input
 * @return {String}
 * @api private
 */

exports.capitalize = function(input) {
   if(utils.isIterable(input)) {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.capitalize(value);
    });
    return acc;
  }
  input = input.toString();
  return input.charAt(0).toUpperCase() + input.slice(1);
};


/**
 * Make `input` uppercase.
 *
 * @param {String} input
 * @return {String}
 * @api private
 */

exports.upper = function(input) {
   if(utils.isIterable(input)) {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.upper(value);
    });
    return acc;
  }
  return input.toString().toUpperCase();
};


/**
 * Make `input` lowercase.
 *
 * @param {String} input
 * @return {String}
 * @api private
 */

exports.lower = function(input) {
   if(utils.isIterable(input)) {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.lower(value);
    });
    return acc;
  }
  return input.toString().toLowerCase();
};


/**
 * Transform `input` to JSON.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.json = function(input) {
  return JSON.stringify(input);
};


/**
 * Add `operand` to `input` and return the result.
 *
 * @param {Mixed} input
 * @param {Mixed} operand
 * @return {Mixed}
 * @api private
 */

exports.add = function(input, operand) {
  if(typeof input === 'object') {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.add(value, operand);
    });
    return acc;
  }
  return parseFloat(input) + parseFloat(operand);
};


/**
 * Subtract `operand` from `input` and return the result.
 *
 * @param {Mixed} input
 * @param {Mixed} operand
 * @return {Mixed}
 * @api private
 */

exports.subtract = function(input, operand) {
  return exports.add(input, -parseInt(operand, 10));
};


/**
 * Multiply `operand` by `input` and return the result.
 *
 * @param {Mixed} input
 * @param {Mixed} operand
 * @return {Mixed}
 * @api private
 */

exports.mul = function(input, operand) {
  if(typeof input === 'object') {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.mul(value, operand);
    });
    return acc;
  }
  return parseFloat(input) * parseFloat(operand);
};


/**
 * Divide `input` by `operand` and return the result.
 *
 * @param {Mixed} input
 * @param {Mixed} operand
 * @return {Mixed}
 * @api private
 */

exports.div = function(input, operand) {
  if(typeof input === 'object') {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.div(value, operand);
    });
    return acc;
  }
  return parseFloat(input) / parseFloat(operand);
};


/**
 * Add 1 to `input` and return the result.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.incr = function(input, operand) {
  return exports.add(input, 1);
};


/**
 * Subtract 1 from `input` and return the result.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.decr = function(input, operand) {
  return exports.add(input, -1);
};


/**
 * Round `input` and return the result.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.round = function(input) {
  if(typeof input === 'object') {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.round(value);
    });
    return acc;
  }
  return Math.round(input);
};


/**
 * Calculate floor of `input` and return the result.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.floor = function(input) {
  if(typeof input === 'object') {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.floor(value);
    });
    return acc;
  }
  return Math.floor(input);
};


/**
 * Calculate ceiling of `input` and return the result.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.ceil = function(input) {
  if(typeof input === 'object') {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.ceil(value);
    });
    return acc;
  }
  return Math.ceil(input);
};


/**
 * Remove all occurences of `needle` in `input`.
 *
 * @param {String} input
 * @param {String} needle
 * @return {String}
 * @api private
 */

exports.cut = function(input, needle) {
  if(typeof input === 'object') {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.cut(value, needle);
    });
    return acc;
  }
  return input.toString().replace(needle, '');
};


/**
 * Slash `input`.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.addslashes = function(input) {
   if(utils.isIterable(input)) {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.capitalize(value);
    });
    return acc;
  }
  return input.toString()
              .replace(/\\/g, '\\\\')
              .replace(/\'/g, "\\'")
              .replace(/\"/g, '\\"')
              .replace(/\0/g,'\\0');
};


/**
 * Unslash `input`.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.stripslashes = function(input) {
   if(utils.isIterable(input)) {
    var acc = {};
    _.each(input, function (value, key) {
      acc[key] = exports.capitalize(value);
    });
    return acc;
  }
  return input.toString()
              .replace(/\\'/g,'\'')
              .replace(/\\"/g,'"')
              .replace(/\\0/g,'\0')
              .replace(/\\\\/g,'\\');
};


/**
 * Return first element from `input`.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.first = function (input) {
  if(typeof input === 'object' && !_.isArray(input)) return '';
  if(_.isString(input)) return input.substr(0, 1);
  return _.first(input);
};


/**
 * Return last element from `input`.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.last = function (input) {
  if(typeof input === 'object' && !_.isArray(input)) return '';
  if(_.isString(input)) return input.slice(-1);
  return _.last(input);
};


/**
 * Return length of `input`.
 *
 * @param {Mixed} input
 * @return {Integer}
 * @api private
 */

exports.length = function (input) {
  if(typeof input === 'object') return _.keys(input).length;
  return input.length;
};


/**
 * Reverse `input`.
 *
 * @param {Mixed} input
 * @return {Integer}
 * @api private
 */

exports.reverse = function (input) {
  if(_.isArray(input)) return input.reverse();
  return input;
};


/**
 * Join `input` with `separator`.
 *
 * @param {Mixed} input
 * @param {String} separator
 * @return {Mixed}
 * @api private
 */

exports.join = function (input, separator) {
  if(_.isArray(input)) return input.join(separator);
  if(typeof input === 'object') {
    var acc = [];
    _.each(input, function (value, key) {
      acc.push(value);
    });
    return acc.join(separator);
  }
  return input;
};


/**
 * Encode `input` to URL component.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */

exports.urlencode = function(input) {
  return encodeURIComponent(input);
};


/**
 * Decode `input` from URL component.
 *
 * @param {Mixed} input
 * @return {Mixed}
 * @api private
 */


exports.urldecode = function(input) {
  return decodeURIComponent(input);
};


/**
 * Replace `search` by `replacement` in `input`, with `flags`.
  *
 * @param {String} input
 * @param {String} replacement
 * @param {String} [flags]
 * @return {String}
 * @api private
 */

exports.replace = function(input, search, replacement, flags) {
  return input.replace(new RegExp(search, flags), replacement);
};


/**
 * Module exports
 */

module.exports = exports;

}); // module: filters/base.js

require.register("filters/datetime.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */



/**
 * Return humanized difference between now and `input`.
 *
 * @param {Mixed} input
 * @return {String}
 * @api private
 */

exports.timeago = function(input) {
  return moment(input).fromNow();
};


/**
 * Return calendar time for `input`, relative to now.
 *
 * @param {Mixed} input
 * @return {String}
 * @api private
 */

exports.relativedate = function(input) {
  return moment(input).calendar();
};


/**
 * Return formatted `input` with `pattern`.
 *
 * @param {Mixed} input
 * @param {String} pattern
 * @return {String}
 * @api private
 */

exports.date = function(input, pattern) {
  return moment(input).format(pattern);
};


/**
 * Module exports
 */

module.exports = exports;
}); // module: filters/datetime.js

require.register("kiwi.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */


var Template = exports.Template = require('./template');


/**
 * Exports
 */

exports.tools = require('./tools');




/**
 * Version
 */

exports.version = '0.2.1';


/**
 * Module exports
 */

module.exports = exports;
}); // module: kiwi.js

require.register("tags/as.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Constants
 */

var AS_PARSE_RE = /^as\s+([^\s]+)$/;


/**
 * Global variables
 */

module.exports.tags = {};
var asTag = module.exports.tags.as = {};


/**
 * Basic tag settings
 */

asTag.isBlock = true;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

asTag.compile = function(token, compiledContents,
                         compiledIntermediate, compiler, callback) {

  var parsed = token.tag.match(AS_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }

  var name = parsed[1];

  var compiled = '(function(parentAcc) {' +
                   'var __acc = [];' +
                   compiledContents +
                   'var __joined = __acc.join("");' +
                   '$data["' + name + '"] = $tools.tools.safe(__joined);' +
                 '})(__acc);';

  callback(null, compiled);
};

}); // module: tags/as.js

require.register("tags/block.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Constants
 */

var BLOCK_PARSE_RE = /^block\s+([^\s]+)(?:\s+(append|prepend))?$/;


/**
 * Global variables
 */

module.exports.tags = {};
var blockTag = module.exports.tags.block = {};
var parentTag = module.exports.tags.parent = {};


/**
 * Block tag
 */

/**
 * Basic tag settings
 */

blockTag.isBlock = true;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

blockTag.compile = function(token, compiledContents,
                            compiledIntermediate, compiler, callback) {

  var parsed = token.tag.match(BLOCK_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }

  var name = parsed[1];
  var mode = parsed[2];

  //console.log(compiledContents);

  var compiled = '(function(__parentAcc) {' +
                   'var __acc = [];' +
                   compiledContents +
                   'var __currentBlock = __acc.join("");' +
                   'if(!_.isUndefined(__blocks["' + name + '"])) {' +
                     '__tmp = new String(__blocks["' + name + '"].replace(' +
                       '/\\{\\{parent\\}\\}/g, __currentBlock' +
                     '));' +
                     'if(__blocks["' + name + '"].mode) {' +
                       '__tmp.mode = __blocks["' + name + '"].mode;' +
                     '}' +
                     '__blocks["' + name + '"] = __tmp;' +
                   '}' +
                   'var __acc = [];' +
                   'if(_.isUndefined(__blocks["' + name + '"]) ||' +
                      '__blocks["' + name + '"].mode) {' +
                     'if(__blocks["' + name + '"] &&' +
                        '__blocks["' + name + '"].mode == "append") {' +
                       '__acc.push(__blocks["' + name + '"]);' +
                     '}' +
                     '__acc.push(__currentBlock);' +
                     'if(__blocks["' + name + '"] &&' +
                        '__blocks["' + name + '"].mode == "prepend") {' +
                       '__acc.push(__blocks["' + name + '"]);' +
                     '}' +
                   '} else {' +
                     '__acc.push(__blocks["' + name + '"]);' +
                   '}' +
                   'var __joined = new String(__acc.join(""));' +
                   (mode ? ('__joined.mode = "' + mode + '";') : '') +
                   '__parentAcc.push(__joined);' +
                   '__blocks["' + name + '"] = __joined;' +
                 '})(__acc);';

  callback(null, compiled);
};


/**
 * Parent tag
 */

/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

parentTag.compile = function(token, compiledContents, compiler, callback) {
  if(!token.parent.tagType || token.parent.tagType.tagName !== 'block') {
    return callback(new Error(
      'Compilation error: `parent` must be immediate child of a `block` tag.'
    ));
  }

  token.parent.hasParentTag = true;

  callback(null, '__acc.push("{{parent}}");');
};

}); // module: tags/block.js

require.register("tags/comment.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Constants
 */

var COMMENT_RE = /\{\{\s*comment\s*\}\}((.|\n)*?)\{\{\s*\/\s*comment\s*\}\}/g;


/**
 * Global variables
 */

module.exports.tags = {};
var commentTag = module.exports.tags['#'] = {};


/**
 * Basic tag settings
 */

commentTag.isBlock = false;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

commentTag.compile = function(token, compiledContents, compiler, callback) {
  callback(null, '');
};


/**
 * Before Processor.
 * Replace "{{verbatim}}…{{/verbatim}}" with a placeholder in `source`, and
 * invoke `callback(err, replaced)`.
 *
 * @param {String} source
 * @param {Function} callback
 * @api private
 */

commentTag.beforeProcessor = function(source, compiler, callback) {
  source = source.replace(COMMENT_RE, '');
  callback(null, source);
};
}); // module: tags/comment.js

require.register("tags/each.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Constants
 */

var EACH_PARSE_RE = /^each(?:\(([^\)\s]+)\s*\,\s*([^\)\s]+)\s*\))?\s+(.*)$/;


/**
 * Global variables
 */

module.exports.tags = {};
var eachTag = module.exports.tags.each = {};
var intermediateTags = eachTag.intermediateTags = {};
var emptyTag = intermediateTags.empty = {};


/**
 * Basic tag settings
 */

eachTag.isBlock = true;
eachTag.headDeclarations = 'var $each = undefined;';


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

eachTag.compile = function(token, compiledContents,
                              compiledIntermediate, compiler, callback) {
  var parsed = token.tag.match(EACH_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }

  var elementVariable = parsed[1] || '$value';
  var indexVariable = parsed[2] || '$index';
  var collection = parsed[3];
  var ifEmpty;

  // If we have an intermediate tag
  if(compiledIntermediate.length) {

    // Ensure there is only one tag
    if(compiledIntermediate.length > 1) {
      return callback(new Error('Compilation Error: Too many intermediate ' +
                                'tags for `each`.'
                                ));
    }

    // Check tag
    if(token.intermediate[0].tag !== 'empty') {
      return callback(new Error('Compilation Error: Unexpected tag `' +
                                token.intermediate[0].tag +
                                '`.'
                                ));
    }

    ifEmpty = compiledIntermediate[0];
  }

  // Actually compile tag
  var compiled = '(function(__parentEachLoop) {';

  // Add loop collection part
  if(!token.options.strict) {
    compiled += 'try {' +
                  '__tmp = ' + collection +
                '} catch(__err) {' +
                  'if(__err instanceof ReferenceError) {' +
                    '__tmp = [];' +
                  '} else {' +
                    'throw __err;' +
                  '}' +
                '}';
  }
  else {
    compiled += '__tmp = ' + collection + ';';
  }

  // Calculate loop collection length
  compiled +=   'var __eachLoopLength = _.size(__tmp);' +
                'var _eachLoop, $each;';

  // Add the empty start part
  if(ifEmpty) compiled += 'if(__eachLoopLength) {';

  // Call each
  if(token.options.eachCounters) {
    compiled += 'var __eachLoopCounter = 0;' +
                '_.each(__tmp, ' +
                'function(' + elementVariable + ',' + indexVariable + '){' +
                  '$each = _eachLoop = {' +
                    'size: __eachLoopLength,' +
                    'counter0: __eachLoopCounter,' +
                    'counter: __eachLoopCounter + 1,' +
                    'revcounter0: __eachLoopLength - __eachLoopCounter - 1,' +
                    'revcounter: __eachLoopLength - __eachLoopCounter,' +
                    'first: __eachLoopCounter === 0,' +
                    'last: __eachLoopCounter + 1 === __eachLoopLength,' +
                    'parentLoop: __parentEachLoop,' +
                    'parent: __parentEachLoop,' +
                    '_index: ' + indexVariable + ',' +
                    '_value: ' + elementVariable +
                  '};' +
                  'if(__parentEachLoop) {' +
                    '$each.parentIndex = __parentEachLoop._index;' +
                    '$each.parentValue = __parentEachLoop._value;' +
                  '}' +
                  compiledContents +
                  '__eachLoopCounter++;' +
                '});';
  }
  else {
    compiled += '_.each(__tmp, ' +
                'function(' + elementVariable + ',' + indexVariable + ') {' +
                  compiledContents +
                '});';
  }

  // Add the empty remaining part, if requested
  if(ifEmpty) {
    compiled += '} else {' +
                  ifEmpty +
                '}';
  }

  compiled += '})($each);';

  callback(null, compiled);
};

}); // module: tags/each.js

require.register("tags/extend.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var utils = require('../utils');


/**
 * Constants
 */

var EXTEND_PARSE_RE = /^extend\s+(.+)$/;


/**
 * Global variables
 */

module.exports.tags = {};
var extendTag = module.exports.tags.extend = {};
var helpers = module.exports.helpers = {};


/**
 * Basic tag settings
 */

extendTag.isBlock = false;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

extendTag.compile = function(token, compiledContents, compiler, callback) {
  if(token.root.children[0] !== token) {
    return callback(new Error('Compilation error: Extend tag must be defined ' +
                              'at the very beginning of the template.'
                              ));
  }

  var parsed = token.tag.match(EXTEND_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }

  var name = parsed[1];

  var compiled = 'var __originalCallback = $callback;' +
                 '$callback = function(err, compiled) {' +
                   '$helpers.extend(' + name + ', __compiled, $template,' +
                                    '$data, __originalCallback);' +
                 '};';

  callback(null, compiled);
};


/**
 * Helper function.
 * Make `compiled` `template` with `data` extend `name` template, and invoke
 * `callback(err, compiled)`.
 *
 * @param {String} name
 * @param {String} compiled
 * @param {Template} template
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

helpers.extend = function(name, compiled, template, data, callback) {

  function onRendered(err, rendered) {
    if(err) return callback(err);
    callback(null, rendered);
  }

  template._renderRelative(name, data, compiled, onRendered);
};

}); // module: tags/extend.js

require.register("tags/filter.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */
 
var utils = require('../utils');
 
 
/**
 * Constants
 */

var FILTER_PARSE_RE = /^filter\s+(.+)$/;


/**
 * Global variables
 */

module.exports.tags = {};
var filterTag = module.exports.tags.filter = {};


/**
 * Basic tag settings
 */

filterTag.isBlock = true;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

filterTag.compile = function(token, compiledContents,
                             compiledIntermediate, compiler, callback) {

  var parsed = token.tag.match(FILTER_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }
  
  var filters;
  
  try {
    filters = utils.parseFilters(parsed[1]);
  } catch(err) {
    return callback(err);
  }

  var name = parsed[1];

  var compiled = '(function(__parentAcc) {' +
                   'var __acc = [];' +
                   compiledContents +
                   '__parentAcc.push(' +
                     '$tools.filter(' +
                       '__acc.join(""),' +
                       '[' + filters.join(',') + ']' +
                     ')' +
                   ');' +
                 '})(__acc);';

  callback(null, compiled);
};

}); // module: tags/filter.js

require.register("tags/if.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */



/**
 * Constants
 */

var IF_PARSE_RE = /^if\s+(.*)$/;
var ELSE_PARSE_RE = /^else(?:\s+(.*))?$/;


/**
 * Global variables
 */

module.exports.tags = {};
var ifTag = module.exports.tags['if'] = {};
var intermediateTags = ifTag.intermediateTags = {};
var elseTag = intermediateTags['else'] = {};


/**
 * Global functions
 */


/**
 * Outputs `if` clause based on `condition`. If not `strict`,
 * actual test will be wrapped in a `try…catch` statement to catch
 * ReferenceErrors silently
 *
 * @param {String} condition
 * @param {Boolean} strict
 * @return {String}
 * @api private
 */

function createIfCondition(condition, strict) {
  var compiled;
  if(strict) {
    compiled = 'if(' + condition + ')';
  } else {
    compiled = 'try {' +
                 '__tmp = ' + condition +
               '} catch(__err) {' +
                 'if(__err instanceof ReferenceError) {' +
                   '__tmp = false;' +
                 '} else {' +
                   'throw __err;' +
                 '}' +
               '}' +
               'if(__tmp)';
  }
  return compiled;
}


/**
 * Basic tag settings
 */

ifTag.isBlock = true;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

ifTag.compile = function(token, compiledContents,
                            compiledIntermediate, compiler, callback) {
  var parsed = token.tag.match(IF_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }

  var condition = parsed[1];
  var appendEnd = ['}'];

  // Handle basic if
  var compiled = createIfCondition(condition, token.options.strict);
  compiled += '{' + compiledContents;

  // Handle else
  var err;
  _.each(token.intermediate, function(intermediate, index) {
    var intermediateTag = intermediate.tag;
    var compiledIntermediateTag = compiledIntermediate[index];
    var parsed = intermediateTag.match(ELSE_PARSE_RE);

    if(!parsed) {
      err = new Error('Compilation error: Unable to parse tag `' +
                      token.tag +
                      '`.'
                      );
      return;
    }

    var condition = parsed[1];
    if(!condition) {
      compiled += '} else {';
    } else {
      appendEnd.push('}');
      compiled += '} else {' +
                  createIfCondition(condition, token.options.strict) +
                  '{';
    }

    compiled += compiledIntermediate[index];
  });

  // Handle error
  if(err) return callback(err);

  // Return
  compiled += appendEnd.join('');
  callback(null, compiled);
};

}); // module: tags/if.js

require.register("tags/ifblock.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Constants
 */

var IFBLOCK_PARSE_RE = /^ifblock\s+([^\s]+)$/;


/**
 * Global variables
 */

module.exports.tags = {};
var ifBlockTag = module.exports.tags.ifblock = {};


/**
 * Basic tag settings
 */

ifBlockTag.isBlock = true;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

ifBlockTag.compile = function(token, compiledContents,
                              compiledIntermediate, compiler, callback) {

  var parsed = token.tag.match(IFBLOCK_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }

  var name = parsed[1];

  var compiled = 'if(!_.isUndefined(__blocks["' + name + '"])) {' +
                   compiledContents +
                 '}';

  callback(null, compiled);
};

}); // module: tags/ifblock.js

require.register("tags/include.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var utils = require('../utils');


/**
 * Constants
 */

var INCLUDE_PARSE_RE = /^include\s+(.+)$/;


/**
 * Global variables
 */

module.exports.tags = {};
var includeTag = module.exports.tags.include = {};
var helpers = module.exports.helpers = {};


/**
 * Basic tag settings
 */

includeTag.isBlock = false;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

includeTag.compile = function(token, compiledContents, compiler, callback) {
  var parsed = token.tag.match(INCLUDE_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }

  var name = parsed[1];

  compiler.__compilationEnd.unshift('});');
  var compiled = '$helpers.include(' + name + ', $template,' +
                                    '$data, function(err, rendered) {' +
                   '__acc.push(rendered);';

  callback(null, compiled);
};


/**
 * Helper function.
 * Make `compiled` `template` with `data` extend `name` template, and invoke
 * `callback(err, compiled)`.
 *
 * @param {String} name
 * @param {String} compiled
 * @param {Template} template
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

helpers.include = function(name, template, data, callback) {

  function onRendered(err, rendered) {
    if(err) return callback(err);
    callback(null, rendered);
  }

  template._renderRelative(name, data, null, onRendered);
};

}); // module: tags/include.js

require.register("tags/print.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */


var filter = require('../filter');
var utils = require('../utils');


/**
 * Constants
 */

var TAG_REPLACE_RE = /\$\{([^\}]*)\}/g;
var TAG_PARSE_RE = /^(?:=|html)\s+(?:\:(\d+)\s+)?([^|]+)(?:\|(.*))?$/;
var DEFAULT_VARIABLE_FILTERS = ['escapeIfUnsafe'].map(JSON.stringify);
var DEFAULT_HTML_FILTERS = [];


/**
 * Global variables
 */

module.exports.tags = {};
var variableTag = module.exports.tags['='] = {};
var htmlTag = module.exports.tags['html'] = {};


/**
 * Basic tag settings
 */

variableTag.isBlock = false;
htmlTag.isBlock = false;


/**
 * Before Processor.
 * Replace "${…}" to "{{= …}}" in `source`, and invoke
 * `callback(err, replaced)`.
 *
 * @param {String} source
 * @param {Function} callback
 * @api private
 */

variableTag.beforeProcessor = function(source, compiler, callback) {
  compiler.__print = [];
  source = source.replace(TAG_REPLACE_RE, function(all, contents) {
    compiler.__print.push(all);
    return '{{= :' + compiler.__print.length + ' ' + contents + '}}';
  });
  callback(null, source);
};


/**
 * Compilers.
 */

variableTag.compile = createPrintTagCompiler(DEFAULT_VARIABLE_FILTERS);
htmlTag.compile = createPrintTagCompiler(DEFAULT_HTML_FILTERS);


/**
 * Create print tag based on `defaultFilters`.
 * Return `function(token, compiledContents, compiler, callback)`.
 *
 * @param {Array} defaultFilters
 * @return {Function}
 * @api private
 */

function createPrintTagCompiler(defaultFilters) {
  var compiler = function(token, compiledContents, compiler, callback) {
    var parsed = token.tag.match(TAG_PARSE_RE);

    if(!parsed) {
      return callback(new Error('Compilation error: Unable to parse tag `' +
                                token.tag +
                                '`.'
                                ));
    }

    // Handle decompiler
    if(parsed[1]) {
      var key = parseInt(parsed[1], 10) - 1;
      token.__originalTag = compiler.__print[key];
    }

    var contents = parsed[2];
    var filters;
    
    try {
      filters = parsed[3] ? utils.parseFilters(parsed[3], defaultFilters) :
                            defaultFilters;
    } catch(err) {
      return callback(err);
    }
                              
    contents = '$tools.filter(' +
               contents +
               ', ' +
               '[' + filters.join(',') + ']' +
               ')';

    var ret;

    if(!token.options.strict) {
      ret = 'try {' +
              'var __tmp = ' + contents + ';' +
            '} catch(__err) {' +
              'if(__err instanceof ReferenceError) {' +
                '__tmp = "";' +
              '} else {' +
                'throw __err;' +
              '}' +
            '}' +
            '__acc.push(__tmp);';
    } else {
      ret = '__acc.push(' + contents + ');';
    }
    callback(null, ret);
  };

  compiler.untokenize = function(token, compiler) {
    return token.__originalTag ?
             token.__originalTag :
             ('{{' + token.tag + '}}');
  };

  return compiler;
}

}); // module: tags/print.js

require.register("tags/raw.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var utils = require('../utils');


/**
 * Constants
 * @see https://github.com/kof/node-jqtpl
 */

var VERBATIM_RE = new RegExp(
  '\\{\\{\\s*verbatim\\s*\\}\\}((?:.|\\n)*?)' +
  '\\{\\{\\s*\\/\\s*verbatim\\s*\\}\\}|' +
  '{\\{\\s*raw\\s*\\}\\}((?:.|\\n)*?)\\{\\{\\s*\\/\\s*raw\\s*\\}\\}'
, 'g');


/**
 * Global variables
 */

module.exports.tags = {};
var verbatimTag = module.exports.tags.verbatim = {};


/**
 * Basic tag settings
 */

verbatimTag.isBlock = false;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

verbatimTag.compile = function(token, compiledContents, compiler, callback) {
  var key = parseInt(token.tag.split(' ')[1], 10) - 1;
  callback(null, '__acc.push("' +
                 utils.escapeCompiledString(compiler.__verbatim[key]) +
                 '");'
                 );
};


/**
 * Before Processor.
 * Replace "{{verbatim}}…{{/verbatim}}" with a placeholder in `source`, and
 * invoke `callback(err, replaced)`.
 *
 * @param {String} source
 * @param {Function} callback
 * @api private
 */

verbatimTag.beforeProcessorPrepend = true;
verbatimTag.beforeProcessor = function(source, compiler, callback) {
  compiler.__verbatim = [];
  source = source.replace(VERBATIM_RE, function onMatch(all, content1, content2) {
    compiler.__verbatim.push(content1 || content2);
    return '{{verbatim ' + compiler.__verbatim.length + '}}';
  });
  callback(null, source);
};

}); // module: tags/raw.js

require.register("tags/tmpl.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var utils = require('../utils');


/**
 * Constants
 */

var TAG_PARSE_RE = /^tmpl\s+(.*)$/;


/**
 * Global variables
 */

module.exports.tags = {};
var tmplTag = module.exports.tags.tmpl = {};


/**
 * Basic tag settings
 */

tmplTag.isBlock = false;


/**
 * Compile `token` with `compiledContents` to JavaScript, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BlockToken} token
 * @param {String} compiledContents
 * @param {Function} callback
 * @api private
 */

tmplTag.compile = function(token, compiledContents, compiler, callback) {
  var parsed = token.tag.match(TAG_PARSE_RE);

  if(!parsed) {
    return callback(new Error('Compilation error: Unable to parse tag `' +
                              token.tag +
                              '`.'
                              ));
  }

  var nested = parsed[1];

  compiler.__compilationEnd.unshift('});');
  callback(null, '$template._nest(' + nested + ', $data, ' +
                                    'function(err, rendered){' +
                   '__acc.push(rendered);'
                 );
};

}); // module: tags/tmpl.js

require.register("template.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var Cache = require('./cache');
var CappedCache = Cache;

var utils = require('./utils');
var token = require('./token');
var tools = require('./tools');
var Compiler = require('./compiler');
var filter = require('./filter');


/**
 * Constants
 */

var DEFAULTS = {
  lookup: utils.lookupTemplate,
  load: utils.loadTemplate,
  path: null,
  cache: true,
  cacheHandler: Cache,
  cacheOptions: [],
  lookupPaths: [],
  cacheTmplHandler: CappedCache,
  cacheTmplOptions: [1000],
  useIsolatedTmplCache: true,
  cacheContext: null,
  strict: true,
  eachCounters: true,
  _parent: null,
  _cacheAttachment: '_cache',
  _cacheTmplAttachment: '_nestCache'
};
var TEMPLATE_EXPORTS = {filter: filter, utils: utils, tools: tools};


/**
 * Initializes `Template` with optionnally the given `str` and
 * `options`.
 *
 * @param {String} [str]
 * @param {Object} [options]
 * @api public
 */

function Template(str, options) {

  // Handle the case where the only argument passed is the `options` object
  if(_.isObject(str) && !options){
    options = str;
    str = null;
  }

  // Create options if not provided
  options = options ? _.clone(options) : {};

  // Set default cache behavior

  // Merges given `options` with `DEFAULTS`
  options = _.defaults(options, DEFAULTS);
  options.cacheContext = options.cacheContext || Template;

  // Sets instance variables
  this.template = str;
  this.options = options;
  this._compiled = null;

  // Creates the cache if not already done
  if(options.cache && !(this._getCache() instanceof options.cacheHandler)) {
    var cacheOptions = [options.cacheHandler].concat(options.cacheOptions);
    options.cacheContext[options._cacheProp] = typeof window !== 'undefined' ?
                                                 new options.cacheHandler() :
                                                 construct.apply(this,
                                                                 cacheOptions);
  }
}


/**
 * Get cache handler
 *
 * @return {Object}
 * @api private
 */

Template.prototype._getCache = function() {
  return this.options.cacheContext[this.options._cacheProp];
};


/**
 * Load the template from disk at `filePath`, and invoke `callback(err)`.
 *
 * @param {String} filePath
 * @param {Function} callback
 * @api public
 */

Template.prototype.loadFile = function(filePath, callback) {
 callback(new Error('Client mode does not support reading from file.'));
};


/**
 * Render the template with given `data`, and invoke `callback(err, compiled)`.
 *
 * @param {Object} [data]
 * @param {Function} callback
 * @api public
 */

Template.prototype.render = function(data, callback) {

  // Support callback as 1st arg
  if(_.isFunction(data) && !callback){
    callback = data;
    data = {};
  }

  // Data defaults
  if(!data) data = {};

  // Check whether we have the compiled template ready in the object or in cache
  var cacheKey = 'template::' + this._cacheKey();
  if(!this.compiled && this.options.cache) {
    this._compiled = this._getCache().get(cacheKey);
  }

  // Render it if we got it…
  if(this._compiled) return this._renderCompiled(data, callback);

  // …or compile it if we don't
  var _this = this;
  this._compile(function(err){
    if(err) return callback(err);
    _this._renderCompiled(data, callback);
  });
};


/**
 * Load the template from disk at `filePath`, render it with given `data`,
 * and invoke `callback(err, compiled)`.
 *
 * @param {String} filePath
 * @param {Object} [data]
 * @param {Function} callback
 * @api public
 */

Template.prototype.loadAndRender = function(filePath, data, callback) {
 callback(new Error('Client mode does not support reading from file.'));
};


/**
 * Render the compiled template with given `data`, and invoke
 * `callback(err, compiled)`.
 *
 * @param {String} filePath
 * @param {Function} callback
 * @api private
 */

Template.prototype._renderCompiled = function onRendered(data, callback) {
  try {
    // Apply compiled function to itself (needed for function helpers)
    this._compiled.call(this._compiled, this, TEMPLATE_EXPORTS, _, data,
                        token.helpers, callback);
  } catch(err) {
    callback(err);
  }
};


/**
 * Compile the template, and invoke `callback(err, compiled)`.
 *
 * @param {Function} callback
 * @api private
 */

Template.prototype._compile = function(callback) {
  var _this = this;
  if(!_.isString(this.template)) {
    return callback(new Error('Template contents not set'));
  }

  new Compiler(this).compile(function(err, compiled) {

    if(err) return callback(err);

    // Save the compiled template in this object
    _this._compiled = compiled;

    // Cache it, if possible
    var cacheKey = 'template::' + _this._cacheKey();
    if(_this.options.cache) {
      _this._getCache().cache(cacheKey, compiled);
    }

    // Invoke the callback
    callback(null, compiled);
  });
};


/**
 * Render `nested` template with `data`, and invoke `callback(err, rendered)`.
 *
 * @param {String} nested
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

Template.prototype._nest = function(nested, data, callback) {
  var options = _.clone(this.options);
  if(options.useIsolatedTmplCache) {
    options._cacheAttachment = options._cacheTmplAttachment;
    options.cacheHandler = options.cacheTmplHandler;
    options.cacheOptions = options.cacheTmplOptions;
  }
  new Template(nested, options).render(data, function onDone(err, rendered) {
    if(err) return callback(err);
    callback(null, rendered);
  });
};


/**
 * Render `nested` template with `data`, and invoke `callback(err, rendered)`.
 *
 * @param {String} nested
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

Template.prototype._renderRelative = function(name, data, rendered, callback) {
  var _this = this;
  var cacheKey;
  var cachedPath;
  var template;

  function onTemplateLocated(err, filePath) {
    if(err) return callback(err);
    if(_this.options.cache) {
      _this._getCache().cache(cacheKey, filePath);
    }
    template.loadFile(filePath, onTemplateLoaded);
  }

  function onTemplateLoaded(err, source) {
    if(err) return callback(err);
    template.render(data, onTemplateRendered);
  }

  function onTemplateRendered(err, result) {
    if(err) return callback(err);
    callback(null, result);
  }
  
  if(name instanceof Template) {
  
    template = name;
    template.options._parent = rendered;
    template.render(data, onTemplateRendered);
    
  } else {
  
    var options = _.clone(this.options);
    options._parent = rendered;
    template = new Template(options);
    cacheKey = 'path::' + this._cacheKey() + '::' + name;
    
    // Handle cache
    if(this.options.cache) {
      cachedPath = this._getCache().get(cacheKey);
    }
    if(cachedPath) {
      template.loadFile(cachedPath, onTemplateLoaded);
    } else {
      this.options.lookup(name, this, onTemplateLocated);
    }
  }
};


/**
 * Calculate  and return cache key.
 *
 * @return {String} Cache key.
 * @api private
 */

Template.prototype._cacheKey = function() {
  return this.options.path || this.template || null;
};


/**
 * Module exports
 */

module.exports = Template;

}); // module: template.js

require.register("token.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/*
 * Module dependencies
 */

var frame;

var utils = require('./utils');
var inherits = frame ? frame.classes.extend : utils.inherits;


/*
 * Global variables
 */

var headDeclarations = [];
var footDeclarations = [];
var tags = {};
var tagBeforeProcessors = [];
var helpers = {};


/*
 * Base token
 */


/*
 * Initializes `BaseToken`, with `parent` and `root`.
 *
 * @api private
 * @constructor
 */

function BaseToken(root, parent, options) {
  this.parent = parent;
  this.children = [];
  this.tag = null;
  this.tagType = null;
  this.options = options;
  this.root = root;
}


/*
 * Stub for the `compile` method, to be overloaded, ivoking
 * `callback(err, compiled)`
 *
 * @param {Function} callback
 * @api private
 */

BaseToken.prototype.compile = function(compiler, callback) {
  callback(new Error('Stub method BaseToken#compile must be overloaded'));
};


/*
 * Look for `tag` definition in global tags, or in current token's special tags.
 * Return the first matched tag.
 *
 * @param {String} tag
 * @return {Object} Tag definition for `tag`
 * @api private
 */

BaseToken.prototype.lookupTag = function(tag) {
  if(tags[tag]) return tags[tag];
  if(this.tagType && this.tagType.intermediateTags &&
                     this.tagType.intermediateTags[tag]) {

    this.tagType.intermediateTags[tag].isIntermediate = true;
    return this.tagType.intermediateTags[tag];
  }
};


/*
 * Literal token
 */


/*
 * Initialize `LiteralToken`, with `parent`, `root` and `literal`
 *
 * @param {String} literal
 * @param {BaseToken} parent
 * @api private
 * @extends BaseToken
 * @constructor
 */

function LiteralToken(literal, root, parent, options) {
  LiteralToken._superclass.call(this, root, parent, options);
  this.literal = literal;
}
inherits(LiteralToken, BaseToken);


/*
 * Compile `LiteralToken` to JavaScript, and invoke `callback(err, compiled)`
 *
 * @param {Function} callback (Optional)
 * @api private
 */

LiteralToken.prototype.compile = function(compiler, callback) {
  this._compiled = '__acc.push("' +
                   utils.escapeCompiledString(this.literal) +
                   '");';

  callback(null, this._compiled);
};


/*
 * Root token
 */


/*
 * Initialize `RootToken`, with `children`
 *
 * @param {BaseToken[]} children [children]
 * @api private
 * @extends BaseToken
 * @constructor
 */

function RootToken(children, options) {
  RootToken._superclass.call(this, this, null, options);
  if(!children) children = [];
  this.head = [];
  this.children = children;
}
inherits(RootToken, BaseToken);


/*
 * Compile `RootToken` to JavaScript, and invoke `callback(err, compiled)`
 *
 * @param {Function} callback (Optional)
 * @api private
 */

RootToken.prototype.compile = function(compiler, callback) {
  var _this = this;

  function onCompiled(err, compiled) {
    if(err) return callback(err);
    compiled = 'var __this = this;' +
               'var __acc = [];' +
               'var __blocks = {};' +
               'if($template.options && $template.options._parent) {' +
                 '__blocks = $template.options._parent.blocks;' +
               '}' +
               'var __tmp;' +
               'var __err;' +
               '$data = $data || {};' +
               headDeclarations.join('') +
               'with($data) {' +
                 compiled +
                 footDeclarations.join('') +
                 'var __compiled = new String(__acc.join(""));' +
                 '__compiled.blocks = __blocks;' +
                 '$callback(null, __compiled);' +
                 compiler.__compilationEnd.join('') +
               '}';
    _this._compiled = compiled;
    callback(null, compiled);
  }

  utils.compileTokens(this.children, compiler, onCompiled);
};


/*
 * Block token
 */


/*
 * Initialize `BlockToken` for `tag` of `tagType` with `parent` and `children`
 *
 * @param {Object} tag
 * @param {BaseToken} parent
 * @param {BaseToken[]} [children]
 * @api private
 * @extends BaseToken
 * @constructor
 */

function BlockToken(tag, tagType, root, parent, children, options) {
  BlockToken._superclass.call(this, root, parent, options);
  this.tag = tag;
  this.tagType = tagType;
  if(!children) children = [];
  this.children = children;
  this.intermediate = [];
}
inherits(BlockToken, BaseToken);


/*
 * Compile `BlockToken` to JavaScript, and invoke `callback(err, compiled)`
 *
 * @param {Function} callback (Optional)
 * @api private
 */

BlockToken.prototype.compile = function(compiler, callback) {
  var _this = this;
  var compiledContents;
  var compiledIntermediate;
  var compile = this.tagType.compile;
  var compilationFunction = compile.joinCompilationResult !== false ?
                              'compileTokens' : 'compileTokenArray';

  function onContentsCompiled(err, compiled) {
    if(err) return callback(err);
    compiledContents = compiled;
    utils.compileTokenArray(_this.intermediate, compiler,
                            onIntermediateCompiled);
  }

  function onIntermediateCompiled(err, compiled) {
    if(err) return callback(err);
    compiledIntermediate = compiled;
    compile(_this, compiledContents,
            compiledIntermediate, compiler,
            onCompiled);
  }

  function onCompiled(err, compiled) {
    if(err) return callback(err);
    _this._compiled = compiled;
    callback(null, compiled);
  }

  utils[compilationFunction](this.children, compiler, onContentsCompiled);
};


/*
 * Leaf token
 */


/*
 * Initialize `LeafToken` for `tag` of `tagType` with `parent`
 *
 * @param {Object} tag
 * @param {BaseToken} parent
 * @param {BaseToken[]} [children]
 * @api private
 * @extends BaseToken
 * @constructor
 */

function LeafToken(tag, tagType, root, parent, options) {
  LeafToken._superclass.call(this, root, parent, options);
  this.tag = tag;
  this.tagType = tagType;
}
inherits(LeafToken, BaseToken);


/*
 * Compile `LeafToken` to JavaScript, and invoke `callback(err, compiled)`
 *
 * @param {Compiler} compiler
 * @param {Function} callback
 * @api private
 */

LeafToken.prototype.compile = function(compiler, callback) {
  var _this = this;

  function onCompiled(err, compiled) {
    if(err) return callback(err);
    _this._compiled = compiled;
    callback(null, compiled);
  }

  var compiled = this.tagType.compile(this, null, compiler, onCompiled);
};


/*
 * Untokenize `LeafToken`, and return the result.
 *
 * @param {Compiler} compiler
 * @return {String}
 * @api private
 */

LeafToken.prototype.untokenize = function(compiler) {
  return this.tagType.compile.untokenize ?
           this.tagType.compile.untokenize(this, compiler) :
           ('{{' + this.tag + '}}');
};


/*
 * Initialize `IntermediateToken` for `tag` of `tagType` with `parent`
 * and `children`
 *
 * @param {Object} tag
 * @param {BaseToken} parent
 * @param {BaseToken[]} [children]
 * @api private
 * @extends BaseToken
 * @constructor
 */

function IntermediateToken(tag, tagType, root, parent, children, options) {
  IntermediateToken._superclass.call(this, tag, tagType, root,
                              parent, children, options);
}
inherits(IntermediateToken, BlockToken);


/*
 * Compile `IntermediateToken` to JavaScript, and invoke
 * `callback(err, compiled)`
 *
 * @param {Function} callback (Optional)
 * @api private
 */

IntermediateToken.prototype.compile = function(compiler, callback) {
  var _this = this;

  function onContentsCompiled(err, compiledContents) {
    if(err) return callback(err);
    callback(null, compiledContents);
  }

  utils.compileTokens(this.children, compiler, onContentsCompiled);
};


/*
 * Look for `tag` definition in global tags, or in current token's special tags.
 * Return the first matched tag.
 *
 * @param {String} tag
 * @return {Object} Tag definition for `tag`
 * @api private
 */

IntermediateToken.prototype.lookupTag = function(tag) {
  return this.parent.lookupTag(tag);
};


/**
 * Register `tag` with name `name`.
 *
 * @param {String} name
 * @param {Function} tag
 * @api public
 */

function registerTag(name, tag) {
  if(tag.beforeProcessor) {
    if(tag.beforeProcessorPrepend) {
      tagBeforeProcessors.unshift(tag.beforeProcessor);
    } else {
      tagBeforeProcessors.push(tag.beforeProcessor);
    }
  }
  if(tag.headDeclarations) {
    headDeclarations.push(tag.headDeclarations);
  }
  if(tag.footDeclarations) {
    footDeclarations.push(tag.footDeclarations);
  }
  if(tag.helpers) {
    for(var helperName in tag.helpers) {
      registerHelper(helperName, tag.helpers[helperName]);
    }
  }
  tags[name] = tag;
  tag.tagName = name;
}


/**
 * Register `helper` with name `name`.
 *
 * @param {String} name
 * @param {Function} helper
 * @api public
 */

function registerHelper(name, helper) {
  helpers[name] = helper;
}


/*
 * Module exports
 */

module.exports = {
  BaseToken: BaseToken,
  RootToken: RootToken,
  BlockToken: BlockToken,
  IntermediateToken: IntermediateToken,
  LeafToken: LeafToken,
  LiteralToken: LiteralToken,
  headDeclarations: headDeclarations,
  footDeclarations: footDeclarations,
  tags: tags,
  tagBeforeProcessors: tagBeforeProcessors,
  helpers: helpers,
  registerTag: registerTag,
  registerHelper: registerHelper
};


/*
 * Read tags from tags directory
 */

function loadTags(loadedFiles) {
  loadedFiles = loadedFiles || frame.files.requireDir(__dirname + '/tags/');
  for(var file in loadedFiles) {
    var fileTags = loadedFiles[file].tags;
    var fileHelpers = loadedFiles[file].helpers;

    // Process tags
    for(var tag in fileTags) {
      registerTag(tag, fileTags[tag]);
    }

    // Process tags
    if(fileHelpers) {
      for(var helperName in fileHelpers) {
        registerHelper(helperName, fileHelpers[helperName]);
      }
    }
  }
}

 var files = [
   'block', 'comment', 'each', 'if', 'print', 'raw', 'tmpl', 'ifblock', 'as', 'include', 'extend'
 ];
 var acc = {};
 _.each(files, function(file) {
   acc[file] = require('./tags/' + file);
 });
 loadTags(acc);






}); // module: token.js

require.register("tools.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */


/**
 * Module dependencies
 */

var token = require('./token');
var filter = require('./filter');
var utils = require('./utils');


/**
 * Constants
 */

var ARGS_SPLIT_RE = /\s+(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/g;
var FILTER_NAME_RE = /^\w+$/;
var TAG_NAME_RE = FILTER_NAME_RE;


/**
 * Helper to create a simple tag called `name` defined by `fn`.
 *
 * @param {String} name
 * @param {Function} fn
 * @api public
 */

exports.createSimpleTag = function createSimpleTag(name, fn) {

  // Check name
  if(!name.match(TAG_NAME_RE)) {
    throw new Error('Error:`' + name + '` is not a valid tag name.');
  }

  token.helpers[name] = fn;
  token.tags[name] = {
    compile: function(token, compiledContents, compiler, callback) {
      var splitted = token.tag.split(ARGS_SPLIT_RE);
      splitted[0] = '$data';
      var args = splitted.join(',');

      var compiled = '__acc.push($tools.tools.escapeIfUnsafe(' +
                       '$helpers["' + name + '"](' + args + ')' +
                     '));';

      callback(null, compiled);
    }
  };
};


/**
 * Helper to create a filter called `name` defined by `fn`.
 *
 * @param {String} name
 * @param {Function} fn
 * @api public
 */

exports.createFilter = function createFilter(name, fn) {

  // Check name
  if(!name.match(FILTER_NAME_RE)) {
    throw new Error('Error:`' + name + '` is not a valid filter name.');
  }

  filter.filters[name] = fn;
};


/**
 * Escape HTML in `str`.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

var escape = exports.escape = function(str) {
  return str.toString()
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&#146;");
};


/**
 * Export SafeString.
 */

var SafeString = exports.SafeString = String;


/**
 * Mark `str` as safe for use in template.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

exports.safe = function(str) {
  if(!(str instanceof SafeString)) str = new SafeString(str);
  return str;
};


/**
 * Escape HTML in `str` if string is unsafe.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

exports.escapeIfUnsafe = function(str) {
  return str instanceof SafeString ? str : escape(str);
};


/**
 * Expose` applyAll`, `escapeCompiledString`, `registerTag` and
 * `registerHelper`.
 */

exports.registerTag = token.registerTag;
exports.registerHelper = token.registerHelpers;
exports.escapeCompiledString = utils.escapeCompiledString;
exports.applyAll = utils.applyAll;
exports.safeString = String;


/**
 * Module exports
 */

module.exports = exports;
}); // module: tools.js

require.register("utils.js", function(module, exports, require){
/*!
 * Coolony's Kiwi
 * Copyright ©2012 Pierre Matri <pierre.matri@coolony.com>
 * MIT Licensed
 */

/**
 * Module dependencies
 */

var frame;


/**
 * Constants
 */

var DEFAULT_FILE_EXTENSION = '.kiwi';
var FILTER_SPLIT_RE = /\|(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/g;
var FILTER_SPLIT_ARGS_RE = /\,(?=(?:[^'"]|'[^']*'|"[^"]*")*$)/g;
var FILTER_MATCH_RE = /^(\w+)\s*(?:\((.*)\))?$/i;




/**
 * Asynchronous ForEach implementation.
 * Iterates over `array`, invoking `fn(item, args…, next)` for each item, and
 * invoke `callback(err)` when done.
 *
 * @see http://zef.me/3420/async-foreach-in-javascript
 * @param {Array} array
 * @param {Function} fn
 * @param {Mixed[]} [args]
 * @param {Function} callback
 * @api puclic
 */


function tmpAsyncForEach(array, fn, args, callback) {

  if(typeof args === 'function' && !callback) {
    callback = args;
    args = null;
  }

  if(!args) args = [];
  array = array.slice(0);

  function handleProcessedCallback(err) {
    if(err) return callback(err);
    if(array.length > 0) {
      setTimeout(processOne, 0);
    } else {
      callback();
    }
  }

  function processOne() {
    var item = array.shift();
    fn.apply(this, [item].concat(args).concat([handleProcessedCallback]));
  }
  if(array.length > 0) {
    setTimeout(processOne, 0);
  } else {
    callback();
  }
}
var asyncForEach = frame ? frame.asyncForEach : tmpAsyncForEach;


/**
 * Asynchronously apply `processor` to `input`, and invoke
 * `callback(err, result)`.
 *
 * @param {Mixed} input
 * @param {Function} processor
 * @param {Function} callback
 * @api private
 */

var apply = exports.apply = function(input, processor, args, callback) {

  if(typeof args === 'function' && !callback) {
    callback = args;
    args = null;
  }

  function done(err, result) {
    if(err) return callback(err);
    callback(null, result);
  }

  processor.apply(this, [input].concat(args || []).concat([done]));
};


/**
 * Asynchronously apply `processors` to `input` with `args`, and invoke
 * `callback(err, result)`.
 *
 * @param {Mixed} input
 * @param {Function[]} processors
 * @param {Mixed[]} [args]
 * @param {Function} callback
 * @api private
 */

exports.applyAll = function(input, processors, args, callback) {

  function applyOne(processor, next) {
    apply(input, processor, args || [], function onApplied(err, result) {
      if(err) return next(err);
      input = result;
      next();
    });
  }

  function done(err) {
    if(err) return callback(err);
    callback(null, input);
  }

  if(typeof args === 'function' && !callback) {
    callback = args;
    args = null;
  }
  asyncForEach(processors, applyOne, done);
};

/**
 * Asynchronously compiles `tokens`, and invoke
 * `callback(err, compiled)` with `compiled` as an array.
 *
 * @param {BaseToken[]} tokens
 * @param {Function} callback
 * @api private
 */

function compileTokenArray(tokens, compiler, callback) {
  var acc = [];
  var index = 0;

  function compileOne(token, next) {
    token.compile(compiler, function onCompiled(err, compiled) {
      if(err) return next(err);
      acc.push(compiled);
      next(null, compiled);
    });
    index++;
  }

  function done(err) {
    if(err) return callback(err);
    callback(null, acc);
  }

  asyncForEach(tokens, compileOne, done);
}
exports.compileTokenArray = compileTokenArray;


/**
 * Asynchronously compiles `tokens`, glue them, and invoke
 * `callback(err, compiled)`.
 *
 * @param {BaseToken[]} tokens
 * @param {Compiler} compiler
 * @param {Function} callback
 * @api private
 */

exports.compileTokens = function(tokens, compiler, callback) {
  compileTokenArray(tokens, compiler, function(err, compiled) {
    if(err) return callback(err);
    callback(null, compiled.join(''));
  });
};


/**
 * Escape `str` for use in template compilation.
 *
 * @param {String} str
 * @return {String} Escaped `str`.
 * @api private
 */

exports.escapeCompiledString = function(str) {
  return str.replace(/([\\"])/g, '\\$1')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t');
};


/**
 * Return `true` if `input` is iterable and not a string.
 *
 * @param {Mixed} input
 * @return {Boolean}
 * @api private
 */

exports.isIterable = function(input) {
  return typeof input === 'object' && !(input instanceof String);
};


/**
 * Parse `filters` with `defaults`, and return the parsed string to include
 * in compiled template.
 *
 * @param {String} filters
 * @param {Mixed[]} defaults
 * @return {String}
 * @api private
 */

exports.parseFilters = function(filters, defaults) {
  var raw = false;
  defaults = defaults || [];
  var splittedFilters = filters.split(FILTER_SPLIT_RE);
    
  if(!splittedFilters) {
    throw new Error('Compilation error: Unable to parse filters `' +
                    filters +
                    '`.'
                    );
  }
    
  var parsedFilters = splittedFilters
    .filter(function filterOne(filter) {
      if(filter === 'raw') {
        raw = true;
        return false;
      }
      return true;
    })
    .map(function mapOne(filter) {
      var parsedFilter = filter.match(FILTER_MATCH_RE);
        
      if(!parsedFilter) {
        throw new Error('Compilation error: Unable to parse filter `' +
                        filter +
                        '`.'
                        );
      }
        
      parsedFilter[1] = parsedFilter[1].replace('"', '\"');
      if(!parsedFilter[2]) {
        return '"' + parsedFilter[1] + '"';
      }
      var splittedArgs = parsedFilter[2].split(FILTER_SPLIT_ARGS_RE);
      return '["' + parsedFilter[1] + '", ' +
             splittedArgs.join(',') + ']';
    });
  
    if(!raw) parsedFilters = parsedFilters.concat(defaults);
    return _.uniq(parsedFilters);
};


/**
 * Simple class inheritance.
 * Make `subclass` inherit from `superclass`.
 *
 * based on http://peter.michaux.ca/articles/class-based-inheritance-in-javascript
 * @param {Object} subclass
 * @param {Object} superclass
 * @api public
 */

exports.inherits = function(subclass, superclass) {
  function Dummy(){}
  Dummy.prototype = superclass.prototype;
  subclass.prototype = new Dummy();
  subclass.prototype.constructor = subclass;
  subclass._superclass = superclass;
  subclass._superproto = superclass.prototype;
};


/**
 * Module exports
 */

module.exports = exports;
}); // module: utils.js

window.kiwi = require("kiwi");
})();
