var bootcards = bootcards || {

    portraitModeEnabled : false,
    _isXS : null,
    isFullScreen : false

};

bootcards.init = function( _options ) {

    this.isFullScreen = ('standalone' in navigator && navigator.standalone);

    $(document).ready( function() {

        Bootcards.init(_options);

        Bootcards.OffCanvas.init();

        if (Bootcards.options.enableTabletPortraitMode) {

           bootcards._initTabletPortraitMode();

        }

        if (Bootcards.options.disableRubberBanding) {

            bootcards.disableRubberBanding();
        }

    } );

    if (this.isFullScreen && 
        _options.disableBreakoutSelector ) {

        /*
         * If an app on iOS is added to the home screen and a standard (non ajax)
         * link is clicked, it tends to break-out out of full-screen mode
         * This code helps to prevent that.
         * 
         * To use: add the break-out class to the options object used to initializ
         * Bootcards and add the same class to any link you want to trigger this
         * behaviour on (normally: all non-ajax links)
         */
        $(document).on(
            "click",
            _options.disableBreakoutSelector,
            function( event ){
                event.preventDefault();
                location.href = $(event.target).prop("href");
            }
        );

    }


};

bootcards.isXS = function() {

    if (this._isXS === null ) {

        //check if we're in the Bootstrap XS environment
        var $check = $("<div class='visible-xs'>").appendTo($("body"));
        this._isXS = $check.is(":visible");
        $check.remove();

    }

    return this._isXS;
};

/*
 * Disable rubberbanding effect in iOS.
 * Based on the 'Baking Soda Paste' technique written by Armagan Amcalar at
 * http://blog.armaganamcalar.com/post/70847348271/baking-soda-paste
 */
bootcards.disableRubberBanding = function() {
   document.body.addEventListener('touchstart', function() {
        document.body.addEventListener('touchmove', function moveListener(e) {
            document.body.removeEventListener('touchmove', moveListener);

            var el = e.target;

            do {

                var h = parseInt(window.getComputedStyle(el, null).height, 10);
                var sH = el.scrollHeight;

                if (h < sH) {
                    return;
                }
            } while (el != document.body && el.parentElement != document.body && (el = el.parentElement));

            e.preventDefault();
        });
    });

};



/*
 * Initialize an off-canvas menu. This takes 3 arguments:
 * - the off canvas element to slide in
 * - the main content area to push away when the off canvas element slides in
 * - a boolean indicating if the off canvas menu should be hidden when the main content area is clicked
 * 
 * An off canvas menu is required for the portrait-single-pane mode
 *
 */

var Bootcards = ( function() {

    this.$mainContentEl = null;
    this.options = null;

    return {

        init : function(_options) {
            this.$mainContentEl = $('.bootcards-container');
            this.options = $.extend({}, Bootcards.DEFAULTS, _options);
        }

    };

})();

Bootcards.DEFAULTS = {
    offCanvasHideOnMainClick : false,
    offCanvasBackdrop : false,
    enableTabletPortraitMode : false,
    disableRubberBanding : false,
    disableBreakoutSelector : null
};

//OffCanvas module
(function (Bootcards) {

    Bootcards.OffCanvas = {

        $backdrop : null,
        $toggleEl : null,
        $menuEl : null,
        $menuTitleEl : null,
        offCanvasHideOnMainClick : false,
        offCanvasBackdrop : false,

        init : function() {
            this.offCanvasHideOnMainClick = Bootcards.options.offCanvasHideOnMainClick;
            this.offCanvasBackdrop = Bootcards.options.offCanvasBackdrop;
            this.$toggleEl = $('[data-toggle=offcanvas]');
            this.$menuEl = $('.offcanvas');

            if (this.$menuEl.length>0 && this.$toggleEl.length>0) {

                this.$toggleEl.on("click", function() {
                    Bootcards.OffCanvas.toggle();
                });

            }

            //add handler to body to hide the offcanvas when clicking
            if (this.offCanvasHideOnMainClick && Bootcards.$mainContentEl) {
                Bootcards.$mainContentEl.on("click", function() {
                    Bootcards.OffCanvas.hide();
                });
            }

        },

        toggle : function() {
            if (this.$menuEl.hasClass('active') ) {        //hide
                this.hide();
            } else {     
                this.show();
            }
        },

        show : function() {

            //set opacity here to keep the menu button from keeping the hover state
            this.showBackdrop();

            this.$toggleEl.css('opacity', '');
            this.$menuEl.addClass("active");

            if (this.offCanvasHideOnMainClick && Bootcards.$mainContentEl) {
                Bootcards.$mainContentEl.addClass("active-left");
            }


        },

        hide : function() {
            this.hideBackdrop();

            if (this.$toggleEl) { this.$toggleEl.css('opacity', '1'); }
            if (this.$menuEl) { this.$menuEl.removeClass("active"); }

            if (this.offCanvasHideOnMainClick && Bootcards.$mainContentEl) {
                Bootcards.$mainContentEl.removeClass("active-left");
            }

            if (this.$menuTitleEl) { this.$menuTitleEl.removeClass('active'); }

        },

        showBackdrop : function() {
            if (!this.offCanvasBackdrop) { return; }
            this.$backdrop = $('<div class="modal-backdrop fade in" />')
                .appendTo( Bootcards.$mainContentEl );
        },

        hideBackdrop : function() {
            if (!this.offCanvasBackdrop) { return; }
            //remove the backdrop
            this.$backdrop && this.$backdrop.remove();
            this.$backdrop = null;
        },

        showToggleEl : function() {
            if (this.$toggleEl) {
                this.$toggleEl.show();
            }
        },

        hideToggleEl : function() {
            if (this.$toggleEl) {
                this.$toggleEl.hide();
            }
        },

        insertToggleButton : function(target) {

            //create the title element for the menu offcanvas, insert it before the menu offcanvas
            this.$menuTitleEl = $("<div class='offcanvas-list offcanvas-list-title'>"  +
                "<span>Menu</span></div>");
            this.$menuEl.before( this.$menuTitleEl );

            //clone the button to show/hide the menu in the list title
            this.$toggleEl.clone(false)
                .prependTo(target)
                .on("click", function() {
                    Bootcards.OffCanvas.$menuEl.toggleClass("active");
                    Bootcards.OffCanvas.$menuTitleEl.toggleClass("active");
                })
                .children("i")
                    .removeClass('fa-bars')
                    .addClass('fa-angle-left');
        }

    };
    
    return Bootcards;
 
})(Bootcards);

bootcards.enablePortraitMode = function() {

    //don't activate on desktop or smartphones
    if ( typeof window.orientation == 'undefined' || bootcards.isXS() ) {
        return false;
    } else {
        return true;
    }

};


bootcards._initTabletPortraitMode = function() {

    if ( typeof window.orientation == 'undefined' || bootcards.isXS() ) {
        return;
    }
    
    bootcards.portraitModeEnabled = true;

    $(window)
        .on( 'resize', function() { 
            setTimeout( function() { 
                bootcards._setOrientation(false);
            } , 250);
        } )
        .on( 'load', bootcards._setOrientation(true) );

};

bootcards._setOrientation = function(init) {

    if ( !bootcards.portraitModeEnabled ) {
        return;
    }

    var isPortrait = ($(window).width() > $(window).height())? false : true;

    //on rotation: hide the offcanvas
    Bootcards.OffCanvas.hide();

    bootcards._initListEl();
    bootcards._initCardsEl();
 
    if (isPortrait) {

        //portrait

        //no list found
        if (bootcards.listEl.length === 0) {
            //no list found (anymore), enable the off canvas toggle (might have been hidden) and abort

            Bootcards.OffCanvas.showToggleEl();
            return;
        }

        //immediately hide the list on load in portrait mode
        if (init) {
            bootcards.listEl.hide();
        }

        //set the column to full width
        bootcards.cardsEl
            .removeClass(bootcards.cardsColClass)
            .addClass('col-xs-12');

        //hide the az picker
        $('.bootcards-az-picker').hide();

        if (!bootcards.listOffcanvasToggle) {
            //create the list title & toggle elements

             //create the button that shows/hides the list
            bootcards.listOffcanvasToggle = $('<button type="button" class="btn btn-default pull-left offcanvaslist-toggle">' +
                '<i class="fa fa-lg fa-angle-left"></i><span>' + bootcards.listTitle + '</span>' +
                '</button>')
                    .on("click", function() {

                        if (bootcards.listTitleEl.hasClass("active") ) {
                            Bootcards.OffCanvas.hideBackdrop();
                        } else {
                            Bootcards.OffCanvas.showBackdrop();
                        }

                        //on click: show the list & title
                        bootcards.listEl.toggleClass("active");
                        bootcards.listTitleEl.toggleClass("active");
                
                    });

            //create the title element of the list offcanvas
            bootcards.listTitleEl = $("<div class='offcanvas-list offcanvas-list-title'>"  +
               "<span>" + bootcards.listTitle + "</span></div>");

            if (Bootcards.OffCanvas.$toggleEl) {
                //if we have an offcanvas: add the toggle button to the list

                Bootcards.OffCanvas.insertToggleButton( bootcards.listTitleEl );

            }

            //add the title element and the toggle button to the top navbar
           $('.navbar-header')
               .after(
                    bootcards.listTitleEl, bootcards.listOffcanvasToggle);   

            //hide the list & list title when to body is clicked
            Bootcards.$mainContentEl.on("click", function() {
                
                bootcards.listEl.removeClass('active');
                bootcards.listTitleEl.removeClass('active'); 
                Bootcards.OffCanvas.$menuTitleEl.removeClass('active');
                Bootcards.OffCanvas.hideBackdrop();

            });
            
            bootcards.listEl.on("click", function() {

                bootcards.listEl.removeClass('active');
                bootcards.listTitleEl.removeClass('active');
                Bootcards.OffCanvas.hideBackdrop();

            });

            //increase the width of the menu: set it to the same size as the list
            if ( Bootcards.OffCanvas.$menuEl ) {
                Bootcards.OffCanvas.$menuEl
                    .addClass('offcanvas-list')
                    .on("click", function() {

                        //hide the menu on click 
                        var $this = $(this);
                        $this.removeClass('active');
                        Bootcards.OffCanvas.hide();
                        //if (bootcards.offCanvasMenuTitleEl) { bootcards.offCanvasMenuTitleEl.removeClass('active'); }
                        if (bootcards.listEl) { bootcards.listEl.removeClass('active'); }
                        if (bootcards.listTitleEl) { bootcards.listTitleEl.removeClass('active'); }

                    });
            }

        }

        //hide the menu button
        Bootcards.OffCanvas.hideToggleEl();

        //show the button to toggle the list
        bootcards.listOffcanvasToggle.show();

        bootcards.listEl
            .removeClass(bootcards.listColClass)
            .addClass('offcanvas-list')
            .show();

    } else {

        //landscape

        //show the menu button
        Bootcards.OffCanvas.showToggleEl();

        //show the list again
        if (bootcards.listEl && bootcards.listEl.hasClass('offcanvas-list') ) {

            bootcards.listEl
                .removeClass('offcanvas-list active')
                .addClass(bootcards.listColClass)
                .show();

            /*
             * deal with a iOS 8 issue: after rotating back to portrait,
             * the list el remains in a (partly) offscreen position
             * note that we need the timer: if we try to do this in 1 step, it fails
             */
            bootcards.listEl.css('overflow', 'hidden');
            setTimeout( function() {
                bootcards.listEl.css('overflow-y', 'auto');
            }, 300);
        }

        //hide the button to show the list, remove the list & title
        if ( bootcards.listOffcanvasToggle ) {
            bootcards.listOffcanvasToggle.hide();
            bootcards.listTitleEl.removeClass("active");
        }

        if (bootcards.cardsEl) {   
            bootcards.cardsEl
                .removeClass('col-xs-12')
                .addClass( bootcards.cardsColClass );
        }

        $('.bootcards-az-picker').show();

    }

};

//get the list element and it's classes
bootcards._initListEl = function() {

    if (bootcards.listEl != null) {
        return bootcards.listEl;
    }
            
    bootcards.listEl = $('.bootcards-list');
    bootcards.listColClass = '';

    if ( bootcards.listEl.length > 0 ) {
            
        bootcards.listTitle = bootcards.listEl.data('title') || 'List';

        $.each(bootcards.listEl.prop('class').split(' '), function(idx, value) {
            if (value.indexOf('col')===0) {
                bootcards.listColClass += value + ' ';
            }
        });

    }

};

bootcards._initCardsEl = function() {

    if (bootcards.cardsEl != null) {
        return bootcards.cardsEl;
    }

    bootcards.cardsEl = $('.bootcards-cards');
    bootcards.cardsColClass = '';

    if ( bootcards.cardsEl.length > 0 ) {

        $.each(bootcards.cardsEl.prop('class').split(' '), function(idx, value) {
            if (value.indexOf('col')===0) {
                bootcards.cardsColClass += value + ' ';
            }
        });
    }

};

//initialize the AZ picker
bootcards.initAZPicker = function( target ) {

    var azPicker = $(target);
    
    if (azPicker.length > 0) {
    
        // Register the letter click events
        $("a", azPicker).off().on('click', function(event) {
            
            var $this = $(this);
    
            event.stopPropagation();
            bootcards._jumpToLetter($this, event);
            return false;
            
        });
        
        //move the az picker to a different location so we can give it a fixed position
        var $list = azPicker.parents(".bootcards-list");

        if ( $list.length > 0) {
            
            //determine the width of the list column
            var classList = $list.attr('class').split(/\s+/);
            var colClass = "";
            $.each( classList, function(index, entry) {
                if (entry.indexOf('col-') ===0 ) {
                    colClass = entry;
                    return;
                }
                
            });
            
            //translate the column name to one of the Bootstrap 'push' classes
            var colSize = colClass.substring( colClass.lastIndexOf('-') + 1 );
            var colPushClass = colClass.substring( 0, colClass.lastIndexOf('-')) + "-push-" + colSize;
            
            //move the picker as a direct child of the main bootcards container so we can give it fixed positioning
            azPicker
                .appendTo( $('.bootcards-container') )
                .addClass(colPushClass);
        
        }
        
    }
    
};

//jump to a specific letter in the list
bootcards._jumpToLetter = function(letterelement, event) {
    
    var $list = $('#list');
    
    $list.animate( {
        scrollTop : 0
    }, 0);
    
    var letter = letterelement.text().toLowerCase();
    var sel = "#list .list-group a";
    if ($(".bootcards-list-subheading").length > 0){
        sel = ".bootcards-list-subheading";
    }
    
    var $sel = $(sel);
    
    var scrolled = false;   
    $sel.each( function(idx, entry) {
        var $entry = $(entry);
        
        var summary = "";
        if ($entry.prop('tagName').toLowerCase() == "a"){
            summary = $entry.find("h4").text();
        }else{
            summary = $entry.text();
        }
        
        var firstletter = summary.substring(0, 1).toLowerCase();
        var scrollTop = null;
        
        if (firstletter == letter) {
            scrollTop = $entry.offset().top - 60;
        } else if (firstletter > letter) {
            scrollTop = $entry.offset().top - 120;
        }

        if (scrollTop !== null) {
            $list.animate( {
                scrollTop : scrollTop
            }, 0);
            scrolled = true;
            return false; 
        }
    });
    
    if (!scrolled) {

        var $last = $( $sel[$sel.length-1] );
        $list.animate( {
            scrollTop : $last.offset().top - 120
        }, 0);
    }
    
};
