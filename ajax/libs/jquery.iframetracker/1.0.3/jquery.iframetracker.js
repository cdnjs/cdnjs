/**
 * jQuery iframe click tracking plugin
 * Version 1.3 (2014-05-16)
 * Copyright © 2014 Vincent Paré, www.finalclap.com
 */
(function($){
	// Registering new tracking handler
	$.fn.iframeTracker = function(handler){
		// Storing the new handler into handler list
		$.iframeTracker.handlersList.push(handler);
		
		// Binding boundary listener
		$(this)
			.bind('mouseover', {handler: handler}, function(e){
				e.data.handler.over = true;
				try{ e.data.handler.overCallback(this); } catch(ex){}
			})
			.bind('mouseout',  {handler: handler}, function(e){
				e.data.handler.over = false;
				$.iframeTracker.focusRetriever.focus();
				try{ e.data.handler.outCallback(this); } catch(ex){}
			});
	};
	
	// Iframe tracker common object
	$.iframeTracker = {
		// Attributes
		focusRetriever: null,  // Element used for restoring focus on window (element)
		focusRetrieved: false, // Says if the focus was retrived on the current page (bool)
		handlersList: [],      // Store a list of every trakers (created by calling $(selector).iframeTracker...)
		isIE8AndOlder: false,  // true for Internet Explorer 8 and older
		
		// Init (called once on document ready)
		init: function(){
			// Determine browser version (IE8-) ($.browser.msie is deprecated since jQuery 1.9)
			try{
				if( $.browser.msie == true && $.browser.version < 9 ){
					this.isIE8AndOlder = true;
				}
			} catch(ex){
				try{
					var matches = navigator.userAgent.match(/(msie) ([\w.]+)/i);
					if( matches[2] < 9 ){
						this.isIE8AndOlder = true;
					}
				} catch(ex2){}
			}
			
			// Listening window blur
			$(window).focus();
			$(window).blur(function(e){
				$.iframeTracker.windowLoseFocus(e);
			});
			
			// Focus retriever
			$('body').append('<div style="position:fixed; top:0; left:0; overflow:hidden;"><input style="position:absolute; left:-300px;" type="text" value="" id="focus_retriever" readonly="true" /></div>');
			this.focusRetriever = $('#focus_retriever');
			this.focusRetrieved = false;
			// Focus back to page
			$(document).mousemove(function(e){
				if( document.activeElement && document.activeElement.tagName == 'IFRAME' ){
					$.iframeTracker.focusRetriever.focus();
					$.iframeTracker.focusRetrieved = true;
				}
			});
			// Blur doesn't works correctly on IE8-, so we need to trigger it manually
			if( this.isIE8AndOlder ){
				this.focusRetriever.blur(function(e){
					e.stopPropagation();
					e.preventDefault();
					$.iframeTracker.windowLoseFocus(e);
				});
			}
			
			// Keep focus on window (fix bug IE8-, focusable elements)
			if( this.isIE8AndOlder ){
				$('body').click(function(e){ $(window).focus(); });
				$('form').click(function(e){ e.stopPropagation(); });
				
				// Same thing for "post-DOMready" created forms (issue #6)
				try{
					$('body').on('click', 'form', function(e){ e.stopPropagation(); });
				} catch(ex){
					console.log("[iframeTracker] Please update jQuery to 1.7 or newer. (exception: " + ex.message + ")");
				}
			}
		},
		
		// Blur on window => calling blurCallback for every handler with over=true
		windowLoseFocus: function(event){
			for(var i in this.handlersList){
				if( this.handlersList[i].over == true ){
					try{ this.handlersList[i].blurCallback(); } catch(ex){}
				}
			}
		}
	};
	
	// Init the iframeTracker on document ready
	$(document).ready(function(){
		$.iframeTracker.init();
	});
})(jQuery);