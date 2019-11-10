/**
 * PgwSlider - Version 1.1
 *
 * Copyright 2014, Jonathan M. Piat
 * http://pgwjs.com - http://pagawa.com
 * 
 * Released under the MIT license - http://opensource.org/licenses/MIT
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

        var pgwSlider = {};
        pgwSlider.plugin = this;
        pgwSlider.data = [];
        pgwSlider.config = {};
        pgwSlider.currentNb = 0;
        pgwSlider.nbElements = 0;
        pgwSlider.eventInterval = null;
        pgwSlider.window = $(window);

        // Init
        var init = function() {
        
            // Merge the user options with the defaults config
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
            var elementHeight = ((height - ((pgwSlider.nbElements - 1) * 6)) / pgwSlider.nbElements);
            var elementWidth = (100 / pgwSlider.nbElements);
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
            pgwSlider.plugin.find('ul').removeClass('pgwSlider');
            pgwSlider.plugin.prepend('<div class="ps-current"></div>');
            pgwSlider.nbElements = pgwSlider.plugin.find('ul li').length;

            // Get slider elements
            var elementId = 0;
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
            displayCurrent(0, true);
            
            return true;
        };

        // Display current element
        var displayCurrent = function(elementId, init) {

            pgwSlider.currentNb = elementId;
            var element = pgwSlider.data[elementId];
            var elementContainer = pgwSlider.plugin.find('.ps-current');

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
                elementContainer.find('img').load(function() {
                    if (typeof pgwSlider.plugin.find('.ps-current').attr('data-checked') == 'undefined') {
                    
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
            
            return true;
        };

        // Activate interval
        var activateInterval = function() {
        
            if (pgwSlider.nbElements > 1 && pgwSlider.config.autoSlide) {
            
                pgwSlider.eventInterval = setInterval(function() {
                    var maxNb = pgwSlider.nbElements - 1;
                    
                    if (pgwSlider.currentNb + 1 <= maxNb) {
                        var nextNb = pgwSlider.currentNb + 1;
                    } else {
                        var nextNb = 0;
                    }
                    
                    displayCurrent(nextNb);
                    
                }, pgwSlider.config.intervalDuration);
            }
            
            return true;
        };

        init();
        return this;
    }
})(jQuery);
