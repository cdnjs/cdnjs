/*===================================================================================================================
 * @name: bPopup
 * @type: jQuery
 * @author: (c) Bjoern Klinggaard - @bklinggaard
 * @demo: http://dinbror.dk/bpopup
 * @version: 0.9.4
 * @requires jQuery 1.4.3
 *==================================================================================================================*/
;(function($) {
	'use strict';
	
    $.fn.bPopup = function(options, callback) {
        
    if ($.isFunction(options)) {
            callback 		= options;
            options 		= null;
        }

		// OPTIONS
        var o 				= $.extend({}, $.fn.bPopup.defaults, options);
        
		// HIDE SCROLLBAR?  
        if (!o.scrollBar)
            $('html').css('overflow', 'hidden');
        
		// VARIABLES	
        var $popup 			= this
          , d 				= $(document)
          , w 				= window
		  , $w				= $(w)
          , wH				= windowHeight()
		  , wW				= windowWidth()
          , prefix			= '__b-popup'
		  , isIOS6X			= (/OS 6(_\d)+/i).test(navigator.userAgent) // Used for a temporary fix for ios6 timer bug when using zoom/scroll 
          , buffer			= 200
		  , popups			= 0
          , id
          , inside
          , fixedVPos
          , fixedHPos
          , fixedPosStyle
		  , vPos
          , hPos
		  , height
		  , width
		  , debounce
		;

		////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PUBLIC FUNCTION - call it: $(element).bPopup().close();
		////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $popup.close = function() {
            o = this.data('bPopup');
			id = prefix +$w.data('bPopup') + '__';
            close();
        };

        return $popup.each(function() {
            if ($(this).data('bPopup')) return; //POPUP already exists?
            init();
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // HELPER FUNCTIONS - PRIVATE
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        function init() {
            triggerCall(o.onOpen);
			popups = ($w.data('bPopup') || 0) + 1, id = prefix + popups + '__',fixedVPos = o.position[1] !== 'auto', fixedHPos = o.position[0] !== 'auto', fixedPosStyle = o.positionStyle === 'fixed', height = $popup.outerHeight(true), width = $popup.outerWidth(true);
            o.loadUrl ? createContent() : open();
        };
		
		function createContent() {
            o.contentContainer = $(o.contentContainer || $popup);
            switch (o.content) {
                case ('iframe'):
					var iframe = $('<iframe class="b-iframe" ' + o.iframeAttr +'></iframe>');
					iframe.appendTo(o.contentContainer);
					height = $popup.outerHeight(true);
					width = $popup.outerWidth(true);
					open();
					iframe.attr('src', o.loadUrl); // setting iframe src after open due IE9 bug
					triggerCall(o.loadCallback);
                    break;
				case ('image'):
					open();
					$('<img />')
						.load(function() {
						    triggerCall(o.loadCallback);
							recenter($(this));
					    }).attr('src', o.loadUrl).hide().appendTo(o.contentContainer);
					break;
                default:
					open();
					$('<div class="b-ajax-wrapper"></div>')
                    	.load(o.loadUrl, o.loadData, function(){
						    triggerCall(o.loadCallback);
							recenter($(this));
						}).hide().appendTo(o.contentContainer);
                    break;
            }
        };

		function open(){
			// MODAL OVERLAY
            if (o.modal) {
                $('<div class="b-modal '+id+'"></div>')
                .css({backgroundColor: o.modalColor, position: 'fixed', top: 0, right:0, bottom:0, left: 0, opacity: 0, zIndex: o.zIndex + popups})
                .appendTo(o.appendTo)
                .fadeTo(o.speed, o.opacity);
            }
			
			// POPUP
			calPosition();
            $popup
				.data('bPopup', o).data('id',id)
				.css({ 
					  'left': o.transition == 'slideIn' || o.transition == 'slideBack' ? (o.transition == 'slideBack' ? d.scrollLeft() + wW : (hPos + width) *-1) : getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle))
					, 'position': o.positionStyle || 'absolute'
					, 'top': o.transition == 'slideDown' || o.transition == 'slideUp' ? (o.transition == 'slideUp' ? d.scrollTop() + wH : vPos + height * -1) : getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle))
					, 'z-index': o.zIndex + popups + 1 
				}).each(function() {
            		if(o.appending) {
                		$(this).appendTo(o.appendTo);
            		}
        		});
			doTransition(true);	
		};
		
        function close() {
            if (o.modal) {
                $('.b-modal.'+$popup.data('id'))
	                .fadeTo(o.speed, 0, function() {
	                    $(this).remove();
	                });
            }
			// Clean up
			unbindEvents();	
			// Close trasition
            doTransition();
            
			return false; // Prevent default
        };
		
		//Eksperimental
		function recenter(content){
			var _width = content.width(), _height = content.height(), css = {};
			o.contentContainer.css({height:_height,width:_width});
			
			if (_height >= $popup.height()){
				css.height = $popup.height();
			}
			if(_width >= $popup.width()){
				css.width = $popup.width();
			}
			height = $popup.outerHeight(true)
			, width = $popup.outerWidth(true);
				
			calPosition();
			o.contentContainer.css({height:'auto',width:'auto'});		
			
			css.left = getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle)),
			css.top = getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle));
			
			$popup
				.animate(
					css
					, 250
					, function() { 
						content.show();
						inside = insideWindow();
					}
				);
		};
		
        function bindEvents() {
            $w.data('bPopup', popups);
			$popup.delegate('.bClose, .' + o.closeClass, 'click.'+id, close); // legacy, still supporting the close class bClose
            
            if (o.modalClose) {
                $('.b-modal.'+id).css('cursor', 'pointer').bind('click', close);
            }
			
			// Temporary disabling scroll/resize events on devices with IOS6+
			// due to a bug where events are dropped after pinch to zoom
            if (!isIOS6X && (o.follow[0] || o.follow[1])) {
               $w.bind('scroll.'+id, function() {
                	if(inside){
                    	$popup
                        	.dequeue()
                            .animate({ 'left': o.follow[0] ? getLeftPos(!fixedPosStyle) : 'auto', 'top': o.follow[1] ? getTopPos(!fixedPosStyle) : 'auto' }, o.followSpeed, o.followEasing);
					 }  
            	}).bind('resize.'+id, function() {
		            wH = windowHeight();
		  		    wW = windowWidth();
					inside = insideWindow();
                   	if(inside){
						clearTimeout(debounce);
						debounce = setTimeout(function(){
							calPosition();
							$popup
	                           	.dequeue()
	                           	.each(function() {
	                               	if(fixedPosStyle) {
	                                	$(this).css({ 'left': hPos, 'top': vPos });
	                               	}
	                               	else {
	                                   	$(this).animate({ 'left': o.follow[0] ? getLeftPos(true) : 'auto', 'top': o.follow[1] ? getTopPos(true) : 'auto' }, o.followSpeed, o.followEasing);
	                               	}
	                           	});
						}, 50);					
                   	}
                });
            }
            if (o.escClose) {
                d.bind('keydown.'+id, function(e) {
                    if (e.which == 27) {  //escape
                        close();
                    }
                });
            }
        };
		
        function unbindEvents() {
            if (!o.scrollBar) {
                $('html').css('overflow', 'auto');
            }
            $('.b-modal.'+id).unbind('click');
            d.unbind('keydown.'+id);
            $w.unbind('.'+id).data('bPopup', ($w.data('bPopup')-1 > 0) ? $w.data('bPopup')-1 : null);
            $popup.undelegate('.bClose, .' + o.closeClass, 'click.'+id, close).data('bPopup', null);
        };
		
		function doTransition(open) {
			switch (open ? o.transition : o.transitionClose || o.transition) {
			   case "slideIn":
				   	animate({
				   		left: open ? getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle)) : d.scrollLeft() - (width || $popup.outerWidth(true)) - buffer
				   	});
			      	break;
			   case "slideBack":
				   	animate({
				   		left: open ? getLeftPos(!(!o.follow[0] && fixedHPos || fixedPosStyle)) : d.scrollLeft() + wW + buffer
				   	});
			      	break;
			   case "slideDown":
				   	animate({
				   		top: open ? getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle)) : d.scrollTop() - (height || $popup.outerHeight(true)) - buffer
				   	});
			      	break;
		   		case "slideUp":
					animate({
						top: open ? getTopPos(!(!o.follow[1] && fixedVPos || fixedPosStyle)) : d.scrollTop() + wH + buffer
					});
		      	  	break;
			   default:
			   	  	//Hardtyping 1 and 0 to ensure opacity 1 and not 0.9999998
				  	$popup.stop().fadeTo(o.speed, open ? 1 : 0, function(){onCompleteCallback(open);});
			}
			
			function animate(css){
			  	$popup
					.css({display: 'block',opacity: 1})
					.animate(css, o.speed, o.easing, function(){ onCompleteCallback(open); });
			};
		};
		
		
		function onCompleteCallback(open){
			if(open){
				bindEvents();
	            triggerCall(callback);
				if(o.autoClose){
					setTimeout(close, o.autoClose);
				}
			} else {
				$popup.hide();
				triggerCall(o.onClose);
				if (o.loadUrl) {
                    o.contentContainer.empty();
					$popup.css({height: 'auto', width: 'auto'});
                }		
			}
		};
		
		function getLeftPos(includeScroll){
			return includeScroll ? hPos + d.scrollLeft() : hPos;
		};
		
		function getTopPos(includeScroll){
			return includeScroll ? vPos + d.scrollTop() : vPos;
		};
		
		function triggerCall(func) {
			$.isFunction(func) && func.call($popup);
		};
		
       	function calPosition(){
			vPos 		= fixedVPos ? o.position[1] : Math.max(0, ((wH- $popup.outerHeight(true)) / 2) - o.amsl)
			, hPos 		= fixedHPos ? o.position[0] : (wW - $popup.outerWidth(true)) / 2
			, inside 	= insideWindow();
		};
		
        function insideWindow(){
            return wH > $popup.outerHeight(true) && wW > $popup.outerWidth(true);
        };
		
		function windowHeight(){
			return w.innerHeight || $w.height();
		};
		
		function windowWidth(){
			return w.innerWidth || $w.width();
		};
    };

	////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DEFAULT VALUES
	////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $.fn.bPopup.defaults = {
          amsl: 			50
        , appending: 		true
        , appendTo: 		'body'
		, autoClose:		false
        , closeClass: 		'b-close'
        , content: 			'ajax' // ajax, iframe or image
        , contentContainer: false
		, easing: 			'swing'
        , escClose: 		true
        , follow: 			[true, true] // x, y
		, followEasing: 	'swing'
        , followSpeed: 		500
		, iframeAttr: 		'scrolling="no" frameborder="0"'
		, loadCallback: 	false
		, loadData: 		false
        , loadUrl: 			false
        , modal: 			true
        , modalClose: 		true
        , modalColor: 		'#000'
        , onClose: 			false
        , onOpen: 			false
        , opacity: 			0.7
        , position: 		['auto', 'auto'] // x, y,
        , positionStyle: 	'absolute'// absolute or fixed
        , scrollBar: 		true
		, speed: 			250 // open & close speed
		, transition:		'fadeIn' //transitions: fadeIn, slideDown, slideIn
		, transitionClose:	false
        , zIndex: 			9997 // popup gets z-index 9999, modal overlay 9998
    };
})(jQuery);
