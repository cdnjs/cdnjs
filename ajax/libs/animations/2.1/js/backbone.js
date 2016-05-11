//	Backbone v1.7, Copyright 2014, Joe Mottershaw, https://github.com/joemottershaw/
//	================================================================================

//	Table of Contents
//	==================================================
//		#Tipsy
//		#Scroll To Top


//	#Tipsy
//	==================================================

	// Show/Hide
		$('.tip-tl').tipsy({ gravity: 'se', html: true, title: 'data-tooltip', offset: 5, live: true });
		$('.tip-t').tipsy({ gravity: 's', html: true, title: 'data-tooltip', offset: 5, live: true });
		$('.tip-tr').tipsy({ gravity: 'sw', html: true, title: 'data-tooltip', offset: 5, live: true });
		$('.tip-r').tipsy({ gravity: 'w', html: true, title: 'data-tooltip', offset: 5, live: true });
		$('.tip-br').tipsy({ gravity: 'nw', html: true, title: 'data-tooltip', offset: 5, live: true });
		$('.tip-b').tipsy({ gravity: 'n', html: true, title: 'data-tooltip', offset: 5, live: true });
		$('.tip-bl').tipsy({ gravity: 'ne', html: true, title: 'data-tooltip', offset: 5, live: true });
		$('.tip-l').tipsy({ gravity: 'e', html: true, title: 'data-tooltip', offset: 5, live: true });

	// Fade In/Out
		$('.tip-tl-fade').tipsy({ gravity: 'se', html: true, title: 'data-tooltip', offset: 5, fade: true, fadeSpeed: 150, live: true });
		$('.tip-t-fade').tipsy({ gravity: 's', html: true, title: 'data-tooltip', offset: 5, fade: true, fadeSpeed: 150, live: true });
		$('.tip-tr-fade').tipsy({ gravity: 'sw', html: true, title: 'data-tooltip', offset: 5, fade: true, fadeSpeed: 150, live: true });
		$('.tip-r-fade').tipsy({ gravity: 'w', html: true, title: 'data-tooltip', offset: 5, fade: true, fadeSpeed: 150, live: true });
		$('.tip-br-fade').tipsy({ gravity: 'nw', html: true, title: 'data-tooltip', offset: 5, fade: true, fadeSpeed: 150, live: true });
		$('.tip-b-fade').tipsy({ gravity: 'n', html: true, title: 'data-tooltip', offset: 5, fade: true, fadeSpeed: 150, live: true });
		$('.tip-bl-fade').tipsy({ gravity: 'ne', html: true, title: 'data-tooltip', offset: 5, fade: true, fadeSpeed: 150, live: true });
		$('.tip-l-fade').tipsy({ gravity: 'e', html: true, title: 'data-tooltip', offset: 5, fade: true, fadeSpeed: 150, live: true });


//	#Scroll To Top
//	==================================================

	$(document).ready(function() {
		$('.scroll-to-top').click(function() {
			$('html, body').animate({ scrollTop: 0 }, 1600, 'easeInOutQuart');
			return false;
		});
	});