/**
 * PgwSlider - Version 1.3
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
 */
;(function($){
    $.fn.pgwSlider = function(options) {

        var defaults = {
            autoSlide : true,
            adaptiveHeight : false,
            adaptiveDuration : 400,
            transitionDuration : 400,
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
            if ((typeof elementSpan != 'undefined') && (elementSpan != '')) {
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

            // Adjust the height of the right list items
            var elementHeight = ((height - ((pgwSlider.slideCount - 1) * 6)) / pgwSlider.slideCount);
            var elementWidth = (100 / pgwSlider.slideCount);
            pgwSlider.plugin.find('ul li').css({ width: elementWidth + '%' });
        
            // Adjust the height of the main container
            if (typeof animate != 'undefined' && animate) {
                pgwSlider.plugin.find('.ps-current').animate({
                    height: height
                }, pgwSlider.config.adaptiveDuration, function() {
                    pgwSlider.plugin.find('ul li').animate({ height: elementHeight }, pgwSlider.config.adaptiveDuration);
                });
                
            } else {
                pgwSlider.plugin.find('.ps-current').css('height', height);
                pgwSlider.plugin.find('ul li').css('height', elementHeight);
            }
            
            return true;
        };

        // Setup
        var setup = function() {
        
            // Create container
            pgwSlider.plugin.wrap('<div class="pgwSlider"></div>');
            pgwSlider.plugin = pgwSlider.plugin.parent();
            pgwSlider.plugin.prepend('<div class="ps-current"></div>');
            pgwSlider.slideCount = pgwSlider.plugin.find('ul li').length;

            // Get slider elements
            var elementId = 1;
            pgwSlider.plugin.find('ul li').each(function() {
                var element = getElement($(this));
                element.id = elementId;
                pgwSlider.data.push(element);

                $(this).addClass('elt_' + element.id);

                if (element.title) {
                    if ($(this).find('span').length == 1) {
                        if ($(this).find('span').text() == '') {
                            $(this).find('span').text(element.title);
                        }
                    } else {
                        $(this).find('img').after('<span>' + element.title + '</span>');
                    }
                }

                // Disable native links in the right list
                $(this).css('cursor', 'pointer').click(function(event) {
                    event.preventDefault();
                    displayCurrent(element.id);
                });
                
                elementId++;
            });

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
            displayCurrent(1);
            
            return true;
        };

        // Display current element
        var displayCurrent = function(elementId, apiController) {

            var element = pgwSlider.data[elementId - 1];
            var elementContainer = pgwSlider.plugin.find('.ps-current');
        
            if (typeof element == 'undefined') {
                throw new Error('PgwSlider - The element ' + elementId + ' is undefined');
                return false;
            }

            pgwSlider.currentSlide = elementId;
            
            // Fix for Zepto
            if (typeof elementContainer.animate == 'undefined') {
                elementContainer.animate = function(css, duration, callback) {
                    elementContainer.css(css);
                    if (callback) {
                        callback();
                    }
                }
            }

            // Opacify the current element
            elementContainer.animate({
                opacity : 0,
            }, pgwSlider.config.transitionDuration, function() {
            
                pgwSlider.plugin.find('ul li').css('opacity', '0.6');
                pgwSlider.plugin.find('ul li.elt_' + elementId).css('opacity', '1');

                // Create image
                if (element.image) {
                    elementContainer.html('<img src="' + element.image + '" alt="' + (element.title ? element.title : '') + '">');
                } else if (element.thumbnail) {
                    elementContainer.html('<img src="' + element.thumbnail + '" alt="' + (element.title ? element.title : '') + '">');
                } else {
                    elementContainer.html('');
                }           

                // Create caption
                var elementText = '';
                if (element.title) {
                    elementText += '<b>' + element.title + '</b>';
                }

                if (element.description) {
                    if (elementText != '') elementText += '<br>';
                    elementText += element.description;
                }

                if (elementText != '') {
                    elementContainer.append('<span>' + elementText + '</span>');
                }

                // Check if the element has a link
                if (element.link) {
                    var linkTarget = '';
                    if (element.linkTarget) {
                        var linkTarget = ' target="' + element.linkTarget + '"';
                    }
                    elementContainer.html('<a href="' + element.link + '"' + linkTarget + '>' + elementContainer.html() + '</a>');
                }

                // Set the container height
                elementContainer.find('img').on('load', function() {
                    if (typeof pgwSlider.plugin.find('.ps-current').attr('data-checked') == 'undefined' || pgwSlider.plugin.find('.ps-current').attr('data-checked') == null) {
                    
                        var maxHeight = pgwSlider.plugin.find('.ps-current img').height();
                        updateHeight(maxHeight);
                        pgwSlider.plugin.find('.ps-current').attr('data-checked', 'true');
                        
                        pgwSlider.window.resize(function() {
                            var maxHeight = pgwSlider.plugin.find('.ps-current img').height();
                            updateHeight(maxHeight);
                        });

                    } else if (pgwSlider.config.adaptiveHeight) {
                        var maxHeight = pgwSlider.plugin.find('.ps-current img').height();
                        updateHeight(maxHeight, true);
                    }
                });

                // Display the new element
                elementContainer.animate({
                    opacity : 1,
                }, pgwSlider.config.transitionDuration);
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
                    displayCurrent(nextItem);                    
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
            displayCurrent(itemId, true);
            return true;
        };
        
        // Next slide
        pgwSlider.nextSlide = function() {
            if (pgwSlider.currentSlide + 1 <= pgwSlider.slideCount) {
                var nextItem = pgwSlider.currentSlide + 1;
            } else {
                var nextItem = 1;
            }
            displayCurrent(nextItem, true);
            return true;
        };
        
        // Previous slide
        pgwSlider.previousSlide = function() {
            if (pgwSlider.currentSlide - 1 >= 1) {
                var previousItem = pgwSlider.currentSlide - 1;
            } else {
                var previousItem = pgwSlider.slideCount;
            }
            displayCurrent(previousItem, true);
            return true;
        };
        
        // Destroy slider
        pgwSlider.destroy = function(soft) {
            clearInterval(pgwSlider.eventInterval);
            
            pgwSlider.plugin.find('ul li').each(function() {
                $(this).unbind('click');
            });

            pgwSlider.data = [];
            pgwSlider.config = {};
            pgwSlider.currentSlide = 0;
            pgwSlider.slideCount = 0;
            pgwSlider.eventInterval = null;
            pgwSlider.window = null;

            if (typeof soft != 'undefined') {              
                pgwSlider.plugin.find('.ps-current').unwrap().remove();
                pgwSlider.hide();
            } else {
                pgwSlider.parent().remove();
            }
            
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
