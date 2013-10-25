/**
 * @module Ink.UI.Toggle_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Toggle', '1', ['Ink.UI.Aux_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Aux, Event, Css, Element, Selector, InkArray ) {
    'use strict';

    /**
     * Toggle component
     * 
     * @class Ink.UI.Toggle
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *     @param {String}       options.target                    CSS Selector that specifies the elements that will toggle
     *     @param {String}       [options.triggerEvent]            Event that will trigger the toggling. Default is 'click'
     *     @param {Boolean}      [options.closeOnClick]            Flag that determines if, when clicking outside of the toggled content, it should hide it. Default: true.
     * @example
     *      <div class="ink-dropdown">
     *          <button class="ink-button toggle" data-target="#dropdown">Dropdown <span class="icon-caret-down"></span></button>
     *          <ul id="dropdown" class="dropdown-menu">
     *              <li class="heading">Heading</li>
     *              <li class="separator-above"><a href="#">Option</a></li>
     *              <li><a href="#">Option</a></li>
     *              <li class="separator-above disabled"><a href="#">Disabled option</a></li>
     *              <li class="submenu">
     *                  <a href="#" class="toggle" data-target="#submenu1">A longer option name</a>
     *                  <ul id="submenu1" class="dropdown-menu">
     *                      <li class="submenu">
     *                          <a href="#" class="toggle" data-target="#ultrasubmenu">Sub option</a>
     *                          <ul id="ultrasubmenu" class="dropdown-menu">
     *                              <li><a href="#">Sub option</a></li>
     *                              <li><a href="#" data-target="ultrasubmenu">Sub option</a></li>
     *                              <li><a href="#">Sub option</a></li>
     *                          </ul>
     *                      </li>
     *                      <li><a href="#">Sub option</a></li>
     *                      <li><a href="#">Sub option</a></li>
     *                  </ul>
     *              </li>
     *              <li><a href="#">Option</a></li>
     *          </ul>
     *      </div>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Toggle_1'], function( Selector, Toggle ){
     *              var toggleElement = Ink.s('.toggle');
     *              var toggleObj = new Toggle( toggleElement );
     *          });
     *      </script>
     */
    var Toggle = function( selector, options ){

        if( typeof selector !== 'string' && typeof selector !== 'object' ){
            throw '[Ink.UI.Toggle] Invalid CSS selector to determine the root element';
        }

        if( typeof selector === 'string' ){
            this._rootElement = Selector.select( selector );
            if( this._rootElement.length <= 0 ){
                throw '[Ink.UI.Toggle] Root element not found';
            }

            this._rootElement = this._rootElement[0];
        } else {
            this._rootElement = selector;
        }

        this._options = Ink.extendObj({
            target : undefined,
            triggerEvent: 'click',
            closeOnClick: true
        },Element.data(this._rootElement));

        this._options = Ink.extendObj(this._options,options || {});

        this._targets = (function (target) {
            if (typeof target === 'string') {
                return Selector.select(target);
            } else if (typeof target === 'object') {
                if (target.constructor === Array) {
                    return target;
                } else {
                    return [target];
                }
            }
        }(this._options.target));

        if (!this._targets.length) {
            throw '[Ink.UI.Toggle] Toggle target was not found! Supply a valid selector, array, or element through the `target` option.';
        }

        this._init();
    };

    Toggle.prototype = {

        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        _init: function(){

            this._accordion = ( Css.hasClassName(this._rootElement.parentNode,'accordion') || Css.hasClassName(this._targets[0].parentNode,'accordion') );

            Event.observe( this._rootElement, this._options.triggerEvent, Ink.bindEvent(this._onTriggerEvent,this) );
            if( this._options.closeOnClick.toString() === 'true' ){
                Event.observe( document, 'click', Ink.bindEvent(this._onClick,this));
            }
        },

        /**
         * Event handler. It's responsible for handling the <triggerEvent> defined in the options.
         * This will trigger the toggle.
         * 
         * @method _onTriggerEvent
         * @param {Event} event
         * @private
         */
        _onTriggerEvent: function( event ){

            if( this._accordion ){
                var elms, i, accordionElement;
                if( Css.hasClassName(this._targets[0].parentNode,'accordion') ){
                    accordionElement = this._targets[0].parentNode;
                } else {
                    accordionElement = this._targets[0].parentNode.parentNode;
                }
                elms = Selector.select('.toggle',accordionElement);
                for( i=0; i<elms.length; i+=1 ){
                    var
                        dataset = Element.data( elms[i] ),
                        targetElm = Selector.select( dataset.target,accordionElement )
                    ;
                    if( (targetElm.length > 0) && (targetElm[0] !== this._targets[0]) ){
                        targetElm[0].style.display = 'none';
                    }
                }
            }
            
            var finalClass,
                finalDisplay;


            for (var j = 0, len = this._targets.length; j < len; j++) {
                finalClass = ( Css.getStyle(this._targets[j],'display') === 'none') ? 'show-all' : 'hide-all';
                finalDisplay = ( Css.getStyle(this._targets[j],'display') === 'none') ? 'block' : 'none';
                Css.removeClassName(this._targets[j],'show-all');
                Css.removeClassName(this._targets[j], 'hide-all');
                Css.addClassName(this._targets[j], finalClass);
                this._targets[j].style.display = finalDisplay;
            }

            if( finalClass === 'show-all' ){
                Css.addClassName(this._rootElement,'active');
            } else {
                Css.removeClassName(this._rootElement,'active');
            }
        },

        /**
         * Click handler. Will handle clicks outside the toggle component.
         * 
         * @method _onClick
         * @param {Event} event
         * @private
         */
        _onClick: function( event ){
            var
                tgtEl = Event.element(event),
                shades
            ;

            var ancestorOfTargets = InkArray.some(this._targets, function (target) {
                return Element.isAncestorOf(target, tgtEl);
            });

            if( (this._rootElement === tgtEl) || Element.isAncestorOf(this._rootElement, tgtEl) || ancestorOfTargets ) {
                return;
            } else if( (shades = Ink.ss('.ink-shade')).length ) {
                var
                    shadesLength = shades.length
                ;

                for( var i = 0; i < shadesLength; i++ ){
                    if( Element.isAncestorOf(shades[i],tgtEl) && Element.isAncestorOf(shades[i],this._rootElement) ){
                        return;
                    }
                }
            }

            if(!Element.findUpwardsByClass(tgtEl, 'toggle')) {
                return;
            }
            
            this._dismiss( this._rootElement );
        },

        /**
         * Dismisses the toggling.
         * 
         * @method _dismiss
         * @private
         */
        _dismiss: function(){
            if( ( Css.getStyle(this._targets[0],'display') === 'none') ){
                return;
            }
            
            for (var i = 0, len = this._targets.length; i < len; i++) {
                Css.removeClassName(this._targets[i], 'show-all');
                Css.addClassName(this._targets[i], 'hide-all');
                this._targets[i].style.display = 'none';
            }
            Css.removeClassName(this._rootElement,'active');
        }
    };

    return Toggle;

});
