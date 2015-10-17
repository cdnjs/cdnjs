/*!
 * jQuery Lazy v0.1.1
 * http://jquery.eisbehr.de/lazy/
 *
 * Copyright 2013, Daniel 'Eisbehr' Kern
 *
 * licensed under the MIT license
 * http://www.opensource.org/licenses/mit-license.php
 *
 * jQuery("img.lazyload").lazy();
 */

(function($, window, undefined)
{
	$.fn.lazy = function(settings)
	{
		/**
		 * basic configuration data
		 * @var array
		 */
		var configuration =
		{
			attribute       : "data-src",
			removeAttribute : true,
			threshold       : 300,
			visibleOnly     : true,
			beforeLoad      : null,
			afterLoad       : null,
			enableThrottle  : false,
			throttle        : 250,
			fallbackHeight  : 2000
		}
		
		// overwrite configuration with custom user settings
		if( settings )
		{
			$.extend(configuration, settings);
		}
		
		// all given items by jQuery selector
		var items = this;
		
		// bind lazy load functions to scroll and resize event
		$(window).bind("scroll", _throttle(configuration.throttle, lazyLoadImages));
		$(window).bind("resize", _throttle(configuration.throttle, lazyLoadImages));
		
		// on first page load get initial images
		$(window).load(function()
		{
			lazyLoadImages()
		});
		
		/**
		 * loadImages()
		 * 
		 * check and load all images
		 * 
		 * @return void
		 */
		function lazyLoadImages()
		{
			// get only item wich have an tag attribute
			items = items.filter("[" + configuration.attribute + "]");
			
			items.each(function()
			{
				var element = $(this);
				
				if( element.attr(configuration.attribute) && (element.is(":visible") || !configuration.visibleOnly) )
				{
					if( _isInLoadableArea(element) )
					{
						// trigger function before loading image
						if( configuration.beforeLoad )
							configuration.beforeLoad(element);
						
						element.attr("src", element.attr(configuration.attribute));
						
						if( configuration.removeAttribute )
						{
							element.removeAttr(configuration.attribute);
						}
						
						// trigger function after loading image
						if( configuration.afterLoad )
							configuration.afterLoad(element);
					}
				}
			});
		}
		
		/**
		 * _isInLoadableArea(element)
		 * 
		 * try to allocate current viewport height of the browser
		 * uses fallback option when no height is found
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
			if( window.innerWidth )
			{
				return window.innerHeight;
			}
			
			else if( document.documentElement && document.documentElement.clientWidth )
			{
				return document.documentElement.clientHeight;
			}
			
			else if( document.body && document.body.clientWidth )
			{
				return document.body.clientHeight;
			}
			
			else if( document.body && document.body.offsetHeight) 
			{
				return document.body.offsetHeight;
			}
			
			return configuration.fallbackHeight;
		}
		
		/**
		 * _throttle(delay, callback)
		 * 
		 * helper function to throttle down event triggering
		 * 
		 * @param integer delay
		 * @param object function
		 * @return function object
		 */
		function _throttle(delay, callback)
		{			
			var _timeout;
			var _exec = 0;
			
			function wrapper()
			{
				var elapsed = +new Date() - _exec;
				
				function exec()
				{
					_exec = +new Date();
					callback.apply();
				};
				
				function clear()
				{
					_timeout = undefined;
				};
				
				_timeout && clearTimeout(_timeout);
				
				if( elapsed > delay || !configuration.enableThrottle )
				{
					exec();
				}
				else
				{
					_timeout = setTimeout(exec, delay - elapsed);
				}
			}
			
			return wrapper;
		}
		
		return this;
	}
}
)(jQuery, window);