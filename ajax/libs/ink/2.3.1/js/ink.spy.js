/**
 * @module Ink.UI.Spy_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Spy', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1'], function(Common, Event, Css, Element, Selector ) {
    'use strict';

    // Maps a spy target (EG a menu with links inside) to spied instances.
    var spyTargets = [
        // [target, [spied, spied, spied...]], ...
    ];

    function targetIndex(target) {
        for (var i = 0, len = spyTargets.length; i < len; i++) {
            if (spyTargets[i][0] === target) {
                return i;
            }
        }
        return null;
    }

    function addSpied(spied, target) {
        var index = targetIndex(target);

        if (index === null) {
            spyTargets.push([target, [spied]]);
        } else {
            spyTargets[index][1].push(spied);
        }
    }

    var observingOnScroll = false;
    function observeOnScroll() {
        if (!observingOnScroll) {
            observingOnScroll = true;
            Event.observe(document, 'scroll', Event.throttle(onScroll, 300));
        }
    }

    function onScroll() {
        for (var i = 0, len = spyTargets.length; i < len; i++) {
            onScrollForTarget(spyTargets[i][0], spyTargets[i][1]);
        }
    }

    function onScrollForTarget(target, spied) {
        var activeEl = findActiveElement(spied);

        // This selector finds li's to deactivate
        var toDeactivate = Selector.select('li.active', target);
        for (var i = 0, total = toDeactivate.length; i < total; i++) {
            Css.removeClassName(toDeactivate[i], 'active');
        }

        if (activeEl === null) {
            return;
        }

        // The link which should be activated has a "href" ending with "#" + name or id of the element
        var menuLinkSelector = 'a[href$="#' + (activeEl.name || activeEl.id) + '"]';

        var toActivate = Selector.select(menuLinkSelector, target);
        for (i = 0, total = toActivate.length; i < total; i++) {
            Css.addClassName(Element.findUpwardsByTag(toActivate[i], 'li'), 'active');
        }
    }

    function findActiveElement(spied) {
        /* 
         * Find the element above the top of the screen, but closest to it.
         *          _____ 
         *         |_____| element 1  (active element)
         *
         *                              ---
         *          _____                 |
         *         |     |  element 2     |    viewport visible area         
         *         |     |                |
         *         |_____|                |
         *                              ---
         */

        // Remember that getBoundingClientRect returns coordinates
        // relative to the top left corner of the screen.
        //
        // So checking if it's < 0 is used to tell if
        // the element is above the top of the screen.
        var closest = -Infinity;
        var closestIndex;
        var bBox;
        for( var i = 0, total = spied.length; i < total; i++ ){
            bBox = spied[i].getBoundingClientRect();
            if (bBox.top <= 0 && bBox.top > closest) {
                closest = bBox.top;
                closestIndex = i;
            }
        }
        if (closestIndex === undefined) {
            return null;
        } else {
            return spied[closestIndex];
        }
    }

    /**
     * Spy is a component that 'spies' an element (or a group of elements) and when they leave the viewport (through the top),
     * highlight an option - related to that element being spied - that resides in a menu, initially identified as target.
     * 
     * @class Ink.UI.Spy
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {DOMElement|String}     options.target          Target menu on where the spy will highlight the right option.
     *     TODO @xparam {String}                [options.activeClass='active'] Class which marks the "li" as active.
     * @example
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Spy_1'], function( Selector, Spy ){
     *              var menuElement = Ink.s('#menu');
     *              var specialAnchorToSpy = Ink.s('#specialAnchor');
     *              var spyObj = new Spy( specialAnchorToSpy, {
     *                  target: menuElement
     *              });
     *          });
     *      </script>
     */
    var Spy = function( selector, options ){

        this._rootElement = Common.elOrSelector(selector,'1st argument');

        /**
         * Setting default options and - if needed - overriding it with the data attributes
         */
        this._options = Ink.extendObj({
            target: undefined,
            activeClass: 'active'
        }, Element.data( this._rootElement ) );

        /**
         * In case options have been defined when creating the instance, they've precedence
         */
        this._options = Ink.extendObj(this._options,options || {});

        this._options.target = Common.elOrSelector( this._options.target, 'Target' );

        this._init();
    };

    Spy.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            addSpied(this._rootElement, this._options.target);
            observeOnScroll();
            onScroll();
        }
    };

    return Spy;

});
