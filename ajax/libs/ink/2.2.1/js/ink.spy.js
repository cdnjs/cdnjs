/**
 * @module Ink.UI.Spy_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Spy', '1', ['Ink.UI.Aux_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Aux, Event, Css, Element, Selector, InkArray ) {
    'use strict';

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

        this._rootElement = Aux.elOrSelector(selector,'1st argument');

        /**
         * Setting default options and - if needed - overriding it with the data attributes
         */
        this._options = Ink.extendObj({
            target: undefined
        }, Element.data( this._rootElement ) );

        /**
         * In case options have been defined when creating the instance, they've precedence
         */
        this._options = Ink.extendObj(this._options,options || {});

        this._options.target = Aux.elOrSelector( this._options.target, 'Target' );

        this._scrollTimeout = null;
        this._init();
    };

    Spy.prototype = {

        /**
         * Stores the spy elements
         *
         * @property _elements
         * @type {Array}
         * @readOnly
         * 
         */
        _elements: [],

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){
            Event.observe( document, 'scroll', Ink.bindEvent(this._onScroll,this) );
            this._elements.push(this._rootElement);
        },

        /**
         * Scroll handler. Responsible for highlighting the right options of the target menu.
         * 
         * @method _onScroll
         * @private
         */
        _onScroll: function(){

            var scrollHeight = Element.scrollHeight(); 
            if( (scrollHeight < this._rootElement.offsetTop) ){
                return;
            } else {
                for( var i = 0, total = this._elements.length; i < total; i++ ){
                    if( (this._elements[i].offsetTop <= scrollHeight) && (this._elements[i] !== this._rootElement) && (this._elements[i].offsetTop > this._rootElement.offsetTop) ){
                        return;
                    }
                }
            }

            InkArray.each(
                Selector.select(
                    'a',
                    this._options.target
                ), Ink.bind(function(item){

                    var comparisonValue = ( ("name" in this._rootElement) && this._rootElement.name ?
                        '#' + this._rootElement.name : '#' + this._rootElement.id
                    );

                    if( item.href.substr(item.href.indexOf('#')) === comparisonValue ){
                        Css.addClassName(Element.findUpwardsByTag(item,'li'),'active');
                    } else {
                        Css.removeClassName(Element.findUpwardsByTag(item,'li'),'active');
                    }
                },this)
            );
        }

    };

    return Spy;

});
