/**
 * PrimeUI Object 
 */
 (function (factory) {
     if (typeof define === 'function' && define.amd) {
         // AMD. Register as an anonymous module.
         define(['jquery'], factory);
     } else if (typeof module === 'object' && module.exports) {
         // Node/CommonJS
         module.exports = function( root, jQuery ) {
             factory(jQuery);
             return jQuery;
         };
     } else {
         // Browser globals
         factory(jQuery);
     }
 }(function ($) {
     
    var PUI = {
        
        zindex : 1000,
        
        gridColumns: {
            '1': 'ui-grid-col-12',
            '2': 'ui-grid-col-6',
            '3': 'ui-grid-col-4',
            '4': 'ui-grid-col-3',
            '6': 'ui-grid-col-2',
            '12': 'ui-grid-col-11'
        },
        
        charSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            
        /**
         *  Aligns container scrollbar to keep item in container viewport, algorithm copied from jquery-ui menu widget
         */
        scrollInView: function(container, item) {        
            var borderTop = parseFloat(container.css('borderTopWidth')) || 0,
            paddingTop = parseFloat(container.css('paddingTop')) || 0,
            offset = item.offset().top - container.offset().top - borderTop - paddingTop,
            scroll = container.scrollTop(),
            elementHeight = container.height(),
            itemHeight = item.outerHeight(true);

            if(offset < 0) {
                container.scrollTop(scroll + offset);
            }
            else if((offset + itemHeight) > elementHeight) {
                container.scrollTop(scroll + offset - elementHeight + itemHeight);
            }
        },
        
        generateRandomId: function() {
            var id = '';
            for (var i = 1; i <= 10; i++) {
                var randPos = Math.floor(Math.random() * this.charSet.length);
                id += this.charSet[randPos];
            }
            return id;
        },
        
        isIE: function(version) {
            return (this.browser.msie && parseInt(this.browser.version, 10) === version);
        },
        
        escapeRegExp: function(text) {
            return text.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
        },

        escapeHTML: function(value) {
            return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
        },
        
        escapeClientId: function(id) {
            return "#" + id.replace(/:/g,"\\:");
        },
        
        clearSelection: function() {
            if(window.getSelection) {
                if(window.getSelection().empty) {
                    window.getSelection().empty();
                } else if(window.getSelection().removeAllRanges) {
                    window.getSelection().removeAllRanges();
                }
            } else if(document.selection && document.selection.empty) {
                    document.selection.empty();
            }
        },
                
        inArray: function(arr, item) {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] === item) {
                    return true;
                }
            }

            return false;
        },
        
        calculateScrollbarWidth: function() {
            if(!this.scrollbarWidth) {
                if(this.browser.msie) {
                    var $textarea1 = $('<textarea cols="10" rows="2"></textarea>')
                            .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body'),
                        $textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>')
                            .css({ position: 'absolute', top: -1000, left: -1000 }).appendTo('body');
                    this.scrollbarWidth = $textarea1.width() - $textarea2.width();
                    $textarea1.add($textarea2).remove();
                }
                else {
                    var $div = $('<div />')
                        .css({ width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000 })
                        .prependTo('body').append('<div />').find('div')
                            .css({ width: '100%', height: 200 });
                    this.scrollbarWidth = 100 - $div.width();
                    $div.parent().remove();
                }
            }

            return this.scrollbarWidth;
        },
        
        //adapted from jquery browser plugin
        resolveUserAgent: function(jQuery) {
            var matched, browser;

            jQuery.uaMatch = function( ua ) {
              ua = ua.toLowerCase();

              var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
                  /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                  /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
                  /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                  /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                  /(msie) ([\w.]+)/.exec( ua ) ||
                  ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
                  ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                  [];

              var platform_match = /(ipad)/.exec( ua ) ||
                  /(iphone)/.exec( ua ) ||
                  /(android)/.exec( ua ) ||
                  /(windows phone)/.exec( ua ) ||
                  /(win)/.exec( ua ) ||
                  /(mac)/.exec( ua ) ||
                  /(linux)/.exec( ua ) ||
                  /(cros)/i.exec( ua ) ||
                  [];

              return {
                  browser: match[ 3 ] || match[ 1 ] || "",
                  version: match[ 2 ] || "0",
                  platform: platform_match[ 0 ] || ""
              };
            };

            matched = jQuery.uaMatch( window.navigator.userAgent );
            browser = {};

            if ( matched.browser ) {
              browser[ matched.browser ] = true;
              browser.version = matched.version;
              browser.versionNumber = parseInt(matched.version);
            }

            if ( matched.platform ) {
              browser[ matched.platform ] = true;
            }

            // These are all considered mobile platforms, meaning they run a mobile browser
            if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
              browser.mobile = true;
            }

            // These are all considered desktop platforms, meaning they run a desktop browser
            if ( browser.cros || browser.mac || browser.linux || browser.win ) {
              browser.desktop = true;
            }

            // Chrome, Opera 15+ and Safari are webkit based browsers
            if ( browser.chrome || browser.opr || browser.safari ) {
              browser.webkit = true;
            }

            // IE11 has a new token so we will assign it msie to avoid breaking changes
            if ( browser.rv )
            {
              var ie = "msie";

              matched.browser = ie;
              browser[ie] = true;
            }

            // Opera 15+ are identified as opr
            if ( browser.opr )
            {
              var opera = "opera";

              matched.browser = opera;
              browser[opera] = true;
            }

            // Stock Android browsers are marked as Safari on Android.
            if ( browser.safari && browser.android )
            {
              var android = "android";

              matched.browser = android;
              browser[android] = true;
            }

            // Assign the name and platform variable
            browser.name = matched.browser;
            browser.platform = matched.platform;

            this.browser = browser;
            $.browser = browser;
        },
        
        getGridColumn: function(number) {
            return this.gridColumns[number + ''];
        },
        
        executeFunctionByName: function(functionName /*, args */) {
            var args = [].slice.call(arguments).splice(1),
            context = window,
            namespaces = functionName.split("."),
            func = namespaces.pop();
            for(var i = 0; i < namespaces.length; i++) {
              context = context[namespaces[i]];
            }
            return context[func].apply(this, args);
        },
        
        resolveObjectByName: function(name) {
            if(name) {
                var parts = name.split(".");
                for(var i = 0, len = parts.length, obj = window; i < len; ++i) {
                    obj = obj[parts[i]];
                }
                return obj;
            }
            else {
                return null;
            }
        },

        getCookie : function(name) {
            return $.cookie(name);
        },

        setCookie : function(name, value, cfg) {
            $.cookie(name, value, cfg);
        },

        deleteCookie: function(name, cfg) {
            $.removeCookie(name, cfg);
        }

    };

    PUI.resolveUserAgent($);
    
    window.PUI = PUI;
    
}));
/**
 * PrimeUI Carousel widget
 */
 (function (factory) {
     if (typeof define === 'function' && define.amd) {
         // AMD. Register as an anonymous module.
         define(['jquery'], factory);
     } else if (typeof module === 'object' && module.exports) {
         // Node/CommonJS
         module.exports = function( root, jQuery ) {
             factory(jQuery);
             return jQuery;
         };
     } else {
         // Browser globals
         factory(jQuery);
     }
 }(function ($) {

    $.widget("primeui.puicarousel", {
       
       options: {
            datasource: null,
            numVisible: 3,
            firstVisible: 0,
            headerText: null,
            effectDuration: 500,
            circular :false,
            breakpoint: 560,
            itemContent: null,
            responsive: true,
            autoplayInterval: 0,
            easing: 'easeInOutCirc',
            pageLinks: 3,
            style: null,
            styleClass: null,
            template: null,
            enhanced: false
        },
       
        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            if(!this.options.enhanced) {
                this.element.wrap('<div class="ui-carousel ui-widget ui-widget-content ui-corner-all"><div class="ui-carousel-viewport"></div></div>');
            }

            this.container = this.element.parent().parent();
            this.element.addClass('ui-carousel-items');
            this.viewport = this.element.parent();
            this.container.prepend('<div class="ui-carousel-header ui-widget-header"><div class="ui-carousel-header-title"></div></div>');
            this.header = this.container.children('.ui-carousel-header');
            this.header.append('<span class="ui-carousel-button ui-carousel-next-button fa fa-arrow-circle-right"></span>' +
                '<span class="ui-carousel-button ui-carousel-prev-button fa fa-arrow-circle-left"></span>');
                
            if(this.options.headerText) {
                this.header.children('.ui-carousel-header-title').html(this.options.headerText);
            }
            
            if(this.options.styleClass) {
                this.container.addClass(this.options.styleClass);
            }

            if(this.options.style) {
                this.container.attr('style', this.options.style);
            }
            
            if(this.options.datasource)
                this._loadData();
            else
                this._render();
        },

        _destroy: function() {
            this._unbindEvents();
            this.header.remove();
            this.items.removeClass('ui-carousel-item ui-widget-content ui-corner-all').css('width','auto');
            this.element.removeClass('ui-carousel-items').css('left','auto');

            if(!this.options.enhanced) {
                this.element.unwrap().unwrap();
            }

            if(this.options.datasource) {
                this.items.remove();
            }
        },
        
        _loadData: function() {
            if($.isArray(this.options.datasource))
                this._render(this.options.datasource);
            else if($.type(this.options.datasource) === 'function')
                this.options.datasource.call(this, this._render);
        },
        
        _updateDatasource: function(value) {
            this.options.datasource = value;
            this.element.children().remove();
            this.header.children('.ui-carousel-page-links').remove();
            this.header.children('select').remove();
            this._loadData();
        },
        
        _render: function(data) {
            this.data = data;
            
            if(this.data) {
                for(var i = 0; i < data.length; i++) {
                    var itemContent = this._createItemContent(data[i]);
                    if($.type(itemContent) === 'string')
                        this.element.append('<li>' + itemContent + '</li>');
                    else
                        this.element.append($('<li></li>').wrapInner(itemContent));
                }
            }
            
            this.items = this.element.children('li');
            this.items.addClass('ui-carousel-item ui-widget-content ui-corner-all');
            this.itemsCount = this.items.length;
            this.columns = this.options.numVisible;
            this.first = this.options.firstVisible;
            this.page = parseInt(this.first/this.columns);
            this.totalPages = Math.ceil(this.itemsCount/this.options.numVisible);
            
            this._renderPageLinks();
            
            this.prevNav = this.header.children('.ui-carousel-prev-button');
            this.nextNav = this.header.children('.ui-carousel-next-button');
            this.pageLinks = this.header.find('> .ui-carousel-page-links > .ui-carousel-page-link');
            this.dropdown = this.header.children('.ui-carousel-dropdown');
            this.mobileDropdown = this.header.children('.ui-carousel-mobiledropdown');
            
            this._bindEvents();
            
            if(this.options.responsive) {
                this.refreshDimensions();
            }
            else {
                this.calculateItemWidths();
                this.container.width(this.container.width());
                this.updateNavigators();
            }        
        },
        
        _renderPageLinks: function() {
            if(this.totalPages <= this.options.pageLinks) {
                this.pageLinksContainer = $('<div class="ui-carousel-page-links"></div>');
                for(var i = 0; i < this.totalPages; i++) {
                    this.pageLinksContainer.append('<a href="#" class="ui-carousel-page-link fa fa-circle-o"></a>');
                }
                this.header.append(this.pageLinksContainer);
            }
            else {
                this.dropdown = $('<select class="ui-carousel-dropdown ui-widget ui-state-default ui-corner-left"></select>');
                for(var i = 0; i < this.totalPages; i++) {
                    var pageNumber = (i+1);
                    this.dropdown.append('<option value="' + pageNumber + '">' + pageNumber + '</option>');
                }
                this.header.append(this.dropdown);
            }
            
            if(this.options.responsive) {
                this.mobileDropdown = $('<select class="ui-carousel-mobiledropdown ui-widget ui-state-default ui-corner-left"></select>');
                for(var i = 0; i < this.itemsCount; i++) {
                    var pageNumber = (i+1);
                    this.mobileDropdown.append('<option value="' + pageNumber + '">' + pageNumber + '</option>');
                }
                this.header.append(this.mobileDropdown);
            }
        },
        
        calculateItemWidths: function() {
            var firstItem = this.items.eq(0);
            if(firstItem.length) {
                var itemFrameWidth = firstItem.outerWidth(true) - firstItem.width();    //sum of margin, border and padding
                this.items.width((this.viewport.innerWidth() - itemFrameWidth * this.columns) / this.columns);
            }
        },
    
        refreshDimensions: function() {
            var win = $(window);
            if(win.width() <= this.options.breakpoint) {
                this.columns = 1;
                this.calculateItemWidths(this.columns);
                this.totalPages = this.itemsCount;
                this.mobileDropdown.show();
                this.pageLinks.hide();
            }
            else {
                this.columns = this.options.numVisible;
                this.calculateItemWidths();
                this.totalPages = Math.ceil(this.itemsCount / this.options.numVisible);
                this.mobileDropdown.hide();
                this.pageLinks.show();
            }

            this.page = parseInt(this.first / this.columns);
            this.updateNavigators();
            this.element.css('left', (-1 * (this.viewport.innerWidth() * this.page)));
        },

        _bindEvents: function() {
            var $this = this;
            
            if(this.eventsBound) {
                return;
            }

            this.prevNav.on('click.puicarousel', function() {
                if($this.page !== 0) {
                    $this.setPage($this.page - 1);
                }
                else if($this.options.circular) {
                    $this.setPage($this.totalPages - 1);
                }
            });

            this.nextNav.on('click.puicarousel', function() {
                var lastPage = ($this.page === ($this.totalPages - 1));

                if(!lastPage) {
                    $this.setPage($this.page + 1);
                }
                else if($this.options.circular) {
                    $this.setPage(0);
                }
            });

            if($.swipe) {
                this.element.swipe({
                    swipe:function(event, direction) {
                        if(direction === 'left') {
                            if($this.page === ($this.totalPages - 1)) {
                                if($this.options.circular)
                                    $this.setPage(0);
                            }
                            else {
                                $this.setPage($this.page + 1);
                            }
                        }
                        else if(direction === 'right') {
                            if($this.page === 0) {
                                if($this.options.circular)
                                    $this.setPage($this.totalPages - 1);
                            }
                            else {
                                $this.setPage($this.page - 1);
                            }
                        }
                    }
                });
            }

            if(this.pageLinks.length) {
                this.pageLinks.on('click.puicarousel', function(e) {
                    $this.setPage($(this).index());
                    e.preventDefault();
                });
            }

            this.header.children('select').on('change.puicarousel', function() {
                $this.setPage(parseInt($(this).val()) - 1);
            });

            if(this.options.autoplayInterval) {
                this.options.circular = true;
                this.startAutoplay();
            }

            if(this.options.responsive) {
                var resizeNS = 'resize.' + this.id;
                $(window).off(resizeNS).on(resizeNS, function() {
                    $this.refreshDimensions();
                });
            }
            
            this.eventsBound = true;
        },

        _unbindEvents: function() {
            this.prevNav.off('click.puicarousel');
            this.nextNav.off('click.puicarousel');
            if(this.pageLinks.length) {
                this.pageLinks.off('click.puicarousel');
            }
            this.header.children('select').off('change.puicarousel');

            if(this.options.autoplayInterval) {
                this.stopAutoplay();
            }

            if(this.options.responsive) {
                $(window).off('resize.' + this.id)
            }
        },

        updateNavigators: function() {
            if(!this.options.circular) {
                if(this.page === 0) {
                    this.prevNav.addClass('ui-state-disabled');
                    this.nextNav.removeClass('ui-state-disabled');   
                }
                else if(this.page === (this.totalPages - 1)) {
                    this.prevNav.removeClass('ui-state-disabled');
                    this.nextNav.addClass('ui-state-disabled');
                }
                else {
                    this.prevNav.removeClass('ui-state-disabled');
                    this.nextNav.removeClass('ui-state-disabled');   
                }
            }

            if(this.pageLinks.length) {
                this.pageLinks.filter('.fa-dot-circle-o').removeClass('fa-dot-circle-o');
                this.pageLinks.eq(this.page).addClass('fa-dot-circle-o');
            }

            if(this.dropdown.length) {
                this.dropdown.val(this.page + 1);
            }

            if(this.mobileDropdown.length) {
                this.mobileDropdown.val(this.page + 1);
            }
        },

        setPage: function(p) {      
            if(p !== this.page && !this.element.is(':animated')) {
                var $this = this;

                this.element.animate({
                    left: -1 * (this.viewport.innerWidth() * p)
                    ,easing: this.options.easing
                }, 
                {
                    duration: this.options.effectDuration,
                    easing: this.options.easing,
                    complete: function() {
                        $this.page = p;
                        $this.first = $this.page * $this.columns;
                        $this.updateNavigators();
                        $this._trigger('pageChange', null, {'page':p});
                    }
                });
            }
        },

        startAutoplay: function() {
            var $this = this;

            this.interval = setInterval(function() {
                if($this.page === ($this.totalPages - 1))
                    $this.setPage(0);
                else
                    $this.setPage($this.page + 1);
            }, this.options.autoplayInterval);
        },

        stopAutoplay: function() {
            clearInterval(this.interval);
        },
                
        _setOption: function(key, value) {
            if(key === 'datasource')
                this._updateDatasource(value);
            else
                $.Widget.prototype._setOption.apply(this, arguments);
        },
        
        _createItemContent: function(obj) {
            if(this.options.template) {
                var template = this.options.template.html();
                Mustache.parse(template);
                return Mustache.render(template, obj);
            }
            else {
                return this.options.itemContent.call(this, obj);
            }
        }

    });
    
}));
/**
 * PrimeUI Lightbox Widget
 */
 (function (factory) {
     if (typeof define === 'function' && define.amd) {
         // AMD. Register as an anonymous module.
         define(['jquery'], factory);
     } else if (typeof module === 'object' && module.exports) {
         // Node/CommonJS
         module.exports = function( root, jQuery ) {
             factory(jQuery);
             return jQuery;
         };
     } else {
         // Browser globals
         factory(jQuery);
     }
 }(function ($) {

    $.widget("primeui.puilightbox", {

        options: {
            iframeWidth: 640,
            iframeHeight: 480,
            iframe: false
        },

        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            this.options.mode = this.options.iframe ? 'iframe' : (this.element.children('div').length == 1) ? 'inline' : 'image';

            var dom = '<div class="ui-lightbox ui-widget ui-helper-hidden ui-corner-all ui-shadow">';
            dom += '<div class="ui-lightbox-content-wrapper">';
            dom += '<a class="ui-state-default ui-lightbox-nav-left ui-corner-right ui-helper-hidden"><span class="fa fa-fw fa-caret-left"></span></a>';
            dom += '<div class="ui-lightbox-content ui-corner-all"></div>';
            dom += '<a class="ui-state-default ui-lightbox-nav-right ui-corner-left ui-helper-hidden"><span class="fa fa-fw fa-caret-right"></span></a>';
            dom += '</div>';
            dom += '<div class="ui-lightbox-caption ui-widget-header"><span class="ui-lightbox-caption-text"></span>';
            dom += '<a class="ui-lightbox-close ui-corner-all" href="#"><span class="fa fa-fw fa-close"></span></a><div style="clear:both" /></div>';
            dom += '</div>';

            this.panel = $(dom).appendTo(document.body);
            this.contentWrapper = this.panel.children('.ui-lightbox-content-wrapper');
            this.content = this.contentWrapper.children('.ui-lightbox-content');
            this.caption = this.panel.children('.ui-lightbox-caption');
            this.captionText = this.caption.children('.ui-lightbox-caption-text');
            this.closeIcon = this.caption.children('.ui-lightbox-close');

            if(this.options.mode === 'image') {
                this._setupImaging();
            }
            else if(this.options.mode === 'inline') {
                this._setupInline();
            }
            else if(this.options.mode === 'iframe') {
                this._setupIframe();
            }

            this._bindCommonEvents();

            this.links.data('puilightbox-trigger', true).find('*').data('puilightbox-trigger', true);
            this.closeIcon.data('puilightbox-trigger', true).find('*').data('puilightbox-trigger', true);
        },

        _bindCommonEvents: function() {
            var $this = this;

            this.closeIcon.on('hover.ui-lightbox', function() {
                    $(this).toggleClass('ui-state-hover');
                })
                .on('click.ui-lightbox', function(e) {
                    $this.hide();
                    e.preventDefault();
                });

            //hide when outside is clicked
            $(document.body).on('click.ui-lightbox-' + this.id, function (e) {
                if($this.isHidden()) {
                    return;
                }

                //do nothing if target is the link
                var target = $(e.target);
                if(target.data('puilightbox-trigger')) {
                    return;
                }

                //hide if mouse is outside of lightbox
                var offset = $this.panel.offset();
                if(e.pageX < offset.left ||
                    e.pageX > offset.left + $this.panel.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + $this.panel.height()) {

                    $this.hide();
                }
            });

            //sync window resize
            $(window).on('resize.ui-lightbox-' + this.id, function() {
                if(!$this.isHidden()) {
                    $(document.body).children('.ui-widget-overlay').css({
                        'width': $(document).width(),
                        'height': $(document).height()
                    });
                }
            });
        },

        _destroy: function() {
            this.links.removeData('puilightbox-trigger').find('*').removeData('puilightbox-trigger');
            this._unbindEvents();
            this.panel.remove();
            if(this.modality) {
                this._disableModality();
            }
        },

        _unbindEvents: function() {
            this.closeIcon.off('hover.ui-lightbox click.ui-lightbox');
            $(document.body).off('click.ui-lightbox-' + this.id);
            $(window).off('resize.ui-lightbox-' + this.id)
            this.links.off('click.ui-lightbox');
            if(this.options.mode === 'image') {
                this.imageDisplay.off('load.ui-lightbox');
                this.navigators.off('hover.ui-lightbox click.ui-lightbox');
            }
        },

        _setupImaging: function() {
            var $this = this;

            this.links = this.element.children('a');
            this.content.append('<img class="ui-helper-hidden"></img>');
            this.imageDisplay = this.content.children('img');
            this.navigators = this.contentWrapper.children('a');

            this.imageDisplay.on('load.ui-lightbox', function() {
                var image = $(this);

                $this._scaleImage(image);

                //coordinates to center overlay
                var leftOffset = ($this.panel.width() - image.width()) / 2,
                    topOffset = ($this.panel.height() - image.height()) / 2;

                //resize content for new image
                $this.content.removeClass('ui-lightbox-loading').animate({
                        width: image.width(),
                        height: image.height()
                    },
                    500,
                    function() {
                        //show image
                        image.fadeIn();
                        $this._showNavigators();
                        $this.caption.slideDown();
                    });

                $this.panel.animate({
                    left: '+=' + leftOffset,
                    top: '+=' + topOffset
                }, 500);
            });

            this.navigators.on('hover.ui-lightbox', function() {
                    $(this).toggleClass('ui-state-hover');
                })
                .on('click.ui-lightbox', function(e) {
                    var nav = $(this),
                        index;

                    $this._hideNavigators();

                    if(nav.hasClass('ui-lightbox-nav-left')) {
                        index = $this.current === 0 ? $this.links.length - 1 : $this.current - 1;

                        $this.links.eq(index).trigger('click');
                    }
                    else {
                        index = $this.current == $this.links.length - 1 ? 0 : $this.current + 1;

                        $this.links.eq(index).trigger('click');
                    }

                    e.preventDefault();
                });

            this.links.on('click.ui-lightbox', function(e) {
                var link = $(this);

                if($this.isHidden()) {
                    $this.content.addClass('ui-lightbox-loading').width(32).height(32);
                    $this.show();
                }
                else {
                    $this.imageDisplay.fadeOut(function() {
                        //clear for onload scaling
                        $(this).css({
                            'width': 'auto',
                            'height': 'auto'
                        });

                        $this.content.addClass('ui-lightbox-loading');
                    });

                    $this.caption.slideUp();
                }

                window.setTimeout(function() {
                    $this.imageDisplay.attr('src', link.attr('href'));
                    $this.current = link.index();

                    var title = link.attr('title');
                    if(title) {
                        $this.captionText.html(title);
                    }
                }, 1000);


                e.preventDefault();
            });
        },

        _scaleImage: function(image) {
            var win = $(window),
                winWidth = win.width(),
                winHeight = win.height(),
                imageWidth = image.width(),
                imageHeight = image.height(),
                ratio = imageHeight / imageWidth;

            if(imageWidth >= winWidth && ratio <= 1){
                imageWidth = winWidth * 0.75;
                imageHeight = imageWidth * ratio;
            }
            else if(imageHeight >= winHeight){
                imageHeight = winHeight * 0.75;
                imageWidth = imageHeight / ratio;
            }

            image.css({
                'width':imageWidth + 'px',
                'height':imageHeight + 'px'
            });
        },

        _setupInline: function() {
            this.links = this.element.children('a');
            this.inline = this.element.children('div').addClass('ui-lightbox-inline');
            this.inline.appendTo(this.content).show();
            var $this = this;

            this.links.on('click.ui-lightbox', function(e) {
                $this.show();

                var title = $(this).attr('title');
                if(title) {
                    $this.captionText.html(title);
                    $this.caption.slideDown();
                }

                e.preventDefault();
            });
        },

        _setupIframe: function() {
            var $this = this;
            this.links = this.element;
            this.iframe = $('<iframe frameborder="0" style="width:' + this.options.iframeWidth + 'px;height:' +
                this.options.iframeHeight + 'px;border:0 none; display: block;"></iframe>').appendTo(this.content);

            if(this.options.iframeTitle) {
                this.iframe.attr('title', this.options.iframeTitle);
            }

            this.element.click(function(e) {
                if(!$this.iframeLoaded) {
                    $this.content.addClass('ui-lightbox-loading').css({
                        width: $this.options.iframeWidth,
                        height: $this.options.iframeHeight
                    });

                    $this.show();

                    $this.iframe.on('load', function() {
                            $this.iframeLoaded = true;
                            $this.content.removeClass('ui-lightbox-loading');
                        })
                        .attr('src', $this.element.attr('href'));
                }
                else {
                    $this.show();
                }

                var title = $this.element.attr('title');
                if(title) {
                    $this.caption.html(title);
                    $this.caption.slideDown();
                }

                e.preventDefault();
            });
        },

        show: function() {
            this.center();

            this.panel.css('z-index', ++PUI.zindex).show();

            if(!this.modality) {
                this._enableModality();
            }

            this._trigger('show');
        },

        hide: function() {
            this.panel.fadeOut();
            this._disableModality();
            this.caption.hide();

            if(this.options.mode === 'image') {
                this.imageDisplay.hide().attr('src', '').removeAttr('style');
                this._hideNavigators();
            }

            this._trigger('hide');
        },

        center: function() {
            var win = $(window),
                left = (win.width() / 2 ) - (this.panel.width() / 2),
                top = (win.height() / 2 ) - (this.panel.height() / 2);

            this.panel.css({
                'left': left,
                'top': top
            });
        },

        _enableModality: function() {
            this.modality = $('<div class="ui-widget-overlay"></div>')
                .css({
                    'width': $(document).width(),
                    'height': $(document).height(),
                    'z-index': this.panel.css('z-index') - 1
                })
                .appendTo(document.body);
        },

        _disableModality: function() {
            this.modality.remove();
            this.modality = null;
        },

        _showNavigators: function() {
            this.navigators.zIndex(this.imageDisplay.zIndex() + 1).show();
        },

        _hideNavigators: function() {
            this.navigators.hide();
        },

        isHidden: function() {
            return this.panel.is(':hidden');
        },

        showURL: function(opt) {
            if(opt.width) {
                this.iframe.attr('width', opt.width);
            }
            if(opt.height) {
                this.iframe.attr('height', opt.height);
            }

            this.iframe.attr('src', opt.src);

            this.show();
        }
    });
    
}));
/**
 * PrimeUI Menu widgets
 */
 (function (factory) {
     if (typeof define === 'function' && define.amd) {
         // AMD. Register as an anonymous module.
         define(['jquery'], factory);
     } else if (typeof module === 'object' && module.exports) {
         // Node/CommonJS
         module.exports = function( root, jQuery ) {
             factory(jQuery);
             return jQuery;
         };
     } else {
         // Browser globals
         factory(jQuery);
     }
 }(function ($) {

    $.widget("primeui.puibasemenu", {

        options: {
            popup: false,
            trigger: null,
            my: 'left top',
            at: 'left bottom',
            triggerEvent: 'click'
        },

        _create: function() {
            if(this.options.popup) {
                this._initPopup();
            }
        },

        _initPopup: function() {
            var $this = this;

            this.element.closest('.ui-menu').addClass('ui-menu-dynamic ui-shadow').appendTo(document.body);

            if($.type(this.options.trigger) === 'string') {
                this.options.trigger =  $(this.options.trigger);
            }

            this.positionConfig = {
                my: this.options.my,
                at: this.options.at,
                of: this.options.trigger
            };

            this.options.trigger.on(this.options.triggerEvent + '.ui-menu', function(e) {
                if($this.element.is(':visible')) {
                    $this.hide();
                }
                else {
                    $this.show();
                }

                e.preventDefault();
            });

            //hide overlay on document click
            $(document.body).on('click.ui-menu-' + this.id, function (e) {
                var popup = $this.element.closest('.ui-menu');
                if(popup.is(":hidden")) {
                    return;
                }

                //do nothing if mousedown is on trigger
                var target = $(e.target);
                if(target.is($this.options.trigger.get(0))||$this.options.trigger.has(target).length > 0) {
                    return;
                }

                //hide if mouse is outside of overlay except trigger
                var offset = popup.offset();
                if(e.pageX < offset.left ||
                    e.pageX > offset.left + popup.width() ||
                    e.pageY < offset.top ||
                    e.pageY > offset.top + popup.height()) {

                    $this.hide(e);
                }
            });

            //Hide overlay on resize
            $(window).on('resize.ui-menu-' + this.id, function() {
                if($this.element.closest('.ui-menu').is(':visible')) {
                    $this.align();
                }
            });
        },

        show: function() {
            this.align();
            this.element.closest('.ui-menu').css('z-index', ++PUI.zindex).show();
        },

        hide: function() {
            this.element.closest('.ui-menu').fadeOut('fast');
        },

        align: function() {
            this.element.closest('.ui-menu').css({left:'', top:''}).position(this.positionConfig);
        },

        _destroy: function() {
            if(this.options.popup) {
                $(document.body).off('click.ui-menu-' + this.id);
                $(window).off('resize.ui-menu-' + this.id);
                this.options.trigger.off(this.options.triggerEvent + '.ui-menu');
            }
        }
    });

    $.widget("primeui.puimenu", $.primeui.puibasemenu, {

        options: {
            enhanced: false
        },

        _create: function() {
            var $this = this;

            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            if(!this.options.enhanced) {
                this.element.wrap('<div class="ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix"></div>');
            }

            this.container = this.element.parent();
            this.originalParent = this.container.parent();

            this.element.addClass('ui-menu-list ui-helper-reset');

            this.element.children('li').each(function() {
                var listItem = $(this);

                if(listItem.children('h3').length > 0) {
                    listItem.addClass('ui-widget-header ui-corner-all');
                }
                else {
                    listItem.addClass('ui-menuitem ui-widget ui-corner-all');
                    var menuitemLink = listItem.children('a'),
                        icon = menuitemLink.data('icon');

                    menuitemLink.addClass('ui-menuitem-link ui-corner-all');

                    if($this.options.enhanced)
                        menuitemLink.children('span').addClass('ui-menuitem-text');
                    else
                        menuitemLink.contents().wrap('<span class="ui-menuitem-text" />');

                    if(icon) {
                        menuitemLink.prepend('<span class="ui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                    }
                }
            });

            this.menuitemLinks = this.element.find('.ui-menuitem-link:not(.ui-state-disabled)');

            this._bindEvents();

            this._super();
        },

        _bindEvents: function() {
            var $this = this;

            this.menuitemLinks.on('mouseenter.ui-menu', function(e) {
                    $(this).addClass('ui-state-hover');
                })
                .on('mouseleave.ui-menu', function(e) {
                    $(this).removeClass('ui-state-hover');
                });

            if(this.options.popup) {
                this.menuitemLinks.on('click.ui-menu', function() {
                    $this.hide();
                });
            }
        },

        _unbindEvents: function() {
            this.menuitemLinks.off('mouseenter.ui-menu mouseleave.ui-menu');
            if(this.options.popup) {
                this.menuitemLinks.off('click.ui-menu');
            }
        },

        _destroy: function() {
            this._super();

            var $this = this;
            this._unbindEvents();

            this.element.removeClass('ui-menu-list ui-helper-reset');
            this.element.children('li.ui-widget-header').removeClass('ui-widget-header ui-corner-all');
            this.element.children('li:not(.ui-widget-header)').removeClass('ui-menuitem ui-widget ui-corner-all')
                .children('a').removeClass('ui-menuitem-link ui-corner-all').each(function() {
                var link = $(this);
                link.children('.ui-menuitem-icon').remove();

                if($this.options.enhanced)
                    link.children('.ui-menuitem-text').removeClass('ui-menuitem-text');
                else
                    link.children('.ui-menuitem-text').contents().unwrap();
            });

            if(this.options.popup) {
                this.container.appendTo(this.originalParent);
            }

            if(!this.options.enhanced) {
                this.element.unwrap();
            }
        }
    });

    $.widget("primeui.puibreadcrumb", {

        _create: function() {
            var $this = this;

            if(!this.options.enhanced) {
                this.element.wrap('<div class="ui-breadcrumb ui-module ui-widget ui-widget-header ui-helper-clearfix ui-corner-all" role="menu">');
            }
            this.element.children('li').each(function(index) {
                var listItem = $(this);
                listItem.attr('role', 'menuitem');
                var menuitemLink = listItem.children('a');
                menuitemLink.addClass('ui-menuitem-link');

                if($this.options.enhanced)
                    menuitemLink.children('span').addClass('ui-menuitem-text');
                else
                    menuitemLink.contents().wrap('<span class="ui-menuitem-text" />');

                if(index > 0) {
                    listItem.before('<li class="ui-breadcrumb-chevron fa fa-chevron-right"></li>');
                }
                else {
                    listItem.before('<li class="fa fa-home"></li>');
                }
            });
        },

        _destroy: function() {
            var $this = this;
            if(!this.options.enhanced) {
                this.unwrap();
            }
            this.element.children('li.ui-breadcrumb-chevron,.fa-home').remove();
            this.element.children('li').each(function() {
                var listItem = $(this),
                    link = listItem.children('a');

                link.removeClass('ui-menuitem-link');
                if($this.options.enhanced)
                    link.children('.ui-menuitem-text').removeClass('ui-menuitem-text');
                else
                    link.children('.ui-menuitem-text').contents().unwrap();
            });
        }
    });

    $.widget("primeui.puitieredmenu", $.primeui.puibasemenu, {

        options: {
            autoDisplay: true
        },

        _create: function() {
            var $this = this;

            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            if(!this.options.enhanced) {
                this.element.wrap('<div class="ui-tieredmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix"></div>');
            }

            this.container = this.element.parent();
            this.originalParent = this.container.parent();

            this.element.addClass('ui-menu-list ui-helper-reset');

            this.element.find('li').each(function() {
                var listItem = $(this),
                    menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');

                menuitemLink.addClass('ui-menuitem-link ui-corner-all');

                if($this.options.enhanced)
                    menuitemLink.children('span').addClass('ui-menuitem-text');
                else
                    menuitemLink.contents().wrap('<span class="ui-menuitem-text" />');

                if(icon) {
                    menuitemLink.prepend('<span class="ui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                }

                listItem.addClass('ui-menuitem ui-widget ui-corner-all');

                if(listItem.children('ul').length > 0) {
                    var submenuIcon = listItem.parent().hasClass('ui-menu-child') ? 'fa-caret-right' : $this._getRootSubmenuIcon();
                    listItem.addClass('ui-menu-parent');
                    listItem.children('ul').addClass('ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow');

                    menuitemLink.prepend('<span class="ui-submenu-icon fa fa-fw ' + submenuIcon + '"></span>');
                }
            });

            this.links = this.element.find('.ui-menuitem-link:not(.ui-state-disabled)');

            this._bindEvents();

            this._super();
        },

        _bindEvents: function() {
            this._bindItemEvents();
            this._bindDocumentHandler();
        },

        _bindItemEvents: function() {
            var $this = this;

            this.links.on('mouseenter.ui-menu', function() {
                var link = $(this),
                    menuitem = link.parent(),
                    autoDisplay = $this.options.autoDisplay;

                var activeSibling = menuitem.siblings('.ui-menuitem-active');
                if(activeSibling.length === 1) {
                    $this._deactivate(activeSibling);
                }

                if(autoDisplay||$this.active) {
                    if(menuitem.hasClass('ui-menuitem-active')) {
                        $this._reactivate(menuitem);
                    }
                    else {
                        $this._activate(menuitem);
                    }
                }
                else {
                    $this._highlight(menuitem);
                }
            });

            if(this.options.autoDisplay === false) {
                this.rootLinks = this.element.find('> .ui-menuitem > .ui-menuitem-link');
                this.rootLinks.data('primeui-tieredmenu-rootlink', this.id).find('*').data('primeui-tieredmenu-rootlink', this.id);

                this.rootLinks.on('click.ui-menu', function(e) {
                    var link = $(this),
                        menuitem = link.parent(),
                        submenu = menuitem.children('ul.ui-menu-child');

                    if(submenu.length === 1) {
                        if(submenu.is(':visible')) {
                            $this.active = false;
                            $this._deactivate(menuitem);
                        }
                        else {
                            $this.active = true;
                            $this._highlight(menuitem);
                            $this._showSubmenu(menuitem, submenu);
                        }
                    }
                });
            }

            this.element.parent().find('ul.ui-menu-list').on('mouseleave.ui-menu', function(e) {
                if($this.activeitem) {
                    $this._deactivate($this.activeitem);
                }

                e.stopPropagation();
            });
        },

        _bindDocumentHandler: function() {
            var $this = this;

            $(document.body).on('click.ui-menu-' + this.id, function(e) {
                var target = $(e.target);
                if(target.data('primeui-tieredmenu-rootlink') === $this.id) {
                    return;
                }

                $this.active = false;

                $this.element.find('li.ui-menuitem-active').each(function() {
                    $this._deactivate($(this), true);
                });
            });
        },

        _unbindEvents: function() {
            this.links.off('mouseenter.ui-menu');
            if(this.options.autoDisplay === false) {
                this.rootLinks.off('click.ui-menu');
            }
            this.element.parent().find('ul.ui-menu-list').off('mouseleave.ui-menu');
            $(document.body).off('click.ui-menu-' + this.id);
        },

        _deactivate: function(menuitem, animate) {
            this.activeitem = null;
            menuitem.children('a.ui-menuitem-link').removeClass('ui-state-hover');
            menuitem.removeClass('ui-menuitem-active');

            if(animate) {
                menuitem.children('ul.ui-menu-child:visible').fadeOut('fast');
            }
            else {
                menuitem.children('ul.ui-menu-child:visible').hide();
            }
        },

        _activate: function(menuitem) {
            this._highlight(menuitem);

            var submenu = menuitem.children('ul.ui-menu-child');
            if(submenu.length === 1) {
                this._showSubmenu(menuitem, submenu);
            }
        },

        _reactivate: function(menuitem) {
            this.activeitem = menuitem;
            var submenu = menuitem.children('ul.ui-menu-child'),
                activeChilditem = submenu.children('li.ui-menuitem-active:first'),
                _self = this;

            if(activeChilditem.length === 1) {
                _self._deactivate(activeChilditem);
            }
        },

        _highlight: function(menuitem) {
            this.activeitem = menuitem;
            menuitem.children('a.ui-menuitem-link').addClass('ui-state-hover');
            menuitem.addClass('ui-menuitem-active');
        },

        _showSubmenu: function(menuitem, submenu) {
            submenu.css({
                'left': menuitem.outerWidth(),
                'top': 0,
                'z-index': ++PUI.zindex
            });

            submenu.show();
        },

        _getRootSubmenuIcon: function() {
            return 'fa-caret-right';
        },

        _destroy: function() {
            this._super();

            var $this = this;
            this._unbindEvents();

            this.element.removeClass('ui-menu-list ui-helper-reset');
            this.element.find('li').removeClass('ui-menuitem ui-widget ui-corner-all ui-menu-parent').each(function() {
                var listItem = $(this),
                link = listItem.children('a');

                link.removeClass('ui-menuitem-link ui-corner-all').children('.fa').remove();

                if($this.options.enhanced)
                    link.children('.ui-menuitem-text').removeClass('ui-menuitem-text');
                else
                    link.children('.ui-menuitem-text').contents().unwrap();

                listItem.children('ul').removeClass('ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow');
            });

            if(this.options.popup) {
                this.container.appendTo(this.originalParent);
            }

            if(!this.options.enhanced) {
                this.element.unwrap();
            }
        }

    });

    $.widget("primeui.puimenubar", $.primeui.puitieredmenu, {

        options: {
            autoDisplay: true,
            enhanced: false
        },

        _create: function() {
            this._super();

            if(!this.options.enhanced) {
                this.element.parent().removeClass('ui-tieredmenu').addClass('ui-menubar');
            }
        },

        _showSubmenu: function(menuitem, submenu) {
            var win = $(window),
                submenuOffsetTop = null,
                submenuCSS = {
                    'z-index': ++PUI.zindex
                };

            if(menuitem.parent().hasClass('ui-menu-child')) {
                submenuCSS.left = menuitem.outerWidth();
                submenuCSS.top = 0;
                submenuOffsetTop = menuitem.offset().top - win.scrollTop();
            }
            else {
                submenuCSS.left = 0;
                submenuCSS.top = menuitem.outerHeight();
                submenuOffsetTop = menuitem.offset().top + submenuCSS.top - win.scrollTop();
            }

            //adjust height within viewport
            submenu.css('height', 'auto');
            if((submenuOffsetTop + submenu.outerHeight()) > win.height()) {
                submenuCSS.overflow = 'auto';
                submenuCSS.height = win.height() - (submenuOffsetTop + 20);
            }

            submenu.css(submenuCSS).show();
        },

        _getRootSubmenuIcon: function() {
            return 'fa-caret-down';
        }
    });

    $.widget("primeui.puislidemenu", $.primeui.puibasemenu, {

        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            this._render();

            //elements
            this.rootList = this.element;
            this.content = this.element.parent();
            this.wrapper = this.content.parent();
            this.container = this.wrapper.parent();
            this.originalParent = this.container.parent();
            this.submenus = this.container.find('ul.ui-menu-list');

            this.links = this.element.find('a.ui-menuitem-link:not(.ui-state-disabled)');
            this.backward = this.wrapper.children('div.ui-slidemenu-backward');

            //config
            this.stack = [];
            this.jqWidth = this.container.width();

            if(!this.options.popup) {
                var $this = this;
                setTimeout(function() {
                    $this._applyDimensions();
                }, 100);

            }

            this._bindEvents();

            this._super();
        },

        _render: function() {
            var $this = this;

            if(!this.options.enhanced) {
                this.element.wrap('<div class="ui-menu ui-slidemenu ui-widget ui-widget-content ui-corner-all"></div>')
                    .wrap('<div class="ui-slidemenu-wrapper"></div>')
                    .wrap('<div class="ui-slidemenu-content"></div>');

                this.element.parent().after('<div class="ui-slidemenu-backward ui-widget-header ui-corner-all"><span class="fa fa-fw fa-caret-left"></span>Back</div>');
            }
            this.element.addClass('ui-menu-list ui-helper-reset');

            this.element.find('li').each(function() {
                var listItem = $(this),
                    menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');

                menuitemLink.addClass('ui-menuitem-link ui-corner-all');

                if($this.options.enhanced)
                    menuitemLink.children('span').addClass('ui-menuitem-text');
                else
                    menuitemLink.contents().wrap('<span class="ui-menuitem-text" />');

                if(icon) {
                    menuitemLink.prepend('<span class="ui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                }

                listItem.addClass('ui-menuitem ui-widget ui-corner-all');

                if(listItem.children('ul').length) {
                    listItem.addClass('ui-menu-parent');
                    listItem.children('ul').addClass('ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow');
                    menuitemLink.prepend('<span class="ui-submenu-icon fa fa-fw fa-caret-right"></span>');
                }
            });
        },

        _destroy: function() {
            this._super();
            this._unbindEvents();

            var $this = this;

            this.element.removeClass('ui-menu-list ui-helper-reset');
            this.element.find('li').removeClass('ui-menuitem ui-widget ui-corner-all ui-menu-parent').each(function() {
                var listItem = $(this),
                link = listItem.children('a');

                link.removeClass('ui-menuitem-link ui-corner-all').children('.fa').remove();

                if($this.options.enhanced)
                    link.children('.ui-menuitem-text').removeClass('ui-menuitem-text');
                else
                    link.children('.ui-menuitem-text').contents().unwrap();

                listItem.children('ul').removeClass('ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow');
            });

            if(this.options.popup) {
                this.container.appendTo(this.originalParent);
            }

            if(!this.options.enhanced) {
                this.content.next('.ui-slidemenu-backward').remove();
                this.element.unwrap().unwrap().unwrap();
            }
        },

        _bindEvents: function() {
            var $this = this;

            this.links.on('mouseenter.ui-menu',function() {
                    $(this).addClass('ui-state-hover');
                })
                .on('mouseleave.ui-menu',function() {
                    $(this).removeClass('ui-state-hover');
                })
                .on('click.ui-menu',function() {
                    var link = $(this),
                        submenu = link.next();

                    if(submenu.length == 1) {
                        $this._forward(submenu);
                    }
                });

            this.backward.on('click.ui-menu',function() {
                $this._back();
            });
        },

        _unbindEvents: function() {
            this.links.off('mouseenter.ui-menu mouseleave.ui-menu click.ui-menu');
            this.backward.off('click.ui-menu');
        },

        _forward: function(submenu) {
            var $this = this;

            this._push(submenu);

            var rootLeft = -1 * (this._depth() * this.jqWidth);

            submenu.show().css({
                left: this.jqWidth
            });

            this.rootList.animate({
                left: rootLeft
            }, 500, 'easeInOutCirc', function() {
                if($this.backward.is(':hidden')) {
                    $this.backward.fadeIn('fast');
                }
            });
        },

        _back: function() {
            if(!this.rootList.is(':animated')) {
                var $this = this,
                    last = this._pop(),
                    depth = this._depth();

                var rootLeft = -1 * (depth * this.jqWidth);

                this.rootList.animate({
                    left: rootLeft
                }, 500, 'easeInOutCirc', function() {
                    if(last) {
                        last.hide();
                    }

                    if(depth === 0) {
                        $this.backward.fadeOut('fast');
                    }
                });
            }
        },

        _push: function(submenu) {
            this.stack.push(submenu);
        },

        _pop: function() {
            return this.stack.pop();
        },

        _last: function() {
            return this.stack[this.stack.length - 1];
        },

        _depth: function() {
            return this.stack.length;
        },

        _applyDimensions: function() {
            this.submenus.width(this.container.width());
            this.wrapper.height(this.rootList.outerHeight(true) + this.backward.outerHeight(true));
            this.content.height(this.rootList.outerHeight(true));
            this.rendered = true;
        },

        show: function() {
            this.align();
            this.container.css('z-index', ++PUI.zindex).show();

            if(!this.rendered) {
                this._applyDimensions();
            }
        }
    });

    $.widget("primeui.puicontextmenu", $.primeui.puitieredmenu, {

        options: {
            autoDisplay: true,
            target: null,
            event: 'contextmenu'
        },

        _create: function() {
            this._super();
            this.element.parent().removeClass('ui-tieredmenu').
                    addClass('ui-contextmenu ui-menu-dynamic ui-shadow');

            var $this = this;

            if(this.options.target) {
                this.options.target =  $(this.options.target);
                
                if(this.options.target.hasClass('ui-datatable')) {
                    $this._bindDataTable();
                }
                else {
                    this.options.target.on(this.options.event + '.ui-contextmenu', function(e){
                        $this.show(e);
                    });
                }
            }

            if(!this.element.parent().parent().is(document.body)) {
                this.element.parent().appendTo('body');
            }
        },

        _bindDocumentHandler: function() {
            var $this = this;

            //hide overlay when document is clicked
            $(document.body).on('click.ui-contextmenu.' + this.id, function (e) {
                if($this.element.parent().is(":hidden")) {
                    return;
                }

                $this._hide();
            });
        },

        _bindDataTable: function() {
            var rowSelector = '#' + this.options.target.attr('id') + ' tbody.ui-datatable-data > tr.ui-widget-content:not(.ui-datatable-empty-message)',
            event = this.options.event + '.ui-datatable',
            $this = this;

            $(document).off(event, rowSelector)
                        .on(event, rowSelector, null, function(e) {
                            $this.options.target.puidatatable('onRowRightClick', event, $(this));
                            $this.show(e);
                        });
        },

        _unbindDataTable: function() {
            $(document).off(this.options.event + '.ui-datatable',
                        '#' + this.options.target.attr('id') + ' tbody.ui-datatable-data > tr.ui-widget-content:not(.ui-datatable-empty-message)');
        },

        _unbindEvents: function() {
            this._super();

            if(this.options.target) {
                if(this.options.target.hasClass('ui-datatable'))
                    this._unbindDataTable();
                else 
                    this.options.target.off(this.options.event + '.ui-contextmenu');
            }
            
            $(document.body).off('click.ui-contextmenu.' + this.id);
        },

        show: function(e) {
            //hide other contextmenus if any
            $(document.body).children('.ui-contextmenu:visible').hide();

            var win = $(window),
            left = e.pageX,
            top = e.pageY,
            width = this.element.parent().outerWidth(),
            height = this.element.parent().outerHeight();

            //collision detection for window boundaries
            if((left + width) > (win.width())+ win.scrollLeft()) {
                left = left - width;
            }
            if((top + height ) > (win.height() + win.scrollTop())) {
                top = top - height;
            }

            if(this.options.beforeShow) {
                this.options.beforeShow.call(this);
            }

            this.element.parent().css({
                'left': left,
                'top': top,
                'z-index': ++PUI.zindex
            }).show();

            e.preventDefault();
            e.stopPropagation();
        },

        _hide: function() {
            var $this = this;

            //hide submenus
            this.element.parent().find('li.ui-menuitem-active').each(function() {
                $this._deactivate($(this), true);
            });

            this.element.parent().fadeOut('fast');
        },

        isVisible: function() {
            return this.element.parent().is(':visible');
        },

        getTarget: function() {
            return this.jqTarget;
        },

        _destroy: function() {
            var $this = this;
            this._unbindEvents();

            this.element.removeClass('ui-menu-list ui-helper-reset');
            this.element.find('li').removeClass('ui-menuitem ui-widget ui-corner-all ui-menu-parent').each(function() {
                var listItem = $(this),
                link = listItem.children('a');

                link.removeClass('ui-menuitem-link ui-corner-all').children('.fa').remove();

                if($this.options.enhanced)
                    link.children('.ui-menuitem-text').removeClass('ui-menuitem-text');
                else
                    link.children('.ui-menuitem-text').contents().unwrap();

                listItem.children('ul').removeClass('ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow');
            });

            this.container.appendTo(this.originalParent);

            if(!this.options.enhanced) {
                this.element.unwrap();
            }
        }

    });

    $.widget("primeui.puimegamenu", $.primeui.puibasemenu, {

        options: {
            autoDisplay: true,
            orientation:'horizontal',
            enhanced: false
        },

        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            this._render();

            this.rootList = this.element.children('ul');
            this.rootLinks = this.rootList.children('li').children('a');
            this.subLinks = this.element.find('.ui-megamenu-panel a.ui-menuitem-link');
            this.keyboardTarget = this.element.children('.ui-helper-hidden-accessible');

            this._bindEvents();
            this._bindKeyEvents();
        },

        _render: function() {
            var $this = this;

            if(!this.options.enhanced) {
                this.element.prepend('<div tabindex="0" class="ui-helper-hidden-accessible"></div>');
                this.element.addClass('ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix');
                if(this._isVertical()) {
                    this.element.addClass('ui-megamenu-vertical');
                }
            }

            this.element.children('ul').addClass('ui-menu-list ui-helper-reset');

            this.element.find('li').each(function(){
                var listItem = $(this),
                    menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');

                menuitemLink.addClass('ui-menuitem-link ui-corner-all');

                if($this.options.enhanced)
                    menuitemLink.children('span').addClass('ui-menuitem-text');
                else
                    menuitemLink.contents().wrap('<span class="ui-menuitem-text" />');

                if(icon) {
                    menuitemLink.prepend('<span class="ui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                }

                listItem.addClass('ui-menuitem ui-widget ui-corner-all');
                listItem.parent().addClass('ui-menu-list ui-helper-reset');

                if(listItem.children('h3').length) {
                    listItem.addClass('ui-widget-header ui-corner-all');
                    listItem.removeClass('ui-widget ui-menuitem');
                }
                else if(listItem.children('div').length) {
                    var submenuIcon = $this._isVertical() ? 'fa-caret-right' : 'fa-caret-down';
                    listItem.addClass('ui-menu-parent');
                    listItem.children('div').addClass('ui-megamenu-panel ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow');
                    menuitemLink.addClass('ui-submenu-link').prepend('<span class="ui-submenu-icon fa fa-fw ' + submenuIcon + '"></span>');
                }
            });
        },

        _destroy: function() {
            var $this = this;
            this._unbindEvents();
            if(!this.options.enhanced) {
                this.element.children('.ui-helper-hidden-accessible').remove();
                this.element.removeClass('ui-menu ui-menubar ui-megamenu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-megamenu-vertical');
            }

            this.element.find('li').each(function(){
                var listItem = $(this),
                    menuitemLink = listItem.children('a');

                menuitemLink.removeClass('ui-menuitem-link ui-corner-all');

                if($this.options.enhanced)
                    menuitemLink.children('span').removeClass('ui-menuitem-text');
                else
                    menuitemLink.contents().unwrap();

                menuitemLink.children('.ui-menuitem-icon').remove();

                listItem.removeClass('ui-menuitem ui-widget ui-corner-all')
                    .parent().removeClass('ui-menu-list ui-helper-reset');

                if(listItem.children('h3').length) {
                    listItem.removeClass('ui-widget-header ui-corner-all');
                }
                else if(listItem.children('div').length) {
                    var submenuIcon = $this._isVertical() ? 'fa-caret-right' : 'fa-caret-down';
                    listItem.removeClass('ui-menu-parent');
                    listItem.children('div').removeClass('ui-megamenu-panel ui-widget-content ui-menu-list ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow');
                    menuitemLink.removeClass('ui-submenu-link').children('.ui-submenu-icon').remove();
                }
            });
        },

        _bindEvents: function() {
            var $this = this;
      
            this.rootLinks.on('mouseenter.ui-megamenu', function(e) {
                var link = $(this),
                menuitem = link.parent();
                
                var current = menuitem.siblings('.ui-menuitem-active');
                if(current.length > 0) {
                    current.find('li.ui-menuitem-active').each(function() {
                        $this._deactivate($(this));
                    });
                    $this._deactivate(current, false);
                }
                
                if($this.options.autoDisplay||$this.active) {
                    $this._activate(menuitem);
                }
                else {
                    $this._highlight(menuitem);
                }
                
            });
            
            if(this.options.autoDisplay === false) {
                this.rootLinks.data('primefaces-megamenu', this.id).find('*').data('primefaces-megamenu', this.id)
                
                this.rootLinks.on('click.ui-megamenu', function(e) {
                    var link = $(this),
                    menuitem = link.parent(),
                    submenu = link.next();

                    if(submenu.length === 1) {
                        if(submenu.is(':visible')) {
                            $this.active = false;
                            $this._deactivate(menuitem, true);
                        }
                        else {                                        
                            $this.active = true;
                            $this._activate(menuitem);
                        }
                    }
                    
                    e.preventDefault();
                });
            }
            else {
                this.rootLinks.filter('.ui-submenu-link').on('click.ui-megamenu', function(e) {
                    e.preventDefault();
                });
            }

            this.subLinks.on('mouseenter.ui-megamenu', function() {
                if($this.activeitem && !$this.isRootLink($this.activeitem)) {
                    $this._deactivate($this.activeitem);    
                } 
                $this._highlight($(this).parent());
            })
            .on('mouseleave.ui-megamenu', function() {
                if($this.activeitem && !$this.isRootLink($this.activeitem)) {
                    $this._deactivate($this.activeitem);    
                }
                $(this).removeClass('ui-state-hover');
            });
            
            this.rootList.on('mouseleave.ui-megamenu', function(e) {
                var activeitem = $this.rootList.children('.ui-menuitem-active');
                if(activeitem.length === 1) {
                    $this._deactivate(activeitem, false);
                }
            });
            
            this.rootList.find('> li.ui-menuitem > ul.ui-menu-child').on('mouseleave.ui-megamenu', function(e) {            
                e.stopPropagation();
            });
            
            $(document.body).on('click.' + this.id, function(e) {
                var target = $(e.target);
                if(target.data('primefaces-megamenu') === $this.id) {
                    return;
                }
                
                $this.active = false;
                $this._deactivate($this.rootList.children('li.ui-menuitem-active'), true);
            });
        },

        _unbindEvents: function() {
            this.rootLinks.off('mouseenter.ui-megamenu mouselave.ui-megamenu click.ui-megamenu');
            this.subLinks.off('mouseenter.ui-megamenu mouselave.ui-megamenu');
            this.rootList.off('mouseleave.ui-megamenu');
            this.rootList.find('> li.ui-menuitem > ul.ui-menu-child').off('mouseleave.ui-megamenu');
            $(document.body).off('click.' + this.id);
        },

        _isVertical: function () {
            if(this.options.orientation === 'vertical')
                return true;
            else
                return false;
        },

        _deactivate: function(menuitem, animate) {
            var link = menuitem.children('a.ui-menuitem-link'),
                submenu = link.next();

            menuitem.removeClass('ui-menuitem-active');
            link.removeClass('ui-state-hover');
            this.activeitem = null;

            if(submenu.length > 0) {
                if(animate)
                    submenu.fadeOut('fast');
                else
                    submenu.hide();
            }
        },

        _activate: function(menuitem) {
            var submenu = menuitem.children('.ui-megamenu-panel'),
                $this = this;

            $this._highlight(menuitem);

            if(submenu.length > 0) {
                $this._showSubmenu(menuitem, submenu);
            }
        },

        _highlight: function(menuitem) {
            var link = menuitem.children('a.ui-menuitem-link');

            menuitem.addClass('ui-menuitem-active');
            link.addClass('ui-state-hover');
            this.activeitem = menuitem;
        },

        _showSubmenu: function(menuitem, submenu) {
            var pos = null;

            if(this._isVertical()) {
                pos = {
                    my: 'left top',
                    at: 'right top',
                    of: menuitem,
                    collision: 'flipfit'
                };
            }
            else {
                pos = {
                    my: 'left top',
                    at: 'left bottom',
                    of: menuitem,
                    collision: 'flipfit'
                };
            }

            submenu.css({
                'z-index': ++PUI.zindex
            });

            submenu.show().position(pos);
        },

        _bindKeyEvents: function() {
            var $this = this;

            this.keyboardTarget.on('focus.ui-megamenu', function(e) {
                    $this._highlight($this.rootLinks.eq(0).parent());
                })
                .on('blur.ui-megamenu', function() {
                    $this._reset();
                })
                .on('keydown.ui-megamenu', function(e) {
                    var currentitem = $this.activeitem;
                    if(!currentitem) {
                        return;
                    }

                    var isRootLink = $this._isRootLink(currentitem),
                        keyCode = $.ui.keyCode;

                    switch(e.which) {
                        case keyCode.LEFT:
                            if(isRootLink && !$this._isVertical()) {
                                var prevItem = currentitem.prevAll('.ui-menuitem:first');
                                if(prevItem.length) {
                                    $this._deactivate(currentitem);
                                    $this._highlight(prevItem);
                                }

                                e.preventDefault();
                            }
                            else {
                                if(currentitem.hasClass('ui-menu-parent') && currentitem.children('.ui-menu-child').is(':visible')) {
                                    $this._deactivate(currentitem);
                                    $this._highlight(currentitem);
                                }
                                else {
                                    var parentItem = currentitem.closest('.ui-menu-child').parent();
                                    if(parentItem.length) {
                                        $this._deactivate(currentitem);
                                        $this._deactivate(parentItem);
                                        $this._highlight(parentItem);
                                    }
                                }
                            }
                            break;

                        case keyCode.RIGHT:
                            if(isRootLink && !$this._isVertical()) {
                                var nextItem = currentitem.nextAll('.ui-menuitem:visible:first');
                                if(nextItem.length) {
                                    $this._deactivate(currentitem);
                                    $this._highlight(nextItem);
                                }

                                e.preventDefault();
                            }
                            else {
                                if(currentitem.hasClass('ui-menu-parent')) {
                                    var submenu = currentitem.children('.ui-menu-child');
                                    if(submenu.is(':visible')) {
                                        $this._highlight(submenu.find('.ui-menu-list:visible > .ui-menuitem:visible:first'));
                                    }
                                    else {
                                        $this._activate(currentitem);
                                    }
                                }
                            }
                            break;

                        case keyCode.UP:
                            if(!isRootLink || $this._isVertical()) {
                                var prevItem = $this._findPrevItem(currentitem);
                                if(prevItem.length) {
                                    $this._deactivate(currentitem);
                                    $this._highlight(prevItem);
                                }
                            }

                            e.preventDefault();
                            break;

                        case keyCode.DOWN:
                            if(isRootLink && !$this._isVertical()) {
                                var submenu = currentitem.children('.ui-menu-child');
                                if(submenu.is(':visible')) {
                                    var firstMenulist = $this._getFirstMenuList(submenu);
                                    $this._highlight(firstMenulist.children('.ui-menuitem:visible:first'));
                                }
                                else {
                                    $this._activate(currentitem);
                                }
                            }
                            else {
                                var nextItem = $this._findNextItem(currentitem);
                                if(nextItem.length) {
                                    $this._deactivate(currentitem);
                                    $this._highlight(nextItem);
                                }
                            }

                            e.preventDefault();
                            break;

                        case keyCode.ENTER:
                        case keyCode.NUMPAD_ENTER:
                            var currentLink = currentitem.children('.ui-menuitem-link');
                            currentLink.trigger('click');
                            $this.element.blur();
                            var href = currentLink.attr('href');
                            if(href && href !== '#') {
                                window.location.href = href;
                            }
                            $this._deactivate(currentitem);
                            e.preventDefault();
                            break;

                        case keyCode.ESCAPE:
                            if(currentitem.hasClass('ui-menu-parent')) {
                                var submenu = currentitem.children('.ui-menu-list:visible');
                                if(submenu.length > 0) {
                                    submenu.hide();
                                }
                            }
                            else {
                                var parentItem = currentitem.closest('.ui-menu-child').parent();
                                if(parentItem.length) {
                                    $this._deactivate(currentitem);
                                    $this._deactivate(parentItem);
                                    $this._highlight(parentItem);
                                }
                            }
                            e.preventDefault();
                            break;
                    }
                });
        },

        _findPrevItem: function(menuitem) {
            var previtem = menuitem.prev('.ui-menuitem');

            if(!previtem.length) {
                var prevSubmenu = menuitem.closest('ul.ui-menu-list').prev('.ui-menu-list');

                if(!prevSubmenu.length) {
                    prevSubmenu = menuitem.closest('div').prev('div').children('.ui-menu-list:visible:last');
                }

                if(prevSubmenu.length) {
                    previtem = prevSubmenu.find('li.ui-menuitem:visible:last');
                }
            }
            return previtem;
        },

        _findNextItem: function(menuitem) {
            var nextitem = menuitem.next('.ui-menuitem');

            if(!nextitem.length) {
                var nextSubmenu = menuitem.closest('ul.ui-menu-list').next('.ui-menu-list');
                if(!nextSubmenu.length) {
                    nextSubmenu = menuitem.closest('div').next('div').children('.ui-menu-list:visible:first');
                }

                if(nextSubmenu.length) {
                    nextitem = nextSubmenu.find('li.ui-menuitem:visible:first');
                }
            }
            return nextitem;
        },

        _getFirstMenuList: function(submenu) {
            return submenu.find('.ui-menu-list:not(.ui-state-disabled):first');
        },

        _isRootLink: function(menuitem) {
            var submenu = menuitem.closest('ul');
            return submenu.parent().hasClass('ui-menu');
        },

        _reset: function() {
            var $this = this;
            this.active = false;

            this.element.find('li.ui-menuitem-active').each(function() {
                $this._deactivate($(this), true);
            });
        },
        
        isRootLink: function(menuitem) {
            var submenu = menuitem.closest('ul');
            return submenu.parent().hasClass('ui-menu');
        }

    });

    $.widget("primeui.puipanelmenu", $.primeui.puibasemenu, {

        options: {
            stateful: false,
            enhanced: false
        },

        _create: function() {
            this.id = this.element.attr('id');
            if(!this.id) {
                this.id = this.element.uniqueId().attr('id');
            }

            this.panels = this.element.children('div');

            this._render();

            this.headers = this.element.find('> .ui-panelmenu-panel > div.ui-panelmenu-header:not(.ui-state-disabled)');
            this.contents = this.element.find('> .ui-panelmenu-panel > .ui-panelmenu-content');
            this.menuitemLinks = this.contents.find('.ui-menuitem-link:not(.ui-state-disabled)');
            this.treeLinks = this.contents.find('.ui-menu-parent > .ui-menuitem-link:not(.ui-state-disabled)');

            this._bindEvents();

            if(this.options.stateful) {
                this.stateKey = 'panelMenu-' + this.id;
            }

            this._restoreState();
        },

        _render: function() {
            var $this = this;

            if(!this.options.enhanced) {
                this.element.addClass('ui-panelmenu ui-widget');
            }
            this.panels.addClass('ui-panelmenu-panel');

            this.element.find('li').each(function(){
                var listItem = $(this),
                    menuitemLink = listItem.children('a'),
                    icon = menuitemLink.data('icon');

                menuitemLink.addClass('ui-menuitem-link ui-corner-all')

                if($this.options.enhanced)
                    menuitemLink.children('span').addClass('ui-menuitem-text');
                else
                    menuitemLink.contents().wrap('<span class="ui-menuitem-text" />');

                if(icon) {
                    menuitemLink.prepend('<span class="ui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                }

                if(listItem.children('ul').length) {
                    listItem.addClass('ui-menu-parent');
                    menuitemLink.prepend('<span class="ui-panelmenu-icon fa fa-fw fa-caret-right"></span>');
                    listItem.children('ul').addClass('ui-helper-hidden');

                    if(icon) {
                        menuitemLink.addClass('ui-menuitem-link-hasicon');
                    }
                }

                listItem.addClass('ui-menuitem ui-widget ui-corner-all');
                listItem.parent().addClass('ui-menu-list ui-helper-reset');
            });

            //headers
            this.panels.children(':first-child').attr('tabindex', '0').each(function () {
                var header = $(this),
                    headerLink = header.children('a'),
                    icon = headerLink.data('icon');

                if(icon) {
                    headerLink.addClass('ui-panelmenu-headerlink-hasicon').prepend('<span class="ui-menuitem-icon fa fa-fw ' + icon + '"></span>');
                }

                header.addClass('ui-widget ui-panelmenu-header ui-state-default ui-corner-all').prepend('<span class="ui-panelmenu-icon fa fa-fw fa-caret-right"></span>');
            });

            //contents
            this.panels.children(':last-child').attr('tabindex', '0').addClass('ui-panelmenu-content ui-widget-content ui-helper-hidden');
        },

        _destroy: function() {
            var $this = this;
            this._unbindEvents();

            if(!this.options.enhanced) {
                this.element.removeClass('ui-panelmenu ui-widget');
            }

            this.panels.removeClass('ui-panelmenu-panel');
            this.headers.removeClass('ui-widget ui-panelmenu-header ui-state-default ui-state-hover ui-state-active ui-corner-all ui-corner-top').removeAttr('tabindex');
            this.contents.removeClass('ui-panelmenu-content ui-widget-content ui-helper-hidden').removeAttr('tabindex')
            this.contents.find('ul').removeClass('ui-menu-list ui-helper-reset ui-helper-hidden');

            this.headers.each(function () {
                var header = $(this),
                    headerLink = header.children('a');

                header.children('.fa').remove();
                headerLink.removeClass('ui-panelmenu-headerlink-hasicon');
                headerLink.children('.fa').remove();
            });

            this.element.find('li').each(function(){
                var listItem = $(this),
                    menuitemLink = listItem.children('a');

                menuitemLink.removeClass('ui-menuitem-link ui-corner-all ui-menuitem-link-hasicon');

                if($this.options.enhanced)
                    menuitemLink.children('span').removeClass('ui-menuitem-text');
                else
                    menuitemLink.contents().unwrap();

                menuitemLink.children('.fa').remove();

                listItem.removeClass('ui-menuitem ui-widget ui-corner-all ui-menu-parent')
                    .parent().removeClass('ui-menu-list ui-helper-reset ui-helper-hidden ');
            });
        },

        _unbindEvents: function() {
            this.headers.off('mouseover.ui-panelmenu mouseout.ui-panelmenu click.ui-panelmenu');
            this.menuitemLinks.off('mouseover.ui-panelmenu mouseout.ui-panelmenu click.ui-panelmenu');
            this.treeLinks.off('click.ui-panelmenu');
            this._unbindKeyEvents();
        },

        _bindEvents: function() {
            var $this = this;

            this.headers.on('mouseover.ui-panelmenu', function() {
                var element = $(this);
                if(!element.hasClass('ui-state-active')) {
                    element.addClass('ui-state-hover');
                }
            }).on('mouseout.ui-panelmenu', function() {
                var element = $(this);
                if(!element.hasClass('ui-state-active')) {
                    element.removeClass('ui-state-hover');
                }
            }).on('click.ui-panelmenu', function(e) {
                var header = $(this);

                if(header.hasClass('ui-state-active'))
                    $this._collapseRootSubmenu($(this));
                else
                    $this._expandRootSubmenu($(this), false);

                $this._removeFocusedItem();
                header.focus();
                e.preventDefault();
            });

            this.menuitemLinks.on('mouseover.ui-panelmenu', function() {
                $(this).addClass('ui-state-hover');
            }).on('mouseout.ui-panelmenu', function() {
                $(this).removeClass('ui-state-hover');
            }).on('click.ui-panelmenu', function(e) {
                var currentLink = $(this);
                $this._focusItem(currentLink.closest('.ui-menuitem'));

                var href = currentLink.attr('href');
                if(href && href !== '#') {
                    window.location.href = href;
                }
                e.preventDefault();
            });

            this.treeLinks.on('click.ui-panelmenu', function(e) {
                var link = $(this),
                    submenu = link.parent(),
                    submenuList = link.next();

                if(submenuList.is(':visible')) {
                    if(link.children('span.fa-caret-down').length) {
                        link.children('span.fa-caret-down').removeClass('fa-caret-down').addClass('fa-caret-right');
                    }
                    $this._collapseTreeItem(submenu);
                }
                else {
                    if(link.children('span.fa-caret-right').length) {
                        link.children('span.fa-caret-right').removeClass('fa-caret-right').addClass('fa-caret-down');
                    }

                    $this._expandTreeItem(submenu, false);
                }

                e.preventDefault();
            });

            this._bindKeyEvents();
        },

        _bindKeyEvents: function() {
            var $this = this;

            if(PUI.isIE()) {
                this.focusCheck = false;
            }

            this.headers.on('focus.panelmenu', function(){
                    $(this).addClass('ui-menuitem-outline');
                })
                .on('blur.panelmenu', function(){
                    $(this).removeClass('ui-menuitem-outline ui-state-hover');
                })
                .on('keydown.panelmenu', function(e) {
                    var keyCode = $.ui.keyCode,
                        key = e.which;

                    if(key === keyCode.SPACE || key === keyCode.ENTER || key === keyCode.NUMPAD_ENTER) {
                        $(this).trigger('click');
                        e.preventDefault();
                    }
                });

            this.contents.on('mousedown.panelmenu', function(e) {
                if($(e.target).is(':not(:input:enabled)')) {
                    e.preventDefault();
                }
            }).on('focus.panelmenu', function(){
                if(!$this.focusedItem) {
                    $this._focusItem($this._getFirstItemOfContent($(this)));
                    if(PUI.isIE()) {
                        $this.focusCheck = false;
                    }
                }
            }).on('keydown.panelmenu', function(e) {
                if(!$this.focusedItem) {
                    return;
                }

                var keyCode = $.ui.keyCode;

                switch(e.which) {
                    case keyCode.LEFT:
                        if($this._isExpanded($this.focusedItem)) {
                            $this.focusedItem.children('.ui-menuitem-link').trigger('click');
                        }
                        else {
                            var parentListOfItem = $this.focusedItem.closest('ul.ui-menu-list');

                            if(parentListOfItem.parent().is(':not(.ui-panelmenu-content)')) {
                                $this._focusItem(parentListOfItem.closest('li.ui-menuitem'));
                            }
                        }

                        e.preventDefault();
                        break;

                    case keyCode.RIGHT:
                        if($this.focusedItem.hasClass('ui-menu-parent') && !$this._isExpanded($this.focusedItem)) {
                            $this.focusedItem.children('.ui-menuitem-link').trigger('click');
                        }
                        e.preventDefault();
                        break;

                    case keyCode.UP:
                        var itemToFocus = null,
                            prevItem = $this.focusedItem.prev();

                        if(prevItem.length) {
                            itemToFocus = prevItem.find('li.ui-menuitem:visible:last');
                            if(!itemToFocus.length) {
                                itemToFocus = prevItem;
                            }
                        }
                        else {
                            itemToFocus = $this.focusedItem.closest('ul').parent('li');
                        }

                        if(itemToFocus.length) {
                            $this._focusItem(itemToFocus);
                        }

                        e.preventDefault();
                        break;

                    case keyCode.DOWN:
                        var itemToFocus = null,
                            firstVisibleChildItem = $this.focusedItem.find('> ul > li:visible:first');

                        if(firstVisibleChildItem.length) {
                            itemToFocus = firstVisibleChildItem;
                        }
                        else if($this.focusedItem.next().length) {
                            itemToFocus = $this.focusedItem.next();
                        }
                        else {
                            if($this.focusedItem.next().length === 0) {
                                itemToFocus = $this._searchDown($this.focusedItem);
                            }
                        }

                        if(itemToFocus && itemToFocus.length) {
                            $this._focusItem(itemToFocus);
                        }

                        e.preventDefault();
                        break;

                    case keyCode.ENTER:
                    case keyCode.NUMPAD_ENTER:
                    case keyCode.SPACE:
                        var currentLink = $this.focusedItem.children('.ui-menuitem-link');
                        //IE fix
                        setTimeout(function(){
                            currentLink.trigger('click');
                        },1);
                        $this.element.blur();

                        var href = currentLink.attr('href');
                        if(href && href !== '#') {
                            window.location.href = href;
                        }
                        e.preventDefault();
                        break;

                    case keyCode.TAB:
                        if($this.focusedItem) {
                            if(PUI.isIE()) {
                                $this.focusCheck = true;
                            }
                            $(this).focus();
                        }
                        break;
                }
            }).on('blur.panelmenu', function(e) {
                if(PUI.isIE() && !$this.focusCheck) {
                    return;
                }

                $this._removeFocusedItem();
            });

            var clickNS = 'click.' + this.id;
            //remove focusedItem when document is clicked
            $(document.body).off(clickNS).on(clickNS, function(event) {
                if(!$(event.target).closest('.ui-panelmenu').length) {
                    $this._removeFocusedItem();
                }
            });
        },

        _unbindKeyEvents: function() {
            this.headers.off('focus.panelmenu blur.panelmenu keydown.panelmenu');
            this.contents.off('mousedown.panelmenu focus.panelmenu keydown.panelmenu blur.panelmenu');
            $(document.body).off('click.' + this.id);
        },

        _isExpanded: function(item) {
            return item.children('ul.ui-menu-list').is(':visible');
        },

        _searchDown: function(item) {
            var nextOfParent = item.closest('ul').parent('li').next(),
                itemToFocus = null;

            if(nextOfParent.length) {
                itemToFocus = nextOfParent;
            }
            else if(item.closest('ul').parent('li').length === 0){
                itemToFocus = item;
            }
            else {
                itemToFocus = this._searchDown(item.closest('ul').parent('li'));
            }

            return itemToFocus;
        },

        _getFirstItemOfContent: function(content) {
            return content.find('> .ui-menu-list > .ui-menuitem:visible:first-child');
        },

        _collapseRootSubmenu: function(header) {
            var panel = header.next();

            header.attr('aria-expanded', false).removeClass('ui-state-active ui-corner-top').addClass('ui-state-hover ui-corner-all');
            header.children('span.fa').removeClass('fa-caret-down').addClass('fa-caret-right');
            panel.attr('aria-hidden', true).slideUp('normal', 'easeInOutCirc');

            this._removeAsExpanded(panel);
        },

        _expandRootSubmenu: function(header, restoring) {
            var panel = header.next();

            header.attr('aria-expanded', true).addClass('ui-state-active ui-corner-top').removeClass('ui-state-hover ui-corner-all');
            header.children('span.fa').removeClass('fa-caret-right').addClass('fa-caret-down');

            if(restoring) {
                panel.attr('aria-hidden', false).show();
            }
            else {
                panel.attr('aria-hidden', false).slideDown('normal', 'easeInOutCirc');

                this._addAsExpanded(panel);
            }
        },

        _restoreState: function() {
            var expandedNodeIds = null;

            if(this.options.stateful) {
                expandedNodeIds = PUI.getCookie(this.stateKey);
            }

            if(expandedNodeIds) {
                this._collapseAll();
                this.expandedNodes = expandedNodeIds.split(',');

                for(var i = 0 ; i < this.expandedNodes.length; i++) {
                    var element = $(PUI.escapeClientId(this.expandedNodes[i]));
                    if(element.is('div.ui-panelmenu-content'))
                        this._expandRootSubmenu(element.prev(), true);
                    else if(element.is('li.ui-menu-parent'))
                        this._expandTreeItem(element, true);
                }
            }
            else {
                this.expandedNodes = [];
                var activeHeaders = this.headers.filter('.ui-state-active'),
                    activeTreeSubmenus = this.element.find('.ui-menu-parent > .ui-menu-list:not(.ui-helper-hidden)');

                for(var i = 0; i < activeHeaders.length; i++) {
                    this.expandedNodes.push(activeHeaders.eq(i).next().attr('id'));
                }

                for(var i = 0; i < activeTreeSubmenus.length; i++) {
                    this.expandedNodes.push(activeTreeSubmenus.eq(i).parent().attr('id'));
                }
            }
        },

        _collapseAll: function() {
            this.headers.filter('.ui-state-active').each(function() {
                var header = $(this);
                header.removeClass('ui-state-active').next().addClass('ui-helper-hidden');
            });

            this.element.find('.ui-menu-parent > .ui-menu-list:not(.ui-helper-hidden)').each(function() {
                $(this).addClass('ui-helper-hidden');
            });
        },

        _removeAsExpanded: function(element) {
            var id = element.attr('id');

            this.expandedNodes = $.grep(this.expandedNodes, function(value) {
                return value != id;
            });

            this._saveState();
        },

        _addAsExpanded: function(element) {
            this.expandedNodes.push(element.attr('id'));

            this._saveState();
        },

        _removeFocusedItem: function() {
            if(this.focusedItem) {
                this._getItemText(this.focusedItem).removeClass('ui-menuitem-outline');
                this.focusedItem = null;
            }
        },

        _focusItem: function(item) {
            this._removeFocusedItem();
            this._getItemText(item).addClass('ui-menuitem-outline').focus();
            this.focusedItem = item;
        },

        _getItemText: function(item) {
            return item.find('> .ui-menuitem-link > span.ui-menuitem-text');
        },

        _expandTreeItem: function(submenu, restoring) {
            var submenuLink = submenu.find('> .ui-menuitem-link');

            submenuLink.find('> .ui-menuitem-text').attr('aria-expanded', true);
            submenu.children('.ui-menu-list').show();

            if(!restoring) {
                this._addAsExpanded(submenu);
            }
        },

        _collapseTreeItem: function(submenu) {
            var submenuLink = submenu.find('> .ui-menuitem-link');

            submenuLink.find('> .ui-menuitem-text').attr('aria-expanded', false);
            submenu.children('.ui-menu-list').hide();

            this._removeAsExpanded(submenu);
        },

        _removeAsExpanded: function(element) {
            var id = element.attr('id');

            this.expandedNodes = $.grep(this.expandedNodes, function(value) {
                return value != id;
            });

            this._saveState();
        },

        _addAsExpanded: function(element) {
            this.expandedNodes.push(element.attr('id'));

            this._saveState();
        },

        _saveState: function() {
            if(this.options.stateful) {
                var expandedNodeIds = this.expandedNodes.join(',');

                PUI.setCookie(this.stateKey, expandedNodeIds, {path:'/'});
            }
        },

        _clearState: function() {
            if(this.options.stateful) {
                PUI.deleteCookie(this.stateKey, {path:'/'});
            }
        }

    });

}));
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    $.widget("primeui.puicolresize", {

        options: {
            mode: 'fit'
        },

        _create: function() {
            this.element.addClass('ui-datatable-resizable');
            this.thead = this.element.find('> .ui-datatable-tablewrapper > table > thead');
            this.thead.find('> tr > th').addClass('ui-resizable-column');
            this.resizerHelper = $('<div class="ui-column-resizer-helper ui-state-highlight"></div>').appendTo(this.element);
            this.addResizers();

            var resizers = this.thead.find('> tr > th > span.ui-column-resizer'),
            $this = this;

            setTimeout(function() {
                $this.fixColumnWidths();
            }, 5);

            resizers.draggable({
                axis: 'x',
                start: function(event, ui) {
                    ui.helper.data('originalposition', ui.helper.offset());

                    var height = $this.options.scrollable ? $this.scrollBody.height() : $this.thead.parent().height() - $this.thead.height() - 1;
                    $this.resizerHelper.height(height);
                    $this.resizerHelper.show();
                },
                drag: function(event, ui) {
                    $this.resizerHelper.offset({
                        left: ui.helper.offset().left + ui.helper.width() / 2,
                        top: $this.thead.offset().top + $this.thead.height()
                    });
                },
                stop: function(event, ui) {
                    ui.helper.css({
                        'left': '',
                        'top': '0px',
                        'right': '0px'
                    });

                    $this.resize(event, ui);
                    $this.resizerHelper.hide();

                    if($this.options.mode === 'expand') {
                        setTimeout(function() {
                            $this._trigger('colResize', null, {element: ui.helper.parent().get(0)});
                        }, 5);
                    }
                    else {
                        $this._trigger('colResize', null, {element: ui.helper.parent().get(0)});
                    }
                },
                containment: this.element
            });
        },

        resize: function(event, ui) {
            var columnHeader, nextColumnHeader, change = null, newWidth = null, nextColumnWidth = null,
            expandMode = (this.options.mode === 'expand'),
            table = this.thead.parent(),
            columnHeader = ui.helper.parent(),
            nextColumnHeader = columnHeader.next();

            change = (ui.position.left - ui.originalPosition.left),
            newWidth = (columnHeader.width() + change),
            nextColumnWidth = (nextColumnHeader.width() - change);

            if((newWidth > 15 && nextColumnWidth > 15) || (expandMode && newWidth > 15)) {
                if(expandMode) {
                    table.width(table.width() + change);
                    setTimeout(function() {
                        columnHeader.width(newWidth);
                    }, 1);
                }
                else {
                    columnHeader.width(newWidth);
                    nextColumnHeader.width(nextColumnWidth);
                }
            }
        },

        addResizers: function() {
            var resizableColumns = this.thead.find('> tr > th.ui-resizable-column');
            resizableColumns.prepend('<span class="ui-column-resizer">&nbsp;</span>');

            if(this.options.columnResizeMode === 'fit') {
                resizableColumns.filter(':last-child').children('span.ui-column-resizer').hide();
            }
        },

        fixColumnWidths: function() {
            if(!this.columnWidthsFixed) {
                this.element.find('> .ui-datatable-tablewrapper > table > thead > tr > th').each(function() {
                    var col = $(this);
                    col.width(col.width());
                });

                this.columnWidthsFixed = true;
            }
        },

        _destroy: function() {
            this.element.removeClass('ui-datatable-resizable');
            this.thead.find('> tr > th').removeClass('ui-resizable-column');
            this.resizerHelper.remove();
            this.thead.find('> tr > th > span.ui-column-resizer').draggable('destroy').remove();
        }
    });

    $.widget("primeui.puicolreorder", {

        _create: function() {
            var $this = this;

            this.thead = this.element.find('> .ui-datatable-tablewrapper > table > thead');
            this.tbody = this.element.find('> .ui-datatable-tablewrapper > table > tbody');
            this.dragIndicatorTop = $('<span class="fa fa-arrow-down" style="position:absolute"/></span>').hide().appendTo(this.element);
            this.dragIndicatorBottom = $('<span class="fa fa-arrow-up" style="position:absolute"/></span>').hide().appendTo(this.element);

            this.thead.find('> tr > th').draggable({
                appendTo: 'body',
                opacity: 0.75,
                cursor: 'move',
                scope: this.id,
                cancel: ':input,.ui-column-resizer',
                drag: function(event, ui) {
                    var droppable = ui.helper.data('droppable-column');

                    if(droppable) {
                        var droppableOffset = droppable.offset(),
                            topArrowY = droppableOffset.top - 10,
                            bottomArrowY = droppableOffset.top + droppable.height() + 8,
                            arrowX = null;

                        //calculate coordinates of arrow depending on mouse location
                        if(event.originalEvent.pageX >= droppableOffset.left + (droppable.width() / 2)) {
                            var nextDroppable = droppable.next();
                            if(nextDroppable.length == 1)
                                arrowX = nextDroppable.offset().left - 9;
                            else
                                arrowX = droppable.offset().left + droppable.innerWidth() - 9;

                            ui.helper.data('drop-location', 1);     //right
                        }
                        else {
                            arrowX = droppableOffset.left  - 9;
                            ui.helper.data('drop-location', -1);    //left
                        }

                        $this.dragIndicatorTop.offset({
                            'left': arrowX,
                            'top': topArrowY - 3
                        }).show();

                        $this.dragIndicatorBottom.offset({
                            'left': arrowX,
                            'top': bottomArrowY - 3
                        }).show();
                    }
                },
                stop: function(event, ui) {
                    //hide dnd arrows
                    $this.dragIndicatorTop.css({
                        'left':0,
                        'top':0
                    }).hide();

                    $this.dragIndicatorBottom.css({
                        'left':0,
                        'top':0
                    }).hide();
                },
                helper: function() {
                    var header = $(this),
                    helper = $('<div class="ui-widget ui-state-default" style="padding:4px 10px;text-align:center;"></div>');

                    helper.width(header.width());
                    helper.height(header.height());

                    helper.html(header.html());

                    return helper.get(0);
                }
            })
            .droppable({
                hoverClass:'ui-state-highlight',
                tolerance:'pointer',
                scope: this.id,
                over: function(event, ui) {
                    ui.helper.data('droppable-column', $(this));
                },
                drop: function(event, ui) {
                    var draggedColumnHeader = ui.draggable,
                        droppedColumnHeader =  $(this),
                        dropLocation = ui.helper.data('drop-location');

                    $this._trigger('colReorder', null, {
                        dragIndex: draggedColumnHeader.index(),
                        dropIndex: droppedColumnHeader.index(),
                        dropSide: dropLocation
                    });
                }
            });
        },

        _destroy: function() {
            this.dragIndicatorTop.remove();
            this.dragIndicatorBottom.remove();
            this.thead.find('> tr > th').draggable('destroy').droppable('destroy');
        }
    });

    $.widget("primeui.puitablescroll", {

        options: {
            scrollHeight: null,
            scrollWidth: null
        },

        _create: function() {
            this.id = PUI.generateRandomId();
            this.scrollHeader = this.element.children('.ui-datatable-scrollable-header');
            this.scrollBody = this.element.children('.ui-datatable-scrollable-body');
            this.scrollFooter = this.element.children('.ui-datatable-scrollable-footer');
            this.scrollHeaderBox = this.scrollHeader.children('.ui-datatable-scrollable-header-box');
            this.bodyTable = this.scrollBody.children('table');
            this.percentageScrollHeight = this.options.scrollHeight && (this.options.scrollHeight.indexOf('%') !== -1);
            this.percentageScrollWidth = this.options.scrollWidth && (this.options.scrollWidth.indexOf('%') !== -1);
            var $this = this,
                scrollBarWidth = this.getScrollbarWidth() + 'px';

            if(this.options.scrollHeight) {
                if(this.percentageScrollHeight)
                    this.adjustScrollHeight();
                else
                    this.scrollBody.css('max-height', this.options.scrollHeight + 'px');

                this.scrollHeaderBox.css('margin-right', scrollBarWidth);
            }

            if(this.options.scrollWidth) {
                if(this.percentageScrollWidth)
                    this.adjustScrollWidth();
                else
                    this.setScrollWidth(parseInt(this.options.scrollWidth));
            }

            this.scrollBody.on('scroll.dataTable', function() {
                var scrollLeft = $this.scrollBody.scrollLeft();
                $this.scrollHeaderBox.css('margin-left', -scrollLeft);
            });

            this.scrollHeader.on('scroll.dataTable', function() {
                $this.scrollHeader.scrollLeft(0);
            });

            $(window).on('resize.' + this.id, function() {
                if($this.element.is(':visible')) {
                    if($this.percentageScrollHeight)
                        $this.adjustScrollHeight();

                    if($this.percentageScrollWidth)
                        $this.adjustScrollWidth();
                }
            });
        },

        _destroy: function() {
            $(window).off('resize.' + this.id);
            this.scrollHeader.off('scroll.dataTable');
            this.scrollBody.off('scroll.dataTable');
        },

        adjustScrollHeight: function() {
            var relativeHeight = this.element.parent().parent().innerHeight() * (parseInt(this.options.scrollHeight) / 100),
                tableHeaderHeight = this.element.children('.ui-datatable-header').outerHeight(true),
                tableFooterHeight = this.element.children('.ui-datatable-footer').outerHeight(true),
                scrollersHeight = (this.scrollHeader.outerHeight(true) + this.scrollFooter.outerHeight(true)),
                paginatorsHeight = this.paginator ? this.paginator.getContainerHeight(true) : 0,
                height = (relativeHeight - (scrollersHeight + paginatorsHeight + tableHeaderHeight + tableFooterHeight));

            this.scrollBody.css('max-height', height + 'px');
        },

        adjustScrollWidth: function() {
            var width = parseInt((this.element.parent().parent().innerWidth() * (parseInt(this.options.scrollWidth) / 100)));
            this.setScrollWidth(width);
        },

        setOuterWidth: function(element, width) {
            var diff = element.outerWidth() - element.width();
            element.width(width - diff);
        },

        setScrollWidth: function(width) {
            var $this = this;
            this.element.children('.ui-widget-header').each(function() {
                $this.setOuterWidth($(this), width);
            });
            this.scrollHeader.width(width);
            this.scrollBody.css('margin-right', 0).width(width);
        },

        getScrollbarWidth: function() {
            if(!this.scrollbarWidth) {
                this.scrollbarWidth = PUI.calculateScrollbarWidth();
            }

            return this.scrollbarWidth;
        }
    });

}));
