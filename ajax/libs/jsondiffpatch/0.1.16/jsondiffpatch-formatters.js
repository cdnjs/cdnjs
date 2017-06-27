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
    context.row('','<pre class="jsondiffpatch-error">' + err + '</pre>');
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
    if (type ==='node') {
        context.row('{');
        context.indent();
    }
    if (nodeType === 'array') {
        context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
    }
};

AnnotatedFormatter.prototype.rootEnd = function(context, type) {
    if (type ==='node') {
        context.indent(-1);
        context.row('}');
    }
    context.out('</table>');
};

AnnotatedFormatter.prototype.nodeBegin = function(context, key, leftKey, type, nodeType) {
    context.row('&quot;'+key+'&quot;: {');
    if (type === 'node') {
        context.indent();
    }
    if (nodeType === 'array') {
        context.row('"_t": "a",', 'Array delta (member names indicate array indices)');
    }
};

AnnotatedFormatter.prototype.nodeEnd = function(context, key, leftKey, type, nodeType, isLast) {
    if (type ==='node') {
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

var BaseFormatter = function BaseFormatter() {
};

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
        if (arrayKeys && key === '_t') { continue; }
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
        if (delta.length === 1) { return 'added'; }
        if (delta.length === 2) { return 'modified'; }
        if (delta.length === 3 && delta[2] === 0) { return 'deleted'; }
        if (delta.length === 3 && delta[2] === 2) { return 'textdiff'; }
        if (delta.length === 3 && delta[2] === 3) { return 'moved'; }
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
            if (!piece.length) { continue; }
            var pieceOutput = { type: 'context' };
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

var HtmlFormatter = function HtmlFormatter() {
};

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
        var svg = arrow.children[0], path = svg.children[1];
        svg.style.display = 'none';
        var destination = getElementText(arrowParent.querySelector('.jsondiffpatch-moved-destination'));
        var container = arrowParent.parentNode;
        var destinationElem;
        eachChildren(container, function(child) {
            if (child.getAttribute('data-key') === destination) {
                destinationElem = child;
            }
        });
        if (!destinationElem) { return; }
        try {
            var distance = destinationElem.offsetTop - arrowParent.offsetTop;
            svg.setAttribute('height', Math.abs(distance) + 6);
            arrow.style.top = (- 8 + (distance > 0 ? 0 : distance)) + 'px';
            var curve = distance > 0 ?
                'M30,0 Q-10,' + Math.round(distance / 2) + ' 26,' + (distance - 4) :
                'M30,' + (-distance) + ' Q-10,' + Math.round(-distance / 2) + ' 26,4';
            path.setAttribute('d', curve);
            svg.style.display = '';
        } catch(err) {
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
    if (typeof left === 'undefined') { return; }
    context.out('<div class="jsondiffpatch-value">');
    this.formatValue(context, left);
    context.out('</div>');
};

HtmlFormatter.prototype.format_movedestination = function(context, delta, left) {
    if (typeof left === 'undefined') { return; }
    context.out('<div class="jsondiffpatch-value">');
    this.formatValue(context, left);
    context.out('</div>');
};

HtmlFormatter.prototype.format_node = function(context, delta, left) {
    // recurse
    var nodeType = (delta._t === 'a') ? 'array': 'object';
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
    if (!list) { return; }
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
        setTimeout(function(){
            list.add(classes.hiding);
        }, 10);
    } else {
        list.remove(classes.hiding);
        list.add(classes.showing);
        list.remove(classes.hidden);
    }
    var intervalId = setInterval(function(){
        adjustArrows(el);
    }, 100);
    setTimeout(function(){
        list.remove(classes.showing);
        list.remove(classes.hiding);
        if (show === false) {
            list.add(classes.hidden);
            list.remove(classes.visible);
        } else {
            list.add(classes.visible);
            list.remove(classes.hidden);
        }
        setTimeout(function(){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9ub2RlX21vZHVsZXMvZmliZXJnbGFzcy9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9tYWluLWZvcm1hdHRlcnMuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvbm9kZV9tb2R1bGVzL2ZpYmVyZ2xhc3Mvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZm9ybWF0dGVycy9hbm5vdGF0ZWQuanMiLCIvc291cmNlLWZpbGVzL2pzb25kaWZmcGF0Y2gvc3JjL2Zvcm1hdHRlcnMvYmFzZS5qcyIsIi9zb3VyY2UtZmlsZXMvanNvbmRpZmZwYXRjaC9zcmMvZm9ybWF0dGVycy9odG1sLmpzIiwiL3NvdXJjZS1maWxlcy9qc29uZGlmZnBhdGNoL3NyYy9mb3JtYXR0ZXJzL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZm9ybWF0dGVycycpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxucHJvY2Vzcy5uZXh0VGljayA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnNldEltbWVkaWF0ZTtcbiAgICB2YXIgY2FuUG9zdCA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgJiYgd2luZG93LnBvc3RNZXNzYWdlICYmIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyXG4gICAgO1xuXG4gICAgaWYgKGNhblNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZikgfTtcbiAgICB9XG5cbiAgICBpZiAoY2FuUG9zdCkge1xuICAgICAgICB2YXIgcXVldWUgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2UgPSBldi5zb3VyY2U7XG4gICAgICAgICAgICBpZiAoKHNvdXJjZSA9PT0gd2luZG93IHx8IHNvdXJjZSA9PT0gbnVsbCkgJiYgZXYuZGF0YSA9PT0gJ3Byb2Nlc3MtdGljaycpIHtcbiAgICAgICAgICAgICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICBpZiAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm4gPSBxdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKGZuKTtcbiAgICAgICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSgncHJvY2Vzcy10aWNrJywgJyonKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICAgICAgc2V0VGltZW91dChmbiwgMCk7XG4gICAgfTtcbn0pKCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufVxuXG4vLyBUT0RPKHNodHlsbWFuKVxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG4iLCJcbnZhciBiYXNlID0gcmVxdWlyZSgnLi9iYXNlJyk7XG52YXIgQmFzZUZvcm1hdHRlciA9IGJhc2UuQmFzZUZvcm1hdHRlcjtcblxudmFyIEFubm90YXRlZEZvcm1hdHRlciA9IGZ1bmN0aW9uIEFubm90YXRlZEZvcm1hdHRlcigpIHtcbiAgICB0aGlzLmluY2x1ZGVNb3ZlRGVzdGluYXRpb25zID0gZmFsc2U7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlID0gbmV3IEJhc2VGb3JtYXR0ZXIoKTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dCA9IGZ1bmN0aW9uKGNvbnRleHQpIHtcbiAgICBCYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5wcmVwYXJlQ29udGV4dC5jYWxsKHRoaXMsIGNvbnRleHQpO1xuICAgIGNvbnRleHQuaW5kZW50ID0gZnVuY3Rpb24obGV2ZWxzKSB7XG4gICAgICAgIHRoaXMuaW5kZW50TGV2ZWwgPSAodGhpcy5pbmRlbnRMZXZlbCB8fCAwKSArXG4gICAgICAgICAgICAodHlwZW9mIGxldmVscyA9PT0gJ3VuZGVmaW5lZCcgPyAxIDogbGV2ZWxzKTtcbiAgICAgICAgdGhpcy5pbmRlbnRQYWQgPSBuZXcgQXJyYXkodGhpcy5pbmRlbnRMZXZlbCArIDEpLmpvaW4oJyZuYnNwOyZuYnNwOycpO1xuICAgIH07XG4gICAgY29udGV4dC5yb3cgPSBmdW5jdGlvbihqc29uLCBodG1sTm90ZSkge1xuICAgICAgICBjb250ZXh0Lm91dCgnPHRyPjx0ZCBzdHlsZT1cIndoaXRlLXNwYWNlOiBub3dyYXA7XCI+JyArXG4gICAgICAgICAgICAnPHByZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtYW5ub3RhdGVkLWluZGVudFwiIHN0eWxlPVwiZGlzcGxheTogaW5saW5lLWJsb2NrXCI+Jyk7XG4gICAgICAgIGNvbnRleHQub3V0KGNvbnRleHQuaW5kZW50UGFkKTtcbiAgICAgICAgY29udGV4dC5vdXQoJzwvcHJlPjxwcmUgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2tcIj4nKTtcbiAgICAgICAgY29udGV4dC5vdXQoanNvbik7XG4gICAgICAgIGNvbnRleHQub3V0KCc8L3ByZT48L3RkPjx0ZCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtZGVsdGEtbm90ZVwiPjxkaXY+Jyk7XG4gICAgICAgIGNvbnRleHQub3V0KGh0bWxOb3RlKTtcbiAgICAgICAgY29udGV4dC5vdXQoJzwvZGl2PjwvdGQ+PC90cj4nKTtcbiAgICB9O1xufTtcblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlckVycm9yRm9ybWF0dGVyID0gZnVuY3Rpb24oY29udGV4dCwgZXJyKSB7XG4gICAgY29udGV4dC5yb3coJycsJzxwcmUgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWVycm9yXCI+JyArIGVyciArICc8L3ByZT4nKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0VGV4dERpZmZTdHJpbmcgPSBmdW5jdGlvbihjb250ZXh0LCB2YWx1ZSkge1xuICAgIHZhciBsaW5lcyA9IHRoaXMucGFyc2VUZXh0RGlmZih2YWx1ZSk7XG4gICAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmZcIj4nKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgICBjb250ZXh0Lm91dCgnPGxpPicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbG9jYXRpb25cIj4nICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lLW51bWJlclwiPicgK1xuICAgICAgICBsaW5lLmxvY2F0aW9uLmxpbmUgK1xuICAgICAgICAnPC9zcGFuPicgK1xuICAgICAgICAnPHNwYW4gY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWNoYXJcIj4nICtcbiAgICAgICAgbGluZS5sb2NhdGlvbi5jaHIgK1xuICAgICAgICAnPC9zcGFuPicgK1xuICAgICAgICAnPC9kaXY+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1saW5lXCI+Jyk7XG4gICAgICAgIHZhciBwaWVjZXMgPSBsaW5lLnBpZWNlcztcbiAgICAgICAgZm9yICh2YXIgcGllY2VJbmRleCA9IDAsIHBpZWNlc0xlbmd0aCA9IHBpZWNlcy5sZW5ndGg7IHBpZWNlSW5kZXggPCBwaWVjZXNMZW5ndGg7IHBpZWNlSW5kZXgrKykge1xuICAgICAgICAgICAgdmFyIHBpZWNlID0gcGllY2VzW3BpZWNlSW5kZXhdO1xuICAgICAgICAgICAgY29udGV4dC5vdXQoJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi0nICsgcGllY2UudHlwZSArICdcIj4nICtcbiAgICAgICAgICAgICAgICBwaWVjZS50ZXh0ICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0Lm91dCgnPC9kaXY+PC9saT4nKTtcbiAgICB9XG4gICAgY29udGV4dC5vdXQoJzwvdWw+Jyk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKSB7XG4gICAgY29udGV4dC5vdXQoJzx0YWJsZSBjbGFzcz1cImpzb25kaWZmcGF0Y2gtYW5ub3RhdGVkLWRlbHRhXCI+Jyk7XG4gICAgaWYgKHR5cGUgPT09J25vZGUnKSB7XG4gICAgICAgIGNvbnRleHQucm93KCd7Jyk7XG4gICAgICAgIGNvbnRleHQuaW5kZW50KCk7XG4gICAgfVxuICAgIGlmIChub2RlVHlwZSA9PT0gJ2FycmF5Jykge1xuICAgICAgICBjb250ZXh0LnJvdygnXCJfdFwiOiBcImFcIiwnLCAnQXJyYXkgZGVsdGEgKG1lbWJlciBuYW1lcyBpbmRpY2F0ZSBhcnJheSBpbmRpY2VzKScpO1xuICAgIH1cbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUucm9vdEVuZCA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUpIHtcbiAgICBpZiAodHlwZSA9PT0nbm9kZScpIHtcbiAgICAgICAgY29udGV4dC5pbmRlbnQoLTEpO1xuICAgICAgICBjb250ZXh0LnJvdygnfScpO1xuICAgIH1cbiAgICBjb250ZXh0Lm91dCgnPC90YWJsZT4nKTtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUJlZ2luID0gZnVuY3Rpb24oY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSkge1xuICAgIGNvbnRleHQucm93KCcmcXVvdDsnK2tleSsnJnF1b3Q7OiB7Jyk7XG4gICAgaWYgKHR5cGUgPT09ICdub2RlJykge1xuICAgICAgICBjb250ZXh0LmluZGVudCgpO1xuICAgIH1cbiAgICBpZiAobm9kZVR5cGUgPT09ICdhcnJheScpIHtcbiAgICAgICAgY29udGV4dC5yb3coJ1wiX3RcIjogXCJhXCIsJywgJ0FycmF5IGRlbHRhIChtZW1iZXIgbmFtZXMgaW5kaWNhdGUgYXJyYXkgaW5kaWNlcyknKTtcbiAgICB9XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVFbmQgPSBmdW5jdGlvbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlLCBpc0xhc3QpIHtcbiAgICBpZiAodHlwZSA9PT0nbm9kZScpIHtcbiAgICAgICAgY29udGV4dC5pbmRlbnQoLTEpO1xuICAgIH1cbiAgICBjb250ZXh0LnJvdygnfScgKyAoaXNMYXN0ID8gJycgOiAnLCcpKTtcbn07XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IGZhbHNlICovXG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X3VuY2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybjtcbn07XG5cbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkZXN0aW5hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybjtcbn07XG5cblxuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbm9kZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gICAgLy8gcmVjdXJzZVxuICAgIHRoaXMuZm9ybWF0RGVsdGFDaGlsZHJlbihjb250ZXh0LCBkZWx0YSwgbGVmdCk7XG59O1xuXG52YXIgd3JhcFByb3BlcnR5TmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gJzxwcmUgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9ja1wiPiZxdW90OycgKyBuYW1lICsgJyZxdW90OzwvcHJlPic7XG59O1xuXG52YXIgZGVsdGFBbm5vdGF0aW9ucyA9IHtcbiAgICBhZGRlZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgICAgICB2YXIgZm9ybWF0TGVnZW5kID0gJyA8cHJlPihbbmV3VmFsdWVdKTwvcHJlPic7XG4gICAgICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHJldHVybiAnbmV3IHZhbHVlJyArIGZvcm1hdExlZ2VuZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxlZnRLZXkgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2luc2VydCBhdCBpbmRleCAnICsgbGVmdEtleSArIGZvcm1hdExlZ2VuZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2FkZCBwcm9wZXJ0eSAnICsgd3JhcFByb3BlcnR5TmFtZShsZWZ0S2V5KSArIGZvcm1hdExlZ2VuZDtcbiAgICB9LFxuICAgIG1vZGlmaWVkOiBmdW5jdGlvbihkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5KSB7XG4gICAgICAgIHZhciBmb3JtYXRMZWdlbmQgPSAnIDxwcmU+KFtwcmV2aW91c1ZhbHVlLCBuZXdWYWx1ZV0pPC9wcmU+JztcbiAgICAgICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuICdtb2RpZnkgdmFsdWUnICsgZm9ybWF0TGVnZW5kO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiAnbW9kaWZ5IGF0IGluZGV4ICcgKyBsZWZ0S2V5ICsgZm9ybWF0TGVnZW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnbW9kaWZ5IHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpICsgZm9ybWF0TGVnZW5kO1xuICAgIH0sXG4gICAgZGVsZXRlZDogZnVuY3Rpb24oZGVsdGEsIGxlZnQsIGtleSwgbGVmdEtleSkge1xuICAgICAgICB2YXIgZm9ybWF0TGVnZW5kID0gJyA8cHJlPihbcHJldmlvdXNWYWx1ZSwgMCwgMF0pPC9wcmU+JztcbiAgICAgICAgaWYgKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuICdkZWxldGUgdmFsdWUnICsgZm9ybWF0TGVnZW5kO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbGVmdEtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiAncmVtb3ZlIGluZGV4ICcgKyBsZWZ0S2V5ICsgZm9ybWF0TGVnZW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnZGVsZXRlIHByb3BlcnR5ICcgKyB3cmFwUHJvcGVydHlOYW1lKGxlZnRLZXkpICsgZm9ybWF0TGVnZW5kO1xuICAgIH0sXG4gICAgbW92ZWQ6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICAgICAgcmV0dXJuICdtb3ZlIGZyb20gPHNwYW4gdGl0bGU9XCIocG9zaXRpb24gdG8gcmVtb3ZlIGF0IG9yaWdpbmFsIHN0YXRlKVwiPmluZGV4ICcgK1xuICAgICAgICAgICAgbGVmdEtleSArICc8L3NwYW4+IHRvICcgK1xuICAgICAgICAgICAgJzxzcGFuIHRpdGxlPVwiKHBvc2l0aW9uIHRvIGluc2VydCBhdCBmaW5hbCBzdGF0ZSlcIj5pbmRleCAnICtcbiAgICAgICAgICAgIGRlbHRhWzFdICsgJzwvc3Bhbj4nO1xuICAgIH0sXG4gICAgdGV4dGRpZmY6IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXkpIHtcbiAgICAgICAgdmFyIGxvY2F0aW9uID0gKHR5cGVvZiBsZWZ0S2V5ID09PSAndW5kZWZpbmVkJykgP1xuICAgICAgICAgICAgJycgOiAoXG4gICAgICAgICAgICAgICAgKHR5cGVvZiBsZWZ0S2V5ID09PSAnbnVtYmVyJykgP1xuICAgICAgICAgICAgICAgICcgYXQgaW5kZXggJyArIGxlZnRLZXkgOlxuICAgICAgICAgICAgICAgICcgYXQgcHJvcGVydHkgJyArIHdyYXBQcm9wZXJ0eU5hbWUobGVmdEtleSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiAndGV4dCBkaWZmJyArIGxvY2F0aW9uICsgJywgZm9ybWF0IGlzICcgK1xuICAgICAgICAnPGEgaHJlZj1cImh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvZ29vZ2xlLWRpZmYtbWF0Y2gtcGF0Y2gvd2lraS9VbmlkaWZmXCI+JyArXG4gICAgICAgICdhIHZhcmlhdGlvbiBvZiBVbmlkaWZmPC9hPic7XG4gICAgfVxufTtcblxudmFyIGZvcm1hdEFueUNoYW5nZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gICAgdmFyIGRlbHRhVHlwZSA9IHRoaXMuZ2V0RGVsdGFUeXBlKGRlbHRhKTtcbiAgICB2YXIgYW5ub3RhdG9yID0gZGVsdGFBbm5vdGF0aW9uc1tkZWx0YVR5cGVdO1xuICAgIHZhciBodG1sTm90ZSA9IGFubm90YXRvciAmJiBhbm5vdGF0b3IuYXBwbHkoYW5ub3RhdG9yLFxuICAgICAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICB2YXIganNvbiA9IEpTT04uc3RyaW5naWZ5KGRlbHRhLCBudWxsLCAyKTtcbiAgICBpZiAoZGVsdGFUeXBlID09PSAndGV4dGRpZmYnKSB7XG4gICAgICAgIC8vIHNwbGl0IHRleHQgZGlmZnMgbGluZXNcbiAgICAgICAganNvbiA9IGpzb24uc3BsaXQoJ1xcXFxuJykuam9pbignXFxcXG5cIitcXG4gICBcIicpO1xuICAgIH1cbiAgICBjb250ZXh0LmluZGVudCgpO1xuICAgIGNvbnRleHQucm93KGpzb24sIGh0bWxOb3RlKTtcbiAgICBjb250ZXh0LmluZGVudCgtMSk7XG59O1xuXG5Bbm5vdGF0ZWRGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9hZGRlZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vZGlmaWVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfZGVsZXRlZCA9IGZvcm1hdEFueUNoYW5nZTtcbkFubm90YXRlZEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkID0gZm9ybWF0QW55Q2hhbmdlO1xuQW5ub3RhdGVkRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdGV4dGRpZmYgPSBmb3JtYXRBbnlDaGFuZ2U7XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IHRydWUgKi9cblxuZXhwb3J0cy5Bbm5vdGF0ZWRGb3JtYXR0ZXIgPSBBbm5vdGF0ZWRGb3JtYXR0ZXI7XG5cbnZhciBkZWZhdWx0SW5zdGFuY2U7XG5cbmV4cG9ydHMuZm9ybWF0ID0gZnVuY3Rpb24oZGVsdGEsIGxlZnQpIHtcbiAgICBpZiAoIWRlZmF1bHRJbnN0YW5jZSkge1xuICAgICAgICBkZWZhdWx0SW5zdGFuY2UgPSBuZXcgQW5ub3RhdGVkRm9ybWF0dGVyKCk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZm9ybWF0KGRlbHRhLCBsZWZ0KTtcbn07IiwiXG52YXIgaXNBcnJheSA9ICh0eXBlb2YgQXJyYXkuaXNBcnJheSA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgIC8vIHVzZSBuYXRpdmUgZnVuY3Rpb25cbiAgICBBcnJheS5pc0FycmF5IDpcbiAgICAvLyB1c2UgaW5zdGFuY2VvZiBvcGVyYXRvclxuICAgIGZ1bmN0aW9uKGEpIHtcbiAgICAgICAgcmV0dXJuIGEgaW5zdGFuY2VvZiBBcnJheTtcbiAgICB9O1xuXG52YXIgZ2V0T2JqZWN0S2V5cyA9IHR5cGVvZiBPYmplY3Qua2V5cyA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgZnVuY3Rpb24ob2JqKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopO1xuICAgIH0gOiBmdW5jdGlvbihvYmopIHtcbiAgICAgICAgdmFyIG5hbWVzID0gW107XG4gICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBuYW1lcy5wdXNoKHByb3BlcnR5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmFtZXM7XG4gICAgfTtcblxudmFyIHRyaW1VbmRlcnNjb3JlID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgaWYgKHN0ci5zdWJzdHIoMCwgMSkgPT09ICdfJykge1xuICAgICAgICByZXR1cm4gc3RyLnNsaWNlKDEpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufTtcblxudmFyIGFycmF5S2V5VG9Tb3J0TnVtYmVyID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgaWYgKGtleSA9PT0gJ190Jykge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGtleS5zdWJzdHIoMCwgMSkgPT09ICdfJykge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGtleS5zbGljZSgxKSwgMTApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGtleSwgMTApICsgMC4xO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFycmF5S2V5Q29tcGFyZXIgPSBmdW5jdGlvbihrZXkxLCBrZXkyKSB7XG4gICAgcmV0dXJuIGFycmF5S2V5VG9Tb3J0TnVtYmVyKGtleTEpIC0gYXJyYXlLZXlUb1NvcnROdW1iZXIoa2V5Mik7XG59O1xuXG52YXIgQmFzZUZvcm1hdHRlciA9IGZ1bmN0aW9uIEJhc2VGb3JtYXR0ZXIoKSB7XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICAgIHZhciBjb250ZXh0ID0ge307XG4gICAgdGhpcy5wcmVwYXJlQ29udGV4dChjb250ZXh0KTtcbiAgICB0aGlzLnJlY3Vyc2UoY29udGV4dCwgZGVsdGEsIGxlZnQpO1xuICAgIHJldHVybiB0aGlzLmZpbmFsaXplKGNvbnRleHQpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucHJlcGFyZUNvbnRleHQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgY29udGV4dC5idWZmZXIgPSBbXTtcbiAgICBjb250ZXh0Lm91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlci5wdXNoLmFwcGx5KHRoaXMuYnVmZmVyLCBhcmd1bWVudHMpO1xuICAgIH07XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS50eXBlRm9ybWF0dHRlck5vdEZvdW5kID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGFUeXBlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3QgZm9ybWF0IGRlbHRhIHR5cGU6ICcgKyBkZWx0YVR5cGUpO1xufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICAgIHJldHVybiBlcnIudG9TdHJpbmcoKTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZpbmFsaXplID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgIGlmIChpc0FycmF5KGNvbnRleHQuYnVmZmVyKSkge1xuICAgICAgICByZXR1cm4gY29udGV4dC5idWZmZXIuam9pbignJyk7XG4gICAgfVxufTtcblxuQmFzZUZvcm1hdHRlci5wcm90b3R5cGUucmVjdXJzZSA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0LCBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSwgaXNMYXN0KSB7XG4gICAgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGtleSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIHR5cGUgPSB0aGlzLmdldERlbHRhVHlwZShkZWx0YSwgbW92ZWRGcm9tKTtcbiAgICB2YXIgbm9kZVR5cGUgPSB0eXBlID09PSAnbm9kZScgPyAoZGVsdGEuX3QgPT09ICdhJyA/ICdhcnJheScgOiAnb2JqZWN0JykgOiAnJztcblxuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm5vZGVCZWdpbihjb250ZXh0LCBrZXksIGxlZnRLZXksIHR5cGUsIG5vZGVUeXBlLCBpc0xhc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucm9vdEJlZ2luKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZUZvcm1hdHR0ZXI7XG4gICAgdHJ5IHtcbiAgICAgICAgdHlwZUZvcm1hdHR0ZXIgPSB0aGlzWydmb3JtYXRfJyArIHR5cGVdIHx8IHRoaXMudHlwZUZvcm1hdHR0ZXJOb3RGb3VuZChjb250ZXh0LCB0eXBlKTtcbiAgICAgICAgdHlwZUZvcm1hdHR0ZXIuY2FsbCh0aGlzLCBjb250ZXh0LCBkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICB0aGlzLnR5cGVGb3JtYXR0dGVyRXJyb3JGb3JtYXR0ZXIoY29udGV4dCwgZXJyLCBkZWx0YSwgbGVmdCwga2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20pO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm5vZGVFbmQoY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSwgaXNMYXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvb3RFbmQoY29udGV4dCwgdHlwZSwgbm9kZVR5cGUpO1xuICAgIH1cbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdERlbHRhQ2hpbGRyZW4gPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSwgbGVmdCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmZvckVhY2hEZWx0YUtleShkZWx0YSwgbGVmdCwgZnVuY3Rpb24oa2V5LCBsZWZ0S2V5LCBtb3ZlZEZyb20sIGlzTGFzdCkge1xuICAgICAgICBzZWxmLnJlY3Vyc2UoY29udGV4dCwgZGVsdGFba2V5XSwgbGVmdCA/IGxlZnRbbGVmdEtleV0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBrZXksIGxlZnRLZXksIG1vdmVkRnJvbSwgaXNMYXN0KTtcbiAgICB9KTtcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLmZvckVhY2hEZWx0YUtleSA9IGZ1bmN0aW9uKGRlbHRhLCBsZWZ0LCBmbikge1xuICAgIHZhciBrZXlzID0gZ2V0T2JqZWN0S2V5cyhkZWx0YSk7XG4gICAgdmFyIGFycmF5S2V5cyA9IGRlbHRhLl90ID09PSAnYSc7XG4gICAgdmFyIG1vdmVEZXN0aW5hdGlvbnMgPSB7fTtcbiAgICB2YXIgbmFtZTtcbiAgICBpZiAodHlwZW9mIGxlZnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGZvciAobmFtZSBpbiBsZWZ0KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlbHRhW25hbWVdID09PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICAgICgoIWFycmF5S2V5cykgfHwgdHlwZW9mIGRlbHRhWydfJyArIG5hbWVdID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICBrZXlzLnB1c2gobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gbG9vayBmb3IgbW92ZSBkZXN0aW5hdGlvbnNcbiAgICBmb3IgKG5hbWUgaW4gZGVsdGEpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gZGVsdGFbbmFtZV07XG4gICAgICAgIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZVsyXSA9PT0gMykge1xuICAgICAgICAgICAgbW92ZURlc3RpbmF0aW9uc1t2YWx1ZVsxXS50b1N0cmluZygpXSA9IHZhbHVlWzBdO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5jbHVkZU1vdmVEZXN0aW5hdGlvbnMgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCh0eXBlb2YgbGVmdCA9PT0gJ3VuZGVmaW5lZCcpICYmXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZGVsdGFbdmFsdWVbMV1dID09PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5cy5wdXNoKHZhbHVlWzFdLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoYXJyYXlLZXlzKSB7XG4gICAgICAgIGtleXMuc29ydChhcnJheUtleUNvbXBhcmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBrZXlzLnNvcnQoKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaW5kZXggPSAwLCBsZW5ndGggPSBrZXlzLmxlbmd0aDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXNbaW5kZXhdO1xuICAgICAgICBpZiAoYXJyYXlLZXlzICYmIGtleSA9PT0gJ190JykgeyBjb250aW51ZTsgfVxuICAgICAgICB2YXIgbGVmdEtleSA9IGFycmF5S2V5cyA/XG4gICAgICAgICAgICAodHlwZW9mIGtleSA9PT0gJ251bWJlcicgPyBrZXkgOiBwYXJzZUludCh0cmltVW5kZXJzY29yZShrZXkpLCAxMCkpIDpcbiAgICAgICAgICAgIGtleTtcbiAgICAgICAgdmFyIGlzTGFzdCA9IChpbmRleCA9PT0gbGVuZ3RoIC0gMSk7XG4gICAgICAgIGZuKGtleSwgbGVmdEtleSwgbW92ZURlc3RpbmF0aW9uc1tsZWZ0S2V5XSwgaXNMYXN0KTtcbiAgICB9XG59O1xuXG5CYXNlRm9ybWF0dGVyLnByb3RvdHlwZS5nZXREZWx0YVR5cGUgPSBmdW5jdGlvbihkZWx0YSwgbW92ZWRGcm9tKSB7XG4gICAgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb3ZlZEZyb20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21vdmVkZXN0aW5hdGlvbic7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICd1bmNoYW5nZWQnO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheShkZWx0YSkpIHtcbiAgICAgICAgaWYgKGRlbHRhLmxlbmd0aCA9PT0gMSkgeyByZXR1cm4gJ2FkZGVkJzsgfVxuICAgICAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAyKSB7IHJldHVybiAnbW9kaWZpZWQnOyB9XG4gICAgICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDMgJiYgZGVsdGFbMl0gPT09IDApIHsgcmV0dXJuICdkZWxldGVkJzsgfVxuICAgICAgICBpZiAoZGVsdGEubGVuZ3RoID09PSAzICYmIGRlbHRhWzJdID09PSAyKSB7IHJldHVybiAndGV4dGRpZmYnOyB9XG4gICAgICAgIGlmIChkZWx0YS5sZW5ndGggPT09IDMgJiYgZGVsdGFbMl0gPT09IDMpIHsgcmV0dXJuICdtb3ZlZCc7IH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWx0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuICdub2RlJztcbiAgICB9XG4gICAgcmV0dXJuICd1bmtub3duJztcbn07XG5cbkJhc2VGb3JtYXR0ZXIucHJvdG90eXBlLnBhcnNlVGV4dERpZmYgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICB2YXIgbGluZXMgPSB2YWx1ZS5zcGxpdCgnXFxuQEAgJyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgdmFyIGxpbmVPdXRwdXQgPSB7XG4gICAgICAgICAgICBwaWVjZXM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIHZhciBsb2NhdGlvbiA9IC9eKD86QEAgKT9bLStdPyhcXGQrKSwoXFxkKykvLmV4ZWMobGluZSkuc2xpY2UoMSk7XG4gICAgICAgIGxpbmVPdXRwdXQubG9jYXRpb24gPSB7XG4gICAgICAgICAgICBsaW5lOiBsb2NhdGlvblswXSxcbiAgICAgICAgICAgIGNocjogbG9jYXRpb25bMV1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHBpZWNlcyA9IGxpbmUuc3BsaXQoJ1xcbicpLnNsaWNlKDEpO1xuICAgICAgICBmb3IgKHZhciBwaWVjZUluZGV4ID0gMCwgcGllY2VzTGVuZ3RoID0gcGllY2VzLmxlbmd0aDsgcGllY2VJbmRleCA8IHBpZWNlc0xlbmd0aDsgcGllY2VJbmRleCsrKSB7XG4gICAgICAgICAgICB2YXIgcGllY2UgPSBwaWVjZXNbcGllY2VJbmRleF07XG4gICAgICAgICAgICBpZiAoIXBpZWNlLmxlbmd0aCkgeyBjb250aW51ZTsgfVxuICAgICAgICAgICAgdmFyIHBpZWNlT3V0cHV0ID0geyB0eXBlOiAnY29udGV4dCcgfTtcbiAgICAgICAgICAgIGlmIChwaWVjZS5zdWJzdHIoMCwgMSkgPT09ICcrJykge1xuICAgICAgICAgICAgICAgIHBpZWNlT3V0cHV0LnR5cGUgPSAnYWRkZWQnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwaWVjZS5zdWJzdHIoMCwgMSkgPT09ICctJykge1xuICAgICAgICAgICAgICAgIHBpZWNlT3V0cHV0LnR5cGUgPSAnZGVsZXRlZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwaWVjZU91dHB1dC50ZXh0ID0gcGllY2Uuc2xpY2UoMSk7XG4gICAgICAgICAgICBsaW5lT3V0cHV0LnBpZWNlcy5wdXNoKHBpZWNlT3V0cHV0KTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXQucHVzaChsaW5lT3V0cHV0KTtcbiAgICB9XG4gICAgcmV0dXJuIG91dHB1dDtcbn07XG5cbmV4cG9ydHMuQmFzZUZvcm1hdHRlciA9IEJhc2VGb3JtYXR0ZXI7XG5cblxuIiwiXG52YXIgYmFzZSA9IHJlcXVpcmUoJy4vYmFzZScpO1xudmFyIEJhc2VGb3JtYXR0ZXIgPSBiYXNlLkJhc2VGb3JtYXR0ZXI7XG5cbnZhciBIdG1sRm9ybWF0dGVyID0gZnVuY3Rpb24gSHRtbEZvcm1hdHRlcigpIHtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlID0gbmV3IEJhc2VGb3JtYXR0ZXIoKTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUudHlwZUZvcm1hdHR0ZXJFcnJvckZvcm1hdHRlciA9IGZ1bmN0aW9uKGNvbnRleHQsIGVycikge1xuICAgIGNvbnRleHQub3V0KCc8cHJlIGNsYXNzPVwianNvbmRpZmZwYXRjaC1lcnJvclwiPicgKyBlcnIgKyAnPC9wcmU+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRWYWx1ZSA9IGZ1bmN0aW9uKGNvbnRleHQsIHZhbHVlKSB7XG4gICAgY29udGV4dC5vdXQoJzxwcmU+JyArIEpTT04uc3RyaW5naWZ5KHZhbHVlLCBudWxsLCAyKSArICc8L3ByZT4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdFRleHREaWZmU3RyaW5nID0gZnVuY3Rpb24oY29udGV4dCwgdmFsdWUpIHtcbiAgICB2YXIgbGluZXMgPSB0aGlzLnBhcnNlVGV4dERpZmYodmFsdWUpO1xuICAgIGNvbnRleHQub3V0KCc8dWwgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmXCI+Jyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgY29udGV4dC5vdXQoJzxsaT4nICtcbiAgICAgICAgJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXRleHRkaWZmLWxvY2F0aW9uXCI+JyArXG4gICAgICAgICc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZS1udW1iZXJcIj4nICtcbiAgICAgICAgbGluZS5sb2NhdGlvbi5saW5lICtcbiAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgJzxzcGFuIGNsYXNzPVwianNvbmRpZmZwYXRjaC10ZXh0ZGlmZi1jaGFyXCI+JyArXG4gICAgICAgIGxpbmUubG9jYXRpb24uY2hyICtcbiAgICAgICAgJzwvc3Bhbj4nICtcbiAgICAgICAgJzwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtbGluZVwiPicpO1xuICAgICAgICB2YXIgcGllY2VzID0gbGluZS5waWVjZXM7XG4gICAgICAgIGZvciAodmFyIHBpZWNlSW5kZXggPSAwLCBwaWVjZXNMZW5ndGggPSBwaWVjZXMubGVuZ3RoOyBwaWVjZUluZGV4IDwgcGllY2VzTGVuZ3RoOyBwaWVjZUluZGV4KyspIHtcbiAgICAgICAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1twaWVjZUluZGV4XTtcbiAgICAgICAgICAgIGNvbnRleHQub3V0KCc8c3BhbiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdGV4dGRpZmYtJyArIHBpZWNlLnR5cGUgKyAnXCI+JyArXG4gICAgICAgICAgICAgICAgcGllY2UudGV4dCArICc8L3NwYW4+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5vdXQoJzwvZGl2PjwvbGk+Jyk7XG4gICAgfVxuICAgIGNvbnRleHQub3V0KCc8L3VsPicpO1xufTtcblxudmFyIGFkanVzdEFycm93cyA9IGZ1bmN0aW9uIGpzb25kaWZmcGF0Y2hIdG1sRm9ybWF0dGVyQWRqdXN0QXJyb3dzKG5vZGUpIHtcbiAgICBub2RlID0gbm9kZSB8fCBkb2N1bWVudDtcbiAgICB2YXIgZ2V0RWxlbWVudFRleHQgPSBmdW5jdGlvbihlbCkge1xuICAgICAgICByZXR1cm4gZWwudGV4dENvbnRlbnQgfHwgZWwuaW5uZXJUZXh0O1xuICAgIH07XG4gICAgdmFyIGVhY2hCeVF1ZXJ5ID0gZnVuY3Rpb24oZWwsIHF1ZXJ5LCBmbikge1xuICAgICAgICB2YXIgZWxlbXMgPSBlbC5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGZuKGVsZW1zW2ldKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGVhY2hDaGlsZHJlbiA9IGZ1bmN0aW9uKGVsLCBmbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVsLmNoaWxkcmVuLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgZm4oZWwuY2hpbGRyZW5baV0sIGkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBlYWNoQnlRdWVyeShub2RlLCAnLmpzb25kaWZmcGF0Y2gtYXJyb3cnLCBmdW5jdGlvbihhcnJvdykge1xuICAgICAgICB2YXIgYXJyb3dQYXJlbnQgPSBhcnJvdy5wYXJlbnROb2RlO1xuICAgICAgICB2YXIgc3ZnID0gYXJyb3cuY2hpbGRyZW5bMF0sIHBhdGggPSBzdmcuY2hpbGRyZW5bMV07XG4gICAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSBnZXRFbGVtZW50VGV4dChhcnJvd1BhcmVudC5xdWVyeVNlbGVjdG9yKCcuanNvbmRpZmZwYXRjaC1tb3ZlZC1kZXN0aW5hdGlvbicpKTtcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGFycm93UGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgIHZhciBkZXN0aW5hdGlvbkVsZW07XG4gICAgICAgIGVhY2hDaGlsZHJlbihjb250YWluZXIsIGZ1bmN0aW9uKGNoaWxkKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGQuZ2V0QXR0cmlidXRlKCdkYXRhLWtleScpID09PSBkZXN0aW5hdGlvbikge1xuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uRWxlbSA9IGNoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFkZXN0aW5hdGlvbkVsZW0pIHsgcmV0dXJuOyB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBkZXN0aW5hdGlvbkVsZW0ub2Zmc2V0VG9wIC0gYXJyb3dQYXJlbnQub2Zmc2V0VG9wO1xuICAgICAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgTWF0aC5hYnMoZGlzdGFuY2UpICsgNik7XG4gICAgICAgICAgICBhcnJvdy5zdHlsZS50b3AgPSAoLSA4ICsgKGRpc3RhbmNlID4gMCA/IDAgOiBkaXN0YW5jZSkpICsgJ3B4JztcbiAgICAgICAgICAgIHZhciBjdXJ2ZSA9IGRpc3RhbmNlID4gMCA/XG4gICAgICAgICAgICAgICAgJ00zMCwwIFEtMTAsJyArIE1hdGgucm91bmQoZGlzdGFuY2UgLyAyKSArICcgMjYsJyArIChkaXN0YW5jZSAtIDQpIDpcbiAgICAgICAgICAgICAgICAnTTMwLCcgKyAoLWRpc3RhbmNlKSArICcgUS0xMCwnICsgTWF0aC5yb3VuZCgtZGlzdGFuY2UgLyAyKSArICcgMjYsNCc7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIGN1cnZlKTtcbiAgICAgICAgICAgIHN2Zy5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLnJvb3RCZWdpbiA9IGZ1bmN0aW9uKGNvbnRleHQsIHR5cGUsIG5vZGVUeXBlKSB7XG4gICAgdmFyIG5vZGVDbGFzcyA9ICdqc29uZGlmZnBhdGNoLScgKyB0eXBlICtcbiAgICAgICAgKG5vZGVUeXBlID8gJyBqc29uZGlmZnBhdGNoLWNoaWxkLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgOiAnJyk7XG4gICAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLWRlbHRhICcgKyBub2RlQ2xhc3MgKyAnXCI+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5yb290RW5kID0gZnVuY3Rpb24oY29udGV4dCkge1xuICAgIGNvbnRleHQub3V0KCc8L2Rpdj4nICsgKGNvbnRleHQuaGFzQXJyb3dzID9cbiAgICAgICAgKCc8c2NyaXB0IHR5cGU9XCJ0ZXh0L2phdmFzY3JpcHRcIj5zZXRUaW1lb3V0KCcgK1xuICAgICAgICAgICAgYWRqdXN0QXJyb3dzLnRvU3RyaW5nKCkgK1xuICAgICAgICAgICAgJywxMCk7PC9zY3JpcHQ+JykgOiAnJykpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUubm9kZUJlZ2luID0gZnVuY3Rpb24oY29udGV4dCwga2V5LCBsZWZ0S2V5LCB0eXBlLCBub2RlVHlwZSkge1xuICAgIHZhciBub2RlQ2xhc3MgPSAnanNvbmRpZmZwYXRjaC0nICsgdHlwZSArXG4gICAgICAgIChub2RlVHlwZSA/ICcganNvbmRpZmZwYXRjaC1jaGlsZC1ub2RlLXR5cGUtJyArIG5vZGVUeXBlIDogJycpO1xuICAgIGNvbnRleHQub3V0KCc8bGkgY2xhc3M9XCInICsgbm9kZUNsYXNzICsgJ1wiIGRhdGEta2V5PVwiJyArIGxlZnRLZXkgKyAnXCI+JyArXG4gICAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1wcm9wZXJ0eS1uYW1lXCI+JyArIGxlZnRLZXkgKyAnPC9kaXY+Jyk7XG59O1xuXG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLm5vZGVFbmQgPSBmdW5jdGlvbihjb250ZXh0KSB7XG4gICAgY29udGV4dC5vdXQoJzwvbGk+Jyk7XG59O1xuXG4vKiBqc2hpbnQgY2FtZWxjYXNlOiBmYWxzZSAqL1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdW5jaGFuZ2VkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgICBpZiAodHlwZW9mIGxlZnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuICAgIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICAgIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgbGVmdCk7XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vdmVkZXN0aW5hdGlvbiA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhLCBsZWZ0KSB7XG4gICAgaWYgKHR5cGVvZiBsZWZ0ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm47IH1cbiAgICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGxlZnQpO1xuICAgIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9ub2RlID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEsIGxlZnQpIHtcbiAgICAvLyByZWN1cnNlXG4gICAgdmFyIG5vZGVUeXBlID0gKGRlbHRhLl90ID09PSAnYScpID8gJ2FycmF5JzogJ29iamVjdCc7XG4gICAgY29udGV4dC5vdXQoJzx1bCBjbGFzcz1cImpzb25kaWZmcGF0Y2gtbm9kZSBqc29uZGlmZnBhdGNoLW5vZGUtdHlwZS0nICsgbm9kZVR5cGUgKyAnXCI+Jyk7XG4gICAgdGhpcy5mb3JtYXREZWx0YUNoaWxkcmVuKGNvbnRleHQsIGRlbHRhLCBsZWZ0KTtcbiAgICBjb250ZXh0Lm91dCgnPC91bD4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9hZGRlZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGRlbHRhKSB7XG4gICAgY29udGV4dC5vdXQoJzxkaXYgY2xhc3M9XCJqc29uZGlmZnBhdGNoLXZhbHVlXCI+Jyk7XG4gICAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVswXSk7XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PicpO1xufTtcblxuSHRtbEZvcm1hdHRlci5wcm90b3R5cGUuZm9ybWF0X21vZGlmaWVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWUganNvbmRpZmZwYXRjaC1sZWZ0LXZhbHVlXCI+Jyk7XG4gICAgdGhpcy5mb3JtYXRWYWx1ZShjb250ZXh0LCBkZWx0YVswXSk7XG4gICAgY29udGV4dC5vdXQoJzwvZGl2PicgK1xuICAgICAgICAnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWUganNvbmRpZmZwYXRjaC1yaWdodC12YWx1ZVwiPicpO1xuICAgIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMV0pO1xuICAgIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbkh0bWxGb3JtYXR0ZXIucHJvdG90eXBlLmZvcm1hdF9kZWxldGVkID0gZnVuY3Rpb24oY29udGV4dCwgZGVsdGEpIHtcbiAgICBjb250ZXh0Lm91dCgnPGRpdiBjbGFzcz1cImpzb25kaWZmcGF0Y2gtdmFsdWVcIj4nKTtcbiAgICB0aGlzLmZvcm1hdFZhbHVlKGNvbnRleHQsIGRlbHRhWzBdKTtcbiAgICBjb250ZXh0Lm91dCgnPC9kaXY+Jyk7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfbW92ZWQgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICAgIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICAgIHRoaXMuZm9ybWF0VmFsdWUoY29udGV4dCwgZGVsdGFbMF0pO1xuICAgIGNvbnRleHQub3V0KCc8L2Rpdj48ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1tb3ZlZC1kZXN0aW5hdGlvblwiPicgKyBkZWx0YVsxXSArICc8L2Rpdj4nKTtcblxuICAgIC8vIGRyYXcgYW4gU1ZHIGFycm93IGZyb20gaGVyZSB0byBtb3ZlIGRlc3RpbmF0aW9uXG4gICAgY29udGV4dC5vdXQoXG4gICAgICAgIC8qanNoaW50IG11bHRpc3RyOiB0cnVlICovXG4gICAgICAgICc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC1hcnJvd1wiIHN0eWxlPVwicG9zaXRpb246IHJlbGF0aXZlOyBsZWZ0OiAtMzRweDtcIj5cXFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMzBcIiBoZWlnaHQ9XCI2MFwiIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyBkaXNwbGF5OiBub25lO1wiPlxcXG4gICAgICAgIDxkZWZzPlxcXG4gICAgICAgICAgICA8bWFya2VyIGlkPVwibWFya2VyQXJyb3dcIiBtYXJrZXJXaWR0aD1cIjhcIiBtYXJrZXJIZWlnaHQ9XCI4XCIgcmVmeD1cIjJcIiByZWZ5PVwiNFwiXFxcbiAgICAgICAgICAgICAgICAgICBvcmllbnQ9XCJhdXRvXCIgbWFya2VyVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiPlxcXG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0xLDEgTDEsNyBMNyw0IEwxLDFcIiBzdHlsZT1cImZpbGw6ICMzMzk7XCIgLz5cXFxuICAgICAgICAgICAgPC9tYXJrZXI+XFxcbiAgICAgICAgPC9kZWZzPlxcXG4gICAgICAgIDxwYXRoIGQ9XCJNMzAsMCBRLTEwLDI1IDI2LDUwXCIgc3R5bGU9XCJzdHJva2U6ICM4OGY7IHN0cm9rZS13aWR0aDogMnB4OyBmaWxsOiBub25lO1xcXG4gICAgICAgIHN0cm9rZS1vcGFjaXR5OiAwLjU7IG1hcmtlci1lbmQ6IHVybCgjbWFya2VyQXJyb3cpO1wiPjwvcGF0aD5cXFxuICAgICAgICA8L3N2Zz5cXFxuICAgICAgICA8L2Rpdj4nKTtcbiAgICBjb250ZXh0Lmhhc0Fycm93cyA9IHRydWU7XG59O1xuXG5IdG1sRm9ybWF0dGVyLnByb3RvdHlwZS5mb3JtYXRfdGV4dGRpZmYgPSBmdW5jdGlvbihjb250ZXh0LCBkZWx0YSkge1xuICAgIGNvbnRleHQub3V0KCc8ZGl2IGNsYXNzPVwianNvbmRpZmZwYXRjaC12YWx1ZVwiPicpO1xuICAgIHRoaXMuZm9ybWF0VGV4dERpZmZTdHJpbmcoY29udGV4dCwgZGVsdGFbMF0pO1xuICAgIGNvbnRleHQub3V0KCc8L2Rpdj4nKTtcbn07XG5cbi8qIGpzaGludCBjYW1lbGNhc2U6IHRydWUgKi9cblxudmFyIHNob3dVbmNoYW5nZWQgPSBmdW5jdGlvbihzaG93LCBub2RlLCBkZWxheSkge1xuICAgIHZhciBlbCA9IG5vZGUgfHwgZG9jdW1lbnQuYm9keTtcbiAgICB2YXIgcHJlZml4ID0gJ2pzb25kaWZmcGF0Y2gtdW5jaGFuZ2VkLSc7XG4gICAgdmFyIGNsYXNzZXMgPSB7XG4gICAgICAgIHNob3dpbmc6IHByZWZpeCArICdzaG93aW5nJyxcbiAgICAgICAgaGlkaW5nOiBwcmVmaXggKyAnaGlkaW5nJyxcbiAgICAgICAgdmlzaWJsZTogcHJlZml4ICsgJ3Zpc2libGUnLFxuICAgICAgICBoaWRkZW46IHByZWZpeCArICdoaWRkZW4nLFxuICAgIH07XG4gICAgdmFyIGxpc3QgPSBlbC5jbGFzc0xpc3Q7XG4gICAgaWYgKCFsaXN0KSB7IHJldHVybjsgfVxuICAgIGlmICghZGVsYXkpIHtcbiAgICAgICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICAgICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRpbmcpO1xuICAgICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLmhpZGRlbik7XG4gICAgICAgIGlmIChzaG93ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5oaWRkZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHNob3cgPT09IGZhbHNlKSB7XG4gICAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgICAgIGxpc3QuYWRkKGNsYXNzZXMudmlzaWJsZSk7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGxpc3QuYWRkKGNsYXNzZXMuaGlkaW5nKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkaW5nKTtcbiAgICAgICAgbGlzdC5hZGQoY2xhc3Nlcy5zaG93aW5nKTtcbiAgICAgICAgbGlzdC5yZW1vdmUoY2xhc3Nlcy5oaWRkZW4pO1xuICAgIH1cbiAgICB2YXIgaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7XG4gICAgICAgIGFkanVzdEFycm93cyhlbCk7XG4gICAgfSwgMTAwKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuc2hvd2luZyk7XG4gICAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkaW5nKTtcbiAgICAgICAgaWYgKHNob3cgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBsaXN0LmFkZChjbGFzc2VzLmhpZGRlbik7XG4gICAgICAgICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlzdC5hZGQoY2xhc3Nlcy52aXNpYmxlKTtcbiAgICAgICAgICAgIGxpc3QucmVtb3ZlKGNsYXNzZXMuaGlkZGVuKTtcbiAgICAgICAgfVxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBsaXN0LnJlbW92ZShjbGFzc2VzLnZpc2libGUpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcbiAgICAgICAgfSwgZGVsYXkgKyA0MDApO1xuICAgIH0sIGRlbGF5KTtcbn07XG5cbnZhciBoaWRlVW5jaGFuZ2VkID0gZnVuY3Rpb24obm9kZSwgZGVsYXkpIHtcbiAgICByZXR1cm4gc2hvd1VuY2hhbmdlZChmYWxzZSwgbm9kZSwgZGVsYXkpO1xufTtcblxuZXhwb3J0cy5IdG1sRm9ybWF0dGVyID0gSHRtbEZvcm1hdHRlcjtcblxuZXhwb3J0cy5zaG93VW5jaGFuZ2VkID0gc2hvd1VuY2hhbmdlZDtcblxuZXhwb3J0cy5oaWRlVW5jaGFuZ2VkID0gaGlkZVVuY2hhbmdlZDtcblxudmFyIGRlZmF1bHRJbnN0YW5jZTtcblxuZXhwb3J0cy5mb3JtYXQgPSBmdW5jdGlvbihkZWx0YSwgbGVmdCkge1xuICAgIGlmICghZGVmYXVsdEluc3RhbmNlKSB7XG4gICAgICAgIGRlZmF1bHRJbnN0YW5jZSA9IG5ldyBIdG1sRm9ybWF0dGVyKCk7XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0SW5zdGFuY2UuZm9ybWF0KGRlbHRhLCBsZWZ0KTtcbn07IiwiKGZ1bmN0aW9uIChwcm9jZXNzKXtcblxuZXhwb3J0cy5odG1sID0gcmVxdWlyZSgnLi9odG1sJyk7XG5leHBvcnRzLmFubm90YXRlZCA9IHJlcXVpcmUoJy4vYW5ub3RhdGVkJyk7XG5cbmlmICghcHJvY2Vzcy5icm93c2VyKSB7XG5cdHZhciBjb25zb2xlTW9kdWxlTmFtZSA9ICcuL2NvbnNvbGUnO1xuXHRleHBvcnRzLmNvbnNvbGUgPSByZXF1aXJlKGNvbnNvbGVNb2R1bGVOYW1lKTtcbn1cblxufSkuY2FsbCh0aGlzLHJlcXVpcmUoJ19wcm9jZXNzJykpIl19
