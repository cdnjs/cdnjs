(function() {
  'use strict';

  var inNodeJS = typeof process !== 'undefined' && !process.browser;

  var request = function requestNotProvided() {
    throw new Error("The 'request' module is only available while running in Node.");
  };
  if(inNodeJS) { // This will get stripped out by Uglify, and Webpack will not include it
    request = require('request');
  }

  var supportsCORS = false;
  var inLegacyIE = false;
  try {
    var testXHR = new XMLHttpRequest();
    if (typeof testXHR.withCredentials !== 'undefined') {
      supportsCORS = true;
    } else {
      if ('XDomainRequest' in window) {
        supportsCORS = true;
        inLegacyIE = true;
      }
    }
  } catch (e) { }

  // Create a simple indexOf function for support
  // of older browsers.  Uses native indexOf if
  // available.  Code similar to underscores.
  // By making a separate function, instead of adding
  // to the prototype, we will not break bad for loops
  // in older browsers
  var indexOfProto = Array.prototype.indexOf;
  var ttIndexOf = function(array, item) {
    var i = 0, l = array.length;

    if (indexOfProto && array.indexOf === indexOfProto) {
      return array.indexOf(item);
    }

    for (; i < l; i++) {
      if (array[i] === item) {
        return i;
      }
    }
    return -1;
  };

  /*
    Initialize with Tabletop.init( { key: '0AjAPaAU9MeLFdHUxTlJiVVRYNGRJQnRmSnQwTlpoUXc' } )
      OR!
    Initialize with Tabletop.init( { key: 'https://docs.google.com/spreadsheet/pub?hl=en_US&hl=en_US&key=0AjAPaAU9MeLFdHUxTlJiVVRYNGRJQnRmSnQwTlpoUXc&output=html&widget=true' } )
      OR!
    Initialize with Tabletop.init('0AjAPaAU9MeLFdHUxTlJiVVRYNGRJQnRmSnQwTlpoUXc')
  */

  var Tabletop = function(options) {
    // Make sure Tabletop is being used as a constructor no matter what.
    if(!this || !(this instanceof Tabletop)) {
      return new Tabletop(options);
    }

    if(typeof(options) === 'string') {
      options = { key : options };
    }

    this.callback = options.callback;
    this.wanted = options.wanted || [];
    this.key = options.key;
    this.simpleSheet = !!options.simpleSheet;
    this.parseNumbers = !!options.parseNumbers;
    this.wait = !!options.wait;
    this.reverse = !!options.reverse;
    this.postProcess = options.postProcess;
    this.debug = !!options.debug;
    this.query = options.query || '';
    this.orderby = options.orderby;
    this.endpoint = options.endpoint || 'https://spreadsheets.google.com';
    this.singleton = !!options.singleton;
    this.simpleUrl = !!(options.simpleUrl || options.simple_url); //jshint ignore:line
    this.authkey = options.authkey;
    this.sheetPrivacy = this.authkey ? 'private' : 'public'

    this.callbackContext = options.callbackContext;
    // Default to on, unless there's a proxy, in which case it's default off
    this.prettyColumnNames = typeof(options.prettyColumnNames) === 'undefined' ? !options.proxy : options.prettyColumnNames;

    if(typeof(options.proxy) !== 'undefined') {
      // Remove trailing slash, it will break the app
      this.endpoint = options.proxy.replace(/\/$/,'');
      this.simpleUrl = true;
      this.singleton = true;
      // Let's only use CORS (straight JSON request) when
      // fetching straight from Google
      supportsCORS = false;
    }

    this.parameterize = options.parameterize || false;

    if (this.singleton) {
      if (typeof(Tabletop.singleton) !== 'undefined') {
        this.log('WARNING! Tabletop singleton already defined');
      }
      Tabletop.singleton = this;
    }

    /* Be friendly about what you accept */
    if (/key=/.test(this.key)) {
      this.log('You passed an old Google Docs url as the key! Attempting to parse.');
      this.key = this.key.match('key=(.*?)(&|#|$)')[1];
    }

    if (/pubhtml/.test(this.key)) {
      this.log('You passed a new Google Spreadsheets url as the key! Attempting to parse.');
      this.key = this.key.match('d\\/(.*?)\\/pubhtml')[1];
    }

    if(/spreadsheets\/d/.test(this.key)) {
      this.log('You passed the most recent version of Google Spreadsheets url as the key! Attempting to parse.');
      this.key = this.key.match('d\\/(.*?)\/')[1];
    }

    if (!this.key) {
      this.log('You need to pass Tabletop a key!');
      return;
    }

    this.log('Initializing with key ' + this.key);

    this.models = {};
    this.modelNames = [];
    this.model_names = this.modelNames; //jshint ignore:line

    this.baseJsonPath = '/feeds/worksheets/' + this.key + '/' + this.sheetPrivacy +'/basic?alt=';

    if (inNodeJS || supportsCORS) {
      this.baseJsonPath += 'json';
    } else {
      this.baseJsonPath += 'json-in-script';
    }

    if(!this.wait) {
      this.fetch();
    }
  };

  // A global storage for callbacks.
  Tabletop.callbacks = {};

  // Backwards compatibility.
  Tabletop.init = function(options) {
    return new Tabletop(options);
  };

  Tabletop.sheets = function() {
    this.log('Times have changed! You\'ll want to use var tabletop = Tabletop.init(...); tabletop.sheets(...); instead of Tabletop.sheets(...)');
  };

  Tabletop.prototype = {

    fetch: function(callback) {
      if (typeof(callback) !== 'undefined') {
        this.callback = callback;
      }
      this.requestData(this.baseJsonPath, this.loadSheets);
    },

    /*
      This will call the environment appropriate request method.

      In browser it will use JSON-P, in node it will use request()
    */
    requestData: function(path, callback) {
      this.log('Requesting', path);

      if (inNodeJS) {
        this.serverSideFetch(path, callback);
      } else {
        //CORS only works in IE8/9 across the same protocol
        //You must have your server on HTTPS to talk to Google, or it'll fall back on injection
        var protocol = this.endpoint.split('//').shift() || 'http';
        if (supportsCORS && (!inLegacyIE || protocol === location.protocol)) {
          this.xhrFetch(path, callback);
        } else {
          this.injectScript(path, callback);
        }
      }
    },

    /*
      Use Cross-Origin XMLHttpRequest to get the data in browsers that support it.
    */
    xhrFetch: function(path, callback) {
      //support IE8's separate cross-domain object
      var xhr = inLegacyIE ? new XDomainRequest() : new XMLHttpRequest();
      xhr.open('GET', this.endpoint + path);
      var self = this;
      xhr.onload = function() {
        var json;
        try {
          json = JSON.parse(xhr.responseText);
        } catch (e) {
          console.error(e);
        }
        callback.call(self, json);
      };
      xhr.send();
    },

    /*
      Insert the URL into the page as a script tag. Once it's loaded the spreadsheet data
      it triggers the callback. This helps you avoid cross-domain errors
      http://code.google.com/apis/gdata/samples/spreadsheet_sample.html

      Let's be plain-Jane and not use jQuery or anything.
    */
    injectScript: function(path, callback) {
      var script = document.createElement('script');
      var callbackName;

      if (this.singleton) {
        if (callback === this.loadSheets) {
          callbackName = 'Tabletop.singleton.loadSheets';
        } else if (callback === this.loadSheet) {
          callbackName = 'Tabletop.singleton.loadSheet';
        }
      } else {
        var self = this;
        callbackName = 'tt' + (+new Date()) + (Math.floor(Math.random()*100000));
        // Create a temp callback which will get removed once it has executed,
        // this allows multiple instances of Tabletop to coexist.
        Tabletop.callbacks[ callbackName ] = function () {
          var args = Array.prototype.slice.call( arguments, 0 );
          callback.apply(self, args);
          script.parentNode.removeChild(script);
          delete Tabletop.callbacks[callbackName];
        };
        callbackName = 'Tabletop.callbacks.' + callbackName;
      }

      var url = path + '&callback=' + callbackName;

      if (this.simpleUrl) {
        // We've gone down a rabbit hole of passing injectScript the path, so let's
        // just pull the sheet_id out of the path like the least efficient worker bees
        if(path.indexOf('/list/') !== -1) {
          script.src = this.endpoint + '/' + this.key + '-' + path.split('/')[4];
        } else {
          script.src = this.endpoint + '/' + this.key;
        }
      } else {
        script.src = this.endpoint + url;
      }

      if (this.parameterize) {
        script.src = this.parameterize + encodeURIComponent(script.src);
      }

      this.log('Injecting', script.src);

      document.getElementsByTagName('script')[0].parentNode.appendChild(script);
    },

    /*
      This will only run if tabletop is being run in node.js
    */
    serverSideFetch: function(path, callback) {
      var self = this;

      this.log('Fetching', this.endpoint + path);
      request({url: this.endpoint + path, json: true}, function(err, resp, body) {
        if (err) {
          return console.error(err);
        }
        callback.call(self, body);
      });
    },

    /*
      Is this a sheet you want to pull?
      If { wanted: ["Sheet1"] } has been specified, only Sheet1 is imported
      Pulls all sheets if none are specified
    */
    isWanted: function(sheetName) {
      if (this.wanted.length === 0) {
        return true;
      } else {
        return (ttIndexOf(this.wanted, sheetName) !== -1);
      }
    },

    /*
      What gets send to the callback
      if simpleSheet === true, then don't return an array of Tabletop.this.models,
      only return the first one's elements
    */
    data: function() {
      // If the instance is being queried before the data's been fetched
      // then return undefined.
      if (this.modelNames.length === 0) {
        return undefined;
      }
      if (this.simpleSheet) {
        if (this.modelNames.length > 1 && this.debug) {
          this.log('WARNING You have more than one sheet but are using simple sheet mode! Don\'t blame me when something goes wrong.');
        }
        return this.models[this.modelNames[0]].all();
      } else {
        return this.models;
      }
    },

    /*
      Add another sheet to the wanted list
    */
    addWanted: function(sheet) {
      if(ttIndexOf(this.wanted, sheet) === -1) {
        this.wanted.push(sheet);
      }
    },

    /*
      Load all worksheets of the spreadsheet, turning each into a Tabletop Model.
      Need to use injectScript because the worksheet view that you're working from
      doesn't actually include the data. The list-based feed (/feeds/list/key..) does, though.
      Calls back to loadSheet in order to get the real work done.

      Used as a callback for the worksheet-based JSON
    */
    loadSheets: function(data) {
      var i, ilen;
      var toLoad = [];
      this.googleSheetName = data.feed.title.$t;
      this.foundSheetNames = [];

      for (i = 0, ilen = data.feed.entry.length; i < ilen ; i++) {
        this.foundSheetNames.push(data.feed.entry[i].title.$t);
        // Only pull in desired sheets to reduce loading
        if (this.isWanted(data.feed.entry[i].content.$t)) {
          var linkIdx = data.feed.entry[i].link.length-1;
          var sheetId = data.feed.entry[i].link[linkIdx].href.split('/').pop();
          var jsonPath = '/feeds/list/' + this.key + '/' + sheetId + '/' + this.sheetPrivacy + '/values?alt=';
          if (inNodeJS || supportsCORS) {
            jsonPath += 'json';
          } else {
            jsonPath += 'json-in-script';
          }
          if (this.query) {
            // Query Language Reference (0.7)
            jsonPath += '&tq=' + this.query;
          }
          if (this.orderby) {
            jsonPath += '&orderby=column:' + this.orderby.toLowerCase();
          }
          if (this.reverse) {
            jsonPath += '&reverse=true';
          }
          toLoad.push(jsonPath);
        }
      }

      this.sheetsToLoad = toLoad.length;
      for(i = 0, ilen = toLoad.length; i < ilen; i++) {
        this.requestData(toLoad[i], this.loadSheet);
      }
    },

    /*
      Access layer for the this.models
      .sheets() gets you all of the sheets
      .sheets('Sheet1') gets you the sheet named Sheet1
    */
    sheets: function(sheetName) {
      if (typeof sheetName === 'undefined') {
        return this.models;
      } else {
        if (typeof(this.models[sheetName]) === 'undefined') {
          // alert( "Can't find " + sheetName );
          return;
        } else {
          return this.models[sheetName];
        }
      }
    },

    sheetReady: function(model) {
      this.models[model.name] = model;
      if (ttIndexOf(this.modelNames, model.name) === -1) {
        this.modelNames.push(model.name);
      }

      this.sheetsToLoad--;
      if (this.sheetsToLoad === 0) {
        this.doCallback();
      }
    },

    /*
      Parse a single list-based worksheet, turning it into a Tabletop Model

      Used as a callback for the list-based JSON
    */
    loadSheet: function(data) {
      var that = this;
      new Tabletop.Model({
        data: data,
        parseNumbers: this.parseNumbers,
        postProcess: this.postProcess,
        tabletop: this,
        prettyColumnNames: this.prettyColumnNames,
        onReady: function() {
          that.sheetReady(this);
        }
      });
    },

    /*
      Execute the callback upon loading! Rely on this.data() because you might
        only request certain pieces of data (i.e. simpleSheet mode)
      Tests this.sheetsToLoad just in case a race condition happens to show up
    */
    doCallback: function() {
      if(this.sheetsToLoad === 0) {
        this.callback.apply(this.callbackContext || this, [this.data(), this]);
      }
    },

    log: function() {
      if(this.debug) {
        if(typeof console !== 'undefined' && typeof console.log !== 'undefined') {
          Function.prototype.apply.apply(console.log, [console, arguments]);
        }
      }
    }

  };

  /*
    Tabletop.Model stores the attribute names and parses the worksheet data
      to turn it into something worthwhile

    Options should be in the format { data: XXX }, with XXX being the list-based worksheet
  */
  Tabletop.Model = function(options) {
    var i, j, ilen, jlen;
    this.columnNames = [];
    this.column_names = this.columnNames; // jshint ignore:line
    this.name = options.data.feed.title.$t;
    this.tabletop = options.tabletop;
    this.elements = [];
    this.onReady = options.onReady;
    this.raw = options.data; // A copy of the sheet's raw data, for accessing minutiae

    if (typeof(options.data.feed.entry) === 'undefined') {
      options.tabletop.log('Missing data for ' + this.name + ', make sure you didn\'t forget column headers');
      this.originalColumns = [];
      this.elements = [];
      this.onReady.call(this);
      return;
    }

    for (var key in options.data.feed.entry[0]){
      if (/^gsx/.test(key)) {
        this.columnNames.push(key.replace('gsx$',''));
      }
    }

    this.originalColumns = this.columnNames;
    this.original_columns = this.originalColumns; // jshint ignore:line

    for (i = 0, ilen =  options.data.feed.entry.length ; i < ilen; i++) {
      var source = options.data.feed.entry[i];
      var element = {};
      for (j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
        var cell = source['gsx$' + this.columnNames[j]];
        if (typeof(cell) !== 'undefined') {
          if (options.parseNumbers && cell.$t !== '' && !isNaN(cell.$t)) {
            element[this.columnNames[j]] = +cell.$t;
          } else {
            element[this.columnNames[j]] = cell.$t;
          }
        } else {
          element[this.columnNames[j]] = '';
        }
      }
      if (element.rowNumber === undefined) {
        element.rowNumber = i + 1;
      }

      if (options.postProcess) {
        options.postProcess(element);
      }

      this.elements.push(element);
    }

    if (options.prettyColumnNames) {
      this.fetchPrettyColumns();
    } else {
      this.onReady.call(this);
    }
  };

  Tabletop.Model.prototype = {
    /*
      Returns all of the elements (rows) of the worksheet as objects
    */
    all: function() {
      return this.elements;
    },

    fetchPrettyColumns: function() {
      if (!this.raw.feed.link[3]) {
        return this.ready();
      }

      var cellurl = this.raw.feed.link[3].href.replace('/feeds/list/', '/feeds/cells/').replace('https://spreadsheets.google.com', '');
      var that = this;
      this.tabletop.requestData(cellurl, function(data) {
        that.loadPrettyColumns(data);
      });
    },

    ready: function() {
      this.onReady.call(this);
    },

    /*
     * Store column names as an object
     * with keys of Google-formatted "columnName"
     * and values of human-readable "Column name"
     */
    loadPrettyColumns: function(data) {
      var prettyColumns = {};

      var columnNames = this.columnNames;

      var i = 0;
      var l = columnNames.length;

      for (; i < l; i++) {
        if (typeof data.feed.entry[i].content.$t !== 'undefined') {
          prettyColumns[columnNames[i]] = data.feed.entry[i].content.$t;
        } else {
          prettyColumns[columnNames[i]] = columnNames[i];
        }
      }

      this.prettyColumns = prettyColumns;
      this.pretty_columns = this.prettyColumns; // jshint ignore:line
      this.prettifyElements();
      this.ready();
    },

    /*
     * Go through each row, substitutiting
     * Google-formatted "columnName"
     * with human-readable "Column name"
     */
    prettifyElements: function() {
      var prettyElements = [],
          orderedPrettyNames = [],
          i, j, ilen, jlen;

      for (j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
        orderedPrettyNames.push(this.prettyColumns[this.columnNames[j]]);
      }

      for (i = 0, ilen = this.elements.length; i < ilen; i++) {
        var newElement = {};
        for (j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
          var newColumnName = this.prettyColumns[this.columnNames[j]];
          newElement[newColumnName] = this.elements[i][this.columnNames[j]];
        }
        prettyElements.push(newElement);
      }
      this.elements = prettyElements;
      this.columnNames = orderedPrettyNames;
    },

    /*
      Return the elements as an array of arrays, instead of an array of objects
    */
    toArray: function() {
      var array = [],
          i, j, ilen, jlen;
      for (i = 0, ilen = this.elements.length; i < ilen; i++) {
        var row = [];
        for (j = 0, jlen = this.columnNames.length; j < jlen ; j++) {
          row.push(this.elements[i][ this.columnNames[j]]);
        }
        array.push(row);
      }

      return array;
    }
  };

  if(typeof module !== 'undefined' && module.exports) { //don't just use inNodeJS, we may be in Browserify
    module.exports = Tabletop;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return Tabletop;
    });
  } else {
    window.Tabletop = Tabletop;
  }

})();
