/**
 * Highlight elements as you scroll
 * @module Ink.UI.Spy_1
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
         *      ------------------------ 
         *     |    _____               |
         *     |   |     |  element 2   |
         *     |   |     |              |
         *     |   |_____|              |
         *      ------- Viewport ------- 
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
     * Spy is an UI component which tells the user which section is currently visible.
     * Spy can be used to highlight a menu item for the section which is visible to the user.
     * You need two things: A menu element (which contains your links inside `li` tags), and an element containing your section's content.
	 * The links must be inside `li` tags. These will get the 'active' class, to signal which item is currently visible. In your CSS you need to add styling for this class.
     * To use Ink.UI.Spy for more than one section, loop through your sections (as you see in the sample below), or just load `autoload.js` and set add the `data-spy="true"` attribute to your sections.
     * The currently visible element's corresponding link in the menu gets the 'visible' class added to it.
     *
     * @class Ink.UI.Spy
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     * @param {DOMElement|String}     options.target          Target menu where the spy will highlight the right option.
     *
     * @sample Ink_UI_Spy_1.html
     */
    function Spy(){
        Common.BaseUIComponent.apply(this, arguments);
    }

    Spy._name = 'Spy_1';

    Spy._optionDefinition = {
        target: ['Element', undefined],
        activeClass: ['String', 'active'] // [todo] Spy#_options.activeClass
    };

    Spy.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function() {
            addSpied(this._element, this._options.target);
            observeOnScroll();
            onScroll();
        }
    };

    Common.createUIComponent(Spy);

    return Spy;

});
