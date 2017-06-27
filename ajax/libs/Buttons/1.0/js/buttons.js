/*! @license
 *  Project: Buttons
 *  Description: A highly customizable CSS button library built with Sass and Compass
 *  Author: Alex Wolfe
 *  License: Apache License v2.0
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {
    'use strict';

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "menuButton";
    var menuClass = ".button-dropdown";
    var defaults = {
        propertyName: "value"
    };

    // The actual plugin constructor
    function Plugin( element, options ) {

        //SET OPTIONS
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        //REGISTER ELEMENT
        this.$element = $(element);

        //INITIALIZE
        this.init();
    }

    Plugin.prototype = {
        constructor: Plugin,

        init: function() {
            // WE DON'T STOP PROPGATION SO CLICKS WILL AUTOMATICALLY
            // TOGGLE AND REMOVE THE DROPDOWN
            this.toggle();
        },

        toggle: function(el, options) {
            if(this.$element.data('dropdown') === 'show') {
                this.hideMenu();
            }
            else {
                this.showMenu();
            }
        },

        showMenu: function() {
            this.$element.data('dropdown', 'show');
            this.$element.find('ul').show();
        },

        hideMenu: function() {
            this.$element.data('dropdown', 'hide');
            this.$element.find('ul').hide();
        }
    };

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {

            // TOGGLE BUTTON IF IT EXISTS
            if ($.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName).toggle();
            }
            // OTHERWISE CREATE A NEW INSTANCE
            else {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

    //CLOSE OPEN DROPDOWN MENUS IF CLICKED SOMEWHERE ELSE
    $(document).on('click', function(e) {
        $.each($('[data-buttons=dropdown]'), function(i, value) {
            if ($(e.target.offsetParent)[0] != $(this)[0]) {
                if ($.data(this, "plugin_" + pluginName)) {
                    $.data(this, "plugin_" + pluginName).hideMenu();
                    $(this).find('ul').hide();
                }
            }
        });
    });

    //DELEGATE CLICK EVENT FOR DROPDOWN MENUS
    $(document).on('click', '[data-buttons=dropdown]', function(e) {
        var $dropdown = $(e.currentTarget);
        $dropdown.menuButton();
    });

    //IGNORE CLICK EVENTS FROM DISPLAY BUTTON IN DROPDOWN
    $(document).on('click', '[data-buttons=dropdown] > a', function(e) {
        e.preventDefault();
    });

})( jQuery, window, document);