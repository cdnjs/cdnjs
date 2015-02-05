/*
 * motion.js 0.3.0
 * http://usablica.github.com/motion.js
 * MIT licensed
 *
 * Copyright (C) 2012 usabli.ca - Afshin Mehrabani (afshin.meh@gmail.com)
 */
window.motionJs = (function() {
    
    //version
    var version = "0.3.0";

    //Default motion.js configs
    var default_transition_duration = 0,
        default_transition_property = 'all',
        default_transition_timing_function = 'ease',
        verbose_mode = true;

    //Local variables
    var support_animation = false,
        property_prefix = '';

    /**
     * Do a transition with given parameters. This function accepts both Array and single Object as parameter.
     *
     * @param {Array|Object} motion_obj
     * @api public
     */
    function transition(motion_obj) {
        if(motion_obj instanceof Array) {
            for (var i = 0, motion_objects_len = motion_obj.length; i < motion_objects_len; i++) {
                _doTransition(motion_obj[i]);
            }
        } else if (motion_obj instanceof Object) {
            _doTransition(motion_obj);
        }
    }
    
    /**
     * Apply transition to a single element with given parameters
     *
     * @param {Object} item
     * @api private
     */
    function _doTransition(item) {
        //get all objects with given selector from DOM
        var motion_item = document.querySelectorAll(item.select);

        //each motion object can select multiple item, so we have an array
        if (motion_item && motion_item.length > 0) {
            for (var j = 0, motion_item_objects_len = motion_item.length; j < motion_item_objects_len; j++) {
                var actor_object = motion_item[j];
                //first, add the transition
                _set_transitionable(actor_object, item.property, item.timingFunction);
                //set the styles
                _set_style(actor_object, item.style);
                //set transition duration
                _set_transition_duration(actor_object, item.duration);
            }
            //set transition end callback
            if(item.end instanceof Function) {
                _set_transition_end_callack(motion_item[0], item.end);
            }
        }
    }
    
    /**
     * Set transition end callback
     *
     * @param {Object} actor_object
     * @param {Function} fn
     * @api private
     */
    function _set_transition_end_callack(actor_object, fn) {
        var transition_end_events = {
          '': 'transitionEnd',
          'O': 'otransitionend',
          'ms': 'msTransitionEnd',
          'Moz': 'transitionend',
          'Webkit': 'webkitTransitionEnd'
        };
        //in order to prevent firing callback for each css property, we use a flag and execute the callback one time
        var isCalled = false;
        actor_object.addEventListener(transition_end_events[property_prefix], function(args) {
            //only one time
            if(!isCalled) {
                isCalled = true;
                fn.call(this, args);
            }
        }, false);
    }

    /**
     * Used for setting transition duration
     *
     * @param {Object} actor_object
     * @api private
     */
    function _set_transition_duration(actor_object, duration) {
        var transition_duration = {};
        transition_duration['TransitionDuration'] = duration || default_transition_duration;
        _set_style(actor_object, transition_duration, true);
    }

    /**
     * Used for set transition ability to an element
     *
     * @param {Object} actor_object
     * @api private
     */
    function _set_transitionable(actor_object, property, timingFunction) {
        var actor_style = {};
        actor_style["TransitionProperty"] = property || default_transition_property;
        actor_style["TransitionTimingFunction"] = timingFunction || default_transition_timing_function;
        _set_style(actor_object, actor_style, true);
    }

    /**
     * Used for setting stylesheet to an object
     *
     * @param {Object} actor_object
     * @param {Object} styles
     * @api private
     */
    function _set_style(actor_object, styles, with_prefix) {
        var prefix = "";
        if (with_prefix) prefix = property_prefix;
        for (var style_prop in styles) {
            actor_object.style[prefix + style_prop] = styles[style_prop];
        }
    }

    /**
     * Detect animation support and set necessary variables
     * Check CSS3 animation ability code by https://developer.mozilla.org/en-US/docs/CSS/CSS_animations/Detecting_CSS_animation_support
     *
     * @api private
     */
    function _check_animation_support() {
        var domPrefixes = ['Webkit', 'Moz', 'O', 'ms', 'Khtml'],
            test_element = document.querySelector("html");

        if (test_element.style.animationName) {
            support_animation = true;
        } else {
            for (var i = 0, domPrefixLen = domPrefixes.length; i < domPrefixLen; i++) {
                if (test_element.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                    property_prefix = domPrefixes[i];
                    support_animation = true;
                    break;
                }
            }
        }
        if(!support_animation && verbose_mode) {
            alert('Sorry, your browser doesn\'t support CSS3 animation. Upgrade your browser or use modern browsers such as Mozilla Firefox or Google Chrome.');
        }
    }

    //check for browser animation support and also set the local variables for creating animations
    _check_animation_support();
    //API
    return {
        //Public API
        transition: transition
    };
})();
