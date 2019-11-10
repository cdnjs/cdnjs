/**
 * jQuery-csv (jQuery Plugin)
 * version: 0.51 (2012-04-26)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * This plugin was originally designed to assist in parsing CSV files loaded
 * from client-side javascript. It's influenced by jQuery.json and the original
 * core RegEx comes directly from the following answer posted by a
 * StackOverflow.com user named Ridgerunner.
 * Source:
 * - http://stackoverflow.com/q/8493195/290340
 *
 * For legal purposes I'll include the "NO WARRANTY EXPRESSED OR IMPLIED.
 * USE AT YOUR OWN RISK.". Which, in 'layman's terms' means, by using this
 * library you are accepting responsability if it breaks your code.
 *
 * Legal jargon aside, I will do my best to provide a useful and stable core
 * that can effectively be built on.
 *
 * Copyrighted 2012 by Evan Plaice.
 */

(function( $ ) {
  /**
   * jQuery.csv.defaults
   * Encapsulates the method paramater defaults for the CSV plugin module.
   */
  $.csvDefaults = {
    separator:',',
    delimiter:'"',
    skip:0,
    headerLine:1,
    dataLine:2
  };

  /**
   * jQuery.csvEntry2Array(csv)
   * Converts a CSV string to a javascript array.
   *
   * @param {Array} csv The string containing the CSV data.
   * @param {Object} [meta] The dictionary where the meta variables (ie separator, delimiter) are defined. Defaults to an empty object ({}).
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a quote(').
   *
   * This method deals with simple CSV strings only. It's useful if you only
   * need to parse a single entry. If you need to parse more than one line,
   * use $.csv2Array instead.
   */
  $.csvEntry2Array = function(csv, meta) {
    var meta = (meta !== undefined ? meta : {});
    var separator = 'separator' in meta ? meta.separator : $.csvDefaults.separator;
    var delimiter = 'delimiter' in meta ? meta.delimiter : $.csvDefaults.delimiter;

    // build the CSV validator regex
    var reValid = /^\s*(?:D[^D\\]*(?:\\[\S\s][^D\\]*)*D|[^SD\s\\]*(?:\s+[^SD\s\\]+)*)\s*(?:S\s*(?:D[^D\\]*(?:\\[\S\s][^D\\]*)*D|[^SD\s\\]*(?:\s+[^SD\s\\]+)*)\s*)*$/;
    reValid = RegExp(reValid.source.replace(/S/g, separator));
    reValid = RegExp(reValid.source.replace(/D/g, delimiter));

    // build the CSV line parser regex
    var reValue = /(?!\s*$)\s*(?:D([^D\\]*(?:\\[\S\s][^D\\]*)*)D|([^SD\s\\]*(?:\s+[^SD\s\\]+)*))\s*(?:S|$)/g;
    reValue = RegExp(reValue.source.replace(/S/g, separator), 'g');
    reValue = RegExp(reValue.source.replace(/D/g, delimiter), 'g');

    // Return NULL if input string is not well formed CSV string.
    if (!reValid.test(csv)) {
      return null;
    }

    // "Walk" the string using replace with callback.
    var output = [];
    csv.replace(reValue, function(m0, m1, m2) {
      // Remove backslash from any delimiters in the value
      if (m1 !== undefined) {
        var reDelimiterUnescape = /\\D/g;              
        reDelimiterUnescape = RegExp(reDelimiterUnescape.source.replace(/D/, delimiter), 'g');
        output.push(m1.replace(reDelimiterUnescape, delimiter));
      } else if (m2 !== undefined) { 
        output.push(m2);
      }
      return '';
    });

    // Handle special case of empty last value.
    var reEmptyLast = /S\s*$/;
    reEmptyLast = RegExp(reEmptyLast.source.replace(/S/, separator));
    if (reEmptyLast.test(csv)) {
      output.push('');
    }
    
    return output;
  };

  /**
   * jQuery.array2CSVEntry(array)
   * Converts a javascript array to a CSV String.
   *
   * @param {Array} array The array containing the CSV data.
   * @param {Object} [meta] The dictionary where the meta variables (ie separator, delimiter) are defined. Defaults to an empty object ({}).
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a quote(').
   *
   * This method deals with simple CSV arrays only. It's useful if you only
   * need to convert a single entry. If you need to convert more than one line,
   * use $.csv2Array instead.
   */
  $.array2CSVEntry = function(array, meta) {
    var meta = (meta !== undefined ? meta : {});
    var separator = 'separator' in meta ? meta.separator : $.csvDefaults.separator;
    var delimiter = 'delimiter' in meta ? meta.delimiter : $.csvDefaults.delimiter;
    
    var output = [] 
    for(i in array) {
      output.push(array[i]);
    }
    
    return output;
  };

  /**
   * jQuery.csv2Array(csv)
   * Converts a CSV string to a javascript array.
   *
   * @param {String} csv The string containing the raw CSV data.
   * @param {Object} [meta] The dictionary where the meta variables (ie separator, delimiter, skip) are defined. Defaults to an empty object ({}).
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a quote(').
   * @param {Integer} [skip] The number of lines that need to be skipped before the parser starts. Defaults to 0. 
   *
   * This method deals with multi-line CSV. The breakdown is simple. The first
   * dimension of the array represents the line (or entry/row) while the second
   * dimension contains the values (or values/columns).
	 */
  $.csv2Array = function(csv, meta) {
    var meta = (meta !== undefined ? meta : {});
    var separator = 'separator' in meta ? meta.separator : $.csvDefaults.separator;
    var delimiter = 'delimiter' in meta ? meta.delimiter : $.csvDefaults.delimiter;
    var skip = 'skip' in meta ? meta.skip : $.csvDefaults.skip;

    // process by line
    var lines = csv.split(/\r\n|\r|\n/g);
    var output = [];
    for(var i in lines) {
      if(i < skip) {
        continue;
      }
      // process each value
      var line = $.csvEntry2Array(lines[i], {
        delimiter: delimiter,
        separator: separator
      });
      output.push(line);
    }

    return output;
  };

  /**
   * jQuery.array2CSV(array)
   * Converts a CSV array to a javascript string.
   *
   * @param {Array} csv The array containing the CSV data.
   * @param {Object} [meta] The dictionary where the meta variables (ie separator, delimiter, skip) are defined. Defaults to an empty object ({}).
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a quote(').
   * @param {Integer} [skip] The number of lines that need to be skipped before the parser starts. Defaults to 0. 
   *
   * This method dimensional multi-line CSV arrays. The breakdown is simple.
   * The first dimension of the array gets mapped to rows, the second dimension
   * gets mapped to data within those rows.
	 */
  //$.array2CSV = function(array, meta) {
  //  alert('Not implemented yet'); // TODO: implement this
  //};

  /**
   * jQuery.csv2Dictionary(csv)
   * Converts a CSV string to a javascript dictionary.
   * @param {String} csv The string containing the raw CSV data.
   * @param {Object} [meta] The dictionary where the meta variables (ie separator, delimiter, headerLine, dataLine) are defined. Defaults to an empty object ({}).
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a quote('). 
   * @param {Integer} [headerLine] The line in the file that contains the header data. Defaults to 1 (1-based counting).
   * @param {Integer} [dataLine] The line where the data values start. Defaults to 2 (1-based counting).
   *
   * This method deals with multi-line CSV strings. Where the headers line is
   * used as the key for each value per entry.
   */
  $.csv2Dictionary = function(csv, meta) {
    var meta = (meta !== undefined ? meta : {});
    var separator = 'separator' in meta ? meta.separator : $.csvDefaults.separator;
    var delimiter = 'delimiter' in meta ? meta.delimiter : $.csvDefaults.delimiter;
    var headerLine = 'headerLine' in meta ? meta.headerLine : $.csvDefaults.headerLine;
    var dataLine = 'dataLine' in meta ? meta.dataLine : $.csvDefaults.dataLine;

    // process data into lines
    var lines = csv.split(/\r\n|\r|\n/g);
    // fetch the headers
    var headers = $.csvEntry2Array(lines[(headerLine - 1)]);    
    // process the data
    var output = [];
    for(var i in lines) {
      if(i < (dataLine - 1)) {
        continue;
      }
      // process each value
      var line = $.csvEntry2Array(lines[i], {
        delimiter: delimiter, 
        separator: separator
      });
      var lineDict = {};
      for(var j in headers) {
        lineDict[headers[j]] = line[j];
      }
      output.push(lineDict);
    }

    return output;
  };

  /**
   * jQuery.dictionary2CSV(dictionary)
   * Converts a javascript dictionary to a CSV string.
   * @param {Object} dictionary The dictionary containing the CSV data.
   * @param {Object} [meta] The dictionary where the meta variables (ie separator, delimiter, headerLine, dataLine) are defined. Defaults to an empty object ({}).
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a quote('). 
   * @param {Integer} [headerLine] The line in the file that contains the header data. Defaults to 1 (1-based counting).
   * @param {Integer} [dataLine] The line where the data values start. Defaults to 2 (1-based counting).
   *
   * This method generates a CSV file from a javascript dictionary structure.
   * It starts by detecting the headers and adding them as the first line of 
   * the CSV file, followed by a structured dump of the data.
   */
  //$.dictionary2CSV = function(dictionary, meta) {
  //  alert('Not implemented yet'); // TODO: implement this
  //};  
  
})( jQuery );

