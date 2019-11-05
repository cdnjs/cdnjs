/**
 * Galleria Miniml Theme
 *
 *
 * Copyright (c) 2010 - 2019 worse is better UG
 * Licensed under the MIT License.
 */

( function( window, factory ) {
    if ( typeof define == 'function' && define.amd ) {
        define( ['../galleria', 'jquery' ], function( Galleria, jQuery ) {
            return factory( window, Galleria, jQuery );
        });
    } else if ( typeof module == 'object' && module.exports ) {
        module.exports = factory(
            window,
            require('galleria'),
            require('jquery')
        );
    } else {
        factory(
            window,
            window.Galleria,
            window.jQuery
        );
    }
}( window, function factory( window, Galleria, $ ) {
/*global jQuery, Galleria */

Galleria.addTheme({
    name: 'miniml',
    version: 1.60,
    author: 'Galleria',
    css: 'galleria.miniml.css',
    // begin site script
    defaults: {
        transition: 'pulse',
        thumbCrop: true,
        imageCrop: true,
        carousel: false,
        imagePan: true,
        clicknext:true,

        _locale: {
            enter_fullscreen: 'Enter fullscreen',
            exit_fullscreen: 'Exit fullscreen',
            click_to_close: 'Click to close',
            show_thumbnails: 'Show thumbnails',
            show_info: 'Show info'
        }
    },
    init: function(options) {

        Galleria.requires( 1.6, 'This version of Miniml theme requires Galleria version 1.6 or later');

        var self = this,
            FULLSCREEN = false,
            i,
            dotswidth = 0,
            $desc,
            $loader,
            $thumbnails;

        // add some elements
        this.addElement('desc','dots','thumbs','fs','more');
        this.append({
            'container' : ['desc','dots','thumbs','fs','info-description','more']
        });

        $thumbnails = this.$('thumbnails-container').hide().css('visibility', 'visible');

        var createDiv = function(i) {
            return $('<div>').html('&#8226;').on('click:fast', (function(i) {
                return function(e) {
                    e.preventDefault();
                    self.show(i);
                };
            }( i )));
        };

        for (i = 0; i < this.getDataLength(); i++ ) {
            this.$('dots').append( createDiv(i) );
        }

        dotswidth = this.$('dots').outerWidth();

        $desc = this.$('desc').hide().hover(function() {
            $(this).addClass('hover');
        }, function() {
            $(this).removeClass('hover');
        }).on('click:fast', function() {
            $(this).hide();
        });

        $loader = this.$('loader');

        this.bindTooltip({
            fs: function() {
                return FULLSCREEN ? options._locale.exit_fullscreen : options._locale.enter_fullscreen;
            },
            desc: options._locale.click_to_close,
            more: options._locale.show_info,
            thumbs: options._locale.show_thumbnails
        });

        this.bind('loadstart', function(e) {
            if (!e.cached) {
                this.$('loader').show().fadeTo(200, 0.4);
            }
        });

        this.bind('loadfinish', function(e) {

            var title = self.getData().title,
                desc = self.getData().description;

            $loader.fadeOut(200);
            this.$('dots').children('div').eq( e.index ).addClass('active')
                .siblings('.active').removeClass('active');

            if (title && desc) {
                $desc.empty().append(
                    '<strong>'+ title + '</strong>',
                    '<p>' + desc + '</p>'
                )
                this.$('more').show();
            } else {
                this.$('more').hide();
            }

            $thumbnails.fadeOut( options.fadeSpeed );
            self.$('thumbs').removeClass('active');

        });

        this.bind('thumbnail', function(e) {
            $(e.thumbTarget).hover(function() {
                self.setInfo(e.index);
            },function() {
                self.setInfo();

            });
        });

        this.$('fs').on('click:fast', function() {
            self.toggleFullscreen();
            FULLSCREEN = !FULLSCREEN;
        });

        this.$('thumbs').on('click:fast', function(e) {
            e.preventDefault();
            $thumbnails.toggle();
            $(this).toggleClass('active');
            $desc.hide();
        });

        this.$('more').on('click:fast', function() {
            $desc.toggle();
        });

        this.$('info').css({
            width: this.getStageWidth() - dotswidth - 30,
            left: dotswidth + 10
        });

    }
    // end site script
});

    return Galleria;
}));
