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

exports.base = require('./base');
exports.html = require('./html');
exports.annotated = require('./annotated');

if (!environment.isBrowser) {
  var consoleModuleName = './console';
  exports.console = require(consoleModuleName);
}

},{"../environment":2,"./annotated":3,"./base":4,"./html":5}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLWZvcm1hdHRlcnMuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2Vudmlyb25tZW50LmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9mb3JtYXR0ZXJzL2Fubm90YXRlZC5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZm9ybWF0dGVycy9iYXNlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9mb3JtYXR0ZXJzL2h0bWwuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2Zvcm1hdHRlcnMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Zvcm1hdHRlcnMnKTtcbiIsIlxuZXhwb3J0cy5pc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbiIsInZhciBiYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgQmFzZUZvcm1hdHRlciA9IGJhc2UuQmFzZUZvcm1hdHRlcjtcblxudmFyIEFubm90YXRlZEZvcm1hdHRlciA9IGZ1bmN0aW9uIEFubm90YXRlZEZvcm1hdHRlcigpIHtcbiAgdGhpcy5pbmNsdWRlTW92ZURlc3RpbmF0aW9ucyA9IGZhbHNlO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZSA9IG5ldyBCYXNlRm9ybWF0dGVyKCk7XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUucHJlcGFyZUNvbnRleHQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIEJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnByZXBhcmVDb250ZXh0LmNhbGwodGhpcywgY29udGV4dCk7XG4gIGNvbnRleHQuaW5kZW50ID0gZnVuY3Rpb24obGV2ZWxzKSB7XG4gICAgdGhpcy5pbmRlbnRMZXZlbCA9ICh0aGlzLmluZGVudExldmVsIHx8IDApICtcbiAgICAgICh0eXBlb2YgbGV2ZWxzID09PSAndW5kZWZpbmVkJyA/IDEgOiBsZXZlbHMpO1xuICAgIHRoaXMuaW5kZW50UGFkID0gbmV3IEFycmF5KHRoaXMuaW5kZW50TGV2ZWwgKyAxKS5qb2luKCcmbmJzcDsmbmJzcDsnKTtcbiAgfTtcbiAgY29udGV4dC5yb3cgPSBmdW5jdGlvbihqc29uLCBodG1sTm90ZSkge1xuICAgIGNvbnRleHQub3V0KCc8dHI+PHRkIHN0eWxlPVwid2hpdGUtc3BhY2U6IG5vd3JhcDtcIj4nICtcbiAgICAgICc8cHJlIGNsYXNzPVwianNvbmRpZmZwYXRjaC1hbm5vdGF0ZWQtaW5kZW50XCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIj4nKTtcbiAgICBjb250ZXh0Lm91dChjb250ZXh0LmluZGVudFBhZCk7XG4gICAgY29udGV4dC5vdXQoJzwvcHJlPjxwcmUgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIj4nKTtcbiAgICBjb250ZXh0Lm91dChqc29uKTtcbiAgICBjb250ZXh0Lm91dCgnPC9wcmU+PC90ZD48dGQgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWRlbHRhLW5vdGVcIj48ZGl2PicpO1xuICAgIGNvbnRleHQub3V0KGh0bWxOb3RlKTtcbiAgICBjb250ZXh0Lm91dCgnPC9kaXY+PC90ZD48L3RyPicpO1xuICB9O1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlckVycm9yRm9ybWF0dGVyID0gZnVuY3Rpb24oY29udGV4dCwgZXJyKSB7XG4gIGNvbnRleHQucm93KCcnLCAnPHByZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZXJyb3JcIj4nICsgZXJyICsgJzwvcHJlPicpO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRUZXh0RGlmZlN0cmluZyA9IGZ1bmN0aW9uKGNvbnRleHQsIHZhbHVlKSB7XG4gIHZhciBsaW5lcyA9IHRoaXMucGFyc2VUZXh0RGlmZih2YWx1ZSk7XG4gIGNvbnRleHQub3V0KCc8dWwgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmXCI+Jyk7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBjb250ZXh0Lm91dCgnPGxpPicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxvY2F0aW9uXCI+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxpbmUtbnVtYmVyXCI+JyArXG4gICAgICBsaW5lLmxvY2F0aW9uLmxpbmUgK1xuICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtY2hhclwiPicgK1xuICAgICAgbGluZS5sb2NhdGlvbi5jaHIgK1xuICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lXCI+Jyk7XG4gICAgdmFyIHBpZWNlcyA9IGxpbmUucGllY2VzO1xuICAgIGZvciAodmFyIHBpZWNlSW5kZXggPSAwLCBwaWVjZXNMZW5ndGggPSBwaWVjZXMubGVuZ3RoOyBwaWVjZUluZGV4IDwgcGllY2VzTGVuZ3RoOyBwaWVjZUluZGV4KyspIHtcbiAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1twaWVjZUluZGV4XTtcbiAgICAgIGNvbnRleHQub3V0KCc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtJyArIHBpZWNlLnR5cGUgKyAnXCI+JyArXG4gICAgICAgIHBpZWNlLnRleHQgKyAnPC9zcGFuPicpO1xuICAgIH1cbiAgICBjb250ZXh0Lm91dCgnPC9kaXY+PC9saT4nKTtcbiAgfVxuICBjb250ZXh0Lm91dCgnPC91bD4nKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEJlZ2luID0gZnVuY3Rpb24oY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpIHtcbiAgY29udGV4dC5vdXQoJzx0YWJsZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtYW5ub3RhdGVkLWRlbHRhXCI+Jyk7XG4gIGlmICh0eXBlID09PSAnbm9kZScpIHtcbiAgICBjb250ZXh0LnJvdygneycpO1xuICAgIGNvbnRleHQuaW5kZW50KCk7XG4gIH1cbiAgaWYgKG5vZGVUeXBlID09PSAnYXJyYXknKSB7XG4gICAgY29udGV4dC5yb3coJ1wiX3RcIjogXCJhXCIsJywgJ0FycmF5IGRlbHRhIChtZW1iZXIgbmFtZXMgaW5kaWNhdGUgYXJyYXkgaW5kaWNlcyknKTtcbiAgfVxufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5yb290RW5kID0gZnVuY3Rpb24oY29udGV4dCwgdHlwZSkge1xuICBpZiAodHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgY29udGV4dC5pbmRlbnQoLTEpO1xuICAgIGNvbnRleHQucm93KCd9Jyk7XG4gIH1cbiAgY29udGV4dC5vdXQoJzwvdGFibGU+Jyk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUpIHtcbiAgY29udGV4dC5yb3coJyZxdW90OycgKyBrZXkgKyAnJnF1b3Q7OiB7Jyk7XG4gIGlmICh0eXBlID09PSAnbm9kZScpIHtcbiAgICBjb250ZXh0LmluZGVudCgpO1xuICB9XG4gIGlmIChub2RlVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGNvbnRleHQucm93KCdcIl90XCI6IFwiYVwiLCcsICdBcnJheSBkZWx0YSAobWVtYmVyIG5hbWVzIGluZGljYXRlIGFycmF5IGluZGljZXMpJyk7XG4gIH1cbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUVuZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUsIGlzTGFzdCkge1xuICBpZiAodHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgY29udGV4dC5pbmRlbnQoLTEpO1xuICB9XG4gIGNvbnRleHQucm93KCd9JyArIChpc0xhc3QgPyAnJyA6ICcsJykpO1xufTtcblxuLyoganNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdW5jaGFuZ2VkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybjtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkZXN0aW5hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm47XG59O1xuXG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X25vZGUgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAvLyByZWN1cnNlXG4gIHRoaXMuZm9ybWF0RGVsdGFDaGlsZHJlbihjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG59O1xuXG52YXIgd3JhcFByb3BlcnR5TmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuICc8cHJlIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIj4mcXVvdDsnICsgbmFtZSArICcmcXVvdDs8L3ByZT4nO1xufTtcblxudmFyIGRlbHRhQW5ub3RhdGlvbnMgPSB7XG4gIGFkZGVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgdmFyIGZvcm1hdExlZ2VuZCA9ICcgPHByZT4oW25ld1ZhbHVlXSk8L3ByZT4nO1xuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnbmV3IHZhbHVlJyArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuICdpbnNlcnQgYXQgaW5kZXggJyArIGxlZnRLZXkgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIHJldHVybiAnYWRkIHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpICsgZm9ybWF0TGVnZW5kO1xuICB9LFxuICBtb2RpZmllZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHZhciBmb3JtYXRMZWdlbmQgPSAnIDxwcmU+KFtwcmV2aW91c1ZhbHVlLCBuZXdWYWx1ZV0pPC9wcmU+JztcbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gJ21vZGlmeSB2YWx1ZScgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnbW9kaWZ5IGF0IGluZGV4ICcgKyBsZWZ0S2V5ICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICByZXR1cm4gJ21vZGlmeSBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KSArIGZvcm1hdExlZ2VuZDtcbiAgfSxcbiAgZGVsZXRlZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHZhciBmb3JtYXRMZWdlbmQgPSAnIDxwcmU+KFtwcmV2aW91c1ZhbHVlLCAwLCAwXSk8L3ByZT4nO1xuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnZGVsZXRlIHZhbHVlJyArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuICdyZW1vdmUgaW5kZXggJyArIGxlZnRLZXkgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIHJldHVybiAnZGVsZXRlIHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpICsgZm9ybWF0TGVnZW5kO1xuICB9LFxuICBtb3ZlZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHJldHVybiAnbW92ZSBmcm9tIDxzcGFuIHRpdGxlPVwiKHBvc2l0aW9uIHRvIHJlbW92ZSBhdCBvcmlnaW5hbCBzdGF0ZSlcIj5pbmRleCAnICtcbiAgICAgIGxlZnRLZXkgKyAnPC9zcGFuPiB0byAnICtcbiAgICAgICc8c3BhbiB0aXRsZT1cIihwb3NpdGlvbiB0byBpbnNlcnQgYXQgZmluYWwgc3RhdGUpXCI+aW5kZXggJyArXG4gICAgICBkZWx0YVsxXSArICc8L3NwYW4+JztcbiAgfSxcbiAgdGV4dGRpZmY6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICB2YXIgbG9jYXRpb24gPSAodHlwZW9mIGxlZnRLZXkgPT09ICd1bmRlZmluZWQnKSA/XG4gICAgICAnJyA6IChcbiAgICAgICAgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykgP1xuICAgICAgICAnIGF0IGluZGV4ICcgKyBsZWZ0S2V5IDpcbiAgICAgICAgJyBhdCBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KVxuICAgICAgKTtcbiAgICByZXR1cm4gJ3RleHQgZGlmZicgKyBsb2NhdGlvbiArICcsIGZvcm1hdCBpcyAnICtcbiAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtZGlmZi1tYXRjaC1wYXRjaC93aWtpL1VuaWRpZmZcIj4nICtcbiAgICAgICdhIHZhcmlhdGlvbiBvZiBVbmlkaWZmPC9hPic7XG4gIH1cbn07XG5cbnZhciBmb3JtYXRBbnlDaGFuZ2UgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICB2YXIgZGVsdGFUeXBlID0gdGhpcy5nZXREZWx0YVR5cGUoZGVsdGEpO1xuICB2YXIgYW5ub3RhdG9yID0gZGVsdGFBbm5vdGF0aW9uc1tkZWx0YVR5cGVdO1xuICB2YXIgaHRtbE5vdGUgPSBhbm5vdGF0b3IgJiYgYW5ub3RhdG9yLmFwcGx5KGFubm90YXRvcixcbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgdmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeShkZWx0YSwgbnVsbCwgMik7XG4gIGlmIChkZWx0YVR5cGUgPT09ICd0ZXh0ZGlmZicpIHtcbiAgICAvLyBzcGxpdCB0ZXh0IGRpZmZzIGxpbmVzXG4gICAganNvbiA9IGpzb24uc3BsaXQoJ1xcXFxuJykuam9pbignXFxcXG5cIitcXG4gICBcIicpO1xuICB9XG4gIGNvbnRleHQuaW5kZW50KCk7XG4gIGNvbnRleHQucm93KGpzb24sIGh0bWxOb3RlKTtcbiAgY29udGV4dC5pbmRlbnQoLTEpO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfYWRkZWQgPSBmb3JtYXRBbnlDaGFuZ2U7XG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb2RpZmllZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2RlbGV0ZWQgPSBmb3JtYXRBbnlDaGFuZ2U7XG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb3ZlZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3RleHRkaWZmID0gZm9ybWF0QW55Q2hhbmdlO1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiB0cnVlICovXG5cbmV4cG9ydHMuQW5ub3RhdGVkRm9ybWF0dGVyID0gQW5ub3RhdGVkRm9ybWF0dGVyO1xuXG52YXIgZGVmYXVsdEluc3RhbmNlO1xuXG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0KSB7XG4gIGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG4gICAgZGVmYXVsdEluc3RhbmNlID0gbmV3IEFubm90YXRlZEZvcm1hdHRlcigpO1xuICB9XG4gIHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZm9ybWF0KGRlbHRhLCBsZWZ0KTtcbn07XG4iLCJ2YXIgaXNBcnJheSA9ICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAvLyB1c2UgbmF0aXZlIGZ1bmN0aW9uXG4gIEFycmF5LmlzQXJyYXkgOlxuICAvLyB1c2UgaW5zdGFuY2VvZiBvcGVyYXRvclxuICBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGEgaW5zdGFuY2VvZiBBcnJheTtcbiAgfTtcblxudmFyIGdldE9iamVjdEtleXMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgP1xuICBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcbiAgfSA6IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgbmFtZXMucHVzaChwcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYW1lcztcbiAgfTtcblxudmFyIHRyaW1VbmRlcnNjb3JlID0gZnVuY3Rpb24oc3RyKSB7XG4gIGlmIChzdHIuc3Vic3RyKDAsIDEpID09PSAnXycpIHtcbiAgICByZXR1cm4gc3RyLnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG52YXIgYXJyYXlLZXlUb1NvcnROdW1iZXIgPSBmdW5jdGlvbihrZXkpIHtcbiAgaWYgKGtleSA9PT0gJ190Jykge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5LnN1YnN0cigwLCAxKSA9PT0gJ18nKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoa2V5LnNsaWNlKDEpLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXJzZUludChrZXksIDEwKSArIDAuMTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBhcnJheUtleUNvbXBhcmVyID0gZnVuY3Rpb24oa2V5MSwga2V5Mikge1xuICByZXR1cm4gYXJyYXlLZXlUb1NvcnROdW1iZXIoa2V5MSkgLSBhcnJheUtleVRvU29ydE51bWJlcihrZXkyKTtcbn07XG5cbnZhciBCYXNlRm9ybWF0dGVyID0gZnVuY3Rpb24gQmFzZUZvcm1hdHRlcigpIHt9O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICB2YXIgY29udGV4dCA9IHt9O1xuICB0aGlzLnByZXBhcmVDb250ZXh0KGNvbnRleHQpO1xuICB0aGlzLnJlY3Vyc2UoY29udGV4dCwgZGVsdGEsIGxlZnQpO1xuICByZXR1cm4gdGhpcy5maW5hbGl6ZShjb250ZXh0KTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnByZXBhcmVDb250ZXh0ID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBjb250ZXh0LmJ1ZmZlciA9IFtdO1xuICBjb250ZXh0Lm91dCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYnVmZmVyLnB1c2guYXBwbHkodGhpcy5idWZmZXIsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlck5vdEZvdW5kID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGFUeXBlKSB7XG4gIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZvcm1hdCBkZWx0YSB0eXBlOiAnICsgZGVsdGFUeXBlKTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIgPSBmdW5jdGlvbihjb250ZXh0LCBlcnIpIHtcbiAgcmV0dXJuIGVyci50b1N0cmluZygpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZmluYWxpemUgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGlmIChpc0FycmF5KGNvbnRleHQuYnVmZmVyKSkge1xuICAgIHJldHVybiBjb250ZXh0LmJ1ZmZlci5qb2luKCcnKTtcbiAgfVxufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucmVjdXJzZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSwgaXNMYXN0KSB7XG5cbiAgdmFyIHVzZU1vdmVPcmlnaW5IZXJlID0gZGVsdGEgJiYgbW92ZWRGcm9tO1xuICB2YXIgbGVmdFZhbHVlID0gdXNlTW92ZU9yaWdpbkhlcmUgPyBtb3ZlZEZyb20udmFsdWUgOiBsZWZ0O1xuXG4gIGlmICh0eXBlb2YgZGVsdGEgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciB0eXBlID0gdGhpcy5nZXREZWx0YVR5cGUoZGVsdGEsIG1vdmVkRnJvbSk7XG4gIHZhciBub2RlVHlwZSA9IHR5cGUgPT09ICdub2RlJyA/IChkZWx0YS5fdCA9PT0gJ2EnID8gJ2FycmF5JyA6ICdvYmplY3QnKSA6ICcnO1xuXG4gIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMubm9kZUJlZ2luKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUsIGlzTGFzdCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yb290QmVnaW4oY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpO1xuICB9XG5cbiAgdmFyIHR5cGVGb3JtYXR0dGVyO1xuICB0cnkge1xuICAgIHR5cGVGb3JtYXR0dGVyID0gdGhpc1snZm9ybWF0XycgKyB0eXBlXSB8fCB0aGlzLnR5cGVGb3JtYXR0dGVyTm90Rm91bmQoY29udGV4dCwgdHlwZSk7XG4gICAgdHlwZUZvcm1hdHR0ZXIuY2FsbCh0aGlzLCBjb250ZXh0LCBkZWx0YSwgbGVmdFZhbHVlLCBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRoaXMudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlcihjb250ZXh0LCBlcnIsIGRlbHRhLCBsZWZ0VmFsdWUsIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tKTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLm5vZGVFbmQoY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSwgaXNMYXN0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJvb3RFbmQoY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpO1xuICB9XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXREZWx0YUNoaWxkcmVuID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLmZvckVhY2hEZWx0YUtleShkZWx0YSwgbGVmdCwgZnVuY3Rpb24oa2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20sIGlzTGFzdCkge1xuICAgIHNlbGYucmVjdXJzZShjb250ZXh0LCBkZWx0YVtrZXldLCBsZWZ0ID8gbGVmdFtsZWZ0S2V5XSA6IHVuZGVmaW5lZCxcbiAgICAgIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tLCBpc0xhc3QpO1xuICB9KTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvckVhY2hEZWx0YUtleSA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBmbikge1xuICB2YXIga2V5cyA9IGdldE9iamVjdEtleXMoZGVsdGEpO1xuICB2YXIgYXJyYXlLZXlzID0gZGVsdGEuX3QgPT09ICdhJztcbiAgdmFyIG1vdmVEZXN0aW5hdGlvbnMgPSB7fTtcbiAgdmFyIG5hbWU7XG4gIGlmICh0eXBlb2YgbGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmb3IgKG5hbWUgaW4gbGVmdCkge1xuICAgICAgaWYgKHR5cGVvZiBkZWx0YVtuYW1lXSA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgKCghYXJyYXlLZXlzKSB8fCB0eXBlb2YgZGVsdGFbJ18nICsgbmFtZV0gPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICBrZXlzLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGxvb2sgZm9yIG1vdmUgZGVzdGluYXRpb25zXG4gIGZvciAobmFtZSBpbiBkZWx0YSkge1xuICAgIHZhciB2YWx1ZSA9IGRlbHRhW25hbWVdO1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZVsyXSA9PT0gMykge1xuICAgICAgbW92ZURlc3RpbmF0aW9uc1t2YWx1ZVsxXS50b1N0cmluZygpXSA9IHtcbiAgICAgICAga2V5OiBuYW1lLFxuICAgICAgICB2YWx1ZTogbGVmdCAmJiBsZWZ0W3BhcnNlSW50KG5hbWUuc3Vic3RyKDEpKV1cbiAgICAgIH07XG4gICAgICBpZiAodGhpcy5pbmNsdWRlTW92ZURlc3RpbmF0aW9ucyAhPT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcpICYmXG4gICAgICAgICAgKHR5cGVvZiBkZWx0YVt2YWx1ZVsxXV0gPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgIGtleXMucHVzaCh2YWx1ZVsxXS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoYXJyYXlLZXlzKSB7XG4gICAga2V5cy5zb3J0KGFycmF5S2V5Q29tcGFyZXIpO1xuICB9IGVsc2Uge1xuICAgIGtleXMuc29ydCgpO1xuICB9XG4gIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgIGlmIChhcnJheUtleXMgJiYga2V5ID09PSAnX3QnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdmFyIGxlZnRLZXkgPSBhcnJheUtleXMgP1xuICAgICAgKHR5cGVvZiBrZXkgPT09ICdudW1iZXInID8ga2V5IDogcGFyc2VJbnQodHJpbVVuZGVyc2NvcmUoa2V5KSwgMTApKSA6XG4gICAgICBrZXk7XG4gICAgdmFyIGlzTGFzdCA9IChpbmRleCA9PT0gbGVuZ3RoIC0gMSk7XG4gICAgZm4oa2V5LCBsZWZ0S2V5LCBtb3ZlRGVzdGluYXRpb25zW2xlZnRLZXldLCBpc0xhc3QpO1xuICB9XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5nZXREZWx0YVR5cGUgPSBmdW5jdGlvbihkZWx0YSwgbW92ZWRGcm9tKSB7XG4gIGlmICh0eXBlb2YgZGVsdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb3ZlZEZyb20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gJ21vdmVkZXN0aW5hdGlvbic7XG4gICAgfVxuICAgIHJldHVybiAndW5jaGFuZ2VkJztcbiAgfVxuICBpZiAoaXNBcnJheShkZWx0YSkpIHtcbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gJ2FkZGVkJztcbiAgICB9XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0dXJuICdtb2RpZmllZCc7XG4gICAgfVxuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDMgJiYgZGVsdGFbMl0gPT09IDApIHtcbiAgICAgIHJldHVybiAnZGVsZXRlZCc7XG4gICAgfVxuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDMgJiYgZGVsdGFbMl0gPT09IDIpIHtcbiAgICAgIHJldHVybiAndGV4dGRpZmYnO1xuICAgIH1cbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAzICYmIGRlbHRhWzJdID09PSAzKSB7XG4gICAgICByZXR1cm4gJ21vdmVkJztcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlbHRhID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiAnbm9kZSc7XG4gIH1cbiAgcmV0dXJuICd1bmtub3duJztcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnBhcnNlVGV4dERpZmYgPSBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIHZhciBsaW5lcyA9IHZhbHVlLnNwbGl0KCdcXG5AQCAnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgIHZhciBsaW5lT3V0cHV0ID0ge1xuICAgICAgcGllY2VzOiBbXVxuICAgIH07XG4gICAgdmFyIGxvY2F0aW9uID0gL14oPzpAQCApP1stK10/KFxcZCspLChcXGQrKS8uZXhlYyhsaW5lKS5zbGljZSgxKTtcbiAgICBsaW5lT3V0cHV0LmxvY2F0aW9uID0ge1xuICAgICAgbGluZTogbG9jYXRpb25bMF0sXG4gICAgICBjaHI6IGxvY2F0aW9uWzFdXG4gICAgfTtcbiAgICB2YXIgcGllY2VzID0gbGluZS5zcGxpdCgnXFxuJykuc2xpY2UoMSk7XG4gICAgZm9yICh2YXIgcGllY2VJbmRleCA9IDAsIHBpZWNlc0xlbmd0aCA9IHBpZWNlcy5sZW5ndGg7IHBpZWNlSW5kZXggPCBwaWVjZXNMZW5ndGg7IHBpZWNlSW5kZXgrKykge1xuICAgICAgdmFyIHBpZWNlID0gcGllY2VzW3BpZWNlSW5kZXhdO1xuICAgICAgaWYgKCFwaWVjZS5sZW5ndGgpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgcGllY2VPdXRwdXQgPSB7XG4gICAgICAgIHR5cGU6ICdjb250ZXh0J1xuICAgICAgfTtcbiAgICAgIGlmIChwaWVjZS5zdWJzdHIoMCwgMSkgPT09ICcrJykge1xuICAgICAgICBwaWVjZU91dHB1dC50eXBlID0gJ2FkZGVkJztcbiAgICAgIH0gZWxzZSBpZiAocGllY2Uuc3Vic3RyKDAsIDEpID09PSAnLScpIHtcbiAgICAgICAgcGllY2VPdXRwdXQudHlwZSA9ICdkZWxldGVkJztcbiAgICAgIH1cbiAgICAgIHBpZWNlT3V0cHV0LnRleHQgPSBwaWVjZS5zbGljZSgxKTtcbiAgICAgIGxpbmVPdXRwdXQucGllY2VzLnB1c2gocGllY2VPdXRwdXQpO1xuICAgIH1cbiAgICBvdXRwdXQucHVzaChsaW5lT3V0cHV0KTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0cy5CYXNlRm9ybWF0dGVyID0gQmFzZUZvcm1hdHRlcjtcbiIsInZhciBiYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgQmFzZUZvcm1hdHRlciA9IGJhc2UuQmFzZUZvcm1hdHRlcjtcblxudmFyIEh0bWxGb3JtYXR0ZXIgPSBmdW5jdGlvbiBIdG1sRm9ybWF0dGVyKCkge307XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlID0gbmV3IEJhc2VGb3JtYXR0ZXIoKTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICBjb250ZXh0Lm91dCgnPHByZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZXJyb3JcIj4nICsgZXJyICsgJzwvcHJlPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VmFsdWUgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICBjb250ZXh0Lm91dCgnPHByZT4nICsgSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpICsgJzwvcHJlPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VGV4dERpZmZTdHJpbmcgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICB2YXIgbGluZXMgPSB0aGlzLnBhcnNlVGV4dERpZmYodmFsdWUpO1xuICBjb250ZXh0Lm91dCgnPHVsIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZlwiPicpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgY29udGV4dC5vdXQoJzxsaT4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1sb2NhdGlvblwiPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lLW51bWJlclwiPicgK1xuICAgICAgbGluZS5sb2NhdGlvbi5saW5lICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWNoYXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24uY2hyICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZVwiPicpO1xuICAgIHZhciBwaWVjZXMgPSBsaW5lLnBpZWNlcztcbiAgICBmb3IgKHZhciBwaWVjZUluZGV4ID0gMCwgcGllY2VzTGVuZ3RoID0gcGllY2VzLmxlbmd0aDsgcGllY2VJbmRleCA8IHBpZWNlc0xlbmd0aDsgcGllY2VJbmRleCsrKSB7XG4gICAgICB2YXIgcGllY2UgPSBwaWVjZXNbcGllY2VJbmRleF07XG4gICAgICBjb250ZXh0Lm91dCgnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLScgKyBwaWVjZS50eXBlICsgJ1wiPicgK1xuICAgICAgICBwaWVjZS50ZXh0ICsgJzwvc3Bhbj4nKTtcbiAgICB9XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PjwvbGk+Jyk7XG4gIH1cbiAgY29udGV4dC5vdXQoJzwvdWw+Jyk7XG59O1xuXG52YXIgYWRqdXN0QXJyb3dzID0gZnVuY3Rpb24ganNvbmRpZmZwYXRjaEh0bWxGb3JtYXR0ZXJBZGp1c3RBcnJvd3Mobm9kZSkge1xuICBub2RlID0gbm9kZSB8fCBkb2N1bWVudDtcbiAgdmFyIGdldEVsZW1lbnRUZXh0ID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0O1xuICB9O1xuICB2YXIgZWFjaEJ5UXVlcnkgPSBmdW5jdGlvbihlbCwgcXVlcnksIGZuKSB7XG4gICAgdmFyIGVsZW1zID0gZWwucXVlcnlTZWxlY3RvckFsbChxdWVyeSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuKGVsZW1zW2ldKTtcbiAgICB9XG4gIH07XG4gIHZhciBlYWNoQ2hpbGRyZW4gPSBmdW5jdGlvbihlbCwgZm4pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4oZWwuY2hpbGRyZW5baV0sIGkpO1xuICAgIH1cbiAgfTtcbiAgZWFjaEJ5UXVlcnkobm9kZSwgJy5qc29uZGlmZnBhdGNoLWFycm93JywgZnVuY3Rpb24oYXJyb3cpIHtcbiAgICB2YXIgYXJyb3dQYXJlbnQgPSBhcnJvdy5wYXJlbnROb2RlO1xuICAgIHZhciBzdmcgPSBhcnJvdy5jaGlsZHJlblswXSxcbiAgICAgIHBhdGggPSBzdmcuY2hpbGRyZW5bMV07XG4gICAgc3ZnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gZ2V0RWxlbWVudFRleHQoYXJyb3dQYXJlbnQucXVlcnlTZWxlY3RvcignLmpzb25kaWZmcGF0Y2gtbW92ZWQtZGVzdGluYXRpb24nKSk7XG4gICAgdmFyIGNvbnRhaW5lciA9IGFycm93UGFyZW50LnBhcmVudE5vZGU7XG4gICAgdmFyIGRlc3RpbmF0aW9uRWxlbTtcbiAgICBlYWNoQ2hpbGRyZW4oY29udGFpbmVyLCBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSA9PT0gZGVzdGluYXRpb24pIHtcbiAgICAgICAgZGVzdGluYXRpb25FbGVtID0gY2hpbGQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFkZXN0aW5hdGlvbkVsZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHZhciBkaXN0YW5jZSA9IGRlc3RpbmF0aW9uRWxlbS5vZmZzZXRUb3AgLSBhcnJvd1BhcmVudC5vZmZzZXRUb3A7XG4gICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBNYXRoLmFicyhkaXN0YW5jZSkgKyA2KTtcbiAgICAgIGFycm93LnN0eWxlLnRvcCA9ICgtOCArIChkaXN0YW5jZSA+IDAgPyAwIDogZGlzdGFuY2UpKSArICdweCc7XG4gICAgICB2YXIgY3VydmUgPSBkaXN0YW5jZSA+IDAgP1xuICAgICAgICAnTTMwLDAgUS0xMCwnICsgTWF0aC5yb3VuZChkaXN0YW5jZSAvIDIpICsgJyAyNiwnICsgKGRpc3RhbmNlIC0gNCkgOlxuICAgICAgICAnTTMwLCcgKyAoLWRpc3RhbmNlKSArICcgUS0xMCwnICsgTWF0aC5yb3VuZCgtZGlzdGFuY2UgLyAyKSArICcgMjYsNCc7XG4gICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIGN1cnZlKTtcbiAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKSB7XG4gIHZhciBub2RlQ2xhc3MgPSAnanNvbmRpZmZwYXRjaC0nICsgdHlwZSArXG4gICAgKG5vZGVUeXBlID8gJyBqc29uZGlmZnBhdGNoLWNoaWxkLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgOiAnJyk7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1kZWx0YSAnICsgbm9kZUNsYXNzICsgJ1wiPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEVuZCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicgKyAoY29udGV4dC5oYXNBcnJvd3MgP1xuICAgICgnPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+c2V0VGltZW91dCgnICtcbiAgICAgIGFkanVzdEFycm93cy50b1N0cmluZygpICtcbiAgICAgICcsMTApOzwvc2NyaXB0PicpIDogJycpKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUpIHtcbiAgdmFyIG5vZGVDbGFzcyA9ICdqc29uZGlmZnBhdGNoLScgKyB0eXBlICtcbiAgICAobm9kZVR5cGUgPyAnIGpzb25kaWZmcGF0Y2gtY2hpbGQtbm9kZS10eXBlLScgKyBub2RlVHlwZSA6ICcnKTtcbiAgY29udGV4dC5vdXQoJzxsaSBjbGFzcz1cIicgKyBub2RlQ2xhc3MgKyAnXCIgZGF0YS1rZXk9XCInICsgbGVmdEtleSArICdcIj4nICtcbiAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtcHJvcGVydHktbmFtZVwiPicgKyBsZWZ0S2V5ICsgJzwvZGl2PicpO1xufTtcblxuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlRW5kID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBjb250ZXh0Lm91dCgnPC9saT4nKTtcbn07XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlICovXG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF91bmNoYW5nZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICBpZiAodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGxlZnQpO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWRlc3RpbmF0aW9uID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBsZWZ0KTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X25vZGUgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAvLyByZWN1cnNlXG4gIHZhciBub2RlVHlwZSA9IChkZWx0YS5fdCA9PT0gJ2EnKSA/ICdhcnJheScgOiAnb2JqZWN0JztcbiAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtbm9kZSBqc29uZGlmZnBhdGNoLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgKyAnXCI+Jyk7XG4gIHRoaXMuZm9ybWF0RGVsdGFDaGlsZHJlbihjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG4gIGNvbnRleHQub3V0KCc8L3VsPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2FkZGVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW9kaWZpZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWUganNvbmRpZmZwYXRjaC1sZWZ0LXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+JyArXG4gICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlIGpzb25kaWZmcGF0Y2gtcmlnaHQtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVsxXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9kZWxldGVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVswXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj48ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1tb3ZlZC1kZXN0aW5hdGlvblwiPicgKyBkZWx0YVsxXSArICc8L2Rpdj4nKTtcblxuICAvLyBkcmF3IGFuIFNWRyBhcnJvdyBmcm9tIGhlcmUgdG8gbW92ZSBkZXN0aW5hdGlvblxuICBjb250ZXh0Lm91dChcbiAgICAvKmpzaGludCBtdWx0aXN0cjogdHJ1ZSAqL1xuICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1hcnJvd1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyBsZWZ0OiAtMzRweDtcIj5cXFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCI2MFwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBkaXNwbGF5OiBub25lO1wiPlxcXG4gICAgICAgIDxkZWZzPlxcXG4gICAgICAgICAgICA8bWFya2VyIGlkPVwibWFya2VyQXJyb3dcIiBtYXJrZXJXaWR0aD1cIjhcIiBtYXJrZXJIZWlnaHQ9XCI4XCIgcmVmeD1cIjJcIiByZWZ5PVwiNFwiXFxcbiAgICAgICAgICAgICAgICAgICBvcmllbnQ9XCJhdXRvXCIgbWFya2VyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxcXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xLDEgTDEsNyBMNyw0IEwxLDFcIiBzdHlsZT1cImZpbGw6ICMzMzk7XCIgLz5cXFxuICAgICAgICAgICAgPC9tYXJrZXI+XFxcbiAgICAgICAgPC9kZWZzPlxcXG4gICAgICAgIDxwYXRoIGQ9XCJNMzAsMCBRLTEwLDI1IDI2LDUwXCIgc3R5bGU9XCJzdHJva2U6ICM4OGY7IHN0cm9rZS13aWR0aDogMnB4OyBmaWxsOiBub25lO1xcXG4gICAgICAgIHN0cm9rZS1vcGFjaXR5OiAwLjU7IG1hcmtlci1lbmQ6IHVybCgjbWFya2VyQXJyb3cpO1wiPjwvcGF0aD5cXFxuICAgICAgICA8L3N2Zz5cXFxuICAgICAgICA8L2Rpdj4nKTtcbiAgY29udGV4dC5oYXNBcnJvd3MgPSB0cnVlO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3RleHRkaWZmID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VGV4dERpZmZTdHJpbmcoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiB0cnVlICovXG5cbnZhciBzaG93VW5jaGFuZ2VkID0gZnVuY3Rpb24oc2hvdywgbm9kZSwgZGVsYXkpIHtcbiAgdmFyIGVsID0gbm9kZSB8fCBkb2N1bWVudC5ib2R5O1xuICB2YXIgcHJlZml4ID0gJ2pzb25kaWZmcGF0Y2gtdW5jaGFuZ2VkLSc7XG4gIHZhciBjbGFzc2VzID0ge1xuICAgIHNob3dpbmc6IHByZWZpeCArICdzaG93aW5nJyxcbiAgICBoaWRpbmc6IHByZWZpeCArICdoaWRpbmcnLFxuICAgIHZpc2libGU6IHByZWZpeCArICd2aXNpYmxlJyxcbiAgICBoaWRkZW46IHByZWZpeCArICdoaWRkZW4nLFxuICB9O1xuICB2YXIgbGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgaWYgKCFsaXN0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZGVsYXkpIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnNob3dpbmcpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkaW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkZGVuKTtcbiAgICBpZiAoc2hvdyA9PT0gZmFsc2UpIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMuaGlkZGVuKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzaG93ID09PSBmYWxzZSkge1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5hZGQoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIH0sIDEwKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGluZyk7XG4gICAgbGlzdC5hZGQoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGRlbik7XG4gIH1cbiAgdmFyIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICBhZGp1c3RBcnJvd3MoZWwpO1xuICB9LCAxMDApO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIGlmIChzaG93ID09PSBmYWxzZSkge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5oaWRkZW4pO1xuICAgICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkZGVuKTtcbiAgICB9XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH0sIGRlbGF5ICsgNDAwKTtcbiAgfSwgZGVsYXkpO1xufTtcblxudmFyIGhpZGVVbmNoYW5nZWQgPSBmdW5jdGlvbihub2RlLCBkZWxheSkge1xuICByZXR1cm4gc2hvd1VuY2hhbmdlZChmYWxzZSwgbm9kZSwgZGVsYXkpO1xufTtcblxuZXhwb3J0cy5IdG1sRm9ybWF0dGVyID0gSHRtbEZvcm1hdHRlcjtcblxuZXhwb3J0cy5zaG93VW5jaGFuZ2VkID0gc2hvd1VuY2hhbmdlZDtcblxuZXhwb3J0cy5oaWRlVW5jaGFuZ2VkID0gaGlkZVVuY2hhbmdlZDtcblxudmFyIGRlZmF1bHRJbnN0YW5jZTtcblxuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICBpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuICAgIGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBIdG1sRm9ybWF0dGVyKCk7XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5mb3JtYXQoZGVsdGEsIGxlZnQpO1xufTtcbiIsInZhciBlbnZpcm9ubWVudCA9IHJlcXVpcmUoJy4uL2Vudmlyb25tZW50Jyk7XG5cbmV4cG9ydHMuYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xuZXhwb3J0cy5odG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5leHBvcnRzLmFubm90YXRlZCA9IHJlcXVpcmUoJy4vYW5ub3RhdGVkJyk7XG5cbmlmICghZW52aXJvbm1lbnQuaXNCcm93c2VyKSB7XG4gIHZhciBjb25zb2xlTW9kdWxlTmFtZSA9ICcuL2NvbnNvbGUnO1xuICBleHBvcnRzLmNvbnNvbGUgPSByZXF1aXJlKGNvbnNvbGVNb2R1bGVOYW1lKTtcbn1cbiJdfQ==
