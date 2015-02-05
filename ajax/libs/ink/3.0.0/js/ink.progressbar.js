/**
 * @module Ink.UI.ProgressBar_1
 * Animated progress bars
 * @version 1
 */

Ink.createModule('Ink.UI.ProgressBar', '1', ['Ink.UI.Common_1', 'Ink.Dom.Selector_1','Ink.Dom.Element_1'], function( Common, Selector, Element ) {
    'use strict';

    /**
     * Associated to a .ink-progress-bar element, it provides a setValue() method to change the element's value.
     * 
     * @class Ink.UI.ProgressBar
     * @constructor
     * @version 1
     * @param {String|DOMElement}   selector                Element or selector
     * @param {Object}              [options]               Options object
     * @param {Number}              [options.startValue]    Percentage of the bar that is filled. Ranges between 0 and 100. Default: 0
     * @param {Function}            [options.onStart]       Callback called when a change of value is started
     * @param {Function}            [options.onEnd]         Callback called when a change of value ends
     *
     * @sample Ink_UI_ProgressBar_1.html
     */
    var ProgressBar = function( selector, options ){
        this._element = Common.elOrSelector(selector);

        this._options = Ink.extendObj({
            'startValue': 0,
            'onStart': function(){},
            'onEnd': function(){}
        },Element.data(this._element));

        this._options = Ink.extendObj( this._options, options || {});
        this._value = this._options.startValue;

        this._init();
    };

    ProgressBar.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            this._elementBar = Selector.select('.bar',this._element);
            if( this._elementBar.length < 1 ){
                throw '[Ink.UI.ProgressBar] :: Bar element not found';
            }
            this._elementBar = this._elementBar[0];

            this._options.onStart = Ink.bind(this._options.onStart,this);
            this._options.onEnd = Ink.bind(this._options.onEnd,this);
            this.setValue( this._options.startValue );
        },

        /**
         * Sets the value of the Progressbar
         * 
         * @method setValue
         * @param {Number} newValue Numeric value, between 0 and 100, that represents the percentage of the bar.
         * @public
         */
        setValue: function( newValue ){
            this._options.onStart( this._value);

            newValue = parseInt(newValue,10);
            if( isNaN(newValue) || (newValue < 0) ){
                newValue = 0;
            } else if( newValue>100 ){
                newValue = 100;
            }
            this._value = newValue;
            this._elementBar.style.width =  this._value + '%';

            this._options.onEnd( this._value );
        }
    };

    return ProgressBar;

});