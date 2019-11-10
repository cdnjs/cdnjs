/*!
    photobox v1.9.1
    (c) 2013 Yair Even Or <http://dropthebit.com>

    MIT-style license.
*/



(function($, doc, win){
    "use strict";

    var Photobox, photobox, options, images=[], imageLinks, activeImage = -1, activeURL, lastActive, activeType, prevImage, nextImage, thumbsStripe, docElm, APControl, changeImage,
        transitionend = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
        isOldIE = !('placeholder' in doc.createElement('input')),
        noPointerEvents = (function(){ var el = $('<p>')[0]; el.style.cssText = 'pointer-events:auto'; return !el.style.pointerEvents})(),
        isMobile = 'ontouchend' in doc, // should be updated to something that detects the lack of a mouse
        thumbsContainerWidth, thumbsTotalWidth, activeThumb = $(),
        blankImg = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
        transformOrigin = getPrefixed('transformOrigin'),
        transition = getPrefixed('transition'),
          // Normalize rAF
        raf = window.requestAnimationFrame
           || window.webkitRequestAnimationFrame
           || window.mozRequestAnimationFrame
           || window.msRequestAnimationFrame
           || function(cb) { return window.setTimeout(cb, 1000 / 60); },

        // Preload images
        preload = {}, preloadPrev = new Image(), preloadNext = new Image(),
        // DOM elements
        closeBtn, image, video, prevBtn, nextBtn, thumbsToggler, caption, captionText, pbLoader, autoplayBtn, thumbs, wrapper,

        defaults = {
            single        : false,   // if "true" - gallery will only show a single image, with no way to navigate
            beforeShow    : null,    // Callback before showing an image
            afterClose    : null,    // Callback after closing the gallery
            loop          : true,    // Allows to navigate between first and last images
            thumb         : null,    // A relative path from the link to the thumbnail (if it's not inside the link)
            thumbs        : true,    // Show gallery thumbnails below the presented photo
            counter       : "(A/B)", // Counts which piece of content is being viewed, relative to the total count of items in the photobox set. ["false","String"]
            title         : true,    // show the original alt or title attribute of the image's thumbnail. (path to image, relative to the element which triggers photobox)
            autoplay      : false,   // should autoplay on first time or not
            time          : 3000,    // autoplay interval, in miliseconds (less than 1000 will hide the autoplay button)
            history       : true,    // should use history hashing if possible (HTML5 API)
            hideFlash     : true,    // Hides flash elements on the page when photobox is activated. NOTE: flash elements must have wmode parameter set to "opaque" or "transparent" if this is set to false
            zoomable      : true,    // disable/enable mousewheel image zooming
            wheelNextPrev : true,    // change image using mousewheel left/right
            keys          : {
                close : '27, 88, 67',    // keycodes to close photobox, default: esc (27), 'x' (88), 'c' (67)
                prev  : '37, 80',        // keycodes to navigate to the previous image, default: Left arrow (37), 'p' (80)
                next  : '39, 78'         // keycodes to navigate to the next image, default: Right arrow (39), 'n' (78)
            }
        },

        // DOM structure
        overlay =   $('<div id="pbOverlay">').append(
                        thumbsToggler = $('<input type="checkbox" id="pbThumbsToggler" checked hidden>'),
                        pbLoader = $('<div class="pbLoader"><b></b><b></b><b></b></div>'),
                        prevBtn = $('<div id="pbPrevBtn" class="prevNext"><b></b></div>').on('click', next_prev),
                        nextBtn = $('<div id="pbNextBtn" class="prevNext"><b></b></div>').on('click', next_prev),
                        wrapper = $('<div class="pbWrapper">').append(  // gives Perspective
                            image = $('<img>'),
                            video = $('<div>')
                        ),
                        closeBtn = $('<div id="pbCloseBtn">').on('click', close)[0],
                        autoplayBtn = $('<div id="pbAutoplayBtn">').append(
                            $('<div class="pbProgress">')
                        ),
                        caption = $('<div id="pbCaption">').append(
                            '<label for="pbThumbsToggler" title="thumbnails on/off"></label>',
                            captionText = $('<div class="pbCaptionText">').append('<div class="title"></div><div class="counter">'),
                            thumbs = $('<div>').addClass('pbThumbs')
                        )
                    );
    /*---------------------------------------------------------------
        Initialization (on DOM ready)
    */
    function prepareDOM(){
        noPointerEvents && overlay.hide();

        autoplayBtn.off().on('click', APControl.toggle);
        // attach a delegated event on the thumbs container
        thumbs.off().on('click', 'a', thumbsStripe.click);
        // if useragent is IE < 10 (user deserves a slap on the face, but I gotta support them still...)
        isOldIE && overlay.addClass('msie');
        isMobile && overlay.addClass('mobile');

        // cancel prorogation up to the overlay container so it won't close
        overlay.off().on('click', 'img', function(e){
            e.stopPropagation();
        });

        $(doc.body).append(overlay);

        // need this for later:
        docElm = doc.documentElement;
    }

    // @param [List of elements to work on, Custom settings, Callback after image is loaded]
    $.fn.photobox = function(target, settings, callback){
        return this.each(function(){
            var o,
                PB_data = $(this).data('_photobox');

            if( PB_data ){ // don't initiate the plugin more than once on the same element
                if( target === 'destroy')
                    PB_data.destroy();

                return this;
            }

            if( typeof target != 'string' )
                target = 'a';

            if( target === 'prepareDOM' ){
                prepareDOM();
                return this;
            }

            o = $.extend({}, defaults, settings || {});
            photobox = new Photobox(o, this, target);

            // Saves the insance on the gallery's target element
            $(this).data('_photobox', photobox);
            // add a callback to the specific gallery
            photobox.callback = callback;
        });
    }

    Photobox = function(_options, object, target){
        this.options = $.extend({}, _options);
        this.target = target;
        this.selector = $(object || doc);

        this.thumbsList = null;
        // filter the links which actually HAS an image as a child
        var filtered = this.imageLinksFilter( this.selector.find(target) );

        this.imageLinks = filtered[0];  // Array of jQuery links
        this.images = filtered[1];      // 2D Array of image URL & title
        this.init();
    };

    Photobox.prototype = {
        init : function(){
            var that = this;

            // only generates the thumbStripe once, and listen for any DOM changes on the selector element, if so, re-generate
            // This is done on "mouseenter" so images will not get called unless it's liekly that they would be needed
            this.selector.one('mouseenter.photobox', this.target, function(e){
                that.thumbsList = thumbsStripe.generate.apply(that);
            });

            this.selector.on('click.photobox', this.target, function(e){
                e.preventDefault();
                that.open(this);
            });

            // if any node was added or removed from the Selector of the gallery
            this.observerTimeout = null;

            if( this.selector[0].nodeType == 1 ) // observe normal nodes
                that.observeDOM( that.selector[0], function(){
                    // use a timeout to prevent more than one DOM change event firing at once, and also to overcome the fact that IE's DOMNodeRemoved is fired BEFORE elements were actually removed
                    clearTimeout(that.observerTimeout);
                    that.observerTimeout = setTimeout( function(){
                        var filtered = that.imageLinksFilter( that.selector.find(that.target) ),
                            activeIndex = 0,
                            isActiveUrl = false,
                            i;

                        // Make sure that ONLY DOM changes in the photobox number of items will trigger a change
                        if(that.imageLinks.length == filtered[0].length)
                            return;

                        that.imageLinks = filtered[0];
                        that.images = filtered[1];

                        // if photobox is opened
                        if( photobox ){
                            // if gallery which was changed is the currently viewed one:
                            if( that.selector == photobox.selector ){
                                images = that.images;
                                imageLinks = that.imageLinks;
                                // check if the currently VIEWED photo has been de-tached from a photobox set
                                // if so, remove navigation arrows
                                // TODO: fix the "images" to be an object and not an array.
                                for( i = images.length; i--; ){
                                    if( images[i][0] == activeURL )
                                        isActiveUrl = true;
                                    // if not exits any more
                                }
                                if( isActiveUrl )
                                    overlay.removeClass('hasArrows');
                            }
                        }

                        // if this gallery has thumbs
                        //if( that.options.thumbs ){
                            that.thumbsList = thumbsStripe.generate.apply(that);
                            thumbs.html( that.thumbsList );
                        //}

                        if( that.images.length && activeURL && that.options.thumbs ){
                            activeIndex = that.thumbsList.find('a[href="'+activeURL+'"]').eq(0).parent().index();

                            if( activeIndex == -1 )
                                activeIndex = 0;

                            updateIndexes(activeIndex);
                            thumbsStripe.changeActive(activeIndex, 0);
                        }
                    }, 50);
                });
        },

        open : function(link){
            var startImage = $.inArray(link, this.imageLinks);
            // if image link does not exist in the imageLinks array (probably means it's not a valid part of the gallery)
            if( startImage == -1 )
                return false;

            // load the right gallery selector...
            options = this.options;
            images = this.images;
            imageLinks = this.imageLinks;

            photobox = this;
            this.setup(1);

            overlay.on(transitionend, function(){
                overlay.off(transitionend).addClass('on'); // class 'on' is set when the initial fade-in of the overlay is done
                changeImage(startImage, true);
            }).addClass('show');

            if( isOldIE )
                overlay.trigger('MSTransitionEnd');

            return false;
        },

        imageLinksFilter : function(obj){
            var that = this,
                images = [],
                caption = {},
                captionlink;

            return [obj.filter(function(i){
                // search for the thumb inside the link, if not found then see if there's a 'that.settings.thumb' pointer to the thumbnail
                var link = $(this),
                    thumbImg,
                    thumbSrc = '';

                caption.content = link[0].getAttribute('title') || '';

                if( that.options.thumb )
                    thumbImg = link.find(that.options.thumb)[0];

                // try a direct child lookup
                if( !that.options.thumb || !thumbImg )
                    thumbImg = link.find('img')[0];

                // if no img child found in the link
                if( thumbImg ){
                    captionlink = thumbImg.getAttribute('data-pb-captionlink');
                    thumbSrc = thumbImg.getAttribute('src');

                    caption.content = ( thumbImg.getAttribute('alt') || thumbImg.getAttribute('title') || '');
                }


                // if there is a caption link to be added:
                if( captionlink ){
                    captionlink = captionlink.split('[');
                    // parse complex links: text[www.site.com]
                    if( captionlink.length == 2 ){
                        caption.linkText = captionlink[0];
                        caption.linkHref = captionlink[1].slice(0,-1);
                    }
                    else{
                        caption.linkText = captionlink;
                        caption.linkHref = captionlink;
                    }
                    caption.content += ' <a href="'+ caption.linkHref +'">' + caption.linkText + '</a>';
                }

                images.push( [link[0].href, caption.content, thumbSrc] );

                return true;
            }), images];
        },

        //check if DOM nodes were added or removed, to re-build the imageLinks and thumbnails
        observeDOM : (function(){
            var MutationObserver = win.MutationObserver || win.WebKitMutationObserver,
                eventListenerSupported = win.addEventListener;

            return function(obj, callback){
                if( MutationObserver ){
                    // define a new observer
                    var obs = new MutationObserver(function(mutations, observer){
                        if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                            callback();
                    });
                    // have the observer observe foo for changes in children
                    obs.observe( obj, { childList:true, subtree:true });
                }
                else if( eventListenerSupported ){
                    obj.addEventListener('DOMNodeInserted', callback, false);
                    obj.addEventListener('DOMNodeRemoved', callback, false);
                }
            }
        })(),

        // things that should happen every time the gallery opens or closes (some messed up code below..)
        setup : function (open){
            var fn = open ? "on" : "off";

            // a hack to change the image src to nothing, because you can't do that in CHROME
            image[0].src = blankImg;

            // thumbs stuff
            if( options.thumbs ){
                if( !isMobile ){
                    thumbs[fn]('mouseenter.photobox', thumbsStripe.calc)
                          [fn]('mousemove.photobox', thumbsStripe.move);
                }
            }

            if( open ){
                image.css({'transition':'0s'}).removeAttr('style'); // reset any transition that might be on the element (yes it's ugly)
                overlay.show();
                // Clean up if another gallery was viewed before, which had a thumbsList
                thumbs
                    .html( this.thumbsList )
                    .trigger('mouseenter.photobox');

                if( options.thumbs ){
                    overlay.addClass('thumbs');
                }
                else{
                    thumbsToggler.prop('checked', false);
                    overlay.removeClass('thumbs');
                }

                // things to hide if there are less than 2 images
                if( this.images.length < 2 ||  options.single )
                    overlay.removeClass('thumbs hasArrows hasCounter hasAutoplay');
                else{
                    overlay.addClass('hasArrows hasCounter')

                    // check is the autoplay button should be visible (per gallery) and if so, should it autoplay or not.
                    if( options.time > 1000 ){
                        overlay.addClass('hasAutoplay');
                        if( options.autoplay )
                            APControl.progress.start();
                        else
                            APControl.pause();
                    }
                    else
                        overlay.removeClass('hasAutoplay');
                }

                options.hideFlash && $('iframe, object, embed').css('visibility', 'hidden');

            } else {
                $(win).off('resize.photobox');
            }

            $(doc).off("keydown.photobox")[fn]({ "keydown.photobox": keyDown });

            if( isMobile ){
                overlay.removeClass('hasArrows'); // no need for Arrows on touch-enabled
                wrapper[fn]('swipe', onSwipe);
            }

            if( options.zoomable ){
                overlay[fn]({"mousewheel.photobox": scrollZoom });
                if( !isOldIE) thumbs[fn]({"mousewheel.photobox": thumbsResize });
            }

            if( !options.single && options.wheelNextPrev ){
                overlay[fn]({"mousewheel.photobox": wheelNextPrev });
            }
        },

        destroy : function(){
            options = this.options;
            this.selector
                .off('click.photobox', this.target)
                .removeData('_photobox');

            close();
        }
    }

    // on touch-devices only
    function onSwipe(e, Dx, Dy){
        if( Dx == 1 ){
            image.css({transform:'translateX(25%)', transition:'.2s', opacity:0});
            setTimeout(function(){ changeImage(prevImage) }, 200);
        }
        else if( Dx == -1 ){
            image.css({transform:'translateX(-25%)', transition:'.2s', opacity:0});
            setTimeout(function(){ changeImage(nextImage) }, 200);
        }

        if( Dy == 1 )
            thumbsToggler.prop('checked', true);
        else if( Dy == -1 )
            thumbsToggler.prop('checked', false);
    }

    // manage the (bottom) thumbs strip
    thumbsStripe = (function(){
        var containerWidth   = 0,
            scrollWidth      = 0,
            posFromLeft      = 0,    // Stripe position from the left of the screen
            stripePos        = 0,    // When relative mouse position inside the thumbs stripe
            animated         = null,
            padding,                 // in percentage to the containerWidth
            el, $el, ratio, scrollPos, pos;

        return{
            // returns a <ul> element which is populated with all the gallery links and thumbs
            generate : function(){
                var thumbsList = $('<ul>'),
                    elements   = [],
                    len        = this.imageLinks.size(),
                    title, thumbSrc, link, type, i;

                for( i = 0; i < len; i++ ){
                    link = this.imageLinks[i];

                    thumbSrc = this.images[i][2];
                    // continue if has thumb
                    if( !thumbSrc )
                        continue;

                    title = this.images[i][1];
                    type = link.rel ? " class='" + link.rel +"'" : '';
                    elements.push('<li'+ type +'><a href="'+ link.href +'"><img src="'+ thumbSrc +'" alt="" title="'+ title +'" /></a></li>');
                };
                thumbsList.html( elements.join('') );
                return thumbsList;
            },

            click : function(e){
                e.preventDefault();

                activeThumb.removeClass('active');
                activeThumb = $(this).parent().addClass('active');

                var imageIndex = $(this.parentNode).index();
                return changeImage(imageIndex, 0, 1);
            },

            changeActiveTimeout : null,
            /** Highlights the thumb which represents the photo and centres the thumbs viewer on it.
            **  @thumbClick - if a user clicked on a thumbnail, don't center on it
            */
            changeActive : function(index, delay, thumbClick){
                var lastIndex = activeThumb.index();
                activeThumb.removeClass('active');
                activeThumb = thumbs.find('li').eq(index).addClass('active');

                if( thumbClick || !activeThumb[0] ) return;
                // set the scrollLeft position of the thumbs list to show the active thumb
                clearTimeout(this.changeActiveTimeout);
                // give the images time to to settle on their new sizes (because of css transition) and then calculate the center...
                this.changeActiveTimeout = setTimeout(
                    function(){
                        var pos = activeThumb[0].offsetLeft + activeThumb[0].clientWidth/2 - docElm.clientWidth/2;
                        delay ? thumbs.delay(800) : thumbs.stop();
                        thumbs.animate({scrollLeft: pos}, 500, 'swing');
                    }, 200);
            },

            // calculate the thumbs container width, if the window has been resized
            calc : function(e){
                el = thumbs[0];

                containerWidth       = el.clientWidth;
                scrollWidth          = el.scrollWidth;
                padding              = 0.15 * containerWidth;

                posFromLeft          = thumbs.offset().left;
                stripePos            = e.pageX - padding - posFromLeft;
                pos                  = stripePos / (containerWidth - padding*2);
                scrollPos            = (scrollWidth - containerWidth ) * pos;

                thumbs.animate({scrollLeft:scrollPos}, 200);

                clearTimeout(animated);
                animated = setTimeout(function(){
                    animated = null;
                }, 200);

                return this;
            },

            // move the stripe left or right according to mouse position
            move : function(e){
                // don't move anything until initial movement on 'mouseenter' has finished
                if( animated ) return;

                var ratio     = scrollWidth / containerWidth,
                    stripePos = e.pageX - padding - posFromLeft, // the mouse X position, "normalized" to the carousel position
                    pos, scrollPos;

                if( stripePos < 0) stripePos = 0; //

                pos = stripePos / (containerWidth - padding*2); // calculated position between 0 to 1
                // calculate the percentage of the mouse position within the carousel
                scrollPos = (scrollWidth - containerWidth ) * pos;

                raf(function(){
                    el.scrollLeft = scrollPos;
                });
            }
        }
    })();

    // Autoplay controller
    APControl = {
        autoPlayTimer : false,
        play : function(){
            APControl.autoPlayTimer = setTimeout(function(){ changeImage(nextImage) }, options.time);
            APControl.progress.start();
            autoplayBtn.removeClass('play');
            APControl.setTitle('Click to stop autoplay');
            options.autoplay = true;
        },
        pause : function(){
            clearTimeout(APControl.autoPlayTimer);
            APControl.progress.reset();
            autoplayBtn.addClass('play');
            APControl.setTitle('Click to resume autoplay');
            options.autoplay = false;
        },
        progress : {
            reset : function(){
                autoplayBtn.find('div').removeAttr('style');
                setTimeout(function(){ autoplayBtn.removeClass('playing') },200);
            },
            start : function(){
                if( !isOldIE)
                    autoplayBtn.find('div').css(transition, options.time+'ms');
                autoplayBtn.addClass('playing');
            }
        },
        // sets the button Title property
        setTitle : function(text){
            if(text)
                autoplayBtn.prop('title', text + ' (every ' + options.time/1000 + ' seconds)' );
        },
        // the button onClick handler
        toggle : function(e){
            e.stopPropagation();
            APControl[ options.autoplay ? 'pause' : 'play']();
        }
    }

    function getPrefixed(prop){
        var i, s = doc.createElement('p').style, v = ['ms','O','Moz','Webkit'];
        if( s[prop] == '' ) return prop;
        prop = prop.charAt(0).toUpperCase() + prop.slice(1);
        for( i = v.length; i--; )
            if( s[v[i] + prop] == '' )
                return (v[i] + prop);
    }

    function keyDown(event){
        var code = event.keyCode, ok = options.keys, result;
        // Prevent default keyboard action (like navigating inside the page)
        return ok.close.indexOf(code) >= 0 && close() ||
               ok.next.indexOf(code) >= 0 && !options.single && loophole(nextImage) ||
               ok.prev.indexOf(code) >= 0 && !options.single && loophole(prevImage) || true;
    }

    function wheelNextPrev(e, dY, dX){
        if( dX == 1 )
            loophole(nextImage);
        else if( dX == -1 )
            loophole(prevImage);
    }


    // serves as a callback for pbPrevBtn / pbNextBtn buttons but also is called on keypress events
    function next_prev(){
        // don't get crazy when user clicks next or prev buttons rapidly
        //if( !image.hasClass('zoomable') )
        //  return false;

        var idx = (this.id == 'pbPrevBtn') ? prevImage : nextImage;

        loophole(idx);
        return false;
    }

    function updateIndexes(idx){
        lastActive = activeImage;
        activeImage = idx;
        activeURL = images[idx][0];
        prevImage = (activeImage || (options.loop ? images.length : 0)) - 1;
        nextImage = ((activeImage + 1) % images.length) || (options.loop ? 0 : -1);
    }

    // check if looping is allowed before changing image/video.
    // A pre-changeImage function, only for linear changes
    function loophole(idx){
        if( !options.loop ){
            var afterLast = activeImage == images.length-1 && idx == nextImage,
                beforeFirst = activeImage == 0 && idx == prevImage;

            if( afterLast || beforeFirst )
                return;
        }

        changeImage(idx);
    }

    changeImage = (function(){
        var timer;

        return function(imageIndex, firstTime, thumbClick){
            // throttle mechanism
            if( timer )
                return;

            timer = setTimeout(function(){
                timer = null;
            }, 150);

            if( !imageIndex || imageIndex < 0 )
                imageIndex = 0;

            // hide/show next-prev buttons
            if( !options.loop ){
                nextBtn[ imageIndex == images.length-1 ? 'addClass' : 'removeClass' ]('hide');
                prevBtn[ imageIndex == 0 ? 'addClass' : 'removeClass' ]('hide');
            }

            // if there's a callback for this point:
            if( typeof options.beforeShow == "function")
                options.beforeShow(imageLinks[imageIndex]);

            overlay.removeClass('error').addClass( imageIndex > activeImage ? 'next' : 'prev' );

            updateIndexes(imageIndex);

            // reset things
            stop();
            video.empty();
            preload.onerror = null;
            image.add(video).data('zoom', 1);

            activeType = imageLinks[imageIndex].rel == 'video' ? 'video' : 'image';

            // check if current link is a video
            if( activeType == 'video' ){
                video.html( newVideo() ).addClass('hide');
                showContent(firstTime);
            }
            else{
                // give a tiny delay to the preloader, so it won't be showed when images load very quickly
                var loaderTimeout = setTimeout(function(){ overlay.addClass('pbLoading'); }, 50);

                if( isOldIE ) overlay.addClass('hide'); // should wait for the image onload. just hide the image while old IE display the preloader

                options.autoplay && APControl.progress.reset();
                preload = new Image();
                preload.onload = function(){
                    preload.onload = null;

                    if( prevImage >= 0 ) preloadPrev.src = images[prevImage][0];
                    if( nextImage >= 0 ) preloadNext.src = images[nextImage][0];

                    clearTimeout(loaderTimeout);
                    showContent(firstTime);
                };
                preload.onerror = imageError;
                preload.src = activeURL;
            }

            // Show Caption text
            captionText.on(transitionend, captionTextChange).addClass('change');
            if( firstTime || isOldIE ) captionTextChange();

            if( options.thumbs )
                thumbsStripe.changeActive(imageIndex, firstTime, thumbClick);
            // Save url hash for current image
            history.save();
        }
    })();

    function newVideo(){
        var url = images[activeImage][0],
            sign = $('<a>').prop('href',images[activeImage][0])[0].search ? '&' : '?';
        url += sign + 'vq=hd720&wmode=opaque';
        return $("<iframe>").prop({ scrolling:'no', frameborder:0, allowTransparency:true, src:url }).attr({webkitAllowFullScreen:true, mozallowfullscreen:true, allowFullScreen:true});
    }

    // show the item's Title & Counter
    function captionTextChange(){
        captionText.off(transitionend).removeClass('change');
        // change caption's text
        if( options.counter ){
            try{
                var value = options.counter.replace('A', activeImage + 1).replace('B', images.length);
            }
            // if, for some reason, the above has failed from a bad "counter" value, reset and retry
            catch(err){
                options.counter = '(A/B)';
                captionTextChange();
            }
            caption.find('.counter').text(value);
        }
        if( options.title )
            caption.find('.title').html('<span>' + images[activeImage][1] + '</span>');
    }

    // Handles the history states when changing images
    var history = {
        save : function(){
            // only save to history urls which are not already in the hash
            if('pushState' in window.history && decodeURIComponent(window.location.hash.slice(1)) != activeURL && options.history ){
                window.history.pushState( 'photobox', doc.title + '-' + images[activeImage][1], window.location.pathname + window.location.search + '#' + encodeURIComponent(activeURL) );
            }
        },
        load : function(){
            if( options && !options.history ) return false;
            var hash = decodeURIComponent( window.location.hash.slice(1) ), i, j;
            if( !hash && overlay.hasClass('show') )
                close();
        },
        clear : function(){
            if( options.history && 'pushState' in window.history )
                window.history.pushState('photobox', doc.title, window.location.pathname + window.location.search);
        }
    };

    // Add Photobox special `onpopstate` to the `onpopstate` function
    window.onpopstate = (function(){
        var cached = window.onpopstate;
        return function(event){
            cached && cached.apply(this, arguments);
            if( event.state == 'photobox' )
                history.load();
        }
    })();

    // handles all image loading error (if image is dead)
    function imageError(){
        overlay.addClass('error');
        image[0].src = blankImg; // set the source to a blank image
        preload.onerror = null;
    }

    // Shows the content (image/video) on the screen
    function showContent(firstTime){
        var out, showSaftyTimer;
        showSaftyTimer = setTimeout(show, 2000);

        // hides the current image and prepare ground for an image change
        pbLoader.fadeOut(300, function(){
            overlay.removeClass("pbLoading");
            pbLoader.removeAttr('style');
        });
        overlay.addClass('hide');

        image.add(video).removeAttr('style').removeClass('zoomable'); // while transitioning an image, do not apply the 'zoomable' class

        // check which element needs to transition-out:
		console.log( firstTime, lastActive, imageLinks[lastActive] );
        if( !firstTime && imageLinks[lastActive].rel == 'video' ){
            out = video;
            image.addClass('prepare');
        }
        else
            out = image;

        if( firstTime || isOldIE )
            show();
        else
            out.on(transitionend, show);

        // in case the 'transitionend' didn't fire
        // after hiding the last seen image, show the new one
        function show(){
            clearTimeout(showSaftyTimer);
            out.off(transitionend).css({'transition':'none'});
            overlay.removeClass('video');
            if( activeType == 'video' ){
                image[0].src = blankImg;
                video.addClass('prepare');
                overlay.addClass('video');
            }
            else
                image.prop({ 'src':activeURL, 'class':'prepare' });

            // filthy hack for the transitionend event, but cannot work without it:
            setTimeout(function(){
                image.add(video).removeAttr('style').removeClass('prepare');
                overlay.removeClass('hide next prev');
                setTimeout(function(){
                    image.add(video).on(transitionend, showDone);
                    if(isOldIE) showDone(); // IE9 and below don't support transitionEnd...
                }, 0);
            },50);
        }
    }

    // a callback whenever a transition of an image or a video is done
    function showDone(){
        image.add(video).off(transitionend).addClass('zoomable');
        if( activeType == 'video' )
            video.removeClass('hide');
        else{
            autoplayBtn && options.autoplay && APControl.play();
		}
        if( typeof photobox.callback == 'function' )
            photobox.callback.apply(imageLinks[activeImage]);
    }

    function scrollZoom(e, deltaY, deltaX){
        if( deltaX ) return false;

        if( activeType == 'video' ){
            var zoomLevel = video.data('zoom') || 1;
            zoomLevel += (deltaY / 10);
            if( zoomLevel < 0.5 )
                return false;

            video.data('zoom', zoomLevel).css({width:624*zoomLevel, height:351*zoomLevel});
        }
        else{
            var zoomLevel = image.data('zoom') || 1,
                getSize = image[0].getBoundingClientRect();

            zoomLevel += (deltaY / 10);

            if( zoomLevel < 0.1 )
                zoomLevel = 0.1;

            raf(function() {
                image.data('zoom', zoomLevel).css({'transform':'scale('+ zoomLevel +')'});
            });

            // check if image (by mouse) movement should take effect (if image is larger than the window
            if( getSize.height > docElm.clientHeight || getSize.width > docElm.clientWidth ){
                $(doc).on('mousemove.photobox', imageReposition);
            }
            else{
                $(doc).off('mousemove.photobox');
                image[0].style[transformOrigin] = '50% 50%';
            }
        }
        return false;
    }

    function thumbsResize(e, delta){
        e.preventDefault();
        e.stopPropagation(); // stop the event from bubbling up to the Overlay and enlarge the content itself
        var thumbList = photobox.thumbsList, h;
        thumbList.css('height', thumbList[0].clientHeight + (delta * 10) );
        h = caption[0].clientHeight / 2;
        wrapper[0].style.cssText = "margin-top: -"+ h +"px; padding: "+ h +"px 0;";
        thumbs.hide().show(0);
        //thumbs.trigger('mouseenter').trigger('mousemove');
    }

    // moves the image around during zoom mode on mousemove event
    function imageReposition(e){
        var y = (e.clientY / docElm.clientHeight) * (docElm.clientHeight + 200) - 100, // extend the range of the Y axis by 100 each side
            yDelta = y / docElm.clientHeight * 100,
            xDelta = e.clientX / docElm.clientWidth * 100,
            origin = xDelta.toFixed(2)+'% ' + yDelta.toFixed(2) +'%';

        raf(function() {
            image[0].style[transformOrigin] = origin;
        });
    }

    function stop(){
        clearTimeout(APControl.autoPlayTimer);
        $(doc).off('mousemove.photobox');
        preload.onload = function(){};
        preload.src = preloadPrev.src = preloadNext.src = activeURL;
    }

    function close(){
            if( !overlay.hasClass('show') )
                return false;

            stop();
            video.find('iframe').prop('src','').empty();
            Photobox.prototype.setup();
            history.clear();

            overlay.removeClass('on video').addClass('hide');

            image.on(transitionend, hide);
            isOldIE && hide();

            // the "photobox" instance might be needed for async transitionEnd functions, so give it some time before clearing it
            setTimeout(function(){
                photobox = null;
            },1000);

            function hide(){
                if( overlay[0].className == '' ) return; // if already hidden
                overlay.removeClass('show hide error pbLoading');
                image.removeAttr('class').removeAttr('style').off().data('zoom',1);
                caption.find('.title').empty();

                if(noPointerEvents) // pointer-events lack support in IE, so just hide the overlay
                    setTimeout(function(){ overlay.hide(); }, 200);

                options.hideFlash && $('iframe, object, embed').css('visibility', 'visible');
            }

            // fall-back if the 'transitionend' event didn't fire
            setTimeout(hide, 500);
            // callback after closing the gallery
            if( typeof options.afterClose === 'function' )
                options.afterClose(overlay);
    }


    /**
    * jQuery Plugin to add basic "swipe" support on touch-enabled devices
    *
    * @author Yair Even Or
    * @version 1.0.0 (March 20, 2013)
    */
    $.event.special.swipe = {
        setup: function(){
            $(this).bind('touchstart', $.event.special.swipe.handler);
        },

        teardown: function(){
            $(this).unbind('touchstart', $.event.special.swipe.handler);
        },

        handler: function(event){
            var args = [].slice.call( arguments, 1 ), // clone arguments array, remove original event from cloned array
                touches = event.originalEvent.touches,
                startX, startY,
                deltaX = 0, deltaY = 0,
                that = this;

            event = $.event.fix(event);

            if( touches.length == 1 ){
                startX = touches[0].pageX;
                startY = touches[0].pageY;
                this.addEventListener('touchmove', onTouchMove, false);
            }

            function cancelTouch(){
                that.removeEventListener('touchmove', onTouchMove);
                startX = startY = null;
            }

            function onTouchMove(e){
                e.preventDefault();

                var Dx = startX - e.touches[0].pageX,
                    Dy = startY - e.touches[0].pageY;

                if( Math.abs(Dx) >= 20 ){
                    cancelTouch();
                    deltaX = (Dx > 0) ? -1 : 1;
                }
                else if( Math.abs(Dy) >= 20 ){
                    cancelTouch();
                    deltaY = (Dy > 0) ? 1 : -1;
                }

                event.type = 'swipe';
                args.unshift(event, deltaX, deltaY); // add back the new event to the front of the arguments with the delatas
                return ($.event.dispatch || $.event.handle).apply(that, args);
            }
        }
    };

    /*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
     * Licensed under the MIT License (LICENSE.txt).
     *
     * Version: 3.1.11
     *
     * Requires: jQuery 1.2.2+
     */
    !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.11",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b)["offsetParent"in a.fn?"offsetParent":"parent"]();return c.length||(c=a("body")),parseInt(c.css("fontSize"),10)},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});

    ////////////// ON DOCUMENT READY /////////////////
    $(doc).ready(prepareDOM);

    // Expose:
    window._photobox = {
        close    : close,
        history  : history,
        defaults : defaults
    };
})(jQuery, document, window);