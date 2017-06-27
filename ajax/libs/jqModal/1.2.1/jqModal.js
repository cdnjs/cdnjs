/*
 * jqModal - Minimalist Modaling with jQuery
 *
 * Copyright (c) 2007-2015 Brice Burgess @IceburgBrice
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $Version: 1.2.0 (2015.04.01 +r23)
 * Requires: jQuery 1.2.3+
 */

(function($) {
	
	/**
	 * Initialize a set of elements as "modals". Modals typically are popup dialogs,
	 * notices, modal windows, &c. 
	 * 
	 * @name jqm
	 * @param options user defined options, augments defaults.
	 * @type jQuery
	 * @cat Plugins/jqModal
	 */
	
	$.fn.jqm=function(options){
		return this.each(function(){
			var e = $(this),
				jqm = e.data('jqm') || $.extend({ID: I++}, $.jqm.params),
				o = $.extend(jqm,options);
			
			// add/extend options to modal and mark as initialized
			e.data('jqm',o).addClass('jqm-init')[0]._jqmID = o.ID;
			
			// ... Attach events to trigger showing of this modal
			o.trigger && e.jqmAddTrigger(o.trigger);
		});
	};
	
	
	/**
	 * Matching modals will have their jqmShow() method fired by attaching a
	 *   onClick event to elements matching `trigger`.
	 * 
	 * @name jqmAddTrigger
	 * @param trigger a selector String, jQuery collection of elements, or a DOM element.
	 */
	$.fn.jqmAddTrigger=function(trigger){
		return this.each(function(){
			if(!addTrigger($(this), 'jqmShow', trigger))
				err("jqmAddTrigger must be called on initialized modals")
		});
	};
	
	
	/**
	 * Matching modals will have their jqmHide() method fired by attaching an
	 *   onClick event to elements matching `trigger`.
	 * 
	 * @name jqmAddClose
	 * @param trigger a selector String, jQuery collection of elements, or a DOM element.
	 */
	$.fn.jqmAddClose=function(trigger){
		return this.each(function(){
			if(!addTrigger($(this), 'jqmHide', trigger))
				err("jqmAddClose must be called on initialized modals")
		});
	};
	
	
	/**
	 * Open matching modals (if not shown)
	 */
	$.fn.jqmShow=function(trigger){
		return this.each(function(){ !this._jqmShown&&show($(this), trigger); });
	};
	
	/**
	 * Close matching modals
	 */
	$.fn.jqmHide=function(trigger){
		return this.each(function(){ this._jqmShown&&hide($(this), trigger); });
	};
	
	
	// utility functions
	
	var
		err = function(msg){
			if(window.console && window.console.error) window.console.error(msg);
		
		
	}, show = function(e, t){
		
		/**
		 * e = modal element (as jQuery object)
		 * t = triggering element
		 * 
		 * o = options
		 * z = z-index of modal
		 * v = overlay element (as jQuery object)
		 * h = hash (for jqModal <= r15 compatibility)
		 */
		
		var o = e.data('jqm'),
			t = t || window.event,
			z = (parseInt(e.css('z-index'))),
			z = (z > 0) ? z : 3000,
			v = $('<div></div>').addClass(o.overlayClass).css({height:'100%',width:'100%',position:'fixed',left:0,top:0,'z-index':z-1,opacity:o.overlay/100}),
		
			// maintain legacy "hash" construct
			h = {w: e, c: o, o: v, t: t};	
			
		e.css('z-index',z);

		if(o.ajax){
			var target = o.target || e,
				url = o.ajax;
			
			target = (typeof target == 'string') ? $(target,e) : $(target);
			if(url.substr(0,1) == '@') url = $(t).attr(url.substring(1));
			
			 // Load the Ajax Content (and once loaded);
			   // Fire the onLoad callback (if exists),
			   // Attach closing events to elements inside the modal that match the closingClass,
			   // and Execute the jqModal default Open Callback
			target.html(o.ajaxText).load(url,function(){
				o.onLoad && o.onLoad.call(this,h);
				open(h);
			});	
		}
		else { open(h); }
		
	}, hide = function(e, t){
		/**
		 * e = modal element (as jQuery object)
		 * t = triggering element
		 * 
		 * o = options
		 * h = hash (for jqModal <= r15 compatibility)
		 */
		
		var o = e.data('jqm'),
			t = t || window.event,
		
		// maintain legacy "hash" construct
		h = {w: e, c: o, o: e.data('jqmv'), t: t};
		
		close(h);
		
	}, onShow = function(hash){
		// onShow callback. Responsible for showing a modal and overlay.
		//  return false to stop opening modal. 
		
		// hash object;
		//  w: (jQuery object) The modal element
		//  c: (object) The modal's options object 
		//  o: (jQuery object) The overlay element
		//  t: (DOM object) The triggering element
		
		// display the overlay (prepend to body) if not disabled
		if(hash.c.overlay > 0)
			hash.o.prependTo('body');
			
		// make modal visible
		hash.w.show();
		
		// call focusFunc (attempts to focus on first input in modal)
		$.jqm.focusFunc(hash.w,true);
		
		return true;
		
		
	}, onHide = function(hash){
		// onHide callback. Responsible for hiding a modal and overlay.
		//  return false to stop closing modal. 
		
		// hash object;
		//  w: (jQuery object) The modal element
		//  c: (object) The modal's options object 
		//  o: (jQuery object) The overlay element
		//  t: (DOM object) The triggering element
		
		// hide modal and if overlay, remove overlay.
		hash.w.hide() && hash.o && hash.o.remove();
		
		return true;
		
		
	},  addTrigger = function(e, key, trigger){
		// addTrigger: Adds a jqmShow/jqmHide (key) event click on modal (e)
		//  to all elements that match trigger string (trigger)
		
		var jqm = e.data('jqm');
		
		// return false if e is not an initialized modal element
		if(!e.data('jqm')) return false;
		
		return $(trigger).each(function(){
			this[key] = this[key] || [];
			
			// register this modal with this trigger only once
			if($.inArray(jqm.ID,this[key]) < 0) {
				this[key].push(jqm.ID);
				
				// register trigger click event for this modal
				$(this).click(function(){
					var trigger = this;
					
					e[key](this);
					
					// stop trigger click event from bubbling
					return false;
				});
			}
			
		});
		
	},  open = function(h){
		// open: executes the onOpen callback + performs common tasks if successful

		// transform legacy hash into new var shortcuts 
		var e = h.w,
			v = h.o,
			o = h.c;
		

		// execute onShow callback
		if(o.onShow(h) !== false){
			// mark modal as shown
			e[0]._jqmShown = true;
			
			// if modal dialog 
			//
			// Bind the Keep Focus Function [F] if no other Modals are open (!ActiveModals[0]) +
			// 
			// else, close dialog when overlay is clicked
			if(o.modal){ !ActiveModals[0]&&F('bind'); ActiveModals.push(e[0]); }
			else e.jqmAddClose(v);
			
			//  Attach closing events to elements inside the modal matching closingClass
			o.closeClass&&e.jqmAddClose($('.' + o.closeClass,e));
			
			// IF toTop is true and overlay exists;
			//  Add placeholder element <span id="jqmP#ID_of_modal"/> before modal to
			//  remember it's position in the DOM and move it to a child of the body tag (after overlay)
			o.toTop&&v&&e.before('<span id="jqmP'+o.ID+'"></span>').insertAfter(v);
			
			// remember overlay (for closing function)
			e.data('jqmv',v);

			// close modal if the esc key is pressed and closeOnEsc is set to true
			e.unbind("keydown",$.jqm.closeOnEscFunc);
			if(o.closeOnEsc) {
				e.attr("tabindex", 0).bind("keydown",$.jqm.closeOnEscFunc).focus();
			}
		}
		
		
	},  close = function(h){
		// close: executes the onHide callback + performs common tasks if successful

		// transform legacy hash into new var shortcuts 
		 var e = h.w,
			v = h.o,
			o = h.c;

		// execute onShow callback
		if(o.onHide(h) !== false){
			// mark modal as !shown
			e[0]._jqmShown = false;
			
			 // If modal, remove from modal stack.
			 // If no modals in modal stack, unbind the Keep Focus Function
			 if(o.modal){ActiveModals.pop();!ActiveModals[0]&&F('unbind');}
			 
			 // IF toTop was passed and an overlay exists;
			 //  Move modal back to its "remembered" position.
			 o.toTop&&v&&$('#jqmP'+o.ID).after(e).remove();
		}
		
		
	},  F = function(t){
		// F: The Keep Focus Function (for modal: true dialos)
		// Binds or Unbinds (t) the Focus Examination Function (X) to keypresses and clicks
		
		$(document)[t]("keypress keydown mousedown",X);
		
		
	}, X = function(e){
		// X: The Focus Examination Function (for modal: true dialogs)

		var targetModal = $(e.target).data('jqm') || $(e.target).parents('.jqm-init:first').data('jqm');
		var activeModal = ActiveModals[ActiveModals.length-1];
		
		// allow bubbling if event target is within active modal dialog
		return (targetModal && targetModal.ID == activeModal._jqmID) ? 
		  true : $.jqm.focusFunc(activeModal,e);
	}, 
	
	I = 0,   // modal ID increment (for nested modals) 
	ActiveModals = [];  // array of active modals (used to lock interactivity to appropriate modal)
	
	
	// $.jqm, overridable defaults
	$.jqm = {
		/**
		 *  default options
		 *    
		 * (Integer)   overlay      - [0-100] Translucency percentage (opacity) of the body covering overlay. Set to 0 for NO overlay, and up to 100 for a 100% opaque overlay.  
		 * (String)    overlayClass - Applied to the body covering overlay. Useful for controlling overlay look (tint, background-image, &c) with CSS.
		 * (String)    closeClass   - Children of the modal element matching `closeClass` will fire the onHide event (to close the modal).
		 * (Mixed)     trigger      - Matching elements will fire the onShow event (to display the modal). Trigger can be a selector String, a jQuery collection of elements, a DOM element, or a False boolean.
		 * (String)    ajax         - URL to load content from via an AJAX request. False to disable ajax. If ajax begins with a "@", the URL is extracted from the attribute of the triggering element (e.g. use '@data-url' for; <a href="#" class="jqModal" data-url="modal.html">...)	                
		 * (Mixed)     target       - Children of the modal element to load the ajax response into. If false, modal content will be overwritten by ajax response. Useful for retaining modal design. 
		 *                            Target may be a selector string, jQuery collection of elements, or a DOM element -- and MUST exist as a child of the modal element.
		 * (String)    ajaxText     - Text shown while waiting for ajax return. Replaces HTML content of `target` element.
		 * (Boolean)   modal        - If true, user interactivity will be locked to the modal window until closed.
		 * (Boolean)   toTop        - If true, modal will be posistioned as a first child of the BODY element when opened, and its DOM posistion restored when closed. Useful for overcoming z-Index container issues.
		 * (Function)  onShow       - User defined callback function fired when modal opened.
		 * (Function)  onHide       - User defined callback function fired when modal closed.
		 * (Function)  onLoad       - User defined callback function fired when ajax content loads.
		 */
		params: {
			overlay: 50,
			overlayClass: 'jqmOverlay',
			closeClass: 'jqmClose',
			closeOnEsc: false,
			trigger: '.jqModal',
			ajax: false,
			target: false,
			ajaxText: '',
			modal: false,
			toTop: false,
			onShow: onShow,
			onHide: onHide,
			onLoad: false
		},
		
		// focusFunc is fired:
		//   a) when a modal:true dialog is shown, 
		//   b) when an event occurs outside an active modal:true dialog
		// It is passed the active modal:true dialog as well as event 
		focusFunc: function(activeModal, event) { 
		  
		  // if the event occurs outside the activeModal, focus on first element
		  if(event) { 
		    $(':input:visible:first',activeModal).focus();
		  } 
		  
		  // lock interactions to the activeModal
		  return false; 
		},
		  
		// closeOnEscFunc is attached to modals where closeOnEsc param true.
		closeOnEscFunc: function(event){
			if (event.keyCode == 27) {
				$(this).jqmHide();
				return false;
			}
		}
	};
	
})( jQuery );