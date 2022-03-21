/*!
	By André Rinas, www.andrerinas.de
	Documentation, www.simplelightbox.de
	Available for use under the MIT License
	Version 2.10.3
*/
class SimpleLightbox {

    defaultOptions = {
        sourceAttr: 'href',
        overlay: true,
        overlayOpacity: 0.7,
        spinner: true,
        nav: true,
        navText: ['&lsaquo;', '&rsaquo;'],
        captions: true,
        captionDelay: 0,
        captionSelector: 'img',
        captionType: 'attr',
        captionsData: 'title',
        captionPosition: 'bottom',
        captionClass: '',
        close: true,
        closeText: '&times;',
        swipeClose: true,
        showCounter: true,
        fileExt: 'png|jpg|jpeg|gif|webp',
        animationSlide: true,
        animationSpeed: 250,
        preloading: true,
        enableKeyboard: true,
        loop: true,
        rel: false,
        docClose: true,
        swipeTolerance: 50,
        className: 'simple-lightbox',
        widthRatio: 0.8,
        heightRatio: 0.9,
        scaleImageToRatio: false,
        disableRightClick: false,
        disableScroll: true,
        alertError: true,
        alertErrorMessage: 'Image not found, next image will be loaded',
        additionalHtml: false,
        history: true,
        throttleInterval: 0,
        doubleTapZoom: 2,
        maxZoom: 10,
        htmlClass: 'has-lightbox',
        rtl: false,
        fixedClass: 'sl-fixed',
        fadeSpeed: 300,
        uniqueImages: true,
        focus: true,
        scrollZoom: true,
        scrollZoomFactor: 0.5
    };

    transitionPrefix;
    isPassiveEventsSupported;
    transitionCapable = false;

    isTouchDevice = ('ontouchstart' in window);
    isAppleDevice = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

    initialLocationHash;

    pushStateSupport = ('pushState' in history);

    isOpen = false;
    isAnimating = false;
    isClosing = false;
    isFadeIn = false;
    urlChangedOnce = false;
    hashReseted = false;
    historyHasChanges = false;
    historyUpdateTimeout = null;

    currentImage;
    eventNamespace = 'simplelightbox';
    domNodes = {};

    loadedImages = [];
    initialImageIndex = 0;
    currentImageIndex = 0;

    initialSelector = null;
    globalScrollbarWidth = 0;

    controlCoordinates = {
        swipeDiff: 0,
        swipeYDiff: 0,
        swipeStart: 0,
        swipeEnd: 0,
        swipeYStart: 0,
        swipeYEnd: 0,
        mousedown: false,
        imageLeft: 0,
        zoomed: false,
        containerHeight: 0,
        containerWidth: 0,
        containerOffsetX: 0,
        containerOffsetY: 0,
        imgHeight: 0,
        imgWidth: 0,
        capture: false,
        initialOffsetX: 0,
        initialOffsetY: 0,
        initialPointerOffsetX: 0,
        initialPointerOffsetY: 0,
        initialPointerOffsetX2: 0,
        initialPointerOffsetY2: 0,
        initialScale: 1,
        initialPinchDistance: 0,
        pointerOffsetX: 0,
        pointerOffsetY: 0,
        pointerOffsetX2: 0,
        pointerOffsetY2: 0,
        targetOffsetX: 0,
        targetOffsetY: 0,
        targetScale: 0,
        pinchOffsetX: 0,
        pinchOffsetY: 0,
        limitOffsetX: 0,
        limitOffsetY: 0,
        scaleDifference: 0,
        targetPinchDistance: 0,
        touchCount: 0,
        doubleTapped: false,
        touchmoveCount: 0
    };

    constructor(elements, options) {

        this.options = Object.assign(this.defaultOptions, options);
        this.isPassiveEventsSupported = this.checkPassiveEventsSupport();

        if (typeof elements === 'string') {
            this.initialSelector = elements;
            this.elements = Array.from(document.querySelectorAll(elements));
        } else {
            this.elements = ((typeof elements.length !== 'undefined') && elements.length > 0) ? Array.from(elements) : [elements];
        }

        this.relatedElements = [];

        this.transitionPrefix = this.calculateTransitionPrefix();
        this.transitionCapable = this.transitionPrefix !== false;
        this.initialLocationHash = this.hash;

        // this should be handled by attribute selector IMHO! => 'a[rel=bla]'...
        if (this.options.rel) {
            this.elements = this.getRelated(this.options.rel);
        }

        if (this.options.uniqueImages) {
            let imgArr = [];
            this.elements = Array.from(this.elements).filter(
                element => {
                    let src = element.getAttribute(this.options.sourceAttr);
                    if(imgArr.indexOf(src) === -1) {
                        imgArr.push(src);
                        return true;
                    }
                    return false;
                }
            );
        }

        this.createDomNodes();

        if (this.options.close) {
            this.domNodes.wrapper.appendChild(this.domNodes.closeButton);
        }

        if (this.options.nav) {
            this.domNodes.wrapper.appendChild(this.domNodes.navigation);
        }

        if (this.options.spinner) {
            this.domNodes.wrapper.appendChild(this.domNodes.spinner);
        }

        this.addEventListener(this.elements, 'click.' + this.eventNamespace, (event) => {

            if (this.isValidLink(event.currentTarget)) {
                event.preventDefault();
                if (this.isAnimating) {
                    return false;
                }

                this.initialImageIndex = this.elements.indexOf(event.currentTarget);
                this.openImage(event.currentTarget);
            }
        });

        // close addEventListener click addEventListener doc
        if (this.options.docClose) {
            this.addEventListener(this.domNodes.wrapper, ['click.' + this.eventNamespace, 'touchstart.' + this.eventNamespace], (event) => {
                if (this.isOpen && event.target === event.currentTarget) {
                    this.close();
                }
            });
        }

        // disable rightclick
        if (this.options.disableRightClick) {
            this.addEventListener(document.body, 'contextmenu.' + this.eventNamespace, (event) => {
                if (event.target.parentElement.classList.contains("sl-image")) {
                    event.preventDefault();
                }
            });
        }

        // keyboard-control
        if (this.options.enableKeyboard) {
            this.addEventListener(document.body, 'keyup.' + this.eventNamespace, this.throttle((event) => {
                this.controlCoordinates.swipeDiff = 0;
                // keyboard control only if lightbox is open

                if (this.isAnimating && event.key === 'Escape') {
                    this.currentImage.setAttribute('src', '');
                    this.isAnimating = false;
                    return this.close();
                }

                if (this.isOpen) {
                    event.preventDefault();
                    if (event.key === 'Escape') {
                        this.close();
                    }
                    if(!this.isAnimating && ['ArrowLeft', 'ArrowRight'].indexOf(event.key) > -1) {
                      this.loadImage(event.key === 'ArrowRight' ? 1 : -1);
                    }
                }
            }, this.options.throttleInterval));
        }

        this.addEvents();
    }

    checkPassiveEventsSupport() {
        // https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection
        // Test via a getter in the options object to see if the passive property is accessed
        let supportsPassive = false;
        try {
            let opts = Object.defineProperty({}, 'passive', {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener("testPassive", null, opts);
            window.removeEventListener("testPassive", null, opts);
        } catch (e) {}
        return supportsPassive;
    }

    createDomNodes() {
        this.domNodes.overlay = document.createElement('div');
        this.domNodes.overlay.classList.add('sl-overlay');
        this.domNodes.overlay.dataset.opacityTarget = this.options.overlayOpacity;

        this.domNodes.closeButton = document.createElement('button');
        this.domNodes.closeButton.classList.add('sl-close');
        this.domNodes.closeButton.innerHTML = this.options.closeText;

        this.domNodes.spinner = document.createElement('div');
        this.domNodes.spinner.classList.add('sl-spinner');
        this.domNodes.spinner.innerHTML = '<div></div>';

        this.domNodes.navigation = document.createElement('div');
        this.domNodes.navigation.classList.add('sl-navigation');
        this.domNodes.navigation.innerHTML = `<button class="sl-prev">${this.options.navText[0]}</button><button class="sl-next">${this.options.navText[1]}</button>`;

        this.domNodes.counter = document.createElement('div');
        this.domNodes.counter.classList.add('sl-counter');
        this.domNodes.counter.innerHTML = '<span class="sl-current"></span>/<span class="sl-total"></span>';

        this.domNodes.caption = document.createElement('div');
        this.domNodes.caption.classList.add('sl-caption', 'pos-' + this.options.captionPosition);
        if (this.options.captionClass) {
            this.domNodes.caption.classList.add(this.options.captionClass);
        }

        this.domNodes.image = document.createElement('div');
        this.domNodes.image.classList.add('sl-image');

        this.domNodes.wrapper = document.createElement('div');
        this.domNodes.wrapper.classList.add('sl-wrapper');
        this.domNodes.wrapper.setAttribute('tabindex',-1);
        this.domNodes.wrapper.setAttribute('role','dialog');
        this.domNodes.wrapper.setAttribute('aria-hidden',false);
        if (this.options.className) {
            this.domNodes.wrapper.classList.add(this.options.className);
        }
        if(this.options.rtl) {
            this.domNodes.wrapper.classList.add('sl-dir-rtl');
        }
    }

    throttle(func, limit) {
        let inThrottle;
        return function () {
            if (!inThrottle) {
                func.apply(this, arguments);
                inThrottle = true;
                setTimeout(function () {
                    return inThrottle = false;
                }, limit);
            }
        };
    }

    isValidLink(element) {
        return (!this.options.fileExt) || ( element.getAttribute(this.options.sourceAttr) && (new RegExp('(' + this.options.fileExt + ')$', 'i')).test(element.getAttribute(this.options.sourceAttr)));
    }

    calculateTransitionPrefix() {
        let s = (document.body || document.documentElement).style;

        return 'transition' in s ? '' :
            'WebkitTransition' in s ? '-webkit-' :
                'MozTransition' in s ? '-moz-' :
                    'OTransition' in s ? '-o' :
                        false;
    }

    toggleScrollbar(type) {
        let scrollbarWidth = 0;
        let fixedElements =  [].slice.call(document.querySelectorAll('.'+this.options.fixedClass))
        if (type === 'hide') {
            let fullWindowWidth = window.innerWidth;
            if (!fullWindowWidth) {
                let documentElementRect = document.documentElement.getBoundingClientRect();
                fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
            }
            if (document.body.clientWidth < fullWindowWidth || this.isAppleDevice) {
                let scrollDiv = document.createElement('div'),
                    paddingRight = parseInt(document.body.style.paddingRight || 0, 10);

                scrollDiv.classList.add('sl-scrollbar-measure');

                document.body.appendChild(scrollDiv);
                scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);

                document.body.dataset.originalPaddingRight = paddingRight;
                if (scrollbarWidth > 0 || (scrollbarWidth == 0 && this.isAppleDevice)) {
                    document.body.classList.add('hidden-scroll');
                    document.body.style.paddingRight = (paddingRight + scrollbarWidth) + 'px';

                    fixedElements.forEach(element => {
                        const actualPadding = element.style.paddingRight
                        const calculatedPadding = window.getComputedStyle(element)['padding-right']
                        element.dataset.originalPaddingRight = actualPadding;
                        element.style.paddingRight = `${parseFloat(calculatedPadding) + scrollbarWidth}px`
                    });

                }
            }
        } else {
            document.body.classList.remove('hidden-scroll');
            document.body.style.paddingRight = document.body.dataset.originalPaddingRight;

            fixedElements.forEach(element => {
                const padding = element.dataset.originalPaddingRight;
                if (typeof padding !== 'undefined') {
                    element.style.paddingRight = padding
                }
            });
        }
        return scrollbarWidth;
    }

    close() {
        if (!this.isOpen || this.isAnimating || this.isClosing) {
            return false;
        }

        this.isClosing = true;
        let element = this.relatedElements[this.currentImageIndex];
        element.dispatchEvent(new Event('close.simplelightbox'));

        if (this.options.history) {
            this.historyHasChanges = false;
            if(!this.hashReseted) {
                this.resetHash();
            }
        }

        this.removeEventListener(document, 'focusin.' + this.eventNamespace);

        this.fadeOut(this.domNodes.overlay, this.options.fadeSpeed);
        this.fadeOut(document.querySelectorAll('.sl-image img,  .sl-close, .sl-navigation, .sl-image .sl-caption, .sl-counter'), this.options.fadeSpeed, () => {
            if (this.options.disableScroll) {
                this.toggleScrollbar('show');
            }

            if (this.options.htmlClass && this.options.htmlClass !== '') {
                document.querySelector('html').classList.remove(this.options.htmlClass);
            }

            document.body.removeChild(this.domNodes.wrapper);
            document.body.removeChild(this.domNodes.overlay);
            this.domNodes.additionalHtml = null;

            element.dispatchEvent(new Event('closed.simplelightbox'));

            this.isClosing = false;
        });

        this.currentImage = null;
        this.isOpen = false;
        this.isAnimating = false;

        // reset touchcontrol coordinates
        for (let key in this.controlCoordinates) {
            this.controlCoordinates[key] = 0;
        }
        this.controlCoordinates.mousedown = false;
        this.controlCoordinates.zoomed = false;
        this.controlCoordinates.capture = false;
        this.controlCoordinates.initialScale = this.minMax(1, 1, this.options.maxZoom);
        this.controlCoordinates.doubleTapped = false;
    }

    get hash() {
        return window.location.hash.substring(1);
    }

    preload() {
        let index = this.currentImageIndex,
            length = this.relatedElements.length,
            next = (index + 1 < 0) ? length - 1 : (index + 1 >= length - 1) ? 0 : index + 1,
            prev = (index - 1 < 0) ? length - 1 : (index - 1 >= length - 1) ? 0 : index - 1,
            nextImage = new Image(),
            prevImage = new Image();

        nextImage.addEventListener('load', (event) => {
            let src = event.target.getAttribute('src');
            if (this.loadedImages.indexOf(src) === -1) { //is this condition even required... setting multiple times will not change usage...
                this.loadedImages.push(src);
            }
            this.relatedElements[index].dispatchEvent(new Event('nextImageLoaded.' + this.eventNamespace));
        });
        nextImage.setAttribute('src', this.relatedElements[next].getAttribute(this.options.sourceAttr));

        prevImage.addEventListener('load', (event) => {
            let src = event.target.getAttribute('src');
            if (this.loadedImages.indexOf(src) === -1) {
                this.loadedImages.push(src);
            }
            this.relatedElements[index].dispatchEvent(new Event('prevImageLoaded.' + this.eventNamespace));
        });
        prevImage.setAttribute('src', this.relatedElements[prev].getAttribute(this.options.sourceAttr));
    }

    loadImage(direction) {
        let slideDirection = direction;
        if(this.options.rtl) {
            direction = -direction;
        }

        this.relatedElements[this.currentImageIndex].dispatchEvent(new Event('change.' + this.eventNamespace));
        this.relatedElements[this.currentImageIndex].dispatchEvent(new Event((direction === 1 ? 'next' : 'prev') + '.' + this.eventNamespace));

        let newIndex = this.currentImageIndex + direction;

        if (this.isAnimating || (newIndex < 0 || newIndex >= this.relatedElements.length) && this.options.loop === false) {
            return false;
        }

        this.currentImageIndex = (newIndex < 0) ? this.relatedElements.length - 1 : (newIndex > this.relatedElements.length - 1) ? 0 : newIndex;

        this.domNodes.counter.querySelector('.sl-current').innerHTML = this.currentImageIndex + 1;


        if (this.options.animationSlide) {
            this.slide(this.options.animationSpeed / 1000, (-100 * slideDirection) - this.controlCoordinates.swipeDiff + 'px');
        }
        this.fadeOut(this.domNodes.image, this.options.fadeSpeed, () => {
            this.isAnimating = true;
            if(!this.isClosing) {
                setTimeout(() => {
                    let element = this.relatedElements[this.currentImageIndex];
                    this.currentImage.setAttribute('src', element.getAttribute(this.options.sourceAttr));

                    if (this.loadedImages.indexOf(element.getAttribute(this.options.sourceAttr)) === -1) {
                        this.show(this.domNodes.spinner);
                    }

                    if(this.domNodes.image.contains(this.domNodes.caption)) {
                      this.domNodes.image.removeChild(this.domNodes.caption);
                    }

                    this.adjustImage(slideDirection);
                    if (this.options.preloading) this.preload();
                }, 100);
            } else {
                this.isAnimating = false;
            }
        });
    }

    adjustImage(direction) {
        if (!this.currentImage) {
            return false;
        }

        let tmpImage = new Image(),
            windowWidth = window.innerWidth * this.options.widthRatio,
            windowHeight = window.innerHeight * this.options.heightRatio;

        tmpImage.setAttribute('src', this.currentImage.getAttribute('src'));

        this.currentImage.dataset.scale = 1;
        this.currentImage.dataset.translateX = 0;
        this.currentImage.dataset.translateY = 0;
        this.zoomPanElement(0, 0, 1);

        tmpImage.addEventListener('error', (event) => {
            this.relatedElements[this.currentImageIndex].dispatchEvent(new Event('error.' + this.eventNamespace));
            this.isAnimating = false;
            this.isOpen = true;
            this.domNodes.spinner.style.display = 'none';

            let dirIsDefined = direction === 1 || direction === -1;
            if (this.initialImageIndex === this.currentImageIndex && dirIsDefined) {
                return this.close();
            }

            if (this.options.alertError) {
                alert(this.options.alertErrorMessage);
            }

            this.loadImage(dirIsDefined ? direction : 1);
        });


        tmpImage.addEventListener('load', (event) => {
            if (typeof direction !== 'undefined') {
                this.relatedElements[this.currentImageIndex].dispatchEvent(new Event('changed.' + this.eventNamespace));
                this.relatedElements[this.currentImageIndex].dispatchEvent(new Event((direction === 1 ? 'nextDone' : 'prevDone') + '.' + this.eventNamespace));
            }

            // history
            if (this.options.history) {
                this.updateURL();
            }

            if (this.loadedImages.indexOf(this.currentImage.getAttribute('src')) === -1) {
                this.loadedImages.push(this.currentImage.getAttribute('src'));
            }

            let imageWidth = event.target.width,
                imageHeight = event.target.height;

            if (this.options.scaleImageToRatio || imageWidth > windowWidth || imageHeight > windowHeight) {
                let ratio = imageWidth / imageHeight > windowWidth / windowHeight ? imageWidth / windowWidth : imageHeight / windowHeight;
                imageWidth /= ratio;
                imageHeight /= ratio;
            }

            this.domNodes.image.style.top = (window.innerHeight - imageHeight) / 2 + 'px';
            this.domNodes.image.style.left = (window.innerWidth - imageWidth - this.globalScrollbarWidth) / 2 + 'px';
            this.domNodes.image.style.width = imageWidth + 'px';
            this.domNodes.image.style.height = imageHeight + 'px';

            this.domNodes.spinner.style.display = 'none';
            if( this.options.focus ) {
                this.forceFocus();
            }
            this.fadeIn(this.currentImage, this.options.fadeSpeed, () => {
                if( this.options.focus ) {
                    this.domNodes.wrapper.focus();
                }
            });

            this.isOpen = true;

            let captionContainer,
                captionText;

            if (typeof this.options.captionSelector === 'string') {
                captionContainer = this.options.captionSelector === 'self' ? this.relatedElements[this.currentImageIndex] : this.relatedElements[this.currentImageIndex].querySelector(this.options.captionSelector);
            } else if (typeof this.options.captionSelector === 'function') {
                captionContainer = this.options.captionSelector(this.relatedElements[this.currentImageIndex]);
            }

            if(this.options.captions && captionContainer) {
                if (this.options.captionType === 'data') {
                    captionText = captionContainer.dataset[this.options.captionsData];
                } else if (this.options.captionType === 'text') {
                    captionText = captionContainer.innerHTML;
                } else {
                    captionText = captionContainer.getAttribute(this.options.captionsData);
                }
            }

            if (!this.options.loop) {
                if (this.currentImageIndex === 0) {
                    this.hide(this.domNodes.navigation.querySelector('.sl-prev'));
                }
                if (this.currentImageIndex >= this.relatedElements.length - 1) {
                    this.hide(this.domNodes.navigation.querySelector('.sl-next'));
                }
                if (this.currentImageIndex > 0) {
                    this.show(this.domNodes.navigation.querySelector('.sl-prev'));
                }
                if (this.currentImageIndex < this.relatedElements.length - 1) {
                    this.show(this.domNodes.navigation.querySelector('.sl-next'));
                }
            } else {
                if (this.relatedElements.length === 1) {
                    this.hide(this.domNodes.navigation.querySelectorAll('.sl-prev, .sl-next'));
                } else {
                    this.show(this.domNodes.navigation.querySelectorAll('.sl-prev, .sl-next'));
                }
            }


            if (direction === 1 || direction === -1) {
                if (this.options.animationSlide) {
                    this.slide(0, 100 * direction + 'px');
                    setTimeout(() => {
                        this.slide(this.options.animationSpeed / 1000, 0 + 'px');
                    }, 50);
                }
                this.fadeIn(this.domNodes.image, this.options.fadeSpeed, () => {
                    this.isAnimating = false;
                    this.setCaption(captionText, imageWidth);
                });

            } else {
                this.isAnimating = false;
                this.setCaption(captionText, imageWidth);
            }

            if (this.options.additionalHtml && !this.domNodes.additionalHtml) {
                this.domNodes.additionalHtml = document.createElement('div');
                this.domNodes.additionalHtml.classList.add('sl-additional-html');
                this.domNodes.additionalHtml.innerHTML = this.options.additionalHtml;
                this.domNodes.image.appendChild(this.domNodes.additionalHtml);
            }

        });
    }

    zoomPanElement(targetOffsetX, targetOffsetY, targetScale) {

        this.currentImage.style[this.transitionPrefix + 'transform'] = 'translate(' + targetOffsetX + ',' + targetOffsetY + ') scale(' + targetScale + ')';

    };

    minMax(value, min, max) {
        return (value < min) ? min : (value > max) ? max : value;
    };

    setZoomData(initialScale, targetOffsetX, targetOffsetY) {
        this.currentImage.dataset.scale = initialScale;
        this.currentImage.dataset.translateX = targetOffsetX;
        this.currentImage.dataset.translateY = targetOffsetY;
    };


    hashchangeHandler() {
        if (this.isOpen && this.hash === this.initialLocationHash) {
            this.hashReseted = true;
            this.close();
        }
    }

    addEvents() {

        // resize/responsive
        this.addEventListener(window, 'resize.' + this.eventNamespace, (event) => {
            //this.adjustImage.bind(this)
            if (this.isOpen) {
                this.adjustImage();
            }
        });

        this.addEventListener(this.domNodes.closeButton, ['click.' + this.eventNamespace, 'touchstart.' + this.eventNamespace], this.close.bind(this));

        if (this.options.history) {
            setTimeout(() => {
                this.addEventListener(window, 'hashchange.' + this.eventNamespace, (event) => {
                    if (this.isOpen) {
                        this.hashchangeHandler();
                    }
                });
            }, 40);
        }

        this.addEventListener(this.domNodes.navigation.getElementsByTagName('button'), 'click.' + this.eventNamespace, (event) => {
            if (!event.currentTarget.tagName.match(/button/i)) {
                return true;
            }

            event.preventDefault();
            this.controlCoordinates.swipeDiff = 0;
            this.loadImage(event.currentTarget.classList.contains('sl-next') ? 1 : -1);
        });

        if (this.options.scrollZoom) {
            let scale = 1

            this.addEventListener(this.domNodes.image, ['mousewheel','DOMMouseScroll'], (event) => {
                if (this.controlCoordinates.mousedown || this.isAnimating || this.isClosing || !this.isOpen) {
                    return true;
                }
                if(this.controlCoordinates.containerHeight == 0) {
                    this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
                    this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
                    this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
                    this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
                    this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
                    this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;

                    this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
                    this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
                }
                event.preventDefault();

                let delta = event.delta || event.wheelDelta;
                if (delta === undefined) {
                    //we are on firefox
                    delta = event.detail;
                }
                delta = Math.max(-1,Math.min(1,delta)); // cap the delta to [-1,1] for cross browser consistency

                // apply zoom
                scale += delta * this.options.scrollZoomFactor * scale;
                scale = Math.max(1, Math.min( this.options.maxZoom, scale));

                this.controlCoordinates.targetScale = scale;

                let scrollTopPos = document.documentElement.scrollTop || document.body.scrollTop;

                this.controlCoordinates.pinchOffsetX = event.pageX;
                this.controlCoordinates.pinchOffsetY = event.pageY - scrollTopPos || 0; // need to substract the scroll position

                this.controlCoordinates.limitOffsetX = ((this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) - this.controlCoordinates.containerWidth) / 2;
                this.controlCoordinates.limitOffsetY = ((this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) - this.controlCoordinates.containerHeight) / 2;
                this.controlCoordinates.scaleDifference = this.controlCoordinates.targetScale - this.controlCoordinates.initialScale;
                this.controlCoordinates.targetOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.initialOffsetX - ((((((this.controlCoordinates.pinchOffsetX - this.controlCoordinates.containerOffsetX) - (this.controlCoordinates.containerWidth / 2)) - this.controlCoordinates.initialOffsetX) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference))) * this.controlCoordinates.scaleDifference), this.controlCoordinates.limitOffsetX * (-1), this.controlCoordinates.limitOffsetX);
                this.controlCoordinates.targetOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.initialOffsetY - ((((((this.controlCoordinates.pinchOffsetY - this.controlCoordinates.containerOffsetY) - (this.controlCoordinates.containerHeight / 2)) - this.controlCoordinates.initialOffsetY) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference))) * this.controlCoordinates.scaleDifference), this.controlCoordinates.limitOffsetY * (-1), this.controlCoordinates.limitOffsetY);

                this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);

                if (this.controlCoordinates.targetScale > 1) {
                    this.controlCoordinates.zoomed = true;
                    if ( (!this.domNodes.caption.style.opacity || this.domNodes.caption.style.opacity > 0) && this.domNodes.caption.style.display !== 'none') {
                        this.fadeOut(this.domNodes.caption, this.options.fadeSpeed);
                    }
                } else {
                    if (this.controlCoordinates.initialScale === 1) {
                        this.controlCoordinates.zoomed = false;
                        if (this.domNodes.caption.style.display === 'none') {
                            this.fadeIn(this.domNodes.caption, this.options.fadeSpeed);
                        }
                    }
                    this.controlCoordinates.initialPinchDistance = null;
                    this.controlCoordinates.capture = false;
                }

                this.controlCoordinates.initialPinchDistance = this.controlCoordinates.targetPinchDistance;
                this.controlCoordinates.initialScale = this.controlCoordinates.targetScale;
                this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
                this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;

                this.setZoomData(this.controlCoordinates.targetScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
                this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);

            });
        }

        this.addEventListener(this.domNodes.image, ['touchstart.' + this.eventNamespace, 'mousedown.' + this.eventNamespace], (event) => {
            if (event.target.tagName === 'A' && event.type === 'touchstart') {
                return true;
            }

            if (event.type === 'mousedown') {
                event.preventDefault();
                this.controlCoordinates.initialPointerOffsetX = event.clientX;
                this.controlCoordinates.initialPointerOffsetY = event.clientY;
                this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
                this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
                this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
                this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
                this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
                this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;

                this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
                this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
                this.controlCoordinates.capture = true;
            } else {
                this.controlCoordinates.touchCount = event.touches.length;
                this.controlCoordinates.initialPointerOffsetX = event.touches[0].clientX;
                this.controlCoordinates.initialPointerOffsetY = event.touches[0].clientY;
                this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
                this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
                this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
                this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
                this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
                this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;

                if (this.controlCoordinates.touchCount === 1) /* Single touch */ {
                    if (!this.controlCoordinates.doubleTapped) {
                        this.controlCoordinates.doubleTapped = true;
                        setTimeout(() => {
                            this.controlCoordinates.doubleTapped = false;
                        }, 300);
                    } else {

                        this.currentImage.classList.add('sl-transition');
                        if (!this.controlCoordinates.zoomed) {
                            this.controlCoordinates.initialScale = this.options.doubleTapZoom;
                            this.setZoomData(this.controlCoordinates.initialScale,0, 0);
                            this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);


                            if ( (!this.domNodes.caption.style.opacity || this.domNodes.caption.style.opacity > 0) && this.domNodes.caption.style.display !== 'none') {
                                this.fadeOut(this.domNodes.caption, this.options.fadeSpeed);
                            }

                            this.controlCoordinates.zoomed = true;
                        } else {
                            this.controlCoordinates.initialScale = 1;
                            this.setZoomData(this.controlCoordinates.initialScale,0, 0);
                            this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
                            this.controlCoordinates.zoomed = false;
                        }

                        setTimeout(() => {
                            if (this.currentImage) {
                                this.currentImage.classList.remove('sl-transition');
                            }
                        }, 200);
                        return false;
                    }

                    this.controlCoordinates.initialOffsetX  = parseFloat(this.currentImage.dataset.translateX);
                    this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
                }
                else if (this.controlCoordinates.touchCount === 2) /* Pinch */ {
                    this.controlCoordinates.initialPointerOffsetX2 = event.touches[1].clientX;
                    this.controlCoordinates.initialPointerOffsetY2 = event.touches[1].clientY;
                    this.controlCoordinates.initialOffsetX = parseFloat(this.currentImage.dataset.translateX);
                    this.controlCoordinates.initialOffsetY = parseFloat(this.currentImage.dataset.translateY);
                    this.controlCoordinates.pinchOffsetX = (this.controlCoordinates.initialPointerOffsetX + this.controlCoordinates.initialPointerOffsetX2) / 2;
                    this.controlCoordinates.pinchOffsetY = (this.controlCoordinates.initialPointerOffsetY + this.controlCoordinates.initialPointerOffsetY2) / 2;
                    this.controlCoordinates.initialPinchDistance = Math.sqrt(((this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialPointerOffsetX2) * (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialPointerOffsetX2)) + ((this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialPointerOffsetY2) * (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialPointerOffsetY2)));
                }
                this.controlCoordinates.capture = true;
            }
            if(this.controlCoordinates.mousedown) return true;
            if (this.transitionCapable) {
                this.controlCoordinates.imageLeft = parseInt(this.domNodes.image.style.left, 10);
            }
            this.controlCoordinates.mousedown = true;
            this.controlCoordinates.swipeDiff = 0;
            this.controlCoordinates.swipeYDiff = 0;
            this.controlCoordinates.swipeStart = event.pageX || event.touches[0].pageX;
            this.controlCoordinates.swipeYStart = event.pageY || event.touches[0].pageY;

            return false;
        });

        this.addEventListener(this.domNodes.image, ['touchmove.' + this.eventNamespace, 'mousemove.' + this.eventNamespace, 'MSPointerMove'], (event) => {


            if (!this.controlCoordinates.mousedown) {
                return true;
            }

            if (event.type === 'touchmove') {
                if (this.controlCoordinates.capture === false) {
                    return false;
                }

                this.controlCoordinates.pointerOffsetX = event.touches[0].clientX;
                this.controlCoordinates.pointerOffsetY = event.touches[0].clientY;
                this.controlCoordinates.touchCount = event.touches.length;
                this.controlCoordinates.touchmoveCount++;

                if (this.controlCoordinates.touchCount > 1) /* Pinch */ {
                    this.controlCoordinates.pointerOffsetX2 = event.touches[1].clientX;
                    this.controlCoordinates.pointerOffsetY2 = event.touches[1].clientY;
                    this.controlCoordinates.targetPinchDistance = Math.sqrt(((this.controlCoordinates.pointerOffsetX - this.controlCoordinates.pointerOffsetX2) * (this.controlCoordinates.pointerOffsetX - this.controlCoordinates.pointerOffsetX2)) + ((this.controlCoordinates.pointerOffsetY - this.controlCoordinates.pointerOffsetY2) * (this.controlCoordinates.pointerOffsetY - this.controlCoordinates.pointerOffsetY2)));
                    if (this.controlCoordinates.initialPinchDistance === null) {
                        this.controlCoordinates.initialPinchDistance = this.controlCoordinates.targetPinchDistance;
                    }

                    if (Math.abs(this.controlCoordinates.initialPinchDistance - this.controlCoordinates.targetPinchDistance) >= 1) {
                        /* Initialize helpers */
                        this.controlCoordinates.targetScale = this.minMax(this.controlCoordinates.targetPinchDistance / this.controlCoordinates.initialPinchDistance * this.controlCoordinates.initialScale, 1, this.options.maxZoom);
                        this.controlCoordinates.limitOffsetX = ((this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) - this.controlCoordinates.containerWidth) / 2;
                        this.controlCoordinates.limitOffsetY = ((this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) - this.controlCoordinates.containerHeight) / 2;
                        this.controlCoordinates.scaleDifference = this.controlCoordinates.targetScale - this.controlCoordinates.initialScale;
                        this.controlCoordinates.targetOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.initialOffsetX - ((((((this.controlCoordinates.pinchOffsetX - this.controlCoordinates.containerOffsetX) - (this.controlCoordinates.containerWidth / 2)) - this.controlCoordinates.initialOffsetX) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference))) * this.controlCoordinates.scaleDifference), this.controlCoordinates.limitOffsetX * (-1), this.controlCoordinates.limitOffsetX);
                        this.controlCoordinates.targetOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.initialOffsetY - ((((((this.controlCoordinates.pinchOffsetY - this.controlCoordinates.containerOffsetY) - (this.controlCoordinates.containerHeight / 2)) - this.controlCoordinates.initialOffsetY) / (this.controlCoordinates.targetScale - this.controlCoordinates.scaleDifference))) * this.controlCoordinates.scaleDifference), this.controlCoordinates.limitOffsetY * (-1), this.controlCoordinates.limitOffsetY);

                        this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);

                        if (this.controlCoordinates.targetScale > 1) {
                            this.controlCoordinates.zoomed = true;
                            if ((!this.domNodes.caption.style.opacity || this.domNodes.caption.style.opacity > 0) && this.domNodes.caption.style.display !== 'none') {
                                this.fadeOut(this.domNodes.caption, this.options.fadeSpeed);
                            }
                        }

                        this.controlCoordinates.initialPinchDistance = this.controlCoordinates.targetPinchDistance;
                        this.controlCoordinates.initialScale = this.controlCoordinates.targetScale;
                        this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
                        this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
                    }
                } else {
                    this.controlCoordinates.targetScale = this.controlCoordinates.initialScale;
                    this.controlCoordinates.limitOffsetX = ((this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) - this.controlCoordinates.containerWidth) / 2;
                    this.controlCoordinates.limitOffsetY = ((this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) - this.controlCoordinates.containerHeight) / 2;
                    this.controlCoordinates.targetOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.pointerOffsetX - (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialOffsetX), this.controlCoordinates.limitOffsetX * (-1), this.controlCoordinates.limitOffsetX);
                    this.controlCoordinates.targetOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.pointerOffsetY - (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialOffsetY), this.controlCoordinates.limitOffsetY * (-1), this.controlCoordinates.limitOffsetY);

                    if (Math.abs(this.controlCoordinates.targetOffsetX) === Math.abs(this.controlCoordinates.limitOffsetX)) {
                        this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
                        this.controlCoordinates.initialPointerOffsetX = this.controlCoordinates.pointerOffsetX;
                    }

                    if (Math.abs(this.controlCoordinates.targetOffsetY) === Math.abs(this.controlCoordinates.limitOffsetY)) {
                        this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
                        this.controlCoordinates.initialPointerOffsetY = this.controlCoordinates.pointerOffsetY;
                    }

                    this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
                    this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);
                }
            }

            /* Mouse Move implementation */
            if (event.type === 'mousemove' && this.controlCoordinates.mousedown) {
              if(event.type == 'touchmove') return true;

                event.preventDefault();

              if(this.controlCoordinates.capture === false) return false;

              this.controlCoordinates.pointerOffsetX = event.clientX;
              this.controlCoordinates.pointerOffsetY = event.clientY;

              this.controlCoordinates.targetScale = this.controlCoordinates.initialScale;
              this.controlCoordinates.limitOffsetX = ((this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) - this.controlCoordinates.containerWidth) / 2;
              this.controlCoordinates.limitOffsetY = ((this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) - this.controlCoordinates.containerHeight) / 2;
              this.controlCoordinates.targetOffsetX = (this.controlCoordinates.imgWidth * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerWidth ? 0 : this.minMax(this.controlCoordinates.pointerOffsetX - (this.controlCoordinates.initialPointerOffsetX - this.controlCoordinates.initialOffsetX), this.controlCoordinates.limitOffsetX * (-1), this.controlCoordinates.limitOffsetX);
              this.controlCoordinates.targetOffsetY = (this.controlCoordinates.imgHeight * this.controlCoordinates.targetScale) <= this.controlCoordinates.containerHeight ? 0 : this.minMax(this.controlCoordinates.pointerOffsetY - (this.controlCoordinates.initialPointerOffsetY - this.controlCoordinates.initialOffsetY), this.controlCoordinates.limitOffsetY * (-1), this.controlCoordinates.limitOffsetY);

              if (Math.abs(this.controlCoordinates.targetOffsetX) === Math.abs(this.controlCoordinates.limitOffsetX)) {
                  this.controlCoordinates.initialOffsetX = this.controlCoordinates.targetOffsetX;
                  this.controlCoordinates.initialPointerOffsetX = this.controlCoordinates.pointerOffsetX;
              }

              if (Math.abs(this.controlCoordinates.targetOffsetY) === Math.abs(this.controlCoordinates.limitOffsetY)) {
                  this.controlCoordinates.initialOffsetY = this.controlCoordinates.targetOffsetY;
                  this.controlCoordinates.initialPointerOffsetY = this.controlCoordinates.pointerOffsetY;
              }

              this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
              this.zoomPanElement(this.controlCoordinates.targetOffsetX + "px", this.controlCoordinates.targetOffsetY + "px", this.controlCoordinates.targetScale);

            }

            if (!this.controlCoordinates.zoomed) {

                this.controlCoordinates.swipeEnd = event.pageX || event.touches[0].pageX;
                this.controlCoordinates.swipeYEnd = event.pageY || event.touches[0].pageY;
                this.controlCoordinates.swipeDiff = this.controlCoordinates.swipeStart - this.controlCoordinates.swipeEnd;
                this.controlCoordinates.swipeYDiff = this.controlCoordinates.swipeYStart - this.controlCoordinates.swipeYEnd;
                if (this.options.animationSlide) {
                    this.slide(0, -this.controlCoordinates.swipeDiff + 'px');
                }
            }

        });


        this.addEventListener(this.domNodes.image, ['touchend.' + this.eventNamespace, 'mouseup.' + this.eventNamespace, 'touchcancel.' + this.eventNamespace, 'mouseleave.' + this.eventNamespace, 'pointerup', 'pointercancel', 'MSPointerUp', 'MSPointerCancel'], (event) => {


            if (this.isTouchDevice && event.type === 'touchend') {
                this.controlCoordinates.touchCount = event.touches.length;
                if (this.controlCoordinates.touchCount === 0) /* No touch */ {
                    /* Set attributes */
                    if (this.currentImage) {
                        this.setZoomData(this.controlCoordinates.initialScale, this.controlCoordinates.targetOffsetX, this.controlCoordinates.targetOffsetY);
                    }
                    if (this.controlCoordinates.initialScale === 1) {
                        this.controlCoordinates.zoomed = false;
                        if (this.domNodes.caption.style.display === 'none') {
                            this.fadeIn(this.domNodes.caption, this.options.fadeSpeed);
                        }
                    }
                    this.controlCoordinates.initialPinchDistance = null;
                    this.controlCoordinates.capture = false;
                } else if (this.controlCoordinates.touchCount === 1) /* Single touch */ {
                    this.controlCoordinates.initialPointerOffsetX = event.touches[0].clientX;
                    this.controlCoordinates.initialPointerOffsetY = event.touches[0].clientY;
                } else if (this.controlCoordinates.touchCount > 1) /* Pinch */ {
                    this.controlCoordinates.initialPinchDistance = null;
                }
            }


            if (this.controlCoordinates.mousedown) {
                this.controlCoordinates.mousedown = false;
                let possibleDir = true;
                if (!this.options.loop) {
                    if (this.currentImageIndex === 0 && this.controlCoordinates.swipeDiff < 0) {
                        possibleDir = false;
                    }
                    if (this.currentImageIndex >= this.relatedElements.length - 1 && this.controlCoordinates.swipeDiff > 0) {
                        possibleDir = false;
                    }
                }
                if (Math.abs(this.controlCoordinates.swipeDiff) > this.options.swipeTolerance && possibleDir) {
                    this.loadImage(this.controlCoordinates.swipeDiff > 0 ? 1 : -1);
                }
                else if (this.options.animationSlide) {
                    this.slide(this.options.animationSpeed / 1000, 0 + 'px');
                }

                if (this.options.swipeClose && Math.abs(this.controlCoordinates.swipeYDiff) > 50 && Math.abs(this.controlCoordinates.swipeDiff) < this.options.swipeTolerance) {
                    this.close();
                }
            }
        });

        this.addEventListener(this.domNodes.image, ['dblclick'], (event) => {
            if(this.isTouchDevice) return;
            this.controlCoordinates.initialPointerOffsetX = event.clientX;
            this.controlCoordinates.initialPointerOffsetY = event.clientY;
            this.controlCoordinates.containerHeight = this.getDimensions(this.domNodes.image).height;
            this.controlCoordinates.containerWidth = this.getDimensions(this.domNodes.image).width;
            this.controlCoordinates.imgHeight = this.getDimensions(this.currentImage).height;
            this.controlCoordinates.imgWidth = this.getDimensions(this.currentImage).width;
            this.controlCoordinates.containerOffsetX = this.domNodes.image.offsetLeft;
            this.controlCoordinates.containerOffsetY = this.domNodes.image.offsetTop;

            this.currentImage.classList.add('sl-transition');

            if(!this.controlCoordinates.zoomed) {
                this.controlCoordinates.initialScale = this.options.doubleTapZoom;
                this.setZoomData(this.controlCoordinates.initialScale, 0, 0);
                this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
                if ((!this.domNodes.caption.style.opacity || this.domNodes.caption.style.opacity > 0) && this.domNodes.caption.style.display !== 'none') {
                    this.fadeOut(this.domNodes.caption, this.options.fadeSpeed);
                }
                this.controlCoordinates.zoomed = true;
            } else {
                this.controlCoordinates.initialScale = 1;
                this.setZoomData(this.controlCoordinates.initialScale, 0, 0);
                this.zoomPanElement(0 + "px", 0 + "px", this.controlCoordinates.initialScale);
                this.controlCoordinates.zoomed = false;
                if (this.domNodes.caption.style.display === 'none') {
                    this.fadeIn(this.domNodes.caption, this.options.fadeSpeed);
                }

            }
            setTimeout(() => {
                if (this.currentImage) {
                    this.currentImage.classList.remove('sl-transition');
                    this.currentImage.style[this.transitionPrefix + 'transform-origin'] = null;
                }
            }, 200);

            this.controlCoordinates.capture = true;
            return false;
        });

    }

    getDimensions(element) {
        let styles = window.getComputedStyle(element),
            height = element.offsetHeight,
            width = element.offsetWidth,
            borderTopWidth = parseFloat(styles.borderTopWidth),
            borderBottomWidth = parseFloat(styles.borderBottomWidth),
            paddingTop = parseFloat(styles.paddingTop),
            paddingBottom = parseFloat(styles.paddingBottom),
            borderLeftWidth = parseFloat(styles.borderLeftWidth),
            borderRightWidth = parseFloat(styles.borderRightWidth),
            paddingLeft = parseFloat(styles.paddingLeft),
            paddingRight = parseFloat(styles.paddingRight);
        return {
            height: height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom,
            width: width - borderLeftWidth - borderRightWidth - paddingLeft - paddingRight
        };
    }

    updateHash() {
        let newHash = 'pid=' + (this.currentImageIndex + 1),
            newURL = window.location.href.split('#')[0] + '#' + newHash;

        this.hashReseted = false;

        if (this.pushStateSupport) {
            window.history[this.historyHasChanges ? 'replaceState' : 'pushState']('', document.title, newURL);
        } else {
            // what is the browser target of this?
            if (this.historyHasChanges) {
                window.location.replace(newURL);
            } else {
                window.location.hash = newHash;
            }
        }
        if(!this.historyHasChanges) {
            this.urlChangedOnce = true;
        }

        this.historyHasChanges = true;
    }

    resetHash() {
        this.hashReseted = true;
        if(this.urlChangedOnce) {
            history.back();
        } else {
            if (this.pushStateSupport) {
                history.pushState('', document.title, window.location.pathname + window.location.search);
            } else {
                window.location.hash = '';
            }
        }
        //
        //in case an history operation is still pending
        clearTimeout(this.historyUpdateTimeout);
    }

    updateURL() {
        clearTimeout(this.historyUpdateTimeout);
        if (!this.historyHasChanges) {
            this.updateHash(); // first time
        } else {
            this.historyUpdateTimeout = setTimeout(this.updateHash.bind(this), 800);
        }
    }

    setCaption(captionText, imageWidth) {
        if (this.options.captions && captionText && captionText !== '' && typeof captionText !== "undefined") {
            this.hide(this.domNodes.caption);
            this.domNodes.caption.style.width = imageWidth + 'px';
            this.domNodes.caption.innerHTML = captionText;

            this.domNodes.image.appendChild(this.domNodes.caption);

            setTimeout(() => {
                this.fadeIn(this.domNodes.caption, this.options.fadeSpeed);
            }, this.options.captionDelay);
        }
    }

    slide(speed, pos) {
        if (!this.transitionCapable) {
            return this.domNodes.image.style.left = pos;
        }

        this.domNodes.image.style[this.transitionPrefix + 'transform'] = 'translateX(' + pos + ')';
        this.domNodes.image.style[this.transitionPrefix + 'transition'] = this.transitionPrefix + 'transform ' + speed + 's linear';
    }

    getRelated(rel) {
        let elems;
        if (rel && rel !== false && rel !== 'nofollow') {
            elems = Array.from(this.elements).filter(element => element.getAttribute('rel') === rel);
        } else {
            elems = this.elements;
        }
        return elems;
    }

    openImage(element) {
        element.dispatchEvent(new Event('show.' + this.eventNamespace));

        if (this.options.disableScroll) {
            this.globalScrollbarWidth = this.toggleScrollbar('hide');
        }

        if (this.options.htmlClass && this.options.htmlClass !== '') {
            document.querySelector('html').classList.add(this.options.htmlClass);
        }

        document.body.appendChild(this.domNodes.wrapper);

        this.domNodes.wrapper.appendChild(this.domNodes.image);
        if (this.options.overlay) {
            document.body.appendChild(this.domNodes.overlay);
        }

        this.relatedElements = this.getRelated(element.rel);

        if (this.options.showCounter) {
            if (this.relatedElements.length == 1 && this.domNodes.wrapper.contains(this.domNodes.counter)) {
                this.domNodes.wrapper.removeChild(this.domNodes.counter);
            } else if(this.relatedElements.length > 1 && !this.domNodes.wrapper.contains(this.domNodes.counter)) {
                this.domNodes.wrapper.appendChild(this.domNodes.counter);
            }
        }

        this.isAnimating = true;

        this.currentImageIndex = this.relatedElements.indexOf(element);

        let targetURL = element.getAttribute(this.options.sourceAttr);

        this.currentImage = document.createElement('img');
        this.currentImage.style.display = 'none';
        this.currentImage.setAttribute('src', targetURL);
        this.currentImage.dataset.scale = 1;
        this.currentImage.dataset.translateX = 0;
        this.currentImage.dataset.translateY = 0;

        if (this.loadedImages.indexOf(targetURL) === -1) {
            this.loadedImages.push(targetURL);
        }

        this.domNodes.image.innerHTML = '';
        this.domNodes.image.setAttribute('style', '');

        this.domNodes.image.appendChild(this.currentImage);


        this.fadeIn(this.domNodes.overlay, this.options.fadeSpeed);
        this.fadeIn([this.domNodes.counter, this.domNodes.navigation, this.domNodes.closeButton], this.options.fadeSpeed);

        this.show(this.domNodes.spinner);
        this.domNodes.counter.querySelector('.sl-current').innerHTML = this.currentImageIndex + 1;
        this.domNodes.counter.querySelector('.sl-total').innerHTML = this.relatedElements.length;

        this.adjustImage();
        if (this.options.preloading) {
            this.preload();
        }

        setTimeout(() => {
            element.dispatchEvent(new Event('shown.' + this.eventNamespace));
        }, this.options.animationSpeed);
    }

    forceFocus() {
        this.removeEventListener(document, 'focusin.' + this.eventNamespace);
        this.addEventListener(document, 'focusin.' + this.eventNamespace, event => {
            if (document !== event.target &&
                this.domNodes.wrapper !== event.target &&
                !this.domNodes.wrapper.contains(event.target)) {
                this.domNodes.wrapper.focus();
            }
        });
    }

    // utility
    addEventListener(elements, events, callback, opts) {
        elements = this.wrap(elements);
        events = this.wrap(events);

        for (let element of elements) {
            if (!element.namespaces) {
                element.namespaces = {};
            } // save the namespaces addEventListener the DOM element itself

            for (let event of events) {
                let options = opts || false;
                let needsPassiveFix = ['touchstart', 'touchmove'].indexOf(event.split('.')[0]) >= 0;
                if (needsPassiveFix && this.isPassiveEventsSupported) {
                    if (typeof options === 'object') {
                        options.passive = true;
                    } else {
                        options = {passive: true};
                    }
                }
                element.namespaces[event] = callback;
                element.addEventListener(event.split('.')[0], callback, options);
            }
        }
    }

    removeEventListener(elements, events) {
        elements = this.wrap(elements);
        events = this.wrap(events);
        for (let element of elements) {
            for (let event of events) {
                if(element.namespaces && element.namespaces[event]) {
                    element.removeEventListener(event.split('.')[0], element.namespaces[event]);
                    delete element.namespaces[event];
                }
            }
        }
    }

    fadeOut(elements, duration, callback) {
        elements = this.wrap(elements);
        for (let element of elements) {
            element.style.opacity = parseFloat(element) || window.getComputedStyle(element).getPropertyValue("opacity");
        }

        this.isFadeIn = false;

        let step = 16.66666 / (duration || this.options.fadeSpeed),
            fade = () => {
                let currentOpacity = parseFloat(elements[0].style.opacity);
                if ((currentOpacity -= step) < 0) {
                    for (let element of elements) {
                        element.style.display = "none";
                        // element.style.opacity = '';
                        element.style.opacity = 1;
                    }
                    callback && callback.call(this, elements);
                } else {
                    for (let element of elements) {
                        element.style.opacity = currentOpacity;
                    }
                    requestAnimationFrame(fade);
                }
            };

        fade();
    }

    fadeIn(elements, duration, callback, display) {
        elements = this.wrap(elements);
        for (let element of elements) {
            element.style.opacity = 0;
            element.style.display = display || "block";
        }

        this.isFadeIn = true;

        let opacityTarget = parseFloat(elements[0].dataset.opacityTarget || 1),
            step = (16.66666 * opacityTarget) / (duration || this.options.fadeSpeed),
            fade = () => {
                let currentOpacity = parseFloat(elements[0].style.opacity);
                if (!((currentOpacity += step) > opacityTarget)) {
                    for (let element of elements) {
                        element.style.opacity = currentOpacity;
                    }
                    if(!this.isFadeIn) return;
                    requestAnimationFrame(fade);
                } else {
                    for (let element of elements) {
                        element.style.opacity = opacityTarget;
                    }
                    callback && callback.call(this, elements);
                }
            };

        fade();
    }

    hide(elements) {
        elements = this.wrap(elements);
        for (let element of elements) {
            if(element.style.display != 'none') {
                element.dataset.initialDisplay = element.style.display;
            }
            element.style.display = 'none';
        }
    }

    show(elements, display) {
        elements = this.wrap(elements);
        for (let element of elements) {
            element.style.display = element.dataset.initialDisplay || display || 'block';
        }
    }

    wrap(input) {
        return typeof input[Symbol.iterator] === 'function' && typeof input !== 'string' ? input : [input];
    }

    on(events, callback) {
        events = this.wrap(events);
        for (let element of this.elements) {
            if (!element.fullyNamespacedEvents) {
                element.fullyNamespacedEvents = {};
            }
            for (let event of events) {
                element.fullyNamespacedEvents[event] = callback;
                element.addEventListener(event, callback);
            }
        }
        return this;
    }

    off(events) {
        events = this.wrap(events);
        for (let element of this.elements) {
            for (let event of events) {
                if (typeof element.fullyNamespacedEvents !== 'undefined' && event in element.fullyNamespacedEvents) {
                    element.removeEventListener(event, element.fullyNamespacedEvents[event]);
                }
            }
        }
        return this;
    }

    // api

    open(elem) {
        elem = elem || this.elements[0];
        if(typeof jQuery !== "undefined" && elem instanceof jQuery) {
            elem = elem.get(0);
        }
        this.initialImageIndex = this.elements.indexOf(elem);
        if(this.initialImageIndex > -1) {
            this.openImage(elem);
        }
    }

    next() {
        this.loadImage(1);
    }

    prev() {
        this.loadImage(-1);
    }

    // get some useful data
    getLighboxData() {
        return {
            currentImageIndex: this.currentImageIndex,
            currentImage: this.currentImage,
            globalScrollbarWidth: this.globalScrollbarWidth
        };
    }

    //close is exposed anyways..

    destroy() {
        //remove all custom event listeners from elements
        this.off([
            'close.' + this.eventNamespace,
            'closed.' + this.eventNamespace,
            'nextImageLoaded.' + this.eventNamespace,
            'prevImageLoaded.' + this.eventNamespace,
            'change.' + this.eventNamespace,
            'nextDone.' + this.eventNamespace,
            'prevDone.' + this.eventNamespace,
            'error.' + this.eventNamespace,
            'changed.' + this.eventNamespace,
            'next.' + this.eventNamespace,
            'prev.' + this.eventNamespace,
            'show.' + this.eventNamespace,
            'shown.' + this.eventNamespace
        ]);

        this.removeEventListener(this.elements, 'click.' + this.eventNamespace);
        this.removeEventListener(document, 'focusin.' + this.eventNamespace);
        this.removeEventListener(document.body, 'contextmenu.' + this.eventNamespace);
        this.removeEventListener(document.body, 'keyup.' + this.eventNamespace);

        this.removeEventListener(this.domNodes.navigation.getElementsByTagName('button'), 'click.' + this.eventNamespace);
        this.removeEventListener(this.domNodes.closeButton, 'click.' + this.eventNamespace);
        this.removeEventListener(window, 'resize.' + this.eventNamespace);
        this.removeEventListener(window, 'hashchange.' + this.eventNamespace);

        this.close();
        if (this.isOpen) {
            document.body.removeChild(this.domNodes.wrapper);
            document.body.removeChild(this.domNodes.overlay);
        }

        this.elements = null;
    }

    refresh() {
        if (!this.initialSelector) {
            throw 'refreshing only works when you initialize using a selector!';
        }

        let options = this.options,
            selector = this.initialSelector;

        this.destroy();

        this.constructor(selector, options);

        return this;
    }
}
export default SimpleLightbox;

global.SimpleLightbox = SimpleLightbox;