/*
**      @author : Nicolas Turlais : nicolas-at-insipi.de
**      @version : V0.4 - Feb 2014
**      @license : Licensed under CCAttribution-ShareAlike
**      @website : http://chocolat.insipi.de
**/

; (function($, window, document, undefined) {
    var calls = 0;
    var defaults = {
        container         : window,
        linksContainer    : '.chocolat-links',
        imageSelector     : '.chocolat-image',
        fullWindow        : false, // false, 'contain', or 'cover'
        fullScreen        : false,
        displayAsALink    : false,
        loop              : false,
        linkImages        : true,
        setTitle          : '',
        separator1        : '|',
        separator2        : '/',
        mobileBreakpoint  : 480,
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

        if(settings.displayAsALink){
            this.createLink().off('click').on('click', function(e){
                that.init(that.settings.firstImage);
                e.preventDefault();
            });

            element.hide();
        }
        else{
            element.find(this.settings.imageSelector).each(function (i) {
                $(this).off('click').on('click', function(event){
                    that.init(i);
                    event.preventDefault();
                });
            });
        }

        //return an API YEAH!
        return {
            open : function(i){
                var i = i || 0;
                that.init(i);
            },
            
            close : function(){
                that.close();
            },
            
            next : function(){
                that.change(1);
            },

            prev : function(){
                that.change(-1);
            },

            goto : function(i){ // open alias
                that.init(i);
            },
            current : function(){
                return that.currentImage;
            }
        };
    }

    Chocolat.prototype = {
        init : function(i) {
            if(!this.settings.initialized){
                this.setDomContainer();
                this.markup();
                this.events();
                this.settings.lastImage   = this.settings.images.length - 1;
                this.settings.initialized = true;
            }

            this.load(i);
        }, 

        preload : function(i, callback) {
            callback         = this.optFuncParam(callback);
            imgLoader        = new Image();
            imgLoader.onload = $.proxy(callback, this, i, imgLoader);
            imgLoader.src    = this.settings.images[i].src;
        },

        load : function(i) {

            if(this.settings.fullScreen){
                this.openFullScreen();
            }

            if(this.settings.currentImage === i){
                return;
            }

            this.elems.overlay.fadeIn(800);

            this.settings.timer = setTimeout(function(){
                $.proxy(this.elems.loader.fadeIn(), this)
            },400);
            this.preload(i,this.place);
        },

        place : function(i, imgLoader) {
            var that = this;

            this.settings.currentImage = i;
            this.description();
            this.pagination();
            this.breakpoint();

            this.elems.img.fadeTo(200,0, function() {
                that.storeImgSize(imgLoader, i);
                fitting = that.fit(
                    that.settings.images[i].height,
                    that.settings.images[i].width,
                    $(that.settings.container).height(),
                    $(that.settings.container).width(),
                    that.getOutMarginH(),
                    that.getOutMarginW()
                );
                that.center(
                    fitting.width,
                    fitting.height,
                    fitting.left,
                    fitting.top,
                    150,
                    that.appear(i)
                );
                that.arrows();
            });
        },

        appear : function(i) {
            var that = this;
            clearTimeout(this.settings.timer);

            this.elems.loader.stop().fadeOut(300, function() {
                that.elems.img
                    .attr('src', that.settings.images[i].src)
                    .fadeTo(400,1);
            });
        },

        fit : function(imgHeight, imgWidth, holderHeight, holderWidth, holderOutMarginH, holderOutMarginW) { 
            var holderGlobalWidth = holderWidth-holderOutMarginW; 
            var holderGlobalHeight = holderHeight-holderOutMarginH; 
            var holderGlobalRatio = (holderGlobalHeight / holderGlobalWidth); 
            var holderRatio = (holderHeight / holderWidth); 
            var imgRatio = (imgHeight / imgWidth); 

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

        center : function(width, height, left, top, duration, callback) {
            callback = this.optFuncParam(callback);
            this.elems.content.animate({
                'width'  :width,
                'height' :height,
                'left'   :left,
                'top'    :top
            }, duration, $.proxy(callback(), this))
            .css('overflow', 'visible');
        },

        change : function(signe) {
            var requestedImage = this.settings.currentImage + parseInt(signe);
            if(requestedImage > this.settings.lastImage) {
                if(this.settings.loop){
                    this.load(0);
                }
            }
            else if(requestedImage < 0) {
                if(this.settings.loop) {
                    this.load(this.settings.lastImage);
                }
            }
            else {
                this.load(requestedImage);
            }
        },

        arrows: function() {
            if(this.settings.loop) {
                $([this.elems.left[0],this.elems.right[0]])
                    .css('display','block');
            }
            else if(this.settings.linkImages) {
                // right
                if(this.settings.currentImage == this.settings.lastImage) {
                    this.elems.right.fadeOut(300);
                }
                else {
                    this.elems.right.fadeIn(300);
                }
                // left
                if(this.settings.currentImage == 0) {
                    this.elems.left.fadeOut(300);
                }
                else {
                    this.elems.left.fadeIn(300);
                }
            }
            else {
                $([this.elems.left[0],this.elems.right[0]])
                    .css('display','none');
            }
        },

        description : function() {
            var that = this;
            this.elems.description.fadeTo(200, 0, function() {
                $(this)
                    .html(that.settings.images[that.settings.currentImage].title)
                    .fadeTo(400,1);
            });
        },

        pagination : function() {
            var that      = this;
            var last      = this.settings.lastImage + 1;
            var position  = this.settings.currentImage + 1;
            var separator = (this.settings.setTitle == '') ? '' : this.settings.separator1;

            this.elems.pagination.fadeTo(200, 0, function() {
                $(this)
                    .html(that.settings.setTitle + ' ' 
                          + separator + ' ' 
                          + position 
                          + that.settings.separator2 
                          + last)
                    .fadeTo(400,1);
            });
        },

        breakpoint : function() {
            if($(this.settings.container).width() < this.settings.mobileBreakpoint) {
                this.elems.domContainer.addClass('chocolat-mobile');
            }
            else {
                this.elems.domContainer.removeClass('chocolat-mobile');
            }
        },

        storeImgSize : function(img, i) {
            if(!this.settings.images[i].height || !this.settings.images[i].width){
                this.settings.images[i].height = img.height;
                this.settings.images[i].width  = img.width;
            }
        },

        close : function() {
            var els = [
                this.elems.overlay[0],
                this.elems.loader[0],
                this.elems.content[0]
            ];
            var that = this;
            $.when($(els).fadeOut(200)).then(function () {
                that.elems.domContainer.removeClass('chocolat-open chocolat-mobile chocolat-in-container chocolat-cover');
            });
            this.settings.currentImage = false;
            this.settings.initialized = false;
        },

        getOutMarginW : function() {
            var left  = this.elems.left.outerWidth() - this.elems.left.width();
            var right = this.elems.right.outerWidth() - this.elems.right.width();
            return left + right;
        },

        getOutMarginH : function() {
            return this.elems.top.outerHeight() + this.elems.bottom.outerHeight();
        },

        markup : function() {
            this.elems.domContainer.addClass('chocolat-open');
            if(this.settings.fullWindow == 'cover') {
                this.elems.domContainer.addClass('chocolat-cover');
            }
            if(this.settings.container !== window) {
                this.elems.domContainer.addClass('chocolat-in-container');
            }
            var that = this;

            this.elems.overlay = $('<div/>', {
                'class' : 'chocolat-overlay'
            }).appendTo(this.elems.domContainer);

            this.elems.loader = $('<div/>', {
                'class' : 'chocolat-loader'
            }).appendTo(this.elems.domContainer);

            this.elems.content = $('<div/>', {
                'class' : 'chocolat-content',
                'id' : 'chocolat-content-' + this.settings.setIndex
            }).appendTo(this.elems.domContainer);

            this.elems.img = $('<img/>', {
                'class' : 'chocolat-img',
                'src' : ''
            }).appendTo(this.elems.content);

            this.elems.top = $('<div/>', {
                'class' : 'chocolat-top'
            }).appendTo(this.elems.content);

            this.elems.left = $('<div/>', {
                'class' : 'chocolat-left'
            }).appendTo(this.elems.content);

            this.elems.right = $('<div/>', {
                'class' : 'chocolat-right'
            }).appendTo(this.elems.content);

            this.elems.bottom = $('<div/>', {
                'class' : 'chocolat-bottom'
            }).appendTo(this.elems.content);

            this.elems.description = $('<span/>', {
                'class' : 'chocolat-description'
            }).appendTo(this.elems.bottom);

            this.elems.pagination = $('<span/>', {
                'class' : 'chocolat-pagination'
            }).appendTo(this.elems.bottom);

            this.elems.close = $('<span/>', {
                'class' : 'chocolat-close'
            }).appendTo(this.elems.top);
        },

        createLink : function() {
            var li = $('<li/>').appendTo(this.settings.linksContainer);

            return $('<a/>', {
                    'id'    : 'chocolat-set-'+this.settings.setIndex,
                    'class' : 'chocolat-link',
                    'href'  : '#'
                })
                .html(this.settings.setTitle)
                .appendTo(li);
        },

        openFullScreen : function() {
            var docElm = document.documentElement;
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        },

        events : function() {
            var that = this;

            $(document).off('keydown').on('keydown', function(e) {
                if(e.keyCode == 37) {
                    that.change(-1);
                }
                else if(e.keyCode == 39) {
                    that.change(1);
                }   
                else if(e.keyCode == 27) {
                    that.close();
                }
            });
            $(this.elems.content).find('.chocolat-right')
                .off('click')
                .on('click', function() {
                    that.change(+1);    
            });

            $(this.elems.content).find('.chocolat-left')
                .off('click')
                .on('click', function() {
                    that.change(-1);    
            });

            $([this.elems.overlay[0], this.elems.close[0]])
                .off('click')
                .on('click', function() {
                    that.close();
            });

            $(window).on('resize', function() {
                if(!that.settings.initialized){
                    return;
                }
                that.debounce(50, function() {
                    that.breakpoint();
                    fitting = that.fit( 
                        that.settings.images[that.settings.currentImage].height,
                        that.settings.images[that.settings.currentImage].width,
                        $(that.settings.container).height(),
                        $(that.settings.container).width(),
                        that.getOutMarginH(),
                        that.getOutMarginW()
                    );
                    that.center(fitting.width, fitting.height, fitting.left, fitting.top, 150);
                });
            });
        },

        setDomContainer : function() {
            // if container == window
            // domContainer = body

            if(typeof this.settings.container === 'object') { 
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

        optFuncParam: function(f) {
            if(!$.isFunction(f)){return function(){};} 
            else{return f;}
        }
    };

    $.fn['Chocolat'] = function (options) {
        return this.each(function() {

            calls++;

            var settings = $.extend(true, {}, defaults, options, {setIndex:calls} );

            if (!$.data(this, 'api-chocolat')) {
                $.data(this, 'api-chocolat',
                    new Chocolat($(this), settings)
                );
            }
        });
    }
})( jQuery, window, document );
