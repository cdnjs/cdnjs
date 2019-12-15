/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.1
 * 
 * @license MIT, see http://github.com/asvd/intence
 * @copyright 2015 asvd <heliosframework@gmail.com> 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.dragscroll = {}));
    }
}(this,
function (exports) {
    // better compression
    var _window = window;
    var mousemove='mousemove';
    var mouseup='mouseup';
    var mousedown='mousedown';
    var addEventListener = 'addEventListener';
    var removeEventListener = 'removeEventListener';
    var clientX = 'clientX';
    var clientY = 'clientY';


    /**
     * Returns the actual scrolling element
     * 
     * @param {Element} elem to get scroller for
     * 
     * @returns {Element} scroller
     */
    var get_scroller = function(elem) {
        var scroller = elem;

        if (elem.className.indexOf('intence') != -1 &&
            typeof elem.scroller != 'undefined') {
            scroller = elem.scroller;
        }

        return scroller;
    }

    /**
     * Initializes the dragscroll events for the element
     * 
     * @param {Element} el
     */
    var drag = function(el){
        var lastClientX, lastClientY;
        var pushed = false;

        el.md = function(e) {
            pushed = true;
            lastClientX = e[clientX];
            lastClientY = e[clientY];

            e.preventDefault();
            e.stopPropagation();
        }

        el.mu = function() {
            if (pushed) {
                pushed = false;
            }
        }

        el.mm = function(e) {
            var scroller = get_scroller(el);

            if (pushed) {
                scroller.scrollLeft -= (e[clientX] - lastClientX);
                scroller.scrollTop -= (e[clientY] - lastClientY);

                lastClientX = e[clientX];
                lastClientY = e[clientY];
            }
        }

        el[addEventListener](mousedown, el.md, false);
        _window[addEventListener](mouseup, el.mu, false);
        _window[addEventListener](mousemove, el.mm, false);
    }

    
    /**
     * Removes dragscroll events for the element
     * 
     * @param {Element} el
     */
    var undrag = function(el) {
        el[removeEventListener](mousedown, el.md, false);
        _window[removeEventListener](mouseup, el.mu, false);
        _window[removeEventListener](mousemove, el.mm, false);
    }


    // dragged elements
    var dragged = [];

    /**
     * Runs through all dragged elements, removes dragscroll events
     */
    var destroyDrag = function() {
        for (var i = 0; i < dragged.length; i++) {
            undrag(dragged[i]);
        }
        dragged = [];
    }
    
    
    /**
     * Runs through all elements having the dragscroll class,
     * initializes the events
     */
    var createDrag = function() {
        var elems = document.getElementsByClassName('dragscroll');
        for (var i = 0; i < elems.length; i++) {
            drag(elems[i]);
            dragged.push(elems[i]);
        }
    }
      
    

    /**
     * Updates the dragscroll for the elments
     */
    var reset = function() {
        destroyDrag();
        createDrag();
    }
    


    if (document.readyState == "complete") {
        reset();
    } else {
        _window[addEventListener]("load", reset, false);
    }

    exports.reset = reset;
}));

