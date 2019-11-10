/**
 * jQuery Popup Overlay
 *
 * @version 1.4.0
 * @requires jQuery v1.7.1+
 * @link http://vast-eng.github.com/jquery-popup-overlay/
 * @author Ivan Lazarevic
 */

;(function($) {

    var level = [];
    var lastclicked = [];

    $.fn.popup = $.fn.popup = function(customoptions) {

        var $body = $('body'),
            $window = $(window),
            $document = $(document),
            $el,
            $newel,
            $wrapper,
            options = {},
            blurhandler,
            focushandler,
            defaults = {
                type: 'overlay',
                action: 'click',
                background: true,
                color: 'black',
                opacity: '0.4',
                horizontal: 'center',
                vertical: 'center',
                escape: true,
                blur: true,
                fade: 250,
                opensufix: '_open',
                closesufix: '_close',
                keepfocus: true,
                reposition: false,
                autozindex: false
            };

        var init = function(el) {

                if(!$(el).attr('id')){
                    $(el).attr('id', 'j-popup-' + parseInt(Math.random() * 100000000));
                }

                lastclicked[el.id] = false;
                level[el.id] = 0;
                $el = $(el);
                options = $.extend({}, defaults, customoptions);

                /**
                 * Repositioningtion parameter
                 */
                if (options.reposition === true) {
                    // @TODO - not so DRY...
                    $newel = $el;
                    $el = $wrapper = $('#' + el.id + '_wrapper');
                    positionpopup(el);
                    return false;
                }

                // initialize on only once
                if ($el.attr('data-popup-initialized')) {
                    return false;
                }
                $el.attr('data-popup-initialized', 'true');

                /**
                 * Set variables
                 */
                var triggerelement = '.' + el.id + options.opensufix; // class that will open popup


                /**
                 * Set other options that are related for type: tooltip
                 */
                if (options.type == 'tooltip') {
                    options.background = false;
                    options.keepfocus = false;
                }

                /**
                 * Hide popups that aren't already hidden with CSS and move it to the top or bottom of the <body> tag
                 */
                $el.css({
                    display: 'none'
                });
                // append instead of prepend if document is ready
                // if (((document.readyState === 'interactive') || (document.readyState === 'complete')) && !($.browser.msie && parseFloat($.browser.version) < 8)) {
                //  $body.append(el);
                // } else {
                $body.prepend(el);
                // }

                /**
                 * Create background div and append to the top or bottom of the body tag
                 */
                if ((options.background) && (!$('#' + el.id + '_background').length)) {

                    // Append instead of prepend if possible
                    var popupback = '<div id="' + el.id + '_background" class="popup_background"></div>';
                    // if (((document.readyState === 'interactive') || (document.readyState === 'complete')) && !($.browser.msie && parseFloat($.browser.version) < 8)) {
                    //  $body.append(popupback);
                    // } else {
                    $body.prepend(popupback);
                    // }

                    $('#' + el.id + '_background').css({
                        backgroundColor: options.color,
                        opacity: options.opacity,
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        bottom: '0',
                        left: '0',
                        display: 'none'
                    });

                }

                /**
                 * Positioning overlay
                 */
                if (options.type == 'overlay') {

                    $el.css({
                        display: 'inline-block',
                        textAlign: 'left',
                        position: 'relative',
                        verticalAlign: 'middle'
                    }).addClass('popup_content');

                    $el.wrap('<div id="' + el.id + '_wrapper" class="popup_wrapper" />');
                    $wrapper = $('#' + el.id + '_wrapper');
                    $wrapper.css({
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        display: 'none',
                        textAlign: 'center'
                    });

                    $wrapper.append('<div class="popup_align" />');
                    $('.popup_align').css({
                        display: 'inline-block',
                        verticalAlign: 'middle',
                        height: '100%'
                    });

                    // overlay horizontal
                    if (options.horizontal == 'right') {
                        $wrapper.css('text-align', 'right');
                    } else if (options.horizontal == 'left') {
                        $wrapper.css('text-align', 'left');
                    }

                    // overlay vertical
                    if (options.vertical == 'bottom') {
                        $el.css('vertical-align', 'bottom');
                    } else if (options.vertical == 'top') {
                        $el.css('vertical-align', 'top');
                    }

                    $newel = $el;
                    $el = $wrapper;
                }

                /**
                 * add data-popup-order attribute
                 */
                $(triggerelement).each(function(i, item) {
                    $(item).attr('data-popup-order', i);
                });

                /**
                 * Defining on which event to open/close popup
                 */
                if (options.action == 'click') {
                    // open
                    $(triggerelement).click(function(e) {
                        if ($el.is(':hidden')) {
                            var or = $(this).attr('data-popup-order');
                            dopopup(el, or);
                            e.preventDefault();
                        }
                    });
                    //
                    $('.' + el.id + options.closesufix).click(function(e) {
                        hidePopUp(el);
                        e.preventDefault();
                    });
                } else if (options.action == 'hover') {
                    $(triggerelement).mouseenter(

                    function() {
                        dopopup(el, $(this).attr('data-popup-order'));
                    });
                    $(triggerelement).mouseleave(

                    function() {
                        hidePopUp(el);
                    });
                } else {
                    $(triggerelement).mouseover(

                    function() {
                        dopopup(el, $(this).attr('data-popup-order'));
                    });
                    $(triggerelement).mouseout(

                    function() {
                        hidePopUp(el);
                    });
                }

                /**
                 * Close popup on ESC key (binded only if a popup is open)
                 */
                if (options.escape) {
                    $(document).keydown(function(e) {
                        if (e.keyCode == 27 && $el.css('display') == 'block') {
                            hidePopUp(el);
                        }
                    });
                }

                /**
                 * Repositioning popup when window resize
                 */
                $(window).bind('resize', function() {
                    if (options.type != 'tooltip') {
                        positionpopup(el);
                    }
                });


                /**
                 * Z-index calculation
                 */
                if (options.autozindex === true) {
                    var maxZIndex = Math.max(0, Math.max.apply(null, $.map($.makeArray(document.getElementsByTagName("*")), function(v) {
                        return parseFloat($(v).css("z-index")) || null;
                    })));
                    level[el.id] = maxZIndex;

                    // add z-index to the wrapper
                    if (level[el.id] > 0) {
                        $el.css({
                            zIndex: (level[el.id] + 2)
                        });
                    }

                    // add z-index to the background
                    if (options.background) {
                        if (level[el.id] > 0) {
                            $('#' + el.id + '_background').css({
                                zIndex: (level[el.id] + 1)
                            });
                        }
                    }
                }

                /**
                 * Automaticaly open popup on start, if autoopen option is set
                 */
                if (options.autoopen) {
                    dopopup(el, 0);
                }

            }; // init
        /**
         * Popup method
         *
         * @param el - popup element
         * @param order - element which triggered this method
         */
        var dopopup = function(el, order) {

                var clickplace = order;

                /**
                 * beforeopen Callback
                 */
                callback(options.beforeopen, clickplace);

                // remember last clicked place
                lastclicked[el.id] = clickplace;

                // show popup
                if (options.fade) {
                    $el.fadeIn(options.fade, function() {
                        $(document).on('click', blurhandler);
                        $(document).on('focusin', focushandler);
                    });
                } else {
                    $el.show();
                    setTimeout(function() {
                        $(document).on('click', blurhandler);
                        $(document).on('focusin', focushandler);
                    }, 0);
                }

                // position
                positionpopup(el, clickplace);


                // show background
                if (options.background) {
                    if (options.fade) {
                        $('#' + el.id + '_background').fadeIn(options.fade);
                    } else {
                        $('#' + el.id + '_background').show();
                    }
                }

                /**
                 * Keep focus inside dialog box
                 */
                if (options.keepfocus) {

                    // make overlay holder div focusable and focus it
                    $newel.attr('tabindex', -1).focus();

                    focushandler = function(e) {
                        if (!$(e.target).parents().andSelf().is('#' + el.id)) {
                            $newel.focus();
                        }
                    };

                }

                /**
                 * onOpen Callback
                 */
                callback(options.onOpen, clickplace);

                /**
                 * Close popup on blur
                 */
                if (options.blur) {
                    blurhandler = function(e) {
                        if (!$(e.target).parents().andSelf().is('#' + el.id)) {
                            hidePopUp(el);
                        }
                    };
                }

            };

        /**
         * Position popup
         *
         * @param el
         */
        var positionpopup = function(el, clickplace) {
                clickplace = clickplace || 0;

                // TOOLTIP
                if (options.type == 'tooltip') {
                    $el.css({
                        'position': 'absolute'
                    });
                    var $link = $('.' + el.id + options.opensufix + '[data-popup-order="' + clickplace + '"]');
                    var linkOffset = $link.offset();

                    // tooltip horizontal
                    if (options.horizontal == 'right') {
                        $el.css('left', linkOffset.left + $link.outerWidth());
                    } else if (options.horizontal == 'left') {
                        $el.css('right', $(window).width() - linkOffset.left);
                    } else {
                        $el.css('left', linkOffset.left + ($link.outerWidth() / 2) - ($(el).outerWidth() / 2) - parseFloat($(el).css('marginLeft')) );
                    }

                    // tooltip vertical
                    if (options.vertical == 'bottom') {
                        $el.css('top', linkOffset.top + $link.outerHeight());
                    } else if (options.vertical == 'top') {
                        $el.css('bottom', $(window).height() - linkOffset.top);
                    } else {
                        $el.css('top', linkOffset.top + ($link.outerHeight() / 2) - ($(el).outerHeight() / 2) - parseFloat($(el).css('marginTop')) );
                    }

                // OVERLAY
                } else if (options.type == 'overlay') {
                    // if height of the popup exceeds the visible area – make the popup scrollable
                    if ($window.height() < ($newel.outerHeight() + parseFloat($newel.css('marginTop')) + parseFloat($newel.css('marginBottom')))) {
                        $el.css({
                            position: 'absolute',
                            top: $window.scrollTop()
                        });
                    } else {
                        $el.css({
                            position: 'fixed',
                            top: '0'
                        });
                    }
                }

            };

        /**
         * Hide popup
         *
         * @param {DOM Object} el
         */
        var hidePopUp = function(el) {

                // hide background
                if (options.background) {
                    if (options.fade) {
                        $('#' + el.id + '_background').fadeOut(options.fade);
                    } else {
                        $('#' + el.id + '_background').hide();
                    }
                }

                // unbind event for blur when popup closes
                if (options.blur) {
                    $(document).off('click', blurhandler);
                }

                if (options.keepfocus) {
                    $(document).off('focusin', focushandler);
                    // focus opening link on popup close
                    $('.' + el.id + options.opensufix).focus();
                }

                // hide popup
                if (options.fade) {
                    $el.fadeOut(options.fade);
                } else {
                    $el.hide();
                }

                /**
                 * onClose callback
                 */
                callback(options.onClose, lastclicked[el.id]);
            };

        /**
         * Callbacks calls
         *
         * @param func - callback function
         * @param clickplace
         */
        var callback = function(func, clickplace) {
                var cp = $('.' + $el.attr('id') + options.opensufix + '[data-popup-order="' + clickplace + '"]');
                if (typeof func == 'function') {
                    func(cp);
                }
            };

        this.each(function() {
            init(this);
        });

    }; // fn.popup

})(jQuery);