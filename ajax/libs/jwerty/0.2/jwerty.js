/*
 * jwerty - Awesome handling of keyboard events
 *
 * jwerty is a JS lib which allows you to bind, fire and assert key combination strings against
 *  elements and events. It normalises the poor std api into something easy to use and clear.
 *
 * This code is licensed under the MIT
 * For more details, see http://www.opensource.org/licenses/mit-license.php
 * For more information, see http://github.com/keithcirkel/jwerty
 *
 * @author Keith Cirkel ('keithamus') <jwerty@keithcirkel.co.uk>
 * @license http://www.opensource.org/licenses/mit-license.php
 * @copyright Copyright © 2011, Keith Cirkel
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
(function (global, exports) {
    
    // Helper methods & vars:
    var $d = global.document
    ,   $ = (global.jQuery || global.Zepto || global.ender || $d)
    ,   $$
    ,   $b
    ,   ke = 'keydown';
    
    function realTypeOf(v, s) {
        return (v === null) ? s === 'null'
        : (v === undefined) ? s === 'undefined'
        : (v.is && v instanceof $) ? s === 'element'
        : Object.prototype.toString.call(v).toLowerCase().indexOf(s) > 7;
    }
    
    if ($ === $d) {
        $$ = function (selector, context) {
            return selector ? $.querySelector(selector, context || $) : $;
        };
        
        $b = function (e, fn) { e.addEventListener(ke, fn, false); };
        $f = function (e, jwertyEv) {
            var ret = document.createEvent('Event')
            ,   i;
            
            ret.initEvent(ke, true, true);
            
            for (i in jwertyEv) ret[i] = jwertyEv[i];
            
            return (e || $).dispatchEvent(ret);
        }
    } else {
        $$ = function (selector, context, fn) { return $(selector || $d, context); };
        $b = function (e, fn) { $(e).bind(ke + '.jwerty', fn); };
        $f = function (e, ob) { $(e || $d).trigger($.Event(ke, ob)); };
    }
    
    // Private
    var _modProps = { 16: 'shiftKey', 17: 'ctrlKey', 18: 'altKey', 91: 'metaKey' };
    
    // Generate key mappings for common keys that are not printable.
    var _keys = {
        
        // MOD aka toggleable keys
        mods: {
            // Shift key, ⇧
            '⇧': 16, shift: 16,
            // CTRL key, on Mac: ⌃
            '⌃': 17, ctrl: 17,
            // ALT key, on Mac: ⌥ (Alt)
            '⌥': 18, alt: 18, option: 18,
            // META, on Mac: ⌘ (CMD), on Windows (Win), on Linux (Super)
            '⌘': 91, meta: 91, cmd: 91, 'super': 91, win: 91
        },
        
        // Normal keys
        keys: {
            // Backspace key, on Mac: ⌫ (Backspace)
            '⌫': 8, backspace: 8,
            // Tab Key, on Mac: ⇥ (Tab), on Windows ⇥⇥
            '⇥': 9, '⇆': 9, tab: 9,
            // Return key, ↩
            '↩': 13, 'return': 13, enter: 13, '⌅': 13,
            // Pause/Break key
            'pause': 19, 'pause-break': 19,
            // Caps Lock key, ⇪
            '⇪': 20, caps: 20, 'caps-lock': 20,
            // Escape key, on Mac: ⎋, on Windows: Esc
            '⎋': 27, escape: 27, esc: 27,
            // Space key
            space: 32,
            // Page-Up key, or pgup, on Mac: ↖
            '↖': 33, pgup: 33, 'page-up': 33,
            // Page-Down key, or pgdown, on Mac: ↘
            '↘': 34, pgdown: 34, 'page-down': 34,
            // END key, on Mac: ⇟
            '⇟': 35, end: 35,
            // HOME key, on Mac: ⇞
            '⇞': 36, home: 36,
            // Insert key, or ins
            ins: 45, insert: 45,
            // Delete key, on Mac: ⌫ (Delete)
            del: 45, 'delete': 45,
            
            // Left Arrow Key, or ←
            '←': 37, left: 37, 'arrow-left': 37,
            // Up Arrow Key, or ↑
            '↑': 38, up: 38, 'arrow-up': 38,
            // Right Arrow Key, or →
            '→': 39, right: 39, 'arrow-right': 39,
            // Up Arrow Key, or ↓
            '↓': 40, down: 40, 'arrow-down': 40,
            
            // odities, printing characters that come out wrong:
            // Num-Multiply, or *
            '*': 106, star: 106, asterisk: 106, multiply: 106,
            // Num-Plus or +
            '+': 107, 'plus': 107,
            // Num-Subtract, or -
            '-': 109, subtract: 109,
            //';': 186, //???
            // = or equals
            '=': 187, 'equals': 187,
            // Comma, or ,
            ',': 188, comma: 188,
            //'-': 189, //???
            // Period, or ., or full-stop
            '.': 190, period: 190, 'full-stop': 190,
            // Slash, or /, or forward-slash
            '/': 191, slash: 191, 'forward-slash': 191,
            // Tick, or `, or back-quote 
            '`': 192, tick: 192, 'back-quote': 192,
            // Open bracket, or [
            '[': 219, 'open-bracket': 219,
            // Back slash, or \
            '\\': 220, 'back-slash': 220,
            // Close backet, or ]
            ']': 221, 'close-bracket': 221,
            // Apostraphe, or Quote, or '
            '\'': 222, quote: 222, apostraphe: 222
        }
        
    };
    
    // To minimise code bloat, add all of the NUMPAD 0-9 keys in a loop
    i = 95, n = 0;
    while(++i < 106) {
        _keys.keys['num-' + n] = i;
        ++n;
    }
    
    // To minimise code bloat, add all of the top row 0-9 keys in a loop
    i = 48, n = 0;
    while(++i < 58) {
        _keys.keys[n] = i;
        ++n;
    }
    
    // To minimise code bloat, add all of the F1-F25 keys in a loop
    i = 111, n = 1;
    while(++i < 136) {
        _keys.keys['f' + n] = i;
        ++n;
    }
    
    // To minimise code bloat, add all of the letters of the alphabet in a loop
    var i = 64;
    while(++i < 91) {
        _keys.keys[String.fromCharCode(i).toLowerCase()] = i;
    }
    
    function JwertyCode(jwertyCode) {
        var i
        ,   c
        ,   n
        ,   z
        ,   keyCombo
        ,   optionals
        ,   jwertyCodeFragment;
        
        // In-case we get called with an instance of ourselves, just return that.
        if (jwertyCode instanceof JwertyCode) return jwertyCode;
        
        // If jwertyCode isn't an array, cast it as a string and split into array.
        if (!realTypeOf(jwertyCode, 'array')) {
            jwertyCode = (String(jwertyCode)).replace(/\s/g, '').toLowerCase().
                match(/(?:\+,|[^,])+/g);
        }
        
        // Loop through each key sequence in jwertyCode
        for (i = 0, c = jwertyCode.length; i < c; ++i) {
            
            // If the key combo at this part of the sequence isn't an array,
            // cast as a string and split into an array.
            if (!realTypeOf(jwertyCode[i], 'array')) {
                jwertyCode[i] = String(jwertyCode[i])
                    .match(/(?:\+\/|[^\/])+/g);
            }
            
            // Parse the key optionals in this sequence
            optionals = [], n = jwertyCode[i].length;
            while (n--) {
                
                // Begin creating the object for this key combo
                var jwertyCodeFragment = jwertyCode[i][n];
                
                keyCombo = {
                    jwertyCombo: String(jwertyCodeFragment),
                    shiftKey: false,
                    ctrlKey: false,
                    altKey: false,
                    metaKey: false
                }
                
                // If jwertyCodeFragment isn't an array then cast as a string
                // and split it into one.
                if (!realTypeOf(jwertyCodeFragment, 'array')) {
                    jwertyCodeFragment = String(jwertyCodeFragment).toLowerCase()
                        .match(/(?:(?:[^\+])+|\+\+|^\+$)/g);
                }
                
                z = jwertyCodeFragment.length;
                while (z--) {
                    
                    // Normalise matching errors
                    if (jwertyCodeFragment[z] === '++') jwertyCodeFragment[z] = '+';
                    
                    // Inject either keyCode or ctrl/meta/shift/altKey into keyCombo
                    if (jwertyCodeFragment[z] in _keys.mods) {
                        keyCombo[_modProps[_keys.mods[jwertyCodeFragment[z]]]] = true;
                    } else if(jwertyCodeFragment[z] in _keys.keys) {
                        keyCombo.keyCode = _keys.keys[jwertyCodeFragment[z]];
                    }
                }
                optionals.push(keyCombo);
            
            }
            this[i] = optionals;
        }
        this.length = i;
        return this;
    }
    
    var jwerty = exports.jwerty = {        
        /**
         * jwerty.event
         *
         * `jwerty.event` will return a function, which expects the first
         *  argument to be a key event. When the key event matches `jwertyCode`,
         *  `callbackFunction` is fired. `jwerty.event` is used by `jwerty.key`
         *  to bind the function it returns. `jwerty.event` is useful for
         *  attaching to your own event listeners. It can be used as a decorator
         *  method to encapsulate functionality that you only want to fire after
         *  a specific key combo. If `callbackContext` is specified then it will
         *  be supplied as `callbackFunction`'s context - in other words, the
         *  keyword `this` will be set to `callbackContext` inside the
         *  `callbackFunction` function.
         *
         *   @param {Mixed} jwertyCode can be an array, or string of key
         *      combinations, which includes optinals and or sequences
         *   @param {Function} callbackFucntion is a function (or boolean) which
         *      is fired when jwertyCode is matched. Return false to
         *      preventDefault()
         *   @param {Object} callbackContext (Optional) The context to call
         *      `callback` with (i.e this)
         *      
         */
        event: function (jwertyCode, callbackFunction, callbackContext /*? this */) {
            
            // Construct a function out of callbackFunction, if it is a boolean.
            if (realTypeOf(callbackFunction, 'boolean')) {
                var bool = callbackFunction;
                callbackFunction = function () { return bool; }
            }
            
            jwertyCode = new JwertyCode(jwertyCode);
            
            // Initialise in-scope vars.
            var i = 0
            ,   c = jwertyCode.length - 1
            ,   returnValue
            ,   jwertyCodeIs;
            
            // This is the event listener function that gets returned...
            return function (event) {
                
                // if jwertyCodeIs returns truthy (string)...
                if ((jwertyCodeIs = jwerty.is(jwertyCode, event, i))) {
                    // ... and this isn't the last key in the sequence,
                    // incriment the key in sequence to check.
                    if (i < c) {
                        ++i;
                        return;
                    // ... and this is the last in the sequence (or the only
                    // one in sequence), then fire the callback
                    } else {
                        returnValue = callbackFunction.call(
                            callbackContext || global, event, jwertyCodeIs);
                        
                        // If the callback returned false, then we should run
                        // preventDefault();
                        if (returnValue === false) event.preventDefault();
                        
                        // Reset i for the next sequence to fire.
                        i = 0;
                        return;
                    }
                }
                
                // If the event didn't hit this time, we should reset i to 0,
                // that is, unless this combo was the first in the sequence,
                // in which case we should reset i to 1.
                i = jwerty.is(jwertyCode, event) ? 1 : 0;
            }
        },
        
        /**
         * jwerty.is
         *
         * `jwerty.is` will return a boolean value, based on if `event` matches
         *  `jwertyCode`. `jwerty.is` is called by `jwerty.event` to check
         *  whether or not to fire the callback. `event` can be a DOM event, or
         *  a jQuery/Zepto/Ender manufactured event. The properties of
         *  `jwertyCode` (speficially ctrlKey, altKey, metaKey, shiftKey and
         *  keyCode) should match `jwertyCode`'s properties - if they do, then
         *  `jwerty.is` will return `true`. If they don't, `jwerty.is` will
         *  return `false`.
         *
         *   @param {Mixed} jwertyCode can be an array, or string of key
         *      combinations, which includes optinals and or sequences
         *   @param {KeyboardEvent} event is the KeyboardEvent to assert against
         *   @param {Integer} i (Optional) checks the `i` key in jwertyCode
         *      sequence
         *      
         */
        is: function (jwertyCode, event, i /*? 0*/) {
            jwertyCode = new JwertyCode(jwertyCode);
            // Default `i` to 0
            i = i || 0;
            // We are only interesting in `i` of jwertyCode;
            jwertyCode = jwertyCode[i];
            // jQuery stores the *real* event in `originalEvent`, which we use
            // because it does annoything stuff to `metaKey`
            event = event.originalEvent || event;
            
            // We'll look at each optional in this jwertyCode sequence...
            var key
            ,   n = jwertyCode.length
            ,   returnValue = false;
            
            // Loop through each fragment of jwertyCode
            while (n--) {
                returnValue = jwertyCode[n].jwertyCombo;
                // For each property in the jwertyCode object, compare to `event`
                for (var p in jwertyCode[n]) {
                    // ...except for jwertyCode.jwertyCombo...
                    if (p !== 'jwertyCombo' && event[p] !== jwertyCode[n][p]) returnValue = false;
                }
                // If this jwertyCode optional wasn't falsey, then we can return early.
                if (returnValue !== false) return returnValue;
            }
            return returnValue;
        },
        
        /**
         * jwerty.key
         *
         *  `jwerty.key` will attach an event listener and fire
         *   `callbackFunction` when `jwertyCode` matches. The event listener is
         *   attached to `document`, meaning it will listen for any key events
         *   on the page (a global shortcut listener). If `callbackContext` is
         *   specified then it will be supplied as `callbackFunction`'s context
         *   - in other words, the keyword `this` will be set to
         *   `callbackContext` inside the `callbackFunction` function.
         *
         *   @param {Mixed} jwertyCode can be an array, or string of key
         *      combinations, which includes optinals and or sequences
         *   @param {Function} callbackFunction is a function (or boolean) which
         *      is fired when jwertyCode is matched. Return false to
         *      preventDefault()
         *   @param {Object} callbackContext (Optional) The context to call
         *      `callback` with (i.e this)
         *   @param {Mixed} selector can be a string, jQuery/Zepto/Ender object,
         *      or an HTML*Element on which to bind the eventListener
         *   @param {Mixed} selectorContext can be a string, jQuery/Zepto/Ender
         *      object, or an HTML*Element on which to scope the selector
         *  
         */
        key: function (jwertyCode, callbackFunction, callbackContext /*? this */, selector /*? document */, selectorContext /*? body */) {
            // Because callbackContext is optional, we should check if the
            // `callbackContext` is a string or element, and if it is, then the
            // function was called without a context, and `callbackContext` is
            // actually `selector`
            var realSelector = realTypeOf(callbackContext, 'element') || realTypeOf(callbackContext, 'string') ? callbackContext : selector
            // If `callbackContext` is undefined, or if we skipped it (and
            // therefore it is `realSelector`), set context to `global`.
            ,   realcallbackContext = realSelector === callbackContext ? global : callbackContext
            // Finally if we did skip `callbackContext`, then shift
            // `selectorContext` to the left (take it from `selector`)
            ,    realSelectorContext = realSelector === callbackContext ? selector : selectorContext;
            
            // If `realSelector` is already a jQuery/Zepto/Ender/DOM element,
            // then just use it neat, otherwise find it in DOM using $$()
            $b(realTypeOf(realSelector, 'element') ?
               realSelector : $$(realSelector, realSelectorContext)
            , jwerty.event(jwertyCode, callbackFunction, realcallbackContext));
        },
        
        /**
         * jwerty.fire
         *
         * `jwerty.fire` will construct a keyup event to fire, based on
         *  `jwertyCode`. The event will be fired against `selector`.
         *  `selectorContext` is used to search for `selector` within
         *  `selectorContext`, similar to jQuery's
         *  `$('selector', 'context')`.
         *
         *   @param {Mixed} jwertyCode can be an array, or string of key
         *      combinations, which includes optinals and or sequences
         *   @param {Mixed} selector can be a string, jQuery/Zepto/Ender object,
         *      or an HTML*Element on which to bind the eventListener
         *   @param {Mixed} selectorContext can be a string, jQuery/Zepto/Ender
         *      object, or an HTML*Element on which to scope the selector
         *  
         */
        fire: function (jwertyCode, selector /*? document */, selectorContext /*? body */, i) {
            jwertyCode = new JwertyCode(jwertyCode);
            var realI = realTypeOf(selectorContext, 'number') ? selectorContext : i;
            
            // If `realSelector` is already a jQuery/Zepto/Ender/DOM element,
            // then just use it neat, otherwise find it in DOM using $$()
            $f(realTypeOf(selector, 'element') ?
                selector : $$(selector, selectorContext)
            , jwertyCode[realI || 0][0]);
        },
        
        KEYS: _keys
    };
    
}(this, (typeof module !== 'undefined' && module.exports ? module.exports : this)));