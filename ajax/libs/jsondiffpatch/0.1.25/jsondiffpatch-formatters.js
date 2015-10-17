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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLWZvcm1hdHRlcnMuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvbm9kZV9tb2R1bGVzL2ZpYmVyZ2xhc3Mvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZm9ybWF0dGVycy9hbm5vdGF0ZWQuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2Zvcm1hdHRlcnMvYmFzZS5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZm9ybWF0dGVycy9odG1sLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9mb3JtYXR0ZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6UUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mb3JtYXR0ZXJzJyk7XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcblxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG5wcm9jZXNzLm5leHRUaWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2FuU2V0SW1tZWRpYXRlID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cuc2V0SW1tZWRpYXRlO1xuICAgIHZhciBjYW5Qb3N0ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXJcbiAgICA7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikgeyByZXR1cm4gd2luZG93LnNldEltbWVkaWF0ZShmKSB9O1xuICAgIH1cblxuICAgIGlmIChjYW5Qb3N0KSB7XG4gICAgICAgIHZhciBxdWV1ZSA9IFtdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGV2LnNvdXJjZTtcbiAgICAgICAgICAgIGlmICgoc291cmNlID09PSB3aW5kb3cgfHwgc291cmNlID09PSBudWxsKSAmJiBldi5kYXRhID09PSAncHJvY2Vzcy10aWNrJykge1xuICAgICAgICAgICAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2goZm4pO1xuICAgICAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKCdwcm9jZXNzLXRpY2snLCAnKicpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICBzZXRUaW1lb3V0KGZuLCAwKTtcbiAgICB9O1xufSkoKTtcblxucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59XG5cbi8vIFRPRE8oc2h0eWxtYW4pXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbiIsInZhciBiYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgQmFzZUZvcm1hdHRlciA9IGJhc2UuQmFzZUZvcm1hdHRlcjtcblxudmFyIEFubm90YXRlZEZvcm1hdHRlciA9IGZ1bmN0aW9uIEFubm90YXRlZEZvcm1hdHRlcigpIHtcbiAgdGhpcy5pbmNsdWRlTW92ZURlc3RpbmF0aW9ucyA9IGZhbHNlO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZSA9IG5ldyBCYXNlRm9ybWF0dGVyKCk7XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUucHJlcGFyZUNvbnRleHQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIEJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnByZXBhcmVDb250ZXh0LmNhbGwodGhpcywgY29udGV4dCk7XG4gIGNvbnRleHQuaW5kZW50ID0gZnVuY3Rpb24obGV2ZWxzKSB7XG4gICAgdGhpcy5pbmRlbnRMZXZlbCA9ICh0aGlzLmluZGVudExldmVsIHx8IDApICtcbiAgICAgICh0eXBlb2YgbGV2ZWxzID09PSAndW5kZWZpbmVkJyA/IDEgOiBsZXZlbHMpO1xuICAgIHRoaXMuaW5kZW50UGFkID0gbmV3IEFycmF5KHRoaXMuaW5kZW50TGV2ZWwgKyAxKS5qb2luKCcmbmJzcDsmbmJzcDsnKTtcbiAgfTtcbiAgY29udGV4dC5yb3cgPSBmdW5jdGlvbihqc29uLCBodG1sTm90ZSkge1xuICAgIGNvbnRleHQub3V0KCc8dHI+PHRkIHN0eWxlPVwid2hpdGUtc3BhY2U6IG5vd3JhcDtcIj4nICtcbiAgICAgICc8cHJlIGNsYXNzPVwianNvbmRpZmZwYXRjaC1hbm5vdGF0ZWQtaW5kZW50XCIgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIj4nKTtcbiAgICBjb250ZXh0Lm91dChjb250ZXh0LmluZGVudFBhZCk7XG4gICAgY29udGV4dC5vdXQoJzwvcHJlPjxwcmUgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIj4nKTtcbiAgICBjb250ZXh0Lm91dChqc29uKTtcbiAgICBjb250ZXh0Lm91dCgnPC9wcmU+PC90ZD48dGQgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWRlbHRhLW5vdGVcIj48ZGl2PicpO1xuICAgIGNvbnRleHQub3V0KGh0bWxOb3RlKTtcbiAgICBjb250ZXh0Lm91dCgnPC9kaXY+PC90ZD48L3RyPicpO1xuICB9O1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlckVycm9yRm9ybWF0dGVyID0gZnVuY3Rpb24oY29udGV4dCwgZXJyKSB7XG4gIGNvbnRleHQucm93KCcnLCAnPHByZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZXJyb3JcIj4nICsgZXJyICsgJzwvcHJlPicpO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRUZXh0RGlmZlN0cmluZyA9IGZ1bmN0aW9uKGNvbnRleHQsIHZhbHVlKSB7XG4gIHZhciBsaW5lcyA9IHRoaXMucGFyc2VUZXh0RGlmZih2YWx1ZSk7XG4gIGNvbnRleHQub3V0KCc8dWwgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmXCI+Jyk7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBjb250ZXh0Lm91dCgnPGxpPicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxvY2F0aW9uXCI+JyArXG4gICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxpbmUtbnVtYmVyXCI+JyArXG4gICAgICBsaW5lLmxvY2F0aW9uLmxpbmUgK1xuICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtY2hhclwiPicgK1xuICAgICAgbGluZS5sb2NhdGlvbi5jaHIgK1xuICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICc8L2Rpdj4nICtcbiAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lXCI+Jyk7XG4gICAgdmFyIHBpZWNlcyA9IGxpbmUucGllY2VzO1xuICAgIGZvciAodmFyIHBpZWNlSW5kZXggPSAwLCBwaWVjZXNMZW5ndGggPSBwaWVjZXMubGVuZ3RoOyBwaWVjZUluZGV4IDwgcGllY2VzTGVuZ3RoOyBwaWVjZUluZGV4KyspIHtcbiAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1twaWVjZUluZGV4XTtcbiAgICAgIGNvbnRleHQub3V0KCc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtJyArIHBpZWNlLnR5cGUgKyAnXCI+JyArXG4gICAgICAgIHBpZWNlLnRleHQgKyAnPC9zcGFuPicpO1xuICAgIH1cbiAgICBjb250ZXh0Lm91dCgnPC9kaXY+PC9saT4nKTtcbiAgfVxuICBjb250ZXh0Lm91dCgnPC91bD4nKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEJlZ2luID0gZnVuY3Rpb24oY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpIHtcbiAgY29udGV4dC5vdXQoJzx0YWJsZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtYW5ub3RhdGVkLWRlbHRhXCI+Jyk7XG4gIGlmICh0eXBlID09PSAnbm9kZScpIHtcbiAgICBjb250ZXh0LnJvdygneycpO1xuICAgIGNvbnRleHQuaW5kZW50KCk7XG4gIH1cbiAgaWYgKG5vZGVUeXBlID09PSAnYXJyYXknKSB7XG4gICAgY29udGV4dC5yb3coJ1wiX3RcIjogXCJhXCIsJywgJ0FycmF5IGRlbHRhIChtZW1iZXIgbmFtZXMgaW5kaWNhdGUgYXJyYXkgaW5kaWNlcyknKTtcbiAgfVxufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5yb290RW5kID0gZnVuY3Rpb24oY29udGV4dCwgdHlwZSkge1xuICBpZiAodHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgY29udGV4dC5pbmRlbnQoLTEpO1xuICAgIGNvbnRleHQucm93KCd9Jyk7XG4gIH1cbiAgY29udGV4dC5vdXQoJzwvdGFibGU+Jyk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUpIHtcbiAgY29udGV4dC5yb3coJyZxdW90OycgKyBrZXkgKyAnJnF1b3Q7OiB7Jyk7XG4gIGlmICh0eXBlID09PSAnbm9kZScpIHtcbiAgICBjb250ZXh0LmluZGVudCgpO1xuICB9XG4gIGlmIChub2RlVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgIGNvbnRleHQucm93KCdcIl90XCI6IFwiYVwiLCcsICdBcnJheSBkZWx0YSAobWVtYmVyIG5hbWVzIGluZGljYXRlIGFycmF5IGluZGljZXMpJyk7XG4gIH1cbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUVuZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUsIGlzTGFzdCkge1xuICBpZiAodHlwZSA9PT0gJ25vZGUnKSB7XG4gICAgY29udGV4dC5pbmRlbnQoLTEpO1xuICB9XG4gIGNvbnRleHQucm93KCd9JyArIChpc0xhc3QgPyAnJyA6ICcsJykpO1xufTtcblxuLyoganNoaW50IGNhbWVsY2FzZTogZmFsc2UgKi9cblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdW5jaGFuZ2VkID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybjtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkZXN0aW5hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm47XG59O1xuXG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X25vZGUgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAvLyByZWN1cnNlXG4gIHRoaXMuZm9ybWF0RGVsdGFDaGlsZHJlbihjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG59O1xuXG52YXIgd3JhcFByb3BlcnR5TmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuICc8cHJlIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2tcIj4mcXVvdDsnICsgbmFtZSArICcmcXVvdDs8L3ByZT4nO1xufTtcblxudmFyIGRlbHRhQW5ub3RhdGlvbnMgPSB7XG4gIGFkZGVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgdmFyIGZvcm1hdExlZ2VuZCA9ICcgPHByZT4oW25ld1ZhbHVlXSk8L3ByZT4nO1xuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnbmV3IHZhbHVlJyArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuICdpbnNlcnQgYXQgaW5kZXggJyArIGxlZnRLZXkgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIHJldHVybiAnYWRkIHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpICsgZm9ybWF0TGVnZW5kO1xuICB9LFxuICBtb2RpZmllZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHZhciBmb3JtYXRMZWdlbmQgPSAnIDxwcmU+KFtwcmV2aW91c1ZhbHVlLCBuZXdWYWx1ZV0pPC9wcmU+JztcbiAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gJ21vZGlmeSB2YWx1ZScgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnbW9kaWZ5IGF0IGluZGV4ICcgKyBsZWZ0S2V5ICsgZm9ybWF0TGVnZW5kO1xuICAgIH1cbiAgICByZXR1cm4gJ21vZGlmeSBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KSArIGZvcm1hdExlZ2VuZDtcbiAgfSxcbiAgZGVsZXRlZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHZhciBmb3JtYXRMZWdlbmQgPSAnIDxwcmU+KFtwcmV2aW91c1ZhbHVlLCAwLCAwXSk8L3ByZT4nO1xuICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiAnZGVsZXRlIHZhbHVlJyArIGZvcm1hdExlZ2VuZDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuICdyZW1vdmUgaW5kZXggJyArIGxlZnRLZXkgKyBmb3JtYXRMZWdlbmQ7XG4gICAgfVxuICAgIHJldHVybiAnZGVsZXRlIHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpICsgZm9ybWF0TGVnZW5kO1xuICB9LFxuICBtb3ZlZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgIHJldHVybiAnbW92ZSBmcm9tIDxzcGFuIHRpdGxlPVwiKHBvc2l0aW9uIHRvIHJlbW92ZSBhdCBvcmlnaW5hbCBzdGF0ZSlcIj5pbmRleCAnICtcbiAgICAgIGxlZnRLZXkgKyAnPC9zcGFuPiB0byAnICtcbiAgICAgICc8c3BhbiB0aXRsZT1cIihwb3NpdGlvbiB0byBpbnNlcnQgYXQgZmluYWwgc3RhdGUpXCI+aW5kZXggJyArXG4gICAgICBkZWx0YVsxXSArICc8L3NwYW4+JztcbiAgfSxcbiAgdGV4dGRpZmY6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICB2YXIgbG9jYXRpb24gPSAodHlwZW9mIGxlZnRLZXkgPT09ICd1bmRlZmluZWQnKSA/XG4gICAgICAnJyA6IChcbiAgICAgICAgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykgP1xuICAgICAgICAnIGF0IGluZGV4ICcgKyBsZWZ0S2V5IDpcbiAgICAgICAgJyBhdCBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KVxuICAgICAgKTtcbiAgICByZXR1cm4gJ3RleHQgZGlmZicgKyBsb2NhdGlvbiArICcsIGZvcm1hdCBpcyAnICtcbiAgICAgICc8YSBocmVmPVwiaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtZGlmZi1tYXRjaC1wYXRjaC93aWtpL1VuaWRpZmZcIj4nICtcbiAgICAgICdhIHZhcmlhdGlvbiBvZiBVbmlkaWZmPC9hPic7XG4gIH1cbn07XG5cbnZhciBmb3JtYXRBbnlDaGFuZ2UgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICB2YXIgZGVsdGFUeXBlID0gdGhpcy5nZXREZWx0YVR5cGUoZGVsdGEpO1xuICB2YXIgYW5ub3RhdG9yID0gZGVsdGFBbm5vdGF0aW9uc1tkZWx0YVR5cGVdO1xuICB2YXIgaHRtbE5vdGUgPSBhbm5vdGF0b3IgJiYgYW5ub3RhdG9yLmFwcGx5KGFubm90YXRvcixcbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgdmFyIGpzb24gPSBKU09OLnN0cmluZ2lmeShkZWx0YSwgbnVsbCwgMik7XG4gIGlmIChkZWx0YVR5cGUgPT09ICd0ZXh0ZGlmZicpIHtcbiAgICAvLyBzcGxpdCB0ZXh0IGRpZmZzIGxpbmVzXG4gICAganNvbiA9IGpzb24uc3BsaXQoJ1xcXFxuJykuam9pbignXFxcXG5cIitcXG4gICBcIicpO1xuICB9XG4gIGNvbnRleHQuaW5kZW50KCk7XG4gIGNvbnRleHQucm93KGpzb24sIGh0bWxOb3RlKTtcbiAgY29udGV4dC5pbmRlbnQoLTEpO1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfYWRkZWQgPSBmb3JtYXRBbnlDaGFuZ2U7XG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb2RpZmllZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X2RlbGV0ZWQgPSBmb3JtYXRBbnlDaGFuZ2U7XG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9tb3ZlZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3RleHRkaWZmID0gZm9ybWF0QW55Q2hhbmdlO1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiB0cnVlICovXG5cbmV4cG9ydHMuQW5ub3RhdGVkRm9ybWF0dGVyID0gQW5ub3RhdGVkRm9ybWF0dGVyO1xuXG52YXIgZGVmYXVsdEluc3RhbmNlO1xuXG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0KSB7XG4gIGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG4gICAgZGVmYXVsdEluc3RhbmNlID0gbmV3IEFubm90YXRlZEZvcm1hdHRlcigpO1xuICB9XG4gIHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZm9ybWF0KGRlbHRhLCBsZWZ0KTtcbn07XG4iLCJ2YXIgaXNBcnJheSA9ICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAvLyB1c2UgbmF0aXZlIGZ1bmN0aW9uXG4gIEFycmF5LmlzQXJyYXkgOlxuICAvLyB1c2UgaW5zdGFuY2VvZiBvcGVyYXRvclxuICBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGEgaW5zdGFuY2VvZiBBcnJheTtcbiAgfTtcblxudmFyIGdldE9iamVjdEtleXMgPSB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgP1xuICBmdW5jdGlvbihvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcbiAgfSA6IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBuYW1lcyA9IFtdO1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xuICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgbmFtZXMucHVzaChwcm9wZXJ0eSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuYW1lcztcbiAgfTtcblxudmFyIHRyaW1VbmRlcnNjb3JlID0gZnVuY3Rpb24oc3RyKSB7XG4gIGlmIChzdHIuc3Vic3RyKDAsIDEpID09PSAnXycpIHtcbiAgICByZXR1cm4gc3RyLnNsaWNlKDEpO1xuICB9XG4gIHJldHVybiBzdHI7XG59O1xuXG52YXIgYXJyYXlLZXlUb1NvcnROdW1iZXIgPSBmdW5jdGlvbihrZXkpIHtcbiAgaWYgKGtleSA9PT0gJ190Jykge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoa2V5LnN1YnN0cigwLCAxKSA9PT0gJ18nKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoa2V5LnNsaWNlKDEpLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwYXJzZUludChrZXksIDEwKSArIDAuMTtcbiAgICB9XG4gIH1cbn07XG5cbnZhciBhcnJheUtleUNvbXBhcmVyID0gZnVuY3Rpb24oa2V5MSwga2V5Mikge1xuICByZXR1cm4gYXJyYXlLZXlUb1NvcnROdW1iZXIoa2V5MSkgLSBhcnJheUtleVRvU29ydE51bWJlcihrZXkyKTtcbn07XG5cbnZhciBCYXNlRm9ybWF0dGVyID0gZnVuY3Rpb24gQmFzZUZvcm1hdHRlcigpIHt9O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICB2YXIgY29udGV4dCA9IHt9O1xuICB0aGlzLnByZXBhcmVDb250ZXh0KGNvbnRleHQpO1xuICB0aGlzLnJlY3Vyc2UoY29udGV4dCwgZGVsdGEsIGxlZnQpO1xuICByZXR1cm4gdGhpcy5maW5hbGl6ZShjb250ZXh0KTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnByZXBhcmVDb250ZXh0ID0gZnVuY3Rpb24oY29udGV4dCkge1xuICBjb250ZXh0LmJ1ZmZlciA9IFtdO1xuICBjb250ZXh0Lm91dCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYnVmZmVyLnB1c2guYXBwbHkodGhpcy5idWZmZXIsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlck5vdEZvdW5kID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGFUeXBlKSB7XG4gIHRocm93IG5ldyBFcnJvcignY2Fubm90IGZvcm1hdCBkZWx0YSB0eXBlOiAnICsgZGVsdGFUeXBlKTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIgPSBmdW5jdGlvbihjb250ZXh0LCBlcnIpIHtcbiAgcmV0dXJuIGVyci50b1N0cmluZygpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZmluYWxpemUgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGlmIChpc0FycmF5KGNvbnRleHQuYnVmZmVyKSkge1xuICAgIHJldHVybiBjb250ZXh0LmJ1ZmZlci5qb2luKCcnKTtcbiAgfVxufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucmVjdXJzZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSwgaXNMYXN0KSB7XG5cbiAgdmFyIHVzZU1vdmVPcmlnaW5IZXJlID0gZGVsdGEgJiYgbW92ZWRGcm9tO1xuICB2YXIgbGVmdFZhbHVlID0gdXNlTW92ZU9yaWdpbkhlcmUgPyBtb3ZlZEZyb20udmFsdWUgOiBsZWZ0O1xuXG4gIGlmICh0eXBlb2YgZGVsdGEgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBrZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHZhciB0eXBlID0gdGhpcy5nZXREZWx0YVR5cGUoZGVsdGEsIG1vdmVkRnJvbSk7XG4gIHZhciBub2RlVHlwZSA9IHR5cGUgPT09ICdub2RlJyA/IChkZWx0YS5fdCA9PT0gJ2EnID8gJ2FycmF5JyA6ICdvYmplY3QnKSA6ICcnO1xuXG4gIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHRoaXMubm9kZUJlZ2luKGNvbnRleHQsIGtleSwgbGVmdEtleSwgdHlwZSwgbm9kZVR5cGUsIGlzTGFzdCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yb290QmVnaW4oY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpO1xuICB9XG5cbiAgdmFyIHR5cGVGb3JtYXR0dGVyO1xuICB0cnkge1xuICAgIHR5cGVGb3JtYXR0dGVyID0gdGhpc1snZm9ybWF0XycgKyB0eXBlXSB8fCB0aGlzLnR5cGVGb3JtYXR0dGVyTm90Rm91bmQoY29udGV4dCwgdHlwZSk7XG4gICAgdHlwZUZvcm1hdHR0ZXIuY2FsbCh0aGlzLCBjb250ZXh0LCBkZWx0YSwgbGVmdFZhbHVlLCBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHRoaXMudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlcihjb250ZXh0LCBlcnIsIGRlbHRhLCBsZWZ0VmFsdWUsIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tKTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLm5vZGVFbmQoY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSwgaXNMYXN0KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJvb3RFbmQoY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpO1xuICB9XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXREZWx0YUNoaWxkcmVuID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB0aGlzLmZvckVhY2hEZWx0YUtleShkZWx0YSwgbGVmdCwgZnVuY3Rpb24oa2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20sIGlzTGFzdCkge1xuICAgIHNlbGYucmVjdXJzZShjb250ZXh0LCBkZWx0YVtrZXldLCBsZWZ0ID8gbGVmdFtsZWZ0S2V5XSA6IHVuZGVmaW5lZCxcbiAgICAgIGtleSwgbGVmdEtleSwgbW92ZWRGcm9tLCBpc0xhc3QpO1xuICB9KTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvckVhY2hEZWx0YUtleSA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBmbikge1xuICB2YXIga2V5cyA9IGdldE9iamVjdEtleXMoZGVsdGEpO1xuICB2YXIgYXJyYXlLZXlzID0gZGVsdGEuX3QgPT09ICdhJztcbiAgdmFyIG1vdmVEZXN0aW5hdGlvbnMgPSB7fTtcbiAgdmFyIG5hbWU7XG4gIGlmICh0eXBlb2YgbGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBmb3IgKG5hbWUgaW4gbGVmdCkge1xuICAgICAgaWYgKHR5cGVvZiBkZWx0YVtuYW1lXSA9PT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgKCghYXJyYXlLZXlzKSB8fCB0eXBlb2YgZGVsdGFbJ18nICsgbmFtZV0gPT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICBrZXlzLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIGxvb2sgZm9yIG1vdmUgZGVzdGluYXRpb25zXG4gIGZvciAobmFtZSBpbiBkZWx0YSkge1xuICAgIHZhciB2YWx1ZSA9IGRlbHRhW25hbWVdO1xuICAgIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZVsyXSA9PT0gMykge1xuICAgICAgbW92ZURlc3RpbmF0aW9uc1t2YWx1ZVsxXS50b1N0cmluZygpXSA9IHtcbiAgICAgICAga2V5OiBuYW1lLFxuICAgICAgICB2YWx1ZTogbGVmdFtwYXJzZUludChuYW1lLnN1YnN0cigxKSldXG4gICAgICB9O1xuICAgICAgaWYgKHRoaXMuaW5jbHVkZU1vdmVEZXN0aW5hdGlvbnMgIT09IGZhbHNlKSB7XG4gICAgICAgIGlmICgodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSAmJlxuICAgICAgICAgICh0eXBlb2YgZGVsdGFbdmFsdWVbMV1dID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICBrZXlzLnB1c2godmFsdWVbMV0udG9TdHJpbmcoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGFycmF5S2V5cykge1xuICAgIGtleXMuc29ydChhcnJheUtleUNvbXBhcmVyKTtcbiAgfSBlbHNlIHtcbiAgICBrZXlzLnNvcnQoKTtcbiAgfVxuICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGtleXMubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2luZGV4XTtcbiAgICBpZiAoYXJyYXlLZXlzICYmIGtleSA9PT0gJ190Jykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZhciBsZWZ0S2V5ID0gYXJyYXlLZXlzID9cbiAgICAgICh0eXBlb2Yga2V5ID09PSAnbnVtYmVyJyA/IGtleSA6IHBhcnNlSW50KHRyaW1VbmRlcnNjb3JlKGtleSksIDEwKSkgOlxuICAgICAga2V5O1xuICAgIHZhciBpc0xhc3QgPSAoaW5kZXggPT09IGxlbmd0aCAtIDEpO1xuICAgIGZuKGtleSwgbGVmdEtleSwgbW92ZURlc3RpbmF0aW9uc1tsZWZ0S2V5XSwgaXNMYXN0KTtcbiAgfVxufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUuZ2V0RGVsdGFUeXBlID0gZnVuY3Rpb24oZGVsdGEsIG1vdmVkRnJvbSkge1xuICBpZiAodHlwZW9mIGRlbHRhID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0eXBlb2YgbW92ZWRGcm9tICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuICdtb3ZlZGVzdGluYXRpb24nO1xuICAgIH1cbiAgICByZXR1cm4gJ3VuY2hhbmdlZCc7XG4gIH1cbiAgaWYgKGlzQXJyYXkoZGVsdGEpKSB7XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMSkge1xuICAgICAgcmV0dXJuICdhZGRlZCc7XG4gICAgfVxuICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJldHVybiAnbW9kaWZpZWQnO1xuICAgIH1cbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAzICYmIGRlbHRhWzJdID09PSAwKSB7XG4gICAgICByZXR1cm4gJ2RlbGV0ZWQnO1xuICAgIH1cbiAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAzICYmIGRlbHRhWzJdID09PSAyKSB7XG4gICAgICByZXR1cm4gJ3RleHRkaWZmJztcbiAgICB9XG4gICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMyAmJiBkZWx0YVsyXSA9PT0gMykge1xuICAgICAgcmV0dXJuICdtb3ZlZCc7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gJ25vZGUnO1xuICB9XG4gIHJldHVybiAndW5rbm93bic7XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5wYXJzZVRleHREaWZmID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgdmFyIG91dHB1dCA9IFtdO1xuICB2YXIgbGluZXMgPSB2YWx1ZS5zcGxpdCgnXFxuQEAgJyk7XG4gIGZvciAodmFyIGkgPSAwLCBsID0gbGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICB2YXIgbGluZU91dHB1dCA9IHtcbiAgICAgIHBpZWNlczogW11cbiAgICB9O1xuICAgIHZhciBsb2NhdGlvbiA9IC9eKD86QEAgKT9bLStdPyhcXGQrKSwoXFxkKykvLmV4ZWMobGluZSkuc2xpY2UoMSk7XG4gICAgbGluZU91dHB1dC5sb2NhdGlvbiA9IHtcbiAgICAgIGxpbmU6IGxvY2F0aW9uWzBdLFxuICAgICAgY2hyOiBsb2NhdGlvblsxXVxuICAgIH07XG4gICAgdmFyIHBpZWNlcyA9IGxpbmUuc3BsaXQoJ1xcbicpLnNsaWNlKDEpO1xuICAgIGZvciAodmFyIHBpZWNlSW5kZXggPSAwLCBwaWVjZXNMZW5ndGggPSBwaWVjZXMubGVuZ3RoOyBwaWVjZUluZGV4IDwgcGllY2VzTGVuZ3RoOyBwaWVjZUluZGV4KyspIHtcbiAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1twaWVjZUluZGV4XTtcbiAgICAgIGlmICghcGllY2UubGVuZ3RoKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIHBpZWNlT3V0cHV0ID0ge1xuICAgICAgICB0eXBlOiAnY29udGV4dCdcbiAgICAgIH07XG4gICAgICBpZiAocGllY2Uuc3Vic3RyKDAsIDEpID09PSAnKycpIHtcbiAgICAgICAgcGllY2VPdXRwdXQudHlwZSA9ICdhZGRlZCc7XG4gICAgICB9IGVsc2UgaWYgKHBpZWNlLnN1YnN0cigwLCAxKSA9PT0gJy0nKSB7XG4gICAgICAgIHBpZWNlT3V0cHV0LnR5cGUgPSAnZGVsZXRlZCc7XG4gICAgICB9XG4gICAgICBwaWVjZU91dHB1dC50ZXh0ID0gcGllY2Uuc2xpY2UoMSk7XG4gICAgICBsaW5lT3V0cHV0LnBpZWNlcy5wdXNoKHBpZWNlT3V0cHV0KTtcbiAgICB9XG4gICAgb3V0cHV0LnB1c2gobGluZU91dHB1dCk7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydHMuQmFzZUZvcm1hdHRlciA9IEJhc2VGb3JtYXR0ZXI7XG4iLCJ2YXIgYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIEJhc2VGb3JtYXR0ZXIgPSBiYXNlLkJhc2VGb3JtYXR0ZXI7XG5cbnZhciBIdG1sRm9ybWF0dGVyID0gZnVuY3Rpb24gSHRtbEZvcm1hdHRlcigpIHt9O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZSA9IG5ldyBCYXNlRm9ybWF0dGVyKCk7XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIgPSBmdW5jdGlvbihjb250ZXh0LCBlcnIpIHtcbiAgY29udGV4dC5vdXQoJzxwcmUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWVycm9yXCI+JyArIGVyciArICc8L3ByZT4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFZhbHVlID0gZnVuY3Rpb24oY29udGV4dCwgdmFsdWUpIHtcbiAgY29udGV4dC5vdXQoJzxwcmU+JyArIEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCAyKSArICc8L3ByZT4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFRleHREaWZmU3RyaW5nID0gZnVuY3Rpb24oY29udGV4dCwgdmFsdWUpIHtcbiAgdmFyIGxpbmVzID0gdGhpcy5wYXJzZVRleHREaWZmKHZhbHVlKTtcbiAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmZcIj4nKTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgIGNvbnRleHQub3V0KCc8bGk+JyArXG4gICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbG9jYXRpb25cIj4nICtcbiAgICAgICc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZS1udW1iZXJcIj4nICtcbiAgICAgIGxpbmUubG9jYXRpb24ubGluZSArXG4gICAgICAnPC9zcGFuPicgK1xuICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1jaGFyXCI+JyArXG4gICAgICBsaW5lLmxvY2F0aW9uLmNociArXG4gICAgICAnPC9zcGFuPicgK1xuICAgICAgJzwvZGl2PicgK1xuICAgICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxpbmVcIj4nKTtcbiAgICB2YXIgcGllY2VzID0gbGluZS5waWVjZXM7XG4gICAgZm9yICh2YXIgcGllY2VJbmRleCA9IDAsIHBpZWNlc0xlbmd0aCA9IHBpZWNlcy5sZW5ndGg7IHBpZWNlSW5kZXggPCBwaWVjZXNMZW5ndGg7IHBpZWNlSW5kZXgrKykge1xuICAgICAgdmFyIHBpZWNlID0gcGllY2VzW3BpZWNlSW5kZXhdO1xuICAgICAgY29udGV4dC5vdXQoJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi0nICsgcGllY2UudHlwZSArICdcIj4nICtcbiAgICAgICAgcGllY2UudGV4dCArICc8L3NwYW4+Jyk7XG4gICAgfVxuICAgIGNvbnRleHQub3V0KCc8L2Rpdj48L2xpPicpO1xuICB9XG4gIGNvbnRleHQub3V0KCc8L3VsPicpO1xufTtcblxudmFyIGFkanVzdEFycm93cyA9IGZ1bmN0aW9uIGpzb25kaWZmcGF0Y2hIdG1sRm9ybWF0dGVyQWRqdXN0QXJyb3dzKG5vZGUpIHtcbiAgbm9kZSA9IG5vZGUgfHwgZG9jdW1lbnQ7XG4gIHZhciBnZXRFbGVtZW50VGV4dCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIGVsLnRleHRDb250ZW50IHx8IGVsLmlubmVyVGV4dDtcbiAgfTtcbiAgdmFyIGVhY2hCeVF1ZXJ5ID0gZnVuY3Rpb24oZWwsIHF1ZXJ5LCBmbikge1xuICAgIHZhciBlbGVtcyA9IGVsLnF1ZXJ5U2VsZWN0b3JBbGwocXVlcnkpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gZWxlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbihlbGVtc1tpXSk7XG4gICAgfVxuICB9O1xuICB2YXIgZWFjaENoaWxkcmVuID0gZnVuY3Rpb24oZWwsIGZuKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbC5jaGlsZHJlbi5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuKGVsLmNoaWxkcmVuW2ldLCBpKTtcbiAgICB9XG4gIH07XG4gIGVhY2hCeVF1ZXJ5KG5vZGUsICcuanNvbmRpZmZwYXRjaC1hcnJvdycsIGZ1bmN0aW9uKGFycm93KSB7XG4gICAgdmFyIGFycm93UGFyZW50ID0gYXJyb3cucGFyZW50Tm9kZTtcbiAgICB2YXIgc3ZnID0gYXJyb3cuY2hpbGRyZW5bMF0sXG4gICAgICBwYXRoID0gc3ZnLmNoaWxkcmVuWzFdO1xuICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHZhciBkZXN0aW5hdGlvbiA9IGdldEVsZW1lbnRUZXh0KGFycm93UGFyZW50LnF1ZXJ5U2VsZWN0b3IoJy5qc29uZGlmZnBhdGNoLW1vdmVkLWRlc3RpbmF0aW9uJykpO1xuICAgIHZhciBjb250YWluZXIgPSBhcnJvd1BhcmVudC5wYXJlbnROb2RlO1xuICAgIHZhciBkZXN0aW5hdGlvbkVsZW07XG4gICAgZWFjaENoaWxkcmVuKGNvbnRhaW5lciwgZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgIGlmIChjaGlsZC5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JykgPT09IGRlc3RpbmF0aW9uKSB7XG4gICAgICAgIGRlc3RpbmF0aW9uRWxlbSA9IGNoaWxkO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZGVzdGluYXRpb25FbGVtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICB2YXIgZGlzdGFuY2UgPSBkZXN0aW5hdGlvbkVsZW0ub2Zmc2V0VG9wIC0gYXJyb3dQYXJlbnQub2Zmc2V0VG9wO1xuICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgTWF0aC5hYnMoZGlzdGFuY2UpICsgNik7XG4gICAgICBhcnJvdy5zdHlsZS50b3AgPSAoLTggKyAoZGlzdGFuY2UgPiAwID8gMCA6IGRpc3RhbmNlKSkgKyAncHgnO1xuICAgICAgdmFyIGN1cnZlID0gZGlzdGFuY2UgPiAwID9cbiAgICAgICAgJ00zMCwwIFEtMTAsJyArIE1hdGgucm91bmQoZGlzdGFuY2UgLyAyKSArICcgMjYsJyArIChkaXN0YW5jZSAtIDQpIDpcbiAgICAgICAgJ00zMCwnICsgKC1kaXN0YW5jZSkgKyAnIFEtMTAsJyArIE1hdGgucm91bmQoLWRpc3RhbmNlIC8gMikgKyAnIDI2LDQnO1xuICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBjdXJ2ZSk7XG4gICAgICBzdmcuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfSk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5yb290QmVnaW4gPSBmdW5jdGlvbihjb250ZXh0LCB0eXBlLCBub2RlVHlwZSkge1xuICB2YXIgbm9kZUNsYXNzID0gJ2pzb25kaWZmcGF0Y2gtJyArIHR5cGUgK1xuICAgIChub2RlVHlwZSA/ICcganNvbmRpZmZwYXRjaC1jaGlsZC1ub2RlLXR5cGUtJyArIG5vZGVUeXBlIDogJycpO1xuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZGVsdGEgJyArIG5vZGVDbGFzcyArICdcIj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RFbmQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nICsgKGNvbnRleHQuaGFzQXJyb3dzID9cbiAgICAoJzxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiPnNldFRpbWVvdXQoJyArXG4gICAgICBhZGp1c3RBcnJvd3MudG9TdHJpbmcoKSArXG4gICAgICAnLDEwKTs8L3NjcmlwdD4nKSA6ICcnKSk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5ub2RlQmVnaW4gPSBmdW5jdGlvbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlKSB7XG4gIHZhciBub2RlQ2xhc3MgPSAnanNvbmRpZmZwYXRjaC0nICsgdHlwZSArXG4gICAgKG5vZGVUeXBlID8gJyBqc29uZGlmZnBhdGNoLWNoaWxkLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgOiAnJyk7XG4gIGNvbnRleHQub3V0KCc8bGkgY2xhc3M9XCInICsgbm9kZUNsYXNzICsgJ1wiIGRhdGEta2V5PVwiJyArIGxlZnRLZXkgKyAnXCI+JyArXG4gICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXByb3BlcnR5LW5hbWVcIj4nICsgbGVmdEtleSArICc8L2Rpdj4nKTtcbn07XG5cblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUVuZCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgY29udGV4dC5vdXQoJzwvbGk+Jyk7XG59O1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdW5jaGFuZ2VkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBsZWZ0KTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkZXN0aW5hdGlvbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gIGlmICh0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgbGVmdCk7XG4gIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9ub2RlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgLy8gcmVjdXJzZVxuICB2YXIgbm9kZVR5cGUgPSAoZGVsdGEuX3QgPT09ICdhJykgPyAnYXJyYXknIDogJ29iamVjdCc7XG4gIGNvbnRleHQub3V0KCc8dWwgY2xhc3M9XCJqc29uZGlmZnBhdGNoLW5vZGUganNvbmRpZmZwYXRjaC1ub2RlLXR5cGUtJyArIG5vZGVUeXBlICsgJ1wiPicpO1xuICB0aGlzLmZvcm1hdERlbHRhQ2hpbGRyZW4oY29udGV4dCwgZGVsdGEsIGxlZnQpO1xuICBjb250ZXh0Lm91dCgnPC91bD4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9hZGRlZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vZGlmaWVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlIGpzb25kaWZmcGF0Y2gtbGVmdC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicgK1xuICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZSBqc29uZGlmZnBhdGNoLXJpZ2h0LXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMV0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfZGVsZXRlZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICBjb250ZXh0Lm91dCgnPC9kaXY+PGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtbW92ZWQtZGVzdGluYXRpb25cIj4nICsgZGVsdGFbMV0gKyAnPC9kaXY+Jyk7XG5cbiAgLy8gZHJhdyBhbiBTVkcgYXJyb3cgZnJvbSBoZXJlIHRvIG1vdmUgZGVzdGluYXRpb25cbiAgY29udGV4dC5vdXQoXG4gICAgLypqc2hpbnQgbXVsdGlzdHI6IHRydWUgKi9cbiAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtYXJyb3dcIiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgbGVmdDogLTM0cHg7XCI+XFxcbiAgICAgICAgPHN2ZyB3aWR0aD1cIjMwXCIgaGVpZ2h0PVwiNjBcIiBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZTsgZGlzcGxheTogbm9uZTtcIj5cXFxuICAgICAgICA8ZGVmcz5cXFxuICAgICAgICAgICAgPG1hcmtlciBpZD1cIm1hcmtlckFycm93XCIgbWFya2VyV2lkdGg9XCI4XCIgbWFya2VySGVpZ2h0PVwiOFwiIHJlZng9XCIyXCIgcmVmeT1cIjRcIlxcXG4gICAgICAgICAgICAgICAgICAgb3JpZW50PVwiYXV0b1wiIG1hcmtlclVuaXRzPVwidXNlclNwYWNlT25Vc2VcIj5cXFxuICAgICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMSwxIEwxLDcgTDcsNCBMMSwxXCIgc3R5bGU9XCJmaWxsOiAjMzM5O1wiIC8+XFxcbiAgICAgICAgICAgIDwvbWFya2VyPlxcXG4gICAgICAgIDwvZGVmcz5cXFxuICAgICAgICA8cGF0aCBkPVwiTTMwLDAgUS0xMCwyNSAyNiw1MFwiIHN0eWxlPVwic3Ryb2tlOiAjODhmOyBzdHJva2Utd2lkdGg6IDJweDsgZmlsbDogbm9uZTtcXFxuICAgICAgICBzdHJva2Utb3BhY2l0eTogMC41OyBtYXJrZXItZW5kOiB1cmwoI21hcmtlckFycm93KTtcIj48L3BhdGg+XFxcbiAgICAgICAgPC9zdmc+XFxcbiAgICAgICAgPC9kaXY+Jyk7XG4gIGNvbnRleHQuaGFzQXJyb3dzID0gdHJ1ZTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF90ZXh0ZGlmZiA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICB0aGlzLmZvcm1hdFRleHREaWZmU3RyaW5nKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuLyoganNoaW50IGNhbWVsY2FzZTogdHJ1ZSAqL1xuXG52YXIgc2hvd1VuY2hhbmdlZCA9IGZ1bmN0aW9uKHNob3csIG5vZGUsIGRlbGF5KSB7XG4gIHZhciBlbCA9IG5vZGUgfHwgZG9jdW1lbnQuYm9keTtcbiAgdmFyIHByZWZpeCA9ICdqc29uZGlmZnBhdGNoLXVuY2hhbmdlZC0nO1xuICB2YXIgY2xhc3NlcyA9IHtcbiAgICBzaG93aW5nOiBwcmVmaXggKyAnc2hvd2luZycsXG4gICAgaGlkaW5nOiBwcmVmaXggKyAnaGlkaW5nJyxcbiAgICB2aXNpYmxlOiBwcmVmaXggKyAndmlzaWJsZScsXG4gICAgaGlkZGVuOiBwcmVmaXggKyAnaGlkZGVuJyxcbiAgfTtcbiAgdmFyIGxpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gIGlmICghbGlzdCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWRlbGF5KSB7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGluZyk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGRlbik7XG4gICAgaWYgKHNob3cgPT09IGZhbHNlKSB7XG4gICAgICBsaXN0LmFkZChjbGFzc2VzLmhpZGRlbik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc2hvdyA9PT0gZmFsc2UpIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnNob3dpbmcpO1xuICAgIGxpc3QuYWRkKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMuaGlkaW5nKTtcbiAgICB9LCAxMCk7XG4gIH0gZWxzZSB7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRpbmcpO1xuICAgIGxpc3QuYWRkKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRkZW4pO1xuICB9XG4gIHZhciBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgYWRqdXN0QXJyb3dzKGVsKTtcbiAgfSwgMTAwKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnNob3dpbmcpO1xuICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkaW5nKTtcbiAgICBpZiAoc2hvdyA9PT0gZmFsc2UpIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMuaGlkZGVuKTtcbiAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3QuYWRkKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGRlbik7XG4gICAgfVxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICB9LCBkZWxheSArIDQwMCk7XG4gIH0sIGRlbGF5KTtcbn07XG5cbnZhciBoaWRlVW5jaGFuZ2VkID0gZnVuY3Rpb24obm9kZSwgZGVsYXkpIHtcbiAgcmV0dXJuIHNob3dVbmNoYW5nZWQoZmFsc2UsIG5vZGUsIGRlbGF5KTtcbn07XG5cbmV4cG9ydHMuSHRtbEZvcm1hdHRlciA9IEh0bWxGb3JtYXR0ZXI7XG5cbmV4cG9ydHMuc2hvd1VuY2hhbmdlZCA9IHNob3dVbmNoYW5nZWQ7XG5cbmV4cG9ydHMuaGlkZVVuY2hhbmdlZCA9IGhpZGVVbmNoYW5nZWQ7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZGVsdGEsIGxlZnQpIHtcbiAgaWYgKCFkZWZhdWx0SW5zdGFuY2UpIHtcbiAgICBkZWZhdWx0SW5zdGFuY2UgPSBuZXcgSHRtbEZvcm1hdHRlcigpO1xuICB9XG4gIHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZm9ybWF0KGRlbHRhLCBsZWZ0KTtcbn07XG4iLCIoZnVuY3Rpb24gKHByb2Nlc3Mpe1xuXG5leHBvcnRzLmh0bWwgPSByZXF1aXJlKCcuL2h0bWwnKTtcbmV4cG9ydHMuYW5ub3RhdGVkID0gcmVxdWlyZSgnLi9hbm5vdGF0ZWQnKTtcblxuaWYgKCFwcm9jZXNzLmJyb3dzZXIpIHtcblx0dmFyIGNvbnNvbGVNb2R1bGVOYW1lID0gJy4vY29uc29sZSc7XG5cdGV4cG9ydHMuY29uc29sZSA9IHJlcXVpcmUoY29uc29sZU1vZHVsZU5hbWUpO1xufVxuXG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSkiXX0=
