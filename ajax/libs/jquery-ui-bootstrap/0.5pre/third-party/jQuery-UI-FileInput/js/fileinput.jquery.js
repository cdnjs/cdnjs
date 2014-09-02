/**
 * --------------------------------------------------------------------
 * jQuery customfileinput plugin
 * Author: Scott Jehl, scott@filamentgroup.com
 * Copyright (c) 2009 Filament Group. Updated 2012.
 * licensed under MIT (filamentgroup.com/examples/mit-license.txt)
 * --------------------------------------------------------------------
 */

/**
 * All credits go to the Author of this file, some additional customization was
 * done for theme compat. purposes.
 *
 * Additional bugfixes/changes by smurfy
 */
!function ($) {

    "use strict"; // jshint ;_;

    /* FILEINPUT CLASS DEFINITION
     * ====================== */

    var CustomFileInput = function (content, options) {
        var self = this;
        this.$element = $(content);

        this.options = $.extend({
            classes	: (this.$element.attr('class') ? this.$element.attr('class') : ''),
        }, options);

        //create custom control container
        this.$upload = $('<div class="input-' + (('right' === this.options.button_position)?'append':'prepend') + ' customfile">');
        //create custom control feedback
        this.$uploadFeedback = $('<input type="text" readonly="readonly" class="customfile-feedback ' + this.options.classes + '" aria-hidden="true" value="' + this.options.feedback_text + '"/>').appendTo(this.$upload);
        //create custom control button
        this.$uploadButton = $('<span class="add-on customfile-button" aria-hidden="true">' + this.options.button_text + '</span>').css({ float : this.options.button_position });

        this.$element
            .addClass('customfile-input') //add class for CSS
            .on('focus', $.proxy(this.onFocus, this))
            .on('blur', $.proxy(this.onBlur, this))
            .on('disable', $.proxy(this.onDisable, this))
            .on('enable', $.proxy(this.onEnable, this))
            .on('checkChange', $.proxy(this.onCheckChange, this))
            .on('change', $.proxy(this.onChange, this))
            .on('click', $.proxy(this.onClick, this));

        if ('right' === this.options.button_position) {
            this.$uploadButton.insertAfter(this.$uploadFeedback);
        } else {
            this.$uploadButton.insertBefore(this.$uploadFeedback);
        }

        //match disabled state
        if (this.$element.is('[disabled]')) {
            this.$element.trigger('disable');
        } else {
            this.$upload.on('click', function () { self.$element.trigger('click'); });
        }

        //insert original input file in dom, css if hide it outside of screen
        this.$upload.insertAfter(this.$element);
        this.$element.insertAfter(this.$upload);
    };

    CustomFileInput.prototype = {
        constructor: CustomFileInput,

        onClick : function() {
            var self = this;
            this.$element.data('val', this.$element.val());
            setTimeout(function(){
                self.$element.trigger('checkChange');
            } ,100);
        },

        onCheckChange: function() {
            if(this.$element.val() && this.$element.val() != this.$element.data('val')){
                this.$element.trigger('change');
            }
        },

        onEnable: function() {
            this.$element.removeAttr('disabled');
            this.$upload.removeClass('customfile-disabled');
        },

        onDisable: function() {
            this.$element.attr('disabled',true);
            this.$upload.addClass('customfile-disabled');
        },

        onFocus: function() {
            this.$upload.addClass('customfile-focus');
            this.$element.data('val', this.$element.val());
        },

        onBlur: function() {
            this.$upload.removeClass('customfile-focus');
            this.$element.trigger('checkChange');
        },

        onChange : function() {
            //get file name
            var fileName = this.$element.val().split(/\\/).pop();
            if (!fileName) {
                this.$uploadFeedback
                    .val(this.options.feedback_text) //set feedback text to filename
                    .removeClass('customfile-feedback-populated'); //add class to show populated state
                this.$uploadButton.text(this.options.button_text);
            } else {
                this.$uploadFeedback
                    .val(fileName) //set feedback text to filename
                    .addClass('customfile-feedback-populated'); //add class to show populated state
                this.$uploadButton.text(this.options.button_change_text);
            }
        }
    };

    $.fn.customFileInput = function(option){
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('customFileInput')
            var options = $.extend({}, $.fn.customFileInput.defaults, $this.data(), typeof option == 'object' && option);
            if (!data) {
                $this.data('customFileInput', (data = new CustomFileInput(this, options)));
            }
        })
    };

    $.fn.customFileInput.defaults = {
        button_position 	: 'right',
        feedback_text		: 'No file selected...',
        button_text			: 'Browse',
        button_change_text	: 'Change'
    }

}(window.jQuery);

