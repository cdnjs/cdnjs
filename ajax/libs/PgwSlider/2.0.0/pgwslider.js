/**
 * PgwSlider - Version 2.0
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
 */
;(function($){
    $.fn.pgwSlider = function(options) {

        var defaults = {
            mainClassName : 'pgwSlider',
            listPosition : 'right',
            selectionMode : 'click',
            autoSlide : true,
            verticalCentering : false,
            beforeSlide : null,
            afterSlide : null,
            maxHeight : null,
            adaptiveHeight : false,
            adaptiveDuration : 200,
            transitionDuration : 600,
            intervalDuration : 3000
        };

        if (this.length == 0) {
            return this;
        } else if(this.length > 1) {
            this.each(function() {
                $(this).pgwSlider(options);
            });
            return this;
        }

        var pgwSlider = this;
        pgwSlider.plugin = this;
        pgwSlider.data = [];
        pgwSlider.config = {};
        pgwSlider.currentSlide = 0;
        pgwSlider.slideCount = 0;
        pgwSlider.eventInterval = null;
        pgwSlider.eventResize = null;
        pgwSlider.eventAdaptive = null;
        pgwSlider.window = $(window);

        // Init
        var init = function() {

            // Merge user options with the default configuration
            pgwSlider.config = $.extend({}, defaults, options);

            // Setup
            setup();

            // Activate interval
            if (pgwSlider.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Get element
        var getElement = function(obj) {
            var element = {};

            // Get link
            var elementLink = obj.find('a').attr('href');
            if ((typeof elementLink != 'undefined') && (elementLink != '')) {
                element.link = elementLink;
                var elementLinkTarget = obj.find('a').attr('target');
                if ((typeof elementLinkTarget != 'undefined') && (elementLinkTarget != '')) {
                    element.linkTarget = elementLinkTarget;
                }
            }

            // Get image 
            var elementThumbnail = obj.find('img').attr('src');
            if ((typeof elementThumbnail != 'undefined') && (elementThumbnail != '')) {
                element.thumbnail = elementThumbnail;
            }

            var elementImage = obj.find('img').attr('data-large-src');
            if ((typeof elementImage != 'undefined') && (elementImage != '')) {
                element.image = elementImage;
            }

            // Get title 
            var elementSpan = obj.find('span').text();
            if ((typeof elementSpan != 'undefined') && (elementSpan != '') && (elementSpan != null)) {
                element.title = elementSpan;
            } else {
                var elementTitle = obj.find('img').attr('alt');
                if ((typeof elementTitle != 'undefined') && (elementTitle != '')) {
                    element.title = elementTitle;
                }
            }

            // Get description
            var elementDescription = obj.find('img').attr('data-description');
            if ((typeof elementDescription != 'undefined') && (elementDescription != '')) {
                element.description = elementDescription;
            }

            return element;
        };

        // Update the current height
        var updateHeight = function(height, animate) {

            // Check maxHeight
            if (pgwSlider.config.maxHeight) {
                if (pgwSlider.window.width() > 480 && height > pgwSlider.config.maxHeight) {
                    height = pgwSlider.config.maxHeight;
                } else if (pgwSlider.window.width() <= 480) {
                    if (height + pgwSlider.plugin.find('.ps-list').height() > pgwSlider.config.maxHeight) {
                        height = pgwSlider.config.maxHeight - pgwSlider.plugin.find('.ps-list').height();
                    }
                }
            }

            // Adjust right list
            var elementHeight = ((height - ((pgwSlider.slideCount - 1) * 6)) / pgwSlider.slideCount);
            var elementWidth = (100 / pgwSlider.slideCount);
            pgwSlider.plugin.find('.ps-list > li').css({ width: elementWidth + '%' });

            // Adjust main container
            if (typeof animate != 'undefined' && animate && pgwSlider.config.maxHeight == false) {
                clearTimeout(pgwSlider.eventAdaptive);
                pgwSlider.eventAdaptive = setTimeout(function() {

                    if (typeof pgwSlider.plugin.find('.ps-current').animate == 'function') {
                        pgwSlider.plugin.find('.ps-current').animate({
                            height: height
                        }, pgwSlider.config.adaptiveDuration, function() {
                            pgwSlider.plugin.find('.ps-list > li').animate({ height: elementHeight }, pgwSlider.config.adaptiveDuration);
                        });
                    } else {
                        pgwSlider.plugin.find('.ps-current').css('height', height);
                        pgwSlider.plugin.find('.ps-list > li').css('height', elementHeight);
                    }

                }, 100);

            } else {
                pgwSlider.plugin.find('.ps-current').css('height', height);
                pgwSlider.plugin.find('.ps-list > li').css('height', elementHeight);
            }

            // Vertical alignement
            if (pgwSlider.config.verticalCentering) {
                clearTimeout(pgwSlider.eventResize);
                pgwSlider.eventResize = setTimeout(function() {

                    // List elements
                    pgwSlider.plugin.find('.ps-list > li').each(function(){
                        if ((elementHeight > 50) && ($(this).find('img').height() > elementHeight)) {
                            var imageMargin = Math.round(($(this).find('img').height() - elementHeight) / 2);
                            $(this).find('img').css('margin-top', -imageMargin);

                        } else if ($(this).find('img').height() < elementHeight) {
                            var imageMargin = Math.round((elementHeight - $(this).find('img').height()) / 2);
                            $(this).find('img').css('margin-top', imageMargin);

                        } else {
                            $(this).find('img').css('margin-top', '');
                        }
                    });

                    // Current elements
                    pgwSlider.plugin.find('.ps-current > ul > li').each(function(){
                        var isVisible = ($(this).css('display') == 'none') ? false : true;

                        if (! isVisible) {
                            $(this).show();
                        }

                        if ($(this).show().find('img').height() > height) {
                            var imageMargin = Math.round(($(this).find('img').height() - height) / 2);
                            $(this).find('img').css('margin-top', -imageMargin);

                        } else if ($(this).show().find('img').height() < height) {
                            var imageMargin = Math.round((height - $(this).find('img').height()) / 2);
                            $(this).find('img').css('margin-top', imageMargin);

                        } else {
                            $(this).find('img').css('margin-top', '');
                        }

                        if (! isVisible) {
                            $(this).hide();
                        }
                    });

                }, 200);
            }

            return true;
        };

        // Set size class
        var setSizeClass = function() {

            if (pgwSlider.plugin.width() <= 480) {
                pgwSlider.plugin.addClass('narrow').removeClass('wide');
            } else {
                pgwSlider.plugin.addClass('wide').removeClass('narrow');
            }

            return true;
        };

        // Setup
        var setup = function() {

            // Create container
            pgwSlider.plugin.removeClass(pgwSlider.config.mainClassName).addClass('ps-list');
            pgwSlider.plugin.wrap('<div class="' + pgwSlider.config.mainClassName + '"></div>');
            pgwSlider.plugin = pgwSlider.plugin.parent();
            pgwSlider.plugin.prepend('<div class="ps-current"><ul></ul><span class="ps-caption"></span></div>');
            pgwSlider.slideCount = pgwSlider.plugin.find('.ps-list > li').length;

            if (pgwSlider.slideCount == 0) {
                throw new Error('PgwSlider - No slider item has been found');
                return false;
            }

            // Get slider elements
            var elementId = 1;
            pgwSlider.plugin.find('.ps-list > li').each(function() {
                var element = getElement($(this));
                element.id = elementId;
                pgwSlider.data.push(element);

                $(this).addClass('elt_' + element.id);

                // Check element title
                if (element.title) {
                    if ($(this).find('span').length == 1) {
                        if ($(this).find('span').text() == '') {
                            $(this).find('span').text(element.title);
                        }
                    } else {
                        $(this).find('img').after('<span>' + element.title + '</span>');
                    }
                }

                // Set element in the current list
                var currentElement = $('<li class="elt_' + elementId + '"></li>');

                if (element.image) {
                    currentElement.html('<img src="' + element.image + '" alt="' + (element.title ? element.title : '') + '">');
                } else if (element.thumbnail) {
                    currentElement.html('<img src="' + element.thumbnail + '" alt="' + (element.title ? element.title : '') + '">');
                }

                if (element.link) {
                    currentElement.html('<a href="' + element.link + '"' + (element.linkTarget ? ' target="' + element.linkTarget + '"' : '') + '>' + currentElement.html() + '</a>');
                }

                pgwSlider.plugin.find('.ps-current > ul').append(currentElement);

                // Set selection mode
                if (pgwSlider.config.selectionMode == 'mouseOver') {
                    $(this).css('cursor', 'default').click(function(event) {
                        event.preventDefault();
                    }).bind('mouseenter', function(event) {
                        displayElement(element.id);
                    });
                    $(this).find('a').css('cursor', 'default');
                } else {
                    $(this).css('cursor', 'pointer').click(function(event) {
                        event.preventDefault();
                        displayElement(element.id);
                    });
                }

                elementId++;
            });

            // Set list position
            if (pgwSlider.config.listPosition == 'left') {
                pgwSlider.plugin.addClass('listOnTheLeft');
            }

            // Attach slide events
            if (pgwSlider.config.autoSlide) {
                pgwSlider.plugin.on('mouseenter', function() {
                    clearInterval(pgwSlider.eventInterval);
                    pgwSlider.eventInterval = null;
                }).on('mouseleave', function() {
                    activateInterval();
                });
            }

            // Display the first element
            displayElement(1);

            // Set the first height
            pgwSlider.plugin.find('.ps-current > ul > li.elt_1 img').on('load', function() {
                setSizeClass();

                var maxHeight = pgwSlider.plugin.find('.ps-current > ul > li.elt_1 img').height();
                updateHeight(maxHeight);

                pgwSlider.window.resize(function() {
                    // The new class must be set before the recalculation of the height.
                    setSizeClass();

                    var maxHeight = pgwSlider.plugin.find('.ps-current > ul > li.elt_' + pgwSlider.currentSlide + ' img').height();
                    updateHeight(maxHeight, pgwSlider.config.adaptiveHeight);
                });
            });

            return true;
        };

        // Display the current element
        var displayElement = function(elementId, apiController) {

            if (elementId == pgwSlider.currentSlide) {
                return false;
            }

            var element = pgwSlider.data[elementId - 1];
            var elementContainer = pgwSlider.plugin.find('.ps-current > ul');

            if (typeof element == 'undefined') {
                throw new Error('PgwSlider - The element ' + elementId + ' is undefined');
                return false;
            }

            // Before slide
            if (typeof pgwSlider.config.beforeSlide == 'function') {
                pgwSlider.config.beforeSlide(elementId);
            }

            // Display new element
            pgwSlider.plugin.find('.ps-list > li').css('opacity', '0.6');
            pgwSlider.plugin.find('.ps-list > li.elt_' + elementId).css('opacity', '1');

            elementContainer.find('li').not('.elt_' + pgwSlider.currentSlide).not('.elt_' + elementId).each(function(){
                if (typeof $(this).stop == 'function') {
                    $(this).stop();
                }
                $(this).css('position', '').css('z-index', 1).hide();
            });

            if (typeof pgwSlider.plugin.find('.ps-current > span').fadeOut == 'function') {
                pgwSlider.plugin.find('.ps-current > span').fadeOut(pgwSlider.config.transitionDuration / 2);
            } else {
                pgwSlider.plugin.find('.ps-current > span').hide();
            }

            // Current element
            if (pgwSlider.currentSlide > 0) {
                var currentElement = elementContainer.find('.elt_' + pgwSlider.currentSlide);

                if (typeof currentElement.animate != 'function') {
                    currentElement.animate = function(css, duration, callback) {
                        currentElement.css(css);
                        if (callback) {
                            callback();
                        }
                    };
                }

                if (typeof currentElement.stop == 'function') {
                    currentElement.stop();
                }

                currentElement.css('position', 'absolute').animate({
                    opacity : 0,
                }, pgwSlider.config.transitionDuration, function() {
                    currentElement.css('position', '').css('z-index', 1).hide();
                });
            }

            // Update current id
            pgwSlider.currentSlide = elementId;

            // Next element
            var nextElement = elementContainer.find('.elt_' + elementId);

            if (typeof nextElement.animate != 'function') {
                nextElement.animate = function(css, duration, callback) {
                    nextElement.css(css);
                    if (callback) {
                        callback();
                    }
                };
            }

            if (typeof nextElement.stop == 'function') {
                nextElement.stop();
            }

            nextElement.css('position', 'absolute').show().animate({
                opacity : 1,
            }, pgwSlider.config.transitionDuration, function() {
                nextElement.css('position', '').css('z-index', 2).show();

                // Element caption
                var elementText = '';
                if (element.title) {
                    elementText += '<b>' + element.title + '</b>';
                }

                if (element.description) {
                    if (elementText != '') elementText += '<br>';
                    elementText += element.description;
                }

                if (elementText != '') {
                    if (element.link) {
                        elementText = '<a href="' + element.link + '"' + (element.linkTarget ? ' target="' + element.linkTarget + '"' : '') + '>' + elementText + '</a>';
                    }

                    if (typeof pgwSlider.plugin.find('.ps-current > span').fadeOut == 'function') {
                        pgwSlider.plugin.find('.ps-current > span').html(elementText).fadeIn(pgwSlider.config.transitionDuration / 2);
                    } else {
                        pgwSlider.plugin.find('.ps-current > span').html(elementText).show();
                    }
                }

                // After slide
                if (typeof pgwSlider.config.afterSlide == 'function') {
                    pgwSlider.config.afterSlide(elementId);
                }

                // Set the container height
                if (pgwSlider.config.adaptiveHeight) {
                    var maxHeight = pgwSlider.plugin.find('.ps-current .elt_' + elementId + ' img').height();
                    updateHeight(maxHeight, true);
                }
            });

            // Reset interval to avoid a half interval after an API control
            if (typeof apiController != 'undefined' && pgwSlider.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Activate interval
        var activateInterval = function() {
            clearInterval(pgwSlider.eventInterval);

            if (pgwSlider.slideCount > 1 && pgwSlider.config.autoSlide) {
                pgwSlider.eventInterval = setInterval(function() {
                    if (pgwSlider.currentSlide + 1 <= pgwSlider.slideCount) {
                        var nextItem = pgwSlider.currentSlide + 1;
                    } else {
                        var nextItem = 1;
                    }
                    displayElement(nextItem);
                }, pgwSlider.config.intervalDuration);
            }

            return true;
        };

        // Start auto slide
        pgwSlider.startSlide = function() {
            pgwSlider.config.autoSlide = true;
            activateInterval();
            return true;
        };

        // Stop auto slide
        pgwSlider.stopSlide = function() {
            pgwSlider.config.autoSlide = false;
            clearInterval(pgwSlider.eventInterval);
            return true;
        };

        // Get current slide
        pgwSlider.getCurrentSlide = function() {
            return pgwSlider.currentSlide;
        };

        // Get slide count
        pgwSlider.getSlideCount = function() {
            return pgwSlider.slideCount;
        };

        // Display slide
        pgwSlider.displaySlide = function(itemId) {
            displayElement(itemId, true);
            return true;
        };

        // Next slide
        pgwSlider.nextSlide = function() {
            if (pgwSlider.currentSlide + 1 <= pgwSlider.slideCount) {
                var nextItem = pgwSlider.currentSlide + 1;
            } else {
                var nextItem = 1;
            }
            displayElement(nextItem, true);
            return true;
        };

        // Previous slide
        pgwSlider.previousSlide = function() {
            if (pgwSlider.currentSlide - 1 >= 1) {
                var previousItem = pgwSlider.currentSlide - 1;
            } else {
                var previousItem = pgwSlider.slideCount;
            }
            displayElement(previousItem, true);
            return true;
        };

        // Destroy slider
        pgwSlider.destroy = function(soft) {
            clearInterval(pgwSlider.eventInterval);

            if (typeof soft != 'undefined') {
                pgwSlider.plugin.find('.ps-list > li').each(function() {
                    $(this).attr('style', '').removeClass().css('cursor', '').unbind('click').unbind('mouseenter');
                    $(this).find('a').css('cursor', '');
                });

                pgwSlider.plugin.find('.ps-list').addClass(pgwSlider.config.mainClassName).removeClass('ps-list');
                pgwSlider.plugin.find('.ps-current').unwrap().remove();
                pgwSlider.hide();

            } else {
                pgwSlider.parent().remove();
            }

            pgwSlider.plugin = null;
            pgwSlider.data = [];
            pgwSlider.config = {};
            pgwSlider.currentSlide = 0;
            pgwSlider.slideCount = 0;
            pgwSlider.eventInterval = null;
            pgwSlider.window = null;

            return true;
        };

        // Reload slider
        pgwSlider.reload = function(newOptions) {
            pgwSlider.destroy(true);

            pgwSlider = this;
            pgwSlider.plugin = this;
            pgwSlider.window = $(window);
            pgwSlider.plugin.show();

            // Merge new options with the default configuration
            pgwSlider.config = $.extend({}, defaults, newOptions);

            // Setup
            setup();

            // Activate interval
            if (pgwSlider.config.autoSlide) {
                activateInterval();
            }

            return true;
        };

        // Slider initialization
        init();

        return this;
    }
})(window.Zepto || window.jQuery);
