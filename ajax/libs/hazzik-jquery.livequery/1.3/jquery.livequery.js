/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Dual licensed under the MIT (MIT_LICENSE.txt)
 * and GPL Version 2 (GPL_LICENSE.txt) licenses.
 *
 * Version: 1.3
 * Requires jQuery 1.3+
 * Docs: http://docs.jquery.com/Plugins/livequery
 */

(function($) {

$.extend($.fn, {
	livequery: function(fn, fn2) {
		var me = this, q;

		// See if Live Query already exists
		$.each( $.livequery.queries, function(i, query) {
			if ( me.selector == query.selector && me.context == query.context &&
				(!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) )
					// Found the query, exit the each loop
					return (q = query) && false;
		});

		// Create new Live Query if it wasn't found
		q = q || new $.livequery(me.selector, me.context, fn, fn2);

		// Make sure it is running
		q.stopped = false;

		// Run it immediately for the first time
		q.run();

		// Contnue the chain
		return me;
	},

	expire: function(fn, fn2) {
		var me = this;

		// Find the Live Query based on arguments and stop it
		$.each( $.livequery.queries, function(i, query) {
			if ( me.selector == query.selector && me.context == query.context &&
				(!fn || fn.$lqguid == query.fn.$lqguid) && (!fn2 || fn2.$lqguid == query.fn2.$lqguid) && !me.stopped )
					$.livequery.stop(query.id);
		});

		// Continue the chain
		return me;
	}
});

$.livequery = function(selector, context, fn, fn2) {
	var me = this;

	me.selector = selector;
	me.context  = context;
	me.fn       = fn;
	me.fn2      = fn2;
	me.elements = $([]);
	me.stopped  = false;

	// The id is the index of the Live Query in $.livequery.queries
	me.id = $.livequery.queries.push(me)-1;

	// Mark the functions for matching later on
	fn.$lqguid = fn.$lqguid || $.livequery.guid++;
	if (fn2) fn2.$lqguid = fn2.$lqguid || $.livequery.guid++;

	// Return the Live Query
	return me;
};

$.livequery.prototype = {
	stop: function() {
		var me = this;
		// Short-circuit if stopped
		if ( me.stopped ) return;

		if (me.fn2)
			// Call the second function for all matched elements
			me.elements.each(me.fn2);

		// Clear out matched elements
		me.elements = $([]);

		// Stop the Live Query from running until restarted
		me.stopped = true;
	},

	run: function() {
		var me = this;
		// Short-circuit if stopped
		if ( me.stopped ) return;		

		var oEls = me.elements,
			els  = $(me.selector, me.context),
			newEls = els.not(oEls),
			delEls = oEls.not(els);

		// Set elements to the latest set of matched elements
		me.elements = els;

		// Call the first function for newly matched elements
		newEls.each(me.fn);

		// Call the second function for elements no longer matched
		if ( me.fn2 )
			delEls.each(me.fn2);
	}
};

$.extend($.livequery, {
	guid: 0,
	queries: [],
	queue: [],
	running: false,
	timeout: null,

	checkQueue: function() {
		if ( $.livequery.running && $.livequery.queue.length ) {
			var length = $.livequery.queue.length;
			// Run each Live Query currently in the queue
			while ( length-- )
				$.livequery.queries[ $.livequery.queue.shift() ].run();
		}
	},

	pause: function() {
		// Don't run anymore Live Queries until restarted
		$.livequery.running = false;
	},

	play: function() {
		// Restart Live Queries
		$.livequery.running = true;
		// Request a run of the Live Queries
		$.livequery.run();
	},

	registerPlugin: function() {
		$.each( arguments, function(i,n) {
			// Short-circuit if the method doesn't exist
			if (!$.fn[n]) return;

			// Save a reference to the original method
			var old = $.fn[n];

			// Create a new method
			$.fn[n] = function() {
				// Call the original method
				var r = old.apply(this, arguments);

				// Request a run of the Live Queries
				$.livequery.run();

				// Return the original methods result
				return r;
			}
		});
	},

	run: function(id) {
		if (id != undefined) {
			// Put the particular Live Query in the queue if it doesn't already exist
			if ( $.inArray(id, $.livequery.queue) < 0 )
				$.livequery.queue.push( id );
		}
		else
			// Put each Live Query in the queue if it doesn't already exist
			$.each( $.livequery.queries, function(id) {
				if ( $.inArray(id, $.livequery.queue) < 0 )
					$.livequery.queue.push( id );
			});

		// Clear timeout if it already exists
		if ($.livequery.timeout) clearTimeout($.livequery.timeout);
		// Create a timeout to check the queue and actually run the Live Queries
		$.livequery.timeout = setTimeout($.livequery.checkQueue, 20);
	},

	stop: function(id) {
		if (id != undefined)
			// Stop are particular Live Query
			$.livequery.queries[ id ].stop();
		else
			// Stop all Live Queries
			$.each( $.livequery.queries, $.livequery.prototype.stop);
	}
});

// Register core DOM manipulation methods
$.livequery.registerPlugin('append', 'prepend', 'after', 'before', 'wrap', 'attr', 'removeAttr', 'addClass', 'removeClass', 'toggleClass', 'empty', 'remove', 'html', 'prop', 'removeProp');

// Run Live Queries when the Document is ready
$(function() { $.livequery.play(); });

})(jQuery);