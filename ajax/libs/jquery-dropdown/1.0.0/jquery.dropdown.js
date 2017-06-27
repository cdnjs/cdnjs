/*
 * jQuery dropdown: A simple dropdown plugin
 *
 * Inspired by Bootstrap: http://twitter.github.com/bootstrap/javascript.html#dropdowns
 *
 * Copyright 2013 Cory LaViska for A Beautiful Site, LLC. (http://abeautifulsite.net/)
 *
 * Dual licensed under the MIT / GPL Version 2 licenses
 *
*/
if(jQuery) (function($) {
	
	$.extend($.fn, {
		dropdown: function(method, data) {
			
			switch( method ) {
				case 'hide':
					hide();
					return $(this);
				case 'attach':
					return $(this).attr('data-dropdown', data);
				case 'detach':
					hide();
					return $(this).removeAttr('data-dropdown');
				case 'disable':
					return $(this).addClass('dropdown-disabled');
				case 'enable':
					hide();
					return $(this).removeClass('dropdown-disabled');
			}
			
		}
	});
	
	function show(event) {
		
		var trigger = $(this),
			dropdown = $(trigger.attr('data-dropdown')),
			isOpen = trigger.hasClass('dropdown-open');
		
		// In some cases we don't want to show it
		if( trigger !== event.target && $(event.target).hasClass('dropdown-ignore') ) return;
		
		event.preventDefault();
		event.stopPropagation();
		hide();
		
		if( isOpen || trigger.hasClass('dropdown-disabled') ) return;
		
		// Show it
		trigger.addClass('dropdown-open');
		dropdown
			.data('dropdown-trigger', trigger)
			.show();
			
		// Position it
		position();
		
		// Trigger the show callback
		dropdown
			.trigger('show', {
				dropdown: dropdown,
				trigger: trigger
			});
		
	}
	
	function hide(event) {
		
		// In some cases we don't hide them
		var targetGroup = event ? $(event.target).parents().addBack() : null;
		
		// Are we clicking anywhere in a dropdown?
		if( targetGroup && targetGroup.is('.dropdown') ) {
			// Is it a dropdown menu?
			if( targetGroup.is('.dropdown-menu') ) {
				// Did we click on an option? If so close it.
				if( !targetGroup.is('A') ) return;
			} else {
				// Nope, it's a panel. Leave it open.
				return;
			}
		}
		
		// Hide any dropdown that may be showing
		$(document).find('.dropdown:visible').each( function() {
			var dropdown = $(this);
			dropdown
				.hide()
				.removeData('dropdown-trigger')
				.trigger('hide', { dropdown: dropdown });
		});
		
		// Remove all dropdown-open classes
		$(document).find('.dropdown-open').removeClass('dropdown-open');
		
	}
	
	function position() {
		
		var dropdown = $('.dropdown:visible').eq(0),
			trigger = dropdown.data('dropdown-trigger'),
			hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
			vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;
		
		if( dropdown.length === 0 || !trigger ) return;
		
		// Position the dropdown
		dropdown
			.css({
				left: dropdown.hasClass('dropdown-anchor-right') ? 
					trigger.offset().left - (dropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
				top: trigger.offset().top + trigger.outerHeight() + vOffset
			});
		
	}
	
	$(document).on('click.dropdown', '[data-dropdown]', show);
	$(document).on('click.dropdown', hide);
	$(window).on('resize', position);
	
})(jQuery);
