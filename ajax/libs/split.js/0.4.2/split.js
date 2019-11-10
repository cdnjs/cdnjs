
'use strict';

(function() {

var global = this;

// Array.isArray Polyfill
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

// Check if browser is IE8 or lower

var isIE8 = (function () {
    return (global.attachEvent && !global.addEventListener);
})();

// Get supported calc() prefix

var calc = (function () {
    var prefixes = ["", "-webkit-", "-moz-", "-o-"], el

    for (var i = 0; i < prefixes.length; i++) {
        el = document.createElement('div');
        el.style.cssText = "width:" + prefixes[i] + "calc(9px)";

        if (el.style.length) {
            return prefixes[i] + "calc"
        }
    }
})();

var Split = function (ids, options) {
    var dimension, clientDimension, clientAxis, position, gutterClass, pairs = [];

    // Set defaults

    options = typeof options !== 'undefined' ?  options : {};

    if (!options.gutterSize) options.gutterSize = 10;
    if (!options.minSize) options.minSize = 100;
    if (!options.snapOffset) options.snapOffset = 30;
    if (!options.direction) options.direction = 'horizontal';

    if (options.direction == 'horizontal') {
        dimension = 'width';
        clientDimension = 'clientWidth';
        clientAxis = 'clientX';
        position = 'left';
        gutterClass = 'gutter gutter-horizontal';
    } else if (options.direction == 'vertical') {
        dimension = 'height';
        clientDimension = 'clientWidth';
        clientAxis = 'clientY';
        position = 'top';
        gutterClass = 'gutter gutter-vertical';
    }

    // Event listeners for drag events, bound to a pair object.
    // Calculate the pair's position and size when dragging starts.
    // Prevent selection on start and re-enable it when done.

    var startDragging = function (e) {
            e.preventDefault();

            this.dragging = true;

            this.a.addEventListener('selectstart', preventSelection);
            this.a.addEventListener('dragstart', preventSelection);
            this.b.addEventListener('selectstart', preventSelection);
            this.b.addEventListener('dragstart', preventSelection);

            this.a.style.userSelect = 'none';
            this.a.style.webkitUserSelect = 'none';
            this.a.style.MozUserSelect = 'none';

            this.b.style.userSelect = 'none';
            this.b.style.webkitUserSelect = 'none';
            this.b.style.MozUserSelect = 'none';

            calculateSizes.call(this);

            if (options.onDragStart) {
                options.onDragStart();
            }
        },

        stopDragging = function () {
            this.dragging = false;

            this.a.removeEventListener('selectstart', preventSelection);
            this.a.removeEventListener('dragstart', preventSelection);
            this.b.removeEventListener('selectstart', preventSelection);
            this.b.removeEventListener('dragstart', preventSelection);

            this.a.style.userSelect = '';
            this.a.style.webkitUserSelect = '';
            this.a.style.MozUserSelect = '';

            this.b.style.userSelect = '';
            this.b.style.webkitUserSelect = '';
            this.b.style.MozUserSelect = '';

            if (options.onDragEnd) {
                options.onDragEnd();
            }
        },

        drag = function (e) {
            if (!this.dragging) return;

            // Get the relative position of the event from the first side of the
            // pair.

            var offset = e[clientAxis] - this.start;

            // If within snapOffset of min or max, set offset to min or max

            if (offset <=  this.aMin + options.snapOffset) {
                offset = this.aMin;
            } else if (offset >= this.size - this.bMin - options.snapOffset) {
                offset = this.size - this.bMin;
            }

            adjust.call(this, offset);

            if (options.onDrag) {
                options.onDrag();
            }
        },

        calculateSizes = function () {
            // Calculate the pairs size, and percentage of the parent size

            this.size = this.a.getBoundingClientRect()[dimension] + this.b.getBoundingClientRect()[dimension] + this.aGutterSize + this.bGutterSize;
            this.percentage = Math.min(this.size / this.parent[clientDimension] * 100, 100);
            this.start = this.a.getBoundingClientRect()[position];
        },

        adjust = function (offset) {
            // A size is the same as offset. B size is total size - A size.
            // Both sizes are calculated from the initial parent percentage.

            this.a.style[dimension] = calc + '(' + (offset / this.size * this.percentage) + '% - ' + this.aGutterSize + 'px)';
            this.b.style[dimension] = calc + '(' + (this.percentage - (offset / this.size * this.percentage)) + '% - ' + this.bGutterSize + 'px)';
        },

        fitMin = function () {
            if (this.a.getBoundingClientRect()[dimension] < this.aMin) {
                this.a.style[dimension] = (this.aMin - this.aGutterSize) + 'px';
                this.b.style[dimension] = (this.size - this.aMin - this.aGutterSize) + 'px';
            } else if (this.b.getBoundingClientRect()[dimension] < this.bMin) {
                this.a.style[dimension] = (this.size - this.bMin - this.bGutterSize) + 'px';
                this.b.style[dimension] = (this.bMin - this.bGutterSize) + 'px';
            }
        },

        fitMinReverse = function () {
            if (this.b.getBoundingClientRect()[dimension] < this.bMin) {
                this.a.style[dimension] = (this.size - this.bMin - this.bGutterSize) + 'px';
                this.b.style[dimension] = (this.bMin - this.bGutterSize) + 'px';
            } else if (this.a.getBoundingClientRect()[dimension] < this.aMin) {
                this.a.style[dimension] = (this.aMin - this.aGutterSize) + 'px';
                this.b.style[dimension] = (this.size - this.aMin - this.aGutterSize) + 'px';
            }
        },

        balancePairs = function (pairs) {
            for (var i = 0; i < pairs.length; i++) {
                calculateSizes.call(pairs[i]);
                fitMin.call(pairs[i]);
            };

            for (var i = pairs.length - 1; i >= 0; i--) {
                calculateSizes.call(pairs[i]);
                fitMinReverse.call(pairs[i]);
            };
        },

        preventSelection = function () { return false; },

        parent = document.getElementById(ids[0]).parentNode;

    if (!options.sizes) {
        var percent = 100 / ids.length;

        options.sizes = [];

        for (var i = 0; i < ids.length; i++) {
            options.sizes.push(percent);
        };
    }

    if (!Array.isArray(options.minSize)) {
        var minSizes = [];

        for (var i = 0; i < ids.length; i++) {
            minSizes.push(options.minSize);
        };

        options.minSize = minSizes;
    }

    for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]),
            isFirst = (i == 1),
            isLast = (i == ids.length - 1),
            gutterSize = options.gutterSize,
            pair;

        if (i > 0) {
            pair = {
                a: document.getElementById(ids[i - 1]),
                b: el,
                aMin: options.minSize[i - 1],
                bMin: options.minSize[i],
                dragging: false,
                parent: parent,
                isFirst: isFirst,
                isLast: isLast,
                direction: options.direction
            };

            // For first and last pairs, first and last gutter width is half.

            pair.aGutterSize = options.gutterSize;
            pair.bGutterSize = options.gutterSize;

            if (isFirst) {
                pair.aGutterSize = options.gutterSize / 2;
            }

            if (isLast) {
                pair.bGutterSize = options.gutterSize / 2;
            }
        }

        // IE9 and above
        if (!isIE8) {
            if (i > 0) {
                var gutter = document.createElement('div');

                gutter.className = gutterClass;
                gutter.style[dimension] = options.gutterSize + 'px';

                gutter.addEventListener('mousedown', startDragging.bind(pair));
                parent.addEventListener('mouseup', stopDragging.bind(pair));
                parent.addEventListener('mousemove', drag.bind(pair));
                parent.addEventListener('mouseleave', stopDragging.bind(pair));

                parent.insertBefore(gutter, el);

                pair.gutter = gutter;
            }

            if (i == 0 || i == ids.length - 1) {
                gutterSize = options.gutterSize / 2;
            }

            var size = calc + '(' + options.sizes[i] + '% - ' + gutterSize + 'px)';

        // IE8 and below
        } else {
            var size = options.sizes[i] + '%';
        }

        el.style[dimension] = size;

        if (i > 0) {
            pairs.push(pair);
        }
    }

    balancePairs(pairs);
};

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Split;
    }
    exports.Split = Split;
} else {
    global.Split = Split;
}

}).call(this);
