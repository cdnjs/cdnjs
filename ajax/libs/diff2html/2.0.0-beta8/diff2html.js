/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 *
	 * Diff to HTML (diff2html.js)
	 * Author: rtfpessoa
	 *
	 */

	(function() {

	  var diffParser = __webpack_require__(1).DiffParser;
	  var fileLister = __webpack_require__(3).FileListPrinter;
	  var htmlPrinter = __webpack_require__(21).HtmlPrinter;

	  function Diff2Html() {
	  }

	  /*
	   * Line diff type configuration
	   var config = {
	   'wordByWord': true, // (default)
	   // OR
	   'charByChar': true
	   };
	   */

	  /*
	   * Generates json object from string diff input
	   */
	  Diff2Html.prototype.getJsonFromDiff = function(diffInput, config) {
	    var configOrEmpty = config || {};
	    return diffParser.generateDiffJson(diffInput, configOrEmpty);
	  };

	  /*
	   * Generates the html diff. The config parameter configures the output/input formats and other options
	   */
	  Diff2Html.prototype.getPrettyHtml = function(diffInput, config) {
	    var configOrEmpty = config || {};

	    var diffJson = diffInput;
	    if (!configOrEmpty.inputFormat || configOrEmpty.inputFormat === 'diff') {
	      diffJson = diffParser.generateDiffJson(diffInput, configOrEmpty);
	    }

	    var fileList = '';
	    if (configOrEmpty.showFiles === true) {
	      fileList = fileLister.generateFileList(diffJson, configOrEmpty);
	    }

	    var diffOutput = '';
	    if (configOrEmpty.outputFormat === 'side-by-side') {
	      diffOutput = htmlPrinter.generateSideBySideJsonHtml(diffJson, configOrEmpty);
	    } else {
	      diffOutput = htmlPrinter.generateLineByLineJsonHtml(diffJson, configOrEmpty);
	    }

	    return fileList + diffOutput;
	  };


	  /*
	   * Deprecated methods - The following methods exist only to maintain compatibility with previous versions
	   */

	  /*
	   * Generates pretty html from string diff input
	   */
	  Diff2Html.prototype.getPrettyHtmlFromDiff = function(diffInput, config) {
	    var configOrEmpty = config || {};
	    configOrEmpty.inputFormat = 'diff';
	    configOrEmpty.outputFormat = 'line-by-line';
	    return this.getPrettyHtml(diffInput, configOrEmpty);
	  };

	  /*
	   * Generates pretty html from a json object
	   */
	  Diff2Html.prototype.getPrettyHtmlFromJson = function(diffJson, config) {
	    var configOrEmpty = config || {};
	    configOrEmpty.inputFormat = 'json';
	    configOrEmpty.outputFormat = 'line-by-line';
	    return this.getPrettyHtml(diffJson, configOrEmpty);
	  };

	  /*
	   * Generates pretty side by side html from string diff input
	   */
	  Diff2Html.prototype.getPrettySideBySideHtmlFromDiff = function(diffInput, config) {
	    var configOrEmpty = config || {};
	    configOrEmpty.inputFormat = 'diff';
	    configOrEmpty.outputFormat = 'side-by-side';
	    return this.getPrettyHtml(diffInput, configOrEmpty);
	  };

	  /*
	   * Generates pretty side by side html from a json object
	   */
	  Diff2Html.prototype.getPrettySideBySideHtmlFromJson = function(diffJson, config) {
	    var configOrEmpty = config || {};
	    configOrEmpty.inputFormat = 'json';
	    configOrEmpty.outputFormat = 'side-by-side';
	    return this.getPrettyHtml(diffJson, configOrEmpty);
	  };

	  var diffObject = new Diff2Html();
	  module.exports.Diff2Html = diffObject;

	  // Expose diff2html in the browser
	  global.Diff2Html = diffObject;

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * Diff Parser (diff-parser.js)
	 * Author: rtfpessoa
	 *
	 */

	(function() {

	  var utils = __webpack_require__(2).Utils;

	  var LINE_TYPE = {
	    INSERTS: 'd2h-ins',
	    DELETES: 'd2h-del',
	    INSERT_CHANGES: 'd2h-ins d2h-change',
	    DELETE_CHANGES: 'd2h-del d2h-change',
	    CONTEXT: 'd2h-cntx',
	    INFO: 'd2h-info'
	  };

	  function DiffParser() {
	  }

	  DiffParser.prototype.LINE_TYPE = LINE_TYPE;

	  DiffParser.prototype.generateDiffJson = function(diffInput, config) {
	    var files = [];
	    var currentFile = null;
	    var currentBlock = null;
	    var oldLine = null;
	    var newLine = null;

	    var saveBlock = function() {

	      /* Add previous block(if exists) before start a new file */
	      if (currentBlock) {
	        currentFile.blocks.push(currentBlock);
	        currentBlock = null;
	      }
	    };

	    var saveFile = function() {

	      /*
	       * Add previous file(if exists) before start a new one
	       * if it has name (to avoid binary files errors)
	       */
	      if (currentFile && currentFile.newName) {
	        files.push(currentFile);
	        currentFile = null;
	      }
	    };

	    var startFile = function() {
	      saveBlock();
	      saveFile();

	      /* Create file structure */
	      currentFile = {};
	      currentFile.blocks = [];
	      currentFile.deletedLines = 0;
	      currentFile.addedLines = 0;
	    };

	    var startBlock = function(line) {
	      saveBlock();

	      var values;

	      if (values = /^@@ -(\d+),\d+ \+(\d+),\d+ @@.*/.exec(line)) {
	        currentFile.isCombined = false;
	      } else if (values = /^@@@ -(\d+),\d+ -\d+,\d+ \+(\d+),\d+ @@@.*/.exec(line)) {
	        currentFile.isCombined = true;
	      } else {
	        values = [0, 0];
	        currentFile.isCombined = false;
	      }

	      oldLine = values[1];
	      newLine = values[2];

	      /* Create block metadata */
	      currentBlock = {};
	      currentBlock.lines = [];
	      currentBlock.oldStartLine = oldLine;
	      currentBlock.newStartLine = newLine;
	      currentBlock.header = line;
	    };

	    var createLine = function(line) {
	      var currentLine = {};
	      currentLine.content = line;

	      var newLinePrefixes = !currentFile.isCombined ? ['+'] : ['+', ' +'];
	      var delLinePrefixes = !currentFile.isCombined ? ['-'] : ['-', ' -'];

	      /* Fill the line data */
	      if (utils.startsWith(line, newLinePrefixes)) {
	        currentFile.addedLines++;

	        currentLine.type = LINE_TYPE.INSERTS;
	        currentLine.oldNumber = null;
	        currentLine.newNumber = newLine++;

	        currentBlock.lines.push(currentLine);

	      } else if (utils.startsWith(line, delLinePrefixes)) {
	        currentFile.deletedLines++;

	        currentLine.type = LINE_TYPE.DELETES;
	        currentLine.oldNumber = oldLine++;
	        currentLine.newNumber = null;

	        currentBlock.lines.push(currentLine);

	      } else {
	        currentLine.type = LINE_TYPE.CONTEXT;
	        currentLine.oldNumber = oldLine++;
	        currentLine.newNumber = newLine++;

	        currentBlock.lines.push(currentLine);
	      }
	    };

	    var diffLines =
	      diffInput.replace(/\\ No newline at end of file/g, '')
	        .replace(/\r\n?/g, '\n')
	        .split('\n');

	    /* Diff */
	    var oldMode = /^old mode (\d{6})/;
	    var newMode = /^new mode (\d{6})/;
	    var deletedFileMode = /^deleted file mode (\d{6})/;
	    var newFileMode = /^new file mode (\d{6})/;

	    var copyFrom = /^copy from "?(.+?)"?/;
	    var copyTo = /^copy to "?(.+?)"?/;

	    var renameFrom = /^rename from "?(.+?)"?/;
	    var renameTo = /^rename to "?(.+?)"?/;

	    var similarityIndex = /^similarity index (\d+)%/;
	    var dissimilarityIndex = /^dissimilarity index (\d+)%/;
	    var index = /^index ([0-9a-z]+)..([0-9a-z]+) (\d{6})?/;

	    /* Combined Diff */
	    var combinedIndex = /^index ([0-9a-z]+),([0-9a-z]+)..([0-9a-z]+)/;
	    var combinedMode = /^mode (\d{6}),(\d{6})..(\d{6})/;
	    var combinedNewFile = /^new file mode (\d{6})/;
	    var combinedDeletedFile = /^deleted file mode (\d{6}),(\d{6})/;

	    diffLines.forEach(function(line) {
	      // Unmerged paths, and possibly other non-diffable files
	      // https://github.com/scottgonzalez/pretty-diff/issues/11
	      // Also, remove some useless lines
	      if (!line || utils.startsWith(line, '*')) {
	        return;
	      }

	      var values = [];
	      if (utils.startsWith(line, 'diff')) {
	        startFile();
	      } else if (currentFile && !currentFile.oldName && (values = getSrcFilename(line, config))) {
	        currentFile.oldName = values;
	        currentFile.language = getExtension(currentFile.oldName, currentFile.language);
	      } else if (currentFile && !currentFile.newName && (values = getDstFilename(line, config))) {
	        currentFile.newName = values;
	        currentFile.language = getExtension(currentFile.newName, currentFile.language);
	      } else if (currentFile && utils.startsWith(line, '@@')) {
	        startBlock(line);
	      } else if ((values = oldMode.exec(line))) {
	        currentFile.oldMode = values[1];
	      } else if ((values = newMode.exec(line))) {
	        currentFile.newMode = values[1];
	      } else if ((values = deletedFileMode.exec(line))) {
	        currentFile.deletedFileMode = values[1];
	      } else if ((values = newFileMode.exec(line))) {
	        currentFile.newFileMode = values[1];
	      } else if ((values = copyFrom.exec(line))) {
	        currentFile.oldName = values[1];
	        currentFile.isCopy = true;
	      } else if ((values = copyTo.exec(line))) {
	        currentFile.newName = values[1];
	        currentFile.isCopy = true;
	      } else if ((values = renameFrom.exec(line))) {
	        currentFile.oldName = values[1];
	        currentFile.isRename = true;
	      } else if ((values = renameTo.exec(line))) {
	        currentFile.newName = values[1];
	        currentFile.isRename = true;
	      } else if ((values = similarityIndex.exec(line))) {
	        currentFile.unchangedPercentage = values[1];
	      } else if ((values = dissimilarityIndex.exec(line))) {
	        currentFile.changedPercentage = values[1];
	      } else if ((values = index.exec(line))) {
	        currentFile.checksumBefore = values[1];
	        currentFile.checksumAfter = values[2];
	        values[2] && (currentFile.mode = values[3]);
	      } else if ((values = combinedIndex.exec(line))) {
	        currentFile.checksumBefore = [values[2], values[3]];
	        currentFile.checksumAfter = values[1];
	      } else if ((values = combinedMode.exec(line))) {
	        currentFile.oldMode = [values[2], values[3]];
	        currentFile.newMode = values[1];
	      } else if ((values = combinedNewFile.exec(line))) {
	        currentFile.newFileMode = values[1];
	      } else if ((values = combinedDeletedFile.exec(line))) {
	        currentFile.deletedFileMode = values[1];
	      } else if (currentBlock) {
	        createLine(line);
	      }
	    });

	    saveBlock();
	    saveFile();

	    return files;
	  };

	  function getExtension(filename, language) {
	    var nameSplit = filename.split('.');
	    if (nameSplit.length > 1) {
	      return nameSplit[nameSplit.length - 1];
	    }

	    return language;
	  }

	  function getSrcFilename(line, cfg) {
	    var prefixes = ["a/", "i/", "w/", "c/", "o/"];

	    if (cfg.srcPrefix) prefixes.push(cfg.srcPrefix);

	    return _getFilename('---', line, prefixes);
	  }

	  function getDstFilename(line, cfg) {
	    var prefixes = ["b/", "i/", "w/", "c/", "o/"];

	    if (cfg.dstPrefix) prefixes.push(cfg.dstPrefix);

	    return _getFilename('\\+\\+\\+', line, prefixes);
	  }

	  function _getFilename(linePrefix, line, prefixes) {
	    var FilenameRegExp = new RegExp('^' + linePrefix + ' "?(.+?)"?$');

	    var filename;
	    var values = FilenameRegExp.exec(line);
	    if (values && values[1]) {
	      filename = values[1];
	      var matchingPrefixes = prefixes.filter(function(p) {
	        return filename.indexOf(p) === 0;
	      });

	      if (matchingPrefixes[0]) filename = filename.slice(matchingPrefixes[0].length); // remove prefix if exists
	    }

	    return filename;
	  }

	  module.exports.DiffParser = new DiffParser();

	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
	 *
	 * Utils (utils.js)
	 * Author: rtfpessoa
	 *
	 */

	(function() {

	  function Utils() {
	  }

	  Utils.prototype.convertWhiteSpaceToNonBreakingSpace = function(str) {
	    return str.slice(0).replace(/ /g, '&nbsp;');
	  };

	  Utils.prototype.escape = function(str) {
	    return str.slice(0)
	      .replace(/&/g, '&amp;')
	      .replace(/</g, '&lt;')
	      .replace(/>/g, '&gt;')
	      .replace(/\t/g, '    ');
	  };

	  Utils.prototype.startsWith = function(str, start) {
	    if (typeof start === 'object') {
	      var result = false;
	      start.forEach(function(s) {
	        if (str.indexOf(s) === 0) {
	          result = true;
	        }
	      });

	      return result;
	    }

	    return str.indexOf(start) === 0;
	  };

	  Utils.prototype.valueOrEmpty = function(value) {
	    return value ? value : '';
	  };

	  module.exports.Utils = new Utils();

	})();


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * FileListPrinter (file-list-printer.js)
	 * Author: nmatpt
	 *
	 */

	(function() {

	  var printerUtils = __webpack_require__(4).PrinterUtils;

	  function FileListPrinter() {
	  }

	  FileListPrinter.prototype.generateFileList = function(diffFiles) {
	    return '<div class="d2h-file-list-wrapper">\n' +
	      '     <div class="d2h-file-list-header">\n' +
	      '         <span class="d2h-file-list-title">Files changed (' + diffFiles.length + ')&nbsp&nbsp</span>\n' +
	      '         <a class="d2h-file-switch d2h-hide">hide</a>\n' +
	      '         <a class="d2h-file-switch d2h-show">show</a>\n' +
	      '     </div>\n' +
	      '     <table class="d2h-file-list">\n' +

	      diffFiles.map(function(file) {
	        return '     <tr class="d2h-file-list-line">\n' +
	          '       <td class="d2h-lines-added">\n' +
	          '         <span>+' + file.addedLines + '</span>\n' +
	          '       </td>\n' +
	          '       <td class="d2h-lines-deleted">\n' +
	          '         <span>-' + file.deletedLines + '</span>\n' +
	          '       </td>\n' +
	          '       <td class="d2h-file-name-wrapper">\n' +
	          '         <a href="#' + printerUtils.getHtmlId(file) + '" class="d2h-file-name">' +
	          '&nbsp;' + printerUtils.getDiffName(file) +
	          '         </a>\n' +
	          '       </td>\n' +
	          '     </tr>\n';
	      }).join('\n') +
	      '</table></div>\n';
	  };

	  module.exports.FileListPrinter = new FileListPrinter();

	})();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * PrinterUtils (printer-utils.js)
	 * Author: rtfpessoa
	 *
	 */

	(function() {

	  var jsDiff = __webpack_require__(5);
	  var utils = __webpack_require__(2).Utils;
	  var Rematch = __webpack_require__(20).Rematch;

	  function PrinterUtils() {
	  }

	  PrinterUtils.prototype.getHtmlId = function(file) {
	    var hashCode = function(text) {
	      var i, chr, len;
	      var hash = 0;

	      if (text.length === 0) {
	        return hash;
	      }

	      for (i = 0, len = text.length; i < len; i++) {
	        chr = text.charCodeAt(i);
	        hash = ((hash << 5) - hash) + chr;
	        hash |= 0; // Convert to 32bit integer
	      }

	      return hash;
	    };

	    return 'd2h-' + hashCode(this.getDiffName(file)).toString().slice(-6);
	  };

	  PrinterUtils.prototype.getDiffName = function(file) {
	    var oldFilename = file.oldName;
	    var newFilename = file.newName;

	    if (oldFilename && newFilename && oldFilename !== newFilename
	      && !isDevNullName(oldFilename) && !isDevNullName(newFilename)) {
	      return oldFilename + ' -> ' + newFilename;
	    } else if (newFilename && !isDevNullName(newFilename)) {
	      return newFilename;
	    } else if (oldFilename) {
	      return oldFilename;
	    }

	    return 'Unknown filename';
	  };

	  PrinterUtils.prototype.diffHighlight = function(diffLine1, diffLine2, config) {
	    var linePrefix1, linePrefix2, unprefixedLine1, unprefixedLine2;

	    var prefixSize = 1;

	    if (config.isCombined) {
	      prefixSize = 2;
	    }

	    linePrefix1 = diffLine1.substr(0, prefixSize);
	    linePrefix2 = diffLine2.substr(0, prefixSize);
	    unprefixedLine1 = diffLine1.substr(prefixSize);
	    unprefixedLine2 = diffLine2.substr(prefixSize);

	    var diff;
	    if (config.charByChar) {
	      diff = jsDiff.diffChars(unprefixedLine1, unprefixedLine2);
	    } else {
	      diff = jsDiff.diffWordsWithSpace(unprefixedLine1, unprefixedLine2);
	    }

	    var highlightedLine = '';

	    var changedWords = [];
	    if (!config.charByChar && config.matching === 'words') {
	      var treshold = 0.25;

	      if (typeof (config.matchWordsThreshold) !== 'undefined') {
	        treshold = config.matchWordsThreshold;
	      }

	      var matcher = Rematch.rematch(function(a, b) {
	        var amod = a.value;
	        var bmod = b.value;

	        return Rematch.distance(amod, bmod);
	      });

	      var removed = diff.filter(function isRemoved(element) {
	        return element.removed;
	      });

	      var added = diff.filter(function isAdded(element) {
	        return element.added;
	      });

	      var chunks = matcher(added, removed);
	      chunks.forEach(function(chunk) {
	        if (chunk[0].length === 1 && chunk[1].length === 1) {
	          var dist = Rematch.distance(chunk[0][0].value, chunk[1][0].value);
	          if (dist < treshold) {
	            changedWords.push(chunk[0][0]);
	            changedWords.push(chunk[1][0]);
	          }
	        }
	      });
	    }

	    diff.forEach(function(part) {
	      var addClass = changedWords.indexOf(part) > -1 ? ' class="d2h-change"' : '';
	      var elemType = part.added ? 'ins' : part.removed ? 'del' : null;
	      var escapedValue = utils.escape(part.value);

	      if (elemType !== null) {
	        highlightedLine += '<' + elemType + addClass + '>' + escapedValue + '</' + elemType + '>';
	      } else {
	        highlightedLine += escapedValue;
	      }
	    });

	    return {
	      first: {
	        prefix: linePrefix1,
	        line: removeIns(highlightedLine)
	      },
	      second: {
	        prefix: linePrefix2,
	        line: removeDel(highlightedLine)
	      }
	    };
	  };

	  function isDevNullName(name) {
	    return name.indexOf('dev/null') !== -1;
	  }

	  function removeIns(line) {
	    return line.replace(/(<ins[^>]*>((.|\n)*?)<\/ins>)/g, '');
	  }

	  function removeDel(line) {
	    return line.replace(/(<del[^>]*>((.|\n)*?)<\/del>)/g, '');
	  }

	  module.exports.PrinterUtils = new PrinterUtils();

	})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.canonicalize = exports.convertChangesToXML = exports.convertChangesToDMP = exports.parsePatch = exports.applyPatches = exports.applyPatch = exports.createPatch = exports.createTwoFilesPatch = exports.structuredPatch = exports.diffJson = exports.diffCss = exports.diffSentences = exports.diffTrimmedLines = exports.diffLines = exports.diffWordsWithSpace = exports.diffWords = exports.diffChars = exports.Diff = undefined;
	/*istanbul ignore end*/
	var /*istanbul ignore start*/_base = __webpack_require__(6) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/
	var /*istanbul ignore start*/_character = __webpack_require__(7) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_word = __webpack_require__(8) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_line = __webpack_require__(10) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_sentence = __webpack_require__(11) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_css = __webpack_require__(12) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_json = __webpack_require__(13) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_apply = __webpack_require__(14) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_parse = __webpack_require__(15) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_create = __webpack_require__(17) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_dmp = __webpack_require__(18) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_xml = __webpack_require__(19) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* See LICENSE file for terms of use */

	/*
	 * Text diff implementation.
	 *
	 * This library supports the following APIS:
	 * JsDiff.diffChars: Character by character diff
	 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
	 * JsDiff.diffLines: Line based diff
	 *
	 * JsDiff.diffCss: Diff targeted at CSS content
	 *
	 * These methods are based on the implementation proposed in
	 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
	 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
	 */
	exports. /*istanbul ignore end*/Diff = _base2.default;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffChars = _character.diffChars;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWords = _word.diffWords;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = _word.diffWordsWithSpace;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffLines = _line.diffLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = _line.diffTrimmedLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffSentences = _sentence.diffSentences;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffCss = _css.diffCss;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffJson = _json.diffJson;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/structuredPatch = _create.structuredPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = _create.createTwoFilesPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = _create.createPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatch = _apply.applyPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = _apply.applyPatches;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/parsePatch = _parse.parsePatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToDMP = _dmp.convertChangesToDMP;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/convertChangesToXML = _xml.convertChangesToXML;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = _json.canonicalize;
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQWdCQTs7Ozs7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FHRTt5REFFQTt5REFDQTt5REFDQTt5REFDQTt5REFDQTt5REFDQTt5REFFQTt5REFDQTt5REFFQTt5REFDQTt5REFDQTt5REFDQTt5REFDQTt5REFDQTt5REFDQTt5REFDQTt5REFDQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFNlZSBMSUNFTlNFIGZpbGUgZm9yIHRlcm1zIG9mIHVzZSAqL1xuXG4vKlxuICogVGV4dCBkaWZmIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIFRoaXMgbGlicmFyeSBzdXBwb3J0cyB0aGUgZm9sbG93aW5nIEFQSVM6XG4gKiBKc0RpZmYuZGlmZkNoYXJzOiBDaGFyYWN0ZXIgYnkgY2hhcmFjdGVyIGRpZmZcbiAqIEpzRGlmZi5kaWZmV29yZHM6IFdvcmQgKGFzIGRlZmluZWQgYnkgXFxiIHJlZ2V4KSBkaWZmIHdoaWNoIGlnbm9yZXMgd2hpdGVzcGFjZVxuICogSnNEaWZmLmRpZmZMaW5lczogTGluZSBiYXNlZCBkaWZmXG4gKlxuICogSnNEaWZmLmRpZmZDc3M6IERpZmYgdGFyZ2V0ZWQgYXQgQ1NTIGNvbnRlbnRcbiAqXG4gKiBUaGVzZSBtZXRob2RzIGFyZSBiYXNlZCBvbiB0aGUgaW1wbGVtZW50YXRpb24gcHJvcG9zZWQgaW5cbiAqIFwiQW4gTyhORCkgRGlmZmVyZW5jZSBBbGdvcml0aG0gYW5kIGl0cyBWYXJpYXRpb25zXCIgKE15ZXJzLCAxOTg2KS5cbiAqIGh0dHA6Ly9jaXRlc2VlcnguaXN0LnBzdS5lZHUvdmlld2RvYy9zdW1tYXJ5P2RvaT0xMC4xLjEuNC42OTI3XG4gKi9cbmltcG9ydCBEaWZmIGZyb20gJy4vZGlmZi9iYXNlJztcbmltcG9ydCB7ZGlmZkNoYXJzfSBmcm9tICcuL2RpZmYvY2hhcmFjdGVyJztcbmltcG9ydCB7ZGlmZldvcmRzLCBkaWZmV29yZHNXaXRoU3BhY2V9IGZyb20gJy4vZGlmZi93b3JkJztcbmltcG9ydCB7ZGlmZkxpbmVzLCBkaWZmVHJpbW1lZExpbmVzfSBmcm9tICcuL2RpZmYvbGluZSc7XG5pbXBvcnQge2RpZmZTZW50ZW5jZXN9IGZyb20gJy4vZGlmZi9zZW50ZW5jZSc7XG5cbmltcG9ydCB7ZGlmZkNzc30gZnJvbSAnLi9kaWZmL2Nzcyc7XG5pbXBvcnQge2RpZmZKc29uLCBjYW5vbmljYWxpemV9IGZyb20gJy4vZGlmZi9qc29uJztcblxuaW1wb3J0IHthcHBseVBhdGNoLCBhcHBseVBhdGNoZXN9IGZyb20gJy4vcGF0Y2gvYXBwbHknO1xuaW1wb3J0IHtwYXJzZVBhdGNofSBmcm9tICcuL3BhdGNoL3BhcnNlJztcbmltcG9ydCB7c3RydWN0dXJlZFBhdGNoLCBjcmVhdGVUd29GaWxlc1BhdGNoLCBjcmVhdGVQYXRjaH0gZnJvbSAnLi9wYXRjaC9jcmVhdGUnO1xuXG5pbXBvcnQge2NvbnZlcnRDaGFuZ2VzVG9ETVB9IGZyb20gJy4vY29udmVydC9kbXAnO1xuaW1wb3J0IHtjb252ZXJ0Q2hhbmdlc1RvWE1MfSBmcm9tICcuL2NvbnZlcnQveG1sJztcblxuZXhwb3J0IHtcbiAgRGlmZixcblxuICBkaWZmQ2hhcnMsXG4gIGRpZmZXb3JkcyxcbiAgZGlmZldvcmRzV2l0aFNwYWNlLFxuICBkaWZmTGluZXMsXG4gIGRpZmZUcmltbWVkTGluZXMsXG4gIGRpZmZTZW50ZW5jZXMsXG5cbiAgZGlmZkNzcyxcbiAgZGlmZkpzb24sXG5cbiAgc3RydWN0dXJlZFBhdGNoLFxuICBjcmVhdGVUd29GaWxlc1BhdGNoLFxuICBjcmVhdGVQYXRjaCxcbiAgYXBwbHlQYXRjaCxcbiAgYXBwbHlQYXRjaGVzLFxuICBwYXJzZVBhdGNoLFxuICBjb252ZXJ0Q2hhbmdlc1RvRE1QLFxuICBjb252ZXJ0Q2hhbmdlc1RvWE1MLFxuICBjYW5vbmljYWxpemVcbn07XG4iXX0=


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.default = /*istanbul ignore end*/Diff;
	function Diff() {}

	Diff.prototype = { /*istanbul ignore start*/
	  /*istanbul ignore end*/diff: function diff(oldString, newString) {
	    /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var callback = options.callback;
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    this.options = options;

	    var self = this;

	    function done(value) {
	      if (callback) {
	        setTimeout(function () {
	          callback(undefined, value);
	        }, 0);
	        return true;
	      } else {
	        return value;
	      }
	    }

	    // Allow subclasses to massage the input prior to running
	    oldString = this.castInput(oldString);
	    newString = this.castInput(newString);

	    oldString = this.removeEmpty(this.tokenize(oldString));
	    newString = this.removeEmpty(this.tokenize(newString));

	    var newLen = newString.length,
	        oldLen = oldString.length;
	    var editLength = 1;
	    var maxEditLength = newLen + oldLen;
	    var bestPath = [{ newPos: -1, components: [] }];

	    // Seed editLength = 0, i.e. the content starts with the same values
	    var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
	    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
	      // Identity per the equality and tokenizer
	      return done([{ value: newString.join(''), count: newString.length }]);
	    }

	    // Main worker method. checks all permutations of a given edit length for acceptance.
	    function execEditLength() {
	      for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
	        var basePath = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	        var addPath = bestPath[diagonalPath - 1],
	            removePath = bestPath[diagonalPath + 1],
	            _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
	        if (addPath) {
	          // No one else is going to attempt to use this value, clear it
	          bestPath[diagonalPath - 1] = undefined;
	        }

	        var canAdd = addPath && addPath.newPos + 1 < newLen,
	            canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;
	        if (!canAdd && !canRemove) {
	          // If this path is a terminal then prune
	          bestPath[diagonalPath] = undefined;
	          continue;
	        }

	        // Select the diagonal that we want to branch from. We select the prior
	        // path whose position in the new string is the farthest from the origin
	        // and does not pass the bounds of the diff graph
	        if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
	          basePath = clonePath(removePath);
	          self.pushComponent(basePath.components, undefined, true);
	        } else {
	          basePath = addPath; // No need to clone, we've pulled it from the list
	          basePath.newPos++;
	          self.pushComponent(basePath.components, true, undefined);
	        }

	        _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath);

	        // If we have hit the end of both strings, then we are done
	        if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
	          return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
	        } else {
	          // Otherwise track this path as a potential candidate and continue.
	          bestPath[diagonalPath] = basePath;
	        }
	      }

	      editLength++;
	    }

	    // Performs the length of edit iteration. Is a bit fugly as this has to support the
	    // sync and async mode which is never fun. Loops over execEditLength until a value
	    // is produced.
	    if (callback) {
	      (function exec() {
	        setTimeout(function () {
	          // This should not happen, but we want to be safe.
	          /* istanbul ignore next */
	          if (editLength > maxEditLength) {
	            return callback();
	          }

	          if (!execEditLength()) {
	            exec();
	          }
	        }, 0);
	      })();
	    } else {
	      while (editLength <= maxEditLength) {
	        var ret = execEditLength();
	        if (ret) {
	          return ret;
	        }
	      }
	    }
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/pushComponent: function pushComponent(components, added, removed) {
	    var last = components[components.length - 1];
	    if (last && last.added === added && last.removed === removed) {
	      // We need to clone here as the component clone operation is just
	      // as shallow array clone
	      components[components.length - 1] = { count: last.count + 1, added: added, removed: removed };
	    } else {
	      components.push({ count: 1, added: added, removed: removed });
	    }
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
	    var newLen = newString.length,
	        oldLen = oldString.length,
	        newPos = basePath.newPos,
	        oldPos = newPos - diagonalPath,
	        commonCount = 0;
	    while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
	      newPos++;
	      oldPos++;
	      commonCount++;
	    }

	    if (commonCount) {
	      basePath.components.push({ count: commonCount });
	    }

	    basePath.newPos = newPos;
	    return oldPos;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/equals: function equals(left, right) {
	    return left === right;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/removeEmpty: function removeEmpty(array) {
	    var ret = [];
	    for (var i = 0; i < array.length; i++) {
	      if (array[i]) {
	        ret.push(array[i]);
	      }
	    }
	    return ret;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/castInput: function castInput(value) {
	    return value;
	  },
	  /*istanbul ignore start*/ /*istanbul ignore end*/tokenize: function tokenize(value) {
	    return value.split('');
	  }
	};

	function buildValues(diff, components, newString, oldString, useLongestToken) {
	  var componentPos = 0,
	      componentLen = components.length,
	      newPos = 0,
	      oldPos = 0;

	  for (; componentPos < componentLen; componentPos++) {
	    var component = components[componentPos];
	    if (!component.removed) {
	      if (!component.added && useLongestToken) {
	        var value = newString.slice(newPos, newPos + component.count);
	        value = value.map(function (value, i) {
	          var oldValue = oldString[oldPos + i];
	          return oldValue.length > value.length ? oldValue : value;
	        });

	        component.value = value.join('');
	      } else {
	        component.value = newString.slice(newPos, newPos + component.count).join('');
	      }
	      newPos += component.count;

	      // Common case
	      if (!component.added) {
	        oldPos += component.count;
	      }
	    } else {
	      component.value = oldString.slice(oldPos, oldPos + component.count).join('');
	      oldPos += component.count;

	      // Reverse add and remove so removes are output first to match common convention
	      // The diffing algorithm is tied to add then remove output and this is the simplest
	      // route to get the desired output with minimal overhead.
	      if (componentPos && components[componentPos - 1].added) {
	        var tmp = components[componentPos - 1];
	        components[componentPos - 1] = components[componentPos];
	        components[componentPos] = tmp;
	      }
	    }
	  }

	  // Special case handle for when one terminal is ignored. For this case we merge the
	  // terminal into the prior string and drop the change.
	  var lastComponent = components[componentLen - 1];
	  if (componentLen > 1 && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
	    components[componentLen - 2].value += lastComponent.value;
	    components.pop();
	  }

	  return components;
	}

	function clonePath(path) {
	  return { newPos: path.newPos, components: path.components.slice(0) };
	}
	//# sourceMappingURL=data:application/json;base64,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R0FGN0M7O0FBT0EsU0FBTyxVQUFQLENBbkQ0RTtDQUE5RTs7QUFzREEsU0FBUyxTQUFULENBQW1CLElBQW5CLEVBQXlCO0FBQ3ZCLFNBQU8sRUFBRSxRQUFRLEtBQUssTUFBTCxFQUFhLFlBQVksS0FBSyxVQUFMLENBQWdCLEtBQWhCLENBQXNCLENBQXRCLENBQVosRUFBOUIsQ0FEdUI7Q0FBekIiLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIERpZmYoKSB7fVxuXG5EaWZmLnByb3RvdHlwZSA9IHtcbiAgZGlmZihvbGRTdHJpbmcsIG5ld1N0cmluZywgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjaztcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0aW9ucztcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIGRvbmUodmFsdWUpIHtcbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayh1bmRlZmluZWQsIHZhbHVlKTsgfSwgMCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFsbG93IHN1YmNsYXNzZXMgdG8gbWFzc2FnZSB0aGUgaW5wdXQgcHJpb3IgdG8gcnVubmluZ1xuICAgIG9sZFN0cmluZyA9IHRoaXMuY2FzdElucHV0KG9sZFN0cmluZyk7XG4gICAgbmV3U3RyaW5nID0gdGhpcy5jYXN0SW5wdXQobmV3U3RyaW5nKTtcblxuICAgIG9sZFN0cmluZyA9IHRoaXMucmVtb3ZlRW1wdHkodGhpcy50b2tlbml6ZShvbGRTdHJpbmcpKTtcbiAgICBuZXdTdHJpbmcgPSB0aGlzLnJlbW92ZUVtcHR5KHRoaXMudG9rZW5pemUobmV3U3RyaW5nKSk7XG5cbiAgICBsZXQgbmV3TGVuID0gbmV3U3RyaW5nLmxlbmd0aCwgb2xkTGVuID0gb2xkU3RyaW5nLmxlbmd0aDtcbiAgICBsZXQgZWRpdExlbmd0aCA9IDE7XG4gICAgbGV0IG1heEVkaXRMZW5ndGggPSBuZXdMZW4gKyBvbGRMZW47XG4gICAgbGV0IGJlc3RQYXRoID0gW3sgbmV3UG9zOiAtMSwgY29tcG9uZW50czogW10gfV07XG5cbiAgICAvLyBTZWVkIGVkaXRMZW5ndGggPSAwLCBpLmUuIHRoZSBjb250ZW50IHN0YXJ0cyB3aXRoIHRoZSBzYW1lIHZhbHVlc1xuICAgIGxldCBvbGRQb3MgPSB0aGlzLmV4dHJhY3RDb21tb24oYmVzdFBhdGhbMF0sIG5ld1N0cmluZywgb2xkU3RyaW5nLCAwKTtcbiAgICBpZiAoYmVzdFBhdGhbMF0ubmV3UG9zICsgMSA+PSBuZXdMZW4gJiYgb2xkUG9zICsgMSA+PSBvbGRMZW4pIHtcbiAgICAgIC8vIElkZW50aXR5IHBlciB0aGUgZXF1YWxpdHkgYW5kIHRva2VuaXplclxuICAgICAgcmV0dXJuIGRvbmUoW3t2YWx1ZTogbmV3U3RyaW5nLmpvaW4oJycpLCBjb3VudDogbmV3U3RyaW5nLmxlbmd0aH1dKTtcbiAgICB9XG5cbiAgICAvLyBNYWluIHdvcmtlciBtZXRob2QuIGNoZWNrcyBhbGwgcGVybXV0YXRpb25zIG9mIGEgZ2l2ZW4gZWRpdCBsZW5ndGggZm9yIGFjY2VwdGFuY2UuXG4gICAgZnVuY3Rpb24gZXhlY0VkaXRMZW5ndGgoKSB7XG4gICAgICBmb3IgKGxldCBkaWFnb25hbFBhdGggPSAtMSAqIGVkaXRMZW5ndGg7IGRpYWdvbmFsUGF0aCA8PSBlZGl0TGVuZ3RoOyBkaWFnb25hbFBhdGggKz0gMikge1xuICAgICAgICBsZXQgYmFzZVBhdGg7XG4gICAgICAgIGxldCBhZGRQYXRoID0gYmVzdFBhdGhbZGlhZ29uYWxQYXRoIC0gMV0sXG4gICAgICAgICAgICByZW1vdmVQYXRoID0gYmVzdFBhdGhbZGlhZ29uYWxQYXRoICsgMV0sXG4gICAgICAgICAgICBvbGRQb3MgPSAocmVtb3ZlUGF0aCA/IHJlbW92ZVBhdGgubmV3UG9zIDogMCkgLSBkaWFnb25hbFBhdGg7XG4gICAgICAgIGlmIChhZGRQYXRoKSB7XG4gICAgICAgICAgLy8gTm8gb25lIGVsc2UgaXMgZ29pbmcgdG8gYXR0ZW1wdCB0byB1c2UgdGhpcyB2YWx1ZSwgY2xlYXIgaXRcbiAgICAgICAgICBiZXN0UGF0aFtkaWFnb25hbFBhdGggLSAxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjYW5BZGQgPSBhZGRQYXRoICYmIGFkZFBhdGgubmV3UG9zICsgMSA8IG5ld0xlbixcbiAgICAgICAgICAgIGNhblJlbW92ZSA9IHJlbW92ZVBhdGggJiYgMCA8PSBvbGRQb3MgJiYgb2xkUG9zIDwgb2xkTGVuO1xuICAgICAgICBpZiAoIWNhbkFkZCAmJiAhY2FuUmVtb3ZlKSB7XG4gICAgICAgICAgLy8gSWYgdGhpcyBwYXRoIGlzIGEgdGVybWluYWwgdGhlbiBwcnVuZVxuICAgICAgICAgIGJlc3RQYXRoW2RpYWdvbmFsUGF0aF0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZWxlY3QgdGhlIGRpYWdvbmFsIHRoYXQgd2Ugd2FudCB0byBicmFuY2ggZnJvbS4gV2Ugc2VsZWN0IHRoZSBwcmlvclxuICAgICAgICAvLyBwYXRoIHdob3NlIHBvc2l0aW9uIGluIHRoZSBuZXcgc3RyaW5nIGlzIHRoZSBmYXJ0aGVzdCBmcm9tIHRoZSBvcmlnaW5cbiAgICAgICAgLy8gYW5kIGRvZXMgbm90IHBhc3MgdGhlIGJvdW5kcyBvZiB0aGUgZGlmZiBncmFwaFxuICAgICAgICBpZiAoIWNhbkFkZCB8fCAoY2FuUmVtb3ZlICYmIGFkZFBhdGgubmV3UG9zIDwgcmVtb3ZlUGF0aC5uZXdQb3MpKSB7XG4gICAgICAgICAgYmFzZVBhdGggPSBjbG9uZVBhdGgocmVtb3ZlUGF0aCk7XG4gICAgICAgICAgc2VsZi5wdXNoQ29tcG9uZW50KGJhc2VQYXRoLmNvbXBvbmVudHMsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmFzZVBhdGggPSBhZGRQYXRoOyAgIC8vIE5vIG5lZWQgdG8gY2xvbmUsIHdlJ3ZlIHB1bGxlZCBpdCBmcm9tIHRoZSBsaXN0XG4gICAgICAgICAgYmFzZVBhdGgubmV3UG9zKys7XG4gICAgICAgICAgc2VsZi5wdXNoQ29tcG9uZW50KGJhc2VQYXRoLmNvbXBvbmVudHMsIHRydWUsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cblxuICAgICAgICBvbGRQb3MgPSBzZWxmLmV4dHJhY3RDb21tb24oYmFzZVBhdGgsIG5ld1N0cmluZywgb2xkU3RyaW5nLCBkaWFnb25hbFBhdGgpO1xuXG4gICAgICAgIC8vIElmIHdlIGhhdmUgaGl0IHRoZSBlbmQgb2YgYm90aCBzdHJpbmdzLCB0aGVuIHdlIGFyZSBkb25lXG4gICAgICAgIGlmIChiYXNlUGF0aC5uZXdQb3MgKyAxID49IG5ld0xlbiAmJiBvbGRQb3MgKyAxID49IG9sZExlbikge1xuICAgICAgICAgIHJldHVybiBkb25lKGJ1aWxkVmFsdWVzKHNlbGYsIGJhc2VQYXRoLmNvbXBvbmVudHMsIG5ld1N0cmluZywgb2xkU3RyaW5nLCBzZWxmLnVzZUxvbmdlc3RUb2tlbikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSB0cmFjayB0aGlzIHBhdGggYXMgYSBwb3RlbnRpYWwgY2FuZGlkYXRlIGFuZCBjb250aW51ZS5cbiAgICAgICAgICBiZXN0UGF0aFtkaWFnb25hbFBhdGhdID0gYmFzZVBhdGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZWRpdExlbmd0aCsrO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm1zIHRoZSBsZW5ndGggb2YgZWRpdCBpdGVyYXRpb24uIElzIGEgYml0IGZ1Z2x5IGFzIHRoaXMgaGFzIHRvIHN1cHBvcnQgdGhlXG4gICAgLy8gc3luYyBhbmQgYXN5bmMgbW9kZSB3aGljaCBpcyBuZXZlciBmdW4uIExvb3BzIG92ZXIgZXhlY0VkaXRMZW5ndGggdW50aWwgYSB2YWx1ZVxuICAgIC8vIGlzIHByb2R1Y2VkLlxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgKGZ1bmN0aW9uIGV4ZWMoKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgLy8gVGhpcyBzaG91bGQgbm90IGhhcHBlbiwgYnV0IHdlIHdhbnQgdG8gYmUgc2FmZS5cbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICAgIGlmIChlZGl0TGVuZ3RoID4gbWF4RWRpdExlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFleGVjRWRpdExlbmd0aCgpKSB7XG4gICAgICAgICAgICBleGVjKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgIH0oKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChlZGl0TGVuZ3RoIDw9IG1heEVkaXRMZW5ndGgpIHtcbiAgICAgICAgbGV0IHJldCA9IGV4ZWNFZGl0TGVuZ3RoKCk7XG4gICAgICAgIGlmIChyZXQpIHtcbiAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHB1c2hDb21wb25lbnQoY29tcG9uZW50cywgYWRkZWQsIHJlbW92ZWQpIHtcbiAgICBsZXQgbGFzdCA9IGNvbXBvbmVudHNbY29tcG9uZW50cy5sZW5ndGggLSAxXTtcbiAgICBpZiAobGFzdCAmJiBsYXN0LmFkZGVkID09PSBhZGRlZCAmJiBsYXN0LnJlbW92ZWQgPT09IHJlbW92ZWQpIHtcbiAgICAgIC8vIFdlIG5lZWQgdG8gY2xvbmUgaGVyZSBhcyB0aGUgY29tcG9uZW50IGNsb25lIG9wZXJhdGlvbiBpcyBqdXN0XG4gICAgICAvLyBhcyBzaGFsbG93IGFycmF5IGNsb25lXG4gICAgICBjb21wb25lbnRzW2NvbXBvbmVudHMubGVuZ3RoIC0gMV0gPSB7Y291bnQ6IGxhc3QuY291bnQgKyAxLCBhZGRlZDogYWRkZWQsIHJlbW92ZWQ6IHJlbW92ZWQgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50cy5wdXNoKHtjb3VudDogMSwgYWRkZWQ6IGFkZGVkLCByZW1vdmVkOiByZW1vdmVkIH0pO1xuICAgIH1cbiAgfSxcbiAgZXh0cmFjdENvbW1vbihiYXNlUGF0aCwgbmV3U3RyaW5nLCBvbGRTdHJpbmcsIGRpYWdvbmFsUGF0aCkge1xuICAgIGxldCBuZXdMZW4gPSBuZXdTdHJpbmcubGVuZ3RoLFxuICAgICAgICBvbGRMZW4gPSBvbGRTdHJpbmcubGVuZ3RoLFxuICAgICAgICBuZXdQb3MgPSBiYXNlUGF0aC5uZXdQb3MsXG4gICAgICAgIG9sZFBvcyA9IG5ld1BvcyAtIGRpYWdvbmFsUGF0aCxcblxuICAgICAgICBjb21tb25Db3VudCA9IDA7XG4gICAgd2hpbGUgKG5ld1BvcyArIDEgPCBuZXdMZW4gJiYgb2xkUG9zICsgMSA8IG9sZExlbiAmJiB0aGlzLmVxdWFscyhuZXdTdHJpbmdbbmV3UG9zICsgMV0sIG9sZFN0cmluZ1tvbGRQb3MgKyAxXSkpIHtcbiAgICAgIG5ld1BvcysrO1xuICAgICAgb2xkUG9zKys7XG4gICAgICBjb21tb25Db3VudCsrO1xuICAgIH1cblxuICAgIGlmIChjb21tb25Db3VudCkge1xuICAgICAgYmFzZVBhdGguY29tcG9uZW50cy5wdXNoKHtjb3VudDogY29tbW9uQ291bnR9KTtcbiAgICB9XG5cbiAgICBiYXNlUGF0aC5uZXdQb3MgPSBuZXdQb3M7XG4gICAgcmV0dXJuIG9sZFBvcztcbiAgfSxcblxuICBlcXVhbHMobGVmdCwgcmlnaHQpIHtcbiAgICByZXR1cm4gbGVmdCA9PT0gcmlnaHQ7XG4gIH0sXG4gIHJlbW92ZUVtcHR5KGFycmF5KSB7XG4gICAgbGV0IHJldCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheVtpXSkge1xuICAgICAgICByZXQucHVzaChhcnJheVtpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG4gIH0sXG4gIGNhc3RJbnB1dCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfSxcbiAgdG9rZW5pemUodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUuc3BsaXQoJycpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBidWlsZFZhbHVlcyhkaWZmLCBjb21wb25lbnRzLCBuZXdTdHJpbmcsIG9sZFN0cmluZywgdXNlTG9uZ2VzdFRva2VuKSB7XG4gIGxldCBjb21wb25lbnRQb3MgPSAwLFxuICAgICAgY29tcG9uZW50TGVuID0gY29tcG9uZW50cy5sZW5ndGgsXG4gICAgICBuZXdQb3MgPSAwLFxuICAgICAgb2xkUG9zID0gMDtcblxuICBmb3IgKDsgY29tcG9uZW50UG9zIDwgY29tcG9uZW50TGVuOyBjb21wb25lbnRQb3MrKykge1xuICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2NvbXBvbmVudFBvc107XG4gICAgaWYgKCFjb21wb25lbnQucmVtb3ZlZCkge1xuICAgICAgaWYgKCFjb21wb25lbnQuYWRkZWQgJiYgdXNlTG9uZ2VzdFRva2VuKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG5ld1N0cmluZy5zbGljZShuZXdQb3MsIG5ld1BvcyArIGNvbXBvbmVudC5jb3VudCk7XG4gICAgICAgIHZhbHVlID0gdmFsdWUubWFwKGZ1bmN0aW9uKHZhbHVlLCBpKSB7XG4gICAgICAgICAgbGV0IG9sZFZhbHVlID0gb2xkU3RyaW5nW29sZFBvcyArIGldO1xuICAgICAgICAgIHJldHVybiBvbGRWYWx1ZS5sZW5ndGggPiB2YWx1ZS5sZW5ndGggPyBvbGRWYWx1ZSA6IHZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb21wb25lbnQudmFsdWUgPSB2YWx1ZS5qb2luKCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbXBvbmVudC52YWx1ZSA9IG5ld1N0cmluZy5zbGljZShuZXdQb3MsIG5ld1BvcyArIGNvbXBvbmVudC5jb3VudCkuam9pbignJyk7XG4gICAgICB9XG4gICAgICBuZXdQb3MgKz0gY29tcG9uZW50LmNvdW50O1xuXG4gICAgICAvLyBDb21tb24gY2FzZVxuICAgICAgaWYgKCFjb21wb25lbnQuYWRkZWQpIHtcbiAgICAgICAgb2xkUG9zICs9IGNvbXBvbmVudC5jb3VudDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50LnZhbHVlID0gb2xkU3RyaW5nLnNsaWNlKG9sZFBvcywgb2xkUG9zICsgY29tcG9uZW50LmNvdW50KS5qb2luKCcnKTtcbiAgICAgIG9sZFBvcyArPSBjb21wb25lbnQuY291bnQ7XG5cbiAgICAgIC8vIFJldmVyc2UgYWRkIGFuZCByZW1vdmUgc28gcmVtb3ZlcyBhcmUgb3V0cHV0IGZpcnN0IHRvIG1hdGNoIGNvbW1vbiBjb252ZW50aW9uXG4gICAgICAvLyBUaGUgZGlmZmluZyBhbGdvcml0aG0gaXMgdGllZCB0byBhZGQgdGhlbiByZW1vdmUgb3V0cHV0IGFuZCB0aGlzIGlzIHRoZSBzaW1wbGVzdFxuICAgICAgLy8gcm91dGUgdG8gZ2V0IHRoZSBkZXNpcmVkIG91dHB1dCB3aXRoIG1pbmltYWwgb3ZlcmhlYWQuXG4gICAgICBpZiAoY29tcG9uZW50UG9zICYmIGNvbXBvbmVudHNbY29tcG9uZW50UG9zIC0gMV0uYWRkZWQpIHtcbiAgICAgICAgbGV0IHRtcCA9IGNvbXBvbmVudHNbY29tcG9uZW50UG9zIC0gMV07XG4gICAgICAgIGNvbXBvbmVudHNbY29tcG9uZW50UG9zIC0gMV0gPSBjb21wb25lbnRzW2NvbXBvbmVudFBvc107XG4gICAgICAgIGNvbXBvbmVudHNbY29tcG9uZW50UG9zXSA9IHRtcDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBTcGVjaWFsIGNhc2UgaGFuZGxlIGZvciB3aGVuIG9uZSB0ZXJtaW5hbCBpcyBpZ25vcmVkLiBGb3IgdGhpcyBjYXNlIHdlIG1lcmdlIHRoZVxuICAvLyB0ZXJtaW5hbCBpbnRvIHRoZSBwcmlvciBzdHJpbmcgYW5kIGRyb3AgdGhlIGNoYW5nZS5cbiAgbGV0IGxhc3RDb21wb25lbnQgPSBjb21wb25lbnRzW2NvbXBvbmVudExlbiAtIDFdO1xuICBpZiAoY29tcG9uZW50TGVuID4gMVxuICAgICAgJiYgKGxhc3RDb21wb25lbnQuYWRkZWQgfHwgbGFzdENvbXBvbmVudC5yZW1vdmVkKVxuICAgICAgJiYgZGlmZi5lcXVhbHMoJycsIGxhc3RDb21wb25lbnQudmFsdWUpKSB7XG4gICAgY29tcG9uZW50c1tjb21wb25lbnRMZW4gLSAyXS52YWx1ZSArPSBsYXN0Q29tcG9uZW50LnZhbHVlO1xuICAgIGNvbXBvbmVudHMucG9wKCk7XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50cztcbn1cblxuZnVuY3Rpb24gY2xvbmVQYXRoKHBhdGgpIHtcbiAgcmV0dXJuIHsgbmV3UG9zOiBwYXRoLm5ld1BvcywgY29tcG9uZW50czogcGF0aC5jb21wb25lbnRzLnNsaWNlKDApIH07XG59XG4iXX0=


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.characterDiff = undefined;
	exports. /*istanbul ignore end*/diffChars = diffChars;

	var /*istanbul ignore start*/_base = __webpack_require__(6) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*istanbul ignore end*/var characterDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/characterDiff = new /*istanbul ignore start*/_base2.default() /*istanbul ignore end*/;
	function diffChars(oldStr, newStr, callback) {
	  return characterDiff.diff(oldStr, newStr, callback);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL2NoYXJhY3Rlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O2dDQUdnQjs7QUFIaEI7Ozs7Ozs7dUJBRU8sSUFBTSx5RkFBZ0IscUVBQWhCO0FBQ04sU0FBUyxTQUFULENBQW1CLE1BQW5CLEVBQTJCLE1BQTNCLEVBQW1DLFFBQW5DLEVBQTZDO0FBQUUsU0FBTyxjQUFjLElBQWQsQ0FBbUIsTUFBbkIsRUFBMkIsTUFBM0IsRUFBbUMsUUFBbkMsQ0FBUCxDQUFGO0NBQTdDIiwiZmlsZSI6ImNoYXJhY3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWZmIGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCBjb25zdCBjaGFyYWN0ZXJEaWZmID0gbmV3IERpZmYoKTtcbmV4cG9ydCBmdW5jdGlvbiBkaWZmQ2hhcnMob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7IHJldHVybiBjaGFyYWN0ZXJEaWZmLmRpZmYob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKTsgfVxuIl19


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.wordDiff = undefined;
	exports. /*istanbul ignore end*/diffWords = diffWords;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffWordsWithSpace = diffWordsWithSpace;

	var /*istanbul ignore start*/_base = __webpack_require__(6) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/
	var /*istanbul ignore start*/_params = __webpack_require__(9) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*istanbul ignore end*/

	// Based on https://en.wikipedia.org/wiki/Latin_script_in_Unicode
	//
	// Ranges and exceptions:
	// Latin-1 Supplement, 0080–00FF
	//  - U+00D7  × Multiplication sign
	//  - U+00F7  ÷ Division sign
	// Latin Extended-A, 0100–017F
	// Latin Extended-B, 0180–024F
	// IPA Extensions, 0250–02AF
	// Spacing Modifier Letters, 02B0–02FF
	//  - U+02C7  ˇ &#711;  Caron
	//  - U+02D8  ˘ &#728;  Breve
	//  - U+02D9  ˙ &#729;  Dot Above
	//  - U+02DA  ˚ &#730;  Ring Above
	//  - U+02DB  ˛ &#731;  Ogonek
	//  - U+02DC  ˜ &#732;  Small Tilde
	//  - U+02DD  ˝ &#733;  Double Acute Accent
	// Latin Extended Additional, 1E00–1EFF
	var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;

	var reWhitespace = /\S/;

	var wordDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/wordDiff = new /*istanbul ignore start*/_base2.default() /*istanbul ignore end*/;
	wordDiff.equals = function (left, right) {
	  return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
	};
	wordDiff.tokenize = function (value) {
	  var tokens = value.split(/(\s+|\b)/);

	  // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.
	  for (var i = 0; i < tokens.length - 1; i++) {
	    // If we have an empty string in the next field and we have only word chars before and after, merge
	    if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
	      tokens[i] += tokens[i + 2];
	      tokens.splice(i + 1, 2);
	      i--;
	    }
	  }

	  return tokens;
	};

	function diffWords(oldStr, newStr, callback) {
	  var options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(callback, { ignoreWhitespace: true });
	  return wordDiff.diff(oldStr, newStr, options);
	}
	function diffWordsWithSpace(oldStr, newStr, callback) {
	  return wordDiff.diff(oldStr, newStr, callback);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3dvcmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztnQ0ErQ2dCO3lEQUlBOztBQW5EaEI7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLElBQU0sb0JBQW9CLCtEQUFwQjs7QUFFTixJQUFNLGVBQWUsSUFBZjs7QUFFQyxJQUFNLCtFQUFXLHFFQUFYO0FBQ2IsU0FBUyxNQUFULEdBQWtCLFVBQVMsSUFBVCxFQUFlLEtBQWYsRUFBc0I7QUFDdEMsU0FBTyxTQUFTLEtBQVQsSUFBbUIsS0FBSyxPQUFMLENBQWEsZ0JBQWIsSUFBaUMsQ0FBQyxhQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBRCxJQUE0QixDQUFDLGFBQWEsSUFBYixDQUFrQixLQUFsQixDQUFELENBRGpEO0NBQXRCO0FBR2xCLFNBQVMsUUFBVCxHQUFvQixVQUFTLEtBQVQsRUFBZ0I7QUFDbEMsTUFBSSxTQUFTLE1BQU0sS0FBTixDQUFZLFVBQVosQ0FBVDs7O0FBRDhCLE9BSTdCLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxPQUFPLE1BQVAsR0FBZ0IsQ0FBaEIsRUFBbUIsR0FBdkMsRUFBNEM7O0FBRTFDLFFBQUksQ0FBQyxPQUFPLElBQUksQ0FBSixDQUFSLElBQWtCLE9BQU8sSUFBSSxDQUFKLENBQXpCLElBQ0ssa0JBQWtCLElBQWxCLENBQXVCLE9BQU8sQ0FBUCxDQUF2QixDQURMLElBRUssa0JBQWtCLElBQWxCLENBQXVCLE9BQU8sSUFBSSxDQUFKLENBQTlCLENBRkwsRUFFNEM7QUFDOUMsYUFBTyxDQUFQLEtBQWEsT0FBTyxJQUFJLENBQUosQ0FBcEIsQ0FEOEM7QUFFOUMsYUFBTyxNQUFQLENBQWMsSUFBSSxDQUFKLEVBQU8sQ0FBckIsRUFGOEM7QUFHOUMsVUFIOEM7S0FGaEQ7R0FGRjs7QUFXQSxTQUFPLE1BQVAsQ0Fma0M7Q0FBaEI7O0FBa0JiLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixNQUEzQixFQUFtQyxRQUFuQyxFQUE2QztBQUNsRCxNQUFJLFVBQVUsOEVBQWdCLFFBQWhCLEVBQTBCLEVBQUMsa0JBQWtCLElBQWxCLEVBQTNCLENBQVYsQ0FEOEM7QUFFbEQsU0FBTyxTQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLE1BQXRCLEVBQThCLE9BQTlCLENBQVAsQ0FGa0Q7Q0FBN0M7QUFJQSxTQUFTLGtCQUFULENBQTRCLE1BQTVCLEVBQW9DLE1BQXBDLEVBQTRDLFFBQTVDLEVBQXNEO0FBQzNELFNBQU8sU0FBUyxJQUFULENBQWMsTUFBZCxFQUFzQixNQUF0QixFQUE4QixRQUE5QixDQUFQLENBRDJEO0NBQXREIiwiZmlsZSI6IndvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlmZiBmcm9tICcuL2Jhc2UnO1xuaW1wb3J0IHtnZW5lcmF0ZU9wdGlvbnN9IGZyb20gJy4uL3V0aWwvcGFyYW1zJztcblxuLy8gQmFzZWQgb24gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGF0aW5fc2NyaXB0X2luX1VuaWNvZGVcbi8vXG4vLyBSYW5nZXMgYW5kIGV4Y2VwdGlvbnM6XG4vLyBMYXRpbi0xIFN1cHBsZW1lbnQsIDAwODDigJMwMEZGXG4vLyAgLSBVKzAwRDcgIMOXIE11bHRpcGxpY2F0aW9uIHNpZ25cbi8vICAtIFUrMDBGNyAgw7cgRGl2aXNpb24gc2lnblxuLy8gTGF0aW4gRXh0ZW5kZWQtQSwgMDEwMOKAkzAxN0Zcbi8vIExhdGluIEV4dGVuZGVkLUIsIDAxODDigJMwMjRGXG4vLyBJUEEgRXh0ZW5zaW9ucywgMDI1MOKAkzAyQUZcbi8vIFNwYWNpbmcgTW9kaWZpZXIgTGV0dGVycywgMDJCMOKAkzAyRkZcbi8vICAtIFUrMDJDNyAgy4cgJiM3MTE7ICBDYXJvblxuLy8gIC0gVSswMkQ4ICDLmCAmIzcyODsgIEJyZXZlXG4vLyAgLSBVKzAyRDkgIMuZICYjNzI5OyAgRG90IEFib3ZlXG4vLyAgLSBVKzAyREEgIMuaICYjNzMwOyAgUmluZyBBYm92ZVxuLy8gIC0gVSswMkRCICDLmyAmIzczMTsgIE9nb25la1xuLy8gIC0gVSswMkRDICDLnCAmIzczMjsgIFNtYWxsIFRpbGRlXG4vLyAgLSBVKzAyREQgIMudICYjNzMzOyAgRG91YmxlIEFjdXRlIEFjY2VudFxuLy8gTGF0aW4gRXh0ZW5kZWQgQWRkaXRpb25hbCwgMUUwMOKAkzFFRkZcbmNvbnN0IGV4dGVuZGVkV29yZENoYXJzID0gL15bYS16QS1aXFx1e0MwfS1cXHV7RkZ9XFx1e0Q4fS1cXHV7RjZ9XFx1e0Y4fS1cXHV7MkM2fVxcdXsyQzh9LVxcdXsyRDd9XFx1ezJERX0tXFx1ezJGRn1cXHV7MUUwMH0tXFx1ezFFRkZ9XSskL3U7XG5cbmNvbnN0IHJlV2hpdGVzcGFjZSA9IC9cXFMvO1xuXG5leHBvcnQgY29uc3Qgd29yZERpZmYgPSBuZXcgRGlmZigpO1xud29yZERpZmYuZXF1YWxzID0gZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgcmV0dXJuIGxlZnQgPT09IHJpZ2h0IHx8ICh0aGlzLm9wdGlvbnMuaWdub3JlV2hpdGVzcGFjZSAmJiAhcmVXaGl0ZXNwYWNlLnRlc3QobGVmdCkgJiYgIXJlV2hpdGVzcGFjZS50ZXN0KHJpZ2h0KSk7XG59O1xud29yZERpZmYudG9rZW5pemUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBsZXQgdG9rZW5zID0gdmFsdWUuc3BsaXQoLyhcXHMrfFxcYikvKTtcblxuICAvLyBKb2luIHRoZSBib3VuZGFyeSBzcGxpdHMgdGhhdCB3ZSBkbyBub3QgY29uc2lkZXIgdG8gYmUgYm91bmRhcmllcy4gVGhpcyBpcyBwcmltYXJpbHkgdGhlIGV4dGVuZGVkIExhdGluIGNoYXJhY3RlciBzZXQuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aCAtIDE7IGkrKykge1xuICAgIC8vIElmIHdlIGhhdmUgYW4gZW1wdHkgc3RyaW5nIGluIHRoZSBuZXh0IGZpZWxkIGFuZCB3ZSBoYXZlIG9ubHkgd29yZCBjaGFycyBiZWZvcmUgYW5kIGFmdGVyLCBtZXJnZVxuICAgIGlmICghdG9rZW5zW2kgKyAxXSAmJiB0b2tlbnNbaSArIDJdXG4gICAgICAgICAgJiYgZXh0ZW5kZWRXb3JkQ2hhcnMudGVzdCh0b2tlbnNbaV0pXG4gICAgICAgICAgJiYgZXh0ZW5kZWRXb3JkQ2hhcnMudGVzdCh0b2tlbnNbaSArIDJdKSkge1xuICAgICAgdG9rZW5zW2ldICs9IHRva2Vuc1tpICsgMl07XG4gICAgICB0b2tlbnMuc3BsaWNlKGkgKyAxLCAyKTtcbiAgICAgIGktLTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdG9rZW5zO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZXb3JkcyhvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spIHtcbiAgbGV0IG9wdGlvbnMgPSBnZW5lcmF0ZU9wdGlvbnMoY2FsbGJhY2ssIHtpZ25vcmVXaGl0ZXNwYWNlOiB0cnVlfSk7XG4gIHJldHVybiB3b3JkRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBvcHRpb25zKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaWZmV29yZHNXaXRoU3BhY2Uob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7XG4gIHJldHVybiB3b3JkRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjayk7XG59XG4iXX0=


/***/ },
/* 9 */
/***/ function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/generateOptions = generateOptions;
	function generateOptions(options, defaults) {
	  if (typeof options === 'function') {
	    defaults.callback = options;
	  } else if (options) {
	    for (var name in options) {
	      /* istanbul ignore else */
	      if (options.hasOwnProperty(name)) {
	        defaults[name] = options[name];
	      }
	    }
	  }
	  return defaults;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL3BhcmFtcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0NBQWdCO0FBQVQsU0FBUyxlQUFULENBQXlCLE9BQXpCLEVBQWtDLFFBQWxDLEVBQTRDO0FBQ2pELE1BQUksT0FBTyxPQUFQLEtBQW1CLFVBQW5CLEVBQStCO0FBQ2pDLGFBQVMsUUFBVCxHQUFvQixPQUFwQixDQURpQztHQUFuQyxNQUVPLElBQUksT0FBSixFQUFhO0FBQ2xCLFNBQUssSUFBSSxJQUFKLElBQVksT0FBakIsRUFBMEI7O0FBRXhCLFVBQUksUUFBUSxjQUFSLENBQXVCLElBQXZCLENBQUosRUFBa0M7QUFDaEMsaUJBQVMsSUFBVCxJQUFpQixRQUFRLElBQVIsQ0FBakIsQ0FEZ0M7T0FBbEM7S0FGRjtHQURLO0FBUVAsU0FBTyxRQUFQLENBWGlEO0NBQTVDIiwiZmlsZSI6InBhcmFtcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU9wdGlvbnMob3B0aW9ucywgZGVmYXVsdHMpIHtcbiAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZGVmYXVsdHMuY2FsbGJhY2sgPSBvcHRpb25zO1xuICB9IGVsc2UgaWYgKG9wdGlvbnMpIHtcbiAgICBmb3IgKGxldCBuYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBkZWZhdWx0c1tuYW1lXSA9IG9wdGlvbnNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWZhdWx0cztcbn1cbiJdfQ==


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.lineDiff = undefined;
	exports. /*istanbul ignore end*/diffLines = diffLines;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/diffTrimmedLines = diffTrimmedLines;

	var /*istanbul ignore start*/_base = __webpack_require__(6) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/
	var /*istanbul ignore start*/_params = __webpack_require__(9) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*istanbul ignore end*/var lineDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/lineDiff = new /*istanbul ignore start*/_base2.default() /*istanbul ignore end*/;
	lineDiff.tokenize = function (value) {
	  var retLines = [],
	      linesAndNewlines = value.split(/(\n|\r\n)/);

	  // Ignore the final empty token that occurs if the string ends with a new line
	  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
	    linesAndNewlines.pop();
	  }

	  // Merge the content and line separators into single tokens
	  for (var i = 0; i < linesAndNewlines.length; i++) {
	    var line = linesAndNewlines[i];

	    if (i % 2 && !this.options.newlineIsToken) {
	      retLines[retLines.length - 1] += line;
	    } else {
	      if (this.options.ignoreWhitespace) {
	        line = line.trim();
	      }
	      retLines.push(line);
	    }
	  }

	  return retLines;
	};

	function diffLines(oldStr, newStr, callback) {
	  return lineDiff.diff(oldStr, newStr, callback);
	}
	function diffTrimmedLines(oldStr, newStr, callback) {
	  var options = /*istanbul ignore start*/(0, _params.generateOptions) /*istanbul ignore end*/(callback, { ignoreWhitespace: true });
	  return lineDiff.diff(oldStr, newStr, options);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL2xpbmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztnQ0E4QmdCO3lEQUNBOztBQS9CaEI7Ozs7OztBQUNBOzs7Ozt1QkFFTyxJQUFNLCtFQUFXLHFFQUFYO0FBQ2IsU0FBUyxRQUFULEdBQW9CLFVBQVMsS0FBVCxFQUFnQjtBQUNsQyxNQUFJLFdBQVcsRUFBWDtNQUNBLG1CQUFtQixNQUFNLEtBQU4sQ0FBWSxXQUFaLENBQW5COzs7QUFGOEIsTUFLOUIsQ0FBQyxpQkFBaUIsaUJBQWlCLE1BQWpCLEdBQTBCLENBQTFCLENBQWxCLEVBQWdEO0FBQ2xELHFCQUFpQixHQUFqQixHQURrRDtHQUFwRDs7O0FBTGtDLE9BVTdCLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxpQkFBaUIsTUFBakIsRUFBeUIsR0FBN0MsRUFBa0Q7QUFDaEQsUUFBSSxPQUFPLGlCQUFpQixDQUFqQixDQUFQLENBRDRDOztBQUdoRCxRQUFJLElBQUksQ0FBSixJQUFTLENBQUMsS0FBSyxPQUFMLENBQWEsY0FBYixFQUE2QjtBQUN6QyxlQUFTLFNBQVMsTUFBVCxHQUFrQixDQUFsQixDQUFULElBQWlDLElBQWpDLENBRHlDO0tBQTNDLE1BRU87QUFDTCxVQUFJLEtBQUssT0FBTCxDQUFhLGdCQUFiLEVBQStCO0FBQ2pDLGVBQU8sS0FBSyxJQUFMLEVBQVAsQ0FEaUM7T0FBbkM7QUFHQSxlQUFTLElBQVQsQ0FBYyxJQUFkLEVBSks7S0FGUDtHQUhGOztBQWFBLFNBQU8sUUFBUCxDQXZCa0M7Q0FBaEI7O0FBMEJiLFNBQVMsU0FBVCxDQUFtQixNQUFuQixFQUEyQixNQUEzQixFQUFtQyxRQUFuQyxFQUE2QztBQUFFLFNBQU8sU0FBUyxJQUFULENBQWMsTUFBZCxFQUFzQixNQUF0QixFQUE4QixRQUE5QixDQUFQLENBQUY7Q0FBN0M7QUFDQSxTQUFTLGdCQUFULENBQTBCLE1BQTFCLEVBQWtDLE1BQWxDLEVBQTBDLFFBQTFDLEVBQW9EO0FBQ3pELE1BQUksVUFBVSw4RUFBZ0IsUUFBaEIsRUFBMEIsRUFBQyxrQkFBa0IsSUFBbEIsRUFBM0IsQ0FBVixDQURxRDtBQUV6RCxTQUFPLFNBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsTUFBdEIsRUFBOEIsT0FBOUIsQ0FBUCxDQUZ5RDtDQUFwRCIsImZpbGUiOiJsaW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERpZmYgZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7Z2VuZXJhdGVPcHRpb25zfSBmcm9tICcuLi91dGlsL3BhcmFtcyc7XG5cbmV4cG9ydCBjb25zdCBsaW5lRGlmZiA9IG5ldyBEaWZmKCk7XG5saW5lRGlmZi50b2tlbml6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIGxldCByZXRMaW5lcyA9IFtdLFxuICAgICAgbGluZXNBbmROZXdsaW5lcyA9IHZhbHVlLnNwbGl0KC8oXFxufFxcclxcbikvKTtcblxuICAvLyBJZ25vcmUgdGhlIGZpbmFsIGVtcHR5IHRva2VuIHRoYXQgb2NjdXJzIGlmIHRoZSBzdHJpbmcgZW5kcyB3aXRoIGEgbmV3IGxpbmVcbiAgaWYgKCFsaW5lc0FuZE5ld2xpbmVzW2xpbmVzQW5kTmV3bGluZXMubGVuZ3RoIC0gMV0pIHtcbiAgICBsaW5lc0FuZE5ld2xpbmVzLnBvcCgpO1xuICB9XG5cbiAgLy8gTWVyZ2UgdGhlIGNvbnRlbnQgYW5kIGxpbmUgc2VwYXJhdG9ycyBpbnRvIHNpbmdsZSB0b2tlbnNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lc0FuZE5ld2xpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGxpbmUgPSBsaW5lc0FuZE5ld2xpbmVzW2ldO1xuXG4gICAgaWYgKGkgJSAyICYmICF0aGlzLm9wdGlvbnMubmV3bGluZUlzVG9rZW4pIHtcbiAgICAgIHJldExpbmVzW3JldExpbmVzLmxlbmd0aCAtIDFdICs9IGxpbmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuaWdub3JlV2hpdGVzcGFjZSkge1xuICAgICAgICBsaW5lID0gbGluZS50cmltKCk7XG4gICAgICB9XG4gICAgICByZXRMaW5lcy5wdXNoKGxpbmUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXRMaW5lcztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmTGluZXMob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7IHJldHVybiBsaW5lRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjayk7IH1cbmV4cG9ydCBmdW5jdGlvbiBkaWZmVHJpbW1lZExpbmVzKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjaykge1xuICBsZXQgb3B0aW9ucyA9IGdlbmVyYXRlT3B0aW9ucyhjYWxsYmFjaywge2lnbm9yZVdoaXRlc3BhY2U6IHRydWV9KTtcbiAgcmV0dXJuIGxpbmVEaWZmLmRpZmYob2xkU3RyLCBuZXdTdHIsIG9wdGlvbnMpO1xufVxuIl19


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.sentenceDiff = undefined;
	exports. /*istanbul ignore end*/diffSentences = diffSentences;

	var /*istanbul ignore start*/_base = __webpack_require__(6) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*istanbul ignore end*/var sentenceDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/sentenceDiff = new /*istanbul ignore start*/_base2.default() /*istanbul ignore end*/;
	sentenceDiff.tokenize = function (value) {
	  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
	};

	function diffSentences(oldStr, newStr, callback) {
	  return sentenceDiff.diff(oldStr, newStr, callback);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL3NlbnRlbmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Z0NBUWdCOztBQVJoQjs7Ozs7Ozt1QkFHTyxJQUFNLHVGQUFlLHFFQUFmO0FBQ2IsYUFBYSxRQUFiLEdBQXdCLFVBQVMsS0FBVCxFQUFnQjtBQUN0QyxTQUFPLE1BQU0sS0FBTixDQUFZLHVCQUFaLENBQVAsQ0FEc0M7Q0FBaEI7O0FBSWpCLFNBQVMsYUFBVCxDQUF1QixNQUF2QixFQUErQixNQUEvQixFQUF1QyxRQUF2QyxFQUFpRDtBQUFFLFNBQU8sYUFBYSxJQUFiLENBQWtCLE1BQWxCLEVBQTBCLE1BQTFCLEVBQWtDLFFBQWxDLENBQVAsQ0FBRjtDQUFqRCIsImZpbGUiOiJzZW50ZW5jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWZmIGZyb20gJy4vYmFzZSc7XG5cblxuZXhwb3J0IGNvbnN0IHNlbnRlbmNlRGlmZiA9IG5ldyBEaWZmKCk7XG5zZW50ZW5jZURpZmYudG9rZW5pemUgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUuc3BsaXQoLyhcXFMuKz9bLiE/XSkoPz1cXHMrfCQpLyk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZGlmZlNlbnRlbmNlcyhvbGRTdHIsIG5ld1N0ciwgY2FsbGJhY2spIHsgcmV0dXJuIHNlbnRlbmNlRGlmZi5kaWZmKG9sZFN0ciwgbmV3U3RyLCBjYWxsYmFjayk7IH1cbiJdfQ==


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.cssDiff = undefined;
	exports. /*istanbul ignore end*/diffCss = diffCss;

	var /*istanbul ignore start*/_base = __webpack_require__(6) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	var _base2 = _interopRequireDefault(_base);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*istanbul ignore end*/var cssDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/cssDiff = new /*istanbul ignore start*/_base2.default() /*istanbul ignore end*/;
	cssDiff.tokenize = function (value) {
	  return value.split(/([{}:;,]|\s+)/);
	};

	function diffCss(oldStr, newStr, callback) {
	  return cssDiff.diff(oldStr, newStr, callback);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWZmL2Nzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O2dDQU9nQjs7QUFQaEI7Ozs7Ozs7dUJBRU8sSUFBTSw2RUFBVSxxRUFBVjtBQUNiLFFBQVEsUUFBUixHQUFtQixVQUFTLEtBQVQsRUFBZ0I7QUFDakMsU0FBTyxNQUFNLEtBQU4sQ0FBWSxlQUFaLENBQVAsQ0FEaUM7Q0FBaEI7O0FBSVosU0FBUyxPQUFULENBQWlCLE1BQWpCLEVBQXlCLE1BQXpCLEVBQWlDLFFBQWpDLEVBQTJDO0FBQUUsU0FBTyxRQUFRLElBQVIsQ0FBYSxNQUFiLEVBQXFCLE1BQXJCLEVBQTZCLFFBQTdCLENBQVAsQ0FBRjtDQUEzQyIsImZpbGUiOiJjc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGlmZiBmcm9tICcuL2Jhc2UnO1xuXG5leHBvcnQgY29uc3QgY3NzRGlmZiA9IG5ldyBEaWZmKCk7XG5jc3NEaWZmLnRva2VuaXplID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlLnNwbGl0KC8oW3t9OjssXXxcXHMrKS8pO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpZmZDc3Mob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKSB7IHJldHVybiBjc3NEaWZmLmRpZmYob2xkU3RyLCBuZXdTdHIsIGNhbGxiYWNrKTsgfVxuIl19


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports.jsonDiff = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports. /*istanbul ignore end*/diffJson = diffJson;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/canonicalize = canonicalize;

	var /*istanbul ignore start*/_base = __webpack_require__(6) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	var _base2 = _interopRequireDefault(_base);

	/*istanbul ignore end*/
	var /*istanbul ignore start*/_line = __webpack_require__(10) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*istanbul ignore end*/

	var objectPrototypeToString = Object.prototype.toString;

	var jsonDiff = /*istanbul ignore start*/exports. /*istanbul ignore end*/jsonDiff = new /*istanbul ignore start*/_base2.default() /*istanbul ignore end*/;
	// Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
	// dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:
	jsonDiff.useLongestToken = true;

	jsonDiff.tokenize = /*istanbul ignore start*/_line.lineDiff. /*istanbul ignore end*/tokenize;
	jsonDiff.castInput = function (value) {
	  return typeof value === 'string' ? value : JSON.stringify(canonicalize(value), undefined, '  ');
	};
	jsonDiff.equals = function (left, right) {
	  return (/*istanbul ignore start*/_base2.default. /*istanbul ignore end*/prototype.equals(left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'))
	  );
	};

	function diffJson(oldObj, newObj, callback) {
	  return jsonDiff.diff(oldObj, newObj, callback);
	}

	// This function handles the presence of circular references by bailing out when encountering an
	// object that is already on the "stack" of items being processed.
	function canonicalize(obj, stack, replacementStack) {
	  stack = stack || [];
	  replacementStack = replacementStack || [];

	  var i = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  for (i = 0; i < stack.length; i += 1) {
	    if (stack[i] === obj) {
	      return replacementStack[i];
	    }
	  }

	  var canonicalizedObj = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  if ('[object Array]' === objectPrototypeToString.call(obj)) {
	    stack.push(obj);
	    canonicalizedObj = new Array(obj.length);
	    replacementStack.push(canonicalizedObj);
	    for (i = 0; i < obj.length; i += 1) {
	      canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack);
	    }
	    stack.pop();
	    replacementStack.pop();
	    return canonicalizedObj;
	  }

	  if (obj && obj.toJSON) {
	    obj = obj.toJSON();
	  }

	  if ( /*istanbul ignore start*/(typeof /*istanbul ignore end*/obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && obj !== null) {
	    stack.push(obj);
	    canonicalizedObj = {};
	    replacementStack.push(canonicalizedObj);
	    var sortedKeys = [],
	        key = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	    for (key in obj) {
	      /* istanbul ignore else */
	      if (obj.hasOwnProperty(key)) {
	        sortedKeys.push(key);
	      }
	    }
	    sortedKeys.sort();
	    for (i = 0; i < sortedKeys.length; i += 1) {
	      key = sortedKeys[i];
	      canonicalizedObj[key] = canonicalize(obj[key], stack, replacementStack);
	    }
	    stack.pop();
	    replacementStack.pop();
	  } else {
	    canonicalizedObj = obj;
	  }
	  return canonicalizedObj;
	}
	//# sourceMappingURL=data:application/json;base64,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QjtLQUZGO0FBTUEsZUFBVyxJQUFYLEdBWjJDO0FBYTNDLFNBQUssSUFBSSxDQUFKLEVBQU8sSUFBSSxXQUFXLE1BQVgsRUFBbUIsS0FBSyxDQUFMLEVBQVE7QUFDekMsWUFBTSxXQUFXLENBQVgsQ0FBTixDQUR5QztBQUV6Qyx1QkFBaUIsR0FBakIsSUFBd0IsYUFBYSxJQUFJLEdBQUosQ0FBYixFQUF1QixLQUF2QixFQUE4QixnQkFBOUIsQ0FBeEIsQ0FGeUM7S0FBM0M7QUFJQSxVQUFNLEdBQU4sR0FqQjJDO0FBa0IzQyxxQkFBaUIsR0FBakIsR0FsQjJDO0dBQTdDLE1BbUJPO0FBQ0wsdUJBQW1CLEdBQW5CLENBREs7R0FuQlA7QUFzQkEsU0FBTyxnQkFBUCxDQXBEeUQ7Q0FBcEQiLCJmaWxlIjoianNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEaWZmIGZyb20gJy4vYmFzZSc7XG5pbXBvcnQge2xpbmVEaWZmfSBmcm9tICcuL2xpbmUnO1xuXG5jb25zdCBvYmplY3RQcm90b3R5cGVUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cblxuZXhwb3J0IGNvbnN0IGpzb25EaWZmID0gbmV3IERpZmYoKTtcbi8vIERpc2NyaW1pbmF0ZSBiZXR3ZWVuIHR3byBsaW5lcyBvZiBwcmV0dHktcHJpbnRlZCwgc2VyaWFsaXplZCBKU09OIHdoZXJlIG9uZSBvZiB0aGVtIGhhcyBhXG4vLyBkYW5nbGluZyBjb21tYSBhbmQgdGhlIG90aGVyIGRvZXNuJ3QuIFR1cm5zIG91dCBpbmNsdWRpbmcgdGhlIGRhbmdsaW5nIGNvbW1hIHlpZWxkcyB0aGUgbmljZXN0IG91dHB1dDpcbmpzb25EaWZmLnVzZUxvbmdlc3RUb2tlbiA9IHRydWU7XG5cbmpzb25EaWZmLnRva2VuaXplID0gbGluZURpZmYudG9rZW5pemU7XG5qc29uRGlmZi5jYXN0SW5wdXQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHZhbHVlIDogSlNPTi5zdHJpbmdpZnkoY2Fub25pY2FsaXplKHZhbHVlKSwgdW5kZWZpbmVkLCAnICAnKTtcbn07XG5qc29uRGlmZi5lcXVhbHMgPSBmdW5jdGlvbihsZWZ0LCByaWdodCkge1xuICByZXR1cm4gRGlmZi5wcm90b3R5cGUuZXF1YWxzKGxlZnQucmVwbGFjZSgvLChbXFxyXFxuXSkvZywgJyQxJyksIHJpZ2h0LnJlcGxhY2UoLywoW1xcclxcbl0pL2csICckMScpKTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmSnNvbihvbGRPYmosIG5ld09iaiwgY2FsbGJhY2spIHsgcmV0dXJuIGpzb25EaWZmLmRpZmYob2xkT2JqLCBuZXdPYmosIGNhbGxiYWNrKTsgfVxuXG5cbi8vIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB0aGUgcHJlc2VuY2Ugb2YgY2lyY3VsYXIgcmVmZXJlbmNlcyBieSBiYWlsaW5nIG91dCB3aGVuIGVuY291bnRlcmluZyBhblxuLy8gb2JqZWN0IHRoYXQgaXMgYWxyZWFkeSBvbiB0aGUgXCJzdGFja1wiIG9mIGl0ZW1zIGJlaW5nIHByb2Nlc3NlZC5cbmV4cG9ydCBmdW5jdGlvbiBjYW5vbmljYWxpemUob2JqLCBzdGFjaywgcmVwbGFjZW1lbnRTdGFjaykge1xuICBzdGFjayA9IHN0YWNrIHx8IFtdO1xuICByZXBsYWNlbWVudFN0YWNrID0gcmVwbGFjZW1lbnRTdGFjayB8fCBbXTtcblxuICBsZXQgaTtcblxuICBmb3IgKGkgPSAwOyBpIDwgc3RhY2subGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoc3RhY2tbaV0gPT09IG9iaikge1xuICAgICAgcmV0dXJuIHJlcGxhY2VtZW50U3RhY2tbaV07XG4gICAgfVxuICB9XG5cbiAgbGV0IGNhbm9uaWNhbGl6ZWRPYmo7XG5cbiAgaWYgKCdbb2JqZWN0IEFycmF5XScgPT09IG9iamVjdFByb3RvdHlwZVRvU3RyaW5nLmNhbGwob2JqKSkge1xuICAgIHN0YWNrLnB1c2gob2JqKTtcbiAgICBjYW5vbmljYWxpemVkT2JqID0gbmV3IEFycmF5KG9iai5sZW5ndGgpO1xuICAgIHJlcGxhY2VtZW50U3RhY2sucHVzaChjYW5vbmljYWxpemVkT2JqKTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjYW5vbmljYWxpemVkT2JqW2ldID0gY2Fub25pY2FsaXplKG9ialtpXSwgc3RhY2ssIHJlcGxhY2VtZW50U3RhY2spO1xuICAgIH1cbiAgICBzdGFjay5wb3AoKTtcbiAgICByZXBsYWNlbWVudFN0YWNrLnBvcCgpO1xuICAgIHJldHVybiBjYW5vbmljYWxpemVkT2JqO1xuICB9XG5cbiAgaWYgKG9iaiAmJiBvYmoudG9KU09OKSB7XG4gICAgb2JqID0gb2JqLnRvSlNPTigpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiAhPT0gbnVsbCkge1xuICAgIHN0YWNrLnB1c2gob2JqKTtcbiAgICBjYW5vbmljYWxpemVkT2JqID0ge307XG4gICAgcmVwbGFjZW1lbnRTdGFjay5wdXNoKGNhbm9uaWNhbGl6ZWRPYmopO1xuICAgIGxldCBzb3J0ZWRLZXlzID0gW10sXG4gICAgICAgIGtleTtcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgc29ydGVkS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNvcnRlZEtleXMuc29ydCgpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBzb3J0ZWRLZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBrZXkgPSBzb3J0ZWRLZXlzW2ldO1xuICAgICAgY2Fub25pY2FsaXplZE9ialtrZXldID0gY2Fub25pY2FsaXplKG9ialtrZXldLCBzdGFjaywgcmVwbGFjZW1lbnRTdGFjayk7XG4gICAgfVxuICAgIHN0YWNrLnBvcCgpO1xuICAgIHJlcGxhY2VtZW50U3RhY2sucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgY2Fub25pY2FsaXplZE9iaiA9IG9iajtcbiAgfVxuICByZXR1cm4gY2Fub25pY2FsaXplZE9iajtcbn1cbiJdfQ==


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/applyPatch = applyPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/applyPatches = applyPatches;

	var /*istanbul ignore start*/_parse = __webpack_require__(15) /*istanbul ignore end*/;

	var /*istanbul ignore start*/_distanceIterator = __webpack_require__(16) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	var _distanceIterator2 = _interopRequireDefault(_distanceIterator);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*istanbul ignore end*/function applyPatch(source, uniDiff) {
	  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  if (typeof uniDiff === 'string') {
	    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);
	  }

	  if (Array.isArray(uniDiff)) {
	    if (uniDiff.length > 1) {
	      throw new Error('applyPatch only works with a single input.');
	    }

	    uniDiff = uniDiff[0];
	  }

	  // Apply the diff to the input
	  var lines = source.split('\n'),
	      hunks = uniDiff.hunks,
	      compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) /*istanbul ignore start*/{
	    return (/*istanbul ignore end*/line === patchContent
	    );
	  },
	      errorCount = 0,
	      fuzzFactor = options.fuzzFactor || 0,
	      minLine = 0,
	      offset = 0,
	      removeEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,
	      addEOFNL = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;

	  /**
	   * Checks if the hunk exactly fits on the provided location
	   */
	  function hunkFits(hunk, toPos) {
	    for (var j = 0; j < hunk.lines.length; j++) {
	      var line = hunk.lines[j],
	          operation = line[0],
	          content = line.substr(1);

	      if (operation === ' ' || operation === '-') {
	        // Context sanity check
	        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
	          errorCount++;

	          if (errorCount > fuzzFactor) {
	            return false;
	          }
	        }
	        toPos++;
	      }
	    }

	    return true;
	  }

	  // Search best fit offsets for each hunk based on the previous ones
	  for (var i = 0; i < hunks.length; i++) {
	    var hunk = hunks[i],
	        maxLine = lines.length - hunk.oldLines,
	        localOffset = 0,
	        toPos = offset + hunk.oldStart - 1;

	    var iterator = /*istanbul ignore start*/(0, _distanceIterator2.default) /*istanbul ignore end*/(toPos, minLine, maxLine);

	    for (; localOffset !== undefined; localOffset = iterator()) {
	      if (hunkFits(hunk, toPos + localOffset)) {
	        hunk.offset = offset += localOffset;
	        break;
	      }
	    }

	    if (localOffset === undefined) {
	      return false;
	    }

	    // Set lower text limit to end of the current hunk, so next ones don't try
	    // to fit over already patched text
	    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
	  }

	  // Apply patch hunks
	  for (var _i = 0; _i < hunks.length; _i++) {
	    var _hunk = hunks[_i],
	        _toPos = _hunk.offset + _hunk.newStart - 1;

	    for (var j = 0; j < _hunk.lines.length; j++) {
	      var line = _hunk.lines[j],
	          operation = line[0],
	          content = line.substr(1);

	      if (operation === ' ') {
	        _toPos++;
	      } else if (operation === '-') {
	        lines.splice(_toPos, 1);
	        /* istanbul ignore else */
	      } else if (operation === '+') {
	          lines.splice(_toPos, 0, content);
	          _toPos++;
	        } else if (operation === '\\') {
	          var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;
	          if (previousOperation === '+') {
	            removeEOFNL = true;
	          } else if (previousOperation === '-') {
	            addEOFNL = true;
	          }
	        }
	    }
	  }

	  // Handle EOFNL insertion/removal
	  if (removeEOFNL) {
	    while (!lines[lines.length - 1]) {
	      lines.pop();
	    }
	  } else if (addEOFNL) {
	    lines.push('');
	  }
	  return lines.join('\n');
	}

	// Wrapper that supports multiple file patches via callbacks.
	function applyPatches(uniDiff, options) {
	  if (typeof uniDiff === 'string') {
	    uniDiff = /*istanbul ignore start*/(0, _parse.parsePatch) /*istanbul ignore end*/(uniDiff);
	  }

	  var currentIndex = 0;
	  function processIndex() {
	    var index = uniDiff[currentIndex++];
	    if (!index) {
	      return options.complete();
	    }

	    options.loadFile(index, function (err, data) {
	      if (err) {
	        return options.complete(err);
	      }

	      var updatedContent = applyPatch(data, index, options);
	      options.patched(index, updatedContent);

	      setTimeout(processIndex, 0);
	    });
	  }
	  processIndex();
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXRjaC9hcHBseS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0NBR2dCO3lEQXFIQTs7QUF4SGhCOztBQUNBOzs7Ozs7O3VCQUVPLFNBQVMsVUFBVCxDQUFvQixNQUFwQixFQUE0QixPQUE1QixFQUFtRDtzREFBZCxnRUFBVSxrQkFBSTs7QUFDeEQsTUFBSSxPQUFPLE9BQVAsS0FBbUIsUUFBbkIsRUFBNkI7QUFDL0IsY0FBVSx3RUFBVyxPQUFYLENBQVYsQ0FEK0I7R0FBakM7O0FBSUEsTUFBSSxNQUFNLE9BQU4sQ0FBYyxPQUFkLENBQUosRUFBNEI7QUFDMUIsUUFBSSxRQUFRLE1BQVIsR0FBaUIsQ0FBakIsRUFBb0I7QUFDdEIsWUFBTSxJQUFJLEtBQUosQ0FBVSw0Q0FBVixDQUFOLENBRHNCO0tBQXhCOztBQUlBLGNBQVUsUUFBUSxDQUFSLENBQVYsQ0FMMEI7R0FBNUI7OztBQUx3RCxNQWNwRCxRQUFRLE9BQU8sS0FBUCxDQUFhLElBQWIsQ0FBUjtNQUNBLFFBQVEsUUFBUSxLQUFSO01BRVIsY0FBYyxRQUFRLFdBQVIsSUFBd0IsVUFBQyxVQUFELEVBQWEsSUFBYixFQUFtQixTQUFuQixFQUE4QixZQUE5QjttQ0FBK0MsU0FBUyxZQUFUOztHQUEvQztNQUN0QyxhQUFhLENBQWI7TUFDQSxhQUFhLFFBQVEsVUFBUixJQUFzQixDQUF0QjtNQUNiLFVBQVUsQ0FBVjtNQUNBLFNBQVMsQ0FBVDtNQUVBLHFFQVRKO01BVUksa0VBVko7Ozs7O0FBZHdELFdBNkIvQyxRQUFULENBQWtCLElBQWxCLEVBQXdCLEtBQXhCLEVBQStCO0FBQzdCLFNBQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLEtBQUssS0FBTCxDQUFXLE1BQVgsRUFBbUIsR0FBdkMsRUFBNEM7QUFDMUMsVUFBSSxPQUFPLEtBQUssS0FBTCxDQUFXLENBQVgsQ0FBUDtVQUNBLFlBQVksS0FBSyxDQUFMLENBQVo7VUFDQSxVQUFVLEtBQUssTUFBTCxDQUFZLENB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QU4sQ0FBVyxFQUFYLEVBRG1CO0dBQWQ7QUFHUCxTQUFPLE1BQU0sSUFBTixDQUFXLElBQVgsQ0FBUCxDQWpId0Q7Q0FBbkQ7OztBQXFIQSxTQUFTLFlBQVQsQ0FBc0IsT0FBdEIsRUFBK0IsT0FBL0IsRUFBd0M7QUFDN0MsTUFBSSxPQUFPLE9BQVAsS0FBbUIsUUFBbkIsRUFBNkI7QUFDL0IsY0FBVSx3RUFBVyxPQUFYLENBQVYsQ0FEK0I7R0FBakM7O0FBSUEsTUFBSSxlQUFlLENBQWYsQ0FMeUM7QUFNN0MsV0FBUyxZQUFULEdBQXdCO0FBQ3RCLFFBQUksUUFBUSxRQUFRLGNBQVIsQ0FBUixDQURrQjtBQUV0QixRQUFJLENBQUMsS0FBRCxFQUFRO0FBQ1YsYUFBTyxRQUFRLFFBQVIsRUFBUCxDQURVO0tBQVo7O0FBSUEsWUFBUSxRQUFSLENBQWlCLEtBQWpCLEVBQXdCLFVBQVMsR0FBVCxFQUFjLElBQWQsRUFBb0I7QUFDMUMsVUFBSSxHQUFKLEVBQVM7QUFDUCxlQUFPLFFBQVEsUUFBUixDQUFpQixHQUFqQixDQUFQLENBRE87T0FBVDs7QUFJQSxVQUFJLGlCQUFpQixXQUFXLElBQVgsRUFBaUIsS0FBakIsRUFBd0IsT0FBeEIsQ0FBakIsQ0FMc0M7QUFNMUMsY0FBUSxPQUFSLENBQWdCLEtBQWhCLEVBQXVCLGNBQXZCLEVBTjBDOztBQVExQyxpQkFBVyxZQUFYLEVBQXlCLENBQXpCLEVBUjBDO0tBQXBCLENBQXhCLENBTnNCO0dBQXhCO0FBaUJBLGlCQXZCNkM7Q0FBeEMiLCJmaWxlIjoiYXBwbHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhcnNlUGF0Y2h9IGZyb20gJy4vcGFyc2UnO1xuaW1wb3J0IGRpc3RhbmNlSXRlcmF0b3IgZnJvbSAnLi4vdXRpbC9kaXN0YW5jZS1pdGVyYXRvcic7XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVBhdGNoKHNvdXJjZSwgdW5pRGlmZiwgb3B0aW9ucyA9IHt9KSB7XG4gIGlmICh0eXBlb2YgdW5pRGlmZiA9PT0gJ3N0cmluZycpIHtcbiAgICB1bmlEaWZmID0gcGFyc2VQYXRjaCh1bmlEaWZmKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHVuaURpZmYpKSB7XG4gICAgaWYgKHVuaURpZmYubGVuZ3RoID4gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcHBseVBhdGNoIG9ubHkgd29ya3Mgd2l0aCBhIHNpbmdsZSBpbnB1dC4nKTtcbiAgICB9XG5cbiAgICB1bmlEaWZmID0gdW5pRGlmZlswXTtcbiAgfVxuXG4gIC8vIEFwcGx5IHRoZSBkaWZmIHRvIHRoZSBpbnB1dFxuICBsZXQgbGluZXMgPSBzb3VyY2Uuc3BsaXQoJ1xcbicpLFxuICAgICAgaHVua3MgPSB1bmlEaWZmLmh1bmtzLFxuXG4gICAgICBjb21wYXJlTGluZSA9IG9wdGlvbnMuY29tcGFyZUxpbmUgfHwgKChsaW5lTnVtYmVyLCBsaW5lLCBvcGVyYXRpb24sIHBhdGNoQ29udGVudCkgPT4gbGluZSA9PT0gcGF0Y2hDb250ZW50KSxcbiAgICAgIGVycm9yQ291bnQgPSAwLFxuICAgICAgZnV6ekZhY3RvciA9IG9wdGlvbnMuZnV6ekZhY3RvciB8fCAwLFxuICAgICAgbWluTGluZSA9IDAsXG4gICAgICBvZmZzZXQgPSAwLFxuXG4gICAgICByZW1vdmVFT0ZOTCxcbiAgICAgIGFkZEVPRk5MO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGh1bmsgZXhhY3RseSBmaXRzIG9uIHRoZSBwcm92aWRlZCBsb2NhdGlvblxuICAgKi9cbiAgZnVuY3Rpb24gaHVua0ZpdHMoaHVuaywgdG9Qb3MpIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGh1bmsubGluZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgIGxldCBsaW5lID0gaHVuay5saW5lc1tqXSxcbiAgICAgICAgICBvcGVyYXRpb24gPSBsaW5lWzBdLFxuICAgICAgICAgIGNvbnRlbnQgPSBsaW5lLnN1YnN0cigxKTtcblxuICAgICAgaWYgKG9wZXJhdGlvbiA9PT0gJyAnIHx8IG9wZXJhdGlvbiA9PT0gJy0nKSB7XG4gICAgICAgIC8vIENvbnRleHQgc2FuaXR5IGNoZWNrXG4gICAgICAgIGlmICghY29tcGFyZUxpbmUodG9Qb3MgKyAxLCBsaW5lc1t0b1Bvc10sIG9wZXJhdGlvbiwgY29udGVudCkpIHtcbiAgICAgICAgICBlcnJvckNvdW50Kys7XG5cbiAgICAgICAgICBpZiAoZXJyb3JDb3VudCA+IGZ1enpGYWN0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdG9Qb3MrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFNlYXJjaCBiZXN0IGZpdCBvZmZzZXRzIGZvciBlYWNoIGh1bmsgYmFzZWQgb24gdGhlIHByZXZpb3VzIG9uZXNcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBodW5rcy5sZW5ndGg7IGkrKykge1xuICAgIGxldCBodW5rID0gaHVua3NbaV0sXG4gICAgICAgIG1heExpbmUgPSBsaW5lcy5sZW5ndGggLSBodW5rLm9sZExpbmVzLFxuICAgICAgICBsb2NhbE9mZnNldCA9IDAsXG4gICAgICAgIHRvUG9zID0gb2Zmc2V0ICsgaHVuay5vbGRTdGFydCAtIDE7XG5cbiAgICBsZXQgaXRlcmF0b3IgPSBkaXN0YW5jZUl0ZXJhdG9yKHRvUG9zLCBtaW5MaW5lLCBtYXhMaW5lKTtcblxuICAgIGZvciAoOyBsb2NhbE9mZnNldCAhPT0gdW5kZWZpbmVkOyBsb2NhbE9mZnNldCA9IGl0ZXJhdG9yKCkpIHtcbiAgICAgIGlmIChodW5rRml0cyhodW5rLCB0b1BvcyArIGxvY2FsT2Zmc2V0KSkge1xuICAgICAgICBodW5rLm9mZnNldCA9IG9mZnNldCArPSBsb2NhbE9mZnNldDtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxvY2FsT2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBTZXQgbG93ZXIgdGV4dCBsaW1pdCB0byBlbmQgb2YgdGhlIGN1cnJlbnQgaHVuaywgc28gbmV4dCBvbmVzIGRvbid0IHRyeVxuICAgIC8vIHRvIGZpdCBvdmVyIGFscmVhZHkgcGF0Y2hlZCB0ZXh0XG4gICAgbWluTGluZSA9IGh1bmsub2Zmc2V0ICsgaHVuay5vbGRTdGFydCArIGh1bmsub2xkTGluZXM7XG4gIH1cblxuICAvLyBBcHBseSBwYXRjaCBodW5rc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGh1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGh1bmsgPSBodW5rc1tpXSxcbiAgICAgICAgdG9Qb3MgPSBodW5rLm9mZnNldCArIGh1bmsubmV3U3RhcnQgLSAxO1xuXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBodW5rLmxpbmVzLmxlbmd0aDsgaisrKSB7XG4gICAgICBsZXQgbGluZSA9IGh1bmsubGluZXNbal0sXG4gICAgICAgICAgb3BlcmF0aW9uID0gbGluZVswXSxcbiAgICAgICAgICBjb250ZW50ID0gbGluZS5zdWJzdHIoMSk7XG5cbiAgICAgIGlmIChvcGVyYXRpb24gPT09ICcgJykge1xuICAgICAgICB0b1BvcysrO1xuICAgICAgfSBlbHNlIGlmIChvcGVyYXRpb24gPT09ICctJykge1xuICAgICAgICBsaW5lcy5zcGxpY2UodG9Qb3MsIDEpO1xuICAgICAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnKycpIHtcbiAgICAgICAgbGluZXMuc3BsaWNlKHRvUG9zLCAwLCBjb250ZW50KTtcbiAgICAgICAgdG9Qb3MrKztcbiAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnXFxcXCcpIHtcbiAgICAgICAgbGV0IHByZXZpb3VzT3BlcmF0aW9uID0gaHVuay5saW5lc1tqIC0gMV0gPyBodW5rLmxpbmVzW2ogLSAxXVswXSA6IG51bGw7XG4gICAgICAgIGlmIChwcmV2aW91c09wZXJhdGlvbiA9PT0gJysnKSB7XG4gICAgICAgICAgcmVtb3ZlRU9GTkwgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHByZXZpb3VzT3BlcmF0aW9uID09PSAnLScpIHtcbiAgICAgICAgICBhZGRFT0ZOTCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgRU9GTkwgaW5zZXJ0aW9uL3JlbW92YWxcbiAgaWYgKHJlbW92ZUVPRk5MKSB7XG4gICAgd2hpbGUgKCFsaW5lc1tsaW5lcy5sZW5ndGggLSAxXSkge1xuICAgICAgbGluZXMucG9wKCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGFkZEVPRk5MKSB7XG4gICAgbGluZXMucHVzaCgnJyk7XG4gIH1cbiAgcmV0dXJuIGxpbmVzLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBXcmFwcGVyIHRoYXQgc3VwcG9ydHMgbXVsdGlwbGUgZmlsZSBwYXRjaGVzIHZpYSBjYWxsYmFja3MuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlQYXRjaGVzKHVuaURpZmYsIG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiB1bmlEaWZmID09PSAnc3RyaW5nJykge1xuICAgIHVuaURpZmYgPSBwYXJzZVBhdGNoKHVuaURpZmYpO1xuICB9XG5cbiAgbGV0IGN1cnJlbnRJbmRleCA9IDA7XG4gIGZ1bmN0aW9uIHByb2Nlc3NJbmRleCgpIHtcbiAgICBsZXQgaW5kZXggPSB1bmlEaWZmW2N1cnJlbnRJbmRleCsrXTtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIG9wdGlvbnMubG9hZEZpbGUoaW5kZXgsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5jb21wbGV0ZShlcnIpO1xuICAgICAgfVxuXG4gICAgICBsZXQgdXBkYXRlZENvbnRlbnQgPSBhcHBseVBhdGNoKGRhdGEsIGluZGV4LCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMucGF0Y2hlZChpbmRleCwgdXBkYXRlZENvbnRlbnQpO1xuXG4gICAgICBzZXRUaW1lb3V0KHByb2Nlc3NJbmRleCwgMCk7XG4gICAgfSk7XG4gIH1cbiAgcHJvY2Vzc0luZGV4KCk7XG59XG4iXX0=


/***/ },
/* 15 */
/***/ function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/parsePatch = parsePatch;
	function parsePatch(uniDiff) {
	  /*istanbul ignore start*/var /*istanbul ignore end*/options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var diffstr = uniDiff.split('\n'),
	      list = [],
	      i = 0;

	  function parseIndex() {
	    var index = {};
	    list.push(index);

	    // Parse diff metadata
	    while (i < diffstr.length) {
	      var line = diffstr[i];

	      // File header found, end parsing diff metadata
	      if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
	        break;
	      }

	      // Diff index
	      var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);
	      if (header) {
	        index.index = header[1];
	      }

	      i++;
	    }

	    // Parse file headers if they are defined. Unified diff requires them, but
	    // there's no technical issues to have an isolated hunk without file header
	    parseFileHeader(index);
	    parseFileHeader(index);

	    // Parse hunks
	    index.hunks = [];

	    while (i < diffstr.length) {
	      var _line = diffstr[i];

	      if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
	        break;
	      } else if (/^@@/.test(_line)) {
	        index.hunks.push(parseHunk());
	      } else if (_line && options.strict) {
	        // Ignore unexpected content unless in strict mode
	        throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
	      } else {
	        i++;
	      }
	    }
	  }

	  // Parses the --- and +++ headers, if none are found, no lines
	  // are consumed.
	  function parseFileHeader(index) {
	    var fileHeader = /^(\-\-\-|\+\+\+)\s+(\S*)\s?(.*?)\s*$/.exec(diffstr[i]);
	    if (fileHeader) {
	      var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
	      index[keyPrefix + 'FileName'] = fileHeader[2];
	      index[keyPrefix + 'Header'] = fileHeader[3];

	      i++;
	    }
	  }

	  // Parses a hunk
	  // This assumes that we are at the start of a hunk.
	  function parseHunk() {
	    var chunkHeaderIndex = i,
	        chunkHeaderLine = diffstr[i++],
	        chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);

	    var hunk = {
	      oldStart: +chunkHeader[1],
	      oldLines: +chunkHeader[2] || 1,
	      newStart: +chunkHeader[3],
	      newLines: +chunkHeader[4] || 1,
	      lines: []
	    };

	    var addCount = 0,
	        removeCount = 0;
	    for (; i < diffstr.length; i++) {
	      var operation = diffstr[i][0];

	      if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
	        hunk.lines.push(diffstr[i]);

	        if (operation === '+') {
	          addCount++;
	        } else if (operation === '-') {
	          removeCount++;
	        } else if (operation === ' ') {
	          addCount++;
	          removeCount++;
	        }
	      } else {
	        break;
	      }
	    }

	    // Handle the empty block count case
	    if (!addCount && hunk.newLines === 1) {
	      hunk.newLines = 0;
	    }
	    if (!removeCount && hunk.oldLines === 1) {
	      hunk.oldLines = 0;
	    }

	    // Perform optional sanity checking
	    if (options.strict) {
	      if (addCount !== hunk.newLines) {
	        throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
	      }
	      if (removeCount !== hunk.oldLines) {
	        throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
	      }
	    }

	    return hunk;
	  }

	  while (i < diffstr.length) {
	    parseIndex();
	  }

	  return list;
	}
	//# sourceMappingURL=data:application/json;base64,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cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUGF0Y2godW5pRGlmZiwgb3B0aW9ucyA9IHt9KSB7XG4gIGxldCBkaWZmc3RyID0gdW5pRGlmZi5zcGxpdCgnXFxuJyksXG4gICAgICBsaXN0ID0gW10sXG4gICAgICBpID0gMDtcblxuICBmdW5jdGlvbiBwYXJzZUluZGV4KCkge1xuICAgIGxldCBpbmRleCA9IHt9O1xuICAgIGxpc3QucHVzaChpbmRleCk7XG5cbiAgICAvLyBQYXJzZSBkaWZmIG1ldGFkYXRhXG4gICAgd2hpbGUgKGkgPCBkaWZmc3RyLmxlbmd0aCkge1xuICAgICAgbGV0IGxpbmUgPSBkaWZmc3RyW2ldO1xuXG4gICAgICAvLyBGaWxlIGhlYWRlciBmb3VuZCwgZW5kIHBhcnNpbmcgZGlmZiBtZXRhZGF0YVxuICAgICAgaWYgKC9eKFxcLVxcLVxcLXxcXCtcXCtcXCt8QEApXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyBEaWZmIGluZGV4XG4gICAgICBsZXQgaGVhZGVyID0gKC9eKD86SW5kZXg6fGRpZmYoPzogLXIgXFx3KykrKVxccysoLis/KVxccyokLykuZXhlYyhsaW5lKTtcbiAgICAgIGlmIChoZWFkZXIpIHtcbiAgICAgICAgaW5kZXguaW5kZXggPSBoZWFkZXJbMV07XG4gICAgICB9XG5cbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICAvLyBQYXJzZSBmaWxlIGhlYWRlcnMgaWYgdGhleSBhcmUgZGVmaW5lZC4gVW5pZmllZCBkaWZmIHJlcXVpcmVzIHRoZW0sIGJ1dFxuICAgIC8vIHRoZXJlJ3Mgbm8gdGVjaG5pY2FsIGlzc3VlcyB0byBoYXZlIGFuIGlzb2xhdGVkIGh1bmsgd2l0aG91dCBmaWxlIGhlYWRlclxuICAgIHBhcnNlRmlsZUhlYWRlcihpbmRleCk7XG4gICAgcGFyc2VGaWxlSGVhZGVyKGluZGV4KTtcblxuICAgIC8vIFBhcnNlIGh1bmtzXG4gICAgaW5kZXguaHVua3MgPSBbXTtcblxuICAgIHdoaWxlIChpIDwgZGlmZnN0ci5sZW5ndGgpIHtcbiAgICAgIGxldCBsaW5lID0gZGlmZnN0cltpXTtcblxuICAgICAgaWYgKC9eKEluZGV4OnxkaWZmfFxcLVxcLVxcLXxcXCtcXCtcXCspXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIGlmICgvXkBALy50ZXN0KGxpbmUpKSB7XG4gICAgICAgIGluZGV4Lmh1bmtzLnB1c2gocGFyc2VIdW5rKCkpO1xuICAgICAgfSBlbHNlIGlmIChsaW5lICYmIG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICAgIC8vIElnbm9yZSB1bmV4cGVjdGVkIGNvbnRlbnQgdW5sZXNzIGluIHN0cmljdCBtb2RlXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBsaW5lICcgKyAoaSArIDEpICsgJyAnICsgSlNPTi5zdHJpbmdpZnkobGluZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnNlcyB0aGUgLS0tIGFuZCArKysgaGVhZGVycywgaWYgbm9uZSBhcmUgZm91bmQsIG5vIGxpbmVzXG4gIC8vIGFyZSBjb25zdW1lZC5cbiAgZnVuY3Rpb24gcGFyc2VGaWxlSGVhZGVyKGluZGV4KSB7XG4gICAgbGV0IGZpbGVIZWFkZXIgPSAoL14oXFwtXFwtXFwtfFxcK1xcK1xcKylcXHMrKFxcUyopXFxzPyguKj8pXFxzKiQvKS5leGVjKGRpZmZzdHJbaV0pO1xuICAgIGlmIChmaWxlSGVhZGVyKSB7XG4gICAgICBsZXQga2V5UHJlZml4ID0gZmlsZUhlYWRlclsxXSA9PT0gJy0tLScgPyAnb2xkJyA6ICduZXcnO1xuICAgICAgaW5kZXhba2V5UHJlZml4ICsgJ0ZpbGVOYW1lJ10gPSBmaWxlSGVhZGVyWzJdO1xuICAgICAgaW5kZXhba2V5UHJlZml4ICsgJ0hlYWRlciddID0gZmlsZUhlYWRlclszXTtcblxuICAgICAgaSsrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBhcnNlcyBhIGh1bmtcbiAgLy8gVGhpcyBhc3N1bWVzIHRoYXQgd2UgYXJlIGF0IHRoZSBzdGFydCBvZiBhIGh1bmsuXG4gIGZ1bmN0aW9uIHBhcnNlSHVuaygpIHtcbiAgICBsZXQgY2h1bmtIZWFkZXJJbmRleCA9IGksXG4gICAgICAgIGNodW5rSGVhZGVyTGluZSA9IGRpZmZzdHJbaSsrXSxcbiAgICAgICAgY2h1bmtIZWFkZXIgPSBjaHVua0hlYWRlckxpbmUuc3BsaXQoL0BAIC0oXFxkKykoPzosKFxcZCspKT8gXFwrKFxcZCspKD86LChcXGQrKSk/IEBALyk7XG5cbiAgICBsZXQgaHVuayA9IHtcbiAgICAgIG9sZFN0YXJ0OiArY2h1bmtIZWFkZXJbMV0sXG4gICAgICBvbGRMaW5lczogK2NodW5rSGVhZGVyWzJdIHx8IDEsXG4gICAgICBuZXdTdGFydDogK2NodW5rSGVhZGVyWzNdLFxuICAgICAgbmV3TGluZXM6ICtjaHVua0hlYWRlcls0XSB8fCAxLFxuICAgICAgbGluZXM6IFtdXG4gICAgfTtcblxuICAgIGxldCBhZGRDb3VudCA9IDAsXG4gICAgICAgIHJlbW92ZUNvdW50ID0gMDtcbiAgICBmb3IgKDsgaSA8IGRpZmZzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvcGVyYXRpb24gPSBkaWZmc3RyW2ldWzBdO1xuXG4gICAgICBpZiAob3BlcmF0aW9uID09PSAnKycgfHwgb3BlcmF0aW9uID09PSAnLScgfHwgb3BlcmF0aW9uID09PSAnICcgfHwgb3BlcmF0aW9uID09PSAnXFxcXCcpIHtcbiAgICAgICAgaHVuay5saW5lcy5wdXNoKGRpZmZzdHJbaV0pO1xuXG4gICAgICAgIGlmIChvcGVyYXRpb24gPT09ICcrJykge1xuICAgICAgICAgIGFkZENvdW50Kys7XG4gICAgICAgIH0gZWxzZSBpZiAob3BlcmF0aW9uID09PSAnLScpIHtcbiAgICAgICAgICByZW1vdmVDb3VudCsrO1xuICAgICAgICB9IGVsc2UgaWYgKG9wZXJhdGlvbiA9PT0gJyAnKSB7XG4gICAgICAgICAgYWRkQ291bnQrKztcbiAgICAgICAgICByZW1vdmVDb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgdGhlIGVtcHR5IGJsb2NrIGNvdW50IGNhc2VcbiAgICBpZiAoIWFkZENvdW50ICYmIGh1bmsubmV3TGluZXMgPT09IDEpIHtcbiAgICAgIGh1bmsubmV3TGluZXMgPSAwO1xuICAgIH1cbiAgICBpZiAoIXJlbW92ZUNvdW50ICYmIGh1bmsub2xkTGluZXMgPT09IDEpIHtcbiAgICAgIGh1bmsub2xkTGluZXMgPSAwO1xuICAgIH1cblxuICAgIC8vIFBlcmZvcm0gb3B0aW9uYWwgc2FuaXR5IGNoZWNraW5nXG4gICAgaWYgKG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICBpZiAoYWRkQ291bnQgIT09IGh1bmsubmV3TGluZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBZGRlZCBsaW5lIGNvdW50IGRpZCBub3QgbWF0Y2ggZm9yIGh1bmsgYXQgbGluZSAnICsgKGNodW5rSGVhZGVySW5kZXggKyAxKSk7XG4gICAgICB9XG4gICAgICBpZiAocmVtb3ZlQ291bnQgIT09IGh1bmsub2xkTGluZXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZW1vdmVkIGxpbmUgY291bnQgZGlkIG5vdCBtYXRjaCBmb3IgaHVuayBhdCBsaW5lICcgKyAoY2h1bmtIZWFkZXJJbmRleCArIDEpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaHVuaztcbiAgfVxuXG4gIHdoaWxlIChpIDwgZGlmZnN0ci5sZW5ndGgpIHtcbiAgICBwYXJzZUluZGV4KCk7XG4gIH1cblxuICByZXR1cm4gbGlzdDtcbn1cbiJdfQ==


/***/ },
/* 16 */
/***/ function(module, exports) {

	/*istanbul ignore start*/"use strict";

	exports.__esModule = true;

	exports.default = /*istanbul ignore end*/function (start, minLine, maxLine) {
	  var wantForward = true,
	      backwardExhausted = false,
	      forwardExhausted = false,
	      localOffset = 1;

	  return function iterator() {
	    if (wantForward && !forwardExhausted) {
	      if (backwardExhausted) {
	        localOffset++;
	      } else {
	        wantForward = false;
	      }

	      // Check if trying to fit beyond text length, and if not, check it fits
	      // after offset location (or desired location on first iteration)
	      if (start + localOffset <= maxLine) {
	        return localOffset;
	      }

	      forwardExhausted = true;
	    }

	    if (!backwardExhausted) {
	      if (!forwardExhausted) {
	        wantForward = true;
	      }

	      // Check if trying to fit before text beginning, and if not, check it fits
	      // before offset location
	      if (minLine <= start - localOffset) {
	        return - localOffset++;
	      }

	      backwardExhausted = true;
	      return iterator();
	    }

	    // We tried to fit hunk before text beginning and beyond text lenght, then
	    // hunk can't fit on the text. Return undefined
	  };
	};
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2Rpc3RhbmNlLWl0ZXJhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7eUNBR2UsVUFBUyxLQUFULEVBQWdCLE9BQWhCLEVBQXlCLE9BQXpCLEVBQWtDO0FBQy9DLE1BQUksY0FBYyxJQUFkO01BQ0Esb0JBQW9CLEtBQXBCO01BQ0EsbUJBQW1CLEtBQW5CO01BQ0EsY0FBYyxDQUFkLENBSjJDOztBQU0vQyxTQUFPLFNBQVMsUUFBVCxHQUFvQjtBQUN6QixRQUFJLGVBQWUsQ0FBQyxnQkFBRCxFQUFtQjtBQUNwQyxVQUFJLGlCQUFKLEVBQXVCO0FBQ3JCLHNCQURxQjtPQUF2QixNQUVPO0FBQ0wsc0JBQWMsS0FBZCxDQURLO09BRlA7Ozs7QUFEb0MsVUFTaEMsUUFBUSxXQUFSLElBQXVCLE9BQXZCLEVBQWdDO0FBQ2xDLGVBQU8sV0FBUCxDQURrQztPQUFwQzs7QUFJQSx5QkFBbUIsSUFBbkIsQ0Fib0M7S0FBdEM7O0FBZ0JBLFFBQUksQ0FBQyxpQkFBRCxFQUFvQjtBQUN0QixVQUFJLENBQUMsZ0JBQUQsRUFBbUI7QUFDckIsc0JBQWMsSUFBZCxDQURxQjtPQUF2Qjs7OztBQURzQixVQU9sQixXQUFXLFFBQVEsV0FBUixFQUFxQjtBQUNsQyxlQUFPLEVBQUMsYUFBRCxDQUQyQjtPQUFwQzs7QUFJQSwwQkFBb0IsSUFBcEIsQ0FYc0I7QUFZdEIsYUFBTyxVQUFQLENBWnNCO0tBQXhCOzs7O0FBakJ5QixHQUFwQixDQU53QztDQUFsQyIsImZpbGUiOiJkaXN0YW5jZS1pdGVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEl0ZXJhdG9yIHRoYXQgdHJhdmVyc2VzIGluIHRoZSByYW5nZSBvZiBbbWluLCBtYXhdLCBzdGVwcGluZ1xuLy8gYnkgZGlzdGFuY2UgZnJvbSBhIGdpdmVuIHN0YXJ0IHBvc2l0aW9uLiBJLmUuIGZvciBbMCwgNF0sIHdpdGhcbi8vIHN0YXJ0IG9mIDIsIHRoaXMgd2lsbCBpdGVyYXRlIDIsIDMsIDEsIDQsIDAuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGFydCwgbWluTGluZSwgbWF4TGluZSkge1xuICBsZXQgd2FudEZvcndhcmQgPSB0cnVlLFxuICAgICAgYmFja3dhcmRFeGhhdXN0ZWQgPSBmYWxzZSxcbiAgICAgIGZvcndhcmRFeGhhdXN0ZWQgPSBmYWxzZSxcbiAgICAgIGxvY2FsT2Zmc2V0ID0gMTtcblxuICByZXR1cm4gZnVuY3Rpb24gaXRlcmF0b3IoKSB7XG4gICAgaWYgKHdhbnRGb3J3YXJkICYmICFmb3J3YXJkRXhoYXVzdGVkKSB7XG4gICAgICBpZiAoYmFja3dhcmRFeGhhdXN0ZWQpIHtcbiAgICAgICAgbG9jYWxPZmZzZXQrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdhbnRGb3J3YXJkID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGlmIHRyeWluZyB0byBmaXQgYmV5b25kIHRleHQgbGVuZ3RoLCBhbmQgaWYgbm90LCBjaGVjayBpdCBmaXRzXG4gICAgICAvLyBhZnRlciBvZmZzZXQgbG9jYXRpb24gKG9yIGRlc2lyZWQgbG9jYXRpb24gb24gZmlyc3QgaXRlcmF0aW9uKVxuICAgICAgaWYgKHN0YXJ0ICsgbG9jYWxPZmZzZXQgPD0gbWF4TGluZSkge1xuICAgICAgICByZXR1cm4gbG9jYWxPZmZzZXQ7XG4gICAgICB9XG5cbiAgICAgIGZvcndhcmRFeGhhdXN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmICghYmFja3dhcmRFeGhhdXN0ZWQpIHtcbiAgICAgIGlmICghZm9yd2FyZEV4aGF1c3RlZCkge1xuICAgICAgICB3YW50Rm9yd2FyZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIENoZWNrIGlmIHRyeWluZyB0byBmaXQgYmVmb3JlIHRleHQgYmVnaW5uaW5nLCBhbmQgaWYgbm90LCBjaGVjayBpdCBmaXRzXG4gICAgICAvLyBiZWZvcmUgb2Zmc2V0IGxvY2F0aW9uXG4gICAgICBpZiAobWluTGluZSA8PSBzdGFydCAtIGxvY2FsT2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiAtbG9jYWxPZmZzZXQrKztcbiAgICAgIH1cblxuICAgICAgYmFja3dhcmRFeGhhdXN0ZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yKCk7XG4gICAgfVxuXG4gICAgLy8gV2UgdHJpZWQgdG8gZml0IGh1bmsgYmVmb3JlIHRleHQgYmVnaW5uaW5nIGFuZCBiZXlvbmQgdGV4dCBsZW5naHQsIHRoZW5cbiAgICAvLyBodW5rIGNhbid0IGZpdCBvbiB0aGUgdGV4dC4gUmV0dXJuIHVuZGVmaW5lZFxuICB9O1xufVxuIl19


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/structuredPatch = structuredPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createTwoFilesPatch = createTwoFilesPatch;
	/*istanbul ignore start*/exports. /*istanbul ignore end*/createPatch = createPatch;

	var /*istanbul ignore start*/_line = __webpack_require__(10) /*istanbul ignore end*/;

	/*istanbul ignore start*/
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	/*istanbul ignore end*/function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	  if (!options) {
	    options = { context: 4 };
	  }

	  var diff = /*istanbul ignore start*/(0, _line.diffLines) /*istanbul ignore end*/(oldStr, newStr);
	  diff.push({ value: '', lines: [] }); // Append an empty value to make cleanup easier

	  function contextLines(lines) {
	    return lines.map(function (entry) {
	      return ' ' + entry;
	    });
	  }

	  var hunks = [];
	  var oldRangeStart = 0,
	      newRangeStart = 0,
	      curRange = [],
	      oldLine = 1,
	      newLine = 1;
	  /*istanbul ignore start*/
	  var _loop = function _loop( /*istanbul ignore end*/i) {
	    var current = diff[i],
	        lines = current.lines || current.value.replace(/\n$/, '').split('\n');
	    current.lines = lines;

	    if (current.added || current.removed) {
	      /*istanbul ignore start*/
	      var _curRange;

	      /*istanbul ignore end*/
	      // If we have previous context, start with that
	      if (!oldRangeStart) {
	        var prev = diff[i - 1];
	        oldRangeStart = oldLine;
	        newRangeStart = newLine;

	        if (prev) {
	          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
	          oldRangeStart -= curRange.length;
	          newRangeStart -= curRange.length;
	        }
	      }

	      // Output our changes
	      /*istanbul ignore start*/(_curRange = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/lines.map(function (entry) {
	        return (current.added ? '+' : '-') + entry;
	      })));

	      // Track the updated file position
	      if (current.added) {
	        newLine += lines.length;
	      } else {
	        oldLine += lines.length;
	      }
	    } else {
	      // Identical context lines. Track line changes
	      if (oldRangeStart) {
	        // Close out any changes that have been output (or join overlapping)
	        if (lines.length <= options.context * 2 && i < diff.length - 2) {
	          /*istanbul ignore start*/
	          var _curRange2;

	          /*istanbul ignore end*/
	          // Overlapping
	          /*istanbul ignore start*/(_curRange2 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange2 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines)));
	        } else {
	          /*istanbul ignore start*/
	          var _curRange3;

	          /*istanbul ignore end*/
	          // end the range and output
	          var contextSize = Math.min(lines.length, options.context);
	          /*istanbul ignore start*/(_curRange3 = /*istanbul ignore end*/curRange).push. /*istanbul ignore start*/apply /*istanbul ignore end*/( /*istanbul ignore start*/_curRange3 /*istanbul ignore end*/, /*istanbul ignore start*/_toConsumableArray( /*istanbul ignore end*/contextLines(lines.slice(0, contextSize))));

	          var hunk = {
	            oldStart: oldRangeStart,
	            oldLines: oldLine - oldRangeStart + contextSize,
	            newStart: newRangeStart,
	            newLines: newLine - newRangeStart + contextSize,
	            lines: curRange
	          };
	          if (i >= diff.length - 2 && lines.length <= options.context) {
	            // EOF is inside this hunk
	            var oldEOFNewline = /\n$/.test(oldStr);
	            var newEOFNewline = /\n$/.test(newStr);
	            if (lines.length == 0 && !oldEOFNewline) {
	              // special case: old has no eol and no trailing context; no-nl can end up before adds
	              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
	            } else if (!oldEOFNewline || !newEOFNewline) {
	              curRange.push('\\ No newline at end of file');
	            }
	          }
	          hunks.push(hunk);

	          oldRangeStart = 0;
	          newRangeStart = 0;
	          curRange = [];
	        }
	      }
	      oldLine += lines.length;
	      newLine += lines.length;
	    }
	  };

	  for (var i = 0; i < diff.length; i++) {
	    /*istanbul ignore start*/
	    _loop( /*istanbul ignore end*/i);
	  }

	  return {
	    oldFileName: oldFileName, newFileName: newFileName,
	    oldHeader: oldHeader, newHeader: newHeader,
	    hunks: hunks
	  };
	}

	function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
	  var diff = structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options);

	  var ret = [];
	  if (oldFileName == newFileName) {
	    ret.push('Index: ' + oldFileName);
	  }
	  ret.push('===================================================================');
	  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
	  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

	  for (var i = 0; i < diff.hunks.length; i++) {
	    var hunk = diff.hunks[i];
	    ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
	    ret.push.apply(ret, hunk.lines);
	  }

	  return ret.join('\n') + '\n';
	}

	function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
	  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXRjaC9jcmVhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dDQUVnQjt5REE4RkE7eURBd0JBOztBQXhIaEI7Ozs7O3VCQUVPLFNBQVMsZUFBVCxDQUF5QixXQUF6QixFQUFzQyxXQUF0QyxFQUFtRCxNQUFuRCxFQUEyRCxNQUEzRCxFQUFtRSxTQUFuRSxFQUE4RSxTQUE5RSxFQUF5RixPQUF6RixFQUFrRztBQUN2RyxNQUFJLENBQUMsT0FBRCxFQUFVO0FBQ1osY0FBVSxFQUFFLFNBQVMsQ0FBVCxFQUFaLENBRFk7R0FBZDs7QUFJQSxNQUFNLE9BQU8sc0VBQVUsTUFBVixFQUFrQixNQUFsQixDQUFQLENBTGlHO0FBTXZHLE9BQUssSUFBTCxDQUFVLEVBQUMsT0FBTyxFQUFQLEVBQVcsT0FBTyxFQUFQLEVBQXRCOztBQU51RyxXQVE5RixZQUFULENBQXNCLEtBQXRCLEVBQTZCO0FBQzNCLFdBQU8sTUFBTSxHQUFOLENBQVUsVUFBUyxLQUFULEVBQWdCO0FBQUUsYUFBTyxNQUFNLEtBQU4sQ0FBVDtLQUFoQixDQUFqQixDQUQyQjtHQUE3Qjs7QUFJQSxNQUFJLFFBQVEsRUFBUixDQVptRztBQWF2RyxNQUFJLGdCQUFnQixDQUFoQjtNQUFtQixnQkFBZ0IsQ0FBaEI7TUFBbUIsV0FBVyxFQUFYO01BQ3RDLFVBQVUsQ0FBVjtNQUFhLFVBQVUsQ0FBVixDQWRzRjs7cURBZTlGO0FBQ1AsUUFBTSxVQUFVLEtBQUssQ0FBTCxDQUFWO1FBQ0EsUUFBUSxRQUFRLEtBQVIsSUFBaUIsUUFBUSxLQUFSLENBQWMsT0FBZCxDQUFzQixLQUF0QixFQUE2QixFQUE3QixFQUFpQyxLQUFqQyxDQUF1QyxJQUF2QyxDQUFqQjtBQUNkLFlBQVEsS0FBUixHQUFnQixLQUFoQjs7QUFFQSxRQUFJLFFBQVEsS0FBUixJQUFpQixRQUFRLE9BQVIsRUFBaUI7Ozs7OztBQUVwQyxVQUFJLENBQUMsYUFBRCxFQUFnQjtBQUNsQixZQUFNLE9BQU8sS0FB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LENBQVMsSUFBVCxJQUFpQixJQUFqQixDQXJCb0c7Q0FBdEc7O0FBd0JBLFNBQVMsV0FBVCxDQUFxQixRQUFyQixFQUErQixNQUEvQixFQUF1QyxNQUF2QyxFQUErQyxTQUEvQyxFQUEwRCxTQUExRCxFQUFxRSxPQUFyRSxFQUE4RTtBQUNuRixTQUFPLG9CQUFvQixRQUFwQixFQUE4QixRQUE5QixFQUF3QyxNQUF4QyxFQUFnRCxNQUFoRCxFQUF3RCxTQUF4RCxFQUFtRSxTQUFuRSxFQUE4RSxPQUE5RSxDQUFQLENBRG1GO0NBQTlFIiwiZmlsZSI6ImNyZWF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7ZGlmZkxpbmVzfSBmcm9tICcuLi9kaWZmL2xpbmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RydWN0dXJlZFBhdGNoKG9sZEZpbGVOYW1lLCBuZXdGaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7IGNvbnRleHQ6IDQgfTtcbiAgfVxuXG4gIGNvbnN0IGRpZmYgPSBkaWZmTGluZXMob2xkU3RyLCBuZXdTdHIpO1xuICBkaWZmLnB1c2goe3ZhbHVlOiAnJywgbGluZXM6IFtdfSk7ICAgLy8gQXBwZW5kIGFuIGVtcHR5IHZhbHVlIHRvIG1ha2UgY2xlYW51cCBlYXNpZXJcblxuICBmdW5jdGlvbiBjb250ZXh0TGluZXMobGluZXMpIHtcbiAgICByZXR1cm4gbGluZXMubWFwKGZ1bmN0aW9uKGVudHJ5KSB7IHJldHVybiAnICcgKyBlbnRyeTsgfSk7XG4gIH1cblxuICBsZXQgaHVua3MgPSBbXTtcbiAgbGV0IG9sZFJhbmdlU3RhcnQgPSAwLCBuZXdSYW5nZVN0YXJ0ID0gMCwgY3VyUmFuZ2UgPSBbXSxcbiAgICAgIG9sZExpbmUgPSAxLCBuZXdMaW5lID0gMTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWZmLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY3VycmVudCA9IGRpZmZbaV0sXG4gICAgICAgICAgbGluZXMgPSBjdXJyZW50LmxpbmVzIHx8IGN1cnJlbnQudmFsdWUucmVwbGFjZSgvXFxuJC8sICcnKS5zcGxpdCgnXFxuJyk7XG4gICAgY3VycmVudC5saW5lcyA9IGxpbmVzO1xuXG4gICAgaWYgKGN1cnJlbnQuYWRkZWQgfHwgY3VycmVudC5yZW1vdmVkKSB7XG4gICAgICAvLyBJZiB3ZSBoYXZlIHByZXZpb3VzIGNvbnRleHQsIHN0YXJ0IHdpdGggdGhhdFxuICAgICAgaWYgKCFvbGRSYW5nZVN0YXJ0KSB7XG4gICAgICAgIGNvbnN0IHByZXYgPSBkaWZmW2kgLSAxXTtcbiAgICAgICAgb2xkUmFuZ2VTdGFydCA9IG9sZExpbmU7XG4gICAgICAgIG5ld1JhbmdlU3RhcnQgPSBuZXdMaW5lO1xuXG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgY3VyUmFuZ2UgPSBvcHRpb25zLmNvbnRleHQgPiAwID8gY29udGV4dExpbmVzKHByZXYubGluZXMuc2xpY2UoLW9wdGlvbnMuY29udGV4dCkpIDogW107XG4gICAgICAgICAgb2xkUmFuZ2VTdGFydCAtPSBjdXJSYW5nZS5sZW5ndGg7XG4gICAgICAgICAgbmV3UmFuZ2VTdGFydCAtPSBjdXJSYW5nZS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gT3V0cHV0IG91ciBjaGFuZ2VzXG4gICAgICBjdXJSYW5nZS5wdXNoKC4uLiBsaW5lcy5tYXAoZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIChjdXJyZW50LmFkZGVkID8gJysnIDogJy0nKSArIGVudHJ5O1xuICAgICAgfSkpO1xuXG4gICAgICAvLyBUcmFjayB0aGUgdXBkYXRlZCBmaWxlIHBvc2l0aW9uXG4gICAgICBpZiAoY3VycmVudC5hZGRlZCkge1xuICAgICAgICBuZXdMaW5lICs9IGxpbmVzLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9sZExpbmUgKz0gbGluZXMubGVuZ3RoO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZGVudGljYWwgY29udGV4dCBsaW5lcy4gVHJhY2sgbGluZSBjaGFuZ2VzXG4gICAgICBpZiAob2xkUmFuZ2VTdGFydCkge1xuICAgICAgICAvLyBDbG9zZSBvdXQgYW55IGNoYW5nZXMgdGhhdCBoYXZlIGJlZW4gb3V0cHV0IChvciBqb2luIG92ZXJsYXBwaW5nKVxuICAgICAgICBpZiAobGluZXMubGVuZ3RoIDw9IG9wdGlvbnMuY29udGV4dCAqIDIgJiYgaSA8IGRpZmYubGVuZ3RoIC0gMikge1xuICAgICAgICAgIC8vIE92ZXJsYXBwaW5nXG4gICAgICAgICAgY3VyUmFuZ2UucHVzaCguLi4gY29udGV4dExpbmVzKGxpbmVzKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZW5kIHRoZSByYW5nZSBhbmQgb3V0cHV0XG4gICAgICAgICAgbGV0IGNvbnRleHRTaXplID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBvcHRpb25zLmNvbnRleHQpO1xuICAgICAgICAgIGN1clJhbmdlLnB1c2goLi4uIGNvbnRleHRMaW5lcyhsaW5lcy5zbGljZSgwLCBjb250ZXh0U2l6ZSkpKTtcblxuICAgICAgICAgIGxldCBodW5rID0ge1xuICAgICAgICAgICAgb2xkU3RhcnQ6IG9sZFJhbmdlU3RhcnQsXG4gICAgICAgICAgICBvbGRMaW5lczogKG9sZExpbmUgLSBvbGRSYW5nZVN0YXJ0ICsgY29udGV4dFNpemUpLFxuICAgICAgICAgICAgbmV3U3RhcnQ6IG5ld1JhbmdlU3RhcnQsXG4gICAgICAgICAgICBuZXdMaW5lczogKG5ld0xpbmUgLSBuZXdSYW5nZVN0YXJ0ICsgY29udGV4dFNpemUpLFxuICAgICAgICAgICAgbGluZXM6IGN1clJhbmdlXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAoaSA+PSBkaWZmLmxlbmd0aCAtIDIgJiYgbGluZXMubGVuZ3RoIDw9IG9wdGlvbnMuY29udGV4dCkge1xuICAgICAgICAgICAgLy8gRU9GIGlzIGluc2lkZSB0aGlzIGh1bmtcbiAgICAgICAgICAgIGxldCBvbGRFT0ZOZXdsaW5lID0gKC9cXG4kLy50ZXN0KG9sZFN0cikpO1xuICAgICAgICAgICAgbGV0IG5ld0VPRk5ld2xpbmUgPSAoL1xcbiQvLnRlc3QobmV3U3RyKSk7XG4gICAgICAgICAgICBpZiAobGluZXMubGVuZ3RoID09IDAgJiYgIW9sZEVPRk5ld2xpbmUpIHtcbiAgICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlOiBvbGQgaGFzIG5vIGVvbCBhbmQgbm8gdHJhaWxpbmcgY29udGV4dDsgbm8tbmwgY2FuIGVuZCB1cCBiZWZvcmUgYWRkc1xuICAgICAgICAgICAgICBjdXJSYW5nZS5zcGxpY2UoaHVuay5vbGRMaW5lcywgMCwgJ1xcXFwgTm8gbmV3bGluZSBhdCBlbmQgb2YgZmlsZScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghb2xkRU9GTmV3bGluZSB8fCAhbmV3RU9GTmV3bGluZSkge1xuICAgICAgICAgICAgICBjdXJSYW5nZS5wdXNoKCdcXFxcIE5vIG5ld2xpbmUgYXQgZW5kIG9mIGZpbGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaHVua3MucHVzaChodW5rKTtcblxuICAgICAgICAgIG9sZFJhbmdlU3RhcnQgPSAwO1xuICAgICAgICAgIG5ld1JhbmdlU3RhcnQgPSAwO1xuICAgICAgICAgIGN1clJhbmdlID0gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG9sZExpbmUgKz0gbGluZXMubGVuZ3RoO1xuICAgICAgbmV3TGluZSArPSBsaW5lcy5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvbGRGaWxlTmFtZTogb2xkRmlsZU5hbWUsIG5ld0ZpbGVOYW1lOiBuZXdGaWxlTmFtZSxcbiAgICBvbGRIZWFkZXI6IG9sZEhlYWRlciwgbmV3SGVhZGVyOiBuZXdIZWFkZXIsXG4gICAgaHVua3M6IGh1bmtzXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUd29GaWxlc1BhdGNoKG9sZEZpbGVOYW1lLCBuZXdGaWxlTmFtZSwgb2xkU3RyLCBuZXdTdHIsIG9sZEhlYWRlciwgbmV3SGVhZGVyLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRpZmYgPSBzdHJ1Y3R1cmVkUGF0Y2gob2xkRmlsZU5hbWUsIG5ld0ZpbGVOYW1lLCBvbGRTdHIsIG5ld1N0ciwgb2xkSGVhZGVyLCBuZXdIZWFkZXIsIG9wdGlvbnMpO1xuXG4gIGNvbnN0IHJldCA9IFtdO1xuICBpZiAob2xkRmlsZU5hbWUgPT0gbmV3RmlsZU5hbWUpIHtcbiAgICByZXQucHVzaCgnSW5kZXg6ICcgKyBvbGRGaWxlTmFtZSk7XG4gIH1cbiAgcmV0LnB1c2goJz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0nKTtcbiAgcmV0LnB1c2goJy0tLSAnICsgZGlmZi5vbGRGaWxlTmFtZSArICh0eXBlb2YgZGlmZi5vbGRIZWFkZXIgPT09ICd1bmRlZmluZWQnID8gJycgOiAnXFx0JyArIGRpZmYub2xkSGVhZGVyKSk7XG4gIHJldC5wdXNoKCcrKysgJyArIGRpZmYubmV3RmlsZU5hbWUgKyAodHlwZW9mIGRpZmYubmV3SGVhZGVyID09PSAndW5kZWZpbmVkJyA/ICcnIDogJ1xcdCcgKyBkaWZmLm5ld0hlYWRlcikpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGlmZi5odW5rcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGh1bmsgPSBkaWZmLmh1bmtzW2ldO1xuICAgIHJldC5wdXNoKFxuICAgICAgJ0BAIC0nICsgaHVuay5vbGRTdGFydCArICcsJyArIGh1bmsub2xkTGluZXNcbiAgICAgICsgJyArJyArIGh1bmsubmV3U3RhcnQgKyAnLCcgKyBodW5rLm5ld0xpbmVzXG4gICAgICArICcgQEAnXG4gICAgKTtcbiAgICByZXQucHVzaC5hcHBseShyZXQsIGh1bmsubGluZXMpO1xuICB9XG5cbiAgcmV0dXJuIHJldC5qb2luKCdcXG4nKSArICdcXG4nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGF0Y2goZmlsZU5hbWUsIG9sZFN0ciwgbmV3U3RyLCBvbGRIZWFkZXIsIG5ld0hlYWRlciwgb3B0aW9ucykge1xuICByZXR1cm4gY3JlYXRlVHdvRmlsZXNQYXRjaChmaWxlTmFtZSwgZmlsZU5hbWUsIG9sZFN0ciwgbmV3U3RyLCBvbGRIZWFkZXIsIG5ld0hlYWRlciwgb3B0aW9ucyk7XG59XG4iXX0=


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*istanbul ignore start*/"use strict";

	exports.__esModule = true;
	exports. /*istanbul ignore end*/convertChangesToDMP = convertChangesToDMP;
	// See: http://code.google.com/p/google-diff-match-patch/wiki/API
	function convertChangesToDMP(changes) {
	  var ret = [],
	      change = /*istanbul ignore start*/void 0 /*istanbul ignore end*/,
	      operation = /*istanbul ignore start*/void 0 /*istanbul ignore end*/;
	  for (var i = 0; i < changes.length; i++) {
	    change = changes[i];
	    if (change.added) {
	      operation = 1;
	    } else if (change.removed) {
	      operation = -1;
	    } else {
	      operation = 0;
	    }

	    ret.push([operation, change.value]);
	  }
	  return ret;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0L2RtcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0NBQ2dCOztBQUFULFNBQVMsbUJBQVQsQ0FBNkIsT0FBN0IsRUFBc0M7QUFDM0MsTUFBSSxNQUFNLEVBQU47TUFDQSxnRUFESjtNQUVJLG1FQUZKLENBRDJDO0FBSTNDLE9BQUssSUFBSSxJQUFJLENBQUosRUFBTyxJQUFJLFFBQVEsTUFBUixFQUFnQixHQUFwQyxFQUF5QztBQUN2QyxhQUFTLFFBQVEsQ0FBUixDQUFULENBRHVDO0FBRXZDLFFBQUksT0FBTyxLQUFQLEVBQWM7QUFDaEIsa0JBQVksQ0FBWixDQURnQjtLQUFsQixNQUVPLElBQUksT0FBTyxPQUFQLEVBQWdCO0FBQ3pCLGtCQUFZLENBQUMsQ0FBRCxDQURhO0tBQXBCLE1BRUE7QUFDTCxrQkFBWSxDQUFaLENBREs7S0FGQTs7QUFNUCxRQUFJLElBQUosQ0FBUyxDQUFDLFNBQUQsRUFBWSxPQUFPLEtBQVAsQ0FBckIsRUFWdUM7R0FBekM7QUFZQSxTQUFPLEdBQVAsQ0FoQjJDO0NBQXRDIiwiZmlsZSI6ImRtcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNlZTogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1kaWZmLW1hdGNoLXBhdGNoL3dpa2kvQVBJXG5leHBvcnQgZnVuY3Rpb24gY29udmVydENoYW5nZXNUb0RNUChjaGFuZ2VzKSB7XG4gIGxldCByZXQgPSBbXSxcbiAgICAgIGNoYW5nZSxcbiAgICAgIG9wZXJhdGlvbjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY2hhbmdlID0gY2hhbmdlc1tpXTtcbiAgICBpZiAoY2hhbmdlLmFkZGVkKSB7XG4gICAgICBvcGVyYXRpb24gPSAxO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlLnJlbW92ZWQpIHtcbiAgICAgIG9wZXJhdGlvbiA9IC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcGVyYXRpb24gPSAwO1xuICAgIH1cblxuICAgIHJldC5wdXNoKFtvcGVyYXRpb24sIGNoYW5nZS52YWx1ZV0pO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG4iXX0=


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*istanbul ignore start*/'use strict';

	exports.__esModule = true;
	exports. /*istanbul ignore end*/convertChangesToXML = convertChangesToXML;
	function convertChangesToXML(changes) {
	  var ret = [];
	  for (var i = 0; i < changes.length; i++) {
	    var change = changes[i];
	    if (change.added) {
	      ret.push('<ins>');
	    } else if (change.removed) {
	      ret.push('<del>');
	    }

	    ret.push(escapeHTML(change.value));

	    if (change.added) {
	      ret.push('</ins>');
	    } else if (change.removed) {
	      ret.push('</del>');
	    }
	  }
	  return ret.join('');
	}

	function escapeHTML(s) {
	  var n = s;
	  n = n.replace(/&/g, '&amp;');
	  n = n.replace(/</g, '&lt;');
	  n = n.replace(/>/g, '&gt;');
	  n = n.replace(/"/g, '&quot;');

	  return n;
	}
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb252ZXJ0L3htbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Z0NBQWdCO0FBQVQsU0FBUyxtQkFBVCxDQUE2QixPQUE3QixFQUFzQztBQUMzQyxNQUFJLE1BQU0sRUFBTixDQUR1QztBQUUzQyxPQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxRQUFRLE1BQVIsRUFBZ0IsR0FBcEMsRUFBeUM7QUFDdkMsUUFBSSxTQUFTLFFBQVEsQ0FBUixDQUFULENBRG1DO0FBRXZDLFFBQUksT0FBTyxLQUFQLEVBQWM7QUFDaEIsVUFBSSxJQUFKLENBQVMsT0FBVCxFQURnQjtLQUFsQixNQUVPLElBQUksT0FBTyxPQUFQLEVBQWdCO0FBQ3pCLFVBQUksSUFBSixDQUFTLE9BQVQsRUFEeUI7S0FBcEI7O0FBSVAsUUFBSSxJQUFKLENBQVMsV0FBVyxPQUFPLEtBQVAsQ0FBcEIsRUFSdUM7O0FBVXZDLFFBQUksT0FBTyxLQUFQLEVBQWM7QUFDaEIsVUFBSSxJQUFKLENBQVMsUUFBVCxFQURnQjtLQUFsQixNQUVPLElBQUksT0FBTyxPQUFQLEVBQWdCO0FBQ3pCLFVBQUksSUFBSixDQUFTLFFBQVQsRUFEeUI7S0FBcEI7R0FaVDtBQWdCQSxTQUFPLElBQUksSUFBSixDQUFTLEVBQVQsQ0FBUCxDQWxCMkM7Q0FBdEM7O0FBcUJQLFNBQVMsVUFBVCxDQUFvQixDQUFwQixFQUF1QjtBQUNyQixNQUFJLElBQUksQ0FBSixDQURpQjtBQUVyQixNQUFJLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZ0IsT0FBaEIsQ0FBSixDQUZxQjtBQUdyQixNQUFJLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZ0IsTUFBaEIsQ0FBSixDQUhxQjtBQUlyQixNQUFJLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZ0IsTUFBaEIsQ0FBSixDQUpxQjtBQUtyQixNQUFJLEVBQUUsT0FBRixDQUFVLElBQVYsRUFBZ0IsUUFBaEIsQ0FBSixDQUxxQjs7QUFPckIsU0FBTyxDQUFQLENBUHFCO0NBQXZCIiwiZmlsZSI6InhtbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0Q2hhbmdlc1RvWE1MKGNoYW5nZXMpIHtcbiAgbGV0IHJldCA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgY2hhbmdlID0gY2hhbmdlc1tpXTtcbiAgICBpZiAoY2hhbmdlLmFkZGVkKSB7XG4gICAgICByZXQucHVzaCgnPGlucz4nKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZS5yZW1vdmVkKSB7XG4gICAgICByZXQucHVzaCgnPGRlbD4nKTtcbiAgICB9XG5cbiAgICByZXQucHVzaChlc2NhcGVIVE1MKGNoYW5nZS52YWx1ZSkpO1xuXG4gICAgaWYgKGNoYW5nZS5hZGRlZCkge1xuICAgICAgcmV0LnB1c2goJzwvaW5zPicpO1xuICAgIH0gZWxzZSBpZiAoY2hhbmdlLnJlbW92ZWQpIHtcbiAgICAgIHJldC5wdXNoKCc8L2RlbD4nKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldC5qb2luKCcnKTtcbn1cblxuZnVuY3Rpb24gZXNjYXBlSFRNTChzKSB7XG4gIGxldCBuID0gcztcbiAgbiA9IG4ucmVwbGFjZSgvJi9nLCAnJmFtcDsnKTtcbiAgbiA9IG4ucmVwbGFjZSgvPC9nLCAnJmx0OycpO1xuICBuID0gbi5yZXBsYWNlKC8+L2csICcmZ3Q7Jyk7XG4gIG4gPSBuLnJlcGxhY2UoL1wiL2csICcmcXVvdDsnKTtcblxuICByZXR1cm4gbjtcbn1cbiJdfQ==


/***/ },
/* 20 */
/***/ function(module, exports) {

	/*
	 *
	 * Rematch (rematch.js)
	 * Matching two sequences of objects by similarity
	 * Author: W. Illmeyer, Nexxar GmbH
	 *
	 */

	(function() {

	  var Rematch = {};
	  Rematch.arrayToString = function arrayToString(a) {
	    if (Object.prototype.toString.apply(a, []) === "[object Array]") {
	      return "[" + a.map(arrayToString).join(", ") + "]";
	    } else {
	      return a;
	    }
	  };

	  /*
	   Copyright (c) 2011 Andrei Mackenzie
	   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
	   documentation files (the "Software"), to deal in the Software without restriction, including without limitation
	   the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
	   and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
	   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
	   THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	   TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	   */
	  function levenshtein(a, b) {
	    if (a.length == 0) {
	      return b.length;
	    }
	    if (b.length == 0) {
	      return a.length;
	    }

	    var matrix = [];

	    // Increment along the first column of each row
	    var i;
	    for (i = 0; i <= b.length; i++) {
	      matrix[i] = [i];
	    }

	    // Increment each column in the first row
	    var j;
	    for (j = 0; j <= a.length; j++) {
	      matrix[0][j] = j;
	    }

	    // Fill in the rest of the matrix
	    for (i = 1; i <= b.length; i++) {
	      for (j = 1; j <= a.length; j++) {
	        if (b.charAt(i - 1) == a.charAt(j - 1)) {
	          matrix[i][j] = matrix[i - 1][j - 1];
	        } else {
	          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // Substitution
	            Math.min(matrix[i][j - 1] + 1, // Insertion
	              matrix[i - 1][j] + 1)); // Deletion
	        }
	      }
	    }

	    return matrix[b.length][a.length];
	  }

	  Rematch.levenshtein = levenshtein;

	  Rematch.distance = function distance(x, y) {
	    x = x.trim();
	    y = y.trim();
	    var lev = levenshtein(x, y);
	    var score = lev / (x.length + y.length);

	    return score;
	  };

	  Rematch.rematch = function rematch(distanceFunction) {
	    function findBestMatch(a, b, cache) {
	      var cachecount = 0;

	      for (var key in cache) {
	        cachecount++;
	      }

	      var bestMatchDist = Infinity;
	      var bestMatch;
	      for (var i = 0; i < a.length; ++i) {
	        for (var j = 0; j < b.length; ++j) {
	          var cacheKey = JSON.stringify([a[i], b[j]]);
	          var md;
	          if (cache.hasOwnProperty(cacheKey)) {
	            md = cache[cacheKey];
	          } else {
	            md = distanceFunction(a[i], b[j]);
	            cache[cacheKey] = md;
	          }
	          if (md < bestMatchDist) {
	            bestMatchDist = md;
	            bestMatch = {indexA: i, indexB: j, score: bestMatchDist};
	          }
	        }
	      }

	      return bestMatch;
	    }

	    function group(a, b, level, cache) {
	      if (typeof (cache) === "undefined") {
	        cache = {};
	      }

	      var bm = findBestMatch(a, b, cache);

	      if (!level) {
	        level = 0;
	      }

	      if (!bm || (a.length + b.length < 3)) {
	        return [[a, b]];
	      }

	      var a1 = a.slice(0, bm.indexA);
	      var b1 = b.slice(0, bm.indexB);
	      var aMatch = [a[bm.indexA]];
	      var bMatch = [b[bm.indexB]];
	      var tailA = bm.indexA + 1;
	      var tailB = bm.indexB + 1;
	      var a2 = a.slice(tailA);
	      var b2 = b.slice(tailB);

	      var group1 = group(a1, b1, level + 1, cache);
	      var groupMatch = group(aMatch, bMatch, level + 1, cache);
	      var group2 = group(a2, b2, level + 1, cache);
	      var result = groupMatch;

	      if (bm.indexA > 0 || bm.indexB > 0) {
	        result = group1.concat(result);
	      }

	      if (a.length > tailA || b.length > tailB) {
	        result = result.concat(group2);
	      }

	      return result;
	    }

	    return group;
	  };

	  module.exports.Rematch = Rematch;

	})();


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * HtmlPrinter (html-printer.js)
	 * Author: rtfpessoa
	 *
	 */

	(function() {

	  var LineByLinePrinter = __webpack_require__(22).LineByLinePrinter;
	  var SideBySidePrinter = __webpack_require__(39).SideBySidePrinter;

	  function HtmlPrinter() {
	  }

	  HtmlPrinter.prototype.generateLineByLineJsonHtml = function(diffFiles, config) {
	    var lineByLinePrinter = new LineByLinePrinter(config);
	    return lineByLinePrinter.generateLineByLineJsonHtml(diffFiles);
	  };

	  HtmlPrinter.prototype.generateSideBySideJsonHtml = function(diffFiles, config) {
	    var sideBySidePrinter = new SideBySidePrinter(config);
	    return sideBySidePrinter.generateSideBySideJsonHtml(diffFiles);
	  };

	  module.exports.HtmlPrinter = new HtmlPrinter();

	})();


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * LineByLinePrinter (line-by-line-printer.js)
	 * Author: rtfpessoa
	 *
	 */

	(function() {

	  var diffParser = __webpack_require__(1).DiffParser;
	  var printerUtils = __webpack_require__(4).PrinterUtils;
	  var utils = __webpack_require__(2).Utils;
	  var Rematch = __webpack_require__(20).Rematch;

	  var nunjucksUtils = __webpack_require__(23).NunjucksUtils;
	  var baseTemplatesPath = 'line-by-line';

	  function LineByLinePrinter(config) {
	    this.config = config;
	  }

	  LineByLinePrinter.prototype.makeFileDiffHtml = function(file, diffs) {
	    return nunjucksUtils.render(baseTemplatesPath, 'file-diff.html', {'file': file, 'diffs': diffs});
	  };

	  LineByLinePrinter.prototype.makeLineByLineHtmlWrapper = function(content) {
	    return nunjucksUtils.render(baseTemplatesPath, 'wrapper.html', {'content': content});
	  };

	  LineByLinePrinter.prototype.generateLineByLineJsonHtml = function(diffFiles) {
	    var that = this;
	    var htmlDiffs = diffFiles.map(function(file) {
	      var diffs;
	      if (file.blocks.length) {
	        diffs = that._generateFileHtml(file);
	      } else {
	        diffs = that._generateEmptyDiff();
	      }
	      return that.makeFileDiffHtml(file, diffs);
	    });

	    return this.makeLineByLineHtmlWrapper(htmlDiffs.join('\n'));
	  };

	  var matcher = Rematch.rematch(function(a, b) {
	    var amod = a.content.substr(1);
	    var bmod = b.content.substr(1);

	    return Rematch.distance(amod, bmod);
	  });

	  LineByLinePrinter.prototype.makeColumnLineNumberHtml = function(block) {
	    return nunjucksUtils.render(baseTemplatesPath, 'column-line-number.html', {block: block});
	  };

	  LineByLinePrinter.prototype._generateFileHtml = function(file) {
	    var that = this;
	    return file.blocks.map(function(block) {

	      var lines = that.makeColumnLineNumberHtml(block);
	      var oldLines = [];
	      var newLines = [];

	      function processChangeBlock() {
	        var matches;
	        var insertType;
	        var deleteType;

	        var doMatching = that.config.matching === 'lines' || that.config.matching === 'words';

	        if (doMatching) {
	          matches = matcher(oldLines, newLines);
	          insertType = diffParser.LINE_TYPE.INSERT_CHANGES;
	          deleteType = diffParser.LINE_TYPE.DELETE_CHANGES;
	        } else {
	          matches = [[oldLines, newLines]];
	          insertType = diffParser.LINE_TYPE.INSERTS;
	          deleteType = diffParser.LINE_TYPE.DELETES;
	        }

	        matches.forEach(function(match) {
	          oldLines = match[0];
	          newLines = match[1];

	          var processedOldLines = [];
	          var processedNewLines = [];

	          var common = Math.min(oldLines.length, newLines.length);

	          var oldLine, newLine;
	          for (var j = 0; j < common; j++) {
	            oldLine = oldLines[j];
	            newLine = newLines[j];

	            that.config.isCombined = file.isCombined;
	            var diff = printerUtils.diffHighlight(oldLine.content, newLine.content, that.config);

	            processedOldLines +=
	              that.makeLineHtml(deleteType, oldLine.oldNumber, oldLine.newNumber,
	                diff.first.line, diff.first.prefix);
	            processedNewLines +=
	              that.makeLineHtml(insertType, newLine.oldNumber, newLine.newNumber,
	                diff.second.line, diff.second.prefix);
	          }

	          lines += processedOldLines + processedNewLines;
	          lines += that._processLines(oldLines.slice(common), newLines.slice(common));
	        });

	        oldLines = [];
	        newLines = [];
	      }

	      for (var i = 0; i < block.lines.length; i++) {
	        var line = block.lines[i];
	        var escapedLine = utils.escape(line.content);

	        if (line.type !== diffParser.LINE_TYPE.INSERTS &&
	          (newLines.length > 0 || (line.type !== diffParser.LINE_TYPE.DELETES && oldLines.length > 0))) {
	          processChangeBlock();
	        }

	        if (line.type === diffParser.LINE_TYPE.CONTEXT) {
	          lines += that.makeLineHtml(line.type, line.oldNumber, line.newNumber, escapedLine);
	        } else if (line.type === diffParser.LINE_TYPE.INSERTS && !oldLines.length) {
	          lines += that.makeLineHtml(line.type, line.oldNumber, line.newNumber, escapedLine);
	        } else if (line.type === diffParser.LINE_TYPE.DELETES) {
	          oldLines.push(line);
	        } else if (line.type === diffParser.LINE_TYPE.INSERTS && Boolean(oldLines.length)) {
	          newLines.push(line);
	        } else {
	          console.error('Unknown state in html line-by-line generator');
	          processChangeBlock();
	        }
	      }

	      processChangeBlock();

	      return lines;
	    }).join('\n');
	  };

	  LineByLinePrinter.prototype._processLines = function(oldLines, newLines) {
	    var lines = '';

	    for (var i = 0; i < oldLines.length; i++) {
	      var oldLine = oldLines[i];
	      var oldEscapedLine = utils.escape(oldLine.content);
	      lines += this.makeLineHtml(oldLine.type, oldLine.oldNumber, oldLine.newNumber, oldEscapedLine);
	    }

	    for (var j = 0; j < newLines.length; j++) {
	      var newLine = newLines[j];
	      var newEscapedLine = utils.escape(newLine.content);
	      lines += this.makeLineHtml(newLine.type, newLine.oldNumber, newLine.newNumber, newEscapedLine);
	    }

	    return lines;
	  };

	  LineByLinePrinter.prototype.makeLineHtml = function(type, oldNumber, newNumber, content, prefix) {
	    return nunjucksUtils.render(baseTemplatesPath, 'line.html',
	      {
	        type: type,
	        oldNumber: oldNumber,
	        newNumber: newNumber,
	        prefix: prefix,
	        content: content
	      });
	  };

	  LineByLinePrinter.prototype._generateEmptyDiff = function() {
	    return nunjucksUtils.render(baseTemplatesPath, 'empty-diff.html', {});
	  };

	  module.exports.LineByLinePrinter = LineByLinePrinter;

	})();


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {/*
	 *
	 * Utils (utils.js)
	 * Author: rtfpessoa
	 *
	 */

	(function() {

	  var path = __webpack_require__(24);

	  var nunjucks = __webpack_require__(26);
	  var templatesPath = path.resolve(__dirname, 'templates');

	  var diffParser = __webpack_require__(1).DiffParser;
	  var printerUtils = __webpack_require__(4).PrinterUtils;
	  var utils = __webpack_require__(2).Utils;

	  var nunjucksEnv = nunjucks.configure(templatesPath, {"autoescape": false})
	    .addGlobal('printerUtils', printerUtils)
	    .addGlobal('utils', utils)
	    .addGlobal('diffParser', diffParser);

	  function NunjucksUtils() {
	  }

	  NunjucksUtils.prototype.render = function(namespace, view, params) {
	    var viewPath = path.join(namespace, view);
	    return nunjucksEnv.render(viewPath, params);
	  };

	  module.exports.NunjucksUtils = new NunjucksUtils();

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(25)))

/***/ },
/* 25 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lib = __webpack_require__(27);
	var env = __webpack_require__(28);
	var Loader = __webpack_require__(37);
	var loaders = __webpack_require__(32);
	var precompile = __webpack_require__(32);

	module.exports = {};
	module.exports.Environment = env.Environment;
	module.exports.Template = env.Template;

	module.exports.Loader = Loader;
	module.exports.FileSystemLoader = loaders.FileSystemLoader;
	module.exports.PrecompiledLoader = loaders.PrecompiledLoader;
	module.exports.WebLoader = loaders.WebLoader;

	module.exports.compiler = __webpack_require__(32);
	module.exports.parser = __webpack_require__(32);
	module.exports.lexer = __webpack_require__(32);
	module.exports.runtime = __webpack_require__(34);
	module.exports.lib = lib;
	module.exports.nodes = __webpack_require__(32);

	module.exports.installJinjaCompat = __webpack_require__(38);

	// A single instance of an environment, since this is so commonly used

	var e;
	module.exports.configure = function(templatesPath, opts) {
	    opts = opts || {};
	    if(lib.isObject(templatesPath)) {
	        opts = templatesPath;
	        templatesPath = null;
	    }

	    var TemplateLoader;
	    if(loaders.FileSystemLoader) {
	        TemplateLoader = new loaders.FileSystemLoader(templatesPath, {
	            watch: opts.watch,
	            noCache: opts.noCache
	        });
	    }
	    else if(loaders.WebLoader) {
	        TemplateLoader = new loaders.WebLoader(templatesPath, {
	            useCache: opts.web && opts.web.useCache,
	            async: opts.web && opts.web.async
	        });
	    }

	    e = new env.Environment(TemplateLoader, opts);

	    if(opts && opts.express) {
	        e.express(opts.express);
	    }

	    return e;
	};

	module.exports.compile = function(src, env, path, eagerCompile) {
	    if(!e) {
	        module.exports.configure();
	    }
	    return new module.exports.Template(src, env, path, eagerCompile);
	};

	module.exports.render = function(name, ctx, cb) {
	    if(!e) {
	        module.exports.configure();
	    }

	    return e.render(name, ctx, cb);
	};

	module.exports.renderString = function(src, ctx, cb) {
	    if(!e) {
	        module.exports.configure();
	    }

	    return e.renderString(src, ctx, cb);
	};

	if(precompile) {
	    module.exports.precompile = precompile.precompile;
	    module.exports.precompileString = precompile.precompileString;
	}


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	var ArrayProto = Array.prototype;
	var ObjProto = Object.prototype;

	var escapeMap = {
	    '&': '&amp;',
	    '"': '&quot;',
	    '\'': '&#39;',
	    '<': '&lt;',
	    '>': '&gt;'
	};

	var escapeRegex = /[&"'<>]/g;

	var lookupEscape = function(ch) {
	    return escapeMap[ch];
	};

	var exports = module.exports = {};

	exports.prettifyError = function(path, withInternals, err) {
	    // jshint -W022
	    // http://jslinterrors.com/do-not-assign-to-the-exception-parameter
	    if (!err.Update) {
	        // not one of ours, cast it
	        err = new exports.TemplateError(err);
	    }
	    err.Update(path);

	    // Unless they marked the dev flag, show them a trace from here
	    if (!withInternals) {
	        var old = err;
	        err = new Error(old.message);
	        err.name = old.name;
	    }

	    return err;
	};

	exports.TemplateError = function(message, lineno, colno) {
	    var err = this;

	    if (message instanceof Error) { // for casting regular js errors
	        err = message;
	        message = message.name + ': ' + message.message;

	        try {
	            if(err.name = '') {}
	        }
	        catch(e) {
	            // If we can't set the name of the error object in this
	            // environment, don't use it
	            err = this;
	        }
	    } else {
	        if(Error.captureStackTrace) {
	            Error.captureStackTrace(err);
	        }
	    }

	    err.name = 'Template render error';
	    err.message = message;
	    err.lineno = lineno;
	    err.colno = colno;
	    err.firstUpdate = true;

	    err.Update = function(path) {
	        var message = '(' + (path || 'unknown path') + ')';

	        // only show lineno + colno next to path of template
	        // where error occurred
	        if (this.firstUpdate) {
	            if(this.lineno && this.colno) {
	                message += ' [Line ' + this.lineno + ', Column ' + this.colno + ']';
	            }
	            else if(this.lineno) {
	                message += ' [Line ' + this.lineno + ']';
	            }
	        }

	        message += '\n ';
	        if (this.firstUpdate) {
	            message += ' ';
	        }

	        this.message = message + (this.message || '');
	        this.firstUpdate = false;
	        return this;
	    };

	    return err;
	};

	exports.TemplateError.prototype = Error.prototype;

	exports.escape = function(val) {
	  return val.replace(escapeRegex, lookupEscape);
	};

	exports.isFunction = function(obj) {
	    return ObjProto.toString.call(obj) === '[object Function]';
	};

	exports.isArray = Array.isArray || function(obj) {
	    return ObjProto.toString.call(obj) === '[object Array]';
	};

	exports.isString = function(obj) {
	    return ObjProto.toString.call(obj) === '[object String]';
	};

	exports.isObject = function(obj) {
	    return ObjProto.toString.call(obj) === '[object Object]';
	};

	exports.groupBy = function(obj, val) {
	    var result = {};
	    var iterator = exports.isFunction(val) ? val : function(obj) { return obj[val]; };
	    for(var i=0; i<obj.length; i++) {
	        var value = obj[i];
	        var key = iterator(value, i);
	        (result[key] || (result[key] = [])).push(value);
	    }
	    return result;
	};

	exports.toArray = function(obj) {
	    return Array.prototype.slice.call(obj);
	};

	exports.without = function(array) {
	    var result = [];
	    if (!array) {
	        return result;
	    }
	    var index = -1,
	    length = array.length,
	    contains = exports.toArray(arguments).slice(1);

	    while(++index < length) {
	        if(exports.indexOf(contains, array[index]) === -1) {
	            result.push(array[index]);
	        }
	    }
	    return result;
	};

	exports.extend = function(obj, obj2) {
	    for(var k in obj2) {
	        obj[k] = obj2[k];
	    }
	    return obj;
	};

	exports.repeat = function(char_, n) {
	    var str = '';
	    for(var i=0; i<n; i++) {
	        str += char_;
	    }
	    return str;
	};

	exports.each = function(obj, func, context) {
	    if(obj == null) {
	        return;
	    }

	    if(ArrayProto.each && obj.each === ArrayProto.each) {
	        obj.forEach(func, context);
	    }
	    else if(obj.length === +obj.length) {
	        for(var i=0, l=obj.length; i<l; i++) {
	            func.call(context, obj[i], i, obj);
	        }
	    }
	};

	exports.map = function(obj, func) {
	    var results = [];
	    if(obj == null) {
	        return results;
	    }

	    if(ArrayProto.map && obj.map === ArrayProto.map) {
	        return obj.map(func);
	    }

	    for(var i=0; i<obj.length; i++) {
	        results[results.length] = func(obj[i], i);
	    }

	    if(obj.length === +obj.length) {
	        results.length = obj.length;
	    }

	    return results;
	};

	exports.asyncIter = function(arr, iter, cb) {
	    var i = -1;

	    function next() {
	        i++;

	        if(i < arr.length) {
	            iter(arr[i], i, next, cb);
	        }
	        else {
	            cb();
	        }
	    }

	    next();
	};

	exports.asyncFor = function(obj, iter, cb) {
	    var keys = exports.keys(obj);
	    var len = keys.length;
	    var i = -1;

	    function next() {
	        i++;
	        var k = keys[i];

	        if(i < len) {
	            iter(k, obj[k], i, len, next);
	        }
	        else {
	            cb();
	        }
	    }

	    next();
	};

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill
	exports.indexOf = Array.prototype.indexOf ?
	    function (arr, searchElement, fromIndex) {
	        return Array.prototype.indexOf.call(arr, searchElement, fromIndex);
	    } :
	    function (arr, searchElement, fromIndex) {
	        var length = this.length >>> 0; // Hack to convert object.length to a UInt32

	        fromIndex = +fromIndex || 0;

	        if(Math.abs(fromIndex) === Infinity) {
	            fromIndex = 0;
	        }

	        if(fromIndex < 0) {
	            fromIndex += length;
	            if (fromIndex < 0) {
	                fromIndex = 0;
	            }
	        }

	        for(;fromIndex < length; fromIndex++) {
	            if (arr[fromIndex] === searchElement) {
	                return fromIndex;
	            }
	        }

	        return -1;
	    };

	if(!Array.prototype.map) {
	    Array.prototype.map = function() {
	        throw new Error('map is unimplemented for this js engine');
	    };
	}

	exports.keys = function(obj) {
	    if(Object.prototype.keys) {
	        return obj.keys();
	    }
	    else {
	        var keys = [];
	        for(var k in obj) {
	            if(obj.hasOwnProperty(k)) {
	                keys.push(k);
	            }
	        }
	        return keys;
	    }
	};

	exports.inOperator = function (key, arrOrObj) {
	    if (exports.isArray(arrOrObj)) {
	        return exports.indexOf(arrOrObj, key) !== -1;
	    } else if (exports.isObject(arrOrObj)) {
	        return key in arrOrObj;
	    } else {
	        throw new Error('Cannot use "in" operator to search for "'
	            + key + '" in unexpected types.');
	    }
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(24);
	var asap = __webpack_require__(29);
	var lib = __webpack_require__(27);
	var Obj = __webpack_require__(31);
	var compiler = __webpack_require__(32);
	var builtin_filters = __webpack_require__(33);
	var builtin_loaders = __webpack_require__(32);
	var runtime = __webpack_require__(34);
	var globals = __webpack_require__(35);
	var Frame = runtime.Frame;
	var Template;

	// Unconditionally load in this loader, even if no other ones are
	// included (possible in the slim browser build)
	builtin_loaders.PrecompiledLoader = __webpack_require__(36);

	// If the user is using the async API, *always* call it
	// asynchronously even if the template was synchronous.
	function callbackAsap(cb, err, res) {
	    asap(function() { cb(err, res); });
	}

	var Environment = Obj.extend({
	    init: function(loaders, opts) {
	        // The dev flag determines the trace that'll be shown on errors.
	        // If set to true, returns the full trace from the error point,
	        // otherwise will return trace starting from Template.render
	        // (the full trace from within nunjucks may confuse developers using
	        //  the library)
	        // defaults to false
	        opts = this.opts = opts || {};
	        this.opts.dev = !!opts.dev;

	        // The autoescape flag sets global autoescaping. If true,
	        // every string variable will be escaped by default.
	        // If false, strings can be manually escaped using the `escape` filter.
	        // defaults to true
	        this.opts.autoescape = opts.autoescape != null ? opts.autoescape : true;

	        // If true, this will make the system throw errors if trying
	        // to output a null or undefined value
	        this.opts.throwOnUndefined = !!opts.throwOnUndefined;
	        this.opts.trimBlocks = !!opts.trimBlocks;
	        this.opts.lstripBlocks = !!opts.lstripBlocks;

	        this.loaders = [];

	        if(!loaders) {
	            // The filesystem loader is only available server-side
	            if(builtin_loaders.FileSystemLoader) {
	                this.loaders = [new builtin_loaders.FileSystemLoader('views')];
	            }
	            else if(builtin_loaders.WebLoader) {
	                this.loaders = [new builtin_loaders.WebLoader('/views')];
	            }
	        }
	        else {
	            this.loaders = lib.isArray(loaders) ? loaders : [loaders];
	        }

	        // It's easy to use precompiled templates: just include them
	        // before you configure nunjucks and this will automatically
	        // pick it up and use it
	        if((true) && window.nunjucksPrecompiled) {
	            this.loaders.unshift(
	                new builtin_loaders.PrecompiledLoader(window.nunjucksPrecompiled)
	            );
	        }

	        this.initCache();

	        this.globals = globals();
	        this.filters = {};
	        this.asyncFilters = [];
	        this.extensions = {};
	        this.extensionsList = [];

	        for(var name in builtin_filters) {
	            this.addFilter(name, builtin_filters[name]);
	        }
	    },

	    initCache: function() {
	        // Caching and cache busting
	        lib.each(this.loaders, function(loader) {
	            loader.cache = {};

	            if(typeof loader.on === 'function') {
	                loader.on('update', function(template) {
	                    loader.cache[template] = null;
	                });
	            }
	        });
	    },

	    addExtension: function(name, extension) {
	        extension._name = name;
	        this.extensions[name] = extension;
	        this.extensionsList.push(extension);
	        return this;
	    },

	    removeExtension: function(name) {
	        var extension = this.getExtension(name);
	        if (!extension) return;

	        this.extensionsList = lib.without(this.extensionsList, extension);
	        delete this.extensions[name];
	    },

	    getExtension: function(name) {
	        return this.extensions[name];
	    },

	    hasExtension: function(name) {
	        return !!this.extensions[name];
	    },

	    addGlobal: function(name, value) {
	        this.globals[name] = value;
	        return this;
	    },

	    getGlobal: function(name) {
	        if(typeof this.globals[name] === 'undefined') {
	            throw new Error('global not found: ' + name);
	        }
	        return this.globals[name];
	    },

	    addFilter: function(name, func, async) {
	        var wrapped = func;

	        if(async) {
	            this.asyncFilters.push(name);
	        }
	        this.filters[name] = wrapped;
	        return this;
	    },

	    getFilter: function(name) {
	        if(!this.filters[name]) {
	            throw new Error('filter not found: ' + name);
	        }
	        return this.filters[name];
	    },

	    resolveTemplate: function(loader, parentName, filename) {
	        var isRelative = (loader.isRelative && parentName)? loader.isRelative(filename) : false;
	        return (isRelative && loader.resolve)? loader.resolve(parentName, filename) : filename;
	    },

	    getTemplate: function(name, eagerCompile, parentName, ignoreMissing, cb) {
	        var that = this;
	        var tmpl = null;
	        if(name && name.raw) {
	            // this fixes autoescape for templates referenced in symbols
	            name = name.raw;
	        }

	        if(lib.isFunction(parentName)) {
	            cb = parentName;
	            parentName = null;
	            eagerCompile = eagerCompile || false;
	        }

	        if(lib.isFunction(eagerCompile)) {
	            cb = eagerCompile;
	            eagerCompile = false;
	        }

	        if (name instanceof Template) {
	             tmpl = name;
	        }
	        else if(typeof name !== 'string') {
	            throw new Error('template names must be a string: ' + name);
	        }
	        else {
	            for (var i = 0; i < this.loaders.length; i++) {
	                var _name = this.resolveTemplate(this.loaders[i], parentName, name);
	                tmpl = this.loaders[i].cache[_name];
	                if (tmpl) break;
	            }
	        }

	        if(tmpl) {
	            if(eagerCompile) {
	                tmpl.compile();
	            }

	            if(cb) {
	                cb(null, tmpl);
	            }
	            else {
	                return tmpl;
	            }
	        } else {
	            var syncResult;
	            var _this = this;

	            var createTemplate = function(err, info) {
	                if(!info && !err) {
	                    if(!ignoreMissing) {
	                        err = new Error('template not found: ' + name);
	                    }
	                }

	                if (err) {
	                    if(cb) {
	                        cb(err);
	                    }
	                    else {
	                        throw err;
	                    }
	                }
	                else {
	                    var tmpl;
	                    if(info) {
	                        tmpl = new Template(info.src, _this,
	                                            info.path, eagerCompile);

	                        if(!info.noCache) {
	                            info.loader.cache[name] = tmpl;
	                        }
	                    }
	                    else {
	                        tmpl = new Template('', _this,
	                                            '', eagerCompile);
	                    }

	                    if(cb) {
	                        cb(null, tmpl);
	                    }
	                    else {
	                        syncResult = tmpl;
	                    }
	                }
	            };

	            lib.asyncIter(this.loaders, function(loader, i, next, done) {
	                function handle(err, src) {
	                    if(err) {
	                        done(err);
	                    }
	                    else if(src) {
	                        src.loader = loader;
	                        done(null, src);
	                    }
	                    else {
	                        next();
	                    }
	                }

	                // Resolve name relative to parentName
	                name = that.resolveTemplate(loader, parentName, name);

	                if(loader.async) {
	                    loader.getSource(name, handle);
	                }
	                else {
	                    handle(null, loader.getSource(name));
	                }
	            }, createTemplate);

	            return syncResult;
	        }
	    },

	    express: function(app) {
	        var env = this;

	        function NunjucksView(name, opts) {
	            this.name          = name;
	            this.path          = name;
	            this.defaultEngine = opts.defaultEngine;
	            this.ext           = path.extname(name);
	            if (!this.ext && !this.defaultEngine) throw new Error('No default engine was specified and no extension was provided.');
	            if (!this.ext) this.name += (this.ext = ('.' !== this.defaultEngine[0] ? '.' : '') + this.defaultEngine);
	        }

	        NunjucksView.prototype.render = function(opts, cb) {
	          env.render(this.name, opts, cb);
	        };

	        app.set('view', NunjucksView);
	        return this;
	    },

	    render: function(name, ctx, cb) {
	        if(lib.isFunction(ctx)) {
	            cb = ctx;
	            ctx = null;
	        }

	        // We support a synchronous API to make it easier to migrate
	        // existing code to async. This works because if you don't do
	        // anything async work, the whole thing is actually run
	        // synchronously.
	        var syncResult = null;

	        this.getTemplate(name, function(err, tmpl) {
	            if(err && cb) {
	                callbackAsap(cb, err);
	            }
	            else if(err) {
	                throw err;
	            }
	            else {
	                syncResult = tmpl.render(ctx, cb);
	            }
	        });

	        return syncResult;
	    },

	    renderString: function(src, ctx, opts, cb) {
	        if(lib.isFunction(opts)) {
	            cb = opts;
	            opts = {};
	        }
	        opts = opts || {};

	        var tmpl = new Template(src, this, opts.path);
	        return tmpl.render(ctx, cb);
	    }
	});

	var Context = Obj.extend({
	    init: function(ctx, blocks, env) {
	        // Has to be tied to an environment so we can tap into its globals.
	        this.env = env || new Environment();

	        // Make a duplicate of ctx
	        this.ctx = {};
	        for(var k in ctx) {
	            if(ctx.hasOwnProperty(k)) {
	                this.ctx[k] = ctx[k];
	            }
	        }

	        this.blocks = {};
	        this.exported = [];

	        for(var name in blocks) {
	            this.addBlock(name, blocks[name]);
	        }
	    },

	    lookup: function(name) {
	        // This is one of the most called functions, so optimize for
	        // the typical case where the name isn't in the globals
	        if(name in this.env.globals && !(name in this.ctx)) {
	            return this.env.globals[name];
	        }
	        else {
	            return this.ctx[name];
	        }
	    },

	    setVariable: function(name, val) {
	        this.ctx[name] = val;
	    },

	    getVariables: function() {
	        return this.ctx;
	    },

	    addBlock: function(name, block) {
	        this.blocks[name] = this.blocks[name] || [];
	        this.blocks[name].push(block);
	        return this;
	    },

	    getBlock: function(name) {
	        if(!this.blocks[name]) {
	            throw new Error('unknown block "' + name + '"');
	        }

	        return this.blocks[name][0];
	    },

	    getSuper: function(env, name, block, frame, runtime, cb) {
	        var idx = lib.indexOf(this.blocks[name] || [], block);
	        var blk = this.blocks[name][idx + 1];
	        var context = this;

	        if(idx === -1 || !blk) {
	            throw new Error('no super block available for "' + name + '"');
	        }

	        blk(env, context, frame, runtime, cb);
	    },

	    addExport: function(name) {
	        this.exported.push(name);
	    },

	    getExported: function() {
	        var exported = {};
	        for(var i=0; i<this.exported.length; i++) {
	            var name = this.exported[i];
	            exported[name] = this.ctx[name];
	        }
	        return exported;
	    }
	});

	Template = Obj.extend({
	    init: function (src, env, path, eagerCompile) {
	        this.env = env || new Environment();

	        if(lib.isObject(src)) {
	            switch(src.type) {
	            case 'code': this.tmplProps = src.obj; break;
	            case 'string': this.tmplStr = src.obj; break;
	            }
	        }
	        else if(lib.isString(src)) {
	            this.tmplStr = src;
	        }
	        else {
	            throw new Error('src must be a string or an object describing ' +
	                            'the source');
	        }

	        this.path = path;

	        if(eagerCompile) {
	            var _this = this;
	            try {
	                _this._compile();
	            }
	            catch(err) {
	                throw lib.prettifyError(this.path, this.env.opts.dev, err);
	            }
	        }
	        else {
	            this.compiled = false;
	        }
	    },

	    render: function(ctx, parentFrame, cb) {
	        if (typeof ctx === 'function') {
	            cb = ctx;
	            ctx = {};
	        }
	        else if (typeof parentFrame === 'function') {
	            cb = parentFrame;
	            parentFrame = null;
	        }

	        var forceAsync = true;
	        if(parentFrame) {
	            // If there is a frame, we are being called from internal
	            // code of another template, and the internal system
	            // depends on the sync/async nature of the parent template
	            // to be inherited, so force an async callback
	            forceAsync = false;
	        }

	        var _this = this;
	        // Catch compile errors for async rendering
	        try {
	            _this.compile();
	        } catch (_err) {
	            var err = lib.prettifyError(this.path, this.env.opts.dev, _err);
	            if (cb) return callbackAsap(cb, err);
	            else throw err;
	        }

	        var context = new Context(ctx || {}, _this.blocks, _this.env);
	        var frame = parentFrame ? parentFrame.push(true) : new Frame();
	        frame.topLevel = true;
	        var syncResult = null;

	        _this.rootRenderFunc(
	            _this.env,
	            context,
	            frame || new Frame(),
	            runtime,
	            function(err, res) {
	                if(err) {
	                    err = lib.prettifyError(_this.path, _this.env.opts.dev, err);
	                }

	                if(cb) {
	                    if(forceAsync) {
	                        callbackAsap(cb, err, res);
	                    }
	                    else {
	                        cb(err, res);
	                    }
	                }
	                else {
	                    if(err) { throw err; }
	                    syncResult = res;
	                }
	            }
	        );

	        return syncResult;
	    },


	    getExported: function(ctx, parentFrame, cb) {
	        if (typeof ctx === 'function') {
	            cb = ctx;
	            ctx = {};
	        }

	        if (typeof parentFrame === 'function') {
	            cb = parentFrame;
	            parentFrame = null;
	        }

	        // Catch compile errors for async rendering
	        try {
	            this.compile();
	        } catch (e) {
	            if (cb) return cb(e);
	            else throw e;
	        }

	        var frame = parentFrame ? parentFrame.push() : new Frame();
	        frame.topLevel = true;

	        // Run the rootRenderFunc to populate the context with exported vars
	        var context = new Context(ctx || {}, this.blocks, this.env);
	        this.rootRenderFunc(this.env,
	                            context,
	                            frame,
	                            runtime,
	                            function(err) {
	        		        if ( err ) {
	        			    cb(err, null);
	        		        } else {
	        			    cb(null, context.getExported());
	        		        }
	                            });
	    },

	    compile: function() {
	        if(!this.compiled) {
	            this._compile();
	        }
	    },

	    _compile: function() {
	        var props;

	        if(this.tmplProps) {
	            props = this.tmplProps;
	        }
	        else {
	            var source = compiler.compile(this.tmplStr,
	                                          this.env.asyncFilters,
	                                          this.env.extensionsList,
	                                          this.path,
	                                          this.env.opts);

	            /* jslint evil: true */
	            var func = new Function(source);
	            props = func();
	        }

	        this.blocks = this._getBlocks(props);
	        this.rootRenderFunc = props.root;
	        this.compiled = true;
	    },

	    _getBlocks: function(props) {
	        var blocks = {};

	        for(var k in props) {
	            if(k.slice(0, 2) === 'b_') {
	                blocks[k.slice(2)] = props[k];
	            }
	        }

	        return blocks;
	    }
	});

	module.exports = {
	    Environment: Environment,
	    Template: Template
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	// rawAsap provides everything we need except exception management.
	var rawAsap = __webpack_require__(30);
	// RawTasks are recycled to reduce GC churn.
	var freeTasks = [];
	// We queue errors to ensure they are thrown in right order (FIFO).
	// Array-as-queue is good enough here, since we are just dealing with exceptions.
	var pendingErrors = [];
	var requestErrorThrow = rawAsap.makeRequestCallFromTimer(throwFirstError);

	function throwFirstError() {
	    if (pendingErrors.length) {
	        throw pendingErrors.shift();
	    }
	}

	/**
	 * Calls a task as soon as possible after returning, in its own event, with priority
	 * over other events like animation, reflow, and repaint. An error thrown from an
	 * event will not interrupt, nor even substantially slow down the processing of
	 * other events, but will be rather postponed to a lower priority event.
	 * @param {{call}} task A callable object, typically a function that takes no
	 * arguments.
	 */
	module.exports = asap;
	function asap(task) {
	    var rawTask;
	    if (freeTasks.length) {
	        rawTask = freeTasks.pop();
	    } else {
	        rawTask = new RawTask();
	    }
	    rawTask.task = task;
	    rawAsap(rawTask);
	}

	// We wrap tasks with recyclable task objects.  A task object implements
	// `call`, just like a function.
	function RawTask() {
	    this.task = null;
	}

	// The sole purpose of wrapping the task is to catch the exception and recycle
	// the task object after its single use.
	RawTask.prototype.call = function () {
	    try {
	        this.task.call();
	    } catch (error) {
	        if (asap.onerror) {
	            // This hook exists purely for testing purposes.
	            // Its name will be periodically randomized to break any code that
	            // depends on its existence.
	            asap.onerror(error);
	        } else {
	            // In a web browser, exceptions are not fatal. However, to avoid
	            // slowing down the queue of pending tasks, we rethrow the error in a
	            // lower priority turn.
	            pendingErrors.push(error);
	            requestErrorThrow();
	        }
	    } finally {
	        this.task = null;
	        freeTasks[freeTasks.length] = this;
	    }
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	// Use the fastest means possible to execute a task in its own turn, with
	// priority over other events including IO, animation, reflow, and redraw
	// events in browsers.
	//
	// An exception thrown by a task will permanently interrupt the processing of
	// subsequent tasks. The higher level `asap` function ensures that if an
	// exception is thrown by a task, that the task queue will continue flushing as
	// soon as possible, but if you use `rawAsap` directly, you are responsible to
	// either ensure that no exceptions are thrown from your task, or to manually
	// call `rawAsap.requestFlush` if an exception is thrown.
	module.exports = rawAsap;
	function rawAsap(task) {
	    if (!queue.length) {
	        requestFlush();
	        flushing = true;
	    }
	    // Equivalent to push, but avoids a function call.
	    queue[queue.length] = task;
	}

	var queue = [];
	// Once a flush has been requested, no further calls to `requestFlush` are
	// necessary until the next `flush` completes.
	var flushing = false;
	// `requestFlush` is an implementation-specific method that attempts to kick
	// off a `flush` event as quickly as possible. `flush` will attempt to exhaust
	// the event queue before yielding to the browser's own event loop.
	var requestFlush;
	// The position of the next task to execute in the task queue. This is
	// preserved between calls to `flush` so that it can be resumed if
	// a task throws an exception.
	var index = 0;
	// If a task schedules additional tasks recursively, the task queue can grow
	// unbounded. To prevent memory exhaustion, the task queue will periodically
	// truncate already-completed tasks.
	var capacity = 1024;

	// The flush function processes all tasks that have been scheduled with
	// `rawAsap` unless and until one of those tasks throws an exception.
	// If a task throws an exception, `flush` ensures that its state will remain
	// consistent and will resume where it left off when called again.
	// However, `flush` does not make any arrangements to be called again if an
	// exception is thrown.
	function flush() {
	    while (index < queue.length) {
	        var currentIndex = index;
	        // Advance the index before calling the task. This ensures that we will
	        // begin flushing on the next task the task throws an error.
	        index = index + 1;
	        queue[currentIndex].call();
	        // Prevent leaking memory for long chains of recursive calls to `asap`.
	        // If we call `asap` within tasks scheduled by `asap`, the queue will
	        // grow, but to avoid an O(n) walk for every task we execute, we don't
	        // shift tasks off the queue after they have been executed.
	        // Instead, we periodically shift 1024 tasks off the queue.
	        if (index > capacity) {
	            // Manually shift all values starting at the index back to the
	            // beginning of the queue.
	            for (var scan = 0, newLength = queue.length - index; scan < newLength; scan++) {
	                queue[scan] = queue[scan + index];
	            }
	            queue.length -= index;
	            index = 0;
	        }
	    }
	    queue.length = 0;
	    index = 0;
	    flushing = false;
	}

	// `requestFlush` is implemented using a strategy based on data collected from
	// every available SauceLabs Selenium web driver worker at time of writing.
	// https://docs.google.com/spreadsheets/d/1mG-5UYGup5qxGdEMWkhP6BWCz053NUb2E1QoUTU16uA/edit#gid=783724593

	// Safari 6 and 6.1 for desktop, iPad, and iPhone are the only browsers that
	// have WebKitMutationObserver but not un-prefixed MutationObserver.
	// Must use `global` instead of `window` to work in both frames and web
	// workers. `global` is a provision of Browserify, Mr, Mrs, or Mop.
	var BrowserMutationObserver = global.MutationObserver || global.WebKitMutationObserver;

	// MutationObservers are desirable because they have high priority and work
	// reliably everywhere they are implemented.
	// They are implemented in all modern browsers.
	//
	// - Android 4-4.3
	// - Chrome 26-34
	// - Firefox 14-29
	// - Internet Explorer 11
	// - iPad Safari 6-7.1
	// - iPhone Safari 7-7.1
	// - Safari 6-7
	if (typeof BrowserMutationObserver === "function") {
	    requestFlush = makeRequestCallFromMutationObserver(flush);

	// MessageChannels are desirable because they give direct access to the HTML
	// task queue, are implemented in Internet Explorer 10, Safari 5.0-1, and Opera
	// 11-12, and in web workers in many engines.
	// Although message channels yield to any queued rendering and IO tasks, they
	// would be better than imposing the 4ms delay of timers.
	// However, they do not work reliably in Internet Explorer or Safari.

	// Internet Explorer 10 is the only browser that has setImmediate but does
	// not have MutationObservers.
	// Although setImmediate yields to the browser's renderer, it would be
	// preferrable to falling back to setTimeout since it does not have
	// the minimum 4ms penalty.
	// Unfortunately there appears to be a bug in Internet Explorer 10 Mobile (and
	// Desktop to a lesser extent) that renders both setImmediate and
	// MessageChannel useless for the purposes of ASAP.
	// https://github.com/kriskowal/q/issues/396

	// Timers are implemented universally.
	// We fall back to timers in workers in most engines, and in foreground
	// contexts in the following browsers.
	// However, note that even this simple case requires nuances to operate in a
	// broad spectrum of browsers.
	//
	// - Firefox 3-13
	// - Internet Explorer 6-9
	// - iPad Safari 4.3
	// - Lynx 2.8.7
	} else {
	    requestFlush = makeRequestCallFromTimer(flush);
	}

	// `requestFlush` requests that the high priority event queue be flushed as
	// soon as possible.
	// This is useful to prevent an error thrown in a task from stalling the event
	// queue if the exception handled by Node.js’s
	// `process.on("uncaughtException")` or by a domain.
	rawAsap.requestFlush = requestFlush;

	// To request a high priority event, we induce a mutation observer by toggling
	// the text of a text node between "1" and "-1".
	function makeRequestCallFromMutationObserver(callback) {
	    var toggle = 1;
	    var observer = new BrowserMutationObserver(callback);
	    var node = document.createTextNode("");
	    observer.observe(node, {characterData: true});
	    return function requestCall() {
	        toggle = -toggle;
	        node.data = toggle;
	    };
	}

	// The message channel technique was discovered by Malte Ubl and was the
	// original foundation for this library.
	// http://www.nonblocking.io/2011/06/windownexttick.html

	// Safari 6.0.5 (at least) intermittently fails to create message ports on a
	// page's first load. Thankfully, this version of Safari supports
	// MutationObservers, so we don't need to fall back in that case.

	// function makeRequestCallFromMessageChannel(callback) {
	//     var channel = new MessageChannel();
	//     channel.port1.onmessage = callback;
	//     return function requestCall() {
	//         channel.port2.postMessage(0);
	//     };
	// }

	// For reasons explained above, we are also unable to use `setImmediate`
	// under any circumstances.
	// Even if we were, there is another bug in Internet Explorer 10.
	// It is not sufficient to assign `setImmediate` to `requestFlush` because
	// `setImmediate` must be called *by name* and therefore must be wrapped in a
	// closure.
	// Never forget.

	// function makeRequestCallFromSetImmediate(callback) {
	//     return function requestCall() {
	//         setImmediate(callback);
	//     };
	// }

	// Safari 6.0 has a problem where timers will get lost while the user is
	// scrolling. This problem does not impact ASAP because Safari 6.0 supports
	// mutation observers, so that implementation is used instead.
	// However, if we ever elect to use timers in Safari, the prevalent work-around
	// is to add a scroll event listener that calls for a flush.

	// `setTimeout` does not call the passed callback if the delay is less than
	// approximately 7 in web workers in Firefox 8 through 18, and sometimes not
	// even then.

	function makeRequestCallFromTimer(callback) {
	    return function requestCall() {
	        // We dispatch a timeout with a specified delay of 0 for engines that
	        // can reliably accommodate that request. This will usually be snapped
	        // to a 4 milisecond delay, but once we're flushing, there's no delay
	        // between events.
	        var timeoutHandle = setTimeout(handleTimer, 0);
	        // However, since this timer gets frequently dropped in Firefox
	        // workers, we enlist an interval handle that will try to fire
	        // an event 20 times per second until it succeeds.
	        var intervalHandle = setInterval(handleTimer, 50);

	        function handleTimer() {
	            // Whichever timer succeeds will cancel both timers and
	            // execute the callback.
	            clearTimeout(timeoutHandle);
	            clearInterval(intervalHandle);
	            callback();
	        }
	    };
	}

	// This is for `asap.js` only.
	// Its name will be periodically randomized to break any code that depends on
	// its existence.
	rawAsap.makeRequestCallFromTimer = makeRequestCallFromTimer;

	// ASAP was originally a nextTick shim included in Q. This was factored out
	// into this ASAP package. It was later adapted to RSVP which made further
	// amendments. These decisions, particularly to marginalize MessageChannel and
	// to capture the MutationObserver implementation in a closure, were integrated
	// back into ASAP proper.
	// https://github.com/tildeio/rsvp.js/blob/cddf7232546a9cf858524b75cde6f9edf72620a7/lib/rsvp/asap.js

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	// A simple class system, more documentation to come

	function extend(cls, name, props) {
	    // This does that same thing as Object.create, but with support for IE8
	    var F = function() {};
	    F.prototype = cls.prototype;
	    var prototype = new F();

	    // jshint undef: false
	    var fnTest = /xyz/.test(function(){ xyz; }) ? /\bparent\b/ : /.*/;
	    props = props || {};

	    for(var k in props) {
	        var src = props[k];
	        var parent = prototype[k];

	        if(typeof parent === 'function' &&
	           typeof src === 'function' &&
	           fnTest.test(src)) {
	            /*jshint -W083 */
	            prototype[k] = (function (src, parent) {
	                return function() {
	                    // Save the current parent method
	                    var tmp = this.parent;

	                    // Set parent to the previous method, call, and restore
	                    this.parent = parent;
	                    var res = src.apply(this, arguments);
	                    this.parent = tmp;

	                    return res;
	                };
	            })(src, parent);
	        }
	        else {
	            prototype[k] = src;
	        }
	    }

	    prototype.typename = name;

	    var new_cls = function() {
	        if(prototype.init) {
	            prototype.init.apply(this, arguments);
	        }
	    };

	    new_cls.prototype = prototype;
	    new_cls.prototype.constructor = new_cls;

	    new_cls.extend = function(name, props) {
	        if(typeof name === 'object') {
	            props = name;
	            name = 'anonymous';
	        }
	        return extend(new_cls, name, props);
	    };

	    return new_cls;
	}

	module.exports = extend(Object, 'Object', {});


/***/ },
/* 32 */
/***/ function(module, exports) {

	

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lib = __webpack_require__(27);
	var r = __webpack_require__(34);

	function normalize(value, defaultValue) {
	    if(value === null || value === undefined || value === false) {
	        return defaultValue;
	    }
	    return value;
	}

	var filters = {
	    abs: function(n) {
	        return Math.abs(n);
	    },

	    batch: function(arr, linecount, fill_with) {
	        var i;
	        var res = [];
	        var tmp = [];

	        for(i = 0; i < arr.length; i++) {
	            if(i % linecount === 0 && tmp.length) {
	                res.push(tmp);
	                tmp = [];
	            }

	            tmp.push(arr[i]);
	        }

	        if(tmp.length) {
	            if(fill_with) {
	                for(i = tmp.length; i < linecount; i++) {
	                    tmp.push(fill_with);
	                }
	            }

	            res.push(tmp);
	        }

	        return res;
	    },

	    capitalize: function(str) {
	        str = normalize(str, '');
	        var ret = str.toLowerCase();
	        return r.copySafeness(str, ret.charAt(0).toUpperCase() + ret.slice(1));
	    },

	    center: function(str, width) {
	        str = normalize(str, '');
	        width = width || 80;

	        if(str.length >= width) {
	            return str;
	        }

	        var spaces = width - str.length;
	        var pre = lib.repeat(' ', spaces/2 - spaces % 2);
	        var post = lib.repeat(' ', spaces/2);
	        return r.copySafeness(str, pre + str + post);
	    },

	    'default': function(val, def, bool) {
	        if(bool) {
	            return val ? val : def;
	        }
	        else {
	            return (val !== undefined) ? val : def;
	        }
	    },

	    dictsort: function(val, case_sensitive, by) {
	        if (!lib.isObject(val)) {
	            throw new lib.TemplateError('dictsort filter: val must be an object');
	        }

	        var array = [];
	        for (var k in val) {
	            // deliberately include properties from the object's prototype
	            array.push([k,val[k]]);
	        }

	        var si;
	        if (by === undefined || by === 'key') {
	            si = 0;
	        } else if (by === 'value') {
	            si = 1;
	        } else {
	            throw new lib.TemplateError(
	                'dictsort filter: You can only sort by either key or value');
	        }

	        array.sort(function(t1, t2) {
	            var a = t1[si];
	            var b = t2[si];

	            if (!case_sensitive) {
	                if (lib.isString(a)) {
	                    a = a.toUpperCase();
	                }
	                if (lib.isString(b)) {
	                    b = b.toUpperCase();
	                }
	            }

	            return a > b ? 1 : (a === b ? 0 : -1);
	        });

	        return array;
	    },

	    dump: function(obj) {
	        return JSON.stringify(obj);
	    },

	    escape: function(str) {
	        if(typeof str === 'string') {
	            return r.markSafe(lib.escape(str));
	        }
	        return str;
	    },

	    safe: function(str) {
	        return r.markSafe(str);
	    },

	    first: function(arr) {
	        return arr[0];
	    },

	    groupby: function(arr, attr) {
	        return lib.groupBy(arr, attr);
	    },

	    indent: function(str, width, indentfirst) {
	        str = normalize(str, '');

	        if (str === '') return '';

	        width = width || 4;
	        var res = '';
	        var lines = str.split('\n');
	        var sp = lib.repeat(' ', width);

	        for(var i=0; i<lines.length; i++) {
	            if(i === 0 && !indentfirst) {
	                res += lines[i] + '\n';
	            }
	            else {
	                res += sp + lines[i] + '\n';
	            }
	        }

	        return r.copySafeness(str, res);
	    },

	    join: function(arr, del, attr) {
	        del = del || '';

	        if(attr) {
	            arr = lib.map(arr, function(v) {
	                return v[attr];
	            });
	        }

	        return arr.join(del);
	    },

	    last: function(arr) {
	        return arr[arr.length-1];
	    },

	    length: function(val) {
	        var value = normalize(val, '');

	        return value !== undefined ? value.length : 0;
	    },

	    list: function(val) {
	        if(lib.isString(val)) {
	            return val.split('');
	        }
	        else if(lib.isObject(val)) {
	            var keys = [];

	            if(Object.keys) {
	                keys = Object.keys(val);
	            }
	            else {
	                for(var k in val) {
	                    keys.push(k);
	                }
	            }

	            return lib.map(keys, function(k) {
	                return { key: k,
	                         value: val[k] };
	            });
	        }
	        else if(lib.isArray(val)) {
	          return val;
	        }
	        else {
	            throw new lib.TemplateError('list filter: type not iterable');
	        }
	    },

	    lower: function(str) {
	        str = normalize(str, '');
	        return str.toLowerCase();
	    },

	    random: function(arr) {
	        return arr[Math.floor(Math.random() * arr.length)];
	    },

	    rejectattr: function(arr, attr) {
	      return arr.filter(function (item) {
	        return !item[attr];
	      });
	    },

	    selectattr: function(arr, attr) {
	      return arr.filter(function (item) {
	        return !!item[attr];
	      });
	    },

	    replace: function(str, old, new_, maxCount) {
	        var originalStr = str;

	        if (old instanceof RegExp) {
	            return str.replace(old, new_);
	        }

	        if(typeof maxCount === 'undefined'){
	            maxCount = -1;
	        }

	        var res = '';  // Output

	        // Cast Numbers in the search term to string
	        if(typeof old === 'number'){
	            old = old + '';
	        }
	        else if(typeof old !== 'string') {
	            // If it is something other than number or string,
	            // return the original string
	            return str;
	        }

	        // Cast numbers in the replacement to string
	        if(typeof str === 'number'){
	            str = str + '';
	        }

	        // If by now, we don't have a string, throw it back
	        if(typeof str !== 'string' && !(str instanceof r.SafeString)){
	            return str;
	        }

	        // ShortCircuits
	        if(old === ''){
	            // Mimic the python behaviour: empty string is replaced
	            // by replacement e.g. "abc"|replace("", ".") -> .a.b.c.
	            res = new_ + str.split('').join(new_) + new_;
	            return r.copySafeness(str, res);
	        }

	        var nextIndex = str.indexOf(old);
	        // if # of replacements to perform is 0, or the string to does
	        // not contain the old value, return the string
	        if(maxCount === 0 || nextIndex === -1){
	            return str;
	        }

	        var pos = 0;
	        var count = 0; // # of replacements made

	        while(nextIndex  > -1 && (maxCount === -1 || count < maxCount)){
	            // Grab the next chunk of src string and add it with the
	            // replacement, to the result
	            res += str.substring(pos, nextIndex) + new_;
	            // Increment our pointer in the src string
	            pos = nextIndex + old.length;
	            count++;
	            // See if there are any more replacements to be made
	            nextIndex = str.indexOf(old, pos);
	        }

	        // We've either reached the end, or done the max # of
	        // replacements, tack on any remaining string
	        if(pos < str.length) {
	            res += str.substring(pos);
	        }

	        return r.copySafeness(originalStr, res);
	    },

	    reverse: function(val) {
	        var arr;
	        if(lib.isString(val)) {
	            arr = filters.list(val);
	        }
	        else {
	            // Copy it
	            arr = lib.map(val, function(v) { return v; });
	        }

	        arr.reverse();

	        if(lib.isString(val)) {
	            return r.copySafeness(val, arr.join(''));
	        }
	        return arr;
	    },

	    round: function(val, precision, method) {
	        precision = precision || 0;
	        var factor = Math.pow(10, precision);
	        var rounder;

	        if(method === 'ceil') {
	            rounder = Math.ceil;
	        }
	        else if(method === 'floor') {
	            rounder = Math.floor;
	        }
	        else {
	            rounder = Math.round;
	        }

	        return rounder(val * factor) / factor;
	    },

	    slice: function(arr, slices, fillWith) {
	        var sliceLength = Math.floor(arr.length / slices);
	        var extra = arr.length % slices;
	        var offset = 0;
	        var res = [];

	        for(var i=0; i<slices; i++) {
	            var start = offset + i * sliceLength;
	            if(i < extra) {
	                offset++;
	            }
	            var end = offset + (i + 1) * sliceLength;

	            var slice = arr.slice(start, end);
	            if(fillWith && i >= extra) {
	                slice.push(fillWith);
	            }
	            res.push(slice);
	        }

	        return res;
	    },

	    sum: function(arr, attr, start) {
	        var sum = 0;

	        if(typeof start === 'number'){
	            sum += start;
	        }

	        if(attr) {
	            arr = lib.map(arr, function(v) {
	                return v[attr];
	            });
	        }

	        for(var i = 0; i < arr.length; i++) {
	            sum += arr[i];
	        }

	        return sum;
	    },

	    sort: r.makeMacro(['value', 'reverse', 'case_sensitive', 'attribute'], [], function(arr, reverse, caseSens, attr) {
	         // Copy it
	        arr = lib.map(arr, function(v) { return v; });

	        arr.sort(function(a, b) {
	            var x, y;

	            if(attr) {
	                x = a[attr];
	                y = b[attr];
	            }
	            else {
	                x = a;
	                y = b;
	            }

	            if(!caseSens && lib.isString(x) && lib.isString(y)) {
	                x = x.toLowerCase();
	                y = y.toLowerCase();
	            }

	            if(x < y) {
	                return reverse ? 1 : -1;
	            }
	            else if(x > y) {
	                return reverse ? -1: 1;
	            }
	            else {
	                return 0;
	            }
	        });

	        return arr;
	    }),

	    string: function(obj) {
	        return r.copySafeness(obj, obj);
	    },

	    striptags: function(input, preserve_linebreaks) {
	        input = normalize(input, '');
	        preserve_linebreaks = preserve_linebreaks || false;
	        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi;
	        var trimmedInput = filters.trim(input.replace(tags, ''));
	        var res = '';
	        if (preserve_linebreaks) {
	            res = trimmedInput
	                .replace(/^ +| +$/gm, '')     // remove leading and trailing spaces
	                .replace(/ +/g, ' ')          // squash adjacent spaces
	                .replace(/(\r\n)/g, '\n')     // normalize linebreaks (CRLF -> LF)
	                .replace(/\n\n\n+/g, '\n\n'); // squash abnormal adjacent linebreaks
	        } else {
	            res = trimmedInput.replace(/\s+/gi, ' ');
	        }
	        return r.copySafeness(input, res);
	    },

	    title: function(str) {
	        str = normalize(str, '');
	        var words = str.split(' ');
	        for(var i = 0; i < words.length; i++) {
	            words[i] = filters.capitalize(words[i]);
	        }
	        return r.copySafeness(str, words.join(' '));
	    },

	    trim: function(str) {
	        return r.copySafeness(str, str.replace(/^\s*|\s*$/g, ''));
	    },

	    truncate: function(input, length, killwords, end) {
	        var orig = input;
	        input = normalize(input, '');
	        length = length || 255;

	        if (input.length <= length)
	            return input;

	        if (killwords) {
	            input = input.substring(0, length);
	        } else {
	            var idx = input.lastIndexOf(' ', length);
	            if(idx === -1) {
	                idx = length;
	            }

	            input = input.substring(0, idx);
	        }

	        input += (end !== undefined && end !== null) ? end : '...';
	        return r.copySafeness(orig, input);
	    },

	    upper: function(str) {
	        str = normalize(str, '');
	        return str.toUpperCase();
	    },

	    urlencode: function(obj) {
	        var enc = encodeURIComponent;
	        if (lib.isString(obj)) {
	            return enc(obj);
	        } else {
	            var parts;
	            if (lib.isArray(obj)) {
	                parts = obj.map(function(item) {
	                    return enc(item[0]) + '=' + enc(item[1]);
	                });
	            } else {
	                parts = [];
	                for (var k in obj) {
	                    if (obj.hasOwnProperty(k)) {
	                        parts.push(enc(k) + '=' + enc(obj[k]));
	                    }
	                }
	            }
	            return parts.join('&');
	        }
	    },

	    urlize: function(str, length, nofollow) {
	        if (isNaN(length)) length = Infinity;

	        var noFollowAttr = (nofollow === true ? ' rel="nofollow"' : '');

	        // For the jinja regexp, see
	        // https://github.com/mitsuhiko/jinja2/blob/f15b814dcba6aa12bc74d1f7d0c881d55f7126be/jinja2/utils.py#L20-L23
	        var puncRE = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/;
	        // from http://blog.gerv.net/2011/05/html5_email_address_regexp/
	        var emailRE = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i;
	        var httpHttpsRE = /^https?:\/\/.*$/;
	        var wwwRE = /^www\./;
	        var tldRE = /\.(?:org|net|com)(?:\:|\/|$)/;

	        var words = str.split(/(\s+)/).filter(function(word) {
	          // If the word has no length, bail. This can happen for str with
	          // trailing whitespace.
	          return word && word.length;
	        }).map(function(word) {
	          var matches = word.match(puncRE);
	          var possibleUrl = matches && matches[1] || word;

	          // url that starts with http or https
	          if (httpHttpsRE.test(possibleUrl))
	            return '<a href="' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

	          // url that starts with www.
	          if (wwwRE.test(possibleUrl))
	            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

	          // an email address of the form username@domain.tld
	          if (emailRE.test(possibleUrl))
	            return '<a href="mailto:' + possibleUrl + '">' + possibleUrl + '</a>';

	          // url that ends in .com, .org or .net that is not an email address
	          if (tldRE.test(possibleUrl))
	            return '<a href="http://' + possibleUrl + '"' + noFollowAttr + '>' + possibleUrl.substr(0, length) + '</a>';

	          return word;

	        });

	        return words.join('');
	    },

	    wordcount: function(str) {
	        str = normalize(str, '');
	        var words = (str) ? str.match(/\w+/g) : null;
	        return (words) ? words.length : null;
	    },

	    'float': function(val, def) {
	        var res = parseFloat(val);
	        return isNaN(res) ? def : res;
	    },

	    'int': function(val, def) {
	        var res = parseInt(val, 10);
	        return isNaN(res) ? def : res;
	    }
	};

	// Aliases
	filters.d = filters['default'];
	filters.e = filters.escape;

	module.exports = filters;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var lib = __webpack_require__(27);
	var Obj = __webpack_require__(31);

	// Frames keep track of scoping both at compile-time and run-time so
	// we know how to access variables. Block tags can introduce special
	// variables, for example.
	var Frame = Obj.extend({
	    init: function(parent, isolateWrites) {
	        this.variables = {};
	        this.parent = parent;
	        this.topLevel = false;
	        // if this is true, writes (set) should never propagate upwards past
	        // this frame to its parent (though reads may).
	        this.isolateWrites = isolateWrites;
	    },

	    set: function(name, val, resolveUp) {
	        // Allow variables with dots by automatically creating the
	        // nested structure
	        var parts = name.split('.');
	        var obj = this.variables;
	        var frame = this;

	        if(resolveUp) {
	            if((frame = this.resolve(parts[0], true))) {
	                frame.set(name, val);
	                return;
	            }
	        }

	        for(var i=0; i<parts.length - 1; i++) {
	            var id = parts[i];

	            if(!obj[id]) {
	                obj[id] = {};
	            }
	            obj = obj[id];
	        }

	        obj[parts[parts.length - 1]] = val;
	    },

	    get: function(name) {
	        var val = this.variables[name];
	        if(val !== undefined && val !== null) {
	            return val;
	        }
	        return null;
	    },

	    lookup: function(name) {
	        var p = this.parent;
	        var val = this.variables[name];
	        if(val !== undefined && val !== null) {
	            return val;
	        }
	        return p && p.lookup(name);
	    },

	    resolve: function(name, forWrite) {
	        var p = (forWrite && this.isolateWrites) ? undefined : this.parent;
	        var val = this.variables[name];
	        if(val !== undefined && val !== null) {
	            return this;
	        }
	        return p && p.resolve(name);
	    },

	    push: function(isolateWrites) {
	        return new Frame(this, isolateWrites);
	    },

	    pop: function() {
	        return this.parent;
	    }
	});

	function makeMacro(argNames, kwargNames, func) {
	    return function() {
	        var argCount = numArgs(arguments);
	        var args;
	        var kwargs = getKeywordArgs(arguments);
	        var i;

	        if(argCount > argNames.length) {
	            args = Array.prototype.slice.call(arguments, 0, argNames.length);

	            // Positional arguments that should be passed in as
	            // keyword arguments (essentially default values)
	            var vals = Array.prototype.slice.call(arguments, args.length, argCount);
	            for(i = 0; i < vals.length; i++) {
	                if(i < kwargNames.length) {
	                    kwargs[kwargNames[i]] = vals[i];
	                }
	            }

	            args.push(kwargs);
	        }
	        else if(argCount < argNames.length) {
	            args = Array.prototype.slice.call(arguments, 0, argCount);

	            for(i = argCount; i < argNames.length; i++) {
	                var arg = argNames[i];

	                // Keyword arguments that should be passed as
	                // positional arguments, i.e. the caller explicitly
	                // used the name of a positional arg
	                args.push(kwargs[arg]);
	                delete kwargs[arg];
	            }

	            args.push(kwargs);
	        }
	        else {
	            args = arguments;
	        }

	        return func.apply(this, args);
	    };
	}

	function makeKeywordArgs(obj) {
	    obj.__keywords = true;
	    return obj;
	}

	function getKeywordArgs(args) {
	    var len = args.length;
	    if(len) {
	        var lastArg = args[len - 1];
	        if(lastArg && lastArg.hasOwnProperty('__keywords')) {
	            return lastArg;
	        }
	    }
	    return {};
	}

	function numArgs(args) {
	    var len = args.length;
	    if(len === 0) {
	        return 0;
	    }

	    var lastArg = args[len - 1];
	    if(lastArg && lastArg.hasOwnProperty('__keywords')) {
	        return len - 1;
	    }
	    else {
	        return len;
	    }
	}

	// A SafeString object indicates that the string should not be
	// autoescaped. This happens magically because autoescaping only
	// occurs on primitive string objects.
	function SafeString(val) {
	    if(typeof val !== 'string') {
	        return val;
	    }

	    this.val = val;
	    this.length = val.length;
	}

	SafeString.prototype = Object.create(String.prototype, {
	    length: { writable: true, configurable: true, value: 0 }
	});
	SafeString.prototype.valueOf = function() {
	    return this.val;
	};
	SafeString.prototype.toString = function() {
	    return this.val;
	};

	function copySafeness(dest, target) {
	    if(dest instanceof SafeString) {
	        return new SafeString(target);
	    }
	    return target.toString();
	}

	function markSafe(val) {
	    var type = typeof val;

	    if(type === 'string') {
	        return new SafeString(val);
	    }
	    else if(type !== 'function') {
	        return val;
	    }
	    else {
	        return function() {
	            var ret = val.apply(this, arguments);

	            if(typeof ret === 'string') {
	                return new SafeString(ret);
	            }

	            return ret;
	        };
	    }
	}

	function suppressValue(val, autoescape) {
	    val = (val !== undefined && val !== null) ? val : '';

	    if(autoescape && typeof val === 'string') {
	        val = lib.escape(val);
	    }

	    return val;
	}

	function ensureDefined(val, lineno, colno) {
	    if(val === null || val === undefined) {
	        throw new lib.TemplateError(
	            'attempted to output null or undefined value',
	            lineno + 1,
	            colno + 1
	        );
	    }
	    return val;
	}

	function memberLookup(obj, val) {
	    obj = obj || {};

	    if(typeof obj[val] === 'function') {
	        return function() {
	            return obj[val].apply(obj, arguments);
	        };
	    }

	    return obj[val];
	}

	function callWrap(obj, name, context, args) {
	    if(!obj) {
	        throw new Error('Unable to call `' + name + '`, which is undefined or falsey');
	    }
	    else if(typeof obj !== 'function') {
	        throw new Error('Unable to call `' + name + '`, which is not a function');
	    }

	    // jshint validthis: true
	    return obj.apply(context, args);
	}

	function contextOrFrameLookup(context, frame, name) {
	    var val = frame.lookup(name);
	    return (val !== undefined && val !== null) ?
	        val :
	        context.lookup(name);
	}

	function handleError(error, lineno, colno) {
	    if(error.lineno) {
	        return error;
	    }
	    else {
	        return new lib.TemplateError(error, lineno, colno);
	    }
	}

	function asyncEach(arr, dimen, iter, cb) {
	    if(lib.isArray(arr)) {
	        var len = arr.length;

	        lib.asyncIter(arr, function(item, i, next) {
	            switch(dimen) {
	            case 1: iter(item, i, len, next); break;
	            case 2: iter(item[0], item[1], i, len, next); break;
	            case 3: iter(item[0], item[1], item[2], i, len, next); break;
	            default:
	                item.push(i, next);
	                iter.apply(this, item);
	            }
	        }, cb);
	    }
	    else {
	        lib.asyncFor(arr, function(key, val, i, len, next) {
	            iter(key, val, i, len, next);
	        }, cb);
	    }
	}

	function asyncAll(arr, dimen, func, cb) {
	    var finished = 0;
	    var len, i;
	    var outputArr;

	    function done(i, output) {
	        finished++;
	        outputArr[i] = output;

	        if(finished === len) {
	            cb(null, outputArr.join(''));
	        }
	    }

	    if(lib.isArray(arr)) {
	        len = arr.length;
	        outputArr = new Array(len);

	        if(len === 0) {
	            cb(null, '');
	        }
	        else {
	            for(i = 0; i < arr.length; i++) {
	                var item = arr[i];

	                switch(dimen) {
	                case 1: func(item, i, len, done); break;
	                case 2: func(item[0], item[1], i, len, done); break;
	                case 3: func(item[0], item[1], item[2], i, len, done); break;
	                default:
	                    item.push(i, done);
	                    // jshint validthis: true
	                    func.apply(this, item);
	                }
	            }
	        }
	    }
	    else {
	        var keys = lib.keys(arr);
	        len = keys.length;
	        outputArr = new Array(len);

	        if(len === 0) {
	            cb(null, '');
	        }
	        else {
	            for(i = 0; i < keys.length; i++) {
	                var k = keys[i];
	                func(k, arr[k], i, len, done);
	            }
	        }
	    }
	}

	module.exports = {
	    Frame: Frame,
	    makeMacro: makeMacro,
	    makeKeywordArgs: makeKeywordArgs,
	    numArgs: numArgs,
	    suppressValue: suppressValue,
	    ensureDefined: ensureDefined,
	    memberLookup: memberLookup,
	    contextOrFrameLookup: contextOrFrameLookup,
	    callWrap: callWrap,
	    handleError: handleError,
	    isArray: lib.isArray,
	    keys: lib.keys,
	    SafeString: SafeString,
	    copySafeness: copySafeness,
	    markSafe: markSafe,
	    asyncEach: asyncEach,
	    asyncAll: asyncAll,
	    inOperator: lib.inOperator
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	'use strict';

	function cycler(items) {
	    var index = -1;

	    return {
	        current: null,
	        reset: function() {
	            index = -1;
	            this.current = null;
	        },

	        next: function() {
	            index++;
	            if(index >= items.length) {
	                index = 0;
	            }

	            this.current = items[index];
	            return this.current;
	        },
	    };

	}

	function joiner(sep) {
	    sep = sep || ',';
	    var first = true;

	    return function() {
	        var val = first ? '' : sep;
	        first = false;
	        return val;
	    };
	}

	// Making this a function instead so it returns a new object
	// each time it's called. That way, if something like an environment
	// uses it, they will each have their own copy.
	function globals() {
	    return {
	        range: function(start, stop, step) {
	            if(typeof stop === 'undefined') {
	                stop = start;
	                start = 0;
	                step = 1;
	            }
	            else if(!step) {
	                step = 1;
	            }

	            var arr = [];
	            var i;
	            if (step > 0) {
	                for (i=start; i<stop; i+=step) {
	                    arr.push(i);
	                }
	            } else {
	                for (i=start; i>stop; i+=step) {
	                    arr.push(i);
	                }
	            }
	            return arr;
	        },

	        // lipsum: function(n, html, min, max) {
	        // },

	        cycler: function() {
	            return cycler(Array.prototype.slice.call(arguments));
	        },

	        joiner: function(sep) {
	            return joiner(sep);
	        }
	    };
	}

	module.exports = globals;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Loader = __webpack_require__(37);

	var PrecompiledLoader = Loader.extend({
	    init: function(compiledTemplates) {
	        this.precompiled = compiledTemplates || {};
	    },

	    getSource: function(name) {
	        if (this.precompiled[name]) {
	            return {
	                src: { type: 'code',
	                       obj: this.precompiled[name] },
	                path: name
	            };
	        }
	        return null;
	    }
	});

	module.exports = PrecompiledLoader;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(24);
	var Obj = __webpack_require__(31);
	var lib = __webpack_require__(27);

	var Loader = Obj.extend({
	    on: function(name, func) {
	        this.listeners = this.listeners || {};
	        this.listeners[name] = this.listeners[name] || [];
	        this.listeners[name].push(func);
	    },

	    emit: function(name /*, arg1, arg2, ...*/) {
	        var args = Array.prototype.slice.call(arguments, 1);

	        if(this.listeners && this.listeners[name]) {
	            lib.each(this.listeners[name], function(listener) {
	                listener.apply(null, args);
	            });
	        }
	    },

	    resolve: function(from, to) {
	        return path.resolve(path.dirname(from), to);
	    },

	    isRelative: function(filename) {
	        return (filename.indexOf('./') === 0 || filename.indexOf('../') === 0);
	    }
	});

	module.exports = Loader;


/***/ },
/* 38 */
/***/ function(module, exports) {

	function installCompat() {
	  'use strict';

	  // This must be called like `nunjucks.installCompat` so that `this`
	  // references the nunjucks instance
	  var runtime = this.runtime; // jshint ignore:line
	  var lib = this.lib; // jshint ignore:line

	  var orig_contextOrFrameLookup = runtime.contextOrFrameLookup;
	  runtime.contextOrFrameLookup = function(context, frame, key) {
	    var val = orig_contextOrFrameLookup.apply(this, arguments);
	    if (val === undefined) {
	      switch (key) {
	      case 'True':
	        return true;
	      case 'False':
	        return false;
	      case 'None':
	        return null;
	      }
	    }

	    return val;
	  };

	  var orig_memberLookup = runtime.memberLookup;
	  var ARRAY_MEMBERS = {
	    pop: function(index) {
	      if (index === undefined) {
	        return this.pop();
	      }
	      if (index >= this.length || index < 0) {
	        throw new Error('KeyError');
	      }
	      return this.splice(index, 1);
	    },
	    remove: function(element) {
	      for (var i = 0; i < this.length; i++) {
	        if (this[i] === element) {
	          return this.splice(i, 1);
	        }
	      }
	      throw new Error('ValueError');
	    },
	    count: function(element) {
	      var count = 0;
	      for (var i = 0; i < this.length; i++) {
	        if (this[i] === element) {
	          count++;
	        }
	      }
	      return count;
	    },
	    index: function(element) {
	      var i;
	      if ((i = this.indexOf(element)) === -1) {
	        throw new Error('ValueError');
	      }
	      return i;
	    },
	    find: function(element) {
	      return this.indexOf(element);
	    },
	    insert: function(index, elem) {
	      return this.splice(index, 0, elem);
	    }
	  };
	  var OBJECT_MEMBERS = {
	    items: function() {
	      var ret = [];
	      for(var k in this) {
	        ret.push([k, this[k]]);
	      }
	      return ret;
	    },
	    values: function() {
	      var ret = [];
	      for(var k in this) {
	        ret.push(this[k]);
	      }
	      return ret;
	    },
	    keys: function() {
	      var ret = [];
	      for(var k in this) {
	        ret.push(k);
	      }
	      return ret;
	    },
	    get: function(key, def) {
	      var output = this[key];
	      if (output === undefined) {
	        output = def;
	      }
	      return output;
	    },
	    has_key: function(key) {
	      return this.hasOwnProperty(key);
	    },
	    pop: function(key, def) {
	      var output = this[key];
	      if (output === undefined && def !== undefined) {
	        output = def;
	      } else if (output === undefined) {
	        throw new Error('KeyError');
	      } else {
	        delete this[key];
	      }
	      return output;
	    },
	    popitem: function() {
	      for (var k in this) {
	        // Return the first object pair.
	        var val = this[k];
	        delete this[k];
	        return [k, val];
	      }
	      throw new Error('KeyError');
	    },
	    setdefault: function(key, def) {
	      if (key in this) {
	        return this[key];
	      }
	      if (def === undefined) {
	        def = null;
	      }
	      return this[key] = def;
	    },
	    update: function(kwargs) {
	      for (var k in kwargs) {
	        this[k] = kwargs[k];
	      }
	      return null;  // Always returns None
	    }
	  };
	  OBJECT_MEMBERS.iteritems = OBJECT_MEMBERS.items;
	  OBJECT_MEMBERS.itervalues = OBJECT_MEMBERS.values;
	  OBJECT_MEMBERS.iterkeys = OBJECT_MEMBERS.keys;
	  runtime.memberLookup = function(obj, val, autoescape) { // jshint ignore:line
	    obj = obj || {};

	    // If the object is an object, return any of the methods that Python would
	    // otherwise provide.
	    if (lib.isArray(obj) && ARRAY_MEMBERS.hasOwnProperty(val)) {
	      return function() {return ARRAY_MEMBERS[val].apply(obj, arguments);};
	    }

	    if (lib.isObject(obj) && OBJECT_MEMBERS.hasOwnProperty(val)) {
	      return function() {return OBJECT_MEMBERS[val].apply(obj, arguments);};
	    }

	    return orig_memberLookup.apply(this, arguments);
	  };
	}

	module.exports = installCompat;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 *
	 * HtmlPrinter (html-printer.js)
	 * Author: rtfpessoa
	 *
	 */

	(function() {

	  var diffParser = __webpack_require__(1).DiffParser;
	  var printerUtils = __webpack_require__(4).PrinterUtils;
	  var utils = __webpack_require__(2).Utils;
	  var Rematch = __webpack_require__(20).Rematch;

	  var matcher = Rematch.rematch(function(a, b) {
	    var amod = a.content.substr(1);
	    var bmod = b.content.substr(1);

	    return Rematch.distance(amod, bmod);
	  });

	  function SideBySidePrinter(config) {
	    this.config = config;
	  }

	  SideBySidePrinter.prototype.makeDiffHtml = function(file, diffs) {
	    return '<div id="' + printerUtils.getHtmlId(file) + '" class="d2h-file-wrapper" data-lang="' + file.language + '">\n' +
	      '     <div class="d2h-file-header">\n' +
	      '       <span class="d2h-file-stats">\n' +
	      '         <span class="d2h-lines-added">\n' +
	      '           <span>+' + file.addedLines + '</span>\n' +
	      '         </span>\n' +
	      '         <span class="d2h-lines-deleted">\n' +
	      '           <span>-' + file.deletedLines + '</span>\n' +
	      '         </span>\n' +
	      '       </span>\n' +
	      '       <span class="d2h-file-name-wrapper">\n' +
	      '         <span class="d2h-file-name">' + printerUtils.getDiffName(file) + '</span>\n' +
	      '       </span>\n' +
	      '     </div>\n' +
	      '     <div class="d2h-files-diff">\n' +
	      '       <div class="d2h-file-side-diff">\n' +
	      '         <div class="d2h-code-wrapper">\n' +
	      '           <table class="d2h-diff-table">\n' +
	      '             <tbody class="d2h-diff-tbody">\n' +
	      '           ' + diffs.left +
	      '             </tbody>\n' +
	      '           </table>\n' +
	      '         </div>\n' +
	      '       </div>\n' +
	      '       <div class="d2h-file-side-diff">\n' +
	      '         <div class="d2h-code-wrapper">\n' +
	      '           <table class="d2h-diff-table">\n' +
	      '             <tbody class="d2h-diff-tbody">\n' +
	      '           ' + diffs.right +
	      '             </tbody>\n' +
	      '           </table>\n' +
	      '         </div>\n' +
	      '       </div>\n' +
	      '     </div>\n' +
	      '   </div>\n';
	  };

	  SideBySidePrinter.prototype.generateSideBySideJsonHtml = function(diffFiles) {
	    var that = this;
	    return '<div class="d2h-wrapper">\n' +
	      diffFiles.map(function(file) {

	        var diffs;
	        if (file.blocks.length) {
	          diffs = that.generateSideBySideFileHtml(file);
	        } else {
	          diffs = that.generateEmptyDiff();
	        }

	        return that.makeDiffHtml(file, diffs);
	      }).join('\n') +
	      '</div>\n';
	  };

	  SideBySidePrinter.prototype.makeSideHtml = function(blockHeader) {
	    return '<tr>\n' +
	      '  <td class="d2h-code-side-linenumber ' + diffParser.LINE_TYPE.INFO + '"></td>\n' +
	      '  <td class="' + diffParser.LINE_TYPE.INFO + '">\n' +
	      '    <div class="d2h-code-side-line ' + diffParser.LINE_TYPE.INFO + '">' + blockHeader + '</div>\n' +
	      '  </td>\n' +
	      '</tr>\n';
	  };

	  SideBySidePrinter.prototype.generateSideBySideFileHtml = function(file) {
	    var that = this;
	    var fileHtml = {};
	    fileHtml.left = '';
	    fileHtml.right = '';

	    file.blocks.forEach(function(block) {

	      fileHtml.left += that.makeSideHtml(utils.escape(block.header));
	      fileHtml.right += that.makeSideHtml('');

	      var oldLines = [];
	      var newLines = [];

	      function processChangeBlock() {
	        var matches;
	        var insertType;
	        var deleteType;
	        var doMatching = that.config.matching === 'lines' || that.config.matching === 'words';

	        if (doMatching) {
	          matches = matcher(oldLines, newLines);
	          insertType = diffParser.LINE_TYPE.INSERT_CHANGES;
	          deleteType = diffParser.LINE_TYPE.DELETE_CHANGES;
	        } else {
	          matches = [[oldLines, newLines]];
	          insertType = diffParser.LINE_TYPE.INSERTS;
	          deleteType = diffParser.LINE_TYPE.DELETES;
	        }

	        matches.forEach(function(match) {
	          oldLines = match[0];
	          newLines = match[1];

	          var common = Math.min(oldLines.length, newLines.length);
	          var max = Math.max(oldLines.length, newLines.length);

	          for (var j = 0; j < common; j++) {
	            var oldLine = oldLines[j];
	            var newLine = newLines[j];

	            that.config.isCombined = file.isCombined;

	            var diff = printerUtils.diffHighlight(oldLine.content, newLine.content, that.config);

	            fileHtml.left +=
	              that.generateSingleLineHtml(deleteType, oldLine.oldNumber,
	                diff.first.line, diff.first.prefix);
	            fileHtml.right +=
	              that.generateSingleLineHtml(insertType, newLine.newNumber,
	                diff.second.line, diff.second.prefix);
	          }

	          if (max > common) {
	            var oldSlice = oldLines.slice(common);
	            var newSlice = newLines.slice(common);

	            var tmpHtml = that.processLines(oldSlice, newSlice);
	            fileHtml.left += tmpHtml.left;
	            fileHtml.right += tmpHtml.right;
	          }
	        });

	        oldLines = [];
	        newLines = [];
	      }

	      for (var i = 0; i < block.lines.length; i++) {
	        var line = block.lines[i];
	        var prefix = line.content[0];
	        var escapedLine = utils.escape(line.content.substr(1));

	        if (line.type !== diffParser.LINE_TYPE.INSERTS &&
	          (newLines.length > 0 || (line.type !== diffParser.LINE_TYPE.DELETES && oldLines.length > 0))) {
	          processChangeBlock();
	        }

	        if (line.type === diffParser.LINE_TYPE.CONTEXT) {
	          fileHtml.left += that.generateSingleLineHtml(line.type, line.oldNumber, escapedLine, prefix);
	          fileHtml.right += that.generateSingleLineHtml(line.type, line.newNumber, escapedLine, prefix);
	        } else if (line.type === diffParser.LINE_TYPE.INSERTS && !oldLines.length) {
	          fileHtml.left += that.generateSingleLineHtml(diffParser.LINE_TYPE.CONTEXT, '', '', '');
	          fileHtml.right += that.generateSingleLineHtml(line.type, line.newNumber, escapedLine, prefix);
	        } else if (line.type === diffParser.LINE_TYPE.DELETES) {
	          oldLines.push(line);
	        } else if (line.type === diffParser.LINE_TYPE.INSERTS && Boolean(oldLines.length)) {
	          newLines.push(line);
	        } else {
	          console.error('unknown state in html side-by-side generator');
	          processChangeBlock();
	        }
	      }

	      processChangeBlock();
	    });

	    return fileHtml;
	  };

	  SideBySidePrinter.prototype.processLines = function(oldLines, newLines) {
	    var that = this;
	    var fileHtml = {};
	    fileHtml.left = '';
	    fileHtml.right = '';

	    var maxLinesNumber = Math.max(oldLines.length, newLines.length);
	    for (var i = 0; i < maxLinesNumber; i++) {
	      var oldLine = oldLines[i];
	      var newLine = newLines[i];
	      var oldContent;
	      var newContent;
	      var oldPrefix;
	      var newPrefix;

	      if (oldLine) {
	        oldContent = utils.escape(oldLine.content.substr(1));
	        oldPrefix = oldLine.content[0];
	      }

	      if (newLine) {
	        newContent = utils.escape(newLine.content.substr(1));
	        newPrefix = newLine.content[0];
	      }

	      if (oldLine && newLine) {
	        fileHtml.left += that.generateSingleLineHtml(oldLine.type, oldLine.oldNumber, oldContent, oldPrefix);
	        fileHtml.right += that.generateSingleLineHtml(newLine.type, newLine.newNumber, newContent, newPrefix);
	      } else if (oldLine) {
	        fileHtml.left += that.generateSingleLineHtml(oldLine.type, oldLine.oldNumber, oldContent, oldPrefix);
	        fileHtml.right += that.generateSingleLineHtml(diffParser.LINE_TYPE.CONTEXT, '', '', '');
	      } else if (newLine) {
	        fileHtml.left += that.generateSingleLineHtml(diffParser.LINE_TYPE.CONTEXT, '', '', '');
	        fileHtml.right += that.generateSingleLineHtml(newLine.type, newLine.newNumber, newContent, newPrefix);
	      } else {
	        console.error('How did it get here?');
	      }
	    }

	    return fileHtml;
	  };

	  SideBySidePrinter.prototype.makeSingleLineHtml = function(type, number, htmlContent, htmlPrefix) {
	    return '<tr>\n' +
	      '    <td class="d2h-code-side-linenumber ' + type + '">' + number + '</td>\n' +
	      '    <td class="' + type + '">' +
	      '      <div class="d2h-code-side-line ' + type + '">' + htmlPrefix + htmlContent + '</div>' +
	      '    </td>\n' +
	      '  </tr>\n';
	  };

	  SideBySidePrinter.prototype.generateSingleLineHtml = function(type, number, content, prefix) {
	    var htmlPrefix = '';
	    if (prefix) {
	      htmlPrefix = '<span class="d2h-code-line-prefix">' + prefix + '</span>';
	    }

	    var htmlContent = '';
	    if (content) {
	      htmlContent = '<span class="d2h-code-line-ctn">' + content + '</span>';
	    }

	    return this.makeSingleLineHtml(type, number, htmlContent, htmlPrefix);
	  };

	  SideBySidePrinter.prototype.generateEmptyDiff = function() {
	    var fileHtml = {};
	    fileHtml.right = '';

	    fileHtml.left = '<tr>\n' +
	      '  <td class="' + diffParser.LINE_TYPE.INFO + '">' +
	      '    <div class="d2h-code-side-line ' + diffParser.LINE_TYPE.INFO + '">' +
	      'File without changes' +
	      '    </div>' +
	      '  </td>\n' +
	      '</tr>\n';

	    return fileHtml;
	  };

	  module.exports.SideBySidePrinter = SideBySidePrinter;

	})();


/***/ }
/******/ ]);