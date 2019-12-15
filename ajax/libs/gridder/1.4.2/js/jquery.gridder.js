/*
 *  Gridder - v1.4.2
 *  A jQuery plugin that displays a thumbnail grid expanding preview similar to the effect seen on Google Images.
 *  http://www.oriongunning.com/
 *
 *  Made by Orion Gunning
 *  Under MIT License
 */
;(function($) {
    
    //Ensures there will be no 'console is undefined' errors in IE
    window.console = window.console || (function(){
        var c = {}; c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function(){};
        return c;
    })();

    /* Custom Easing */
    $.fn.extend($.easing,{
        def:"easeInOutExpo", easeInOutExpo:function(e,f,a,h,g){if(f===0){return a;}if(f===g){return a+h;}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a;}return h/2*(-Math.pow(2,-10*--f)+2)+a;}
    });    
    
    /* KEYPRESS LEFT & RIGHT ARROW */
    /* This will work only if a current gridder is opened. */
    $(document).keydown(function(e) {
        var keycode = e.keyCode;
        var $current_gridder = $(".currentGridder");
        var $current_target = $current_gridder.find(".gridder-show");
        if($current_gridder.length){
            if ( keycode === 37 ) {
                console.log("Pressed Left Arrow");
                $current_target.prev().prev().trigger("click");
                e.preventDefault();
            }
            if ( keycode === 39 ) {
                console.log("Pressed Right Arrow");
                $current_target.next().trigger("click");
                e.preventDefault();
            }
        }else{
            console.log("No active gridder.");
        }   
    });
    
    $.fn.gridderExpander = function(options) {
        
        /* GET DEFAULT OPTIONS OR USE THE ONE PASSED IN THE FUNCTION  */
        var settings = $.extend( {}, $.fn.gridderExpander.defaults, options );      

        return this.each(function() {
            
            var mybloc;
            var _this = $(this);
            var visible = false;
            
            // START CALLBACK
            settings.onStart(_this);
             
            // CLOSE FUNCTION
            function closeExpander(base) {
                
                // SCROLL TO CORRECT POSITION FIRST
                if(settings.scroll){
                    $("html, body").animate({
                        scrollTop: base.find(".selectedItem").offset().top - settings.scrollOffset
                    }, {
                        duration: 200,
                        easing: settings.animationEasing
                    });
                }
                
                _this.removeClass("hasSelectedItem");

                // REMOVES GRIDDER EXPAND AREA
                visible = false;
                base.find(".selectedItem").removeClass("selectedItem");
                
                base.find(".gridder-show").slideUp(settings.animationSpeed, settings.animationEasing, function() {
                    base.find(".gridder-show").remove();
                    settings.onClosed(base);
                });
                
                /* REMOVE CURRENT ACTIVE GRIDDER */
                $(".currentGridder").removeClass("currentGridder");
            }
            
            // OPEN EXPANDER
            function openExpander(myself) {
                
                /* CURRENT ACTIVE GRIDDER */
                $(".currentGridder").removeClass("currentGridder");
                _this.addClass("currentGridder");
                
                /* ENSURES THE CORRECT BLOC IS ACTIVE */
                if (!myself.hasClass("selectedItem")) {
                    _this.find(".selectedItem").removeClass("selectedItem");
                    myself.addClass("selectedItem");
                } else {
                    // THE SAME IS ALREADY OPEN, LET"S CLOSE IT
                    closeExpander(_this, settings);
                    return;
                }

                /* REMOVES PREVIOUS BLOC */
                _this.find(".gridder-show").remove();


                /* ADD CLASS TO THE GRIDDER CONTAINER
                 * So you can apply global style when item selected. 
                 */
                if (!_this.hasClass("hasSelectedItem")) {
                    _this.addClass("hasSelectedItem");
                }

                /* ADD LOADING BLOC */
                var $htmlcontent = $("<div class=\"gridder-show loading\"></div>");
                mybloc = $htmlcontent.insertAfter(myself);
                
                /* GET CONTENT VIA AJAX OR #ID*/
                var thecontent = "";
                
                if( myself.data("griddercontent").indexOf("#") === 0 ) {
                    
                    // Load #ID Content
                    thecontent = $(myself.data("griddercontent")).html();
                    processContent(myself, thecontent);
                }else{
                    
                    // Load AJAX Content
                    $.ajax({
                        type: "POST",
                        url: myself.data("griddercontent"),
                        success: function(data) {
                            thecontent = data;
                            processContent(myself, thecontent);
                        },
                        error: function (request) {
                            thecontent = request.responseText;
                            processContent(myself, thecontent);
                        }
                    });
                }
            }
            
            // PROCESS CONTENT
            function processContent(myself, thecontent){

                /* FORMAT OUTPUT */   
                var htmlcontent = "<div class=\"gridder-padding\">";
                
                if(settings.showNav){
                    
                    /* CHECK IF PREV AND NEXT BUTTON HAVE ITEMS */
                    var prevItem = ($(".selectedItem").prev());
                    var nextItem = ($(".selectedItem").next().next());
                    
                    htmlcontent += "<div class=\"gridder-navigation\">";
                    htmlcontent += "<a href=\"#\" class=\"gridder-close\">"+settings.closeText+"</a>";
                    htmlcontent += "<a href=\"#\" class=\"gridder-nav prev "+(!prevItem.length?"disabled":"")+"\">"+settings.prevText+"</a>";
                    htmlcontent += "<a href=\"#\" class=\"gridder-nav next "+(!nextItem.length?"disabled":"")+"\">"+settings.nextText+"</a>";
                    htmlcontent += "</div>";
                }     
                
                htmlcontent += "<div class=\"gridder-expanded-content\">";
                htmlcontent += thecontent;
                htmlcontent += "</div>";
                htmlcontent += "</div>";

                // IF EXPANDER IS ALREADY EXPANDED 
                if (!visible) {
                    mybloc.hide().append(htmlcontent).slideDown(settings.animationSpeed, settings.animationEasing, function () {
                        visible = true;
                        /* AFTER EXPAND CALLBACK */
                        if ($.isFunction(settings.onContent)) {
                            settings.onContent(mybloc);
                        }
                    });
                } else {
                    mybloc.html(htmlcontent);
                    mybloc.find(".gridder-padding").fadeIn(settings.animationSpeed, settings.animationEasing, function () {
                        visible = true;
                        /* CHANGED CALLBACK */
                        if ($.isFunction(settings.onContent)) {
                            settings.onContent(mybloc);
                        }
                    });
                }

                /* SCROLL TO CORRECT POSITION AFTER */
                if (settings.scroll) {
                    var offset = (settings.scrollTo === "panel" ? myself.offset().top + myself.height() - settings.scrollOffset : myself.offset().top - settings.scrollOffset);
                    $("html, body").animate({
                        scrollTop: offset
                    }, {
                        duration: settings.animationSpeed,
                        easing: settings.animationEasing
                    });
                }
                
                /* REMOVE LOADING CLASS */
                mybloc.removeClass("loading");
            }
            
            /* CLICK EVENT */
            _this.on("click", ".gridder-list", function (e) {
                e.preventDefault();
                var myself = $(this);
                openExpander(myself);
            });
            
            /* NEXT BUTTON */
            _this.on("click", ".gridder-nav.next", function(e) {
                e.preventDefault();
                $(this).parents(".gridder-show").next().trigger("click");
            });

            /* PREVIOUS BUTTON */
            _this.on("click", ".gridder-nav.prev", function(e) {
                e.preventDefault();
                $(this).parents(".gridder-show").prev().prev().trigger("click");
            });
            
            /* CLOSE BUTTON */
            _this.on("click", ".gridder-close", function(e) {
                e.preventDefault();
                closeExpander(_this);
            });
        });
    };
    
    // Default Options
    $.fn.gridderExpander.defaults = {
        scroll: true,
        scrollOffset: 30,
        scrollTo: "panel", // panel or listitem
        animationSpeed: 400,
        animationEasing: "easeInOutExpo",
        showNav: true,
        nextText: "Next",
        prevText: "Previous",
        closeText: "Close",    
        onStart: function(){},
        onContent: function(){},
        onClosed: function(){}
    };
     
})(jQuery);
