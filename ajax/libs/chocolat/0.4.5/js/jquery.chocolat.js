/*
**      @author : Nicolas Turlais : nicolas-at-insipi.de
**      @version : V0.4.4 - 18 March 2015
**      @license : Licensed under CCAttribution-ShareAlike
**      @website : http://chocolat.insipi.de
**/

; (function($, window, document, undefined) {
    var calls = 0;
    var defaults = {
        container         : window, // window or jquery object or jquery selector, or element
        imageSelector     : '.chocolat-image',
        className         : '',
        fullWindow        : false, // false, 'contain', 'cover' or 'native'
        initialZoomState  : null,
        fullScreen        : false,
        loop              : false,
        linkImages        : true,
        duration          : 300,
        setTitle          : '',
        separator1        : '|',
        separator2        : '/',
        setIndex          : 0,
        firstImage        : 0,
        lastImage         : false,
        currentImage      : false,
        initialized       : false,
        timer             : false,
        timerDebounce     : false,
        images            : []
    };

    function Chocolat(element, settings) {
        var that = this;

        this.settings  = settings;
        this._defaults = defaults;
        this.elems     = {};

        element.find(this.settings.imageSelector).each(function () {
            that.settings.images.push({
                title  : $(this).attr('title'),
                src    : $(this).attr('href'),
                height : false,
                width  : false
            });
        });

        element.find(this.settings.imageSelector).each(function (i) {
            $(this).off('click').on('click', function(event){
                that.init(i);
                event.preventDefault();
            });
        });

        return this
    }
    $.extend(Chocolat.prototype, {

        init : function(i) {
            if(!this.settings.initialized){
                this.setDomContainer();
                this.markup();
                this.events();
                this.settings.lastImage   = this.settings.images.length - 1;
                this.settings.initialized = true;
            }

            return this.load(i);
        },

        preload : function(i) {
            var def = $.Deferred()

            if(typeof this.settings.images[i] === 'undefined'){
                return;
            }
            var imgLoader        = new Image();
            imgLoader.onload = function() { def.resolve(imgLoader) };
            imgLoader.src    = this.settings.images[i].src;

            return def
        },

        load : function(i) {
            var that = this;
            if(this.settings.fullScreen){
                this.openFullScreen();
            }

            if(this.settings.currentImage === i){
                return;
            }

            this.elems.overlay.fadeIn(800);
            this.settings.timer = setTimeout(function(){
                if(typeof that.elems != 'undefined'){
                    $.proxy(that.elems.loader.fadeIn(), that);
                }
            }, 800);

            var deferred = this.preload(i)
                .then(function (imgLoader) {
                    return that.place(i, imgLoader)
                })
                .then(function (imgLoader) {
                    return that.appear(i)
                })
                .then(function (imgLoader) {
                    that.zoomable()
                })

            var nextIndex = i + 1
            if(typeof this.settings.images[nextIndex] != 'undefined'){
                this.preload(nextIndex);
            }

            return deferred;
            
        },

        place : function(i, imgLoader) {
            var that = this;

            this.settings.currentImage = i;
            this.description();
            this.pagination();
            this.arrows();

            this.storeImgSize(imgLoader, i);
            fitting = this.fit(i, that.settings.container)

            return this.center(
                fitting.width,
                fitting.height,
                fitting.left,
                fitting.top,
                0
            )
        },

        center : function(width, height, left, top, duration) {

            return this.elems.content
                .css('overflow', 'visible')
                .animate({
                    'width'  :width,
                    'height' :height,
                    'left'   :left,
                    'top'    :top
                }, duration)
                .promise()
        },

        appear : function(i) {
            var that = this;
            clearTimeout(this.settings.timer);

            this.elems.loader.stop().fadeOut(300, function() {
                that.elems.img
                    .attr('src', that.settings.images[i].src)
            });
        },

        fit : function(i, container) {
            var imgHeight        = this.settings.images[i].height;
            var imgWidth         = this.settings.images[i].width;
            var holderHeight     = $(container).height();
            var holderWidth      = $(container).width();
            var holderOutMarginH = this.getOutMarginH();
            var holderOutMarginW = this.getOutMarginW();

            var holderGlobalWidth  = holderWidth-holderOutMarginW;
            var holderGlobalHeight = holderHeight-holderOutMarginH;
            var holderGlobalRatio  = (holderGlobalHeight / holderGlobalWidth);
            var holderRatio        = (holderHeight / holderWidth);
            var imgRatio           = (imgHeight / imgWidth);

            if(this.settings.fullWindow == 'cover') {
                if(imgRatio < holderRatio) {
                    height = holderHeight;
                    width = height / imgRatio;
                }
                else {
                    width = holderWidth;
                    height = width * imgRatio;
                }
            }
            else if(this.settings.fullWindow == 'native') {
                height = imgHeight;
                width = imgWidth;
            }
            else {
                if(imgRatio>holderGlobalRatio) {
                    height = holderGlobalHeight;
                    width = height / imgRatio;
                }
                else {
                    width = holderGlobalWidth;
                    height = width * imgRatio;
                }
                if(!this.settings.fullWindow && (width >= imgWidth || height >= imgHeight)) {
                    width=imgWidth;
                    height=imgHeight;
                }
            }

            return {
                'height' : height,
                'width'  : width,
                'top'    : (holderHeight - height)/2,
                'left'   : (holderWidth - width)/2
            }
        },

        change : function(signe) {
            this.zoomOut(0)
            this.zoomable()

            var requestedImage = this.settings.currentImage + parseInt(signe);
            if(requestedImage > this.settings.lastImage) {
                if(this.settings.loop){
                    return this.load(0);
                }
            }
            else if(requestedImage < 0) {
                if(this.settings.loop) {
                    return this.load(this.settings.lastImage);
                }
            }
            else {
                return this.load(requestedImage);
            }
        },

        arrows: function() {
            if(this.settings.loop) {
                $([this.elems.left[0],this.elems.right[0]])
                    .addClass('active');
            }
            else if(this.settings.linkImages) {
                // right
                if(this.settings.currentImage == this.settings.lastImage) {
                    this.elems.right.removeClass('active')
                }
                else {
                    this.elems.right.addClass('active');
                }
                // left
                if(this.settings.currentImage == 0) {
                    this.elems.left.removeClass('active')
                }
                else {
                    this.elems.left.addClass('active');
                }
            }
            else {
                $([this.elems.left[0],this.elems.right[0]])
                    .removeClass('active')
            }
        },

        description : function() {
            var that = this;
            this.elems.description
                .html(that.settings.images[that.settings.currentImage].title)
        },

        pagination : function() {
            var that      = this;
            var last      = this.settings.lastImage + 1;
            var position  = this.settings.currentImage + 1;
            var separator = (this.settings.setTitle == '') ? '' : this.settings.separator1;

            this.elems.pagination
                .html(that.settings.setTitle + ' '
                      + separator + ' '
                      + position
                      + that.settings.separator2
                      + last)
        },

        storeImgSize : function(img, i) {
            if(typeof img === 'undefined') {
                return;
            }
            if(!this.settings.images[i].height || !this.settings.images[i].width){
                this.settings.images[i].height = img.height;
                this.settings.images[i].width  = img.width;
            }
        },

        close : function() {

            if (this.settings.fullscreenOpen) {
                this.exitFullScreen();
                return
            }

            var els = [
                this.elems.overlay[0],
                this.elems.loader[0],
                this.elems.wrapper[0]
            ];
            var that = this;
            $.when($(els).fadeOut(200)).then(function () {
                that.elems.domContainer.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
            });
            this.settings.currentImage = false;
            this.settings.initialized = false;
        },

        getOutMarginW : function() {
            var left  = this.elems.left.outerWidth();
            var right = this.elems.right.outerWidth();
            return left + right;
        },

        getOutMarginH : function() {
            return this.elems.top.outerHeight() + this.elems.bottom.outerHeight();
        },

        markup : function() {
            this.elems.domContainer.addClass('chocolat-open ' + this.settings.className);
            if(this.settings.fullWindow == 'cover') {
                this.elems.domContainer.addClass('chocolat-cover');
            }
            if(this.settings.container !== window) {
                this.elems.domContainer.addClass('chocolat-in-container');
            }
            var that = this;

            this.elems.wrapper = $('<div/>', {
                'class' : 'chocolat-wrapper'
            }).appendTo(this.elems.domContainer);

            this.elems.overlay = $('<div/>', {
                'class' : 'chocolat-overlay'
            }).appendTo(this.elems.wrapper);

            this.elems.loader = $('<div/>', {
                'class' : 'chocolat-loader'
            }).appendTo(this.elems.wrapper);

            this.elems.content = $('<div/>', {
                'class' : 'chocolat-content',
                'id' : 'chocolat-content-' + this.settings.setIndex
            }).appendTo(this.elems.wrapper);

            this.elems.img = $('<img/>', {
                'class' : 'chocolat-img',
                'src' : ''
            }).appendTo(this.elems.content);

            this.elems.top = $('<div/>', {
                'class' : 'chocolat-top'
            }).appendTo(this.elems.wrapper);

            this.elems.fullscreen = $('<span/>', {
                'class' : 'chocolat-fullscreen'
            }).appendTo(this.elems.top);

            this.elems.left = $('<div/>', {
                'class' : 'chocolat-left'
            }).appendTo(this.elems.wrapper);

            this.elems.right = $('<div/>', {
                'class' : 'chocolat-right'
            }).appendTo(this.elems.wrapper);

            this.elems.bottom = $('<div/>', {
                'class' : 'chocolat-bottom'
            }).appendTo(this.elems.wrapper);

            this.elems.description = $('<span/>', {
                'class' : 'chocolat-description'
            }).appendTo(this.elems.bottom);

            this.elems.pagination = $('<span/>', {
                'class' : 'chocolat-pagination'
            }).appendTo(this.elems.top);

            this.elems.close = $('<span/>', {
                'class' : 'chocolat-close'
            }).appendTo(this.elems.top);
        },

        openFullScreen : function() {
            var wrapper = this.elems.wrapper[0];

            if (wrapper.requestFullscreen) {
                this.settings.fullscreenOpen = true;
                wrapper.requestFullscreen();
            }
            else if (wrapper.mozRequestFullScreen) {
                this.settings.fullscreenOpen = true;
                wrapper.mozRequestFullScreen();
            }
            else if (wrapper.webkitRequestFullscreen) {
                this.settings.fullscreenOpen = true;
                wrapper.webkitRequestFullscreen();
            }
            else if(wrapper.msRequestFullscreen) {
                wrapper.msRequestFullscreen();
                this.settings.fullscreenOpen = true;
            }
            else {
                this.settings.fullscreenOpen = false;
            }
        },

        exitFullScreen : function() {
            if(document.exitFullscreen) {
                document.exitFullscreen();
                this.settings.fullscreenOpen = false;
            }
            else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
                this.settings.fullscreenOpen = false;
            }
            else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
                this.settings.fullscreenOpen = false;
            }
            else {
                this.settings.fullscreenOpen = true;
            }
        },

        events : function() {
            var that = this;

            $(document).off('keydown.chocolat').on('keydown.chocolat', function(e) {
                if (that.settings.initialized) {
                    if(e.keyCode == 37) {
                        that.change(-1);
                    }
                    else if(e.keyCode == 39) {
                        that.change(1);
                    }
                    else if(e.keyCode == 27) {
                        that.close();
                    }
                }
            });
            // this.elems.wrapper.find('.chocolat-img')
            //     .off('click.chocolat')
            //     .on('click.chocolat', function(e) {
            //         var currentImage = that.settings.images[that.settings.currentImage];
            //         if(currentImage.width > $(that.elems.wrapper).width() || currentImage.height > $(that.elems.wrapper).height() ){
            //             that.toggleZoom(e);
            //         }
            // });

            this.elems.wrapper.find('.chocolat-right')
                .off('click.chocolat')
                .on('click.chocolat', function() {
                    that.change(+1);
            });

            this.elems.wrapper.find('.chocolat-left')
                .off('click.chocolat')
                .on('click.chocolat', function() {
                    that.change(-1);
            });

            $([this.elems.overlay[0], this.elems.close[0]])
                .off('click.chocolat')
                .on('click.chocolat', function() {
                    that.close();
            });

            this.elems.fullscreen
                .off('click.chocolat')
                .on('click.chocolat', function() {
                    if (that.settings.fullscreenOpen) {
                        that.exitFullScreen();
                        return;
                    }
     
                    that.openFullScreen();
            });

            if (that.settings.backgroundClose) {
                this.elems.overlay
                    .off('click.chocolat')
                    .on('click.chocolat', function() {
                        that.close();
                });
            }
            this.elems.wrapper.find('.chocolat-img')
                .off('click.chocolat')
                .on('click.chocolat', function(e) {
                    if(that.settings.initialZoomState === null && that.elems.domContainer.hasClass('chocolat-zoomable')){
                        that.zoomIn(e)
                    }
                    else{
                        that.zoomOut(e)
                    }   

            });

            this.elems.wrapper.mousemove(function( e ) {
                if(that.settings.initialZoomState === null) {
                    return;
                }
                if(that.elems.img.is(':animated')) {
                    return;
                }

                var pos = $(this).offset();
                var height = $(this).height();
                var width = $(this).width();

                var currentImage = that.settings.images[that.settings.currentImage]
                var imgWidth = currentImage.width;
                var imgHeight = currentImage.height;

                var coord = [e.pageX - width/2 - pos.left, e.pageY - height/2 - pos.top]

                var mvtX = 0
                if (imgWidth > width) {
                    mvtX = coord[0] / (width / 2)
                    mvtX = ((imgWidth - width + 0)/ 2) * mvtX 
                }

                var mvtY = 0;
                if (imgHeight > height) {
                    mvtY = coord[1] / (height / 2)
                    mvtY = ((imgHeight - height + 0) / 2) * mvtY   
                }

                var animation = {
                    'margin-left': - mvtX + 'px',
                    'margin-top': - mvtY + 'px'
                }
                if(typeof e.duration !== 'undefined') {
                    $(that.elems.img).stop(false, true).animate(animation, e.duration)
                }
                else {
                    $(that.elems.img).stop(false, true).css(animation);
                }

            });
            $(window).on('resize', function() {
                if(!that.settings.initialized){
                    return;
                }
                that.debounce(50, function() {
                    fitting = that.fit(that.settings.currentImage, that.settings.container)
                    that.center(fitting.width, fitting.height, fitting.left, fitting.top, 0)
                    that.zoomable()
                });
            });
        },

        zoomable : function () {
            var currentImage = this.settings.images[this.settings.currentImage];
            var wrapperWidth = this.elems.wrapper.width();
            var wrapperHeight = this.elems.wrapper.height();

            var isImageZoomable = currentImage.width > wrapperWidth || currentImage.height > wrapperHeight
            var isImageStretched = this.elems.img.width() > currentImage.width || this.elems.img.height() > currentImage.height


            if(isImageZoomable && !isImageStretched){
                this.elems.domContainer.addClass('chocolat-zoomable')
            }
            else {
                this.elems.domContainer.removeClass('chocolat-zoomable')
            }
        },

        zoomIn : function (e) {
            this.settings.initialZoomState = this.settings.fullWindow
            this.settings.fullWindow = 'native';

            var event = $.Event('mousemove');
            event.pageX = e.pageX;
            event.pageY = e.pageY;
            event.duration = this.settings.duration;
            this.elems.wrapper.trigger(event);

            this.elems.domContainer.addClass('chocolat-zoomed')
            fitting = this.fit(this.settings.currentImage, this.settings.container)
            this.center(fitting.width, fitting.height, fitting.left, fitting.top, this.settings.duration);
        },

        zoomOut : function (e, duration) {
            if(this.settings.initialZoomState === null){
                return;
            }
            var duration = duration || this.settings.duration

            this.settings.fullWindow = this.settings.initialZoomState
            this.settings.initialZoomState = null
            this.elems.img.animate({'margin': 0}, duration)

            this.elems.domContainer.removeClass('chocolat-zoomed')
            fitting = this.fit(this.settings.currentImage, this.settings.container)
            this.center(fitting.width, fitting.height, fitting.left, fitting.top, duration);
        },

        setDomContainer : function() {
            // if container == window
            // domContainer = body
            if( this.settings.container === window) {
                this.elems.domContainer = $('body');
            }
            else {
                this.elems.domContainer = $(this.settings.container);
            }
        },

        debounce: function(duration, callback) {
            clearTimeout(this.settings.timerDebounce);
            this.settings.timerDebounce = setTimeout(function() {
                callback();
            }, duration);
        },

        api: function() {
            var that = this
            return {
                open : function(i){
                    i = parseInt(i) || 0;
                    return that.init(i);
                },

                close : function(){
                    that.close();
                },

                next : function(){
                    return that.change(1);
                },

                prev : function(){
                    return that.change(-1);
                },

                goto : function(i){ // open alias
                    return that.open(i);
                },
                current : function(){
                    return that.settings.currentImage;
                },

                place : function(){
                    that.place(that.settings.currentImage, that.settings.duration);
                },
                
                set : function(property, value){
                    return that.settings[property] = value;
                },
                
                get : function(property){
                    return that.settings[property];
                },
                
                getElem : function(name){
                    return that.elems[name];
                },
            }
        }
    });

    $.fn['Chocolat'] = function (options) {
        return this.each(function() {

            calls++;

            var settings = $.extend(true, {}, defaults, options, {setIndex:calls} );

            if (!$.data(this, 'chocolat')) {
                $.data(this, 'chocolat',
                    new Chocolat($(this), settings)
                );
            }
        });
    }
})( jQuery, window, document );
