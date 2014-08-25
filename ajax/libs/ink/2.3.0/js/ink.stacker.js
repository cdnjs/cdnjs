/**
 * @module Ink.UI.Stacker_1
 **/
Ink.createModule('Ink.UI.Stacker', 1, ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1'], function(InkUICommon, InkEvent, InkElement) {
    'use strict';

function Stacker(selector, options) {
    this._init(selector, options);
}

Stacker.prototype = {
    /**
     * This module combines several stacks of items together, in smaller screen sizes.
     *
     * The purpose is to have several stacks of items which may have different heights and as such cannot be used because of `float: left` quirks.
     *
     * For example, when you have three different columns of information:
     *
     *     [col. A: 1] [col. B: 1] [col. C: 1]
     *     [col. B: 2] [col. C: 2] [col. C: 2]
     *
     * and the screen resizes and you need a layout of 2 columns, Stacker reorders the stacks so that you get:
     *
     *     [col. A: 1] [col. B: 1]
     *     [col. C: 1] [col. A: 2]
     *     [col. B: 2] [col. C: 2]
     * 
     * Note: If you just want to use a different amount of columns for your items in several viewports, but these items are guaranteed to have a fixed height, don't use this module. Use the `small-*`, `medium-*` and `large-*` classes instead.
     *
     * @class Ink.UI.Stacker_1
     *
     * @constructor
     * @param [container] {DOMElement|String} Element which contains the stacks (identified by the options.column selector)
     * @param [options]
     * @param [options.column='.stacker-column'] {String}   Select the columns inside the `container`
     * @param [options.item='.stacker-item']     {String}   Select items in your stack
     *
     * @param [options.customBreakPoints]        {Object}   options for each breakpoint name. Use this if you have more breakpoints than Ink by default (`large`, `medium`, `small`)
     * @param [options.customBreakpoints.(breakpoint)] {Object} 
     * @param options.customBreakpoints.(breakpoint).max    Maximum screen size as seen in your media query
     * @param options.customBreakpoints.(breakpoint).min    Minimum screen size as seen in your media query
     * @param options.customBreakpoints.(breakpoint).cols   Column count for this size.
     *
     * @param [options.largeMax]                 {Number}   Upper bound of `large` breakpoint
     * @param [options.largeMin=961]             {Number}   Lower bound of `large` breakpoint
     * @param [options.mediumMax=960]            {Number}   Upper bound of `medium` breakpoint
     * @param [options.mediumMin=651]            {Number}   Lower bound of `medium` breakpoint
     * @param [options.smallMax=650]             {Number}   Upper bound of `small` breakpoint
     * @param [options.smallMin]                 {Number}   Lower bound of `small` breakpoint
     *
     * @param [options.largeCols=3]              {Integer}  Number of columns in the `large` viewport
     * @param [options.mediumCols=2]             {Integer}  Number of columns in the `medium` viewport
     * @param [options.smallCols=1]              {Integer}  Number of columns in the `small` viewport
     *
     * @param [options.isOrdered=true]           {Boolean}  When `false`, do not reorder stacks when combining them.
     * @param [options.onRunCallback]            {Function} Called when instantiated
     * @param [options.onResizeCallback]         {Function} Called when resized because the window resized.
     * @param [options.onAPIReloadCallback]      {Function} Called when you ask to reload stack items from the DOM.
     *
     * @example
     *
     * Html:
     *
     *     <div id="stacker-container">  <!-- Stacker element -->
     *         <div class="large-33 medium-50 small-100 stacker-column"> <!-- Column element ('.stacker-column' is the default selector) -->
     *             <div id="a" class="stacker-item">a</div> <!-- Item ('.stacker-item' is the default selector) -->
     *             <div id="d" class="stacker-item">d</div>
     *             <div id="g" class="stacker-item">g</div>
     *         </div>
     *         <div class="large-33 medium-50 small-100 hide-small stacker-column">
     *             <div id="b" class="stacker-item">b</div>
     *             <div id="e" class="stacker-item">e</div>
     *             <div id="h" class="stacker-item">h</div>
     *         </div>
     *         <div class="large-33 medium-50 small-100 hide-medium hide-small stacker-column">
     *             <div id="c" class="stacker-item">c</div>
     *             <div id="f" class="stacker-item">f</div>
     *             <div id="i" class="stacker-item">i</div>
     *         </div>
     *     </div>
     *
     * Javascript:
     *
     *     Ink.requireModules(['Ink.UI.Stacker_1'], function (Stacker) {
     *         var stacker = new Stacker('#stacker-container');
     *         // Keep the "stacker" variable around if you want to call addItem and reloadItems
     *     });
     **/
    _init: function(selector, options) {
        /* globals console */
        this._rootElm = InkUICommon.elsOrSelector(selector, 'Ink.UI.Stacker root element')[0] || null;
        if(this._rootElm === null) {
            if(typeof console !== 'undefined') {
                console.warn('Ink.UI.Stacker: No root element');
            }
        }

        this._options = InkUICommon.options({
            column: ['String', '.stacker-column'],
            item: ['String', '.stacker-item'],

            // [3.0.0] review this when we have info about our breakpoints from the CSS
            customBreakPoints: ['Object', null], // Must be: {xlarge: {max: 9999, min: 1281, cols: 5}, large:{max:1280, min:1001, cols:4} medium:{max:1000, min:801,cols:3}, ...etc..}
            largeMax: ['Number', Number.MAX_VALUE],
            largeMin: ['Number', 961],
            mediumMax: ['Number', 960],
            mediumMin: ['Number', 651],
            smallMax: ['Number', 650],
            smallMin: ['Number', 0],

            largeCols: ['Integer', 3],
            mediumCols: ['Integer', 2],
            smallCols: ['Integer', 1],

            isOrdered: ['Boolean', true],
            onRunCallback: ['Function', null],
            onResizeCallback: ['Function', null],
            onAPIReloadCallback: ['Function', null]
        }, options || {}, this._rootElm);  

        this._aList = []; 

        this._curLayout = 'large';

        // [todo] is this needed?
        this._runFirstTime = false;

        this._getPageItemsToList();

        if(this._canApplyLayoutChange() || !this._runFirstTime) {
            this._runFirstTime = true;
            this._applyLayoutChange();
            if(typeof(this._options.onRunCallback) === 'function') {
                this._options.onRunCallback(this._curLayout);
            }
        }
        this._addEvents();
    },

    /**
     * Add an item to the end of your stacks. Call `reloadItems()` when you are done adding items.
     * @method addItem
     * @param {DOMElement} item
     **/
    addItem: function(item) {
        this._aList.push(item);
    },

    /**
     * Update the layout of your items.
     *
     * Call this when:
     *
     *  - The width has changed, but not because of the window resizing.
     *  - You used addItem to add some items
     *
     * @method reloadItems
     **/
    reloadItems: function() {
        this._applyLayoutChange();
        if(typeof(this._options.onAPIReloadCallback) === 'function') {
            this._options.onAPIReloadCallback(this._curLayout);
        }
    },

    _addEvents: function() {
        InkEvent.observe(window, 'resize', Ink.bindEvent(this._onResize, this));
    },

    _onResize: function() {
        if(this._canApplyLayoutChange()) {
            this._removeDomItems();
            this._applyLayoutChange();
            if(typeof(this._options.onResizeCallback) === 'function') {
                this._options.onResizeCallback(this._curLayout);
            }
        }
    },

    _setCurLayout: function() {
        var viewportWidth = InkElement.viewportWidth();
        if(this._options.customBreakpoints && typeof(this._options.customBreakPoints) === 'object') {
            for(var prop in this._options.customBreakPoints) {
                if(this._options.customBreakPoints.hasOwnProperty(prop)) {
                    if(viewportWidth >= Number(this._options.customBreakPoints[prop].min) && viewportWidth <= Number(this._options.customBreakPoints[prop].max) && this._curLayout !== prop) {
                        this._curLayout = prop;
                        return;
                    } 
                }
            }
        } else {
            if(viewportWidth <= Number(this._options.largeMax) && viewportWidth >= Number(this._options.largeMin) && this._curLayout !== 'large') {
                this._curLayout = 'large';
            } else if(viewportWidth >= Number(this._options.mediumMin) && viewportWidth <= Number(this._options.mediumMax) && this._curLayout !== 'medium') {
                this._curLayout = 'medium';
            } else if(viewportWidth >= Number(this._options.smallMin) && viewportWidth <= Number(this._options.smallMax) && this._curLayout !== 'small') {
                this._curLayout = 'small';
            }
        }
    },

    _getColumnsToShow: function() {
        if(this._options.customBreakPoints && typeof(this._options.customBreakPoints) === 'object') {
            return Number(this._options.customBreakPoints[this._curLayout].cols);
        } else {
            return Number(this._options[this._curLayout+'Cols']);
        }
    },

    _canApplyLayoutChange: function() {
        var curLayout = this._curLayout;
        this._setCurLayout();
        if(curLayout !== this._curLayout) {
            return true;
        }
        return false;
    },

    _getPageItemsToList: function() {
        this._aColumn = Ink.ss(this._options.column, this._rootElm);
        var totalCols = this._aColumn.length;
        var index = 0;
        if(totalCols > 0) {
            for(var i=0; i < this._aColumn.length; i++) {
                var aItems = Ink.ss(this._options.item, this._aColumn[i]);
                for(var j=0; j < aItems.length; j++) {
                    if(this._options.isOrdered) {
                        index = i + (j * totalCols);
                    }
                    this._aList[index] = aItems[j];
                    if(!this._options.isOrdered) {
                        index++;
                    }
                    //aItems[j].style.height = (100 + (Math.random() * 100))+'px';
                    aItems[j].parentNode.removeChild(aItems[j]);
                }
            }
            if(this._aList.length > 0 && this._options.isOrdered) {
                var aNewList = [];
                for(var ii=0; ii < this._aList.length; ii++) {
                    if(typeof(this._aList[ii]) !== 'undefined') {
                        aNewList.push(this._aList[ii]);
                    }
                }
                this._aList = aNewList;
            }
        }
    }, 

    _removeDomItems: function() {
        var totalCols = this._aColumn.length;
        if(totalCols > 0) {
            for(var i=0; i < totalCols; i++) {
                var aItems = Ink.ss(this._options.item, this._aColumn[i]);
                for(var j=aItems.length - 1; j >= 0; j--) {
                    aItems[j].parentNode.removeChild(aItems[j]);
                }
            }
        }
    },

    _applyLayoutChange: function() {
        var totalCols = this._getColumnsToShow();
        var totalItems = this._aList.length;
        var index = 0;
        var countCol = 0;
        if(totalCols > 0) {
            while(countCol < totalCols) {
                this._aColumn[countCol].appendChild(this._aList[index]);
                index++;
                countCol++;
                if(index === totalItems) {
                    return;
                }
                if(countCol === totalCols) {
                    countCol = 0;
                }
            }
        }
    }
};

return Stacker;

});
