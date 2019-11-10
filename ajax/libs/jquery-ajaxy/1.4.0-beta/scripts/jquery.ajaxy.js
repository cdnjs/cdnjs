/**
 * @depends nothing
 * @name core.console
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 */

/**
 * Console Emulator
 * We have to convert arguments into arrays, and do this explicitly as webkit (chrome) hates function references, and arguments cannot be passed as is
 * @version 1.0.1
 * @date July 09, 2010
 * @since 0.1.0-dev, December 01, 2009
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
if ( typeof window.console !== 'object' || typeof window.console.emulated === 'undefined' ) {
	// Check to see if console exists
	if ( typeof window.console !== 'object' || typeof window.console.log !== 'function' ) {
		// Console does not exist
		window.console = {};
		window.console.log = window.console.debug = window.console.warn = window.console.trace = function(){};
		window.console.error = function(){
			alert("An error has occured. Please use another browser to obtain more detailed information.");
		};
	}
	else {
		// Console is object, and log does exist
		// Check Debug
		if ( typeof window.console.debug === 'undefined' ) {
			window.console.debug = function(){
				var arr = ['console.debug:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		}
		// Check Warn
		if ( typeof window.console.warn === 'undefined' ) {
			window.console.warn = function(){
				var arr = ['console.warn:']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		} 
		// Check Error
		if ( typeof window.console.error === 'undefined' ) {
			window.console.error = function(){
				var arr = ['console.error']; for(var i = 0; i < arguments.length; i++) { arr.push(arguments[i]); };
			    window.console.log.apply(window.console, arr);
			};
		}
		// Check Trace
		if ( typeof window.console.trace === 'undefined' ) {
			window.console.trace = function(){
			    window.console.error.apply(window.console, ['console.trace does not exist']);
			};
		}
	}
	// We have been emulated
	window.console.emulated = true;
}/**
 * @depends nothing
 * @name core.string
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 */

/**
 * Return a new string with any spaces trimmed the left and right of the string
 * @version 1.0.0
 * @date June 30, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.trim = String.prototype.trim || function() {
	// Trim off any whitespace from the front and back
	return this.replace(/^\s+|\s+$/g, '');
};

/**
 * Return a new string with the value stripped from the left and right of the string
 * @version 1.1.1
 * @date July 22, 2010
 * @since 1.0.0, June 30, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.strip = String.prototype.strip || function(value,regex){
	// Strip a value from left and right, with optional regex support (defaults to false)
	value = String(value);
	var str = this;
	if ( value.length ) {
		if ( !(regex||false) ) {
			// We must escape value as we do not want regex support
			value = value.replace(/([\[\]\(\)\^\$\.\?\|\/\\])/g, '\\$1');
		}
		str = str.replace(eval('/^'+value+'+|'+value+'+$/g'), '');
	}
	return String(str);
}

/**
 * Return a new string with the value stripped from the left of the string
 * @version 1.1.1
 * @date July 22, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.stripLeft = String.prototype.stripLeft || function(value,regex){
	// Strip a value from the left, with optional regex support (defaults to false)
	value = String(value);
	var str = this;
	if ( value.length ) {
		if ( !(regex||false) ) {
			// We must escape value as we do not want regex support
			value = value.replace(/([\[\]\(\)\^\$\.\?\|\/\\])/g, '\\$1');
		}
		str = str.replace(eval('/^'+value+'+/g'), '');
	}
	return String(str);
}

/**
 * Return a new string with the value stripped from the right of the string
 * @version 1.1.1
 * @date July 22, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.stripRight = String.prototype.stripRight || function(value,regex){
	// Strip a value from the right, with optional regex support (defaults to false)
	value = String(value);
	var str = this;
	if ( value.length ) {
		if ( !(regex||false) ) {
			// We must escape value as we do not want regex support
			value = value.replace(/([\[\]\(\)\^\$\.\?\|\/\\])/g, '\\$1');
		}
		str = str.replace(eval('/'+value+'+$/g'), '');
	}
	return String(str);
}

/**
 * Return a int of the string
 * @version 1.0.0
 * @date June 30, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.toInt = String.prototype.toInt || function(){
	// Convert to a Integer
	return parseInt(this,10);
};

/**
 * Return a new string of the old string wrapped with the start and end values
 * @version 1.0.0
 * @date June 30, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.wrap = String.prototype.wrap || function(start,end){
	// Wrap the string
	return start+this+end;
};

/**
 * Return a new string of a selection of the old string wrapped with the start and end values
 * @version 1.0.0
 * @date June 30, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.wrapSelection = String.prototype.wrapSelection || function(start,end,a,z){
	// Wrap the selection
	if ( typeof a === 'undefined' || a === null ) a = this.length;
	if ( typeof z === 'undefined' || z === null ) z = this.length;
	return this.substring(0,a)+start+this.substring(a,z)+end+this.substring(z);
};

/**
 * Return a new string of the slug of the old string
 * @version 1.1.0
 * @date July 16, 2010
 * @since 1.0.0, June 30, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.toSlug = String.prototype.toSlug || function(){
	// Convert a string to a slug
	return this.toLowerCase().replace(/[\s_]/g, '-').replace(/[^-a-z0-9]/g, '').replace(/--+/g, '-').replace(/^-+|-+$/g,'');
}

/**
 * Return a new JSON object of the old string.
 * Turns:
 * 		file.js?a=1&amp;b.c=3.0&b.d=four&a_false_value=false&a_null_value=null
 * Into:
 * 		{"a":1,"b":{"c":3,"d":"four"},"a_false_value":false,"a_null_value":null}
 * @version 1.1.0
 * @date July 16, 2010
 * @since 1.0.0, June 30, 2010
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
 */
String.prototype.queryStringToJSON = String.prototype.queryStringToJSON || function ( )
{	// Turns a params string or url into an array of params
	// Prepare
	var params = String(this);
	// Remove url if need be
	params = params.substring(params.indexOf('?')+1);
	// params = params.substring(params.indexOf('#')+1);
	// Change + to %20, the %20 is fixed up later with the decode
	params = params.replace(/\+/g, '%20');
	// Do we have JSON string
	if ( params.substring(0,1) === '{' && params.substring(params.length-1) === '}' )
	{	// We have a JSON string
		return eval(decodeURIComponent(params));
	}
	// We have a params string
	params = params.split(/\&(amp\;)?/);
	var json = {};
	// We have params
	for ( var i = 0, n = params.length; i < n; ++i )
	{
		// Adjust
		var param = params[i] || null;
		if ( param === null ) { continue; }
		param = param.split('=');
		if ( param === null ) { continue; }
		// ^ We now have "var=blah" into ["var","blah"]
		
		// Get
		var key = param[0] || null;
		if ( key === null ) { continue; }
		if ( typeof param[1] === 'undefined' ) { continue; }
		var value = param[1];
		// ^ We now have the parts
		
		// Fix
		key = decodeURIComponent(key);
		value = decodeURIComponent(value);
		try {
		    // value can be converted
		    value = eval(value);
		} catch ( e ) {
		    // value is a normal string
		}
		
		// Set
		// window.console.log({'key':key,'value':value}, split);
		var keys = key.split('.');
		if ( keys.length === 1 )
		{	// Simple
			json[key] = value;
		}
		else
		{	// Advanced (Recreating an object)
			var path = '',
				cmd = '';
			// Ensure Path Exists
			$.each(keys,function(ii,key){
				path += '["'+key.replace(/"/g,'\\"')+'"]';
				jsonCLOSUREGLOBAL = json; // we have made this a global as closure compiler struggles with evals
				cmd = 'if ( typeof jsonCLOSUREGLOBAL'+path+' === "undefined" ) jsonCLOSUREGLOBAL'+path+' = {}';
				eval(cmd);
				json = jsonCLOSUREGLOBAL;
				delete jsonCLOSUREGLOBAL;
			});
			// Apply Value
			jsonCLOSUREGLOBAL = json; // we have made this a global as closure compiler struggles with evals
			valueCLOSUREGLOBAL = value; // we have made this a global as closure compiler struggles with evals
			cmd = 'jsonCLOSUREGLOBAL'+path+' = valueCLOSUREGLOBAL';
			eval(cmd);
			json = jsonCLOSUREGLOBAL;
			delete jsonCLOSUREGLOBAL;
			delete valueCLOSUREGLOBAL;
		}
		// ^ We now have the parts added to your JSON object
	}
	return json;
};
/**
 * @depends jquery
 * @name jquery.events
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 */

/**
 * jQuery Aliaser
 */
(function($){
	
	/**
	 * Bind a event, with or without data
	 * Benefit over $.bind, is that $.binder(event, callback, false|{}|''|false) works.
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.binder = $.fn.binder || function(event, data, callback){
		// Help us bind events properly
		var $this = $(this);
		// Handle
		if ( (callback||false) ) {
			$this.bind(event, data, callback);
		} else {
			callback = data;
			$this.bind(event, callback);
		}
		// Chain
		return $this;
	};
	
	/**
	 * Bind a event only once
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.once = $.fn.once || function(event, data, callback){
		// Only apply a event handler once
		var $this = $(this);
		// Handle
		if ( (callback||false) ) {
			$this.unbind(event, callback);
			$this.bind(event, data, callback);
		} else {
			callback = data;
			$this.unbind(event, callback);
			$this.bind(event, callback);
		}
		// Chain
		return $this;
	};
	
	/**
	 * Event for pressing the enter key
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.enter = $.fn.enter || function(data,callback){
		return $(this).binder('enter',data,callback);
	};
	$.event.special.enter = $.event.special.cancel || {
		setup: function( data, namespaces ) {
			$(this).bind('keypress', $.event.special.enter.handler);
		},
		teardown: function( namespaces ) {
			$(this).unbind('keypress', $.event.special.enter.handler);
		},
		handler: function( event ) {
			// Prepare
			var $el = $(this);
			// Setup
			var enterKey = event.keyCode === 13;
			if ( enterKey ) {
				// Our event
				event.type = 'enter';
				$.event.handle.apply(this, [event]);
				return true;
			}
			// Not our event
			return;
		}
	};
	
	/**
	 * Event for pressing the escape key
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.cancel = $.fn.cancel || function(data,callback){
		return $(this).binder('cancel',data,callback);
	};
	$.event.special.cancel = $.event.special.cancel || {
		setup: function( data, namespaces ) {
			$(this).bind('keyup', $.event.special.cancel.handler);
		},
		teardown: function( namespaces ) {
			$(this).unbind('keyup', $.event.special.cancel.handler);
		},
		handler: function( event ) {
			// Prepare
			var $el = $(this);
			// Setup
			var moz = typeof event.DOM_VK_ESCAPE === 'undefined' ? false : event.DOM_VK_ESCAPE;
			var escapeKey = event.keyCode === 27;
			if ( moz || escapeKey ) {
				// Our event
				event.type = 'cancel';
				$.event.handle.apply(this, [event]);
				return true;
			}
			// Not our event
			return;
		}
	};
	
	/**
	 * Event for the last click for a series of one or more clicks
	 * @version 1.0.0
	 * @date July 16, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.lastclick = $.fn.lastclick || function(data,callback){
		return $(this).binder('lastclick',data,callback);
	};
	$.event.special.lastclick = $.event.special.lastclick || {
		setup: function( data, namespaces ) {
			$(this).bind('click', $.event.special.lastclick.handler);
		},
		teardown: function( namespaces ) {
			$(this).unbind('click', $.event.special.lastclick.handler);
		},
		handler: function( event ) {
			// Setup
			var clear = function(){
				// Fetch
				var Me = this;
				var $el = $(Me);
				// Fetch Timeout
				var timeout = $el.data('lastclick-timeout')||false;
				// Clear Timeout
				if ( timeout ) {
					clearTimeout(timeout);
				}
				timeout = false;
				// Store Timeout
				$el.data('lastclick-timeout',timeout);
			};
			var check = function(event){
				// Fetch
				var Me = this;
				clear.call(Me);
				var $el = $(Me);
				// Store the amount of times we have been clicked
				$el.data('lastclick-clicks', ($el.data('lastclick-clicks')||0)+1);
				// Handle Timeout for when All Clicks are Completed
				var timeout = setTimeout(function(){
					// Fetch Clicks Count
					var clicks = $el.data('lastclick-clicks');
					// Clear Timeout
					clear.apply(Me,[event]);
					// Reset Click Count
					$el.data('lastclick-clicks',0);
					// Fire Event
					event.type = 'lastclick';
					$.event.handle.apply(Me, [event,clicks])
				},500);
				// Store Timeout
				$el.data('lastclick-timeout',timeout);
			};
			// Fire
			check.apply(this,[event]);
		}
	};
	
	/**
	 * Event for the first click for a series of one or more clicks
	 * @version 1.0.0
	 * @date July 16, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.firstclick = $.fn.firstclick || function(data,callback){
		return $(this).binder('firstclick',data,callback);
	};
	$.event.special.firstclick = $.event.special.firstclick || {
		setup: function( data, namespaces ) {
			$(this).bind('click', $.event.special.firstclick.handler);
		},
		teardown: function( namespaces ) {
			$(this).unbind('click', $.event.special.firstclick.handler);
		},
		handler: function( event ) {
			// Setup
			var clear = function(event){
				// Fetch
				var Me = this;
				var $el = $(Me);
				// Fetch Timeout
				var timeout = $el.data('firstclick-timeout')||false;
				// Clear Timeout
				if ( timeout ) {
					clearTimeout(timeout);
				}
				timeout = false;
				// Store Timeout
				$el.data('firstclick-timeout',timeout);
			};
			var check = function(event){
				// Fetch
				var Me = this;
				clear.call(Me);
				var $el = $(Me);
				// Update the amount of times we have been clicked
				$el.data('firstclick-clicks', ($el.data('firstclick-clicks')||0)+1);
				// Check we are the First of the series of many
				if ( $el.data('firstclick-clicks') === 1 ) {
					// Fire Event
					event.type = 'firstclick';
					$.event.handle.apply(Me, [event])
				}
				// Handle Timeout for when All Clicks are Completed
				var timeout = setTimeout(function(){
					// Clear Timeout
					clear.apply(Me,[event]);
					// Reset Click Count
					$el.data('firstclick-clicks',0);
				},500);
				// Store Timeout
				$el.data('firstclick-timeout',timeout);
			};
			// Fire
			check.apply(this,[event]);
		}
	};
	
	/**
	 * Event for performing a singleclick
	 * @version 1.1.0
	 * @date July 16, 2010
	 * @since 1.0.0, June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.singleclick = $.fn.singleclick || function(data,callback){
		return $(this).binder('singleclick',data,callback);
	};
	$.event.special.singleclick = $.event.special.singleclick || {
		setup: function( data, namespaces ) {
			$(this).bind('click', $.event.special.singleclick.handler);
		},
		teardown: function( namespaces ) {
			$(this).unbind('click', $.event.special.singleclick.handler);
		},
		handler: function( event ) {
			// Setup
			var clear = function(event){
				// Fetch
				var Me = this;
				var $el = $(Me);
				// Fetch Timeout
				var timeout = $el.data('singleclick-timeout')||false;
				// Clear Timeout
				if ( timeout ) {
					clearTimeout(timeout);
				}
				timeout = false;
				// Store Timeout
				$el.data('singleclick-timeout',timeout);
			};
			var check = function(event){
				// Fetch
				var Me = this;
				clear.call(Me);
				var $el = $(Me);
				// Update the amount of times we have been clicked
				$el.data('singleclick-clicks', ($el.data('singleclick-clicks')||0)+1);
				// Handle Timeout for when All Clicks are Completed
				var timeout = setTimeout(function(){
					// Fetch Clicks Count
					var clicks = $el.data('singleclick-clicks');
					// Clear Timeout
					clear.apply(Me,[event]);
					// Reset Click Count
					$el.data('singleclick-clicks',0);
					// Check Click Status
					if ( clicks === 1 ) {
						// There was only a single click performed
						// Fire Event
						event.type = 'singleclick';
						$.event.handle.apply(Me, [event])
					}
				},500);
				// Store Timeout
				$el.data('singleclick-timeout',timeout);
			};
			// Fire
			check.apply(this,[event]);
		}
	};
	

})(jQuery);/**
 * @depends jquery
 * @name jquery.extra
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 */

/**
 * jQuery Aliaser
 */
(function($){
	
	/**
	 * Opacity Fix for Text without Backgrounds
	 * Fixes the text corrosion during opacity effects by forcing a background-color value on the element.
	 * The background-color value is the the same value as the first parent div which has a background-color.
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.opacityFix = $.fn.opacityFix || function(){
		var $this = $(this);
		
		// Check if this fix applies
		var color = $this.css('background-color');
		if ( color && color !== 'rgba(0, 0, 0, 0)' ) {
			return this;
		}
		
		// Apply the background colour of the first parent which has a background colour
		var $parent = $this;
		while ( $parent.inDOM() ) {
			$parent = $parent.parent();
			color = $parent.css('background-color');
			if ( color && color !== 'rgba(0, 0, 0, 0)' ) {
				$this.css('background-color',color);
				break;
			}
		}
		
		// Chain
		return this;
	};
	
	/**
	 * Get all elements above ourself which match the selector, and include ourself in the search
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.parentsAndSelf = $.fn.parentsAndSelf || function(selector){
		var $this = $(this);
		return $this.parents(selector).andSelf().filter(selector);
	};
	
	/**
	 * Get all elements within ourself which match the selector, and include ourself in the search
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.findAndSelf = $.fn.findAndSelf || function(selector){
		var $this = $(this);
		return $this.find(selector).andSelf().filter(selector);
	};
	
	/**
	 * Find the first input, and include ourself in the search
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.firstInput = $.fn.firstInput || function(){
		var $this = $(this);
		return $this.findAndSelf(':input').filter(':first');
	};
	
	/**
	 * Select a option within options, checkboxes, radios and selects.
	 * Rather than setting the actual value of a element which $el.val does.
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.choose = $.fn.choose||function(value){
		var $this = $(this);
		if ( typeof value === 'undefined' ) {
			value = $this.val();
		} else if ( $this.val() !== value ) {
			// Return early, don't match
			return this;
		}
		switch ( true ) {
			case this.is('option'):
				$this.parents('select:first').choose(value);
				break;
			case $this.is(':checkbox'):
				$this.attr('checked', true);
				break;
			case $this.is(':radio'):
				$this.attr('checked', true);
				break;
			case $this.is('select'):
				$this.val(value);
				break;
			default:
				break;
		}
		return this;
	};
	
	/**
	 * Deselect a option within options, checkboxes, radios and selects.
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.unchoose = $.fn.unchoose||function(){
		var $this = $(this);
		switch ( true ) {
			case $this.is('option'):
				$this.parents(':select:first').unchoose();
				break;
			case $this.is(':checkbox'):
				$this.attr('checked', false);
				break;
			case $this.is(':radio'):
				$this.attr('checked', false);
				break;
			case $this.is('select'):
				$this.val($this.find('option:first').val());
				break;
			default:
				break;
		}
		return this;
	};
	
	/**
	 * Checks if the element would be passed with the form if the form was submitted.
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.wouldSubmit = $.fn.wouldSubmit || function(){
		var $input = $(this).findAndSelf(':input');
		var result = true;
		if ( !$input.length || !($input.attr('name')||false) || ($input.is(':radio,:checkbox') && !$input.is(':selected,:checked')) ) {
			result = false;
		}
		return result;
	};
	
	/**
	 * Grab all the values of a form in JSON format if the form would be submitted.
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.values = $.fn.values || function(){
		var $inputs = $(this).findAndSelf(':input');
		var values = {};
		$inputs.each(function(){
			var $input = $(this);
			var name = $input.attr('name') || null;
			var value = $input.val();
			// Skip if wouldn't submit
			if ( !$input.wouldSubmit() ) {
				return true;
			}
			// Set value
			if (name.indexOf('[]') !== -1) {
				// We want an array
				if (typeof values[name] === 'undefined') {
					values[name] = [];
				}
				values[name].push(value);
			}
			else {
				values[name] = value;
			}
		});
		return values;
	};
	
	/**
	 * Submit the form which the element is associated with.
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.submitForm = $.fn.submitForm || function(){
		// Submit the parent form or our form
		var $this = $(this);
		// Handle
		var $form = $this.parentsAndSelf('form:first').trigger('submit');
		// Chain
		return $this;
	};
	
	/**
	 * Checks if the element is attached within the DOM
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.inDOM = $.fn.inDOM || function(){
		var $ancestor = $(this).parent().parent();
		return $ancestor.size() && ($ancestor.height()||$ancestor.width());
	};
	
	/**
	 * Wrap the element's value with the passed start and end text
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.valWrap = $.fn.valWrap || function(start,end){
		// Wrap a value
		var $field = $(this);
		return $field.val($field.val().wrap(start,end));
	};
	
	/**
	 * Wrap a selection of the element's value with the passed start and end text
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.valWrapSelection = $.fn.valWrapSelection || function(start,end,a,z){
		// Wrap the selected text
		var $field = $(this);
		var field = $field.get(0);
		start = start||'';
		end = end||'';
		if ( a || z ) {
			$field.val($field.val().wrapSelection(start,end,a,z));
		}
		else {
			var a = field.selectionStart,
				z = field.selectionEnd;
			if ( document.selection) {
				field.focus();
				var sel = document.selection.createRange();
				sel.text = start + sel.text + end;
			}
			else {
				var scrollTop = field.scrollTop;
				$field.val($field.val().wrapSelection(start,end,a,z));
				field.focus();
				field.selectionStart = a+start.length;
				field.selectionEnd = z+start.length;
				field.scrollTop = scrollTop;
			}
		}
		return $field;
	};
	
	/**
	 * Find (with regards to the element) the first visible input element, and give focus to it
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.giveFocus = $.fn.giveFocus || function(){
		// Give focus to the current element
		var $this = $(this);
		var selector = ':input:visible:first';
		$this.findAndSelf(selector).focus();
		return this;
	};
	
	/**
	 * Perform the highlight effect
	 * @version 1.0.0
	 * @date June 30, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.highlight = $.fn.highlight || function(duration){
		// Perform the Highlight Effect
		return $(this).effect('highlight', {}, duration||3000);
	};
	

})(jQuery);/**
 * @depends jquery
 * @name jquery.utilities
 * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
 */

/**
 * jQuery Aliaser
 */
(function($){
	
	/**
	 * Creates a new object, which uses baseObject's structure, and userObject's values when applicable
	 * @params {Object} baseObject
	 * @params {Object} userObject
	 * @params {Object} ...
	 * @return {Object} newObject
	 * @version 1.0.0
	 * @date August 01, 2010
	 * @since 1.0.0
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.prepareObject = $.prepareObject || function(baseObject,userObject) {
		var newObject = {};
		var skipValue = '$.prepareObject.skipValue';
		
		// Extend newObject
		$.extend(newObject,baseObject||{});
		
		// Intercept with the userObject
		$.intercept(true,newObject,userObject);
		
		// Handle additional params
		var objects = arguments;
		objects[0] = objects[1] = skipValue;
		
		// Cycle through additional objects
		$.each(objects,function(i,object){
			// Check if we want to skip
			if ( object === skipValue ) return true; // continue
			// Intercept with the object
			$.intercept(true,newObject,object);
		});
		
		// Return the newObject
		return newObject;
	};
	
	/**
	 * Intercept two objects
	 * @params [deep], &object1, object2, ...
	 * @version 1.0.0
	 * @date August 01, 2010
	 * @since 1.0.0
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.intercept = $.intercept || function() {
		// Prepare
		var objects = arguments,
			object,
			deep = false,
			copy = false;
		var skipValue = '$.intercept.skipValue';
		
		// Check Deep
		if ( typeof objects[0] === 'boolean' ) {
			deep = objects[0];
			objects[0] = skipValue;
			// Check Copy
			if ( typeof objects[1] === 'boolean' ) {
				copy = objects[1];
				objects[1] = skipValue;
				// Handle Copy
				if ( copy ) {
					object = {};
				}
				else {
					object = objects[2];
					objects[2] = skipValue;
				}
			}
			else {
				object = objects[1];
				objects[1] = skipValue;
			}
		}
		else {
			object = objects[0];
			objects[0] = skipValue;
		}
		
		// Grab Keys
		var keys = {};
		$.each(object,function(key){
			keys[key] = true;
		});
		
		// Intercept Objects
		if ( deep ) {
			// Cycle through objects
			$.each(objects, function(i,v){
				// Check if we want to skip
				if ( v === skipValue ) return true; // continue
				// Cycle through arguments
				$.each(v, function(key,value){
					// Check if the key exists so we can intercept
					if ( typeof keys[key] === 'undefined' ) return true; // continue
					// It exists, check value type
					if ( typeof value === 'object' && !(value.test||false && value.exec||false) ) {
						// Extend this object
						$.extend(object[key],value||{});
					}
					else {
						// Copy value over
						object[key] = value;
					}
				});
			})
		}
		else {
			// Cycle through objects
			$.each(objects, function(i,v){
				// Cycle through arguments
				$.each(v, function(key,value){
					// Check if the key exists so we can intercept
					if ( typeof keys[key] === 'undefined' ) return true; // continue
					// It exists, check value type
					if ( typeof value === 'object' && !(value.test||false && value.exec||false) ) {
						// Intercept this object
						$.intercept(true,object[key],value);
					}
					else {
						// Copy value over
						object[key] = value;
					}
				});
			})
		}
		
		// Return object
		return object;
	};
	

})(jQuery);/**
 * @depends jquery, core.console, core.string, jquery.extra
 * @name jquery.ajaxy
 * @package jquery-ajaxy {@link http://www.balupton/projects/jquery-ajaxy}
 */

/**
 * jQuery Aliaser
 */
(function($){
	// Create our Plugin function, with $ as the argument (we pass the jQuery object over later)
	// More info: http://docs.jquery.com/Plugins/Authoring#Custom_Alias
	
	/**
	 * Prepare Body
	 */
	$(document.body).addClass('js');
	
	/**
	 * jQuery Ajaxy
	 * @version 1.4.0
	 * @date August 01, 2010
	 * @since 0.1.0-dev, July 24, 2008
     * @package jquery-ajaxy {@link http://www.balupton/projects/jquery-ajaxy}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2008-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	if ( !($.Ajaxy||false) ) {
		/**
		 * Ajaxy
		 */
		$.Ajaxy = {
		
			// -----------------
			// Options
		
			/**
			 * User configuration
			 */
			options: {
				/**
				 * The hostname our application is using.
				 * For production use, you want to ensure this has been set.
				 */
				root_url: '',
				/**
				 * The base url our application is using.
				 * For production use, you want to ensure this has been set.
				 */
				base_url: '',
				/**
				 The short url of the page we are using. */
				relative_url: '',
				
				/**
				 * The CSS class that can be attached to a Ajaxy link to indicate we should not log this page in history.
				 */
				no_log_class: 'ajaxy-no_log',
				/**
				 * Whether or not we should perform the initial redirect if we have detected we are on a page.
				 * For production use, you want to ensure this has been set to false. As we should always want to ensure we are in the correct location.
				 */
				redirect: false,
				/**
				 * Whether or not we want to set the initial relative_url as the base_url if we are too lasy to configure this properly.
				 * For production use, you want to ensure this has been set to false. As we should always have our urls configured correctly.
				 */
				relative_as_base: true,
				/**
				 * Whether or not we should support plain text responses in our Ajax requests, as well as the standard JSON.
				 * If this is set to true and text was sent back on a Ajax request, then responseData will have the following structure:
				 * 		{
				 * 			content: responseText
				 * 		}
				 * For production use, you want to ensure this has been set to false. As we should always be returning JSON instead of text.
				 */
				support_text: true,
				/**
				 * Whether or not we should automatically inform Google Analytics of a Ajaxy request, if GA has been detected.
				 */
				analytics: true,
				/**
				 * Whether or not we should automatically find all ajaxy links and ajaxify them on DOM ready.
				 */
				auto_ajaxify: true,
				/**
				 * Whether or not we should output as much debugging information as possible.
				 * For production use, you want to ensure this has been set to false. As we should always never want the client to see debug information.
				 */
				debug: true,
				/**
				 * The Controllers to use
				 */
				Controllers: {}
			},
		
			// -----------------
			// Variables
			
			/**
			 * Default Structures
			 */
			defaults: {
				/**
				 * Default Controller Structure
				 * All Controllers inherit and are bound to this
				 */
				Controller: {
					// Options
					selector: null,
					matches: null,
					
					// System
					controller: null,
					
					// Actions
					response: null,
					request: null,
					error: null
				},
				
				Action: {
					// Options
					propagate: true,
					
					// System
					action: null,
					state: null,
					State: null,
					controller: null,
					Controller: null,
					
					// Ajaxy Helper Functions
					forward: function(){
						window.console.error('Ajaxy.Action.forward: Forward never defined.', [this, arguments]);
						window.console.trace();
					},
					trigger: function(){
						window.console.error('Ajaxy.Action.trigger: Trigger never defined.', [this, arguments]);
						window.console.trace();
					},
					stopPropagation: function(){
						this.propagate = false;
					},
					preventDefault: function(){
						this.propagate = false;
					}
				},
				
				/**
				 * Default State Structure
				 * All Controllers inherit and are bound to this
				 * State is associated with a particular state
				 */
				State: {
					// Options
					log: null,
					form: false,
					
					// System
					state: null,
					controller: null,
					
					/** The Request Object that is used in the $.Ajax */
					Request: {
						url: null,
						data: {}
					},
					
					/* The Response Object which is returned in our Ajax Request */
					Response: {
						callback: null,
						data: {}
					},
					
					/* The Response Object which is returned from an Error in our Ajax Request */
					Error: {
						callback: null,
						data: {}
					},
					
					/* Any user data specific to the state should go in here. This is not used by Ajaxy. */
					User: {
						data: {}
					}
				}
			},
			
			/**
			 * Have we been constructed
			 */
			constructed: false,
		
			/**
			 * Collection of Controllers
			 */
			Controllers: {},
		
			/**
			 * Collection of states
			 */
			States: {},
			
			/**
			 * Queue for our events
			 * @param {Object} state
			 */
			ajaxQueue: [],
		
			/**
			 * Our assigned data
			 * @param {Object} data
			 */
			data: {},
			
			/**
			 * Contains any redirect data in case we were
			 * @param {Object} redirected
			 */
			redirected: false,
			
			// --------------------------------------------------
			// Functions
		
			/**
			 * Format a state accordingly
			 * @param {String} state
			 */
			format: function (state){
				var Ajaxy = $.Ajaxy; var History = $.History;
				
				// Strip urls
				state = state.replace(/^\//, '').strip(Ajaxy.options.root_url).strip(Ajaxy.options.base_url);
				
				// History format
				state = History.format(state);
				
				// Slash
				if ( state ) state = '/'+state;
				
				// All good
				return state;
			},
		
			/**
			 * Bind controllers
			 * Either via Ajaxy.bind(controller, options), or Ajaxy.bind(controllers)
			 * @param {String} controller
			 * @param {Object} Controller
			 */
			bind: function ( controller, Controller ) {
				var Ajaxy = $.Ajaxy;
				
				// Add a controller
				if ( typeof Controller === 'undefined' && typeof controller === 'object' ) {
					// Array of controllers
					$.each(controller,Ajaxy.bind);
					return true;
				}
				else if ( typeof Controller === 'function' ) {
					// We just have the response handler
					Controller = {
						'response': Controller
					}
				}
				else if ( typeof Controller !== 'object' ) {
					// Unknown handlers
					window.console.error('Ajaxy.bind: Unknown option type', [this, arguments]);
					window.console.trace();
					return false;
				}
				
				// Create the Controller
				if ( typeof Ajaxy.getController(controller,false) === 'undefined' ) {
					Ajaxy.storeController(
						$.prepareObject(
							Ajaxy.defaults.Controller,
							{
								'controller': controller
							},
							Controller
						)
					);
				}
				else {
					// Already bound
					window.console.error('Ajaxy.bind: Controller already bound.', [this, arguments]);
					window.console.trace();
					return false;
				}
				
				// Ajaxify the Controller
				if ( Ajaxy.options.auto_ajaxify ) {
					Ajaxy.ajaxifyController(controller);
					return true; // prevent closure complaint
				}
			
				// Done
				return true;
			},
			
			/**
			 * Trigger the action for the particular controller
			 * @param {String} controller
			 * @param {String} action
			 * @param {Object} State
			 */
			trigger: function ( controller, action, state ) {
				var Ajaxy = $.Ajaxy;
				if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.trigger: ', [this, arguments]);
				
				// Prepare
				var i, n, list, call_generic = true;
				
				// Check Input
				if ( !controller ) {
					window.console.warn('Ajaxy.trigger: No controller was passed, reset to _generic.', [this, arguments]);
					controller = '_generic';
				}
				
				// --------------------------
				// Fetch
				
				// Fetch Controller
				var Controller = Ajaxy.getController(controller);
				
				// Fetch Controller Action
				var ControllerAction = Ajaxy.getControllerAction(controller,action,false);
				
				// Fetch the State
				var State = Ajaxy.getState(state,true),
					state = State.state||undefined;
				
				// --------------------------
				// Checks
				
				// Check Controller
				if ( typeof Controller === 'undefined' ) {
					// No Controller
					window.console.error('Ajaxy.trigger: Controller does not exist', [this, arguments]);
					window.console.trace();
					if ( controller !== '_generic' ) {
						Ajaxy.trigger('_generic', 'error', State);
					}
					return false;
				}
				
				// Check Controller Action
				if ( typeof ControllerAction === 'undefined' ) {
					// No Action
					window.console.error('Ajaxy.trigger: No Controller Action', [this, arguments]);
					window.console.trace();
					if ( controller !== '_generic' ) {
						Ajaxy.trigger('_generic', 'error', State);
					}
					return false;
				}
				
				// --------------------------
				// Prepare Action
				
				// Generate Action
				var Action = $.extend(true,{},Ajaxy.defaults.Action,{
					'action':action,
					'controller':controller,
					'Controller':Controller,
					'state':state,
					'State':State
				});
				
				// Setup up the Trigger + Forward Actions
				Action.forward = Action.trigger = function(_controller, _action, _state){
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.Action.trigger:', [this, arguments]);
					
					// Prepare
					_controller = _controller||controller;
					_action = _action||action;
					_state = _state||state;
					
					// Trigger
					Ajaxy.trigger(_controller, _action, _state);
					
					// Return true
					return true;
				};
				
				// --------------------------
				// Fire
				
				// Fire the ControllerAction Handler
				var result = ControllerAction.apply(Action, []);
				
				// Should we continue to Propagate through
				if ( Action.propagate === false ) {
					// Break
					call_generic = false;
				}
				
				// Fire generic?
				if ( call_generic && controller !== '_generic' ) {
					// Fire generic
					Action.forward('_generic');
				}
				
				// --------------------------
				
				// Return true
				return true;
			},
		
			/**
			 * Get a piece of data
			 * @param {Object} name
			 */
			get: function ( name ) {
				var Ajaxy = $.Ajaxy;
				
				// Fetch data
				if ( typeof Ajaxy.data[name] !== 'undefined' ) {
					return Ajaxy.data[name];
				} else {
					return undefined;
				}
			},
		
			/**
			 * Set a piece (or pieces) of data
			 * Ajaxy.set(data), Ajaxy.set(name, value)
			 * @param {Object} data
			 * @param {Object} value
			 */
			set: function ( data, value ) {
				var Ajaxy = $.Ajaxy;
			
				// Set route data
				if ( typeof value === 'undefined' ) {
					if ( typeof data === 'object' ) {
						Ajaxy.data.extend(true, data);
					}
				} else {
					Ajaxy.data[data] = value;
				}
			},
			
			/**
			 * Refresh
			 */
			refresh: function(){
				var Ajaxy = $.Ajaxy; var History = $.History;
				// Go
				return Ajaxy.go(History.getHash());
			},
		
			/**
			 * Perform an Ajaxy Request
			 * @param {String|Object} UserState
			 */
			go: function ( UserState ) {
				var Ajaxy = $.Ajaxy; var History = $.History;
				if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.go:', [this, arguments]);
			
				// --------------------------
				
				// Ensure format
				if ( typeof UserState === 'string' ) {
					// We have just a state
					UserState = {
						state: UserState
					};
				}
				
				// Prepare State
				var State = Ajaxy.getState(false,true);
				$.extend(true,State,UserState);
				
				// --------------------------
				// Ensure state and log
				
				// We have a URL and no state
				if ( !State.state||false && State.url||false ) {
					State.state = Ajaxy.format(State.url);
					delete State.url;
					// Don't log by default
					if ( State.log === null || State.log === undefined ) {
						State.log = false;
					}
				}
				// We have a form
				else if ( State.form ) {
					// Don't log by default
					if ( State.log === null || State.log === undefined ) {
						State.log = false;
					}
				}
				// We are normal
				else {
					// Do log by default
					if ( State.log === null || State.log === undefined ) {
						State.log = true;
					}
				}
			
				// Ensure log is a boolean (never null)
				State.log = State.log ? true : false
			
				// --------------------------
				
				// Check state
				if ( !State.state ) {
					window.console.error('Ajaxy.go: No state', [this, arguments]);
					return false;
				} else {
					State.state = Ajaxy.format(State.state);
				}
				
				// Figure it out
				if ( State.state === History.getHash() && Ajaxy.options.debug ) {
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.go: Trigger but no change.', State.state);
				}
				
				// Store it
				Ajaxy.storeState(State);
			
				// --------------------------
				
				// Trigger state
				if ( State.log ) {
					// Log the history
					// Trigger automaticly
					History.go(State.state);
				} else {
					// Don't log
					// Trigger manually
					Ajaxy.stateChange(State.state);
				}
				
				// --------------------------
				
				// Return true
				return true;
			},
			
			/**
			 * Get the Controller Action
			 * @param {String|Object} controller
			 * @return {Object|undefined}
			 */
			getControllerAction: function ( controller, action, create ) {
				var Ajaxy = $.Ajaxy;
				
				// Prepare
				var ControllerAction = undefined,
					Controller = Ajaxy.getController(controller,false);
				
				// Fetch
				if ( typeof Controller === 'undefined' ) {
					if ( create === false ) {
						// Don't report couldn't find
					}
					else {
						window.console.error('Ajaxy.getControllerAction: Controller does not exist', [this, arguments]);
						window.console.trace();
					}
				}
				else {
					var controllerActionType = typeof (Controller[action]||undefined);
					if ( controllerActionType === 'function' || controllerActionType === 'object' ) {
						ControllerAction = Controller[action];
					}
					else if ( create === false ) {
						// Don't report couldn't find
					}
					else {
						window.console.error('Ajaxy.getControllerAction: Controller Action does not exist', [this, arguments]);
						window.console.trace();
					}
				}
				
				// Return ControllerAction
				return ControllerAction;
			},
			
			/**
			 * Store a Controller Object
			 * @param {Object} Controller
			 */
			storeController: function ( Controller ) {
				var Ajaxy = $.Ajaxy;
				
				// Prepare
				var result = true,
					controllerType = typeof (Controller||undefined);
					
				// Fetch
				if ( controllerType === 'object' && typeof Controller.controller === 'string' ) {
					result = Ajaxy.Controllers[Controller.controller] = Controller;
				}
				else {
					window.console.error('Ajaxy.getController: Unkown Controller Format', [this, arguments]);
					window.console.trace();
					result = false;
				}
			
				// Return result
				return result;
			},
			
			/**
			 * Get the controller's Controller Object
			 * @param {String|Object} controller
			 * @return {Object|undefined}
			 */
			getController: function ( controller, create ) {
				var Ajaxy = $.Ajaxy;
				
				// Prepare
				var Controller = undefined,
					controllerType = typeof (controller||undefined);
				
				// Fetch
				if ( (controllerType === 'number' || controllerType === 'string') && typeof Ajaxy.Controllers[controller] !== 'undefined' ) {
					Controller = Ajaxy.Controllers[controller];
				}
				else if ( controllerType === 'object' && typeof controller.controller === 'string' ) {
					Controller = Ajaxy.getController(controller.controller,create);
				}
				else if ( create ) {
					Controller = $.extend(true,{},Ajaxy.defaults.Controller);
				}
				else if ( create === false ) {
					// Don't report couldn't find
				}
				else {
					// Report couldn't find
					window.console.error('Ajaxy.getController: Controller does not exist', [this, arguments]);
					window.console.trace();
				}
			
				// Return Controller
				return Controller;
			},
			
			/**
			 * Store a State Object
			 * @param {Object} state
			 */
			storeState: function ( State ) {
				var Ajaxy = $.Ajaxy;
				
				// Prepare
				var result = true,
					stateType = typeof (State||undefined);
				
				// Fetch
				if ( stateType === 'object' && typeof State.state === 'string' ) {
					result = Ajaxy.States[State.state] = State;
				}
				else {
					window.console.error('Ajaxy.getState: Unkown State Format', [this, arguments]);
					window.console.trace();
					result = false;
				}
			
				// Return result
				return result;
			},
			
			/**
			 * Get the state's State Object
			 * @param {String|Object} state
			 * @return {Object|undefined}
			 */
			getState: function ( state, create ) {
				var Ajaxy = $.Ajaxy;
				
				// Prepare
				var State = undefined,
					stateType = typeof (state||undefined);
				
				// Fetch
				if ( (stateType === 'number' || stateType === 'string') && typeof Ajaxy.States[state] !== 'undefined' ) {
					State = Ajaxy.States[state];
				}
				else if ( stateType === 'object' && typeof state.state === 'string' ) {
					State = Ajaxy.getState(state.state,create);
				}
				else if ( create ) {
					State = $.extend(true,{},Ajaxy.defaults.State);
				}
				else if ( create === false ) {
					// Don't report couldn't find
				}
				else {
					// Report couldn't find
					window.console.error('Ajaxy.getState: State does not exist', [this, arguments]);
					window.console.trace();
				}
			
				// Return State
				return State;
			},
			
			/**
			 * Track a state change in Google Analytics
			 * @param {String} state
			 */
			track: function ( state ) {
				var Ajaxy = $.Ajaxy;
			
				// Inform Google Analytics of a state change
				if ( typeof pageTracker !== 'undefined' ) {
					pageTracker._trackPageview(Ajaxy.options.base_url+'/'+state);
					// ^ we do not use root url here as google doesn't want that
					//   but it does want the base url here
					//   http://www.google.com/support/googleanalytics/bin/answer.py?answer=55521
				}
				
				// Done
				return true;
			},
			
			/**
			 * Determines the result of a matches against a state
			 * @param {Regex|Array|String} matches
			 * @param {String} state
			 */
			matches: function ( matches, state ) {
				var Ajaxy = $.Ajaxy;
				var isAMatch = false;
				
				// Handle matches
				switch ( typeof matches ) {
					// Objects
					case 'function':
					case 'object':
						if ( matches.test||false && matches.exec||false ) {
							// Regular Expression
							isAMatch = matches.test(state);
							break;
						}
					case 'array':
						$.each(matches, function(i,match){
							isAMatch = Ajaxy.matches(match,state);
							if ( isAMatch ) return false; // break out of $.each
						});
						break;
					
					// Exact
					case 'number':
					case 'string':
						isAMatch = (String(matches) === state);
						break;
				}
				
				// Return isAMatch
				return isAMatch;
			},
			
			/**
			 * Match the state against the controllers
			 * @param {String} state
			 */
			match: function ( state ) {
				var Ajaxy = $.Ajaxy;
				var matchedController = false;
				
				// Cycle through
				$.each(Ajaxy.Controllers, function(controller,Controller){
					// Check for matches
					var matches = Ajaxy.matches(Controller.matches||false, state);
					// Did we find a match?
					if ( matches ) {
						matchedController = controller;
						return false; // break out of $.each
					}
				});
				
				// Return matchedController
				return matchedController;
			},
			
			/**
			 * Send an Ajaxy Request
			 * @param {Object} state
			 */
			request: function (state) {
				var Ajaxy = $.Ajaxy; var History = $.History;
				if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.request:', [this, arguments]);
				
				// Prepare variables
				var skip_ajax = false;
				
				// --------------------------
				
				// Format the state
				state = Ajaxy.format(state);
			
				// Check if we were a redirect
				if ( Ajaxy.redirected !== false ) {
					// We were, ignore as we have already been fired
					Ajaxy.redirected = false;
					return;
				}
			
				// Add to AJAX queue
				Ajaxy.ajaxQueue.push(state);
				if ( Ajaxy.ajaxQueue.length !== 1 ) {
					// Already processing an event
					return false;
				}
			
				// Fire the analytics
				if ( Ajaxy.options.analytics ) {
					Ajaxy.track(state);
				}
				
				// --------------------------
				
				// Determine State
				var State = Ajaxy.getState(state,true);
				
				// Determine controller
				var controller = State.controller || Ajaxy.match(state) || undefined;
				
				// --------------------------
				
				// Prepare the State
				State.state = state;
				State.controller = controller;
				State.Request.url = (State.Request.url || Ajaxy.options.root_url+Ajaxy.options.base_url+(state.replace(/^\//, '') || '?'));
				
				// Store the State
				Ajaxy.storeState(State);
				
				// --------------------------
				
				// Trigger Request
				Ajaxy.trigger(controller, 'request');
				
				// --------------------------
				
				// Define handlers
				var Request = {
					data: State.Request.data,
					url: State.Request.url,
					type: 'post',
					success: function(responseData, status){
						// Success
						if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.request.success:', [this, arguments]);
					
						// Prepare
						responseData = $.extend(true,{},Ajaxy.defaults.State.Response.data,responseData);
						responseData.Ajaxy = responseData.Ajaxy || {};
						
						// Check for redirect
						if ( responseData.Ajaxy.redirected ) {
							// A redirect was performed, set a option so we know what to do
							var newState = Ajaxy.format(responseData.Ajaxy.redirected.to);
							Ajaxy.redirected = {
								status: true,
								from: state,
								to: newState
							};
							// Update the history, not ajaxy
							History.go(newState);
							// We do the redirect check up the top, so no worries here, this one flows through like normal
						};
						
						// Success function
						Ajaxy.ajaxQueue.shift()
						var queueState = Ajaxy.ajaxQueue.pop();
						if (queueState && queueState !== state) {
							Ajaxy.ajaxQueue = []; // abandon others
							Ajaxy.stateChange(queueState);
							return false; // don't care for this
						}
						
						// Prepare
						State.Response.data = responseData;
						State.Error.data = {};
						
						// Fetch controller
						var controller = responseData.controller || State.controller || null;
						
						// Check controller
						if ( controller === null ) {
							// Default
							controller = '_generic';
							// Issue warning
							window.console.warn(
								'Ajaxy.request.success.controller: The controller was unable to be determined, defaulted to _generic.',
								[this, arguments],
								[responseData.controller, State.controller]
							);
						}
						
						// Fire User Specified Callback (specified with Ajaxy.go)
						// Halts if callback returns true, or if controller is set to 'callback'
						if ( State.Response.callback ) {
							if ( State.Response.callback.apply(State, arguments) || controller === 'callback' ) {
								// We are done
								return true;
							}
							// We fired the callback and we want to continue on
						}
						
						// Trigger handler
						return Ajaxy.trigger(controller, 'response', State);
					},
					error: function(XMLHttpRequest, textStatus, errorThrown, responseData){
						// Error
						if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.request.error:', [this, arguments]);
					
						// Prepare
						if ( !responseData ) {
							// Should already be handled, but in the rare case it isn't
							responseData = {
								responseText: XMLHttpRequest.responseText.trim()||false
							}
						}
					
						// Handler queue
						Ajaxy.ajaxQueue.shift()
						var queueState = Ajaxy.ajaxQueue.pop();
						if (queueState && queueState !== state) {
							Ajaxy.ajaxQueue = []; // abandon others
							Ajaxy.stateChange(queueState);
							return false; // don't care for this
						}
					
						// Prepare
						var errorData = {
							XMLHttpRequest: XMLHttpRequest,
							textStatus: textStatus,
							errorThrown: errorThrown
						};
					
						// Prepare
						State.Request.XMLHttpRequest = XMLHttpRequest;
						State.Response.data = responseData;
						State.Error.data = {};
					
						// Fetch controller
						var controller = responseData.controller || State.controller || null;
						
						// Check controller
						if ( controller === null ) {
							// Default
							controller = '_generic';
							// Issue warning
							window.console.warn(
								'Ajaxy.request.error.controller: The controller was unable to be determined, defaulted to _generic.',
								[this, arguments],
								[responseData.controller, State.controller]
							);
						}
						
						// Fire User Specified Callback (specified with Ajaxy.go)
						// Halts if callback returns true, or if controller is set to 'callback'
						if ( State.Error.callback ) {
							if ( State.Error.callback.apply(State, arguments) || controller === 'callback' ) {
								// We are done
								return true;
							}
							// We fired the callback and we want to continue on
						}
						
						// Trigger handler
						return Ajaxy.trigger(controller, 'error', State);
					},
				
					complete:	function ( XMLHttpRequest, textStatus ) {
						// Request completed
						if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.request.complete:', [this, arguments]);
						// Set XMLHttpRequest
						State.Request.XMLHttpRequest = XMLHttpRequest;
						// Ignore for some reason
						if ( false && this.url !== XMLHttpRequest.channel.name ) {
							// A redirect was performed, set a option so we know what to do
							var newState = Ajaxy.format(XMLHttpRequest.channel.name);
							Ajaxy.redirected = {
								status: true,
								from: state,
								to: newState
							};
							// Update the history, not ajaxy
							History.go(newState);
						};
					}
				};
			
				// --------------------------
				
				// Handle form if need be
				if ( State.form ) {
					var $form = $(State.form);
					
					// Determine form type
					var enctype = $form.attr('enctype');
					if ( enctype === 'multipart/form-data' ) {
						// We are a complicated form
						// Submit via target
					
						// Generate iframe
						var iframe_id = 'ajaxy_form_iframe_' + Math.floor(Math.random() * 99999);
						var $iframe = $('<iframe style="display:none" src="about:blank" id="'+iframe_id+'" name="'+iframe_id+'" >').appendTo('body').hide();
						var $ajax = $('<input type="hidden" name="ajax" value="true"/>').appendTo($form);
						var $hidden = $('<input type="hidden" name="Ajaxy[form]" value="true"/>').appendTo($form);
					
						// Event
						$iframe.bind('load', function(){
							var iframe = this.document || this.currentDocument || this.contentWindow.document;
						
							// Check location
							if ( iframe.location.href === 'about:blank' ) {
								return true;
							}
						
							// Fire handler
							var text = $iframe.contents().find('.response').val();
							var json = false;
							try {
								json = JSON.parse(text);
							} catch ( e ) {
								window.console.error('Ajaxy.request.form: Invalid Response.', [this, arguments], [text]);
							}
							if ( json ) {
								request.success(json);
							} else {
								request.error(json);
							}
						
							// Clean up
							$form.removeAttr('target');
							$iframe.remove();
							$ajax.remove();
							$hidden.remove();
						});
					
						// Adjust the form
						$form.attr('target', iframe_id);
					
						// Submit the form
						$form.submit();

						// Update
						var values = $form.values();
						Request.data = $.extend(true, Request.data, values||{});
						
						// Inform to skip ajax
						skip_ajax = true;
					}
					else {
						// Normal form
						var values = $form.values();
						Request.data = $.extend(true, Request.data, values||{});
					}
				}
				
				// --------------------------
				
				// Prepare Result
				var result = true;
				
				// Update
				State.Request = Request;
				
				// Perform AJAX request
				if ( !skip_ajax ) {
					result = Ajaxy.ajax(Request);
				}
				
				// Return result
				return result;
			},
		
		
			/**
			 * Wrapper for Ajaxy Request
			 * @param {Object} data
			 */
			ajax: function(options){
				var Ajaxy = $.Ajaxy; var History = $.History;
				if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.ajax:', [this, arguments]);
				
				// --------------------------
				
				// Move handlers into callbacks
				// Use defaults if they do not exist
				var callbacks = {};
				callbacks.success = options.success || function (data, status) {
					// Success
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.ajax.callbacks.success:', [this, arguments]);
					// Handle
					$('.error').empty();
				};
				callbacks.error = options.error || function (XMLHttpRequest, textStatus, errorThrown, data) {
					// Error
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.ajax.callbacks.error:', [this, arguments]);
					// Handle
					$('.error').html(errorThrown);
				};
				callbacks.complete = options.complete || function(XMLHttpRequest, textStatus){
					// Request completed
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.ajax.callbacks.complete:', [this, arguments]);
				};
				
				// Delete from options
				delete options.success;
				delete options.error;
				delete options.complete;
			
				// --------------------------
				
				// Prepare Ajax Request
				var request = {
					type:		'post',
					dataType:	(Ajaxy.options.support_text ? 'text' : 'json')
				};
				$.extend(true,request,options);
				
				// Apply Handlers to Request
				request.success = function(responseText, status){
					// Success
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.ajax.request.success:', [this, arguments]);
					var Response = {},
						responseData = {};
					
					// Parse
					if ( typeof responseText !== 'object' && Ajaxy.options.support_text && responseText ) {
						// Attempt JSON
						try {
							// Attempt
							responseData = JSON.parse(responseText);
						}
						// Invalid JSON
						catch (e) {
							// Extract details
							var html = responseText,
								$html = $(html
											.replace(/<(html|head|body|title)>/g,'<div id="ajaxy-$1">')
											.replace(/<\/(html|head|body|title)/g,'</div>')
										),
								$body = $html.find('#ajaxy-body'),
								$title = $html.find('#ajaxy-title'),
								$controller = $html.find('#ajaxy-controller'),
								title = ($title.length ? $title.text() : null),
								content = ($body.length ? $body.html() : html),
								controller = ($controller.length ? $controller.text() : null),
							// ^ We do the above workaround with element types as jQuery does not support loadin in documents
							
							// Create
							responseData = {
								"title": title,
								"content": content,
								"controller": controller,
								"html": html
							};
						}
					}
					else {
						// Using JSON
						responseData = responseText;
					}
					
					// Apply
					Response.data = responseData;
					
					// Debug
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.ajax.success:', [this, arguments]);
					
					// Check
					if ( typeof responseData.controller === 'undefined' && ((typeof responseData.success !== 'undefined' && !responseData.success) || (typeof responseData.error !== 'undefined' && responseData.error)) ) {
						// Error on simple Ajax request, not Ajaxy
						return callbacks.error.apply(this, [null, status, responseData.error||true, responseData]);
					}
					
					// Fire
					return callbacks.success.apply(this, [responseData, status]);
				};
				request.error = function(XMLHttpRequest, textStatus, errorThrown) {
					// Error
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.ajax.request.error:', [this, arguments]);
				
					// Prepare Response
					var responseText = XMLHttpRequest.responseText||false;
					if ( responseText ) responseText = responseText.trim();
					if ( !responseText ) responseText = false;
				
					// Prepare Data
					var responseData = {
						error: errorThrown||true,
						responseText: responseText
					};
					
					// Check if Response
					if ( responseText ) {
						try {
							// Try JSON
							responseData = JSON.parse(responseText);
						} catch (e) {
							// Not Valid JSON
						} finally {
							// Is Valid, so Move
							return this.success.apply(this, [responseData, textStatus]);
						}
					}
					
					// Apply
					return callbacks.error.apply(this, [XMLHttpRequest, textStatus, errorThrown, responseData]);
				};
			
				// Send the Request
				return $.ajax(request);
			},
		
		
			/**
			 * Handler for a stateChange
			 * @param {Object} state
			 */
			stateChange: function ( state ) {
				var Ajaxy = $.Ajaxy; var History = $.History;
			
				// Perform the Request
				Ajaxy.request(state);
			},
		
			// --------------------------------------------------
			// Constructors
		
			/**
			 * Configure Ajaxy
			 * @param {Object} options
			 */
			configure: function ( options ) {
				var Ajaxy = $.Ajaxy; var History = $.History;
				options = options||{};
				
				// --------------------------
				
				// Prepare
				var Controllers = options.Controllers||options.controllers||options;
				
				// Set options
				Ajaxy.options = $.extend(true, Ajaxy.options, options.options||options||{});
			
				// Set params
				Ajaxy.bind(Controllers);
				
				// --------------------------
				
				// URLs
				Ajaxy.options.root_url = (Ajaxy.options.root_url || document.location.protocol.toString()+'//'+document.location.hostname.toString()).replace(/\/$/, '')+'/';
				Ajaxy.options.base_url = (Ajaxy.options.base_url || '');
				Ajaxy.options.relative_url = Ajaxy.format(Ajaxy.options.relative_url || document.location.pathname.toString().replace(/^\//, ''));
				
				// Relative as Base
				if ( Ajaxy.options.relative_as_base ) {
					if ( Ajaxy.options.base_url.length === 0 ) {
						Ajaxy.options.base_url = Ajaxy.options.relative_url;
						Ajaxy.options.relative_url = "";
					}
				}
				
				// Adjust finals urls
				if ( Ajaxy.options.base_url ) {
					Ajaxy.options.base_url = Ajaxy.options.base_url.replace(/^\/|\/$/g, '')+'/';
				}
				
				// --------------------------
				
				// Debug
				if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.configure:', [this, arguments]);
				
				// Initial redirect
				if ( Ajaxy.options.redirect && Ajaxy.options.relative_url && Ajaxy.options.relative_url !== null  ) {
					var location = Ajaxy.options.root_url+Ajaxy.options.base_url+'#'+Ajaxy.options.relative_url;
					document.location = location;
				}
				
				// --------------------------
				
				// Return true
				return true;
			},
		
			/**
			 * Construct Ajaxy
			 * @param {Object} options
			 */
			construct: function ( ) {
				// Construct our Plugin
				var Ajaxy = $.Ajaxy; var History = $.History;
				
				// --------------------------
				
				// Check if we've been constructed
				if ( Ajaxy.constructed ) {
					return;
				} else {
					Ajaxy.constructed = true;
				}
				
				// --------------------------
				
				// Set AJAX History Handler
				History.bind(function(state){
					// History Handler
					return Ajaxy.stateChange(state);
				});
			
				// Bind fn functions
				$.fn.ajaxify = Ajaxy.ajaxify;
				$.fn.ajaxy = Ajaxy.ajaxify;
			
				// Modify the document
				$(function(){
					// On document ready
					Ajaxy.domReady();
					History.domReady();
				});
				
				// --------------------------
				
				// All done
				return true;
			},
		
			/**
			 * Perform any DOM manipulation
			 */
			domReady: function ( ) {
				// We are good
				var Ajaxy = $.Ajaxy;
				
				// --------------------------
				
				// Return true
				return true;
			},
		
			/**
			 * Ajaxify an Element
			 * Eg. $('#id').ajaxify();
			 * @param {Object} options
			 */
			ajaxify: function ( options ) {
				var Ajaxy = $.Ajaxy;
				
				// --------------------------
				
				// Prepare
				var $el = $(this);
				
				// Ajaxify the controllers
				$.each(Ajaxy.Controllers, function(controller,Controller){
					Ajaxy.ajaxifyController(controller);
				});
				
				// Add the onclick handler for ajax compatiable links
				$el.findAndSelf('a.ajaxy').once('click',Ajaxy.ajaxify_helpers.a);
				
				// Add the onclick handler for ajax compatiable forms
				$el.findAndSelf('form.ajaxy').once('submit',Ajaxy.ajaxify_helpers.form);
				
				// --------------------------
				
				// Chain
				return $el;
			},
		
			/**
			 * Ajaxify a particullar controller
			 * @param {String} controller
			 */
			ajaxifyController: function(controller) {
				var Ajaxy = $.Ajaxy;
				
				// --------------------------
				
				// Fetch Controller
				var Controller = Ajaxy.getController(controller);
				
				// Do selector
				if ( Controller && typeof Controller['selector'] !== 'undefined' ) {
					// We have a selector
					$(function(){
						// Onload
						var $els = $(Controller['selector']);
						$els.data('ajaxy-controller',controller).once('click',Ajaxy.ajaxify_helpers.a);
					});
				}
				
				// --------------------------
				
				// Return true
				return true;
			},
			
			/**
			 * Ajaxify Helpers for particular types of elements
			 */
			ajaxify_helpers: {
				a: function(event){
					var Ajaxy = $.Ajaxy;
					
					// --------------------------
					
					// Fetch
					var $a = $(this);
					
					// Prepare
					var state = Ajaxy.format($a.attr('href').replace(/^\/?\.\//,'/'));
					var log = !$a.hasClass(Ajaxy.options.no_log_class);
					var controller = $a.data('ajaxy-controller')||null;
					
					// Perform the request
					Ajaxy.go({
						'state': state,
						'controller': controller,
						'log': log
					});
					
					// --------------------------
					
					// Prevent
					event.stopPropagation();
					event.preventDefault();
					return false;
				},
				form: function(event){
					var Ajaxy = $.Ajaxy;
					
					// --------------------------
					
					// Fetch
					var $form = $(this);
					
					// Check
					var disabled = $form.attr('disabled'); disabled = disabled || disabled === 'false';
					if ( disabled ) {
						return false;
					}
					
					// See if we are in the middle of a request
					if ( $form.attr('target') ) {
						// We are, so proceed with the request
						return true;
					}
					
					// Generate the state
					var state = Ajaxy.format($form.attr('action'));//.replace(/[?\.]?\/?/, '#/');
					
					// Perform the request
					Ajaxy.go({
						'state': state,
						'form':	this
					});
					
					// --------------------------
					
					// Prevent
					event.stopPropagation();
					event.preventDefault();
					return false;
				}
			}
	
		};
	
		// Construct
		$.Ajaxy.construct();
	}
	else {
		window.console.warn('$.Ajaxy has already been defined...');
	}
	
// Finished definition
})(jQuery); // We are done with our plugin, so lets call it with jQuery as the argument
