/*!
 * jQuery Lazy - v0.1.5
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2013, Daniel 'Eisbehr' Kern
 *
 * Dual licensed under the MIT and GPL v2 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * jQuery("img.lazy").lazy();
 */

(function($, window, document, undefined)
{
	$.fn.lazy = function(settings)
	{
		/**
		 * settings and configuration data
		 * @var array
		 */
		var configuration =
		{
			// general
			bind            : "load",
			threshold       : 500,
			fallbackHeight  : 2000,
			visibleOnly     : true,
			
			// delay
			delay           : -1,
			combined        : false,
			
			// attribute
			attribute       : "data-src",
			removeAttribute : true,
			
			// effect
			effect          : "show",
			effectTime      : 0,
			
			// throttle
			enableThrottle  : false,
			throttle        : 250,
			
			// callback
			beforeLoad      : null,
			onLoad          : null,
			afterLoad       : null,
			onError         : null
		}
		
		// overwrite configuration with custom user settings
		if( settings )
			$.extend(configuration, settings);
		
		// all given items by jQuery selector
		var items = this;
		
		// on first page load get initial images
		if( configuration.bind == "load" )
			$(window).load(_init);
		
		// if event driven don't wait for page loading
		else if( configuration.bind == "event" )
			_init();
		
		// bind error callback to images if wanted
		if( configuration.onError )
			items.bind("error", function() { configuration.onError($(this)); });
		
		/**
		 * lazyLoadImages(allImages)
		 * 
		 * check and load all needed images
		 * 
		 * @param boolean allImages
		 * @return void
		 */
		function lazyLoadImages(allImages)
		{
			if( typeof allImages != "boolean" )
				allImages = false;
			
			items.each(function()
			{
				var element = $(this);
				
				if( element.attr(configuration.attribute) && 
					element.attr(configuration.attribute) != element.attr("src") && 
					!element.data("loaded") && 
					(element.is(":visible") || !configuration.visibleOnly) )
				{
					if( _isInLoadableArea(element) || allImages  )
					{
						// bind after load callback to images if wanted
						if( configuration.afterLoad )
							element.bind("load", function() { configuration.afterLoad(element); element.unbind("load"); });
						
						// trigger function before loading image
						if( configuration.beforeLoad )
							configuration.beforeLoad(element);
						
						// load image
						element.hide()
						       .attr("src", element.attr(configuration.attribute))
						       [configuration.effect](configuration.effectTime);
						
						// mark image as loaded
						element.data("loaded", true);
						
						// trigger function before loading image
						if( configuration.onLoad )
							configuration.onLoad(element);
						
						// remove attribute after load
						if( configuration.removeAttribute )
							element.removeAttr(configuration.attribute);
					}
				}
			});
			
			// cleanup all items which are allready loaded
			items = $(items).filter(function()
			{
				return !$(this).data("loaded");
			});
		}
		
		/**
		 * _init()
		 *
		 * initialize lazy plugin
		 * bind loading to events or set delay time to load all images at once
		 *
		 * @return void
		 */
		function _init()
		{
			// if delay time is set load all images at once after delay time
			if( configuration.delay >= 0 )
				setTimeout(function() { lazyLoadImages(true); }, configuration.delay);
			
			// if no delay is set or combine usage is active bin events
			if( configuration.delay < 0 || configuration.combined )
			{
				// load initial images
				lazyLoadImages();
				
				// bind lazy load functions to scroll and resize event
				$(window).bind("scroll", _throttle(configuration.throttle, lazyLoadImages));
				$(window).bind("resize", _throttle(configuration.throttle, lazyLoadImages));
			}
		}
		
		/**
		 * _isInLoadableArea(element)
		 * 
		 * check if the given element is inside the current viewport or threshold
		 * 
		 * @param jQuery element
		 * @return boolean
		 */
		function _isInLoadableArea(element)
		{
			var top = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
			
			if( (top + _getActualHeight() + configuration.threshold) > (element.offset().top + element.height()) )
			{
				return true;
			}
			
			return false;
		}
		
		/**
		 * _getActualHeight()
		 * 
		 * try to allocate current viewport height of the browser
		 * uses fallback option when no height is found
		 * 
		 * @return integer
		 */
		function _getActualHeight()
		{
			if( window.innerHeight )
				return window.innerHeight;
			
			if( document.documentElement && document.documentElement.clientHeight )
				return document.documentElement.clientHeight;
			
			if( document.body && document.body.clientHeight )
				return document.body.clientHeight;
			
			if( document.body && document.body.offsetHeight )
				return document.body.offsetHeight;
			
			return configuration.fallbackHeight;
		}
		
		/**
		 * _throttle(delay, call)
		 * 
		 * helper function to throttle down event triggering
		 * 
		 * @param integer delay
		 * @param object function call
		 * @return function object
		 */
		function _throttle(delay, call)
		{
			var _timeout;
			var _exec = 0;
			
			function callable()
			{
				var elapsed = +new Date() - _exec;
				
				function run()
				{
					_exec = +new Date();
					call.apply();
				};
				
				_timeout && clearTimeout(_timeout);
				
				if( elapsed > delay || !configuration.enableThrottle )
					run();
				else
					_timeout = setTimeout(run, delay - elapsed);
			}
			
			return callable;
		}
		
		return this;
	}
	
	// make lazy a bit more caseinsensitive :)
	$.fn.Lazy = $.fn.lazy;
}
)(jQuery, window, document);