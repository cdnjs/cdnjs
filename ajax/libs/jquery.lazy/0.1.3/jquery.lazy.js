/*!
 * jQuery Lazy - v0.1.3
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

(function($, window, undefined)
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
			threshold       : 300,
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
			afterLoad       : null
		}
		
		// overwrite configuration with custom user settings
		if( settings )
			$.extend(configuration, settings);
		
		// all given items by jQuery selector
		var items = this;
		
		// on first page load get initial images
		if( configuration.bind == "load" )
		{
			$(window).load(function()
			{
				_init();
			});
		}
		
		// if event driven don't wait for page loading
		else if( configuration.bind == "event" )
		{
			_init();
		}
		
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
			
			// get only item wich have an tag attribute
			items = items.filter("[" + configuration.attribute + "]");
			
			items.each(function()
			{
				var element = $(this);
				
				if( element.attr(configuration.attribute) && 
					element.attr(configuration.attribute) != element.attr("src") && 
					(element.is(":visible") || !configuration.visibleOnly) )
				{
					if( _isInLoadableArea(element) || allImages  )
					{
						// trigger function before loading image
						if( configuration.beforeLoad )
							configuration.beforeLoad(element);
						
						element.hide().attr("src", element.attr(configuration.attribute))[configuration.effect](configuration.effectTime);
						
						// remove attribute after load
						if( configuration.removeAttribute )
							element.removeAttr(configuration.attribute);
						
						// trigger function after loading image
						if( configuration.afterLoad )
							configuration.afterLoad(element);
					}
				}
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
			{
				setTimeout(function() { lazyLoadImages(true); }, configuration.delay);
			}
			
			// if no delay is set or combine usage is active bin events
			if( configuration.delay < 0 || configuration.combined )
			{
				// bind lazy load functions to scroll and resize event
				$(window).bind("scroll", _throttle(configuration.throttle, lazyLoadImages));
				$(window).bind("resize", _throttle(configuration.throttle, lazyLoadImages));
				
				// load initial images
				lazyLoadImages();
			}
		}
		
		/**
		 * _isInLoadableArea(element)
		 * 
		 * try to allocate current viewport height of the browser
		 * uses fallback option when no height was found
		 * 
		 * @param jQuery element
		 * @return integer
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
			{
				return window.innerHeight;
			}
			
			if( document.documentElement && document.documentElement.clientHeight )
			{
				return document.documentElement.clientHeight;
			}
			
			if( document.body && document.body.clientHeight )
			{
				return document.body.clientHeight;
			}
			
			if( document.body && document.body.offsetHeight )
			{
				return document.body.offsetHeight;
			}
			
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
				{
					run();
				}
				else
				{
					_timeout = setTimeout(run, delay - elapsed);
				}
			}
			
			return callable;
		}
		
		return this;
	}
	
	// make lazy a bit more caseinsensitive :)
	$.fn.Lazy = $.fn.lazy;
}
)(jQuery, window);