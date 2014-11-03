/** 
 * @module Ink.Autoload
 * @version 1
 * Create Ink UI components easily
 */
Ink.createModule('Ink.Autoload', 1, ['Ink.Dom.Selector_1', 'Ink.Util.Array_1', 'Ink.Dom.Loaded_1', 'Ink.UI.SmoothScroller_1', 'Ink.UI.Close_1', 'Ink.UI.Drawer_1'], function( Selector, InkArray, Loaded, Scroller, Close, Drawer ){
    'use strict';

    /**
     * @namespace Ink.Autoload
     * @static
     */

    var el = document.createElement('div');
    // See if a selector is valid.
    function validSelector(sel) {
        try {
            Selector.select(sel, el);
        } catch(e) {
            Ink.error(e);
            return false;
        }
        return true;
    }

    var Autoload = {
        /**
         * Matches module names to default selectors.
         * 
         * @property selectors {Object}
         * @public
         **/
        selectors: {
            /* Match module names to element classes (or more complex selectors)
             * which get the UI modules instantiated automatically. */
            'Animate_1'     : '.ink-animate',
            'Carousel_1'    : '.ink-carousel',
            'DatePicker_1'  : '.ink-datepicker',
            'Dropdown_1'    : '.ink-dropdown',
            'Gallery_1'     : 'ul.ink-gallery-source',
            'Modal_1'       : '.ink-modal',
            'ProgressBar_1' : '.ink-progress-bar',
            'SortableList_1': '.ink-sortable-list',
            'Spy_1'         : '[data-spy="true"]',
            'Stacker_1'     : '.ink-stacker',
            'Sticky_1'      : '.ink-sticky, .sticky',
            'Table_1'       : '.ink-table',
            'Tabs_1'        : '.ink-tabs',
            'Toggle_1'      : '.ink-toggle, .toggle',
            'Tooltip_1'     : '.ink-tooltip, .tooltip',
            'TreeView_1'    : '.ink-tree-view'
        },
        defaultOptions: {},

        /**
         * Run Autoload on a specific element.
         *
         * Useful when you load something from AJAX and want it to have automatically loaded Ink modules.
         * @method run
         * @param {DOMElement} parentEl  
         * @param {Object}  [options] Options object, containing:
         * @param {Boolean} [options.forceAutoload] Autoload things on elements even if they have `data-autoload="false"`
         * @param {Boolean} [options.createClose] Whether to create the Ink.UI.Close component. Defaults to `true`.
         * @param {Boolean} [options.createSmoothScroller] Whether to create the Scroller component. Defaults to `true`.
         * @param {Object} [options.selectors=Ink.Autoload.selectors] A hash mapping module names to selectors that match elements to load these modules. For example, `{ 'Modal_1': '.my-specific-modal' }`.
         * @param {Boolean} [options.waitForDOMLoaded=false] Do nothing until the DOM is loaded. Uses Ink.Dom.Loaded.run();
         * @public
         * @sample Autoload_1.html
         **/
        run: function (parentEl, options){
            options = Ink.extendObj({
                // The below lines are not required because undefined is falsy anyway..
                // forceAutoload: false,
                // waitForDOMLoaded: false,
                // createClose: false,
                // createSmoothScroller: false,
                selectors: Autoload.selectors
            }, options || {});

            for(var mod in options.selectors) if (options.selectors.hasOwnProperty(mod)) {
                // `elements` need to be in a closure because requireModules is async.
                findElements(mod);
            }
            if (options.createClose !== false) {
                new Close();
            }
            if (options.createSmoothScroller !== false) {
                Scroller.init();
            }
            if (options.createDrawer !== false) {
                if (Selector.matchesSelector(document.body, '.ink-drawer') &&
                        !(Drawer.getInstance && Drawer.getInstance(document.body))) {
                    new Drawer(document.body);
                }
            }

            function findElements(mod) {
                var modName = 'Ink.UI.' + mod;
                var elements = Selector.select( options.selectors[mod], parentEl );

                elements = InkArray.filter(elements, autoloadElement);

                if( elements.length ){
                    Ink.requireModules( [modName], function( Component ) {
                        InkArray.forEach(elements, function (el) {
                            if (typeof Component.getInstance === 'function' &&
                                    Component.getInstance(el) != null) {
                                return; // Avoid multiple instantiation.
                            }
                            new Component(el, Autoload.defaultOptions[mod]);
                        });
                    });
                }
            }

            function autoloadElement(element) {
                if (options.forceAutoload === true) { return true; }
                if (typeof element.getAttribute === 'function' || typeof element.getAttribute === 'object') {
                    return element.getAttribute('data-autoload') !== 'false';
                }
            }
        },
        /**
         * Add a new entry to be autoloaded.
         * @method add
         * @param moduleName {String}
         * @param selector   {String}
         */
        add: function (moduleName, selector) {
            if (!validSelector(selector)) { return false; }

            if (Autoload.selectors[moduleName]) {
                Autoload.selectors[moduleName] += ', ' + selector;
            } else {
                Autoload.selectors[moduleName] = selector;
            }
        },
        /**
         * Removes a module from autoload, making it not be automatically loaded.
         * @method remove
         * @param moduleName {String}
         **/
        remove: function (moduleName) {
            delete Autoload.selectors[moduleName];
        }
    };

    for (var k in Autoload.selectors) if (Autoload.selectors.hasOwnProperty(k)) {
        Autoload.defaultOptions[k] = {};
    }

    if (!window.INK_NO_AUTO_LOAD) {
        Loaded.run(function () {
            Autoload.run(document, {
                createSmoothScroller: true,
                createClose: true
            });
            Autoload.firstRunDone = true;
        });
    }

    return Autoload;
});

