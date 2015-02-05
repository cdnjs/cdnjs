/**
 * Closing utilities
 * @module Ink.UI.Close_1
 * @version 1
 */
Ink.createModule('Ink.UI.Close', '1', ['Ink.Dom.Event_1','Ink.Dom.Element_1'], function(InkEvent, InkElement) {
    'use strict';

    /**
     * Subscribes clicks on the document.body.
     * Whenever an element with the classes ".ink-close" or ".ink-dismiss" is clicked, this module finds an ancestor ".ink-alert" or ".ink-alert-block" element and removes it from the DOM.
     * This module should be created only once per page.
     * 
     * @class Ink.UI.Close
     * @constructor
     * @example
     *     <script>
     *         Ink.requireModules(['Ink.UI.Close_1'],function( Close ){
     *             new Close();
     *         });
     *     </script>
     *
     * @sample Ink_UI_Close_1.html
     */
    var Close = function() {
        InkEvent.observe(document.body, 'click', function(ev) {
            var el = InkEvent.element(ev);

            el = InkElement.findUpwardsByClass(el, 'ink-close') ||
                 InkElement.findUpwardsByClass(el, 'ink-dismiss');

            if (!el) {
                return;  // ink-close or ink-dismiss class not found
            }

            var toRemove = InkElement.findUpwardsByClass(el, 'ink-alert') ||
                           InkElement.findUpwardsByClass(el, 'ink-alert-block') ||
                           el;

            if (toRemove) {
                InkEvent.stop(ev);
                InkElement.remove(toRemove);
            }
        });
    };

    return Close;
});
