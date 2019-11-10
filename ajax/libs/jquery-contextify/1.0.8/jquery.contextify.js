/*!
* jQuery Contextify v1.0.8 (http://contextify.js.org)
* Copyright (c) 2016 Adam Bouqdib
* Licensed under GPL-2.0 (http://abemedia.co.uk/license) 
*/

/*global define */

;(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery, window );
	}
}(function ( $, window ) {

    var pluginName = 'contextify',
        defaults = {
            items: [],
            action: "contextmenu",
            menuId: "contextify-menu",
            menuClass: "dropdown-menu",
            headerClass: "dropdown-header",
            dividerClass: "divider",
            before: false
        },
        contextifyId = 0,
        $window = $(window);

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options) ;

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
        var options = $.extend( {}, this.options, $(this.element).data());
        options.id = contextifyId;

        $(this.element)
            .attr('data-contextify-id', options.id)
            .on('contextmenu', function (e) {
                e.preventDefault();

                // run before
                if(typeof(options.before) === 'function') {
                    options.before(this, options);
                }

                var menu = $('<ul class="' + options.menuClass + '" role="menu" id="' + options.menuId + '" data-contextify-id="' + options.id + '"/>');

                menu.data(options);

                var l = options.items.length;
                var i;

                for (i = 0; i < l; i++) {
                    var item = options.items[i];
                    var el = $('<li/>');

                    if (item.divider) {
                        el.addClass(options.dividerClass);
                    }
                    else if (item.header) {
                        el.addClass(options.headerClass);
                        el.html(item.header);
                    }
                    else {
                        el.append('<a/>');
                        var a = el.find('a');

                        if (item.href) {
                            a.attr('href', item.href);
                        }
                        if (item.onclick) {
                            a.on('click', options, item.onclick);
                            a.css('cursor', 'pointer');
                        }
                        if (item.data) {
                        for (var data in item.data) {
                            menu.attr('data-' + data, item.data[data]);
                        }
                            a.data(item.data);
                        }
                        a.html(item.text);
                    }

                    menu.append(el);
                }

                var currentMenu = $("#" + options.menuId);

                if (currentMenu.length > 0) {
                    if(currentMenu !== menu) {
                        currentMenu.replaceWith(menu);
                    }
                }
                else {
                    $('body').append(menu);
                }

                var windowWidth = $window.width(),
                    windowHeight = $window.height(),
                    menuWidth = menu.outerWidth(),
                    menuHeight = menu.outerHeight(),
                    x = (menuWidth + e.clientX < windowWidth) ? e.clientX : windowWidth - menuWidth,
                    y = (menuHeight + e.clientY < windowHeight) ? e.clientY : windowHeight - menuHeight;

                menu
                    .css('top', y)
                    .css('left', x)
                    .css('position', 'fixed')
                    .show();
            })
        .parents().on('mouseup', function () {
            $("#" + options.menuId).hide();
        });

        $window.on('scroll', function () {
            $("#" + options.menuId).hide();
        });

        contextifyId++;
    };

    Plugin.prototype.destroy = function () {
        var el = $(this.element),
            options = $.extend({}, this.options, el.data());

        el
            .removeAttr('data-contextify-id')
            .off('contextmenu')
            .parents().off('mouseup', function () {
                $("#" + options.menuId).hide();
            });

        $window.off('scroll', function () {
            $("#" + options.menuId).hide();
        });

        $("#" + options.menuId).remove();
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if( $.data(this, 'plugin_' + pluginName) && Object.prototype.toString.call(options) === '[object String]' ) {
                $.data(this, 'plugin_' + pluginName)[options]();
            }
            else if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
            }
        });
    };

}));
