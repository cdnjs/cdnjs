/*!
 * jQuery.SerialScroll
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Licensed under MIT.
 *
 * @projectDescription Animated scrolling of series.
 * @author Ariel Flesler
 * @version 1.2.4
 *
 * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
 */
;(function( $ ){

	var NAMESPACE = '.serialScroll';
	
	var $serialScroll = $.serialScroll = function( settings ){
		return $(window).serialScroll( settings );
	};

	// Many of these defaults, belong to jQuery.ScrollTo, check it's demo for an example of each option.
	// @link {http://demos.flesler.com/jquery/scrollTo/ ScrollTo's Demo}
	$serialScroll.defaults = {// the defaults are public and can be overriden.
		duration:1000, // how long to animate.
		axis:'x', // which of top and left should be scrolled
		event:'click', // on which event to react.
		start:0, // first element (zero-based index)
		step:1, // how many elements to scroll on each action
		lock:true,// ignore events if already animating
		cycle:true, // cycle endlessly ( constant velocity )
		constant:true // use contant speed ?
		/*
		navigation:null,// if specified, it's a selector to a collection of items to navigate the container
		target:window, // if specified, it's a selector to the element to be scrolled.
		interval:0, // it's the number of milliseconds to automatically go to the next
		lazy:false,// go find the elements each time (allows AJAX or JS content, or reordering)
		stop:false, // stop any previous animations to avoid queueing
		force:false,// force the scroll to the first element on start ?
		jump: false,// if true, when the event is triggered on an element, the pane scrolls to it
		items:null, // selector to the items (relative to the matched elements)
		prev:null, // selector to the 'prev' button
		next:null, // selector to the 'next' button
		onBefore: function(){}, // function called before scrolling, if it returns false, the event is ignored
		exclude:0 // exclude the last x elements, so we cannot scroll past the end
		*/
	};

	$.fn.serialScroll = function( options ){

		return this.each(function(){
			var 
				settings = $.extend( {}, $serialScroll.defaults, options ),
				// this one is just to get shorter code when compressed
				event = settings.event, 
				// ditto
				step = settings.step, 
				// ditto
				lazy = settings.lazy, 
				// if a target is specified, then everything's relative to 'this'.
				context = settings.target ? this : document, 
				// the element to be scrolled (will carry all the events)
				$pane = $(settings.target || this, context),
				// will be reused, save it into a variable
				pane = $pane[0], 
				// will hold a lazy list of elements
				items = settings.items, 
				// index of the currently selected item
				active = settings.start, 
				// boolean, do automatic scrolling or not
				auto = settings.interval, 
				// save it now to make the code shorter
				nav = settings.navigation, 
				// holds the interval id
				timer; 

			// If no match, just ignore
			if(!pane)
				return;
				
			// if not lazy, save the items now
			if( !lazy )
				items = getItems();

			// generate an initial call
			if( settings.force || auto )
				jump( {}, active );

			// Button binding, optional
			$(settings.prev||[], context).bind( event, -step, move );
			$(settings.next||[], context).bind( event, step, move );

			// Custom events bound to the container
			if( !pane.ssbound )
				$pane
					 // You can trigger with just 'prev'
					.bind('prev'+NAMESPACE, -step, move )
					// f.e: $(container).trigger('next');
					.bind('next'+NAMESPACE, step, move )
					// f.e: $(container).trigger('goto', 4 );
					.bind('goto'+NAMESPACE, jump );

			if( auto )
				$pane
					.bind('start'+NAMESPACE, function(e){
						if( !auto ){
							clear();
							auto = true;
							next();
						}
					 })
					.bind('stop'+NAMESPACE, function(){
						clear();
						auto = false;
					});

			// Let serialScroll know that the index changed externally
			$pane.bind('notify'+NAMESPACE, function(e, elem){
				var i = index(elem);
				if( i > -1 )
					active = i;
			});

			// Avoid many bindings
			pane.ssbound = true;

			// Can't use jump if using lazy items and a non-bubbling event
			if( settings.jump )
				(lazy ? $pane : getItems()).bind( event, function( e ){
					jump( e, index(e.target) );
				});

			if( nav )
				nav = $(nav, context).bind(event, function( e ){
					e.data = Math.round(getItems().length / nav.length) * nav.index(this);
					jump( e, this );
				});

			function move( e ){
				e.data += active;
				jump( e, this );
			};

			function jump( e, pos ){
				if( isNaN(pos) )
					pos = e.data;

				var	n, 
					// Is a real event triggering ?
					real = e.type, 
					// Handle a possible exclude
					$items = settings.exclude ? getItems().slice(0,-settings.exclude) : getItems(),
					limit = $items.length - 1,
					elem = $items[pos],
					duration = settings.duration;

				if( real )
					e.preventDefault();

				if( auto ){
					// clear any possible automatic scrolling.
					clear();
					timer = setTimeout( next, settings.interval ); 
				}

				// exceeded the limits
				if( !elem ){
					n = pos < 0 ? 0 : limit;
					// we exceeded for the first time
					if( active !== n )
						pos = n;
					// this is a bad case
					else if( !settings.cycle )
						return;
					// invert, go to the other side
					else
						pos = limit - n;
					elem = $items[pos];
				}

				// no animations while busy
				if( !elem || settings.lock && $pane._scrollable().is(':animated') ||
					real && settings.onBefore &&
					// Allow implementors to cancel scrolling
					settings.onBefore(e, elem, $pane, getItems(), pos) === false ) return;

				if( settings.stop )
					// remove all running animations
					$pane._scrollable().stop(true);

				if( settings.constant )
					// keep constant velocity
					duration = Math.abs(duration/step * (active - pos));

				$pane.scrollTo( elem, duration, settings );
				
				// in case serialScroll was called on this elemement more than once.
				trigger('notify', pos);
			};

			function next(){
				trigger('next');
			};

			function clear(){
				clearTimeout(timer);
			};

			function getItems(){
				return $( items, pane );
			};
			
			// I'll use the namespace to avoid conflicts
			function trigger(event){
				$pane.trigger(
					event+NAMESPACE,
					[].slice.call(arguments,1)
				);
			}
			
			function index( elem ){
				// Already a number
				if( !isNaN(elem) )
					return elem;

				var $items = getItems(), i;
				// See if it matches or one of its ancestors
				while(( i = $items.index(elem)) === -1 && elem !== pane )
					elem = elem.parentNode;
				return i;
			};
		});
	};

})( jQuery );