/*!
 * jquery-sheetrock v0.2.4
 * Quickly connect to, query, and lazy-load data from Google Spreadsheets.
 * http://chriszarate.github.io/sheetrock/
 * License: MIT
 */

(function(sheetrock) {

  'use strict';

  /* global define, module */

  if(typeof define === 'function' && define.amd) {
    define('jquery.sheetrock', ['jquery'], sheetrock);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = sheetrock;
  } else {
    sheetrock(window.jQuery);
  }

})(function($) {

  'use strict';

  $.fn.sheetrock = function(options, bootstrappedData) {

    // Store reference to `this`.
    options.target = this;

    // Load and validate options.
    options = _validateOptions(options);

    // Proceed if options are valid.
    if(options) {

      // Check for bootstrapped data.
      if(_defined(bootstrappedData) && bootstrappedData !== null) {

        // Load bootstrapped data.
        _loadBootstrappedData(options, bootstrappedData);

      } else {

        // Initialize request for external data.
        _initializeRequest(options);

      }

    }

    // Return `this` to allow jQuery object chaining.
    return this;

  };


  /* Setup */

  // Google API endpoints and key formats
  var _spreadsheetTypes = {
    '2014': {
      'endpoint': 'https://docs.google.com/spreadsheets/d/%key%/gviz/tq',
      'keyFormat': new RegExp('spreadsheets/d/([^/#]+)','i')
    },
    '2010': {
      'endpoint': 'https://spreadsheets.google.com/tq?key=%key%',
      'keyFormat': new RegExp('key=([^&#]+)','i')
    }
  },

  // Placeholder for request status cache
  _requestStatusCache = {
    loaded: {},
    failed: {},
    offset: {}
  },

  // Placeholder for column labels cache
  _columnLabelsCache = {},

  // Callback function index
  _callbackIndex = 0,


  /* Task runners */

  // Initiate request to Google Spreadsheets API. Use jQuery deferreds to make
  // sure requests are processed synchronously.
  _initializeRequest = function(options) {

    // Chain off of previous promise.
    $.fn.sheetrock.promise = $.fn.sheetrock.promise

      // Prefetch column labels (if necessary).
      .pipe(function() {
        return _prefetchColumnLabels(options);
      })

      // Fetch request.
      .pipe(function() {
        return _fetchRequest(options);
      });

  },

  // Load bootstrapped data (no request to API).
  _loadBootstrappedData = function(options, data) {

    // Spin up user-facing indicators.
    _beforeRequest(options);

    // Process the data as though it were a real response from the API.
    _processResponse.call(options, data);

    // Wind down user-facing indicators.
    _afterRequest.call(options);

  },


  /* Data fetchers */

  // Prefetch column labels (if necessary).
  _prefetchColumnLabels = function(options) {

    // Options for prefetching column labels
    var prefetchOptions = {
      sql: 'select * limit 1',
      dataHandler: _cacheColumnLabels,
      userCallback: $.noop,
      target: false
    };

    // Proceed if column labels are not present (either in the SQL query via
    // the '%label%' technique or in the passed options).
    if(options.sql.indexOf('%') !== -1 && !_getColumnLabels(options)) {

      // Make a special request for just the column labels.
      _console('Prefetching column labels.');
      return _fetchRequest($.extend({}, options, prefetchOptions));

    } else {

      // Return a resolved deferred object so that the next request fires
      // immediately.
      return $.Deferred().resolve();

    }

  },

  // Fetch the requested data using the user's options.
  _fetchRequest = function(options) {

    // Spin up user-facing indicators.
    _beforeRequest(options);

    // Specify a custom callback function since Google doesn't use the
    // default implementation favored by jQuery.
    options.callback = 'sheetrock_callback_' + _callbackIndex;
    _callbackIndex = _callbackIndex + 1;

    // AJAX request options
    var request = {

      // Convert user options into AJAX request parameters.
      data: _makeParameters(options),

      // Use user options object as context (`this`) for data handler.
      context: options,

      url: options.server,
      dataType: 'jsonp',
      cache: true,

      // Use custom callback function (see above).
      jsonp: false,
      jsonpCallback: options.callback

    };

    // If debugging is enabled, log request details to the console.
    _console(request, options.debug);

    // Send the request.
    return $.ajax(request)

      // Not sure this is necessary.
      .promise()

      // Validate the response data.
      .done(_processResponse)

      // Handle error.
      .fail(_error)

      // Wind down user-facing indicators.
      .always(_afterRequest);

  },

  // Convert user options into AJAX request parameters.
  _makeParameters = function(options) {

    // Create new paramters object.
    var parameters = {

      // Google Spreadsheet identifiers
      //key: options.key,
      gid: options.gid,

      // Conform to Google's nonstandard callback syntax.
      tqx: 'responseHandler:' + options.callback

    };

    // Swap column labels for column letters, if applicable.
    if(options.sql) {
      parameters.tq = _swapLabels(options.sql, _getColumnLabels(options));
    }

    return parameters;

  },


  /* UI and AJAX helpers. */

  // Spin up user-facing indicators.
  _beforeRequest = function(options) {

    // Show loading indicator.
    options.loading.show();

    // Turn on the `working` flag.
    $.fn.sheetrock.working = true;

  },

  // Wind down user-facing indicators and call user callback function.
  _afterRequest = function() {

    // Hide the loading indicator.
    this.loading.hide();

    // Turn off the `working` flag.
    $.fn.sheetrock.working = false;

    // Call the user's callback function.
    this.userCallback(this);

  },

  // Enumerate any messages embedded in the API response.
  _enumerateMessages = function(data, state) {

    // Look for the specified property at the root of the response object.
    if(_has(data, state)) {

      // Look for the kinds of messages we know about.
      $.each(data[state], function(i, status) {
        if(_has(status, 'detailed_message')) {
          /* jshint camelcase: false */
          _console(status.detailed_message);
        } else if(_has(status, 'message')) {
          _console(status.message);
        }
      });

    }

  },


  /* Data validators */

  // Validate API response.
  _processResponse = function(data) {

    // Enumerate any returned warning messages.
    _enumerateMessages(data, 'warnings');

    // Enumerate any returned error messages.
    _enumerateMessages(data, 'errors');

    // Log the API response to the console, if requested.
    _console(data, this.debug);

    // Make sure the response is populated with actual data.
    if(_has(data, 'status', 'table') && _has(data.table, 'cols', 'rows')) {

      // Extend the options hash with useful information about the response.
      var parsedOptions = _extendOptions.call(this, data);

      // Pass the API response to the data handler.
      this.dataHandler.call(parsedOptions, data);

    } else {

      // The response seems empty; call the error handler.
      _error.call(this, data);

    }

  },

  // Extend the options hash with useful information about the response.
  _extendOptions = function(data) {

    // Store reference to the options hash.
    var options = this;

    // Initialize a hash for parsed options.
    options.parsed = {};

    // The Google API generates an unrecoverable error when the 'offset' is
    // larger than the number of available rows, which is problematic for
    // chunked requests. As a workaround, we request one more row than we need
    // and stop when we see less rows than we requested.

    // Calculate the last returned row.
    options.parsed.last =
      (options.chunkSize) ? Math.min(data.table.rows.length, options.chunkSize) : data.table.rows.length;

    // Remember whether this request has been fully loaded.
    _requestStatusCache.loaded[options.requestID] =
      !options.chunkSize || options.parsed.last < options.chunkSize;

    // Determine if Google has extracted column labels from a header row.
    options.parsed.header =
      ($.map(data.table.cols, _getColumnLabel).length) ? 1 : 0;

    // If no column labels are provided or if there are too many or too few
    // compared to the returned data, use the returned column labels.
    options.parsed.labels =
      (options.labels && options.labels.length === data.table.cols.length) ? options.labels : $.map(data.table.cols, _getColumnLabelOrLetter);

    // Return extended options.
    return options;

  },


  /* Data parsers */

  // Parse data, row by row.
  _parseData = function(data) {

    // Store reference to the options hash and target.
    var options = this,
        target = options.target;

    // Add row group tags (<thead>, <tbody>), if requested.
    $.extend(options, {
      thead: (options.rowGroups) ? $('<thead/>').appendTo(target) : target,
      tbody: (options.rowGroups) ? $('<tbody/>').appendTo(target) : target
    });

    // Output a header row, if needed.
    if(!options.offset && !options.headersOff) {
      if(options.parsed.header || !options.headers) {
        options.thead.append(options.rowHandler({
          num: 0,
          cells: _arrayToObject(options.parsed.labels)
        }));
      }
    }

    // Each table cell ('c') can contain two properties: 'p' contains
    // formatting and 'v' contains the actual cell value.

    // Loop through each table row.
    $.each(data.table.rows, function(i, obj) {

      // Proceed if the row has cells and the row index is within the targeted
      // range. (This avoids displaying too many rows when chunking data.)
      if(_has(obj, 'c') && i < options.parsed.last) {

        // Get the "real" row index (not counting header rows).
        var counter = _stringToNaturalNumber(options.offset + i + 1 + options.parsed.header - options.headers),

        // Initialize a row object, which will be passed to the row handler.
        rowObject = {
          num: counter,
          cells: {}
        };

        // Suppress header row, if requested.
        if(counter || !options.headersOff) {

          // Loop through each cell in the row.
          $.each(obj.c, function(x, cell) {

            // Process cell formatting, if requested.
            var style = (options.formatting) ? _getFormatting(cell) : false,

            // Extract cell value.
            value = (cell && _has(cell, 'v') && cell.v) ? cell.v : '';

            // Avoid array cell values.
            if(value instanceof Array) {
              value = (_has(cell, 'f')) ? cell.f : value.join('');
            }

            // Process cell value with cell handler function.
            value = options.cellHandler(value);

            // Add the cell to the row object, using the desired column label
            // as the key.
            rowObject.cells[options.parsed.labels[x]] = (style) ? _wrapTag(value, 'span', style) : value;

          });

          // Pass the row object to the row handler and append the output to
          // the target element.

          if(rowObject.num) {
            // Append to table body.
            options.tbody.append(options.rowHandler(rowObject));
          } else {
            // Append to table header.
            options.thead.append(options.rowHandler(rowObject));
          }

        }

      }

    });

  },

  // Cache column labels (indexed by key_gid) in the plugin scope. This way
  // column labels will only be prefetched once.
  _cacheColumnLabels = function(data) {
    var labels = {};
    $.each(data.table.cols, function(i, col) {
      labels[col.id] = _getColumnLabelOrLetter(col);
    });
    _columnLabelsCache[this.key + '_' + this.gid] = labels;
  },

  // Look for acceptable column labels first in the passed options, then in
  // the column label cache. Fallback to `false`, which triggers a prefetch.
  _getColumnLabels = function(options) {
    if($.isEmptyObject(options.columns)) {
      return _columnLabelsCache[options.key + '_' + options.gid] || false;
    } else {
      return options.columns;
    }
  },


  /* User input validator */

  // Validate user-passed options.
  _validateOptions = function(options) {

    // Extend default options.
    options = $.extend({}, $.fn.sheetrock.options, options);

    // Get spreadsheet type.
    options.type = _getSpreadsheetType(options.url);

    // Get spreadsheet key and gid.
    options.key = _extractKey(options.url, options.type);
    options.gid = _extractGID(options.url);

    // Set API endpoint.
    options.server = (options.server.length) ? options.server : options.type.endpoint;
    options.server = options.server.replace('%key%', options.key);

    // Set request ID (key_gid_sql).
    if(options.key && options.gid) {
      options.requestID = options.key + '_' + options.gid + '_' + options.sql;
    }

    // Validate chunk size.
    options.chunkSize = (options.target.length) ? _stringToNaturalNumber(options.chunkSize) : 0;

    // Validate number of header rows.
    options.headers = _stringToNaturalNumber(options.headers);

    // Make sure `loading` is a jQuery object.
    options.loading = _validatejQueryObject(options.loading);

    // If requested, reset request status.
    if(options.resetStatus && options.requestID) {
      _requestStatusCache.loaded[options.requestID] = false;
      _requestStatusCache.failed[options.requestID] = false;
      _requestStatusCache.offset[options.requestID] = 0;
      _console('Resetting request status.');
    }

    // Retrieve current row offset.
    options.offset = _requestStatusCache.offset[options.requestID] || 0;

    // If requested, make a request for chunked data.
    if(options.chunkSize && options.target && options.requestID) {

      // Append a limit and row offest to the query to target the next chunk.
      options.sql += ' limit ' + (options.chunkSize + 1);
      options.sql += ' offset ' + options.offset;

      // Remember the new row offset.
      _requestStatusCache.offset[options.requestID] = options.offset + options.chunkSize;

    }

    // Require `this` or a data handler. Otherwise, the data has nowhere to go.
    if(!options.target.length && options.dataHandler === _parseData) {
      return _error.call(options, null, 'No element targeted or data handler provided.');
    }

    // Require a spreadsheet URL.
    if(!options.url) {
      return _error.call(options, null, 'No spreadsheet URL provided.');
    }

    // Require a spreadsheet key.
    if(!options.key) {
      return _error.call(options, null, 'Could not find a key in the provided URL.');
    }

    // Require a spreadsheet gid.
    if(!options.gid) {
      return _error.call(options, null, 'Could not find a gid in the provided URL.');
    }

    // Abandon requests that have previously generated an error.
    if(_requestStatusCache.failed[options.requestID]) {
      return _error.call(options, null, 'A previous request for this resource failed.');
    }

    // Abandon requests that have already been loaded.
    if(_requestStatusCache.loaded[options.requestID]) {
      return _console('No more rows to load!');
    }

    // Log the validated options to the console, if requested.
    _console(options, options.debug);

    return options;

  },

  // General error handler.
  _error = function(data, msg) {

    // Set error message.
    msg = msg || 'Request failed.';

    // Remember that this request failed.
    if(this && this.requestID) {
      _requestStatusCache.failed[this.requestID] = true;
    }

    // Log the error to the console.
    _console(msg);

    // Call the user's error handler.
    this.errorHandler.call(this, data, msg);

    return false;

  },


  /* Miscellaneous functions */

  // Trim a string of leading and trailing spaces.
  _trim = function(str) {
    return str.toString().replace(/^ +/, '').replace(/ +$/, '');
  },

  // Parse a string as a natural number (>=0).
  _stringToNaturalNumber = function(str) {
    return Math.max(0, parseInt(str, 10) || 0);
  },

  // Return true if an object has all of the passed arguments as properties.
  _has = function(obj) {
    for(var i = 1; i < arguments.length; i = i + 1) {
      if(!_defined(obj[arguments[i]])) {
        return false;
      }
    }
    return true;
  },

  // Return true if all of the passed arguments are defined.
  _defined = function() {
    for(var i = 0; i < arguments.length; i = i + 1) {
      if(typeof arguments[i] === 'undefined') {
        return false;
      }
    }
    return true;
  },

  // Log something to the browser console, if it exists. The argument "show"
  // is a Boolean (default = true) that determines whether to proceed.
  _console = function(msg, show) {
    show = (_defined(show, console)) ? show : true;
    if(show && console.log) {
      console.log(msg);
    }
    return false;
  },

  // Get spreadsheet "type" from Google Spreadsheet URL (default is "2014").
  _getSpreadsheetType = function(url) {

    var returnValue;

    $.each(_spreadsheetTypes, function(key, spreadsheetType) {
      if(spreadsheetType.keyFormat.test(url)) {
        returnValue = spreadsheetType;
        return false;
      }
    });

    return returnValue || _spreadsheetTypes['2014'];

  },

  // Extract the "key" from a Google Spreadsheet URL.
  _extractKey = function(url, spreadsheetType) {
    return (spreadsheetType.keyFormat.test(url)) ? url.match(spreadsheetType.keyFormat)[1] : false;
  },

  // Extract the "gid" from a Google spreadsheet URL.
  _extractGID = function(url) {
    var gidRegExp = new RegExp('gid=([^/&#]+)','i');
    return (gidRegExp.test(url)) ? url.match(gidRegExp)[1] : false;
  },

  // Extract the label, if present, from a column object, sans white space.
  _getColumnLabel = function(col) {
    return (_has(col, 'label')) ? col.label.replace(/\s/g, '') : null;
  },

  // Map function: Return the label or letter of a column object.
  _getColumnLabelOrLetter = function(col) {
    return _getColumnLabel(col) || col.id;
  },

  // Swap user-provided column labels (%label%) with column letters.
  _swapLabels = function(sql, columns) {
    $.each(columns, function(key, val) {
      sql = sql.replace(new RegExp('%' + val + '%', 'g'), key);
    });
    return sql;
  },

  // Return true if the reference is a valid jQuery object or selector.
  _validatejQueryObject = function(ref) {
    return (ref && !(ref instanceof $)) ? $(ref) : ref;
  },

  // Convert an array to a object.
  _arrayToObject = function(arr) {
    var obj = {};
    $.each(arr, function(i, str) { obj[str] = str; });
    return obj;
  },

  // Extract formatting from a Google spreadsheet cell.
  _getFormatting = function(cell) {
    return (cell && _has(cell, 'p') && _has(cell.p, 'style')) ? cell.p.style : false;
  },

  // Default row handler: Output a row object as an HTML table row.
  _toHTML = function(row) {

    // Placeholders
    var cell, html = '',

    // Use "td" for table body row, "th" for table header rows.
    tag = (row.num) ? 'td' : 'th';

    // Loop through each cell in the row.
    for(cell in row.cells) {

      // Make sure `cell` is a real object property.
      if(_has(row.cells, cell)) {
        // Wrap the cell value in the cell tag.
        html += _wrapTag(row.cells[cell], tag, '');
      }

    }

    // Wrap the cells in a table row tag.
    return _wrapTag(html, 'tr', '');

  },

  // Wrap a string in tag. The style argument, if present, is populated into
  // an inline CSS style attribute. (Gross!)
  _wrapTag = function(str, tag, style) {
    var attribute = (style) ? ' style="' + style + '"' : '';
    return '<' + tag + attribute + '>' + str + '</' + tag + '>';
  };


  /* Default options */

  $.fn.sheetrock.options = {

    // Documentation is available at:
    // http://chriszarate.github.io/sheetrock/

    url:          '',          // String  -- Google spreadsheet URL
    sql:          '',          // String  -- Google Visualization API query
    server:       '',          // String  -- Google API endpoint
    chunkSize:    0,           // Integer -- Number of rows to fetch (0 = all)
    columns:      {},          // Object  -- Hash of column letters and labels
    labels:       [],          // Array   -- Override *returned* column labels
    rowHandler:   _toHTML,     // Function
    cellHandler:  _trim,       // Function
    dataHandler:  _parseData,  // Function
    errorHandler: $.noop,      // Function
    userCallback: $.noop,      // Function
    loading:      $(),         // jQuery object or selector
    headers:      0,           // Integer -- Number of header rows
    headersOff:   false,       // Boolean -- Suppress header row output
    rowGroups:    true,        // Boolean -- Output <thead> and <tbody> tags
    formatting:   false,       // Boolean -- Include Google HTML formatting
    resetStatus:  false,       // Boolean -- Reset request status
    debug:        false        // Boolean -- Output raw data to the console

  };

  // This property is set to `true` when there is an active AJAX request. This
  // can be useful for infinite scroll bindings or other monitoring.
  $.fn.sheetrock.working = false;

  // This property contains a jQuery promise for the most recent request. If
  // you chain off of this, be sure to return another jQuery promise so
  // Sheetrock can continue to chain off of it.
  $.fn.sheetrock.promise = $.Deferred().resolve();

  // Version number.
  $.fn.sheetrock.version = '0.2.4';

});
