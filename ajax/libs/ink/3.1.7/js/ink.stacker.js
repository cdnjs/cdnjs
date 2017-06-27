/**
 * Stacking items in columns
 * @module Ink.UI.Stacker_1
 * @version 1
 **/

Ink.createModule('Ink.UI.Stacker', 1, ['Ink.UI.Common_1', 'Ink.Dom.Event_1', 'Ink.Dom.Element_1'], function(Common, InkEvent, InkElement) {
    'use strict';

function Stacker() {
    Common.BaseUIComponent.apply(this, arguments);
}

Stacker._name = 'Stacker_1';

Stacker._optionDefinition = {
    column: ['String', '.stacker-column'],
    item: ['String', '.stacker-item'],

    // [3.2.0] review this when we have info about our breakpoints from the CSS
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
};

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
     * @param {Element|String}      [container]                                     Element which contains the stacks (identified by the options.column selector)
     * @param {Object}              [options]                                       Options object.
     * @param {String}              [options.column]                                Selector for the the columns inside the container element. Defaults to '.stacker-column'.
     * @param {String}              [options.item]                                  Selector for the items in your stack. Defaults to '.stacker-item'.
     * @param {Object}              [options.customBreakPoints]                     Options for each breakpoint name. Use this if you have more breakpoints than Ink by default (`large`, `medium`, `small`)
     * @param {Object}              [options.customBreakpoints.BREAKPOINT_NAME]     Custom breakpoints object.
     * @param {String}              options.customBreakpoints.BREAKPOINT_NAME.max   Maximum screen size as seen in your media query
     * @param {String}              options.customBreakpoints.BREAKPOINT_NAME.min   Minimum screen size as seen in your media query
     * @param {String}              options.customBreakpoints.BREAKPOINT_NAME.cols  Column count for this size.
     * @param {Number}              [options.largeMax]                              Upper bound of `large` breakpoint
     * @param {Number}              [options.largeMin]                              Lower bound of `large` breakpoint. Defaults to 961.
     * @param {Number}              [options.mediumMax]                             Upper bound of `medium` breakpoint. Defaults to 960.
     * @param {Number}              [options.mediumMin]                             Lower bound of `medium` breakpoint. Defaults to 651.
     * @param {Number}              [options.smallMax]                              Upper bound of `small` breakpoint. Defaults to 650.
     * @param {Number}              [options.smallMin]                              Lower bound of `small` breakpoint
     *
     * @param {Integer}             [options.largeCols]                             Number of columns in the `large` viewport. Defaults to 3.
     * @param {Integer}             [options.mediumCols]                            Number of columns in the `medium` viewport. Defaults to 2.
     * @param {Integer}             [options.smallCols]                             Number of columns in the `small` viewport. Defaults to 1.
     *
     * @param {Boolean}             [options.isOrdered]                             When false, doesn't reorder stacks when combining them.
     * @param {Function}            [options.onRunCallback]                         Called when instantiated.
     * @param {Function}            [options.onResizeCallback]                      Called when the window resizes.
     * @param {Function}            [options.onAPIReloadCallback]                   Called when the reload function executes.
     *
     * @sample Ink_UI_Stacker_1.html
     **/
    _init: function() {
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
     * Adds an item to the end of your stacks.
     * Call `reloadItems()` when you are done adding items.
     *
     * @method addItem
     * @param {Element} item     Element
     * @return {void}
     * @public
     **/
    addItem: function(item) {
        this._aList.push(item);
    },

    /**
     * Updates the layout of your items.
     * Call this method after adding items or changing their dimensions. This method is automatically called when the window resizes.
     *
     * @method reloadItems
     * @return {void}
     * @public
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
        this._aColumn = Ink.ss(this._options.column, this._element);
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

Common.createUIComponent(Stacker);

return Stacker;

});
