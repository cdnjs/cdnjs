(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('chalk')) :
	typeof define === 'function' && define.amd ? define(['chalk'], factory) :
	(factory(global.chalk));
}(this, (function (chalk) { 'use strict';

chalk = chalk && chalk.hasOwnProperty('default') ? chalk['default'] : chalk;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var diffMatchPatch = createCommonjsModule(function (module) {
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
  // When deleting a large block of text (over ~64 characters), how close do
  // the contents have to be to match the expected contents. (0.0 = perfection,
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

/** @typedef {{0: number, 1: string}} */
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
  text1 = a.chars1;
  text2 = a.chars2;
  var linearray = a.lineArray;

  var diffs = this.diff_main(text1, text2, false, deadline);

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
          diffs.splice(pointer - count_delete - count_insert,
                       count_delete + count_insert);
          pointer = pointer - count_delete - count_insert;
          var a = this.diff_main(text_delete, text_insert, false, deadline);
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
      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
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
      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
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
 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
 *     An object containing the encoded text1, the encoded text2 and
 *     the array of unique strings.
 *     The zeroth element of the array of unique strings is intentionally blank.
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
  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
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
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
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
      lastequality = diffs[pointer][1];
    } else {  // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      }
      // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.
      if (lastequality && (lastequality.length <=
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
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.
  pointer = 1;
  while (pointer < diffs.length) {
    if (diffs[pointer - 1][0] == DIFF_DELETE &&
        diffs[pointer][0] == DIFF_INSERT) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
      if (overlap_length1 >= overlap_length2) {
        if (overlap_length1 >= deletion.length / 2 ||
            overlap_length1 >= insertion.length / 2) {
          // Overlap found.  Insert an equality and trim the surrounding edits.
          diffs.splice(pointer, 0,
              [DIFF_EQUAL, insertion.substring(0, overlap_length1)]);
          diffs[pointer - 1][1] =
              deletion.substring(0, deletion.length - overlap_length1);
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (overlap_length2 >= deletion.length / 2 ||
            overlap_length2 >= insertion.length / 2) {
          // Reverse overlap found.
          // Insert an equality and swap and trim the surrounding edits.
          diffs.splice(pointer, 0,
              [DIFF_EQUAL, deletion.substring(0, overlap_length2)]);
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] =
              insertion.substring(0, insertion.length - overlap_length2);
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] =
              deletion.substring(overlap_length2);
          pointer++;
        }
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
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    }

    // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.
    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 &&
        char1.match(diff_match_patch.whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 &&
        char2.match(diff_match_patch.whitespaceRegex_);
    var lineBreak1 = whitespace1 &&
        char1.match(diff_match_patch.linebreakRegex_);
    var lineBreak2 = whitespace2 &&
        char2.match(diff_match_patch.linebreakRegex_);
    var blankLine1 = lineBreak1 &&
        one.match(diff_match_patch.blanklineEndRegex_);
    var blankLine2 = lineBreak2 &&
        two.match(diff_match_patch.blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }
    return 0;
  }

  var pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
        diffs[pointer + 1][0] == DIFF_EQUAL) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1];

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

// Define some regex patterns for matching boundaries.
diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
diff_match_patch.whitespaceRegex_ = /\s/;
diff_match_patch.linebreakRegex_ = /[\r\n]/;
diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

/**
 * Reduce the number of edits by eliminating operationally trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */
diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
  var changes = false;
  var equalities = [];  // Stack of indices where equalities are found.
  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
  /** @type {?string} */
  var lastequality = null;
  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
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
        lastequality = null;
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
        lastequality = null;
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
            diffs.splice(pointer - count_insert,
                count_delete + count_insert, [DIFF_INSERT, text_insert]);
          } else if (count_insert === 0) {
            diffs.splice(pointer - count_delete,
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
        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
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
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
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
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
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
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
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
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
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
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
 */
diff_match_patch.prototype.patch_splitMax = function(patches) {
  var patch_size = this.Match_MaxBits;
  for (var x = 0; x < patches.length; x++) {
    if (patches[x].length1 <= patch_size) {
      continue;
    }
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
};


/**
 * Take a list of patches and return a textual representation.
 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
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
 * Parse a textual representation of patches and return a list of Patch objects.
 * @param {string} textline Text representation of patches.
 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
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


// The following export code was added by @ForbesLindesay
module.exports = diff_match_patch;
module.exports['diff_match_patch'] = diff_match_patch;
module.exports['DIFF_DELETE'] = DIFF_DELETE;
module.exports['DIFF_INSERT'] = DIFF_INSERT;
module.exports['DIFF_EQUAL'] = DIFF_EQUAL;
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
  return typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
};

var classCallCheck$1 = function classCallCheck$$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get$1 = function get$$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits$1 = function inherits$$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn$1 = function possibleConstructorReturn$$1(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
};

var slicedToArray$1 = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray$1 = function toConsumableArray$$1(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }return arr2;
  } else {
    return Array.from(arr);
  }
};

var cov_z93lwrnu3 = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/processor.js',
      hash = '111c186e30b3622bcb132abb50bff6e1e123593a',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/processor.js', statementMap: { '0': { start: { line: 1, column: 16 }, end: { line: 71, column: 3 } }, '1': { start: { line: 3, column: 4 }, end: { line: 3, column: 49 } }, '2': { start: { line: 5, column: 4 }, end: { line: 5, column: 37 } }, '3': { start: { line: 6, column: 4 }, end: { line: 6, column: 20 } }, '4': { start: { line: 9, column: 2 }, end: { line: 69, column: 6 } }, '5': { start: { line: 12, column: 6 }, end: { line: 14, column: 7 } }, '6': { start: { line: 13, column: 8 }, end: { line: 13, column: 36 } }, '7': { start: { line: 15, column: 6 }, end: { line: 15, column: 30 } }, '8': { start: { line: 20, column: 17 }, end: { line: 20, column: 24 } }, '9': { start: { line: 21, column: 6 }, end: { line: 27, column: 7 } }, '10': { start: { line: 22, column: 8 }, end: { line: 26, column: 9 } }, '11': { start: { line: 23, column: 10 }, end: { line: 23, column: 34 } }, '12': { start: { line: 25, column: 10 }, end: { line: 25, column: 34 } }, '13': { start: { line: 28, column: 6 }, end: { line: 34, column: 7 } }, '14': { start: { line: 29, column: 8 }, end: { line: 29, column: 20 } }, '15': { start: { line: 30, column: 8 }, end: { line: 32, column: 9 } }, '16': { start: { line: 31, column: 10 }, end: { line: 31, column: 22 } }, '17': { start: { line: 33, column: 8 }, end: { line: 33, column: 37 } }, '18': { start: { line: 35, column: 6 }, end: { line: 35, column: 28 } }, '19': { start: { line: 36, column: 6 }, end: { line: 36, column: 18 } }, '20': { start: { line: 41, column: 20 }, end: { line: 41, column: 25 } }, '21': { start: { line: 42, column: 6 }, end: { line: 42, column: 39 } }, '22': { start: { line: 43, column: 21 }, end: { line: 43, column: 52 } }, '23': { start: { line: 44, column: 21 }, end: { line: 44, column: 27 } }, '24': { start: { line: 45, column: 24 }, end: { line: 45, column: 30 } }, '25': { start: { line: 46, column: 6 }, end: { line: 66, column: 7 } }, '26': { start: { line: 47, column: 8 }, end: { line: 51, column: 9 } }, '27': { start: { line: 49, column: 10 }, end: { line: 49, column: 51 } }, '28': { start: { line: 50, column: 10 }, end: { line: 50, column: 43 } }, '29': { start: { line: 53, column: 8 }, end: { line: 55, column: 9 } }, '30': { start: { line: 54, column: 10 }, end: { line: 54, column: 41 } }, '31': { start: { line: 56, column: 8 }, end: { line: 56, column: 34 } }, '32': { start: { line: 57, column: 8 }, end: { line: 57, column: 30 } }, '33': { start: { line: 58, column: 8 }, end: { line: 58, column: 28 } }, '34': { start: { line: 59, column: 8 }, end: { line: 59, column: 24 } }, '35': { start: { line: 60, column: 8 }, end: { line: 65, column: 9 } }, '36': { start: { line: 61, column: 10 }, end: { line: 64, column: 11 } }, '37': { start: { line: 62, column: 12 }, end: { line: 62, column: 35 } }, '38': { start: { line: 63, column: 12 }, end: { line: 63, column: 72 } }, '39': { start: { line: 67, column: 6 }, end: { line: 67, column: 60 } }, '40': { start: { line: 70, column: 2 }, end: { line: 70, column: 19 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 1, column: 16 }, end: { line: 1, column: 17 } }, loc: { start: { line: 1, column: 28 }, end: { line: 71, column: 1 } }, line: 1 }, '1': { name: 'Processor', decl: { start: { line: 2, column: 11 }, end: { line: 2, column: 20 } }, loc: { start: { line: 2, column: 30 }, end: { line: 7, column: 3 } }, line: 2 }, '2': { name: 'options', decl: { start: { line: 11, column: 20 }, end: { line: 11, column: 27 } }, loc: { start: { line: 11, column: 38 }, end: { line: 16, column: 5 } }, line: 11 }, '3': { name: 'pipe', decl: { start: { line: 19, column: 20 }, end: { line: 19, column: 24 } }, loc: { start: { line: 19, column: 40 }, end: { line: 37, column: 5 } }, line: 19 }, '4': { name: 'process', decl: { start: { line: 40, column: 20 }, end: { line: 40, column: 27 } }, loc: { start: { line: 40, column: 41 }, end: { line: 68, column: 5 } }, line: 40 } }, branchMap: { '0': { loc: { start: { line: 5, column: 23 }, end: { line: 5, column: 36 } }, type: 'binary-expr', locations: [{ start: { line: 5, column: 23 }, end: { line: 5, column: 30 } }, { start: { line: 5, column: 34 }, end: { line: 5, column: 36 } }], line: 5 }, '1': { loc: { start: { line: 12, column: 6 }, end: { line: 14, column: 7 } }, type: 'if', locations: [{ start: { line: 12, column: 6 }, end: { line: 14, column: 7 } }, { start: { line: 12, column: 6 }, end: { line: 14, column: 7 } }], line: 12 }, '2': { loc: { start: { line: 21, column: 6 }, end: { line: 27, column: 7 } }, type: 'if', locations: [{ start: { line: 21, column: 6 }, end: { line: 27, column: 7 } }, { start: { line: 21, column: 6 }, end: { line: 27, column: 7 } }], line: 21 }, '3': { loc: { start: { line: 22, column: 8 }, end: { line: 26, column: 9 } }, type: 'if', locations: [{ start: { line: 22, column: 8 }, end: { line: 26, column: 9 } }, { start: { line: 22, column: 8 }, end: { line: 26, column: 9 } }], line: 22 }, '4': { loc: { start: { line: 28, column: 6 }, end: { line: 34, column: 7 } }, type: 'if', locations: [{ start: { line: 28, column: 6 }, end: { line: 34, column: 7 } }, { start: { line: 28, column: 6 }, end: { line: 34, column: 7 } }], line: 28 }, '5': { loc: { start: { line: 28, column: 10 }, end: { line: 28, column: 27 } }, type: 'binary-expr', locations: [{ start: { line: 28, column: 10 }, end: { line: 28, column: 14 } }, { start: { line: 28, column: 18 }, end: { line: 28, column: 27 } }], line: 28 }, '6': { loc: { start: { line: 30, column: 8 }, end: { line: 32, column: 9 } }, type: 'if', locations: [{ start: { line: 30, column: 8 }, end: { line: 32, column: 9 } }, { start: { line: 30, column: 8 }, end: { line: 32, column: 9 } }], line: 30 }, '7': { loc: { start: { line: 43, column: 21 }, end: { line: 43, column: 52 } }, type: 'binary-expr', locations: [{ start: { line: 43, column: 21 }, end: { line: 43, column: 25 } }, { start: { line: 43, column: 29 }, end: { line: 43, column: 39 } }, { start: { line: 43, column: 43 }, end: { line: 43, column: 52 } }], line: 43 }, '8': { loc: { start: { line: 47, column: 8 }, end: { line: 51, column: 9 } }, type: 'if', locations: [{ start: { line: 47, column: 8 }, end: { line: 51, column: 9 } }, { start: { line: 47, column: 8 }, end: { line: 51, column: 9 } }], line: 47 }, '9': { loc: { start: { line: 53, column: 8 }, end: { line: 55, column: 9 } }, type: 'if', locations: [{ start: { line: 53, column: 8 }, end: { line: 55, column: 9 } }, { start: { line: 53, column: 8 }, end: { line: 55, column: 9 } }], line: 53 }, '10': { loc: { start: { line: 60, column: 8 }, end: { line: 65, column: 9 } }, type: 'if', locations: [{ start: { line: 60, column: 8 }, end: { line: 65, column: 9 } }, { start: { line: 60, column: 8 }, end: { line: 65, column: 9 } }], line: 60 }, '11': { loc: { start: { line: 61, column: 10 }, end: { line: 64, column: 11 } }, type: 'if', locations: [{ start: { line: 61, column: 10 }, end: { line: 64, column: 11 } }, { start: { line: 61, column: 10 }, end: { line: 64, column: 11 } }], line: 61 }, '12': { loc: { start: { line: 63, column: 23 }, end: { line: 63, column: 71 } }, type: 'binary-expr', locations: [{ start: { line: 63, column: 23 }, end: { line: 63, column: 43 } }, { start: { line: 63, column: 47 }, end: { line: 63, column: 59 } }, { start: { line: 63, column: 63 }, end: { line: 63, column: 71 } }], line: 63 }, '13': { loc: { start: { line: 67, column: 13 }, end: { line: 67, column: 59 } }, type: 'cond-expr', locations: [{ start: { line: 67, column: 33 }, end: { line: 67, column: 47 } }, { start: { line: 67, column: 50 }, end: { line: 67, column: 59 } }], line: 67 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0, 0], '13': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var Processor = (cov_z93lwrnu3.s[0]++, function () {
  cov_z93lwrnu3.f[0]++;function Processor(options) {
    cov_z93lwrnu3.f[1]++;cov_z93lwrnu3.s[1]++;classCallCheck$1(this, Processor);cov_z93lwrnu3.s[2]++;this.selfOptions = (cov_z93lwrnu3.b[0][0]++, options) || (cov_z93lwrnu3.b[0][1]++, {});cov_z93lwrnu3.s[3]++;this.pipes = {};
  }cov_z93lwrnu3.s[4]++;createClass$1(Processor, [{ key: 'options', value: function options(_options) {
      cov_z93lwrnu3.f[2]++;cov_z93lwrnu3.s[5]++;if (_options) {
        cov_z93lwrnu3.b[1][0]++;cov_z93lwrnu3.s[6]++;this.selfOptions = _options;
      } else {
        cov_z93lwrnu3.b[1][1]++;
      }cov_z93lwrnu3.s[7]++;return this.selfOptions;
    } }, { key: 'pipe', value: function pipe(name, pipeArg) {
      cov_z93lwrnu3.f[3]++;var pipe = (cov_z93lwrnu3.s[8]++, pipeArg);cov_z93lwrnu3.s[9]++;if (typeof name === 'string') {
        cov_z93lwrnu3.b[2][0]++;cov_z93lwrnu3.s[10]++;if (typeof pipe === 'undefined') {
          cov_z93lwrnu3.b[3][0]++;cov_z93lwrnu3.s[11]++;return this.pipes[name];
        } else {
          cov_z93lwrnu3.b[3][1]++;cov_z93lwrnu3.s[12]++;this.pipes[name] = pipe;
        }
      } else {
        cov_z93lwrnu3.b[2][1]++;
      }cov_z93lwrnu3.s[13]++;if ((cov_z93lwrnu3.b[5][0]++, name) && (cov_z93lwrnu3.b[5][1]++, name.name)) {
        cov_z93lwrnu3.b[4][0]++;cov_z93lwrnu3.s[14]++;pipe = name;cov_z93lwrnu3.s[15]++;if (pipe.processor === this) {
          cov_z93lwrnu3.b[6][0]++;cov_z93lwrnu3.s[16]++;return pipe;
        } else {
          cov_z93lwrnu3.b[6][1]++;
        }cov_z93lwrnu3.s[17]++;this.pipes[pipe.name] = pipe;
      } else {
        cov_z93lwrnu3.b[4][1]++;
      }cov_z93lwrnu3.s[18]++;pipe.processor = this;cov_z93lwrnu3.s[19]++;return pipe;
    } }, { key: 'process', value: function process(input, pipe) {
      cov_z93lwrnu3.f[4]++;var context = (cov_z93lwrnu3.s[20]++, input);cov_z93lwrnu3.s[21]++;context.options = this.options();var nextPipe = (cov_z93lwrnu3.s[22]++, (cov_z93lwrnu3.b[7][0]++, pipe) || (cov_z93lwrnu3.b[7][1]++, input.pipe) || (cov_z93lwrnu3.b[7][2]++, 'default'));var lastPipe = (cov_z93lwrnu3.s[23]++, void 0);var lastContext = (cov_z93lwrnu3.s[24]++, void 0);cov_z93lwrnu3.s[25]++;while (nextPipe) {
        cov_z93lwrnu3.s[26]++;if (typeof context.nextAfterChildren !== 'undefined') {
          cov_z93lwrnu3.b[8][0]++;cov_z93lwrnu3.s[27]++; // children processed and coming back to parent
          context.next = context.nextAfterChildren;cov_z93lwrnu3.s[28]++;context.nextAfterChildren = null;
        } else {
          cov_z93lwrnu3.b[8][1]++;
        }cov_z93lwrnu3.s[29]++;if (typeof nextPipe === 'string') {
          cov_z93lwrnu3.b[9][0]++;cov_z93lwrnu3.s[30]++;nextPipe = this.pipe(nextPipe);
        } else {
          cov_z93lwrnu3.b[9][1]++;
        }cov_z93lwrnu3.s[31]++;nextPipe.process(context);cov_z93lwrnu3.s[32]++;lastContext = context;cov_z93lwrnu3.s[33]++;lastPipe = nextPipe;cov_z93lwrnu3.s[34]++;nextPipe = null;cov_z93lwrnu3.s[35]++;if (context) {
          cov_z93lwrnu3.b[10][0]++;cov_z93lwrnu3.s[36]++;if (context.next) {
            cov_z93lwrnu3.b[11][0]++;cov_z93lwrnu3.s[37]++;context = context.next;cov_z93lwrnu3.s[38]++;nextPipe = (cov_z93lwrnu3.b[12][0]++, lastContext.nextPipe) || (cov_z93lwrnu3.b[12][1]++, context.pipe) || (cov_z93lwrnu3.b[12][2]++, lastPipe);
          } else {
            cov_z93lwrnu3.b[11][1]++;
          }
        } else {
          cov_z93lwrnu3.b[10][1]++;
        }
      }cov_z93lwrnu3.s[39]++;return context.hasResult ? (cov_z93lwrnu3.b[13][0]++, context.result) : (cov_z93lwrnu3.b[13][1]++, undefined);
    } }]);cov_z93lwrnu3.s[40]++;return Processor;
}());

var cov_mwia6hc6s = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/pipe.js',
      hash = 'd5d521d7630db204b99fa90e5d304ff70726231d',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/pipe.js', statementMap: { '0': { start: { line: 1, column: 11 }, end: { line: 147, column: 3 } }, '1': { start: { line: 3, column: 4 }, end: { line: 3, column: 44 } }, '2': { start: { line: 5, column: 4 }, end: { line: 5, column: 21 } }, '3': { start: { line: 6, column: 4 }, end: { line: 6, column: 22 } }, '4': { start: { line: 9, column: 2 }, end: { line: 145, column: 6 } }, '5': { start: { line: 12, column: 6 }, end: { line: 14, column: 7 } }, '6': { start: { line: 13, column: 8 }, end: { line: 13, column: 72 } }, '7': { start: { line: 15, column: 18 }, end: { line: 15, column: 28 } }, '8': { start: { line: 16, column: 19 }, end: { line: 16, column: 38 } }, '9': { start: { line: 17, column: 20 }, end: { line: 17, column: 25 } }, '10': { start: { line: 18, column: 6 }, end: { line: 28, column: 7 } }, '11': { start: { line: 19, column: 21 }, end: { line: 19, column: 40 } }, '12': { start: { line: 20, column: 8 }, end: { line: 22, column: 9 } }, '13': { start: { line: 21, column: 10 }, end: { line: 21, column: 51 } }, '14': { start: { line: 23, column: 8 }, end: { line: 23, column: 24 } }, '15': { start: { line: 24, column: 8 }, end: { line: 27, column: 9 } }, '16': { start: { line: 25, column: 10 }, end: { line: 25, column: 34 } }, '17': { start: { line: 26, column: 10 }, end: { line: 26, column: 16 } }, '18': { start: { line: 29, column: 6 }, end: { line: 31, column: 7 } }, '19': { start: { line: 30, column: 8 }, end: { line: 30, column: 34 } }, '20': { start: { line: 36, column: 6 }, end: { line: 36, column: 68 } }, '21': { start: { line: 43, column: 6 }, end: { line: 43, column: 64 } }, '22': { start: { line: 44, column: 6 }, end: { line: 44, column: 18 } }, '23': { start: { line: 51, column: 6 }, end: { line: 51, column: 69 } }, '24': { start: { line: 52, column: 6 }, end: { line: 52, column: 18 } }, '25': { start: { line: 57, column: 6 }, end: { line: 59, column: 7 } }, '26': { start: { line: 58, column: 8 }, end: { line: 58, column: 53 } }, '27': { start: { line: 60, column: 6 }, end: { line: 65, column: 7 } }, '28': { start: { line: 61, column: 21 }, end: { line: 61, column: 40 } }, '29': { start: { line: 62, column: 8 }, end: { line: 64, column: 9 } }, '30': { start: { line: 63, column: 10 }, end: { line: 63, column: 23 } }, '31': { start: { line: 66, column: 6 }, end: { line: 66, column: 57 } }, '32': { start: { line: 71, column: 6 }, end: { line: 73, column: 9 } }, '33': { start: { line: 72, column: 8 }, end: { line: 72, column: 28 } }, '34': { start: { line: 78, column: 18 }, end: { line: 78, column: 42 } }, '35': { start: { line: 79, column: 19 }, end: { line: 79, column: 59 } }, '36': { start: { line: 80, column: 6 }, end: { line: 82, column: 7 } }, '37': { start: { line: 81, column: 8 }, end: { line: 81, column: 48 } }, '38': { start: { line: 83, column: 6 }, end: { line: 83, column: 35 } }, '39': { start: { line: 84, column: 6 }, end: { line: 84, column: 57 } }, '40': { start: { line: 85, column: 6 }, end: { line: 85, column: 18 } }, '41': { start: { line: 90, column: 18 }, end: { line: 90, column: 42 } }, '42': { start: { line: 91, column: 19 }, end: { line: 91, column: 59 } }, '43': { start: { line: 92, column: 6 }, end: { line: 94, column: 7 } }, '44': { start: { line: 93, column: 8 }, end: { line: 93, column: 48 } }, '45': { start: { line: 95, column: 6 }, end: { line: 95, column: 31 } }, '46': { start: { line: 96, column: 6 }, end: { line: 96, column: 57 } }, '47': { start: { line: 97, column: 6 }, end: { line: 97, column: 18 } }, '48': { start: { line: 102, column: 18 }, end: { line: 102, column: 42 } }, '49': { start: { line: 103, column: 19 }, end: { line: 103, column: 59 } }, '50': { start: { line: 104, column: 6 }, end: { line: 106, column: 7 } }, '51': { start: { line: 105, column: 8 }, end: { line: 105, column: 48 } }, '52': { start: { line: 107, column: 6 }, end: { line: 107, column: 31 } }, '53': { start: { line: 108, column: 6 }, end: { line: 108, column: 57 } }, '54': { start: { line: 109, column: 6 }, end: { line: 109, column: 18 } }, '55': { start: { line: 114, column: 18 }, end: { line: 114, column: 42 } }, '56': { start: { line: 115, column: 6 }, end: { line: 115, column: 36 } }, '57': { start: { line: 116, column: 6 }, end: { line: 116, column: 18 } }, '58': { start: { line: 121, column: 6 }, end: { line: 121, column: 30 } }, '59': { start: { line: 122, column: 6 }, end: { line: 122, column: 18 } }, '60': { start: { line: 127, column: 6 }, end: { line: 130, column: 7 } }, '61': { start: { line: 128, column: 8 }, end: { line: 128, column: 32 } }, '62': { start: { line: 129, column: 8 }, end: { line: 129, column: 15 } }, '63': { start: { line: 131, column: 6 }, end: { line: 133, column: 7 } }, '64': { start: { line: 132, column: 8 }, end: { line: 132, column: 15 } }, '65': { start: { line: 134, column: 17 }, end: { line: 134, column: 21 } }, '66': { start: { line: 135, column: 6 }, end: { line: 142, column: 8 } }, '67': { start: { line: 136, column: 8 }, end: { line: 141, column: 9 } }, '68': { start: { line: 137, column: 10 }, end: { line: 137, column: 31 } }, '69': { start: { line: 138, column: 22 }, end: { line: 138, column: 54 } }, '70': { start: { line: 139, column: 10 }, end: { line: 139, column: 32 } }, '71': { start: { line: 140, column: 10 }, end: { line: 140, column: 22 } }, '72': { start: { line: 143, column: 6 }, end: { line: 143, column: 18 } }, '73': { start: { line: 146, column: 2 }, end: { line: 146, column: 14 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 1, column: 11 }, end: { line: 1, column: 12 } }, loc: { start: { line: 1, column: 23 }, end: { line: 147, column: 1 } }, line: 1 }, '1': { name: 'Pipe', decl: { start: { line: 2, column: 11 }, end: { line: 2, column: 15 } }, loc: { start: { line: 2, column: 22 }, end: { line: 7, column: 3 } }, line: 2 }, '2': { name: 'process', decl: { start: { line: 11, column: 20 }, end: { line: 11, column: 27 } }, loc: { start: { line: 11, column: 35 }, end: { line: 32, column: 5 } }, line: 11 }, '3': { name: 'log', decl: { start: { line: 35, column: 20 }, end: { line: 35, column: 23 } }, loc: { start: { line: 35, column: 29 }, end: { line: 37, column: 5 } }, line: 35 }, '4': { name: 'append', decl: { start: { line: 40, column: 20 }, end: { line: 40, column: 26 } }, loc: { start: { line: 40, column: 29 }, end: { line: 45, column: 5 } }, line: 40 }, '5': { name: 'prepend', decl: { start: { line: 48, column: 20 }, end: { line: 48, column: 27 } }, loc: { start: { line: 48, column: 30 }, end: { line: 53, column: 5 } }, line: 48 }, '6': { name: 'indexOf', decl: { start: { line: 56, column: 20 }, end: { line: 56, column: 27 } }, loc: { start: { line: 56, column: 40 }, end: { line: 67, column: 5 } }, line: 56 }, '7': { name: 'list', decl: { start: { line: 70, column: 20 }, end: { line: 70, column: 24 } }, loc: { start: { line: 70, column: 27 }, end: { line: 74, column: 5 } }, line: 70 }, '8': { name: '(anonymous_8)', decl: { start: { line: 71, column: 30 }, end: { line: 71, column: 31 } }, loc: { start: { line: 71, column: 43 }, end: { line: 73, column: 7 } }, line: 71 }, '9': { name: 'after', decl: { start: { line: 77, column: 20 }, end: { line: 77, column: 25 } }, loc: { start: { line: 77, column: 38 }, end: { line: 86, column: 5 } }, line: 77 }, '10': { name: 'before', decl: { start: { line: 89, column: 20 }, end: { line: 89, column: 26 } }, loc: { start: { line: 89, column: 39 }, end: { line: 98, column: 5 } }, line: 89 }, '11': { name: 'replace', decl: { start: { line: 101, column: 20 }, end: { line: 101, column: 27 } }, loc: { start: { line: 101, column: 40 }, end: { line: 110, column: 5 } }, line: 101 }, '12': { name: 'remove', decl: { start: { line: 113, column: 20 }, end: { line: 113, column: 26 } }, loc: { start: { line: 113, column: 39 }, end: { line: 117, column: 5 } }, line: 113 }, '13': { name: 'clear', decl: { start: { line: 120, column: 20 }, end: { line: 120, column: 25 } }, loc: { start: { line: 120, column: 28 }, end: { line: 123, column: 5 } }, line: 120 }, '14': { name: 'shouldHaveResult', decl: { start: { line: 126, column: 20 }, end: { line: 126, column: 36 } }, loc: { start: { line: 126, column: 45 }, end: { line: 144, column: 5 } }, line: 126 }, '15': { name: '(anonymous_15)', decl: { start: { line: 135, column: 25 }, end: { line: 135, column: 26 } }, loc: { start: { line: 135, column: 44 }, end: { line: 142, column: 7 } }, line: 135 } }, branchMap: { '0': { loc: { start: { line: 12, column: 6 }, end: { line: 14, column: 7 } }, type: 'if', locations: [{ start: { line: 12, column: 6 }, end: { line: 14, column: 7 } }, { start: { line: 12, column: 6 }, end: { line: 14, column: 7 } }], line: 12 }, '1': { loc: { start: { line: 20, column: 8 }, end: { line: 22, column: 9 } }, type: 'if', locations: [{ start: { line: 20, column: 8 }, end: { line: 22, column: 9 } }, { start: { line: 20, column: 8 }, end: { line: 22, column: 9 } }], line: 20 }, '2': { loc: { start: { line: 24, column: 8 }, end: { line: 27, column: 9 } }, type: 'if', locations: [{ start: { line: 24, column: 8 }, end: { line: 27, column: 9 } }, { start: { line: 24, column: 8 }, end: { line: 27, column: 9 } }], line: 24 }, '3': { loc: { start: { line: 24, column: 12 }, end: { line: 24, column: 121 } }, type: 'binary-expr', locations: [{ start: { line: 24, column: 12 }, end: { line: 24, column: 102 } }, { start: { line: 24, column: 106 }, end: { line: 24, column: 121 } }], line: 24 }, '4': { loc: { start: { line: 24, column: 13 }, end: { line: 24, column: 88 } }, type: 'cond-expr', locations: [{ start: { line: 24, column: 46 }, end: { line: 24, column: 57 } }, { start: { line: 24, column: 60 }, end: { line: 24, column: 88 } }], line: 24 }, '5': { loc: { start: { line: 29, column: 6 }, end: { line: 31, column: 7 } }, type: 'if', locations: [{ start: { line: 29, column: 6 }, end: { line: 31, column: 7 } }, { start: { line: 29, column: 6 }, end: { line: 31, column: 7 } }], line: 29 }, '6': { loc: { start: { line: 29, column: 10 }, end: { line: 29, column: 43 } }, type: 'binary-expr', locations: [{ start: { line: 29, column: 10 }, end: { line: 29, column: 23 } }, { start: { line: 29, column: 27 }, end: { line: 29, column: 43 } }], line: 29 }, '7': { loc: { start: { line: 57, column: 6 }, end: { line: 59, column: 7 } }, type: 'if', locations: [{ start: { line: 57, column: 6 }, end: { line: 59, column: 7 } }, { start: { line: 57, column: 6 }, end: { line: 59, column: 7 } }], line: 57 }, '8': { loc: { start: { line: 62, column: 8 }, end: { line: 64, column: 9 } }, type: 'if', locations: [{ start: { line: 62, column: 8 }, end: { line: 64, column: 9 } }, { start: { line: 62, column: 8 }, end: { line: 64, column: 9 } }], line: 62 }, '9': { loc: { start: { line: 80, column: 6 }, end: { line: 82, column: 7 } }, type: 'if', locations: [{ start: { line: 80, column: 6 }, end: { line: 82, column: 7 } }, { start: { line: 80, column: 6 }, end: { line: 82, column: 7 } }], line: 80 }, '10': { loc: { start: { line: 92, column: 6 }, end: { line: 94, column: 7 } }, type: 'if', locations: [{ start: { line: 92, column: 6 }, end: { line: 94, column: 7 } }, { start: { line: 92, column: 6 }, end: { line: 94, column: 7 } }], line: 92 }, '11': { loc: { start: { line: 104, column: 6 }, end: { line: 106, column: 7 } }, type: 'if', locations: [{ start: { line: 104, column: 6 }, end: { line: 106, column: 7 } }, { start: { line: 104, column: 6 }, end: { line: 106, column: 7 } }], line: 104 }, '12': { loc: { start: { line: 127, column: 6 }, end: { line: 130, column: 7 } }, type: 'if', locations: [{ start: { line: 127, column: 6 }, end: { line: 130, column: 7 } }, { start: { line: 127, column: 6 }, end: { line: 130, column: 7 } }], line: 127 }, '13': { loc: { start: { line: 131, column: 6 }, end: { line: 133, column: 7 } }, type: 'if', locations: [{ start: { line: 131, column: 6 }, end: { line: 133, column: 7 } }, { start: { line: 131, column: 6 }, end: { line: 133, column: 7 } }], line: 131 }, '14': { loc: { start: { line: 136, column: 8 }, end: { line: 141, column: 9 } }, type: 'if', locations: [{ start: { line: 136, column: 8 }, end: { line: 141, column: 9 } }, { start: { line: 136, column: 8 }, end: { line: 141, column: 9 } }], line: 136 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var Pipe = (cov_mwia6hc6s.s[0]++, function () {
  cov_mwia6hc6s.f[0]++;function Pipe(name) {
    cov_mwia6hc6s.f[1]++;cov_mwia6hc6s.s[1]++;classCallCheck$1(this, Pipe);cov_mwia6hc6s.s[2]++;this.name = name;cov_mwia6hc6s.s[3]++;this.filters = [];
  }cov_mwia6hc6s.s[4]++;createClass$1(Pipe, [{ key: 'process', value: function process(input) {
      cov_mwia6hc6s.f[2]++;cov_mwia6hc6s.s[5]++;if (!this.processor) {
        cov_mwia6hc6s.b[0][0]++;cov_mwia6hc6s.s[6]++;throw new Error('add this pipe to a processor before using it');
      } else {
        cov_mwia6hc6s.b[0][1]++;
      }var debug = (cov_mwia6hc6s.s[7]++, this.debug);var length = (cov_mwia6hc6s.s[8]++, this.filters.length);var context = (cov_mwia6hc6s.s[9]++, input);cov_mwia6hc6s.s[10]++;for (var index = 0; index < length; index++) {
        var filter = (cov_mwia6hc6s.s[11]++, this.filters[index]);cov_mwia6hc6s.s[12]++;if (debug) {
          cov_mwia6hc6s.b[1][0]++;cov_mwia6hc6s.s[13]++;this.log('filter: ' + filter.filterName);
        } else {
          cov_mwia6hc6s.b[1][1]++;
        }cov_mwia6hc6s.s[14]++;filter(context);cov_mwia6hc6s.s[15]++;if ((cov_mwia6hc6s.b[3][0]++, (typeof context === 'undefined' ? (cov_mwia6hc6s.b[4][0]++, 'undefined') : (cov_mwia6hc6s.b[4][1]++, _typeof$1(context))) === 'object') && (cov_mwia6hc6s.b[3][1]++, context.exiting)) {
          cov_mwia6hc6s.b[2][0]++;cov_mwia6hc6s.s[16]++;context.exiting = false;cov_mwia6hc6s.s[17]++;break;
        } else {
          cov_mwia6hc6s.b[2][1]++;
        }
      }cov_mwia6hc6s.s[18]++;if ((cov_mwia6hc6s.b[6][0]++, !context.next) && (cov_mwia6hc6s.b[6][1]++, this.resultCheck)) {
        cov_mwia6hc6s.b[5][0]++;cov_mwia6hc6s.s[19]++;this.resultCheck(context);
      } else {
        cov_mwia6hc6s.b[5][1]++;
      }
    } }, { key: 'log', value: function log(msg) {
      cov_mwia6hc6s.f[3]++;cov_mwia6hc6s.s[20]++;console.log('[jsondiffpatch] ' + this.name + ' pipe, ' + msg);
    } }, { key: 'append', value: function append() {
      cov_mwia6hc6s.f[4]++;var _filters;cov_mwia6hc6s.s[21]++;(_filters = this.filters).push.apply(_filters, arguments);cov_mwia6hc6s.s[22]++;return this;
    } }, { key: 'prepend', value: function prepend() {
      cov_mwia6hc6s.f[5]++;var _filters2;cov_mwia6hc6s.s[23]++;(_filters2 = this.filters).unshift.apply(_filters2, arguments);cov_mwia6hc6s.s[24]++;return this;
    } }, { key: 'indexOf', value: function indexOf(filterName) {
      cov_mwia6hc6s.f[6]++;cov_mwia6hc6s.s[25]++;if (!filterName) {
        cov_mwia6hc6s.b[7][0]++;cov_mwia6hc6s.s[26]++;throw new Error('a filter name is required');
      } else {
        cov_mwia6hc6s.b[7][1]++;
      }cov_mwia6hc6s.s[27]++;for (var index = 0; index < this.filters.length; index++) {
        var filter = (cov_mwia6hc6s.s[28]++, this.filters[index]);cov_mwia6hc6s.s[29]++;if (filter.filterName === filterName) {
          cov_mwia6hc6s.b[8][0]++;cov_mwia6hc6s.s[30]++;return index;
        } else {
          cov_mwia6hc6s.b[8][1]++;
        }
      }cov_mwia6hc6s.s[31]++;throw new Error('filter not found: ' + filterName);
    } }, { key: 'list', value: function list() {
      cov_mwia6hc6s.f[7]++;cov_mwia6hc6s.s[32]++;return this.filters.map(function (f) {
        cov_mwia6hc6s.f[8]++;cov_mwia6hc6s.s[33]++;return f.filterName;
      });
    } }, { key: 'after', value: function after(filterName) {
      cov_mwia6hc6s.f[9]++;var index = (cov_mwia6hc6s.s[34]++, this.indexOf(filterName));var params = (cov_mwia6hc6s.s[35]++, Array.prototype.slice.call(arguments, 1));cov_mwia6hc6s.s[36]++;if (!params.length) {
        cov_mwia6hc6s.b[9][0]++;cov_mwia6hc6s.s[37]++;throw new Error('a filter is required');
      } else {
        cov_mwia6hc6s.b[9][1]++;
      }cov_mwia6hc6s.s[38]++;params.unshift(index + 1, 0);cov_mwia6hc6s.s[39]++;Array.prototype.splice.apply(this.filters, params);cov_mwia6hc6s.s[40]++;return this;
    } }, { key: 'before', value: function before(filterName) {
      cov_mwia6hc6s.f[10]++;var index = (cov_mwia6hc6s.s[41]++, this.indexOf(filterName));var params = (cov_mwia6hc6s.s[42]++, Array.prototype.slice.call(arguments, 1));cov_mwia6hc6s.s[43]++;if (!params.length) {
        cov_mwia6hc6s.b[10][0]++;cov_mwia6hc6s.s[44]++;throw new Error('a filter is required');
      } else {
        cov_mwia6hc6s.b[10][1]++;
      }cov_mwia6hc6s.s[45]++;params.unshift(index, 0);cov_mwia6hc6s.s[46]++;Array.prototype.splice.apply(this.filters, params);cov_mwia6hc6s.s[47]++;return this;
    } }, { key: 'replace', value: function replace(filterName) {
      cov_mwia6hc6s.f[11]++;var index = (cov_mwia6hc6s.s[48]++, this.indexOf(filterName));var params = (cov_mwia6hc6s.s[49]++, Array.prototype.slice.call(arguments, 1));cov_mwia6hc6s.s[50]++;if (!params.length) {
        cov_mwia6hc6s.b[11][0]++;cov_mwia6hc6s.s[51]++;throw new Error('a filter is required');
      } else {
        cov_mwia6hc6s.b[11][1]++;
      }cov_mwia6hc6s.s[52]++;params.unshift(index, 1);cov_mwia6hc6s.s[53]++;Array.prototype.splice.apply(this.filters, params);cov_mwia6hc6s.s[54]++;return this;
    } }, { key: 'remove', value: function remove(filterName) {
      cov_mwia6hc6s.f[12]++;var index = (cov_mwia6hc6s.s[55]++, this.indexOf(filterName));cov_mwia6hc6s.s[56]++;this.filters.splice(index, 1);cov_mwia6hc6s.s[57]++;return this;
    } }, { key: 'clear', value: function clear() {
      cov_mwia6hc6s.f[13]++;cov_mwia6hc6s.s[58]++;this.filters.length = 0;cov_mwia6hc6s.s[59]++;return this;
    } }, { key: 'shouldHaveResult', value: function shouldHaveResult(should) {
      cov_mwia6hc6s.f[14]++;cov_mwia6hc6s.s[60]++;if (should === false) {
        cov_mwia6hc6s.b[12][0]++;cov_mwia6hc6s.s[61]++;this.resultCheck = null;cov_mwia6hc6s.s[62]++;return;
      } else {
        cov_mwia6hc6s.b[12][1]++;
      }cov_mwia6hc6s.s[63]++;if (this.resultCheck) {
        cov_mwia6hc6s.b[13][0]++;cov_mwia6hc6s.s[64]++;return;
      } else {
        cov_mwia6hc6s.b[13][1]++;
      }var pipe = (cov_mwia6hc6s.s[65]++, this);cov_mwia6hc6s.s[66]++;this.resultCheck = function (context) {
        cov_mwia6hc6s.f[15]++;cov_mwia6hc6s.s[67]++;if (!context.hasResult) {
          cov_mwia6hc6s.b[14][0]++;cov_mwia6hc6s.s[68]++;console.log(context);var error = (cov_mwia6hc6s.s[69]++, new Error(pipe.name + ' failed'));cov_mwia6hc6s.s[70]++;error.noResult = true;cov_mwia6hc6s.s[71]++;throw error;
        } else {
          cov_mwia6hc6s.b[14][1]++;
        }
      };cov_mwia6hc6s.s[72]++;return this;
    } }]);cov_mwia6hc6s.s[73]++;return Pipe;
}());

var cov_15dz7p942d = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/contexts/context.js',
      hash = 'd8af74e6f94b0d75ab256641f76a0c75f3293d60',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/contexts/context.js', statementMap: { '0': { start: { line: 3, column: 14 }, end: { line: 56, column: 3 } }, '1': { start: { line: 5, column: 4 }, end: { line: 5, column: 47 } }, '2': { start: { line: 8, column: 2 }, end: { line: 54, column: 6 } }, '3': { start: { line: 11, column: 6 }, end: { line: 11, column: 27 } }, '4': { start: { line: 12, column: 6 }, end: { line: 12, column: 28 } }, '5': { start: { line: 13, column: 6 }, end: { line: 13, column: 18 } }, '6': { start: { line: 18, column: 6 }, end: { line: 18, column: 26 } }, '7': { start: { line: 19, column: 6 }, end: { line: 19, column: 18 } }, '8': { start: { line: 24, column: 6 }, end: { line: 31, column: 7 } }, '9': { start: { line: 25, column: 8 }, end: { line: 25, column: 29 } }, '10': { start: { line: 27, column: 8 }, end: { line: 27, column: 25 } }, '11': { start: { line: 28, column: 8 }, end: { line: 30, column: 9 } }, '12': { start: { line: 29, column: 10 }, end: { line: 29, column: 31 } }, '13': { start: { line: 32, column: 6 }, end: { line: 32, column: 18 } }, '14': { start: { line: 37, column: 6 }, end: { line: 37, column: 26 } }, '15': { start: { line: 38, column: 6 }, end: { line: 40, column: 7 } }, '16': { start: { line: 39, column: 8 }, end: { line: 39, column: 31 } }, '17': { start: { line: 41, column: 6 }, end: { line: 41, column: 37 } }, '18': { start: { line: 42, column: 6 }, end: { line: 42, column: 52 } }, '19': { start: { line: 43, column: 6 }, end: { line: 50, column: 7 } }, '20': { start: { line: 44, column: 8 }, end: { line: 44, column: 32 } }, '21': { start: { line: 45, column: 8 }, end: { line: 45, column: 51 } }, '22': { start: { line: 46, column: 8 }, end: { line: 46, column: 26 } }, '23': { start: { line: 48, column: 8 }, end: { line: 48, column: 61 } }, '24': { start: { line: 49, column: 8 }, end: { line: 49, column: 34 } }, '25': { start: { line: 51, column: 6 }, end: { line: 51, column: 24 } }, '26': { start: { line: 52, column: 6 }, end: { line: 52, column: 18 } }, '27': { start: { line: 55, column: 2 }, end: { line: 55, column: 17 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 3, column: 14 }, end: { line: 3, column: 15 } }, loc: { start: { line: 3, column: 26 }, end: { line: 56, column: 1 } }, line: 3 }, '1': { name: 'Context', decl: { start: { line: 4, column: 11 }, end: { line: 4, column: 18 } }, loc: { start: { line: 4, column: 21 }, end: { line: 6, column: 3 } }, line: 4 }, '2': { name: 'setResult', decl: { start: { line: 10, column: 20 }, end: { line: 10, column: 29 } }, loc: { start: { line: 10, column: 38 }, end: { line: 14, column: 5 } }, line: 10 }, '3': { name: 'exit', decl: { start: { line: 17, column: 20 }, end: { line: 17, column: 24 } }, loc: { start: { line: 17, column: 27 }, end: { line: 20, column: 5 } }, line: 17 }, '4': { name: 'switchTo', decl: { start: { line: 23, column: 20 }, end: { line: 23, column: 28 } }, loc: { start: { line: 23, column: 41 }, end: { line: 33, column: 5 } }, line: 23 }, '5': { name: 'push', decl: { start: { line: 36, column: 20 }, end: { line: 36, column: 24 } }, loc: { start: { line: 36, column: 38 }, end: { line: 53, column: 5 } }, line: 36 } }, branchMap: { '0': { loc: { start: { line: 24, column: 6 }, end: { line: 31, column: 7 } }, type: 'if', locations: [{ start: { line: 24, column: 6 }, end: { line: 31, column: 7 } }, { start: { line: 24, column: 6 }, end: { line: 31, column: 7 } }], line: 24 }, '1': { loc: { start: { line: 24, column: 10 }, end: { line: 24, column: 58 } }, type: 'binary-expr', locations: [{ start: { line: 24, column: 10 }, end: { line: 24, column: 34 } }, { start: { line: 24, column: 38 }, end: { line: 24, column: 58 } }], line: 24 }, '2': { loc: { start: { line: 28, column: 8 }, end: { line: 30, column: 9 } }, type: 'if', locations: [{ start: { line: 28, column: 8 }, end: { line: 30, column: 9 } }, { start: { line: 28, column: 8 }, end: { line: 30, column: 9 } }], line: 28 }, '3': { loc: { start: { line: 38, column: 6 }, end: { line: 40, column: 7 } }, type: 'if', locations: [{ start: { line: 38, column: 6 }, end: { line: 40, column: 7 } }, { start: { line: 38, column: 6 }, end: { line: 40, column: 7 } }], line: 38 }, '4': { loc: { start: { line: 41, column: 19 }, end: { line: 41, column: 36 } }, type: 'binary-expr', locations: [{ start: { line: 41, column: 19 }, end: { line: 41, column: 28 } }, { start: { line: 41, column: 32 }, end: { line: 41, column: 36 } }], line: 41 }, '5': { loc: { start: { line: 42, column: 22 }, end: { line: 42, column: 51 } }, type: 'binary-expr', locations: [{ start: { line: 42, column: 22 }, end: { line: 42, column: 35 } }, { start: { line: 42, column: 39 }, end: { line: 42, column: 51 } }], line: 42 }, '6': { loc: { start: { line: 43, column: 6 }, end: { line: 50, column: 7 } }, type: 'if', locations: [{ start: { line: 43, column: 6 }, end: { line: 50, column: 7 } }, { start: { line: 43, column: 6 }, end: { line: 50, column: 7 } }], line: 43 }, '7': { loc: { start: { line: 45, column: 33 }, end: { line: 45, column: 50 } }, type: 'binary-expr', locations: [{ start: { line: 45, column: 33 }, end: { line: 45, column: 42 } }, { start: { line: 45, column: 46 }, end: { line: 45, column: 50 } }], line: 45 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var Context = (cov_15dz7p942d.s[0]++, function () {
  cov_15dz7p942d.f[0]++;function Context() {
    cov_15dz7p942d.f[1]++;cov_15dz7p942d.s[1]++;classCallCheck$1(this, Context);
  }cov_15dz7p942d.s[2]++;createClass$1(Context, [{ key: 'setResult', value: function setResult(result) {
      cov_15dz7p942d.f[2]++;cov_15dz7p942d.s[3]++;this.result = result;cov_15dz7p942d.s[4]++;this.hasResult = true;cov_15dz7p942d.s[5]++;return this;
    } }, { key: 'exit', value: function exit() {
      cov_15dz7p942d.f[3]++;cov_15dz7p942d.s[6]++;this.exiting = true;cov_15dz7p942d.s[7]++;return this;
    } }, { key: 'switchTo', value: function switchTo(next, pipe) {
      cov_15dz7p942d.f[4]++;cov_15dz7p942d.s[8]++;if ((cov_15dz7p942d.b[1][0]++, typeof next === 'string') || (cov_15dz7p942d.b[1][1]++, next instanceof Pipe)) {
        cov_15dz7p942d.b[0][0]++;cov_15dz7p942d.s[9]++;this.nextPipe = next;
      } else {
        cov_15dz7p942d.b[0][1]++;cov_15dz7p942d.s[10]++;this.next = next;cov_15dz7p942d.s[11]++;if (pipe) {
          cov_15dz7p942d.b[2][0]++;cov_15dz7p942d.s[12]++;this.nextPipe = pipe;
        } else {
          cov_15dz7p942d.b[2][1]++;
        }
      }cov_15dz7p942d.s[13]++;return this;
    } }, { key: 'push', value: function push(child, name) {
      cov_15dz7p942d.f[5]++;cov_15dz7p942d.s[14]++;child.parent = this;cov_15dz7p942d.s[15]++;if (typeof name !== 'undefined') {
        cov_15dz7p942d.b[3][0]++;cov_15dz7p942d.s[16]++;child.childName = name;
      } else {
        cov_15dz7p942d.b[3][1]++;
      }cov_15dz7p942d.s[17]++;child.root = (cov_15dz7p942d.b[4][0]++, this.root) || (cov_15dz7p942d.b[4][1]++, this);cov_15dz7p942d.s[18]++;child.options = (cov_15dz7p942d.b[5][0]++, child.options) || (cov_15dz7p942d.b[5][1]++, this.options);cov_15dz7p942d.s[19]++;if (!this.children) {
        cov_15dz7p942d.b[6][0]++;cov_15dz7p942d.s[20]++;this.children = [child];cov_15dz7p942d.s[21]++;this.nextAfterChildren = (cov_15dz7p942d.b[7][0]++, this.next) || (cov_15dz7p942d.b[7][1]++, null);cov_15dz7p942d.s[22]++;this.next = child;
      } else {
        cov_15dz7p942d.b[6][1]++;cov_15dz7p942d.s[23]++;this.children[this.children.length - 1].next = child;cov_15dz7p942d.s[24]++;this.children.push(child);
      }cov_15dz7p942d.s[25]++;child.next = this;cov_15dz7p942d.s[26]++;return this;
    } }]);cov_15dz7p942d.s[27]++;return Context;
}());

var cov_2ces1qo8h1 = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/clone.js',
      hash = 'b42c839cc01fdbfba8802dced1ea6cd089d41859',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/clone.js', statementMap: { '0': { start: { line: 1, column: 14 }, end: { line: 3, column: 1 } }, '1': { start: { line: 2, column: 2 }, end: { line: 2, column: 28 } }, '2': { start: { line: 6, column: 19 }, end: { line: 6, column: 61 } }, '3': { start: { line: 7, column: 2 }, end: { line: 7, column: 50 } }, '4': { start: { line: 11, column: 2 }, end: { line: 13, column: 3 } }, '5': { start: { line: 12, column: 4 }, end: { line: 12, column: 15 } }, '6': { start: { line: 14, column: 2 }, end: { line: 16, column: 3 } }, '7': { start: { line: 15, column: 4 }, end: { line: 15, column: 16 } }, '8': { start: { line: 17, column: 2 }, end: { line: 19, column: 3 } }, '9': { start: { line: 18, column: 4 }, end: { line: 18, column: 26 } }, '10': { start: { line: 20, column: 2 }, end: { line: 22, column: 3 } }, '11': { start: { line: 21, column: 4 }, end: { line: 21, column: 35 } }, '12': { start: { line: 23, column: 2 }, end: { line: 25, column: 3 } }, '13': { start: { line: 24, column: 4 }, end: { line: 24, column: 28 } }, '14': { start: { line: 26, column: 15 }, end: { line: 26, column: 17 } }, '15': { start: { line: 27, column: 2 }, end: { line: 31, column: 3 } }, '16': { start: { line: 28, column: 4 }, end: { line: 30, column: 5 } }, '17': { start: { line: 29, column: 6 }, end: { line: 29, column: 38 } }, '18': { start: { line: 32, column: 2 }, end: { line: 32, column: 16 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 1, column: 68 }, end: { line: 1, column: 69 } }, loc: { start: { line: 1, column: 81 }, end: { line: 3, column: 1 } }, line: 1 }, '1': { name: 'cloneRegExp', decl: { start: { line: 5, column: 9 }, end: { line: 5, column: 20 } }, loc: { start: { line: 5, column: 25 }, end: { line: 8, column: 1 } }, line: 5 }, '2': { name: 'clone', decl: { start: { line: 10, column: 24 }, end: { line: 10, column: 29 } }, loc: { start: { line: 10, column: 35 }, end: { line: 33, column: 1 } }, line: 10 } }, branchMap: { '0': { loc: { start: { line: 1, column: 14 }, end: { line: 3, column: 1 } }, type: 'cond-expr', locations: [{ start: { line: 1, column: 52 }, end: { line: 1, column: 65 } }, { start: { line: 1, column: 68 }, end: { line: 3, column: 1 } }], line: 1 }, '1': { loc: { start: { line: 11, column: 2 }, end: { line: 13, column: 3 } }, type: 'if', locations: [{ start: { line: 11, column: 2 }, end: { line: 13, column: 3 } }, { start: { line: 11, column: 2 }, end: { line: 13, column: 3 } }], line: 11 }, '2': { loc: { start: { line: 11, column: 7 }, end: { line: 11, column: 74 } }, type: 'cond-expr', locations: [{ start: { line: 11, column: 36 }, end: { line: 11, column: 47 } }, { start: { line: 11, column: 50 }, end: { line: 11, column: 74 } }], line: 11 }, '3': { loc: { start: { line: 14, column: 2 }, end: { line: 16, column: 3 } }, type: 'if', locations: [{ start: { line: 14, column: 2 }, end: { line: 16, column: 3 } }, { start: { line: 14, column: 2 }, end: { line: 16, column: 3 } }], line: 14 }, '4': { loc: { start: { line: 17, column: 2 }, end: { line: 19, column: 3 } }, type: 'if', locations: [{ start: { line: 17, column: 2 }, end: { line: 19, column: 3 } }, { start: { line: 17, column: 2 }, end: { line: 19, column: 3 } }], line: 17 }, '5': { loc: { start: { line: 20, column: 2 }, end: { line: 22, column: 3 } }, type: 'if', locations: [{ start: { line: 20, column: 2 }, end: { line: 22, column: 3 } }, { start: { line: 20, column: 2 }, end: { line: 22, column: 3 } }], line: 20 }, '6': { loc: { start: { line: 23, column: 2 }, end: { line: 25, column: 3 } }, type: 'if', locations: [{ start: { line: 23, column: 2 }, end: { line: 25, column: 3 } }, { start: { line: 23, column: 2 }, end: { line: 25, column: 3 } }], line: 23 }, '7': { loc: { start: { line: 28, column: 4 }, end: { line: 30, column: 5 } }, type: 'if', locations: [{ start: { line: 28, column: 4 }, end: { line: 30, column: 5 } }, { start: { line: 28, column: 4 }, end: { line: 30, column: 5 } }], line: 28 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0 }, f: { '0': 0, '1': 0, '2': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var isArray = (cov_2ces1qo8h1.s[0]++, typeof Array.isArray === 'function' ? (cov_2ces1qo8h1.b[0][0]++, Array.isArray) : (cov_2ces1qo8h1.b[0][1]++, function (a) {
  cov_2ces1qo8h1.f[0]++;cov_2ces1qo8h1.s[1]++;return a instanceof Array;
}));function cloneRegExp(re) {
  cov_2ces1qo8h1.f[1]++;var regexMatch = (cov_2ces1qo8h1.s[2]++, /^\/(.*)\/([gimyu]*)$/.exec(re.toString()));cov_2ces1qo8h1.s[3]++;return new RegExp(regexMatch[1], regexMatch[2]);
}function clone(arg) {
  cov_2ces1qo8h1.f[2]++;cov_2ces1qo8h1.s[4]++;if ((typeof arg === 'undefined' ? (cov_2ces1qo8h1.b[2][0]++, 'undefined') : (cov_2ces1qo8h1.b[2][1]++, _typeof$1(arg))) !== 'object') {
    cov_2ces1qo8h1.b[1][0]++;cov_2ces1qo8h1.s[5]++;return arg;
  } else {
    cov_2ces1qo8h1.b[1][1]++;
  }cov_2ces1qo8h1.s[6]++;if (arg === null) {
    cov_2ces1qo8h1.b[3][0]++;cov_2ces1qo8h1.s[7]++;return null;
  } else {
    cov_2ces1qo8h1.b[3][1]++;
  }cov_2ces1qo8h1.s[8]++;if (isArray(arg)) {
    cov_2ces1qo8h1.b[4][0]++;cov_2ces1qo8h1.s[9]++;return arg.map(clone);
  } else {
    cov_2ces1qo8h1.b[4][1]++;
  }cov_2ces1qo8h1.s[10]++;if (arg instanceof Date) {
    cov_2ces1qo8h1.b[5][0]++;cov_2ces1qo8h1.s[11]++;return new Date(arg.getTime());
  } else {
    cov_2ces1qo8h1.b[5][1]++;
  }cov_2ces1qo8h1.s[12]++;if (arg instanceof RegExp) {
    cov_2ces1qo8h1.b[6][0]++;cov_2ces1qo8h1.s[13]++;return cloneRegExp(arg);
  } else {
    cov_2ces1qo8h1.b[6][1]++;
  }var cloned = (cov_2ces1qo8h1.s[14]++, {});cov_2ces1qo8h1.s[15]++;for (var name in arg) {
    cov_2ces1qo8h1.s[16]++;if (Object.prototype.hasOwnProperty.call(arg, name)) {
      cov_2ces1qo8h1.b[7][0]++;cov_2ces1qo8h1.s[17]++;cloned[name] = clone(arg[name]);
    } else {
      cov_2ces1qo8h1.b[7][1]++;
    }
  }cov_2ces1qo8h1.s[18]++;return cloned;
}

var cov_16togqrbp8 = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/contexts/diff.js',
      hash = '90bb9cbdad306b0254c6caaccb0a396d5a9299a4',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/contexts/diff.js', statementMap: { '0': { start: { line: 4, column: 18 }, end: { line: 34, column: 10 } }, '1': { start: { line: 5, column: 2 }, end: { line: 5, column: 47 } }, '2': { start: { line: 8, column: 4 }, end: { line: 8, column: 51 } }, '3': { start: { line: 10, column: 16 }, end: { line: 10, column: 134 } }, '4': { start: { line: 12, column: 4 }, end: { line: 12, column: 22 } }, '5': { start: { line: 13, column: 4 }, end: { line: 13, column: 24 } }, '6': { start: { line: 14, column: 4 }, end: { line: 14, column: 24 } }, '7': { start: { line: 15, column: 4 }, end: { line: 15, column: 17 } }, '8': { start: { line: 18, column: 2 }, end: { line: 32, column: 6 } }, '9': { start: { line: 21, column: 6 }, end: { line: 29, column: 7 } }, '10': { start: { line: 22, column: 20 }, end: { line: 22, column: 116 } }, '11': { start: { line: 23, column: 8 }, end: { line: 25, column: 9 } }, '12': { start: { line: 24, column: 10 }, end: { line: 24, column: 39 } }, '13': { start: { line: 26, column: 8 }, end: { line: 28, column: 9 } }, '14': { start: { line: 27, column: 10 }, end: { line: 27, column: 39 } }, '15': { start: { line: 30, column: 6 }, end: { line: 30, column: 64 } }, '16': { start: { line: 33, column: 2 }, end: { line: 33, column: 21 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 4, column: 18 }, end: { line: 4, column: 19 } }, loc: { start: { line: 4, column: 38 }, end: { line: 34, column: 1 } }, line: 4 }, '1': { name: 'DiffContext', decl: { start: { line: 7, column: 11 }, end: { line: 7, column: 22 } }, loc: { start: { line: 7, column: 36 }, end: { line: 16, column: 3 } }, line: 7 }, '2': { name: 'setResult', decl: { start: { line: 20, column: 20 }, end: { line: 20, column: 29 } }, loc: { start: { line: 20, column: 38 }, end: { line: 31, column: 5 } }, line: 20 } }, branchMap: { '0': { loc: { start: { line: 10, column: 62 }, end: { line: 10, column: 121 } }, type: 'binary-expr', locations: [{ start: { line: 10, column: 62 }, end: { line: 10, column: 83 } }, { start: { line: 10, column: 87 }, end: { line: 10, column: 121 } }], line: 10 }, '1': { loc: { start: { line: 21, column: 6 }, end: { line: 29, column: 7 } }, type: 'if', locations: [{ start: { line: 21, column: 6 }, end: { line: 29, column: 7 } }, { start: { line: 21, column: 6 }, end: { line: 29, column: 7 } }], line: 21 }, '2': { loc: { start: { line: 21, column: 10 }, end: { line: 21, column: 130 } }, type: 'binary-expr', locations: [{ start: { line: 21, column: 10 }, end: { line: 21, column: 38 } }, { start: { line: 21, column: 42 }, end: { line: 21, column: 130 } }], line: 21 }, '3': { loc: { start: { line: 21, column: 43 }, end: { line: 21, column: 116 } }, type: 'cond-expr', locations: [{ start: { line: 21, column: 75 }, end: { line: 21, column: 86 } }, { start: { line: 21, column: 89 }, end: { line: 21, column: 116 } }], line: 21 }, '4': { loc: { start: { line: 22, column: 20 }, end: { line: 22, column: 116 } }, type: 'cond-expr', locations: [{ start: { line: 22, column: 73 }, end: { line: 22, column: 101 } }, { start: { line: 22, column: 104 }, end: { line: 22, column: 116 } }], line: 22 }, '5': { loc: { start: { line: 23, column: 8 }, end: { line: 25, column: 9 } }, type: 'if', locations: [{ start: { line: 23, column: 8 }, end: { line: 25, column: 9 } }, { start: { line: 23, column: 8 }, end: { line: 25, column: 9 } }], line: 23 }, '6': { loc: { start: { line: 26, column: 8 }, end: { line: 28, column: 9 } }, type: 'if', locations: [{ start: { line: 26, column: 8 }, end: { line: 28, column: 9 } }, { start: { line: 26, column: 8 }, end: { line: 28, column: 9 } }], line: 26 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0 }, f: { '0': 0, '1': 0, '2': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var DiffContext = (cov_16togqrbp8.s[0]++, function (_Context) {
  cov_16togqrbp8.f[0]++;cov_16togqrbp8.s[1]++;inherits$1(DiffContext, _Context);function DiffContext(left, right) {
    cov_16togqrbp8.f[1]++;cov_16togqrbp8.s[2]++;classCallCheck$1(this, DiffContext);var _this = (cov_16togqrbp8.s[3]++, possibleConstructorReturn$1(this, ((cov_16togqrbp8.b[0][0]++, DiffContext.__proto__) || (cov_16togqrbp8.b[0][1]++, Object.getPrototypeOf(DiffContext))).call(this)));cov_16togqrbp8.s[4]++;_this.left = left;cov_16togqrbp8.s[5]++;_this.right = right;cov_16togqrbp8.s[6]++;_this.pipe = 'diff';cov_16togqrbp8.s[7]++;return _this;
  }cov_16togqrbp8.s[8]++;createClass$1(DiffContext, [{ key: 'setResult', value: function setResult(result) {
      cov_16togqrbp8.f[2]++;cov_16togqrbp8.s[9]++;if ((cov_16togqrbp8.b[2][0]++, this.options.cloneDiffValues) && (cov_16togqrbp8.b[2][1]++, (typeof result === 'undefined' ? (cov_16togqrbp8.b[3][0]++, 'undefined') : (cov_16togqrbp8.b[3][1]++, _typeof$1(result))) === 'object')) {
        cov_16togqrbp8.b[1][0]++;var clone$$1 = (cov_16togqrbp8.s[10]++, typeof this.options.cloneDiffValues === 'function' ? (cov_16togqrbp8.b[4][0]++, this.options.cloneDiffValues) : (cov_16togqrbp8.b[4][1]++, clone));cov_16togqrbp8.s[11]++;if (_typeof$1(result[0]) === 'object') {
          cov_16togqrbp8.b[5][0]++;cov_16togqrbp8.s[12]++;result[0] = clone$$1(result[0]);
        } else {
          cov_16togqrbp8.b[5][1]++;
        }cov_16togqrbp8.s[13]++;if (_typeof$1(result[1]) === 'object') {
          cov_16togqrbp8.b[6][0]++;cov_16togqrbp8.s[14]++;result[1] = clone$$1(result[1]);
        } else {
          cov_16togqrbp8.b[6][1]++;
        }
      } else {
        cov_16togqrbp8.b[1][1]++;
      }cov_16togqrbp8.s[15]++;return Context.prototype.setResult.apply(this, arguments);
    } }]);cov_16togqrbp8.s[16]++;return DiffContext;
}(Context));

var cov_1lch9qj04n = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/contexts/patch.js',
      hash = '60e4c19ac942f0d668ee8b1d8ccd4c42e2bbeee8',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/contexts/patch.js', statementMap: { '0': { start: { line: 3, column: 19 }, end: { line: 18, column: 10 } }, '1': { start: { line: 4, column: 2 }, end: { line: 4, column: 48 } }, '2': { start: { line: 7, column: 4 }, end: { line: 7, column: 52 } }, '3': { start: { line: 9, column: 16 }, end: { line: 9, column: 136 } }, '4': { start: { line: 11, column: 4 }, end: { line: 11, column: 22 } }, '5': { start: { line: 12, column: 4 }, end: { line: 12, column: 24 } }, '6': { start: { line: 13, column: 4 }, end: { line: 13, column: 25 } }, '7': { start: { line: 14, column: 4 }, end: { line: 14, column: 17 } }, '8': { start: { line: 17, column: 2 }, end: { line: 17, column: 22 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 3, column: 19 }, end: { line: 3, column: 20 } }, loc: { start: { line: 3, column: 39 }, end: { line: 18, column: 1 } }, line: 3 }, '1': { name: 'PatchContext', decl: { start: { line: 6, column: 11 }, end: { line: 6, column: 23 } }, loc: { start: { line: 6, column: 37 }, end: { line: 15, column: 3 } }, line: 6 } }, branchMap: { '0': { loc: { start: { line: 9, column: 62 }, end: { line: 9, column: 123 } }, type: 'binary-expr', locations: [{ start: { line: 9, column: 62 }, end: { line: 9, column: 84 } }, { start: { line: 9, column: 88 }, end: { line: 9, column: 123 } }], line: 9 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0 }, f: { '0': 0, '1': 0 }, b: { '0': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var PatchContext = (cov_1lch9qj04n.s[0]++, function (_Context) {
  cov_1lch9qj04n.f[0]++;cov_1lch9qj04n.s[1]++;inherits$1(PatchContext, _Context);function PatchContext(left, delta) {
    cov_1lch9qj04n.f[1]++;cov_1lch9qj04n.s[2]++;classCallCheck$1(this, PatchContext);var _this = (cov_1lch9qj04n.s[3]++, possibleConstructorReturn$1(this, ((cov_1lch9qj04n.b[0][0]++, PatchContext.__proto__) || (cov_1lch9qj04n.b[0][1]++, Object.getPrototypeOf(PatchContext))).call(this)));cov_1lch9qj04n.s[4]++;_this.left = left;cov_1lch9qj04n.s[5]++;_this.delta = delta;cov_1lch9qj04n.s[6]++;_this.pipe = 'patch';cov_1lch9qj04n.s[7]++;return _this;
  }cov_1lch9qj04n.s[8]++;return PatchContext;
}(Context));

var cov_15hv6xp4jc = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/contexts/reverse.js',
      hash = 'e404bb01b76ce93560e185b5c0356e677942aae3',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/contexts/reverse.js', statementMap: { '0': { start: { line: 3, column: 21 }, end: { line: 17, column: 10 } }, '1': { start: { line: 4, column: 2 }, end: { line: 4, column: 50 } }, '2': { start: { line: 7, column: 4 }, end: { line: 7, column: 54 } }, '3': { start: { line: 9, column: 16 }, end: { line: 9, column: 140 } }, '4': { start: { line: 11, column: 4 }, end: { line: 11, column: 24 } }, '5': { start: { line: 12, column: 4 }, end: { line: 12, column: 27 } }, '6': { start: { line: 13, column: 4 }, end: { line: 13, column: 17 } }, '7': { start: { line: 16, column: 2 }, end: { line: 16, column: 24 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 3, column: 21 }, end: { line: 3, column: 22 } }, loc: { start: { line: 3, column: 41 }, end: { line: 17, column: 1 } }, line: 3 }, '1': { name: 'ReverseContext', decl: { start: { line: 6, column: 11 }, end: { line: 6, column: 25 } }, loc: { start: { line: 6, column: 33 }, end: { line: 14, column: 3 } }, line: 6 } }, branchMap: { '0': { loc: { start: { line: 9, column: 62 }, end: { line: 9, column: 127 } }, type: 'binary-expr', locations: [{ start: { line: 9, column: 62 }, end: { line: 9, column: 86 } }, { start: { line: 9, column: 90 }, end: { line: 9, column: 127 } }], line: 9 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0 }, f: { '0': 0, '1': 0 }, b: { '0': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var ReverseContext = (cov_15hv6xp4jc.s[0]++, function (_Context) {
  cov_15hv6xp4jc.f[0]++;cov_15hv6xp4jc.s[1]++;inherits$1(ReverseContext, _Context);function ReverseContext(delta) {
    cov_15hv6xp4jc.f[1]++;cov_15hv6xp4jc.s[2]++;classCallCheck$1(this, ReverseContext);var _this = (cov_15hv6xp4jc.s[3]++, possibleConstructorReturn$1(this, ((cov_15hv6xp4jc.b[0][0]++, ReverseContext.__proto__) || (cov_15hv6xp4jc.b[0][1]++, Object.getPrototypeOf(ReverseContext))).call(this)));cov_15hv6xp4jc.s[4]++;_this.delta = delta;cov_15hv6xp4jc.s[5]++;_this.pipe = 'reverse';cov_15hv6xp4jc.s[6]++;return _this;
  }cov_15hv6xp4jc.s[7]++;return ReverseContext;
}(Context));

var cov_1c74kci15l = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/filters/trivial.js',
      hash = '98d37903597642b2333c51a70abec4329d29cfc3',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/filters/trivial.js', statementMap: { '0': { start: { line: 1, column: 14 }, end: { line: 3, column: 1 } }, '1': { start: { line: 2, column: 2 }, end: { line: 2, column: 28 } }, '2': { start: { line: 5, column: 24 }, end: { line: 52, column: 1 } }, '3': { start: { line: 6, column: 2 }, end: { line: 9, column: 3 } }, '4': { start: { line: 7, column: 4 }, end: { line: 7, column: 40 } }, '5': { start: { line: 8, column: 4 }, end: { line: 8, column: 11 } }, '6': { start: { line: 10, column: 2 }, end: { line: 16, column: 3 } }, '7': { start: { line: 11, column: 4 }, end: { line: 13, column: 5 } }, '8': { start: { line: 12, column: 6 }, end: { line: 12, column: 53 } }, '9': { start: { line: 14, column: 4 }, end: { line: 14, column: 46 } }, '10': { start: { line: 15, column: 4 }, end: { line: 15, column: 11 } }, '11': { start: { line: 17, column: 2 }, end: { line: 20, column: 3 } }, '12': { start: { line: 18, column: 4 }, end: { line: 18, column: 51 } }, '13': { start: { line: 19, column: 4 }, end: { line: 19, column: 11 } }, '14': { start: { line: 21, column: 2 }, end: { line: 23, column: 3 } }, '15': { start: { line: 22, column: 4 }, end: { line: 22, column: 51 } }, '16': { start: { line: 24, column: 2 }, end: { line: 24, column: 88 } }, '17': { start: { line: 25, column: 2 }, end: { line: 25, column: 91 } }, '18': { start: { line: 26, column: 2 }, end: { line: 29, column: 3 } }, '19': { start: { line: 27, column: 4 }, end: { line: 27, column: 60 } }, '20': { start: { line: 28, column: 4 }, end: { line: 28, column: 11 } }, '21': { start: { line: 30, column: 2 }, end: { line: 33, column: 3 } }, '22': { start: { line: 31, column: 4 }, end: { line: 31, column: 60 } }, '23': { start: { line: 32, column: 4 }, end: { line: 32, column: 11 } }, '24': { start: { line: 34, column: 2 }, end: { line: 36, column: 3 } }, '25': { start: { line: 35, column: 4 }, end: { line: 35, column: 48 } }, '26': { start: { line: 37, column: 2 }, end: { line: 39, column: 3 } }, '27': { start: { line: 38, column: 4 }, end: { line: 38, column: 50 } }, '28': { start: { line: 40, column: 2 }, end: { line: 43, column: 3 } }, '29': { start: { line: 41, column: 4 }, end: { line: 41, column: 60 } }, '30': { start: { line: 42, column: 4 }, end: { line: 42, column: 11 } }, '31': { start: { line: 45, column: 2 }, end: { line: 51, column: 3 } }, '32': { start: { line: 46, column: 4 }, end: { line: 50, column: 5 } }, '33': { start: { line: 47, column: 6 }, end: { line: 47, column: 84 } }, '34': { start: { line: 49, column: 6 }, end: { line: 49, column: 62 } }, '35': { start: { line: 53, column: 0 }, end: { line: 53, column: 34 } }, '36': { start: { line: 55, column: 25 }, end: { line: 82, column: 1 } }, '37': { start: { line: 56, column: 2 }, end: { line: 59, column: 3 } }, '38': { start: { line: 57, column: 4 }, end: { line: 57, column: 43 } }, '39': { start: { line: 58, column: 4 }, end: { line: 58, column: 11 } }, '40': { start: { line: 60, column: 2 }, end: { line: 60, column: 43 } }, '41': { start: { line: 61, column: 2 }, end: { line: 63, column: 3 } }, '42': { start: { line: 62, column: 4 }, end: { line: 62, column: 11 } }, '43': { start: { line: 64, column: 2 }, end: { line: 67, column: 3 } }, '44': { start: { line: 65, column: 4 }, end: { line: 65, column: 47 } }, '45': { start: { line: 66, column: 4 }, end: { line: 66, column: 11 } }, '46': { start: { line: 68, column: 2 }, end: { line: 78, column: 3 } }, '47': { start: { line: 69, column: 4 }, end: { line: 75, column: 5 } }, '48': { start: { line: 70, column: 22 }, end: { line: 70, column: 67 } }, '49': { start: { line: 71, column: 6 }, end: { line: 74, column: 7 } }, '50': { start: { line: 72, column: 8 }, end: { line: 72, column: 73 } }, '51': { start: { line: 73, column: 8 }, end: { line: 73, column: 15 } }, '52': { start: { line: 76, column: 4 }, end: { line: 76, column: 47 } }, '53': { start: { line: 77, column: 4 }, end: { line: 77, column: 11 } }, '54': { start: { line: 79, column: 2 }, end: { line: 81, column: 3 } }, '55': { start: { line: 80, column: 4 }, end: { line: 80, column: 40 } }, '56': { start: { line: 83, column: 0 }, end: { line: 83, column: 35 } }, '57': { start: { line: 85, column: 27 }, end: { line: 105, column: 1 } }, '58': { start: { line: 86, column: 2 }, end: { line: 89, column: 3 } }, '59': { start: { line: 87, column: 4 }, end: { line: 87, column: 44 } }, '60': { start: { line: 88, column: 4 }, end: { line: 88, column: 11 } }, '61': { start: { line: 90, column: 2 }, end: { line: 90, column: 43 } }, '62': { start: { line: 91, column: 2 }, end: { line: 93, column: 3 } }, '63': { start: { line: 92, column: 4 }, end: { line: 92, column: 11 } }, '64': { start: { line: 94, column: 2 }, end: { line: 97, column: 3 } }, '65': { start: { line: 95, column: 4 }, end: { line: 95, column: 55 } }, '66': { start: { line: 96, column: 4 }, end: { line: 96, column: 11 } }, '67': { start: { line: 98, column: 2 }, end: { line: 101, column: 3 } }, '68': { start: { line: 99, column: 4 }, end: { line: 99, column: 67 } }, '69': { start: { line: 100, column: 4 }, end: { line: 100, column: 11 } }, '70': { start: { line: 102, column: 2 }, end: { line: 104, column: 3 } }, '71': { start: { line: 103, column: 4 }, end: { line: 103, column: 49 } }, '72': { start: { line: 106, column: 0 }, end: { line: 106, column: 37 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 1, column: 68 }, end: { line: 1, column: 69 } }, loc: { start: { line: 1, column: 81 }, end: { line: 3, column: 1 } }, line: 1 }, '1': { name: 'trivialMatchesDiffFilter', decl: { start: { line: 5, column: 33 }, end: { line: 5, column: 57 } }, loc: { start: { line: 5, column: 67 }, end: { line: 52, column: 1 } }, line: 5 }, '2': { name: 'trivialMatchesPatchFilter', decl: { start: { line: 55, column: 34 }, end: { line: 55, column: 59 } }, loc: { start: { line: 55, column: 69 }, end: { line: 82, column: 1 } }, line: 55 }, '3': { name: 'trivialReferseFilter', decl: { start: { line: 85, column: 36 }, end: { line: 85, column: 56 } }, loc: { start: { line: 85, column: 66 }, end: { line: 105, column: 1 } }, line: 85 } }, branchMap: { '0': { loc: { start: { line: 1, column: 14 }, end: { line: 3, column: 1 } }, type: 'cond-expr', locations: [{ start: { line: 1, column: 52 }, end: { line: 1, column: 65 } }, { start: { line: 1, column: 68 }, end: { line: 3, column: 1 } }], line: 1 }, '1': { loc: { start: { line: 6, column: 2 }, end: { line: 9, column: 3 } }, type: 'if', locations: [{ start: { line: 6, column: 2 }, end: { line: 9, column: 3 } }, { start: { line: 6, column: 2 }, end: { line: 9, column: 3 } }], line: 6 }, '2': { loc: { start: { line: 10, column: 2 }, end: { line: 16, column: 3 } }, type: 'if', locations: [{ start: { line: 10, column: 2 }, end: { line: 16, column: 3 } }, { start: { line: 10, column: 2 }, end: { line: 16, column: 3 } }], line: 10 }, '3': { loc: { start: { line: 11, column: 4 }, end: { line: 13, column: 5 } }, type: 'if', locations: [{ start: { line: 11, column: 4 }, end: { line: 13, column: 5 } }, { start: { line: 11, column: 4 }, end: { line: 13, column: 5 } }], line: 11 }, '4': { loc: { start: { line: 17, column: 2 }, end: { line: 20, column: 3 } }, type: 'if', locations: [{ start: { line: 17, column: 2 }, end: { line: 20, column: 3 } }, { start: { line: 17, column: 2 }, end: { line: 20, column: 3 } }], line: 17 }, '5': { loc: { start: { line: 21, column: 2 }, end: { line: 23, column: 3 } }, type: 'if', locations: [{ start: { line: 21, column: 2 }, end: { line: 23, column: 3 } }, { start: { line: 21, column: 2 }, end: { line: 23, column: 3 } }], line: 21 }, '6': { loc: { start: { line: 21, column: 6 }, end: { line: 21, column: 79 } }, type: 'binary-expr', locations: [{ start: { line: 21, column: 6 }, end: { line: 21, column: 40 } }, { start: { line: 21, column: 44 }, end: { line: 21, column: 79 } }], line: 21 }, '7': { loc: { start: { line: 24, column: 21 }, end: { line: 24, column: 87 } }, type: 'cond-expr', locations: [{ start: { line: 24, column: 45 }, end: { line: 24, column: 51 } }, { start: { line: 24, column: 54 }, end: { line: 24, column: 87 } }], line: 24 }, '8': { loc: { start: { line: 25, column: 22 }, end: { line: 25, column: 90 } }, type: 'cond-expr', locations: [{ start: { line: 25, column: 47 }, end: { line: 25, column: 53 } }, { start: { line: 25, column: 56 }, end: { line: 25, column: 90 } }], line: 25 }, '9': { loc: { start: { line: 26, column: 2 }, end: { line: 29, column: 3 } }, type: 'if', locations: [{ start: { line: 26, column: 2 }, end: { line: 29, column: 3 } }, { start: { line: 26, column: 2 }, end: { line: 29, column: 3 } }], line: 26 }, '10': { loc: { start: { line: 30, column: 2 }, end: { line: 33, column: 3 } }, type: 'if', locations: [{ start: { line: 30, column: 2 }, end: { line: 33, column: 3 } }, { start: { line: 30, column: 2 }, end: { line: 33, column: 3 } }], line: 30 }, '11': { loc: { start: { line: 30, column: 6 }, end: { line: 30, column: 69 } }, type: 'binary-expr', locations: [{ start: { line: 30, column: 6 }, end: { line: 30, column: 36 } }, { start: { line: 30, column: 40 }, end: { line: 30, column: 69 } }], line: 30 }, '12': { loc: { start: { line: 34, column: 2 }, end: { line: 36, column: 3 } }, type: 'if', locations: [{ start: { line: 34, column: 2 }, end: { line: 36, column: 3 } }, { start: { line: 34, column: 2 }, end: { line: 36, column: 3 } }], line: 34 }, '13': { loc: { start: { line: 37, column: 2 }, end: { line: 39, column: 3 } }, type: 'if', locations: [{ start: { line: 37, column: 2 }, end: { line: 39, column: 3 } }, { start: { line: 37, column: 2 }, end: { line: 39, column: 3 } }], line: 37 }, '14': { loc: { start: { line: 40, column: 2 }, end: { line: 43, column: 3 } }, type: 'if', locations: [{ start: { line: 40, column: 2 }, end: { line: 43, column: 3 } }, { start: { line: 40, column: 2 }, end: { line: 43, column: 3 } }], line: 40 }, '15': { loc: { start: { line: 45, column: 2 }, end: { line: 51, column: 3 } }, type: 'if', locations: [{ start: { line: 45, column: 2 }, end: { line: 51, column: 3 } }, { start: { line: 45, column: 2 }, end: { line: 51, column: 3 } }], line: 45 }, '16': { loc: { start: { line: 46, column: 4 }, end: { line: 50, column: 5 } }, type: 'if', locations: [{ start: { line: 46, column: 4 }, end: { line: 50, column: 5 } }, { start: { line: 46, column: 4 }, end: { line: 50, column: 5 } }], line: 46 }, '17': { loc: { start: { line: 56, column: 2 }, end: { line: 59, column: 3 } }, type: 'if', locations: [{ start: { line: 56, column: 2 }, end: { line: 59, column: 3 } }, { start: { line: 56, column: 2 }, end: { line: 59, column: 3 } }], line: 56 }, '18': { loc: { start: { line: 61, column: 2 }, end: { line: 63, column: 3 } }, type: 'if', locations: [{ start: { line: 61, column: 2 }, end: { line: 63, column: 3 } }, { start: { line: 61, column: 2 }, end: { line: 63, column: 3 } }], line: 61 }, '19': { loc: { start: { line: 64, column: 2 }, end: { line: 67, column: 3 } }, type: 'if', locations: [{ start: { line: 64, column: 2 }, end: { line: 67, column: 3 } }, { start: { line: 64, column: 2 }, end: { line: 67, column: 3 } }], line: 64 }, '20': { loc: { start: { line: 68, column: 2 }, end: { line: 78, column: 3 } }, type: 'if', locations: [{ start: { line: 68, column: 2 }, end: { line: 78, column: 3 } }, { start: { line: 68, column: 2 }, end: { line: 78, column: 3 } }], line: 68 }, '21': { loc: { start: { line: 69, column: 4 }, end: { line: 75, column: 5 } }, type: 'if', locations: [{ start: { line: 69, column: 4 }, end: { line: 75, column: 5 } }, { start: { line: 69, column: 4 }, end: { line: 75, column: 5 } }], line: 69 }, '22': { loc: { start: { line: 71, column: 6 }, end: { line: 74, column: 7 } }, type: 'if', locations: [{ start: { line: 71, column: 6 }, end: { line: 74, column: 7 } }, { start: { line: 71, column: 6 }, end: { line: 74, column: 7 } }], line: 71 }, '23': { loc: { start: { line: 79, column: 2 }, end: { line: 81, column: 3 } }, type: 'if', locations: [{ start: { line: 79, column: 2 }, end: { line: 81, column: 3 } }, { start: { line: 79, column: 2 }, end: { line: 81, column: 3 } }], line: 79 }, '24': { loc: { start: { line: 79, column: 6 }, end: { line: 79, column: 58 } }, type: 'binary-expr', locations: [{ start: { line: 79, column: 6 }, end: { line: 79, column: 32 } }, { start: { line: 79, column: 36 }, end: { line: 79, column: 58 } }], line: 79 }, '25': { loc: { start: { line: 86, column: 2 }, end: { line: 89, column: 3 } }, type: 'if', locations: [{ start: { line: 86, column: 2 }, end: { line: 89, column: 3 } }, { start: { line: 86, column: 2 }, end: { line: 89, column: 3 } }], line: 86 }, '26': { loc: { start: { line: 91, column: 2 }, end: { line: 93, column: 3 } }, type: 'if', locations: [{ start: { line: 91, column: 2 }, end: { line: 93, column: 3 } }, { start: { line: 91, column: 2 }, end: { line: 93, column: 3 } }], line: 91 }, '27': { loc: { start: { line: 94, column: 2 }, end: { line: 97, column: 3 } }, type: 'if', locations: [{ start: { line: 94, column: 2 }, end: { line: 97, column: 3 } }, { start: { line: 94, column: 2 }, end: { line: 97, column: 3 } }], line: 94 }, '28': { loc: { start: { line: 98, column: 2 }, end: { line: 101, column: 3 } }, type: 'if', locations: [{ start: { line: 98, column: 2 }, end: { line: 101, column: 3 } }, { start: { line: 98, column: 2 }, end: { line: 101, column: 3 } }], line: 98 }, '29': { loc: { start: { line: 102, column: 2 }, end: { line: 104, column: 3 } }, type: 'if', locations: [{ start: { line: 102, column: 2 }, end: { line: 104, column: 3 } }, { start: { line: 102, column: 2 }, end: { line: 104, column: 3 } }], line: 102 }, '30': { loc: { start: { line: 102, column: 6 }, end: { line: 102, column: 58 } }, type: 'binary-expr', locations: [{ start: { line: 102, column: 6 }, end: { line: 102, column: 32 } }, { start: { line: 102, column: 36 }, end: { line: 102, column: 58 } }], line: 102 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0], '15': [0, 0], '16': [0, 0], '17': [0, 0], '18': [0, 0], '19': [0, 0], '20': [0, 0], '21': [0, 0], '22': [0, 0], '23': [0, 0], '24': [0, 0], '25': [0, 0], '26': [0, 0], '27': [0, 0], '28': [0, 0], '29': [0, 0], '30': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var isArray$1 = (cov_1c74kci15l.s[0]++, typeof Array.isArray === 'function' ? (cov_1c74kci15l.b[0][0]++, Array.isArray) : (cov_1c74kci15l.b[0][1]++, function (a) {
  cov_1c74kci15l.f[0]++;cov_1c74kci15l.s[1]++;return a instanceof Array;
}));cov_1c74kci15l.s[2]++;var diffFilter = function trivialMatchesDiffFilter(context) {
  cov_1c74kci15l.f[1]++;cov_1c74kci15l.s[3]++;if (context.left === context.right) {
    cov_1c74kci15l.b[1][0]++;cov_1c74kci15l.s[4]++;context.setResult(undefined).exit();cov_1c74kci15l.s[5]++;return;
  } else {
    cov_1c74kci15l.b[1][1]++;
  }cov_1c74kci15l.s[6]++;if (typeof context.left === 'undefined') {
    cov_1c74kci15l.b[2][0]++;cov_1c74kci15l.s[7]++;if (typeof context.right === 'function') {
      cov_1c74kci15l.b[3][0]++;cov_1c74kci15l.s[8]++;throw new Error('functions are not supported');
    } else {
      cov_1c74kci15l.b[3][1]++;
    }cov_1c74kci15l.s[9]++;context.setResult([context.right]).exit();cov_1c74kci15l.s[10]++;return;
  } else {
    cov_1c74kci15l.b[2][1]++;
  }cov_1c74kci15l.s[11]++;if (typeof context.right === 'undefined') {
    cov_1c74kci15l.b[4][0]++;cov_1c74kci15l.s[12]++;context.setResult([context.left, 0, 0]).exit();cov_1c74kci15l.s[13]++;return;
  } else {
    cov_1c74kci15l.b[4][1]++;
  }cov_1c74kci15l.s[14]++;if ((cov_1c74kci15l.b[6][0]++, typeof context.left === 'function') || (cov_1c74kci15l.b[6][1]++, typeof context.right === 'function')) {
    cov_1c74kci15l.b[5][0]++;cov_1c74kci15l.s[15]++;throw new Error('functions are not supported');
  } else {
    cov_1c74kci15l.b[5][1]++;
  }cov_1c74kci15l.s[16]++;context.leftType = context.left === null ? (cov_1c74kci15l.b[7][0]++, 'null') : (cov_1c74kci15l.b[7][1]++, _typeof$1(context.left));cov_1c74kci15l.s[17]++;context.rightType = context.right === null ? (cov_1c74kci15l.b[8][0]++, 'null') : (cov_1c74kci15l.b[8][1]++, _typeof$1(context.right));cov_1c74kci15l.s[18]++;if (context.leftType !== context.rightType) {
    cov_1c74kci15l.b[9][0]++;cov_1c74kci15l.s[19]++;context.setResult([context.left, context.right]).exit();cov_1c74kci15l.s[20]++;return;
  } else {
    cov_1c74kci15l.b[9][1]++;
  }cov_1c74kci15l.s[21]++;if ((cov_1c74kci15l.b[11][0]++, context.leftType === 'boolean') || (cov_1c74kci15l.b[11][1]++, context.leftType === 'number')) {
    cov_1c74kci15l.b[10][0]++;cov_1c74kci15l.s[22]++;context.setResult([context.left, context.right]).exit();cov_1c74kci15l.s[23]++;return;
  } else {
    cov_1c74kci15l.b[10][1]++;
  }cov_1c74kci15l.s[24]++;if (context.leftType === 'object') {
    cov_1c74kci15l.b[12][0]++;cov_1c74kci15l.s[25]++;context.leftIsArray = isArray$1(context.left);
  } else {
    cov_1c74kci15l.b[12][1]++;
  }cov_1c74kci15l.s[26]++;if (context.rightType === 'object') {
    cov_1c74kci15l.b[13][0]++;cov_1c74kci15l.s[27]++;context.rightIsArray = isArray$1(context.right);
  } else {
    cov_1c74kci15l.b[13][1]++;
  }cov_1c74kci15l.s[28]++;if (context.leftIsArray !== context.rightIsArray) {
    cov_1c74kci15l.b[14][0]++;cov_1c74kci15l.s[29]++;context.setResult([context.left, context.right]).exit();cov_1c74kci15l.s[30]++;return;
  } else {
    cov_1c74kci15l.b[14][1]++;
  }cov_1c74kci15l.s[31]++;if (context.left instanceof RegExp) {
    cov_1c74kci15l.b[15][0]++;cov_1c74kci15l.s[32]++;if (context.right instanceof RegExp) {
      cov_1c74kci15l.b[16][0]++;cov_1c74kci15l.s[33]++;context.setResult([context.left.toString(), context.right.toString()]).exit();
    } else {
      cov_1c74kci15l.b[16][1]++;cov_1c74kci15l.s[34]++;context.setResult([context.left, context.right]).exit();
    }
  } else {
    cov_1c74kci15l.b[15][1]++;
  }
};cov_1c74kci15l.s[35]++;diffFilter.filterName = 'trivial';cov_1c74kci15l.s[36]++;var patchFilter = function trivialMatchesPatchFilter(context) {
  cov_1c74kci15l.f[2]++;cov_1c74kci15l.s[37]++;if (typeof context.delta === 'undefined') {
    cov_1c74kci15l.b[17][0]++;cov_1c74kci15l.s[38]++;context.setResult(context.left).exit();cov_1c74kci15l.s[39]++;return;
  } else {
    cov_1c74kci15l.b[17][1]++;
  }cov_1c74kci15l.s[40]++;context.nested = !isArray$1(context.delta);cov_1c74kci15l.s[41]++;if (context.nested) {
    cov_1c74kci15l.b[18][0]++;cov_1c74kci15l.s[42]++;return;
  } else {
    cov_1c74kci15l.b[18][1]++;
  }cov_1c74kci15l.s[43]++;if (context.delta.length === 1) {
    cov_1c74kci15l.b[19][0]++;cov_1c74kci15l.s[44]++;context.setResult(context.delta[0]).exit();cov_1c74kci15l.s[45]++;return;
  } else {
    cov_1c74kci15l.b[19][1]++;
  }cov_1c74kci15l.s[46]++;if (context.delta.length === 2) {
    cov_1c74kci15l.b[20][0]++;cov_1c74kci15l.s[47]++;if (context.left instanceof RegExp) {
      cov_1c74kci15l.b[21][0]++;var regexArgs = (cov_1c74kci15l.s[48]++, /^\/(.*)\/([gimyu]+)$/.exec(context.delta[1]));cov_1c74kci15l.s[49]++;if (regexArgs) {
        cov_1c74kci15l.b[22][0]++;cov_1c74kci15l.s[50]++;context.setResult(new RegExp(regexArgs[1], regexArgs[2])).exit();cov_1c74kci15l.s[51]++;return;
      } else {
        cov_1c74kci15l.b[22][1]++;
      }
    } else {
      cov_1c74kci15l.b[21][1]++;
    }cov_1c74kci15l.s[52]++;context.setResult(context.delta[1]).exit();cov_1c74kci15l.s[53]++;return;
  } else {
    cov_1c74kci15l.b[20][1]++;
  }cov_1c74kci15l.s[54]++;if ((cov_1c74kci15l.b[24][0]++, context.delta.length === 3) && (cov_1c74kci15l.b[24][1]++, context.delta[2] === 0)) {
    cov_1c74kci15l.b[23][0]++;cov_1c74kci15l.s[55]++;context.setResult(undefined).exit();
  } else {
    cov_1c74kci15l.b[23][1]++;
  }
};cov_1c74kci15l.s[56]++;patchFilter.filterName = 'trivial';cov_1c74kci15l.s[57]++;var reverseFilter = function trivialReferseFilter(context) {
  cov_1c74kci15l.f[3]++;cov_1c74kci15l.s[58]++;if (typeof context.delta === 'undefined') {
    cov_1c74kci15l.b[25][0]++;cov_1c74kci15l.s[59]++;context.setResult(context.delta).exit();cov_1c74kci15l.s[60]++;return;
  } else {
    cov_1c74kci15l.b[25][1]++;
  }cov_1c74kci15l.s[61]++;context.nested = !isArray$1(context.delta);cov_1c74kci15l.s[62]++;if (context.nested) {
    cov_1c74kci15l.b[26][0]++;cov_1c74kci15l.s[63]++;return;
  } else {
    cov_1c74kci15l.b[26][1]++;
  }cov_1c74kci15l.s[64]++;if (context.delta.length === 1) {
    cov_1c74kci15l.b[27][0]++;cov_1c74kci15l.s[65]++;context.setResult([context.delta[0], 0, 0]).exit();cov_1c74kci15l.s[66]++;return;
  } else {
    cov_1c74kci15l.b[27][1]++;
  }cov_1c74kci15l.s[67]++;if (context.delta.length === 2) {
    cov_1c74kci15l.b[28][0]++;cov_1c74kci15l.s[68]++;context.setResult([context.delta[1], context.delta[0]]).exit();cov_1c74kci15l.s[69]++;return;
  } else {
    cov_1c74kci15l.b[28][1]++;
  }cov_1c74kci15l.s[70]++;if ((cov_1c74kci15l.b[30][0]++, context.delta.length === 3) && (cov_1c74kci15l.b[30][1]++, context.delta[2] === 0)) {
    cov_1c74kci15l.b[29][0]++;cov_1c74kci15l.s[71]++;context.setResult([context.delta[0]]).exit();
  } else {
    cov_1c74kci15l.b[29][1]++;
  }
};cov_1c74kci15l.s[72]++;reverseFilter.filterName = 'trivial';

var cov_14lky13xfg = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/filters/nested.js',
      hash = 'eb2d12068ad3836a566899c7905a81f33404efa3',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/filters/nested.js', statementMap: { '0': { start: { line: 6, column: 2 }, end: { line: 8, column: 3 } }, '1': { start: { line: 7, column: 4 }, end: { line: 7, column: 11 } }, '2': { start: { line: 9, column: 15 }, end: { line: 9, column: 38 } }, '3': { start: { line: 10, column: 14 }, end: { line: 10, column: 20 } }, '4': { start: { line: 11, column: 15 }, end: { line: 11, column: 29 } }, '5': { start: { line: 12, column: 2 }, end: { line: 19, column: 3 } }, '6': { start: { line: 13, column: 4 }, end: { line: 13, column: 36 } }, '7': { start: { line: 14, column: 4 }, end: { line: 16, column: 5 } }, '8': { start: { line: 15, column: 6 }, end: { line: 15, column: 15 } }, '9': { start: { line: 17, column: 4 }, end: { line: 17, column: 26 } }, '10': { start: { line: 18, column: 4 }, end: { line: 18, column: 43 } }, '11': { start: { line: 20, column: 2 }, end: { line: 22, column: 3 } }, '12': { start: { line: 21, column: 4 }, end: { line: 21, column: 20 } }, '13': { start: { line: 23, column: 2 }, end: { line: 23, column: 35 } }, '14': { start: { line: 25, column: 0 }, end: { line: 25, column: 57 } }, '15': { start: { line: 28, column: 2 }, end: { line: 30, column: 3 } }, '16': { start: { line: 29, column: 4 }, end: { line: 29, column: 11 } }, '17': { start: { line: 32, column: 13 }, end: { line: 32, column: 19 } }, '18': { start: { line: 33, column: 14 }, end: { line: 33, column: 20 } }, '19': { start: { line: 34, column: 23 }, end: { line: 34, column: 53 } }, '20': { start: { line: 35, column: 2 }, end: { line: 44, column: 3 } }, '21': { start: { line: 36, column: 4 }, end: { line: 38, column: 5 } }, '22': { start: { line: 37, column: 6 }, end: { line: 37, column: 15 } }, '23': { start: { line: 39, column: 4 }, end: { line: 41, column: 5 } }, '24': { start: { line: 40, column: 6 }, end: { line: 40, column: 15 } }, '25': { start: { line: 42, column: 4 }, end: { line: 42, column: 69 } }, '26': { start: { line: 43, column: 4 }, end: { line: 43, column: 30 } }, '27': { start: { line: 45, column: 2 }, end: { line: 56, column: 3 } }, '28': { start: { line: 46, column: 4 }, end: { line: 48, column: 5 } }, '29': { start: { line: 47, column: 6 }, end: { line: 47, column: 15 } }, '30': { start: { line: 49, column: 4 }, end: { line: 51, column: 5 } }, '31': { start: { line: 50, column: 6 }, end: { line: 50, column: 15 } }, '32': { start: { line: 52, column: 4 }, end: { line: 55, column: 5 } }, '33': { start: { line: 53, column: 6 }, end: { line: 53, column: 62 } }, '34': { start: { line: 54, column: 6 }, end: { line: 54, column: 32 } }, '35': { start: { line: 58, column: 2 }, end: { line: 61, column: 3 } }, '36': { start: { line: 59, column: 4 }, end: { line: 59, column: 40 } }, '37': { start: { line: 60, column: 4 }, end: { line: 60, column: 11 } }, '38': { start: { line: 62, column: 2 }, end: { line: 62, column: 17 } }, '39': { start: { line: 64, column: 0 }, end: { line: 64, column: 41 } }, '40': { start: { line: 66, column: 25 }, end: { line: 80, column: 1 } }, '41': { start: { line: 67, column: 2 }, end: { line: 69, column: 3 } }, '42': { start: { line: 68, column: 4 }, end: { line: 68, column: 11 } }, '43': { start: { line: 70, column: 2 }, end: { line: 72, column: 3 } }, '44': { start: { line: 71, column: 4 }, end: { line: 71, column: 11 } }, '45': { start: { line: 73, column: 13 }, end: { line: 73, column: 19 } }, '46': { start: { line: 74, column: 14 }, end: { line: 74, column: 20 } }, '47': { start: { line: 75, column: 2 }, end: { line: 78, column: 3 } }, '48': { start: { line: 76, column: 4 }, end: { line: 76, column: 70 } }, '49': { start: { line: 77, column: 4 }, end: { line: 77, column: 30 } }, '50': { start: { line: 79, column: 2 }, end: { line: 79, column: 17 } }, '51': { start: { line: 81, column: 0 }, end: { line: 81, column: 35 } }, '52': { start: { line: 83, column: 40 }, end: { line: 101, column: 1 } }, '53': { start: { line: 84, column: 2 }, end: { line: 86, column: 3 } }, '54': { start: { line: 85, column: 4 }, end: { line: 85, column: 11 } }, '55': { start: { line: 87, column: 2 }, end: { line: 89, column: 3 } }, '56': { start: { line: 88, column: 4 }, end: { line: 88, column: 11 } }, '57': { start: { line: 90, column: 15 }, end: { line: 90, column: 38 } }, '58': { start: { line: 91, column: 14 }, end: { line: 91, column: 20 } }, '59': { start: { line: 92, column: 2 }, end: { line: 99, column: 3 } }, '60': { start: { line: 93, column: 4 }, end: { line: 93, column: 36 } }, '61': { start: { line: 94, column: 4 }, end: { line: 98, column: 5 } }, '62': { start: { line: 95, column: 6 }, end: { line: 95, column: 43 } }, '63': { start: { line: 96, column: 11 }, end: { line: 98, column: 5 } }, '64': { start: { line: 97, column: 6 }, end: { line: 97, column: 51 } }, '65': { start: { line: 100, column: 2 }, end: { line: 100, column: 41 } }, '66': { start: { line: 102, column: 0 }, end: { line: 102, column: 58 } }, '67': { start: { line: 104, column: 27 }, end: { line: 118, column: 1 } }, '68': { start: { line: 105, column: 2 }, end: { line: 107, column: 3 } }, '69': { start: { line: 106, column: 4 }, end: { line: 106, column: 11 } }, '70': { start: { line: 108, column: 2 }, end: { line: 110, column: 3 } }, '71': { start: { line: 109, column: 4 }, end: { line: 109, column: 11 } }, '72': { start: { line: 111, column: 13 }, end: { line: 111, column: 19 } }, '73': { start: { line: 112, column: 14 }, end: { line: 112, column: 20 } }, '74': { start: { line: 113, column: 2 }, end: { line: 116, column: 3 } }, '75': { start: { line: 114, column: 4 }, end: { line: 114, column: 52 } }, '76': { start: { line: 115, column: 4 }, end: { line: 115, column: 30 } }, '77': { start: { line: 117, column: 2 }, end: { line: 117, column: 17 } }, '78': { start: { line: 119, column: 0 }, end: { line: 119, column: 37 } }, '79': { start: { line: 122, column: 2 }, end: { line: 124, column: 3 } }, '80': { start: { line: 123, column: 4 }, end: { line: 123, column: 11 } }, '81': { start: { line: 125, column: 2 }, end: { line: 127, column: 3 } }, '82': { start: { line: 126, column: 4 }, end: { line: 126, column: 11 } }, '83': { start: { line: 128, column: 15 }, end: { line: 128, column: 38 } }, '84': { start: { line: 129, column: 14 }, end: { line: 129, column: 20 } }, '85': { start: { line: 130, column: 14 }, end: { line: 130, column: 16 } }, '86': { start: { line: 131, column: 2 }, end: { line: 136, column: 3 } }, '87': { start: { line: 132, column: 4 }, end: { line: 132, column: 36 } }, '88': { start: { line: 133, column: 4 }, end: { line: 135, column: 5 } }, '89': { start: { line: 134, column: 6 }, end: { line: 134, column: 44 } }, '90': { start: { line: 137, column: 2 }, end: { line: 137, column: 34 } }, '91': { start: { line: 139, column: 0 }, end: { line: 139, column: 60 } } }, fnMap: { '0': { name: 'collectChildrenDiffFilter', decl: { start: { line: 5, column: 16 }, end: { line: 5, column: 41 } }, loc: { start: { line: 5, column: 51 }, end: { line: 24, column: 1 } }, line: 5 }, '1': { name: 'objectsDiffFilter', decl: { start: { line: 27, column: 16 }, end: { line: 27, column: 33 } }, loc: { start: { line: 27, column: 43 }, end: { line: 63, column: 1 } }, line: 27 }, '2': { name: 'nestedPatchFilter', decl: { start: { line: 66, column: 34 }, end: { line: 66, column: 51 } }, loc: { start: { line: 66, column: 61 }, end: { line: 80, column: 1 } }, line: 66 }, '3': { name: 'collectChildrenPatchFilter', decl: { start: { line: 83, column: 49 }, end: { line: 83, column: 75 } }, loc: { start: { line: 83, column: 85 }, end: { line: 101, column: 1 } }, line: 83 }, '4': { name: 'nestedReverseFilter', decl: { start: { line: 104, column: 36 }, end: { line: 104, column: 55 } }, loc: { start: { line: 104, column: 65 }, end: { line: 118, column: 1 } }, line: 104 }, '5': { name: 'collectChildrenReverseFilter', decl: { start: { line: 121, column: 16 }, end: { line: 121, column: 44 } }, loc: { start: { line: 121, column: 54 }, end: { line: 138, column: 1 } }, line: 121 } }, branchMap: { '0': { loc: { start: { line: 6, column: 2 }, end: { line: 8, column: 3 } }, type: 'if', locations: [{ start: { line: 6, column: 2 }, end: { line: 8, column: 3 } }, { start: { line: 6, column: 2 }, end: { line: 8, column: 3 } }], line: 6 }, '1': { loc: { start: { line: 6, column: 6 }, end: { line: 6, column: 35 } }, type: 'binary-expr', locations: [{ start: { line: 6, column: 6 }, end: { line: 6, column: 14 } }, { start: { line: 6, column: 18 }, end: { line: 6, column: 35 } }], line: 6 }, '2': { loc: { start: { line: 14, column: 4 }, end: { line: 16, column: 5 } }, type: 'if', locations: [{ start: { line: 14, column: 4 }, end: { line: 16, column: 5 } }, { start: { line: 14, column: 4 }, end: { line: 16, column: 5 } }], line: 14 }, '3': { loc: { start: { line: 17, column: 13 }, end: { line: 17, column: 25 } }, type: 'binary-expr', locations: [{ start: { line: 17, column: 13 }, end: { line: 17, column: 19 } }, { start: { line: 17, column: 23 }, end: { line: 17, column: 25 } }], line: 17 }, '4': { loc: { start: { line: 20, column: 2 }, end: { line: 22, column: 3 } }, type: 'if', locations: [{ start: { line: 20, column: 2 }, end: { line: 22, column: 3 } }, { start: { line: 20, column: 2 }, end: { line: 22, column: 3 } }], line: 20 }, '5': { loc: { start: { line: 20, column: 6 }, end: { line: 20, column: 35 } }, type: 'binary-expr', locations: [{ start: { line: 20, column: 6 }, end: { line: 20, column: 12 } }, { start: { line: 20, column: 16 }, end: { line: 20, column: 35 } }], line: 20 }, '6': { loc: { start: { line: 28, column: 2 }, end: { line: 30, column: 3 } }, type: 'if', locations: [{ start: { line: 28, column: 2 }, end: { line: 30, column: 3 } }, { start: { line: 28, column: 2 }, end: { line: 30, column: 3 } }], line: 28 }, '7': { loc: { start: { line: 28, column: 6 }, end: { line: 28, column: 58 } }, type: 'binary-expr', locations: [{ start: { line: 28, column: 6 }, end: { line: 28, column: 25 } }, { start: { line: 28, column: 29 }, end: { line: 28, column: 58 } }], line: 28 }, '8': { loc: { start: { line: 36, column: 4 }, end: { line: 38, column: 5 } }, type: 'if', locations: [{ start: { line: 36, column: 4 }, end: { line: 38, column: 5 } }, { start: { line: 36, column: 4 }, end: { line: 38, column: 5 } }], line: 36 }, '9': { loc: { start: { line: 39, column: 4 }, end: { line: 41, column: 5 } }, type: 'if', locations: [{ start: { line: 39, column: 4 }, end: { line: 41, column: 5 } }, { start: { line: 39, column: 4 }, end: { line: 41, column: 5 } }], line: 39 }, '10': { loc: { start: { line: 39, column: 8 }, end: { line: 39, column: 56 } }, type: 'binary-expr', locations: [{ start: { line: 39, column: 8 }, end: { line: 39, column: 22 } }, { start: { line: 39, column: 26 }, end: { line: 39, column: 56 } }], line: 39 }, '11': { loc: { start: { line: 46, column: 4 }, end: { line: 48, column: 5 } }, type: 'if', locations: [{ start: { line: 46, column: 4 }, end: { line: 48, column: 5 } }, { start: { line: 46, column: 4 }, end: { line: 48, column: 5 } }], line: 46 }, '12': { loc: { start: { line: 49, column: 4 }, end: { line: 51, column: 5 } }, type: 'if', locations: [{ start: { line: 49, column: 4 }, end: { line: 51, column: 5 } }, { start: { line: 49, column: 4 }, end: { line: 51, column: 5 } }], line: 49 }, '13': { loc: { start: { line: 49, column: 8 }, end: { line: 49, column: 56 } }, type: 'binary-expr', locations: [{ start: { line: 49, column: 8 }, end: { line: 49, column: 22 } }, { start: { line: 49, column: 26 }, end: { line: 49, column: 56 } }], line: 49 }, '14': { loc: { start: { line: 52, column: 4 }, end: { line: 55, column: 5 } }, type: 'if', locations: [{ start: { line: 52, column: 4 }, end: { line: 55, column: 5 } }, { start: { line: 52, column: 4 }, end: { line: 55, column: 5 } }], line: 52 }, '15': { loc: { start: { line: 58, column: 2 }, end: { line: 61, column: 3 } }, type: 'if', locations: [{ start: { line: 58, column: 2 }, end: { line: 61, column: 3 } }, { start: { line: 58, column: 2 }, end: { line: 61, column: 3 } }], line: 58 }, '16': { loc: { start: { line: 58, column: 6 }, end: { line: 58, column: 56 } }, type: 'binary-expr', locations: [{ start: { line: 58, column: 6 }, end: { line: 58, column: 23 } }, { start: { line: 58, column: 27 }, end: { line: 58, column: 56 } }], line: 58 }, '17': { loc: { start: { line: 67, column: 2 }, end: { line: 69, column: 3 } }, type: 'if', locations: [{ start: { line: 67, column: 2 }, end: { line: 69, column: 3 } }, { start: { line: 67, column: 2 }, end: { line: 69, column: 3 } }], line: 67 }, '18': { loc: { start: { line: 70, column: 2 }, end: { line: 72, column: 3 } }, type: 'if', locations: [{ start: { line: 70, column: 2 }, end: { line: 72, column: 3 } }, { start: { line: 70, column: 2 }, end: { line: 72, column: 3 } }], line: 70 }, '19': { loc: { start: { line: 84, column: 2 }, end: { line: 86, column: 3 } }, type: 'if', locations: [{ start: { line: 84, column: 2 }, end: { line: 86, column: 3 } }, { start: { line: 84, column: 2 }, end: { line: 86, column: 3 } }], line: 84 }, '20': { loc: { start: { line: 84, column: 6 }, end: { line: 84, column: 35 } }, type: 'binary-expr', locations: [{ start: { line: 84, column: 6 }, end: { line: 84, column: 14 } }, { start: { line: 84, column: 18 }, end: { line: 84, column: 35 } }], line: 84 }, '21': { loc: { start: { line: 87, column: 2 }, end: { line: 89, column: 3 } }, type: 'if', locations: [{ start: { line: 87, column: 2 }, end: { line: 89, column: 3 } }, { start: { line: 87, column: 2 }, end: { line: 89, column: 3 } }], line: 87 }, '22': { loc: { start: { line: 94, column: 4 }, end: { line: 98, column: 5 } }, type: 'if', locations: [{ start: { line: 94, column: 4 }, end: { line: 98, column: 5 } }, { start: { line: 94, column: 4 }, end: { line: 98, column: 5 } }], line: 94 }, '23': { loc: { start: { line: 94, column: 8 }, end: { line: 94, column: 105 } }, type: 'binary-expr', locations: [{ start: { line: 94, column: 8 }, end: { line: 94, column: 75 } }, { start: { line: 94, column: 79 }, end: { line: 94, column: 105 } }], line: 94 }, '24': { loc: { start: { line: 96, column: 11 }, end: { line: 98, column: 5 } }, type: 'if', locations: [{ start: { line: 96, column: 11 }, end: { line: 98, column: 5 } }, { start: { line: 96, column: 11 }, end: { line: 98, column: 5 } }], line: 96 }, '25': { loc: { start: { line: 105, column: 2 }, end: { line: 107, column: 3 } }, type: 'if', locations: [{ start: { line: 105, column: 2 }, end: { line: 107, column: 3 } }, { start: { line: 105, column: 2 }, end: { line: 107, column: 3 } }], line: 105 }, '26': { loc: { start: { line: 108, column: 2 }, end: { line: 110, column: 3 } }, type: 'if', locations: [{ start: { line: 108, column: 2 }, end: { line: 110, column: 3 } }, { start: { line: 108, column: 2 }, end: { line: 110, column: 3 } }], line: 108 }, '27': { loc: { start: { line: 122, column: 2 }, end: { line: 124, column: 3 } }, type: 'if', locations: [{ start: { line: 122, column: 2 }, end: { line: 124, column: 3 } }, { start: { line: 122, column: 2 }, end: { line: 124, column: 3 } }], line: 122 }, '28': { loc: { start: { line: 122, column: 6 }, end: { line: 122, column: 35 } }, type: 'binary-expr', locations: [{ start: { line: 122, column: 6 }, end: { line: 122, column: 14 } }, { start: { line: 122, column: 18 }, end: { line: 122, column: 35 } }], line: 122 }, '29': { loc: { start: { line: 125, column: 2 }, end: { line: 127, column: 3 } }, type: 'if', locations: [{ start: { line: 125, column: 2 }, end: { line: 127, column: 3 } }, { start: { line: 125, column: 2 }, end: { line: 127, column: 3 } }], line: 125 }, '30': { loc: { start: { line: 133, column: 4 }, end: { line: 135, column: 5 } }, type: 'if', locations: [{ start: { line: 133, column: 4 }, end: { line: 135, column: 5 } }, { start: { line: 133, column: 4 }, end: { line: 135, column: 5 } }], line: 133 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0, '74': 0, '75': 0, '76': 0, '77': 0, '78': 0, '79': 0, '80': 0, '81': 0, '82': 0, '83': 0, '84': 0, '85': 0, '86': 0, '87': 0, '88': 0, '89': 0, '90': 0, '91': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0], '15': [0, 0], '16': [0, 0], '17': [0, 0], '18': [0, 0], '19': [0, 0], '20': [0, 0], '21': [0, 0], '22': [0, 0], '23': [0, 0], '24': [0, 0], '25': [0, 0], '26': [0, 0], '27': [0, 0], '28': [0, 0], '29': [0, 0], '30': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();function collectChildrenDiffFilter(context) {
  cov_14lky13xfg.f[0]++;cov_14lky13xfg.s[0]++;if ((cov_14lky13xfg.b[1][0]++, !context) || (cov_14lky13xfg.b[1][1]++, !context.children)) {
    cov_14lky13xfg.b[0][0]++;cov_14lky13xfg.s[1]++;return;
  } else {
    cov_14lky13xfg.b[0][1]++;
  }var length = (cov_14lky13xfg.s[2]++, context.children.length);var child = (cov_14lky13xfg.s[3]++, void 0);var result = (cov_14lky13xfg.s[4]++, context.result);cov_14lky13xfg.s[5]++;for (var index = 0; index < length; index++) {
    cov_14lky13xfg.s[6]++;child = context.children[index];cov_14lky13xfg.s[7]++;if (typeof child.result === 'undefined') {
      cov_14lky13xfg.b[2][0]++;cov_14lky13xfg.s[8]++;continue;
    } else {
      cov_14lky13xfg.b[2][1]++;
    }cov_14lky13xfg.s[9]++;result = (cov_14lky13xfg.b[3][0]++, result) || (cov_14lky13xfg.b[3][1]++, {});cov_14lky13xfg.s[10]++;result[child.childName] = child.result;
  }cov_14lky13xfg.s[11]++;if ((cov_14lky13xfg.b[5][0]++, result) && (cov_14lky13xfg.b[5][1]++, context.leftIsArray)) {
    cov_14lky13xfg.b[4][0]++;cov_14lky13xfg.s[12]++;result._t = 'a';
  } else {
    cov_14lky13xfg.b[4][1]++;
  }cov_14lky13xfg.s[13]++;context.setResult(result).exit();
}cov_14lky13xfg.s[14]++;collectChildrenDiffFilter.filterName = 'collectChildren';function objectsDiffFilter(context) {
  cov_14lky13xfg.f[1]++;cov_14lky13xfg.s[15]++;if ((cov_14lky13xfg.b[7][0]++, context.leftIsArray) || (cov_14lky13xfg.b[7][1]++, context.leftType !== 'object')) {
    cov_14lky13xfg.b[6][0]++;cov_14lky13xfg.s[16]++;return;
  } else {
    cov_14lky13xfg.b[6][1]++;
  }var name = (cov_14lky13xfg.s[17]++, void 0);var child = (cov_14lky13xfg.s[18]++, void 0);var propertyFilter = (cov_14lky13xfg.s[19]++, context.options.propertyFilter);cov_14lky13xfg.s[20]++;for (name in context.left) {
    cov_14lky13xfg.s[21]++;if (!Object.prototype.hasOwnProperty.call(context.left, name)) {
      cov_14lky13xfg.b[8][0]++;cov_14lky13xfg.s[22]++;continue;
    } else {
      cov_14lky13xfg.b[8][1]++;
    }cov_14lky13xfg.s[23]++;if ((cov_14lky13xfg.b[10][0]++, propertyFilter) && (cov_14lky13xfg.b[10][1]++, !propertyFilter(name, context))) {
      cov_14lky13xfg.b[9][0]++;cov_14lky13xfg.s[24]++;continue;
    } else {
      cov_14lky13xfg.b[9][1]++;
    }cov_14lky13xfg.s[25]++;child = new DiffContext(context.left[name], context.right[name]);cov_14lky13xfg.s[26]++;context.push(child, name);
  }cov_14lky13xfg.s[27]++;for (name in context.right) {
    cov_14lky13xfg.s[28]++;if (!Object.prototype.hasOwnProperty.call(context.right, name)) {
      cov_14lky13xfg.b[11][0]++;cov_14lky13xfg.s[29]++;continue;
    } else {
      cov_14lky13xfg.b[11][1]++;
    }cov_14lky13xfg.s[30]++;if ((cov_14lky13xfg.b[13][0]++, propertyFilter) && (cov_14lky13xfg.b[13][1]++, !propertyFilter(name, context))) {
      cov_14lky13xfg.b[12][0]++;cov_14lky13xfg.s[31]++;continue;
    } else {
      cov_14lky13xfg.b[12][1]++;
    }cov_14lky13xfg.s[32]++;if (typeof context.left[name] === 'undefined') {
      cov_14lky13xfg.b[14][0]++;cov_14lky13xfg.s[33]++;child = new DiffContext(undefined, context.right[name]);cov_14lky13xfg.s[34]++;context.push(child, name);
    } else {
      cov_14lky13xfg.b[14][1]++;
    }
  }cov_14lky13xfg.s[35]++;if ((cov_14lky13xfg.b[16][0]++, !context.children) || (cov_14lky13xfg.b[16][1]++, context.children.length === 0)) {
    cov_14lky13xfg.b[15][0]++;cov_14lky13xfg.s[36]++;context.setResult(undefined).exit();cov_14lky13xfg.s[37]++;return;
  } else {
    cov_14lky13xfg.b[15][1]++;
  }cov_14lky13xfg.s[38]++;context.exit();
}cov_14lky13xfg.s[39]++;objectsDiffFilter.filterName = 'objects';cov_14lky13xfg.s[40]++;var patchFilter$1 = function nestedPatchFilter(context) {
  cov_14lky13xfg.f[2]++;cov_14lky13xfg.s[41]++;if (!context.nested) {
    cov_14lky13xfg.b[17][0]++;cov_14lky13xfg.s[42]++;return;
  } else {
    cov_14lky13xfg.b[17][1]++;
  }cov_14lky13xfg.s[43]++;if (context.delta._t) {
    cov_14lky13xfg.b[18][0]++;cov_14lky13xfg.s[44]++;return;
  } else {
    cov_14lky13xfg.b[18][1]++;
  }var name = (cov_14lky13xfg.s[45]++, void 0);var child = (cov_14lky13xfg.s[46]++, void 0);cov_14lky13xfg.s[47]++;for (name in context.delta) {
    cov_14lky13xfg.s[48]++;child = new PatchContext(context.left[name], context.delta[name]);cov_14lky13xfg.s[49]++;context.push(child, name);
  }cov_14lky13xfg.s[50]++;context.exit();
};cov_14lky13xfg.s[51]++;patchFilter$1.filterName = 'objects';cov_14lky13xfg.s[52]++;var collectChildrenPatchFilter = function collectChildrenPatchFilter(context) {
  cov_14lky13xfg.f[3]++;cov_14lky13xfg.s[53]++;if ((cov_14lky13xfg.b[20][0]++, !context) || (cov_14lky13xfg.b[20][1]++, !context.children)) {
    cov_14lky13xfg.b[19][0]++;cov_14lky13xfg.s[54]++;return;
  } else {
    cov_14lky13xfg.b[19][1]++;
  }cov_14lky13xfg.s[55]++;if (context.delta._t) {
    cov_14lky13xfg.b[21][0]++;cov_14lky13xfg.s[56]++;return;
  } else {
    cov_14lky13xfg.b[21][1]++;
  }var length = (cov_14lky13xfg.s[57]++, context.children.length);var child = (cov_14lky13xfg.s[58]++, void 0);cov_14lky13xfg.s[59]++;for (var index = 0; index < length; index++) {
    cov_14lky13xfg.s[60]++;child = context.children[index];cov_14lky13xfg.s[61]++;if ((cov_14lky13xfg.b[23][0]++, Object.prototype.hasOwnProperty.call(context.left, child.childName)) && (cov_14lky13xfg.b[23][1]++, child.result === undefined)) {
      cov_14lky13xfg.b[22][0]++;cov_14lky13xfg.s[62]++;delete context.left[child.childName];
    } else {
      cov_14lky13xfg.b[22][1]++;cov_14lky13xfg.s[63]++;if (context.left[child.childName] !== child.result) {
        cov_14lky13xfg.b[24][0]++;cov_14lky13xfg.s[64]++;context.left[child.childName] = child.result;
      } else {
        cov_14lky13xfg.b[24][1]++;
      }
    }
  }cov_14lky13xfg.s[65]++;context.setResult(context.left).exit();
};cov_14lky13xfg.s[66]++;collectChildrenPatchFilter.filterName = 'collectChildren';cov_14lky13xfg.s[67]++;var reverseFilter$1 = function nestedReverseFilter(context) {
  cov_14lky13xfg.f[4]++;cov_14lky13xfg.s[68]++;if (!context.nested) {
    cov_14lky13xfg.b[25][0]++;cov_14lky13xfg.s[69]++;return;
  } else {
    cov_14lky13xfg.b[25][1]++;
  }cov_14lky13xfg.s[70]++;if (context.delta._t) {
    cov_14lky13xfg.b[26][0]++;cov_14lky13xfg.s[71]++;return;
  } else {
    cov_14lky13xfg.b[26][1]++;
  }var name = (cov_14lky13xfg.s[72]++, void 0);var child = (cov_14lky13xfg.s[73]++, void 0);cov_14lky13xfg.s[74]++;for (name in context.delta) {
    cov_14lky13xfg.s[75]++;child = new ReverseContext(context.delta[name]);cov_14lky13xfg.s[76]++;context.push(child, name);
  }cov_14lky13xfg.s[77]++;context.exit();
};cov_14lky13xfg.s[78]++;reverseFilter$1.filterName = 'objects';function collectChildrenReverseFilter(context) {
  cov_14lky13xfg.f[5]++;cov_14lky13xfg.s[79]++;if ((cov_14lky13xfg.b[28][0]++, !context) || (cov_14lky13xfg.b[28][1]++, !context.children)) {
    cov_14lky13xfg.b[27][0]++;cov_14lky13xfg.s[80]++;return;
  } else {
    cov_14lky13xfg.b[27][1]++;
  }cov_14lky13xfg.s[81]++;if (context.delta._t) {
    cov_14lky13xfg.b[29][0]++;cov_14lky13xfg.s[82]++;return;
  } else {
    cov_14lky13xfg.b[29][1]++;
  }var length = (cov_14lky13xfg.s[83]++, context.children.length);var child = (cov_14lky13xfg.s[84]++, void 0);var delta = (cov_14lky13xfg.s[85]++, {});cov_14lky13xfg.s[86]++;for (var index = 0; index < length; index++) {
    cov_14lky13xfg.s[87]++;child = context.children[index];cov_14lky13xfg.s[88]++;if (delta[child.childName] !== child.result) {
      cov_14lky13xfg.b[30][0]++;cov_14lky13xfg.s[89]++;delta[child.childName] = child.result;
    } else {
      cov_14lky13xfg.b[30][1]++;
    }
  }cov_14lky13xfg.s[90]++;context.setResult(delta).exit();
}cov_14lky13xfg.s[91]++;collectChildrenReverseFilter.filterName = 'collectChildren';

var cov_i0rcratvd = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/filters/lcs.js',
      hash = '0a025babc40e5e4f97d1b86f1987ef7201496109',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/filters/lcs.js', statementMap: { '0': { start: { line: 9, column: 19 }, end: { line: 11, column: 1 } }, '1': { start: { line: 10, column: 2 }, end: { line: 10, column: 43 } }, '2': { start: { line: 13, column: 19 }, end: { line: 39, column: 1 } }, '3': { start: { line: 14, column: 13 }, end: { line: 14, column: 26 } }, '4': { start: { line: 15, column: 13 }, end: { line: 15, column: 26 } }, '5': { start: { line: 16, column: 10 }, end: { line: 16, column: 16 } }, '6': { start: { line: 17, column: 10 }, end: { line: 17, column: 16 } }, '7': { start: { line: 20, column: 15 }, end: { line: 20, column: 25 } }, '8': { start: { line: 21, column: 2 }, end: { line: 26, column: 3 } }, '9': { start: { line: 22, column: 4 }, end: { line: 22, column: 27 } }, '10': { start: { line: 23, column: 4 }, end: { line: 25, column: 5 } }, '11': { start: { line: 24, column: 6 }, end: { line: 24, column: 23 } }, '12': { start: { line: 27, column: 2 }, end: { line: 27, column: 23 } }, '13': { start: { line: 29, column: 2 }, end: { line: 37, column: 3 } }, '14': { start: { line: 30, column: 4 }, end: { line: 36, column: 5 } }, '15': { start: { line: 31, column: 6 }, end: { line: 35, column: 7 } }, '16': { start: { line: 32, column: 8 }, end: { line: 32, column: 48 } }, '17': { start: { line: 34, column: 8 }, end: { line: 34, column: 68 } }, '18': { start: { line: 38, column: 2 }, end: { line: 38, column: 16 } }, '19': { start: { line: 41, column: 16 }, end: { line: 63, column: 1 } }, '20': { start: { line: 42, column: 2 }, end: { line: 48, column: 3 } }, '21': { start: { line: 43, column: 4 }, end: { line: 47, column: 6 } }, '22': { start: { line: 50, column: 2 }, end: { line: 56, column: 3 } }, '23': { start: { line: 51, column: 22 }, end: { line: 51, column: 88 } }, '24': { start: { line: 52, column: 4 }, end: { line: 52, column: 50 } }, '25': { start: { line: 53, column: 4 }, end: { line: 53, column: 42 } }, '26': { start: { line: 54, column: 4 }, end: { line: 54, column: 42 } }, '27': { start: { line: 55, column: 4 }, end: { line: 55, column: 23 } }, '28': { start: { line: 58, column: 2 }, end: { line: 62, column: 3 } }, '29': { start: { line: 59, column: 4 }, end: { line: 59, column: 74 } }, '30': { start: { line: 61, column: 4 }, end: { line: 61, column: 74 } }, '31': { start: { line: 65, column: 10 }, end: { line: 73, column: 1 } }, '32': { start: { line: 66, column: 21 }, end: { line: 66, column: 34 } }, '33': { start: { line: 67, column: 15 }, end: { line: 67, column: 80 } }, '34': { start: { line: 68, column: 15 }, end: { line: 68, column: 92 } }, '35': { start: { line: 69, column: 2 }, end: { line: 71, column: 3 } }, '36': { start: { line: 70, column: 4 }, end: { line: 70, column: 47 } }, '37': { start: { line: 72, column: 2 }, end: { line: 72, column: 16 } } }, fnMap: { '0': { name: 'defaultMatch', decl: { start: { line: 9, column: 28 }, end: { line: 9, column: 40 } }, loc: { start: { line: 9, column: 73 }, end: { line: 11, column: 1 } }, line: 9 }, '1': { name: 'lengthMatrix', decl: { start: { line: 13, column: 28 }, end: { line: 13, column: 40 } }, loc: { start: { line: 13, column: 73 }, end: { line: 39, column: 1 } }, line: 13 }, '2': { name: 'backtrack', decl: { start: { line: 41, column: 25 }, end: { line: 41, column: 34 } }, loc: { start: { line: 41, column: 84 }, end: { line: 63, column: 1 } }, line: 41 }, '3': { name: 'get', decl: { start: { line: 65, column: 19 }, end: { line: 65, column: 22 } }, loc: { start: { line: 65, column: 55 }, end: { line: 73, column: 1 } }, line: 65 } }, branchMap: { '0': { loc: { start: { line: 31, column: 6 }, end: { line: 35, column: 7 } }, type: 'if', locations: [{ start: { line: 31, column: 6 }, end: { line: 35, column: 7 } }, { start: { line: 31, column: 6 }, end: { line: 35, column: 7 } }], line: 31 }, '1': { loc: { start: { line: 42, column: 2 }, end: { line: 48, column: 3 } }, type: 'if', locations: [{ start: { line: 42, column: 2 }, end: { line: 48, column: 3 } }, { start: { line: 42, column: 2 }, end: { line: 48, column: 3 } }], line: 42 }, '2': { loc: { start: { line: 42, column: 6 }, end: { line: 42, column: 34 } }, type: 'binary-expr', locations: [{ start: { line: 42, column: 6 }, end: { line: 42, column: 18 } }, { start: { line: 42, column: 22 }, end: { line: 42, column: 34 } }], line: 42 }, '3': { loc: { start: { line: 50, column: 2 }, end: { line: 56, column: 3 } }, type: 'if', locations: [{ start: { line: 50, column: 2 }, end: { line: 56, column: 3 } }, { start: { line: 50, column: 2 }, end: { line: 56, column: 3 } }], line: 50 }, '4': { loc: { start: { line: 58, column: 2 }, end: { line: 62, column: 3 } }, type: 'if', locations: [{ start: { line: 58, column: 2 }, end: { line: 62, column: 3 } }, { start: { line: 58, column: 2 }, end: { line: 62, column: 3 } }], line: 58 }, '5': { loc: { start: { line: 66, column: 21 }, end: { line: 66, column: 34 } }, type: 'binary-expr', locations: [{ start: { line: 66, column: 21 }, end: { line: 66, column: 28 } }, { start: { line: 66, column: 32 }, end: { line: 66, column: 34 } }], line: 66 }, '6': { loc: { start: { line: 67, column: 44 }, end: { line: 67, column: 65 } }, type: 'binary-expr', locations: [{ start: { line: 67, column: 44 }, end: { line: 67, column: 49 } }, { start: { line: 67, column: 53 }, end: { line: 67, column: 65 } }], line: 67 }, '7': { loc: { start: { line: 69, column: 2 }, end: { line: 71, column: 3 } }, type: 'if', locations: [{ start: { line: 69, column: 2 }, end: { line: 71, column: 3 } }, { start: { line: 69, column: 2 }, end: { line: 71, column: 3 } }], line: 69 }, '8': { loc: { start: { line: 69, column: 6 }, end: { line: 69, column: 62 } }, type: 'binary-expr', locations: [{ start: { line: 69, column: 6 }, end: { line: 69, column: 32 } }, { start: { line: 69, column: 36 }, end: { line: 69, column: 62 } }], line: 69 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();cov_i0rcratvd.s[0]++; /*
                          LCS implementation that supports arrays or strings
                          reference: http://en.wikipedia.org/wiki/Longest_common_subsequence_problem
                          */var defaultMatch = function defaultMatch(array1, array2, index1, index2) {
  cov_i0rcratvd.f[0]++;cov_i0rcratvd.s[1]++;return array1[index1] === array2[index2];
};cov_i0rcratvd.s[2]++;var lengthMatrix = function lengthMatrix(array1, array2, match, context) {
  cov_i0rcratvd.f[1]++;var len1 = (cov_i0rcratvd.s[3]++, array1.length);var len2 = (cov_i0rcratvd.s[4]++, array2.length);var x = (cov_i0rcratvd.s[5]++, void 0),
      y = (cov_i0rcratvd.s[6]++, void 0); // initialize empty matrix of len1+1 x len2+1
  var matrix = (cov_i0rcratvd.s[7]++, [len1 + 1]);cov_i0rcratvd.s[8]++;for (x = 0; x < len1 + 1; x++) {
    cov_i0rcratvd.s[9]++;matrix[x] = [len2 + 1];cov_i0rcratvd.s[10]++;for (y = 0; y < len2 + 1; y++) {
      cov_i0rcratvd.s[11]++;matrix[x][y] = 0;
    }
  }cov_i0rcratvd.s[12]++;matrix.match = match; // save sequence lengths for each coordinate
  cov_i0rcratvd.s[13]++;for (x = 1; x < len1 + 1; x++) {
    cov_i0rcratvd.s[14]++;for (y = 1; y < len2 + 1; y++) {
      cov_i0rcratvd.s[15]++;if (match(array1, array2, x - 1, y - 1, context)) {
        cov_i0rcratvd.b[0][0]++;cov_i0rcratvd.s[16]++;matrix[x][y] = matrix[x - 1][y - 1] + 1;
      } else {
        cov_i0rcratvd.b[0][1]++;cov_i0rcratvd.s[17]++;matrix[x][y] = Math.max(matrix[x - 1][y], matrix[x][y - 1]);
      }
    }
  }cov_i0rcratvd.s[18]++;return matrix;
};cov_i0rcratvd.s[19]++;var backtrack = function backtrack(matrix, array1, array2, index1, index2, context) {
  cov_i0rcratvd.f[2]++;cov_i0rcratvd.s[20]++;if ((cov_i0rcratvd.b[2][0]++, index1 === 0) || (cov_i0rcratvd.b[2][1]++, index2 === 0)) {
    cov_i0rcratvd.b[1][0]++;cov_i0rcratvd.s[21]++;return { sequence: [], indices1: [], indices2: [] };
  } else {
    cov_i0rcratvd.b[1][1]++;
  }cov_i0rcratvd.s[22]++;if (matrix.match(array1, array2, index1 - 1, index2 - 1, context)) {
    cov_i0rcratvd.b[3][0]++;var subsequence = (cov_i0rcratvd.s[23]++, backtrack(matrix, array1, array2, index1 - 1, index2 - 1, context));cov_i0rcratvd.s[24]++;subsequence.sequence.push(array1[index1 - 1]);cov_i0rcratvd.s[25]++;subsequence.indices1.push(index1 - 1);cov_i0rcratvd.s[26]++;subsequence.indices2.push(index2 - 1);cov_i0rcratvd.s[27]++;return subsequence;
  } else {
    cov_i0rcratvd.b[3][1]++;
  }cov_i0rcratvd.s[28]++;if (matrix[index1][index2 - 1] > matrix[index1 - 1][index2]) {
    cov_i0rcratvd.b[4][0]++;cov_i0rcratvd.s[29]++;return backtrack(matrix, array1, array2, index1, index2 - 1, context);
  } else {
    cov_i0rcratvd.b[4][1]++;cov_i0rcratvd.s[30]++;return backtrack(matrix, array1, array2, index1 - 1, index2, context);
  }
};cov_i0rcratvd.s[31]++;var get$1$1 = function get$$1(array1, array2, match, context) {
  cov_i0rcratvd.f[3]++;var innerContext = (cov_i0rcratvd.s[32]++, (cov_i0rcratvd.b[5][0]++, context) || (cov_i0rcratvd.b[5][1]++, {}));var matrix = (cov_i0rcratvd.s[33]++, lengthMatrix(array1, array2, (cov_i0rcratvd.b[6][0]++, match) || (cov_i0rcratvd.b[6][1]++, defaultMatch), innerContext));var result = (cov_i0rcratvd.s[34]++, backtrack(matrix, array1, array2, array1.length, array2.length, innerContext));cov_i0rcratvd.s[35]++;if ((cov_i0rcratvd.b[8][0]++, typeof array1 === 'string') && (cov_i0rcratvd.b[8][1]++, typeof array2 === 'string')) {
    cov_i0rcratvd.b[7][0]++;cov_i0rcratvd.s[36]++;result.sequence = result.sequence.join('');
  } else {
    cov_i0rcratvd.b[7][1]++;
  }cov_i0rcratvd.s[37]++;return result;
};var lcs = { get: get$1$1 };

var cov_g15fjodrd = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/filters/arrays.js',
      hash = 'a4fb2848fb44c24307acdebe417f136230c14c6f',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/filters/arrays.js', statementMap: { '0': { start: { line: 7, column: 17 }, end: { line: 7, column: 18 } }, '1': { start: { line: 9, column: 14 }, end: { line: 11, column: 1 } }, '2': { start: { line: 10, column: 2 }, end: { line: 10, column: 28 } }, '3': { start: { line: 13, column: 19 }, end: { line: 23, column: 1 } }, '4': { start: { line: 14, column: 2 }, end: { line: 14, column: 29 } }, '5': { start: { line: 16, column: 15 }, end: { line: 16, column: 27 } }, '6': { start: { line: 17, column: 2 }, end: { line: 21, column: 3 } }, '7': { start: { line: 18, column: 4 }, end: { line: 20, column: 5 } }, '8': { start: { line: 19, column: 6 }, end: { line: 19, column: 15 } }, '9': { start: { line: 22, column: 2 }, end: { line: 22, column: 12 } }, '10': { start: { line: 26, column: 2 }, end: { line: 34, column: 3 } }, '11': { start: { line: 27, column: 15 }, end: { line: 27, column: 29 } }, '12': { start: { line: 28, column: 4 }, end: { line: 33, column: 5 } }, '13': { start: { line: 29, column: 17 }, end: { line: 29, column: 31 } }, '14': { start: { line: 30, column: 6 }, end: { line: 32, column: 7 } }, '15': { start: { line: 31, column: 8 }, end: { line: 31, column: 20 } }, '16': { start: { line: 38, column: 15 }, end: { line: 38, column: 29 } }, '17': { start: { line: 39, column: 15 }, end: { line: 39, column: 29 } }, '18': { start: { line: 40, column: 2 }, end: { line: 42, column: 3 } }, '19': { start: { line: 41, column: 4 }, end: { line: 41, column: 16 } }, '20': { start: { line: 43, column: 2 }, end: { line: 45, column: 3 } }, '21': { start: { line: 44, column: 4 }, end: { line: 44, column: 17 } }, '22': { start: { line: 46, column: 19 }, end: { line: 46, column: 37 } }, '23': { start: { line: 47, column: 2 }, end: { line: 50, column: 3 } }, '24': { start: { line: 49, column: 4 }, end: { line: 49, column: 56 } }, '25': { start: { line: 51, column: 14 }, end: { line: 51, column: 20 } }, '26': { start: { line: 52, column: 14 }, end: { line: 52, column: 20 } }, '27': { start: { line: 53, column: 2 }, end: { line: 61, column: 3 } }, '28': { start: { line: 54, column: 4 }, end: { line: 54, column: 50 } }, '29': { start: { line: 55, column: 4 }, end: { line: 55, column: 39 } }, '30': { start: { line: 56, column: 4 }, end: { line: 58, column: 5 } }, '31': { start: { line: 57, column: 6 }, end: { line: 57, column: 70 } }, '32': { start: { line: 60, column: 4 }, end: { line: 60, column: 31 } }, '33': { start: { line: 62, column: 2 }, end: { line: 64, column: 3 } }, '34': { start: { line: 63, column: 4 }, end: { line: 63, column: 17 } }, '35': { start: { line: 65, column: 2 }, end: { line: 73, column: 3 } }, '36': { start: { line: 66, column: 4 }, end: { line: 66, column: 50 } }, '37': { start: { line: 67, column: 4 }, end: { line: 67, column: 39 } }, '38': { start: { line: 68, column: 4 }, end: { line: 70, column: 5 } }, '39': { start: { line: 69, column: 6 }, end: { line: 69, column: 70 } }, '40': { start: { line: 72, column: 4 }, end: { line: 72, column: 31 } }, '41': { start: { line: 74, column: 2 }, end: { line: 76, column: 3 } }, '42': { start: { line: 75, column: 4 }, end: { line: 75, column: 17 } }, '43': { start: { line: 77, column: 2 }, end: { line: 77, column: 25 } }, '44': { start: { line: 80, column: 24 }, end: { line: 217, column: 1 } }, '45': { start: { line: 81, column: 2 }, end: { line: 83, column: 3 } }, '46': { start: { line: 82, column: 4 }, end: { line: 82, column: 11 } }, '47': { start: { line: 85, column: 21 }, end: { line: 88, column: 3 } }, '48': { start: { line: 89, column: 19 }, end: { line: 89, column: 20 } }, '49': { start: { line: 90, column: 19 }, end: { line: 90, column: 20 } }, '50': { start: { line: 91, column: 14 }, end: { line: 91, column: 20 } }, '51': { start: { line: 92, column: 15 }, end: { line: 92, column: 21 } }, '52': { start: { line: 93, column: 15 }, end: { line: 93, column: 21 } }, '53': { start: { line: 94, column: 15 }, end: { line: 94, column: 27 } }, '54': { start: { line: 95, column: 15 }, end: { line: 95, column: 28 } }, '55': { start: { line: 96, column: 13 }, end: { line: 96, column: 26 } }, '56': { start: { line: 97, column: 13 }, end: { line: 97, column: 26 } }, '57': { start: { line: 99, column: 14 }, end: { line: 99, column: 20 } }, '58': { start: { line: 101, column: 2 }, end: { line: 103, column: 3 } }, '59': { start: { line: 102, column: 4 }, end: { line: 102, column: 85 } }, '60': { start: { line: 106, column: 2 }, end: { line: 111, column: 3 } }, '61': { start: { line: 107, column: 4 }, end: { line: 107, column: 23 } }, '62': { start: { line: 108, column: 4 }, end: { line: 108, column: 71 } }, '63': { start: { line: 109, column: 4 }, end: { line: 109, column: 31 } }, '64': { start: { line: 110, column: 4 }, end: { line: 110, column: 17 } }, '65': { start: { line: 113, column: 2 }, end: { line: 119, column: 3 } }, '66': { start: { line: 114, column: 4 }, end: { line: 114, column: 35 } }, '67': { start: { line: 115, column: 4 }, end: { line: 115, column: 35 } }, '68': { start: { line: 116, column: 4 }, end: { line: 116, column: 73 } }, '69': { start: { line: 117, column: 4 }, end: { line: 117, column: 32 } }, '70': { start: { line: 118, column: 4 }, end: { line: 118, column: 17 } }, '71': { start: { line: 120, column: 15 }, end: { line: 120, column: 21 } }, '72': { start: { line: 121, column: 2 }, end: { line: 136, column: 3 } }, '73': { start: { line: 122, column: 4 }, end: { line: 126, column: 5 } }, '74': { start: { line: 124, column: 6 }, end: { line: 124, column: 42 } }, '75': { start: { line: 125, column: 6 }, end: { line: 125, column: 13 } }, '76': { start: { line: 128, column: 4 }, end: { line: 130, column: 6 } }, '77': { start: { line: 131, column: 4 }, end: { line: 133, column: 5 } }, '78': { start: { line: 132, column: 6 }, end: { line: 132, column: 38 } }, '79': { start: { line: 134, column: 4 }, end: { line: 134, column: 37 } }, '80': { start: { line: 135, column: 4 }, end: { line: 135, column: 11 } }, '81': { start: { line: 137, column: 2 }, end: { line: 147, column: 3 } }, '82': { start: { line: 139, column: 4 }, end: { line: 141, column: 6 } }, '83': { start: { line: 142, column: 4 }, end: { line: 144, column: 5 } }, '84': { start: { line: 143, column: 6 }, end: { line: 143, column: 50 } }, '85': { start: { line: 145, column: 4 }, end: { line: 145, column: 37 } }, '86': { start: { line: 146, column: 4 }, end: { line: 146, column: 11 } }, '87': { start: { line: 149, column: 2 }, end: { line: 149, column: 33 } }, '88': { start: { line: 150, column: 2 }, end: { line: 150, column: 33 } }, '89': { start: { line: 153, column: 17 }, end: { line: 153, column: 60 } }, '90': { start: { line: 154, column: 17 }, end: { line: 154, column: 60 } }, '91': { start: { line: 155, column: 12 }, end: { line: 155, column: 65 } }, '92': { start: { line: 156, column: 21 }, end: { line: 156, column: 23 } }, '93': { start: { line: 157, column: 2 }, end: { line: 159, column: 4 } }, '94': { start: { line: 160, column: 2 }, end: { line: 166, column: 3 } }, '95': { start: { line: 161, column: 4 }, end: { line: 165, column: 5 } }, '96': { start: { line: 163, column: 6 }, end: { line: 163, column: 50 } }, '97': { start: { line: 164, column: 6 }, end: { line: 164, column: 31 } }, '98': { start: { line: 168, column: 19 }, end: { line: 168, column: 23 } }, '99': { start: { line: 169, column: 2 }, end: { line: 171, column: 3 } }, '100': { start: { line: 170, column: 4 }, end: { line: 170, column: 23 } }, '101': { start: { line: 172, column: 27 }, end: { line: 172, column: 32 } }, '102': { start: { line: 173, column: 2 }, end: { line: 175, column: 3 } }, '103': { start: { line: 174, column: 4 }, end: { line: 174, column: 30 } }, '104': { start: { line: 177, column: 27 }, end: { line: 177, column: 46 } }, '105': { start: { line: 178, column: 2 }, end: { line: 214, column: 3 } }, '106': { start: { line: 179, column: 24 }, end: { line: 179, column: 70 } }, '107': { start: { line: 180, column: 4 }, end: { line: 213, column: 5 } }, '108': { start: { line: 182, column: 19 }, end: { line: 182, column: 24 } }, '109': { start: { line: 183, column: 6 }, end: { line: 202, column: 7 } }, '110': { start: { line: 184, column: 8 }, end: { line: 201, column: 9 } }, '111': { start: { line: 185, column: 10 }, end: { line: 185, column: 50 } }, '112': { start: { line: 186, column: 10 }, end: { line: 200, column: 11 } }, '113': { start: { line: 188, column: 12 }, end: { line: 188, column: 65 } }, '114': { start: { line: 189, column: 12 }, end: { line: 192, column: 13 } }, '115': { start: { line: 191, column: 14 }, end: { line: 191, column: 43 } }, '116': { start: { line: 194, column: 12 }, end: { line: 194, column: 27 } }, '117': { start: { line: 195, column: 12 }, end: { line: 195, column: 81 } }, '118': { start: { line: 196, column: 12 }, end: { line: 196, column: 40 } }, '119': { start: { line: 197, column: 12 }, end: { line: 197, column: 53 } }, '120': { start: { line: 198, column: 12 }, end: { line: 198, column: 26 } }, '121': { start: { line: 199, column: 12 }, end: { line: 199, column: 18 } }, '122': { start: { line: 203, column: 6 }, end: { line: 206, column: 7 } }, '123': { start: { line: 205, column: 8 }, end: { line: 205, column: 40 } }, '124': { start: { line: 209, column: 6 }, end: { line: 209, column: 56 } }, '125': { start: { line: 210, column: 6 }, end: { line: 210, column: 56 } }, '126': { start: { line: 211, column: 6 }, end: { line: 211, column: 75 } }, '127': { start: { line: 212, column: 6 }, end: { line: 212, column: 34 } }, '128': { start: { line: 216, column: 2 }, end: { line: 216, column: 35 } }, '129': { start: { line: 218, column: 0 }, end: { line: 218, column: 33 } }, '130': { start: { line: 220, column: 14 }, end: { line: 229, column: 1 } }, '131': { start: { line: 222, column: 4 }, end: { line: 222, column: 17 } }, '132': { start: { line: 225, column: 4 }, end: { line: 227, column: 6 } }, '133': { start: { line: 226, column: 6 }, end: { line: 226, column: 31 } }, '134': { start: { line: 231, column: 25 }, end: { line: 314, column: 1 } }, '135': { start: { line: 232, column: 2 }, end: { line: 234, column: 3 } }, '136': { start: { line: 233, column: 4 }, end: { line: 233, column: 11 } }, '137': { start: { line: 235, column: 2 }, end: { line: 237, column: 3 } }, '138': { start: { line: 236, column: 4 }, end: { line: 236, column: 11 } }, '139': { start: { line: 238, column: 14 }, end: { line: 238, column: 20 } }, '140': { start: { line: 239, column: 15 }, end: { line: 239, column: 21 } }, '141': { start: { line: 241, column: 14 }, end: { line: 241, column: 27 } }, '142': { start: { line: 242, column: 14 }, end: { line: 242, column: 26 } }, '143': { start: { line: 245, column: 17 }, end: { line: 245, column: 19 } }, '144': { start: { line: 246, column: 17 }, end: { line: 246, column: 19 } }, '145': { start: { line: 247, column: 17 }, end: { line: 247, column: 19 } }, '146': { start: { line: 248, column: 2 }, end: { line: 273, column: 3 } }, '147': { start: { line: 249, column: 4 }, end: { line: 272, column: 5 } }, '148': { start: { line: 250, column: 6 }, end: { line: 271, column: 7 } }, '149': { start: { line: 252, column: 8 }, end: { line: 256, column: 9 } }, '150': { start: { line: 253, column: 10 }, end: { line: 253, column: 54 } }, '151': { start: { line: 255, column: 10 }, end: { line: 255, column: 137 } }, '152': { start: { line: 258, column: 8 }, end: { line: 270, column: 9 } }, '153': { start: { line: 260, column: 10 }, end: { line: 263, column: 13 } }, '154': { start: { line: 266, column: 10 }, end: { line: 269, column: 13 } }, '155': { start: { line: 276, column: 2 }, end: { line: 276, column: 48 } }, '156': { start: { line: 277, column: 2 }, end: { line: 288, column: 3 } }, '157': { start: { line: 278, column: 4 }, end: { line: 278, column: 29 } }, '158': { start: { line: 279, column: 20 }, end: { line: 279, column: 39 } }, '159': { start: { line: 280, column: 23 }, end: { line: 280, column: 49 } }, '160': { start: { line: 281, column: 4 }, end: { line: 287, column: 5 } }, '161': { start: { line: 283, column: 6 }, end: { line: 286, column: 9 } }, '162': { start: { line: 291, column: 2 }, end: { line: 291, column: 59 } }, '163': { start: { line: 292, column: 23 }, end: { line: 292, column: 38 } }, '164': { start: { line: 293, column: 2 }, end: { line: 296, column: 3 } }, '165': { start: { line: 294, column: 20 }, end: { line: 294, column: 35 } }, '166': { start: { line: 295, column: 4 }, end: { line: 295, column: 54 } }, '167': { start: { line: 299, column: 23 }, end: { line: 299, column: 38 } }, '168': { start: { line: 300, column: 14 }, end: { line: 300, column: 20 } }, '169': { start: { line: 301, column: 2 }, end: { line: 307, column: 3 } }, '170': { start: { line: 302, column: 4 }, end: { line: 306, column: 5 } }, '171': { start: { line: 303, column: 25 }, end: { line: 303, column: 40 } }, '172': { start: { line: 304, column: 6 }, end: { line: 304, column: 85 } }, '173': { start: { line: 305, column: 6 }, end: { line: 305, column: 46 } }, '174': { start: { line: 309, column: 2 }, end: { line: 312, column: 3 } }, '175': { start: { line: 310, column: 4 }, end: { line: 310, column: 43 } }, '176': { start: { line: 311, column: 4 }, end: { line: 311, column: 11 } }, '177': { start: { line: 313, column: 2 }, end: { line: 313, column: 17 } }, '178': { start: { line: 315, column: 0 }, end: { line: 315, column: 34 } }, '179': { start: { line: 317, column: 40 }, end: { line: 331, column: 1 } }, '180': { start: { line: 318, column: 2 }, end: { line: 320, column: 3 } }, '181': { start: { line: 319, column: 4 }, end: { line: 319, column: 11 } }, '182': { start: { line: 321, column: 2 }, end: { line: 323, column: 3 } }, '183': { start: { line: 322, column: 4 }, end: { line: 322, column: 11 } }, '184': { start: { line: 324, column: 15 }, end: { line: 324, column: 38 } }, '185': { start: { line: 325, column: 14 }, end: { line: 325, column: 20 } }, '186': { start: { line: 326, column: 2 }, end: { line: 329, column: 3 } }, '187': { start: { line: 327, column: 4 }, end: { line: 327, column: 36 } }, '188': { start: { line: 328, column: 4 }, end: { line: 328, column: 49 } }, '189': { start: { line: 330, column: 2 }, end: { line: 330, column: 41 } }, '190': { start: { line: 332, column: 0 }, end: { line: 332, column: 64 } }, '191': { start: { line: 334, column: 27 }, end: { line: 355, column: 1 } }, '192': { start: { line: 335, column: 2 }, end: { line: 341, column: 3 } }, '193': { start: { line: 336, column: 4 }, end: { line: 339, column: 5 } }, '194': { start: { line: 337, column: 6 }, end: { line: 337, column: 47 } }, '195': { start: { line: 338, column: 6 }, end: { line: 338, column: 106 } }, '196': { start: { line: 340, column: 4 }, end: { line: 340, column: 11 } }, '197': { start: { line: 342, column: 2 }, end: { line: 344, column: 3 } }, '198': { start: { line: 343, column: 4 }, end: { line: 343, column: 11 } }, '199': { start: { line: 345, column: 13 }, end: { line: 345, column: 19 } }, '200': { start: { line: 346, column: 14 }, end: { line: 346, column: 20 } }, '201': { start: { line: 347, column: 2 }, end: { line: 353, column: 3 } }, '202': { start: { line: 348, column: 4 }, end: { line: 350, column: 5 } }, '203': { start: { line: 349, column: 6 }, end: { line: 349, column: 15 } }, '204': { start: { line: 351, column: 4 }, end: { line: 351, column: 52 } }, '205': { start: { line: 352, column: 4 }, end: { line: 352, column: 30 } }, '206': { start: { line: 354, column: 2 }, end: { line: 354, column: 17 } }, '207': { start: { line: 356, column: 0 }, end: { line: 356, column: 36 } }, '208': { start: { line: 358, column: 29 }, end: { line: 392, column: 1 } }, '209': { start: { line: 359, column: 2 }, end: { line: 363, column: 3 } }, '210': { start: { line: 360, column: 4 }, end: { line: 360, column: 41 } }, '211': { start: { line: 361, column: 9 }, end: { line: 363, column: 3 } }, '212': { start: { line: 362, column: 4 }, end: { line: 362, column: 23 } }, '213': { start: { line: 365, column: 21 }, end: { line: 365, column: 27 } }, '214': { start: { line: 366, column: 2 }, end: { line: 389, column: 3 } }, '215': { start: { line: 367, column: 20 }, end: { line: 367, column: 37 } }, '216': { start: { line: 368, column: 4 }, end: { line: 388, column: 5 } }, '217': { start: { line: 369, column: 6 }, end: { line: 387, column: 7 } }, '218': { start: { line: 370, column: 28 }, end: { line: 370, column: 62 } }, '219': { start: { line: 371, column: 26 }, end: { line: 371, column: 38 } }, '220': { start: { line: 372, column: 8 }, end: { line: 374, column: 9 } }, '221': { start: { line: 373, column: 10 }, end: { line: 373, column: 31 } }, '222': { start: { line: 375, column: 8 }, end: { line: 379, column: 9 } }, '223': { start: { line: 376, column: 10 }, end: { line: 376, column: 25 } }, '224': { start: { line: 377, column: 15 }, end: { line: 379, column: 9 } }, '225': { start: { line: 378, column: 10 }, end: { line: 378, column: 25 } }, '226': { start: { line: 380, column: 13 }, end: { line: 387, column: 7 } }, '227': { start: { line: 381, column: 26 }, end: { line: 381, column: 60 } }, '228': { start: { line: 382, column: 8 }, end: { line: 384, column: 9 } }, '229': { start: { line: 383, column: 10 }, end: { line: 383, column: 25 } }, '230': { start: { line: 385, column: 13 }, end: { line: 387, column: 7 } }, '231': { start: { line: 386, column: 8 }, end: { line: 386, column: 23 } }, '232': { start: { line: 391, column: 2 }, end: { line: 391, column: 22 } }, '233': { start: { line: 395, column: 2 }, end: { line: 397, column: 3 } }, '234': { start: { line: 396, column: 4 }, end: { line: 396, column: 11 } }, '235': { start: { line: 398, column: 2 }, end: { line: 400, column: 3 } }, '236': { start: { line: 399, column: 4 }, end: { line: 399, column: 11 } }, '237': { start: { line: 401, column: 15 }, end: { line: 401, column: 38 } }, '238': { start: { line: 402, column: 14 }, end: { line: 402, column: 20 } }, '239': { start: { line: 403, column: 14 }, end: { line: 405, column: 3 } }, '240': { start: { line: 407, column: 2 }, end: { line: 416, column: 3 } }, '241': { start: { line: 408, column: 4 }, end: { line: 408, column: 36 } }, '242': { start: { line: 409, column: 15 }, end: { line: 409, column: 28 } }, '243': { start: { line: 410, column: 4 }, end: { line: 412, column: 5 } }, '244': { start: { line: 411, column: 6 }, end: { line: 411, column: 82 } }, '245': { start: { line: 413, column: 4 }, end: { line: 415, column: 5 } }, '246': { start: { line: 414, column: 6 }, end: { line: 414, column: 33 } }, '247': { start: { line: 417, column: 2 }, end: { line: 417, column: 34 } }, '248': { start: { line: 419, column: 0 }, end: { line: 419, column: 66 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 9, column: 68 }, end: { line: 9, column: 69 } }, loc: { start: { line: 9, column: 81 }, end: { line: 11, column: 1 } }, line: 9 }, '1': { name: '(anonymous_1)', decl: { start: { line: 13, column: 67 }, end: { line: 13, column: 68 } }, loc: { start: { line: 13, column: 90 }, end: { line: 15, column: 1 } }, line: 13 }, '2': { name: '(anonymous_2)', decl: { start: { line: 15, column: 4 }, end: { line: 15, column: 5 } }, loc: { start: { line: 15, column: 27 }, end: { line: 23, column: 1 } }, line: 15 }, '3': { name: 'arraysHaveMatchByRef', decl: { start: { line: 25, column: 9 }, end: { line: 25, column: 29 } }, loc: { start: { line: 25, column: 58 }, end: { line: 35, column: 1 } }, line: 25 }, '4': { name: 'matchItems', decl: { start: { line: 37, column: 9 }, end: { line: 37, column: 19 } }, loc: { start: { line: 37, column: 61 }, end: { line: 78, column: 1 } }, line: 37 }, '5': { name: 'arraysDiffFilter', decl: { start: { line: 80, column: 33 }, end: { line: 80, column: 49 } }, loc: { start: { line: 80, column: 59 }, end: { line: 217, column: 1 } }, line: 80 }, '6': { name: 'numerically', decl: { start: { line: 221, column: 24 }, end: { line: 221, column: 35 } }, loc: { start: { line: 221, column: 42 }, end: { line: 223, column: 3 } }, line: 221 }, '7': { name: 'numericallyBy', decl: { start: { line: 224, column: 26 }, end: { line: 224, column: 39 } }, loc: { start: { line: 224, column: 46 }, end: { line: 228, column: 3 } }, line: 224 }, '8': { name: '(anonymous_8)', decl: { start: { line: 225, column: 11 }, end: { line: 225, column: 12 } }, loc: { start: { line: 225, column: 27 }, end: { line: 227, column: 5 } }, line: 225 }, '9': { name: 'nestedPatchFilter', decl: { start: { line: 231, column: 34 }, end: { line: 231, column: 51 } }, loc: { start: { line: 231, column: 61 }, end: { line: 314, column: 1 } }, line: 231 }, '10': { name: 'collectChildrenPatchFilter', decl: { start: { line: 317, column: 49 }, end: { line: 317, column: 75 } }, loc: { start: { line: 317, column: 85 }, end: { line: 331, column: 1 } }, line: 317 }, '11': { name: 'arraysReverseFilter', decl: { start: { line: 334, column: 36 }, end: { line: 334, column: 55 } }, loc: { start: { line: 334, column: 65 }, end: { line: 355, column: 1 } }, line: 334 }, '12': { name: 'reverseArrayDeltaIndex', decl: { start: { line: 358, column: 38 }, end: { line: 358, column: 60 } }, loc: { start: { line: 358, column: 86 }, end: { line: 392, column: 1 } }, line: 358 }, '13': { name: 'collectChildrenReverseFilter', decl: { start: { line: 394, column: 16 }, end: { line: 394, column: 44 } }, loc: { start: { line: 394, column: 54 }, end: { line: 418, column: 1 } }, line: 394 } }, branchMap: { '0': { loc: { start: { line: 9, column: 14 }, end: { line: 11, column: 1 } }, type: 'cond-expr', locations: [{ start: { line: 9, column: 52 }, end: { line: 9, column: 65 } }, { start: { line: 9, column: 68 }, end: { line: 11, column: 1 } }], line: 9 }, '1': { loc: { start: { line: 13, column: 19 }, end: { line: 23, column: 1 } }, type: 'cond-expr', locations: [{ start: { line: 13, column: 67 }, end: { line: 15, column: 1 } }, { start: { line: 15, column: 4 }, end: { line: 23, column: 1 } }], line: 13 }, '2': { loc: { start: { line: 18, column: 4 }, end: { line: 20, column: 5 } }, type: 'if', locations: [{ start: { line: 18, column: 4 }, end: { line: 20, column: 5 } }, { start: { line: 18, column: 4 }, end: { line: 20, column: 5 } }], line: 18 }, '3': { loc: { start: { line: 30, column: 6 }, end: { line: 32, column: 7 } }, type: 'if', locations: [{ start: { line: 30, column: 6 }, end: { line: 32, column: 7 } }, { start: { line: 30, column: 6 }, end: { line: 32, column: 7 } }], line: 30 }, '4': { loc: { start: { line: 30, column: 10 }, end: { line: 30, column: 44 } }, type: 'binary-expr', locations: [{ start: { line: 30, column: 10 }, end: { line: 30, column: 27 } }, { start: { line: 30, column: 31 }, end: { line: 30, column: 44 } }], line: 30 }, '5': { loc: { start: { line: 40, column: 2 }, end: { line: 42, column: 3 } }, type: 'if', locations: [{ start: { line: 40, column: 2 }, end: { line: 42, column: 3 } }, { start: { line: 40, column: 2 }, end: { line: 42, column: 3 } }], line: 40 }, '6': { loc: { start: { line: 43, column: 2 }, end: { line: 45, column: 3 } }, type: 'if', locations: [{ start: { line: 43, column: 2 }, end: { line: 45, column: 3 } }, { start: { line: 43, column: 2 }, end: { line: 45, column: 3 } }], line: 43 }, '7': { loc: { start: { line: 43, column: 6 }, end: { line: 43, column: 186 } }, type: 'binary-expr', locations: [{ start: { line: 43, column: 6 }, end: { line: 43, column: 94 } }, { start: { line: 43, column: 98 }, end: { line: 43, column: 186 } }], line: 43 }, '8': { loc: { start: { line: 43, column: 7 }, end: { line: 43, column: 80 } }, type: 'cond-expr', locations: [{ start: { line: 43, column: 39 }, end: { line: 43, column: 50 } }, { start: { line: 43, column: 53 }, end: { line: 43, column: 80 } }], line: 43 }, '9': { loc: { start: { line: 43, column: 99 }, end: { line: 43, column: 172 } }, type: 'cond-expr', locations: [{ start: { line: 43, column: 131 }, end: { line: 43, column: 142 } }, { start: { line: 43, column: 145 }, end: { line: 43, column: 172 } }], line: 43 }, '10': { loc: { start: { line: 47, column: 2 }, end: { line: 50, column: 3 } }, type: 'if', locations: [{ start: { line: 47, column: 2 }, end: { line: 50, column: 3 } }, { start: { line: 47, column: 2 }, end: { line: 50, column: 3 } }], line: 47 }, '11': { loc: { start: { line: 49, column: 11 }, end: { line: 49, column: 55 } }, type: 'binary-expr', locations: [{ start: { line: 49, column: 11 }, end: { line: 49, column: 34 } }, { start: { line: 49, column: 38 }, end: { line: 49, column: 55 } }], line: 49 }, '12': { loc: { start: { line: 53, column: 2 }, end: { line: 61, column: 3 } }, type: 'if', locations: [{ start: { line: 53, column: 2 }, end: { line: 61, column: 3 } }, { start: { line: 53, column: 2 }, end: { line: 61, column: 3 } }], line: 53 }, '13': { loc: { start: { line: 54, column: 25 }, end: { line: 54, column: 49 } }, type: 'binary-expr', locations: [{ start: { line: 54, column: 25 }, end: { line: 54, column: 43 } }, { start: { line: 54, column: 47 }, end: { line: 54, column: 49 } }], line: 54 }, '14': { loc: { start: { line: 56, column: 4 }, end: { line: 58, column: 5 } }, type: 'if', locations: [{ start: { line: 56, column: 4 }, end: { line: 58, column: 5 } }, { start: { line: 56, column: 4 }, end: { line: 58, column: 5 } }], line: 56 }, '15': { loc: { start: { line: 62, column: 2 }, end: { line: 64, column: 3 } }, type: 'if', locations: [{ start: { line: 62, column: 2 }, end: { line: 64, column: 3 } }, { start: { line: 62, column: 2 }, end: { line: 64, column: 3 } }], line: 62 }, '16': { loc: { start: { line: 65, column: 2 }, end: { line: 73, column: 3 } }, type: 'if', locations: [{ start: { line: 65, column: 2 }, end: { line: 73, column: 3 } }, { start: { line: 65, column: 2 }, end: { line: 73, column: 3 } }], line: 65 }, '17': { loc: { start: { line: 66, column: 25 }, end: { line: 66, column: 49 } }, type: 'binary-expr', locations: [{ start: { line: 66, column: 25 }, end: { line: 66, column: 43 } }, { start: { line: 66, column: 47 }, end: { line: 66, column: 49 } }], line: 66 }, '18': { loc: { start: { line: 68, column: 4 }, end: { line: 70, column: 5 } }, type: 'if', locations: [{ start: { line: 68, column: 4 }, end: { line: 70, column: 5 } }, { start: { line: 68, column: 4 }, end: { line: 70, column: 5 } }], line: 68 }, '19': { loc: { start: { line: 74, column: 2 }, end: { line: 76, column: 3 } }, type: 'if', locations: [{ start: { line: 74, column: 2 }, end: { line: 76, column: 3 } }, { start: { line: 74, column: 2 }, end: { line: 76, column: 3 } }], line: 74 }, '20': { loc: { start: { line: 81, column: 2 }, end: { line: 83, column: 3 } }, type: 'if', locations: [{ start: { line: 81, column: 2 }, end: { line: 83, column: 3 } }, { start: { line: 81, column: 2 }, end: { line: 83, column: 3 } }], line: 81 }, '21': { loc: { start: { line: 86, column: 16 }, end: { line: 86, column: 61 } }, type: 'binary-expr', locations: [{ start: { line: 86, column: 16 }, end: { line: 86, column: 31 } }, { start: { line: 86, column: 35 }, end: { line: 86, column: 61 } }], line: 86 }, '22': { loc: { start: { line: 87, column: 21 }, end: { line: 87, column: 71 } }, type: 'binary-expr', locations: [{ start: { line: 87, column: 21 }, end: { line: 87, column: 36 } }, { start: { line: 87, column: 40 }, end: { line: 87, column: 71 } }], line: 87 }, '23': { loc: { start: { line: 101, column: 2 }, end: { line: 103, column: 3 } }, type: 'if', locations: [{ start: { line: 101, column: 2 }, end: { line: 103, column: 3 } }, { start: { line: 101, column: 2 }, end: { line: 103, column: 3 } }], line: 101 }, '24': { loc: { start: { line: 101, column: 6 }, end: { line: 101, column: 107 } }, type: 'binary-expr', locations: [{ start: { line: 101, column: 6 }, end: { line: 101, column: 14 } }, { start: { line: 101, column: 18 }, end: { line: 101, column: 26 } }, { start: { line: 101, column: 30 }, end: { line: 101, column: 54 } }, { start: { line: 101, column: 58 }, end: { line: 101, column: 107 } }], line: 101 }, '25': { loc: { start: { line: 106, column: 9 }, end: { line: 106, column: 115 } }, type: 'binary-expr', locations: [{ start: { line: 106, column: 9 }, end: { line: 106, column: 26 } }, { start: { line: 106, column: 30 }, end: { line: 106, column: 47 } }, { start: { line: 106, column: 51 }, end: { line: 106, column: 115 } }], line: 106 }, '26': { loc: { start: { line: 113, column: 9 }, end: { line: 113, column: 163 } }, type: 'binary-expr', locations: [{ start: { line: 113, column: 9 }, end: { line: 113, column: 39 } }, { start: { line: 113, column: 43 }, end: { line: 113, column: 73 } }, { start: { line: 113, column: 77 }, end: { line: 113, column: 163 } }], line: 113 }, '27': { loc: { start: { line: 121, column: 2 }, end: { line: 136, column: 3 } }, type: 'if', locations: [{ start: { line: 121, column: 2 }, end: { line: 136, column: 3 } }, { start: { line: 121, column: 2 }, end: { line: 136, column: 3 } }], line: 121 }, '28': { loc: { start: { line: 122, column: 4 }, end: { line: 126, column: 5 } }, type: 'if', locations: [{ start: { line: 122, column: 4 }, end: { line: 126, column: 5 } }, { start: { line: 122, column: 4 }, end: { line: 126, column: 5 } }], line: 122 }, '29': { loc: { start: { line: 128, column: 13 }, end: { line: 130, column: 5 } }, type: 'binary-expr', locations: [{ start: { line: 128, column: 13 }, end: { line: 128, column: 19 } }, { start: { line: 128, column: 23 }, end: { line: 130, column: 5 } }], line: 128 }, '30': { loc: { start: { line: 137, column: 2 }, end: { line: 147, column: 3 } }, type: 'if', locations: [{ start: { line: 137, column: 2 }, end: { line: 147, column: 3 } }, { start: { line: 137, column: 2 }, end: { line: 147, column: 3 } }], line: 137 }, '31': { loc: { start: { line: 139, column: 13 }, end: { line: 141, column: 5 } }, type: 'binary-expr', locations: [{ start: { line: 139, column: 13 }, end: { line: 139, column: 19 } }, { start: { line: 139, column: 23 }, end: { line: 141, column: 5 } }], line: 139 }, '32': { loc: { start: { line: 157, column: 11 }, end: { line: 159, column: 3 } }, type: 'binary-expr', locations: [{ start: { line: 157, column: 11 }, end: { line: 157, column: 17 } }, { start: { line: 157, column: 21 }, end: { line: 159, column: 3 } }], line: 157 }, '33': { loc: { start: { line: 161, column: 4 }, end: { line: 165, column: 5 } }, type: 'if', locations: [{ start: { line: 161, column: 4 }, end: { line: 165, column: 5 } }, { start: { line: 161, column: 4 }, end: { line: 165, column: 5 } }], line: 161 }, '34': { loc: { start: { line: 169, column: 2 }, end: { line: 171, column: 3 } }, type: 'if', locations: [{ start: { line: 169, column: 2 }, end: { line: 171, column: 3 } }, { start: { line: 169, column: 2 }, end: { line: 171, column: 3 } }], line: 169 }, '35': { loc: { start: { line: 169, column: 6 }, end: { line: 169, column: 94 } }, type: 'binary-expr', locations: [{ start: { line: 169, column: 6 }, end: { line: 169, column: 21 } }, { start: { line: 169, column: 25 }, end: { line: 169, column: 47 } }, { start: { line: 169, column: 51 }, end: { line: 169, column: 94 } }], line: 169 }, '36': { loc: { start: { line: 173, column: 2 }, end: { line: 175, column: 3 } }, type: 'if', locations: [{ start: { line: 173, column: 2 }, end: { line: 175, column: 3 } }, { start: { line: 173, column: 2 }, end: { line: 175, column: 3 } }], line: 173 }, '37': { loc: { start: { line: 173, column: 6 }, end: { line: 173, column: 92 } }, type: 'binary-expr', locations: [{ start: { line: 173, column: 6 }, end: { line: 173, column: 21 } }, { start: { line: 173, column: 25 }, end: { line: 173, column: 47 } }, { start: { line: 173, column: 51 }, end: { line: 173, column: 92 } }], line: 173 }, '38': { loc: { start: { line: 180, column: 4 }, end: { line: 213, column: 5 } }, type: 'if', locations: [{ start: { line: 180, column: 4 }, end: { line: 213, column: 5 } }, { start: { line: 180, column: 4 }, end: { line: 213, column: 5 } }], line: 180 }, '39': { loc: { start: { line: 183, column: 6 }, end: { line: 202, column: 7 } }, type: 'if', locations: [{ start: { line: 183, column: 6 }, end: { line: 202, column: 7 } }, { start: { line: 183, column: 6 }, end: { line: 202, column: 7 } }], line: 183 }, '40': { loc: { start: { line: 183, column: 10 }, end: { line: 183, column: 46 } }, type: 'binary-expr', locations: [{ start: { line: 183, column: 10 }, end: { line: 183, column: 20 } }, { start: { line: 183, column: 24 }, end: { line: 183, column: 46 } }], line: 183 }, '41': { loc: { start: { line: 186, column: 10 }, end: { line: 200, column: 11 } }, type: 'if', locations: [{ start: { line: 186, column: 10 }, end: { line: 200, column: 11 } }, { start: { line: 186, column: 10 }, end: { line: 200, column: 11 } }], line: 186 }, '42': { loc: { start: { line: 189, column: 12 }, end: { line: 192, column: 13 } }, type: 'if', locations: [{ start: { line: 189, column: 12 }, end: { line: 192, column: 13 } }, { start: { line: 189, column: 12 }, end: { line: 192, column: 13 } }], line: 189 }, '43': { loc: { start: { line: 203, column: 6 }, end: { line: 206, column: 7 } }, type: 'if', locations: [{ start: { line: 203, column: 6 }, end: { line: 206, column: 7 } }, { start: { line: 203, column: 6 }, end: { line: 206, column: 7 } }], line: 203 }, '44': { loc: { start: { line: 232, column: 2 }, end: { line: 234, column: 3 } }, type: 'if', locations: [{ start: { line: 232, column: 2 }, end: { line: 234, column: 3 } }, { start: { line: 232, column: 2 }, end: { line: 234, column: 3 } }], line: 232 }, '45': { loc: { start: { line: 235, column: 2 }, end: { line: 237, column: 3 } }, type: 'if', locations: [{ start: { line: 235, column: 2 }, end: { line: 237, column: 3 } }, { start: { line: 235, column: 2 }, end: { line: 237, column: 3 } }], line: 235 }, '46': { loc: { start: { line: 249, column: 4 }, end: { line: 272, column: 5 } }, type: 'if', locations: [{ start: { line: 249, column: 4 }, end: { line: 272, column: 5 } }, { start: { line: 249, column: 4 }, end: { line: 272, column: 5 } }], line: 249 }, '47': { loc: { start: { line: 250, column: 6 }, end: { line: 271, column: 7 } }, type: 'if', locations: [{ start: { line: 250, column: 6 }, end: { line: 271, column: 7 } }, { start: { line: 250, column: 6 }, end: { line: 271, column: 7 } }], line: 250 }, '48': { loc: { start: { line: 252, column: 8 }, end: { line: 256, column: 9 } }, type: 'if', locations: [{ start: { line: 252, column: 8 }, end: { line: 256, column: 9 } }, { start: { line: 252, column: 8 }, end: { line: 256, column: 9 } }], line: 252 }, '49': { loc: { start: { line: 252, column: 12 }, end: { line: 252, column: 67 } }, type: 'binary-expr', locations: [{ start: { line: 252, column: 12 }, end: { line: 252, column: 33 } }, { start: { line: 252, column: 37 }, end: { line: 252, column: 67 } }], line: 252 }, '50': { loc: { start: { line: 258, column: 8 }, end: { line: 270, column: 9 } }, type: 'if', locations: [{ start: { line: 258, column: 8 }, end: { line: 270, column: 9 } }, { start: { line: 258, column: 8 }, end: { line: 270, column: 9 } }], line: 258 }, '51': { loc: { start: { line: 281, column: 4 }, end: { line: 287, column: 5 } }, type: 'if', locations: [{ start: { line: 281, column: 4 }, end: { line: 287, column: 5 } }, { start: { line: 281, column: 4 }, end: { line: 287, column: 5 } }], line: 281 }, '52': { loc: { start: { line: 301, column: 2 }, end: { line: 307, column: 3 } }, type: 'if', locations: [{ start: { line: 301, column: 2 }, end: { line: 307, column: 3 } }, { start: { line: 301, column: 2 }, end: { line: 307, column: 3 } }], line: 301 }, '53': { loc: { start: { line: 309, column: 2 }, end: { line: 312, column: 3 } }, type: 'if', locations: [{ start: { line: 309, column: 2 }, end: { line: 312, column: 3 } }, { start: { line: 309, column: 2 }, end: { line: 312, column: 3 } }], line: 309 }, '54': { loc: { start: { line: 318, column: 2 }, end: { line: 320, column: 3 } }, type: 'if', locations: [{ start: { line: 318, column: 2 }, end: { line: 320, column: 3 } }, { start: { line: 318, column: 2 }, end: { line: 320, column: 3 } }], line: 318 }, '55': { loc: { start: { line: 318, column: 6 }, end: { line: 318, column: 35 } }, type: 'binary-expr', locations: [{ start: { line: 318, column: 6 }, end: { line: 318, column: 14 } }, { start: { line: 318, column: 18 }, end: { line: 318, column: 35 } }], line: 318 }, '56': { loc: { start: { line: 321, column: 2 }, end: { line: 323, column: 3 } }, type: 'if', locations: [{ start: { line: 321, column: 2 }, end: { line: 323, column: 3 } }, { start: { line: 321, column: 2 }, end: { line: 323, column: 3 } }], line: 321 }, '57': { loc: { start: { line: 335, column: 2 }, end: { line: 341, column: 3 } }, type: 'if', locations: [{ start: { line: 335, column: 2 }, end: { line: 341, column: 3 } }, { start: { line: 335, column: 2 }, end: { line: 341, column: 3 } }], line: 335 }, '58': { loc: { start: { line: 336, column: 4 }, end: { line: 339, column: 5 } }, type: 'if', locations: [{ start: { line: 336, column: 4 }, end: { line: 339, column: 5 } }, { start: { line: 336, column: 4 }, end: { line: 339, column: 5 } }], line: 336 }, '59': { loc: { start: { line: 342, column: 2 }, end: { line: 344, column: 3 } }, type: 'if', locations: [{ start: { line: 342, column: 2 }, end: { line: 344, column: 3 } }, { start: { line: 342, column: 2 }, end: { line: 344, column: 3 } }], line: 342 }, '60': { loc: { start: { line: 348, column: 4 }, end: { line: 350, column: 5 } }, type: 'if', locations: [{ start: { line: 348, column: 4 }, end: { line: 350, column: 5 } }, { start: { line: 348, column: 4 }, end: { line: 350, column: 5 } }], line: 348 }, '61': { loc: { start: { line: 359, column: 2 }, end: { line: 363, column: 3 } }, type: 'if', locations: [{ start: { line: 359, column: 2 }, end: { line: 363, column: 3 } }, { start: { line: 359, column: 2 }, end: { line: 363, column: 3 } }], line: 359 }, '62': { loc: { start: { line: 359, column: 6 }, end: { line: 359, column: 51 } }, type: 'binary-expr', locations: [{ start: { line: 359, column: 6 }, end: { line: 359, column: 31 } }, { start: { line: 359, column: 35 }, end: { line: 359, column: 51 } }], line: 359 }, '63': { loc: { start: { line: 361, column: 9 }, end: { line: 363, column: 3 } }, type: 'if', locations: [{ start: { line: 361, column: 9 }, end: { line: 363, column: 3 } }, { start: { line: 361, column: 9 }, end: { line: 363, column: 3 } }], line: 361 }, '64': { loc: { start: { line: 361, column: 13 }, end: { line: 361, column: 53 } }, type: 'binary-expr', locations: [{ start: { line: 361, column: 13 }, end: { line: 361, column: 31 } }, { start: { line: 361, column: 35 }, end: { line: 361, column: 53 } }], line: 361 }, '65': { loc: { start: { line: 368, column: 4 }, end: { line: 388, column: 5 } }, type: 'if', locations: [{ start: { line: 368, column: 4 }, end: { line: 388, column: 5 } }, { start: { line: 368, column: 4 }, end: { line: 388, column: 5 } }], line: 368 }, '66': { loc: { start: { line: 369, column: 6 }, end: { line: 387, column: 7 } }, type: 'if', locations: [{ start: { line: 369, column: 6 }, end: { line: 387, column: 7 } }, { start: { line: 369, column: 6 }, end: { line: 387, column: 7 } }], line: 369 }, '67': { loc: { start: { line: 372, column: 8 }, end: { line: 374, column: 9 } }, type: 'if', locations: [{ start: { line: 372, column: 8 }, end: { line: 374, column: 9 } }, { start: { line: 372, column: 8 }, end: { line: 374, column: 9 } }], line: 372 }, '68': { loc: { start: { line: 375, column: 8 }, end: { line: 379, column: 9 } }, type: 'if', locations: [{ start: { line: 375, column: 8 }, end: { line: 379, column: 9 } }, { start: { line: 375, column: 8 }, end: { line: 379, column: 9 } }], line: 375 }, '69': { loc: { start: { line: 375, column: 12 }, end: { line: 375, column: 71 } }, type: 'binary-expr', locations: [{ start: { line: 375, column: 12 }, end: { line: 375, column: 41 } }, { start: { line: 375, column: 45 }, end: { line: 375, column: 71 } }], line: 375 }, '70': { loc: { start: { line: 377, column: 15 }, end: { line: 379, column: 9 } }, type: 'if', locations: [{ start: { line: 377, column: 15 }, end: { line: 379, column: 9 } }, { start: { line: 377, column: 15 }, end: { line: 379, column: 9 } }], line: 377 }, '71': { loc: { start: { line: 377, column: 19 }, end: { line: 377, column: 78 } }, type: 'binary-expr', locations: [{ start: { line: 377, column: 19 }, end: { line: 377, column: 48 } }, { start: { line: 377, column: 52 }, end: { line: 377, column: 78 } }], line: 377 }, '72': { loc: { start: { line: 380, column: 13 }, end: { line: 387, column: 7 } }, type: 'if', locations: [{ start: { line: 380, column: 13 }, end: { line: 387, column: 7 } }, { start: { line: 380, column: 13 }, end: { line: 387, column: 7 } }], line: 380 }, '73': { loc: { start: { line: 382, column: 8 }, end: { line: 384, column: 9 } }, type: 'if', locations: [{ start: { line: 382, column: 8 }, end: { line: 384, column: 9 } }, { start: { line: 382, column: 8 }, end: { line: 384, column: 9 } }], line: 382 }, '74': { loc: { start: { line: 385, column: 13 }, end: { line: 387, column: 7 } }, type: 'if', locations: [{ start: { line: 385, column: 13 }, end: { line: 387, column: 7 } }, { start: { line: 385, column: 13 }, end: { line: 387, column: 7 } }], line: 385 }, '75': { loc: { start: { line: 385, column: 17 }, end: { line: 385, column: 69 } }, type: 'binary-expr', locations: [{ start: { line: 385, column: 17 }, end: { line: 385, column: 39 } }, { start: { line: 385, column: 43 }, end: { line: 385, column: 69 } }], line: 385 }, '76': { loc: { start: { line: 395, column: 2 }, end: { line: 397, column: 3 } }, type: 'if', locations: [{ start: { line: 395, column: 2 }, end: { line: 397, column: 3 } }, { start: { line: 395, column: 2 }, end: { line: 397, column: 3 } }], line: 395 }, '77': { loc: { start: { line: 395, column: 6 }, end: { line: 395, column: 35 } }, type: 'binary-expr', locations: [{ start: { line: 395, column: 6 }, end: { line: 395, column: 14 } }, { start: { line: 395, column: 18 }, end: { line: 395, column: 35 } }], line: 395 }, '78': { loc: { start: { line: 398, column: 2 }, end: { line: 400, column: 3 } }, type: 'if', locations: [{ start: { line: 398, column: 2 }, end: { line: 400, column: 3 } }, { start: { line: 398, column: 2 }, end: { line: 400, column: 3 } }], line: 398 }, '79': { loc: { start: { line: 410, column: 4 }, end: { line: 412, column: 5 } }, type: 'if', locations: [{ start: { line: 410, column: 4 }, end: { line: 412, column: 5 } }, { start: { line: 410, column: 4 }, end: { line: 412, column: 5 } }], line: 410 }, '80': { loc: { start: { line: 413, column: 4 }, end: { line: 415, column: 5 } }, type: 'if', locations: [{ start: { line: 413, column: 4 }, end: { line: 415, column: 5 } }, { start: { line: 413, column: 4 }, end: { line: 415, column: 5 } }], line: 413 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0, '74': 0, '75': 0, '76': 0, '77': 0, '78': 0, '79': 0, '80': 0, '81': 0, '82': 0, '83': 0, '84': 0, '85': 0, '86': 0, '87': 0, '88': 0, '89': 0, '90': 0, '91': 0, '92': 0, '93': 0, '94': 0, '95': 0, '96': 0, '97': 0, '98': 0, '99': 0, '100': 0, '101': 0, '102': 0, '103': 0, '104': 0, '105': 0, '106': 0, '107': 0, '108': 0, '109': 0, '110': 0, '111': 0, '112': 0, '113': 0, '114': 0, '115': 0, '116': 0, '117': 0, '118': 0, '119': 0, '120': 0, '121': 0, '122': 0, '123': 0, '124': 0, '125': 0, '126': 0, '127': 0, '128': 0, '129': 0, '130': 0, '131': 0, '132': 0, '133': 0, '134': 0, '135': 0, '136': 0, '137': 0, '138': 0, '139': 0, '140': 0, '141': 0, '142': 0, '143': 0, '144': 0, '145': 0, '146': 0, '147': 0, '148': 0, '149': 0, '150': 0, '151': 0, '152': 0, '153': 0, '154': 0, '155': 0, '156': 0, '157': 0, '158': 0, '159': 0, '160': 0, '161': 0, '162': 0, '163': 0, '164': 0, '165': 0, '166': 0, '167': 0, '168': 0, '169': 0, '170': 0, '171': 0, '172': 0, '173': 0, '174': 0, '175': 0, '176': 0, '177': 0, '178': 0, '179': 0, '180': 0, '181': 0, '182': 0, '183': 0, '184': 0, '185': 0, '186': 0, '187': 0, '188': 0, '189': 0, '190': 0, '191': 0, '192': 0, '193': 0, '194': 0, '195': 0, '196': 0, '197': 0, '198': 0, '199': 0, '200': 0, '201': 0, '202': 0, '203': 0, '204': 0, '205': 0, '206': 0, '207': 0, '208': 0, '209': 0, '210': 0, '211': 0, '212': 0, '213': 0, '214': 0, '215': 0, '216': 0, '217': 0, '218': 0, '219': 0, '220': 0, '221': 0, '222': 0, '223': 0, '224': 0, '225': 0, '226': 0, '227': 0, '228': 0, '229': 0, '230': 0, '231': 0, '232': 0, '233': 0, '234': 0, '235': 0, '236': 0, '237': 0, '238': 0, '239': 0, '240': 0, '241': 0, '242': 0, '243': 0, '244': 0, '245': 0, '246': 0, '247': 0, '248': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0], '15': [0, 0], '16': [0, 0], '17': [0, 0], '18': [0, 0], '19': [0, 0], '20': [0, 0], '21': [0, 0], '22': [0, 0], '23': [0, 0], '24': [0, 0, 0, 0], '25': [0, 0, 0], '26': [0, 0, 0], '27': [0, 0], '28': [0, 0], '29': [0, 0], '30': [0, 0], '31': [0, 0], '32': [0, 0], '33': [0, 0], '34': [0, 0], '35': [0, 0, 0], '36': [0, 0], '37': [0, 0, 0], '38': [0, 0], '39': [0, 0], '40': [0, 0], '41': [0, 0], '42': [0, 0], '43': [0, 0], '44': [0, 0], '45': [0, 0], '46': [0, 0], '47': [0, 0], '48': [0, 0], '49': [0, 0], '50': [0, 0], '51': [0, 0], '52': [0, 0], '53': [0, 0], '54': [0, 0], '55': [0, 0], '56': [0, 0], '57': [0, 0], '58': [0, 0], '59': [0, 0], '60': [0, 0], '61': [0, 0], '62': [0, 0], '63': [0, 0], '64': [0, 0], '65': [0, 0], '66': [0, 0], '67': [0, 0], '68': [0, 0], '69': [0, 0], '70': [0, 0], '71': [0, 0], '72': [0, 0], '73': [0, 0], '74': [0, 0], '75': [0, 0], '76': [0, 0], '77': [0, 0], '78': [0, 0], '79': [0, 0], '80': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var ARRAY_MOVE = (cov_g15fjodrd.s[0]++, 3);var isArray$2 = (cov_g15fjodrd.s[1]++, typeof Array.isArray === 'function' ? (cov_g15fjodrd.b[0][0]++, Array.isArray) : (cov_g15fjodrd.b[0][1]++, function (a) {
  cov_g15fjodrd.f[0]++;cov_g15fjodrd.s[2]++;return a instanceof Array;
}));var arrayIndexOf = (cov_g15fjodrd.s[3]++, typeof Array.prototype.indexOf === 'function' ? (cov_g15fjodrd.b[1][0]++, function (array, item) {
  cov_g15fjodrd.f[1]++;cov_g15fjodrd.s[4]++;return array.indexOf(item);
}) : (cov_g15fjodrd.b[1][1]++, function (array, item) {
  cov_g15fjodrd.f[2]++;var length = (cov_g15fjodrd.s[5]++, array.length);cov_g15fjodrd.s[6]++;for (var i = 0; i < length; i++) {
    cov_g15fjodrd.s[7]++;if (array[i] === item) {
      cov_g15fjodrd.b[2][0]++;cov_g15fjodrd.s[8]++;return i;
    } else {
      cov_g15fjodrd.b[2][1]++;
    }
  }cov_g15fjodrd.s[9]++;return -1;
}));function arraysHaveMatchByRef(array1, array2, len1, len2) {
  cov_g15fjodrd.f[3]++;cov_g15fjodrd.s[10]++;for (var index1 = 0; index1 < len1; index1++) {
    var val1 = (cov_g15fjodrd.s[11]++, array1[index1]);cov_g15fjodrd.s[12]++;for (var index2 = 0; index2 < len2; index2++) {
      var val2 = (cov_g15fjodrd.s[13]++, array2[index2]);cov_g15fjodrd.s[14]++;if ((cov_g15fjodrd.b[4][0]++, index1 !== index2) && (cov_g15fjodrd.b[4][1]++, val1 === val2)) {
        cov_g15fjodrd.b[3][0]++;cov_g15fjodrd.s[15]++;return true;
      } else {
        cov_g15fjodrd.b[3][1]++;
      }
    }
  }
}function matchItems(array1, array2, index1, index2, context) {
  cov_g15fjodrd.f[4]++;var value1 = (cov_g15fjodrd.s[16]++, array1[index1]);var value2 = (cov_g15fjodrd.s[17]++, array2[index2]);cov_g15fjodrd.s[18]++;if (value1 === value2) {
    cov_g15fjodrd.b[5][0]++;cov_g15fjodrd.s[19]++;return true;
  } else {
    cov_g15fjodrd.b[5][1]++;
  }cov_g15fjodrd.s[20]++;if ((cov_g15fjodrd.b[7][0]++, (typeof value1 === 'undefined' ? (cov_g15fjodrd.b[8][0]++, 'undefined') : (cov_g15fjodrd.b[8][1]++, _typeof$1(value1))) !== 'object') || (cov_g15fjodrd.b[7][1]++, (typeof value2 === 'undefined' ? (cov_g15fjodrd.b[9][0]++, 'undefined') : (cov_g15fjodrd.b[9][1]++, _typeof$1(value2))) !== 'object')) {
    cov_g15fjodrd.b[6][0]++;cov_g15fjodrd.s[21]++;return false;
  } else {
    cov_g15fjodrd.b[6][1]++;
  }var objectHash = (cov_g15fjodrd.s[22]++, context.objectHash);cov_g15fjodrd.s[23]++;if (!objectHash) {
    cov_g15fjodrd.b[10][0]++;cov_g15fjodrd.s[24]++; // no way to match objects was provided, try match by position
    return (cov_g15fjodrd.b[11][0]++, context.matchByPosition) && (cov_g15fjodrd.b[11][1]++, index1 === index2);
  } else {
    cov_g15fjodrd.b[10][1]++;
  }var hash1 = (cov_g15fjodrd.s[25]++, void 0);var hash2 = (cov_g15fjodrd.s[26]++, void 0);cov_g15fjodrd.s[27]++;if (typeof index1 === 'number') {
    cov_g15fjodrd.b[12][0]++;cov_g15fjodrd.s[28]++;context.hashCache1 = (cov_g15fjodrd.b[13][0]++, context.hashCache1) || (cov_g15fjodrd.b[13][1]++, []);cov_g15fjodrd.s[29]++;hash1 = context.hashCache1[index1];cov_g15fjodrd.s[30]++;if (typeof hash1 === 'undefined') {
      cov_g15fjodrd.b[14][0]++;cov_g15fjodrd.s[31]++;context.hashCache1[index1] = hash1 = objectHash(value1, index1);
    } else {
      cov_g15fjodrd.b[14][1]++;
    }
  } else {
    cov_g15fjodrd.b[12][1]++;cov_g15fjodrd.s[32]++;hash1 = objectHash(value1);
  }cov_g15fjodrd.s[33]++;if (typeof hash1 === 'undefined') {
    cov_g15fjodrd.b[15][0]++;cov_g15fjodrd.s[34]++;return false;
  } else {
    cov_g15fjodrd.b[15][1]++;
  }cov_g15fjodrd.s[35]++;if (typeof index2 === 'number') {
    cov_g15fjodrd.b[16][0]++;cov_g15fjodrd.s[36]++;context.hashCache2 = (cov_g15fjodrd.b[17][0]++, context.hashCache2) || (cov_g15fjodrd.b[17][1]++, []);cov_g15fjodrd.s[37]++;hash2 = context.hashCache2[index2];cov_g15fjodrd.s[38]++;if (typeof hash2 === 'undefined') {
      cov_g15fjodrd.b[18][0]++;cov_g15fjodrd.s[39]++;context.hashCache2[index2] = hash2 = objectHash(value2, index2);
    } else {
      cov_g15fjodrd.b[18][1]++;
    }
  } else {
    cov_g15fjodrd.b[16][1]++;cov_g15fjodrd.s[40]++;hash2 = objectHash(value2);
  }cov_g15fjodrd.s[41]++;if (typeof hash2 === 'undefined') {
    cov_g15fjodrd.b[19][0]++;cov_g15fjodrd.s[42]++;return false;
  } else {
    cov_g15fjodrd.b[19][1]++;
  }cov_g15fjodrd.s[43]++;return hash1 === hash2;
}cov_g15fjodrd.s[44]++;var diffFilter$1 = function arraysDiffFilter(context) {
  cov_g15fjodrd.f[5]++;cov_g15fjodrd.s[45]++;if (!context.leftIsArray) {
    cov_g15fjodrd.b[20][0]++;cov_g15fjodrd.s[46]++;return;
  } else {
    cov_g15fjodrd.b[20][1]++;
  }var matchContext = (cov_g15fjodrd.s[47]++, { objectHash: (cov_g15fjodrd.b[21][0]++, context.options) && (cov_g15fjodrd.b[21][1]++, context.options.objectHash), matchByPosition: (cov_g15fjodrd.b[22][0]++, context.options) && (cov_g15fjodrd.b[22][1]++, context.options.matchByPosition) });var commonHead = (cov_g15fjodrd.s[48]++, 0);var commonTail = (cov_g15fjodrd.s[49]++, 0);var index = (cov_g15fjodrd.s[50]++, void 0);var index1 = (cov_g15fjodrd.s[51]++, void 0);var index2 = (cov_g15fjodrd.s[52]++, void 0);var array1 = (cov_g15fjodrd.s[53]++, context.left);var array2 = (cov_g15fjodrd.s[54]++, context.right);var len1 = (cov_g15fjodrd.s[55]++, array1.length);var len2 = (cov_g15fjodrd.s[56]++, array2.length);var child = (cov_g15fjodrd.s[57]++, void 0);cov_g15fjodrd.s[58]++;if ((cov_g15fjodrd.b[24][0]++, len1 > 0) && (cov_g15fjodrd.b[24][1]++, len2 > 0) && (cov_g15fjodrd.b[24][2]++, !matchContext.objectHash) && (cov_g15fjodrd.b[24][3]++, typeof matchContext.matchByPosition !== 'boolean')) {
    cov_g15fjodrd.b[23][0]++;cov_g15fjodrd.s[59]++;matchContext.matchByPosition = !arraysHaveMatchByRef(array1, array2, len1, len2);
  } else {
    cov_g15fjodrd.b[23][1]++;
  } // separate common head
  cov_g15fjodrd.s[60]++;while ((cov_g15fjodrd.b[25][0]++, commonHead < len1) && (cov_g15fjodrd.b[25][1]++, commonHead < len2) && (cov_g15fjodrd.b[25][2]++, matchItems(array1, array2, commonHead, commonHead, matchContext))) {
    cov_g15fjodrd.s[61]++;index = commonHead;cov_g15fjodrd.s[62]++;child = new DiffContext(context.left[index], context.right[index]);cov_g15fjodrd.s[63]++;context.push(child, index);cov_g15fjodrd.s[64]++;commonHead++;
  } // separate common tail
  cov_g15fjodrd.s[65]++;while ((cov_g15fjodrd.b[26][0]++, commonTail + commonHead < len1) && (cov_g15fjodrd.b[26][1]++, commonTail + commonHead < len2) && (cov_g15fjodrd.b[26][2]++, matchItems(array1, array2, len1 - 1 - commonTail, len2 - 1 - commonTail, matchContext))) {
    cov_g15fjodrd.s[66]++;index1 = len1 - 1 - commonTail;cov_g15fjodrd.s[67]++;index2 = len2 - 1 - commonTail;cov_g15fjodrd.s[68]++;child = new DiffContext(context.left[index1], context.right[index2]);cov_g15fjodrd.s[69]++;context.push(child, index2);cov_g15fjodrd.s[70]++;commonTail++;
  }var result = (cov_g15fjodrd.s[71]++, void 0);cov_g15fjodrd.s[72]++;if (commonHead + commonTail === len1) {
    cov_g15fjodrd.b[27][0]++;cov_g15fjodrd.s[73]++;if (len1 === len2) {
      cov_g15fjodrd.b[28][0]++;cov_g15fjodrd.s[74]++; // arrays are identical
      context.setResult(undefined).exit();cov_g15fjodrd.s[75]++;return;
    } else {
      cov_g15fjodrd.b[28][1]++;
    } // trivial case, a block (1 or more consecutive items) was added
    cov_g15fjodrd.s[76]++;result = (cov_g15fjodrd.b[29][0]++, result) || (cov_g15fjodrd.b[29][1]++, { _t: 'a' });cov_g15fjodrd.s[77]++;for (index = commonHead; index < len2 - commonTail; index++) {
      cov_g15fjodrd.s[78]++;result[index] = [array2[index]];
    }cov_g15fjodrd.s[79]++;context.setResult(result).exit();cov_g15fjodrd.s[80]++;return;
  } else {
    cov_g15fjodrd.b[27][1]++;
  }cov_g15fjodrd.s[81]++;if (commonHead + commonTail === len2) {
    cov_g15fjodrd.b[30][0]++;cov_g15fjodrd.s[82]++; // trivial case, a block (1 or more consecutive items) was removed
    result = (cov_g15fjodrd.b[31][0]++, result) || (cov_g15fjodrd.b[31][1]++, { _t: 'a' });cov_g15fjodrd.s[83]++;for (index = commonHead; index < len1 - commonTail; index++) {
      cov_g15fjodrd.s[84]++;result['_' + index] = [array1[index], 0, 0];
    }cov_g15fjodrd.s[85]++;context.setResult(result).exit();cov_g15fjodrd.s[86]++;return;
  } else {
    cov_g15fjodrd.b[30][1]++;
  } // reset hash cache
  cov_g15fjodrd.s[87]++;delete matchContext.hashCache1;cov_g15fjodrd.s[88]++;delete matchContext.hashCache2; // diff is not trivial, find the LCS (Longest Common Subsequence)
  var trimmed1 = (cov_g15fjodrd.s[89]++, array1.slice(commonHead, len1 - commonTail));var trimmed2 = (cov_g15fjodrd.s[90]++, array2.slice(commonHead, len2 - commonTail));var seq = (cov_g15fjodrd.s[91]++, lcs.get(trimmed1, trimmed2, matchItems, matchContext));var removedItems = (cov_g15fjodrd.s[92]++, []);cov_g15fjodrd.s[93]++;result = (cov_g15fjodrd.b[32][0]++, result) || (cov_g15fjodrd.b[32][1]++, { _t: 'a' });cov_g15fjodrd.s[94]++;for (index = commonHead; index < len1 - commonTail; index++) {
    cov_g15fjodrd.s[95]++;if (arrayIndexOf(seq.indices1, index - commonHead) < 0) {
      cov_g15fjodrd.b[33][0]++;cov_g15fjodrd.s[96]++; // removed
      result['_' + index] = [array1[index], 0, 0];cov_g15fjodrd.s[97]++;removedItems.push(index);
    } else {
      cov_g15fjodrd.b[33][1]++;
    }
  }var detectMove = (cov_g15fjodrd.s[98]++, true);cov_g15fjodrd.s[99]++;if ((cov_g15fjodrd.b[35][0]++, context.options) && (cov_g15fjodrd.b[35][1]++, context.options.arrays) && (cov_g15fjodrd.b[35][2]++, context.options.arrays.detectMove === false)) {
    cov_g15fjodrd.b[34][0]++;cov_g15fjodrd.s[100]++;detectMove = false;
  } else {
    cov_g15fjodrd.b[34][1]++;
  }var includeValueOnMove = (cov_g15fjodrd.s[101]++, false);cov_g15fjodrd.s[102]++;if ((cov_g15fjodrd.b[37][0]++, context.options) && (cov_g15fjodrd.b[37][1]++, context.options.arrays) && (cov_g15fjodrd.b[37][2]++, context.options.arrays.includeValueOnMove)) {
    cov_g15fjodrd.b[36][0]++;cov_g15fjodrd.s[103]++;includeValueOnMove = true;
  } else {
    cov_g15fjodrd.b[36][1]++;
  }var removedItemsLength = (cov_g15fjodrd.s[104]++, removedItems.length);cov_g15fjodrd.s[105]++;for (index = commonHead; index < len2 - commonTail; index++) {
    var indexOnArray2 = (cov_g15fjodrd.s[106]++, arrayIndexOf(seq.indices2, index - commonHead));cov_g15fjodrd.s[107]++;if (indexOnArray2 < 0) {
      cov_g15fjodrd.b[38][0]++; // added, try to match with a removed item and register as position move
      var isMove = (cov_g15fjodrd.s[108]++, false);cov_g15fjodrd.s[109]++;if ((cov_g15fjodrd.b[40][0]++, detectMove) && (cov_g15fjodrd.b[40][1]++, removedItemsLength > 0)) {
        cov_g15fjodrd.b[39][0]++;cov_g15fjodrd.s[110]++;for (var removeItemIndex1 = 0; removeItemIndex1 < removedItemsLength; removeItemIndex1++) {
          cov_g15fjodrd.s[111]++;index1 = removedItems[removeItemIndex1];cov_g15fjodrd.s[112]++;if (matchItems(trimmed1, trimmed2, index1 - commonHead, index - commonHead, matchContext)) {
            cov_g15fjodrd.b[41][0]++;cov_g15fjodrd.s[113]++; // store position move as: [originalValue, newPosition, ARRAY_MOVE]
            result['_' + index1].splice(1, 2, index, ARRAY_MOVE);cov_g15fjodrd.s[114]++;if (!includeValueOnMove) {
              cov_g15fjodrd.b[42][0]++;cov_g15fjodrd.s[115]++; // don't include moved value on diff, to save bytes
              result['_' + index1][0] = '';
            } else {
              cov_g15fjodrd.b[42][1]++;
            }cov_g15fjodrd.s[116]++;index2 = index;cov_g15fjodrd.s[117]++;child = new DiffContext(context.left[index1], context.right[index2]);cov_g15fjodrd.s[118]++;context.push(child, index2);cov_g15fjodrd.s[119]++;removedItems.splice(removeItemIndex1, 1);cov_g15fjodrd.s[120]++;isMove = true;cov_g15fjodrd.s[121]++;break;
          } else {
            cov_g15fjodrd.b[41][1]++;
          }
        }
      } else {
        cov_g15fjodrd.b[39][1]++;
      }cov_g15fjodrd.s[122]++;if (!isMove) {
        cov_g15fjodrd.b[43][0]++;cov_g15fjodrd.s[123]++; // added
        result[index] = [array2[index]];
      } else {
        cov_g15fjodrd.b[43][1]++;
      }
    } else {
      cov_g15fjodrd.b[38][1]++;cov_g15fjodrd.s[124]++; // match, do inner diff
      index1 = seq.indices1[indexOnArray2] + commonHead;cov_g15fjodrd.s[125]++;index2 = seq.indices2[indexOnArray2] + commonHead;cov_g15fjodrd.s[126]++;child = new DiffContext(context.left[index1], context.right[index2]);cov_g15fjodrd.s[127]++;context.push(child, index2);
    }
  }cov_g15fjodrd.s[128]++;context.setResult(result).exit();
};cov_g15fjodrd.s[129]++;diffFilter$1.filterName = 'arrays';var compare = (cov_g15fjodrd.s[130]++, { numerically: function numerically(a, b) {
    cov_g15fjodrd.f[6]++;cov_g15fjodrd.s[131]++;return a - b;
  }, numericallyBy: function numericallyBy(name) {
    cov_g15fjodrd.f[7]++;cov_g15fjodrd.s[132]++;return function (a, b) {
      cov_g15fjodrd.f[8]++;cov_g15fjodrd.s[133]++;return a[name] - b[name];
    };
  } });cov_g15fjodrd.s[134]++;var patchFilter$2 = function nestedPatchFilter(context) {
  cov_g15fjodrd.f[9]++;cov_g15fjodrd.s[135]++;if (!context.nested) {
    cov_g15fjodrd.b[44][0]++;cov_g15fjodrd.s[136]++;return;
  } else {
    cov_g15fjodrd.b[44][1]++;
  }cov_g15fjodrd.s[137]++;if (context.delta._t !== 'a') {
    cov_g15fjodrd.b[45][0]++;cov_g15fjodrd.s[138]++;return;
  } else {
    cov_g15fjodrd.b[45][1]++;
  }var index = (cov_g15fjodrd.s[139]++, void 0);var index1 = (cov_g15fjodrd.s[140]++, void 0);var delta = (cov_g15fjodrd.s[141]++, context.delta);var array = (cov_g15fjodrd.s[142]++, context.left); // first, separate removals, insertions and modifications
  var toRemove = (cov_g15fjodrd.s[143]++, []);var toInsert = (cov_g15fjodrd.s[144]++, []);var toModify = (cov_g15fjodrd.s[145]++, []);cov_g15fjodrd.s[146]++;for (index in delta) {
    cov_g15fjodrd.s[147]++;if (index !== '_t') {
      cov_g15fjodrd.b[46][0]++;cov_g15fjodrd.s[148]++;if (index[0] === '_') {
        cov_g15fjodrd.b[47][0]++;cov_g15fjodrd.s[149]++; // removed item from original array
        if ((cov_g15fjodrd.b[49][0]++, delta[index][2] === 0) || (cov_g15fjodrd.b[49][1]++, delta[index][2] === ARRAY_MOVE)) {
          cov_g15fjodrd.b[48][0]++;cov_g15fjodrd.s[150]++;toRemove.push(parseInt(index.slice(1), 10));
        } else {
          cov_g15fjodrd.b[48][1]++;cov_g15fjodrd.s[151]++;throw new Error('only removal or move can be applied at original array indices,' + (' invalid diff type: ' + delta[index][2]));
        }
      } else {
        cov_g15fjodrd.b[47][1]++;cov_g15fjodrd.s[152]++;if (delta[index].length === 1) {
          cov_g15fjodrd.b[50][0]++;cov_g15fjodrd.s[153]++; // added item at new array
          toInsert.push({ index: parseInt(index, 10), value: delta[index][0] });
        } else {
          cov_g15fjodrd.b[50][1]++;cov_g15fjodrd.s[154]++; // modified item at new array
          toModify.push({ index: parseInt(index, 10), delta: delta[index] });
        }
      }
    } else {
      cov_g15fjodrd.b[46][1]++;
    }
  } // remove items, in reverse order to avoid sawing our own floor
  cov_g15fjodrd.s[155]++;toRemove = toRemove.sort(compare.numerically);cov_g15fjodrd.s[156]++;for (index = toRemove.length - 1; index >= 0; index--) {
    cov_g15fjodrd.s[157]++;index1 = toRemove[index];var indexDiff = (cov_g15fjodrd.s[158]++, delta['_' + index1]);var removedValue = (cov_g15fjodrd.s[159]++, array.splice(index1, 1)[0]);cov_g15fjodrd.s[160]++;if (indexDiff[2] === ARRAY_MOVE) {
      cov_g15fjodrd.b[51][0]++;cov_g15fjodrd.s[161]++; // reinsert later
      toInsert.push({ index: indexDiff[1], value: removedValue });
    } else {
      cov_g15fjodrd.b[51][1]++;
    }
  } // insert items, in reverse order to avoid moving our own floor
  cov_g15fjodrd.s[162]++;toInsert = toInsert.sort(compare.numericallyBy('index'));var toInsertLength = (cov_g15fjodrd.s[163]++, toInsert.length);cov_g15fjodrd.s[164]++;for (index = 0; index < toInsertLength; index++) {
    var insertion = (cov_g15fjodrd.s[165]++, toInsert[index]);cov_g15fjodrd.s[166]++;array.splice(insertion.index, 0, insertion.value);
  } // apply modifications
  var toModifyLength = (cov_g15fjodrd.s[167]++, toModify.length);var child = (cov_g15fjodrd.s[168]++, void 0);cov_g15fjodrd.s[169]++;if (toModifyLength > 0) {
    cov_g15fjodrd.b[52][0]++;cov_g15fjodrd.s[170]++;for (index = 0; index < toModifyLength; index++) {
      var modification = (cov_g15fjodrd.s[171]++, toModify[index]);cov_g15fjodrd.s[172]++;child = new PatchContext(context.left[modification.index], modification.delta);cov_g15fjodrd.s[173]++;context.push(child, modification.index);
    }
  } else {
    cov_g15fjodrd.b[52][1]++;
  }cov_g15fjodrd.s[174]++;if (!context.children) {
    cov_g15fjodrd.b[53][0]++;cov_g15fjodrd.s[175]++;context.setResult(context.left).exit();cov_g15fjodrd.s[176]++;return;
  } else {
    cov_g15fjodrd.b[53][1]++;
  }cov_g15fjodrd.s[177]++;context.exit();
};cov_g15fjodrd.s[178]++;patchFilter$2.filterName = 'arrays';cov_g15fjodrd.s[179]++;var collectChildrenPatchFilter$1 = function collectChildrenPatchFilter(context) {
  cov_g15fjodrd.f[10]++;cov_g15fjodrd.s[180]++;if ((cov_g15fjodrd.b[55][0]++, !context) || (cov_g15fjodrd.b[55][1]++, !context.children)) {
    cov_g15fjodrd.b[54][0]++;cov_g15fjodrd.s[181]++;return;
  } else {
    cov_g15fjodrd.b[54][1]++;
  }cov_g15fjodrd.s[182]++;if (context.delta._t !== 'a') {
    cov_g15fjodrd.b[56][0]++;cov_g15fjodrd.s[183]++;return;
  } else {
    cov_g15fjodrd.b[56][1]++;
  }var length = (cov_g15fjodrd.s[184]++, context.children.length);var child = (cov_g15fjodrd.s[185]++, void 0);cov_g15fjodrd.s[186]++;for (var index = 0; index < length; index++) {
    cov_g15fjodrd.s[187]++;child = context.children[index];cov_g15fjodrd.s[188]++;context.left[child.childName] = child.result;
  }cov_g15fjodrd.s[189]++;context.setResult(context.left).exit();
};cov_g15fjodrd.s[190]++;collectChildrenPatchFilter$1.filterName = 'arraysCollectChildren';cov_g15fjodrd.s[191]++;var reverseFilter$2 = function arraysReverseFilter(context) {
  cov_g15fjodrd.f[11]++;cov_g15fjodrd.s[192]++;if (!context.nested) {
    cov_g15fjodrd.b[57][0]++;cov_g15fjodrd.s[193]++;if (context.delta[2] === ARRAY_MOVE) {
      cov_g15fjodrd.b[58][0]++;cov_g15fjodrd.s[194]++;context.newName = '_' + context.delta[1];cov_g15fjodrd.s[195]++;context.setResult([context.delta[0], parseInt(context.childName.substr(1), 10), ARRAY_MOVE]).exit();
    } else {
      cov_g15fjodrd.b[58][1]++;
    }cov_g15fjodrd.s[196]++;return;
  } else {
    cov_g15fjodrd.b[57][1]++;
  }cov_g15fjodrd.s[197]++;if (context.delta._t !== 'a') {
    cov_g15fjodrd.b[59][0]++;cov_g15fjodrd.s[198]++;return;
  } else {
    cov_g15fjodrd.b[59][1]++;
  }var name = (cov_g15fjodrd.s[199]++, void 0);var child = (cov_g15fjodrd.s[200]++, void 0);cov_g15fjodrd.s[201]++;for (name in context.delta) {
    cov_g15fjodrd.s[202]++;if (name === '_t') {
      cov_g15fjodrd.b[60][0]++;cov_g15fjodrd.s[203]++;continue;
    } else {
      cov_g15fjodrd.b[60][1]++;
    }cov_g15fjodrd.s[204]++;child = new ReverseContext(context.delta[name]);cov_g15fjodrd.s[205]++;context.push(child, name);
  }cov_g15fjodrd.s[206]++;context.exit();
};cov_g15fjodrd.s[207]++;reverseFilter$2.filterName = 'arrays';cov_g15fjodrd.s[208]++;var reverseArrayDeltaIndex = function reverseArrayDeltaIndex(delta, index, itemDelta) {
  cov_g15fjodrd.f[12]++;cov_g15fjodrd.s[209]++;if ((cov_g15fjodrd.b[62][0]++, typeof index === 'string') && (cov_g15fjodrd.b[62][1]++, index[0] === '_')) {
    cov_g15fjodrd.b[61][0]++;cov_g15fjodrd.s[210]++;return parseInt(index.substr(1), 10);
  } else {
    cov_g15fjodrd.b[61][1]++;cov_g15fjodrd.s[211]++;if ((cov_g15fjodrd.b[64][0]++, isArray$2(itemDelta)) && (cov_g15fjodrd.b[64][1]++, itemDelta[2] === 0)) {
      cov_g15fjodrd.b[63][0]++;cov_g15fjodrd.s[212]++;return '_' + index;
    } else {
      cov_g15fjodrd.b[63][1]++;
    }
  }var reverseIndex = (cov_g15fjodrd.s[213]++, +index);cov_g15fjodrd.s[214]++;for (var deltaIndex in delta) {
    var deltaItem = (cov_g15fjodrd.s[215]++, delta[deltaIndex]);cov_g15fjodrd.s[216]++;if (isArray$2(deltaItem)) {
      cov_g15fjodrd.b[65][0]++;cov_g15fjodrd.s[217]++;if (deltaItem[2] === ARRAY_MOVE) {
        cov_g15fjodrd.b[66][0]++;var moveFromIndex = (cov_g15fjodrd.s[218]++, parseInt(deltaIndex.substr(1), 10));var moveToIndex = (cov_g15fjodrd.s[219]++, deltaItem[1]);cov_g15fjodrd.s[220]++;if (moveToIndex === +index) {
          cov_g15fjodrd.b[67][0]++;cov_g15fjodrd.s[221]++;return moveFromIndex;
        } else {
          cov_g15fjodrd.b[67][1]++;
        }cov_g15fjodrd.s[222]++;if ((cov_g15fjodrd.b[69][0]++, moveFromIndex <= reverseIndex) && (cov_g15fjodrd.b[69][1]++, moveToIndex > reverseIndex)) {
          cov_g15fjodrd.b[68][0]++;cov_g15fjodrd.s[223]++;reverseIndex++;
        } else {
          cov_g15fjodrd.b[68][1]++;cov_g15fjodrd.s[224]++;if ((cov_g15fjodrd.b[71][0]++, moveFromIndex >= reverseIndex) && (cov_g15fjodrd.b[71][1]++, moveToIndex < reverseIndex)) {
            cov_g15fjodrd.b[70][0]++;cov_g15fjodrd.s[225]++;reverseIndex--;
          } else {
            cov_g15fjodrd.b[70][1]++;
          }
        }
      } else {
        cov_g15fjodrd.b[66][1]++;cov_g15fjodrd.s[226]++;if (deltaItem[2] === 0) {
          cov_g15fjodrd.b[72][0]++;var deleteIndex = (cov_g15fjodrd.s[227]++, parseInt(deltaIndex.substr(1), 10));cov_g15fjodrd.s[228]++;if (deleteIndex <= reverseIndex) {
            cov_g15fjodrd.b[73][0]++;cov_g15fjodrd.s[229]++;reverseIndex++;
          } else {
            cov_g15fjodrd.b[73][1]++;
          }
        } else {
          cov_g15fjodrd.b[72][1]++;cov_g15fjodrd.s[230]++;if ((cov_g15fjodrd.b[75][0]++, deltaItem.length === 1) && (cov_g15fjodrd.b[75][1]++, deltaIndex <= reverseIndex)) {
            cov_g15fjodrd.b[74][0]++;cov_g15fjodrd.s[231]++;reverseIndex--;
          } else {
            cov_g15fjodrd.b[74][1]++;
          }
        }
      }
    } else {
      cov_g15fjodrd.b[65][1]++;
    }
  }cov_g15fjodrd.s[232]++;return reverseIndex;
};function collectChildrenReverseFilter$1(context) {
  cov_g15fjodrd.f[13]++;cov_g15fjodrd.s[233]++;if ((cov_g15fjodrd.b[77][0]++, !context) || (cov_g15fjodrd.b[77][1]++, !context.children)) {
    cov_g15fjodrd.b[76][0]++;cov_g15fjodrd.s[234]++;return;
  } else {
    cov_g15fjodrd.b[76][1]++;
  }cov_g15fjodrd.s[235]++;if (context.delta._t !== 'a') {
    cov_g15fjodrd.b[78][0]++;cov_g15fjodrd.s[236]++;return;
  } else {
    cov_g15fjodrd.b[78][1]++;
  }var length = (cov_g15fjodrd.s[237]++, context.children.length);var child = (cov_g15fjodrd.s[238]++, void 0);var delta = (cov_g15fjodrd.s[239]++, { _t: 'a' });cov_g15fjodrd.s[240]++;for (var index = 0; index < length; index++) {
    cov_g15fjodrd.s[241]++;child = context.children[index];var name = (cov_g15fjodrd.s[242]++, child.newName);cov_g15fjodrd.s[243]++;if (typeof name === 'undefined') {
      cov_g15fjodrd.b[79][0]++;cov_g15fjodrd.s[244]++;name = reverseArrayDeltaIndex(context.delta, child.childName, child.result);
    } else {
      cov_g15fjodrd.b[79][1]++;
    }cov_g15fjodrd.s[245]++;if (delta[name] !== child.result) {
      cov_g15fjodrd.b[80][0]++;cov_g15fjodrd.s[246]++;delta[name] = child.result;
    } else {
      cov_g15fjodrd.b[80][1]++;
    }
  }cov_g15fjodrd.s[247]++;context.setResult(delta).exit();
}cov_g15fjodrd.s[248]++;collectChildrenReverseFilter$1.filterName = 'arraysCollectChildren';

var cov_3rnqyacq6 = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/filters/dates.js',
      hash = 'bbdf9d46e1ad60b363a5eb94ba7cef1d35ba0b6d',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/filters/dates.js', statementMap: { '0': { start: { line: 1, column: 24 }, end: { line: 16, column: 1 } }, '1': { start: { line: 2, column: 2 }, end: { line: 15, column: 3 } }, '2': { start: { line: 3, column: 4 }, end: { line: 11, column: 5 } }, '3': { start: { line: 4, column: 6 }, end: { line: 8, column: 7 } }, '4': { start: { line: 5, column: 8 }, end: { line: 5, column: 57 } }, '5': { start: { line: 7, column: 8 }, end: { line: 7, column: 37 } }, '6': { start: { line: 10, column: 6 }, end: { line: 10, column: 55 } }, '7': { start: { line: 12, column: 4 }, end: { line: 12, column: 19 } }, '8': { start: { line: 13, column: 9 }, end: { line: 15, column: 3 } }, '9': { start: { line: 14, column: 4 }, end: { line: 14, column: 60 } }, '10': { start: { line: 17, column: 0 }, end: { line: 17, column: 32 } } }, fnMap: { '0': { name: 'datesDiffFilter', decl: { start: { line: 1, column: 33 }, end: { line: 1, column: 48 } }, loc: { start: { line: 1, column: 58 }, end: { line: 16, column: 1 } }, line: 1 } }, branchMap: { '0': { loc: { start: { line: 2, column: 2 }, end: { line: 15, column: 3 } }, type: 'if', locations: [{ start: { line: 2, column: 2 }, end: { line: 15, column: 3 } }, { start: { line: 2, column: 2 }, end: { line: 15, column: 3 } }], line: 2 }, '1': { loc: { start: { line: 3, column: 4 }, end: { line: 11, column: 5 } }, type: 'if', locations: [{ start: { line: 3, column: 4 }, end: { line: 11, column: 5 } }, { start: { line: 3, column: 4 }, end: { line: 11, column: 5 } }], line: 3 }, '2': { loc: { start: { line: 4, column: 6 }, end: { line: 8, column: 7 } }, type: 'if', locations: [{ start: { line: 4, column: 6 }, end: { line: 8, column: 7 } }, { start: { line: 4, column: 6 }, end: { line: 8, column: 7 } }], line: 4 }, '3': { loc: { start: { line: 13, column: 9 }, end: { line: 15, column: 3 } }, type: 'if', locations: [{ start: { line: 13, column: 9 }, end: { line: 15, column: 3 } }, { start: { line: 13, column: 9 }, end: { line: 15, column: 3 } }], line: 13 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0 }, f: { '0': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();cov_3rnqyacq6.s[0]++;var diffFilter$2 = function datesDiffFilter(context) {
  cov_3rnqyacq6.f[0]++;cov_3rnqyacq6.s[1]++;if (context.left instanceof Date) {
    cov_3rnqyacq6.b[0][0]++;cov_3rnqyacq6.s[2]++;if (context.right instanceof Date) {
      cov_3rnqyacq6.b[1][0]++;cov_3rnqyacq6.s[3]++;if (context.left.getTime() !== context.right.getTime()) {
        cov_3rnqyacq6.b[2][0]++;cov_3rnqyacq6.s[4]++;context.setResult([context.left, context.right]);
      } else {
        cov_3rnqyacq6.b[2][1]++;cov_3rnqyacq6.s[5]++;context.setResult(undefined);
      }
    } else {
      cov_3rnqyacq6.b[1][1]++;cov_3rnqyacq6.s[6]++;context.setResult([context.left, context.right]);
    }cov_3rnqyacq6.s[7]++;context.exit();
  } else {
    cov_3rnqyacq6.b[0][1]++;cov_3rnqyacq6.s[8]++;if (context.right instanceof Date) {
      cov_3rnqyacq6.b[3][0]++;cov_3rnqyacq6.s[9]++;context.setResult([context.left, context.right]).exit();
    } else {
      cov_3rnqyacq6.b[3][1]++;
    }
  }
};cov_3rnqyacq6.s[10]++;diffFilter$2.filterName = 'dates';

var cov_270vbx2d41 = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/filters/texts.js',
      hash = '59929f1555c4391f2e3d74f8d1151ee41dfa1702',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/filters/texts.js', statementMap: { '0': { start: { line: 4, column: 16 }, end: { line: 4, column: 17 } }, '1': { start: { line: 5, column: 25 }, end: { line: 5, column: 27 } }, '2': { start: { line: 6, column: 22 }, end: { line: 6, column: 26 } }, '3': { start: { line: 8, column: 24 }, end: { line: 51, column: 1 } }, '4': { start: { line: 11, column: 2 }, end: { line: 49, column: 3 } }, '5': { start: { line: 12, column: 19 }, end: { line: 12, column: 25 } }, '6': { start: { line: 14, column: 4 }, end: { line: 23, column: 5 } }, '7': { start: { line: 16, column: 6 }, end: { line: 16, column: 123 } }, '8': { start: { line: 17, column: 11 }, end: { line: 23, column: 5 } }, '9': { start: { line: 18, column: 6 }, end: { line: 22, column: 7 } }, '10': { start: { line: 19, column: 8 }, end: { line: 19, column: 36 } }, '11': { start: { line: 21, column: 8 }, end: { line: 21, column: 24 } }, '12': { start: { line: 25, column: 4 }, end: { line: 33, column: 5 } }, '13': { start: { line: 26, column: 6 }, end: { line: 28, column: 7 } }, '14': { start: { line: 27, column: 8 }, end: { line: 27, column: 20 } }, '15': { start: { line: 29, column: 18 }, end: { line: 29, column: 70 } }, '16': { start: { line: 31, column: 6 }, end: { line: 31, column: 46 } }, '17': { start: { line: 32, column: 6 }, end: { line: 32, column: 18 } }, '18': { start: { line: 34, column: 4 }, end: { line: 48, column: 6 } }, '19': { start: { line: 36, column: 8 }, end: { line: 36, column: 70 } }, '20': { start: { line: 39, column: 22 }, end: { line: 39, column: 81 } }, '21': { start: { line: 40, column: 8 }, end: { line: 45, column: 9 } }, '22': { start: { line: 41, column: 10 }, end: { line: 44, column: 11 } }, '23': { start: { line: 42, column: 25 }, end: { line: 42, column: 55 } }, '24': { start: { line: 43, column: 12 }, end: { line: 43, column: 42 } }, '25': { start: { line: 46, column: 8 }, end: { line: 46, column: 26 } }, '26': { start: { line: 50, column: 2 }, end: { line: 50, column: 25 } }, '27': { start: { line: 53, column: 24 }, end: { line: 72, column: 1 } }, '28': { start: { line: 54, column: 2 }, end: { line: 56, column: 3 } }, '29': { start: { line: 55, column: 4 }, end: { line: 55, column: 11 } }, '30': { start: { line: 57, column: 18 }, end: { line: 57, column: 121 } }, '31': { start: { line: 58, column: 2 }, end: { line: 61, column: 3 } }, '32': { start: { line: 59, column: 4 }, end: { line: 59, column: 60 } }, '33': { start: { line: 60, column: 4 }, end: { line: 60, column: 11 } }, '34': { start: { line: 63, column: 23 }, end: { line: 63, column: 42 } }, '35': { start: { line: 64, column: 2 }, end: { line: 69, column: 3 } }, '36': { start: { line: 67, column: 4 }, end: { line: 67, column: 60 } }, '37': { start: { line: 68, column: 4 }, end: { line: 68, column: 11 } }, '38': { start: { line: 70, column: 13 }, end: { line: 70, column: 32 } }, '39': { start: { line: 71, column: 2 }, end: { line: 71, column: 78 } }, '40': { start: { line: 73, column: 0 }, end: { line: 73, column: 32 } }, '41': { start: { line: 75, column: 25 }, end: { line: 86, column: 1 } }, '42': { start: { line: 76, column: 2 }, end: { line: 78, column: 3 } }, '43': { start: { line: 77, column: 4 }, end: { line: 77, column: 11 } }, '44': { start: { line: 79, column: 2 }, end: { line: 81, column: 3 } }, '45': { start: { line: 80, column: 4 }, end: { line: 80, column: 11 } }, '46': { start: { line: 84, column: 14 }, end: { line: 84, column: 43 } }, '47': { start: { line: 85, column: 2 }, end: { line: 85, column: 66 } }, '48': { start: { line: 87, column: 0 }, end: { line: 87, column: 33 } }, '49': { start: { line: 89, column: 23 }, end: { line: 121, column: 1 } }, '50': { start: { line: 90, column: 10 }, end: { line: 90, column: 16 } }, '51': { start: { line: 91, column: 10 }, end: { line: 91, column: 16 } }, '52': { start: { line: 92, column: 14 }, end: { line: 92, column: 20 } }, '53': { start: { line: 93, column: 13 }, end: { line: 93, column: 19 } }, '54': { start: { line: 94, column: 16 }, end: { line: 94, column: 22 } }, '55': { start: { line: 95, column: 15 }, end: { line: 95, column: 19 } }, '56': { start: { line: 96, column: 20 }, end: { line: 96, column: 59 } }, '57': { start: { line: 97, column: 19 }, end: { line: 97, column: 25 } }, '58': { start: { line: 98, column: 2 }, end: { line: 98, column: 28 } }, '59': { start: { line: 99, column: 2 }, end: { line: 119, column: 3 } }, '60': { start: { line: 100, column: 4 }, end: { line: 100, column: 20 } }, '61': { start: { line: 101, column: 20 }, end: { line: 101, column: 36 } }, '62': { start: { line: 102, column: 4 }, end: { line: 118, column: 5 } }, '63': { start: { line: 103, column: 6 }, end: { line: 103, column: 38 } }, '64': { start: { line: 104, column: 6 }, end: { line: 104, column: 21 } }, '65': { start: { line: 107, column: 6 }, end: { line: 107, column: 108 } }, '66': { start: { line: 108, column: 11 }, end: { line: 118, column: 5 } }, '67': { start: { line: 109, column: 6 }, end: { line: 109, column: 41 } }, '68': { start: { line: 110, column: 6 }, end: { line: 115, column: 7 } }, '69': { start: { line: 112, column: 8 }, end: { line: 112, column: 27 } }, '70': { start: { line: 113, column: 8 }, end: { line: 113, column: 32 } }, '71': { start: { line: 114, column: 8 }, end: { line: 114, column: 31 } }, '72': { start: { line: 116, column: 11 }, end: { line: 118, column: 5 } }, '73': { start: { line: 117, column: 6 }, end: { line: 117, column: 41 } }, '74': { start: { line: 120, column: 2 }, end: { line: 120, column: 26 } }, '75': { start: { line: 123, column: 27 }, end: { line: 133, column: 1 } }, '76': { start: { line: 124, column: 2 }, end: { line: 126, column: 3 } }, '77': { start: { line: 125, column: 4 }, end: { line: 125, column: 11 } }, '78': { start: { line: 127, column: 2 }, end: { line: 129, column: 3 } }, '79': { start: { line: 128, column: 4 }, end: { line: 128, column: 11 } }, '80': { start: { line: 132, column: 2 }, end: { line: 132, column: 79 } }, '81': { start: { line: 134, column: 0 }, end: { line: 134, column: 35 } } }, fnMap: { '0': { name: 'getDiffMatchPatch', decl: { start: { line: 8, column: 33 }, end: { line: 8, column: 50 } }, loc: { start: { line: 8, column: 61 }, end: { line: 51, column: 1 } }, line: 8 }, '1': { name: 'diff', decl: { start: { line: 35, column: 21 }, end: { line: 35, column: 25 } }, loc: { start: { line: 35, column: 38 }, end: { line: 37, column: 7 } }, line: 35 }, '2': { name: 'patch', decl: { start: { line: 38, column: 22 }, end: { line: 38, column: 27 } }, loc: { start: { line: 38, column: 42 }, end: { line: 47, column: 7 } }, line: 38 }, '3': { name: 'textsDiffFilter', decl: { start: { line: 53, column: 33 }, end: { line: 53, column: 48 } }, loc: { start: { line: 53, column: 58 }, end: { line: 72, column: 1 } }, line: 53 }, '4': { name: 'textsPatchFilter', decl: { start: { line: 75, column: 34 }, end: { line: 75, column: 50 } }, loc: { start: { line: 75, column: 60 }, end: { line: 86, column: 1 } }, line: 75 }, '5': { name: 'textDeltaReverse', decl: { start: { line: 89, column: 32 }, end: { line: 89, column: 48 } }, loc: { start: { line: 89, column: 56 }, end: { line: 121, column: 1 } }, line: 89 }, '6': { name: 'textsReverseFilter', decl: { start: { line: 123, column: 36 }, end: { line: 123, column: 54 } }, loc: { start: { line: 123, column: 64 }, end: { line: 133, column: 1 } }, line: 123 } }, branchMap: { '0': { loc: { start: { line: 11, column: 2 }, end: { line: 49, column: 3 } }, type: 'if', locations: [{ start: { line: 11, column: 2 }, end: { line: 49, column: 3 } }, { start: { line: 11, column: 2 }, end: { line: 49, column: 3 } }], line: 11 }, '1': { loc: { start: { line: 14, column: 4 }, end: { line: 23, column: 5 } }, type: 'if', locations: [{ start: { line: 14, column: 4 }, end: { line: 23, column: 5 } }, { start: { line: 14, column: 4 }, end: { line: 23, column: 5 } }], line: 14 }, '2': { loc: { start: { line: 16, column: 17 }, end: { line: 16, column: 122 } }, type: 'cond-expr', locations: [{ start: { line: 16, column: 58 }, end: { line: 16, column: 80 } }, { start: { line: 16, column: 83 }, end: { line: 16, column: 122 } }], line: 16 }, '3': { loc: { start: { line: 17, column: 11 }, end: { line: 23, column: 5 } }, type: 'if', locations: [{ start: { line: 17, column: 11 }, end: { line: 23, column: 5 } }, { start: { line: 17, column: 11 }, end: { line: 23, column: 5 } }], line: 17 }, '4': { loc: { start: { line: 19, column: 19 }, end: { line: 19, column: 35 } }, type: 'binary-expr', locations: [{ start: { line: 19, column: 19 }, end: { line: 19, column: 22 } }, { start: { line: 19, column: 26 }, end: { line: 19, column: 35 } }], line: 19 }, '5': { loc: { start: { line: 25, column: 4 }, end: { line: 33, column: 5 } }, type: 'if', locations: [{ start: { line: 25, column: 4 }, end: { line: 33, column: 5 } }, { start: { line: 25, column: 4 }, end: { line: 33, column: 5 } }], line: 25 }, '6': { loc: { start: { line: 26, column: 6 }, end: { line: 28, column: 7 } }, type: 'if', locations: [{ start: { line: 26, column: 6 }, end: { line: 28, column: 7 } }, { start: { line: 26, column: 6 }, end: { line: 28, column: 7 } }], line: 26 }, '7': { loc: { start: { line: 41, column: 10 }, end: { line: 44, column: 11 } }, type: 'if', locations: [{ start: { line: 41, column: 10 }, end: { line: 44, column: 11 } }, { start: { line: 41, column: 10 }, end: { line: 44, column: 11 } }], line: 41 }, '8': { loc: { start: { line: 54, column: 2 }, end: { line: 56, column: 3 } }, type: 'if', locations: [{ start: { line: 54, column: 2 }, end: { line: 56, column: 3 } }, { start: { line: 54, column: 2 }, end: { line: 56, column: 3 } }], line: 54 }, '9': { loc: { start: { line: 57, column: 18 }, end: { line: 57, column: 121 } }, type: 'binary-expr', locations: [{ start: { line: 57, column: 18 }, end: { line: 57, column: 33 } }, { start: { line: 57, column: 37 }, end: { line: 57, column: 61 } }, { start: { line: 57, column: 65 }, end: { line: 57, column: 99 } }, { start: { line: 57, column: 103 }, end: { line: 57, column: 121 } }], line: 57 }, '10': { loc: { start: { line: 58, column: 2 }, end: { line: 61, column: 3 } }, type: 'if', locations: [{ start: { line: 58, column: 2 }, end: { line: 61, column: 3 } }, { start: { line: 58, column: 2 }, end: { line: 61, column: 3 } }], line: 58 }, '11': { loc: { start: { line: 58, column: 6 }, end: { line: 58, column: 73 } }, type: 'binary-expr', locations: [{ start: { line: 58, column: 6 }, end: { line: 58, column: 37 } }, { start: { line: 58, column: 41 }, end: { line: 58, column: 73 } }], line: 58 }, '12': { loc: { start: { line: 64, column: 2 }, end: { line: 69, column: 3 } }, type: 'if', locations: [{ start: { line: 64, column: 2 }, end: { line: 69, column: 3 } }, { start: { line: 64, column: 2 }, end: { line: 69, column: 3 } }], line: 64 }, '13': { loc: { start: { line: 76, column: 2 }, end: { line: 78, column: 3 } }, type: 'if', locations: [{ start: { line: 76, column: 2 }, end: { line: 78, column: 3 } }, { start: { line: 76, column: 2 }, end: { line: 78, column: 3 } }], line: 76 }, '14': { loc: { start: { line: 79, column: 2 }, end: { line: 81, column: 3 } }, type: 'if', locations: [{ start: { line: 79, column: 2 }, end: { line: 81, column: 3 } }, { start: { line: 79, column: 2 }, end: { line: 81, column: 3 } }], line: 79 }, '15': { loc: { start: { line: 102, column: 4 }, end: { line: 118, column: 5 } }, type: 'if', locations: [{ start: { line: 102, column: 4 }, end: { line: 118, column: 5 } }, { start: { line: 102, column: 4 }, end: { line: 118, column: 5 } }], line: 102 }, '16': { loc: { start: { line: 108, column: 11 }, end: { line: 118, column: 5 } }, type: 'if', locations: [{ start: { line: 108, column: 11 }, end: { line: 118, column: 5 } }, { start: { line: 108, column: 11 }, end: { line: 118, column: 5 } }], line: 108 }, '17': { loc: { start: { line: 110, column: 6 }, end: { line: 115, column: 7 } }, type: 'if', locations: [{ start: { line: 110, column: 6 }, end: { line: 115, column: 7 } }, { start: { line: 110, column: 6 }, end: { line: 115, column: 7 } }], line: 110 }, '18': { loc: { start: { line: 116, column: 11 }, end: { line: 118, column: 5 } }, type: 'if', locations: [{ start: { line: 116, column: 11 }, end: { line: 118, column: 5 } }, { start: { line: 116, column: 11 }, end: { line: 118, column: 5 } }], line: 116 }, '19': { loc: { start: { line: 124, column: 2 }, end: { line: 126, column: 3 } }, type: 'if', locations: [{ start: { line: 124, column: 2 }, end: { line: 126, column: 3 } }, { start: { line: 124, column: 2 }, end: { line: 126, column: 3 } }], line: 124 }, '20': { loc: { start: { line: 127, column: 2 }, end: { line: 129, column: 3 } }, type: 'if', locations: [{ start: { line: 127, column: 2 }, end: { line: 129, column: 3 } }, { start: { line: 127, column: 2 }, end: { line: 129, column: 3 } }], line: 127 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0, '74': 0, '75': 0, '76': 0, '77': 0, '78': 0, '79': 0, '80': 0, '81': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0, 0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0], '15': [0, 0], '16': [0, 0], '17': [0, 0], '18': [0, 0], '19': [0, 0], '20': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}(); /* global diff_match_patch */var TEXT_DIFF = (cov_270vbx2d41.s[0]++, 2);var DEFAULT_MIN_LENGTH = (cov_270vbx2d41.s[1]++, 60);var cachedDiffPatch = (cov_270vbx2d41.s[2]++, null);cov_270vbx2d41.s[3]++;var getDiffMatchPatch = function getDiffMatchPatch(required) {
  cov_270vbx2d41.f[0]++;cov_270vbx2d41.s[4]++; /* jshint camelcase: false */if (!cachedDiffPatch) {
    cov_270vbx2d41.b[0][0]++;var instance = (cov_270vbx2d41.s[5]++, void 0); /* eslint-disable camelcase, new-cap */cov_270vbx2d41.s[6]++;if (typeof diff_match_patch !== 'undefined') {
      cov_270vbx2d41.b[1][0]++;cov_270vbx2d41.s[7]++; // already loaded, probably a browser
      instance = typeof diff_match_patch === 'function' ? (cov_270vbx2d41.b[2][0]++, new diff_match_patch()) : (cov_270vbx2d41.b[2][1]++, new diff_match_patch.diff_match_patch());
    } else {
      cov_270vbx2d41.b[1][1]++;cov_270vbx2d41.s[8]++;if (diffMatchPatch) {
        cov_270vbx2d41.b[3][0]++;cov_270vbx2d41.s[9]++;try {
          cov_270vbx2d41.s[10]++;instance = (cov_270vbx2d41.b[4][0]++, diffMatchPatch) && (cov_270vbx2d41.b[4][1]++, new diffMatchPatch());
        } catch (err) {
          cov_270vbx2d41.s[11]++;instance = null;
        }
      } else {
        cov_270vbx2d41.b[3][1]++;
      }
    } /* eslint-enable camelcase, new-cap */cov_270vbx2d41.s[12]++;if (!instance) {
      cov_270vbx2d41.b[5][0]++;cov_270vbx2d41.s[13]++;if (!required) {
        cov_270vbx2d41.b[6][0]++;cov_270vbx2d41.s[14]++;return null;
      } else {
        cov_270vbx2d41.b[6][1]++;
      }var error = (cov_270vbx2d41.s[15]++, new Error('text diff_match_patch library not found')); // eslint-disable-next-line camelcase
      cov_270vbx2d41.s[16]++;error.diff_match_patch_not_found = true;cov_270vbx2d41.s[17]++;throw error;
    } else {
      cov_270vbx2d41.b[5][1]++;
    }cov_270vbx2d41.s[18]++;cachedDiffPatch = { diff: function diff(txt1, txt2) {
        cov_270vbx2d41.f[1]++;cov_270vbx2d41.s[19]++;return instance.patch_toText(instance.patch_make(txt1, txt2));
      }, patch: function patch(txt1, _patch) {
        cov_270vbx2d41.f[2]++;var results = (cov_270vbx2d41.s[20]++, instance.patch_apply(instance.patch_fromText(_patch), txt1));cov_270vbx2d41.s[21]++;for (var i = 0; i < results[1].length; i++) {
          cov_270vbx2d41.s[22]++;if (!results[1][i]) {
            cov_270vbx2d41.b[7][0]++;var _error = (cov_270vbx2d41.s[23]++, new Error('text patch failed'));cov_270vbx2d41.s[24]++;_error.textPatchFailed = true;
          } else {
            cov_270vbx2d41.b[7][1]++;
          }
        }cov_270vbx2d41.s[25]++;return results[0];
      } };
  } else {
    cov_270vbx2d41.b[0][1]++;
  }cov_270vbx2d41.s[26]++;return cachedDiffPatch;
};cov_270vbx2d41.s[27]++;var diffFilter$3 = function textsDiffFilter(context) {
  cov_270vbx2d41.f[3]++;cov_270vbx2d41.s[28]++;if (context.leftType !== 'string') {
    cov_270vbx2d41.b[8][0]++;cov_270vbx2d41.s[29]++;return;
  } else {
    cov_270vbx2d41.b[8][1]++;
  }var minLength = (cov_270vbx2d41.s[30]++, (cov_270vbx2d41.b[9][0]++, context.options) && (cov_270vbx2d41.b[9][1]++, context.options.textDiff) && (cov_270vbx2d41.b[9][2]++, context.options.textDiff.minLength) || (cov_270vbx2d41.b[9][3]++, DEFAULT_MIN_LENGTH));cov_270vbx2d41.s[31]++;if ((cov_270vbx2d41.b[11][0]++, context.left.length < minLength) || (cov_270vbx2d41.b[11][1]++, context.right.length < minLength)) {
    cov_270vbx2d41.b[10][0]++;cov_270vbx2d41.s[32]++;context.setResult([context.left, context.right]).exit();cov_270vbx2d41.s[33]++;return;
  } else {
    cov_270vbx2d41.b[10][1]++;
  } // large text, try to use a text-diff algorithm
  var diffMatchPatch$$1 = (cov_270vbx2d41.s[34]++, getDiffMatchPatch());cov_270vbx2d41.s[35]++;if (!diffMatchPatch$$1) {
    cov_270vbx2d41.b[12][0]++;cov_270vbx2d41.s[36]++; // diff-match-patch library not available,
    // fallback to regular string replace
    context.setResult([context.left, context.right]).exit();cov_270vbx2d41.s[37]++;return;
  } else {
    cov_270vbx2d41.b[12][1]++;
  }var diff = (cov_270vbx2d41.s[38]++, diffMatchPatch$$1.diff);cov_270vbx2d41.s[39]++;context.setResult([diff(context.left, context.right), 0, TEXT_DIFF]).exit();
};cov_270vbx2d41.s[40]++;diffFilter$3.filterName = 'texts';cov_270vbx2d41.s[41]++;var patchFilter$3 = function textsPatchFilter(context) {
  cov_270vbx2d41.f[4]++;cov_270vbx2d41.s[42]++;if (context.nested) {
    cov_270vbx2d41.b[13][0]++;cov_270vbx2d41.s[43]++;return;
  } else {
    cov_270vbx2d41.b[13][1]++;
  }cov_270vbx2d41.s[44]++;if (context.delta[2] !== TEXT_DIFF) {
    cov_270vbx2d41.b[14][0]++;cov_270vbx2d41.s[45]++;return;
  } else {
    cov_270vbx2d41.b[14][1]++;
  } // text-diff, use a text-patch algorithm
  var patch = (cov_270vbx2d41.s[46]++, getDiffMatchPatch(true).patch);cov_270vbx2d41.s[47]++;context.setResult(patch(context.left, context.delta[0])).exit();
};cov_270vbx2d41.s[48]++;patchFilter$3.filterName = 'texts';cov_270vbx2d41.s[49]++;var textDeltaReverse = function textDeltaReverse(delta) {
  cov_270vbx2d41.f[5]++;var i = (cov_270vbx2d41.s[50]++, void 0);var l = (cov_270vbx2d41.s[51]++, void 0);var lines = (cov_270vbx2d41.s[52]++, void 0);var line = (cov_270vbx2d41.s[53]++, void 0);var lineTmp = (cov_270vbx2d41.s[54]++, void 0);var header = (cov_270vbx2d41.s[55]++, null);var headerRegex = (cov_270vbx2d41.s[56]++, /^@@ +-(\d+),(\d+) +\+(\d+),(\d+) +@@$/);var lineHeader = (cov_270vbx2d41.s[57]++, void 0);cov_270vbx2d41.s[58]++;lines = delta.split('\n');cov_270vbx2d41.s[59]++;for (i = 0, l = lines.length; i < l; i++) {
    cov_270vbx2d41.s[60]++;line = lines[i];var lineStart = (cov_270vbx2d41.s[61]++, line.slice(0, 1));cov_270vbx2d41.s[62]++;if (lineStart === '@') {
      cov_270vbx2d41.b[15][0]++;cov_270vbx2d41.s[63]++;header = headerRegex.exec(line);cov_270vbx2d41.s[64]++;lineHeader = i; // fix header
      cov_270vbx2d41.s[65]++;lines[lineHeader] = '@@ -' + header[3] + ',' + header[4] + ' +' + header[1] + ',' + header[2] + ' @@';
    } else {
      cov_270vbx2d41.b[15][1]++;cov_270vbx2d41.s[66]++;if (lineStart === '+') {
        cov_270vbx2d41.b[16][0]++;cov_270vbx2d41.s[67]++;lines[i] = '-' + lines[i].slice(1);cov_270vbx2d41.s[68]++;if (lines[i - 1].slice(0, 1) === '+') {
          cov_270vbx2d41.b[17][0]++;cov_270vbx2d41.s[69]++; // swap lines to keep default order (-+)
          lineTmp = lines[i];cov_270vbx2d41.s[70]++;lines[i] = lines[i - 1];cov_270vbx2d41.s[71]++;lines[i - 1] = lineTmp;
        } else {
          cov_270vbx2d41.b[17][1]++;
        }
      } else {
        cov_270vbx2d41.b[16][1]++;cov_270vbx2d41.s[72]++;if (lineStart === '-') {
          cov_270vbx2d41.b[18][0]++;cov_270vbx2d41.s[73]++;lines[i] = '+' + lines[i].slice(1);
        } else {
          cov_270vbx2d41.b[18][1]++;
        }
      }
    }
  }cov_270vbx2d41.s[74]++;return lines.join('\n');
};cov_270vbx2d41.s[75]++;var reverseFilter$3 = function textsReverseFilter(context) {
  cov_270vbx2d41.f[6]++;cov_270vbx2d41.s[76]++;if (context.nested) {
    cov_270vbx2d41.b[19][0]++;cov_270vbx2d41.s[77]++;return;
  } else {
    cov_270vbx2d41.b[19][1]++;
  }cov_270vbx2d41.s[78]++;if (context.delta[2] !== TEXT_DIFF) {
    cov_270vbx2d41.b[20][0]++;cov_270vbx2d41.s[79]++;return;
  } else {
    cov_270vbx2d41.b[20][1]++;
  } // text-diff, use a text-diff algorithm
  cov_270vbx2d41.s[80]++;context.setResult([textDeltaReverse(context.delta[0]), 0, TEXT_DIFF]).exit();
};cov_270vbx2d41.s[81]++;reverseFilter$3.filterName = 'texts';

var cov_1oxpk51fyz = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/diffpatcher.js',
      hash = 'afb73d8bb84427cf6d05cac032da70bc57baca2b',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/diffpatcher.js', statementMap: { '0': { start: { line: 14, column: 18 }, end: { line: 58, column: 3 } }, '1': { start: { line: 16, column: 4 }, end: { line: 16, column: 51 } }, '2': { start: { line: 18, column: 4 }, end: { line: 18, column: 44 } }, '3': { start: { line: 19, column: 4 }, end: { line: 19, column: 203 } }, '4': { start: { line: 20, column: 4 }, end: { line: 20, column: 219 } }, '5': { start: { line: 21, column: 4 }, end: { line: 21, column: 233 } }, '6': { start: { line: 24, column: 2 }, end: { line: 56, column: 6 } }, '7': { start: { line: 29, column: 6 }, end: { line: 29, column: 80 } }, '8': { start: { line: 34, column: 6 }, end: { line: 34, column: 66 } }, '9': { start: { line: 39, column: 6 }, end: { line: 39, column: 67 } }, '10': { start: { line: 44, column: 6 }, end: { line: 44, column: 63 } }, '11': { start: { line: 49, column: 6 }, end: { line: 49, column: 52 } }, '12': { start: { line: 54, column: 6 }, end: { line: 54, column: 27 } }, '13': { start: { line: 57, column: 2 }, end: { line: 57, column: 21 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 14, column: 18 }, end: { line: 14, column: 19 } }, loc: { start: { line: 14, column: 30 }, end: { line: 58, column: 1 } }, line: 14 }, '1': { name: 'DiffPatcher', decl: { start: { line: 15, column: 11 }, end: { line: 15, column: 22 } }, loc: { start: { line: 15, column: 32 }, end: { line: 22, column: 3 } }, line: 15 }, '2': { name: 'options', decl: { start: { line: 26, column: 20 }, end: { line: 26, column: 27 } }, loc: { start: { line: 26, column: 30 }, end: { line: 30, column: 5 } }, line: 26 }, '3': { name: 'diff', decl: { start: { line: 33, column: 20 }, end: { line: 33, column: 24 } }, loc: { start: { line: 33, column: 38 }, end: { line: 35, column: 5 } }, line: 33 }, '4': { name: 'patch', decl: { start: { line: 38, column: 20 }, end: { line: 38, column: 25 } }, loc: { start: { line: 38, column: 39 }, end: { line: 40, column: 5 } }, line: 38 }, '5': { name: 'reverse', decl: { start: { line: 43, column: 20 }, end: { line: 43, column: 27 } }, loc: { start: { line: 43, column: 35 }, end: { line: 45, column: 5 } }, line: 43 }, '6': { name: 'unpatch', decl: { start: { line: 48, column: 20 }, end: { line: 48, column: 27 } }, loc: { start: { line: 48, column: 42 }, end: { line: 50, column: 5 } }, line: 48 }, '7': { name: 'clone', decl: { start: { line: 53, column: 20 }, end: { line: 53, column: 25 } }, loc: { start: { line: 53, column: 33 }, end: { line: 55, column: 5 } }, line: 53 } }, branchMap: {}, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0 }, b: {}, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var DiffPatcher = (cov_1oxpk51fyz.s[0]++, function () {
  cov_1oxpk51fyz.f[0]++;function DiffPatcher(options) {
    cov_1oxpk51fyz.f[1]++;cov_1oxpk51fyz.s[1]++;classCallCheck$1(this, DiffPatcher);cov_1oxpk51fyz.s[2]++;this.processor = new Processor(options);cov_1oxpk51fyz.s[3]++;this.processor.pipe(new Pipe('diff').append(collectChildrenDiffFilter, diffFilter, diffFilter$2, diffFilter$3, objectsDiffFilter, diffFilter$1).shouldHaveResult());cov_1oxpk51fyz.s[4]++;this.processor.pipe(new Pipe('patch').append(collectChildrenPatchFilter, collectChildrenPatchFilter$1, patchFilter, patchFilter$3, patchFilter$1, patchFilter$2).shouldHaveResult());cov_1oxpk51fyz.s[5]++;this.processor.pipe(new Pipe('reverse').append(collectChildrenReverseFilter, collectChildrenReverseFilter$1, reverseFilter, reverseFilter$3, reverseFilter$1, reverseFilter$2).shouldHaveResult());
  }cov_1oxpk51fyz.s[6]++;createClass$1(DiffPatcher, [{ key: 'options', value: function options() {
      cov_1oxpk51fyz.f[2]++;var _processor;cov_1oxpk51fyz.s[7]++;return (_processor = this.processor).options.apply(_processor, arguments);
    } }, { key: 'diff', value: function diff(left, right) {
      cov_1oxpk51fyz.f[3]++;cov_1oxpk51fyz.s[8]++;return this.processor.process(new DiffContext(left, right));
    } }, { key: 'patch', value: function patch(left, delta) {
      cov_1oxpk51fyz.f[4]++;cov_1oxpk51fyz.s[9]++;return this.processor.process(new PatchContext(left, delta));
    } }, { key: 'reverse', value: function reverse(delta) {
      cov_1oxpk51fyz.f[5]++;cov_1oxpk51fyz.s[10]++;return this.processor.process(new ReverseContext(delta));
    } }, { key: 'unpatch', value: function unpatch(right, delta) {
      cov_1oxpk51fyz.f[6]++;cov_1oxpk51fyz.s[11]++;return this.patch(right, this.reverse(delta));
    } }, { key: 'clone', value: function clone$$1(value) {
      cov_1oxpk51fyz.f[7]++;cov_1oxpk51fyz.s[12]++;return clone(value);
    } }]);cov_1oxpk51fyz.s[13]++;return DiffPatcher;
}());

var cov_1ac9yxw2a1 = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/formatters/base.js',
      hash = '9122c1b3145bac8ced2066a881aa40d08fca69c2',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/formatters/base.js', statementMap: { '0': { start: { line: 1, column: 14 }, end: { line: 3, column: 1 } }, '1': { start: { line: 2, column: 2 }, end: { line: 2, column: 28 } }, '2': { start: { line: 5, column: 20 }, end: { line: 15, column: 1 } }, '3': { start: { line: 6, column: 2 }, end: { line: 6, column: 26 } }, '4': { start: { line: 8, column: 14 }, end: { line: 8, column: 16 } }, '5': { start: { line: 9, column: 2 }, end: { line: 13, column: 3 } }, '6': { start: { line: 10, column: 4 }, end: { line: 12, column: 5 } }, '7': { start: { line: 11, column: 6 }, end: { line: 11, column: 27 } }, '8': { start: { line: 14, column: 2 }, end: { line: 14, column: 15 } }, '9': { start: { line: 17, column: 21 }, end: { line: 22, column: 1 } }, '10': { start: { line: 18, column: 2 }, end: { line: 20, column: 3 } }, '11': { start: { line: 19, column: 4 }, end: { line: 19, column: 24 } }, '12': { start: { line: 21, column: 2 }, end: { line: 21, column: 13 } }, '13': { start: { line: 24, column: 27 }, end: { line: 34, column: 1 } }, '14': { start: { line: 25, column: 2 }, end: { line: 33, column: 3 } }, '15': { start: { line: 26, column: 4 }, end: { line: 26, column: 14 } }, '16': { start: { line: 28, column: 4 }, end: { line: 32, column: 5 } }, '17': { start: { line: 29, column: 6 }, end: { line: 29, column: 40 } }, '18': { start: { line: 31, column: 6 }, end: { line: 31, column: 37 } }, '19': { start: { line: 36, column: 23 }, end: { line: 38, column: 1 } }, '20': { start: { line: 37, column: 2 }, end: { line: 37, column: 65 } }, '21': { start: { line: 40, column: 20 }, end: { line: 242, column: 3 } }, '22': { start: { line: 42, column: 4 }, end: { line: 42, column: 53 } }, '23': { start: { line: 45, column: 2 }, end: { line: 240, column: 6 } }, '24': { start: { line: 48, column: 20 }, end: { line: 48, column: 22 } }, '25': { start: { line: 49, column: 6 }, end: { line: 49, column: 35 } }, '26': { start: { line: 50, column: 6 }, end: { line: 50, column: 41 } }, '27': { start: { line: 51, column: 6 }, end: { line: 51, column: 36 } }, '28': { start: { line: 56, column: 6 }, end: { line: 56, column: 26 } }, '29': { start: { line: 57, column: 6 }, end: { line: 61, column: 8 } }, '30': { start: { line: 60, column: 8 }, end: { line: 60, column: 63 } }, '31': { start: { line: 66, column: 6 }, end: { line: 66, column: 64 } }, '32': { start: { line: 71, column: 6 }, end: { line: 71, column: 28 } }, '33': { start: { line: 76, column: 19 }, end: { line: 76, column: 30 } }, '34': { start: { line: 78, column: 6 }, end: { line: 80, column: 7 } }, '35': { start: { line: 79, column: 8 }, end: { line: 79, column: 31 } }, '36': { start: { line: 85, column: 30 }, end: { line: 85, column: 48 } }, '37': { start: { line: 86, column: 22 }, end: { line: 86, column: 64 } }, '38': { start: { line: 88, column: 6 }, end: { line: 90, column: 7 } }, '39': { start: { line: 89, column: 8 }, end: { line: 89, column: 25 } }, '40': { start: { line: 92, column: 17 }, end: { line: 92, column: 52 } }, '41': { start: { line: 93, column: 21 }, end: { line: 93, column: 81 } }, '42': { start: { line: 95, column: 6 }, end: { line: 99, column: 7 } }, '43': { start: { line: 96, column: 8 }, end: { line: 96, column: 70 } }, '44': { start: { line: 98, column: 8 }, end: { line: 98, column: 48 } }, '45': { start: { line: 101, column: 27 }, end: { line: 101, column: 33 } }, '46': { start: { line: 102, column: 6 }, end: { line: 110, column: 7 } }, '47': { start: { line: 103, column: 8 }, end: { line: 103, column: 94 } }, '48': { start: { line: 104, column: 8 }, end: { line: 104, column: 86 } }, '49': { start: { line: 106, column: 8 }, end: { line: 106, column: 99 } }, '50': { start: { line: 107, column: 8 }, end: { line: 109, column: 9 } }, '51': { start: { line: 108, column: 10 }, end: { line: 108, column: 35 } }, '52': { start: { line: 112, column: 6 }, end: { line: 116, column: 7 } }, '53': { start: { line: 113, column: 8 }, end: { line: 113, column: 68 } }, '54': { start: { line: 115, column: 8 }, end: { line: 115, column: 46 } }, '55': { start: { line: 121, column: 17 }, end: { line: 121, column: 21 } }, '56': { start: { line: 122, column: 6 }, end: { line: 124, column: 9 } }, '57': { start: { line: 123, column: 8 }, end: { line: 123, column: 109 } }, '58': { start: { line: 129, column: 17 }, end: { line: 129, column: 37 } }, '59': { start: { line: 130, column: 22 }, end: { line: 130, column: 38 } }, '60': { start: { line: 131, column: 29 }, end: { line: 131, column: 31 } }, '61': { start: { line: 132, column: 17 }, end: { line: 132, column: 23 } }, '62': { start: { line: 133, column: 6 }, end: { line: 141, column: 7 } }, '63': { start: { line: 134, column: 8 }, end: { line: 140, column: 9 } }, '64': { start: { line: 135, column: 10 }, end: { line: 139, column: 11 } }, '65': { start: { line: 136, column: 12 }, end: { line: 138, column: 13 } }, '66': { start: { line: 137, column: 14 }, end: { line: 137, column: 30 } }, '67': { start: { line: 143, column: 6 }, end: { line: 158, column: 7 } }, '68': { start: { line: 144, column: 8 }, end: { line: 157, column: 9 } }, '69': { start: { line: 145, column: 22 }, end: { line: 145, column: 33 } }, '70': { start: { line: 146, column: 10 }, end: { line: 156, column: 11 } }, '71': { start: { line: 147, column: 12 }, end: { line: 150, column: 14 } }, '72': { start: { line: 151, column: 12 }, end: { line: 155, column: 13 } }, '73': { start: { line: 152, column: 14 }, end: { line: 154, column: 15 } }, '74': { start: { line: 153, column: 16 }, end: { line: 153, column: 47 } }, '75': { start: { line: 159, column: 6 }, end: { line: 163, column: 7 } }, '76': { start: { line: 160, column: 8 }, end: { line: 160, column: 36 } }, '77': { start: { line: 162, column: 8 }, end: { line: 162, column: 20 } }, '78': { start: { line: 164, column: 6 }, end: { line: 172, column: 7 } }, '79': { start: { line: 165, column: 18 }, end: { line: 165, column: 29 } }, '80': { start: { line: 166, column: 8 }, end: { line: 168, column: 9 } }, '81': { start: { line: 167, column: 10 }, end: { line: 167, column: 19 } }, '82': { start: { line: 169, column: 22 }, end: { line: 169, column: 105 } }, '83': { start: { line: 170, column: 21 }, end: { line: 170, column: 41 } }, '84': { start: { line: 171, column: 8 }, end: { line: 171, column: 60 } }, '85': { start: { line: 177, column: 6 }, end: { line: 182, column: 7 } }, '86': { start: { line: 178, column: 8 }, end: { line: 180, column: 9 } }, '87': { start: { line: 179, column: 10 }, end: { line: 179, column: 35 } }, '88': { start: { line: 181, column: 8 }, end: { line: 181, column: 27 } }, '89': { start: { line: 183, column: 6 }, end: { line: 201, column: 7 } }, '90': { start: { line: 184, column: 8 }, end: { line: 186, column: 9 } }, '91': { start: { line: 185, column: 10 }, end: { line: 185, column: 25 } }, '92': { start: { line: 187, column: 8 }, end: { line: 189, column: 9 } }, '93': { start: { line: 188, column: 10 }, end: { line: 188, column: 28 } }, '94': { start: { line: 190, column: 8 }, end: { line: 192, column: 9 } }, '95': { start: { line: 191, column: 10 }, end: { line: 191, column: 27 } }, '96': { start: { line: 193, column: 8 }, end: { line: 195, column: 9 } }, '97': { start: { line: 194, column: 10 }, end: { line: 194, column: 28 } }, '98': { start: { line: 196, column: 8 }, end: { line: 198, column: 9 } }, '99': { start: { line: 197, column: 10 }, end: { line: 197, column: 25 } }, '100': { start: { line: 199, column: 13 }, end: { line: 201, column: 7 } }, '101': { start: { line: 200, column: 8 }, end: { line: 200, column: 22 } }, '102': { start: { line: 202, column: 6 }, end: { line: 202, column: 23 } }, '103': { start: { line: 207, column: 19 }, end: { line: 207, column: 21 } }, '104': { start: { line: 208, column: 18 }, end: { line: 208, column: 38 } }, '105': { start: { line: 209, column: 6 }, end: { line: 237, column: 7 } }, '106': { start: { line: 210, column: 19 }, end: { line: 210, column: 27 } }, '107': { start: { line: 211, column: 25 }, end: { line: 213, column: 9 } }, '108': { start: { line: 214, column: 23 }, end: { line: 214, column: 70 } }, '109': { start: { line: 215, column: 8 }, end: { line: 218, column: 10 } }, '110': { start: { line: 219, column: 21 }, end: { line: 219, column: 46 } }, '111': { start: { line: 220, column: 8 }, end: { line: 235, column: 9 } }, '112': { start: { line: 221, column: 22 }, end: { line: 221, column: 40 } }, '113': { start: { line: 222, column: 10 }, end: { line: 224, column: 11 } }, '114': { start: { line: 223, column: 12 }, end: { line: 223, column: 21 } }, '115': { start: { line: 225, column: 28 }, end: { line: 227, column: 11 } }, '116': { start: { line: 228, column: 10 }, end: { line: 232, column: 11 } }, '117': { start: { line: 229, column: 12 }, end: { line: 229, column: 39 } }, '118': { start: { line: 230, column: 17 }, end: { line: 232, column: 11 } }, '119': { start: { line: 231, column: 12 }, end: { line: 231, column: 41 } }, '120': { start: { line: 233, column: 10 }, end: { line: 233, column: 44 } }, '121': { start: { line: 234, column: 10 }, end: { line: 234, column: 46 } }, '122': { start: { line: 236, column: 8 }, end: { line: 236, column: 32 } }, '123': { start: { line: 238, column: 6 }, end: { line: 238, column: 20 } }, '124': { start: { line: 241, column: 2 }, end: { line: 241, column: 23 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 1, column: 68 }, end: { line: 1, column: 69 } }, loc: { start: { line: 1, column: 81 }, end: { line: 3, column: 1 } }, line: 1 }, '1': { name: '(anonymous_1)', decl: { start: { line: 5, column: 56 }, end: { line: 5, column: 57 } }, loc: { start: { line: 5, column: 71 }, end: { line: 7, column: 1 } }, line: 5 }, '2': { name: '(anonymous_2)', decl: { start: { line: 7, column: 4 }, end: { line: 7, column: 5 } }, loc: { start: { line: 7, column: 19 }, end: { line: 15, column: 1 } }, line: 7 }, '3': { name: 'trimUnderscore', decl: { start: { line: 17, column: 30 }, end: { line: 17, column: 44 } }, loc: { start: { line: 17, column: 50 }, end: { line: 22, column: 1 } }, line: 17 }, '4': { name: 'arrayKeyToSortNumber', decl: { start: { line: 24, column: 36 }, end: { line: 24, column: 56 } }, loc: { start: { line: 24, column: 62 }, end: { line: 34, column: 1 } }, line: 24 }, '5': { name: 'arrayKeyComparer', decl: { start: { line: 36, column: 32 }, end: { line: 36, column: 48 } }, loc: { start: { line: 36, column: 61 }, end: { line: 38, column: 1 } }, line: 36 }, '6': { name: '(anonymous_6)', decl: { start: { line: 40, column: 20 }, end: { line: 40, column: 21 } }, loc: { start: { line: 40, column: 32 }, end: { line: 242, column: 1 } }, line: 40 }, '7': { name: 'BaseFormatter', decl: { start: { line: 41, column: 11 }, end: { line: 41, column: 24 } }, loc: { start: { line: 41, column: 27 }, end: { line: 43, column: 3 } }, line: 41 }, '8': { name: 'format', decl: { start: { line: 47, column: 20 }, end: { line: 47, column: 26 } }, loc: { start: { line: 47, column: 40 }, end: { line: 52, column: 5 } }, line: 47 }, '9': { name: 'prepareContext', decl: { start: { line: 55, column: 20 }, end: { line: 55, column: 34 } }, loc: { start: { line: 55, column: 44 }, end: { line: 62, column: 5 } }, line: 55 }, '10': { name: '(anonymous_10)', decl: { start: { line: 57, column: 20 }, end: { line: 57, column: 21 } }, loc: { start: { line: 57, column: 32 }, end: { line: 61, column: 7 } }, line: 57 }, '11': { name: 'typeFormattterNotFound', decl: { start: { line: 65, column: 20 }, end: { line: 65, column: 42 } }, loc: { start: { line: 65, column: 63 }, end: { line: 67, column: 5 } }, line: 65 }, '12': { name: 'typeFormattterErrorFormatter', decl: { start: { line: 70, column: 20 }, end: { line: 70, column: 48 } }, loc: { start: { line: 70, column: 63 }, end: { line: 72, column: 5 } }, line: 70 }, '13': { name: 'finalize', decl: { start: { line: 75, column: 20 }, end: { line: 75, column: 28 } }, loc: { start: { line: 75, column: 35 }, end: { line: 81, column: 5 } }, line: 75 }, '14': { name: 'recurse', decl: { start: { line: 84, column: 20 }, end: { line: 84, column: 27 } }, loc: { start: { line: 84, column: 83 }, end: { line: 117, column: 5 } }, line: 84 }, '15': { name: 'formatDeltaChildren', decl: { start: { line: 120, column: 20 }, end: { line: 120, column: 39 } }, loc: { start: { line: 120, column: 62 }, end: { line: 125, column: 5 } }, line: 120 }, '16': { name: '(anonymous_16)', decl: { start: { line: 122, column: 40 }, end: { line: 122, column: 41 } }, loc: { start: { line: 122, column: 83 }, end: { line: 124, column: 7 } }, line: 122 }, '17': { name: 'forEachDeltaKey', decl: { start: { line: 128, column: 20 }, end: { line: 128, column: 35 } }, loc: { start: { line: 128, column: 53 }, end: { line: 173, column: 5 } }, line: 128 }, '18': { name: 'getDeltaType', decl: { start: { line: 176, column: 20 }, end: { line: 176, column: 32 } }, loc: { start: { line: 176, column: 51 }, end: { line: 203, column: 5 } }, line: 176 }, '19': { name: 'parseTextDiff', decl: { start: { line: 206, column: 20 }, end: { line: 206, column: 33 } }, loc: { start: { line: 206, column: 41 }, end: { line: 239, column: 5 } }, line: 206 } }, branchMap: { '0': { loc: { start: { line: 1, column: 14 }, end: { line: 3, column: 1 } }, type: 'cond-expr', locations: [{ start: { line: 1, column: 52 }, end: { line: 1, column: 65 } }, { start: { line: 1, column: 68 }, end: { line: 3, column: 1 } }], line: 1 }, '1': { loc: { start: { line: 5, column: 20 }, end: { line: 15, column: 1 } }, type: 'cond-expr', locations: [{ start: { line: 5, column: 56 }, end: { line: 7, column: 1 } }, { start: { line: 7, column: 4 }, end: { line: 15, column: 1 } }], line: 5 }, '2': { loc: { start: { line: 10, column: 4 }, end: { line: 12, column: 5 } }, type: 'if', locations: [{ start: { line: 10, column: 4 }, end: { line: 12, column: 5 } }, { start: { line: 10, column: 4 }, end: { line: 12, column: 5 } }], line: 10 }, '3': { loc: { start: { line: 18, column: 2 }, end: { line: 20, column: 3 } }, type: 'if', locations: [{ start: { line: 18, column: 2 }, end: { line: 20, column: 3 } }, { start: { line: 18, column: 2 }, end: { line: 20, column: 3 } }], line: 18 }, '4': { loc: { start: { line: 25, column: 2 }, end: { line: 33, column: 3 } }, type: 'if', locations: [{ start: { line: 25, column: 2 }, end: { line: 33, column: 3 } }, { start: { line: 25, column: 2 }, end: { line: 33, column: 3 } }], line: 25 }, '5': { loc: { start: { line: 28, column: 4 }, end: { line: 32, column: 5 } }, type: 'if', locations: [{ start: { line: 28, column: 4 }, end: { line: 32, column: 5 } }, { start: { line: 28, column: 4 }, end: { line: 32, column: 5 } }], line: 28 }, '6': { loc: { start: { line: 78, column: 6 }, end: { line: 80, column: 7 } }, type: 'if', locations: [{ start: { line: 78, column: 6 }, end: { line: 80, column: 7 } }, { start: { line: 78, column: 6 }, end: { line: 80, column: 7 } }], line: 78 }, '7': { loc: { start: { line: 85, column: 30 }, end: { line: 85, column: 48 } }, type: 'binary-expr', locations: [{ start: { line: 85, column: 30 }, end: { line: 85, column: 35 } }, { start: { line: 85, column: 39 }, end: { line: 85, column: 48 } }], line: 85 }, '8': { loc: { start: { line: 86, column: 22 }, end: { line: 86, column: 64 } }, type: 'cond-expr', locations: [{ start: { line: 86, column: 42 }, end: { line: 86, column: 57 } }, { start: { line: 86, column: 60 }, end: { line: 86, column: 64 } }], line: 86 }, '9': { loc: { start: { line: 88, column: 6 }, end: { line: 90, column: 7 } }, type: 'if', locations: [{ start: { line: 88, column: 6 }, end: { line: 90, column: 7 } }, { start: { line: 88, column: 6 }, end: { line: 90, column: 7 } }], line: 88 }, '10': { loc: { start: { line: 88, column: 10 }, end: { line: 88, column: 68 } }, type: 'binary-expr', locations: [{ start: { line: 88, column: 10 }, end: { line: 88, column: 38 } }, { start: { line: 88, column: 42 }, end: { line: 88, column: 68 } }], line: 88 }, '11': { loc: { start: { line: 93, column: 21 }, end: { line: 93, column: 81 } }, type: 'cond-expr', locations: [{ start: { line: 93, column: 39 }, end: { line: 93, column: 76 } }, { start: { line: 93, column: 79 }, end: { line: 93, column: 81 } }], line: 93 }, '12': { loc: { start: { line: 93, column: 39 }, end: { line: 93, column: 76 } }, type: 'cond-expr', locations: [{ start: { line: 93, column: 58 }, end: { line: 93, column: 65 } }, { start: { line: 93, column: 68 }, end: { line: 93, column: 76 } }], line: 93 }, '13': { loc: { start: { line: 95, column: 6 }, end: { line: 99, column: 7 } }, type: 'if', locations: [{ start: { line: 95, column: 6 }, end: { line: 99, column: 7 } }, { start: { line: 95, column: 6 }, end: { line: 99, column: 7 } }], line: 95 }, '14': { loc: { start: { line: 103, column: 25 }, end: { line: 103, column: 93 } }, type: 'binary-expr', locations: [{ start: { line: 103, column: 25 }, end: { line: 103, column: 47 } }, { start: { line: 103, column: 51 }, end: { line: 103, column: 93 } }], line: 103 }, '15': { loc: { start: { line: 107, column: 8 }, end: { line: 109, column: 9 } }, type: 'if', locations: [{ start: { line: 107, column: 8 }, end: { line: 109, column: 9 } }, { start: { line: 107, column: 8 }, end: { line: 109, column: 9 } }], line: 107 }, '16': { loc: { start: { line: 107, column: 12 }, end: { line: 107, column: 59 } }, type: 'binary-expr', locations: [{ start: { line: 107, column: 12 }, end: { line: 107, column: 42 } }, { start: { line: 107, column: 46 }, end: { line: 107, column: 59 } }], line: 107 }, '17': { loc: { start: { line: 112, column: 6 }, end: { line: 116, column: 7 } }, type: 'if', locations: [{ start: { line: 112, column: 6 }, end: { line: 116, column: 7 } }, { start: { line: 112, column: 6 }, end: { line: 116, column: 7 } }], line: 112 }, '18': { loc: { start: { line: 123, column: 42 }, end: { line: 123, column: 74 } }, type: 'cond-expr', locations: [{ start: { line: 123, column: 49 }, end: { line: 123, column: 62 } }, { start: { line: 123, column: 65 }, end: { line: 123, column: 74 } }], line: 123 }, '19': { loc: { start: { line: 133, column: 6 }, end: { line: 141, column: 7 } }, type: 'if', locations: [{ start: { line: 133, column: 6 }, end: { line: 141, column: 7 } }, { start: { line: 133, column: 6 }, end: { line: 141, column: 7 } }], line: 133 }, '20': { loc: { start: { line: 135, column: 10 }, end: { line: 139, column: 11 } }, type: 'if', locations: [{ start: { line: 135, column: 10 }, end: { line: 139, column: 11 } }, { start: { line: 135, column: 10 }, end: { line: 139, column: 11 } }], line: 135 }, '21': { loc: { start: { line: 136, column: 12 }, end: { line: 138, column: 13 } }, type: 'if', locations: [{ start: { line: 136, column: 12 }, end: { line: 138, column: 13 } }, { start: { line: 136, column: 12 }, end: { line: 138, column: 13 } }], line: 136 }, '22': { loc: { start: { line: 136, column: 16 }, end: { line: 136, column: 110 } }, type: 'binary-expr', locations: [{ start: { line: 136, column: 16 }, end: { line: 136, column: 50 } }, { start: { line: 136, column: 55 }, end: { line: 136, column: 65 } }, { start: { line: 136, column: 69 }, end: { line: 136, column: 109 } }], line: 136 }, '23': { loc: { start: { line: 144, column: 8 }, end: { line: 157, column: 9 } }, type: 'if', locations: [{ start: { line: 144, column: 8 }, end: { line: 157, column: 9 } }, { start: { line: 144, column: 8 }, end: { line: 157, column: 9 } }], line: 144 }, '24': { loc: { start: { line: 146, column: 10 }, end: { line: 156, column: 11 } }, type: 'if', locations: [{ start: { line: 146, column: 10 }, end: { line: 156, column: 11 } }, { start: { line: 146, column: 10 }, end: { line: 156, column: 11 } }], line: 146 }, '25': { loc: { start: { line: 146, column: 14 }, end: { line: 146, column: 46 } }, type: 'binary-expr', locations: [{ start: { line: 146, column: 14 }, end: { line: 146, column: 28 } }, { start: { line: 146, column: 32 }, end: { line: 146, column: 46 } }], line: 146 }, '26': { loc: { start: { line: 149, column: 21 }, end: { line: 149, column: 59 } }, type: 'binary-expr', locations: [{ start: { line: 149, column: 21 }, end: { line: 149, column: 25 } }, { start: { line: 149, column: 29 }, end: { line: 149, column: 59 } }], line: 149 }, '27': { loc: { start: { line: 151, column: 12 }, end: { line: 155, column: 13 } }, type: 'if', locations: [{ start: { line: 151, column: 12 }, end: { line: 155, column: 13 } }, { start: { line: 151, column: 12 }, end: { line: 155, column: 13 } }], line: 151 }, '28': { loc: { start: { line: 152, column: 14 }, end: { line: 154, column: 15 } }, type: 'if', locations: [{ start: { line: 152, column: 14 }, end: { line: 154, column: 15 } }, { start: { line: 152, column: 14 }, end: { line: 154, column: 15 } }], line: 152 }, '29': { loc: { start: { line: 152, column: 18 }, end: { line: 152, column: 87 } }, type: 'binary-expr', locations: [{ start: { line: 152, column: 18 }, end: { line: 152, column: 45 } }, { start: { line: 152, column: 49 }, end: { line: 152, column: 87 } }], line: 152 }, '30': { loc: { start: { line: 159, column: 6 }, end: { line: 163, column: 7 } }, type: 'if', locations: [{ start: { line: 159, column: 6 }, end: { line: 163, column: 7 } }, { start: { line: 159, column: 6 }, end: { line: 163, column: 7 } }], line: 159 }, '31': { loc: { start: { line: 166, column: 8 }, end: { line: 168, column: 9 } }, type: 'if', locations: [{ start: { line: 166, column: 8 }, end: { line: 168, column: 9 } }, { start: { line: 166, column: 8 }, end: { line: 168, column: 9 } }], line: 166 }, '32': { loc: { start: { line: 166, column: 12 }, end: { line: 166, column: 37 } }, type: 'binary-expr', locations: [{ start: { line: 166, column: 12 }, end: { line: 166, column: 21 } }, { start: { line: 166, column: 25 }, end: { line: 166, column: 37 } }], line: 166 }, '33': { loc: { start: { line: 169, column: 22 }, end: { line: 169, column: 105 } }, type: 'cond-expr', locations: [{ start: { line: 169, column: 34 }, end: { line: 169, column: 99 } }, { start: { line: 169, column: 102 }, end: { line: 169, column: 105 } }], line: 169 }, '34': { loc: { start: { line: 169, column: 34 }, end: { line: 169, column: 99 } }, type: 'cond-expr', locations: [{ start: { line: 169, column: 60 }, end: { line: 169, column: 63 } }, { start: { line: 169, column: 66 }, end: { line: 169, column: 99 } }], line: 169 }, '35': { loc: { start: { line: 177, column: 6 }, end: { line: 182, column: 7 } }, type: 'if', locations: [{ start: { line: 177, column: 6 }, end: { line: 182, column: 7 } }, { start: { line: 177, column: 6 }, end: { line: 182, column: 7 } }], line: 177 }, '36': { loc: { start: { line: 178, column: 8 }, end: { line: 180, column: 9 } }, type: 'if', locations: [{ start: { line: 178, column: 8 }, end: { line: 180, column: 9 } }, { start: { line: 178, column: 8 }, end: { line: 180, column: 9 } }], line: 178 }, '37': { loc: { start: { line: 183, column: 6 }, end: { line: 201, column: 7 } }, type: 'if', locations: [{ start: { line: 183, column: 6 }, end: { line: 201, column: 7 } }, { start: { line: 183, column: 6 }, end: { line: 201, column: 7 } }], line: 183 }, '38': { loc: { start: { line: 184, column: 8 }, end: { line: 186, column: 9 } }, type: 'if', locations: [{ start: { line: 184, column: 8 }, end: { line: 186, column: 9 } }, { start: { line: 184, column: 8 }, end: { line: 186, column: 9 } }], line: 184 }, '39': { loc: { start: { line: 187, column: 8 }, end: { line: 189, column: 9 } }, type: 'if', locations: [{ start: { line: 187, column: 8 }, end: { line: 189, column: 9 } }, { start: { line: 187, column: 8 }, end: { line: 189, column: 9 } }], line: 187 }, '40': { loc: { start: { line: 190, column: 8 }, end: { line: 192, column: 9 } }, type: 'if', locations: [{ start: { line: 190, column: 8 }, end: { line: 192, column: 9 } }, { start: { line: 190, column: 8 }, end: { line: 192, column: 9 } }], line: 190 }, '41': { loc: { start: { line: 190, column: 12 }, end: { line: 190, column: 48 } }, type: 'binary-expr', locations: [{ start: { line: 190, column: 12 }, end: { line: 190, column: 30 } }, { start: { line: 190, column: 34 }, end: { line: 190, column: 48 } }], line: 190 }, '42': { loc: { start: { line: 193, column: 8 }, end: { line: 195, column: 9 } }, type: 'if', locations: [{ start: { line: 193, column: 8 }, end: { line: 195, column: 9 } }, { start: { line: 193, column: 8 }, end: { line: 195, column: 9 } }], line: 193 }, '43': { loc: { start: { line: 193, column: 12 }, end: { line: 193, column: 48 } }, type: 'binary-expr', locations: [{ start: { line: 193, column: 12 }, end: { line: 193, column: 30 } }, { start: { line: 193, column: 34 }, end: { line: 193, column: 48 } }], line: 193 }, '44': { loc: { start: { line: 196, column: 8 }, end: { line: 198, column: 9 } }, type: 'if', locations: [{ start: { line: 196, column: 8 }, end: { line: 198, column: 9 } }, { start: { line: 196, column: 8 }, end: { line: 198, column: 9 } }], line: 196 }, '45': { loc: { start: { line: 196, column: 12 }, end: { line: 196, column: 48 } }, type: 'binary-expr', locations: [{ start: { line: 196, column: 12 }, end: { line: 196, column: 30 } }, { start: { line: 196, column: 34 }, end: { line: 196, column: 48 } }], line: 196 }, '46': { loc: { start: { line: 199, column: 13 }, end: { line: 201, column: 7 } }, type: 'if', locations: [{ start: { line: 199, column: 13 }, end: { line: 201, column: 7 } }, { start: { line: 199, column: 13 }, end: { line: 201, column: 7 } }], line: 199 }, '47': { loc: { start: { line: 199, column: 18 }, end: { line: 199, column: 89 } }, type: 'cond-expr', locations: [{ start: { line: 199, column: 49 }, end: { line: 199, column: 60 } }, { start: { line: 199, column: 63 }, end: { line: 199, column: 89 } }], line: 199 }, '48': { loc: { start: { line: 222, column: 10 }, end: { line: 224, column: 11 } }, type: 'if', locations: [{ start: { line: 222, column: 10 }, end: { line: 224, column: 11 } }, { start: { line: 222, column: 10 }, end: { line: 224, column: 11 } }], line: 222 }, '49': { loc: { start: { line: 228, column: 10 }, end: { line: 232, column: 11 } }, type: 'if', locations: [{ start: { line: 228, column: 10 }, end: { line: 232, column: 11 } }, { start: { line: 228, column: 10 }, end: { line: 232, column: 11 } }], line: 228 }, '50': { loc: { start: { line: 230, column: 17 }, end: { line: 232, column: 11 } }, type: 'if', locations: [{ start: { line: 230, column: 17 }, end: { line: 232, column: 11 } }, { start: { line: 230, column: 17 }, end: { line: 232, column: 11 } }], line: 230 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0, '74': 0, '75': 0, '76': 0, '77': 0, '78': 0, '79': 0, '80': 0, '81': 0, '82': 0, '83': 0, '84': 0, '85': 0, '86': 0, '87': 0, '88': 0, '89': 0, '90': 0, '91': 0, '92': 0, '93': 0, '94': 0, '95': 0, '96': 0, '97': 0, '98': 0, '99': 0, '100': 0, '101': 0, '102': 0, '103': 0, '104': 0, '105': 0, '106': 0, '107': 0, '108': 0, '109': 0, '110': 0, '111': 0, '112': 0, '113': 0, '114': 0, '115': 0, '116': 0, '117': 0, '118': 0, '119': 0, '120': 0, '121': 0, '122': 0, '123': 0, '124': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0], '15': [0, 0], '16': [0, 0], '17': [0, 0], '18': [0, 0], '19': [0, 0], '20': [0, 0], '21': [0, 0], '22': [0, 0, 0], '23': [0, 0], '24': [0, 0], '25': [0, 0], '26': [0, 0], '27': [0, 0], '28': [0, 0], '29': [0, 0], '30': [0, 0], '31': [0, 0], '32': [0, 0], '33': [0, 0], '34': [0, 0], '35': [0, 0], '36': [0, 0], '37': [0, 0], '38': [0, 0], '39': [0, 0], '40': [0, 0], '41': [0, 0], '42': [0, 0], '43': [0, 0], '44': [0, 0], '45': [0, 0], '46': [0, 0], '47': [0, 0], '48': [0, 0], '49': [0, 0], '50': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var isArray$3 = (cov_1ac9yxw2a1.s[0]++, typeof Array.isArray === 'function' ? (cov_1ac9yxw2a1.b[0][0]++, Array.isArray) : (cov_1ac9yxw2a1.b[0][1]++, function (a) {
  cov_1ac9yxw2a1.f[0]++;cov_1ac9yxw2a1.s[1]++;return a instanceof Array;
}));var getObjectKeys = (cov_1ac9yxw2a1.s[2]++, typeof Object.keys === 'function' ? (cov_1ac9yxw2a1.b[1][0]++, function (obj) {
  cov_1ac9yxw2a1.f[1]++;cov_1ac9yxw2a1.s[3]++;return Object.keys(obj);
}) : (cov_1ac9yxw2a1.b[1][1]++, function (obj) {
  cov_1ac9yxw2a1.f[2]++;var names = (cov_1ac9yxw2a1.s[4]++, []);cov_1ac9yxw2a1.s[5]++;for (var property in obj) {
    cov_1ac9yxw2a1.s[6]++;if (Object.prototype.hasOwnProperty.call(obj, property)) {
      cov_1ac9yxw2a1.b[2][0]++;cov_1ac9yxw2a1.s[7]++;names.push(property);
    } else {
      cov_1ac9yxw2a1.b[2][1]++;
    }
  }cov_1ac9yxw2a1.s[8]++;return names;
}));cov_1ac9yxw2a1.s[9]++;var trimUnderscore = function trimUnderscore(str) {
  cov_1ac9yxw2a1.f[3]++;cov_1ac9yxw2a1.s[10]++;if (str.substr(0, 1) === '_') {
    cov_1ac9yxw2a1.b[3][0]++;cov_1ac9yxw2a1.s[11]++;return str.slice(1);
  } else {
    cov_1ac9yxw2a1.b[3][1]++;
  }cov_1ac9yxw2a1.s[12]++;return str;
};cov_1ac9yxw2a1.s[13]++;var arrayKeyToSortNumber = function arrayKeyToSortNumber(key) {
  cov_1ac9yxw2a1.f[4]++;cov_1ac9yxw2a1.s[14]++;if (key === '_t') {
    cov_1ac9yxw2a1.b[4][0]++;cov_1ac9yxw2a1.s[15]++;return -1;
  } else {
    cov_1ac9yxw2a1.b[4][1]++;cov_1ac9yxw2a1.s[16]++;if (key.substr(0, 1) === '_') {
      cov_1ac9yxw2a1.b[5][0]++;cov_1ac9yxw2a1.s[17]++;return parseInt(key.slice(1), 10);
    } else {
      cov_1ac9yxw2a1.b[5][1]++;cov_1ac9yxw2a1.s[18]++;return parseInt(key, 10) + 0.1;
    }
  }
};cov_1ac9yxw2a1.s[19]++;var arrayKeyComparer = function arrayKeyComparer(key1, key2) {
  cov_1ac9yxw2a1.f[5]++;cov_1ac9yxw2a1.s[20]++;return arrayKeyToSortNumber(key1) - arrayKeyToSortNumber(key2);
};var BaseFormatter = (cov_1ac9yxw2a1.s[21]++, function () {
  cov_1ac9yxw2a1.f[6]++;function BaseFormatter() {
    cov_1ac9yxw2a1.f[7]++;cov_1ac9yxw2a1.s[22]++;classCallCheck$1(this, BaseFormatter);
  }cov_1ac9yxw2a1.s[23]++;createClass$1(BaseFormatter, [{ key: 'format', value: function format(delta, left) {
      cov_1ac9yxw2a1.f[8]++;var context = (cov_1ac9yxw2a1.s[24]++, {});cov_1ac9yxw2a1.s[25]++;this.prepareContext(context);cov_1ac9yxw2a1.s[26]++;this.recurse(context, delta, left);cov_1ac9yxw2a1.s[27]++;return this.finalize(context);
    } }, { key: 'prepareContext', value: function prepareContext(context) {
      cov_1ac9yxw2a1.f[9]++;cov_1ac9yxw2a1.s[28]++;context.buffer = [];cov_1ac9yxw2a1.s[29]++;context.out = function () {
        cov_1ac9yxw2a1.f[10]++;var _buffer;cov_1ac9yxw2a1.s[30]++;(_buffer = this.buffer).push.apply(_buffer, arguments);
      };
    } }, { key: 'typeFormattterNotFound', value: function typeFormattterNotFound(context, deltaType) {
      cov_1ac9yxw2a1.f[11]++;cov_1ac9yxw2a1.s[31]++;throw new Error('cannot format delta type: ' + deltaType);
    } }, { key: 'typeFormattterErrorFormatter', value: function typeFormattterErrorFormatter(context, err) {
      cov_1ac9yxw2a1.f[12]++;cov_1ac9yxw2a1.s[32]++;return err.toString();
    } }, { key: 'finalize', value: function finalize(_ref) {
      cov_1ac9yxw2a1.f[13]++;var buffer = (cov_1ac9yxw2a1.s[33]++, _ref.buffer);cov_1ac9yxw2a1.s[34]++;if (isArray$3(buffer)) {
        cov_1ac9yxw2a1.b[6][0]++;cov_1ac9yxw2a1.s[35]++;return buffer.join('');
      } else {
        cov_1ac9yxw2a1.b[6][1]++;
      }
    } }, { key: 'recurse', value: function recurse(context, delta, left, key, leftKey, movedFrom, isLast) {
      cov_1ac9yxw2a1.f[14]++;var useMoveOriginHere = (cov_1ac9yxw2a1.s[36]++, (cov_1ac9yxw2a1.b[7][0]++, delta) && (cov_1ac9yxw2a1.b[7][1]++, movedFrom));var leftValue = (cov_1ac9yxw2a1.s[37]++, useMoveOriginHere ? (cov_1ac9yxw2a1.b[8][0]++, movedFrom.value) : (cov_1ac9yxw2a1.b[8][1]++, left));cov_1ac9yxw2a1.s[38]++;if ((cov_1ac9yxw2a1.b[10][0]++, typeof delta === 'undefined') && (cov_1ac9yxw2a1.b[10][1]++, typeof key === 'undefined')) {
        cov_1ac9yxw2a1.b[9][0]++;cov_1ac9yxw2a1.s[39]++;return undefined;
      } else {
        cov_1ac9yxw2a1.b[9][1]++;
      }var type = (cov_1ac9yxw2a1.s[40]++, this.getDeltaType(delta, movedFrom));var nodeType = (cov_1ac9yxw2a1.s[41]++, type === 'node' ? (cov_1ac9yxw2a1.b[11][0]++, delta._t === 'a' ? (cov_1ac9yxw2a1.b[12][0]++, 'array') : (cov_1ac9yxw2a1.b[12][1]++, 'object')) : (cov_1ac9yxw2a1.b[11][1]++, ''));cov_1ac9yxw2a1.s[42]++;if (typeof key !== 'undefined') {
        cov_1ac9yxw2a1.b[13][0]++;cov_1ac9yxw2a1.s[43]++;this.nodeBegin(context, key, leftKey, type, nodeType, isLast);
      } else {
        cov_1ac9yxw2a1.b[13][1]++;cov_1ac9yxw2a1.s[44]++;this.rootBegin(context, type, nodeType);
      }var typeFormattter = (cov_1ac9yxw2a1.s[45]++, void 0);cov_1ac9yxw2a1.s[46]++;try {
        cov_1ac9yxw2a1.s[47]++;typeFormattter = (cov_1ac9yxw2a1.b[14][0]++, this['format_' + type]) || (cov_1ac9yxw2a1.b[14][1]++, this.typeFormattterNotFound(context, type));cov_1ac9yxw2a1.s[48]++;typeFormattter.call(this, context, delta, leftValue, key, leftKey, movedFrom);
      } catch (err) {
        cov_1ac9yxw2a1.s[49]++;this.typeFormattterErrorFormatter(context, err, delta, leftValue, key, leftKey, movedFrom);cov_1ac9yxw2a1.s[50]++;if ((cov_1ac9yxw2a1.b[16][0]++, typeof console !== 'undefined') && (cov_1ac9yxw2a1.b[16][1]++, console.error)) {
          cov_1ac9yxw2a1.b[15][0]++;cov_1ac9yxw2a1.s[51]++;console.error(err.stack);
        } else {
          cov_1ac9yxw2a1.b[15][1]++;
        }
      }cov_1ac9yxw2a1.s[52]++;if (typeof key !== 'undefined') {
        cov_1ac9yxw2a1.b[17][0]++;cov_1ac9yxw2a1.s[53]++;this.nodeEnd(context, key, leftKey, type, nodeType, isLast);
      } else {
        cov_1ac9yxw2a1.b[17][1]++;cov_1ac9yxw2a1.s[54]++;this.rootEnd(context, type, nodeType);
      }
    } }, { key: 'formatDeltaChildren', value: function formatDeltaChildren(context, delta, left) {
      cov_1ac9yxw2a1.f[15]++;var self = (cov_1ac9yxw2a1.s[55]++, this);cov_1ac9yxw2a1.s[56]++;this.forEachDeltaKey(delta, left, function (key, leftKey, movedFrom, isLast) {
        cov_1ac9yxw2a1.f[16]++;cov_1ac9yxw2a1.s[57]++;self.recurse(context, delta[key], left ? (cov_1ac9yxw2a1.b[18][0]++, left[leftKey]) : (cov_1ac9yxw2a1.b[18][1]++, undefined), key, leftKey, movedFrom, isLast);
      });
    } }, { key: 'forEachDeltaKey', value: function forEachDeltaKey(delta, left, fn) {
      cov_1ac9yxw2a1.f[17]++;var keys = (cov_1ac9yxw2a1.s[58]++, getObjectKeys(delta));var arrayKeys = (cov_1ac9yxw2a1.s[59]++, delta._t === 'a');var moveDestinations = (cov_1ac9yxw2a1.s[60]++, {});var name = (cov_1ac9yxw2a1.s[61]++, void 0);cov_1ac9yxw2a1.s[62]++;if (typeof left !== 'undefined') {
        cov_1ac9yxw2a1.b[19][0]++;cov_1ac9yxw2a1.s[63]++;for (name in left) {
          cov_1ac9yxw2a1.s[64]++;if (Object.prototype.hasOwnProperty.call(left, name)) {
            cov_1ac9yxw2a1.b[20][0]++;cov_1ac9yxw2a1.s[65]++;if ((cov_1ac9yxw2a1.b[22][0]++, typeof delta[name] === 'undefined') && ((cov_1ac9yxw2a1.b[22][1]++, !arrayKeys) || (cov_1ac9yxw2a1.b[22][2]++, typeof delta['_' + name] === 'undefined'))) {
              cov_1ac9yxw2a1.b[21][0]++;cov_1ac9yxw2a1.s[66]++;keys.push(name);
            } else {
              cov_1ac9yxw2a1.b[21][1]++;
            }
          } else {
            cov_1ac9yxw2a1.b[20][1]++;
          }
        }
      } else {
        cov_1ac9yxw2a1.b[19][1]++;
      } // look for move destinations
      cov_1ac9yxw2a1.s[67]++;for (name in delta) {
        cov_1ac9yxw2a1.s[68]++;if (Object.prototype.hasOwnProperty.call(delta, name)) {
          cov_1ac9yxw2a1.b[23][0]++;var value = (cov_1ac9yxw2a1.s[69]++, delta[name]);cov_1ac9yxw2a1.s[70]++;if ((cov_1ac9yxw2a1.b[25][0]++, isArray$3(value)) && (cov_1ac9yxw2a1.b[25][1]++, value[2] === 3)) {
            cov_1ac9yxw2a1.b[24][0]++;cov_1ac9yxw2a1.s[71]++;moveDestinations[value[1].toString()] = { key: name, value: (cov_1ac9yxw2a1.b[26][0]++, left) && (cov_1ac9yxw2a1.b[26][1]++, left[parseInt(name.substr(1))]) };cov_1ac9yxw2a1.s[72]++;if (this.includeMoveDestinations !== false) {
              cov_1ac9yxw2a1.b[27][0]++;cov_1ac9yxw2a1.s[73]++;if ((cov_1ac9yxw2a1.b[29][0]++, typeof left === 'undefined') && (cov_1ac9yxw2a1.b[29][1]++, typeof delta[value[1]] === 'undefined')) {
                cov_1ac9yxw2a1.b[28][0]++;cov_1ac9yxw2a1.s[74]++;keys.push(value[1].toString());
              } else {
                cov_1ac9yxw2a1.b[28][1]++;
              }
            } else {
              cov_1ac9yxw2a1.b[27][1]++;
            }
          } else {
            cov_1ac9yxw2a1.b[24][1]++;
          }
        } else {
          cov_1ac9yxw2a1.b[23][1]++;
        }
      }cov_1ac9yxw2a1.s[75]++;if (arrayKeys) {
        cov_1ac9yxw2a1.b[30][0]++;cov_1ac9yxw2a1.s[76]++;keys.sort(arrayKeyComparer);
      } else {
        cov_1ac9yxw2a1.b[30][1]++;cov_1ac9yxw2a1.s[77]++;keys.sort();
      }cov_1ac9yxw2a1.s[78]++;for (var index = 0, length = keys.length; index < length; index++) {
        var key = (cov_1ac9yxw2a1.s[79]++, keys[index]);cov_1ac9yxw2a1.s[80]++;if ((cov_1ac9yxw2a1.b[32][0]++, arrayKeys) && (cov_1ac9yxw2a1.b[32][1]++, key === '_t')) {
          cov_1ac9yxw2a1.b[31][0]++;cov_1ac9yxw2a1.s[81]++;continue;
        } else {
          cov_1ac9yxw2a1.b[31][1]++;
        }var leftKey = (cov_1ac9yxw2a1.s[82]++, arrayKeys ? (cov_1ac9yxw2a1.b[33][0]++, typeof key === 'number' ? (cov_1ac9yxw2a1.b[34][0]++, key) : (cov_1ac9yxw2a1.b[34][1]++, parseInt(trimUnderscore(key), 10))) : (cov_1ac9yxw2a1.b[33][1]++, key));var isLast = (cov_1ac9yxw2a1.s[83]++, index === length - 1);cov_1ac9yxw2a1.s[84]++;fn(key, leftKey, moveDestinations[leftKey], isLast);
      }
    } }, { key: 'getDeltaType', value: function getDeltaType(delta, movedFrom) {
      cov_1ac9yxw2a1.f[18]++;cov_1ac9yxw2a1.s[85]++;if (typeof delta === 'undefined') {
        cov_1ac9yxw2a1.b[35][0]++;cov_1ac9yxw2a1.s[86]++;if (typeof movedFrom !== 'undefined') {
          cov_1ac9yxw2a1.b[36][0]++;cov_1ac9yxw2a1.s[87]++;return 'movedestination';
        } else {
          cov_1ac9yxw2a1.b[36][1]++;
        }cov_1ac9yxw2a1.s[88]++;return 'unchanged';
      } else {
        cov_1ac9yxw2a1.b[35][1]++;
      }cov_1ac9yxw2a1.s[89]++;if (isArray$3(delta)) {
        cov_1ac9yxw2a1.b[37][0]++;cov_1ac9yxw2a1.s[90]++;if (delta.length === 1) {
          cov_1ac9yxw2a1.b[38][0]++;cov_1ac9yxw2a1.s[91]++;return 'added';
        } else {
          cov_1ac9yxw2a1.b[38][1]++;
        }cov_1ac9yxw2a1.s[92]++;if (delta.length === 2) {
          cov_1ac9yxw2a1.b[39][0]++;cov_1ac9yxw2a1.s[93]++;return 'modified';
        } else {
          cov_1ac9yxw2a1.b[39][1]++;
        }cov_1ac9yxw2a1.s[94]++;if ((cov_1ac9yxw2a1.b[41][0]++, delta.length === 3) && (cov_1ac9yxw2a1.b[41][1]++, delta[2] === 0)) {
          cov_1ac9yxw2a1.b[40][0]++;cov_1ac9yxw2a1.s[95]++;return 'deleted';
        } else {
          cov_1ac9yxw2a1.b[40][1]++;
        }cov_1ac9yxw2a1.s[96]++;if ((cov_1ac9yxw2a1.b[43][0]++, delta.length === 3) && (cov_1ac9yxw2a1.b[43][1]++, delta[2] === 2)) {
          cov_1ac9yxw2a1.b[42][0]++;cov_1ac9yxw2a1.s[97]++;return 'textdiff';
        } else {
          cov_1ac9yxw2a1.b[42][1]++;
        }cov_1ac9yxw2a1.s[98]++;if ((cov_1ac9yxw2a1.b[45][0]++, delta.length === 3) && (cov_1ac9yxw2a1.b[45][1]++, delta[2] === 3)) {
          cov_1ac9yxw2a1.b[44][0]++;cov_1ac9yxw2a1.s[99]++;return 'moved';
        } else {
          cov_1ac9yxw2a1.b[44][1]++;
        }
      } else {
        cov_1ac9yxw2a1.b[37][1]++;cov_1ac9yxw2a1.s[100]++;if ((typeof delta === 'undefined' ? (cov_1ac9yxw2a1.b[47][0]++, 'undefined') : (cov_1ac9yxw2a1.b[47][1]++, _typeof$1(delta))) === 'object') {
          cov_1ac9yxw2a1.b[46][0]++;cov_1ac9yxw2a1.s[101]++;return 'node';
        } else {
          cov_1ac9yxw2a1.b[46][1]++;
        }
      }cov_1ac9yxw2a1.s[102]++;return 'unknown';
    } }, { key: 'parseTextDiff', value: function parseTextDiff(value) {
      cov_1ac9yxw2a1.f[19]++;var output = (cov_1ac9yxw2a1.s[103]++, []);var lines = (cov_1ac9yxw2a1.s[104]++, value.split('\n@@ '));cov_1ac9yxw2a1.s[105]++;for (var i = 0, l = lines.length; i < l; i++) {
        var line = (cov_1ac9yxw2a1.s[106]++, lines[i]);var lineOutput = (cov_1ac9yxw2a1.s[107]++, { pieces: [] });var location = (cov_1ac9yxw2a1.s[108]++, /^(?:@@ )?[-+]?(\d+),(\d+)/.exec(line).slice(1));cov_1ac9yxw2a1.s[109]++;lineOutput.location = { line: location[0], chr: location[1] };var pieces = (cov_1ac9yxw2a1.s[110]++, line.split('\n').slice(1));cov_1ac9yxw2a1.s[111]++;for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = (cov_1ac9yxw2a1.s[112]++, pieces[pieceIndex]);cov_1ac9yxw2a1.s[113]++;if (!piece.length) {
            cov_1ac9yxw2a1.b[48][0]++;cov_1ac9yxw2a1.s[114]++;continue;
          } else {
            cov_1ac9yxw2a1.b[48][1]++;
          }var pieceOutput = (cov_1ac9yxw2a1.s[115]++, { type: 'context' });cov_1ac9yxw2a1.s[116]++;if (piece.substr(0, 1) === '+') {
            cov_1ac9yxw2a1.b[49][0]++;cov_1ac9yxw2a1.s[117]++;pieceOutput.type = 'added';
          } else {
            cov_1ac9yxw2a1.b[49][1]++;cov_1ac9yxw2a1.s[118]++;if (piece.substr(0, 1) === '-') {
              cov_1ac9yxw2a1.b[50][0]++;cov_1ac9yxw2a1.s[119]++;pieceOutput.type = 'deleted';
            } else {
              cov_1ac9yxw2a1.b[50][1]++;
            }
          }cov_1ac9yxw2a1.s[120]++;pieceOutput.text = piece.slice(1);cov_1ac9yxw2a1.s[121]++;lineOutput.pieces.push(pieceOutput);
        }cov_1ac9yxw2a1.s[122]++;output.push(lineOutput);
      }cov_1ac9yxw2a1.s[123]++;return output;
    } }]);cov_1ac9yxw2a1.s[124]++;return BaseFormatter;
}());

var base = Object.freeze({
  default: BaseFormatter
});

var cov_273kjaqpct = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/formatters/html.js',
      hash = '63dce5e0e502012449d5dd59da2c9dad1f59955d',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/formatters/html.js', statementMap: { '0': { start: { line: 3, column: 20 }, end: { line: 139, column: 16 } }, '1': { start: { line: 4, column: 2 }, end: { line: 4, column: 55 } }, '2': { start: { line: 7, column: 4 }, end: { line: 7, column: 53 } }, '3': { start: { line: 8, column: 4 }, end: { line: 8, column: 146 } }, '4': { start: { line: 11, column: 2 }, end: { line: 137, column: 6 } }, '5': { start: { line: 14, column: 6 }, end: { line: 14, column: 72 } }, '6': { start: { line: 19, column: 6 }, end: { line: 19, column: 83 } }, '7': { start: { line: 24, column: 18 }, end: { line: 24, column: 43 } }, '8': { start: { line: 25, column: 6 }, end: { line: 25, column: 57 } }, '9': { start: { line: 26, column: 6 }, end: { line: 36, column: 7 } }, '10': { start: { line: 27, column: 19 }, end: { line: 27, column: 27 } }, '11': { start: { line: 28, column: 8 }, end: { line: 28, column: 283 } }, '12': { start: { line: 29, column: 21 }, end: { line: 29, column: 32 } }, '13': { start: { line: 30, column: 8 }, end: { line: 34, column: 9 } }, '14': { start: { line: 32, column: 22 }, end: { line: 32, column: 40 } }, '15': { start: { line: 33, column: 10 }, end: { line: 33, column: 130 } }, '16': { start: { line: 35, column: 8 }, end: { line: 35, column: 35 } }, '17': { start: { line: 37, column: 6 }, end: { line: 37, column: 27 } }, '18': { start: { line: 42, column: 22 }, end: { line: 42, column: 110 } }, '19': { start: { line: 43, column: 6 }, end: { line: 43, column: 73 } }, '20': { start: { line: 48, column: 6 }, end: { line: 48, column: 149 } }, '21': { start: { line: 53, column: 22 }, end: { line: 53, column: 110 } }, '22': { start: { line: 54, column: 6 }, end: { line: 54, column: 148 } }, '23': { start: { line: 59, column: 6 }, end: { line: 59, column: 27 } }, '24': { start: { line: 68, column: 6 }, end: { line: 70, column: 7 } }, '25': { start: { line: 69, column: 8 }, end: { line: 69, column: 15 } }, '26': { start: { line: 71, column: 6 }, end: { line: 71, column: 55 } }, '27': { start: { line: 72, column: 6 }, end: { line: 72, column: 38 } }, '28': { start: { line: 73, column: 6 }, end: { line: 73, column: 28 } }, '29': { start: { line: 78, column: 6 }, end: { line: 80, column: 7 } }, '30': { start: { line: 79, column: 8 }, end: { line: 79, column: 15 } }, '31': { start: { line: 81, column: 6 }, end: { line: 81, column: 55 } }, '32': { start: { line: 82, column: 6 }, end: { line: 82, column: 38 } }, '33': { start: { line: 83, column: 6 }, end: { line: 83, column: 28 } }, '34': { start: { line: 89, column: 21 }, end: { line: 89, column: 58 } }, '35': { start: { line: 90, column: 6 }, end: { line: 90, column: 94 } }, '36': { start: { line: 91, column: 6 }, end: { line: 91, column: 53 } }, '37': { start: { line: 92, column: 6 }, end: { line: 92, column: 27 } }, '38': { start: { line: 97, column: 6 }, end: { line: 97, column: 55 } }, '39': { start: { line: 98, column: 6 }, end: { line: 98, column: 42 } }, '40': { start: { line: 99, column: 6 }, end: { line: 99, column: 28 } }, '41': { start: { line: 104, column: 6 }, end: { line: 104, column: 80 } }, '42': { start: { line: 105, column: 6 }, end: { line: 105, column: 42 } }, '43': { start: { line: 106, column: 6 }, end: { line: 106, column: 92 } }, '44': { start: { line: 107, column: 6 }, end: { line: 107, column: 42 } }, '45': { start: { line: 108, column: 6 }, end: { line: 108, column: 28 } }, '46': { start: { line: 113, column: 6 }, end: { line: 113, column: 55 } }, '47': { start: { line: 114, column: 6 }, end: { line: 114, column: 42 } }, '48': { start: { line: 115, column: 6 }, end: { line: 115, column: 28 } }, '49': { start: { line: 120, column: 6 }, end: { line: 120, column: 55 } }, '50': { start: { line: 121, column: 6 }, end: { line: 121, column: 42 } }, '51': { start: { line: 122, column: 6 }, end: { line: 122, column: 95 } }, '52': { start: { line: 125, column: 6 }, end: { line: 127, column: 702 } }, '53': { start: { line: 128, column: 6 }, end: { line: 128, column: 31 } }, '54': { start: { line: 133, column: 6 }, end: { line: 133, column: 55 } }, '55': { start: { line: 134, column: 6 }, end: { line: 134, column: 51 } }, '56': { start: { line: 135, column: 6 }, end: { line: 135, column: 28 } }, '57': { start: { line: 138, column: 2 }, end: { line: 138, column: 23 } }, '58': { start: { line: 142, column: 13 }, end: { line: 142, column: 17 } }, '59': { start: { line: 143, column: 21 }, end: { line: 143, column: 106 } }, '60': { start: { line: 144, column: 2 }, end: { line: 146, column: 3 } }, '61': { start: { line: 145, column: 4 }, end: { line: 145, column: 64 } }, '62': { start: { line: 147, column: 2 }, end: { line: 147, column: 14 } }, '63': { start: { line: 150, column: 19 }, end: { line: 199, column: 1 } }, '64': { start: { line: 151, column: 13 }, end: { line: 151, column: 32 } }, '65': { start: { line: 152, column: 23 }, end: { line: 156, column: 3 } }, '66': { start: { line: 153, column: 22 }, end: { line: 153, column: 38 } }, '67': { start: { line: 154, column: 20 }, end: { line: 154, column: 34 } }, '68': { start: { line: 155, column: 4 }, end: { line: 155, column: 36 } }, '69': { start: { line: 157, column: 20 }, end: { line: 162, column: 3 } }, '70': { start: { line: 158, column: 16 }, end: { line: 158, column: 42 } }, '71': { start: { line: 159, column: 4 }, end: { line: 161, column: 5 } }, '72': { start: { line: 160, column: 6 }, end: { line: 160, column: 19 } }, '73': { start: { line: 163, column: 21 }, end: { line: 169, column: 3 } }, '74': { start: { line: 164, column: 19 }, end: { line: 164, column: 33 } }, '75': { start: { line: 166, column: 4 }, end: { line: 168, column: 5 } }, '76': { start: { line: 167, column: 6 }, end: { line: 167, column: 25 } }, '77': { start: { line: 170, column: 2 }, end: { line: 198, column: 5 } }, '78': { start: { line: 171, column: 21 }, end: { line: 171, column: 37 } }, '79': { start: { line: 172, column: 19 }, end: { line: 172, column: 33 } }, '80': { start: { line: 173, column: 16 }, end: { line: 173, column: 27 } }, '81': { start: { line: 175, column: 22 }, end: { line: 175, column: 32 } }, '82': { start: { line: 176, column: 14 }, end: { line: 176, column: 25 } }, '83': { start: { line: 177, column: 15 }, end: { line: 177, column: 30 } }, '84': { start: { line: 178, column: 4 }, end: { line: 178, column: 31 } }, '85': { start: { line: 179, column: 22 }, end: { line: 179, column: 99 } }, '86': { start: { line: 180, column: 20 }, end: { line: 180, column: 42 } }, '87': { start: { line: 181, column: 26 }, end: { line: 181, column: 32 } }, '88': { start: { line: 182, column: 4 }, end: { line: 186, column: 7 } }, '89': { start: { line: 183, column: 6 }, end: { line: 185, column: 7 } }, '90': { start: { line: 184, column: 8 }, end: { line: 184, column: 32 } }, '91': { start: { line: 187, column: 4 }, end: { line: 189, column: 5 } }, '92': { start: { line: 188, column: 6 }, end: { line: 188, column: 13 } }, '93': { start: { line: 190, column: 4 }, end: { line: 197, column: 20 } }, '94': { start: { line: 191, column: 21 }, end: { line: 191, column: 70 } }, '95': { start: { line: 192, column: 6 }, end: { line: 192, column: 57 } }, '96': { start: { line: 193, column: 6 }, end: { line: 193, column: 60 } }, '97': { start: { line: 194, column: 18 }, end: { line: 194, column: 169 } }, '98': { start: { line: 195, column: 6 }, end: { line: 195, column: 36 } }, '99': { start: { line: 196, column: 6 }, end: { line: 196, column: 29 } }, '100': { start: { line: 204, column: 27 }, end: { line: 256, column: 1 } }, '101': { start: { line: 205, column: 11 }, end: { line: 205, column: 32 } }, '102': { start: { line: 206, column: 15 }, end: { line: 206, column: 41 } }, '103': { start: { line: 207, column: 16 }, end: { line: 212, column: 3 } }, '104': { start: { line: 213, column: 13 }, end: { line: 213, column: 25 } }, '105': { start: { line: 214, column: 2 }, end: { line: 216, column: 3 } }, '106': { start: { line: 215, column: 4 }, end: { line: 215, column: 11 } }, '107': { start: { line: 217, column: 2 }, end: { line: 226, column: 3 } }, '108': { start: { line: 218, column: 4 }, end: { line: 218, column: 33 } }, '109': { start: { line: 219, column: 4 }, end: { line: 219, column: 32 } }, '110': { start: { line: 220, column: 4 }, end: { line: 220, column: 33 } }, '111': { start: { line: 221, column: 4 }, end: { line: 221, column: 32 } }, '112': { start: { line: 222, column: 4 }, end: { line: 224, column: 5 } }, '113': { start: { line: 223, column: 6 }, end: { line: 223, column: 31 } }, '114': { start: { line: 225, column: 4 }, end: { line: 225, column: 11 } }, '115': { start: { line: 227, column: 2 }, end: { line: 237, column: 3 } }, '116': { start: { line: 228, column: 4 }, end: { line: 228, column: 33 } }, '117': { start: { line: 229, column: 4 }, end: { line: 229, column: 30 } }, '118': { start: { line: 230, column: 4 }, end: { line: 232, column: 11 } }, '119': { start: { line: 231, column: 6 }, end: { line: 231, column: 31 } }, '120': { start: { line: 234, column: 4 }, end: { line: 234, column: 32 } }, '121': { start: { line: 235, column: 4 }, end: { line: 235, column: 30 } }, '122': { start: { line: 236, column: 4 }, end: { line: 236, column: 32 } }, '123': { start: { line: 238, column: 19 }, end: { line: 240, column: 9 } }, '124': { start: { line: 239, column: 4 }, end: { line: 239, column: 21 } }, '125': { start: { line: 241, column: 2 }, end: { line: 255, column: 12 } }, '126': { start: { line: 242, column: 4 }, end: { line: 242, column: 33 } }, '127': { start: { line: 243, column: 4 }, end: { line: 243, column: 32 } }, '128': { start: { line: 244, column: 4 }, end: { line: 250, column: 5 } }, '129': { start: { line: 245, column: 6 }, end: { line: 245, column: 31 } }, '130': { start: { line: 246, column: 6 }, end: { line: 246, column: 35 } }, '131': { start: { line: 248, column: 6 }, end: { line: 248, column: 32 } }, '132': { start: { line: 249, column: 6 }, end: { line: 249, column: 34 } }, '133': { start: { line: 251, column: 4 }, end: { line: 254, column: 20 } }, '134': { start: { line: 252, column: 6 }, end: { line: 252, column: 35 } }, '135': { start: { line: 253, column: 6 }, end: { line: 253, column: 32 } }, '136': { start: { line: 258, column: 27 }, end: { line: 260, column: 1 } }, '137': { start: { line: 259, column: 2 }, end: { line: 259, column: 43 } }, '138': { start: { line: 264, column: 22 }, end: { line: 264, column: 28 } }, '139': { start: { line: 267, column: 2 }, end: { line: 269, column: 3 } }, '140': { start: { line: 268, column: 4 }, end: { line: 268, column: 42 } }, '141': { start: { line: 270, column: 2 }, end: { line: 270, column: 45 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 3, column: 20 }, end: { line: 3, column: 21 } }, loc: { start: { line: 3, column: 46 }, end: { line: 139, column: 1 } }, line: 3 }, '1': { name: 'HtmlFormatter', decl: { start: { line: 6, column: 11 }, end: { line: 6, column: 24 } }, loc: { start: { line: 6, column: 27 }, end: { line: 9, column: 3 } }, line: 6 }, '2': { name: 'typeFormattterErrorFormatter', decl: { start: { line: 13, column: 20 }, end: { line: 13, column: 48 } }, loc: { start: { line: 13, column: 63 }, end: { line: 15, column: 5 } }, line: 13 }, '3': { name: 'formatValue', decl: { start: { line: 18, column: 20 }, end: { line: 18, column: 31 } }, loc: { start: { line: 18, column: 48 }, end: { line: 20, column: 5 } }, line: 18 }, '4': { name: 'formatTextDiffString', decl: { start: { line: 23, column: 20 }, end: { line: 23, column: 40 } }, loc: { start: { line: 23, column: 57 }, end: { line: 38, column: 5 } }, line: 23 }, '5': { name: 'rootBegin', decl: { start: { line: 41, column: 20 }, end: { line: 41, column: 29 } }, loc: { start: { line: 41, column: 55 }, end: { line: 44, column: 5 } }, line: 41 }, '6': { name: 'rootEnd', decl: { start: { line: 47, column: 20 }, end: { line: 47, column: 27 } }, loc: { start: { line: 47, column: 37 }, end: { line: 49, column: 5 } }, line: 47 }, '7': { name: 'nodeBegin', decl: { start: { line: 52, column: 20 }, end: { line: 52, column: 29 } }, loc: { start: { line: 52, column: 69 }, end: { line: 55, column: 5 } }, line: 52 }, '8': { name: 'nodeEnd', decl: { start: { line: 58, column: 20 }, end: { line: 58, column: 27 } }, loc: { start: { line: 58, column: 37 }, end: { line: 60, column: 5 } }, line: 58 }, '9': { name: 'format_unchanged', decl: { start: { line: 67, column: 20 }, end: { line: 67, column: 36 } }, loc: { start: { line: 67, column: 59 }, end: { line: 74, column: 5 } }, line: 67 }, '10': { name: 'format_movedestination', decl: { start: { line: 77, column: 20 }, end: { line: 77, column: 42 } }, loc: { start: { line: 77, column: 65 }, end: { line: 84, column: 5 } }, line: 77 }, '11': { name: 'format_node', decl: { start: { line: 87, column: 20 }, end: { line: 87, column: 31 } }, loc: { start: { line: 87, column: 54 }, end: { line: 93, column: 5 } }, line: 87 }, '12': { name: 'format_added', decl: { start: { line: 96, column: 20 }, end: { line: 96, column: 32 } }, loc: { start: { line: 96, column: 49 }, end: { line: 100, column: 5 } }, line: 96 }, '13': { name: 'format_modified', decl: { start: { line: 103, column: 20 }, end: { line: 103, column: 35 } }, loc: { start: { line: 103, column: 52 }, end: { line: 109, column: 5 } }, line: 103 }, '14': { name: 'format_deleted', decl: { start: { line: 112, column: 20 }, end: { line: 112, column: 34 } }, loc: { start: { line: 112, column: 51 }, end: { line: 116, column: 5 } }, line: 112 }, '15': { name: 'format_moved', decl: { start: { line: 119, column: 20 }, end: { line: 119, column: 32 } }, loc: { start: { line: 119, column: 49 }, end: { line: 129, column: 5 } }, line: 119 }, '16': { name: 'format_textdiff', decl: { start: { line: 132, column: 20 }, end: { line: 132, column: 35 } }, loc: { start: { line: 132, column: 52 }, end: { line: 136, column: 5 } }, line: 132 }, '17': { name: 'htmlEscape', decl: { start: { line: 141, column: 9 }, end: { line: 141, column: 19 } }, loc: { start: { line: 141, column: 26 }, end: { line: 148, column: 1 } }, line: 141 }, '18': { name: 'jsondiffpatchHtmlFormatterAdjustArrows', decl: { start: { line: 150, column: 28 }, end: { line: 150, column: 66 } }, loc: { start: { line: 150, column: 76 }, end: { line: 199, column: 1 } }, line: 150 }, '19': { name: 'getElementText', decl: { start: { line: 152, column: 32 }, end: { line: 152, column: 46 } }, loc: { start: { line: 152, column: 53 }, end: { line: 156, column: 3 } }, line: 152 }, '20': { name: 'eachByQuery', decl: { start: { line: 157, column: 29 }, end: { line: 157, column: 40 } }, loc: { start: { line: 157, column: 56 }, end: { line: 162, column: 3 } }, line: 157 }, '21': { name: 'eachChildren', decl: { start: { line: 163, column: 30 }, end: { line: 163, column: 42 } }, loc: { start: { line: 163, column: 54 }, end: { line: 169, column: 3 } }, line: 163 }, '22': { name: '(anonymous_22)', decl: { start: { line: 170, column: 44 }, end: { line: 170, column: 45 } }, loc: { start: { line: 170, column: 61 }, end: { line: 198, column: 3 } }, line: 170 }, '23': { name: '(anonymous_23)', decl: { start: { line: 182, column: 28 }, end: { line: 182, column: 29 } }, loc: { start: { line: 182, column: 45 }, end: { line: 186, column: 5 } }, line: 182 }, '24': { name: 'showUnchanged', decl: { start: { line: 204, column: 36 }, end: { line: 204, column: 49 } }, loc: { start: { line: 204, column: 69 }, end: { line: 256, column: 1 } }, line: 204 }, '25': { name: '(anonymous_25)', decl: { start: { line: 230, column: 15 }, end: { line: 230, column: 16 } }, loc: { start: { line: 230, column: 27 }, end: { line: 232, column: 5 } }, line: 230 }, '26': { name: '(anonymous_26)', decl: { start: { line: 238, column: 31 }, end: { line: 238, column: 32 } }, loc: { start: { line: 238, column: 43 }, end: { line: 240, column: 3 } }, line: 238 }, '27': { name: '(anonymous_27)', decl: { start: { line: 241, column: 13 }, end: { line: 241, column: 14 } }, loc: { start: { line: 241, column: 25 }, end: { line: 255, column: 3 } }, line: 241 }, '28': { name: '(anonymous_28)', decl: { start: { line: 251, column: 15 }, end: { line: 251, column: 16 } }, loc: { start: { line: 251, column: 27 }, end: { line: 254, column: 5 } }, line: 251 }, '29': { name: 'hideUnchanged', decl: { start: { line: 258, column: 36 }, end: { line: 258, column: 49 } }, loc: { start: { line: 258, column: 63 }, end: { line: 260, column: 1 } }, line: 258 }, '30': { name: 'format', decl: { start: { line: 266, column: 16 }, end: { line: 266, column: 22 } }, loc: { start: { line: 266, column: 36 }, end: { line: 271, column: 1 } }, line: 266 } }, branchMap: { '0': { loc: { start: { line: 8, column: 57 }, end: { line: 8, column: 120 } }, type: 'binary-expr', locations: [{ start: { line: 8, column: 57 }, end: { line: 8, column: 80 } }, { start: { line: 8, column: 84 }, end: { line: 8, column: 120 } }], line: 8 }, '1': { loc: { start: { line: 42, column: 49 }, end: { line: 42, column: 109 } }, type: 'cond-expr', locations: [{ start: { line: 42, column: 60 }, end: { line: 42, column: 104 } }, { start: { line: 42, column: 107 }, end: { line: 42, column: 109 } }], line: 42 }, '2': { loc: { start: { line: 48, column: 30 }, end: { line: 48, column: 146 } }, type: 'cond-expr', locations: [{ start: { line: 48, column: 50 }, end: { line: 48, column: 141 } }, { start: { line: 48, column: 144 }, end: { line: 48, column: 146 } }], line: 48 }, '3': { loc: { start: { line: 53, column: 49 }, end: { line: 53, column: 109 } }, type: 'cond-expr', locations: [{ start: { line: 53, column: 60 }, end: { line: 53, column: 104 } }, { start: { line: 53, column: 107 }, end: { line: 53, column: 109 } }], line: 53 }, '4': { loc: { start: { line: 68, column: 6 }, end: { line: 70, column: 7 } }, type: 'if', locations: [{ start: { line: 68, column: 6 }, end: { line: 70, column: 7 } }, { start: { line: 68, column: 6 }, end: { line: 70, column: 7 } }], line: 68 }, '5': { loc: { start: { line: 78, column: 6 }, end: { line: 80, column: 7 } }, type: 'if', locations: [{ start: { line: 78, column: 6 }, end: { line: 80, column: 7 } }, { start: { line: 78, column: 6 }, end: { line: 80, column: 7 } }], line: 78 }, '6': { loc: { start: { line: 89, column: 21 }, end: { line: 89, column: 58 } }, type: 'cond-expr', locations: [{ start: { line: 89, column: 40 }, end: { line: 89, column: 47 } }, { start: { line: 89, column: 50 }, end: { line: 89, column: 58 } }], line: 89 }, '7': { loc: { start: { line: 151, column: 13 }, end: { line: 151, column: 32 } }, type: 'binary-expr', locations: [{ start: { line: 151, column: 13 }, end: { line: 151, column: 20 } }, { start: { line: 151, column: 24 }, end: { line: 151, column: 32 } }], line: 151 }, '8': { loc: { start: { line: 155, column: 11 }, end: { line: 155, column: 35 } }, type: 'binary-expr', locations: [{ start: { line: 155, column: 11 }, end: { line: 155, column: 22 } }, { start: { line: 155, column: 26 }, end: { line: 155, column: 35 } }], line: 155 }, '9': { loc: { start: { line: 183, column: 6 }, end: { line: 185, column: 7 } }, type: 'if', locations: [{ start: { line: 183, column: 6 }, end: { line: 185, column: 7 } }, { start: { line: 183, column: 6 }, end: { line: 185, column: 7 } }], line: 183 }, '10': { loc: { start: { line: 187, column: 4 }, end: { line: 189, column: 5 } }, type: 'if', locations: [{ start: { line: 187, column: 4 }, end: { line: 189, column: 5 } }, { start: { line: 187, column: 4 }, end: { line: 189, column: 5 } }], line: 187 }, '11': { loc: { start: { line: 193, column: 24 }, end: { line: 193, column: 51 } }, type: 'cond-expr', locations: [{ start: { line: 193, column: 39 }, end: { line: 193, column: 40 } }, { start: { line: 193, column: 43 }, end: { line: 193, column: 51 } }], line: 193 }, '12': { loc: { start: { line: 194, column: 18 }, end: { line: 194, column: 169 } }, type: 'cond-expr', locations: [{ start: { line: 194, column: 33 }, end: { line: 194, column: 99 } }, { start: { line: 194, column: 102 }, end: { line: 194, column: 169 } }], line: 194 }, '13': { loc: { start: { line: 205, column: 11 }, end: { line: 205, column: 32 } }, type: 'binary-expr', locations: [{ start: { line: 205, column: 11 }, end: { line: 205, column: 15 } }, { start: { line: 205, column: 19 }, end: { line: 205, column: 32 } }], line: 205 }, '14': { loc: { start: { line: 214, column: 2 }, end: { line: 216, column: 3 } }, type: 'if', locations: [{ start: { line: 214, column: 2 }, end: { line: 216, column: 3 } }, { start: { line: 214, column: 2 }, end: { line: 216, column: 3 } }], line: 214 }, '15': { loc: { start: { line: 217, column: 2 }, end: { line: 226, column: 3 } }, type: 'if', locations: [{ start: { line: 217, column: 2 }, end: { line: 226, column: 3 } }, { start: { line: 217, column: 2 }, end: { line: 226, column: 3 } }], line: 217 }, '16': { loc: { start: { line: 222, column: 4 }, end: { line: 224, column: 5 } }, type: 'if', locations: [{ start: { line: 222, column: 4 }, end: { line: 224, column: 5 } }, { start: { line: 222, column: 4 }, end: { line: 224, column: 5 } }], line: 222 }, '17': { loc: { start: { line: 227, column: 2 }, end: { line: 237, column: 3 } }, type: 'if', locations: [{ start: { line: 227, column: 2 }, end: { line: 237, column: 3 } }, { start: { line: 227, column: 2 }, end: { line: 237, column: 3 } }], line: 227 }, '18': { loc: { start: { line: 244, column: 4 }, end: { line: 250, column: 5 } }, type: 'if', locations: [{ start: { line: 244, column: 4 }, end: { line: 250, column: 5 } }, { start: { line: 244, column: 4 }, end: { line: 250, column: 5 } }], line: 244 }, '19': { loc: { start: { line: 267, column: 2 }, end: { line: 269, column: 3 } }, type: 'if', locations: [{ start: { line: 267, column: 2 }, end: { line: 269, column: 3 } }, { start: { line: 267, column: 2 }, end: { line: 269, column: 3 } }], line: 267 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0, '74': 0, '75': 0, '76': 0, '77': 0, '78': 0, '79': 0, '80': 0, '81': 0, '82': 0, '83': 0, '84': 0, '85': 0, '86': 0, '87': 0, '88': 0, '89': 0, '90': 0, '91': 0, '92': 0, '93': 0, '94': 0, '95': 0, '96': 0, '97': 0, '98': 0, '99': 0, '100': 0, '101': 0, '102': 0, '103': 0, '104': 0, '105': 0, '106': 0, '107': 0, '108': 0, '109': 0, '110': 0, '111': 0, '112': 0, '113': 0, '114': 0, '115': 0, '116': 0, '117': 0, '118': 0, '119': 0, '120': 0, '121': 0, '122': 0, '123': 0, '124': 0, '125': 0, '126': 0, '127': 0, '128': 0, '129': 0, '130': 0, '131': 0, '132': 0, '133': 0, '134': 0, '135': 0, '136': 0, '137': 0, '138': 0, '139': 0, '140': 0, '141': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0], '15': [0, 0], '16': [0, 0], '17': [0, 0], '18': [0, 0], '19': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var HtmlFormatter = (cov_273kjaqpct.s[0]++, function (_BaseFormatter) {
  cov_273kjaqpct.f[0]++;cov_273kjaqpct.s[1]++;inherits$1(HtmlFormatter, _BaseFormatter);function HtmlFormatter() {
    cov_273kjaqpct.f[1]++;cov_273kjaqpct.s[2]++;classCallCheck$1(this, HtmlFormatter);cov_273kjaqpct.s[3]++;return possibleConstructorReturn$1(this, ((cov_273kjaqpct.b[0][0]++, HtmlFormatter.__proto__) || (cov_273kjaqpct.b[0][1]++, Object.getPrototypeOf(HtmlFormatter))).apply(this, arguments));
  }cov_273kjaqpct.s[4]++;createClass$1(HtmlFormatter, [{ key: 'typeFormattterErrorFormatter', value: function typeFormattterErrorFormatter(context, err) {
      cov_273kjaqpct.f[2]++;cov_273kjaqpct.s[5]++;context.out('<pre class="jsondiffpatch-error">' + err + '</pre>');
    } }, { key: 'formatValue', value: function formatValue(context, value) {
      cov_273kjaqpct.f[3]++;cov_273kjaqpct.s[6]++;context.out('<pre>' + htmlEscape(JSON.stringify(value, null, 2)) + '</pre>');
    } }, { key: 'formatTextDiffString', value: function formatTextDiffString(context, value) {
      cov_273kjaqpct.f[4]++;var lines = (cov_273kjaqpct.s[7]++, this.parseTextDiff(value));cov_273kjaqpct.s[8]++;context.out('<ul class="jsondiffpatch-textdiff">');cov_273kjaqpct.s[9]++;for (var i = 0, l = lines.length; i < l; i++) {
        var line = (cov_273kjaqpct.s[10]++, lines[i]);cov_273kjaqpct.s[11]++;context.out('<li><div class="jsondiffpatch-textdiff-location">' + ('<span class="jsondiffpatch-textdiff-line-number">' + line.location.line + '</span><span class="jsondiffpatch-textdiff-char">' + line.location.chr + '</span></div><div class="jsondiffpatch-textdiff-line">'));var pieces = (cov_273kjaqpct.s[12]++, line.pieces);cov_273kjaqpct.s[13]++;for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          /* global decodeURI */var piece = (cov_273kjaqpct.s[14]++, pieces[pieceIndex]);cov_273kjaqpct.s[15]++;context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' + htmlEscape(decodeURI(piece.text)) + '</span>');
        }cov_273kjaqpct.s[16]++;context.out('</div></li>');
      }cov_273kjaqpct.s[17]++;context.out('</ul>');
    } }, { key: 'rootBegin', value: function rootBegin(context, type, nodeType) {
      cov_273kjaqpct.f[5]++;var nodeClass = (cov_273kjaqpct.s[18]++, 'jsondiffpatch-' + type + (nodeType ? (cov_273kjaqpct.b[1][0]++, ' jsondiffpatch-child-node-type-' + nodeType) : (cov_273kjaqpct.b[1][1]++, '')));cov_273kjaqpct.s[19]++;context.out('<div class="jsondiffpatch-delta ' + nodeClass + '">');
    } }, { key: 'rootEnd', value: function rootEnd(context) {
      cov_273kjaqpct.f[6]++;cov_273kjaqpct.s[20]++;context.out('</div>' + (context.hasArrows ? (cov_273kjaqpct.b[2][0]++, '<script type="text/javascript">setTimeout(' + (adjustArrows.toString() + ',10);</script>')) : (cov_273kjaqpct.b[2][1]++, '')));
    } }, { key: 'nodeBegin', value: function nodeBegin(context, key, leftKey, type, nodeType) {
      cov_273kjaqpct.f[7]++;var nodeClass = (cov_273kjaqpct.s[21]++, 'jsondiffpatch-' + type + (nodeType ? (cov_273kjaqpct.b[3][0]++, ' jsondiffpatch-child-node-type-' + nodeType) : (cov_273kjaqpct.b[3][1]++, '')));cov_273kjaqpct.s[22]++;context.out('<li class="' + nodeClass + '" data-key="' + leftKey + '">' + ('<div class="jsondiffpatch-property-name">' + leftKey + '</div>'));
    } }, { key: 'nodeEnd', value: function nodeEnd(context) {
      cov_273kjaqpct.f[8]++;cov_273kjaqpct.s[23]++;context.out('</li>');
    } /* jshint camelcase: false */ /* eslint-disable camelcase */ }, { key: 'format_unchanged', value: function format_unchanged(context, delta, left) {
      cov_273kjaqpct.f[9]++;cov_273kjaqpct.s[24]++;if (typeof left === 'undefined') {
        cov_273kjaqpct.b[4][0]++;cov_273kjaqpct.s[25]++;return;
      } else {
        cov_273kjaqpct.b[4][1]++;
      }cov_273kjaqpct.s[26]++;context.out('<div class="jsondiffpatch-value">');cov_273kjaqpct.s[27]++;this.formatValue(context, left);cov_273kjaqpct.s[28]++;context.out('</div>');
    } }, { key: 'format_movedestination', value: function format_movedestination(context, delta, left) {
      cov_273kjaqpct.f[10]++;cov_273kjaqpct.s[29]++;if (typeof left === 'undefined') {
        cov_273kjaqpct.b[5][0]++;cov_273kjaqpct.s[30]++;return;
      } else {
        cov_273kjaqpct.b[5][1]++;
      }cov_273kjaqpct.s[31]++;context.out('<div class="jsondiffpatch-value">');cov_273kjaqpct.s[32]++;this.formatValue(context, left);cov_273kjaqpct.s[33]++;context.out('</div>');
    } }, { key: 'format_node', value: function format_node(context, delta, left) {
      cov_273kjaqpct.f[11]++; // recurse
      var nodeType = (cov_273kjaqpct.s[34]++, delta._t === 'a' ? (cov_273kjaqpct.b[6][0]++, 'array') : (cov_273kjaqpct.b[6][1]++, 'object'));cov_273kjaqpct.s[35]++;context.out('<ul class="jsondiffpatch-node jsondiffpatch-node-type-' + nodeType + '">');cov_273kjaqpct.s[36]++;this.formatDeltaChildren(context, delta, left);cov_273kjaqpct.s[37]++;context.out('</ul>');
    } }, { key: 'format_added', value: function format_added(context, delta) {
      cov_273kjaqpct.f[12]++;cov_273kjaqpct.s[38]++;context.out('<div class="jsondiffpatch-value">');cov_273kjaqpct.s[39]++;this.formatValue(context, delta[0]);cov_273kjaqpct.s[40]++;context.out('</div>');
    } }, { key: 'format_modified', value: function format_modified(context, delta) {
      cov_273kjaqpct.f[13]++;cov_273kjaqpct.s[41]++;context.out('<div class="jsondiffpatch-value jsondiffpatch-left-value">');cov_273kjaqpct.s[42]++;this.formatValue(context, delta[0]);cov_273kjaqpct.s[43]++;context.out('</div>' + '<div class="jsondiffpatch-value jsondiffpatch-right-value">');cov_273kjaqpct.s[44]++;this.formatValue(context, delta[1]);cov_273kjaqpct.s[45]++;context.out('</div>');
    } }, { key: 'format_deleted', value: function format_deleted(context, delta) {
      cov_273kjaqpct.f[14]++;cov_273kjaqpct.s[46]++;context.out('<div class="jsondiffpatch-value">');cov_273kjaqpct.s[47]++;this.formatValue(context, delta[0]);cov_273kjaqpct.s[48]++;context.out('</div>');
    } }, { key: 'format_moved', value: function format_moved(context, delta) {
      cov_273kjaqpct.f[15]++;cov_273kjaqpct.s[49]++;context.out('<div class="jsondiffpatch-value">');cov_273kjaqpct.s[50]++;this.formatValue(context, delta[0]);cov_273kjaqpct.s[51]++;context.out('</div><div class="jsondiffpatch-moved-destination">' + delta[1] + '</div>'); // draw an SVG arrow from here to move destination
      cov_273kjaqpct.s[52]++;context.out( /* jshint multistr: true */'<div class="jsondiffpatch-arrow" ' + 'style="position: relative; left: -34px;">\n          <svg width="30" height="60" ' + 'style="position: absolute; display: none;">\n          <defs>\n              <marker id="markerArrow" markerWidth="8" markerHeight="8"\n                 refx="2" refy="4"\n                     orient="auto" markerUnits="userSpaceOnUse">\n                  <path d="M1,1 L1,7 L7,4 L1,1" style="fill: #339;" />\n              </marker>\n          </defs>\n          <path d="M30,0 Q-10,25 26,50"\n            style="stroke: #88f; stroke-width: 2px; fill: none; ' + 'stroke-opacity: 0.5; marker-end: url(#markerArrow);"\n          ></path>\n          </svg>\n      </div>');cov_273kjaqpct.s[53]++;context.hasArrows = true;
    } }, { key: 'format_textdiff', value: function format_textdiff(context, delta) {
      cov_273kjaqpct.f[16]++;cov_273kjaqpct.s[54]++;context.out('<div class="jsondiffpatch-value">');cov_273kjaqpct.s[55]++;this.formatTextDiffString(context, delta[0]);cov_273kjaqpct.s[56]++;context.out('</div>');
    } }]);cov_273kjaqpct.s[57]++;return HtmlFormatter;
}(BaseFormatter));function htmlEscape(text) {
  cov_273kjaqpct.f[17]++;var html = (cov_273kjaqpct.s[58]++, text);var replacements = (cov_273kjaqpct.s[59]++, [[/&/g, '&amp;'], [/</g, '&lt;'], [/>/g, '&gt;'], [/'/g, '&apos;'], [/"/g, '&quot;']]);cov_273kjaqpct.s[60]++;for (var i = 0; i < replacements.length; i++) {
    cov_273kjaqpct.s[61]++;html = html.replace(replacements[i][0], replacements[i][1]);
  }cov_273kjaqpct.s[62]++;return html;
}cov_273kjaqpct.s[63]++;var adjustArrows = function jsondiffpatchHtmlFormatterAdjustArrows(nodeArg) {
  cov_273kjaqpct.f[18]++;var node = (cov_273kjaqpct.s[64]++, (cov_273kjaqpct.b[7][0]++, nodeArg) || (cov_273kjaqpct.b[7][1]++, document));cov_273kjaqpct.s[65]++;var getElementText = function getElementText(_ref) {
    cov_273kjaqpct.f[19]++;var textContent = (cov_273kjaqpct.s[66]++, _ref.textContent),
        innerText = (cov_273kjaqpct.s[67]++, _ref.innerText);cov_273kjaqpct.s[68]++;return (cov_273kjaqpct.b[8][0]++, textContent) || (cov_273kjaqpct.b[8][1]++, innerText);
  };cov_273kjaqpct.s[69]++;var eachByQuery = function eachByQuery(el, query, fn) {
    cov_273kjaqpct.f[20]++;var elems = (cov_273kjaqpct.s[70]++, el.querySelectorAll(query));cov_273kjaqpct.s[71]++;for (var i = 0, l = elems.length; i < l; i++) {
      cov_273kjaqpct.s[72]++;fn(elems[i]);
    }
  };cov_273kjaqpct.s[73]++;var eachChildren = function eachChildren(_ref2, fn) {
    cov_273kjaqpct.f[21]++;var children = (cov_273kjaqpct.s[74]++, _ref2.children);cov_273kjaqpct.s[75]++;for (var i = 0, l = children.length; i < l; i++) {
      cov_273kjaqpct.s[76]++;fn(children[i], i);
    }
  };cov_273kjaqpct.s[77]++;eachByQuery(node, '.jsondiffpatch-arrow', function (_ref3) {
    cov_273kjaqpct.f[22]++;var parentNode = (cov_273kjaqpct.s[78]++, _ref3.parentNode),
        children = (cov_273kjaqpct.s[79]++, _ref3.children),
        style = (cov_273kjaqpct.s[80]++, _ref3.style);var arrowParent = (cov_273kjaqpct.s[81]++, parentNode);var svg = (cov_273kjaqpct.s[82]++, children[0]);var path = (cov_273kjaqpct.s[83]++, svg.children[1]);cov_273kjaqpct.s[84]++;svg.style.display = 'none';var destination = (cov_273kjaqpct.s[85]++, getElementText(arrowParent.querySelector('.jsondiffpatch-moved-destination')));var container = (cov_273kjaqpct.s[86]++, arrowParent.parentNode);var destinationElem = (cov_273kjaqpct.s[87]++, void 0);cov_273kjaqpct.s[88]++;eachChildren(container, function (child) {
      cov_273kjaqpct.f[23]++;cov_273kjaqpct.s[89]++;if (child.getAttribute('data-key') === destination) {
        cov_273kjaqpct.b[9][0]++;cov_273kjaqpct.s[90]++;destinationElem = child;
      } else {
        cov_273kjaqpct.b[9][1]++;
      }
    });cov_273kjaqpct.s[91]++;if (!destinationElem) {
      cov_273kjaqpct.b[10][0]++;cov_273kjaqpct.s[92]++;return;
    } else {
      cov_273kjaqpct.b[10][1]++;
    }cov_273kjaqpct.s[93]++;try {
      var distance = (cov_273kjaqpct.s[94]++, destinationElem.offsetTop - arrowParent.offsetTop);cov_273kjaqpct.s[95]++;svg.setAttribute('height', Math.abs(distance) + 6);cov_273kjaqpct.s[96]++;style.top = -8 + (distance > 0 ? (cov_273kjaqpct.b[11][0]++, 0) : (cov_273kjaqpct.b[11][1]++, distance)) + 'px';var curve = (cov_273kjaqpct.s[97]++, distance > 0 ? (cov_273kjaqpct.b[12][0]++, 'M30,0 Q-10,' + Math.round(distance / 2) + ' 26,' + (distance - 4)) : (cov_273kjaqpct.b[12][1]++, 'M30,' + -distance + ' Q-10,' + Math.round(-distance / 2) + ' 26,4'));cov_273kjaqpct.s[98]++;path.setAttribute('d', curve);cov_273kjaqpct.s[99]++;svg.style.display = '';
    } catch (err) {}
  });
}; /* jshint camelcase: true */ /* eslint-enable camelcase */cov_273kjaqpct.s[100]++;var showUnchanged = function showUnchanged(show, node, delay) {
  cov_273kjaqpct.f[24]++;var el = (cov_273kjaqpct.s[101]++, (cov_273kjaqpct.b[13][0]++, node) || (cov_273kjaqpct.b[13][1]++, document.body));var prefix = (cov_273kjaqpct.s[102]++, 'jsondiffpatch-unchanged-');var classes = (cov_273kjaqpct.s[103]++, { showing: prefix + 'showing', hiding: prefix + 'hiding', visible: prefix + 'visible', hidden: prefix + 'hidden' });var list = (cov_273kjaqpct.s[104]++, el.classList);cov_273kjaqpct.s[105]++;if (!list) {
    cov_273kjaqpct.b[14][0]++;cov_273kjaqpct.s[106]++;return;
  } else {
    cov_273kjaqpct.b[14][1]++;
  }cov_273kjaqpct.s[107]++;if (!delay) {
    cov_273kjaqpct.b[15][0]++;cov_273kjaqpct.s[108]++;list.remove(classes.showing);cov_273kjaqpct.s[109]++;list.remove(classes.hiding);cov_273kjaqpct.s[110]++;list.remove(classes.visible);cov_273kjaqpct.s[111]++;list.remove(classes.hidden);cov_273kjaqpct.s[112]++;if (show === false) {
      cov_273kjaqpct.b[16][0]++;cov_273kjaqpct.s[113]++;list.add(classes.hidden);
    } else {
      cov_273kjaqpct.b[16][1]++;
    }cov_273kjaqpct.s[114]++;return;
  } else {
    cov_273kjaqpct.b[15][1]++;
  }cov_273kjaqpct.s[115]++;if (show === false) {
    cov_273kjaqpct.b[17][0]++;cov_273kjaqpct.s[116]++;list.remove(classes.showing);cov_273kjaqpct.s[117]++;list.add(classes.visible);cov_273kjaqpct.s[118]++;setTimeout(function () {
      cov_273kjaqpct.f[25]++;cov_273kjaqpct.s[119]++;list.add(classes.hiding);
    }, 10);
  } else {
    cov_273kjaqpct.b[17][1]++;cov_273kjaqpct.s[120]++;list.remove(classes.hiding);cov_273kjaqpct.s[121]++;list.add(classes.showing);cov_273kjaqpct.s[122]++;list.remove(classes.hidden);
  }var intervalId = (cov_273kjaqpct.s[123]++, setInterval(function () {
    cov_273kjaqpct.f[26]++;cov_273kjaqpct.s[124]++;adjustArrows(el);
  }, 100));cov_273kjaqpct.s[125]++;setTimeout(function () {
    cov_273kjaqpct.f[27]++;cov_273kjaqpct.s[126]++;list.remove(classes.showing);cov_273kjaqpct.s[127]++;list.remove(classes.hiding);cov_273kjaqpct.s[128]++;if (show === false) {
      cov_273kjaqpct.b[18][0]++;cov_273kjaqpct.s[129]++;list.add(classes.hidden);cov_273kjaqpct.s[130]++;list.remove(classes.visible);
    } else {
      cov_273kjaqpct.b[18][1]++;cov_273kjaqpct.s[131]++;list.add(classes.visible);cov_273kjaqpct.s[132]++;list.remove(classes.hidden);
    }cov_273kjaqpct.s[133]++;setTimeout(function () {
      cov_273kjaqpct.f[28]++;cov_273kjaqpct.s[134]++;list.remove(classes.visible);cov_273kjaqpct.s[135]++;clearInterval(intervalId);
    }, delay + 400);
  }, delay);
};cov_273kjaqpct.s[136]++;var hideUnchanged = function hideUnchanged(node, delay) {
  cov_273kjaqpct.f[29]++;cov_273kjaqpct.s[137]++;return showUnchanged(false, node, delay);
};var defaultInstance = (cov_273kjaqpct.s[138]++, void 0);function format(delta, left) {
  cov_273kjaqpct.f[30]++;cov_273kjaqpct.s[139]++;if (!defaultInstance) {
    cov_273kjaqpct.b[19][0]++;cov_273kjaqpct.s[140]++;defaultInstance = new HtmlFormatter();
  } else {
    cov_273kjaqpct.b[19][1]++;
  }cov_273kjaqpct.s[141]++;return defaultInstance.format(delta, left);
}

var html = Object.freeze({
  showUnchanged: showUnchanged,
  hideUnchanged: hideUnchanged,
  default: HtmlFormatter,
  format: format
});

var cov_23zb36bnir = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/formatters/annotated.js',
      hash = '750ced81bce7e3624b7eddbe3e7bc0f18f2d4a8b',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/formatters/annotated.js', statementMap: { '0': { start: { line: 3, column: 25 }, end: { line: 114, column: 16 } }, '1': { start: { line: 4, column: 2 }, end: { line: 4, column: 60 } }, '2': { start: { line: 7, column: 4 }, end: { line: 7, column: 58 } }, '3': { start: { line: 9, column: 16 }, end: { line: 9, column: 148 } }, '4': { start: { line: 11, column: 4 }, end: { line: 11, column: 42 } }, '5': { start: { line: 12, column: 4 }, end: { line: 12, column: 17 } }, '6': { start: { line: 15, column: 2 }, end: { line: 112, column: 6 } }, '7': { start: { line: 18, column: 6 }, end: { line: 18, column: 162 } }, '8': { start: { line: 19, column: 6 }, end: { line: 22, column: 8 } }, '9': { start: { line: 20, column: 8 }, end: { line: 20, column: 98 } }, '10': { start: { line: 21, column: 8 }, end: { line: 21, column: 78 } }, '11': { start: { line: 23, column: 6 }, end: { line: 31, column: 8 } }, '12': { start: { line: 24, column: 8 }, end: { line: 24, column: 145 } }, '13': { start: { line: 25, column: 8 }, end: { line: 25, column: 39 } }, '14': { start: { line: 26, column: 8 }, end: { line: 26, column: 65 } }, '15': { start: { line: 27, column: 8 }, end: { line: 27, column: 26 } }, '16': { start: { line: 28, column: 8 }, end: { line: 28, column: 77 } }, '17': { start: { line: 29, column: 8 }, end: { line: 29, column: 30 } }, '18': { start: { line: 30, column: 8 }, end: { line: 30, column: 40 } }, '19': { start: { line: 36, column: 6 }, end: { line: 36, column: 76 } }, '20': { start: { line: 41, column: 18 }, end: { line: 41, column: 43 } }, '21': { start: { line: 42, column: 6 }, end: { line: 42, column: 57 } }, '22': { start: { line: 43, column: 6 }, end: { line: 52, column: 7 } }, '23': { start: { line: 44, column: 19 }, end: { line: 44, column: 27 } }, '24': { start: { line: 45, column: 8 }, end: { line: 45, column: 283 } }, '25': { start: { line: 46, column: 21 }, end: { line: 46, column: 32 } }, '26': { start: { line: 47, column: 8 }, end: { line: 50, column: 9 } }, '27': { start: { line: 48, column: 22 }, end: { line: 48, column: 40 } }, '28': { start: { line: 49, column: 10 }, end: { line: 49, column: 107 } }, '29': { start: { line: 51, column: 8 }, end: { line: 51, column: 35 } }, '30': { start: { line: 53, column: 6 }, end: { line: 53, column: 27 } }, '31': { start: { line: 58, column: 6 }, end: { line: 58, column: 67 } }, '32': { start: { line: 59, column: 6 }, end: { line: 62, column: 7 } }, '33': { start: { line: 60, column: 8 }, end: { line: 60, column: 25 } }, '34': { start: { line: 61, column: 8 }, end: { line: 61, column: 25 } }, '35': { start: { line: 63, column: 6 }, end: { line: 65, column: 7 } }, '36': { start: { line: 64, column: 8 }, end: { line: 64, column: 87 } }, '37': { start: { line: 70, column: 6 }, end: { line: 73, column: 7 } }, '38': { start: { line: 71, column: 8 }, end: { line: 71, column: 27 } }, '39': { start: { line: 72, column: 8 }, end: { line: 72, column: 25 } }, '40': { start: { line: 74, column: 6 }, end: { line: 74, column: 30 } }, '41': { start: { line: 79, column: 6 }, end: { line: 79, column: 48 } }, '42': { start: { line: 80, column: 6 }, end: { line: 82, column: 7 } }, '43': { start: { line: 81, column: 8 }, end: { line: 81, column: 25 } }, '44': { start: { line: 83, column: 6 }, end: { line: 85, column: 7 } }, '45': { start: { line: 84, column: 8 }, end: { line: 84, column: 87 } }, '46': { start: { line: 90, column: 6 }, end: { line: 92, column: 7 } }, '47': { start: { line: 91, column: 8 }, end: { line: 91, column: 27 } }, '48': { start: { line: 93, column: 6 }, end: { line: 93, column: 45 } }, '49': { start: { line: 110, column: 6 }, end: { line: 110, column: 53 } }, '50': { start: { line: 113, column: 2 }, end: { line: 113, column: 28 } }, '51': { start: { line: 118, column: 23 }, end: { line: 120, column: 1 } }, '52': { start: { line: 119, column: 2 }, end: { line: 119, column: 76 } }, '53': { start: { line: 122, column: 23 }, end: { line: 160, column: 1 } }, '54': { start: { line: 124, column: 23 }, end: { line: 124, column: 49 } }, '55': { start: { line: 125, column: 4 }, end: { line: 127, column: 5 } }, '56': { start: { line: 126, column: 6 }, end: { line: 126, column: 40 } }, '57': { start: { line: 128, column: 4 }, end: { line: 130, column: 5 } }, '58': { start: { line: 129, column: 6 }, end: { line: 129, column: 57 } }, '59': { start: { line: 131, column: 4 }, end: { line: 131, column: 70 } }, '60': { start: { line: 134, column: 23 }, end: { line: 134, column: 64 } }, '61': { start: { line: 135, column: 4 }, end: { line: 137, column: 5 } }, '62': { start: { line: 136, column: 6 }, end: { line: 136, column: 43 } }, '63': { start: { line: 138, column: 4 }, end: { line: 140, column: 5 } }, '64': { start: { line: 139, column: 6 }, end: { line: 139, column: 57 } }, '65': { start: { line: 141, column: 4 }, end: { line: 141, column: 73 } }, '66': { start: { line: 144, column: 23 }, end: { line: 144, column: 60 } }, '67': { start: { line: 145, column: 4 }, end: { line: 147, column: 5 } }, '68': { start: { line: 146, column: 6 }, end: { line: 146, column: 43 } }, '69': { start: { line: 148, column: 4 }, end: { line: 150, column: 5 } }, '70': { start: { line: 149, column: 6 }, end: { line: 149, column: 54 } }, '71': { start: { line: 151, column: 4 }, end: { line: 151, column: 73 } }, '72': { start: { line: 154, column: 4 }, end: { line: 154, column: 202 } }, '73': { start: { line: 157, column: 19 }, end: { line: 157, column: 155 } }, '74': { start: { line: 158, column: 4 }, end: { line: 158, column: 155 } }, '75': { start: { line: 162, column: 22 }, end: { line: 174, column: 1 } }, '76': { start: { line: 163, column: 18 }, end: { line: 163, column: 42 } }, '77': { start: { line: 164, column: 18 }, end: { line: 164, column: 45 } }, '78': { start: { line: 165, column: 17 }, end: { line: 165, column: 98 } }, '79': { start: { line: 166, column: 13 }, end: { line: 166, column: 43 } }, '80': { start: { line: 167, column: 2 }, end: { line: 170, column: 3 } }, '81': { start: { line: 169, column: 4 }, end: { line: 169, column: 49 } }, '82': { start: { line: 171, column: 2 }, end: { line: 171, column: 19 } }, '83': { start: { line: 172, column: 2 }, end: { line: 172, column: 30 } }, '84': { start: { line: 173, column: 2 }, end: { line: 173, column: 21 } }, '85': { start: { line: 177, column: 0 }, end: { line: 177, column: 60 } }, '86': { start: { line: 178, column: 0 }, end: { line: 178, column: 63 } }, '87': { start: { line: 179, column: 0 }, end: { line: 179, column: 62 } }, '88': { start: { line: 180, column: 0 }, end: { line: 180, column: 60 } }, '89': { start: { line: 181, column: 0 }, end: { line: 181, column: 63 } }, '90': { start: { line: 188, column: 22 }, end: { line: 188, column: 28 } }, '91': { start: { line: 191, column: 2 }, end: { line: 193, column: 3 } }, '92': { start: { line: 192, column: 4 }, end: { line: 192, column: 47 } }, '93': { start: { line: 194, column: 2 }, end: { line: 194, column: 45 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 3, column: 25 }, end: { line: 3, column: 26 } }, loc: { start: { line: 3, column: 51 }, end: { line: 114, column: 1 } }, line: 3 }, '1': { name: 'AnnotatedFormatter', decl: { start: { line: 6, column: 11 }, end: { line: 6, column: 29 } }, loc: { start: { line: 6, column: 32 }, end: { line: 13, column: 3 } }, line: 6 }, '2': { name: 'prepareContext', decl: { start: { line: 17, column: 20 }, end: { line: 17, column: 34 } }, loc: { start: { line: 17, column: 44 }, end: { line: 32, column: 5 } }, line: 17 }, '3': { name: '(anonymous_3)', decl: { start: { line: 19, column: 23 }, end: { line: 19, column: 24 } }, loc: { start: { line: 19, column: 41 }, end: { line: 22, column: 7 } }, line: 19 }, '4': { name: '(anonymous_4)', decl: { start: { line: 23, column: 20 }, end: { line: 23, column: 21 } }, loc: { start: { line: 23, column: 46 }, end: { line: 31, column: 7 } }, line: 23 }, '5': { name: 'typeFormattterErrorFormatter', decl: { start: { line: 35, column: 20 }, end: { line: 35, column: 48 } }, loc: { start: { line: 35, column: 63 }, end: { line: 37, column: 5 } }, line: 35 }, '6': { name: 'formatTextDiffString', decl: { start: { line: 40, column: 20 }, end: { line: 40, column: 40 } }, loc: { start: { line: 40, column: 57 }, end: { line: 54, column: 5 } }, line: 40 }, '7': { name: 'rootBegin', decl: { start: { line: 57, column: 20 }, end: { line: 57, column: 29 } }, loc: { start: { line: 57, column: 55 }, end: { line: 66, column: 5 } }, line: 57 }, '8': { name: 'rootEnd', decl: { start: { line: 69, column: 20 }, end: { line: 69, column: 27 } }, loc: { start: { line: 69, column: 43 }, end: { line: 75, column: 5 } }, line: 69 }, '9': { name: 'nodeBegin', decl: { start: { line: 78, column: 20 }, end: { line: 78, column: 29 } }, loc: { start: { line: 78, column: 69 }, end: { line: 86, column: 5 } }, line: 78 }, '10': { name: 'nodeEnd', decl: { start: { line: 89, column: 20 }, end: { line: 89, column: 27 } }, loc: { start: { line: 89, column: 75 }, end: { line: 94, column: 5 } }, line: 89 }, '11': { name: 'format_unchanged', decl: { start: { line: 102, column: 20 }, end: { line: 102, column: 36 } }, loc: { start: { line: 102, column: 39 }, end: { line: 102, column: 41 } }, line: 102 }, '12': { name: 'format_movedestination', decl: { start: { line: 105, column: 20 }, end: { line: 105, column: 42 } }, loc: { start: { line: 105, column: 45 }, end: { line: 105, column: 47 } }, line: 105 }, '13': { name: 'format_node', decl: { start: { line: 108, column: 20 }, end: { line: 108, column: 31 } }, loc: { start: { line: 108, column: 54 }, end: { line: 111, column: 5 } }, line: 108 }, '14': { name: 'wrapPropertyName', decl: { start: { line: 118, column: 32 }, end: { line: 118, column: 48 } }, loc: { start: { line: 118, column: 55 }, end: { line: 120, column: 1 } }, line: 118 }, '15': { name: 'added', decl: { start: { line: 123, column: 18 }, end: { line: 123, column: 23 } }, loc: { start: { line: 123, column: 51 }, end: { line: 132, column: 3 } }, line: 123 }, '16': { name: 'modified', decl: { start: { line: 133, column: 21 }, end: { line: 133, column: 29 } }, loc: { start: { line: 133, column: 57 }, end: { line: 142, column: 3 } }, line: 133 }, '17': { name: 'deleted', decl: { start: { line: 143, column: 20 }, end: { line: 143, column: 27 } }, loc: { start: { line: 143, column: 55 }, end: { line: 152, column: 3 } }, line: 143 }, '18': { name: 'moved', decl: { start: { line: 153, column: 18 }, end: { line: 153, column: 23 } }, loc: { start: { line: 153, column: 51 }, end: { line: 155, column: 3 } }, line: 153 }, '19': { name: 'textdiff', decl: { start: { line: 156, column: 21 }, end: { line: 156, column: 29 } }, loc: { start: { line: 156, column: 57 }, end: { line: 159, column: 3 } }, line: 156 }, '20': { name: 'formatAnyChange', decl: { start: { line: 162, column: 31 }, end: { line: 162, column: 46 } }, loc: { start: { line: 162, column: 63 }, end: { line: 174, column: 1 } }, line: 162 }, '21': { name: 'format', decl: { start: { line: 190, column: 16 }, end: { line: 190, column: 22 } }, loc: { start: { line: 190, column: 36 }, end: { line: 195, column: 1 } }, line: 190 } }, branchMap: { '0': { loc: { start: { line: 9, column: 62 }, end: { line: 9, column: 135 } }, type: 'binary-expr', locations: [{ start: { line: 9, column: 62 }, end: { line: 9, column: 90 } }, { start: { line: 9, column: 94 }, end: { line: 9, column: 135 } }], line: 9 }, '1': { loc: { start: { line: 18, column: 23 }, end: { line: 18, column: 116 } }, type: 'binary-expr', locations: [{ start: { line: 18, column: 23 }, end: { line: 18, column: 61 } }, { start: { line: 18, column: 65 }, end: { line: 18, column: 116 } }], line: 18 }, '2': { loc: { start: { line: 20, column: 28 }, end: { line: 20, column: 49 } }, type: 'binary-expr', locations: [{ start: { line: 20, column: 28 }, end: { line: 20, column: 44 } }, { start: { line: 20, column: 48 }, end: { line: 20, column: 49 } }], line: 20 }, '3': { loc: { start: { line: 20, column: 54 }, end: { line: 20, column: 96 } }, type: 'cond-expr', locations: [{ start: { line: 20, column: 86 }, end: { line: 20, column: 87 } }, { start: { line: 20, column: 90 }, end: { line: 20, column: 96 } }], line: 20 }, '4': { loc: { start: { line: 59, column: 6 }, end: { line: 62, column: 7 } }, type: 'if', locations: [{ start: { line: 59, column: 6 }, end: { line: 62, column: 7 } }, { start: { line: 59, column: 6 }, end: { line: 62, column: 7 } }], line: 59 }, '5': { loc: { start: { line: 63, column: 6 }, end: { line: 65, column: 7 } }, type: 'if', locations: [{ start: { line: 63, column: 6 }, end: { line: 65, column: 7 } }, { start: { line: 63, column: 6 }, end: { line: 65, column: 7 } }], line: 63 }, '6': { loc: { start: { line: 70, column: 6 }, end: { line: 73, column: 7 } }, type: 'if', locations: [{ start: { line: 70, column: 6 }, end: { line: 73, column: 7 } }, { start: { line: 70, column: 6 }, end: { line: 73, column: 7 } }], line: 70 }, '7': { loc: { start: { line: 80, column: 6 }, end: { line: 82, column: 7 } }, type: 'if', locations: [{ start: { line: 80, column: 6 }, end: { line: 82, column: 7 } }, { start: { line: 80, column: 6 }, end: { line: 82, column: 7 } }], line: 80 }, '8': { loc: { start: { line: 83, column: 6 }, end: { line: 85, column: 7 } }, type: 'if', locations: [{ start: { line: 83, column: 6 }, end: { line: 85, column: 7 } }, { start: { line: 83, column: 6 }, end: { line: 85, column: 7 } }], line: 83 }, '9': { loc: { start: { line: 90, column: 6 }, end: { line: 92, column: 7 } }, type: 'if', locations: [{ start: { line: 90, column: 6 }, end: { line: 92, column: 7 } }, { start: { line: 90, column: 6 }, end: { line: 92, column: 7 } }], line: 90 }, '10': { loc: { start: { line: 93, column: 25 }, end: { line: 93, column: 42 } }, type: 'cond-expr', locations: [{ start: { line: 93, column: 34 }, end: { line: 93, column: 36 } }, { start: { line: 93, column: 39 }, end: { line: 93, column: 42 } }], line: 93 }, '11': { loc: { start: { line: 125, column: 4 }, end: { line: 127, column: 5 } }, type: 'if', locations: [{ start: { line: 125, column: 4 }, end: { line: 127, column: 5 } }, { start: { line: 125, column: 4 }, end: { line: 127, column: 5 } }], line: 125 }, '12': { loc: { start: { line: 128, column: 4 }, end: { line: 130, column: 5 } }, type: 'if', locations: [{ start: { line: 128, column: 4 }, end: { line: 130, column: 5 } }, { start: { line: 128, column: 4 }, end: { line: 130, column: 5 } }], line: 128 }, '13': { loc: { start: { line: 135, column: 4 }, end: { line: 137, column: 5 } }, type: 'if', locations: [{ start: { line: 135, column: 4 }, end: { line: 137, column: 5 } }, { start: { line: 135, column: 4 }, end: { line: 137, column: 5 } }], line: 135 }, '14': { loc: { start: { line: 138, column: 4 }, end: { line: 140, column: 5 } }, type: 'if', locations: [{ start: { line: 138, column: 4 }, end: { line: 140, column: 5 } }, { start: { line: 138, column: 4 }, end: { line: 140, column: 5 } }], line: 138 }, '15': { loc: { start: { line: 145, column: 4 }, end: { line: 147, column: 5 } }, type: 'if', locations: [{ start: { line: 145, column: 4 }, end: { line: 147, column: 5 } }, { start: { line: 145, column: 4 }, end: { line: 147, column: 5 } }], line: 145 }, '16': { loc: { start: { line: 148, column: 4 }, end: { line: 150, column: 5 } }, type: 'if', locations: [{ start: { line: 148, column: 4 }, end: { line: 150, column: 5 } }, { start: { line: 148, column: 4 }, end: { line: 150, column: 5 } }], line: 148 }, '17': { loc: { start: { line: 157, column: 19 }, end: { line: 157, column: 155 } }, type: 'cond-expr', locations: [{ start: { line: 157, column: 52 }, end: { line: 157, column: 54 } }, { start: { line: 157, column: 57 }, end: { line: 157, column: 155 } }], line: 157 }, '18': { loc: { start: { line: 157, column: 57 }, end: { line: 157, column: 155 } }, type: 'cond-expr', locations: [{ start: { line: 157, column: 87 }, end: { line: 157, column: 109 } }, { start: { line: 157, column: 112 }, end: { line: 157, column: 155 } }], line: 157 }, '19': { loc: { start: { line: 165, column: 17 }, end: { line: 165, column: 98 } }, type: 'binary-expr', locations: [{ start: { line: 165, column: 17 }, end: { line: 165, column: 26 } }, { start: { line: 165, column: 30 }, end: { line: 165, column: 98 } }], line: 165 }, '20': { loc: { start: { line: 167, column: 2 }, end: { line: 170, column: 3 } }, type: 'if', locations: [{ start: { line: 167, column: 2 }, end: { line: 170, column: 3 } }, { start: { line: 167, column: 2 }, end: { line: 170, column: 3 } }], line: 167 }, '21': { loc: { start: { line: 191, column: 2 }, end: { line: 193, column: 3 } }, type: 'if', locations: [{ start: { line: 191, column: 2 }, end: { line: 193, column: 3 } }, { start: { line: 191, column: 2 }, end: { line: 193, column: 3 } }], line: 191 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0, '74': 0, '75': 0, '76': 0, '77': 0, '78': 0, '79': 0, '80': 0, '81': 0, '82': 0, '83': 0, '84': 0, '85': 0, '86': 0, '87': 0, '88': 0, '89': 0, '90': 0, '91': 0, '92': 0, '93': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0], '15': [0, 0], '16': [0, 0], '17': [0, 0], '18': [0, 0], '19': [0, 0], '20': [0, 0], '21': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var AnnotatedFormatter = (cov_23zb36bnir.s[0]++, function (_BaseFormatter) {
  cov_23zb36bnir.f[0]++;cov_23zb36bnir.s[1]++;inherits$1(AnnotatedFormatter, _BaseFormatter);function AnnotatedFormatter() {
    cov_23zb36bnir.f[1]++;cov_23zb36bnir.s[2]++;classCallCheck$1(this, AnnotatedFormatter);var _this = (cov_23zb36bnir.s[3]++, possibleConstructorReturn$1(this, ((cov_23zb36bnir.b[0][0]++, AnnotatedFormatter.__proto__) || (cov_23zb36bnir.b[0][1]++, Object.getPrototypeOf(AnnotatedFormatter))).call(this)));cov_23zb36bnir.s[4]++;_this.includeMoveDestinations = false;cov_23zb36bnir.s[5]++;return _this;
  }cov_23zb36bnir.s[6]++;createClass$1(AnnotatedFormatter, [{ key: 'prepareContext', value: function prepareContext(context) {
      cov_23zb36bnir.f[2]++;cov_23zb36bnir.s[7]++;get$1((cov_23zb36bnir.b[1][0]++, AnnotatedFormatter.prototype.__proto__) || (cov_23zb36bnir.b[1][1]++, Object.getPrototypeOf(AnnotatedFormatter.prototype)), 'prepareContext', this).call(this, context);cov_23zb36bnir.s[8]++;context.indent = function (levels) {
        cov_23zb36bnir.f[3]++;cov_23zb36bnir.s[9]++;this.indentLevel = ((cov_23zb36bnir.b[2][0]++, this.indentLevel) || (cov_23zb36bnir.b[2][1]++, 0)) + (typeof levels === 'undefined' ? (cov_23zb36bnir.b[3][0]++, 1) : (cov_23zb36bnir.b[3][1]++, levels));cov_23zb36bnir.s[10]++;this.indentPad = new Array(this.indentLevel + 1).join('&nbsp;&nbsp;');
      };cov_23zb36bnir.s[11]++;context.row = function (json, htmlNote) {
        cov_23zb36bnir.f[4]++;cov_23zb36bnir.s[12]++;context.out('<tr><td style="white-space: nowrap;">' + '<pre class="jsondiffpatch-annotated-indent"' + ' style="display: inline-block">');cov_23zb36bnir.s[13]++;context.out(context.indentPad);cov_23zb36bnir.s[14]++;context.out('</pre><pre style="display: inline-block">');cov_23zb36bnir.s[15]++;context.out(json);cov_23zb36bnir.s[16]++;context.out('</pre></td><td class="jsondiffpatch-delta-note"><div>');cov_23zb36bnir.s[17]++;context.out(htmlNote);cov_23zb36bnir.s[18]++;context.out('</div></td></tr>');
      };
    } }, { key: 'typeFormattterErrorFormatter', value: function typeFormattterErrorFormatter(context, err) {
      cov_23zb36bnir.f[5]++;cov_23zb36bnir.s[19]++;context.row('', '<pre class="jsondiffpatch-error">' + err + '</pre>');
    } }, { key: 'formatTextDiffString', value: function formatTextDiffString(context, value) {
      cov_23zb36bnir.f[6]++;var lines = (cov_23zb36bnir.s[20]++, this.parseTextDiff(value));cov_23zb36bnir.s[21]++;context.out('<ul class="jsondiffpatch-textdiff">');cov_23zb36bnir.s[22]++;for (var i = 0, l = lines.length; i < l; i++) {
        var line = (cov_23zb36bnir.s[23]++, lines[i]);cov_23zb36bnir.s[24]++;context.out('<li><div class="jsondiffpatch-textdiff-location">' + ('<span class="jsondiffpatch-textdiff-line-number">' + line.location.line + '</span><span class="jsondiffpatch-textdiff-char">' + line.location.chr + '</span></div><div class="jsondiffpatch-textdiff-line">'));var pieces = (cov_23zb36bnir.s[25]++, line.pieces);cov_23zb36bnir.s[26]++;for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = (cov_23zb36bnir.s[27]++, pieces[pieceIndex]);cov_23zb36bnir.s[28]++;context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' + piece.text + '</span>');
        }cov_23zb36bnir.s[29]++;context.out('</div></li>');
      }cov_23zb36bnir.s[30]++;context.out('</ul>');
    } }, { key: 'rootBegin', value: function rootBegin(context, type, nodeType) {
      cov_23zb36bnir.f[7]++;cov_23zb36bnir.s[31]++;context.out('<table class="jsondiffpatch-annotated-delta">');cov_23zb36bnir.s[32]++;if (type === 'node') {
        cov_23zb36bnir.b[4][0]++;cov_23zb36bnir.s[33]++;context.row('{');cov_23zb36bnir.s[34]++;context.indent();
      } else {
        cov_23zb36bnir.b[4][1]++;
      }cov_23zb36bnir.s[35]++;if (nodeType === 'array') {
        cov_23zb36bnir.b[5][0]++;cov_23zb36bnir.s[36]++;context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
      } else {
        cov_23zb36bnir.b[5][1]++;
      }
    } }, { key: 'rootEnd', value: function rootEnd(context, type) {
      cov_23zb36bnir.f[8]++;cov_23zb36bnir.s[37]++;if (type === 'node') {
        cov_23zb36bnir.b[6][0]++;cov_23zb36bnir.s[38]++;context.indent(-1);cov_23zb36bnir.s[39]++;context.row('}');
      } else {
        cov_23zb36bnir.b[6][1]++;
      }cov_23zb36bnir.s[40]++;context.out('</table>');
    } }, { key: 'nodeBegin', value: function nodeBegin(context, key, leftKey, type, nodeType) {
      cov_23zb36bnir.f[9]++;cov_23zb36bnir.s[41]++;context.row('&quot;' + key + '&quot;: {');cov_23zb36bnir.s[42]++;if (type === 'node') {
        cov_23zb36bnir.b[7][0]++;cov_23zb36bnir.s[43]++;context.indent();
      } else {
        cov_23zb36bnir.b[7][1]++;
      }cov_23zb36bnir.s[44]++;if (nodeType === 'array') {
        cov_23zb36bnir.b[8][0]++;cov_23zb36bnir.s[45]++;context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
      } else {
        cov_23zb36bnir.b[8][1]++;
      }
    } }, { key: 'nodeEnd', value: function nodeEnd(context, key, leftKey, type, nodeType, isLast) {
      cov_23zb36bnir.f[10]++;cov_23zb36bnir.s[46]++;if (type === 'node') {
        cov_23zb36bnir.b[9][0]++;cov_23zb36bnir.s[47]++;context.indent(-1);
      } else {
        cov_23zb36bnir.b[9][1]++;
      }cov_23zb36bnir.s[48]++;context.row('}' + (isLast ? (cov_23zb36bnir.b[10][0]++, '') : (cov_23zb36bnir.b[10][1]++, ',')));
    } /* jshint camelcase: false */ /* eslint-disable camelcase */ }, { key: 'format_unchanged', value: function format_unchanged() {
      cov_23zb36bnir.f[11]++;
    } }, { key: 'format_movedestination', value: function format_movedestination() {
      cov_23zb36bnir.f[12]++;
    } }, { key: 'format_node', value: function format_node(context, delta, left) {
      cov_23zb36bnir.f[13]++;cov_23zb36bnir.s[49]++; // recurse
      this.formatDeltaChildren(context, delta, left);
    } }]);cov_23zb36bnir.s[50]++;return AnnotatedFormatter;
}(BaseFormatter)); /* eslint-enable camelcase */cov_23zb36bnir.s[51]++;var wrapPropertyName = function wrapPropertyName(name) {
  cov_23zb36bnir.f[14]++;cov_23zb36bnir.s[52]++;return '<pre style="display:inline-block">&quot;' + name + '&quot;</pre>';
};var deltaAnnotations = (cov_23zb36bnir.s[53]++, { added: function added(delta, left, key, leftKey) {
    cov_23zb36bnir.f[15]++;var formatLegend = (cov_23zb36bnir.s[54]++, ' <pre>([newValue])</pre>');cov_23zb36bnir.s[55]++;if (typeof leftKey === 'undefined') {
      cov_23zb36bnir.b[11][0]++;cov_23zb36bnir.s[56]++;return 'new value' + formatLegend;
    } else {
      cov_23zb36bnir.b[11][1]++;
    }cov_23zb36bnir.s[57]++;if (typeof leftKey === 'number') {
      cov_23zb36bnir.b[12][0]++;cov_23zb36bnir.s[58]++;return 'insert at index ' + leftKey + formatLegend;
    } else {
      cov_23zb36bnir.b[12][1]++;
    }cov_23zb36bnir.s[59]++;return 'add property ' + wrapPropertyName(leftKey) + formatLegend;
  }, modified: function modified(delta, left, key, leftKey) {
    cov_23zb36bnir.f[16]++;var formatLegend = (cov_23zb36bnir.s[60]++, ' <pre>([previousValue, newValue])</pre>');cov_23zb36bnir.s[61]++;if (typeof leftKey === 'undefined') {
      cov_23zb36bnir.b[13][0]++;cov_23zb36bnir.s[62]++;return 'modify value' + formatLegend;
    } else {
      cov_23zb36bnir.b[13][1]++;
    }cov_23zb36bnir.s[63]++;if (typeof leftKey === 'number') {
      cov_23zb36bnir.b[14][0]++;cov_23zb36bnir.s[64]++;return 'modify at index ' + leftKey + formatLegend;
    } else {
      cov_23zb36bnir.b[14][1]++;
    }cov_23zb36bnir.s[65]++;return 'modify property ' + wrapPropertyName(leftKey) + formatLegend;
  }, deleted: function deleted(delta, left, key, leftKey) {
    cov_23zb36bnir.f[17]++;var formatLegend = (cov_23zb36bnir.s[66]++, ' <pre>([previousValue, 0, 0])</pre>');cov_23zb36bnir.s[67]++;if (typeof leftKey === 'undefined') {
      cov_23zb36bnir.b[15][0]++;cov_23zb36bnir.s[68]++;return 'delete value' + formatLegend;
    } else {
      cov_23zb36bnir.b[15][1]++;
    }cov_23zb36bnir.s[69]++;if (typeof leftKey === 'number') {
      cov_23zb36bnir.b[16][0]++;cov_23zb36bnir.s[70]++;return 'remove index ' + leftKey + formatLegend;
    } else {
      cov_23zb36bnir.b[16][1]++;
    }cov_23zb36bnir.s[71]++;return 'delete property ' + wrapPropertyName(leftKey) + formatLegend;
  }, moved: function moved(delta, left, key, leftKey) {
    cov_23zb36bnir.f[18]++;cov_23zb36bnir.s[72]++;return 'move from <span title="(position to remove at original state)">' + ('index ' + leftKey + '</span> to <span title="(position to insert at final') + (' state)">index ' + delta[1] + '</span>');
  }, textdiff: function textdiff(delta, left, key, leftKey) {
    cov_23zb36bnir.f[19]++;var location = (cov_23zb36bnir.s[73]++, typeof leftKey === 'undefined' ? (cov_23zb36bnir.b[17][0]++, '') : (cov_23zb36bnir.b[17][1]++, typeof leftKey === 'number' ? (cov_23zb36bnir.b[18][0]++, ' at index ' + leftKey) : (cov_23zb36bnir.b[18][1]++, ' at property ' + wrapPropertyName(leftKey))));cov_23zb36bnir.s[74]++;return 'text diff' + location + ', format is <a href="https://code.google.com/' + 'p/google-diff-match-patch/wiki/Unidiff">a variation of Unidiff</a>';
  } });cov_23zb36bnir.s[75]++;var formatAnyChange = function formatAnyChange(context, delta) {
  cov_23zb36bnir.f[20]++;var deltaType = (cov_23zb36bnir.s[76]++, this.getDeltaType(delta));var annotator = (cov_23zb36bnir.s[77]++, deltaAnnotations[deltaType]);var htmlNote = (cov_23zb36bnir.s[78]++, (cov_23zb36bnir.b[19][0]++, annotator) && (cov_23zb36bnir.b[19][1]++, annotator.apply(annotator, Array.prototype.slice.call(arguments, 1))));var json = (cov_23zb36bnir.s[79]++, JSON.stringify(delta, null, 2));cov_23zb36bnir.s[80]++;if (deltaType === 'textdiff') {
    cov_23zb36bnir.b[20][0]++;cov_23zb36bnir.s[81]++; // split text diffs lines
    json = json.split('\\n').join('\\n"+\n   "');
  } else {
    cov_23zb36bnir.b[20][1]++;
  }cov_23zb36bnir.s[82]++;context.indent();cov_23zb36bnir.s[83]++;context.row(json, htmlNote);cov_23zb36bnir.s[84]++;context.indent(-1);
}; /* eslint-disable camelcase */cov_23zb36bnir.s[85]++;AnnotatedFormatter.prototype.format_added = formatAnyChange;cov_23zb36bnir.s[86]++;AnnotatedFormatter.prototype.format_modified = formatAnyChange;cov_23zb36bnir.s[87]++;AnnotatedFormatter.prototype.format_deleted = formatAnyChange;cov_23zb36bnir.s[88]++;AnnotatedFormatter.prototype.format_moved = formatAnyChange;cov_23zb36bnir.s[89]++;AnnotatedFormatter.prototype.format_textdiff = formatAnyChange; /* eslint-enable camelcase */ /* jshint camelcase: true */var defaultInstance$1 = (cov_23zb36bnir.s[90]++, void 0);function format$1(delta, left) {
  cov_23zb36bnir.f[21]++;cov_23zb36bnir.s[91]++;if (!defaultInstance$1) {
    cov_23zb36bnir.b[21][0]++;cov_23zb36bnir.s[92]++;defaultInstance$1 = new AnnotatedFormatter();
  } else {
    cov_23zb36bnir.b[21][1]++;
  }cov_23zb36bnir.s[93]++;return defaultInstance$1.format(delta, left);
}

var annotated = Object.freeze({
  default: AnnotatedFormatter,
  format: format$1
});

var cov_jjhm4s856 = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/formatters/jsonpatch.js',
      hash = 'c826d53ee7d0af749f0e35190cfd52f2127e1989',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/formatters/jsonpatch.js', statementMap: { '0': { start: { line: 3, column: 17 }, end: { line: 8, column: 1 } }, '1': { start: { line: 10, column: 20 }, end: { line: 137, column: 16 } }, '2': { start: { line: 11, column: 2 }, end: { line: 11, column: 55 } }, '3': { start: { line: 14, column: 4 }, end: { line: 14, column: 53 } }, '4': { start: { line: 16, column: 16 }, end: { line: 16, column: 138 } }, '5': { start: { line: 18, column: 4 }, end: { line: 18, column: 41 } }, '6': { start: { line: 19, column: 4 }, end: { line: 19, column: 17 } }, '7': { start: { line: 22, column: 2 }, end: { line: 135, column: 6 } }, '8': { start: { line: 25, column: 6 }, end: { line: 25, column: 152 } }, '9': { start: { line: 26, column: 6 }, end: { line: 26, column: 26 } }, '10': { start: { line: 27, column: 6 }, end: { line: 27, column: 24 } }, '11': { start: { line: 28, column: 6 }, end: { line: 40, column: 8 } }, '12': { start: { line: 29, column: 17 }, end: { line: 29, column: 23 } }, '13': { start: { line: 30, column: 20 }, end: { line: 30, column: 29 } }, '14': { start: { line: 32, column: 18 }, end: { line: 35, column: 9 } }, '15': { start: { line: 36, column: 8 }, end: { line: 38, column: 9 } }, '16': { start: { line: 37, column: 10 }, end: { line: 37, column: 28 } }, '17': { start: { line: 39, column: 8 }, end: { line: 39, column: 30 } }, '18': { start: { line: 42, column: 6 }, end: { line: 49, column: 8 } }, '19': { start: { line: 43, column: 19 }, end: { line: 43, column: 37 } }, '20': { start: { line: 44, column: 8 }, end: { line: 48, column: 11 } }, '21': { start: { line: 51, column: 6 }, end: { line: 53, column: 8 } }, '22': { start: { line: 52, column: 8 }, end: { line: 52, column: 41 } }, '23': { start: { line: 55, column: 6 }, end: { line: 59, column: 8 } }, '24': { start: { line: 56, column: 17 }, end: { line: 56, column: 34 } }, '25': { start: { line: 57, column: 8 }, end: { line: 57, column: 35 } }, '26': { start: { line: 58, column: 8 }, end: { line: 58, column: 34 } }, '27': { start: { line: 64, column: 6 }, end: { line: 64, column: 36 } }, '28': { start: { line: 75, column: 17 }, end: { line: 75, column: 26 } }, '29': { start: { line: 77, column: 6 }, end: { line: 77, column: 25 } }, '30': { start: { line: 82, column: 17 }, end: { line: 82, column: 27 } }, '31': { start: { line: 84, column: 6 }, end: { line: 84, column: 17 } }, '32': { start: { line: 99, column: 6 }, end: { line: 99, column: 53 } }, '33': { start: { line: 104, column: 6 }, end: { line: 104, column: 69 } }, '34': { start: { line: 109, column: 6 }, end: { line: 109, column: 73 } }, '35': { start: { line: 114, column: 6 }, end: { line: 114, column: 55 } }, '36': { start: { line: 119, column: 15 }, end: { line: 119, column: 23 } }, '37': { start: { line: 120, column: 6 }, end: { line: 120, column: 29 } }, '38': { start: { line: 125, column: 6 }, end: { line: 125, column: 41 } }, '39': { start: { line: 130, column: 20 }, end: { line: 130, column: 22 } }, '40': { start: { line: 131, column: 6 }, end: { line: 131, column: 35 } }, '41': { start: { line: 132, column: 6 }, end: { line: 132, column: 41 } }, '42': { start: { line: 133, column: 6 }, end: { line: 133, column: 28 } }, '43': { start: { line: 136, column: 2 }, end: { line: 136, column: 23 } }, '44': { start: { line: 144, column: 11 }, end: { line: 146, column: 1 } }, '45': { start: { line: 145, column: 2 }, end: { line: 145, column: 29 } }, '46': { start: { line: 148, column: 13 }, end: { line: 151, column: 1 } }, '47': { start: { line: 149, column: 2 }, end: { line: 149, column: 17 } }, '48': { start: { line: 150, column: 2 }, end: { line: 150, column: 13 } }, '49': { start: { line: 153, column: 25 }, end: { line: 161, column: 1 } }, '50': { start: { line: 154, column: 14 }, end: { line: 154, column: 34 } }, '51': { start: { line: 155, column: 14 }, end: { line: 155, column: 34 } }, '52': { start: { line: 156, column: 2 }, end: { line: 160, column: 3 } }, '53': { start: { line: 157, column: 4 }, end: { line: 157, column: 25 } }, '54': { start: { line: 159, column: 4 }, end: { line: 159, column: 13 } }, '55': { start: { line: 163, column: 27 }, end: { line: 173, column: 1 } }, '56': { start: { line: 164, column: 2 }, end: { line: 172, column: 5 } }, '57': { start: { line: 165, column: 17 }, end: { line: 165, column: 34 } }, '58': { start: { line: 166, column: 17 }, end: { line: 166, column: 34 } }, '59': { start: { line: 167, column: 4 }, end: { line: 171, column: 5 } }, '60': { start: { line: 168, column: 6 }, end: { line: 168, column: 43 } }, '61': { start: { line: 170, column: 6 }, end: { line: 170, column: 60 } }, '62': { start: { line: 175, column: 26 }, end: { line: 191, column: 1 } }, '63': { start: { line: 176, column: 16 }, end: { line: 178, column: 4 } }, '64': { start: { line: 177, column: 4 }, end: { line: 177, column: 14 } }, '65': { start: { line: 179, column: 2 }, end: { line: 190, column: 14 } }, '66': { start: { line: 180, column: 19 }, end: { line: 182, column: 20 } }, '67': { start: { line: 181, column: 6 }, end: { line: 181, column: 22 } }, '68': { start: { line: 183, column: 4 }, end: { line: 185, column: 5 } }, '69': { start: { line: 184, column: 6 }, end: { line: 184, column: 28 } }, '70': { start: { line: 186, column: 4 }, end: { line: 186, column: 46 } }, '71': { start: { line: 188, column: 4 }, end: { line: 188, column: 39 } }, '72': { start: { line: 189, column: 4 }, end: { line: 189, column: 15 } }, '73': { start: { line: 192, column: 15 }, end: { line: 195, column: 1 } }, '74': { start: { line: 193, column: 11 }, end: { line: 193, column: 19 } }, '75': { start: { line: 194, column: 2 }, end: { line: 194, column: 23 } }, '76': { start: { line: 196, column: 17 }, end: { line: 199, column: 1 } }, '77': { start: { line: 197, column: 11 }, end: { line: 197, column: 19 } }, '78': { start: { line: 198, column: 2 }, end: { line: 198, column: 25 } }, '79': { start: { line: 201, column: 17 }, end: { line: 210, column: 1 } }, '80': { start: { line: 202, column: 22 }, end: { line: 202, column: 64 } }, '81': { start: { line: 203, column: 23 }, end: { line: 203, column: 67 } }, '82': { start: { line: 204, column: 16 }, end: { line: 204, column: 33 } }, '83': { start: { line: 205, column: 19 }, end: { line: 205, column: 36 } }, '84': { start: { line: 206, column: 16 }, end: { line: 206, column: 33 } }, '85': { start: { line: 208, column: 25 }, end: { line: 208, column: 57 } }, '86': { start: { line: 209, column: 2 }, end: { line: 209, column: 151 } }, '87': { start: { line: 212, column: 22 }, end: { line: 212, column: 28 } }, '88': { start: { line: 214, column: 20 }, end: { line: 219, column: 1 } }, '89': { start: { line: 215, column: 2 }, end: { line: 217, column: 3 } }, '90': { start: { line: 216, column: 4 }, end: { line: 216, column: 42 } }, '91': { start: { line: 218, column: 2 }, end: { line: 218, column: 57 } }, '92': { start: { line: 221, column: 17 }, end: { line: 223, column: 1 } }, '93': { start: { line: 222, column: 2 }, end: { line: 222, column: 35 } } }, fnMap: { '0': { name: '(anonymous_0)', decl: { start: { line: 10, column: 20 }, end: { line: 10, column: 21 } }, loc: { start: { line: 10, column: 46 }, end: { line: 137, column: 1 } }, line: 10 }, '1': { name: 'JSONFormatter', decl: { start: { line: 13, column: 11 }, end: { line: 13, column: 24 } }, loc: { start: { line: 13, column: 27 }, end: { line: 20, column: 3 } }, line: 13 }, '2': { name: 'prepareContext', decl: { start: { line: 24, column: 20 }, end: { line: 24, column: 34 } }, loc: { start: { line: 24, column: 44 }, end: { line: 60, column: 5 } }, line: 24 }, '3': { name: '(anonymous_3)', decl: { start: { line: 28, column: 30 }, end: { line: 28, column: 31 } }, loc: { start: { line: 28, column: 45 }, end: { line: 40, column: 7 } }, line: 28 }, '4': { name: '(anonymous_4)', decl: { start: { line: 42, column: 27 }, end: { line: 42, column: 28 } }, loc: { start: { line: 42, column: 41 }, end: { line: 49, column: 7 } }, line: 42 }, '5': { name: '(anonymous_5)', decl: { start: { line: 51, column: 28 }, end: { line: 51, column: 29 } }, loc: { start: { line: 51, column: 40 }, end: { line: 53, column: 7 } }, line: 51 }, '6': { name: '(anonymous_6)', decl: { start: { line: 55, column: 23 }, end: { line: 55, column: 24 } }, loc: { start: { line: 55, column: 41 }, end: { line: 59, column: 7 } }, line: 55 }, '7': { name: 'typeFormattterErrorFormatter', decl: { start: { line: 63, column: 20 }, end: { line: 63, column: 48 } }, loc: { start: { line: 63, column: 63 }, end: { line: 65, column: 5 } }, line: 63 }, '8': { name: 'rootBegin', decl: { start: { line: 68, column: 20 }, end: { line: 68, column: 29 } }, loc: { start: { line: 68, column: 32 }, end: { line: 68, column: 34 } }, line: 68 }, '9': { name: 'rootEnd', decl: { start: { line: 71, column: 20 }, end: { line: 71, column: 27 } }, loc: { start: { line: 71, column: 30 }, end: { line: 71, column: 32 } }, line: 71 }, '10': { name: 'nodeBegin', decl: { start: { line: 74, column: 20 }, end: { line: 74, column: 29 } }, loc: { start: { line: 74, column: 50 }, end: { line: 78, column: 5 } }, line: 74 }, '11': { name: 'nodeEnd', decl: { start: { line: 81, column: 20 }, end: { line: 81, column: 27 } }, loc: { start: { line: 81, column: 35 }, end: { line: 85, column: 5 } }, line: 81 }, '12': { name: 'format_unchanged', decl: { start: { line: 92, column: 20 }, end: { line: 92, column: 36 } }, loc: { start: { line: 92, column: 39 }, end: { line: 92, column: 41 } }, line: 92 }, '13': { name: 'format_movedestination', decl: { start: { line: 95, column: 20 }, end: { line: 95, column: 42 } }, loc: { start: { line: 95, column: 45 }, end: { line: 95, column: 47 } }, line: 95 }, '14': { name: 'format_node', decl: { start: { line: 98, column: 20 }, end: { line: 98, column: 31 } }, loc: { start: { line: 98, column: 54 }, end: { line: 100, column: 5 } }, line: 98 }, '15': { name: 'format_added', decl: { start: { line: 103, column: 20 }, end: { line: 103, column: 32 } }, loc: { start: { line: 103, column: 49 }, end: { line: 105, column: 5 } }, line: 103 }, '16': { name: 'format_modified', decl: { start: { line: 108, column: 20 }, end: { line: 108, column: 35 } }, loc: { start: { line: 108, column: 52 }, end: { line: 110, column: 5 } }, line: 108 }, '17': { name: 'format_deleted', decl: { start: { line: 113, column: 20 }, end: { line: 113, column: 34 } }, loc: { start: { line: 113, column: 44 }, end: { line: 115, column: 5 } }, line: 113 }, '18': { name: 'format_moved', decl: { start: { line: 118, column: 20 }, end: { line: 118, column: 32 } }, loc: { start: { line: 118, column: 49 }, end: { line: 121, column: 5 } }, line: 118 }, '19': { name: 'format_textdiff', decl: { start: { line: 124, column: 20 }, end: { line: 124, column: 35 } }, loc: { start: { line: 124, column: 38 }, end: { line: 126, column: 5 } }, line: 124 }, '20': { name: 'format', decl: { start: { line: 129, column: 20 }, end: { line: 129, column: 26 } }, loc: { start: { line: 129, column: 40 }, end: { line: 134, column: 5 } }, line: 129 }, '21': { name: 'last', decl: { start: { line: 144, column: 20 }, end: { line: 144, column: 24 } }, loc: { start: { line: 144, column: 30 }, end: { line: 146, column: 1 } }, line: 144 }, '22': { name: 'sortBy', decl: { start: { line: 148, column: 22 }, end: { line: 148, column: 28 } }, loc: { start: { line: 148, column: 40 }, end: { line: 151, column: 1 } }, line: 148 }, '23': { name: 'compareByIndexDesc', decl: { start: { line: 153, column: 34 }, end: { line: 153, column: 52 } }, loc: { start: { line: 153, column: 69 }, end: { line: 161, column: 1 } }, line: 153 }, '24': { name: 'opsByDescendingOrder', decl: { start: { line: 163, column: 36 }, end: { line: 163, column: 56 } }, loc: { start: { line: 163, column: 68 }, end: { line: 173, column: 1 } }, line: 163 }, '25': { name: '(anonymous_25)', decl: { start: { line: 164, column: 27 }, end: { line: 164, column: 28 } }, loc: { start: { line: 164, column: 43 }, end: { line: 172, column: 3 } }, line: 164 }, '26': { name: 'partitionOps', decl: { start: { line: 175, column: 35 }, end: { line: 175, column: 47 } }, loc: { start: { line: 175, column: 58 }, end: { line: 191, column: 1 } }, line: 175 }, '27': { name: '(anonymous_27)', decl: { start: { line: 176, column: 49 }, end: { line: 176, column: 50 } }, loc: { start: { line: 176, column: 61 }, end: { line: 178, column: 3 } }, line: 176 }, '28': { name: '(anonymous_28)', decl: { start: { line: 179, column: 17 }, end: { line: 179, column: 18 } }, loc: { start: { line: 179, column: 33 }, end: { line: 187, column: 3 } }, line: 179 }, '29': { name: '(anonymous_29)', decl: { start: { line: 180, column: 27 }, end: { line: 180, column: 28 } }, loc: { start: { line: 180, column: 41 }, end: { line: 182, column: 5 } }, line: 180 }, '30': { name: '(anonymous_30)', decl: { start: { line: 187, column: 12 }, end: { line: 187, column: 13 } }, loc: { start: { line: 187, column: 33 }, end: { line: 190, column: 3 } }, line: 187 }, '31': { name: 'isMoveOp', decl: { start: { line: 192, column: 24 }, end: { line: 192, column: 32 } }, loc: { start: { line: 192, column: 40 }, end: { line: 195, column: 1 } }, line: 192 }, '32': { name: 'isRemoveOp', decl: { start: { line: 196, column: 26 }, end: { line: 196, column: 36 } }, loc: { start: { line: 196, column: 44 }, end: { line: 199, column: 1 } }, line: 196 }, '33': { name: 'reorderOps', decl: { start: { line: 201, column: 26 }, end: { line: 201, column: 36 } }, loc: { start: { line: 201, column: 43 }, end: { line: 210, column: 1 } }, line: 201 }, '34': { name: 'format', decl: { start: { line: 214, column: 29 }, end: { line: 214, column: 35 } }, loc: { start: { line: 214, column: 49 }, end: { line: 219, column: 1 } }, line: 214 }, '35': { name: 'log', decl: { start: { line: 221, column: 26 }, end: { line: 221, column: 29 } }, loc: { start: { line: 221, column: 43 }, end: { line: 223, column: 1 } }, line: 221 } }, branchMap: { '0': { loc: { start: { line: 16, column: 62 }, end: { line: 16, column: 125 } }, type: 'binary-expr', locations: [{ start: { line: 16, column: 62 }, end: { line: 16, column: 85 } }, { start: { line: 16, column: 89 }, end: { line: 16, column: 125 } }], line: 16 }, '1': { loc: { start: { line: 25, column: 23 }, end: { line: 25, column: 106 } }, type: 'binary-expr', locations: [{ start: { line: 25, column: 23 }, end: { line: 25, column: 56 } }, { start: { line: 25, column: 60 }, end: { line: 25, column: 106 } }], line: 25 }, '2': { loc: { start: { line: 36, column: 8 }, end: { line: 38, column: 9 } }, type: 'if', locations: [{ start: { line: 36, column: 8 }, end: { line: 38, column: 9 } }, { start: { line: 36, column: 8 }, end: { line: 38, column: 9 } }], line: 36 }, '3': { loc: { start: { line: 156, column: 2 }, end: { line: 160, column: 3 } }, type: 'if', locations: [{ start: { line: 156, column: 2 }, end: { line: 160, column: 3 } }, { start: { line: 156, column: 2 }, end: { line: 160, column: 3 } }], line: 156 }, '4': { loc: { start: { line: 156, column: 8 }, end: { line: 156, column: 36 } }, type: 'binary-expr', locations: [{ start: { line: 156, column: 8 }, end: { line: 156, column: 20 } }, { start: { line: 156, column: 24 }, end: { line: 156, column: 36 } }], line: 156 }, '5': { loc: { start: { line: 167, column: 4 }, end: { line: 171, column: 5 } }, type: 'if', locations: [{ start: { line: 167, column: 4 }, end: { line: 171, column: 5 } }, { start: { line: 167, column: 4 }, end: { line: 171, column: 5 } }], line: 167 }, '6': { loc: { start: { line: 183, column: 4 }, end: { line: 185, column: 5 } }, type: 'if', locations: [{ start: { line: 183, column: 4 }, end: { line: 185, column: 5 } }, { start: { line: 183, column: 4 }, end: { line: 185, column: 5 } }], line: 183 }, '7': { loc: { start: { line: 215, column: 2 }, end: { line: 217, column: 3 } }, type: 'if', locations: [{ start: { line: 215, column: 2 }, end: { line: 217, column: 3 } }, { start: { line: 215, column: 2 }, end: { line: 217, column: 3 } }], line: 215 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0, '74': 0, '75': 0, '76': 0, '77': 0, '78': 0, '79': 0, '80': 0, '81': 0, '82': 0, '83': 0, '84': 0, '85': 0, '86': 0, '87': 0, '88': 0, '89': 0, '90': 0, '91': 0, '92': 0, '93': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var OPERATIONS = (cov_jjhm4s856.s[0]++, { add: 'add', remove: 'remove', replace: 'replace', move: 'move' });var JSONFormatter = (cov_jjhm4s856.s[1]++, function (_BaseFormatter) {
  cov_jjhm4s856.f[0]++;cov_jjhm4s856.s[2]++;inherits$1(JSONFormatter, _BaseFormatter);function JSONFormatter() {
    cov_jjhm4s856.f[1]++;cov_jjhm4s856.s[3]++;classCallCheck$1(this, JSONFormatter);var _this = (cov_jjhm4s856.s[4]++, possibleConstructorReturn$1(this, ((cov_jjhm4s856.b[0][0]++, JSONFormatter.__proto__) || (cov_jjhm4s856.b[0][1]++, Object.getPrototypeOf(JSONFormatter))).call(this)));cov_jjhm4s856.s[5]++;_this.includeMoveDestinations = true;cov_jjhm4s856.s[6]++;return _this;
  }cov_jjhm4s856.s[7]++;createClass$1(JSONFormatter, [{ key: 'prepareContext', value: function prepareContext(context) {
      cov_jjhm4s856.f[2]++;cov_jjhm4s856.s[8]++;get$1((cov_jjhm4s856.b[1][0]++, JSONFormatter.prototype.__proto__) || (cov_jjhm4s856.b[1][1]++, Object.getPrototypeOf(JSONFormatter.prototype)), 'prepareContext', this).call(this, context);cov_jjhm4s856.s[9]++;context.result = [];cov_jjhm4s856.s[10]++;context.path = [];cov_jjhm4s856.s[11]++;context.pushCurrentOp = function (obj) {
        cov_jjhm4s856.f[3]++;var op = (cov_jjhm4s856.s[12]++, obj.op),
            value = (cov_jjhm4s856.s[13]++, obj.value);var val = (cov_jjhm4s856.s[14]++, { op: op, path: this.currentPath() });cov_jjhm4s856.s[15]++;if (typeof value !== 'undefined') {
          cov_jjhm4s856.b[2][0]++;cov_jjhm4s856.s[16]++;val.value = value;
        } else {
          cov_jjhm4s856.b[2][1]++;
        }cov_jjhm4s856.s[17]++;this.result.push(val);
      };cov_jjhm4s856.s[18]++;context.pushMoveOp = function (to) {
        cov_jjhm4s856.f[4]++;var from = (cov_jjhm4s856.s[19]++, this.currentPath());cov_jjhm4s856.s[20]++;this.result.push({ op: OPERATIONS.move, from: from, path: this.toPath(to) });
      };cov_jjhm4s856.s[21]++;context.currentPath = function () {
        cov_jjhm4s856.f[5]++;cov_jjhm4s856.s[22]++;return '/' + this.path.join('/');
      };cov_jjhm4s856.s[23]++;context.toPath = function (toPath) {
        cov_jjhm4s856.f[6]++;var to = (cov_jjhm4s856.s[24]++, this.path.slice());cov_jjhm4s856.s[25]++;to[to.length - 1] = toPath;cov_jjhm4s856.s[26]++;return '/' + to.join('/');
      };
    } }, { key: 'typeFormattterErrorFormatter', value: function typeFormattterErrorFormatter(context, err) {
      cov_jjhm4s856.f[7]++;cov_jjhm4s856.s[27]++;context.out('[ERROR] ' + err);
    } }, { key: 'rootBegin', value: function rootBegin() {
      cov_jjhm4s856.f[8]++;
    } }, { key: 'rootEnd', value: function rootEnd() {
      cov_jjhm4s856.f[9]++;
    } }, { key: 'nodeBegin', value: function nodeBegin(_ref, key, leftKey) {
      cov_jjhm4s856.f[10]++;var path = (cov_jjhm4s856.s[28]++, _ref.path);cov_jjhm4s856.s[29]++;path.push(leftKey);
    } }, { key: 'nodeEnd', value: function nodeEnd(_ref2) {
      cov_jjhm4s856.f[11]++;var path = (cov_jjhm4s856.s[30]++, _ref2.path);cov_jjhm4s856.s[31]++;path.pop();
    } /* jshint camelcase: false */ /* eslint-disable camelcase */ }, { key: 'format_unchanged', value: function format_unchanged() {
      cov_jjhm4s856.f[12]++;
    } }, { key: 'format_movedestination', value: function format_movedestination() {
      cov_jjhm4s856.f[13]++;
    } }, { key: 'format_node', value: function format_node(context, delta, left) {
      cov_jjhm4s856.f[14]++;cov_jjhm4s856.s[32]++;this.formatDeltaChildren(context, delta, left);
    } }, { key: 'format_added', value: function format_added(context, delta) {
      cov_jjhm4s856.f[15]++;cov_jjhm4s856.s[33]++;context.pushCurrentOp({ op: OPERATIONS.add, value: delta[0] });
    } }, { key: 'format_modified', value: function format_modified(context, delta) {
      cov_jjhm4s856.f[16]++;cov_jjhm4s856.s[34]++;context.pushCurrentOp({ op: OPERATIONS.replace, value: delta[1] });
    } }, { key: 'format_deleted', value: function format_deleted(context) {
      cov_jjhm4s856.f[17]++;cov_jjhm4s856.s[35]++;context.pushCurrentOp({ op: OPERATIONS.remove });
    } }, { key: 'format_moved', value: function format_moved(context, delta) {
      cov_jjhm4s856.f[18]++;var to = (cov_jjhm4s856.s[36]++, delta[1]);cov_jjhm4s856.s[37]++;context.pushMoveOp(to);
    } }, { key: 'format_textdiff', value: function format_textdiff() {
      cov_jjhm4s856.f[19]++;cov_jjhm4s856.s[38]++;throw new Error('Not implemented');
    } }, { key: 'format', value: function format(delta, left) {
      cov_jjhm4s856.f[20]++;var context = (cov_jjhm4s856.s[39]++, {});cov_jjhm4s856.s[40]++;this.prepareContext(context);cov_jjhm4s856.s[41]++;this.recurse(context, delta, left);cov_jjhm4s856.s[42]++;return context.result;
    } }]);cov_jjhm4s856.s[43]++;return JSONFormatter;
}(BaseFormatter)); /* jshint camelcase: true */ /* eslint-enable camelcase */cov_jjhm4s856.s[44]++;var last = function last(arr) {
  cov_jjhm4s856.f[21]++;cov_jjhm4s856.s[45]++;return arr[arr.length - 1];
};cov_jjhm4s856.s[46]++;var sortBy = function sortBy(arr, pred) {
  cov_jjhm4s856.f[22]++;cov_jjhm4s856.s[47]++;arr.sort(pred);cov_jjhm4s856.s[48]++;return arr;
};cov_jjhm4s856.s[49]++;var compareByIndexDesc = function compareByIndexDesc(indexA, indexB) {
  cov_jjhm4s856.f[23]++;var lastA = (cov_jjhm4s856.s[50]++, parseInt(indexA, 10));var lastB = (cov_jjhm4s856.s[51]++, parseInt(indexB, 10));cov_jjhm4s856.s[52]++;if (!((cov_jjhm4s856.b[4][0]++, isNaN(lastA)) || (cov_jjhm4s856.b[4][1]++, isNaN(lastB)))) {
    cov_jjhm4s856.b[3][0]++;cov_jjhm4s856.s[53]++;return lastB - lastA;
  } else {
    cov_jjhm4s856.b[3][1]++;cov_jjhm4s856.s[54]++;return 0;
  }
};cov_jjhm4s856.s[55]++;var opsByDescendingOrder = function opsByDescendingOrder(removeOps) {
  cov_jjhm4s856.f[24]++;cov_jjhm4s856.s[56]++;return sortBy(removeOps, function (a, b) {
    cov_jjhm4s856.f[25]++;var splitA = (cov_jjhm4s856.s[57]++, a.path.split('/'));var splitB = (cov_jjhm4s856.s[58]++, b.path.split('/'));cov_jjhm4s856.s[59]++;if (splitA.length !== splitB.length) {
      cov_jjhm4s856.b[5][0]++;cov_jjhm4s856.s[60]++;return splitA.length - splitB.length;
    } else {
      cov_jjhm4s856.b[5][1]++;cov_jjhm4s856.s[61]++;return compareByIndexDesc(last(splitA), last(splitB));
    }
  });
};cov_jjhm4s856.s[62]++;var partitionOps = function partitionOps(arr, fns) {
  cov_jjhm4s856.f[26]++;var initArr = (cov_jjhm4s856.s[63]++, Array(fns.length + 1).fill().map(function () {
    cov_jjhm4s856.f[27]++;cov_jjhm4s856.s[64]++;return [];
  }));cov_jjhm4s856.s[65]++;return arr.map(function (item) {
    cov_jjhm4s856.f[28]++;var position = (cov_jjhm4s856.s[66]++, fns.map(function (fn) {
      cov_jjhm4s856.f[29]++;cov_jjhm4s856.s[67]++;return fn(item);
    }).indexOf(true));cov_jjhm4s856.s[68]++;if (position < 0) {
      cov_jjhm4s856.b[6][0]++;cov_jjhm4s856.s[69]++;position = fns.length;
    } else {
      cov_jjhm4s856.b[6][1]++;
    }cov_jjhm4s856.s[70]++;return { item: item, position: position };
  }).reduce(function (acc, item) {
    cov_jjhm4s856.f[30]++;cov_jjhm4s856.s[71]++;acc[item.position].push(item.item);cov_jjhm4s856.s[72]++;return acc;
  }, initArr);
};cov_jjhm4s856.s[73]++;var isMoveOp = function isMoveOp(_ref3) {
  cov_jjhm4s856.f[31]++;var op = (cov_jjhm4s856.s[74]++, _ref3.op);cov_jjhm4s856.s[75]++;return op === 'move';
};cov_jjhm4s856.s[76]++;var isRemoveOp = function isRemoveOp(_ref4) {
  cov_jjhm4s856.f[32]++;var op = (cov_jjhm4s856.s[77]++, _ref4.op);cov_jjhm4s856.s[78]++;return op === 'remove';
};cov_jjhm4s856.s[79]++;var reorderOps = function reorderOps(diff) {
  cov_jjhm4s856.f[33]++;var _partitionOps = (cov_jjhm4s856.s[80]++, partitionOps(diff, [isMoveOp, isRemoveOp])),
      _partitionOps2 = (cov_jjhm4s856.s[81]++, slicedToArray$1(_partitionOps, 3)),
      moveOps = (cov_jjhm4s856.s[82]++, _partitionOps2[0]),
      removedOps = (cov_jjhm4s856.s[83]++, _partitionOps2[1]),
      restOps = (cov_jjhm4s856.s[84]++, _partitionOps2[2]);var removeOpsReverse = (cov_jjhm4s856.s[85]++, opsByDescendingOrder(removedOps));cov_jjhm4s856.s[86]++;return [].concat(toConsumableArray$1(removeOpsReverse), toConsumableArray$1(moveOps), toConsumableArray$1(restOps));
};var defaultInstance$2 = (cov_jjhm4s856.s[87]++, void 0);cov_jjhm4s856.s[88]++;var format$2 = function format(delta, left) {
  cov_jjhm4s856.f[34]++;cov_jjhm4s856.s[89]++;if (!defaultInstance$2) {
    cov_jjhm4s856.b[7][0]++;cov_jjhm4s856.s[90]++;defaultInstance$2 = new JSONFormatter();
  } else {
    cov_jjhm4s856.b[7][1]++;
  }cov_jjhm4s856.s[91]++;return reorderOps(defaultInstance$2.format(delta, left));
};cov_jjhm4s856.s[92]++;var log = function log(delta, left) {
  cov_jjhm4s856.f[35]++;cov_jjhm4s856.s[93]++;console.log(format$2(delta, left));
};

var jsonpatch = Object.freeze({
  default: JSONFormatter,
  partitionOps: partitionOps,
  format: format$2,
  log: log
});

var cov_ye0cg04jg = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/formatters/console.js',
      hash = '5598765ad1d7bff6441347bf30803e4f0a7e9135',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/formatters/console.js', statementMap: { '0': { start: { line: 5, column: 2 }, end: { line: 11, column: 4 } }, '1': { start: { line: 6, column: 4 }, end: { line: 8, column: 5 } }, '2': { start: { line: 7, column: 6 }, end: { line: 7, column: 35 } }, '3': { start: { line: 10, column: 4 }, end: { line: 10, column: 16 } }, '4': { start: { line: 14, column: 13 }, end: { line: 22, column: 1 } }, '5': { start: { line: 24, column: 23 }, end: { line: 205, column: 16 } }, '6': { start: { line: 25, column: 2 }, end: { line: 25, column: 58 } }, '7': { start: { line: 28, column: 4 }, end: { line: 28, column: 56 } }, '8': { start: { line: 30, column: 16 }, end: { line: 30, column: 144 } }, '9': { start: { line: 32, column: 4 }, end: { line: 32, column: 42 } }, '10': { start: { line: 33, column: 4 }, end: { line: 33, column: 17 } }, '11': { start: { line: 36, column: 2 }, end: { line: 203, column: 6 } }, '12': { start: { line: 39, column: 6 }, end: { line: 39, column: 158 } }, '13': { start: { line: 40, column: 6 }, end: { line: 44, column: 8 } }, '14': { start: { line: 41, column: 8 }, end: { line: 41, column: 98 } }, '15': { start: { line: 42, column: 8 }, end: { line: 42, column: 68 } }, '16': { start: { line: 43, column: 8 }, end: { line: 43, column: 23 } }, '17': { start: { line: 45, column: 6 }, end: { line: 47, column: 8 } }, '18': { start: { line: 46, column: 8 }, end: { line: 46, column: 56 } }, '19': { start: { line: 48, column: 6 }, end: { line: 61, column: 8 } }, '20': { start: { line: 49, column: 8 }, end: { line: 51, column: 9 } }, '21': { start: { line: 50, column: 10 }, end: { line: 50, column: 41 } }, '22': { start: { line: 53, column: 8 }, end: { line: 60, column: 9 } }, '23': { start: { line: 54, column: 22 }, end: { line: 54, column: 41 } }, '24': { start: { line: 55, column: 21 }, end: { line: 55, column: 62 } }, '25': { start: { line: 56, column: 10 }, end: { line: 58, column: 11 } }, '26': { start: { line: 57, column: 12 }, end: { line: 57, column: 39 } }, '27': { start: { line: 59, column: 10 }, end: { line: 59, column: 33 } }, '28': { start: { line: 62, column: 6 }, end: { line: 65, column: 8 } }, '29': { start: { line: 63, column: 8 }, end: { line: 63, column: 38 } }, '30': { start: { line: 64, column: 8 }, end: { line: 64, column: 34 } }, '31': { start: { line: 66, column: 6 }, end: { line: 69, column: 8 } }, '32': { start: { line: 67, column: 8 }, end: { line: 67, column: 38 } }, '33': { start: { line: 68, column: 8 }, end: { line: 68, column: 27 } }, '34': { start: { line: 74, column: 6 }, end: { line: 74, column: 38 } }, '35': { start: { line: 75, column: 6 }, end: { line: 75, column: 35 } }, '36': { start: { line: 76, column: 6 }, end: { line: 76, column: 25 } }, '37': { start: { line: 81, column: 6 }, end: { line: 81, column: 50 } }, '38': { start: { line: 86, column: 18 }, end: { line: 86, column: 43 } }, '39': { start: { line: 87, column: 6 }, end: { line: 87, column: 23 } }, '40': { start: { line: 88, column: 6 }, end: { line: 103, column: 7 } }, '41': { start: { line: 89, column: 19 }, end: { line: 89, column: 27 } }, '42': { start: { line: 90, column: 8 }, end: { line: 90, column: 47 } }, '43': { start: { line: 91, column: 8 }, end: { line: 91, column: 72 } }, '44': { start: { line: 92, column: 8 }, end: { line: 92, column: 27 } }, '45': { start: { line: 93, column: 21 }, end: { line: 93, column: 32 } }, '46': { start: { line: 94, column: 8 }, end: { line: 99, column: 9 } }, '47': { start: { line: 95, column: 22 }, end: { line: 95, column: 40 } }, '48': { start: { line: 96, column: 10 }, end: { line: 96, column: 48 } }, '49': { start: { line: 97, column: 10 }, end: { line: 97, column: 34 } }, '50': { start: { line: 98, column: 10 }, end: { line: 98, column: 29 } }, '51': { start: { line: 100, column: 8 }, end: { line: 102, column: 9 } }, '52': { start: { line: 101, column: 10 }, end: { line: 101, column: 28 } }, '53': { start: { line: 104, column: 6 }, end: { line: 104, column: 25 } }, '54': { start: { line: 109, column: 6 }, end: { line: 109, column: 38 } }, '55': { start: { line: 110, column: 6 }, end: { line: 113, column: 7 } }, '56': { start: { line: 111, column: 8 }, end: { line: 111, column: 54 } }, '57': { start: { line: 112, column: 8 }, end: { line: 112, column: 25 } }, '58': { start: { line: 118, column: 6 }, end: { line: 121, column: 7 } }, '59': { start: { line: 119, column: 8 }, end: { line: 119, column: 27 } }, '60': { start: { line: 120, column: 8 }, end: { line: 120, column: 54 } }, '61': { start: { line: 122, column: 6 }, end: { line: 122, column: 25 } }, '62': { start: { line: 127, column: 6 }, end: { line: 127, column: 38 } }, '63': { start: { line: 128, column: 6 }, end: { line: 128, column: 34 } }, '64': { start: { line: 129, column: 6 }, end: { line: 132, column: 7 } }, '65': { start: { line: 130, column: 8 }, end: { line: 130, column: 54 } }, '66': { start: { line: 131, column: 8 }, end: { line: 131, column: 25 } }, '67': { start: { line: 137, column: 6 }, end: { line: 140, column: 7 } }, '68': { start: { line: 138, column: 8 }, end: { line: 138, column: 27 } }, '69': { start: { line: 139, column: 8 }, end: { line: 139, column: 76 } }, '70': { start: { line: 141, column: 6 }, end: { line: 143, column: 7 } }, '71': { start: { line: 142, column: 8 }, end: { line: 142, column: 26 } }, '72': { start: { line: 144, column: 6 }, end: { line: 144, column: 25 } }, '73': { start: { line: 153, column: 6 }, end: { line: 155, column: 7 } }, '74': { start: { line: 154, column: 8 }, end: { line: 154, column: 15 } }, '75': { start: { line: 156, column: 6 }, end: { line: 156, column: 38 } }, '76': { start: { line: 161, column: 6 }, end: { line: 163, column: 7 } }, '77': { start: { line: 162, column: 8 }, end: { line: 162, column: 15 } }, '78': { start: { line: 164, column: 6 }, end: { line: 164, column: 38 } }, '79': { start: { line: 170, column: 6 }, end: { line: 170, column: 53 } }, '80': { start: { line: 175, column: 6 }, end: { line: 175, column: 42 } }, '81': { start: { line: 180, column: 6 }, end: { line: 180, column: 40 } }, '82': { start: { line: 181, column: 6 }, end: { line: 181, column: 42 } }, '83': { start: { line: 182, column: 6 }, end: { line: 182, column: 25 } }, '84': { start: { line: 183, column: 6 }, end: { line: 183, column: 26 } }, '85': { start: { line: 184, column: 6 }, end: { line: 184, column: 38 } }, '86': { start: { line: 185, column: 6 }, end: { line: 185, column: 42 } }, '87': { start: { line: 186, column: 6 }, end: { line: 186, column: 25 } }, '88': { start: { line: 191, column: 6 }, end: { line: 191, column: 42 } }, '89': { start: { line: 196, column: 6 }, end: { line: 196, column: 37 } }, '90': { start: { line: 201, column: 6 }, end: { line: 201, column: 51 } }, '91': { start: { line: 204, column: 2 }, end: { line: 204, column: 26 } }, '92': { start: { line: 213, column: 22 }, end: { line: 213, column: 28 } }, '93': { start: { line: 215, column: 20 }, end: { line: 220, column: 1 } }, '94': { start: { line: 216, column: 2 }, end: { line: 218, column: 3 } }, '95': { start: { line: 217, column: 4 }, end: { line: 217, column: 45 } }, '96': { start: { line: 219, column: 2 }, end: { line: 219, column: 45 } }, '97': { start: { line: 223, column: 2 }, end: { line: 223, column: 35 } } }, fnMap: { '0': { name: 'chalkColor', decl: { start: { line: 4, column: 9 }, end: { line: 4, column: 19 } }, loc: { start: { line: 4, column: 26 }, end: { line: 12, column: 1 } }, line: 4 }, '1': { name: '(anonymous_1)', decl: { start: { line: 5, column: 33 }, end: { line: 5, column: 34 } }, loc: { start: { line: 5, column: 45 }, end: { line: 11, column: 3 } }, line: 5 }, '2': { name: '(anonymous_2)', decl: { start: { line: 24, column: 23 }, end: { line: 24, column: 24 } }, loc: { start: { line: 24, column: 49 }, end: { line: 205, column: 1 } }, line: 24 }, '3': { name: 'ConsoleFormatter', decl: { start: { line: 27, column: 11 }, end: { line: 27, column: 27 } }, loc: { start: { line: 27, column: 30 }, end: { line: 34, column: 3 } }, line: 27 }, '4': { name: 'prepareContext', decl: { start: { line: 38, column: 20 }, end: { line: 38, column: 34 } }, loc: { start: { line: 38, column: 44 }, end: { line: 70, column: 5 } }, line: 38 }, '5': { name: '(anonymous_5)', decl: { start: { line: 40, column: 23 }, end: { line: 40, column: 24 } }, loc: { start: { line: 40, column: 41 }, end: { line: 44, column: 7 } }, line: 40 }, '6': { name: '(anonymous_6)', decl: { start: { line: 45, column: 24 }, end: { line: 45, column: 25 } }, loc: { start: { line: 45, column: 36 }, end: { line: 47, column: 7 } }, line: 45 }, '7': { name: '(anonymous_7)', decl: { start: { line: 48, column: 20 }, end: { line: 48, column: 21 } }, loc: { start: { line: 48, column: 32 }, end: { line: 61, column: 7 } }, line: 48 }, '8': { name: '(anonymous_8)', decl: { start: { line: 62, column: 26 }, end: { line: 62, column: 27 } }, loc: { start: { line: 62, column: 43 }, end: { line: 65, column: 7 } }, line: 62 }, '9': { name: '(anonymous_9)', decl: { start: { line: 66, column: 25 }, end: { line: 66, column: 26 } }, loc: { start: { line: 66, column: 37 }, end: { line: 69, column: 7 } }, line: 66 }, '10': { name: 'typeFormattterErrorFormatter', decl: { start: { line: 73, column: 20 }, end: { line: 73, column: 48 } }, loc: { start: { line: 73, column: 63 }, end: { line: 77, column: 5 } }, line: 73 }, '11': { name: 'formatValue', decl: { start: { line: 80, column: 20 }, end: { line: 80, column: 31 } }, loc: { start: { line: 80, column: 48 }, end: { line: 82, column: 5 } }, line: 80 }, '12': { name: 'formatTextDiffString', decl: { start: { line: 85, column: 20 }, end: { line: 85, column: 40 } }, loc: { start: { line: 85, column: 57 }, end: { line: 105, column: 5 } }, line: 85 }, '13': { name: 'rootBegin', decl: { start: { line: 108, column: 20 }, end: { line: 108, column: 29 } }, loc: { start: { line: 108, column: 55 }, end: { line: 114, column: 5 } }, line: 108 }, '14': { name: 'rootEnd', decl: { start: { line: 117, column: 20 }, end: { line: 117, column: 27 } }, loc: { start: { line: 117, column: 53 }, end: { line: 123, column: 5 } }, line: 117 }, '15': { name: 'nodeBegin', decl: { start: { line: 126, column: 20 }, end: { line: 126, column: 29 } }, loc: { start: { line: 126, column: 69 }, end: { line: 133, column: 5 } }, line: 126 }, '16': { name: 'nodeEnd', decl: { start: { line: 136, column: 20 }, end: { line: 136, column: 27 } }, loc: { start: { line: 136, column: 75 }, end: { line: 145, column: 5 } }, line: 136 }, '17': { name: 'format_unchanged', decl: { start: { line: 152, column: 20 }, end: { line: 152, column: 36 } }, loc: { start: { line: 152, column: 59 }, end: { line: 157, column: 5 } }, line: 152 }, '18': { name: 'format_movedestination', decl: { start: { line: 160, column: 20 }, end: { line: 160, column: 42 } }, loc: { start: { line: 160, column: 65 }, end: { line: 165, column: 5 } }, line: 160 }, '19': { name: 'format_node', decl: { start: { line: 168, column: 20 }, end: { line: 168, column: 31 } }, loc: { start: { line: 168, column: 54 }, end: { line: 171, column: 5 } }, line: 168 }, '20': { name: 'format_added', decl: { start: { line: 174, column: 20 }, end: { line: 174, column: 32 } }, loc: { start: { line: 174, column: 49 }, end: { line: 176, column: 5 } }, line: 174 }, '21': { name: 'format_modified', decl: { start: { line: 179, column: 20 }, end: { line: 179, column: 35 } }, loc: { start: { line: 179, column: 52 }, end: { line: 187, column: 5 } }, line: 179 }, '22': { name: 'format_deleted', decl: { start: { line: 190, column: 20 }, end: { line: 190, column: 34 } }, loc: { start: { line: 190, column: 51 }, end: { line: 192, column: 5 } }, line: 190 }, '23': { name: 'format_moved', decl: { start: { line: 195, column: 20 }, end: { line: 195, column: 32 } }, loc: { start: { line: 195, column: 49 }, end: { line: 197, column: 5 } }, line: 195 }, '24': { name: 'format_textdiff', decl: { start: { line: 200, column: 20 }, end: { line: 200, column: 35 } }, loc: { start: { line: 200, column: 52 }, end: { line: 202, column: 5 } }, line: 200 }, '25': { name: 'format', decl: { start: { line: 215, column: 29 }, end: { line: 215, column: 35 } }, loc: { start: { line: 215, column: 49 }, end: { line: 220, column: 1 } }, line: 215 }, '26': { name: 'log', decl: { start: { line: 222, column: 16 }, end: { line: 222, column: 19 } }, loc: { start: { line: 222, column: 33 }, end: { line: 224, column: 1 } }, line: 222 } }, branchMap: { '0': { loc: { start: { line: 5, column: 9 }, end: { line: 11, column: 3 } }, type: 'binary-expr', locations: [{ start: { line: 5, column: 9 }, end: { line: 5, column: 14 } }, { start: { line: 5, column: 18 }, end: { line: 5, column: 29 } }, { start: { line: 5, column: 33 }, end: { line: 11, column: 3 } }], line: 5 }, '1': { loc: { start: { line: 30, column: 62 }, end: { line: 30, column: 131 } }, type: 'binary-expr', locations: [{ start: { line: 30, column: 62 }, end: { line: 30, column: 88 } }, { start: { line: 30, column: 92 }, end: { line: 30, column: 131 } }], line: 30 }, '2': { loc: { start: { line: 39, column: 23 }, end: { line: 39, column: 112 } }, type: 'binary-expr', locations: [{ start: { line: 39, column: 23 }, end: { line: 39, column: 59 } }, { start: { line: 39, column: 63 }, end: { line: 39, column: 112 } }], line: 39 }, '3': { loc: { start: { line: 41, column: 28 }, end: { line: 41, column: 49 } }, type: 'binary-expr', locations: [{ start: { line: 41, column: 28 }, end: { line: 41, column: 44 } }, { start: { line: 41, column: 48 }, end: { line: 41, column: 49 } }], line: 41 }, '4': { loc: { start: { line: 41, column: 54 }, end: { line: 41, column: 96 } }, type: 'cond-expr', locations: [{ start: { line: 41, column: 86 }, end: { line: 41, column: 87 } }, { start: { line: 41, column: 90 }, end: { line: 41, column: 96 } }], line: 41 }, '5': { loc: { start: { line: 46, column: 33 }, end: { line: 46, column: 53 } }, type: 'binary-expr', locations: [{ start: { line: 46, column: 33 }, end: { line: 46, column: 47 } }, { start: { line: 46, column: 51 }, end: { line: 46, column: 53 } }], line: 46 }, '6': { loc: { start: { line: 55, column: 40 }, end: { line: 55, column: 60 } }, type: 'binary-expr', locations: [{ start: { line: 55, column: 40 }, end: { line: 55, column: 54 } }, { start: { line: 55, column: 58 }, end: { line: 55, column: 60 } }], line: 55 }, '7': { loc: { start: { line: 56, column: 10 }, end: { line: 58, column: 11 } }, type: 'if', locations: [{ start: { line: 56, column: 10 }, end: { line: 58, column: 11 } }, { start: { line: 56, column: 10 }, end: { line: 58, column: 11 } }], line: 56 }, '8': { loc: { start: { line: 56, column: 14 }, end: { line: 56, column: 41 } }, type: 'binary-expr', locations: [{ start: { line: 56, column: 14 }, end: { line: 56, column: 24 } }, { start: { line: 56, column: 28 }, end: { line: 56, column: 41 } }], line: 56 }, '9': { loc: { start: { line: 63, column: 21 }, end: { line: 63, column: 37 } }, type: 'binary-expr', locations: [{ start: { line: 63, column: 21 }, end: { line: 63, column: 31 } }, { start: { line: 63, column: 35 }, end: { line: 63, column: 37 } }], line: 63 }, '10': { loc: { start: { line: 67, column: 21 }, end: { line: 67, column: 37 } }, type: 'binary-expr', locations: [{ start: { line: 67, column: 21 }, end: { line: 67, column: 31 } }, { start: { line: 67, column: 35 }, end: { line: 67, column: 37 } }], line: 67 }, '11': { loc: { start: { line: 100, column: 8 }, end: { line: 102, column: 9 } }, type: 'if', locations: [{ start: { line: 100, column: 8 }, end: { line: 102, column: 9 } }, { start: { line: 100, column: 8 }, end: { line: 102, column: 9 } }], line: 100 }, '12': { loc: { start: { line: 110, column: 6 }, end: { line: 113, column: 7 } }, type: 'if', locations: [{ start: { line: 110, column: 6 }, end: { line: 113, column: 7 } }, { start: { line: 110, column: 6 }, end: { line: 113, column: 7 } }], line: 110 }, '13': { loc: { start: { line: 111, column: 20 }, end: { line: 111, column: 52 } }, type: 'cond-expr', locations: [{ start: { line: 111, column: 43 }, end: { line: 111, column: 46 } }, { start: { line: 111, column: 49 }, end: { line: 111, column: 52 } }], line: 111 }, '14': { loc: { start: { line: 118, column: 6 }, end: { line: 121, column: 7 } }, type: 'if', locations: [{ start: { line: 118, column: 6 }, end: { line: 121, column: 7 } }, { start: { line: 118, column: 6 }, end: { line: 121, column: 7 } }], line: 118 }, '15': { loc: { start: { line: 120, column: 20 }, end: { line: 120, column: 52 } }, type: 'cond-expr', locations: [{ start: { line: 120, column: 43 }, end: { line: 120, column: 46 } }, { start: { line: 120, column: 49 }, end: { line: 120, column: 52 } }], line: 120 }, '16': { loc: { start: { line: 129, column: 6 }, end: { line: 132, column: 7 } }, type: 'if', locations: [{ start: { line: 129, column: 6 }, end: { line: 132, column: 7 } }, { start: { line: 129, column: 6 }, end: { line: 132, column: 7 } }], line: 129 }, '17': { loc: { start: { line: 130, column: 20 }, end: { line: 130, column: 52 } }, type: 'cond-expr', locations: [{ start: { line: 130, column: 43 }, end: { line: 130, column: 46 } }, { start: { line: 130, column: 49 }, end: { line: 130, column: 52 } }], line: 130 }, '18': { loc: { start: { line: 137, column: 6 }, end: { line: 140, column: 7 } }, type: 'if', locations: [{ start: { line: 137, column: 6 }, end: { line: 140, column: 7 } }, { start: { line: 137, column: 6 }, end: { line: 140, column: 7 } }], line: 137 }, '19': { loc: { start: { line: 139, column: 20 }, end: { line: 139, column: 74 } }, type: 'cond-expr', locations: [{ start: { line: 139, column: 43 }, end: { line: 139, column: 46 } }, { start: { line: 139, column: 49 }, end: { line: 139, column: 74 } }], line: 139 }, '20': { loc: { start: { line: 139, column: 56 }, end: { line: 139, column: 73 } }, type: 'cond-expr', locations: [{ start: { line: 139, column: 65 }, end: { line: 139, column: 67 } }, { start: { line: 139, column: 70 }, end: { line: 139, column: 73 } }], line: 139 }, '21': { loc: { start: { line: 141, column: 6 }, end: { line: 143, column: 7 } }, type: 'if', locations: [{ start: { line: 141, column: 6 }, end: { line: 143, column: 7 } }, { start: { line: 141, column: 6 }, end: { line: 143, column: 7 } }], line: 141 }, '22': { loc: { start: { line: 153, column: 6 }, end: { line: 155, column: 7 } }, type: 'if', locations: [{ start: { line: 153, column: 6 }, end: { line: 155, column: 7 } }, { start: { line: 153, column: 6 }, end: { line: 155, column: 7 } }], line: 153 }, '23': { loc: { start: { line: 161, column: 6 }, end: { line: 163, column: 7 } }, type: 'if', locations: [{ start: { line: 161, column: 6 }, end: { line: 163, column: 7 } }, { start: { line: 161, column: 6 }, end: { line: 163, column: 7 } }], line: 161 }, '24': { loc: { start: { line: 216, column: 2 }, end: { line: 218, column: 3 } }, type: 'if', locations: [{ start: { line: 216, column: 2 }, end: { line: 218, column: 3 } }, { start: { line: 216, column: 2 }, end: { line: 218, column: 3 } }], line: 216 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0, '32': 0, '33': 0, '34': 0, '35': 0, '36': 0, '37': 0, '38': 0, '39': 0, '40': 0, '41': 0, '42': 0, '43': 0, '44': 0, '45': 0, '46': 0, '47': 0, '48': 0, '49': 0, '50': 0, '51': 0, '52': 0, '53': 0, '54': 0, '55': 0, '56': 0, '57': 0, '58': 0, '59': 0, '60': 0, '61': 0, '62': 0, '63': 0, '64': 0, '65': 0, '66': 0, '67': 0, '68': 0, '69': 0, '70': 0, '71': 0, '72': 0, '73': 0, '74': 0, '75': 0, '76': 0, '77': 0, '78': 0, '79': 0, '80': 0, '81': 0, '82': 0, '83': 0, '84': 0, '85': 0, '86': 0, '87': 0, '88': 0, '89': 0, '90': 0, '91': 0, '92': 0, '93': 0, '94': 0, '95': 0, '96': 0, '97': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': 0, '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0 }, b: { '0': [0, 0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0], '5': [0, 0], '6': [0, 0], '7': [0, 0], '8': [0, 0], '9': [0, 0], '10': [0, 0], '11': [0, 0], '12': [0, 0], '13': [0, 0], '14': [0, 0], '15': [0, 0], '16': [0, 0], '17': [0, 0], '18': [0, 0], '19': [0, 0], '20': [0, 0], '21': [0, 0], '22': [0, 0], '23': [0, 0], '24': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();function chalkColor(name) {
  cov_ye0cg04jg.f[0]++;cov_ye0cg04jg.s[0]++;return (cov_ye0cg04jg.b[0][0]++, chalk) && (cov_ye0cg04jg.b[0][1]++, chalk[name]) || (cov_ye0cg04jg.b[0][2]++, function () {
    cov_ye0cg04jg.f[1]++;cov_ye0cg04jg.s[1]++;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      cov_ye0cg04jg.s[2]++;args[_key] = arguments[_key];
    }cov_ye0cg04jg.s[3]++;return args;
  });
}var colors = (cov_ye0cg04jg.s[4]++, { added: chalkColor('green'), deleted: chalkColor('red'), movedestination: chalkColor('gray'), moved: chalkColor('yellow'), unchanged: chalkColor('gray'), error: chalkColor('white.bgRed'), textDiffLine: chalkColor('gray') });var ConsoleFormatter = (cov_ye0cg04jg.s[5]++, function (_BaseFormatter) {
  cov_ye0cg04jg.f[2]++;cov_ye0cg04jg.s[6]++;inherits$1(ConsoleFormatter, _BaseFormatter);function ConsoleFormatter() {
    cov_ye0cg04jg.f[3]++;cov_ye0cg04jg.s[7]++;classCallCheck$1(this, ConsoleFormatter);var _this = (cov_ye0cg04jg.s[8]++, possibleConstructorReturn$1(this, ((cov_ye0cg04jg.b[1][0]++, ConsoleFormatter.__proto__) || (cov_ye0cg04jg.b[1][1]++, Object.getPrototypeOf(ConsoleFormatter))).call(this)));cov_ye0cg04jg.s[9]++;_this.includeMoveDestinations = false;cov_ye0cg04jg.s[10]++;return _this;
  }cov_ye0cg04jg.s[11]++;createClass$1(ConsoleFormatter, [{ key: 'prepareContext', value: function prepareContext(context) {
      cov_ye0cg04jg.f[4]++;cov_ye0cg04jg.s[12]++;get$1((cov_ye0cg04jg.b[2][0]++, ConsoleFormatter.prototype.__proto__) || (cov_ye0cg04jg.b[2][1]++, Object.getPrototypeOf(ConsoleFormatter.prototype)), 'prepareContext', this).call(this, context);cov_ye0cg04jg.s[13]++;context.indent = function (levels) {
        cov_ye0cg04jg.f[5]++;cov_ye0cg04jg.s[14]++;this.indentLevel = ((cov_ye0cg04jg.b[3][0]++, this.indentLevel) || (cov_ye0cg04jg.b[3][1]++, 0)) + (typeof levels === 'undefined' ? (cov_ye0cg04jg.b[4][0]++, 1) : (cov_ye0cg04jg.b[4][1]++, levels));cov_ye0cg04jg.s[15]++;this.indentPad = new Array(this.indentLevel + 1).join('  ');cov_ye0cg04jg.s[16]++;this.outLine();
      };cov_ye0cg04jg.s[17]++;context.outLine = function () {
        cov_ye0cg04jg.f[6]++;cov_ye0cg04jg.s[18]++;this.buffer.push('\n' + ((cov_ye0cg04jg.b[5][0]++, this.indentPad) || (cov_ye0cg04jg.b[5][1]++, '')));
      };cov_ye0cg04jg.s[19]++;context.out = function () {
        cov_ye0cg04jg.f[7]++;cov_ye0cg04jg.s[20]++;for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          cov_ye0cg04jg.s[21]++;args[_key2] = arguments[_key2];
        }cov_ye0cg04jg.s[22]++;for (var i = 0, l = args.length; i < l; i++) {
          var lines = (cov_ye0cg04jg.s[23]++, args[i].split('\n'));var text = (cov_ye0cg04jg.s[24]++, lines.join('\n' + ((cov_ye0cg04jg.b[6][0]++, this.indentPad) || (cov_ye0cg04jg.b[6][1]++, ''))));cov_ye0cg04jg.s[25]++;if ((cov_ye0cg04jg.b[8][0]++, this.color) && (cov_ye0cg04jg.b[8][1]++, this.color[0])) {
            cov_ye0cg04jg.b[7][0]++;cov_ye0cg04jg.s[26]++;text = this.color[0](text);
          } else {
            cov_ye0cg04jg.b[7][1]++;
          }cov_ye0cg04jg.s[27]++;this.buffer.push(text);
        }
      };cov_ye0cg04jg.s[28]++;context.pushColor = function (color) {
        cov_ye0cg04jg.f[8]++;cov_ye0cg04jg.s[29]++;this.color = (cov_ye0cg04jg.b[9][0]++, this.color) || (cov_ye0cg04jg.b[9][1]++, []);cov_ye0cg04jg.s[30]++;this.color.unshift(color);
      };cov_ye0cg04jg.s[31]++;context.popColor = function () {
        cov_ye0cg04jg.f[9]++;cov_ye0cg04jg.s[32]++;this.color = (cov_ye0cg04jg.b[10][0]++, this.color) || (cov_ye0cg04jg.b[10][1]++, []);cov_ye0cg04jg.s[33]++;this.color.shift();
      };
    } }, { key: 'typeFormattterErrorFormatter', value: function typeFormattterErrorFormatter(context, err) {
      cov_ye0cg04jg.f[10]++;cov_ye0cg04jg.s[34]++;context.pushColor(colors.error);cov_ye0cg04jg.s[35]++;context.out('[ERROR]' + err);cov_ye0cg04jg.s[36]++;context.popColor();
    } }, { key: 'formatValue', value: function formatValue(context, value) {
      cov_ye0cg04jg.f[11]++;cov_ye0cg04jg.s[37]++;context.out(JSON.stringify(value, null, 2));
    } }, { key: 'formatTextDiffString', value: function formatTextDiffString(context, value) {
      cov_ye0cg04jg.f[12]++;var lines = (cov_ye0cg04jg.s[38]++, this.parseTextDiff(value));cov_ye0cg04jg.s[39]++;context.indent();cov_ye0cg04jg.s[40]++;for (var i = 0, l = lines.length; i < l; i++) {
        var line = (cov_ye0cg04jg.s[41]++, lines[i]);cov_ye0cg04jg.s[42]++;context.pushColor(colors.textDiffLine);cov_ye0cg04jg.s[43]++;context.out(line.location.line + ',' + line.location.chr + ' ');cov_ye0cg04jg.s[44]++;context.popColor();var pieces = (cov_ye0cg04jg.s[45]++, line.pieces);cov_ye0cg04jg.s[46]++;for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
          var piece = (cov_ye0cg04jg.s[47]++, pieces[pieceIndex]);cov_ye0cg04jg.s[48]++;context.pushColor(colors[piece.type]);cov_ye0cg04jg.s[49]++;context.out(piece.text);cov_ye0cg04jg.s[50]++;context.popColor();
        }cov_ye0cg04jg.s[51]++;if (i < l - 1) {
          cov_ye0cg04jg.b[11][0]++;cov_ye0cg04jg.s[52]++;context.outLine();
        } else {
          cov_ye0cg04jg.b[11][1]++;
        }
      }cov_ye0cg04jg.s[53]++;context.indent(-1);
    } }, { key: 'rootBegin', value: function rootBegin(context, type, nodeType) {
      cov_ye0cg04jg.f[13]++;cov_ye0cg04jg.s[54]++;context.pushColor(colors[type]);cov_ye0cg04jg.s[55]++;if (type === 'node') {
        cov_ye0cg04jg.b[12][0]++;cov_ye0cg04jg.s[56]++;context.out(nodeType === 'array' ? (cov_ye0cg04jg.b[13][0]++, '[') : (cov_ye0cg04jg.b[13][1]++, '{'));cov_ye0cg04jg.s[57]++;context.indent();
      } else {
        cov_ye0cg04jg.b[12][1]++;
      }
    } }, { key: 'rootEnd', value: function rootEnd(context, type, nodeType) {
      cov_ye0cg04jg.f[14]++;cov_ye0cg04jg.s[58]++;if (type === 'node') {
        cov_ye0cg04jg.b[14][0]++;cov_ye0cg04jg.s[59]++;context.indent(-1);cov_ye0cg04jg.s[60]++;context.out(nodeType === 'array' ? (cov_ye0cg04jg.b[15][0]++, ']') : (cov_ye0cg04jg.b[15][1]++, '}'));
      } else {
        cov_ye0cg04jg.b[14][1]++;
      }cov_ye0cg04jg.s[61]++;context.popColor();
    } }, { key: 'nodeBegin', value: function nodeBegin(context, key, leftKey, type, nodeType) {
      cov_ye0cg04jg.f[15]++;cov_ye0cg04jg.s[62]++;context.pushColor(colors[type]);cov_ye0cg04jg.s[63]++;context.out(leftKey + ': ');cov_ye0cg04jg.s[64]++;if (type === 'node') {
        cov_ye0cg04jg.b[16][0]++;cov_ye0cg04jg.s[65]++;context.out(nodeType === 'array' ? (cov_ye0cg04jg.b[17][0]++, '[') : (cov_ye0cg04jg.b[17][1]++, '{'));cov_ye0cg04jg.s[66]++;context.indent();
      } else {
        cov_ye0cg04jg.b[16][1]++;
      }
    } }, { key: 'nodeEnd', value: function nodeEnd(context, key, leftKey, type, nodeType, isLast) {
      cov_ye0cg04jg.f[16]++;cov_ye0cg04jg.s[67]++;if (type === 'node') {
        cov_ye0cg04jg.b[18][0]++;cov_ye0cg04jg.s[68]++;context.indent(-1);cov_ye0cg04jg.s[69]++;context.out(nodeType === 'array' ? (cov_ye0cg04jg.b[19][0]++, ']') : (cov_ye0cg04jg.b[19][1]++, '}' + (isLast ? (cov_ye0cg04jg.b[20][0]++, '') : (cov_ye0cg04jg.b[20][1]++, ','))));
      } else {
        cov_ye0cg04jg.b[18][1]++;
      }cov_ye0cg04jg.s[70]++;if (!isLast) {
        cov_ye0cg04jg.b[21][0]++;cov_ye0cg04jg.s[71]++;context.outLine();
      } else {
        cov_ye0cg04jg.b[21][1]++;
      }cov_ye0cg04jg.s[72]++;context.popColor();
    } /* jshint camelcase: false */ /* eslint-disable camelcase */ }, { key: 'format_unchanged', value: function format_unchanged(context, delta, left) {
      cov_ye0cg04jg.f[17]++;cov_ye0cg04jg.s[73]++;if (typeof left === 'undefined') {
        cov_ye0cg04jg.b[22][0]++;cov_ye0cg04jg.s[74]++;return;
      } else {
        cov_ye0cg04jg.b[22][1]++;
      }cov_ye0cg04jg.s[75]++;this.formatValue(context, left);
    } }, { key: 'format_movedestination', value: function format_movedestination(context, delta, left) {
      cov_ye0cg04jg.f[18]++;cov_ye0cg04jg.s[76]++;if (typeof left === 'undefined') {
        cov_ye0cg04jg.b[23][0]++;cov_ye0cg04jg.s[77]++;return;
      } else {
        cov_ye0cg04jg.b[23][1]++;
      }cov_ye0cg04jg.s[78]++;this.formatValue(context, left);
    } }, { key: 'format_node', value: function format_node(context, delta, left) {
      cov_ye0cg04jg.f[19]++;cov_ye0cg04jg.s[79]++; // recurse
      this.formatDeltaChildren(context, delta, left);
    } }, { key: 'format_added', value: function format_added(context, delta) {
      cov_ye0cg04jg.f[20]++;cov_ye0cg04jg.s[80]++;this.formatValue(context, delta[0]);
    } }, { key: 'format_modified', value: function format_modified(context, delta) {
      cov_ye0cg04jg.f[21]++;cov_ye0cg04jg.s[81]++;context.pushColor(colors.deleted);cov_ye0cg04jg.s[82]++;this.formatValue(context, delta[0]);cov_ye0cg04jg.s[83]++;context.popColor();cov_ye0cg04jg.s[84]++;context.out(' => ');cov_ye0cg04jg.s[85]++;context.pushColor(colors.added);cov_ye0cg04jg.s[86]++;this.formatValue(context, delta[1]);cov_ye0cg04jg.s[87]++;context.popColor();
    } }, { key: 'format_deleted', value: function format_deleted(context, delta) {
      cov_ye0cg04jg.f[22]++;cov_ye0cg04jg.s[88]++;this.formatValue(context, delta[0]);
    } }, { key: 'format_moved', value: function format_moved(context, delta) {
      cov_ye0cg04jg.f[23]++;cov_ye0cg04jg.s[89]++;context.out('==> ' + delta[1]);
    } }, { key: 'format_textdiff', value: function format_textdiff(context, delta) {
      cov_ye0cg04jg.f[24]++;cov_ye0cg04jg.s[90]++;this.formatTextDiffString(context, delta[0]);
    } }]);cov_ye0cg04jg.s[91]++;return ConsoleFormatter;
}(BaseFormatter)); /* eslint-enable camelcase */var defaultInstance$3 = (cov_ye0cg04jg.s[92]++, void 0);cov_ye0cg04jg.s[93]++;var format$3 = function format(delta, left) {
  cov_ye0cg04jg.f[25]++;cov_ye0cg04jg.s[94]++;if (!defaultInstance$3) {
    cov_ye0cg04jg.b[24][0]++;cov_ye0cg04jg.s[95]++;defaultInstance$3 = new ConsoleFormatter();
  } else {
    cov_ye0cg04jg.b[24][1]++;
  }cov_ye0cg04jg.s[96]++;return defaultInstance$3.format(delta, left);
};function log$1(delta, left) {
  cov_ye0cg04jg.f[26]++;cov_ye0cg04jg.s[97]++;console.log(format$3(delta, left));
}

var console$1 = Object.freeze({
  default: ConsoleFormatter,
  format: format$3,
  log: log$1
});

var cov_1weqc1su9i = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/formatters/index.js',
      hash = 'c90281cbe3a6f4f9d6d07f59d6c3ec3cc53eab42',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/formatters/index.js', statementMap: {}, fnMap: {}, branchMap: {}, s: {}, f: {}, b: {}, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();

var index = Object.freeze({
  base: base,
  html: html,
  annotated: annotated,
  jsonpatch: jsonpatch,
  console: console$1
});

var cov_wclgz6xnr = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/date-reviver.js',
      hash = '327f769b790d8f76a1477ada73bfb6605beb67d0',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/date-reviver.js', statementMap: { '0': { start: { line: 3, column: 14 }, end: { line: 3, column: 20 } }, '1': { start: { line: 4, column: 2 }, end: { line: 10, column: 3 } }, '2': { start: { line: 6, column: 4 }, end: { line: 6, column: 113 } }, '3': { start: { line: 7, column: 4 }, end: { line: 9, column: 5 } }, '4': { start: { line: 8, column: 6 }, end: { line: 8, column: 120 } }, '5': { start: { line: 11, column: 2 }, end: { line: 11, column: 15 } } }, fnMap: { '0': { name: 'dateReviver', decl: { start: { line: 2, column: 24 }, end: { line: 2, column: 35 } }, loc: { start: { line: 2, column: 48 }, end: { line: 12, column: 1 } }, line: 2 } }, branchMap: { '0': { loc: { start: { line: 4, column: 2 }, end: { line: 10, column: 3 } }, type: 'if', locations: [{ start: { line: 4, column: 2 }, end: { line: 10, column: 3 } }, { start: { line: 4, column: 2 }, end: { line: 10, column: 3 } }], line: 4 }, '1': { loc: { start: { line: 7, column: 4 }, end: { line: 9, column: 5 } }, type: 'if', locations: [{ start: { line: 7, column: 4 }, end: { line: 9, column: 5 } }, { start: { line: 7, column: 4 }, end: { line: 9, column: 5 } }], line: 7 }, '2': { loc: { start: { line: 8, column: 103 }, end: { line: 8, column: 116 } }, type: 'binary-expr', locations: [{ start: { line: 8, column: 103 }, end: { line: 8, column: 111 } }, { start: { line: 8, column: 115 }, end: { line: 8, column: 116 } }], line: 8 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }, f: { '0': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}(); // use as 2nd parameter for JSON.parse to revive Date instances
var cov_21a97a3n44 = function () {
  var path = '/Users/benja/proj/jsondiffpatch/src/main.js',
      hash = 'bae27349c61262eea6c8eeba2b90d234b62b4662',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = { path: '/Users/benja/proj/jsondiffpatch/src/main.js', statementMap: { '0': { start: { line: 11, column: 2 }, end: { line: 11, column: 34 } }, '1': { start: { line: 18, column: 22 }, end: { line: 18, column: 28 } }, '2': { start: { line: 21, column: 2 }, end: { line: 23, column: 3 } }, '3': { start: { line: 22, column: 4 }, end: { line: 22, column: 40 } }, '4': { start: { line: 24, column: 2 }, end: { line: 24, column: 64 } }, '5': { start: { line: 28, column: 2 }, end: { line: 30, column: 3 } }, '6': { start: { line: 29, column: 4 }, end: { line: 29, column: 40 } }, '7': { start: { line: 31, column: 2 }, end: { line: 31, column: 65 } }, '8': { start: { line: 35, column: 2 }, end: { line: 37, column: 3 } }, '9': { start: { line: 36, column: 4 }, end: { line: 36, column: 40 } }, '10': { start: { line: 38, column: 2 }, end: { line: 38, column: 67 } }, '11': { start: { line: 42, column: 2 }, end: { line: 44, column: 3 } }, '12': { start: { line: 43, column: 4 }, end: { line: 43, column: 40 } }, '13': { start: { line: 45, column: 2 }, end: { line: 45, column: 67 } }, '14': { start: { line: 49, column: 2 }, end: { line: 51, column: 3 } }, '15': { start: { line: 50, column: 4 }, end: { line: 50, column: 40 } }, '16': { start: { line: 52, column: 2 }, end: { line: 52, column: 65 } } }, fnMap: { '0': { name: 'create', decl: { start: { line: 10, column: 16 }, end: { line: 10, column: 22 } }, loc: { start: { line: 10, column: 32 }, end: { line: 12, column: 1 } }, line: 10 }, '1': { name: 'diff', decl: { start: { line: 20, column: 16 }, end: { line: 20, column: 20 } }, loc: { start: { line: 20, column: 23 }, end: { line: 25, column: 1 } }, line: 20 }, '2': { name: 'patch', decl: { start: { line: 27, column: 16 }, end: { line: 27, column: 21 } }, loc: { start: { line: 27, column: 24 }, end: { line: 32, column: 1 } }, line: 27 }, '3': { name: 'unpatch', decl: { start: { line: 34, column: 16 }, end: { line: 34, column: 23 } }, loc: { start: { line: 34, column: 26 }, end: { line: 39, column: 1 } }, line: 34 }, '4': { name: 'reverse', decl: { start: { line: 41, column: 16 }, end: { line: 41, column: 23 } }, loc: { start: { line: 41, column: 26 }, end: { line: 46, column: 1 } }, line: 41 }, '5': { name: 'clone', decl: { start: { line: 48, column: 16 }, end: { line: 48, column: 21 } }, loc: { start: { line: 48, column: 24 }, end: { line: 53, column: 1 } }, line: 48 } }, branchMap: { '0': { loc: { start: { line: 21, column: 2 }, end: { line: 23, column: 3 } }, type: 'if', locations: [{ start: { line: 21, column: 2 }, end: { line: 23, column: 3 } }, { start: { line: 21, column: 2 }, end: { line: 23, column: 3 } }], line: 21 }, '1': { loc: { start: { line: 28, column: 2 }, end: { line: 30, column: 3 } }, type: 'if', locations: [{ start: { line: 28, column: 2 }, end: { line: 30, column: 3 } }, { start: { line: 28, column: 2 }, end: { line: 30, column: 3 } }], line: 28 }, '2': { loc: { start: { line: 35, column: 2 }, end: { line: 37, column: 3 } }, type: 'if', locations: [{ start: { line: 35, column: 2 }, end: { line: 37, column: 3 } }, { start: { line: 35, column: 2 }, end: { line: 37, column: 3 } }], line: 35 }, '3': { loc: { start: { line: 42, column: 2 }, end: { line: 44, column: 3 } }, type: 'if', locations: [{ start: { line: 42, column: 2 }, end: { line: 44, column: 3 } }, { start: { line: 42, column: 2 }, end: { line: 44, column: 3 } }], line: 42 }, '4': { loc: { start: { line: 49, column: 2 }, end: { line: 51, column: 3 } }, type: 'if', locations: [{ start: { line: 49, column: 2 }, end: { line: 51, column: 3 } }, { start: { line: 49, column: 2 }, end: { line: 51, column: 3 } }], line: 49 } }, s: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0 }, f: { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }, b: { '0': [0, 0], '1': [0, 0], '2': [0, 0], '3': [0, 0], '4': [0, 0] }, _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c' },
      coverage = global[gcv] || (global[gcv] = {});if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }coverageData.hash = hash;return coverage[path] = coverageData;
}();var defaultInstance$4 = (cov_21a97a3n44.s[1]++, void 0);function diff() {
  cov_21a97a3n44.f[1]++;cov_21a97a3n44.s[2]++;if (!defaultInstance$4) {
    cov_21a97a3n44.b[0][0]++;cov_21a97a3n44.s[3]++;defaultInstance$4 = new DiffPatcher();
  } else {
    cov_21a97a3n44.b[0][1]++;
  }cov_21a97a3n44.s[4]++;return defaultInstance$4.diff.apply(defaultInstance$4, arguments);
}function patch() {
  cov_21a97a3n44.f[2]++;cov_21a97a3n44.s[5]++;if (!defaultInstance$4) {
    cov_21a97a3n44.b[1][0]++;cov_21a97a3n44.s[6]++;defaultInstance$4 = new DiffPatcher();
  } else {
    cov_21a97a3n44.b[1][1]++;
  }cov_21a97a3n44.s[7]++;return defaultInstance$4.patch.apply(defaultInstance$4, arguments);
}function unpatch() {
  cov_21a97a3n44.f[3]++;cov_21a97a3n44.s[8]++;if (!defaultInstance$4) {
    cov_21a97a3n44.b[2][0]++;cov_21a97a3n44.s[9]++;defaultInstance$4 = new DiffPatcher();
  } else {
    cov_21a97a3n44.b[2][1]++;
  }cov_21a97a3n44.s[10]++;return defaultInstance$4.unpatch.apply(defaultInstance$4, arguments);
}function reverse() {
  cov_21a97a3n44.f[4]++;cov_21a97a3n44.s[11]++;if (!defaultInstance$4) {
    cov_21a97a3n44.b[3][0]++;cov_21a97a3n44.s[12]++;defaultInstance$4 = new DiffPatcher();
  } else {
    cov_21a97a3n44.b[3][1]++;
  }cov_21a97a3n44.s[13]++;return defaultInstance$4.reverse.apply(defaultInstance$4, arguments);
}function clone$1() {
  cov_21a97a3n44.f[5]++;cov_21a97a3n44.s[14]++;if (!defaultInstance$4) {
    cov_21a97a3n44.b[4][0]++;cov_21a97a3n44.s[15]++;defaultInstance$4 = new DiffPatcher();
  } else {
    cov_21a97a3n44.b[4][1]++;
  }cov_21a97a3n44.s[16]++;return defaultInstance$4.clone.apply(defaultInstance$4, arguments);
}

var examples = {};

var exampleDate = function exampleDate() {
  return new Date(2020, 10, 30, 15, 10, 3);
};

/* jshint camelcase: false */
/* jshint multistr: true */

examples.atomicValues = [
// undefined
{
  left: undefined,
  right: undefined,
  delta: undefined,
  reverse: undefined
}, {
  left: undefined,
  right: null,
  delta: [null],
  reverse: [null, 0, 0]
}, {
  left: undefined,
  right: false,
  delta: [false],
  reverse: [false, 0, 0]
}, {
  left: undefined,
  right: true,
  delta: [true],
  reverse: [true, 0, 0]
}, {
  left: undefined,
  right: 42,
  delta: [42],
  reverse: [42, 0, 0]
}, {
  left: undefined,
  right: 'some text',
  delta: ['some text'],
  reverse: ['some text', 0, 0]
}, {
  left: undefined,
  right: exampleDate(),
  delta: [exampleDate()],
  reverse: [exampleDate(), 0, 0]
}, {
  left: undefined,
  right: {
    a: 1,
    b: 2
  },
  delta: [{
    a: 1,
    b: 2
  }],
  reverse: [{
    a: 1,
    b: 2
  }, 0, 0]
}, {
  left: undefined,
  right: [1, 2, 3],
  delta: [[1, 2, 3]],
  reverse: [[1, 2, 3], 0, 0]
}, {
  left: undefined,
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
},

// null
{
  left: null,
  right: null,
  delta: undefined,
  reverse: undefined
}, {
  left: null,
  right: false,
  delta: [null, false],
  reverse: [false, null]
}, {
  left: null,
  right: true,
  delta: [null, true],
  reverse: [true, null]
}, {
  left: null,
  right: 42,
  delta: [null, 42],
  reverse: [42, null]
}, {
  left: null,
  right: 'some text',
  delta: [null, 'some text'],
  reverse: ['some text', null]
}, {
  left: null,
  right: exampleDate(),
  delta: [null, exampleDate()],
  reverse: [exampleDate(), null]
}, {
  left: null,
  right: {
    a: 1,
    b: 2
  },
  delta: [null, {
    a: 1,
    b: 2
  }],
  reverse: [{
    a: 1,
    b: 2
  }, null]
}, {
  left: null,
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
},

// false
{
  left: false,
  right: false,
  delta: undefined,
  reverse: undefined
}, {
  left: false,
  right: true,
  delta: [false, true],
  reverse: [true, false]
}, {
  left: false,
  right: 42,
  delta: [false, 42],
  reverse: [42, false]
}, {
  left: false,
  right: 'some text',
  delta: [false, 'some text'],
  reverse: ['some text', false]
}, {
  left: false,
  right: exampleDate(),
  delta: [false, exampleDate()],
  reverse: [exampleDate(), false]
}, {
  left: false,
  right: {
    a: 1,
    b: 2
  },
  delta: [false, {
    a: 1,
    b: 2
  }],
  reverse: [{
    a: 1,
    b: 2
  }, false]
}, {
  left: false,
  right: [1, 2, 3],
  delta: [false, [1, 2, 3]],
  reverse: [[1, 2, 3], false]
}, {
  left: false,
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
},

// true
{
  left: true,
  right: true,
  delta: undefined,
  reverse: undefined
}, {
  left: true,
  right: 42,
  delta: [true, 42],
  reverse: [42, true]
}, {
  left: true,
  right: 'some text',
  delta: [true, 'some text'],
  reverse: ['some text', true]
}, {
  left: true,
  right: exampleDate(),
  delta: [true, exampleDate()],
  reverse: [exampleDate(), true]
}, {
  left: true,
  right: {
    a: 1,
    b: 2
  },
  delta: [true, {
    a: 1,
    b: 2
  }],
  reverse: [{
    a: 1,
    b: 2
  }, true]
}, {
  left: true,
  right: [1, 2, 3],
  delta: [true, [1, 2, 3]],
  reverse: [[1, 2, 3], true]
}, {
  left: true,
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
},

// number
{
  name: 'number -> same number',
  left: 42,
  right: 42,
  delta: undefined,
  reverse: undefined
}, {
  left: 42,
  right: -1,
  delta: [42, -1],
  reverse: [-1, 42]
}, {
  left: 42,
  right: 'some text',
  delta: [42, 'some text'],
  reverse: ['some text', 42]
}, {
  left: 42,
  right: exampleDate(),
  delta: [42, exampleDate()],
  reverse: [exampleDate(), 42]
}, {
  left: 42,
  right: {
    a: 1,
    b: 2
  },
  delta: [42, {
    a: 1,
    b: 2
  }],
  reverse: [{
    a: 1,
    b: 2
  }, 42]
}, {
  left: 42,
  right: [1, 2, 3],
  delta: [42, [1, 2, 3]],
  reverse: [[1, 2, 3], 42]
}, {
  left: 42,
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
},

// string
{
  name: 'string -> same string',
  left: 'some text',
  right: 'some text',
  delta: undefined,
  reverse: undefined
}, {
  left: 'some text',
  right: 'some fext',
  delta: ['some text', 'some fext'],
  reverse: ['some fext', 'some text']
}, {
  left: 'some text',
  right: exampleDate(),
  delta: ['some text', exampleDate()],
  reverse: [exampleDate(), 'some text']
}, {
  left: 'some text',
  right: {
    a: 1,
    b: 2
  },
  delta: ['some text', {
    a: 1,
    b: 2
  }],
  reverse: [{
    a: 1,
    b: 2
  }, 'some text']
}, {
  left: 'some text',
  right: [1, 2, 3],
  delta: ['some text', [1, 2, 3]],
  reverse: [[1, 2, 3], 'some text']
},

// Date
{
  name: 'Date -> same Date',
  left: exampleDate(),
  right: exampleDate(),
  delta: undefined,
  reverse: undefined
}, {
  left: exampleDate(),
  right: new Date(2020, 5, 31, 15, 12, 30),
  delta: [exampleDate(), new Date(2020, 5, 31, 15, 12, 30)],
  reverse: [new Date(2020, 5, 31, 15, 12, 30), exampleDate()]
}, {
  left: exampleDate(),
  right: {
    a: 1,
    b: 2
  },
  delta: [exampleDate(), {
    a: 1,
    b: 2
  }],
  reverse: [{
    a: 1,
    b: 2
  }, exampleDate()]
}, {
  left: exampleDate(),
  right: [1, 2, 3],
  delta: [exampleDate(), [1, 2, 3]],
  reverse: [[1, 2, 3], exampleDate()]
}, {
  left: exampleDate(),
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
},

// Function
{
  name: 'string -> Function',
  left: 'some text',
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
},

// RegExp
{
  name: 'RegExp -> RegExp',
  left: /regex/g,
  right: /another regex/gi,
  delta: ['/regex/g', '/another regex/gi'],
  reverse: ['/another regex/gi', '/regex/g']
},

// object
{
  name: 'object -> same object',
  left: {
    a: 1,
    b: 2
  },
  right: {
    a: 1,
    b: 2
  },
  delta: undefined,
  reverse: undefined
}, {
  left: {
    a: 1,
    b: 2
  },
  right: [1, 2, 3],
  delta: [{
    a: 1,
    b: 2
  }, [1, 2, 3]],
  reverse: [[1, 2, 3], {
    a: 1,
    b: 2
  }]
}, {
  left: {
    a: 1,
    b: 2
  },
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
},

// array
{
  name: 'array -> same array',
  left: [1, 2, 3],
  right: [1, 2, 3],
  delta: undefined,
  reverse: undefined
}, {
  left: [1, 2, 3],
  right: function right(x) {
    return x * x;
  },

  error: /not supported/
}, 0];

var shortText = 'Madre,\ncuando yo sea grande\nquisiera hacer versos';
var largeText = '-Madre,\ncuando yo sea grande\nser\xE9 marinero.\n\nAhora estoy jugando\nque aquello es un puerto\ny que \xE9ste es un barco\ny \xE9stos son dos remos\ny por ese r\xEDo\nnavego y navego.\n\n(Agua, arena, piedras\ny dos palos viejos:\nun r\xEDo y un barco,\nun puerto y dos remos).\n\n-Madre,\ncuando yo sea grande\nser\xE9 jardinero.\n\nAhora estoy jugando\nque esto es un cantero,\naqu\xE9l un rosal,\n\xE9ste un jazminero\ny \xE9se es un camino\nque va por el medio.\n\n(Tierra, flores, hojas\ny unos tallos secos:\ncantero, camino,\nrosal, jazminero).\n\n-Madre,\ncuando yo sea grande\nquisiera hacer versos.\n\n-\xBFCon qu\xE9 est\xE1s jugando?\n\n-Madre, miro el cielo.\n\n(En dos ojos claros\ntodo el Universo).';

examples.text = [{
  left: shortText,
  right: largeText,
  delta: [shortText, largeText],
  reverse: [largeText, shortText]
}, {
  left: largeText,
  right: largeText.replace(/jazminero/g, 'rosal'),
  delta: ['@@ -360,25 +360,21 @@\n %C3%A9ste un \n-jazminero\n+rosal' + '\n %0Ay %C3%A9se e\n@@ -479,17 +479,13 @@\n' + ' al, \n-jazminero\n+rosal\n ).%0A%0A\n', 0, 2],
  reverse: ['@@ -360,21 +360,25 @@\n %C3%A9ste un \n-rosal\n+jazminero\n %0Ay' + ' %C3%A9se e\n@@ -479,21 +479,25 @@\n %0Arosal,' + ' \n-rosal\n+jazminero\n ).%0A%0A-Mad\n', 0, 2],
  exactReverse: false
}, {
  name: 'larger than min length',
  options: {
    textDiff: {
      minLength: 10
    }
  },
  left: largeText.substr(0, 10),
  right: largeText.substr(0, 11).replace(/Madre/g, 'Padre'),
  delta: ['@@ -1,10 +1,11 @@\n -\n-M\n+P\n adre,%0Acu\n+a\n', 0, 2],
  reverse: ['@@ -1,11 +1,10 @@\n -\n-P\n+M\n adre,%0Acu\n-a\n', 0, 2],
  exactReverse: false
}, {
  name: 'shorter than min length',
  options: {
    textDiff: {
      minLength: 10
    }
  },
  left: largeText.substr(0, 9),
  right: largeText.substr(0, 11).replace(/Madre/g, 'Padre'),
  delta: ['-Madre,\nc', '-Padre,\ncua'],
  reverse: ['-Padre,\ncua', '-Madre,\nc'],
  exactReverse: false
}, 0];

examples.objects = [{
  name: 'first level',
  left: {
    a: 1,
    b: 2
  },
  right: {
    a: 42,
    b: 2
  },
  delta: {
    a: [1, 42]
  },
  reverse: {
    a: [42, 1]
  }
}, {
  name: 'deep level',
  left: {
    a: {
      j: {
        k: {
          l: {
            m: {
              n: {
                o: 3
              }
            }
          }
        }
      }
    },
    b: 2
  },
  right: {
    a: {
      j: {
        k: {
          l: {
            m: {
              n: {
                o: true
              }
            }
          }
        }
      }
    },
    b: 2
  },
  delta: {
    a: {
      j: {
        k: {
          l: {
            m: {
              n: {
                o: [3, true]
              }
            }
          }
        }
      }
    }
  },
  reverse: {
    a: {
      j: {
        k: {
          l: {
            m: {
              n: {
                o: [true, 3]
              }
            }
          }
        }
      }
    }
  }
}, {
  name: 'multiple changes',
  left: {
    a: {
      j: {
        k: {
          l: {
            m: {
              n: {
                o: 3
              }
            }
          }
        }
      }
    },
    b: 2,
    c: 5
  },
  right: {
    a: {
      j: {
        k: {
          l: {
            m: {
              n: {
                o: 5,
                w: 12
              }
            }
          }
        }
      }
    },
    b: 2
  },
  delta: {
    a: {
      j: {
        k: {
          l: {
            m: {
              n: {
                o: [3, 5],
                w: [12]
              }
            }
          }
        }
      }
    },
    c: [5, 0, 0]
  },
  reverse: {
    a: {
      j: {
        k: {
          l: {
            m: {
              n: {
                o: [5, 3],
                w: [12, 0, 0]
              }
            }
          }
        }
      }
    },
    c: [5]
  }
}, {
  name: 'key removed',
  left: {
    a: 1,
    b: 2
  },
  right: {
    a: 1
  },
  delta: {
    b: [2, 0, 0]
  },
  reverse: {
    b: [2]
  }
}, {
  name: 'hasOwnProperty',
  /* jshint ignore:start */
  left: {
    hasOwnProperty: true
  },
  right: {
    hasOwnProperty: true
  }
  /* jshint ignore:end */
}, 0];

examples.arrays = [{
  name: 'simple values',
  left: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  right: [1, 3, 4, 5, 8, 9, 9.1, 10],
  delta: {
    _t: 'a',
    _1: [2, 0, 0],
    _5: [6, 0, 0],
    _6: [7, 0, 0],
    6: [9.1]
  },
  reverse: {
    _t: 'a',
    1: [2],
    5: [6],
    6: [7],
    _6: [9.1, 0, 0]
  }
}, {
  name: 'added block',
  left: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  right: [1, 2, 3, 4, 5, 5.1, 5.2, 5.3, 6, 7, 8, 9, 10],
  delta: {
    _t: 'a',
    5: [5.1],
    6: [5.2],
    7: [5.3]
  },
  reverse: {
    _t: 'a',
    _5: [5.1, 0, 0],
    _6: [5.2, 0, 0],
    _7: [5.3, 0, 0]
  }
}, {
  name: 'movements',
  left: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  right: [1, 2, 3, 7, 5, 6, 8, 9, 4, 10],
  delta: {
    _t: 'a',
    _3: ['', 8, 3],
    _6: ['', 3, 3]
  },
  reverse: {
    _t: 'a',
    _3: ['', 6, 3],
    _8: ['', 3, 3]
  }
}, {
  name: 'movements(2)',
  left: [1, 2, 3, 4],
  right: [2, 4, 1, 3],
  delta: {
    _t: 'a',
    _1: ['', 0, 3],
    _3: ['', 1, 3]
  },
  reverse: {
    _t: 'a',
    _2: ['', 0, 3],
    _3: ['', 2, 3]
  },
  exactReverse: false
}, {
  name: 'nested',
  options: {
    objectHash: function objectHash(obj) {
      if (obj && obj.id) {
        return obj.id;
      }
    }
  },
  left: [1, 2, {
    id: 4,
    width: 10
  }, 4, {
    id: 'five',
    width: 4
  }, 6, 7, 8, 9, 10],
  right: [1, 2, {
    id: 4,
    width: 12
  }, 4, {
    id: 'five',
    width: 4
  }, 6, 7, 8, 9, 10],
  delta: {
    _t: 'a',
    2: {
      width: [10, 12]
    }
  },
  reverse: {
    _t: 'a',
    2: {
      width: [12, 10]
    }
  }
}, {
  name: 'nested with movement',
  options: {
    objectHash: function objectHash(obj) {
      if (obj && obj.id) {
        return obj.id;
      }
    }
  },
  left: [1, 2, 4, {
    id: 'five',
    width: 4
  }, 6, 7, 8, {
    id: 4,
    width: 10,
    height: 3
  }, 9, 10],
  right: [1, 2, {
    id: 4,
    width: 12
  }, 4, {
    id: 'five',
    width: 4
  }, 6, 7, 8, 9, 10],
  delta: {
    _t: 'a',
    2: {
      width: [10, 12],
      height: [3, 0, 0]
    },
    _7: ['', 2, 3]
  },
  reverse: {
    _t: 'a',
    7: {
      width: [12, 10],
      height: [3]
    },
    _2: ['', 7, 3]
  }
}, {
  name: 'nested changes among array insertions and deletions',
  options: {
    objectHash: function objectHash(obj) {
      if (obj && obj.id) {
        return obj.id;
      }
    }
  },
  left: [{
    id: 1
  }, {
    id: 2
  }, {
    id: 4
  }, {
    id: 5
  }, {
    id: 6,
    inner: {
      property: 'abc'
    }
  }, {
    id: 7
  }, {
    id: 8
  }, {
    id: 10
  }, {
    id: 11
  }, {
    id: 12
  }],
  right: [{
    id: 3
  }, {
    id: 4
  }, {
    id: 6,
    inner: {
      property: 'abcd'
    }
  }, {
    id: 9
  }],
  delta: {
    _t: 'a',
    0: [{ id: 3 }],
    2: {
      inner: {
        property: ['abc', 'abcd']
      }
    },
    3: [{ id: 9 }],
    _0: [{ id: 1 }, 0, 0],
    _1: [{ id: 2 }, 0, 0],
    _3: [{ id: 5 }, 0, 0],
    _5: [{ id: 7 }, 0, 0],
    _6: [{ id: 8 }, 0, 0],
    _7: [{ id: 10 }, 0, 0],
    _8: [{ id: 11 }, 0, 0],
    _9: [{ id: 12 }, 0, 0]
  },
  reverse: {
    _t: 'a',
    0: [{ id: 1 }],
    1: [{ id: 2 }],
    3: [{ id: 5 }],
    4: {
      inner: {
        property: ['abcd', 'abc']
      }
    },
    5: [{ id: 7 }],
    6: [{ id: 8 }],
    7: [{ id: 10 }],
    8: [{ id: 11 }],
    9: [{ id: 12 }],
    _0: [{ id: 3 }, 0, 0],
    _3: [{ id: 9 }, 0, 0]
  }
}, {
  name: 'nested change with item moved above',
  options: {
    objectHash: function objectHash(obj) {
      if (obj && obj.id) {
        return obj.id;
      }
    }
  },
  left: [{
    id: 1
  }, {
    id: 2
  }, {
    id: 3,
    inner: {
      property: 'abc'
    }
  }, {
    id: 4
  }, {
    id: 5
  }, {
    id: 6
  }],
  right: [{
    id: 1
  }, {
    id: 2
  }, {
    id: 6
  }, {
    id: 3,
    inner: {
      property: 'abcd'
    }
  }, {
    id: 4
  }, {
    id: 5
  }],
  delta: {
    _t: 'a',
    3: {
      inner: {
        property: ['abc', 'abcd']
      }
    },
    _5: ['', 2, 3]
  },
  reverse: {
    _t: 'a',
    2: {
      inner: {
        property: ['abcd', 'abc']
      }
    },
    _2: ['', 5, 3]
  }
}, {
  name: 'nested change with item moved right above',
  options: {
    objectHash: function objectHash(obj) {
      if (obj && obj.id) {
        return obj.id;
      }
    }
  },
  left: [{
    id: 1
  }, {
    id: 2,
    inner: {
      property: 'abc'
    }
  }, {
    id: 3
  }],
  right: [{
    id: 1
  }, {
    id: 3
  }, {
    id: 2,
    inner: {
      property: 'abcd'
    }
  }],
  delta: {
    _t: 'a',
    2: {
      inner: {
        property: ['abc', 'abcd']
      }
    },
    _2: ['', 1, 3]
  },
  reverse: {
    _t: 'a',
    1: {
      inner: {
        property: ['abcd', 'abc']
      }
    },
    _2: ['', 1, 3]
  },
  exactReverse: false
}, {
  name: 'nested change with item moved right below',
  options: {
    objectHash: function objectHash(obj) {
      if (obj && obj.id) {
        return obj.id;
      }
    }
  },
  left: [{
    id: 1
  }, {
    id: 2
  }, {
    id: 3,
    inner: {
      property: 'abc'
    }
  }, {
    id: 4
  }],
  right: [{
    id: 2
  }, {
    id: 3,
    inner: {
      property: 'abcd'
    }
  }, {
    id: 1
  }, {
    id: 4
  }],
  delta: {
    _t: 'a',
    1: {
      inner: {
        property: ['abc', 'abcd']
      }
    },
    _0: ['', 2, 3]
  },
  reverse: {
    _t: 'a',
    2: {
      inner: {
        property: ['abcd', 'abc']
      }
    },
    _2: ['', 0, 3]
  }
}, {
  name: 'nested with movements using custom objectHash',
  options: {
    objectHash: function objectHash(obj) {
      if (obj && obj.itemKey) {
        return obj.itemKey;
      }
    }
  },
  left: [1, 2, 4, {
    itemKey: 'five',
    width: 4
  }, 6, 7, 8, {
    itemKey: 4,
    width: 10,
    height: 3
  }, 9, 10],
  right: [1, 2, {
    itemKey: 4,
    width: 12
  }, 4, {
    itemKey: 'five',
    width: 4
  }, 6, 7, 8, 9, 10],
  delta: {
    _t: 'a',
    2: {
      width: [10, 12],
      height: [3, 0, 0]
    },
    _7: ['', 2, 3]
  },
  reverse: {
    _t: 'a',
    7: {
      width: [12, 10],
      height: [3]
    },
    _2: ['', 7, 3]
  }
}, {
  name: 'using property filter',
  options: {
    propertyFilter: function propertyFilter(name /*, context */) {
      return name.slice(0, 1) !== '$';
    }
  },
  left: {
    inner: {
      $volatileData: 345,
      $oldVolatileData: 422,
      nonVolatile: 432
    }
  },
  right: {
    inner: {
      $volatileData: 346,
      $newVolatileData: 32,
      nonVolatile: 431
    }
  },
  delta: {
    inner: {
      nonVolatile: [432, 431]
    }
  },
  reverse: {
    inner: {
      nonVolatile: [431, 432]
    }
  },
  noPatch: true
}, 0];

/*!
 * assertion-error
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Return a function that will copy properties from
 * one object to another excluding any originally
 * listed. Returned function will create a new `{}`.
 *
 * @param {String} excluded properties ...
 * @return {Function}
 */

function exclude () {
  var excludes = [].slice.call(arguments);

  function excludeProps (res, obj) {
    Object.keys(obj).forEach(function (key) {
      if (!~excludes.indexOf(key)) res[key] = obj[key];
    });
  }

  return function extendExclude () {
    var args = [].slice.call(arguments)
      , i = 0
      , res = {};

    for (; i < args.length; i++) {
      excludeProps(res, args[i]);
    }

    return res;
  };
}

/*!
 * Primary Exports
 */

var assertionError = AssertionError;

/**
 * ### AssertionError
 *
 * An extension of the JavaScript `Error` constructor for
 * assertion and validation scenarios.
 *
 * @param {String} message
 * @param {Object} properties to include (optional)
 * @param {callee} start stack function (optional)
 */

function AssertionError (message, _props, ssf) {
  var extend = exclude('name', 'message', 'stack', 'constructor', 'toJSON')
    , props = extend(_props || {});

  // default values
  this.message = message || 'Unspecified AssertionError';
  this.showDiff = false;

  // copy from properties
  for (var key in props) {
    this[key] = props[key];
  }

  // capture stack trace
  ssf = ssf || AssertionError;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ssf);
  } else {
    try {
      throw new Error();
    } catch(e) {
      this.stack = e.stack;
    }
  }
}

/*!
 * Inherit from Error.prototype
 */

AssertionError.prototype = Object.create(Error.prototype);

/*!
 * Statically set name
 */

AssertionError.prototype.name = 'AssertionError';

/*!
 * Ensure correct constructor
 */

AssertionError.prototype.constructor = AssertionError;

/**
 * Allow errors to be converted to JSON for static transfer.
 *
 * @param {Boolean} include stack (default: `true`)
 * @return {Object} object that can be `JSON.stringify`
 */

AssertionError.prototype.toJSON = function (stack) {
  var extend = exclude('constructor', 'toJSON', 'stack')
    , props = extend({ name: this.name }, this);

  // include stack if exists and not turned off
  if (false !== stack && this.stack) {
    props.stack = this.stack;
  }

  return props;
};

/* !
 * Chai - pathval utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * @see https://github.com/logicalparadox/filtr
 * MIT Licensed
 */

/**
 * ### .hasProperty(object, name)
 *
 * This allows checking whether an object has own
 * or inherited from prototype chain named property.
 *
 * Basically does the same thing as the `in`
 * operator but works properly with null/undefined values
 * and other primitives.
 *
 *     var obj = {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *
 * The following would be the results.
 *
 *     hasProperty(obj, 'str');  // true
 *     hasProperty(obj, 'constructor');  // true
 *     hasProperty(obj, 'bar');  // false
 *
 *     hasProperty(obj.str, 'length'); // true
 *     hasProperty(obj.str, 1);  // true
 *     hasProperty(obj.str, 5);  // false
 *
 *     hasProperty(obj.arr, 'length');  // true
 *     hasProperty(obj.arr, 2);  // true
 *     hasProperty(obj.arr, 3);  // false
 *
 * @param {Object} object
 * @param {String|Symbol} name
 * @returns {Boolean} whether it exists
 * @namespace Utils
 * @name hasProperty
 * @api public
 */

function hasProperty(obj, name) {
  if (typeof obj === 'undefined' || obj === null) {
    return false;
  }

  // The `in` operator does not work with primitives.
  return name in Object(obj);
}

/* !
 * ## parsePath(path)
 *
 * Helper function used to parse string object
 * paths. Use in conjunction with `internalGetPathValue`.
 *
 *      var parsed = parsePath('myobject.property.subprop');
 *
 * ### Paths:
 *
 * * Can be infinitely deep and nested.
 * * Arrays are also valid using the formal `myobject.document[3].property`.
 * * Literal dots and brackets (not delimiter) must be backslash-escaped.
 *
 * @param {String} path
 * @returns {Object} parsed
 * @api private
 */

function parsePath(path) {
  var str = path.replace(/([^\\])\[/g, '$1.[');
  var parts = str.match(/(\\\.|[^.]+?)+/g);
  return parts.map(function mapMatches(value) {
    var regexp = /^\[(\d+)\]$/;
    var mArr = regexp.exec(value);
    var parsed = null;
    if (mArr) {
      parsed = { i: parseFloat(mArr[1]) };
    } else {
      parsed = { p: value.replace(/\\([.\[\]])/g, '$1') };
    }

    return parsed;
  });
}

/* !
 * ## internalGetPathValue(obj, parsed[, pathDepth])
 *
 * Helper companion function for `.parsePath` that returns
 * the value located at the parsed address.
 *
 *      var value = getPathValue(obj, parsed);
 *
 * @param {Object} object to search against
 * @param {Object} parsed definition from `parsePath`.
 * @param {Number} depth (nesting level) of the property we want to retrieve
 * @returns {Object|Undefined} value
 * @api private
 */

function internalGetPathValue(obj, parsed, pathDepth) {
  var temporaryValue = obj;
  var res = null;
  pathDepth = (typeof pathDepth === 'undefined' ? parsed.length : pathDepth);

  for (var i = 0; i < pathDepth; i++) {
    var part = parsed[i];
    if (temporaryValue) {
      if (typeof part.p === 'undefined') {
        temporaryValue = temporaryValue[part.i];
      } else {
        temporaryValue = temporaryValue[part.p];
      }

      if (i === (pathDepth - 1)) {
        res = temporaryValue;
      }
    }
  }

  return res;
}

/* !
 * ## internalSetPathValue(obj, value, parsed)
 *
 * Companion function for `parsePath` that sets
 * the value located at a parsed address.
 *
 *  internalSetPathValue(obj, 'value', parsed);
 *
 * @param {Object} object to search and define on
 * @param {*} value to use upon set
 * @param {Object} parsed definition from `parsePath`
 * @api private
 */

function internalSetPathValue(obj, val, parsed) {
  var tempObj = obj;
  var pathDepth = parsed.length;
  var part = null;
  // Here we iterate through every part of the path
  for (var i = 0; i < pathDepth; i++) {
    var propName = null;
    var propVal = null;
    part = parsed[i];

    // If it's the last part of the path, we set the 'propName' value with the property name
    if (i === (pathDepth - 1)) {
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Now we set the property with the name held by 'propName' on object with the desired val
      tempObj[propName] = val;
    } else if (typeof part.p !== 'undefined' && tempObj[part.p]) {
      tempObj = tempObj[part.p];
    } else if (typeof part.i !== 'undefined' && tempObj[part.i]) {
      tempObj = tempObj[part.i];
    } else {
      // If the obj doesn't have the property we create one with that name to define it
      var next = parsed[i + 1];
      // Here we set the name of the property which will be defined
      propName = typeof part.p === 'undefined' ? part.i : part.p;
      // Here we decide if this property will be an array or a new object
      propVal = typeof next.p === 'undefined' ? [] : {};
      tempObj[propName] = propVal;
      tempObj = tempObj[propName];
    }
  }
}

/**
 * ### .getPathInfo(object, path)
 *
 * This allows the retrieval of property info in an
 * object given a string path.
 *
 * The path info consists of an object with the
 * following properties:
 *
 * * parent - The parent object of the property referenced by `path`
 * * name - The name of the final property, a number if it was an array indexer
 * * value - The value of the property, if it exists, otherwise `undefined`
 * * exists - Whether the property exists or not
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} info
 * @namespace Utils
 * @name getPathInfo
 * @api public
 */

function getPathInfo(obj, path) {
  var parsed = parsePath(path);
  var last = parsed[parsed.length - 1];
  var info = {
    parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
    name: last.p || last.i,
    value: internalGetPathValue(obj, parsed),
  };
  info.exists = hasProperty(info.parent, info.name);

  return info;
}

/**
 * ### .getPathValue(object, path)
 *
 * This allows the retrieval of values in an
 * object given a string path.
 *
 *     var obj = {
 *         prop1: {
 *             arr: ['a', 'b', 'c']
 *           , str: 'Hello'
 *         }
 *       , prop2: {
 *             arr: [ { nested: 'Universe' } ]
 *           , str: 'Hello again!'
 *         }
 *     }
 *
 * The following would be the results.
 *
 *     getPathValue(obj, 'prop1.str'); // Hello
 *     getPathValue(obj, 'prop1.att[2]'); // b
 *     getPathValue(obj, 'prop2.arr[0].nested'); // Universe
 *
 * @param {Object} object
 * @param {String} path
 * @returns {Object} value or `undefined`
 * @namespace Utils
 * @name getPathValue
 * @api public
 */

function getPathValue(obj, path) {
  var info = getPathInfo(obj, path);
  return info.value;
}

/**
 * ### .setPathValue(object, path, value)
 *
 * Define the value in an object at a given string path.
 *
 * ```js
 * var obj = {
 *     prop1: {
 *         arr: ['a', 'b', 'c']
 *       , str: 'Hello'
 *     }
 *   , prop2: {
 *         arr: [ { nested: 'Universe' } ]
 *       , str: 'Hello again!'
 *     }
 * };
 * ```
 *
 * The following would be acceptable.
 *
 * ```js
 * var properties = require('tea-properties');
 * properties.set(obj, 'prop1.str', 'Hello Universe!');
 * properties.set(obj, 'prop1.arr[2]', 'B');
 * properties.set(obj, 'prop2.arr[0].nested.value', { hello: 'universe' });
 * ```
 *
 * @param {Object} object
 * @param {String} path
 * @param {Mixed} value
 * @api private
 */

function setPathValue(obj, path, val) {
  var parsed = parsePath(path);
  internalSetPathValue(obj, val, parsed);
  return obj;
}

var pathval = {
  hasProperty: hasProperty,
  getPathInfo: getPathInfo,
  getPathValue: getPathValue,
  setPathValue: setPathValue,
};

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .flag(object, key, [value])
 *
 * Get or set a flag value on an object. If a
 * value is provided it will be set, else it will
 * return the currently set value or `undefined` if
 * the value is not set.
 *
 *     utils.flag(this, 'foo', 'bar'); // setter
 *     utils.flag(this, 'foo'); // getter, returns `bar`
 *
 * @param {Object} object constructed Assertion
 * @param {String} key
 * @param {Mixed} value (optional)
 * @namespace Utils
 * @name flag
 * @api private
 */

var flag = function flag(obj, key, value) {
  var flags = obj.__flags || (obj.__flags = Object.create(null));
  if (arguments.length === 3) {
    flags[key] = value;
  } else {
    return flags[key];
  }
};

/*!
 * Chai - test utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */



/**
 * ### .test(object, expression)
 *
 * Test and object for expression.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name test
 */

var test = function test(obj, args) {
  var negate = flag(obj, 'negate')
    , expr = args[0];
  return negate ? !expr : expr;
};

var typeDetect = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	module.exports = factory();
}(commonjsGlobal, (function () { var promiseExists = typeof Promise === 'function';

/* eslint-disable no-undef */
var globalObject = typeof self === 'object' ? self : commonjsGlobal; // eslint-disable-line id-blacklist

var symbolExists = typeof Symbol !== 'undefined';
var mapExists = typeof Map !== 'undefined';
var setExists = typeof Set !== 'undefined';
var weakMapExists = typeof WeakMap !== 'undefined';
var weakSetExists = typeof WeakSet !== 'undefined';
var dataViewExists = typeof DataView !== 'undefined';
var symbolIteratorExists = symbolExists && typeof Symbol.iterator !== 'undefined';
var symbolToStringTagExists = symbolExists && typeof Symbol.toStringTag !== 'undefined';
var setEntriesExists = setExists && typeof Set.prototype.entries === 'function';
var mapEntriesExists = mapExists && typeof Map.prototype.entries === 'function';
var setIteratorPrototype = setEntriesExists && Object.getPrototypeOf(new Set().entries());
var mapIteratorPrototype = mapEntriesExists && Object.getPrototypeOf(new Map().entries());
var arrayIteratorExists = symbolIteratorExists && typeof Array.prototype[Symbol.iterator] === 'function';
var arrayIteratorPrototype = arrayIteratorExists && Object.getPrototypeOf([][Symbol.iterator]());
var stringIteratorExists = symbolIteratorExists && typeof String.prototype[Symbol.iterator] === 'function';
var stringIteratorPrototype = stringIteratorExists && Object.getPrototypeOf(''[Symbol.iterator]());
var toStringLeftSliceLength = 8;
var toStringRightSliceLength = -1;
/**
 * ### typeOf (obj)
 *
 * Uses `Object.prototype.toString` to determine the type of an object,
 * normalising behaviour across engine versions & well optimised.
 *
 * @param {Mixed} object
 * @return {String} object type
 * @api public
 */
function typeDetect(obj) {
  /* ! Speed optimisation
   * Pre:
   *   string literal     x 3,039,035 ops/sec ±1.62% (78 runs sampled)
   *   boolean literal    x 1,424,138 ops/sec ±4.54% (75 runs sampled)
   *   number literal     x 1,653,153 ops/sec ±1.91% (82 runs sampled)
   *   undefined          x 9,978,660 ops/sec ±1.92% (75 runs sampled)
   *   function           x 2,556,769 ops/sec ±1.73% (77 runs sampled)
   * Post:
   *   string literal     x 38,564,796 ops/sec ±1.15% (79 runs sampled)
   *   boolean literal    x 31,148,940 ops/sec ±1.10% (79 runs sampled)
   *   number literal     x 32,679,330 ops/sec ±1.90% (78 runs sampled)
   *   undefined          x 32,363,368 ops/sec ±1.07% (82 runs sampled)
   *   function           x 31,296,870 ops/sec ±0.96% (83 runs sampled)
   */
  var typeofObj = typeof obj;
  if (typeofObj !== 'object') {
    return typeofObj;
  }

  /* ! Speed optimisation
   * Pre:
   *   null               x 28,645,765 ops/sec ±1.17% (82 runs sampled)
   * Post:
   *   null               x 36,428,962 ops/sec ±1.37% (84 runs sampled)
   */
  if (obj === null) {
    return 'null';
  }

  /* ! Spec Conformance
   * Test: `Object.prototype.toString.call(window)``
   *  - Node === "[object global]"
   *  - Chrome === "[object global]"
   *  - Firefox === "[object Window]"
   *  - PhantomJS === "[object Window]"
   *  - Safari === "[object Window]"
   *  - IE 11 === "[object Window]"
   *  - IE Edge === "[object Window]"
   * Test: `Object.prototype.toString.call(this)``
   *  - Chrome Worker === "[object global]"
   *  - Firefox Worker === "[object DedicatedWorkerGlobalScope]"
   *  - Safari Worker === "[object DedicatedWorkerGlobalScope]"
   *  - IE 11 Worker === "[object WorkerGlobalScope]"
   *  - IE Edge Worker === "[object WorkerGlobalScope]"
   */
  if (obj === globalObject) {
    return 'global';
  }

  /* ! Speed optimisation
   * Pre:
   *   array literal      x 2,888,352 ops/sec ±0.67% (82 runs sampled)
   * Post:
   *   array literal      x 22,479,650 ops/sec ±0.96% (81 runs sampled)
   */
  if (
    Array.isArray(obj) &&
    (symbolToStringTagExists === false || !(Symbol.toStringTag in obj))
  ) {
    return 'Array';
  }

  // Not caching existence of `window` and related properties due to potential
  // for `window` to be unset before tests in quasi-browser environments.
  if (typeof window === 'object') {
    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/multipage/browsers.html#location)
     * WhatWG HTML$7.7.3 - The `Location` interface
     * Test: `Object.prototype.toString.call(window.location)``
     *  - IE <=11 === "[object Object]"
     *  - IE Edge <=13 === "[object Object]"
     */
    if (typeof window.location === 'object' && obj === window.location) {
      return 'Location';
    }

    /* ! Spec Conformance
     * (https://html.spec.whatwg.org/#document)
     * WhatWG HTML$3.1.1 - The `Document` object
     * Note: Most browsers currently adher to the W3C DOM Level 2 spec
     *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-26809268)
     *       which suggests that browsers should use HTMLTableCellElement for
     *       both TD and TH elements. WhatWG separates these.
     *       WhatWG HTML states:
     *         > For historical reasons, Window objects must also have a
     *         > writable, configurable, non-enumerable property named
     *         > HTMLDocument whose value is the Document interface object.
     * Test: `Object.prototype.toString.call(document)``
     *  - Chrome === "[object HTMLDocument]"
     *  - Firefox === "[object HTMLDocument]"
     *  - Safari === "[object HTMLDocument]"
     *  - IE <=10 === "[object Document]"
     *  - IE 11 === "[object HTMLDocument]"
     *  - IE Edge <=13 === "[object HTMLDocument]"
     */
    if (typeof window.document === 'object' && obj === window.document) {
      return 'Document';
    }

    if (typeof window.navigator === 'object') {
      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#mimetypearray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface MimeTypeArray
       * Test: `Object.prototype.toString.call(navigator.mimeTypes)``
       *  - IE <=10 === "[object MSMimeTypesCollection]"
       */
      if (typeof window.navigator.mimeTypes === 'object' &&
          obj === window.navigator.mimeTypes) {
        return 'MimeTypeArray';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
       * WhatWG HTML$8.6.1.5 - Plugins - Interface PluginArray
       * Test: `Object.prototype.toString.call(navigator.plugins)``
       *  - IE <=10 === "[object MSPluginsCollection]"
       */
      if (typeof window.navigator.plugins === 'object' &&
          obj === window.navigator.plugins) {
        return 'PluginArray';
      }
    }

    if ((typeof window.HTMLElement === 'function' ||
        typeof window.HTMLElement === 'object') &&
        obj instanceof window.HTMLElement) {
      /* ! Spec Conformance
      * (https://html.spec.whatwg.org/multipage/webappapis.html#pluginarray)
      * WhatWG HTML$4.4.4 - The `blockquote` element - Interface `HTMLQuoteElement`
      * Test: `Object.prototype.toString.call(document.createElement('blockquote'))``
      *  - IE <=10 === "[object HTMLBlockElement]"
      */
      if (obj.tagName === 'BLOCKQUOTE') {
        return 'HTMLQuoteElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltabledatacellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableDataCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('td'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TD') {
        return 'HTMLTableDataCellElement';
      }

      /* ! Spec Conformance
       * (https://html.spec.whatwg.org/#htmltableheadercellelement)
       * WhatWG HTML$4.9.9 - The `td` element - Interface `HTMLTableHeaderCellElement`
       * Note: Most browsers currently adher to the W3C DOM Level 2 spec
       *       (https://www.w3.org/TR/DOM-Level-2-HTML/html.html#ID-82915075)
       *       which suggests that browsers should use HTMLTableCellElement for
       *       both TD and TH elements. WhatWG separates these.
       * Test: Object.prototype.toString.call(document.createElement('th'))
       *  - Chrome === "[object HTMLTableCellElement]"
       *  - Firefox === "[object HTMLTableCellElement]"
       *  - Safari === "[object HTMLTableCellElement]"
       */
      if (obj.tagName === 'TH') {
        return 'HTMLTableHeaderCellElement';
      }
    }
  }

  /* ! Speed optimisation
  * Pre:
  *   Float64Array       x 625,644 ops/sec ±1.58% (80 runs sampled)
  *   Float32Array       x 1,279,852 ops/sec ±2.91% (77 runs sampled)
  *   Uint32Array        x 1,178,185 ops/sec ±1.95% (83 runs sampled)
  *   Uint16Array        x 1,008,380 ops/sec ±2.25% (80 runs sampled)
  *   Uint8Array         x 1,128,040 ops/sec ±2.11% (81 runs sampled)
  *   Int32Array         x 1,170,119 ops/sec ±2.88% (80 runs sampled)
  *   Int16Array         x 1,176,348 ops/sec ±5.79% (86 runs sampled)
  *   Int8Array          x 1,058,707 ops/sec ±4.94% (77 runs sampled)
  *   Uint8ClampedArray  x 1,110,633 ops/sec ±4.20% (80 runs sampled)
  * Post:
  *   Float64Array       x 7,105,671 ops/sec ±13.47% (64 runs sampled)
  *   Float32Array       x 5,887,912 ops/sec ±1.46% (82 runs sampled)
  *   Uint32Array        x 6,491,661 ops/sec ±1.76% (79 runs sampled)
  *   Uint16Array        x 6,559,795 ops/sec ±1.67% (82 runs sampled)
  *   Uint8Array         x 6,463,966 ops/sec ±1.43% (85 runs sampled)
  *   Int32Array         x 5,641,841 ops/sec ±3.49% (81 runs sampled)
  *   Int16Array         x 6,583,511 ops/sec ±1.98% (80 runs sampled)
  *   Int8Array          x 6,606,078 ops/sec ±1.74% (81 runs sampled)
  *   Uint8ClampedArray  x 6,602,224 ops/sec ±1.77% (83 runs sampled)
  */
  var stringTag = (symbolToStringTagExists && obj[Symbol.toStringTag]);
  if (typeof stringTag === 'string') {
    return stringTag;
  }

  var objPrototype = Object.getPrototypeOf(obj);
  /* ! Speed optimisation
  * Pre:
  *   regex literal      x 1,772,385 ops/sec ±1.85% (77 runs sampled)
  *   regex constructor  x 2,143,634 ops/sec ±2.46% (78 runs sampled)
  * Post:
  *   regex literal      x 3,928,009 ops/sec ±0.65% (78 runs sampled)
  *   regex constructor  x 3,931,108 ops/sec ±0.58% (84 runs sampled)
  */
  if (objPrototype === RegExp.prototype) {
    return 'RegExp';
  }

  /* ! Speed optimisation
  * Pre:
  *   date               x 2,130,074 ops/sec ±4.42% (68 runs sampled)
  * Post:
  *   date               x 3,953,779 ops/sec ±1.35% (77 runs sampled)
  */
  if (objPrototype === Date.prototype) {
    return 'Date';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-promise.prototype-@@tostringtag)
   * ES6$25.4.5.4 - Promise.prototype[@@toStringTag] should be "Promise":
   * Test: `Object.prototype.toString.call(Promise.resolve())``
   *  - Chrome <=47 === "[object Object]"
   *  - Edge <=20 === "[object Object]"
   *  - Firefox 29-Latest === "[object Promise]"
   *  - Safari 7.1-Latest === "[object Promise]"
   */
  if (promiseExists && objPrototype === Promise.prototype) {
    return 'Promise';
  }

  /* ! Speed optimisation
  * Pre:
  *   set                x 2,222,186 ops/sec ±1.31% (82 runs sampled)
  * Post:
  *   set                x 4,545,879 ops/sec ±1.13% (83 runs sampled)
  */
  if (setExists && objPrototype === Set.prototype) {
    return 'Set';
  }

  /* ! Speed optimisation
  * Pre:
  *   map                x 2,396,842 ops/sec ±1.59% (81 runs sampled)
  * Post:
  *   map                x 4,183,945 ops/sec ±6.59% (82 runs sampled)
  */
  if (mapExists && objPrototype === Map.prototype) {
    return 'Map';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakset            x 1,323,220 ops/sec ±2.17% (76 runs sampled)
  * Post:
  *   weakset            x 4,237,510 ops/sec ±2.01% (77 runs sampled)
  */
  if (weakSetExists && objPrototype === WeakSet.prototype) {
    return 'WeakSet';
  }

  /* ! Speed optimisation
  * Pre:
  *   weakmap            x 1,500,260 ops/sec ±2.02% (78 runs sampled)
  * Post:
  *   weakmap            x 3,881,384 ops/sec ±1.45% (82 runs sampled)
  */
  if (weakMapExists && objPrototype === WeakMap.prototype) {
    return 'WeakMap';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-dataview.prototype-@@tostringtag)
   * ES6$24.2.4.21 - DataView.prototype[@@toStringTag] should be "DataView":
   * Test: `Object.prototype.toString.call(new DataView(new ArrayBuffer(1)))``
   *  - Edge <=13 === "[object Object]"
   */
  if (dataViewExists && objPrototype === DataView.prototype) {
    return 'DataView';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%mapiteratorprototype%-@@tostringtag)
   * ES6$23.1.5.2.2 - %MapIteratorPrototype%[@@toStringTag] should be "Map Iterator":
   * Test: `Object.prototype.toString.call(new Map().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (mapExists && objPrototype === mapIteratorPrototype) {
    return 'Map Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%setiteratorprototype%-@@tostringtag)
   * ES6$23.2.5.2.2 - %SetIteratorPrototype%[@@toStringTag] should be "Set Iterator":
   * Test: `Object.prototype.toString.call(new Set().entries())``
   *  - Edge <=13 === "[object Object]"
   */
  if (setExists && objPrototype === setIteratorPrototype) {
    return 'Set Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%arrayiteratorprototype%-@@tostringtag)
   * ES6$22.1.5.2.2 - %ArrayIteratorPrototype%[@@toStringTag] should be "Array Iterator":
   * Test: `Object.prototype.toString.call([][Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (arrayIteratorExists && objPrototype === arrayIteratorPrototype) {
    return 'Array Iterator';
  }

  /* ! Spec Conformance
   * (http://www.ecma-international.org/ecma-262/6.0/index.html#sec-%stringiteratorprototype%-@@tostringtag)
   * ES6$21.1.5.2.2 - %StringIteratorPrototype%[@@toStringTag] should be "String Iterator":
   * Test: `Object.prototype.toString.call(''[Symbol.iterator]())``
   *  - Edge <=13 === "[object Object]"
   */
  if (stringIteratorExists && objPrototype === stringIteratorPrototype) {
    return 'String Iterator';
  }

  /* ! Speed optimisation
  * Pre:
  *   object from null   x 2,424,320 ops/sec ±1.67% (76 runs sampled)
  * Post:
  *   object from null   x 5,838,000 ops/sec ±0.99% (84 runs sampled)
  */
  if (objPrototype === null) {
    return 'Object';
  }

  return Object
    .prototype
    .toString
    .call(obj)
    .slice(toStringLeftSliceLength, toStringRightSliceLength);
}

return typeDetect;

})));
});

/*!
 * Chai - expectTypes utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .expectTypes(obj, types)
 *
 * Ensures that the object being tested against is of a valid type.
 *
 *     utils.expectTypes(this, ['array', 'object', 'string']);
 *
 * @param {Mixed} obj constructed Assertion
 * @param {Array} type A list of allowed types for this assertion
 * @namespace Utils
 * @name expectTypes
 * @api public
 */





var expectTypes = function expectTypes(obj, types) {
  var flagMsg = flag(obj, 'message');
  var ssfi = flag(obj, 'ssfi');

  flagMsg = flagMsg ? flagMsg + ': ' : '';

  obj = flag(obj, 'object');
  types = types.map(function (t) { return t.toLowerCase(); });
  types.sort();

  // Transforms ['lorem', 'ipsum'] into 'a lorem, or an ipsum'
  var str = types.map(function (t, index) {
    var art = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(t.charAt(0)) ? 'an' : 'a';
    var or = types.length > 1 && index === types.length - 1 ? 'or ' : '';
    return or + art + ' ' + t;
  }).join(', ');

  var objType = typeDetect(obj).toLowerCase();

  if (!types.some(function (expected) { return objType === expected; })) {
    throw new assertionError(
      flagMsg + 'object tested must be ' + str + ', but ' + objType + ' given',
      undefined,
      ssfi
    );
  }
};

/*!
 * Chai - getActual utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getActual(object, [actual])
 *
 * Returns the `actual` value for an Assertion.
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getActual
 */

var getActual = function getActual(obj, args) {
  return args.length > 4 ? args[4] : obj._obj;
};

/* !
 * Chai - getFuncName utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getFuncName(constructorFn)
 *
 * Returns the name of a function.
 * When a non-function instance is passed, returns `null`.
 * This also includes a polyfill function if `aFunc.name` is not defined.
 *
 * @name getFuncName
 * @param {Function} funct
 * @namespace Utils
 * @api public
 */

var toString = Function.prototype.toString;
var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\s\(\/]+)/;
function getFuncName(aFunc) {
  if (typeof aFunc !== 'function') {
    return null;
  }

  var name = '';
  if (typeof Function.prototype.name === 'undefined' && typeof aFunc.name === 'undefined') {
    // Here we run a polyfill if Function does not support the `name` property and if aFunc.name is not defined
    var match = toString.call(aFunc).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    // If we've got a `name` property we just use it
    name = aFunc.name;
  }

  return name;
}

var getFuncName_1 = getFuncName;

/*!
 * Chai - getProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getProperties(object)
 *
 * This allows the retrieval of property names of an object, enumerable or not,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getProperties
 * @api public
 */

var getProperties = function getProperties(object) {
  var result = Object.getOwnPropertyNames(object);

  function addProperty(property) {
    if (result.indexOf(property) === -1) {
      result.push(property);
    }
  }

  var proto = Object.getPrototypeOf(object);
  while (proto !== null) {
    Object.getOwnPropertyNames(proto).forEach(addProperty);
    proto = Object.getPrototypeOf(proto);
  }

  return result;
};

/*!
 * Chai - getEnumerableProperties utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getEnumerableProperties(object)
 *
 * This allows the retrieval of enumerable property names of an object,
 * inherited or not.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getEnumerableProperties
 * @api public
 */

var getEnumerableProperties = function getEnumerableProperties(object) {
  var result = [];
  for (var name in object) {
    result.push(name);
  }
  return result;
};

var config = {

  /**
   * ### config.includeStack
   *
   * User configurable property, influences whether stack trace
   * is included in Assertion error message. Default of false
   * suppresses stack trace in the error message.
   *
   *     chai.config.includeStack = true;  // enable stack on error
   *
   * @param {Boolean}
   * @api public
   */

  includeStack: false,

  /**
   * ### config.showDiff
   *
   * User configurable property, influences whether or not
   * the `showDiff` flag should be included in the thrown
   * AssertionErrors. `false` will always be `false`; `true`
   * will be true when the assertion has requested a diff
   * be shown.
   *
   * @param {Boolean}
   * @api public
   */

  showDiff: true,

  /**
   * ### config.truncateThreshold
   *
   * User configurable property, sets length threshold for actual and
   * expected values in assertion errors. If this threshold is exceeded, for
   * example for large data structures, the value is replaced with something
   * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
   *
   * Set it to zero if you want to disable truncating altogether.
   *
   * This is especially userful when doing assertions on arrays: having this
   * set to a reasonable large value makes the failure messages readily
   * inspectable.
   *
   *     chai.config.truncateThreshold = 0;  // disable truncating
   *
   * @param {Number}
   * @api public
   */

  truncateThreshold: 40,

  /**
   * ### config.useProxy
   *
   * User configurable property, defines if chai will use a Proxy to throw
   * an error when a non-existent property is read, which protects users
   * from typos when using property-based assertions.
   *
   * Set it to false if you want to disable this feature.
   *
   *     chai.config.useProxy = false;  // disable use of Proxy
   *
   * This feature is automatically disabled regardless of this config value
   * in environments that don't support proxies.
   *
   * @param {Boolean}
   * @api public
   */

  useProxy: true,

  /**
   * ### config.proxyExcludedKeys
   *
   * User configurable property, defines which properties should be ignored
   * instead of throwing an error if they do not exist on the assertion.
   * This is only applied if the environment Chai is running in supports proxies and
   * if the `useProxy` configuration setting is enabled.
   * By default, `then` and `inspect` will not throw an error if they do not exist on the
   * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
   * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
   *
   *     // By default these keys will not throw an error if they do not exist on the assertion object
   *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
   *
   * @param {Array}
   * @api public
   */

  proxyExcludedKeys: ['then', 'inspect', 'toJSON']
};

var inspect_1 = createCommonjsModule(function (module, exports) {
// This is (almost) directly from Node.js utils
// https://github.com/joyent/node/blob/f8c335d0caf47f16d31413f89aa28eda3878e3aa/lib/util.js






module.exports = inspect;

/**
 * ### .inspect(obj, [showHidden], [depth], [colors])
 *
 * Echoes the value of a value. Tries to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Boolean} showHidden Flag that shows hidden (not enumerable)
 *    properties of objects. Default is false.
 * @param {Number} depth Depth in which to descend in object. Default is 2.
 * @param {Boolean} colors Flag to turn on ANSI escape codes to color the
 *    output. Default is false (no coloring).
 * @namespace Utils
 * @name inspect
 */
function inspect(obj, showHidden, depth, colors) {
  var ctx = {
    showHidden: showHidden,
    seen: [],
    stylize: function (str) { return str; }
  };
  return formatValue(ctx, obj, (typeof depth === 'undefined' ? 2 : depth));
}

// Returns true if object is a DOM element.
var isDOMElement = function (object) {
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return object &&
      typeof object === 'object' &&
      'nodeType' in object &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string';
  }
};

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (value && typeof value.inspect === 'function' &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (typeof ret !== 'string') {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // If this is a DOM element, try to get the outer HTML.
  if (isDOMElement(value)) {
    if ('outerHTML' in value) {
      return value.outerHTML;
      // This value does not have an outerHTML attribute,
      //   it could still be an XML element
    } else {
      // Attempt to serialize it
      try {
        if (document.xmlVersion) {
          var xmlSerializer = new XMLSerializer();
          return xmlSerializer.serializeToString(value);
        } else {
          // Firefox 11- do not support outerHTML
          //   It does, however, support innerHTML
          //   Use the following to render the element
          var ns = "http://www.w3.org/1999/xhtml";
          var container = document.createElementNS(ns, '_');

          container.appendChild(value.cloneNode(false));
          var html = container.innerHTML
            .replace('><', '>' + value.innerHTML + '<');
          container.innerHTML = '';
          return html;
        }
      } catch (err) {
        // This could be a non-native DOM implementation,
        //   continue with the normal flow:
        //   printing the element as if it is an object.
      }
    }
  }

  // Look up the keys of the object.
  var visibleKeys = getEnumerableProperties(value);
  var keys = ctx.showHidden ? getProperties(value) : visibleKeys;

  var name, nameSuffix;

  // Some type of object without properties can be shortcutted.
  // In IE, errors have a single `stack` property, or if they are vanilla `Error`,
  // a `stack` plus `description` property; ignore those for consistency.
  if (keys.length === 0 || (isError(value) && (
      (keys.length === 1 && keys[0] === 'stack') ||
      (keys.length === 2 && keys[0] === 'description' && keys[1] === 'stack')
     ))) {
    if (typeof value === 'function') {
      name = getFuncName_1(value);
      nameSuffix = name ? ': ' + name : '';
      return ctx.stylize('[Function' + nameSuffix + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toUTCString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = ''
    , array = false
    , typedArray = false
    , braces = ['{', '}'];

  if (isTypedArray(value)) {
    typedArray = true;
    braces = ['[', ']'];
  }

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (typeof value === 'function') {
    name = getFuncName_1(value);
    nameSuffix = name ? ': ' + name : '';
    base = ' [Function' + nameSuffix + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    return formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else if (typedArray) {
    return formatTypedArray(value);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  switch (typeof value) {
    case 'undefined':
      return ctx.stylize('undefined', 'undefined');

    case 'string':
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');

    case 'number':
      if (value === 0 && (1/value) === -Infinity) {
        return ctx.stylize('-0', 'number');
      }
      return ctx.stylize('' + value, 'number');

    case 'boolean':
      return ctx.stylize('' + value, 'boolean');

    case 'symbol':
      return ctx.stylize(value.toString(), 'symbol');
  }
  // For some reason typeof null is "object", so special case here.
  if (value === null) {
    return ctx.stylize('null', 'null');
  }
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (Object.prototype.hasOwnProperty.call(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}

function formatTypedArray(value) {
  var str = '[ ';

  for (var i = 0; i < value.length; ++i) {
    if (str.length >= config.truncateThreshold - 7) {
      str += '...';
      break;
    }
    str += value[i] + ', ';
  }
  str += ' ]';

  // Removing trailing `, ` if the array was not truncated
  if (str.indexOf(',  ]') !== -1) {
    str = str.replace(',  ]', ' ]');
  }

  return str;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name;
  var propDescriptor = Object.getOwnPropertyDescriptor(value, key);
  var str;

  if (propDescriptor) {
    if (propDescriptor.get) {
      if (propDescriptor.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (propDescriptor.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
  }
  if (visibleKeys.indexOf(key) < 0) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(value[key]) < 0) {
      if (recurseTimes === null) {
        str = formatValue(ctx, value[key], null);
      } else {
        str = formatValue(ctx, value[key], recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (typeof name === 'undefined') {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

function isTypedArray(ar) {
  // Unfortunately there's no way to check if an object is a TypedArray
  // We have to check if it's one of these types
  return (typeof ar === 'object' && /\w+Array]$/.test(objectToString(ar)));
}

function isArray(ar) {
  return Array.isArray(ar) ||
         (typeof ar === 'object' && objectToString(ar) === '[object Array]');
}

function isRegExp(re) {
  return typeof re === 'object' && objectToString(re) === '[object RegExp]';
}

function isDate(d) {
  return typeof d === 'object' && objectToString(d) === '[object Date]';
}

function isError(e) {
  return typeof e === 'object' && objectToString(e) === '[object Error]';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}
});

/*!
 * Chai - flag utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */




/**
 * ### .objDisplay(object)
 *
 * Determines if an object or an array matches
 * criteria to be inspected in-line for error
 * messages or should be truncated.
 *
 * @param {Mixed} javascript object to inspect
 * @name objDisplay
 * @namespace Utils
 * @api public
 */

var objDisplay = function objDisplay(obj) {
  var str = inspect_1(obj)
    , type = Object.prototype.toString.call(obj);

  if (config.truncateThreshold && str.length >= config.truncateThreshold) {
    if (type === '[object Function]') {
      return !obj.name || obj.name === ''
        ? '[Function]'
        : '[Function: ' + obj.name + ']';
    } else if (type === '[object Array]') {
      return '[ Array(' + obj.length + ') ]';
    } else if (type === '[object Object]') {
      var keys = Object.keys(obj)
        , kstr = keys.length > 2
          ? keys.splice(0, 2).join(', ') + ', ...'
          : keys.join(', ');
      return '{ Object (' + kstr + ') }';
    } else {
      return str;
    }
  } else {
    return str;
  }
};

/*!
 * Chai - message composition utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */



/**
 * ### .getMessage(object, message, negateMessage)
 *
 * Construct the error message based on flags
 * and template tags. Template tags will return
 * a stringified inspection of the object referenced.
 *
 * Message template tags:
 * - `#{this}` current asserted object
 * - `#{act}` actual value
 * - `#{exp}` expected value
 *
 * @param {Object} object (constructed Assertion)
 * @param {Arguments} chai.Assertion.prototype.assert arguments
 * @namespace Utils
 * @name getMessage
 * @api public
 */

var getMessage = function getMessage(obj, args) {
  var negate = flag(obj, 'negate')
    , val = flag(obj, 'object')
    , expected = args[3]
    , actual = getActual(obj, args)
    , msg = negate ? args[2] : args[1]
    , flagMsg = flag(obj, 'message');

  if(typeof msg === "function") msg = msg();
  msg = msg || '';
  msg = msg
    .replace(/#\{this\}/g, function () { return objDisplay(val); })
    .replace(/#\{act\}/g, function () { return objDisplay(actual); })
    .replace(/#\{exp\}/g, function () { return objDisplay(expected); });

  return flagMsg ? flagMsg + ': ' + msg : msg;
};

/*!
 * Chai - transferFlags utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .transferFlags(assertion, object, includeAll = true)
 *
 * Transfer all the flags for `assertion` to `object`. If
 * `includeAll` is set to `false`, then the base Chai
 * assertion flags (namely `object`, `ssfi`, `lockSsfi`,
 * and `message`) will not be transferred.
 *
 *
 *     var newAssertion = new Assertion();
 *     utils.transferFlags(assertion, newAssertion);
 *
 *     var anotherAsseriton = new Assertion(myObj);
 *     utils.transferFlags(assertion, anotherAssertion, false);
 *
 * @param {Assertion} assertion the assertion to transfer the flags from
 * @param {Object} object the object to transfer the flags to; usually a new assertion
 * @param {Boolean} includeAll
 * @namespace Utils
 * @name transferFlags
 * @api private
 */

var transferFlags = function transferFlags(assertion, object, includeAll) {
  var flags = assertion.__flags || (assertion.__flags = Object.create(null));

  if (!object.__flags) {
    object.__flags = Object.create(null);
  }

  includeAll = arguments.length === 3 ? includeAll : true;

  for (var flag in flags) {
    if (includeAll ||
        (flag !== 'object' && flag !== 'ssfi' && flag !== 'lockSsfi' && flag != 'message')) {
      object.__flags[flag] = flags[flag];
    }
  }
};

/* globals Symbol: false, Uint8Array: false, WeakMap: false */
/*!
 * deep-eql
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


function FakeMap() {
  this._key = 'chai/deep-eql__' + Math.random() + Date.now();
}

FakeMap.prototype = {
  get: function getMap(key) {
    return key[this._key];
  },
  set: function setMap(key, value) {
    if (Object.isExtensible(key)) {
      Object.defineProperty(key, this._key, {
        value: value,
        configurable: true,
      });
    }
  },
};

var MemoizeMap = typeof WeakMap === 'function' ? WeakMap : FakeMap;
/*!
 * Check to see if the MemoizeMap has recorded a result of the two operands
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @returns {Boolean|null} result
*/
function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return null;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    var result = leftHandMap.get(rightHandOperand);
    if (typeof result === 'boolean') {
      return result;
    }
  }
  return null;
}

/*!
 * Set the result of the equality into the MemoizeMap
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {MemoizeMap} memoizeMap
 * @param {Boolean} result
*/
function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
  // Technically, WeakMap keys can *only* be objects, not primitives.
  if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    return;
  }
  var leftHandMap = memoizeMap.get(leftHandOperand);
  if (leftHandMap) {
    leftHandMap.set(rightHandOperand, result);
  } else {
    leftHandMap = new MemoizeMap();
    leftHandMap.set(rightHandOperand, result);
    memoizeMap.set(leftHandOperand, leftHandMap);
  }
}

/*!
 * Primary Export
 */

var deepEql = deepEqual;
var MemoizeMap_1 = MemoizeMap;

/**
 * Assert deeply nested sameValue equality between two objects of any type.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
 */
function deepEqual(leftHandOperand, rightHandOperand, options) {
  // If we have a comparator, we can't assume anything; so bail to its check first.
  if (options && options.comparator) {
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }

  var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
  if (simpleResult !== null) {
    return simpleResult;
  }

  // Deeper comparisons are pushed through to a larger function
  return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
}

/**
 * Many comparisons can be canceled out early via simple equality or primitive checks.
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @return {Boolean|null} equal match
 */
function simpleEqual(leftHandOperand, rightHandOperand) {
  // Equal references (except for Numbers) can be returned early
  if (leftHandOperand === rightHandOperand) {
    // Handle +-0 cases
    return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
  }

  // handle NaN cases
  if (
    leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand // eslint-disable-line no-self-compare
  ) {
    return true;
  }

  // Anything that is not an 'object', i.e. symbols, functions, booleans, numbers,
  // strings, and undefined, can be compared by reference.
  if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
    // Easy out b/c it would have passed the first equality check
    return false;
  }
  return null;
}

/*!
 * The main logic of the `deepEqual` function.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (optional) Additional options
 * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
 * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
    complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
    references to blow the stack.
 * @return {Boolean} equal match
*/
function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
  options = options || {};
  options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
  var comparator = options && options.comparator;

  // Check if a memoized result exists.
  var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
  if (memoizeResultLeft !== null) {
    return memoizeResultLeft;
  }
  var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
  if (memoizeResultRight !== null) {
    return memoizeResultRight;
  }

  // If a comparator is present, use it.
  if (comparator) {
    var comparatorResult = comparator(leftHandOperand, rightHandOperand);
    // Comparators may return null, in which case we want to go back to default behavior.
    if (comparatorResult === false || comparatorResult === true) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
      return comparatorResult;
    }
    // To allow comparators to override *any* behavior, we ran them first. Since it didn't decide
    // what to do, we need to make sure to return the basic tests first before we move on.
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      // Don't memoize this, it takes longer to set/retrieve than to just compare.
      return simpleResult;
    }
  }

  var leftHandType = typeDetect(leftHandOperand);
  if (leftHandType !== typeDetect(rightHandOperand)) {
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
    return false;
  }

  // Temporarily set the operands in the memoize object to prevent blowing the stack
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);

  var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
  memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
  return result;
}

function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
  switch (leftHandType) {
    case 'String':
    case 'Number':
    case 'Boolean':
    case 'Date':
      // If these types are their instance types (e.g. `new Number`) then re-deepEqual against their values
      return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
    case 'Promise':
    case 'Symbol':
    case 'function':
    case 'WeakMap':
    case 'WeakSet':
    case 'Error':
      return leftHandOperand === rightHandOperand;
    case 'Arguments':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Array':
      return iterableEqual(leftHandOperand, rightHandOperand, options);
    case 'RegExp':
      return regexpEqual(leftHandOperand, rightHandOperand);
    case 'Generator':
      return generatorEqual(leftHandOperand, rightHandOperand, options);
    case 'DataView':
      return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
    case 'ArrayBuffer':
      return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
    case 'Set':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    case 'Map':
      return entriesEqual(leftHandOperand, rightHandOperand, options);
    default:
      return objectEqual(leftHandOperand, rightHandOperand, options);
  }
}

/*!
 * Compare two Regular Expressions for equality.
 *
 * @param {RegExp} leftHandOperand
 * @param {RegExp} rightHandOperand
 * @return {Boolean} result
 */

function regexpEqual(leftHandOperand, rightHandOperand) {
  return leftHandOperand.toString() === rightHandOperand.toString();
}

/*!
 * Compare two Sets/Maps for equality. Faster than other equality functions.
 *
 * @param {Set} leftHandOperand
 * @param {Set} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function entriesEqual(leftHandOperand, rightHandOperand, options) {
  // IE11 doesn't support Set#entries or Set#@@iterator, so we need manually populate using Set#forEach
  if (leftHandOperand.size !== rightHandOperand.size) {
    return false;
  }
  if (leftHandOperand.size === 0) {
    return true;
  }
  var leftHandItems = [];
  var rightHandItems = [];
  leftHandOperand.forEach(function gatherEntries(key, value) {
    leftHandItems.push([ key, value ]);
  });
  rightHandOperand.forEach(function gatherEntries(key, value) {
    rightHandItems.push([ key, value ]);
  });
  return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
}

/*!
 * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function iterableEqual(leftHandOperand, rightHandOperand, options) {
  var length = leftHandOperand.length;
  if (length !== rightHandOperand.length) {
    return false;
  }
  if (length === 0) {
    return true;
  }
  var index = -1;
  while (++index < length) {
    if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Simple equality for generator objects such as those returned by generator functions.
 *
 * @param {Iterable} leftHandOperand
 * @param {Iterable} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function generatorEqual(leftHandOperand, rightHandOperand, options) {
  return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
}

/*!
 * Determine if the given object has an @@iterator function.
 *
 * @param {Object} target
 * @return {Boolean} `true` if the object has an @@iterator function.
 */
function hasIteratorFunction(target) {
  return typeof Symbol !== 'undefined' &&
    typeof target === 'object' &&
    typeof Symbol.iterator !== 'undefined' &&
    typeof target[Symbol.iterator] === 'function';
}

/*!
 * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
 * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
 *
 * @param {Object} target
 * @returns {Array} an array of entries from the @@iterator function
 */
function getIteratorEntries(target) {
  if (hasIteratorFunction(target)) {
    try {
      return getGeneratorEntries(target[Symbol.iterator]());
    } catch (iteratorError) {
      return [];
    }
  }
  return [];
}

/*!
 * Gets all entries from a Generator. This will consume the generator - which could have side effects.
 *
 * @param {Generator} target
 * @returns {Array} an array of entries from the Generator.
 */
function getGeneratorEntries(generator) {
  var generatorResult = generator.next();
  var accumulator = [ generatorResult.value ];
  while (generatorResult.done === false) {
    generatorResult = generator.next();
    accumulator.push(generatorResult.value);
  }
  return accumulator;
}

/*!
 * Gets all own and inherited enumerable keys from a target.
 *
 * @param {Object} target
 * @returns {Array} an array of own and inherited enumerable keys from the target.
 */
function getEnumerableKeys(target) {
  var keys = [];
  for (var key in target) {
    keys.push(key);
  }
  return keys;
}

/*!
 * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
 * each key. If any value of the given key is not equal, the function will return false (early).
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */
function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
  var length = keys.length;
  if (length === 0) {
    return true;
  }
  for (var i = 0; i < length; i += 1) {
    if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
      return false;
    }
  }
  return true;
}

/*!
 * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
 * for each enumerable key in the object.
 *
 * @param {Mixed} leftHandOperand
 * @param {Mixed} rightHandOperand
 * @param {Object} [options] (Optional)
 * @return {Boolean} result
 */

function objectEqual(leftHandOperand, rightHandOperand, options) {
  var leftHandKeys = getEnumerableKeys(leftHandOperand);
  var rightHandKeys = getEnumerableKeys(rightHandOperand);
  if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
    leftHandKeys.sort();
    rightHandKeys.sort();
    if (iterableEqual(leftHandKeys, rightHandKeys) === false) {
      return false;
    }
    return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
  }

  var leftHandEntries = getIteratorEntries(leftHandOperand);
  var rightHandEntries = getIteratorEntries(rightHandOperand);
  if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
    leftHandEntries.sort();
    rightHandEntries.sort();
    return iterableEqual(leftHandEntries, rightHandEntries, options);
  }

  if (leftHandKeys.length === 0 &&
      leftHandEntries.length === 0 &&
      rightHandKeys.length === 0 &&
      rightHandEntries.length === 0) {
    return true;
  }

  return false;
}

/*!
 * Returns true if the argument is a primitive.
 *
 * This intentionally returns true for all objects that can be compared by reference,
 * including functions and symbols.
 *
 * @param {Mixed} value
 * @return {Boolean} result
 */
function isPrimitive(value) {
  return value === null || typeof value !== 'object';
}

deepEql.MemoizeMap = MemoizeMap_1;

/*!
 * Chai - isProxyEnabled helper
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .isProxyEnabled()
 *
 * Helper function to check if Chai's proxy protection feature is enabled. If
 * proxies are unsupported or disabled via the user's Chai config, then return
 * false. Otherwise, return true.
 *
 * @namespace Utils
 * @name isProxyEnabled
 */

var isProxyEnabled = function isProxyEnabled() {
  return config.useProxy && 
    typeof Proxy !== 'undefined' &&
    typeof Reflect !== 'undefined';
};

/*!
 * Chai - addProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */






/**
 * ### .addProperty(ctx, name, getter)
 *
 * Adds a property to the prototype of an object.
 *
 *     utils.addProperty(chai.Assertion.prototype, 'foo', function () {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.instanceof(Foo);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.foo;
 *
 * @param {Object} ctx object to which the property is added
 * @param {String} name of property to add
 * @param {Function} getter function to be used for name
 * @namespace Utils
 * @name addProperty
 * @api public
 */

var addProperty = function addProperty(ctx, name, getter) {
  getter = getter === undefined ? function () {} : getter;

  Object.defineProperty(ctx, name,
    { get: function propertyGetter() {
        // Setting the `ssfi` flag to `propertyGetter` causes this function to
        // be the starting point for removing implementation frames from the
        // stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', propertyGetter);
        }

        var result = getter.call(this);
        if (result !== undefined)
          return result;

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};

var fnLengthDesc = Object.getOwnPropertyDescriptor(function () {}, 'length');

/*!
 * Chai - addLengthGuard utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .addLengthGuard(fn, assertionName, isChainable)
 *
 * Define `length` as a getter on the given uninvoked method assertion. The
 * getter acts as a guard against chaining `length` directly off of an uninvoked
 * method assertion, which is a problem because it references `function`'s
 * built-in `length` property instead of Chai's `length` assertion. When the
 * getter catches the user making this mistake, it throws an error with a
 * helpful message.
 *
 * There are two ways in which this mistake can be made. The first way is by
 * chaining the `length` assertion directly off of an uninvoked chainable
 * method. In this case, Chai suggests that the user use `lengthOf` instead. The
 * second way is by chaining the `length` assertion directly off of an uninvoked
 * non-chainable method. Non-chainable methods must be invoked prior to
 * chaining. In this case, Chai suggests that the user consult the docs for the
 * given assertion.
 *
 * If the `length` property of functions is unconfigurable, then return `fn`
 * without modification.
 *
 * Note that in ES6, the function's `length` property is configurable, so once
 * support for legacy environments is dropped, Chai's `length` property can
 * replace the built-in function's `length` property, and this length guard will
 * no longer be necessary. In the mean time, maintaining consistency across all
 * environments is the priority.
 *
 * @param {Function} fn
 * @param {String} assertionName
 * @param {Boolean} isChainable
 * @namespace Utils
 * @name addLengthGuard
 */

var addLengthGuard = function addLengthGuard (fn, assertionName, isChainable) {
  if (!fnLengthDesc.configurable) return fn;

  Object.defineProperty(fn, 'length', {
    get: function () {
      if (isChainable) {
        throw Error('Invalid Chai property: ' + assertionName + '.length. Due' +
          ' to a compatibility issue, "length" cannot directly follow "' +
          assertionName + '". Use "' + assertionName + '.lengthOf" instead.');
      }

      throw Error('Invalid Chai property: ' + assertionName + '.length. See' +
        ' docs for proper usage of "' + assertionName + '".');
    }
  });

  return fn;
};

/*!
 * Chai - proxify utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .proxify(object)
 *
 * Return a proxy of given object that throws an error when a non-existent
 * property is read. By default, the root cause is assumed to be a misspelled
 * property, and thus an attempt is made to offer a reasonable suggestion from
 * the list of existing properties. However, if a nonChainableMethodName is
 * provided, then the root cause is instead a failure to invoke a non-chainable
 * method prior to reading the non-existent property.
 * 
 * If proxies are unsupported or disabled via the user's Chai config, then
 * return object without modification.
 *
 * @param {Object} obj
 * @param {String} nonChainableMethodName
 * @namespace Utils
 * @name proxify
 */

var builtins = ['__flags', '__methods', '_obj', 'assert'];

var proxify = function proxify(obj, nonChainableMethodName) {
  if (!isProxyEnabled()) return obj;

  return new Proxy(obj, {
    get: function proxyGetter(target, property) {
      // This check is here because we should not throw errors on Symbol properties
      // such as `Symbol.toStringTag`.
      // The values for which an error should be thrown can be configured using
      // the `config.proxyExcludedKeys` setting.
      if (typeof property === 'string' &&
          config.proxyExcludedKeys.indexOf(property) === -1 &&
          !Reflect.has(target, property)) {
        // Special message for invalid property access of non-chainable methods.
        if (nonChainableMethodName) {
          throw Error('Invalid Chai property: ' + nonChainableMethodName + '.' +
            property + '. See docs for proper usage of "' +
            nonChainableMethodName + '".');
        }

        var orderedProperties = getProperties(target).filter(function(property) {
          return !Object.prototype.hasOwnProperty(property) &&
            builtins.indexOf(property) === -1;
        }).sort(function(a, b) {
          return stringDistance(property, a) - stringDistance(property, b);
        });

        if (orderedProperties.length &&
            stringDistance(orderedProperties[0], property) < 4) {
          // If the property is reasonably close to an existing Chai property,
          // suggest that property to the user.
          throw Error('Invalid Chai property: ' + property +
            '. Did you mean "' + orderedProperties[0] + '"?');
        } else {
          throw Error('Invalid Chai property: ' + property);
        }
      }

      // Use this proxy getter as the starting point for removing implementation
      // frames from the stack trace of a failed assertion. For property
      // assertions, this prevents the proxy getter from showing up in the stack
      // trace since it's invoked before the property getter. For method and
      // chainable method assertions, this flag will end up getting changed to
      // the method wrapper, which is good since this frame will no longer be in
      // the stack once the method is invoked. Note that Chai builtin assertion
      // properties such as `__flags` are skipped since this is only meant to
      // capture the starting point of an assertion. This step is also skipped
      // if the `lockSsfi` flag is set, thus indicating that this assertion is
      // being called from within another assertion. In that case, the `ssfi`
      // flag is already set to the outer assertion's starting point.
      if (builtins.indexOf(property) === -1 && !flag(target, 'lockSsfi')) {
        flag(target, 'ssfi', proxyGetter);
      }

      return Reflect.get(target, property);
    }
  });
};

/**
 * # stringDistance(strA, strB)
 * Return the Levenshtein distance between two strings.
 * @param {string} strA
 * @param {string} strB
 * @return {number} the string distance between strA and strB
 * @api private
 */

function stringDistance(strA, strB, memo) {
  if (!memo) {
    // `memo` is a two-dimensional array containing a cache of distances
    // memo[i][j] is the distance between strA.slice(0, i) and
    // strB.slice(0, j).
    memo = [];
    for (var i = 0; i <= strA.length; i++) {
      memo[i] = [];
    }
  }

  if (!memo[strA.length] || !memo[strA.length][strB.length]) {
    if (strA.length === 0 || strB.length === 0) {
      memo[strA.length][strB.length] = Math.max(strA.length, strB.length);
    } else {
      memo[strA.length][strB.length] = Math.min(
        stringDistance(strA.slice(0, -1), strB, memo) + 1,
        stringDistance(strA, strB.slice(0, -1), memo) + 1,
        stringDistance(strA.slice(0, -1), strB.slice(0, -1), memo) +
          (strA.slice(-1) === strB.slice(-1) ? 0 : 1)
      );
    }
  }

  return memo[strA.length][strB.length];
}

/*!
 * Chai - addMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */







/**
 * ### .addMethod(ctx, name, method)
 *
 * Adds a method to the prototype of an object.
 *
 *     utils.addMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(fooStr).to.be.foo('bar');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for name
 * @namespace Utils
 * @name addMethod
 * @api public
 */

var addMethod = function addMethod(ctx, name, method) {
  var methodWrapper = function () {
    // Setting the `ssfi` flag to `methodWrapper` causes this function to be the
    // starting point for removing implementation frames from the stack trace of
    // a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', methodWrapper);
    }

    var result = method.apply(this, arguments);
    if (result !== undefined)
      return result;

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  addLengthGuard(methodWrapper, name, false);
  ctx[name] = proxify(methodWrapper, name);
};

/*!
 * Chai - overwriteProperty utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */






/**
 * ### .overwriteProperty(ctx, name, fn)
 *
 * Overwites an already existing property getter and provides
 * access to previous value. Must return function to use as getter.
 *
 *     utils.overwriteProperty(chai.Assertion.prototype, 'ok', function (_super) {
 *       return function () {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.name).to.equal('bar');
 *         } else {
 *           _super.call(this);
 *         }
 *       }
 *     });
 *
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteProperty('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.be.ok;
 *
 * @param {Object} ctx object whose property is to be overwritten
 * @param {String} name of property to overwrite
 * @param {Function} getter function that returns a getter function to be used for name
 * @namespace Utils
 * @name overwriteProperty
 * @api public
 */

var overwriteProperty = function overwriteProperty(ctx, name, getter) {
  var _get = Object.getOwnPropertyDescriptor(ctx, name)
    , _super = function () {};

  if (_get && 'function' === typeof _get.get)
    _super = _get.get;

  Object.defineProperty(ctx, name,
    { get: function overwritingPropertyGetter() {
        // Setting the `ssfi` flag to `overwritingPropertyGetter` causes this
        // function to be the starting point for removing implementation frames
        // from the stack trace of a failed assertion.
        //
        // However, we only want to use this function as the starting point if
        // the `lockSsfi` flag isn't set and proxy protection is disabled.
        //
        // If the `lockSsfi` flag is set, then either this assertion has been
        // overwritten by another assertion, or this assertion is being invoked
        // from inside of another assertion. In the first case, the `ssfi` flag
        // has already been set by the overwriting assertion. In the second
        // case, the `ssfi` flag has already been set by the outer assertion.
        //
        // If proxy protection is enabled, then the `ssfi` flag has already been
        // set by the proxy getter.
        if (!isProxyEnabled() && !flag(this, 'lockSsfi')) {
          flag(this, 'ssfi', overwritingPropertyGetter);
        }

        // Setting the `lockSsfi` flag to `true` prevents the overwritten
        // assertion from changing the `ssfi` flag. By this point, the `ssfi`
        // flag is already set to the correct starting point for this assertion.
        var origLockSsfi = flag(this, 'lockSsfi');
        flag(this, 'lockSsfi', true);
        var result = getter(_super).call(this);
        flag(this, 'lockSsfi', origLockSsfi);

        if (result !== undefined) {
          return result;
        }

        var newAssertion = new chai.Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }
    , configurable: true
  });
};

/*!
 * Chai - overwriteMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */







/**
 * ### .overwriteMethod(ctx, name, fn)
 *
 * Overwites an already existing method and provides
 * access to previous function. Must return function
 * to be used for name.
 *
 *     utils.overwriteMethod(chai.Assertion.prototype, 'equal', function (_super) {
 *       return function (str) {
 *         var obj = utils.flag(this, 'object');
 *         if (obj instanceof Foo) {
 *           new chai.Assertion(obj.value).to.equal(str);
 *         } else {
 *           _super.apply(this, arguments);
 *         }
 *       }
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteMethod('foo', fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.equal('bar');
 *
 * @param {Object} ctx object whose method is to be overwritten
 * @param {String} name of method to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @namespace Utils
 * @name overwriteMethod
 * @api public
 */

var overwriteMethod = function overwriteMethod(ctx, name, method) {
  var _method = ctx[name]
    , _super = function () {
      throw new Error(name + ' is not a function');
    };

  if (_method && 'function' === typeof _method)
    _super = _method;

  var overwritingMethodWrapper = function () {
    // Setting the `ssfi` flag to `overwritingMethodWrapper` causes this
    // function to be the starting point for removing implementation frames from
    // the stack trace of a failed assertion.
    //
    // However, we only want to use this function as the starting point if the
    // `lockSsfi` flag isn't set.
    //
    // If the `lockSsfi` flag is set, then either this assertion has been
    // overwritten by another assertion, or this assertion is being invoked from
    // inside of another assertion. In the first case, the `ssfi` flag has
    // already been set by the overwriting assertion. In the second case, the
    // `ssfi` flag has already been set by the outer assertion.
    if (!flag(this, 'lockSsfi')) {
      flag(this, 'ssfi', overwritingMethodWrapper);
    }

    // Setting the `lockSsfi` flag to `true` prevents the overwritten assertion
    // from changing the `ssfi` flag. By this point, the `ssfi` flag is already
    // set to the correct starting point for this assertion.
    var origLockSsfi = flag(this, 'lockSsfi');
    flag(this, 'lockSsfi', true);
    var result = method(_super).apply(this, arguments);
    flag(this, 'lockSsfi', origLockSsfi);

    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  addLengthGuard(overwritingMethodWrapper, name, false);
  ctx[name] = proxify(overwritingMethodWrapper, name);
};

/*!
 * Chai - addChainingMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */







/*!
 * Module variables
 */

// Check whether `Object.setPrototypeOf` is supported
var canSetPrototype = typeof Object.setPrototypeOf === 'function';

// Without `Object.setPrototypeOf` support, this module will need to add properties to a function.
// However, some of functions' own props are not configurable and should be skipped.
var testFn = function() {};
var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
  var propDesc = Object.getOwnPropertyDescriptor(testFn, name);

  // Note: PhantomJS 1.x includes `callee` as one of `testFn`'s own properties,
  // but then returns `undefined` as the property descriptor for `callee`. As a
  // workaround, we perform an otherwise unnecessary type-check for `propDesc`,
  // and then filter it out if it's not an object as it should be.
  if (typeof propDesc !== 'object')
    return true;

  return !propDesc.configurable;
});

// Cache `Function` properties
var call  = Function.prototype.call;
var apply = Function.prototype.apply;

/**
 * ### .addChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Adds a method to an object, such that the method can also be chained.
 *
 *     utils.addChainableMethod(chai.Assertion.prototype, 'foo', function (str) {
 *       var obj = utils.flag(this, 'object');
 *       new chai.Assertion(obj).to.be.equal(str);
 *     });
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.addChainableMethod('foo', fn, chainingBehavior);
 *
 * The result can then be used as both a method assertion, executing both `method` and
 * `chainingBehavior`, or as a language chain, which only executes `chainingBehavior`.
 *
 *     expect(fooStr).to.be.foo('bar');
 *     expect(fooStr).to.be.foo.equal('foo');
 *
 * @param {Object} ctx object to which the method is added
 * @param {String} name of method to add
 * @param {Function} method function to be used for `name`, when called
 * @param {Function} chainingBehavior function to be called every time the property is accessed
 * @namespace Utils
 * @name addChainableMethod
 * @api public
 */

var addChainableMethod = function addChainableMethod(ctx, name, method, chainingBehavior) {
  if (typeof chainingBehavior !== 'function') {
    chainingBehavior = function () { };
  }

  var chainableBehavior = {
      method: method
    , chainingBehavior: chainingBehavior
  };

  // save the methods so we can overwrite them later, if we need to.
  if (!ctx.__methods) {
    ctx.__methods = {};
  }
  ctx.__methods[name] = chainableBehavior;

  Object.defineProperty(ctx, name,
    { get: function chainableMethodGetter() {
        chainableBehavior.chainingBehavior.call(this);

        var chainableMethodWrapper = function () {
          // Setting the `ssfi` flag to `chainableMethodWrapper` causes this
          // function to be the starting point for removing implementation
          // frames from the stack trace of a failed assertion.
          //
          // However, we only want to use this function as the starting point if
          // the `lockSsfi` flag isn't set.
          //
          // If the `lockSsfi` flag is set, then this assertion is being
          // invoked from inside of another assertion. In this case, the `ssfi`
          // flag has already been set by the outer assertion.
          //
          // Note that overwriting a chainable method merely replaces the saved
          // methods in `ctx.__methods` instead of completely replacing the
          // overwritten assertion. Therefore, an overwriting assertion won't
          // set the `ssfi` or `lockSsfi` flags.
          if (!flag(this, 'lockSsfi')) {
            flag(this, 'ssfi', chainableMethodWrapper);
          }

          var result = chainableBehavior.method.apply(this, arguments);
          if (result !== undefined) {
            return result;
          }

          var newAssertion = new chai.Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        };

        addLengthGuard(chainableMethodWrapper, name, true);

        // Use `Object.setPrototypeOf` if available
        if (canSetPrototype) {
          // Inherit all properties from the object by replacing the `Function` prototype
          var prototype = Object.create(this);
          // Restore the `call` and `apply` methods from `Function`
          prototype.call = call;
          prototype.apply = apply;
          Object.setPrototypeOf(chainableMethodWrapper, prototype);
        }
        // Otherwise, redefine all properties (slow!)
        else {
          var asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function (asserterName) {
            if (excludeNames.indexOf(asserterName) !== -1) {
              return;
            }

            var pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(chainableMethodWrapper, asserterName, pd);
          });
        }

        transferFlags(this, chainableMethodWrapper);
        return proxify(chainableMethodWrapper);
      }
    , configurable: true
  });
};

/*!
 * Chai - overwriteChainableMethod utility
 * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */




/**
 * ### .overwriteChainableMethod(ctx, name, method, chainingBehavior)
 *
 * Overwites an already existing chainable method
 * and provides access to the previous function or
 * property.  Must return functions to be used for
 * name.
 *
 *     utils.overwriteChainableMethod(chai.Assertion.prototype, 'lengthOf',
 *       function (_super) {
 *       }
 *     , function (_super) {
 *       }
 *     );
 *
 * Can also be accessed directly from `chai.Assertion`.
 *
 *     chai.Assertion.overwriteChainableMethod('foo', fn, fn);
 *
 * Then can be used as any other assertion.
 *
 *     expect(myFoo).to.have.lengthOf(3);
 *     expect(myFoo).to.have.lengthOf.above(3);
 *
 * @param {Object} ctx object whose method / property is to be overwritten
 * @param {String} name of method / property to overwrite
 * @param {Function} method function that returns a function to be used for name
 * @param {Function} chainingBehavior function that returns a function to be used for property
 * @namespace Utils
 * @name overwriteChainableMethod
 * @api public
 */

var overwriteChainableMethod = function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
  var chainableBehavior = ctx.__methods[name];

  var _chainingBehavior = chainableBehavior.chainingBehavior;
  chainableBehavior.chainingBehavior = function overwritingChainableMethodGetter() {
    var result = chainingBehavior(_chainingBehavior).call(this);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };

  var _method = chainableBehavior.method;
  chainableBehavior.method = function overwritingChainableMethodWrapper() {
    var result = method(_method).apply(this, arguments);
    if (result !== undefined) {
      return result;
    }

    var newAssertion = new chai.Assertion();
    transferFlags(this, newAssertion);
    return newAssertion;
  };
};

/*!
 * Chai - compareByInspect utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */



/**
 * ### .compareByInspect(mixed, mixed)
 *
 * To be used as a compareFunction with Array.prototype.sort. Compares elements
 * using inspect instead of default behavior of using toString so that Symbols
 * and objects with irregular/missing toString can still be sorted without a
 * TypeError.
 *
 * @param {Mixed} first element to compare
 * @param {Mixed} second element to compare
 * @returns {Number} -1 if 'a' should come before 'b'; otherwise 1 
 * @name compareByInspect
 * @namespace Utils
 * @api public
 */

var compareByInspect = function compareByInspect(a, b) {
  return inspect_1(a) < inspect_1(b) ? -1 : 1;
};

/*!
 * Chai - getOwnEnumerablePropertySymbols utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .getOwnEnumerablePropertySymbols(object)
 *
 * This allows the retrieval of directly-owned enumerable property symbols of an
 * object. This function is necessary because Object.getOwnPropertySymbols
 * returns both enumerable and non-enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerablePropertySymbols
 * @api public
 */

var getOwnEnumerablePropertySymbols = function getOwnEnumerablePropertySymbols(obj) {
  if (typeof Object.getOwnPropertySymbols !== 'function') return [];

  return Object.getOwnPropertySymbols(obj).filter(function (sym) {
    return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
  });
};

/*!
 * Chai - getOwnEnumerableProperties utility
 * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */



/**
 * ### .getOwnEnumerableProperties(object)
 *
 * This allows the retrieval of directly-owned enumerable property names and
 * symbols of an object. This function is necessary because Object.keys only
 * returns enumerable property names, not enumerable property symbols.
 *
 * @param {Object} object
 * @returns {Array}
 * @namespace Utils
 * @name getOwnEnumerableProperties
 * @api public
 */

var getOwnEnumerableProperties = function getOwnEnumerableProperties(obj) {
  return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
};

/* !
 * Chai - checkError utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .checkError
 *
 * Checks that an error conforms to a given set of criteria and/or retrieves information about it.
 *
 * @api public
 */

/**
 * ### .compatibleInstance(thrown, errorLike)
 *
 * Checks if two instances are compatible (strict equal).
 * Returns false if errorLike is not an instance of Error, because instances
 * can only be compatible if they're both error instances.
 *
 * @name compatibleInstance
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleInstance(thrown, errorLike) {
  return errorLike instanceof Error && thrown === errorLike;
}

/**
 * ### .compatibleConstructor(thrown, errorLike)
 *
 * Checks if two constructors are compatible.
 * This function can receive either an error constructor or
 * an error instance as the `errorLike` argument.
 * Constructors are compatible if they're the same or if one is
 * an instance of another.
 *
 * @name compatibleConstructor
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleConstructor(thrown, errorLike) {
  if (errorLike instanceof Error) {
    // If `errorLike` is an instance of any error we compare their constructors
    return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
  } else if (errorLike.prototype instanceof Error || errorLike === Error) {
    // If `errorLike` is a constructor that inherits from Error, we compare `thrown` to `errorLike` directly
    return thrown.constructor === errorLike || thrown instanceof errorLike;
  }

  return false;
}

/**
 * ### .compatibleMessage(thrown, errMatcher)
 *
 * Checks if an error's message is compatible with a matcher (String or RegExp).
 * If the message contains the String or passes the RegExp test,
 * it is considered compatible.
 *
 * @name compatibleMessage
 * @param {Error} thrown error
 * @param {String|RegExp} errMatcher to look for into the message
 * @namespace Utils
 * @api public
 */

function compatibleMessage(thrown, errMatcher) {
  var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
  if (errMatcher instanceof RegExp) {
    return errMatcher.test(comparisonString);
  } else if (typeof errMatcher === 'string') {
    return comparisonString.indexOf(errMatcher) !== -1; // eslint-disable-line no-magic-numbers
  }

  return false;
}

/**
 * ### .getFunctionName(constructorFn)
 *
 * Returns the name of a function.
 * This also includes a polyfill function if `constructorFn.name` is not defined.
 *
 * @name getFunctionName
 * @param {Function} constructorFn
 * @namespace Utils
 * @api private
 */

var functionNameMatch$1 = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
  var name = '';
  if (typeof constructorFn.name === 'undefined') {
    // Here we run a polyfill if constructorFn.name is not defined
    var match = String(constructorFn).match(functionNameMatch$1);
    if (match) {
      name = match[1];
    }
  } else {
    name = constructorFn.name;
  }

  return name;
}

/**
 * ### .getConstructorName(errorLike)
 *
 * Gets the constructor name for an Error instance or constructor itself.
 *
 * @name getConstructorName
 * @param {Error|ErrorConstructor} errorLike
 * @namespace Utils
 * @api public
 */

function getConstructorName(errorLike) {
  var constructorName = errorLike;
  if (errorLike instanceof Error) {
    constructorName = getFunctionName(errorLike.constructor);
  } else if (typeof errorLike === 'function') {
    // If `err` is not an instance of Error it is an error constructor itself or another function.
    // If we've got a common function we get its name, otherwise we may need to create a new instance
    // of the error just in case it's a poorly-constructed error. Please see chaijs/chai/issues/45 to know more.
    constructorName = getFunctionName(errorLike).trim() ||
        getFunctionName(new errorLike()); // eslint-disable-line new-cap
  }

  return constructorName;
}

/**
 * ### .getMessage(errorLike)
 *
 * Gets the error message from an error.
 * If `err` is a String itself, we return it.
 * If the error has no message, we return an empty string.
 *
 * @name getMessage
 * @param {Error|String} errorLike
 * @namespace Utils
 * @api public
 */

function getMessage$2(errorLike) {
  var msg = '';
  if (errorLike && errorLike.message) {
    msg = errorLike.message;
  } else if (typeof errorLike === 'string') {
    msg = errorLike;
  }

  return msg;
}

var checkError = {
  compatibleInstance: compatibleInstance,
  compatibleConstructor: compatibleConstructor,
  compatibleMessage: compatibleMessage,
  getMessage: getMessage$2,
  getConstructorName: getConstructorName,
};

/*!
 * Chai - isNaN utility
 * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
 * MIT Licensed
 */

/**
 * ### .isNaN(value)
 *
 * Checks if the given value is NaN or not.
 *
 *     utils.isNaN(NaN); // true
 *
 * @param {Value} The value which has to be checked if it is NaN
 * @name isNaN
 * @api private
 */

function isNaN$1(value) {
  // Refer http://www.ecma-international.org/ecma-262/6.0/#sec-isnan-number
  // section's NOTE.
  return value !== value;
}

// If ECMAScript 6's Number.isNaN is present, prefer that.
var _isNaN = Number.isNaN || isNaN$1;

/*!
 * chai
 * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Dependencies that are used for multiple exports are required here only once
 */



/*!
 * test utility
 */

var test$2 = test;

/*!
 * type utility
 */

var type = typeDetect;

/*!
 * expectTypes utility
 */
var expectTypes$2 = expectTypes;

/*!
 * message utility
 */

var getMessage$3 = getMessage;

/*!
 * actual utility
 */

var getActual$2 = getActual;

/*!
 * Inspect util
 */

var inspect = inspect_1;

/*!
 * Object Display util
 */

var objDisplay$2 = objDisplay;

/*!
 * Flag utility
 */

var flag$2 = flag;

/*!
 * Flag transferring utility
 */

var transferFlags$2 = transferFlags;

/*!
 * Deep equal utility
 */

var eql = deepEql;

/*!
 * Deep path info
 */

var getPathInfo$1 = pathval.getPathInfo;

/*!
 * Check if a property exists
 */

var hasProperty$1 = pathval.hasProperty;

/*!
 * Function name
 */

var getName = getFuncName_1;

/*!
 * add Property
 */

var addProperty$2 = addProperty;

/*!
 * add Method
 */

var addMethod$2 = addMethod;

/*!
 * overwrite Property
 */

var overwriteProperty$2 = overwriteProperty;

/*!
 * overwrite Method
 */

var overwriteMethod$2 = overwriteMethod;

/*!
 * Add a chainable method
 */

var addChainableMethod$2 = addChainableMethod;

/*!
 * Overwrite chainable method
 */

var overwriteChainableMethod$2 = overwriteChainableMethod;

/*!
 * Compare by inspect method
 */

var compareByInspect$2 = compareByInspect;

/*!
 * Get own enumerable property symbols method
 */

var getOwnEnumerablePropertySymbols$2 = getOwnEnumerablePropertySymbols;

/*!
 * Get own enumerable properties method
 */

var getOwnEnumerableProperties$2 = getOwnEnumerableProperties;

/*!
 * Checks error against a given set of criteria
 */

var checkError$2 = checkError;

/*!
 * Proxify util
 */

var proxify$2 = proxify;

/*!
 * addLengthGuard util
 */

var addLengthGuard$2 = addLengthGuard;

/*!
 * isProxyEnabled helper
 */

var isProxyEnabled$2 = isProxyEnabled;

/*!
 * isNaN method
 */

var isNaN$2 = _isNaN;

var utils = {
	test: test$2,
	type: type,
	expectTypes: expectTypes$2,
	getMessage: getMessage$3,
	getActual: getActual$2,
	inspect: inspect,
	objDisplay: objDisplay$2,
	flag: flag$2,
	transferFlags: transferFlags$2,
	eql: eql,
	getPathInfo: getPathInfo$1,
	hasProperty: hasProperty$1,
	getName: getName,
	addProperty: addProperty$2,
	addMethod: addMethod$2,
	overwriteProperty: overwriteProperty$2,
	overwriteMethod: overwriteMethod$2,
	addChainableMethod: addChainableMethod$2,
	overwriteChainableMethod: overwriteChainableMethod$2,
	compareByInspect: compareByInspect$2,
	getOwnEnumerablePropertySymbols: getOwnEnumerablePropertySymbols$2,
	getOwnEnumerableProperties: getOwnEnumerableProperties$2,
	checkError: checkError$2,
	proxify: proxify$2,
	addLengthGuard: addLengthGuard$2,
	isProxyEnabled: isProxyEnabled$2,
	isNaN: isNaN$2
};

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */



var assertion = function (_chai, util) {
  /*!
   * Module dependencies.
   */

  var AssertionError = _chai.AssertionError
    , flag = util.flag;

  /*!
   * Module export.
   */

  _chai.Assertion = Assertion;

  /*!
   * Assertion Constructor
   *
   * Creates object for chaining.
   *
   * `Assertion` objects contain metadata in the form of flags. Three flags can
   * be assigned during instantiation by passing arguments to this constructor:
   *
   * - `object`: This flag contains the target of the assertion. For example, in
   *   the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
   *   contain `numKittens` so that the `equal` assertion can reference it when
   *   needed.
   *
   * - `message`: This flag contains an optional custom error message to be
   *   prepended to the error message that's generated by the assertion when it
   *   fails.
   *
   * - `ssfi`: This flag stands for "start stack function indicator". It
   *   contains a function reference that serves as the starting point for
   *   removing frames from the stack trace of the error that's created by the
   *   assertion when it fails. The goal is to provide a cleaner stack trace to
   *   end users by removing Chai's internal functions. Note that it only works
   *   in environments that support `Error.captureStackTrace`, and only when
   *   `Chai.config.includeStack` hasn't been set to `false`.
   *
   * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
   *   should retain its current value, even as assertions are chained off of
   *   this object. This is usually set to `true` when creating a new assertion
   *   from within another assertion. It's also temporarily set to `true` before
   *   an overwritten assertion gets called by the overwriting assertion.
   *
   * @param {Mixed} obj target of the assertion
   * @param {String} msg (optional) custom error message
   * @param {Function} ssfi (optional) starting point for removing stack frames
   * @param {Boolean} lockSsfi (optional) whether or not the ssfi flag is locked
   * @api private
   */

  function Assertion (obj, msg, ssfi, lockSsfi) {
    flag(this, 'ssfi', ssfi || Assertion);
    flag(this, 'lockSsfi', lockSsfi);
    flag(this, 'object', obj);
    flag(this, 'message', msg);

    return util.proxify(this);
  }

  Object.defineProperty(Assertion, 'includeStack', {
    get: function() {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      return config.includeStack;
    },
    set: function(value) {
      console.warn('Assertion.includeStack is deprecated, use chai.config.includeStack instead.');
      config.includeStack = value;
    }
  });

  Object.defineProperty(Assertion, 'showDiff', {
    get: function() {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      return config.showDiff;
    },
    set: function(value) {
      console.warn('Assertion.showDiff is deprecated, use chai.config.showDiff instead.');
      config.showDiff = value;
    }
  });

  Assertion.addProperty = function (name, fn) {
    util.addProperty(this.prototype, name, fn);
  };

  Assertion.addMethod = function (name, fn) {
    util.addMethod(this.prototype, name, fn);
  };

  Assertion.addChainableMethod = function (name, fn, chainingBehavior) {
    util.addChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  Assertion.overwriteProperty = function (name, fn) {
    util.overwriteProperty(this.prototype, name, fn);
  };

  Assertion.overwriteMethod = function (name, fn) {
    util.overwriteMethod(this.prototype, name, fn);
  };

  Assertion.overwriteChainableMethod = function (name, fn, chainingBehavior) {
    util.overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
  };

  /**
   * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
   *
   * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
   *
   * @name assert
   * @param {Philosophical} expression to be tested
   * @param {String|Function} message or function that returns message to display if expression fails
   * @param {String|Function} negatedMessage or function that returns negatedMessage to display if negated expression fails
   * @param {Mixed} expected value (remember to check for negation)
   * @param {Mixed} actual (optional) will default to `this.obj`
   * @param {Boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
   * @api private
   */

  Assertion.prototype.assert = function (expr, msg, negateMsg, expected, _actual, showDiff) {
    var ok = util.test(this, arguments);
    if (false !== showDiff) showDiff = true;
    if (undefined === expected && undefined === _actual) showDiff = false;
    if (true !== config.showDiff) showDiff = false;

    if (!ok) {
      msg = util.getMessage(this, arguments);
      var actual = util.getActual(this, arguments);
      throw new AssertionError(msg, {
          actual: actual
        , expected: expected
        , showDiff: showDiff
      }, (config.includeStack) ? this.assert : flag(this, 'ssfi'));
    }
  };

  /*!
   * ### ._obj
   *
   * Quick reference to stored `actual` value for plugin developers.
   *
   * @api private
   */

  Object.defineProperty(Assertion.prototype, '_obj',
    { get: function () {
        return flag(this, 'object');
      }
    , set: function (val) {
        flag(this, 'object', val);
      }
  });
};

/*!
 * chai
 * http://chaijs.com
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var assertions = function (chai, _) {
  var Assertion = chai.Assertion
    , AssertionError = chai.AssertionError
    , flag = _.flag;

  /**
   * ### Language Chains
   *
   * The following are provided as chainable getters to improve the readability
   * of your assertions.
   *
   * **Chains**
   *
   * - to
   * - be
   * - been
   * - is
   * - that
   * - which
   * - and
   * - has
   * - have
   * - with
   * - at
   * - of
   * - same
   * - but
   * - does
   *
   * @name language chains
   * @namespace BDD
   * @api public
   */

  [ 'to', 'be', 'been'
  , 'is', 'and', 'has', 'have'
  , 'with', 'that', 'which', 'at'
  , 'of', 'same', 'but', 'does' ].forEach(function (chain) {
    Assertion.addProperty(chain);
  });

  /**
   * ### .not
   *
   * Negates all assertions that follow in the chain.
   *
   *     expect(function () {}).to.not.throw();
   *     expect({a: 1}).to.not.have.property('b');
   *     expect([1, 2]).to.be.an('array').that.does.not.include(3);
   *
   * Just because you can negate any assertion with `.not` doesn't mean you
   * should. With great power comes great responsibility. It's often best to
   * assert that the one expected output was produced, rather than asserting
   * that one of countless unexpected outputs wasn't produced. See individual
   * assertions for specific guidance.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.equal(1); // Not recommended
   *
   * @name not
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('not', function () {
    flag(this, 'negate', true);
  });

  /**
   * ### .deep
   *
   * Causes all `.equal`, `.include`, `.members`, `.keys`, and `.property`
   * assertions that follow in the chain to use deep equality instead of strict
   * (`===`) equality. See the `deep-eql` project page for info on the deep
   * equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.keys([{a: 1}]);
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * @name deep
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('deep', function () {
    flag(this, 'deep', true);
  });

  /**
   * ### .nested
   *
   * Enables dot- and bracket-notation in all `.property` and `.include`
   * assertions that follow in the chain.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *     expect({'.a': {'[b]': 'x'}}).to.nested.include({'\\.a.\\[b\\]': 'x'});
   *
   * `.nested` cannot be combined with `.own`.
   *
   * @name nested
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('nested', function () {
    flag(this, 'nested', true);
  });

  /**
   * ### .own
   *
   * Causes all `.property` and `.include` assertions that follow in the chain
   * to ignore inherited properties.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.property('b').but.not.own.property('b'); 
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * `.own` cannot be combined with `.nested`.
   *
   * @name own
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('own', function () {
    flag(this, 'own', true);
  });

  /**
   * ### .ordered
   *
   * Causes all `.members` assertions that follow in the chain to require that
   * members be in the same order.
   *
   *     expect([1, 2]).to.have.ordered.members([1, 2])
   *       .but.not.have.ordered.members([2, 1]);
   *
   * When `.include` and `.ordered` are combined, the ordering begins at the
   * start of both arrays.
   *
   *     expect([1, 2, 3]).to.include.ordered.members([1, 2])
   *       .but.not.include.ordered.members([2, 3]);
   *
   * @name ordered
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ordered', function () {
    flag(this, 'ordered', true);
  });

  /**
   * ### .any
   *
   * Causes all `.keys` assertions that follow in the chain to only require that
   * the target have at least one of the given keys. This is the opposite of
   * `.all`, which requires that the target have all of the given keys.
   *
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name any
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('any', function () {
    flag(this, 'any', true);
    flag(this, 'all', false);
  });


  /**
   * ### .all
   *
   * Causes all `.keys` assertions that follow in the chain to require that the
   * target have all of the given keys. This is the opposite of `.any`, which
   * only requires that the target have at least one of the given keys.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` are
   * added earlier in the chain. However, it's often best to add `.all` anyway
   * because it improves readability.
   *
   * See the `.keys` doc for guidance on when to use `.any` or `.all`.
   *
   * @name all
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('all', function () {
    flag(this, 'all', true);
    flag(this, 'any', false);
  });

  /**
   * ### .a(type[, msg])
   *
   * Asserts that the target's type is equal to the given string `type`. Types
   * are case insensitive. See the `type-detect` project page for info on the
   * type detection algorithm: https://github.com/chaijs/type-detect.
   *
   *     expect('foo').to.be.a('string');
   *     expect({a: 1}).to.be.an('object');
   *     expect(null).to.be.a('null');
   *     expect(undefined).to.be.an('undefined');
   *     expect(new Error).to.be.an('error');
   *     expect(Promise.resolve()).to.be.a('promise');
   *     expect(new Float32Array).to.be.a('float32array');
   *     expect(Symbol()).to.be.a('symbol');
   *
   * `.a` supports objects that have a custom type set via `Symbol.toStringTag`.
   *
   *     var myObj = {
   *       [Symbol.toStringTag]: 'myCustomType'
   *     };
   *
   *     expect(myObj).to.be.a('myCustomType').but.not.an('object');
   *
   * It's often best to use `.a` to check a target's type before making more
   * assertions on the same target. That way, you avoid unexpected behavior from
   * any assertion that does different things based on the target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.a`. However, it's often best to
   * assert that the target is the expected type, rather than asserting that it
   * isn't one of many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.an('array'); // Not recommended
   *
   * `.a` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     expect(1).to.be.a('string', 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.a('string');
   *
   * `.a` can also be used as a language chain to improve the readability of
   * your assertions. 
   *
   *     expect({b: 2}).to.have.a.property('b');
   *
   * The alias `.an` can be used interchangeably with `.a`.
   *
   * @name a
   * @alias an
   * @param {String} type
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function an (type, msg) {
    if (msg) flag(this, 'message', msg);
    type = type.toLowerCase();
    var obj = flag(this, 'object')
      , article = ~[ 'a', 'e', 'i', 'o', 'u' ].indexOf(type.charAt(0)) ? 'an ' : 'a ';

    this.assert(
        type === _.type(obj).toLowerCase()
      , 'expected #{this} to be ' + article + type
      , 'expected #{this} not to be ' + article + type
    );
  }

  Assertion.addChainableMethod('an', an);
  Assertion.addChainableMethod('a', an);

  /**
   * ### .include(val[, msg])
   *
   * When the target is a string, `.include` asserts that the given string `val`
   * is a substring of the target.
   *
   *     expect('foobar').to.include('foo');
   *
   * When the target is an array, `.include` asserts that the given `val` is a
   * member of the target.
   *
   *     expect([1, 2, 3]).to.include(2);
   *
   * When the target is an object, `.include` asserts that the given object
   * `val`'s properties are a subset of the target's properties.
   *
   *     expect({a: 1, b: 2, c: 3}).to.include({a: 1, b: 2});
   *
   * When the target is a Set or WeakSet, `.include` asserts that the given `val` is a
   * member of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Set([1, 2])).to.include(2);
   *
   * When the target is a Map, `.include` asserts that the given `val` is one of
   * the values of the target. SameValueZero equality algorithm is used.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.include(2);
   *
   * Because `.include` does different things based on the target's type, it's
   * important to check the target's type before using `.include`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([1, 2, 3]).to.be.an('array').that.includes(2);
   *
   * By default, strict (`===`) equality is used to compare array members and
   * object properties. Add `.deep` earlier in the chain to use deep equality
   * instead (WeakSet targets are not supported). See the `deep-eql` project
   * page for info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) includes `{a: 1}`
   *     expect([{a: 1}]).to.deep.include({a: 1});
   *     expect([{a: 1}]).to.not.include({a: 1});
   *
   *     // Target object deeply (but not strictly) includes `x: {a: 1}`
   *     expect({x: {a: 1}}).to.deep.include({x: {a: 1}});
   *     expect({x: {a: 1}}).to.not.include({x: {a: 1}});
   *
   * By default, all of the target's properties are searched when working with
   * objects. This includes properties that are inherited and/or non-enumerable.
   * Add `.own` earlier in the chain to exclude the target's inherited
   * properties from the search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.own.include({a: 1});
   *     expect({a: 1}).to.include({b: 2}).but.not.own.include({b: 2});
   *
   * Note that a target object is always only searched for `val`'s own
   * enumerable properties.
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({a: {b: 2}}).to.deep.own.include({a: {b: 2}});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.nested.include({'a.b[1]': 'y'});
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 2}}).to.nested.include({'\\.a.\\[b\\]': 2});
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}}).to.deep.nested.include({'a.b[0]': {c: 3}});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.include`.
   *
   *     expect('foobar').to.not.include('taco');
   *     expect([1, 2, 3]).to.not.include(4);
   * 
   * However, it's dangerous to negate `.include` when the target is an object.
   * The problem is that it creates uncertain expectations by asserting that the
   * target object doesn't have all of `val`'s key/value pairs but may or may
   * not have some of them. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target object isn't even expected to have `val`'s keys, it's
   * often best to assert exactly that.
   *
   *     expect({c: 3}).to.not.have.any.keys('a', 'b'); // Recommended
   *     expect({c: 3}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * When the target object is expected to have `val`'s keys, it's often best to
   * assert that each of the properties has its expected value, rather than
   * asserting that each property doesn't have one of many unexpected values.
   *
   *     expect({a: 3, b: 4}).to.include({a: 3, b: 4}); // Recommended
   *     expect({a: 3, b: 4}).to.not.include({a: 1, b: 2}); // Not recommended
   *
   * `.include` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.include(4, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.include(4);
   *
   * `.include` can also be used as a language chain, causing all `.members` and
   * `.keys` assertions that follow in the chain to require the target to be a
   * superset of the expected set, rather than an identical set. Note that
   * `.members` ignores duplicates in the subset when `.include` is added.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * Note that adding `.any` earlier in the chain causes the `.keys` assertion
   * to ignore `.include`.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *
   * The aliases `.includes`, `.contain`, and `.contains` can be used
   * interchangeably with `.include`.
   *
   * @name include
   * @alias contain
   * @alias includes
   * @alias contains
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function SameValueZero(a, b) {
    return (_.isNaN(a) && _.isNaN(b)) || a === b;
  }

  function includeChainingBehavior () {
    flag(this, 'contains', true);
  }

  function include (val, msg) {
    if (msg) flag(this, 'message', msg);
    
    var obj = flag(this, 'object')
      , objType = _.type(obj).toLowerCase()
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate')
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , descriptor = isDeep ? 'deep ' : '';

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    var included = false;

    switch (objType) {
      case 'string':
        included = obj.indexOf(val) !== -1;
        break;

      case 'weakset':
        if (isDeep) {
          throw new AssertionError(
            flagMsg + 'unable to use .deep.include with WeakSet',
            undefined,
            ssfi
          );
        }

        included = obj.has(val);
        break;

      case 'map':
        var isEql = isDeep ? _.eql : SameValueZero;
        obj.forEach(function (item) {
          included = included || isEql(item, val);
        });
        break;

      case 'set':
        if (isDeep) {
          obj.forEach(function (item) {
            included = included || _.eql(item, val);
          });
        } else {
          included = obj.has(val);
        }
        break;

      case 'array':
        if (isDeep) {
          included = obj.some(function (item) {
            return _.eql(item, val);
          });
        } else {
          included = obj.indexOf(val) !== -1;
        }
        break;

      default:
        // This block is for asserting a subset of properties in an object.
        // `_.expectTypes` isn't used here because `.include` should work with
        // objects with a custom `@@toStringTag`.
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + 'object tested must be an array, a map, an object,'
              + ' a set, a string, or a weakset, but ' + objType + ' given',
            undefined,
            ssfi
          );
        }

        var props = Object.keys(val)
          , firstErr = null
          , numErrs = 0;
  
        props.forEach(function (prop) {
          var propAssertion = new Assertion(obj);
          _.transferFlags(this, propAssertion, true);
          flag(propAssertion, 'lockSsfi', true);
  
          if (!negate || props.length === 1) {
            propAssertion.property(prop, val[prop]);
            return;
          }
  
          try {
            propAssertion.property(prop, val[prop]);
          } catch (err) {
            if (!_.checkError.compatibleConstructor(err, AssertionError)) {
              throw err;
            }
            if (firstErr === null) firstErr = err;
            numErrs++;
          }
        }, this);
  
        // When validating .not.include with multiple properties, we only want
        // to throw an assertion error if all of the properties are included,
        // in which case we throw the first property assertion error that we
        // encountered.
        if (negate && props.length > 1 && numErrs === props.length) {
          throw firstErr;
        }
        return;
    }

    // Assert inclusion in collection or substring in a string.
    this.assert(
      included
      , 'expected #{this} to ' + descriptor + 'include ' + _.inspect(val)
      , 'expected #{this} to not ' + descriptor + 'include ' + _.inspect(val));
  }

  Assertion.addChainableMethod('include', include, includeChainingBehavior);
  Assertion.addChainableMethod('contain', include, includeChainingBehavior);
  Assertion.addChainableMethod('contains', include, includeChainingBehavior);
  Assertion.addChainableMethod('includes', include, includeChainingBehavior);

  /**
   * ### .ok
   *
   * Asserts that the target is loosely (`==`) equal to `true`. However, it's
   * often best to assert that the target is strictly (`===`) or deeply equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.ok; // Not recommended
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.be.ok; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.ok`.
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.not.be.ok; // Not recommended
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.ok; // Not recommended
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.be.ok; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.be.ok; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.ok;
   *
   * @name ok
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('ok', function () {
    this.assert(
        flag(this, 'object')
      , 'expected #{this} to be truthy'
      , 'expected #{this} to be falsy');
  });

  /**
   * ### .true
   *
   * Asserts that the target is strictly (`===`) equal to `true`.
   *
   *     expect(true).to.be.true;
   *
   * Add `.not` earlier in the chain to negate `.true`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `true`.
   *
   *     expect(false).to.be.false; // Recommended
   *     expect(false).to.not.be.true; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.true; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(false, 'nooo why fail??').to.be.true;
   *
   * @name true
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('true', function () {
    this.assert(
        true === flag(this, 'object')
      , 'expected #{this} to be true'
      , 'expected #{this} to be false'
      , flag(this, 'negate') ? false : true
    );
  });

  /**
   * ### .false
   *
   * Asserts that the target is strictly (`===`) equal to `false`.
   *
   *     expect(false).to.be.false;
   *
   * Add `.not` earlier in the chain to negate `.false`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `false`.
   *
   *     expect(true).to.be.true; // Recommended
   *     expect(true).to.not.be.false; // Not recommended
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.false; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(true, 'nooo why fail??').to.be.false;
   *
   * @name false
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('false', function () {
    this.assert(
        false === flag(this, 'object')
      , 'expected #{this} to be false'
      , 'expected #{this} to be true'
      , flag(this, 'negate') ? true : false
    );
  });

  /**
   * ### .null
   *
   * Asserts that the target is strictly (`===`) equal to `null`.
   *
   *     expect(null).to.be.null;
   *
   * Add `.not` earlier in the chain to negate `.null`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `null`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.null; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.null;
   *
   * @name null
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('null', function () {
    this.assert(
        null === flag(this, 'object')
      , 'expected #{this} to be null'
      , 'expected #{this} not to be null'
    );
  });

  /**
   * ### .undefined
   *
   * Asserts that the target is strictly (`===`) equal to `undefined`.
   *
   *     expect(undefined).to.be.undefined;
   *
   * Add `.not` earlier in the chain to negate `.undefined`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to `undefined`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.undefined; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.undefined;
   *
   * @name undefined
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('undefined', function () {
    this.assert(
        undefined === flag(this, 'object')
      , 'expected #{this} to be undefined'
      , 'expected #{this} not to be undefined'
    );
  });

  /**
   * ### .NaN
   *
   * Asserts that the target is exactly `NaN`.
   *
   *     expect(NaN).to.be.NaN;
   *
   * Add `.not` earlier in the chain to negate `.NaN`. However, it's often best
   * to assert that the target is equal to its expected value, rather than not
   * equal to `NaN`.
   *
   *     expect('foo').to.equal('foo'); // Recommended
   *     expect('foo').to.not.be.NaN; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(42, 'nooo why fail??').to.be.NaN;
   *
   * @name NaN
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('NaN', function () {
    this.assert(
        _.isNaN(flag(this, 'object'))
        , 'expected #{this} to be NaN'
        , 'expected #{this} not to be NaN'
    );
  });

  /**
   * ### .exist
   *
   * Asserts that the target is not strictly (`===`) equal to either `null` or
   * `undefined`. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.exist; // Not recommended
   *
   *     expect(0).to.equal(0); // Recommended
   *     expect(0).to.exist; // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.exist`.
   *
   *     expect(null).to.be.null; // Recommended
   *     expect(null).to.not.exist; // Not recommended
   *
   *     expect(undefined).to.be.undefined; // Recommended
   *     expect(undefined).to.not.exist; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(null, 'nooo why fail??').to.exist;
   *
   * @name exist
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('exist', function () {
    var val = flag(this, 'object');
    this.assert(
        val !== null && val !== undefined
      , 'expected #{this} to exist'
      , 'expected #{this} to not exist'
    );
  });

  /**
   * ### .empty
   *
   * When the target is a string or array, `.empty` asserts that the target's
   * `length` property is strictly (`===`) equal to `0`.
   *
   *     expect([]).to.be.empty;
   *     expect('').to.be.empty;
   *
   * When the target is a map or set, `.empty` asserts that the target's `size`
   * property is strictly equal to `0`.
   *
   *     expect(new Set()).to.be.empty;
   *     expect(new Map()).to.be.empty;
   *
   * When the target is a non-function object, `.empty` asserts that the target
   * doesn't have any own enumerable properties. Properties with Symbol-based
   * keys are excluded from the count.
   *
   *     expect({}).to.be.empty;
   *
   * Because `.empty` does different things based on the target's type, it's
   * important to check the target's type before using `.empty`. See the `.a`
   * doc for info on testing a target's type.
   *
   *     expect([]).to.be.an('array').that.is.empty;
   *
   * Add `.not` earlier in the chain to negate `.empty`. However, it's often
   * best to assert that the target contains its expected number of values,
   * rather than asserting that it's not empty.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.not.be.empty; // Not recommended
   *
   *     expect(new Set([1, 2, 3])).to.have.property('size', 3); // Recommended
   *     expect(new Set([1, 2, 3])).to.not.be.empty; // Not recommended
   *
   *     expect(Object.keys({a: 1})).to.have.lengthOf(1); // Recommended
   *     expect({a: 1}).to.not.be.empty; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect([1, 2, 3], 'nooo why fail??').to.be.empty;
   *
   * @name empty
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('empty', function () {
    var val = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , itemsCount;

    flagMsg = flagMsg ? flagMsg + ': ' : '';

    switch (_.type(val).toLowerCase()) {
      case 'array':
      case 'string':
        itemsCount = val.length;
        break;
      case 'map':
      case 'set':
        itemsCount = val.size;
        break;
      case 'weakmap':
      case 'weakset':
        throw new AssertionError(
          flagMsg + '.empty was passed a weak collection',
          undefined,
          ssfi
        );
      case 'function':
        var msg = flagMsg + '.empty was passed a function ' + _.getName(val);
        throw new AssertionError(msg.trim(), undefined, ssfi);
      default:
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + '.empty was passed non-string primitive ' + _.inspect(val),
            undefined,
            ssfi
          );
        }
        itemsCount = Object.keys(val).length;
    }

    this.assert(
        0 === itemsCount
      , 'expected #{this} to be empty'
      , 'expected #{this} not to be empty'
    );
  });

  /**
   * ### .arguments
   *
   * Asserts that the target is an `arguments` object.
   *
   *     function test () {
   *       expect(arguments).to.be.arguments;
   *     }
   *
   *     test();
   *
   * Add `.not` earlier in the chain to negate `.arguments`. However, it's often
   * best to assert which type the target is expected to be, rather than
   * asserting that its not an `arguments` object.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.arguments; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({}, 'nooo why fail??').to.be.arguments;
   *
   * The alias `.Arguments` can be used interchangeably with `.arguments`.
   *
   * @name arguments
   * @alias Arguments
   * @namespace BDD
   * @api public
   */

  function checkArguments () {
    var obj = flag(this, 'object')
      , type = _.type(obj);
    this.assert(
        'Arguments' === type
      , 'expected #{this} to be arguments but got ' + type
      , 'expected #{this} to not be arguments'
    );
  }

  Assertion.addProperty('arguments', checkArguments);
  Assertion.addProperty('Arguments', checkArguments);

  /**
   * ### .equal(val[, msg])
   *
   * Asserts that the target is strictly (`===`) equal to the given `val`.
   *
   *     expect(1).to.equal(1);
   *     expect('foo').to.equal('foo');
   * 
   * Add `.deep` earlier in the chain to use deep equality instead. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) equals `{a: 1}`
   *     expect({a: 1}).to.deep.equal({a: 1});
   *     expect({a: 1}).to.not.equal({a: 1});
   *
   *     // Target array deeply (but not strictly) equals `[1, 2]`
   *     expect([1, 2]).to.deep.equal([1, 2]);
   *     expect([1, 2]).to.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.equal`. However, it's often
   * best to assert that the target is equal to its expected value, rather than
   * not equal to one of countless unexpected values.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.equal(2); // Not recommended
   *
   * `.equal` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.equal(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.equal(2);
   *
   * The aliases `.equals` and `eq` can be used interchangeably with `.equal`.
   *
   * @name equal
   * @alias equals
   * @alias eq
   * @param {Mixed} val
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEqual (val, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    if (flag(this, 'deep')) {
      return this.eql(val);
    } else {
      this.assert(
          val === obj
        , 'expected #{this} to equal #{exp}'
        , 'expected #{this} to not equal #{exp}'
        , val
        , this._obj
        , true
      );
    }
  }

  Assertion.addMethod('equal', assertEqual);
  Assertion.addMethod('equals', assertEqual);
  Assertion.addMethod('eq', assertEqual);

  /**
   * ### .eql(obj[, msg])
   *
   * Asserts that the target is deeply equal to the given `obj`. See the
   * `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target object is deeply (but not strictly) equal to {a: 1}
   *     expect({a: 1}).to.eql({a: 1}).but.not.equal({a: 1});
   *
   *     // Target array is deeply (but not strictly) equal to [1, 2]
   *     expect([1, 2]).to.eql([1, 2]).but.not.equal([1, 2]);
   *
   * Add `.not` earlier in the chain to negate `.eql`. However, it's often best
   * to assert that the target is deeply equal to its expected value, rather
   * than not deeply equal to one of countless unexpected values.
   *
   *     expect({a: 1}).to.eql({a: 1}); // Recommended
   *     expect({a: 1}).to.not.eql({b: 2}); // Not recommended
   *
   * `.eql` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect({a: 1}).to.eql({b: 2}, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.eql({b: 2});
   *
   * The alias `.eqls` can be used interchangeably with `.eql`.
   *
   * The `.deep.equal` assertion is almost identical to `.eql` but with one
   * difference: `.deep.equal` causes deep equality comparisons to also be used
   * for any other assertions that follow in the chain.
   *
   * @name eql
   * @alias eqls
   * @param {Mixed} obj
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertEql(obj, msg) {
    if (msg) flag(this, 'message', msg);
    this.assert(
        _.eql(obj, flag(this, 'object'))
      , 'expected #{this} to deeply equal #{exp}'
      , 'expected #{this} to not deeply equal #{exp}'
      , obj
      , this._obj
      , true
    );
  }

  Assertion.addMethod('eql', assertEql);
  Assertion.addMethod('eqls', assertEql);

  /**
   * ### .above(n[, msg])
   *
   * Asserts that the target is a number or a date greater than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.above(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.above(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.above`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(1).to.not.be.above(2); // Not recommended
   *
   * `.above` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.above(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.above(2);
   *
   * The aliases `.gt` and `.greaterThan` can be used interchangeably with
   * `.above`.
   *
   * @name above
   * @alias gt
   * @alias greaterThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertAbove (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }
    
    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to above must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to above must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len > n
        , 'expected #{this} to have a length above #{exp} but got #{act}'
        , 'expected #{this} to not have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj > n
        , 'expected #{this} to be above #{exp}'
        , 'expected #{this} to be at most #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('above', assertAbove);
  Assertion.addMethod('gt', assertAbove);
  Assertion.addMethod('greaterThan', assertAbove);

  /**
   * ### .least(n[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `n` respectively. However, it's often best to assert that the target is equal to
   * its expected value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.at.least(1); // Not recommended
   *     expect(2).to.be.at.least(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than or equal to the given number
   * `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.least(2); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.least`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.at.least(2); // Not recommended
   *
   * `.least` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.at.least(2, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.at.least(2);
   *
   * The alias `.gte` can be used interchangeably with `.least`.
   *
   * @name least
   * @alias gte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLeast (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to least must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to least must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len >= n
        , 'expected #{this} to have a length at least #{exp} but got #{act}'
        , 'expected #{this} to have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj >= n
        , 'expected #{this} to be at least #{exp}'
        , 'expected #{this} to be below #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('least', assertLeast);
  Assertion.addMethod('gte', assertLeast);

  /**
   * ### .below(n[, msg])
   *
   * Asserts that the target is a number or a date less than the given number or date `n` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.below(2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is less than the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.below(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.length(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.below(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.below`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.below(1); // Not recommended
   *
   * `.below` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.below(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.below(1);
   *
   * The aliases `.lt` and `.lessThan` can be used interchangeably with
   * `.below`.
   *
   * @name below
   * @alias lt
   * @alias lessThan
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertBelow (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to below must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to below must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len < n
        , 'expected #{this} to have a length below #{exp} but got #{act}'
        , 'expected #{this} to not have a length below #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj < n
        , 'expected #{this} to be below #{exp}'
        , 'expected #{this} to be at least #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('below', assertBelow);
  Assertion.addMethod('lt', assertBelow);
  Assertion.addMethod('lessThan', assertBelow);

  /**
   * ### .most(n[, msg])
   *
   * Asserts that the target is a number or a date less than or equal to the given number
   * or date `n` respectively. However, it's often best to assert that the target is equal to its
   * expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.at.most(2); // Not recommended
   *     expect(1).to.be.at.most(1); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is less than or equal to the given number `n`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.at.most(4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.most`.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.not.be.at.most(1); // Not recommended
   *
   * `.most` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(2).to.be.at.most(1, 'nooo why fail??');
   *     expect(2, 'nooo why fail??').to.be.at.most(1);
   *
   * The alias `.lte` can be used interchangeably with `.most`.
   *
   * @name most
   * @alias lte
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertMost (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , nType = _.type(n).toLowerCase()
      , shouldThrow = true;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }
    
    if (!doLength && (objType === 'date' && nType !== 'date')) {
      errorMessage = msgPrefix + 'the argument to most must be a date';
    } else if (nType !== 'number' && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the argument to most must be a number';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len <= n
        , 'expected #{this} to have a length at most #{exp} but got #{act}'
        , 'expected #{this} to have a length above #{exp}'
        , n
        , len
      );
    } else {
      this.assert(
          obj <= n
        , 'expected #{this} to be at most #{exp}'
        , 'expected #{this} to be above #{exp}'
        , n
      );
    }
  }

  Assertion.addMethod('most', assertMost);
  Assertion.addMethod('lte', assertMost);

  /**
   * ### .within(start, finish[, msg])
   *
   * Asserts that the target is a number or a date greater than or equal to the given
   * number or date `start`, and less than or equal to the given number or date `finish` respectively.
   * However, it's often best to assert that the target is equal to its expected
   * value.
   *
   *     expect(2).to.equal(2); // Recommended
   *     expect(2).to.be.within(1, 3); // Not recommended
   *     expect(2).to.be.within(2, 3); // Not recommended
   *     expect(2).to.be.within(1, 2); // Not recommended
   *
   * Add `.lengthOf` earlier in the chain to assert that the value of the
   * target's `length` property is greater than or equal to the given number
   * `start`, and less than or equal to the given number `finish`.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.have.lengthOf.within(2, 4); // Not recommended
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3); // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf.within(2, 4); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.within`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.within(2, 4); // Not recommended
   *
   * `.within` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(4).to.be.within(1, 3, 'nooo why fail??');
   *     expect(4, 'nooo why fail??').to.be.within(1, 3);
   *
   * @name within
   * @param {Number} start lower bound inclusive
   * @param {Number} finish upper bound inclusive
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('within', function (start, finish, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , doLength = flag(this, 'doLength')
      , flagMsg = flag(this, 'message')
      , msgPrefix = ((flagMsg) ? flagMsg + ': ' : '')
      , ssfi = flag(this, 'ssfi')
      , objType = _.type(obj).toLowerCase()
      , startType = _.type(start).toLowerCase()
      , finishType = _.type(finish).toLowerCase()
      , shouldThrow = true
      , range = (startType === 'date' && finishType === 'date')
          ? start.toUTCString() + '..' + finish.toUTCString()
          : start + '..' + finish;

    if (doLength) {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    }

    if (!doLength && (objType === 'date' && (startType !== 'date' || finishType !== 'date'))) {
      errorMessage = msgPrefix + 'the arguments to within must be dates';
    } else if ((startType !== 'number' || finishType !== 'number') && (doLength || objType === 'number')) {
      errorMessage = msgPrefix + 'the arguments to within must be numbers';
    } else if (!doLength && (objType !== 'date' && objType !== 'number')) {
      var printObj = (objType === 'string') ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + 'expected ' + printObj + ' to be a number or a date';
    } else {
      shouldThrow = false;
    }

    if (shouldThrow) {
      throw new AssertionError(errorMessage, undefined, ssfi);
    }

    if (doLength) {
      var len = obj.length;
      this.assert(
          len >= start && len <= finish
        , 'expected #{this} to have a length within ' + range
        , 'expected #{this} to not have a length within ' + range
      );
    } else {
      this.assert(
          obj >= start && obj <= finish
        , 'expected #{this} to be within ' + range
        , 'expected #{this} to not be within ' + range
      );
    }
  });

  /**
   * ### .instanceof(constructor[, msg])
   *
   * Asserts that the target is an instance of the given `constructor`.
   *
   *     function Cat () { }
   *
   *     expect(new Cat()).to.be.an.instanceof(Cat);
   *     expect([1, 2]).to.be.an.instanceof(Array);
   *
   * Add `.not` earlier in the chain to negate `.instanceof`.
   *
   *     expect({a: 1}).to.not.be.an.instanceof(Array);
   *
   * `.instanceof` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.be.an.instanceof(Array, 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.an.instanceof(Array);
   *
   * Due to limitations in ES5, `.instanceof` may not always work as expected
   * when using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing built-in object such as
   * `Array`, `Error`, and `Map`. See your transpiler's docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * The alias `.instanceOf` can be used interchangeably with `.instanceof`.
   *
   * @name instanceof
   * @param {Constructor} constructor
   * @param {String} msg _optional_
   * @alias instanceOf
   * @namespace BDD
   * @api public
   */

  function assertInstanceOf (constructor, msg) {
    if (msg) flag(this, 'message', msg);

    var target = flag(this, 'object');
    var ssfi = flag(this, 'ssfi');
    var flagMsg = flag(this, 'message');

    try {
      var isInstanceOf = target instanceof constructor;
    } catch (err) {
      if (err instanceof TypeError) {
        flagMsg = flagMsg ? flagMsg + ': ' : '';
        throw new AssertionError(
          flagMsg + 'The instanceof assertion needs a constructor but '
            + _.type(constructor) + ' was given.',
          undefined,
          ssfi
        );
      }
      throw err;
    }

    var name = _.getName(constructor);
    if (name === null) {
      name = 'an unnamed constructor';
    }

    this.assert(
        isInstanceOf
      , 'expected #{this} to be an instance of ' + name
      , 'expected #{this} to not be an instance of ' + name
    );
  }

  Assertion.addMethod('instanceof', assertInstanceOf);
  Assertion.addMethod('instanceOf', assertInstanceOf);

  /**
   * ### .property(name[, val[, msg]])
   *
   * Asserts that the target has a property with the given key `name`.
   *
   *     expect({a: 1}).to.have.property('a');
   *
   * When `val` is provided, `.property` also asserts that the property's value
   * is equal to the given `val`.
   *
   *     expect({a: 1}).to.have.property('a', 1);
   *
   * By default, strict (`===`) equality is used. Add `.deep` earlier in the
   * chain to use deep equality instead. See the `deep-eql` project page for
   * info on the deep equality algorithm: https://github.com/chaijs/deep-eql.
   *
   *     // Target object deeply (but not strictly) has property `x: {a: 1}`
   *     expect({x: {a: 1}}).to.have.deep.property('x', {a: 1});
   *     expect({x: {a: 1}}).to.not.have.property('x', {a: 1});
   *
   * The target's enumerable and non-enumerable properties are always included
   * in the search. By default, both own and inherited properties are included.
   * Add `.own` earlier in the chain to exclude inherited properties from the
   * search.
   *
   *     Object.prototype.b = 2;
   *
   *     expect({a: 1}).to.have.own.property('a');
   *     expect({a: 1}).to.have.own.property('a', 1);
   *     expect({a: 1}).to.have.property('b').but.not.own.property('b'); 
   *
   * `.deep` and `.own` can be combined.
   *
   *     expect({x: {a: 1}}).to.have.deep.own.property('x', {a: 1});
   *
   * Add `.nested` earlier in the chain to enable dot- and bracket-notation when
   * referencing nested properties.
   *
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]');
   *     expect({a: {b: ['x', 'y']}}).to.have.nested.property('a.b[1]', 'y');
   *
   * If `.` or `[]` are part of an actual property name, they can be escaped by
   * adding two backslashes before them.
   *
   *     expect({'.a': {'[b]': 'x'}}).to.have.nested.property('\\.a.\\[b\\]');
   *
   * `.deep` and `.nested` can be combined.
   *
   *     expect({a: {b: [{c: 3}]}})
   *       .to.have.deep.nested.property('a.b[0]', {c: 3});
   *
   * `.own` and `.nested` cannot be combined.
   *
   * Add `.not` earlier in the chain to negate `.property`.
   *
   *     expect({a: 1}).to.not.have.property('b');
   * 
   * However, it's dangerous to negate `.property` when providing `val`. The
   * problem is that it creates uncertain expectations by asserting that the
   * target either doesn't have a property with the given key `name`, or that it
   * does have a property with the given key `name` but its value isn't equal to
   * the given `val`. It's often best to identify the exact output that's
   * expected, and then write an assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property with the given key
   * `name`, it's often best to assert exactly that.
   *
   *     expect({b: 2}).to.not.have.property('a'); // Recommended
   *     expect({b: 2}).to.not.have.property('a', 1); // Not recommended
   *
   * When the target is expected to have a property with the given key `name`,
   * it's often best to assert that the property has its expected value, rather
   * than asserting that it doesn't have one of many unexpected values.
   *
   *     expect({a: 3}).to.have.property('a', 3); // Recommended
   *     expect({a: 3}).to.not.have.property('a', 1); // Not recommended
   *
   * `.property` changes the target of any assertions that follow in the chain
   * to be the value of the property from the original target object.
   *
   *     expect({a: 1}).to.have.property('a').that.is.a('number');
   *
   * `.property` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing `val`, only use the
   * second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.property('a', 2, 'nooo why fail??');
   *     expect({a: 1}, 'nooo why fail??').to.have.property('a', 2);
   *     expect({a: 1}, 'nooo why fail??').to.have.property('b');
   *
   *     // Not recommended
   *     expect({a: 1}).to.have.property('b', undefined, 'nooo why fail??');
   * 
   * The above assertion isn't the same thing as not providing `val`. Instead,
   * it's asserting that the target object has a `b` property that's equal to
   * `undefined`.
   *
   * The assertions `.ownProperty` and `.haveOwnProperty` can be used
   * interchangeably with `.own.property`.
   *
   * @name property
   * @param {String} name
   * @param {Mixed} val (optional)
   * @param {String} msg _optional_
   * @returns value of property for chaining
   * @namespace BDD
   * @api public
   */

  function assertProperty (name, val, msg) {
    if (msg) flag(this, 'message', msg);

    var isNested = flag(this, 'nested')
      , isOwn = flag(this, 'own')
      , flagMsg = flag(this, 'message')
      , obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi');

    if (isNested && isOwn) {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
        flagMsg + 'The "nested" and "own" flags cannot be combined.',
        undefined,
        ssfi
      );
    }

    if (obj === null || obj === undefined) {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
        flagMsg + 'Target cannot be null or undefined.',
        undefined,
        ssfi
      );
    }

    var isDeep = flag(this, 'deep')
      , negate = flag(this, 'negate')
      , pathInfo = isNested ? _.getPathInfo(obj, name) : null
      , value = isNested ? pathInfo.value : obj[name];

    var descriptor = '';
    if (isDeep) descriptor += 'deep ';
    if (isOwn) descriptor += 'own ';
    if (isNested) descriptor += 'nested ';
    descriptor += 'property ';

    var hasProperty;
    if (isOwn) hasProperty = Object.prototype.hasOwnProperty.call(obj, name);
    else if (isNested) hasProperty = pathInfo.exists;
    else hasProperty = _.hasProperty(obj, name);

    // When performing a negated assertion for both name and val, merely having
    // a property with the given name isn't enough to cause the assertion to
    // fail. It must both have a property with the given name, and the value of
    // that property must equal the given val. Therefore, skip this assertion in
    // favor of the next.
    if (!negate || arguments.length === 1) {
      this.assert(
          hasProperty
        , 'expected #{this} to have ' + descriptor + _.inspect(name)
        , 'expected #{this} to not have ' + descriptor + _.inspect(name));
    }

    if (arguments.length > 1) {
      this.assert(
          hasProperty && (isDeep ? _.eql(val, value) : val === value)
        , 'expected #{this} to have ' + descriptor + _.inspect(name) + ' of #{exp}, but got #{act}'
        , 'expected #{this} to not have ' + descriptor + _.inspect(name) + ' of #{act}'
        , val
        , value
      );
    }

    flag(this, 'object', value);
  }

  Assertion.addMethod('property', assertProperty);

  function assertOwnProperty (name, value, msg) {
    flag(this, 'own', true);
    assertProperty.apply(this, arguments);
  }

  Assertion.addMethod('ownProperty', assertOwnProperty);
  Assertion.addMethod('haveOwnProperty', assertOwnProperty);

  /**
   * ### .ownPropertyDescriptor(name[, descriptor[, msg]])
   *
   * Asserts that the target has its own property descriptor with the given key
   * `name`. Enumerable and non-enumerable properties are included in the
   * search.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a');
   *
   * When `descriptor` is provided, `.ownPropertyDescriptor` also asserts that
   * the property's descriptor is deeply equal to the given `descriptor`. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * Add `.not` earlier in the chain to negate `.ownPropertyDescriptor`.
   *
   *     expect({a: 1}).to.not.have.ownPropertyDescriptor('b');
   * 
   * However, it's dangerous to negate `.ownPropertyDescriptor` when providing
   * a `descriptor`. The problem is that it creates uncertain expectations by
   * asserting that the target either doesn't have a property descriptor with
   * the given key `name`, or that it does have a property descriptor with the
   * given key `name` but its not deeply equal to the given `descriptor`. It's
   * often best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to have a property descriptor with the given
   * key `name`, it's often best to assert exactly that.
   *
   *     // Recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a');
   *
   *     // Not recommended
   *     expect({b: 2}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * When the target is expected to have a property descriptor with the given
   * key `name`, it's often best to assert that the property has its expected
   * descriptor, rather than asserting that it doesn't have one of many
   * unexpected descriptors.
   *
   *     // Recommended
   *     expect({a: 3}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 3,
   *     });
   *
   *     // Not recommended
   *     expect({a: 3}).to.not.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 1,
   *     });
   *
   * `.ownPropertyDescriptor` changes the target of any assertions that follow
   * in the chain to be the value of the property descriptor from the original
   * target object.
   *
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a')
   *       .that.has.property('enumerable', true);
   *
   * `.ownPropertyDescriptor` accepts an optional `msg` argument which is a
   * custom error message to show when the assertion fails. The message can also
   * be given as the second argument to `expect`. When not providing
   * `descriptor`, only use the second form.
   *
   *     // Recommended
   *     expect({a: 1}).to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     }, 'nooo why fail??');
   *
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('a', {
   *       configurable: true,
   *       enumerable: true,
   *       writable: true,
   *       value: 2,
   *     });
   * 
   *     // Recommended
   *     expect({a: 1}, 'nooo why fail??').to.have.ownPropertyDescriptor('b');
   *
   *     // Not recommended
   *     expect({a: 1})
   *       .to.have.ownPropertyDescriptor('b', undefined, 'nooo why fail??');
   *
   * The above assertion isn't the same thing as not providing `descriptor`.
   * Instead, it's asserting that the target object has a `b` property
   * descriptor that's deeply equal to `undefined`.
   *
   * The alias `.haveOwnPropertyDescriptor` can be used interchangeably with
   * `.ownPropertyDescriptor`.
   *
   * @name ownPropertyDescriptor
   * @alias haveOwnPropertyDescriptor
   * @param {String} name
   * @param {Object} descriptor _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertOwnPropertyDescriptor (name, descriptor, msg) {
    if (typeof descriptor === 'string') {
      msg = descriptor;
      descriptor = null;
    }
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    if (actualDescriptor && descriptor) {
      this.assert(
          _.eql(descriptor, actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to match ' + _.inspect(descriptor) + ', got ' + _.inspect(actualDescriptor)
        , 'expected the own property descriptor for ' + _.inspect(name) + ' on #{this} to not match ' + _.inspect(descriptor)
        , descriptor
        , actualDescriptor
        , true
      );
    } else {
      this.assert(
          actualDescriptor
        , 'expected #{this} to have an own property descriptor for ' + _.inspect(name)
        , 'expected #{this} to not have an own property descriptor for ' + _.inspect(name)
      );
    }
    flag(this, 'object', actualDescriptor);
  }

  Assertion.addMethod('ownPropertyDescriptor', assertOwnPropertyDescriptor);
  Assertion.addMethod('haveOwnPropertyDescriptor', assertOwnPropertyDescriptor);

  /**
   * ### .lengthOf(n[, msg])
   *
   * Asserts that the target's `length` property is equal to the given number
   * `n`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *     expect('foo').to.have.lengthOf(3);
   *
   * Add `.not` earlier in the chain to negate `.lengthOf`. However, it's often
   * best to assert that the target's `length` property is equal to its expected
   * value, rather than not equal to one of many unexpected values.
   *
   *     expect('foo').to.have.lengthOf(3); // Recommended
   *     expect('foo').to.not.have.lengthOf(4); // Not recommended
   *
   * `.lengthOf` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2, 3]).to.have.lengthOf(2, 'nooo why fail??');
   *     expect([1, 2, 3], 'nooo why fail??').to.have.lengthOf(2);
   *
   * `.lengthOf` can also be used as a language chain, causing all `.above`,
   * `.below`, `.least`, `.most`, and `.within` assertions that follow in the
   * chain to use the target's `length` property as the target. However, it's
   * often best to assert that the target's `length` property is equal to its
   * expected length, rather than asserting that its `length` property falls
   * within some range of values.
   *
   *     // Recommended
   *     expect([1, 2, 3]).to.have.lengthOf(3);
   *
   *     // Not recommended
   *     expect([1, 2, 3]).to.have.lengthOf.above(2);
   *     expect([1, 2, 3]).to.have.lengthOf.below(4);
   *     expect([1, 2, 3]).to.have.lengthOf.at.least(3);
   *     expect([1, 2, 3]).to.have.lengthOf.at.most(3);
   *     expect([1, 2, 3]).to.have.lengthOf.within(2,4);
   *
   * Due to a compatibility issue, the alias `.length` can't be chained directly
   * off of an uninvoked method such as `.a`. Therefore, `.length` can't be used
   * interchangeably with `.lengthOf` in every situation. It's recommended to
   * always use `.lengthOf` instead of `.length`.
   *
   *     expect([1, 2, 3]).to.have.a.length(3); // incompatible; throws error
   *     expect([1, 2, 3]).to.have.a.lengthOf(3);  // passes as expected
   *
   * @name lengthOf
   * @alias length
   * @param {Number} n
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertLengthChain () {
    flag(this, 'doLength', true);
  }

  function assertLength (n, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).to.have.property('length');
    var len = obj.length;

    this.assert(
        len == n
      , 'expected #{this} to have a length of #{exp} but got #{act}'
      , 'expected #{this} to not have a length of #{act}'
      , n
      , len
    );
  }

  Assertion.addChainableMethod('length', assertLength, assertLengthChain);
  Assertion.addChainableMethod('lengthOf', assertLength, assertLengthChain);

  /**
   * ### .match(re[, msg])
   *
   * Asserts that the target matches the given regular expression `re`.
   *
   *     expect('foobar').to.match(/^foo/);
   *
   * Add `.not` earlier in the chain to negate `.match`.
   *
   *     expect('foobar').to.not.match(/taco/);
   *
   * `.match` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect('foobar').to.match(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.match(/taco/);
   *
   * The alias `.matches` can be used interchangeably with `.match`.
   *
   * @name match
   * @alias matches
   * @param {RegExp} re
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */
  function assertMatch(re, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    this.assert(
        re.exec(obj)
      , 'expected #{this} to match ' + re
      , 'expected #{this} not to match ' + re
    );
  }

  Assertion.addMethod('match', assertMatch);
  Assertion.addMethod('matches', assertMatch);

  /**
   * ### .string(str[, msg])
   *
   * Asserts that the target string contains the given substring `str`.
   *
   *     expect('foobar').to.have.string('bar');
   *
   * Add `.not` earlier in the chain to negate `.string`.
   *
   *     expect('foobar').to.not.have.string('taco');
   *
   * `.string` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect('foobar').to.have.string(/taco/, 'nooo why fail??');
   *     expect('foobar', 'nooo why fail??').to.have.string(/taco/);
   *
   * @name string
   * @param {String} str
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('string', function (str, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(obj, flagMsg, ssfi, true).is.a('string');

    this.assert(
        ~obj.indexOf(str)
      , 'expected #{this} to contain ' + _.inspect(str)
      , 'expected #{this} to not contain ' + _.inspect(str)
    );
  });

  /**
   * ### .keys(key1[, key2[, ...]])
   *
   * Asserts that the target object, array, map, or set has the given keys. Only
   * the target's own inherited properties are included in the search. 
   *
   * When the target is an object or array, keys can be provided as one or more
   * string arguments, a single array argument, or a single object argument. In
   * the latter case, only the keys in the given object matter; the values are
   * ignored.
   *
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *     expect(['x', 'y']).to.have.all.keys(0, 1);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys(['a', 'b']);
   *     expect(['x', 'y']).to.have.all.keys([0, 1]);
   *
   *     expect({a: 1, b: 2}).to.have.all.keys({a: 4, b: 5}); // ignore 4 and 5
   *     expect(['x', 'y']).to.have.all.keys({0: 4, 1: 5}); // ignore 4 and 5
   *
   * When the target is a map or set, each key must be provided as a separate
   * argument.
   *
   *     expect(new Map([['a', 1], ['b', 2]])).to.have.all.keys('a', 'b');
   *     expect(new Set(['a', 'b'])).to.have.all.keys('a', 'b');
   *
   * Because `.keys` does different things based on the target's type, it's
   * important to check the target's type before using `.keys`. See the `.a` doc
   * for info on testing a target's type.
   *
   *     expect({a: 1, b: 2}).to.be.an('object').that.has.all.keys('a', 'b');
   *
   * By default, strict (`===`) equality is used to compare keys of maps and
   * sets. Add `.deep` earlier in the chain to use deep equality instead. See
   * the `deep-eql` project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target set deeply (but not strictly) has key `{a: 1}`
   *     expect(new Set([{a: 1}])).to.have.all.deep.keys([{a: 1}]);
   *     expect(new Set([{a: 1}])).to.not.have.all.keys([{a: 1}]);
   *
   * By default, the target must have all of the given keys and no more. Add
   * `.any` earlier in the chain to only require that the target have at least
   * one of the given keys. Also, add `.not` earlier in the chain to negate
   * `.keys`. It's often best to add `.any` when negating `.keys`, and to use
   * `.all` when asserting `.keys` without negation.
   *
   * When negating `.keys`, `.any` is preferred because `.not.any.keys` asserts
   * exactly what's expected of the output, whereas `.not.all.keys` creates
   * uncertain expectations.
   *
   *     // Recommended; asserts that target doesn't have any of the given keys
   *     expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');
   *
   *     // Not recommended; asserts that target doesn't have all of the given
   *     // keys but may or may not have some of them
   *     expect({a: 1, b: 2}).to.not.have.all.keys('c', 'd');
   *
   * When asserting `.keys` without negation, `.all` is preferred because
   * `.all.keys` asserts exactly what's expected of the output, whereas
   * `.any.keys` creates uncertain expectations.
   *
   *     // Recommended; asserts that target has all the given keys
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b');
   *
   *     // Not recommended; asserts that target has at least one of the given
   *     // keys but may or may not have more of them
   *     expect({a: 1, b: 2}).to.have.any.keys('a', 'b');
   *
   * Note that `.all` is used by default when neither `.all` nor `.any` appear
   * earlier in the chain. However, it's often best to add `.all` anyway because
   * it improves readability.
   *
   *     // Both assertions are identical
   *     expect({a: 1, b: 2}).to.have.all.keys('a', 'b'); // Recommended
   *     expect({a: 1, b: 2}).to.have.keys('a', 'b'); // Not recommended
   *
   * Add `.include` earlier in the chain to require that the target's keys be a
   * superset of the expected keys, rather than identical sets.
   *
   *     // Target object's keys are a superset of ['a', 'b'] but not identical
   *     expect({a: 1, b: 2, c: 3}).to.include.all.keys('a', 'b');
   *     expect({a: 1, b: 2, c: 3}).to.not.have.all.keys('a', 'b');
   *
   * However, if `.any` and `.include` are combined, only the `.any` takes
   * effect. The `.include` is ignored in this case.
   *
   *     // Both assertions are identical
   *     expect({a: 1}).to.have.any.keys('a', 'b');
   *     expect({a: 1}).to.include.any.keys('a', 'b');
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.have.key('b');
   *
   * The alias `.key` can be used interchangeably with `.keys`.
   *
   * @name keys
   * @alias key
   * @param {...String|Array|Object} keys
   * @namespace BDD
   * @api public
   */

  function assertKeys (keys) {
    var obj = flag(this, 'object')
      , objType = _.type(obj)
      , keysType = _.type(keys)
      , ssfi = flag(this, 'ssfi')
      , isDeep = flag(this, 'deep')
      , str
      , deepStr = ''
      , ok = true
      , flagMsg = flag(this, 'message');

    flagMsg = flagMsg ? flagMsg + ': ' : '';
    var mixedArgsMsg = flagMsg + 'when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments';

    if (objType === 'Map' || objType === 'Set') {
      deepStr = isDeep ? 'deeply ' : '';
      actual = [];

      // Map and Set '.keys' aren't supported in IE 11. Therefore, use .forEach.
      obj.forEach(function (val, key) { actual.push(key); });

      if (keysType !== 'Array') {
        keys = Array.prototype.slice.call(arguments);
      }

    } else {
      actual = _.getOwnEnumerableProperties(obj);

      switch (keysType) {
        case 'Array':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          break;
        case 'Object':
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, undefined, ssfi);
          }
          keys = Object.keys(keys);
          break;
        default:
          keys = Array.prototype.slice.call(arguments);
      }

      // Only stringify non-Symbols because Symbols would become "Symbol()"
      keys = keys.map(function (val) {
        return typeof val === 'symbol' ? val : String(val);
      });
    }

    if (!keys.length) {
      throw new AssertionError(flagMsg + 'keys required', undefined, ssfi);
    }

    var len = keys.length
      , any = flag(this, 'any')
      , all = flag(this, 'all')
      , expected = keys
      , actual;

    if (!any && !all) {
      all = true;
    }

    // Has any
    if (any) {
      ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });
    }

    // Has all
    if (all) {
      ok = expected.every(function(expectedKey) {
        return actual.some(function(actualKey) {
          if (isDeep) {
            return _.eql(expectedKey, actualKey);
          } else {
            return expectedKey === actualKey;
          }
        });
      });

      if (!flag(this, 'contains')) {
        ok = ok && keys.length == actual.length;
      }
    }

    // Key string
    if (len > 1) {
      keys = keys.map(function(key) {
        return _.inspect(key);
      });
      var last = keys.pop();
      if (all) {
        str = keys.join(', ') + ', and ' + last;
      }
      if (any) {
        str = keys.join(', ') + ', or ' + last;
      }
    } else {
      str = _.inspect(keys[0]);
    }

    // Form
    str = (len > 1 ? 'keys ' : 'key ') + str;

    // Have / include
    str = (flag(this, 'contains') ? 'contain ' : 'have ') + str;

    // Assertion
    this.assert(
        ok
      , 'expected #{this} to ' + deepStr + str
      , 'expected #{this} to not ' + deepStr + str
      , expected.slice(0).sort(_.compareByInspect)
      , actual.sort(_.compareByInspect)
      , true
    );
  }

  Assertion.addMethod('keys', assertKeys);
  Assertion.addMethod('key', assertKeys);

  /**
   * ### .throw([errorLike], [errMsgMatcher], [msg])
   *
   * When no arguments are provided, `.throw` invokes the target function and
   * asserts that an error is thrown.
   * 
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw();
   *
   * When one argument is provided, and it's an error constructor, `.throw`
   * invokes the target function and asserts that an error is thrown that's an
   * instance of that error constructor.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError);
   *
   * When one argument is provided, and it's an error instance, `.throw` invokes
   * the target function and asserts that an error is thrown that's strictly
   * (`===`) equal to that error instance.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(err);
   *
   * When one argument is provided, and it's a string, `.throw` invokes the
   * target function and asserts that an error is thrown with a message that
   * contains that string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw('salmon');
   *
   * When one argument is provided, and it's a regular expression, `.throw`
   * invokes the target function and asserts that an error is thrown with a
   * message that matches that regular expression.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(/salmon/);
   *
   * When two arguments are provided, and the first is an error instance or
   * constructor, and the second is a string or regular expression, `.throw`
   * invokes the function and asserts that an error is thrown that fulfills both
   * conditions as described above.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon');
   *     expect(badFn).to.throw(TypeError, /salmon/);
   *     expect(badFn).to.throw(err, 'salmon');
   *     expect(badFn).to.throw(err, /salmon/);
   *
   * Add `.not` earlier in the chain to negate `.throw`.
   *     
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw();
   * 
   * However, it's dangerous to negate `.throw` when providing any arguments.
   * The problem is that it creates uncertain expectations by asserting that the
   * target either doesn't throw an error, or that it throws an error but of a
   * different type than the given type, or that it throws an error of the given
   * type but with a message that doesn't include the given string. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to throw an error, it's often best to assert
   * exactly that.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.not.throw(); // Recommended
   *     expect(goodFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * When the target is expected to throw an error, it's often best to assert
   * that the error is of its expected type, and has a message that includes an
   * expected string, rather than asserting that it doesn't have one of many
   * unexpected types, and doesn't have a message that includes some string.
   *
   *     var badFn = function () { throw new TypeError('Illegal salmon!'); };
   *
   *     expect(badFn).to.throw(TypeError, 'salmon'); // Recommended
   *     expect(badFn).to.not.throw(ReferenceError, 'x'); // Not recommended
   *
   * `.throw` changes the target of any assertions that follow in the chain to
   * be the error object that's thrown.
   *
   *     var err = new TypeError('Illegal salmon!');
   *     err.code = 42;
   *     var badFn = function () { throw err; };
   *
   *     expect(badFn).to.throw(TypeError).with.property('code', 42);
   *
   * `.throw` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`. When not providing two arguments, always use
   * the second form.
   *
   *     var goodFn = function () {};
   *
   *     expect(goodFn).to.throw(TypeError, 'x', 'nooo why fail??');
   *     expect(goodFn, 'nooo why fail??').to.throw();
   *
   * Due to limitations in ES5, `.throw` may not always work as expected when
   * using a transpiler such as Babel or TypeScript. In particular, it may
   * produce unexpected results when subclassing the built-in `Error` object and
   * then passing the subclassed constructor to `.throw`. See your transpiler's
   * docs for details:
   *
   * - ([Babel](https://babeljs.io/docs/usage/caveats/#classes))
   * - ([TypeScript](https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work))
   *
   * Beware of some common mistakes when using the `throw` assertion. One common
   * mistake is to accidentally invoke the function yourself instead of letting
   * the `throw` assertion invoke the function for you. For example, when
   * testing if a function named `fn` throws, provide `fn` instead of `fn()` as
   * the target for the assertion.
   *
   *     expect(fn).to.throw();     // Good! Tests `fn` as desired
   *     expect(fn()).to.throw();   // Bad! Tests result of `fn()`, not `fn`
   *
   * If you need to assert that your function `fn` throws when passed certain
   * arguments, then wrap a call to `fn` inside of another function.
   *
   *     expect(function () { fn(42); }).to.throw();  // Function expression
   *     expect(() => fn(42)).to.throw();             // ES6 arrow function
   *
   * Another common mistake is to provide an object method (or any stand-alone
   * function that relies on `this`) as the target of the assertion. Doing so is
   * problematic because the `this` context will be lost when the function is
   * invoked by `.throw`; there's no way for it to know what `this` is supposed
   * to be. There are two ways around this problem. One solution is to wrap the
   * method or function call inside of another function. Another solution is to
   * use `bind`.
   *
   *     expect(function () { cat.meow(); }).to.throw();  // Function expression
   *     expect(() => cat.meow()).to.throw();             // ES6 arrow function
   *     expect(cat.meow.bind(cat)).to.throw();           // Bind
   *
   * Finally, it's worth mentioning that it's a best practice in JavaScript to
   * only throw `Error` and derivatives of `Error` such as `ReferenceError`,
   * `TypeError`, and user-defined objects that extend `Error`. No other type of
   * value will generate a stack trace when initialized. With that said, the
   * `throw` assertion does technically support any type of value being thrown,
   * not just `Error` and its derivatives.
   *
   * The aliases `.throws` and `.Throw` can be used interchangeably with
   * `.throw`.
   *
   * @name throw
   * @alias throws
   * @alias Throw
   * @param {Error|ErrorConstructor} errorLike
   * @param {String|RegExp} errMsgMatcher error message
   * @param {String} msg _optional_
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @returns error for chaining (null if no error)
   * @namespace BDD
   * @api public
   */

  function assertThrows (errorLike, errMsgMatcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , ssfi = flag(this, 'ssfi')
      , flagMsg = flag(this, 'message')
      , negate = flag(this, 'negate') || false;
    new Assertion(obj, flagMsg, ssfi, true).is.a('function');

    if (errorLike instanceof RegExp || typeof errorLike === 'string') {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var caughtErr;
    try {
      obj();
    } catch (err) {
      caughtErr = err;
    }

    // If we have the negate flag enabled and at least one valid argument it means we do expect an error
    // but we want it to match a given set of criteria
    var everyArgIsUndefined = errorLike === undefined && errMsgMatcher === undefined;

    // If we've got the negate flag enabled and both args, we should only fail if both aren't compatible
    // See Issue #551 and PR #683@GitHub
    var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    var errorLikeFail = false;
    var errMsgMatcherFail = false;

    // Checking if error was thrown
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
      // We need this to display results correctly according to their types
      var errorLikeString = 'an error';
      if (errorLike instanceof Error) {
        errorLikeString = '#{exp}';
      } else if (errorLike) {
        errorLikeString = _.checkError.getConstructorName(errorLike);
      }

      this.assert(
          caughtErr
        , 'expected #{this} to throw ' + errorLikeString
        , 'expected #{this} to not throw an error but #{act} was thrown'
        , errorLike && errorLike.toString()
        , (caughtErr instanceof Error ?
            caughtErr.toString() : (typeof caughtErr === 'string' ? caughtErr : caughtErr &&
                                    _.checkError.getConstructorName(caughtErr)))
      );
    }

    if (errorLike && caughtErr) {
      // We should compare instances only if `errorLike` is an instance of `Error`
      if (errorLike instanceof Error) {
        var isCompatibleInstance = _.checkError.compatibleInstance(caughtErr, errorLike);

        if (isCompatibleInstance === negate) {
          // These checks were created to ensure we won't fail too soon when we've got both args and a negate
          // See Issue #551 and PR #683@GitHub
          if (everyArgIsDefined && negate) {
            errorLikeFail = true;
          } else {
            this.assert(
                negate
              , 'expected #{this} to throw #{exp} but #{act} was thrown'
              , 'expected #{this} to not throw #{exp}' + (caughtErr && !negate ? ' but #{act} was thrown' : '')
              , errorLike.toString()
              , caughtErr.toString()
            );
          }
        }
      }

      var isCompatibleConstructor = _.checkError.compatibleConstructor(caughtErr, errorLike);
      if (isCompatibleConstructor === negate) {
        if (everyArgIsDefined && negate) {
            errorLikeFail = true;
        } else {
          this.assert(
              negate
            , 'expected #{this} to throw #{exp} but #{act} was thrown'
            , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
            , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
            , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
          );
        }
      }
    }

    if (caughtErr && errMsgMatcher !== undefined && errMsgMatcher !== null) {
      // Here we check compatible messages
      var placeholder = 'including';
      if (errMsgMatcher instanceof RegExp) {
        placeholder = 'matching';
      }

      var isCompatibleMessage = _.checkError.compatibleMessage(caughtErr, errMsgMatcher);
      if (isCompatibleMessage === negate) {
        if (everyArgIsDefined && negate) {
            errMsgMatcherFail = true;
        } else {
          this.assert(
            negate
            , 'expected #{this} to throw error ' + placeholder + ' #{exp} but got #{act}'
            , 'expected #{this} to throw error not ' + placeholder + ' #{exp}'
            ,  errMsgMatcher
            ,  _.checkError.getMessage(caughtErr)
          );
        }
      }
    }

    // If both assertions failed and both should've matched we throw an error
    if (errorLikeFail && errMsgMatcherFail) {
      this.assert(
        negate
        , 'expected #{this} to throw #{exp} but #{act} was thrown'
        , 'expected #{this} to not throw #{exp}' + (caughtErr ? ' but #{act} was thrown' : '')
        , (errorLike instanceof Error ? errorLike.toString() : errorLike && _.checkError.getConstructorName(errorLike))
        , (caughtErr instanceof Error ? caughtErr.toString() : caughtErr && _.checkError.getConstructorName(caughtErr))
      );
    }

    flag(this, 'object', caughtErr);
  }

  Assertion.addMethod('throw', assertThrows);
  Assertion.addMethod('throws', assertThrows);
  Assertion.addMethod('Throw', assertThrows);

  /**
   * ### .respondTo(method[, msg])
   *
   * When the target is a non-function object, `.respondTo` asserts that the
   * target has a method with the given name `method`. The method can be own or
   * inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.respondTo('meow');
   *
   * When the target is a function, `.respondTo` asserts that the target's
   * `prototype` property has a method with the given name `method`. Again, the
   * method can be own or inherited, and it can be enumerable or non-enumerable.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(Cat).to.respondTo('meow');
   *
   * Add `.itself` earlier in the chain to force `.respondTo` to treat the
   * target as a non-function object, even if it's a function. Thus, it asserts
   * that the target has a method with the given name `method`, rather than
   * asserting that the target's `prototype` property has a method with the
   * given name `method`.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * When not adding `.itself`, it's important to check the target's type before
   * using `.respondTo`. See the `.a` doc for info on checking a target's type.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *
   *     expect(new Cat()).to.be.an('object').that.respondsTo('meow');
   *
   * Add `.not` earlier in the chain to negate `.respondTo`.
   *
   *     function Dog () {}
   *     Dog.prototype.bark = function () {};
   *
   *     expect(new Dog()).to.not.respondTo('meow');
   *
   * `.respondTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect({}).to.respondTo('meow', 'nooo why fail??');
   *     expect({}, 'nooo why fail??').to.respondTo('meow');
   *
   * The alias `.respondsTo` can be used interchangeably with `.respondTo`.
   *
   * @name respondTo
   * @alias respondsTo
   * @param {String} method
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function respondTo (method, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , itself = flag(this, 'itself')
      , context = ('function' === typeof obj && !itself)
        ? obj.prototype[method]
        : obj[method];

    this.assert(
        'function' === typeof context
      , 'expected #{this} to respond to ' + _.inspect(method)
      , 'expected #{this} to not respond to ' + _.inspect(method)
    );
  }

  Assertion.addMethod('respondTo', respondTo);
  Assertion.addMethod('respondsTo', respondTo);

  /**
   * ### .itself
   *
   * Forces all `.respondTo` assertions that follow in the chain to behave as if
   * the target is a non-function object, even if it's a function. Thus, it
   * causes `.respondTo` to assert that the target has a method with the given
   * name, rather than asserting that the target's `prototype` property has a
   * method with the given name.
   *
   *     function Cat () {}
   *     Cat.prototype.meow = function () {};
   *     Cat.hiss = function () {};
   *
   *     expect(Cat).itself.to.respondTo('hiss').but.not.respondTo('meow');
   *
   * @name itself
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('itself', function () {
    flag(this, 'itself', true);
  });

  /**
   * ### .satisfy(matcher[, msg])
   *
   * Invokes the given `matcher` function with the target being passed as the
   * first argument, and asserts that the value returned is truthy.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 0; 
   *     });
   *
   * Add `.not` earlier in the chain to negate `.satisfy`.
   *
   *     expect(1).to.not.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * `.satisfy` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1).to.satisfy(function(num) {
   *       return num > 2;
   *     }, 'nooo why fail??');
   *
   *     expect(1, 'nooo why fail??').to.satisfy(function(num) {
   *       return num > 2;
   *     });
   *
   * The alias `.satisfies` can be used interchangeably with `.satisfy`.
   *
   * @name satisfy
   * @alias satisfies
   * @param {Function} matcher
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function satisfy (matcher, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object');
    var result = matcher(obj);
    this.assert(
        result
      , 'expected #{this} to satisfy ' + _.objDisplay(matcher)
      , 'expected #{this} to not satisfy' + _.objDisplay(matcher)
      , flag(this, 'negate') ? false : true
      , result
    );
  }

  Assertion.addMethod('satisfy', satisfy);
  Assertion.addMethod('satisfies', satisfy);

  /**
   * ### .closeTo(expected, delta[, msg])
   *
   * Asserts that the target is a number that's within a given +/- `delta` range
   * of the given number `expected`. However, it's often best to assert that the
   * target is equal to its expected value.
   *
   *     // Recommended
   *     expect(1.5).to.equal(1.5);
   *
   *     // Not recommended
   *     expect(1.5).to.be.closeTo(1, 0.5);
   *     expect(1.5).to.be.closeTo(2, 0.5);
   *     expect(1.5).to.be.closeTo(1, 1);
   *
   * Add `.not` earlier in the chain to negate `.closeTo`.
   *
   *     expect(1.5).to.equal(1.5); // Recommended
   *     expect(1.5).to.not.be.closeTo(3, 1); // Not recommended
   *
   * `.closeTo` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect(1.5).to.be.closeTo(3, 1, 'nooo why fail??');
   *     expect(1.5, 'nooo why fail??').to.be.closeTo(3, 1);
   *
   * The alias `.approximately` can be used interchangeably with `.closeTo`.
   *
   * @name closeTo
   * @alias approximately
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function closeTo(expected, delta, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).is.a('number');
    if (typeof expected !== 'number' || typeof delta !== 'number') {
      flagMsg = flagMsg ? flagMsg + ': ' : '';
      throw new AssertionError(
          flagMsg + 'the arguments to closeTo or approximately must be numbers',
          undefined,
          ssfi
      );
    }

    this.assert(
        Math.abs(obj - expected) <= delta
      , 'expected #{this} to be close to ' + expected + ' +/- ' + delta
      , 'expected #{this} not to be close to ' + expected + ' +/- ' + delta
    );
  }

  Assertion.addMethod('closeTo', closeTo);
  Assertion.addMethod('approximately', closeTo);

  // Note: Duplicates are ignored if testing for inclusion instead of sameness.
  function isSubsetOf(subset, superset, cmp, contains, ordered) {
    if (!contains) {
      if (subset.length !== superset.length) return false;
      superset = superset.slice();
    }

    return subset.every(function(elem, idx) {
      if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];

      if (!cmp) {
        var matchIdx = superset.indexOf(elem);
        if (matchIdx === -1) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      }

      return superset.some(function(elem2, matchIdx) {
        if (!cmp(elem, elem2)) return false;

        // Remove match from superset so not counted twice if duplicate in subset.
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      });
    });
  }

  /**
   * ### .members(set[, msg])
   *
   * Asserts that the target array has the same members as the given array
   * `set`.
   *
   *     expect([1, 2, 3]).to.have.members([2, 1, 3]);
   *     expect([1, 2, 2]).to.have.members([2, 1, 2]);
   *
   * By default, members are compared using strict (`===`) equality. Add `.deep`
   * earlier in the chain to use deep equality instead. See the `deep-eql`
   * project page for info on the deep equality algorithm:
   * https://github.com/chaijs/deep-eql.
   *
   *     // Target array deeply (but not strictly) has member `{a: 1}`
   *     expect([{a: 1}]).to.have.deep.members([{a: 1}]);
   *     expect([{a: 1}]).to.not.have.members([{a: 1}]);
   *
   * By default, order doesn't matter. Add `.ordered` earlier in the chain to
   * require that members appear in the same order.
   *
   *     expect([1, 2, 3]).to.have.ordered.members([1, 2, 3]);
   *     expect([1, 2, 3]).to.have.members([2, 1, 3])
   *       .but.not.ordered.members([2, 1, 3]);
   *
   * By default, both arrays must be the same size. Add `.include` earlier in
   * the chain to require that the target's members be a superset of the
   * expected members. Note that duplicates are ignored in the subset when
   * `.include` is added.
   *
   *     // Target array is a superset of [1, 2] but not identical
   *     expect([1, 2, 3]).to.include.members([1, 2]);
   *     expect([1, 2, 3]).to.not.have.members([1, 2]);
   *
   *     // Duplicates in the subset are ignored
   *     expect([1, 2, 3]).to.include.members([1, 2, 2, 2]);
   *
   * `.deep`, `.ordered`, and `.include` can all be combined. However, if
   * `.include` and `.ordered` are combined, the ordering begins at the start of
   * both arrays.
   *
   *     expect([{a: 1}, {b: 2}, {c: 3}])
   *       .to.include.deep.ordered.members([{a: 1}, {b: 2}])
   *       .but.not.include.deep.ordered.members([{b: 2}, {c: 3}]);
   *
   * Add `.not` earlier in the chain to negate `.members`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the target array doesn't have all of the same members as
   * the given array `set` but may or may not have some of them. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     expect([1, 2]).to.not.include(3).and.not.include(4); // Recommended
   *     expect([1, 2]).to.not.have.members([3, 4]); // Not recommended
   *
   * `.members` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`.
   *
   *     expect([1, 2]).to.have.members([1, 2, 3], 'nooo why fail??');
   *     expect([1, 2], 'nooo why fail??').to.have.members([1, 2, 3]);
   *
   * @name members
   * @param {Array} set
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  Assertion.addMethod('members', function (subset, msg) {
    if (msg) flag(this, 'message', msg);
    var obj = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');

    new Assertion(obj, flagMsg, ssfi, true).to.be.an('array');
    new Assertion(subset, flagMsg, ssfi, true).to.be.an('array');

    var contains = flag(this, 'contains');
    var ordered = flag(this, 'ordered');

    var subject, failMsg, failNegateMsg;

    if (contains) {
      subject = ordered ? 'an ordered superset' : 'a superset';
      failMsg = 'expected #{this} to be ' + subject + ' of #{exp}';
      failNegateMsg = 'expected #{this} to not be ' + subject + ' of #{exp}';
    } else {
      subject = ordered ? 'ordered members' : 'members';
      failMsg = 'expected #{this} to have the same ' + subject + ' as #{exp}';
      failNegateMsg = 'expected #{this} to not have the same ' + subject + ' as #{exp}';
    }

    var cmp = flag(this, 'deep') ? _.eql : undefined;

    this.assert(
        isSubsetOf(subset, obj, cmp, contains, ordered)
      , failMsg
      , failNegateMsg
      , subset
      , obj
      , true
    );
  });

  /**
   * ### .oneOf(list[, msg])
   *
   * Asserts that the target is a member of the given array `list`. However,
   * it's often best to assert that the target is equal to its expected value.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.be.oneOf([1, 2, 3]); // Not recommended
   *
   * Comparisons are performed using strict (`===`) equality.
   *
   * Add `.not` earlier in the chain to negate `.oneOf`.
   *
   *     expect(1).to.equal(1); // Recommended
   *     expect(1).to.not.be.oneOf([2, 3, 4]); // Not recommended
   *
   * `.oneOf` accepts an optional `msg` argument which is a custom error message
   * to show when the assertion fails. The message can also be given as the
   * second argument to `expect`.
   *
   *     expect(1).to.be.oneOf([2, 3, 4], 'nooo why fail??');
   *     expect(1, 'nooo why fail??').to.be.oneOf([2, 3, 4]);
   *
   * @name oneOf
   * @param {Array<*>} list
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function oneOf (list, msg) {
    if (msg) flag(this, 'message', msg);
    var expected = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(list, flagMsg, ssfi, true).to.be.an('array');

    this.assert(
        list.indexOf(expected) > -1
      , 'expected #{this} to be one of #{exp}'
      , 'expected #{this} to not be one of #{exp}'
      , list
      , expected
    );
  }

  Assertion.addMethod('oneOf', oneOf);


  /**
   * ### .change(subject[, prop[, msg]])
   *
   * When one argument is provided, `.change` asserts that the given function
   * `subject` returns a different value when it's invoked before the target
   * function compared to when it's invoked afterward. However, it's often best
   * to assert that `subject` is equal to its expected value.
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     // Recommended
   *     expect(getDots()).to.equal('');
   *     addDot();
   *     expect(getDots()).to.equal('.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(getDots);
   *
   * When two arguments are provided, `.change` asserts that the value of the
   * given object `subject`'s `prop` property is different before invoking the
   * target function compared to afterward.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     // Recommended
   *     expect(myObj).to.have.property('dots', '');
   *     addDot();
   *     expect(myObj).to.have.property('dots', '.');
   *
   *     // Not recommended
   *     expect(addDot).to.change(myObj, 'dots');
   *
   * Strict (`===`) equality is used to compare before and after values.
   *
   * Add `.not` earlier in the chain to negate `.change`.
   *
   *     var dots = ''
   *       , noop = function () {}
   *       , getDots = function () { return dots; };
   *
   *     expect(noop).to.not.change(getDots);
   *
   *     var myObj = {dots: ''}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'dots');
   *
   * `.change` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {dots: ''}
   *       , addDot = function () { myObj.dots += '.'; };
   *
   *     expect(addDot).to.not.change(myObj, 'dots', 'nooo why fail??');
   *
   *     var dots = ''
   *       , addDot = function () { dots += '.'; }
   *       , getDots = function () { return dots; };
   *
   *     expect(addDot, 'nooo why fail??').to.not.change(getDots);
   *
   * `.change` also causes all `.by` assertions that follow in the chain to
   * assert how much a numeric subject was increased or decreased by. However,
   * it's dangerous to use `.change.by`. The problem is that it creates
   * uncertain expectations by asserting that the subject either increases by
   * the given delta, or that it decreases by the given delta. It's often best
   * to identify the exact output that's expected, and then write an assertion
   * that only accepts that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * The alias `.changes` can be used interchangeably with `.change`.
   *
   * @name change
   * @alias changes
   * @param {String} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertChanges (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    // This gets flagged because of the .by(delta) assertion
    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'change');
    flag(this, 'realDelta', final !== initial);

    this.assert(
      initial !== final
      , 'expected ' + msgObj + ' to change'
      , 'expected ' + msgObj + ' to not change'
    );
  }

  Assertion.addMethod('change', assertChanges);
  Assertion.addMethod('changes', assertChanges);

  /**
   * ### .increase(subject[, prop[, msg]])
   *
   * When one argument is provided, `.increase` asserts that the given function
   * `subject` returns a greater number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.increase` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * greater of a number is returned. It's often best to assert that the return
   * value increased by the expected amount, rather than asserting it increased
   * by any amount.
   *
   *     var val = 1
   *       , addTwo = function () { val += 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(addTwo).to.increase(getVal).by(2); // Recommended
   *     expect(addTwo).to.increase(getVal); // Not recommended
   *
   * When two arguments are provided, `.increase` asserts that the value of the
   * given object `subject`'s `prop` property is greater after invoking the
   * target function compared to beforehand.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.increase(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.increase`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either decreases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to decrease, it's often best to assert that it
   * decreased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.not.increase(myObj, 'val'); // Not recommended
   * 
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.increase(myObj, 'val'); // Not recommended
   *
   * `.increase` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.increase(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.increase(getVal);
   *
   * The alias `.increases` can be used interchangeably with `.increase`.
   *
   * @name increase
   * @alias increases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertIncreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'increase');
    flag(this, 'realDelta', final - initial);

    this.assert(
      final - initial > 0
      , 'expected ' + msgObj + ' to increase'
      , 'expected ' + msgObj + ' to not increase'
    );
  }

  Assertion.addMethod('increase', assertIncreases);
  Assertion.addMethod('increases', assertIncreases);

  /**
   * ### .decrease(subject[, prop[, msg]])
   *
   * When one argument is provided, `.decrease` asserts that the given function
   * `subject` returns a lesser number when it's invoked after invoking the
   * target function compared to when it's invoked beforehand. `.decrease` also
   * causes all `.by` assertions that follow in the chain to assert how much
   * lesser of a number is returned. It's often best to assert that the return
   * value decreased by the expected amount, rather than asserting it decreased
   * by any amount.
   *
   *     var val = 1
   *       , subtractTwo = function () { val -= 2; }
   *       , getVal = function () { return val; };
   *
   *     expect(subtractTwo).to.decrease(getVal).by(2); // Recommended
   *     expect(subtractTwo).to.decrease(getVal); // Not recommended
   *
   * When two arguments are provided, `.decrease` asserts that the value of the
   * given object `subject`'s `prop` property is lesser after invoking the
   * target function compared to beforehand. 
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.decrease(myObj, 'val'); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.decrease`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either increases, or that it stays the same.
   * It's often best to identify the exact output that's expected, and then
   * write an assertion that only accepts that exact output.
   *
   * When the subject is expected to increase, it's often best to assert that it
   * increased by the expected amount.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.not.decrease(myObj, 'val'); // Not recommended
   * 
   * When the subject is expected to stay the same, it's often best to assert
   * exactly that.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.not.change(myObj, 'val'); // Recommended
   *     expect(noop).to.not.decrease(myObj, 'val'); // Not recommended
   *
   * `.decrease` accepts an optional `msg` argument which is a custom error
   * message to show when the assertion fails. The message can also be given as
   * the second argument to `expect`. When not providing two arguments, always
   * use the second form.
   *
   *     var myObj = {val: 1}
   *       , noop = function () {};
   *
   *     expect(noop).to.decrease(myObj, 'val', 'nooo why fail??');
   *
   *     var val = 1
   *       , noop = function () {}
   *       , getVal = function () { return val; };
   *
   *     expect(noop, 'nooo why fail??').to.decrease(getVal);
   *
   * The alias `.decreases` can be used interchangeably with `.decrease`.
   *
   * @name decrease
   * @alias decreases
   * @param {String|Function} subject
   * @param {String} prop name _optional_
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDecreases (subject, prop, msg) {
    if (msg) flag(this, 'message', msg);
    var fn = flag(this, 'object')
      , flagMsg = flag(this, 'message')
      , ssfi = flag(this, 'ssfi');
    new Assertion(fn, flagMsg, ssfi, true).is.a('function');

    var initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a('function');
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }

    // Make sure that the target is a number
    new Assertion(initial, flagMsg, ssfi, true).is.a('number');

    fn();

    var final = prop === undefined || prop === null ? subject() : subject[prop];
    var msgObj = prop === undefined || prop === null ? initial : '.' + prop;

    flag(this, 'deltaMsgObj', msgObj);
    flag(this, 'initialDeltaValue', initial);
    flag(this, 'finalDeltaValue', final);
    flag(this, 'deltaBehavior', 'decrease');
    flag(this, 'realDelta', initial - final);

    this.assert(
      final - initial < 0
      , 'expected ' + msgObj + ' to decrease'
      , 'expected ' + msgObj + ' to not decrease'
    );
  }

  Assertion.addMethod('decrease', assertDecreases);
  Assertion.addMethod('decreases', assertDecreases);

  /**
   * ### .by(delta[, msg])
   *
   * When following an `.increase` assertion in the chain, `.by` asserts that
   * the subject of the `.increase` assertion increased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   * When following a `.decrease` assertion in the chain, `.by` asserts that the
   * subject of the `.decrease` assertion decreased by the given `delta`.
   *
   *     var myObj = {val: 1}
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2);
   *
   * When following a `.change` assertion in the chain, `.by` asserts that the
   * subject of the `.change` assertion either increased or decreased by the
   * given `delta`. However, it's dangerous to use `.change.by`. The problem is
   * that it creates uncertain expectations. It's often best to identify the
   * exact output that's expected, and then write an assertion that only accepts
   * that exact output.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; }
   *       , subtractTwo = function () { myObj.val -= 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(2); // Recommended
   *     expect(addTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   *     expect(subtractTwo).to.decrease(myObj, 'val').by(2); // Recommended
   *     expect(subtractTwo).to.change(myObj, 'val').by(2); // Not recommended
   *
   * Add `.not` earlier in the chain to negate `.by`. However, it's often best
   * to assert that the subject changed by its expected delta, rather than
   * asserting that it didn't change by one of countless unexpected deltas.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     // Recommended
   *     expect(addTwo).to.increase(myObj, 'val').by(2);
   *
   *     // Not recommended
   *     expect(addTwo).to.increase(myObj, 'val').but.not.by(3);
   *
   * `.by` accepts an optional `msg` argument which is a custom error message to
   * show when the assertion fails. The message can also be given as the second
   * argument to `expect`.
   *
   *     var myObj = {val: 1}
   *       , addTwo = function () { myObj.val += 2; };
   *
   *     expect(addTwo).to.increase(myObj, 'val').by(3, 'nooo why fail??');
   *     expect(addTwo, 'nooo why fail??').to.increase(myObj, 'val').by(3);
   *
   * @name by
   * @param {Number} delta
   * @param {String} msg _optional_
   * @namespace BDD
   * @api public
   */

  function assertDelta(delta, msg) {
    if (msg) flag(this, 'message', msg);

    var msgObj = flag(this, 'deltaMsgObj');
    var initial = flag(this, 'initialDeltaValue');
    var final = flag(this, 'finalDeltaValue');
    var behavior = flag(this, 'deltaBehavior');
    var realDelta = flag(this, 'realDelta');

    var expression;
    if (behavior === 'change') {
      expression = Math.abs(final - initial) === Math.abs(delta);
    } else {
      expression = realDelta === Math.abs(delta);
    }

    this.assert(
      expression
      , 'expected ' + msgObj + ' to ' + behavior + ' by ' + delta
      , 'expected ' + msgObj + ' to not ' + behavior + ' by ' + delta
    );
  }

  Assertion.addMethod('by', assertDelta);

  /**
   * ### .extensible
   *
   * Asserts that the target is extensible, which means that new properties can
   * be added to it. Primitives are never extensible.
   *
   *     expect({a: 1}).to.be.extensible;
   *
   * Add `.not` earlier in the chain to negate `.extensible`.
   *
   *     var nonExtensibleObject = Object.preventExtensions({})
   *       , sealedObject = Object.seal({})
   *       , frozenObject = Object.freeze({});
   *
   *     expect(nonExtensibleObject).to.not.be.extensible;
   *     expect(sealedObject).to.not.be.extensible;
   *     expect(frozenObject).to.not.be.extensible;
   *     expect(1).to.not.be.extensible;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect(1, 'nooo why fail??').to.be.extensible;
   *
   * @name extensible
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('extensible', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a non-extensible ordinary object, simply return false.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
    // The following provides ES6 behavior for ES5 environments.

    var isExtensible = obj === Object(obj) && Object.isExtensible(obj);

    this.assert(
      isExtensible
      , 'expected #{this} to be extensible'
      , 'expected #{this} to not be extensible'
    );
  });

  /**
   * ### .sealed
   *
   * Asserts that the target is sealed, which means that new properties can't be
   * added to it, and its existing properties can't be reconfigured or deleted.
   * However, it's possible that its existing properties can still be reassigned
   * to different values. Primitives are always sealed.
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     expect(sealedObject).to.be.sealed;
   *     expect(frozenObject).to.be.sealed;
   *     expect(1).to.be.sealed;
   *
   * Add `.not` earlier in the chain to negate `.sealed`.
   *
   *     expect({a: 1}).to.not.be.sealed;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.sealed;
   *
   * @name sealed
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('sealed', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a sealed ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed
    // The following provides ES6 behavior for ES5 environments.

    var isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;

    this.assert(
      isSealed
      , 'expected #{this} to be sealed'
      , 'expected #{this} to not be sealed'
    );
  });

  /**
   * ### .frozen
   *
   * Asserts that the target is frozen, which means that new properties can't be
   * added to it, and its existing properties can't be reassigned to different
   * values, reconfigured, or deleted. Primitives are always frozen.
   *
   *     var frozenObject = Object.freeze({});
   *
   *     expect(frozenObject).to.be.frozen;
   *     expect(1).to.be.frozen;
   *
   * Add `.not` earlier in the chain to negate `.frozen`.
   *
   *     expect({a: 1}).to.not.be.frozen;
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect({a: 1}, 'nooo why fail??').to.be.frozen;
   *
   * @name frozen
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('frozen', function() {
    var obj = flag(this, 'object');

    // In ES5, if the argument to this method is a primitive, then it will cause a TypeError.
    // In ES6, a non-object argument will be treated as if it was a frozen ordinary object, simply return true.
    // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen
    // The following provides ES6 behavior for ES5 environments.

    var isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;

    this.assert(
      isFrozen
      , 'expected #{this} to be frozen'
      , 'expected #{this} to not be frozen'
    );
  });

  /**
   * ### .finite
   *
   * Asserts that the target is a number, and isn't `NaN` or positive/negative
   * `Infinity`.
   *
   *     expect(1).to.be.finite;
   *
   * Add `.not` earlier in the chain to negate `.finite`. However, it's
   * dangerous to do so. The problem is that it creates uncertain expectations
   * by asserting that the subject either isn't a number, or that it's `NaN`, or
   * that it's positive `Infinity`, or that it's negative `Infinity`. It's often
   * best to identify the exact output that's expected, and then write an
   * assertion that only accepts that exact output.
   *
   * When the target isn't expected to be a number, it's often best to assert
   * that it's the expected type, rather than asserting that it isn't one of
   * many unexpected types.
   *
   *     expect('foo').to.be.a('string'); // Recommended
   *     expect('foo').to.not.be.finite; // Not recommended
   *
   * When the target is expected to be `NaN`, it's often best to assert exactly
   * that.
   *
   *     expect(NaN).to.be.NaN; // Recommended
   *     expect(NaN).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be positive infinity, it's often best to
   * assert exactly that.
   *
   *     expect(Infinity).to.equal(Infinity); // Recommended
   *     expect(Infinity).to.not.be.finite; // Not recommended
   *
   * When the target is expected to be negative infinity, it's often best to
   * assert exactly that.
   *
   *     expect(-Infinity).to.equal(-Infinity); // Recommended
   *     expect(-Infinity).to.not.be.finite; // Not recommended
   *
   * A custom error message can be given as the second argument to `expect`.
   *
   *     expect('foo', 'nooo why fail??').to.be.finite;
   *
   * @name finite
   * @namespace BDD
   * @api public
   */

  Assertion.addProperty('finite', function(msg) {
    var obj = flag(this, 'object');

    this.assert(
        typeof obj === "number" && isFinite(obj)
      , 'expected #{this} to be a finite number'
      , 'expected #{this} to not be a finite number'
    );
  });
};

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var expect = function (chai, util) {
  chai.expect = function (val, message) {
    return new chai.Assertion(val, message);
  };

  /**
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure.
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace BDD
   * @api public
   */

  chai.expect.fail = function (actual, expected, message, operator) {
    message = message || 'expect.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, chai.expect.fail);
  };
};

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var should = function (chai, util) {
  var Assertion = chai.Assertion;

  function loadShould () {
    // explicitly define this method as function as to have it's name to include as `ssfi`
    function shouldGetter() {
      if (this instanceof String
          || this instanceof Number
          || this instanceof Boolean
          || typeof Symbol === 'function' && this instanceof Symbol) {
        return new Assertion(this.valueOf(), null, shouldGetter);
      }
      return new Assertion(this, null, shouldGetter);
    }
    function shouldSetter(value) {
      // See https://github.com/chaijs/chai/issues/86: this makes
      // `whatever.should = someValue` actually set `someValue`, which is
      // especially useful for `global.should = require('chai').should()`.
      //
      // Note that we have to use [[DefineProperty]] instead of [[Put]]
      // since otherwise we would trigger this very setter!
      Object.defineProperty(this, 'should', {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    // modify Object.prototype to have `should`
    Object.defineProperty(Object.prototype, 'should', {
      set: shouldSetter
      , get: shouldGetter
      , configurable: true
    });

    var should = {};

    /**
     * ### .fail(actual, expected, [message], [operator])
     *
     * Throw a failure.
     *
     * @name fail
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @param {String} operator
     * @namespace BDD
     * @api public
     */

    should.fail = function (actual, expected, message, operator) {
      message = message || 'should.fail()';
      throw new chai.AssertionError(message, {
          actual: actual
        , expected: expected
        , operator: operator
      }, should.fail);
    };

    /**
     * ### .equal(actual, expected, [message])
     *
     * Asserts non-strict equality (`==`) of `actual` and `expected`.
     *
     *     should.equal(3, '3', '== coerces values to strings');
     *
     * @name equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/string/regexp], [string/regexp], [message])
     *
     * Asserts that `function` will throw an error that is an instance of
     * `constructor`, or alternately that it will throw an error with message
     * matching `regexp`.
     *
     *     should.throw(fn, 'function throws a reference error');
     *     should.throw(fn, /function throws a reference error/);
     *     should.throw(fn, ReferenceError);
     *     should.throw(fn, ReferenceError, 'function throws a reference error');
     *     should.throw(fn, ReferenceError, /function throws a reference error/);
     *
     * @name throw
     * @alias Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };

    /**
     * ### .exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var foo = 'hi';
     *
     *     should.exist(foo, 'foo exists');
     *
     * @name exist
     * @namespace Should
     * @api public
     */

    should.exist = function (val, msg) {
      new Assertion(val, msg).to.exist;
    };

    // negation
    should.not = {};

    /**
     * ### .not.equal(actual, expected, [message])
     *
     * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
     *
     *     should.not.equal(3, 4, 'these numbers are not equal');
     *
     * @name not.equal
     * @param {Mixed} actual
     * @param {Mixed} expected
     * @param {String} message
     * @namespace Should
     * @api public
     */

    should.not.equal = function (val1, val2, msg) {
      new Assertion(val1, msg).to.not.equal(val2);
    };

    /**
     * ### .throw(function, [constructor/regexp], [message])
     *
     * Asserts that `function` will _not_ throw an error that is an instance of
     * `constructor`, or alternately that it will not throw an error with message
     * matching `regexp`.
     *
     *     should.not.throw(fn, Error, 'function does not throw');
     *
     * @name not.throw
     * @alias not.Throw
     * @param {Function} function
     * @param {ErrorConstructor} constructor
     * @param {RegExp} regexp
     * @param {String} message
     * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
     * @namespace Should
     * @api public
     */

    should.not.Throw = function (fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };

    /**
     * ### .not.exist
     *
     * Asserts that the target is neither `null` nor `undefined`.
     *
     *     var bar = null;
     *
     *     should.not.exist(bar, 'bar does not exist');
     *
     * @name not.exist
     * @namespace Should
     * @api public
     */

    should.not.exist = function (val, msg) {
      new Assertion(val, msg).to.not.exist;
    };

    should['throw'] = should['Throw'];
    should.not['throw'] = should.not['Throw'];

    return should;
  }

  chai.should = loadShould;
  chai.Should = loadShould;
};

/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */


var assert = function (chai, util) {

  /*!
   * Chai dependencies.
   */

  var Assertion = chai.Assertion
    , flag = util.flag;

  /*!
   * Module export.
   */

  /**
   * ### assert(expression, message)
   *
   * Write your own test expressions.
   *
   *     assert('foo' !== 'bar', 'foo is not bar');
   *     assert(Array.isArray([]), 'empty arrays are arrays');
   *
   * @param {Mixed} expression to test for truthiness
   * @param {String} message to display on error
   * @name assert
   * @namespace Assert
   * @api public
   */

  var assert = chai.assert = function (express, errmsg) {
    var test = new Assertion(null, null, chai.assert, true);
    test.assert(
        express
      , errmsg
      , '[ negation message unavailable ]'
    );
  };

  /**
   * ### .fail(actual, expected, [message], [operator])
   *
   * Throw a failure. Node.js `assert` module-compatible.
   *
   * @name fail
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @param {String} operator
   * @namespace Assert
   * @api public
   */

  assert.fail = function (actual, expected, message, operator) {
    message = message || 'assert.fail()';
    throw new chai.AssertionError(message, {
        actual: actual
      , expected: expected
      , operator: operator
    }, assert.fail);
  };

  /**
   * ### .isOk(object, [message])
   *
   * Asserts that `object` is truthy.
   *
   *     assert.isOk('everything', 'everything is ok');
   *     assert.isOk(false, 'this will fail');
   *
   * @name isOk
   * @alias ok
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isOk = function (val, msg) {
    new Assertion(val, msg, assert.isOk, true).is.ok;
  };

  /**
   * ### .isNotOk(object, [message])
   *
   * Asserts that `object` is falsy.
   *
   *     assert.isNotOk('everything', 'this will fail');
   *     assert.isNotOk(false, 'this will pass');
   *
   * @name isNotOk
   * @alias notOk
   * @param {Mixed} object to test
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotOk = function (val, msg) {
    new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
  };

  /**
   * ### .equal(actual, expected, [message])
   *
   * Asserts non-strict equality (`==`) of `actual` and `expected`.
   *
   *     assert.equal(3, '3', '== coerces values to strings');
   *
   * @name equal
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.equal = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.equal, true);

    test.assert(
        exp == flag(test, 'object')
      , 'expected #{this} to equal #{exp}'
      , 'expected #{this} to not equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .notEqual(actual, expected, [message])
   *
   * Asserts non-strict inequality (`!=`) of `actual` and `expected`.
   *
   *     assert.notEqual(3, 4, 'these numbers are not equal');
   *
   * @name notEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notEqual = function (act, exp, msg) {
    var test = new Assertion(act, msg, assert.notEqual, true);

    test.assert(
        exp != flag(test, 'object')
      , 'expected #{this} to not equal #{exp}'
      , 'expected #{this} to equal #{act}'
      , exp
      , act
      , true
    );
  };

  /**
   * ### .strictEqual(actual, expected, [message])
   *
   * Asserts strict equality (`===`) of `actual` and `expected`.
   *
   *     assert.strictEqual(true, true, 'these booleans are strictly equal');
   *
   * @name strictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.strictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
  };

  /**
   * ### .notStrictEqual(actual, expected, [message])
   *
   * Asserts strict inequality (`!==`) of `actual` and `expected`.
   *
   *     assert.notStrictEqual(3, '3', 'no coercion for strict equality');
   *
   * @name notStrictEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
  };

  /**
   * ### .deepEqual(actual, expected, [message])
   *
   * Asserts that `actual` is deeply equal to `expected`.
   *
   *     assert.deepEqual({ tea: 'green' }, { tea: 'green' });
   *
   * @name deepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @alias deepStrictEqual
   * @namespace Assert
   * @api public
   */

  assert.deepEqual = assert.deepStrictEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
  };

  /**
   * ### .notDeepEqual(actual, expected, [message])
   *
   * Assert that `actual` is not deeply equal to `expected`.
   *
   *     assert.notDeepEqual({ tea: 'green' }, { tea: 'jasmine' });
   *
   * @name notDeepEqual
   * @param {Mixed} actual
   * @param {Mixed} expected
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepEqual = function (act, exp, msg) {
    new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
  };

   /**
   * ### .isAbove(valueToCheck, valueToBeAbove, [message])
   *
   * Asserts `valueToCheck` is strictly greater than (>) `valueToBeAbove`.
   *
   *     assert.isAbove(5, 2, '5 is strictly greater than 2');
   *
   * @name isAbove
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAbove
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAbove = function (val, abv, msg) {
    new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
  };

   /**
   * ### .isAtLeast(valueToCheck, valueToBeAtLeast, [message])
   *
   * Asserts `valueToCheck` is greater than or equal to (>=) `valueToBeAtLeast`.
   *
   *     assert.isAtLeast(5, 2, '5 is greater or equal to 2');
   *     assert.isAtLeast(3, 3, '3 is greater or equal to 3');
   *
   * @name isAtLeast
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtLeast
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtLeast = function (val, atlst, msg) {
    new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
  };

   /**
   * ### .isBelow(valueToCheck, valueToBeBelow, [message])
   *
   * Asserts `valueToCheck` is strictly less than (<) `valueToBeBelow`.
   *
   *     assert.isBelow(3, 6, '3 is strictly less than 6');
   *
   * @name isBelow
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeBelow
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBelow = function (val, blw, msg) {
    new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
  };

   /**
   * ### .isAtMost(valueToCheck, valueToBeAtMost, [message])
   *
   * Asserts `valueToCheck` is less than or equal to (<=) `valueToBeAtMost`.
   *
   *     assert.isAtMost(3, 6, '3 is less than or equal to 6');
   *     assert.isAtMost(4, 4, '4 is less than or equal to 4');
   *
   * @name isAtMost
   * @param {Mixed} valueToCheck
   * @param {Mixed} valueToBeAtMost
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isAtMost = function (val, atmst, msg) {
    new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
  };

  /**
   * ### .isTrue(value, [message])
   *
   * Asserts that `value` is true.
   *
   *     var teaServed = true;
   *     assert.isTrue(teaServed, 'the tea has been served');
   *
   * @name isTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isTrue = function (val, msg) {
    new Assertion(val, msg, assert.isTrue, true).is['true'];
  };

  /**
   * ### .isNotTrue(value, [message])
   *
   * Asserts that `value` is not true.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotTrue(tea, 'great, time for tea!');
   *
   * @name isNotTrue
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotTrue = function (val, msg) {
    new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
  };

  /**
   * ### .isFalse(value, [message])
   *
   * Asserts that `value` is false.
   *
   *     var teaServed = false;
   *     assert.isFalse(teaServed, 'no tea yet? hmm...');
   *
   * @name isFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFalse = function (val, msg) {
    new Assertion(val, msg, assert.isFalse, true).is['false'];
  };

  /**
   * ### .isNotFalse(value, [message])
   *
   * Asserts that `value` is not false.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotFalse(tea, 'great, time for tea!');
   *
   * @name isNotFalse
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFalse = function (val, msg) {
    new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
  };

  /**
   * ### .isNull(value, [message])
   *
   * Asserts that `value` is null.
   *
   *     assert.isNull(err, 'there was no error');
   *
   * @name isNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNull = function (val, msg) {
    new Assertion(val, msg, assert.isNull, true).to.equal(null);
  };

  /**
   * ### .isNotNull(value, [message])
   *
   * Asserts that `value` is not null.
   *
   *     var tea = 'tasty chai';
   *     assert.isNotNull(tea, 'great, time for tea!');
   *
   * @name isNotNull
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNull = function (val, msg) {
    new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
  };

  /**
   * ### .isNaN
   *
   * Asserts that value is NaN.
   *
   *     assert.isNaN(NaN, 'NaN is NaN');
   *
   * @name isNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
  };

  /**
   * ### .isNotNaN
   *
   * Asserts that value is not NaN.
   *
   *     assert.isNotNaN(4, '4 is not NaN');
   *
   * @name isNotNaN
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */
  assert.isNotNaN = function (val, msg) {
    new Assertion(val, msg, assert.isNotNaN, true).not.to.be.NaN;
  };

  /**
   * ### .exists
   *
   * Asserts that the target is neither `null` nor `undefined`.
   *
   *     var foo = 'hi';
   *
   *     assert.exists(foo, 'foo is neither `null` nor `undefined`');
   *
   * @name exists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.exists = function (val, msg) {
    new Assertion(val, msg, assert.exists, true).to.exist;
  };

  /**
   * ### .notExists
   *
   * Asserts that the target is either `null` or `undefined`.
   *
   *     var bar = null
   *       , baz;
   *
   *     assert.notExists(bar);
   *     assert.notExists(baz, 'baz is either null or undefined');
   *
   * @name notExists
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notExists = function (val, msg) {
    new Assertion(val, msg, assert.notExists, true).to.not.exist;
  };

  /**
   * ### .isUndefined(value, [message])
   *
   * Asserts that `value` is `undefined`.
   *
   *     var tea;
   *     assert.isUndefined(tea, 'no tea defined');
   *
   * @name isUndefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isUndefined = function (val, msg) {
    new Assertion(val, msg, assert.isUndefined, true).to.equal(undefined);
  };

  /**
   * ### .isDefined(value, [message])
   *
   * Asserts that `value` is not `undefined`.
   *
   *     var tea = 'cup of chai';
   *     assert.isDefined(tea, 'tea has been defined');
   *
   * @name isDefined
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isDefined = function (val, msg) {
    new Assertion(val, msg, assert.isDefined, true).to.not.equal(undefined);
  };

  /**
   * ### .isFunction(value, [message])
   *
   * Asserts that `value` is a function.
   *
   *     function serveTea() { return 'cup of tea'; };
   *     assert.isFunction(serveTea, 'great, we can have tea now');
   *
   * @name isFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFunction = function (val, msg) {
    new Assertion(val, msg, assert.isFunction, true).to.be.a('function');
  };

  /**
   * ### .isNotFunction(value, [message])
   *
   * Asserts that `value` is _not_ a function.
   *
   *     var serveTea = [ 'heat', 'pour', 'sip' ];
   *     assert.isNotFunction(serveTea, 'great, we have listed the steps');
   *
   * @name isNotFunction
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotFunction = function (val, msg) {
    new Assertion(val, msg, assert.isNotFunction, true).to.not.be.a('function');
  };

  /**
   * ### .isObject(value, [message])
   *
   * Asserts that `value` is an object of type 'Object' (as revealed by `Object.prototype.toString`).
   * _The assertion does not match subclassed objects._
   *
   *     var selection = { name: 'Chai', serve: 'with spices' };
   *     assert.isObject(selection, 'tea selection is an object');
   *
   * @name isObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isObject = function (val, msg) {
    new Assertion(val, msg, assert.isObject, true).to.be.a('object');
  };

  /**
   * ### .isNotObject(value, [message])
   *
   * Asserts that `value` is _not_ an object of type 'Object' (as revealed by `Object.prototype.toString`).
   *
   *     var selection = 'chai'
   *     assert.isNotObject(selection, 'tea selection is not an object');
   *     assert.isNotObject(null, 'null is not an object');
   *
   * @name isNotObject
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotObject = function (val, msg) {
    new Assertion(val, msg, assert.isNotObject, true).to.not.be.a('object');
  };

  /**
   * ### .isArray(value, [message])
   *
   * Asserts that `value` is an array.
   *
   *     var menu = [ 'green', 'chai', 'oolong' ];
   *     assert.isArray(menu, 'what kind of tea do we want?');
   *
   * @name isArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isArray = function (val, msg) {
    new Assertion(val, msg, assert.isArray, true).to.be.an('array');
  };

  /**
   * ### .isNotArray(value, [message])
   *
   * Asserts that `value` is _not_ an array.
   *
   *     var menu = 'green|chai|oolong';
   *     assert.isNotArray(menu, 'what kind of tea do we want?');
   *
   * @name isNotArray
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotArray = function (val, msg) {
    new Assertion(val, msg, assert.isNotArray, true).to.not.be.an('array');
  };

  /**
   * ### .isString(value, [message])
   *
   * Asserts that `value` is a string.
   *
   *     var teaOrder = 'chai';
   *     assert.isString(teaOrder, 'order placed');
   *
   * @name isString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isString = function (val, msg) {
    new Assertion(val, msg, assert.isString, true).to.be.a('string');
  };

  /**
   * ### .isNotString(value, [message])
   *
   * Asserts that `value` is _not_ a string.
   *
   *     var teaOrder = 4;
   *     assert.isNotString(teaOrder, 'order placed');
   *
   * @name isNotString
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotString = function (val, msg) {
    new Assertion(val, msg, assert.isNotString, true).to.not.be.a('string');
  };

  /**
   * ### .isNumber(value, [message])
   *
   * Asserts that `value` is a number.
   *
   *     var cups = 2;
   *     assert.isNumber(cups, 'how many cups');
   *
   * @name isNumber
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNumber, true).to.be.a('number');
  };

  /**
   * ### .isNotNumber(value, [message])
   *
   * Asserts that `value` is _not_ a number.
   *
   *     var cups = '2 cups please';
   *     assert.isNotNumber(cups, 'how many cups');
   *
   * @name isNotNumber
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotNumber = function (val, msg) {
    new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a('number');
  };

   /**
   * ### .isFinite(value, [message])
   *
   * Asserts that `value` is a finite number. Unlike `.isNumber`, this will fail for `NaN` and `Infinity`.
   *
   *     var cups = 2;
   *     assert.isFinite(cups, 'how many cups');
   *
   *     assert.isFinite(NaN); // throws
   *
   * @name isFinite
   * @param {Number} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isFinite = function (val, msg) {
    new Assertion(val, msg, assert.isFinite, true).to.be.finite;
  };

  /**
   * ### .isBoolean(value, [message])
   *
   * Asserts that `value` is a boolean.
   *
   *     var teaReady = true
   *       , teaServed = false;
   *
   *     assert.isBoolean(teaReady, 'is the tea ready');
   *     assert.isBoolean(teaServed, 'has tea been served');
   *
   * @name isBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isBoolean, true).to.be.a('boolean');
  };

  /**
   * ### .isNotBoolean(value, [message])
   *
   * Asserts that `value` is _not_ a boolean.
   *
   *     var teaReady = 'yep'
   *       , teaServed = 'nope';
   *
   *     assert.isNotBoolean(teaReady, 'is the tea ready');
   *     assert.isNotBoolean(teaServed, 'has tea been served');
   *
   * @name isNotBoolean
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.isNotBoolean = function (val, msg) {
    new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a('boolean');
  };

  /**
   * ### .typeOf(value, name, [message])
   *
   * Asserts that `value`'s type is `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.typeOf({ tea: 'chai' }, 'object', 'we have an object');
   *     assert.typeOf(['chai', 'jasmine'], 'array', 'we have an array');
   *     assert.typeOf('tea', 'string', 'we have a string');
   *     assert.typeOf(/tea/, 'regexp', 'we have a regular expression');
   *     assert.typeOf(null, 'null', 'we have a null');
   *     assert.typeOf(undefined, 'undefined', 'we have an undefined');
   *
   * @name typeOf
   * @param {Mixed} value
   * @param {String} name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.typeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.typeOf, true).to.be.a(type);
  };

  /**
   * ### .notTypeOf(value, name, [message])
   *
   * Asserts that `value`'s type is _not_ `name`, as determined by
   * `Object.prototype.toString`.
   *
   *     assert.notTypeOf('tea', 'number', 'strings are not numbers');
   *
   * @name notTypeOf
   * @param {Mixed} value
   * @param {String} typeof name
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notTypeOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notTypeOf, true).to.not.be.a(type);
  };

  /**
   * ### .instanceOf(object, constructor, [message])
   *
   * Asserts that `value` is an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new Tea('chai');
   *
   *     assert.instanceOf(chai, Tea, 'chai is an instance of tea');
   *
   * @name instanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.instanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type);
  };

  /**
   * ### .notInstanceOf(object, constructor, [message])
   *
   * Asserts `value` is not an instance of `constructor`.
   *
   *     var Tea = function (name) { this.name = name; }
   *       , chai = new String('chai');
   *
   *     assert.notInstanceOf(chai, Tea, 'chai is not an instance of tea');
   *
   * @name notInstanceOf
   * @param {Object} object
   * @param {Constructor} constructor
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInstanceOf = function (val, type, msg) {
    new Assertion(val, msg, assert.notInstanceOf, true)
      .to.not.be.instanceOf(type);
  };

  /**
   * ### .include(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.include([1,2,3], 2, 'array contains value');
   *     assert.include('foobar', 'foo', 'string contains substring');
   *     assert.include({ foo: 'bar', hello: 'universe' }, { foo: 'bar' }, 'object contains property');
   *
   * Strict equality (===) is used. When asserting the inclusion of a value in
   * an array, the array is searched for an element that's strictly equal to the
   * given value. When asserting a subset of properties in an object, the object
   * is searched for the given property keys, checking that each one is present
   * and stricty equal to the given property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.include([obj1, obj2], obj1);
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1});
   *     assert.include({foo: obj1, bar: obj2}, {foo: obj1, bar: obj2});
   *
   * @name include
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.include = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.include, true).include(inc);
  };

  /**
   * ### .notInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array, a substring in a string, or a subset of
   * properties in an object.
   *
   *     assert.notInclude([1,2,3], 4, 'array doesn't contain value');
   *     assert.notInclude('foobar', 'baz', 'string doesn't contain substring');
   *     assert.notInclude({ foo: 'bar', hello: 'universe' }, { foo: 'baz' }, 'object doesn't contain property');
   *
   * Strict equality (===) is used. When asserting the absence of a value in an
   * array, the array is searched to confirm the absence of an element that's
   * strictly equal to the given value. When asserting a subset of properties in
   * an object, the object is searched to confirm that at least one of the given
   * property keys is either not present or not strictly equal to the given
   * property value. For instance:
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notInclude([obj1, obj2], {a: 1});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.notInclude({foo: obj1, bar: obj2}, {foo: obj1, bar: {b: 2}});
   *
   * @name notInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
  };

  /**
   * ### .deepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` includes `needle`. Can be used to assert the
   * inclusion of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.deepInclude([obj1, obj2], {a: 1});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}});
   *     assert.deepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 2}});
   *
   * @name deepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
  };

  /**
   * ### .notDeepInclude(haystack, needle, [message])
   *
   * Asserts that `haystack` does not include `needle`. Can be used to assert
   * the absence of a value in an array or a subset of properties in an object.
   * Deep equality is used.
   *
   *     var obj1 = {a: 1}
   *       , obj2 = {b: 2};
   *     assert.notDeepInclude([obj1, obj2], {a: 9});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 9}});
   *     assert.notDeepInclude({foo: obj1, bar: obj2}, {foo: {a: 1}, bar: {b: 9}});
   *
   * @name notDeepInclude
   * @param {Array|String} haystack
   * @param {Mixed} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
  };

  /**
   * ### .nestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'. 
   * Can be used to assert the inclusion of a subset of properties in an 
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.nestedInclude({'.a': {'b': 'x'}}, {'\\.a.[b]': 'x'});
   *     assert.nestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'x'});
   * 
   * @name nestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */ 

  assert.nestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
  };

  /**
   * ### .notNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' does not include 'needle'. 
   * Can be used to assert the absence of a subset of properties in an 
   * object.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties. 
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.notNestedInclude({'.a': {'b': 'x'}}, {'\\.a.b': 'y'});
   *     assert.notNestedInclude({'a': {'[b]': 'x'}}, {'a.\\[b\\]': 'y'});
   * 
   * @name notNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */ 

  assert.notNestedInclude = function (exp, inc, msg) {
    new Assertion(exp, msg, assert.notNestedInclude, true)
      .not.nested.include(inc);
  };

  /**
   * ### .deepNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.deepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {x: 1}});
   *     assert.deepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {x: 1}});
   *    
   * @name deepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */

  assert.deepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepNestedInclude, true)
      .deep.nested.include(inc);
  };

  /**
   * ### .notDeepNestedInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' does not include 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while checking for deep equality.
   * Enables the use of dot- and bracket-notation for referencing nested 
   * properties.
   * '[]' and '.' in property names can be escaped using double backslashes.
   * 
   *     assert.notDeepNestedInclude({a: {b: [{x: 1}]}}, {'a.b[0]': {y: 1}})
   *     assert.notDeepNestedInclude({'.a': {'[b]': {x: 1}}}, {'\\.a.\\[b\\]': {y: 2}});
   *    
   * @name notDeepNestedInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public 
   */

  assert.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepNestedInclude, true)
      .not.deep.nested.include(inc);
  };

  /**
   * ### .ownInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while ignoring inherited properties.
   * 
   *     assert.ownInclude({ a: 1 }, { a: 1 });
   * 
   * @name ownInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.ownInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
  };

  /**
   * ### .notOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while ignoring inherited properties.
   * 
   *     Object.prototype.b = 2;
   * 
   *     assert.notOwnInclude({ a: 1 }, { b: 2 });
   * 
   * @name notOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
  };

  /**
   * ### .deepOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the inclusion of a subset of properties in an 
   * object while ignoring inherited properties and checking for deep equality.
   * 
   *      assert.deepOwnInclude({a: {b: 2}}, {a: {b: 2}});
   *      
   * @name deepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepOwnInclude, true)
      .deep.own.include(inc);
  };

   /**
   * ### .notDeepOwnInclude(haystack, needle, [message])
   * 
   * Asserts that 'haystack' includes 'needle'.
   * Can be used to assert the absence of a subset of properties in an 
   * object while ignoring inherited properties and checking for deep equality.
   * 
   *      assert.notDeepOwnInclude({a: {b: 2}}, {a: {c: 3}});
   *      
   * @name notDeepOwnInclude
   * @param {Object} haystack
   * @param {Object} needle
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepOwnInclude, true)
      .not.deep.own.include(inc);
  };

  /**
   * ### .match(value, regexp, [message])
   *
   * Asserts that `value` matches the regular expression `regexp`.
   *
   *     assert.match('foobar', /^foo/, 'regexp matches');
   *
   * @name match
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.match = function (exp, re, msg) {
    new Assertion(exp, msg, assert.match, true).to.match(re);
  };

  /**
   * ### .notMatch(value, regexp, [message])
   *
   * Asserts that `value` does not match the regular expression `regexp`.
   *
   *     assert.notMatch('foobar', /^foo/, 'regexp does not match');
   *
   * @name notMatch
   * @param {Mixed} value
   * @param {RegExp} regexp
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notMatch = function (exp, re, msg) {
    new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
  };

  /**
   * ### .property(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`.
   *
   *     assert.property({ tea: { green: 'matcha' }}, 'tea');
   *     assert.property({ tea: { green: 'matcha' }}, 'toString');
   *
   * @name property
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.property = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.property, true).to.have.property(prop);
  };

  /**
   * ### .notProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property`.
   *
   *     assert.notProperty({ tea: { green: 'matcha' }}, 'coffee');
   *
   * @name notProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notProperty, true)
      .to.not.have.property(prop);
  };

  /**
   * ### .propertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.propertyVal({ tea: 'is good' }, 'tea', 'is good');
   *
   * @name propertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.propertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.propertyVal, true)
      .to.have.property(prop, val);
  };

  /**
   * ### .notPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a strict equality check
   * (===).
   *
   *     assert.notPropertyVal({ tea: 'is good' }, 'tea', 'is bad');
   *     assert.notPropertyVal({ tea: 'is good' }, 'coffee', 'is good');
   *
   * @name notPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notPropertyVal, true)
      .to.not.have.property(prop, val);
  };

  /**
   * ### .deepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property` with a value given by `value`. Uses a deep equality check.
   *
   *     assert.deepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepPropertyVal, true)
      .to.have.deep.property(prop, val);
  };

  /**
   * ### .notDeepPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct or inherited property named
   * by `property` with value given by `value`. Uses a deep equality check.
   *
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *
   * @name notDeepPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepPropertyVal, true)
      .to.not.have.deep.property(prop, val);
  };

  /**
   * ### .ownProperty(object, property, [message])
   *
   * Asserts that `object` has a direct property named by `property`. Inherited
   * properties aren't checked.
   *
   *     assert.ownProperty({ tea: { green: 'matcha' }}, 'tea');
   *
   * @name ownProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.ownProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.ownProperty, true)
      .to.have.own.property(prop);
  };

  /**
   * ### .notOwnProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by
   * `property`. Inherited properties aren't checked.
   *
   *     assert.notOwnProperty({ tea: { green: 'matcha' }}, 'coffee');
   *     assert.notOwnProperty({}, 'toString');
   *
   * @name notOwnProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @api public
   */

  assert.notOwnProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notOwnProperty, true)
      .to.not.have.own.property(prop);
  };

  /**
   * ### .ownPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a strict equality check (===).
   * Inherited properties aren't checked.
   *
   *     assert.ownPropertyVal({ coffee: 'is good'}, 'coffee', 'is good');
   *
   * @name ownPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.ownPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.ownPropertyVal, true)
      .to.have.own.property(prop, value);
  };

  /**
   * ### .notOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a strict equality check
   * (===). Inherited properties aren't checked.
   *
   *     assert.notOwnPropertyVal({ tea: 'is better'}, 'tea', 'is worse');
   *     assert.notOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notOwnPropertyVal, true)
      .to.not.have.own.property(prop, value);
  };

  /**
   * ### .deepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a direct property named by `property` and a value
   * equal to the provided `value`. Uses a deep equality check. Inherited
   * properties aren't checked.
   *
   *     assert.deepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'matcha' });
   *
   * @name deepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.deepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.deepOwnPropertyVal, true)
      .to.have.deep.own.property(prop, value);
  };

  /**
   * ### .notDeepOwnPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a direct property named by `property`
   * with a value equal to the provided `value`. Uses a deep equality check.
   * Inherited properties aren't checked.
   *
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { black: 'matcha' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'tea', { green: 'oolong' });
   *     assert.notDeepOwnPropertyVal({ tea: { green: 'matcha' } }, 'coffee', { green: 'matcha' });
   *     assert.notDeepOwnPropertyVal({}, 'toString', Object.prototype.toString);
   *
   * @name notDeepOwnPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @api public
   */

  assert.notDeepOwnPropertyVal = function (obj, prop, value, msg) {
    new Assertion(obj, msg, assert.notDeepOwnPropertyVal, true)
      .to.not.have.deep.own.property(prop, value);
  };

  /**
   * ### .nestedProperty(object, property, [message])
   *
   * Asserts that `object` has a direct or inherited property named by
   * `property`, which can be a string using dot- and bracket-notation for
   * nested reference.
   *
   *     assert.nestedProperty({ tea: { green: 'matcha' }}, 'tea.green');
   *
   * @name nestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.nestedProperty, true)
      .to.have.nested.property(prop);
  };

  /**
   * ### .notNestedProperty(object, property, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property`, which
   * can be a string using dot- and bracket-notation for nested reference. The
   * property cannot exist on the object nor anywhere in its prototype chain.
   *
   *     assert.notNestedProperty({ tea: { green: 'matcha' }}, 'tea.oolong');
   *
   * @name notNestedProperty
   * @param {Object} object
   * @param {String} property
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedProperty = function (obj, prop, msg) {
    new Assertion(obj, msg, assert.notNestedProperty, true)
      .to.not.have.nested.property(prop);
  };

  /**
   * ### .nestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a strict equality check (===).
   *
   *     assert.nestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'matcha');
   *
   * @name nestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.nestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.nestedPropertyVal, true)
      .to.have.nested.property(prop, val);
  };

  /**
   * ### .notNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a strict equality check (===).
   *
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'tea.green', 'konacha');
   *     assert.notNestedPropertyVal({ tea: { green: 'matcha' }}, 'coffee.green', 'matcha');
   *
   * @name notNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notNestedPropertyVal, true)
      .to.not.have.nested.property(prop, val);
  };

  /**
   * ### .deepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` has a property named by `property` with a value given
   * by `value`. `property` can use dot- and bracket-notation for nested
   * reference. Uses a deep equality check.
   *
   *     assert.deepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yum' });
   *
   * @name deepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.deepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepNestedPropertyVal, true)
      .to.have.deep.nested.property(prop, val);
  };

  /**
   * ### .notDeepNestedPropertyVal(object, property, value, [message])
   *
   * Asserts that `object` does _not_ have a property named by `property` with
   * value given by `value`. `property` can use dot- and bracket-notation for
   * nested reference. Uses a deep equality check.
   *
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { oolong: 'yum' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.green', { matcha: 'yuck' });
   *     assert.notDeepNestedPropertyVal({ tea: { green: { matcha: 'yum' } } }, 'tea.black', { matcha: 'yum' });
   *
   * @name notDeepNestedPropertyVal
   * @param {Object} object
   * @param {String} property
   * @param {Mixed} value
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notDeepNestedPropertyVal = function (obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notDeepNestedPropertyVal, true)
      .to.not.have.deep.nested.property(prop, val);
  };

  /**
   * ### .lengthOf(object, length, [message])
   *
   * Asserts that `object` has a `length` property with the expected value.
   *
   *     assert.lengthOf([1,2,3], 3, 'array has length of 3');
   *     assert.lengthOf('foobar', 6, 'string has length of 6');
   *
   * @name lengthOf
   * @param {Mixed} object
   * @param {Number} length
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.lengthOf = function (exp, len, msg) {
    new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
  };

  /**
   * ### .hasAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'iDontExist', 'baz']);
   *     assert.hasAnyKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, iDontExist: 99, baz: 1337});
   *     assert.hasAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAnyKeys(new Set([{foo: 'bar'}, 'anotherKey']), [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAnyKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
  };

  /**
   * ### .hasAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.hasAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337]);
   *     assert.hasAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.hasAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name hasAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
  };

  /**
   * ### .containsAllKeys(object, [keys], [message])
   *
   * Asserts that `object` has all of the `keys` provided but may have more keys not listed.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, ['foo', 'bar', 'baz']);
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, baz: 1337});
   *     assert.containsAllKeys({foo: 1, bar: 2, baz: 3}, {foo: 30, bar: 99, baz: 1337});
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}]);
   *     assert.containsAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{foo: 1}, 'key']);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}]);
   *     assert.containsAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{foo: 'bar'}, 'anotherKey']);
   *
   * @name containsAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllKeys, true)
      .to.contain.all.keys(keys);
  };

  /**
   * ### .doesNotHaveAnyKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAnyKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAnyKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAnyKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAnyKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true)
      .to.not.have.any.keys(keys);
  };

  /**
   * ### .doesNotHaveAllKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, ['one', 'two', 'example']);
   *     assert.doesNotHaveAllKeys({foo: 1, bar: 2, baz: 3}, {one: 1, two: 2, example: 'foo'});
   *     assert.doesNotHaveAllKeys(new Map([[{foo: 1}, 'bar'], ['key', 'value']]), [{one: 'two'}, 'example']);
   *     assert.doesNotHaveAllKeys(new Set([{foo: 'bar'}, 'anotherKey'], [{one: 'two'}, 'example']);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {String[]} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllKeys, true)
      .to.not.have.all.keys(keys);
  };

  /**
   * ### .hasAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {three: 'three'}]);
   *     assert.hasAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name doesNotHaveAllKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyDeepKeys, true)
      .to.have.any.deep.keys(keys);
  };

 /**
   * ### .hasAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has all and only all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne']]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}]), {one: 'one'});
   *     assert.hasAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name hasAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.hasAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllDeepKeys, true)
      .to.have.all.deep.keys(keys);
  };

 /**
   * ### .containsAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` contains all of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{one: 'one'}, {two: 'two'}]);
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {one: 'one'});
   *     assert.containsAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {two: 'two'}]);
   *
   * @name containsAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.containsAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllDeepKeys, true)
      .to.contain.all.deep.keys(keys);
  };

 /**
   * ### .doesNotHaveAnyDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` has none of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAnyDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAnyDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{twenty: 'twenty'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAnyDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAnyDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyDeepKeys, true)
      .to.not.have.any.deep.keys(keys);
  };

 /**
   * ### .doesNotHaveAllDeepKeys(object, [keys], [message])
   *
   * Asserts that `object` does not have at least one of the `keys` provided.
   * Since Sets and Maps can have objects as keys you can use this assertion to perform
   * a deep comparison.
   * You can also provide a single object instead of a `keys` array and its keys
   * will be used as the expected set of keys.
   *
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [1, 2]]), {thisDoesNot: 'exist'});
   *     assert.doesNotHaveAllDeepKeys(new Map([[{one: 'one'}, 'valueOne'], [{two: 'two'}, 'valueTwo']]), [{twenty: 'twenty'}, {one: 'one'}]);
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), {twenty: 'twenty'});
   *     assert.doesNotHaveAllDeepKeys(new Set([{one: 'one'}, {two: 'two'}]), [{one: 'one'}, {fifty: 'fifty'}]);
   *
   * @name doesNotHaveAllDeepKeys
   * @param {Mixed} object
   * @param {Array|Object} keys
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.doesNotHaveAllDeepKeys = function (obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllDeepKeys, true)
      .to.not.have.all.deep.keys(keys);
  };

 /**
   * ### .throws(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will have a
   * message matching `errMsgMatcher`.
   *
   *     assert.throws(fn, 'function throws a reference error');
   *     assert.throws(fn, /function throws a reference error/);
   *     assert.throws(fn, ReferenceError);
   *     assert.throws(fn, errorInstance);
   *     assert.throws(fn, ReferenceError, 'Error thrown must be a ReferenceError and have this msg');
   *     assert.throws(fn, errorInstance, 'Error thrown must be the same errorInstance and have this msg');
   *     assert.throws(fn, ReferenceError, /Error thrown must be a ReferenceError and match this/);
   *     assert.throws(fn, errorInstance, /Error thrown must be the same errorInstance and match this/);
   *
   * @name throws
   * @alias throw
   * @alias Throw
   * @param {Function} fn
   * @param {ErrorConstructor|Error} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.throws = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    var assertErr = new Assertion(fn, msg, assert.throws, true)
      .to.throw(errorLike, errMsgMatcher);
    return flag(assertErr, 'object');
  };

  /**
   * ### .doesNotThrow(fn, [errorLike/string/regexp], [string/regexp], [message])
   *
   * If `errorLike` is an `Error` constructor, asserts that `fn` will _not_ throw an error that is an
   * instance of `errorLike`.
   * If `errorLike` is an `Error` instance, asserts that the error thrown is _not_ the same
   * instance as `errorLike`.
   * If `errMsgMatcher` is provided, it also asserts that the error thrown will _not_ have a
   * message matching `errMsgMatcher`.
   *
   *     assert.doesNotThrow(fn, 'Any Error thrown must not have this message');
   *     assert.doesNotThrow(fn, /Any Error thrown must not match this/);
   *     assert.doesNotThrow(fn, Error);
   *     assert.doesNotThrow(fn, errorInstance);
   *     assert.doesNotThrow(fn, Error, 'Error must not have this message');
   *     assert.doesNotThrow(fn, errorInstance, 'Error must not have this message');
   *     assert.doesNotThrow(fn, Error, /Error must not match this/);
   *     assert.doesNotThrow(fn, errorInstance, /Error must not match this/);
   *
   * @name doesNotThrow
   * @param {Function} fn
   * @param {ErrorConstructor} errorLike
   * @param {RegExp|String} errMsgMatcher
   * @param {String} message
   * @see https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error#Error_types
   * @namespace Assert
   * @api public
   */

  assert.doesNotThrow = function (fn, errorLike, errMsgMatcher, msg) {
    if ('string' === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }

    new Assertion(fn, msg, assert.doesNotThrow, true)
      .to.not.throw(errorLike, errMsgMatcher);
  };

  /**
   * ### .operator(val1, operator, val2, [message])
   *
   * Compares two values using `operator`.
   *
   *     assert.operator(1, '<', 2, 'everything is ok');
   *     assert.operator(1, '>', 2, 'this will fail');
   *
   * @name operator
   * @param {Mixed} val1
   * @param {String} operator
   * @param {Mixed} val2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.operator = function (val, operator, val2, msg) {
    var ok;
    switch(operator) {
      case '==':
        ok = val == val2;
        break;
      case '===':
        ok = val === val2;
        break;
      case '>':
        ok = val > val2;
        break;
      case '>=':
        ok = val >= val2;
        break;
      case '<':
        ok = val < val2;
        break;
      case '<=':
        ok = val <= val2;
        break;
      case '!=':
        ok = val != val2;
        break;
      case '!==':
        ok = val !== val2;
        break;
      default:
        msg = msg ? msg + ': ' : msg;
        throw new chai.AssertionError(
          msg + 'Invalid operator "' + operator + '"',
          undefined,
          assert.operator
        );
    }
    var test = new Assertion(ok, msg, assert.operator, true);
    test.assert(
        true === flag(test, 'object')
      , 'expected ' + util.inspect(val) + ' to be ' + operator + ' ' + util.inspect(val2)
      , 'expected ' + util.inspect(val) + ' to not be ' + operator + ' ' + util.inspect(val2) );
  };

  /**
   * ### .closeTo(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.closeTo(1.5, 1, 0.5, 'numbers are close');
   *
   * @name closeTo
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.closeTo = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
  };

  /**
   * ### .approximately(actual, expected, delta, [message])
   *
   * Asserts that the target is equal `expected`, to within a +/- `delta` range.
   *
   *     assert.approximately(1.5, 1, 0.5, 'numbers are close');
   *
   * @name approximately
   * @param {Number} actual
   * @param {Number} expected
   * @param {Number} delta
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.approximately = function (act, exp, delta, msg) {
    new Assertion(act, msg, assert.approximately, true)
      .to.be.approximately(exp, delta);
  };

  /**
   * ### .sameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * strict equality check (===).
   *
   *     assert.sameMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'same members');
   *
   * @name sameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameMembers, true)
      .to.have.same.members(set2);
  };

  /**
   * ### .notSameMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a strict equality check (===).
   *
   *     assert.notSameMembers([ 1, 2, 3 ], [ 5, 1, 3 ], 'not same members');
   *
   * @name notSameMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameMembers, true)
      .to.not.have.same.members(set2);
  };

  /**
   * ### .sameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in any order. Uses a
   * deep equality check.
   *
   *     assert.sameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { c: 3 }], 'same deep members');
   *
   * @name sameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepMembers, true)
      .to.have.same.deep.members(set2);
  };

  /**
   * ### .notSameDeepMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in any order.
   * Uses a deep equality check.
   *
   *     assert.notSameDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [{ b: 2 }, { a: 1 }, { f: 5 }], 'not same deep members');
   *
   * @name notSameDeepMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepMembers, true)
      .to.not.have.same.deep.members(set2);
  };

  /**
   * ### .sameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a strict equality check (===).
   *
   *     assert.sameOrderedMembers([ 1, 2, 3 ], [ 1, 2, 3 ], 'same ordered members');
   *
   * @name sameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameOrderedMembers, true)
      .to.have.same.ordered.members(set2);
  };

  /**
   * ### .notSameOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a strict equality check (===).
   *
   *     assert.notSameOrderedMembers([ 1, 2, 3 ], [ 2, 1, 3 ], 'not same ordered members');
   *
   * @name notSameOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameOrderedMembers, true)
      .to.not.have.same.ordered.members(set2);
  };

  /**
   * ### .sameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` have the same members in the same order.
   * Uses a deep equality check.
   *
   * assert.sameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { c: 3 } ], 'same deep ordered members');
   *
   * @name sameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.sameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.sameDeepOrderedMembers, true)
      .to.have.same.deep.ordered.members(set2);
  };

  /**
   * ### .notSameDeepOrderedMembers(set1, set2, [message])
   *
   * Asserts that `set1` and `set2` don't have the same members in the same
   * order. Uses a deep equality check.
   *
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 }, { z: 5 } ], 'not same deep ordered members');
   * assert.notSameDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { c: 3 } ], 'not same deep ordered members');
   *
   * @name notSameDeepOrderedMembers
   * @param {Array} set1
   * @param {Array} set2
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notSameDeepOrderedMembers = function (set1, set2, msg) {
    new Assertion(set1, msg, assert.notSameDeepOrderedMembers, true)
      .to.not.have.same.deep.ordered.members(set2);
  };

  /**
   * ### .includeMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.includeMembers([ 1, 2, 3 ], [ 2, 1, 2 ], 'include members');
   *
   * @name includeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeMembers, true)
      .to.include.members(subset);
  };

  /**
   * ### .notIncludeMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * strict equality check (===). Duplicates are ignored.
   *
   *     assert.notIncludeMembers([ 1, 2, 3 ], [ 5, 1 ], 'not include members');
   *
   * @name notIncludeMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeMembers, true)
      .to.not.include.members(subset);
  };

  /**
   * ### .includeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in any order. Uses a deep
   * equality check. Duplicates are ignored.
   *
   *     assert.includeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 }, { b: 2 } ], 'include deep members');
   *
   * @name includeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepMembers, true)
      .to.include.deep.members(subset);
  };

  /**
   * ### .notIncludeDeepMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in any order. Uses a
   * deep equality check. Duplicates are ignored.
   *
   *     assert.notIncludeDeepMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { f: 5 } ], 'not include deep members');
   *
   * @name notIncludeDeepMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepMembers, true)
      .to.not.include.deep.members(subset);
  };

  /**
   * ### .includeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.includeOrderedMembers([ 1, 2, 3 ], [ 1, 2 ], 'include ordered members');
   *
   * @name includeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeOrderedMembers, true)
      .to.include.ordered.members(subset);
  };

  /**
   * ### .notIncludeOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a strict equality
   * check (===).
   *
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 1 ], 'not include ordered members');
   *     assert.notIncludeOrderedMembers([ 1, 2, 3 ], [ 2, 3 ], 'not include ordered members');
   *
   * @name notIncludeOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeOrderedMembers, true)
      .to.not.include.ordered.members(subset);
  };

  /**
   * ### .includeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` is included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.includeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { b: 2 } ], 'include deep ordered members');
   *
   * @name includeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.includeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.includeDeepOrderedMembers, true)
      .to.include.deep.ordered.members(subset);
  };

  /**
   * ### .notIncludeDeepOrderedMembers(superset, subset, [message])
   *
   * Asserts that `subset` isn't included in `superset` in the same order
   * beginning with the first element in `superset`. Uses a deep equality
   * check.
   *
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { a: 1 }, { f: 5 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { a: 1 } ], 'not include deep ordered members');
   *     assert.notIncludeDeepOrderedMembers([ { a: 1 }, { b: 2 }, { c: 3 } ], [ { b: 2 }, { c: 3 } ], 'not include deep ordered members');
   *
   * @name notIncludeDeepOrderedMembers
   * @param {Array} superset
   * @param {Array} subset
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.notIncludeDeepOrderedMembers = function (superset, subset, msg) {
    new Assertion(superset, msg, assert.notIncludeDeepOrderedMembers, true)
      .to.not.include.deep.ordered.members(subset);
  };

  /**
   * ### .oneOf(inList, list, [message])
   *
   * Asserts that non-object, non-array value `inList` appears in the flat array `list`.
   *
   *     assert.oneOf(1, [ 2, 1 ], 'Not found in list');
   *
   * @name oneOf
   * @param {*} inList
   * @param {Array<*>} list
   * @param {String} message
   * @namespace Assert
   * @api public
   */

  assert.oneOf = function (inList, list, msg) {
    new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
  };

  /**
   * ### .changes(function, object, property, [message])
   *
   * Asserts that a function changes the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 22 };
   *     assert.changes(fn, obj, 'val');
   *
   * @name changes
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changes = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changes, true).to.change(obj, prop);
  };

   /**
   * ### .changesBy(function, object, property, delta, [message])
   *
   * Asserts that a function changes the value of a property by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 2 };
   *     assert.changesBy(fn, obj, 'val', 2);
   *
   * @name changesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesBy, true)
      .to.change(obj, prop).by(delta);
  };

   /**
   * ### .doesNotChange(function, object, property, [message])
   *
   * Asserts that a function does not change the value of a property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { console.log('foo'); };
   *     assert.doesNotChange(fn, obj, 'val');
   *
   * @name doesNotChange
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotChange = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotChange, true)
      .to.not.change(obj, prop);
  };

  /**
   * ### .changesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not change the value of a property or of a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.changesButNotBy(fn, obj, 'val', 5);
   *
   * @name changesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.changesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.changesButNotBy, true)
      .to.change(obj, prop).but.not.by(delta);
  };

  /**
   * ### .increases(function, object, property, [message])
   *
   * Asserts that a function increases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 13 };
   *     assert.increases(fn, obj, 'val');
   *
   * @name increases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.increases, true)
      .to.increase(obj, prop);
  };

  /**
   * ### .increasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function increases a numeric object property or a function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val += 10 };
   *     assert.increasesBy(fn, obj, 'val', 10);
   *
   * @name increasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesBy, true)
      .to.increase(obj, prop).by(delta);
  };

  /**
   * ### .doesNotIncrease(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 8 };
   *     assert.doesNotIncrease(fn, obj, 'val');
   *
   * @name doesNotIncrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotIncrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotIncrease, true)
      .to.not.increase(obj, prop);
  };

  /**
   * ### .increasesButNotBy(function, object, property, [message])
   *
   * Asserts that a function does not increase a numeric object property or function's return value by an amount (delta).
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.increasesButNotBy(fn, obj, 'val', 10);
   *
   * @name increasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.increasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.increasesButNotBy, true)
      .to.increase(obj, prop).but.not.by(delta);
  };

  /**
   * ### .decreases(function, object, property, [message])
   *
   * Asserts that a function decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreases(fn, obj, 'val');
   *
   * @name decreases
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreases = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.decreases, true)
      .to.decrease(obj, prop);
  };

  /**
   * ### .decreasesBy(function, object, property, delta, [message])
   *
   * Asserts that a function decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val -= 5 };
   *     assert.decreasesBy(fn, obj, 'val', 5);
   *
   * @name decreasesBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesBy, true)
      .to.decrease(obj, prop).by(delta);
  };

  /**
   * ### .doesNotDecrease(function, object, property, [message])
   *
   * Asserts that a function does not decreases a numeric object property.
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 15 };
   *     assert.doesNotDecrease(fn, obj, 'val');
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecrease = function (fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === 'function') {
      msg = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecrease, true)
      .to.not.decrease(obj, prop);
  };

  /**
   * ### .doesNotDecreaseBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.doesNotDecreaseBy(fn, obj, 'val', 1);
   *
   * @name doesNotDecrease
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.doesNotDecreaseBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    return new Assertion(fn, msg, assert.doesNotDecreaseBy, true)
      .to.not.decrease(obj, prop).by(delta);
  };

  /**
   * ### .decreasesButNotBy(function, object, property, delta, [message])
   *
   * Asserts that a function does not decreases a numeric object property or a function's return value by an amount (delta)
   *
   *     var obj = { val: 10 };
   *     var fn = function() { obj.val = 5 };
   *     assert.decreasesButNotBy(fn, obj, 'val', 1);
   *
   * @name decreasesButNotBy
   * @param {Function} modifier function
   * @param {Object} object or getter function
   * @param {String} property name _optional_
   * @param {Number} change amount (delta)
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.decreasesButNotBy = function (fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === 'function') {
      var tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }

    new Assertion(fn, msg, assert.decreasesButNotBy, true)
      .to.decrease(obj, prop).but.not.by(delta);
  };

  /*!
   * ### .ifError(object)
   *
   * Asserts if value is not a false value, and throws if it is a true value.
   * This is added to allow for chai to be a drop-in replacement for Node's
   * assert class.
   *
   *     var err = new Error('I am a custom error');
   *     assert.ifError(err); // Rethrows err!
   *
   * @name ifError
   * @param {Object} object
   * @namespace Assert
   * @api public
   */

  assert.ifError = function (val) {
    if (val) {
      throw(val);
    }
  };

  /**
   * ### .isExtensible(object)
   *
   * Asserts that `object` is extensible (can have new properties added to it).
   *
   *     assert.isExtensible({});
   *
   * @name isExtensible
   * @alias extensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
  };

  /**
   * ### .isNotExtensible(object)
   *
   * Asserts that `object` is _not_ extensible.
   *
   *     var nonExtensibleObject = Object.preventExtensions({});
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.freeze({});
   *
   *     assert.isNotExtensible(nonExtensibleObject);
   *     assert.isNotExtensible(sealedObject);
   *     assert.isNotExtensible(frozenObject);
   *
   * @name isNotExtensible
   * @alias notExtensible
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotExtensible = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
  };

  /**
   * ### .isSealed(object)
   *
   * Asserts that `object` is sealed (cannot have new properties added to it
   * and its existing properties cannot be removed).
   *
   *     var sealedObject = Object.seal({});
   *     var frozenObject = Object.seal({});
   *
   *     assert.isSealed(sealedObject);
   *     assert.isSealed(frozenObject);
   *
   * @name isSealed
   * @alias sealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
  };

  /**
   * ### .isNotSealed(object)
   *
   * Asserts that `object` is _not_ sealed.
   *
   *     assert.isNotSealed({});
   *
   * @name isNotSealed
   * @alias notSealed
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotSealed = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
  };

  /**
   * ### .isFrozen(object)
   *
   * Asserts that `object` is frozen (cannot have new properties added to it
   * and its existing properties cannot be modified).
   *
   *     var frozenObject = Object.freeze({});
   *     assert.frozen(frozenObject);
   *
   * @name isFrozen
   * @alias frozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
  };

  /**
   * ### .isNotFrozen(object)
   *
   * Asserts that `object` is _not_ frozen.
   *
   *     assert.isNotFrozen({});
   *
   * @name isNotFrozen
   * @alias notFrozen
   * @param {Object} object
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotFrozen = function (obj, msg) {
    new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
  };

  /**
   * ### .isEmpty(target)
   *
   * Asserts that the target does not contain any values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isEmpty([]);
   *     assert.isEmpty('');
   *     assert.isEmpty(new Map);
   *     assert.isEmpty({});
   *
   * @name isEmpty
   * @alias empty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
  };

  /**
   * ### .isNotEmpty(target)
   *
   * Asserts that the target contains values.
   * For arrays and strings, it checks the `length` property.
   * For `Map` and `Set` instances, it checks the `size` property.
   * For non-function objects, it gets the count of own
   * enumerable string keys.
   *
   *     assert.isNotEmpty([1, 2]);
   *     assert.isNotEmpty('34');
   *     assert.isNotEmpty(new Set([5, 6]));
   *     assert.isNotEmpty({ key: 7 });
   *
   * @name isNotEmpty
   * @alias notEmpty
   * @param {Object|Array|String|Map|Set} target
   * @param {String} message _optional_
   * @namespace Assert
   * @api public
   */

  assert.isNotEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
  };

  /*!
   * Aliases.
   */

  (function alias(name, as){
    assert[as] = assert[name];
    return alias;
  })
  ('isOk', 'ok')
  ('isNotOk', 'notOk')
  ('throws', 'throw')
  ('throws', 'Throw')
  ('isExtensible', 'extensible')
  ('isNotExtensible', 'notExtensible')
  ('isSealed', 'sealed')
  ('isNotSealed', 'notSealed')
  ('isFrozen', 'frozen')
  ('isNotFrozen', 'notFrozen')
  ('isEmpty', 'empty')
  ('isNotEmpty', 'notEmpty');
};

var chai = createCommonjsModule(function (module, exports) {
/*!
 * chai
 * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

var used = [];

/*!
 * Chai version
 */

exports.version = '4.1.2';

/*!
 * Assertion Error
 */

exports.AssertionError = assertionError;

/*!
 * Utils for plugins (not exported)
 */



/**
 * # .use(function)
 *
 * Provides a way to extend the internals of Chai.
 *
 * @param {Function}
 * @returns {this} for chaining
 * @api public
 */

exports.use = function (fn) {
  if (!~used.indexOf(fn)) {
    fn(exports, utils);
    used.push(fn);
  }

  return exports;
};

/*!
 * Utility Functions
 */

exports.util = utils;

/*!
 * Configuration
 */


exports.config = config;

/*!
 * Primary `Assertion` prototype
 */


exports.use(assertion);

/*!
 * Core Assertions
 */


exports.use(assertions);

/*!
 * Expect interface
 */


exports.use(expect);

/*!
 * Should interface
 */


exports.use(should);

/*!
 * Assert interface
 */


exports.use(assert);
});

var chai_1 = chai.version;
var chai_2 = chai.AssertionError;
var chai_3 = chai.use;
var chai_4 = chai.util;
var chai_5 = chai.config;

var chai$2 = chai;

/*
 * mocha's bdd syntax is inspired in RSpec
 *   please read: http://betterspecs.org/
 */
var expect$3 = chai$2.expect;

describe('jsondiffpatch', function () {
  before(function () {});
  it('has a diff method', function () {
    expect$3(diff).to.be.a('function');
  });
});

var DiffPatcher$1 = DiffPatcher;

var isArray$1$1 = typeof Array.isArray === 'function' ? Array.isArray : function (a) {
  return (typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object' && a instanceof Array;
};

var valueDescription = function valueDescription(value) {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return value.toString();
  }
  if (value instanceof Date) {
    return 'Date';
  }
  if (value instanceof RegExp) {
    return 'RegExp';
  }
  if (isArray$1$1(value)) {
    return 'array';
  }
  if (typeof value === 'string') {
    if (value.length >= 60) {
      return 'large text';
    }
  }
  return typeof value === 'undefined' ? 'undefined' : _typeof(value);
};

// Object.keys polyfill
var objectKeys = typeof Object.keys === 'function' ? function (obj) {
  return Object.keys(obj);
} : function (obj) {
  var keys = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(key);
    }
  }
  return keys;
};

// Array.prototype.forEach polyfill
var arrayForEach = typeof Array.prototype.forEach === 'function' ? function (array, fn) {
  return array.forEach(fn);
} : function (array, fn) {
  for (var index$$1 = 0, length = array.length; index$$1 < length; index$$1++) {
    fn(array[index$$1], index$$1, array);
  }
};

describe('DiffPatcher', function () {
  arrayForEach(objectKeys(examples), function (groupName) {
    var group = examples[groupName];
    describe(groupName, function () {
      arrayForEach(group, function (example) {
        if (!example) {
          return;
        }
        var name = example.name || valueDescription(example.left) + ' -> ' + valueDescription(example.right);
        describe(name, function () {
          before(function () {
            this.instance = new DiffPatcher$1(example.options);
          });
          if (example.error) {
            it('diff should fail with: ' + example.error, function () {
              var instance = this.instance;
              expect$3(function () {
                instance.diff(example.left, example.right);
              }).to.throw(example.error);
            });
            return;
          }
          it('can diff', function () {
            var delta = this.instance.diff(example.left, example.right);
            expect$3(delta).to.deep.equal(example.delta);
          });
          it('can diff backwards', function () {
            var reverse$$1 = this.instance.diff(example.right, example.left);
            expect$3(reverse$$1).to.deep.equal(example.reverse);
          });
          if (!example.noPatch) {
            it('can patch', function () {
              var right = this.instance.patch(clone$1(example.left), example.delta);
              expect$3(right).to.deep.equal(example.right);
            });
            it('can reverse delta', function () {
              var reverse$$1 = this.instance.reverse(example.delta);
              if (example.exactReverse !== false) {
                expect$3(reverse$$1).to.deep.equal(example.reverse);
              } else {
                // reversed delta and the swapped-diff delta are
                // not always equal, to verify they're equivalent,
                // patch and compare the results
                expect$3(this.instance.patch(clone$1(example.right), reverse$$1)).to.deep.equal(example.left);
                reverse$$1 = this.instance.diff(example.right, example.left);
                expect$3(this.instance.patch(clone$1(example.right), reverse$$1)).to.deep.equal(example.left);
              }
            });
            it('can unpatch', function () {
              var left = this.instance.unpatch(clone$1(example.right), example.delta);
              expect$3(left).to.deep.equal(example.left);
            });
          }
        });
      });
    });
  });

  describe('.clone', function () {
    it('clones complex objects', function () {
      var obj = {
        name: 'a string',
        nested: {
          attributes: [{ name: 'one', value: 345, since: new Date(1934, 1, 1) }],
          another: 'property',
          enabled: true,
          nested2: {
            name: 'another string'
          }
        }
      };
      var cloned = clone$1(obj);
      expect$3(cloned).to.deep.equal(obj);
    });
    it('clones RegExp', function () {
      var obj = {
        pattern: /expr/gim
      };
      var cloned = clone$1(obj);
      expect$3(cloned).to.deep.equal({
        pattern: /expr/gim
      });
    });
  });

  describe('using cloneDiffValues', function () {
    before(function () {
      this.instance = new DiffPatcher$1({
        cloneDiffValues: true
      });
    });
    it("ensures deltas don't reference original objects", function () {
      var left = {
        oldProp: {
          value: 3
        }
      };
      var right = {
        newProp: {
          value: 5
        }
      };
      var delta = this.instance.diff(left, right);
      left.oldProp.value = 1;
      right.newProp.value = 8;
      expect$3(delta).to.deep.equal({
        oldProp: [{ value: 3 }, 0, 0],
        newProp: [{ value: 5 }]
      });
    });
  });

  describe('static shortcuts', function () {
    it('diff', function () {
      var delta = diff(4, 5);
      expect$3(delta).to.deep.equal([4, 5]);
    });
    it('patch', function () {
      var right = patch(4, [4, 5]);
      expect$3(right).to.eql(5);
    });
    it('unpatch', function () {
      var left = unpatch(5, [4, 5]);
      expect$3(left).to.eql(4);
    });
    it('reverse', function () {
      var reverseDelta = reverse([4, 5]);
      expect$3(reverseDelta).to.deep.equal([5, 4]);
    });
  });

  describe('plugins', function () {
    before(function () {
      this.instance = new DiffPatcher$1();
    });

    describe('getting pipe filter list', function () {
      it('returns builtin filters', function () {
        expect$3(this.instance.processor.pipes.diff.list()).to.deep.equal(['collectChildren', 'trivial', 'dates', 'texts', 'objects', 'arrays']);
      });
    });

    describe('supporting numeric deltas', function () {
      var NUMERIC_DIFFERENCE = -8;

      it('diff', function () {
        // a constant to identify the custom delta type
        function numericDiffFilter(context) {
          if (typeof context.left === 'number' && typeof context.right === 'number') {
            // store number delta, eg. useful for distributed counters
            context.setResult([0, context.right - context.left, NUMERIC_DIFFERENCE]).exit();
          }
        }
        // a filterName is useful if I want to allow other filters to
        // be inserted before/after this one
        numericDiffFilter.filterName = 'numeric';

        // insert new filter, right before trivial one
        this.instance.processor.pipes.diff.before('trivial', numericDiffFilter);

        var delta = this.instance.diff({ population: 400 }, { population: 403 });
        expect$3(delta).to.deep.equal({ population: [0, 3, NUMERIC_DIFFERENCE] });
      });

      it('patch', function () {
        function numericPatchFilter(context) {
          if (context.delta && Array.isArray(context.delta) && context.delta[2] === NUMERIC_DIFFERENCE) {
            context.setResult(context.left + context.delta[1]).exit();
          }
        }
        numericPatchFilter.filterName = 'numeric';
        this.instance.processor.pipes.patch.before('trivial', numericPatchFilter);

        var delta = { population: [0, 3, NUMERIC_DIFFERENCE] };
        var right = this.instance.patch({ population: 600 }, delta);
        expect$3(right).to.deep.equal({ population: 603 });
      });

      it('unpatch', function () {
        function numericReverseFilter(context) {
          if (context.nested) {
            return;
          }
          if (context.delta && Array.isArray(context.delta) && context.delta[2] === NUMERIC_DIFFERENCE) {
            context.setResult([0, -context.delta[1], NUMERIC_DIFFERENCE]).exit();
          }
        }
        numericReverseFilter.filterName = 'numeric';
        this.instance.processor.pipes.reverse.after('trivial', numericReverseFilter);

        var delta = { population: [0, 3, NUMERIC_DIFFERENCE] };
        var reverseDelta = this.instance.reverse(delta);
        expect$3(reverseDelta).to.deep.equal({
          population: [0, -3, NUMERIC_DIFFERENCE]
        });
        var right = { population: 703 };
        this.instance.unpatch(right, delta);
        expect$3(right).to.deep.equal({ population: 700 });
      });
    });

    describe('removing and replacing pipe filters', function () {
      it('removes specified filter', function () {
        expect$3(this.instance.processor.pipes.diff.list()).to.deep.equal(['collectChildren', 'numeric', 'trivial', 'dates', 'texts', 'objects', 'arrays']);
        this.instance.processor.pipes.diff.remove('dates');
        expect$3(this.instance.processor.pipes.diff.list()).to.deep.equal(['collectChildren', 'numeric', 'trivial', 'texts', 'objects', 'arrays']);
      });

      it('replaces specified filter', function () {
        function fooFilter(context) {
          context.setResult(['foo']).exit();
        }
        fooFilter.filterName = 'foo';
        expect$3(this.instance.processor.pipes.diff.list()).to.deep.equal(['collectChildren', 'numeric', 'trivial', 'texts', 'objects', 'arrays']);
        this.instance.processor.pipes.diff.replace('trivial', fooFilter);
        expect$3(this.instance.processor.pipes.diff.list()).to.deep.equal(['collectChildren', 'numeric', 'foo', 'texts', 'objects', 'arrays']);
      });
    });
  });

  describe('formatters', function () {
    describe('jsonpatch', function () {
      var instance = void 0;
      var formatter = void 0;

      before(function () {
        instance = new DiffPatcher$1();
        formatter = index.jsonpatch;
      });

      var expectFormat = function expectFormat(before, after, expected) {
        var diff$$1 = instance.diff(before, after);
        var format = formatter.format(diff$$1);
        expect$3(format).to.be.eql(expected);
      };

      var removeOp = function removeOp(path) {
        return {
          op: 'remove',
          path: path
        };
      };

      var moveOp = function moveOp(from, path) {
        return {
          op: 'move',
          from: from,
          path: path
        };
      };

      var addOp = function addOp(path, value) {
        return {
          op: 'add',
          path: path,
          value: value
        };
      };

      var replaceOp = function replaceOp(path, value) {
        return {
          op: 'replace',
          path: path,
          value: value
        };
      };

      it('should return empty format for empty diff', function () {
        expectFormat([], [], []);
      });

      it('should format an add operation for array insertion', function () {
        expectFormat([1, 2, 3], [1, 2, 3, 4], [addOp('/3', 4)]);
      });

      it('should format an add operation for object insertion', function () {
        expectFormat({ a: 'a', b: 'b' }, { a: 'a', b: 'b', c: 'c' }, [addOp('/c', 'c')]);
      });

      it('should format for deletion of array', function () {
        expectFormat([1, 2, 3, 4], [1, 2, 3], [removeOp('/3')]);
      });

      it('should format for deletion of object', function () {
        expectFormat({ a: 'a', b: 'b', c: 'c' }, { a: 'a', b: 'b' }, [removeOp('/c')]);
      });

      it('should format for replace of object', function () {
        expectFormat({ a: 'a', b: 'b' }, { a: 'a', b: 'c' }, [replaceOp('/b', 'c')]);
      });

      it('should put add/remove for array with primitive items', function () {
        expectFormat([1, 2, 3], [1, 2, 4], [removeOp('/2'), addOp('/2', 4)]);
      });

      it('should sort remove by desc order', function () {
        expectFormat([1, 2, 3], [1], [removeOp('/2'), removeOp('/1')]);
      });

      describe('patcher with comparator', function () {
        before(function () {
          instance = new DiffPatcher$1({
            objectHash: function objectHash(obj) {
              if (obj && obj.id) {
                return obj.id;
              }
            }
          });
        });

        var anObjectWithId = function anObjectWithId(id) {
          return {
            id: id
          };
        };

        it('should remove higher level first', function () {
          var before = [anObjectWithId('removed'), {
            id: 'remaining_outer',
            items: [anObjectWithId('removed_inner'), anObjectWithId('remaining_inner')]
          }];
          var after = [{
            id: 'remaining_outer',
            items: [anObjectWithId('remaining_inner')]
          }];
          var expectedDiff = [removeOp('/0'), removeOp('/0/items/0')];
          expectFormat(before, after, expectedDiff);
        });

        it('should annotate move', function () {
          var before = [anObjectWithId('first'), anObjectWithId('second')];
          var after = [anObjectWithId('second'), anObjectWithId('first')];
          var expectedDiff = [moveOp('/1', '/0')];
          expectFormat(before, after, expectedDiff);
        });

        it('should sort the ops', function () {
          expectFormat({ 'hl': [{ id: 1, bla: 'bla' }, { id: 2, bla: 'ga' }] }, { 'hl': [{ id: 2, bla: 'bla' }, { id: 1, bla: 'ga' }] }, [moveOp('/hl/1', '/hl/0'), replaceOp('/hl/0/bla', 'bla'), replaceOp('/hl/1/bla', 'ga')]);
        });
      });

      it('should annotate as moved op', function () {
        expectFormat([1, 2], [2, 1], [moveOp('/1', '/0')]);
      });

      it('should add full path for moved op', function () {
        expectFormat({ 'hl': [1, 2] }, { 'hl': [2, 1] }, [moveOp('/hl/1', '/hl/0')]);
      });

      it('should put the full path in move op and sort by HL - #230', function () {
        var before = {
          'middleName': 'z',
          'referenceNumbers': [{
            'id': 'id-3',
            'referenceNumber': '123',
            'index': 'index-0'
          }, {
            'id': 'id-1',
            'referenceNumber': '456',
            'index': 'index-1'
          }, {
            'id': 'id-2',
            'referenceNumber': '789',
            'index': 'index-2'
          }]
        };
        var after = {
          'middleName': 'x',
          'referenceNumbers': [{
            'id': 'id-1',
            'referenceNumber': '456',
            'index': 'index-0'
          }, {
            'id': 'id-3',
            'referenceNumber': '123',
            'index': 'index-1'
          }, {
            'id': 'id-2',
            'referenceNumber': '789',
            'index': 'index-2'
          }]
        };
        var diff$$1 = [{
          'op': 'move',
          'from': '/referenceNumbers/1',
          'path': '/referenceNumbers/0'
        }, {
          'op': 'replace',
          'path': '/middleName',
          'value': 'x'
        }, {
          'op': 'replace',
          'path': '/referenceNumbers/0/index',
          'value': 'index-0'
        }, {
          'op': 'replace',
          'path': '/referenceNumbers/1/index',
          'value': 'index-1'
        }];
        instance = new DiffPatcher$1({
          objectHash: function objectHash(obj) {
            return obj.id;
          }
        });
        expectFormat(before, after, diff$$1);
      });
    });

    describe('html', function () {
      var instance = void 0;
      var formatter = void 0;

      before(function () {
        instance = new DiffPatcher$1({ textDiff: { minLength: 10 } });
        formatter = index.html;
      });

      var expectFormat = function expectFormat(before, after, expected) {
        var diff$$1 = instance.diff(before, after);
        var format = formatter.format(diff$$1);
        expect$3(format).to.be.eql(expected);
      };

      var expectedHtml = function expectedHtml(expectedDiff) {
        var html = [];
        arrayForEach(expectedDiff, function (diff$$1) {
          html.push('<li>');
          html.push('<div class="jsondiffpatch-textdiff-location">');
          html.push('<span class="jsondiffpatch-textdiff-line-number">' + diff$$1.start + '</span>');
          html.push('<span class="jsondiffpatch-textdiff-char">' + diff$$1.length + '</span>');
          html.push('</div>');
          html.push('<div class="jsondiffpatch-textdiff-line">');

          arrayForEach(diff$$1.data, function (data) {
            html.push('<span class="jsondiffpatch-textdiff-' + data.type + '">' + data.text + '</span>');
          });

          html.push('</div>');
          html.push('</li>');
        });
        return '<div class="jsondiffpatch-delta jsondiffpatch-textdiff">' + '<div class="jsondiffpatch-value">' + '<ul class="jsondiffpatch-textdiff">' + (html.join('') + '</ul></div></div>');
      };

      it('should format Chinese', function () {
        var before = '喵星人最可爱最可爱最可爱喵星人最可爱最可爱最可爱';
        var after = '汪星人最可爱最可爱最可爱喵星人meow最可爱最可爱最可爱';
        var expectedDiff = [{
          start: 1,
          length: 17,
          data: [{
            type: 'deleted',
            text: '喵'
          }, {
            type: 'added',
            text: '汪'
          }, {
            type: 'context',
            text: '星人最可爱最可爱最可爱喵星人最可'
          }]
        }, {
          start: 8,
          length: 16,
          data: [{
            type: 'context',
            text: '可爱最可爱喵星人'
          }, {
            type: 'added',
            text: 'meow'
          }, {
            type: 'context',
            text: '最可爱最可爱最可'
          }]
        }];
        expectFormat(before, after, expectedHtml(expectedDiff));
      });

      it('should format Japanese', function () {
        var before = '猫が可愛いです猫が可愛いです';
        var after = '猫がmeow可愛いですいぬ可愛いです';
        var expectedDiff = [{
          start: 1,
          length: 13,
          data: [{
            type: 'context',
            text: '猫が'
          }, {
            type: 'added',
            text: 'meow'
          }, {
            type: 'context',
            text: '可愛いです'
          }, {
            type: 'deleted',
            text: '猫が'
          }, {
            type: 'added',
            text: 'いぬ'
          }, {
            type: 'context',
            text: '可愛いで'
          }]
        }];
        expectFormat(before, after, expectedHtml(expectedDiff));
      });
    });
  });
});

})));
//# sourceMappingURL=jsondiffpatch.umd.test.js.map
