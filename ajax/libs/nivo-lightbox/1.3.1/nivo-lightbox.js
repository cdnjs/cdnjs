/*
 * Nivo Lightbox v1.3.1
 * http://dev7studios.com/nivo-lightbox
 *
 * Copyright 2013, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function($, window, document, undefined){

    var pluginName = 'nivoLightbox',
        defaults = {
            effect: 'fade',
            theme: 'default',
            keyboardNav: true,
            clickImgToClose: false,
            clickOverlayToClose: true,
            onInit: function(){},
            beforeShowLightbox: function(){},
            afterShowLightbox: function(lightbox){},
            beforeHideLightbox: function(){},
            afterHideLightbox: function(){},
            beforePrev: function(element){},
            onPrev: function(element){},
            beforeNext: function(element){},
            onNext: function(element){},
            errorMessage: 'The requested content cannot be loaded. Please try again later.'
        };

    function NivoLightbox(element, options){
        this.el = element;
        this.$el = $(this.el);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    NivoLightbox.prototype = {

        init: function(){
			var $this = this;

			// Need this so we don't use CSS transitions in mobile
			if(!$('html').hasClass('nivo-lightbox-notouch')) $('html').addClass('nivo-lightbox-notouch');
			if('ontouchstart' in document) $('html').removeClass('nivo-lightbox-notouch');

			// Setup the click
            this.$el.on('click', function(e){
                $this.showLightbox(e);
            });

            // keyboardNav
            if(this.options.keyboardNav){
                $('body').off('keyup').on('keyup', function(e){
                    var code = (e.keyCode ? e.keyCode : e.which);
                    // Escape
                    if(code == 27) $this.destructLightbox();
                    // Left
                    if(code == 37) $('.nivo-lightbox-prev').trigger('click');
                    // Right
                    if(code == 39) $('.nivo-lightbox-next').trigger('click');
				});
			}

			this.options.onInit.call(this);

        },

        showLightbox: function(e){
            var $this = this,
                currentLink = this.$el;

			// Check content
			var check = this.checkContent(currentLink);
			if(!check) return;

			e.preventDefault();
            this.options.beforeShowLightbox.call(this);
            var lightbox = this.constructLightbox();
            if(!lightbox) return;
            var content = lightbox.find('.nivo-lightbox-content');
            if(!content) return;

            $('body').addClass('nivo-lightbox-body-effect-'+ this.options.effect);

			this.processContent( content, currentLink );

            // Nav
            if(this.$el.attr('data-lightbox-gallery')){
                var galleryItems = $('[data-lightbox-gallery="'+ this.$el.attr('data-lightbox-gallery') +'"]');

                $('.nivo-lightbox-nav').show();

				// Prev
                $('.nivo-lightbox-prev').off('click').on('click', function(e){
                    e.preventDefault();
                    var index = galleryItems.index(currentLink);
                    currentLink = galleryItems.eq(index - 1);
                    if(!$(currentLink).length) currentLink = galleryItems.last();
                    $.when($this.options.beforePrev.call(this, [ currentLink ])).done(function(){
                        $this.processContent(content, currentLink);
                        $this.options.onPrev.call(this, [ currentLink ]);
                    });
                });

                // Next
                $('.nivo-lightbox-next').off('click').on('click', function(e){
                    e.preventDefault();
                    var index = galleryItems.index(currentLink);
                    currentLink = galleryItems.eq(index + 1);
                    if(!$(currentLink).length) currentLink = galleryItems.first();
                    $.when($this.options.beforeNext.call(this, [ currentLink ])).done(function(){
                        $this.processContent(content, currentLink);
                        $this.options.onNext.call(this, [ currentLink ]);
                    });
                });
            }

            setTimeout(function(){
                lightbox.addClass('nivo-lightbox-open');
                $this.options.afterShowLightbox.call(this, [ lightbox ]);
            }, 1); // For CSS transitions
        },

		checkContent: function( link ) {
			var $this = this,
                href = link.attr('href'),
                video = href.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);

            if(href.match(/\.(jpeg|jpg|gif|png)$/i) !== null){
				return true;
			}
			// Video (Youtube/Vimeo)
            else if(video){
				return true;
			}
			// AJAX
			else if(link.attr('data-lightbox-type') == 'ajax'){
				return true;
			}
			// Inline HTML
			else if(href.substring(0, 1) == '#' && link.attr('data-lightbox-type') == 'inline'){
				return true;
			}
			// iFrame (default)
			else if(link.attr('data-lightbox-type') == 'iframe'){
				return true;
			}

			return false;
		},

        processContent: function(content, link){
            var $this = this,
                href = link.attr('href'),
                video = href.match(/(youtube|youtube-nocookie|youtu|vimeo)\.(com|be)\/(watch\?v=([\w-]+)|([\w-]+))/);

            content.html('').addClass('nivo-lightbox-loading');

            // Is HiDPI?
            if(this.isHidpi() && link.attr('data-lightbox-hidpi')){
                href = link.attr('data-lightbox-hidpi');
            }

            // Image
            if(href.match(/\.(jpeg|jpg|gif|png)$/i) !== null){
                var img = $('<img>', { src: href, 'class': 'nivo-lightbox-image-display' });
                img.one('load', function() {
					var wrap = $('<div class="nivo-lightbox-image" />');
                    wrap.append(img);
					content.html(wrap).removeClass('nivo-lightbox-loading');

					// Vertically center images
					wrap.css({
						'line-height': $('.nivo-lightbox-content').height() +'px',
						'height': $('.nivo-lightbox-content').height() +'px' // For Firefox
					});
					$(window).resize(function() {
						wrap.css({
							'line-height': $('.nivo-lightbox-content').height() +'px',
							'height': $('.nivo-lightbox-content').height() +'px' // For Firefox
						});
					});
				}).each(function() {
					if(this.complete) $(this).load();
				});

				img.error(function() {
					var wrap = $('<div class="nivo-lightbox-error"><p>'+ $this.options.errorMessage +'</p></div>');
                    content.html(wrap).removeClass('nivo-lightbox-loading');
				});
            }
            // Video (Youtube/Vimeo)
            else if(video){
                var src = '',
                    classTerm = 'nivo-lightbox-video';

                if(video[1] == 'youtube'){
                    src = '//www.youtube.com/embed/'+ video[4];
                    classTerm = 'nivo-lightbox-youtube';
                }
                if(video[1] == 'youtube-nocookie'){
                    src = href; //https://www.youtube-nocookie.com/embed/...
                    classTerm = 'nivo-lightbox-youtube';
                }
                if(video[1] == 'youtu'){
                    src = '//www.youtube.com/embed/'+ video[3];
                    classTerm = 'nivo-lightbox-youtube';
                }
                if(video[1] == 'vimeo'){
                    src = '//player.vimeo.com/video/'+ video[3];
                    classTerm = 'nivo-lightbox-vimeo';
                }

                if(src){
                    var iframeVideo = $('<iframe>', {
                        src: src,
                        'class': classTerm,
                        frameborder: 0,
                        vspace: 0,
                        hspace: 0,
                        scrolling: 'auto'
                    });
                    content.html(iframeVideo);
                    iframeVideo.load(function(){ content.removeClass('nivo-lightbox-loading'); });
                }
            }
            // AJAX
            else if(link.attr('data-lightbox-type') == 'ajax'){
				$.ajax({
					url: href,
					cache: false,
					success: function(data) {
						var wrap = $('<div class="nivo-lightbox-ajax" />');
						wrap.append(data);
						content.html(wrap).removeClass('nivo-lightbox-loading');

						// Vertically center html
						if(wrap.outerHeight() < content.height()){
							wrap.css({
								'position': 'relative',
								'top': '50%',
								'margin-top': -(wrap.outerHeight()/2) +'px'
							});
						}
						$(window).resize(function() {
							if(wrap.outerHeight() < content.height()){
								wrap.css({
									'position': 'relative',
									'top': '50%',
									'margin-top': -(wrap.outerHeight()/2) +'px'
								});
							}
						});
					},
					error: function(){
						var wrap = $('<div class="nivo-lightbox-error"><p>'+ $this.options.errorMessage +'</p></div>');
                        content.html(wrap).removeClass('nivo-lightbox-loading');
					}
				});
            }
            // Inline HTML
            else if(href.substring(0, 1) == '#' && link.attr('data-lightbox-type') == 'inline'){
                if($(href).length){
                    var wrap = $('<div class="nivo-lightbox-inline" />');
					wrap.append($(href).clone().show());
                    content.html(wrap).removeClass('nivo-lightbox-loading');

                    // Vertically center html
					if(wrap.outerHeight() < content.height()){
						wrap.css({
							'position': 'relative',
							'top': '50%',
							'margin-top': -(wrap.outerHeight()/2) +'px'
						});
					}
					$(window).resize(function() {
						if(wrap.outerHeight() < content.height()){
							wrap.css({
								'position': 'relative',
								'top': '50%',
								'margin-top': -(wrap.outerHeight()/2) +'px'
							});
						}
					});
				} else {
					var wrapError = $('<div class="nivo-lightbox-error"><p>'+ $this.options.errorMessage +'</p></div>');
                    content.html(wrapError).removeClass('nivo-lightbox-loading');
				}
            }
            // iFrame (default)
            else if(link.attr('data-lightbox-type') == 'iframe'){
                var iframe = $('<iframe>', {
                    src: href,
                    'class': 'nivo-lightbox-item',
                    frameborder: 0,
                    vspace: 0,
                    hspace: 0,
                    scrolling: 'auto'
                });
                content.html(iframe);
                iframe.load(function(){ content.removeClass('nivo-lightbox-loading'); });
            } else {
				return false;
			}

            // Set the title
            if(link.attr('title')){
                var titleWrap = $('<span>', { 'class': 'nivo-lightbox-title' });
                titleWrap.text(link.attr('title'));
                $('.nivo-lightbox-title-wrap').html(titleWrap);
            } else {
                $('.nivo-lightbox-title-wrap').html('');
            }
        },

        constructLightbox: function(){
            if($('.nivo-lightbox-overlay').length) return $('.nivo-lightbox-overlay');

            var overlay = $('<div>', { 'class': 'nivo-lightbox-overlay nivo-lightbox-theme-'+ this.options.theme +' nivo-lightbox-effect-'+ this.options.effect });
            var wrap = $('<div>', { 'class': 'nivo-lightbox-wrap' });
            var content = $('<div>', { 'class': 'nivo-lightbox-content' });
            var nav = $('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>');
            var close = $('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>');
            var title = $('<div>', { 'class': 'nivo-lightbox-title-wrap' });

            var isMSIE = /*@cc_on!@*/0;
            if(isMSIE) overlay.addClass('nivo-lightbox-ie');

            wrap.append(content);
            wrap.append(title);
            overlay.append(wrap);
            overlay.append(nav);
            overlay.append(close);
            $('body').append(overlay);

            var $this = this;
            if($this.options.clickOverlayToClose){
                overlay.on('click', function(e){
                    if(e.target === this || $(e.target).hasClass('nivo-lightbox-content') || $(e.target).hasClass('nivo-lightbox-image')){
                        $this.destructLightbox();
                    }
                });
            }
            if($this.options.clickImgToClose){
                overlay.on('click', function(e){
                    if(e.target === this || $(e.target).hasClass('nivo-lightbox-image-display')){
                        $this.destructLightbox();
                    }
                });
            }

            close.on('click', function(e){
                e.preventDefault();
                $this.destructLightbox();
            });

            return overlay;
        },

        destructLightbox: function(){
            var $this = this;
            this.options.beforeHideLightbox.call(this);

            $('.nivo-lightbox-overlay').removeClass('nivo-lightbox-open');
            $('.nivo-lightbox-nav').hide();
            $('body').removeClass('nivo-lightbox-body-effect-'+ $this.options.effect);

            // For IE
            var isMSIE = /*@cc_on!@*/0;
            if(isMSIE){
                $('.nivo-lightbox-overlay iframe').attr("src", " ");
                $('.nivo-lightbox-overlay iframe').remove();
            }

            // Remove click handlers
            $('.nivo-lightbox-prev').off('click');
            $('.nivo-lightbox-next').off('click');

            // Empty content (for videos)
            $('.nivo-lightbox-content').empty();

            this.options.afterHideLightbox.call(this);
        },

        isHidpi: function(){
			var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
                              (min--moz-device-pixel-ratio: 1.5),\
                              (-o-min-device-pixel-ratio: 3/2),\
                              (min-resolution: 1.5dppx)";
			if(window.devicePixelRatio > 1) return true;
			if(window.matchMedia && window.matchMedia(mediaQuery).matches) return true;
			return false;
		}

    };

    $.fn[pluginName] = function(options){
        return this.each(function(){
            if(!$.data(this, pluginName)){
                $.data(this, pluginName, new NivoLightbox(this, options));
            }
        });
    };

})(jQuery, window, document);
