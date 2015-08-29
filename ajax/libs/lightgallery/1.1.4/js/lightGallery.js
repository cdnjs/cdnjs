/** ==========================================================

* jquery lightGallery.js v1.1.4
* http://sachinchoolur.github.io/lightGallery/
* Released under the MIT License - http://opensource.org/licenses/mit-license.html  ---- FREE ----

=========================================================/**/
;
(function($) {
    "use strict";
    $.fn.lightGallery = function(options) {
        var defaults = {
                mode: 'slide',
                useCSS: true,
                cssEasing: 'ease', //'cubic-bezier(0.25, 0, 0.25, 1)',//
                easing: 'linear', //'for jquery animation',//
                speed: 600,
                addClass: '',

                closable: true,
                loop: false,
                auto: false,
                pause: 4000,
                escKey: true,
                controls: true,
                hideControlOnEnd: false,

                preload: 1, //number of preload slides. will exicute only after the current slide is fully loaded. ex:// you clicked on 4th image and if preload = 1 then 3rd slide and 5th slide will be loaded in the background after the 4th slide is fully loaded.. if preload is 2 then 2nd 3rd 5th 6th slides will be preloaded.. ... ...
                showAfterLoad: true,
                selector: null,
                index: false,

                lang: {
                    allPhotos: 'All photos'
                },
                counter: false,

                exThumbImage: false,
                thumbnail: true,
                showThumbByDefault:false,
                animateThumb: true,
                currentPagerPosition: 'middle',
                thumbWidth: 100,
                thumbMargin: 5,


                mobileSrc: false,
                mobileSrcMaxWidth: 640,
                swipeThreshold: 50,
                enableTouch: true,
                enableDrag: true,

                vimeoColor: 'CCCCCC',
                videoAutoplay: true,
                videoMaxWidth: '855px',

                dynamic: false,
                dynamicEl: [],
                //callbacks

                onOpen: function(plugin) {},
                onSlideBefore: function(plugin) {},
                onSlideAfter: function(plugin) {},
                onSlideNext: function(plugin) {},
                onSlidePrev: function(plugin) {},
                onBeforeClose: function(plugin) {},
                onCloseAfter: function(plugin) {}
            },
            el = $(this),
            plugin = this,
            $children = null,
            index = 0,
            isActive = false,
            lightGalleryOn = false,
            isTouch = document.createTouch !== undefined || ('ontouchstart' in window) || ('onmsgesturechange' in window) || navigator.msMaxTouchPoints,
            $gallery, $galleryCont, $slider, $slide, $prev, $next, prevIndex, $thumb_cont, $thumb, windowWidth, interval, usingThumb = false,
            aTiming = false,
            aSpeed = false;
        var settings = $.extend(true, {}, defaults, options);
        var lightGallery = {
            init: function() {
                el.each(function() {
                    var $this = $(this);
                    if (settings.dynamic) {
                        $children = settings.dynamicEl;
                        index = 0;
                        prevIndex = index;
                        setUp.init(index);
                    } else {
                        if (settings.selector !== null) {
                            $children = $(settings.selector);
                        } else {
                            $children = $this.children();
                        }
                        $children.on('click', function(e) {
                            if (settings.selector !== null) {
                                $children = $(settings.selector);
                            } else {
                                $children = $this.children();
                            }
                            e.preventDefault();
                            e.stopPropagation();
                            index = $children.index(this);
                            prevIndex = index;
                            setUp.init(index);
                        });
                    }
                });
            }
        };
        var setUp = {
            init: function() {
                isActive = true;
                this.structure();
                this.getWidth();
                this.closeSlide();
                this.autoStart();
                this.counter();
                this.slideTo();
                this.buildThumbnail();
                this.keyPress();
                if (settings.index) {
                    this.slide(settings.index);
                    this.animateThumb(settings.index);
                } else {
                    this.slide(index);
                    this.animateThumb(index);
                }
                if (settings.enableDrag) {
                    this.touch();
                };
                if (settings.enableTouch) {
                    this.enableTouch();
                }

                setTimeout(function() {
                    $gallery.addClass('opacity');
                }, 50);
            },
            structure: function() {
                $('body').append('<div id="lightGallery-outer" class="' + settings.addClass + '"><div id="lightGallery-Gallery"><div id="lightGallery-slider"></div><a id="lightGallery-close" class="close"></a></div></div>').addClass('lightGallery');
                $galleryCont = $('#lightGallery-outer');
                $gallery = $('#lightGallery-Gallery');
                if (settings.showAfterLoad === true) {
                    $gallery.addClass('showAfterLoad');
                }
                $slider = $gallery.find('#lightGallery-slider');
                var slideList = '';
                if (settings.dynamic) {
                    for (var i = 0; i < settings.dynamicEl.length; i++) {
                        slideList += '<div class="lightGallery-slide"></div>';
                    }
                } else {
                    $children.each(function() {
                        slideList += '<div class="lightGallery-slide"></div>';
                    });
                }
                $slider.append(slideList);
                $slide = $gallery.find('.lightGallery-slide');
            },
            closeSlide: function() {
                var $this = this;
                if (settings.closable) {
                    $('#lightGallery-outer')
                        .on('click', function(event) {
                            if ($(event.target).is('.lightGallery-slide')) {
                                plugin.destroy(false);
                            }
                        });
                }
                $('#lightGallery-close').bind('click touchend', function() {
                    plugin.destroy(false);
                });
            },
            getWidth: function() {
                var resizeWindow = function() {
                    windowWidth = $(window).width();
                };
                $(window).bind('resize.lightGallery', resizeWindow());
            },
            doCss: function() {
                var support = function() {
                    var transition = ['transition', 'MozTransition', 'WebkitTransition', 'OTransition', 'msTransition', 'KhtmlTransition'];
                    var root = document.documentElement;
                    for (var i = 0; i < transition.length; i++) {
                        if (transition[i] in root.style) {
                            return true;
                        }
                    }
                };
                if (settings.useCSS && support()) {
                    return true;
                }
                return false;
            },
            enableTouch: function() {
                var $this = this;
                if (isTouch) {
                    var startCoords = {},
                        endCoords = {};
                    $('body').on('touchstart.lightGallery', function(e) {
                        endCoords = e.originalEvent.targetTouches[0];
                        startCoords.pageX = e.originalEvent.targetTouches[0].pageX;
                        startCoords.pageY = e.originalEvent.targetTouches[0].pageY;
                    });
                    $('body').on('touchmove.lightGallery', function(e) {
                        var orig = e.originalEvent;
                        endCoords = orig.targetTouches[0];
                        e.preventDefault();
                    });
                    $('body').on('touchend.lightGallery', function(e) {
                        var distance = endCoords.pageX - startCoords.pageX,
                            swipeThreshold = settings.swipeThreshold;
                        if (distance >= swipeThreshold) {
                            $this.prevSlide();
                            clearInterval(interval);
                        } else if (distance <= -swipeThreshold) {
                            $this.nextSlide();
                            clearInterval(interval);
                        }
                    });
                }
            },
            touch: function() {
                var xStart, xEnd;
                var $this = this;
                $('.lightGallery').bind('mousedown', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    xStart = e.pageX;
                });
                $('.lightGallery').bind('mouseup', function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    xEnd = e.pageX;
                    if (xEnd - xStart > 20) {
                        $this.prevSlide();
                    } else if (xStart - xEnd > 20) {
                        $this.nextSlide();
                    }
                });
            },
            isVideo: function(src, index) {
                var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i);
                var vimeo = src.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
                var iframe = false;
                if (settings.dynamic) {
                    if (settings.dynamicEl[index].iframe == 'true') {
                        iframe = true;
                    }
                } else {
                    if ($children.eq(index).attr('data-iframe') == 'true') {
                        iframe = true;
                    }
                }
                if (youtube || vimeo || iframe) {
                    return true;
                }
            },
            loadVideo: function(src, _id) {
                var youtube = src.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i);
                var vimeo = src.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
                var video = '';
                var a = '';
                if (youtube) {
                    if (settings.videoAutoplay === true && lightGalleryOn === false) {
                        a = '?autoplay=1&rel=0&wmode=opaque';
                    } else {
                        a = '?wmode=opaque';
                    }
                    video = '<iframe class="object" width="560" height="315" src="//www.youtube.com/embed/' + youtube[1] + a + '" frameborder="0" allowfullscreen></iframe>';
                } else if (vimeo) {
                    if (settings.videoAutoplay === true && lightGalleryOn === false) {
                        a = 'autoplay=1&amp;';
                    } else {
                        a = '';
                    }
                    video = '<iframe class="object" id="video' + _id + '" width="560" height="315"  src="http://player.vimeo.com/video/' + vimeo[1] + '?' + a + 'byline=0&amp;portrait=0&amp;color=' + settings.vimeoColor + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
                } else {
                    video = '<iframe class="object" frameborder="0" src="' + src + '"  allowfullscreen="true"></iframe>';
                }
                return '<div class="video_cont" style="max-width:' + settings.videoMaxWidth + ' !important;"><div class="video">' + video + '</div></div>';
            },
            addHtml: function(index) {
                var dataSubHtml = null;
                if (settings.dynamic) {
                    dataSubHtml = settings.dynamicEl[index]['sub-html'];
                } else {
                    dataSubHtml = $children.eq(index).attr('data-sub-html');
                }
                if (typeof dataSubHtml !== 'undefined' && dataSubHtml !== null) {
                    var fL = dataSubHtml.substring(0, 1);
                    if (fL == '.' || fL == '#') {
                        dataSubHtml = $(dataSubHtml).html();
                    } else {
                        dataSubHtml = dataSubHtml;
                    }
                    $slide.eq(index).append(dataSubHtml);
                }
            },
            preload: function(index) {
                var newIndex = index;
                for (var k = 0; k <= settings.preload; k++) {
                    if (k >= $children.length - index) {
                        break;
                    }
                    this.loadContent(newIndex + k, true);
                }
                for (var h = 0; h <= settings.preload; h++) {
                    if (newIndex - h < 0) {
                        break;
                    }
                    this.loadContent(newIndex - h, true);
                }
            },
            loadObj: function(r, index) {
                var $this = this;
                $slide.eq(index).find('.object').on('load error', function() {
                    $slide.eq(index).addClass('complete');
                });
                if (r === false) {
                    if (!$slide.eq(index).hasClass('complete')) {
                        $slide.eq(index).find('.object').on('load error', function() {
                            $this.preload(index);
                        });
                    } else {
                        $this.preload(index);
                    }
                }
            },
            loadContent: function(index, rec) {
                var $this = this;
                var i, j, l = $children.length - index;
                var src;

                if (settings.preload > $children.length) {
                    settings.preload = $children.length;
                }
                if (settings.mobileSrc === true && windowWidth <= settings.mobileSrcMaxWidth) {
                    if (settings.dynamic) {
                        src = settings.dynamicEl[index].mobileSrc;
                    } else {
                        src = $children.eq(index).attr('data-responsive-src');
                    }
                } else {
                    if (settings.dynamic) {
                        src = settings.dynamicEl[index].src;
                    } else {
                        src = $children.eq(index).attr('data-src');
                    }
                }
                var time = 0;
                if (rec === true) {
                    time = settings.speed + 400;
                }




                if (typeof src !== 'undefined' && src !== '') {
                    if (!$this.isVideo(src, index)) {
                        setTimeout(function() {
                            if (!$slide.eq(index).hasClass('loaded')) {
                                $slide.eq(index).prepend('<img class="object" src="' + src + '" />');
                                $this.addHtml(index);
                                $slide.eq(index).addClass('loaded');
                            }
                            $this.loadObj(rec, index);
                        }, time);
                    } else {
                        setTimeout(function() {
                            if (!$slide.eq(index).hasClass('loaded')) {
                                $slide.eq(index).prepend($this.loadVideo(src, index));
                                $this.addHtml(index);
                                $slide.eq(index).addClass('loaded');

                                if (settings.auto && settings.videoAutoplay === true) {
                                    clearInterval(interval);
                                }
                            }
                            $this.loadObj(rec, index);
                        }, time);

                    }
                } else {
                     setTimeout(function() {
                        if (!$slide.eq(index).hasClass('loaded')) {
                            var dataHtml = null;
                            if (settings.dynamic) {
                                dataHtml = settings.dynamicEl[index].html;
                            } else {
                                dataHtml = $children.eq(index).attr('data-html');
                            }
                            if (typeof dataHtml !== 'undefined' && dataHtml !== null) {
                                var fL = dataHtml.substring(0, 1);
                                if (fL == '.' || fL == '#') {
                                    dataHtml = $(dataHtml).html();
                                } else {
                                    dataHtml = dataHtml;
                                }
                            }
                            if (typeof dataHtml !== 'undefined' && dataHtml !== null) {
                                $slide.eq(index).append('<div class="video_cont" style="max-width:' + settings.videoMaxWidth + ' !important;"><div class="video">'+dataHtml+'</div></div>');
                            }
                            $this.addHtml(index);
                            $slide.eq(index).addClass('loaded complete');

                            if (settings.auto && settings.videoAutoplay === true) {
                                clearInterval(interval);
                            }
                        }
                        $this.loadObj(rec, index);
                    }, time);
                }

            },
            counter: function() {
                if (settings.counter === true) {
                    var slideCount = $("#lightGallery-slider > div").length;
                    $gallery.append("<div id='lightGallery_counter'><span id='lightGallery_counter_current'></span> / <span id='lightGallery_counter_all'>" + slideCount + "</span></div>");
                }
            },
            buildThumbnail: function() {
                if (settings.thumbnail === true && $children.length > 1) {
                    var $this = this,
                        $close = '';
                    if (!settings.showThumbByDefault) {
                        $close = '<span class="close ib"><i class="bUi-iCn-rMv-16" aria-hidden="true"></i></span>';
                    }
                    $gallery.append('<div class="thumb_cont"><div class="thumb_info">'+$close+'</div><div class="thumb_inner"></div></div>');
                    $thumb_cont = $gallery.find('.thumb_cont');
                    $prev.after('<a class="cLthumb"></a>');
                    $prev.parent().addClass('hasThumb');
                    $gallery.find('.cLthumb').bind('click touchend', function() {
                        $gallery.addClass('open');
                        if ($this.doCss() && settings.mode === 'slide') {
                            $slide.eq(index).prevAll().removeClass('nextSlide').addClass('prevSlide');
                            $slide.eq(index).nextAll().removeClass('prevSlide').addClass('nextSlide');
                        }
                    });
                    $gallery.find('.thumb_cont .close').bind('click touchend', function() {
                        $gallery.removeClass('open');
                    });
                    var thumbInfo = $gallery.find('.thumb_info');
                    var $thumb_inner = $gallery.find('.thumb_inner');
                    var thumbList = '';
                    var thumbImg;
                    if (settings.dynamic) {
                        for (var i = 0; i < settings.dynamicEl.length; i++) {
                            thumbImg = settings.dynamicEl[i].thumb;
                            thumbList += '<div class="thumb"><img src="' + thumbImg + '" /></div>';
                        }
                    } else {
                        $children.each(function() {
                            if (settings.exThumbImage === false || typeof $(this).attr(settings.exThumbImage) == 'undefined' || $(this).attr(settings.exThumbImage) === null) {
                                thumbImg = $(this).find('img').attr('src');
                            } else {
                                thumbImg = $(this).attr(settings.exThumbImage);
                            }
                            thumbList += '<div class="thumb"><img src="' + thumbImg + '" /></div>';
                        });
                    }
                    $thumb_inner.append(thumbList);
                    $thumb = $thumb_inner.find('.thumb');
                    $thumb.css({
                        'margin-right': settings.thumbMargin + 'px',
                        'width': settings.thumbWidth + 'px'
                    });
                    if (settings.animateThumb === true) {
                        var width = ($children.length * (settings.thumbWidth + settings.thumbMargin));
                        $gallery.find('.thumb_inner').css({
                            'width': width + 'px',
                            'position': 'relative',
                            'transition-duration': settings.speed + 'ms'
                        });
                    }
                    $thumb.bind('click touchend', function() {
                        usingThumb = true;
                        var index = $(this).index();
                        $thumb.removeClass('active');
                        $(this).addClass('active');
                        $this.slide(index);
                        $this.animateThumb(index);
                        clearInterval(interval);
                    });
                    thumbInfo.prepend('<span class="ib count">' + settings.lang.allPhotos + ' (' + $thumb.length + ')</span>');
                    if (settings.showThumbByDefault) {
                        $gallery.addClass('open');
                    }
                }
            },
            animateThumb: function(index) {
                if (settings.animateThumb === true) {
                    var thumb_contW = $gallery.find('.thumb_cont').width();
                    var position;
                    switch (settings.currentPagerPosition) {
                        case 'left':
                            position = 0;
                            break;
                        case 'middle':
                            position = (thumb_contW / 2) - (settings.thumbWidth / 2);
                            break;
                        case 'right':
                            position = thumb_contW - settings.thumbWidth;
                    }
                    var left = ((settings.thumbWidth + settings.thumbMargin) * index - 1) - position;
                    var width = ($children.length * (settings.thumbWidth + settings.thumbMargin));
                    if (left > (width - thumb_contW)) {
                        left = width - thumb_contW;
                    }
                    if (left < 0) {
                        left = 0;
                    }
                    if (this.doCss()) {
                        $gallery.find('.thumb_inner').css('transform', 'translate3d(-' + left + 'px, 0px, 0px)');
                    } else {
                        $gallery.find('.thumb_inner').animate({
                            left: -left + "px"
                        }, settings.speed);
                    }
                }
            },
            slideTo: function() {
                var $this = this;
                if (settings.controls === true && $children.length > 1) {
                    $gallery.append('<div id="lightGallery-action"><a id="lightGallery-prev"></a><a id="lightGallery-next"></a></div>');
                    $prev = $gallery.find('#lightGallery-prev');
                    $next = $gallery.find('#lightGallery-next');
                    $prev.bind('click', function() {
                        $this.prevSlide();
                        clearInterval(interval);
                    });
                    $next.bind('click', function() {
                        $this.nextSlide();
                        clearInterval(interval);
                    });
                }
            },
            autoStart: function() {
                var $this = this;
                if (settings.auto === true) {
                    interval = setInterval(function() {
                        if (index + 1 < $children.length) {
                            index = index;
                        } else {
                            index = -1;
                        }
                        index++;
                        $this.slide(index);
                    }, settings.pause);
                }
            },
            keyPress: function() {
                var $this = this;
                $(window).bind('keyup.lightGallery', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.keyCode === 37) {
                        $this.prevSlide();
                        clearInterval(interval);
                    }
                    if (e.keyCode === 38 && settings.thumbnail === true && $children.length > 1) {
                        if (!$gallery.hasClass('open')) {
                            if ($this.doCss() && settings.mode === 'slide') {
                                $slide.eq(index).prevAll().removeClass('nextSlide').addClass('prevSlide');
                                $slide.eq(index).nextAll().removeClass('prevSlide').addClass('nextSlide');
                            }
                            $gallery.addClass('open');
                        }
                    } else if (e.keyCode === 39) {
                        $this.nextSlide();
                        clearInterval(interval);
                    }
                    if (e.keyCode === 40 && settings.thumbnail === true && $children.length > 1 && !settings.showThumbByDefault) {
                        if ($gallery.hasClass('open')) {
                            $gallery.removeClass('open');
                        }
                    } else if (settings.escKey === true && e.keyCode === 27) {
                        if (!settings.showThumbByDefault && $gallery.hasClass('open')) {
                            $gallery.removeClass('open');
                        } else {
                            plugin.destroy(false);
                        }
                    }
                });
            },
            nextSlide: function() {
                var $this = this;
                index = $slide.index($slide.eq(prevIndex));
                if (index + 1 < $children.length) {
                    index++;
                    $this.slide(index);
                } else {
                    if (settings.loop) {
                        index = 0;
                        $this.slide(index);
                    } else if (settings.thumbnail === true && $children.length > 1 && !settings.showThumbByDefault) {
                        $gallery.addClass('open');
                    } else {
                        $slide.eq(index).find('.object').addClass('rightEnd');
                        setTimeout(function() {
                            $slide.find('.object').removeClass('rightEnd');
                        }, 400);
                    }
                }
                $this.animateThumb(index);
                settings.onSlideNext.call(this, plugin);
            },
            prevSlide: function() {
                var $this = this;
                index = $slide.index($slide.eq(prevIndex));
                if (index > 0) {
                    index--;
                    $this.slide(index);
                } else {
                    if (settings.loop) {
                        index = $children.length - 1;
                        $this.slide(index);
                    } else if (settings.thumbnail === true && $children.length > 1 && !settings.showThumbByDefault) {
                        $gallery.addClass('open');
                    } else{
                        $slide.eq(index).find('.object').addClass('leftEnd');
                        setTimeout(function() {
                            $slide.find('.object').removeClass('leftEnd');
                        }, 400);
                    }
                }
                $this.animateThumb(index);
                settings.onSlidePrev.call(this, plugin);
            },
            slide: function(index) {
                var $this = this;
                if (lightGalleryOn) {
                    setTimeout(function() {
                        $this.loadContent(index, false);
                    }, settings.speed + 400);
                    if (!$slider.hasClass('on')) {
                        $slider.addClass('on');
                    }
                    if (this.doCss() && settings.speed !== '') {
                        if (!$slider.hasClass('speed')) {
                            $slider.addClass('speed');
                        }
                        if (aSpeed === false) {
                            $slider.css('transition-duration', settings.speed + 'ms');
                            aSpeed = true;
                        }
                    }
                    if (this.doCss() && settings.cssEasing !== '') {
                        if (!$slider.hasClass('timing')) {
                            $slider.addClass('timing');
                        }
                        if (aTiming === false) {
                            $slider.css('transition-timing-function', settings.cssEasing);
                            aTiming = true;
                        }
                    }
                    settings.onSlideBefore.call(this, plugin);
                } else {
                    $this.loadContent(index, false);
                }
                if (settings.mode === 'slide') {
                    var isiPad = navigator.userAgent.match(/iPad/i) !== null;
                    if (this.doCss() && !$slider.hasClass('slide') && !isiPad) {
                        $slider.addClass('slide');
                    } else if (this.doCss() && !$slider.hasClass('useLeft') && isiPad) {
                        $slider.addClass('useLeft');
                    }
                    /*                  if(this.doCss()){
                        $slider.css({ 'transform' : 'translate3d('+(-index*100)+'%, 0px, 0px)' });
                    }*/
                    if (!this.doCss() && !lightGalleryOn) {
                        $slider.css({
                            left: (-index * 100) + '%'
                        });
                        //$slide.eq(index).css('transition','none');
                    } else if (!this.doCss() && lightGalleryOn) {
                        $slider.animate({
                            left: (-index * 100) + '%'
                        }, settings.speed, settings.easing);
                    }
                } else if (settings.mode === 'fade') {
                    if (this.doCss() && !$slider.hasClass('fadeM')) {
                        $slider.addClass('fadeM');
                    } else if (!this.doCss() && !$slider.hasClass('animate')) {
                        $slider.addClass('animate');
                    }
                    if (!this.doCss() && !lightGalleryOn) {
                        $slide.fadeOut(100);
                        $slide.eq(index).fadeIn(100);
                    } else if (!this.doCss() && lightGalleryOn) {
                        $slide.eq(prevIndex).fadeOut(settings.speed, settings.easing);
                        $slide.eq(index).fadeIn(settings.speed, settings.easing);
                    }
                }
                if (index + 1 >= $children.length && settings.auto && settings.loop === false) {
                    clearInterval(interval);
                }
                $slide.eq(prevIndex).removeClass('current');
                $slide.eq(index).addClass('current');
                if (this.doCss() && settings.mode === 'slide') {
                    if (usingThumb === false) {
                        $('.prevSlide').removeClass('prevSlide');
                        $('.nextSlide').removeClass('nextSlide');
                        $slide.eq(index - 1).addClass('prevSlide');
                        $slide.eq(index + 1).addClass('nextSlide');
                    } else {
                        $slide.eq(index).prevAll().removeClass('nextSlide').addClass('prevSlide');
                        $slide.eq(index).nextAll().removeClass('prevSlide').addClass('nextSlide');
                    }
                }
                if (settings.thumbnail === true && $children.length > 1) {
                    $thumb.removeClass('active');
                    $thumb.eq(index).addClass('active');
                }
                if (settings.controls && settings.hideControlOnEnd && settings.loop === false && $children.length > 1) {
                    var l = $children.length;
                    l = parseInt(l) - 1;
                    if (index === 0) {
                        $prev.addClass('disabled');
                        $next.removeClass('disabled');
                    } else if (index === l) {
                        $prev.removeClass('disabled');
                        $next.addClass('disabled');
                    } else {
                        $prev.add($next).removeClass('disabled');
                    }
                }
                prevIndex = index;
                lightGalleryOn === false ? settings.onOpen.call(this, plugin) : settings.onSlideAfter.call(this, plugin);
                setTimeout(function() {
                    lightGalleryOn = true;
                });
                usingThumb = false;
                if (settings.counter) {
                    $("#lightGallery_counter_current").text(index + 1);
                }
                $(window).bind('resize.lightGallery', function() {
                    setTimeout(function() {
                        $this.animateThumb(index);
                    }, 200);
                });
            }
        };
        plugin.isActive = function() {
            if (isActive === true) {
                return true;
            } else {
                return false;
            }

        };
        plugin.destroy = function(d) {
            isActive = false;
            d = typeof d !== 'undefined' ? false : true;
            settings.onBeforeClose.call(this, plugin);
            var lightGalleryOnT = lightGalleryOn;
            lightGalleryOn = false;
            aTiming = false;
            aSpeed = false;
            usingThumb = false;
            clearInterval(interval);
            if (d === true) {
                $children.off('click touch touchstart');
            }
            $('.lightGallery').off('mousedown mouseup');
            $('body').off('touchstart.lightGallery touchmove.lightGallery touchend.lightGallery');
            $(window).off('resize.lightGallery keyup.lightGallery');
            if (lightGalleryOnT === true) {
                $gallery.addClass('fadeM');
                setTimeout(function() {
                    $galleryCont.remove();
                    $('body').removeClass('lightGallery');
                }, 500);
            }
            settings.onCloseAfter.call(this, plugin);
        };
        lightGallery.init();
        return this;
    };
}(jQuery));