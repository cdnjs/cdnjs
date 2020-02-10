/*!
 * jQuery Popup Overlay
 *
 * @requires jQuery v1.7.1+
 * @link https://vast-engineering.github.com/jquery-popup-overlay/
 */
;(function ($) { /* eslint-disable-line */

    var $window = $(window);
    var options = {};
    var zindexvalues = [];
    var lastclicked = [];
    var scrollbarwidth;
    var bodymarginright = null;
    var opensuffix = '_open';
    var closesuffix = '_close';
    var visiblePopupsArray = [];
    var transitionsupport = null;
    var opentimer;
    var iOS = /(iPad|iPhone|iPod)/.test(navigator.userAgent);
    var focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";

    var methods = {

        _init: function (el) {
            var $el = $(el);
            var options = $el.data('popupoptions');
            lastclicked[el.id] = false;
            zindexvalues[el.id] = 0;

            if (!$el.data('popup-initialized')) {
                $el.attr('data-popup-initialized', 'true');
                methods._initonce(el);
            }

            if (options.autoopen) {
                setTimeout(function() {
                    methods.show(el, 0);
                }, 0);
            }
        },

        _initonce: function (el) {
            var $el = $(el);
            var $body = $('body');
            var $wrapper;
            var options = $el.data('popupoptions');

            bodymarginright = parseInt($body.css('margin-right'), 10);
            transitionsupport = document.body.style.webkitTransition !== undefined ||
                                document.body.style.MozTransition !== undefined ||
                                document.body.style.msTransition !== undefined ||
                                document.body.style.OTransition !== undefined ||
                                document.body.style.transition !== undefined;

            if (options.scrolllock) {
                // Calculate the browser's scrollbar width dynamically
                var parent;
                var child;
                if (typeof scrollbarwidth === 'undefined') {
                    parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
                    child = parent.children();
                    scrollbarwidth = child.innerWidth() - child.height(99).innerWidth();
                    parent.remove();
                }
            }

            if (!$el.attr('id')) {
                $el.attr('id', 'j-popup-' + parseInt((Math.random() * 100000000), 10));
            }

            $el.addClass('popup_content');

            if ((options.background) && (!$('#' + el.id + '_background').length)) {

                $body.append('<div id="' + el.id + '_background" class="popup_background"></div>');

                var $background = $('#' + el.id + '_background');

                $background.css({
                    opacity: 0,
                    visibility: 'hidden',
                    backgroundColor: options.color,
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                });

                if (options.setzindex && !options.autozindex) {
                    $background.css('z-index', '100000');
                }

                if (options.transition) {
                    $background.css('transition', options.transition);
                }
            }

            $body.append(el);

            $el.wrap('<div id="' + el.id + '_wrapper" class="popup_wrapper" />');

            $wrapper = $('#' + el.id + '_wrapper');

            $wrapper.css({
                opacity: 0,
                visibility: 'hidden',
                position: 'absolute'
            });

            // Make div clickable in iOS
            if (iOS) {
                $background = $('#' + el.id + '_background');
                $background.css('cursor', 'pointer');
                $(options.pagecontainer).css('cursor', 'pointer');
            }

            if (options.type == 'overlay' && !options.absolute && options.background) {
                $wrapper.css('overflow','auto');
                $wrapper[0].style.WebkitOverflowScrolling = 'touch'; // for smooth scrolling in overflow:auto divs in iOS
            }

            $el.css({
                opacity: 0,
                visibility: 'hidden',
                'pointer-events': 'auto', // reset pointer events back to default for a child element
                display: 'inline-block'
            });

            if (options.setzindex && !options.autozindex) {
                $wrapper.css('z-index', '100001');
            }

            if (!options.outline) {
                $el.css('outline', 'none');
            }

            if (options.transition) {
                $el.css('transition', options.transition);
                $wrapper.css('transition', options.transition);
            }

            // Hide popup content from screen readers initially
            $el.attr('aria-hidden', true);

            if (options.type == 'overlay') {
                $el.css({
                    textAlign: 'left',
                    position: 'relative',
                    verticalAlign: 'middle'
                });

                $wrapper.css({
                    position: 'fixed',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    textAlign: 'center'
                });

                // CSS vertical align helper
                $wrapper.append('<div class="popup_align" />');

                $('.popup_align').css({
                    display: 'inline-block',
                    verticalAlign: 'middle',
                    height: '100%'
                });
            }

            // Add WAI ARIA role to announce dialog to screen readers
            $el.attr('role', 'dialog');

            var openelement =  (options.openelement) ? options.openelement : ('.' + el.id + opensuffix);

            $(openelement).each(function (i, item) {
                $(item).attr('data-popup-ordinal', i);

                if (!item.id) {
                    $(item).attr('id', 'open_' + parseInt((Math.random() * 100000000), 10));
                }
            });

            // Set aria-labelledby (if aria-label or aria-labelledby is not set in html)
            if (!($el.attr('aria-labelledby') || $el.attr('aria-label'))) {
                $el.attr('aria-labelledby', $(openelement).attr('id'));
            }

            // Show and hide tooltips on hover
            if(options.action == 'hover'){
                options.keepfocus = false;

                // Handler: mouseenter, focusin
                $(openelement).on('mouseenter', function () {
                    methods.show(el, $(this).data('popup-ordinal'));
                });

                // Handler: mouseleave, focusout
                $(openelement).on('mouseleave', function () {
                    methods.hide(el);
                });

            } else {

                // Handler: Show popup when clicked on `open` element
                $(document).on('click.jqp', openelement, function (event) {
                    event.preventDefault();

                    var ord = $(this).data('popup-ordinal');
                    setTimeout(function() { // setTimeout is to allow `close` method to finish (for issues with multiple tooltips)
                        methods.show(el, ord);
                    }, 0);
                });
            }

            if (options.closebutton) {
                methods.addclosebutton(el);
            }

            if (options.detach) {
                $el.detach();
            } else {
                $el.hide();
            }
        },

        /**
         * Show method
         *
         * @param {object} el - popup instance DOM node
         * @param {number} ordinal - order number of an `open` element
         */
        show: function (el, ordinal) {
            var $el = $(el);

            if ($el.data('popup-visible')) return;

            // Initialize if not initialized. Required for: $('#popup').popup('show')
            if (!$el.data('popup-initialized')) {
                methods._init(el);
            }
            $el.attr('data-popup-initialized', 'true');

            var $body = $('body');
            var options = $el.data('popupoptions');
            var $wrapper = $('#' + el.id + '_wrapper');
            var $background = $('#' + el.id + '_background');

            // `beforeopen` callback event
            callback(el, ordinal, options.beforeopen);

            // Remember last clicked place
            lastclicked[el.id] = ordinal;

            // Add popup id to visiblePopupsArray
            setTimeout(function() {
                visiblePopupsArray.push(el.id);
            }, 0);

            // Calculating maximum z-index
            if (options.autozindex) {

                var elements = document.getElementsByTagName('*');
                var len = elements.length;
                var maxzindex = 0;

                for(var i=0; i<len; i++){

                    var elementzindex = $(elements[i]).css('z-index');

                    if(elementzindex !== 'auto'){

                      elementzindex = parseInt(elementzindex, 10);

                      if(maxzindex < elementzindex){
                        maxzindex = elementzindex;
                      }
                    }
                }

                zindexvalues[el.id] = maxzindex;

                // Add z-index to the background
                if (options.background) {
                    if (zindexvalues[el.id] >= 0) {
                        $('#' + el.id + '_background').css({
                            zIndex: (zindexvalues[el.id] + 1)
                        });
                    }
                }

                // Add z-index to the wrapper
                if (zindexvalues[el.id] >= 0) {
                    $wrapper.css({
                        zIndex: (zindexvalues[el.id] + 2)
                    });
                }
            }

            if (options.detach) {
                $wrapper.prepend(el);
                $el.show();
            } else {
                $el.show();
            }

            opentimer = setTimeout(function() {
                $wrapper.css({
                    visibility: 'visible',
                    opacity: 1
                });

                $('html').addClass('popup_visible').addClass('popup_visible_' + el.id);
                $wrapper.addClass('popup_wrapper_visible');
            }, 20); // 20ms required for opening animation to occur in FF

            // Disable background layer scrolling when popup is opened
            if (options.scrolllock) {
                $body.css('overflow', 'hidden');
                if ($body.height() > $window.height()) {
                    $body.css('margin-right', bodymarginright + scrollbarwidth);
                }
            }

            $el.css({
                'visibility': 'visible',
                'opacity': 1
            });

            // Show background
            if (options.background) {
                $background.css({
                    'visibility': 'visible',
                    'opacity': options.opacity
                });

                // Fix IE8 issue with background not appearing
                setTimeout(function() {
                    $background.css({
                        'opacity': options.opacity
                    });
                }, 0);
            }

            $el.data('popup-visible', true);

            // Position popup
            methods.reposition(el, ordinal);

            // Remember which element had focus before opening a popup
            $el.data('focusedelementbeforepopup', document.activeElement);

            // Make holder div programatically focusable with tabindex:-1 (tabindex:0 is keyboard focusable)
            $el.attr('tabindex', -1);

            // Focus the popup or user specified element.
            // Initial timeout of 50ms is set to give some time to popup to show after clicking on
            // `open` element, and after animation is complete to prevent background scrolling.
            setTimeout(function() {
                if (options.focuselement === 'closebutton') { // e.g. focuselement:'closebutton'
                    $('#' + el.id + ' .' + el.id + closesuffix + ':first').focus();
                } else if (options.focuselement) { // e.g. focuselement:'#my-close-button'
                    $(options.focuselement).focus();
                } else if (options.focuselement === true || options.keepfocus) { // e.g. focuselement:true OR keepfocus:true
                    $el.focus();
                }
            }, options.focusdelay);

            // Hide main content from screen readers
            if (options.keepfocus) {
                $(options.pagecontainer).attr('aria-hidden', true);
            }

            // Reveal popup content to screen readers
            $el.attr('aria-hidden', false);

            callback(el, ordinal, options.onopen);

            if (transitionsupport) {
                $wrapper.one('transitionend', function() {
                    callback(el, ordinal, options.opentransitionend);
                });
            } else {
                callback(el, ordinal, options.opentransitionend);
            }

            // Handler: Reposition tooltip when window is resized
            if (options.type == 'tooltip') {
                $(window).on('resize.' + el.id, function () {
                    methods.reposition(el, ordinal);
                });
            }
        },

        /**
         * Hide method
         *
         * @param object el - popup instance DOM node
         * @param boolean outerClick - click on the outer content below popup
         */
        hide: function (el, outerClick) {
            // Get index of popup ID inside of visiblePopupsArray
            var popupIdIndex = $.inArray(el.id, visiblePopupsArray);

            // If popup is not opened, ignore the rest of the function
            if (popupIdIndex === -1) {
                return;
            }

            if(opentimer) clearTimeout(opentimer);

            var $body = $('body');
            var $el = $(el);
            var options = $el.data('popupoptions');
            var $wrapper = $('#' + el.id + '_wrapper');
            var $background = $('#' + el.id + '_background');

            $el.data('popup-visible', false);

            if (visiblePopupsArray.length === 1) {
                $('html').removeClass('popup_visible').removeClass('popup_visible_' + el.id);
            } else {
                if($('html').hasClass('popup_visible_' + el.id)) {
                    $('html').removeClass('popup_visible_' + el.id);
                }
            }

            // Remove popup from the visiblePopupsArray
            visiblePopupsArray.splice(popupIdIndex, 1);

            if($wrapper.hasClass('popup_wrapper_visible')) {
                $wrapper.removeClass('popup_wrapper_visible');
            }

            // Focus back on saved element
            if (options.keepfocus && !outerClick) {
                setTimeout(function() {
                    if ($($el.data('focusedelementbeforepopup')).is(':visible')) {
                        $el.data('focusedelementbeforepopup').focus();
                    }
                }, 0);
            }

            // Hide popup
            $wrapper.css({
                'visibility': 'hidden',
                'opacity': 0
            });
            $el.css({
                'visibility': 'hidden',
                'opacity': 0
            });

            // Hide background
            if (options.background) {
                $background.css({
                    'visibility': 'hidden',
                    'opacity': 0
                });
            }

            // Reveal main content to screen readers
            $(options.pagecontainer).attr('aria-hidden', false);

            // Hide popup content from screen readers
            $el.attr('aria-hidden', true);

            // `onclose` callback event
            callback(el, lastclicked[el.id], options.onclose);

            if (transitionsupport && $el.css('transition-duration') !== '0s') {
                $el.one('transitionend', function() {

                    if (!($el.data('popup-visible'))) {
                        if (options.detach) {
                            $el.detach();
                        } else {
                            $el.hide();
                        }
                    }

                    // Re-enable scrolling of background layer, if needed
                    if (options.scrolllock) {
                        setTimeout(function() {
                            if ($.grep(visiblePopupsArray, function(eid) { return $("#"+eid).data('popupoptions').scrolllock }).length) {
                                // Some "scolllock=true" popup is currently visible, leave scrolling disabled
                                return;
                            }
                            $body.css({
                                overflow: 'visible',
                                'margin-right': bodymarginright
                            });
                        }, 10); // 10ms added for CSS transition in Firefox which doesn't like overflow:auto
                    }

                    callback(el, lastclicked[el.id], options.closetransitionend);
                });
            } else {
                if (options.detach) {
                    $el.detach();
                } else {
                    $el.hide();
                }

                // Re-enable scrolling of background layer, if needed
                if (options.scrolllock) {
                    setTimeout(function() {
                        if ($.grep(visiblePopupsArray, function(eid) { return $("#"+eid).data('popupoptions').scrolllock }).length) {
                            // Some "scrolllock=true" popup is currently visible, leave scrolling disabled
                            return;
                        }
                        $body.css({
                            overflow: 'visible',
                            'margin-right': bodymarginright
                        });
                    }, 10); // 10ms added for CSS transition in Firefox which doesn't like overflow:auto
                }

                callback(el, lastclicked[el.id], options.closetransitionend);
            }

            if (options.type == 'tooltip') {
                $(window).off('resize.' + el.id);
            }
        },

        /**
         * Toggle method
         *
         * @param {object} el - popup instance DOM node
         * @param {number} ordinal - order number of an `open` element
         */
        toggle: function (el, ordinal) {
            if ($(el).data('popup-visible')) {
                methods.hide(el);
            } else {
                setTimeout(function() {
                    methods.show(el, ordinal);
                }, 0);
            }
        },

        /**
         * Reposition method
         *
         * @param {object} el - popup instance DOM node
         * @param {number} ordinal - order number of an `open` element
         */
        reposition: function (el, ordinal) {
            var $el = $(el);
            var options = $el.data('popupoptions');
            var $wrapper = $('#' + el.id + '_wrapper');

            ordinal = ordinal || 0;

            // Tooltip type
            if (options.type == 'tooltip') {
                // TODO: this static assignments should probably be moved to init method
                $wrapper.css({
                    'position': 'absolute'
                });

                var $tooltipanchor;
                if (options.tooltipanchor) {
                    $tooltipanchor = $(options.tooltipanchor);
                } else if (options.openelement) {
                    $tooltipanchor = $(options.openelement).filter('[data-popup-ordinal="' + ordinal + '"]');
                } else {
                    $tooltipanchor = $('.' + el.id + opensuffix + '[data-popup-ordinal="' + ordinal + '"]');
                }

                var linkOffset = $tooltipanchor.offset() || { left: 0, top: 0 };

                // Horizontal position for tooltip
                if (options.horizontal == 'right') {
                    $wrapper.css('left', linkOffset.left + $tooltipanchor.outerWidth() + options.offsetleft);
                } else if (options.horizontal == 'leftedge') {
                    $wrapper.css('left', linkOffset.left +  options.offsetleft);
                } else if (options.horizontal == 'left') {
                    $wrapper.css('right', $window.width() - linkOffset.left  - options.offsetleft);
                } else if (options.horizontal == 'rightedge') {
                    $wrapper.css('right', $window.width()  - linkOffset.left - $tooltipanchor.outerWidth() - options.offsetleft);
                } else {
                    $wrapper.css('left', linkOffset.left + ($tooltipanchor.outerWidth() / 2) - ($el.outerWidth() / 2) - parseFloat($el.css('marginLeft')) + options.offsetleft);
                }

                // Vertical position for tooltip
                if (options.vertical == 'bottom') {
                    $wrapper.css('top', linkOffset.top + $tooltipanchor.outerHeight() + options.offsettop);
                } else if (options.vertical == 'bottomedge') {
                    $wrapper.css('top', linkOffset.top + $tooltipanchor.outerHeight() - $el.outerHeight() + options.offsettop);
                } else if (options.vertical == 'top') {
                    $wrapper.css('bottom', $window.height() - linkOffset.top - options.offsettop);
                } else if (options.vertical == 'topedge') {
                    $wrapper.css('bottom', $window.height() - linkOffset.top - $el.outerHeight() - options.offsettop);
                } else {
                    $wrapper.css('top', linkOffset.top + ($tooltipanchor.outerHeight() / 2) - ($el.outerHeight() / 2) - parseFloat($el.css('marginTop')) + options.offsettop);
                }

            // Overlay type
            } else if (options.type == 'overlay') {
                // TODO all static assignments in this block should probably be moved to init method

                // Horizontal position for overlay
                if (options.horizontal) {
                    $wrapper.css('text-align', options.horizontal);
                } else {
                    $wrapper.css('text-align', 'center');
                }

                // Vertical position for overlay
                if (options.vertical) {
                    $el.css('vertical-align', options.vertical);
                } else {
                    $el.css('vertical-align', 'middle');
                }

                if (options.absolute) {
                    $wrapper.css({
                        position: 'absolute',
                        top: window.scrollY
                    });
                }

                if (!options.background) {
                    $wrapper.css({ 'pointer-events': 'none' });

                    // If popup doesnt fit the viewport, and if background doesn't exist, add scrollbar to popup div instead of wrapper
                    if (!options.absolute && !isInViewport(el)) {
                        $el.css('overflow', 'auto');
                        $el[0].style.WebkitOverflowScrolling = 'touch'; // for smooth scrolling in overflow:auto divs in iOS
                        $el.css('max-height', 'calc(100% - ' + $el.css('margin-top') + ' - ' +  $el.css('margin-bottom') + ')');
                    }
                }
            }
        },

        /**
         * Add-close-button method
         *
         * @param {object} el - popup instance DOM node
         */
        addclosebutton: function (el) {
            var genericCloseButton;

            if ($(el).data('popupoptions').closebuttonmarkup) {
                genericCloseButton = $(options.closebuttonmarkup).addClass(el.id + '_close');
            } else {
                genericCloseButton = '<button class="popup_close ' + el.id + '_close" title="Close" aria-label="Close"><span aria-hidden="true">×</span></button>';
            }

            if ($(el).data('popup-initialized')){
                $(el).append(genericCloseButton);
            }

        }

    };

    /**
     * Callback event calls
     *
     * @param {object} el - popup instance DOM node
     * @param {number} ordinal - order number of an `open` element
     * @param {function} func - callback function
     */
    var callback = function (el, ordinal, func) {
        var options = $(el).data('popupoptions');
        var openelement;
        var elementclicked;
        if (typeof options === 'undefined') return;
        openelement =  options.openelement ? options.openelement : ('.' + el.id + opensuffix);
        elementclicked = $(openelement + '[data-popup-ordinal="' + ordinal + '"]');
        if (typeof func == 'function') {
            func.call($(el), el, elementclicked);
        }
    };

    /**
     * Check if element is fully in viewport
     *
     * @param {object} el - popup instance DOM node
     */
    var isInViewport = function (el) {
        var bounding = el.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    // Hide popup if ESC key is pressed
    $(document).on('keydown', function (event) {
        if(visiblePopupsArray.length) {
            var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
            var el = document.getElementById(elementId);

            if ($(el).data('popupoptions').escape && event.keyCode == 27) {
                methods.hide(el);
            }
        }
    });

    var mousedownTarget;

    $(document).on('mousedown', function (event) {
        mousedownTarget = event.target;
    });

    // Hide popup on click
    $(document).on('click', function (event) {
        if(visiblePopupsArray.length) {
            var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
            var el = document.getElementById(elementId);
            var closeButton = ($(el).data('popupoptions').closeelement) ? $(el).data('popupoptions').closeelement : ('.' + el.id + closesuffix);

            // If Close button clicked
            if ($(event.target).closest(closeButton).length) {
                event.preventDefault();
                methods.hide(el);
            }

            // If clicked outside of popup
            if ($(el).data('popupoptions')
                && $(el).data('popupoptions').blur
                && !$(event.target).closest($(el).data('popupoptions').blurignore).length
                && !$(event.target).closest('#' + elementId).length
                && !$(mousedownTarget).closest('#' + elementId).length
                && event.which !== 2
                && $(event.target).is(':visible')) {

                if ($(el).data('popupoptions').background) {
                    // If clicked on popup cover
                    methods.hide(el);

                    // Older iOS/Safari will trigger a click on the elements below the cover,
                    // when tapping on the cover, so the default action needs to be prevented.
                    event.preventDefault();

                } else {
                    // If clicked on outer content
                    methods.hide(el, true);
                }
            }
        }
    });

    // Keep keyboard focus inside of popup
    $(document).on('keydown', function(event) {
        if(visiblePopupsArray.length && event.which == 9) {
            // If tab or shift-tab pressed
            var elementId = visiblePopupsArray[visiblePopupsArray.length - 1];
            var el = document.getElementById(elementId);
            var options = $(el).data('popupoptions');

            // If the last opened popup doesn't have `keepfocus` option, ignore the rest and don't lock the focus inside of popup.
            if (!options.keepfocus) {
                return;
            }

            // Get list of all children elements in given object
            var popupItems = $(el).find('*');

            // Get list of focusable items
            var focusableItems = popupItems.filter(focusableElementsString).filter(':visible');

            // Get currently focused item
            var focusedItem = $(':focus');

            // Get the number of focusable items
            var numberOfFocusableItems = focusableItems.length;

            // Get the index of the currently focused item
            var focusedItemIndex = focusableItems.index(focusedItem);

            // If popup doesn't contain focusable elements, focus popup itself
            if (numberOfFocusableItems === 0) {
                $(el).focus();
                event.preventDefault();
            } else {
                if (event.shiftKey) {
                    // Back tab
                    // If focused on first item and user preses back-tab, go to the last focusable item
                    if (focusedItemIndex === 0) {
                        focusableItems.get(numberOfFocusableItems - 1).focus();
                        event.preventDefault();
                    }

                } else {
                    // Forward tab
                    // If focused on the last item and user preses tab, go to the first focusable item
                    if (focusedItemIndex == numberOfFocusableItems - 1) {
                        focusableItems.get(0).focus();
                        event.preventDefault();
                    }
                }
            }
        }
    });

    /**
     * Plugin API
     */
    $.fn.popup = function (customoptions) {
        return this.each(function () {

            var $el = $(this);
            var newDefaults = $.extend(true, {}, $.fn.popup.defaults);

            // Set defaults for tooltips dynamically instead of implicitly, so they can be overriden with custom options.
            if (customoptions && customoptions.type === 'tooltip') {
                newDefaults.background = false;
            }

            if (typeof customoptions === 'object') {  // e.g. $('#popup').popup({'color':'blue'})
                var opt = $.extend({}, newDefaults, $el.data('popupoptions'), customoptions);
                $el.data('popupoptions', opt);
                options = $el.data('popupoptions');

                methods._init(this);

            } else if (typeof customoptions === 'string') { // e.g. $('#popup').popup('hide')
                if (!($el.data('popupoptions'))) {
                    $el.data('popupoptions', newDefaults);
                    options = $el.data('popupoptions');
                }

                methods[customoptions].call(this, this);

            } else { // e.g. $('#popup').popup()
                if (!($el.data('popupoptions'))) {
                    $el.data('popupoptions', newDefaults);
                    options = $el.data('popupoptions');
                }

                methods._init(this);

            }

        });
    };

    // destroy all popups
    $.fn.popup.destroyall = function () {
        // TODO: create tests to check if we can use `hide` method (perhaps we'll need to remove transitions)
        // or we need another way of removing the data when destroying.
        for(var i=0; i < visiblePopupsArray.length; i++) {
            $('#' + visiblePopupsArray[i]).popup('hide');
        }
        $('.popup_wrapper').remove();
        $('.popup_background').remove();
        // visiblePopupsArray = []; // TODO: check if we need this for SPA and popups with fadeOut animation and scrolllock
        $(document).off('click.jqp');
    };

    $.fn.popup.defaults = {
        type: 'overlay',
        absolute: false,
        autoopen: false,
        background: true,
        color: 'black',
        opacity: '0.5',
        horizontal: 'center',
        vertical: 'middle',
        offsettop: 0,
        offsetleft: 0,
        escape: true,
        blur: true,
        blurignore: null,
        setzindex: true,
        autozindex: false,
        scrolllock: false,
        closebutton: false,
        closebuttonmarkup: null,
        keepfocus: true,
        focuselement: null,
        focusdelay: 50,
        outline: false,
        pagecontainer: null,
        detach: false,
        openelement: null,
        closeelement: null,
        transition: null,
        tooltipanchor: null,
        beforeopen: null,
        onclose: null,
        onopen: null,
        opentransitionend: null,
        closetransitionend: null
    };

})(jQuery); /* eslint-disable-line */
