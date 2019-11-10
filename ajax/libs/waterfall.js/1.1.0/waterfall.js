/*!
   --------------------------------
   Waterfall.js
   --------------------------------
   + https://github.com/raphamorim/waterfall
   + version 1.1.0
   + Copyright 2016 Raphael Amorim & Israel Teixeira
   + Licensed under the MIT license
   + Documentation: https://github.com/raphamorim/waterfall
*/

(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('waterfall', function() {
            return factory;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        root.waterfall = factory;
    }
}(this, function waterfall(container) {
    if (typeof(container) === 'string')
        container = document.querySelector(container);

    function style(el) {
        return window.getComputedStyle(el);
    }

    function margin(name, el) {
        return parseFloat(style(el)['margin' + name]) || 0;
    }

    function px(n) {
        return n + 'px';
    }

    function y(el) {
        return parseFloat(el.style.top);
    }

    function x(el) {
        return parseFloat(el.style.left);
    }

    function width(el) {
        return parseFloat(style(el).width);
    }

    function height(el) {
        return parseFloat(style(el).height);
    }

    function bottom(el) {
        return y(el) + height(el) + margin('Bottom', el);
    }

    function right(el) {
        return x(el) + width(el) + margin('Right', el);
    }

    function sort(l) {
        l = l.sort(function(a, b) {
            var bottom_diff = bottom(b) - bottom(a);
            return bottom_diff || x(b) - x(a);
        });
    }

    var boundary = {
        els: [],
        add: function(el) {
            this.els.push(el);
            sort(this.els);
            this.els = this.els.slice(0, 3);
        },
        min: function() {
            return this.els[this.els.length - 1];
        },
        max: function() {
            return this.els[0];
        },
    };

    function placeEl(el, top, left) {
        el.style.position = 'absolute';
        el.style.top = top;
        el.style.left = left;
        boundary.add(el);
    }

    function placeFirstElement(el) {
        placeEl(el, '0px', px(margin('Left', el)));
    }

    function placeAtTheFirstLine(prev, el) {
        placeEl(el, prev.style.top, px(right(prev) + margin('Left', el)));
    }

    function placeAtTheSmallestColumn(minEl, el) {
        placeEl(el, px(bottom(minEl) + margin('Top', el)), px(x(minEl)));
    }

    function adjustContainer(container, maxEl) {
        container.style.position = 'relative';
        container.style.height = px(bottom(maxEl) + margin('Bottom', maxEl));
    }

    function thereIsSpace(els, i) {
        return right(els[i - 1]) + width(els[i]) <= width(container);
    }

    var els = container.children;

    if (els.length) {
        placeFirstElement(els[0]);
    }

    for (var i = 1; i < els.length && thereIsSpace(els, i); i++) {
        placeAtTheFirstLine(els[i - 1], els[i]);
    }

    for (; i < els.length; i++) {
        placeAtTheSmallestColumn(boundary.min(), els[i]);
    }

    adjustContainer(container, boundary.max());
}));