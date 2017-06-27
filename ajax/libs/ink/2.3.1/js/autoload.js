Ink.createModule('Ink.Autoload', 1, ['Ink.Dom.Selector_1', 'Ink.Dom.Loaded_1', 'Ink.UI.SmoothScroller_1', 'Ink.UI.Close_1'], function( Selector, Loaded, Scroller, Close ){
    'use strict';

    var Autoload = {
        selectors: {
            /* Match module names to element classes (or more complex selectors)
             * which get the UI modules instantiated automatically. */
            'Animate_1'     : '.ink-animate',
            'Carousel_1'    : '.ink-carousel',
            'DatePicker_1'  : '.ink-datepicker',
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
        run: function (parentEl, options){
            options = options || {};

            if (options.waitForDOMLoaded) {
                Loaded.run(autoload);
            } else {
                autoload();
            }

            function autoload() {
                for(var mod in Autoload.selectors) if (Autoload.selectors.hasOwnProperty(mod)) {
                    // `elements` need to be in a closure because requireModules is async.
                    findElements(mod);
                }
                if (options.createClose) {
                    new Close();
                }
                if (options.createSmoothScroller) {
                    Scroller.init();
                }
            }

            function findElements(mod) {
                var modName = 'Ink.UI.' + mod;
                var elements = Selector.select( Autoload.selectors[mod], parentEl );
                if( elements.length ){
                    Ink.requireModules( [modName], function( Component ) {
                        for (var i = 0, len = elements.length; i < len; i++) {
                            new Component(elements[i], Autoload.defaultOptions[modName]);
                        }
                    });
                }
            }
        }
    };

    for (var k in Autoload.selectors) if (Autoload.selectors.hasOwnProperty(k)) {
        Autoload.defaultOptions[k] = {};
    }

    if (!window.INK_NO_AUTO_LOAD) {
        Autoload.run(document, {
            waitForDOMLoaded: true,
            createSmoothScroller: true,
            createClose: true
        });
        Autoload.firstRunDone = true;
    }

    return Autoload;
});

