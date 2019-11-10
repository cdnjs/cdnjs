/**
 * jQuery CSV Plugin
 * version: 0.5 (2012-04-20)
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
   * jQuery.CSV2Array(csvString)
   * Converts a CSV string to a javascript array.
   *
   * @param {String} csv The string containing the raw CSV data.
   * @param {Array} [meta] The dictionary where the meta variables (ie separator, delimiter, line-break, and headers) are defined. Defaults to an empty object ({}).
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a quote(').
   * @param {String} [lineBreak] An override for the line-break style. Defaults to CRLF('\r\n').
   * @param {Boolean} [headers] Indicates whether the CSV file contains headers. If true the first line is parsed separately.
   * @param {Integer} [skip] The number of lines that need to be skipped before the parser starts. Defaults to 0. 
   *
   * This method deals with multi-line CSV. The breakdown is simple. The first
   * dimension of the array represents the line (or entry/row) while the second
   * dimension contains the values (or values/columns).
   *
   * Example - Print the 4th value in the 10th row:
   *   data = $.CSV2Array(csv); // cache the output to avoid unnecessary processing
   *   console.log(data[9][3]);
	 */
  $.CSV2Array = function(csv, meta) {
    var meta = typeof meta !== 'undefined' ? meta : {};
    var separator = 'separator' in meta ? args.separator : ',';
    var delimiter = 'delimiter' in meta ? args.delimiter : "'";
    var lineEnding = 'line-ending' in meta ? args.line-ending : '\r\n';
    var skip = 'skip' in meta ? args.headers : 0;

    // check for line breaks
    var lines = csv.split(lineEnding);
    var output = [];
    for(var i in lines) {
      if(line < skip) {
        continue;
      }
      var line = $.CSVEntry2Array(lines[i]);
      output.push(line);
    }
    return output;
  };

  // TODO: Implement this
  $.CSV2Dictionary = function(csv, meta) {
    var meta = typeof(meta) !== 'undefined' ? meta : {};
    //header-line // TODO: Implement this, marks the line that contains the header
    //data-line // TODO: Implement this, marks the line where the data starts
    return;
  };

  /**
   * jQuery.CSVEntry2Array(csvString)
   * Converts a CSV string to a javascript array.
   *
   * @param {String} csv The string containing the raw CSV data.
   * @param {Array} [meta] The dictionary where the meta variables (ie separator, delimiter, line-break, and headers) are defined. Defaults to an empty object ({}).
   * @param {Character} [separator] An override for the separator character. Defaults to a comma(,).
   * @param {Character} [delimiter] An override for the delimiter character. Defaults to a quote(').
   *
   * This method deals with simple CSV strings only. It's useful if you only
   * need to parse a single entry. If you need to parse more than one line,
   * use $.CSV2Array instead.
   */
  $.CSVEntry2Array = function(csv, meta) {
    var meta = typeof meta !== 'undefined' ? meta : {};
    var separator = 'separator' in meta ? args.separator : ',';
    var delimiter = 'delimiter' in meta ? args.delimiter : "'";

    var reValid = /^\s*(?:D[^D\\]*(?:\\[\S\s][^D\\]*)*D|[^SD\s\\]*(?:\s+[^SD\s\\]+)*)\s*(?:S\s*(?:D[^D\\]*(?:\\[\S\s][^D\\]*)*D|[^SD\s\\]*(?:\s+[^SD\s\\]+)*)\s*)*$/;
    reValid = RegExp(reValid.source.replace(/S/g, separator));
    reValid = RegExp(reValid.source.replace(/D/g, delimiter));

    var reValue = /(?!\s*$)\s*(?:D([^D\\]*(?:\\[\S\s][^D\\]*)*)D|([^SD\s\\]*(?:\s+[^SD\s\\]+)*))\s*(?:S|$)/g;
    reValue = RegExp(reValue.source.replace(/S/g, separator), 'g');
    reValue = RegExp(reValue.source.replace(/D/g, delimiter), 'g');

    // Return NULL if input string is not well formed CSV string.
    if (!reValid.test(csv)) { return null; }
    var a = [];

    // "Walk" the string using replace with callback.
    csv.replace(reValue, function(m0, m1, m2) {
            // Remove backslash from \' in single quoted values.
            if      (m1 !== undefined) { a.push(m1.replace(/\\'/g, "'")); }
            // Remove backslash from \" in double quoted values.
            else if (m2 !== undefined) a.push(m2);
            return ''; // Return empty string.
        });

    // Handle special case of empty last value.
    if (/,\s*$/.test(csv)) { a.push(''); }
    return a;
  };

})( jQuery );

