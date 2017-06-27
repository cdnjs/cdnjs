/*!
 * progressively 1.0.0
 * https://github.com/thinker3197/progressively
 * @license MIT licensed
 *
 * Copyright (C) 2016 Ashish
 */

;
(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(function() {
            return factory(root);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.progressively = factory(root);
    }
})(this, function(root) {

    'use strict';

    var progressively = {};

    var defaults, poll, imgload;

    imgload = function() {};

    function extend(primaryObject, secondaryObject) {
        var o = {};
        for (var prop in primaryObject) {
            o[prop] = secondaryObject.hasOwnProperty(prop) ? secondaryObject[prop] : primaryObject[prop];
        }
        return o;
    };

    function isHidden(el) {
        return (el.offsetParent === null);
    };

    function inView(el, view) {
        if (isHidden(el)) {
            return false;
        }

        var box = el.getBoundingClientRect();
        return (
            box.top >= 0 &&
            box.left >= 0 &&
            box.bottom <= (window.innerHeight || document.el.clientHeight) &&
            box.right <= (window.innerWidth || document.el.clientWidth));

    };

    function loadImg(el) {
        setTimeout(function() {
            var img = new Image();

            img.onload = function() {
                el.src = this.src;
                el.classList.remove('progressive--not-loaded');
                el.classList.add('progressive--is-loaded');
                imgload(el);
                progressively.check();
            };

            img.src = el.dataset.progressive;
        }, defaults.delay);
    };

    function listen() {
        if (!!poll)
            return;
        clearTimeout(poll);
        poll = setTimeout(function() {
            progressively.render();
            poll = null;
        }, defaults.throttle);
    }
    /*
     * default settings
     */

    defaults = {
        throttle: 300, //appropriate value, don't change unless intended
        delay: 100,
        afterload: function() {},
        imgload: function() {}
    };

    progressively.init = function(options) {
        options = options || {};

        defaults = extend(defaults, options);

        imgload = defaults.imgload || imgload;

        progressively.render();

        if (document.addEventListener) {
            root.addEventListener('scroll', listen, false);
            root.addEventListener('load', listen, false);
        } else {
            root.attachEvent('onscroll', listen);
            root.attachEvent('onload', listen);
        }
    };

    progressively.render = function() {
        var inodes = document.querySelectorAll('.progressive__img'),
            fnodes = document.querySelectorAll('.progressive'),
            elem;

        for (var i = inodes.length - 1; i >= 0; --i) {
            elem = inodes[i];

            if (inView(elem) && elem.classList.contains('progressive--not-loaded')) {
                loadImg(elem);
            }
        }

        if (!inodes.length || !fnodes.length) {
            this.drop();
        }
    };

    progressively.check = function() {
        var counter = 0,
            nodes = document.querySelectorAll('.progressive__img');
        for (var i = nodes.length - 1; i >= 0; --i) {
            if (nodes[i].classList.contains('progressive--is-loaded'))
                counter++;
        }
        if (counter === nodes.length - 1) {
            defaults.afterload();
        }
    }

    progressively.drop = function() {
        if (document.removeEventListener) {
            root.removeEventListener('scroll', listen);
        } else {
            root.detachEvent('onscroll', listen);
        }
        clearTimeout(poll);
    };

    return progressively;
});
