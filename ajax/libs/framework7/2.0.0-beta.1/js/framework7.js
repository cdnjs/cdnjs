/**
 * Framework7 2.0.0-beta.1
 * Full featured mobile HTML framework for building iOS & Android apps
 * http://framework7.io/
 *
 * Copyright 2014-2017 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: August 21, 2017
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Framework7 = factory());
}(this, (function () { 'use strict';

/**
 * Template7 1.2.5
 * Mobile-first HTML template engine
 * 
 * http://www.idangero.us/template7/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: August 2, 2017
 */
var template7Context;
if (typeof window !== 'undefined') {
  template7Context = window;
} else if (typeof global !== 'undefined') {
  template7Context = global;
} else {
  template7Context = undefined;
}
function isArray(arr) {
  return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.apply(arr) === '[object Array]';
}
function isFunction(func) {
  return typeof func === 'function';
}
function escape(string) {
  return (typeof template7Context !== 'undefined' && template7Context.escape ? template7Context.escape(string) : string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
var quoteSingleRexExp = new RegExp('\'', 'g');
var quoteDoubleRexExp = new RegExp('"', 'g');
function helperToSlices(string) {
  var helperParts = string.replace(/[{}#}]/g, '').split(' ');
  var slices = [];
  var shiftIndex;
  var i;
  var j;
  for (i = 0; i < helperParts.length; i += 1) {
    var part = helperParts[i];
    var blockQuoteRegExp = (void 0);
    var openingQuote = (void 0);
    if (i === 0) { slices.push(part); }
    else if (part.indexOf('"') === 0 || part.indexOf('\'') === 0) {
      blockQuoteRegExp = part.indexOf('"') === 0 ? quoteDoubleRexExp : quoteSingleRexExp;
      openingQuote = part.indexOf('"') === 0 ? '"' : '\'';
      // Plain String
      if (part.match(blockQuoteRegExp).length === 2) {
        // One word string
        slices.push(part);
      } else {
        // Find closed Index
        shiftIndex = 0;
        for (j = i + 1; j < helperParts.length; j += 1) {
          part += " " + (helperParts[j]);
          if (helperParts[j].indexOf(openingQuote) >= 0) {
            shiftIndex = j;
            slices.push(part);
            break;
          }
        }
        if (shiftIndex) { i = shiftIndex; }
      }
    } else if (part.indexOf('=') > 0) {
      // Hash
      var hashParts = part.split('=');
      var hashName = hashParts[0];
      var hashContent = hashParts[1];
      if (!blockQuoteRegExp) {
        blockQuoteRegExp = hashContent.indexOf('"') === 0 ? quoteDoubleRexExp : quoteSingleRexExp;
        openingQuote = hashContent.indexOf('"') === 0 ? '"' : '\'';
      }
      if (hashContent.match(blockQuoteRegExp).length !== 2) {
        shiftIndex = 0;
        for (j = i + 1; j < helperParts.length; j += 1) {
          hashContent += " " + (helperParts[j]);
          if (helperParts[j].indexOf(openingQuote) >= 0) {
            shiftIndex = j;
            break;
          }
        }
        if (shiftIndex) { i = shiftIndex; }
      }
      var hash = [hashName, hashContent.replace(blockQuoteRegExp, '')];
      slices.push(hash);
    } else {
      // Plain variable
      slices.push(part);
    }
  }
  return slices;
}
function stringToBlocks(string) {
  var blocks = [];
  var i;
  var j;
  if (!string) { return []; }
  var stringBlocks = string.split(/({{[^{^}]*}})/);
  for (i = 0; i < stringBlocks.length; i += 1) {
    var block = stringBlocks[i];
    if (block === '') { continue; }
    if (block.indexOf('{{') < 0) {
      blocks.push({
        type: 'plain',
        content: block,
      });
    } else {
      if (block.indexOf('{/') >= 0) {
        continue;
      }
      if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
        // Simple variable
        blocks.push({
          type: 'variable',
          contextName: block.replace(/[{}]/g, ''),
        });
        continue;
      }
      // Helpers
      var helperSlices = helperToSlices(block);
      var helperName = helperSlices[0];
      var isPartial = helperName === '>';
      var helperContext = [];
      var helperHash = {};
      for (j = 1; j < helperSlices.length; j += 1) {
        var slice = helperSlices[j];
        if (isArray(slice)) {
          // Hash
          helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
        } else {
          helperContext.push(slice);
        }
      }

      if (block.indexOf('{#') >= 0) {
        // Condition/Helper
        var helperContent = '';
        var elseContent = '';
        var toSkip = 0;
        var shiftIndex = (void 0);
        var foundClosed = false;
        var foundElse = false;
        var depth = 0;
        for (j = i + 1; j < stringBlocks.length; j += 1) {
          if (stringBlocks[j].indexOf('{{#') >= 0) {
            depth += 1;
          }
          if (stringBlocks[j].indexOf('{{/') >= 0) {
            depth -= 1;
          }
          if (stringBlocks[j].indexOf(("{{#" + helperName)) >= 0) {
            helperContent += stringBlocks[j];
            if (foundElse) { elseContent += stringBlocks[j]; }
            toSkip += 1;
          } else if (stringBlocks[j].indexOf(("{{/" + helperName)) >= 0) {
            if (toSkip > 0) {
              toSkip -= 1;
              helperContent += stringBlocks[j];
              if (foundElse) { elseContent += stringBlocks[j]; }
            } else {
              shiftIndex = j;
              foundClosed = true;
              break;
            }
          } else if (stringBlocks[j].indexOf('else') >= 0 && depth === 0) {
            foundElse = true;
          } else {
            if (!foundElse) { helperContent += stringBlocks[j]; }
            if (foundElse) { elseContent += stringBlocks[j]; }
          }
        }
        if (foundClosed) {
          if (shiftIndex) { i = shiftIndex; }
          blocks.push({
            type: 'helper',
            helperName: helperName,
            contextName: helperContext,
            content: helperContent,
            inverseContent: elseContent,
            hash: helperHash,
          });
        }
      } else if (block.indexOf(' ') > 0) {
        if (isPartial) {
          helperName = '_partial';
          if (helperContext[0]) { helperContext[0] = "\"" + (helperContext[0].replace(/"|'/g, '')) + "\""; }
        }
        blocks.push({
          type: 'helper',
          helperName: helperName,
          contextName: helperContext,
          hash: helperHash,
        });
      }
    }
  }
  return blocks;
}
function parseJsVariable(expression, replace, object) {
  return expression.split(/([+ -*/^])/g).map(function (part) {
    if (part.indexOf(replace) < 0) { return part; }
    if (!object) { return JSON.stringify(''); }
    var variable = object;
    if (part.indexOf((replace + ".")) >= 0) {
      part.split((replace + "."))[1].split('.').forEach(function (partName) {
        if (variable[partName]) { variable = variable[partName]; }
        else { variable = 'undefined'; }
      });
    }
    return JSON.stringify(variable);
  }).join('');
}
function parseJsParents(expression, parents) {
  return expression.split(/([+ -*^])/g).map(function (part) {
    if (part.indexOf('../') < 0) { return part; }
    if (!parents || parents.length === 0) { return JSON.stringify(''); }
    var levelsUp = part.split('../').length - 1;
    var parentData = levelsUp > parents.length ? parents[parents.length - 1] : parents[levelsUp - 1];

    var variable = parentData;
    var parentPart = part.replace(/..\//g, '');
    parentPart.split('.').forEach(function (partName) {
      if (variable[partName]) { variable = variable[partName]; }
      else { variable = 'undefined'; }
    });
    return JSON.stringify(variable);
  }).join('');
}
var Template7 = function Template7(template) {
  var t = this;
  t.template = template;

  function getCompileVar(name, ctx, data) {
    if ( data === void 0 ) data = 'data_1';

    var variable = ctx;
    var parts;
    var levelsUp = 0;
    var newDepth;
    if (name.indexOf('../') === 0) {
      levelsUp = name.split('../').length - 1;
      newDepth = variable.split('_')[1] - levelsUp;
      variable = "ctx_" + (newDepth >= 1 ? newDepth : 1);
      parts = name.split('../')[levelsUp].split('.');
    } else if (name.indexOf('@global') === 0) {
      variable = 'Template7.global';
      parts = name.split('@global.')[1].split('.');
    } else if (name.indexOf('@root') === 0) {
      variable = 'root';
      parts = name.split('@root.')[1].split('.');
    } else {
      parts = name.split('.');
    }
    for (var i = 0; i < parts.length; i += 1) {
      var part = parts[i];
      if (part.indexOf('@') === 0) {
        var dataLevel = data.split('_')[1];
        if (levelsUp > 0) {
          dataLevel = newDepth;
        }
        if (i > 0) {
          variable += "[(data_" + dataLevel + " && data_" + dataLevel + "." + (part.replace('@', '')) + ")]";
        } else {
          variable = "(data_" + dataLevel + " && data_" + dataLevel + "." + (part.replace('@', '')) + ")";
        }
      } else if (isFinite(part)) {
        variable += "[" + part + "]";
      } else if (part === 'this' || part.indexOf('this.') >= 0 || part.indexOf('this[') >= 0 || part.indexOf('this(') >= 0) {
        variable = part.replace('this', ctx);
      } else {
        variable += "." + part;
      }
    }
    return variable;
  }
  function getCompiledArguments(contextArray, ctx, data) {
    var arr = [];
    for (var i = 0; i < contextArray.length; i += 1) {
      if (/^['"]/.test(contextArray[i])) { arr.push(contextArray[i]); }
      else if (/^(true|false|\d+)$/.test(contextArray[i])) { arr.push(contextArray[i]); }
      else {
        arr.push(getCompileVar(contextArray[i], ctx, data));
      }
    }

    return arr.join(', ');
  }
  function compile(template, depth) {
    if ( template === void 0 ) template = t.template;
    if ( depth === void 0 ) depth = 1;

    if (typeof template !== 'string') {
      throw new Error('Template7: Template must be a string');
    }
    var blocks = stringToBlocks(template);
    var ctx = "ctx_" + depth;
    var data = "data_" + depth;
    if (blocks.length === 0) {
      return function empty() { return ''; };
    }

    function getCompileFn(block, newDepth) {
      if (block.content) { return compile(block.content, newDepth); }
      return function empty() { return ''; };
    }
    function getCompileInverse(block, newDepth) {
      if (block.inverseContent) { return compile(block.inverseContent, newDepth); }
      return function empty() { return ''; };
    }

    var resultString = '';
    if (depth === 1) {
      resultString += "(function (" + ctx + ", " + data + ", root) {\n";
    } else {
      resultString += "(function (" + ctx + ", " + data + ") {\n";
    }
    if (depth === 1) {
      resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
      resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
      resultString += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
      resultString += 'root = root || ctx_1 || {};\n';
    }
    resultString += 'var r = \'\';\n';
    var i;
    for (i = 0; i < blocks.length; i += 1) {
      var block = blocks[i];
      // Plain block
      if (block.type === 'plain') {
        resultString += "r +='" + ((block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'')) + "';";
        continue;
      }
      var variable = (void 0);
      var compiledArguments = (void 0);
      // Variable block
      if (block.type === 'variable') {
        variable = getCompileVar(block.contextName, ctx, data);
        resultString += "r += c(" + variable + ", " + ctx + ");";
      }
      // Helpers block
      if (block.type === 'helper') {
        var parents = (void 0);
        if (ctx !== 'ctx_1') {
          var level = ctx.split('_')[1];
          var parentsString = "ctx_" + (level - 1);
          for (var j = level - 2; j >= 1; j -= 1) {
            parentsString += ", ctx_" + j;
          }
          parents = "[" + parentsString + "]";
        } else {
          parents = "[" + ctx + "]";
        }
        if (block.helperName in t.helpers) {
          compiledArguments = getCompiledArguments(block.contextName, ctx, data);
          resultString += "r += (Template7.helpers." + (block.helperName) + ").call(" + ctx + ", " + (compiledArguments && ((compiledArguments + ", "))) + "{hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
        } else if (block.contextName.length > 0) {
          throw new Error(("Template7: Missing helper: \"" + (block.helperName) + "\""));
        } else {
          variable = getCompileVar(block.helperName, ctx, data);
          resultString += "if (" + variable + ") {";
          resultString += "if (isArray(" + variable + ")) {";
          resultString += "r += (Template7.helpers.each).call(" + ctx + ", " + variable + ", {hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
          resultString += '}else {';
          resultString += "r += (Template7.helpers.with).call(" + ctx + ", " + variable + ", {hash:" + (JSON.stringify(block.hash)) + ", data: " + data + " || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root, parents: " + parents + "});";
          resultString += '}}';
        }
      }
    }
    resultString += '\nreturn r;})';
    return eval.call(template7Context, resultString);
  }
  t.compile = function _compile(template) {
    if (!t.compiled) {
      t.compiled = compile(template);
    }
    return t.compiled;
  };
};

Template7.prototype = {
  options: {},
  partials: {},
  helpers: {
    _partial: function _partial(partialName, options) {
      var p = Template7.prototype.partials[partialName];
      if (!p || (p && !p.template)) { return ''; }
      if (!p.compiled) {
        p.compiled = new Template7(p.template).compile();
      }
      var ctx = this;
      for (var hashName in options.hash) {
        ctx[hashName] = options.hash[hashName];
      }
      return p.compiled(ctx, options.data, options.root);
    },
    escape: function escape$1(context, options) {
      if (typeof context !== 'string') {
        throw new Error('Template7: Passed context to "escape" helper should be a string');
      }
      return escape(context);
    },
    if: function if$1(context, options) {
      var ctx = context;
      if (isFunction(ctx)) { ctx = ctx.call(this); }
      if (ctx) {
        return options.fn(this, options.data);
      }

      return options.inverse(this, options.data);
    },
    unless: function unless(context, options) {
      var ctx = context;
      if (isFunction(ctx)) { ctx = ctx.call(this); }
      if (!ctx) {
        return options.fn(this, options.data);
      }

      return options.inverse(this, options.data);
    },
    each: function each(context, options) {
      var ctx = context;
      var ret = '';
      var i = 0;
      if (isFunction(ctx)) { ctx = ctx.call(this); }
      if (isArray(ctx)) {
        if (options.hash.reverse) {
          ctx = ctx.reverse();
        }
        for (i = 0; i < ctx.length; i += 1) {
          ret += options.fn(ctx[i], { first: i === 0, last: i === ctx.length - 1, index: i });
        }
        if (options.hash.reverse) {
          ctx = ctx.reverse();
        }
      } else {
        for (var key in ctx) {
          i += 1;
          ret += options.fn(ctx[key], { key: key });
        }
      }
      if (i > 0) { return ret; }
      return options.inverse(this);
    },
    with: function with$1(context, options) {
      var ctx = context;
      if (isFunction(ctx)) { ctx = context.call(this); }
      return options.fn(ctx);
    },
    join: function join(context, options) {
      var ctx = context;
      if (isFunction(ctx)) { ctx = ctx.call(this); }
      return ctx.join(options.hash.delimiter || options.hash.delimeter);
    },
    js: function js(expression, options) {
      var data = options.data;
      var func;
      var execute = expression;
      ('index first last key').split(' ').forEach(function (prop) {
        if (typeof data[prop] !== 'undefined') {
          var re1 = new RegExp(("this.@" + prop), 'g');
          var re2 = new RegExp(("@" + prop), 'g');
          execute = execute
            .replace(re1, JSON.stringify(data[prop]))
            .replace(re2, JSON.stringify(data[prop]));
        }
      });
      if (options.root && execute.indexOf('@root') >= 0) {
        execute = parseJsVariable(execute, '@root', options.root);
      }
      if (execute.indexOf('@global') >= 0) {
        execute = parseJsVariable(execute, '@global', template7Context.Template7.global);
      }
      if (execute.indexOf('../') >= 0) {
        execute = parseJsParents(execute, options.parents);
      }
      if (execute.indexOf('return') >= 0) {
        func = "(function(){" + execute + "})";
      } else {
        func = "(function(){return (" + execute + ")})";
      }
      return eval.call(this, func).call(this);
    },
    js_if: function js_if(expression, options) {
      var data = options.data;
      var func;
      var execute = expression;
      ('index first last key').split(' ').forEach(function (prop) {
        if (typeof data[prop] !== 'undefined') {
          var re1 = new RegExp(("this.@" + prop), 'g');
          var re2 = new RegExp(("@" + prop), 'g');
          execute = execute
            .replace(re1, JSON.stringify(data[prop]))
            .replace(re2, JSON.stringify(data[prop]));
        }
      });
      if (options.root && execute.indexOf('@root') >= 0) {
        execute = parseJsVariable(execute, '@root', options.root);
      }
      if (execute.indexOf('@global') >= 0) {
        execute = parseJsVariable(execute, '@global', Template7.global);
      }
      if (execute.indexOf('../') >= 0) {
        execute = parseJsParents(execute, options.parents);
      }
      if (execute.indexOf('return') >= 0) {
        func = "(function(){" + execute + "})";
      } else {
        func = "(function(){return (" + execute + ")})";
      }
      var condition = eval.call(this, func).call(this);
      if (condition) {
        return options.fn(this, options.data);
      }

      return options.inverse(this, options.data);
    },
  },
};
Template7.prototype.helpers.js_compare = Template7.prototype.helpers.js_if;
function t7(template, data) {
  if (arguments.length === 2) {
    var instance = new Template7(template);
    var rendered = instance.compile()(data);
    instance = null;
    return (rendered);
  }
  return new Template7(template);
}
t7.registerHelper = function registerHelper(name, fn) {
  Template7.prototype.helpers[name] = fn;
};
t7.unregisterHelper = function unregisterHelper(name) {
  Template7.prototype.helpers[name] = undefined;
  delete Template7.prototype.helpers[name];
};
t7.registerPartial = function registerPartial(name, template) {
  Template7.prototype.partials[name] = { template: template };
};
t7.unregisterPartial = function unregisterPartial(name) {
  if (Template7.prototype.partials[name]) {
    Template7.prototype.partials[name] = undefined;
    delete Template7.prototype.partials[name];
  }
};
t7.compile = function compile(template, options) {
  var instance = new Template7(template, options);
  return instance.compile();
};

t7.options = Template7.prototype.options;
t7.helpers = Template7.prototype.helpers;
t7.partials = Template7.prototype.partials;

/**
 * Dom7 1.6.4
 * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
 * http://framework7.io/docs/dom.html
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: August 2, 2017
 */
var Dom7 = function Dom7(arr) {
  var self = this;
  // Create array-like object
  for (var i = 0; i < arr.length; i += 1) {
    self[i] = arr[i];
  }
  self.length = arr.length;
  // Return collection with methods
  return this;
};

function $(selector, context) {
  var arr = [];
  var i = 0;
  if (selector && !context) {
    if (selector instanceof Dom7) {
      return selector;
    }
  }
  if (selector) {
      // String
    if (typeof selector === 'string') {
      var els;
      var tempParent;
      var html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
        if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
        if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
        if (html.indexOf('<option') === 0) { toCreate = 'select'; }
        tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [document.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          els = (context || document).querySelectorAll(selector.trim());
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) { arr.push(els[i]); }
        }
      }
    } else if (selector.nodeType || selector === window || selector === document) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Dom7(arr);
}

// Remove Diacritics
var defaultDiacriticsRemovalap = [
  { base: 'A', letters: '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F' },
  { base: 'AA', letters: '\uA732' },
  { base: 'AE', letters: '\u00C6\u01FC\u01E2' },
  { base: 'AO', letters: '\uA734' },
  { base: 'AU', letters: '\uA736' },
  { base: 'AV', letters: '\uA738\uA73A' },
  { base: 'AY', letters: '\uA73C' },
  { base: 'B', letters: '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
  { base: 'C', letters: '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E' },
  { base: 'D', letters: '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779' },
  { base: 'DZ', letters: '\u01F1\u01C4' },
  { base: 'Dz', letters: '\u01F2\u01C5' },
  { base: 'E', letters: '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E' },
  { base: 'F', letters: '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
  { base: 'G', letters: '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E' },
  { base: 'H', letters: '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D' },
  { base: 'I', letters: '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197' },
  { base: 'J', letters: '\u004A\u24BF\uFF2A\u0134\u0248' },
  { base: 'K', letters: '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2' },
  { base: 'L', letters: '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780' },
  { base: 'LJ', letters: '\u01C7' },
  { base: 'Lj', letters: '\u01C8' },
  { base: 'M', letters: '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
  { base: 'N', letters: '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4' },
  { base: 'NJ', letters: '\u01CA' },
  { base: 'Nj', letters: '\u01CB' },
  { base: 'O', letters: '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C' },
  { base: 'OI', letters: '\u01A2' },
  { base: 'OO', letters: '\uA74E' },
  { base: 'OU', letters: '\u0222' },
  { base: 'OE', letters: '\u008C\u0152' },
  { base: 'oe', letters: '\u009C\u0153' },
  { base: 'P', letters: '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
  { base: 'Q', letters: '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
  { base: 'R', letters: '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782' },
  { base: 'S', letters: '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784' },
  { base: 'T', letters: '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786' },
  { base: 'TZ', letters: '\uA728' },
  { base: 'U', letters: '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244' },
  { base: 'V', letters: '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
  { base: 'VY', letters: '\uA760' },
  { base: 'W', letters: '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
  { base: 'X', letters: '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
  { base: 'Y', letters: '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE' },
  { base: 'Z', letters: '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762' },
  { base: 'a', letters: '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250' },
  { base: 'aa', letters: '\uA733' },
  { base: 'ae', letters: '\u00E6\u01FD\u01E3' },
  { base: 'ao', letters: '\uA735' },
  { base: 'au', letters: '\uA737' },
  { base: 'av', letters: '\uA739\uA73B' },
  { base: 'ay', letters: '\uA73D' },
  { base: 'b', letters: '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
  { base: 'c', letters: '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184' },
  { base: 'd', letters: '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A' },
  { base: 'dz', letters: '\u01F3\u01C6' },
  { base: 'e', letters: '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD' },
  { base: 'f', letters: '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
  { base: 'g', letters: '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F' },
  { base: 'h', letters: '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265' },
  { base: 'hv', letters: '\u0195' },
  { base: 'i', letters: '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131' },
  { base: 'j', letters: '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
  { base: 'k', letters: '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3' },
  { base: 'l', letters: '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747' },
  { base: 'lj', letters: '\u01C9' },
  { base: 'm', letters: '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
  { base: 'n', letters: '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5' },
  { base: 'nj', letters: '\u01CC' },
  { base: 'o', letters: '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275' },
  { base: 'oi', letters: '\u01A3' },
  { base: 'ou', letters: '\u0223' },
  { base: 'oo', letters: '\uA74F' },
  { base: 'p', letters: '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
  { base: 'q', letters: '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
  { base: 'r', letters: '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783' },
  { base: 's', letters: '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B' },
  { base: 't', letters: '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787' },
  { base: 'tz', letters: '\uA729' },
  { base: 'u', letters: '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289' },
  { base: 'v', letters: '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
  { base: 'vy', letters: '\uA761' },
  { base: 'w', letters: '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
  { base: 'x', letters: '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
  { base: 'y', letters: '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF' },
  { base: 'z', letters: '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763' } ];

var diacriticsMap = {};
for (var i = 0; i < defaultDiacriticsRemovalap.length; i += 1) {
  var letters = defaultDiacriticsRemovalap[i].letters;
  for (var j = 0; j < letters.length; j += 1) {
    diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
  }
}

var Utils = {
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || window.location.href;
    var i;
    var params;
    var param;
    var length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  isArray: function isArray(arr) {
    return Array.isArray(arr);
  },
  each: function each(obj, callback) {
      // Check it's iterable
      // TODO: Should probably raise a value error here
    if (typeof obj !== 'object') { return; }
    // Don't bother continuing without a callback
    if (!callback) { return; }
    if (Array.isArray(obj) || obj instanceof Dom7) {
      // Array
      for (var i = 0; i < obj.length; i++) {
        // If callback returns false
        if (callback(i, obj[i]) === false) {
          // Break out of the loop
          return;
        }
      }
    } else {
      // Object
      for (var prop in obj) {
        // Check the propertie belongs to the object
        // not it's prototype
        if (obj.hasOwnProperty(prop)) {
          // If the callback returns false
          if (callback(prop, obj[prop]) === false) {
            // Break out of the loop;
            return;
          }
        }
      }
    }
  },
  unique: function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  },
  serializeObject: function serializeObject(obj, parents) {
    if ( parents === void 0 ) parents = [];

    if (typeof obj === 'string') { return obj; }
    var resultArray = [];
    var separator = '&';
    var newParents;
    function varName(name) {
      if (parents.length > 0) {
        var parentParts = '';
        for (var j = 0; j < parents.length; j += 1) {
          if (j === 0) { parentParts += parents[j]; }
          else { parentParts += "[" + (encodeURIComponent(parents[j])) + "]"; }
        }
        return (parentParts + "[" + (encodeURIComponent(name)) + "]");
      }
      return encodeURIComponent(name);
    }
    function varValue(value) {
      return encodeURIComponent(value);
    }
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        var toPush = (void 0);
        if (Array.isArray(obj[prop])) {
          toPush = [];
          for (var i = 0; i < obj[prop].length; i += 1) {
            if (!Array.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
              newParents = parents.slice();
              newParents.push(prop);
              newParents.push(String(i));
              toPush.push(Utils.serializeObject(obj[prop][i], newParents));
            } else {
              toPush.push(((varName(prop)) + "[]=" + (varValue(obj[prop][i]))));
            }
          }
          if (toPush.length > 0) { resultArray.push(toPush.join(separator)); }
        } else if (obj[prop] === null || obj[prop] === '') {
          resultArray.push(((varName(prop)) + "="));
        } else if (typeof obj[prop] === 'object') {
          // Object, convert to named array
          newParents = parents.slice();
          newParents.push(prop);
          toPush = Utils.serializeObject(obj[prop], newParents);
          if (toPush !== '') { resultArray.push(toPush); }
        } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
          // Should be string or plain value
          resultArray.push(((varName(prop)) + "=" + (varValue(obj[prop]))));
        } else if (obj[prop] === '') { resultArray.push(varName(prop)); }
      }
    }
    return resultArray.join(separator);
  },
  toCamelCase: function toCamelCase(string) {
    return string.toLowerCase().replace(/-(.)/g, function (match, group1) { return group1.toUpperCase(); });
  },
  dataset: function dataset(el) {
    return $(el).dataset();
  },
  getTranslate: function getTranslate(el, axis) {
    if ( axis === void 0 ) axis = 'x';

    var curStyle = window.getComputedStyle(el, null);
    var matrix;
    var curTransform;
    var transformMatrix;

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function map(a) {
          return a.replace(',', '.');
        }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[4]); }
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[5]); }
    }

    return curTransform || 0;
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (window.requestAnimationFrame) { return window.requestAnimationFrame(callback); }
    else if (window.webkitRequestAnimationFrame) { return window.webkitRequestAnimationFrame(callback); }
    return window.setTimeout(callback, 1000 / 60);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame) { return window.cancelAnimationFrame(id); }
    else if (window.webkitCancelAnimationFrame) { return window.webkitCancelAnimationFrame(id); }
    return window.clearTimeout(id);
  },
  supportTouch: !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)),
  removeDiacritics: function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007E]/g, function (a) { return diacriticsMap[a] || a; });
  },
  extend: function extend() {
    var args = [], len$1 = arguments.length;
    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

    var to = Object(args[0]);
    for (var i = 1; i < args.length; i += 1) {
      var nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (typeof to[nextKey] === 'object' && typeof nextSource[nextKey] === 'object') {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};

// Aliases
Utils.parseQuery = Utils.parseUrlQuery;
Utils.param = Utils.serializeObject;

// Global Ajax Setup
var globalAjaxOptions = {};
$.ajaxSetup = function ajaxSetup(options) {
  if (options.type && !options.method) { options.method = options.type; }
  Utils.each(options, function (optionName, optionValue) {
    globalAjaxOptions[optionName] = optionValue;
  });
};

// JSONP Requests
var jsonpRequests = 0;

// Ajax
function ajax(options) {
  var defaults = {
    method: 'GET',
    data: false,
    async: true,
    cache: true,
    user: '',
    password: '',
    headers: {},
    xhrFields: {},
    statusCode: {},
    processData: true,
    dataType: 'text',
    contentType: 'application/x-www-form-urlencoded',
    timeout: 0,
  };
  var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];

  // For jQuery guys
  if (options.type) { options.method = options.type; }

  // Global options
  var globals = globalAjaxOptions;

  // Merge global and defaults
  Utils.each(globals, function (globalOptionName, globalOptionValue) {
    if (callbacks.indexOf(globalOptionName) < 0) { defaults[globalOptionName] = globalOptionValue; }
  });

  // Function to run XHR callbacks and events
  function fireAjaxCallback(eventName, eventData, callbackName) {
    var a = arguments;
    if (eventName) { $(document).trigger(eventName, eventData); }
    if (callbackName) {
      // Global callback
      if (callbackName in globals) { globals[callbackName](a[3], a[4], a[5], a[6]); }
      // Options callback
      if (options[callbackName]) { options[callbackName](a[3], a[4], a[5], a[6]); }
    }
  }

  // Merge options and defaults
  Utils.each(defaults, function (prop, defaultValue) {
    if (!(prop in options)) { options[prop] = defaultValue; }
  });

  // Default URL
  if (!options.url) {
    options.url = window.location.toString();
  }
  // Parameters Prefix
  var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';

  // UC method
  var method = options.method.toUpperCase();

  // Data to modify GET URL
  if ((method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') && options.data) {
    var stringData;
    if (typeof options.data === 'string') {
      // Should be key=value string
      if (options.data.indexOf('?') >= 0) { stringData = options.data.split('?')[1]; }
      else { stringData = options.data; }
    } else {
      // Should be key=value object
      stringData = Utils.serializeObject(options.data);
    }
    if (stringData.length) {
      options.url += paramsPrefix + stringData;
      if (paramsPrefix === '?') { paramsPrefix = '&'; }
    }
  }
  // JSONP
  if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
    var callbackName = "f7jsonp_" + (Date.now() + ((jsonpRequests += 1)));
    var abortTimeout;
    var callbackSplit = options.url.split('callback=');
    var requestUrl = (callbackSplit[0]) + "callback=" + callbackName;
    if (callbackSplit[1].indexOf('&') >= 0) {
      var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
      if (addVars.length > 0) { requestUrl += "&" + addVars; }
    }

    // Create script
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = function onerror() {
      clearTimeout(abortTimeout);
      fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
      fireAjaxCallback('ajaxComplete ajax:complete', { scripterror: true }, 'complete', null, 'scripterror');
    };
    script.src = requestUrl;

    // Handler
    window[callbackName] = function jsonpCallback(data) {
      clearTimeout(abortTimeout);
      fireAjaxCallback(undefined, undefined, 'success', data);
      script.parentNode.removeChild(script);
      script = null;
      delete window[callbackName];
    };
    document.querySelector('head').appendChild(script);

    if (options.timeout > 0) {
      abortTimeout = setTimeout(function () {
        script.parentNode.removeChild(script);
        script = null;
        fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
      }, options.timeout);
    }

    return;
  }

  // Cache for GET/HEAD requests
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') {
    if (options.cache === false) {
      options.url += paramsPrefix + "_nocache" + (Date.now());
    }
  }

  // Create XHR
  var xhr = new XMLHttpRequest();

  // Save Request URL
  xhr.requestUrl = options.url;
  xhr.requestParameters = options;

  // Open XHR
  xhr.open(method, options.url, options.async, options.user, options.password);

  // Create POST Data
  var postData = null;

  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && options.data) {
    if (options.processData) {
      var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
      // Post Data
      if (postDataInstances.indexOf(options.data.constructor) >= 0) {
        postData = options.data;
      } else {
        // POST Headers
        var boundary = "---------------------------" + (Date.now().toString(16));

        if (options.contentType === 'multipart/form-data') {
          xhr.setRequestHeader('Content-Type', ("multipart/form-data; boundary=" + boundary));
        } else {
          xhr.setRequestHeader('Content-Type', options.contentType);
        }
        postData = '';
        var data = Utils.serializeObject(options.data);
        if (options.contentType === 'multipart/form-data') {
          data = data.split('&');
          var newData = [];
          for (var i = 0; i < data.length; i += 1) {
            newData.push(("Content-Disposition: form-data; name=\"" + (data[i].split('=')[0]) + "\"\r\n\r\n" + (data[i].split('=')[1]) + "\r\n"));
          }
          postData = "--" + boundary + "\r\n" + (newData.join(("--" + boundary + "\r\n"))) + "--" + boundary + "--\r\n";
        } else {
          postData = data;
        }
      }
    } else {
      postData = options.data;
    }
  }

  // Additional headers
  if (options.headers) {
    Utils.each(options.headers, function (headerName, headerCallback) {
      xhr.setRequestHeader(headerName, headerCallback);
    });
  }

  // Check for crossDomain
  if (typeof options.crossDomain === 'undefined') {
    options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
  }

  if (!options.crossDomain) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  if (options.xhrFields) {
    Utils.each(options.xhrFields, function (fieldName, fieldValue) {
      xhr[fieldName] = fieldValue;
    });
  }

  var xhrTimeout;
  // Handle XHR
  xhr.onload = function onload(e) {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
      var responseData;
      if (options.dataType === 'json') {
        try {
          responseData = JSON.parse(xhr.responseText);
          fireAjaxCallback('ajaxSuccess ajax:success', { xhr: xhr }, 'success', responseData, xhr.status, xhr);
        } catch (err) {
          fireAjaxCallback('ajaxError ajax:error', { xhr: xhr, parseerror: true }, 'error', xhr, 'parseerror');
        }
      } else {
        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
        fireAjaxCallback('ajaxSuccess ajax:success', { xhr: xhr }, 'success', responseData, xhr.status, xhr);
      }
    } else {
      fireAjaxCallback('ajaxError ajax:error', { xhr: xhr }, 'error', xhr, xhr.status);
    }
    if (options.statusCode) {
      if (globals.statusCode && globals.statusCode[xhr.status]) { globals.statusCode[xhr.status](xhr); }
      if (options.statusCode[xhr.status]) { options.statusCode[xhr.status](xhr); }
    }
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr }, 'complete', xhr, xhr.status);
  };

  xhr.onerror = function onerror(e) {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    fireAjaxCallback('ajaxError ajax:error', { xhr: xhr }, 'error', xhr, xhr.status);
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr, error: true }, 'complete', xhr, 'error');
  };

  // Ajax start callback
  fireAjaxCallback('ajaxStart ajax:start', { xhr: xhr }, 'start', xhr);
  fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);

  // Timeout
  if (options.timeout > 0) {
    xhr.onabort = function onabort() {
      if (xhrTimeout) { clearTimeout(xhrTimeout); }
    };
    xhrTimeout = setTimeout(function () {
      xhr.abort();
      fireAjaxCallback('ajaxError ajax:error', { xhr: xhr, timeout: true }, 'error', xhr, 'timeout');
      fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr, timeout: true }, 'complete', xhr, 'timeout');
    }, options.timeout);
  }

  // Send XHR
  xhr.send(postData);

  // Return XHR object
  return xhr;
}

function ajaxShortcut(method) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var url;
  var data;
  var success;
  var error;
  var dataType;
  if (typeof args[1] === 'function') {
    var assign;
    (assign = args, url = assign[0], success = assign[1], error = assign[2], dataType = assign[3]);
  } else {
    var assign$1;
    (assign$1 = args, url = assign$1[0], data = assign$1[1], success = assign$1[2], error = assign$1[3], dataType = assign$1[4]);
  }
  [success, error].forEach(function (callback) {
    if (typeof callback === 'string') {
      dataType = callback;
      if (callback === success) { success = undefined; }
      else { error = undefined; }
    }
  });
  dataType = dataType || (method === 'getJSON' ? 'json' : undefined);
  return $.ajax({
    url: url,
    method: method === 'post' ? 'POST' : 'GET',
    data: data,
    success: success,
    error: error,
    dataType: dataType,
  });
}

function get() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('get');
  return ajaxShortcut.apply(this, args);
}
function post() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('post');
  return ajaxShortcut.apply(this, args);
}
function getJSON() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('getJSON');
  return ajaxShortcut.apply(this, args);
}

var Scroll = {
  scrollTo: function scrollTo(left, top, duration, easing, callback) {
    if ( easing === void 0 ) easing = 'swing';

    if (arguments.length === 4 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    return this.each(function animate() {
      var el = this;
      var currentTop;
      var currentLeft;
      var maxTop;
      var maxLeft;
      var newTop;
      var newLeft;
      var scrollTop;
      var scrollLeft;
      var animateTop = top > 0 || top === 0;
      var animateLeft = left > 0 || left === 0;
      if (typeof easing === 'undefined') {
        easing = 'swing';
      }
      if (animateTop) {
        currentTop = el.scrollTop;
        if (!duration) {
          el.scrollTop = top;
        }
      }
      if (animateLeft) {
        currentLeft = el.scrollLeft;
        if (!duration) {
          el.scrollLeft = left;
        }
      }
      if (!duration) { return; }
      if (animateTop) {
        maxTop = el.scrollHeight - el.offsetHeight;
        newTop = Math.max(Math.min(top, maxTop), 0);
      }
      if (animateLeft) {
        maxLeft = el.scrollWidth - el.offsetWidth;
        newLeft = Math.max(Math.min(left, maxLeft), 0);
      }
      var startTime = null;
      if (animateTop && newTop === currentTop) { animateTop = false; }
      if (animateLeft && newLeft === currentLeft) { animateLeft = false; }
      function render(time) {
        if ( time === void 0 ) time = new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }
        var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        var easeProgress = easing === 'linear' ? progress : (0.5 - (Math.cos(progress * Math.PI) / 2));
        var done;
        if (animateTop) { scrollTop = currentTop + (easeProgress * (newTop - currentTop)); }
        if (animateLeft) { scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft)); }
        if (animateTop && newTop > currentTop && scrollTop >= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateTop && newTop < currentTop && scrollTop <= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }
        if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }

        if (done) {
          if (callback) { callback(); }
          return;
        }
        if (animateTop) { el.scrollTop = scrollTop; }
        if (animateLeft) { el.scrollLeft = scrollLeft; }
        Utils.requestAnimationFrame(render);
      }
      Utils.requestAnimationFrame(render);
    });
  },
  scrollTop: function scrollTop(top, duration, easing, callback) {
    if (arguments.length === 3 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    var dom = this;
    if (typeof top === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollTop; }
      return null;
    }
    return dom.scrollTo(undefined, top, duration, easing, callback);
  },
  scrollLeft: function scrollLeft(left, duration, easing, callback) {
    if (arguments.length === 3 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    var dom = this;
    if (typeof left === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollLeft; }
      return null;
    }
    return dom.scrollTo(left, undefined, duration, easing, callback);
  },
};

var Methods = {
  // Classes and attributes
  addClass: function addClass(className) {
    var this$1 = this;

    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
      }
    }
    return this;
  },
  removeClass: function removeClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
      }
    }
    return this;
  },
  hasClass: function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  },
  toggleClass: function toggleClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  },
  attr: function attr(attrs, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this$1[i].setAttribute(attrs, value);
      } else {
        // Object
        for (var attrName in attrs) {
          this$1[i][attrName] = attrs[attrName];
          this$1[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  },
  removeAttr: function removeAttr(attr) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].removeAttribute(attr);
    }
    return this;
  },
  prop: function prop(props, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) { return this[0][props]; }
    } else {
      // Set props
      for (var i = 0; i < this.length; i += 1) {
        if (arguments$1.length === 2) {
          // String
          this$1[i][props] = value;
        } else {
          // Object
          for (var propName in props) {
            this$1[i][propName] = props[propName];
          }
        }
      }
      return this;
    }
  },
  data: function data(key, value) {
    var this$1 = this;

    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this$1[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  },
  removeData: function removeData(key) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  },
  dataset: function dataset() {
    var el = this[0];
    if (!el) { return undefined; }
    var dataset = {};
    if (el.dataset) {
      for (var dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (var i = 0; i < el.attributes.length; i += 1) {
        var attr = el.attributes[i];
        if (attr.name.indexOf('data-') >= 0) {
          dataset[Utils.toCamelCase(attr.name.split('data-')[1])] = attr.value;
        }
      }
    }
    for (var key in dataset) {
      if (dataset[key] === 'false') { dataset[key] = false; }
      else if (dataset[key] === 'true') { dataset[key] = true; }
      else if (parseFloat(dataset[key]) === dataset[key] * 1) { dataset[key] *= 1; }
    }
    return dataset;
  },
  val: function val(value) {
    var this$1 = this;

    if (typeof value === 'undefined') {
      if (this[0]) {
        if (this[0].multiple && this[0].nodeName.toLowerCase() === 'select') {
          var values = [];
          for (var i = 0; i < this[0].selectedOptions.length; i += 1) {
            values.push(this$1[0].selectedOptions[i].value);
          }
          return values;
        }
        return this[0].value;
      }
      return undefined;
    }

    for (var i$1 = 0; i$1 < this.length; i$1 += 1) {
      this$1[i$1].value = value;
    }
    return this;
  },
  // Transforms
  transform: function transform(transform$1) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransform = transform$1;
      elStyle.transform = transform$1;
    }
    return this;
  },
  transition: function transition(duration) {
    var this$1 = this;

    if (typeof duration !== 'string') {
      duration = duration + "ms";
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  },
  // Events
  on: function on() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var eventType = args[0];
    var targetSelector;
    var listener;
    var capture = false;
    if (typeof args[1] === 'function') {
      targetSelector = false;
      listener = args[1];
      capture = args[2];
    } else {
      targetSelector = args[1];
      listener = args[2];
      capture = args[3];
    }
    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) { return; }
      var eventData = e.target.dom7EventData || [];
      eventData.unshift(e);
      if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $(target).parents();
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      eventData.unshift(e);
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7Listeners) { el.dom7Listeners = []; }
          el.dom7Listeners.push({
            type: eventType,
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(events[j], handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = []; }
          el.dom7LiveListeners.push({
            type: eventType,
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(events[j], handleLiveEvent, capture);
        }
      }
    }
    return this;
  },
  off: function off() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var eventType = args[0];
    var targetSelector;
    var listener;
    var capture = false;
    if (typeof args[1] === 'function') {
      targetSelector = false;
      listener = args[1];
      capture = args[2];
    } else {
      targetSelector = args[1];
      listener = args[2];
      capture = args[3];
    }
    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var el = this$1[j];
        if (!targetSelector) {
          if (el.dom7Listeners) {
            for (var k = 0; k < el.dom7Listeners.length; k += 1) {
              if (listener) {
                if (el.dom7Listeners[k].listener === listener) {
                  el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
                }
              } else if (el.dom7Listeners[k].type === events[i]) {
                el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
              }
            }
          }
        } else if (el.dom7LiveListeners) {
          for (var k$1 = 0; k$1 < el.dom7LiveListeners.length; k$1 += 1) {
            if (listener) {
              if (el.dom7LiveListeners[k$1].listener === listener) {
                el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
              }
            } else if (el.dom7Listeners[k$1].type === events[i]) {
              el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
            }
          }
        }
      }
    }
    return this;
  },
  once: function once(eventName, targetSelector, listener, capture) {
    var dom = this;
    if (typeof targetSelector === 'function') {
      listener = arguments[1];
      capture = arguments[2];
      targetSelector = false;
    }
    function proxy(e) {
      var eventData = e.target.dom7EventData || [];
      listener.apply(this, eventData);
      dom.off(eventName, targetSelector, proxy, capture);
    }
    return dom.on(eventName, targetSelector, proxy, capture);
  },
  trigger: function trigger() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var evt = (void 0);
        try {
          evt = new CustomEvent(events[i], { detail: eventData, bubbles: true, cancelable: true });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(events[i], true, true);
          evt.detail = eventData;
        }
        this$1[j].dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        this$1[j].dispatchEvent(evt);
        this$1[j].dom7EventData = [];
        delete this$1[j].dom7EventData;
      }
    }
    return this;
  },
  transitionEnd: function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  animationEnd: function animationEnd(callback) {
    var events = ['webkitAnimationEnd', 'animationend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      callback(e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  // Sizing/Styles
  width: function width() {
    if (this[0] === window) {
      return window.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'));
    }

    return null;
  },
  outerWidth: function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  },
  height: function height() {
    if (this[0] === window) {
      return window.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'));
    }

    return null;
  },
  outerHeight: function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  },
  offset: function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = document.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === window ? window.scrollY : el.scrollTop;
      var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  },
  hide: function hide() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].style.display = 'none';
    }
    return this;
  },
  show: function show() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].style.display = 'block';
    }
    return this;
  },
  styles: function styles() {
    if (this[0]) { return window.getComputedStyle(this[0], null); }
  },
  css: function css(props, value) {
    var this$1 = this;

    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return window.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          for (var prop in props) {
            this$1[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this$1[i].style[props] = value;
      }
      return this;
    }
    return this;
  },

  // Dom manipulation
  // Iterate over the collection passing elements to `callback`
  each: function each(callback) {
    var this$1 = this;

    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this$1[i], i, this$1[i]) === false) {
        // End the loop early
        return this$1;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  },
  filter: function filter(callback) {
    var matchedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
    }
    return new Dom7(matchedItems);
  },
  html: function html(html$1) {
    var this$1 = this;

    if (typeof html$1 === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].innerHTML = html$1;
    }
    return this;
  },
  text: function text(text$1) {
    var this$1 = this;

    if (typeof text$1 === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].textContent = text$1;
    }
    return this;
  },
  is: function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === document) { return el === document; }
    else if (selector === window) { return el === window; }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  },
  indexOf: function indexOf(el) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i] === el) { return i; }
    }
  },
  index: function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
  },
  eq: function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7([]); }
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  },
  append: function append() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this$1[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this$1[i].appendChild(newChild[j]);
          }
        } else {
          this$1[i].appendChild(newChild);
        }
      }
    }

    return this;
  },
  appendTo: function appendTo(parent) {
    $(parent).append(this);
    return this;
  },
  prepend: function prepend(newChild) {
    var this$1 = this;

    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
        }
      } else {
        this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
      }
    }
    return this;
  },
  prependTo: function prependTo(parent) {
    $(parent).prepend(this);
    return this;
  },
  insertBefore: function insertBefore(selector) {
    var this$1 = this;

    var before = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this$1[i], before[0]);
      } else if (before.length > 1) {
        for (var j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this$1[i].cloneNode(true), before[j]);
        }
      }
    }
  },
  insertAfter: function insertAfter(selector) {
    var this$1 = this;

    var after = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this$1[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (var j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(this$1[i].cloneNode(true), after[j].nextSibling);
        }
      }
    }
  },
  next: function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) { return new Dom7([this[0].nextElementSibling]); }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  },
  nextAll: function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling;
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7(nextEls);
  },
  prev: function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) { return new Dom7([el.previousElementSibling]); }
        return new Dom7([]);
      }

      if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  },
  prevAll: function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling;
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7(prevEls);
  },
  siblings: function siblings(selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  },
  parent: function parent(selector) {
    var this$1 = this;

    var parents = [];
    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode !== null) {
        if (selector) {
          if ($(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
        } else {
          parents.push(this$1[i].parentNode);
        }
      }
    }
    return $(Utils.unique(parents));
  },
  parents: function parents(selector) {
    var this$1 = this;

    var parents = [];
    for (var i = 0; i < this.length; i += 1) {
      var parent = this$1[i].parentNode;
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(Utils.unique(parents));
  },
  closest: function closest(selector) {
    var closest = this;
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  },
  find: function find(selector) {
    var this$1 = this;

    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this$1[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  },
  children: function children(selector) {
    var this$1 = this;

    var children = [];
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this$1[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) { children.push(childNodes[j]); }
      }
    }
    return new Dom7(Utils.unique(children));
  },
  remove: function remove() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
    }
    return this;
  },
  detach: function detach() {
    return this.remove();
  },
  add: function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  },
  empty: function empty() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.nodeType === 1) {
        for (var j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this;
  },
};

// Shortcuts
var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
var notTrigger = ('resize scroll').split(' ');
function createMethod(name) {
  Methods[name] = function eventShortcut(targetSelector, listener, capture) {
    var this$1 = this;

    if (typeof targetSelector === 'undefined') {
      for (var i = 0; i < this.length; i += 1) {
        if (notTrigger.indexOf(name) < 0) {
          if (name in this$1[i]) { this$1[i][name](); }
          else {
            $(this$1[i]).trigger(name);
          }
        }
      }
      return this;
    }
    return this.on(name, targetSelector, listener, capture);
  };
}
for (var i$1 = 0; i$1 < shortcuts.length; i$1 += 1) {
  createMethod(shortcuts[i$1]);
}

function animate(initialProps, initialParams) {
  var els = this;
  var a = {
    props: $.extend({}, initialProps),
    params: $.extend({
      duration: 300,
      easing: 'swing', // or 'linear'
      /* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */
    }, initialParams),

    elements: els,
    animating: false,
    que: [],

    easingProgress: function easingProgress(easing, progress) {
      if (easing === 'swing') {
        return 0.5 - (Math.cos(progress * Math.PI) / 2);
      }
      if (typeof easing === 'function') {
        return easing(progress);
      }
      return progress;
    },
    stop: function stop() {
      if (a.frameId) {
        Utils.cancelAnimationFrame(a.frameId);
      }
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      a.que = [];
    },
    done: function done(complete) {
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      if (complete) { complete(els); }
      if (a.que.length > 0) {
        var que = a.que.shift();
        a.animate(que[0], que[1]);
      }
    },
    animate: function animate(props, params) {
      if (a.animating) {
        a.que.push([props, params]);
        return a;
      }
      var elements = [];

      // Define & Cache Initials & Units
      a.elements.each(function (index, el) {
        var initialFullValue;
        var initialValue;
        var unit;
        var finalValue;
        var finalFullValue;

        if (!el.dom7AnimateInstance) { a.elements[index].dom7AnimateInstance = a; }

        elements[index] = {
          container: el,
        };
        Object.keys(props).forEach(function (prop) {
          initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
          initialValue = parseFloat(initialFullValue);
          unit = initialFullValue.replace(initialValue, '');
          finalValue = parseFloat(props[prop]);
          finalFullValue = props[prop] + unit;
          elements[index][prop] = {
            initialFullValue: initialFullValue,
            initialValue: initialValue,
            unit: unit,
            finalValue: finalValue,
            finalFullValue: finalFullValue,
            currentValue: initialValue,
          };
        });
      });

      var startTime = null;
      var time;
      var elementsDone = 0;
      var propsDone = 0;
      var done;
      var began = false;

      a.animating = true;

      function render() {
        time = new Date().getTime();
        var progress;
        var easeProgress;
        // let el;
        if (!began) {
          began = true;
          if (params.begin) { params.begin(els); }
        }
        if (startTime === null) {
          startTime = time;
        }
        if (params.progress) {
          params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), ((startTime + params.duration) - time < 0 ? 0 : (startTime + params.duration) - time), startTime);
        }

        elements.forEach(function (element) {
          var el = element;
          if (done || el.done) { return; }
          Object.keys(props).forEach(function (prop) {
            if (done || el.done) { return; }
            progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
            easeProgress = a.easingProgress(params.easing, progress);
            var ref = el[prop];
            var initialValue = ref.initialValue;
            var finalValue = ref.finalValue;
            var unit = ref.unit;
            el[prop].currentValue = initialValue + (easeProgress * (finalValue - initialValue));
            var currentValue = el[prop].currentValue;

            if (
              (finalValue > initialValue && currentValue >= finalValue) ||
              (finalValue < initialValue && currentValue <= finalValue)) {
              el.container.style[prop] = finalValue + unit;
              propsDone += 1;
              if (propsDone === Object.keys(props).length) {
                el.done = true;
                elementsDone += 1;
              }
              if (elementsDone === elements.length) {
                done = true;
              }
            }
            if (done) {
              a.done(params.complete);
              return;
            }
            el.container.style[prop] = currentValue + unit;
          });
        });
        if (done) { return; }
        // Then call
        a.frameId = Utils.requestAnimationFrame(render);
      }
      a.frameId = Utils.requestAnimationFrame(render);
      return a;
    },
  };

  if (a.elements.length === 0) {
    return els;
  }

  var animateInstance;
  for (var i = 0; i < a.elements.length; i += 1) {
    if (a.elements[i].dom7AnimateInstance) {
      animateInstance = a.elements[i].dom7AnimateInstance;
    } else { a.elements[i].dom7AnimateInstance = a; }
  }
  if (!animateInstance) {
    animateInstance = a;
  }

  if (initialProps === 'stop') {
    animateInstance.stop();
  } else {
    animateInstance.animate(a.props, a.params);
  }

  return els;
}

function stop() {
  var els = this;
  for (var i = 0; i < els.length; i += 1) {
    if (els[i].dom7AnimateInstance) {
      els[i].dom7AnimateInstance.stop();
    }
  }
}

function dom7() {
  // Utils & Helpers
  Object.keys(Utils).forEach(function (key) {
    $[key] = Utils[key];
  });

  // Methods
  Object.keys(Methods).forEach(function (key) {
    Dom7.prototype[key] = Methods[key];
  });

  // Scroll
  Object.keys(Scroll).forEach(function (key) {
    Dom7.prototype[key] = Scroll[key];
  });

  // Animate
  Dom7.prototype.animate = animate;
  Dom7.prototype.stop = stop;

  // Ajax
  $.ajax = ajax;
  $.get = get;
  $.post = post;
  $.getJSON = getJSON;

  // Link to prototype
  $.fn = Dom7.prototype;

  return $;
}
var dom7$1 = dom7();

/**
 * https://github.com/gre/bezier-easing
 * BezierEasing - use bezier curve for transition easing function
 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
 */

// These values are established by empiricism with tests (tradeoff: performance VS precision)
var NEWTON_ITERATIONS = 4;
var NEWTON_MIN_SLOPE = 0.001;
var SUBDIVISION_PRECISION = 0.0000001;
var SUBDIVISION_MAX_ITERATIONS = 10;

var kSplineTableSize = 11;
var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

var float32ArraySupported = typeof Float32Array === 'function';

function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
function C (aA1)      { return 3.0 * aA1; }

// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
function calcBezier (aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT; }

// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
function getSlope (aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1); }

function binarySubdivide (aX, aA, aB, mX1, mX2) {
  var currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2.0;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0.0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
  return currentT;
}

function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
 for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
   var currentSlope = getSlope(aGuessT, mX1, mX2);
   if (currentSlope === 0.0) {
     return aGuessT;
   }
   var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
   aGuessT -= currentX / currentSlope;
 }
 return aGuessT;
}

function bezier (mX1, mY1, mX2, mY2) {
  if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) {
    throw new Error('bezier x values must be in [0, 1] range');
  }

  // Precompute samples table
  var sampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
  if (mX1 !== mY1 || mX2 !== mY2) {
    for (var i = 0; i < kSplineTableSize; ++i) {
      sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
    }
  }

  function getTForX (aX) {
    var intervalStart = 0.0;
    var currentSample = 1;
    var lastSample = kSplineTableSize - 1;

    for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
      intervalStart += kSampleStepSize;
    }
    --currentSample;

    // Interpolate to provide an initial guess for t
    var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
    var guessForT = intervalStart + dist * kSampleStepSize;

    var initialSlope = getSlope(guessForT, mX1, mX2);
    if (initialSlope >= NEWTON_MIN_SLOPE) {
      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
    } else if (initialSlope === 0.0) {
      return guessForT;
    } else {
      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
    }
  }

  return function BezierEasing (x) {
    if (mX1 === mY1 && mX2 === mY2) {
      return x; // linear
    }
    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
    if (x === 0) {
      return 0;
    }
    if (x === 1) {
      return 1;
    }
    return calcBezier(getTForX(x), mY1, mY2);
  };
}

var Utils$1 = {
  deleteProps: function deleteProps(obj) {
    var object = obj;
    Object.keys(object).forEach(function (key) {
      object[key] = null;
      delete object[key];
    });
  },
  bezier: function bezier$1() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return bezier.apply(void 0, args);
  },
  nextTick: function nextTick(callback, delay) {
    if ( delay === void 0 ) delay = 0;

    return setTimeout(callback, delay);
  },
  nextFrame: function nextFrame(callback) {
    if (window.requestAnimationFrame) { return window.requestAnimationFrame(callback); }
    else if (window.webkitRequestAnimationFrame) { return window.webkitRequestAnimationFrame(callback); }
    return window.setTimeout(callback, 1000 / 60);
  },
  now: function now() {
    return Date.now();
  },
  promise: function promise(handler) {
    var resolved = false;
    var rejected = false;
    var resolveArgs;
    var rejectArgs;
    var promiseHandlers = {
      then: undefined,
      catch: undefined,
    };
    var promise = {
      then: function then(thenHandler) {
        if (resolved) {
          thenHandler.apply(void 0, resolveArgs);
        } else {
          promiseHandlers.then = thenHandler;
        }
        return promise;
      },
      catch: function catch$1(catchHandler) {
        if (rejected) {
          catchHandler.apply(void 0, rejectArgs);
        } else {
          promiseHandlers.catch = catchHandler;
        }
        return promise;
      },
    };

    function resolve() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      resolved = true;
      if (promiseHandlers.then) { promiseHandlers.then.apply(promiseHandlers, args); }
      else { resolveArgs = args; }
    }
    function reject() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      rejected = true;
      if (promiseHandlers.catch) { promiseHandlers.catch.apply(promiseHandlers, args); }
      else { rejectArgs = args; }
    }
    handler(resolve, reject);

    return promise;
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (window.requestAnimationFrame) { return window.requestAnimationFrame(callback); }
    else if (window.webkitRequestAnimationFrame) { return window.webkitRequestAnimationFrame(callback); }
    return window.setTimeout(callback, 1000 / 60);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame) { return window.cancelAnimationFrame(id); }
    else if (window.webkitCancelAnimationFrame) { return window.webkitCancelAnimationFrame(id); }
    return window.clearTimeout(id);
  },
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || window.location.href;
    var i;
    var params;
    var param;
    var length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  extend: function extend() {
    var args = [], len$1 = arguments.length;
    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

    var to = Object(args[0]);
    for (var i = 1; i < args.length; i += 1) {
      var nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (typeof to[nextKey] === 'object' && typeof nextSource[nextKey] === 'object') {
              Utils$1.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};

function Device() {
  var ua = window.navigator.userAgent;

  var device = {
    ios: false,
    android: false,
    androidChrome: false,
    desktop: false,
    windows: false,
    iphone: false,
    ipod: false,
    ipad: false,
    cordova: window.cordova || window.phonegap,
    phonegap: window.cordova || window.phonegap,
  };

  var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/);
  var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


  // Windows
  if (windows) {
    device.os = 'windows';
    device.osVersion = windows[2];
    device.windows = true;
  }
  // Android
  if (android && !windows) {
    device.os = 'android';
    device.osVersion = android[2];
    device.android = true;
    device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
  }
  if (ipad || iphone || ipod) {
    device.os = 'ios';
    device.ios = true;
  }
  // iOS
  if (iphone && !ipod) {
    device.osVersion = iphone[2].replace(/_/g, '.');
    device.iphone = true;
  }
  if (ipad) {
    device.osVersion = ipad[2].replace(/_/g, '.');
    device.ipad = true;
  }
  if (ipod) {
    device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
    device.iphone = true;
  }
  // iOS 8+ changed UA
  if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
    if (device.osVersion.split('.')[0] === '10') {
      device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
    }
  }

  // Desktop
  device.desktop = !(device.os || device.android || device.webView);

  // Webview
  device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

  // Minimal UI
  if (device.os && device.os === 'ios') {
    var osVersionArr = device.osVersion.split('.');
    var metaViewport = document.querySelector('meta[name="viewport"]');
    device.minimalUi =
      !device.webView &&
      (ipod || iphone) &&
      (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
      metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
  }

  // Check for status bar and fullscreen app mode
  device.needsStatusbar = function needsStatusbar() {
    if (device.webView && (window.innerWidth * window.innerHeight === window.screen.width * window.screen.height)) {
      return true;
    }
    return false;
  };
  device.statusbar = device.needsStatusbar();

  // Pixel Ratio
  device.pixelRatio = window.devicePixelRatio || 1;

  // Export object
  return device;
}

var Device$1 = Device();

var Framework7Class = function Framework7Class(params, parents) {
  if ( params === void 0 ) params = {};
  if ( parents === void 0 ) parents = [];

  var self = this;
  self.params = params;

  // Events
  self.eventsParents = parents;
  self.eventsListeners = {};

  if (self.params && self.params.on) {
    Object.keys(self.params.on).forEach(function (eventName) {
      self.on(eventName, self.params.on[eventName]);
    });
  }
};
Framework7Class.prototype.on = function on (events, handler) {
  var self = this;
  events.split(' ').forEach(function (event) {
    if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
    self.eventsListeners[event].push(handler);
  });
  return self;
};
Framework7Class.prototype.once = function once (events, handler) {
  var self = this;
  function onceHandler() {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    handler.apply(self, args);
    self.off(events, onceHandler);
  }
  return self.on(events, onceHandler);
};
Framework7Class.prototype.off = function off (events, handler) {
  var self = this;
  events.split(' ').forEach(function (event) {
    if (typeof handler === 'undefined') {
      self.eventsListeners[event] = [];
    } else {
      self.eventsListeners[event].forEach(function (eventHandler, index) {
        if (eventHandler === handler) {
          self.eventsListeners[event].splice(index, 1);
        }
      });
    }
  });
  return self;
};
Framework7Class.prototype.emit = function emit () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

  var self = this;
  var events;
  var data;
  var context;
  var eventsParents;
  if (typeof args[0] === 'string' || Array.isArray(args[0])) {
    events = args[0];
    data = args.slice(1, args.length);
    context = self;
    eventsParents = self.eventsParents;
  } else {
    events = args[0].events;
    data = args[0].data;
    context = args[0].context || self;
    eventsParents = args[0].local ? [] : args[0].parents || self.eventsParents;
  }
  var eventsArray = Array.isArray(events) ? events : events.split(' ');
  eventsArray.forEach(function (event) {
    if (self.eventsListeners[event]) {
      self.eventsListeners[event].forEach(function (eventHandler) {
        eventHandler.apply(context, data);
      });
    }
  });
  if (eventsParents && eventsParents.length > 0) {
    eventsParents.forEach(function (eventsParent) {
      eventsParent.emit.apply(eventsParent, [ events ].concat( data ));
    });
  }
  return self;
};
Framework7Class.prototype.useInstanceModulesParams = function useInstanceModulesParams (instanceParams) {
  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    // Extend params
    if (module.params) {
      Utils$1.extend(instanceParams, module.params);
    }
  });
};
Framework7Class.prototype.useInstanceModules = function useInstanceModules (modulesParams) {
    if ( modulesParams === void 0 ) modulesParams = {};

  var instance = this;
  if (!instance.modules) { return; }
  Object.keys(instance.modules).forEach(function (moduleName) {
    var module = instance.modules[moduleName];
    var moduleParams = modulesParams[moduleName] || {};
    // Extend instance methods and props
    if (module.instance) {
      Object.keys(module.instance).forEach(function (modulePropName) {
        var moduleProp = module.instance[modulePropName];
        if (typeof moduleProp === 'function') {
          instance[modulePropName] = moduleProp.bind(instance);
        } else {
          instance[modulePropName] = moduleProp;
        }
      });
    }
    // Add event listeners
    if (module.on && instance.on) {
      Object.keys(module.on).forEach(function (moduleEventName) {
        instance.on(moduleEventName, module.on[moduleEventName]);
      });
    }

    // Module create callback
    if (module.create) {
      module.create.bind(instance)(moduleParams);
    }
  });
};
Framework7Class.installModule = function installModule (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (!Class.prototype.modules) { Class.prototype.modules = {}; }
  var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils$1.now())));
  Class.prototype.modules[name] = module;
  // Prototype
  if (module.proto) {
    Object.keys(module.proto).forEach(function (key) {
      Class.prototype[key] = module.proto[key];
    });
  }
  // Class
  if (module.static) {
    Object.keys(module.static).forEach(function (key) {
      Class[key] = module.static[key];
    });
  }
  // Callback
  if (module.install) {
    module.install.apply(Class, params);
  }
  return Class;
};
Framework7Class.use = function use (module) {
    var params = [], len = arguments.length - 1;
    while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

  var Class = this;
  if (Array.isArray(module)) {
    module.forEach(function (m) { return Class.installModule(m); });
  }
  return Class.installModule.apply(Class, [ module ].concat( params ));
};

var Framework7$1 = (function (Framework7Class$$1) {
  function Framework7(params) {
    Framework7Class$$1.call(this, params);

    // App Instance
    var app = this;

    // Default
    var defaults = {
      root: 'body',
      theme: 'auto',
      init: true,
      routes: [],
    };

    // Extend defaults with modules params
    app.useInstanceModulesParams(defaults);

    // Extend defaults with passed params
    app.params = Utils$1.extend(defaults, params);

    // Routes
    app.routes = app.params.routes;

    // Root
    app.root = dom7$1(app.params.root);
    app.root[0].f7 = app;

    // Link to local storage
    app.ls = window.localStorage;

    // RTL
    app.rtl = app.root.css('direction') === 'rtl';

    // Theme
    if (app.params.theme === 'auto') {
      app.theme = Device$1.ios ? 'ios' : 'md';
    } else {
      app.theme = app.params.theme;
    }

    // Install Modules
    app.useInstanceModules({
      router: {
        app: app,
      },
    });

    // Init
    if (app.params.init) {
      app.init();
    }

    // Return app instance
    return app;
  }

  if ( Framework7Class$$1 ) Framework7.__proto__ = Framework7Class$$1;
  Framework7.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Framework7.prototype.constructor = Framework7;
  Framework7.prototype.init = function init () {
    var app = this;
    if (app.initialized) { return; }

    app.root.addClass('framework7-initializing');

    // RTL attr
    if (app.rtl) {
      dom7$1('html').attr('dir', 'rtl');
    }

    // Root class
    app.root.addClass('framework7-root');

    // Theme class
    dom7$1('html').removeClass('ios md').addClass(app.theme);

    // Data
    app.data = {};
    if (app.params.data && typeof app.params.data === 'function') {
      Utils$1.extend(app.data, app.params.data.bind(app)());
    }
    Utils$1.nextFrame(function () {
      app.root.removeClass('framework7-initializing');
    });
    // Emit, init other modules
    app.initialized = true;
    app.emit('init');
  };
  Framework7.Class = function Class () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return new (Function.prototype.bind.apply( Framework7Class$$1, [ null ].concat( args) ));
  };

  return Framework7;
}(Framework7Class));

Framework7$1.Class = Framework7Class;

var Resize = {
  name: 'resize',
  instance: {
    getSize: function getSize() {
      var app = this;
      var offset = app.root.offset();
      var ref = [app.root[0].offsetWidth, app.root[0].offsetHeight, offset.left, offset.top];
      var width = ref[0];
      var height = ref[1];
      var left = ref[2];
      var top = ref[3];
      app.width = width;
      app.height = height;
      app.left = left;
      app.top = top;
      return { width: width, height: height, left: left, top: top };
    },
  },
  on: {
    init: function init() {
      var app = this;

      // Get Size
      app.getSize();

      // Emit resize
      window.addEventListener('resize', function () {
        app.emit('resize');
      }, false);

      // Emit orientationchange
      window.addEventListener('orientationchange', function () {
        app.emit('orientationchange');
      });
    },
    orientationchange: function orientationchange() {
      var app = this;
      if (app.device && app.device.minimalUi) {
        if (window.orientation === 90 || window.orientation === -90) {
          document.body.scrollTop = 0;
        }
      }
      // Fix iPad weird body scroll
      if (app.device.ipad) {
        document.body.scrollLeft = 0;
        setTimeout(function () {
          document.body.scrollLeft = 0;
        }, 0);
      }
    },
    resize: function resize() {
      var app = this;
      app.getSize();
    },
  },
};

var Device$2 = {
  name: 'device',
  proto: {
    device: Device$1,
  },
  static: {
    Device: Device$1,
  },
  on: {
    init: function init() {
      var classNames = [];
      var html = document.querySelector('html');
      // Pixel Ratio
      classNames.push(("device-pixel-ratio-" + (Math.floor(Device$1.pixelRatio))));
      if (Device$1.pixelRatio >= 2) {
        classNames.push('device-retina');
      }
      // OS classes
      if (Device$1.os) {
        classNames.push(("device-" + (Device$1.os)), ("device-" + (Device$1.os) + "-" + (Device$1.osVersion.split('.')[0])), ("device-" + (Device$1.os) + "-" + (Device$1.osVersion.replace(/\./g, '-'))));
        if (Device$1.os === 'ios') {
          var major = parseInt(Device$1.osVersion.split('.')[0], 10);
          for (var i = major - 1; i >= 6; i -= 1) {
            classNames.push(("device-ios-gt-" + i));
          }
        }
      } else if (Device$1.desktop) {
        classNames.push('device-desktop');
      }
      // Status bar classes
      if (Device$1.statusBar) {
        classNames.push('with-statusbar-overlay');
      } else {
        html.classList.remove('with-statusbar-overlay');
      }

      // Add html classes
      classNames.forEach(function (className) {
        html.classList.add(className);
      });
    },
  },
};

function supportsPassiveListener() {
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, 'passive', {
      get: function get() {
        supportsPassive = true;
      },
    });
    window.addEventListener('testPassiveListener', null, opts);
  } catch (e) {
    supportsPassive = false;
  }
  return supportsPassive;
}
function supportTouch() {
  return !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch));
}

var positionSticky = false;
function supportPositionSticky() {
  var div = document.createElement('div');
  ('sticky -webkit-sticky -moz-sticky').split(' ').forEach(function (prop) {
    if (positionSticky) { return; }
    div.style.position = prop;
    if (div.style.position === prop) { positionSticky = prop; }
  });
}
supportPositionSticky();
function positionStickyFalsy() {
  var falsy = false;
  if (!positionSticky) { return falsy; }
  var div = document.createElement('div');
  div.innerHTML = "\n    <div id=\"position-sticky-test\" style=\"overflow:scroll; height: 100px; width:100px; position: absolute; left:0px; top:0px; padding-top:50px; visibility: hidden;\">\n      <div id=\"position-sticky-test-element\" style=\"margin:0; padding:0; height:10px; width:100%; position:" + positionSticky + "; top:0\"></div>\n      <div style=\"height: 1000px\"></div>\n    </div>";
  document.body.appendChild(div);
  document.getElementById('position-sticky-test').scrollTop = 50;
  if (document.getElementById('position-sticky-test-element').offsetTop === 50) {
    falsy = true;
  }
  div.parentNode.removeChild(div);
  return falsy;
}
var Support$1 = {
  touch: supportTouch(),
  // Passive Listeners
  passiveListener: supportsPassiveListener(),
  positionSticky: positionSticky,
  positionStickyFalsy: positionStickyFalsy(),
};

var Support = {
  name: 'support',
  proto: {
    support: Support$1,
  },
  static: {
    Support: Support$1,
  },
  on: {
    init: function init() {
      var html = document.querySelector('html');
      var classNames = [];
      if (Support$1.positionSticky) {
        classNames.push('support-position-sticky');
        if (Support$1.positionStickyFalsy) {
          classNames.push('support-position-sticky-falsy');
        }
      }
      // Add html classes
      classNames.forEach(function (className) {
        html.classList.add(className);
      });
    },
  },
};

function initTouch() {
  var app = this;
  var params = app.params.touch;
  var useRipple = app.theme === 'md' && params.materialRipple;

  if (Device$1.ios && Device$1.webView) {
    // Strange hack required for iOS 8 webview to work on inputs
    window.addEventListener('touchstart', function () {});
  }

  var touchStartX;
  var touchStartY;
  var touchStartTime;
  var targetElement;
  var trackClick;
  var activeSelection;
  var scrollParent;
  var lastClickTime;
  var isMoved;
  var tapHoldFired;
  var tapHoldTimeout;

  var activableElement;
  var activeTimeout;

  var needsFastClick;
  var needsFastClickTimeOut;

  var rippleWave;
  var rippleTarget;
  var rippleTimeout;

  function findActivableElement(el) {
    var target = dom7$1(el);
    var parents = target.parents(params.activeStateElements);
    var activable;
    if (target.is(params.activeStateElements)) {
      activable = target;
    }
    if (parents.length > 0) {
      activable = activable ? activable.add(parents) : parents;
    }
    return activable || target;
  }

  function isInsideScrollableView(el) {
    var pageContent = el.parents('.page-content, .panel');

    if (pageContent.length === 0) {
      return false;
    }

    // This event handler covers the "tap to stop scrolling".
    if (pageContent.prop('scrollHandlerSet') !== 'yes') {
      pageContent.on('scroll', function () {
        clearTimeout(activeTimeout);
        clearTimeout(rippleTimeout);
      });
      pageContent.prop('scrollHandlerSet', 'yes');
    }

    return true;
  }
  function addActive() {
    if (!activableElement) { return; }
    activableElement.addClass('active-state');
  }
  function removeActive() {
    if (!activableElement) { return; }
    activableElement.removeClass('active-state');
    activableElement = null;
  }
  function isFormElement(el) {
    var nodes = ('input select textarea label').split(' ');
    if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) { return true; }
    return false;
  }
  function androidNeedsBlur(el) {
    var noBlur = ('button input textarea select').split(' ');
    if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
      if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
        return false;
      }
      return true;
    }
    return false;
  }
  function targetNeedsFastClick(el) {
    /*
    if (
      Device.ios
      &&
      (
        Device.osVersion.split('.')[0] > 9
        ||
        (Device.osVersion.split('.')[0] * 1 === 9 && Device.osVersion.split('.')[1] >= 1)
      )
    ) {
      return false;
    }
    */
    var $el = dom7$1(el);
    if (el.nodeName.toLowerCase() === 'input' && (el.type === 'file' || el.type === 'range')) { return false; }
    if (el.nodeName.toLowerCase() === 'select' && Device$1.android) { return false; }
    if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) { return false; }
    if (params.fastClicksExclude && $el.is(params.fastClicksExclude)) { return false; }
    return true;
  }
  function targetNeedsFocus(el) {
    if (document.activeElement === el) {
      return false;
    }
    var tag = el.nodeName.toLowerCase();
    var skipInputs = ('button checkbox file image radio submit').split(' ');
    if (el.disabled || el.readOnly) { return false; }
    if (tag === 'textarea') { return true; }
    if (tag === 'select') {
      if (Device$1.android) { return false; }
      return true;
    }
    if (tag === 'input' && skipInputs.indexOf(el.type) < 0) { return true; }
    return false;
  }
  function targetNeedsPrevent(el) {
    var $el = dom7$1(el);
    var prevent = true;
    if ($el.is('label') || $el.parents('label').length > 0) {
      if (Device$1.android) {
        prevent = false;
      } else if (Device$1.ios && $el.is('input')) {
        prevent = true;
      } else { prevent = false; }
    }
    return prevent;
  }

  // Ripple handlers
  function findRippleElement(el) {
    var rippleElements = params.materialRippleElements;
    var $el = dom7$1(el);
    if ($el.is(rippleElements)) {
      if ($el.hasClass('no-ripple')) {
        return false;
      }
      return $el;
    } else if ($el.parents(rippleElements).length > 0) {
      var rippleParent = $el.parents(rippleElements).eq(0);
      if (rippleParent.hasClass('no-ripple')) {
        return false;
      }
      return rippleParent;
    }
    return false;
  }
  function createRipple($el, x, y) {
    if (!$el) { return; }
    rippleWave = app.touchRipple.create($el, x, y);
  }

  function removeRipple() {
    if (!rippleWave) { return; }
    rippleWave.remove();
    rippleWave = undefined;
    rippleTarget = undefined;
  }
  function rippleTouchStart(el) {
    rippleTarget = findRippleElement(el);
    if (!rippleTarget || rippleTarget.length === 0) {
      rippleTarget = undefined;
      return;
    }
    if (!isInsideScrollableView(rippleTarget)) {
      createRipple(rippleTarget, touchStartX, touchStartY);
    } else {
      rippleTimeout = setTimeout(function () {
        createRipple(rippleTarget, touchStartX, touchStartY);
      }, 80);
    }
  }
  function rippleTouchMove() {
    clearTimeout(rippleTimeout);
    removeRipple();
  }
  function rippleTouchEnd() {
    if (rippleWave) {
      removeRipple();
    } else if (rippleTarget && !isMoved) {
      clearTimeout(rippleTimeout);
      createRipple(rippleTarget, touchStartX, touchStartY);
      setTimeout(removeRipple, 0);
    } else {
      removeRipple();
    }
  }

  // Mouse Handlers
  function handleMouseDown(e) {
    findActivableElement(e.target).addClass('active-state');
    if ('which' in e && e.which === 3) {
      setTimeout(function () {
        dom7$1('.active-state').removeClass('active-state');
      }, 0);
    }
    if (useRipple) {
      touchStartX = e.pageX;
      touchStartY = e.pageY;
      rippleTouchStart(e.target, e.pageX, e.pageY);
    }
  }
  function handleMouseMove() {
    dom7$1('.active-state').removeClass('active-state');
    if (useRipple) {
      rippleTouchMove();
    }
  }
  function handleMouseUp() {
    dom7$1('.active-state').removeClass('active-state');
    if (useRipple) {
      rippleTouchEnd();
    }
  }

  // Send Click
  function sendClick(e) {
    var touch = e.changedTouches[0];
    var evt = document.createEvent('MouseEvents');
    var eventType = 'click';
    if (Device$1.android && targetElement.nodeName.toLowerCase() === 'select') {
      eventType = 'mousedown';
    }
    evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    evt.forwardedTouchEvent = true;
    targetElement.dispatchEvent(evt);
  }

  // Touch Handlers
  function handleTouchStart(e) {
    var this$1 = this;

    isMoved = false;
    tapHoldFired = false;
    if (e.targetTouches.length > 1) {
      if (activableElement) { removeActive(); }
      return true;
    }
    if (e.touches.length > 1 && activableElement) {
      removeActive();
    }
    if (params.tapHold) {
      if (tapHoldTimeout) { clearTimeout(tapHoldTimeout); }
      tapHoldTimeout = setTimeout(function () {
        if (e && e.touches && e.touches.length > 1) { return; }
        tapHoldFired = true;
        e.preventDefault();
        dom7$1(e.target).trigger('taphold');
      }, params.tapHoldDelay);
    }
    if (needsFastClickTimeOut) { clearTimeout(needsFastClickTimeOut); }
    needsFastClick = targetNeedsFastClick(e.target);

    if (!needsFastClick) {
      trackClick = false;
      return true;
    }
    if (Device$1.ios || (Device$1.android && 'getSelection' in window)) {
      var selection = window.getSelection();
      if (
        selection.rangeCount &&
        selection.focusNode !== document.body &&
        (!selection.isCollapsed || document.activeElement === selection.focusNode)
      ) {
        activeSelection = true;
        return true;
      }

      activeSelection = false;
    }
    if (Device$1.android) {
      if (androidNeedsBlur(e.target)) {
        document.activeElement.blur();
      }
    }

    trackClick = true;
    targetElement = e.target;
    touchStartTime = (new Date()).getTime();
    touchStartX = e.targetTouches[0].pageX;
    touchStartY = e.targetTouches[0].pageY;

      // Detect scroll parent
    if (Device$1.ios) {
      scrollParent = undefined;
      dom7$1(targetElement).parents().each(function () {
        var parent = this$1;
        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
          scrollParent = parent;
          scrollParent.f7ScrollTop = scrollParent.scrollTop;
        }
      });
    }
    if ((e.timeStamp - lastClickTime) < params.fastClicksDelayBetweenClicks) {
      e.preventDefault();
    }

    if (params.activeState) {
      activableElement = findActivableElement(targetElement);
      // If it's inside a scrollable view, we don't trigger active-state yet,
      // because it can be a scroll instead. Based on the link:
      // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
      if (!isInsideScrollableView(activableElement)) {
        addActive();
      } else {
        activeTimeout = setTimeout(addActive, 80);
      }
    }
    if (useRipple) {
      rippleTouchStart(targetElement, touchStartX, touchStartY);
    }
    return true;
  }
  function handleTouchMove(e) {
    if (!trackClick) { return; }
    var distance = params.fastClicksDistanceThreshold;
    if (distance) {
      var pageX = e.targetTouches[0].pageX;
      var pageY = e.targetTouches[0].pageY;
      if (Math.abs(pageX - touchStartX) > distance || Math.abs(pageY - touchStartY) > distance) {
        isMoved = true;
      }
    } else {
      isMoved = true;
    }
    if (isMoved) {
      trackClick = false;
      targetElement = null;
      isMoved = true;
      if (params.tapHold) {
        clearTimeout(tapHoldTimeout);
      }
      if (params.activeState) {
        clearTimeout(activeTimeout);
        removeActive();
      }
      if (useRipple) {
        rippleTouchMove();
      }
    }
  }
  function handleTouchEnd(e) {
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);

    if (!trackClick) {
      if (!activeSelection && needsFastClick) {
        if (!(Device$1.android && !e.cancelable) && e.cancelable) {
          e.preventDefault();
        }
      }
      return true;
    }

    if (document.activeElement === e.target) {
      if (params.activeState) { removeActive(); }
      if (useRipple) {
        rippleTouchEnd();
      }
      return true;
    }

    if (!activeSelection) {
      e.preventDefault();
    }

    if ((e.timeStamp - lastClickTime) < params.fastClicksDelayBetweenClicks) {
      setTimeout(removeActive, 0);
      return true;
    }

    lastClickTime = e.timeStamp;

    trackClick = false;

    if (Device$1.ios && scrollParent) {
      if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
        return false;
      }
    }

    // Add active-state here because, in a very fast tap, the timeout didn't
    // have the chance to execute. Removing active-state in a timeout gives
    // the chance to the animation execute.
    if (params.activeState) {
      addActive();
      setTimeout(removeActive, 0);
    }
    // Remove Ripple
    if (useRipple) {
      rippleTouchEnd();
    }

      // Trigger focus when required
    if (targetNeedsFocus(targetElement)) {
      if (Device$1.ios && Device$1.webView) {
        if ((e.timeStamp - touchStartTime) > 159) {
          targetElement = null;
          return false;
        }
        targetElement.focus();
        return false;
      }

      targetElement.focus();
    }

      // Blur active elements
    if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
      document.activeElement.blur();
    }

      // Send click
    e.preventDefault();
    sendClick(e);
    return false;
  }
  function handleTouchCancel() {
    trackClick = false;
    targetElement = null;

      // Remove Active State
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);
    if (params.activeState) {
      removeActive();
    }

      // Remove Ripple
    if (useRipple) {
      rippleTouchEnd();
    }
  }

  function handleClick(e) {
    var allowClick = false;

    if (trackClick) {
      targetElement = null;
      trackClick = false;
      return true;
    }
    if ((e.target.type === 'submit' && e.detail === 0) || e.target.type === 'file') {
      return true;
    }
    if (!targetElement) {
      if (!isFormElement(e.target)) {
        allowClick = true;
      }
    }
    if (!needsFastClick) {
      allowClick = true;
    }
    if (document.activeElement === targetElement) {
      allowClick = true;
    }
    if (e.forwardedTouchEvent) {
      allowClick = true;
    }
    if (!e.cancelable) {
      allowClick = true;
    }
    if (params.tapHold && params.tapHoldPreventClicks && tapHoldFired) {
      allowClick = false;
    }
    if (!allowClick) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      if (targetElement) {
        if (targetNeedsPrevent(targetElement) || isMoved) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
      targetElement = null;
    }
    needsFastClickTimeOut = setTimeout(function () {
      needsFastClick = false;
    }, (Device$1.ios || Device$1.androidChrome ? 100 : 400));

    if (params.tapHold) {
      tapHoldTimeout = setTimeout(function () {
        tapHoldFired = false;
      }, (Device$1.ios || Device$1.androidChrome ? 100 : 400));
    }

    return allowClick;
  }

  function emitAppTouchEvent(name, context, e) {
    app.emit({
      events: name,
      data: [e],
      context: context,
    });
  }
  function appClick(e) {
    emitAppTouchEvent('click', this, e);
  }
  function appTouchStartActive(e) {
    emitAppTouchEvent('touchstart', this, e);
  }
  function appTouchMoveActive(e) {
    emitAppTouchEvent('touchmove', this, e);
  }
  function appTouchEndActive(e) {
    emitAppTouchEvent('touchend', this, e);
  }
  function appTouchStartPassive(e) {
    emitAppTouchEvent('touchstart:passive', this, e);
  }
  function appTouchMovePassive(e) {
    emitAppTouchEvent('touchmove:passive', this, e);
  }
  function appTouchEndPassive(e) {
    emitAppTouchEvent('touchend:passive', this, e);
  }

  var passiveListener = Support$1.passiveListener ? { passive: true } : false;
  var activeListener = Support$1.passiveListener ? { passive: false } : false;

  document.addEventListener('click', appClick, true);

  if (Support$1.passiveListener) {
    document.addEventListener(app.touchEvents.start, appTouchStartActive, activeListener);
    document.addEventListener(app.touchEvents.move, appTouchMoveActive, activeListener);
    document.addEventListener(app.touchEvents.end, appTouchEndActive, activeListener);

    document.addEventListener(app.touchEvents.start, appTouchStartPassive, passiveListener);
    document.addEventListener(app.touchEvents.move, appTouchMovePassive, passiveListener);
    document.addEventListener(app.touchEvents.end, appTouchEndPassive, passiveListener);
  } else {
    document.addEventListener(app.touchEvents.start, function handler(e) {
      appTouchStartActive.call(this, e);
      appTouchStartPassive.call(this, e);
    }, false);
    document.addEventListener(app.touchEvents.move, function handler(e) {
      appTouchMoveActive.call(this, e);
      appTouchMovePassive.call(this, e);
    }, false);
    document.addEventListener(app.touchEvents.end, function handler(e) {
      appTouchEndActive.call(this, e);
      appTouchEndPassive.call(this, e);
    }, false);
  }

  if (Support$1.touch) {
    app.on('click', handleClick);
    app.on('touchstart', handleTouchStart);
    app.on('touchmove', handleTouchMove);
    app.on('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true });
  } else if (params.activeState) {
    app.on('touchstart', handleMouseDown);
    app.on('touchmove', handleMouseMove);
    app.on('touchend', handleMouseUp);
  }

  if (useRipple) {
    document.addEventListener('contextmenu', function () {
      if (activableElement) { removeActive(); }
      rippleTouchEnd();
    });
  }
}

var Touch = {
  name: 'touch',
  params: {
    touch: {
      // Fast clicks
      fastClicks: true,
      fastClicksDistanceThreshold: 10,
      fastClicksDelayBetweenClicks: 50,
      fastClicksExclude: '', // CSS selector
      // Tap Hold
      tapHold: false,
      tapHoldDelay: 750,
      tapHoldPreventClicks: true,
      // Active State
      activeState: true,
      activeStateElements: 'a, button, label, span, .actions-button',
      materialRipple: true,
      materialRippleElements: '.ripple, .link, .item-link, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell',
    },
  },
  instance: {
    touchEvents: {
      start: Support$1.touch ? 'touchstart' : 'mousedown',
      move: Support$1.touch ? 'touchmove' : 'mousemove',
      end: Support$1.touch ? 'touchend' : 'mouseup',
    },
  },
  on: {
    init: initTouch,
  },
};

var tempDom = document.createElement('div');

var Framework7Component = function Framework7Component(c, extend) {
  if ( extend === void 0 ) extend = {};

  var context = Utils$1.extend({}, extend);
  var component = Utils$1.extend(this, c, { context: context });

  // Apply context
  ('beforeCreate created beforeMount mounted beforeDestroy destroyed').split(' ').forEach(function (cycleKey) {
    if (component[cycleKey]) { component[cycleKey] = component[cycleKey].bind(context); }
  });

  if (component.data) {
    component.data = component.data.bind(context);
    // Data
    Utils$1.extend(context, component.data());
  }
  if (component.render) { component.render = component.render.bind(context); }
  if (component.methods) {
    Object.keys(component.methods).forEach(function (methodName) {
      context[methodName] = component.methods[methodName].bind(context);
    });
  }
  if (component.on) {
    Object.keys(component.on).forEach(function (eventName) {
      component.on[eventName] = component.on[eventName].bind(context);
    });
  }

  if (component.beforeCreate) { component.beforeCreate(); }

  // Watchers
  if (component.watch) {
    Object.keys(component.watch).forEach(function (watchKey) {
      var dataKeyValue = component.context[watchKey];
      Object.defineProperty(component.context, watchKey, {
        enumerable: true,
        configurable: true,
        set: function set(newValue) {
          dataKeyValue = newValue;
          component.watch[watchKey].call(context, dataKeyValue);
        },
        get: function get() {
          return dataKeyValue;
        },
      });
    });
  }

  // Render template
  var html = '';
  if (component.render) {
    html = component.render();
  } else if (component.template) {
    if (typeof component.template === 'string') {
      html = t7.compile(component.template)(context);
    } else {
      // Supposed to be function
      html = component.template(context);
    }
  }

  // Make Dom
  if (html && typeof html === 'string') {
    html = html.trim();
  }
  tempDom.innerHTML = html;

  // Extend context with $el
  var el = tempDom.children[0];
  context.$el = dom7$1(el);
  component.el = el;

  // Find Events
  var events = [];
  dom7$1(tempDom).find('*').each(function (index, element) {
    for (var i = 0; i < element.attributes.length; i += 1) {
      var attr = element.attributes[i];
      if (attr.name.indexOf('@') === 0) {
        var event = attr.name.replace('@', '');
        var name = event;
        var stop = false;
        var prevent = false;
        var once = false;
        if (event.indexOf('.') >= 0) {
          event.split('.').forEach(function (eventNamePart, eventNameIndex) {
            if (eventNameIndex === 0) { name = eventNamePart; }
            else {
              if (eventNamePart === 'stop') { stop = true; }
              if (eventNamePart === 'prevent') { prevent = true; }
              if (eventNamePart === 'once') { once = true; }
            }
          });
        }

        var value = attr.value;
        element.removeAttribute(attr.name);
        events.push({
          el: element,
          name: name,
          once: once,
          handler: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            var e = args[0];
            if (stop) { e.stopPropagation(); }
            if (prevent) { e.preventDefault(); }
            var methodName;
            var method;
            var customArgs = [];
            if (value.indexOf('(') < 0) {
              customArgs = args;
              methodName = value;
            } else {
              methodName = value.split('(')[0];
              value.split('(')[1].split(')')[0].split(',').forEach(function (argument) {
                var arg = argument.trim();

                if (!isNaN(arg)) { arg = parseFloat(arg); }
                else if (arg === 'true') { arg = true; }
                else if (arg === 'false') { arg = false; }
                else if (arg === 'null') { arg = null; }
                else if (arg === 'undefined') { arg = undefined; }
                else if (arg[0] === '"') { arg = arg.replace(/"/g, ''); }
                else if (arg[0] === '\'') { arg = arg.replace(/'/g, ''); }
                else if (arg.indexOf('.') > 0) {
                  var deepArg;
                  arg.split('.').forEach(function (path) {
                    if (!deepArg) { deepArg = context; }
                    deepArg = deepArg[path];
                  });
                  arg = deepArg;
                } else {
                  arg = context[arg];
                }
                customArgs.push(arg);
              });
            }
            if (methodName.indexOf('.') >= 0) {
              methodName.split('.').forEach(function (path, pathIndex) {
                if (!method) { method = context; }
                if (method[path]) { method = method[path]; }
                else {
                  throw new Error(("Component doesn't have method \"" + (methodName.split('.').slice(0, pathIndex + 1).join('.')) + "\""));
                }
              });
            } else {
              if (!context[methodName]) {
                throw new Error(("Component doesn't have method \"" + methodName + "\""));
              }
              method = context[methodName];
            }
            method.apply(void 0, customArgs);
          },
        });
      }
    }
  });

  // Set styles scope ID
  var styleEl;
  if (component.styles) {
    styleEl = document.createElement('style');
    styleEl.innerHTML = component.styles;
  }
  if (component.stylesScopeId) {
    el.setAttribute('data-scope', component.stylesScopeId);
  }

  // Attach events
  function attachEvents() {
    events.forEach(function (event) {
      dom7$1(event.el)[event.once ? 'once' : 'on'](event.name, event.handler);
    });
  }

  function detachEvents() {
    events.forEach(function (event) {
      dom7$1(event.el).off(event.name, event.handler);
    });
  }

  attachEvents();

  // Created callback
  if (component.created) { component.created(); }

  // Mount
  component.mount = function mount(mountMethod) {
    if (component.beforeMount) { component.beforeMount(); }
    if (styleEl) { dom7$1('head').append(styleEl); }
    if (mountMethod) { mountMethod(el); }
    if (component.mounted) { component.mounted(); }
  };

  // Destroy
  component.destroy = function destroy() {
    if (component.beforeDestroy) { component.beforeDestroy(); }
    if (styleEl) { dom7$1(styleEl).remove(); }
    detachEvents();
    if (component.destroyed) { component.destroyed(); }
  };

  // Store component instance
  for (var i = 0; i < tempDom.children.length; i += 1) {
    tempDom.children[i].f7Component = component;
  }

  return component;
};


var Component = {
  parse: function parse(componentString) {
    var callbackName = "f7_component_callback_" + (new Date().getTime());

    // Template
    var template;
    if (componentString.indexOf('<template>') >= 0) {
      template = componentString.split('<template>')[1].split('</template>')[0].trim();
    }

    // Styles
    var styles;
    var stylesScopeId = Utils$1.now();
    if (componentString.indexOf('<style>') >= 0) {
      styles = componentString.split('<style>')[1].split('</style>')[0];
    } else if (componentString.indexOf('<style scoped>') >= 0) {
      styles = componentString.split('<style scoped>')[1].split('</style>')[0];
      styles = styles.split('\n').map(function (line) {
        if (line.indexOf('{') >= 0) {
          if (line.indexOf('{{this}}') >= 0) {
            return line.replace('{{this}}', ("[data-scope=\"" + stylesScopeId + "\"]"));
          }
          return ("[data-scope=\"" + stylesScopeId + "\"] " + (line.trim()));
        }
        return line;
      }).join('\n');
    }

    var scriptContent;
    if (componentString.indexOf('<script>') >= 0) {
      scriptContent = componentString.split('<script>')[1].split('</script>')[0].trim();
    } else {
      scriptContent = 'return {}';
    }
    scriptContent = "window." + callbackName + " = function () {" + scriptContent + "}";

    // Insert Script El
    var scriptEl = document.createElement('script');
    scriptEl.innerHTML = scriptContent;
    dom7$1('head').append(scriptEl);

    var component = window[callbackName]();

    // Remove Script El
    dom7$1(scriptEl).remove();

    if (!component.template && !component.render) {
      component.template = template;
    }
    if (styles) {
      component.styles = styles;
      component.stylesScopeId = stylesScopeId;
    }
    return component;
  },
  create: function create(c, extendContext) {
    if ( extendContext === void 0 ) extendContext = {};

    return new Framework7Component(c, extendContext);
  },
};

var History = {
  queue: [],
  clearQueue: function clearQueue() {
    if (History.queue.length === 0) { return; }
    var currentQueue = History.queue.shift();
    currentQueue();
  },
  routerQueue: [],
  clearRouterQueue: function clearRouterQueue() {
    if (History.routerQueue.length === 0) { return; }
    var currentQueue = History.routerQueue.pop();
    var router = currentQueue.router;

    var animate = router.params.animate;
    if (router.params.pushStateAnimate === false) { animate = false; }

    if (currentQueue.action === 'back') {
      router.back({ animate: animate, pushState: false });
    }
    if (currentQueue.action === 'load') {
      router.navigate(currentQueue.stateUrl, { animate: animate, pushState: false });
    }
  },
  handle: function handle(e) {
    if (History.blockPopstate) { return; }
    var app = this;
    var mainView = app.views.main;
    var state = e.state;
    History.previousState = History.state;
    History.state = state;

    History.allowChange = true;
    History.clearQueue();

    state = History.state;

    if (!state && mainView) {
      state = {
        viewIndex: mainView.index,
        url: mainView.router.history[0],
      };
    }
    if (state.viewIndex < 0) { return; }
    var view = app.views[state.viewIndex];
    var router = view.router;
    var stateUrl = (state && state.url) || undefined;

    var animate = router.params.animate;
    if (router.params.pushStateAnimate === false) { animate = false; }

    if (stateUrl !== router.url) {
      if (router.history.indexOf(stateUrl) >= 0) {
        // Go Back
        if (router.allowPageChange) {
          router.back({ animate: animate, pushState: false });
        } else {
          History.routerQueue.push({
            action: 'back',
            router: router,
          });
        }
      } else if (router.allowPageChange) {
        // Load page
        router.navigate(stateUrl, { animate: animate, pushState: false });
      } else {
        History.routerQueue.unshift({
          action: 'load',
          stateUrl: stateUrl,
          router: router,
        });
      }
    }
  },
  push: function push(state, url) {
    if (!History.allowChange) {
      History.queue.push(function () {
        History.push(state, url);
      });
      return;
    }
    History.previousState = History.state;
    History.state = state;
    window.history.pushState(state, '', url);
  },
  replace: function replace(state, url) {
    if (!History.allowChange) {
      History.queue.push(function () {
        History.replace(state, url);
      });
      return;
    }
    History.previousState = History.state;
    History.state = state;
    window.history.replaceState(state, '', url);
  },
  go: function go(index) {
    History.allowChange = false;
    window.history.go(index);
  },
  back: function back() {
    History.allowChange = false;
    window.history.back();
  },
  allowChange: true,
  previousState: {},
  state: window.history.state,
  blockPopstate: true,
  init: function init(app) {
    dom7$1(window).on('load', function () {
      setTimeout(function () {
        History.blockPopstate = false;
      }, 0);
    });

    if (document.readyState && document.readyState === 'complete') {
      History.blockPopstate = false;
    }

    dom7$1(window).on('popstate', History.handle.bind(app));
  },
};

function SwipeBack(r) {
  var router = r;
  var $el = router.$el;
  var $navbarEl = router.$navbarEl;
  var app = router.app;
  var isTouched = false;
  var isMoved = false;
  var touchesStart = {};
  var isScrolling;
  var currentPage = [];
  var previousPage = [];
  var viewContainerWidth;
  var touchesDiff;
  var allowViewTouchMove = true;
  var touchStartTime;
  var currentNavbar = [];
  var previousNavbar = [];
  var currentNavElements;
  var previousNavElements;
  var activeNavBackIcon;
  var activeNavBackIconText;
  var previousNavBackIcon;
  var previousNavBackIconText;
  var dynamicNavbar;
  var separateNavbar;
  var pageShadow;
  var pageOpacity;
  var navbarWidth;

  function handleTouchStart(e) {
    if (!allowViewTouchMove || !router.params.swipeBackPage || isTouched || app.swipeout.el || !router.allowPageChange) { return; }
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    touchStartTime = (new Date()).getTime();
    dynamicNavbar = router.dynamicNavbar;
    separateNavbar = router.separateNavbar;
  }
  function handleTouchMove(e) {
    if (!isTouched) { return; }
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (typeof isScrolling === 'undefined') {
      isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
    }
    if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
      isTouched = false;
      return;
    }
    if (!isMoved) {
      // Calc values during first move fired
      var cancel = false;
      var target = dom7$1(e.target);

      var swipeout = target.closest('.swipeout');
      if (swipeout.length > 0) {
        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) { cancel = true; }
        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) { cancel = true; }
      }

      currentPage = target.closest('.page');
      if (currentPage.hasClass('no-swipeback')) { cancel = true; }
      previousPage = $el.find('.page-previous:not(.stacked)');

      var notFromBorder = touchesStart.x - $el.offset().left > router.params.swipeBackPageActiveArea;
      viewContainerWidth = $el.width();
      if (app.rtl) {
        notFromBorder = touchesStart.x < ($el.offset().left - $el[0].scrollLeft) + (viewContainerWidth - router.params.swipeBackPageActiveArea);
      } else {
        notFromBorder = touchesStart.x - $el.offset().left > router.params.swipeBackPageActiveArea;
      }
      if (notFromBorder) { cancel = true; }
      if (previousPage.length === 0 || currentPage.length === 0) { cancel = true; }
      if (cancel) {
        isTouched = false;
        return;
      }

      if (router.params.swipeBackPageAnimateShadow) {
        pageShadow = currentPage.find('.page-shadow-effect');
        if (pageShadow.length === 0) {
          pageShadow = dom7$1('<div class="page-shadow-effect"></div>');
          currentPage.append(pageShadow);
        }
      }
      if (router.params.swipeBackPageAnimateOpacity) {
        pageOpacity = previousPage.find('.page-opacity-effect');
        if (pageOpacity.length === 0) {
          pageOpacity = dom7$1('<div class="page-opacity-effect"></div>');
          previousPage.append(pageOpacity);
        }
      }

      if (dynamicNavbar) {
        if (separateNavbar) {
          currentNavbar = $navbarEl.find('.navbar-current:not(.stacked)');
          previousNavbar = $navbarEl.find('.navbar-previous:not(.stacked)');
        } else {
          currentNavbar = currentPage.children('.navbar').children('.navbar-inner');
          previousNavbar = previousPage.children('.navbar').children('.navbar-inner');
        }
        navbarWidth = $navbarEl[0].offsetWidth;
        currentNavElements = currentNavbar.children('.left, .title, .right, .subnavbar, .fading');
        previousNavElements = previousNavbar.children('.left, .title, .right, .subnavbar, .fading');
        if (router.params.iosAnimateNavbarBackIcon) {
          if (currentNavbar.hasClass('sliding')) {
            activeNavBackIcon = currentNavbar.children('.left').find('.back .icon');
            activeNavBackIconText = currentNavbar.children('.left').find('.back span').eq(0);
          } else {
            activeNavBackIcon = currentNavbar.children('.left.sliding').find('.back .icon');
            activeNavBackIconText = currentNavbar.children('.left.sliding').find('.back span').eq(0);
          }
          if (previousNavbar.hasClass('sliding')) {
            previousNavBackIcon = previousNavbar.children('.left').find('.back .icon');
            previousNavBackIconText = previousNavbar.children('left').find('.back span').eq(0);
          } else {
            previousNavBackIcon = previousNavbar.children('.left.sliding').find('.back .icon');
            previousNavBackIconText = previousNavbar.children('.left.sliding').find('.back span').eq(0);
          }
        }
      }

      // Close/Hide Any Picker
      if (dom7$1('.picker.modal-in').length > 0) {
        app.closeModal(dom7$1('.picker.modal-in'));
      }
    }
    e.f7PreventPanelSwipe = true;
    isMoved = true;
    e.preventDefault();

    // RTL inverter
    var inverter = app.rtl ? -1 : 1;

    // Touches diff
    touchesDiff = (pageX - touchesStart.x - router.params.swipeBackPageThreshold) * inverter;
    if (touchesDiff < 0) { touchesDiff = 0; }
    var percentage = touchesDiff / viewContainerWidth;

    // Swipe Back Callback
    var callbackData = {
      percentage: percentage,
      currentPageEl: currentPage[0],
      previousPageEl: previousPage[0],
      currentNavbarEl: currentNavbar[0],
      previousNavbarEl: previousNavbar[0],
    };
    $el.trigger('swipeback:move', callbackData);
    router.emit('swipeBackMove', callbackData);

    // Transform pages
    var currentPageTranslate = touchesDiff * inverter;
    var previousPageTranslate = ((touchesDiff / 5) - (viewContainerWidth / 5)) * inverter;
    if (Device$1.pixelRatio === 1) {
      currentPageTranslate = Math.round(currentPageTranslate);
      previousPageTranslate = Math.round(previousPageTranslate);
    }

    currentPage.transform(("translate3d(" + currentPageTranslate + "px,0,0)"));
    if (router.params.swipeBackPageAnimateShadow) { pageShadow[0].style.opacity = 1 - (1 * percentage); }

    previousPage.transform(("translate3d(" + previousPageTranslate + "px,0,0)"));
    if (router.params.swipeBackPageAnimateOpacity) { pageOpacity[0].style.opacity = 1 - (1 * percentage); }

    // Dynamic Navbars Animation
    if (dynamicNavbar) {
      currentNavElements.each(function (index, navEl) {
        var $navEl = dom7$1(navEl);
        if (!$navEl.is('.subnavbar')) { $navEl[0].style.opacity = (1 - (percentage * 1.3)); }
        if ($navEl[0].className.indexOf('sliding') >= 0 || currentNavbar.hasClass('sliding')) {
          var activeNavTranslate = percentage * $navEl[0].f7NavbarRightOffset;
          if (Device$1.pixelRatio === 1) { activeNavTranslate = Math.round(activeNavTranslate); }
          $navEl.transform(("translate3d(" + activeNavTranslate + "px,0,0)"));
          if (router.params.iosAnimateNavbarBackIcon) {
            if ($navEl[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
              var iconTranslate = -activeNavTranslate;
              if (!separateNavbar) {
                iconTranslate -= navbarWidth * percentage;
              }
              activeNavBackIcon.transform(("translate3d(" + iconTranslate + "px,0,0)"));
            }
          }
        }
      });
      previousNavElements.each(function (index, navEl) {
        var $navEl = dom7$1(navEl);
        if (!$navEl.is('.subnavbar')) { $navEl[0].style.opacity = (percentage * 1.3) - 0.3; }
        if ($navEl[0].className.indexOf('sliding') >= 0 || previousNavbar.hasClass('sliding')) {
          var previousNavTranslate = $navEl[0].f7NavbarLeftOffset * (1 - percentage);
          if ($navEl[0].className.indexOf('title') >= 0 && activeNavBackIcon && activeNavBackIcon.length && activeNavBackIconText.length) {
            previousNavTranslate = ($navEl[0].f7NavbarLeftOffset + activeNavBackIconText[0].offsetLeft) * (1 - percentage);
          } else {
            previousNavTranslate = $navEl[0].f7NavbarLeftOffset * (1 - percentage);
          }
          if (Device$1.pixelRatio === 1) { previousNavTranslate = Math.round(previousNavTranslate); }
          $navEl.transform(("translate3d(" + previousNavTranslate + "px,0,0)"));
          if (router.params.iosAnimateNavbarBackIcon) {
            if ($navEl[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
              var iconTranslate = -previousNavTranslate;
              if (!separateNavbar) {
                iconTranslate += (navbarWidth / 5) * (1 - percentage);
              }
              previousNavBackIcon.transform(("translate3d(" + iconTranslate + "px,0,0)"));
            }
          }
        }
      });
    }
  }
  function handleTouchEnd() {
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    if (touchesDiff === 0) {
      dom7$1([currentPage[0], previousPage[0]]).transform('');
      if (dynamicNavbar) {
        currentNavElements.transform('').css({ opacity: '' });
        previousNavElements.transform('').css({ opacity: '' });
        if (activeNavBackIcon && activeNavBackIcon.length > 0) { activeNavBackIcon.transform(''); }
        if (previousNavBackIcon && activeNavBackIcon.length > 0) { previousNavBackIcon.transform(''); }
      }
      return;
    }
    var timeDiff = (new Date()).getTime() - touchStartTime;
    var pageChanged = false;
    // Swipe back to previous page
    if (
        (timeDiff < 300 && touchesDiff > 10) ||
        (timeDiff >= 300 && touchesDiff > viewContainerWidth / 2)
      ) {
      currentPage.removeClass('page-current').addClass('page-next');
      previousPage.removeClass('page-previous').addClass('page-current');
      if (pageShadow) { pageShadow[0].style.opacity = ''; }
      if (pageOpacity) { pageOpacity[0].style.opacity = ''; }
      if (dynamicNavbar) {
        currentNavbar.removeClass('navbar-current').addClass('navbar-next');
        previousNavbar.removeClass('navbar-previous').addClass('navbar-current');
      }
      pageChanged = true;
    }
    // Reset custom styles
    // Add transitioning class for transition-duration
    dom7$1([currentPage[0], previousPage[0]]).addClass('page-transitioning').transform('');
    if (dynamicNavbar) {
      currentNavElements.css({ opacity: '' })
        .each(function (navElIndex, navEl) {
          var translate = pageChanged ? navEl.f7NavbarRightOffset : 0;
          var sliding = dom7$1(navEl);
          var iconTranslate = pageChanged ? -translate : 0;
          if (!separateNavbar && pageChanged) { iconTranslate -= navbarWidth; }
          sliding.transform(("translate3d(" + translate + "px,0,0)"));
          if (router.params.iosAnimateNavbarBackIcon) {
            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
              activeNavBackIcon.addClass('navbar-transitioning').transform(("translate3d(" + iconTranslate + "px,0,0)"));
            }
          }
        }).addClass('navbar-transitioning');

      previousNavElements.transform('').css({ opacity: '' }).each(function (navElIndex, navEl) {
        var translate = pageChanged ? 0 : navEl.f7NavbarLeftOffset;
        var sliding = dom7$1(navEl);
        var iconTranslate = pageChanged ? 0 : -translate;
        if (!separateNavbar && !pageChanged) { iconTranslate += navbarWidth / 5; }
        sliding.transform(("translate3d(" + translate + "px,0,0)"));
        if (router.params.iosAnimateNavbarBackIcon) {
          if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
            previousNavBackIcon.addClass('navbar-transitioning').transform(("translate3d(" + iconTranslate + "px,0,0)"));
          }
        }
      }).addClass('navbar-transitioning');
    }
    allowViewTouchMove = false;
    router.allowPageChange = false;

    // Swipe Back Callback
    var callbackData = {
      currentPage: currentPage[0],
      previousPage: previousPage[0],
      currentNavbar: currentNavbar[0],
      previousNavbar: previousNavbar[0],
    };

    if (pageChanged) {
      // Update Route
      router.currentRoute = previousPage[0].f7Page.route;
      router.currentPage = previousPage[0];

      // Page before animation callback
      router.pageCallback('beforeOut', currentPage, currentNavbar, 'current', 'next', { route: currentPage[0].f7Page.route });
      router.pageCallback('beforeIn', previousPage, previousNavbar, 'previous', 'current', { route: previousPage[0].f7Page.route });

      $el.trigger('swipeback:beforechange', callbackData);
      router.emit('swipeBackBeforeChange', callbackData);
    } else {
      $el.trigger('swipeback:beforereset', callbackData);
      router.emit('swipeBackBeforeReset', callbackData);
    }

    currentPage.transitionEnd(function () {
      dom7$1([currentPage[0], previousPage[0]]).removeClass('page-transitioning');
      if (dynamicNavbar) {
        currentNavElements.removeClass('navbar-transitioning').css({ opacity: '' }).transform('');
        previousNavElements.removeClass('navbar-transitioning').css({ opacity: '' }).transform('');
        if (activeNavBackIcon && activeNavBackIcon.length > 0) { activeNavBackIcon.removeClass('navbar-transitioning'); }
        if (previousNavBackIcon && previousNavBackIcon.length > 0) { previousNavBackIcon.removeClass('navbar-transitioning'); }
      }
      allowViewTouchMove = true;
      router.allowPageChange = true;
      if (pageChanged) {
        // Update History
        if (router.history.length === 1) {
          router.history.unshift(router.url);
        }
        router.history.pop();
        router.saveHistory();

        // Update push state
        if (router.params.pushState) {
          History.back();
        }

        // Page after animation callback
        router.pageCallback('afterOut', currentPage, currentNavbar, 'current', 'next', { route: currentPage[0].f7Page.route });
        router.pageCallback('afterIn', previousPage, previousNavbar, 'previous', 'current', { route: previousPage[0].f7Page.route });

        // Remove Old Page
        if (router.params.stackPages && router.initialPages.indexOf(currentPage[0]) >= 0) {
          currentPage.addClass('stacked');
          if (separateNavbar) {
            currentNavbar.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', currentPage, currentNavbar, 'next');
          router.removeEl(currentPage);
          if (separateNavbar) {
            router.removeEl(currentNavbar);
          }
        }

        $el.trigger('swipeback:afterchange', callbackData);
        router.emit('swipeBackAfterChange', callbackData);

        router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

        if (router.params.preloadPreviousPage) {
          router.back(router.history[router.history.length - 2], { preload: true });
        }
      } else {
        $el.trigger('swipeback:afterreset', callbackData);
        router.emit('swipeBackAfterReset', callbackData);
      }
      if (pageShadow && pageShadow.length > 0) { pageShadow.remove(); }
      if (pageOpacity && pageOpacity.length > 0) { pageOpacity.remove(); }
    });
  }

  function attachEvents() {
    var passiveListener = (app.touchEvents.start === 'touchstart' && Support$1.passiveListener) ? { passive: true, capture: false } : false;
    var activeListener = Support$1.passiveListener ? { passive: false, capture: false } : false;
    $el.on(app.touchEvents.start, handleTouchStart, passiveListener);
    $el.on(app.touchEvents.move, handleTouchMove, activeListener);
    $el.on(app.touchEvents.end, handleTouchEnd, passiveListener);
  }
  function detachEvents() {
    var passiveListener = (app.touchEvents.start === 'touchstart' && Support$1.passiveListener) ? { passive: true, capture: false } : false;
    var activeListener = Support$1.passiveListener ? { passive: false, capture: false } : false;
    $el.off(app.touchEvents.start, handleTouchStart, passiveListener);
    $el.off(app.touchEvents.move, handleTouchMove, activeListener);
    $el.off(app.touchEvents.end, handleTouchEnd, passiveListener);
  }

  attachEvents();

  router.on('routerDestroy', detachEvents);
}

function forward(el, forwardOptions) {
  if ( forwardOptions === void 0 ) forwardOptions = {};

  var router = this;
  var app = router.app;
  var view = router.view;

  var options = Utils$1.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    reloadCurrent: router.params.reloadPages,
    on: {},
  }, forwardOptions);

  var dynamicNavbar = router.dynamicNavbar;
  var separateNavbar = router.separateNavbar;

  var $viewEl = router.$el;
  var $newPage = dom7$1(el);
  var reload = options.reloadPrevious || options.reloadCurrent || options.reloadAll;
  var $oldPage;

  var $navbarEl;
  var $newNavbarInner;
  var $oldNavbarInner;

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

  if (dynamicNavbar) {
    $newNavbarInner = $newPage.children('.navbar').children('.navbar-inner');
    if (separateNavbar) {
      $navbarEl = router.$navbarEl;
      if ($newNavbarInner.length > 0) {
        $newPage.children('.navbar').remove();
      }
      if ($newNavbarInner.length === 0 && $newPage[0].f7Page) {
        // Try from pageData
        $newNavbarInner = $newPage[0].f7Page.$navbarEl;
      }
    }
  }

  router.allowPageChange = false;
  if ($newPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // Pages In View
  var $pagesInView = $viewEl
    .children('.page:not(.stacked)')
    .filter(function (index, pageInView) { return pageInView !== $newPage[0]; });

  // Navbars In View
  var $navbarsInView;
  if (separateNavbar) {
    $navbarsInView = $navbarEl
      .children('.navbar-inner:not(.stacked)')
      .filter(function (index, navbarInView) { return navbarInView !== $newNavbarInner[0]; });
  }

  // Exit when reload previous and only 1 page in view so nothing ro reload
  if (options.reloadPrevious && $pagesInView.length < 2) {
    router.allowPageChange = true;
    return router;
  }

  // New Page
  var newPagePosition = 'next';
  if (options.reloadCurrent || options.reloadAll) {
    newPagePosition = 'current';
  } else if (options.reloadPrevious) {
    newPagePosition = 'previous';
  }
  $newPage
    .addClass(("page-" + newPagePosition))
    .removeClass('stacked');

  if (dynamicNavbar && $newNavbarInner.length) {
    $newNavbarInner
      .addClass(("navbar-" + newPagePosition))
      .removeClass('stacked');
  }

  // Find Old Page
  if (options.reloadCurrent) {
    $oldPage = $pagesInView.eq($pagesInView.length - 1);
    if (separateNavbar) {
      // $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 1);
      $oldNavbarInner = app.navbar.getElByPage($oldPage);
    }
  } else if (options.reloadPrevious) {
    $oldPage = $pagesInView.eq($pagesInView.length - 2);
    if (separateNavbar) {
      // $oldNavbarInner = $navbarsInView.eq($pagesInView.length - 2);
      $oldNavbarInner = app.navbar.getElByPage($oldPage);
    }
  } else if (options.reloadAll) {
    $oldPage = $pagesInView.filter(function (index, pageEl) { return pageEl !== $newPage[0]; });
    if (separateNavbar) {
      $oldNavbarInner = $navbarsInView.filter(function (index, navbarEl) { return navbarEl !== $newNavbarInner[0]; });
    }
  } else {
    if ($pagesInView.length > 1) {
      var i = 0;
      for (i = 0; i < $pagesInView.length - 1; i += 1) {
        var oldNavbarInnerEl = app.navbar.getElByPage($pagesInView.eq(i));
        if (router.params.stackPages) {
          $pagesInView.eq(i).addClass('stacked');
          if (separateNavbar) {
            // $navbarsInView.eq(i).addClass('stacked');
            dom7$1(oldNavbarInnerEl).addClass('stacked');
          }
        } else {
          // Page remove event
          router.pageCallback('beforeRemove', $pagesInView[i], $navbarsInView && $navbarsInView[i], 'previous', undefined, options);
          router.removeEl($pagesInView[i]);
          if (separateNavbar && oldNavbarInnerEl) {
            // router.removeEl($navbarsInView[i]);
            router.removeEl(oldNavbarInnerEl);
          }
        }
      }
    }
    $oldPage = $viewEl
      .children('.page:not(.stacked)')
      .filter(function (index, page) { return page !== $newPage[0]; });
    if (separateNavbar) {
      $oldNavbarInner = $navbarEl
        .children('.navbar-inner:not(.stacked)')
        .filter(function (index, navbarInner) { return navbarInner !== $newNavbarInner[0]; });
    }
  }
  if (dynamicNavbar && !separateNavbar) {
    $oldNavbarInner = $oldPage.children('.navbar').children('.navbar-inner');
  }

  // Push State
  if (router.params.pushState && options.pushState && !options.reloadPrevious) {
    var pushStateRoot = router.params.pushStateRoot || '';
    History[options.reloadCurrent || options.reloadAll ? 'replace' : 'push'](
      {
        url: options.route.url,
        viewIndex: view.index,
      },
      pushStateRoot + router.params.pushStateSeparator + options.route.url);
  }

  // Current Route
  router.currentRoute = options.route;

  // Update router history
  var url = options.route.url;
  if (options.history) {
    if (options.reloadCurrent && router.history.length > 0) {
      router.history[router.history.length - (options.reloadPrevious ? 2 : 1)] = url;
    } else if (options.reloadAll) {
      router.history = [url];
    } else {
      router.history.push(url);
    }
  }
  router.saveHistory();

  // Insert new page and navbar
  var newPageInDom = $newPage.parents(document).length > 0;
  var f7Component = $newPage[0].f7Component;
  if (options.reloadPrevious) {
    if (f7Component && !newPageInDom) {
      f7Component.mount(function (componentEl) {
        dom7$1(componentEl).insertBefore($oldPage);
      });
    } else {
      $newPage.insertBefore($oldPage);
    }
    if (separateNavbar && $newNavbarInner.length) {
      if ($oldNavbarInner.length) {
        $newNavbarInner.insertBefore($oldNavbarInner);
      } else {
        $navbarEl.append($newNavbarInner);
      }
    }
  } else if ($oldPage.next('.page')[0] !== $newPage[0]) {
    if (f7Component && !newPageInDom) {
      f7Component.mount(function (componentEl) {
        $viewEl.append(componentEl);
      });
    } else {
      $viewEl.append($newPage[0]);
    }
    if (separateNavbar && $newNavbarInner.length) {
      $navbarEl.append($newNavbarInner[0]);
    }
  }
  if (!newPageInDom) {
    router.pageCallback('mounted', $newPage, $newNavbarInner, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);
  }

  // Remove old page
  if (options.reloadCurrent && $oldPage.length > 0) {
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (separateNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      // Page remove event
      router.pageCallback('beforeRemove', $oldPage, $newNavbarInner, 'previous', undefined, options);
      router.removeEl($oldPage);
      if (separateNavbar && $oldNavbarInner.length) {
        router.removeEl($oldNavbarInner);
      }
    }
  } else if (options.reloadAll) {
    $oldPage.each(function (index, pageEl) {
      var $oldPageEl = dom7$1(pageEl);
      var $oldNavbarInnerEl = dom7$1(app.navbar.getElByPage($oldPageEl));
      if (router.params.stackPages && router.initialPages.indexOf($oldPageEl[0]) >= 0) {
        $oldPageEl.addClass('stacked');
        if (separateNavbar) {
          // $oldNavbarInner.eq(index).addClass('stacked');
          $oldNavbarInnerEl.addClass('stacked');
        }
      } else {
        // Page remove event
        router.pageCallback('beforeRemove', $oldPageEl, $oldNavbarInner && $oldNavbarInner.eq(index), 'previous', undefined, options);
        router.removeEl($oldPageEl);
        if (separateNavbar && $oldNavbarInnerEl.length) {
          // router.removeEl($oldNavbarInner.eq(index));
          router.removeEl($oldNavbarInnerEl);
        }
      }
    });
  }

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(options.route.route.tab, Utils$1.extend({}, options, {
      history: false,
      pushState: false,
    }));
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, newPagePosition, reload ? newPagePosition : 'current', options, $oldPage);

  if (options.reloadCurrent || options.reloadAll) {
    router.allowPageChange = true;
    return router;
  }

  // Before animation event
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'next', 'current', options);
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'previous', options);

  // Animation
  function afterAnimation() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current');
    $oldPage.removeClass(pageClasses).addClass('page-previous');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-previous');
    }
    // After animation event
    router.allowPageChange = true;
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'next', 'current', options);
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'previous', options);

    var removeOldPage = !(router.params.preloadPreviousPage || (router.app.theme === 'ios' && router.params.swipeBackPage));
    if (removeOldPage) {
      if (router.params.stackPages) {
        $oldPage.addClass('stacked');
        if (separateNavbar) {
          $oldNavbarInner.addClass('stacked');
        }
      } else if (!($newPage.attr('data-name') && $newPage.attr('data-name') === 'smart-select-page')) {
        // Remove event
        router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'previous', undefined, options);
        router.removeEl($oldPage);
        if (separateNavbar && $oldNavbarInner.length) {
          router.removeEl($oldNavbarInner);
        }
      }
    }
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    if (router.params.pushState) {
      History.clearRouterQueue();
    }
  }
  function setPositionClasses() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $oldPage.removeClass(pageClasses).addClass('page-current');
    $newPage.removeClass(pageClasses).addClass('page-next');
    if (dynamicNavbar) {
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-next');
    }
  }
  if (options.animate) {
    if (router.app.theme === 'md' && router.params.materialPageLoadDelay) {
      setTimeout(function () {
        setPositionClasses();
        router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'forward', function () {
          afterAnimation();
        });
      }, router.params.materialPageLoadDelay);
    } else {
      setPositionClasses();
      router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'forward', function () {
        afterAnimation();
      });
    }
  } else {
    afterAnimation();
  }
  return router;
}
function load(loadParams, loadOptions, ignorePageChange) {
  if ( loadParams === void 0 ) loadParams = {};
  if ( loadOptions === void 0 ) loadOptions = {};

  var router = this;

  if (!router.allowPageChange && !ignorePageChange) { return router; }
  var params = loadParams;
  var options = loadOptions;
  var url = params.url;
  var content = params.content;
  var el = params.el;
  var name = params.name;
  var template = params.template;
  var templateUrl = params.templateUrl;
  var component = params.component;
  var componentUrl = params.componentUrl;
  var ignoreCache = options.ignoreCache;

  if (options.route.route &&
    options.route.route.parentPath &&
    router.currentRoute.route.parentPath &&
    options.route.route.parentPath === router.currentRoute.route.parentPath) {
    // Do something nested
    if (options.route.url === router.url) { return false; }
    if (options.route.route.tab) {
      return router.tabLoad(options.route.route.tab, options);
    }
    return false;
  }

  if (
    options.route.url &&
    router.url === options.route.url &&
    !(options.reloadCurrent || options.reloadPrevious) &&
    !router.params.allowDuplicateUrls
    ) {
    return false;
  }

  if (!options.route && url) {
    options.route = router.findMatchingRoute(url, true);
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.forward(pageEl, Utils$1.extend(options, newOptions));
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  // Proceed
  if (content) {
    router.forward(router.getPageEl(content), options);
  } else if (template || templateUrl) {
    // Parse template and send page element
    try {
      router.pageTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.forward(router.getPageEl(el), options);
  } else if (name) {
    // Load page by page name in pages container
    router.forward(router.$el.children((".page[data-name=\"" + name + "\"]")).eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.pageComponentLoader(router.el, component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, ignoreCache)
      .then(function (pageContent) {
        router.forward(router.getPageEl(pageContent), options);
      })
      .catch(function () {
        router.allowPageChange = true;
      });
  }
  return router;
}
function navigate(url, navigateOptions) {
  if ( navigateOptions === void 0 ) navigateOptions = {};

  var router = this;
  var app = router.app;
  if (!router.view) {
    app.views.main.router.navigate(url, navigateOptions);
    return router;
  }
  if (url === '#' || url === '') {
    return router;
  }

  var navigateUrl = url.replace('./', '');
  if (navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    var currentPath = router.currentRoute.route.parentPath || router.currentRoute.path;
    navigateUrl = ((currentPath || '/') + navigateUrl).replace('//', '/');
  }
  var route;
  if (navigateOptions.createRoute) {
    route = Utils$1.extend(router.findMatchingRoute(navigateUrl, true), {
      route: Utils$1.extend({}, navigateOptions.createRoute),
    });
  } else {
    route = router.findMatchingRoute(navigateUrl);
  }

  if (!route) {
    return router;
  }
  var options = {};
  if (route.route.options) {
    Utils$1.extend(options, route.route.options, navigateOptions, { route: route });
  } else {
    Utils$1.extend(options, navigateOptions, { route: route });
  }
  ('popup popover sheet loginScreen actions').split(' ').forEach(function (modalLoadProp) {
    if (route.route[modalLoadProp]) {
      router.modalLoad(modalLoadProp, route, options);
    }
  });
  ('url content name el component componentUrl template templateUrl').split(' ').forEach(function (pageLoadProp) {
    if (route.route[pageLoadProp]) {
      router.load(( obj = {}, obj[pageLoadProp] = route.route[pageLoadProp], obj ), options);
      var obj;
    }
  });
  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    router.allowPageChange = false;
    router.load(resolveParams, Utils$1.extend(options, resolveOptions), true);
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (route.route.async) {
    router.allowPageChange = false;

    route.route.async(asyncResolve, asyncReject);
  }
  // Retur Router
  return router;
}

function tabLoad(tabRoute, loadOptions) {
  if ( loadOptions === void 0 ) loadOptions = {};

  var router = this;
  var options = Utils$1.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    on: {},
  }, loadOptions);

  var ignoreCache = options.ignoreCache;
  if (options.route) {
    // Set Route
    if (options.route !== router.currentRoute) {
      router.currentRoute = options.route;
    }

    // Update Browser History
    if (router.params.pushState && options.pushState && !options.reloadPrevious) {
      History.replace(
        {
          url: options.route.url,
          viewIndex: router.view.index,
        },
        (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url);
    }

    // Update Router History
    if (options.history) {
      router.history[router.history.length - 1] = options.route.url;
      router.saveHistory();
    }
  }

  // Show Tab
  var ref = router.app.tab.show(("#" + (tabRoute.id)), options.animate, options.route);
  var $newTabEl = ref.$newTabEl;
  var $oldTabEl = ref.$oldTabEl;

  // Load Tab Content
  var url = tabRoute.url;
  var content = tabRoute.content;
  var el = tabRoute.el;
  var template = tabRoute.template;
  var templateUrl = tabRoute.templateUrl;
  var component = tabRoute.component;
  var componentUrl = tabRoute.componentUrl;

  function onTabLoaded() {
    // Remove theme elements
    router.removeThemeElements($newTabEl);

    $newTabEl.trigger('tab:init tab:mounted', tabRoute);
    router.emit('tabInit tabMounted', $newTabEl[0], tabRoute);
    if ($oldTabEl) {
      router.tabRemove($oldTabEl, $newTabEl, tabRoute);
    }
  }

  // Component/Template Callbacks
  function resolve(contentEl) {
    if (contentEl) {
      if (typeof contentEl === 'string') {
        $newTabEl.html(contentEl);
      } else {
        $newTabEl.html('');
        if (contentEl.f7Component) {
          contentEl.f7Component.mount(function (componentEl) {
            $newTabEl.append(componentEl);
          });
        } else {
          $newTabEl.append(contentEl);
        }
      }
      onTabLoaded();
    }
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (content) {
    $newTabEl.html(content);
    onTabLoaded();
  } else if (template || templateUrl) {
    try {
      router.tabTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    $newTabEl.html('');
    $newTabEl.append(el);
    onTabLoaded();
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.tabComponentLoader($newTabEl[0], component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, ignoreCache)
      .then(function (tabContent) {
        $newTabEl.html(tabContent);
        onTabLoaded();
      })
      .catch(function () {
        router.allowPageChange = true;
      });
  }
}
function tabRemove($oldTabEl, $newTabEl, tabRoute) {
  var router = this;
  $oldTabEl.trigger('tab:beforeremove', tabRoute);
  router.emit('tabBeforeRemove', $oldTabEl[0], $newTabEl[0], tabRoute);
  $oldTabEl.children().each(function (index, tabChild) {
    if (tabChild.f7Component) {
      tabChild.f7Component.destroy();
    }
  });
  $oldTabEl.html('');
}

function modalLoad(modalType, route, loadOptions) {
  if ( loadOptions === void 0 ) loadOptions = {};

  var router = this;
  var app = router.app;
  var options = Utils$1.extend({
    animate: router.params.animate,
    pushState: true,
    history: true,
    on: {},
  }, loadOptions);

  var modalParams = route.route[modalType];
  var modalRoute = route.route;

  var ignoreCache = options.ignoreCache;

  // Load Modal Props
  var url = modalParams.url;
  var template = modalParams.template;
  var templateUrl = modalParams.templateUrl;
  var component = modalParams.component;
  var componentUrl = modalParams.componentUrl;

  function onModalLoaded() {
    // Create Modal
    var modal = app[modalType].create(modalParams);
    modalRoute.modalInstance = modal;

    function closeOnSwipeBack() {
      modal.close();
    }
    modal.on('modalOpen', function () {
      router.once('swipeBackMove', closeOnSwipeBack);
    });
    modal.on('modalClose', function () {
      router.off('swipeBackMove', closeOnSwipeBack);
      if (!modal.closeByRouter) {
        router.back();
      }
    });

    modal.on('modalClosed', function () {
      modal.$el.trigger(((modalType.toLowerCase()) + ":beforeremove"), route, modal);
      modal.emit((modalType + "BeforeRemove"), modal.el, route, modal);
      if (modal.el.f7Component) {
        modal.el.f7Component.destroy();
      }
      Utils$1.nextTick(function () {
        modal.destroy();
        delete modalRoute.modalInstance;
      });
    });

    if (options.route) {
      // Update Browser History
      if (router.params.pushState && options.pushState) {
        History.push(
          {
            url: options.route.url,
            viewIndex: router.view.index,
            modal: modalType,
          },
          (router.params.pushStateRoot || '') + router.params.pushStateSeparator + options.route.url);
      }

      // Set Route
      if (options.route !== router.currentRoute) {
        router.currentRoute = Utils$1.extend(options.route, { modal: modal });
      }

      // Update Router History
      if (options.history) {
        router.history.push(options.route.url);
        router.saveHistory();
      }
    }

    // Remove theme elements
    router.removeThemeElements(modal.el);

    // Emit events
    modal.$el.trigger(((modalType.toLowerCase()) + ":init " + (modalType.toLowerCase()) + ":mounted"), route, modal);
    router.emit((modalType + "Init " + modalType + "Mounted"), modal.el, route, modal);
    // Open
    modal.open();
  }

  // Component/Template Callbacks
  function resolve(contentEl) {
    if (contentEl) {
      if (typeof contentEl === 'string') {
        modalParams.content = contentEl;
      } else if (contentEl.f7Component) {
        contentEl.f7Component.mount(function (componentEl) {
          modalParams.el = componentEl;
          app.root.append(componentEl);
        });
      } else {
        modalParams.el = contentEl;
      }
      onModalLoaded();
    }
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  if (template || templateUrl) {
    try {
      router.modalTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.modalComponentLoader(app.root[0], component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, ignoreCache)
      .then(function (modalContent) {
        modalParams.content = modalContent;
        onModalLoaded();
      })
      .catch(function () {
        router.allowPageChange = true;
      });
  } else {
    onModalLoaded();
  }
}
function modalRemove(modal) {
  Utils$1.extend(modal, { closeByRouter: true });
  modal.close();
}

function backward(el, backwardOptions) {
  var router = this;
  var app = router.app;
  var view = router.view;

  var options = Utils$1.extend({
    animate: router.params.animate,
    pushState: true,
  }, backwardOptions);

  var dynamicNavbar = router.dynamicNavbar;
  var separateNavbar = router.separateNavbar;

  var $newPage = dom7$1(el);
  var $oldPage = router.$el.children('.page-current');

  if ($newPage.length) {
    // Remove theme elements
    router.removeThemeElements($newPage);
  }

  var $navbarEl;
  var $newNavbarInner;
  var $oldNavbarInner;

  if (dynamicNavbar) {
    $newNavbarInner = $newPage.children('.navbar').children('.navbar-inner');
    if (separateNavbar) {
      $navbarEl = router.$navbarEl;
      if ($newNavbarInner.length > 0) {
        $newPage.children('.navbar').remove();
      }
      if ($newNavbarInner.length === 0 && $newPage[0].f7Page) {
        // Try from pageData
        $newNavbarInner = $newPage[0].f7Page.$navbarEl;
      }
      $oldNavbarInner = $navbarEl.find('.navbar-current');
    } else {
      $oldNavbarInner = $oldPage.children('.navbar').children('.navbar-inner');
    }
  }

  router.allowPageChange = false;
  if ($newPage.length === 0 || $oldPage.length === 0) {
    router.allowPageChange = true;
    return router;
  }

  // Remove theme elements
  router.removeThemeElements($newPage);

  // New Page
  $newPage
    .addClass('page-previous')
    .removeClass('stacked');

  if (dynamicNavbar && $newNavbarInner.length > 0) {
    $newNavbarInner
      .addClass('navbar-previous')
      .removeClass('stacked');
  }


  // Remove previous page in case of "forced"
  var backIndex;
  if (options.force) {
    if ($oldPage.prev('.page-previous:not(.stacked)').length > 0 || $oldPage.prev('.page-previous').length === 0) {
      if (router.history.indexOf(options.route.url) >= 0) {
        backIndex = router.history.length - router.history.indexOf(options.route.url) - 1;
        router.history = router.history.slice(0, router.history.indexOf(options.route.url) + 2);
        view.history = router.history;
      } else {
        if (router.history[[router.history.length - 2]]) {
          router.history[router.history.length - 2] = options.route.url;
        } else {
          router.history.unshift(router.url);
        }
      }

      if (backIndex && router.params.stackPages) {
        $oldPage.prevAll('.page-previous').each(function (index, pageToRemove) {
          var $pageToRemove = dom7$1(pageToRemove);
          var $navbarToRemove;
          if (separateNavbar) {
            // $navbarToRemove = $oldNavbarInner.prevAll('.navbar-previous').eq(index);
            $navbarToRemove = dom7$1(app.navbar.getElByPage($pageToRemove));
          }
          if ($pageToRemove[0] !== $newPage[0] && $pageToRemove.index() > $newPage.index()) {
            if (router.initialPages.indexOf($pageToRemove[0]) >= 0) {
              $pageToRemove.addClass('stacked');
              if (separateNavbar) {
                $navbarToRemove.addClass('stacked');
              }
            } else {
              router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
              router.removeEl($pageToRemove);
              if (separateNavbar && $navbarToRemove.length > 0) {
                router.removeEl($navbarToRemove);
              }
            }
          }
        });
      } else {
        var $pageToRemove = $oldPage.prev('.page-previous:not(.stacked)');
        var $navbarToRemove;
        if (separateNavbar) {
          // $navbarToRemove = $oldNavbarInner.prev('.navbar-inner:not(.stacked)');
          $navbarToRemove = dom7$1(app.navbar.getElByPage($pageToRemove));
        }
        if (router.params.stackPages && router.initialPages.indexOf($pageToRemove[0]) >= 0) {
          $pageToRemove.addClass('stacked');
          $navbarToRemove.addClass('stacked');
        } else if ($pageToRemove.length > 0) {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined, options);
          router.removeEl($pageToRemove);
          if (separateNavbar && $navbarToRemove.length) {
            router.removeEl($navbarToRemove);
          }
        }
      }
    }
  }

  // Insert new page
  var newPageInDom = $newPage.parents(document).length > 0;
  var f7Component = $newPage[0].f7Component;

  function insertPage() {
    if ($newPage.next($oldPage).length === 0) {
      if (!newPageInDom && f7Component) {
        f7Component.mount(function (componentEl) {
          dom7$1(componentEl).insertBefore($oldPage);
        });
      } else {
        $newPage.insertBefore($oldPage);
      }
    }
    if (separateNavbar && $newNavbarInner.length) {
      $newNavbarInner.insertBefore($oldNavbarInner);
      if ($oldNavbarInner.length > 0) {
        $newNavbarInner.insertBefore($oldNavbarInner);
      } else {
        $navbarEl.append($newNavbarInner);
      }
    }
    if (!newPageInDom) {
      router.pageCallback('mounted', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
    }
  }

  if (options.preload) {
    // Insert Page
    insertPage();
    // Page init and before init events
    router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', options, $oldPage);
    if ($newPage.prevAll('.page-previous:not(.stacked)').length > 0) {
      $newPage.prevAll('.page-previous:not(.stacked)').each(function (index, pageToRemove) {
        var $pageToRemove = dom7$1(pageToRemove);
        var $navbarToRemove;
        if (separateNavbar) {
          // $navbarToRemove = $newNavbarInner.prevAll('.navbar-previous:not(.stacked)').eq(index);
          $navbarToRemove = dom7$1(app.navbar.getElByPage($pageToRemove));
        }
        if (router.params.stackPages && router.initialPages.indexOf(pageToRemove) >= 0) {
          $pageToRemove.addClass('stacked');
          if (separateNavbar) {
            $navbarToRemove.addClass('stacked');
          }
        } else {
          router.pageCallback('beforeRemove', $pageToRemove, $navbarToRemove, 'previous', undefined);
          router.removeEl($pageToRemove);
          if (separateNavbar && $navbarToRemove.length) {
            router.removeEl($navbarToRemove);
          }
        }
      });
    }
    router.allowPageChange = true;
    return router;
  }

  // History State
  if (router.params.pushState && options.pushState) {
    if (backIndex) { History.go(-backIndex); }
    else { History.back(); }
  }

  // Update History
  if (router.history.length === 1) {
    router.history.unshift(router.url);
  }
  router.history.pop();
  router.saveHistory();

  // Current Route
  router.currentRoute = options.route;

  // Insert Page
  insertPage();

  // Load Tab
  if (options.route.route.tab) {
    router.tabLoad(options.route.route.tab, Utils$1.extend({}, options, {
      history: false,
      pushState: false,
    }));
  }

  // Page init and before init events
  router.pageCallback('init', $newPage, $newNavbarInner, 'previous', 'current', $oldPage);

  // Before animation callback
  router.pageCallback('beforeIn', $newPage, $newNavbarInner, 'previous', 'current');
  router.pageCallback('beforeOut', $oldPage, $oldNavbarInner, 'current', 'next');

  // Animation
  function afterAnimation() {
    // Set classes
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $newPage.removeClass(pageClasses).addClass('page-current');
    $oldPage.removeClass(pageClasses).addClass('page-next');
    if (dynamicNavbar) {
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-next');
    }

    // After animation event
    router.pageCallback('afterIn', $newPage, $newNavbarInner, 'previous', 'current');
    router.pageCallback('afterOut', $oldPage, $oldNavbarInner, 'current', 'next');

    // Remove Old Page
    if (router.params.stackPages && router.initialPages.indexOf($oldPage[0]) >= 0) {
      $oldPage.addClass('stacked');
      if (separateNavbar) {
        $oldNavbarInner.addClass('stacked');
      }
    } else {
      router.pageCallback('beforeRemove', $oldPage, $oldNavbarInner, 'next', undefined);
      router.removeEl($oldPage);
      if (separateNavbar && $oldNavbarInner.length) {
        router.removeEl($oldNavbarInner);
      }
    }

    router.allowPageChange = true;
    router.emit('routeChanged', router.currentRoute, router.previousRoute, router);

    // Preload previous page
    if (router.params.preloadPreviousPage) {
      router.back(router.history[router.history.length - 2], { preload: true });
    }
    if (router.params.pushState) {
      History.clearRouterQueue();
    }
  }

  function setPositionClasses() {
    var pageClasses = 'page-previous page-current page-next';
    var navbarClasses = 'navbar-previous navbar-current navbar-next';
    $oldPage.removeClass(pageClasses).addClass('page-current');
    $newPage.removeClass(pageClasses).addClass('page-previous');
    if (dynamicNavbar) {
      $oldNavbarInner.removeClass(navbarClasses).addClass('navbar-current');
      $newNavbarInner.removeClass(navbarClasses).addClass('navbar-previous');
    }
  }

  if (options.animate) {
    setPositionClasses();
    router.animate($oldPage, $newPage, $oldNavbarInner, $newNavbarInner, 'backward', function () {
      afterAnimation();
    });
  } else {
    afterAnimation();
  }

  return router;
}
function loadBack(backParams, backOptions, ignorePageChange) {
  var router = this;

  if (!router.allowPageChange && !ignorePageChange) { return router; }
  var params = backParams;
  var options = backOptions;
  var url = params.url;
  var content = params.content;
  var el = params.el;
  var name = params.name;
  var template = params.template;
  var templateUrl = params.templateUrl;
  var component = params.component;
  var componentUrl = params.componentUrl;
  var ignoreCache = options.ignoreCache;

  if (
    options.route.url &&
    router.url === options.route.url &&
    !(options.reloadCurrent || options.reloadPrevious) &&
    !router.params.allowDuplicateUrls
    ) {
    return false;
  }

  if (!options.route && url) {
    options.route = router.findMatchingRoute(url, true);
  }

  // Component Callbacks
  function resolve(pageEl, newOptions) {
    return router.backward(pageEl, Utils$1.extend(options, newOptions));
  }
  function reject() {
    router.allowPageChange = true;
    return router;
  }

  // Proceed
  if (content) {
    router.backward(router.getPageEl(content), options);
  } else if (template || templateUrl) {
    // Parse template and send page element
    try {
      router.pageTemplateLoader(template, templateUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (el) {
    // Load page from specified HTMLElement or by page name in pages container
    router.backward(router.getPageEl(el), options);
  } else if (name) {
    // Load page by page name in pages container
    router.backward(router.$el.children((".page[data-name=\"" + name + "\"]")).eq(0), options);
  } else if (component || componentUrl) {
    // Load from component (F7/Vue/React/...)
    try {
      router.pageComponentLoader(router.el, component, componentUrl, options, resolve, reject);
    } catch (err) {
      router.allowPageChange = true;
      throw err;
    }
  } else if (url) {
    // Load using XHR
    if (router.xhr) {
      router.xhr.abort();
      router.xhr = false;
    }
    router.xhrRequest(url, ignoreCache)
      .then(function (pageContent) {
        router.backward(router.getPageEl(pageContent), options);
      })
      .catch(function () {
        router.allowPageChange = true;
      });
  }
  return router;
}
function back() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var navigateUrl;
  var navigateOptions;
  if (typeof args[0] === 'object') {
    navigateOptions = args[0] || {};
  } else {
    navigateUrl = args[0];
    navigateOptions = args[1] || {};
  }

  var router = this;
  var app = router.app;
  if (!router.view) {
    app.views.main.router.back(navigateUrl, navigateOptions);
    return router;
  }

  var currentRouteIsModal = router.currentRoute.modal;
  var modalType;
  if (!currentRouteIsModal) {
    ('popup popover sheet loginScreen actions').split(' ').forEach(function (modalLoadProp) {
      if (router.currentRoute.route[modalLoadProp]) {
        currentRouteIsModal = true;
        modalType = modalLoadProp;
      }
    });
  }
  if (currentRouteIsModal) {
    var modalToClose = router.currentRoute.modal ||
                         router.currentRoute.route.modalInstance ||
                         app[modalType].get();
    var previousUrl = router.history[router.history.length - 2];
    var previousRoute = router.findMatchingRoute(previousUrl);
    if (!previousRoute || !modalToClose) {
      return router;
    }
    if (router.params.pushState && navigateOptions.pushState !== false) {
      History.back();
    }
    router.currentRoute = previousRoute;
    router.history.pop();
    router.saveHistory();
    router.modalRemove(modalToClose);
    return router;
  }
  var $previousPage = router.$el.children('.page-current').prevAll('.page-previous').eq(0);
  if (!navigateOptions.force && $previousPage.length > 0) {
    if (router.params.pushState && $previousPage[0].f7Page && router.history[router.history.length - 2] !== $previousPage[0].f7Page.route.url) {
      router.back(router.history[router.history.length - 2], Utils$1.extend(navigateOptions, { force: true }));
      return router;
    }
    router.loadBack({ el: $previousPage }, Utils$1.extend(navigateOptions, {
      route: $previousPage[0].f7Page.route,
    }));
    return router;
  }

  // Navigate URL
  if (navigateUrl === '#') {
    navigateUrl = undefined;
  }
  if (navigateUrl && navigateUrl[0] !== '/' && navigateUrl.indexOf('#') !== 0) {
    navigateUrl = ((router.path || '/') + navigateUrl).replace('//', '/');
  }
  if (!navigateUrl && router.history.length > 1) {
    navigateUrl = router.history[router.history.length - 2];
  }

  // Find route to load
  var route = router.findMatchingRoute(navigateUrl);

  if (!route) {
    if (navigateUrl) {
      route = {
        url: navigateUrl,
        path: navigateUrl.split('?')[0],
        query: Utils$1.parseUrlQuery(navigateUrl),
        route: {
          path: navigateUrl.split('?')[0],
          url: navigateUrl,
        },
      };
    }
  }
  if (!route) {
    return router;
  }
  var options = {};
  if (route.route.options) {
    Utils$1.extend(options, route.route.options, navigateOptions, { route: route });
  } else {
    Utils$1.extend(options, navigateOptions, { route: route });
  }

  if (options.force && router.params.stackPages) {
    router.$el.children('.page-previous.stacked').each(function (index, pageEl) {
      if (pageEl.f7Page && pageEl.f7Page.route && pageEl.f7Page.route.url === route.url) {
        router.loadBack({ el: pageEl }, options);
      }
    });
  }

  ('url content name el component componentUrl template templateUrl').split(' ').forEach(function (pageLoadProp) {
    if (route.route[pageLoadProp]) {
      router.loadBack(( obj = {}, obj[pageLoadProp] = route.route[pageLoadProp], obj ), options);
      var obj;
    }
  });
  // Async
  function asyncResolve(resolveParams, resolveOptions) {
    router.allowPageChange = false;
    router.loadBack(resolveParams, Utils$1.extend(options, resolveOptions), true);
  }
  function asyncReject() {
    router.allowPageChange = true;
  }
  if (route.route.async) {
    router.allowPageChange = false;

    route.route.async(asyncResolve, asyncReject);
  }
  // Return Router
  return router;
}

var Router$1 = (function (Framework7Class$$1) {
  function Router(app, view) {
    Framework7Class$$1.call(this, {}, [typeof view === 'undefined' ? app : view]);
    var router = this;

    // Is App Router
    router.isAppRouter = typeof view === 'undefined';

    if (router.isAppRouter) {
      // App Router
      Utils$1.extend(router, {
        app: app,
        params: app.params.view,
        routes: app.routes || [],
        cache: app.cache,
      });
    } else {
      // View Router
      Utils$1.extend(router, {
        app: app,
        view: view,
        params: view.params,
        routes: view.routes || [],
        $el: view.$el,
        $navbarEl: view.$navbarEl,
        navbarEl: view.navbarEl,
        history: view.history,
        cache: app.cache,
        dynamicNavbar: app.theme === 'ios' && view.params.iosDynamicNavbar,
        separateNavbar: app.theme === 'ios' && view.params.iosDynamicNavbar && view.params.iosSeparateDynamicNavbar,
        initialPages: [],
        initialNavbars: [],
      });
    }

    // Install Modules
    router.useInstanceModules();

    // Temporary Dom
    router.tempDom = document.createElement('div');

    // AllowPageChage
    router.allowPageChange = true;

    // Current Route
    var currentRoute = {};
    var previousRoute = {};
    Object.defineProperty(router, 'currentRoute', {
      enumerable: true,
      configurable: true,
      set: function set(newRoute) {
        if ( newRoute === void 0 ) newRoute = {};

        previousRoute = Utils$1.extend({}, currentRoute);
        currentRoute = newRoute;
        if (!currentRoute) { return; }
        router.url = currentRoute.url;
        router.emit('routeChange', newRoute, previousRoute, router);
      },
      get: function get() {
        return currentRoute;
      },
    });
    Object.defineProperty(router, 'previousRoute', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return previousRoute;
      },
      set: function set(newRoute) {
        previousRoute = newRoute;
      },
    });
    Utils$1.extend(router, {
      // Load
      forward: forward,
      load: load,
      navigate: navigate,
      // Tab
      tabLoad: tabLoad,
      tabRemove: tabRemove,
      // Modal
      modalLoad: modalLoad,
      modalRemove: modalRemove,
      // Back
      backward: backward,
      loadBack: loadBack,
      back: back,
    });

    return router;
  }

  if ( Framework7Class$$1 ) Router.__proto__ = Framework7Class$$1;
  Router.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Router.prototype.constructor = Router;
  Router.prototype.animateWithCSS = function animateWithCSS (oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback) {
    var router = this;
    // Router Animation class
    var routerTransitionClass = "router-transition-" + direction + " router-transition-css-" + direction;

    // AnimationEnd Callback
    (direction === 'forward' ? newPage : oldPage).animationEnd(function () {
      if (router.dynamicNavbar) {
        if (newNavbarInner.hasClass('sliding')) {
          newNavbarInner.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
        } else {
          newNavbarInner.find('.sliding').transform('');
        }
        if (oldNavbarInner.hasClass('sliding')) {
          oldNavbarInner.find('.title, .left, .right, .left .icon, .subnavbar').transform('');
        } else {
          oldNavbarInner.find('.sliding').transform('');
        }
      }
      router.$el.removeClass(routerTransitionClass);
      if (callback) { callback(); }
    });

    function prepareNavbars() {
      var slidingEls;
      if (newNavbarInner.hasClass('sliding')) {
        slidingEls = newNavbarInner.children('.left, .right, .title, .subnavbar');
      } else {
        slidingEls = newNavbarInner.find('.sliding');
      }
      if (!slidingEls) { return; }
      var navbarWidth;
      if (!router.separateNavbar) {
        navbarWidth = newNavbarInner[0].offsetWidth;
      }

      var oldNavbarTitleEl;
      if (oldNavbarInner.children('.title.sliding').length > 0) {
        oldNavbarTitleEl = oldNavbarInner.children('.title.sliding');
      } else {
        oldNavbarTitleEl = oldNavbarInner.hasClass('sliding') && oldNavbarInner.children('.title');
      }

      slidingEls.each(function (index, slidingEl) {
        var $slidingEl = dom7$1(slidingEl);
        var slidingOffset = direction === 'forward' ? slidingEl.f7NavbarRightOffset : slidingEl.f7NavbarLeftOffset;
        if (router.params.iosAnimateNavbarBackIcon && $slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
          var iconSlidingOffset = -slidingOffset;
          var iconTextEl = $slidingEl.find('.back span').eq(0);
          if (!router.separateNavbar) {
            if (direction === 'forward') {
              iconSlidingOffset -= navbarWidth;
            } else {
              iconSlidingOffset += navbarWidth / 5;
            }
          }
          $slidingEl.find('.back .icon').transform(("translate3d(" + iconSlidingOffset + "px,0,0)"));
          if (oldNavbarTitleEl && iconTextEl.length > 0) {
            oldNavbarTitleEl[0].f7NavbarLeftOffset += iconTextEl[0].offsetLeft;
          }
        }
        $slidingEl.transform(("translate3d(" + slidingOffset + "px,0,0)"));
      });
    }
    function animateNavbars() {
      var animateIcon = router.params.iosAnimateNavbarBackIcon;

      var navbarIconOffset = 0;
      var oldNavbarWidth;
      if (!router.separateNavbar && animateIcon) {
        oldNavbarWidth = oldNavbarInner[0].offsetWidth;
        if (direction === 'forward') {
          navbarIconOffset = oldNavbarWidth / 5;
        } else {
          navbarIconOffset = -oldNavbarWidth;
        }
      }

      // Old Navbar Sliding
      var oldNavbarSlidingEls;
      if (oldNavbarInner.hasClass('sliding')) {
        oldNavbarSlidingEls = oldNavbarInner.children('.left, .right, .title, .subnavbar');
      } else {
        oldNavbarSlidingEls = oldNavbarInner.find('.sliding');
      }

      if (oldNavbarSlidingEls) {
        oldNavbarSlidingEls.each(function (index, slidingEl) {
          var $slidingEl = dom7$1(slidingEl);
          var offset = direction === 'forward' ? slidingEl.f7NavbarLeftOffset : slidingEl.f7NavbarRightOffset;
          $slidingEl.transform(("translate3d(" + offset + "px,0,0)"));
          if (animateIcon) {
            if ($slidingEl.hasClass('left') && $slidingEl.find('.back .icon').length > 0) {
              $slidingEl.find('.back .icon').transform(("translate3d(" + (-offset + navbarIconOffset) + "px,0,0)"));
            }
          }
        });
      }
    }
    if (router.dynamicNavbar) {
      // Prepare Navbars
      prepareNavbars();
      Utils$1.nextTick(function () {
        // Add class, start animation
        animateNavbars();
        router.$el.addClass(routerTransitionClass);
      });
    } else {
      // Add class, start animation
      router.$el.addClass(routerTransitionClass);
    }
  };
  Router.prototype.animateWithJS = function animateWithJS (oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback) {
    var router = this;
    var dynamicNavbar = router.dynamicNavbar;
    var separateNavbar = router.separateNavbar;
    var animateIcon = router.params.iosAnimateNavbarBackIcon;
    var ios = router.app.theme === 'ios';
    var duration = ios ? 400 : 250;
    var routerTransitionClass = "router-transition-" + direction + " router-transition-js-" + direction;

    var startTime = null;
    var done = false;

    var newNavEls;
    var oldNavEls;
    var navbarWidth = 0;

    function animatableNavEl(el, navbarInner) {
      var $el = dom7$1(el);
      var isSliding = $el.hasClass('sliding') || navbarInner.hasClass('sliding');
      var isSubnavbar = $el.hasClass('subnavbar');
      var needsOpacityTransition = isSliding ? !isSubnavbar : true;
      var hasIcon = isSliding && animateIcon && $el.hasClass('left') && $el.find('.back .icon').length > 0;
      var $iconEl;
      if (hasIcon) { $iconEl = $el.find('.back .icon'); }
      return {
        $el: $el,
        $iconEl: $iconEl,
        hasIcon: hasIcon,
        leftOffset: $el[0].f7NavbarLeftOffset,
        rightOffset: $el[0].f7NavbarRightOffset,
        isSliding: isSliding,
        isSubnavbar: isSubnavbar,
        needsOpacityTransition: needsOpacityTransition,
      };
    }
    if (dynamicNavbar) {
      newNavEls = [];
      oldNavEls = [];
      newNavbarInner.children('.left, .right, .title, .subnavbar').each(function (index, navEl) {
        newNavEls.push(animatableNavEl(navEl, newNavbarInner));
      });
      oldNavbarInner.children('.left, .right, .title, .subnavbar').each(function (index, navEl) {
        oldNavEls.push(animatableNavEl(navEl, oldNavbarInner));
      });
      if (!separateNavbar) {
        navbarWidth = newNavbarInner[0].offsetWidth;
      }
      [oldNavEls, newNavEls].forEach(function (navEls) {
        navEls.forEach(function (navEl) {
          var n = navEl;
          var isSliding = navEl.isSliding;
          var $el = navEl.$el;
          var otherEls = navEls === oldNavEls ? newNavEls : oldNavEls;
          if (!(isSliding && $el.hasClass('title') && otherEls)) { return; }
          otherEls.forEach(function (otherNavEl) {
            if (otherNavEl.$el.hasClass('left') && otherNavEl.hasIcon) {
              var iconTextEl = otherNavEl.$el.find('.back span')[0];
              n.leftOffset += iconTextEl ? iconTextEl.offsetLeft : 0;
            }
          });
        });
      });
    }

    var $shadowEl;
    var $opacityEl;

    if (ios) {
      $shadowEl = dom7$1('<div class="page-shadow-effect"></div>');
      $opacityEl = dom7$1('<div class="page-opacity-effect"></div>');

      if (direction === 'forward') {
        newPage.append($shadowEl);
        oldPage.append($opacityEl);
      } else {
        newPage.append($opacityEl);
        oldPage.append($shadowEl);
      }
    }
    var easing = Utils$1.bezier(0.25, 0.1, 0.25, 1);

    function onDone() {
      newPage.transform('').css('opacity', '');
      oldPage.transform('').css('opacity', '');
      if (ios) {
        $shadowEl.remove();
        $opacityEl.remove();
        if (dynamicNavbar) {
          newNavEls.forEach(function (navEl) {
            navEl.$el.transform('');
            navEl.$el.css('opacity', '');
          });
          oldNavEls.forEach(function (navEl) {
            navEl.$el.transform('');
            navEl.$el.css('opacity', '');
          });
          newNavEls = [];
          oldNavEls = [];
        }
      }

      router.$el.removeClass(routerTransitionClass);

      if (callback) { callback(); }
    }

    function render() {
      var time = Utils$1.now();
      if (!startTime) { startTime = time; }
      var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      var easeProgress = easing(progress);

      if (progress >= 1) {
        done = true;
      }
      if (ios) {
        if (direction === 'forward') {
          newPage.transform(("translate3d(" + ((1 - easeProgress) * 100) + "%,0,0)"));
          oldPage.transform(("translate3d(" + (-easeProgress * 20) + "%,0,0)"));
          $shadowEl[0].style.opacity = easeProgress;
          $opacityEl[0].style.opacity = easeProgress;
        } else {
          newPage.transform(("translate3d(" + (-(1 - easeProgress) * 20) + "%,0,0)"));
          oldPage.transform(("translate3d(" + (easeProgress * 100) + "%,0,0)"));
          $shadowEl[0].style.opacity = 1 - easeProgress;
          $opacityEl[0].style.opacity = 1 - easeProgress;
        }
        if (dynamicNavbar) {
          newNavEls.forEach(function (navEl) {
            var $el = navEl.$el;
            var offset = direction === 'forward' ? navEl.rightOffset : navEl.leftOffset;
            if (navEl.needsOpacityTransition) {
              $el[0].style.opacity = easeProgress;
            }
            if (navEl.isSliding) {
              $el.transform(("translate3d(" + (offset * (1 - easeProgress)) + "px,0,0)"));
            }
            if (navEl.hasIcon) {
              if (direction === 'forward') {
                navEl.$iconEl.transform(("translate3d(" + ((-offset - navbarWidth) * (1 - easeProgress)) + "px,0,0)"));
              } else {
                navEl.$iconEl.transform(("translate3d(" + ((-offset + (navbarWidth / 5)) * (1 - easeProgress)) + "px,0,0)"));
              }
            }
          });
          oldNavEls.forEach(function (navEl) {
            var $el = navEl.$el;
            var offset = direction === 'forward' ? navEl.leftOffset : navEl.rightOffset;
            if (navEl.needsOpacityTransition) {
              $el[0].style.opacity = (1 - easeProgress);
            }
            if (navEl.isSliding) {
              $el.transform(("translate3d(" + (offset * (easeProgress)) + "px,0,0)"));
            }
            if (navEl.hasIcon) {
              if (direction === 'forward') {
                navEl.$iconEl.transform(("translate3d(" + ((-offset + (navbarWidth / 5)) * (easeProgress)) + "px,0,0)"));
              } else {
                navEl.$iconEl.transform(("translate3d(" + ((-offset - navbarWidth) * (easeProgress)) + "px,0,0)"));
              }
            }
          });
        }
      } else {
        if (direction === 'forward') {
          newPage.transform(("translate3d(0, " + ((1 - easeProgress) * 56) + "px,0)"));
          newPage.css('opacity', easeProgress);
        } else {
          oldPage.transform(("translate3d(0, " + (easeProgress * 56) + "px,0)"));
          oldPage.css('opacity', 1 - easeProgress);
        }
      }

      if (done) {
        onDone();
        return;
      }
      Utils$1.nextFrame(render);
    }

    router.$el.addClass(routerTransitionClass);

    Utils$1.nextFrame(render);
  };
  Router.prototype.animate = function animate () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    // Args: oldPage, newPage, oldNavbarInner, newNavbarInner, direction, callback
    var router = this;
    if (router.params.animateCustom) {
      router.params.animateCustom.apply(router, args);
    } else if (router.params.animateWithJS) {
      router.animateWithJS.apply(router, args);
    } else {
      router.animateWithCSS.apply(router, args);
    }
  };
  Router.prototype.removeEl = function removeEl (el) {
    if (!el) { return; }
    var router = this;
    var $el = dom7$1(el);
    if ($el.length === 0) { return; }
    if ($el[0].f7Component && $el[0].f7Component.destroy) {
      $el[0].f7Component.destroy();
    }
    if (!router.params.removeElements) {
      return;
    }
    if (router.params.removeElementsWithTimeout) {
      setTimeout(function () {
        $el.remove();
      }, router.params.removeElementsTimeout);
    } else {
      $el.remove();
    }
  };
  Router.prototype.getPageEl = function getPageEl (content) {
    var router = this;
    if (typeof content === 'string') {
      router.tempDom.innerHTML = content;
    } else {
      if (dom7$1(content).hasClass('page')) {
        return content;
      }
      router.tempDom.innerHTML = '';
      dom7$1(router.tempDom).append(content);
    }

    return router.findElement('.page', router.tempDom);
  };
  Router.prototype.findElement = function findElement (stringSelector, container, notStacked) {
    var router = this;
    var view = router.view;
    var app = router.app;

    // Modals Selector
    var modalsSelector = '.popup, .dialog, .popover, .actions-modal, .sheet-modal, .login-screen, .page';

    var $container = dom7$1(container);
    var selector = stringSelector;
    if (notStacked) { selector += ':not(.stacked)'; }

    var found = $container
      .find(selector)
      .filter(function (index, el) { return dom7$1(el).parents(modalsSelector).length === 0; });

    if (found.length > 1) {
      if (typeof view.selector === 'string') {
        // Search in related view
        found = $container.find(((view.selector) + " " + selector));
      }
      if (found.length > 1) {
        // Search in main view
        found = $container.find(("." + (app.params.viewMainClass) + " " + selector));
      }
    }
    if (found.length === 1) { return found; }

    // Try to find not stacked
    if (!notStacked) { found = router.findElement(selector, $container, true); }
    if (found && found.length === 1) { return found; }
    if (found && found.length > 1) { return dom7$1(found[0]); }
    return undefined;
  };
  Router.prototype.flattenRoutes = function flattenRoutes (routes) {
    var this$1 = this;
    if ( routes === void 0 ) routes = this.routes;

    var flattenedRoutes = [];
    routes.forEach(function (route) {
      if ('routes' in route) {
        var mergedPathsRoutes = route.routes.map(function (childRoute) {
          var cRoute = Utils$1.extend({}, childRoute);
          cRoute.path = (((route.path) + "/" + (cRoute.path))).replace('///', '/').replace('//', '/');
          return cRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(route, this$1.flattenRoutes(mergedPathsRoutes));
      } else if ('tabs' in route && route.tabs) {
        var mergedPathsRoutes$1 = route.tabs.map(function (tabRoute) {
          var tRoute = Utils$1.extend({}, route, {
            path: (((route.path) + "/" + (tabRoute.path))).replace('///', '/').replace('//', '/'),
            parentPath: route.path,
            tab: tabRoute,
          });
          delete tRoute.tabs;
          return tRoute;
        });
        flattenedRoutes = flattenedRoutes.concat(this$1.flattenRoutes(mergedPathsRoutes$1));
      } else {
        flattenedRoutes.push(route);
      }
    });
    return flattenedRoutes;
  };
  Router.prototype.findMatchingRoute = function findMatchingRoute (url, parseOnly) {
    if (!url) { return undefined; }
    var router = this;
    var routes = router.routes;
    var flattenedRoutes = router.flattenRoutes(routes);
    var query = Utils$1.parseUrlQuery(url);
    var hash = url.split('#')[1];
    var params = {};
    var path = url.split('#')[0].split('?')[0];
    var urlParts = path.split('/').filter(function (part) { return part !== ''; });
    if (parseOnly) {
      return {
        query: query,
        hash: hash,
        params: params,
        url: url,
        path: path,
      };
    }

    var matchingRoute;
    function parseRoute(str) {
      if ( str === void 0 ) str = '';

      var parts = [];
      str.split('/').forEach(function (part) {
        if (part !== '') {
          if (part.indexOf(':') === 0) {
            parts.push({
              name: part.replace(':', ''),
            });
          } else { parts.push(part); }
        }
      });
      return parts;
    }
    flattenedRoutes.forEach(function (route) {
      if (matchingRoute) { return; }
      var parsedRoute = parseRoute(route.path);
      if (parsedRoute.length !== urlParts.length) { return; }
      var matchedParts = 0;
      parsedRoute.forEach(function (routePart, index) {
        if (typeof routePart === 'string' && urlParts[index] === routePart) {
          matchedParts += 1;
        }
        if (typeof routePart === 'object') {
          params[routePart.name] = urlParts[index];
          matchedParts += 1;
        }
      });
      if (matchedParts === urlParts.length) {
        matchingRoute = {
          query: query,
          hash: hash,
          params: params,
          url: url,
          path: path,
          route: route,
        };
      }
    });
    return matchingRoute;
  };
  Router.prototype.removeFromXhrCache = function removeFromXhrCache (url) {
    var router = this;
    var xhrCache = router.cache.xhr;
    var index = false;
    for (var i = 0; i < xhrCache.length; i += 1) {
      if (xhrCache[i].url === url) { index = i; }
    }
    if (index !== false) { xhrCache.splice(index, 1); }
  };
  Router.prototype.xhrRequest = function xhrRequest (requestUrl, ignoreCache) {
    var router = this;
    var params = router.params;
    var url = requestUrl;
    // should we ignore get params or not
    if (params.xhrCacheIgnoreGetParameters && url.indexOf('?') >= 0) {
      url = url.split('?')[0];
    }

    return Utils$1.promise(function (resolve, reject) {
      if (params.xhrCache && !ignoreCache && url.indexOf('nocache') < 0 && params.xhrCacheIgnore.indexOf(url) < 0) {
        for (var i = 0; i < router.cache.xhr.length; i += 1) {
          var cachedUrl = router.cache.xhr[i];
          if (cachedUrl.url === url) {
            // Check expiration
            if (Utils$1.now() - cachedUrl.time < params.xhrCacheDuration) {
              // Load from cache
              resolve(cachedUrl.content);
              return;
            }
          }
        }
      }
      router.xhr = dom7$1.ajax({
        url: url,
        method: 'GET',
        beforeSend: function beforeSend() {
          router.emit('routerAjaxStart');
        },
        complete: function complete(xhr, status) {
          router.emit('routerAjaxComplete');
          if ((status !== 'error' && status !== 'timeout' && (xhr.status >= 200 && xhr.status < 300)) || xhr.status === 0) {
            if (params.xhrCache && xhr.responseText !== '') {
              router.removeFromXhrCache(url);
              router.cache.xhr.push({
                url: url,
                time: Utils$1.now(),
                content: xhr.responseText,
              });
            }
            resolve(xhr.responseText);
          } else {
            reject(xhr);
          }
        },
        error: function error(xhr) {
          router.emit('ajaxError');
          reject(xhr);
        },
      });
    });
  };
  // Remove theme elements
  Router.prototype.removeThemeElements = function removeThemeElements (el) {
    var router = this;
    var theme = router.app.theme;
    dom7$1(el).find(("." + (theme === 'md' ? 'ios' : 'md') + "-only, .if-" + (theme === 'md' ? 'ios' : 'md'))).remove();
  };
  Router.prototype.templateLoader = function templateLoader (template, templateUrl, options, resolve, reject) {
    var router = this;
    function compile(t) {
      var compiledHtml;
      var context;
      try {
        context = options.context || {};
        if (typeof context === 'function') { context = context.call(router.app); }
        else if (typeof context === 'string') {
          try {
            context = JSON.parse(context);
          } catch (err) {
            reject();
            throw (err);
          }
        }
        if (typeof t === 'function') {
          compiledHtml = t(context);
        } else {
          compiledHtml = t7.compile(t)(Utils$1.extend({}, context || {}, {
            $app: router.app,
            $root: router.app.data,
            $route: options.route,
            $router: router,
            $theme: {
              ios: router.app.theme === 'ios',
              md: router.app.theme === 'md',
            },
          }));
        }
      } catch (err) {
        reject();
        throw (err);
      }
      resolve(compiledHtml, { context: context });
    }
    if (templateUrl) {
      // Load via XHR
      if (router.xhr) {
        router.xhr.abort();
        router.xhr = false;
      }
      router
        .xhrRequest(templateUrl)
        .then(function (templateContent) {
          compile(templateContent);
        })
        .catch(function () {
          reject();
        });
    } else {
      compile(template);
    }
  };
  Router.prototype.modalTemplateLoader = function modalTemplateLoader (template, templateUrl, options, resolve, reject) {
    var router = this;
    return router.templateLoader(template, templateUrl, options, function (html) {
      resolve(html);
    }, reject);
  };
  Router.prototype.tabTemplateLoader = function tabTemplateLoader (template, templateUrl, options, resolve, reject) {
    var router = this;
    return router.templateLoader(template, templateUrl, options, function (html) {
      resolve(html);
    }, reject);
  };
  Router.prototype.pageTemplateLoader = function pageTemplateLoader (template, templateUrl, options, resolve, reject) {
    var router = this;
    return router.templateLoader(template, templateUrl, options, function (html, newOptions) {
      if ( newOptions === void 0 ) newOptions = {};

      resolve(router.getPageEl(html), newOptions);
    }, reject);
  };
  Router.prototype.componentLoader = function componentLoader (component, componentUrl, options, resolve, reject) {
    var router = this;
    var url = typeof component === 'string' ? component : componentUrl;
    function compile(c) {
      var createdComponent = Component.create(c, {
        $app: router.app,
        $root: router.app.data,
        $route: options.route,
        $router: router,
        $: dom7$1,
        $$: dom7$1,
        $dom7: dom7$1,
        $theme: {
          ios: router.app.theme === 'ios',
          md: router.app.theme === 'md',
        },
      });
      resolve(createdComponent.el, { pageEvents: c.on });
    }
    if (url) {
      // Load via XHR
      if (router.xhr) {
        router.xhr.abort();
        router.xhr = false;
      }
      router
        .xhrRequest(url)
        .then(function (loadedComponent) {
          compile(Component.parse(loadedComponent));
        })
        .catch(function () {
          reject();
        });
    } else {
      compile(component);
    }
  };
  Router.prototype.modalComponentLoader = function modalComponentLoader (rootEl, component, componentUrl, options, resolve, reject) {
    var router = this;
    router.componentLoader(component, componentUrl, options, function (el) {
      resolve(el);
    }, reject);
  };
  Router.prototype.tabComponentLoader = function tabComponentLoader (tabEl, component, componentUrl, options, resolve, reject) {
    var router = this;
    router.componentLoader(component, componentUrl, options, function (el) {
      resolve(el);
    }, reject);
  };
  Router.prototype.pageComponentLoader = function pageComponentLoader (routerEl, component, componentUrl, options, resolve, reject) {
    var router = this;
    router.componentLoader(component, componentUrl, options, function (el, newOptions) {
      if ( newOptions === void 0 ) newOptions = {};

      resolve(el, newOptions);
    }, reject);
  };
  Router.prototype.getPageData = function getPageData (pageEl, navbarEl, from, to, route, pageFromEl) {
    if ( route === void 0 ) route = {};

    var router = this;
    var $pageEl = dom7$1(pageEl);
    var $navbarEl = dom7$1(navbarEl);
    var currentPage = $pageEl[0].f7Page || {};
    var direction;
    var pageFrom;
    if ((from === 'next' && to === 'current') || (from === 'current' && to === 'previous')) { direction = 'forward'; }
    if ((from === 'current' && to === 'next') || (from === 'previous' && to === 'current')) { direction = 'backward'; }
    if (currentPage && !currentPage.fromPage) {
      var $pageFromEl = dom7$1(pageFromEl);
      if ($pageFromEl.length) {
        pageFrom = $pageFromEl[0].f7Page;
      }
    }
    var page = {
      app: router.app,
      view: router.view,
      $el: $pageEl,
      el: $pageEl[0],
      $pageEl: $pageEl,
      pageEl: $pageEl[0],
      $navbarEl: $navbarEl,
      navbarEl: $navbarEl[0],
      name: $pageEl.attr('data-name'),
      position: from,
      from: from,
      to: to,
      direction: direction,
      route: currentPage.route ? currentPage.route : route,
      pageFrom: currentPage.pageFrom || pageFrom,
    };

    if ($navbarEl && $navbarEl[0]) {
      $navbarEl[0].f7Page = page;
    }
    $pageEl[0].f7Page = page;
    return page;
  };
  // Callbacks
  Router.prototype.pageCallback = function pageCallback (callback, pageEl, navbarEl, from, to, options, pageFromEl) {
    if ( options === void 0 ) options = {};

    if (!pageEl) { return; }
    var router = this;
    var $pageEl = dom7$1(pageEl);
    var route = options.route;
    var on = options.on; if ( on === void 0 ) on = {};

    var camelName = "page" + (callback[0].toUpperCase() + callback.slice(1, callback.length));
    var colonName = "page:" + (callback.toLowerCase());

    var page = {};
    if (callback === 'beforeRemove' && $pageEl[0].f7Page) {
      page = Utils$1.extend($pageEl[0].f7Page, { from: from, to: to, position: from });
    } else {
      page = router.getPageData(pageEl, navbarEl, from, to, route, pageFromEl);
    }

    function attachEvents() {
      if ($pageEl[0].f7PageEventsAttached) { return; }
      $pageEl[0].f7PageEventsAttached = true;
      if (options.pageEvents) {
        $pageEl[0].f7PageEvents = options.pageEvents;
        Object.keys(options.pageEvents).forEach(function (eventName) {
          $pageEl.on(("page:" + (eventName.split('page')[1].toLowerCase())), options.pageEvents[eventName]);
        });
      }
    }
    if (callback === 'mounted') {
      attachEvents();
    }
    if (callback === 'init') {
      attachEvents();
      if ($pageEl[0].f7PageInitialized) {
        if (on.pageReinit) { on.pageReinit(page); }
        $pageEl.trigger('page:reinit', page);
        router.emit('pageReinit', page);
        return;
      }
      $pageEl[0].f7PageInitialized = true;
    }

    if (on[camelName]) { on[camelName](page); }
    $pageEl.trigger(colonName, page);
    router.emit(camelName, page);

    if (callback === 'beforeRemove') {
      if ($pageEl[0].f7PageEventsAttached && $pageEl[0].f7PageEvents) {
        Object.keys($pageEl[0].f7PageEvents).forEach(function (eventName) {
          $pageEl.off(("page:" + (eventName.split('page')[1].toLowerCase())), $pageEl[0].f7PageEvents[eventName]);
        });
      }
    }

    if (callback === 'beforeRemove') {
      $pageEl[0].f7Page = null;
      page = null;
    }
  };
  Router.prototype.saveHistory = function saveHistory () {
    var router = this;
    router.view.history = router.history;
    if (router.params.pushState) {
      window.localStorage[("f7_router_" + (router.view.index) + "_history")] = JSON.stringify(router.history);
    }
  };
  Router.prototype.restoreHistory = function restoreHistory () {
    var router = this;
    if (router.params.pushState && window.localStorage[("f7_router_" + (router.view.index) + "_history")]) {
      router.history = JSON.parse(window.localStorage[("f7_router_" + (router.view.index) + "_history")]);
      router.view.history = router.history;
    }
  };
  Router.prototype.clearHistory = function clearHistory () {
    var router = this;
    router.history = [];
    router.saveHistory();
  };
  Router.prototype.init = function init () {
    var router = this;
    var app = router.app;

    // Init Swipeback
    if (router.view && router.params.swipeBackPage && app.theme === 'ios') {
      SwipeBack(router);
    }

    // Dynamic not separated navbbar
    if (router.dynamicNavbar && !router.separateNavbar) {
      router.$el.addClass('router-dynamic-navbar-inside');
    }

    var initUrl = router.params.url;
    var documentUrl = document.location.href.split(document.location.origin)[1];
    var historyRestored;
    if (!router.params.pushState) {
      if (!initUrl) {
        initUrl = documentUrl;
      }
    } else {
      if (router.params.pushStateRoot && documentUrl.indexOf(router.params.pushStateRoot) >= 0) {
        documentUrl = documentUrl.split(router.params.pushStateRoot)[1];
        if (documentUrl === '') { documentUrl = '/'; }
      }
      if (documentUrl.indexOf(router.params.pushStateSeparator) >= 0) {
        initUrl = documentUrl.split(router.params.pushStateSeparator)[1];
      } else {
        initUrl = documentUrl;
      }
      router.restoreHistory();
      if (router.history.indexOf(initUrl) >= 0) {
        router.history = router.history.slice(0, router.history.indexOf(initUrl) + 1);
      } else if (router.params.url === initUrl) {
        router.history = [initUrl];
      } else {
        router.history = [documentUrl.split(router.params.pushStateSeparator)[0] || '/', initUrl];
      }
      if (router.history.length > 1) {
        historyRestored = true;
      } else {
        router.history = [];
      }
      router.saveHistory();
    }
    var currentRoute;
    if (router.history.length > 1) {
      // Will load page
      currentRoute = router.findMatchingRoute(router.history[0]);
      if (!currentRoute) {
        currentRoute = Utils$1.extend(router.findMatchingRoute(router.history[0], true), {
          route: {
            url: router.history[0],
            path: router.history[0].split('?')[0],
          },
        });
      }
    } else {
      // Don't load page
      currentRoute = router.findMatchingRoute(initUrl);
      if (!currentRoute) {
        currentRoute = Utils$1.extend(router.findMatchingRoute(initUrl, true), {
          route: {
            url: initUrl,
            path: initUrl.split('?')[0],
          },
        });
      }
    }

    if (router.params.stackPages) {
      router.$el.children('.page').each(function (index, pageEl) {
        var $pageEl = dom7$1(pageEl);
        router.initialPages.push($pageEl[0]);
        if (router.separateNavbar && $pageEl.children('.navbar').length > 0) {
          router.initialNavbars.push($pageEl.children('.navbar').find('.navbar-inner')[0]);
        }
      });
    }

    if (router.$el.children('.page:not(.stacked)').length === 0 && initUrl) {
      // No pages presented in DOM, reload new page
      router.navigate(initUrl, {
        reloadCurrent: true,
        pushState: false,
      });
    } else {
      // Init current DOM page
      router.currentRoute = currentRoute;
      router.$el.children('.page:not(.stacked)').each(function (index, pageEl) {
        var $pageEl = dom7$1(pageEl);
        var $navbarInnerEl;
        $pageEl.addClass('page-current');
        if (router.separateNavbar) {
          $navbarInnerEl = $pageEl.children('.navbar').children('.navbar-inner');
          if ($navbarInnerEl.length > 0) {
            router.$navbarEl.append($navbarInnerEl);
            $pageEl.children('.navbar').remove();
          } else {
            router.$navbarEl.addClass('navbar-hidden');
          }
        }
        router.pageCallback('init', $pageEl, $navbarInnerEl, 'current', undefined, { route: router.currentRoute });
      });
      if (historyRestored) {
        router.navigate(initUrl, {
          pushState: false,
          history: false,
          animate: router.params.pushStateAnimateOnLoad,
          on: {
            pageAfterIn: function pageAfterIn() {
              if (router.history.length > 2) {
                router.back({ preload: true });
              }
            },
          },
        });
      } else {
        router.history.push(initUrl);
        router.saveHistory();
      }
    }
    router.emit('routerInit', router);
  };
  Router.prototype.destroy = function destroy () {
    var router = this;

    router.emit('routerDestroy', router);

    // Delete props & methods
    Object.keys(router).forEach(function (routerProp) {
      router[routerProp] = null;
      delete router[routerProp];
    });

    router = null;
  };

  return Router;
}(Framework7Class));

var Router = {
  name: 'router',
  static: {
    Router: Router$1,
  },
  instance: {
    cache: {
      xhr: [],
      templates: [],
      components: [],
    },
  },
  create: function create(params) {
    var instance = this;
    var app = params.app;
    var view = params.view;
    if (view) {
      // View Router
      instance.router = new Router$1(app, view);
    } else {
      // App Router
      instance.router = new Router$1(app);
    }
  },
};

var History$2 = {
  name: 'history',
  on: {
    init: function init() {
      History.init(this);
    },
  },
};

var View = (function (Framework7Class$$1) {
  function View(appInstance, el, viewParams) {
    if ( viewParams === void 0 ) viewParams = {};

    Framework7Class$$1.call(this, viewParams, [appInstance]);

    var app = appInstance;
    var $el = dom7$1(el);
    var view = this;

    var defaults = {
      name: undefined,
      main: false,
      routes: [],
      routesAdd: [],
      linksView: undefined,
    };

    // Default View params
    view.params = Utils$1.extend(defaults, app.params.view, viewParams);

    // Routes
    if (view.params.routes.length > 0) {
      view.routes = view.params.routes;
    } else {
      view.routes = [].concat(app.routes, view.params.routesAdd);
    }

    // Selector
    var selector;
    if (typeof el === 'string') { selector = el; }
    else {
      // Supposed to be HTMLElement or Dom7
      selector = ($el.attr('id') ? ("#" + ($el.attr('id'))) : '') + ($el.attr('class') ? ("." + ($el.attr('class').replace(/ /g, '.').replace('.active', ''))) : '');
    }

    // DynamicNavbar
    var $navbarEl;
    if (app.theme === 'ios' && view.params.iosDynamicNavbar && view.params.iosSeparateDynamicNavbar) {
      $navbarEl = $el.children('.navbar').eq(0);
      if ($navbarEl.length === 0) {
        $navbarEl = dom7$1('<div class="navbar"></div>');
        $el.prepend($navbarEl);
      }
    }

    // View Props
    Utils$1.extend(view, {
      app: app,
      $el: $el,
      el: $el[0],
      name: view.params.name,
      main: view.params.main || $el.hasClass('view-main'),
      $navbarEl: $navbarEl,
      navbarEl: $navbarEl ? $navbarEl[0] : undefined,
      selector: selector,
      history: [],
    });

    $el[0].f7View = view;

    // Install Modules
    view.useInstanceModules({
      router: {
        app: app,
        view: view,
      },
    });

    // Add to app
    app.views.push(view);
    if (view.main) {
      app.views.main = view;
    } else if (view.name) {
      app.views[view.name] = view;
    }

    view.index = app.views.indexOf(view);

    // Init View
    if (app.initialized) {
      view.init();
    } else {
      app.on('init', view.init);
    }

    return view;
  }

  if ( Framework7Class$$1 ) View.__proto__ = Framework7Class$$1;
  View.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  View.prototype.constructor = View;
  View.prototype.destroy = function destroy () {
    var view = this;
    var app = view.app;

    view.emit('viewBeforeDestroy', view);
    view.$el.trigger('view:beforedestroy', view);

    if (view.main) {
      app.views.main = null;
      delete app.views.main;
    } else if (view.name) {
      app.views[view.name] = null;
      delete app.views[view.name];
    }
    view.$el[0].f7View = null;
    delete view.$el[0].f7View;

    app.views.splice(app.views.indexOf(view), 1);

    // Destroy Router
    view.router.destroy();

    view.emit('viewDestroy', view);

    // Delete props & methods
    Object.keys(view).forEach(function (viewProp) {
      view[viewProp] = null;
      delete view[viewProp];
    });

    view = null;
  };
  View.prototype.init = function init () {
    var view = this;
    view.router.init();
  };

  return View;
}(Framework7Class));

// Use Router
View.use(Router);

function initClicks(app) {
  function handleClicks(e) {
    var clicked = dom7$1(e.target);
    var clickedLink = clicked.closest('a');
    var isLink = clickedLink.length > 0;
    var url = isLink && clickedLink.attr('href');
    var isTabLink = isLink && clickedLink.hasClass('tab-link') && (clickedLink.attr('data-tab') || (url && url.indexOf('#') === 0));

    // Check if link is external
    if (isLink) {
      if (clickedLink.is(app.params.clicks.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
        if (url && clickedLink.attr('target') === '_system') {
          e.preventDefault();
          window.open(url, '_system');
        }
        return;
      }
    }

    // Modules Clicks
    Object.keys(app.modules).forEach(function (moduleName) {
      var moduleClicks = app.modules[moduleName].clicks;
      if (!moduleClicks) { return; }
      Object.keys(moduleClicks).forEach(function (clickSelector) {
        var matchingClickedElement = clicked.closest(clickSelector).eq(0);
        if (matchingClickedElement.length > 0) {
          moduleClicks[clickSelector].call(app, matchingClickedElement, matchingClickedElement.dataset());
        }
      });
    });

    // Load Page
    var clickedLinkData = {};
    if (isLink) {
      e.preventDefault();
      clickedLinkData = clickedLink.dataset();
    }
    var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
    var template = clickedLinkData.template;
    if (validUrl || clickedLink.hasClass('back') || template) {
      var view;
      if (clickedLinkData.view) {
        view = dom7$1(clickedLinkData.view)[0].f7View;
      } else {
        view = clicked.parents('.view')[0] && clicked.parents('.view')[0].f7View;
        if (view && view.params.linksView) {
          if (typeof view.params.linksView === 'string') { view = dom7$1(view.params.linksView)[0].f7View; }
          else if (view.params.linksView instanceof View) { view = view.params.linksView; }
        }
      }
      if (!view) {
        if (app.views.main) { view = app.views.main; }
      }
      if (!view) { return; }
      if (clickedLink.hasClass('back')) { view.router.back(url, clickedLinkData); }
      else { view.router.navigate(url, clickedLinkData); }
    }
  }

  app.on('click', handleClicks);

  // Prevent scrolling on overlays
  function preventScrolling(e) {
    e.preventDefault();
  }
  if (Support$1.touch && !Device$1.android) {
    var activeListener = Support$1.passiveListener ? { passive: false, capture: false } : false;
    dom7$1(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-backdrop, .dialog-backdrop, .preloader-indicator-overlay, .popup-backdrop, .searchbar-backdrop', preventScrolling, activeListener);
  }
}
var Clicks = {
  name: 'clicks',
  params: {
    clicks: {
      // External Links
      externalLinks: '.external',
    },
  },
  on: {
    init: function init() {
      var app = this;
      initClicks(app);
    },
  },
};

var Statusbar = {
  hide: function hide() {
    dom7$1('html').removeClass('with-statusbar');
    if (Device$1.cordova && window.StatusBar) {
      window.StatusBar.hide();
    }
  },
  show: function show() {
    dom7$1('html').addClass('with-statusbar');
    if (Device$1.cordova && window.StatusBar) {
      window.StatusBar.show();
    }
  },
  onClick: function onClick() {
    var app = this;
    var pageContent;
    if (dom7$1('.popup.modal-in').length > 0) {
      // Check for opened popup
      pageContent = dom7$1('.popup.modal-in').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if (dom7$1('.panel.panel-active').length > 0) {
      // Check for opened panel
      pageContent = dom7$1('.panel.panel-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if (dom7$1('.views > .view.tab-active').length > 0) {
      // View in tab bar app layout
      pageContent = dom7$1('.views > .view.tab-active').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else if (dom7$1('.views').length > 0) {
      pageContent = dom7$1('.views').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    } else {
      pageContent = app.root.children('.view').find('.page:not(.page-previous):not(.page-next):not(.cached)').find('.page-content');
    }

    if (pageContent && pageContent.length > 0) {
      // Check for tab
      if (pageContent.hasClass('tab')) {
        pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
      }
      if (pageContent.length > 0) { pageContent.scrollTop(0, 300); }
    }
  },
  setIosTextColor: function setIosTextColor(color) {
    if (Device$1.cordova && window.StatusBar) {
      if (color === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }
  },
  setBackgroundColor: function setBackgroundColor(color) {
    if (Device$1.cordova && window.StatusBar) {
      if (Device$1.needsStatusbar()) {
        // Change Overlay Color;
        dom7$1('.statusbar').css('background-color', color);
      } else {
        // Change Real Status bar color
        window.StatusBar.backgroundColorByHexString(color);
      }
    } else {
      dom7$1('.statusbar').css('background-color', color);
    }
  },
  isVisible: function isVisible() {
    if (Device$1.cordova && window.StatusBar) {
      return window.StatusBar.isVisible;
    }
    return undefined;
  },
  init: function init() {
    var app = this;
    var params = app.params.statusbar;

    if (params.overlay === 'auto') {
      if (Device$1.needsStatusbar()) {
        dom7$1('html').addClass('with-statusbar');
      }
      if (Device$1.cordova) {
        dom7$1(document).on('resume', function () {
          if (Device$1.needsStatusbar()) {
            dom7$1('html').addClass('with-statusbar');
          } else {
            dom7$1('html').removeClass('with-statusbar');
          }
        }, false);
      }
    } else if (params.overlay === true) {
      dom7$1('html').addClass('with-statusbar');
    } else if (params.overlay === false) {
      dom7$1('html').removeClass('with-statusbar');
    }

    if (Device$1.cordova && window.StatusBar) {
      if (params.scrollTopOnClick) {
        dom7$1(window).on('statusTap', Statusbar.onClick.bind(app));
      }
      if (params.iosOverlaysWebView) {
        window.StatusBar.overlaysWebView(true);
      } else {
        window.StatusBar.overlaysWebView(false);
      }

      if (params.iosTextColor === 'white') {
        window.StatusBar.styleLightContent();
      } else {
        window.StatusBar.styleDefault();
      }
    }

    if (params.setBackgroundColor) {
      Statusbar.setBackgroundColor(app.theme === 'ios' ? params.iosBackgroundColor : params.materialBackgroundColor);
    }
  },
};

var Statusbar$1 = {
  name: 'statusbar',
  params: {
    statusbar: {
      overlay: 'auto',
      scrollTopOnClick: true,
      iosOverlaysWebView: true,
      iosTextColor: 'black',
      setBackgroundColor: true,
      iosBackgroundColor: '#F7F7F8',
      materialBackgroundColor: '#0D47A1',
    },
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      statusbar: {
        hide: Statusbar.hide,
        show: Statusbar.show,
        setIosTextColor: Statusbar.setIosTextColor,
        setBackgroundColor: Statusbar.setBackgroundColor,
        isVisible: Statusbar.isVisible,
        init: Statusbar.init.bind(app),
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      Statusbar.init.call(app);
    },
  },
  clicks: {
    '.statusbar': function onStatusbarClick() {
      var app = this;
      if (!app.params.statusbar.scrollTopOnClick) { return; }
      Statusbar.onClick.call(app);
    },
  },
};

function getCurrentView(app) {
  var popoverView = dom7$1('.popover.modal-in .view');
  var popupView = dom7$1('.popup.modal-in .view');
  var panelView = dom7$1('.panel.panel-active .view');
  var appViews = dom7$1('.views');
  if (appViews.length === 0) { appViews = app.root; }
  // Find active view as tab
  var appView = appViews.children('.view');
  // Propably in tabs or split view
  if (appView.length > 1) {
    if (appView.hasClass('tab')) {
      // Tabs
      appView = appViews.children('.view.tab-active');
    } else {
      // Split View, leave appView intact
    }
  }
  if (popoverView.length > 0 && popoverView[0].f7View) { return popoverView[0].f7View; }
  if (popupView.length > 0 && popupView[0].f7View) { return popupView[0].f7View; }
  if (panelView.length > 0 && panelView[0].f7View) { return panelView[0].f7View; }
  if (appView.length > 0) {
    if (appView.length === 1 && appView[0].f7View) { return appView[0].f7View; }
    if (appView.length > 1) {
      return app.views.main;
    }
  }
  return undefined;
}

var View$2 = {
  name: 'view',
  params: {
    view: {
      stackPages: false,
      xhrCache: true,
      xhrCacheIgnore: [],
      xhrCacheIgnoreGetParameters: false,
      xhrCacheDuration: 1000 * 60 * 10, // Ten minutes
      preloadPreviousPage: true,
      uniqueHistory: false,
      uniqueHistoryIgnoreGetParameters: false,
      allowDuplicateUrls: false,
      reloadPages: false,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
      // Swipe Back
      swipeBackPage: true,
      swipeBackPageAnimateShadow: true,
      swipeBackPageAnimateOpacity: true,
      swipeBackPageActiveArea: 30,
      swipeBackPageThreshold: 0,
      // Push State
      pushState: false,
      pushStateRoot: undefined,
      pushStateAnimate: true,
      pushStateAnimateOnLoad: false,
      pushStateSeparator: '#!',
      pushStateOnLoad: true,
      // Animate Pages
      animate: true,
      animateWithJS: true,
      // iOS Dynamic Navbar
      iosDynamicNavbar: true,
      iosSeparateDynamicNavbar: true,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: true,
      // MD Theme delay
      materialPageLoadDelay: 0,
    },
  },
  static: {
    View: View,
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      views: Utils$1.extend([], {
        create: function create(el, params) {
          return new View(app, el, params);
        },
      }),
    });
    Object.defineProperty(app.views, 'current', {
      enumerable: true,
      configurable: true,
      get: function get() {
        return getCurrentView(app);
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      dom7$1('.view-init').each(function (index, viewEl) {
        if (viewEl.f7View) { return; }
        var viewParams = dom7$1(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      });
    },
    modalOpen: function modalOpen(modal) {
      var app = this;
      modal.$el.find('.view-init').each(function (index, viewEl) {
        if (viewEl.f7View) { return; }
        var viewParams = dom7$1(viewEl).dataset();
        app.views.create(viewEl, viewParams);
      });
    },
    modalBeforeDestroy: function modalBeforeDestroy(modal) {
      if (!modal || !modal.$el) { return; }
      modal.$el.find('.view-init').each(function (index, viewEl) {
        var view = viewEl.f7View;
        if (!view) { return; }
        view.destroy();
      });
    },
  },
};

var Navbar = {
  size: function size(el) {
    var app = this;
    if (app.theme !== 'ios') { return; }
    var $el = dom7$1(el);
    if ($el.hasClass('navbar')) {
      $el = $el.children('.navbar-inner').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
      return;
    }
    if (
      $el.hasClass('stacked') ||
      $el.parents('.stacked').length > 0 ||
      $el.parents('.tab:not(.tab-active)').length > 0 ||
      $el.parents('.popup:not(.modal-in)').length > 0
    ) {
      return;
    }
    var $viewEl = $el.parents('.view').eq(0);
    var left = app.rtl ? $el.children('.right') : $el.children('.left');
    var right = app.rtl ? $el.children('.left') : $el.children('.right');
    var title = $el.children('.title');
    var subnavbar = $el.children('.subnavbar');
    var noLeft = left.length === 0;
    var noRight = right.length === 0;
    var leftWidth = noLeft ? 0 : left.outerWidth(true);
    var rightWidth = noRight ? 0 : right.outerWidth(true);
    var titleWidth = title.outerWidth(true);
    var navbarStyles = $el.styles();
    var navbarWidth = $el[0].offsetWidth;
    var navbarInnerWidth = navbarWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10);
    var isPrevious = $el.hasClass('navbar-previous');
    var sliding = $el.hasClass('sliding');

    var router;
    var dynamicNavbar;
    var separateNavbar;
    var separateNavbarRightOffset = 0;
    var separateNavbarLeftOffset = 0;

    if ($viewEl.length > 0 && $viewEl[0].f7View) {
      router = $viewEl[0].f7View.router;
      dynamicNavbar = router && router.dynamicNavbar;
      separateNavbar = router && router.separateNavbar;
      if (!separateNavbar) {
        separateNavbarRightOffset = navbarWidth;
        separateNavbarLeftOffset = navbarWidth / 5;
      }
    }

    var currLeft;
    var diff;
    if (noRight) {
      currLeft = navbarInnerWidth - titleWidth;
    }
    if (noLeft) {
      currLeft = 0;
    }
    if (!noLeft && !noRight) {
      currLeft = ((navbarInnerWidth - rightWidth - titleWidth) + leftWidth) / 2;
    }
    var requiredLeft = (navbarInnerWidth - titleWidth) / 2;
    if (navbarInnerWidth - leftWidth - rightWidth > titleWidth) {
      if (requiredLeft < leftWidth) {
        requiredLeft = leftWidth;
      }
      if (requiredLeft + titleWidth > navbarInnerWidth - rightWidth) {
        requiredLeft = navbarInnerWidth - rightWidth - titleWidth;
      }
      diff = requiredLeft - currLeft;
    } else {
      diff = 0;
    }

    // RTL inverter
    var inverter = app.rtl ? -1 : 1;

    if (dynamicNavbar) {
      if (title.hasClass('sliding') || (title.length > 0 && sliding)) {
        var titleLeftOffset = (-(currLeft + diff) * inverter) + separateNavbarLeftOffset;
        var titleRightOffset = ((navbarInnerWidth - currLeft - diff - titleWidth) * inverter) - separateNavbarRightOffset;

        if (isPrevious) {
          if (router && router.params.iosAnimateNavbarBackIcon) {
            var activeNavbarBackLink = $el.parent().find('.navbar-current').children('.left.sliding').find('.back .icon ~ span');
            if (activeNavbarBackLink.length > 0) {
              titleLeftOffset += activeNavbarBackLink[0].offsetLeft;
            }
          }
        }
        title[0].f7NavbarLeftOffset = titleLeftOffset;
        title[0].f7NavbarRightOffset = titleRightOffset;
      }
      if (!noLeft && (left.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          left[0].f7NavbarLeftOffset = (-(navbarInnerWidth - left[0].offsetWidth) / 2) * inverter;
          left[0].f7NavbarRightOffset = leftWidth * inverter;
        } else {
          left[0].f7NavbarLeftOffset = -leftWidth + separateNavbarLeftOffset;
          left[0].f7NavbarRightOffset = ((navbarInnerWidth - left[0].offsetWidth) / 2) - separateNavbarRightOffset;
          if (router && router.params.iosAnimateNavbarBackIcon && left.find('.back .icon').length > 0) {
            left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
          }
        }
      }
      if (!noRight && (right.hasClass('sliding') || sliding)) {
        if (app.rtl) {
          right[0].f7NavbarLeftOffset = -rightWidth * inverter;
          right[0].f7NavbarRightOffset = ((navbarInnerWidth - right[0].offsetWidth) / 2) * inverter;
        } else {
          right[0].f7NavbarLeftOffset = (-(navbarInnerWidth - right[0].offsetWidth) / 2) + separateNavbarLeftOffset;
          right[0].f7NavbarRightOffset = rightWidth - separateNavbarRightOffset;
        }
      }
      if (subnavbar.length && (subnavbar.hasClass('sliding') || sliding)) {
        subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : (-subnavbar[0].offsetWidth + separateNavbarLeftOffset);
        subnavbar[0].f7NavbarRightOffset = (-subnavbar[0].f7NavbarLeftOffset - separateNavbarRightOffset) + separateNavbarLeftOffset;
      }
    }

    // Title left
    if (app.params.navbar.iosCenterTitle) {
      var titleLeft = diff;
      if (app.rtl && noLeft && noRight && title.length > 0) { titleLeft = -titleLeft; }
      title.css({ left: (titleLeft + "px") });
    }
  },
  hide: function hide(el, animate) {
    if ( animate === void 0 ) animate = true;

    var $el = dom7$1(el);
    if ($el.hasClass('navbar-inner')) { $el = $el.parents('.navbar'); }
    if (!$el.length) { return; }
    if ($el.hasClass('navbar-hidden')) { return; }
    var className = "navbar-hidden" + (animate ? ' navbar-transitioning' : '');
    $el.transitionEnd(function () {
      $el.removeClass('navbar-transitioning');
    });
    $el.addClass(className);
  },
  show: function show(el, animate) {
    if ( el === void 0 ) el = '.navbar-hidden';
    if ( animate === void 0 ) animate = true;

    var $el = dom7$1(el);
    if ($el.hasClass('navbar-inner')) { $el = $el.parents('.navbar'); }
    if (!$el.length) { return; }
    if (!$el.hasClass('navbar-hidden')) { return; }
    if (animate) {
      $el.addClass('navbar-transitioning');
      $el.transitionEnd(function () {
        $el.removeClass('navbar-transitioning');
      });
    }
    $el.removeClass('navbar-hidden');
  },
  getElByPage: function getElByPage(page) {
    var $pageEl;
    var $navbarEl;
    var pageData;
    if (page.$navbarEl || page.$el) {
      pageData = page;
      $pageEl = page.$el;
    } else {
      $pageEl = dom7$1(page);
      if ($pageEl.length > 0) { pageData = $pageEl[0].f7Page; }
    }
    if (pageData && pageData.$navbarEl && pageData.$navbarEl.length > 0) {
      $navbarEl = pageData.$navbarEl;
    } else if ($pageEl) {
      $navbarEl = $pageEl.children('.navbar').children('.navbar-inner');
    }
    if (!$navbarEl || ($navbarEl && $navbarEl.length === 0)) { return undefined; }
    return $navbarEl[0];
  },
  initHideNavbarOnScroll: function initHideNavbarOnScroll(pageEl, navbarInnerEl) {
    var app = this;
    var $pageEl = dom7$1(pageEl);
    var $navbarEl = dom7$1(navbarInnerEl || app.navbar.getElByPage(pageEl)).closest('.navbar');

    var previousScrollTop;
    var currentScrollTop;

    var scrollHeight;
    var offsetHeight;
    var reachEnd;
    var action;
    var navbarHidden;
    function handleScroll() {
      var scrollContent = this;
      if ($pageEl.hasClass('page-previous')) { return; }
      currentScrollTop = scrollContent.scrollTop;
      scrollHeight = scrollContent.scrollHeight;
      offsetHeight = scrollContent.offsetHeight;
      reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
      navbarHidden = $navbarEl.hasClass('navbar-hidden');

      if (reachEnd) {
        if (app.params.navbar.showOnPageScrollEnd) {
          action = 'show';
        }
      } else if (previousScrollTop > currentScrollTop) {
        if (app.params.navbar.showOnPageScrollTop || currentScrollTop <= 44) {
          action = 'show';
        } else {
          action = 'hide';
        }
      } else if (currentScrollTop > 44) {
        action = 'hide';
      } else {
        action = 'show';
      }

      if (action === 'show' && navbarHidden) {
        app.navbar.show($navbarEl);
        navbarHidden = false;
      } else if (action === 'hide' && !navbarHidden) {
        app.navbar.hide($navbarEl);
        navbarHidden = true;
      }

      previousScrollTop = currentScrollTop;
    }
    $pageEl.on('scroll', '.page-content', handleScroll, true);
    $pageEl[0].f7ScrollNavbarHandler = handleScroll;
  },
};
var Navbar$1 = {
  name: 'navbar',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      navbar: {
        size: Navbar.size.bind(app),
        hide: Navbar.hide.bind(app),
        show: Navbar.show.bind(app),
        getElByPage: Navbar.getElByPage.bind(app),
        initHideNavbarOnScroll: Navbar.initHideNavbarOnScroll.bind(app),
      },
    });
  },
  params: {
    navbar: {
      scrollTopOnTitleClick: true,
      iosCenterTitle: true,
      hideOnPageScroll: false,
      showOnPageScrollEnd: true,
      showOnPageScrollTop: true,
    },
  },
  on: {
    resize: function resize() {
      var app = this;
      if (app.theme !== 'ios') { return; }
      dom7$1('.navbar').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      if (page.$el[0].f7ScrollNavbarHandler) {
        page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollNavbarHandler, true);
      }
    },
    pageBeforeIn: function pageBeforeIn(page) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      var $navbarEl;
      var view = page.$el.parents('.view')[0].f7View;
      var navbarInnerEl = app.navbar.getElByPage(page);
      if (!navbarInnerEl) {
        $navbarEl = page.$el.parents('.view').children('.navbar');
      } else {
        $navbarEl = dom7$1(navbarInnerEl).parents('.navbar');
      }
      if (page.$el.hasClass('no-navbar') || (view.router.dynamicNavbar && !navbarInnerEl)) {
        app.navbar.hide($navbarEl);
      } else {
        app.navbar.show($navbarEl);
      }
    },
    pageReinit: function pageReinit(page) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      var $navbarEl = dom7$1(app.navbar.getElByPage(page));
      if (!$navbarEl || $navbarEl.length === 0) { return; }
      app.navbar.size($navbarEl);
    },
    pageInit: function pageInit(page) {
      var app = this;
      var $navbarEl = dom7$1(app.navbar.getElByPage(page));
      if (!$navbarEl || $navbarEl.length === 0) { return; }
      if (app.theme === 'ios') {
        app.navbar.size($navbarEl);
      }
      if (app.params.navbar.hideOnPageScroll || page.$el.find('.hide-navbar-on-scroll').length || page.$el.hasClass('hide-navbar-on-scroll') || page.$el.find('.hide-bars-on-scroll').length) {
        if (page.$el.find('.keep-navbar-on-scroll').length || page.$el.find('.keep-bars-on-scroll').length) { return; }
        app.navbar.initHideNavbarOnScroll(page.el, $navbarEl[0]);
      }
    },
    modalOpen: function modalOpen(modal) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      modal.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
    panelOpen: function panelOpen(panel) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
    panelSwipeOpen: function panelSwipeOpen(panel) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      panel.$el.find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
    tabShow: function tabShow(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.navbar:not(.navbar-previous):not(.stacked)').each(function (index, navbarEl) {
        app.navbar.size(navbarEl);
      });
    },
  },
  clicks: {
    '.navbar .title': function onTitleClick($clickedEl) {
      var app = this;
      if (!app.params.navbar.scrollTopOnTitleClick) { return; }
      if ($clickedEl.closest('a').length > 0) {
        return;
      }
      var pageContent;
      // Find active page
      var navbar = $clickedEl.parents('.navbar');

      // Static Layout
      pageContent = navbar.parents('.page-content');

      if (pageContent.length === 0) {
        // Fixed Layout
        if (navbar.parents('.page').length > 0) {
          pageContent = navbar.parents('.page').find('.page-content');
        }
        // Through Layout
        if (pageContent.length === 0) {
          if (navbar.nextAll('.page-current:not(.stacked)').length > 0) {
            pageContent = navbar.nextAll('.page-current:not(.stacked)').find('.page-content');
          }
        }
      }
      if (pageContent && pageContent.length > 0) {
        // Check for tab
        if (pageContent.hasClass('tab')) {
          pageContent = pageContent.parent('.tabs').children('.page-content.tab-active');
        }
        if (pageContent.length > 0) { pageContent.scrollTop(0, 300); }
      }
    },
  },
};

var Toolbar = {
  setHighlight: function setHighlight(tabbarEl) {
    var app = this;
    if (app.theme !== 'md') { return; }

    var $tabbarEl = dom7$1(tabbarEl);

    if ($tabbarEl.length === 0 || !($tabbarEl.hasClass('tabbar') || $tabbarEl.hasClass('tabbar-labels'))) { return; }

    if ($tabbarEl.find('.tab-link-highlight').length === 0) {
      $tabbarEl.children('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
    }

    var $highlightEl = $tabbarEl.find('.tab-link-highlight');
    var $activeLink = $tabbarEl.find('.tab-link-active');
    var highlightWidth;
    var highlightTranslate;

    if ($tabbarEl.hasClass('tabbar-scrollable')) {
      highlightWidth = ($activeLink[0].offsetWidth) + "px";
      highlightTranslate = ($activeLink[0].offsetLeft) + "px";
    } else {
      var activeIndex = $activeLink.index();
      var tabLinksCount = $tabbarEl.find('.tab-link').length;
      highlightWidth = (100 / tabLinksCount) + "%";
      highlightTranslate = ((app.rtl ? -activeIndex : activeIndex) * 100) + "%";
    }

    $highlightEl
      .css('width', highlightWidth)
      .transform(("translate3d(" + highlightTranslate + ",0,0)"));
  },
  init: function init(tabbarEl) {
    var app = this;
    app.toolbar.setHighlight(tabbarEl);
  },
  hide: function hide(el, animate) {
    if ( animate === void 0 ) animate = true;

    var $el = dom7$1(el);
    if ($el.hasClass('toolbar-hidden')) { return; }
    var className = "toolbar-hidden" + (animate ? ' toolbar-transitioning' : '');
    $el.transitionEnd(function () {
      $el.removeClass('toolbar-transitioning');
    });
    $el.addClass(className);
  },
  show: function show(el, animate) {
    if ( animate === void 0 ) animate = true;

    var $el = dom7$1(el);
    if (!$el.hasClass('toolbar-hidden')) { return; }
    if (animate) {
      $el.addClass('toolbar-transitioning');
      $el.transitionEnd(function () {
        $el.removeClass('toolbar-transitioning');
      });
    }
    $el.removeClass('toolbar-hidden');
  },
  initHideToolbarOnScroll: function initHideToolbarOnScroll(pageEl) {
    var app = this;
    var $pageEl = dom7$1(pageEl);
    var $toolbarEl = $pageEl.parents('.view').children('.toolbar');
    if ($toolbarEl.length === 0) {
      $toolbarEl = $pageEl.find('.toolbar');
    }
    if ($toolbarEl.length === 0) {
      return;
    }

    var previousScrollTop;
    var currentScrollTop;

    var scrollHeight;
    var offsetHeight;
    var reachEnd;
    var action;
    var toolbarHidden;
    function handleScroll() {
      var scrollContent = this;
      if ($pageEl.hasClass('page-previous')) { return; }
      currentScrollTop = scrollContent.scrollTop;
      scrollHeight = scrollContent.scrollHeight;
      offsetHeight = scrollContent.offsetHeight;
      reachEnd = currentScrollTop + offsetHeight >= scrollHeight;
      toolbarHidden = $toolbarEl.hasClass('toolbar-hidden');

      if (reachEnd) {
        if (app.params.toolbar.showOnPageScrollEnd) {
          action = 'show';
        }
      } else if (previousScrollTop > currentScrollTop) {
        if (app.params.toolbar.showOnPageScrollTop || currentScrollTop <= 44) {
          action = 'show';
        } else {
          action = 'hide';
        }
      } else if (currentScrollTop > 44) {
        action = 'hide';
      } else {
        action = 'show';
      }

      if (action === 'show' && toolbarHidden) {
        app.toolbar.show($toolbarEl);
        toolbarHidden = false;
      } else if (action === 'hide' && !toolbarHidden) {
        app.toolbar.hide($toolbarEl);
        toolbarHidden = true;
      }

      previousScrollTop = currentScrollTop;
    }
    $pageEl.on('scroll', '.page-content', handleScroll, true);
    $pageEl[0].f7ScrollToolbarHandler = handleScroll;
  },
};
var Toolbar$1 = {
  name: 'toolbar',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      toolbar: {
        hide: Toolbar.hide.bind(app),
        show: Toolbar.show.bind(app),
        setHighlight: Toolbar.setHighlight.bind(app),
        initHideToolbarOnScroll: Toolbar.initHideToolbarOnScroll.bind(app),
        init: Toolbar.init.bind(app),
      },
    });
  },
  params: {
    toolbar: {
      hideOnPageScroll: false,
      showOnPageScrollEnd: true,
      showOnPageScrollTop: true,
    },
  },
  on: {
    pageBeforeRemove: function pageBeforeRemove(page) {
      if (page.$el[0].f7ScrollToolbarHandler) {
        page.$el.off('scroll', '.page-content', page.$el[0].f7ScrollToolbarHandler, true);
      }
    },
    pageBeforeIn: function pageBeforeIn(page) {
      var app = this;
      if (app.theme !== 'ios') { return; }
      var $toolbarEl = page.$el.parents('.view').children('.toolbar');
      if ($toolbarEl.length === 0) {
        $toolbarEl = page.$el.find('.toolbar');
      }
      if ($toolbarEl.length === 0) {
        return;
      }
      if (page.$el.hasClass('no-toolbar')) {
        app.toolbar.hide($toolbarEl);
      } else {
        app.toolbar.show($toolbarEl);
      }
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.tabbar, .tabbar-labels').each(function (index, tabbarEl) {
        app.toolbar.init(tabbarEl);
      });
      if (app.params.toolbar.hideOnPageScroll || page.$el.find('.hide-toolbar-on-scroll').length || page.$el.hasClass('hide-toolbar-on-scroll') || page.$el.find('.hide-bars-on-scroll').length) {
        if (page.$el.find('.keep-toolbar-on-scroll').length || page.$el.find('.keep-bars-on-scroll').length) { return; }
        app.toolbar.initHideToolbarOnScroll(page.el);
      }
    },
  },
};

var Subnavbar = {
  name: 'subnavbar',
  on: {
    pageInit: function pageInit(page) {
      if (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length) {
        page.$el.addClass('page-with-subnavbar');
      }
      if (page.$el.find('.subnavbar').length) {
        page.$el.addClass('page-with-subnavbar');
      }
    },
  },
};

var TouchRipple$1 = function TouchRipple($el, x, y) {
  var ripple = this;
  if (!$el) { return undefined; }
  var box = $el[0].getBoundingClientRect();
  var center = {
    x: x - box.left,
    y: y - box.top,
  };
  var width = box.width;
  var height = box.height;
  var diameter = Math.max((Math.pow( ((Math.pow( height, 2 )) + (Math.pow( width, 2 ))), 0.5 )), 48);

  ripple.$rippleWaveEl = dom7$1(("<div class=\"ripple-wave\" style=\"width: " + diameter + "px; height: " + diameter + "px; margin-top:-" + (diameter / 2) + "px; margin-left:-" + (diameter / 2) + "px; left:" + (center.x) + "px; top:" + (center.y) + "px;\"></div>"));

  $el.prepend(ripple.$rippleWaveEl);

  var clientLeft = ripple.$rippleWaveEl[0].clientLeft;

  ripple.rippleTransform = "translate3d(" + (-center.x + (width / 2)) + "px, " + (-center.y + (height / 2)) + "px, 0) scale(1)";

  ripple.$rippleWaveEl.transform(ripple.rippleTransform);

  return ripple;
};
TouchRipple$1.prototype.onRemove = function onRemove () {
  var ripple = this;
  ripple.$rippleWaveEl.remove();
  Object.keys(ripple).forEach(function (key) {
    ripple[key] = null;
    delete ripple[key];
  });
  ripple = null;
};
TouchRipple$1.prototype.remove = function remove () {
  var ripple = this;
  if (ripple.removing) { return; }
  var $rippleWaveEl = this.$rippleWaveEl;
  var rippleTransform = this.rippleTransform;
  var removeTimeout = Utils$1.nextTick(function () {
    ripple.onRemove();
  }, 400);
  ripple.removing = true;
  $rippleWaveEl
    .addClass('ripple-wave-fill')
    .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
    .transitionEnd(function () {
      clearTimeout(removeTimeout);
      Utils$1.nextFrame(function () {
        $rippleWaveEl
          .addClass('ripple-wave-out')
          .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

        removeTimeout = Utils$1.nextTick(function () {
          ripple.onRemove();
        }, 700);

        $rippleWaveEl.transitionEnd(function () {
          clearTimeout(removeTimeout);
          ripple.onRemove();
        });
      });
    });
};

var TouchRipple = {
  name: 'touch-ripple',
  static: {
    TouchRipple: TouchRipple$1,
  },
  create: function create() {
    var app = this;
    app.touchRipple = {
      create: function create() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( TouchRipple$1, [ null ].concat( args) ));
      },
    };
  },
};

var openedModals = [];
var dialogsQueue = [];
function clearDialogsQueue() {
  if (dialogsQueue.length === 0) { return; }
  var dialog = dialogsQueue.shift();
  dialog.open();
}
var Modal$1 = (function (Framework7Class$$1) {
  function Modal(app, params) {
    Framework7Class$$1.call(this, params, [app]);

    var modal = this;

    var defaults = {};

    // Extend defaults with modules params
    modal.useInstanceModulesParams(defaults);

    modal.params = Utils$1.extend(defaults, params);

    // Install Modules
    modal.useInstanceModules();

    return this;
  }

  if ( Framework7Class$$1 ) Modal.__proto__ = Framework7Class$$1;
  Modal.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Modal.prototype.constructor = Modal;
  Modal.prototype.onOpen = function onOpen () {
    var modal = this;
    openedModals.push(modal);
    dom7$1('html').addClass(("with-modal-" + (modal.type.toLowerCase())));
    modal.$el.trigger(("modal:open " + (modal.type.toLowerCase()) + ":open"), modal);
    modal.emit(("modalOpen " + (modal.type) + "Open"), modal);
  };
  Modal.prototype.onOpened = function onOpened () {
    var modal = this;
    modal.$el.trigger(("modal:opened " + (modal.type.toLowerCase()) + ":opened"), modal);
    modal.emit(("modalOpened " + (modal.type) + "Opened"), modal);
  };
  Modal.prototype.onClose = function onClose () {
    var modal = this;
    openedModals.splice(openedModals.indexOf(modal), 1);
    dom7$1('html').removeClass(("with-modal-" + (modal.type.toLowerCase())));
    modal.$el.trigger(("modal:close " + (modal.type.toLowerCase()) + ":close"), modal);
    modal.emit(("modalClose " + (modal.type) + "Close"), modal);
  };
  Modal.prototype.onClosed = function onClosed () {
    var modal = this;
    modal.$el.removeClass('modal-out');
    modal.$el.hide();
    modal.$el.trigger(("modal:closed " + (modal.type.toLowerCase()) + ":closed"), modal);
    modal.emit(("modalClosed " + (modal.type) + "Closed"), modal);
  };
  Modal.prototype.open = function open (animate) {
    if ( animate === void 0 ) animate = true;

    var modal = this;
    var app = modal.app;
    var $el = modal.$el;
    var $backdropEl = modal.$backdropEl;
    var type = modal.type;

    if (!$el || $el.hasClass('modal-in')) {
      return modal;
    }

    if (type === 'dialog' && app.params.modals.queueDialogs) {
      var pushToQueue;
      if (dom7$1('.dialog.modal-in').length > 0) {
        pushToQueue = true;
      } else if (openedModals.length > 0) {
        openedModals.forEach(function (openedModal) {
          if (openedModal.type === 'dialog') { pushToQueue = true; }
        });
      }
      if (pushToQueue) {
        dialogsQueue.push(modal);
        return modal;
      }
    }

    var $modalParentEl = $el.parent();
    var wasInDom = $el.parents(document).length > 0;
    if (app.params.modals.moveToRoot && !$modalParentEl.is(app.root)) {
      app.root.append($el);
      modal.once((type + "Closed"), function () {
        if (wasInDom) {
          $modalParentEl.append($el);
        } else {
          $el.remove();
        }
      });
    }
    // Show Modal
    $el.show();

    // Set Dialog offset
    if (type === 'dialog') {
      $el.css({
        marginTop: ((-Math.round($el.outerHeight() / 2)) + "px"),
      });
    }

    // Emit open
    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    modal._clientLeft = $el[0].clientLeft;

    // Backdrop
    if ($backdropEl) {
      $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
      $backdropEl.addClass('backdrop-in');
    }
    // Modal
    if (animate) {
      $el
        .transitionEnd(function () {
          if ($el.hasClass('modal-out')) {
            modal.onClosed();
          } else {
            modal.onOpened();
          }
        })
        .removeClass('modal-out not-animated')
        .addClass('modal-in');
      modal.onOpen();
    } else {
      $el.removeClass('modal-out').addClass('modal-in not-animated');
      modal.onOpen();
      modal.onOpened();
    }

    return modal;
  };
  Modal.prototype.close = function close (animate) {
    if ( animate === void 0 ) animate = true;

    var modal = this;
    var $el = modal.$el;
    var $backdropEl = modal.$backdropEl;

    if (!$el || !$el.hasClass('modal-in')) {
      return modal;
    }

    // backdrop
    if ($backdropEl) {
      $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
      $backdropEl.removeClass('backdrop-in');
    }

    // Modal
    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    if (animate) {
      $el
        .transitionEnd(function () {
          if ($el.hasClass('modal-out')) {
            modal.onClosed();
          } else {
            modal.onOpened();
          }
        })
        .removeClass('modal-in')
        .addClass('modal-out');
      // Emit close
      modal.onClose();
    } else {
      $el
        .addClass('not-animated')
        .removeClass('modal-in')
        .addClass('modal-out');
      // Emit close
      modal.onClose();
      modal.onClosed();
    }

    if (modal.type === 'dialog') {
      clearDialogsQueue();
    }

    return modal;
  };
  Modal.prototype.destroy = function destroy () {
    var modal = this;
    modal.emit('modalBeforeDestroy', modal);
    if (modal.$el) {
      modal.$el.trigger(("modal:beforedestroy " + (modal.type.toLowerCase()) + ":beforedestroy"), modal);
    }
    Utils$1.deleteProps(modal);
    modal = null;
  };

  return Modal;
}(Framework7Class));

var Modal = {
  name: 'modal',
  static: {
    Modal: Modal$1,
  },
  params: {
    modals: {
      moveToRoot: true,

      queueDialogs: true,
      dialogTitle: 'Framework7',
      dialogButtonOk: 'OK',
      dialogButtonCancel: 'Cancel',
      dialogUsernamePlaceholder: 'Username',
      dialogPasswordPlaceholder: 'Password',
      dialogPreloaderTitle: 'Loading... ',
      dialogProgressTitle: 'Loading... ',
      dialogCloseByBackdropClick: false,

      popupCloseByBackdropClick: true,

      popoverCloseByBackdropClick: true,
      popoverCloseByOutsideClick: false,

      actionsToPopover: true,
      actionsCloseByBackdropClick: true,

      sheetCloseByBackdropClick: true,
      sheetCloseByOutsideClick: false,
    },
  },
};

var Dialog$1 = (function (Modal) {
  function Dialog(app, params) {
    var extendedParams = Utils$1.extend({
      title: app.params.modals.dialogTitle,
      text: undefined,
      content: '',
      buttons: [],
      verticalButtons: false,
      onClick: undefined,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var dialog = this;

    var title = extendedParams.title;
    var text = extendedParams.text;
    var content = extendedParams.content;
    var buttons = extendedParams.buttons;
    var verticalButtons = extendedParams.verticalButtons;
    var cssClass = extendedParams.cssClass;

    dialog.params = extendedParams;

    // Find Element
    var $el;
    if (!dialog.params.el) {
      var dialogClasses = ['dialog'];
      if (buttons.length === 0) { dialogClasses.push('dialog-no-buttons'); }
      if (buttons.length > 0) { dialogClasses.push(("dialog-buttons-" + (buttons.length))); }
      if (verticalButtons) { dialogClasses.push('dialog-buttons-vertical'); }
      if (cssClass) { dialogClasses.push(cssClass); }

      var buttonsHTML = '';
      if (buttons.length > 0) {
        buttonsHTML = "\n          <div class=\"dialog-buttons\">\n            " + (buttons.map(function (button) { return ("\n              <span class=\"dialog-button" + (button.bold ? ' dialog-button-bold' : '') + (button.color ? (" color-" + (button.color)) : '') + "\">" + (button.text) + "</span>\n            "); }).join('')) + "\n          </div>\n        ";
      }

      var dialogHtml = "\n        <div class=\"" + (dialogClasses.join(' ')) + "\">\n          <div class=\"dialog-inner\">\n            " + (title ? ("<div class=\"dialog-title\">" + title + "</div>") : '') + "\n            " + (text ? ("<div class=\"dialog-text\">" + text + "</div>") : '') + "\n            " + content + "\n          </div>\n          " + buttonsHTML + "\n        </div>\n      ";
      $el = dom7$1(dialogHtml);
    } else {
      $el = dom7$1(dialog.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return dialog.destroy();
    }

    var $backdropEl = app.root.children('.dialog-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = dom7$1('<div class="dialog-backdrop"></div>');
      app.root.append($backdropEl);
    }

    // Assign events
    function buttonOnClick(e) {
      var buttonEl = this;
      var index = dom7$1(buttonEl).index();
      var button = buttons[index];
      if (button.onClick) { button.onClick(dialog, e); }
      if (dialog.params.onClick) { dialog.params.onClick(dialog, index); }
      if (button.close !== false) { dialog.close(); }
    }
    if (buttons && buttons.length > 0) {
      $el.find('.dialog-button').each(function (index, buttonEl) {
        dom7$1(buttonEl).on('click', buttonOnClick);
      });
      dialog.on('close', function () {
        $el.find('.dialog-button').each(function (index, buttonEl) {
          dom7$1(buttonEl).off('click', buttonOnClick);
        });
      });
    }
    Utils$1.extend(dialog, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl[0],
      type: 'dialog',
      setProgress: function setProgress(progress, duration) {
        app.progressbar.set($el.find('.progressbar'), progress, duration);
        return dialog;
      },
      setText: function setText(newText) {
        var $textEl = $el.find('.dialog-text');
        if ($textEl.length === 0) {
          $textEl = dom7$1('<div class="dialog-text"></div>');
          if (typeof title !== 'undefined') {
            $textEl.insertAfter($el.find('.dialog-title'));
          } else {
            $el.find('.dialog-inner').prepend($textEl);
          }
        }
        $textEl.html(newText);
        dialog.params.text = newText;
        return dialog;
      },
      setTitle: function setTitle(newTitle) {
        var $titleEl = $el.find('.dialog-title');
        if ($titleEl.length === 0) {
          $titleEl = dom7$1('<div class="dialog-title"></div>');
          $el.find('.dialog-inner').prepend($titleEl);
        }
        $titleEl.html(newTitle);
        dialog.params.title = newTitle;
        return dialog;
      },
    });

    $el[0].f7Modal = dialog;

    return dialog;
  }

  if ( Modal ) Dialog.__proto__ = Modal;
  Dialog.prototype = Object.create( Modal && Modal.prototype );
  Dialog.prototype.constructor = Dialog;

  return Dialog;
}(Modal$1));

var Dialog = {
  name: 'dialog',
  static: {
    Dialog: Dialog$1,
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      dialog: {
        create: function create(params) {
          return new Dialog$1(app, params);
        },
        open: function open(dialogEl, animate) {
          var $dialogEl = dom7$1(dialogEl);
          var dialog = $dialogEl[0].f7Modal;
          if (!dialog) { dialog = new Dialog$1(app, { el: $dialogEl }); }
          return dialog.open(animate);
        },
        close: function close(dialogEl, animate) {
          if ( dialogEl === void 0 ) dialogEl = '.dialog.modal-in';

          var $dialogEl = dom7$1(dialogEl);
          if ($dialogEl.length === 0) { return undefined; }
          var dialog = $dialogEl[0].f7Modal;
          if (!dialog) { dialog = new Dialog$1(app, { el: $dialogEl }); }
          return dialog.close(animate);
        },
        get: function get(dialogEl) {
          if ( dialogEl === void 0 ) dialogEl = '.dialog.modal-in';

          var $dialogEl = dom7$1(dialogEl);
          if ($dialogEl.length === 0) { return undefined; }
          return $dialogEl[0].f7Modal;
        },

        // Shortcuts
        alert: function alert() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          if (args.length === 2 && typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], title = assign[2]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text: text,
            buttons: [{
              text: app.params.modals.dialogButtonOk,
              bold: true,
              onClick: callbackOk,
            }],
          }).open();
        },
        prompt: function prompt() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          var callbackCancel = args[3];
          if (typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text: text,
            content: '<div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="text" class="dialog-input"></div></div>',
            buttons: [
              {
                text: app.params.modals.dialogButtonCancel,
              },
              {
                text: app.params.modals.dialogButtonOk,
                bold: true,
              } ],
            onClick: function onClick(dialog, index) {
              var inputValue = dialog.$el.find('.dialog-input').val();
              if (index === 0 && callbackCancel) { callbackCancel(inputValue); }
              if (index === 1 && callbackOk) { callbackOk(inputValue); }
            },
          }).open();
        },
        confirm: function confirm() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          var callbackCancel = args[3];
          if (typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text: text,
            buttons: [
              {
                text: app.params.modals.dialogButtonCancel,
                onClick: callbackCancel,
              },
              {
                text: app.params.modals.dialogButtonOk,
                bold: true,
                onClick: callbackOk,
              } ],
          }).open();
        },
        login: function login() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          var callbackCancel = args[3];
          if (typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text: text,
            content: ("\n              <div class=\"dialog-input-field dialog-input-double item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"text\" name=\"dialog-username\" placeholder=\"" + (app.params.modals.dialogUsernamePlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>\n              <div class=\"dialog-input-field dialog-input-double item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"password\" name=\"dialog-password\" placeholder=\"" + (app.params.modals.dialogPasswordPlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>"),
            buttons: [
              {
                text: app.params.modals.dialogButtonCancel,
              },
              {
                text: app.params.modals.dialogButtonOk,
                bold: true,
              } ],
            onClick: function onClick(dialog, index) {
              var username = dialog.$el.find('[name="dialog-username"]').val();
              var password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) { callbackCancel(username, password); }
              if (index === 1 && callbackOk) { callbackOk(username, password); }
            },
          }).open();
        },
        password: function password() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var text = args[0];
          var title = args[1];
          var callbackOk = args[2];
          var callbackCancel = args[3];
          if (typeof args[1] === 'function') {
            var assign;
            (assign = args, text = assign[0], callbackOk = assign[1], callbackCancel = assign[2], title = assign[3]);
          }
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogTitle : title,
            text: text,
            content: ("\n              <div class=\"dialog-input-field item-input\">\n                <div class=\"item-input-wrap\">\n                  <input type=\"password\" name=\"dialog-password\" placeholder=\"" + (app.params.modals.dialogPasswordPlaceholder) + "\" class=\"dialog-input\">\n                </div>\n              </div>"),
            buttons: [
              {
                text: app.params.modals.dialogButtonCancel,
              },
              {
                text: app.params.modals.dialogButtonOk,
                bold: true,
              } ],
            onClick: function onClick(dialog, index) {
              var password = dialog.$el.find('[name="dialog-password"]').val();
              if (index === 0 && callbackCancel) { callbackCancel(password); }
              if (index === 1 && callbackOk) { callbackOk(password); }
            },
          }).open();
        },
        preloader: function preloader(title) {
          var preloaderInner = app.theme !== 'md' ? '' :
            '<span class="preloader-inner">' +
                '<span class="preloader-inner-gap"></span>' +
                '<span class="preloader-inner-left">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
                '<span class="preloader-inner-right">' +
                    '<span class="preloader-inner-half-circle"></span>' +
                '</span>' +
            '</span>';
          return new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogPreloaderTitle : title,
            content: ("<div class=\"preloader\">" + preloaderInner + "</div>"),
            cssClass: 'dialog-preloader',
          }).open();
        },
        progress: function progress() {
          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];

          var title = args[0];
          var progress = args[1];
          var color = args[2];
          if (args.length === 2) {
            if (typeof args[0] === 'number') {
              var assign;
              (assign = args, progress = assign[0], color = assign[1], title = assign[2]);
            } else if (typeof args[0] === 'string' && typeof args[1] === 'string') {
              var assign$1;
              (assign$1 = args, title = assign$1[0], color = assign$1[1], progress = assign$1[2]);
            }
          } else if (args.length === 1) {
            if (typeof args[0] === 'number') {
              var assign$2;
              (assign$2 = args, progress = assign$2[0], title = assign$2[1], color = assign$2[2]);
            }
          }
          var infinite = typeof progress === 'undefined';
          var dialog = new Dialog$1(app, {
            title: typeof title === 'undefined' ? app.params.modals.dialogProgressTitle : title,
            cssClass: 'dialog-progress',
            content: ("\n              <div class=\"progressbar" + (infinite ? '-infinite' : '') + (color ? (" color-" + color) : '') + "\">\n                " + (!infinite ? '<span></span>' : '') + "\n              </div>\n            "),
          });
          if (!infinite) { dialog.setProgress(progress); }
          return dialog.open();
        },
      },
    });
  },
  clicks: {
    '.dialog-backdrop': function closeDialog() {
      var app = this;
      if (!app.params.modals.dialogCloseByBackdropClick) { return; }
      app.dialog.close();
    },
  },
};

var Popup$1 = (function (Modal) {
  function Popup(app, params) {
    var extendedParams = Utils$1.extend({
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var popup = this;

    popup.params = extendedParams;

    // Find Element
    var $el;
    if (!popup.params.el) {
      $el = dom7$1(popup.params.content);
    } else {
      $el = dom7$1(popup.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return popup.destroy();
    }

    var $backdropEl = app.root.children('.popup-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = dom7$1('<div class="popup-backdrop"></div>');
      app.root.append($backdropEl);
    }

    Utils$1.extend(popup, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl[0],
      type: 'popup',
    });

    $el[0].f7Modal = popup;

    return popup;
  }

  if ( Modal ) Popup.__proto__ = Modal;
  Popup.prototype = Object.create( Modal && Modal.prototype );
  Popup.prototype.constructor = Popup;

  return Popup;
}(Modal$1));

var Popup = {
  name: 'popup',
  static: {
    Popup: Popup$1,
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      popup: {
        create: function create(params) {
          return new Popup$1(app, params);
        },
        open: function open(popupEl, animate) {
          var $popupEl = dom7$1(popupEl);
          var popup = $popupEl[0].f7Modal;
          if (!popup) { popup = new Popup$1(app, { el: $popupEl }); }
          return popup.open(animate);
        },
        close: function close(popupEl, animate) {
          if ( popupEl === void 0 ) popupEl = '.popup.modal-in';

          var $popupEl = dom7$1(popupEl);
          if ($popupEl.length === 0) { return undefined; }
          var popup = $popupEl[0].f7Modal;
          if (!popup) { popup = new Popup$1(app, { el: $popupEl }); }
          return popup.close(animate);
        },
        get: function get(popupEl) {
          if ( popupEl === void 0 ) popupEl = '.popup.modal-in';

          var $popupEl = dom7$1(popupEl);
          if ($popupEl.length === 0) { return undefined; }
          return $popupEl[0].f7Modal;
        },
      },
    });
  },
  clicks: {
    '.popup-open': function openPopup($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.popup.open(data.popup, data.animate);
    },
    '.popup-close': function closePopup($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.popup.close(data.popup, data.animate);
    },
    '.popup-backdrop': function closePopup() {
      var app = this;
      if (!app.params.modals.popupCloseByBackdropClick) { return; }
      app.popup.close();
    },
  },
};

var LoginScreen$1 = (function (Modal) {
  function LoginScreen(app, params) {
    var extendedParams = Utils$1.extend({
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var loginScreen = this;

    loginScreen.params = extendedParams;

    // Find Element
    var $el;
    if (!loginScreen.params.el) {
      $el = dom7$1(loginScreen.params.content);
    } else {
      $el = dom7$1(loginScreen.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return loginScreen.destroy();
    }

    Utils$1.extend(loginScreen, {
      app: app,
      $el: $el,
      el: $el[0],
      type: 'loginScreen',
    });

    $el[0].f7Modal = loginScreen;

    return loginScreen;
  }

  if ( Modal ) LoginScreen.__proto__ = Modal;
  LoginScreen.prototype = Object.create( Modal && Modal.prototype );
  LoginScreen.prototype.constructor = LoginScreen;

  return LoginScreen;
}(Modal$1));

var LoginScreen = {
  name: 'loginScreen',
  static: {
    LoginScreen: LoginScreen$1,
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      loginScreen: {
        create: function create(params) {
          return new LoginScreen$1(app, params);
        },
        open: function open(loginScreenEl, animate) {
          var $loginScreenEl = dom7$1(loginScreenEl);
          var loginScreen = $loginScreenEl[0].f7Modal;
          if (!loginScreen) { loginScreen = new LoginScreen$1(app, { el: $loginScreenEl }); }
          return loginScreen.open(animate);
        },
        close: function close(loginScreenEl, animate) {
          if ( loginScreenEl === void 0 ) loginScreenEl = '.login-screen.modal-in';

          var $loginScreenEl = dom7$1(loginScreenEl);
          if ($loginScreenEl.length === 0) { return undefined; }
          var loginScreen = $loginScreenEl[0].f7Modal;
          if (!loginScreen) { loginScreen = new LoginScreen$1(app, { el: $loginScreenEl }); }
          return loginScreen.close(animate);
        },
        get: function get(loginScreenEl) {
          if ( loginScreenEl === void 0 ) loginScreenEl = '.login-screen.modal-in';

          var $loginScreenEl = dom7$1(loginScreenEl);
          if ($loginScreenEl.length === 0) { return undefined; }
          return $loginScreenEl[0].f7Modal;
        },
      },
    });
  },
  clicks: {
    '.login-screen-open': function openLoginScreen($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.loginScreen.open(data.loginScreen, data.animate);
    },
    '.login-screen-close': function closeLoginScreen($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.loginScreen.close(data.loginScreen, data.animate);
    },
  },
};

var Popover$1 = (function (Modal) {
  function Popover(app, params) {
    var extendedParams = Utils$1.extend({
      backdrop: true,
      closeByOutsideClick: app.params.modals.popoverCloseByOutsideClick,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var popover = this;

    popover.params = extendedParams;

    // Find Element
    var $el;
    if (!popover.params.el) {
      $el = dom7$1(popover.params.content);
    } else {
      $el = dom7$1(popover.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    // Find Target
    var $targetEl = dom7$1(popover.params.targetEl).eq(0);

    if ($el.length === 0) {
      return popover.destroy();
    }

    // Backdrop
    var $backdropEl;
    if (popover.params.backdrop) {
      $backdropEl = app.root.children('.popover-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = dom7$1('<div class="popover-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    // Find Angle
    var $angleEl;
    if ($el.find('.popover-angle').length === 0) {
      $angleEl = dom7$1('<div class="popover-angle"></div>');
      $el.prepend($angleEl);
    } else {
      $angleEl = $el.find('.popover-angle');
    }

    // Open
    var originalOpen = popover.open;

    Utils$1.extend(popover, {
      app: app,
      $el: $el,
      el: $el[0],
      $targetEl: $targetEl,
      targetEl: $targetEl[0],
      $angleEl: $angleEl,
      angleEl: $angleEl[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popover',
      open: function open() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var targetEl = args[0];
        var animate = args[1];
        if (typeof args[0] === 'boolean') { var assign;
          (assign = args, animate = assign[0], targetEl = assign[1]); }
        if (targetEl) {
          popover.$targetEl = dom7$1(targetEl);
          popover.targetEl = popover.$targetEl[0];
        }
        originalOpen.call(popover, animate);
      },
    });

    function handleResize() {
      popover.resize();
    }
    popover.on('popoverOpen', function () {
      popover.resize();
      app.on('resize', handleResize);
      popover.on('popoverClose', function () {
        app.off('resize', handleResize);
      });
    });

    function handleClick(e) {
      var target = e.target;
      if (dom7$1(target).closest(popover.el).length === 0) {
        popover.close();
      }
    }

    popover.on('popoverOpened', function () {
      if (popover.params.closeByOutsideClick && !popover.params.backdrop) {
        app.on('click', handleClick);
      }
    });
    popover.on('popoverClose', function () {
      if (popover.params.closeByOutsideClick && !popover.params.backdrop) {
        app.off('click', handleClick);
      }
    });

    $el[0].f7Modal = popover;

    return popover;
  }

  if ( Modal ) Popover.__proto__ = Modal;
  Popover.prototype = Object.create( Modal && Modal.prototype );
  Popover.prototype.constructor = Popover;
  Popover.prototype.resize = function resize () {
    var popover = this;
    var app = popover.app;
    var $el = popover.$el;
    var $targetEl = popover.$targetEl;
    var $angleEl = popover.$angleEl;
    $el.css({ left: '', top: '' });
    var ref = [$el.width(), $el.height()];
    var width = ref[0];
    var height = ref[1];
    var angleSize = 0;
    var angleLeft;
    var angleTop;
    if (app.theme === 'ios') {
      $angleEl.removeClass('on-left on-right on-top on-bottom').css({ left: '', top: '' });
      angleSize = $angleEl.width() / 2;
    } else {
      $el.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({ left: '', top: '' });
    }

    var targetWidth = $targetEl.outerWidth();
    var targetHeight = $targetEl.outerHeight();
    var targetOffset = $targetEl.offset();
    var targetOffsetLeft = targetOffset.left - app.left;
    var targetOffsetTop = targetOffset.top - app.top;
    var targetParentPage = $targetEl.parents('.page');
    if (targetParentPage.length > 0) {
      targetOffsetTop -= targetParentPage[0].scrollTop;
    }

    var ref$1 = [0, 0, 0];
    var left = ref$1[0];
    var top = ref$1[1];
    var diff = ref$1[2];
    // Top Position
    var position = app.theme === 'md' ? 'bottom' : 'top';
    if (app.theme === 'md') {
      if (height < app.height - targetOffsetTop - targetHeight) {
        // On bottom
        position = 'bottom';
        top = targetOffsetTop;
      } else if (height < targetOffsetTop) {
        // On top
        top = (targetOffsetTop - height) + targetHeight;
        position = 'top';
      } else {
        // On middle
        position = 'bottom';
        top = targetOffsetTop;
      }

      if (top <= 0) {
        top = 8;
      } else if (top + height >= app.height) {
        top = app.height - height - 8;
      }

      // Horizontal Position
      left = (targetOffsetLeft + targetWidth) - width - 8;
      if (left + width >= app.width - 8) {
        left = (targetOffsetLeft + targetWidth) - width - 8;
      }
      if (left < 8) {
        left = 8;
      }
      if (position === 'top') {
        $el.addClass('popover-on-top');
      }
      if (position === 'bottom') {
        $el.addClass('popover-on-bottom');
      }
    } else {
      if ((height + angleSize) < targetOffsetTop) {
        // On top
        top = targetOffsetTop - height - angleSize;
      } else if ((height + angleSize) < app.height - targetOffsetTop - targetHeight) {
        // On bottom
        position = 'bottom';
        top = targetOffsetTop + targetHeight + angleSize;
      } else {
        // On middle
        position = 'middle';
        top = ((targetHeight / 2) + targetOffsetTop) - (height / 2);
        diff = top;
        if (top <= 0) {
          top = 5;
        } else if (top + height >= app.height) {
          top = app.height - height - 5;
        }
        diff -= top;
      }

      // Horizontal Position
      if (position === 'top' || position === 'bottom') {
        left = ((targetWidth / 2) + targetOffsetLeft) - (width / 2);
        diff = left;
        if (left < 5) { left = 5; }
        if (left + width > app.width) { left = app.width - width - 5; }
        if (left < 0) { left = 0; }
        if (position === 'top') {
          $angleEl.addClass('on-bottom');
        }
        if (position === 'bottom') {
          $angleEl.addClass('on-top');
        }
        diff -= left;
        angleLeft = ((width / 2) - angleSize) + diff;
        angleLeft = Math.max(Math.min(angleLeft, width - (angleSize * 2) - 13), 13);
        $angleEl.css({ left: (angleLeft + "px") });
      } else if (position === 'middle') {
        left = targetOffsetLeft - width - angleSize;
        $angleEl.addClass('on-right');
        if (left < 5 || (left + width > app.width)) {
          if (left < 5) { left = targetOffsetLeft + targetWidth + angleSize; }
          if (left + width > app.width) { left = app.width - width - 5; }
          $angleEl.removeClass('on-right').addClass('on-left');
        }
        angleTop = ((height / 2) - angleSize) + diff;
        angleTop = Math.max(Math.min(angleTop, height - (angleSize * 2) - 13), 13);
        $angleEl.css({ top: (angleTop + "px") });
      }
    }

    // Apply Styles
    $el.css({ top: (top + "px"), left: (left + "px") });
  };

  return Popover;
}(Modal$1));

var Popover = {
  name: 'popover',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      popover: {
        create: function create(params) {
          return new Popover$1(app, params);
        },
        open: function open(popoverEl, targetEl, animate) {
          var $popoverEl = dom7$1(popoverEl);
          var popover = $popoverEl[0].f7Modal;
          if (!popover) { popover = new Popover$1(app, { el: $popoverEl, targetEl: targetEl }); }
          return popover.open(targetEl, animate);
        },
        close: function close(popoverEl, animate) {
          if ( popoverEl === void 0 ) popoverEl = '.popover.modal-in';

          var $popoverEl = dom7$1(popoverEl);
          if ($popoverEl.length === 0) { return undefined; }
          var popover = $popoverEl[0].f7Modal;
          if (!popover) { popover = new Popover$1(app, { el: $popoverEl }); }
          return popover.close(animate);
        },
        get: function get(popoverEl) {
          if ( popoverEl === void 0 ) popoverEl = '.popover.modal-in';

          var $popoverEl = dom7$1(popoverEl);
          if ($popoverEl.length === 0) { return undefined; }
          return $popoverEl[0].f7Modal;
        },
      },
    });
  },
  clicks: {
    '.popover-open': function openPopover($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.popover.open(data.popover, $clickedEl, data.animate);
    },
    '.popover-close': function closePopover($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.popover.close(data.popover, data.animate);
    },
    '.popover-backdrop': function closePopover() {
      var app = this;
      if (!app.params.modals.popoverCloseByBackdropClick) { return; }
      app.popover.close();
    },
  },
};

var Actions$1 = (function (Modal) {
  function Actions(app, params) {
    var extendedParams = Utils$1.extend({
      toPopover: app.params.modals.actionsToPopover,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var actions = this;

    actions.params = extendedParams;

    // Buttons
    var groups;
    if (actions.params.buttons) {
      groups = actions.params.buttons;
      if (!Array.isArray(groups[0])) { groups = [groups]; }
    }

    // Find Element
    var $el;
    if (actions.params.el) {
      $el = dom7$1(actions.params.el);
    } else if (actions.params.content) {
      $el = dom7$1(actions.params.content);
    } else if (actions.params.buttons) {
      if (actions.params.toPopover) {
        actions.popoverHtml = "\n          <div class=\"popover popover-from-actions\">\n            <div class=\"popover-inner\">\n              " + (groups.map(function (group) { return ("\n                <div class=\"list\">\n                  <ul>\n                    " + (group.map(function (button) {
                      var itemClasses = [];
                      if (button.color) { itemClasses.push(("color-" + (button.color))); }
                      if (button.bg) { itemClasses.push(("bg-" + (button.bg))); }
                      if (button.bold) { itemClasses.push('popover-from-actions-bold'); }
                      if (button.disabled) { itemClasses.push('disabled'); }
                      if (button.label) {
                        itemClasses.push('popover-from-actions-label');
                        return ("<li class=\"" + (itemClasses.join(' ')) + "\">" + (button.text) + "</li>");
                      }
                      itemClasses.push('item-link');
                      if (button.icon) {
                        itemClasses.push('item-content');
                        return ("\n                          <li>\n                            <a class=\"" + (itemClasses.join(' ')) + "\">\n                              <div class=\"item-media\">\n                                " + (button.icon) + "\n                              </div>\n                              <div class=\"item-inner\">\n                                <div class=\"item-title\">\n                                  " + (button.text) + "\n                                </div>\n                              </div>\n                            </a>\n                          </li>\n                        ");
                      }
                      itemClasses.push('list-button');
                      return ("\n                        <li>\n                          <a href=\"#\" class=\"" + (itemClasses.join(' ')) + "\">" + (button.text) + "</a>\n                        </li>\n                      ");
                    }).join('')) + "\n                  </ul>\n                </div>\n              "); }).join('')) + "\n            </div>\n          </div>\n        ";
      }
      actions.actionsHtml = "\n        <div class=\"actions-modal" + (actions.params.grid ? ' actions-grid' : '') + "\">\n          " + (groups.map(function (group) { return ("<div class=\"actions-group\">\n              " + (group.map(function (button) {
                var buttonClasses = [("actions-" + (button.label ? 'label' : 'button'))];
                if (button.color) { buttonClasses.push(("color-" + (button.color))); }
                if (button.bg) { buttonClasses.push(("bg-" + (button.color))); }
                if (button.bold) { buttonClasses.push('actions-button-bold'); }
                if (button.disabled) { buttonClasses.push('disabled'); }
                if (button.label) {
                  return ("<div class=\"" + (buttonClasses.join(' ')) + "\">" + (button.text) + "</div>");
                }
                return ("<div class=\"" + (buttonClasses.join(' ')) + "\">" + (button.icon ? ("<div class=\"actions-button-media\">" + (button.icon) + "</div>") : '') + "<div class=\"actions-button-text\">" + (button.text) + "</div></div>");
              }).join('')) + "\n            </div>"); }).join('')) + "\n        </div>\n      ";
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el && $el.length === 0 && !(actions.actionsHtml || actions.popoverHtml)) {
      return actions.destroy();
    }

    // Backdrop
    var $backdropEl = app.root.children('.actions-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = dom7$1('<div class="actions-backdrop"></div>');
      app.root.append($backdropEl);
    }

    var originalOpen = actions.open;
    var originalClose = actions.close;

    var popover;
    function buttonOnClick(e) {
      var buttonEl = this;
      var buttonIndex;
      var groupIndex;
      if (dom7$1(buttonEl).hasClass('item-link')) {
        buttonIndex = dom7$1(buttonEl).parents('li').index();
        groupIndex = dom7$1(buttonEl).parents('.list').index();
      } else {
        buttonIndex = dom7$1(buttonEl).index();
        groupIndex = dom7$1(buttonEl).parents('.actions-group').index();
      }
      var button = groups[groupIndex][buttonIndex];
      if (button.onClick) { button.onClick(actions, e); }
      if (actions.params.onClick) { actions.params.onClick(actions, e); }
      if (button.close !== false) { actions.close(); }
    }
    actions.open = function open(animate) {
      var convertToPopover = false;
      if (actions.params.toPopover && actions.params.targetEl) {
        // Popover
        if (app.device.ios && app.device.ipad) {
          convertToPopover = true;
        } else if (app.width >= 768) {
          convertToPopover = true;
        }
      }
      if (convertToPopover) {
        popover = app.popover.create({
          content: actions.popoverHtml,
          targetEl: actions.params.targetEl,
        });
        popover.open(animate);
        popover.once('popoverOpened', function () {
          popover.$el.find('.item-link').each(function (groupIndex, buttonEl) {
            dom7$1(buttonEl).on('click', buttonOnClick);
          });
        });
        popover.once('popoverClosed', function () {
          popover.$el.find('.item-link').each(function (groupIndex, buttonEl) {
            dom7$1(buttonEl).on('click', buttonOnClick);
          });
        });
      } else {
        actions.$el = dom7$1(actions.actionsHtml);
        actions.$el[0].f7Modal = actions;
        actions.$el.find('.actions-button').each(function (groupIndex, buttonEl) {
          dom7$1(buttonEl).on('click', buttonOnClick);
        });
        actions.once('actionsClosed', function () {
          actions.$el.find('.list-button').each(function (groupIndex, buttonEl) {
            dom7$1(buttonEl).off('click', buttonOnClick);
          });
        });
        originalOpen.call(actions, animate);
      }
    };

    actions.close = function close(animate) {
      if (popover) {
        popover.close(animate).once('popoverClose', function () {
          popover.destroy();
          popover = undefined;
        });
      } else {
        originalClose.call(actions, animate);
      }
    };

    Utils$1.extend(actions, {
      app: app,
      $el: $el,
      el: $el ? $el[0] : undefined,
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl[0],
      type: 'actions',
    });

    if ($el) {
      $el[0].f7Modal = actions;
    }

    return actions;
  }

  if ( Modal ) Actions.__proto__ = Modal;
  Actions.prototype = Object.create( Modal && Modal.prototype );
  Actions.prototype.constructor = Actions;

  return Actions;
}(Modal$1));

var Actions = {
  name: 'actions',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      actions: {
        create: function create(params) {
          return new Actions$1(app, params);
        },
        open: function open(actionsEl, animate) {
          var $actionsEl = dom7$1(actionsEl);
          var actions = $actionsEl[0].f7Modal;
          if (!actions) { actions = new Actions$1(app, { el: $actionsEl }); }
          return actions.open(animate);
        },
        close: function close(actionsEl, animate) {
          if ( actionsEl === void 0 ) actionsEl = '.actions-modal.modal-in';

          var $actionsEl = dom7$1(actionsEl);
          if ($actionsEl.length === 0) { return undefined; }
          var actions = $actionsEl[0].f7Modal;
          if (!actions) { actions = new Actions$1(app, { el: $actionsEl }); }
          return actions.close(animate);
        },
        get: function get(actionsEl) {
          if ( actionsEl === void 0 ) actionsEl = '.actions-modal.modal-in';

          var $actionsEl = dom7$1(actionsEl);
          if ($actionsEl.length === 0) { return undefined; }
          return $actionsEl[0].f7Modal;
        },
      },
    });
  },
  clicks: {
    '.actions-open': function openActions($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.actions.open(data.actions, data.animate);
    },
    '.actions-close': function closeActions($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.actions.close(data.actions, data.animate);
    },
    '.actions-backdrop': function closeActions() {
      var app = this;
      if (!app.params.modals.actionsCloseByBackdropClick) { return; }
      app.actions.close();
    },
  },
};

var Sheet$1 = (function (Modal) {
  function Sheet(app, params) {
    var extendedParams = Utils$1.extend({
      backdrop: app.theme === 'md',
      closeByOutsideClick: app.params.modals.sheetCloseByOutsideClick,
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    Modal.call(this, app, extendedParams);

    var sheet = this;

    sheet.params = extendedParams;

    // Find Element
    var $el;
    if (!sheet.params.el) {
      $el = dom7$1(sheet.params.content);
    } else {
      $el = dom7$1(sheet.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return sheet.destroy();
    }
    var $backdropEl;
    if (sheet.params.backdrop) {
      $backdropEl = app.root.children('.sheet-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = dom7$1('<div class="sheet-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    var $pageContentEl;
    function scrollToOpen() {
      var $scrollEl = dom7$1(sheet.params.scrollToEl).eq(0);
      if ($scrollEl.length === 0) { return; }
      $pageContentEl = $scrollEl.parents('.page-content');
      if ($pageContentEl.length === 0) { return; }

      var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
      var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      var pageHeight = $pageContentEl[0].offsetHeight - paddingTop - $el.height();
      var pageScrollHeight = $pageContentEl[0].scrollHeight - paddingTop - $el.height();
      var pageScroll = $pageContentEl.scrollTop();

      var newPaddingBottom;

      var scrollElTop = ($scrollEl.offset().top - paddingTop) + $scrollEl[0].offsetHeight;
      if (scrollElTop > pageHeight) {
        var scrollTop = (pageScroll + scrollElTop) - pageHeight;
        if (scrollTop + pageHeight > pageScrollHeight) {
          newPaddingBottom = ((scrollTop + pageHeight) - pageScrollHeight) + paddingBottom;
          if (pageHeight === pageScrollHeight) {
            newPaddingBottom = $el.height();
          }
          $pageContentEl.css({
            'padding-bottom': (newPaddingBottom + "px"),
          });
        }
        $pageContentEl.scrollTop(scrollTop, 300);
      }
    }

    function scrollToClose() {
      if ($pageContentEl && $pageContentEl.length > 0) {
        $pageContentEl.css({
          'padding-bottom': '',
        });
      }
    }
    function handleClick(e) {
      var target = e.target;
      if (dom7$1(target).closest(sheet.el).length === 0) {
        sheet.close();
      }
    }

    sheet.on('sheetOpen', function () {
      if (sheet.params.scrollToEl) {
        scrollToOpen();
      }
    });
    sheet.on('sheetOpened', function () {
      if (sheet.params.closeByOutsideClick && !sheet.params.backdrop) {
        app.on('click', handleClick);
      }
    });
    sheet.on('sheetClose', function () {
      if (sheet.params.scrollToEl) {
        scrollToClose();
      }
      if (sheet.params.closeByOutsideClick && !sheet.params.backdrop) {
        app.off('click', handleClick);
      }
    });

    Utils$1.extend(sheet, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'sheet',
    });

    $el[0].f7Modal = sheet;

    return sheet;
  }

  if ( Modal ) Sheet.__proto__ = Modal;
  Sheet.prototype = Object.create( Modal && Modal.prototype );
  Sheet.prototype.constructor = Sheet;

  return Sheet;
}(Modal$1));

var Sheet = {
  name: 'sheet',
  static: {
    Sheet: Sheet$1,
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      sheet: {
        create: function create(params) {
          return new Sheet$1(app, params);
        },
        open: function open(sheetEl, animate) {
          var $sheetEl = dom7$1(sheetEl);
          var sheet = $sheetEl[0].f7Modal;
          if (!sheet) { sheet = new Sheet$1(app, { el: $sheetEl }); }
          return sheet.open(animate);
        },
        close: function close(sheetEl, animate) {
          if ( sheetEl === void 0 ) sheetEl = '.sheet-modal.modal-in';

          var $sheetEl = dom7$1(sheetEl);
          if ($sheetEl.length === 0) { return undefined; }
          var sheet = $sheetEl[0].f7Modal;
          if (!sheet) { sheet = new Sheet$1(app, { el: $sheetEl }); }
          return sheet.close(animate);
        },
        get: function get(sheetEl) {
          if ( sheetEl === void 0 ) sheetEl = '.sheet-modal.modal-in';

          var $sheetEl = dom7$1(sheetEl);
          if ($sheetEl.length === 0) { return undefined; }
          return $sheetEl[0].f7Modal;
        },
      },
    });
  },
  clicks: {
    '.sheet-open': function openPopup($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sheet.open(data.sheet, data.animate);
    },
    '.sheet-close': function closePopup($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sheet.close(data.sheet, data.animate);
    },
    '.sheet-backdrop': function closePopup() {
      var app = this;
      if (!app.params.modals.sheetCloseByBackdropClick) { return; }
      app.sheet.close();
    },
  },
};

var Preloader = {
  init: function init(el) {
    var app = this;
    if (app.theme !== 'md') { return; }
    var $el = dom7$1(el);
    if ($el.length === 0 || $el.children('.preloader-inner').length > 0) { return; }
    $el.append(
      '<span class="preloader-inner">' +
          '<span class="preloader-inner-gap"></span>' +
          '<span class="preloader-inner-left">' +
              '<span class="preloader-inner-half-circle"></span>' +
          '</span>' +
          '<span class="preloader-inner-right">' +
              '<span class="preloader-inner-half-circle"></span>' +
          '</span>' +
      '</span>');
  },
  // Modal
  visible: false,
  show: function show(color) {
    if ( color === void 0 ) color = 'white';

    var app = this;
    if (Preloader.visible) { return; }
    var preloaderInner = app.theme !== 'md' ? '' :
      '<span class="preloader-inner">' +
          '<span class="preloader-inner-gap"></span>' +
          '<span class="preloader-inner-left">' +
              '<span class="preloader-inner-half-circle"></span>' +
          '</span>' +
          '<span class="preloader-inner-right">' +
              '<span class="preloader-inner-half-circle"></span>' +
          '</span>' +
      '</span>';
    dom7$1('html').addClass('with-modal-preloader');
    app.root.append(("\n      <div class=\"preloader-backdrop\"></div>\n      <div class=\"preloader-modal\">\n        <div class=\"preloader color-" + color + "\">" + preloaderInner + "</div>\n      </div>\n    "));
    Preloader.visible = true;
  },
  hide: function hide() {
    var app = this;
    if (!Preloader.visible) { return; }
    dom7$1('html').removeClass('with-modal-preloader');
    app.root.find('.preloader-backdrop, .preloader-modal').remove();
    Preloader.visible = false;
  },
};
var Preloader$1 = {
  name: 'preloader',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      preloader: {
        init: Preloader.init.bind(app),
        show: Preloader.show.bind(app),
        hide: Preloader.hide.bind(app),
      },
    });
  },
  on: {
    pageInit: function pageInit(page) {
      var app = this;
      if (app.theme !== 'md') { return; }
      page.$el.find('.preloader').each(function (index, preloaderEl) {
        app.preloader.init(preloaderEl);
      });
    },
  },
};

var Progressbar = {
  set: function set() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var app = this;
    var el = args[0];
    var progress = args[1];
    var duration = args[2];
    if (typeof args[0] === 'number') {
      var assign;
      (assign = args, progress = assign[0], duration = assign[1]);
      el = app.root;
    }
    if (!progress) { progress = 0; }

    var $el = dom7$1(el || app.root);
    if ($el.length === 0) {
      return el;
    }
    var progressNormalized = Math.min(Math.max(progress, 0), 100);
    var $progressbarEl;
    if ($el.hasClass('progressbar')) { $progressbarEl = $el.eq(0); }
    else {
      $progressbarEl = $el.children('.progressbar');
    }
    if ($progressbarEl.length === 0 || $progressbarEl.hasClass('progressbar-infinite')) {
      return $progressbarEl;
    }
    var $progressbarLine = $progressbarEl.children('span');
    if ($progressbarLine.length === 0) {
      $progressbarLine = dom7$1('<span></span>');
      $progressbarEl.append($progressbarLine);
    }
    $progressbarLine
      .transition(typeof duration !== 'undefined' ? duration : '')
      .transform(("translate3d(" + ((-100 + progressNormalized)) + "%,0,0)"));

    return $progressbarEl[0];
  },
  show: function show() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var app = this;

    // '.page', 50, 'multi'
    var el = args[0];
    var progress = args[1];
    var color = args[2];
    var type = 'determined';

    if (args.length === 2) {
      if ((typeof args[0] === 'string' || typeof args[0] === 'object') && typeof args[1] === 'string') {
        // '.page', 'multi'
        var assign;
        (assign = args, el = assign[0], color = assign[1], progress = assign[2]);
        type = 'infinite';
      } else if (typeof args[0] === 'number' && typeof args[1] === 'string') {
        // 50, 'multi'
        var assign$1;
        (assign$1 = args, progress = assign$1[0], color = assign$1[1]);
        el = app.root;
      }
    } else if (args.length === 1) {
      if (typeof args[0] === 'number') {
        el = app.root;
        progress = args[0];
      } else if (typeof args[0] === 'string') {
        type = 'infinite';
        el = app.root;
        color = args[0];
      }
    } else if (args.length === 0) {
      type = 'infinite';
      el = app.root;
    }

    var $el = dom7$1(el);
    if ($el.length === 0) { return undefined; }

    var $progressbarEl;
    if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
      $progressbarEl = $el;
    } else {
      $progressbarEl = $el.children('.progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)');
      if ($progressbarEl.length === 0) {
        $progressbarEl = dom7$1(("\n          <span class=\"progressbar" + (type === 'infinite' ? '-infinite' : '') + (color ? (" color-" + color) : '') + " progressbar-in\">\n            " + (type === 'infinite' ? '' : '<span></span>') + "\n          </span>"));
        $el.append($progressbarEl);
      }
    }

    if (typeof progress !== 'undefined') {
      app.progressbar.set($progressbarEl, progress);
    }

    return $progressbarEl[0];
  },
  hide: function hide(el, removeAfterHide) {
    if ( removeAfterHide === void 0 ) removeAfterHide = true;

    var app = this;
    var $el = dom7$1(el || app.root);
    if ($el.length === 0) { return undefined; }
    var $progressbarEl;
    if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
      $progressbarEl = $el;
    } else {
      $progressbarEl = $el.children('.progressbar, .progressbar-infinite');
    }
    if ($progressbarEl.length === 0 || !$progressbarEl.hasClass('progressbar-in') || $progressbarEl.hasClass('progressbar-out')) {
      return $progressbarEl;
    }
    $progressbarEl
      .removeClass('progressbar-in')
      .addClass('progressbar-out')
      .animationEnd(function () {
        if (removeAfterHide) {
          $progressbarEl.remove();
        }
      });
    return $progressbarEl;
  },
};

var Progressbar$1 = {
  name: 'progressbar',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      progressbar: {
        set: Progressbar.set.bind(app),
        show: Progressbar.show.bind(app),
        hide: Progressbar.hide.bind(app),
      },
    });
  },
  on: {
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.progressbar').each(function (index, progressbarEl) {
        var $progressbarEl = dom7$1(progressbarEl);
        app.progressbar.set($progressbarEl, $progressbarEl.attr('data-progress'));
      });
    },
  },
};

var Sortable = {
  init: function init() {
    var app = this;
    var isTouched;
    var isMoved;
    var touchStartY;
    var touchesDiff;
    var $sortingEl;
    var $sortingItems;
    var $sortableContainer;
    var sortingElHeight;
    var minTop;
    var maxTop;
    var $insertAfterEl;
    var $insertBeforeEl;
    var indexFrom;
    var $pageEl;
    var $pageContentEl;
    var pageHeight;
    var pageOffset;
    var sortingElOffsetLocal;
    var sortingElOffsetTop;
    var initialScrollTop;

    function handleTouchStart(e) {
      isMoved = false;
      isTouched = true;
      touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      $sortingEl = dom7$1(this).parent('li');
      indexFrom = $sortingEl.index();
      $sortableContainer = $sortingEl.parents('.sortable');
      $sortingItems = $sortableContainer.children('ul').children('li');
      app.panel.allowOpen = false;
      app.swipeout.allow = false;
    }
    function handleTouchMove(e) {
      if (!isTouched || !$sortingEl) { return; }
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (!isMoved) {
        $pageEl = $sortingEl.parents('.page');
        $pageContentEl = $sortingEl.parents('.page-content');
        var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
        var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
        initialScrollTop = $pageContentEl[0].scrollTop;
        pageOffset = $pageEl.offset().top + paddingTop;
        pageHeight = $pageEl.height() - paddingTop - paddingBottom;
        $sortingEl.addClass('sorting');
        $sortableContainer.addClass('sortable-sorting');
        sortingElOffsetLocal = $sortingEl[0].offsetTop;
        minTop = $sortingEl[0].offsetTop;
        maxTop = $sortingEl.parent().height() - sortingElOffsetLocal - $sortingEl.height();
        sortingElHeight = $sortingEl[0].offsetHeight;
        sortingElOffsetTop = $sortingEl.offset().top;
      }
      isMoved = true;

      e.preventDefault();
      e.f7PreventPanelSwipe = true;

      touchesDiff = pageY - touchStartY;

      var translateScrollOffset = $pageContentEl[0].scrollTop - initialScrollTop;
      var translate = Math.min(Math.max(touchesDiff + translateScrollOffset, -minTop), maxTop);
      $sortingEl.transform(("translate3d(0," + translate + "px,0)"));

      var scrollAddition = 44;
      var allowScroll = true;
      if ((touchesDiff + translateScrollOffset) + scrollAddition < -minTop) {
        allowScroll = false;
      }
      if ((touchesDiff + translateScrollOffset) - scrollAddition > maxTop) {
        allowScroll = false;
      }

      $insertBeforeEl = undefined;
      $insertAfterEl = undefined;

      var scrollDiff;
      if (allowScroll) {
        if (sortingElOffsetTop + touchesDiff + sortingElHeight + scrollAddition > pageOffset + pageHeight) {
          // To Bottom
          scrollDiff = (sortingElOffsetTop + touchesDiff + sortingElHeight + scrollAddition) - (pageOffset + pageHeight);
        }
        if (sortingElOffsetTop + touchesDiff < pageOffset + scrollAddition) {
          // To Top
          scrollDiff = (sortingElOffsetTop + touchesDiff) - pageOffset - scrollAddition;
        }
        if (scrollDiff) {
          $pageContentEl[0].scrollTop += scrollDiff;
        }
      }

      $sortingItems.each(function (index, el) {
        var $currentEl = dom7$1(el);
        if ($currentEl[0] === $sortingEl[0]) { return; }
        var currentElOffset = $currentEl[0].offsetTop;
        var currentElHeight = $currentEl.height();
        var sortingElOffset = sortingElOffsetLocal + translate;

        if ((sortingElOffset >= currentElOffset - (currentElHeight / 2)) && $sortingEl.index() < $currentEl.index()) {
          $currentEl.transform(("translate3d(0, " + (-sortingElHeight) + "px,0)"));
          $insertAfterEl = $currentEl;
          $insertBeforeEl = undefined;
        } else if ((sortingElOffset <= currentElOffset + (currentElHeight / 2)) && $sortingEl.index() > $currentEl.index()) {
          $currentEl.transform(("translate3d(0, " + sortingElHeight + "px,0)"));
          $insertAfterEl = undefined;
          if (!$insertBeforeEl) { $insertBeforeEl = $currentEl; }
        } else {
          $currentEl.transform('translate3d(0, 0%,0)');
        }
      });
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        if (isTouched && !isMoved) {
          app.panel.allowOpen = true;
          app.swipeout.allow = true;
        }
        return;
      }
      app.panel.allowOpen = true;
      app.swipeout.allow = true;

      $sortingItems.transform('');
      $sortingEl.removeClass('sorting');
      $sortableContainer.removeClass('sortable-sorting');

      var virtualList;
      var oldIndex;
      var newIndex;
      if ($insertAfterEl) {
        $sortingEl.insertAfter($insertAfterEl);
      }
      if ($insertBeforeEl) {
        $sortingEl.insertBefore($insertBeforeEl);
      }

      $sortingEl.trigger('sortable:sort', { from: indexFrom, to: $sortingEl.index() });
      app.emit('sortableSort', $sortingEl[0], { from: indexFrom, to: $sortingEl.index() });

      if (($insertAfterEl || $insertBeforeEl) && $sortableContainer.hasClass('virtual-list')) {
        virtualList = $sortableContainer[0].f7VirtualList;
        oldIndex = $sortingEl[0].f7VirtualListIndex;
        newIndex = $insertBeforeEl ? $insertBeforeEl[0].f7VirtualListIndex : $insertAfterEl[0].f7VirtualListIndex;
        if (virtualList) { virtualList.moveItem(oldIndex, newIndex); }
      }
      $insertBeforeEl = undefined;
      $insertAfterEl = undefined;
      isTouched = false;
      isMoved = false;
    }

    var activeListener = app.support.passiveListener ? { passive: false, capture: false } : false;

    dom7$1(document).on(app.touchEvents.start, '.list.sortable .sortable-handler', handleTouchStart, activeListener);
    app.on('touchmove', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  },
  enable: function enable(el) {
    if ( el === void 0 ) el = '.list.sortable';

    var app = this;
    var $el = dom7$1(el);
    if ($el.length === 0) { return; }
    $el.addClass('sortable-enabled');
    $el.trigger('sortable:open');
    app.emit('sortableOpen', $el[0]);
  },
  disable: function disable(el) {
    if ( el === void 0 ) el = '.list.sortable';

    var app = this;
    var $el = dom7$1(el);
    if ($el.length === 0) { return; }
    $el.removeClass('sortable-enabled');
    $el.trigger('sortable:close');
    app.emit('sortableClose', $el[0]);
  },
  toggle: function toggle(el) {
    if ( el === void 0 ) el = '.list.sortable';

    var app = this;
    var $el = dom7$1(el);
    if ($el.length === 0) { return; }
    if ($el.hasClass('sortable-enabled')) {
      app.sortable.disable($el);
    } else {
      app.sortable.enable($el);
    }
  },
};
var Sortable$1 = {
  name: 'sortable',
  params: {
    sortable: true,
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      sortable: {
        init: Sortable.init.bind(app),
        enable: Sortable.enable.bind(app),
        disable: Sortable.disable.bind(app),
        toggle: Sortable.toggle.bind(app),
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      if (app.params.sortable) { app.sortable.init(); }
    },
  },
  clicks: {
    '.sortable-enable': function enable($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sortable.enable(data.sortable);
    },
    '.sortable-disable': function disable($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sortable.disable(data.sortable);
    },
    '.sortable-toggle': function toggle($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.sortable.toggle(data.sortable);
    },
  },
};

var Swipeout = {
  init: function init() {
    var app = this;
    var touchesStart = {};
    var isTouched;
    var isMoved;
    var isScrolling;
    var touchStartTime;
    var touchesDiff;
    var $swipeoutEl;
    var $swipeoutContent;
    var $actionsRight;
    var $actionsLeft;
    var actionsLeftWidth;
    var actionsRightWidth;
    var translate;
    var opened;
    var openedActionsSide;
    var $leftButtons;
    var $rightButtons;
    var direction;
    var $overswipeLeftButton;
    var $overswipeRightButton;
    var overswipeLeft;
    var overswipeRight;

    function handleTouchStart(e) {
      if (!Swipeout.allow) { return; }
      isMoved = false;
      isTouched = true;
      isScrolling = undefined;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchStartTime = (new Date()).getTime();
    }
    function handleTouchMove(e) {
      if (!isTouched) { return; }
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }

      if (!isMoved) {
        if (dom7$1('.list.sortable-opened').length > 0) { return; }
        $swipeoutEl = dom7$1(this);
        $swipeoutContent = $swipeoutEl.find('.swipeout-content');
        $actionsRight = $swipeoutEl.find('.swipeout-actions-right');
        $actionsLeft = $swipeoutEl.find('.swipeout-actions-left');
        actionsLeftWidth = null;
        actionsRightWidth = null;
        $leftButtons = null;
        $rightButtons = null;
        $overswipeRightButton = null;
        $overswipeLeftButton = null;
        if ($actionsLeft.length > 0) {
          actionsLeftWidth = $actionsLeft.outerWidth();
          $leftButtons = $actionsLeft.children('a');
          $overswipeLeftButton = $actionsLeft.find('.swipeout-overswipe');
        }
        if ($actionsRight.length > 0) {
          actionsRightWidth = $actionsRight.outerWidth();
          $rightButtons = $actionsRight.children('a');
          $overswipeRightButton = $actionsRight.find('.swipeout-overswipe');
        }
        opened = $swipeoutEl.hasClass('swipeout-opened');
        if (opened) {
          openedActionsSide = $swipeoutEl.find('.swipeout-actions-left.swipeout-actions-opened').length > 0 ? 'left' : 'right';
        }
        $swipeoutEl.removeClass('swipeout-transitioning');
        if (!app.params.swipeoutNoFollow) {
          $swipeoutEl.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
          $swipeoutEl.removeClass('swipeout-opened');
        }
      }
      isMoved = true;
      e.preventDefault();

      touchesDiff = pageX - touchesStart.x;
      translate = touchesDiff;

      if (opened) {
        if (openedActionsSide === 'right') { translate -= actionsRightWidth; }
        else { translate += actionsLeftWidth; }
      }

      if (
          (translate > 0 && $actionsLeft.length === 0)
          ||
          (translate < 0 && $actionsRight.length === 0)
      ) {
        if (!opened) {
          isTouched = false;
          isMoved = false;
          $swipeoutContent.transform('');
          if ($rightButtons && $rightButtons.length > 0) {
            $rightButtons.transform('');
          }
          if ($leftButtons && $leftButtons.length > 0) {
            $leftButtons.transform('');
          }
          return;
        }
        translate = 0;
      }

      if (translate < 0) { direction = 'to-left'; }
      else if (translate > 0) { direction = 'to-right'; }
      else if (!direction) { direction = 'to-left'; }

      var buttonOffset;
      var progress;

      e.f7PreventPanelSwipe = true;
      if (app.params.swipeoutNoFollow) {
        if (opened) {
          if (openedActionsSide === 'right' && touchesDiff > 0) {
            app.swipeout.close($swipeoutEl);
          }
          if (openedActionsSide === 'left' && touchesDiff < 0) {
            app.swipeout.close($swipeoutEl);
          }
        } else {
          if (touchesDiff < 0 && $actionsRight.length > 0) {
            app.swipeout.open($swipeoutEl, 'right');
          }
          if (touchesDiff > 0 && $actionsLeft.length > 0) {
            app.swipeout.open($swipeoutEl, 'left');
          }
        }
        isTouched = false;
        isMoved = false;
        return;
      }
      overswipeLeft = false;
      overswipeRight = false;
      if ($actionsRight.length > 0) {
        // Show right actions
        var buttonTranslate = translate;
        progress = buttonTranslate / actionsRightWidth;
        if (buttonTranslate < -actionsRightWidth) {
          buttonTranslate = -actionsRightWidth - (Math.pow( (-buttonTranslate - actionsRightWidth), 0.8 ));
          translate = buttonTranslate;
          if ($overswipeRightButton.length > 0) {
            overswipeRight = true;
          }
        }
        if (direction !== 'to-left') {
          progress = 0;
          buttonTranslate = 0;
        }
        $rightButtons.each(function (index, buttonEl) {
          var $buttonEl = dom7$1(buttonEl);
          if (typeof buttonEl.f7SwipeoutButtonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = buttonEl.offsetLeft;
          }
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if ($overswipeRightButton.length > 0 && $buttonEl.hasClass('swipeout-overswipe') && direction === 'to-left') {
            $buttonEl.css({ left: ((overswipeRight ? -buttonOffset : 0) + "px") });
            if (overswipeRight) {
              $buttonEl.addClass('swipeout-overswipe-active');
            } else {
              $buttonEl.removeClass('swipeout-overswipe-active');
            }
          }
          $buttonEl.transform(("translate3d(" + (buttonTranslate - (buttonOffset * (1 + Math.max(progress, -1)))) + "px,0,0)"));
        });
      }
      if ($actionsLeft.length > 0) {
        // Show left actions
        var buttonTranslate$1 = translate;
        progress = buttonTranslate$1 / actionsLeftWidth;
        if (buttonTranslate$1 > actionsLeftWidth) {
          buttonTranslate$1 = actionsLeftWidth + (Math.pow( (buttonTranslate$1 - actionsLeftWidth), 0.8 ));
          translate = buttonTranslate$1;
          if ($overswipeLeftButton.length > 0) {
            overswipeLeft = true;
          }
        }
        if (direction !== 'to-right') {
          buttonTranslate$1 = 0;
          progress = 0;
        }
        $leftButtons.each(function (index, buttonEl) {
          var $buttonEl = dom7$1(buttonEl);
          if (typeof buttonEl.f7SwipeoutButtonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = actionsLeftWidth - buttonEl.offsetLeft - buttonEl.offsetWidth;
          }
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if ($overswipeLeftButton.length > 0 && $buttonEl.hasClass('swipeout-overswipe') && direction === 'to-right') {
            $buttonEl.css({ left: ((overswipeLeft ? buttonOffset : 0) + "px") });
            if (overswipeLeft) {
              $buttonEl.addClass('swipeout-overswipe-active');
            } else {
              $buttonEl.removeClass('swipeout-overswipe-active');
            }
          }
          if ($leftButtons.length > 1) {
            $buttonEl.css('z-index', $leftButtons.length - index);
          }
          $buttonEl.transform(("translate3d(" + (buttonTranslate$1 + (buttonOffset * (1 - Math.min(progress, 1)))) + "px,0,0)"));
        });
      }
      $swipeoutEl.trigger('swipeout', progress);
      app.emit('swipeout', $swipeoutEl[0], progress);
      $swipeoutContent.transform(("translate3d(" + translate + "px,0,0)"));
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }

      isTouched = false;
      isMoved = false;
      var timeDiff = (new Date()).getTime() - touchStartTime;
      var $actions = direction === 'to-left' ? $actionsRight : $actionsLeft;
      var actionsWidth = direction === 'to-left' ? actionsRightWidth : actionsLeftWidth;
      var action;
      var $buttons;
      var i;

      if (
        (
          timeDiff < 300
          &&
          (
            (touchesDiff < -10 && direction === 'to-left')
            ||
            (touchesDiff > 10 && direction === 'to-right')
          )
        )
        ||
        (
          timeDiff >= 300
          &&
          (Math.abs(translate) > actionsWidth / 2)
        )
      ) {
        action = 'open';
      } else {
        action = 'close';
      }
      if (timeDiff < 300) {
        if (Math.abs(translate) === 0) { action = 'close'; }
        if (Math.abs(translate) === actionsWidth) { action = 'open'; }
      }

      if (action === 'open') {
        Swipeout.el = $swipeoutEl[0];
        $swipeoutEl.trigger('swipeout:open');
        app.emit('swipeoutOpen', $swipeoutEl[0]);
        $swipeoutEl.addClass('swipeout-opened swipeout-transitioning');
        var newTranslate = direction === 'to-left' ? -actionsWidth : actionsWidth;
        $swipeoutContent.transform(("translate3d(" + newTranslate + "px,0,0)"));
        $actions.addClass('swipeout-actions-opened');
        $buttons = direction === 'to-left' ? $rightButtons : $leftButtons;
        if ($buttons) {
          for (i = 0; i < $buttons.length; i += 1) {
            dom7$1($buttons[i]).transform(("translate3d(" + newTranslate + "px,0,0)"));
          }
        }
        if (overswipeRight) {
          $actionsRight.find('.swipeout-overswipe')[0].click();
        }
        if (overswipeLeft) {
          $actionsLeft.find('.swipeout-overswipe')[0].click();
        }
      } else {
        $swipeoutEl.trigger('swipeout:close');
        app.emit('swipeoutClose', $swipeoutEl[0]);
        Swipeout.el = undefined;
        $swipeoutEl.addClass('swipeout-transitioning').removeClass('swipeout-opened');
        $swipeoutContent.transform('');
        $actions.removeClass('swipeout-actions-opened');
      }

      var buttonOffset;
      if ($leftButtons && $leftButtons.length > 0 && $leftButtons !== $buttons) {
        $leftButtons.each(function (index, buttonEl) {
          var $buttonEl = dom7$1(buttonEl);
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if (typeof buttonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = actionsLeftWidth - buttonEl.offsetLeft - buttonEl.offsetWidth;
          }
          $buttonEl.transform(("translate3d(" + buttonOffset + "px,0,0)"));
        });
      }
      if ($rightButtons && $rightButtons.length > 0 && $rightButtons !== $buttons) {
        $rightButtons.each(function (index, buttonEl) {
          var $buttonEl = dom7$1(buttonEl);
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if (typeof buttonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = buttonEl.offsetLeft;
          }
          $buttonEl.transform(("translate3d(" + (-buttonOffset) + "px,0,0)"));
        });
      }
      $swipeoutContent.transitionEnd(function () {
        if ((opened && action === 'open') || (!opened && action === 'close')) { return; }
        $swipeoutEl.trigger(action === 'open' ? 'swipeout:opened' : 'swipeout:closed');
        app.emit(action === 'open' ? 'swipeoutOpened' : 'swipeoutClosed', $swipeoutEl[0]);
        $swipeoutEl.removeClass('swipeout-transitioning');
        if (opened && action === 'close') {
          if ($actionsRight.length > 0) {
            $rightButtons.transform('');
          }
          if ($actionsLeft.length > 0) {
            $leftButtons.transform('');
          }
        }
      });
    }

    var activeListener = app.support.passiveListener ? { passive: false } : false;
    var passiveListener = app.support.passiveListener ? { passive: true } : false;

    app.on('touchstart', function (e) {
      if (Swipeout.el) {
        var $targetEl = dom7$1(e.target);
        if (!(
          dom7$1(Swipeout.el).is($targetEl[0]) ||
          $targetEl.parents('.swipeout').is(Swipeout.el) ||
          $targetEl.hasClass('modal-in') ||
          $targetEl[0].className.indexOf('-backdrop') > 0 ||
          $targetEl.hasClass('actions-modal') ||
          $targetEl.parents('.actions-modal.modal-in, .dialog.modal-in').length > 0
          )) {
          app.swipeout.close(Swipeout.el);
        }
      }
    });
    dom7$1(document).on(app.touchEvents.start, 'li.swipeout', handleTouchStart, passiveListener);
    dom7$1(document).on(app.touchEvents.move, 'li.swipeout', handleTouchMove, activeListener);
    dom7$1(document).on(app.touchEvents.end, 'li.swipeout', handleTouchEnd, passiveListener);
  },
  allow: true,
  el: undefined,
  open: function open() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var app = this;
    var el = args[0];
    var side = args[1];
    var callback = args[2];
    if (typeof args[1] === 'function') {
      var assign;
      (assign = args, el = assign[0], callback = assign[1], side = assign[2]);
    }
    var $el = dom7$1(el).eq(0);

    if ($el.length === 0) { return; }
    if (!$el.hasClass('swipeout') || $el.hasClass('swipeout-opened')) { return; }
    if (!side) {
      if ($el.find('.swipeout-actions-right').length > 0) { side = 'right'; }
      else { side = 'left'; }
    }
    var $swipeoutActions = $el.find((".swipeout-actions-" + side));
    var $swipeoutContent = $el.find('.swipeout-content');
    if ($swipeoutActions.length === 0) { return; }
    $el.trigger('swipeout:open').addClass('swipeout-opened').removeClass('swipeout-transitioning');
    app.emit('swipeoutOpen', $el[0]);
    $swipeoutActions.addClass('swipeout-actions-opened');
    var $buttons = $swipeoutActions.children('a');
    var swipeoutActionsWidth = $swipeoutActions.outerWidth();
    var translate = side === 'right' ? -swipeoutActionsWidth : swipeoutActionsWidth;
    if ($buttons.length > 1) {
      $buttons.each(function (buttonIndex, buttonEl) {
        var $buttonEl = dom7$1(buttonEl);
        if (side === 'right') {
          $buttonEl.transform(("translate3d(" + (-buttonEl.offsetLeft) + "px,0,0)"));
        } else {
          $buttonEl.css('z-index', $buttons.length - buttonIndex).transform(("translate3d(" + (swipeoutActionsWidth - buttonEl.offsetWidth - buttonEl.offsetLeft) + "px,0,0)"));
        }
      });
    }
    $el.addClass('swipeout-transitioning');
    $swipeoutContent.transitionEnd(function () {
      $el.trigger('swipeout:opened');
      app.emit('swipeoutOpened', $el[0]);
      if (callback) { callback.call($el[0]); }
    });
    Utils$1.nextFrame(function () {
      $buttons.transform(("translate3d(" + translate + "px,0,0)"));
      $swipeoutContent.transform(("translate3d(" + translate + "px,0,0)"));
    });
    Swipeout.el = $el[0];
  },
  close: function close(el, callback) {
    var app = this;
    var $el = dom7$1(el).eq(0);
    if ($el.length === 0) { return; }
    if (!$el.hasClass('swipeout-opened')) { return; }
    var side = $el.find('.swipeout-actions-opened').hasClass('swipeout-actions-right') ? 'right' : 'left';
    var $swipeoutActions = $el.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
    var $buttons = $swipeoutActions.children('a');
    var swipeoutActionsWidth = $swipeoutActions.outerWidth();
    Swipeout.allow = false;
    $el.trigger('swipeout:close');
    app.emit('swipeoutClose', $el[0]);
    $el.removeClass('swipeout-opened').addClass('swipeout-transitioning');

    var closeTimeout;
    function onSwipeoutClose() {
      Swipeout.allow = true;
      if ($el.hasClass('swipeout-opened')) { return; }
      $el.removeClass('swipeout-transitioning');
      $buttons.transform('');
      $el.trigger('swipeout:closed');
      app.emit('swipeoutClosed', $el[0]);
      if (callback) { callback.call($el[0]); }
      if (closeTimeout) { clearTimeout(closeTimeout); }
    }
    $el.find('.swipeout-content').transform('').transitionEnd(onSwipeoutClose);
    closeTimeout = setTimeout(onSwipeoutClose, 500);

    $buttons.each(function (index, buttonEl) {
      var $buttonEl = dom7$1(buttonEl);
      if (side === 'right') {
        $buttonEl.transform(("translate3d(" + (-buttonEl.offsetLeft) + "px,0,0)"));
      } else {
        $buttonEl.transform(("translate3d(" + (swipeoutActionsWidth - buttonEl.offsetWidth - buttonEl.offsetLeft) + "px,0,0)"));
      }
      $buttonEl.css({ left: '0px' }).removeClass('swipeout-overswipe-active');
    });
    if (Swipeout.el && Swipeout.el === $el[0]) { Swipeout.el = undefined; }
  },
  delete: function delete$1(el, callback) {
    var app = this;
    var $el = dom7$1(el).eq(0);
    if ($el.length === 0) { return; }
    Swipeout.el = undefined;
    $el.trigger('swipeout:delete');
    app.emit('swipeoutDelete', $el[0]);
    $el.css({ height: (($el.outerHeight()) + "px") });
    $el.transitionEnd(function () {
      $el.trigger('swipeout:deleted');
      app.emit('swipeoutDeleted', $el[0]);
      if (callback) { callback.call($el[0]); }
      if ($el.parents('.virtual-list').length > 0) {
        var virtualList = $el.parents('.virtual-list')[0].f7VirtualList;
        var virtualIndex = $el[0].f7VirtualListIndex;
        if (virtualList && typeof virtualIndex !== 'undefined') { virtualList.deleteItem(virtualIndex); }
      } else if (app.params.swipeout.removeElements) {
        if (app.params.swipeout.removeElementsWithTimeout) {
          setTimeout(function () {
            $el.remove();
          }, app.params.swipeout.removeElementsTimeout);
        } else {
          $el.remove();
        }
      } else {
        $el.removeClass('swipeout-deleting swipeout-transitioning');
      }
    });
    Utils$1.nextFrame(function () {
      $el
        .addClass('swipeout-deleting swipeout-transitioning')
        .css({ height: '0px' })
        .find('.swipeout-content')
        .transform('translate3d(-100%,0,0)');
    });
  },
};
var Swipeout$1 = {
  name: 'swipeout',
  params: {
    swipeout: {
      actionsNoFold: false,
      noFollow: false,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
    },
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      swipeout: {
        init: Swipeout.init.bind(app),
        open: Swipeout.open.bind(app),
        close: Swipeout.close.bind(app),
        delete: Swipeout.delete.bind(app),
      },
    });
    Object.defineProperty(app.swipeout, 'el', {
      enumerable: true,
      configurable: true,
      get: function () { return Swipeout.el; },
      set: function set(el) {
        Swipeout.el = el;
      },
    });
    Object.defineProperty(app.swipeout, 'allow', {
      enumerable: true,
      configurable: true,
      get: function () { return Swipeout.allow; },
      set: function set(allow) {
        Swipeout.allow = allow;
      },
    });
  },
  clicks: {
    '.swipeout-open': function openSwipeout($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.swipeout.open(data.swipeout, data.side);
    },
    '.swipeout-close': function closeSwipeout($clickedEl) {
      var app = this;
      var $swipeoutEl = $clickedEl.closest('.swipeout');
      if ($swipeoutEl.length === 0) { return; }
      app.swipeout.close($swipeoutEl);
    },
    '.swipeout-delete': function deleteSwipeout($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var $swipeoutEl = $clickedEl.closest('.swipeout');
      if ($swipeoutEl.length === 0) { return; }
      var confirm = data.confirm;
      var confirmTitle = data.confirmTitle;
      if (data.confirm) {
        app.dialog.confirm(confirm, confirmTitle, function () {
          app.swipeout.delete($swipeoutEl);
        });
      } else {
        app.swipeout.delete($swipeoutEl);
      }
    },
  },
  on: {
    init: function init() {
      var app = this;
      app.swipeout.init();
    },
  },
};

var Accordion = {
  toggleClicked: function toggleClicked($clickedEl) {
    var app = this;
    var $accordionItemEl = $clickedEl.closest('.accordion-item').eq(0);
    if (!$accordionItemEl.length) { $accordionItemEl = $clickedEl.parents('li').eq(0); }
    app.accordion.toggle($accordionItemEl);
  },
  open: function open(el) {
    var app = this;
    var $el = dom7$1(el);
    var $list = $el.parents('.accordion-list').eq(0);
    var $contentEl = $el.children('.accordion-item-content');
    if ($contentEl.length === 0) { $contentEl = $el.find('.accordion-item-content'); }
    if ($contentEl.length === 0) { return; }
    var $openedItem = $list.length > 0 && $el.parent().children('.accordion-item-opened');
    if ($openedItem.length > 0) {
      app.accordion.close($openedItem);
    }
    $contentEl.transitionEnd(function () {
      if ($el.hasClass('accordion-item-opened')) {
        $contentEl.css('height', '');
        $contentEl.transition('');
        $el.trigger('accordion:opened');
        app.emit('accordionOpened', $el[0]);
      } else {
        $contentEl.css('height', '');
        $el.trigger('accordion:closed');
        app.emit('accordionClosed', $el[0]);
      }
    });
    $contentEl.css('height', (($contentEl[0].scrollHeight) + "px"));
    $el.trigger('accordion:open');
    $el.addClass('accordion-item-opened');
    app.emit('accordionOpen', $el[0]);
  },
  close: function close(el) {
    var app = this;
    var $el = dom7$1(el);
    var $contentEl = $el.children('.accordion-item-content');
    if ($contentEl.length === 0) { $contentEl = $el.find('.accordion-item-content'); }
    $el.removeClass('accordion-item-opened');
    $contentEl.transition(0);
    $contentEl.css('height', (($contentEl[0].scrollHeight) + "px"));
    // Close
    $contentEl.transitionEnd(function () {
      if ($el.hasClass('accordion-item-opened')) {
        $contentEl.css('height', '');
        $contentEl.transition('');
        $el.trigger('accordion:opened');
        app.emit('accordionOpened', $el[0]);
      } else {
        $contentEl.css('height', '');
        $el.trigger('accordion:closed');
        app.emit('accordionClosed', $el[0]);
      }
    });
    Utils$1.nextFrame(function () {
      $contentEl.transition('');
      $contentEl.css('height', '');
      $el.trigger('accordion:close');
      app.emit('accordionClose');
    });
  },
  toggle: function toggle(el) {
    var app = this;
    var $el = dom7$1(el);
    if ($el.length === 0) { return; }
    if ($el.hasClass('accordion-item-opened')) { app.accordion.close(el); }
    else { app.accordion.open(el); }
  },
};

var Accordion$1 = {
  name: 'accordion',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      accordion: {
        open: Accordion.open.bind(app),
        close: Accordion.close.bind(app),
        toggle: Accordion.toggle.bind(app),
      },
    });
  },
  clicks: {
    '.accordion-item .item-link, .accordion-item-toggle, .links-list.accordion-list > ul > li > a': function open($clickedEl) {
      var app = this;
      Accordion.toggleClicked.call(app, $clickedEl);
    },
  },
};

var VirtualList$1 = (function (Framework7Class$$1) {
  function VirtualList(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var vl = this;

    var defaults = {
      cols: 1,
      height: app.theme === 'md' ? 48 : 44,
      cache: true,
      dynamicHeightBufferSize: 1,
      showFilteredItemsOnly: false,
      renderExternal: undefined,
      setListHeight: true,
      on: {},
      template:
        '<li>' +
          '<div class="item-content">' +
            '<div class="item-inner">' +
              '<div class="item-title">{{this}}</div>' +
            '</div>' +
          '</div>' +
        '</li>',
    };

    // Extend defaults with modules params
    vl.useInstanceModulesParams(defaults);

    vl.params = Utils$1.extend(defaults, params);
    if (vl.params.height === undefined || !vl.params.height) {
      vl.params.height = app.theme === 'md' ? 48 : 44;
    }

    vl.$el = dom7$1(params.el);
    vl.el = vl.$el[0];

    if (vl.$el.length === 0) { return undefined; }
    vl.$el[0].f7VirtualList = vl;

    vl.items = vl.params.items;
    if (vl.params.showFilteredItemsOnly) {
      vl.filteredItems = [];
    }
    if (vl.params.template && !vl.params.renderItem) {
      if (typeof vl.params.template === 'string') { vl.template = t7.compile(vl.params.template); }
      else if (typeof vl.params.template === 'function') { vl.template = vl.params.template; }
    }
    vl.$pageContentEl = vl.$el.parents('.page-content');

    // Bad scroll
    if (typeof vl.params.updatableScroll !== 'undefined') {
      vl.updatableScroll = vl.params.updatableScroll;
    } else {
      vl.updatableScroll = true;
      if (Device$1.ios && Device$1.osVersion.split('.')[0] < 8) {
        vl.updatableScroll = false;
      }
    }

    // Append <ul>
    vl.ul = vl.params.ul ? dom7$1(vl.params.ul) : vl.$el.children('ul');
    if (vl.ul.length === 0) {
      vl.$el.append('<ul></ul>');
      vl.ul = vl.$el.children('ul');
    }

    Utils$1.extend(vl, {
      // DOM cached items
      domCache: {},
      displayDomCache: {},
      // Temporary DOM Element
      tempDomElement: document.createElement('ul'),
      // Last repain position
      lastRepaintY: null,
      // Fragment
      fragment: document.createDocumentFragment(),
      // Props
      pageHeight: undefined,
      rowsPerScreen: undefined,
      rowsBefore: undefined,
      rowsAfter: undefined,
      rowsToRender: undefined,
      maxBufferHeight: 0,
      listHeight: undefined,
      dynamicHeight: typeof vl.params.height === 'function',
    });

    // Install Modules
    vl.useInstanceModules();

    // Attach events
    var handleScrollBound = vl.handleScroll.bind(vl);
    var handleResizeBound = vl.handleResize.bind(vl);
    vl.attachEvents = function attachEvents() {
      vl.$pageContentEl.on('scroll', handleScrollBound);
      vl.$el.parents('.page').eq(0).on('page:reinit', handleResizeBound);
      vl.$el.parents('.tab').eq(0).on('tab:show', handleResizeBound);
      vl.$el.parents('.panel').eq(0).on('panel:open', handleResizeBound);
      vl.$el.parents('.popup').eq(0).on('popup:open', handleResizeBound);
      app.on('resize', handleResizeBound);
    };
    vl.detachEvents = function attachEvents() {
      vl.$pageContentEl.off('scroll', handleScrollBound);
      vl.$el.parents('.page').eq(0).off('page:reinit', handleResizeBound);
      vl.$el.parents('.tab').eq(0).off('tab:show', handleResizeBound);
      vl.$el.parents('.panel').eq(0).off('panel:open', handleResizeBound);
      vl.$el.parents('.popup').eq(0).off('popup:open', handleResizeBound);
      app.off('resize', handleResizeBound);
    };
    // Init
    vl.init();

    return vl;
  }

  if ( Framework7Class$$1 ) VirtualList.__proto__ = Framework7Class$$1;
  VirtualList.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  VirtualList.prototype.constructor = VirtualList;
  VirtualList.prototype.setListSize = function setListSize () {
    var vl = this;
    var items = vl.filteredItems || vl.items;
    vl.pageHeight = vl.$pageContentEl[0].offsetHeight;
    if (vl.dynamicHeight) {
      vl.listHeight = 0;
      vl.heights = [];
      for (var i = 0; i < items.length; i += 1) {
        var itemHeight = vl.params.height(items[i]);
        vl.listHeight += itemHeight;
        vl.heights.push(itemHeight);
      }
    } else {
      vl.listHeight = Math.ceil(items.length / vl.params.cols) * vl.params.height;
      vl.rowsPerScreen = Math.ceil(vl.pageHeight / vl.params.height);
      vl.rowsBefore = vl.params.rowsBefore || vl.rowsPerScreen * 2;
      vl.rowsAfter = vl.params.rowsAfter || vl.rowsPerScreen;
      vl.rowsToRender = (vl.rowsPerScreen + vl.rowsBefore + vl.rowsAfter);
      vl.maxBufferHeight = (vl.rowsBefore / 2) * vl.params.height;
    }

    if (vl.updatableScroll || vl.params.setListHeight) {
      vl.ul.css({ height: ((vl.listHeight) + "px") });
    }
  };
  VirtualList.prototype.render = function render (force, forceScrollTop) {
    var vl = this;
    if (force) { vl.lastRepaintY = null; }

    var scrollTop = -(vl.$el[0].getBoundingClientRect().top - vl.$pageContentEl[0].getBoundingClientRect().top);

    if (typeof forceScrollTop !== 'undefined') { scrollTop = forceScrollTop; }
    if (vl.lastRepaintY === null || Math.abs(scrollTop - vl.lastRepaintY) > vl.maxBufferHeight || (!vl.updatableScroll && (vl.$pageContentEl[0].scrollTop + vl.pageHeight >= vl.$pageContentEl[0].scrollHeight))) {
      vl.lastRepaintY = scrollTop;
    } else {
      return;
    }

    var items = vl.filteredItems || vl.items;
    var fromIndex;
    var toIndex;
    var heightBeforeFirstItem = 0;
    var heightBeforeLastItem = 0;
    if (vl.dynamicHeight) {
      var itemTop = 0;
      var itemHeight;
      vl.maxBufferHeight = vl.pageHeight;

      for (var j = 0; j < vl.heights.length; j += 1) {
        itemHeight = vl.heights[j];
        if (typeof fromIndex === 'undefined') {
          if (itemTop + itemHeight >= scrollTop - (vl.pageHeight * 2 * vl.params.dynamicHeightBufferSize)) { fromIndex = j; }
          else { heightBeforeFirstItem += itemHeight; }
        }

        if (typeof toIndex === 'undefined') {
          if (itemTop + itemHeight >= scrollTop + (vl.pageHeight * 2 * vl.params.dynamicHeightBufferSize) || j === vl.heights.length - 1) { toIndex = j + 1; }
          heightBeforeLastItem += itemHeight;
        }
        itemTop += itemHeight;
      }
      toIndex = Math.min(toIndex, items.length);
    } else {
      fromIndex = (parseInt(scrollTop / vl.params.height, 10) - vl.rowsBefore) * vl.params.cols;
      if (fromIndex < 0) {
        fromIndex = 0;
      }
      toIndex = Math.min(fromIndex + (vl.rowsToRender * vl.params.cols), items.length);
    }

    var topPosition;
    var renderExternalItems = [];
    vl.reachEnd = false;
    var i;
    for (i = fromIndex; i < toIndex; i += 1) {
      var itemEl = (void 0);
      // Define real item index
      var index = vl.items.indexOf(items[i]);

      if (i === fromIndex) { vl.currentFromIndex = index; }
      if (i === toIndex - 1) { vl.currentToIndex = index; }
      if (vl.filteredItems) {
        if (vl.items[index] === vl.filteredItems[vl.filteredItems.length - 1]) { vl.reachEnd = true; }
      } else if (index === vl.items.length - 1) { vl.reachEnd = true; }

      // Find items
      if (vl.params.renderExternal) {
        renderExternalItems.push(items[i]);
      } else if (vl.domCache[index]) {
        itemEl = vl.domCache[index];
        itemEl.f7VirtualListIndex = index;
      } else {
        if (vl.template && !vl.params.renderItem) {
          vl.tempDomElement.innerHTML = vl.template(items[i], { index: index }).trim();
        } else if (vl.params.renderItem) {
          vl.tempDomElement.innerHTML = vl.params.renderItem(index, items[i]).trim();
        } else {
          vl.tempDomElement.innerHTML = items[i].toString().trim();
        }
        itemEl = vl.tempDomElement.childNodes[0];
        if (vl.params.cache) { vl.domCache[index] = itemEl; }
        itemEl.f7VirtualListIndex = index;
      }

      // Set item top position
      if (i === fromIndex) {
        if (vl.dynamicHeight) {
          topPosition = heightBeforeFirstItem;
        } else {
          topPosition = ((i * vl.params.height) / vl.params.cols);
        }
      }
      if (!vl.params.renderExternal) {
        itemEl.style.top = topPosition + "px";

        // Before item insert
        vl.emit({
          events: 'itemBeforeInsert',
          data: [itemEl, items[i]],
          parents: [],
        });
        vl.emit('vlItemBeforeInsert', vl, itemEl, items[i]);

        // Append item to fragment
        vl.fragment.appendChild(itemEl);
      }
    }

    // Update list height with not updatable scroll
    if (!vl.updatableScroll) {
      if (vl.dynamicHeight) {
        vl.ul[0].style.height = heightBeforeLastItem + "px";
      } else {
        vl.ul[0].style.height = ((i * vl.params.height) / vl.params.cols) + "px";
      }
    }

      // Update list html
    if (vl.params.renderExternal) {
      if (items && items.length === 0) {
        vl.reachEnd = true;
      }
    } else {
      vl.emit({
        events: 'beforeClear',
        data: [vl.fragment],
        parents: [],
      });
      vl.emit('vlBeforeClear', vl, vl.fragment);
      vl.ul[0].innerHTML = '';

      vl.emit({
        events: 'itemsBeforeInsert',
        data: [vl.fragment],
        parents: [],
      });
      vl.emit('vlItemsBeforeInsert', vl, vl.fragment);

      if (items && items.length === 0) {
        vl.reachEnd = true;
        if (vl.params.emptyTemplate) { vl.ul[0].innerHTML = vl.params.emptyTemplate; }
      } else {
        vl.ul[0].appendChild(vl.fragment);
      }

      vl.emit({
        events: 'itemsAfterInsert',
        data: [vl.fragment],
        parents: [],
      });
      vl.emit('vlItemsAfterInsert', vl, vl.fragment);
    }

    if (typeof forceScrollTop !== 'undefined' && force) {
      vl.$pageContentEl.scrollTop(forceScrollTop, 0);
    }
    if (vl.params.renderExternal) {
      vl.params.renderExternal(vl, {
        fromIndex: fromIndex,
        toIndex: toIndex,
        listHeight: vl.listHeight,
        topPosition: topPosition,
        items: renderExternalItems,
      });
    }
  };
  // Filter
  VirtualList.prototype.filterItems = function filterItems (indexes, resetScrollTop) {
    if ( resetScrollTop === void 0 ) resetScrollTop = true;

    var vl = this;
    vl.filteredItems = [];
    for (var i = 0; i < indexes.length; i += 1) {
      vl.filteredItems.push(vl.items[indexes[i]]);
    }
    if (resetScrollTop) {
      vl.$pageContentEl[0].scrollTop = 0;
    }
    vl.update();
  };
  VirtualList.prototype.resetFilter = function resetFilter () {
    var vl = this;
    if (vl.params.showFilteredItemsOnly) {
      vl.filteredItems = [];
    } else {
      vl.filteredItems = null;
      delete vl.filteredItems;
    }
    vl.update();
  };
  VirtualList.prototype.scrollToItem = function scrollToItem (index) {
    var vl = this;
    if (index > vl.items.length) { return false; }
    var itemTop = 0;
    if (vl.dynamicHeight) {
      for (var i = 0; i < index; i += 1) {
        itemTop += vl.heights[i];
      }
    } else {
      itemTop = index * vl.params.height;
    }
    var listTop = vl.$el[0].offsetTop;
    vl.render(true, (listTop + itemTop) - parseInt(vl.$pageContentEl.css('padding-top'), 10));
    return true;
  };
  VirtualList.prototype.handleScroll = function handleScroll () {
    var vl = this;
    vl.render();
  };
  // Handle resize event
  VirtualList.prototype.isVisible = function isVisible () {
    var vl = this;
    return !!(vl.el.offsetWidth || vl.el.offsetHeight || vl.el.getClientRects().length);
  };
  VirtualList.prototype.handleResize = function handleResize () {
    var vl = this;
    if (vl.isVisible()) {
      vl.setListSize();
      vl.render(true);
    }
  };
  // Append
  VirtualList.prototype.appendItems = function appendItems (items) {
    var vl = this;
    for (var i = 0; i < items.length; i += 1) {
      vl.items.push(items[i]);
    }
    vl.update();
  };
  VirtualList.prototype.appendItem = function appendItem (item) {
    var vl = this;
    vl.appendItems([item]);
  };
  // Replace
  VirtualList.prototype.replaceAllItems = function replaceAllItems (items) {
    var vl = this;
    vl.items = items;
    delete vl.filteredItems;
    vl.domCache = {};
    vl.update();
  };
  VirtualList.prototype.replaceItem = function replaceItem (index, item) {
    var vl = this;
    vl.items[index] = item;
    if (vl.params.cache) { delete vl.domCache[index]; }
    vl.update();
  };
  // Prepend
  VirtualList.prototype.prependItems = function prependItems (items) {
    var vl = this;
    for (var i = items.length - 1; i >= 0; i -= 1) {
      vl.items.unshift(items[i]);
    }
    if (vl.params.cache) {
      var newCache = {};
      Object.keys(vl.domCache).forEach(function (cached) {
        newCache[parseInt(cached, 10) + items.length] = vl.domCache[cached];
      });
      vl.domCache = newCache;
    }
    vl.update();
  };
  VirtualList.prototype.prependItem = function prependItem (item) {
    var vl = this;
    vl.prependItems([item]);
  };

  // Move
  VirtualList.prototype.moveItem = function moveItem (from, to) {
    var vl = this;
    var fromIndex = from;
    var toIndex = to;
    if (fromIndex === toIndex) { return; }
      // remove item from array
    var item = vl.items.splice(fromIndex, 1)[0];
    if (toIndex >= vl.items.length) {
      // Add item to the end
      vl.items.push(item);
      toIndex = vl.items.length - 1;
    } else {
      // Add item to new index
      vl.items.splice(toIndex, 0, item);
    }
      // Update cache
    if (vl.params.cache) {
      var newCache = {};
      Object.keys(vl.domCache).forEach(function (cached) {
        var cachedIndex = parseInt(cached, 10);
        var leftIndex = fromIndex < toIndex ? fromIndex : toIndex;
        var rightIndex = fromIndex < toIndex ? toIndex : fromIndex;
        var indexShift = fromIndex < toIndex ? -1 : 1;
        if (cachedIndex < leftIndex || cachedIndex > rightIndex) { newCache[cachedIndex] = vl.domCache[cachedIndex]; }
        if (cachedIndex === leftIndex) { newCache[rightIndex] = vl.domCache[cachedIndex]; }
        if (cachedIndex > leftIndex && cachedIndex <= rightIndex) { newCache[cachedIndex + indexShift] = vl.domCache[cachedIndex]; }
      });
      vl.domCache = newCache;
    }
    vl.update();
  };
  // Insert before
  VirtualList.prototype.insertItemBefore = function insertItemBefore (index, item) {
    var vl = this;
    if (index === 0) {
      vl.prependItem(item);
      return;
    }
    if (index >= vl.items.length) {
      vl.appendItem(item);
      return;
    }
    vl.items.splice(index, 0, item);
      // Update cache
    if (vl.params.cache) {
      var newCache = {};
      Object.keys(vl.domCache).forEach(function (cached) {
        var cachedIndex = parseInt(cached, 10);
        if (cachedIndex >= index) {
          newCache[cachedIndex + 1] = vl.domCache[cachedIndex];
        }
      });
      vl.domCache = newCache;
    }
    vl.update();
  };
  // Delete
  VirtualList.prototype.deleteItems = function deleteItems (indexes) {
    var vl = this;
    var prevIndex;
    var indexShift = 0;
    var loop = function ( i ) {
      var index = indexes[i];
      if (typeof prevIndex !== 'undefined') {
        if (index > prevIndex) {
          indexShift = -i;
        }
      }
      index += indexShift;
      prevIndex = indexes[i];
      // Delete item
      var deletedItem = vl.items.splice(index, 1)[0];

      // Delete from filtered
      if (vl.filteredItems && vl.filteredItems.indexOf(deletedItem) >= 0) {
        vl.filteredItems.splice(vl.filteredItems.indexOf(deletedItem), 1);
      }
      // Update cache
      if (vl.params.cache) {
        var newCache = {};
        Object.keys(vl.domCache).forEach(function (cached) {
          var cachedIndex = parseInt(cached, 10);
          if (cachedIndex === index) {
            delete vl.domCache[index];
          } else if (parseInt(cached, 10) > index) {
            newCache[cachedIndex - 1] = vl.domCache[cached];
          } else {
            newCache[cachedIndex] = vl.domCache[cached];
          }
        });
        vl.domCache = newCache;
      }
    };

    for (var i = 0; i < indexes.length; i += 1) loop( i );
    vl.update();
  };
  VirtualList.prototype.deleteAllItems = function deleteAllItems () {
    var vl = this;
    vl.items = [];
    delete vl.filteredItems;
    if (vl.params.cache) { vl.domCache = {}; }
    vl.update();
  };
  VirtualList.prototype.deleteItem = function deleteItem (index) {
    var vl = this;
    vl.deleteItems([index]);
  };
  // Clear cache
  VirtualList.prototype.clearCachefunction = function clearCachefunction () {
    var vl = this;
    vl.domCache = {};
  };
  // Update Virtual List
  VirtualList.prototype.update = function update () {
    var vl = this;
    vl.setListSize();
    vl.render(true);
  };
  VirtualList.prototype.init = function init () {
    var vl = this;
    vl.attachEvents();
    vl.setListSize();
    vl.render();
  };
  VirtualList.prototype.destroy = function destroy () {
    var vl = this;
    vl.detachEvents();
    vl.$el[0].f7VirtualList = null;
    delete vl.$el[0].f7VirtualList;
    Utils$1.deleteProps(vl);
    vl = null;
  };

  return VirtualList;
}(Framework7Class));

var VirtualList = {
  name: 'virtualList',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      virtualList: {
        create: function create(params) {
          return new VirtualList$1(app, params);
        },
        destroy: function destroy(listEl) {
          var $listEl = dom7$1(listEl);
          if (!$listEl.length) { return undefined; }
          var virtualList = $listEl[0].f7VirtualList;
          if (!virtualList) { return undefined; }
          return virtualList.destroy();
        },
      },
    });
  },
};

var Timeline = {
  name: 'timeline',
};

var Tab = {
  show: function show() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var app = this;
    var tab = args[0];
    var tabLink = args[1];
    var animate = args[2];
    var tabRoute = args[3];
    if (typeof args[1] === 'boolean') {
      var assign;
      (assign = args, tab = assign[0], animate = assign[1], tabLink = assign[2], tabRoute = assign[3]);
      if (args.length > 2 && tabLink.constructor === Object) {
        var assign$1;
        (assign$1 = args, tab = assign$1[0], animate = assign$1[1], tabRoute = assign$1[2], tabLink = assign$1[3]);
      }
    }
    if (typeof animate === 'undefined') { animate = true; }

    var $newTabEl = dom7$1(tab);

    if ($newTabEl.length === 0 || $newTabEl.hasClass('tab-active')) {
      return {
        $newTabEl: $newTabEl,
        newTabEl: $newTabEl[0],
      };
    }


    var $tabLinkEl;
    if (tabLink) { $tabLinkEl = dom7$1(tabLink); }

    var $tabsEl = $newTabEl.parent('.tabs');
    if ($tabsEl.length === 0) {
      return {
        $newTabEl: $newTabEl,
        newTabEl: $newTabEl[0],
      };
    }

    // Release swipeouts in hidden tabs
    if (app.swipeout) { app.swipeout.allowOpen = true; }

    // Animated tabs
    var isAnimatedTabs = $tabsEl.parent().hasClass('tabs-animated-wrap');
    if (isAnimatedTabs) {
      $tabsEl.parent()[animate ? 'removeClass' : 'addClass']('not-animated');
      var tabsTranslate = (app.rtl ? $newTabEl.index() : -$newTabEl.index()) * 100;
      $tabsEl.transform(("translate3d(" + tabsTranslate + "%,0,0)"));
    }

    // Swipeable tabs
    var isSwipeableTabs = $tabsEl.parent().hasClass('tabs-swipeable-wrap');
    var swiper;
    if (isSwipeableTabs && app.swiper) {
      swiper = $tabsEl.parent()[0].swiper;
      if (swiper.activeIndex !== $newTabEl.index()) {
        swiper.slideTo($newTabEl.index(), animate ? undefined : 0, false);
      }
    }

    // Remove active class from old tabs
    var $oldTabEl = $tabsEl.children('.tab-active');
    $oldTabEl
      .removeClass('tab-active')
      .trigger('tab:hide');
    app.emit('tabHide', $oldTabEl[0]);

    // Trigger 'show' event on new tab
    $newTabEl
      .addClass('tab-active')
      .trigger('tab:show');
    app.emit('tabShow', $newTabEl[0]);

    // Find related link for new tab
    if (!$tabLinkEl) {
      // Search by id
      if (typeof tab === 'string') { $tabLinkEl = dom7$1((".tab-link[href=\"" + tab + "\"]")); }
      else { $tabLinkEl = dom7$1((".tab-link[href=\"#" + ($newTabEl.attr('id')) + "\"]")); }
      // Search by data-tab
      if (!$tabLinkEl || ($tabLinkEl && $tabLinkEl.length === 0)) {
        dom7$1('[data-tab]').each(function (index, el) {
          if ($newTabEl.is(dom7$1(el).attr('data-tab'))) { $tabLinkEl = dom7$1(el); }
        });
      }
      if (tabRoute && (!$tabLinkEl || ($tabLinkEl && $tabLinkEl.length === 0))) {
        $tabLinkEl = dom7$1(("[data-route-tab-id=\"" + (tabRoute.route.tab.id) + "\"]"));
        if ($tabLinkEl.length === 0) {
          $tabLinkEl = dom7$1((".tab-link[href=\"" + (tabRoute.url) + "\"]"));
        }
      }
    }
    if ($tabLinkEl.length > 0) {
      // Find related link for old tab
      var $oldTabLinkEl;
      if ($oldTabEl && $oldTabEl.length > 0) {
        // Search by id
        var oldTabId = $oldTabEl.attr('id');
        if (oldTabId) { $oldTabLinkEl = dom7$1((".tab-link[href=\"#" + oldTabId + "\"]")); }
          // Search by data-tab
        if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
          dom7$1('[data-tab]').each(function (index, tabLinkEl) {
            if ($oldTabEl.is(dom7$1(tabLinkEl).attr('data-tab'))) { $oldTabLinkEl = dom7$1(tabLinkEl); }
          });
        }
        if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
          $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
        }
      }

      if ($oldTabLinkEl && $oldTabLinkEl.length > 0) { $oldTabLinkEl.removeClass('tab-link-active'); }

      // Update links' classes
      if ($tabLinkEl && $tabLinkEl.length > 0) {
        $tabLinkEl.addClass('tab-link-active');
        // Material Highlight
        if (app.theme === 'md' && app.toolbar) {
          var $tabbarEl = $tabLinkEl.parents('.tabbar, .tabbar-labels');
          if ($tabbarEl.length > 0) {
            app.toolbar.setHighlight($tabbarEl);
          }
        }
      }
    }
    return {
      $newTabEl: $newTabEl,
      newTabEl: $newTabEl[0],
      $oldTabEl: $oldTabEl,
      oldTabEl: $oldTabEl[0],
    };
  },
};
var Tabs = {
  name: 'tabs',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      tab: {
        show: Tab.show.bind(app),
      },
    });
  },
  clicks: {
    '.tab-link': function tabLinkClick($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      if (($clickedEl.attr('href') && $clickedEl.attr('href').indexOf('#') === 0) || $clickedEl.attr('data-tab')) {
        app.tab.show(data.tab || $clickedEl.attr('href'), $clickedEl, data.animate);
      }
    },
  },
};

function swipePanel(panel) {
  var app = panel.app;
  Utils$1.extend(panel, {
    swipeable: true,
    swipeInitialized: true,
  });
  var params = app.params.panel;
  var $el = panel.$el;
  var $backdropEl = panel.$backdropEl;
  var side = panel.side;
  var effect = panel.effect;
  var $viewEl = panel.$viewEl;
  var otherPanel;

  var isTouched;
  var isMoved;
  var isScrolling;
  var touchesStart = {};
  var touchStartTime;
  var touchesDiff;
  var translate;
  var backdropOpacity;
  var panelWidth;
  var direction;

  function handleTouchStart(e) {
    if (!panel.swipeable) { return; }
    if (!app.panel.allowOpen || (!params.swipe && !params.swipeOnlyClose) || isTouched) { return; }
    if (dom7$1('.modal-in, .photo-browser-in').length > 0) { return; }
    otherPanel = app.panel[side === 'left' ? 'right' : 'left'] || {};
    if (!panel.opened && otherPanel.opened) { return; }
    if (!(params.swipeCloseOpposite || params.swipeOnlyClose)) {
      if (otherPanel.opened) { return; }
    }
    if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') { return; }
    if (dom7$1(e.target).closest('.range-slider').length > 0) { return; }
    if (dom7$1(e.target).closest('.tabs-swipeable-wrap').length > 0) { return; }
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    if (params.swipeOnlyClose && !panel.opened) {
      return;
    }
    if (params.swipe !== 'both' && params.swipeCloseOpposite && params.swipe !== side && !panel.opened) {
      return;
    }
    if (params.swipeActiveArea && !panel.opened) {
      if (side === 'left') {
        if (touchesStart.x > params.swipeActiveArea) { return; }
      }
      if (side === 'right') {
        if (touchesStart.x < app.width - params.swipeActiveArea) { return; }
      }
    }
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;

    touchStartTime = Utils$1.now();
    direction = undefined;
  }
  function handleTouchMove(e) {
    if (!isTouched) { return; }
    if (e.f7PreventPanelSwipe) { return; }
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (typeof isScrolling === 'undefined') {
      isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
    }
    if (isScrolling) {
      isTouched = false;
      return;
    }
    if (!direction) {
      if (pageX > touchesStart.x) {
        direction = 'to-right';
      } else {
        direction = 'to-left';
      }

      if (params.swipe === 'both') {
        if (params.swipeActiveArea > 0) {
          if (side === 'left' && touchesStart.x > params.swipeActiveArea) {
            isTouched = false;
            return;
          }
          if (side === 'right' && touchesStart.x < app.width - params.swipeActiveArea) {
            isTouched = false;
            return;
          }
        }
      }
      if ($el.hasClass('panel-visible-by-breakpoint')) {
        isTouched = false;
        return;
      }

      if (
        (side === 'left' &&
          (
            direction === 'to-left' && !$el.hasClass('panel-active')
          )
        )
        ||
        (side === 'right' &&
          (
            direction === 'to-right' && !$el.hasClass('panel-active')
          )
        )
      ) {
        isTouched = false;
        return;
      }
    }

    if (params.swipeNoFollow) {
      var timeDiff = (new Date()).getTime() - touchStartTime;
      if (timeDiff < 300) {
        if (direction === 'to-left') {
          if (side === 'right') { app.openPanel(side); }
          if (side === 'left' && $el.hasClass('panel-active')) { app.closePanel(); }
        }
        if (direction === 'to-right') {
          if (side === 'left') { app.openPanel(side); }
          if (side === 'right' && $el.hasClass('panel-active')) { app.closePanel(); }
        }
      }
      isTouched = false;
      isMoved = false;
      return;
    }

    if (!isMoved) {
      if (!panel.opened) {
        $el.show();
        $backdropEl.show();
        $el.trigger('panel:swipeopen', panel);
        panel.emit('panelSwipeOpen', panel);
      }
      panelWidth = $el[0].offsetWidth;
      $el.transition(0);
    }

    isMoved = true;

    e.preventDefault();
    var threshold = panel.opened ? 0 : -params.swipeThreshold;
    if (side === 'right') { threshold = -threshold; }

    touchesDiff = (pageX - touchesStart.x) + threshold;

    if (side === 'right') {
      if (effect === 'cover') {
        translate = touchesDiff + (panel.opened ? 0 : panelWidth);
        if (translate < 0) { translate = 0; }
        if (translate > panelWidth) {
          translate = panelWidth;
        }
      } else {
        translate = touchesDiff - (panel.opened ? panelWidth : 0);
        if (translate > 0) { translate = 0; }
        if (translate < -panelWidth) {
          translate = -panelWidth;
        }
      }
    } else {
      translate = touchesDiff + (panel.opened ? panelWidth : 0);
      if (translate < 0) { translate = 0; }
      if (translate > panelWidth) {
        translate = panelWidth;
      }
    }
    if (effect === 'reveal') {
      $viewEl.transform(("translate3d(" + translate + "px,0,0)")).transition(0);
      $backdropEl.transform(("translate3d(" + translate + "px,0,0)")).transition(0);

      $el.trigger('panel:swipe', panel, Math.abs(translate / panelWidth));
      panel.emit('panelSwipe', panel, Math.abs(translate / panelWidth));
    } else {
      if (side === 'left') { translate -= panelWidth; }
      $el.transform(("translate3d(" + translate + "px,0,0)")).transition(0);

      $backdropEl.transition(0);
      backdropOpacity = 1 - Math.abs(translate / panelWidth);
      $backdropEl.css({ opacity: backdropOpacity });

      $el.trigger('panel:swipe', panel, Math.abs(translate / panelWidth));
      panel.emit('panelSwipe', panel, Math.abs(translate / panelWidth));
    }
  }
  function handleTouchEnd() {
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    var timeDiff = (new Date()).getTime() - touchStartTime;
    var action;
    var edge = (translate === 0 || Math.abs(translate) === panelWidth);

    if (!panel.opened) {
      if (effect === 'cover') {
        if (translate === 0) {
          action = 'swap'; // open
        } else if (timeDiff < 300 && Math.abs(translate) > 0) {
          action = 'swap'; // open
        } else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
          action = 'swap'; // open
        } else {
          action = 'reset'; // close
        }
      } else if (translate === 0) {
        action = 'reset';
      } else if (
        (timeDiff < 300 && Math.abs(translate) > 0)
        ||
        (timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2))
      ) {
        action = 'swap';
      } else {
        action = 'reset';
      }
    } else if (effect === 'cover') {
      if (translate === 0) {
        action = 'reset'; // open
      } else if (timeDiff < 300 && Math.abs(translate) > 0) {
        action = 'swap'; // open
      } else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
        action = 'reset'; // open
      } else {
        action = 'swap'; // close
      }
    } else if (translate === -panelWidth) {
      action = 'reset';
    } else if (
        (timeDiff < 300 && Math.abs(translate) >= 0)
        ||
        (timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2))
      ) {
      if (side === 'left' && translate === panelWidth) { action = 'reset'; }
      else { action = 'swap'; }
    } else {
      action = 'reset';
    }
    if (action === 'swap') {
      if (panel.opened) {
        panel.close(!edge);
      } else {
        panel.open(!edge);
      }
    }
    if (action === 'reset') {
      if (!panel.opened) {
        if (edge) {
          $el.css({ display: '' });
        } else {
          var target = effect === 'reveal' ? $viewEl : $el;
          dom7$1('html').addClass('with-panel-transitioning');
          target.transitionEnd(function () {
            if ($el.hasClass('panel-active')) { return; }
            $el.css({ display: '' });
            dom7$1('html').removeClass('with-panel-transitioning');
          });
        }
      }
    }
    if (effect === 'reveal') {
      Utils$1.nextFrame(function () {
        $viewEl.transition('');
        $viewEl.transform('');
      });
    }
    $el.transition('').transform('');
    $backdropEl.css({ display: '' }).transform('').transition('').css('opacity', '');
  }

  // Add Events
  app.on('touchstart:passive', handleTouchStart);
  app.on('touchmove', handleTouchMove);
  app.on('touchend:passive', handleTouchEnd);
  panel.on('panelDestroy', function () {
    app.off('touchstart:passive', handleTouchStart);
    app.off('touchmove', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
  });
}

var Panel$1 = (function (Framework7Class$$1) {
  function Panel(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var panel = this;

    var el = params.el;
    var $el = dom7$1(el);
    if ($el.length === 0) { return panel; }
    if ($el[0].f7Panel) { return $el[0].f7Panel; }

    $el[0].f7Panel = panel;

    var opened = params.opened;
    var side = params.side;
    var effect = params.effect;
    if (typeof opened === 'undefined') { opened = $el.hasClass('panel-active'); }
    if (typeof side === 'undefined') { side = $el.hasClass('panel-left') ? 'left' : 'right'; }
    if (typeof effect === 'undefined') { effect = $el.hasClass('panel-cover') ? 'cover' : 'reveal'; }

    if (!app.panel[side]) {
      Utils$1.extend(app.panel, ( obj = {}, obj[side] = panel, obj ));
      var obj;
    }

    var $backdropEl = dom7$1('.panel-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = dom7$1('<div class="panel-backdrop"></div>');
      $backdropEl.insertBefore($el);
    }

    var $viewEl;
    if (app.root.children('.views').length > 0) {
      $viewEl = app.root.children('.views');
    } else {
      $viewEl = app.root.children('.view').eq(0);
    }

    Utils$1.extend(panel, {
      app: app,
      side: side,
      effect: effect,
      $el: $el,
      el: $el[0],
      opened: opened,
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl[0],
      $viewEl: $viewEl,
      viewEl: $viewEl[0],
    });

    // Install Modules
    panel.useInstanceModules();

    // Init
    panel.init();

    return panel;
  }

  if ( Framework7Class$$1 ) Panel.__proto__ = Framework7Class$$1;
  Panel.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Panel.prototype.constructor = Panel;
  Panel.prototype.init = function init () {
    var panel = this;
    var app = panel.app;
    if (app.params.panel[((panel.side) + "Breakpoint")]) {
      panel.initBreakpoints();
    }
    if (
      (app.params.panel.swipe === panel.side)
      ||
      (app.params.panel.swipe === 'both')
      ||
      (app.params.panel.swipe && app.params.panel.swipe !== panel.side && app.params.panel.swipeCloseOpposite)
      ) {
      panel.initSwipePanel();
    }
  };
  Panel.prototype.setBreakpoint = function setBreakpoint () {
    var panel = this;
    var app = panel.app;
    var side = panel.side;
    var $el = panel.$el;
    var $viewEl = panel.$viewEl;
    var breakpoint = app.params.panel[(side + "Breakpoint")];
    var wasVisible = $el.hasClass('panel-visible-by-breakpoint');

    if (app.width >= breakpoint) {
      if (!wasVisible) {
        dom7$1('html').removeClass(("with-panel-" + side + "-reveal with-panel-" + side + "-cover with-panel"));
        $el.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
        panel.onOpen();
        panel.onOpened();
        $viewEl.css(( obj = {}, obj[("margin-" + side)] = (($el.width()) + "px"), obj ));
        var obj;
        app.allowPanelOpen = true;
      }
    } else if (wasVisible) {
      $el.css('display', '').removeClass('panel-visible-by-breakpoint active');
      panel.onClose();
      panel.onClosed();
      $viewEl.css(( obj$1 = {}, obj$1[("margin-" + side)] = '', obj$1 ));
      var obj$1;
    }
  };
  Panel.prototype.initBreakpoints = function initBreakpoints () {
    var panel = this;
    var app = panel.app;
    panel.resizeHandler = function resizeHandler() {
      panel.setBreakpoint();
    };
    if (app.params.panel[((panel.side) + "Breakpoint")]) {
      app.on('resize', panel.resizeHandler);
    }
    panel.setBreakpoint();
    return panel;
  };
  Panel.prototype.initSwipePanel = function initSwipePanel () {
    swipePanel(this);
  };
  Panel.prototype.destroy = function destroy () {
    var panel = this;
    var app = panel.app;

    panel.emit('panelBeforeDestroy', panel);
    panel.$el.trigger('panel:beforedestroy', panel);

    if (panel.resizeHandler) {
      app.off('resize', panel.resizeHandler);
    }
    panel.$el.trigger('panel:destroy', panel);
    panel.emit('panelDestroy');
    delete app.panel[panel.side];
    delete panel.el.f7Panel;
    Object.keys(panel).forEach(function (key) {
      delete panel[key];
    });
    panel = null;
  };
  Panel.prototype.open = function open (animate) {
    if ( animate === void 0 ) animate = true;

    var panel = this;
    var app = panel.app;
    if (!app.panel.allowOpen) { return false; }

    var side = panel.side;
    var effect = panel.effect;
    var $el = panel.$el;
    var $backdropEl = panel.$backdropEl;

    // Close if some panel is opened
    app.panel.close(side === 'left' ? 'right' : 'left', animate);

    app.panel.allowOpen = false;

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el
      .css({ display: 'block' })
      .addClass('panel-active');

    $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $backdropEl.show();

    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    panel._clientLeft = $el[0].clientLeft;

    dom7$1('html').addClass(("with-panel with-panel-" + side + "-" + effect));
    panel.onOpen();

    // Transition End;
    var transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

    function panelTransitionEnd() {
      transitionEndTarget.transitionEnd(function (e) {
        if (dom7$1(e.target).is(transitionEndTarget)) {
          if ($el.hasClass('panel-active')) {
            panel.onOpened();
            $backdropEl.css({ display: '' });
          } else {
            panel.onClosed();
            $backdropEl.css({ display: '' });
          }
        } else { panelTransitionEnd(); }
      });
    }
    if (animate) {
      panelTransitionEnd();
    } else {
      panel.onOpened();
      $backdropEl.css({ display: '' });
    }

    return true;
  };
  Panel.prototype.close = function close (animate) {
    if ( animate === void 0 ) animate = true;

    var panel = this;
    var app = panel.app;

    var side = panel.side;
    var effect = panel.effect;
    var $el = panel.$el;
    var $backdropEl = panel.$backdropEl;

    if ($el.hasClass('panel-visible-by-breakpoint') || !$el.hasClass('panel-active')) { return false; }

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el.removeClass('panel-active');

    $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');

    var transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

    panel.onClose();
    app.panel.allowOpen = false;

    if (animate) {
      transitionEndTarget.transitionEnd(function () {
        if ($el.hasClass('panel-active')) { return; }
        $el.css({ display: '' });
        dom7$1('html').removeClass('with-panel-transitioning');
        panel.onClosed();
      });
      dom7$1('html')
        .removeClass(("with-panel with-panel-" + side + "-" + effect))
        .addClass('with-panel-transitioning');
    } else {
      $el.css({ display: '' });
      $el.removeClass('not-animated');
      dom7$1('html').removeClass(("with-panel with-panel-transitioning with-panel-" + side + "-" + effect));
      panel.onClosed();
    }
    return true;
  };
  Panel.prototype.onOpen = function onOpen () {
    var panel = this;
    panel.opened = true;
    panel.$el.trigger('panel:open', panel);
    panel.emit('panelOpen', panel);
  };
  Panel.prototype.onOpened = function onOpened () {
    var panel = this;
    var app = panel.app;
    app.panel.allowOpen = true;

    panel.$el.trigger('panel:opened', panel);
    panel.emit('panelOpened', panel);
  };
  Panel.prototype.onClose = function onClose () {
    var panel = this;
    panel.opened = false;
    panel.$el.addClass('panel-closing');
    panel.$el.trigger('panel:close', panel);
    panel.emit('panelClose', panel);
  };
  Panel.prototype.onClosed = function onClosed () {
    var panel = this;
    var app = panel.app;
    app.panel.allowOpen = true;
    panel.$el.removeClass('panel-closing');
    panel.$el.trigger('panel:closed', panel);
    panel.emit('panelClosed', panel);
  };

  return Panel;
}(Framework7Class));

var Panel = {
  name: 'panel',
  params: {
    panel: {
      leftBreakpoint: 0,
      rightBreakpoint: 0,
      swipe: undefined, // or 'left' or 'right' or 'both'
      swipeActiveArea: 0,
      swipeCloseOpposite: true,
      swipeOnlyClose: false,
      swipeNoFollow: false,
      swipeThreshold: 0,
      closeByBackdropClick: true,
    },
  },
  static: {
    Panel: Panel$1,
  },
  instance: {
    panel: {
      allowOpen: true,
    },
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app.panel, {
      disableSwipe: function disableSwipe(panel) {
        if ( panel === void 0 ) panel = 'both';

        var side;
        var panels = [];
        if (typeof panel === 'string') {
          if (panel === 'both') {
            side = 'both';
            panels = [app.panel.left, app.panel.right];
          } else {
            side = panel;
            panels = app.panel[side];
          }
        } else {
          panels = [panel];
        }
        panels.forEach(function (panelInstance) {
          if (panelInstance) { Utils$1.extend(panelInstance, { swipeable: false }); }
        });
      },
      enableSwipe: function enableSwipe(panel) {
        if ( panel === void 0 ) panel = 'both';

        var panels = [];
        var side;
        if (typeof panel === 'string') {
          side = panel;
          if (
            (app.params.panel.swipe === 'left' && side === 'right') ||
            (app.params.panel.swipe === 'right' && side === 'left') ||
            side === 'both'
          ) {
            side = 'both';
            app.params.panel.swipe = side;
            panels = [app.panel.left, app.panel.right];
          } else {
            app.params.panel.swipe = side;
            panels.push(app.panel[side]);
          }
        } else if (panel) {
          panels.push(panel);
        }
        if (panels.length) {
          panels.forEach(function (panelInstance) {
            if (!panelInstance) { return; }
            if (!panelInstance.swipeInitialized) {
              panelInstance.initSwipePanel();
            } else {
              Utils$1.extend(panelInstance, { swipeable: true });
            }
          });
        }
      },
      create: function create(el) {
        return new Panel$1(app, { el: el });
      },

      open: function open(side, animate) {
        var panelSide = side;
        if (!panelSide) {
          if (dom7$1('.panel').length > 1) {
            return false;
          }
          panelSide = dom7$1('.panel').hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) { return false; }
        if (app.panel[panelSide]) {
          return app.panel[panelSide].open(animate);
        }
        var $panelEl = dom7$1((".panel-" + panelSide));
        if ($panelEl.length > 0) {
          return new Panel$1(app, { el: $panelEl }).open(animate);
        }
        return false;
      },
      close: function close(side, animate) {
        var $panelEl;
        var panelSide;
        if (panelSide) {
          panelSide = side;
          $panelEl = dom7$1((".panel-" + panelSide));
        } else {
          $panelEl = dom7$1('.panel.panel-active');
          panelSide = $panelEl.hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) { return false; }
        if (app.panel[panelSide]) {
          return app.panel[panelSide].close(animate);
        }
        if ($panelEl.length > 0) {
          return new Panel$1(app, { el: $panelEl }).close(animate);
        }
        return false;
      },
    });
  },
  on: {
    init: function init() {
      var app = this;

      // Create Panels
      dom7$1('.panel').each(function (index, panelEl) {
        var side = dom7$1(panelEl).hasClass('panel-left') ? 'left' : 'right';
        app.panel[side] = new Panel$1(app, { el: panelEl, side: side });
      });
    },
  },
  clicks: {
    '.panel-open': function open(clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var side = 'left';
      if (data.panel === 'right' || (dom7$1('.panel').length === 1 && dom7$1('.panel').hasClass('panel-right'))) {
        side = 'right';
      }
      app.panel.open(side, data.animate);
    },
    '.panel-close': function close(clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var side = data.panel;
      app.panel.close(side, data.animate);
    },
    '.panel-backdrop': function close() {
      var app = this;
      dom7$1('.panel-active').trigger('panel:backdrop-click');
      app.emit('panelBackdropClick', dom7$1('.panel-active')[0]);
      if (app.params.panel.closeByBackdropClick) { app.panel.close(); }
    },
  },
};

var Card = {
  name: 'card',
};

var Chip = {
  name: 'chips',
};

// Form Data
var FormData$1 = {
  store: function store(form, data) {
    var app = this;
    var formId = form;

    var $formEl = dom7$1(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }
    // Store form data in app.formsData
    app.form.data[("form-" + formId)] = data;

    // Store form data in local storage also
    try {
      window.localStorage[("f7form-" + formId)] = JSON.stringify(data);
    } catch (e) {
      throw e;
    }
  },
  get: function get(form) {
    var app = this;
    var formId = form;

    var $formEl = dom7$1(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }

    try {
      if (window.localStorage[("f7form-" + formId)]) {
        return JSON.parse(window.localStorage[("f7form-" + formId)]);
      }
    } catch (e) {
      throw e;
    }
    if (app.form.data[("form-" + formId)]) {
      return app.form.data[("form-" + formId)];
    }
    return undefined;
  },
  delete: function delete$1(form) {
    var app = this;
    var formId = form;

    var $formEl = dom7$1(form);
    if ($formEl.length && $formEl.is('form') && $formEl.attr('id')) {
      formId = $formEl.attr('id');
    }

    // Delete form data from app.formsData
    if (app.form.data[("form-" + formId)]) {
      app.form.data[("form-" + formId)] = '';
      delete app.form.data[("form-" + formId)];
    }

    // Delete form data from local storage also
    try {
      if (window.localStorage[("f7form-" + formId)]) {
        window.localStorage[("f7form-" + formId)] = '';
        window.localStorage.removeItem(("f7form-" + formId));
      }
    } catch (e) {
      throw e;
    }
  },
};

// Form Storage
var FormStorage = {
  init: function init(formEl) {
    var app = this;
    var $formEl = dom7$1(formEl);
    var formId = $formEl.attr('id');
    if (!formId) { return; }
    var initialData = app.form.data.get(formId);
    if (initialData) {
      app.form.fromData($formEl, initialData);
    }
    function store() {
      var data = app.form.toData($formEl);
      if (!data) { return; }
      app.form.data.store(formId, data);
      $formEl.trigger('form:storedata', data);
      app.emit('formStoreData', $formEl[0], data);
    }
    $formEl.on('change submit', store);
  },
  destroy: function destroy(formEl) {
    var $formEl = dom7$1(formEl);
    $formEl.off('change submit');
  },
};

// Form To/From Data
function formToData(formEl) {
  var app = this;
  var $formEl = dom7$1(formEl).eq(0);
  if ($formEl.length === 0) { return undefined; }

  // Form data
  var data = {};

  // Skip input types
  var skipTypes = ['submit', 'image', 'button', 'file'];
  var skipNames = [];
  $formEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
    var $inputEl = dom7$1(inputEl);
    var name = $inputEl.attr('name');
    var type = $inputEl.attr('type');
    var tag = inputEl.nodeName.toLowerCase();
    if (skipTypes.indexOf(type) >= 0) { return; }
    if (skipNames.indexOf(name) >= 0 || !name) { return; }
    if (tag === 'select' && $inputEl.prop('multiple')) {
      skipNames.push(name);
      data[name] = [];
      $formEl.find(("select[name=\"" + name + "\"] option")).each(function (index, el) {
        if (el.selected) { data[name].push(el.value); }
      });
    } else {
      switch (type) {
        case 'checkbox' :
          skipNames.push(name);
          data[name] = [];
          $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
            if (el.checked) { data[name].push(el.value); }
          });
          break;
        case 'radio' :
          skipNames.push(name);
          $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
            if (el.checked) { data[name] = el.value; }
          });
          break;
        default :
          data[name] = $inputEl.val();
          break;
      }
    }
  });
  $formEl.trigger('form:todata', data);
  app.emit('formToData', $formEl[0], data);

  return data;
}
function formFromData(formEl, formData) {
  var app = this;
  var $formEl = dom7$1(formEl).eq(0);
  if (!$formEl.length) { return; }

  var data = formData;
  var formId = $formEl.attr('id');

  if (!data && formId) {
    data = app.form.data.get(formId);
  }

  if (!data) { return; }

  // Skip input types
  var skipTypes = ['submit', 'image', 'button', 'file'];
  var skipNames = [];

  $formEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
    var $inputEl = dom7$1(inputEl);
    var name = $inputEl.attr('name');
    var type = $inputEl.attr('type');
    var tag = inputEl.nodeName.toLowerCase();
    if (typeof data[name] === 'undefined' || data[name] === null) { return; }
    if (skipTypes.indexOf(type) >= 0) { return; }
    if (skipNames.indexOf(name) >= 0 || !name) { return; }
    if (tag === 'select' && $inputEl.prop('multiple')) {
      skipNames.push(name);
      $formEl.find(("select[name=\"" + name + "\"] option")).each(function (index, el) {
        var selectEl = el;
        if (data[name].indexOf(el.value) >= 0) { selectEl.selected = true; }
        else { selectEl.selected = false; }
      });
    } else {
      switch (type) {
        case 'checkbox' :
          skipNames.push(name);
          $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
            var checkboxEl = el;
            if (data[name].indexOf(el.value) >= 0) { checkboxEl.checked = true; }
            else { checkboxEl.checked = false; }
          });
          break;
        case 'radio' :
          skipNames.push(name);
          $formEl.find(("input[name=\"" + name + "\"]")).each(function (index, el) {
            var radioEl = el;
            if (data[name] === el.value) { radioEl.checked = true; }
            else { radioEl.checked = false; }
          });
          break;
        default :
          $inputEl.val(data[name]);
          break;
      }
    }
    if (tag === 'select' || tag === 'input' || tag === 'textarea') {
      $inputEl.trigger('change', 'fromdata');
    }
  });
  $formEl.trigger('form:fromdata', data);
  app.emit('formFromData', $formEl[0], data);
}

function initAjaxForm() {
  var app = this;

  function onSubmitChange(e, fromData) {
    var $formEl = dom7$1(this);
    if (e.type === 'change' && !$formEl.hasClass('form-ajax-submit-onchange')) { return; }
    if (e.type === 'submit') { e.preventDefault(); }

    if (e.type === 'change' && fromData === 'fromdata') { return; }

    var method = ($formEl.attr('method') || 'GET').toUpperCase();
    var contentType = $formEl.prop('enctype') || $formEl.attr('enctype');

    var url = $formEl.attr('action');
    if (!url) { return; }

    var data;
    if (method === 'POST') { data = new FormData$1($formEl[0]); }
    else { data = dom7$1.serializeObject(app.form.toData($formEl[0])); }

    var xhr = dom7$1.ajax({
      method: method,
      url: url,
      contentType: contentType,
      data: data,
      beforeSend: function beforeSend() {
        $formEl.trigger('formajax:beforesend', data, xhr);
        app.emit('formAjaxBeforeSend', $formEl[0], data, xhr);
      },
      error: function error() {
        $formEl.trigger('formajax:error', data, xhr);
        app.emit('formAjaxError', $formEl[0], data, xhr);
      },
      complete: function complete() {
        $formEl.trigger('formajax:complete', data, xhr);
        app.emit('formAjaxComplete', $formEl[0], data, xhr);
      },
      success: function success() {
        $formEl.trigger('formajax:success', data, xhr);
        app.emit('formAjaxSuccess', $formEl[0], data, xhr);
      },
    });
  }
  dom7$1(document).on('submit change', 'form.form-ajax-submit, form.form-ajax-submit-onchange', onSubmitChange);
}

var Form = {
  name: 'form',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      form: {
        data: {
          store: FormData$1.store.bind(app),
          get: FormData$1.get.bind(app),
          delete: FormData$1.delete.bind(app),
        },
        toData: formToData.bind(app),
        fromData: formFromData.bind(app),
        storage: {
          init: FormStorage.init.bind(app),
          destroy: FormStorage.destroy.bind(app),
        },
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      initAjaxForm.call(app);
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.form-store-data').each(function (index, formEl) {
        app.form.storage.destroy(formEl);
      });
    },
    tabInit: function tabInit(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.form-store-data').each(function (index, formEl) {
        app.form.storage.init(formEl);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.form-store-data').each(function (index, formEl) {
        app.form.storage.destroy(formEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.form-store-data').each(function (index, formEl) {
        app.form.storage.init(formEl);
      });
    },
  },
};

var Input = {
  ignoreTypes: ['checkbox', 'button', 'submit', 'range', 'radio', 'image'],
  createTextareaResizableShadow: function createTextareaResizableShadow() {
    var $shadowEl = dom7$1(document.createElement('textarea'));
    $shadowEl.addClass('textarea-resizable-shadow');
    $shadowEl.prop({
      disabled: true,
      readonly: true,
    });
    Input.textareaResizableShadow = $shadowEl;
  },
  textareaResizableShadow: undefined,
  resizeTextarea: function resizeTextarea(textareaEl) {
    var app = this;
    var $textareaEl = dom7$1(textareaEl);
    if (!Input.textareaResizableShadow) {
      Input.createTextareaResizableShadow();
    }
    var $shadowEl = Input.textareaResizableShadow;
    if (!$textareaEl.length) { return; }
    if (!$textareaEl.hasClass('resizable')) { return; }
    if (Input.textareaResizableShadow.parents().length === 0) {
      app.root.append($shadowEl);
    }

    var styles = window.getComputedStyle($textareaEl[0]);
    ('padding margin width font border box-sizing display').split(' ').forEach(function (style) {
      $shadowEl.css(style, styles[style]);
    });
    var currentHeight = $textareaEl[0].clientHeight;

    $shadowEl.val('');
    var initialHeight = $shadowEl[0].scrollHeight;

    $shadowEl.val($textareaEl.val());
    $shadowEl.css('height', 0);
    var scrollHeight = $shadowEl[0].scrollHeight;
    if (currentHeight !== scrollHeight) {
      if (scrollHeight > initialHeight) {
        $textareaEl.css('height', (scrollHeight + "px"));
        $textareaEl.trigger('textarea:resize', initialHeight, currentHeight, scrollHeight);
      } else if (scrollHeight < currentHeight) {
        $textareaEl.css('height', '');
        $textareaEl.trigger('textarea:resize', initialHeight, currentHeight, initialHeight);
      }
    }
  },
  validate: function validate(inputEl) {
    var $inputEl = dom7$1(inputEl);
    if (!$inputEl.length) { return; }
    var $itemInputEl = $inputEl.parents('.item-input');
    var validity = $inputEl[0].validity;
    var validationMessage = $inputEl.dataset().errorMessage || $inputEl[0].validationMessage || '';
    if (!validity) { return; }
    if (!validity.valid) {
      var $errorEl = $inputEl.nextAll('.item-input-error-message');
      if (validationMessage) {
        if ($errorEl.length === 0) {
          $errorEl = dom7$1('<div class="item-input-error-message"></div>');
          $errorEl.insertAfter($inputEl);
        }
        $errorEl.text(validationMessage);
      }
      if ($errorEl.length > 0) {
        $itemInputEl.addClass('item-input-with-error-message');
      }
      $itemInputEl.addClass('item-input-invalid');
      $inputEl.addClass('input-invalid');
    } else {
      $itemInputEl.removeClass('item-input-invalid item-input-with-error-message');
      $inputEl.removeClass('input-invalid');
    }
  },
  validateInputs: function validateInputs(el) {
    var app = this;
    dom7$1(el).find('input, textarea, select').each(function (index, inputEl) {
      app.input.validate(inputEl);
    });
  },
  focus: function focus(inputEl) {
    var $inputEl = dom7$1(inputEl);
    var type = $inputEl.attr('type');
    if (Input.ignoreTypes.indexOf(type) >= 0) { return; }
    var $itemInputEl = $inputEl.parents('.item-input');
    $itemInputEl.addClass('item-input-focused');
    $inputEl.addClass('input-focused');
  },
  blur: function blur(inputEl) {
    dom7$1(inputEl).parents('.item-input').removeClass('item-input-focused');
    dom7$1(inputEl).removeClass('input-focused');
  },
  checkEmptyState: function checkEmptyState(inputEl) {
    var $inputEl = dom7$1(inputEl);
    var value = $inputEl.val();
    var $itemInputEl = $inputEl.parents('.item-input');
    if ((value && (typeof value === 'string' && value.trim() !== '')) || (Array.isArray(value) && value.length > 0)) {
      $itemInputEl.addClass('item-input-with-value');
      $inputEl.addClass('input-with-value');
      $inputEl.trigger('input:notempty');
    } else {
      $itemInputEl.removeClass('item-input-with-value');
      $inputEl.removeClass('input-with-value');
      $inputEl.trigger('input:empty');
    }
  },
  init: function init() {
    var app = this;
    Input.createTextareaResizableShadow();
    function onFocus() {
      app.input.focus(this);
    }
    function onBlur() {
      var $inputEl = dom7$1(this);
      var tag = $inputEl[0].nodeName.toLowerCase();
      app.input.blur($inputEl);
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        app.input.validate($inputEl);
      }
      // Resize textarea
      if (tag === 'textarea' && $inputEl.hasClass('resizable')) {
        if (Input.textareaResizableShadow) { Input.textareaResizableShadow.remove(); }
      }
    }
    function onChange() {
      var $inputEl = dom7$1(this);
      var type = $inputEl.attr('type');
      var tag = $inputEl[0].nodeName.toLowerCase();
      if (Input.ignoreTypes.indexOf(type) >= 0) { return; }

      // Check Empty State
      app.input.checkEmptyState($inputEl);

      // Check validation
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        app.input.validate($inputEl);
      }

      // Resize textarea
      if (tag === 'textarea' && $inputEl.hasClass('resizable')) {
        app.input.resizeTextarea($inputEl);
      }
    }
    function onInvalid(e) {
      var $inputEl = dom7$1(this);
      if ($inputEl.dataset().validate || $inputEl.attr('validate') !== null) {
        e.preventDefault();
        app.input.validate($inputEl);
      }
    }
    function clearInput() {
      var $clicked = dom7$1(this);
      var $inputEl = $clicked.siblings('input, textarea').eq(0);
      var previousValue = $inputEl.val();
      $inputEl
        .val('')
        .trigger('change')
        .focus()
        .trigger('input:clear', previousValue);
    }
    dom7$1(document).on('click', '.input-clear-button', clearInput);
    dom7$1(document).on('change input', 'input, textarea, select', onChange, true);
    dom7$1(document).on('focus', 'input, textarea, select', onFocus, true);
    dom7$1(document).on('blur', 'input, textarea, select', onBlur, true);
    dom7$1(document).on('invalid', 'input, textarea, select', onInvalid, true);
  },
};

var Input$1 = {
  name: 'input',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      input: {
        focus: Input.focus.bind(app),
        blur: Input.blur.bind(app),
        validate: Input.validate.bind(app),
        validateInputs: Input.validate.bind(app),
        checkEmptyState: Input.checkEmptyState.bind(app),
        resizeTextarea: Input.resizeTextarea.bind(app),
        init: Input.init.bind(app),
      },
    });
  },
  on: {
    init: function init() {
      var app = this;
      app.input.init();
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = dom7$1(tabEl);
      $tabEl.find('.item-input').each(function (itemInputIndex, itemInputEl) {
        var $itemInputEl = dom7$1(itemInputEl);
        $itemInputEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
          var $inputEl = dom7$1(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) { return; }
          app.input.checkEmptyState($inputEl);
        });
      });
      $tabEl.find('textarea.resizable').each(function (textareaIndex, textareaEl) {
        app.input.resizeTextarea(textareaEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      var $pageEl = page.$el;
      $pageEl.find('.item-input').each(function (itemInputIndex, itemInputEl) {
        var $itemInputEl = dom7$1(itemInputEl);
        $itemInputEl.find('input, select, textarea').each(function (inputIndex, inputEl) {
          var $inputEl = dom7$1(inputEl);
          if (Input.ignoreTypes.indexOf($inputEl.attr('type')) >= 0) { return; }
          app.input.checkEmptyState($inputEl);
        });
      });
      $pageEl.find('textarea.resizable').each(function (textareaIndex, textareaEl) {
        app.input.resizeTextarea(textareaEl);
      });
    },
  },
};

var Checkbox = {
  name: 'checkbox',
};

var Radio = {
  name: 'radio',
};

var Toggle$1 = (function (Framework7Class$$1) {
  function Toggle(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var toggle = this;

    var defaults = {};

    // Extend defaults with modules params
    toggle.useInstanceModulesParams(defaults);

    toggle.params = Utils$1.extend(defaults, params);

    var el = toggle.params.el;
    if (!el) { return toggle; }

    var $el = dom7$1(el);
    if ($el.length === 0) { return toggle; }

    var dataset = $el.dataset();

    var $inputEl = $el.children('input[type="checkbox"]');

    Utils$1.extend(toggle, {
      $el: $el,
      el: $el[0],
      dataset: dataset,
      $inputEl: $inputEl,
      inputEl: $inputEl[0],
      disabled: $el.hasClass('disabled') || $inputEl.hasClass('disabled') || $inputEl.attr('disabled') || $inputEl[0].disabled,
    });

    Object.defineProperty(toggle, 'checked', {
      enumerable: true,
      configurable: true,
      set: function set(checked) {
        if (!toggle || typeof toggle.$inputEl === 'undefined') { return; }
        if (toggle.checked === checked) { return; }
        $inputEl[0].checked = checked;
        toggle.$inputEl.trigger('change');
      },
      get: function get() {
        return $inputEl[0].checked;
      },
    });

    $el[0].f7Toggle = toggle;

    var isTouched;
    var touchesStart = {};
    var isScrolling;
    var touchesDiff;
    var toggleWidth;
    var touchStartTime;
    var touchStartChecked;
    function handleTouchStart(e) {
      if (isTouched || toggle.disabled) { return; }
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchesDiff = 0;

      isTouched = true;
      isScrolling = undefined;
      touchStartTime = Utils$1.now();
      touchStartChecked = toggle.checked;

      toggleWidth = $el[0].offsetWidth;
      Utils$1.nextTick(function () {
        if (isTouched) {
          $el.addClass('toggle-active-state');
        }
      });
    }
    function handleTouchMove(e) {
      if (!isTouched || toggle.disabled) { return; }
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();

      touchesDiff = pageX - touchesStart.x;

      var changed;
      if (touchesDiff < 0 && Math.abs(touchesDiff) > toggleWidth / 3 && touchStartChecked) {
        changed = true;
      }
      if (touchesDiff > 0 && Math.abs(touchesDiff) > toggleWidth / 3 && !touchStartChecked) {
        changed = true;
      }
      if (changed) {
        touchesStart.x = pageX;
        toggle.checked = !touchStartChecked;
        touchStartChecked = !touchStartChecked;
      }
    }
    function handleTouchEnd() {
      if (!isTouched || toggle.disabled) {
        if (isScrolling) { $el.removeClass('toggle-active-state'); }
        isTouched = false;
        return;
      }
      isTouched = false;

      $el.removeClass('toggle-active-state');

      var changed;
      if ((Utils$1.now() - touchStartTime) < 300) {
        if (touchesDiff < 0 && touchStartChecked) {
          changed = true;
        }
        if (touchesDiff > 0 && !touchStartChecked) {
          changed = true;
        }
        if (changed) {
          toggle.checked = !touchStartChecked;
        }
      }
    }
    function handleInputChange() {
      toggle.emit({
        events: 'change',
        parents: [],
      });
      toggle.emit('toggleChange toggle:change', toggle);
    }
    toggle.attachEvents = function attachEvents() {
      if (!Support$1.touch) { return; }
      var passive = Support$1.passiveListener ? { passive: true } : false;
      $el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      toggle.$inputEl.on('change', handleInputChange);
    };
    toggle.detachEvents = function detachEvents() {
      if (!Support$1.touch) { return; }
      var passive = Support$1.passiveListener ? { passive: true } : false;
      $el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
      toggle.$inputEl.off('change', handleInputChange);
    };


    // Install Modules
    toggle.useInstanceModules();

    // Init
    toggle.init();
  }

  if ( Framework7Class$$1 ) Toggle.__proto__ = Framework7Class$$1;
  Toggle.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Toggle.prototype.constructor = Toggle;
  Toggle.prototype.toggle = function toggle () {
    var toggle = this;
    toggle.checked = !toggle.checked;
  };
  Toggle.prototype.init = function init () {
    var toggle = this;
    toggle.attachEvents();
  };
  Toggle.prototype.destroy = function destroy () {
    var toggle = this;
    toggle.emit('toggleBeforeDestroy', toggle);
    toggle.$el.trigger('toggle:beforedestroy', toggle);
    delete toggle.$el[0].f7Toggle;
    toggle.detachEvents();
    Utils$1.deleteProps(toggle);
    toggle = null;
  };

  return Toggle;
}(Framework7Class));

var Toggle = {
  name: 'toggle',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      toggle: {
        create: function create(params) {
          return new Toggle$1(app, params);
        },
        get: function get(el) {
          var $el = dom7$1(el);
          if ($el.length) { return $el[0].f7Toggle; }
          return undefined;
        },
        destroy: function destroy(el) {
          if (el && (el instanceof Toggle$1) && el.destroy) { return el.destroy(); }
          var $el = dom7$1(el);
          if ($el.length) { return $el[0].f7Toggle.destroy(); }
          return undefined;
        },
      },
    });
  },
  static: {
    Toggle: Toggle$1,
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      dom7$1(tabEl).find('label.toggle').each(function (index, toggleEl) { return new Toggle$1(app, { el: toggleEl }); });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      dom7$1(tabEl).find('label.toggle').each(function (index, toggleEl) {
        if (toggleEl.f7Toggle) { toggleEl.f7Toggle.destroy(); }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('label.toggle').each(function (index, toggleEl) { return new Toggle$1(app, { el: toggleEl }); });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('label.toggle').each(function (index, toggleEl) {
        if (toggleEl.f7Toggle) { toggleEl.f7Toggle.destroy(); }
      });
    },
  },
};

var Range$1 = (function (Framework7Class$$1) {
  function Range(app, params) {
    Framework7Class$$1.call(this, params, [app]);
    var range = this;
    var defaults = {
      dual: false,
      step: 1,
      label: false,
    };

    // Extend defaults with modules params
    range.useInstanceModulesParams(defaults);

    range.params = Utils$1.extend(defaults, params);

    var el = range.params.el;
    if (!el) { return range; }

    var $el = dom7$1(el);
    if ($el.length === 0) { return range; }

    var dataset = $el.dataset();

    ('step min max value').split(' ').forEach(function (paramName) {
      if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
        range.params[paramName] = parseFloat(dataset[paramName]);
      }
    });
    ('dual label').split(' ').forEach(function (paramName) {
      if (typeof params[paramName] === 'undefined' && typeof dataset[paramName] !== 'undefined') {
        range.params[paramName] = dataset[paramName];
      }
    });


    if (!range.params.value) {
      if (typeof dataset.value !== 'undefined') { range.params.value = dataset.value; }
      if (typeof dataset.valueLeft !== 'undefined' && typeof dataset.valueRight !== 'undefined') {
        range.params.value = [parseFloat(dataset.valueLeft), parseFloat(dataset.valueRight)];
      }
    }

    var $inputEl;
    if (!range.params.dual) {
      if (range.params.inputEl) {
        $inputEl = dom7$1(range.params.inputEl);
      } else if ($el.find('input[type="range"]').length) {
        $inputEl = $el.find('input[type="range"]').eq(0);
      }
    }


    Utils$1.extend(range, range.params, {
      $el: $el,
      el: $el[0],
      $inputEl: $inputEl,
      inputEl: $inputEl ? $inputEl[0] : undefined,
    });

    if ($inputEl) {
      ('step min max').split(' ').forEach(function (paramName) {
        if (!params[paramName] && $inputEl.attr(paramName)) {
          range.params[paramName] = parseFloat($inputEl.attr(paramName));
          range[paramName] = parseFloat($inputEl.attr(paramName));
        }
        if (typeof $inputEl.val() !== 'undefined') {
          range.params.value = parseFloat($inputEl.val());
          range.value = parseFloat($inputEl.val());
        }
      });
    }

    // Dual
    if (range.dual) {
      $el.addClass('range-slider-dual');
    }
    if (range.label) {
      $el.addClass('range-slider-label');
    }

    // Check for layout
    var $barEl = dom7$1('<div class="range-bar"></div>');
    var $barActiveEl = dom7$1('<div class="range-bar-active"></div>');
    $barEl.append($barActiveEl);

    // Create Knobs
    var knobHTML = "\n      <div class=\"range-knob-wrap\">\n        <div class=\"range-knob\"></div>\n        " + (range.label ? '<div class="range-knob-label"></div>' : '') + "\n      </div>\n    ";
    var knobs = [dom7$1(knobHTML)];
    var labels = [];

    if (range.dual) {
      knobs.push(dom7$1(knobHTML));
    }

    $el.append($barEl);
    knobs.forEach(function ($knobEl) {
      $el.append($knobEl);
    });

    // Labels
    if (range.label) {
      labels.push(knobs[0].find('.range-knob-label'));
      if (range.dual) {
        labels.push(knobs[1].find('.range-knob-label'));
      }
    }

    Utils$1.extend(range, {
      knobs: knobs,
      labels: labels,
      $barEl: $barEl,
      $barActiveEl: $barActiveEl,
    });

    $el[0].f7Range = range;

    // Touch Events
    var isTouched;
    var touchesStart = {};
    var isScrolling;
    var rangeOffsetLeft;
    var $touchedKnobEl;
    var dualValueIndex;
    function handleTouchStart(e) {
      if (isTouched) { return; }
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;

      isTouched = true;
      isScrolling = undefined;
      rangeOffsetLeft = $el.offset().left;

      var progress = (touchesStart.x - rangeOffsetLeft) / range.rangeWidth;

      var newValue = (progress * (range.max - range.min)) + range.min;
      if (range.dual) {
        if (Math.abs(range.value[0] - newValue) < Math.abs(range.value[1] - newValue)) {
          dualValueIndex = 0;
          $touchedKnobEl = range.knobs[0];
          newValue = [newValue, range.value[1]];
        } else {
          dualValueIndex = 1;
          $touchedKnobEl = range.knobs[1];
          newValue = [range.value[0], newValue];
        }
      } else {
        $touchedKnobEl = range.knobs[0];
        newValue = (progress * (range.max - range.min)) + range.min;
      }
      Utils$1.nextTick(function () {
        if (isTouched) { $touchedKnobEl.addClass('range-knob-active-state'); }
      }, 70);
      range.setValue(newValue);
    }
    function handleTouchMove(e) {
      if (!isTouched) { return; }
      var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();

      var progress = (pageX - rangeOffsetLeft) / range.rangeWidth;
      var newValue = (progress * (range.max - range.min)) + range.min;
      if (range.dual) {
        var leftValue;
        var rightValue;
        if (dualValueIndex === 0) {
          leftValue = newValue;
          rightValue = range.value[1];
          if (leftValue > rightValue) {
            rightValue = leftValue;
          }
        } else {
          leftValue = range.value[0];
          rightValue = newValue;
          if (rightValue < leftValue) {
            leftValue = rightValue;
          }
        }
        newValue = [leftValue, rightValue];
      } else {
        newValue = (progress * (range.max - range.min)) + range.min;
      }
      range.setValue(newValue);
    }
    function handleTouchEnd() {
      if (!isTouched) {
        if (isScrolling) { $touchedKnobEl.removeClass('range-knob-active-state'); }
        isTouched = false;
        return;
      }
      isTouched = false;
      $touchedKnobEl.removeClass('range-knob-active-state');
    }

    function handleResize() {
      range.calcSize();
      range.layout();
    }
    range.attachEvents = function attachEvents() {
      var passive = Support$1.passiveListener ? { passive: true } : false;
      range.$el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      app.on('resize', handleResize);
    };
    range.detachEvents = function detachEvents() {
      var passive = Support$1.passiveListener ? { passive: true } : false;
      range.$el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
      app.off('resize', handleResize);
    };

    // Install Modules
    range.useInstanceModules();

    // Init
    range.init();

    return range;
  }

  if ( Framework7Class$$1 ) Range.__proto__ = Framework7Class$$1;
  Range.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Range.prototype.constructor = Range;
  Range.prototype.calcSize = function calcSize () {
    var range = this;
    range.rangeWidth = range.$el.outerWidth();
    range.knobWidth = range.knobs[0].outerWidth();
  };
  Range.prototype.layout = function layout () {
    var range = this;
    var knobWidth = range.knobWidth;
    var rangeWidth = range.rangeWidth;
    var min = range.min;
    var max = range.max;
    var knobs = range.knobs;
    var $barActiveEl = range.$barActiveEl;
    var value = range.value;
    var label = range.label;
    var labels = range.labels;
    if (range.dual) {
      var progress = [((value[0] - min) / (max - min)), ((value[1] - min) / (max - min))];
      $barActiveEl.css({
        left: ((progress[0] * 100) + "%"),
        width: (((progress[1] - progress[0]) * 100) + "%"),
      });
      knobs.forEach(function ($knobEl, knobIndex) {
        var leftPos = rangeWidth * progress[knobIndex];
        var realLeft = (rangeWidth * progress[knobIndex]) - (knobWidth / 2);
        if (realLeft < 0) { leftPos = knobWidth / 2; }
        if ((realLeft + knobWidth) > rangeWidth) { leftPos = rangeWidth - (knobWidth / 2); }
        $knobEl.css('left', (leftPos + "px"));
        if (label) { labels[knobIndex].text(value[knobIndex]); }
      });
    } else {
      var progress$1 = ((value - min) / (max - min));
      $barActiveEl.css('width', ((progress$1 * 100) + "%"));

      var leftPos = rangeWidth * progress$1;
      var realLeft = (rangeWidth * progress$1) - (knobWidth / 2);
      if (realLeft < 0) { leftPos = knobWidth / 2; }
      if ((realLeft + knobWidth) > rangeWidth) { leftPos = rangeWidth - (knobWidth / 2); }
      knobs[0].css('left', (leftPos + "px"));
      if (label) { labels[0].text(value); }
    }
    if ((range.dual && value.indexOf(min) >= 0) || (!range.dual && value === min)) {
      range.$el.addClass('range-slider-min');
    } else {
      range.$el.removeClass('range-slider-min');
    }
    if ((range.dual && value.indexOf(max) >= 0) || (!range.dual && value === max)) {
      range.$el.addClass('range-slider-max');
    } else {
      range.$el.removeClass('range-slider-max');
    }
  };
  Range.prototype.setValue = function setValue (newValue) {
    var range = this;
    var step = range.step;
    var min = range.min;
    var max = range.max;
    if (range.dual) {
      var newValues = newValue;
      if (newValue[0] > newValue[1]) {
        newValues = [newValues[0], newValues[0]];
      }
      newValues = newValues.map(function (value) {
        return Math.max(Math.min(Math.round(value / step) * step, max), min);
      });
      if (newValues[0] === range.value[0] && newValues[1] === range.value[1]) {
        return range;
      }
      newValues.forEach(function (value, valueIndex) {
        range.value[valueIndex] = value;
      });
      range.layout();
    } else {
      var value = Math.max(Math.min(Math.round(newValue / step) * step, max), min);
      range.value = value;
      range.layout();
    }
    // Events
    range.$el.trigger('change range:change', range, range.value);
    if (range.$inputEl && !range.dual) {
      range.$inputEl.val(range.value).trigger('input change');
    }
    range.emit({
      events: 'change',
      parents: [],
      data: range.value,
    });
    range.emit('rangeChange', range, range.value);
    return range;
  };
  Range.prototype.getValue = function getValue () {
    return this.value;
  };
  Range.prototype.init = function init () {
    var range = this;
    range.calcSize();
    range.layout();
    range.attachEvents();
    return range;
  };
  Range.prototype.destroy = function destroy () {
    var range = this;
    range.emit('rangeBeforeDestroy', range);
    range.$el.trigger('range:beforedestroy', range);
    delete range.$el[0].f7Range;
    range.detachEvents();
    Utils$1.deleteProps(range);
    range = null;
  };

  return Range;
}(Framework7Class));

var Range = {
  name: 'range',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      range: {
        create: function create(params) {
          return new Range$1(app, params);
        },
        destroy: function destroy(el) {
          if (el && (el instanceof Range$1) && el.destroy) { return el.destroy(); }
          var $el = dom7$1(el);
          if ($el.length) { return $el[0].f7Range.destroy(); }
          return undefined;
        },
        get: function get(el) {
          var $el = dom7$1(el);
          if ($el.length) { return $el[0].f7Range; }
          return undefined;
        },
        getValue: function getValue(el) {
          var $el = dom7$1(el);
          if ($el.length) { return $el[0].f7Range.get(); }
          return undefined;
        },
        setValue: function setValue(el, value) {
          var $el = dom7$1(el);
          if ($el.length) { return $el[0].f7Range.set(value); }
          return undefined;
        },
      },
    });
  },
  static: {
    Range: Range$1,
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.range-slider-init').each(function (index, rangeEl) { return new Range$1(app, {
        el: rangeEl,
      }); });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      dom7$1(tabEl).find('.range-slider-init').each(function (index, rangeEl) {
        if (rangeEl.f7Range) { rangeEl.f7Range.destroy(); }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.range-slider-init').each(function (index, rangeEl) { return new Range$1(app, {
        el: rangeEl,
      }); });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.range-slider-init').each(function (index, rangeEl) {
        if (rangeEl.f7Range) { rangeEl.f7Range.destroy(); }
      });
    },
  },
};

var SmartSelect$1 = (function (Framework7Class$$1) {
  function SmartSelect(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var ss = this;
    ss.app = app;
    var defaults = Utils$1.extend({
      on: {},
    }, app.modules.smartSelect.params.smartSelect);

    var $el = dom7$1(params.el).eq(0);
    if ($el.length === 0) { return ss; }

    var $selectEl = $el.find('select').eq(0);
    if ($selectEl.length === 0) { return ss; }

    var $valueEl = dom7$1(params.valueEl);
    if ($valueEl.length === 0) {
      $valueEl = dom7$1('<div class="item-after"></div>');
      $valueEl.insertAfter($el.find('.item-title'));
    }

    // Extend defaults with modules params
    ss.useInstanceModulesParams(defaults);

    // View
    var view = $el.parents('.view').length && $el.parents('.view')[0].f7View;
    if (!view) {
      throw Error('Smart Select requires initialized View');
    }

    var multiple = $selectEl[0].multiple;
    var inputType = multiple ? 'checkbox' : 'radio';
    var id = Utils$1.now();
    Utils$1.extend(ss, {
      params: Utils$1.extend(defaults, params),
      $el: $el,
      el: $el[0],
      $selectEl: $selectEl,
      selectEl: $selectEl[0],
      $valueEl: $valueEl,
      valueEl: $valueEl[0],
      url: params.url || $el.attr('href') || (($selectEl.attr('name').toLowerCase()) + "-select/"),
      multiple: multiple,
      inputType: inputType,
      id: id,
      view: view,
      inputName: (inputType + "-" + id),
      name: $selectEl.attr('name'),
      maxLength: $selectEl.attr('maxlength') || params.maxLength,
    });
    $el[0].f7SmartSelect = ss;

    // Events
    function onClick() {
      ss.open();
    }
    function onChange() {
      ss.setValue();
    }
    ss.attachEvents = function attachEvents() {
      $el.on('click', onClick);
      $el.on('change', 'input[type="checkbox"], input[type="radio"]', onChange);
    };
    ss.detachEvents = function detachEvents() {
      $el.off('click', onClick);
      $el.off('change', 'input[type="checkbox"], input[type="radio"]', onChange);
    };

    function handleInputChange() {
      var optionEl;
      var text;
      var inputEl = this;
      var value = inputEl.value;
      var optionText = [];
      var displayAs;
      if (inputEl.type === 'checkbox') {
        for (var i = 0; i < ss.selectEl.options.length; i += 1) {
          optionEl = ss.selectEl.options[i];
          if (optionEl.value === value) {
            optionEl.selected = inputEl.checked;
          }
          if (optionEl.selected) {
            displayAs = optionEl.dataset ? optionEl.dataset.displayAs : dom7$1(optionEl).data('display-value-as');
            text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
            optionText.push(text.trim());
          }
        }
        if (ss.maxLength) {
          ss.checkMaxLength();
        }
      } else {
        optionEl = ss.$selectEl.find(("option[value=\"" + value + "\"]"))[0];
        displayAs = optionEl.dataset ? optionEl.dataset.displayAs : dom7$1(optionEl).data('display-as');
        text = displayAs && typeof displayAs !== 'undefined' ? displayAs : optionEl.textContent;
        optionText = [text];
        ss.selectEl.value = value;
      }

      ss.$selectEl.trigger('change');
      ss.$valueEl.text(optionText.join(', '));
      if (ss.params.closeOnSelect && ss.inputType === 'radio') {
        ss.close();
      }
    }

    ss.attachInputsEvents = function attachInputsEvents() {
      ss.$containerEl.on('change', 'input[type="checkbox"], input[type="radio"]', handleInputChange);
    };
    ss.detachInputsEvents = function detachInputsEvents() {
      ss.$containerEl.off('change', 'input[type="checkbox"], input[type="radio"]', handleInputChange);
    };

    // Install Modules
    ss.useInstanceModules();

    // Init
    ss.init();

    return ss;
  }

  if ( Framework7Class$$1 ) SmartSelect.__proto__ = Framework7Class$$1;
  SmartSelect.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  SmartSelect.prototype.constructor = SmartSelect;
  SmartSelect.prototype.checkMaxLength = function checkMaxLength () {
    var ss = this;
    var $containerEl = ss.$containerEl;
    if (ss.selectEl.selectedOptions.length >= ss.maxLength) {
      $containerEl.find('input[type="checkbox"]').each(function (index, inputEl) {
        if (!inputEl.checked) {
          dom7$1(inputEl).parents('li').addClass('disabled');
        } else {
          dom7$1(inputEl).parents('li').removeClass('disabled');
        }
      });
    } else {
      $containerEl.find('.disabled').removeClass('disabled');
    }
  };
  SmartSelect.prototype.setValue = function setValue (value) {
    var ss = this;
    var valueArray = [];
    if (typeof value !== 'undefined') {
      if (Array.isArray(value)) {
        valueArray = value;
      } else {
        valueArray = [value];
      }
    } else {
      ss.$selectEl.find('option').each(function (optionIndex, optionEl) {
        var $optionEl = dom7$1(optionEl);
        if (optionEl.selected) {
          var displayAs = optionEl.dataset ? optionEl.dataset.displayAs : $optionEl.data('display-value-as');
          if (displayAs && typeof displayAs !== 'undefined') {
            valueArray.push(displayAs);
          } else {
            valueArray.push(optionEl.textContent.trim());
          }
        }
      });
    }
    ss.$valueEl.text(valueArray.join(', '));
  };
  SmartSelect.prototype.getItemsData = function getItemsData () {
    var ss = this;
    var items = [];
    var previousGroupEl;
    ss.$selectEl.find('option').each(function (index, optionEl) {
      var $optionEl = dom7$1(optionEl);
      var optionData = $optionEl.dataset();
      var optionImage = optionData.optionImage || ss.params.optionImage;
      var optionIcon = optionData.optionIcon || ss.params.optionIcon;
      var optionHasMedia = optionImage || optionIcon;
      // if (material) optionHasMedia = optionImage || optionIcon;
      var optionColor = optionData.optionColor;

      var optionClassName = optionData.optionClass || '';
      if ($optionEl[0].disabled) { optionClassName += ' disabled'; }

      var optionGroupEl = $optionEl.parent('optgroup')[0];
      var optionGroupLabel = optionGroupEl && optionGroupEl.label;
      var optionIsLabel = false;
      if (optionGroupEl && optionGroupEl !== previousGroupEl) {
        optionIsLabel = true;
        previousGroupEl = optionGroupEl;
        items.push({
          groupLabel: optionGroupLabel,
          isLabel: optionIsLabel,
        });
      }
      items.push({
        value: $optionEl[0].value,
        text: $optionEl[0].textContent.trim(),
        selected: $optionEl[0].selected,
        groupEl: optionGroupEl,
        groupLabel: optionGroupLabel,
        image: optionImage,
        icon: optionIcon,
        color: optionColor,
        className: optionClassName,
        disabled: $optionEl[0].disabled,
        id: ss.id,
        hasMedia: optionHasMedia,
        checkbox: ss.inputType === 'checkbox',
        radio: ss.inputType === 'radio',
        inputName: ss.inputName,
        inputType: ss.inputType,
      });
    });
    ss.items = items;
    return items;
  };
  SmartSelect.prototype.onOpen = function onOpen (type, container) {
    var ss = this;
    var app = ss.app;
    var $containerEl = dom7$1(container);
    ss.$containerEl = $containerEl;
    ss.openedIn = type;
    ss.opened = true;

    // Init VL
    if (ss.params.virtualList) {
      ss.vl = app.virtualList.create({
        el: $containerEl.find('.virtual-list'),
        items: ss.items,
        renderItem: ss.renderItem.bind(ss),
        height: ss.params.virtualListHeight,
        searchByItem: function searchByItem(query, index, item) {
          if (item.text && item.text.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0) { return true; }
          return false;
        },
      });
    }

    // Init SB
    if (ss.params.searchbar) {
      ss.searchbar = app.searchbar.create({
        el: $containerEl.find('.searchbar'),
        backdropEl: $containerEl.find('.searchbar-backdrop'),
        searchContainer: (".smart-select-list-" + (ss.id)),
        searchIn: '.item-title',
      });
    }

    // Check for max length
    if (ss.maxLength) {
      ss.checkMaxLength();
    }

    // Close on select
    if (ss.params.closeOnSelect) {
      ss.$containerEl.find(("input[type=\"radio\"][name=\"" + (ss.inputName) + "\"]:checked")).parents('label').once('click', function () {
        ss.close();
      });
    }

    // Attach input events
    ss.attachInputsEvents();

    ss.$el.trigger('smartselect:open', ss);
    ss.emit({
      events: 'open',
      data: [ss],
      parents: [],
    });
    ss.emit('smartSelectOpen', ss);
  };
  SmartSelect.prototype.onOpened = function onOpened () {
    var ss = this;

    ss.$el.trigger('smartselect:opened', ss);
    ss.emit({
      events: 'opened',
      data: [ss],
      parents: [],
    });
    ss.emit('smartSelectOpened', ss);
  };
  SmartSelect.prototype.onClose = function onClose () {
    var ss = this;
    if (ss.destroyed) { return; }

    // Destroy VL
    if (ss.vl && ss.vl.destroy) {
      ss.vl.destroy();
      ss.vl = null;
      delete ss.vl;
    }

    // Destroy SB
    if (ss.searchbar && ss.searchbar.destroy) {
      ss.searchbar.destroy();
      ss.searchbar = null;
      delete ss.searchbar;
    }
    // Detach events
    ss.detachInputsEvents();

    ss.$el.trigger('smartselect:close', ss);
    ss.emit({
      events: 'close',
      data: [ss],
      parents: [],
    });
    ss.emit('smartSelectClose', ss);
  };
  SmartSelect.prototype.onClosed = function onClosed () {
    var ss = this;
    if (ss.destroyed) { return; }
    ss.opened = false;
    ss.$containerEl = null;
    delete ss.$containerEl;

    ss.$el.trigger('smartselect:closed', ss);
    ss.emit({
      events: 'closed',
      data: [ss],
      parents: [],
    });
    ss.emit('smartSelectClosed', ss);
  };
  SmartSelect.prototype.renderSearchbar = function renderSearchbar () {
    var ss = this;
    if (ss.params.renderSearchbar) { return ss.params.renderSearchbar(); }
    var searchbarHTML = "\n      <form class=\"searchbar\">\n        <div class=\"searchbar-inner\">\n          <div class=\"searchbar-input-wrap\">\n            <input type=\"search\" placeholder=\"" + (ss.params.searchbarPlaceholder) + "\"/>\n            <i class=\"searchbar-icon\"></i>\n            <span class=\"input-clear-button\"></span>\n          </div>\n          <span class=\"searchbar-disable-button\">" + (ss.params.searchbarDisableText) + "</span>\n        </div>\n      </form>\n    ";
    return searchbarHTML;
  };
  SmartSelect.prototype.renderItem = function renderItem (index, item) {
    var ss = this;
    if (ss.params.renderItem) { return ss.params.renderItem(index, item); }
    var itemHtml;
    if (item.isLabel) {
      itemHtml = "<li class=\"item-divider\">" + (item.groupLabel) + "</li>";
    } else {
      itemHtml = "\n        <li class=\"" + (item.className || '') + "\">\n          <label class=\"item-" + (item.inputType) + " item-content\">\n            <input type=\"" + (item.inputType) + "\" name=\"" + (item.inputName) + "\" value=\"" + (item.value) + "\" " + (item.selected ? 'checked' : '') + "/>\n            <i class=\"icon icon-" + (item.inputType) + "\"></i>\n            " + (item.hasMedia ? ("\n              <div class=\"item-media\">\n                " + (item.icon ? ("<i class=\"icon " + (item.icon) + "\"></i>") : '') + "\n                " + (item.image ? ("<img src=\"" + (item.image) + "\">") : '') + "\n              </div>\n            ") : '') + "\n            <div class=\"item-inner\">\n              <div class=\"item-title" + (item.color ? (" color-" + (item.color)) : '') + "\">" + (item.text) + "</div>\n            </div>\n          </label>\n        </li>\n      ";
    }
    return itemHtml;
  };
  SmartSelect.prototype.renderItems = function renderItems () {
    var ss = this;
    if (ss.params.renderItems) { return ss.params.renderItems(ss.items); }
    var itemsHtml = "\n      " + (ss.items.map(function (item, index) { return ("" + (ss.renderItem(index, item))); }).join('')) + "\n    ";
    return itemsHtml;
  };
  SmartSelect.prototype.renderPage = function renderPage () {
    var ss = this;
    if (ss.params.renderPage) { return ss.params.renderPage(ss, ss.items); }
    var pageTitle = ss.params.pageTitle;
    if (typeof pageTitle === 'undefined') {
      pageTitle = ss.$el.find('.item-title').text().trim();
    }
    var pageHtml = "\n      <div class=\"page smart-select-page\" data-name=\"smart-select-page\" data-select-name=\"" + (ss.name) + "\">\n        <div class=\"navbar" + (ss.params.navbarColorTheme ? ("theme-" + (ss.params.navbarColorTheme)) : '') + "\">\n          <div class=\"navbar-inner sliding\">\n            <div class=\"left\">\n              <a href=\"#\" class=\"link back\">\n                <i class=\"icon icon-back\"></i>\n                <span class=\"ios-only\">" + (ss.params.pageBackLinkText) + "</span>\n              </a>\n            </div>\n            " + (pageTitle ? ("<div class=\"title\">" + pageTitle + "</div>") : '') + "\n            " + (ss.params.searchbar ? ("<div class=\"subnavbar\">" + (ss.renderSearchbar()) + "</div>") : '') + "\n          </div>\n        </div>\n        " + (ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : '') + "\n        <div class=\"page-content\">\n          <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? ("theme-" + (ss.params.formColorTheme)) : '') + "\">\n            <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n          </div>\n        </div>\n      </div>\n    ";
    return pageHtml;
  };
  SmartSelect.prototype.openPage = function openPage () {
    var ss = this;
    if (ss.opened) { return ss; }
    ss.getItemsData();
    var pageHtml = ss.renderPage(ss.items);

    ss.view.router.navigate(ss.url, {
      createRoute: {
        content: pageHtml,
        path: ss.url,
        options: {
          pageEvents: {
            pageBeforeIn: function pageBeforeIn(e, page) {
              ss.onOpen('page', page.el);
            },
            pageAfterIn: function pageAfterIn(e, page) {
              ss.onOpened('page', page.el);
            },
            pageBeforeOut: function pageBeforeOut(e, page) {
              ss.onClose('page', page.el);
            },
            pageAfterOut: function pageAfterOut(e, page) {
              ss.onClosed('page', page.el);
            },
          },
        },
      },
    });
    return ss;
  };
  SmartSelect.prototype.renderPopup = function renderPopup () {
    var ss = this;
    if (ss.params.renderPopup) { return ss.params.renderPopup(ss, ss.items); }
    var pageTitle = ss.params.pageTitle;
    if (typeof pageTitle === 'undefined') {
      pageTitle = ss.$el.find('.item-title').text().trim();
    }
    var popupHtml = "\n      <div class=\"popup smart-select-popup\" data-select-name=\"" + (ss.name) + "\">\n        <div class=\"view\">\n          <div class=\"page smart-select-page " + (ss.params.searchbar ? 'page-with-subnavbar' : '') + "\" data-name=\"smart-select-page\">\n            <div class=\"navbar" + (ss.params.navbarColorTheme ? ("theme-" + (ss.params.navbarColorTheme)) : '') + "\">\n              <div class=\"navbar-inner sliding\">\n                <div class=\"left\">\n                  <a href=\"#\" class=\"link popup-close\">\n                    <i class=\"icon icon-back\"></i>\n                    <span class=\"ios-only\">" + (ss.params.popupCloseLinkText) + "</span>\n                  </a>\n                </div>\n                " + (pageTitle ? ("<div class=\"title\">" + pageTitle + "</div>") : '') + "\n                " + (ss.params.searchbar ? ("<div class=\"subnavbar\">" + (ss.renderSearchbar()) + "</div>") : '') + "\n              </div>\n            </div>\n            " + (ss.params.searchbar ? '<div class="searchbar-backdrop"></div>' : '') + "\n            <div class=\"page-content\">\n              <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? ("theme-" + (ss.params.formColorTheme)) : '') + "\">\n                <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
    return popupHtml;
  };
  SmartSelect.prototype.openPopup = function openPopup () {
    var ss = this;
    if (ss.opened) { return ss; }
    ss.getItemsData();
    var popupHtml = ss.renderPopup(ss.items);

    var popupParams = {
      content: popupHtml,
      on: {
        popupOpen: function popupOpen(popup) {
          ss.onOpen('popup', popup.el);
        },
        popupOpened: function popupOpened(popup) {
          ss.onOpened('popup', popup.el);
        },
        popupClose: function popupClose(popup) {
          ss.onClose('popup', popup.el);
        },
        popupClosed: function popupClosed(popup) {
          ss.onClosed('popup', popup.el);
        },
      },
    };

    if (ss.params.routableModals) {
      ss.view.router.navigate(ss.url, {
        createRoute: {
          path: ss.url,
          popup: popupParams,
        },
      });
    } else {
      ss.modal = ss.app.popup.create(popupParams).open();
    }
    return ss;
  };
  SmartSelect.prototype.renderSheet = function renderSheet () {
    var ss = this;
    if (ss.params.renderSheet) { return ss.params.renderSheet(ss, ss.items); }
    var sheetHtml = "\n      <div class=\"sheet-modal smart-select-sheet\" data-select-name=\"" + (ss.name) + "\">\n        <div class=\"toolbar " + (ss.params.toolbarColorTheme ? ("theme-" + (ss.params.toolbarColorTheme)) : '') + "\">\n          <div class=\"toolbar-inner\">\n            <div class=\"left\"></div>\n            <div class=\"right\">\n              <a class=\"link sheet-close\">" + (ss.params.sheetCloseLinkText) + "</a>\n            </div>\n          </div>\n        </div>\n        <div class=\"sheet-modal-inner\">\n          <div class=\"page-content\">\n            <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? ("theme-" + (ss.params.formColorTheme)) : '') + "\">\n              <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n            </div>\n          </div>\n        </div>\n      </div>\n    ";
    return sheetHtml;
  };
  SmartSelect.prototype.openSheet = function openSheet () {
    var ss = this;
    if (ss.opened) { return ss; }
    ss.getItemsData();
    var sheetHtml = ss.renderSheet(ss.items);

    var sheetParams = {
      content: sheetHtml,
      backdrop: false,
      scrollToEl: ss.$el,
      closeByOutsideClick: true,
      on: {
        sheetOpen: function sheetOpen(sheet) {
          ss.onOpen('sheet', sheet.el);
        },
        sheetOpened: function sheetOpened(sheet) {
          ss.onOpened('sheet', sheet.el);
        },
        sheetClose: function sheetClose(sheet) {
          ss.onClose('sheet', sheet.el);
        },
        sheetClosed: function sheetClosed(sheet) {
          ss.onClosed('sheet', sheet.el);
        },
      },
    };

    if (ss.params.routableModals) {
      ss.view.router.navigate(ss.url, {
        createRoute: {
          path: ss.url,
          sheet: sheetParams,
        },
      });
    } else {
      ss.modal = ss.app.sheet.create(sheetParams).open();
    }
    return ss;
  };
  SmartSelect.prototype.renderPopover = function renderPopover () {
    var ss = this;
    if (ss.params.renderPopover) { return ss.params.renderPopover(ss, ss.items); }
    var popoverHtml = "\n      <div class=\"popover smart-select-popover\" data-select-name=\"" + (ss.name) + "\">\n        <div class=\"popover-inner\">\n          <div class=\"list smart-select-list-" + (ss.id) + " " + (ss.params.virtualList ? ' virtual-list' : '') + (ss.params.formColorTheme ? ("theme-" + (ss.params.formColorTheme)) : '') + "\">\n            <ul>" + (!ss.params.virtualList && ss.renderItems(ss.items)) + "</ul>\n          </div>\n        </div>\n      </div>\n    ";
    return popoverHtml;
  };
  SmartSelect.prototype.openPopover = function openPopover () {
    var ss = this;
    if (ss.opened) { return ss; }
    ss.getItemsData();
    var popoverHtml = ss.renderPopover(ss.items);
    var popoverParams = {
      content: popoverHtml,
      targetEl: ss.$el,
      on: {
        popoverOpen: function popoverOpen(popover) {
          ss.onOpen('popover', popover.el);
        },
        popoverOpened: function popoverOpened(popover) {
          ss.onOpened('popover', popover.el);
        },
        popoverClose: function popoverClose(popover) {
          ss.onClose('popover', popover.el);
        },
        popoverClosed: function popoverClosed(popover) {
          ss.onClosed('popover', popover.el);
        },
      },
    };
    if (ss.params.routableModals) {
      ss.view.router.navigate(ss.url, {
        createRoute: {
          path: ss.url,
          popover: popoverParams,
        },
      });
    } else {
      ss.modal = ss.app.popover.create(popoverParams).open();
    }
    return ss;
  };
  SmartSelect.prototype.open = function open (type) {
    var ss = this;
    if (ss.opened) { return ss; }
    var openIn = type || ss.params.openIn;
    ss[("open" + (openIn.split('').map(function (el, index) {
      if (index === 0) { return el.toUpperCase(); }
      return el;
    }).join('')))]();
    return ss;
  };
  SmartSelect.prototype.close = function close () {
    var ss = this;
    if (!ss.opened) { return ss; }
    if (ss.params.routableModals || ss.openedIn === 'page') {
      ss.view.router.back();
    } else {
      ss.modal.once('modalClosed', function () {
        Utils$1.nextTick(function () {
          ss.modal.destroy();
          delete ss.modal;
        });
      });
      ss.modal.close();
    }
    return ss;
  };
  SmartSelect.prototype.init = function init () {
    var ss = this;
    ss.attachEvents();
    ss.setValue();
  };
  SmartSelect.prototype.destroy = function destroy () {
    var ss = this;
    ss.emit('smartSelectBeforeDestroy', ss);
    ss.$el.trigger('smartselect:beforedestroy', ss);
    ss.detachEvents();
    delete ss.$el[0].f7SmartSelect;
    Utils$1.deleteProps(ss);
    ss.destroyed = true;
  };

  return SmartSelect;
}(Framework7Class));

var SmartSelect = {
  name: 'smartSelect',
  params: {
    smartSelect: {
      el: undefined,
      valueEl: undefined,
      openIn: 'page', // or 'popup' or 'sheet' or 'popover'
      pageTitle: undefined,
      pageBackLinkText: 'Back',
      popupCloseLinkText: 'Close',
      sheetCloseLinkText: 'Done',
      searchbar: false,
      searchbarPlaceholder: 'Search',
      searchbarDisableText: 'Cancel',
      closeOnSelect: false,
      virtualList: false,
      virtualListHeight: undefined,
      formColorTheme: undefined,
      navbarColorTheme: undefined,
      routableModals: true,
      /*
        Custom render functions
      */
      renderPage: undefined,
      renderPopup: undefined,
      renderSheet: undefined,
      renderPopover: undefined,
      /*
        Custom render functions:
        function (items)
        must return HTML string
      */
      renderItems: undefined,
      /*
        Custom render functions:
        function (index, item)
        must return HTML string
      */
      renderItem: undefined,
      renderSearchbar: undefined,
    },
  },
  static: {
    SmartSelect: SmartSelect$1,
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      smartSelect: {
        create: function create(params) {
          return new SmartSelect$1(app, params);
        },
        open: function open(smartSelectEl) {
          var ss = app.smartSelect.get(smartSelectEl);
          if (ss && ss.open) { return ss.open(); }
          return undefined;
        },
        close: function close(smartSelectEl) {
          var ss = app.smartSelect.get(smartSelectEl);
          if (ss && ss.close) { return ss.close(); }
          return undefined;
        },
        get: function get(smartSelectEl) {
          var $smartSelectEl = dom7$1(smartSelectEl);
          if (!$smartSelectEl.length) { return undefined; }
          return $smartSelectEl[0].f7SmartSelect;
        },
      },
    });
  },

  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.smart-select-init').each(function (index, smartSelectEl) {
        app.smartSelect.create(Utils$1.extend({ el: smartSelectEl }, dom7$1(smartSelectEl).dataset()));
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      dom7$1(tabEl).find('.smart-select-init').each(function (index, smartSelectEl) {
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.smart-select-init').each(function (index, smartSelectEl) {
        app.smartSelect.create(Utils$1.extend({ el: smartSelectEl }, dom7$1(smartSelectEl).dataset()));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      page.$el.find('.smart-select-init').each(function (index, smartSelectEl) {
        if (smartSelectEl.f7SmartSelect && smartSelectEl.f7SmartSelect.destroy) {
          smartSelectEl.f7SmartSelect.destroy();
        }
      });
    },
  },
  clicks: {
    '.smart-select': function open($clickedEl, data) {
      var app = this;
      if (!$clickedEl[0].f7SmartSelect) {
        var ss = app.smartSelect.create(Utils$1.extend({ el: $clickedEl }, data));
        ss.open();
      }
    },
  },
};

var Calendar$1 = (function (Framework7Class$$1) {
  function Calendar(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);
    var calendar = this;
    calendar.params = Utils$1.extend({

    }, params);
    return calendar;
  }

  if ( Framework7Class$$1 ) Calendar.__proto__ = Framework7Class$$1;
  Calendar.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Calendar.prototype.constructor = Calendar;

  return Calendar;
}(Framework7Class));

var Calendar = {
  name: 'calendar',
  static: {
    Calendar: Calendar$1,
  },
  instance: {
    calendar: function calendar(params) {
      return new Calendar$1(this, params);
    },
  },
};

var Picker$1 = (function (Framework7Class$$1) {
  function Picker(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params);
    var picker = this;
    picker.params = Utils$1.extend({

    }, params);
    return picker;
  }

  if ( Framework7Class$$1 ) Picker.__proto__ = Framework7Class$$1;
  Picker.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Picker.prototype.constructor = Picker;

  return Picker;
}(Framework7Class));

var Picker = {
  name: 'picker',
  static: {
    Picker: Picker$1,
  },
  instance: {
    picker: function picker(params) {
      return new Picker$1(this, params);
    },
  },
};

var InfiniteScroll = {
  handleScroll: function handleScroll(el, e) {
    var app = this;
    var $el = dom7$1(el);
    var scrollTop = $el[0].scrollTop;
    var scrollHeight = $el[0].scrollHeight;
    var height = $el[0].offsetHeight;
    var distance = $el[0].getAttribute('data-infinite-distance');

    var virtualListContainer = $el.find('.virtual-list');
    var virtualList;

    var onTop = $el.hasClass('infinite-scroll-top');
    if (!distance) { distance = 50; }
    if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
      distance = (parseInt(distance, 10) / 100) * height;
    }
    if (distance > height) { distance = height; }
    if (onTop) {
      if (scrollTop < distance) {
        $el.trigger('infinite', e);
        app.emit('infinite', $el[0], e);
      }
    } else if (scrollTop + height >= scrollHeight - distance) {
      if (virtualListContainer.length > 0) {
        virtualList = virtualListContainer.eq(-1)[0].f7VirtualList;
        if (virtualList && !virtualList.reachEnd && !virtualList.params.updatableScroll) {
          return;
        }
      }
      $el.trigger('infinite', e);
      app.emit('infinite', $el[0], e);
    }
  },
  create: function create(el) {
    var $el = dom7$1(el);
    var app = this;
    $el.on('scroll', function handle(e) {
      app.infiniteScroll.handle(this, e);
    });
  },
  destroy: function destroy(el) {
    var $el = dom7$1(el);
    $el.off('scroll');
  },
};
var InfiniteScroll$1 = {
  name: 'infiniteScroll',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      infiniteScroll: {
        handle: InfiniteScroll.handleScroll.bind(app),
        create: InfiniteScroll.create.bind(app),
        destroy: InfiniteScroll.destroy.bind(app),
      },
    });
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = dom7$1(tabEl);
      $tabEl.find('.infinite-scroll-content').each(function (index, el) {
        app.infiniteScroll.create(el);
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var $tabEl = dom7$1(tabEl);
      var app = this;
      $tabEl.find('.infinite-scroll-content').each(function (index, el) {
        app.infiniteScroll.destroy(el);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.infinite-scroll-content').each(function (index, el) {
        app.infiniteScroll.create(el);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.infinite-scroll-content').each(function (index, el) {
        app.infiniteScroll.destroy(el);
      });
    },
  },
};

var PullToRefresh$1 = (function (Framework7Class$$1) {
  function PullToRefresh(app, el) {
    Framework7Class$$1.call(this, {}, [app]);
    var ptr = this;
    var $el = dom7$1(el);
    var $preloaderEl = $el.find('.ptr-preloader');

    ptr.$el = $el;
    ptr.el = $el[0];

    // Extend defaults with modules params
    ptr.useInstanceModulesParams({});

    var isMaterial = app.theme === 'md';

    // Done
    ptr.done = function done() {
      var $transitionTarget = isMaterial ? $preloaderEl : $el;
      $transitionTarget.transitionEnd(function () {
        $el.removeClass('ptr-transitioning ptr-pull-up ptr-pull-down');
        $el.trigger('ptr:done');
        ptr.emit('ptrDone', $el[0]);
      });
      $el.removeClass('ptr-refreshing').addClass('ptr-transitioning');
      return ptr;
    };

    ptr.refresh = function refresh() {
      if ($el.hasClass('ptr-refreshing')) { return ptr; }
      $el.addClass('ptr-transitioning ptr-refreshing');
      $el.trigger('ptr:refresh', ptr.done);
      ptr.emit('ptrRefresh', $el[0], ptr.done);
      return ptr;
    };

    // Events handling
    var touchId;
    var isTouched;
    var isMoved;
    var touchesStart = {};
    var isScrolling;
    var touchesDiff;
    var refresh = false;
    var useTranslate = false;
    var startTranslate = 0;
    var translate;
    var scrollTop;
    var wasScrolled;
    var triggerDistance;
    var dynamicTriggerDistance;
    var pullStarted;
    var hasNavbar = false;
    var $pageEl = $el.parents('.page');

    if ($pageEl.find('.navbar').length > 0 || $pageEl.parents('.view').children('.navbar').length > 0) { hasNavbar = true; }
    if ($pageEl.hasClass('no-navbar')) { hasNavbar = false; }
    if (!hasNavbar) { $el.addClass('ptr-no-navbar'); }

    // Define trigger distance
    if ($el.attr('data-ptr-distance')) {
      dynamicTriggerDistance = true;
    } else {
      triggerDistance = isMaterial ? 66 : 44;
    }

    function handleTouchStart(e) {
      if (isTouched) {
        if (Device$1.os === 'android') {
          if ('targetTouches' in e && e.targetTouches.length > 1) { return; }
        } else { return; }
      }

      if ($el.hasClass('ptr-refreshing')) {
        return;
      }

      isMoved = false;
      pullStarted = false;
      isTouched = true;
      isScrolling = undefined;
      wasScrolled = undefined;
      if (e.type === 'touchstart') { touchId = e.targetTouches[0].identifier; }
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    }

    function handleTouchMove(e) {
      if (!isTouched) { return; }
      var pageX;
      var pageY;
      var touch;
      if (e.type === 'touchmove') {
        if (touchId && e.touches) {
          for (var i = 0; i < e.touches.length; i += 1) {
            if (e.touches[i].identifier === touchId) {
              touch = e.touches[i];
            }
          }
        }
        if (!touch) { touch = e.targetTouches[0]; }
        pageX = touch.pageX;
        pageY = touch.pageY;
      } else {
        pageX = e.pageX;
        pageY = e.pageY;
      }
      if (!pageX || !pageY) { return; }


      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (!isScrolling) {
        isTouched = false;
        return;
      }

      scrollTop = $el[0].scrollTop;
      if (typeof wasScrolled === 'undefined' && scrollTop !== 0) { wasScrolled = true; }

      if (!isMoved) {
        $el.removeClass('ptr-transitioning');
        if (scrollTop > $el[0].offsetHeight) {
          isTouched = false;
          return;
        }
        if (dynamicTriggerDistance) {
          triggerDistance = $el.attr('data-ptr-distance');
          if (triggerDistance.indexOf('%') >= 0) { triggerDistance = ($el[0].offsetHeight * parseInt(triggerDistance, 10)) / 100; }
        }
        startTranslate = $el.hasClass('ptr-refreshing') ? triggerDistance : 0;
        if ($el[0].scrollHeight === $el[0].offsetHeight || Device$1.os !== 'ios' || isMaterial) {
          useTranslate = true;
        } else {
          useTranslate = false;
        }
      }
      isMoved = true;
      touchesDiff = pageY - touchesStart.y;

      if ((touchesDiff > 0 && scrollTop <= 0) || scrollTop < 0) {
        // iOS 8 fix
        if (Device$1.os === 'ios' && parseInt(Device$1.osVersion.split('.')[0], 10) > 7 && scrollTop === 0 && !wasScrolled) { useTranslate = true; }

        if (useTranslate) {
          e.preventDefault();
          translate = (Math.pow( touchesDiff, 0.85 )) + startTranslate;
          if (isMaterial) {
            $preloaderEl.transform(("translate3d(0," + translate + "px,0)"))
              .find('.ptr-arrow').transform(("rotate(" + ((180 * (touchesDiff / 66)) + 100) + "deg)"));
          } else {
            $el.transform(("translate3d(0," + translate + "px,0)"));
          }
        }
        if ((useTranslate && (Math.pow( touchesDiff, 0.85 )) > triggerDistance) || (!useTranslate && touchesDiff >= triggerDistance * 2)) {
          refresh = true;
          $el.addClass('ptr-pull-up').removeClass('ptr-pull-down');
        } else {
          refresh = false;
          $el.removeClass('ptr-pull-up').addClass('ptr-pull-down');
        }
        if (!pullStarted) {
          $el.trigger('ptr:pullstart');
          ptr.emit('ptrPullstart', $el[0]);
          pullStarted = true;
        }
        $el.trigger('ptr:pullmove', {
          event: e,
          scrollTop: scrollTop,
          translate: translate,
          touchesDiff: touchesDiff,
        });
        ptr.emit('ptrPullmove', $el[0], {
          event: e,
          scrollTop: scrollTop,
          translate: translate,
          touchesDiff: touchesDiff,
        });
      } else {
        pullStarted = false;
        $el.removeClass('ptr-pull-up ptr-pull-down');
        refresh = false;
      }
    }
    function handleTouchEnd(e) {
      if (e.type === 'touchend' && e.changedTouches && e.changedTouches.length > 0 && touchId) {
        if (e.changedTouches[0].identifier !== touchId) {
          isTouched = false;
          isScrolling = false;
          isMoved = false;
          touchId = null;
          return;
        }
      }
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }
      if (translate) {
        $el.addClass('ptr-transitioning');
        translate = 0;
      }
      if (isMaterial) {
        $preloaderEl.transform('')
          .find('.ptr-arrow').transform('');
      } else {
        $el.transform('');
      }

      if (refresh) {
        $el.addClass('ptr-refreshing');
        $el.trigger('ptr:refresh', ptr.done);
        ptr.emit('ptrRefresh', $el[0], ptr.done);
      } else {
        $el.removeClass('ptr-pull-down');
      }
      isTouched = false;
      isMoved = false;
      if (pullStarted) {
        $el.trigger('ptr:pullend');
        ptr.emit('ptrPullend', $el[0]);
      }
    }

    if (!$pageEl.length || !$el.length) { return ptr; }

    $el[0].f7PullToRefresh = ptr;

    // Events
    ptr.attachEvents = function attachEvents() {
      var passive = Support$1.passiveListener ? { passive: true } : false;
      $el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
    };
    ptr.detachEvents = function detachEvents() {
      var passive = Support$1.passiveListener ? { passive: true } : false;
      $el.off(app.touchEvents.start, handleTouchStart, passive);
      app.off('touchmove', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
    };

    // Install Modules
    ptr.useInstanceModules();

    // Init
    ptr.init();

    return ptr;
  }

  if ( Framework7Class$$1 ) PullToRefresh.__proto__ = Framework7Class$$1;
  PullToRefresh.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  PullToRefresh.prototype.constructor = PullToRefresh;
  PullToRefresh.prototype.init = function init () {
    var ptr = this;
    ptr.attachEvents();
  };
  PullToRefresh.prototype.destroy = function destroy () {
    var ptr = this;
    ptr.emit('ptrBeforeDestroy', ptr);
    ptr.$el.trigger('ptr:beforedestroy', ptr);
    delete ptr.el.f7PullToRefresh;
    ptr.detachEvents();
    Utils$1.deleteProps(ptr);
    ptr = null;
  };

  return PullToRefresh;
}(Framework7Class));

var PullToRefresh = {
  name: 'pullToRefresh',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      ptr: {
        create: function create(el) {
          var $el = dom7$1(el);
          if (!$el.length) { return undefined; }
          if ($el[0].f7PullToRefresh) {
            return $el[0].f7PullToRefresh;
          }
          return new PullToRefresh$1(app, el);
        },
        destroy: function destroy(el) {
          var $el = dom7$1(el);
          if (!$el.length) { return undefined; }
          if ($el[0].f7PullToRefresh) {
            $el[0].f7PullToRefresh.destroy();
          }
          return undefined;
        },
        done: function done(el) {
          var $el = dom7$1(el);
          if (!$el.length) { return undefined; }
          if ($el[0].f7PullToRefresh) {
            return $el[0].f7PullToRefresh.done();
          }
          return undefined;
        },
        refresh: function refresh(el) {
          var $el = dom7$1(el);
          if (!$el.length) { return undefined; }
          if ($el[0].f7PullToRefresh) {
            return $el[0].f7PullToRefresh.refresh();
          }
          return undefined;
        },
      },
    });
  },
  static: {
    PullToRefresh: PullToRefresh$1,
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = dom7$1(tabEl);
      $tabEl.find('.ptr-content').each(function (index, el) {
        app.ptr.create(el);
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var $tabEl = dom7$1(tabEl);
      var app = this;
      $tabEl.find('.ptr-content').each(function (index, el) {
        app.ptr.destroy(el);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.ptr-content').each(function (index, el) {
        app.ptr.create(el);
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.ptr-content').each(function (index, el) {
        app.ptr.destroy(el);
      });
    },
  },
};

var Lazy = {
  destroy: function destroy(pageEl) {
    var $pageEl = dom7$1(pageEl).closest('.page');
    if (!$pageEl.length) { return; }
    if ($pageEl[0].f7DestroyLazy) {
      $pageEl[0].f7DestroyLazy();
    }
  },
  init: function init(pageEl) {
    var app = this;
    var $pageEl = dom7$1(pageEl).closest('.page').eq(0);

    // Lazy images
    var lazyLoadImages = $pageEl.find('.lazy');
    if (lazyLoadImages.length === 0 && !$pageEl.hasClass('lazy')) { return; }

    // Placeholder
    var placeholderSrc = app.params.lazy.placeholder;

    if (placeholderSrc !== false) {
      lazyLoadImages.each(function (index, lazyEl) {
        if (dom7$1(lazyEl).attr('data-src') && !dom7$1(lazyEl).attr('src')) { dom7$1(lazyEl).attr('src', placeholderSrc); }
      });
    }

    // load image
    var imagesSequence = [];
    var imageIsLoading = false;

    function onImageComplete(lazyEl) {
      if (imagesSequence.indexOf(lazyEl) >= 0) {
        imagesSequence.splice(imagesSequence.indexOf(lazyEl), 1);
      }
      imageIsLoading = false;
      if (app.params.lazy.sequential && imagesSequence.length > 0) {
        imageIsLoading = true;
        app.lazy.loadImage(imagesSequence[0], onImageComplete);
      }
    }

    function lazyHandler() {
      app.lazy.load($pageEl, function (lazyEl) {
        if (app.params.lazy.sequential && imageIsLoading) {
          if (imagesSequence.indexOf(lazyEl) < 0) { imagesSequence.push(lazyEl); }
          return;
        }
        imageIsLoading = true;
        app.lazy.loadImage(lazyEl, onImageComplete);
      });
    }

    function attachEvents() {
      $pageEl.on('lazy', lazyHandler);
      $pageEl.on('scroll', lazyHandler, true);
      $pageEl.find('.tab').on('tab:mounted tab:show', lazyHandler);
      app.on('resize', lazyHandler);
    }
    function detachEvents() {
      $pageEl.off('lazy', lazyHandler);
      $pageEl.off('scroll', lazyHandler, true);
      $pageEl.find('.tab').off('tab:mounted tab:show', lazyHandler);
      app.off('resize', lazyHandler);
    }

    // Store detach function
    $pageEl[0].f7DestroyLazy = detachEvents;

    // Attach events
    attachEvents();

    // Run loader on page load/init
    lazyHandler();
  },
  isInViewport: function isInViewport(lazyEl) {
    var app = this;
    var rect = lazyEl.getBoundingClientRect();
    var threshold = app.params.lazy.threshold || 0;

    return (
      rect.top >= (0 - threshold) &&
      rect.left >= (0 - threshold) &&
      rect.top <= (app.height + threshold) &&
      rect.left <= (app.width + threshold)
    );
  },
  loadImage: function loadImage(imageEl, callback) {
    var app = this;
    var $imageEl = dom7$1(imageEl);

    var bg = $imageEl.attr('data-background');
    var src = bg || $imageEl.attr('data-src');
    if (!src) { return; }
    function onLoad() {
      $imageEl.removeClass('lazy').addClass('lazy-loaded');
      if (bg) {
        $imageEl.css('background-image', ("url(" + src + ")"));
      } else {
        $imageEl.attr('src', src);
      }
      if (callback) { callback(imageEl); }
      $imageEl.trigger('lazy:loaded');
      app.emit('lazyLoaded', $imageEl[0]);
    }

    function onError() {
      $imageEl.removeClass('lazy').addClass('lazy-loaded');
      if (bg) {
        $imageEl.css('background-image', ("url(" + (app.params.lazy.placeholder || '') + ")"));
      } else {
        $imageEl.attr('src', app.params.lazy.placeholder || '');
      }
      if (callback) { callback(imageEl); }
      $imageEl.trigger('lazy:error');
      app.emit('lazyError', $imageEl[0]);
    }
    var image = new window.Image();
    image.onload = onLoad;
    image.onerror = onError;
    image.src = src;

    $imageEl.removeAttr('data-src').removeAttr('data-background');

    // Add loaded callback and events
    $imageEl.trigger('lazy:load');
    app.emit('lazyLoad', $imageEl[0]);
  },
  load: function load(pageEl, callback) {
    var app = this;
    var $pageEl = dom7$1(pageEl);
    if (!$pageEl.hasClass('page')) { $pageEl = $pageEl.parents('.page').eq(0); }
    if ($pageEl.length === 0) {
      return;
    }
    $pageEl.find('.lazy').each(function (index, lazyEl) {
      var $lazyEl = dom7$1(lazyEl);
      if ($lazyEl.parents('.tab:not(.tab-active)').length > 0) {
        return;
      }
      if (app.lazy.isInViewport(lazyEl)) {
        if (callback) { callback(lazyEl); }
        else { app.lazy.loadImage(lazyEl); }
      }
    });
  },

};
var Lazy$1 = {
  name: 'lazy',
  params: {
    lazy: {
      placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==',
      threshold: 0,
      sequential: true,
    },
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      lazy: {
        init: Lazy.init.bind(app),
        destroy: Lazy.destroy.bind(app),
        loadImage: Lazy.loadImage.bind(app),
        load: Lazy.load.bind(app),
        isInViewport: Lazy.isInViewport.bind(app),
      },
    });
  },
  on: {
    pageInit: function pageInit(page) {
      var app = this;
      if (page.$el.find('.lazy').length > 0 || page.$el.hasClass('lazy')) {
        app.lazy.init(page.$el);
      }
    },
    pageAfterIn: function pageAfterIn(page) {
      var app = this;
      if (page.$el.find('.lazy').length > 0 || page.$el.hasClass('lazy')) {
        app.lazy.init(page.$el);
      }
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      if (page.$el.find('.lazy').length > 0 || page.$el.hasClass('lazy')) {
        app.lazy.destroy(page.$el);
      }
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      var $tabEl = dom7$1(tabEl);
      if ($tabEl.find('.lazy').length > 0 || $tabEl.hasClass('lazy')) {
        app.lazy.init($tabEl);
      }
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      var $tabEl = dom7$1(tabEl);
      if ($tabEl.find('.lazy').length > 0 || $tabEl.hasClass('lazy')) {
        app.lazy.destroy($tabEl);
      }
    },
  },
};

var DataTable$1 = (function (Framework7Class$$1) {
  function DataTable(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);

    var table = this;

    var defaults = {

    };

    // Extend defaults with modules params
    table.useInstanceModulesParams(defaults);

    table.params = Utils$1.extend(defaults, params);

    // El
    var $el = dom7$1(table.params.el);
    if ($el.length === 0) { return undefined; }

    table.$el = $el;
    table.el = $el[0];

    if (table.$el[0].f7DataTable) {
      var instance = table.$el[0].f7DataTable;
      table.destroy();
      return instance;
    }

    table.$el[0].f7DataTable = table;

    Utils$1.extend(table, {
      collapsible: $el.hasClass('data-table-collapsible'),
      // Headers
      $headerEl: $el.find('.data-table-header'),
      $headerSelectedEl: $el.find('.data-table-header-selected'),
    });

    // Events
    function handleChange(e) {
      if (e.detail && e.detail.sentByF7DataTable) {
        // Scripted event, don't do anything
        return;
      }
      var $inputEl = dom7$1(this);
      var checked = $inputEl[0].checked;
      var columnIndex = $inputEl.parents('td,th').index();

      if ($inputEl.parents('thead').length > 0) {
        if (columnIndex === 0) {
          $el
            .find('tbody tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }
        $el
          .find(("tbody tr td:nth-child(" + (columnIndex + 1) + ") input"))
            .prop('checked', checked)
            .trigger('change', { sentByF7DataTable: true });
      } else {
        if (columnIndex === 0) {
          $inputEl.parents('tr')[checked ? 'addClass' : 'removeClass']('data-table-row-selected');
        }

        if (!checked) {
          $el.find(("thead .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]")).prop('checked', false);
        } else if ($el.find(("tbody .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]:checked")).length === $el.find('tbody tr').length) {
          $el.find(("thead .checkbox-cell:nth-child(" + (columnIndex + 1) + ") input[type=\"checkbox\"]")).prop('checked', true).trigger('change', { sentByF7DataTable: true });
        }
      }
      table.checkSelectedHeader();
    }
    function handleSortableClick() {
      var $cellEl = dom7$1(this);
      var isActive = $cellEl.hasClass('sortable-cell-active');
      var currentSort;
      if (isActive) {
        currentSort = $cellEl.hasClass('sortable-desc') ? 'desc' : 'asc';
        $cellEl.removeClass('sortable-desc sortable-asc').addClass(("sortable-" + (currentSort === 'desc' ? 'asc' : 'desc')));
      } else {
        $el.find('thead .sortable-cell-active').removeClass('sortable-cell-active');
        $cellEl.addClass('sortable-cell-active');
      }
    }
    table.attachEvents = function attachEvents() {
      table.$el.on('change', '.checkbox-cell input[type="checkbox"]', handleChange);
      table.$el.find('thead .sortable-cell').on('click', handleSortableClick);
    };
    table.detachEvents = function detachEvents() {
      table.$el.off('change', '.checkbox-cell input[type="checkbox"]', handleChange);
      table.$el.find('thead .sortable-cell').off('click', handleSortableClick);
    };

    // Install Modules
    table.useInstanceModules();

    // Init
    table.init();

    return table;
  }

  if ( Framework7Class$$1 ) DataTable.__proto__ = Framework7Class$$1;
  DataTable.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  DataTable.prototype.constructor = DataTable;
  DataTable.prototype.setCollapsibleLabels = function setCollapsibleLabels () {
    var table = this;
    if (!table.collapsible) { return; }
    table.$el.find('tbody td:not(.checkbox-cell)').each(function (index, el) {
      var $el = dom7$1(el);
      var elIndex = $el.index();
      var collpsibleTitle = $el.attr('data-collapsible-title');
      if (!collpsibleTitle && collpsibleTitle !== '') {
        $el.attr('data-collapsible-title', table.$el.find('thead th').eq(elIndex).text());
      }
    });
  };
  DataTable.prototype.checkSelectedHeader = function checkSelectedHeader () {
    var table = this;
    if (table.$headerEl.length > 0 && table.$headerSelectedEl.length > 0) {
      var checkedItems = table.$el.find('tbody .checkbox-cell input:checked').length;
      table.$el[checkedItems > 0 ? 'addClass' : 'removeClass']('data-table-has-checked');
      table.$headerSelectedEl.find('.data-table-selected-count').text(checkedItems);
    }
  };
  DataTable.prototype.init = function init () {
    var table = this;
    table.attachEvents();
    table.setCollapsibleLabels();
    table.checkSelectedHeader();
  };
  DataTable.prototype.destroy = function destroy () {
    var table = this;

    table.emit('datatableBeforeDestroy', table);
    table.$el.trigger('datatable:beforedestroy', table);

    table.attachEvents();
    table.$el[0].f7DataTable = null;
    delete table.$el[0].f7DataTable;
    Utils$1.deleteProps(table);
    table = null;
  };

  return DataTable;
}(Framework7Class));

var DataTable = {
  name: 'dataTable',
  static: {
    DataTable: DataTable$1,
  },
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      dataTable: {
        create: function create(params) {
          return new DataTable$1(app, params);
        },
        destroy: function destroy(tableEl) {
          var $tableEl = dom7$1(tableEl);
          if (!$tableEl.length) { return undefined; }
          var dataTable = $tableEl[0].f7DataTable;
          if (!dataTable) { return undefined; }
          return dataTable.destroy();
        },
      },
    });
  },
  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.destroy(tableEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.create({ el: tableEl });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.destroy(tableEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.data-table-init').each(function (index, tableEl) {
        app.dataTable.create({ el: tableEl });
      });
    },
  },
  clicks: {

  },
};

var Fab = {
  morphOpen: function morphOpen(fabEl, targetEl) {
    var app = this;
    var $fabEl = dom7$1(fabEl);
    var $targetEl = dom7$1(targetEl);
    if ($targetEl.length === 0) { return; }

    $targetEl.transition(0).addClass('fab-morph-target-visible');
    var target = {
      width: $targetEl[0].offsetWidth,
      height: $targetEl[0].offsetHeight,
      offset: $targetEl.offset(),
      borderRadius: $targetEl.css('border-radius'),
      zIndex: $targetEl.css('z-index'),
    };
    var fab = {
      width: $fabEl[0].offsetWidth,
      height: $fabEl[0].offsetHeight,
      offset: $fabEl.offset(),
      translateX: dom7$1.getTranslate($fabEl[0], 'x'),
      translateY: dom7$1.getTranslate($fabEl[0], 'y'),
    };

    $fabEl[0].f7FabMorphData = {
      $targetEl: $targetEl,
      target: target,
      fab: fab,
    };

    var diffX = (fab.offset.left + (fab.width / 2)) -
                  (target.offset.left + (target.width / 2)) -
                  fab.translateX;
    var diffY = (fab.offset.top + (fab.height / 2)) -
                  (target.offset.top + (target.height / 2)) -
                  fab.translateY;
    var scaleX = target.width / fab.width;
    var scaleY = target.height / fab.height;

    var borderRadius = Math.ceil(parseInt(target.borderRadius, 10) / Math.max(scaleX, scaleY));
    if (borderRadius > 0) { borderRadius += 2; }

    $fabEl[0].f7FabMorphResizeHandler = function resizeHandler() {
      $fabEl.transition(0).transform('');
      $targetEl.transition(0);
      target.width = $targetEl[0].offsetWidth;
      target.height = $targetEl[0].offsetHeight;
      target.offset = $targetEl.offset();
      fab.offset = $fabEl.offset();

      var diffXNew = (fab.offset.left + (fab.width / 2)) -
                      (target.offset.left + (target.width / 2)) -
                      fab.translateX;
      var diffYNew = (fab.offset.top + (fab.height / 2)) -
                      (target.offset.top + (target.height / 2)) -
                      fab.translateY;
      var scaleXNew = target.width / fab.width;
      var scaleYNew = target.height / fab.height;

      $fabEl.transform(("translate3d(" + (-diffXNew) + "px, " + (-diffYNew) + "px, 0) scale(" + scaleXNew + ", " + scaleYNew + ")"));
    };

    $targetEl
      .css('opacity', 0)
      .transform(("scale(" + (1 / scaleX) + ", " + (1 / scaleY) + ")"));
    $fabEl
      .addClass('fab-opened')
      .css('z-index', target.zIndex - 1)
      .transform(("translate3d(" + (-diffX) + "px, " + (-diffY) + "px, 0)"));
    $fabEl.transitionEnd(function () {
      $targetEl.transition('');
      Utils$1.nextTick(function () {
        $targetEl.css('opacity', 1).transform('scale(1,1)');
      });
      $fabEl.transform(("translate3d(" + (-diffX) + "px, " + (-diffY) + "px, 0) scale(" + scaleX + ", " + scaleY + ")"))
            .css('border-radius', (borderRadius + "px"))
            .css('box-shadow', 'none');
      app.on('resize', $fabEl[0].f7FabMorphResizeHandler);
      if ($targetEl.parents('.page-content').length > 0) {
        $targetEl.parents('.page-content').on('scroll', $fabEl[0].f7FabMorphResizeHandler);
      }
    });
  },
  morphClose: function morphClose(fabEl) {
    var app = this;
    var $fabEl = dom7$1(fabEl);
    var morphData = $fabEl[0].f7FabMorphData;
    if (!morphData) { return; }
    var $targetEl = morphData.$targetEl;
    var target = morphData.target;
    var fab = morphData.fab;
    if ($targetEl.length === 0) { return; }

    var diffX = (fab.offset.left + (fab.width / 2)) -
                  (target.offset.left + (target.width / 2)) -
                  fab.translateX;
    var diffY = (fab.offset.top + (fab.height / 2)) -
                  (target.offset.top + (target.height / 2)) -
                  fab.translateY;
    var scaleX = target.width / fab.width;
    var scaleY = target.height / fab.height;

    app.off('resize', $fabEl[0].f7FabMorphResizeHandler);
    if ($targetEl.parents('.page-content').length > 0) {
      $targetEl.parents('.page-content').off('scroll', $fabEl[0].f7FabMorphResizeHandler);
    }

    $targetEl
      .css('opacity', 0)
      .transform(("scale(" + (1 / scaleX) + ", " + (1 / scaleY) + ")"));
    $fabEl
      .transition('')
      .css('box-shadow', '')
      .css('border-radius', '')
      .transform(("translate3d(" + (-diffX) + "px, " + (-diffY) + "px, 0)"));
    $fabEl.transitionEnd(function () {
      $fabEl
        .css('z-index', '')
        .removeClass('fab-opened')
        .transform('');
      Utils$1.nextTick(function () {
        $fabEl.transitionEnd(function () {
          $targetEl
            .removeClass('fab-morph-target-visible')
            .css('opacity', '')
            .transform('')
            .transition('');
        });
      });
    });
  },
  open: function open(fabEl, targetEl) {
    var app = this;
    var $fabEl = dom7$1(fabEl).eq(0);
    var $buttonsEl = $fabEl.find('.fab-buttons');
    if (!$fabEl.length) { return; }
    if ($fabEl.hasClass('fab-opened')) { return; }
    if (!$buttonsEl.length && !$fabEl.hasClass('fab-morph')) { return; }

    if (app.fab.openedEl) {
      if (app.fab.openedEl === $fabEl[0]) { return; }
      app.fab.close(app.fab.openedEl);
    }
    app.fab.openedEl = $fabEl[0];
    if ($fabEl.hasClass('fab-morph')) {
      app.fab.morphOpen($fabEl, targetEl || $fabEl.attr('data-morph-to'));
    } else {
      $fabEl.addClass('fab-opened');
    }
    $fabEl.trigger('fab:open');
  },
  close: function close(fabEl) {
    if ( fabEl === void 0 ) fabEl = '.fab-opened';

    var app = this;
    var $fabEl = dom7$1(fabEl).eq(0);
    var $buttonsEl = $fabEl.find('.fab-buttons');
    if (!$fabEl.length) { return; }
    if (!$fabEl.hasClass('fab-opened')) { return; }
    if (!$buttonsEl.length && !$fabEl.hasClass('fab-morph')) { return; }
    app.fab.openedEl = null;
    if ($fabEl.hasClass('fab-morph')) {
      app.fab.morphClose($fabEl);
    } else {
      $fabEl.removeClass('fab-opened');
    }
    $fabEl.trigger('fab:close');
  },
  toggle: function toggle(fabEl) {
    var app = this;
    var $fabEl = dom7$1(fabEl);
    if (!$fabEl.hasClass('fab-opened')) { app.fab.open(fabEl); }
    else { app.fab.close(fabEl); }
  },
};

var Fab$1 = {
  name: 'fab',
  create: function create() {
    var app = this;
    Utils$1.extend(app, {
      fab: {
        openedEl: null,
        morphOpen: Fab.morphOpen.bind(app),
        morphClose: Fab.morphClose.bind(app),
        open: Fab.open.bind(app),
        close: Fab.close.bind(app),
        toggle: Fab.toggle.bind(app),
      },
    });
  },
  clicks: {
    '.fab > a': function open($clickedEl) {
      var app = this;
      app.fab.toggle($clickedEl.parents('.fab'));
    },
    '.fab-open': function open($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.fab.open(data.fab);
    },
    '.fab-close': function close($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      app.fab.close(data.fab);
    },
  },
};

var Searchbar$1 = (function (FrameworkClass) {
  function Searchbar(app, params) {
    if ( params === void 0 ) params = {};

    FrameworkClass.call(this, params, [app]);

    var sb = this;

    var defaults = {
      el: undefined,
      inputEl: undefined,
      disableButton: true,
      disableButtonEl: undefined,
      backdropEl: undefined,
      searchContainer: undefined, // container to search, HTMLElement or CSS selector
      searchItem: 'li', // single item selector, CSS selector
      searchIn: undefined, // where to search in item, CSS selector
      ignore: '.searchbar-ignore',
      foundEl: '.searchbar-found',
      notFoundEl: '.searchbar-not-found',
      backdrop: true,
      removeDiacritics: false,
      customSearch: false,
      hideDividers: true,
      hideGroups: true,
      disableOnBackdropClick: true,
      expandable: false,
    };

    // Extend defaults with modules params
    sb.useInstanceModulesParams(defaults);

    sb.params = Utils$1.extend(defaults, params);

    var $el = dom7$1(sb.params.el);
    if ($el.length === 0) { return sb; }

    $el[0].f7Searchbar = sb;

    var $pageEl;
    var $navbarEl;
    if ($el.parents('.page').length > 0) {
      $pageEl = $el.parents('.page');
    } else {
      $navbarEl = $el.parents('.navbar-inner');
      if ($navbarEl.length > 0) {
        if ($navbarEl[0].f7Page) {
          $pageEl = $navbarEl[0].f7Page.$el;
        } else {
          var $currentPageEl = $el.parents('.view').find('.page-current');
          if ($currentPageEl[0] && $currentPageEl[0].f7Page && $currentPageEl[0].f7Page.navbarEl === $navbarEl[0]) {
            $pageEl = $currentPageEl;
          }
        }
      }
    }

    var $foundEl;
    if (params.foundEl) {
      $foundEl = dom7$1(params.foundEl);
    } else if ($pageEl) {
      $foundEl = $pageEl.find(sb.params.foundEl);
    }

    var $notFoundEl;
    if (params.notFoundEl) {
      $notFoundEl = dom7$1(params.notFoundEl);
    } else if ($pageEl) {
      $notFoundEl = $pageEl.find(sb.params.notFoundEl);
    }

    var $backdropEl;
    if (sb.params.backdrop) {
      if (sb.params.backdropEl) {
        $backdropEl = dom7$1(sb.params.backdropEl);
      } else if ($pageEl && $pageEl.length > 0) {
        $backdropEl = $pageEl.find('.searchbar-backdrop');
      } else {
        $backdropEl = $el.siblings('.searchbar-backdrop');
      }
      if ($backdropEl.length === 0) {
        $backdropEl = dom7$1('<div class="searchbar-backdrop"></div>');
        if ($pageEl && $pageEl.length) {
          if ($el.parents($pageEl).length > 0 && $navbarEl && $el.parents($navbarEl).length === 0) {
            $backdropEl.insertBefore($el);
          } else {
            $backdropEl.insertBefore($pageEl.find('.page-content').eq(0));
          }
        } else {
          $backdropEl.insertBefore($el);
        }
      }
    }

    var $searchContainer;
    if (sb.params.searchContainer) {
      $searchContainer = dom7$1(sb.params.searchContainer);
    }

    var $inputEl;
    if (sb.params.inputEl) {
      $inputEl = dom7$1(sb.params.inputEl);
    } else {
      $inputEl = $el.find('input[type="search"]').eq(0);
    }

    var $disableButtonEl;
    if (sb.params.disableButton) {
      if (sb.params.disableButtonEl) {
        $disableButtonEl = dom7$1(sb.params.disableButtonEl);
      } else {
        $disableButtonEl = $el.find('.searchbar-disable-button');
      }
    }

    Utils$1.extend(sb, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      $searchContainer: $searchContainer,
      searchContainer: $searchContainer && $searchContainer[0],
      $inputEl: $inputEl,
      inputEl: $inputEl[0],
      $disableButtonEl: $disableButtonEl,
      disableButtonEl: $disableButtonEl[0],
      disableButtonHasMargin: false,
      $pageEl: $pageEl,
      pageEl: $pageEl && $pageEl[0],
      $foundEl: $foundEl,
      foundEl: $foundEl && $foundEl[0],
      $notFoundEl: $notFoundEl,
      notFoundEl: $notFoundEl && $notFoundEl[0],
      previousQuery: '',
      query: '',
      isVirtualList: $searchContainer && $searchContainer.hasClass('virtual-list'),
      virtualList: undefined,
      enabled: false,
      expandable: sb.params.expandable || $el.hasClass('searchbar-expandable'),
    });

    // Events
    function preventSubmit(e) {
      e.preventDefault();
    }
    function onInputFocus(e) {
      sb.enable(e);
    }
    function onInputChange() {
      var value = sb.$inputEl.val().trim();
      if (
          ((sb.$searchContainer && sb.$searchContainer.length > 0) || sb.params.customSearch) &&
          (sb.params.searchIn || sb.isVirtualList)
        ) {
        sb.search(value, true);
      }
    }
    function onInputClear(e, previousValue) {
      sb.$el.trigger('searchbar:clear', previousValue);
      sb.emit('searchbarClear', previousValue);
    }
    function disableOnClick(e) {
      sb.disable(e);
    }
    sb.attachEvents = function attachEvents() {
      $el.on('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.on('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.on('click', disableOnClick);
      }
      sb.$inputEl.on('focus', onInputFocus);
      sb.$inputEl.on('change input compositionend', onInputChange);
      sb.$inputEl.on('input:clear', onInputClear);
    };
    sb.detachEvents = function detachEvents() {
      $el.off('submit', preventSubmit);
      if (sb.params.disableButton) {
        sb.$disableButtonEl.off('click', disableOnClick);
      }
      if (sb.params.disableOnBackdropClick && sb.$backdropEl) {
        sb.$backdropEl.off('click', disableOnClick);
      }
      sb.$inputEl.off('focus', onInputFocus);
      sb.$inputEl.off('change input compositionend', onInputChange);
      sb.$inputEl.off('input:clear', onInputClear);
    };

    // Install Modules
    sb.useInstanceModules();

    // Init
    sb.init();

    return sb;
  }

  if ( FrameworkClass ) Searchbar.__proto__ = FrameworkClass;
  Searchbar.prototype = Object.create( FrameworkClass && FrameworkClass.prototype );
  Searchbar.prototype.constructor = Searchbar;
  Searchbar.prototype.clear = function clear (e) {
    var sb = this;
    if (!sb.query && e && dom7$1(e.target).hasClass('searchbar-clear')) {
      sb.disable();
      return sb;
    }
    var previousQuery = sb.value;
    sb.$inputEl.val('').trigger('change').focus();
    sb.$el.trigger('searchbar:clear', previousQuery);
    sb.emit('searchbarClear', previousQuery);
    return sb;
  };
  Searchbar.prototype.setDisableButtonMargin = function setDisableButtonMargin () {
    var sb = this;
    if (sb.expandable) { return; }
    var app = sb.app;
    sb.$disableButtonEl.transition(0).show();
    sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), ((-sb.disableButtonEl.offsetWidth) + "px"));
    var clientLeft = sb.$disableButtonEl[0].clientLeft;
    sb.$disableButtonEl.transition('');
    sb.disableButtonHasMargin = true;
  };
  Searchbar.prototype.enable = function enable (setFocus) {
    var sb = this;
    if (sb.enabled) { return sb; }
    var app = sb.app;
    sb.enabled = true;
    function enable() {
      if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch) && !sb.$el.hasClass('searchbar-enabled') && !sb.query) {
        sb.$backdropEl.addClass('searchbar-backdrop-in');
      }
      sb.$el.addClass('searchbar-enabled');
      if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
        if (!sb.disableButtonHasMargin) {
          sb.setDisableButtonMargin();
        }
        sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), '0px');
      }
      sb.$el.trigger('searchbar:enable');
      sb.emit('searchbarEnable');
    }
    var needsFocus = false;
    if (setFocus === true) {
      if (document.activeElement !== sb.inputEl) {
        needsFocus = true;
      }
    }
    var isIos = app.device.ios && app.theme === 'ios';
    if (isIos) {
      if (sb.expandable) {
        if (needsFocus) { sb.$inputEl.focus(); }
        enable();
      } else {
        if (needsFocus) { sb.$inputEl.focus(); }
        if (setFocus && (setFocus.type === 'focus' || setFocus === true)) {
          Utils$1.nextTick(function () {
            enable();
          }, 400);
        } else {
          enable();
        }
      }
    } else {
      if (needsFocus) { sb.$inputEl.focus(); }
      enable();
    }
    return sb;
  };
  Searchbar.prototype.disable = function disable () {
    var sb = this;
    if (!sb.enabled) { return sb; }
    var app = sb.app;
    sb.$inputEl.val('').trigger('change');
    sb.$el.removeClass('searchbar-enabled');
    if (!sb.expandable && sb.$disableButtonEl && sb.$disableButtonEl.length > 0 && app.theme === 'ios') {
      sb.$disableButtonEl.css(("margin-" + (app.rtl ? 'left' : 'right')), ((-sb.disableButtonEl.offsetWidth) + "px"));
    }

    if (sb.$backdropEl && ((sb.$searchContainer && sb.$searchContainer.length) || sb.params.customSearch)) {
      sb.$backdropEl.removeClass('searchbar-backdrop-in');
    }

    sb.enabled = false;

    sb.$inputEl.blur();

    sb.$el.trigger('searchbar:disable');
    sb.emit('searchbarDisable');
    return sb;
  };
  Searchbar.prototype.toggle = function toggle () {
    var sb = this;
    if (sb.enabled) { sb.disable(); }
    else { sb.enable(true); }
    return sb;
  };
  Searchbar.prototype.search = function search (query, internal) {
    var sb = this;
    if (sb.previousQuery && query.trim() === sb.previousQuery) { return sb; }
    if (typeof (sb.previousQuery) !== 'undefined' && sb.previousQuery.trim() === '' && query.trim() === '') { return sb; }
    sb.previousQuery = query.trim();

    if (!internal) {
      if (!sb.enabled) {
        sb.enable();
      }
      sb.$inputEl.val(query);
    }
    sb.query = query;
    sb.value = query;

    var $searchContainer = sb.$searchContainer;
    var $el = sb.$el;
    var $backdropEl = sb.$backdropEl;
    var $foundEl = sb.$foundEl;
    var $notFoundEl = sb.$notFoundEl;
    var isVirtualList = sb.isVirtualList;

    // Add active/inactive classes on overlay
    if (query.length === 0) {
      if ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled') && $backdropEl) { $backdropEl.addClass('searchbar-backdrop-in'); }
    } else if ($searchContainer && $searchContainer.length && $el.hasClass('searchbar-enabled')) {
      $backdropEl.removeClass('searchbar-backdrop-in');
    }

    if (sb.params.customSearch) {
      $el.trigger('searhbar:search', query);
      sb.emit('searhbarSearch', query);
      return sb;
    }

    var foundItems = [];
    var vlQuery;
    if (isVirtualList) {
      sb.virtualList = $searchContainer[0].f7VirtualList;
      if (query.trim() === '') {
        sb.virtualList.resetFilter();
        if ($notFoundEl) { $notFoundEl.hide(); }
        if ($foundEl) { $foundEl.show(); }
        return sb;
      }
      vlQuery = sb.params.removeDiacritics ? dom7$1.removeDiacritics(query) : query;
      if (sb.virtualList.params.searchAll) {
        foundItems = sb.virtualList.params.searchAll(vlQuery, sb.virtualList.items) || [];
      } else if (sb.virtualList.params.searchByItem) {
        for (var i = 0; i < sb.virtualList.items.length; i += 1) {
          if (sb.virtualList.params.searchByItem(vlQuery, i, sb.virtualList.params.items[i])) {
            foundItems.push(i);
          }
        }
      }
    } else {
      var values;
      if (sb.params.removeDiacritics) { values = dom7$1.removeDiacritics(query.trim().toLowerCase()).split(' '); }
      else {
        values = query.trim().toLowerCase().split(' ');
      }
      $searchContainer.find(sb.params.searchItem).removeClass('hidden-by-searchbar').each(function (itemIndex, itemEl) {
        var $itemEl = dom7$1(itemEl);
        var compareWithText = [];
        $itemEl.find(sb.params.searchIn).each(function (searchInIndex, searchInEl) {
          var itemText = dom7$1(searchInEl).text().trim().toLowerCase();
          if (sb.params.removeDiacritics) { itemText = dom7$1.removeDiacritics(itemText); }
          compareWithText.push(itemText);
        });
        compareWithText = compareWithText.join(' ');
        var wordsMatch = 0;
        for (var i = 0; i < values.length; i += 1) {
          if (compareWithText.indexOf(values[i]) >= 0) { wordsMatch += 1; }
        }
        if (wordsMatch !== values.length && !(sb.params.ignore && $itemEl.is(sb.params.ignore))) {
          $itemEl.addClass('hidden-by-searchbar');
        } else {
          foundItems.push($itemEl[0]);
        }
      });

      if (sb.params.hideDividers) {
        $searchContainer.find('.item-divider, .list-group-title').each(function (titleIndex, titleEl) {
          var $titleEl = dom7$1(titleEl);
          var $nextElements = $titleEl.nextAll('li');
          var hide = true;
          for (var i = 0; i < $nextElements.length; i += 1) {
            var $nextEl = $nextElements.eq(i);
            if ($nextEl.hasClass('list-group-title') || $nextEl.hasClass('item-divider')) { break; }
            if (!$nextEl.hasClass('hidden-by-searchbar')) {
              hide = false;
            }
          }
          var ignore = sb.params.ignore && $titleEl.is(sb.params.ignore);
          if (hide && !ignore) { $titleEl.addClass('hidden-by-searchbar'); }
          else { $titleEl.removeClass('hidden-by-searchbar'); }
        });
      }
      if (sb.params.hideGroups) {
        $searchContainer.find('.list-group').each(function (groupIndex, groupEl) {
          var $groupEl = dom7$1(groupEl);
          var ignore = sb.params.ignore && $groupEl.is(sb.params.ignore);
          var notHidden = $groupEl.find('li:not(.hidden-by-searchbar)');
          if (notHidden.length === 0 && !ignore) {
            $groupEl.addClass('hidden-by-searchbar');
          } else {
            $groupEl.removeClass('hidden-by-searchbar');
          }
        });
      }
    }
    $el.trigger('searchbar:search', query, foundItems);
    sb.emit('searchbarSearch', query, foundItems);
    if (foundItems.length === 0) {
      if ($notFoundEl) { $notFoundEl.show(); }
      if ($foundEl) { $foundEl.hide(); }
    } else {
      if ($notFoundEl) { $notFoundEl.hide(); }
      if ($foundEl) { $foundEl.show(); }
    }
    if (isVirtualList && sb.virtualList) {
      sb.virtualList.filterItems(foundItems);
    }
    return sb;
  };
  Searchbar.prototype.init = function init () {
    var sb = this;
    sb.attachEvents();
  };
  Searchbar.prototype.destroy = function destroy () {
    var sb = this;
    sb.emit('searchbarBeforeDestroy', sb);
    sb.$el.trigger('searchbar:beforedestroy', sb);
    sb.detachEvents();
    delete sb.$el.f7Searchbar;
    Utils$1.deleteProps(sb);
  };

  return Searchbar;
}(Framework7Class));

var Searchbar = {
  name: 'searchbar',
  create: function create() {
    var app = this;
    var searchbar = {
      create: function create(params) {
        return new Searchbar$1(app, params);
      },
      get: function get(searchbarEl) {
        var $searchbarEl = dom7$1(searchbarEl);
        if ($searchbarEl.length && $searchbarEl[0].f7Searchbar) {
          return $searchbarEl[0].f7Searchbar;
        }
        return undefined;
      },
    };
    ('clear enable disable toggle search destroy').split(' ').forEach(function (searchbarMethod) {
      searchbar[searchbarMethod] = function (searchbarEl) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        if ( searchbarEl === void 0 ) searchbarEl = '.searchbar';
        var sb = app.searchbar.get(searchbarEl);
        if (sb) { return sb[searchbarMethod].apply(sb, args); }
        return undefined;
      };
    });
    Utils$1.extend(app, {
      searchbar: searchbar,
    });
  },
  static: {
    Searchbar: Searchbar$1,
  },
  on: {
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.searchbar-init').each(function (index, searchbarEl) {
        var $searchbarEl = dom7$1(searchbarEl);
        app.searchbar.create(Utils$1.extend($searchbarEl.dataset(), { el: searchbarEl }));
      });
    },
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      dom7$1(tabEl).find('.searchbar-init').each(function (index, searchbarEl) {
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.searchbar-init').each(function (index, searchbarEl) {
        var $searchbarEl = dom7$1(searchbarEl);
        app.searchbar.create(Utils$1.extend($searchbarEl.dataset(), { el: searchbarEl }));
      });
      if (app.theme === 'ios' && page.view && page.view.router.separateNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
        page.$navbarEl.find('.searchbar-init').each(function (index, searchbarEl) {
          var $searchbarEl = dom7$1(searchbarEl);
          app.searchbar.create(Utils$1.extend($searchbarEl.dataset(), { el: searchbarEl }));
        });
      }
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.searchbar-init').each(function (index, searchbarEl) {
        if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
          searchbarEl.f7Searchbar.destroy();
        }
      });
      if (app.theme === 'ios' && page.view && page.view.router.separateNavbar && page.$navbarEl && page.$navbarEl.length > 0) {
        page.$navbarEl.find('.searchbar-init').each(function (index, searchbarEl) {
          if (searchbarEl.f7Searchbar && searchbarEl.f7Searchbar.destroy) {
            searchbarEl.f7Searchbar.destroy();
          }
        });
      }
    },
  },
  clicks: {
    '.searchbar-clear': function clear($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) { sb.clear(); }
    },
    '.searchbar-enable': function enable($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) { sb.enable(true); }
    },
    '.searchbar-disable': function disable($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) { sb.disable(); }
    },
    '.searchbar-toggle': function toggle($clickedEl, data) {
      if ( data === void 0 ) data = {};

      var app = this;
      var sb = app.searchbar.get(data.searchbar);
      if (sb) { sb.toggle(); }
    },
  },
};

var Messages$1 = (function (Framework7Class$$1) {
  function Messages(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);

    var m = this;

    var defaults = {
      autoLayout: true,
      messages: [],
      newMessagesFirst: false,
      scrollMessages: true,
      scrollMessagesOnEdge: true,
      firstMessageRule: undefined,
      lastMessageRule: undefined,
      tailMessageRule: undefined,
      sameNameMessageRule: undefined,
      sameHeaderMessageRule: undefined,
      sameFooterMessageRule: undefined,
      sameAvatarMessageRule: undefined,
      customClassMessageRule: undefined,
      renderMessage: undefined,
    };

    // Extend defaults with modules params
    m.useInstanceModulesParams(defaults);

    m.params = Utils$1.extend(defaults, params);

    var $el = dom7$1(params.el).eq(0);
    if ($el.length === 0) { return m; }

    $el[0].f7Messages = m;

    var $pageContentEl = $el.closest('.page-content').eq(0);

    Utils$1.extend(m, {
      messages: m.params.messages,
      $el: $el,
      el: $el[0],
      $pageContentEl: $pageContentEl,
      pageContentEl: $pageContentEl[0],

    });
    // Install Modules
    m.useInstanceModules();

    // Init
    m.init();

    return m;
  }

  if ( Framework7Class$$1 ) Messages.__proto__ = Framework7Class$$1;
  Messages.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Messages.prototype.constructor = Messages;
  Messages.prototype.getMessageData = function getMessageData (messageEl) {
    var m = this;
    var $messageEl = dom7$1(messageEl);
    var data = {
      avatar: $messageEl.css('background-image'),
      name: $messageEl.find('.message-name').html(),
      header: $messageEl.find('.message-header').html(),
      textHeader: $messageEl.find('.message-text-header').html(),
      textFooter: $messageEl.find('.message-text-footer').html(),
      footer: $messageEl.find('.message-footer').html(),
      isTitle: $messageEl.hasClass('messages-title'),
      type: $messageEl.hasClass('message-sent') ? 'sent' : 'received',
      text: $messageEl.find('.message-text').html(),
      image: $messageEl.find('.message-image').html(),
      imageSrc: $messageEl.find('.message-image img').attr('src'),
      typing: $messageEl.hasClass('message-typing'),
    };
    if (data.isTitle) {
      data.text = $messageEl.html();
    }
    if (data.text && data.textHeader) {
      data.text = data.text.replace(("<div class=\"message-text-header\">" + (data.textHeader) + "</div>"), '');
    }
    if (data.text && data.textFooter) {
      data.text = data.text.replace(("<div class=\"message-text-footer\">" + (data.textFooter) + "</div>"), '');
    }
    var avatar = $messageEl.css('background-image');
    if (avatar === 'none' || avatar === '') { avatar = undefined; }
    data.avatar = avatar;

    return data;
  };
  Messages.prototype.getMessagesData = function getMessagesData () {
    var m = this;
    var data = [];
    m.$el.find('.message, .messages-title').each(function (index, messageEl) {
      data.push(m.getMessageData(messageEl));
    });
    return data;
  };
  Messages.prototype.renderMessage = function renderMessage (messageToRender) {
    var m = this;
    var message = Utils$1.extend({
      type: 'sent',
    }, messageToRender);
    if (m.params.renderMessage) {
      return m.params.renderMessage(message);
    }
    if (message.isTitle) {
      return ("<div class=\"messages-title\">" + (message.text) + "</div>");
    }
    return ("\n      <div class=\"message message-" + (message.type) + " " + (message.isTyping ? 'message-typing' : '') + "\">\n        " + (message.avatar ? ("\n        <div class=\"message-avatar\" style=\"background-image:url(" + (message.avatar) + ")\"></div>\n        ") : '') + "\n        <div class=\"message-content\">\n          " + (message.name ? ("<div class=\"message-name\">" + (message.name) + "</div>") : '') + "\n          " + (message.header ? ("<div class=\"message-header\">" + (message.header) + "</div>") : '') + "\n          <div class=\"message-bubble\">\n            " + (message.textHeader ? ("<div class=\"message-text-header\">" + (message.textHeader) + "</div>") : '') + "\n            " + (message.image ? ("<div class=\"message-image\">" + (message.image) + "</div>") : '') + "\n            " + (message.imageSrc && !message.image ? ("<div class=\"message-image\"><img src=\"" + (message.imageSrc) + "\"></div>") : '') + "\n            " + (message.text || message.isTyping ? ("<div class=\"message-text\">" + (message.text || '') + (message.isTyping ? '<div class="message-typing-indicator"><div></div><div></div><div></div></div>' : '') + "</div>") : '') + "\n            " + (message.textFooter ? ("<div class=\"message-text-footer\">" + (message.textFooter) + "</div>") : '') + "\n          </div>\n          " + (message.footer ? ("<div class=\"message-footer\">" + (message.footer) + "</div>") : '') + "\n        </div>\n      </div>\n    ");
  };
  Messages.prototype.renderMessages = function renderMessages (messagesToRender, method) {
    if ( messagesToRender === void 0 ) messagesToRender = this.messages;
    if ( method === void 0 ) method = this.params.newMessagesFirst ? 'prepend' : 'append';

    var m = this;
    var html = messagesToRender.map(function (message) { return m.renderMessage(message); }).join('');
    m.$el[method](html);
  };
  Messages.prototype.isFirstMessage = function isFirstMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.firstMessageRule) { return (ref = m.params).firstMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isLastMessage = function isLastMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.lastMessageRule) { return (ref = m.params).lastMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isTailMessage = function isTailMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.tailMessageRule) { return (ref = m.params).tailMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isSameNameMessage = function isSameNameMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.sameNameMessageRule) { return (ref = m.params).sameNameMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isSameHeaderMessage = function isSameHeaderMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.sameHeaderMessageRule) { return (ref = m.params).sameHeaderMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isSameFooterMessage = function isSameFooterMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.sameFooterMessageRule) { return (ref = m.params).sameFooterMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isSameAvatarMessage = function isSameAvatarMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.sameAvatarMessageRule) { return (ref = m.params).sameAvatarMessageRule.apply(ref, args); }
    return false;
    var ref;
  };
  Messages.prototype.isCustomClassMessage = function isCustomClassMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    if (m.params.customClassMessageRule) { return (ref = m.params).customClassMessageRule.apply(ref, args); }
    return undefined;
    var ref;
  };
  Messages.prototype.layout = function layout () {
    var m = this;
    m.$el.find('.message, .messages-title').each(function (index, messageEl) {
      var $messageEl = dom7$1(messageEl);
      if (!m.messages) {
        m.messages = m.getMessagesData();
      }
      var classes = [];
      var message = m.messages[index];
      var previousMessage = m.messages[index - 1];
      var nextMessage = m.messages[index + 1];
      if (m.isFirstMessage(message, previousMessage, nextMessage)) {
        classes.push('message-first');
      }
      if (m.isLastMessage(message, previousMessage, nextMessage)) {
        classes.push('message-last');
      }
      if (m.isTailMessage(message, previousMessage, nextMessage)) {
        classes.push('message-tail');
      }
      if (m.isSameNameMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-name');
      }
      if (m.isSameHeaderMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-header');
      }
      if (m.isSameFooterMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-footer');
      }
      if (m.isSameAvatarMessage(message, previousMessage, nextMessage)) {
        classes.push('message-same-avatar');
      }
      var customMessageClasses = m.isCustomClassMessage(message, previousMessage, nextMessage);
      if (customMessageClasses && customMessageClasses.length) {
        if (typeof customMessageClasses === 'string') {
          customMessageClasses = customMessageClasses.split(' ');
        }
        customMessageClasses.forEach(function (customClass) {
          classes.push(customClass);
        });
      }
      $messageEl.removeClass('message-first message-last message-tail message-same-name message-same-header message-same-footer message-same-avatar');
      classes.forEach(function (className) {
        $messageEl.addClass(className);
      });
    });
  };
  Messages.prototype.clear = function clear () {
    var m = this;
    m.messages = [];
    m.$el.html('');
  };
  Messages.prototype.removeMessage = function removeMessage (messageToRemove, layout) {
    if ( layout === void 0 ) layout = true;

    var m = this;
    // Index or El
    var index;
    var $el;
    if (typeof messageToRemove === 'number') {
      index = messageToRemove;
      $el = m.$el.find('.message, .messages-title').eq(index);
    } else {
      $el = dom7$1(messageToRemove);
      index = $el.index();
    }
    if ($el.length === 0) {
      return m;
    }
    $el.remove();
    m.messages.splice(index, 1);
    if (m.params.autoLayout && layout) { m.layout(); }
    return m;
  };
  Messages.prototype.removeMessages = function removeMessages (messagesToRemove, layout) {
    if ( layout === void 0 ) layout = true;

    var m = this;
    if (Array.isArray(messagesToRemove)) {
      var messagesToRemoveEls = [];
      messagesToRemove.forEach(function (messageToRemoveIndex) {
        messagesToRemoveEls.push(m.$el.find('.message, .messages-title').eq(messageToRemoveIndex));
      });
      messagesToRemoveEls.forEach(function (messageToRemove) {
        m.removeMessage(messageToRemove, false);
      });
    } else {
      dom7$1(messagesToRemove).each(function (index, messageToRemove) {
        m.removeMessage(messageToRemove, false);
      });
    }
    if (m.params.autoLayout && layout) { m.layout(); }
    return m;
  };

  Messages.prototype.addMessage = function addMessage () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    var messageToAdd;
    var animate;
    var method;
    if (typeof args[1] === 'boolean') {
      var assign;
      (assign = args, messageToAdd = assign[0], animate = assign[1], method = assign[2]);
    } else {
      var assign$1;
      (assign$1 = args, messageToAdd = assign$1[0], method = assign$1[1], animate = assign$1[2]);
    }
    if (typeof animate === 'undefined') {
      animate = true;
    }
    if (typeof method === 'undefined') {
      method = m.params.newMessagesFirst ? 'prepend' : 'append';
    }

    return m.addMessages([messageToAdd], animate, method);
  };
  Messages.prototype.addMessages = function addMessages () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var m = this;
    var messagesToAdd;
    var animate;
    var method;
    if (typeof args[1] === 'boolean') {
      var assign;
      (assign = args, messagesToAdd = assign[0], animate = assign[1], method = assign[2]);
    } else {
      var assign$1;
      (assign$1 = args, messagesToAdd = assign$1[0], method = assign$1[1], animate = assign$1[2]);
    }
    if (typeof animate === 'undefined') {
      animate = true;
    }
    if (typeof method === 'undefined') {
      method = m.params.newMessagesFirst ? 'prepend' : 'append';
    }

    // Define scroll positions before new messages added
    var scrollHeightBefore = m.pageContentEl.scrollHeight;
    var heightBefore = m.pageContentEl.offsetHeight;
    var scrollBefore = m.pageContentEl.scrollTop;

    // Add message to DOM and data
    var messagesHTML = '';
    var typingMessage = m.messages.filter(function (el) { return el.isTyping; })[0];
    messagesToAdd.forEach(function (messageToAdd) {
      if (typingMessage) {
        if (method === 'append') {
          m.messages.splice(m.messages.indexOf(typingMessage), 0, messageToAdd);
        } else {
          m.messages.splice(m.messages.indexOf(typingMessage) + 1, 0, messageToAdd);
        }
      } else {
        m.messages[method === 'append' ? 'push' : 'unshift'](messageToAdd);
      }
      messagesHTML += m.renderMessage(messageToAdd);
    });
    var $messagesEls = dom7$1(messagesHTML);
    if (animate) {
      if (method === 'append' && !m.params.newMessagesFirst) {
        $messagesEls.addClass('message-appear-from-bottom');
      }
      if (method === 'prepend' && m.params.newMessagesFirst) {
        $messagesEls.addClass('message-appear-from-top');
      }
    }
    if (typingMessage) {
      if (method === 'append') {
        $messagesEls.insertBefore(m.$el.find('.message-typing'));
      } else {
        $messagesEls.insertAfter(m.$el.find('.message-typing'));
      }
    } else {
      m.$el[method]($messagesEls);
    }

    // Layout
    if (m.params.autoLayout) { m.layout(); }

    if (method === 'prepend' && !typingMessage) {
      m.pageContentEl.scrollTop = scrollBefore + (m.pageContentEl.scrollHeight - scrollHeightBefore);
    }

    if (m.params.scrollMessages && ((method === 'append' && !m.params.newMessagesFirst) || (method === 'prepend' && m.params.newMessagesFirst && !typingMessage))) {
      if (m.params.scrollMessagesOnEdge) {
        var onEdge = false;
        if (m.params.newMessagesFirst && scrollBefore === 0) {
          onEdge = true;
        }
        if (!m.params.newMessagesFirst && (scrollBefore - (scrollHeightBefore - heightBefore) >= -10)) {
          onEdge = true;
        }
        if (onEdge) { m.scroll(animate ? undefined : 0); }
      } else {
        m.scroll(animate ? undefined : 0);
      }
    }

    return m;
  };
  Messages.prototype.showTyping = function showTyping (message) {
    if ( message === void 0 ) message = {};

    var m = this;
    var typingMessage = m.messages.filter(function (el) { return el.isTyping; })[0];
    if (typingMessage) {
      m.removeMessage(m.messages.indexOf(typingMessage));
    }
    m.addMessage(Utils$1.extend({
      type: 'received',
      isTyping: true,
    }, message));
    return m;
  };
  Messages.prototype.hideTyping = function hideTyping () {
    var m = this;
    var typingMessageIndex;
    m.messages.forEach(function (message, index) {
      if (message.isTyping) { typingMessageIndex = index; }
    });
    if (typeof typingMessageIndex !== 'undefined') {
      m.removeMessage(typingMessageIndex);
    }
    return m;
  };
  Messages.prototype.scroll = function scroll (duration, scrollTop) {
    if ( duration === void 0 ) duration = 300;

    var m = this;
    var currentScroll = m.pageContentEl.scrollTop;
    var newScrollTop;
    if (typeof scrollTop !== 'undefined') { newScrollTop = scrollTop; }
    else {
      newScrollTop = m.params.newMessagesFirst ? 0 : m.pageContentEl.scrollHeight - m.pageContentEl.offsetHeight;
      if (newScrollTop === currentScroll) { return m; }
    }
    m.$pageContentEl.scrollTop(newScrollTop, duration);
    return m;
  };
  Messages.prototype.init = function init () {
    var m = this;
    if (!m.messages || m.messages.length === 0) {
      m.messages = m.getMessagesData();
    }
    if (m.params.messages && m.params.messages.length) {
      m.renderMessages();
    }
    if (m.params.autoLayout) { m.layout(); }
    if (m.params.scrollMessages) { m.scroll(0); }
  };
  Messages.prototype.destroy = function destroy () {
    var m = this;
    m.emit('messagesBeforeDestroy', m);
    m.$el.trigger('messages:beforedestroy', m);
    m.$el[0].f7Messages = null;
    delete m.$el[0].f7Messages;
    Utils$1.deleteProps(m);
  };

  return Messages;
}(Framework7Class));

var Messages = {
  name: 'messages',
  static: {
    Messages: Messages$1,
  },
  create: function create() {
    var app = this;
    var messages = {
      create: function create(params) {
        return new Messages$1(app, params);
      },
      get: function get(messagesEl) {
        var $messagesEl = dom7$1(messagesEl);
        if ($messagesEl.length && $messagesEl[0].f7Messages) {
          return $messagesEl[0].f7Messages;
        }
        return undefined;
      },
    };
    ('renderMessages layout scroll clear removeMessage removeMessages addMessage addMessages destroy').split(' ').forEach(function (messagesMethod) {
      messages[messagesMethod] = function (messagesEl) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        if ( messagesEl === void 0 ) messagesEl = '.messages';
        var m = app.messages.get(messagesEl);
        if (m) { return m[messagesMethod].apply(m, args); }
        return undefined;
      };
    });
    Utils$1.extend(app, {
      messages: messages,
    });
  },
  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.messages-init').each(function (index, messagesEl) {
        app.messages.destroy(messagesEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.messages-init').each(function (index, messagesEl) {
        app.messages.create({ el: messagesEl });
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.messages-init').each(function (index, messagesEl) {
        app.messages.destroy(messagesEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.messages-init').each(function (index, messagesEl) {
        app.messages.create({ el: messagesEl });
      });
    },
  },
  clicks: {

  },
};

var Messagebar$1 = (function (Framework7Class$$1) {
  function Messagebar(app, params) {
    if ( params === void 0 ) params = {};

    Framework7Class$$1.call(this, params, [app]);

    var messagebar = this;

    var defaults = {
      topOffset: 0,
      bottomOffset: 0,
      attachments: [],
      renderAttachments: undefined,
      renderAttachment: undefined,
    };

    // Extend defaults with modules params
    messagebar.useInstanceModulesParams(defaults);

    messagebar.params = Utils$1.extend(defaults, params);

    // El
    var $el = dom7$1(messagebar.params.el);
    if ($el.length === 0) { return messagebar; }

    $el[0].f7Messagebar = messagebar;

    // Page and PageContent
    var $pageEl = $el.parents('.page').eq(0);
    var $pageContentEl = $pageEl.find('.page-content').eq(0);

    // Area
    var $areaEl = $el.find('.messagebar-area');

    // Textarea
    var $textareaEl;
    if (messagebar.params.textareaEl) {
      $textareaEl = dom7$1(messagebar.params.textareaEl);
    } else {
      $textareaEl = $el.find('textarea');
    }

    // Attachments & Library
    var $attachmentsEl = $el.find('.messagebar-attachments');
    var $sheetEl = $el.find('.messagebar-sheet');

    Utils$1.extend(messagebar, {
      $el: $el,
      el: $el[0],
      $areaEl: $areaEl,
      areaEl: $areaEl[0],
      $textareaEl: $textareaEl,
      textareaEl: $textareaEl[0],
      $attachmentsEl: $attachmentsEl,
      attachmentsEl: $attachmentsEl[0],
      attachmentsVisible: $attachmentsEl.hasClass('messagebar-attachments-visible'),
      $sheetEl: $sheetEl,
      sheetEl: $sheetEl[0],
      sheetVisible: $sheetEl.hasClass('messagebar-sheet-visible'),
      $pageEl: $pageEl,
      pageEl: $pageEl[0],
      $pageContentEl: $pageContentEl,
      pageContentEl: $pageContentEl,
      top: $el.hasClass('messagebar-top') || messagebar.params.top,
      attachments: [],
    });

    // Events
    function onAppResize() {
      messagebar.resize();
    }
    function onSubmit(e) {
      e.preventDefault();
    }
    function onAttachmentClick(e) {
      var index = dom7$1(this).index();
      if (dom7$1(e.target).closest('.messagebar-attachment-delete').length) {
        dom7$1(this).trigger('messagebar:attachmentdelete', index);
        messagebar.emit('messagebarAttachmentDelete', this, index);
        messagebar.emit({
          events: 'attachmentDelete',
          data: [this, index],
          local: true,
        });
      } else {
        dom7$1(this).trigger('messagebar:attachmentclick', index);
        messagebar.emit('messagebarAttachmentClick', this, index);
        messagebar.emit({
          events: 'attachmentClick',
          data: [this, index],
          local: true,
        });
      }
    }
    function onTextareaChange() {
      messagebar.checkEmptyState();
    }
    function onTextareaFocus() {
      messagebar.sheetHide();
    }

    messagebar.attachEvents = function attachEvents() {
      $el.on('textarea:resize', onAppResize);
      $el.on('submit', onSubmit);
      $el.on('click', '.messagebar-attachment', onAttachmentClick);
      $textareaEl.on('change input', onTextareaChange);
      $textareaEl.on('focus', onTextareaFocus);
      app.on('resize', onAppResize);
    };
    messagebar.detachEvents = function detachEvents() {
      $el.off('textarea:resize', onAppResize);
      $el.off('submit', onSubmit);
      $el.off('click', '.messagebar-attachment', onAttachmentClick);
      $textareaEl.off('change input', onTextareaChange);
      $textareaEl.on('focus', onTextareaFocus);
      app.off('resize', onAppResize);
    };


    // Install Modules
    messagebar.useInstanceModules();

    // Init
    messagebar.init();

    return messagebar;
  }

  if ( Framework7Class$$1 ) Messagebar.__proto__ = Framework7Class$$1;
  Messagebar.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
  Messagebar.prototype.constructor = Messagebar;
  Messagebar.prototype.focus = function focus () {
    var messagebar = this;
    messagebar.$textareaEl.focus();
    return messagebar;
  };
  Messagebar.prototype.blur = function blur () {
    var messagebar = this;
    messagebar.$textareaEl.blur();
    return messagebar;
  };
  Messagebar.prototype.clear = function clear () {
    var messagebar = this;
    messagebar.$textareaEl.val('').trigger('change');
    return messagebar;
  };
  Messagebar.prototype.getValue = function getValue () {
    var messagebar = this;
    return messagebar.$textareaEl.val().trim();
  };
  Messagebar.prototype.setValue = function setValue (value) {
    var messagebar = this;
    messagebar.$textareaEl.val(value).trigger('change');
    return messagebar;
  };
  Messagebar.prototype.setPlaceholder = function setPlaceholder (placeholder) {
    var messagebar = this;
    messagebar.$textareaEl.attr('placeholder', placeholder);
    return messagebar;
  };
  Messagebar.prototype.resize = function resize () {
    var messagebar = this;
    var params = messagebar.params;
    var $el = messagebar.$el;
    var top = messagebar.top;
    var $pageEl = messagebar.$pageEl;
    var $pageContentEl = messagebar.$pageContentEl;
    var $areaEl = messagebar.$areaEl;
    var $textareaEl = messagebar.$textareaEl;
    var $sheetEl = messagebar.$sheetEl;
    var $attachmentsEl = messagebar.$attachmentsEl;
    var elHeight = $el[0].offsetHeight;
    if (top) {
      var requiredPaddingTop = elHeight + params.topOffset;
      var currentPaddingTop = parseInt($pageContentEl.css('padding-top'), 10);
      if (requiredPaddingTop !== currentPaddingTop) {
        var maxHeight = $pageEl[0].offsetHeight - currentPaddingTop - $sheetEl.outerHeight() - $attachmentsEl.outerHeight() - parseInt($areaEl.css('margin-top'), 10) - parseInt($areaEl.css('margin-bottom'), 10);
        $textareaEl.css('max-height', (maxHeight + "px"));
        $pageContentEl.css('padding-top', (requiredPaddingTop + "px"));
        $el.trigger('messagebar:resize');
        messagebar.emit('messagebarResize');
      }
    } else {
      var currentPaddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      var requiredPaddingBottom = elHeight + params.bottomOffset;
      if (requiredPaddingBottom !== currentPaddingBottom && $pageContentEl.length) {
        var currentPaddingTop$1 = parseInt($pageContentEl.css('padding-top'), 10);
        var pageScrollHeight = $pageContentEl[0].scrollHeight;
        var pageOffsetHeight = $pageContentEl[0].offsetHeight;
        var pageScrollTop = $pageContentEl[0].scrollTop;
        var scrollOnBottom = (pageScrollTop === pageScrollHeight - pageOffsetHeight);
        var maxHeight$1 = $pageEl[0].offsetHeight - currentPaddingTop$1 - $sheetEl.outerHeight() - $attachmentsEl.outerHeight() - parseInt($areaEl.css('margin-top'), 10) - parseInt($areaEl.css('margin-bottom'), 10);
        $textareaEl.css('max-height', (maxHeight$1 + "px"));
        $pageContentEl.css('padding-bottom', (requiredPaddingBottom + "px"));
        if (scrollOnBottom) {
          $pageContentEl.scrollTop($pageContentEl[0].scrollHeight - pageOffsetHeight);
        }
        $el.trigger('messagebar:resize');
        messagebar.emit('messagebarResize');
      }
    }
  };
  Messagebar.prototype.checkEmptyState = function checkEmptyState () {
    var messagebar = this;
    var $el = messagebar.$el;
    var $textareaEl = messagebar.$textareaEl;
    var value = $textareaEl.val().trim();
    if (value && value.length) {
      $el.addClass('messagebar-with-value');
    } else {
      $el.removeClass('messagebar-with-value');
    }
  };
  Messagebar.prototype.attachmentsCreate = function attachmentsCreate (innerHTML) {
    if ( innerHTML === void 0 ) innerHTML = '';

    var messagebar = this;
    var $attachmentsEl = dom7$1(("<div class=\"messagebar-attachments\">" + innerHTML + "</div>"));
    $attachmentsEl.insertBefore(messagebar.$textareaEl);
    Utils$1.extend(messagebar, {
      $attachmentsEl: $attachmentsEl,
      attachmentsEl: $attachmentsEl[0],
    });
    return messagebar;
  };
  Messagebar.prototype.attachmentsShow = function attachmentsShow (innerHTML) {
    if ( innerHTML === void 0 ) innerHTML = '';

    var messagebar = this;
    if (messagebar.$attachmentsEl.length === 0) {
      messagebar.attachmentsCreate(innerHTML);
    }
    messagebar.$el.addClass('messagebar-attachments-visible');
    messagebar.attachmentsVisible = true;
    messagebar.resize();
    return messagebar;
  };
  Messagebar.prototype.attachmentsHide = function attachmentsHide () {
    var messagebar = this;
    messagebar.$el.removeClass('messagebar-attachments-visible');
    messagebar.attachmentsVisible = false;
    messagebar.resize();
    return messagebar;
  };
  Messagebar.prototype.attachmentsToggle = function attachmentsToggle () {
    var messagebar = this;
    if (messagebar.attachmentsVisible) {
      messagebar.attachmentsHide();
    } else {
      messagebar.attachmentsShow();
    }
    return messagebar;
  };
  Messagebar.prototype.renderAttachment = function renderAttachment (attachment) {
    var messagebar = this;
    if (messagebar.params.renderAttachment) {
      return messagebar.params.renderAttachment(attachment);
    }
    return ("\n      <div class=\"messagebar-attachment\">\n        <img src=\"" + attachment + "\">\n        <span class=\"messagebar-attachment-delete\"></span>\n      </div>\n    ");
  };
  Messagebar.prototype.renderAttachments = function renderAttachments () {
    var messagebar = this;
    var html;
    if (messagebar.params.renderAttachments) {
      html = messagebar.params.renderAttachments(messagebar.attachments);
    } else {
      html = "" + (messagebar.attachments.map(function (attachment) { return messagebar.renderAttachment(attachment); }).join(''));
    }
    if (messagebar.$attachmentsEl.length === 0) {
      messagebar.attachmentsCreate(html);
    } else {
      messagebar.$attachmentsEl.html(html);
    }
  };
  Messagebar.prototype.sheetCreate = function sheetCreate (innerHTML) {
    if ( innerHTML === void 0 ) innerHTML = '';

    var messagebar = this;
    var $sheetEl = dom7$1(("<div class=\"messagebar-sheet\">" + innerHTML + "</div>"));
    messagebar.append($sheetEl);
    Utils$1.extend(messagebar, {
      $sheetEl: $sheetEl,
      sheetEl: $sheetEl[0],
    });
    return messagebar;
  };
  Messagebar.prototype.sheetShow = function sheetShow (innerHTML) {
    if ( innerHTML === void 0 ) innerHTML = '';

    var messagebar = this;
    if (messagebar.$sheetEl.length === 0) {
      messagebar.sheetCreate(innerHTML);
    }
    messagebar.$el.addClass('messagebar-sheet-visible');
    messagebar.sheetVisible = true;
    messagebar.resize();
    return messagebar;
  };
  Messagebar.prototype.sheetHide = function sheetHide () {
    var messagebar = this;
    messagebar.$el.removeClass('messagebar-sheet-visible');
    messagebar.sheetVisible = false;
    messagebar.resize();
    return messagebar;
  };
  Messagebar.prototype.sheetToggle = function sheetToggle () {
    var messagebar = this;
    if (messagebar.sheetVisible) {
      messagebar.sheetHide();
    } else {
      messagebar.sheetShow();
    }
    return messagebar;
  };
  Messagebar.prototype.init = function init () {
    var messagebar = this;
    messagebar.attachEvents();
    messagebar.checkEmptyState();
    return messagebar;
  };
  Messagebar.prototype.destroy = function destroy () {
    var messagebar = this;
    messagebar.emit('messagebarBeforeDestroy', messagebar);
    messagebar.$el.trigger('messagebar:beforedestroy', messagebar);
    messagebar.detachEvents();
    messagebar.$el[0].f7Messagebar = null;
    delete messagebar.$el[0].f7Messagebar;
    Utils$1.deleteProps(messagebar);
  };

  return Messagebar;
}(Framework7Class));

var Messagebar = {
  name: 'messagebar',
  static: {
    Messagebar: Messagebar$1,
  },
  create: function create() {
    var app = this;
    var messagebar = {
      create: function create(params) {
        return new Messagebar$1(app, params);
      },
      get: function get(messagebarEl) {
        var $messagebarEl = dom7$1(messagebarEl);
        if ($messagebarEl.length && $messagebarEl[0].f7Messagebar) {
          return $messagebarEl[0].f7Messagebar;
        }
        return undefined;
      },
    };
    ('clear getValue setValue setPlaceholder resize focus blur attachmentsCreate attachmentsShow attachmentsHide attachmentsToggle renderAttachments sheetCreate sheetShow sheetHide sheetToggle destroy').split(' ').forEach(function (messagebarMethod) {
      messagebar[messagebarMethod] = function (messagebarEl) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        if ( messagebarEl === void 0 ) messagebarEl = '.messagebar';
        var mb = app.messagebar.get(messagebarEl);
        if (mb) { return mb[messagebarMethod].apply(mb, args); }
        return undefined;
      };
    });
    Utils$1.extend(app, {
      messagebar: messagebar,
    });
  },
  on: {
    tabBeforeRemove: function tabBeforeRemove(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.destroy(messagebarEl);
      });
    },
    tabMounted: function tabMounted(tabEl) {
      var app = this;
      dom7$1(tabEl).find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.create(Utils$1.extend({ el: messagebarEl }, dom7$1(messagebarEl).dataset()));
      });
    },
    pageBeforeRemove: function pageBeforeRemove(page) {
      var app = this;
      page.$el.find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.destroy(messagebarEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.messagebar-init').each(function (index, messagebarEl) {
        app.messagebar.create(Utils$1.extend({ el: messagebarEl }, dom7$1(messagebarEl).dataset()));
      });
    },
  },
  clicks: {

  },
};

// F7 Class
// Import Core Modules
// Core Components
// Template7
if (typeof t7 !== 'undefined') {
  Framework7$1.prototype.t7 = t7;
  if (!window.Template7) { window.Template7 = t7; }
}

// Dom7
if (typeof dom7$1 !== 'undefined') {
  Framework7$1.prototype.$ = dom7$1;
  if (!window.Dom7) { window.Dom7 = dom7$1; }
}

// Install Modules & Components
Framework7$1
  // Core Modules
  .use(Support)
  .use(Device$2)
  .use(Resize)
  .use(Touch)
  .use(Router)
  .use(History$2)
  .use(Clicks)
  // Core Components
  .use(Statusbar$1)
  .use(View$2)
  .use(Navbar$1)
  .use(Toolbar$1)
  .use(Subnavbar)
  .use(TouchRipple)
  .use(Modal)
  .use(Dialog)
  .use(Popup)
  .use(LoginScreen)
  .use(Popover)
  .use(Actions)
  .use(Sheet)
  .use(Preloader$1)
  .use(Progressbar$1)
  .use(Sortable$1)
  .use(Swipeout$1)
  .use(Accordion$1)
  .use(VirtualList)
  .use(Timeline)
  .use(Tabs)
  .use(Panel)
  .use(Card)
  .use(Chip)
  .use(Form)
  .use(Input$1)
  .use(Checkbox)
  .use(Radio)
  .use(Toggle)
  .use(Range)
  .use(SmartSelect)
  .use(Calendar)
  .use(Picker)
  .use(InfiniteScroll$1)
  .use(PullToRefresh)
  .use(Lazy$1)
  .use(DataTable)
  .use(Fab$1)
  .use(Searchbar)
  .use(Messages)
  .use(Messagebar);

return Framework7$1;

})));
