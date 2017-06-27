/*!
 * Sheetrock v1.0.1
 * Quickly connect to, query, and lazy-load data from Google Sheets.
 * http://chriszarate.github.io/sheetrock/
 * License: MIT
 */

/*global window,define */
/*jslint indent: 2, node: true, vars: true */

(function (root, factory) {

  'use strict';

  var widget = factory();

  /* istanbul ignore next: UMD */
  if (typeof define === 'function' && define.amd) {
    define('sheetrock', function () {
      widget.environment.amd = true;
      return widget;
    });
  } else if (typeof module === 'object' && module.exports) {
    widget.environment.commonjs = true;
    widget.environment.request = require('request');
    module.exports = widget;
  } else {
    root.sheetrock = widget;
  }

}(this, function () {

  'use strict';

  // Google Visualization API endpoints and parameter formats
  var sheetTypes = {
    '2014': {
      'apiEndpoint': 'https://docs.google.com/spreadsheets/d/%key%/gviz/tq?',
      'keyFormat': new RegExp('spreadsheets/d/([^/#]+)', 'i'),
      'gidFormat': new RegExp('gid=([^/&#]+)', 'i')
    },
    '2010': {
      'apiEndpoint': 'https://spreadsheets.google.com/tq?key=%key%&',
      'keyFormat': new RegExp('key=([^&#]+)', 'i'),
      'gidFormat': new RegExp('gid=([^/&#]+)', 'i')
    }
  };

  // Placeholder for request status cache
  var requestStatusCache = {
    loaded: {},
    failed: {},
    labels: {},
    header: {},
    offset: {}
  };

  // JSONP callback function index
  var jsonpCallbackIndex = 0;


  /* Environment */

  // DOM, transport, and module settings
  var root = (typeof window === 'undefined') ? {} : window;
  var env = {
    document: root.document || {},
    dom: !!(root.document && root.document.createElement),
    jquery: !!(root.jQuery && root.jQuery.fn && root.jQuery.fn.jquery),
    request: false
  };


  /* Polyfills */

  // Radically simplified polyfills for narrow use cases.

  if (!Array.prototype.forEach) {
    /*jshint freeze: false */
    Array.prototype.forEach = function (func) {
      var i;
      var array = this;
      var arrayLength = array.length;
      for (i = 0; i < arrayLength; i = i + 1) {
        func(array[i], i);
      }
    };
  }

  if (!Array.prototype.map) {
    /*jshint freeze: false */
    Array.prototype.map = function (func) {
      var array = this;
      var resultArray = [];
      array.forEach(function (value, i) {
        resultArray[i] = func(value, i);
      });
      return resultArray;
    };
  }

  if (!Object.keys) {
    Object.keys = function (object) {
      var key;
      var array = [];
      for (key in object) {
        if (object.hasOwnProperty(key)) {
          array.push(key);
        }
      }
      return array;
    };
  }


  /* Helpers */

  // General error handler.
  var handleError = function (error, options, response) {

    if (!(error instanceof Error)) {
      error = new Error(error);
    }

    // Remember that this request failed.
    if (options && options.request && options.request.index) {
      requestStatusCache.failed[options.request.index] = true;
    }

    // Call the user's callback function.
    if (options && options.user && options.user.callback) {
      options.user.callback(error, options, response || null);
    } else {
      throw error;
    }

  };

  // Trim a string of leading and trailing spaces.
  var trim = function (str) {
    return str.toString().replace(/^ +/, '').replace(/ +$/, '');
  };

  // Parse a string as a natural number (>=0).
  var stringToNaturalNumber = function (str) {
    return Math.max(0, parseInt(str, 10) || 0);
  };

  // Return true if the DOM element has the specified class.
  var hasClass = function (el, className) {
    var classes = ' ' + el.className + ' ';
    return classes.indexOf(' ' + className + ' ') !== -1;
  };

  // Extract a DOM element from a possible jQuery blob.
  var extractElement = function (blob) {
    blob = blob || {};
    if (blob.jquery && blob.length) {
      blob = blob[0];
    }
    return (blob.nodeType && blob.nodeType === 1) ? blob : false;
  };

  // Update environment.
  var updateEnvironment = function () {
    env.dom = !!(env.document && env.document.createElement);
  };

  // Get API endpoint, key, and gid from a Google Sheet URL.
  var getRequestOptions = function (url) {
    var requestOptions = {};
    var sheetTypeKeys = Object.keys(sheetTypes);
    sheetTypeKeys.forEach(function (key) {
      var sheetType = sheetTypes[key];
      if (sheetType.keyFormat.test(url) && sheetType.gidFormat.test(url)) {
        requestOptions.key = url.match(sheetType.keyFormat)[1];
        requestOptions.gid = url.match(sheetType.gidFormat)[1];
        requestOptions.apiEndpoint = sheetType.apiEndpoint.replace('%key%', requestOptions.key);
      }
    });
    return requestOptions;
  };

  // Generate a request ID that can be used as an object key.
  var generateRequestID = function (requestOptions) {
    return (requestOptions.key && requestOptions.gid) ? requestOptions.key + '_' + requestOptions.gid + '_' + requestOptions.query : null;
  };

  // Get the trimmed value of a cell object. Use the formatted value, if
  // available; otherwise, use the raw value; fallback to empty string.
  var getCellValue = function (cell) {

    var value;

    if (cell && cell.f) {
      value = cell.f;
    } else if (cell && cell.v) {
      value = cell.v;
    } else {
      value = '';
    }

    // Avoid array cell values.
    if (value instanceof Array) {
      value = cell.f || value.join('');
    }

    return trim(value);

  };

  // Create a row object from arrays of cells and labels.
  var createRowObject = function (rowNumber, cells, labels) {
    var row = {
      cells: {},
      cellsArray: cells,
      labels: labels,
      num: rowNumber
    };
    cells.forEach(function (cell, x) {
      row.cells[labels[x]] = cell;
    });
    return row;
  };

  // Wrap a string in tag. The style argument, if present, is populated into
  // an inline CSS style attribute. (Gross!)
  var wrapTag = function (str, tag) {
    return '<' + tag + '>' + str + '</' + tag + '>';
  };

  // Default row template: Output a row object as an HTML table row. Use "td"
  // for table body row, "th" for table header rows.
  var toHTML = function (row) {
    var tag = (row.num) ? 'td' : 'th';
    var cells = Object.keys(row.cells);
    var html = '';
    cells.forEach(function (key) {
      html += wrapTag(row.cells[key], tag);
    });
    return wrapTag(html, 'tr');
  };

  // If user requests it, reset any cached request status.
  var resetRequestStatus = function (index) {
    requestStatusCache.loaded[index] = false;
    requestStatusCache.failed[index] = false;
    requestStatusCache.labels[index] = false;
    requestStatusCache.header[index] = 0;
    requestStatusCache.offset[index] = 0;
  };


  /* Options */

  // Extend default options.
  var extendDefaults = function (defaults, options) {

    var extended = {};
    var defaultKeys = Object.keys(defaults);

    // Support some legacy option names.
    options.query = options.sql || options.query;
    options.reset = options.resetStatus || options.reset;
    options.fetchSize = options.chunkSize || options.fetchSize;
    options.rowTemplate = options.rowHandler || options.rowTemplate;

    defaultKeys.forEach(function (key) {
      extended[key] = options[key] || defaults[key];
    });

    return extended;

  };

  // Check the user-passed options for correctable problems.
  var checkUserOptions = function (target, options) {

    // Look for valid DOM element target.
    options.target = extractElement(options.target) || extractElement(target);

    // Correct bad integer values.
    options.fetchSize = stringToNaturalNumber(options.fetchSize);

    return options;

  };

  // Process user-passed options.
  var processUserOptions = function (target, options) {

    var userOptions = checkUserOptions(target, options);
    var requestOptions = getRequestOptions(userOptions.url);

    // Set request query and index (key_gid_query).
    requestOptions.query = userOptions.query;
    requestOptions.index = generateRequestID(requestOptions);

    // If requested, reset request status.
    if (userOptions.reset && requestOptions.index) {
      resetRequestStatus(requestOptions.index);
      requestOptions.reset = true;
    }

    // Retrieve current row offset.
    userOptions.offset = requestStatusCache.offset[requestOptions.index] || 0;

    // If requested, make a request for paged data.
    if (userOptions.fetchSize && requestOptions.index) {

      // Append a limit and row offest to the query to target the next page.
      requestOptions.query += ' limit ' + (userOptions.fetchSize + 1);
      requestOptions.query += ' offset ' + userOptions.offset;

      // Remember the new row offset.
      requestStatusCache.offset[requestOptions.index] = userOptions.offset + userOptions.fetchSize;

    }

    return {
      user: userOptions,
      request: requestOptions
    };

  };

  // Validate the processed options hash.
  var validateOptions = function (options) {

    // Require DOM element or a callback function. Otherwise, the data has nowhere to go.
    if (!options.user.target && !options.user.callback) {
      throw 'No element targeted or callback provided.';
    }

    // Require a Sheet key and gid.
    if (!(options.request.key && options.request.gid)) {
      throw 'No key/gid in the provided URL.';
    }

    // Abandon requests that have previously generated an error.
    if (requestStatusCache.failed[options.request.index]) {
      throw 'A previous request for this resource failed.';
    }

    // Abandon requests that have already been loaded.
    if (requestStatusCache.loaded[options.request.index]) {
      throw 'No more rows to load!';
    }

    return options;

  };

  // Validate user-provided labels against returned data.
  var validateUserLabels = function (userLabels, columnLabels) {
    return (userLabels && userLabels.length === columnLabels.length) ? userLabels : columnLabels;
  };


  /* Data */

  // Get useful information about the response.
  var getResponseAttributes = function (options, data) {

    var requestIndex = options.request.index;
    var columnLabels = requestStatusCache.labels[requestIndex];
    var fetchSize = options.user.fetchSize;

    var rows = data.table.rows;
    var cols = data.table.cols;

    // Initialize a hash for the response attributes.
    var attributes = {
      last: rows.length - 1,
      rowNumberOffset: requestStatusCache.header[requestIndex] || 0
    };

    // Determine if Google has extracted column labels from a header row.
    if (!options.user.offset) {
      // Use extracted column labels, the first row, or column letter.
      columnLabels = cols.map(function (col, i) {
        if (col.label) {
          return col.label.replace(/\s/g, '');
        } else {
          // Get column labels from the first row of the response.
          attributes.last = attributes.last + 1;
          attributes.rowNumberOffset = 1;
          return getCellValue(rows[0].c[i]).replace(/\s/g, '') || col.id;
        }
      });
      requestStatusCache.offset[requestIndex] = requestStatusCache.offset[requestIndex] + attributes.rowNumberOffset;
      requestStatusCache.header[requestIndex] = attributes.rowNumberOffset;
      requestStatusCache.labels[requestIndex] = columnLabels;
    }

    // The Google API generates an unrecoverable error when the 'offset' is
    // larger than the number of available rows, which is problematic for
    // paged requests. As a workaround, we request one more row than we need
    // and stop when we see less rows than we requested.

    // Remember whether this request has been fully loaded.
    if (!fetchSize || (rows.length - attributes.rowNumberOffset) < fetchSize) {
      attributes.last = attributes.last + 1;
      requestStatusCache.loaded[requestIndex] = true;
    }

    // If column labels are provided and have the expected length, use them.
    attributes.labels = validateUserLabels(options.user.labels, columnLabels);

    // Return the response attributes.
    return attributes;

  };

  // Parse data, row by row, and generate a simpler output array.
  var parseData = function (userOptions, attributes, rawData) {

    var output = [];
    var labels = attributes.labels;

    // Add a header row constructed from the column labels, if appropriate.
    if (!userOptions.offset && !attributes.rowNumberOffset) {
      output.push(createRowObject(0, labels, labels));
    }

    // Each table cell ('c') can contain two properties: 'p' contains
    // formatting and 'v' contains the actual cell value.

    // Loop through each table row.
    rawData.table.rows.forEach(function (row, i) {

      // Proceed if the row has cells and the row index is within the targeted
      // range. (This avoids displaying too many rows when paging data.)
      if (row.c && i < attributes.last) {

        // Get the "real" row index (not counting header rows).
        var counter = stringToNaturalNumber(userOptions.offset + i + 1 - attributes.rowNumberOffset);

        // Create a row object and add it to the output array.
        output.push(createRowObject(counter, row.c.map(getCellValue), labels));

      }

    });

    return output;

  };

  // Append HTML output to DOM.
  var appendHTMLToDOM = function (target, headerHTML, bodyHTML) {

    // Use row group tags (<thead>, <tbody>) if the target is a table.
    if (target.tagName === 'TABLE') {
      var headerElement = env.document.createElement('thead');
      var bodyElement = env.document.createElement('tbody');
      headerElement.innerHTML = headerHTML;
      bodyElement.innerHTML = bodyHTML;
      target.appendChild(headerElement);
      target.appendChild(bodyElement);
    } else {
      target.insertAdjacentHTML('beforeEnd', headerHTML + bodyHTML);
    }

  };

  // Generate HTML from rows using a template.
  var generateHTML = function (userOptions, rows) {

    var template = userOptions.rowTemplate || toHTML;
    var hasDOMTarget = env.dom && userOptions.target;
    var isTable = hasDOMTarget && userOptions.target.tagName === 'TABLE';
    var needsHeader = hasDOMTarget && hasClass(userOptions.target, 'sheetrock-header');
    var headerHTML = '';
    var bodyHTML = '';

    // Pass each row to the row template. Only parse header rows if the target
    // is a table or indicates via className that it wants the header.
    rows.forEach(function (row) {
      if (row.num) {
        bodyHTML += template(row);
      } else if (isTable || needsHeader) {
        headerHTML += template(row);
      }
    });

    if (hasDOMTarget) {
      appendHTMLToDOM(userOptions.target, headerHTML, bodyHTML);
    }

    return (isTable) ? wrapTag(headerHTML, 'thead') + wrapTag(bodyHTML, 'tbody') : headerHTML + bodyHTML;

  };

  // Process API response.
  var processResponse = function (options, rawData) {

    var response = {
      raw: rawData
    };

    try {
      var attributes = response.attributes = getResponseAttributes(options, rawData);
      var rows = response.rows = parseData(options.user, attributes, rawData);
      response.html = generateHTML(options.user, rows);
    } catch (error) {
      handleError('Unexpected API response format.', options, response);
      return;
    }

    if (options.user.callback) {
      options.user.callback(null, options, response);
    }

  };

  // Send a JSON requent.
  var requestJSON = function (options, callback) {

    if (typeof env.request !== 'function') {
      throw 'No HTTP transport available.';
    }

    // There is an issue with new Sheets causing the string ")]}'" to be
    // prepended to the JSON output when the X-DataSource-Auth is added.

    // https://code.google.com/p/google-visualization-api-issues/issues/detail?id=1928

    // Until this is fixed, load as text and manually strip with regex. :(

    var requestOptions = {
      headers: {
        'X-DataSource-Auth': 'true'
      },
      //json: true, <= temporary fix
      url: options.request.url
    };

    var responseCallback = function (responseError, response, body) {
      if (!responseError && response.statusCode === 200) {
        try {
          // Next line is a temporary fix.
          body = JSON.parse(body.replace(/^\)\]\}\'\n/, ''));
          callback(options, body);
        } catch (error) {
          handleError(error, options, {raw: body});
        }
      } else {
        handleError(responseError || 'Request failed.', options);
      }
    };

    env.request(requestOptions, responseCallback);

  };

  // Send a JSONP requent.
  var requestJSONP = function (options, callback) {

    var always;
    var success;
    var error;
    var headElement = env.document.getElementsByTagName('head')[0];
    var scriptElement = env.document.createElement('script');
    var callbackName = '_sheetrock_callback_' + jsonpCallbackIndex;

    always = function () {
      if (scriptElement.removeEventListener) {
        scriptElement.removeEventListener('error', error, false);
        scriptElement.removeEventListener('abort', error, false);
      }
      headElement.removeChild(scriptElement);
      delete root[callbackName];
    };

    success = function (data) {
      try {
        callback(options, data);
      } catch (error) {
        handleError(error, options, {raw: data});
      } finally {
        always();
      }
    };

    error = function () {
      handleError('Request failed.', options);
      always();
    };

    root[callbackName] = success;

    options.request.url = options.request.url.replace('%callback%', callbackName);

    if (scriptElement.addEventListener) {
      scriptElement.addEventListener('error', error, false);
      scriptElement.addEventListener('abort', error, false);
    }

    scriptElement.type = 'text/javascript';
    scriptElement.src = options.request.url;
    headElement.appendChild(scriptElement);

    jsonpCallbackIndex = jsonpCallbackIndex + 1;

  };

  // Build a request URL using the user's options.
  var buildRequestURL = function (options) {

    var query = [
      'gid=' + encodeURIComponent(options.request.gid),
      'tq=' + encodeURIComponent(options.request.query)
    ];

    if (env.dom) {
      query.push('tqx=responseHandler:%callback%');
    }

    return options.request.apiEndpoint + query.join('&');

  };

  // Fetch data using the appropriate transport.
  var fetchData = function (options, callback) {

    options.request.url = buildRequestURL(options);

    if (env.dom) {
      requestJSONP(options, callback);
    } else {
      requestJSON(options, callback);
    }

  };


  /* API */

  // Documentation is available at:
  // https://github.com/chriszarate/sheetrock/

  var defaults = {
    url:          '',          // String  -- Google Sheet URL
    query:        '',          // String  -- Google Visualization API query
    target:       null,        // DOM Element -- An element to append output to
    fetchSize:    0,           // Integer -- Number of rows to fetch (0 = all)
    labels:       [],          // Array   -- Override *returned* column labels
    rowTemplate:  null,        // Function / Template
    callback:     null,        // Function
    reset:        false        // Boolean -- Reset request status
  };

  var sheetrock = function (options, bootstrappedData) {

    try {

      options = extendDefaults(defaults, options || {});
      options = processUserOptions(this, options);
      options = validateOptions(options);

      updateEnvironment();

      if (bootstrappedData) {
        processResponse(options, bootstrappedData);
      } else {
        fetchData(options, processResponse);
      }

    } catch (error) {
      handleError(error, options);
    }

    return this;

  };

  sheetrock.defaults = defaults;
  sheetrock.version = '1.0.1';
  sheetrock.environment = env;

  // If jQuery is available as a global, register as a plugin.
  if (env.jquery) {
    root.jQuery.fn.sheetrock = sheetrock;
  }

  return sheetrock;

}));
