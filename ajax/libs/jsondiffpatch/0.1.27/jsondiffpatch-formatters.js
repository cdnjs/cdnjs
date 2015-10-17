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
        value: left[parseInt(name.substr(1))]
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

HtmlFormatter.prototype.typeFormattterErrorFormatter = function(context, err) {
  context.out('<pre class="jsondiffpatch-error">' + err + '</pre>');
};

HtmlFormatter.prototype.formatValue = function(context, value) {
  context.out('<pre>' + JSON.stringify(value, null, 2) + '</pre>');
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
      var piece = pieces[pieceIndex];
      context.out('<span class="jsondiffpatch-textdiff-' + piece.type + '">' +
        piece.text + '</span>');
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

exports.html = require('./html');
exports.annotated = require('./annotated');

if (!environment.isBrowser) {
	var consoleModuleName = './console';
	exports.console = require(consoleModuleName);
}

},{"../environment":2,"./annotated":3,"./html":5}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLWZvcm1hdHRlcnMuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2Vudmlyb25tZW50LmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9mb3JtYXR0ZXJzL2Fubm90YXRlZC5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZm9ybWF0dGVycy9iYXNlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9mb3JtYXR0ZXJzL2h0bWwuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2Zvcm1hdHRlcnMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mb3JtYXR0ZXJzJyk7XG4iLCJcbmV4cG9ydHMuaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCc7XG4iLCJ2YXIgYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIEJhc2VGb3JtYXR0ZXIgPSBiYXNlLkJhc2VGb3JtYXR0ZXI7XG5cbnZhciBBbm5vdGF0ZWRGb3JtYXR0ZXIgPSBmdW5jdGlvbiBBbm5vdGF0ZWRGb3JtYXR0ZXIoKSB7XG4gIHRoaXMuaW5jbHVkZU1vdmVEZXN0aW5hdGlvbnMgPSBmYWxzZTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUgPSBuZXcgQmFzZUZvcm1hdHRlcigpO1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnByZXBhcmVDb250ZXh0ID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBCYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dC5jYWxsKHRoaXMsIGNvbnRleHQpO1xuICBjb250ZXh0LmluZGVudCA9IGZ1bmN0aW9uKGxldmVscykge1xuICAgIHRoaXMuaW5kZW50TGV2ZWwgPSAodGhpcy5pbmRlbnRMZXZlbCB8fCAwKSArXG4gICAgICAodHlwZW9mIGxldmVscyA9PT0gJ3VuZGVmaW5lZCcgPyAxIDogbGV2ZWxzKTtcbiAgICB0aGlzLmluZGVudFBhZCA9IG5ldyBBcnJheSh0aGlzLmluZGVudExldmVsICsgMSkuam9pbignJm5ic3A7Jm5ic3A7Jyk7XG4gIH07XG4gIGNvbnRleHQucm93ID0gZnVuY3Rpb24oanNvbiwgaHRtbE5vdGUpIHtcbiAgICBjb250ZXh0Lm91dCgnPHRyPjx0ZCBzdHlsZT1cIndoaXRlLXNwYWNlOiBub3dyYXA7XCI+JyArXG4gICAgICAnPHByZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtYW5ub3RhdGVkLWluZGVudFwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrXCI+Jyk7XG4gICAgY29udGV4dC5vdXQoY29udGV4dC5pbmRlbnRQYWQpO1xuICAgIGNvbnRleHQub3V0KCc8L3ByZT48cHJlIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrXCI+Jyk7XG4gICAgY29udGV4dC5vdXQoanNvbik7XG4gICAgY29udGV4dC5vdXQoJzwvcHJlPjwvdGQ+PHRkIGNsYXNzPVwianNvbmRpZmZwYXRjaC1kZWx0YS1ub3RlXCI+PGRpdj4nKTtcbiAgICBjb250ZXh0Lm91dChodG1sTm90ZSk7XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PjwvdGQ+PC90cj4nKTtcbiAgfTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICBjb250ZXh0LnJvdygnJywgJzxwcmUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWVycm9yXCI+JyArIGVyciArICc8L3ByZT4nKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VGV4dERpZmZTdHJpbmcgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICB2YXIgbGluZXMgPSB0aGlzLnBhcnNlVGV4dERpZmYodmFsdWUpO1xuICBjb250ZXh0Lm91dCgnPHVsIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZlwiPicpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgY29udGV4dC5vdXQoJzxsaT4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1sb2NhdGlvblwiPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lLW51bWJlclwiPicgK1xuICAgICAgbGluZS5sb2NhdGlvbi5saW5lICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWNoYXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24uY2hyICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZVwiPicpO1xuICAgIHZhciBwaWVjZXMgPSBsaW5lLnBpZWNlcztcbiAgICBmb3IgKHZhciBwaWVjZUluZGV4ID0gMCwgcGllY2VzTGVuZ3RoID0gcGllY2VzLmxlbmd0aDsgcGllY2VJbmRleCA8IHBpZWNlc0xlbmd0aDsgcGllY2VJbmRleCsrKSB7XG4gICAgICB2YXIgcGllY2UgPSBwaWVjZXNbcGllY2VJbmRleF07XG4gICAgICBjb250ZXh0Lm91dCgnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLScgKyBwaWVjZS50eXBlICsgJ1wiPicgK1xuICAgICAgICBwaWVjZS50ZXh0ICsgJzwvc3Bhbj4nKTtcbiAgICB9XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PjwvbGk+Jyk7XG4gIH1cbiAgY29udGV4dC5vdXQoJzwvdWw+Jyk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKSB7XG4gIGNvbnRleHQub3V0KCc8dGFibGUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWFubm90YXRlZC1kZWx0YVwiPicpO1xuICBpZiAodHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgY29udGV4dC5yb3coJ3snKTtcbiAgICBjb250ZXh0LmluZGVudCgpO1xuICB9XG4gIGlmIChub2RlVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGNvbnRleHQucm93KCdcIl90XCI6IFwiYVwiLCcsICdBcnJheSBkZWx0YSAobWVtYmVyIG5hbWVzIGluZGljYXRlIGFycmF5IGluZGljZXMpJyk7XG4gIH1cbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEVuZCA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUpIHtcbiAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgIGNvbnRleHQuaW5kZW50KC0xKTtcbiAgICBjb250ZXh0LnJvdygnfScpO1xuICB9XG4gIGNvbnRleHQub3V0KCc8L3RhYmxlPicpO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlQmVnaW4gPSBmdW5jdGlvbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlKSB7XG4gIGNvbnRleHQucm93KCcmcXVvdDsnICsga2V5ICsgJyZxdW90OzogeycpO1xuICBpZiAodHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgY29udGV4dC5pbmRlbnQoKTtcbiAgfVxuICBpZiAobm9kZVR5cGUgPT09ICdhcnJheScpIHtcbiAgICBjb250ZXh0LnJvdygnXCJfdFwiOiBcImFcIiwnLCAnQXJyYXkgZGVsdGEgKG1lbWJlciBuYW1lcyBpbmRpY2F0ZSBhcnJheSBpbmRpY2VzKScpO1xuICB9XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVFbmQgPSBmdW5jdGlvbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlLCBpc0xhc3QpIHtcbiAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgIGNvbnRleHQuaW5kZW50KC0xKTtcbiAgfVxuICBjb250ZXh0LnJvdygnfScgKyAoaXNMYXN0ID8gJycgOiAnLCcpKTtcbn07XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlICovXG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3VuY2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm47XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb3ZlZGVzdGluYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuO1xufTtcblxuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9ub2RlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgLy8gcmVjdXJzZVxuICB0aGlzLmZvcm1hdERlbHRhQ2hpbGRyZW4oY29udGV4dCwgZGVsdGEsIGxlZnQpO1xufTtcblxudmFyIHdyYXBQcm9wZXJ0eU5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiAnPHByZSBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrXCI+JnF1b3Q7JyArIG5hbWUgKyAnJnF1b3Q7PC9wcmU+Jztcbn07XG5cbnZhciBkZWx0YUFubm90YXRpb25zID0ge1xuICBhZGRlZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHZhciBmb3JtYXRMZWdlbmQgPSAnIDxwcmU+KFtuZXdWYWx1ZV0pPC9wcmU+JztcbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gJ25ldyB2YWx1ZScgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnaW5zZXJ0IGF0IGluZGV4ICcgKyBsZWZ0S2V5ICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICByZXR1cm4gJ2FkZCBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KSArIGZvcm1hdExlZ2VuZDtcbiAgfSxcbiAgbW9kaWZpZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICB2YXIgZm9ybWF0TGVnZW5kID0gJyA8cHJlPihbcHJldmlvdXNWYWx1ZSwgbmV3VmFsdWVdKTwvcHJlPic7XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICdtb2RpZnkgdmFsdWUnICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJ21vZGlmeSBhdCBpbmRleCAnICsgbGVmdEtleSArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgcmV0dXJuICdtb2RpZnkgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSkgKyBmb3JtYXRMZWdlbmQ7XG4gIH0sXG4gIGRlbGV0ZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICB2YXIgZm9ybWF0TGVnZW5kID0gJyA8cHJlPihbcHJldmlvdXNWYWx1ZSwgMCwgMF0pPC9wcmU+JztcbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gJ2RlbGV0ZSB2YWx1ZScgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAncmVtb3ZlIGluZGV4ICcgKyBsZWZ0S2V5ICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICByZXR1cm4gJ2RlbGV0ZSBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KSArIGZvcm1hdExlZ2VuZDtcbiAgfSxcbiAgbW92ZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICByZXR1cm4gJ21vdmUgZnJvbSA8c3BhbiB0aXRsZT1cIihwb3NpdGlvbiB0byByZW1vdmUgYXQgb3JpZ2luYWwgc3RhdGUpXCI+aW5kZXggJyArXG4gICAgICBsZWZ0S2V5ICsgJzwvc3Bhbj4gdG8gJyArXG4gICAgICAnPHNwYW4gdGl0bGU9XCIocG9zaXRpb24gdG8gaW5zZXJ0IGF0IGZpbmFsIHN0YXRlKVwiPmluZGV4ICcgK1xuICAgICAgZGVsdGFbMV0gKyAnPC9zcGFuPic7XG4gIH0sXG4gIHRleHRkaWZmOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgdmFyIGxvY2F0aW9uID0gKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykgP1xuICAgICAgJycgOiAoXG4gICAgICAgICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpID9cbiAgICAgICAgJyBhdCBpbmRleCAnICsgbGVmdEtleSA6XG4gICAgICAgICcgYXQgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSlcbiAgICAgICk7XG4gICAgcmV0dXJuICd0ZXh0IGRpZmYnICsgbG9jYXRpb24gKyAnLCBmb3JtYXQgaXMgJyArXG4gICAgICAnPGEgaHJlZj1cImh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvZ29vZ2xlLWRpZmYtbWF0Y2gtcGF0Y2gvd2lraS9VbmlkaWZmXCI+JyArXG4gICAgICAnYSB2YXJpYXRpb24gb2YgVW5pZGlmZjwvYT4nO1xuICB9XG59O1xuXG52YXIgZm9ybWF0QW55Q2hhbmdlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgdmFyIGRlbHRhVHlwZSA9IHRoaXMuZ2V0RGVsdGFUeXBlKGRlbHRhKTtcbiAgdmFyIGFubm90YXRvciA9IGRlbHRhQW5ub3RhdGlvbnNbZGVsdGFUeXBlXTtcbiAgdmFyIGh0bWxOb3RlID0gYW5ub3RhdG9yICYmIGFubm90YXRvci5hcHBseShhbm5vdGF0b3IsXG4gICAgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gIHZhciBqc29uID0gSlNPTi5zdHJpbmdpZnkoZGVsdGEsIG51bGwsIDIpO1xuICBpZiAoZGVsdGFUeXBlID09PSAndGV4dGRpZmYnKSB7XG4gICAgLy8gc3BsaXQgdGV4dCBkaWZmcyBsaW5lc1xuICAgIGpzb24gPSBqc29uLnNwbGl0KCdcXFxcbicpLmpvaW4oJ1xcXFxuXCIrXFxuICAgXCInKTtcbiAgfVxuICBjb250ZXh0LmluZGVudCgpO1xuICBjb250ZXh0LnJvdyhqc29uLCBodG1sTm90ZSk7XG4gIGNvbnRleHQuaW5kZW50KC0xKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2FkZGVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW9kaWZpZWQgPSBmb3JtYXRBbnlDaGFuZ2U7XG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9kZWxldGVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWQgPSBmb3JtYXRBbnlDaGFuZ2U7XG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF90ZXh0ZGlmZiA9IGZvcm1hdEFueUNoYW5nZTtcblxuLyoganNoaW50IGNhbWVsY2FzZTogdHJ1ZSAqL1xuXG5leHBvcnRzLkFubm90YXRlZEZvcm1hdHRlciA9IEFubm90YXRlZEZvcm1hdHRlcjtcblxudmFyIGRlZmF1bHRJbnN0YW5jZTtcblxuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICBpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuICAgIGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBBbm5vdGF0ZWRGb3JtYXR0ZXIoKTtcbiAgfVxuICByZXR1cm4gZGVmYXVsdEluc3RhbmNlLmZvcm1hdChkZWx0YSwgbGVmdCk7XG59O1xuIiwidmFyIGlzQXJyYXkgPSAodHlwZW9mIEFycmF5LmlzQXJyYXkgPT09ICdmdW5jdGlvbicpID9cbiAgLy8gdXNlIG5hdGl2ZSBmdW5jdGlvblxuICBBcnJheS5pc0FycmF5IDpcbiAgLy8gdXNlIGluc3RhbmNlb2Ygb3BlcmF0b3JcbiAgZnVuY3Rpb24oYSkge1xuICAgIHJldHVybiBhIGluc3RhbmNlb2YgQXJyYXk7XG4gIH07XG5cbnZhciBnZXRPYmplY3RLZXlzID0gdHlwZW9mIE9iamVjdC5rZXlzID09PSAnZnVuY3Rpb24nID9cbiAgZnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaik7XG4gIH0gOiBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgbmFtZXMgPSBbXTtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmopIHtcbiAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIG5hbWVzLnB1c2gocHJvcGVydHkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmFtZXM7XG4gIH07XG5cbnZhciB0cmltVW5kZXJzY29yZSA9IGZ1bmN0aW9uKHN0cikge1xuICBpZiAoc3RyLnN1YnN0cigwLCAxKSA9PT0gJ18nKSB7XG4gICAgcmV0dXJuIHN0ci5zbGljZSgxKTtcbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxudmFyIGFycmF5S2V5VG9Tb3J0TnVtYmVyID0gZnVuY3Rpb24oa2V5KSB7XG4gIGlmIChrZXkgPT09ICdfdCcpIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGtleS5zdWJzdHIoMCwgMSkgPT09ICdfJykge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGtleS5zbGljZSgxKSwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoa2V5LCAxMCkgKyAwLjE7XG4gICAgfVxuICB9XG59O1xuXG52YXIgYXJyYXlLZXlDb21wYXJlciA9IGZ1bmN0aW9uKGtleTEsIGtleTIpIHtcbiAgcmV0dXJuIGFycmF5S2V5VG9Tb3J0TnVtYmVyKGtleTEpIC0gYXJyYXlLZXlUb1NvcnROdW1iZXIoa2V5Mik7XG59O1xuXG52YXIgQmFzZUZvcm1hdHRlciA9IGZ1bmN0aW9uIEJhc2VGb3JtYXR0ZXIoKSB7fTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24oZGVsdGEsIGxlZnQpIHtcbiAgdmFyIGNvbnRleHQgPSB7fTtcbiAgdGhpcy5wcmVwYXJlQ29udGV4dChjb250ZXh0KTtcbiAgdGhpcy5yZWN1cnNlKGNvbnRleHQsIGRlbHRhLCBsZWZ0KTtcbiAgcmV0dXJuIHRoaXMuZmluYWxpemUoY29udGV4dCk7XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgY29udGV4dC5idWZmZXIgPSBbXTtcbiAgY29udGV4dC5vdXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJ1ZmZlci5wdXNoLmFwcGx5KHRoaXMuYnVmZmVyLCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJOb3RGb3VuZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhVHlwZSkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBmb3JtYXQgZGVsdGEgdHlwZTogJyArIGRlbHRhVHlwZSk7XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlckVycm9yRm9ybWF0dGVyID0gZnVuY3Rpb24oY29udGV4dCwgZXJyKSB7XG4gIHJldHVybiBlcnIudG9TdHJpbmcoKTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZpbmFsaXplID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBpZiAoaXNBcnJheShjb250ZXh0LmJ1ZmZlcikpIHtcbiAgICByZXR1cm4gY29udGV4dC5idWZmZXIuam9pbignJyk7XG4gIH1cbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnJlY3Vyc2UgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20sIGlzTGFzdCkge1xuXG4gIHZhciB1c2VNb3ZlT3JpZ2luSGVyZSA9IGRlbHRhICYmIG1vdmVkRnJvbTtcbiAgdmFyIGxlZnRWYWx1ZSA9IHVzZU1vdmVPcmlnaW5IZXJlID8gbW92ZWRGcm9tLnZhbHVlIDogbGVmdDtcblxuICBpZiAodHlwZW9mIGRlbHRhID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Yga2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICB2YXIgdHlwZSA9IHRoaXMuZ2V0RGVsdGFUeXBlKGRlbHRhLCBtb3ZlZEZyb20pO1xuICB2YXIgbm9kZVR5cGUgPSB0eXBlID09PSAnbm9kZScgPyAoZGVsdGEuX3QgPT09ICdhJyA/ICdhcnJheScgOiAnb2JqZWN0JykgOiAnJztcblxuICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLm5vZGVCZWdpbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlLCBpc0xhc3QpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucm9vdEJlZ2luKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKTtcbiAgfVxuXG4gIHZhciB0eXBlRm9ybWF0dHRlcjtcbiAgdHJ5IHtcbiAgICB0eXBlRm9ybWF0dHRlciA9IHRoaXNbJ2Zvcm1hdF8nICsgdHlwZV0gfHwgdGhpcy50eXBlRm9ybWF0dHRlck5vdEZvdW5kKGNvbnRleHQsIHR5cGUpO1xuICAgIHR5cGVGb3JtYXR0dGVyLmNhbGwodGhpcywgY29udGV4dCwgZGVsdGEsIGxlZnRWYWx1ZSwga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aGlzLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIoY29udGV4dCwgZXJyLCBkZWx0YSwgbGVmdFZhbHVlLCBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVyci5zdGFjayk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5ub2RlRW5kKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUsIGlzTGFzdCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yb290RW5kKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKTtcbiAgfVxufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0RGVsdGFDaGlsZHJlbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdGhpcy5mb3JFYWNoRGVsdGFLZXkoZGVsdGEsIGxlZnQsIGZ1bmN0aW9uKGtleSwgbGVmdEtleSwgbW92ZWRGcm9tLCBpc0xhc3QpIHtcbiAgICBzZWxmLnJlY3Vyc2UoY29udGV4dCwgZGVsdGFba2V5XSwgbGVmdCA/IGxlZnRbbGVmdEtleV0gOiB1bmRlZmluZWQsXG4gICAgICBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSwgaXNMYXN0KTtcbiAgfSk7XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JFYWNoRGVsdGFLZXkgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCwgZm4pIHtcbiAgdmFyIGtleXMgPSBnZXRPYmplY3RLZXlzKGRlbHRhKTtcbiAgdmFyIGFycmF5S2V5cyA9IGRlbHRhLl90ID09PSAnYSc7XG4gIHZhciBtb3ZlRGVzdGluYXRpb25zID0ge307XG4gIHZhciBuYW1lO1xuICBpZiAodHlwZW9mIGxlZnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZm9yIChuYW1lIGluIGxlZnQpIHtcbiAgICAgIGlmICh0eXBlb2YgZGVsdGFbbmFtZV0gPT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICgoIWFycmF5S2V5cykgfHwgdHlwZW9mIGRlbHRhWydfJyArIG5hbWVdID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAga2V5cy5wdXNoKG5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBsb29rIGZvciBtb3ZlIGRlc3RpbmF0aW9uc1xuICBmb3IgKG5hbWUgaW4gZGVsdGEpIHtcbiAgICB2YXIgdmFsdWUgPSBkZWx0YVtuYW1lXTtcbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWVbMl0gPT09IDMpIHtcbiAgICAgIG1vdmVEZXN0aW5hdGlvbnNbdmFsdWVbMV0udG9TdHJpbmcoKV0gPSB7XG4gICAgICAgIGtleTogbmFtZSxcbiAgICAgICAgdmFsdWU6IGxlZnRbcGFyc2VJbnQobmFtZS5zdWJzdHIoMSkpXVxuICAgICAgfTtcbiAgICAgIGlmICh0aGlzLmluY2x1ZGVNb3ZlRGVzdGluYXRpb25zICE9PSBmYWxzZSkge1xuICAgICAgICBpZiAoKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykgJiZcbiAgICAgICAgICAodHlwZW9mIGRlbHRhW3ZhbHVlWzFdXSA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAga2V5cy5wdXNoKHZhbHVlWzFdLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChhcnJheUtleXMpIHtcbiAgICBrZXlzLnNvcnQoYXJyYXlLZXlDb21wYXJlcik7XG4gIH0gZWxzZSB7XG4gICAga2V5cy5zb3J0KCk7XG4gIH1cbiAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpbmRleF07XG4gICAgaWYgKGFycmF5S2V5cyAmJiBrZXkgPT09ICdfdCcpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICB2YXIgbGVmdEtleSA9IGFycmF5S2V5cyA/XG4gICAgICAodHlwZW9mIGtleSA9PT0gJ251bWJlcicgPyBrZXkgOiBwYXJzZUludCh0cmltVW5kZXJzY29yZShrZXkpLCAxMCkpIDpcbiAgICAgIGtleTtcbiAgICB2YXIgaXNMYXN0ID0gKGluZGV4ID09PSBsZW5ndGggLSAxKTtcbiAgICBmbihrZXksIGxlZnRLZXksIG1vdmVEZXN0aW5hdGlvbnNbbGVmdEtleV0sIGlzTGFzdCk7XG4gIH1cbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmdldERlbHRhVHlwZSA9IGZ1bmN0aW9uKGRlbHRhLCBtb3ZlZEZyb20pIHtcbiAgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIG1vdmVkRnJvbSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnbW92ZWRlc3RpbmF0aW9uJztcbiAgICB9XG4gICAgcmV0dXJuICd1bmNoYW5nZWQnO1xuICB9XG4gIGlmIChpc0FycmF5KGRlbHRhKSkge1xuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiAnYWRkZWQnO1xuICAgIH1cbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAyKSB7XG4gICAgICByZXR1cm4gJ21vZGlmaWVkJztcbiAgICB9XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMyAmJiBkZWx0YVsyXSA9PT0gMCkge1xuICAgICAgcmV0dXJuICdkZWxldGVkJztcbiAgICB9XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMyAmJiBkZWx0YVsyXSA9PT0gMikge1xuICAgICAgcmV0dXJuICd0ZXh0ZGlmZic7XG4gICAgfVxuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDMgJiYgZGVsdGFbMl0gPT09IDMpIHtcbiAgICAgIHJldHVybiAnbW92ZWQnO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVsdGEgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuICdub2RlJztcbiAgfVxuICByZXR1cm4gJ3Vua25vd24nO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucGFyc2VUZXh0RGlmZiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgdmFyIGxpbmVzID0gdmFsdWUuc3BsaXQoJ1xcbkBAICcpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgdmFyIGxpbmVPdXRwdXQgPSB7XG4gICAgICBwaWVjZXM6IFtdXG4gICAgfTtcbiAgICB2YXIgbG9jYXRpb24gPSAvXig/OkBAICk/Wy0rXT8oXFxkKyksKFxcZCspLy5leGVjKGxpbmUpLnNsaWNlKDEpO1xuICAgIGxpbmVPdXRwdXQubG9jYXRpb24gPSB7XG4gICAgICBsaW5lOiBsb2NhdGlvblswXSxcbiAgICAgIGNocjogbG9jYXRpb25bMV1cbiAgICB9O1xuICAgIHZhciBwaWVjZXMgPSBsaW5lLnNwbGl0KCdcXG4nKS5zbGljZSgxKTtcbiAgICBmb3IgKHZhciBwaWVjZUluZGV4ID0gMCwgcGllY2VzTGVuZ3RoID0gcGllY2VzLmxlbmd0aDsgcGllY2VJbmRleCA8IHBpZWNlc0xlbmd0aDsgcGllY2VJbmRleCsrKSB7XG4gICAgICB2YXIgcGllY2UgPSBwaWVjZXNbcGllY2VJbmRleF07XG4gICAgICBpZiAoIXBpZWNlLmxlbmd0aCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBwaWVjZU91dHB1dCA9IHtcbiAgICAgICAgdHlwZTogJ2NvbnRleHQnXG4gICAgICB9O1xuICAgICAgaWYgKHBpZWNlLnN1YnN0cigwLCAxKSA9PT0gJysnKSB7XG4gICAgICAgIHBpZWNlT3V0cHV0LnR5cGUgPSAnYWRkZWQnO1xuICAgICAgfSBlbHNlIGlmIChwaWVjZS5zdWJzdHIoMCwgMSkgPT09ICctJykge1xuICAgICAgICBwaWVjZU91dHB1dC50eXBlID0gJ2RlbGV0ZWQnO1xuICAgICAgfVxuICAgICAgcGllY2VPdXRwdXQudGV4dCA9IHBpZWNlLnNsaWNlKDEpO1xuICAgICAgbGluZU91dHB1dC5waWVjZXMucHVzaChwaWVjZU91dHB1dCk7XG4gICAgfVxuICAgIG91dHB1dC5wdXNoKGxpbmVPdXRwdXQpO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59O1xuXG5leHBvcnRzLkJhc2VGb3JtYXR0ZXIgPSBCYXNlRm9ybWF0dGVyO1xuIiwidmFyIGJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBCYXNlRm9ybWF0dGVyID0gYmFzZS5CYXNlRm9ybWF0dGVyO1xuXG52YXIgSHRtbEZvcm1hdHRlciA9IGZ1bmN0aW9uIEh0bWxGb3JtYXR0ZXIoKSB7fTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUgPSBuZXcgQmFzZUZvcm1hdHRlcigpO1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlckVycm9yRm9ybWF0dGVyID0gZnVuY3Rpb24oY29udGV4dCwgZXJyKSB7XG4gIGNvbnRleHQub3V0KCc8cHJlIGNsYXNzPVwianNvbmRpZmZwYXRjaC1lcnJvclwiPicgKyBlcnIgKyAnPC9wcmU+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uKGNvbnRleHQsIHZhbHVlKSB7XG4gIGNvbnRleHQub3V0KCc8cHJlPicgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSwgbnVsbCwgMikgKyAnPC9wcmU+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRUZXh0RGlmZlN0cmluZyA9IGZ1bmN0aW9uKGNvbnRleHQsIHZhbHVlKSB7XG4gIHZhciBsaW5lcyA9IHRoaXMucGFyc2VUZXh0RGlmZih2YWx1ZSk7XG4gIGNvbnRleHQub3V0KCc8dWwgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmXCI+Jyk7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBjb250ZXh0Lm91dCgnPGxpPicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxvY2F0aW9uXCI+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxpbmUtbnVtYmVyXCI+JyArXG4gICAgICBsaW5lLmxvY2F0aW9uLmxpbmUgK1xuICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtY2hhclwiPicgK1xuICAgICAgbGluZS5sb2NhdGlvbi5jaHIgK1xuICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lXCI+Jyk7XG4gICAgdmFyIHBpZWNlcyA9IGxpbmUucGllY2VzO1xuICAgIGZvciAodmFyIHBpZWNlSW5kZXggPSAwLCBwaWVjZXNMZW5ndGggPSBwaWVjZXMubGVuZ3RoOyBwaWVjZUluZGV4IDwgcGllY2VzTGVuZ3RoOyBwaWVjZUluZGV4KyspIHtcbiAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1twaWVjZUluZGV4XTtcbiAgICAgIGNvbnRleHQub3V0KCc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtJyArIHBpZWNlLnR5cGUgKyAnXCI+JyArXG4gICAgICAgIHBpZWNlLnRleHQgKyAnPC9zcGFuPicpO1xuICAgIH1cbiAgICBjb250ZXh0Lm91dCgnPC9kaXY+PC9saT4nKTtcbiAgfVxuICBjb250ZXh0Lm91dCgnPC91bD4nKTtcbn07XG5cbnZhciBhZGp1c3RBcnJvd3MgPSBmdW5jdGlvbiBqc29uZGlmZnBhdGNoSHRtbEZvcm1hdHRlckFkanVzdEFycm93cyhub2RlKSB7XG4gIG5vZGUgPSBub2RlIHx8IGRvY3VtZW50O1xuICB2YXIgZ2V0RWxlbWVudFRleHQgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBlbC50ZXh0Q29udGVudCB8fCBlbC5pbm5lclRleHQ7XG4gIH07XG4gIHZhciBlYWNoQnlRdWVyeSA9IGZ1bmN0aW9uKGVsLCBxdWVyeSwgZm4pIHtcbiAgICB2YXIgZWxlbXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsZW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4oZWxlbXNbaV0pO1xuICAgIH1cbiAgfTtcbiAgdmFyIGVhY2hDaGlsZHJlbiA9IGZ1bmN0aW9uKGVsLCBmbikge1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZWwuY2hpbGRyZW4ubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbihlbC5jaGlsZHJlbltpXSwgaSk7XG4gICAgfVxuICB9O1xuICBlYWNoQnlRdWVyeShub2RlLCAnLmpzb25kaWZmcGF0Y2gtYXJyb3cnLCBmdW5jdGlvbihhcnJvdykge1xuICAgIHZhciBhcnJvd1BhcmVudCA9IGFycm93LnBhcmVudE5vZGU7XG4gICAgdmFyIHN2ZyA9IGFycm93LmNoaWxkcmVuWzBdLFxuICAgICAgcGF0aCA9IHN2Zy5jaGlsZHJlblsxXTtcbiAgICBzdmcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB2YXIgZGVzdGluYXRpb24gPSBnZXRFbGVtZW50VGV4dChhcnJvd1BhcmVudC5xdWVyeVNlbGVjdG9yKCcuanNvbmRpZmZwYXRjaC1tb3ZlZC1kZXN0aW5hdGlvbicpKTtcbiAgICB2YXIgY29udGFpbmVyID0gYXJyb3dQYXJlbnQucGFyZW50Tm9kZTtcbiAgICB2YXIgZGVzdGluYXRpb25FbGVtO1xuICAgIGVhY2hDaGlsZHJlbihjb250YWluZXIsIGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICBpZiAoY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpID09PSBkZXN0aW5hdGlvbikge1xuICAgICAgICBkZXN0aW5hdGlvbkVsZW0gPSBjaGlsZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWRlc3RpbmF0aW9uRWxlbSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgdmFyIGRpc3RhbmNlID0gZGVzdGluYXRpb25FbGVtLm9mZnNldFRvcCAtIGFycm93UGFyZW50Lm9mZnNldFRvcDtcbiAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIE1hdGguYWJzKGRpc3RhbmNlKSArIDYpO1xuICAgICAgYXJyb3cuc3R5bGUudG9wID0gKC04ICsgKGRpc3RhbmNlID4gMCA/IDAgOiBkaXN0YW5jZSkpICsgJ3B4JztcbiAgICAgIHZhciBjdXJ2ZSA9IGRpc3RhbmNlID4gMCA/XG4gICAgICAgICdNMzAsMCBRLTEwLCcgKyBNYXRoLnJvdW5kKGRpc3RhbmNlIC8gMikgKyAnIDI2LCcgKyAoZGlzdGFuY2UgLSA0KSA6XG4gICAgICAgICdNMzAsJyArICgtZGlzdGFuY2UpICsgJyBRLTEwLCcgKyBNYXRoLnJvdW5kKC1kaXN0YW5jZSAvIDIpICsgJyAyNiw0JztcbiAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgY3VydmUpO1xuICAgICAgc3ZnLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0pO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEJlZ2luID0gZnVuY3Rpb24oY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpIHtcbiAgdmFyIG5vZGVDbGFzcyA9ICdqc29uZGlmZnBhdGNoLScgKyB0eXBlICtcbiAgICAobm9kZVR5cGUgPyAnIGpzb25kaWZmcGF0Y2gtY2hpbGQtbm9kZS10eXBlLScgKyBub2RlVHlwZSA6ICcnKTtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWRlbHRhICcgKyBub2RlQ2xhc3MgKyAnXCI+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5yb290RW5kID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBjb250ZXh0Lm91dCgnPC9kaXY+JyArIChjb250ZXh0Lmhhc0Fycm93cyA/XG4gICAgKCc8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5zZXRUaW1lb3V0KCcgK1xuICAgICAgYWRqdXN0QXJyb3dzLnRvU3RyaW5nKCkgK1xuICAgICAgJywxMCk7PC9zY3JpcHQ+JykgOiAnJykpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUJlZ2luID0gZnVuY3Rpb24oY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSkge1xuICB2YXIgbm9kZUNsYXNzID0gJ2pzb25kaWZmcGF0Y2gtJyArIHR5cGUgK1xuICAgIChub2RlVHlwZSA/ICcganNvbmRpZmZwYXRjaC1jaGlsZC1ub2RlLXR5cGUtJyArIG5vZGVUeXBlIDogJycpO1xuICBjb250ZXh0Lm91dCgnPGxpIGNsYXNzPVwiJyArIG5vZGVDbGFzcyArICdcIiBkYXRhLWtleT1cIicgKyBsZWZ0S2V5ICsgJ1wiPicgK1xuICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1wcm9wZXJ0eS1uYW1lXCI+JyArIGxlZnRLZXkgKyAnPC9kaXY+Jyk7XG59O1xuXG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVFbmQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGNvbnRleHQub3V0KCc8L2xpPicpO1xufTtcblxuLyoganNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3VuY2hhbmdlZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gIGlmICh0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgbGVmdCk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb3ZlZGVzdGluYXRpb24gPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICBpZiAodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGxlZnQpO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbm9kZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gIC8vIHJlY3Vyc2VcbiAgdmFyIG5vZGVUeXBlID0gKGRlbHRhLl90ID09PSAnYScpID8gJ2FycmF5JyA6ICdvYmplY3QnO1xuICBjb250ZXh0Lm91dCgnPHVsIGNsYXNzPVwianNvbmRpZmZwYXRjaC1ub2RlIGpzb25kaWZmcGF0Y2gtbm9kZS10eXBlLScgKyBub2RlVHlwZSArICdcIj4nKTtcbiAgdGhpcy5mb3JtYXREZWx0YUNoaWxkcmVuKGNvbnRleHQsIGRlbHRhLCBsZWZ0KTtcbiAgY29udGV4dC5vdXQoJzwvdWw+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfYWRkZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVswXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb2RpZmllZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZSBqc29uZGlmZnBhdGNoLWxlZnQtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVswXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nICtcbiAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWUganNvbmRpZmZwYXRjaC1yaWdodC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzFdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2RlbGV0ZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVswXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb3ZlZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PjxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLW1vdmVkLWRlc3RpbmF0aW9uXCI+JyArIGRlbHRhWzFdICsgJzwvZGl2PicpO1xuXG4gIC8vIGRyYXcgYW4gU1ZHIGFycm93IGZyb20gaGVyZSB0byBtb3ZlIGRlc3RpbmF0aW9uXG4gIGNvbnRleHQub3V0KFxuICAgIC8qanNoaW50IG11bHRpc3RyOiB0cnVlICovXG4gICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWFycm93XCIgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7IGxlZnQ6IC0zNHB4O1wiPlxcXG4gICAgICAgIDxzdmcgd2lkdGg9XCIzMFwiIGhlaWdodD1cIjYwXCIgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGU7IGRpc3BsYXk6IG5vbmU7XCI+XFxcbiAgICAgICAgPGRlZnM+XFxcbiAgICAgICAgICAgIDxtYXJrZXIgaWQ9XCJtYXJrZXJBcnJvd1wiIG1hcmtlcldpZHRoPVwiOFwiIG1hcmtlckhlaWdodD1cIjhcIiByZWZ4PVwiMlwiIHJlZnk9XCI0XCJcXFxuICAgICAgICAgICAgICAgICAgIG9yaWVudD1cImF1dG9cIiBtYXJrZXJVbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XFxcbiAgICAgICAgICAgICAgICA8cGF0aCBkPVwiTTEsMSBMMSw3IEw3LDQgTDEsMVwiIHN0eWxlPVwiZmlsbDogIzMzOTtcIiAvPlxcXG4gICAgICAgICAgICA8L21hcmtlcj5cXFxuICAgICAgICA8L2RlZnM+XFxcbiAgICAgICAgPHBhdGggZD1cIk0zMCwwIFEtMTAsMjUgMjYsNTBcIiBzdHlsZT1cInN0cm9rZTogIzg4Zjsgc3Ryb2tlLXdpZHRoOiAycHg7IGZpbGw6IG5vbmU7XFxcbiAgICAgICAgc3Ryb2tlLW9wYWNpdHk6IDAuNTsgbWFya2VyLWVuZDogdXJsKCNtYXJrZXJBcnJvdyk7XCI+PC9wYXRoPlxcXG4gICAgICAgIDwvc3ZnPlxcXG4gICAgICAgIDwvZGl2PicpO1xuICBjb250ZXh0Lmhhc0Fycm93cyA9IHRydWU7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdGV4dGRpZmYgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRUZXh0RGlmZlN0cmluZyhjb250ZXh0LCBkZWx0YVswXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IHRydWUgKi9cblxudmFyIHNob3dVbmNoYW5nZWQgPSBmdW5jdGlvbihzaG93LCBub2RlLCBkZWxheSkge1xuICB2YXIgZWwgPSBub2RlIHx8IGRvY3VtZW50LmJvZHk7XG4gIHZhciBwcmVmaXggPSAnanNvbmRpZmZwYXRjaC11bmNoYW5nZWQtJztcbiAgdmFyIGNsYXNzZXMgPSB7XG4gICAgc2hvd2luZzogcHJlZml4ICsgJ3Nob3dpbmcnLFxuICAgIGhpZGluZzogcHJlZml4ICsgJ2hpZGluZycsXG4gICAgdmlzaWJsZTogcHJlZml4ICsgJ3Zpc2libGUnLFxuICAgIGhpZGRlbjogcHJlZml4ICsgJ2hpZGRlbicsXG4gIH07XG4gIHZhciBsaXN0ID0gZWwuY2xhc3NMaXN0O1xuICBpZiAoIWxpc3QpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFkZWxheSkge1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRkZW4pO1xuICAgIGlmIChzaG93ID09PSBmYWxzZSkge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5oaWRkZW4pO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHNob3cgPT09IGZhbHNlKSB7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICBsaXN0LmFkZChjbGFzc2VzLnZpc2libGUpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LmFkZChjbGFzc2VzLmhpZGluZyk7XG4gICAgfSwgMTApO1xuICB9IGVsc2Uge1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkaW5nKTtcbiAgICBsaXN0LmFkZChjbGFzc2VzLnNob3dpbmcpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkZGVuKTtcbiAgfVxuICB2YXIgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgIGFkanVzdEFycm93cyhlbCk7XG4gIH0sIDEwMCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGluZyk7XG4gICAgaWYgKHNob3cgPT09IGZhbHNlKSB7XG4gICAgICBsaXN0LmFkZChjbGFzc2VzLmhpZGRlbik7XG4gICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LmFkZChjbGFzc2VzLnZpc2libGUpO1xuICAgICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRkZW4pO1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gICAgfSwgZGVsYXkgKyA0MDApO1xuICB9LCBkZWxheSk7XG59O1xuXG52YXIgaGlkZVVuY2hhbmdlZCA9IGZ1bmN0aW9uKG5vZGUsIGRlbGF5KSB7XG4gIHJldHVybiBzaG93VW5jaGFuZ2VkKGZhbHNlLCBub2RlLCBkZWxheSk7XG59O1xuXG5leHBvcnRzLkh0bWxGb3JtYXR0ZXIgPSBIdG1sRm9ybWF0dGVyO1xuXG5leHBvcnRzLnNob3dVbmNoYW5nZWQgPSBzaG93VW5jaGFuZ2VkO1xuXG5leHBvcnRzLmhpZGVVbmNoYW5nZWQgPSBoaWRlVW5jaGFuZ2VkO1xuXG52YXIgZGVmYXVsdEluc3RhbmNlO1xuXG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0KSB7XG4gIGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG4gICAgZGVmYXVsdEluc3RhbmNlID0gbmV3IEh0bWxGb3JtYXR0ZXIoKTtcbiAgfVxuICByZXR1cm4gZGVmYXVsdEluc3RhbmNlLmZvcm1hdChkZWx0YSwgbGVmdCk7XG59O1xuIiwidmFyIGVudmlyb25tZW50ID0gcmVxdWlyZSgnLi4vZW52aXJvbm1lbnQnKTtcblxuZXhwb3J0cy5odG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5leHBvcnRzLmFubm90YXRlZCA9IHJlcXVpcmUoJy4vYW5ub3RhdGVkJyk7XG5cbmlmICghZW52aXJvbm1lbnQuaXNCcm93c2VyKSB7XG5cdHZhciBjb25zb2xlTW9kdWxlTmFtZSA9ICcuL2NvbnNvbGUnO1xuXHRleHBvcnRzLmNvbnNvbGUgPSByZXF1aXJlKGNvbnNvbGVNb2R1bGVOYW1lKTtcbn1cbiJdfQ==
