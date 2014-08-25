/**
 * @module Ink.UI.Close_1
 * @version 1
 * Closing utilities
 */
Ink.createModule('Ink.UI.Close', '1', ['Ink.Dom.Event_1','Ink.Dom.Element_1'], function(InkEvent, InkElement) {
    'use strict';

    /**
     * Subscribes clicks on the document.body.
     * Whenever an ".ink-close,.ink-dismiss" element is clicked, this module finds an ancestor ".ink-alert,.ink-alert-block" element and removes it from the DOM.
     * This module should be called only once per page.
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

            var toRemove = el;
            toRemove = InkElement.findUpwardsByClass(el, 'ink-alert') ||
                       InkElement.findUpwardsByClass(el, 'ink-alert-block');

            if (toRemove) {
                InkEvent.stop(ev);
                InkElement.remove(toRemove);
            }
        });
    };

    return Close;

});
