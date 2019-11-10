/**
 * jQuery-csv (jQuery Plugin)
 * version: 0.64 (2012-10-06)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Acknowledgements:
 * This plugin was originally designed to assist in parsing CSV files loaded
 * from client-side javascript. It's influenced by jQuery.json and the original
 *
 * The original core RegEx comes directly from the following answer posted by a
 * StackOverflow.com user named Ridgerunner.
 * Source:
 * - http://stackoverflow.com/q/8493195/290340
 *
 * A special thanks goes out to rwk@acm.org for providing a lot of valuable
 * feedback to the project including the core for the new FSM
 * (Finite State Machine) parser. If you're looking for a stable TSV parser
 * take a look at jquery-tsv (http://code.google.com/p/jquery-tsv/).
 *
 * Experimental:
 * A new line splitting function has been added that can properly handle values
 * that contain newlines. To enable it, set the experimental parameter to true
 * in the options.

 * For legal purposes I'll include the "NO WARRANTY EXPRESSED OR IMPLIED.
 * USE AT YOUR OWN RISK.". Which, in 'layman's terms' means, by using this
 * library you are accepting responsibility if it breaks your code.
 *
 * Legal jargon aside, I will do my best to provide a useful and stable core
 * that can effectively be built on.
 *
 * Copyrighted 2012 by Evan Plaice.
 */

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

(function( $ ) {
  'use strict'
  /**
   * jQuery.csv.defaults
   * Encapsulates the method paramater defaults for the CSV plugin module.
   */

  $.csv = {
    defaults: {
      separator:',',
      delimiter:'"',
      escaper:'"',
      skip:0,
      headerLine:1,
      dataLine:2
    },

    splitLines: function(csv, delimiter) {
      var state = 0;
      var value = "";
      var line = "";
      var lines = [];
      function endOfRow() {
        lines.push(value);
        value = "";
        state = 0;
      };
      csv.replace(/(\"|\n|\r|[^\"\r\n]+)/gm, function (m0){
        switch (state) {
          // the start of an entry
          case 0:
            if (m0 === "\"") {
              state = 1;
            } else if (m0 === "\n") {
              endOfRow();
            } else if (/^\r$/.test(m0)) {
              // carriage returns are ignored
            } else {
              if (value) {
                throw new Error("Illegal initial state");
              }
              value = m0;
              state = 3;
            }
            break;
          // delimited input  
          case 1:
            if (m0 === "\"") {
              state = 2;
            } else if ((m0 === "\n") || (m0 === "\r")) {
              value += m0;
              state = 1;
            } else {
              value += m0;
              state = 1;
            }
            break;
          // delimiter found in delimited input
          case 2:
            // is the delimiter escaped?
            if (m0 === "\"" && value.substr(value.length - 1) === "\"") {
              value += m0;
              state = 1;
            } else if (m0 === ",") {
              value += m0;
              state = 0;
            } else if (m0 === "\n") {
              endOfRow();
            } else if (m0 === "\r") {
            } else {
              throw new Error("Illegal state");
            }
            break;
          // un-delimited input
          case 3:
            if (m1 === "\"") {
              throw new Error("Unquoted delimiter found in string");
            } else if (m0 === "\n") {
              endOfRow();
            } else if (m0 === "\r") {
              // Ignore
            } else {
              throw new Error("Two values, no separator?");
            }
              break;
          default:
            throw new Error("Unknown state");
        }
        return "";
      });
      if (state != 0) {
        endOfRow();
      }
      return lines;
    },

    /**
     * $.csv.toArray(csv)
     * Converts a CSV entry string to a javascript array.
     *
     * @param {Array} csv The string containing the CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Character} [escaper] An override for the escaper character. Defaults to a a double-quote(").
     *
     * This method deals with simple CSV strings only. It's useful if you only
     * need to parse a single entry. If you need to parse more than one line,
     * use $.csv2Array instead.
     */
    toArray: function(csv, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? RegExp.escape(options.separator) : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? RegExp.escape(options.delimiter) : $.csv.defaults.delimiter;
      config.escaper = 'escaper' in options ? RegExp.escape(options.escaper) : $.csv.defaults.escaper;

      // parse a csv entry into values
      // matches 1. empty values | 2. delimited values | non-delimited values
      if(options.reValue === undefined){
        var reValue = /(?!\s*$)\s*(?:Y([^YZ]*(?:ZY[^YZ]*)*)Y|([^XYZ\s]*(?:\s+[^XYZ\s]+)*))\s*(?:X|$)/;
        var reValueSrc = reValue.source;
        reValueSrc = reValueSrc.replace(/X/g, config.separator);
        reValueSrc = reValueSrc.replace(/Y/g, config.delimiter);
        reValueSrc = reValueSrc.replace(/Z/g, config.escaper);
        options.reValue = RegExp(reValueSrc, 'g');
      }
      
      // matches escaped delimiters, the default being double-double quotes (ex "")
      if(options.reUnescape === undefined) {
        var reUnescape = /ED/;
        var reUnescapeSrc = reUnescape.source;
        reUnescapeSrc = reUnescapeSrc.replace(/E/, config.escaper);
        reUnescapeSrc = reUnescapeSrc.replace(/D/, config.delimiter);
        options.reUnescape = RegExp(reUnescapeSrc, 'g');
      }
      
      // matches empty last values (ex "val",)
      if(options.reEmptyLast === undefined) {
        var reEmptyLast = /S\s*$/;
        options.reEmptyLast = RegExp(reEmptyLast.source.replace(/S/, config.separator));
      }
      
      // return an empty string for empty values
      if (csv === "") {
        if(!config.callback) {
          return output;
        } else {
          config.callback('', output);
        }
      }

      var reValue = options.reValue;
      var reUnescape = options.reUnescape;
      var reEmptyLast = options.reEmptyLast;
      
      // "Walk" the string and extract the data
      var output = [];
      csv.replace(reValue, function(m0, m1, m2) {
        if(typeof m1 === 'string' && m1.length) { // Fix: evaluates to false for both empty strings and undefined
          output.push(m1.replace(reUnescape, config.delimiter));
        } else if (typeof m1 === 'string' && m1.length === 0) { // Fix: handles empty delimited strings
          output.push('');
        } else if(m2 !== undefined) {
          output.push(m2);
        }
        return '';
      });

      // Handle special case of empty last value
      if (reEmptyLast.test(csv)) {
        output.push('');
      }

      if(!config.callback) {
        return output;
      } else {
        config.callback('', output);
      }
    },

    /**
     * $.csv.toArrays(csv)
     * Converts a CSV string to a javascript array.
     *
     * @param {String} csv The string containing the raw CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Character} [escaper] An override for the escaper character. Defaults to a a double-quote(").
     * @param {Integer} [skip] The number of lines that need to be skipped before the parser starts. Defaults to 0.
     *
     * This method deals with multi-line CSV. The breakdown is simple. The first
     * dimension of the array represents the line (or entry/row) while the second
     * dimension contains the values (or values/columns).
     */
    toArrays: function(csv, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.escaper = 'escaper' in options ? options.escaper : $.csv.defaults.escaper;
      config.skip = 'skip' in options ? options.skip : $.csv.defaults.skip;
      config.experimental = 'experimental' in options ? options.experimental : false;

      var lines = [];
      var output = [];
      var options = {
        delimiter: config.delimiter,
        separator: config.separator,
        escaper: config.escaper,
      };

      if(!config.experimental) {
        lines = csv.split(/\r\n|\r|\n/g);
      } else {
        lines = $.csv.splitLines(csv, config.delimiter);
      }

      for(var i in lines) {
        if(i < config.skip) {
          continue;
        }
        // process each value
        var entry = $.csv.toArray(lines[i], options);
        output.push(entry);
      }

      if(!config.callback) {
        return output;
      } else {
        config.callback("", output);
      }
    },

    /**
     * $.csv.toObjects(csv)
     * Converts a CSV string to a javascript object.
     * @param {String} csv The string containing the raw CSV data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Character} [escaper] An override for the escaper character. Defaults to a a double-quote(").
     * @param {Integer} [headerLine] The line in the file that contains the header data. Defaults to 1 (1-based counting).
     * @param {Integer} [dataLine] The line where the data values start. Defaults to 2 (1-based counting).
     *
     * This method deals with multi-line CSV strings. Where the headers line is
     * used as the key for each value per entry.
     */
    toObjects: function(csv, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.escaper = 'escaper' in options ? options.escaper : $.csv.defaults.escaper;
      config.headerLine = 'headerLine' in options ? options.headerLine : $.csv.defaults.headerLine;
      config.dataLine = 'dataLine' in options ? options.dataLine : $.csv.defaults.dataLine;
      config.experimental = 'experimental' in options ? options.experimental : false;

      var lines = [];
      var output = [];
      var options = {
        delimiter: config.delimiter,
        separator: config.separator,
        escaper: config.escaper,
      };

      if(!config.experimental) {
        lines = csv.split(/\r\n|\r|\n/g);
      } else {
        lines = this.splitLines(csv, config.delimiter);
      }

      // fetch the headers
      var headers = $.csv.toArray(lines[(config.headerLine - 1)]);
      // process the data
      for(var i in lines) {
        if(i < (config.dataLine - 1)) {
          continue;
        }
        // process each value
        var entry = $.csv.toArray(lines[i], options);
        var object = {};
        for(var j in headers) {
          object[headers[j]] = entry[j];
        }
        output.push(object);
      }

      if(!config.callback) {
        return output;
      } else {
        config.callback("", output);
      }
    },

     /**
     * $.csv.fromArrays(arrays)
     * Converts a javascript array to a CSV String.
     *
     * @param {Array} array An array containing an array of CSV entries.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Character} [escaper] An override for the escaper character. Defaults to a a double-quote(").
     *
     * This method generates a CSV file from an array of arrays (representing entries).
     */
    fromArrays: function(arrays, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.escaper = 'escaper' in options ? options.escaper : $.csv.defaults.escaper;
      config.experimental = 'experimental' in options ? options.experimental : false;

      if(!config.experimental) {
        throw new Error("not implemented");
      }

      var output = [];
      for(i in arrays) {
        output.push(arrays[i]);
      }

      if(!config.callback) {
        return output;
      } else {
        config.callback("", output);
      }
    },

    /**
     * $.csv.fromObjects(objects)
     * Converts a javascript dictionary to a CSV string.
     * @param {Object} objects An array of objects containing the data.
     * @param {Object} [options] An object containing user-defined options.
     * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
     * @param {Character} [delimiter] An override for the delimiter character. Defaults to a double-quote(").
     * @param {Character} [escaper] An override for the escaper character. Defaults to a a double-quote(").
     *
     * This method generates a CSV file from an array of objects (name:value pairs).
     * It starts by detecting the headers and adding them as the first line of
     * the CSV file, followed by a structured dump of the data.
     */
    fromObjects2CSV: function(objects, options, callback) {
      var options = (options !== undefined ? options : {});
      var config = {};
      config.callback = ((callback !== undefined && typeof(callback) === 'function') ? callback : false);
      config.separator = 'separator' in options ? options.separator : $.csv.defaults.separator;
      config.delimiter = 'delimiter' in options ? options.delimiter : $.csv.defaults.delimiter;
      config.escaper = 'escaper' in options ? options.escaper : $.csv.defaults.escaper;
      config.experimental = 'experimental' in options ? options.experimental : false;

      if(!config.experimental) {
        throw new Error("not implemented");
      }

      var output = [];
      for(i in objects) {
        output.push(arrays[i]);
      }

      if(!config.callback) {
        return output;
      } else {
        config.callback("", output);
      }
    }
  };

  // Maintenance code to maintain backward-compatibility
  // Will be removed in release 1.0
  $.csvEntry2Array = $.csv.toArray;
  $.csv2Array = $.csv.toArrays;
  $.csv2Dictionary = $.csv.toObjects;

})( jQuery );
