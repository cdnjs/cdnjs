/*!
 * Bootstrap without jQuery v0.4.1 for Bootstrap 3
 * By Daniel Davis under MIT License
 * https://github.com/tagawa/bootstrap-without-jquery
 */

(function() {
    'use strict';
    
    /*
     * Utility functions
     */
     
    // transitionend - source: https://stackoverflow.com/questions/5023514/how-do-i-normalize-css3-transition-functions-across-browsers#answer-9090128
    function transitionEndEventName() {
        var i,
            el = document.createElement('div'),
            transitions = {
                'transition':'transitionend',
                'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

        for (i in transitions) {
            if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
                return transitions[i];
            }
        }

        return false;
    }
    var transitionend = transitionEndEventName();
    
    // Get the potential max height of an element
    function getMaxHeight(element) {
        // Source: http://n12v.com/css-transition-to-from-auto/
        var prevHeight = element.style.height;
        element.style.height = 'auto';
        var maxHeight = getComputedStyle(element).height;
        element.style.height = prevHeight;
        element.offsetHeight; // force repaint
        return maxHeight;
    }
    
    /*
     * Collapse action
     * 1. Get list of all elements that are collapse triggers
     * 2. Add click event listener to these elements
     * 3. When clicked, change target element's class name from "collapse" to "collapsing"
     * 4. When action (collapse) is complete, change target element's class name from "collapsing" to "collapse in"
     * 5. Do the reverse, i.e. "collapse in" -> "collapsing" -> "collapse"
     */
     
    // Show a target element
    function show(element, trigger) {
        element.classList.remove('collapse');
        element.classList.add('collapsing');
        trigger.classList.remove('collapsed');
        trigger.setAttribute('aria-expanded', true);
        
        // Set element's height to its maximum height
        element.style.height = getMaxHeight(element);
        
        // Call the complete() function after the transition has finished
        if (transitionend) {
            element.addEventListener(transitionend, function() {
                complete(element);
            }, false);
        } else {
            // For browsers that don't support transitions (e.g. IE9 and lower);
            complete(element);
        }
    }
    
    // Hide a target element
    function hide(element, trigger) {
        element.classList.remove('collapse');
        element.classList.remove('in');
        element.classList.add('collapsing');
        trigger.classList.add('collapsed');
        trigger.setAttribute('aria-expanded', false);
        
        // Reset element's height
        element.style.height = getComputedStyle(element).height;
        element.offsetHeight; // force repaint
        element.style.height = '0px';
    }
    
    // Change classes once transition is complete
    function complete(element) {
        element.classList.remove('collapsing');
        element.classList.add('collapse');
        element.setAttribute('aria-expanded', false);
        
        // Check whether the element is unhidden
        if (element.style.height !== '0px') {
            element.classList.add('in');
            element.style.height = 'auto';
        }
    }

    // Start the collapse action on the chosen element
    function doCollapse(event) {
        // Get target element from data-target attribute
        event = event || window.event;
        var evTarget = event.currentTarget || event.srcElement;
        var dataTarget = evTarget.getAttribute('data-target');
        var target = document.querySelector(dataTarget);
        
        // Add the "in" class name when elements are unhidden
        if (target.classList.contains('in')) {
            hide(target, evTarget);
        } else {
            show(target, evTarget);
        }
        return false;
    }
    
    // Get all elements that are collapse triggers and add click event listeners
    var collapsibles = document.querySelectorAll('[data-toggle=collapse]');
    for (var i = 0, leni = collapsibles.length; i < leni; i++) {
        collapsibles[i].onclick = doCollapse;
    }
})();
