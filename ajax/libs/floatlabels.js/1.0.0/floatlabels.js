/**
 * FloatLabels
 * URL: http://clubdesign.github.io/floatlabels.js/
 * Author: Marcus Pohorely ( http://www.clubdesign.at )
 * Copyright: Copyright 2013 / 2014 http://www.clubdesign.at
 *
 * Adapted for bootstrap projects by Michael Levin 2/20/14
 */

;(function ( $, window, document, undefined ) {
        var pluginName = "floatlabel",
            defaults = {
                slideInput                      : true,
                labelStartTop                   : '0px',
                labelEndTop                     : '0px',
                paddingOffset                   : '12px',
                transitionDuration              : 0.1,
                transitionEasing                : 'ease-in-out',
                labelClass                      : '',
                typeMatches                     : /text|password|email|number|search|url|tel/,
                focusColor                      : '#838780',
                blurColor                       : '#2996cc'
            };
        function Plugin ( element, options ) {
            this.$element       = $(element);
            this.settings       = $.extend( {}, defaults, options );
            this.init();
        }
        Plugin.prototype = {
            init: function () {
                var self          = this,
                    settings      = this.settings,
                    transDuration = settings.transitionDuration,
                    transEasing   = settings.transitionEasing,
                    thisElement   = this.$element;              
                var animationCss = {
                    '-webkit-transition'            : 'all ' + transDuration + 's ' + transEasing,
                    '-moz-transition'               : 'all ' + transDuration + 's ' + transEasing,
                    '-o-transition'                 : 'all ' + transDuration + 's ' + transEasing,
                    '-ms-transition'                : 'all ' + transDuration + 's ' + transEasing,
                    'transition'                    : 'all ' + transDuration + 's ' + transEasing
                };
                if( thisElement.prop('tagName').toUpperCase() != 'INPUT' &&
                    thisElement.prop('tagName').toUpperCase() != 'TEXTAREA') { return; }
                if( thisElement.prop('tagName').toUpperCase() === 'INPUT' &&
                    !settings.typeMatches.test( thisElement.attr('type') ) ) { return; }
                var elementID = thisElement.attr('id');
                if( !elementID ) {
                    elementID = Math.floor( Math.random() * 100 ) + 1;
                    thisElement.attr('id', elementID);
                }
                var placeholderText     = thisElement.attr('placeholder');
                var floatingText        = thisElement.data('label');
                var extraClasses        = thisElement.data('class');
                if( !extraClasses ) { extraClasses = ''; }
                if( !placeholderText || placeholderText === '' ) { placeholderText = "You forgot to add placeholder attribute!"; }
                if( !floatingText || floatingText === '' ) { floatingText = placeholderText; }
                this.inputPaddingTop    = parseFloat( thisElement.css('padding-top') ) + parseFloat(settings.paddingOffset);
                thisElement.wrap('<div class="floatlabel-wrapper" style="position:relative"></div>');
                thisElement.before('<label for="' + elementID + '" class="label-floatlabel ' + settings.labelClass + ' ' + extraClasses + '">' + floatingText + '</label>');
                this.$label = thisElement.prev('label');
                this.$label.css({
                    'position'                      : 'absolute',
                    'top'                           : settings.labelStartTop,
                    'left'                          : '8px', //thisElement.css('padding-left'),
                    'display'                       : 'none',
                    '-moz-opacity'                  : '0',
                    '-khtml-opacity'                : '0',
                    '-webkit-opacity'               : '0',
                    'opacity'                       : '0',
                    'font-size'                     : '11px',
                    'font-weight'                   : 'bold',
                    'color'                         : self.settings.blurColor
                });
                if( !settings.slideInput ) {                    
                    thisElement.css({ 'padding-top' : this.inputPaddingTop });
                }
                thisElement.on('keyup blur change', function( e ) {
                    self.checkValue( e );
                });
                thisElement.on('blur', function() { thisElement.prev('label').css({ 'color' : self.settings.blurColor }); });
                thisElement.on('focus', function() { thisElement.prev('label').css({ 'color' : self.settings.focusColor }); });
                window.setTimeout( function() {
                    self.$label.css( animationCss );
                    self.$element.css( animationCss );
                }, 100);
                this.checkValue();
            },
            checkValue: function( e ) {
                if( e ) {
                    var keyCode         = e.keyCode || e.which;
                    if( keyCode === 9 ) { return; }                
                }
                var thisElement  = this.$element, 
                    currentFlout = thisElement.data('flout');
                if( thisElement.val() !== "" ) { thisElement.data('flout', '1'); }
                if( thisElement.val() === "" ) { thisElement.data('flout', '0'); }
                if( thisElement.data('flout') === '1' && currentFlout !== '1' ) {
                    this.showLabel();
                }
                if( thisElement.data('flout') === '0' && currentFlout !== '0' ) {
                    this.hideLabel();
                }
            },
            showLabel: function() {
                var self = this;
                self.$label.css({ 'display' : 'block' });
                window.setTimeout(function() {
                    self.$label.css({
                        'top'                           : self.settings.labelEndTop,
                        '-moz-opacity'                  : '1',
                        '-khtml-opacity'                : '1',
                        '-webkit-opacity'               : '1',
                        'opacity'                       : '1'
                    });
                    if( self.settings.slideInput ) {
                        self.$element.css({ 'padding-top' : self.inputPaddingTop });
                    }
                    self.$element.addClass('active-floatlabel');
                }, 50);
            },
            hideLabel: function() {
                var self = this;
                self.$label.css({
                    'top'                           : self.settings.labelStartTop,
                    '-moz-opacity'                  : '0',
                    '-khtml-opacity'                : '0',
                    '-webkit-opacity'               : '0',
                    'opacity'                       : '0'
                });
                if( self.settings.slideInput ) {
                    self.$element.css({ 'padding-top' : parseFloat( self.inputPaddingTop ) - parseFloat(this.settings.paddingOffset) });
                }
                self.$element.removeClass('active-floatlabel');
                window.setTimeout(function() {
                    self.$label.css({ 'display' : 'none' });
                }, self.settings.transitionDuration * 1000);
            }
        };
        $.fn[ pluginName ] = function ( options ) {
            return this.each(function() {
                if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
                }
            });
        };
})( jQuery, window, document );
