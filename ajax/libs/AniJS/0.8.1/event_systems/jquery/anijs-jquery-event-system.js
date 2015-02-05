/*!
AniJS - http://anijs.github.io
Licensed under the MIT license

Copyright (c) 2014 Dariel Noel <darielnoel@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * JQuery Event System Interface
 */
(function() {
    var JQueryEventSystem = AniJS.EventSystem;

    /**
     * Overwriting isEventTarget method
     * @method isEventTarget
     * @param {} element
     * @return ConditionalExpression
     */
    AniJS.EventSystem.isEventTarget = function(element) {
        return (element.trigger) ? 1 : 0;
    };

    /**
     * Overwriting createEventTarget method
     * @method createEventTarget
     * @return CallExpression
     */
    AniJS.EventSystem.createEventTarget = function() {
        return $({});
    };

    /**
     * Overwriting addEventListenerHelper method
     * @method addEventListenerHelper
     * @param {} eventTargetItem
     * @param {} event
     * @param {} listener
     * @param {} other
     * @return
     */
    AniJS.EventSystem.addEventListenerHelper = function(eventTargetItem, event, listener, other) {
        $(eventTargetItem).on(event, listener);
    };

    /**
     * Overwriting removeEventListenerHelper method
     * @method removeEventListenerHelper
     * @param {} e
     * @param {} arguments
     * @return
     */
    AniJS.EventSystem.removeEventListenerHelper = function(element, type, listener) {
        $(element).off(type, listener);
    };


}(window));
