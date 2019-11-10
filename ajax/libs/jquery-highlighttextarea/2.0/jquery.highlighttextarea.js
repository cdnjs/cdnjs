/**
 * jQuery highlightTextarea 2.0
 *
 * Copyright 2012, Damien "Mistic" Sorel
 *    http://www.strangeplanet.fr
 *
 * thanks to Julien L for the main algorythm
 *    http://stackoverflow.com/a/7599199
 *
 * thanks to Pascal Wacker for jQuery wrapper and API methods
 *    pascal.wacker@tilllate.com
 *
 * Dual licensed under the MIT or GPL Version 3 licenses.
 *    http://www.opensource.org/licenses/mit-license.php
 *    http://www.gnu.org/licenses/gpl.html
 *
 * Depends:
 *	  jquery.js
 *    jquery-ui.js | resizable (optional)
 */
  

(function($) {
    /**
     * Plugin declaration
     */
    $.fn.highlightTextarea = function(options) {
        // callable public methods
        var callable = ['highlight','enable','disable','setOptions','setWords'];
        
        var plugin = $(this).data('highlightTextarea');
        
        // already instantiated and trying to execute a method
        if (plugin && typeof options === 'string') {
            if ($.inArray(options,callable)!==false) {
                return plugin[options].apply(plugin, Array.prototype.slice.call(arguments, 1));
            }
            else {
                throw 'Method "' + options + '" does not exist on jQuery.highlightTextarea';
            }
        }
        // not instantiated and trying to pass options object (or nothing)
        else if (!plugin && (typeof options === 'object' || !options)) {
            if (!options) {
                options = {};
            }
            
            // extend defaults
            options = $.extend({}, $.fn.highlightTextarea.defaults, options);
            options.regParam = options.caseSensitive ? 'g' : 'gi';

            // for each element instantiate the plugin
            return this.each(function() {
                var plugin = $(this).data('highlightTextarea');

                // create new instance of the plugin if the plugin isn't initialised
                if (!plugin) {
                    plugin = new $.highlightTextarea($(this), options);
                    plugin.init();
                    $(this).data('highlightTextarea', plugin);
                }
            });
        }
    }
    
    /**
     * Defaults
     */
    $.fn.highlightTextarea.defaults = {
        words:         [],
        color:         '#ffff00',
        caseSensitive: true,
        resizable:     false,
        id:            null,
        debug:         false
    };

    /**
     * Main plugin function
     */
    $.highlightTextarea = function(element, options) {
        this.options = options;
        
        if (element instanceof jQuery) {
            this.$textarea = element;
        }
        else {
            this.$textarea = $(element);
        }
        
        this.$main = null;
        this.$highlighterContainer = null;
        this.$highlighter = null;
        
        
        /*
         * init the plugin
         * scope: private
         */
        this.init = function() {
            // build the HTML wrapper
            if (this.$textarea.closest('.highlightTextarea').length <= 0) {
                this.$textarea.wrap('<div class="highlightTextarea" />');
            }
            this.$main = this.$textarea.parent('.highlightTextarea');

            if (this.$main.find('.highlighterContainer').length <= 0) {
                this.$main.prepend('<div class="highlighterContainer"></div>');
            }
            this.$highlighterContainer = this.$main.children('.highlighterContainer');
            
            if (this.$highlighterContainer.find('.highlighter').length <= 0) {
                this.$highlighterContainer.html('<div class="highlighter"></div>');
            }
            this.$highlighter = this.$highlighterContainer.children('.highlighter');

            // set id
            if (this.options.id != null) {
                this.$main.attr('id', this.options.id);
            }

            // set css
            this.updateCss();

            // bind the events
            this.bindEvents();

            // apply the resizeable
            this.applyResizable();

            // highlight content
            this.highlight();
        }

        /*
         * compute highlight
         * @param delay: boolean - use a delayed update
         * scope: public
         */
        this.highlight = function(delay) {
            if (delay==null || delay==false) {
                this.applyText(this.$textarea.val());
            }
            else {
                this.condensator($.proxy(function(){ 
                  this.applyText(this.$textarea.val()); 
                }, this), 100, 300);
            }
            
            return this.$textarea.data('highlightTextareaEvents')===true;
        }

        /*
         * update plugin options
         * scope: public
         */
        this.setOptions = function(options) {
            if (typeof options != 'object') {
                options = {};
            }
            
            this.options = $.extend({}, this.options, options);
            this.options.regParam = this.options.caseSensitive ? 'g' : 'gi';
            
            if (this.options.debug) {
                this.$highlighter.addClass('debug');
            }
            else {
                this.$highlighter.removeClass('debug');
            }
            
            if (this.$textarea.data('highlightTextareaEvents')===true) {
                this.highlight();
                return true;
            }
            else {
                return false;
            }
        }

        /*
         * update words list
         * scope: public
         */
        this.setWords = function(words) {
            if (typeof words !== 'string' && !(words instanceof Array)) {
                words = [];
            }
            else if (typeof words === 'string') {
                words = [words];
            }
            this.options.words = words;
            
            if (this.$textarea.data('highlightTextareaEvents')===true) {
                this.highlight();
                return true;
            }
            else {
                return false;
            }
        }
        
        /*
         * add events handlers
         * scope: private
         */
        this.bindEvents = function() {
            var events = this.$textarea.data('highlightTextareaEvents');
            
            if (typeof events != 'boolean' || events !== true) {
                // prevend positionning errors by allways focusing the textarea
                this.$highlighter.on({
                  'click.highlightTextarea' : $.proxy(function(){ this.$textarea.focus(); }, this)
                });
                
                // add triggers to textarea
                this.$textarea.on({
                    'input.highlightTextarea' :  $.proxy(function(){ this.highlight(true); }, this),
                    'resize.highlightTextarea' : $.proxy(function(){ this.updateSizePosition(true); }, this),
                    'scroll.highlightTextarea' : $.proxy(function(){ this.updateSizePosition(); }, this)
                });

                this.$textarea.data('highlightTextareaEvents', true);
            }
        }
          
        /*
         * remove event handlers
         * scope: private
         */
        this.unbindEvents = function() {
            this.$highlighter.off('click.highlightTextarea');
            this.$textarea.off('input.highlightTextarea scroll.highlightTextarea resize.highlightTextarea');
            this.$textarea.data('highlightTextareaEvents', false);
        }
        
        /*
         * enable the highlighting
         * scope: public
         */
        this.enable = function() {
            this.bindEvents();
            this.highlight();
        }
        
        /*
         * disable the highlighting
         * scope: public
         */
        this.disable = function() {
            this.unbindEvents();
            this.$highlighter.html(this.html_entities(this.$textarea.val()));
        }

        /*
         * set style of containers
         * scope: private
         */
        this.updateCss = function() {
            // the main container has the same size and position than the original textarea
            this.cloneCss(this.$textarea, this.$main, [
                'float','vertical-align'
            ]);
            this.$main.css({
                'width':  this.$textarea.outerWidth(true),
                'height': this.$textarea.outerHeight(true)
            });
            
            // the highlighter container is positionned at "real" top-left corner of the textarea and takes its background
            this.cloneCss(this.$textarea, this.$highlighterContainer, [
                'background','background-image','background-color','background-position','background-repeat','background-origin','background-clip','background-size',
                'padding-top','padding-right','padding-bottom','padding-left'
            ]);
            this.$highlighterContainer.css({
                'top':    this.toPx(this.$textarea.css('margin-top')) + this.toPx(this.$textarea.css('border-top-width')),
                'left':   this.toPx(this.$textarea.css('margin-left')) + this.toPx(this.$textarea.css('border-left-width')),
                'width':  this.$textarea.width(),
                'height': this.$textarea.height()
            });
            
            // the highlighter has the same size than the "inner" textarea and must have the same font properties
            this.cloneCss(this.$textarea, this.$highlighter, [
                'font-size','font-family','font-style','font-weight','line-height',
                'vertical-align','word-spacing','text-align'
            ]);
            this.$highlighter.css({
                'width':  this.$textarea.width(),
                'height': this.$textarea.height()
            });
            
            // now make the textarea transparent to see the highlighter throught
            this.$textarea.css({
                'background': 'none',
            });
            
            // display highlighter text for debuging
            if (this.options.debug) {
                this.$highlighter.addClass('debug');
            }
        }
        
        /*
         * set textarea as resizable
         * scope: private
         */
        this.applyResizable = function() {
            if (this.options.resizable && jQuery.ui) {
                this.$textarea.resizable({
                    'handles': 'se',
                    'resize':  $.proxy(function() { this.updateSizePosition(true); }, this)
                });
            }
        }

        /*
         * replace $highlighter html with formated $textarea content
         * scope: private
         */
        this.applyText = function(text) {
            text = this.html_entities(text);
            
            if (this.options.words.length > 0) {
                replace = new Array();
                
                for (var i=0; i<this.options.words.length; i++) {
                  replace.push(this.html_entities(this.options.words[i]));
                }
                
                text = text.replace(
                  new RegExp('('+replace.join('|')+')', this.options.regParam), 
                  "<span class=\"highlight\" style=\"background-color:"+this.options.color+";\">$1</span>"
                );
            }
            
            this.$highlighter.html(text);
            this.updateSizePosition();
        }

        /*
         * adapt $highlighter size and position according to $textarea size and scroll bar
         * @param forced: boolean - update containers size
         * scope: private
         */
        this.updateSizePosition = function(forced) {
            // resize containers
            if (forced) {
                this.$main.css({
                    'width':  this.$textarea.outerWidth(true),
                    'height': this.$textarea.outerHeight(true)
                });
                this.$highlighterContainer.css({
                    'width':  this.$textarea.width(),
                    'height': this.$textarea.height()
                });
            }
            
            if (
              (this.$textarea[0].clientHeight < this.$textarea[0].scrollHeight && this.$textarea.css('overflow') != 'hidden' && this.$textarea.css('overflow-y') != 'hidden')
              || this.$textarea.css('overflow') == 'scroll' || this.$textarea.css('overflow-y') == 'scroll'
            ) {
                var padding = 18;
            }
            else {
                var padding = 5;
            }
            
            this.$highlighter.css({
                'width':         this.$textarea.width()-padding,
                'height':        this.$textarea.height()+this.$textarea.scrollTop(),
                'padding-right': padding,
                'top':           -this.$textarea.scrollTop()
            });
        }

        /*
         * set 'to' css attributes listed in 'what' as defined for 'from'
         * scope: private
         */
        this.cloneCss = function(from, to, what) {
            for (var i=0; i<what.length; i++) {
                to.css(what[i], from.css(what[i]));
            }
        }

        /*
         * clean/convert px and em size to px size (without 'px' suffix)
         * scope: private
         */
        this.toPx = function(value) {
            if (value != value.replace('em', '')) {
                // https://github.com/filamentgroup/jQuery-Pixel-Em-Converter
                var that = parseFloat(value.replace('em', '')),
                    scopeTest = $('<div style="display:none;font-size:1em;margin:0;padding:0;height:auto;line-height:1;border:0;">&nbsp;</div>').appendTo('body'),
                    scopeVal = scopeTest.height();
                scopeTest.remove();
                return Math.round(that * scopeVal);
            }
            else if (value != value.replace('px', '')) {
                return parseInt(value.replace('px', ''));
            }
            else {
                return parseInt(value);
            }
        }
        
        /*
         * apply html entities
         * scope: private
         */
        this.html_entities = function(value) {
            if (value) {
                return $('<div />').text(value).html();
            }
            else {
                return '';
            }
        }
        
        /*
         * add a delay with age limit to a method
         * scope: private
         */
        var timer = null;
        var startTime = null;
        this.condensator = function(callback, ms, limit) {
            if (limit==null) {
              limit=ms;
            }
            
            var date = new Date();
            clearTimeout(timer);
            
            if (startTime==null) {
                startTime = date.getTime();
            }
            
            if (date.getTime() - startTime > limit) {
                callback.call();
                startTime = date.getTime();
            }
            else {
                timer = setTimeout(callback, ms);
            }
        }
    };
})(jQuery);