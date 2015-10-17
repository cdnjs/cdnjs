/**
 * Modal dialog prompts
 * @module Ink.UI.Modal_1
 * @version 1
 */
Ink.createModule('Ink.UI.Modal', '1', ['Ink.UI.Common_1','Ink.Dom.Event_1','Ink.Dom.Css_1','Ink.Dom.Element_1','Ink.Dom.Selector_1','Ink.Util.Array_1'], function(Common, Event, Css, InkElement, Selector, InkArray ) {
    'use strict';

    var opacitySupported = (function (div) {
        div.style.opacity = 'invalid';
        return div.style.opacity !== 'invalid';
    }(InkElement.create('div', {style: 'opacity: 1'})));

    var vhVwSupported = (function (div) {
        return div.style.height === '10vh' && div.style.width === '10vw';
    }(InkElement.create('div', { style: 'height:10vh;width:10vw' })));

    var flexSupported = (function (div) {
        return div.style.display !== '';
    }(InkElement.create('div', { style: 'display: flex' })));

    /**
     * @class Ink.UI.Modal
     * @constructor
     * @version 1
     * @param {String|Element}      selector                        Element or ID
     * @param {Object}              [options]                       Options object, containing:
     * @param {String}              [options.width]                 Default/Initial width. Ex: '600px'
     * @param {String}              [options.height]                Default/Initial height. Ex: '400px'
     * @param {String}              [options.shadeClass]            Custom class to be added to the div.ink-shade
     * @param {String}              [options.modalClass]            Custom class to be added to the div.ink-modal
     * @param {String}              [options.trigger]               CSS Selector for target elements that will trigger the Modal.
     * @param {Boolean}             [options.autoDisplay]           Displays the Modal automatically when constructed.
     * @param {String}              [options.markup]                Markup to be placed in the Modal when created
     * @param {Function}            [options.onShow]                Callback function to run when the Modal is opened.
     * @param {Function}            [options.onDismiss]             Callback function to run when the Modal is closed. Return `false` to cancel dismissing the Modal.
     * @param {Boolean}             [options.closeOnClick]          Flag to close the modal when clicking outside of it.
     * @param {Boolean}             [options.closeOnEscape]         Determines if the Modal should close when "Esc" key is pressed. Defaults to true.
     * @param {Boolean}             [options.responsive]            Determines if the Modal should behave responsively (adapt to smaller viewports).
     * @param {String}              [options.triggerEvent]          (advanced) Trigger's event to be listened. Defaults to 'click'.
     *
     * @sample Ink_UI_Modal_1.html
     */

    function upName(dimension) {
        // omg IE
        var firstCharacter = dimension.match(/^./)[0];
        return firstCharacter.toUpperCase() + dimension.replace(/^./, '');
    }
    function maxName(dimension) {
        return 'max' + upName(dimension);
    }

    var openModals = [];

    function Modal() {
        Common.BaseUIComponent.apply(this, arguments);
    }

    Modal._name = 'Modal_1';

    Modal._optionDefinition = {
        /**
         * Width, height and markup really optional, as they can be obtained by the element
         */
        width:        ['String', undefined],
        height:       ['String', undefined],

        /**
         * To add extra classes
         */
        shadeClass:   ['String', undefined],
        modalClass:   ['String', undefined],

        /**
         * Optional trigger properties
         */
        trigger:      ['String', undefined],
        triggerEvent: ['String', 'click'],
        autoDisplay:  ['Boolean', true],

        /**
         * Remaining options
         */
        markup:       ['String', undefined],
        onShow:       ['Function', undefined],
        onDismiss:    ['Function', undefined],
        closeOnClick: ['Boolean', false],
        closeOnEscape: ['Boolean', true],
        responsive:    ['Boolean', true]
    };

    Modal.prototype = {
        _init: function () {
            this._handlers = {
                click:   Ink.bindEvent(this._onShadeClick, this),
                keyDown: Ink.bindEvent(this._onKeyDown, this),
                resize: null
            };

            this._dimensionIsPercentage = {
                width: ('' + this._options.width).indexOf('%') !== -1,
                height: ('' + this._options.height).indexOf('%') !== -1
            };

            this._isOpen = false;

            /**
             * Modal Markup
             */
            if( this._element ){
                this._markupMode = Css.hasClassName(this._element,'ink-modal'); // Check if the full modal comes from the markup
            } else {
                this._markupMode = false;
            }

            if( !this._markupMode ){
                this._modalShadow = InkElement.create('div', { className: 'ink-shade' });
                this._modalDiv    = InkElement.create('div', { className: 'ink-modal ink-space' });

                if( !!this._element ){
                    this._options.markup = this._element.innerHTML;
                }

                /**
                 * Applying the main css styles
                 */
                // this._modalDiv.style.position = 'absolute';
                this._modalShadow.appendChild( this._modalDiv);
                document.body.appendChild( this._modalShadow );
            } else {
                this._modalDiv         = this._element;
                this._modalShadow      = this._modalDiv.parentNode;

                this._contentContainer = Selector.select(".modal-body", this._modalDiv)[0];
                if( !this._contentContainer){
                    throw new Error('Ink.UI.Modal: Missing div with class "modal-body"');
                }

                this._options.markup = this._contentContainer.innerHTML;
            }

            if( !this._markupMode ){
                this.setContentMarkup(this._options.markup);
            }

            if( typeof this._options.shadeClass === 'string' ){
                Css.addClassName(this._modalShadow, this._options.shadeClass);
            }

            if( typeof this._options.modalClass === 'string' ){
                Css.addClassName(this._modalDiv, this._options.modalClass);
            }

            if( this._options.trigger ) {
                var triggerElements = Common.elsOrSelector(this._options.trigger, '');
                Event.observeMulti(triggerElements, this._options.triggerEvent, Ink.bindEvent(this.open, this));
            } else if ( this._options.autoDisplay ) {
                this.open();
            }
        },

        /**
         * Responsible for repositioning the modal
         * 
         * @method _reposition
         * @private
         */
        _reposition: function(){
            // reposition vertically
            var largerThan90Percent;

            if (vhVwSupported && this._dimensionIsPercentage.height) {
                this._modalDiv.style.marginTop = (-parseFloat(this._options.height)/2) + 'vh';
            } else if (vhVwSupported) {
                largerThan90Percent = parseFloat(this._options.height) > InkElement.viewportHeight() * 0.9;

                if (largerThan90Percent !== this._heightWasLargerThan90Percent || !largerThan90Percent) {
                    this._heightWasLargerThan90Percent = largerThan90Percent;

                    if (largerThan90Percent) {
                        this._modalDiv.style.marginTop = '0';
                        this._modalDiv.style.top = '5vh';
                    } else {
                        this._modalDiv.style.marginTop = (-parseFloat(this._options.height)/2) + 'px';
                        this._modalDiv.style.top = '';
                    }
                }
            } else {
                this._modalDiv.style.marginTop = (-InkElement.elementHeight(this._modalDiv)/2) + 'px';
            }

            // reposition horizontally
            if (vhVwSupported && this._dimensionIsPercentage.width) {
                this._modalDiv.style.marginLeft = (-parseFloat(this._options.width)/2) + 'vw';
            } else if (vhVwSupported) {
                largerThan90Percent = parseFloat(this._options.width) > InkElement.viewportWidth() * 0.9;

                if (largerThan90Percent !== this._widthWasLargerThan90Percent || !largerThan90Percent) {
                    this._widthWasLargerThan90Percent = largerThan90Percent;

                    if (largerThan90Percent) {
                        this._modalDiv.style.marginLeft = '0';
                        this._modalDiv.style.left = '5vw';
                    } else {
                        this._modalDiv.style.marginLeft = (-parseFloat(this._options.width)/2) + 'px';
                        this._modalDiv.style.left = '';
                    }
                }
            } else {
                this._modalDiv.style.marginLeft = (-InkElement.elementWidth(this._modalDiv)/2) + 'px';
            }
        },

        /**
         * Responsible for resizing the modal when the window's size changes.
         * 
         * @method _onResize
         * @private
         */
        _onResize: function( ){
            if (!vhVwSupported) {
                this._avoidModalLargerThanScreen();
            }

            if (!vhVwSupported || (!this._dimensionIsPercentage.height || !this._dimensionIsPercentage.width)) {
                this._reposition();
            }

            if (!flexSupported) {
                this._resizeContainer();
            }
        },

        /**
         * Handle clicks on the shade element.
         * 
         * @method _onShadeClick
         * @param {Event} ev DOM click event
         * @private
         */
        _onShadeClick: function(ev) {
            var tgtEl = Event.element(ev);

            if (tgtEl === this._modalShadow /* TODO rename to this._modalShade */) {
                this.dismiss();
            } else if (Css.hasClassName(tgtEl, 'ink-close') || Css.hasClassName(tgtEl, 'ink-dismiss') || 
                InkElement.findUpwardsBySelector(tgtEl, '.ink-close,.ink-dismiss') ||
                (
                    this._options.closeOnClick &&
                    (!InkElement.descendantOf(this._shadeElement, tgtEl) || (tgtEl === this._shadeElement))
                )
            ) {
                var alertsInTheModal = Selector.select('.ink-alert', this._shadeElement),
                    alertsLength = alertsInTheModal.length;
                for( var i = 0; i < alertsLength; i++ ){
                    if( InkElement.descendantOf(alertsInTheModal[i], tgtEl) ){
                        return;
                    }
                }

                this.dismiss();

                // Only stop the event if this dismisses this modal
                if (!this._isOpen) {
                    Event.stop(ev);
                }
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
            if (ev.keyCode !== 27 || !this._isOpen) { return; }
            if (this._options.closeOnEscape &&
                    openModals[openModals.length - 1] === this) {
                this.dismiss();
                if (!this._isOpen) {
                    Event.stop(ev);
                }
            }
        },

        _resizeContainer: function() {
            var containerHeight = InkElement.elementHeight(this._modalDiv);

            this._modalHeader = Selector.select('.modal-header',this._modalDiv)[0];
            if( this._modalHeader ){
                containerHeight -= InkElement.elementHeight(this._modalHeader);
            }

            this._modalFooter = Selector.select('.modal-footer',this._modalDiv)[0];
            if( this._modalFooter ){
                containerHeight -= InkElement.elementHeight(this._modalFooter);
            }

            this._contentContainer.style.height = containerHeight + 'px';

            if( this._markupMode ){ return; }
        },

        _resizeContainerFlex: function() {
            this._contentContainer.style.flex = '1';
            this._modalDiv.style.display = 'flex';
            this._modalDiv.style.flexDirection = 'column';
        },

        _avoidModalLargerThanScreen: function () {
            if (!vhVwSupported) {
                var currentViewport = {
                    height: InkElement.viewportHeight(),
                    width: InkElement.viewportWidth()
                };

                InkArray.forEach(['height', 'width'], Ink.bind(function (dimension) {
                    // Not used for percentage measurements
                    if (this._dimensionIsPercentage[dimension]) { return; }

                    if (parseFloat(this._options[dimension]) > currentViewport[dimension] * 0.9) {
                        this._modalDiv.style[dimension] = Math.round(currentViewport[dimension] * 0.9) + 'px';
                    } else {
                        if (isNaN(parseFloat(this._options[dimension]))) { return; }
                        this._modalDiv.style[dimension] = parseFloat(this._options[dimension]) + 'px';
                    }
                }, this));
            } else {
                if (!this._dimensionIsPercentage.width) {
                    this._modalDiv.style.maxWidth = '90vw';
                }
                if (!this._dimensionIsPercentage.height) {
                    this._modalDiv.style.maxHeight = '90vh';
                }
            }
        },

        /**************
         * PUBLIC API *
         **************/

        /**
         * Opens this Modal. 
         * Use this if you created the modal with `autoDisplay: false`
         * to open the modal when you want to.
         * @method open 
         * @param {Event} [event] (internal) In case its fired by the internal trigger.
         * @return {void}
         * @public
         */
        open: function(event) {
            /* jshint -W030 */

            if (this.isOpen()) { return false; }

            if( event ){ Event.stop(event); }

            var elem = (document.compatMode === "CSS1Compat") ?  document.documentElement : document.body;

            Css.addClassName( this._modalShadow,'ink-shade' );
            this._modalShadow.style.display = this._modalDiv.style.display = 'block';

            this._modalShadow.offsetHeight;  // Cause a reflow

            Css.addClassName( this._modalShadow, 'visible' );
            Css.addClassName( this._modalDiv, 'visible' );

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

            var isPercentage = {
                width: ('' + this._options.width).indexOf('%') !== -1,
                height: ('' + this._options.height).indexOf('%') !== -1
            };

            InkArray.forEach(['width', 'height'], Ink.bind(function (dimension) {
                if (this._options[dimension] !== undefined) {
                    this._modalDiv.style[dimension] = this._options[dimension];
                    if (!isPercentage[dimension]) {
                        this._modalDiv.style[maxName(dimension)] =
                            InkElement['element' + upName(dimension)](this._modalDiv) + 'px';
                    }
                } else {
                    this._modalDiv.style[maxName(dimension)] = InkElement['element' + upName(dimension)](this._modalDiv) + 'px';
                }

                if (isPercentage[dimension] && parseInt(elem['client' + maxName(dimension)], 10) <= parseInt(this._modalDiv.style[dimension], 10) ) {
                    this._modalDiv.style[dimension] = Math.round(parseInt(elem['client' + maxName(dimension)], 10) * 0.9) + 'px';
                }
            }, this));

            this.originalStatus = {
                viewportHeight:     InkElement.elementHeight(elem),
                viewportWidth:      InkElement.elementWidth(elem),
                height:             InkElement.elementHeight(this._modalDiv),
                width:              InkElement.elementWidth(this._modalDiv)
            };

            // /**
            //  * Let's resize, place it:
            //  */
            this._avoidModalLargerThanScreen();
            this._reposition();
            if (!flexSupported) {
                this._resizeContainer();
            } else {
                this._resizeContainerFlex();
            }

            // /**
            //  * Responsive modals (they're responsive by default) will resize as the viewport resizes.
            //  * They need a resize handler if we're an old browser or they're not percentage-based
            //  * (because pixel-size-based iframes become larger than the viewport at some point).
            //  **/
            if( this._options.responsive ) {
                var needResizeHandler = !(
                    vhVwSupported &&
                    flexSupported &&
                    //Css.getStyle(this._modalDiv, 'display') !== 'block' &&
                    isPercentage.height &&
                    isPercentage.width );

                if (needResizeHandler) {
                    this._handlers.resize = Event.throttle(Ink.bind(this._onResize, this), 500);
                    Event.observe(window, 'resize', this._handlers.resize);
                }
            }

            if (this._options.onShow) {
                this._options.onShow(this);
            }

            // // subscribe events
            Event.observe(this._shadeElement, 'click', this._handlers.click);
            if (this._options.closeOnEscape ) {
                Event.observe(document, 'keydown', this._handlers.keyDown);
            }

            this._isOpen = true;
            openModals.push(this);

            Css.addClassName(document.documentElement, 'ink-modal-open');
        },

        /**
         * Returns whether the modal is currently open.
         * @method isOpen
         * @return {Boolean} Whether the modal is open right now.
         * @public
         **/
        isOpen: function () {
            return this._isOpen;
        },

        /**
         * Closes the modal.
         * 
         * @method dismiss
         * @return {void}
         * @public
         */
        dismiss: function() {
            if (!this._isOpen) { /* Already dismissed. WTF IE. */ return; }

            if (this._options.onDismiss) {
                var ret = this._options.onDismiss(this);
                if (ret === false) { return; }
            }

            this._isOpen = false;

            if( this._handlers.resize ){
                Event.stopObserving(window, 'resize', this._handlers.resize);
            }

            // this._modalShadow.parentNode.removeChild(this._modalShadow);

            if( !this._markupMode ){
                this._modalShadow.parentNode.removeChild(this._modalShadow);
                this.destroy();
            } else {
                Css.removeClassName( this._modalDiv, 'visible' );
                Css.removeClassName( this._modalShadow, 'visible' );

                this._waitForFade(this._modalShadow, Ink.bind(function () {
                    this._modalShadow.style.display = 'none';
                }, this));
            }

            openModals = InkArray.remove(openModals, InkArray.keyValue(this, openModals), 1);

            if (openModals.length === 0) {  // Document level stuff now there are no modals in play.
                var htmlEl = document.documentElement;

                // Remove the class from the HTML element.
                Css.removeClassName(htmlEl, 'ink-modal-open');
            }
        },

        /**
         * Utility function to listen to the onTransmissionEnd event, or wait using setTimeouts
         *
         * Specific to this._element
         */
        _waitForFade: function (elem, callback) {
            if (!opacitySupported) { return callback(); }

            var fadeChecks = 5;
            var fadeChecker = function () {
                if( +Css.getStyle(elem, 'opacity') > 0 && fadeChecks > 0) {
                    fadeChecks--;
                    setTimeout(fadeChecker, 250);
                } else {
                    callback();
                }
            };

            setTimeout(fadeChecker, 500);
        },

        /**
         * Removes the modal from the DOM
         * 
         * @method destroy
         * @return {void}
         * @public
         */
        destroy: function() {
            Common.unregisterInstance(this._instanceId);
        },

        /**
         * Returns the content DOM element
         * 
         * @method getContentElement
         * @return {Element} Modal main cointainer.
         * @public
         */
        getContentElement: function() {
            return this._contentContainer;
        },

        /**
         * Replaces the content markup
         * 
         * @method setContentMarkup
         * @param {String} contentMarkup Markup to be placed inside the modal.
         * @return {void}
         * @public
         */
        setContentMarkup: function(contentMarkup) {
            if( !this._markupMode ){
                this._modalDiv.innerHTML = [contentMarkup].join('');
                this._contentContainer = Selector.select(".modal-body", this._modalDiv);
                if( !this._contentContainer.length ){
                    // throw 'Missing div with class "modal-body"';
                    var tempHeader = Selector.select(".modal-header", this._modalDiv);
                    var tempFooter = Selector.select(".modal-footer", this._modalDiv);

                    InkArray.each(tempHeader, InkElement.remove);
                    InkArray.each(tempFooter, InkElement.remove);

                    var body = document.createElement('div');
                    Css.addClassName(body,'modal-body');
                    body.innerHTML = this._modalDiv.innerHTML;
                    this._modalDiv.innerHTML = '';

                    var toAdd = tempHeader.concat([body]).concat(tempFooter);
                    InkArray.each(toAdd, Ink.bindMethod(this._modalDiv, 'appendChild'));

                    this._contentContainer = Selector.select(".modal-body",this._modalDiv);
                }
                this._contentContainer = this._contentContainer[0];
            } else {
                this._contentContainer.innerHTML = contentMarkup;
            }
            this._contentElement = this._modalDiv;
            this._resizeContainer();
        }
    };

    Common.createUIComponent(Modal, { elementIsOptional: true });

    return Modal;

});
