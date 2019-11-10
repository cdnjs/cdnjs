/**
*	jQuery Plugin for simple vertical scrolling - horizontal movement parallax effect
*	I wrote this plugin for a project we have done.
*
*	License:
*	The MIT License (MIT)
*
*	@version 0.8.3
*
*   Copyright (c) 2013 pixxelfactory
*   
*   Permission is hereby granted, free of charge, to any person obtaining a copy
*   of this software and associated documentation files (the "Software"), to deal
*   in the Software without restriction, including without limitation the rights
*   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*   copies of the Software, and to permit persons to whom the Software is
*   furnished to do so, subject to the following conditions:
*   
*   The above copyright notice and this permission notice shall be included in
*   all copies or substantial portions of the Software.
*   
*   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*   THE SOFTWARE.
**/
(function ($) {
    'use strict';

    $.jInvertScroll = function(sel, options) {
        var defaults = {
            width: 'auto',		    // The horizontal container width
            height: 'auto',		    // How far the user can scroll down (shorter distance = faster scrolling)
            onScroll: function(percent) {  // Callback fired when the user scrolls down, the percentage of how far the user has scrolled down gets passed as parameter (format: 0.xxxx - 1.0000)
                // do whatever you like
            }
        };
        
        var config = $.extend(defaults, options);
        
        if(typeof sel === 'Object' && sel.length > 0) {
            return;
        }
        
        var elements = [],
            longest = 0,
            totalHeight,
            winHeight,
            winWidth;

        function init() {
            // Extract all selected elements from dom and save them into an array
            $.each(sel, function (i, val) {
              $(val).each(function (e) {
                elements.push($(this));

                var w = $(this).width();
                if (longest < w) {
                  longest = w;
                }
              });
            });

            // Use the longest elements width + height if set to auto
            if (config.width == 'auto') {
              config.width = longest;
            }

            if (config.height == 'auto') {
              config.height = longest;
            }

            // Set the body to the selected height
            $('body').css('height', config.height + 'px');
        }

        function calc() {
          totalHeight = $(document).height();
          winHeight = $(window).height();
          winWidth = $(window).width();
        }

        function onscroll(e) {
            var currY = $(this).scrollTop();

            // Make calculations
            calc();

            var diff = totalHeight - winHeight;
            var scrollPercent = 0;

            if (diff != 0) {
              // Current percentual position
              scrollPercent = (currY / diff).toFixed(4);
            }

            // Call the onScroll callback
            if(typeof config.onScroll === 'function') {
              config.onScroll.call(this, scrollPercent);
            }

            // do the position calculation for each element
            $.each(elements, function (i, el) {
              var deltaW = el.width() - winWidth;
              if (deltaW <= 0) {
                deltaW = el.width();
              }
              var pos = Math.floor(deltaW * scrollPercent) * -1;
              el.css('left', pos);
            });
        }

        function setlisteners() {
            // Listen for the actual scroll event
            $(window).on('scroll resize', onscroll);
            $([document, window]).on('ready resize', calc);
        }


        // Init actions
        init();
        setlisteners();


        return {
            reinitialize: function() {
                init();
                setlisteners();
            },
            destroy: function() {
                // Remove previously added inline styles
                $('body').attr('style', '');

                // Remove listeners
                $(window).off('scroll resize', onscroll);
                $([document, window]).off('ready resize', calc);
            }
        };
    };
}(jQuery));
