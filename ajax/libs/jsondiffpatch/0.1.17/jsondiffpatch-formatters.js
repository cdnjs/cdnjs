!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),(f.jsondiffpatch||(f.jsondiffpatch={})).formatters=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

module.exports = require('./formatters');

},{"./formatters":6}],2:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

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
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

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
    typeFormattter.call(this, context, delta, left, key, leftKey, movedFrom);
  } catch (err) {
    this.typeFormattterErrorFormatter(context, err, delta, left, key, leftKey, movedFrom);
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
      moveDestinations[value[1].toString()] = value[0];
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
(function (process){

exports.html = require('./html');
exports.annotated = require('./annotated');

if (!process.browser) {
	var consoleModuleName = './console';
	exports.console = require(consoleModuleName);
}

}).call(this,require('_process'))
},{"./annotated":3,"./html":5,"_process":2}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLWZvcm1hdHRlcnMuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvbm9kZV9tb2R1bGVzL2ZpYmVyZ2xhc3Mvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZm9ybWF0dGVycy9hbm5vdGF0ZWQuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2Zvcm1hdHRlcnMvYmFzZS5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZm9ybWF0dGVycy9odG1sLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9mb3JtYXR0ZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Zvcm1hdHRlcnMnKTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW5TZXRJbW1lZGlhdGUgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJ1xuICAgICYmIHdpbmRvdy5wb3N0TWVzc2FnZSAmJiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lclxuICAgIDtcblxuICAgIGlmIChjYW5TZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChmKSB7IHJldHVybiB3aW5kb3cuc2V0SW1tZWRpYXRlKGYpIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KSgpO1xuXG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn1cblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuIiwidmFyIGJhc2UgPSByZXF1aXJlKCcuL2Jhc2UnKTtcbnZhciBCYXNlRm9ybWF0dGVyID0gYmFzZS5CYXNlRm9ybWF0dGVyO1xuXG52YXIgQW5ub3RhdGVkRm9ybWF0dGVyID0gZnVuY3Rpb24gQW5ub3RhdGVkRm9ybWF0dGVyKCkge1xuICB0aGlzLmluY2x1ZGVNb3ZlRGVzdGluYXRpb25zID0gZmFsc2U7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlID0gbmV3IEJhc2VGb3JtYXR0ZXIoKTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucHJlcGFyZUNvbnRleHQuY2FsbCh0aGlzLCBjb250ZXh0KTtcbiAgY29udGV4dC5pbmRlbnQgPSBmdW5jdGlvbihsZXZlbHMpIHtcbiAgICB0aGlzLmluZGVudExldmVsID0gKHRoaXMuaW5kZW50TGV2ZWwgfHwgMCkgK1xuICAgICAgKHR5cGVvZiBsZXZlbHMgPT09ICd1bmRlZmluZWQnID8gMSA6IGxldmVscyk7XG4gICAgdGhpcy5pbmRlbnRQYWQgPSBuZXcgQXJyYXkodGhpcy5pbmRlbnRMZXZlbCArIDEpLmpvaW4oJyZuYnNwOyZuYnNwOycpO1xuICB9O1xuICBjb250ZXh0LnJvdyA9IGZ1bmN0aW9uKGpzb24sIGh0bWxOb3RlKSB7XG4gICAgY29udGV4dC5vdXQoJzx0cj48dGQgc3R5bGU9XCJ3aGl0ZS1zcGFjZTogbm93cmFwO1wiPicgK1xuICAgICAgJzxwcmUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWFubm90YXRlZC1pbmRlbnRcIiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9ja1wiPicpO1xuICAgIGNvbnRleHQub3V0KGNvbnRleHQuaW5kZW50UGFkKTtcbiAgICBjb250ZXh0Lm91dCgnPC9wcmU+PHByZSBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9ja1wiPicpO1xuICAgIGNvbnRleHQub3V0KGpzb24pO1xuICAgIGNvbnRleHQub3V0KCc8L3ByZT48L3RkPjx0ZCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZGVsdGEtbm90ZVwiPjxkaXY+Jyk7XG4gICAgY29udGV4dC5vdXQoaHRtbE5vdGUpO1xuICAgIGNvbnRleHQub3V0KCc8L2Rpdj48L3RkPjwvdHI+Jyk7XG4gIH07XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIgPSBmdW5jdGlvbihjb250ZXh0LCBlcnIpIHtcbiAgY29udGV4dC5yb3coJycsICc8cHJlIGNsYXNzPVwianNvbmRpZmZwYXRjaC1lcnJvclwiPicgKyBlcnIgKyAnPC9wcmU+Jyk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFRleHREaWZmU3RyaW5nID0gZnVuY3Rpb24oY29udGV4dCwgdmFsdWUpIHtcbiAgdmFyIGxpbmVzID0gdGhpcy5wYXJzZVRleHREaWZmKHZhbHVlKTtcbiAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmZcIj4nKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgIGNvbnRleHQub3V0KCc8bGk+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbG9jYXRpb25cIj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZS1udW1iZXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24ubGluZSArXG4gICAgICAnPC9zcGFuPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1jaGFyXCI+JyArXG4gICAgICBsaW5lLmxvY2F0aW9uLmNociArXG4gICAgICAnPC9zcGFuPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxpbmVcIj4nKTtcbiAgICB2YXIgcGllY2VzID0gbGluZS5waWVjZXM7XG4gICAgZm9yICh2YXIgcGllY2VJbmRleCA9IDAsIHBpZWNlc0xlbmd0aCA9IHBpZWNlcy5sZW5ndGg7IHBpZWNlSW5kZXggPCBwaWVjZXNMZW5ndGg7IHBpZWNlSW5kZXgrKykge1xuICAgICAgdmFyIHBpZWNlID0gcGllY2VzW3BpZWNlSW5kZXhdO1xuICAgICAgY29udGV4dC5vdXQoJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi0nICsgcGllY2UudHlwZSArICdcIj4nICtcbiAgICAgICAgcGllY2UudGV4dCArICc8L3NwYW4+Jyk7XG4gICAgfVxuICAgIGNvbnRleHQub3V0KCc8L2Rpdj48L2xpPicpO1xuICB9XG4gIGNvbnRleHQub3V0KCc8L3VsPicpO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5yb290QmVnaW4gPSBmdW5jdGlvbihjb250ZXh0LCB0eXBlLCBub2RlVHlwZSkge1xuICBjb250ZXh0Lm91dCgnPHRhYmxlIGNsYXNzPVwianNvbmRpZmZwYXRjaC1hbm5vdGF0ZWQtZGVsdGFcIj4nKTtcbiAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgIGNvbnRleHQucm93KCd7Jyk7XG4gICAgY29udGV4dC5pbmRlbnQoKTtcbiAgfVxuICBpZiAobm9kZVR5cGUgPT09ICdhcnJheScpIHtcbiAgICBjb250ZXh0LnJvdygnXCJfdFwiOiBcImFcIiwnLCAnQXJyYXkgZGVsdGEgKG1lbWJlciBuYW1lcyBpbmRpY2F0ZSBhcnJheSBpbmRpY2VzKScpO1xuICB9XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RFbmQgPSBmdW5jdGlvbihjb250ZXh0LCB0eXBlKSB7XG4gIGlmICh0eXBlID09PSAnbm9kZScpIHtcbiAgICBjb250ZXh0LmluZGVudCgtMSk7XG4gICAgY29udGV4dC5yb3coJ30nKTtcbiAgfVxuICBjb250ZXh0Lm91dCgnPC90YWJsZT4nKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUJlZ2luID0gZnVuY3Rpb24oY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSkge1xuICBjb250ZXh0LnJvdygnJnF1b3Q7JyArIGtleSArICcmcXVvdDs6IHsnKTtcbiAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgIGNvbnRleHQuaW5kZW50KCk7XG4gIH1cbiAgaWYgKG5vZGVUeXBlID09PSAnYXJyYXknKSB7XG4gICAgY29udGV4dC5yb3coJ1wiX3RcIjogXCJhXCIsJywgJ0FycmF5IGRlbHRhIChtZW1iZXIgbmFtZXMgaW5kaWNhdGUgYXJyYXkgaW5kaWNlcyknKTtcbiAgfVxufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlRW5kID0gZnVuY3Rpb24oY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSwgaXNMYXN0KSB7XG4gIGlmICh0eXBlID09PSAnbm9kZScpIHtcbiAgICBjb250ZXh0LmluZGVudCgtMSk7XG4gIH1cbiAgY29udGV4dC5yb3coJ30nICsgKGlzTGFzdCA/ICcnIDogJywnKSk7XG59O1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF91bmNoYW5nZWQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWRlc3RpbmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybjtcbn07XG5cblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbm9kZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gIC8vIHJlY3Vyc2VcbiAgdGhpcy5mb3JtYXREZWx0YUNoaWxkcmVuKGNvbnRleHQsIGRlbHRhLCBsZWZ0KTtcbn07XG5cbnZhciB3cmFwUHJvcGVydHlOYW1lID0gZnVuY3Rpb24obmFtZSkge1xuICByZXR1cm4gJzxwcmUgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9ja1wiPiZxdW90OycgKyBuYW1lICsgJyZxdW90OzwvcHJlPic7XG59O1xuXG52YXIgZGVsdGFBbm5vdGF0aW9ucyA9IHtcbiAgYWRkZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICB2YXIgZm9ybWF0TGVnZW5kID0gJyA8cHJlPihbbmV3VmFsdWVdKTwvcHJlPic7XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICduZXcgdmFsdWUnICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJ2luc2VydCBhdCBpbmRleCAnICsgbGVmdEtleSArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgcmV0dXJuICdhZGQgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSkgKyBmb3JtYXRMZWdlbmQ7XG4gIH0sXG4gIG1vZGlmaWVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgdmFyIGZvcm1hdExlZ2VuZCA9ICcgPHByZT4oW3ByZXZpb3VzVmFsdWUsIG5ld1ZhbHVlXSk8L3ByZT4nO1xuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnbW9kaWZ5IHZhbHVlJyArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuICdtb2RpZnkgYXQgaW5kZXggJyArIGxlZnRLZXkgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIHJldHVybiAnbW9kaWZ5IHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpICsgZm9ybWF0TGVnZW5kO1xuICB9LFxuICBkZWxldGVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgdmFyIGZvcm1hdExlZ2VuZCA9ICcgPHByZT4oW3ByZXZpb3VzVmFsdWUsIDAsIDBdKTwvcHJlPic7XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICdkZWxldGUgdmFsdWUnICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJ3JlbW92ZSBpbmRleCAnICsgbGVmdEtleSArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgcmV0dXJuICdkZWxldGUgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSkgKyBmb3JtYXRMZWdlbmQ7XG4gIH0sXG4gIG1vdmVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgcmV0dXJuICdtb3ZlIGZyb20gPHNwYW4gdGl0bGU9XCIocG9zaXRpb24gdG8gcmVtb3ZlIGF0IG9yaWdpbmFsIHN0YXRlKVwiPmluZGV4ICcgK1xuICAgICAgbGVmdEtleSArICc8L3NwYW4+IHRvICcgK1xuICAgICAgJzxzcGFuIHRpdGxlPVwiKHBvc2l0aW9uIHRvIGluc2VydCBhdCBmaW5hbCBzdGF0ZSlcIj5pbmRleCAnICtcbiAgICAgIGRlbHRhWzFdICsgJzwvc3Bhbj4nO1xuICB9LFxuICB0ZXh0ZGlmZjogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHZhciBsb2NhdGlvbiA9ICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpID9cbiAgICAgICcnIDogKFxuICAgICAgICAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSA/XG4gICAgICAgICcgYXQgaW5kZXggJyArIGxlZnRLZXkgOlxuICAgICAgICAnIGF0IHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpXG4gICAgICApO1xuICAgIHJldHVybiAndGV4dCBkaWZmJyArIGxvY2F0aW9uICsgJywgZm9ybWF0IGlzICcgK1xuICAgICAgJzxhIGhyZWY9XCJodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1kaWZmLW1hdGNoLXBhdGNoL3dpa2kvVW5pZGlmZlwiPicgK1xuICAgICAgJ2EgdmFyaWF0aW9uIG9mIFVuaWRpZmY8L2E+JztcbiAgfVxufTtcblxudmFyIGZvcm1hdEFueUNoYW5nZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIHZhciBkZWx0YVR5cGUgPSB0aGlzLmdldERlbHRhVHlwZShkZWx0YSk7XG4gIHZhciBhbm5vdGF0b3IgPSBkZWx0YUFubm90YXRpb25zW2RlbHRhVHlwZV07XG4gIHZhciBodG1sTm90ZSA9IGFubm90YXRvciAmJiBhbm5vdGF0b3IuYXBwbHkoYW5ub3RhdG9yLFxuICAgIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KGRlbHRhLCBudWxsLCAyKTtcbiAgaWYgKGRlbHRhVHlwZSA9PT0gJ3RleHRkaWZmJykge1xuICAgIC8vIHNwbGl0IHRleHQgZGlmZnMgbGluZXNcbiAgICBqc29uID0ganNvbi5zcGxpdCgnXFxcXG4nKS5qb2luKCdcXFxcblwiK1xcbiAgIFwiJyk7XG4gIH1cbiAgY29udGV4dC5pbmRlbnQoKTtcbiAgY29udGV4dC5yb3coanNvbiwgaHRtbE5vdGUpO1xuICBjb250ZXh0LmluZGVudCgtMSk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9hZGRlZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vZGlmaWVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfZGVsZXRlZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdGV4dGRpZmYgPSBmb3JtYXRBbnlDaGFuZ2U7XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IHRydWUgKi9cblxuZXhwb3J0cy5Bbm5vdGF0ZWRGb3JtYXR0ZXIgPSBBbm5vdGF0ZWRGb3JtYXR0ZXI7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZGVsdGEsIGxlZnQpIHtcbiAgaWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcbiAgICBkZWZhdWx0SW5zdGFuY2UgPSBuZXcgQW5ub3RhdGVkRm9ybWF0dGVyKCk7XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5mb3JtYXQoZGVsdGEsIGxlZnQpO1xufTtcbiIsInZhciBpc0FycmF5ID0gKHR5cGVvZiBBcnJheS5pc0FycmF5ID09PSAnZnVuY3Rpb24nKSA/XG4gIC8vIHVzZSBuYXRpdmUgZnVuY3Rpb25cbiAgQXJyYXkuaXNBcnJheSA6XG4gIC8vIHVzZSBpbnN0YW5jZW9mIG9wZXJhdG9yXG4gIGZ1bmN0aW9uKGEpIHtcbiAgICByZXR1cm4gYSBpbnN0YW5jZW9mIEFycmF5O1xuICB9O1xuXG52YXIgZ2V0T2JqZWN0S2V5cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyA/XG4gIGZ1bmN0aW9uKG9iaikge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopO1xuICB9IDogZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIG5hbWVzID0gW107XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqKSB7XG4gICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICBuYW1lcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzO1xuICB9O1xuXG52YXIgdHJpbVVuZGVyc2NvcmUgPSBmdW5jdGlvbihzdHIpIHtcbiAgaWYgKHN0ci5zdWJzdHIoMCwgMSkgPT09ICdfJykge1xuICAgIHJldHVybiBzdHIuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIHN0cjtcbn07XG5cbnZhciBhcnJheUtleVRvU29ydE51bWJlciA9IGZ1bmN0aW9uKGtleSkge1xuICBpZiAoa2V5ID09PSAnX3QnKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2Uge1xuICAgIGlmIChrZXkuc3Vic3RyKDAsIDEpID09PSAnXycpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChrZXkuc2xpY2UoMSksIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KGtleSwgMTApICsgMC4xO1xuICAgIH1cbiAgfVxufTtcblxudmFyIGFycmF5S2V5Q29tcGFyZXIgPSBmdW5jdGlvbihrZXkxLCBrZXkyKSB7XG4gIHJldHVybiBhcnJheUtleVRvU29ydE51bWJlcihrZXkxKSAtIGFycmF5S2V5VG9Tb3J0TnVtYmVyKGtleTIpO1xufTtcblxudmFyIEJhc2VGb3JtYXR0ZXIgPSBmdW5jdGlvbiBCYXNlRm9ybWF0dGVyKCkge307XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0KSB7XG4gIHZhciBjb250ZXh0ID0ge307XG4gIHRoaXMucHJlcGFyZUNvbnRleHQoY29udGV4dCk7XG4gIHRoaXMucmVjdXJzZShjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG4gIHJldHVybiB0aGlzLmZpbmFsaXplKGNvbnRleHQpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucHJlcGFyZUNvbnRleHQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGNvbnRleHQuYnVmZmVyID0gW107XG4gIGNvbnRleHQub3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5idWZmZXIucHVzaC5hcHBseSh0aGlzLmJ1ZmZlciwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyTm90Rm91bmQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YVR5cGUpIHtcbiAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZm9ybWF0IGRlbHRhIHR5cGU6ICcgKyBkZWx0YVR5cGUpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICByZXR1cm4gZXJyLnRvU3RyaW5nKCk7XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5maW5hbGl6ZSA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgaWYgKGlzQXJyYXkoY29udGV4dC5idWZmZXIpKSB7XG4gICAgcmV0dXJuIGNvbnRleHQuYnVmZmVyLmpvaW4oJycpO1xuICB9XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5yZWN1cnNlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tLCBpc0xhc3QpIHtcbiAgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIHZhciB0eXBlID0gdGhpcy5nZXREZWx0YVR5cGUoZGVsdGEsIG1vdmVkRnJvbSk7XG4gIHZhciBub2RlVHlwZSA9IHR5cGUgPT09ICdub2RlJyA/IChkZWx0YS5fdCA9PT0gJ2EnID8gJ2FycmF5JyA6ICdvYmplY3QnKSA6ICcnO1xuXG4gIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMubm9kZUJlZ2luKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUsIGlzTGFzdCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yb290QmVnaW4oY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpO1xuICB9XG5cbiAgdmFyIHR5cGVGb3JtYXR0dGVyO1xuICB0cnkge1xuICAgIHR5cGVGb3JtYXR0dGVyID0gdGhpc1snZm9ybWF0XycgKyB0eXBlXSB8fCB0aGlzLnR5cGVGb3JtYXR0dGVyTm90Rm91bmQoY29udGV4dCwgdHlwZSk7XG4gICAgdHlwZUZvcm1hdHR0ZXIuY2FsbCh0aGlzLCBjb250ZXh0LCBkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICB0aGlzLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIoY29udGV4dCwgZXJyLCBkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS5lcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIuc3RhY2spO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMubm9kZUVuZChjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlLCBpc0xhc3QpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucm9vdEVuZChjb250ZXh0LCB0eXBlLCBub2RlVHlwZSk7XG4gIH1cbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdERlbHRhQ2hpbGRyZW4gPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuZm9yRWFjaERlbHRhS2V5KGRlbHRhLCBsZWZ0LCBmdW5jdGlvbihrZXksIGxlZnRLZXksIG1vdmVkRnJvbSwgaXNMYXN0KSB7XG4gICAgc2VsZi5yZWN1cnNlKGNvbnRleHQsIGRlbHRhW2tleV0sIGxlZnQgPyBsZWZ0W2xlZnRLZXldIDogdW5kZWZpbmVkLFxuICAgICAga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20sIGlzTGFzdCk7XG4gIH0pO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZm9yRWFjaERlbHRhS2V5ID0gZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGZuKSB7XG4gIHZhciBrZXlzID0gZ2V0T2JqZWN0S2V5cyhkZWx0YSk7XG4gIHZhciBhcnJheUtleXMgPSBkZWx0YS5fdCA9PT0gJ2EnO1xuICB2YXIgbW92ZURlc3RpbmF0aW9ucyA9IHt9O1xuICB2YXIgbmFtZTtcbiAgaWYgKHR5cGVvZiBsZWZ0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGZvciAobmFtZSBpbiBsZWZ0KSB7XG4gICAgICBpZiAodHlwZW9mIGRlbHRhW25hbWVdID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAoKCFhcnJheUtleXMpIHx8IHR5cGVvZiBkZWx0YVsnXycgKyBuYW1lXSA9PT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgIGtleXMucHVzaChuYW1lKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gbG9vayBmb3IgbW92ZSBkZXN0aW5hdGlvbnNcbiAgZm9yIChuYW1lIGluIGRlbHRhKSB7XG4gICAgdmFyIHZhbHVlID0gZGVsdGFbbmFtZV07XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlWzJdID09PSAzKSB7XG4gICAgICBtb3ZlRGVzdGluYXRpb25zW3ZhbHVlWzFdLnRvU3RyaW5nKCldID0gdmFsdWVbMF07XG4gICAgICBpZiAodGhpcy5pbmNsdWRlTW92ZURlc3RpbmF0aW9ucyAhPT0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCh0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcpICYmXG4gICAgICAgICAgKHR5cGVvZiBkZWx0YVt2YWx1ZVsxXV0gPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgIGtleXMucHVzaCh2YWx1ZVsxXS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoYXJyYXlLZXlzKSB7XG4gICAga2V5cy5zb3J0KGFycmF5S2V5Q29tcGFyZXIpO1xuICB9IGVsc2Uge1xuICAgIGtleXMuc29ydCgpO1xuICB9XG4gIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0ga2V5cy5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgIGlmIChhcnJheUtleXMgJiYga2V5ID09PSAnX3QnKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgdmFyIGxlZnRLZXkgPSBhcnJheUtleXMgP1xuICAgICAgKHR5cGVvZiBrZXkgPT09ICdudW1iZXInID8ga2V5IDogcGFyc2VJbnQodHJpbVVuZGVyc2NvcmUoa2V5KSwgMTApKSA6XG4gICAgICBrZXk7XG4gICAgdmFyIGlzTGFzdCA9IChpbmRleCA9PT0gbGVuZ3RoIC0gMSk7XG4gICAgZm4oa2V5LCBsZWZ0S2V5LCBtb3ZlRGVzdGluYXRpb25zW2xlZnRLZXldLCBpc0xhc3QpO1xuICB9XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5nZXREZWx0YVR5cGUgPSBmdW5jdGlvbihkZWx0YSwgbW92ZWRGcm9tKSB7XG4gIGlmICh0eXBlb2YgZGVsdGEgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBtb3ZlZEZyb20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gJ21vdmVkZXN0aW5hdGlvbic7XG4gICAgfVxuICAgIHJldHVybiAndW5jaGFuZ2VkJztcbiAgfVxuICBpZiAoaXNBcnJheShkZWx0YSkpIHtcbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gJ2FkZGVkJztcbiAgICB9XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMikge1xuICAgICAgcmV0dXJuICdtb2RpZmllZCc7XG4gICAgfVxuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDMgJiYgZGVsdGFbMl0gPT09IDApIHtcbiAgICAgIHJldHVybiAnZGVsZXRlZCc7XG4gICAgfVxuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDMgJiYgZGVsdGFbMl0gPT09IDIpIHtcbiAgICAgIHJldHVybiAndGV4dGRpZmYnO1xuICAgIH1cbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAzICYmIGRlbHRhWzJdID09PSAzKSB7XG4gICAgICByZXR1cm4gJ21vdmVkJztcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlbHRhID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiAnbm9kZSc7XG4gIH1cbiAgcmV0dXJuICd1bmtub3duJztcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnBhcnNlVGV4dERpZmYgPSBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgb3V0cHV0ID0gW107XG4gIHZhciBsaW5lcyA9IHZhbHVlLnNwbGl0KCdcXG5AQCAnKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgIHZhciBsaW5lT3V0cHV0ID0ge1xuICAgICAgcGllY2VzOiBbXVxuICAgIH07XG4gICAgdmFyIGxvY2F0aW9uID0gL14oPzpAQCApP1stK10/KFxcZCspLChcXGQrKS8uZXhlYyhsaW5lKS5zbGljZSgxKTtcbiAgICBsaW5lT3V0cHV0LmxvY2F0aW9uID0ge1xuICAgICAgbGluZTogbG9jYXRpb25bMF0sXG4gICAgICBjaHI6IGxvY2F0aW9uWzFdXG4gICAgfTtcbiAgICB2YXIgcGllY2VzID0gbGluZS5zcGxpdCgnXFxuJykuc2xpY2UoMSk7XG4gICAgZm9yICh2YXIgcGllY2VJbmRleCA9IDAsIHBpZWNlc0xlbmd0aCA9IHBpZWNlcy5sZW5ndGg7IHBpZWNlSW5kZXggPCBwaWVjZXNMZW5ndGg7IHBpZWNlSW5kZXgrKykge1xuICAgICAgdmFyIHBpZWNlID0gcGllY2VzW3BpZWNlSW5kZXhdO1xuICAgICAgaWYgKCFwaWVjZS5sZW5ndGgpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICB2YXIgcGllY2VPdXRwdXQgPSB7XG4gICAgICAgIHR5cGU6ICdjb250ZXh0J1xuICAgICAgfTtcbiAgICAgIGlmIChwaWVjZS5zdWJzdHIoMCwgMSkgPT09ICcrJykge1xuICAgICAgICBwaWVjZU91dHB1dC50eXBlID0gJ2FkZGVkJztcbiAgICAgIH0gZWxzZSBpZiAocGllY2Uuc3Vic3RyKDAsIDEpID09PSAnLScpIHtcbiAgICAgICAgcGllY2VPdXRwdXQudHlwZSA9ICdkZWxldGVkJztcbiAgICAgIH1cbiAgICAgIHBpZWNlT3V0cHV0LnRleHQgPSBwaWVjZS5zbGljZSgxKTtcbiAgICAgIGxpbmVPdXRwdXQucGllY2VzLnB1c2gocGllY2VPdXRwdXQpO1xuICAgIH1cbiAgICBvdXRwdXQucHVzaChsaW5lT3V0cHV0KTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufTtcblxuZXhwb3J0cy5CYXNlRm9ybWF0dGVyID0gQmFzZUZvcm1hdHRlcjtcbiIsInZhciBiYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgQmFzZUZvcm1hdHRlciA9IGJhc2UuQmFzZUZvcm1hdHRlcjtcblxudmFyIEh0bWxGb3JtYXR0ZXIgPSBmdW5jdGlvbiBIdG1sRm9ybWF0dGVyKCkge307XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlID0gbmV3IEJhc2VGb3JtYXR0ZXIoKTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICBjb250ZXh0Lm91dCgnPHByZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZXJyb3JcIj4nICsgZXJyICsgJzwvcHJlPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VmFsdWUgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICBjb250ZXh0Lm91dCgnPHByZT4nICsgSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpICsgJzwvcHJlPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VGV4dERpZmZTdHJpbmcgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICB2YXIgbGluZXMgPSB0aGlzLnBhcnNlVGV4dERpZmYodmFsdWUpO1xuICBjb250ZXh0Lm91dCgnPHVsIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZlwiPicpO1xuICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgY29udGV4dC5vdXQoJzxsaT4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1sb2NhdGlvblwiPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lLW51bWJlclwiPicgK1xuICAgICAgbGluZS5sb2NhdGlvbi5saW5lICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWNoYXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24uY2hyICtcbiAgICAgICc8L3NwYW4+JyArXG4gICAgICAnPC9kaXY+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZVwiPicpO1xuICAgIHZhciBwaWVjZXMgPSBsaW5lLnBpZWNlcztcbiAgICBmb3IgKHZhciBwaWVjZUluZGV4ID0gMCwgcGllY2VzTGVuZ3RoID0gcGllY2VzLmxlbmd0aDsgcGllY2VJbmRleCA8IHBpZWNlc0xlbmd0aDsgcGllY2VJbmRleCsrKSB7XG4gICAgICB2YXIgcGllY2UgPSBwaWVjZXNbcGllY2VJbmRleF07XG4gICAgICBjb250ZXh0Lm91dCgnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLScgKyBwaWVjZS50eXBlICsgJ1wiPicgK1xuICAgICAgICBwaWVjZS50ZXh0ICsgJzwvc3Bhbj4nKTtcbiAgICB9XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PjwvbGk+Jyk7XG4gIH1cbiAgY29udGV4dC5vdXQoJzwvdWw+Jyk7XG59O1xuXG52YXIgYWRqdXN0QXJyb3dzID0gZnVuY3Rpb24ganNvbmRpZmZwYXRjaEh0bWxGb3JtYXR0ZXJBZGp1c3RBcnJvd3Mobm9kZSkge1xuICBub2RlID0gbm9kZSB8fCBkb2N1bWVudDtcbiAgdmFyIGdldEVsZW1lbnRUZXh0ID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0O1xuICB9O1xuICB2YXIgZWFjaEJ5UXVlcnkgPSBmdW5jdGlvbihlbCwgcXVlcnksIGZuKSB7XG4gICAgdmFyIGVsZW1zID0gZWwucXVlcnlTZWxlY3RvckFsbChxdWVyeSk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuKGVsZW1zW2ldKTtcbiAgICB9XG4gIH07XG4gIHZhciBlYWNoQ2hpbGRyZW4gPSBmdW5jdGlvbihlbCwgZm4pIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4oZWwuY2hpbGRyZW5baV0sIGkpO1xuICAgIH1cbiAgfTtcbiAgZWFjaEJ5UXVlcnkobm9kZSwgJy5qc29uZGlmZnBhdGNoLWFycm93JywgZnVuY3Rpb24oYXJyb3cpIHtcbiAgICB2YXIgYXJyb3dQYXJlbnQgPSBhcnJvdy5wYXJlbnROb2RlO1xuICAgIHZhciBzdmcgPSBhcnJvdy5jaGlsZHJlblswXSxcbiAgICAgIHBhdGggPSBzdmcuY2hpbGRyZW5bMV07XG4gICAgc3ZnLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gZ2V0RWxlbWVudFRleHQoYXJyb3dQYXJlbnQucXVlcnlTZWxlY3RvcignLmpzb25kaWZmcGF0Y2gtbW92ZWQtZGVzdGluYXRpb24nKSk7XG4gICAgdmFyIGNvbnRhaW5lciA9IGFycm93UGFyZW50LnBhcmVudE5vZGU7XG4gICAgdmFyIGRlc3RpbmF0aW9uRWxlbTtcbiAgICBlYWNoQ2hpbGRyZW4oY29udGFpbmVyLCBmdW5jdGlvbihjaGlsZCkge1xuICAgICAgaWYgKGNoaWxkLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSA9PT0gZGVzdGluYXRpb24pIHtcbiAgICAgICAgZGVzdGluYXRpb25FbGVtID0gY2hpbGQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFkZXN0aW5hdGlvbkVsZW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHZhciBkaXN0YW5jZSA9IGRlc3RpbmF0aW9uRWxlbS5vZmZzZXRUb3AgLSBhcnJvd1BhcmVudC5vZmZzZXRUb3A7XG4gICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBNYXRoLmFicyhkaXN0YW5jZSkgKyA2KTtcbiAgICAgIGFycm93LnN0eWxlLnRvcCA9ICgtOCArIChkaXN0YW5jZSA+IDAgPyAwIDogZGlzdGFuY2UpKSArICdweCc7XG4gICAgICB2YXIgY3VydmUgPSBkaXN0YW5jZSA+IDAgP1xuICAgICAgICAnTTMwLDAgUS0xMCwnICsgTWF0aC5yb3VuZChkaXN0YW5jZSAvIDIpICsgJyAyNiwnICsgKGRpc3RhbmNlIC0gNCkgOlxuICAgICAgICAnTTMwLCcgKyAoLWRpc3RhbmNlKSArICcgUS0xMCwnICsgTWF0aC5yb3VuZCgtZGlzdGFuY2UgLyAyKSArICcgMjYsNCc7XG4gICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIGN1cnZlKTtcbiAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9KTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKSB7XG4gIHZhciBub2RlQ2xhc3MgPSAnanNvbmRpZmZwYXRjaC0nICsgdHlwZSArXG4gICAgKG5vZGVUeXBlID8gJyBqc29uZGlmZnBhdGNoLWNoaWxkLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgOiAnJyk7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1kZWx0YSAnICsgbm9kZUNsYXNzICsgJ1wiPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEVuZCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicgKyAoY29udGV4dC5oYXNBcnJvd3MgP1xuICAgICgnPHNjcmlwdCB0eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI+c2V0VGltZW91dCgnICtcbiAgICAgIGFkanVzdEFycm93cy50b1N0cmluZygpICtcbiAgICAgICcsMTApOzwvc2NyaXB0PicpIDogJycpKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUpIHtcbiAgdmFyIG5vZGVDbGFzcyA9ICdqc29uZGlmZnBhdGNoLScgKyB0eXBlICtcbiAgICAobm9kZVR5cGUgPyAnIGpzb25kaWZmcGF0Y2gtY2hpbGQtbm9kZS10eXBlLScgKyBub2RlVHlwZSA6ICcnKTtcbiAgY29udGV4dC5vdXQoJzxsaSBjbGFzcz1cIicgKyBub2RlQ2xhc3MgKyAnXCIgZGF0YS1rZXk9XCInICsgbGVmdEtleSArICdcIj4nICtcbiAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtcHJvcGVydHktbmFtZVwiPicgKyBsZWZ0S2V5ICsgJzwvZGl2PicpO1xufTtcblxuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlRW5kID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBjb250ZXh0Lm91dCgnPC9saT4nKTtcbn07XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlICovXG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF91bmNoYW5nZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICBpZiAodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGxlZnQpO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWRlc3RpbmF0aW9uID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBsZWZ0KTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X25vZGUgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAvLyByZWN1cnNlXG4gIHZhciBub2RlVHlwZSA9IChkZWx0YS5fdCA9PT0gJ2EnKSA/ICdhcnJheScgOiAnb2JqZWN0JztcbiAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtbm9kZSBqc29uZGlmZnBhdGNoLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgKyAnXCI+Jyk7XG4gIHRoaXMuZm9ybWF0RGVsdGFDaGlsZHJlbihjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG4gIGNvbnRleHQub3V0KCc8L3VsPicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2FkZGVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW9kaWZpZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWUganNvbmRpZmZwYXRjaC1sZWZ0LXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+JyArXG4gICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlIGpzb25kaWZmcGF0Y2gtcmlnaHQtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVsxXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9kZWxldGVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVswXSk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj48ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1tb3ZlZC1kZXN0aW5hdGlvblwiPicgKyBkZWx0YVsxXSArICc8L2Rpdj4nKTtcblxuICAvLyBkcmF3IGFuIFNWRyBhcnJvdyBmcm9tIGhlcmUgdG8gbW92ZSBkZXN0aW5hdGlvblxuICBjb250ZXh0Lm91dChcbiAgICAvKmpzaGludCBtdWx0aXN0cjogdHJ1ZSAqL1xuICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1hcnJvd1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyBsZWZ0OiAtMzRweDtcIj5cXFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCI2MFwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBkaXNwbGF5OiBub25lO1wiPlxcXG4gICAgICAgIDxkZWZzPlxcXG4gICAgICAgICAgICA8bWFya2VyIGlkPVwibWFya2VyQXJyb3dcIiBtYXJrZXJXaWR0aD1cIjhcIiBtYXJrZXJIZWlnaHQ9XCI4XCIgcmVmeD1cIjJcIiByZWZ5PVwiNFwiXFxcbiAgICAgICAgICAgICAgICAgICBvcmllbnQ9XCJhdXRvXCIgbWFya2VyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxcXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xLDEgTDEsNyBMNyw0IEwxLDFcIiBzdHlsZT1cImZpbGw6ICMzMzk7XCIgLz5cXFxuICAgICAgICAgICAgPC9tYXJrZXI+XFxcbiAgICAgICAgPC9kZWZzPlxcXG4gICAgICAgIDxwYXRoIGQ9XCJNMzAsMCBRLTEwLDI1IDI2LDUwXCIgc3R5bGU9XCJzdHJva2U6ICM4OGY7IHN0cm9rZS13aWR0aDogMnB4OyBmaWxsOiBub25lO1xcXG4gICAgICAgIHN0cm9rZS1vcGFjaXR5OiAwLjU7IG1hcmtlci1lbmQ6IHVybCgjbWFya2VyQXJyb3cpO1wiPjwvcGF0aD5cXFxuICAgICAgICA8L3N2Zz5cXFxuICAgICAgICA8L2Rpdj4nKTtcbiAgY29udGV4dC5oYXNBcnJvd3MgPSB0cnVlO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3RleHRkaWZmID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VGV4dERpZmZTdHJpbmcoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiB0cnVlICovXG5cbnZhciBzaG93VW5jaGFuZ2VkID0gZnVuY3Rpb24oc2hvdywgbm9kZSwgZGVsYXkpIHtcbiAgdmFyIGVsID0gbm9kZSB8fCBkb2N1bWVudC5ib2R5O1xuICB2YXIgcHJlZml4ID0gJ2pzb25kaWZmcGF0Y2gtdW5jaGFuZ2VkLSc7XG4gIHZhciBjbGFzc2VzID0ge1xuICAgIHNob3dpbmc6IHByZWZpeCArICdzaG93aW5nJyxcbiAgICBoaWRpbmc6IHByZWZpeCArICdoaWRpbmcnLFxuICAgIHZpc2libGU6IHByZWZpeCArICd2aXNpYmxlJyxcbiAgICBoaWRkZW46IHByZWZpeCArICdoaWRkZW4nLFxuICB9O1xuICB2YXIgbGlzdCA9IGVsLmNsYXNzTGlzdDtcbiAgaWYgKCFsaXN0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZGVsYXkpIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnNob3dpbmcpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkaW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkZGVuKTtcbiAgICBpZiAoc2hvdyA9PT0gZmFsc2UpIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMuaGlkZGVuKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzaG93ID09PSBmYWxzZSkge1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5hZGQoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIH0sIDEwKTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGluZyk7XG4gICAgbGlzdC5hZGQoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGRlbik7XG4gIH1cbiAgdmFyIGludGVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICBhZGp1c3RBcnJvd3MoZWwpO1xuICB9LCAxMDApO1xuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIGlmIChzaG93ID09PSBmYWxzZSkge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5oaWRkZW4pO1xuICAgICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5hZGQoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkZGVuKTtcbiAgICB9XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH0sIGRlbGF5ICsgNDAwKTtcbiAgfSwgZGVsYXkpO1xufTtcblxudmFyIGhpZGVVbmNoYW5nZWQgPSBmdW5jdGlvbihub2RlLCBkZWxheSkge1xuICByZXR1cm4gc2hvd1VuY2hhbmdlZChmYWxzZSwgbm9kZSwgZGVsYXkpO1xufTtcblxuZXhwb3J0cy5IdG1sRm9ybWF0dGVyID0gSHRtbEZvcm1hdHRlcjtcblxuZXhwb3J0cy5zaG93VW5jaGFuZ2VkID0gc2hvd1VuY2hhbmdlZDtcblxuZXhwb3J0cy5oaWRlVW5jaGFuZ2VkID0gaGlkZVVuY2hhbmdlZDtcblxudmFyIGRlZmF1bHRJbnN0YW5jZTtcblxuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICBpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuICAgIGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBIdG1sRm9ybWF0dGVyKCk7XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRJbnN0YW5jZS5mb3JtYXQoZGVsdGEsIGxlZnQpO1xufTtcbiIsIihmdW5jdGlvbiAocHJvY2Vzcyl7XG5cbmV4cG9ydHMuaHRtbCA9IHJlcXVpcmUoJy4vaHRtbCcpO1xuZXhwb3J0cy5hbm5vdGF0ZWQgPSByZXF1aXJlKCcuL2Fubm90YXRlZCcpO1xuXG5pZiAoIXByb2Nlc3MuYnJvd3Nlcikge1xuXHR2YXIgY29uc29sZU1vZHVsZU5hbWUgPSAnLi9jb25zb2xlJztcblx0ZXhwb3J0cy5jb25zb2xlID0gcmVxdWlyZShjb25zb2xlTW9kdWxlTmFtZSk7XG59XG5cbn0pLmNhbGwodGhpcyxyZXF1aXJlKCdfcHJvY2VzcycpKSJdfQ==
