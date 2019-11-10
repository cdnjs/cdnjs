!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.jsondiffpatch||(f.jsondiffpatch={})).formatters=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = require('./formatters');

},{"./formatters":6}],2:[function(require,module,exports){

exports.isBrowser = typeof window !== 'undefined';

},{}],3:[function(require,module,exports){
var base = require('./base');
var BaseFormatter = base.BaseFormatter;

var AnnotatedFormatter = function AnnotatedFormatter() {
  this.includeMoveDestinations = false;
};

AnnotatedFormatter.prototype = new BaseFormatter();

AnnotatedFormatter.prototype.prepareContext = function(context) {
  BaseFormatter.prototype.prepareContext.call(this, context);
  context.indent = function(levels) {
    this.indentLevel = (this.indentLevel || 0) +
      (typeof levels === 'undefined' ? 1 : levels);
    this.indentPad = new Array(this.indentLevel + 1).join('&nbsp;&nbsp;');
  };
  context.row = function(json, htmlNote) {
    context.out('<tr><td style="white-space: nowrap;">' +
      '<pre class="jsondiffpatch-annotated-indent" style="display: inline-block">');
    context.out(context.indentPad);
    context.out('</pre><pre style="display: inline-block">');
    context.out(json);
    context.out('</pre></td><td class="jsondiffpatch-delta-note"><div>');
    context.out(htmlNote);
    context.out('</div></td></tr>');
  };
};

AnnotatedFormatter.prototype.typeFormattterErrorFormatter = function(context, err) {
  context.row('', '<pre class="jsondiffpatch-error">' + err + '</pre>');
};

AnnotatedFormatter.prototype.formatTextDiffString = function(context, value) {
  var lines = this.parseTextDiff(value);
  context.out('<ul class="jsondiffpatch-textdiff">');
  for (var i = 0, l = lines.length; i < l; i++) {
    var line = lines[i];
    context.out('<li>' +
      '<div class="jsondiffpatch-textdiff-location">' +
      '<span class="jsondiffpatch-textdiff-line-number">' +
      line.location.line +
      '</span>' +
      '<span class="jsondiffpatch-textdiff-char">' +
      line.location.chr +
      '</span>' +
      '</div>' +
      '<div class="jsondiffpatch-textdiff-line">');
    var pieces = line.pieces;
    for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
      var piece = pieces[pieceIndex];
      context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' +
        piece.text + '</span>');
    }
    context.out('</div></li>');
  }
  context.out('</ul>');
};

AnnotatedFormatter.prototype.rootBegin = function(context, type, nodeType) {
  context.out('<table class="jsondiffpatch-annotated-delta">');
  if (type === 'node') {
    context.row('{');
    context.indent();
  }
  if (nodeType === 'array') {
    context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
  }
};

AnnotatedFormatter.prototype.rootEnd = function(context, type) {
  if (type === 'node') {
    context.indent(-1);
    context.row('}');
  }
  context.out('</table>');
};

AnnotatedFormatter.prototype.nodeBegin = function(context, key, leftKey, type, nodeType) {
  context.row('&quot;' + key + '&quot;: {');
  if (type === 'node') {
    context.indent();
  }
  if (nodeType === 'array') {
    context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
  }
};

AnnotatedFormatter.prototype.nodeEnd = function(context, key, leftKey, type, nodeType, isLast) {
  if (type === 'node') {
    context.indent(-1);
  }
  context.row('}' + (isLast ? '' : ','));
};

/* jshint camelcase: false */

AnnotatedFormatter.prototype.format_unchanged = function() {
  return;
};

AnnotatedFormatter.prototype.format_movedestination = function() {
  return;
};


AnnotatedFormatter.prototype.format_node = function(context, delta, left) {
  // recurse
  this.formatDeltaChildren(context, delta, left);
};

var wrapPropertyName = function(name) {
  return '<pre style="display:inline-block">&quot;' + name + '&quot;</pre>';
};

var deltaAnnotations = {
  added: function(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([newValue])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'new value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'insert at index ' + leftKey + formatLegend;
    }
    return 'add property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  modified: function(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([previousValue, newValue])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'modify value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'modify at index ' + leftKey + formatLegend;
    }
    return 'modify property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  deleted: function(delta, left, key, leftKey) {
    var formatLegend = ' <pre>([previousValue, 0, 0])</pre>';
    if (typeof leftKey === 'undefined') {
      return 'delete value' + formatLegend;
    }
    if (typeof leftKey === 'number') {
      return 'remove index ' + leftKey + formatLegend;
    }
    return 'delete property ' + wrapPropertyName(leftKey) + formatLegend;
  },
  moved: function(delta, left, key, leftKey) {
    return 'move from <span title="(position to remove at original state)">index ' +
      leftKey + '</span> to ' +
      '<span title="(position to insert at final state)">index ' +
      delta[1] + '</span>';
  },
  textdiff: function(delta, left, key, leftKey) {
    var location = (typeof leftKey === 'undefined') ?
      '' : (
        (typeof leftKey === 'number') ?
        ' at index ' + leftKey :
        ' at property ' + wrapPropertyName(leftKey)
      );
    return 'text diff' + location + ', format is ' +
      '<a href="https://code.google.com/p/google-diff-match-patch/wiki/Unidiff">' +
      'a variation of Unidiff</a>';
  }
};

var formatAnyChange = function(context, delta) {
  var deltaType = this.getDeltaType(delta);
  var annotator = deltaAnnotations[deltaType];
  var htmlNote = annotator && annotator.apply(annotator,
    Array.prototype.slice.call(arguments, 1));
  var json = JSON.stringify(delta, null, 2);
  if (deltaType === 'textdiff') {
    // split text diffs lines
    json = json.split('\\n').join('\\n"+\n   "');
  }
  context.indent();
  context.row(json, htmlNote);
  context.indent(-1);
};

AnnotatedFormatter.prototype.format_added = formatAnyChange;
AnnotatedFormatter.prototype.format_modified = formatAnyChange;
AnnotatedFormatter.prototype.format_deleted = formatAnyChange;
AnnotatedFormatter.prototype.format_moved = formatAnyChange;
AnnotatedFormatter.prototype.format_textdiff = formatAnyChange;

/* jshint camelcase: true */

exports.AnnotatedFormatter = AnnotatedFormatter;

var defaultInstance;

exports.format = function(delta, left) {
  if (!defaultInstance) {
    defaultInstance = new AnnotatedFormatter();
  }
  return defaultInstance.format(delta, left);
};

},{"./base":4}],4:[function(require,module,exports){
var isArray = (typeof Array.isArray === 'function') ?
  // use native function
  Array.isArray :
  // use instanceof operator
  function(a) {
    return a instanceof Array;
  };

var getObjectKeys = typeof Object.keys === 'function' ?
  function(obj) {
    return Object.keys(obj);
  } : function(obj) {
    var names = [];
    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {
        names.push(property);
      }
    }
    return names;
  };

var trimUnderscore = function(str) {
  if (str.substr(0, 1) === '_') {
    return str.slice(1);
  }
  return str;
};

var arrayKeyToSortNumber = function(key) {
  if (key === '_t') {
    return -1;
  } else {
    if (key.substr(0, 1) === '_') {
      return parseInt(key.slice(1), 10);
    } else {
      return parseInt(key, 10) + 0.1;
    }
  }
};

var arrayKeyComparer = function(key1, key2) {
  return arrayKeyToSortNumber(key1) - arrayKeyToSortNumber(key2);
};

var BaseFormatter = function BaseFormatter() {};

BaseFormatter.prototype.format = function(delta, left) {
  var context = {};
  this.prepareContext(context);
  this.recurse(context, delta, left);
  return this.finalize(context);
};

BaseFormatter.prototype.prepareContext = function(context) {
  context.buffer = [];
  context.out = function() {
    this.buffer.push.apply(this.buffer, arguments);
  };
};

BaseFormatter.prototype.typeFormattterNotFound = function(context, deltaType) {
  throw new Error('cannot format delta type: ' + deltaType);
};

BaseFormatter.prototype.typeFormattterErrorFormatter = function(context, err) {
  return err.toString();
};

BaseFormatter.prototype.finalize = function(context) {
  if (isArray(context.buffer)) {
    return context.buffer.join('');
  }
};

BaseFormatter.prototype.recurse = function(context, delta, left, key, leftKey, movedFrom, isLast) {

  var useMoveOriginHere = delta && movedFrom;
  var leftValue = useMoveOriginHere ? movedFrom.value : left;

  if (typeof delta === 'undefined' && typeof key === 'undefined') {
    return undefined;
  }

  var type = this.getDeltaType(delta, movedFrom);
  var nodeType = type === 'node' ? (delta._t === 'a' ? 'array' : 'object') : '';

  if (typeof key !== 'undefined') {
    this.nodeBegin(context, key, leftKey, type, nodeType, isLast);
  } else {
    this.rootBegin(context, type, nodeType);
  }

  var typeFormattter;
  try {
    typeFormattter = this['format_' + type] || this.typeFormattterNotFound(context, type);
    typeFormattter.call(this, context, delta, leftValue, key, leftKey, movedFrom);
  } catch (err) {
    this.typeFormattterErrorFormatter(context, err, delta, leftValue, key, leftKey, movedFrom);
    if (typeof console !== 'undefined' && console.error) {
      console.error(err.stack);
    }
  }

  if (typeof key !== 'undefined') {
    this.nodeEnd(context, key, leftKey, type, nodeType, isLast);
  } else {
    this.rootEnd(context, type, nodeType);
  }
};

BaseFormatter.prototype.formatDeltaChildren = function(context, delta, left) {
  var self = this;
  this.forEachDeltaKey(delta, left, function(key, leftKey, movedFrom, isLast) {
    self.recurse(context, delta[key], left ? left[leftKey] : undefined,
      key, leftKey, movedFrom, isLast);
  });
};

BaseFormatter.prototype.forEachDeltaKey = function(delta, left, fn) {
  var keys = getObjectKeys(delta);
  var arrayKeys = delta._t === 'a';
  var moveDestinations = {};
  var name;
  if (typeof left !== 'undefined') {
    for (name in left) {
      if (typeof delta[name] === 'undefined' &&
        ((!arrayKeys) || typeof delta['_' + name] === 'undefined')) {
        keys.push(name);
      }
    }
  }
  // look for move destinations
  for (name in delta) {
    var value = delta[name];
    if (isArray(value) && value[2] === 3) {
      moveDestinations[value[1].toString()] = {
        key: name,
        value: left && left[parseInt(name.substr(1))]
      };
      if (this.includeMoveDestinations !== false) {
        if ((typeof left === 'undefined') &&
          (typeof delta[value[1]] === 'undefined')) {
          keys.push(value[1].toString());
        }
      }
    }
  }
  if (arrayKeys) {
    keys.sort(arrayKeyComparer);
  } else {
    keys.sort();
  }
  for (var index = 0, length = keys.length; index < length; index++) {
    var key = keys[index];
    if (arrayKeys && key === '_t') {
      continue;
    }
    var leftKey = arrayKeys ?
      (typeof key === 'number' ? key : parseInt(trimUnderscore(key), 10)) :
      key;
    var isLast = (index === length - 1);
    fn(key, leftKey, moveDestinations[leftKey], isLast);
  }
};

BaseFormatter.prototype.getDeltaType = function(delta, movedFrom) {
  if (typeof delta === 'undefined') {
    if (typeof movedFrom !== 'undefined') {
      return 'movedestination';
    }
    return 'unchanged';
  }
  if (isArray(delta)) {
    if (delta.length === 1) {
      return 'added';
    }
    if (delta.length === 2) {
      return 'modified';
    }
    if (delta.length === 3 && delta[2] === 0) {
      return 'deleted';
    }
    if (delta.length === 3 && delta[2] === 2) {
      return 'textdiff';
    }
    if (delta.length === 3 && delta[2] === 3) {
      return 'moved';
    }
  } else if (typeof delta === 'object') {
    return 'node';
  }
  return 'unknown';
};

BaseFormatter.prototype.parseTextDiff = function(value) {
  var output = [];
  var lines = value.split('\n@@ ');
  for (var i = 0, l = lines.length; i < l; i++) {
    var line = lines[i];
    var lineOutput = {
      pieces: []
    };
    var location = /^(?:@@ )?[-+]?(\d+),(\d+)/.exec(line).slice(1);
    lineOutput.location = {
      line: location[0],
      chr: location[1]
    };
    var pieces = line.split('\n').slice(1);
    for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
      var piece = pieces[pieceIndex];
      if (!piece.length) {
        continue;
      }
      var pieceOutput = {
        type: 'context'
      };
      if (piece.substr(0, 1) === '+') {
        pieceOutput.type = 'added';
      } else if (piece.substr(0, 1) === '-') {
        pieceOutput.type = 'deleted';
      }
      pieceOutput.text = piece.slice(1);
      lineOutput.pieces.push(pieceOutput);
    }
    output.push(lineOutput);
  }
  return output;
};

exports.BaseFormatter = BaseFormatter;

},{}],5:[function(require,module,exports){
var base = require('./base');
var BaseFormatter = base.BaseFormatter;

var HtmlFormatter = function HtmlFormatter() {};

HtmlFormatter.prototype = new BaseFormatter();

function htmlEscape(text) {
  var html = text;
  var replacements = [
    [/&/g, '&amp;'],
    [/</g, '&lt;'],
    [/>/g, '&gt;'],
    [/'/g, '&apos;'],
    [/"/g, '&quot;']
  ];
  for (var i = 0; i < replacements.length; i++) {
    html = html.replace(replacements[i][0], replacements[i][1]);
  }
  return html;
}

HtmlFormatter.prototype.typeFormattterErrorFormatter = function(context, err) {
  context.out('<pre class="jsondiffpatch-error">' + err + '</pre>');
};

HtmlFormatter.prototype.formatValue = function(context, value) {
  context.out('<pre>' + htmlEscape(JSON.stringify(value, null, 2)) + '</pre>');
};

HtmlFormatter.prototype.formatTextDiffString = function(context, value) {
  var lines = this.parseTextDiff(value);
  context.out('<ul class="jsondiffpatch-textdiff">');
  for (var i = 0, l = lines.length; i < l; i++) {
    var line = lines[i];
    context.out('<li>' +
      '<div class="jsondiffpatch-textdiff-location">' +
      '<span class="jsondiffpatch-textdiff-line-number">' +
      line.location.line +
      '</span>' +
      '<span class="jsondiffpatch-textdiff-char">' +
      line.location.chr +
      '</span>' +
      '</div>' +
      '<div class="jsondiffpatch-textdiff-line">');
    var pieces = line.pieces;
    for (var pieceIndex = 0, piecesLength = pieces.length; pieceIndex < piecesLength; pieceIndex++) {
      /* global unescape */
      var piece = pieces[pieceIndex];
      context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' +
        htmlEscape(unescape(piece.text)) + '</span>');
    }
    context.out('</div></li>');
  }
  context.out('</ul>');
};

var adjustArrows = function jsondiffpatchHtmlFormatterAdjustArrows(node) {
  node = node || document;
  var getElementText = function(el) {
    return el.textContent || el.innerText;
  };
  var eachByQuery = function(el, query, fn) {
    var elems = el.querySelectorAll(query);
    for (var i = 0, l = elems.length; i < l; i++) {
      fn(elems[i]);
    }
  };
  var eachChildren = function(el, fn) {
    for (var i = 0, l = el.children.length; i < l; i++) {
      fn(el.children[i], i);
    }
  };
  eachByQuery(node, '.jsondiffpatch-arrow', function(arrow) {
    var arrowParent = arrow.parentNode;
    var svg = arrow.children[0],
      path = svg.children[1];
    svg.style.display = 'none';
    var destination = getElementText(arrowParent.querySelector('.jsondiffpatch-moved-destination'));
    var container = arrowParent.parentNode;
    var destinationElem;
    eachChildren(container, function(child) {
      if (child.getAttribute('data-key') === destination) {
        destinationElem = child;
      }
    });
    if (!destinationElem) {
      return;
    }
    try {
      var distance = destinationElem.offsetTop - arrowParent.offsetTop;
      svg.setAttribute('height', Math.abs(distance) + 6);
      arrow.style.top = (-8 + (distance > 0 ? 0 : distance)) + 'px';
      var curve = distance > 0 ?
        'M30,0 Q-10,' + Math.round(distance / 2) + ' 26,' + (distance - 4) :
        'M30,' + (-distance) + ' Q-10,' + Math.round(-distance / 2) + ' 26,4';
      path.setAttribute('d', curve);
      svg.style.display = '';
    } catch (err) {
      return;
    }
  });
};

HtmlFormatter.prototype.rootBegin = function(context, type, nodeType) {
  var nodeClass = 'jsondiffpatch-' + type +
    (nodeType ? ' jsondiffpatch-child-node-type-' + nodeType : '');
  context.out('<div class="jsondiffpatch-delta ' + nodeClass + '">');
};

HtmlFormatter.prototype.rootEnd = function(context) {
  context.out('</div>' + (context.hasArrows ?
    ('<script type="text/javascript">setTimeout(' +
      adjustArrows.toString() +
      ',10);</script>') : ''));
};

HtmlFormatter.prototype.nodeBegin = function(context, key, leftKey, type, nodeType) {
  var nodeClass = 'jsondiffpatch-' + type +
    (nodeType ? ' jsondiffpatch-child-node-type-' + nodeType : '');
  context.out('<li class="' + nodeClass + '" data-key="' + leftKey + '">' +
    '<div class="jsondiffpatch-property-name">' + leftKey + '</div>');
};


HtmlFormatter.prototype.nodeEnd = function(context) {
  context.out('</li>');
};

/* jshint camelcase: false */

HtmlFormatter.prototype.format_unchanged = function(context, delta, left) {
  if (typeof left === 'undefined') {
    return;
  }
  context.out('<div class="jsondiffpatch-value">');
  this.formatValue(context, left);
  context.out('</div>');
};

HtmlFormatter.prototype.format_movedestination = function(context, delta, left) {
  if (typeof left === 'undefined') {
    return;
  }
  context.out('<div class="jsondiffpatch-value">');
  this.formatValue(context, left);
  context.out('</div>');
};

HtmlFormatter.prototype.format_node = function(context, delta, left) {
  // recurse
  var nodeType = (delta._t === 'a') ? 'array' : 'object';
  context.out('<ul class="jsondiffpatch-node jsondiffpatch-node-type-' + nodeType + '">');
  this.formatDeltaChildren(context, delta, left);
  context.out('</ul>');
};

HtmlFormatter.prototype.format_added = function(context, delta) {
  context.out('<div class="jsondiffpatch-value">');
  this.formatValue(context, delta[0]);
  context.out('</div>');
};

HtmlFormatter.prototype.format_modified = function(context, delta) {
  context.out('<div class="jsondiffpatch-value jsondiffpatch-left-value">');
  this.formatValue(context, delta[0]);
  context.out('</div>' +
    '<div class="jsondiffpatch-value jsondiffpatch-right-value">');
  this.formatValue(context, delta[1]);
  context.out('</div>');
};

HtmlFormatter.prototype.format_deleted = function(context, delta) {
  context.out('<div class="jsondiffpatch-value">');
  this.formatValue(context, delta[0]);
  context.out('</div>');
};

HtmlFormatter.prototype.format_moved = function(context, delta) {
  context.out('<div class="jsondiffpatch-value">');
  this.formatValue(context, delta[0]);
  context.out('</div><div class="jsondiffpatch-moved-destination">' + delta[1] + '</div>');

  // draw an SVG arrow from here to move destination
  context.out(
    /*jshint multistr: true */
    '<div class="jsondiffpatch-arrow" style="position: relative; left: -34px;">\
        <svg width="30" height="60" style="position: absolute; display: none;">\
        <defs>\
            <marker id="markerArrow" markerWidth="8" markerHeight="8" refx="2" refy="4"\
                   orient="auto" markerUnits="userSpaceOnUse">\
                <path d="M1,1 L1,7 L7,4 L1,1" style="fill: #339;" />\
            </marker>\
        </defs>\
        <path d="M30,0 Q-10,25 26,50" style="stroke: #88f; stroke-width: 2px; fill: none;\
        stroke-opacity: 0.5; marker-end: url(#markerArrow);"></path>\
        </svg>\
        </div>');
  context.hasArrows = true;
};

HtmlFormatter.prototype.format_textdiff = function(context, delta) {
  context.out('<div class="jsondiffpatch-value">');
  this.formatTextDiffString(context, delta[0]);
  context.out('</div>');
};

/* jshint camelcase: true */

var showUnchanged = function(show, node, delay) {
  var el = node || document.body;
  var prefix = 'jsondiffpatch-unchanged-';
  var classes = {
    showing: prefix + 'showing',
    hiding: prefix + 'hiding',
    visible: prefix + 'visible',
    hidden: prefix + 'hidden',
  };
  var list = el.classList;
  if (!list) {
    return;
  }
  if (!delay) {
    list.remove(classes.showing);
    list.remove(classes.hiding);
    list.remove(classes.visible);
    list.remove(classes.hidden);
    if (show === false) {
      list.add(classes.hidden);
    }
    return;
  }
  if (show === false) {
    list.remove(classes.showing);
    list.add(classes.visible);
    setTimeout(function() {
      list.add(classes.hiding);
    }, 10);
  } else {
    list.remove(classes.hiding);
    list.add(classes.showing);
    list.remove(classes.hidden);
  }
  var intervalId = setInterval(function() {
    adjustArrows(el);
  }, 100);
  setTimeout(function() {
    list.remove(classes.showing);
    list.remove(classes.hiding);
    if (show === false) {
      list.add(classes.hidden);
      list.remove(classes.visible);
    } else {
      list.add(classes.visible);
      list.remove(classes.hidden);
    }
    setTimeout(function() {
      list.remove(classes.visible);
      clearInterval(intervalId);
    }, delay + 400);
  }, delay);
};

var hideUnchanged = function(node, delay) {
  return showUnchanged(false, node, delay);
};

exports.HtmlFormatter = HtmlFormatter;

exports.showUnchanged = showUnchanged;

exports.hideUnchanged = hideUnchanged;

var defaultInstance;

exports.format = function(delta, left) {
  if (!defaultInstance) {
    defaultInstance = new HtmlFormatter();
  }
  return defaultInstance.format(delta, left);
};

},{"./base":4}],6:[function(require,module,exports){
var environment = require('../environment');

exports.base = require('./base');
exports.html = require('./html');
exports.annotated = require('./annotated');
exports.jsonpatch = require('./jsonpatch');

if (!environment.isBrowser) {
  var consoleModuleName = './console';
  exports.console = require(consoleModuleName);
}

},{"../environment":2,"./annotated":3,"./base":4,"./html":5,"./jsonpatch":7}],7:[function(require,module,exports){
(function () {
  var base = require('./base');
  var BaseFormatter = base.BaseFormatter;

  var named = {
    added: 'add',
    deleted: 'remove',
    modified: 'replace',
    moved: 'moved',
    movedestination: 'movedestination',
    unchanged: 'unchanged',
    error: 'error',
    textDiffLine: 'textDiffLine'
  };

  function JSONFormatter() {
    this.includeMoveDestinations = false;
  }

  JSONFormatter.prototype = new BaseFormatter();

  JSONFormatter.prototype.prepareContext = function (context) {
    BaseFormatter.prototype.prepareContext.call(this, context);
    context.result = [];
    context.path = [];
    context.pushCurrentOp = function (op, value) {
      var val = {
        op: op,
        path: this.currentPath()
      };
      if (typeof value !== 'undefined') {
        val.value = value;
      }
      this.result.push(val);
    };

    context.currentPath = function () {
      return '/' + this.path.join('/');
    };
  };

  JSONFormatter.prototype.typeFormattterErrorFormatter = function (context, err) {
    context.out('[ERROR]' + err);
  };

  JSONFormatter.prototype.rootBegin = function () {
  };

  JSONFormatter.prototype.rootEnd = function () {
  };

  JSONFormatter.prototype.nodeBegin = function (context, key, leftKey) {
    context.path.push(leftKey);
  };

  JSONFormatter.prototype.nodeEnd = function (context) {
    context.path.pop();
  };

  /* jshint camelcase: false */

  JSONFormatter.prototype.format_unchanged = function (context, delta, left) {
    if (typeof left === 'undefined') {
      return;
    }
    context.pushCurrentOp(named.unchanged, left);
  };

  JSONFormatter.prototype.format_movedestination = function (context, delta, left) {
    if (typeof left === 'undefined') {
      return;
    }
    context.pushCurrentOp(named.movedestination, left);
  };

  JSONFormatter.prototype.format_node = function (context, delta, left) {
    this.formatDeltaChildren(context, delta, left);
  };

  JSONFormatter.prototype.format_added = function (context, delta) {
    context.pushCurrentOp(named.added, delta[0]);
  };

  JSONFormatter.prototype.format_modified = function (context, delta) {
    context.pushCurrentOp(named.modified, delta[1]);
  };

  JSONFormatter.prototype.format_deleted = function (context) {
    context.pushCurrentOp(named.deleted);
  };

  JSONFormatter.prototype.format_moved = function (context, delta) {
    context.pushCurrentOp(named.moved, delta[1]);
  };

  JSONFormatter.prototype.format_textdiff = function () {
    throw 'not implimented';
  };

  JSONFormatter.prototype.format = function (delta, left) {
    var context = {};
    this.prepareContext(context);
    this.recurse(context, delta, left);
    return context.result;
  };
  /* jshint camelcase: true */

  exports.JSONFormatter = JSONFormatter;

  var defaultInstance;

  function last(arr) {
    return arr[arr.length - 1];
  }

  function sortBy(arr, pred) {
    arr.sort(pred);
    return arr;
  }

  var compareByIndexDesc = function (indexA, indexB) {
    var lastA = parseInt(indexA, 10);
    var lastB = parseInt(indexB, 10);
    if (!(isNaN(lastA) || isNaN(lastB))) {
      return lastB - lastA;
    } else {
      return 0;
    }
  };

  function opsByDescendingOrder(removeOps) {
    return sortBy(removeOps, function (a, b) {
      var splitA = a.path.split('/');
      var splitB = b.path.split('/');
      if (splitA.length !== splitB.length) {
        return splitA.length - splitB.length;
      } else {
        return compareByIndexDesc(last(splitA), last(splitB));
      }
    });
  }

  function partition(arr, pred) {
    var left = [];
    var right = [];

    arr.forEach(function (el) {
      var coll = pred(el) ? left : right;
      coll.push(el);
    });
    return [left, right];
  }

  function reorderOps(jsonFormattedDiff) {
    var removeOpsOtherOps = partition(jsonFormattedDiff, function (operation) {
      return operation.op === 'remove';
    });
    var removeOps = removeOpsOtherOps[0];
    var otherOps = removeOpsOtherOps[1];

    var removeOpsReverse = opsByDescendingOrder(removeOps);
    return removeOpsReverse.concat(otherOps);
  }


  var format = function (delta, left) {
    if (!defaultInstance) {
      defaultInstance = new JSONFormatter();
    }
    return reorderOps(defaultInstance.format(delta, left));
  };

  exports.log = function (delta, left) {
    console.log(format(delta, left));
  };

  exports.format = format;
})();

},{"./base":4}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9maWJlcmdsYXNzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi1mb3JtYXR0ZXJzLmpzIiwic3JjL2Vudmlyb25tZW50LmpzIiwic3JjL2Zvcm1hdHRlcnMvYW5ub3RhdGVkLmpzIiwic3JjL2Zvcm1hdHRlcnMvYmFzZS5qcyIsInNyYy9mb3JtYXR0ZXJzL2h0bWwuanMiLCJzcmMvZm9ybWF0dGVycy9pbmRleC5qcyIsInNyYy9mb3JtYXR0ZXJzL2pzb25wYXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZm9ybWF0dGVycycpO1xuIiwiXG5leHBvcnRzLmlzQnJvd3NlciA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnO1xuIiwidmFyIGJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBCYXNlRm9ybWF0dGVyID0gYmFzZS5CYXNlRm9ybWF0dGVyO1xuXG52YXIgQW5ub3RhdGVkRm9ybWF0dGVyID0gZnVuY3Rpb24gQW5ub3RhdGVkRm9ybWF0dGVyKCkge1xuICB0aGlzLmluY2x1ZGVNb3ZlRGVzdGluYXRpb25zID0gZmFsc2U7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlID0gbmV3IEJhc2VGb3JtYXR0ZXIoKTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucHJlcGFyZUNvbnRleHQuY2FsbCh0aGlzLCBjb250ZXh0KTtcbiAgY29udGV4dC5pbmRlbnQgPSBmdW5jdGlvbihsZXZlbHMpIHtcbiAgICB0aGlzLmluZGVudExldmVsID0gKHRoaXMuaW5kZW50TGV2ZWwgfHwgMCkgK1xuICAgICAgKHR5cGVvZiBsZXZlbHMgPT09ICd1bmRlZmluZWQnID8gMSA6IGxldmVscyk7XG4gICAgdGhpcy5pbmRlbnRQYWQgPSBuZXcgQXJyYXkodGhpcy5pbmRlbnRMZXZlbCArIDEpLmpvaW4oJyZuYnNwOyZuYnNwOycpO1xuICB9O1xuICBjb250ZXh0LnJvdyA9IGZ1bmN0aW9uKGpzb24sIGh0bWxOb3RlKSB7XG4gICAgY29udGV4dC5vdXQoJzx0cj48dGQgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogbm93cmFwO1wiPicgK1xuICAgICAgJzxwcmUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWFubm90YXRlZC1pbmRlbnRcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9ja1wiPicpO1xuICAgIGNvbnRleHQub3V0KGNvbnRleHQuaW5kZW50UGFkKTtcbiAgICBjb250ZXh0Lm91dCgnPC9wcmU+PHByZSBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9ja1wiPicpO1xuICAgIGNvbnRleHQub3V0KGpzb24pO1xuICAgIGNvbnRleHQub3V0KCc8L3ByZT48L3RkPjx0ZCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZGVsdGEtbm90ZVwiPjxkaXY+Jyk7XG4gICAgY29udGV4dC5vdXQoaHRtbE5vdGUpO1xuICAgIGNvbnRleHQub3V0KCc8L2Rpdj48L3RkPjwvdHI+Jyk7XG4gIH07XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIgPSBmdW5jdGlvbihjb250ZXh0LCBlcnIpIHtcbiAgY29udGV4dC5yb3coJycsICc8cHJlIGNsYXNzPVwianNvbmRpZmZwYXRjaC1lcnJvclwiPicgKyBlcnIgKyAnPC9wcmU+Jyk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFRleHREaWZmU3RyaW5nID0gZnVuY3Rpb24oY29udGV4dCwgdmFsdWUpIHtcbiAgdmFyIGxpbmVzID0gdGhpcy5wYXJzZVRleHREaWZmKHZhbHVlKTtcbiAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmZcIj4nKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgIGNvbnRleHQub3V0KCc8bGk+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbG9jYXRpb25cIj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZS1udW1iZXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24ubGluZSArXG4gICAgICAnPC9zcGFuPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1jaGFyXCI+JyArXG4gICAgICBsaW5lLmxvY2F0aW9uLmNociArXG4gICAgICAnPC9zcGFuPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxpbmVcIj4nKTtcbiAgICB2YXIgcGllY2VzID0gbGluZS5waWVjZXM7XG4gICAgZm9yICh2YXIgcGllY2VJbmRleCA9IDAsIHBpZWNlc0xlbmd0aCA9IHBpZWNlcy5sZW5ndGg7IHBpZWNlSW5kZXggPCBwaWVjZXNMZW5ndGg7IHBpZWNlSW5kZXgrKykge1xuICAgICAgdmFyIHBpZWNlID0gcGllY2VzW3BpZWNlSW5kZXhdO1xuICAgICAgY29udGV4dC5vdXQoJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi0nICsgcGllY2UudHlwZSArICdcIj4nICtcbiAgICAgICAgcGllY2UudGV4dCArICc8L3NwYW4+Jyk7XG4gICAgfVxuICAgIGNvbnRleHQub3V0KCc8L2Rpdj48L2xpPicpO1xuICB9XG4gIGNvbnRleHQub3V0KCc8L3VsPicpO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5yb290QmVnaW4gPSBmdW5jdGlvbihjb250ZXh0LCB0eXBlLCBub2RlVHlwZSkge1xuICBjb250ZXh0Lm91dCgnPHRhYmxlIGNsYXNzPVwianNvbmRpZmZwYXRjaC1hbm5vdGF0ZWQtZGVsdGFcIj4nKTtcbiAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgIGNvbnRleHQucm93KCd7Jyk7XG4gICAgY29udGV4dC5pbmRlbnQoKTtcbiAgfVxuICBpZiAobm9kZVR5cGUgPT09ICdhcnJheScpIHtcbiAgICBjb250ZXh0LnJvdygnXCJfdFwiOiBcImFcIiwnLCAnQXJyYXkgZGVsdGEgKG1lbWJlciBuYW1lcyBpbmRpY2F0ZSBhcnJheSBpbmRpY2VzKScpO1xuICB9XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RFbmQgPSBmdW5jdGlvbihjb250ZXh0LCB0eXBlKSB7XG4gIGlmICh0eXBlID09PSAnbm9kZScpIHtcbiAgICBjb250ZXh0LmluZGVudCgtMSk7XG4gICAgY29udGV4dC5yb3coJ30nKTtcbiAgfVxuICBjb250ZXh0Lm91dCgnPC90YWJsZT4nKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUJlZ2luID0gZnVuY3Rpb24oY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSkge1xuICBjb250ZXh0LnJvdygnJnF1b3Q7JyArIGtleSArICcmcXVvdDs6IHsnKTtcbiAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgIGNvbnRleHQuaW5kZW50KCk7XG4gIH1cbiAgaWYgKG5vZGVUeXBlID09PSAnYXJyYXknKSB7XG4gICAgY29udGV4dC5yb3coJ1wiX3RcIjogXCJhXCIsJywgJ0FycmF5IGRlbHRhIChtZW1iZXIgbmFtZXMgaW5kaWNhdGUgYXJyYXkgaW5kaWNlcyknKTtcbiAgfVxufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlRW5kID0gZnVuY3Rpb24oY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSwgaXNMYXN0KSB7XG4gIGlmICh0eXBlID09PSAnbm9kZScpIHtcbiAgICBjb250ZXh0LmluZGVudCgtMSk7XG4gIH1cbiAgY29udGV4dC5yb3coJ30nICsgKGlzTGFzdCA/ICcnIDogJywnKSk7XG59O1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF91bmNoYW5nZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWRlc3RpbmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybjtcbn07XG5cblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbm9kZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gIC8vIHJlY3Vyc2VcbiAgdGhpcy5mb3JtYXREZWx0YUNoaWxkcmVuKGNvbnRleHQsIGRlbHRhLCBsZWZ0KTtcbn07XG5cbnZhciB3cmFwUHJvcGVydHlOYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gJzxwcmUgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9ja1wiPiZxdW90OycgKyBuYW1lICsgJyZxdW90OzwvcHJlPic7XG59O1xuXG52YXIgZGVsdGFBbm5vdGF0aW9ucyA9IHtcbiAgYWRkZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICB2YXIgZm9ybWF0TGVnZW5kID0gJyA8cHJlPihbbmV3VmFsdWVdKTwvcHJlPic7XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICduZXcgdmFsdWUnICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJ2luc2VydCBhdCBpbmRleCAnICsgbGVmdEtleSArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgcmV0dXJuICdhZGQgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSkgKyBmb3JtYXRMZWdlbmQ7XG4gIH0sXG4gIG1vZGlmaWVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgdmFyIGZvcm1hdExlZ2VuZCA9ICcgPHByZT4oW3ByZXZpb3VzVmFsdWUsIG5ld1ZhbHVlXSk8L3ByZT4nO1xuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnbW9kaWZ5IHZhbHVlJyArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuICdtb2RpZnkgYXQgaW5kZXggJyArIGxlZnRLZXkgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIHJldHVybiAnbW9kaWZ5IHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpICsgZm9ybWF0TGVnZW5kO1xuICB9LFxuICBkZWxldGVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgdmFyIGZvcm1hdExlZ2VuZCA9ICcgPHByZT4oW3ByZXZpb3VzVmFsdWUsIDAsIDBdKTwvcHJlPic7XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICdkZWxldGUgdmFsdWUnICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJ3JlbW92ZSBpbmRleCAnICsgbGVmdEtleSArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgcmV0dXJuICdkZWxldGUgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSkgKyBmb3JtYXRMZWdlbmQ7XG4gIH0sXG4gIG1vdmVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgcmV0dXJuICdtb3ZlIGZyb20gPHNwYW4gdGl0bGU9XCIocG9zaXRpb24gdG8gcmVtb3ZlIGF0IG9yaWdpbmFsIHN0YXRlKVwiPmluZGV4ICcgK1xuICAgICAgbGVmdEtleSArICc8L3NwYW4+IHRvICcgK1xuICAgICAgJzxzcGFuIHRpdGxlPVwiKHBvc2l0aW9uIHRvIGluc2VydCBhdCBmaW5hbCBzdGF0ZSlcIj5pbmRleCAnICtcbiAgICAgIGRlbHRhWzFdICsgJzwvc3Bhbj4nO1xuICB9LFxuICB0ZXh0ZGlmZjogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHZhciBsb2NhdGlvbiA9ICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpID9cbiAgICAgICcnIDogKFxuICAgICAgICAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSA/XG4gICAgICAgICcgYXQgaW5kZXggJyArIGxlZnRLZXkgOlxuICAgICAgICAnIGF0IHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpXG4gICAgICApO1xuICAgIHJldHVybiAndGV4dCBkaWZmJyArIGxvY2F0aW9uICsgJywgZm9ybWF0IGlzICcgK1xuICAgICAgJzxhIGhyZWY9XCJodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1kaWZmLW1hdGNoLXBhdGNoL3dpa2kvVW5pZGlmZlwiPicgK1xuICAgICAgJ2EgdmFyaWF0aW9uIG9mIFVuaWRpZmY8L2E+JztcbiAgfVxufTtcblxudmFyIGZvcm1hdEFueUNoYW5nZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIHZhciBkZWx0YVR5cGUgPSB0aGlzLmdldERlbHRhVHlwZShkZWx0YSk7XG4gIHZhciBhbm5vdGF0b3IgPSBkZWx0YUFubm90YXRpb25zW2RlbHRhVHlwZV07XG4gIHZhciBodG1sTm90ZSA9IGFubm90YXRvciAmJiBhbm5vdGF0b3IuYXBwbHkoYW5ub3RhdG9yLFxuICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KGRlbHRhLCBudWxsLCAyKTtcbiAgaWYgKGRlbHRhVHlwZSA9PT0gJ3RleHRkaWZmJykge1xuICAgIC8vIHNwbGl0IHRleHQgZGlmZnMgbGluZXNcbiAgICBqc29uID0ganNvbi5zcGxpdCgnXFxcXG4nKS5qb2luKCdcXFxcblwiK1xcbiAgIFwiJyk7XG4gIH1cbiAgY29udGV4dC5pbmRlbnQoKTtcbiAgY29udGV4dC5yb3coanNvbiwgaHRtbE5vdGUpO1xuICBjb250ZXh0LmluZGVudCgtMSk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9hZGRlZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vZGlmaWVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfZGVsZXRlZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdGV4dGRpZmYgPSBmb3JtYXRBbnlDaGFuZ2U7XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IHRydWUgKi9cblxuZXhwb3J0cy5Bbm5vdGF0ZWRGb3JtYXR0ZXIgPSBBbm5vdGF0ZWRGb3JtYXR0ZXI7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZGVsdGEsIGxlZnQpIHtcbiAgaWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcbiAgICBkZWZhdWx0SW5zdGFuY2UgPSBuZXcgQW5ub3RhdGVkRm9ybWF0dGVyKCk7XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5mb3JtYXQoZGVsdGEsIGxlZnQpO1xufTtcbiIsInZhciBpc0FycmF5ID0gKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSA/XG4gIC8vIHVzZSBuYXRpdmUgZnVuY3Rpb25cbiAgQXJyYXkuaXNBcnJheSA6XG4gIC8vIHVzZSBpbnN0YW5jZW9mIG9wZXJhdG9yXG4gIGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5O1xuICB9O1xuXG52YXIgZ2V0T2JqZWN0S2V5cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyA/XG4gIGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopO1xuICB9IDogZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICBuYW1lcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzO1xuICB9O1xuXG52YXIgdHJpbVVuZGVyc2NvcmUgPSBmdW5jdGlvbihzdHIpIHtcbiAgaWYgKHN0ci5zdWJzdHIoMCwgMSkgPT09ICdfJykge1xuICAgIHJldHVybiBzdHIuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cbnZhciBhcnJheUtleVRvU29ydE51bWJlciA9IGZ1bmN0aW9uKGtleSkge1xuICBpZiAoa2V5ID09PSAnX3QnKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2Uge1xuICAgIGlmIChrZXkuc3Vic3RyKDAsIDEpID09PSAnXycpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChrZXkuc2xpY2UoMSksIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGtleSwgMTApICsgMC4xO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGFycmF5S2V5Q29tcGFyZXIgPSBmdW5jdGlvbihrZXkxLCBrZXkyKSB7XG4gIHJldHVybiBhcnJheUtleVRvU29ydE51bWJlcihrZXkxKSAtIGFycmF5S2V5VG9Tb3J0TnVtYmVyKGtleTIpO1xufTtcblxudmFyIEJhc2VGb3JtYXR0ZXIgPSBmdW5jdGlvbiBCYXNlRm9ybWF0dGVyKCkge307XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0KSB7XG4gIHZhciBjb250ZXh0ID0ge307XG4gIHRoaXMucHJlcGFyZUNvbnRleHQoY29udGV4dCk7XG4gIHRoaXMucmVjdXJzZShjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG4gIHJldHVybiB0aGlzLmZpbmFsaXplKGNvbnRleHQpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucHJlcGFyZUNvbnRleHQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGNvbnRleHQuYnVmZmVyID0gW107XG4gIGNvbnRleHQub3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5idWZmZXIucHVzaC5hcHBseSh0aGlzLmJ1ZmZlciwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyTm90Rm91bmQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YVR5cGUpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZm9ybWF0IGRlbHRhIHR5cGU6ICcgKyBkZWx0YVR5cGUpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICByZXR1cm4gZXJyLnRvU3RyaW5nKCk7XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5maW5hbGl6ZSA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgaWYgKGlzQXJyYXkoY29udGV4dC5idWZmZXIpKSB7XG4gICAgcmV0dXJuIGNvbnRleHQuYnVmZmVyLmpvaW4oJycpO1xuICB9XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5yZWN1cnNlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tLCBpc0xhc3QpIHtcblxuICB2YXIgdXNlTW92ZU9yaWdpbkhlcmUgPSBkZWx0YSAmJiBtb3ZlZEZyb207XG4gIHZhciBsZWZ0VmFsdWUgPSB1c2VNb3ZlT3JpZ2luSGVyZSA/IG1vdmVkRnJvbS52YWx1ZSA6IGxlZnQ7XG5cbiAgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmFyIHR5cGUgPSB0aGlzLmdldERlbHRhVHlwZShkZWx0YSwgbW92ZWRGcm9tKTtcbiAgdmFyIG5vZGVUeXBlID0gdHlwZSA9PT0gJ25vZGUnID8gKGRlbHRhLl90ID09PSAnYScgPyAnYXJyYXknIDogJ29iamVjdCcpIDogJyc7XG5cbiAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5ub2RlQmVnaW4oY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSwgaXNMYXN0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJvb3RCZWdpbihjb250ZXh0LCB0eXBlLCBub2RlVHlwZSk7XG4gIH1cblxuICB2YXIgdHlwZUZvcm1hdHR0ZXI7XG4gIHRyeSB7XG4gICAgdHlwZUZvcm1hdHR0ZXIgPSB0aGlzWydmb3JtYXRfJyArIHR5cGVdIHx8IHRoaXMudHlwZUZvcm1hdHR0ZXJOb3RGb3VuZChjb250ZXh0LCB0eXBlKTtcbiAgICB0eXBlRm9ybWF0dHRlci5jYWxsKHRoaXMsIGNvbnRleHQsIGRlbHRhLCBsZWZ0VmFsdWUsIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhpcy50eXBlRm9ybWF0dHRlckVycm9yRm9ybWF0dGVyKGNvbnRleHQsIGVyciwgZGVsdGEsIGxlZnRWYWx1ZSwga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMubm9kZUVuZChjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlLCBpc0xhc3QpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucm9vdEVuZChjb250ZXh0LCB0eXBlLCBub2RlVHlwZSk7XG4gIH1cbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdERlbHRhQ2hpbGRyZW4gPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuZm9yRWFjaERlbHRhS2V5KGRlbHRhLCBsZWZ0LCBmdW5jdGlvbihrZXksIGxlZnRLZXksIG1vdmVkRnJvbSwgaXNMYXN0KSB7XG4gICAgc2VsZi5yZWN1cnNlKGNvbnRleHQsIGRlbHRhW2tleV0sIGxlZnQgPyBsZWZ0W2xlZnRLZXldIDogdW5kZWZpbmVkLFxuICAgICAga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20sIGlzTGFzdCk7XG4gIH0pO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZm9yRWFjaERlbHRhS2V5ID0gZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGZuKSB7XG4gIHZhciBrZXlzID0gZ2V0T2JqZWN0S2V5cyhkZWx0YSk7XG4gIHZhciBhcnJheUtleXMgPSBkZWx0YS5fdCA9PT0gJ2EnO1xuICB2YXIgbW92ZURlc3RpbmF0aW9ucyA9IHt9O1xuICB2YXIgbmFtZTtcbiAgaWYgKHR5cGVvZiBsZWZ0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGZvciAobmFtZSBpbiBsZWZ0KSB7XG4gICAgICBpZiAodHlwZW9mIGRlbHRhW25hbWVdID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAoKCFhcnJheUtleXMpIHx8IHR5cGVvZiBkZWx0YVsnXycgKyBuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgIGtleXMucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gbG9vayBmb3IgbW92ZSBkZXN0aW5hdGlvbnNcbiAgZm9yIChuYW1lIGluIGRlbHRhKSB7XG4gICAgdmFyIHZhbHVlID0gZGVsdGFbbmFtZV07XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlWzJdID09PSAzKSB7XG4gICAgICBtb3ZlRGVzdGluYXRpb25zW3ZhbHVlWzFdLnRvU3RyaW5nKCldID0ge1xuICAgICAgICBrZXk6IG5hbWUsXG4gICAgICAgIHZhbHVlOiBsZWZ0ICYmIGxlZnRbcGFyc2VJbnQobmFtZS5zdWJzdHIoMSkpXVxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLmluY2x1ZGVNb3ZlRGVzdGluYXRpb25zICE9PSBmYWxzZSkge1xuICAgICAgICBpZiAoKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAodHlwZW9mIGRlbHRhW3ZhbHVlWzFdXSA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAga2V5cy5wdXNoKHZhbHVlWzFdLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChhcnJheUtleXMpIHtcbiAgICBrZXlzLnNvcnQoYXJyYXlLZXlDb21wYXJlcik7XG4gIH0gZWxzZSB7XG4gICAga2V5cy5zb3J0KCk7XG4gIH1cbiAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgaWYgKGFycmF5S2V5cyAmJiBrZXkgPT09ICdfdCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgbGVmdEtleSA9IGFycmF5S2V5cyA/XG4gICAgICAodHlwZW9mIGtleSA9PT0gJ251bWJlcicgPyBrZXkgOiBwYXJzZUludCh0cmltVW5kZXJzY29yZShrZXkpLCAxMCkpIDpcbiAgICAgIGtleTtcbiAgICB2YXIgaXNMYXN0ID0gKGluZGV4ID09PSBsZW5ndGggLSAxKTtcbiAgICBmbihrZXksIGxlZnRLZXksIG1vdmVEZXN0aW5hdGlvbnNbbGVmdEtleV0sIGlzTGFzdCk7XG4gIH1cbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmdldERlbHRhVHlwZSA9IGZ1bmN0aW9uKGRlbHRhLCBtb3ZlZEZyb20pIHtcbiAgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vdmVkRnJvbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnbW92ZWRlc3RpbmF0aW9uJztcbiAgICB9XG4gICAgcmV0dXJuICd1bmNoYW5nZWQnO1xuICB9XG4gIGlmIChpc0FycmF5KGRlbHRhKSkge1xuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiAnYWRkZWQnO1xuICAgIH1cbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm4gJ21vZGlmaWVkJztcbiAgICB9XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMyAmJiBkZWx0YVsyXSA9PT0gMCkge1xuICAgICAgcmV0dXJuICdkZWxldGVkJztcbiAgICB9XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMyAmJiBkZWx0YVsyXSA9PT0gMikge1xuICAgICAgcmV0dXJuICd0ZXh0ZGlmZic7XG4gICAgfVxuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDMgJiYgZGVsdGFbMl0gPT09IDMpIHtcbiAgICAgIHJldHVybiAnbW92ZWQnO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVsdGEgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuICdub2RlJztcbiAgfVxuICByZXR1cm4gJ3Vua25vd24nO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucGFyc2VUZXh0RGlmZiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGxpbmVzID0gdmFsdWUuc3BsaXQoJ1xcbkBAICcpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgdmFyIGxpbmVPdXRwdXQgPSB7XG4gICAgICBwaWVjZXM6IFtdXG4gICAgfTtcbiAgICB2YXIgbG9jYXRpb24gPSAvXig/OkBAICk/Wy0rXT8oXFxkKyksKFxcZCspLy5leGVjKGxpbmUpLnNsaWNlKDEpO1xuICAgIGxpbmVPdXRwdXQubG9jYXRpb24gPSB7XG4gICAgICBsaW5lOiBsb2NhdGlvblswXSxcbiAgICAgIGNocjogbG9jYXRpb25bMV1cbiAgICB9O1xuICAgIHZhciBwaWVjZXMgPSBsaW5lLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcbiAgICBmb3IgKHZhciBwaWVjZUluZGV4ID0gMCwgcGllY2VzTGVuZ3RoID0gcGllY2VzLmxlbmd0aDsgcGllY2VJbmRleCA8IHBpZWNlc0xlbmd0aDsgcGllY2VJbmRleCsrKSB7XG4gICAgICB2YXIgcGllY2UgPSBwaWVjZXNbcGllY2VJbmRleF07XG4gICAgICBpZiAoIXBpZWNlLmxlbmd0aCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBwaWVjZU91dHB1dCA9IHtcbiAgICAgICAgdHlwZTogJ2NvbnRleHQnXG4gICAgICB9O1xuICAgICAgaWYgKHBpZWNlLnN1YnN0cigwLCAxKSA9PT0gJysnKSB7XG4gICAgICAgIHBpZWNlT3V0cHV0LnR5cGUgPSAnYWRkZWQnO1xuICAgICAgfSBlbHNlIGlmIChwaWVjZS5zdWJzdHIoMCwgMSkgPT09ICctJykge1xuICAgICAgICBwaWVjZU91dHB1dC50eXBlID0gJ2RlbGV0ZWQnO1xuICAgICAgfVxuICAgICAgcGllY2VPdXRwdXQudGV4dCA9IHBpZWNlLnNsaWNlKDEpO1xuICAgICAgbGluZU91dHB1dC5waWVjZXMucHVzaChwaWVjZU91dHB1dCk7XG4gICAgfVxuICAgIG91dHB1dC5wdXNoKGxpbmVPdXRwdXQpO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnRzLkJhc2VGb3JtYXR0ZXIgPSBCYXNlRm9ybWF0dGVyO1xuIiwidmFyIGJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBCYXNlRm9ybWF0dGVyID0gYmFzZS5CYXNlRm9ybWF0dGVyO1xuXG52YXIgSHRtbEZvcm1hdHRlciA9IGZ1bmN0aW9uIEh0bWxGb3JtYXR0ZXIoKSB7fTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUgPSBuZXcgQmFzZUZvcm1hdHRlcigpO1xuXG5mdW5jdGlvbiBodG1sRXNjYXBlKHRleHQpIHtcbiAgdmFyIGh0bWwgPSB0ZXh0O1xuICB2YXIgcmVwbGFjZW1lbnRzID0gW1xuICAgIFsvJi9nLCAnJmFtcDsnXSxcbiAgICBbLzwvZywgJyZsdDsnXSxcbiAgICBbLz4vZywgJyZndDsnXSxcbiAgICBbLycvZywgJyZhcG9zOyddLFxuICAgIFsvXCIvZywgJyZxdW90OyddXG4gIF07XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwbGFjZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaHRtbCA9IGh0bWwucmVwbGFjZShyZXBsYWNlbWVudHNbaV1bMF0sIHJlcGxhY2VtZW50c1tpXVsxXSk7XG4gIH1cbiAgcmV0dXJuIGh0bWw7XG59XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIgPSBmdW5jdGlvbihjb250ZXh0LCBlcnIpIHtcbiAgY29udGV4dC5vdXQoJzxwcmUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWVycm9yXCI+JyArIGVyciArICc8L3ByZT4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFZhbHVlID0gZnVuY3Rpb24oY29udGV4dCwgdmFsdWUpIHtcbiAgY29udGV4dC5vdXQoJzxwcmU+JyArIGh0bWxFc2NhcGUoSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpKSArICc8L3ByZT4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFRleHREaWZmU3RyaW5nID0gZnVuY3Rpb24oY29udGV4dCwgdmFsdWUpIHtcbiAgdmFyIGxpbmVzID0gdGhpcy5wYXJzZVRleHREaWZmKHZhbHVlKTtcbiAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmZcIj4nKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgIGNvbnRleHQub3V0KCc8bGk+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbG9jYXRpb25cIj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZS1udW1iZXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24ubGluZSArXG4gICAgICAnPC9zcGFuPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1jaGFyXCI+JyArXG4gICAgICBsaW5lLmxvY2F0aW9uLmNociArXG4gICAgICAnPC9zcGFuPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxpbmVcIj4nKTtcbiAgICB2YXIgcGllY2VzID0gbGluZS5waWVjZXM7XG4gICAgZm9yICh2YXIgcGllY2VJbmRleCA9IDAsIHBpZWNlc0xlbmd0aCA9IHBpZWNlcy5sZW5ndGg7IHBpZWNlSW5kZXggPCBwaWVjZXNMZW5ndGg7IHBpZWNlSW5kZXgrKykge1xuICAgICAgLyogZ2xvYmFsIHVuZXNjYXBlICovXG4gICAgICB2YXIgcGllY2UgPSBwaWVjZXNbcGllY2VJbmRleF07XG4gICAgICBjb250ZXh0Lm91dCgnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLScgKyBwaWVjZS50eXBlICsgJ1wiPicgK1xuICAgICAgICBodG1sRXNjYXBlKHVuZXNjYXBlKHBpZWNlLnRleHQpKSArICc8L3NwYW4+Jyk7XG4gICAgfVxuICAgIGNvbnRleHQub3V0KCc8L2Rpdj48L2xpPicpO1xuICB9XG4gIGNvbnRleHQub3V0KCc8L3VsPicpO1xufTtcblxudmFyIGFkanVzdEFycm93cyA9IGZ1bmN0aW9uIGpzb25kaWZmcGF0Y2hIdG1sRm9ybWF0dGVyQWRqdXN0QXJyb3dzKG5vZGUpIHtcbiAgbm9kZSA9IG5vZGUgfHwgZG9jdW1lbnQ7XG4gIHZhciBnZXRFbGVtZW50VGV4dCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIGVsLnRleHRDb250ZW50IHx8IGVsLmlubmVyVGV4dDtcbiAgfTtcbiAgdmFyIGVhY2hCeVF1ZXJ5ID0gZnVuY3Rpb24oZWwsIHF1ZXJ5LCBmbikge1xuICAgIHZhciBlbGVtcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZWxlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbihlbGVtc1tpXSk7XG4gICAgfVxuICB9O1xuICB2YXIgZWFjaENoaWxkcmVuID0gZnVuY3Rpb24oZWwsIGZuKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuKGVsLmNoaWxkcmVuW2ldLCBpKTtcbiAgICB9XG4gIH07XG4gIGVhY2hCeVF1ZXJ5KG5vZGUsICcuanNvbmRpZmZwYXRjaC1hcnJvdycsIGZ1bmN0aW9uKGFycm93KSB7XG4gICAgdmFyIGFycm93UGFyZW50ID0gYXJyb3cucGFyZW50Tm9kZTtcbiAgICB2YXIgc3ZnID0gYXJyb3cuY2hpbGRyZW5bMF0sXG4gICAgICBwYXRoID0gc3ZnLmNoaWxkcmVuWzFdO1xuICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHZhciBkZXN0aW5hdGlvbiA9IGdldEVsZW1lbnRUZXh0KGFycm93UGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc29uZGlmZnBhdGNoLW1vdmVkLWRlc3RpbmF0aW9uJykpO1xuICAgIHZhciBjb250YWluZXIgPSBhcnJvd1BhcmVudC5wYXJlbnROb2RlO1xuICAgIHZhciBkZXN0aW5hdGlvbkVsZW07XG4gICAgZWFjaENoaWxkcmVuKGNvbnRhaW5lciwgZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JykgPT09IGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uRWxlbSA9IGNoaWxkO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZGVzdGluYXRpb25FbGVtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB2YXIgZGlzdGFuY2UgPSBkZXN0aW5hdGlvbkVsZW0ub2Zmc2V0VG9wIC0gYXJyb3dQYXJlbnQub2Zmc2V0VG9wO1xuICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgTWF0aC5hYnMoZGlzdGFuY2UpICsgNik7XG4gICAgICBhcnJvdy5zdHlsZS50b3AgPSAoLTggKyAoZGlzdGFuY2UgPiAwID8gMCA6IGRpc3RhbmNlKSkgKyAncHgnO1xuICAgICAgdmFyIGN1cnZlID0gZGlzdGFuY2UgPiAwID9cbiAgICAgICAgJ00zMCwwIFEtMTAsJyArIE1hdGgucm91bmQoZGlzdGFuY2UgLyAyKSArICcgMjYsJyArIChkaXN0YW5jZSAtIDQpIDpcbiAgICAgICAgJ00zMCwnICsgKC1kaXN0YW5jZSkgKyAnIFEtMTAsJyArIE1hdGgucm91bmQoLWRpc3RhbmNlIC8gMikgKyAnIDI2LDQnO1xuICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBjdXJ2ZSk7XG4gICAgICBzdmcuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5yb290QmVnaW4gPSBmdW5jdGlvbihjb250ZXh0LCB0eXBlLCBub2RlVHlwZSkge1xuICB2YXIgbm9kZUNsYXNzID0gJ2pzb25kaWZmcGF0Y2gtJyArIHR5cGUgK1xuICAgIChub2RlVHlwZSA/ICcganNvbmRpZmZwYXRjaC1jaGlsZC1ub2RlLXR5cGUtJyArIG5vZGVUeXBlIDogJycpO1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZGVsdGEgJyArIG5vZGVDbGFzcyArICdcIj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RFbmQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nICsgKGNvbnRleHQuaGFzQXJyb3dzID9cbiAgICAoJzxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiPnNldFRpbWVvdXQoJyArXG4gICAgICBhZGp1c3RBcnJvd3MudG9TdHJpbmcoKSArXG4gICAgICAnLDEwKTs8L3NjcmlwdD4nKSA6ICcnKSk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlQmVnaW4gPSBmdW5jdGlvbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlKSB7XG4gIHZhciBub2RlQ2xhc3MgPSAnanNvbmRpZmZwYXRjaC0nICsgdHlwZSArXG4gICAgKG5vZGVUeXBlID8gJyBqc29uZGlmZnBhdGNoLWNoaWxkLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgOiAnJyk7XG4gIGNvbnRleHQub3V0KCc8bGkgY2xhc3M9XCInICsgbm9kZUNsYXNzICsgJ1wiIGRhdGEta2V5PVwiJyArIGxlZnRLZXkgKyAnXCI+JyArXG4gICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXByb3BlcnR5LW5hbWVcIj4nICsgbGVmdEtleSArICc8L2Rpdj4nKTtcbn07XG5cblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUVuZCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgY29udGV4dC5vdXQoJzwvbGk+Jyk7XG59O1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdW5jaGFuZ2VkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBsZWZ0KTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkZXN0aW5hdGlvbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gIGlmICh0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgbGVmdCk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9ub2RlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgLy8gcmVjdXJzZVxuICB2YXIgbm9kZVR5cGUgPSAoZGVsdGEuX3QgPT09ICdhJykgPyAnYXJyYXknIDogJ29iamVjdCc7XG4gIGNvbnRleHQub3V0KCc8dWwgY2xhc3M9XCJqc29uZGlmZnBhdGNoLW5vZGUganNvbmRpZmZwYXRjaC1ub2RlLXR5cGUtJyArIG5vZGVUeXBlICsgJ1wiPicpO1xuICB0aGlzLmZvcm1hdERlbHRhQ2hpbGRyZW4oY29udGV4dCwgZGVsdGEsIGxlZnQpO1xuICBjb250ZXh0Lm91dCgnPC91bD4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9hZGRlZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vZGlmaWVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlIGpzb25kaWZmcGF0Y2gtbGVmdC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicgK1xuICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZSBqc29uZGlmZnBhdGNoLXJpZ2h0LXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMV0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfZGVsZXRlZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+PGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtbW92ZWQtZGVzdGluYXRpb25cIj4nICsgZGVsdGFbMV0gKyAnPC9kaXY+Jyk7XG5cbiAgLy8gZHJhdyBhbiBTVkcgYXJyb3cgZnJvbSBoZXJlIHRvIG1vdmUgZGVzdGluYXRpb25cbiAgY29udGV4dC5vdXQoXG4gICAgLypqc2hpbnQgbXVsdGlzdHI6IHRydWUgKi9cbiAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtYXJyb3dcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgbGVmdDogLTM0cHg7XCI+XFxcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiNjBcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgZGlzcGxheTogbm9uZTtcIj5cXFxuICAgICAgICA8ZGVmcz5cXFxuICAgICAgICAgICAgPG1hcmtlciBpZD1cIm1hcmtlckFycm93XCIgbWFya2VyV2lkdGg9XCI4XCIgbWFya2VySGVpZ2h0PVwiOFwiIHJlZng9XCIyXCIgcmVmeT1cIjRcIlxcXG4gICAgICAgICAgICAgICAgICAgb3JpZW50PVwiYXV0b1wiIG1hcmtlclVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cXFxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMSwxIEwxLDcgTDcsNCBMMSwxXCIgc3R5bGU9XCJmaWxsOiAjMzM5O1wiIC8+XFxcbiAgICAgICAgICAgIDwvbWFya2VyPlxcXG4gICAgICAgIDwvZGVmcz5cXFxuICAgICAgICA8cGF0aCBkPVwiTTMwLDAgUS0xMCwyNSAyNiw1MFwiIHN0eWxlPVwic3Ryb2tlOiAjODhmOyBzdHJva2Utd2lkdGg6IDJweDsgZmlsbDogbm9uZTtcXFxuICAgICAgICBzdHJva2Utb3BhY2l0eTogMC41OyBtYXJrZXItZW5kOiB1cmwoI21hcmtlckFycm93KTtcIj48L3BhdGg+XFxcbiAgICAgICAgPC9zdmc+XFxcbiAgICAgICAgPC9kaXY+Jyk7XG4gIGNvbnRleHQuaGFzQXJyb3dzID0gdHJ1ZTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF90ZXh0ZGlmZiA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFRleHREaWZmU3RyaW5nKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuLyoganNoaW50IGNhbWVsY2FzZTogdHJ1ZSAqL1xuXG52YXIgc2hvd1VuY2hhbmdlZCA9IGZ1bmN0aW9uKHNob3csIG5vZGUsIGRlbGF5KSB7XG4gIHZhciBlbCA9IG5vZGUgfHwgZG9jdW1lbnQuYm9keTtcbiAgdmFyIHByZWZpeCA9ICdqc29uZGlmZnBhdGNoLXVuY2hhbmdlZC0nO1xuICB2YXIgY2xhc3NlcyA9IHtcbiAgICBzaG93aW5nOiBwcmVmaXggKyAnc2hvd2luZycsXG4gICAgaGlkaW5nOiBwcmVmaXggKyAnaGlkaW5nJyxcbiAgICB2aXNpYmxlOiBwcmVmaXggKyAndmlzaWJsZScsXG4gICAgaGlkZGVuOiBwcmVmaXggKyAnaGlkZGVuJyxcbiAgfTtcbiAgdmFyIGxpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gIGlmICghbGlzdCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWRlbGF5KSB7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGluZyk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGRlbik7XG4gICAgaWYgKHNob3cgPT09IGZhbHNlKSB7XG4gICAgICBsaXN0LmFkZChjbGFzc2VzLmhpZGRlbik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc2hvdyA9PT0gZmFsc2UpIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnNob3dpbmcpO1xuICAgIGxpc3QuYWRkKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMuaGlkaW5nKTtcbiAgICB9LCAxMCk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIGxpc3QuYWRkKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRkZW4pO1xuICB9XG4gIHZhciBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgYWRqdXN0QXJyb3dzKGVsKTtcbiAgfSwgMTAwKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnNob3dpbmcpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkaW5nKTtcbiAgICBpZiAoc2hvdyA9PT0gZmFsc2UpIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMuaGlkZGVuKTtcbiAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGRlbik7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICB9LCBkZWxheSArIDQwMCk7XG4gIH0sIGRlbGF5KTtcbn07XG5cbnZhciBoaWRlVW5jaGFuZ2VkID0gZnVuY3Rpb24obm9kZSwgZGVsYXkpIHtcbiAgcmV0dXJuIHNob3dVbmNoYW5nZWQoZmFsc2UsIG5vZGUsIGRlbGF5KTtcbn07XG5cbmV4cG9ydHMuSHRtbEZvcm1hdHRlciA9IEh0bWxGb3JtYXR0ZXI7XG5cbmV4cG9ydHMuc2hvd1VuY2hhbmdlZCA9IHNob3dVbmNoYW5nZWQ7XG5cbmV4cG9ydHMuaGlkZVVuY2hhbmdlZCA9IGhpZGVVbmNoYW5nZWQ7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZGVsdGEsIGxlZnQpIHtcbiAgaWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcbiAgICBkZWZhdWx0SW5zdGFuY2UgPSBuZXcgSHRtbEZvcm1hdHRlcigpO1xuICB9XG4gIHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZm9ybWF0KGRlbHRhLCBsZWZ0KTtcbn07XG4iLCJ2YXIgZW52aXJvbm1lbnQgPSByZXF1aXJlKCcuLi9lbnZpcm9ubWVudCcpO1xuXG5leHBvcnRzLmJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbmV4cG9ydHMuaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuZXhwb3J0cy5hbm5vdGF0ZWQgPSByZXF1aXJlKCcuL2Fubm90YXRlZCcpO1xuZXhwb3J0cy5qc29ucGF0Y2ggPSByZXF1aXJlKCcuL2pzb25wYXRjaCcpO1xuXG5pZiAoIWVudmlyb25tZW50LmlzQnJvd3Nlcikge1xuICB2YXIgY29uc29sZU1vZHVsZU5hbWUgPSAnLi9jb25zb2xlJztcbiAgZXhwb3J0cy5jb25zb2xlID0gcmVxdWlyZShjb25zb2xlTW9kdWxlTmFtZSk7XG59XG4iLCIoZnVuY3Rpb24gKCkge1xuICB2YXIgYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xuICB2YXIgQmFzZUZvcm1hdHRlciA9IGJhc2UuQmFzZUZvcm1hdHRlcjtcblxuICB2YXIgbmFtZWQgPSB7XG4gICAgYWRkZWQ6ICdhZGQnLFxuICAgIGRlbGV0ZWQ6ICdyZW1vdmUnLFxuICAgIG1vZGlmaWVkOiAncmVwbGFjZScsXG4gICAgbW92ZWQ6ICdtb3ZlZCcsXG4gICAgbW92ZWRlc3RpbmF0aW9uOiAnbW92ZWRlc3RpbmF0aW9uJyxcbiAgICB1bmNoYW5nZWQ6ICd1bmNoYW5nZWQnLFxuICAgIGVycm9yOiAnZXJyb3InLFxuICAgIHRleHREaWZmTGluZTogJ3RleHREaWZmTGluZSdcbiAgfTtcblxuICBmdW5jdGlvbiBKU09ORm9ybWF0dGVyKCkge1xuICAgIHRoaXMuaW5jbHVkZU1vdmVEZXN0aW5hdGlvbnMgPSBmYWxzZTtcbiAgfVxuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlID0gbmV3IEJhc2VGb3JtYXR0ZXIoKTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucHJlcGFyZUNvbnRleHQuY2FsbCh0aGlzLCBjb250ZXh0KTtcbiAgICBjb250ZXh0LnJlc3VsdCA9IFtdO1xuICAgIGNvbnRleHQucGF0aCA9IFtdO1xuICAgIGNvbnRleHQucHVzaEN1cnJlbnRPcCA9IGZ1bmN0aW9uIChvcCwgdmFsdWUpIHtcbiAgICAgIHZhciB2YWwgPSB7XG4gICAgICAgIG9wOiBvcCxcbiAgICAgICAgcGF0aDogdGhpcy5jdXJyZW50UGF0aCgpXG4gICAgICB9O1xuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFsLnZhbHVlID0gdmFsdWU7XG4gICAgICB9XG4gICAgICB0aGlzLnJlc3VsdC5wdXNoKHZhbCk7XG4gICAgfTtcblxuICAgIGNvbnRleHQuY3VycmVudFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gJy8nICsgdGhpcy5wYXRoLmpvaW4oJy8nKTtcbiAgICB9O1xuICB9O1xuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIgPSBmdW5jdGlvbiAoY29udGV4dCwgZXJyKSB7XG4gICAgY29udGV4dC5vdXQoJ1tFUlJPUl0nICsgZXJyKTtcbiAgfTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5yb290QmVnaW4gPSBmdW5jdGlvbiAoKSB7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUucm9vdEVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgfTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlQmVnaW4gPSBmdW5jdGlvbiAoY29udGV4dCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgY29udGV4dC5wYXRoLnB1c2gobGVmdEtleSk7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUubm9kZUVuZCA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgY29udGV4dC5wYXRoLnBvcCgpO1xuICB9O1xuXG4gIC8qIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlICovXG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3VuY2hhbmdlZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAgIGlmICh0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udGV4dC5wdXNoQ3VycmVudE9wKG5hbWVkLnVuY2hhbmdlZCwgbGVmdCk7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkZXN0aW5hdGlvbiA9IGZ1bmN0aW9uIChjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAgIGlmICh0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29udGV4dC5wdXNoQ3VycmVudE9wKG5hbWVkLm1vdmVkZXN0aW5hdGlvbiwgbGVmdCk7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X25vZGUgPSBmdW5jdGlvbiAoY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgICB0aGlzLmZvcm1hdERlbHRhQ2hpbGRyZW4oY29udGV4dCwgZGVsdGEsIGxlZnQpO1xuICB9O1xuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9hZGRlZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBkZWx0YSkge1xuICAgIGNvbnRleHQucHVzaEN1cnJlbnRPcChuYW1lZC5hZGRlZCwgZGVsdGFbMF0pO1xuICB9O1xuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb2RpZmllZCA9IGZ1bmN0aW9uIChjb250ZXh0LCBkZWx0YSkge1xuICAgIGNvbnRleHQucHVzaEN1cnJlbnRPcChuYW1lZC5tb2RpZmllZCwgZGVsdGFbMV0pO1xuICB9O1xuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9kZWxldGVkID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnB1c2hDdXJyZW50T3AobmFtZWQuZGVsZXRlZCk7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkID0gZnVuY3Rpb24gKGNvbnRleHQsIGRlbHRhKSB7XG4gICAgY29udGV4dC5wdXNoQ3VycmVudE9wKG5hbWVkLm1vdmVkLCBkZWx0YVsxXSk7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3RleHRkaWZmID0gZnVuY3Rpb24gKCkge1xuICAgIHRocm93ICdub3QgaW1wbGltZW50ZWQnO1xuICB9O1xuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uIChkZWx0YSwgbGVmdCkge1xuICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgdGhpcy5wcmVwYXJlQ29udGV4dChjb250ZXh0KTtcbiAgICB0aGlzLnJlY3Vyc2UoY29udGV4dCwgZGVsdGEsIGxlZnQpO1xuICAgIHJldHVybiBjb250ZXh0LnJlc3VsdDtcbiAgfTtcbiAgLyoganNoaW50IGNhbWVsY2FzZTogdHJ1ZSAqL1xuXG4gIGV4cG9ydHMuSlNPTkZvcm1hdHRlciA9IEpTT05Gb3JtYXR0ZXI7XG5cbiAgdmFyIGRlZmF1bHRJbnN0YW5jZTtcblxuICBmdW5jdGlvbiBsYXN0KGFycikge1xuICAgIHJldHVybiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuICB9XG5cbiAgZnVuY3Rpb24gc29ydEJ5KGFyciwgcHJlZCkge1xuICAgIGFyci5zb3J0KHByZWQpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICB2YXIgY29tcGFyZUJ5SW5kZXhEZXNjID0gZnVuY3Rpb24gKGluZGV4QSwgaW5kZXhCKSB7XG4gICAgdmFyIGxhc3RBID0gcGFyc2VJbnQoaW5kZXhBLCAxMCk7XG4gICAgdmFyIGxhc3RCID0gcGFyc2VJbnQoaW5kZXhCLCAxMCk7XG4gICAgaWYgKCEoaXNOYU4obGFzdEEpIHx8IGlzTmFOKGxhc3RCKSkpIHtcbiAgICAgIHJldHVybiBsYXN0QiAtIGxhc3RBO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gb3BzQnlEZXNjZW5kaW5nT3JkZXIocmVtb3ZlT3BzKSB7XG4gICAgcmV0dXJuIHNvcnRCeShyZW1vdmVPcHMsIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICB2YXIgc3BsaXRBID0gYS5wYXRoLnNwbGl0KCcvJyk7XG4gICAgICB2YXIgc3BsaXRCID0gYi5wYXRoLnNwbGl0KCcvJyk7XG4gICAgICBpZiAoc3BsaXRBLmxlbmd0aCAhPT0gc3BsaXRCLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gc3BsaXRBLmxlbmd0aCAtIHNwbGl0Qi5sZW5ndGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY29tcGFyZUJ5SW5kZXhEZXNjKGxhc3Qoc3BsaXRBKSwgbGFzdChzcGxpdEIpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnRpdGlvbihhcnIsIHByZWQpIHtcbiAgICB2YXIgbGVmdCA9IFtdO1xuICAgIHZhciByaWdodCA9IFtdO1xuXG4gICAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICB2YXIgY29sbCA9IHByZWQoZWwpID8gbGVmdCA6IHJpZ2h0O1xuICAgICAgY29sbC5wdXNoKGVsKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2xlZnQsIHJpZ2h0XTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlb3JkZXJPcHMoanNvbkZvcm1hdHRlZERpZmYpIHtcbiAgICB2YXIgcmVtb3ZlT3BzT3RoZXJPcHMgPSBwYXJ0aXRpb24oanNvbkZvcm1hdHRlZERpZmYsIGZ1bmN0aW9uIChvcGVyYXRpb24pIHtcbiAgICAgIHJldHVybiBvcGVyYXRpb24ub3AgPT09ICdyZW1vdmUnO1xuICAgIH0pO1xuICAgIHZhciByZW1vdmVPcHMgPSByZW1vdmVPcHNPdGhlck9wc1swXTtcbiAgICB2YXIgb3RoZXJPcHMgPSByZW1vdmVPcHNPdGhlck9wc1sxXTtcblxuICAgIHZhciByZW1vdmVPcHNSZXZlcnNlID0gb3BzQnlEZXNjZW5kaW5nT3JkZXIocmVtb3ZlT3BzKTtcbiAgICByZXR1cm4gcmVtb3ZlT3BzUmV2ZXJzZS5jb25jYXQob3RoZXJPcHMpO1xuICB9XG5cblxuICB2YXIgZm9ybWF0ID0gZnVuY3Rpb24gKGRlbHRhLCBsZWZ0KSB7XG4gICAgaWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcbiAgICAgIGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBKU09ORm9ybWF0dGVyKCk7XG4gICAgfVxuICAgIHJldHVybiByZW9yZGVyT3BzKGRlZmF1bHRJbnN0YW5jZS5mb3JtYXQoZGVsdGEsIGxlZnQpKTtcbiAgfTtcblxuICBleHBvcnRzLmxvZyA9IGZ1bmN0aW9uIChkZWx0YSwgbGVmdCkge1xuICAgIGNvbnNvbGUubG9nKGZvcm1hdChkZWx0YSwgbGVmdCkpO1xuICB9O1xuXG4gIGV4cG9ydHMuZm9ybWF0ID0gZm9ybWF0O1xufSkoKTtcbiJdfQ==
