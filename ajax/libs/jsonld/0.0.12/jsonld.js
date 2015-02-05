/**
 * A JavaScript implementation of the JSON-LD API.
 *
 * @author Dave Longley
 *
 * BSD 3-Clause License
 * Copyright (c) 2011-2013 Digital Bazaar, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of the Digital Bazaar, Inc. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function() {

// define jsonld API
var jsonld = {};

/* Core API */

/**
 * Performs JSON-LD compaction.
 *
 * @param input the JSON-LD input to compact.
 * @param ctx the context to compact with.
 * @param [options] options to use:
 *          [base] the base IRI to use.
 *          [strict] use strict mode (default: true).
 *          [optimize] true to optimize the compaction (default: false).
 *          [graph] true to always output a top-level graph (default: false).
 *          [skipExpansion] true to assume the input is expanded and skip
 *            expansion, false not to, defaults to false.
 *          [resolver(url, callback(err, jsonCtx))] the URL resolver to use.
 * @param callback(err, compacted, ctx) called once the operation completes.
 */
jsonld.compact = function(input, ctx) {
  // get arguments
  var options = {};
  var callbackArg = 2;
  if(arguments.length > 3) {
    options = arguments[2] || {};
    callbackArg += 1;
  }
  var callback = arguments[callbackArg];

  // nothing to compact
  if(input === null) {
    return callback(null, null);
  }

  // set default options
  if(!('base' in options)) {
    options.base = '';
  }
  if(!('strict' in options)) {
    options.strict = true;
  }
  if(!('optimize' in options)) {
    options.optimize = false;
  }
  if(!('graph' in options)) {
    options.graph = false;
  }
  if(!('skipExpansion' in options)) {
    options.skipExpansion = false;
  }
  if(!('resolver' in options)) {
    options.resolver = jsonld.urlResolver;
  }

  var expand = function(input, options, callback) {
    if(options.skipExpansion) {
      return callback(null, input);
    }
    jsonld.expand(input, options, callback);
  };

  // expand input then do compaction
  expand(input, options, function(err, expanded) {
    if(err) {
      return callback(new JsonLdError(
        'Could not expand input before compaction.',
        'jsonld.CompactError', {cause: err}));
    }

    // process context
    var activeCtx = _getInitialContext(options);
    jsonld.processContext(activeCtx, ctx, options, function(err, activeCtx) {
      if(err) {
        return callback(new JsonLdError(
          'Could not process context before compaction.',
          'jsonld.CompactError', {cause: err}));
      }

      try {
        // create optimize context
        if(options.optimize) {
          options.optimizeCtx = {};
        }

        // do compaction
        var compacted = new Processor().compact(
          activeCtx, null, expanded, options);
        cleanup(null, compacted, activeCtx, options);
      }
      catch(ex) {
        callback(ex);
      }
    });
  });

  // performs clean up after compaction
  function cleanup(err, compacted, activeCtx, options) {
    if(err) {
      return callback(err);
    }

    if(!options.graph && _isArray(compacted)) {
      // simplify to a single item
      if(compacted.length === 1) {
        compacted = compacted[0];
      }
      // simplify to an empty object
      else if(compacted.length === 0) {
        compacted = {};
      }
    }
    // always use array if graph option is on
    else if(options.graph && _isObject(compacted)) {
      compacted = [compacted];
    }

    // follow @context key
    if(_isObject(ctx) && '@context' in ctx) {
      ctx = ctx['@context'];
    }

    // build output context
    ctx = _clone(ctx);
    if(!_isArray(ctx)) {
      ctx = [ctx];
    }
    // add optimize context
    if(options.optimizeCtx) {
      ctx.push(options.optimizeCtx);
    }
    // remove empty contexts
    var tmp = ctx;
    ctx = [];
    for(var i in tmp) {
      if(!_isObject(tmp[i]) || Object.keys(tmp[i]).length > 0) {
        ctx.push(tmp[i]);
      }
    }

    // remove array if only one context
    var hasContext = (ctx.length > 0);
    if(ctx.length === 1) {
      ctx = ctx[0];
    }

    // add context
    if(hasContext || options.graph) {
      if(_isArray(compacted)) {
        // use '@graph' keyword
        var kwgraph = _compactIri(activeCtx, '@graph');
        var graph = compacted;
        compacted = {};
        if(hasContext) {
          compacted['@context'] = ctx;
        }
        compacted[kwgraph] = graph;
      }
      else if(_isObject(compacted)) {
        // reorder keys so @context is first
        var graph = compacted;
        compacted = {'@context': ctx};
        for(var key in graph) {
          compacted[key] = graph[key];
        }
      }
    }

    callback(null, compacted, activeCtx);
  }
};

/**
 * Performs JSON-LD expansion.
 *
 * @param input the JSON-LD input to expand.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [renameBlankNodes] true to rename blank nodes, false not to,
 *            defaults to true.
 *          [keepFreeFloatingNodes] true to keep free-floating nodes,
 *            false not to, defaults to false.
 *          [resolver(url, callback(err, jsonCtx))] the URL resolver to use.
 * @param callback(err, expanded) called once the operation completes.
 */
jsonld.expand = function(input) {
  // get arguments
  var options = {};
  var callback;
  var callbackArg = 1;
  if(arguments.length > 2) {
    options = arguments[1] || {};
    callbackArg += 1;
  }
  callback = arguments[callbackArg];

  // set default options
  if(!('base' in options)) {
    options.base = '';
  }
  if(!('resolver' in options)) {
    options.resolver = jsonld.urlResolver;
  }
  if(!('renameBlankNodes' in options)) {
    options.renameBlankNodes = true;
  }
  if(!('keepFreeFloatingNodes' in options)) {
    options.keepFreeFloatingNodes = false;
  }

  // resolve all @context URLs in the input
  input = _clone(input);
  _resolveContextUrls(input, options, function(err, input) {
    if(err) {
      return callback(err);
    }
    try {
      // do expansion
      var activeCtx = _getInitialContext(options);
      var expanded = new Processor().expand(
        activeCtx, null, input, options, false);

      // blank nodes must all be renamed if any were renamed
      // during expansion ... otherwise there may be conflicts, this
      // also means tracking all bnodes in case renaming must occur
      // to avoid double-renaming
      /*if(activeCtx.namer && activeCtx.namer.counter > 0) {
        _labelBlankNodes(activeCtx.namer, expanded);
      }*/

      // optimize away @graph with no other properties
      if(_isObject(expanded) && ('@graph' in expanded) &&
        Object.keys(expanded).length === 1) {
        expanded = expanded['@graph'];
      }
      else if(expanded === null) {
        expanded = [];
      }

      // normalize to an array
      if(!_isArray(expanded)) {
        expanded = [expanded];
      }
      callback(null, expanded);
    }
    catch(ex) {
      callback(ex);
    }
  });
};

/**
 * Performs JSON-LD flattening.
 *
 * @param input the JSON-LD to flatten.
 * @param ctx the context to use to compact the flattened output, or null.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [resolver(url, callback(err, jsonCtx))] the URL resolver to use.
 * @param callback(err, flattened) called once the operation completes.
 */
jsonld.flatten = function(input, ctx, options, callback) {
  // get arguments
  if(typeof options === 'function') {
    callback = options;
    options = {};
  }

  // set default options
  if(!('base' in options)) {
    options.base = '';
  }
  if(!('resolver' in options)) {
    options.resolver = jsonld.urlResolver;
  }

  // expand input
  jsonld.expand(input, options, function(err, _input) {
    if(err) {
      return callback(new JsonLdError(
        'Could not expand input before flattening.',
        'jsonld.FlattenError', {cause: err}));
    }

    try {
      // do flattening
      var flattened = new Processor().flatten(_input);
    }
    catch(ex) {
      return callback(ex);
    }

    if(ctx === null) {
      return callback(null, flattened);
    }

    // compact result (force @graph option to true, skip expansion)
    options.graph = true;
    options.skipExpansion = true;
    jsonld.compact(flattened, ctx, options, function(err, compacted) {
      if(err) {
        return callback(new JsonLdError(
          'Could not compact flattened output.',
          'jsonld.FlattenError', {cause: err}));
      }
      callback(null, compacted);
    });
  });
};

/**
 * Performs JSON-LD framing.
 *
 * @param input the JSON-LD input to frame.
 * @param frame the JSON-LD frame to use.
 * @param [options] the framing options.
 *          [base] the base IRI to use.
 *          [embed] default @embed flag (default: true).
 *          [explicit] default @explicit flag (default: false).
 *          [omitDefault] default @omitDefault flag (default: false).
 *          [optimize] optimize when compacting (default: false).
 *          [resolver(url, callback(err, jsonCtx))] the URL resolver to use.
 * @param callback(err, framed) called once the operation completes.
 */
jsonld.frame = function(input, frame) {
  // get arguments
  var options = {};
  var callbackArg = 2;
  if(arguments.length > 3) {
    options = arguments[2] || {};
    callbackArg += 1;
  }
  var callback = arguments[callbackArg];

  // set default options
  if(!('base' in options)) {
    options.base = '';
  }
  if(!('resolver' in options)) {
    options.resolver = jsonld.urlResolver;
  }
  if(!('embed' in options)) {
    options.embed = true;
  }
  options.explicit = options.explicit || false;
  options.omitDefault = options.omitDefault || false;
  options.optimize = options.optimize || false;

  // preserve frame context
  var ctx = frame['@context'] || {};

  // expand input
  jsonld.expand(input, options, function(err, expanded) {
    if(err) {
      return callback(new JsonLdError(
        'Could not expand input before framing.',
        'jsonld.FrameError', {cause: err}));
    }

    // expand frame
    var opts = _clone(options);
    opts.keepFreeFloatingNodes = true;
    jsonld.expand(frame, opts, function(err, expandedFrame) {
      if(err) {
        return callback(new JsonLdError(
          'Could not expand frame before framing.',
          'jsonld.FrameError', {cause: err}));
      }

      try {
        // do framing
        var framed = new Processor().frame(expanded, expandedFrame, options);
      }
      catch(ex) {
        return callback(ex);
      }

      // compact result (force @graph option to true, skip expansion)
      opts.graph = true;
      opts.skipExpansion = true;
      jsonld.compact(framed, ctx, opts, function(err, compacted, ctx) {
        if(err) {
          return callback(new JsonLdError(
            'Could not compact framed output.',
            'jsonld.FrameError', {cause: err}));
        }
        // get graph alias
        var graph = _compactIri(ctx, '@graph');
        // remove @preserve from results
        compacted[graph] = _removePreserve(ctx, compacted[graph]);
        callback(null, compacted);
      });
    });
  });
};

/**
 * Performs JSON-LD objectification.
 *
 * @param input the JSON-LD input to objectify.
 * @param ctx the JSON-LD context to apply.
 * @param [options] the framing options.
 *          [base] the base IRI to use.
 *          [resolver(url, callback(err, jsonCtx))] the URL resolver to use.
 * @param callback(err, objectified) called once the operation completes.
 */
jsonld.objectify = function(input, ctx) {
  // get arguments
  var options = {};
  var callbackArg = 2;
  if(arguments.length > 3) {
    options = arguments[2] || {};
    callbackArg += 1;
  }
  var callback = arguments[callbackArg];

  // set default options
  if(!('base' in options)) {
    options.base = '';
  }
  if(!('resolver' in options)) {
    options.resolver = jsonld.urlResolver;
  }

  // expand input
  jsonld.expand(input, options, function(err, _input) {
    if(err) {
      return callback(new JsonLdError(
        'Could not expand input before framing.',
        'jsonld.FrameError', {cause: err}));
    }

    try {
      // flatten the graph
      var flattened = new Processor().flatten(_input);
    }
    catch(ex) {
      return callback(ex);
    }

    // compact result (force @graph option to true, skip expansion)
    options.graph = true;
    options.skipExpansion = true;
    jsonld.compact(flattened, ctx, options, function(err, compacted, ctx) {
      if(err) {
        return callback(new JsonLdError(
          'Could not compact flattened output.',
          'jsonld.FrameError', {cause: err}));
      }
      // get graph alias
      var graph = _compactIri(ctx, '@graph');
      // remove @preserve from results (named graphs?)
      compacted[graph] = _removePreserve(ctx, compacted[graph]);

      var top = compacted[graph][0];

      var recurse = function(subject) {
        // can't replace just a string
        if(!_isObject(subject) && !_isArray(subject)) {
          return;
        }

        // bottom out recursion on re-visit
        if(_isObject(subject)) {
          if(recurse.visited[subject['@id']]) {
            return;
          }
          recurse.visited[subject['@id']] = true;
        }

        // each array elementt *or* object key
        for(var k in subject) {
          var obj = subject[k];
          var isid = (jsonld.getContextValue(ctx, k, '@type') === '@id');

          // can't replace a non-object or non-array unless it's an @id
          if(!_isArray(obj) && !_isObject(obj) && !isid) {
            continue;
          }

          if(_isString(obj) && isid) {
            subject[k] = obj = top[obj];
            recurse(obj);
          }
          else if(_isArray(obj)) {
            for(var i=0; i<obj.length; i++) {
              if(_isString(obj[i]) && isid) {
                obj[i] = top[obj[i]];
              }
              else if(_isObject(obj[i]) && '@id' in obj[i]) {
                obj[i] = top[obj[i]['@id']];
              }
              recurse(obj[i]);
            }
          }
          else if(_isObject(obj)) {
            var sid = obj['@id'];
            subject[k] = obj = top[sid];
            recurse(obj);
          }
        }
      };
      recurse.visited = {};
      recurse(top);

      compacted.of_type = {};
      for(var s in top) {
        if(!('@type' in top[s])) {
          continue;
        }
        var types = top[s]['@type'];
        if(!_isArray(types)) {
          types = [types];
        }
        for(var t in types) {
          if(!(types[t] in compacted.of_type)) {
            compacted.of_type[types[t]] = [];
          }
          compacted.of_type[types[t]].push(top[s]);
        }
      }
      callback(null, compacted);
    });
  });
};

/**
 * Performs RDF normalization on the given JSON-LD input. The output is
 * a sorted array of RDF statements unless the 'format' option is used.
 *
 * @param input the JSON-LD input to normalize.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 * @param [options] the options to use:
 *          [format] the format if output is a string:
 *            'application/nquads' for N-Quads.
 *          [resolver(url, callback(err, jsonCtx))] the URL resolver to use.
 * @param callback(err, normalized) called once the operation completes.
 */
jsonld.normalize = function(input, callback) {
  // get arguments
  var options = {};
  var callback;
  var callbackArg = 1;
  if(arguments.length > 2) {
    options = arguments[1] || {};
    callbackArg += 1;
  }
  callback = arguments[callbackArg];

  // set default options
  if(!('base' in options)) {
    options.base = '';
  }
  if(!('resolver' in options)) {
    options.resolver = jsonld.urlResolver;
  }

  // expand input then do normalization
  jsonld.expand(input, options, function(err, expanded) {
    if(err) {
      return callback(new JsonLdError(
        'Could not expand input before normalization.',
        'jsonld.NormalizeError', {cause: err}));
    }

    // do normalization
    new Processor().normalize(expanded, options, callback);
  });
};

/**
 * Converts RDF statements into JSON-LD.
 *
 * @param statements a serialized string of RDF statements in a format
 *          specified by the format option or an array of the RDF statements
 *          to convert.
 * @param [options] the options to use:
 *          [format] the format if input is not an array:
 *            'application/nquads' for N-Quads (default).
 *          [useRdfType] true to use rdf:type, false to use @type
 *            (default: false).
 *          [useNativeTypes] true to convert XSD types into native types
 *            (boolean, integer, double), false not to (default: true).
 *
 * @param callback(err, output) called once the operation completes.
 */
jsonld.fromRDF = function(statements) {
  // get arguments
  var options = {};
  var callback;
  var callbackArg = 1;
  if(arguments.length > 2) {
    options = arguments[1] || {};
    callbackArg += 1;
  }
  callback = arguments[callbackArg];

  // set default options
  if(!('useRdfType' in options)) {
    options.useRdfType = false;
  }
  if(!('useNativeTypes' in options)) {
    options.useNativeTypes = true;
  }

  if(!('format' in options) && !_isArray(statements)) {
    // set default format to nquads
    if(!('format' in options)) {
      options.format = 'application/nquads';
    }
  }

  // handle special format
  if('format' in options) {
    // supported formats
    if(options.format in _rdfParsers) {
      statements = _rdfParsers[options.format](statements);
    }
    else {
      throw new JsonLdError(
        'Unknown input format.',
        'jsonld.UnknownFormat', {format: options.format});
    }
  }

  // convert from RDF
  new Processor().fromRDF(statements, options, callback);
};

/**
 * Outputs the RDF statements found in the given JSON-LD object.
 *
 * @param input the JSON-LD input.
 * @param [options] the options to use:
 *          [base] the base IRI to use.
 *          [format] the format to use to output a string:
 *            'application/nquads' for N-Quads (default).
 *          [collate] true to output all statements at once (in an array
 *            or as a formatted string), false to output one statement at
 *            a time (default).
 *          [resolver(url, callback(err, jsonCtx))] the URL resolver to use.
 * @param callback(err, statement) called when a statement is output, with the
 *          last statement as null.
 */
jsonld.toRDF = function(input) {
  // get arguments
  var options = {};
  var callback;
  var callbackArg = 1;
  if(arguments.length > 2) {
    options = arguments[1] || {};
    callbackArg += 1;
  }
  callback = arguments[callbackArg];

  // set default options
  if(!('base' in options)) {
    options.base = '';
  }
  if(!('resolver' in options)) {
    options.resolver = jsonld.urlResolver;
  }
  if(!('collate' in options)) {
    options.collate = false;
  }

  if(options.collate) {
    // output array/string of statements all at once
    var statements = [];
    var collateCallback = callback;
    callback = function(err, statement) {
      if(err) {
        return collateCallback(err);
      }
      if(statement !== null) {
        // do not allow duplicate statements
        for(var i in statements) {
          if(_compareRdfStatements(statements[i], statement)) {
            return;
          }
        }
        statements.push(statement);
      }
      else {
        // if outputting a string, sort and join statements
        if('format' in options) {
          statements = statements.sort().join('');
        }
        collateCallback(null, statements);
      }
    };
  }

  if('format' in options) {
    // supported formats
    if(options.format === 'application/nquads') {
      var statementCallback = callback;
      callback = function(err, statement) {
        if(err) {
          return statementCallback(err);
        }
        if(statement !== null) {
          statement = _toNQuad(statement);
        }
        statementCallback(null, statement);
      };
    }
    else {
      throw new JsonLdError(
        'Unknown output format.',
        'jsonld.UnknownFormat', {format: options.format});
    }
  }

  // expand input
  jsonld.expand(input, options, function(err, expanded) {
    if(err) {
      return callback(new JsonLdError(
        'Could not expand input before conversion to RDF.',
        'jsonld.RdfError', {cause: err}));
    }

    try {
      // output RDF statements
      var namer = new UniqueNamer('_:t');
      new Processor().toRDF(expanded, namer, null, null, null, callback);
    }
    catch(ex) {
      callback(ex);
    }
  });
};

/**
 * The default URL resolver for external @context URLs.
 *
 * @param resolver(url, callback(err, ctx)) the resolver to use.
 */
jsonld.urlResolver = function(url, callback) {
  return callback(new JsonLdError(
    'Could not resolve @context URL. URL derefencing not implemented.',
    'jsonld.ContextUrlError'));
};

/* Utility API */

/**
 * Creates a simple context cache.
 *
 * @param size the maximum size of the cache.
 */
jsonld.ContextCache = function(size) {
  this.order = [];
  this.cache = {};
  this.size = size || 50;
  this.expires = 30*60*1000;
};
jsonld.ContextCache.prototype.get = function(url) {
  if(url in this.cache) {
    var entry = this.cache[url];
    if(entry.expires >= +new Date()) {
      return entry.ctx;
    }
    delete this.cache[url];
    this.order.splice(this.order.indexOf(url), 1);
  }
  return null;
};
jsonld.ContextCache.prototype.set = function(url, ctx) {
  if(this.order.length === this.size) {
    delete this.cache[this.order.shift()];
  }
  this.order.push(url);
  this.cache[url] = {ctx: ctx, expires: (+new Date() + this.expires)};
};

/**
 * Creates an active context cache.
 *
 * @param size the maximum size of the cache.
 */
jsonld.ActiveContextCache = function(size) {
  this.order = [];
  this.cache = {};
  this.size = size || 100;
};
jsonld.ActiveContextCache.prototype.get = function(activeCtx, localCtx) {
  var key1 = JSON.stringify(activeCtx);
  var key2 = JSON.stringify(localCtx);
  var level1 = this.cache[key1];
  if(level1 && key2 in level1) {
    // get shareable copy of cached active context
    return level1[key2].share();
  }
  return null;
};
jsonld.ActiveContextCache.prototype.set = function(
  activeCtx, localCtx, result) {
  if(this.order.length === this.size) {
    var entry = this.order.shift();
    delete this.cache[entry.activeCtx][entry.localCtx];
  }
  var key1 = JSON.stringify(activeCtx);
  var key2 = JSON.stringify(localCtx);
  this.order.push({activeCtx: key1, localCtx: key2});
  if(!(key1 in this.cache)) {
    this.cache[key1] = {};
  }
  this.cache[key1][key2] = result;
};

/**
 * Default JSON-LD cache.
 */
jsonld.cache = {
  activeCtx: new jsonld.ActiveContextCache()
};

/**
 * URL resolvers.
 */
jsonld.urlResolvers = {};

/**
 * The built-in jquery URL resolver.
 */
jsonld.urlResolvers['jquery'] = function($) {
  var cache = new jsonld.ContextCache();
  return function(url, callback) {
    var ctx = cache.get(url);
    if(ctx !== null) {
      return callback(null, ctx);
    }
    $.ajax({
      url: url,
      dataType: 'json',
      crossDomain: true,
      success: function(data, textStatus, jqXHR) {
        cache.set(url, data);
        callback(null, data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        callback(errorThrown);
      }
    });
  };
};

/**
 * The built-in node URL resolver.
 */
jsonld.urlResolvers['node'] = function() {
  var request = require('request');
  var http = require('http');
  var cache = new jsonld.ContextCache();
  return function(url, callback) {
    var ctx = cache.get(url);
    if(ctx !== null) {
      return callback(null, ctx);
    }
    request(url, function(err, res, body) {
      if(!err && res.statusCode >= 400) {
        var statusText = http.STATUS_CODES[res.statusCode];
        err = new JsonLdError(
          'URL could not be dereferenced: ' + statusText,
          'jsonld.InvalidUrl', {url: url, httpStatusCode: res.statusCode});
      }
      if(!err) {
        cache.set(url, body);
      }
      callback(err, body);
    });
  };
};

/**
 * Assigns the default URL resolver for external @context URLs to a built-in
 * default. Supported types currently include: 'jquery'.
 *
 * To use the jquery URL resolver, the 'data' parameter must be a reference
 * to the main jquery object.
 *
 * @param type the type to set.
 * @param [params] the parameters required to use the resolver.
 */
jsonld.useUrlResolver = function(type) {
  if(!(type in jsonld.urlResolvers)) {
    throw new JsonLdError(
      'Unknown @context URL resolver type: "' + type + '"',
      'jsonld.UnknownUrlResolver',
      {type: type});
  }

  // set URL resolver
  jsonld.urlResolver = jsonld.urlResolvers[type].apply(
    jsonld, Array.prototype.slice.call(arguments, 1));
};


/**
 * Processes a local context, resolving any URLs as necessary, and returns a
 * new active context in its callback.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context to process.
 * @param [options] the options to use:
 *          [resolver(url, callback(err, jsonCtx))] the URL resolver to use.
 * @param callback(err, ctx) called once the operation completes.
 */
jsonld.processContext = function(activeCtx, localCtx) {
  // get arguments
  var options = {};
  var callbackArg = 2;
  if(arguments.length > 3) {
    options = arguments[2] || {};
    callbackArg += 1;
  }
  var callback = arguments[callbackArg];

  // set default options
  if(!('base' in options)) {
    options.base = '';
  }
  if(!('resolver' in options)) {
    options.resolver = jsonld.urlResolver;
  }

  // return initial context early for null context
  if(localCtx === null) {
    return callback(null, _getInitialContext(options));
  }

  // resolve URLs in localCtx
  localCtx = _clone(localCtx);
  if(_isObject(localCtx) && !('@context' in localCtx)) {
    localCtx = {'@context': localCtx};
  }
  _resolveContextUrls(localCtx, options, function(err, ctx) {
    if(err) {
      return callback(err);
    }
    try {
      // process context
      ctx = new Processor().processContext(activeCtx, ctx, options);
      callback(null, ctx);
    }
    catch(ex) {
      callback(ex);
    }
  });
};

/**
 * Returns true if the given subject has the given property.
 *
 * @param subject the subject to check.
 * @param property the property to look for.
 *
 * @return true if the subject has the given property, false if not.
 */
jsonld.hasProperty = function(subject, property) {
  var rval = false;
  if(property in subject) {
    var value = subject[property];
    rval = (!_isArray(value) || value.length > 0);
  }
  return rval;
};

/**
 * Determines if the given value is a property of the given subject.
 *
 * @param subject the subject to check.
 * @param property the property to check.
 * @param value the value to check.
 *
 * @return true if the value exists, false if not.
 */
jsonld.hasValue = function(subject, property, value) {
  var rval = false;
  if(jsonld.hasProperty(subject, property)) {
    var val = subject[property];
    var isList = _isList(val);
    if(_isArray(val) || isList) {
      if(isList) {
        val = val['@list'];
      }
      for(var i in val) {
        if(jsonld.compareValues(value, val[i])) {
          rval = true;
          break;
        }
      }
    }
    // avoid matching the set of values with an array value parameter
    else if(!_isArray(value)) {
      rval = jsonld.compareValues(value, val);
    }
  }
  return rval;
};

/**
 * Adds a value to a subject. If the value is an array, all values in the
 * array will be added.
 *
 * @param subject the subject to add the value to.
 * @param property the property that relates the value to the subject.
 * @param value the value to add.
 * @param [options] the options to use:
 *        [propertyIsArray] true if the property is always an array, false
 *          if not (default: false).
 *        [allowDuplicate] true to allow duplicates, false not to (uses a
 *          simple shallow comparison of subject ID or value) (default: true).
 */
jsonld.addValue = function(subject, property, value, options) {
  options = options || {};
  if(!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  }
  if(!('allowDuplicate' in options)) {
    options.allowDuplicate = true;
  }

  if(_isArray(value)) {
    if(value.length === 0 && options.propertyIsArray &&
      !(property in subject)) {
      subject[property] = [];
    }
    for(var i in value) {
      jsonld.addValue(subject, property, value[i], options);
    }
  }
  else if(property in subject) {
    // check if subject already has value if duplicates not allowed
    var hasValue = (!options.allowDuplicate &&
      jsonld.hasValue(subject, property, value));

    // make property an array if value not present or always an array
    if(!_isArray(subject[property]) &&
      (!hasValue || options.propertyIsArray)) {
      subject[property] = [subject[property]];
    }

    // add new value
    if(!hasValue) {
      subject[property].push(value);
    }
  }
  else {
    // add new value as set or single value
    subject[property] = options.propertyIsArray ? [value] : value;
  }
};

/**
 * Gets all of the values for a subject's property as an array.
 *
 * @param subject the subject.
 * @param property the property.
 *
 * @return all of the values for a subject's property as an array.
 */
jsonld.getValues = function(subject, property) {
  var rval = subject[property] || [];
  if(!_isArray(rval)) {
    rval = [rval];
  }
  return rval;
};

/**
 * Removes a property from a subject.
 *
 * @param subject the subject.
 * @param property the property.
 */
jsonld.removeProperty = function(subject, property) {
  delete subject[property];
};

/**
 * Removes a value from a subject.
 *
 * @param subject the subject.
 * @param property the property that relates the value to the subject.
 * @param value the value to remove.
 * @param [options] the options to use:
 *          [propertyIsArray] true if the property is always an array, false
 *            if not (default: false).
 */
jsonld.removeValue = function(subject, property, value, options) {
  options = options || {};
  if(!('propertyIsArray' in options)) {
    options.propertyIsArray = false;
  }

  // filter out value
  var values = jsonld.getValues(subject, property).filter(function(e) {
    return !jsonld.compareValues(e, value);
  });

  if(values.length === 0) {
    jsonld.removeProperty(subject, property);
  }
  else if(values.length === 1 && !options.propertyIsArray) {
    subject[property] = values[0];
  }
  else {
    subject[property] = values;
  }
};

/**
 * Compares two JSON-LD values for equality. Two JSON-LD values will be
 * considered equal if:
 *
 * 1. They are both primitives of the same type and value.
 * 2. They are both @values with the same @value, @type, @language,
 *   and @index, OR
 * 3. They are both @lists with the same @list and @index, OR
 * 4. They both have @ids they are the same.
 *
 * @param v1 the first value.
 * @param v2 the second value.
 *
 * @return true if v1 and v2 are considered equal, false if not.
 */
jsonld.compareValues = function(v1, v2) {
  // 1. equal primitives
  if(v1 === v2) {
    return true;
  }

  // 2. equal @values
  if(_isValue(v1) && _isValue(v2) &&
    v1['@value'] === v2['@value'] &&
    v1['@type'] === v2['@type'] &&
    v1['@language'] === v2['@language'] &&
    v1['@index'] === v2['@index']) {
    return true;
  }

  // 3. equal @lists
  if(_isList(v1) && _isList(v2)) {
    if(v1['@index'] !== v2['@index']) {
      return false;
    }
    var list1 = v1['@list'];
    var list2 = v2['@list'];
    if(list1.length !== list2.length) {
      return false;
    }
    for(var i = 0; i < list1.length; ++i) {
      if(!jsonld.compareValues(list1[i], list2[i])) {
        return false;
      }
    }
    return true;
  }

  // 4. equal @ids
  if(_isObject(v1) && ('@id' in v1) && _isObject(v2) && ('@id' in v2)) {
    return v1['@id'] === v2['@id'];
  }

  return false;
};

/**
 * Gets the value for the given active context key and type, null if none is
 * set.
 *
 * @param ctx the active context.
 * @param key the context key.
 * @param [type] the type of value to get (eg: '@id', '@type'), if not
 *          specified gets the entire entry for a key, null if not found.
 *
 * @return the value.
 */
jsonld.getContextValue = function(ctx, key, type) {
  var rval = null;

  // return null for invalid key
  if(key === null) {
    return rval;
  }

  // get default language
  if(type === '@language' && (type in ctx)) {
    rval = ctx[type];
  }

  // get specific entry information
  if(ctx.mappings[key]) {
    var entry = ctx.mappings[key];

    // return whole entry
    if(_isUndefined(type)) {
      rval = entry;
    }
    // return entry value for type
    else if(type in entry) {
      rval = entry[type];
    }
  }

  return rval;
};

/** Registered RDF Statement parsers hashed by content-type. */
var _rdfParsers = {};

/**
 * Registers an RDF Statement parser by content-type, for use with
 * jsonld.fromRDF.
 *
 * @param contentType the content-type for the parser.
 * @param parser(input) the parser function (takes a string as a parameter
 *          and returns an array of RDF statements).
 */
jsonld.registerRDFParser = function(contentType, parser) {
  _rdfParsers[contentType] = parser;
};

/**
 * Unregisters an RDF Statement parser by content-type.
 *
 * @param contentType the content-type for the parser.
 */
jsonld.unregisterRDFParser = function(contentType) {
  delete _rdfParsers[contentType];
};

// determine if in-browser or using node.js
var _nodejs = (typeof module !== 'undefined');
var _browser = !_nodejs;

// export nodejs API
if(_nodejs) {
  module.exports = jsonld;
  // use node URL resolver by default
  jsonld.useUrlResolver('node');

  // needed for serialization of XML literals
  if(typeof XMLSerializer === 'undefined') {
    var XMLSerializer = null;
  }
  if(typeof Node === 'undefined') {
    var Node = {
      ELEMENT_NODE: 1,
      ATTRIBUTE_NODE: 2,
      TEXT_NODE: 3,
      CDATA_SECTION_NODE: 4,
      ENTITY_REFERENCE_NODE: 5,
      ENTITY_NODE: 6,
      PROCESSING_INSTRUCTION_NODE: 7,
      COMMENT_NODE: 8,
      DOCUMENT_NODE: 9,
      DOCUMENT_TYPE_NODE: 10,
      DOCUMENT_FRAGMENT_NODE: 11,
      NOTATION_NODE:12
    };
  }
}

// export AMD API
if(typeof define === 'function' && define.amd) {
  define('jsonld', [], function() {
    return jsonld;
  });
}
// export simple browser API
else if(_browser) {
  window.jsonld = window.jsonld || jsonld;
}

// constants
var XSD_BOOLEAN = 'http://www.w3.org/2001/XMLSchema#boolean';
var XSD_DOUBLE = 'http://www.w3.org/2001/XMLSchema#double';
var XSD_INTEGER = 'http://www.w3.org/2001/XMLSchema#integer';
var XSD_STRING = 'http://www.w3.org/2001/XMLSchema#string';

var RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#';
var RDF_FIRST = RDF + 'first';
var RDF_REST = RDF + 'rest';
var RDF_NIL = RDF + 'nil';
var RDF_TYPE = RDF + 'type';
var RDF_PLAIN_LITERAL = RDF + 'PlainLiteral';
var RDF_XML_LITERAL = RDF + 'XMLLiteral';
var RDF_OBJECT = RDF + 'object';

var MAX_CONTEXT_URLS = 10;

/**
 * A JSON-LD Error.
 *
 * @param msg the error message.
 * @param type the error type.
 * @param details the error details.
 */
var JsonLdError = function(msg, type, details) {
  if(_nodejs) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);
  }
  this.name = type || 'jsonld.Error';
  this.message = msg || 'An unspecified JSON-LD error occurred.';
  this.details = details || {};
};
if(_nodejs) {
  require('util').inherits(JsonLdError, Error);
}

/**
 * Constructs a new JSON-LD Processor.
 */
var Processor = function() {};

/**
 * Recursively compacts an element using the given active context. All values
 * must be in expanded form before this method is called.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the compacted property associated with the element
 *          to compact, null for none.
 * @param element the element to compact.
 * @param options the compaction options.
 *
 * @return the compacted value.
 */
Processor.prototype.compact = function(
  activeCtx, activeProperty, element, options) {
  // recursively compact array
  if(_isArray(element)) {
    var rval = [];
    for(var i in element) {
      // compact, dropping any null values
      var compacted = this.compact(
        activeCtx, activeProperty, element[i], options);
      if(compacted !== null) {
        rval.push(compacted);
      }
    }
    if(rval.length === 1) {
      // use single element if no container is specified
      var container = jsonld.getContextValue(
        activeCtx, activeProperty, '@container');
      if(container === null) {
        rval = rval[0];
      }
    }
    return rval;
  }

  // recursively compact object
  if(_isObject(element)) {
    // do value compaction on @values and subject references
    if(_isValue(element) || _isSubjectReference(element)) {
      return _compactValue(activeCtx, activeProperty, element);
    }

    // shallow copy element and arrays so keys and values can be removed
    // during property generator compaction
    var shallow = {};
    for(var expandedProperty in element) {
      if(_isArray(element[expandedProperty])) {
        shallow[expandedProperty] = element[expandedProperty].slice();
      }
      else {
        shallow[expandedProperty] = element[expandedProperty];
      }
    }
    element = shallow;

    // process element keys in order
    var keys = Object.keys(element).sort();
    var rval = {};
    for(var ki = 0; ki < keys.length; ++ki) {
      var expandedProperty = keys[ki];

      // skip key if removed during property generator duplicate handling
      if(!(expandedProperty in element)) {
        continue;
      }

      var expandedValue = element[expandedProperty];

      // compact @id and @type(s)
      if(expandedProperty === '@id' || expandedProperty === '@type') {
        var compactedValue;

        // compact single @id
        if(_isString(expandedValue)) {
          compactedValue = _compactIri(
            activeCtx, expandedValue, null,
            {base: true, vocab: (expandedProperty === '@type')});
        }
        // expanded value must be a @type array
        else {
          compactedValue = [];
          for(var vi = 0; vi < expandedValue.length; ++vi) {
            compactedValue.push(_compactIri(
              activeCtx, expandedValue[vi], null, {base: true, vocab: true}));
          }
        }

        // use keyword alias and add value
        var alias = _compactIri(activeCtx, expandedProperty);
        var isArray = (_isArray(compactedValue) && expandedValue.length === 0);
        jsonld.addValue(
          rval, alias, compactedValue, {propertyIsArray: isArray});
        continue;
      }

      // handle @index property
      if(expandedProperty === '@index') {
        // drop @index if inside an @index container
        var container = jsonld.getContextValue(
          activeCtx, activeProperty, '@container');
        if(container === '@index') {
          continue;
        }

        // use keyword alias and add value
        var alias = _compactIri(activeCtx, expandedProperty);
        jsonld.addValue(rval, alias, expandedValue);
        continue;
      }

      // Note: expanded value must be an array due to expansion algorithm.

      // preserve empty arrays
      if(expandedValue.length === 0) {
        var activeProperty = _compactIri(
          activeCtx, expandedProperty, null, {vocab: true}, element);
        jsonld.addValue(rval, activeProperty, [], {propertyIsArray: true});
      }

      // recusively process array values
      for(var vi = 0; vi < expandedValue.length; ++vi) {
        var expandedItem = expandedValue[vi];

        // compact property and get container type
        var activeProperty = _compactIri(
          activeCtx, expandedProperty, expandedItem, {vocab: true}, element);
        var container = jsonld.getContextValue(
          activeCtx, activeProperty, '@container');

        // remove any duplicates that were (presumably) generated by a
        // property generator
        var mapping = activeCtx.mappings[activeProperty];
        if(mapping && mapping.propertyGenerator) {
          _findAndRemovePropertyGeneratorDuplicates(
            activeCtx, element, expandedProperty, expandedItem, activeProperty);
        }

        // get @list value if appropriate
        var isList = _isList(expandedItem);
        var list = null;
        if(isList) {
          list = expandedItem['@list'];
        }

        // recursively compact expanded item
        var compactedItem = this.compact(
          activeCtx, activeProperty, isList ? list : expandedItem, options);

        // handle @list
        if(isList) {
          // ensure @list value is an array
          if(!_isArray(compactedItem)) {
            compactedItem = [compactedItem];
          }

          if(container !== '@list') {
            // wrap using @list alias
            var wrapper = {};
            wrapper[_compactIri(activeCtx, '@list')] = compactedItem;
            compactedItem = wrapper;

            // include @index from expanded @list, if any
            if('@index' in expandedItem) {
              compactedItem[_compactIri(activeCtx, '@index')] =
                expandedItem['@index'];
            }
          }
          // can't use @list container for more than 1 list
          else if(activeProperty in rval) {
            throw new JsonLdError(
              'JSON-LD compact error; property has a "@list" @container ' +
              'rule but there is more than a single @list that matches ' +
              'the compacted term in the document. Compaction might mix ' +
              'unwanted items into the list.',
              'jsonld.SyntaxError');
          }
        }

        // handle language and index maps
        if(container === '@language' || container === '@index') {
          // get or create the map object
          var mapObject;
          if(activeProperty in rval) {
            mapObject = rval[activeProperty];
          }
          else {
            rval[activeProperty] = mapObject = {};
          }

          // if container is a language map, simplify compacted value to
          // a simple string
          if(container === '@language' && _isValue(compactedItem)) {
            compactedItem = compactedItem['@value'];
          }

          // add compact value to map object using key from expanded value
          // based on the container type
          jsonld.addValue(mapObject, expandedItem[container], compactedItem);
        }
        else {
          // use an array if: @container is @set or @list , value is an empty
          // array, or key is @graph
          var isArray = (container === '@set' || container === '@list' ||
            (_isArray(compactedItem) && compactedItem.length === 0) ||
            expandedProperty === '@graph');

          // add compact value
          jsonld.addValue(
            rval, activeProperty, compactedItem, {propertyIsArray: isArray});
        }
      }
    }

    return rval;
  }

  // only primitives remain which are already compact
  return element;
};

/**
 * Recursively expands an element using the given context. Any context in
 * the element will be removed. All context URLs must have been resolved
 * before calling this method.
 *
 * @param activeCtx the context to use.
 * @param activeProperty the property for the element, null for none.
 * @param element the element to expand.
 * @param options the expansion options.
 * @param insideList true if the element is a list, false if not.
 *
 * @return the expanded value.
 */
Processor.prototype.expand = function(
  activeCtx, activeProperty, element, options, insideList) {
  var self = this;

  if(typeof element === 'undefined') {
    throw new JsonLdError(
      'Invalid JSON-LD syntax; undefined element.',
      'jsonld.SyntaxError');
  }

  // nothing to expand
  if(element === null) {
    return null;
  }

  // recursively expand array
  if(_isArray(element)) {
    var rval = [];
    for(var i in element) {
      // expand element
      var e = self.expand(
        activeCtx, activeProperty, element[i], options, insideList);
      if(insideList && (_isArray(e) || _isList(e))) {
        // lists of lists are illegal
        throw new JsonLdError(
          'Invalid JSON-LD syntax; lists of lists are not permitted.',
          'jsonld.SyntaxError');
      }
      // drop null values
      else if(e !== null) {
        if(_isArray(e)) {
          rval = rval.concat(e);
        }
        else {
          rval.push(e);
        }
      }
    }
    return rval;
  }

  // recursively expand object
  if(_isObject(element)) {
    // if element has a context, process it
    if('@context' in element) {
      activeCtx = self.processContext(activeCtx, element['@context'], options);
      delete element['@context'];
    }

    // expand the active property
    var expandedActiveProperty = _expandIri(activeCtx, activeProperty);

    var rval = {};
    var keys = Object.keys(element).sort();
    for(var ki = 0; ki < keys.length; ++ki) {
      var key = keys[ki];
      var value = element[key];
      var expandedProperty;
      var expandedValue;

      // expand key using property generator
      var mapping = activeCtx.mappings[key];
      if(mapping && mapping.propertyGenerator) {
        expandedProperty = mapping['@id'];
      }
      // expand key to IRI
      else {
        expandedProperty = _expandIri(activeCtx, key, {vocab: true});
      }

      // drop non-absolute IRI keys that aren't keywords
      if(expandedProperty === null ||
        !(_isArray(expandedProperty) ||
        _isAbsoluteIri(expandedProperty) ||
        _isKeyword(expandedProperty))) {
        continue;
      }

      // syntax error if @id is not a string
      if(expandedProperty === '@id' && !_isString(value)) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; "@id" value must a string.',
          'jsonld.SyntaxError', {value: value});
      }

      // validate @type value
      if(expandedProperty === '@type') {
        _validateTypeValue(value);
      }

      // @graph must be an array or an object
      if(expandedProperty === '@graph' &&
        !(_isObject(value) || _isArray(value))) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; "@value" value must not be an ' +
          'object or an array.',
          'jsonld.SyntaxError', {value: value});
      }

      // @value must not be an object or an array
      if(expandedProperty === '@value' &&
        (_isObject(value) || _isArray(value))) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; "@value" value must not be an ' +
          'object or an array.',
          'jsonld.SyntaxError', {value: value});
      }

      // @language must be a string
      if(expandedProperty === '@language') {
        if(!_isString(value)) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; "@language" value must be a string.',
            'jsonld.SyntaxError', {value: value});
        }
        // ensure language value is lowercase
        value = value.toLowerCase();
      }

      // preserve @index
      if(expandedProperty === '@index') {
        if(!_isString(value)) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; "@index" value must be a string.',
            'jsonld.SyntaxError', {value: value});
        }
      }

      var container = jsonld.getContextValue(activeCtx, key, '@container');

      // handle language map container (skip if value is not an object)
      if(container === '@language' && _isObject(value)) {
        expandedValue = _expandLanguageMap(value);
      }
      // handle index container (skip if value is not an object)
      else if(container === '@index' && _isObject(value)) {
        expandedValue = (function _expandIndexMap(activeProperty) {
          var rval = [];
          var keys = Object.keys(value).sort();
          for(var ki = 0; ki < keys.length; ++ki) {
            var key = keys[ki];
            var val = value[key];
            if(!_isArray(val)) {
              val = [val];
            }
            val = self.expand(activeCtx, activeProperty, val, options, false);
            for(var vi = 0; vi < val.length; ++vi) {
              var item = val[vi];
              if(!('@index' in item)) {
                item['@index'] = key;
              }
              rval.push(item);
            }
          }
          return rval;
        })(key);
      }
      else {
        // recurse into @list or @set
        var isList = (expandedProperty === '@list');
        if(isList || expandedProperty === '@set') {
          var nextActiveProperty = activeProperty;
          if(isList && expandedActiveProperty === '@graph') {
            nextActiveProperty = null;
          }
          expandedValue = self.expand(
            activeCtx, nextActiveProperty, value, options, isList);
          if(isList && _isList(expandedValue)) {
            throw new JsonLdError(
              'Invalid JSON-LD syntax; lists of lists are not permitted.',
              'jsonld.SyntaxError');
          }
        }
        else {
          // recursively expand value with key as new active property
          expandedValue = self.expand(activeCtx, key, value, options, false);
        }
      }

      // drop null values if property is not @value
      if(expandedValue === null && expandedProperty !== '@value') {
        continue;
      }

      // convert expanded value to @list if container specifies it
      if(expandedProperty !== '@list' && !_isList(expandedValue) &&
        container === '@list') {
        // ensure expanded value is an array
        expandedValue = (_isArray(expandedValue) ?
          expandedValue : [expandedValue]);
        expandedValue = {'@list': expandedValue};
      }

      // add copy of value for each property from property generator
      if(_isArray(expandedProperty)) {
        _labelBlankNodes(activeCtx.namer, expandedValue);
        for(var i = 0; i < expandedProperty.length; ++i) {
          jsonld.addValue(
            rval, expandedProperty[i], _clone(expandedValue),
            {propertyIsArray: true});
        }
      }
      // add value for property
      else {
        // use an array except for certain keywords
        var useArray =
          ['@index', '@id', '@type', '@value', '@language'].indexOf(
            expandedProperty) === -1;
        jsonld.addValue(
          rval, expandedProperty, expandedValue, {propertyIsArray: useArray});
      }
    }

    // get property count on expanded output
    keys = Object.keys(rval);
    var count = keys.length;

    if('@value' in rval) {
      // @value must only have @language or @type
      if('@type' in rval && '@language' in rval) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; an element containing "@value" may not ' +
          'contain both "@type" and "@language".',
          'jsonld.SyntaxError', {element: rval});
      }
      var validCount = count - 1;
      if('@type' in rval) {
        validCount -= 1;
      }
      if('@index' in rval) {
        validCount -= 1;
      }
      if('@language' in rval) {
        validCount -= 1;
      }
      if(validCount !== 0) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; an element containing "@value" may only ' +
          'have an "@index" property and at most one other property ' +
          'which can be "@type" or "@language".',
          'jsonld.SyntaxError', {element: rval});
      }
      // drop null @values
      if(rval['@value'] === null) {
        rval = null;
      }
      // drop @language if @value isn't a string
      else if('@language' in rval && !_isString(rval['@value'])) {
        delete rval['@language'];
      }
    }
    // convert @type to an array
    else if('@type' in rval && !_isArray(rval['@type'])) {
      rval['@type'] = [rval['@type']];
    }
    // handle @set and @list
    else if('@set' in rval || '@list' in rval) {
      if(count > 1 && (count !== 2 && '@index' in rval)) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; if an element has the property "@set" ' +
          'or "@list", then it can have at most one other property that is ' +
          '"@index".',
          'jsonld.SyntaxError', {element: rval});
      }
      // optimize away @set
      if('@set' in rval) {
        rval = rval['@set'];
        keys = Object.keys(rval);
        count = keys.length;
      }
    }
    // drop objects with only @language
    else if(count === 1 && '@language' in rval) {
      rval = null;
    }

    // drop certain top-level objects that do not occur in lists
    if(_isObject(rval) &&
      !options.keepFreeFloatingNodes && !insideList &&
      (activeProperty === null || expandedActiveProperty === '@graph')) {
      // drop empty object or top-level @value
      if(count === 0 || ('@value' in rval)) {
        rval = null;
      }
      else {
        // drop subjects that generate no triples
        var hasTriples = false;
        var ignore = ['@graph', '@type', '@list'];
        for(var ki = 0; !hasTriples && ki < keys.length; ++ki) {
          if(!_isKeyword(keys[ki]) || ignore.indexOf(keys[ki]) !== -1) {
            hasTriples = true;
          }
        }
        if(!hasTriples) {
          rval = null;
        }
      }
    }

    return rval;
  }

  // drop top-level scalars that are not in lists
  if(!insideList &&
    (activeProperty === null ||
    _expandIri(activeCtx, activeProperty) === '@graph')) {
    return null;
  }

  // expand element according to value expansion rules
  return _expandValue(activeCtx, activeProperty, element);
};

/**
 * Performs JSON-LD flattening.
 *
 * @param input the expanded JSON-LD to flatten.
 *
 * @return the flattened output.
 */
Processor.prototype.flatten = function(input) {
  // produce a map of all subjects and name each bnode
  var namer = new UniqueNamer('_:t');
  var graphs = {'@default': {}};
  _createNodeMap(input, graphs, '@default', namer);

  // add all non-default graphs to default graph
  var defaultGraph = graphs['@default'];
  for(var graphName in graphs) {
    if(graphName === '@default') {
      continue;
    }
    var subject = defaultGraph[graphName];
    if(!subject) {
      defaultGraph[graphName] = subject = {
        '@id': graphName,
        '@graph': []
      };
    }
    else if(!('@graph' in subject)) {
      subject['@graph'] = [];
    }
    var graph = subject['@graph'];
    var nodeMap = graphs[graphName];
    var ids = Object.keys(nodeMap).sort();
    for(var ii = 0; ii < ids.length; ++ii) {
      var id = ids[ii];
      graph.push(nodeMap[id]);
    }
  }

  // produce flattened output
  var flattened = [];
  var keys = Object.keys(defaultGraph).sort();
  for(var ki = 0; ki < keys.length; ++ki) {
    var key = keys[ki];
    flattened.push(defaultGraph[key]);
  }
  return flattened;
};

/**
 * Performs JSON-LD framing.
 *
 * @param input the expanded JSON-LD to frame.
 * @param frame the expanded JSON-LD frame to use.
 * @param options the framing options.
 *
 * @return the framed output.
 */
Processor.prototype.frame = function(input, frame, options) {
  // create framing state
  var state = {
    options: options,
    graphs: {'@default': {}, '@merged': {}}
  };

  // produce a map of all graphs and name each bnode
  // FIXME: currently uses subjects from @merged graph only
  namer = new UniqueNamer('_:t');
  _createNodeMap(input, state.graphs, '@merged', namer);
  state.subjects = state.graphs['@merged'];

  // frame the subjects
  var framed = [];
  _frame(state, Object.keys(state.subjects).sort(), frame, framed, null);
  return framed;
};

/**
 * Performs RDF normalization on the given JSON-LD input.
 *
 * @param input the expanded JSON-LD object to normalize.
 * @param options the normalization options.
 * @param callback(err, normalized) called once the operation completes.
 */
Processor.prototype.normalize = function(input, options, callback) {
  // map bnodes to RDF statements
  var statements = [];
  var bnodes = {};
  var namer = new UniqueNamer('_:t');
  new Processor().toRDF(input, namer, null, null, null, mapStatements);

  // maps bnodes to their statements and then start bnode naming
  function mapStatements(err, statement) {
    if(err) {
      return callback(err);
    }
    if(statement === null) {
      // mapping complete, start canonical naming
      namer = new UniqueNamer('_:c14n');
      return hashBlankNodes(Object.keys(bnodes));
    }
    // add statement and do mapping
    for(var i in statements) {
      if(_compareRdfStatements(statements[i], statement)) {
        return;
      }
    }
    statements.push(statement);
    var nodes = ['subject', 'object'];
    for(var n in nodes) {
      var node = nodes[n];
      var id = statement[node].nominalValue;
      if(statement[node].interfaceName === 'BlankNode') {
        if(id in bnodes) {
          bnodes[id].statements.push(statement);
        }
        else {
          bnodes[id] = {statements: [statement]};
        }
      }
    }
  }

  // generates unique and duplicate hashes for bnodes
  function hashBlankNodes(unnamed) {
    var nextUnnamed = [];
    var duplicates = {};
    var unique = {};

    // hash statements for each unnamed bnode
    setTimeout(function() {hashUnnamed(0);}, 0);
    function hashUnnamed(i) {
      if(i === unnamed.length) {
        // done, name blank nodes
        return nameBlankNodes(unique, duplicates, nextUnnamed);
      }

      // hash unnamed bnode
      var bnode = unnamed[i];
      var hash = _hashStatements(bnode, bnodes, namer);

      // store hash as unique or a duplicate
      if(hash in duplicates) {
        duplicates[hash].push(bnode);
        nextUnnamed.push(bnode);
      }
      else if(hash in unique) {
        duplicates[hash] = [unique[hash], bnode];
        nextUnnamed.push(unique[hash]);
        nextUnnamed.push(bnode);
        delete unique[hash];
      }
      else {
        unique[hash] = bnode;
      }

      // hash next unnamed bnode
      setTimeout(function() {hashUnnamed(i + 1);}, 0);
    }
  }

  // names unique hash bnodes
  function nameBlankNodes(unique, duplicates, unnamed) {
    // name unique bnodes in sorted hash order
    var named = false;
    var hashes = Object.keys(unique).sort();
    for(var i in hashes) {
      var bnode = unique[hashes[i]];
      namer.getName(bnode);
      named = true;
    }

    // continue to hash bnodes if a bnode was assigned a name
    if(named) {
      hashBlankNodes(unnamed);
    }
    // name the duplicate hash bnodes
    else {
      nameDuplicates(duplicates);
    }
  }

  // names duplicate hash bnodes
  function nameDuplicates(duplicates) {
    // enumerate duplicate hash groups in sorted order
    var hashes = Object.keys(duplicates).sort();

    // process each group
    processGroup(0);
    function processGroup(i) {
      if(i === hashes.length) {
        // done, create JSON-LD array
        return createArray();
      }

      // name each group member
      var group = duplicates[hashes[i]];
      var results = [];
      nameGroupMember(group, 0);
      function nameGroupMember(group, n) {
        if(n === group.length) {
          // name bnodes in hash order
          results.sort(function(a, b) {
            a = a.hash;
            b = b.hash;
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
          });
          for(var r in results) {
            // name all bnodes in path namer in key-entry order
            // Note: key-order is preserved in javascript
            for(var key in results[r].pathNamer.existing) {
              namer.getName(key);
            }
          }
          return processGroup(i + 1);
        }

        // skip already-named bnodes
        var bnode = group[n];
        if(namer.isNamed(bnode)) {
          return nameGroupMember(group, n + 1);
        }

        // hash bnode paths
        var pathNamer = new UniqueNamer('_:t');
        pathNamer.getName(bnode);
        _hashPaths(bnode, bnodes, namer, pathNamer,
          function(err, result) {
            if(err) {
              return callback(err);
            }
            results.push(result);
            nameGroupMember(group, n + 1);
          });
      }
    }
  }

  // creates the sorted array of RDF statements
  function createArray() {
    var normalized = [];

    // update bnode names in each statement and serialize
    for(var i in statements) {
      var statement = statements[i];
      var nodes = ['subject', 'object'];
      for(var n in nodes) {
        var node = nodes[n];
        if(statement[node].interfaceName === 'BlankNode') {
          statement[node].nominalValue = namer.getName(
            statement[node].nominalValue);
        }
      }
      normalized.push(_toNQuad(statement));
    }

    // sort normalized output
    normalized.sort();

    // handle output format
    if('format' in options) {
      if(options.format === 'application/nquads') {
        return callback(null, normalized.join(''));
      }
      else {
        return callback(new JsonLdError(
          'Unknown output format.',
          'jsonld.UnknownFormat', {format: options.format}));
      }
    }

    // output parsed RDF statements
    callback(null, _parseNQuads(normalized.join('')));
  }
};

/**
 * Converts RDF statements into JSON-LD.
 *
 * @param statements the RDF statements.
 * @param options the RDF conversion options.
 * @param callback(err, output) called once the operation completes.
 */
Processor.prototype.fromRDF = function(statements, options, callback) {
  // prepare graph map (maps graph name => subjects, lists)
  var defaultGraph = {subjects: {}, listMap: {}};
  var graphs = {'': defaultGraph};

  for(var i in statements) {
    var statement = statements[i];

    // get subject, property, object, and graph name (default to '')
    var s = statement.subject.nominalValue;
    var p = statement.property.nominalValue;
    var o = statement.object;
    var name = ('name' in statement) ? statement.name.nominalValue : '';

    // create a graph entry as needed
    var graph;
    if(!(name in graphs)) {
      graph = graphs[name] = {subjects: {}, listMap: {}};
    }
    else {
      graph = graphs[name];
    }

    // handle element in @list
    if(p === RDF_FIRST) {
      // create list entry as needed
      var listMap = graph.listMap;
      var entry;
      if(!(s in listMap)) {
        entry = listMap[s] = {};
      }
      else {
        entry = listMap[s];
      }
      // set object value
      entry.first = _rdfToObject(o, options.useNativeTypes);
      continue;
    }

    // handle other element in @list
    if(p === RDF_REST) {
      // set next in list
      if(o.interfaceName === 'BlankNode') {
        // create list entry as needed
        var listMap = graph.listMap;
        var entry;
        if(!(s in listMap)) {
          entry = listMap[s] = {};
        }
        else {
          entry = listMap[s];
        }
        entry.rest = o.nominalValue;
      }
      continue;
    }

    // add graph subject to default graph as needed
    if(name !== '' && !(name in defaultGraph.subjects)) {
      defaultGraph.subjects[name] = {'@id': name};
    }

    // add subject to graph as needed
    var subjects = graph.subjects;
    var value;
    if(!(s in subjects)) {
      value = subjects[s] = {'@id': s};
    }
    // use existing subject value
    else {
      value = subjects[s];
    }

    // convert to @type unless options indicate to treat rdf:type as property
    if(p === RDF_TYPE && !options.useRdfType) {
      // add value of object as @type
      jsonld.addValue(value, '@type', o.nominalValue, {propertyIsArray: true});
    }
    else {
      // add property to value as needed
      var object = _rdfToObject(o, options.useNativeTypes);
      jsonld.addValue(value, p, object, {propertyIsArray: true});

      // a bnode might be the beginning of a list, so add it to the list map
      if(o.interfaceName === 'BlankNode') {
        var id = object['@id'];
        var listMap = graph.listMap;
        var entry;
        if(!(id in listMap)) {
          entry = listMap[id] = {};
        }
        else {
          entry = listMap[id];
        }
        entry.head = object;
      }
    }
  }

  // build @lists
  for(var name in graphs) {
    var graph = graphs[name];

    // find list head
    var listMap = graph.listMap;
    for(var subject in listMap) {
      var entry = listMap[subject];

      // head found, build lists
      if('head' in entry && 'first' in entry) {
        // replace bnode @id with @list
        delete entry.head['@id'];
        var list = entry.head['@list'] = [entry.first];
        while('rest' in entry) {
          var rest = entry.rest;
          entry = listMap[rest];
          if(!('first' in entry)) {
            throw new JsonLdError(
              'Invalid RDF list entry.',
              'jsonld.RdfError', {bnode: rest});
          }
          list.push(entry.first);
        }
      }
    }
  }

  // build default graph in subject @id order
  var output = [];
  var subjects = defaultGraph.subjects;
  var ids = Object.keys(subjects).sort();
  for(var i in ids) {
    var id = ids[i];

    // add subject to default graph
    var subject = subjects[id];
    output.push(subject);

    // output named graph in subject @id order
    if(id in graphs) {
      var graph = subject['@graph'] = [];
      var _subjects = graphs[id].subjects;
      var _ids = Object.keys(_subjects).sort();
      for(var _i in _ids) {
        graph.push(_subjects[_ids[_i]]);
      }
    }
  }
  callback(null, output);
};

/**
 * Outputs the RDF statements found in the given JSON-LD element.
 *
 * @param element the JSON-LD element.
 * @param namer the UniqueNamer for assigning bnode names.
 * @param subject the active subject.
 * @param property the active property.
 * @param graph the graph name.
 * @param callback(err, statement) called when a statement is output, with the
 *          last statement as null.
 */
Processor.prototype.toRDF = function(
  element, namer, subject, property, graph, callback) {
  _toRDF(element, namer, subject, property, graph, callback);
  callback(null, null);
};

/**
 * Processes a local context and returns a new active context.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context to process.
 * @param options the context processing options.
 *
 * @return the new active context.
 */
Processor.prototype.processContext = function(activeCtx, localCtx, options) {
  var rval = null;

  // get context from cache if available
  if(jsonld.cache.activeCtx) {
    rval = jsonld.cache.activeCtx.get(activeCtx, localCtx);
    if(rval) {
      return rval;
    }
  }

  // initialize the resulting context
  rval = activeCtx.clone();

  // normalize local context to an array of @context objects
  if(_isObject(localCtx) && '@context' in localCtx &&
    _isArray(localCtx['@context'])) {
    localCtx = localCtx['@context'];
  }
  var ctxs = _isArray(localCtx) ? localCtx : [localCtx];

  // process each context in order
  for(var i in ctxs) {
    var ctx = ctxs[i];

    // reset to initial context, keeping namer
    if(ctx === null) {
      rval = _getInitialContext(options);
      rval.namer = activeCtx.namer;
      continue;
    }

    // dereference @context key if present
    if(_isObject(ctx) && '@context' in ctx) {
      ctx = ctx['@context'];
    }

    // context must be an object by now, all URLs resolved before this call
    if(!_isObject(ctx)) {
      throw new JsonLdError(
        'Invalid JSON-LD syntax; @context must be an object.',
        'jsonld.SyntaxError', {context: ctx});
    }

    // define context mappings for keys in local context
    var defined = {};

    // handle @vocab
    if('@vocab' in ctx) {
      var value = ctx['@vocab'];
      if(value === null) {
        delete rval['@vocab'];
      }
      else if(!_isString(value)) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; the value of "@vocab" in a ' +
          '@context must be a string or null.',
          'jsonld.SyntaxError', {context: ctx});
      }
      else if(!_isAbsoluteIri(value)) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; the value of "@vocab" in a ' +
          '@context must be an absolute IRI.',
          'jsonld.SyntaxError', {context: ctx});
      }
      else {
        rval['@vocab'] = value;
      }
      defined['@vocab'] = true;
    }

    // handle @language
    if('@language' in ctx) {
      var value = ctx['@language'];
      if(value === null) {
        delete rval['@language'];
      }
      else if(!_isString(value)) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; the value of "@language" in a ' +
          '@context must be a string or null.',
          'jsonld.SyntaxError', {context: ctx});
      }
      else {
        rval['@language'] = value.toLowerCase();
      }
      defined['@language'] = true;
    }

    // process all other keys
    for(var key in ctx) {
      _createTermDefinition(rval, ctx, key, defined);
    }
  }

  // cache result
  if(jsonld.cache.activeCtx) {
    jsonld.cache.activeCtx.set(activeCtx, localCtx, rval);
  }

  return rval;
};

/**
 * Expands a language map.
 *
 * @param languageMap the language map to expand.
 *
 * @return the expanded language map.
 */
function _expandLanguageMap(languageMap) {
  var rval = [];
  var keys = Object.keys(languageMap).sort();
  for(var ki = 0; ki < keys.length; ++ki) {
    var key = keys[ki];
    var val = languageMap[key];
    if(!_isArray(val)) {
      val = [val];
    }
    for(var vi = 0; vi < val.length; ++vi) {
      var item = val[vi];
      if(!_isString(item)) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; language map values must be strings.',
          'jsonld.SyntaxError', {languageMap: languageMap});
      }
      rval.push({
        '@value': item,
        '@language': key.toLowerCase()
      });
    }
  }
  return rval;
}

/**
 * Labels the blank nodes in the given value using the given UniqueNamer.
 *
 * @param namer the UniqueNamer to use.
 * @param element the element with blank nodes to rename.
 * @param isId true if the given element is an @id (or @type).
 *
 * @return the element.
 */
function _labelBlankNodes(namer, element, isId) {
  if(_isArray(element)) {
    for(var i = 0; i < element.length; ++i) {
      element[i] = _labelBlankNodes(namer, element[i], isId);
    }
  }
  else if(_isList(element)) {
    element['@list'] = _labelBlankNodes(namer, element['@list'], isId);
  }
  else if(_isObject(element)) {
    // rename blank node
    if(_isBlankNode(element)) {
      element['@id'] = namer.getName(element['@id']);
    }

    // recursively apply to all keys
    var keys = Object.keys(element).sort();
    for(var ki = 0; ki < keys.length; ++ki) {
      var key = keys[ki];
      if(key !== '@id') {
        element[key] = _labelBlankNodes(namer, element[key], key === '@type');
      }
    }
  }
  // rename blank node identifier
  else if(_isString(element) && isId && element.indexOf('_:') === 0) {
    element = namer.getName(element);
  }

  return element;
}

/**
 * Expands the given value by using the coercion and keyword rules in the
 * given context.
 *
 * @param activeCtx the active context to use.
 * @param activeProperty the active property the value is associated with.
 * @param value the value to expand.
 *
 * @return the expanded value.
 */
function _expandValue(activeCtx, activeProperty, value) {
  // nothing to expand
  if(value === null) {
    return null;
  }

  // special-case expand @id and @type (skips '@id' expansion)
  var expandedProperty = _expandIri(activeCtx, activeProperty, {vocab: true});
  if(expandedProperty === '@id') {
    return _expandIri(activeCtx, value, {base: true});
  }
  else if(expandedProperty === '@type') {
    return _expandIri(activeCtx, value, {vocab: true, base: true});
  }

  // get type definition from context
  var type = jsonld.getContextValue(activeCtx, activeProperty, '@type');

  // do @id expansion (automatic for @graph)
  if(type === '@id' || expandedProperty === '@graph') {
    return {'@id': _expandIri(activeCtx, value, {base: true})};
  }

  // do not expand keyword values
  if(_isKeyword(expandedProperty)) {
    return value;
  }

  rval = {};

  // other type
  if(type !== null) {
    // rename blank node if requested
    if(activeCtx.namer && type.indexOf('_:') === 0) {
      type = activeCtx.namer.getName(type);
    }
    rval['@type'] = type;
  }
  // check for language tagging for strings
  else if(_isString(value)) {
    var language = jsonld.getContextValue(
      activeCtx, activeProperty, '@language');
    if(language !== null) {
      rval['@language'] = language;
    }
  }
  rval['@value'] = value;

  return rval;
}

/**
 * Recursively outputs the RDF statements found in the given JSON-LD element.
 *
 * @param element the JSON-LD element.
 * @param namer the UniqueNamer for assigning bnode names.
 * @param subject the active subject.
 * @param property the active property.
 * @param graph the graph name.
 * @param callback(err, statement) called when a statement is output, with the
 *          last statement as null.
 */
function _toRDF(element, namer, subject, property, graph, callback) {
  // recurse into arrays
  if(_isArray(element)) {
    for(var i in element) {
      _toRDF(element[i], namer, subject, property, graph, callback);
    }
    return;
  }

  // element must be an rdf:type IRI (@values covered above)
  if(_isString(element)) {
    // emit IRI
    var statement = {
      subject: _clone(subject),
      property: _clone(property),
      object: {
        nominalValue: element,
        interfaceName: 'IRI'
      }
    };
    if(graph !== null) {
      statement.name = graph;
    }
    return callback(null, statement);
  }

  // convert @list
  if(_isList(element)) {
    var list = _makeLinkedList(element);
    return _toRDF(list, namer, subject, property, graph, callback);
  }

  // convert @value to object
  if(_isValue(element)) {
    var value = element['@value'];
    var datatype = element['@type'] || null;

    // convert to XSD datatypes as appropriate
    if(_isBoolean(value)) {
      value = value.toString();
      datatype = datatype || XSD_BOOLEAN;
    }
    else if(_isDouble(value)) {
      // canonical double representation
      value = value.toExponential(15).replace(/(\d)0*e\+?/, '$1E');
      datatype = datatype || XSD_DOUBLE;
    }
    else if(_isNumber(value)) {
      value = value.toFixed(0);
      datatype = datatype || XSD_INTEGER;
    }

    // default to xsd:string datatype
    datatype = datatype || XSD_STRING;

    var object = {
      nominalValue: value,
      interfaceName: 'LiteralNode',
      datatype: {
        nominalValue: datatype,
        interfaceName: 'IRI'
      }
    };
    if('@language' in element && datatype === XSD_STRING) {
      object.language = element['@language'];
    }

    // emit literal
    var statement = {
      subject: _clone(subject),
      property: _clone(property),
      object: object
    };
    if(graph !== null) {
      statement.name = graph;
    }
    return callback(null, statement);
  }

  // Note: element must be a subject

  // get subject @id (generate one if it is a bnode)
  var isBnode = _isBlankNode(element);
  var id = isBnode ? namer.getName(element['@id']) : element['@id'];

  // create object
  var object = {
    nominalValue: id,
    interfaceName: isBnode ? 'BlankNode' : 'IRI'
  };

  // emit statement if subject isn't null
  if(subject !== null) {
    var statement = {
      subject: _clone(subject),
      property: _clone(property),
      object: _clone(object)
    };
    if(graph !== null) {
      statement.name = graph;
    }
    callback(null, statement);
  }

  // set new active subject to object
  subject = object;

  // recurse over subject properties in order
  var props = Object.keys(element).sort();
  for(var pi in props) {
    var prop = props[pi];
    var e = element[prop];

    // convert @type to rdf:type
    if(prop === '@type') {
      prop = RDF_TYPE;
    }

    // recurse into @graph
    if(prop === '@graph') {
      _toRDF(e, namer, null, null, subject, callback);
      continue;
    }

    // skip keywords
    if(_isKeyword(prop)) {
      continue;
    }

    // create new active property
    property = {
      nominalValue: prop,
      interfaceName: 'IRI'
    };

    // recurse into value
    _toRDF(e, namer, subject, property, graph, callback);
  }
}

/**
 * Converts an RDF statement object to a JSON-LD object.
 *
 * @param o the RDF statement object to convert.
 * @param useNativeTypes true to output native types, false not to.
 *
 * @return the JSON-LD object.
 */
function _rdfToObject(o, useNativeTypes) {
  // convert empty list
  if(o.interfaceName === 'IRI' && o.nominalValue === RDF_NIL) {
    return {'@list': []};
  }

  // convert IRI/BlankNode object to JSON-LD
  if(o.interfaceName === 'IRI' || o.interfaceName === 'BlankNode') {
    return {'@id': o.nominalValue};
  }

  // convert literal object to JSON-LD
  var rval = {'@value': o.nominalValue};

  // add datatype
  if('datatype' in o) {
    var type = o.datatype.nominalValue;
    if(useNativeTypes) {
      // use native types for certain xsd types
      if(type === XSD_BOOLEAN) {
        if(rval['@value'] === 'true') {
          rval['@value'] = true;
        }
        else if(rval['@value'] === 'false') {
          rval['@value'] = false;
        }
      }
      else if(_isNumeric(rval['@value'])) {
        if(type === XSD_INTEGER) {
          var i = parseInt(rval['@value']);
          if(i.toFixed(0) === rval['@value']) {
            rval['@value'] = i;
          }
        }
        else if(type === XSD_DOUBLE) {
          rval['@value'] = parseFloat(rval['@value']);
        }
      }
      // do not add native type
      if([XSD_BOOLEAN, XSD_INTEGER, XSD_DOUBLE, XSD_STRING]
        .indexOf(type) === -1) {
        rval['@type'] = type;
      }
    }
    else {
      rval['@type'] = type;
    }
  }
  // add language
  if('language' in o) {
    rval['@language'] = o.language;
  }

  return rval;
}

/**
 * Compares two RDF statements for equality.
 *
 * @param s1 the first statement.
 * @param s2 the second statement.
 *
 * @return true if the statements are the same, false if not.
 */
function _compareRdfStatements(s1, s2) {
  if(_isString(s1) || _isString(s2)) {
    return s1 === s2;
  }

  var attrs = ['subject', 'property', 'object'];
  for(var i in attrs) {
    var attr = attrs[i];
    if(s1[attr].interfaceName !== s2[attr].interfaceName ||
      s1[attr].nominalValue !== s2[attr].nominalValue) {
      return false;
    }
  }
  if(s1.object.language !== s2.object.language) {
    return false;
  }
  if(('datatype' in s1.object) !== ('datatype' in s2.object)) {
    return false;
  }
  if('datatype' in s1.object) {
    if(s1.object.datatype.interfaceName !== s2.object.datatype.interfaceName ||
      s1.object.datatype.nominalValue !== s2.object.datatype.nominalValue) {
      return false;
    }
  }
  if(s1.name !== s2.name) {
    return false;
  }
  return true;
}

/**
 * Converts a @list value into an embedded linked list of blank nodes in
 * expanded form. The resulting array can be used as an RDF-replacement for
 * a property that used a @list.
 *
 * @param value the @list value.
 *
 * @return the head of the linked list of blank nodes.
 */
function _makeLinkedList(value) {
  // convert @list array into embedded blank node linked list in reverse
  var list = value['@list'];
  var len = list.length;
  var tail = {'@id': RDF_NIL};
  for(var i = len - 1; i >= 0; --i) {
    var e = {};
    e[RDF_FIRST] = [list[i]];
    e[RDF_REST] = [tail];
    tail = e;
  }
  return tail;
}

/**
 * Hashes all of the statements about a blank node.
 *
 * @param id the ID of the bnode to hash statements for.
 * @param bnodes the mapping of bnodes to statements.
 * @param namer the canonical bnode namer.
 *
 * @return the new hash.
 */
function _hashStatements(id, bnodes, namer) {
  // return cached hash
  if('hash' in bnodes[id]) {
    return bnodes[id].hash;
  }

  // serialize all of bnode's statements
  var statements = bnodes[id].statements;
  var nquads = [];
  for(var i in statements) {
    nquads.push(_toNQuad(statements[i], id));
  }
  // sort serialized quads
  nquads.sort();
  // return hashed quads
  var hash = bnodes[id].hash = sha1.hash(nquads);
  return hash;
}

/**
 * Produces a hash for the paths of adjacent bnodes for a bnode,
 * incorporating all information about its subgraph of bnodes. This
 * method will recursively pick adjacent bnode permutations that produce the
 * lexicographically-least 'path' serializations.
 *
 * @param id the ID of the bnode to hash paths for.
 * @param bnodes the map of bnode statements.
 * @param namer the canonical bnode namer.
 * @param pathNamer the namer used to assign names to adjacent bnodes.
 * @param callback(err, result) called once the operation completes.
 */
function _hashPaths(id, bnodes, namer, pathNamer, callback) {
  // create SHA-1 digest
  var md = sha1.create();

  // group adjacent bnodes by hash, keep properties and references separate
  var groups = {};
  var groupHashes;
  var statements = bnodes[id].statements;
  setTimeout(function() {groupNodes(0);}, 0);
  function groupNodes(i) {
    if(i === statements.length) {
      // done, hash groups
      groupHashes = Object.keys(groups).sort();
      return hashGroup(0);
    }

    // get adjacent bnode
    var statement = statements[i];
    var bnode = _getAdjacentBlankNodeName(statement.subject, id);
    var direction = null;
    if(bnode !== null) {
      direction = 'p';
    }
    else {
      bnode = _getAdjacentBlankNodeName(statement.object, id);
      if(bnode !== null) {
        direction = 'r';
      }
    }

    if(bnode !== null) {
      // get bnode name (try canonical, path, then hash)
      var name;
      if(namer.isNamed(bnode)) {
        name = namer.getName(bnode);
      }
      else if(pathNamer.isNamed(bnode)) {
        name = pathNamer.getName(bnode);
      }
      else {
        name = _hashStatements(bnode, bnodes, namer);
      }

      // hash direction, property, and bnode name/hash
      var md = sha1.create();
      md.update(direction);
      md.update(statement.property.nominalValue);
      md.update(name);
      var groupHash = md.digest();

      // add bnode to hash group
      if(groupHash in groups) {
        groups[groupHash].push(bnode);
      }
      else {
        groups[groupHash] = [bnode];
      }
    }

    setTimeout(function() {groupNodes(i + 1);}, 0);
  }

  // hashes a group of adjacent bnodes
  function hashGroup(i) {
    if(i === groupHashes.length) {
      // done, return SHA-1 digest and path namer
      return callback(null, {hash: md.digest(), pathNamer: pathNamer});
    }

    // digest group hash
    var groupHash = groupHashes[i];
    md.update(groupHash);

    // choose a path and namer from the permutations
    var chosenPath = null;
    var chosenNamer = null;
    var permutator = new Permutator(groups[groupHash]);
    setTimeout(function() {permutate();}, 0);
    function permutate() {
      var permutation = permutator.next();
      var pathNamerCopy = pathNamer.clone();

      // build adjacent path
      var path = '';
      var recurse = [];
      for(var n in permutation) {
        var bnode = permutation[n];

        // use canonical name if available
        if(namer.isNamed(bnode)) {
          path += namer.getName(bnode);
        }
        else {
          // recurse if bnode isn't named in the path yet
          if(!pathNamerCopy.isNamed(bnode)) {
            recurse.push(bnode);
          }
          path += pathNamerCopy.getName(bnode);
        }

        // skip permutation if path is already >= chosen path
        if(chosenPath !== null && path.length >= chosenPath.length &&
          path > chosenPath) {
          return nextPermutation(true);
        }
      }

      // does the next recursion
      nextRecursion(0);
      function nextRecursion(n) {
        if(n === recurse.length) {
          // done, do next permutation
          return nextPermutation(false);
        }

        // do recursion
        var bnode = recurse[n];
        _hashPaths(bnode, bnodes, namer, pathNamerCopy,
          function(err, result) {
            if(err) {
              return callback(err);
            }
            path += pathNamerCopy.getName(bnode) + '<' + result.hash + '>';
            pathNamerCopy = result.pathNamer;

            // skip permutation if path is already >= chosen path
            if(chosenPath !== null && path.length >= chosenPath.length &&
              path > chosenPath) {
              return nextPermutation(true);
            }

            // do next recursion
            nextRecursion(n + 1);
          });
      }

      // stores the results of this permutation and runs the next
      function nextPermutation(skipped) {
        if(!skipped && (chosenPath === null || path < chosenPath)) {
          chosenPath = path;
          chosenNamer = pathNamerCopy;
        }

        // do next permutation
        if(permutator.hasNext()) {
          setTimeout(function() {permutate();}, 0);
        }
        else {
          // digest chosen path and update namer
          md.update(chosenPath);
          pathNamer = chosenNamer;

          // hash the next group
          hashGroup(i + 1);
        }
      }
    }
  }
}

/**
 * A helper function that gets the blank node name from an RDF statement node
 * (subject or object). If the node is a blank node and its nominal value
 * does not match the given blank node ID, it will be returned.
 *
 * @param node the RDF statement node.
 * @param id the ID of the blank node to look next to.
 *
 * @return the adjacent blank node name or null if none was found.
 */
function _getAdjacentBlankNodeName(node, id) {
  return (node.interfaceName === 'BlankNode' && node.nominalValue !== id ?
    node.nominalValue : null);
}

/**
 * Recursively flattens the subjects in the given JSON-LD expanded input
 * into a node map.
 *
 * @param input the JSON-LD expanded input.
 * @param graphs a map of graph name to subject map.
 * @param graph the name of the current graph.
 * @param namer the blank node namer.
 * @param name the name assigned to the current input if it is a bnode.
 * @param list the list to append to, null for none.
 */
function _createNodeMap(input, graphs, graph, namer, name, list) {
  // recurse through array
  if(_isArray(input)) {
    for(var i in input) {
      _createNodeMap(input[i], graphs, graph, namer, undefined, list);
    }
    return;
  }

  // add non-object to list
  if(!_isObject(input)) {
    if(list) {
      list.push(input);
    }
    return;
  }

  // add entries for @type
  if('@type' in input) {
    var types = input['@type'];
    if(!_isArray(types)) {
      types = [types];
    }
    for(var ti = 0; ti < types.length; ++ti) {
      var type = types[ti];
      var id = (type.indexOf('_:') === 0) ? namer.getName(type) : type;
      if(!(id in graphs[graph])) {
        graphs[graph][id] = {'@id': id};
      }
    }
  }

  // add values to list
  if(_isValue(input)) {
    if(list) {
      list.push(input);
    }
    return;
  }

  // Note: At this point, input must be a subject.

  // get name for subject
  if(_isUndefined(name)) {
    name = _isBlankNode(input) ? namer.getName(input['@id']) : input['@id'];
  }

  // add subject reference to list
  if(list) {
    list.push({'@id': name});
  }

  // create new subject or merge into existing one
  var subjects = graphs[graph];
  var subject = subjects[name] = subjects[name] || {};
  subject['@id'] = name;
  var properties = Object.keys(input).sort();
  for(var pi = 0; pi < properties.length; ++pi) {
    var property = properties[pi];

    // skip @id
    if(property === '@id') {
      continue;
    }

    // recurse into graph
    if(property === '@graph') {
      // add graph subjects map entry
      if(!(name in graphs)) {
        graphs[name] = {};
      }
      var g = (graph === '@merged') ? graph : name;
      _createNodeMap(input[property], graphs, g, namer);
      continue;
    }

    // copy non-@type keywords
    if(property !== '@type' && _isKeyword(property)) {
      subject[property] = input[property];
      continue;
    }

    // iterate over objects (ensure property is added for empty arrays)
    var objects = input[property];
    if(objects.length === 0) {
      jsonld.addValue(subject, property, [], {propertyIsArray: true});
      continue;
    }
    for(var oi = 0; oi < objects.length; ++oi) {
      var o = objects[oi];

      // handle embedded subject or subject reference
      if(_isSubject(o) || _isSubjectReference(o)) {
        // rename blank node @id
        var id = _isBlankNode(o) ? namer.getName(o['@id']) : o['@id'];

        // add reference and recurse
        jsonld.addValue(
          subject, property, {'@id': id}, {propertyIsArray: true});
        _createNodeMap(o, graphs, graph, namer, id);
      }
      // handle @list
      else if(_isList(o)) {
        var _list = [];
        _createNodeMap(o['@list'], graphs, graph, namer, name, _list);
        o = {'@list': _list};
        jsonld.addValue(subject, property, o, {propertyIsArray: true});
      }
      // handle @value
      else {
        _createNodeMap(o, graphs, graph, namer, name);
        jsonld.addValue(subject, property, o, {propertyIsArray: true});
      }
    }
  }
}

/**
 * Frames subjects according to the given frame.
 *
 * @param state the current framing state.
 * @param subjects the subjects to filter.
 * @param frame the frame.
 * @param parent the parent subject or top-level array.
 * @param property the parent property, initialized to null.
 */
function _frame(state, subjects, frame, parent, property) {
  // validate the frame
  _validateFrame(state, frame);
  frame = frame[0];

  // filter out subjects that match the frame
  var matches = _filterSubjects(state, subjects, frame);

  // get flags for current frame
  var options = state.options;
  var embedOn = _getFrameFlag(frame, options, 'embed');
  var explicitOn = _getFrameFlag(frame, options, 'explicit');

  // add matches to output
  var ids = Object.keys(matches).sort();
  for(var idx in ids) {
    var id = ids[idx];

    /* Note: In order to treat each top-level match as a compartmentalized
    result, create an independent copy of the embedded subjects map when the
    property is null, which only occurs at the top-level. */
    if(property === null) {
      state.embeds = {};
    }

    // start output
    var output = {};
    output['@id'] = id;

    // prepare embed meta info
    var embed = {parent: parent, property: property};

    // if embed is on and there is an existing embed
    if(embedOn && (id in state.embeds)) {
      // only overwrite an existing embed if it has already been added to its
      // parent -- otherwise its parent is somewhere up the tree from this
      // embed and the embed would occur twice once the tree is added
      embedOn = false;

      // existing embed's parent is an array
      var existing = state.embeds[id];
      if(_isArray(existing.parent)) {
        for(var i in existing.parent) {
          if(jsonld.compareValues(output, existing.parent[i])) {
            embedOn = true;
            break;
          }
        }
      }
      // existing embed's parent is an object
      else if(jsonld.hasValue(existing.parent, existing.property, output)) {
        embedOn = true;
      }

      // existing embed has already been added, so allow an overwrite
      if(embedOn) {
        _removeEmbed(state, id);
      }
    }

    // not embedding, add output without any other properties
    if(!embedOn) {
      _addFrameOutput(state, parent, property, output);
    }
    else {
      // add embed meta info
      state.embeds[id] = embed;

      // iterate over subject properties
      var subject = matches[id];
      var props = Object.keys(subject).sort();
      for(var i in props) {
        var prop = props[i];

        // copy keywords to output
        if(_isKeyword(prop)) {
          output[prop] = _clone(subject[prop]);
          continue;
        }

        // if property isn't in the frame
        if(!(prop in frame)) {
          // if explicit is off, embed values
          if(!explicitOn) {
            _embedValues(state, subject, prop, output);
          }
          continue;
        }

        // add objects
        var objects = subject[prop];
        for(var i in objects) {
          var o = objects[i];

          // recurse into list
          if(_isList(o)) {
            // add empty list
            var list = {'@list': []};
            _addFrameOutput(state, output, prop, list);

            // add list objects
            var src = o['@list'];
            for(var n in src) {
              o = src[n];
              // recurse into subject reference
              if(_isSubjectReference(o)) {
                _frame(state, [o['@id']], frame[prop], list, '@list');
              }
              // include other values automatically
              else {
                _addFrameOutput(state, list, '@list', _clone(o));
              }
            }
            continue;
          }

          // recurse into subject reference
          if(_isSubjectReference(o)) {
            _frame(state, [o['@id']], frame[prop], output, prop);
          }
          // include other values automatically
          else {
            _addFrameOutput(state, output, prop, _clone(o));
          }
        }
      }

      // handle defaults
      var props = Object.keys(frame).sort();
      for(var i in props) {
        var prop = props[i];

        // skip keywords
        if(_isKeyword(prop)) {
          continue;
        }

        // if omit default is off, then include default values for properties
        // that appear in the next frame but are not in the matching subject
        var next = frame[prop][0];
        var omitDefaultOn = _getFrameFlag(next, options, 'omitDefault');
        if(!omitDefaultOn && !(prop in output)) {
          var preserve = '@null';
          if('@default' in next) {
            preserve = _clone(next['@default']);
          }
          if(!_isArray(preserve)) {
            preserve = [preserve];
          }
          output[prop] = [{'@preserve': [preserve]}];
        }
      }

      // add output to parent
      _addFrameOutput(state, parent, property, output);
    }
  }
}

/**
 * Gets the frame flag value for the given flag name.
 *
 * @param frame the frame.
 * @param options the framing options.
 * @param name the flag name.
 *
 * @return the flag value.
 */
function _getFrameFlag(frame, options, name) {
  var flag = '@' + name;
  return (flag in frame) ? frame[flag][0] : options[name];
}

/**
 * Validates a JSON-LD frame, throwing an exception if the frame is invalid.
 *
 * @param state the current frame state.
 * @param frame the frame to validate.
 */
function _validateFrame(state, frame) {
  if(!_isArray(frame) || frame.length !== 1 || !_isObject(frame[0])) {
    throw new JsonLdError(
      'Invalid JSON-LD syntax; a JSON-LD frame must be a single object.',
      'jsonld.SyntaxError', {frame: frame});
  }
}

/**
 * Returns a map of all of the subjects that match a parsed frame.
 *
 * @param state the current framing state.
 * @param subjects the set of subjects to filter.
 * @param frame the parsed frame.
 *
 * @return all of the matched subjects.
 */
function _filterSubjects(state, subjects, frame) {
  // filter subjects in @id order
  var rval = {};
  for(var i in subjects) {
    var id = subjects[i];
    var subject = state.subjects[id];
    if(_filterSubject(subject, frame)) {
      rval[id] = subject;
    }
  }
  return rval;
}

/**
 * Returns true if the given subject matches the given frame.
 *
 * @param subject the subject to check.
 * @param frame the frame to check.
 *
 * @return true if the subject matches, false if not.
 */
function _filterSubject(subject, frame) {
  // check @type (object value means 'any' type, fall through to ducktyping)
  if('@type' in frame &&
    !(frame['@type'].length === 1 && _isObject(frame['@type'][0]))) {
    var types = frame['@type'];
    for(var i in types) {
      // any matching @type is a match
      if(jsonld.hasValue(subject, '@type', types[i])) {
        return true;
      }
    }
    return false;
  }

  // check ducktype
  for(var key in frame) {
    // only not a duck if @id or non-keyword isn't in subject
    if((key === '@id' || !_isKeyword(key)) && !(key in subject)) {
      return false;
    }
  }
  return true;
}

/**
 * Embeds values for the given subject and property into the given output
 * during the framing algorithm.
 *
 * @param state the current framing state.
 * @param subject the subject.
 * @param property the property.
 * @param output the output.
 */
function _embedValues(state, subject, property, output) {
  // embed subject properties in output
  var objects = subject[property];
  for(var i in objects) {
    var o = objects[i];

    // recurse into @list
    if(_isList(o)) {
      var list = {'@list': []};
      _addFrameOutput(state, output, property, list);
      return _embedValues(state, o, '@list', list['@list']);
    }

    // handle subject reference
    if(_isSubjectReference(o)) {
      var id = o['@id'];

      // embed full subject if isn't already embedded
      if(!(id in state.embeds)) {
        // add embed
        var embed = {parent: output, property: property};
        state.embeds[id] = embed;

        // recurse into subject
        o = {};
        var s = state.subjects[id];
        for(var prop in s) {
          // copy keywords
          if(_isKeyword(prop)) {
            o[prop] = _clone(s[prop]);
            continue;
          }
          _embedValues(state, s, prop, o);
        }
      }
      _addFrameOutput(state, output, property, o);
    }
    // copy non-subject value
    else {
      _addFrameOutput(state, output, property, _clone(o));
    }
  }
}

/**
 * Removes an existing embed.
 *
 * @param state the current framing state.
 * @param id the @id of the embed to remove.
 */
function _removeEmbed(state, id) {
  // get existing embed
  var embeds = state.embeds;
  var embed = embeds[id];
  var parent = embed.parent;
  var property = embed.property;

  // create reference to replace embed
  var subject = {'@id': id};

  // remove existing embed
  if(_isArray(parent)) {
    // replace subject with reference
    for(var i in parent) {
      if(jsonld.compareValues(parent[i], subject)) {
        parent[i] = subject;
        break;
      }
    }
  }
  else {
    // replace subject with reference
    var useArray = _isArray(parent[property]);
    jsonld.removeValue(parent, property, subject, {propertyIsArray: useArray});
    jsonld.addValue(parent, property, subject, {propertyIsArray: useArray});
  }

  // recursively remove dependent dangling embeds
  var removeDependents = function(id) {
    // get embed keys as a separate array to enable deleting keys in map
    var ids = Object.keys(embeds);
    for(var i in ids) {
      var next = ids[i];
      if(next in embeds && _isObject(embeds[next].parent) &&
        embeds[next].parent['@id'] === id) {
        delete embeds[next];
        removeDependents(next);
      }
    }
  };
  removeDependents(id);
}

/**
 * Adds framing output to the given parent.
 *
 * @param state the current framing state.
 * @param parent the parent to add to.
 * @param property the parent property.
 * @param output the output to add.
 */
function _addFrameOutput(state, parent, property, output) {
  if(_isObject(parent)) {
    jsonld.addValue(parent, property, output, {propertyIsArray: true});
  }
  else {
    parent.push(output);
  }
}

/**
 * Removes the @preserve keywords as the last step of the framing algorithm.
 *
 * @param ctx the active context used to compact the input.
 * @param input the framed, compacted output.
 *
 * @return the resulting output.
 */
function _removePreserve(ctx, input) {
  // recurse through arrays
  if(_isArray(input)) {
    var output = [];
    for(var i in input) {
      var result = _removePreserve(ctx, input[i]);
      // drop nulls from arrays
      if(result !== null) {
        output.push(result);
      }
    }
    input = output;
  }
  else if(_isObject(input)) {
    // remove @preserve
    if('@preserve' in input) {
      if(input['@preserve'] === '@null') {
        return null;
      }
      return input['@preserve'];
    }

    // skip @values
    if(_isValue(input)) {
      return input;
    }

    // recurse through @lists
    if(_isList(input)) {
      input['@list'] = _removePreserve(ctx, input['@list']);
      return input;
    }

    // recurse through properties
    for(var prop in input) {
      var result = _removePreserve(ctx, input[prop]);
      var container = jsonld.getContextValue(ctx, prop, '@container');
      if(_isArray(result) && result.length === 1 && container === null) {
        result = result[0];
      }
      input[prop] = result;
    }
  }
  return input;
}

/**
 * Compares two strings first based on length and then lexicographically.
 *
 * @param a the first string.
 * @param b the second string.
 *
 * @return -1 if a < b, 1 if a > b, 0 if a == b.
 */
function _compareShortestLeast(a, b) {
  if(a.length < b.length) {
    return -1;
  }
  else if(b.length < a.length) {
    return 1;
  }
  else if(a === b) {
    return 0;
  }
  return (a < b) ? -1 : 1;
}

/**
 * Picks the preferred compaction term from the given inverse context entry.
 *
 * @param activeCtx the active context.
 * @param iri the IRI to pick the term for.
 * @param value the value to pick the term for.
 * @param parent the parent of the value (required for property generators).
 * @param containers the preferred containers.
 * @param typeOrLanguage either '@type' or '@language'.
 * @param typeOrLanguageValue the preferred value for '@type' or '@language'.
 *
 * @return the preferred term.
 */
function _selectTerm(
  activeCtx, iri, value, parent, containers,
  typeOrLanguage, typeOrLanguageValue) {
  containers.push('@none');
  if(typeOrLanguageValue === null) {
    typeOrLanguageValue = '@null';
  }
  // options for the value of @type or @language
  var options = [typeOrLanguageValue, '@none'];
  var term = null;
  var containerMap = activeCtx.inverse[iri];
  for(var ci = 0; term === null && ci < containers.length; ++ci) {
    // if container not available in the map, continue
    var container = containers[ci];
    if(!(container in containerMap)) {
      continue;
    }

    var typeOrLanguageValueMap = containerMap[container][typeOrLanguage];
    for(var oi = 0; term === null && oi < options.length; ++oi) {
      // if type/language option not available in the map, continue
      var option = options[oi];
      if(!(option in typeOrLanguageValueMap)) {
        continue;
      }

      var termInfo = typeOrLanguageValueMap[option];

      // see if a property generator matches
      if(_isObject(parent)) {
        for(var pi = 0; pi < termInfo.propertyGenerators.length; ++pi) {
          var propertyGenerator = termInfo.propertyGenerators[pi];
          var iris = activeCtx.mappings[propertyGenerator]['@id'];
          var match = true;
          for(var ii = 0; ii < iris.length; ++ii) {
            if(!(iris[ii] in parent)) {
              match = false;
              break;
            }
          }
          if(match) {
            term = propertyGenerator;
            break;
          }
        }
      }

      // no matching property generator, use a simple term instead
      if(term === null) {
        term = termInfo.term;
      }
    }
  }
  return term;
}

/**
 * Compacts an IRI or keyword into a term or prefix if it can be. If the
 * IRI has an associated value it may be passed.
 *
 * @param activeCtx the active context to use.
 * @param iri the IRI to compact.
 * @param value the value to check or null.
 * @param relativeTo options for how to compact IRIs:
 *          base: true to compact against the base IRI, false not to.
 *          vocab: true to split after @vocab, false not to.
 * @param parent the parent element for the value.
 *
 * @return the compacted term, prefix, keyword alias, or the original IRI.
 */
function _compactIri(activeCtx, iri, value, relativeTo, parent) {
  // can't compact null
  if(iri === null) {
    return iri;
  }

  // term is a keyword
  if(_isKeyword(iri)) {
    // return alias if available
    var aliases = activeCtx.keywords[iri];
    return (aliases.length > 0) ? aliases[0] : iri;
  }

  // default value and parent to null
  if(_isUndefined(value)) {
    value = null;
  }
  if(_isUndefined(parent)) {
    parent = null;
  }
  relativeTo = relativeTo || {};

  // use inverse context to pick a term
  var inverseCtx = activeCtx.getInverse();
  var defaultLanguage = activeCtx['@language'] || '@none';

  if(iri in inverseCtx) {
    // prefer @index if available in value
    var containers = [];
    if(_isObject(value) && '@index' in value) {
      containers.push('@index');
    }

    // defaults for term selection based on type/language
    var typeOrLanguage = '@language';
    var typeOrLanguageValue = '@null';

    // choose the most specific term that works for all elements in @list
    if(_isList(value)) {
      // only select @list containers if @index is NOT in value
      if(!('@index' in value)) {
        containers.push('@list');
      }
      var list = value['@list'];
      var commonLanguage = (list.length === 0) ? defaultLanguage : null;
      var commonType = null;
      for(var i = 0; i < list.length; ++i) {
        var item = list[i];
        var itemLanguage = '@none';
        var itemType = '@none';
        if(_isValue(item)) {
          if('@language' in item) {
            itemLanguage = item['@language'];
          }
          else if('@type' in item) {
            itemType = item['@type'];
          }
          // plain literal
          else {
            itemLanguage = '@null';
          }
        }
        if(commonLanguage === null) {
          commonLanguage = itemLanguage;
        }
        else if(itemLanguage !== commonLanguage && _isValue(item)) {
          commonLanguage = '@none';
        }
        if(commonType === null) {
          commonType = itemType;
        }
        else if(itemType !== commonType) {
          commonType = '@none';
        }
        // there are different languages and types in the list, so choose
        // the most generic term, no need to keep iterating the list
        if(commonLanguage === '@none' && commonType === '@none') {
          break;
        }
      }
      commonLanguage = commonLanguage || '@none';
      commonType = commonType || '@none';
      if(commonType !== '@none') {
        typeOrLanguage = '@type';
        typeOrLanguageValue = commonType;
      }
      else {
        typeOrLanguageValue = commonLanguage;
      }
    }
    else {
      if(_isValue(value)) {
        if('@language' in value) {
          containers.push('@language');
          typeOrLanguageValue = value['@language'];
        }
        else if('@type' in value) {
          typeOrLanguage = '@type';
          typeOrLanguageValue = value['@type'];
        }
      }
      else {
        typeOrLanguage = '@type';
        typeOrLanguageValue = '@id';
      }
      containers.push('@set');
    }

    // do term selection
    var term = _selectTerm(
      activeCtx, iri, value, parent,
      containers, typeOrLanguage, typeOrLanguageValue);
    if(term !== null) {
      return term;
    }
  }

  // no term match, check for possible CURIEs
  var choice = null;
  for(var term in activeCtx.mappings) {
    // skip terms with colons, they can't be prefixes
    if(term.indexOf(':') !== -1) {
      continue;
    }
    // skip entries with @ids that are not partial matches
    var definition = activeCtx.mappings[term];
    if(!definition || definition.propertyGenerator ||
      definition['@id'] === iri || iri.indexOf(definition['@id']) !== 0) {
      continue;
    }

    // a CURIE is usable if:
    // 1. it has no mapping, OR
    // 2. value is null, which means we're not compacting an @value, AND
    //   the mapping matches the IRI)
    var curie = term + ':' + iri.substr(definition['@id'].length);
    var isUsableCurie = (!(curie in activeCtx.mappings) ||
      (value === null && activeCtx.mappings[curie] &&
      activeCtx.mappings[curie]['@id'] === iri));

    // select curie if it is shorter or the same length but lexicographically
    // less than the current choice
    if(isUsableCurie && (choice === null ||
      _compareShortestLeast(curie, choice) < 0)) {
      choice = curie;
    }
  }

  // return chosen curie
  if(choice !== null) {
    return choice;
  }

  // no matching terms or curies, use @vocab if available
  if(relativeTo.vocab && '@vocab' in activeCtx) {
    // determine if vocab is a prefix of the iri
    var vocab = activeCtx['@vocab'];
    if(iri.indexOf(vocab) === 0 && iri !== vocab) {
      // use suffix as relative iri if it is not a term in the active context
      var suffix = iri.substr(vocab.length);
      if(!(suffix in activeCtx.mappings)) {
        return suffix;
      }
    }
  }

  // no compaction choices, return IRI as is
  return iri;
}

/**
 * Performs value compaction on an object with '@value' or '@id' as the only
 * property.
 *
 * @param activeCtx the active context.
 * @param activeProperty the active property that points to the value.
 * @param value the value to compact.
 *
 * @return the compaction result.
 */
function _compactValue(activeCtx, activeProperty, value) {
  // value is a @value
  if(_isValue(value)) {
    // get context rules
    var type = jsonld.getContextValue(activeCtx, activeProperty, '@type');
    var language = jsonld.getContextValue(
      activeCtx, activeProperty, '@language');
    var container = jsonld.getContextValue(
      activeCtx, activeProperty, '@container');

    // whether or not the value has an @index that must be preserved
    var preserveIndex = (('@index' in value) &&
      container !== '@index');

    // if there's no @index to preserve ...
    if(!preserveIndex) {
      // matching @type or @language specified in context, compact value
      if(value['@type'] === type || value['@language'] === language) {
        return value['@value'];
      }
    }

    // return just the value of @value if all are true:
    // 1. @value is the only key or @index isn't being preserved
    // 2. there is no default language or @value is not a string or
    //   the key has a mapping with a null @language
    var keyCount = Object.keys(value).length;
    var isValueOnlyKey = (keyCount === 1 ||
      (keyCount === 2 && ('@index' in value) && !preserveIndex));
    var hasDefaultLanguage = ('@language' in activeCtx);
    var isValueString = _isString(value['@value']);
    var hasNullMapping = (activeCtx.mappings[activeProperty] &&
      activeCtx.mappings[activeProperty]['@language'] === null);
    if(isValueOnlyKey &&
      (!hasDefaultLanguage || !isValueString || hasNullMapping)) {
      return value['@value'];
    }

    var rval = {};

    // preserve @index
    if(preserveIndex) {
      rval[_compactIri(activeCtx, '@index')] = value['@index'];
    }

    // compact @type IRI
    if('@type' in value) {
      rval[_compactIri(activeCtx, '@type')] = _compactIri(
        activeCtx, value['@type'], null, {base: true, vocab: true});
    }
    // alias @language
    else if('@language' in value) {
      rval[_compactIri(activeCtx, '@language')] = value['@language'];
    }

    // alias @value
    rval[_compactIri(activeCtx, '@value')] = value['@value'];

    return rval;
  }

  // value is a subject reference
  var expandedProperty = _expandIri(activeCtx, activeProperty);
  var type = jsonld.getContextValue(activeCtx, activeProperty, '@type');
  var term = _compactIri(activeCtx, value['@id'], null, {base: true});

  // compact to scalar
  if(type === '@id' || expandedProperty === '@graph') {
    return term;
  }

  var rval = {};
  rval[_compactIri(activeCtx, '@id')] = term;
  return rval;
}

/**
 * Finds and removes any duplicate values that were presumably generated by
 * a property generator in the given element.
 *
 * @param activeCtx the active context.
 * @param element the element to remove duplicates from.
 * @param expandedProperty the property to map to a property generator.
 * @param value the value to compare against when duplicate checking.
 * @param activeProperty the property generator term.
 */
function _findAndRemovePropertyGeneratorDuplicates(
  activeCtx, element, expandedProperty, value, activeProperty) {
  // get property generator IRIs
  var iris = activeCtx.mappings[activeProperty]['@id'];

  // for each IRI that isn't 'expandedProperty', remove a single duplicate
  // from element, if found
  for(var i = 0; i < iris.length; ++i) {
    var iri = iris[i];
    if(iri === expandedProperty) {
      continue;
    }
    var prospects = element[iri];
    for(var pi = 0; pi < prospects.length; ++pi) {
      var prospect = prospects[pi];
      if(jsonld.compareValues(prospect, value)) {
        // duplicate found, remove it in place
        prospects.splice(pi, 1);
        if(prospects.length === 0) {
          delete element[iri];
        }
        break;
      }
    }
  }
}

/**
 * Creates a term definition during context processing.
 *
 * @param activeCtx the current active context.
 * @param localCtx the local context being processed.
 * @param term the term in the local context to define the mapping for.
 * @param defined a map of defining/defined keys to detect cycles and prevent
 *          double definitions.
 */
function _createTermDefinition(activeCtx, localCtx, term, defined) {
  if(term in defined) {
    // term already defined
    if(defined[term]) {
      return;
    }
    // cycle detected
    throw new JsonLdError(
      'Cyclical context definition detected.',
      'jsonld.CyclicalContext', {context: localCtx, term: term});
  }

  // now defining term
  defined[term] = false;

  // if term has a prefix, define it first
  var colon = term.indexOf(':');
  var prefix = null;
  if(colon !== -1) {
    prefix = term.substr(0, colon);
    if(prefix in localCtx) {
      // define parent prefix
      _createTermDefinition(activeCtx, localCtx, prefix, defined);
    }
  }

  if(_isKeyword(term)) {
    throw new JsonLdError(
      'Invalid JSON-LD syntax; keywords cannot be overridden.',
      'jsonld.SyntaxError', {context: localCtx});
  }

  if(activeCtx.mappings[term]) {
    // if term is a keyword alias, remove it
    var kw = activeCtx.mappings[term]['@id'];
    if(_isKeyword(kw)) {
      var aliases = activeCtx.keywords[kw];
      aliases.splice(aliases.indexOf(term), 1);
    }
  }

  // get context term value
  var value = localCtx[term];

  // clear context entry
  if(value === null || (_isObject(value) && value['@id'] === null)) {
    activeCtx.mappings[term] = null;
    defined[term] = true;
    return;
  }

  if(_isString(value)) {
    if(_isKeyword(value)) {
      // disallow aliasing @context and @preserve
      if(value === '@context' || value === '@preserve') {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; @context and @preserve cannot be aliased.',
          'jsonld.SyntaxError');
      }

      // uniquely add term as a keyword alias and resort
      var aliases = activeCtx.keywords[value];
      if(aliases.indexOf(term) === -1) {
        aliases.push(term);
        aliases.sort(_compareShortestLeast);
      }
    }
    else {
      // expand value to a full IRI
      value = _expandIri(activeCtx, value, {base: true}, localCtx, defined);
    }

    // define/redefine term to expanded IRI/keyword
    activeCtx.mappings[term] = {'@id': value};
    defined[term] = true;
    return;
  }

  if(!_isObject(value)) {
    throw new JsonLdError(
      'Invalid JSON-LD syntax; @context property values must be ' +
      'strings or objects.',
      'jsonld.SyntaxError', {context: localCtx});
  }

  // create new mapping
  var mapping = {};
  mapping.propertyGenerator = false;

  // merge onto parent mapping if one exists for a prefix
  if(prefix !== null && activeCtx.mappings[prefix]) {
    // FIXME: check to see if additional clone is necessary here
    mapping = _clone(activeCtx.mappings[prefix]);
  }

  if('@id' in value) {
    var id = value['@id'];
    // handle property generator
    if(_isArray(id)) {
      if(activeCtx.namer === null) {
        throw new JsonLdError(
          'Incompatible JSON-LD options; a property generator was found ' +
          'in the @context, but blank node renaming has been disabled; ' +
          'it must be enabled to use property generators.',
          'jsonld.OptionsError', {context: localCtx});
      }

      var propertyGenerator = [];
      var ids = id;
      for(var i = 0; i < ids.length; ++i) {
        id = ids[i];
        if(!_isString(id)) {
          throw new JsonLdError(
            'Invalid JSON-LD syntax; property generators must consist of an ' +
            '@id array containing only strings.',
            'jsonld.SyntaxError', {context: localCtx});
        }
        // expand @id if it is not @type
        if(id !== '@type') {
          id = _expandIri(activeCtx, id, {base: true}, localCtx, defined);
        }
        propertyGenerator.push(id);
      }
      // add sorted property generator as @id in mapping
      mapping['@id'] = propertyGenerator.sort();
      mapping.propertyGenerator = true;
    }
    else if(!_isString(id)) {
      throw new JsonLdError(
        'Invalid JSON-LD syntax; a @context @id value must be an array ' +
        'of strings or a string.',
        'jsonld.SyntaxError', {context: localCtx});
    }
    else {
      // add @id to mapping, expanding it if it is not @type
      if(id !== '@type') {
        id = _expandIri(activeCtx, id, {base: true}, localCtx, defined);
      }
      mapping['@id'] = id;
    }
  }
  else {
    if(prefix === null) {
      // non-IRIs *must* define @ids if @vocab is not available
      if(!('@vocab' in activeCtx)) {
        throw new JsonLdError(
          'Invalid JSON-LD syntax; @context terms must define an @id.',
          'jsonld.SyntaxError', {context: localCtx, term: term});
      }
      // prepend vocab to term
      mapping['@id'] = activeCtx['@vocab'] + term;
    }
    // set @id based on prefix parent
    else if(prefix in activeCtx.mappings) {
      var suffix = term.substr(colon + 1);
      mapping['@id'] = activeCtx.mappings[prefix]['@id'] + suffix;
    }
    // term is an absolute IRI
    else {
      mapping['@id'] = term;
    }
  }

  if('@type' in value) {
    var type = value['@type'];
    if(!_isString(type)) {
      throw new JsonLdError(
        'Invalid JSON-LD syntax; @context @type values must be strings.',
        'jsonld.SyntaxError', {context: localCtx});
    }

    if(type !== '@id') {
      // expand @type to full IRI
      type = _expandIri(
        activeCtx, type, {vocab: true, base: true}, localCtx, defined);
    }

    // add @type to mapping
    mapping['@type'] = type;
  }

  if('@container' in value) {
    var container = value['@container'];
    if(container !== '@list' && container !== '@set' &&
      container !== '@index' && container !== '@language') {
      throw new JsonLdError(
        'Invalid JSON-LD syntax; @context @container value must be ' +
        'one of the following: @list, @set, @index, or @language.',
        'jsonld.SyntaxError', {context: localCtx});
    }

    // add @container to mapping
    mapping['@container'] = container;
  }

  if('@language' in value && !('@type' in value)) {
    var language = value['@language'];
    if(language !== null && !_isString(language)) {
      throw new JsonLdError(
        'Invalid JSON-LD syntax; @context @language value must be ' +
        'a string or null.',
        'jsonld.SyntaxError', {context: localCtx});
    }

    // add @language to mapping
    if(language !== null) {
      language = language.toLowerCase();
    }
    mapping['@language'] = language;
  }

  // define term mapping
  activeCtx.mappings[term] = mapping;
  defined[term] = true;
}

/**
 * Expands a string to a full IRI. The string may be a term, a prefix, a
 * relative IRI, or an absolute IRI. The associated absolute IRI will be
 * returned.
 *
 * @param activeCtx the current active context.
 * @param value the string to expand.
 * @param relativeTo options for how to resolve relative IRIs:
 *          base: true to resolve against the base IRI, false not to.
 *          vocab: true to concatenate after @vocab, false not to.
 * @param localCtx the local context being processed (only given if called
 *          during context processing).
 * @param defined a map for tracking cycles in context definitions (only given
 *          if called during context processing).
 *
 * @return the expanded value.
 */
function _expandIri(activeCtx, value, relativeTo, localCtx, defined) {
  // nothing to expand
  if(value === null) {
    return null;
  }

  // define term dependency if not defined
  if(localCtx && value in localCtx && defined[value] !== true) {
    _createTermDefinition(activeCtx, localCtx, value, defined);
  }

  var mapping = activeCtx.mappings[value];

  // value is explicitly ignored with a null mapping
  if(mapping === null) {
    return null;
  }

  // term dependency cannot be a property generator
  if(localCtx && mapping && mapping.propertyGenerator) {
    throw new JsonLdError(
      'Invalid JSON-LD syntax; a term definition cannot have a property ' +
      'generator as a dependency.',
      'jsonld.SyntaxError', {context: localCtx, value: value});
  }

  var isAbsolute = false;
  var rval = value;

  // value is a term
  if(mapping && !mapping.propertyGenerator) {
    isAbsolute = true;
    rval = mapping['@id'];
  }

  // keywords need no expanding (aliasing already handled by now)
  if(_isKeyword(rval)) {
    return rval;
  }

  if(!isAbsolute) {
    // split value into prefix:suffix
    var colon = rval.indexOf(':');
    if(colon !== -1) {
      isAbsolute = true;
      var prefix = rval.substr(0, colon);
      var suffix = rval.substr(colon + 1);

      // do not expand blank nodes (prefix of '_') or already-absolute
      // IRIs (suffix of '//')
      if(prefix !== '_' && suffix.indexOf('//') !== 0) {
        // prefix dependency not defined, define it
        if(localCtx && prefix in localCtx && defined[prefix] !== true) {
          _createTermDefinition(activeCtx, localCtx, prefix, defined);
        }

        // use mapping if prefix is defined and not a property generator
        mapping = activeCtx.mappings[prefix];
        if(mapping && !mapping.propertyGenerator) {
          rval = activeCtx.mappings[prefix]['@id'] + suffix;
        }
      }
    }
  }

  relativeTo = relativeTo || {};
  if(isAbsolute) {
    // rename blank node if requested
    if(!localCtx && rval.indexOf('_:') === 0 && activeCtx.namer) {
      rval = activeCtx.namer.getName(rval);
    }
  }
  // prepend vocab
  else if(relativeTo.vocab && '@vocab' in activeCtx) {
    rval = activeCtx['@vocab'] + rval;
  }
  // prepend base
  else if(relativeTo.base) {
    rval = _prependBase(activeCtx['@base'], rval);
  }

  if(localCtx) {
    // value must now be an absolute IRI
    if(!_isAbsoluteIri(rval)) {
      throw new JsonLdError(
        'Invalid JSON-LD syntax; a @context value does not expand to ' +
        'an absolute IRI.',
        'jsonld.SyntaxError', {context: localCtx, value: value});
    }
  }

  return rval;
}

/**
 * Prepends a base IRI to the given relative IRI.
 *
 * @param base the base IRI.
 * @param iri the relative IRI.
 *
 * @return the absolute IRI.
 */
function _prependBase(base, iri) {
  // already an absolute IRI
  if(iri.indexOf(':') !== -1) {
    return iri;
  }

  if(_isString(base)) {
    base = jsonld.url.parse(base || '');
    base.pathname = base.pathname || '';
  }
  var authority = (base.host || '');
  var rel = jsonld.url.parse(iri);
  rel.pathname = (rel.pathname || '');

  // per RFC3986 normalize slashes and dots in path
  var path;

  // IRI contains authority
  if(rel.href.indexOf('//') === 0) {
    path = rel.href.substr(2);
    authority = path.substr(0, path.lastIndexOf('/'));
    path = path.substr(authority.length);
  }
  // IRI represents an absolute path
  else if(rel.pathname.indexOf('/') === 0) {
    path = rel.pathname;
  }
  else {
    path = base.pathname;

    // prepend last directory for base
    if(rel.pathname !== '') {
      path = path.substr(0, path.lastIndexOf('/') + 1) + rel.pathname;
    }
  }

  var segments = path.split('/');

  // remove '.' and '' (do not remove trailing empty path)
  segments = segments.filter(function(e, i) {
    return e !== '.' && (e !== '' || i === segments.length - 1);
  });

  // remove as many '..' as possible
  for(var i = 0; i < segments.length;) {
    var segment = segments[i];
    if(segment === '..') {
      // too many reverse dots
      if(i === 0) {
        var last = segments[segments.length - 1];
        if(last !== '..') {
          segments = [last];
        }
        else {
          segments = [];
        }
        break;
      }

      // remove '..' and previous segment
      segments.splice(i - 1, 2);
      i -= 1;
    }
    else {
      i += 1;
    }
  }

  path = '/' + segments.join('/');

  // add query and hash
  if(rel.query) {
    path += '?' + rel.query;
  }
  if(rel.hash) {
    path += rel.hash;
  }

  return (base.protocol || '') + '//' + authority + path;
}

/**
 * Gets the initial context.
 *
 * @param options the options to use.
 *          base the document base IRI.
 *
 * @return the initial context.
 */
function _getInitialContext(options) {
  var namer = null;
  if(options.renameBlankNodes) {
    namer = new UniqueNamer('_:t');
  }
  var base = jsonld.url.parse(options.base || '');
  base.pathname = base.pathname || '';
  return {
    '@base': base,
    mappings: {},
    keywords: {
      '@context': [],
      '@container': [],
      '@default': [],
      '@embed': [],
      '@explicit': [],
      '@graph': [],
      '@id': [],
      '@index': [],
      '@language': [],
      '@list': [],
      '@omitDefault': [],
      '@preserve': [],
      '@set': [],
      '@type': [],
      '@value': [],
      '@vocab': []
    },
    namer: namer,
    inverse: null,
    getInverse: _createInverseContext,
    clone: _cloneActiveContext,
    share: _shareActiveContext
  };

  /**
   * Generates an inverse context for use in the compaction algorithm, if
   * not already generated for the given active context.
   *
   * @return the inverse context.
   */
  function _createInverseContext() {
    var activeCtx = this;

    // lazily create inverse
    if(activeCtx.inverse) {
      return activeCtx.inverse;
    }
    var inverse = activeCtx.inverse = {};

    // handle default language
    var defaultLanguage = activeCtx['@language'] || '@none';

    // create term selections for each mapping in the context, ordered by
    // shortest and then lexicographically least
    var mappings = activeCtx.mappings;
    var terms = Object.keys(mappings).sort(_compareShortestLeast);
    for(var i = 0; i < terms.length; ++i) {
      var term = terms[i];
      var mapping = mappings[term];
      if(mapping === null) {
        continue;
      }

      // iterate over every IRI in the mapping
      var ids = mapping['@id'];
      if(!_isArray(ids)) {
        ids = [ids];
      }
      for(var ii = 0; ii < ids.length; ++ii) {
        var iri = ids[ii];
        var entry = inverse[iri];

        // initialize entry
        if(!entry) {
          inverse[iri] = entry = {};
        }

        // add term selection where it applies
        var container = mapping['@container'] || '@none';

        // add new entry
        if(!entry[container]) {
          entry[container] = {
            '@language': {},
            '@type': {}
          };
          entry[container]['@language'][defaultLanguage] = {
            term: null, propertyGenerators: []
          };
        }
        entry = entry[container];

        // consider updating @language entry if @type is not specified
        if(!('@type' in mapping)) {
          // if a @language is specified, update its specific entry
          if('@language' in mapping) {
            var language = mapping['@language'] || '@null';
            _addPreferredTerm(mapping, term, entry['@language'], language);
          }
          // add an entry for the default language and for no @language
          else {
            _addPreferredTerm(
              mapping, term, entry['@language'], defaultLanguage);
            _addPreferredTerm(mapping, term, entry['@language'], '@none');
          }
        }

        // consider updating @type entry if @language is not specified
        if(!('@language' in mapping)) {
          var type = mapping['@type'] || '@none';
          _addPreferredTerm(mapping, term, entry['@type'], type);
        }
      }
    }

    return inverse;
  }

  /**
   * Adds or updates the term or property generator for the given entry.
   *
   * @param mapping the term mapping.
   * @param term the term to add.
   * @param entry the inverse context typeOrLanguage entry to add to.
   * @param typeOrLanguageValue the key in the entry to add to.
   */
  function _addPreferredTerm(mapping, term, entry, typeOrLanguageValue) {
    if(!(typeOrLanguageValue in entry)) {
      entry[typeOrLanguageValue] = {term: null, propertyGenerators: []};
    }

    var e = entry[typeOrLanguageValue];
    if(mapping.propertyGenerator) {
      e.propertyGenerators.push(term);
    }
    else if(e.term === null) {
      e.term = term;
    }
  }

  /**
   * Clones an active context, creating a child active context.
   *
   * @return a clone (child) of the active context.
   */
  function _cloneActiveContext() {
    var child = {};
    child['@base'] = this['@base'];
    child.keywords = _clone(this.keywords);
    child.mappings = _clone(this.mappings);
    child.namer = this.namer;
    child.clone = this.clone;
    child.share = this.share;
    child.inverse = null;
    child.getInverse = this.getInverse;
    return child;
  }

  /**
   * Returns a copy of this active context that can be shared between
   * different processing algorithms. This method only copies the parts
   * of the active context that can't be shared.
   *
   * @return a shareable copy of this active context.
   */
  function _shareActiveContext() {
    var rval = {};
    rval['@base'] = this['@base'];
    rval.keywords = this.keywords;
    rval.mappings = this.mappings;
    rval.namer = null;
    if(this.namer) {
      rval.namer = this.namer.clone();
    }
    rval.clone = this.clone;
    rval.share = this.share;
    rval.inverse = this.inverse;
    rval.getInverse = this.getInverse;
    return rval;
  }
}

/**
 * Returns whether or not the given value is a keyword.
 *
 * @param v the value to check.
 *
 * @return true if the value is a keyword, false if not.
 */
function _isKeyword(v) {
  if(!_isString(v)) {
    return false;
  }
  switch(v) {
  case '@context':
  case '@container':
  case '@default':
  case '@embed':
  case '@explicit':
  case '@graph':
  case '@id':
  case '@index':
  case '@language':
  case '@list':
  case '@omitDefault':
  case '@preserve':
  case '@set':
  case '@type':
  case '@value':
  case '@vocab':
    return true;
  }
  return false;
}

/**
 * Returns true if the given value is an Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Object, false if not.
 */
function _isObject(v) {
  return (Object.prototype.toString.call(v) === '[object Object]');
}

/**
 * Returns true if the given value is an empty Object.
 *
 * @param v the value to check.
 *
 * @return true if the value is an empty Object, false if not.
 */
function _isEmptyObject(v) {
  return _isObject(v) && Object.keys(v).length === 0;
}

/**
 * Returns true if the given value is an Array.
 *
 * @param v the value to check.
 *
 * @return true if the value is an Array, false if not.
 */
function _isArray(v) {
  return Array.isArray(v);
}

/**
 * Throws an exception if the given value is not a valid @type value.
 *
 * @param v the value to check.
 */
function _validateTypeValue(v) {
  // can be a string or an empty object
  if(_isString(v) || _isEmptyObject(v)) {
    return;
  }

  // must be an array
  var isValid = false;
  if(_isArray(v)) {
    // must contain only strings
    isValid = true;
    for(var i in v) {
      if(!(_isString(v[i]))) {
        isValid = false;
        break;
      }
    }
  }

  if(!isValid) {
    throw new JsonLdError(
      'Invalid JSON-LD syntax; "@type" value must a string, an array of ' +
      'strings, or an empty object.', 'jsonld.SyntaxError', {value: v});
  }
}

/**
 * Returns true if the given value is a String.
 *
 * @param v the value to check.
 *
 * @return true if the value is a String, false if not.
 */
function _isString(v) {
  return (typeof v === 'string' ||
    Object.prototype.toString.call(v) === '[object String]');
}

/**
 * Returns true if the given value is a Number.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Number, false if not.
 */
function _isNumber(v) {
  return (typeof v === 'number' ||
    Object.prototype.toString.call(v) === '[object Number]');
}

/**
 * Returns true if the given value is a double.
 *
 * @param v the value to check.
 *
 * @return true if the value is a double, false if not.
 */
function _isDouble(v) {
  return _isNumber(v) && String(v).indexOf('.') !== -1;
}

/**
 * Returns true if the given value is numeric.
 *
 * @param v the value to check.
 *
 * @return true if the value is numeric, false if not.
 */
function _isNumeric(v) {
  return !isNaN(parseFloat(v)) && isFinite(v);
}

/**
 * Returns true if the given value is a Boolean.
 *
 * @param v the value to check.
 *
 * @return true if the value is a Boolean, false if not.
 */
function _isBoolean(v) {
  return (typeof v === 'boolean' ||
    Object.prototype.toString.call(v) === '[object Boolean]');
}

/**
 * Returns true if the given value is undefined.
 *
 * @param v the value to check.
 *
 * @return true if the value is undefined, false if not.
 */
function _isUndefined(v) {
  return (typeof v === 'undefined');
}

/**
 * Returns true if the given value is a subject with properties.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject with properties, false if not.
 */
function _isSubject(v) {
  // Note: A value is a subject if all of these hold true:
  // 1. It is an Object.
  // 2. It is not a @value, @set, or @list.
  // 3. It has more than 1 key OR any existing key is not @id.
  var rval = false;
  if(_isObject(v) &&
    !(('@value' in v) || ('@set' in v) || ('@list' in v))) {
    var keyCount = Object.keys(v).length;
    rval = (keyCount > 1 || !('@id' in v));
  }
  return rval;
}

/**
 * Returns true if the given value is a subject reference.
 *
 * @param v the value to check.
 *
 * @return true if the value is a subject reference, false if not.
 */
function _isSubjectReference(v) {
  // Note: A value is a subject reference if all of these hold true:
  // 1. It is an Object.
  // 2. It has a single key: @id.
  return (_isObject(v) && Object.keys(v).length === 1 && ('@id' in v));
}

/**
 * Returns true if the given value is a @value.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @value, false if not.
 */
function _isValue(v) {
  // Note: A value is a @value if all of these hold true:
  // 1. It is an Object.
  // 2. It has the @value property.
  return _isObject(v) && ('@value' in v);
}

/**
 * Returns true if the given value is a @list.
 *
 * @param v the value to check.
 *
 * @return true if the value is a @list, false if not.
 */
function _isList(v) {
  // Note: A value is a @list if all of these hold true:
  // 1. It is an Object.
  // 2. It has the @list property.
  return _isObject(v) && ('@list' in v);
}

/**
 * Returns true if the given value is a blank node.
 *
 * @param v the value to check.
 *
 * @return true if the value is a blank node, false if not.
 */
function _isBlankNode(v) {
  // Note: A value is a blank node if all of these hold true:
  // 1. It is an Object.
  // 2. If it has an @id key its value begins with '_:'.
  // 3. It has no keys OR is not a @value, @set, or @list.
  var rval = false;
  if(_isObject(v)) {
    if('@id' in v) {
      rval = (v['@id'].indexOf('_:') === 0);
    }
    else {
      rval = (Object.keys(v).length === 0 ||
        !(('@value' in v) || ('@set' in v) || ('@list' in v)));
    }
  }
  return rval;
}

/**
 * Returns true if the given value is an absolute IRI, false if not.
 *
 * @param v the value to check.
 *
 * @return true if the value is an absolute IRI, false if not.
 */
function _isAbsoluteIri(v) {
  return _isString(v) && v.indexOf(':') !== -1;
}

/**
 * Clones an object, array, or string/number.
 *
 * @param value the value to clone.
 *
 * @return the cloned value.
 */
function _clone(value) {
  if(value && typeof value === 'object') {
    var rval = _isArray(value) ? [] : {};
    for(var i in value) {
      rval[i] = _clone(value[i]);
    }
    return rval;
  }
  return value;
}

/**
 * Finds all @context URLs in the given JSON-LD input.
 *
 * @param input the JSON-LD input.
 * @param urls a map of URLs (url => false/@contexts).
 * @param replace true to replace the URLs in the given input with the
 *           @contexts from the urls map, false not to.
 * @param base the base IRI to use to resolve relative IRIs.
 *
 * @return true if new URLs to resolve were found, false if not.
 */
function _findContextUrls(input, urls, replace, base) {
  var count = Object.keys(urls).length;
  if(_isArray(input)) {
    for(var i in input) {
      _findContextUrls(input[i], urls, replace, base);
    }
    return (count < Object.keys(urls).length);
  }
  else if(_isObject(input)) {
    for(var key in input) {
      if(key !== '@context') {
        _findContextUrls(input[key], urls, replace, base);
        continue;
      }

      // get @context
      var ctx = input[key];

      // array @context
      if(_isArray(ctx)) {
        var length = ctx.length;
        for(var i = 0; i < length; ++i) {
          var _ctx = ctx[i];
          if(_isString(_ctx)) {
            _ctx = _prependBase(base, _ctx);
            // replace w/@context if requested
            if(replace) {
              _ctx = urls[_ctx];
              if(_isArray(_ctx)) {
                // add flattened context
                Array.prototype.splice.apply(ctx, [i, 1].concat(_ctx));
                i += _ctx.length;
                length += _ctx.length;
              }
              else {
                ctx[i] = _ctx;
              }
            }
            // @context URL found
            else if(!(_ctx in urls)) {
              urls[_ctx] = false;
            }
          }
        }
      }
      // string @context
      else if(_isString(ctx)) {
        ctx = _prependBase(base, ctx);
        // replace w/@context if requested
        if(replace) {
          input[key] = urls[ctx];
        }
        // @context URL found
        else if(!(ctx in urls)) {
          urls[ctx] = false;
        }
      }
    }
    return (count < Object.keys(urls).length);
  }
  return false;
}

/**
 * Resolves external @context URLs using the given URL resolver. Each
 * instance of @context in the input that refers to a URL will be replaced
 * with the JSON @context found at that URL.
 *
 * @param input the JSON-LD input with possible contexts.
 * @param options the options to use:
 *          resolver(url, callback(err, jsonCtx)) the URL resolver to use.
 * @param callback(err, input) called once the operation completes.
 */
function _resolveContextUrls(input, options, callback) {
  // if any error occurs during URL resolution, quit
  var error = null;
  var regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  // recursive resolver
  var resolver = options.resolver;
  var resolve = function(input, cycles, resolver, base, callback) {
    if(Object.keys(cycles).length > MAX_CONTEXT_URLS) {
      error = new JsonLdError(
        'Maximum number of @context URLs exceeded.',
        'jsonld.ContextUrlError', {max: MAX_CONTEXT_URLS});
      return callback(error);
    }

    // for tracking the URLs to resolve
    var urls = {};

    // finished will be called once the URL queue is empty
    var finished = function() {
      // replace all URLs in the input
      _findContextUrls(input, urls, true, base);
      callback(null, input);
    };

    // find all URLs in the given input
    if(!_findContextUrls(input, urls, false, base)) {
      // no new URLs in input
      finished();
    }

    // queue all unresolved URLs
    var queue = [];
    for(var url in urls) {
      if(urls[url] === false) {
        // validate URL
        if(!regex.test(url)) {
          error = new JsonLdError(
            'Malformed URL.', 'jsonld.InvalidUrl', {url: url});
          return callback(error);
        }
        queue.push(url);
      }
    }

    // resolve URLs in queue
    var count = queue.length;
    for(var i in queue) {
      (function(url) {
        // check for context URL cycle
        if(url in cycles) {
          error = new JsonLdError(
            'Cyclical @context URLs detected.',
            'jsonld.ContextUrlError', {url: url});
          return callback(error);
        }
        var _cycles = _clone(cycles);
        _cycles[url] = true;

        resolver(url, function(err, ctx) {
          // short-circuit if there was an error with another URL
          if(error) {
            return;
          }

          // parse string context as JSON
          if(!err && _isString(ctx)) {
            try {
              ctx = JSON.parse(ctx);
            }
            catch(ex) {
              err = ex;
            }
          }

          // ensure ctx is an object
          if(err) {
            err = new JsonLdError(
              'Derefencing a URL did not result in a valid JSON-LD object. ' +
              'Possible causes are an inaccessible URL perhaps due to ' +
              'a same-origin policy (ensure the server uses CORS if you are ' +
              'using client-side JavaScript) or a non-JSON response.',
              'jsonld.InvalidUrl', {url: url, cause: err});
          }
          else if(!_isObject(ctx)) {
            err = new JsonLdError(
              'Derefencing a URL did not result in a JSON object. The ' +
              'response was valid JSON, but it was not a JSON object.',
              'jsonld.InvalidUrl', {url: url, cause: err});
          }
          if(err) {
            error = err;
            return callback(error);
          }

          // use empty context if no @context key is present
          if(!('@context' in ctx)) {
            ctx = {'@context': {}};
          }

          // recurse
          resolve(ctx, _cycles, resolver, url, function(err, ctx) {
            if(err) {
              return callback(err);
            }
            urls[url] = ctx['@context'];
            count -= 1;
            if(count === 0) {
              finished();
            }
          });
        });
      }(queue[i]));
    }
  };
  resolve(input, {}, resolver, options.base, callback);
}

// define js 1.8.5 Object.keys method if not present
if(!Object.keys) {
  Object.keys = function(o) {
    if(o !== Object(o)) {
      throw new TypeError('Object.keys called on non-object');
    }
    var rval = [];
    for(var p in o) {
      if(Object.prototype.hasOwnProperty.call(o, p)) {
        rval.push(p);
      }
    }
    return rval;
  };
}

/**
 * Parses statements in the form of N-Quads.
 *
 * @param input the N-Quads input to parse.
 *
 * @return an array of RDF statements.
 */
function _parseNQuads(input) {
  // define partial regexes
  var iri = '(?:<([^:]+:[^>]*)>)';
  var bnode = '(_:(?:[A-Za-z][A-Za-z0-9]*))';
  var plain = '"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"';
  var datatype = '(?:\\^\\^' + iri + ')';
  var language = '(?:@([a-z]+(?:-[a-z0-9]+)*))';
  var literal = '(?:' + plain + '(?:' + datatype + '|' + language + ')?)';
  var ws = '[ \\t]+';
  var wso = '[ \\t]*';
  var eoln = /(?:\r\n)|(?:\n)|(?:\r)/g;
  var empty = new RegExp('^' + wso + '$');

  // define quad part regexes
  var subject = '(?:' + iri + '|' + bnode + ')' + ws;
  var property = iri + ws;
  var object = '(?:' + iri + '|' + bnode + '|' + literal + ')' + wso;
  var graph = '(?:\\.|(?:(?:' + iri + '|' + bnode + ')' + wso + '\\.))';

  // full quad regex
  var quad = new RegExp(
    '^' + wso + subject + property + object + graph + wso + '$');

  // build RDF statements
  var statements = [];

  // split N-Quad input into lines
  var lines = input.split(eoln);
  var lineNumber = 0;
  for(var i in lines) {
    var line = lines[i];
    lineNumber++;

    // skip empty lines
    if(empty.test(line)) {
      continue;
    }

    // parse quad
    var match = line.match(quad);
    if(match === null) {
      throw new JsonLdError(
        'Error while parsing N-Quads; invalid quad.',
        'jsonld.ParseError', {line: lineNumber});
    }

    // create RDF statement
    var s = {};

    // get subject
    if(!_isUndefined(match[1])) {
      s.subject = {nominalValue: match[1], interfaceName: 'IRI'};
    }
    else {
      s.subject = {nominalValue: match[2], interfaceName: 'BlankNode'};
    }

    // get property
    s.property = {nominalValue: match[3], interfaceName: 'IRI'};

    // get object
    if(!_isUndefined(match[4])) {
      s.object = {nominalValue: match[4], interfaceName: 'IRI'};
    }
    else if(!_isUndefined(match[5])) {
      s.object = {nominalValue: match[5], interfaceName: 'BlankNode'};
    }
    else {
      var unescaped = match[6]
        .replace(/\\"/g, '"')
        .replace(/\\t/g, '\t')
        .replace(/\\n/g, '\n')
        .replace(/\\r/g, '\r')
        .replace(/\\\\/g, '\\');
      s.object = {nominalValue: unescaped, interfaceName: 'LiteralNode'};
      if(!_isUndefined(match[7])) {
        s.object.datatype = {nominalValue: match[7], interfaceName: 'IRI'};
      }
      else if(!_isUndefined(match[8])) {
        s.object.language = match[8];
      }
    }

    // get graph
    if(!_isUndefined(match[9])) {
      s.name = {nominalValue: match[9], interfaceName: 'IRI'};
    }
    else if(!_isUndefined(match[10])) {
      s.name = {nominalValue: match[10], interfaceName: 'BlankNode'};
    }

    // add unique statement
    for(var si in statements) {
      if(_compareRdfStatements(statements[si], s)) {
        continue;
      }
    }
    statements.push(s);
  }

  return statements;
}

// register the N-Quads RDF parser
jsonld.registerRDFParser('application/nquads', _parseNQuads);

/**
 * Converts an RDF statement to an N-Quad string (a single quad).
 *
 * @param statement the RDF statement to convert.
 * @param bnode the bnode the statement is mapped to (optional, for use
 *           during normalization only).
 *
 * @return the N-Quad string.
 */
function _toNQuad(statement, bnode) {
  var s = statement.subject;
  var p = statement.property;
  var o = statement.object;
  var g = statement.name || null;

  var quad = '';

  // subject is an IRI or bnode
  if(s.interfaceName === 'IRI') {
    quad += '<' + s.nominalValue + '>';
  }
  // normalization mode
  else if(bnode) {
    quad += (s.nominalValue === bnode) ? '_:a' : '_:z';
  }
  // normal mode
  else {
    quad += s.nominalValue;
  }

  // property is always an IRI
  quad += ' <' + p.nominalValue + '> ';

  // object is IRI, bnode, or literal
  if(o.interfaceName === 'IRI') {
    quad += '<' + o.nominalValue + '>';
  }
  else if(o.interfaceName === 'BlankNode') {
    // normalization mode
    if(bnode) {
      quad += (o.nominalValue === bnode) ? '_:a' : '_:z';
    }
    // normal mode
    else {
      quad += o.nominalValue;
    }
  }
  else {
    var escaped = o.nominalValue
      .replace(/\\/g, '\\\\')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\"/g, '\\"');
    quad += '"' + escaped + '"';
    if('datatype' in o && o.datatype.nominalValue !== XSD_STRING) {
      quad += '^^<' + o.datatype.nominalValue + '>';
    }
    else if('language' in o) {
      quad += '@' + o.language;
    }
  }

  // graph
  if(g !== null) {
    if(g.interfaceName === 'IRI') {
      quad += ' <' + g.nominalValue + '>';
    }
    else if(bnode) {
      quad += ' _:g';
    }
    else {
      quad += ' ' + g.nominalValue;
    }
  }

  quad += ' .\n';
  return quad;
}

/**
 * Parses statements found via the data object from the RDFa API.
 *
 * @param data the RDFa API data object.
 *
 * @return an array of RDF statements.
 */
function _parseRdfaApiData(data) {
  var statements = [];

  var subjects = data.getSubjects();
  for(var si in subjects) {
    var subject = subjects[si];
    if(subject === null) {
      continue;
    }

    // get all related triples
    var triples = data.getSubjectTriples(subject);
    if(triples === null) {
      continue;
    }
    var predicates = triples.predicates;
    for(var p in predicates) {
      // iterate over objects
      var objects = predicates[p].objects;
      for(var oi in objects) {
        var object = objects[oi];

        // create RDF statement
        var s = {};

        // add subject
        if(subject.indexOf('_:') === 0) {
          s.subject = {nominalValue: subject, interfaceName: 'BlankNode'};
        }
        else {
          s.subject = {nominalValue: subject, interfaceName: 'IRI'};
        }

        // add property
        s.property = {nominalValue: p, interfaceName: 'IRI'};

        // serialize XML literal
        var value = object.value;
        if(object.type === RDF_XML_LITERAL) {
          // initialize XMLSerializer
          if(!XMLSerializer) {
            _defineXMLSerializer();
          }
          var serializer = new XMLSerializer();
          value = '';
          for(var x = 0; x < object.value.length; x++) {
            if(object.value[x].nodeType === Node.ELEMENT_NODE) {
              value += serializer.serializeToString(object.value[x]);
            }
            else if(object.value[x].nodeType === Node.TEXT_NODE) {
              value += object.value[x].nodeValue;
            }
          }
        }

        // add object
        s.object = {nominalValue: value};

        // object is an IRI
        if(object.type === RDF_OBJECT) {
          if(object.value.indexOf('_:') === 0) {
            s.object.interfaceName = 'BlankNode';
          }
          else {
            s.object.interfaceName = 'IRI';
          }
        }
        // literal
        else {
          s.object.interfaceName = 'LiteralNode';
          if(object.type === RDF_PLAIN_LITERAL) {
            if(object.language) {
              s.object.language = object.language;
            }
          }
          else {
            s.object.datatype = {
              nominalValue: object.type,
              interfaceName: 'IRI'
            };
          }
        }

        // add statement
        statements.push(s);
      }
    }
  }

  return statements;
}

// register the RDFa API RDF parser
jsonld.registerRDFParser('rdfa-api', _parseRdfaApiData);

/**
 * Creates a new UniqueNamer. A UniqueNamer issues unique names, keeping
 * track of any previously issued names.
 *
 * @param prefix the prefix to use ('<prefix><counter>').
 */
function UniqueNamer(prefix) {
  this.prefix = prefix;
  this.counter = 0;
  this.existing = {};
};

/**
 * Copies this UniqueNamer.
 *
 * @return a copy of this UniqueNamer.
 */
UniqueNamer.prototype.clone = function() {
  var copy = new UniqueNamer(this.prefix);
  copy.counter = this.counter;
  copy.existing = _clone(this.existing);
  return copy;
};

/**
 * Gets the new name for the given old name, where if no old name is given
 * a new name will be generated.
 *
 * @param [oldName] the old name to get the new name for.
 *
 * @return the new name.
 */
UniqueNamer.prototype.getName = function(oldName) {
  // return existing old name
  if(oldName && oldName in this.existing) {
    return this.existing[oldName];
  }

  // get next name
  var name = this.prefix + this.counter;
  this.counter += 1;

  // save mapping
  if(oldName) {
    this.existing[oldName] = name;
  }

  return name;
};

/**
 * Returns true if the given oldName has already been assigned a new name.
 *
 * @param oldName the oldName to check.
 *
 * @return true if the oldName has been assigned a new name, false if not.
 */
UniqueNamer.prototype.isNamed = function(oldName) {
  return (oldName in this.existing);
};

/**
 * A Permutator iterates over all possible permutations of the given array
 * of elements.
 *
 * @param list the array of elements to iterate over.
 */
Permutator = function(list) {
  // original array
  this.list = list.sort();
  // indicates whether there are more permutations
  this.done = false;
  // directional info for permutation algorithm
  this.left = {};
  for(var i in list) {
    this.left[list[i]] = true;
  }
};

/**
 * Returns true if there is another permutation.
 *
 * @return true if there is another permutation, false if not.
 */
Permutator.prototype.hasNext = function() {
  return !this.done;
};

/**
 * Gets the next permutation. Call hasNext() to ensure there is another one
 * first.
 *
 * @return the next permutation.
 */
Permutator.prototype.next = function() {
  // copy current permutation
  var rval = this.list.slice();

  /* Calculate the next permutation using the Steinhaus-Johnson-Trotter
   permutation algorithm. */

  // get largest mobile element k
  // (mobile: element is greater than the one it is looking at)
  var k = null;
  var pos = 0;
  var length = this.list.length;
  for(var i = 0; i < length; ++i) {
    var element = this.list[i];
    var left = this.left[element];
    if((k === null || element > k) &&
      ((left && i > 0 && element > this.list[i - 1]) ||
      (!left && i < (length - 1) && element > this.list[i + 1]))) {
      k = element;
      pos = i;
    }
  }

  // no more permutations
  if(k === null) {
    this.done = true;
  }
  else {
    // swap k and the element it is looking at
    var swap = this.left[k] ? pos - 1 : pos + 1;
    this.list[pos] = this.list[swap];
    this.list[swap] = k;

    // reverse the direction of all elements larger than k
    for(var i = 0; i < length; ++i) {
      if(this.list[i] > k) {
        this.left[this.list[i]] = !this.left[this.list[i]];
      }
    }
  }

  return rval;
};

// SHA-1 API
var sha1 = jsonld.sha1 = {};

if(_nodejs) {
  var crypto = require('crypto');
  sha1.create = function() {
    var md = crypto.createHash('sha1');
    return {
      update: function(data) {
        md.update(data, 'utf8');
      },
      digest: function() {
        return md.digest('hex');
      }
    };
  };
}
else {
  sha1.create = function() {
    return new sha1.MessageDigest();
  };
}

/**
 * Hashes the given array of quads and returns its hexadecimal SHA-1 message
 * digest.
 *
 * @param nquads the list of serialized quads to hash.
 *
 * @return the hexadecimal SHA-1 message digest.
 */
sha1.hash = function(nquads) {
  var md = sha1.create();
  for(var i in nquads) {
    md.update(nquads[i]);
  }
  return md.digest();
};

// only define sha1 MessageDigest for non-nodejs
if(!_nodejs) {

/**
 * Creates a simple byte buffer for message digest operations.
 */
sha1.Buffer = function() {
  this.data = '';
  this.read = 0;
};

/**
 * Puts a 32-bit integer into this buffer in big-endian order.
 *
 * @param i the 32-bit integer.
 */
sha1.Buffer.prototype.putInt32 = function(i) {
  this.data += (
    String.fromCharCode(i >> 24 & 0xFF) +
    String.fromCharCode(i >> 16 & 0xFF) +
    String.fromCharCode(i >> 8 & 0xFF) +
    String.fromCharCode(i & 0xFF));
};

/**
 * Gets a 32-bit integer from this buffer in big-endian order and
 * advances the read pointer by 4.
 *
 * @return the word.
 */
sha1.Buffer.prototype.getInt32 = function() {
  var rval = (
    this.data.charCodeAt(this.read) << 24 ^
    this.data.charCodeAt(this.read + 1) << 16 ^
    this.data.charCodeAt(this.read + 2) << 8 ^
    this.data.charCodeAt(this.read + 3));
  this.read += 4;
  return rval;
};

/**
 * Gets the bytes in this buffer.
 *
 * @return a string full of UTF-8 encoded characters.
 */
sha1.Buffer.prototype.bytes = function() {
  return this.data.slice(this.read);
};

/**
 * Gets the number of bytes in this buffer.
 *
 * @return the number of bytes in this buffer.
 */
sha1.Buffer.prototype.length = function() {
  return this.data.length - this.read;
};

/**
 * Compacts this buffer.
 */
sha1.Buffer.prototype.compact = function() {
  this.data = this.data.slice(this.read);
  this.read = 0;
};

/**
 * Converts this buffer to a hexadecimal string.
 *
 * @return a hexadecimal string.
 */
sha1.Buffer.prototype.toHex = function() {
  var rval = '';
  for(var i = this.read; i < this.data.length; ++i) {
    var b = this.data.charCodeAt(i);
    if(b < 16) {
      rval += '0';
    }
    rval += b.toString(16);
  }
  return rval;
};

/**
 * Creates a SHA-1 message digest object.
 *
 * @return a message digest object.
 */
sha1.MessageDigest = function() {
  // do initialization as necessary
  if(!_sha1.initialized) {
    _sha1.init();
  }

  this.blockLength = 64;
  this.digestLength = 20;
  // length of message so far (does not including padding)
  this.messageLength = 0;

  // input buffer
  this.input = new sha1.Buffer();

  // for storing words in the SHA-1 algorithm
  this.words = new Array(80);

  // SHA-1 state contains five 32-bit integers
  this.state = {
    h0: 0x67452301,
    h1: 0xEFCDAB89,
    h2: 0x98BADCFE,
    h3: 0x10325476,
    h4: 0xC3D2E1F0
  };
};

/**
 * Updates the digest with the given string input.
 *
 * @param msg the message input to update with.
 */
sha1.MessageDigest.prototype.update = function(msg) {
  // UTF-8 encode message
  msg = unescape(encodeURIComponent(msg));

  // update message length and input buffer
  this.messageLength += msg.length;
  this.input.data += msg;

  // process input
  _sha1.update(this.state, this.words, this.input);

  // compact input buffer every 2K or if empty
  if(this.input.read > 2048 || this.input.length() === 0) {
    this.input.compact();
  }
};

/**
 * Produces the digest.
 *
 * @return the digest as a hexadecimal string.
 */
sha1.MessageDigest.prototype.digest = function() {
  /* Determine the number of bytes that must be added to the message
  to ensure its length is congruent to 448 mod 512. In other words,
  a 64-bit integer that gives the length of the message will be
  appended to the message and whatever the length of the message is
  plus 64 bits must be a multiple of 512. So the length of the
  message must be congruent to 448 mod 512 because 512 - 64 = 448.

  In order to fill up the message length it must be filled with
  padding that begins with 1 bit followed by all 0 bits. Padding
  must *always* be present, so if the message length is already
  congruent to 448 mod 512, then 512 padding bits must be added. */

  // 512 bits == 64 bytes, 448 bits == 56 bytes, 64 bits = 8 bytes
  // _padding starts with 1 byte with first bit is set in it which
  // is byte value 128, then there may be up to 63 other pad bytes
  var len = this.messageLength;
  var padBytes = new sha1.Buffer();
  padBytes.data += this.input.bytes();
  padBytes.data += _sha1.padding.substr(0, 64 - ((len + 8) % 64));

  /* Now append length of the message. The length is appended in bits
  as a 64-bit number in big-endian order. Since we store the length
  in bytes, we must multiply it by 8 (or left shift by 3). So here
  store the high 3 bits in the low end of the first 32-bits of the
  64-bit number and the lower 5 bits in the high end of the second
  32-bits. */
  padBytes.putInt32((len >>> 29) & 0xFF);
  padBytes.putInt32((len << 3) & 0xFFFFFFFF);
  _sha1.update(this.state, this.words, padBytes);
  var rval = new sha1.Buffer();
  rval.putInt32(this.state.h0);
  rval.putInt32(this.state.h1);
  rval.putInt32(this.state.h2);
  rval.putInt32(this.state.h3);
  rval.putInt32(this.state.h4);
  return rval.toHex();
};

// private SHA-1 data
var _sha1 = {
  padding: null,
  initialized: false
};

/**
 * Initializes the constant tables.
 */
_sha1.init = function() {
  // create padding
  _sha1.padding = String.fromCharCode(128);
  var c = String.fromCharCode(0x00);
  var n = 64;
  while(n > 0) {
    if(n & 1) {
      _sha1.padding += c;
    }
    n >>>= 1;
    if(n > 0) {
      c += c;
    }
  }

  // now initialized
  _sha1.initialized = true;
};

/**
 * Updates a SHA-1 state with the given byte buffer.
 *
 * @param s the SHA-1 state to update.
 * @param w the array to use to store words.
 * @param input the input byte buffer.
 */
_sha1.update = function(s, w, input) {
  // consume 512 bit (64 byte) chunks
  var t, a, b, c, d, e, f, i;
  var len = input.length();
  while(len >= 64) {
    // the w array will be populated with sixteen 32-bit big-endian words
    // and then extended into 80 32-bit words according to SHA-1 algorithm
    // and for 32-79 using Max Locktyukhin's optimization

    // initialize hash value for this chunk
    a = s.h0;
    b = s.h1;
    c = s.h2;
    d = s.h3;
    e = s.h4;

    // round 1
    for(i = 0; i < 16; ++i) {
      t = input.getInt32();
      w[i] = t;
      f = d ^ (b & (c ^ d));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
      e = d;
      d = c;
      c = (b << 30) | (b >>> 2);
      b = a;
      a = t;
    }
    for(; i < 20; ++i) {
      t = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      t = (t << 1) | (t >>> 31);
      w[i] = t;
      f = d ^ (b & (c ^ d));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x5A827999 + t;
      e = d;
      d = c;
      c = (b << 30) | (b >>> 2);
      b = a;
      a = t;
    }
    // round 2
    for(; i < 32; ++i) {
      t = (w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16]);
      t = (t << 1) | (t >>> 31);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
      e = d;
      d = c;
      c = (b << 30) | (b >>> 2);
      b = a;
      a = t;
    }
    for(; i < 40; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0x6ED9EBA1 + t;
      e = d;
      d = c;
      c = (b << 30) | (b >>> 2);
      b = a;
      a = t;
    }
    // round 3
    for(; i < 60; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = (b & c) | (d & (b ^ c));
      t = ((a << 5) | (a >>> 27)) + f + e + 0x8F1BBCDC + t;
      e = d;
      d = c;
      c = (b << 30) | (b >>> 2);
      b = a;
      a = t;
    }
    // round 4
    for(; i < 80; ++i) {
      t = (w[i - 6] ^ w[i - 16] ^ w[i - 28] ^ w[i - 32]);
      t = (t << 2) | (t >>> 30);
      w[i] = t;
      f = b ^ c ^ d;
      t = ((a << 5) | (a >>> 27)) + f + e + 0xCA62C1D6 + t;
      e = d;
      d = c;
      c = (b << 30) | (b >>> 2);
      b = a;
      a = t;
    }

    // update hash state
    s.h0 += a;
    s.h1 += b;
    s.h2 += c;
    s.h3 += d;
    s.h4 += e;

    len -= 64;
  }
};

} // end non-nodejs

if(!XMLSerializer) {

function _defineXMLSerializer() {
  XMLSerializer = require('xmldom').XMLSerializer;
}

} // end _defineXMLSerializer

// define URL parser
jsonld.url = {};
if(_nodejs) {
  jsonld.url.parse = require('url').parse;
}
else {
  // parseUri 1.2.2
  // (c) Steven Levithan <stevenlevithan.com>
  // MIT License
  var parseUri = {};
  parseUri.options = {
    key: ['href','protocol','host','userInfo','user','password','hostname','port','relative','path','directory','file','query','hash'],
    parser: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/
  };
  jsonld.url.parse = function(str) {
    var o = parseUri.options;
    var m = o.parser.exec(str);
    var uri = {};
    var i = 14;
    while(i--) {
      uri[o.key[i]] = m[i] || '';
    }
    // normalize to node.js API
    if(uri.host && uri.path === '') {
      uri.path = '/';
    }
    uri.pathname = uri.path;
    if(uri.query) {
      uri.path = uri.path + '?' + uri.query;
    }
    uri.protocol += ':';
    if(uri.hash) {
      uri.hash = '#' + uri.hash;
    }
    return uri;
  };
}

})();
