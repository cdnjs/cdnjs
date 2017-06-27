!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jsondiffpatch=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var environment = require('./environment');

if (environment.isBrowser) {
  /* global window */
  /* jshint camelcase: false */
  window.diff_match_patch = require('../public/external/diff_match_patch_uncompressed');
  /* jshint camelcase: true */
}

module.exports = require('./main');

},{"../public/external/diff_match_patch_uncompressed":2,"./environment":9,"./main":16}],2:[function(require,module,exports){
/**
 * Diff Match and Patch
 *
 * Copyright 2006 Google Inc.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * Class containing the diff, match and patch methods.
 * @constructor
 */
function diff_match_patch() {

  // Defaults.
  // Redefine these in your program to override the defaults.

  // Number of seconds to map a diff before giving up (0 for infinity).
  this.Diff_Timeout = 1.0;
  // Cost of an empty edit operation in terms of edit characters.
  this.Diff_EditCost = 4;
  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
  this.Match_Threshold = 0.5;
  // How far to search for a match (0 = exact location, 1000+ = broad match).
  // A match this many characters away from the expected location will add
  // 1.0 to the score (0.0 is a perfect match).
  this.Match_Distance = 1000;
  // When deleting a large block of text (over ~64 characters), how close does
  // the contents have to match the expected contents. (0.0 = perfection,
  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
  // end points of a delete need to match.
  this.Patch_DeleteThreshold = 0.5;
  // Chunk size for context length.
  this.Patch_Margin = 4;

  // The number of bits in an int.
  this.Match_MaxBits = 32;
}


//  DIFF FUNCTIONS


/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
var DIFF_INSERT = 1;
var DIFF_EQUAL = 0;

/** @typedef {!Array.<number|string>} */
diff_match_patch.Diff;


/**
 * Find the differences between two texts.  Simplifies the problem by stripping
 * any common prefix or suffix off the texts before diffing.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
 *     then don't run a line-level diff first to identify the changed areas.
 *     Defaults to true, which does a faster, slightly less optimal diff.
 * @param {number} opt_deadline Optional time when the diff should be complete
 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
 *     instead.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 */
diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
    opt_deadline) {
  // Set a deadline by which time the diff must be complete.
  if (typeof opt_deadline == 'undefined') {
    if (this.Diff_Timeout <= 0) {
      opt_deadline = Number.MAX_VALUE;
    } else {
      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
    }
  }
  var deadline = opt_deadline;

  // Check for null inputs.
  if (text1 == null || text2 == null) {
    throw new Error('Null input. (diff_main)');
  }

  // Check for equality (speedup).
  if (text1 == text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (typeof opt_checklines == 'undefined') {
    opt_checklines = true;
  }
  var checklines = opt_checklines;

  // Trim off common prefix (speedup).
  var commonlength = this.diff_commonPrefix(text1, text2);
  var commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = this.diff_commonSuffix(text1, text2);
  var commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  var diffs = this.diff_compute_(text1, text2, checklines, deadline);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  this.diff_cleanupMerge(diffs);
  return diffs;
};


/**
 * Find the differences between two texts.  Assumes that the texts do not
 * have any common prefix or suffix.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {boolean} checklines Speedup flag.  If false, then don't run a
 *     line-level diff first to identify the changed areas.
 *     If true, then run a faster, slightly less optimal diff.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
    deadline) {
  var diffs;

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  var i = longtext.indexOf(shorttext);
  if (i != -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
             [DIFF_EQUAL, shorttext],
             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length == 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }
  longtext = shorttext = null;  // Garbage collect.

  // Check to see if the problem can be split in two.
  var hm = this.diff_halfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    var text1_a = hm[0];
    var text1_b = hm[1];
    var text2_a = hm[2];
    var text2_b = hm[3];
    var mid_common = hm[4];
    // Send both pairs off for separate processing.
    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
    // Merge the results.
    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
  }

  if (checklines && text1.length > 100 && text2.length > 100) {
    return this.diff_lineMode_(text1, text2, deadline);
  }

  return this.diff_bisect_(text1, text2, deadline);
};


/**
 * Do a quick line-level diff on both strings, then rediff the parts for
 * greater accuracy.
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time when the diff should be complete by.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
  // Scan the text on a line-by-line basis first.
  var a = this.diff_linesToChars_(text1, text2);
  text1 = /** @type {string} */(a[0]);
  text2 = /** @type {string} */(a[1]);
  var linearray = /** @type {!Array.<string>} */(a[2]);

  var diffs = this.diff_bisect_(text1, text2, deadline);

  // Convert the diff back to original text.
  this.diff_charsToLines_(diffs, linearray);
  // Eliminate freak matches (e.g. blank lines)
  this.diff_cleanupSemantic(diffs);

  // Rediff any replacement blocks, this time character-by-character.
  // Add a dummy entry at the end.
  diffs.push([DIFF_EQUAL, '']);
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete >= 1 && count_insert >= 1) {
          // Delete the offending records and add the merged ones.
          var a = this.diff_main(text_delete, text_insert, false, deadline);
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          for (var j = a.length - 1; j >= 0; j--) {
            diffs.splice(pointer, 0, a[j]);
          }
          pointer = pointer + a.length;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
    pointer++;
  }
  diffs.pop();  // Remove the dummy entry at the end.

  return diffs;
};


/**
 * Find the 'middle snake' of a diff, split the problem in two
 * and return the recursively constructed diff.
 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  var max_d = Math.ceil((text1_length + text2_length) / 2);
  var v_offset = max_d;
  var v_length = 2 * max_d;
  var v1 = new Array(v_length);
  var v2 = new Array(v_length);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (var x = 0; x < v_length; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[v_offset + 1] = 0;
  v2[v_offset + 1] = 0;
  var delta = text1_length - text2_length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  var front = (delta % 2 != 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  var k1start = 0;
  var k1end = 0;
  var k2start = 0;
  var k2end = 0;
  for (var d = 0; d < max_d; d++) {
    // Bail out if deadline is reached.
    if ((new Date()).getTime() > deadline) {
      break;
    }

    // Walk the front path one step.
    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      var k1_offset = v_offset + k1;
      var x1;
      if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
        x1 = v1[k1_offset + 1];
      } else {
        x1 = v1[k1_offset - 1] + 1;
      }
      var y1 = x1 - k1;
      while (x1 < text1_length && y1 < text2_length &&
             text1.charAt(x1) == text2.charAt(y1)) {
        x1++;
        y1++;
      }
      v1[k1_offset] = x1;
      if (x1 > text1_length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2_length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        var k2_offset = v_offset + delta - k1;
        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
          // Mirror x2 onto top-left coordinate system.
          var x2 = text1_length - v2[k2_offset];
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }

    // Walk the reverse path one step.
    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      var k2_offset = v_offset + k2;
      var x2;
      if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
        x2 = v2[k2_offset + 1];
      } else {
        x2 = v2[k2_offset - 1] + 1;
      }
      var y2 = x2 - k2;
      while (x2 < text1_length && y2 < text2_length &&
             text1.charAt(text1_length - x2 - 1) ==
             text2.charAt(text2_length - y2 - 1)) {
        x2++;
        y2++;
      }
      v2[k2_offset] = x2;
      if (x2 > text1_length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2_length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        var k1_offset = v_offset + delta - k2;
        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
          var x1 = v1[k1_offset];
          var y1 = v_offset + x1 - k1_offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1_length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
};


/**
 * Given the location of the 'middle snake', split the diff in two parts
 * and recurse.
 * @param {string} text1 Old string to be diffed.
 * @param {string} text2 New string to be diffed.
 * @param {number} x Index of split point in text1.
 * @param {number} y Index of split point in text2.
 * @param {number} deadline Time at which to bail if not yet complete.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @private
 */
diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
    deadline) {
  var text1a = text1.substring(0, x);
  var text2a = text2.substring(0, y);
  var text1b = text1.substring(x);
  var text2b = text2.substring(y);

  // Compute both diffs serially.
  var diffs = this.diff_main(text1a, text2a, false, deadline);
  var diffsb = this.diff_main(text1b, text2b, false, deadline);

  return diffs.concat(diffsb);
};


/**
 * Split two texts into an array of strings.  Reduce the texts to a string of
 * hashes where each Unicode character represents one line.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {!Array.<string|!Array.<string>>} Three element Array, containing the
 *     encoded text1, the encoded text2 and the array of unique strings.  The
 *     zeroth element of the array of unique strings is intentionally blank.
 * @private
 */
diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4

  // '\x00' is a valid character, but various debuggers don't like it.
  // So we'll insert a junk entry to avoid generating a null character.
  lineArray[0] = '';

  /**
   * Split a text into an array of strings.  Reduce the texts to a string of
   * hashes where each Unicode character represents one line.
   * Modifies linearray and linehash through being a closure.
   * @param {string} text String to encode.
   * @return {string} Encoded string.
   * @private
   */
  function diff_linesToCharsMunge_(text) {
    var chars = '';
    // Walk the text, pulling out a substring for each line.
    // text.split('\n') would would temporarily double our memory footprint.
    // Modifying text would create many large strings to garbage collect.
    var lineStart = 0;
    var lineEnd = -1;
    // Keeping our own length variable is faster than looking it up.
    var lineArrayLength = lineArray.length;
    while (lineEnd < text.length - 1) {
      lineEnd = text.indexOf('\n', lineStart);
      if (lineEnd == -1) {
        lineEnd = text.length - 1;
      }
      var line = text.substring(lineStart, lineEnd + 1);
      lineStart = lineEnd + 1;

      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
          (lineHash[line] !== undefined)) {
        chars += String.fromCharCode(lineHash[line]);
      } else {
        chars += String.fromCharCode(lineArrayLength);
        lineHash[line] = lineArrayLength;
        lineArray[lineArrayLength++] = line;
      }
    }
    return chars;
  }

  var chars1 = diff_linesToCharsMunge_(text1);
  var chars2 = diff_linesToCharsMunge_(text2);
  return [chars1, chars2, lineArray];
};


/**
 * Rehydrate the text in a diff from a string of line hashes to real lines of
 * text.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {!Array.<string>} lineArray Array of unique strings.
 * @private
 */
diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
  for (var x = 0; x < diffs.length; x++) {
    var chars = diffs[x][1];
    var text = [];
    for (var y = 0; y < chars.length; y++) {
      text[y] = lineArray[chars.charCodeAt(y)];
    }
    diffs[x][1] = text.join('');
  }
};


/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */
diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;
  while (pointermin < pointermid) {
    if (text1.substring(pointerstart, pointermid) ==
        text2.substring(pointerstart, pointermid)) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */
diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 ||
      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;
  while (pointermin < pointermid) {
    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }
    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }
  return pointermid;
};


/**
 * Determine if the suffix of one string is the prefix of another.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of the first
 *     string and the start of the second string.
 * @private
 */
diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length;
  // Eliminate the null case.
  if (text1_length == 0 || text2_length == 0) {
    return 0;
  }
  // Truncate the longer string.
  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }
  var text_length = Math.min(text1_length, text2_length);
  // Quick check for the worst case.
  if (text1 == text2) {
    return text_length;
  }

  // Start by looking for a single character match
  // and increase length until no match is found.
  // Performance analysis: http://neil.fraser.name/news/2010/11/04/
  var best = 0;
  var length = 1;
  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);
    if (found == -1) {
      return best;
    }
    length += found;
    if (found == 0 || text1.substring(text_length - length) ==
        text2.substring(0, length)) {
      best = length;
      length++;
    }
  }
};


/**
 * Do the two texts share a substring which is at least half the length of the
 * longer text?
 * This speedup can produce non-minimal diffs.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {Array.<string>} Five element Array, containing the prefix of
 *     text1, the suffix of text1, the prefix of text2, the suffix of
 *     text2 and the common middle.  Or null if there was no match.
 * @private
 */
diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
  if (this.Diff_Timeout <= 0) {
    // Don't risk returning a non-optimal diff if we have unlimited time.
    return null;
  }
  var longtext = text1.length > text2.length ? text1 : text2;
  var shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null;  // Pointless.
  }
  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Does a substring of shorttext exist within longtext such that the substring
   * is at least half the length of longtext?
   * Closure, but does not reference any external variables.
   * @param {string} longtext Longer string.
   * @param {string} shorttext Shorter string.
   * @param {number} i Start index of quarter length substring within longtext.
   * @return {Array.<string>} Five element Array, containing the prefix of
   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
   *     of shorttext and the common middle.  Or null if there was no match.
   * @private
   */
  function diff_halfMatchI_(longtext, shorttext, i) {
    // Start with a 1/4 length substring at position i as a seed.
    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    var j = -1;
    var best_common = '';
    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
                                               shorttext.substring(j));
      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
                                               shorttext.substring(0, j));
      if (best_common.length < suffixLength + prefixLength) {
        best_common = shorttext.substring(j - suffixLength, j) +
            shorttext.substring(j, j + prefixLength);
        best_longtext_a = longtext.substring(0, i - suffixLength);
        best_longtext_b = longtext.substring(i + prefixLength);
        best_shorttext_a = shorttext.substring(0, j - suffixLength);
        best_shorttext_b = shorttext.substring(j + prefixLength);
      }
    }
    if (best_common.length * 2 >= longtext.length) {
      return [best_longtext_a, best_longtext_b,
              best_shorttext_a, best_shorttext_b, best_common];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  var hm1 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 4));
  // Check again based on the third quarter.
  var hm2 = diff_halfMatchI_(longtext, shorttext,
                             Math.ceil(longtext.length / 2));
  var hm;
  if (!hm1 && !hm2) {
    return null;
  } else if (!hm2) {
    hm = hm1;
  } else if (!hm1) {
    hm = hm2;
  } else {
    // Both matched.  Select the longest.
    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  var text1_a, text1_b, text2_a, text2_b;
  if (text1.length > text2.length) {
    text1_a = hm[0];
    text1_b = hm[1];
    text2_a = hm[2];
    text2_b = hm[3];
  } else {
    text2_a = hm[0];
    text2_b = hm[1];
    text1_a = hm[2];
    text1_b = hm[3];
  }
  var mid_common = hm[4];
  return [text1_a, text1_b, text2_a, text2_b, mid_common];
};


/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;  // Always equal to equalities[equalitiesLength-1][1]
  var pointer = 0;  // Index of current position.
  // Number of characters that changed prior to the equality.
  var length_insertions1 = 0;
  var length_deletions1 = 0;
  // Number of characters that changed after the equality.
  var length_insertions2 = 0;
  var length_deletions2 = 0;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastequality = /** @type {string} */(diffs[pointer][1]);
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (lastequality !== null && (lastequality.length <=
          Math.max(length_insertions1, length_deletions1)) &&
          (lastequality.length <= Math.max(length_insertions2,
                                           length_deletions2))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        // Throw away the equality we just deleted.
        equalitiesLength--;
        // Throw away the previous equality (it needs to be reevaluated).
        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0;  // Reset the counters.
        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastequality = null;
        changes = true;
      }
    }
    pointer++;
  }

  // Normalize the diff.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
  this.diff_cleanupSemanticLossless(diffs);

  // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE &&
        diffs[pointer][0] == DIFF_INSERT) {
      var deletion = /** @type {string} */(diffs[pointer - 1][1]);
      var insertion = /** @type {string} */(diffs[pointer][1]);
      var overlap_length = this.diff_commonOverlap_(deletion, insertion);
      if (overlap_length >= deletion.length / 2 ||
          overlap_length >= insertion.length / 2) {
        // Overlap found.  Insert an equality and trim the surrounding edits.
        diffs.splice(pointer, 0,
            [DIFF_EQUAL, insertion.substring(0, overlap_length)]);
        diffs[pointer - 1][1] =
            deletion.substring(0, deletion.length - overlap_length);
        diffs[pointer + 1][1] = insertion.substring(overlap_length);
        pointer++;
      }
      pointer++;
    }
    pointer++;
  }
};


/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
  // Define some regex patterns for matching boundaries.
  var punctuation = /[^a-zA-Z0-9]/;
  var whitespace = /\s/;
  var linebreak = /[\r\n]/;
  var blanklineEnd = /\n\r?\n$/;
  var blanklineStart = /^\r?\n\r?\n/;

  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 5 (best) to 0 (worst).
   * Closure, makes reference to regex patterns defined above.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 5;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    var score = 0;
    // One point for non-alphanumeric.
    if (one.charAt(one.length - 1).match(punctuation) ||
        two.charAt(0).match(punctuation)) {
      score++;
      // Two points for whitespace.
      if (one.charAt(one.length - 1).match(whitespace) ||
          two.charAt(0).match(whitespace)) {
        score++;
        // Three points for line breaks.
        if (one.charAt(one.length - 1).match(linebreak) ||
            two.charAt(0).match(linebreak)) {
          score++;
          // Four points for blank lines.
          if (one.match(blanklineEnd) || two.match(blanklineStart)) {
            score++;
          }
        }
      }
    }
    return score;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      var equality1 = /** @type {string} */(diffs[pointer - 1][1]);
      var edit = /** @type {string} */(diffs[pointer][1]);
      var equality2 = /** @type {string} */(diffs[pointer + 1][1]);

      // First, shift the edit as far left as possible.
      var commonOffset = this.diff_commonSuffix(equality1, edit);
      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      }

      // Second, step character by character right, looking for the best fit.
      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2);
      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score = diff_cleanupSemanticScore_(equality1, edit) +
            diff_cleanupSemanticScore_(edit, equality2);
        // The >= encourages trailing rather than leading whitespace on edits.
        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }
        diffs[pointer][1] = bestEdit;
        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }
    pointer++;
  }
};


/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  var lastequality = '';  // Always equal to equalities[equalitiesLength-1][1]
  var pointer = 0;  // Index of current position.
  // Is there an insertion operation before the last equality.
  var pre_ins = false;
  // Is there a deletion operation before the last equality.
  var pre_del = false;
  // Is there an insertion operation after the last equality.
  var post_ins = false;
  // Is there a deletion operation after the last equality.
  var post_del = false;
  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
      if (diffs[pointer][1].length < this.Diff_EditCost &&
          (post_ins || post_del)) {
        // Candidate found.
        equalities[equalitiesLength++] = pointer;
        pre_ins = post_ins;
        pre_del = post_del;
        lastequality = diffs[pointer][1];
      } else {
        // Not a candidate, and can never become one.
        equalitiesLength = 0;
        lastequality = '';
      }
      post_ins = post_del = false;
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_DELETE) {
        post_del = true;
      } else {
        post_ins = true;
      }
      /*
       * Five types to be split:
       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
       * <ins>A</ins>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<ins>C</ins>
       * <ins>A</del>X<ins>C</ins><del>D</del>
       * <ins>A</ins><del>B</del>X<del>C</del>
       */
      if (lastequality && ((pre_ins && pre_del && post_ins && post_del) ||
                           ((lastequality.length < this.Diff_EditCost / 2) &&
                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
        // Duplicate record.
        diffs.splice(equalities[equalitiesLength - 1], 0,
                     [DIFF_DELETE, lastequality]);
        // Change second copy to insert.
        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
        equalitiesLength--;  // Throw away the equality we just deleted;
        lastequality = '';
        if (pre_ins && pre_del) {
          // No changes made which could affect previous entry, keep going.
          post_ins = post_del = true;
          equalitiesLength = 0;
        } else {
          equalitiesLength--;  // Throw away the previous equality.
          pointer = equalitiesLength > 0 ?
              equalities[equalitiesLength - 1] : -1;
          post_ins = post_del = false;
        }
        changes = true;
      }
    }
    pointer++;
  }

  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;
  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = this.diff_commonPrefix(text_insert, text_delete);
            if (commonlength !== 0) {
              if ((pointer - count_delete - count_insert) > 0 &&
                  diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL) {
                diffs[pointer - count_delete - count_insert - 1][1] +=
                    text_insert.substring(0, commonlength);
              } else {
                diffs.splice(0, 0, [DIFF_EQUAL,
                                    text_insert.substring(0, commonlength)]);
                pointer++;
              }
              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            }
            // Factor out any common suffixies.
            commonlength = this.diff_commonSuffix(text_insert, text_delete);
            if (commonlength !== 0) {
              diffs[pointer][1] = text_insert.substring(text_insert.length -
                  commonlength) + diffs[pointer][1];
              text_insert = text_insert.substring(0, text_insert.length -
                  commonlength);
              text_delete = text_delete.substring(0, text_delete.length -
                  commonlength);
            }
          }
          // Delete the offending records and add the merged ones.
          if (count_delete === 0) {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_DELETE, text_delete]);
          } else {
            diffs.splice(pointer - count_delete - count_insert,
                count_delete + count_insert, [DIFF_DELETE, text_delete],
                [DIFF_INSERT, text_insert]);
          }
          pointer = pointer - count_delete - count_insert +
                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop();  // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  var changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      if (diffs[pointer][1].substring(diffs[pointer][1].length -
          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
            diffs[pointer][1].substring(0, diffs[pointer][1].length -
                                        diffs[pointer - 1][1].length);
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
            diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    this.diff_cleanupMerge(diffs);
  }
};


/**
 * loc is a location in text1, compute and return the equivalent location in
 * text2.
 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @param {number} loc Location within text1.
 * @return {number} Location within text2.
 */
diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
  var chars1 = 0;
  var chars2 = 0;
  var last_chars1 = 0;
  var last_chars2 = 0;
  var x;
  for (x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
      chars1 += diffs[x][1].length;
    }
    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
      chars2 += diffs[x][1].length;
    }
    if (chars1 > loc) {  // Overshot the location.
      break;
    }
    last_chars1 = chars1;
    last_chars2 = chars2;
  }
  // Was the location was deleted?
  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
    return last_chars2;
  }
  // Add the remaining character length.
  return last_chars2 + (loc - last_chars1);
};


/**
 * Convert a diff array into a pretty HTML report.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} HTML representation.
 */
diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
  var html = [];
  var i = 0;
  var pattern_amp = /&/g;
  var pattern_lt = /</g;
  var pattern_gt = />/g;
  var pattern_para = /\n/g;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];    // Operation (insert, delete, equal)
    var data = diffs[x][1];  // Text of change.
    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
    switch (op) {
      case DIFF_INSERT:
        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
        break;
      case DIFF_DELETE:
        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
        break;
      case DIFF_EQUAL:
        html[x] = '<span>' + text + '</span>';
        break;
    }
    if (op !== DIFF_DELETE) {
      i += data.length;
    }
  }
  return html.join('');
};


/**
 * Compute and return the source text (all equalities and deletions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Source text.
 */
diff_match_patch.prototype.diff_text1 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_INSERT) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute and return the destination text (all equalities and insertions).
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Destination text.
 */
diff_match_patch.prototype.diff_text2 = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    if (diffs[x][0] !== DIFF_DELETE) {
      text[x] = diffs[x][1];
    }
  }
  return text.join('');
};


/**
 * Compute the Levenshtein distance; the number of inserted, deleted or
 * substituted characters.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {number} Number of changes.
 */
diff_match_patch.prototype.diff_levenshtein = function(diffs) {
  var levenshtein = 0;
  var insertions = 0;
  var deletions = 0;
  for (var x = 0; x < diffs.length; x++) {
    var op = diffs[x][0];
    var data = diffs[x][1];
    switch (op) {
      case DIFF_INSERT:
        insertions += data.length;
        break;
      case DIFF_DELETE:
        deletions += data.length;
        break;
      case DIFF_EQUAL:
        // A deletion and an insertion is one substitution.
        levenshtein += Math.max(insertions, deletions);
        insertions = 0;
        deletions = 0;
        break;
    }
  }
  levenshtein += Math.max(insertions, deletions);
  return levenshtein;
};


/**
 * Crush the diff into an encoded string which describes the operations
 * required to transform text1 into text2.
 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 * @return {string} Delta text.
 */
diff_match_patch.prototype.diff_toDelta = function(diffs) {
  var text = [];
  for (var x = 0; x < diffs.length; x++) {
    switch (diffs[x][0]) {
      case DIFF_INSERT:
        text[x] = '+' + encodeURI(diffs[x][1]);
        break;
      case DIFF_DELETE:
        text[x] = '-' + diffs[x][1].length;
        break;
      case DIFF_EQUAL:
        text[x] = '=' + diffs[x][1].length;
        break;
    }
  }
  return text.join('\t').replace(/%20/g, ' ');
};


/**
 * Given the original text1, and an encoded string which describes the
 * operations required to transform text1 into text2, compute the full diff.
 * @param {string} text1 Source string for the diff.
 * @param {string} delta Delta text.
 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
  var diffs = [];
  var diffsLength = 0;  // Keeping our own length var is faster in JS.
  var pointer = 0;  // Cursor in text1
  var tokens = delta.split(/\t/g);
  for (var x = 0; x < tokens.length; x++) {
    // Each token begins with a one character parameter which specifies the
    // operation of this token (delete, insert, equality).
    var param = tokens[x].substring(1);
    switch (tokens[x].charAt(0)) {
      case '+':
        try {
          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
        } catch (ex) {
          // Malformed URI sequence.
          throw new Error('Illegal escape in diff_fromDelta: ' + param);
        }
        break;
      case '-':
        // Fall through.
      case '=':
        var n = parseInt(param, 10);
        if (isNaN(n) || n < 0) {
          throw new Error('Invalid number in diff_fromDelta: ' + param);
        }
        var text = text1.substring(pointer, pointer += n);
        if (tokens[x].charAt(0) == '=') {
          diffs[diffsLength++] = [DIFF_EQUAL, text];
        } else {
          diffs[diffsLength++] = [DIFF_DELETE, text];
        }
        break;
      default:
        // Blank tokens are ok (from a trailing \t).
        // Anything else is an error.
        if (tokens[x]) {
          throw new Error('Invalid diff operation in diff_fromDelta: ' +
                          tokens[x]);
        }
    }
  }
  if (pointer != text1.length) {
    throw new Error('Delta length (' + pointer +
        ') does not equal source text length (' + text1.length + ').');
  }
  return diffs;
};


//  MATCH FUNCTIONS


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc'.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 */
diff_match_patch.prototype.match_main = function(text, pattern, loc) {
  // Check for null inputs.
  if (text == null || pattern == null || loc == null) {
    throw new Error('Null input. (match_main)');
  }

  loc = Math.max(0, Math.min(loc, text.length));
  if (text == pattern) {
    // Shortcut (potentially not guaranteed by the algorithm)
    return 0;
  } else if (!text.length) {
    // Nothing to match.
    return -1;
  } else if (text.substring(loc, loc + pattern.length) == pattern) {
    // Perfect match at the perfect spot!  (Includes case of null pattern)
    return loc;
  } else {
    // Do a fuzzy compare.
    return this.match_bitap_(text, pattern, loc);
  }
};


/**
 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
 * Bitap algorithm.
 * @param {string} text The text to search.
 * @param {string} pattern The pattern to search for.
 * @param {number} loc The location to search around.
 * @return {number} Best match index or -1.
 * @private
 */
diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
  if (pattern.length > this.Match_MaxBits) {
    throw new Error('Pattern too long for this browser.');
  }

  // Initialise the alphabet.
  var s = this.match_alphabet_(pattern);

  var dmp = this;  // 'this' becomes 'window' in a closure.

  /**
   * Compute and return the score for a match with e errors and x location.
   * Accesses loc and pattern through being a closure.
   * @param {number} e Number of errors in match.
   * @param {number} x Location of match.
   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
   * @private
   */
  function match_bitapScore_(e, x) {
    var accuracy = e / pattern.length;
    var proximity = Math.abs(loc - x);
    if (!dmp.Match_Distance) {
      // Dodge divide by zero error.
      return proximity ? 1.0 : accuracy;
    }
    return accuracy + (proximity / dmp.Match_Distance);
  }

  // Highest score beyond which we give up.
  var score_threshold = this.Match_Threshold;
  // Is there a nearby exact match? (speedup)
  var best_loc = text.indexOf(pattern, loc);
  if (best_loc != -1) {
    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
    // What about in the other direction? (speedup)
    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
    if (best_loc != -1) {
      score_threshold =
          Math.min(match_bitapScore_(0, best_loc), score_threshold);
    }
  }

  // Initialise the bit arrays.
  var matchmask = 1 << (pattern.length - 1);
  best_loc = -1;

  var bin_min, bin_mid;
  var bin_max = pattern.length + text.length;
  var last_rd;
  for (var d = 0; d < pattern.length; d++) {
    // Scan for the best match; each iteration allows for one more error.
    // Run a binary search to determine how far from 'loc' we can stray at this
    // error level.
    bin_min = 0;
    bin_mid = bin_max;
    while (bin_min < bin_mid) {
      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
        bin_min = bin_mid;
      } else {
        bin_max = bin_mid;
      }
      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
    }
    // Use the result from this iteration as the maximum for the next.
    bin_max = bin_mid;
    var start = Math.max(1, loc - bin_mid + 1);
    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;

    var rd = Array(finish + 2);
    rd[finish + 1] = (1 << d) - 1;
    for (var j = finish; j >= start; j--) {
      // The alphabet (s) is a sparse hash, so the following line generates
      // warnings.
      var charMatch = s[text.charAt(j - 1)];
      if (d === 0) {  // First pass: exact match.
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
      } else {  // Subsequent passes: fuzzy match.
        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch |
                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
                last_rd[j + 1];
      }
      if (rd[j] & matchmask) {
        var score = match_bitapScore_(d, j - 1);
        // This match will almost certainly be better than any existing match.
        // But check anyway.
        if (score <= score_threshold) {
          // Told you so.
          score_threshold = score;
          best_loc = j - 1;
          if (best_loc > loc) {
            // When passing loc, don't exceed our current distance from loc.
            start = Math.max(1, 2 * loc - best_loc);
          } else {
            // Already passed loc, downhill from here on in.
            break;
          }
        }
      }
    }
    // No hope for a (better) match at greater error levels.
    if (match_bitapScore_(d + 1, loc) > score_threshold) {
      break;
    }
    last_rd = rd;
  }
  return best_loc;
};


/**
 * Initialise the alphabet for the Bitap algorithm.
 * @param {string} pattern The text to encode.
 * @return {!Object} Hash of character locations.
 * @private
 */
diff_match_patch.prototype.match_alphabet_ = function(pattern) {
  var s = {};
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] = 0;
  }
  for (var i = 0; i < pattern.length; i++) {
    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
  }
  return s;
};


//  PATCH FUNCTIONS


/**
 * Increase the context until it is unique,
 * but don't let the pattern expand beyond Match_MaxBits.
 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
 * @param {string} text Source text.
 * @private
 */
diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
  if (text.length == 0) {
    return;
  }
  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
  var padding = 0;

  // Look for the first and last matches of pattern in text.  If two different
  // matches are found, increase the pattern length.
  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
         pattern.length < this.Match_MaxBits - this.Patch_Margin -
         this.Patch_Margin) {
    padding += this.Patch_Margin;
    pattern = text.substring(patch.start2 - padding,
                             patch.start2 + patch.length1 + padding);
  }
  // Add one chunk for good luck.
  padding += this.Patch_Margin;

  // Add the prefix.
  var prefix = text.substring(patch.start2 - padding, patch.start2);
  if (prefix) {
    patch.diffs.unshift([DIFF_EQUAL, prefix]);
  }
  // Add the suffix.
  var suffix = text.substring(patch.start2 + patch.length1,
                              patch.start2 + patch.length1 + padding);
  if (suffix) {
    patch.diffs.push([DIFF_EQUAL, suffix]);
  }

  // Roll back the start points.
  patch.start1 -= prefix.length;
  patch.start2 -= prefix.length;
  // Extend the lengths.
  patch.length1 += prefix.length + suffix.length;
  patch.length2 += prefix.length + suffix.length;
};


/**
 * Compute a list of patches to turn text1 into text2.
 * Use diffs if provided, otherwise compute it ourselves.
 * There are four ways to call this function, depending on what data is
 * available to the caller:
 * Method 1:
 * a = text1, b = text2
 * Method 2:
 * a = diffs
 * Method 3 (optimal):
 * a = text1, b = diffs
 * Method 4 (deprecated, use method 3):
 * a = text1, b = text2, c = diffs
 *
 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
 * Array of diff tuples for text1 to text2 (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_b text2 (methods 1,4) or
 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
 * @param {string|!Array.<!diff_match_patch.Diff>} opt_c Array of diff tuples
 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of patch objects.
 */
diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
  var text1, diffs;
  if (typeof a == 'string' && typeof opt_b == 'string' &&
      typeof opt_c == 'undefined') {
    // Method 1: text1, text2
    // Compute diffs from text1 and text2.
    text1 = /** @type {string} */(a);
    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
    if (diffs.length > 2) {
      this.diff_cleanupSemantic(diffs);
      this.diff_cleanupEfficiency(diffs);
    }
  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
      typeof opt_c == 'undefined') {
    // Method 2: diffs
    // Compute text1 from diffs.
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
    text1 = this.diff_text1(diffs);
  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
      typeof opt_c == 'undefined') {
    // Method 3: text1, diffs
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
      opt_c && typeof opt_c == 'object') {
    // Method 4: text1, text2, diffs
    // text2 is not used.
    text1 = /** @type {string} */(a);
    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
  } else {
    throw new Error('Unknown call format to patch_make.');
  }

  if (diffs.length === 0) {
    return [];  // Get rid of the null case.
  }
  var patches = [];
  var patch = new diff_match_patch.patch_obj();
  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
  var char_count1 = 0;  // Number of characters into the text1 string.
  var char_count2 = 0;  // Number of characters into the text2 string.
  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
  // text2 (postpatch_text).  We recreate the patches one by one to determine
  // context info.
  var prepatch_text = text1;
  var postpatch_text = text1;
  for (var x = 0; x < diffs.length; x++) {
    var diff_type = diffs[x][0];
    var diff_text = diffs[x][1];

    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
      // A new patch starts here.
      patch.start1 = char_count1;
      patch.start2 = char_count2;
    }

    switch (diff_type) {
      case DIFF_INSERT:
        patch.diffs[patchDiffLength++] = diffs[x];
        patch.length2 += diff_text.length;
        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
                         postpatch_text.substring(char_count2);
        break;
      case DIFF_DELETE:
        patch.length1 += diff_text.length;
        patch.diffs[patchDiffLength++] = diffs[x];
        postpatch_text = postpatch_text.substring(0, char_count2) +
                         postpatch_text.substring(char_count2 +
                             diff_text.length);
        break;
      case DIFF_EQUAL:
        if (diff_text.length <= 2 * this.Patch_Margin &&
            patchDiffLength && diffs.length != x + 1) {
          // Small equality inside a patch.
          patch.diffs[patchDiffLength++] = diffs[x];
          patch.length1 += diff_text.length;
          patch.length2 += diff_text.length;
        } else if (diff_text.length >= 2 * this.Patch_Margin) {
          // Time for a new patch.
          if (patchDiffLength) {
            this.patch_addContext_(patch, prepatch_text);
            patches.push(patch);
            patch = new diff_match_patch.patch_obj();
            patchDiffLength = 0;
            // Unlike Unidiff, our patch lists have a rolling context.
            // http://code.google.com/p/google-diff-match-patch/wiki/Unidiff
            // Update prepatch text & pos to reflect the application of the
            // just completed patch.
            prepatch_text = postpatch_text;
            char_count1 = char_count2;
          }
        }
        break;
    }

    // Update the current character count.
    if (diff_type !== DIFF_INSERT) {
      char_count1 += diff_text.length;
    }
    if (diff_type !== DIFF_DELETE) {
      char_count2 += diff_text.length;
    }
  }
  // Pick up the leftover patch if not empty.
  if (patchDiffLength) {
    this.patch_addContext_(patch, prepatch_text);
    patches.push(patch);
  }

  return patches;
};


/**
 * Given an array of patches, return another array that is identical.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of patch objects.
 */
diff_match_patch.prototype.patch_deepCopy = function(patches) {
  // Making deep copies is hard in JavaScript.
  var patchesCopy = [];
  for (var x = 0; x < patches.length; x++) {
    var patch = patches[x];
    var patchCopy = new diff_match_patch.patch_obj();
    patchCopy.diffs = [];
    for (var y = 0; y < patch.diffs.length; y++) {
      patchCopy.diffs[y] = patch.diffs[y].slice();
    }
    patchCopy.start1 = patch.start1;
    patchCopy.start2 = patch.start2;
    patchCopy.length1 = patch.length1;
    patchCopy.length2 = patch.length2;
    patchesCopy[x] = patchCopy;
  }
  return patchesCopy;
};


/**
 * Merge a set of patches onto the text.  Return a patched text, as well
 * as a list of true/false values indicating which patches were applied.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.
 * @param {string} text Old text.
 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
 *      new text and an array of boolean values.
 */
diff_match_patch.prototype.patch_apply = function(patches, text) {
  if (patches.length == 0) {
    return [text, []];
  }

  // Deep copy the patches so that no changes are made to originals.
  patches = this.patch_deepCopy(patches);

  var nullPadding = this.patch_addPadding(patches);
  text = nullPadding + text + nullPadding;

  this.patch_splitMax(patches);
  // delta keeps track of the offset between the expected and actual location
  // of the previous patch.  If there are patches expected at positions 10 and
  // 20, but the first patch was found at 12, delta is 2 and the second patch
  // has an effective expected position of 22.
  var delta = 0;
  var results = [];
  for (var x = 0; x < patches.length; x++) {
    var expected_loc = patches[x].start2 + delta;
    var text1 = this.diff_text1(patches[x].diffs);
    var start_loc;
    var end_loc = -1;
    if (text1.length > this.Match_MaxBits) {
      // patch_splitMax will only provide an oversized pattern in the case of
      // a monster delete.
      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
                                  expected_loc);
      if (start_loc != -1) {
        end_loc = this.match_main(text,
            text1.substring(text1.length - this.Match_MaxBits),
            expected_loc + text1.length - this.Match_MaxBits);
        if (end_loc == -1 || start_loc >= end_loc) {
          // Can't find valid trailing context.  Drop this patch.
          start_loc = -1;
        }
      }
    } else {
      start_loc = this.match_main(text, text1, expected_loc);
    }
    if (start_loc == -1) {
      // No match found.  :(
      results[x] = false;
      // Subtract the delta for this failed patch from subsequent patches.
      delta -= patches[x].length2 - patches[x].length1;
    } else {
      // Found a match.  :)
      results[x] = true;
      delta = start_loc - expected_loc;
      var text2;
      if (end_loc == -1) {
        text2 = text.substring(start_loc, start_loc + text1.length);
      } else {
        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
      }
      if (text1 == text2) {
        // Perfect match, just shove the replacement text in.
        text = text.substring(0, start_loc) +
               this.diff_text2(patches[x].diffs) +
               text.substring(start_loc + text1.length);
      } else {
        // Imperfect match.  Run a diff to get a framework of equivalent
        // indices.
        var diffs = this.diff_main(text1, text2, false);
        if (text1.length > this.Match_MaxBits &&
            this.diff_levenshtein(diffs) / text1.length >
            this.Patch_DeleteThreshold) {
          // The end points match, but the content is unacceptably bad.
          results[x] = false;
        } else {
          this.diff_cleanupSemanticLossless(diffs);
          var index1 = 0;
          var index2;
          for (var y = 0; y < patches[x].diffs.length; y++) {
            var mod = patches[x].diffs[y];
            if (mod[0] !== DIFF_EQUAL) {
              index2 = this.diff_xIndex(diffs, index1);
            }
            if (mod[0] === DIFF_INSERT) {  // Insertion
              text = text.substring(0, start_loc + index2) + mod[1] +
                     text.substring(start_loc + index2);
            } else if (mod[0] === DIFF_DELETE) {  // Deletion
              text = text.substring(0, start_loc + index2) +
                     text.substring(start_loc + this.diff_xIndex(diffs,
                         index1 + mod[1].length));
            }
            if (mod[0] !== DIFF_DELETE) {
              index1 += mod[1].length;
            }
          }
        }
      }
    }
  }
  // Strip the padding off.
  text = text.substring(nullPadding.length, text.length - nullPadding.length);
  return [text, results];
};


/**
 * Add some padding on text start and end so that edges can match something.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.
 * @return {string} The padding string added to each side.
 */
diff_match_patch.prototype.patch_addPadding = function(patches) {
  var paddingLength = this.Patch_Margin;
  var nullPadding = '';
  for (var x = 1; x <= paddingLength; x++) {
    nullPadding += String.fromCharCode(x);
  }

  // Bump all the patches forward.
  for (var x = 0; x < patches.length; x++) {
    patches[x].start1 += paddingLength;
    patches[x].start2 += paddingLength;
  }

  // Add some padding on start of first diff.
  var patch = patches[0];
  var diffs = patch.diffs;
  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.unshift([DIFF_EQUAL, nullPadding]);
    patch.start1 -= paddingLength;  // Should be 0.
    patch.start2 -= paddingLength;  // Should be 0.
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[0][1].length) {
    // Grow first equality.
    var extraLength = paddingLength - diffs[0][1].length;
    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
    patch.start1 -= extraLength;
    patch.start2 -= extraLength;
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  // Add some padding on end of last diff.
  patch = patches[patches.length - 1];
  diffs = patch.diffs;
  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
    // Add nullPadding equality.
    diffs.push([DIFF_EQUAL, nullPadding]);
    patch.length1 += paddingLength;
    patch.length2 += paddingLength;
  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
    // Grow last equality.
    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
    patch.length1 += extraLength;
    patch.length2 += extraLength;
  }

  return nullPadding;
};


/**
 * Look through the patches and break up any which are longer than the maximum
 * limit of the match algorithm.
 * Intended to be called only from within patch_apply.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.
 */
diff_match_patch.prototype.patch_splitMax = function(patches) {
  var patch_size = this.Match_MaxBits;
  for (var x = 0; x < patches.length; x++) {
    if (patches[x].length1 > patch_size) {
      var bigpatch = patches[x];
      // Remove the big old patch.
      patches.splice(x--, 1);
      var start1 = bigpatch.start1;
      var start2 = bigpatch.start2;
      var precontext = '';
      while (bigpatch.diffs.length !== 0) {
        // Create one of several smaller patches.
        var patch = new diff_match_patch.patch_obj();
        var empty = true;
        patch.start1 = start1 - precontext.length;
        patch.start2 = start2 - precontext.length;
        if (precontext !== '') {
          patch.length1 = patch.length2 = precontext.length;
          patch.diffs.push([DIFF_EQUAL, precontext]);
        }
        while (bigpatch.diffs.length !== 0 &&
               patch.length1 < patch_size - this.Patch_Margin) {
          var diff_type = bigpatch.diffs[0][0];
          var diff_text = bigpatch.diffs[0][1];
          if (diff_type === DIFF_INSERT) {
            // Insertions are harmless.
            patch.length2 += diff_text.length;
            start2 += diff_text.length;
            patch.diffs.push(bigpatch.diffs.shift());
            empty = false;
          } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
                     patch.diffs[0][0] == DIFF_EQUAL &&
                     diff_text.length > 2 * patch_size) {
            // This is a large deletion.  Let it pass in one chunk.
            patch.length1 += diff_text.length;
            start1 += diff_text.length;
            empty = false;
            patch.diffs.push([diff_type, diff_text]);
            bigpatch.diffs.shift();
          } else {
            // Deletion or equality.  Only take as much as we can stomach.
            diff_text = diff_text.substring(0,
                patch_size - patch.length1 - this.Patch_Margin);
            patch.length1 += diff_text.length;
            start1 += diff_text.length;
            if (diff_type === DIFF_EQUAL) {
              patch.length2 += diff_text.length;
              start2 += diff_text.length;
            } else {
              empty = false;
            }
            patch.diffs.push([diff_type, diff_text]);
            if (diff_text == bigpatch.diffs[0][1]) {
              bigpatch.diffs.shift();
            } else {
              bigpatch.diffs[0][1] =
                  bigpatch.diffs[0][1].substring(diff_text.length);
            }
          }
        }
        // Compute the head context for the next patch.
        precontext = this.diff_text2(patch.diffs);
        precontext =
            precontext.substring(precontext.length - this.Patch_Margin);
        // Append the end context for this patch.
        var postcontext = this.diff_text1(bigpatch.diffs)
                              .substring(0, this.Patch_Margin);
        if (postcontext !== '') {
          patch.length1 += postcontext.length;
          patch.length2 += postcontext.length;
          if (patch.diffs.length !== 0 &&
              patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
            patch.diffs[patch.diffs.length - 1][1] += postcontext;
          } else {
            patch.diffs.push([DIFF_EQUAL, postcontext]);
          }
        }
        if (!empty) {
          patches.splice(++x, 0, patch);
        }
      }
    }
  }
};


/**
 * Take a list of patches and return a textual representation.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of patch objects.
 * @return {string} Text representation of patches.
 */
diff_match_patch.prototype.patch_toText = function(patches) {
  var text = [];
  for (var x = 0; x < patches.length; x++) {
    text[x] = patches[x];
  }
  return text.join('');
};


/**
 * Parse a textual representation of patches and return a list of patch objects.
 * @param {string} textline Text representation of patches.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of patch objects.
 * @throws {!Error} If invalid input.
 */
diff_match_patch.prototype.patch_fromText = function(textline) {
  var patches = [];
  if (!textline) {
    return patches;
  }
  var text = textline.split('\n');
  var textPointer = 0;
  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
  while (textPointer < text.length) {
    var m = text[textPointer].match(patchHeader);
    if (!m) {
      throw new Error('Invalid patch string: ' + text[textPointer]);
    }
    var patch = new diff_match_patch.patch_obj();
    patches.push(patch);
    patch.start1 = parseInt(m[1], 10);
    if (m[2] === '') {
      patch.start1--;
      patch.length1 = 1;
    } else if (m[2] == '0') {
      patch.length1 = 0;
    } else {
      patch.start1--;
      patch.length1 = parseInt(m[2], 10);
    }

    patch.start2 = parseInt(m[3], 10);
    if (m[4] === '') {
      patch.start2--;
      patch.length2 = 1;
    } else if (m[4] == '0') {
      patch.length2 = 0;
    } else {
      patch.start2--;
      patch.length2 = parseInt(m[4], 10);
    }
    textPointer++;

    while (textPointer < text.length) {
      var sign = text[textPointer].charAt(0);
      try {
        var line = decodeURI(text[textPointer].substring(1));
      } catch (ex) {
        // Malformed URI sequence.
        throw new Error('Illegal escape in patch_fromText: ' + line);
      }
      if (sign == '-') {
        // Deletion.
        patch.diffs.push([DIFF_DELETE, line]);
      } else if (sign == '+') {
        // Insertion.
        patch.diffs.push([DIFF_INSERT, line]);
      } else if (sign == ' ') {
        // Minor equality.
        patch.diffs.push([DIFF_EQUAL, line]);
      } else if (sign == '@') {
        // Start of next patch.
        break;
      } else if (sign === '') {
        // Blank line?  Whatever.
      } else {
        // WTF?
        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
      }
      textPointer++;
    }
  }
  return patches;
};


/**
 * Class representing one patch operation.
 * @constructor
 */
diff_match_patch.patch_obj = function() {
  /** @type {!Array.<!diff_match_patch.Diff>} */
  this.diffs = [];
  /** @type {?number} */
  this.start1 = null;
  /** @type {?number} */
  this.start2 = null;
  /** @type {number} */
  this.length1 = 0;
  /** @type {number} */
  this.length2 = 0;
};


/**
 * Emmulate GNU diff's format.
 * Header: @@ -382,8 +481,9 @@
 * Indicies are printed as 1-based, not 0-based.
 * @return {string} The GNU diff string.
 */
diff_match_patch.patch_obj.prototype.toString = function() {
  var coords1, coords2;
  if (this.length1 === 0) {
    coords1 = this.start1 + ',0';
  } else if (this.length1 == 1) {
    coords1 = this.start1 + 1;
  } else {
    coords1 = (this.start1 + 1) + ',' + this.length1;
  }
  if (this.length2 === 0) {
    coords2 = this.start2 + ',0';
  } else if (this.length2 == 1) {
    coords2 = this.start2 + 1;
  } else {
    coords2 = (this.start2 + 1) + ',' + this.length2;
  }
  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
  var op;
  // Escape the body of the patch with %xx notation.
  for (var x = 0; x < this.diffs.length; x++) {
    switch (this.diffs[x][0]) {
      case DIFF_INSERT:
        op = '+';
        break;
      case DIFF_DELETE:
        op = '-';
        break;
      case DIFF_EQUAL:
        op = ' ';
        break;
    }
    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
  }
  return text.join('').replace(/%20/g, ' ');
};


// Export these global variables so that they survive Google's JS compiler.
// In a browser, 'this' will be 'window'.
// In node.js 'this' will be a global object.
this['diff_match_patch'] = diff_match_patch;
this['DIFF_DELETE'] = DIFF_DELETE;
this['DIFF_INSERT'] = DIFF_INSERT;
this['DIFF_EQUAL'] = DIFF_EQUAL;


},{}],3:[function(require,module,exports){

var Pipe = require('../pipe').Pipe;

var Context = function Context(){
};

Context.prototype.setResult = function(result) {
	this.result = result;
	this.hasResult = true;
	return this;
};

Context.prototype.exit = function() {
	this.exiting = true;
	return this;
};

Context.prototype.switchTo = function(next, pipe) {
	if (typeof next === 'string' || next instanceof Pipe) {
		this.nextPipe = next;
	} else {
		this.next = next;
		if (pipe) {
			this.nextPipe = pipe;
		}
	}
	return this;
};

Context.prototype.push = function(child, name) {
	child.parent = this;
	if (typeof name !== 'undefined') {
		child.childName = name;
	}
	child.root = this.root || this;
	child.options = child.options || this.options;
	if (!this.children) {
		this.children = [child];
		this.nextAfterChildren = this.next || null;
		this.next = child;
	} else {
		this.children[this.children.length - 1].next = child;
		this.children.push(child);
	}
	child.next = this;
	return this;
};

exports.Context = Context;

},{"../pipe":17}],4:[function(require,module,exports){
var Context = require('./context').Context;

var DiffContext = function DiffContext(left, right) {
  this.left = left;
  this.right = right;
  this.pipe = 'diff';
};

DiffContext.prototype = new Context();

exports.DiffContext = DiffContext;

},{"./context":3}],5:[function(require,module,exports){
var Context = require('./context').Context;

var PatchContext = function PatchContext(left, delta) {
  this.left = left;
  this.delta = delta;
  this.pipe = 'patch';
};

PatchContext.prototype = new Context();

exports.PatchContext = PatchContext;

},{"./context":3}],6:[function(require,module,exports){
var Context = require('./context').Context;

var ReverseContext = function ReverseContext(delta) {
  this.delta = delta;
  this.pipe = 'reverse';
};

ReverseContext.prototype = new Context();

exports.ReverseContext = ReverseContext;

},{"./context":3}],7:[function(require,module,exports){
// use as 2nd parameter for JSON.parse to revive Date instances
module.exports = function dateReviver(key, value) {
  var parts;
  if (typeof value === 'string') {
    parts = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d*))?(Z|([+\-])(\d{2}):(\d{2}))$/.exec(value);
    if (parts) {
      return new Date(Date.UTC(+parts[1], +parts[2] - 1, +parts[3], +parts[4], +parts[5], +parts[6], +(parts[7] || 0)));
    }
  }
  return value;
};

},{}],8:[function(require,module,exports){
var Processor = require('./processor').Processor;
var Pipe = require('./pipe').Pipe;
var DiffContext = require('./contexts/diff').DiffContext;
var PatchContext = require('./contexts/patch').PatchContext;
var ReverseContext = require('./contexts/reverse').ReverseContext;

var trivial = require('./filters/trivial');
var nested = require('./filters/nested');
var arrays = require('./filters/arrays');
var dates = require('./filters/dates');
var texts = require('./filters/texts');

var DiffPatcher = function DiffPatcher(options) {
  this.processor = new Processor(options);
  this.processor.pipe(new Pipe('diff').append(
    nested.collectChildrenDiffFilter,
    trivial.diffFilter,
    dates.diffFilter,
    texts.diffFilter,
    nested.objectsDiffFilter,
    arrays.diffFilter
  ).shouldHaveResult());
  this.processor.pipe(new Pipe('patch').append(
    nested.collectChildrenPatchFilter,
    arrays.collectChildrenPatchFilter,
    trivial.patchFilter,
    texts.patchFilter,
    nested.patchFilter,
    arrays.patchFilter
  ).shouldHaveResult());
  this.processor.pipe(new Pipe('reverse').append(
    nested.collectChildrenReverseFilter,
    arrays.collectChildrenReverseFilter,
    trivial.reverseFilter,
    texts.reverseFilter,
    nested.reverseFilter,
    arrays.reverseFilter
  ).shouldHaveResult());
};

DiffPatcher.prototype.options = function() {
  return this.processor.options.apply(this.processor, arguments);
};

DiffPatcher.prototype.diff = function(left, right) {
  return this.processor.process(new DiffContext(left, right));
};

DiffPatcher.prototype.patch = function(left, delta) {
  return this.processor.process(new PatchContext(left, delta));
};

DiffPatcher.prototype.reverse = function(delta) {
  return this.processor.process(new ReverseContext(delta));
};

DiffPatcher.prototype.unpatch = function(right, delta) {
  return this.patch(right, this.reverse(delta));
};

exports.DiffPatcher = DiffPatcher;

},{"./contexts/diff":4,"./contexts/patch":5,"./contexts/reverse":6,"./filters/arrays":10,"./filters/dates":11,"./filters/nested":13,"./filters/texts":14,"./filters/trivial":15,"./pipe":17,"./processor":18}],9:[function(require,module,exports){

exports.isBrowser = typeof window !== 'undefined';

},{}],10:[function(require,module,exports){
var DiffContext = require('../contexts/diff').DiffContext;
var PatchContext = require('../contexts/patch').PatchContext;
var ReverseContext = require('../contexts/reverse').ReverseContext;

var lcs = require('./lcs');

var ARRAY_MOVE = 3;

var isArray = (typeof Array.isArray === 'function') ?
  // use native function
  Array.isArray :
  // use instanceof operator
  function(a) {
    return a instanceof Array;
  };

var arrayIndexOf = typeof Array.prototype.indexOf === 'function' ?
  function(array, item) {
    return array.indexOf(item);
  } : function(array, item) {
    var length = array.length;
    for (var i = 0; i < length; i++) {
      if (array[i] === item) {
        return i;
      }
    }
    return -1;
  };

function arraysHaveMatchByRef(array1, array2, len1, len2) {
  for (var index1 = 0; index1 < len1; index1++) {
    var val1 = array1[index1];
    for (var index2 = 0; index2 < len2; index2++) {
      var val2 = array2[index2];
      if (val1 === val2) {
        return true;
      }
    }
  }
}

function matchItems(array1, array2, index1, index2, context) {
  var value1 = array1[index1];
  var value2 = array2[index2];
  if (value1 === value2) {
    return true;
  }
  if (typeof value1 !== 'object' || typeof value2 !== 'object') {
    return false;
  }
  var objectHash = context.objectHash;
  if (!objectHash) {
    // no way to match objects was provided, try match by position
    return context.matchByPosition && index1 === index2;
  }
  var hash1;
  var hash2;
  if (typeof index1 === 'number') {
    context.hashCache1 = context.hashCache1 || [];
    hash1 = context.hashCache1[index1];
    if (typeof hash1 === 'undefined') {
      context.hashCache1[index1] = hash1 = objectHash(value1, index1);
    }
  } else {
    hash1 = objectHash(value1);
  }
  if (typeof hash1 === 'undefined') {
    return false;
  }
  if (typeof index2 === 'number') {
    context.hashCache2 = context.hashCache2 || [];
    hash2 = context.hashCache2[index2];
    if (typeof hash2 === 'undefined') {
      context.hashCache2[index2] = hash2 = objectHash(value2, index2);
    }
  } else {
    hash2 = objectHash(value2);
  }
  if (typeof hash2 === 'undefined') {
    return false;
  }
  return hash1 === hash2;
}

var diffFilter = function arraysDiffFilter(context) {
  if (!context.leftIsArray) {
    return;
  }

  var matchContext = {
    objectHash: context.options && context.options.objectHash,
    matchByPosition: context.options && context.options.matchByPosition
  };
  var commonHead = 0;
  var commonTail = 0;
  var index;
  var index1;
  var index2;
  var array1 = context.left;
  var array2 = context.right;
  var len1 = array1.length;
  var len2 = array2.length;

  var child;

  if (len1 > 0 && len2 > 0 && !matchContext.objectHash &&
    typeof matchContext.matchByPosition !== 'boolean') {
    matchContext.matchByPosition = !arraysHaveMatchByRef(array1, array2, len1, len2);
  }

  // separate common head
  while (commonHead < len1 && commonHead < len2 &&
    matchItems(array1, array2, commonHead, commonHead, matchContext)) {
    index = commonHead;
    child = new DiffContext(context.left[index], context.right[index]);
    context.push(child, index);
    commonHead++;
  }
  // separate common tail
  while (commonTail + commonHead < len1 && commonTail + commonHead < len2 &&
    matchItems(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext)) {
    index1 = len1 - 1 - commonTail;
    index2 = len2 - 1 - commonTail;
    child = new DiffContext(context.left[index1], context.right[index2]);
    context.push(child, index2);
    commonTail++;
  }
  var result;
  if (commonHead + commonTail === len1) {
    if (len1 === len2) {
      // arrays are identical
      context.setResult(undefined).exit();
      return;
    }
    // trivial case, a block (1 or more consecutive items) was added
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len2 - commonTail; index++) {
      result[index] = [array2[index]];
    }
    context.setResult(result).exit();
    return;
  }
  if (commonHead + commonTail === len2) {
    // trivial case, a block (1 or more consecutive items) was removed
    result = result || {
      _t: 'a'
    };
    for (index = commonHead; index < len1 - commonTail; index++) {
      result['_' + index] = [array1[index], 0, 0];
    }
    context.setResult(result).exit();
    return;
  }
  // reset hash cache
  delete matchContext.hashCache1;
  delete matchContext.hashCache2;

  // diff is not trivial, find the LCS (Longest Common Subsequence)
  var trimmed1 = array1.slice(commonHead, len1 - commonTail);
  var trimmed2 = array2.slice(commonHead, len2 - commonTail);
  var seq = lcs.get(
    trimmed1, trimmed2,
    matchItems,
    matchContext
  );
  var removedItems = [];
  result = result || {
    _t: 'a'
  };
  for (index = commonHead; index < len1 - commonTail; index++) {
    if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {
      // removed
      result['_' + index] = [array1[index], 0, 0];
      removedItems.push(index);
    }
  }

  var detectMove = true;
  if (context.options && context.options.arrays && context.options.arrays.detectMove === false) {
    detectMove = false;
  }
  var includeValueOnMove = false;
  if (context.options && context.options.arrays && context.options.arrays.includeValueOnMove) {
    includeValueOnMove = true;
  }

  var removedItemsLength = removedItems.length;
  for (index = commonHead; index < len2 - commonTail; index++) {
    var indexOnArray2 = arrayIndexOf(seq.indices2, index - commonHead);
    if (indexOnArray2 < 0) {
      // added, try to match with a removed item and register as position move
      var isMove = false;
      if (detectMove && removedItemsLength > 0) {
        for (var removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {
          index1 = removedItems[removeItemIndex1];
          if (matchItems(trimmed1, trimmed2, index1 - commonHead,
            index - commonHead, matchContext)) {
            // store position move as: [originalValue, newPosition, ARRAY_MOVE]
            result['_' + index1].splice(1, 2, index, ARRAY_MOVE);
            if (!includeValueOnMove) {
              // don't include moved value on diff, to save bytes
              result['_' + index1][0] = '';
            }

            index2 = index;
            child = new DiffContext(context.left[index1], context.right[index2]);
            context.push(child, index2);
            removedItems.splice(removeItemIndex1, 1);
            isMove = true;
            break;
          }
        }
      }
      if (!isMove) {
        // added
        result[index] = [array2[index]];
      }
    } else {
      // match, do inner diff
      index1 = seq.indices1[indexOnArray2] + commonHead;
      index2 = seq.indices2[indexOnArray2] + commonHead;
      child = new DiffContext(context.left[index1], context.right[index2]);
      context.push(child, index2);
    }
  }

  context.setResult(result).exit();

};
diffFilter.filterName = 'arrays';

var compare = {
  numerically: function(a, b) {
    return a - b;
  },
  numericallyBy: function(name) {
    return function(a, b) {
      return a[name] - b[name];
    };
  }
};

var patchFilter = function nestedPatchFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var index, index1;

  var delta = context.delta;
  var array = context.left;

  // first, separate removals, insertions and modifications
  var toRemove = [];
  var toInsert = [];
  var toModify = [];
  for (index in delta) {
    if (index !== '_t') {
      if (index[0] === '_') {
        // removed item from original array
        if (delta[index][2] === 0 || delta[index][2] === ARRAY_MOVE) {
          toRemove.push(parseInt(index.slice(1), 10));
        } else {
          throw new Error('only removal or move can be applied at original array indices' +
            ', invalid diff type: ' + delta[index][2]);
        }
      } else {
        if (delta[index].length === 1) {
          // added item at new array
          toInsert.push({
            index: parseInt(index, 10),
            value: delta[index][0]
          });
        } else {
          // modified item at new array
          toModify.push({
            index: parseInt(index, 10),
            delta: delta[index]
          });
        }
      }
    }
  }

  // remove items, in reverse order to avoid sawing our own floor
  toRemove = toRemove.sort(compare.numerically);
  for (index = toRemove.length - 1; index >= 0; index--) {
    index1 = toRemove[index];
    var indexDiff = delta['_' + index1];
    var removedValue = array.splice(index1, 1)[0];
    if (indexDiff[2] === ARRAY_MOVE) {
      // reinsert later
      toInsert.push({
        index: indexDiff[1],
        value: removedValue
      });
    }
  }

  // insert items, in reverse order to avoid moving our own floor
  toInsert = toInsert.sort(compare.numericallyBy('index'));
  var toInsertLength = toInsert.length;
  for (index = 0; index < toInsertLength; index++) {
    var insertion = toInsert[index];
    array.splice(insertion.index, 0, insertion.value);
  }

  // apply modifications
  var toModifyLength = toModify.length;
  var child;
  if (toModifyLength > 0) {
    for (index = 0; index < toModifyLength; index++) {
      var modification = toModify[index];
      child = new PatchContext(context.left[modification.index], modification.delta);
      context.push(child, modification.index);
    }
  }

  if (!context.children) {
    context.setResult(context.left).exit();
    return;
  }
  context.exit();
};
patchFilter.filterName = 'arrays';

var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    context.left[child.childName] = child.result;
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'arraysCollectChildren';

var reverseFilter = function arraysReverseFilter(context) {
  if (!context.nested) {
    if (context.delta[2] === ARRAY_MOVE) {
      context.newName = '_' + context.delta[1];
      context.setResult([context.delta[0], parseInt(context.childName.substr(1), 10), ARRAY_MOVE]).exit();
    }
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var name, child;
  for (name in context.delta) {
    if (name === '_t') {
      continue;
    }
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter.filterName = 'arrays';

var reverseArrayDeltaIndex = function(delta, index, itemDelta) {
  if (typeof index === 'string' && index[0] === '_') {
    return parseInt(index.substr(1), 10);
  } else if (isArray(itemDelta) && itemDelta[2] === 0) {
    return '_' + index;
  }

  var reverseIndex = +index;
  for (var deltaIndex in delta) {
    var deltaItem = delta[deltaIndex];
    if (isArray(deltaItem)) {
      if (deltaItem[2] === ARRAY_MOVE) {
        var moveFromIndex = parseInt(deltaIndex.substr(1), 10);
        var moveToIndex = deltaItem[1];
        if (moveToIndex === +index) {
          return moveFromIndex;
        }
        if (moveFromIndex <= reverseIndex && moveToIndex > reverseIndex) {
          reverseIndex++;
        } else if (moveFromIndex >= reverseIndex && moveToIndex < reverseIndex) {
          reverseIndex--;
        }
      } else if (deltaItem[2] === 0) {
        var deleteIndex = parseInt(deltaIndex.substr(1), 10);
        if (deleteIndex <= reverseIndex) {
          reverseIndex++;
        }
      } else if (deltaItem.length === 1 && deltaIndex <= reverseIndex) {
        reverseIndex--;
      }
    }
  }

  return reverseIndex;
};

var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t !== 'a') {
    return;
  }
  var length = context.children.length;
  var child;
  var delta = {
    _t: 'a'
  };

  for (var index = 0; index < length; index++) {
    child = context.children[index];
    var name = child.newName;
    if (typeof name === 'undefined') {
      name = reverseArrayDeltaIndex(context.delta, child.childName, child.result);
    }
    if (delta[name] !== child.result) {
      delta[name] = child.result;
    }
  }
  context.setResult(delta).exit();
};
collectChildrenReverseFilter.filterName = 'arraysCollectChildren';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.collectChildrenPatchFilter = collectChildrenPatchFilter;
exports.reverseFilter = reverseFilter;
exports.collectChildrenReverseFilter = collectChildrenReverseFilter;

},{"../contexts/diff":4,"../contexts/patch":5,"../contexts/reverse":6,"./lcs":12}],11:[function(require,module,exports){
var diffFilter = function datesDiffFilter(context) {
  if (context.left instanceof Date) {
    if (context.right instanceof Date) {
      if (context.left.getTime() !== context.right.getTime()) {
        context.setResult([context.left, context.right]);
      } else {
        context.setResult(undefined);
      }
    } else {
      context.setResult([context.left, context.right]);
    }
    context.exit();
  } else if (context.right instanceof Date) {
    context.setResult([context.left, context.right]).exit();
  }
};
diffFilter.filterName = 'dates';

exports.diffFilter = diffFilter;

},{}],12:[function(require,module,exports){
/*

LCS implementation that supports arrays or strings

reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem

*/

var defaultMatch = function(array1, array2, index1, index2) {
  return array1[index1] === array2[index2];
};

var lengthMatrix = function(array1, array2, match, context) {
  var len1 = array1.length;
  var len2 = array2.length;
  var x, y;

  // initialize empty matrix of len1+1 x len2+1
  var matrix = [len1 + 1];
  for (x = 0; x < len1 + 1; x++) {
    matrix[x] = [len2 + 1];
    for (y = 0; y < len2 + 1; y++) {
      matrix[x][y] = 0;
    }
  }
  matrix.match = match;
  // save sequence lengths for each coordinate
  for (x = 1; x < len1 + 1; x++) {
    for (y = 1; y < len2 + 1; y++) {
      if (match(array1, array2, x - 1, y - 1, context)) {
        matrix[x][y] = matrix[x - 1][y - 1] + 1;
      } else {
        matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);
      }
    }
  }
  return matrix;
};

var backtrack = function(matrix, array1, array2, index1, index2, context) {
  if (index1 === 0 || index2 === 0) {
    return {
      sequence: [],
      indices1: [],
      indices2: []
    };
  }

  if (matrix.match(array1, array2, index1 - 1, index2 - 1, context)) {
    var subsequence = backtrack(matrix, array1, array2, index1 - 1, index2 - 1, context);
    subsequence.sequence.push(array1[index1 - 1]);
    subsequence.indices1.push(index1 - 1);
    subsequence.indices2.push(index2 - 1);
    return subsequence;
  }

  if (matrix[index1][index2 - 1] > matrix[index1 - 1][index2]) {
    return backtrack(matrix, array1, array2, index1, index2 - 1, context);
  } else {
    return backtrack(matrix, array1, array2, index1 - 1, index2, context);
  }
};

var get = function(array1, array2, match, context) {
  context = context || {};
  var matrix = lengthMatrix(array1, array2, match || defaultMatch, context);
  var result = backtrack(matrix, array1, array2, array1.length, array2.length, context);
  if (typeof array1 === 'string' && typeof array2 === 'string') {
    result.sequence = result.sequence.join('');
  }
  return result;
};

exports.get = get;

},{}],13:[function(require,module,exports){
var DiffContext = require('../contexts/diff').DiffContext;
var PatchContext = require('../contexts/patch').PatchContext;
var ReverseContext = require('../contexts/reverse').ReverseContext;

var collectChildrenDiffFilter = function collectChildrenDiffFilter(context) {
  if (!context || !context.children) {
    return;
  }
  var length = context.children.length;
  var child;
  var result = context.result;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (typeof child.result === 'undefined') {
      continue;
    }
    result = result || {};
    result[child.childName] = child.result;
  }
  if (result && context.leftIsArray) {
    result._t = 'a';
  }
  context.setResult(result).exit();
};
collectChildrenDiffFilter.filterName = 'collectChildren';

var objectsDiffFilter = function objectsDiffFilter(context) {
  if (context.leftIsArray || context.leftType !== 'object') {
    return;
  }

  var name, child;
  for (name in context.left) {
    child = new DiffContext(context.left[name], context.right[name]);
    context.push(child, name);
  }
  for (name in context.right) {
    if (typeof context.left[name] === 'undefined') {
      child = new DiffContext(undefined, context.right[name]);
      context.push(child, name);
    }
  }

  if (!context.children || context.children.length === 0) {
    context.setResult(undefined).exit();
    return;
  }
  context.exit();
};
objectsDiffFilter.filterName = 'objects';

var patchFilter = function nestedPatchFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name, child;
  for (name in context.delta) {
    child = new PatchContext(context.left[name], context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
patchFilter.filterName = 'objects';

var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child;
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (context.left.hasOwnProperty(child.childName) && child.result === undefined) {
      delete context.left[child.childName];
    } else if (context.left[child.childName] !== child.result) {
      context.left[child.childName] = child.result;
    }
  }
  context.setResult(context.left).exit();
};
collectChildrenPatchFilter.filterName = 'collectChildren';

var reverseFilter = function nestedReverseFilter(context) {
  if (!context.nested) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var name, child;
  for (name in context.delta) {
    child = new ReverseContext(context.delta[name]);
    context.push(child, name);
  }
  context.exit();
};
reverseFilter.filterName = 'objects';

var collectChildrenReverseFilter = function collectChildrenReverseFilter(context) {
  if (!context || !context.children) {
    return;
  }
  if (context.delta._t) {
    return;
  }
  var length = context.children.length;
  var child;
  var delta = {};
  for (var index = 0; index < length; index++) {
    child = context.children[index];
    if (delta[child.childName] !== child.result) {
      delta[child.childName] = child.result;
    }
  }
  context.setResult(delta).exit();
};
collectChildrenReverseFilter.filterName = 'collectChildren';

exports.collectChildrenDiffFilter = collectChildrenDiffFilter;
exports.objectsDiffFilter = objectsDiffFilter;
exports.patchFilter = patchFilter;
exports.collectChildrenPatchFilter = collectChildrenPatchFilter;
exports.reverseFilter = reverseFilter;
exports.collectChildrenReverseFilter = collectChildrenReverseFilter;

},{"../contexts/diff":4,"../contexts/patch":5,"../contexts/reverse":6}],14:[function(require,module,exports){
/* global diff_match_patch */
var TEXT_DIFF = 2;
var DEFAULT_MIN_LENGTH = 60;
var cachedDiffPatch = null;

var getDiffMatchPatch = function(required) {
  /*jshint camelcase: false */

  if (!cachedDiffPatch) {
    var instance;
    if (typeof diff_match_patch !== 'undefined') {
      // already loaded, probably a browser
      instance = typeof diff_match_patch === 'function' ?
        new diff_match_patch() : new diff_match_patch.diff_match_patch();
    } else if (typeof require === 'function') {
      try {
        var dmpModuleName = 'diff_match_patch_uncompressed';
        var dmp = require('../../public/external/' + dmpModuleName);
        instance = new dmp.diff_match_patch();
      } catch (err) {
        instance = null;
      }
    }
    if (!instance) {
      if (!required) {
        return null;
      }
      var error = new Error('text diff_match_patch library not found');
      error.diff_match_patch_not_found = true;
      throw error;
    }
    cachedDiffPatch = {
      diff: function(txt1, txt2) {
        return instance.patch_toText(instance.patch_make(txt1, txt2));
      },
      patch: function(txt1, patch) {
        var results = instance.patch_apply(instance.patch_fromText(patch), txt1);
        for (var i = 0; i < results[1].length; i++) {
          if (!results[1][i]) {
            var error = new Error('text patch failed');
            error.textPatchFailed = true;
          }
        }
        return results[0];
      }
    };
  }
  return cachedDiffPatch;
};

var diffFilter = function textsDiffFilter(context) {
  if (context.leftType !== 'string') {
    return;
  }
  var minLength = (context.options && context.options.textDiff &&
    context.options.textDiff.minLength) || DEFAULT_MIN_LENGTH;
  if (context.left.length < minLength ||
    context.right.length < minLength) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  // large text, try to use a text-diff algorithm
  var diffMatchPatch = getDiffMatchPatch();
  if (!diffMatchPatch) {
    // diff-match-patch library not available, fallback to regular string replace
    context.setResult([context.left, context.right]).exit();
    return;
  }
  var diff = diffMatchPatch.diff;
  context.setResult([diff(context.left, context.right), 0, TEXT_DIFF]).exit();
};
diffFilter.filterName = 'texts';

var patchFilter = function textsPatchFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }

  // text-diff, use a text-patch algorithm
  var patch = getDiffMatchPatch(true).patch;
  context.setResult(patch(context.left, context.delta[0])).exit();
};
patchFilter.filterName = 'texts';

var textDeltaReverse = function(delta) {
  var i, l, lines, line, lineTmp, header = null,
    headerRegex = /^@@ +\-(\d+),(\d+) +\+(\d+),(\d+) +@@$/,
    lineHeader, lineAdd, lineRemove;
  lines = delta.split('\n');
  for (i = 0, l = lines.length; i < l; i++) {
    line = lines[i];
    var lineStart = line.slice(0, 1);
    if (lineStart === '@') {
      header = headerRegex.exec(line);
      lineHeader = i;
      lineAdd = null;
      lineRemove = null;

      // fix header
      lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';
    } else if (lineStart === '+') {
      lineAdd = i;
      lines[i] = '-' + lines[i].slice(1);
      if (lines[i - 1].slice(0, 1) === '+') {
        // swap lines to keep default order (-+)
        lineTmp = lines[i];
        lines[i] = lines[i - 1];
        lines[i - 1] = lineTmp;
      }
    } else if (lineStart === '-') {
      lineRemove = i;
      lines[i] = '+' + lines[i].slice(1);
    }
  }
  return lines.join('\n');
};

var reverseFilter = function textsReverseFilter(context) {
  if (context.nested) {
    return;
  }
  if (context.delta[2] !== TEXT_DIFF) {
    return;
  }

  // text-diff, use a text-diff algorithm
  context.setResult([textDeltaReverse(context.delta[0]), 0, TEXT_DIFF]).exit();
};
reverseFilter.filterName = 'texts';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.reverseFilter = reverseFilter;

},{}],15:[function(require,module,exports){
var isArray = (typeof Array.isArray === 'function') ?
  // use native function
  Array.isArray :
  // use instanceof operator
  function(a) {
    return a instanceof Array;
  };

var diffFilter = function trivialMatchesDiffFilter(context) {
  if (context.left === context.right) {
    context.setResult(undefined).exit();
    return;
  }
  if (typeof context.left === 'undefined') {
    if (typeof context.right === 'function') {
      throw new Error('functions are not supported');
    }
    context.setResult([context.right]).exit();
    return;
  }
  if (typeof context.right === 'undefined') {
    context.setResult([context.left, 0, 0]).exit();
    return;
  }
  if (typeof context.left === 'function' || typeof context.right === 'function') {
    throw new Error('functions are not supported');
  }
  context.leftType = context.left === null ? 'null' : typeof context.left;
  context.rightType = context.right === null ? 'null' : typeof context.right;
  if (context.leftType !== context.rightType) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.leftType === 'boolean' || context.leftType === 'number') {
    context.setResult([context.left, context.right]).exit();
    return;
  }
  if (context.leftType === 'object') {
    context.leftIsArray = isArray(context.left);
  }
  if (context.rightType === 'object') {
    context.rightIsArray = isArray(context.right);
  }
  if (context.leftIsArray !== context.rightIsArray) {
    context.setResult([context.left, context.right]).exit();
    return;
  }
};
diffFilter.filterName = 'trivial';

var patchFilter = function trivialMatchesPatchFilter(context) {
  if (typeof context.delta === 'undefined') {
    context.setResult(context.left).exit();
    return;
  }
  context.nested = !isArray(context.delta);
  if (context.nested) {
    return;
  }
  if (context.delta.length === 1) {
    context.setResult(context.delta[0]).exit();
    return;
  }
  if (context.delta.length === 2) {
    context.setResult(context.delta[1]).exit();
    return;
  }
  if (context.delta.length === 3 && context.delta[2] === 0) {
    context.setResult(undefined).exit();
    return;
  }
};
patchFilter.filterName = 'trivial';

var reverseFilter = function trivialReferseFilter(context) {
  if (typeof context.delta === 'undefined') {
    context.setResult(context.delta).exit();
    return;
  }
  context.nested = !isArray(context.delta);
  if (context.nested) {
    return;
  }
  if (context.delta.length === 1) {
    context.setResult([context.delta[0], 0, 0]).exit();
    return;
  }
  if (context.delta.length === 2) {
    context.setResult([context.delta[1], context.delta[0]]).exit();
    return;
  }
  if (context.delta.length === 3 && context.delta[2] === 0) {
    context.setResult([context.delta[0]]).exit();
    return;
  }
};
reverseFilter.filterName = 'trivial';

exports.diffFilter = diffFilter;
exports.patchFilter = patchFilter;
exports.reverseFilter = reverseFilter;

},{}],16:[function(require,module,exports){

var environment = require('./environment');

var DiffPatcher = require('./diffpatcher').DiffPatcher;
exports.DiffPatcher = DiffPatcher;

exports.create = function(options){
	return new DiffPatcher(options);
};

exports.dateReviver = require('./date-reviver');

var defaultInstance;

exports.diff = function() {
	if (!defaultInstance) {
		defaultInstance = new DiffPatcher();
	}
	return defaultInstance.diff.apply(defaultInstance, arguments);
};

exports.patch = function() {
	if (!defaultInstance) {
		defaultInstance = new DiffPatcher();
	}
	return defaultInstance.patch.apply(defaultInstance, arguments);
};

exports.unpatch = function() {
	if (!defaultInstance) {
		defaultInstance = new DiffPatcher();
	}
	return defaultInstance.unpatch.apply(defaultInstance, arguments);
};

exports.reverse = function() {
	if (!defaultInstance) {
		defaultInstance = new DiffPatcher();
	}
	return defaultInstance.reverse.apply(defaultInstance, arguments);
};

if (environment.isBrowser) {
	exports.homepage = 'https://github.com/benjamine/jsondiffpatch';
	exports.version = '0.1.37';
} else {
	var packageInfoModuleName = '../package.json';
	var packageInfo = require(packageInfoModuleName);
	exports.homepage = packageInfo.homepage;
	exports.version = packageInfo.version;

	var formatterModuleName = './formatters';
	var formatters = require(formatterModuleName);
	exports.formatters = formatters;
	// shortcut for console
	exports.console = formatters.console;
}

},{"./date-reviver":7,"./diffpatcher":8,"./environment":9}],17:[function(require,module,exports){
var Pipe = function Pipe(name) {
  this.name = name;
  this.filters = [];
};

Pipe.prototype.process = function(input) {
  if (!this.processor) {
    throw new Error('add this pipe to a processor before using it');
  }
  var debug = this.debug;
  var length = this.filters.length;
  var context = input;
  for (var index = 0; index < length; index++) {
    var filter = this.filters[index];
    if (debug) {
      this.log('filter: ' + filter.filterName);
    }
    filter(context);
    if (typeof context === 'object' && context.exiting) {
      context.exiting = false;
      break;
    }
  }
  if (!context.next && this.resultCheck) {
    this.resultCheck(context);
  }
};

Pipe.prototype.log = function(msg) {
  console.log('[jsondiffpatch] ' + this.name + ' pipe, ' + msg);
};

Pipe.prototype.append = function() {
  this.filters.push.apply(this.filters, arguments);
  return this;
};

Pipe.prototype.prepend = function() {
  this.filters.unshift.apply(this.filters, arguments);
  return this;
};

Pipe.prototype.indexOf = function(filterName) {
  if (!filterName) {
    throw new Error('a filter name is required');
  }
  for (var index = 0; index < this.filters.length; index++) {
    var filter = this.filters[index];
    if (filter.filterName === filterName) {
      return index;
    }
  }
  throw new Error('filter not found: ' + filterName);
};

Pipe.prototype.list = function() {
  var names = [];
  for (var index = 0; index < this.filters.length; index++) {
    var filter = this.filters[index];
    names.push(filter.filterName);
  }
  return names;
};

Pipe.prototype.after = function(filterName) {
  var index = this.indexOf(filterName);
  var params = Array.prototype.slice.call(arguments, 1);
  if (!params.length) {
    throw new Error('a filter is required');
  }
  params.unshift(index + 1, 0);
  Array.prototype.splice.apply(this.filters, params);
  return this;
};

Pipe.prototype.before = function(filterName) {
  var index = this.indexOf(filterName);
  var params = Array.prototype.slice.call(arguments, 1);
  if (!params.length) {
    throw new Error('a filter is required');
  }
  params.unshift(index, 0);
  Array.prototype.splice.apply(this.filters, params);
  return this;
};

Pipe.prototype.clear = function() {
  this.filters.length = 0;
  return this;
};

Pipe.prototype.shouldHaveResult = function(should) {
  if (should === false) {
    this.resultCheck = null;
    return;
  }
  if (this.resultCheck) {
    return;
  }
  var pipe = this;
  this.resultCheck = function(context) {
    if (!context.hasResult) {
      console.log(context);
      var error = new Error(pipe.name + ' failed');
      error.noResult = true;
      throw error;
    }
  };
  return this;
};

exports.Pipe = Pipe;

},{}],18:[function(require,module,exports){

var Processor = function Processor(options){
	this.selfOptions = options;
	this.pipes = {};
};

Processor.prototype.options = function(options) {
	if (options) {
		this.selfOptions = options;
	}
	return this.selfOptions;
};

Processor.prototype.pipe = function(name, pipe) {
	if (typeof name === 'string') {
		if (typeof pipe === 'undefined') {
			return this.pipes[name];
		} else {
			this.pipes[name] = pipe;
		}
	}
	if (name && name.name) {
		pipe = name;
		if (pipe.processor === this) { return pipe; }
		this.pipes[pipe.name] = pipe;
	}
	pipe.processor = this;
	return pipe;
};

Processor.prototype.process = function(input, pipe) {
	var context = input;
	context.options = this.options();
	var nextPipe = pipe || input.pipe || 'default';
	var lastPipe, lastContext;
	while (nextPipe) {
		if (typeof context.nextAfterChildren !== 'undefined') {
			// children processed and coming back to parent
			context.next = context.nextAfterChildren;
			context.nextAfterChildren = null;
		}

		if (typeof nextPipe === 'string') {
			nextPipe = this.pipe(nextPipe);
		}
		nextPipe.process(context);
		lastContext = context;
		lastPipe = nextPipe;
		nextPipe = null;
		if (context) {
			if (context.next) {
				context = context.next;
				nextPipe = lastContext.nextPipe || context.pipe || lastPipe;
			}
		}
	}
	return context.hasResult ? context.result : undefined;
};

exports.Processor = Processor;

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9maWJlcmdsYXNzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi1mdWxsLmpzIiwicHVibGljL2V4dGVybmFsL2RpZmZfbWF0Y2hfcGF0Y2hfdW5jb21wcmVzc2VkLmpzIiwic3JjL2NvbnRleHRzL2NvbnRleHQuanMiLCJzcmMvY29udGV4dHMvZGlmZi5qcyIsInNyYy9jb250ZXh0cy9wYXRjaC5qcyIsInNyYy9jb250ZXh0cy9yZXZlcnNlLmpzIiwic3JjL2RhdGUtcmV2aXZlci5qcyIsInNyYy9kaWZmcGF0Y2hlci5qcyIsInNyYy9lbnZpcm9ubWVudC5qcyIsInNyYy9maWx0ZXJzL2FycmF5cy5qcyIsInNyYy9maWx0ZXJzL2RhdGVzLmpzIiwic3JjL2ZpbHRlcnMvbGNzLmpzIiwic3JjL2ZpbHRlcnMvbmVzdGVkLmpzIiwic3JjL2ZpbHRlcnMvdGV4dHMuanMiLCJzcmMvZmlsdGVycy90cml2aWFsLmpzIiwic3JjL21haW4uanMiLCJzcmMvcGlwZS5qcyIsInNyYy9wcm9jZXNzb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDam5FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0RBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0YkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZW52aXJvbm1lbnQgPSByZXF1aXJlKCcuL2Vudmlyb25tZW50Jyk7XG5cbmlmIChlbnZpcm9ubWVudC5pc0Jyb3dzZXIpIHtcbiAgLyogZ2xvYmFsIHdpbmRvdyAqL1xuICAvKiBqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuICB3aW5kb3cuZGlmZl9tYXRjaF9wYXRjaCA9IHJlcXVpcmUoJy4uL3B1YmxpYy9leHRlcm5hbC9kaWZmX21hdGNoX3BhdGNoX3VuY29tcHJlc3NlZCcpO1xuICAvKiBqc2hpbnQgY2FtZWxjYXNlOiB0cnVlICovXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9tYWluJyk7XG4iLCIvKipcbiAqIERpZmYgTWF0Y2ggYW5kIFBhdGNoXG4gKlxuICogQ29weXJpZ2h0IDIwMDYgR29vZ2xlIEluYy5cbiAqIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtZGlmZi1tYXRjaC1wYXRjaC9cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBDb21wdXRlcyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHR3byB0ZXh0cyB0byBjcmVhdGUgYSBwYXRjaC5cbiAqIEFwcGxpZXMgdGhlIHBhdGNoIG9udG8gYW5vdGhlciB0ZXh0LCBhbGxvd2luZyBmb3IgZXJyb3JzLlxuICogQGF1dGhvciBmcmFzZXJAZ29vZ2xlLmNvbSAoTmVpbCBGcmFzZXIpXG4gKi9cblxuLyoqXG4gKiBDbGFzcyBjb250YWluaW5nIHRoZSBkaWZmLCBtYXRjaCBhbmQgcGF0Y2ggbWV0aG9kcy5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBkaWZmX21hdGNoX3BhdGNoKCkge1xuXG4gIC8vIERlZmF1bHRzLlxuICAvLyBSZWRlZmluZSB0aGVzZSBpbiB5b3VyIHByb2dyYW0gdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzLlxuXG4gIC8vIE51bWJlciBvZiBzZWNvbmRzIHRvIG1hcCBhIGRpZmYgYmVmb3JlIGdpdmluZyB1cCAoMCBmb3IgaW5maW5pdHkpLlxuICB0aGlzLkRpZmZfVGltZW91dCA9IDEuMDtcbiAgLy8gQ29zdCBvZiBhbiBlbXB0eSBlZGl0IG9wZXJhdGlvbiBpbiB0ZXJtcyBvZiBlZGl0IGNoYXJhY3RlcnMuXG4gIHRoaXMuRGlmZl9FZGl0Q29zdCA9IDQ7XG4gIC8vIEF0IHdoYXQgcG9pbnQgaXMgbm8gbWF0Y2ggZGVjbGFyZWQgKDAuMCA9IHBlcmZlY3Rpb24sIDEuMCA9IHZlcnkgbG9vc2UpLlxuICB0aGlzLk1hdGNoX1RocmVzaG9sZCA9IDAuNTtcbiAgLy8gSG93IGZhciB0byBzZWFyY2ggZm9yIGEgbWF0Y2ggKDAgPSBleGFjdCBsb2NhdGlvbiwgMTAwMCsgPSBicm9hZCBtYXRjaCkuXG4gIC8vIEEgbWF0Y2ggdGhpcyBtYW55IGNoYXJhY3RlcnMgYXdheSBmcm9tIHRoZSBleHBlY3RlZCBsb2NhdGlvbiB3aWxsIGFkZFxuICAvLyAxLjAgdG8gdGhlIHNjb3JlICgwLjAgaXMgYSBwZXJmZWN0IG1hdGNoKS5cbiAgdGhpcy5NYXRjaF9EaXN0YW5jZSA9IDEwMDA7XG4gIC8vIFdoZW4gZGVsZXRpbmcgYSBsYXJnZSBibG9jayBvZiB0ZXh0IChvdmVyIH42NCBjaGFyYWN0ZXJzKSwgaG93IGNsb3NlIGRvZXNcbiAgLy8gdGhlIGNvbnRlbnRzIGhhdmUgdG8gbWF0Y2ggdGhlIGV4cGVjdGVkIGNvbnRlbnRzLiAoMC4wID0gcGVyZmVjdGlvbixcbiAgLy8gMS4wID0gdmVyeSBsb29zZSkuICBOb3RlIHRoYXQgTWF0Y2hfVGhyZXNob2xkIGNvbnRyb2xzIGhvdyBjbG9zZWx5IHRoZVxuICAvLyBlbmQgcG9pbnRzIG9mIGEgZGVsZXRlIG5lZWQgdG8gbWF0Y2guXG4gIHRoaXMuUGF0Y2hfRGVsZXRlVGhyZXNob2xkID0gMC41O1xuICAvLyBDaHVuayBzaXplIGZvciBjb250ZXh0IGxlbmd0aC5cbiAgdGhpcy5QYXRjaF9NYXJnaW4gPSA0O1xuXG4gIC8vIFRoZSBudW1iZXIgb2YgYml0cyBpbiBhbiBpbnQuXG4gIHRoaXMuTWF0Y2hfTWF4Qml0cyA9IDMyO1xufVxuXG5cbi8vICBESUZGIEZVTkNUSU9OU1xuXG5cbi8qKlxuICogVGhlIGRhdGEgc3RydWN0dXJlIHJlcHJlc2VudGluZyBhIGRpZmYgaXMgYW4gYXJyYXkgb2YgdHVwbGVzOlxuICogW1tESUZGX0RFTEVURSwgJ0hlbGxvJ10sIFtESUZGX0lOU0VSVCwgJ0dvb2RieWUnXSwgW0RJRkZfRVFVQUwsICcgd29ybGQuJ11dXG4gKiB3aGljaCBtZWFuczogZGVsZXRlICdIZWxsbycsIGFkZCAnR29vZGJ5ZScgYW5kIGtlZXAgJyB3b3JsZC4nXG4gKi9cbnZhciBESUZGX0RFTEVURSA9IC0xO1xudmFyIERJRkZfSU5TRVJUID0gMTtcbnZhciBESUZGX0VRVUFMID0gMDtcblxuLyoqIEB0eXBlZGVmIHshQXJyYXkuPG51bWJlcnxzdHJpbmc+fSAqL1xuZGlmZl9tYXRjaF9wYXRjaC5EaWZmO1xuXG5cbi8qKlxuICogRmluZCB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiB0d28gdGV4dHMuICBTaW1wbGlmaWVzIHRoZSBwcm9ibGVtIGJ5IHN0cmlwcGluZ1xuICogYW55IGNvbW1vbiBwcmVmaXggb3Igc3VmZml4IG9mZiB0aGUgdGV4dHMgYmVmb3JlIGRpZmZpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgT2xkIHN0cmluZyB0byBiZSBkaWZmZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgTmV3IHN0cmluZyB0byBiZSBkaWZmZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW49fSBvcHRfY2hlY2tsaW5lcyBPcHRpb25hbCBzcGVlZHVwIGZsYWcuIElmIHByZXNlbnQgYW5kIGZhbHNlLFxuICogICAgIHRoZW4gZG9uJ3QgcnVuIGEgbGluZS1sZXZlbCBkaWZmIGZpcnN0IHRvIGlkZW50aWZ5IHRoZSBjaGFuZ2VkIGFyZWFzLlxuICogICAgIERlZmF1bHRzIHRvIHRydWUsIHdoaWNoIGRvZXMgYSBmYXN0ZXIsIHNsaWdodGx5IGxlc3Mgb3B0aW1hbCBkaWZmLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdF9kZWFkbGluZSBPcHRpb25hbCB0aW1lIHdoZW4gdGhlIGRpZmYgc2hvdWxkIGJlIGNvbXBsZXRlXG4gKiAgICAgYnkuICBVc2VkIGludGVybmFsbHkgZm9yIHJlY3Vyc2l2ZSBjYWxscy4gIFVzZXJzIHNob3VsZCBzZXQgRGlmZlRpbWVvdXRcbiAqICAgICBpbnN0ZWFkLlxuICogQHJldHVybiB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfbWFpbiA9IGZ1bmN0aW9uKHRleHQxLCB0ZXh0Miwgb3B0X2NoZWNrbGluZXMsXG4gICAgb3B0X2RlYWRsaW5lKSB7XG4gIC8vIFNldCBhIGRlYWRsaW5lIGJ5IHdoaWNoIHRpbWUgdGhlIGRpZmYgbXVzdCBiZSBjb21wbGV0ZS5cbiAgaWYgKHR5cGVvZiBvcHRfZGVhZGxpbmUgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodGhpcy5EaWZmX1RpbWVvdXQgPD0gMCkge1xuICAgICAgb3B0X2RlYWRsaW5lID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0X2RlYWRsaW5lID0gKG5ldyBEYXRlKS5nZXRUaW1lKCkgKyB0aGlzLkRpZmZfVGltZW91dCAqIDEwMDA7XG4gICAgfVxuICB9XG4gIHZhciBkZWFkbGluZSA9IG9wdF9kZWFkbGluZTtcblxuICAvLyBDaGVjayBmb3IgbnVsbCBpbnB1dHMuXG4gIGlmICh0ZXh0MSA9PSBudWxsIHx8IHRleHQyID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ051bGwgaW5wdXQuIChkaWZmX21haW4pJyk7XG4gIH1cblxuICAvLyBDaGVjayBmb3IgZXF1YWxpdHkgKHNwZWVkdXApLlxuICBpZiAodGV4dDEgPT0gdGV4dDIpIHtcbiAgICBpZiAodGV4dDEpIHtcbiAgICAgIHJldHVybiBbW0RJRkZfRVFVQUwsIHRleHQxXV07XG4gICAgfVxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0X2NoZWNrbGluZXMgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBvcHRfY2hlY2tsaW5lcyA9IHRydWU7XG4gIH1cbiAgdmFyIGNoZWNrbGluZXMgPSBvcHRfY2hlY2tsaW5lcztcblxuICAvLyBUcmltIG9mZiBjb21tb24gcHJlZml4IChzcGVlZHVwKS5cbiAgdmFyIGNvbW1vbmxlbmd0aCA9IHRoaXMuZGlmZl9jb21tb25QcmVmaXgodGV4dDEsIHRleHQyKTtcbiAgdmFyIGNvbW1vbnByZWZpeCA9IHRleHQxLnN1YnN0cmluZygwLCBjb21tb25sZW5ndGgpO1xuICB0ZXh0MSA9IHRleHQxLnN1YnN0cmluZyhjb21tb25sZW5ndGgpO1xuICB0ZXh0MiA9IHRleHQyLnN1YnN0cmluZyhjb21tb25sZW5ndGgpO1xuXG4gIC8vIFRyaW0gb2ZmIGNvbW1vbiBzdWZmaXggKHNwZWVkdXApLlxuICBjb21tb25sZW5ndGggPSB0aGlzLmRpZmZfY29tbW9uU3VmZml4KHRleHQxLCB0ZXh0Mik7XG4gIHZhciBjb21tb25zdWZmaXggPSB0ZXh0MS5zdWJzdHJpbmcodGV4dDEubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcbiAgdGV4dDEgPSB0ZXh0MS5zdWJzdHJpbmcoMCwgdGV4dDEubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcbiAgdGV4dDIgPSB0ZXh0Mi5zdWJzdHJpbmcoMCwgdGV4dDIubGVuZ3RoIC0gY29tbW9ubGVuZ3RoKTtcblxuICAvLyBDb21wdXRlIHRoZSBkaWZmIG9uIHRoZSBtaWRkbGUgYmxvY2suXG4gIHZhciBkaWZmcyA9IHRoaXMuZGlmZl9jb21wdXRlXyh0ZXh0MSwgdGV4dDIsIGNoZWNrbGluZXMsIGRlYWRsaW5lKTtcblxuICAvLyBSZXN0b3JlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgaWYgKGNvbW1vbnByZWZpeCkge1xuICAgIGRpZmZzLnVuc2hpZnQoW0RJRkZfRVFVQUwsIGNvbW1vbnByZWZpeF0pO1xuICB9XG4gIGlmIChjb21tb25zdWZmaXgpIHtcbiAgICBkaWZmcy5wdXNoKFtESUZGX0VRVUFMLCBjb21tb25zdWZmaXhdKTtcbiAgfVxuICB0aGlzLmRpZmZfY2xlYW51cE1lcmdlKGRpZmZzKTtcbiAgcmV0dXJuIGRpZmZzO1xufTtcblxuXG4vKipcbiAqIEZpbmQgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gdHdvIHRleHRzLiAgQXNzdW1lcyB0aGF0IHRoZSB0ZXh0cyBkbyBub3RcbiAqIGhhdmUgYW55IGNvbW1vbiBwcmVmaXggb3Igc3VmZml4LlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIE9sZCBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIE5ldyBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuICogQHBhcmFtIHtib29sZWFufSBjaGVja2xpbmVzIFNwZWVkdXAgZmxhZy4gIElmIGZhbHNlLCB0aGVuIGRvbid0IHJ1biBhXG4gKiAgICAgbGluZS1sZXZlbCBkaWZmIGZpcnN0IHRvIGlkZW50aWZ5IHRoZSBjaGFuZ2VkIGFyZWFzLlxuICogICAgIElmIHRydWUsIHRoZW4gcnVuIGEgZmFzdGVyLCBzbGlnaHRseSBsZXNzIG9wdGltYWwgZGlmZi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWFkbGluZSBUaW1lIHdoZW4gdGhlIGRpZmYgc2hvdWxkIGJlIGNvbXBsZXRlIGJ5LlxuICogQHJldHVybiB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKiBAcHJpdmF0ZVxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX2NvbXB1dGVfID0gZnVuY3Rpb24odGV4dDEsIHRleHQyLCBjaGVja2xpbmVzLFxuICAgIGRlYWRsaW5lKSB7XG4gIHZhciBkaWZmcztcblxuICBpZiAoIXRleHQxKSB7XG4gICAgLy8gSnVzdCBhZGQgc29tZSB0ZXh0IChzcGVlZHVwKS5cbiAgICByZXR1cm4gW1tESUZGX0lOU0VSVCwgdGV4dDJdXTtcbiAgfVxuXG4gIGlmICghdGV4dDIpIHtcbiAgICAvLyBKdXN0IGRlbGV0ZSBzb21lIHRleHQgKHNwZWVkdXApLlxuICAgIHJldHVybiBbW0RJRkZfREVMRVRFLCB0ZXh0MV1dO1xuICB9XG5cbiAgdmFyIGxvbmd0ZXh0ID0gdGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoID8gdGV4dDEgOiB0ZXh0MjtcbiAgdmFyIHNob3J0dGV4dCA9IHRleHQxLmxlbmd0aCA+IHRleHQyLmxlbmd0aCA/IHRleHQyIDogdGV4dDE7XG4gIHZhciBpID0gbG9uZ3RleHQuaW5kZXhPZihzaG9ydHRleHQpO1xuICBpZiAoaSAhPSAtMSkge1xuICAgIC8vIFNob3J0ZXIgdGV4dCBpcyBpbnNpZGUgdGhlIGxvbmdlciB0ZXh0IChzcGVlZHVwKS5cbiAgICBkaWZmcyA9IFtbRElGRl9JTlNFUlQsIGxvbmd0ZXh0LnN1YnN0cmluZygwLCBpKV0sXG4gICAgICAgICAgICAgW0RJRkZfRVFVQUwsIHNob3J0dGV4dF0sXG4gICAgICAgICAgICAgW0RJRkZfSU5TRVJULCBsb25ndGV4dC5zdWJzdHJpbmcoaSArIHNob3J0dGV4dC5sZW5ndGgpXV07XG4gICAgLy8gU3dhcCBpbnNlcnRpb25zIGZvciBkZWxldGlvbnMgaWYgZGlmZiBpcyByZXZlcnNlZC5cbiAgICBpZiAodGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoKSB7XG4gICAgICBkaWZmc1swXVswXSA9IGRpZmZzWzJdWzBdID0gRElGRl9ERUxFVEU7XG4gICAgfVxuICAgIHJldHVybiBkaWZmcztcbiAgfVxuXG4gIGlmIChzaG9ydHRleHQubGVuZ3RoID09IDEpIHtcbiAgICAvLyBTaW5nbGUgY2hhcmFjdGVyIHN0cmluZy5cbiAgICAvLyBBZnRlciB0aGUgcHJldmlvdXMgc3BlZWR1cCwgdGhlIGNoYXJhY3RlciBjYW4ndCBiZSBhbiBlcXVhbGl0eS5cbiAgICByZXR1cm4gW1tESUZGX0RFTEVURSwgdGV4dDFdLCBbRElGRl9JTlNFUlQsIHRleHQyXV07XG4gIH1cbiAgbG9uZ3RleHQgPSBzaG9ydHRleHQgPSBudWxsOyAgLy8gR2FyYmFnZSBjb2xsZWN0LlxuXG4gIC8vIENoZWNrIHRvIHNlZSBpZiB0aGUgcHJvYmxlbSBjYW4gYmUgc3BsaXQgaW4gdHdvLlxuICB2YXIgaG0gPSB0aGlzLmRpZmZfaGFsZk1hdGNoXyh0ZXh0MSwgdGV4dDIpO1xuICBpZiAoaG0pIHtcbiAgICAvLyBBIGhhbGYtbWF0Y2ggd2FzIGZvdW5kLCBzb3J0IG91dCB0aGUgcmV0dXJuIGRhdGEuXG4gICAgdmFyIHRleHQxX2EgPSBobVswXTtcbiAgICB2YXIgdGV4dDFfYiA9IGhtWzFdO1xuICAgIHZhciB0ZXh0Ml9hID0gaG1bMl07XG4gICAgdmFyIHRleHQyX2IgPSBobVszXTtcbiAgICB2YXIgbWlkX2NvbW1vbiA9IGhtWzRdO1xuICAgIC8vIFNlbmQgYm90aCBwYWlycyBvZmYgZm9yIHNlcGFyYXRlIHByb2Nlc3NpbmcuXG4gICAgdmFyIGRpZmZzX2EgPSB0aGlzLmRpZmZfbWFpbih0ZXh0MV9hLCB0ZXh0Ml9hLCBjaGVja2xpbmVzLCBkZWFkbGluZSk7XG4gICAgdmFyIGRpZmZzX2IgPSB0aGlzLmRpZmZfbWFpbih0ZXh0MV9iLCB0ZXh0Ml9iLCBjaGVja2xpbmVzLCBkZWFkbGluZSk7XG4gICAgLy8gTWVyZ2UgdGhlIHJlc3VsdHMuXG4gICAgcmV0dXJuIGRpZmZzX2EuY29uY2F0KFtbRElGRl9FUVVBTCwgbWlkX2NvbW1vbl1dLCBkaWZmc19iKTtcbiAgfVxuXG4gIGlmIChjaGVja2xpbmVzICYmIHRleHQxLmxlbmd0aCA+IDEwMCAmJiB0ZXh0Mi5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm4gdGhpcy5kaWZmX2xpbmVNb2RlXyh0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmRpZmZfYmlzZWN0Xyh0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lKTtcbn07XG5cblxuLyoqXG4gKiBEbyBhIHF1aWNrIGxpbmUtbGV2ZWwgZGlmZiBvbiBib3RoIHN0cmluZ3MsIHRoZW4gcmVkaWZmIHRoZSBwYXJ0cyBmb3JcbiAqIGdyZWF0ZXIgYWNjdXJhY3kuXG4gKiBUaGlzIHNwZWVkdXAgY2FuIHByb2R1Y2Ugbm9uLW1pbmltYWwgZGlmZnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgT2xkIHN0cmluZyB0byBiZSBkaWZmZWQuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgTmV3IHN0cmluZyB0byBiZSBkaWZmZWQuXG4gKiBAcGFyYW0ge251bWJlcn0gZGVhZGxpbmUgVGltZSB3aGVuIHRoZSBkaWZmIHNob3VsZCBiZSBjb21wbGV0ZSBieS5cbiAqIEByZXR1cm4geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9saW5lTW9kZV8gPSBmdW5jdGlvbih0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lKSB7XG4gIC8vIFNjYW4gdGhlIHRleHQgb24gYSBsaW5lLWJ5LWxpbmUgYmFzaXMgZmlyc3QuXG4gIHZhciBhID0gdGhpcy5kaWZmX2xpbmVzVG9DaGFyc18odGV4dDEsIHRleHQyKTtcbiAgdGV4dDEgPSAvKiogQHR5cGUge3N0cmluZ30gKi8oYVswXSk7XG4gIHRleHQyID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovKGFbMV0pO1xuICB2YXIgbGluZWFycmF5ID0gLyoqIEB0eXBlIHshQXJyYXkuPHN0cmluZz59ICovKGFbMl0pO1xuXG4gIHZhciBkaWZmcyA9IHRoaXMuZGlmZl9iaXNlY3RfKHRleHQxLCB0ZXh0MiwgZGVhZGxpbmUpO1xuXG4gIC8vIENvbnZlcnQgdGhlIGRpZmYgYmFjayB0byBvcmlnaW5hbCB0ZXh0LlxuICB0aGlzLmRpZmZfY2hhcnNUb0xpbmVzXyhkaWZmcywgbGluZWFycmF5KTtcbiAgLy8gRWxpbWluYXRlIGZyZWFrIG1hdGNoZXMgKGUuZy4gYmxhbmsgbGluZXMpXG4gIHRoaXMuZGlmZl9jbGVhbnVwU2VtYW50aWMoZGlmZnMpO1xuXG4gIC8vIFJlZGlmZiBhbnkgcmVwbGFjZW1lbnQgYmxvY2tzLCB0aGlzIHRpbWUgY2hhcmFjdGVyLWJ5LWNoYXJhY3Rlci5cbiAgLy8gQWRkIGEgZHVtbXkgZW50cnkgYXQgdGhlIGVuZC5cbiAgZGlmZnMucHVzaChbRElGRl9FUVVBTCwgJyddKTtcbiAgdmFyIHBvaW50ZXIgPSAwO1xuICB2YXIgY291bnRfZGVsZXRlID0gMDtcbiAgdmFyIGNvdW50X2luc2VydCA9IDA7XG4gIHZhciB0ZXh0X2RlbGV0ZSA9ICcnO1xuICB2YXIgdGV4dF9pbnNlcnQgPSAnJztcbiAgd2hpbGUgKHBvaW50ZXIgPCBkaWZmcy5sZW5ndGgpIHtcbiAgICBzd2l0Y2ggKGRpZmZzW3BvaW50ZXJdWzBdKSB7XG4gICAgICBjYXNlIERJRkZfSU5TRVJUOlxuICAgICAgICBjb3VudF9pbnNlcnQrKztcbiAgICAgICAgdGV4dF9pbnNlcnQgKz0gZGlmZnNbcG9pbnRlcl1bMV07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgY291bnRfZGVsZXRlKys7XG4gICAgICAgIHRleHRfZGVsZXRlICs9IGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgLy8gVXBvbiByZWFjaGluZyBhbiBlcXVhbGl0eSwgY2hlY2sgZm9yIHByaW9yIHJlZHVuZGFuY2llcy5cbiAgICAgICAgaWYgKGNvdW50X2RlbGV0ZSA+PSAxICYmIGNvdW50X2luc2VydCA+PSAxKSB7XG4gICAgICAgICAgLy8gRGVsZXRlIHRoZSBvZmZlbmRpbmcgcmVjb3JkcyBhbmQgYWRkIHRoZSBtZXJnZWQgb25lcy5cbiAgICAgICAgICB2YXIgYSA9IHRoaXMuZGlmZl9tYWluKHRleHRfZGVsZXRlLCB0ZXh0X2luc2VydCwgZmFsc2UsIGRlYWRsaW5lKTtcbiAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydCxcbiAgICAgICAgICAgICAgICAgICAgICAgY291bnRfZGVsZXRlICsgY291bnRfaW5zZXJ0KTtcbiAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydDtcbiAgICAgICAgICBmb3IgKHZhciBqID0gYS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIsIDAsIGFbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwb2ludGVyID0gcG9pbnRlciArIGEubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50X2luc2VydCA9IDA7XG4gICAgICAgIGNvdW50X2RlbGV0ZSA9IDA7XG4gICAgICAgIHRleHRfZGVsZXRlID0gJyc7XG4gICAgICAgIHRleHRfaW5zZXJ0ID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwb2ludGVyKys7XG4gIH1cbiAgZGlmZnMucG9wKCk7ICAvLyBSZW1vdmUgdGhlIGR1bW15IGVudHJ5IGF0IHRoZSBlbmQuXG5cbiAgcmV0dXJuIGRpZmZzO1xufTtcblxuXG4vKipcbiAqIEZpbmQgdGhlICdtaWRkbGUgc25ha2UnIG9mIGEgZGlmZiwgc3BsaXQgdGhlIHByb2JsZW0gaW4gdHdvXG4gKiBhbmQgcmV0dXJuIHRoZSByZWN1cnNpdmVseSBjb25zdHJ1Y3RlZCBkaWZmLlxuICogU2VlIE15ZXJzIDE5ODYgcGFwZXI6IEFuIE8oTkQpIERpZmZlcmVuY2UgQWxnb3JpdGhtIGFuZCBJdHMgVmFyaWF0aW9ucy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBOZXcgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWFkbGluZSBUaW1lIGF0IHdoaWNoIHRvIGJhaWwgaWYgbm90IHlldCBjb21wbGV0ZS5cbiAqIEByZXR1cm4geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9iaXNlY3RfID0gZnVuY3Rpb24odGV4dDEsIHRleHQyLCBkZWFkbGluZSkge1xuICAvLyBDYWNoZSB0aGUgdGV4dCBsZW5ndGhzIHRvIHByZXZlbnQgbXVsdGlwbGUgY2FsbHMuXG4gIHZhciB0ZXh0MV9sZW5ndGggPSB0ZXh0MS5sZW5ndGg7XG4gIHZhciB0ZXh0Ml9sZW5ndGggPSB0ZXh0Mi5sZW5ndGg7XG4gIHZhciBtYXhfZCA9IE1hdGguY2VpbCgodGV4dDFfbGVuZ3RoICsgdGV4dDJfbGVuZ3RoKSAvIDIpO1xuICB2YXIgdl9vZmZzZXQgPSBtYXhfZDtcbiAgdmFyIHZfbGVuZ3RoID0gMiAqIG1heF9kO1xuICB2YXIgdjEgPSBuZXcgQXJyYXkodl9sZW5ndGgpO1xuICB2YXIgdjIgPSBuZXcgQXJyYXkodl9sZW5ndGgpO1xuICAvLyBTZXR0aW5nIGFsbCBlbGVtZW50cyB0byAtMSBpcyBmYXN0ZXIgaW4gQ2hyb21lICYgRmlyZWZveCB0aGFuIG1peGluZ1xuICAvLyBpbnRlZ2VycyBhbmQgdW5kZWZpbmVkLlxuICBmb3IgKHZhciB4ID0gMDsgeCA8IHZfbGVuZ3RoOyB4KyspIHtcbiAgICB2MVt4XSA9IC0xO1xuICAgIHYyW3hdID0gLTE7XG4gIH1cbiAgdjFbdl9vZmZzZXQgKyAxXSA9IDA7XG4gIHYyW3Zfb2Zmc2V0ICsgMV0gPSAwO1xuICB2YXIgZGVsdGEgPSB0ZXh0MV9sZW5ndGggLSB0ZXh0Ml9sZW5ndGg7XG4gIC8vIElmIHRoZSB0b3RhbCBudW1iZXIgb2YgY2hhcmFjdGVycyBpcyBvZGQsIHRoZW4gdGhlIGZyb250IHBhdGggd2lsbCBjb2xsaWRlXG4gIC8vIHdpdGggdGhlIHJldmVyc2UgcGF0aC5cbiAgdmFyIGZyb250ID0gKGRlbHRhICUgMiAhPSAwKTtcbiAgLy8gT2Zmc2V0cyBmb3Igc3RhcnQgYW5kIGVuZCBvZiBrIGxvb3AuXG4gIC8vIFByZXZlbnRzIG1hcHBpbmcgb2Ygc3BhY2UgYmV5b25kIHRoZSBncmlkLlxuICB2YXIgazFzdGFydCA9IDA7XG4gIHZhciBrMWVuZCA9IDA7XG4gIHZhciBrMnN0YXJ0ID0gMDtcbiAgdmFyIGsyZW5kID0gMDtcbiAgZm9yICh2YXIgZCA9IDA7IGQgPCBtYXhfZDsgZCsrKSB7XG4gICAgLy8gQmFpbCBvdXQgaWYgZGVhZGxpbmUgaXMgcmVhY2hlZC5cbiAgICBpZiAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSA+IGRlYWRsaW5lKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBXYWxrIHRoZSBmcm9udCBwYXRoIG9uZSBzdGVwLlxuICAgIGZvciAodmFyIGsxID0gLWQgKyBrMXN0YXJ0OyBrMSA8PSBkIC0gazFlbmQ7IGsxICs9IDIpIHtcbiAgICAgIHZhciBrMV9vZmZzZXQgPSB2X29mZnNldCArIGsxO1xuICAgICAgdmFyIHgxO1xuICAgICAgaWYgKGsxID09IC1kIHx8IGsxICE9IGQgJiYgdjFbazFfb2Zmc2V0IC0gMV0gPCB2MVtrMV9vZmZzZXQgKyAxXSkge1xuICAgICAgICB4MSA9IHYxW2sxX29mZnNldCArIDFdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeDEgPSB2MVtrMV9vZmZzZXQgLSAxXSArIDE7XG4gICAgICB9XG4gICAgICB2YXIgeTEgPSB4MSAtIGsxO1xuICAgICAgd2hpbGUgKHgxIDwgdGV4dDFfbGVuZ3RoICYmIHkxIDwgdGV4dDJfbGVuZ3RoICYmXG4gICAgICAgICAgICAgdGV4dDEuY2hhckF0KHgxKSA9PSB0ZXh0Mi5jaGFyQXQoeTEpKSB7XG4gICAgICAgIHgxKys7XG4gICAgICAgIHkxKys7XG4gICAgICB9XG4gICAgICB2MVtrMV9vZmZzZXRdID0geDE7XG4gICAgICBpZiAoeDEgPiB0ZXh0MV9sZW5ndGgpIHtcbiAgICAgICAgLy8gUmFuIG9mZiB0aGUgcmlnaHQgb2YgdGhlIGdyYXBoLlxuICAgICAgICBrMWVuZCArPSAyO1xuICAgICAgfSBlbHNlIGlmICh5MSA+IHRleHQyX2xlbmd0aCkge1xuICAgICAgICAvLyBSYW4gb2ZmIHRoZSBib3R0b20gb2YgdGhlIGdyYXBoLlxuICAgICAgICBrMXN0YXJ0ICs9IDI7XG4gICAgICB9IGVsc2UgaWYgKGZyb250KSB7XG4gICAgICAgIHZhciBrMl9vZmZzZXQgPSB2X29mZnNldCArIGRlbHRhIC0gazE7XG4gICAgICAgIGlmIChrMl9vZmZzZXQgPj0gMCAmJiBrMl9vZmZzZXQgPCB2X2xlbmd0aCAmJiB2MltrMl9vZmZzZXRdICE9IC0xKSB7XG4gICAgICAgICAgLy8gTWlycm9yIHgyIG9udG8gdG9wLWxlZnQgY29vcmRpbmF0ZSBzeXN0ZW0uXG4gICAgICAgICAgdmFyIHgyID0gdGV4dDFfbGVuZ3RoIC0gdjJbazJfb2Zmc2V0XTtcbiAgICAgICAgICBpZiAoeDEgPj0geDIpIHtcbiAgICAgICAgICAgIC8vIE92ZXJsYXAgZGV0ZWN0ZWQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWZmX2Jpc2VjdFNwbGl0Xyh0ZXh0MSwgdGV4dDIsIHgxLCB5MSwgZGVhZGxpbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFdhbGsgdGhlIHJldmVyc2UgcGF0aCBvbmUgc3RlcC5cbiAgICBmb3IgKHZhciBrMiA9IC1kICsgazJzdGFydDsgazIgPD0gZCAtIGsyZW5kOyBrMiArPSAyKSB7XG4gICAgICB2YXIgazJfb2Zmc2V0ID0gdl9vZmZzZXQgKyBrMjtcbiAgICAgIHZhciB4MjtcbiAgICAgIGlmIChrMiA9PSAtZCB8fCBrMiAhPSBkICYmIHYyW2syX29mZnNldCAtIDFdIDwgdjJbazJfb2Zmc2V0ICsgMV0pIHtcbiAgICAgICAgeDIgPSB2MltrMl9vZmZzZXQgKyAxXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHgyID0gdjJbazJfb2Zmc2V0IC0gMV0gKyAxO1xuICAgICAgfVxuICAgICAgdmFyIHkyID0geDIgLSBrMjtcbiAgICAgIHdoaWxlICh4MiA8IHRleHQxX2xlbmd0aCAmJiB5MiA8IHRleHQyX2xlbmd0aCAmJlxuICAgICAgICAgICAgIHRleHQxLmNoYXJBdCh0ZXh0MV9sZW5ndGggLSB4MiAtIDEpID09XG4gICAgICAgICAgICAgdGV4dDIuY2hhckF0KHRleHQyX2xlbmd0aCAtIHkyIC0gMSkpIHtcbiAgICAgICAgeDIrKztcbiAgICAgICAgeTIrKztcbiAgICAgIH1cbiAgICAgIHYyW2syX29mZnNldF0gPSB4MjtcbiAgICAgIGlmICh4MiA+IHRleHQxX2xlbmd0aCkge1xuICAgICAgICAvLyBSYW4gb2ZmIHRoZSBsZWZ0IG9mIHRoZSBncmFwaC5cbiAgICAgICAgazJlbmQgKz0gMjtcbiAgICAgIH0gZWxzZSBpZiAoeTIgPiB0ZXh0Ml9sZW5ndGgpIHtcbiAgICAgICAgLy8gUmFuIG9mZiB0aGUgdG9wIG9mIHRoZSBncmFwaC5cbiAgICAgICAgazJzdGFydCArPSAyO1xuICAgICAgfSBlbHNlIGlmICghZnJvbnQpIHtcbiAgICAgICAgdmFyIGsxX29mZnNldCA9IHZfb2Zmc2V0ICsgZGVsdGEgLSBrMjtcbiAgICAgICAgaWYgKGsxX29mZnNldCA+PSAwICYmIGsxX29mZnNldCA8IHZfbGVuZ3RoICYmIHYxW2sxX29mZnNldF0gIT0gLTEpIHtcbiAgICAgICAgICB2YXIgeDEgPSB2MVtrMV9vZmZzZXRdO1xuICAgICAgICAgIHZhciB5MSA9IHZfb2Zmc2V0ICsgeDEgLSBrMV9vZmZzZXQ7XG4gICAgICAgICAgLy8gTWlycm9yIHgyIG9udG8gdG9wLWxlZnQgY29vcmRpbmF0ZSBzeXN0ZW0uXG4gICAgICAgICAgeDIgPSB0ZXh0MV9sZW5ndGggLSB4MjtcbiAgICAgICAgICBpZiAoeDEgPj0geDIpIHtcbiAgICAgICAgICAgIC8vIE92ZXJsYXAgZGV0ZWN0ZWQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaWZmX2Jpc2VjdFNwbGl0Xyh0ZXh0MSwgdGV4dDIsIHgxLCB5MSwgZGVhZGxpbmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBEaWZmIHRvb2sgdG9vIGxvbmcgYW5kIGhpdCB0aGUgZGVhZGxpbmUgb3JcbiAgLy8gbnVtYmVyIG9mIGRpZmZzIGVxdWFscyBudW1iZXIgb2YgY2hhcmFjdGVycywgbm8gY29tbW9uYWxpdHkgYXQgYWxsLlxuICByZXR1cm4gW1tESUZGX0RFTEVURSwgdGV4dDFdLCBbRElGRl9JTlNFUlQsIHRleHQyXV07XG59O1xuXG5cbi8qKlxuICogR2l2ZW4gdGhlIGxvY2F0aW9uIG9mIHRoZSAnbWlkZGxlIHNuYWtlJywgc3BsaXQgdGhlIGRpZmYgaW4gdHdvIHBhcnRzXG4gKiBhbmQgcmVjdXJzZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBOZXcgc3RyaW5nIHRvIGJlIGRpZmZlZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSB4IEluZGV4IG9mIHNwbGl0IHBvaW50IGluIHRleHQxLlxuICogQHBhcmFtIHtudW1iZXJ9IHkgSW5kZXggb2Ygc3BsaXQgcG9pbnQgaW4gdGV4dDIuXG4gKiBAcGFyYW0ge251bWJlcn0gZGVhZGxpbmUgVGltZSBhdCB3aGljaCB0byBiYWlsIGlmIG5vdCB5ZXQgY29tcGxldGUuXG4gKiBAcmV0dXJuIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqIEBwcml2YXRlXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfYmlzZWN0U3BsaXRfID0gZnVuY3Rpb24odGV4dDEsIHRleHQyLCB4LCB5LFxuICAgIGRlYWRsaW5lKSB7XG4gIHZhciB0ZXh0MWEgPSB0ZXh0MS5zdWJzdHJpbmcoMCwgeCk7XG4gIHZhciB0ZXh0MmEgPSB0ZXh0Mi5zdWJzdHJpbmcoMCwgeSk7XG4gIHZhciB0ZXh0MWIgPSB0ZXh0MS5zdWJzdHJpbmcoeCk7XG4gIHZhciB0ZXh0MmIgPSB0ZXh0Mi5zdWJzdHJpbmcoeSk7XG5cbiAgLy8gQ29tcHV0ZSBib3RoIGRpZmZzIHNlcmlhbGx5LlxuICB2YXIgZGlmZnMgPSB0aGlzLmRpZmZfbWFpbih0ZXh0MWEsIHRleHQyYSwgZmFsc2UsIGRlYWRsaW5lKTtcbiAgdmFyIGRpZmZzYiA9IHRoaXMuZGlmZl9tYWluKHRleHQxYiwgdGV4dDJiLCBmYWxzZSwgZGVhZGxpbmUpO1xuXG4gIHJldHVybiBkaWZmcy5jb25jYXQoZGlmZnNiKTtcbn07XG5cblxuLyoqXG4gKiBTcGxpdCB0d28gdGV4dHMgaW50byBhbiBhcnJheSBvZiBzdHJpbmdzLiAgUmVkdWNlIHRoZSB0ZXh0cyB0byBhIHN0cmluZyBvZlxuICogaGFzaGVzIHdoZXJlIGVhY2ggVW5pY29kZSBjaGFyYWN0ZXIgcmVwcmVzZW50cyBvbmUgbGluZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBGaXJzdCBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgU2Vjb25kIHN0cmluZy5cbiAqIEByZXR1cm4geyFBcnJheS48c3RyaW5nfCFBcnJheS48c3RyaW5nPj59IFRocmVlIGVsZW1lbnQgQXJyYXksIGNvbnRhaW5pbmcgdGhlXG4gKiAgICAgZW5jb2RlZCB0ZXh0MSwgdGhlIGVuY29kZWQgdGV4dDIgYW5kIHRoZSBhcnJheSBvZiB1bmlxdWUgc3RyaW5ncy4gIFRoZVxuICogICAgIHplcm90aCBlbGVtZW50IG9mIHRoZSBhcnJheSBvZiB1bmlxdWUgc3RyaW5ncyBpcyBpbnRlbnRpb25hbGx5IGJsYW5rLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9saW5lc1RvQ2hhcnNfID0gZnVuY3Rpb24odGV4dDEsIHRleHQyKSB7XG4gIHZhciBsaW5lQXJyYXkgPSBbXTsgIC8vIGUuZy4gbGluZUFycmF5WzRdID09ICdIZWxsb1xcbidcbiAgdmFyIGxpbmVIYXNoID0ge307ICAgLy8gZS5nLiBsaW5lSGFzaFsnSGVsbG9cXG4nXSA9PSA0XG5cbiAgLy8gJ1xceDAwJyBpcyBhIHZhbGlkIGNoYXJhY3RlciwgYnV0IHZhcmlvdXMgZGVidWdnZXJzIGRvbid0IGxpa2UgaXQuXG4gIC8vIFNvIHdlJ2xsIGluc2VydCBhIGp1bmsgZW50cnkgdG8gYXZvaWQgZ2VuZXJhdGluZyBhIG51bGwgY2hhcmFjdGVyLlxuICBsaW5lQXJyYXlbMF0gPSAnJztcblxuICAvKipcbiAgICogU3BsaXQgYSB0ZXh0IGludG8gYW4gYXJyYXkgb2Ygc3RyaW5ncy4gIFJlZHVjZSB0aGUgdGV4dHMgdG8gYSBzdHJpbmcgb2ZcbiAgICogaGFzaGVzIHdoZXJlIGVhY2ggVW5pY29kZSBjaGFyYWN0ZXIgcmVwcmVzZW50cyBvbmUgbGluZS5cbiAgICogTW9kaWZpZXMgbGluZWFycmF5IGFuZCBsaW5laGFzaCB0aHJvdWdoIGJlaW5nIGEgY2xvc3VyZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgU3RyaW5nIHRvIGVuY29kZS5cbiAgICogQHJldHVybiB7c3RyaW5nfSBFbmNvZGVkIHN0cmluZy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGRpZmZfbGluZXNUb0NoYXJzTXVuZ2VfKHRleHQpIHtcbiAgICB2YXIgY2hhcnMgPSAnJztcbiAgICAvLyBXYWxrIHRoZSB0ZXh0LCBwdWxsaW5nIG91dCBhIHN1YnN0cmluZyBmb3IgZWFjaCBsaW5lLlxuICAgIC8vIHRleHQuc3BsaXQoJ1xcbicpIHdvdWxkIHdvdWxkIHRlbXBvcmFyaWx5IGRvdWJsZSBvdXIgbWVtb3J5IGZvb3RwcmludC5cbiAgICAvLyBNb2RpZnlpbmcgdGV4dCB3b3VsZCBjcmVhdGUgbWFueSBsYXJnZSBzdHJpbmdzIHRvIGdhcmJhZ2UgY29sbGVjdC5cbiAgICB2YXIgbGluZVN0YXJ0ID0gMDtcbiAgICB2YXIgbGluZUVuZCA9IC0xO1xuICAgIC8vIEtlZXBpbmcgb3VyIG93biBsZW5ndGggdmFyaWFibGUgaXMgZmFzdGVyIHRoYW4gbG9va2luZyBpdCB1cC5cbiAgICB2YXIgbGluZUFycmF5TGVuZ3RoID0gbGluZUFycmF5Lmxlbmd0aDtcbiAgICB3aGlsZSAobGluZUVuZCA8IHRleHQubGVuZ3RoIC0gMSkge1xuICAgICAgbGluZUVuZCA9IHRleHQuaW5kZXhPZignXFxuJywgbGluZVN0YXJ0KTtcbiAgICAgIGlmIChsaW5lRW5kID09IC0xKSB7XG4gICAgICAgIGxpbmVFbmQgPSB0ZXh0Lmxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgICB2YXIgbGluZSA9IHRleHQuc3Vic3RyaW5nKGxpbmVTdGFydCwgbGluZUVuZCArIDEpO1xuICAgICAgbGluZVN0YXJ0ID0gbGluZUVuZCArIDE7XG5cbiAgICAgIGlmIChsaW5lSGFzaC5oYXNPd25Qcm9wZXJ0eSA/IGxpbmVIYXNoLmhhc093blByb3BlcnR5KGxpbmUpIDpcbiAgICAgICAgICAobGluZUhhc2hbbGluZV0gIT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgY2hhcnMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShsaW5lSGFzaFtsaW5lXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaGFycyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGxpbmVBcnJheUxlbmd0aCk7XG4gICAgICAgIGxpbmVIYXNoW2xpbmVdID0gbGluZUFycmF5TGVuZ3RoO1xuICAgICAgICBsaW5lQXJyYXlbbGluZUFycmF5TGVuZ3RoKytdID0gbGluZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzO1xuICB9XG5cbiAgdmFyIGNoYXJzMSA9IGRpZmZfbGluZXNUb0NoYXJzTXVuZ2VfKHRleHQxKTtcbiAgdmFyIGNoYXJzMiA9IGRpZmZfbGluZXNUb0NoYXJzTXVuZ2VfKHRleHQyKTtcbiAgcmV0dXJuIFtjaGFyczEsIGNoYXJzMiwgbGluZUFycmF5XTtcbn07XG5cblxuLyoqXG4gKiBSZWh5ZHJhdGUgdGhlIHRleHQgaW4gYSBkaWZmIGZyb20gYSBzdHJpbmcgb2YgbGluZSBoYXNoZXMgdG8gcmVhbCBsaW5lcyBvZlxuICogdGV4dC5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKiBAcGFyYW0geyFBcnJheS48c3RyaW5nPn0gbGluZUFycmF5IEFycmF5IG9mIHVuaXF1ZSBzdHJpbmdzLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9jaGFyc1RvTGluZXNfID0gZnVuY3Rpb24oZGlmZnMsIGxpbmVBcnJheSkge1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgdmFyIGNoYXJzID0gZGlmZnNbeF1bMV07XG4gICAgdmFyIHRleHQgPSBbXTtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGNoYXJzLmxlbmd0aDsgeSsrKSB7XG4gICAgICB0ZXh0W3ldID0gbGluZUFycmF5W2NoYXJzLmNoYXJDb2RlQXQoeSldO1xuICAgIH1cbiAgICBkaWZmc1t4XVsxXSA9IHRleHQuam9pbignJyk7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgdGhlIGNvbW1vbiBwcmVmaXggb2YgdHdvIHN0cmluZ3MuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgRmlyc3Qgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBjb21tb24gdG8gdGhlIHN0YXJ0IG9mIGVhY2hcbiAqICAgICBzdHJpbmcuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY29tbW9uUHJlZml4ID0gZnVuY3Rpb24odGV4dDEsIHRleHQyKSB7XG4gIC8vIFF1aWNrIGNoZWNrIGZvciBjb21tb24gbnVsbCBjYXNlcy5cbiAgaWYgKCF0ZXh0MSB8fCAhdGV4dDIgfHwgdGV4dDEuY2hhckF0KDApICE9IHRleHQyLmNoYXJBdCgwKSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIC8vIEJpbmFyeSBzZWFyY2guXG4gIC8vIFBlcmZvcm1hbmNlIGFuYWx5c2lzOiBodHRwOi8vbmVpbC5mcmFzZXIubmFtZS9uZXdzLzIwMDcvMTAvMDkvXG4gIHZhciBwb2ludGVybWluID0gMDtcbiAgdmFyIHBvaW50ZXJtYXggPSBNYXRoLm1pbih0ZXh0MS5sZW5ndGgsIHRleHQyLmxlbmd0aCk7XG4gIHZhciBwb2ludGVybWlkID0gcG9pbnRlcm1heDtcbiAgdmFyIHBvaW50ZXJzdGFydCA9IDA7XG4gIHdoaWxlIChwb2ludGVybWluIDwgcG9pbnRlcm1pZCkge1xuICAgIGlmICh0ZXh0MS5zdWJzdHJpbmcocG9pbnRlcnN0YXJ0LCBwb2ludGVybWlkKSA9PVxuICAgICAgICB0ZXh0Mi5zdWJzdHJpbmcocG9pbnRlcnN0YXJ0LCBwb2ludGVybWlkKSkge1xuICAgICAgcG9pbnRlcm1pbiA9IHBvaW50ZXJtaWQ7XG4gICAgICBwb2ludGVyc3RhcnQgPSBwb2ludGVybWluO1xuICAgIH0gZWxzZSB7XG4gICAgICBwb2ludGVybWF4ID0gcG9pbnRlcm1pZDtcbiAgICB9XG4gICAgcG9pbnRlcm1pZCA9IE1hdGguZmxvb3IoKHBvaW50ZXJtYXggLSBwb2ludGVybWluKSAvIDIgKyBwb2ludGVybWluKTtcbiAgfVxuICByZXR1cm4gcG9pbnRlcm1pZDtcbn07XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgdGhlIGNvbW1vbiBzdWZmaXggb2YgdHdvIHN0cmluZ3MuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgRmlyc3Qgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBjb21tb24gdG8gdGhlIGVuZCBvZiBlYWNoIHN0cmluZy5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9jb21tb25TdWZmaXggPSBmdW5jdGlvbih0ZXh0MSwgdGV4dDIpIHtcbiAgLy8gUXVpY2sgY2hlY2sgZm9yIGNvbW1vbiBudWxsIGNhc2VzLlxuICBpZiAoIXRleHQxIHx8ICF0ZXh0MiB8fFxuICAgICAgdGV4dDEuY2hhckF0KHRleHQxLmxlbmd0aCAtIDEpICE9IHRleHQyLmNoYXJBdCh0ZXh0Mi5sZW5ndGggLSAxKSkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIC8vIEJpbmFyeSBzZWFyY2guXG4gIC8vIFBlcmZvcm1hbmNlIGFuYWx5c2lzOiBodHRwOi8vbmVpbC5mcmFzZXIubmFtZS9uZXdzLzIwMDcvMTAvMDkvXG4gIHZhciBwb2ludGVybWluID0gMDtcbiAgdmFyIHBvaW50ZXJtYXggPSBNYXRoLm1pbih0ZXh0MS5sZW5ndGgsIHRleHQyLmxlbmd0aCk7XG4gIHZhciBwb2ludGVybWlkID0gcG9pbnRlcm1heDtcbiAgdmFyIHBvaW50ZXJlbmQgPSAwO1xuICB3aGlsZSAocG9pbnRlcm1pbiA8IHBvaW50ZXJtaWQpIHtcbiAgICBpZiAodGV4dDEuc3Vic3RyaW5nKHRleHQxLmxlbmd0aCAtIHBvaW50ZXJtaWQsIHRleHQxLmxlbmd0aCAtIHBvaW50ZXJlbmQpID09XG4gICAgICAgIHRleHQyLnN1YnN0cmluZyh0ZXh0Mi5sZW5ndGggLSBwb2ludGVybWlkLCB0ZXh0Mi5sZW5ndGggLSBwb2ludGVyZW5kKSkge1xuICAgICAgcG9pbnRlcm1pbiA9IHBvaW50ZXJtaWQ7XG4gICAgICBwb2ludGVyZW5kID0gcG9pbnRlcm1pbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnRlcm1heCA9IHBvaW50ZXJtaWQ7XG4gICAgfVxuICAgIHBvaW50ZXJtaWQgPSBNYXRoLmZsb29yKChwb2ludGVybWF4IC0gcG9pbnRlcm1pbikgLyAyICsgcG9pbnRlcm1pbik7XG4gIH1cbiAgcmV0dXJuIHBvaW50ZXJtaWQ7XG59O1xuXG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHRoZSBzdWZmaXggb2Ygb25lIHN0cmluZyBpcyB0aGUgcHJlZml4IG9mIGFub3RoZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgRmlyc3Qgc3RyaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBjb21tb24gdG8gdGhlIGVuZCBvZiB0aGUgZmlyc3RcbiAqICAgICBzdHJpbmcgYW5kIHRoZSBzdGFydCBvZiB0aGUgc2Vjb25kIHN0cmluZy5cbiAqIEBwcml2YXRlXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY29tbW9uT3ZlcmxhcF8gPSBmdW5jdGlvbih0ZXh0MSwgdGV4dDIpIHtcbiAgLy8gQ2FjaGUgdGhlIHRleHQgbGVuZ3RocyB0byBwcmV2ZW50IG11bHRpcGxlIGNhbGxzLlxuICB2YXIgdGV4dDFfbGVuZ3RoID0gdGV4dDEubGVuZ3RoO1xuICB2YXIgdGV4dDJfbGVuZ3RoID0gdGV4dDIubGVuZ3RoO1xuICAvLyBFbGltaW5hdGUgdGhlIG51bGwgY2FzZS5cbiAgaWYgKHRleHQxX2xlbmd0aCA9PSAwIHx8IHRleHQyX2xlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cbiAgLy8gVHJ1bmNhdGUgdGhlIGxvbmdlciBzdHJpbmcuXG4gIGlmICh0ZXh0MV9sZW5ndGggPiB0ZXh0Ml9sZW5ndGgpIHtcbiAgICB0ZXh0MSA9IHRleHQxLnN1YnN0cmluZyh0ZXh0MV9sZW5ndGggLSB0ZXh0Ml9sZW5ndGgpO1xuICB9IGVsc2UgaWYgKHRleHQxX2xlbmd0aCA8IHRleHQyX2xlbmd0aCkge1xuICAgIHRleHQyID0gdGV4dDIuc3Vic3RyaW5nKDAsIHRleHQxX2xlbmd0aCk7XG4gIH1cbiAgdmFyIHRleHRfbGVuZ3RoID0gTWF0aC5taW4odGV4dDFfbGVuZ3RoLCB0ZXh0Ml9sZW5ndGgpO1xuICAvLyBRdWljayBjaGVjayBmb3IgdGhlIHdvcnN0IGNhc2UuXG4gIGlmICh0ZXh0MSA9PSB0ZXh0Mikge1xuICAgIHJldHVybiB0ZXh0X2xlbmd0aDtcbiAgfVxuXG4gIC8vIFN0YXJ0IGJ5IGxvb2tpbmcgZm9yIGEgc2luZ2xlIGNoYXJhY3RlciBtYXRjaFxuICAvLyBhbmQgaW5jcmVhc2UgbGVuZ3RoIHVudGlsIG5vIG1hdGNoIGlzIGZvdW5kLlxuICAvLyBQZXJmb3JtYW5jZSBhbmFseXNpczogaHR0cDovL25laWwuZnJhc2VyLm5hbWUvbmV3cy8yMDEwLzExLzA0L1xuICB2YXIgYmVzdCA9IDA7XG4gIHZhciBsZW5ndGggPSAxO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIHZhciBwYXR0ZXJuID0gdGV4dDEuc3Vic3RyaW5nKHRleHRfbGVuZ3RoIC0gbGVuZ3RoKTtcbiAgICB2YXIgZm91bmQgPSB0ZXh0Mi5pbmRleE9mKHBhdHRlcm4pO1xuICAgIGlmIChmb3VuZCA9PSAtMSkge1xuICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgfVxuICAgIGxlbmd0aCArPSBmb3VuZDtcbiAgICBpZiAoZm91bmQgPT0gMCB8fCB0ZXh0MS5zdWJzdHJpbmcodGV4dF9sZW5ndGggLSBsZW5ndGgpID09XG4gICAgICAgIHRleHQyLnN1YnN0cmluZygwLCBsZW5ndGgpKSB7XG4gICAgICBiZXN0ID0gbGVuZ3RoO1xuICAgICAgbGVuZ3RoKys7XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKlxuICogRG8gdGhlIHR3byB0ZXh0cyBzaGFyZSBhIHN1YnN0cmluZyB3aGljaCBpcyBhdCBsZWFzdCBoYWxmIHRoZSBsZW5ndGggb2YgdGhlXG4gKiBsb25nZXIgdGV4dD9cbiAqIFRoaXMgc3BlZWR1cCBjYW4gcHJvZHVjZSBub24tbWluaW1hbCBkaWZmcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBGaXJzdCBzdHJpbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgU2Vjb25kIHN0cmluZy5cbiAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fSBGaXZlIGVsZW1lbnQgQXJyYXksIGNvbnRhaW5pbmcgdGhlIHByZWZpeCBvZlxuICogICAgIHRleHQxLCB0aGUgc3VmZml4IG9mIHRleHQxLCB0aGUgcHJlZml4IG9mIHRleHQyLCB0aGUgc3VmZml4IG9mXG4gKiAgICAgdGV4dDIgYW5kIHRoZSBjb21tb24gbWlkZGxlLiAgT3IgbnVsbCBpZiB0aGVyZSB3YXMgbm8gbWF0Y2guXG4gKiBAcHJpdmF0ZVxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX2hhbGZNYXRjaF8gPSBmdW5jdGlvbih0ZXh0MSwgdGV4dDIpIHtcbiAgaWYgKHRoaXMuRGlmZl9UaW1lb3V0IDw9IDApIHtcbiAgICAvLyBEb24ndCByaXNrIHJldHVybmluZyBhIG5vbi1vcHRpbWFsIGRpZmYgaWYgd2UgaGF2ZSB1bmxpbWl0ZWQgdGltZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgbG9uZ3RleHQgPSB0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGggPyB0ZXh0MSA6IHRleHQyO1xuICB2YXIgc2hvcnR0ZXh0ID0gdGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoID8gdGV4dDIgOiB0ZXh0MTtcbiAgaWYgKGxvbmd0ZXh0Lmxlbmd0aCA8IDQgfHwgc2hvcnR0ZXh0Lmxlbmd0aCAqIDIgPCBsb25ndGV4dC5sZW5ndGgpIHtcbiAgICByZXR1cm4gbnVsbDsgIC8vIFBvaW50bGVzcy5cbiAgfVxuICB2YXIgZG1wID0gdGhpczsgIC8vICd0aGlzJyBiZWNvbWVzICd3aW5kb3cnIGluIGEgY2xvc3VyZS5cblxuICAvKipcbiAgICogRG9lcyBhIHN1YnN0cmluZyBvZiBzaG9ydHRleHQgZXhpc3Qgd2l0aGluIGxvbmd0ZXh0IHN1Y2ggdGhhdCB0aGUgc3Vic3RyaW5nXG4gICAqIGlzIGF0IGxlYXN0IGhhbGYgdGhlIGxlbmd0aCBvZiBsb25ndGV4dD9cbiAgICogQ2xvc3VyZSwgYnV0IGRvZXMgbm90IHJlZmVyZW5jZSBhbnkgZXh0ZXJuYWwgdmFyaWFibGVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbG9uZ3RleHQgTG9uZ2VyIHN0cmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHNob3J0dGV4dCBTaG9ydGVyIHN0cmluZy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGkgU3RhcnQgaW5kZXggb2YgcXVhcnRlciBsZW5ndGggc3Vic3RyaW5nIHdpdGhpbiBsb25ndGV4dC5cbiAgICogQHJldHVybiB7QXJyYXkuPHN0cmluZz59IEZpdmUgZWxlbWVudCBBcnJheSwgY29udGFpbmluZyB0aGUgcHJlZml4IG9mXG4gICAqICAgICBsb25ndGV4dCwgdGhlIHN1ZmZpeCBvZiBsb25ndGV4dCwgdGhlIHByZWZpeCBvZiBzaG9ydHRleHQsIHRoZSBzdWZmaXhcbiAgICogICAgIG9mIHNob3J0dGV4dCBhbmQgdGhlIGNvbW1vbiBtaWRkbGUuICBPciBudWxsIGlmIHRoZXJlIHdhcyBubyBtYXRjaC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGRpZmZfaGFsZk1hdGNoSV8obG9uZ3RleHQsIHNob3J0dGV4dCwgaSkge1xuICAgIC8vIFN0YXJ0IHdpdGggYSAxLzQgbGVuZ3RoIHN1YnN0cmluZyBhdCBwb3NpdGlvbiBpIGFzIGEgc2VlZC5cbiAgICB2YXIgc2VlZCA9IGxvbmd0ZXh0LnN1YnN0cmluZyhpLCBpICsgTWF0aC5mbG9vcihsb25ndGV4dC5sZW5ndGggLyA0KSk7XG4gICAgdmFyIGogPSAtMTtcbiAgICB2YXIgYmVzdF9jb21tb24gPSAnJztcbiAgICB2YXIgYmVzdF9sb25ndGV4dF9hLCBiZXN0X2xvbmd0ZXh0X2IsIGJlc3Rfc2hvcnR0ZXh0X2EsIGJlc3Rfc2hvcnR0ZXh0X2I7XG4gICAgd2hpbGUgKChqID0gc2hvcnR0ZXh0LmluZGV4T2Yoc2VlZCwgaiArIDEpKSAhPSAtMSkge1xuICAgICAgdmFyIHByZWZpeExlbmd0aCA9IGRtcC5kaWZmX2NvbW1vblByZWZpeChsb25ndGV4dC5zdWJzdHJpbmcoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0dGV4dC5zdWJzdHJpbmcoaikpO1xuICAgICAgdmFyIHN1ZmZpeExlbmd0aCA9IGRtcC5kaWZmX2NvbW1vblN1ZmZpeChsb25ndGV4dC5zdWJzdHJpbmcoMCwgaSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNob3J0dGV4dC5zdWJzdHJpbmcoMCwgaikpO1xuICAgICAgaWYgKGJlc3RfY29tbW9uLmxlbmd0aCA8IHN1ZmZpeExlbmd0aCArIHByZWZpeExlbmd0aCkge1xuICAgICAgICBiZXN0X2NvbW1vbiA9IHNob3J0dGV4dC5zdWJzdHJpbmcoaiAtIHN1ZmZpeExlbmd0aCwgaikgK1xuICAgICAgICAgICAgc2hvcnR0ZXh0LnN1YnN0cmluZyhqLCBqICsgcHJlZml4TGVuZ3RoKTtcbiAgICAgICAgYmVzdF9sb25ndGV4dF9hID0gbG9uZ3RleHQuc3Vic3RyaW5nKDAsIGkgLSBzdWZmaXhMZW5ndGgpO1xuICAgICAgICBiZXN0X2xvbmd0ZXh0X2IgPSBsb25ndGV4dC5zdWJzdHJpbmcoaSArIHByZWZpeExlbmd0aCk7XG4gICAgICAgIGJlc3Rfc2hvcnR0ZXh0X2EgPSBzaG9ydHRleHQuc3Vic3RyaW5nKDAsIGogLSBzdWZmaXhMZW5ndGgpO1xuICAgICAgICBiZXN0X3Nob3J0dGV4dF9iID0gc2hvcnR0ZXh0LnN1YnN0cmluZyhqICsgcHJlZml4TGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJlc3RfY29tbW9uLmxlbmd0aCAqIDIgPj0gbG9uZ3RleHQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gW2Jlc3RfbG9uZ3RleHRfYSwgYmVzdF9sb25ndGV4dF9iLFxuICAgICAgICAgICAgICBiZXN0X3Nob3J0dGV4dF9hLCBiZXN0X3Nob3J0dGV4dF9iLCBiZXN0X2NvbW1vbl07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpcnN0IGNoZWNrIGlmIHRoZSBzZWNvbmQgcXVhcnRlciBpcyB0aGUgc2VlZCBmb3IgYSBoYWxmLW1hdGNoLlxuICB2YXIgaG0xID0gZGlmZl9oYWxmTWF0Y2hJXyhsb25ndGV4dCwgc2hvcnR0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmNlaWwobG9uZ3RleHQubGVuZ3RoIC8gNCkpO1xuICAvLyBDaGVjayBhZ2FpbiBiYXNlZCBvbiB0aGUgdGhpcmQgcXVhcnRlci5cbiAgdmFyIGhtMiA9IGRpZmZfaGFsZk1hdGNoSV8obG9uZ3RleHQsIHNob3J0dGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5jZWlsKGxvbmd0ZXh0Lmxlbmd0aCAvIDIpKTtcbiAgdmFyIGhtO1xuICBpZiAoIWhtMSAmJiAhaG0yKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSBpZiAoIWhtMikge1xuICAgIGhtID0gaG0xO1xuICB9IGVsc2UgaWYgKCFobTEpIHtcbiAgICBobSA9IGhtMjtcbiAgfSBlbHNlIHtcbiAgICAvLyBCb3RoIG1hdGNoZWQuICBTZWxlY3QgdGhlIGxvbmdlc3QuXG4gICAgaG0gPSBobTFbNF0ubGVuZ3RoID4gaG0yWzRdLmxlbmd0aCA/IGhtMSA6IGhtMjtcbiAgfVxuXG4gIC8vIEEgaGFsZi1tYXRjaCB3YXMgZm91bmQsIHNvcnQgb3V0IHRoZSByZXR1cm4gZGF0YS5cbiAgdmFyIHRleHQxX2EsIHRleHQxX2IsIHRleHQyX2EsIHRleHQyX2I7XG4gIGlmICh0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGgpIHtcbiAgICB0ZXh0MV9hID0gaG1bMF07XG4gICAgdGV4dDFfYiA9IGhtWzFdO1xuICAgIHRleHQyX2EgPSBobVsyXTtcbiAgICB0ZXh0Ml9iID0gaG1bM107XG4gIH0gZWxzZSB7XG4gICAgdGV4dDJfYSA9IGhtWzBdO1xuICAgIHRleHQyX2IgPSBobVsxXTtcbiAgICB0ZXh0MV9hID0gaG1bMl07XG4gICAgdGV4dDFfYiA9IGhtWzNdO1xuICB9XG4gIHZhciBtaWRfY29tbW9uID0gaG1bNF07XG4gIHJldHVybiBbdGV4dDFfYSwgdGV4dDFfYiwgdGV4dDJfYSwgdGV4dDJfYiwgbWlkX2NvbW1vbl07XG59O1xuXG5cbi8qKlxuICogUmVkdWNlIHRoZSBudW1iZXIgb2YgZWRpdHMgYnkgZWxpbWluYXRpbmcgc2VtYW50aWNhbGx5IHRyaXZpYWwgZXF1YWxpdGllcy5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY2xlYW51cFNlbWFudGljID0gZnVuY3Rpb24oZGlmZnMpIHtcbiAgdmFyIGNoYW5nZXMgPSBmYWxzZTtcbiAgdmFyIGVxdWFsaXRpZXMgPSBbXTsgIC8vIFN0YWNrIG9mIGluZGljZXMgd2hlcmUgZXF1YWxpdGllcyBhcmUgZm91bmQuXG4gIHZhciBlcXVhbGl0aWVzTGVuZ3RoID0gMDsgIC8vIEtlZXBpbmcgb3VyIG93biBsZW5ndGggdmFyIGlzIGZhc3RlciBpbiBKUy5cbiAgLyoqIEB0eXBlIHs/c3RyaW5nfSAqL1xuICB2YXIgbGFzdGVxdWFsaXR5ID0gbnVsbDsgIC8vIEFsd2F5cyBlcXVhbCB0byBlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGgtMV1bMV1cbiAgdmFyIHBvaW50ZXIgPSAwOyAgLy8gSW5kZXggb2YgY3VycmVudCBwb3NpdGlvbi5cbiAgLy8gTnVtYmVyIG9mIGNoYXJhY3RlcnMgdGhhdCBjaGFuZ2VkIHByaW9yIHRvIHRoZSBlcXVhbGl0eS5cbiAgdmFyIGxlbmd0aF9pbnNlcnRpb25zMSA9IDA7XG4gIHZhciBsZW5ndGhfZGVsZXRpb25zMSA9IDA7XG4gIC8vIE51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgY2hhbmdlZCBhZnRlciB0aGUgZXF1YWxpdHkuXG4gIHZhciBsZW5ndGhfaW5zZXJ0aW9uczIgPSAwO1xuICB2YXIgbGVuZ3RoX2RlbGV0aW9uczIgPSAwO1xuICB3aGlsZSAocG9pbnRlciA8IGRpZmZzLmxlbmd0aCkge1xuICAgIGlmIChkaWZmc1twb2ludGVyXVswXSA9PSBESUZGX0VRVUFMKSB7ICAvLyBFcXVhbGl0eSBmb3VuZC5cbiAgICAgIGVxdWFsaXRpZXNbZXF1YWxpdGllc0xlbmd0aCsrXSA9IHBvaW50ZXI7XG4gICAgICBsZW5ndGhfaW5zZXJ0aW9uczEgPSBsZW5ndGhfaW5zZXJ0aW9uczI7XG4gICAgICBsZW5ndGhfZGVsZXRpb25zMSA9IGxlbmd0aF9kZWxldGlvbnMyO1xuICAgICAgbGVuZ3RoX2luc2VydGlvbnMyID0gMDtcbiAgICAgIGxlbmd0aF9kZWxldGlvbnMyID0gMDtcbiAgICAgIGxhc3RlcXVhbGl0eSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhkaWZmc1twb2ludGVyXVsxXSk7XG4gICAgfSBlbHNlIHsgIC8vIEFuIGluc2VydGlvbiBvciBkZWxldGlvbi5cbiAgICAgIGlmIChkaWZmc1twb2ludGVyXVswXSA9PSBESUZGX0lOU0VSVCkge1xuICAgICAgICBsZW5ndGhfaW5zZXJ0aW9uczIgKz0gZGlmZnNbcG9pbnRlcl1bMV0ubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVuZ3RoX2RlbGV0aW9uczIgKz0gZGlmZnNbcG9pbnRlcl1bMV0ubGVuZ3RoO1xuICAgICAgfVxuICAgICAgLy8gRWxpbWluYXRlIGFuIGVxdWFsaXR5IHRoYXQgaXMgc21hbGxlciBvciBlcXVhbCB0byB0aGUgZWRpdHMgb24gYm90aFxuICAgICAgLy8gc2lkZXMgb2YgaXQuXG4gICAgICBpZiAobGFzdGVxdWFsaXR5ICE9PSBudWxsICYmIChsYXN0ZXF1YWxpdHkubGVuZ3RoIDw9XG4gICAgICAgICAgTWF0aC5tYXgobGVuZ3RoX2luc2VydGlvbnMxLCBsZW5ndGhfZGVsZXRpb25zMSkpICYmXG4gICAgICAgICAgKGxhc3RlcXVhbGl0eS5sZW5ndGggPD0gTWF0aC5tYXgobGVuZ3RoX2luc2VydGlvbnMyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aF9kZWxldGlvbnMyKSkpIHtcbiAgICAgICAgLy8gRHVwbGljYXRlIHJlY29yZC5cbiAgICAgICAgZGlmZnMuc3BsaWNlKGVxdWFsaXRpZXNbZXF1YWxpdGllc0xlbmd0aCAtIDFdLCAwLFxuICAgICAgICAgICAgICAgICAgICAgW0RJRkZfREVMRVRFLCBsYXN0ZXF1YWxpdHldKTtcbiAgICAgICAgLy8gQ2hhbmdlIHNlY29uZCBjb3B5IHRvIGluc2VydC5cbiAgICAgICAgZGlmZnNbZXF1YWxpdGllc1tlcXVhbGl0aWVzTGVuZ3RoIC0gMV0gKyAxXVswXSA9IERJRkZfSU5TRVJUO1xuICAgICAgICAvLyBUaHJvdyBhd2F5IHRoZSBlcXVhbGl0eSB3ZSBqdXN0IGRlbGV0ZWQuXG4gICAgICAgIGVxdWFsaXRpZXNMZW5ndGgtLTtcbiAgICAgICAgLy8gVGhyb3cgYXdheSB0aGUgcHJldmlvdXMgZXF1YWxpdHkgKGl0IG5lZWRzIHRvIGJlIHJlZXZhbHVhdGVkKS5cbiAgICAgICAgZXF1YWxpdGllc0xlbmd0aC0tO1xuICAgICAgICBwb2ludGVyID0gZXF1YWxpdGllc0xlbmd0aCA+IDAgPyBlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGggLSAxXSA6IC0xO1xuICAgICAgICBsZW5ndGhfaW5zZXJ0aW9uczEgPSAwOyAgLy8gUmVzZXQgdGhlIGNvdW50ZXJzLlxuICAgICAgICBsZW5ndGhfZGVsZXRpb25zMSA9IDA7XG4gICAgICAgIGxlbmd0aF9pbnNlcnRpb25zMiA9IDA7XG4gICAgICAgIGxlbmd0aF9kZWxldGlvbnMyID0gMDtcbiAgICAgICAgbGFzdGVxdWFsaXR5ID0gbnVsbDtcbiAgICAgICAgY2hhbmdlcyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHBvaW50ZXIrKztcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgZGlmZi5cbiAgaWYgKGNoYW5nZXMpIHtcbiAgICB0aGlzLmRpZmZfY2xlYW51cE1lcmdlKGRpZmZzKTtcbiAgfVxuICB0aGlzLmRpZmZfY2xlYW51cFNlbWFudGljTG9zc2xlc3MoZGlmZnMpO1xuXG4gIC8vIEZpbmQgYW55IG92ZXJsYXBzIGJldHdlZW4gZGVsZXRpb25zIGFuZCBpbnNlcnRpb25zLlxuICAvLyBlLmc6IDxkZWw+YWJjeHh4PC9kZWw+PGlucz54eHhkZWY8L2lucz5cbiAgLy8gICAtPiA8ZGVsPmFiYzwvZGVsPnh4eDxpbnM+ZGVmPC9pbnM+XG4gIC8vIE9ubHkgZXh0cmFjdCBhbiBvdmVybGFwIGlmIGl0IGlzIGFzIGJpZyBhcyB0aGUgZWRpdCBhaGVhZCBvciBiZWhpbmQgaXQuXG4gIHBvaW50ZXIgPSAxO1xuICB3aGlsZSAocG9pbnRlciA8IGRpZmZzLmxlbmd0aCkge1xuICAgIGlmIChkaWZmc1twb2ludGVyIC0gMV1bMF0gPT0gRElGRl9ERUxFVEUgJiZcbiAgICAgICAgZGlmZnNbcG9pbnRlcl1bMF0gPT0gRElGRl9JTlNFUlQpIHtcbiAgICAgIHZhciBkZWxldGlvbiA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhkaWZmc1twb2ludGVyIC0gMV1bMV0pO1xuICAgICAgdmFyIGluc2VydGlvbiA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhkaWZmc1twb2ludGVyXVsxXSk7XG4gICAgICB2YXIgb3ZlcmxhcF9sZW5ndGggPSB0aGlzLmRpZmZfY29tbW9uT3ZlcmxhcF8oZGVsZXRpb24sIGluc2VydGlvbik7XG4gICAgICBpZiAob3ZlcmxhcF9sZW5ndGggPj0gZGVsZXRpb24ubGVuZ3RoIC8gMiB8fFxuICAgICAgICAgIG92ZXJsYXBfbGVuZ3RoID49IGluc2VydGlvbi5sZW5ndGggLyAyKSB7XG4gICAgICAgIC8vIE92ZXJsYXAgZm91bmQuICBJbnNlcnQgYW4gZXF1YWxpdHkgYW5kIHRyaW0gdGhlIHN1cnJvdW5kaW5nIGVkaXRzLlxuICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciwgMCxcbiAgICAgICAgICAgIFtESUZGX0VRVUFMLCBpbnNlcnRpb24uc3Vic3RyaW5nKDAsIG92ZXJsYXBfbGVuZ3RoKV0pO1xuICAgICAgICBkaWZmc1twb2ludGVyIC0gMV1bMV0gPVxuICAgICAgICAgICAgZGVsZXRpb24uc3Vic3RyaW5nKDAsIGRlbGV0aW9uLmxlbmd0aCAtIG92ZXJsYXBfbGVuZ3RoKTtcbiAgICAgICAgZGlmZnNbcG9pbnRlciArIDFdWzFdID0gaW5zZXJ0aW9uLnN1YnN0cmluZyhvdmVybGFwX2xlbmd0aCk7XG4gICAgICAgIHBvaW50ZXIrKztcbiAgICAgIH1cbiAgICAgIHBvaW50ZXIrKztcbiAgICB9XG4gICAgcG9pbnRlcisrO1xuICB9XG59O1xuXG5cbi8qKlxuICogTG9vayBmb3Igc2luZ2xlIGVkaXRzIHN1cnJvdW5kZWQgb24gYm90aCBzaWRlcyBieSBlcXVhbGl0aWVzXG4gKiB3aGljaCBjYW4gYmUgc2hpZnRlZCBzaWRld2F5cyB0byBhbGlnbiB0aGUgZWRpdCB0byBhIHdvcmQgYm91bmRhcnkuXG4gKiBlLmc6IFRoZSBjPGlucz5hdCBjPC9pbnM+YW1lLiAtPiBUaGUgPGlucz5jYXQgPC9pbnM+Y2FtZS5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY2xlYW51cFNlbWFudGljTG9zc2xlc3MgPSBmdW5jdGlvbihkaWZmcykge1xuICAvLyBEZWZpbmUgc29tZSByZWdleCBwYXR0ZXJucyBmb3IgbWF0Y2hpbmcgYm91bmRhcmllcy5cbiAgdmFyIHB1bmN0dWF0aW9uID0gL1teYS16QS1aMC05XS87XG4gIHZhciB3aGl0ZXNwYWNlID0gL1xccy87XG4gIHZhciBsaW5lYnJlYWsgPSAvW1xcclxcbl0vO1xuICB2YXIgYmxhbmtsaW5lRW5kID0gL1xcblxccj9cXG4kLztcbiAgdmFyIGJsYW5rbGluZVN0YXJ0ID0gL15cXHI/XFxuXFxyP1xcbi87XG5cbiAgLyoqXG4gICAqIEdpdmVuIHR3byBzdHJpbmdzLCBjb21wdXRlIGEgc2NvcmUgcmVwcmVzZW50aW5nIHdoZXRoZXIgdGhlIGludGVybmFsXG4gICAqIGJvdW5kYXJ5IGZhbGxzIG9uIGxvZ2ljYWwgYm91bmRhcmllcy5cbiAgICogU2NvcmVzIHJhbmdlIGZyb20gNSAoYmVzdCkgdG8gMCAod29yc3QpLlxuICAgKiBDbG9zdXJlLCBtYWtlcyByZWZlcmVuY2UgdG8gcmVnZXggcGF0dGVybnMgZGVmaW5lZCBhYm92ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9uZSBGaXJzdCBzdHJpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0d28gU2Vjb25kIHN0cmluZy5cbiAgICogQHJldHVybiB7bnVtYmVyfSBUaGUgc2NvcmUuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBkaWZmX2NsZWFudXBTZW1hbnRpY1Njb3JlXyhvbmUsIHR3bykge1xuICAgIGlmICghb25lIHx8ICF0d28pIHtcbiAgICAgIC8vIEVkZ2VzIGFyZSB0aGUgYmVzdC5cbiAgICAgIHJldHVybiA1O1xuICAgIH1cblxuICAgIC8vIEVhY2ggcG9ydCBvZiB0aGlzIGZ1bmN0aW9uIGJlaGF2ZXMgc2xpZ2h0bHkgZGlmZmVyZW50bHkgZHVlIHRvXG4gICAgLy8gc3VidGxlIGRpZmZlcmVuY2VzIGluIGVhY2ggbGFuZ3VhZ2UncyBkZWZpbml0aW9uIG9mIHRoaW5ncyBsaWtlXG4gICAgLy8gJ3doaXRlc3BhY2UnLiAgU2luY2UgdGhpcyBmdW5jdGlvbidzIHB1cnBvc2UgaXMgbGFyZ2VseSBjb3NtZXRpYyxcbiAgICAvLyB0aGUgY2hvaWNlIGhhcyBiZWVuIG1hZGUgdG8gdXNlIGVhY2ggbGFuZ3VhZ2UncyBuYXRpdmUgZmVhdHVyZXNcbiAgICAvLyByYXRoZXIgdGhhbiBmb3JjZSB0b3RhbCBjb25mb3JtaXR5LlxuICAgIHZhciBzY29yZSA9IDA7XG4gICAgLy8gT25lIHBvaW50IGZvciBub24tYWxwaGFudW1lcmljLlxuICAgIGlmIChvbmUuY2hhckF0KG9uZS5sZW5ndGggLSAxKS5tYXRjaChwdW5jdHVhdGlvbikgfHxcbiAgICAgICAgdHdvLmNoYXJBdCgwKS5tYXRjaChwdW5jdHVhdGlvbikpIHtcbiAgICAgIHNjb3JlKys7XG4gICAgICAvLyBUd28gcG9pbnRzIGZvciB3aGl0ZXNwYWNlLlxuICAgICAgaWYgKG9uZS5jaGFyQXQob25lLmxlbmd0aCAtIDEpLm1hdGNoKHdoaXRlc3BhY2UpIHx8XG4gICAgICAgICAgdHdvLmNoYXJBdCgwKS5tYXRjaCh3aGl0ZXNwYWNlKSkge1xuICAgICAgICBzY29yZSsrO1xuICAgICAgICAvLyBUaHJlZSBwb2ludHMgZm9yIGxpbmUgYnJlYWtzLlxuICAgICAgICBpZiAob25lLmNoYXJBdChvbmUubGVuZ3RoIC0gMSkubWF0Y2gobGluZWJyZWFrKSB8fFxuICAgICAgICAgICAgdHdvLmNoYXJBdCgwKS5tYXRjaChsaW5lYnJlYWspKSB7XG4gICAgICAgICAgc2NvcmUrKztcbiAgICAgICAgICAvLyBGb3VyIHBvaW50cyBmb3IgYmxhbmsgbGluZXMuXG4gICAgICAgICAgaWYgKG9uZS5tYXRjaChibGFua2xpbmVFbmQpIHx8IHR3by5tYXRjaChibGFua2xpbmVTdGFydCkpIHtcbiAgICAgICAgICAgIHNjb3JlKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY29yZTtcbiAgfVxuXG4gIHZhciBwb2ludGVyID0gMTtcbiAgLy8gSW50ZW50aW9uYWxseSBpZ25vcmUgdGhlIGZpcnN0IGFuZCBsYXN0IGVsZW1lbnQgKGRvbid0IG5lZWQgY2hlY2tpbmcpLlxuICB3aGlsZSAocG9pbnRlciA8IGRpZmZzLmxlbmd0aCAtIDEpIHtcbiAgICBpZiAoZGlmZnNbcG9pbnRlciAtIDFdWzBdID09IERJRkZfRVFVQUwgJiZcbiAgICAgICAgZGlmZnNbcG9pbnRlciArIDFdWzBdID09IERJRkZfRVFVQUwpIHtcbiAgICAgIC8vIFRoaXMgaXMgYSBzaW5nbGUgZWRpdCBzdXJyb3VuZGVkIGJ5IGVxdWFsaXRpZXMuXG4gICAgICB2YXIgZXF1YWxpdHkxID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovKGRpZmZzW3BvaW50ZXIgLSAxXVsxXSk7XG4gICAgICB2YXIgZWRpdCA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhkaWZmc1twb2ludGVyXVsxXSk7XG4gICAgICB2YXIgZXF1YWxpdHkyID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovKGRpZmZzW3BvaW50ZXIgKyAxXVsxXSk7XG5cbiAgICAgIC8vIEZpcnN0LCBzaGlmdCB0aGUgZWRpdCBhcyBmYXIgbGVmdCBhcyBwb3NzaWJsZS5cbiAgICAgIHZhciBjb21tb25PZmZzZXQgPSB0aGlzLmRpZmZfY29tbW9uU3VmZml4KGVxdWFsaXR5MSwgZWRpdCk7XG4gICAgICBpZiAoY29tbW9uT2Zmc2V0KSB7XG4gICAgICAgIHZhciBjb21tb25TdHJpbmcgPSBlZGl0LnN1YnN0cmluZyhlZGl0Lmxlbmd0aCAtIGNvbW1vbk9mZnNldCk7XG4gICAgICAgIGVxdWFsaXR5MSA9IGVxdWFsaXR5MS5zdWJzdHJpbmcoMCwgZXF1YWxpdHkxLmxlbmd0aCAtIGNvbW1vbk9mZnNldCk7XG4gICAgICAgIGVkaXQgPSBjb21tb25TdHJpbmcgKyBlZGl0LnN1YnN0cmluZygwLCBlZGl0Lmxlbmd0aCAtIGNvbW1vbk9mZnNldCk7XG4gICAgICAgIGVxdWFsaXR5MiA9IGNvbW1vblN0cmluZyArIGVxdWFsaXR5MjtcbiAgICAgIH1cblxuICAgICAgLy8gU2Vjb25kLCBzdGVwIGNoYXJhY3RlciBieSBjaGFyYWN0ZXIgcmlnaHQsIGxvb2tpbmcgZm9yIHRoZSBiZXN0IGZpdC5cbiAgICAgIHZhciBiZXN0RXF1YWxpdHkxID0gZXF1YWxpdHkxO1xuICAgICAgdmFyIGJlc3RFZGl0ID0gZWRpdDtcbiAgICAgIHZhciBiZXN0RXF1YWxpdHkyID0gZXF1YWxpdHkyO1xuICAgICAgdmFyIGJlc3RTY29yZSA9IGRpZmZfY2xlYW51cFNlbWFudGljU2NvcmVfKGVxdWFsaXR5MSwgZWRpdCkgK1xuICAgICAgICAgIGRpZmZfY2xlYW51cFNlbWFudGljU2NvcmVfKGVkaXQsIGVxdWFsaXR5Mik7XG4gICAgICB3aGlsZSAoZWRpdC5jaGFyQXQoMCkgPT09IGVxdWFsaXR5Mi5jaGFyQXQoMCkpIHtcbiAgICAgICAgZXF1YWxpdHkxICs9IGVkaXQuY2hhckF0KDApO1xuICAgICAgICBlZGl0ID0gZWRpdC5zdWJzdHJpbmcoMSkgKyBlcXVhbGl0eTIuY2hhckF0KDApO1xuICAgICAgICBlcXVhbGl0eTIgPSBlcXVhbGl0eTIuc3Vic3RyaW5nKDEpO1xuICAgICAgICB2YXIgc2NvcmUgPSBkaWZmX2NsZWFudXBTZW1hbnRpY1Njb3JlXyhlcXVhbGl0eTEsIGVkaXQpICtcbiAgICAgICAgICAgIGRpZmZfY2xlYW51cFNlbWFudGljU2NvcmVfKGVkaXQsIGVxdWFsaXR5Mik7XG4gICAgICAgIC8vIFRoZSA+PSBlbmNvdXJhZ2VzIHRyYWlsaW5nIHJhdGhlciB0aGFuIGxlYWRpbmcgd2hpdGVzcGFjZSBvbiBlZGl0cy5cbiAgICAgICAgaWYgKHNjb3JlID49IGJlc3RTY29yZSkge1xuICAgICAgICAgIGJlc3RTY29yZSA9IHNjb3JlO1xuICAgICAgICAgIGJlc3RFcXVhbGl0eTEgPSBlcXVhbGl0eTE7XG4gICAgICAgICAgYmVzdEVkaXQgPSBlZGl0O1xuICAgICAgICAgIGJlc3RFcXVhbGl0eTIgPSBlcXVhbGl0eTI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGRpZmZzW3BvaW50ZXIgLSAxXVsxXSAhPSBiZXN0RXF1YWxpdHkxKSB7XG4gICAgICAgIC8vIFdlIGhhdmUgYW4gaW1wcm92ZW1lbnQsIHNhdmUgaXQgYmFjayB0byB0aGUgZGlmZi5cbiAgICAgICAgaWYgKGJlc3RFcXVhbGl0eTEpIHtcbiAgICAgICAgICBkaWZmc1twb2ludGVyIC0gMV1bMV0gPSBiZXN0RXF1YWxpdHkxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gMSwgMSk7XG4gICAgICAgICAgcG9pbnRlci0tO1xuICAgICAgICB9XG4gICAgICAgIGRpZmZzW3BvaW50ZXJdWzFdID0gYmVzdEVkaXQ7XG4gICAgICAgIGlmIChiZXN0RXF1YWxpdHkyKSB7XG4gICAgICAgICAgZGlmZnNbcG9pbnRlciArIDFdWzFdID0gYmVzdEVxdWFsaXR5MjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciArIDEsIDEpO1xuICAgICAgICAgIHBvaW50ZXItLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBwb2ludGVyKys7XG4gIH1cbn07XG5cblxuLyoqXG4gKiBSZWR1Y2UgdGhlIG51bWJlciBvZiBlZGl0cyBieSBlbGltaW5hdGluZyBvcGVyYXRpb25hbGx5IHRyaXZpYWwgZXF1YWxpdGllcy5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY2xlYW51cEVmZmljaWVuY3kgPSBmdW5jdGlvbihkaWZmcykge1xuICB2YXIgY2hhbmdlcyA9IGZhbHNlO1xuICB2YXIgZXF1YWxpdGllcyA9IFtdOyAgLy8gU3RhY2sgb2YgaW5kaWNlcyB3aGVyZSBlcXVhbGl0aWVzIGFyZSBmb3VuZC5cbiAgdmFyIGVxdWFsaXRpZXNMZW5ndGggPSAwOyAgLy8gS2VlcGluZyBvdXIgb3duIGxlbmd0aCB2YXIgaXMgZmFzdGVyIGluIEpTLlxuICB2YXIgbGFzdGVxdWFsaXR5ID0gJyc7ICAvLyBBbHdheXMgZXF1YWwgdG8gZXF1YWxpdGllc1tlcXVhbGl0aWVzTGVuZ3RoLTFdWzFdXG4gIHZhciBwb2ludGVyID0gMDsgIC8vIEluZGV4IG9mIGN1cnJlbnQgcG9zaXRpb24uXG4gIC8vIElzIHRoZXJlIGFuIGluc2VydGlvbiBvcGVyYXRpb24gYmVmb3JlIHRoZSBsYXN0IGVxdWFsaXR5LlxuICB2YXIgcHJlX2lucyA9IGZhbHNlO1xuICAvLyBJcyB0aGVyZSBhIGRlbGV0aW9uIG9wZXJhdGlvbiBiZWZvcmUgdGhlIGxhc3QgZXF1YWxpdHkuXG4gIHZhciBwcmVfZGVsID0gZmFsc2U7XG4gIC8vIElzIHRoZXJlIGFuIGluc2VydGlvbiBvcGVyYXRpb24gYWZ0ZXIgdGhlIGxhc3QgZXF1YWxpdHkuXG4gIHZhciBwb3N0X2lucyA9IGZhbHNlO1xuICAvLyBJcyB0aGVyZSBhIGRlbGV0aW9uIG9wZXJhdGlvbiBhZnRlciB0aGUgbGFzdCBlcXVhbGl0eS5cbiAgdmFyIHBvc3RfZGVsID0gZmFsc2U7XG4gIHdoaWxlIChwb2ludGVyIDwgZGlmZnMubGVuZ3RoKSB7XG4gICAgaWYgKGRpZmZzW3BvaW50ZXJdWzBdID09IERJRkZfRVFVQUwpIHsgIC8vIEVxdWFsaXR5IGZvdW5kLlxuICAgICAgaWYgKGRpZmZzW3BvaW50ZXJdWzFdLmxlbmd0aCA8IHRoaXMuRGlmZl9FZGl0Q29zdCAmJlxuICAgICAgICAgIChwb3N0X2lucyB8fCBwb3N0X2RlbCkpIHtcbiAgICAgICAgLy8gQ2FuZGlkYXRlIGZvdW5kLlxuICAgICAgICBlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGgrK10gPSBwb2ludGVyO1xuICAgICAgICBwcmVfaW5zID0gcG9zdF9pbnM7XG4gICAgICAgIHByZV9kZWwgPSBwb3N0X2RlbDtcbiAgICAgICAgbGFzdGVxdWFsaXR5ID0gZGlmZnNbcG9pbnRlcl1bMV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOb3QgYSBjYW5kaWRhdGUsIGFuZCBjYW4gbmV2ZXIgYmVjb21lIG9uZS5cbiAgICAgICAgZXF1YWxpdGllc0xlbmd0aCA9IDA7XG4gICAgICAgIGxhc3RlcXVhbGl0eSA9ICcnO1xuICAgICAgfVxuICAgICAgcG9zdF9pbnMgPSBwb3N0X2RlbCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7ICAvLyBBbiBpbnNlcnRpb24gb3IgZGVsZXRpb24uXG4gICAgICBpZiAoZGlmZnNbcG9pbnRlcl1bMF0gPT0gRElGRl9ERUxFVEUpIHtcbiAgICAgICAgcG9zdF9kZWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcG9zdF9pbnMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgLypcbiAgICAgICAqIEZpdmUgdHlwZXMgdG8gYmUgc3BsaXQ6XG4gICAgICAgKiA8aW5zPkE8L2lucz48ZGVsPkI8L2RlbD5YWTxpbnM+QzwvaW5zPjxkZWw+RDwvZGVsPlxuICAgICAgICogPGlucz5BPC9pbnM+WDxpbnM+QzwvaW5zPjxkZWw+RDwvZGVsPlxuICAgICAgICogPGlucz5BPC9pbnM+PGRlbD5CPC9kZWw+WDxpbnM+QzwvaW5zPlxuICAgICAgICogPGlucz5BPC9kZWw+WDxpbnM+QzwvaW5zPjxkZWw+RDwvZGVsPlxuICAgICAgICogPGlucz5BPC9pbnM+PGRlbD5CPC9kZWw+WDxkZWw+QzwvZGVsPlxuICAgICAgICovXG4gICAgICBpZiAobGFzdGVxdWFsaXR5ICYmICgocHJlX2lucyAmJiBwcmVfZGVsICYmIHBvc3RfaW5zICYmIHBvc3RfZGVsKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKChsYXN0ZXF1YWxpdHkubGVuZ3RoIDwgdGhpcy5EaWZmX0VkaXRDb3N0IC8gMikgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJlX2lucyArIHByZV9kZWwgKyBwb3N0X2lucyArIHBvc3RfZGVsKSA9PSAzKSkpIHtcbiAgICAgICAgLy8gRHVwbGljYXRlIHJlY29yZC5cbiAgICAgICAgZGlmZnMuc3BsaWNlKGVxdWFsaXRpZXNbZXF1YWxpdGllc0xlbmd0aCAtIDFdLCAwLFxuICAgICAgICAgICAgICAgICAgICAgW0RJRkZfREVMRVRFLCBsYXN0ZXF1YWxpdHldKTtcbiAgICAgICAgLy8gQ2hhbmdlIHNlY29uZCBjb3B5IHRvIGluc2VydC5cbiAgICAgICAgZGlmZnNbZXF1YWxpdGllc1tlcXVhbGl0aWVzTGVuZ3RoIC0gMV0gKyAxXVswXSA9IERJRkZfSU5TRVJUO1xuICAgICAgICBlcXVhbGl0aWVzTGVuZ3RoLS07ICAvLyBUaHJvdyBhd2F5IHRoZSBlcXVhbGl0eSB3ZSBqdXN0IGRlbGV0ZWQ7XG4gICAgICAgIGxhc3RlcXVhbGl0eSA9ICcnO1xuICAgICAgICBpZiAocHJlX2lucyAmJiBwcmVfZGVsKSB7XG4gICAgICAgICAgLy8gTm8gY2hhbmdlcyBtYWRlIHdoaWNoIGNvdWxkIGFmZmVjdCBwcmV2aW91cyBlbnRyeSwga2VlcCBnb2luZy5cbiAgICAgICAgICBwb3N0X2lucyA9IHBvc3RfZGVsID0gdHJ1ZTtcbiAgICAgICAgICBlcXVhbGl0aWVzTGVuZ3RoID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlcXVhbGl0aWVzTGVuZ3RoLS07ICAvLyBUaHJvdyBhd2F5IHRoZSBwcmV2aW91cyBlcXVhbGl0eS5cbiAgICAgICAgICBwb2ludGVyID0gZXF1YWxpdGllc0xlbmd0aCA+IDAgP1xuICAgICAgICAgICAgICBlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGggLSAxXSA6IC0xO1xuICAgICAgICAgIHBvc3RfaW5zID0gcG9zdF9kZWwgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjaGFuZ2VzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcG9pbnRlcisrO1xuICB9XG5cbiAgaWYgKGNoYW5nZXMpIHtcbiAgICB0aGlzLmRpZmZfY2xlYW51cE1lcmdlKGRpZmZzKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIFJlb3JkZXIgYW5kIG1lcmdlIGxpa2UgZWRpdCBzZWN0aW9ucy4gIE1lcmdlIGVxdWFsaXRpZXMuXG4gKiBBbnkgZWRpdCBzZWN0aW9uIGNhbiBtb3ZlIGFzIGxvbmcgYXMgaXQgZG9lc24ndCBjcm9zcyBhbiBlcXVhbGl0eS5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfY2xlYW51cE1lcmdlID0gZnVuY3Rpb24oZGlmZnMpIHtcbiAgZGlmZnMucHVzaChbRElGRl9FUVVBTCwgJyddKTsgIC8vIEFkZCBhIGR1bW15IGVudHJ5IGF0IHRoZSBlbmQuXG4gIHZhciBwb2ludGVyID0gMDtcbiAgdmFyIGNvdW50X2RlbGV0ZSA9IDA7XG4gIHZhciBjb3VudF9pbnNlcnQgPSAwO1xuICB2YXIgdGV4dF9kZWxldGUgPSAnJztcbiAgdmFyIHRleHRfaW5zZXJ0ID0gJyc7XG4gIHZhciBjb21tb25sZW5ndGg7XG4gIHdoaWxlIChwb2ludGVyIDwgZGlmZnMubGVuZ3RoKSB7XG4gICAgc3dpdGNoIChkaWZmc1twb2ludGVyXVswXSkge1xuICAgICAgY2FzZSBESUZGX0lOU0VSVDpcbiAgICAgICAgY291bnRfaW5zZXJ0Kys7XG4gICAgICAgIHRleHRfaW5zZXJ0ICs9IGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgY291bnRfZGVsZXRlKys7XG4gICAgICAgIHRleHRfZGVsZXRlICs9IGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICBwb2ludGVyKys7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAvLyBVcG9uIHJlYWNoaW5nIGFuIGVxdWFsaXR5LCBjaGVjayBmb3IgcHJpb3IgcmVkdW5kYW5jaWVzLlxuICAgICAgICBpZiAoY291bnRfZGVsZXRlICsgY291bnRfaW5zZXJ0ID4gMSkge1xuICAgICAgICAgIGlmIChjb3VudF9kZWxldGUgIT09IDAgJiYgY291bnRfaW5zZXJ0ICE9PSAwKSB7XG4gICAgICAgICAgICAvLyBGYWN0b3Igb3V0IGFueSBjb21tb24gcHJlZml4aWVzLlxuICAgICAgICAgICAgY29tbW9ubGVuZ3RoID0gdGhpcy5kaWZmX2NvbW1vblByZWZpeCh0ZXh0X2luc2VydCwgdGV4dF9kZWxldGUpO1xuICAgICAgICAgICAgaWYgKGNvbW1vbmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICBpZiAoKHBvaW50ZXIgLSBjb3VudF9kZWxldGUgLSBjb3VudF9pbnNlcnQpID4gMCAmJlxuICAgICAgICAgICAgICAgICAgZGlmZnNbcG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydCAtIDFdWzBdID09XG4gICAgICAgICAgICAgICAgICBESUZGX0VRVUFMKSB7XG4gICAgICAgICAgICAgICAgZGlmZnNbcG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydCAtIDFdWzFdICs9XG4gICAgICAgICAgICAgICAgICAgIHRleHRfaW5zZXJ0LnN1YnN0cmluZygwLCBjb21tb25sZW5ndGgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRpZmZzLnNwbGljZSgwLCAwLCBbRElGRl9FUVVBTCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRfaW5zZXJ0LnN1YnN0cmluZygwLCBjb21tb25sZW5ndGgpXSk7XG4gICAgICAgICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRleHRfaW5zZXJ0ID0gdGV4dF9pbnNlcnQuc3Vic3RyaW5nKGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICAgIHRleHRfZGVsZXRlID0gdGV4dF9kZWxldGUuc3Vic3RyaW5nKGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBGYWN0b3Igb3V0IGFueSBjb21tb24gc3VmZml4aWVzLlxuICAgICAgICAgICAgY29tbW9ubGVuZ3RoID0gdGhpcy5kaWZmX2NvbW1vblN1ZmZpeCh0ZXh0X2luc2VydCwgdGV4dF9kZWxldGUpO1xuICAgICAgICAgICAgaWYgKGNvbW1vbmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICBkaWZmc1twb2ludGVyXVsxXSA9IHRleHRfaW5zZXJ0LnN1YnN0cmluZyh0ZXh0X2luc2VydC5sZW5ndGggLVxuICAgICAgICAgICAgICAgICAgY29tbW9ubGVuZ3RoKSArIGRpZmZzW3BvaW50ZXJdWzFdO1xuICAgICAgICAgICAgICB0ZXh0X2luc2VydCA9IHRleHRfaW5zZXJ0LnN1YnN0cmluZygwLCB0ZXh0X2luc2VydC5sZW5ndGggLVxuICAgICAgICAgICAgICAgICAgY29tbW9ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgdGV4dF9kZWxldGUgPSB0ZXh0X2RlbGV0ZS5zdWJzdHJpbmcoMCwgdGV4dF9kZWxldGUubGVuZ3RoIC1cbiAgICAgICAgICAgICAgICAgIGNvbW1vbmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIERlbGV0ZSB0aGUgb2ZmZW5kaW5nIHJlY29yZHMgYW5kIGFkZCB0aGUgbWVyZ2VkIG9uZXMuXG4gICAgICAgICAgaWYgKGNvdW50X2RlbGV0ZSA9PT0gMCkge1xuICAgICAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIgLSBjb3VudF9kZWxldGUgLSBjb3VudF9pbnNlcnQsXG4gICAgICAgICAgICAgICAgY291bnRfZGVsZXRlICsgY291bnRfaW5zZXJ0LCBbRElGRl9JTlNFUlQsIHRleHRfaW5zZXJ0XSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjb3VudF9pbnNlcnQgPT09IDApIHtcbiAgICAgICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gY291bnRfZGVsZXRlIC0gY291bnRfaW5zZXJ0LFxuICAgICAgICAgICAgICAgIGNvdW50X2RlbGV0ZSArIGNvdW50X2luc2VydCwgW0RJRkZfREVMRVRFLCB0ZXh0X2RlbGV0ZV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciAtIGNvdW50X2RlbGV0ZSAtIGNvdW50X2luc2VydCxcbiAgICAgICAgICAgICAgICBjb3VudF9kZWxldGUgKyBjb3VudF9pbnNlcnQsIFtESUZGX0RFTEVURSwgdGV4dF9kZWxldGVdLFxuICAgICAgICAgICAgICAgIFtESUZGX0lOU0VSVCwgdGV4dF9pbnNlcnRdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcG9pbnRlciA9IHBvaW50ZXIgLSBjb3VudF9kZWxldGUgLSBjb3VudF9pbnNlcnQgK1xuICAgICAgICAgICAgICAgICAgICAoY291bnRfZGVsZXRlID8gMSA6IDApICsgKGNvdW50X2luc2VydCA/IDEgOiAwKSArIDE7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRlciAhPT0gMCAmJiBkaWZmc1twb2ludGVyIC0gMV1bMF0gPT0gRElGRl9FUVVBTCkge1xuICAgICAgICAgIC8vIE1lcmdlIHRoaXMgZXF1YWxpdHkgd2l0aCB0aGUgcHJldmlvdXMgb25lLlxuICAgICAgICAgIGRpZmZzW3BvaW50ZXIgLSAxXVsxXSArPSBkaWZmc1twb2ludGVyXVsxXTtcbiAgICAgICAgICBkaWZmcy5zcGxpY2UocG9pbnRlciwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcG9pbnRlcisrO1xuICAgICAgICB9XG4gICAgICAgIGNvdW50X2luc2VydCA9IDA7XG4gICAgICAgIGNvdW50X2RlbGV0ZSA9IDA7XG4gICAgICAgIHRleHRfZGVsZXRlID0gJyc7XG4gICAgICAgIHRleHRfaW5zZXJ0ID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoZGlmZnNbZGlmZnMubGVuZ3RoIC0gMV1bMV0gPT09ICcnKSB7XG4gICAgZGlmZnMucG9wKCk7ICAvLyBSZW1vdmUgdGhlIGR1bW15IGVudHJ5IGF0IHRoZSBlbmQuXG4gIH1cblxuICAvLyBTZWNvbmQgcGFzczogbG9vayBmb3Igc2luZ2xlIGVkaXRzIHN1cnJvdW5kZWQgb24gYm90aCBzaWRlcyBieSBlcXVhbGl0aWVzXG4gIC8vIHdoaWNoIGNhbiBiZSBzaGlmdGVkIHNpZGV3YXlzIHRvIGVsaW1pbmF0ZSBhbiBlcXVhbGl0eS5cbiAgLy8gZS5nOiBBPGlucz5CQTwvaW5zPkMgLT4gPGlucz5BQjwvaW5zPkFDXG4gIHZhciBjaGFuZ2VzID0gZmFsc2U7XG4gIHBvaW50ZXIgPSAxO1xuICAvLyBJbnRlbnRpb25hbGx5IGlnbm9yZSB0aGUgZmlyc3QgYW5kIGxhc3QgZWxlbWVudCAoZG9uJ3QgbmVlZCBjaGVja2luZykuXG4gIHdoaWxlIChwb2ludGVyIDwgZGlmZnMubGVuZ3RoIC0gMSkge1xuICAgIGlmIChkaWZmc1twb2ludGVyIC0gMV1bMF0gPT0gRElGRl9FUVVBTCAmJlxuICAgICAgICBkaWZmc1twb2ludGVyICsgMV1bMF0gPT0gRElGRl9FUVVBTCkge1xuICAgICAgLy8gVGhpcyBpcyBhIHNpbmdsZSBlZGl0IHN1cnJvdW5kZWQgYnkgZXF1YWxpdGllcy5cbiAgICAgIGlmIChkaWZmc1twb2ludGVyXVsxXS5zdWJzdHJpbmcoZGlmZnNbcG9pbnRlcl1bMV0ubGVuZ3RoIC1cbiAgICAgICAgICBkaWZmc1twb2ludGVyIC0gMV1bMV0ubGVuZ3RoKSA9PSBkaWZmc1twb2ludGVyIC0gMV1bMV0pIHtcbiAgICAgICAgLy8gU2hpZnQgdGhlIGVkaXQgb3ZlciB0aGUgcHJldmlvdXMgZXF1YWxpdHkuXG4gICAgICAgIGRpZmZzW3BvaW50ZXJdWzFdID0gZGlmZnNbcG9pbnRlciAtIDFdWzFdICtcbiAgICAgICAgICAgIGRpZmZzW3BvaW50ZXJdWzFdLnN1YnN0cmluZygwLCBkaWZmc1twb2ludGVyXVsxXS5sZW5ndGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZzW3BvaW50ZXIgLSAxXVsxXS5sZW5ndGgpO1xuICAgICAgICBkaWZmc1twb2ludGVyICsgMV1bMV0gPSBkaWZmc1twb2ludGVyIC0gMV1bMV0gKyBkaWZmc1twb2ludGVyICsgMV1bMV07XG4gICAgICAgIGRpZmZzLnNwbGljZShwb2ludGVyIC0gMSwgMSk7XG4gICAgICAgIGNoYW5nZXMgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChkaWZmc1twb2ludGVyXVsxXS5zdWJzdHJpbmcoMCwgZGlmZnNbcG9pbnRlciArIDFdWzFdLmxlbmd0aCkgPT1cbiAgICAgICAgICBkaWZmc1twb2ludGVyICsgMV1bMV0pIHtcbiAgICAgICAgLy8gU2hpZnQgdGhlIGVkaXQgb3ZlciB0aGUgbmV4dCBlcXVhbGl0eS5cbiAgICAgICAgZGlmZnNbcG9pbnRlciAtIDFdWzFdICs9IGRpZmZzW3BvaW50ZXIgKyAxXVsxXTtcbiAgICAgICAgZGlmZnNbcG9pbnRlcl1bMV0gPVxuICAgICAgICAgICAgZGlmZnNbcG9pbnRlcl1bMV0uc3Vic3RyaW5nKGRpZmZzW3BvaW50ZXIgKyAxXVsxXS5sZW5ndGgpICtcbiAgICAgICAgICAgIGRpZmZzW3BvaW50ZXIgKyAxXVsxXTtcbiAgICAgICAgZGlmZnMuc3BsaWNlKHBvaW50ZXIgKyAxLCAxKTtcbiAgICAgICAgY2hhbmdlcyA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHBvaW50ZXIrKztcbiAgfVxuICAvLyBJZiBzaGlmdHMgd2VyZSBtYWRlLCB0aGUgZGlmZiBuZWVkcyByZW9yZGVyaW5nIGFuZCBhbm90aGVyIHNoaWZ0IHN3ZWVwLlxuICBpZiAoY2hhbmdlcykge1xuICAgIHRoaXMuZGlmZl9jbGVhbnVwTWVyZ2UoZGlmZnMpO1xuICB9XG59O1xuXG5cbi8qKlxuICogbG9jIGlzIGEgbG9jYXRpb24gaW4gdGV4dDEsIGNvbXB1dGUgYW5kIHJldHVybiB0aGUgZXF1aXZhbGVudCBsb2NhdGlvbiBpblxuICogdGV4dDIuXG4gKiBlLmcuICdUaGUgY2F0JyB2cyAnVGhlIGJpZyBjYXQnLCAxLT4xLCA1LT44XG4gKiBAcGFyYW0geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IGRpZmZzIEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHBhcmFtIHtudW1iZXJ9IGxvYyBMb2NhdGlvbiB3aXRoaW4gdGV4dDEuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IExvY2F0aW9uIHdpdGhpbiB0ZXh0Mi5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl94SW5kZXggPSBmdW5jdGlvbihkaWZmcywgbG9jKSB7XG4gIHZhciBjaGFyczEgPSAwO1xuICB2YXIgY2hhcnMyID0gMDtcbiAgdmFyIGxhc3RfY2hhcnMxID0gMDtcbiAgdmFyIGxhc3RfY2hhcnMyID0gMDtcbiAgdmFyIHg7XG4gIGZvciAoeCA9IDA7IHggPCBkaWZmcy5sZW5ndGg7IHgrKykge1xuICAgIGlmIChkaWZmc1t4XVswXSAhPT0gRElGRl9JTlNFUlQpIHsgIC8vIEVxdWFsaXR5IG9yIGRlbGV0aW9uLlxuICAgICAgY2hhcnMxICs9IGRpZmZzW3hdWzFdLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGRpZmZzW3hdWzBdICE9PSBESUZGX0RFTEVURSkgeyAgLy8gRXF1YWxpdHkgb3IgaW5zZXJ0aW9uLlxuICAgICAgY2hhcnMyICs9IGRpZmZzW3hdWzFdLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKGNoYXJzMSA+IGxvYykgeyAgLy8gT3ZlcnNob3QgdGhlIGxvY2F0aW9uLlxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxhc3RfY2hhcnMxID0gY2hhcnMxO1xuICAgIGxhc3RfY2hhcnMyID0gY2hhcnMyO1xuICB9XG4gIC8vIFdhcyB0aGUgbG9jYXRpb24gd2FzIGRlbGV0ZWQ/XG4gIGlmIChkaWZmcy5sZW5ndGggIT0geCAmJiBkaWZmc1t4XVswXSA9PT0gRElGRl9ERUxFVEUpIHtcbiAgICByZXR1cm4gbGFzdF9jaGFyczI7XG4gIH1cbiAgLy8gQWRkIHRoZSByZW1haW5pbmcgY2hhcmFjdGVyIGxlbmd0aC5cbiAgcmV0dXJuIGxhc3RfY2hhcnMyICsgKGxvYyAtIGxhc3RfY2hhcnMxKTtcbn07XG5cblxuLyoqXG4gKiBDb252ZXJ0IGEgZGlmZiBhcnJheSBpbnRvIGEgcHJldHR5IEhUTUwgcmVwb3J0LlxuICogQHBhcmFtIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBkaWZmcyBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqIEByZXR1cm4ge3N0cmluZ30gSFRNTCByZXByZXNlbnRhdGlvbi5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUuZGlmZl9wcmV0dHlIdG1sID0gZnVuY3Rpb24oZGlmZnMpIHtcbiAgdmFyIGh0bWwgPSBbXTtcbiAgdmFyIGkgPSAwO1xuICB2YXIgcGF0dGVybl9hbXAgPSAvJi9nO1xuICB2YXIgcGF0dGVybl9sdCA9IC88L2c7XG4gIHZhciBwYXR0ZXJuX2d0ID0gLz4vZztcbiAgdmFyIHBhdHRlcm5fcGFyYSA9IC9cXG4vZztcbiAgZm9yICh2YXIgeCA9IDA7IHggPCBkaWZmcy5sZW5ndGg7IHgrKykge1xuICAgIHZhciBvcCA9IGRpZmZzW3hdWzBdOyAgICAvLyBPcGVyYXRpb24gKGluc2VydCwgZGVsZXRlLCBlcXVhbClcbiAgICB2YXIgZGF0YSA9IGRpZmZzW3hdWzFdOyAgLy8gVGV4dCBvZiBjaGFuZ2UuXG4gICAgdmFyIHRleHQgPSBkYXRhLnJlcGxhY2UocGF0dGVybl9hbXAsICcmYW1wOycpLnJlcGxhY2UocGF0dGVybl9sdCwgJyZsdDsnKVxuICAgICAgICAucmVwbGFjZShwYXR0ZXJuX2d0LCAnJmd0OycpLnJlcGxhY2UocGF0dGVybl9wYXJhLCAnJnBhcmE7PGJyPicpO1xuICAgIHN3aXRjaCAob3ApIHtcbiAgICAgIGNhc2UgRElGRl9JTlNFUlQ6XG4gICAgICAgIGh0bWxbeF0gPSAnPGlucyBzdHlsZT1cImJhY2tncm91bmQ6I2U2ZmZlNjtcIj4nICsgdGV4dCArICc8L2lucz4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElGRl9ERUxFVEU6XG4gICAgICAgIGh0bWxbeF0gPSAnPGRlbCBzdHlsZT1cImJhY2tncm91bmQ6I2ZmZTZlNjtcIj4nICsgdGV4dCArICc8L2RlbD4nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRElGRl9FUVVBTDpcbiAgICAgICAgaHRtbFt4XSA9ICc8c3Bhbj4nICsgdGV4dCArICc8L3NwYW4+JztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChvcCAhPT0gRElGRl9ERUxFVEUpIHtcbiAgICAgIGkgKz0gZGF0YS5sZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiBodG1sLmpvaW4oJycpO1xufTtcblxuXG4vKipcbiAqIENvbXB1dGUgYW5kIHJldHVybiB0aGUgc291cmNlIHRleHQgKGFsbCBlcXVhbGl0aWVzIGFuZCBkZWxldGlvbnMpLlxuICogQHBhcmFtIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBkaWZmcyBBcnJheSBvZiBkaWZmIHR1cGxlcy5cbiAqIEByZXR1cm4ge3N0cmluZ30gU291cmNlIHRleHQuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfdGV4dDEgPSBmdW5jdGlvbihkaWZmcykge1xuICB2YXIgdGV4dCA9IFtdO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgaWYgKGRpZmZzW3hdWzBdICE9PSBESUZGX0lOU0VSVCkge1xuICAgICAgdGV4dFt4XSA9IGRpZmZzW3hdWzFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dC5qb2luKCcnKTtcbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIGFuZCByZXR1cm4gdGhlIGRlc3RpbmF0aW9uIHRleHQgKGFsbCBlcXVhbGl0aWVzIGFuZCBpbnNlcnRpb25zKS5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IERlc3RpbmF0aW9uIHRleHQuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLmRpZmZfdGV4dDIgPSBmdW5jdGlvbihkaWZmcykge1xuICB2YXIgdGV4dCA9IFtdO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgaWYgKGRpZmZzW3hdWzBdICE9PSBESUZGX0RFTEVURSkge1xuICAgICAgdGV4dFt4XSA9IGRpZmZzW3hdWzFdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dC5qb2luKCcnKTtcbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIHRoZSBMZXZlbnNodGVpbiBkaXN0YW5jZTsgdGhlIG51bWJlciBvZiBpbnNlcnRlZCwgZGVsZXRlZCBvclxuICogc3Vic3RpdHV0ZWQgY2hhcmFjdGVycy5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IE51bWJlciBvZiBjaGFuZ2VzLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX2xldmVuc2h0ZWluID0gZnVuY3Rpb24oZGlmZnMpIHtcbiAgdmFyIGxldmVuc2h0ZWluID0gMDtcbiAgdmFyIGluc2VydGlvbnMgPSAwO1xuICB2YXIgZGVsZXRpb25zID0gMDtcbiAgZm9yICh2YXIgeCA9IDA7IHggPCBkaWZmcy5sZW5ndGg7IHgrKykge1xuICAgIHZhciBvcCA9IGRpZmZzW3hdWzBdO1xuICAgIHZhciBkYXRhID0gZGlmZnNbeF1bMV07XG4gICAgc3dpdGNoIChvcCkge1xuICAgICAgY2FzZSBESUZGX0lOU0VSVDpcbiAgICAgICAgaW5zZXJ0aW9ucyArPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfREVMRVRFOlxuICAgICAgICBkZWxldGlvbnMgKz0gZGF0YS5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0VRVUFMOlxuICAgICAgICAvLyBBIGRlbGV0aW9uIGFuZCBhbiBpbnNlcnRpb24gaXMgb25lIHN1YnN0aXR1dGlvbi5cbiAgICAgICAgbGV2ZW5zaHRlaW4gKz0gTWF0aC5tYXgoaW5zZXJ0aW9ucywgZGVsZXRpb25zKTtcbiAgICAgICAgaW5zZXJ0aW9ucyA9IDA7XG4gICAgICAgIGRlbGV0aW9ucyA9IDA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBsZXZlbnNodGVpbiArPSBNYXRoLm1heChpbnNlcnRpb25zLCBkZWxldGlvbnMpO1xuICByZXR1cm4gbGV2ZW5zaHRlaW47XG59O1xuXG5cbi8qKlxuICogQ3J1c2ggdGhlIGRpZmYgaW50byBhbiBlbmNvZGVkIHN0cmluZyB3aGljaCBkZXNjcmliZXMgdGhlIG9wZXJhdGlvbnNcbiAqIHJlcXVpcmVkIHRvIHRyYW5zZm9ybSB0ZXh0MSBpbnRvIHRleHQyLlxuICogRS5nLiA9M1xcdC0yXFx0K2luZyAgLT4gS2VlcCAzIGNoYXJzLCBkZWxldGUgMiBjaGFycywgaW5zZXJ0ICdpbmcnLlxuICogT3BlcmF0aW9ucyBhcmUgdGFiLXNlcGFyYXRlZC4gIEluc2VydGVkIHRleHQgaXMgZXNjYXBlZCB1c2luZyAleHggbm90YXRpb24uXG4gKiBAcGFyYW0geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IGRpZmZzIEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHJldHVybiB7c3RyaW5nfSBEZWx0YSB0ZXh0LlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX3RvRGVsdGEgPSBmdW5jdGlvbihkaWZmcykge1xuICB2YXIgdGV4dCA9IFtdO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgc3dpdGNoIChkaWZmc1t4XVswXSkge1xuICAgICAgY2FzZSBESUZGX0lOU0VSVDpcbiAgICAgICAgdGV4dFt4XSA9ICcrJyArIGVuY29kZVVSSShkaWZmc1t4XVsxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgdGV4dFt4XSA9ICctJyArIGRpZmZzW3hdWzFdLmxlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgIHRleHRbeF0gPSAnPScgKyBkaWZmc1t4XVsxXS5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGV4dC5qb2luKCdcXHQnKS5yZXBsYWNlKC8lMjAvZywgJyAnKTtcbn07XG5cblxuLyoqXG4gKiBHaXZlbiB0aGUgb3JpZ2luYWwgdGV4dDEsIGFuZCBhbiBlbmNvZGVkIHN0cmluZyB3aGljaCBkZXNjcmliZXMgdGhlXG4gKiBvcGVyYXRpb25zIHJlcXVpcmVkIHRvIHRyYW5zZm9ybSB0ZXh0MSBpbnRvIHRleHQyLCBjb21wdXRlIHRoZSBmdWxsIGRpZmYuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgU291cmNlIHN0cmluZyBmb3IgdGhlIGRpZmYuXG4gKiBAcGFyYW0ge3N0cmluZ30gZGVsdGEgRGVsdGEgdGV4dC5cbiAqIEByZXR1cm4geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuICogQHRocm93cyB7IUVycm9yfSBJZiBpbnZhbGlkIGlucHV0LlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5kaWZmX2Zyb21EZWx0YSA9IGZ1bmN0aW9uKHRleHQxLCBkZWx0YSkge1xuICB2YXIgZGlmZnMgPSBbXTtcbiAgdmFyIGRpZmZzTGVuZ3RoID0gMDsgIC8vIEtlZXBpbmcgb3VyIG93biBsZW5ndGggdmFyIGlzIGZhc3RlciBpbiBKUy5cbiAgdmFyIHBvaW50ZXIgPSAwOyAgLy8gQ3Vyc29yIGluIHRleHQxXG4gIHZhciB0b2tlbnMgPSBkZWx0YS5zcGxpdCgvXFx0L2cpO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IHRva2Vucy5sZW5ndGg7IHgrKykge1xuICAgIC8vIEVhY2ggdG9rZW4gYmVnaW5zIHdpdGggYSBvbmUgY2hhcmFjdGVyIHBhcmFtZXRlciB3aGljaCBzcGVjaWZpZXMgdGhlXG4gICAgLy8gb3BlcmF0aW9uIG9mIHRoaXMgdG9rZW4gKGRlbGV0ZSwgaW5zZXJ0LCBlcXVhbGl0eSkuXG4gICAgdmFyIHBhcmFtID0gdG9rZW5zW3hdLnN1YnN0cmluZygxKTtcbiAgICBzd2l0Y2ggKHRva2Vuc1t4XS5jaGFyQXQoMCkpIHtcbiAgICAgIGNhc2UgJysnOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIGRpZmZzW2RpZmZzTGVuZ3RoKytdID0gW0RJRkZfSU5TRVJULCBkZWNvZGVVUkkocGFyYW0pXTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAvLyBNYWxmb3JtZWQgVVJJIHNlcXVlbmNlLlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBlc2NhcGUgaW4gZGlmZl9mcm9tRGVsdGE6ICcgKyBwYXJhbSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICctJzpcbiAgICAgICAgLy8gRmFsbCB0aHJvdWdoLlxuICAgICAgY2FzZSAnPSc6XG4gICAgICAgIHZhciBuID0gcGFyc2VJbnQocGFyYW0sIDEwKTtcbiAgICAgICAgaWYgKGlzTmFOKG4pIHx8IG4gPCAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlciBpbiBkaWZmX2Zyb21EZWx0YTogJyArIHBhcmFtKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dCA9IHRleHQxLnN1YnN0cmluZyhwb2ludGVyLCBwb2ludGVyICs9IG4pO1xuICAgICAgICBpZiAodG9rZW5zW3hdLmNoYXJBdCgwKSA9PSAnPScpIHtcbiAgICAgICAgICBkaWZmc1tkaWZmc0xlbmd0aCsrXSA9IFtESUZGX0VRVUFMLCB0ZXh0XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaWZmc1tkaWZmc0xlbmd0aCsrXSA9IFtESUZGX0RFTEVURSwgdGV4dF07XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBCbGFuayB0b2tlbnMgYXJlIG9rIChmcm9tIGEgdHJhaWxpbmcgXFx0KS5cbiAgICAgICAgLy8gQW55dGhpbmcgZWxzZSBpcyBhbiBlcnJvci5cbiAgICAgICAgaWYgKHRva2Vuc1t4XSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBkaWZmIG9wZXJhdGlvbiBpbiBkaWZmX2Zyb21EZWx0YTogJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vuc1t4XSk7XG4gICAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHBvaW50ZXIgIT0gdGV4dDEubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdEZWx0YSBsZW5ndGggKCcgKyBwb2ludGVyICtcbiAgICAgICAgJykgZG9lcyBub3QgZXF1YWwgc291cmNlIHRleHQgbGVuZ3RoICgnICsgdGV4dDEubGVuZ3RoICsgJykuJyk7XG4gIH1cbiAgcmV0dXJuIGRpZmZzO1xufTtcblxuXG4vLyAgTUFUQ0ggRlVOQ1RJT05TXG5cblxuLyoqXG4gKiBMb2NhdGUgdGhlIGJlc3QgaW5zdGFuY2Ugb2YgJ3BhdHRlcm4nIGluICd0ZXh0JyBuZWFyICdsb2MnLlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgVGhlIHRleHQgdG8gc2VhcmNoLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gVGhlIHBhdHRlcm4gdG8gc2VhcmNoIGZvci5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsb2MgVGhlIGxvY2F0aW9uIHRvIHNlYXJjaCBhcm91bmQuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IEJlc3QgbWF0Y2ggaW5kZXggb3IgLTEuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLm1hdGNoX21haW4gPSBmdW5jdGlvbih0ZXh0LCBwYXR0ZXJuLCBsb2MpIHtcbiAgLy8gQ2hlY2sgZm9yIG51bGwgaW5wdXRzLlxuICBpZiAodGV4dCA9PSBudWxsIHx8IHBhdHRlcm4gPT0gbnVsbCB8fCBsb2MgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTnVsbCBpbnB1dC4gKG1hdGNoX21haW4pJyk7XG4gIH1cblxuICBsb2MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihsb2MsIHRleHQubGVuZ3RoKSk7XG4gIGlmICh0ZXh0ID09IHBhdHRlcm4pIHtcbiAgICAvLyBTaG9ydGN1dCAocG90ZW50aWFsbHkgbm90IGd1YXJhbnRlZWQgYnkgdGhlIGFsZ29yaXRobSlcbiAgICByZXR1cm4gMDtcbiAgfSBlbHNlIGlmICghdGV4dC5sZW5ndGgpIHtcbiAgICAvLyBOb3RoaW5nIHRvIG1hdGNoLlxuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmICh0ZXh0LnN1YnN0cmluZyhsb2MsIGxvYyArIHBhdHRlcm4ubGVuZ3RoKSA9PSBwYXR0ZXJuKSB7XG4gICAgLy8gUGVyZmVjdCBtYXRjaCBhdCB0aGUgcGVyZmVjdCBzcG90ISAgKEluY2x1ZGVzIGNhc2Ugb2YgbnVsbCBwYXR0ZXJuKVxuICAgIHJldHVybiBsb2M7XG4gIH0gZWxzZSB7XG4gICAgLy8gRG8gYSBmdXp6eSBjb21wYXJlLlxuICAgIHJldHVybiB0aGlzLm1hdGNoX2JpdGFwXyh0ZXh0LCBwYXR0ZXJuLCBsb2MpO1xuICB9XG59O1xuXG5cbi8qKlxuICogTG9jYXRlIHRoZSBiZXN0IGluc3RhbmNlIG9mICdwYXR0ZXJuJyBpbiAndGV4dCcgbmVhciAnbG9jJyB1c2luZyB0aGVcbiAqIEJpdGFwIGFsZ29yaXRobS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFRoZSB0ZXh0IHRvIHNlYXJjaC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXR0ZXJuIFRoZSBwYXR0ZXJuIHRvIHNlYXJjaCBmb3IuXG4gKiBAcGFyYW0ge251bWJlcn0gbG9jIFRoZSBsb2NhdGlvbiB0byBzZWFyY2ggYXJvdW5kLlxuICogQHJldHVybiB7bnVtYmVyfSBCZXN0IG1hdGNoIGluZGV4IG9yIC0xLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUubWF0Y2hfYml0YXBfID0gZnVuY3Rpb24odGV4dCwgcGF0dGVybiwgbG9jKSB7XG4gIGlmIChwYXR0ZXJuLmxlbmd0aCA+IHRoaXMuTWF0Y2hfTWF4Qml0cykge1xuICAgIHRocm93IG5ldyBFcnJvcignUGF0dGVybiB0b28gbG9uZyBmb3IgdGhpcyBicm93c2VyLicpO1xuICB9XG5cbiAgLy8gSW5pdGlhbGlzZSB0aGUgYWxwaGFiZXQuXG4gIHZhciBzID0gdGhpcy5tYXRjaF9hbHBoYWJldF8ocGF0dGVybik7XG5cbiAgdmFyIGRtcCA9IHRoaXM7ICAvLyAndGhpcycgYmVjb21lcyAnd2luZG93JyBpbiBhIGNsb3N1cmUuXG5cbiAgLyoqXG4gICAqIENvbXB1dGUgYW5kIHJldHVybiB0aGUgc2NvcmUgZm9yIGEgbWF0Y2ggd2l0aCBlIGVycm9ycyBhbmQgeCBsb2NhdGlvbi5cbiAgICogQWNjZXNzZXMgbG9jIGFuZCBwYXR0ZXJuIHRocm91Z2ggYmVpbmcgYSBjbG9zdXJlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gZSBOdW1iZXIgb2YgZXJyb3JzIGluIG1hdGNoLlxuICAgKiBAcGFyYW0ge251bWJlcn0geCBMb2NhdGlvbiBvZiBtYXRjaC5cbiAgICogQHJldHVybiB7bnVtYmVyfSBPdmVyYWxsIHNjb3JlIGZvciBtYXRjaCAoMC4wID0gZ29vZCwgMS4wID0gYmFkKS5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIG1hdGNoX2JpdGFwU2NvcmVfKGUsIHgpIHtcbiAgICB2YXIgYWNjdXJhY3kgPSBlIC8gcGF0dGVybi5sZW5ndGg7XG4gICAgdmFyIHByb3hpbWl0eSA9IE1hdGguYWJzKGxvYyAtIHgpO1xuICAgIGlmICghZG1wLk1hdGNoX0Rpc3RhbmNlKSB7XG4gICAgICAvLyBEb2RnZSBkaXZpZGUgYnkgemVybyBlcnJvci5cbiAgICAgIHJldHVybiBwcm94aW1pdHkgPyAxLjAgOiBhY2N1cmFjeTtcbiAgICB9XG4gICAgcmV0dXJuIGFjY3VyYWN5ICsgKHByb3hpbWl0eSAvIGRtcC5NYXRjaF9EaXN0YW5jZSk7XG4gIH1cblxuICAvLyBIaWdoZXN0IHNjb3JlIGJleW9uZCB3aGljaCB3ZSBnaXZlIHVwLlxuICB2YXIgc2NvcmVfdGhyZXNob2xkID0gdGhpcy5NYXRjaF9UaHJlc2hvbGQ7XG4gIC8vIElzIHRoZXJlIGEgbmVhcmJ5IGV4YWN0IG1hdGNoPyAoc3BlZWR1cClcbiAgdmFyIGJlc3RfbG9jID0gdGV4dC5pbmRleE9mKHBhdHRlcm4sIGxvYyk7XG4gIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgIHNjb3JlX3RocmVzaG9sZCA9IE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICAvLyBXaGF0IGFib3V0IGluIHRoZSBvdGhlciBkaXJlY3Rpb24/IChzcGVlZHVwKVxuICAgIGJlc3RfbG9jID0gdGV4dC5sYXN0SW5kZXhPZihwYXR0ZXJuLCBsb2MgKyBwYXR0ZXJuLmxlbmd0aCk7XG4gICAgaWYgKGJlc3RfbG9jICE9IC0xKSB7XG4gICAgICBzY29yZV90aHJlc2hvbGQgPVxuICAgICAgICAgIE1hdGgubWluKG1hdGNoX2JpdGFwU2NvcmVfKDAsIGJlc3RfbG9jKSwgc2NvcmVfdGhyZXNob2xkKTtcbiAgICB9XG4gIH1cblxuICAvLyBJbml0aWFsaXNlIHRoZSBiaXQgYXJyYXlzLlxuICB2YXIgbWF0Y2htYXNrID0gMSA8PCAocGF0dGVybi5sZW5ndGggLSAxKTtcbiAgYmVzdF9sb2MgPSAtMTtcblxuICB2YXIgYmluX21pbiwgYmluX21pZDtcbiAgdmFyIGJpbl9tYXggPSBwYXR0ZXJuLmxlbmd0aCArIHRleHQubGVuZ3RoO1xuICB2YXIgbGFzdF9yZDtcbiAgZm9yICh2YXIgZCA9IDA7IGQgPCBwYXR0ZXJuLmxlbmd0aDsgZCsrKSB7XG4gICAgLy8gU2NhbiBmb3IgdGhlIGJlc3QgbWF0Y2g7IGVhY2ggaXRlcmF0aW9uIGFsbG93cyBmb3Igb25lIG1vcmUgZXJyb3IuXG4gICAgLy8gUnVuIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgaG93IGZhciBmcm9tICdsb2MnIHdlIGNhbiBzdHJheSBhdCB0aGlzXG4gICAgLy8gZXJyb3IgbGV2ZWwuXG4gICAgYmluX21pbiA9IDA7XG4gICAgYmluX21pZCA9IGJpbl9tYXg7XG4gICAgd2hpbGUgKGJpbl9taW4gPCBiaW5fbWlkKSB7XG4gICAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCwgbG9jICsgYmluX21pZCkgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgIGJpbl9taW4gPSBiaW5fbWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYmluX21heCA9IGJpbl9taWQ7XG4gICAgICB9XG4gICAgICBiaW5fbWlkID0gTWF0aC5mbG9vcigoYmluX21heCAtIGJpbl9taW4pIC8gMiArIGJpbl9taW4pO1xuICAgIH1cbiAgICAvLyBVc2UgdGhlIHJlc3VsdCBmcm9tIHRoaXMgaXRlcmF0aW9uIGFzIHRoZSBtYXhpbXVtIGZvciB0aGUgbmV4dC5cbiAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgxLCBsb2MgLSBiaW5fbWlkICsgMSk7XG4gICAgdmFyIGZpbmlzaCA9IE1hdGgubWluKGxvYyArIGJpbl9taWQsIHRleHQubGVuZ3RoKSArIHBhdHRlcm4ubGVuZ3RoO1xuXG4gICAgdmFyIHJkID0gQXJyYXkoZmluaXNoICsgMik7XG4gICAgcmRbZmluaXNoICsgMV0gPSAoMSA8PCBkKSAtIDE7XG4gICAgZm9yICh2YXIgaiA9IGZpbmlzaDsgaiA+PSBzdGFydDsgai0tKSB7XG4gICAgICAvLyBUaGUgYWxwaGFiZXQgKHMpIGlzIGEgc3BhcnNlIGhhc2gsIHNvIHRoZSBmb2xsb3dpbmcgbGluZSBnZW5lcmF0ZXNcbiAgICAgIC8vIHdhcm5pbmdzLlxuICAgICAgdmFyIGNoYXJNYXRjaCA9IHNbdGV4dC5jaGFyQXQoaiAtIDEpXTtcbiAgICAgIGlmIChkID09PSAwKSB7ICAvLyBGaXJzdCBwYXNzOiBleGFjdCBtYXRjaC5cbiAgICAgICAgcmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoO1xuICAgICAgfSBlbHNlIHsgIC8vIFN1YnNlcXVlbnQgcGFzc2VzOiBmdXp6eSBtYXRjaC5cbiAgICAgICAgcmRbal0gPSAoKHJkW2ogKyAxXSA8PCAxKSB8IDEpICYgY2hhck1hdGNoIHxcbiAgICAgICAgICAgICAgICAoKChsYXN0X3JkW2ogKyAxXSB8IGxhc3RfcmRbal0pIDw8IDEpIHwgMSkgfFxuICAgICAgICAgICAgICAgIGxhc3RfcmRbaiArIDFdO1xuICAgICAgfVxuICAgICAgaWYgKHJkW2pdICYgbWF0Y2htYXNrKSB7XG4gICAgICAgIHZhciBzY29yZSA9IG1hdGNoX2JpdGFwU2NvcmVfKGQsIGogLSAxKTtcbiAgICAgICAgLy8gVGhpcyBtYXRjaCB3aWxsIGFsbW9zdCBjZXJ0YWlubHkgYmUgYmV0dGVyIHRoYW4gYW55IGV4aXN0aW5nIG1hdGNoLlxuICAgICAgICAvLyBCdXQgY2hlY2sgYW55d2F5LlxuICAgICAgICBpZiAoc2NvcmUgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgLy8gVG9sZCB5b3Ugc28uXG4gICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gc2NvcmU7XG4gICAgICAgICAgYmVzdF9sb2MgPSBqIC0gMTtcbiAgICAgICAgICBpZiAoYmVzdF9sb2MgPiBsb2MpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gcGFzc2luZyBsb2MsIGRvbid0IGV4Y2VlZCBvdXIgY3VycmVudCBkaXN0YW5jZSBmcm9tIGxvYy5cbiAgICAgICAgICAgIHN0YXJ0ID0gTWF0aC5tYXgoMSwgMiAqIGxvYyAtIGJlc3RfbG9jKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQWxyZWFkeSBwYXNzZWQgbG9jLCBkb3duaGlsbCBmcm9tIGhlcmUgb24gaW4uXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgLy8gTm8gaG9wZSBmb3IgYSAoYmV0dGVyKSBtYXRjaCBhdCBncmVhdGVyIGVycm9yIGxldmVscy5cbiAgICBpZiAobWF0Y2hfYml0YXBTY29yZV8oZCArIDEsIGxvYykgPiBzY29yZV90aHJlc2hvbGQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsYXN0X3JkID0gcmQ7XG4gIH1cbiAgcmV0dXJuIGJlc3RfbG9jO1xufTtcblxuXG4vKipcbiAqIEluaXRpYWxpc2UgdGhlIGFscGhhYmV0IGZvciB0aGUgQml0YXAgYWxnb3JpdGhtLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdHRlcm4gVGhlIHRleHQgdG8gZW5jb2RlLlxuICogQHJldHVybiB7IU9iamVjdH0gSGFzaCBvZiBjaGFyYWN0ZXIgbG9jYXRpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUubWF0Y2hfYWxwaGFiZXRfID0gZnVuY3Rpb24ocGF0dGVybikge1xuICB2YXIgcyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICBzW3BhdHRlcm4uY2hhckF0KGkpXSA9IDA7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgc1twYXR0ZXJuLmNoYXJBdChpKV0gfD0gMSA8PCAocGF0dGVybi5sZW5ndGggLSBpIC0gMSk7XG4gIH1cbiAgcmV0dXJuIHM7XG59O1xuXG5cbi8vICBQQVRDSCBGVU5DVElPTlNcblxuXG4vKipcbiAqIEluY3JlYXNlIHRoZSBjb250ZXh0IHVudGlsIGl0IGlzIHVuaXF1ZSxcbiAqIGJ1dCBkb24ndCBsZXQgdGhlIHBhdHRlcm4gZXhwYW5kIGJleW9uZCBNYXRjaF9NYXhCaXRzLlxuICogQHBhcmFtIHshZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmp9IHBhdGNoIFRoZSBwYXRjaCB0byBncm93LlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHQgU291cmNlIHRleHQuXG4gKiBAcHJpdmF0ZVxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5wYXRjaF9hZGRDb250ZXh0XyA9IGZ1bmN0aW9uKHBhdGNoLCB0ZXh0KSB7XG4gIGlmICh0ZXh0Lmxlbmd0aCA9PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gdGV4dC5zdWJzdHJpbmcocGF0Y2guc3RhcnQyLCBwYXRjaC5zdGFydDIgKyBwYXRjaC5sZW5ndGgxKTtcbiAgdmFyIHBhZGRpbmcgPSAwO1xuXG4gIC8vIExvb2sgZm9yIHRoZSBmaXJzdCBhbmQgbGFzdCBtYXRjaGVzIG9mIHBhdHRlcm4gaW4gdGV4dC4gIElmIHR3byBkaWZmZXJlbnRcbiAgLy8gbWF0Y2hlcyBhcmUgZm91bmQsIGluY3JlYXNlIHRoZSBwYXR0ZXJuIGxlbmd0aC5cbiAgd2hpbGUgKHRleHQuaW5kZXhPZihwYXR0ZXJuKSAhPSB0ZXh0Lmxhc3RJbmRleE9mKHBhdHRlcm4pICYmXG4gICAgICAgICBwYXR0ZXJuLmxlbmd0aCA8IHRoaXMuTWF0Y2hfTWF4Qml0cyAtIHRoaXMuUGF0Y2hfTWFyZ2luIC1cbiAgICAgICAgIHRoaXMuUGF0Y2hfTWFyZ2luKSB7XG4gICAgcGFkZGluZyArPSB0aGlzLlBhdGNoX01hcmdpbjtcbiAgICBwYXR0ZXJuID0gdGV4dC5zdWJzdHJpbmcocGF0Y2guc3RhcnQyIC0gcGFkZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2guc3RhcnQyICsgcGF0Y2gubGVuZ3RoMSArIHBhZGRpbmcpO1xuICB9XG4gIC8vIEFkZCBvbmUgY2h1bmsgZm9yIGdvb2QgbHVjay5cbiAgcGFkZGluZyArPSB0aGlzLlBhdGNoX01hcmdpbjtcblxuICAvLyBBZGQgdGhlIHByZWZpeC5cbiAgdmFyIHByZWZpeCA9IHRleHQuc3Vic3RyaW5nKHBhdGNoLnN0YXJ0MiAtIHBhZGRpbmcsIHBhdGNoLnN0YXJ0Mik7XG4gIGlmIChwcmVmaXgpIHtcbiAgICBwYXRjaC5kaWZmcy51bnNoaWZ0KFtESUZGX0VRVUFMLCBwcmVmaXhdKTtcbiAgfVxuICAvLyBBZGQgdGhlIHN1ZmZpeC5cbiAgdmFyIHN1ZmZpeCA9IHRleHQuc3Vic3RyaW5nKHBhdGNoLnN0YXJ0MiArIHBhdGNoLmxlbmd0aDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRjaC5zdGFydDIgKyBwYXRjaC5sZW5ndGgxICsgcGFkZGluZyk7XG4gIGlmIChzdWZmaXgpIHtcbiAgICBwYXRjaC5kaWZmcy5wdXNoKFtESUZGX0VRVUFMLCBzdWZmaXhdKTtcbiAgfVxuXG4gIC8vIFJvbGwgYmFjayB0aGUgc3RhcnQgcG9pbnRzLlxuICBwYXRjaC5zdGFydDEgLT0gcHJlZml4Lmxlbmd0aDtcbiAgcGF0Y2guc3RhcnQyIC09IHByZWZpeC5sZW5ndGg7XG4gIC8vIEV4dGVuZCB0aGUgbGVuZ3Rocy5cbiAgcGF0Y2gubGVuZ3RoMSArPSBwcmVmaXgubGVuZ3RoICsgc3VmZml4Lmxlbmd0aDtcbiAgcGF0Y2gubGVuZ3RoMiArPSBwcmVmaXgubGVuZ3RoICsgc3VmZml4Lmxlbmd0aDtcbn07XG5cblxuLyoqXG4gKiBDb21wdXRlIGEgbGlzdCBvZiBwYXRjaGVzIHRvIHR1cm4gdGV4dDEgaW50byB0ZXh0Mi5cbiAqIFVzZSBkaWZmcyBpZiBwcm92aWRlZCwgb3RoZXJ3aXNlIGNvbXB1dGUgaXQgb3Vyc2VsdmVzLlxuICogVGhlcmUgYXJlIGZvdXIgd2F5cyB0byBjYWxsIHRoaXMgZnVuY3Rpb24sIGRlcGVuZGluZyBvbiB3aGF0IGRhdGEgaXNcbiAqIGF2YWlsYWJsZSB0byB0aGUgY2FsbGVyOlxuICogTWV0aG9kIDE6XG4gKiBhID0gdGV4dDEsIGIgPSB0ZXh0MlxuICogTWV0aG9kIDI6XG4gKiBhID0gZGlmZnNcbiAqIE1ldGhvZCAzIChvcHRpbWFsKTpcbiAqIGEgPSB0ZXh0MSwgYiA9IGRpZmZzXG4gKiBNZXRob2QgNCAoZGVwcmVjYXRlZCwgdXNlIG1ldGhvZCAzKTpcbiAqIGEgPSB0ZXh0MSwgYiA9IHRleHQyLCBjID0gZGlmZnNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3whQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBhIHRleHQxIChtZXRob2RzIDEsMyw0KSBvclxuICogQXJyYXkgb2YgZGlmZiB0dXBsZXMgZm9yIHRleHQxIHRvIHRleHQyIChtZXRob2QgMikuXG4gKiBAcGFyYW0ge3N0cmluZ3whQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLkRpZmY+fSBvcHRfYiB0ZXh0MiAobWV0aG9kcyAxLDQpIG9yXG4gKiBBcnJheSBvZiBkaWZmIHR1cGxlcyBmb3IgdGV4dDEgdG8gdGV4dDIgKG1ldGhvZCAzKSBvciB1bmRlZmluZWQgKG1ldGhvZCAyKS5cbiAqIEBwYXJhbSB7c3RyaW5nfCFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59IG9wdF9jIEFycmF5IG9mIGRpZmYgdHVwbGVzXG4gKiBmb3IgdGV4dDEgdG8gdGV4dDIgKG1ldGhvZCA0KSBvciB1bmRlZmluZWQgKG1ldGhvZHMgMSwyLDMpLlxuICogQHJldHVybiB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmo+fSBBcnJheSBvZiBwYXRjaCBvYmplY3RzLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5wYXRjaF9tYWtlID0gZnVuY3Rpb24oYSwgb3B0X2IsIG9wdF9jKSB7XG4gIHZhciB0ZXh0MSwgZGlmZnM7XG4gIGlmICh0eXBlb2YgYSA9PSAnc3RyaW5nJyAmJiB0eXBlb2Ygb3B0X2IgPT0gJ3N0cmluZycgJiZcbiAgICAgIHR5cGVvZiBvcHRfYyA9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIE1ldGhvZCAxOiB0ZXh0MSwgdGV4dDJcbiAgICAvLyBDb21wdXRlIGRpZmZzIGZyb20gdGV4dDEgYW5kIHRleHQyLlxuICAgIHRleHQxID0gLyoqIEB0eXBlIHtzdHJpbmd9ICovKGEpO1xuICAgIGRpZmZzID0gdGhpcy5kaWZmX21haW4odGV4dDEsIC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhvcHRfYiksIHRydWUpO1xuICAgIGlmIChkaWZmcy5sZW5ndGggPiAyKSB7XG4gICAgICB0aGlzLmRpZmZfY2xlYW51cFNlbWFudGljKGRpZmZzKTtcbiAgICAgIHRoaXMuZGlmZl9jbGVhbnVwRWZmaWNpZW5jeShkaWZmcyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGEgJiYgdHlwZW9mIGEgPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9wdF9iID09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2Ygb3B0X2MgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBNZXRob2QgMjogZGlmZnNcbiAgICAvLyBDb21wdXRlIHRleHQxIGZyb20gZGlmZnMuXG4gICAgZGlmZnMgPSAvKiogQHR5cGUgeyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59ICovKGEpO1xuICAgIHRleHQxID0gdGhpcy5kaWZmX3RleHQxKGRpZmZzKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYSA9PSAnc3RyaW5nJyAmJiBvcHRfYiAmJiB0eXBlb2Ygb3B0X2IgPT0gJ29iamVjdCcgJiZcbiAgICAgIHR5cGVvZiBvcHRfYyA9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIE1ldGhvZCAzOiB0ZXh0MSwgZGlmZnNcbiAgICB0ZXh0MSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhhKTtcbiAgICBkaWZmcyA9IC8qKiBAdHlwZSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gKi8ob3B0X2IpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhID09ICdzdHJpbmcnICYmIHR5cGVvZiBvcHRfYiA9PSAnc3RyaW5nJyAmJlxuICAgICAgb3B0X2MgJiYgdHlwZW9mIG9wdF9jID09ICdvYmplY3QnKSB7XG4gICAgLy8gTWV0aG9kIDQ6IHRleHQxLCB0ZXh0MiwgZGlmZnNcbiAgICAvLyB0ZXh0MiBpcyBub3QgdXNlZC5cbiAgICB0ZXh0MSA9IC8qKiBAdHlwZSB7c3RyaW5nfSAqLyhhKTtcbiAgICBkaWZmcyA9IC8qKiBAdHlwZSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5EaWZmPn0gKi8ob3B0X2MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBjYWxsIGZvcm1hdCB0byBwYXRjaF9tYWtlLicpO1xuICB9XG5cbiAgaWYgKGRpZmZzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBbXTsgIC8vIEdldCByaWQgb2YgdGhlIG51bGwgY2FzZS5cbiAgfVxuICB2YXIgcGF0Y2hlcyA9IFtdO1xuICB2YXIgcGF0Y2ggPSBuZXcgZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmooKTtcbiAgdmFyIHBhdGNoRGlmZkxlbmd0aCA9IDA7ICAvLyBLZWVwaW5nIG91ciBvd24gbGVuZ3RoIHZhciBpcyBmYXN0ZXIgaW4gSlMuXG4gIHZhciBjaGFyX2NvdW50MSA9IDA7ICAvLyBOdW1iZXIgb2YgY2hhcmFjdGVycyBpbnRvIHRoZSB0ZXh0MSBzdHJpbmcuXG4gIHZhciBjaGFyX2NvdW50MiA9IDA7ICAvLyBOdW1iZXIgb2YgY2hhcmFjdGVycyBpbnRvIHRoZSB0ZXh0MiBzdHJpbmcuXG4gIC8vIFN0YXJ0IHdpdGggdGV4dDEgKHByZXBhdGNoX3RleHQpIGFuZCBhcHBseSB0aGUgZGlmZnMgdW50aWwgd2UgYXJyaXZlIGF0XG4gIC8vIHRleHQyIChwb3N0cGF0Y2hfdGV4dCkuICBXZSByZWNyZWF0ZSB0aGUgcGF0Y2hlcyBvbmUgYnkgb25lIHRvIGRldGVybWluZVxuICAvLyBjb250ZXh0IGluZm8uXG4gIHZhciBwcmVwYXRjaF90ZXh0ID0gdGV4dDE7XG4gIHZhciBwb3N0cGF0Y2hfdGV4dCA9IHRleHQxO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IGRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgdmFyIGRpZmZfdHlwZSA9IGRpZmZzW3hdWzBdO1xuICAgIHZhciBkaWZmX3RleHQgPSBkaWZmc1t4XVsxXTtcblxuICAgIGlmICghcGF0Y2hEaWZmTGVuZ3RoICYmIGRpZmZfdHlwZSAhPT0gRElGRl9FUVVBTCkge1xuICAgICAgLy8gQSBuZXcgcGF0Y2ggc3RhcnRzIGhlcmUuXG4gICAgICBwYXRjaC5zdGFydDEgPSBjaGFyX2NvdW50MTtcbiAgICAgIHBhdGNoLnN0YXJ0MiA9IGNoYXJfY291bnQyO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGlmZl90eXBlKSB7XG4gICAgICBjYXNlIERJRkZfSU5TRVJUOlxuICAgICAgICBwYXRjaC5kaWZmc1twYXRjaERpZmZMZW5ndGgrK10gPSBkaWZmc1t4XTtcbiAgICAgICAgcGF0Y2gubGVuZ3RoMiArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICBwb3N0cGF0Y2hfdGV4dCA9IHBvc3RwYXRjaF90ZXh0LnN1YnN0cmluZygwLCBjaGFyX2NvdW50MikgKyBkaWZmX3RleHQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgIHBvc3RwYXRjaF90ZXh0LnN1YnN0cmluZyhjaGFyX2NvdW50Mik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBESUZGX0RFTEVURTpcbiAgICAgICAgcGF0Y2gubGVuZ3RoMSArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICBwYXRjaC5kaWZmc1twYXRjaERpZmZMZW5ndGgrK10gPSBkaWZmc1t4XTtcbiAgICAgICAgcG9zdHBhdGNoX3RleHQgPSBwb3N0cGF0Y2hfdGV4dC5zdWJzdHJpbmcoMCwgY2hhcl9jb3VudDIpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICBwb3N0cGF0Y2hfdGV4dC5zdWJzdHJpbmcoY2hhcl9jb3VudDIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaWZmX3RleHQubGVuZ3RoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgIGlmIChkaWZmX3RleHQubGVuZ3RoIDw9IDIgKiB0aGlzLlBhdGNoX01hcmdpbiAmJlxuICAgICAgICAgICAgcGF0Y2hEaWZmTGVuZ3RoICYmIGRpZmZzLmxlbmd0aCAhPSB4ICsgMSkge1xuICAgICAgICAgIC8vIFNtYWxsIGVxdWFsaXR5IGluc2lkZSBhIHBhdGNoLlxuICAgICAgICAgIHBhdGNoLmRpZmZzW3BhdGNoRGlmZkxlbmd0aCsrXSA9IGRpZmZzW3hdO1xuICAgICAgICAgIHBhdGNoLmxlbmd0aDEgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICAgICAgICBwYXRjaC5sZW5ndGgyICs9IGRpZmZfdGV4dC5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlmZl90ZXh0Lmxlbmd0aCA+PSAyICogdGhpcy5QYXRjaF9NYXJnaW4pIHtcbiAgICAgICAgICAvLyBUaW1lIGZvciBhIG5ldyBwYXRjaC5cbiAgICAgICAgICBpZiAocGF0Y2hEaWZmTGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnBhdGNoX2FkZENvbnRleHRfKHBhdGNoLCBwcmVwYXRjaF90ZXh0KTtcbiAgICAgICAgICAgIHBhdGNoZXMucHVzaChwYXRjaCk7XG4gICAgICAgICAgICBwYXRjaCA9IG5ldyBkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaigpO1xuICAgICAgICAgICAgcGF0Y2hEaWZmTGVuZ3RoID0gMDtcbiAgICAgICAgICAgIC8vIFVubGlrZSBVbmlkaWZmLCBvdXIgcGF0Y2ggbGlzdHMgaGF2ZSBhIHJvbGxpbmcgY29udGV4dC5cbiAgICAgICAgICAgIC8vIGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtZGlmZi1tYXRjaC1wYXRjaC93aWtpL1VuaWRpZmZcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBwcmVwYXRjaCB0ZXh0ICYgcG9zIHRvIHJlZmxlY3QgdGhlIGFwcGxpY2F0aW9uIG9mIHRoZVxuICAgICAgICAgICAgLy8ganVzdCBjb21wbGV0ZWQgcGF0Y2guXG4gICAgICAgICAgICBwcmVwYXRjaF90ZXh0ID0gcG9zdHBhdGNoX3RleHQ7XG4gICAgICAgICAgICBjaGFyX2NvdW50MSA9IGNoYXJfY291bnQyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdGhlIGN1cnJlbnQgY2hhcmFjdGVyIGNvdW50LlxuICAgIGlmIChkaWZmX3R5cGUgIT09IERJRkZfSU5TRVJUKSB7XG4gICAgICBjaGFyX2NvdW50MSArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAoZGlmZl90eXBlICE9PSBESUZGX0RFTEVURSkge1xuICAgICAgY2hhcl9jb3VudDIgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICB9XG4gIH1cbiAgLy8gUGljayB1cCB0aGUgbGVmdG92ZXIgcGF0Y2ggaWYgbm90IGVtcHR5LlxuICBpZiAocGF0Y2hEaWZmTGVuZ3RoKSB7XG4gICAgdGhpcy5wYXRjaF9hZGRDb250ZXh0XyhwYXRjaCwgcHJlcGF0Y2hfdGV4dCk7XG4gICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcbiAgfVxuXG4gIHJldHVybiBwYXRjaGVzO1xufTtcblxuXG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIHBhdGNoZXMsIHJldHVybiBhbm90aGVyIGFycmF5IHRoYXQgaXMgaWRlbnRpY2FsLlxuICogQHBhcmFtIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaj59IHBhdGNoZXMgQXJyYXkgb2YgcGF0Y2ggb2JqZWN0cy5cbiAqIEByZXR1cm4geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2gucGF0Y2hfb2JqPn0gQXJyYXkgb2YgcGF0Y2ggb2JqZWN0cy5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUucGF0Y2hfZGVlcENvcHkgPSBmdW5jdGlvbihwYXRjaGVzKSB7XG4gIC8vIE1ha2luZyBkZWVwIGNvcGllcyBpcyBoYXJkIGluIEphdmFTY3JpcHQuXG4gIHZhciBwYXRjaGVzQ29weSA9IFtdO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IHBhdGNoZXMubGVuZ3RoOyB4KyspIHtcbiAgICB2YXIgcGF0Y2ggPSBwYXRjaGVzW3hdO1xuICAgIHZhciBwYXRjaENvcHkgPSBuZXcgZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmooKTtcbiAgICBwYXRjaENvcHkuZGlmZnMgPSBbXTtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IHBhdGNoLmRpZmZzLmxlbmd0aDsgeSsrKSB7XG4gICAgICBwYXRjaENvcHkuZGlmZnNbeV0gPSBwYXRjaC5kaWZmc1t5XS5zbGljZSgpO1xuICAgIH1cbiAgICBwYXRjaENvcHkuc3RhcnQxID0gcGF0Y2guc3RhcnQxO1xuICAgIHBhdGNoQ29weS5zdGFydDIgPSBwYXRjaC5zdGFydDI7XG4gICAgcGF0Y2hDb3B5Lmxlbmd0aDEgPSBwYXRjaC5sZW5ndGgxO1xuICAgIHBhdGNoQ29weS5sZW5ndGgyID0gcGF0Y2gubGVuZ3RoMjtcbiAgICBwYXRjaGVzQ29weVt4XSA9IHBhdGNoQ29weTtcbiAgfVxuICByZXR1cm4gcGF0Y2hlc0NvcHk7XG59O1xuXG5cbi8qKlxuICogTWVyZ2UgYSBzZXQgb2YgcGF0Y2hlcyBvbnRvIHRoZSB0ZXh0LiAgUmV0dXJuIGEgcGF0Y2hlZCB0ZXh0LCBhcyB3ZWxsXG4gKiBhcyBhIGxpc3Qgb2YgdHJ1ZS9mYWxzZSB2YWx1ZXMgaW5kaWNhdGluZyB3aGljaCBwYXRjaGVzIHdlcmUgYXBwbGllZC5cbiAqIEBwYXJhbSB7IUFycmF5LjwhZGlmZl9tYXRjaF9wYXRjaC5wYXRjaF9vYmo+fSBwYXRjaGVzIEFycmF5IG9mIHBhdGNoIG9iamVjdHMuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBPbGQgdGV4dC5cbiAqIEByZXR1cm4geyFBcnJheS48c3RyaW5nfCFBcnJheS48Ym9vbGVhbj4+fSBUd28gZWxlbWVudCBBcnJheSwgY29udGFpbmluZyB0aGVcbiAqICAgICAgbmV3IHRleHQgYW5kIGFuIGFycmF5IG9mIGJvb2xlYW4gdmFsdWVzLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5wYXRjaF9hcHBseSA9IGZ1bmN0aW9uKHBhdGNoZXMsIHRleHQpIHtcbiAgaWYgKHBhdGNoZXMubGVuZ3RoID09IDApIHtcbiAgICByZXR1cm4gW3RleHQsIFtdXTtcbiAgfVxuXG4gIC8vIERlZXAgY29weSB0aGUgcGF0Y2hlcyBzbyB0aGF0IG5vIGNoYW5nZXMgYXJlIG1hZGUgdG8gb3JpZ2luYWxzLlxuICBwYXRjaGVzID0gdGhpcy5wYXRjaF9kZWVwQ29weShwYXRjaGVzKTtcblxuICB2YXIgbnVsbFBhZGRpbmcgPSB0aGlzLnBhdGNoX2FkZFBhZGRpbmcocGF0Y2hlcyk7XG4gIHRleHQgPSBudWxsUGFkZGluZyArIHRleHQgKyBudWxsUGFkZGluZztcblxuICB0aGlzLnBhdGNoX3NwbGl0TWF4KHBhdGNoZXMpO1xuICAvLyBkZWx0YSBrZWVwcyB0cmFjayBvZiB0aGUgb2Zmc2V0IGJldHdlZW4gdGhlIGV4cGVjdGVkIGFuZCBhY3R1YWwgbG9jYXRpb25cbiAgLy8gb2YgdGhlIHByZXZpb3VzIHBhdGNoLiAgSWYgdGhlcmUgYXJlIHBhdGNoZXMgZXhwZWN0ZWQgYXQgcG9zaXRpb25zIDEwIGFuZFxuICAvLyAyMCwgYnV0IHRoZSBmaXJzdCBwYXRjaCB3YXMgZm91bmQgYXQgMTIsIGRlbHRhIGlzIDIgYW5kIHRoZSBzZWNvbmQgcGF0Y2hcbiAgLy8gaGFzIGFuIGVmZmVjdGl2ZSBleHBlY3RlZCBwb3NpdGlvbiBvZiAyMi5cbiAgdmFyIGRlbHRhID0gMDtcbiAgdmFyIHJlc3VsdHMgPSBbXTtcbiAgZm9yICh2YXIgeCA9IDA7IHggPCBwYXRjaGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgdmFyIGV4cGVjdGVkX2xvYyA9IHBhdGNoZXNbeF0uc3RhcnQyICsgZGVsdGE7XG4gICAgdmFyIHRleHQxID0gdGhpcy5kaWZmX3RleHQxKHBhdGNoZXNbeF0uZGlmZnMpO1xuICAgIHZhciBzdGFydF9sb2M7XG4gICAgdmFyIGVuZF9sb2MgPSAtMTtcbiAgICBpZiAodGV4dDEubGVuZ3RoID4gdGhpcy5NYXRjaF9NYXhCaXRzKSB7XG4gICAgICAvLyBwYXRjaF9zcGxpdE1heCB3aWxsIG9ubHkgcHJvdmlkZSBhbiBvdmVyc2l6ZWQgcGF0dGVybiBpbiB0aGUgY2FzZSBvZlxuICAgICAgLy8gYSBtb25zdGVyIGRlbGV0ZS5cbiAgICAgIHN0YXJ0X2xvYyA9IHRoaXMubWF0Y2hfbWFpbih0ZXh0LCB0ZXh0MS5zdWJzdHJpbmcoMCwgdGhpcy5NYXRjaF9NYXhCaXRzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZF9sb2MpO1xuICAgICAgaWYgKHN0YXJ0X2xvYyAhPSAtMSkge1xuICAgICAgICBlbmRfbG9jID0gdGhpcy5tYXRjaF9tYWluKHRleHQsXG4gICAgICAgICAgICB0ZXh0MS5zdWJzdHJpbmcodGV4dDEubGVuZ3RoIC0gdGhpcy5NYXRjaF9NYXhCaXRzKSxcbiAgICAgICAgICAgIGV4cGVjdGVkX2xvYyArIHRleHQxLmxlbmd0aCAtIHRoaXMuTWF0Y2hfTWF4Qml0cyk7XG4gICAgICAgIGlmIChlbmRfbG9jID09IC0xIHx8IHN0YXJ0X2xvYyA+PSBlbmRfbG9jKSB7XG4gICAgICAgICAgLy8gQ2FuJ3QgZmluZCB2YWxpZCB0cmFpbGluZyBjb250ZXh0LiAgRHJvcCB0aGlzIHBhdGNoLlxuICAgICAgICAgIHN0YXJ0X2xvYyA9IC0xO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXJ0X2xvYyA9IHRoaXMubWF0Y2hfbWFpbih0ZXh0LCB0ZXh0MSwgZXhwZWN0ZWRfbG9jKTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0X2xvYyA9PSAtMSkge1xuICAgICAgLy8gTm8gbWF0Y2ggZm91bmQuICA6KFxuICAgICAgcmVzdWx0c1t4XSA9IGZhbHNlO1xuICAgICAgLy8gU3VidHJhY3QgdGhlIGRlbHRhIGZvciB0aGlzIGZhaWxlZCBwYXRjaCBmcm9tIHN1YnNlcXVlbnQgcGF0Y2hlcy5cbiAgICAgIGRlbHRhIC09IHBhdGNoZXNbeF0ubGVuZ3RoMiAtIHBhdGNoZXNbeF0ubGVuZ3RoMTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRm91bmQgYSBtYXRjaC4gIDopXG4gICAgICByZXN1bHRzW3hdID0gdHJ1ZTtcbiAgICAgIGRlbHRhID0gc3RhcnRfbG9jIC0gZXhwZWN0ZWRfbG9jO1xuICAgICAgdmFyIHRleHQyO1xuICAgICAgaWYgKGVuZF9sb2MgPT0gLTEpIHtcbiAgICAgICAgdGV4dDIgPSB0ZXh0LnN1YnN0cmluZyhzdGFydF9sb2MsIHN0YXJ0X2xvYyArIHRleHQxLmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZXh0MiA9IHRleHQuc3Vic3RyaW5nKHN0YXJ0X2xvYywgZW5kX2xvYyArIHRoaXMuTWF0Y2hfTWF4Qml0cyk7XG4gICAgICB9XG4gICAgICBpZiAodGV4dDEgPT0gdGV4dDIpIHtcbiAgICAgICAgLy8gUGVyZmVjdCBtYXRjaCwganVzdCBzaG92ZSB0aGUgcmVwbGFjZW1lbnQgdGV4dCBpbi5cbiAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0X2xvYykgK1xuICAgICAgICAgICAgICAgdGhpcy5kaWZmX3RleHQyKHBhdGNoZXNbeF0uZGlmZnMpICtcbiAgICAgICAgICAgICAgIHRleHQuc3Vic3RyaW5nKHN0YXJ0X2xvYyArIHRleHQxLmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJbXBlcmZlY3QgbWF0Y2guICBSdW4gYSBkaWZmIHRvIGdldCBhIGZyYW1ld29yayBvZiBlcXVpdmFsZW50XG4gICAgICAgIC8vIGluZGljZXMuXG4gICAgICAgIHZhciBkaWZmcyA9IHRoaXMuZGlmZl9tYWluKHRleHQxLCB0ZXh0MiwgZmFsc2UpO1xuICAgICAgICBpZiAodGV4dDEubGVuZ3RoID4gdGhpcy5NYXRjaF9NYXhCaXRzICYmXG4gICAgICAgICAgICB0aGlzLmRpZmZfbGV2ZW5zaHRlaW4oZGlmZnMpIC8gdGV4dDEubGVuZ3RoID5cbiAgICAgICAgICAgIHRoaXMuUGF0Y2hfRGVsZXRlVGhyZXNob2xkKSB7XG4gICAgICAgICAgLy8gVGhlIGVuZCBwb2ludHMgbWF0Y2gsIGJ1dCB0aGUgY29udGVudCBpcyB1bmFjY2VwdGFibHkgYmFkLlxuICAgICAgICAgIHJlc3VsdHNbeF0gPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmRpZmZfY2xlYW51cFNlbWFudGljTG9zc2xlc3MoZGlmZnMpO1xuICAgICAgICAgIHZhciBpbmRleDEgPSAwO1xuICAgICAgICAgIHZhciBpbmRleDI7XG4gICAgICAgICAgZm9yICh2YXIgeSA9IDA7IHkgPCBwYXRjaGVzW3hdLmRpZmZzLmxlbmd0aDsgeSsrKSB7XG4gICAgICAgICAgICB2YXIgbW9kID0gcGF0Y2hlc1t4XS5kaWZmc1t5XTtcbiAgICAgICAgICAgIGlmIChtb2RbMF0gIT09IERJRkZfRVFVQUwpIHtcbiAgICAgICAgICAgICAgaW5kZXgyID0gdGhpcy5kaWZmX3hJbmRleChkaWZmcywgaW5kZXgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb2RbMF0gPT09IERJRkZfSU5TRVJUKSB7ICAvLyBJbnNlcnRpb25cbiAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0X2xvYyArIGluZGV4MikgKyBtb2RbMV0gK1xuICAgICAgICAgICAgICAgICAgICAgdGV4dC5zdWJzdHJpbmcoc3RhcnRfbG9jICsgaW5kZXgyKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kWzBdID09PSBESUZGX0RFTEVURSkgeyAgLy8gRGVsZXRpb25cbiAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKDAsIHN0YXJ0X2xvYyArIGluZGV4MikgK1xuICAgICAgICAgICAgICAgICAgICAgdGV4dC5zdWJzdHJpbmcoc3RhcnRfbG9jICsgdGhpcy5kaWZmX3hJbmRleChkaWZmcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleDEgKyBtb2RbMV0ubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW9kWzBdICE9PSBESUZGX0RFTEVURSkge1xuICAgICAgICAgICAgICBpbmRleDEgKz0gbW9kWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gU3RyaXAgdGhlIHBhZGRpbmcgb2ZmLlxuICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcobnVsbFBhZGRpbmcubGVuZ3RoLCB0ZXh0Lmxlbmd0aCAtIG51bGxQYWRkaW5nLmxlbmd0aCk7XG4gIHJldHVybiBbdGV4dCwgcmVzdWx0c107XG59O1xuXG5cbi8qKlxuICogQWRkIHNvbWUgcGFkZGluZyBvbiB0ZXh0IHN0YXJ0IGFuZCBlbmQgc28gdGhhdCBlZGdlcyBjYW4gbWF0Y2ggc29tZXRoaW5nLlxuICogSW50ZW5kZWQgdG8gYmUgY2FsbGVkIG9ubHkgZnJvbSB3aXRoaW4gcGF0Y2hfYXBwbHkuXG4gKiBAcGFyYW0geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2gucGF0Y2hfb2JqPn0gcGF0Y2hlcyBBcnJheSBvZiBwYXRjaCBvYmplY3RzLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgcGFkZGluZyBzdHJpbmcgYWRkZWQgdG8gZWFjaCBzaWRlLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnByb3RvdHlwZS5wYXRjaF9hZGRQYWRkaW5nID0gZnVuY3Rpb24ocGF0Y2hlcykge1xuICB2YXIgcGFkZGluZ0xlbmd0aCA9IHRoaXMuUGF0Y2hfTWFyZ2luO1xuICB2YXIgbnVsbFBhZGRpbmcgPSAnJztcbiAgZm9yICh2YXIgeCA9IDE7IHggPD0gcGFkZGluZ0xlbmd0aDsgeCsrKSB7XG4gICAgbnVsbFBhZGRpbmcgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh4KTtcbiAgfVxuXG4gIC8vIEJ1bXAgYWxsIHRoZSBwYXRjaGVzIGZvcndhcmQuXG4gIGZvciAodmFyIHggPSAwOyB4IDwgcGF0Y2hlcy5sZW5ndGg7IHgrKykge1xuICAgIHBhdGNoZXNbeF0uc3RhcnQxICs9IHBhZGRpbmdMZW5ndGg7XG4gICAgcGF0Y2hlc1t4XS5zdGFydDIgKz0gcGFkZGluZ0xlbmd0aDtcbiAgfVxuXG4gIC8vIEFkZCBzb21lIHBhZGRpbmcgb24gc3RhcnQgb2YgZmlyc3QgZGlmZi5cbiAgdmFyIHBhdGNoID0gcGF0Y2hlc1swXTtcbiAgdmFyIGRpZmZzID0gcGF0Y2guZGlmZnM7XG4gIGlmIChkaWZmcy5sZW5ndGggPT0gMCB8fCBkaWZmc1swXVswXSAhPSBESUZGX0VRVUFMKSB7XG4gICAgLy8gQWRkIG51bGxQYWRkaW5nIGVxdWFsaXR5LlxuICAgIGRpZmZzLnVuc2hpZnQoW0RJRkZfRVFVQUwsIG51bGxQYWRkaW5nXSk7XG4gICAgcGF0Y2guc3RhcnQxIC09IHBhZGRpbmdMZW5ndGg7ICAvLyBTaG91bGQgYmUgMC5cbiAgICBwYXRjaC5zdGFydDIgLT0gcGFkZGluZ0xlbmd0aDsgIC8vIFNob3VsZCBiZSAwLlxuICAgIHBhdGNoLmxlbmd0aDEgKz0gcGFkZGluZ0xlbmd0aDtcbiAgICBwYXRjaC5sZW5ndGgyICs9IHBhZGRpbmdMZW5ndGg7XG4gIH0gZWxzZSBpZiAocGFkZGluZ0xlbmd0aCA+IGRpZmZzWzBdWzFdLmxlbmd0aCkge1xuICAgIC8vIEdyb3cgZmlyc3QgZXF1YWxpdHkuXG4gICAgdmFyIGV4dHJhTGVuZ3RoID0gcGFkZGluZ0xlbmd0aCAtIGRpZmZzWzBdWzFdLmxlbmd0aDtcbiAgICBkaWZmc1swXVsxXSA9IG51bGxQYWRkaW5nLnN1YnN0cmluZyhkaWZmc1swXVsxXS5sZW5ndGgpICsgZGlmZnNbMF1bMV07XG4gICAgcGF0Y2guc3RhcnQxIC09IGV4dHJhTGVuZ3RoO1xuICAgIHBhdGNoLnN0YXJ0MiAtPSBleHRyYUxlbmd0aDtcbiAgICBwYXRjaC5sZW5ndGgxICs9IGV4dHJhTGVuZ3RoO1xuICAgIHBhdGNoLmxlbmd0aDIgKz0gZXh0cmFMZW5ndGg7XG4gIH1cblxuICAvLyBBZGQgc29tZSBwYWRkaW5nIG9uIGVuZCBvZiBsYXN0IGRpZmYuXG4gIHBhdGNoID0gcGF0Y2hlc1twYXRjaGVzLmxlbmd0aCAtIDFdO1xuICBkaWZmcyA9IHBhdGNoLmRpZmZzO1xuICBpZiAoZGlmZnMubGVuZ3RoID09IDAgfHwgZGlmZnNbZGlmZnMubGVuZ3RoIC0gMV1bMF0gIT0gRElGRl9FUVVBTCkge1xuICAgIC8vIEFkZCBudWxsUGFkZGluZyBlcXVhbGl0eS5cbiAgICBkaWZmcy5wdXNoKFtESUZGX0VRVUFMLCBudWxsUGFkZGluZ10pO1xuICAgIHBhdGNoLmxlbmd0aDEgKz0gcGFkZGluZ0xlbmd0aDtcbiAgICBwYXRjaC5sZW5ndGgyICs9IHBhZGRpbmdMZW5ndGg7XG4gIH0gZWxzZSBpZiAocGFkZGluZ0xlbmd0aCA+IGRpZmZzW2RpZmZzLmxlbmd0aCAtIDFdWzFdLmxlbmd0aCkge1xuICAgIC8vIEdyb3cgbGFzdCBlcXVhbGl0eS5cbiAgICB2YXIgZXh0cmFMZW5ndGggPSBwYWRkaW5nTGVuZ3RoIC0gZGlmZnNbZGlmZnMubGVuZ3RoIC0gMV1bMV0ubGVuZ3RoO1xuICAgIGRpZmZzW2RpZmZzLmxlbmd0aCAtIDFdWzFdICs9IG51bGxQYWRkaW5nLnN1YnN0cmluZygwLCBleHRyYUxlbmd0aCk7XG4gICAgcGF0Y2gubGVuZ3RoMSArPSBleHRyYUxlbmd0aDtcbiAgICBwYXRjaC5sZW5ndGgyICs9IGV4dHJhTGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIG51bGxQYWRkaW5nO1xufTtcblxuXG4vKipcbiAqIExvb2sgdGhyb3VnaCB0aGUgcGF0Y2hlcyBhbmQgYnJlYWsgdXAgYW55IHdoaWNoIGFyZSBsb25nZXIgdGhhbiB0aGUgbWF4aW11bVxuICogbGltaXQgb2YgdGhlIG1hdGNoIGFsZ29yaXRobS5cbiAqIEludGVuZGVkIHRvIGJlIGNhbGxlZCBvbmx5IGZyb20gd2l0aGluIHBhdGNoX2FwcGx5LlxuICogQHBhcmFtIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaj59IHBhdGNoZXMgQXJyYXkgb2YgcGF0Y2ggb2JqZWN0cy5cbiAqL1xuZGlmZl9tYXRjaF9wYXRjaC5wcm90b3R5cGUucGF0Y2hfc3BsaXRNYXggPSBmdW5jdGlvbihwYXRjaGVzKSB7XG4gIHZhciBwYXRjaF9zaXplID0gdGhpcy5NYXRjaF9NYXhCaXRzO1xuICBmb3IgKHZhciB4ID0gMDsgeCA8IHBhdGNoZXMubGVuZ3RoOyB4KyspIHtcbiAgICBpZiAocGF0Y2hlc1t4XS5sZW5ndGgxID4gcGF0Y2hfc2l6ZSkge1xuICAgICAgdmFyIGJpZ3BhdGNoID0gcGF0Y2hlc1t4XTtcbiAgICAgIC8vIFJlbW92ZSB0aGUgYmlnIG9sZCBwYXRjaC5cbiAgICAgIHBhdGNoZXMuc3BsaWNlKHgtLSwgMSk7XG4gICAgICB2YXIgc3RhcnQxID0gYmlncGF0Y2guc3RhcnQxO1xuICAgICAgdmFyIHN0YXJ0MiA9IGJpZ3BhdGNoLnN0YXJ0MjtcbiAgICAgIHZhciBwcmVjb250ZXh0ID0gJyc7XG4gICAgICB3aGlsZSAoYmlncGF0Y2guZGlmZnMubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIC8vIENyZWF0ZSBvbmUgb2Ygc2V2ZXJhbCBzbWFsbGVyIHBhdGNoZXMuXG4gICAgICAgIHZhciBwYXRjaCA9IG5ldyBkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaigpO1xuICAgICAgICB2YXIgZW1wdHkgPSB0cnVlO1xuICAgICAgICBwYXRjaC5zdGFydDEgPSBzdGFydDEgLSBwcmVjb250ZXh0Lmxlbmd0aDtcbiAgICAgICAgcGF0Y2guc3RhcnQyID0gc3RhcnQyIC0gcHJlY29udGV4dC5sZW5ndGg7XG4gICAgICAgIGlmIChwcmVjb250ZXh0ICE9PSAnJykge1xuICAgICAgICAgIHBhdGNoLmxlbmd0aDEgPSBwYXRjaC5sZW5ndGgyID0gcHJlY29udGV4dC5sZW5ndGg7XG4gICAgICAgICAgcGF0Y2guZGlmZnMucHVzaChbRElGRl9FUVVBTCwgcHJlY29udGV4dF0pO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChiaWdwYXRjaC5kaWZmcy5sZW5ndGggIT09IDAgJiZcbiAgICAgICAgICAgICAgIHBhdGNoLmxlbmd0aDEgPCBwYXRjaF9zaXplIC0gdGhpcy5QYXRjaF9NYXJnaW4pIHtcbiAgICAgICAgICB2YXIgZGlmZl90eXBlID0gYmlncGF0Y2guZGlmZnNbMF1bMF07XG4gICAgICAgICAgdmFyIGRpZmZfdGV4dCA9IGJpZ3BhdGNoLmRpZmZzWzBdWzFdO1xuICAgICAgICAgIGlmIChkaWZmX3R5cGUgPT09IERJRkZfSU5TRVJUKSB7XG4gICAgICAgICAgICAvLyBJbnNlcnRpb25zIGFyZSBoYXJtbGVzcy5cbiAgICAgICAgICAgIHBhdGNoLmxlbmd0aDIgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgIHN0YXJ0MiArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgcGF0Y2guZGlmZnMucHVzaChiaWdwYXRjaC5kaWZmcy5zaGlmdCgpKTtcbiAgICAgICAgICAgIGVtcHR5ID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIGlmIChkaWZmX3R5cGUgPT09IERJRkZfREVMRVRFICYmIHBhdGNoLmRpZmZzLmxlbmd0aCA9PSAxICYmXG4gICAgICAgICAgICAgICAgICAgICBwYXRjaC5kaWZmc1swXVswXSA9PSBESUZGX0VRVUFMICYmXG4gICAgICAgICAgICAgICAgICAgICBkaWZmX3RleHQubGVuZ3RoID4gMiAqIHBhdGNoX3NpemUpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgYSBsYXJnZSBkZWxldGlvbi4gIExldCBpdCBwYXNzIGluIG9uZSBjaHVuay5cbiAgICAgICAgICAgIHBhdGNoLmxlbmd0aDEgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgIHN0YXJ0MSArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgZW1wdHkgPSBmYWxzZTtcbiAgICAgICAgICAgIHBhdGNoLmRpZmZzLnB1c2goW2RpZmZfdHlwZSwgZGlmZl90ZXh0XSk7XG4gICAgICAgICAgICBiaWdwYXRjaC5kaWZmcy5zaGlmdCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBEZWxldGlvbiBvciBlcXVhbGl0eS4gIE9ubHkgdGFrZSBhcyBtdWNoIGFzIHdlIGNhbiBzdG9tYWNoLlxuICAgICAgICAgICAgZGlmZl90ZXh0ID0gZGlmZl90ZXh0LnN1YnN0cmluZygwLFxuICAgICAgICAgICAgICAgIHBhdGNoX3NpemUgLSBwYXRjaC5sZW5ndGgxIC0gdGhpcy5QYXRjaF9NYXJnaW4pO1xuICAgICAgICAgICAgcGF0Y2gubGVuZ3RoMSArPSBkaWZmX3RleHQubGVuZ3RoO1xuICAgICAgICAgICAgc3RhcnQxICs9IGRpZmZfdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoZGlmZl90eXBlID09PSBESUZGX0VRVUFMKSB7XG4gICAgICAgICAgICAgIHBhdGNoLmxlbmd0aDIgKz0gZGlmZl90ZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgc3RhcnQyICs9IGRpZmZfdGV4dC5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0Y2guZGlmZnMucHVzaChbZGlmZl90eXBlLCBkaWZmX3RleHRdKTtcbiAgICAgICAgICAgIGlmIChkaWZmX3RleHQgPT0gYmlncGF0Y2guZGlmZnNbMF1bMV0pIHtcbiAgICAgICAgICAgICAgYmlncGF0Y2guZGlmZnMuc2hpZnQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGJpZ3BhdGNoLmRpZmZzWzBdWzFdID1cbiAgICAgICAgICAgICAgICAgIGJpZ3BhdGNoLmRpZmZzWzBdWzFdLnN1YnN0cmluZyhkaWZmX3RleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ29tcHV0ZSB0aGUgaGVhZCBjb250ZXh0IGZvciB0aGUgbmV4dCBwYXRjaC5cbiAgICAgICAgcHJlY29udGV4dCA9IHRoaXMuZGlmZl90ZXh0MihwYXRjaC5kaWZmcyk7XG4gICAgICAgIHByZWNvbnRleHQgPVxuICAgICAgICAgICAgcHJlY29udGV4dC5zdWJzdHJpbmcocHJlY29udGV4dC5sZW5ndGggLSB0aGlzLlBhdGNoX01hcmdpbik7XG4gICAgICAgIC8vIEFwcGVuZCB0aGUgZW5kIGNvbnRleHQgZm9yIHRoaXMgcGF0Y2guXG4gICAgICAgIHZhciBwb3N0Y29udGV4dCA9IHRoaXMuZGlmZl90ZXh0MShiaWdwYXRjaC5kaWZmcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMCwgdGhpcy5QYXRjaF9NYXJnaW4pO1xuICAgICAgICBpZiAocG9zdGNvbnRleHQgIT09ICcnKSB7XG4gICAgICAgICAgcGF0Y2gubGVuZ3RoMSArPSBwb3N0Y29udGV4dC5sZW5ndGg7XG4gICAgICAgICAgcGF0Y2gubGVuZ3RoMiArPSBwb3N0Y29udGV4dC5sZW5ndGg7XG4gICAgICAgICAgaWYgKHBhdGNoLmRpZmZzLmxlbmd0aCAhPT0gMCAmJlxuICAgICAgICAgICAgICBwYXRjaC5kaWZmc1twYXRjaC5kaWZmcy5sZW5ndGggLSAxXVswXSA9PT0gRElGRl9FUVVBTCkge1xuICAgICAgICAgICAgcGF0Y2guZGlmZnNbcGF0Y2guZGlmZnMubGVuZ3RoIC0gMV1bMV0gKz0gcG9zdGNvbnRleHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGNoLmRpZmZzLnB1c2goW0RJRkZfRVFVQUwsIHBvc3Rjb250ZXh0XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghZW1wdHkpIHtcbiAgICAgICAgICBwYXRjaGVzLnNwbGljZSgrK3gsIDAsIHBhdGNoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuXG4vKipcbiAqIFRha2UgYSBsaXN0IG9mIHBhdGNoZXMgYW5kIHJldHVybiBhIHRleHR1YWwgcmVwcmVzZW50YXRpb24uXG4gKiBAcGFyYW0geyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2gucGF0Y2hfb2JqPn0gcGF0Y2hlcyBBcnJheSBvZiBwYXRjaCBvYmplY3RzLlxuICogQHJldHVybiB7c3RyaW5nfSBUZXh0IHJlcHJlc2VudGF0aW9uIG9mIHBhdGNoZXMuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLnBhdGNoX3RvVGV4dCA9IGZ1bmN0aW9uKHBhdGNoZXMpIHtcbiAgdmFyIHRleHQgPSBbXTtcbiAgZm9yICh2YXIgeCA9IDA7IHggPCBwYXRjaGVzLmxlbmd0aDsgeCsrKSB7XG4gICAgdGV4dFt4XSA9IHBhdGNoZXNbeF07XG4gIH1cbiAgcmV0dXJuIHRleHQuam9pbignJyk7XG59O1xuXG5cbi8qKlxuICogUGFyc2UgYSB0ZXh0dWFsIHJlcHJlc2VudGF0aW9uIG9mIHBhdGNoZXMgYW5kIHJldHVybiBhIGxpc3Qgb2YgcGF0Y2ggb2JqZWN0cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0bGluZSBUZXh0IHJlcHJlc2VudGF0aW9uIG9mIHBhdGNoZXMuXG4gKiBAcmV0dXJuIHshQXJyYXkuPCFkaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaj59IEFycmF5IG9mIHBhdGNoIG9iamVjdHMuXG4gKiBAdGhyb3dzIHshRXJyb3J9IElmIGludmFsaWQgaW5wdXQuXG4gKi9cbmRpZmZfbWF0Y2hfcGF0Y2gucHJvdG90eXBlLnBhdGNoX2Zyb21UZXh0ID0gZnVuY3Rpb24odGV4dGxpbmUpIHtcbiAgdmFyIHBhdGNoZXMgPSBbXTtcbiAgaWYgKCF0ZXh0bGluZSkge1xuICAgIHJldHVybiBwYXRjaGVzO1xuICB9XG4gIHZhciB0ZXh0ID0gdGV4dGxpbmUuc3BsaXQoJ1xcbicpO1xuICB2YXIgdGV4dFBvaW50ZXIgPSAwO1xuICB2YXIgcGF0Y2hIZWFkZXIgPSAvXkBAIC0oXFxkKyksPyhcXGQqKSBcXCsoXFxkKyksPyhcXGQqKSBAQCQvO1xuICB3aGlsZSAodGV4dFBvaW50ZXIgPCB0ZXh0Lmxlbmd0aCkge1xuICAgIHZhciBtID0gdGV4dFt0ZXh0UG9pbnRlcl0ubWF0Y2gocGF0Y2hIZWFkZXIpO1xuICAgIGlmICghbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHBhdGNoIHN0cmluZzogJyArIHRleHRbdGV4dFBvaW50ZXJdKTtcbiAgICB9XG4gICAgdmFyIHBhdGNoID0gbmV3IGRpZmZfbWF0Y2hfcGF0Y2gucGF0Y2hfb2JqKCk7XG4gICAgcGF0Y2hlcy5wdXNoKHBhdGNoKTtcbiAgICBwYXRjaC5zdGFydDEgPSBwYXJzZUludChtWzFdLCAxMCk7XG4gICAgaWYgKG1bMl0gPT09ICcnKSB7XG4gICAgICBwYXRjaC5zdGFydDEtLTtcbiAgICAgIHBhdGNoLmxlbmd0aDEgPSAxO1xuICAgIH0gZWxzZSBpZiAobVsyXSA9PSAnMCcpIHtcbiAgICAgIHBhdGNoLmxlbmd0aDEgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXRjaC5zdGFydDEtLTtcbiAgICAgIHBhdGNoLmxlbmd0aDEgPSBwYXJzZUludChtWzJdLCAxMCk7XG4gICAgfVxuXG4gICAgcGF0Y2guc3RhcnQyID0gcGFyc2VJbnQobVszXSwgMTApO1xuICAgIGlmIChtWzRdID09PSAnJykge1xuICAgICAgcGF0Y2guc3RhcnQyLS07XG4gICAgICBwYXRjaC5sZW5ndGgyID0gMTtcbiAgICB9IGVsc2UgaWYgKG1bNF0gPT0gJzAnKSB7XG4gICAgICBwYXRjaC5sZW5ndGgyID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgcGF0Y2guc3RhcnQyLS07XG4gICAgICBwYXRjaC5sZW5ndGgyID0gcGFyc2VJbnQobVs0XSwgMTApO1xuICAgIH1cbiAgICB0ZXh0UG9pbnRlcisrO1xuXG4gICAgd2hpbGUgKHRleHRQb2ludGVyIDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgIHZhciBzaWduID0gdGV4dFt0ZXh0UG9pbnRlcl0uY2hhckF0KDApO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIGxpbmUgPSBkZWNvZGVVUkkodGV4dFt0ZXh0UG9pbnRlcl0uc3Vic3RyaW5nKDEpKTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIC8vIE1hbGZvcm1lZCBVUkkgc2VxdWVuY2UuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBlc2NhcGUgaW4gcGF0Y2hfZnJvbVRleHQ6ICcgKyBsaW5lKTtcbiAgICAgIH1cbiAgICAgIGlmIChzaWduID09ICctJykge1xuICAgICAgICAvLyBEZWxldGlvbi5cbiAgICAgICAgcGF0Y2guZGlmZnMucHVzaChbRElGRl9ERUxFVEUsIGxpbmVdKTtcbiAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PSAnKycpIHtcbiAgICAgICAgLy8gSW5zZXJ0aW9uLlxuICAgICAgICBwYXRjaC5kaWZmcy5wdXNoKFtESUZGX0lOU0VSVCwgbGluZV0pO1xuICAgICAgfSBlbHNlIGlmIChzaWduID09ICcgJykge1xuICAgICAgICAvLyBNaW5vciBlcXVhbGl0eS5cbiAgICAgICAgcGF0Y2guZGlmZnMucHVzaChbRElGRl9FUVVBTCwgbGluZV0pO1xuICAgICAgfSBlbHNlIGlmIChzaWduID09ICdAJykge1xuICAgICAgICAvLyBTdGFydCBvZiBuZXh0IHBhdGNoLlxuICAgICAgICBicmVhaztcbiAgICAgIH0gZWxzZSBpZiAoc2lnbiA9PT0gJycpIHtcbiAgICAgICAgLy8gQmxhbmsgbGluZT8gIFdoYXRldmVyLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV1RGP1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGF0Y2ggbW9kZSBcIicgKyBzaWduICsgJ1wiIGluOiAnICsgbGluZSk7XG4gICAgICB9XG4gICAgICB0ZXh0UG9pbnRlcisrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcGF0Y2hlcztcbn07XG5cblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgb25lIHBhdGNoIG9wZXJhdGlvbi5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5kaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iaiA9IGZ1bmN0aW9uKCkge1xuICAvKiogQHR5cGUgeyFBcnJheS48IWRpZmZfbWF0Y2hfcGF0Y2guRGlmZj59ICovXG4gIHRoaXMuZGlmZnMgPSBbXTtcbiAgLyoqIEB0eXBlIHs/bnVtYmVyfSAqL1xuICB0aGlzLnN0YXJ0MSA9IG51bGw7XG4gIC8qKiBAdHlwZSB7P251bWJlcn0gKi9cbiAgdGhpcy5zdGFydDIgPSBudWxsO1xuICAvKiogQHR5cGUge251bWJlcn0gKi9cbiAgdGhpcy5sZW5ndGgxID0gMDtcbiAgLyoqIEB0eXBlIHtudW1iZXJ9ICovXG4gIHRoaXMubGVuZ3RoMiA9IDA7XG59O1xuXG5cbi8qKlxuICogRW1tdWxhdGUgR05VIGRpZmYncyBmb3JtYXQuXG4gKiBIZWFkZXI6IEBAIC0zODIsOCArNDgxLDkgQEBcbiAqIEluZGljaWVzIGFyZSBwcmludGVkIGFzIDEtYmFzZWQsIG5vdCAwLWJhc2VkLlxuICogQHJldHVybiB7c3RyaW5nfSBUaGUgR05VIGRpZmYgc3RyaW5nLlxuICovXG5kaWZmX21hdGNoX3BhdGNoLnBhdGNoX29iai5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGNvb3JkczEsIGNvb3JkczI7XG4gIGlmICh0aGlzLmxlbmd0aDEgPT09IDApIHtcbiAgICBjb29yZHMxID0gdGhpcy5zdGFydDEgKyAnLDAnO1xuICB9IGVsc2UgaWYgKHRoaXMubGVuZ3RoMSA9PSAxKSB7XG4gICAgY29vcmRzMSA9IHRoaXMuc3RhcnQxICsgMTtcbiAgfSBlbHNlIHtcbiAgICBjb29yZHMxID0gKHRoaXMuc3RhcnQxICsgMSkgKyAnLCcgKyB0aGlzLmxlbmd0aDE7XG4gIH1cbiAgaWYgKHRoaXMubGVuZ3RoMiA9PT0gMCkge1xuICAgIGNvb3JkczIgPSB0aGlzLnN0YXJ0MiArICcsMCc7XG4gIH0gZWxzZSBpZiAodGhpcy5sZW5ndGgyID09IDEpIHtcbiAgICBjb29yZHMyID0gdGhpcy5zdGFydDIgKyAxO1xuICB9IGVsc2Uge1xuICAgIGNvb3JkczIgPSAodGhpcy5zdGFydDIgKyAxKSArICcsJyArIHRoaXMubGVuZ3RoMjtcbiAgfVxuICB2YXIgdGV4dCA9IFsnQEAgLScgKyBjb29yZHMxICsgJyArJyArIGNvb3JkczIgKyAnIEBAXFxuJ107XG4gIHZhciBvcDtcbiAgLy8gRXNjYXBlIHRoZSBib2R5IG9mIHRoZSBwYXRjaCB3aXRoICV4eCBub3RhdGlvbi5cbiAgZm9yICh2YXIgeCA9IDA7IHggPCB0aGlzLmRpZmZzLmxlbmd0aDsgeCsrKSB7XG4gICAgc3dpdGNoICh0aGlzLmRpZmZzW3hdWzBdKSB7XG4gICAgICBjYXNlIERJRkZfSU5TRVJUOlxuICAgICAgICBvcCA9ICcrJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfREVMRVRFOlxuICAgICAgICBvcCA9ICctJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIERJRkZfRVFVQUw6XG4gICAgICAgIG9wID0gJyAnO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgdGV4dFt4ICsgMV0gPSBvcCArIGVuY29kZVVSSSh0aGlzLmRpZmZzW3hdWzFdKSArICdcXG4nO1xuICB9XG4gIHJldHVybiB0ZXh0LmpvaW4oJycpLnJlcGxhY2UoLyUyMC9nLCAnICcpO1xufTtcblxuXG4vLyBFeHBvcnQgdGhlc2UgZ2xvYmFsIHZhcmlhYmxlcyBzbyB0aGF0IHRoZXkgc3Vydml2ZSBHb29nbGUncyBKUyBjb21waWxlci5cbi8vIEluIGEgYnJvd3NlciwgJ3RoaXMnIHdpbGwgYmUgJ3dpbmRvdycuXG4vLyBJbiBub2RlLmpzICd0aGlzJyB3aWxsIGJlIGEgZ2xvYmFsIG9iamVjdC5cbnRoaXNbJ2RpZmZfbWF0Y2hfcGF0Y2gnXSA9IGRpZmZfbWF0Y2hfcGF0Y2g7XG50aGlzWydESUZGX0RFTEVURSddID0gRElGRl9ERUxFVEU7XG50aGlzWydESUZGX0lOU0VSVCddID0gRElGRl9JTlNFUlQ7XG50aGlzWydESUZGX0VRVUFMJ10gPSBESUZGX0VRVUFMO1xuXG4iLCJcbnZhciBQaXBlID0gcmVxdWlyZSgnLi4vcGlwZScpLlBpcGU7XG5cbnZhciBDb250ZXh0ID0gZnVuY3Rpb24gQ29udGV4dCgpe1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUuc2V0UmVzdWx0ID0gZnVuY3Rpb24ocmVzdWx0KSB7XG5cdHRoaXMucmVzdWx0ID0gcmVzdWx0O1xuXHR0aGlzLmhhc1Jlc3VsdCA9IHRydWU7XG5cdHJldHVybiB0aGlzO1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUuZXhpdCA9IGZ1bmN0aW9uKCkge1xuXHR0aGlzLmV4aXRpbmcgPSB0cnVlO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbkNvbnRleHQucHJvdG90eXBlLnN3aXRjaFRvID0gZnVuY3Rpb24obmV4dCwgcGlwZSkge1xuXHRpZiAodHlwZW9mIG5leHQgPT09ICdzdHJpbmcnIHx8IG5leHQgaW5zdGFuY2VvZiBQaXBlKSB7XG5cdFx0dGhpcy5uZXh0UGlwZSA9IG5leHQ7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5uZXh0ID0gbmV4dDtcblx0XHRpZiAocGlwZSkge1xuXHRcdFx0dGhpcy5uZXh0UGlwZSA9IHBpcGU7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuQ29udGV4dC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGNoaWxkLCBuYW1lKSB7XG5cdGNoaWxkLnBhcmVudCA9IHRoaXM7XG5cdGlmICh0eXBlb2YgbmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRjaGlsZC5jaGlsZE5hbWUgPSBuYW1lO1xuXHR9XG5cdGNoaWxkLnJvb3QgPSB0aGlzLnJvb3QgfHwgdGhpcztcblx0Y2hpbGQub3B0aW9ucyA9IGNoaWxkLm9wdGlvbnMgfHwgdGhpcy5vcHRpb25zO1xuXHRpZiAoIXRoaXMuY2hpbGRyZW4pIHtcblx0XHR0aGlzLmNoaWxkcmVuID0gW2NoaWxkXTtcblx0XHR0aGlzLm5leHRBZnRlckNoaWxkcmVuID0gdGhpcy5uZXh0IHx8IG51bGw7XG5cdFx0dGhpcy5uZXh0ID0gY2hpbGQ7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5jaGlsZHJlblt0aGlzLmNoaWxkcmVuLmxlbmd0aCAtIDFdLm5leHQgPSBjaGlsZDtcblx0XHR0aGlzLmNoaWxkcmVuLnB1c2goY2hpbGQpO1xuXHR9XG5cdGNoaWxkLm5leHQgPSB0aGlzO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuQ29udGV4dCA9IENvbnRleHQ7XG4iLCJ2YXIgQ29udGV4dCA9IHJlcXVpcmUoJy4vY29udGV4dCcpLkNvbnRleHQ7XG5cbnZhciBEaWZmQ29udGV4dCA9IGZ1bmN0aW9uIERpZmZDb250ZXh0KGxlZnQsIHJpZ2h0KSB7XG4gIHRoaXMubGVmdCA9IGxlZnQ7XG4gIHRoaXMucmlnaHQgPSByaWdodDtcbiAgdGhpcy5waXBlID0gJ2RpZmYnO1xufTtcblxuRGlmZkNvbnRleHQucHJvdG90eXBlID0gbmV3IENvbnRleHQoKTtcblxuZXhwb3J0cy5EaWZmQ29udGV4dCA9IERpZmZDb250ZXh0O1xuIiwidmFyIENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHQnKS5Db250ZXh0O1xuXG52YXIgUGF0Y2hDb250ZXh0ID0gZnVuY3Rpb24gUGF0Y2hDb250ZXh0KGxlZnQsIGRlbHRhKSB7XG4gIHRoaXMubGVmdCA9IGxlZnQ7XG4gIHRoaXMuZGVsdGEgPSBkZWx0YTtcbiAgdGhpcy5waXBlID0gJ3BhdGNoJztcbn07XG5cblBhdGNoQ29udGV4dC5wcm90b3R5cGUgPSBuZXcgQ29udGV4dCgpO1xuXG5leHBvcnRzLlBhdGNoQ29udGV4dCA9IFBhdGNoQ29udGV4dDtcbiIsInZhciBDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0JykuQ29udGV4dDtcblxudmFyIFJldmVyc2VDb250ZXh0ID0gZnVuY3Rpb24gUmV2ZXJzZUNvbnRleHQoZGVsdGEpIHtcbiAgdGhpcy5kZWx0YSA9IGRlbHRhO1xuICB0aGlzLnBpcGUgPSAncmV2ZXJzZSc7XG59O1xuXG5SZXZlcnNlQ29udGV4dC5wcm90b3R5cGUgPSBuZXcgQ29udGV4dCgpO1xuXG5leHBvcnRzLlJldmVyc2VDb250ZXh0ID0gUmV2ZXJzZUNvbnRleHQ7XG4iLCIvLyB1c2UgYXMgMm5kIHBhcmFtZXRlciBmb3IgSlNPTi5wYXJzZSB0byByZXZpdmUgRGF0ZSBpbnN0YW5jZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGF0ZVJldml2ZXIoa2V5LCB2YWx1ZSkge1xuICB2YXIgcGFydHM7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcGFydHMgPSAvXihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pVChcXGR7Mn0pOihcXGR7Mn0pOihcXGR7Mn0pKD86XFwuKFxcZCopKT8oWnwoWytcXC1dKShcXGR7Mn0pOihcXGR7Mn0pKSQvLmV4ZWModmFsdWUpO1xuICAgIGlmIChwYXJ0cykge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKERhdGUuVVRDKCtwYXJ0c1sxXSwgK3BhcnRzWzJdIC0gMSwgK3BhcnRzWzNdLCArcGFydHNbNF0sICtwYXJ0c1s1XSwgK3BhcnRzWzZdLCArKHBhcnRzWzddIHx8IDApKSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB2YWx1ZTtcbn07XG4iLCJ2YXIgUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9wcm9jZXNzb3InKS5Qcm9jZXNzb3I7XG52YXIgUGlwZSA9IHJlcXVpcmUoJy4vcGlwZScpLlBpcGU7XG52YXIgRGlmZkNvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuL2NvbnRleHRzL3BhdGNoJykuUGF0Y2hDb250ZXh0O1xudmFyIFJldmVyc2VDb250ZXh0ID0gcmVxdWlyZSgnLi9jb250ZXh0cy9yZXZlcnNlJykuUmV2ZXJzZUNvbnRleHQ7XG5cbnZhciB0cml2aWFsID0gcmVxdWlyZSgnLi9maWx0ZXJzL3RyaXZpYWwnKTtcbnZhciBuZXN0ZWQgPSByZXF1aXJlKCcuL2ZpbHRlcnMvbmVzdGVkJyk7XG52YXIgYXJyYXlzID0gcmVxdWlyZSgnLi9maWx0ZXJzL2FycmF5cycpO1xudmFyIGRhdGVzID0gcmVxdWlyZSgnLi9maWx0ZXJzL2RhdGVzJyk7XG52YXIgdGV4dHMgPSByZXF1aXJlKCcuL2ZpbHRlcnMvdGV4dHMnKTtcblxudmFyIERpZmZQYXRjaGVyID0gZnVuY3Rpb24gRGlmZlBhdGNoZXIob3B0aW9ucykge1xuICB0aGlzLnByb2Nlc3NvciA9IG5ldyBQcm9jZXNzb3Iob3B0aW9ucyk7XG4gIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ2RpZmYnKS5hcHBlbmQoXG4gICAgbmVzdGVkLmNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIsXG4gICAgdHJpdmlhbC5kaWZmRmlsdGVyLFxuICAgIGRhdGVzLmRpZmZGaWx0ZXIsXG4gICAgdGV4dHMuZGlmZkZpbHRlcixcbiAgICBuZXN0ZWQub2JqZWN0c0RpZmZGaWx0ZXIsXG4gICAgYXJyYXlzLmRpZmZGaWx0ZXJcbiAgKS5zaG91bGRIYXZlUmVzdWx0KCkpO1xuICB0aGlzLnByb2Nlc3Nvci5waXBlKG5ldyBQaXBlKCdwYXRjaCcpLmFwcGVuZChcbiAgICBuZXN0ZWQuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIsXG4gICAgYXJyYXlzLmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLFxuICAgIHRyaXZpYWwucGF0Y2hGaWx0ZXIsXG4gICAgdGV4dHMucGF0Y2hGaWx0ZXIsXG4gICAgbmVzdGVkLnBhdGNoRmlsdGVyLFxuICAgIGFycmF5cy5wYXRjaEZpbHRlclxuICApLnNob3VsZEhhdmVSZXN1bHQoKSk7XG4gIHRoaXMucHJvY2Vzc29yLnBpcGUobmV3IFBpcGUoJ3JldmVyc2UnKS5hcHBlbmQoXG4gICAgbmVzdGVkLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIsXG4gICAgYXJyYXlzLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIsXG4gICAgdHJpdmlhbC5yZXZlcnNlRmlsdGVyLFxuICAgIHRleHRzLnJldmVyc2VGaWx0ZXIsXG4gICAgbmVzdGVkLnJldmVyc2VGaWx0ZXIsXG4gICAgYXJyYXlzLnJldmVyc2VGaWx0ZXJcbiAgKS5zaG91bGRIYXZlUmVzdWx0KCkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLm9wdGlvbnMuYXBwbHkodGhpcy5wcm9jZXNzb3IsIGFyZ3VtZW50cyk7XG59O1xuXG5EaWZmUGF0Y2hlci5wcm90b3R5cGUuZGlmZiA9IGZ1bmN0aW9uKGxlZnQsIHJpZ2h0KSB7XG4gIHJldHVybiB0aGlzLnByb2Nlc3Nvci5wcm9jZXNzKG5ldyBEaWZmQ29udGV4dChsZWZ0LCByaWdodCkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLnBhdGNoID0gZnVuY3Rpb24obGVmdCwgZGVsdGEpIHtcbiAgcmV0dXJuIHRoaXMucHJvY2Vzc29yLnByb2Nlc3MobmV3IFBhdGNoQ29udGV4dChsZWZ0LCBkZWx0YSkpO1xufTtcblxuRGlmZlBhdGNoZXIucHJvdG90eXBlLnJldmVyc2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICByZXR1cm4gdGhpcy5wcm9jZXNzb3IucHJvY2VzcyhuZXcgUmV2ZXJzZUNvbnRleHQoZGVsdGEpKTtcbn07XG5cbkRpZmZQYXRjaGVyLnByb3RvdHlwZS51bnBhdGNoID0gZnVuY3Rpb24ocmlnaHQsIGRlbHRhKSB7XG4gIHJldHVybiB0aGlzLnBhdGNoKHJpZ2h0LCB0aGlzLnJldmVyc2UoZGVsdGEpKTtcbn07XG5cbmV4cG9ydHMuRGlmZlBhdGNoZXIgPSBEaWZmUGF0Y2hlcjtcbiIsIlxuZXhwb3J0cy5pc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbiIsInZhciBEaWZmQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL2RpZmYnKS5EaWZmQ29udGV4dDtcbnZhciBQYXRjaENvbnRleHQgPSByZXF1aXJlKCcuLi9jb250ZXh0cy9wYXRjaCcpLlBhdGNoQ29udGV4dDtcbnZhciBSZXZlcnNlQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL3JldmVyc2UnKS5SZXZlcnNlQ29udGV4dDtcblxudmFyIGxjcyA9IHJlcXVpcmUoJy4vbGNzJyk7XG5cbnZhciBBUlJBWV9NT1ZFID0gMztcblxudmFyIGlzQXJyYXkgPSAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpID9cbiAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICBBcnJheS5pc0FycmF5IDpcbiAgLy8gdXNlIGluc3RhbmNlb2Ygb3BlcmF0b3JcbiAgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXk7XG4gIH07XG5cbnZhciBhcnJheUluZGV4T2YgPSB0eXBlb2YgQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicgP1xuICBmdW5jdGlvbihhcnJheSwgaXRlbSkge1xuICAgIHJldHVybiBhcnJheS5pbmRleE9mKGl0ZW0pO1xuICB9IDogZnVuY3Rpb24oYXJyYXksIGl0ZW0pIHtcbiAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheVtpXSA9PT0gaXRlbSkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG5mdW5jdGlvbiBhcnJheXNIYXZlTWF0Y2hCeVJlZihhcnJheTEsIGFycmF5MiwgbGVuMSwgbGVuMikge1xuICBmb3IgKHZhciBpbmRleDEgPSAwOyBpbmRleDEgPCBsZW4xOyBpbmRleDErKykge1xuICAgIHZhciB2YWwxID0gYXJyYXkxW2luZGV4MV07XG4gICAgZm9yICh2YXIgaW5kZXgyID0gMDsgaW5kZXgyIDwgbGVuMjsgaW5kZXgyKyspIHtcbiAgICAgIHZhciB2YWwyID0gYXJyYXkyW2luZGV4Ml07XG4gICAgICBpZiAodmFsMSA9PT0gdmFsMikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbWF0Y2hJdGVtcyhhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIsIGNvbnRleHQpIHtcbiAgdmFyIHZhbHVlMSA9IGFycmF5MVtpbmRleDFdO1xuICB2YXIgdmFsdWUyID0gYXJyYXkyW2luZGV4Ml07XG4gIGlmICh2YWx1ZTEgPT09IHZhbHVlMikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUxICE9PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsdWUyICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgb2JqZWN0SGFzaCA9IGNvbnRleHQub2JqZWN0SGFzaDtcbiAgaWYgKCFvYmplY3RIYXNoKSB7XG4gICAgLy8gbm8gd2F5IHRvIG1hdGNoIG9iamVjdHMgd2FzIHByb3ZpZGVkLCB0cnkgbWF0Y2ggYnkgcG9zaXRpb25cbiAgICByZXR1cm4gY29udGV4dC5tYXRjaEJ5UG9zaXRpb24gJiYgaW5kZXgxID09PSBpbmRleDI7XG4gIH1cbiAgdmFyIGhhc2gxO1xuICB2YXIgaGFzaDI7XG4gIGlmICh0eXBlb2YgaW5kZXgxID09PSAnbnVtYmVyJykge1xuICAgIGNvbnRleHQuaGFzaENhY2hlMSA9IGNvbnRleHQuaGFzaENhY2hlMSB8fCBbXTtcbiAgICBoYXNoMSA9IGNvbnRleHQuaGFzaENhY2hlMVtpbmRleDFdO1xuICAgIGlmICh0eXBlb2YgaGFzaDEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb250ZXh0Lmhhc2hDYWNoZTFbaW5kZXgxXSA9IGhhc2gxID0gb2JqZWN0SGFzaCh2YWx1ZTEsIGluZGV4MSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhhc2gxID0gb2JqZWN0SGFzaCh2YWx1ZTEpO1xuICB9XG4gIGlmICh0eXBlb2YgaGFzaDEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgaW5kZXgyID09PSAnbnVtYmVyJykge1xuICAgIGNvbnRleHQuaGFzaENhY2hlMiA9IGNvbnRleHQuaGFzaENhY2hlMiB8fCBbXTtcbiAgICBoYXNoMiA9IGNvbnRleHQuaGFzaENhY2hlMltpbmRleDJdO1xuICAgIGlmICh0eXBlb2YgaGFzaDIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb250ZXh0Lmhhc2hDYWNoZTJbaW5kZXgyXSA9IGhhc2gyID0gb2JqZWN0SGFzaCh2YWx1ZTIsIGluZGV4Mik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhhc2gyID0gb2JqZWN0SGFzaCh2YWx1ZTIpO1xuICB9XG4gIGlmICh0eXBlb2YgaGFzaDIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBoYXNoMSA9PT0gaGFzaDI7XG59XG5cbnZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gYXJyYXlzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5sZWZ0SXNBcnJheSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBtYXRjaENvbnRleHQgPSB7XG4gICAgb2JqZWN0SGFzaDogY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5vYmplY3RIYXNoLFxuICAgIG1hdGNoQnlQb3NpdGlvbjogY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5tYXRjaEJ5UG9zaXRpb25cbiAgfTtcbiAgdmFyIGNvbW1vbkhlYWQgPSAwO1xuICB2YXIgY29tbW9uVGFpbCA9IDA7XG4gIHZhciBpbmRleDtcbiAgdmFyIGluZGV4MTtcbiAgdmFyIGluZGV4MjtcbiAgdmFyIGFycmF5MSA9IGNvbnRleHQubGVmdDtcbiAgdmFyIGFycmF5MiA9IGNvbnRleHQucmlnaHQ7XG4gIHZhciBsZW4xID0gYXJyYXkxLmxlbmd0aDtcbiAgdmFyIGxlbjIgPSBhcnJheTIubGVuZ3RoO1xuXG4gIHZhciBjaGlsZDtcblxuICBpZiAobGVuMSA+IDAgJiYgbGVuMiA+IDAgJiYgIW1hdGNoQ29udGV4dC5vYmplY3RIYXNoICYmXG4gICAgdHlwZW9mIG1hdGNoQ29udGV4dC5tYXRjaEJ5UG9zaXRpb24gIT09ICdib29sZWFuJykge1xuICAgIG1hdGNoQ29udGV4dC5tYXRjaEJ5UG9zaXRpb24gPSAhYXJyYXlzSGF2ZU1hdGNoQnlSZWYoYXJyYXkxLCBhcnJheTIsIGxlbjEsIGxlbjIpO1xuICB9XG5cbiAgLy8gc2VwYXJhdGUgY29tbW9uIGhlYWRcbiAgd2hpbGUgKGNvbW1vbkhlYWQgPCBsZW4xICYmIGNvbW1vbkhlYWQgPCBsZW4yICYmXG4gICAgbWF0Y2hJdGVtcyhhcnJheTEsIGFycmF5MiwgY29tbW9uSGVhZCwgY29tbW9uSGVhZCwgbWF0Y2hDb250ZXh0KSkge1xuICAgIGluZGV4ID0gY29tbW9uSGVhZDtcbiAgICBjaGlsZCA9IG5ldyBEaWZmQ29udGV4dChjb250ZXh0LmxlZnRbaW5kZXhdLCBjb250ZXh0LnJpZ2h0W2luZGV4XSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBpbmRleCk7XG4gICAgY29tbW9uSGVhZCsrO1xuICB9XG4gIC8vIHNlcGFyYXRlIGNvbW1vbiB0YWlsXG4gIHdoaWxlIChjb21tb25UYWlsICsgY29tbW9uSGVhZCA8IGxlbjEgJiYgY29tbW9uVGFpbCArIGNvbW1vbkhlYWQgPCBsZW4yICYmXG4gICAgbWF0Y2hJdGVtcyhhcnJheTEsIGFycmF5MiwgbGVuMSAtIDEgLSBjb21tb25UYWlsLCBsZW4yIC0gMSAtIGNvbW1vblRhaWwsIG1hdGNoQ29udGV4dCkpIHtcbiAgICBpbmRleDEgPSBsZW4xIC0gMSAtIGNvbW1vblRhaWw7XG4gICAgaW5kZXgyID0gbGVuMiAtIDEgLSBjb21tb25UYWlsO1xuICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtpbmRleDFdLCBjb250ZXh0LnJpZ2h0W2luZGV4Ml0pO1xuICAgIGNvbnRleHQucHVzaChjaGlsZCwgaW5kZXgyKTtcbiAgICBjb21tb25UYWlsKys7XG4gIH1cbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGNvbW1vbkhlYWQgKyBjb21tb25UYWlsID09PSBsZW4xKSB7XG4gICAgaWYgKGxlbjEgPT09IGxlbjIpIHtcbiAgICAgIC8vIGFycmF5cyBhcmUgaWRlbnRpY2FsXG4gICAgICBjb250ZXh0LnNldFJlc3VsdCh1bmRlZmluZWQpLmV4aXQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdHJpdmlhbCBjYXNlLCBhIGJsb2NrICgxIG9yIG1vcmUgY29uc2VjdXRpdmUgaXRlbXMpIHdhcyBhZGRlZFxuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7XG4gICAgICBfdDogJ2EnXG4gICAgfTtcbiAgICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4yIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0W2luZGV4XSA9IFthcnJheTJbaW5kZXhdXTtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb21tb25IZWFkICsgY29tbW9uVGFpbCA9PT0gbGVuMikge1xuICAgIC8vIHRyaXZpYWwgY2FzZSwgYSBibG9jayAoMSBvciBtb3JlIGNvbnNlY3V0aXZlIGl0ZW1zKSB3YXMgcmVtb3ZlZFxuICAgIHJlc3VsdCA9IHJlc3VsdCB8fCB7XG4gICAgICBfdDogJ2EnXG4gICAgfTtcbiAgICBmb3IgKGluZGV4ID0gY29tbW9uSGVhZDsgaW5kZXggPCBsZW4xIC0gY29tbW9uVGFpbDsgaW5kZXgrKykge1xuICAgICAgcmVzdWx0WydfJyArIGluZGV4XSA9IFthcnJheTFbaW5kZXhdLCAwLCAwXTtcbiAgICB9XG4gICAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHJlc2V0IGhhc2ggY2FjaGVcbiAgZGVsZXRlIG1hdGNoQ29udGV4dC5oYXNoQ2FjaGUxO1xuICBkZWxldGUgbWF0Y2hDb250ZXh0Lmhhc2hDYWNoZTI7XG5cbiAgLy8gZGlmZiBpcyBub3QgdHJpdmlhbCwgZmluZCB0aGUgTENTIChMb25nZXN0IENvbW1vbiBTdWJzZXF1ZW5jZSlcbiAgdmFyIHRyaW1tZWQxID0gYXJyYXkxLnNsaWNlKGNvbW1vbkhlYWQsIGxlbjEgLSBjb21tb25UYWlsKTtcbiAgdmFyIHRyaW1tZWQyID0gYXJyYXkyLnNsaWNlKGNvbW1vbkhlYWQsIGxlbjIgLSBjb21tb25UYWlsKTtcbiAgdmFyIHNlcSA9IGxjcy5nZXQoXG4gICAgdHJpbW1lZDEsIHRyaW1tZWQyLFxuICAgIG1hdGNoSXRlbXMsXG4gICAgbWF0Y2hDb250ZXh0XG4gICk7XG4gIHZhciByZW1vdmVkSXRlbXMgPSBbXTtcbiAgcmVzdWx0ID0gcmVzdWx0IHx8IHtcbiAgICBfdDogJ2EnXG4gIH07XG4gIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjEgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgaWYgKGFycmF5SW5kZXhPZihzZXEuaW5kaWNlczEsIGluZGV4IC0gY29tbW9uSGVhZCkgPCAwKSB7XG4gICAgICAvLyByZW1vdmVkXG4gICAgICByZXN1bHRbJ18nICsgaW5kZXhdID0gW2FycmF5MVtpbmRleF0sIDAsIDBdO1xuICAgICAgcmVtb3ZlZEl0ZW1zLnB1c2goaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBkZXRlY3RNb3ZlID0gdHJ1ZTtcbiAgaWYgKGNvbnRleHQub3B0aW9ucyAmJiBjb250ZXh0Lm9wdGlvbnMuYXJyYXlzICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMuZGV0ZWN0TW92ZSA9PT0gZmFsc2UpIHtcbiAgICBkZXRlY3RNb3ZlID0gZmFsc2U7XG4gIH1cbiAgdmFyIGluY2x1ZGVWYWx1ZU9uTW92ZSA9IGZhbHNlO1xuICBpZiAoY29udGV4dC5vcHRpb25zICYmIGNvbnRleHQub3B0aW9ucy5hcnJheXMgJiYgY29udGV4dC5vcHRpb25zLmFycmF5cy5pbmNsdWRlVmFsdWVPbk1vdmUpIHtcbiAgICBpbmNsdWRlVmFsdWVPbk1vdmUgPSB0cnVlO1xuICB9XG5cbiAgdmFyIHJlbW92ZWRJdGVtc0xlbmd0aCA9IHJlbW92ZWRJdGVtcy5sZW5ndGg7XG4gIGZvciAoaW5kZXggPSBjb21tb25IZWFkOyBpbmRleCA8IGxlbjIgLSBjb21tb25UYWlsOyBpbmRleCsrKSB7XG4gICAgdmFyIGluZGV4T25BcnJheTIgPSBhcnJheUluZGV4T2Yoc2VxLmluZGljZXMyLCBpbmRleCAtIGNvbW1vbkhlYWQpO1xuICAgIGlmIChpbmRleE9uQXJyYXkyIDwgMCkge1xuICAgICAgLy8gYWRkZWQsIHRyeSB0byBtYXRjaCB3aXRoIGEgcmVtb3ZlZCBpdGVtIGFuZCByZWdpc3RlciBhcyBwb3NpdGlvbiBtb3ZlXG4gICAgICB2YXIgaXNNb3ZlID0gZmFsc2U7XG4gICAgICBpZiAoZGV0ZWN0TW92ZSAmJiByZW1vdmVkSXRlbXNMZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAodmFyIHJlbW92ZUl0ZW1JbmRleDEgPSAwOyByZW1vdmVJdGVtSW5kZXgxIDwgcmVtb3ZlZEl0ZW1zTGVuZ3RoOyByZW1vdmVJdGVtSW5kZXgxKyspIHtcbiAgICAgICAgICBpbmRleDEgPSByZW1vdmVkSXRlbXNbcmVtb3ZlSXRlbUluZGV4MV07XG4gICAgICAgICAgaWYgKG1hdGNoSXRlbXModHJpbW1lZDEsIHRyaW1tZWQyLCBpbmRleDEgLSBjb21tb25IZWFkLFxuICAgICAgICAgICAgaW5kZXggLSBjb21tb25IZWFkLCBtYXRjaENvbnRleHQpKSB7XG4gICAgICAgICAgICAvLyBzdG9yZSBwb3NpdGlvbiBtb3ZlIGFzOiBbb3JpZ2luYWxWYWx1ZSwgbmV3UG9zaXRpb24sIEFSUkFZX01PVkVdXG4gICAgICAgICAgICByZXN1bHRbJ18nICsgaW5kZXgxXS5zcGxpY2UoMSwgMiwgaW5kZXgsIEFSUkFZX01PVkUpO1xuICAgICAgICAgICAgaWYgKCFpbmNsdWRlVmFsdWVPbk1vdmUpIHtcbiAgICAgICAgICAgICAgLy8gZG9uJ3QgaW5jbHVkZSBtb3ZlZCB2YWx1ZSBvbiBkaWZmLCB0byBzYXZlIGJ5dGVzXG4gICAgICAgICAgICAgIHJlc3VsdFsnXycgKyBpbmRleDFdWzBdID0gJyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGluZGV4MiA9IGluZGV4O1xuICAgICAgICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgICAgICAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4Mik7XG4gICAgICAgICAgICByZW1vdmVkSXRlbXMuc3BsaWNlKHJlbW92ZUl0ZW1JbmRleDEsIDEpO1xuICAgICAgICAgICAgaXNNb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFpc01vdmUpIHtcbiAgICAgICAgLy8gYWRkZWRcbiAgICAgICAgcmVzdWx0W2luZGV4XSA9IFthcnJheTJbaW5kZXhdXTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbWF0Y2gsIGRvIGlubmVyIGRpZmZcbiAgICAgIGluZGV4MSA9IHNlcS5pbmRpY2VzMVtpbmRleE9uQXJyYXkyXSArIGNvbW1vbkhlYWQ7XG4gICAgICBpbmRleDIgPSBzZXEuaW5kaWNlczJbaW5kZXhPbkFycmF5Ml0gKyBjb21tb25IZWFkO1xuICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQoY29udGV4dC5sZWZ0W2luZGV4MV0sIGNvbnRleHQucmlnaHRbaW5kZXgyXSk7XG4gICAgICBjb250ZXh0LnB1c2goY2hpbGQsIGluZGV4Mik7XG4gICAgfVxuICB9XG5cbiAgY29udGV4dC5zZXRSZXN1bHQocmVzdWx0KS5leGl0KCk7XG5cbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzJztcblxudmFyIGNvbXBhcmUgPSB7XG4gIG51bWVyaWNhbGx5OiBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGEgLSBiO1xuICB9LFxuICBudW1lcmljYWxseUJ5OiBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBhW25hbWVdIC0gYltuYW1lXTtcbiAgICB9O1xuICB9XG59O1xuXG52YXIgcGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiBuZXN0ZWRQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXgsIGluZGV4MTtcblxuICB2YXIgZGVsdGEgPSBjb250ZXh0LmRlbHRhO1xuICB2YXIgYXJyYXkgPSBjb250ZXh0LmxlZnQ7XG5cbiAgLy8gZmlyc3QsIHNlcGFyYXRlIHJlbW92YWxzLCBpbnNlcnRpb25zIGFuZCBtb2RpZmljYXRpb25zXG4gIHZhciB0b1JlbW92ZSA9IFtdO1xuICB2YXIgdG9JbnNlcnQgPSBbXTtcbiAgdmFyIHRvTW9kaWZ5ID0gW107XG4gIGZvciAoaW5kZXggaW4gZGVsdGEpIHtcbiAgICBpZiAoaW5kZXggIT09ICdfdCcpIHtcbiAgICAgIGlmIChpbmRleFswXSA9PT0gJ18nKSB7XG4gICAgICAgIC8vIHJlbW92ZWQgaXRlbSBmcm9tIG9yaWdpbmFsIGFycmF5XG4gICAgICAgIGlmIChkZWx0YVtpbmRleF1bMl0gPT09IDAgfHwgZGVsdGFbaW5kZXhdWzJdID09PSBBUlJBWV9NT1ZFKSB7XG4gICAgICAgICAgdG9SZW1vdmUucHVzaChwYXJzZUludChpbmRleC5zbGljZSgxKSwgMTApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ29ubHkgcmVtb3ZhbCBvciBtb3ZlIGNhbiBiZSBhcHBsaWVkIGF0IG9yaWdpbmFsIGFycmF5IGluZGljZXMnICtcbiAgICAgICAgICAgICcsIGludmFsaWQgZGlmZiB0eXBlOiAnICsgZGVsdGFbaW5kZXhdWzJdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGRlbHRhW2luZGV4XS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAvLyBhZGRlZCBpdGVtIGF0IG5ldyBhcnJheVxuICAgICAgICAgIHRvSW5zZXJ0LnB1c2goe1xuICAgICAgICAgICAgaW5kZXg6IHBhcnNlSW50KGluZGV4LCAxMCksXG4gICAgICAgICAgICB2YWx1ZTogZGVsdGFbaW5kZXhdWzBdXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gbW9kaWZpZWQgaXRlbSBhdCBuZXcgYXJyYXlcbiAgICAgICAgICB0b01vZGlmeS5wdXNoKHtcbiAgICAgICAgICAgIGluZGV4OiBwYXJzZUludChpbmRleCwgMTApLFxuICAgICAgICAgICAgZGVsdGE6IGRlbHRhW2luZGV4XVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gcmVtb3ZlIGl0ZW1zLCBpbiByZXZlcnNlIG9yZGVyIHRvIGF2b2lkIHNhd2luZyBvdXIgb3duIGZsb29yXG4gIHRvUmVtb3ZlID0gdG9SZW1vdmUuc29ydChjb21wYXJlLm51bWVyaWNhbGx5KTtcbiAgZm9yIChpbmRleCA9IHRvUmVtb3ZlLmxlbmd0aCAtIDE7IGluZGV4ID49IDA7IGluZGV4LS0pIHtcbiAgICBpbmRleDEgPSB0b1JlbW92ZVtpbmRleF07XG4gICAgdmFyIGluZGV4RGlmZiA9IGRlbHRhWydfJyArIGluZGV4MV07XG4gICAgdmFyIHJlbW92ZWRWYWx1ZSA9IGFycmF5LnNwbGljZShpbmRleDEsIDEpWzBdO1xuICAgIGlmIChpbmRleERpZmZbMl0gPT09IEFSUkFZX01PVkUpIHtcbiAgICAgIC8vIHJlaW5zZXJ0IGxhdGVyXG4gICAgICB0b0luc2VydC5wdXNoKHtcbiAgICAgICAgaW5kZXg6IGluZGV4RGlmZlsxXSxcbiAgICAgICAgdmFsdWU6IHJlbW92ZWRWYWx1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaW5zZXJ0IGl0ZW1zLCBpbiByZXZlcnNlIG9yZGVyIHRvIGF2b2lkIG1vdmluZyBvdXIgb3duIGZsb29yXG4gIHRvSW5zZXJ0ID0gdG9JbnNlcnQuc29ydChjb21wYXJlLm51bWVyaWNhbGx5QnkoJ2luZGV4JykpO1xuICB2YXIgdG9JbnNlcnRMZW5ndGggPSB0b0luc2VydC5sZW5ndGg7XG4gIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHRvSW5zZXJ0TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGluc2VydGlvbiA9IHRvSW5zZXJ0W2luZGV4XTtcbiAgICBhcnJheS5zcGxpY2UoaW5zZXJ0aW9uLmluZGV4LCAwLCBpbnNlcnRpb24udmFsdWUpO1xuICB9XG5cbiAgLy8gYXBwbHkgbW9kaWZpY2F0aW9uc1xuICB2YXIgdG9Nb2RpZnlMZW5ndGggPSB0b01vZGlmeS5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgaWYgKHRvTW9kaWZ5TGVuZ3RoID4gMCkge1xuICAgIGZvciAoaW5kZXggPSAwOyBpbmRleCA8IHRvTW9kaWZ5TGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICB2YXIgbW9kaWZpY2F0aW9uID0gdG9Nb2RpZnlbaW5kZXhdO1xuICAgICAgY2hpbGQgPSBuZXcgUGF0Y2hDb250ZXh0KGNvbnRleHQubGVmdFttb2RpZmljYXRpb24uaW5kZXhdLCBtb2RpZmljYXRpb24uZGVsdGEpO1xuICAgICAgY29udGV4dC5wdXNoKGNoaWxkLCBtb2RpZmljYXRpb24uaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghY29udGV4dC5jaGlsZHJlbikge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0LmV4aXQoKTtcbn07XG5wYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ2FycmF5cyc7XG5cbnZhciBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90ICE9PSAnYScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIGZvciAodmFyIGluZGV4ID0gMDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICBjaGlsZCA9IGNvbnRleHQuY2hpbGRyZW5baW5kZXhdO1xuICAgIGNvbnRleHQubGVmdFtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICB9XG4gIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQubGVmdCkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAnYXJyYXlzQ29sbGVjdENoaWxkcmVuJztcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBhcnJheXNSZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0Lm5lc3RlZCkge1xuICAgIGlmIChjb250ZXh0LmRlbHRhWzJdID09PSBBUlJBWV9NT1ZFKSB7XG4gICAgICBjb250ZXh0Lm5ld05hbWUgPSAnXycgKyBjb250ZXh0LmRlbHRhWzFdO1xuICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMF0sIHBhcnNlSW50KGNvbnRleHQuY2hpbGROYW1lLnN1YnN0cigxKSwgMTApLCBBUlJBWV9NT1ZFXSkuZXhpdCgpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEuX3QgIT09ICdhJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSwgY2hpbGQ7XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LmRlbHRhKSB7XG4gICAgaWYgKG5hbWUgPT09ICdfdCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjaGlsZCA9IG5ldyBSZXZlcnNlQ29udGV4dChjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXMnO1xuXG52YXIgcmV2ZXJzZUFycmF5RGVsdGFJbmRleCA9IGZ1bmN0aW9uKGRlbHRhLCBpbmRleCwgaXRlbURlbHRhKSB7XG4gIGlmICh0eXBlb2YgaW5kZXggPT09ICdzdHJpbmcnICYmIGluZGV4WzBdID09PSAnXycpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoaW5kZXguc3Vic3RyKDEpLCAxMCk7XG4gIH0gZWxzZSBpZiAoaXNBcnJheShpdGVtRGVsdGEpICYmIGl0ZW1EZWx0YVsyXSA9PT0gMCkge1xuICAgIHJldHVybiAnXycgKyBpbmRleDtcbiAgfVxuXG4gIHZhciByZXZlcnNlSW5kZXggPSAraW5kZXg7XG4gIGZvciAodmFyIGRlbHRhSW5kZXggaW4gZGVsdGEpIHtcbiAgICB2YXIgZGVsdGFJdGVtID0gZGVsdGFbZGVsdGFJbmRleF07XG4gICAgaWYgKGlzQXJyYXkoZGVsdGFJdGVtKSkge1xuICAgICAgaWYgKGRlbHRhSXRlbVsyXSA9PT0gQVJSQVlfTU9WRSkge1xuICAgICAgICB2YXIgbW92ZUZyb21JbmRleCA9IHBhcnNlSW50KGRlbHRhSW5kZXguc3Vic3RyKDEpLCAxMCk7XG4gICAgICAgIHZhciBtb3ZlVG9JbmRleCA9IGRlbHRhSXRlbVsxXTtcbiAgICAgICAgaWYgKG1vdmVUb0luZGV4ID09PSAraW5kZXgpIHtcbiAgICAgICAgICByZXR1cm4gbW92ZUZyb21JbmRleDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobW92ZUZyb21JbmRleCA8PSByZXZlcnNlSW5kZXggJiYgbW92ZVRvSW5kZXggPiByZXZlcnNlSW5kZXgpIHtcbiAgICAgICAgICByZXZlcnNlSW5kZXgrKztcbiAgICAgICAgfSBlbHNlIGlmIChtb3ZlRnJvbUluZGV4ID49IHJldmVyc2VJbmRleCAmJiBtb3ZlVG9JbmRleCA8IHJldmVyc2VJbmRleCkge1xuICAgICAgICAgIHJldmVyc2VJbmRleC0tO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRlbHRhSXRlbVsyXSA9PT0gMCkge1xuICAgICAgICB2YXIgZGVsZXRlSW5kZXggPSBwYXJzZUludChkZWx0YUluZGV4LnN1YnN0cigxKSwgMTApO1xuICAgICAgICBpZiAoZGVsZXRlSW5kZXggPD0gcmV2ZXJzZUluZGV4KSB7XG4gICAgICAgICAgcmV2ZXJzZUluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoZGVsdGFJdGVtLmxlbmd0aCA9PT0gMSAmJiBkZWx0YUluZGV4IDw9IHJldmVyc2VJbmRleCkge1xuICAgICAgICByZXZlcnNlSW5kZXgtLTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmV2ZXJzZUluZGV4O1xufTtcblxudmFyIGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90ICE9PSAnYScpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIHZhciBkZWx0YSA9IHtcbiAgICBfdDogJ2EnXG4gIH07XG5cbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgdmFyIG5hbWUgPSBjaGlsZC5uZXdOYW1lO1xuICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5hbWUgPSByZXZlcnNlQXJyYXlEZWx0YUluZGV4KGNvbnRleHQuZGVsdGEsIGNoaWxkLmNoaWxkTmFtZSwgY2hpbGQucmVzdWx0KTtcbiAgICB9XG4gICAgaWYgKGRlbHRhW25hbWVdICE9PSBjaGlsZC5yZXN1bHQpIHtcbiAgICAgIGRlbHRhW25hbWVdID0gY2hpbGQucmVzdWx0O1xuICAgIH1cbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChkZWx0YSkuZXhpdCgpO1xufTtcbmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdhcnJheXNDb2xsZWN0Q2hpbGRyZW4nO1xuXG5leHBvcnRzLmRpZmZGaWx0ZXIgPSBkaWZmRmlsdGVyO1xuZXhwb3J0cy5wYXRjaEZpbHRlciA9IHBhdGNoRmlsdGVyO1xuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblBhdGNoRmlsdGVyO1xuZXhwb3J0cy5yZXZlcnNlRmlsdGVyID0gcmV2ZXJzZUZpbHRlcjtcbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuUmV2ZXJzZUZpbHRlciA9IGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXI7XG4iLCJ2YXIgZGlmZkZpbHRlciA9IGZ1bmN0aW9uIGRhdGVzRGlmZkZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0LmxlZnQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgaWYgKGNvbnRleHQucmlnaHQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICBpZiAoY29udGV4dC5sZWZ0LmdldFRpbWUoKSAhPT0gY29udGV4dC5yaWdodC5nZXRUaW1lKCkpIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pO1xuICAgIH1cbiAgICBjb250ZXh0LmV4aXQoKTtcbiAgfSBlbHNlIGlmIChjb250ZXh0LnJpZ2h0IGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gIH1cbn07XG5kaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnZGF0ZXMnO1xuXG5leHBvcnRzLmRpZmZGaWx0ZXIgPSBkaWZmRmlsdGVyO1xuIiwiLypcblxuTENTIGltcGxlbWVudGF0aW9uIHRoYXQgc3VwcG9ydHMgYXJyYXlzIG9yIHN0cmluZ3NcblxucmVmZXJlbmNlOiBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xvbmdlc3RfY29tbW9uX3N1YnNlcXVlbmNlX3Byb2JsZW1cblxuKi9cblxudmFyIGRlZmF1bHRNYXRjaCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyLCBpbmRleDEsIGluZGV4Mikge1xuICByZXR1cm4gYXJyYXkxW2luZGV4MV0gPT09IGFycmF5MltpbmRleDJdO1xufTtcblxudmFyIGxlbmd0aE1hdHJpeCA9IGZ1bmN0aW9uKGFycmF5MSwgYXJyYXkyLCBtYXRjaCwgY29udGV4dCkge1xuICB2YXIgbGVuMSA9IGFycmF5MS5sZW5ndGg7XG4gIHZhciBsZW4yID0gYXJyYXkyLmxlbmd0aDtcbiAgdmFyIHgsIHk7XG5cbiAgLy8gaW5pdGlhbGl6ZSBlbXB0eSBtYXRyaXggb2YgbGVuMSsxIHggbGVuMisxXG4gIHZhciBtYXRyaXggPSBbbGVuMSArIDFdO1xuICBmb3IgKHggPSAwOyB4IDwgbGVuMSArIDE7IHgrKykge1xuICAgIG1hdHJpeFt4XSA9IFtsZW4yICsgMV07XG4gICAgZm9yICh5ID0gMDsgeSA8IGxlbjIgKyAxOyB5KyspIHtcbiAgICAgIG1hdHJpeFt4XVt5XSA9IDA7XG4gICAgfVxuICB9XG4gIG1hdHJpeC5tYXRjaCA9IG1hdGNoO1xuICAvLyBzYXZlIHNlcXVlbmNlIGxlbmd0aHMgZm9yIGVhY2ggY29vcmRpbmF0ZVxuICBmb3IgKHggPSAxOyB4IDwgbGVuMSArIDE7IHgrKykge1xuICAgIGZvciAoeSA9IDE7IHkgPCBsZW4yICsgMTsgeSsrKSB7XG4gICAgICBpZiAobWF0Y2goYXJyYXkxLCBhcnJheTIsIHggLSAxLCB5IC0gMSwgY29udGV4dCkpIHtcbiAgICAgICAgbWF0cml4W3hdW3ldID0gbWF0cml4W3ggLSAxXVt5IC0gMV0gKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWF0cml4W3hdW3ldID0gTWF0aC5tYXgobWF0cml4W3ggLSAxXVt5XSwgbWF0cml4W3hdW3kgLSAxXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBtYXRyaXg7XG59O1xuXG52YXIgYmFja3RyYWNrID0gZnVuY3Rpb24obWF0cml4LCBhcnJheTEsIGFycmF5MiwgaW5kZXgxLCBpbmRleDIsIGNvbnRleHQpIHtcbiAgaWYgKGluZGV4MSA9PT0gMCB8fCBpbmRleDIgPT09IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2VxdWVuY2U6IFtdLFxuICAgICAgaW5kaWNlczE6IFtdLFxuICAgICAgaW5kaWNlczI6IFtdXG4gICAgfTtcbiAgfVxuXG4gIGlmIChtYXRyaXgubWF0Y2goYXJyYXkxLCBhcnJheTIsIGluZGV4MSAtIDEsIGluZGV4MiAtIDEsIGNvbnRleHQpKSB7XG4gICAgdmFyIHN1YnNlcXVlbmNlID0gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGluZGV4MSAtIDEsIGluZGV4MiAtIDEsIGNvbnRleHQpO1xuICAgIHN1YnNlcXVlbmNlLnNlcXVlbmNlLnB1c2goYXJyYXkxW2luZGV4MSAtIDFdKTtcbiAgICBzdWJzZXF1ZW5jZS5pbmRpY2VzMS5wdXNoKGluZGV4MSAtIDEpO1xuICAgIHN1YnNlcXVlbmNlLmluZGljZXMyLnB1c2goaW5kZXgyIC0gMSk7XG4gICAgcmV0dXJuIHN1YnNlcXVlbmNlO1xuICB9XG5cbiAgaWYgKG1hdHJpeFtpbmRleDFdW2luZGV4MiAtIDFdID4gbWF0cml4W2luZGV4MSAtIDFdW2luZGV4Ml0pIHtcbiAgICByZXR1cm4gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGluZGV4MSwgaW5kZXgyIC0gMSwgY29udGV4dCk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhY2t0cmFjayhtYXRyaXgsIGFycmF5MSwgYXJyYXkyLCBpbmRleDEgLSAxLCBpbmRleDIsIGNvbnRleHQpO1xuICB9XG59O1xuXG52YXIgZ2V0ID0gZnVuY3Rpb24oYXJyYXkxLCBhcnJheTIsIG1hdGNoLCBjb250ZXh0KSB7XG4gIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xuICB2YXIgbWF0cml4ID0gbGVuZ3RoTWF0cml4KGFycmF5MSwgYXJyYXkyLCBtYXRjaCB8fCBkZWZhdWx0TWF0Y2gsIGNvbnRleHQpO1xuICB2YXIgcmVzdWx0ID0gYmFja3RyYWNrKG1hdHJpeCwgYXJyYXkxLCBhcnJheTIsIGFycmF5MS5sZW5ndGgsIGFycmF5Mi5sZW5ndGgsIGNvbnRleHQpO1xuICBpZiAodHlwZW9mIGFycmF5MSA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIGFycmF5MiA9PT0gJ3N0cmluZycpIHtcbiAgICByZXN1bHQuc2VxdWVuY2UgPSByZXN1bHQuc2VxdWVuY2Uuam9pbignJyk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydHMuZ2V0ID0gZ2V0O1xuIiwidmFyIERpZmZDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvZGlmZicpLkRpZmZDb250ZXh0O1xudmFyIFBhdGNoQ29udGV4dCA9IHJlcXVpcmUoJy4uL2NvbnRleHRzL3BhdGNoJykuUGF0Y2hDb250ZXh0O1xudmFyIFJldmVyc2VDb250ZXh0ID0gcmVxdWlyZSgnLi4vY29udGV4dHMvcmV2ZXJzZScpLlJldmVyc2VDb250ZXh0O1xuXG52YXIgY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlciA9IGZ1bmN0aW9uIGNvbGxlY3RDaGlsZHJlbkRpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuY2hpbGRyZW4pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoO1xuICB2YXIgY2hpbGQ7XG4gIHZhciByZXN1bHQgPSBjb250ZXh0LnJlc3VsdDtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgaWYgKHR5cGVvZiBjaGlsZC5yZXN1bHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmVzdWx0ID0gcmVzdWx0IHx8IHt9O1xuICAgIHJlc3VsdFtjaGlsZC5jaGlsZE5hbWVdID0gY2hpbGQucmVzdWx0O1xuICB9XG4gIGlmIChyZXN1bHQgJiYgY29udGV4dC5sZWZ0SXNBcnJheSkge1xuICAgIHJlc3VsdC5fdCA9ICdhJztcbiAgfVxuICBjb250ZXh0LnNldFJlc3VsdChyZXN1bHQpLmV4aXQoKTtcbn07XG5jb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnY29sbGVjdENoaWxkcmVuJztcblxudmFyIG9iamVjdHNEaWZmRmlsdGVyID0gZnVuY3Rpb24gb2JqZWN0c0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5sZWZ0SXNBcnJheSB8fCBjb250ZXh0LmxlZnRUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBuYW1lLCBjaGlsZDtcbiAgZm9yIChuYW1lIGluIGNvbnRleHQubGVmdCkge1xuICAgIGNoaWxkID0gbmV3IERpZmZDb250ZXh0KGNvbnRleHQubGVmdFtuYW1lXSwgY29udGV4dC5yaWdodFtuYW1lXSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgfVxuICBmb3IgKG5hbWUgaW4gY29udGV4dC5yaWdodCkge1xuICAgIGlmICh0eXBlb2YgY29udGV4dC5sZWZ0W25hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY2hpbGQgPSBuZXcgRGlmZkNvbnRleHQodW5kZWZpbmVkLCBjb250ZXh0LnJpZ2h0W25hbWVdKTtcbiAgICAgIGNvbnRleHQucHVzaChjaGlsZCwgbmFtZSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjb250ZXh0LmNoaWxkcmVuIHx8IGNvbnRleHQuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQodW5kZWZpbmVkKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbm9iamVjdHNEaWZmRmlsdGVyLmZpbHRlck5hbWUgPSAnb2JqZWN0cyc7XG5cbnZhciBwYXRjaEZpbHRlciA9IGZ1bmN0aW9uIG5lc3RlZFBhdGNoRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSwgY2hpbGQ7XG4gIGZvciAobmFtZSBpbiBjb250ZXh0LmRlbHRhKSB7XG4gICAgY2hpbGQgPSBuZXcgUGF0Y2hDb250ZXh0KGNvbnRleHQubGVmdFtuYW1lXSwgY29udGV4dC5kZWx0YVtuYW1lXSk7XG4gICAgY29udGV4dC5wdXNoKGNoaWxkLCBuYW1lKTtcbiAgfVxuICBjb250ZXh0LmV4aXQoKTtcbn07XG5wYXRjaEZpbHRlci5maWx0ZXJOYW1lID0gJ29iamVjdHMnO1xuXG52YXIgY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICghY29udGV4dCB8fCAhY29udGV4dC5jaGlsZHJlbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5fdCkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuZ3RoID0gY29udGV4dC5jaGlsZHJlbi5sZW5ndGg7XG4gIHZhciBjaGlsZDtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgaWYgKGNvbnRleHQubGVmdC5oYXNPd25Qcm9wZXJ0eShjaGlsZC5jaGlsZE5hbWUpICYmIGNoaWxkLnJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBkZWxldGUgY29udGV4dC5sZWZ0W2NoaWxkLmNoaWxkTmFtZV07XG4gICAgfSBlbHNlIGlmIChjb250ZXh0LmxlZnRbY2hpbGQuY2hpbGROYW1lXSAhPT0gY2hpbGQucmVzdWx0KSB7XG4gICAgICBjb250ZXh0LmxlZnRbY2hpbGQuY2hpbGROYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgICB9XG4gIH1cbiAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5sZWZ0KS5leGl0KCk7XG59O1xuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIuZmlsdGVyTmFtZSA9ICdjb2xsZWN0Q2hpbGRyZW4nO1xuXG52YXIgcmV2ZXJzZUZpbHRlciA9IGZ1bmN0aW9uIG5lc3RlZFJldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lLCBjaGlsZDtcbiAgZm9yIChuYW1lIGluIGNvbnRleHQuZGVsdGEpIHtcbiAgICBjaGlsZCA9IG5ldyBSZXZlcnNlQ29udGV4dChjb250ZXh0LmRlbHRhW25hbWVdKTtcbiAgICBjb250ZXh0LnB1c2goY2hpbGQsIG5hbWUpO1xuICB9XG4gIGNvbnRleHQuZXhpdCgpO1xufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICdvYmplY3RzJztcblxudmFyIGNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKCFjb250ZXh0IHx8ICFjb250ZXh0LmNoaWxkcmVuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLl90KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW5ndGggPSBjb250ZXh0LmNoaWxkcmVuLmxlbmd0aDtcbiAgdmFyIGNoaWxkO1xuICB2YXIgZGVsdGEgPSB7fTtcbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIGNoaWxkID0gY29udGV4dC5jaGlsZHJlbltpbmRleF07XG4gICAgaWYgKGRlbHRhW2NoaWxkLmNoaWxkTmFtZV0gIT09IGNoaWxkLnJlc3VsdCkge1xuICAgICAgZGVsdGFbY2hpbGQuY2hpbGROYW1lXSA9IGNoaWxkLnJlc3VsdDtcbiAgICB9XG4gIH1cbiAgY29udGV4dC5zZXRSZXN1bHQoZGVsdGEpLmV4aXQoKTtcbn07XG5jb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyLmZpbHRlck5hbWUgPSAnY29sbGVjdENoaWxkcmVuJztcblxuZXhwb3J0cy5jb2xsZWN0Q2hpbGRyZW5EaWZmRmlsdGVyID0gY29sbGVjdENoaWxkcmVuRGlmZkZpbHRlcjtcbmV4cG9ydHMub2JqZWN0c0RpZmZGaWx0ZXIgPSBvYmplY3RzRGlmZkZpbHRlcjtcbmV4cG9ydHMucGF0Y2hGaWx0ZXIgPSBwYXRjaEZpbHRlcjtcbmV4cG9ydHMuY29sbGVjdENoaWxkcmVuUGF0Y2hGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5QYXRjaEZpbHRlcjtcbmV4cG9ydHMucmV2ZXJzZUZpbHRlciA9IHJldmVyc2VGaWx0ZXI7XG5leHBvcnRzLmNvbGxlY3RDaGlsZHJlblJldmVyc2VGaWx0ZXIgPSBjb2xsZWN0Q2hpbGRyZW5SZXZlcnNlRmlsdGVyO1xuIiwiLyogZ2xvYmFsIGRpZmZfbWF0Y2hfcGF0Y2ggKi9cbnZhciBURVhUX0RJRkYgPSAyO1xudmFyIERFRkFVTFRfTUlOX0xFTkdUSCA9IDYwO1xudmFyIGNhY2hlZERpZmZQYXRjaCA9IG51bGw7XG5cbnZhciBnZXREaWZmTWF0Y2hQYXRjaCA9IGZ1bmN0aW9uKHJlcXVpcmVkKSB7XG4gIC8qanNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cblxuICBpZiAoIWNhY2hlZERpZmZQYXRjaCkge1xuICAgIHZhciBpbnN0YW5jZTtcbiAgICBpZiAodHlwZW9mIGRpZmZfbWF0Y2hfcGF0Y2ggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBhbHJlYWR5IGxvYWRlZCwgcHJvYmFibHkgYSBicm93c2VyXG4gICAgICBpbnN0YW5jZSA9IHR5cGVvZiBkaWZmX21hdGNoX3BhdGNoID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgbmV3IGRpZmZfbWF0Y2hfcGF0Y2goKSA6IG5ldyBkaWZmX21hdGNoX3BhdGNoLmRpZmZfbWF0Y2hfcGF0Y2goKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXF1aXJlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgZG1wTW9kdWxlTmFtZSA9ICdkaWZmX21hdGNoX3BhdGNoX3VuY29tcHJlc3NlZCc7XG4gICAgICAgIHZhciBkbXAgPSByZXF1aXJlKCcuLi8uLi9wdWJsaWMvZXh0ZXJuYWwvJyArIGRtcE1vZHVsZU5hbWUpO1xuICAgICAgICBpbnN0YW5jZSA9IG5ldyBkbXAuZGlmZl9tYXRjaF9wYXRjaCgpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGluc3RhbmNlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFpbnN0YW5jZSkge1xuICAgICAgaWYgKCFyZXF1aXJlZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcigndGV4dCBkaWZmX21hdGNoX3BhdGNoIGxpYnJhcnkgbm90IGZvdW5kJyk7XG4gICAgICBlcnJvci5kaWZmX21hdGNoX3BhdGNoX25vdF9mb3VuZCA9IHRydWU7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gICAgY2FjaGVkRGlmZlBhdGNoID0ge1xuICAgICAgZGlmZjogZnVuY3Rpb24odHh0MSwgdHh0Mikge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UucGF0Y2hfdG9UZXh0KGluc3RhbmNlLnBhdGNoX21ha2UodHh0MSwgdHh0MikpO1xuICAgICAgfSxcbiAgICAgIHBhdGNoOiBmdW5jdGlvbih0eHQxLCBwYXRjaCkge1xuICAgICAgICB2YXIgcmVzdWx0cyA9IGluc3RhbmNlLnBhdGNoX2FwcGx5KGluc3RhbmNlLnBhdGNoX2Zyb21UZXh0KHBhdGNoKSwgdHh0MSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0c1sxXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmICghcmVzdWx0c1sxXVtpXSkge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCd0ZXh0IHBhdGNoIGZhaWxlZCcpO1xuICAgICAgICAgICAgZXJyb3IudGV4dFBhdGNoRmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHNbMF07XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICByZXR1cm4gY2FjaGVkRGlmZlBhdGNoO1xufTtcblxudmFyIGRpZmZGaWx0ZXIgPSBmdW5jdGlvbiB0ZXh0c0RpZmZGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5sZWZ0VHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1pbkxlbmd0aCA9IChjb250ZXh0Lm9wdGlvbnMgJiYgY29udGV4dC5vcHRpb25zLnRleHREaWZmICYmXG4gICAgY29udGV4dC5vcHRpb25zLnRleHREaWZmLm1pbkxlbmd0aCkgfHwgREVGQVVMVF9NSU5fTEVOR1RIO1xuICBpZiAoY29udGV4dC5sZWZ0Lmxlbmd0aCA8IG1pbkxlbmd0aCB8fFxuICAgIGNvbnRleHQucmlnaHQubGVuZ3RoIDwgbWluTGVuZ3RoKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gbGFyZ2UgdGV4dCwgdHJ5IHRvIHVzZSBhIHRleHQtZGlmZiBhbGdvcml0aG1cbiAgdmFyIGRpZmZNYXRjaFBhdGNoID0gZ2V0RGlmZk1hdGNoUGF0Y2goKTtcbiAgaWYgKCFkaWZmTWF0Y2hQYXRjaCkge1xuICAgIC8vIGRpZmYtbWF0Y2gtcGF0Y2ggbGlicmFyeSBub3QgYXZhaWxhYmxlLCBmYWxsYmFjayB0byByZWd1bGFyIHN0cmluZyByZXBsYWNlXG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGRpZmYgPSBkaWZmTWF0Y2hQYXRjaC5kaWZmO1xuICBjb250ZXh0LnNldFJlc3VsdChbZGlmZihjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHQpLCAwLCBURVhUX0RJRkZdKS5leGl0KCk7XG59O1xuZGlmZkZpbHRlci5maWx0ZXJOYW1lID0gJ3RleHRzJztcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gdGV4dHNQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmIChjb250ZXh0Lm5lc3RlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YVsyXSAhPT0gVEVYVF9ESUZGKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gdGV4dC1kaWZmLCB1c2UgYSB0ZXh0LXBhdGNoIGFsZ29yaXRobVxuICB2YXIgcGF0Y2ggPSBnZXREaWZmTWF0Y2hQYXRjaCh0cnVlKS5wYXRjaDtcbiAgY29udGV4dC5zZXRSZXN1bHQocGF0Y2goY29udGV4dC5sZWZ0LCBjb250ZXh0LmRlbHRhWzBdKSkuZXhpdCgpO1xufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAndGV4dHMnO1xuXG52YXIgdGV4dERlbHRhUmV2ZXJzZSA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gIHZhciBpLCBsLCBsaW5lcywgbGluZSwgbGluZVRtcCwgaGVhZGVyID0gbnVsbCxcbiAgICBoZWFkZXJSZWdleCA9IC9eQEAgK1xcLShcXGQrKSwoXFxkKykgK1xcKyhcXGQrKSwoXFxkKykgK0BAJC8sXG4gICAgbGluZUhlYWRlciwgbGluZUFkZCwgbGluZVJlbW92ZTtcbiAgbGluZXMgPSBkZWx0YS5zcGxpdCgnXFxuJyk7XG4gIGZvciAoaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgdmFyIGxpbmVTdGFydCA9IGxpbmUuc2xpY2UoMCwgMSk7XG4gICAgaWYgKGxpbmVTdGFydCA9PT0gJ0AnKSB7XG4gICAgICBoZWFkZXIgPSBoZWFkZXJSZWdleC5leGVjKGxpbmUpO1xuICAgICAgbGluZUhlYWRlciA9IGk7XG4gICAgICBsaW5lQWRkID0gbnVsbDtcbiAgICAgIGxpbmVSZW1vdmUgPSBudWxsO1xuXG4gICAgICAvLyBmaXggaGVhZGVyXG4gICAgICBsaW5lc1tsaW5lSGVhZGVyXSA9ICdAQCAtJyArIGhlYWRlclszXSArICcsJyArIGhlYWRlcls0XSArICcgKycgKyBoZWFkZXJbMV0gKyAnLCcgKyBoZWFkZXJbMl0gKyAnIEBAJztcbiAgICB9IGVsc2UgaWYgKGxpbmVTdGFydCA9PT0gJysnKSB7XG4gICAgICBsaW5lQWRkID0gaTtcbiAgICAgIGxpbmVzW2ldID0gJy0nICsgbGluZXNbaV0uc2xpY2UoMSk7XG4gICAgICBpZiAobGluZXNbaSAtIDFdLnNsaWNlKDAsIDEpID09PSAnKycpIHtcbiAgICAgICAgLy8gc3dhcCBsaW5lcyB0byBrZWVwIGRlZmF1bHQgb3JkZXIgKC0rKVxuICAgICAgICBsaW5lVG1wID0gbGluZXNbaV07XG4gICAgICAgIGxpbmVzW2ldID0gbGluZXNbaSAtIDFdO1xuICAgICAgICBsaW5lc1tpIC0gMV0gPSBsaW5lVG1wO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobGluZVN0YXJ0ID09PSAnLScpIHtcbiAgICAgIGxpbmVSZW1vdmUgPSBpO1xuICAgICAgbGluZXNbaV0gPSAnKycgKyBsaW5lc1tpXS5zbGljZSgxKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xufTtcblxudmFyIHJldmVyc2VGaWx0ZXIgPSBmdW5jdGlvbiB0ZXh0c1JldmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAoY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGFbMl0gIT09IFRFWFRfRElGRikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIHRleHQtZGlmZiwgdXNlIGEgdGV4dC1kaWZmIGFsZ29yaXRobVxuICBjb250ZXh0LnNldFJlc3VsdChbdGV4dERlbHRhUmV2ZXJzZShjb250ZXh0LmRlbHRhWzBdKSwgMCwgVEVYVF9ESUZGXSkuZXhpdCgpO1xufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0ZXh0cyc7XG5cbmV4cG9ydHMuZGlmZkZpbHRlciA9IGRpZmZGaWx0ZXI7XG5leHBvcnRzLnBhdGNoRmlsdGVyID0gcGF0Y2hGaWx0ZXI7XG5leHBvcnRzLnJldmVyc2VGaWx0ZXIgPSByZXZlcnNlRmlsdGVyO1xuIiwidmFyIGlzQXJyYXkgPSAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpID9cbiAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICBBcnJheS5pc0FycmF5IDpcbiAgLy8gdXNlIGluc3RhbmNlb2Ygb3BlcmF0b3JcbiAgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXk7XG4gIH07XG5cbnZhciBkaWZmRmlsdGVyID0gZnVuY3Rpb24gdHJpdmlhbE1hdGNoZXNEaWZmRmlsdGVyKGNvbnRleHQpIHtcbiAgaWYgKGNvbnRleHQubGVmdCA9PT0gY29udGV4dC5yaWdodCkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIGNvbnRleHQubGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGNvbnRleHQucmlnaHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZnVuY3Rpb25zIGFyZSBub3Qgc3VwcG9ydGVkJyk7XG4gICAgfVxuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIGNvbnRleHQucmlnaHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgMCwgMF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiBjb250ZXh0LmxlZnQgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGNvbnRleHQucmlnaHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2Z1bmN0aW9ucyBhcmUgbm90IHN1cHBvcnRlZCcpO1xuICB9XG4gIGNvbnRleHQubGVmdFR5cGUgPSBjb250ZXh0LmxlZnQgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29udGV4dC5sZWZ0O1xuICBjb250ZXh0LnJpZ2h0VHlwZSA9IGNvbnRleHQucmlnaHQgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgY29udGV4dC5yaWdodDtcbiAgaWYgKGNvbnRleHQubGVmdFR5cGUgIT09IGNvbnRleHQucmlnaHRUeXBlKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQubGVmdCwgY29udGV4dC5yaWdodF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQubGVmdFR5cGUgPT09ICdib29sZWFuJyB8fCBjb250ZXh0LmxlZnRUeXBlID09PSAnbnVtYmVyJykge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmxlZnQsIGNvbnRleHQucmlnaHRdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmxlZnRUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnRleHQubGVmdElzQXJyYXkgPSBpc0FycmF5KGNvbnRleHQubGVmdCk7XG4gIH1cbiAgaWYgKGNvbnRleHQucmlnaHRUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGNvbnRleHQucmlnaHRJc0FycmF5ID0gaXNBcnJheShjb250ZXh0LnJpZ2h0KTtcbiAgfVxuICBpZiAoY29udGV4dC5sZWZ0SXNBcnJheSAhPT0gY29udGV4dC5yaWdodElzQXJyYXkpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChbY29udGV4dC5sZWZ0LCBjb250ZXh0LnJpZ2h0XSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxufTtcbmRpZmZGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0cml2aWFsJztcblxudmFyIHBhdGNoRmlsdGVyID0gZnVuY3Rpb24gdHJpdmlhbE1hdGNoZXNQYXRjaEZpbHRlcihjb250ZXh0KSB7XG4gIGlmICh0eXBlb2YgY29udGV4dC5kZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb250ZXh0LnNldFJlc3VsdChjb250ZXh0LmxlZnQpLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5uZXN0ZWQgPSAhaXNBcnJheShjb250ZXh0LmRlbHRhKTtcbiAgaWYgKGNvbnRleHQubmVzdGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KGNvbnRleHQuZGVsdGFbMF0pLmV4aXQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAyKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5kZWx0YVsxXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDMgJiYgY29udGV4dC5kZWx0YVsyXSA9PT0gMCkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KHVuZGVmaW5lZCkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxufTtcbnBhdGNoRmlsdGVyLmZpbHRlck5hbWUgPSAndHJpdmlhbCc7XG5cbnZhciByZXZlcnNlRmlsdGVyID0gZnVuY3Rpb24gdHJpdmlhbFJlZmVyc2VGaWx0ZXIoY29udGV4dCkge1xuICBpZiAodHlwZW9mIGNvbnRleHQuZGVsdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoY29udGV4dC5kZWx0YSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm5lc3RlZCA9ICFpc0FycmF5KGNvbnRleHQuZGVsdGEpO1xuICBpZiAoY29udGV4dC5uZXN0ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNvbnRleHQuZGVsdGEubGVuZ3RoID09PSAxKSB7XG4gICAgY29udGV4dC5zZXRSZXN1bHQoW2NvbnRleHQuZGVsdGFbMF0sIDAsIDBdKS5leGl0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjb250ZXh0LmRlbHRhLmxlbmd0aCA9PT0gMikge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmRlbHRhWzFdLCBjb250ZXh0LmRlbHRhWzBdXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY29udGV4dC5kZWx0YS5sZW5ndGggPT09IDMgJiYgY29udGV4dC5kZWx0YVsyXSA9PT0gMCkge1xuICAgIGNvbnRleHQuc2V0UmVzdWx0KFtjb250ZXh0LmRlbHRhWzBdXSkuZXhpdCgpO1xuICAgIHJldHVybjtcbiAgfVxufTtcbnJldmVyc2VGaWx0ZXIuZmlsdGVyTmFtZSA9ICd0cml2aWFsJztcblxuZXhwb3J0cy5kaWZmRmlsdGVyID0gZGlmZkZpbHRlcjtcbmV4cG9ydHMucGF0Y2hGaWx0ZXIgPSBwYXRjaEZpbHRlcjtcbmV4cG9ydHMucmV2ZXJzZUZpbHRlciA9IHJldmVyc2VGaWx0ZXI7XG4iLCJcbnZhciBlbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4vZW52aXJvbm1lbnQnKTtcblxudmFyIERpZmZQYXRjaGVyID0gcmVxdWlyZSgnLi9kaWZmcGF0Y2hlcicpLkRpZmZQYXRjaGVyO1xuZXhwb3J0cy5EaWZmUGF0Y2hlciA9IERpZmZQYXRjaGVyO1xuXG5leHBvcnRzLmNyZWF0ZSA9IGZ1bmN0aW9uKG9wdGlvbnMpe1xuXHRyZXR1cm4gbmV3IERpZmZQYXRjaGVyKG9wdGlvbnMpO1xufTtcblxuZXhwb3J0cy5kYXRlUmV2aXZlciA9IHJlcXVpcmUoJy4vZGF0ZS1yZXZpdmVyJyk7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZGlmZiA9IGZ1bmN0aW9uKCkge1xuXHRpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuXHRcdGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBEaWZmUGF0Y2hlcigpO1xuXHR9XG5cdHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZGlmZi5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnBhdGNoID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5wYXRjaC5hcHBseShkZWZhdWx0SW5zdGFuY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5leHBvcnRzLnVucGF0Y2ggPSBmdW5jdGlvbigpIHtcblx0aWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcblx0XHRkZWZhdWx0SW5zdGFuY2UgPSBuZXcgRGlmZlBhdGNoZXIoKTtcblx0fVxuXHRyZXR1cm4gZGVmYXVsdEluc3RhbmNlLnVucGF0Y2guYXBwbHkoZGVmYXVsdEluc3RhbmNlLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0cy5yZXZlcnNlID0gZnVuY3Rpb24oKSB7XG5cdGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG5cdFx0ZGVmYXVsdEluc3RhbmNlID0gbmV3IERpZmZQYXRjaGVyKCk7XG5cdH1cblx0cmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5yZXZlcnNlLmFwcGx5KGRlZmF1bHRJbnN0YW5jZSwgYXJndW1lbnRzKTtcbn07XG5cbmlmIChlbnZpcm9ubWVudC5pc0Jyb3dzZXIpIHtcblx0ZXhwb3J0cy5ob21lcGFnZSA9ICd7e3BhY2thZ2UtaG9tZXBhZ2V9fSc7XG5cdGV4cG9ydHMudmVyc2lvbiA9ICd7e3BhY2thZ2UtdmVyc2lvbn19Jztcbn0gZWxzZSB7XG5cdHZhciBwYWNrYWdlSW5mb01vZHVsZU5hbWUgPSAnLi4vcGFja2FnZS5qc29uJztcblx0dmFyIHBhY2thZ2VJbmZvID0gcmVxdWlyZShwYWNrYWdlSW5mb01vZHVsZU5hbWUpO1xuXHRleHBvcnRzLmhvbWVwYWdlID0gcGFja2FnZUluZm8uaG9tZXBhZ2U7XG5cdGV4cG9ydHMudmVyc2lvbiA9IHBhY2thZ2VJbmZvLnZlcnNpb247XG5cblx0dmFyIGZvcm1hdHRlck1vZHVsZU5hbWUgPSAnLi9mb3JtYXR0ZXJzJztcblx0dmFyIGZvcm1hdHRlcnMgPSByZXF1aXJlKGZvcm1hdHRlck1vZHVsZU5hbWUpO1xuXHRleHBvcnRzLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuXHQvLyBzaG9ydGN1dCBmb3IgY29uc29sZVxuXHRleHBvcnRzLmNvbnNvbGUgPSBmb3JtYXR0ZXJzLmNvbnNvbGU7XG59XG4iLCJ2YXIgUGlwZSA9IGZ1bmN0aW9uIFBpcGUobmFtZSkge1xuICB0aGlzLm5hbWUgPSBuYW1lO1xuICB0aGlzLmZpbHRlcnMgPSBbXTtcbn07XG5cblBpcGUucHJvdG90eXBlLnByb2Nlc3MgPSBmdW5jdGlvbihpbnB1dCkge1xuICBpZiAoIXRoaXMucHJvY2Vzc29yKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhZGQgdGhpcyBwaXBlIHRvIGEgcHJvY2Vzc29yIGJlZm9yZSB1c2luZyBpdCcpO1xuICB9XG4gIHZhciBkZWJ1ZyA9IHRoaXMuZGVidWc7XG4gIHZhciBsZW5ndGggPSB0aGlzLmZpbHRlcnMubGVuZ3RoO1xuICB2YXIgY29udGV4dCA9IGlucHV0O1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGZpbHRlciA9IHRoaXMuZmlsdGVyc1tpbmRleF07XG4gICAgaWYgKGRlYnVnKSB7XG4gICAgICB0aGlzLmxvZygnZmlsdGVyOiAnICsgZmlsdGVyLmZpbHRlck5hbWUpO1xuICAgIH1cbiAgICBmaWx0ZXIoY29udGV4dCk7XG4gICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSAnb2JqZWN0JyAmJiBjb250ZXh0LmV4aXRpbmcpIHtcbiAgICAgIGNvbnRleHQuZXhpdGluZyA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmICghY29udGV4dC5uZXh0ICYmIHRoaXMucmVzdWx0Q2hlY2spIHtcbiAgICB0aGlzLnJlc3VsdENoZWNrKGNvbnRleHQpO1xuICB9XG59O1xuXG5QaXBlLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbihtc2cpIHtcbiAgY29uc29sZS5sb2coJ1tqc29uZGlmZnBhdGNoXSAnICsgdGhpcy5uYW1lICsgJyBwaXBlLCAnICsgbXNnKTtcbn07XG5cblBpcGUucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZpbHRlcnMucHVzaC5hcHBseSh0aGlzLmZpbHRlcnMsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZpbHRlcnMudW5zaGlmdC5hcHBseSh0aGlzLmZpbHRlcnMsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uKGZpbHRlck5hbWUpIHtcbiAgaWYgKCFmaWx0ZXJOYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdhIGZpbHRlciBuYW1lIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuZmlsdGVycy5sZW5ndGg7IGluZGV4KyspIHtcbiAgICB2YXIgZmlsdGVyID0gdGhpcy5maWx0ZXJzW2luZGV4XTtcbiAgICBpZiAoZmlsdGVyLmZpbHRlck5hbWUgPT09IGZpbHRlck5hbWUpIHtcbiAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKCdmaWx0ZXIgbm90IGZvdW5kOiAnICsgZmlsdGVyTmFtZSk7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5saXN0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuYW1lcyA9IFtdO1xuICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5maWx0ZXJzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgIHZhciBmaWx0ZXIgPSB0aGlzLmZpbHRlcnNbaW5kZXhdO1xuICAgIG5hbWVzLnB1c2goZmlsdGVyLmZpbHRlck5hbWUpO1xuICB9XG4gIHJldHVybiBuYW1lcztcbn07XG5cblBpcGUucHJvdG90eXBlLmFmdGVyID0gZnVuY3Rpb24oZmlsdGVyTmFtZSkge1xuICB2YXIgaW5kZXggPSB0aGlzLmluZGV4T2YoZmlsdGVyTmFtZSk7XG4gIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICBpZiAoIXBhcmFtcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2EgZmlsdGVyIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgcGFyYW1zLnVuc2hpZnQoaW5kZXggKyAxLCAwKTtcbiAgQXJyYXkucHJvdG90eXBlLnNwbGljZS5hcHBseSh0aGlzLmZpbHRlcnMsIHBhcmFtcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUGlwZS5wcm90b3R5cGUuYmVmb3JlID0gZnVuY3Rpb24oZmlsdGVyTmFtZSkge1xuICB2YXIgaW5kZXggPSB0aGlzLmluZGV4T2YoZmlsdGVyTmFtZSk7XG4gIHZhciBwYXJhbXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICBpZiAoIXBhcmFtcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2EgZmlsdGVyIGlzIHJlcXVpcmVkJyk7XG4gIH1cbiAgcGFyYW1zLnVuc2hpZnQoaW5kZXgsIDApO1xuICBBcnJheS5wcm90b3R5cGUuc3BsaWNlLmFwcGx5KHRoaXMuZmlsdGVycywgcGFyYW1zKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmZpbHRlcnMubGVuZ3RoID0gMDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5QaXBlLnByb3RvdHlwZS5zaG91bGRIYXZlUmVzdWx0ID0gZnVuY3Rpb24oc2hvdWxkKSB7XG4gIGlmIChzaG91bGQgPT09IGZhbHNlKSB7XG4gICAgdGhpcy5yZXN1bHRDaGVjayA9IG51bGw7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0aGlzLnJlc3VsdENoZWNrKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwaXBlID0gdGhpcztcbiAgdGhpcy5yZXN1bHRDaGVjayA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQuaGFzUmVzdWx0KSB7XG4gICAgICBjb25zb2xlLmxvZyhjb250ZXh0KTtcbiAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihwaXBlLm5hbWUgKyAnIGZhaWxlZCcpO1xuICAgICAgZXJyb3Iubm9SZXN1bHQgPSB0cnVlO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdGhpcztcbn07XG5cbmV4cG9ydHMuUGlwZSA9IFBpcGU7XG4iLCJcbnZhciBQcm9jZXNzb3IgPSBmdW5jdGlvbiBQcm9jZXNzb3Iob3B0aW9ucyl7XG5cdHRoaXMuc2VsZk9wdGlvbnMgPSBvcHRpb25zO1xuXHR0aGlzLnBpcGVzID0ge307XG59O1xuXG5Qcm9jZXNzb3IucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdGlmIChvcHRpb25zKSB7XG5cdFx0dGhpcy5zZWxmT3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblx0cmV0dXJuIHRoaXMuc2VsZk9wdGlvbnM7XG59O1xuXG5Qcm9jZXNzb3IucHJvdG90eXBlLnBpcGUgPSBmdW5jdGlvbihuYW1lLCBwaXBlKSB7XG5cdGlmICh0eXBlb2YgbmFtZSA9PT0gJ3N0cmluZycpIHtcblx0XHRpZiAodHlwZW9mIHBpcGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5waXBlc1tuYW1lXTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5waXBlc1tuYW1lXSA9IHBpcGU7XG5cdFx0fVxuXHR9XG5cdGlmIChuYW1lICYmIG5hbWUubmFtZSkge1xuXHRcdHBpcGUgPSBuYW1lO1xuXHRcdGlmIChwaXBlLnByb2Nlc3NvciA9PT0gdGhpcykgeyByZXR1cm4gcGlwZTsgfVxuXHRcdHRoaXMucGlwZXNbcGlwZS5uYW1lXSA9IHBpcGU7XG5cdH1cblx0cGlwZS5wcm9jZXNzb3IgPSB0aGlzO1xuXHRyZXR1cm4gcGlwZTtcbn07XG5cblByb2Nlc3Nvci5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uKGlucHV0LCBwaXBlKSB7XG5cdHZhciBjb250ZXh0ID0gaW5wdXQ7XG5cdGNvbnRleHQub3B0aW9ucyA9IHRoaXMub3B0aW9ucygpO1xuXHR2YXIgbmV4dFBpcGUgPSBwaXBlIHx8IGlucHV0LnBpcGUgfHwgJ2RlZmF1bHQnO1xuXHR2YXIgbGFzdFBpcGUsIGxhc3RDb250ZXh0O1xuXHR3aGlsZSAobmV4dFBpcGUpIHtcblx0XHRpZiAodHlwZW9mIGNvbnRleHQubmV4dEFmdGVyQ2hpbGRyZW4gIT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQvLyBjaGlsZHJlbiBwcm9jZXNzZWQgYW5kIGNvbWluZyBiYWNrIHRvIHBhcmVudFxuXHRcdFx0Y29udGV4dC5uZXh0ID0gY29udGV4dC5uZXh0QWZ0ZXJDaGlsZHJlbjtcblx0XHRcdGNvbnRleHQubmV4dEFmdGVyQ2hpbGRyZW4gPSBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0eXBlb2YgbmV4dFBpcGUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRuZXh0UGlwZSA9IHRoaXMucGlwZShuZXh0UGlwZSk7XG5cdFx0fVxuXHRcdG5leHRQaXBlLnByb2Nlc3MoY29udGV4dCk7XG5cdFx0bGFzdENvbnRleHQgPSBjb250ZXh0O1xuXHRcdGxhc3RQaXBlID0gbmV4dFBpcGU7XG5cdFx0bmV4dFBpcGUgPSBudWxsO1xuXHRcdGlmIChjb250ZXh0KSB7XG5cdFx0XHRpZiAoY29udGV4dC5uZXh0KSB7XG5cdFx0XHRcdGNvbnRleHQgPSBjb250ZXh0Lm5leHQ7XG5cdFx0XHRcdG5leHRQaXBlID0gbGFzdENvbnRleHQubmV4dFBpcGUgfHwgY29udGV4dC5waXBlIHx8IGxhc3RQaXBlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gY29udGV4dC5oYXNSZXN1bHQgPyBjb250ZXh0LnJlc3VsdCA6IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydHMuUHJvY2Vzc29yID0gUHJvY2Vzc29yO1xuIl19
