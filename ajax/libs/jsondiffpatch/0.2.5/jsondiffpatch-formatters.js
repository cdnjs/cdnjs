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
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
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
      if (Object.prototype.hasOwnProperty.call(left, name)) {
        if (typeof delta[name] === 'undefined' &&
          ((!arrayKeys) || typeof delta['_' + name] === 'undefined')) {
          keys.push(name);
        }
      }
    }
  }
  // look for move destinations
  for (name in delta) {
    if (Object.prototype.hasOwnProperty.call(delta, name)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9maWJlcmdsYXNzL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi1mb3JtYXR0ZXJzLmpzIiwic3JjL2Vudmlyb25tZW50LmpzIiwic3JjL2Zvcm1hdHRlcnMvYW5ub3RhdGVkLmpzIiwic3JjL2Zvcm1hdHRlcnMvYmFzZS5qcyIsInNyYy9mb3JtYXR0ZXJzL2h0bWwuanMiLCJzcmMvZm9ybWF0dGVycy9pbmRleC5qcyIsInNyYy9mb3JtYXR0ZXJzL2pzb25wYXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mb3JtYXR0ZXJzJyk7XG4iLCJcbmV4cG9ydHMuaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG4iLCJ2YXIgYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIEJhc2VGb3JtYXR0ZXIgPSBiYXNlLkJhc2VGb3JtYXR0ZXI7XG5cbnZhciBBbm5vdGF0ZWRGb3JtYXR0ZXIgPSBmdW5jdGlvbiBBbm5vdGF0ZWRGb3JtYXR0ZXIoKSB7XG4gIHRoaXMuaW5jbHVkZU1vdmVEZXN0aW5hdGlvbnMgPSBmYWxzZTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUgPSBuZXcgQmFzZUZvcm1hdHRlcigpO1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnByZXBhcmVDb250ZXh0ID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBCYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dC5jYWxsKHRoaXMsIGNvbnRleHQpO1xuICBjb250ZXh0LmluZGVudCA9IGZ1bmN0aW9uKGxldmVscykge1xuICAgIHRoaXMuaW5kZW50TGV2ZWwgPSAodGhpcy5pbmRlbnRMZXZlbCB8fCAwKSArXG4gICAgICAodHlwZW9mIGxldmVscyA9PT0gJ3VuZGVmaW5lZCcgPyAxIDogbGV2ZWxzKTtcbiAgICB0aGlzLmluZGVudFBhZCA9IG5ldyBBcnJheSh0aGlzLmluZGVudExldmVsICsgMSkuam9pbignJm5ic3A7Jm5ic3A7Jyk7XG4gIH07XG4gIGNvbnRleHQucm93ID0gZnVuY3Rpb24oanNvbiwgaHRtbE5vdGUpIHtcbiAgICBjb250ZXh0Lm91dCgnPHRyPjx0ZCBzdHlsZT1cIndoaXRlLXNwYWNlOiBub3dyYXA7XCI+JyArXG4gICAgICAnPHByZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtYW5ub3RhdGVkLWluZGVudFwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrXCI+Jyk7XG4gICAgY29udGV4dC5vdXQoY29udGV4dC5pbmRlbnRQYWQpO1xuICAgIGNvbnRleHQub3V0KCc8L3ByZT48cHJlIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrXCI+Jyk7XG4gICAgY29udGV4dC5vdXQoanNvbik7XG4gICAgY29udGV4dC5vdXQoJzwvcHJlPjwvdGQ+PHRkIGNsYXNzPVwianNvbmRpZmZwYXRjaC1kZWx0YS1ub3RlXCI+PGRpdj4nKTtcbiAgICBjb250ZXh0Lm91dChodG1sTm90ZSk7XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PjwvdGQ+PC90cj4nKTtcbiAgfTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICBjb250ZXh0LnJvdygnJywgJzxwcmUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWVycm9yXCI+JyArIGVyciArICc8L3ByZT4nKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VGV4dERpZmZTdHJpbmcgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICB2YXIgbGluZXMgPSB0aGlzLnBhcnNlVGV4dERpZmYodmFsdWUpO1xuICBjb250ZXh0Lm91dCgnPHVsIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZlwiPicpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgY29udGV4dC5vdXQoJzxsaT4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1sb2NhdGlvblwiPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lLW51bWJlclwiPicgK1xuICAgICAgbGluZS5sb2NhdGlvbi5saW5lICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWNoYXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24uY2hyICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZVwiPicpO1xuICAgIHZhciBwaWVjZXMgPSBsaW5lLnBpZWNlcztcbiAgICBmb3IgKHZhciBwaWVjZUluZGV4ID0gMCwgcGllY2VzTGVuZ3RoID0gcGllY2VzLmxlbmd0aDsgcGllY2VJbmRleCA8IHBpZWNlc0xlbmd0aDsgcGllY2VJbmRleCsrKSB7XG4gICAgICB2YXIgcGllY2UgPSBwaWVjZXNbcGllY2VJbmRleF07XG4gICAgICBjb250ZXh0Lm91dCgnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLScgKyBwaWVjZS50eXBlICsgJ1wiPicgK1xuICAgICAgICBwaWVjZS50ZXh0ICsgJzwvc3Bhbj4nKTtcbiAgICB9XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PjwvbGk+Jyk7XG4gIH1cbiAgY29udGV4dC5vdXQoJzwvdWw+Jyk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKSB7XG4gIGNvbnRleHQub3V0KCc8dGFibGUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWFubm90YXRlZC1kZWx0YVwiPicpO1xuICBpZiAodHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgY29udGV4dC5yb3coJ3snKTtcbiAgICBjb250ZXh0LmluZGVudCgpO1xuICB9XG4gIGlmIChub2RlVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGNvbnRleHQucm93KCdcIl90XCI6IFwiYVwiLCcsICdBcnJheSBkZWx0YSAobWVtYmVyIG5hbWVzIGluZGljYXRlIGFycmF5IGluZGljZXMpJyk7XG4gIH1cbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEVuZCA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgIGNvbnRleHQuaW5kZW50KC0xKTtcbiAgICBjb250ZXh0LnJvdygnfScpO1xuICB9XG4gIGNvbnRleHQub3V0KCc8L3RhYmxlPicpO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlQmVnaW4gPSBmdW5jdGlvbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlKSB7XG4gIGNvbnRleHQucm93KCcmcXVvdDsnICsga2V5ICsgJyZxdW90OzogeycpO1xuICBpZiAodHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgY29udGV4dC5pbmRlbnQoKTtcbiAgfVxuICBpZiAobm9kZVR5cGUgPT09ICdhcnJheScpIHtcbiAgICBjb250ZXh0LnJvdygnXCJfdFwiOiBcImFcIiwnLCAnQXJyYXkgZGVsdGEgKG1lbWJlciBuYW1lcyBpbmRpY2F0ZSBhcnJheSBpbmRpY2VzKScpO1xuICB9XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVFbmQgPSBmdW5jdGlvbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlLCBpc0xhc3QpIHtcbiAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgIGNvbnRleHQuaW5kZW50KC0xKTtcbiAgfVxuICBjb250ZXh0LnJvdygnfScgKyAoaXNMYXN0ID8gJycgOiAnLCcpKTtcbn07XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlICovXG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3VuY2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm47XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb3ZlZGVzdGluYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuO1xufTtcblxuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9ub2RlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgLy8gcmVjdXJzZVxuICB0aGlzLmZvcm1hdERlbHRhQ2hpbGRyZW4oY29udGV4dCwgZGVsdGEsIGxlZnQpO1xufTtcblxudmFyIHdyYXBQcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiAnPHByZSBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrXCI+JnF1b3Q7JyArIG5hbWUgKyAnJnF1b3Q7PC9wcmU+Jztcbn07XG5cbnZhciBkZWx0YUFubm90YXRpb25zID0ge1xuICBhZGRlZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHZhciBmb3JtYXRMZWdlbmQgPSAnIDxwcmU+KFtuZXdWYWx1ZV0pPC9wcmU+JztcbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gJ25ldyB2YWx1ZScgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnaW5zZXJ0IGF0IGluZGV4ICcgKyBsZWZ0S2V5ICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICByZXR1cm4gJ2FkZCBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KSArIGZvcm1hdExlZ2VuZDtcbiAgfSxcbiAgbW9kaWZpZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICB2YXIgZm9ybWF0TGVnZW5kID0gJyA8cHJlPihbcHJldmlvdXNWYWx1ZSwgbmV3VmFsdWVdKTwvcHJlPic7XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICdtb2RpZnkgdmFsdWUnICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJ21vZGlmeSBhdCBpbmRleCAnICsgbGVmdEtleSArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgcmV0dXJuICdtb2RpZnkgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSkgKyBmb3JtYXRMZWdlbmQ7XG4gIH0sXG4gIGRlbGV0ZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICB2YXIgZm9ybWF0TGVnZW5kID0gJyA8cHJlPihbcHJldmlvdXNWYWx1ZSwgMCwgMF0pPC9wcmU+JztcbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gJ2RlbGV0ZSB2YWx1ZScgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAncmVtb3ZlIGluZGV4ICcgKyBsZWZ0S2V5ICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICByZXR1cm4gJ2RlbGV0ZSBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KSArIGZvcm1hdExlZ2VuZDtcbiAgfSxcbiAgbW92ZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICByZXR1cm4gJ21vdmUgZnJvbSA8c3BhbiB0aXRsZT1cIihwb3NpdGlvbiB0byByZW1vdmUgYXQgb3JpZ2luYWwgc3RhdGUpXCI+aW5kZXggJyArXG4gICAgICBsZWZ0S2V5ICsgJzwvc3Bhbj4gdG8gJyArXG4gICAgICAnPHNwYW4gdGl0bGU9XCIocG9zaXRpb24gdG8gaW5zZXJ0IGF0IGZpbmFsIHN0YXRlKVwiPmluZGV4ICcgK1xuICAgICAgZGVsdGFbMV0gKyAnPC9zcGFuPic7XG4gIH0sXG4gIHRleHRkaWZmOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgdmFyIGxvY2F0aW9uID0gKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykgP1xuICAgICAgJycgOiAoXG4gICAgICAgICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpID9cbiAgICAgICAgJyBhdCBpbmRleCAnICsgbGVmdEtleSA6XG4gICAgICAgICcgYXQgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSlcbiAgICAgICk7XG4gICAgcmV0dXJuICd0ZXh0IGRpZmYnICsgbG9jYXRpb24gKyAnLCBmb3JtYXQgaXMgJyArXG4gICAgICAnPGEgaHJlZj1cImh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvZ29vZ2xlLWRpZmYtbWF0Y2gtcGF0Y2gvd2lraS9VbmlkaWZmXCI+JyArXG4gICAgICAnYSB2YXJpYXRpb24gb2YgVW5pZGlmZjwvYT4nO1xuICB9XG59O1xuXG52YXIgZm9ybWF0QW55Q2hhbmdlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgdmFyIGRlbHRhVHlwZSA9IHRoaXMuZ2V0RGVsdGFUeXBlKGRlbHRhKTtcbiAgdmFyIGFubm90YXRvciA9IGRlbHRhQW5ub3RhdGlvbnNbZGVsdGFUeXBlXTtcbiAgdmFyIGh0bWxOb3RlID0gYW5ub3RhdG9yICYmIGFubm90YXRvci5hcHBseShhbm5vdGF0b3IsXG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoZGVsdGEsIG51bGwsIDIpO1xuICBpZiAoZGVsdGFUeXBlID09PSAndGV4dGRpZmYnKSB7XG4gICAgLy8gc3BsaXQgdGV4dCBkaWZmcyBsaW5lc1xuICAgIGpzb24gPSBqc29uLnNwbGl0KCdcXFxcbicpLmpvaW4oJ1xcXFxuXCIrXFxuICAgXCInKTtcbiAgfVxuICBjb250ZXh0LmluZGVudCgpO1xuICBjb250ZXh0LnJvdyhqc29uLCBodG1sTm90ZSk7XG4gIGNvbnRleHQuaW5kZW50KC0xKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2FkZGVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW9kaWZpZWQgPSBmb3JtYXRBbnlDaGFuZ2U7XG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9kZWxldGVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWQgPSBmb3JtYXRBbnlDaGFuZ2U7XG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF90ZXh0ZGlmZiA9IGZvcm1hdEFueUNoYW5nZTtcblxuLyoganNoaW50IGNhbWVsY2FzZTogdHJ1ZSAqL1xuXG5leHBvcnRzLkFubm90YXRlZEZvcm1hdHRlciA9IEFubm90YXRlZEZvcm1hdHRlcjtcblxudmFyIGRlZmF1bHRJbnN0YW5jZTtcblxuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICBpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuICAgIGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBBbm5vdGF0ZWRGb3JtYXR0ZXIoKTtcbiAgfVxuICByZXR1cm4gZGVmYXVsdEluc3RhbmNlLmZvcm1hdChkZWx0YSwgbGVmdCk7XG59O1xuIiwidmFyIGlzQXJyYXkgPSAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpID9cbiAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICBBcnJheS5pc0FycmF5IDpcbiAgLy8gdXNlIGluc3RhbmNlb2Ygb3BlcmF0b3JcbiAgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXk7XG4gIH07XG5cbnZhciBnZXRPYmplY3RLZXlzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nID9cbiAgZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG4gIH0gOiBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgbmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgbmFtZXMucHVzaChwcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYW1lcztcbiAgfTtcblxudmFyIHRyaW1VbmRlcnNjb3JlID0gZnVuY3Rpb24oc3RyKSB7XG4gIGlmIChzdHIuc3Vic3RyKDAsIDEpID09PSAnXycpIHtcbiAgICByZXR1cm4gc3RyLnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG52YXIgYXJyYXlLZXlUb1NvcnROdW1iZXIgPSBmdW5jdGlvbihrZXkpIHtcbiAgaWYgKGtleSA9PT0gJ190Jykge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5LnN1YnN0cigwLCAxKSA9PT0gJ18nKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoa2V5LnNsaWNlKDEpLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXJzZUludChrZXksIDEwKSArIDAuMTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBhcnJheUtleUNvbXBhcmVyID0gZnVuY3Rpb24oa2V5MSwga2V5Mikge1xuICByZXR1cm4gYXJyYXlLZXlUb1NvcnROdW1iZXIoa2V5MSkgLSBhcnJheUtleVRvU29ydE51bWJlcihrZXkyKTtcbn07XG5cbnZhciBCYXNlRm9ybWF0dGVyID0gZnVuY3Rpb24gQmFzZUZvcm1hdHRlcigpIHt9O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICB2YXIgY29udGV4dCA9IHt9O1xuICB0aGlzLnByZXBhcmVDb250ZXh0KGNvbnRleHQpO1xuICB0aGlzLnJlY3Vyc2UoY29udGV4dCwgZGVsdGEsIGxlZnQpO1xuICByZXR1cm4gdGhpcy5maW5hbGl6ZShjb250ZXh0KTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnByZXBhcmVDb250ZXh0ID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBjb250ZXh0LmJ1ZmZlciA9IFtdO1xuICBjb250ZXh0Lm91dCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYnVmZmVyLnB1c2guYXBwbHkodGhpcy5idWZmZXIsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlck5vdEZvdW5kID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGFUeXBlKSB7XG4gIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZvcm1hdCBkZWx0YSB0eXBlOiAnICsgZGVsdGFUeXBlKTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIgPSBmdW5jdGlvbihjb250ZXh0LCBlcnIpIHtcbiAgcmV0dXJuIGVyci50b1N0cmluZygpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZmluYWxpemUgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGlmIChpc0FycmF5KGNvbnRleHQuYnVmZmVyKSkge1xuICAgIHJldHVybiBjb250ZXh0LmJ1ZmZlci5qb2luKCcnKTtcbiAgfVxufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucmVjdXJzZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSwgaXNMYXN0KSB7XG5cbiAgdmFyIHVzZU1vdmVPcmlnaW5IZXJlID0gZGVsdGEgJiYgbW92ZWRGcm9tO1xuICB2YXIgbGVmdFZhbHVlID0gdXNlTW92ZU9yaWdpbkhlcmUgPyBtb3ZlZEZyb20udmFsdWUgOiBsZWZ0O1xuXG4gIGlmICh0eXBlb2YgZGVsdGEgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciB0eXBlID0gdGhpcy5nZXREZWx0YVR5cGUoZGVsdGEsIG1vdmVkRnJvbSk7XG4gIHZhciBub2RlVHlwZSA9IHR5cGUgPT09ICdub2RlJyA/IChkZWx0YS5fdCA9PT0gJ2EnID8gJ2FycmF5JyA6ICdvYmplY3QnKSA6ICcnO1xuXG4gIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMubm9kZUJlZ2luKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUsIGlzTGFzdCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yb290QmVnaW4oY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpO1xuICB9XG5cbiAgdmFyIHR5cGVGb3JtYXR0dGVyO1xuICB0cnkge1xuICAgIHR5cGVGb3JtYXR0dGVyID0gdGhpc1snZm9ybWF0XycgKyB0eXBlXSB8fCB0aGlzLnR5cGVGb3JtYXR0dGVyTm90Rm91bmQoY29udGV4dCwgdHlwZSk7XG4gICAgdHlwZUZvcm1hdHR0ZXIuY2FsbCh0aGlzLCBjb250ZXh0LCBkZWx0YSwgbGVmdFZhbHVlLCBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRoaXMudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlcihjb250ZXh0LCBlcnIsIGRlbHRhLCBsZWZ0VmFsdWUsIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tKTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLm5vZGVFbmQoY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSwgaXNMYXN0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJvb3RFbmQoY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpO1xuICB9XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXREZWx0YUNoaWxkcmVuID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLmZvckVhY2hEZWx0YUtleShkZWx0YSwgbGVmdCwgZnVuY3Rpb24oa2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20sIGlzTGFzdCkge1xuICAgIHNlbGYucmVjdXJzZShjb250ZXh0LCBkZWx0YVtrZXldLCBsZWZ0ID8gbGVmdFtsZWZ0S2V5XSA6IHVuZGVmaW5lZCxcbiAgICAgIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tLCBpc0xhc3QpO1xuICB9KTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvckVhY2hEZWx0YUtleSA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBmbikge1xuICB2YXIga2V5cyA9IGdldE9iamVjdEtleXMoZGVsdGEpO1xuICB2YXIgYXJyYXlLZXlzID0gZGVsdGEuX3QgPT09ICdhJztcbiAgdmFyIG1vdmVEZXN0aW5hdGlvbnMgPSB7fTtcbiAgdmFyIG5hbWU7XG4gIGlmICh0eXBlb2YgbGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmb3IgKG5hbWUgaW4gbGVmdCkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChsZWZ0LCBuYW1lKSkge1xuICAgICAgICBpZiAodHlwZW9mIGRlbHRhW25hbWVdID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICgoIWFycmF5S2V5cykgfHwgdHlwZW9mIGRlbHRhWydfJyArIG5hbWVdID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICBrZXlzLnB1c2gobmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gbG9vayBmb3IgbW92ZSBkZXN0aW5hdGlvbnNcbiAgZm9yIChuYW1lIGluIGRlbHRhKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZWx0YSwgbmFtZSkpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGRlbHRhW25hbWVdO1xuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlWzJdID09PSAzKSB7XG4gICAgICAgIG1vdmVEZXN0aW5hdGlvbnNbdmFsdWVbMV0udG9TdHJpbmcoKV0gPSB7XG4gICAgICAgICAga2V5OiBuYW1lLFxuICAgICAgICAgIHZhbHVlOiBsZWZ0ICYmIGxlZnRbcGFyc2VJbnQobmFtZS5zdWJzdHIoMSkpXVxuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5pbmNsdWRlTW92ZURlc3RpbmF0aW9ucyAhPT0gZmFsc2UpIHtcbiAgICAgICAgICBpZiAoKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAgICh0eXBlb2YgZGVsdGFbdmFsdWVbMV1dID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgIGtleXMucHVzaCh2YWx1ZVsxXS50b1N0cmluZygpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGFycmF5S2V5cykge1xuICAgIGtleXMuc29ydChhcnJheUtleUNvbXBhcmVyKTtcbiAgfSBlbHNlIHtcbiAgICBrZXlzLnNvcnQoKTtcbiAgfVxuICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2luZGV4XTtcbiAgICBpZiAoYXJyYXlLZXlzICYmIGtleSA9PT0gJ190Jykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBsZWZ0S2V5ID0gYXJyYXlLZXlzID9cbiAgICAgICh0eXBlb2Yga2V5ID09PSAnbnVtYmVyJyA/IGtleSA6IHBhcnNlSW50KHRyaW1VbmRlcnNjb3JlKGtleSksIDEwKSkgOlxuICAgICAga2V5O1xuICAgIHZhciBpc0xhc3QgPSAoaW5kZXggPT09IGxlbmd0aCAtIDEpO1xuICAgIGZuKGtleSwgbGVmdEtleSwgbW92ZURlc3RpbmF0aW9uc1tsZWZ0S2V5XSwgaXNMYXN0KTtcbiAgfVxufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZ2V0RGVsdGFUeXBlID0gZnVuY3Rpb24oZGVsdGEsIG1vdmVkRnJvbSkge1xuICBpZiAodHlwZW9mIGRlbHRhID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgbW92ZWRGcm9tICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICdtb3ZlZGVzdGluYXRpb24nO1xuICAgIH1cbiAgICByZXR1cm4gJ3VuY2hhbmdlZCc7XG4gIH1cbiAgaWYgKGlzQXJyYXkoZGVsdGEpKSB7XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuICdhZGRlZCc7XG4gICAgfVxuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJldHVybiAnbW9kaWZpZWQnO1xuICAgIH1cbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAzICYmIGRlbHRhWzJdID09PSAwKSB7XG4gICAgICByZXR1cm4gJ2RlbGV0ZWQnO1xuICAgIH1cbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAzICYmIGRlbHRhWzJdID09PSAyKSB7XG4gICAgICByZXR1cm4gJ3RleHRkaWZmJztcbiAgICB9XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMyAmJiBkZWx0YVsyXSA9PT0gMykge1xuICAgICAgcmV0dXJuICdtb3ZlZCc7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gJ25vZGUnO1xuICB9XG4gIHJldHVybiAndW5rbm93bic7XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5wYXJzZVRleHREaWZmID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgbGluZXMgPSB2YWx1ZS5zcGxpdCgnXFxuQEAgJyk7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICB2YXIgbGluZU91dHB1dCA9IHtcbiAgICAgIHBpZWNlczogW11cbiAgICB9O1xuICAgIHZhciBsb2NhdGlvbiA9IC9eKD86QEAgKT9bLStdPyhcXGQrKSwoXFxkKykvLmV4ZWMobGluZSkuc2xpY2UoMSk7XG4gICAgbGluZU91dHB1dC5sb2NhdGlvbiA9IHtcbiAgICAgIGxpbmU6IGxvY2F0aW9uWzBdLFxuICAgICAgY2hyOiBsb2NhdGlvblsxXVxuICAgIH07XG4gICAgdmFyIHBpZWNlcyA9IGxpbmUuc3BsaXQoJ1xcbicpLnNsaWNlKDEpO1xuICAgIGZvciAodmFyIHBpZWNlSW5kZXggPSAwLCBwaWVjZXNMZW5ndGggPSBwaWVjZXMubGVuZ3RoOyBwaWVjZUluZGV4IDwgcGllY2VzTGVuZ3RoOyBwaWVjZUluZGV4KyspIHtcbiAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1twaWVjZUluZGV4XTtcbiAgICAgIGlmICghcGllY2UubGVuZ3RoKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIHBpZWNlT3V0cHV0ID0ge1xuICAgICAgICB0eXBlOiAnY29udGV4dCdcbiAgICAgIH07XG4gICAgICBpZiAocGllY2Uuc3Vic3RyKDAsIDEpID09PSAnKycpIHtcbiAgICAgICAgcGllY2VPdXRwdXQudHlwZSA9ICdhZGRlZCc7XG4gICAgICB9IGVsc2UgaWYgKHBpZWNlLnN1YnN0cigwLCAxKSA9PT0gJy0nKSB7XG4gICAgICAgIHBpZWNlT3V0cHV0LnR5cGUgPSAnZGVsZXRlZCc7XG4gICAgICB9XG4gICAgICBwaWVjZU91dHB1dC50ZXh0ID0gcGllY2Uuc2xpY2UoMSk7XG4gICAgICBsaW5lT3V0cHV0LnBpZWNlcy5wdXNoKHBpZWNlT3V0cHV0KTtcbiAgICB9XG4gICAgb3V0cHV0LnB1c2gobGluZU91dHB1dCk7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydHMuQmFzZUZvcm1hdHRlciA9IEJhc2VGb3JtYXR0ZXI7XG4iLCJ2YXIgYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIEJhc2VGb3JtYXR0ZXIgPSBiYXNlLkJhc2VGb3JtYXR0ZXI7XG5cbnZhciBIdG1sRm9ybWF0dGVyID0gZnVuY3Rpb24gSHRtbEZvcm1hdHRlcigpIHt9O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZSA9IG5ldyBCYXNlRm9ybWF0dGVyKCk7XG5cbmZ1bmN0aW9uIGh0bWxFc2NhcGUodGV4dCkge1xuICB2YXIgaHRtbCA9IHRleHQ7XG4gIHZhciByZXBsYWNlbWVudHMgPSBbXG4gICAgWy8mL2csICcmYW1wOyddLFxuICAgIFsvPC9nLCAnJmx0OyddLFxuICAgIFsvPi9nLCAnJmd0OyddLFxuICAgIFsvJy9nLCAnJmFwb3M7J10sXG4gICAgWy9cIi9nLCAnJnF1b3Q7J11cbiAgXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBsYWNlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBodG1sID0gaHRtbC5yZXBsYWNlKHJlcGxhY2VtZW50c1tpXVswXSwgcmVwbGFjZW1lbnRzW2ldWzFdKTtcbiAgfVxuICByZXR1cm4gaHRtbDtcbn1cblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICBjb250ZXh0Lm91dCgnPHByZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZXJyb3JcIj4nICsgZXJyICsgJzwvcHJlPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VmFsdWUgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICBjb250ZXh0Lm91dCgnPHByZT4nICsgaHRtbEVzY2FwZShKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgMikpICsgJzwvcHJlPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VGV4dERpZmZTdHJpbmcgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICB2YXIgbGluZXMgPSB0aGlzLnBhcnNlVGV4dERpZmYodmFsdWUpO1xuICBjb250ZXh0Lm91dCgnPHVsIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZlwiPicpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgY29udGV4dC5vdXQoJzxsaT4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1sb2NhdGlvblwiPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lLW51bWJlclwiPicgK1xuICAgICAgbGluZS5sb2NhdGlvbi5saW5lICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWNoYXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24uY2hyICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZVwiPicpO1xuICAgIHZhciBwaWVjZXMgPSBsaW5lLnBpZWNlcztcbiAgICBmb3IgKHZhciBwaWVjZUluZGV4ID0gMCwgcGllY2VzTGVuZ3RoID0gcGllY2VzLmxlbmd0aDsgcGllY2VJbmRleCA8IHBpZWNlc0xlbmd0aDsgcGllY2VJbmRleCsrKSB7XG4gICAgICAvKiBnbG9iYWwgdW5lc2NhcGUgKi9cbiAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1twaWVjZUluZGV4XTtcbiAgICAgIGNvbnRleHQub3V0KCc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtJyArIHBpZWNlLnR5cGUgKyAnXCI+JyArXG4gICAgICAgIGh0bWxFc2NhcGUodW5lc2NhcGUocGllY2UudGV4dCkpICsgJzwvc3Bhbj4nKTtcbiAgICB9XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PjwvbGk+Jyk7XG4gIH1cbiAgY29udGV4dC5vdXQoJzwvdWw+Jyk7XG59O1xuXG52YXIgYWRqdXN0QXJyb3dzID0gZnVuY3Rpb24ganNvbmRpZmZwYXRjaEh0bWxGb3JtYXR0ZXJBZGp1c3RBcnJvd3Mobm9kZSkge1xuICBub2RlID0gbm9kZSB8fCBkb2N1bWVudDtcbiAgdmFyIGdldEVsZW1lbnRUZXh0ID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0O1xuICB9O1xuICB2YXIgZWFjaEJ5UXVlcnkgPSBmdW5jdGlvbihlbCwgcXVlcnksIGZuKSB7XG4gICAgdmFyIGVsZW1zID0gZWwucXVlcnlTZWxlY3RvckFsbChxdWVyeSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuKGVsZW1zW2ldKTtcbiAgICB9XG4gIH07XG4gIHZhciBlYWNoQ2hpbGRyZW4gPSBmdW5jdGlvbihlbCwgZm4pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4oZWwuY2hpbGRyZW5baV0sIGkpO1xuICAgIH1cbiAgfTtcbiAgZWFjaEJ5UXVlcnkobm9kZSwgJy5qc29uZGlmZnBhdGNoLWFycm93JywgZnVuY3Rpb24oYXJyb3cpIHtcbiAgICB2YXIgYXJyb3dQYXJlbnQgPSBhcnJvdy5wYXJlbnROb2RlO1xuICAgIHZhciBzdmcgPSBhcnJvdy5jaGlsZHJlblswXSxcbiAgICAgIHBhdGggPSBzdmcuY2hpbGRyZW5bMV07XG4gICAgc3ZnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gZ2V0RWxlbWVudFRleHQoYXJyb3dQYXJlbnQucXVlcnlTZWxlY3RvcignLmpzb25kaWZmcGF0Y2gtbW92ZWQtZGVzdGluYXRpb24nKSk7XG4gICAgdmFyIGNvbnRhaW5lciA9IGFycm93UGFyZW50LnBhcmVudE5vZGU7XG4gICAgdmFyIGRlc3RpbmF0aW9uRWxlbTtcbiAgICBlYWNoQ2hpbGRyZW4oY29udGFpbmVyLCBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSA9PT0gZGVzdGluYXRpb24pIHtcbiAgICAgICAgZGVzdGluYXRpb25FbGVtID0gY2hpbGQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFkZXN0aW5hdGlvbkVsZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHZhciBkaXN0YW5jZSA9IGRlc3RpbmF0aW9uRWxlbS5vZmZzZXRUb3AgLSBhcnJvd1BhcmVudC5vZmZzZXRUb3A7XG4gICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBNYXRoLmFicyhkaXN0YW5jZSkgKyA2KTtcbiAgICAgIGFycm93LnN0eWxlLnRvcCA9ICgtOCArIChkaXN0YW5jZSA+IDAgPyAwIDogZGlzdGFuY2UpKSArICdweCc7XG4gICAgICB2YXIgY3VydmUgPSBkaXN0YW5jZSA+IDAgP1xuICAgICAgICAnTTMwLDAgUS0xMCwnICsgTWF0aC5yb3VuZChkaXN0YW5jZSAvIDIpICsgJyAyNiwnICsgKGRpc3RhbmNlIC0gNCkgOlxuICAgICAgICAnTTMwLCcgKyAoLWRpc3RhbmNlKSArICcgUS0xMCwnICsgTWF0aC5yb3VuZCgtZGlzdGFuY2UgLyAyKSArICcgMjYsNCc7XG4gICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIGN1cnZlKTtcbiAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKSB7XG4gIHZhciBub2RlQ2xhc3MgPSAnanNvbmRpZmZwYXRjaC0nICsgdHlwZSArXG4gICAgKG5vZGVUeXBlID8gJyBqc29uZGlmZnBhdGNoLWNoaWxkLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgOiAnJyk7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1kZWx0YSAnICsgbm9kZUNsYXNzICsgJ1wiPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEVuZCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicgKyAoY29udGV4dC5oYXNBcnJvd3MgP1xuICAgICgnPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+c2V0VGltZW91dCgnICtcbiAgICAgIGFkanVzdEFycm93cy50b1N0cmluZygpICtcbiAgICAgICcsMTApOzwvc2NyaXB0PicpIDogJycpKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUpIHtcbiAgdmFyIG5vZGVDbGFzcyA9ICdqc29uZGlmZnBhdGNoLScgKyB0eXBlICtcbiAgICAobm9kZVR5cGUgPyAnIGpzb25kaWZmcGF0Y2gtY2hpbGQtbm9kZS10eXBlLScgKyBub2RlVHlwZSA6ICcnKTtcbiAgY29udGV4dC5vdXQoJzxsaSBjbGFzcz1cIicgKyBub2RlQ2xhc3MgKyAnXCIgZGF0YS1rZXk9XCInICsgbGVmdEtleSArICdcIj4nICtcbiAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtcHJvcGVydHktbmFtZVwiPicgKyBsZWZ0S2V5ICsgJzwvZGl2PicpO1xufTtcblxuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlRW5kID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBjb250ZXh0Lm91dCgnPC9saT4nKTtcbn07XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlICovXG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF91bmNoYW5nZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICBpZiAodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGxlZnQpO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWRlc3RpbmF0aW9uID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBsZWZ0KTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X25vZGUgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAvLyByZWN1cnNlXG4gIHZhciBub2RlVHlwZSA9IChkZWx0YS5fdCA9PT0gJ2EnKSA/ICdhcnJheScgOiAnb2JqZWN0JztcbiAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtbm9kZSBqc29uZGlmZnBhdGNoLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgKyAnXCI+Jyk7XG4gIHRoaXMuZm9ybWF0RGVsdGFDaGlsZHJlbihjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG4gIGNvbnRleHQub3V0KCc8L3VsPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2FkZGVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW9kaWZpZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWUganNvbmRpZmZwYXRjaC1sZWZ0LXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+JyArXG4gICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlIGpzb25kaWZmcGF0Y2gtcmlnaHQtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVsxXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9kZWxldGVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVswXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj48ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1tb3ZlZC1kZXN0aW5hdGlvblwiPicgKyBkZWx0YVsxXSArICc8L2Rpdj4nKTtcblxuICAvLyBkcmF3IGFuIFNWRyBhcnJvdyBmcm9tIGhlcmUgdG8gbW92ZSBkZXN0aW5hdGlvblxuICBjb250ZXh0Lm91dChcbiAgICAvKmpzaGludCBtdWx0aXN0cjogdHJ1ZSAqL1xuICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1hcnJvd1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyBsZWZ0OiAtMzRweDtcIj5cXFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCI2MFwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBkaXNwbGF5OiBub25lO1wiPlxcXG4gICAgICAgIDxkZWZzPlxcXG4gICAgICAgICAgICA8bWFya2VyIGlkPVwibWFya2VyQXJyb3dcIiBtYXJrZXJXaWR0aD1cIjhcIiBtYXJrZXJIZWlnaHQ9XCI4XCIgcmVmeD1cIjJcIiByZWZ5PVwiNFwiXFxcbiAgICAgICAgICAgICAgICAgICBvcmllbnQ9XCJhdXRvXCIgbWFya2VyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxcXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xLDEgTDEsNyBMNyw0IEwxLDFcIiBzdHlsZT1cImZpbGw6ICMzMzk7XCIgLz5cXFxuICAgICAgICAgICAgPC9tYXJrZXI+XFxcbiAgICAgICAgPC9kZWZzPlxcXG4gICAgICAgIDxwYXRoIGQ9XCJNMzAsMCBRLTEwLDI1IDI2LDUwXCIgc3R5bGU9XCJzdHJva2U6ICM4OGY7IHN0cm9rZS13aWR0aDogMnB4OyBmaWxsOiBub25lO1xcXG4gICAgICAgIHN0cm9rZS1vcGFjaXR5OiAwLjU7IG1hcmtlci1lbmQ6IHVybCgjbWFya2VyQXJyb3cpO1wiPjwvcGF0aD5cXFxuICAgICAgICA8L3N2Zz5cXFxuICAgICAgICA8L2Rpdj4nKTtcbiAgY29udGV4dC5oYXNBcnJvd3MgPSB0cnVlO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3RleHRkaWZmID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VGV4dERpZmZTdHJpbmcoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiB0cnVlICovXG5cbnZhciBzaG93VW5jaGFuZ2VkID0gZnVuY3Rpb24oc2hvdywgbm9kZSwgZGVsYXkpIHtcbiAgdmFyIGVsID0gbm9kZSB8fCBkb2N1bWVudC5ib2R5O1xuICB2YXIgcHJlZml4ID0gJ2pzb25kaWZmcGF0Y2gtdW5jaGFuZ2VkLSc7XG4gIHZhciBjbGFzc2VzID0ge1xuICAgIHNob3dpbmc6IHByZWZpeCArICdzaG93aW5nJyxcbiAgICBoaWRpbmc6IHByZWZpeCArICdoaWRpbmcnLFxuICAgIHZpc2libGU6IHByZWZpeCArICd2aXNpYmxlJyxcbiAgICBoaWRkZW46IHByZWZpeCArICdoaWRkZW4nLFxuICB9O1xuICB2YXIgbGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgaWYgKCFsaXN0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZGVsYXkpIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnNob3dpbmcpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkaW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkZGVuKTtcbiAgICBpZiAoc2hvdyA9PT0gZmFsc2UpIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMuaGlkZGVuKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzaG93ID09PSBmYWxzZSkge1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5hZGQoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIH0sIDEwKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGluZyk7XG4gICAgbGlzdC5hZGQoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGRlbik7XG4gIH1cbiAgdmFyIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICBhZGp1c3RBcnJvd3MoZWwpO1xuICB9LCAxMDApO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIGlmIChzaG93ID09PSBmYWxzZSkge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5oaWRkZW4pO1xuICAgICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkZGVuKTtcbiAgICB9XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH0sIGRlbGF5ICsgNDAwKTtcbiAgfSwgZGVsYXkpO1xufTtcblxudmFyIGhpZGVVbmNoYW5nZWQgPSBmdW5jdGlvbihub2RlLCBkZWxheSkge1xuICByZXR1cm4gc2hvd1VuY2hhbmdlZChmYWxzZSwgbm9kZSwgZGVsYXkpO1xufTtcblxuZXhwb3J0cy5IdG1sRm9ybWF0dGVyID0gSHRtbEZvcm1hdHRlcjtcblxuZXhwb3J0cy5zaG93VW5jaGFuZ2VkID0gc2hvd1VuY2hhbmdlZDtcblxuZXhwb3J0cy5oaWRlVW5jaGFuZ2VkID0gaGlkZVVuY2hhbmdlZDtcblxudmFyIGRlZmF1bHRJbnN0YW5jZTtcblxuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICBpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuICAgIGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBIdG1sRm9ybWF0dGVyKCk7XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5mb3JtYXQoZGVsdGEsIGxlZnQpO1xufTtcbiIsInZhciBlbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4uL2Vudmlyb25tZW50Jyk7XG5cbmV4cG9ydHMuYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xuZXhwb3J0cy5odG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5leHBvcnRzLmFubm90YXRlZCA9IHJlcXVpcmUoJy4vYW5ub3RhdGVkJyk7XG5leHBvcnRzLmpzb25wYXRjaCA9IHJlcXVpcmUoJy4vanNvbnBhdGNoJyk7XG5cbmlmICghZW52aXJvbm1lbnQuaXNCcm93c2VyKSB7XG4gIHZhciBjb25zb2xlTW9kdWxlTmFtZSA9ICcuL2NvbnNvbGUnO1xuICBleHBvcnRzLmNvbnNvbGUgPSByZXF1aXJlKGNvbnNvbGVNb2R1bGVOYW1lKTtcbn1cbiIsIihmdW5jdGlvbiAoKSB7XG4gIHZhciBiYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG4gIHZhciBCYXNlRm9ybWF0dGVyID0gYmFzZS5CYXNlRm9ybWF0dGVyO1xuXG4gIHZhciBuYW1lZCA9IHtcbiAgICBhZGRlZDogJ2FkZCcsXG4gICAgZGVsZXRlZDogJ3JlbW92ZScsXG4gICAgbW9kaWZpZWQ6ICdyZXBsYWNlJyxcbiAgICBtb3ZlZDogJ21vdmVkJyxcbiAgICBtb3ZlZGVzdGluYXRpb246ICdtb3ZlZGVzdGluYXRpb24nLFxuICAgIHVuY2hhbmdlZDogJ3VuY2hhbmdlZCcsXG4gICAgZXJyb3I6ICdlcnJvcicsXG4gICAgdGV4dERpZmZMaW5lOiAndGV4dERpZmZMaW5lJ1xuICB9O1xuXG4gIGZ1bmN0aW9uIEpTT05Gb3JtYXR0ZXIoKSB7XG4gICAgdGhpcy5pbmNsdWRlTW92ZURlc3RpbmF0aW9ucyA9IGZhbHNlO1xuICB9XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUgPSBuZXcgQmFzZUZvcm1hdHRlcigpO1xuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLnByZXBhcmVDb250ZXh0ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBCYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dC5jYWxsKHRoaXMsIGNvbnRleHQpO1xuICAgIGNvbnRleHQucmVzdWx0ID0gW107XG4gICAgY29udGV4dC5wYXRoID0gW107XG4gICAgY29udGV4dC5wdXNoQ3VycmVudE9wID0gZnVuY3Rpb24gKG9wLCB2YWx1ZSkge1xuICAgICAgdmFyIHZhbCA9IHtcbiAgICAgICAgb3A6IG9wLFxuICAgICAgICBwYXRoOiB0aGlzLmN1cnJlbnRQYXRoKClcbiAgICAgIH07XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWwudmFsdWUgPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucmVzdWx0LnB1c2godmFsKTtcbiAgICB9O1xuXG4gICAgY29udGV4dC5jdXJyZW50UGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiAnLycgKyB0aGlzLnBhdGguam9pbignLycpO1xuICAgIH07XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uIChjb250ZXh0LCBlcnIpIHtcbiAgICBjb250ZXh0Lm91dCgnW0VSUk9SXScgKyBlcnIpO1xuICB9O1xuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RCZWdpbiA9IGZ1bmN0aW9uICgpIHtcbiAgfTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5yb290RW5kID0gZnVuY3Rpb24gKCkge1xuICB9O1xuXG4gIEpTT05Gb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVCZWdpbiA9IGZ1bmN0aW9uIChjb250ZXh0LCBrZXksIGxlZnRLZXkpIHtcbiAgICBjb250ZXh0LnBhdGgucHVzaChsZWZ0S2V5KTtcbiAgfTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlRW5kID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb250ZXh0LnBhdGgucG9wKCk7XG4gIH07XG5cbiAgLyoganNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdW5jaGFuZ2VkID0gZnVuY3Rpb24gKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gICAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb250ZXh0LnB1c2hDdXJyZW50T3AobmFtZWQudW5jaGFuZ2VkLCBsZWZ0KTtcbiAgfTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWRlc3RpbmF0aW9uID0gZnVuY3Rpb24gKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gICAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb250ZXh0LnB1c2hDdXJyZW50T3AobmFtZWQubW92ZWRlc3RpbmF0aW9uLCBsZWZ0KTtcbiAgfTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbm9kZSA9IGZ1bmN0aW9uIChjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAgIHRoaXMuZm9ybWF0RGVsdGFDaGlsZHJlbihjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2FkZGVkID0gZnVuY3Rpb24gKGNvbnRleHQsIGRlbHRhKSB7XG4gICAgY29udGV4dC5wdXNoQ3VycmVudE9wKG5hbWVkLmFkZGVkLCBkZWx0YVswXSk7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vZGlmaWVkID0gZnVuY3Rpb24gKGNvbnRleHQsIGRlbHRhKSB7XG4gICAgY29udGV4dC5wdXNoQ3VycmVudE9wKG5hbWVkLm1vZGlmaWVkLCBkZWx0YVsxXSk7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2RlbGV0ZWQgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGNvbnRleHQucHVzaEN1cnJlbnRPcChuYW1lZC5kZWxldGVkKTtcbiAgfTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWQgPSBmdW5jdGlvbiAoY29udGV4dCwgZGVsdGEpIHtcbiAgICBjb250ZXh0LnB1c2hDdXJyZW50T3AobmFtZWQubW92ZWQsIGRlbHRhWzFdKTtcbiAgfTtcblxuICBKU09ORm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdGV4dGRpZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhyb3cgJ25vdCBpbXBsaW1lbnRlZCc7XG4gIH07XG5cbiAgSlNPTkZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKGRlbHRhLCBsZWZ0KSB7XG4gICAgdmFyIGNvbnRleHQgPSB7fTtcbiAgICB0aGlzLnByZXBhcmVDb250ZXh0KGNvbnRleHQpO1xuICAgIHRoaXMucmVjdXJzZShjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG4gICAgcmV0dXJuIGNvbnRleHQucmVzdWx0O1xuICB9O1xuICAvKiBqc2hpbnQgY2FtZWxjYXNlOiB0cnVlICovXG5cbiAgZXhwb3J0cy5KU09ORm9ybWF0dGVyID0gSlNPTkZvcm1hdHRlcjtcblxuICB2YXIgZGVmYXVsdEluc3RhbmNlO1xuXG4gIGZ1bmN0aW9uIGxhc3QoYXJyKSB7XG4gICAgcmV0dXJuIGFyclthcnIubGVuZ3RoIC0gMV07XG4gIH1cblxuICBmdW5jdGlvbiBzb3J0QnkoYXJyLCBwcmVkKSB7XG4gICAgYXJyLnNvcnQocHJlZCk7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIHZhciBjb21wYXJlQnlJbmRleERlc2MgPSBmdW5jdGlvbiAoaW5kZXhBLCBpbmRleEIpIHtcbiAgICB2YXIgbGFzdEEgPSBwYXJzZUludChpbmRleEEsIDEwKTtcbiAgICB2YXIgbGFzdEIgPSBwYXJzZUludChpbmRleEIsIDEwKTtcbiAgICBpZiAoIShpc05hTihsYXN0QSkgfHwgaXNOYU4obGFzdEIpKSkge1xuICAgICAgcmV0dXJuIGxhc3RCIC0gbGFzdEE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBvcHNCeURlc2NlbmRpbmdPcmRlcihyZW1vdmVPcHMpIHtcbiAgICByZXR1cm4gc29ydEJ5KHJlbW92ZU9wcywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHZhciBzcGxpdEEgPSBhLnBhdGguc3BsaXQoJy8nKTtcbiAgICAgIHZhciBzcGxpdEIgPSBiLnBhdGguc3BsaXQoJy8nKTtcbiAgICAgIGlmIChzcGxpdEEubGVuZ3RoICE9PSBzcGxpdEIubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBzcGxpdEEubGVuZ3RoIC0gc3BsaXRCLmxlbmd0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlQnlJbmRleERlc2MobGFzdChzcGxpdEEpLCBsYXN0KHNwbGl0QikpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFydGl0aW9uKGFyciwgcHJlZCkge1xuICAgIHZhciBsZWZ0ID0gW107XG4gICAgdmFyIHJpZ2h0ID0gW107XG5cbiAgICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgIHZhciBjb2xsID0gcHJlZChlbCkgPyBsZWZ0IDogcmlnaHQ7XG4gICAgICBjb2xsLnB1c2goZWwpO1xuICAgIH0pO1xuICAgIHJldHVybiBbbGVmdCwgcmlnaHRdO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVvcmRlck9wcyhqc29uRm9ybWF0dGVkRGlmZikge1xuICAgIHZhciByZW1vdmVPcHNPdGhlck9wcyA9IHBhcnRpdGlvbihqc29uRm9ybWF0dGVkRGlmZiwgZnVuY3Rpb24gKG9wZXJhdGlvbikge1xuICAgICAgcmV0dXJuIG9wZXJhdGlvbi5vcCA9PT0gJ3JlbW92ZSc7XG4gICAgfSk7XG4gICAgdmFyIHJlbW92ZU9wcyA9IHJlbW92ZU9wc090aGVyT3BzWzBdO1xuICAgIHZhciBvdGhlck9wcyA9IHJlbW92ZU9wc090aGVyT3BzWzFdO1xuXG4gICAgdmFyIHJlbW92ZU9wc1JldmVyc2UgPSBvcHNCeURlc2NlbmRpbmdPcmRlcihyZW1vdmVPcHMpO1xuICAgIHJldHVybiByZW1vdmVPcHNSZXZlcnNlLmNvbmNhdChvdGhlck9wcyk7XG4gIH1cblxuXG4gIHZhciBmb3JtYXQgPSBmdW5jdGlvbiAoZGVsdGEsIGxlZnQpIHtcbiAgICBpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuICAgICAgZGVmYXVsdEluc3RhbmNlID0gbmV3IEpTT05Gb3JtYXR0ZXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlb3JkZXJPcHMoZGVmYXVsdEluc3RhbmNlLmZvcm1hdChkZWx0YSwgbGVmdCkpO1xuICB9O1xuXG4gIGV4cG9ydHMubG9nID0gZnVuY3Rpb24gKGRlbHRhLCBsZWZ0KSB7XG4gICAgY29uc29sZS5sb2coZm9ybWF0KGRlbHRhLCBsZWZ0KSk7XG4gIH07XG5cbiAgZXhwb3J0cy5mb3JtYXQgPSBmb3JtYXQ7XG59KSgpO1xuIl19
