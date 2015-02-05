/*! jQuery Contextify - Lightweight Context Menu - v1.0.1 - 2014-10-21
* http://contextify.donlabs.com
* Copyright (c) 2014 ABE Media - Web Design Brighton; Licensed GPL-2.0 */
;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName = 'contextify',
        defaults = {
            propertyName: "value"
        },
        contextifyId = 0;

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
        
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        var menu = $('<ul class="contextify dropdown-menu"/>');
        var l = this.options.items.length;
        var i;
        
        for (i = 0; i < l; i++) {
            var item = this.options.items[i];
            var el = $('<li/>');
            
            if (item.divider) {
                el.addClass('divider');
            } 
            else if (item.header) {
                el.addClass('dropdown-header');
                el.text(item.text);
            }
            else {
                el.append('<a/>');
                el.find('a').text(item.text);
                
                if (item.href) {
                    el.find('a').attr('href', item.href);
                }
                
                if (item.onclick) {
                    el.on('click', item.onclick);
                }
            }
            
            menu.append(el);
        }
        
        menu.attr('id', pluginName + '-' + contextifyId);
        
        $('body').append(menu);
        
        $(this.element)
        .attr('data-contextify-id', contextifyId)
        .on('contextmenu', function (e) {
            e.preventDefault();
            var menu = $('#'+ pluginName + '-' + $(this).attr('data-contextify-id')),
                x = (menu.width() + e.clientX < $(window).width()) ? e.clientX : e.clientX - menu.width(),
                y = (menu.height() + e.clientY < $(window).height()) ? e.clientY : e.clientY - menu.height();
            
            menu
                .css('top', y)
                .css('left', x)
                .show();
        })
        .parents()
        .on('mouseup', function () {
            $('.contextify:visible').hide();
        });
        
        contextifyId++;
        //return this.element;
    };
    
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );
