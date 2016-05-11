/*!
 *
 * jQuery collageCaption Plugin v0.1.1
 * extra for collagePlus plugin
 * https://github.com/ed-lea/jquery-collagePlus
 *
 * Copyright 2012, Ed Lea twitter.com/ed_lea
 *
 * built for http://qiip.me
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 *
 */





;(function( $ ) {


  $.fn.collageCaption = function( options ) {
  
  
    // Defaults
    var defaults = {
        // object that contains the images to collage
        'images'          : $(this).children(),
        // colour for the caption background
        'background'      : "black",
        // opacity for the caption background
        'opacity'         : "0.5",
        // speed of the reveal / hide animation
        'speed'           : 100,
        // css class for the caption wrapper
        'cssClass'           : "Caption"
    };

    var settings = $.extend({}, defaults, options);

    return this.each(function() {

        /*
        * 
        * set up vars
        *
        */
        
        // track row width
        var row         = 0,
        // collect elements to be resized in current row
            elements    = [];


        settings.images.each(
            function(index){

                /*
                * 
                * Cache selector
                *
                */
                var $this = $(this);
                
                /*
                * 
                * Do we need to do anything with captions
                *
                */
                if (typeof $this.data("caption") == 'undefined'){
                    return;
                }
                
                /*
                * 
                * The HTML to append to the containing element
                *
                */
                var html = '<div class="' + settings.cssClass + '" style="position:relative;"><div class="Caption_Background" style="background-color:' +
                            settings.background + ';opacity:' +
                            settings.opacity + ';position:relative;top:0;"></div><div class="Caption_Content" style="position:relative;">' +
                            $this.data("caption") + '</div></div>';
                $this.append(html);
                
                /*
                * 
                * Cache the caption selectors
                *
                */
                var $cap    =  $this.find("." + settings.cssClass),
                    $capbg  =  $this.find(".Caption_Background"),
                    $captxt =  $this.find(".Caption_Content");
                
        
                /*
                * 
                * Calculate the caption height
                *
                */
                var h = $cap.height();
                    
                    
                /*
                * 
                * Set the background for the caption
                *
                */
                $capbg.height(h);
                
                /*
                * 
                * Overlap the caption content
                *
                */
                $captxt.css("top", "-" + h + "px");
                
                
                /*
                * 
                * Bind the rollover action to the element
                *
                */
                $this.bind(
                    {
                        mouseenter: function(e) {
                            $cap.animate({ top: (-1 * h) }, { duration: settings.speed, queue: false });
                        },
                        mouseleave: function(e) {
                            $cap.animate({ top: 0 }, { duration: settings.speed, queue: false });
                        }
                    }
                );
            }
        );
        return this;
    });



  };
})( jQuery );