/**
 * @module Ink.UI.Modal_1
 * @author inkdev AT sapo.pt
 * @version 1
 */
Ink.createModule('Ink.UI.Modal', '1', ['Ink.UI.Aux_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Aux, Event, Css, Element, Selector, InkArray ) {
    'use strict';

    /**
     * @class Ink.UI.Modal
     * @constructor
     * @version 1
     * @param {String|DOMElement} selector
     * @param {Object} [options] Options
     *      @param {String}    [options.width]             Default/Initial width. Ex: '600px'
     *      @param {String}    [options.height]            Default/Initial height. Ex: '400px'
     *      @param {String}    [options.shadeClass]        Custom class to be added to the div.ink-shade
     *      @param {String}    [options.modalClass]        Custom class to be added to the div.ink-modal
     *      @param {String}    [options.trigger]           CSS Selector to target elements that will trigger the Modal.
     *      @param {String}    [options.triggerEvent]      Trigger's event to be listened. 'click' is the default value. Ex: 'mouseover', 'touchstart'...
     *      @param {Boolean}   [options.autoDisplay=true]  Display the Modal automatically when constructed.
     *      @param {String}    [options.markup]            Markup to be placed in the Modal when created
     *      @param {Function}  [options.onShow]            Callback function to run when the Modal is opened.
     *      @param {Function}  [options.onDismiss]         Callback function to run when the Modal is closed. Return `false` to cancel dismissing the Modal.
     *      @param {Boolean}   [options.closeOnClick]      Determines if the Modal should close when clicked outside of it. 'false' by default.
     *      @param {Boolean}   [options.responsive]        Determines if the Modal should behave responsively (adapt to smaller viewports).
     *      @param {Boolean}   [options.disableScroll]     Determines if the Modal should 'disable' the page's scroll (not the Modal's body).
     *
     * @example
     *      <div class="ink-shade fade">
     *          <div id="test" class="ink-modal fade" data-trigger="#bModal" data-width="800px" data-height="400px">
     *              <div class="modal-header">
     *                  <button class="modal-close ink-dismiss"></button>
     *                  <h5>Modal windows can have headers</h5>
     *              </div>
     *              <div class="modal-body" id="modalContent">
     *                  <h3>Please confirm your previous choice</h3>
     *                  <p>"No," said Peleg, "and he hasn't been baptized right either, or it would have washed some of that devil's blue off his face."</p>
     *                  <p>
     *                      <img src="http://placehold.it/800x400" style="width: 100%;" alt="">
     *                  </p>
     *                  <p>"Do tell, now," cried Bildad, "is this Philistine a regular member of Deacon Deuteronomy's meeting? I never saw him going there, and I pass it every Lord's day."</p>
     *                  <p>"I don't know anything about Deacon Deuteronomy or his meeting," said I; "all I know is, that Queequeg here is a born member of the First Congregational Church. He is a deacon himself, Queequeg is."</p>
     *              </div>
     *              <div class="modal-footer">
     *                  <div class="push-right">
     *                      <button class="ink-button info">Confirm</button>
     *                      <button class="ink-button caution ink-dismiss">Cancel</button>
     *                  </div>
     *              </div>
     *          </div>
     *      </div>
     *      <a href="#" id="bModal">Open modal</a>
     *      <script>
     *          Ink.requireModules( ['Ink.Dom.Selector_1','Ink.UI.Modal_1'], function( Selector, Modal ){
     *              var modalElement = Ink.s('#test');
     *              var modalObj = new Modal( modalElement );
     *          });
     *      </script>
     */
    var Modal = function(selector, options) {

        if( (typeof selector !== 'string') && (typeof selector !== 'object') && (typeof options.markup === 'undefined') ){
            throw 'Invalid Modal selector';
        } else if(typeof selector === 'string'){
            if( selector !== '' ){
                this._element = Selector.select(selector);
                if( this._element.length === 0 ){
                    /**
                     * From a developer's perspective this should be like it is...
                     * ... from a user's perspective, if it doesn't find elements, should just ignore it, no?
                     */
                    throw 'The Modal selector has not returned any elements';
                } else {
                    this._element = this._element[0];
                }
            }
        } else if( !!selector ){
            this._element = selector;
        }

        this._options = {
            /**
             * Width, height and markup really optional, as they can be obtained by the element
             */
            width:        undefined,
            height:       undefined,

            /**
             * To add extra classes
             */
            shadeClass: undefined,
            modalClass: undefined,

            /**
             * Optional trigger properties
             */
            trigger:      undefined,
            triggerEvent: 'click',
            autoDisplay:  true,

            /**
             * Remaining options
             */
            markup:       undefined,
            onShow:       undefined,
            onDismiss:    undefined,
            closeOnClick: false,
            responsive:    true,
            disableScroll: true
        };


        this._handlers = {
            click:   Ink.bindEvent(this._onClick, this),
            keyDown: Ink.bindEvent(this._onKeyDown, this),
            resize:  Ink.bindEvent(this._onResize, this)
        };

        this._wasDismissed = false;

        /**
         * Modal Markup
         */
        if( this._element ){
            this._markupMode = Css.hasClassName(this._element,'ink-modal'); // Check if the full modal comes from the markup
        } else {
            this._markupMode = false;
        }




        if( !this._markupMode ){


            this._modalShadow      = document.createElement('div');
            this._modalShadowStyle = this._modalShadow.style;

            this._modalDiv         = document.createElement('div');
            this._modalDivStyle    = this._modalDiv.style;

            if( !!this._element ){
                this._options.markup = this._element.innerHTML;
            }

            /**
             * Not in full markup mode, let's set the classes and css configurations
             */
            Css.addClassName( this._modalShadow,'ink-shade' );
            Css.addClassName( this._modalDiv,'ink-modal' );
            Css.addClassName( this._modalDiv,'ink-space' );

            /**
             * Applying the main css styles
             */
            // this._modalDivStyle.position = 'absolute';
            this._modalShadow.appendChild( this._modalDiv);
            document.body.appendChild( this._modalShadow );
        } else {
            this._modalDiv         = this._element;
            this._modalDivStyle    = this._modalDiv.style;
            this._modalShadow      = this._modalDiv.parentNode;
            this._modalShadowStyle = this._modalShadow.style;

            this._contentContainer = Selector.select(".modal-body",this._modalDiv);
            if( !this._contentContainer.length ){
                throw 'Missing div with class "modal-body"';
            }

            this._contentContainer = this._contentContainer[0];
            this._options.markup = this._contentContainer.innerHTML;

            /**
             * First, will handle the least important: The dataset
             */
            this._options = Ink.extendObj(this._options,Element.data(this._element));

        }

        /**
         * Now, the most important, the initialization options
         */
        this._options = Ink.extendObj(this._options,options || {});

        if( !this._markupMode ){
            this.setContentMarkup(this._options.markup);
        }

        if( typeof this._options.shadeClass === 'string' ){

            InkArray.each( this._options.shadeClass.split(' '), Ink.bind(function( item ){
                Css.addClassName( this._modalShadow, item.trim() );
            }, this));
        }

        if( typeof this._options.modalClass === 'string' ){
            InkArray.each( this._options.modalClass.split(' '), Ink.bind(function( item ){
                Css.addClassName( this._modalDiv, item.trim() );
            }, this));
        }

        if( ("trigger" in this._options) && ( typeof this._options.trigger !== 'undefined' ) ){
            var triggerElement,i;
            if( typeof this._options.trigger === 'string' ){
                triggerElement = Selector.select( this._options.trigger );
                if( triggerElement.length > 0 ){
                    for( i=0; i<triggerElement.length; i++ ){
                        Event.observe( triggerElement[i], this._options.triggerEvent, Ink.bindEvent(this.open, this) );
                    }
                }
            }
        } else if ( this._options.autoDisplay ) {
            this.open();
        }
    };

    Modal.prototype = {

        /**
         * Responsible for repositioning the modal
         * 
         * @method _reposition
         * @private
         */
        _reposition: function(){

            this._modalDivStyle.top = this._modalDivStyle.left = '50%';

            this._modalDivStyle.marginTop = '-' + ( ~~( Element.elementHeight(this._modalDiv)/2) ) + 'px';
            this._modalDivStyle.marginLeft = '-' + ( ~~( Element.elementWidth(this._modalDiv)/2) ) + 'px';
        },

        /**
         * Responsible for resizing the modal
         * 
         * @method _onResize
         * @param {Boolean|Event} runNow Its executed in the begining to resize/reposition accordingly to the viewport. But usually it's an event object.
         * @private
         */
        _onResize: function( runNow ){

            if( typeof runNow === 'boolean' ){
                this._timeoutResizeFunction.call(this);
            } else if( !this._resizeTimeout && (typeof runNow === 'object') ){
                this._resizeTimeout = setTimeout(Ink.bind(this._timeoutResizeFunction, this),250);
            }
        },

        /**
         * Timeout Resize Function
         * 
         * @method _timeoutResizeFunction
         * @private
         */
        _timeoutResizeFunction: function(){
            /**
             * Getting the current viewport size
             */
            var
                elem = (document.compatMode === "CSS1Compat") ?  document.documentElement : document.body,
                currentViewportHeight = parseInt(elem.clientHeight,10),
                currentViewportWidth = parseInt(elem.clientWidth,10)
            ;

            if( ( currentViewportWidth > this.originalStatus.width ) /* && ( parseInt(this._modalDivStyle.maxWidth,10) >= Element.elementWidth(this._modalDiv) )*/ ){
                /**
                 * The viewport width has expanded
                 */
                this._modalDivStyle.width = this._modalDivStyle.maxWidth;

            } else {
                /**
                 * The viewport width has not changed or reduced
                 */
                //this._modalDivStyle.width = (( currentViewportWidth * this.originalStatus.width ) / this.originalStatus.viewportWidth ) + 'px';
                this._modalDivStyle.width = (~~( currentViewportWidth * 0.9)) + 'px';
            }

            if( (currentViewportHeight > this.originalStatus.height) && (parseInt(this._modalDivStyle.maxHeight,10) >= Element.elementHeight(this._modalDiv) ) ){

                /**
                 * The viewport height has expanded
                 */
                //this._modalDivStyle.maxHeight =
                this._modalDivStyle.height = this._modalDivStyle.maxHeight;

            } else {
                /**
                 * The viewport height has not changed, or reduced
                 */
                this._modalDivStyle.height = (~~( currentViewportHeight * 0.9)) + 'px';
            }

            this._resizeContainer();
            this._reposition();
            this._resizeTimeout = undefined;
        },

        /**
         * Navigation click handler
         * 
         * @method _onClick
         * @param {Event} ev
         * @private
         */
        _onClick: function(ev) {
            var tgtEl = Event.element(ev);

            if (Css.hasClassName(tgtEl, 'ink-close') || Css.hasClassName(tgtEl, 'ink-dismiss') || 
                Element.findUpwardsByClass(tgtEl, 'ink-close') || Element.findUpwardsByClass(tgtEl, 'ink-dismiss') ||
                (
                    this._options.closeOnClick &&
                    (!Element.descendantOf(this._shadeElement, tgtEl) || (tgtEl === this._shadeElement))
                )
            ) {
                var 
                    alertsInTheModal = Selector.select('.ink-alert',this._shadeElement),
                    alertsLength = alertsInTheModal.length
                ;
                for( var i = 0; i < alertsLength; i++ ){
                    if( Element.descendantOf(alertsInTheModal[i], tgtEl) ){
                        return;
                    }
                }

                Event.stop(ev);
                this.dismiss();
            }
        },

        /**
         * Responsible for handling the escape key pressing.
         *
         * @method _onKeyDown
         * @param  {Event} ev
         * @private
         */
        _onKeyDown: function(ev) {
            if (ev.keyCode !== 27 || this._wasDismissed) { return; }
            this.dismiss();
        },

        /**
         * Responsible for setting the size of the modal (and position) based on the viewport.
         * 
         * @method _resizeContainer
         * @private
         */
        _resizeContainer: function()
        {

            this._contentElement.style.overflow = this._contentElement.style.overflowX = this._contentElement.style.overflowY = 'hidden';
            var containerHeight = Element.elementHeight(this._modalDiv);

            this._modalHeader = Selector.select('.modal-header',this._modalDiv);
            if( this._modalHeader.length>0 ){
                this._modalHeader = this._modalHeader[0];
                containerHeight -= Element.elementHeight(this._modalHeader);
            }

            this._modalFooter = Selector.select('.modal-footer',this._modalDiv);
            if( this._modalFooter.length>0 ){
                this._modalFooter = this._modalFooter[0];
                containerHeight -= Element.elementHeight(this._modalFooter);
            }

            this._contentContainer.style.height = containerHeight + 'px';
            if( containerHeight !== Element.elementHeight(this._contentContainer) ){
                this._contentContainer.style.height = ~~(containerHeight - (Element.elementHeight(this._contentContainer) - containerHeight)) + 'px';
            }

            if( this._markupMode ){ return; }

            this._contentContainer.style.overflow = this._contentContainer.style.overflowX = 'hidden';
            this._contentContainer.style.overflowY = 'auto';
            this._contentElement.style.overflow = this._contentElement.style.overflowX = this._contentElement.style.overflowY = 'visible';
        },

        /**
         * Responsible for 'disabling' the page scroll
         * 
         * @method _disableScroll
         * @private
         */
        _disableScroll: function()
        {
            this._oldScrollPos = Element.scroll();
            this._onScrollBinded = Ink.bindEvent(function(event) {
                var tgtEl = Event.element(event);

                if( !Element.descendantOf(this._modalShadow, tgtEl) ){
                    Event.stop(event);
                    window.scrollTo(this._oldScrollPos[0], this._oldScrollPos[1]);
                }
            },this);
            Event.observe(window, 'scroll', this._onScrollBinded);
            Event.observe(document, 'touchmove', this._onScrollBinded);
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Display this Modal. Useful if you have initialized the modal
         * @method open 
         * @param {Event} [event] (internal) In case its fired by the internal trigger.
         */
        open: function(event) {

            if( event ){ Event.stop(event); }

            var elem = (document.compatMode === "CSS1Compat") ?  document.documentElement : document.body;

            this._resizeTimeout    = null;

            Css.addClassName( this._modalShadow,'ink-shade' );
            this._modalShadowStyle.display = this._modalDivStyle.display = 'block';
            setTimeout(Ink.bind(function(){
                Css.addClassName( this._modalShadow,'visible' );
                Css.addClassName( this._modalDiv,'visible' );
            }, this),100);

            /**
             * Fallback to the old one
             */
            this._contentElement = this._modalDiv;
            this._shadeElement   = this._modalShadow;

            if( !this._markupMode ){
                /**
                 * Setting the content of the modal
                 */
                this.setContentMarkup( this._options.markup );
            }

            /**
             * If any size has been user-defined, let's set them as max-width and max-height
             */
            if( typeof this._options.width !== 'undefined' ){
                this._modalDivStyle.width = this._options.width;
                if( this._options.width.indexOf('%') === -1 ){
                    this._modalDivStyle.maxWidth = Element.elementWidth(this._modalDiv) + 'px';
                }
            } else {
                this._modalDivStyle.maxWidth = this._modalDivStyle.width = Element.elementWidth(this._modalDiv)+'px';
            }

            if( parseInt(elem.clientWidth,10) <= parseInt(this._modalDivStyle.width,10) ){
                this._modalDivStyle.width = (~~(parseInt(elem.clientWidth,10)*0.9))+'px';
            }

            if( typeof this._options.height !== 'undefined' ){
                this._modalDivStyle.height = this._options.height;
                if( this._options.height.indexOf('%') === -1 ){
                    this._modalDivStyle.maxHeight = Element.elementHeight(this._modalDiv) + 'px';
                }
            } else {
                this._modalDivStyle.maxHeight = this._modalDivStyle.height = Element.elementHeight(this._modalDiv) + 'px';
            }

            if( parseInt(elem.clientHeight,10) <= parseInt(this._modalDivStyle.height,10) ){
                this._modalDivStyle.height = (~~(parseInt(elem.clientHeight,10)*0.9))+'px';
            }

            this.originalStatus = {
                viewportHeight:     parseInt(elem.clientHeight,10),
                viewportWidth:      parseInt(elem.clientWidth,10),
                width:              parseInt(this._modalDivStyle.maxWidth,10),
                height:             parseInt(this._modalDivStyle.maxHeight,10)
            };

            /**
             * Let's 'resize' it:
             */
            if(this._options.responsive) {
                this._onResize(true);
                Event.observe( window,'resize',this._handlers.resize );
            } else {
                this._resizeContainer();
                this._reposition();
            }

            if (this._options.onShow) {
                this._options.onShow(this);
            }

            if(this._options.disableScroll) {
                this._disableScroll();
            }

            // subscribe events
            Event.observe(this._shadeElement, 'click',   this._handlers.click);
            Event.observe(document,           'keydown', this._handlers.keyDown);

            Aux.registerInstance(this, this._shadeElement, 'modal');

            this._wasDismissed = false;
        },

        /**
         * Dismisses the modal
         * 
         * @method dismiss
         * @public
         */
        dismiss: function() {
            if (this._options.onDismiss) {
                var ret = this._options.onDismiss(this);
                if (ret === false) { return; }
            }

            this._wasDismissed = true;

            if(this._options.disableScroll) {
                Event.stopObserving(window, 'scroll', this._onScrollBinded);
                Event.stopObserving(document, 'touchmove', this._onScrollBinded);
            }

            if( this._options.responsive ){
                Event.stopObserving(window, 'resize', this._handlers.resize);
            }

            // this._modalShadow.parentNode.removeChild(this._modalShadow);

            if( !this._markupMode ){
                this._modalShadow.parentNode.removeChild(this._modalShadow);
                this.destroy();
            } else {
                Css.removeClassName( this._modalDiv, 'visible' );
                Css.removeClassName( this._modalShadow, 'visible' );

                var
                    dismissInterval,
                    transitionEndFn = Ink.bindEvent(function(){
                        if( !dismissInterval ){ return; }
                        this._modalShadowStyle.display = 'none';
                        Event.stopObserving(document,'transitionend',transitionEndFn);
                        Event.stopObserving(document,'oTransitionEnd',transitionEndFn);
                        Event.stopObserving(document,'webkitTransitionEnd',transitionEndFn);
                        clearInterval(dismissInterval);
                        dismissInterval = undefined;
                    }, this)
                ;

                Event.observe(document,'transitionend',transitionEndFn);
                Event.observe(document,'oTransitionEnd',transitionEndFn);
                Event.observe(document,'webkitTransitionEnd',transitionEndFn);

                if( !dismissInterval ){
                    dismissInterval = setInterval(Ink.bind(function(){
                        if( this._modalShadowStyle.opacity > 0 ){
                            return;
                        } else {
                            this._modalShadowStyle.display = 'none';
                            clearInterval(dismissInterval);
                            dismissInterval = undefined;
                        }

                    }, this),500);
                }
            }
        },

        /**
         * Removes the modal from the DOM
         * 
         * @method destroy
         * @public
         */
        destroy: function() {
            Aux.unregisterInstance(this._instanceId);

        },

        /**
         * Returns the content DOM element
         * 
         * @method getContentElement
         * @return {DOMElement} Modal main cointainer.
         * @public
         */
        getContentElement: function() {
            return this._contentContainer;
        },

        /**
         * Replaces the content markup
         * 
         * @method setContentMarkup
         * @param {String} contentMarkup
         * @public
         */
        setContentMarkup: function(contentMarkup) {
            if( !this._markupMode ){
                this._modalDiv.innerHTML = [contentMarkup].join('');
                this._contentContainer = Selector.select(".modal-body",this._modalDiv);
                if( !this._contentContainer.length ){
                    // throw 'Missing div with class "modal-body"';
                    var tempHeader = Selector.select(".modal-header",this._modalDiv);
                    var tempFooter = Selector.select(".modal-footer",this._modalDiv);

                    InkArray.each(tempHeader,Ink.bind(function( element ){ element.parentNode.removeChild(element); },this));
                    InkArray.each(tempFooter,Ink.bind(function( element ){ element.parentNode.removeChild(element); },this));

                    var body = document.createElement('div');
                    Css.addClassName(body,'modal-body');
                    body.innerHTML = this._modalDiv.innerHTML;
                    this._modalDiv.innerHTML = '';

                    InkArray.each(tempHeader,Ink.bind(function( element ){ this._modalDiv.appendChild(element); },this));
                    this._modalDiv.appendChild(body);
                    InkArray.each(tempFooter,Ink.bind(function( element ){ this._modalDiv.appendChild(element); },this));
                    
                    this._contentContainer = Selector.select(".modal-body",this._modalDiv);
                }
                this._contentContainer = this._contentContainer[0];
            } else {
                this._contentContainer.innerHTML = [contentMarkup].join('');
            }
            this._contentElement = this._modalDiv;
            this._resizeContainer();
        }

    };

    return Modal;

});
