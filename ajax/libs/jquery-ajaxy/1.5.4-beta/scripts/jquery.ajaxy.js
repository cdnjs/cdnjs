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
	

	/**
	 * Get a elements html including it's own tag
	 * @version 1.0.1
	 * @date August 07, 2010
	 * @since 1.0.0, August 07, 2010
     * @package jquery-sparkle {@link http://www.balupton/projects/jquery-sparkle}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2009-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.htmlAndSelf = $.fn.htmlAndSelf || function(){
		// Get a elements html including it's own tag
		return $(this).attr('outerHTML');
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
	

})(jQuery);
(function($){
	/**
	 * jQuery.ScrollTo
	 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
	 * Dual licensed under MIT and GPL.
	 * Date: 5/25/2009
	 */
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return $.browser.safari || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;
				}

				// Number or 'number'
				if( /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
			
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};
	
	
	
	/**
	 * $.fn.ScrollTo
	 * Improves on $.fn.scrollTo by ensuring content even within scrollable areas is scrolled to
	 * @version 1.1.0
	 * @date August 05, 2010
	 * @since 0.1.0-dev, July 24, 2008
     * @package jquery-ajaxy {@link http://www.balupton/projects/jquery-ajaxy}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2008-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	$.fn.ScrollTo = function(options){
		var $el = $(this);
		var $parent = $el.parent();
		var foundParent = false;
		while ( $parent.length === 1 && !$parent.is('body') ) {
			var parent = $parent.get(0);
			if ( $parent.css('overflow') !== 'visible' && parent.scrollHeight !== parent.clientHeight ) {
				foundParent = true;
				break;
			}
			$parent = $parent.parent();
		}
		if ( foundParent ) {
			$parent.scrollTo($el,options);
			$parent.ScrollTo(options);
		} else
			$.scrollTo($el);
		return $el;
	}
	
})(jQuery);
/**
 * @depends jquery, core.console
 * @name jquery.history
 * @package jquery-history {@link http://www.balupton/projects/jquery-history}
 */

// Start of our jQuery Plugin
(function($)
{	// Create our Plugin function, with $ as the argument (we pass the jQuery object over later)
	// More info: http://docs.jquery.com/Plugins/Authoring#Custom_Alias
	
	/**
	 * jQuery History
	 * @version 1.4.2
	 * @date August 12, 2010
	 * @since 0.1.0-dev, July 24, 2008
     * @package jquery-history {@link http://www.balupton/projects/jquery-history}
	 * @author Benjamin "balupton" Lupton {@link http://www.balupton.com}
	 * @copyright (c) 2008-2010 Benjamin Arthur Lupton {@link http://www.balupton.com}
	 * @license GNU Affero General Public License version 3 {@link http://www.gnu.org/licenses/agpl-3.0.html}
	 */
	// Check our class exists
	if ( !($.History||false) ) {
		// Declare our class
		$.History = {
			// Our Plugin definition
		
			// -----------------
			// Options
		
			options: {
				debug: false
			},
		
			// -----------------
			// Variables
		
			state:		'',
			$window:	null,
			$iframe:	null,
			handlers:	{
				generic:	[],
				specific:	{}
			},
		
			// --------------------------------------------------
			// Functions
			
			/**
			 * Extract the Hash from a URL
			 * @param {String} hash
			 */
			extractHash: function ( url ) {
				// Extract the hash
				var hash = url
					.replace(/^[^#]*#/, '')	/* strip anything before the first anchor */
					.replace(/^#+|#+$/, '')
					;
				
				// Return hash
				return hash;
			},
			
			/**
			 * Get the current state of the application
			 */
	        getState: function ( ) {
				var History = $.History;
			
				// Get the current state
				return History.state;
	        },
			/**
			 * Set the current state of the application
			 * @param {String} hash
			 */
			setState: function ( state ) {
				var History = $.History;
				// Format the state
				state = History.extractHash(state)
			
				// Apply the state
				History.state = state;
			
				// Return the state
				return History.state;
			},
		
			/**
			 * Get the current hash of the browser
			 */
			getHash: function ( ) {
				var History = $.History;
			
				// Get the hash
				var hash = History.extractHash(window.location.hash || location.hash);
			
				// Return the hash
				return hash;
			},
		
			/**
			 * Set the current hash of the browser and iframe if present
			 * @param {String} hash
			 */
			setHash: function ( hash ) {
				var History = $.History;
			
				// Prepare hash
				hash = History.extractHash(hash);
			
				// Write hash
				if ( typeof window.location.hash !== 'undefined' ) {
					if ( window.location.hash !== hash ) {
						window.location.hash = hash;
					}
				} else if ( location.hash !== hash ) {
					location.hash = hash;
				}
			
				// Done
				return hash;
			},
		
			/**
			 * Go to the specific state - does not force a history entry like setHash
			 * @param {String} to
			 */
			go: function ( to ) {
				var History = $.History;
			
				// Format
				to = History.extractHash(to);
			
				// Get current
				var hash = History.getHash();
				var state = History.getState();
			
				// Has the hash changed
				if ( to !== hash ) {
					// Yes, update the hash
					// And wait for the next automatic fire
					History.setHash(to);
				} else {
					// Hash the state changed?
					if ( to !== state ) {
						// Yes, Update the state
						History.setState(to);
					}
				
					// Trigger our change
					History.trigger();
				}
			
				// Done
				return true;
			},
		
			/**
			 * Handle when the hash has changed
			 * @param {Event} e
			 */
			hashchange: function ( e ) {
				var History = $.History;
			
				// Get Hash
				var hash = History.getHash();
			
				// Handle the new hash
				History.go(hash);
			
				// All done
				return true;
			},
		
			/**
			 * Bind a handler to a hash
			 * @param {Object} state
			 * @param {Object} handler
			 */
			bind: function ( state, handler ) {
				var History = $.History;
			
				// 
				if ( handler ) {
					// We have a state specific handler
					// Prepare
					if ( typeof History.handlers.specific[state] === 'undefined' ) {
						// Make it an array
						History.handlers.specific[state] = [];
					}
					// Push new handler
					History.handlers.specific[state].push(handler);
				}
				else {
					// We have a generic handler
					handler = state;
					History.handlers.generic.push(handler);
				}
			
				// Done
				return true;
			},
		
			/**
			 * Trigger a handler for a state
			 * @param {String} state
			 */
			trigger: function ( state ) {
				var History = $.History;
			
				// Prepare
				if ( typeof state === 'undefined' ) {
					// Use current
					state = History.getState();
				}
				var i, n, handler, list;
			
				// Fire specific
				if ( typeof History.handlers.specific[state] !== 'undefined' ) {
					// We have specific handlers
					list = History.handlers.specific[state];
					for ( i = 0, n = list.length; i < n; ++i ) {
						// Fire the specific handler
						handler = list[i];
						handler(state);
					}
				}
			
				// Fire generics
				list = History.handlers.generic;
				for ( i = 0, n = list.length; i < n; ++i ) {
					// Fire the specific handler
					handler = list[i];
					handler(state);
				}
			
				// Done
				return true;
			},
		
			// --------------------------------------------------
			// Constructors
		
			/**
			 * Construct our application
			 */
			construct: function ( ) {
				var History = $.History;
			
				// Modify the document
				$(document).ready(function() {
					// Prepare the document
					History.domReady();
				});
			
				// Done
				return true;
			},
		
			/**
			 * Configure our application
			 * @param {Object} options
			 */
			configure: function ( options ) {
				var History = $.History;
			
				// Set options
				History.options = $.extend(History.options, options);
			
				// Done
				return true;
			},
		
			domReadied: false,
			domReady: function ( ) {
				var History = $.History;
			
				// Runonce
				if ( History.domRedied ) {
					return;
				}
				History.domRedied = true;
			
				// Define window
				History.$window = $(window);
			
				// Apply the hashchange function
				History.$window.bind('hashchange', this.hashchange);
			
				// Force hashchange support for all browsers
				setTimeout(History.hashchangeLoader, 200);
			
				// All done
				return true;
			},
			
			/**
			 * Determines whether or not our browser has native support for the required onhashchange event.
			 * Unfortunately we have to test against a known range of browsers, as doing a automatic test would require testing the onhashchange functionality
			 * which would require a state change that we do not want.
			 * @param {Object} browser [optional]
			 */
			nativeSupport: function ( browser ) {
				// Prepare
				browser = browser||$.browser;
				var	browserVersion = browser.version,
					browserVersionInt = parseInt(browserVersion,10),
					browserVersionParts = browserVersion.split(/[^0-9]/g),
					browserVersionPartsOne = parseInt(browserVersionParts[0],10),
					browserVersionPartsTwo = parseInt(browserVersionParts[1],10),
					browserVersionPartsThree = parseInt(browserVersionParts[2],10),
					nativeSupport = false;
				
				// Determine if we are running under a browser which has nativeSupport for the onhashchange event
				// >= MSIE 8
				if ( (browser.msie||false) && browserVersionInt >= 8 ) {
					nativeSupport = true;
				}
				// >= Webkit 528
				else if ( (browser.webkit||false) && browserVersionInt >= 528 ) {
					nativeSupport = true;
				}
				// >= Gecko 1.9.2.x
				else if ( (browser.mozilla||false) ) {
					// > Gecko 1
					if ( browserVersionPartsOne > 1 ) {
						nativeSupport = true;
					}
					// = Gecko 1
					else if ( browserVersionPartsOne === 1 ) {
						// > Gecko 1.9
						if ( browserVersionPartsTwo > 9 ) {
							nativeSupport = true;
						}
						// = Gecko 1.9
						else if ( browserVersionPartsTwo === 9 ) {
							// >= Gecko 1.9.2
							if ( browserVersionPartsThree >= 2 ) {
								nativeSupport = true;
							}
						}
					}
				}
				// >= Opera 10.60
				else if ( (browser.opera||false) ) {
					// > Opera 10
					if ( browserVersionPartsOne > 10 ) {
						nativeSupport = true;
					}
					// = Opera 10
					else if ( browserVersionPartsOne === 10 ) {
						// >= Opera 10.60
						if ( browserVersionPartsTwo >= 60 ) {
							nativeSupport = true;
						}
					}
				}
				
				// Return nativeSupport
				return nativeSupport;
			},
			
			/**
			 * Enable hashchange for all browsers
			 * For browsers which do not have native support, the support must be emulated.
			 */
			hashchangeLoader: function () {
				var History = $.History;
				
				// Fetch nativeSupport
				var nativeSupport = History.nativeSupport();
				
				// Check whether or not we need to implement a unfortunate but required workaround for browsers without nativeSupport
				if ( !nativeSupport ) {	
					// We are not IE8, or another browser which supports onhashchange natively
			
					// State our checker function, it is used to constantly check the location to detect a change
					var checker;
				
					// Handle depending on the browser
					if ( $.browser.msie ) {
						// We are still IE
						// IE6, IE7, etc
				
						// Append and $iframe to the document, as $iframes are required for back and forward
						// Create a hidden $iframe for hash change tracking
						History.$iframe = $('<iframe id="jquery-history-iframe" style="display: none;"></$iframe>').prependTo(document.body)[0];
					
						// Create initial history entry
						History.$iframe.contentWindow.document.open();
						History.$iframe.contentWindow.document.close();
					
						// Define the checker function (for bookmarks)
						var iframeHit = false;
						checker = function ( ) {
						
							// Fetch
							var hash = History.getHash();
							var state = History.getState();
							var iframeHash = History.extractHash(History.$iframe.contentWindow.document.location.hash);
						
							// Check if the browser hash is different
							if ( state !== hash ) {
								// Browser hash is different
							
								// Check if we need to update the iframe
								if ( !iframeHit ) {
									// Write a iframe/history entry in the browsers back and forward
									// alert('update iframe entry');
									History.$iframe.contentWindow.document.open();
									History.$iframe.contentWindow.document.close();
									// alert('update iframe entry.');
								
									// Update the iframe hash
									// alert('update iframe hash');
									History.$iframe.contentWindow.document.location.hash = hash;
									// alert('update iframe hash.');
								}
							
								// Reset
								iframeHit = false;
							
								// Fire
								// alert('hashchange');
								History.$window.trigger('hashchange');
								// alert('hashchange.');
							}
							else {
								// Browser hash is not different
							
								// Check if the iframe hash is different from the iframe state
								if ( state !== iframeHash ) {
									// Specify we were hit from the iframe
									iframeHit = true;
								
									// Update the browser hash
									// alert('set hash from iframe');
									History.setHash(iframeHash);
									// alert('set hash from iframe.');
								}
							}
						
						};
					}
					else {
						// We are not IE
						// Firefox, Opera, Etc
				
						// Define the checker function (for bookmarks, back, forward)
						checker = function ( ) {
							var hash = History.getHash();
							var state = History.getState();
							// Check
							if ( state !== hash ) {
								// State change
								History.$window.trigger('hashchange');
							}
						};
					}
				
					// Apply the checker function
					setInterval(checker, 200);
				}
				else {
					// We are IE8, or another browser which supports onhashchange natively
				
					// Fire the initial
					var hash = History.getHash();
					if ( hash ) {
						History.$window.trigger('hashchange');
					}
				}
			
				// Done
				return true;
			}
	
		}; // We have finished extending/defining our Plugin
	
		// --------------------------------------------------
		// Finish up
	
		// Instantiate
		$.History.construct();
	}
	else {
		window.console.warn('$.History has already been defined...');
	}
	
	// Finished definition
})(jQuery); // We are done with our plugin, so lets call it with jQuery as the argument
/**
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
	 * @version 1.5.3
	 * @date August 07, 2010
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
				 * For production use, you want to ensure this has been set to true. As we should always want to ensure we are in the correct location.
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
				 * Whether or not we should automatically find all ajaxy links and ajaxify them on the document ready calls.
				 * This should be left to true generally, as it keeps the links working for ajaxed'in content.
				 */
				auto_ajaxify_documentReady: true,
				/**
				 * Whether or not we should automatically sparkle the loaded in content (or page) on the document ready calls.
				 * This only applies if jQuery Sparkle has been detected.
				 */
				auto_sparkle_documentReady: true,
				/**
				 * Whether or not we should add a ajaxy sparkle extension such that we can perform an ajaxify on sparkled content.
				 * This only applies if jQuery Sparkle has been detected.
				 */
				add_sparkle_extension: true,
				/**
				 * The options to pass to $.fn.ScrollTo when we have detected an anchor.
				 */
				scrollto_options: {
					duration:400, /* Set to 0 to have no scroll animation effect */
					easing:'swing' /* unless you are using the jQuery Easing plugin, only [swing] and [linear] are available. */
				},
				/**
				 * Whether or not we should track all the anchors with Ajaxyy (even if they don't have the ajaxy class).
				 * If you are using jQuery Ajaxy to power your entire site, then this should be enabled.
				 */
				track_all_anchors: false,
				/**
				 * Whether or not we should track all the anchors with Ajaxy (even if they don't have the ajaxy class).
				 * If you are using jQuery Ajaxy to power your entire site, then this should be enabled.
				 */
				track_all_internal_links: false,
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
					},
					documentReady: function($el){
						var Ajaxy = $.Ajaxy; var Action = this;
						
						// Fire Ajaxy's stateCompleted
						return Ajaxy.stateCompleted(Action.State,$el);
					}
				},
				
				/**
				 * Default State Structure
				 * All Controllers inherit and are bound to this
				 * State is associated with a particular state
				 */
				State: {
					// Options
					mode: null,
					form: false,
					
					// Parts
					state: '',
					hash: '',
					anchor: '',
					querystring: '',
					
					// System
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
			 * Our Current State
			 */
			currentState: {},
			
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
			 * Ensure we return a valid String value
			 * @param {*} str
			 * @return {String}
			 */
			ensureString: function(str){
				var result = '';
				
				switch ( typeof str ) {
					case 'number':
					case 'string':
						result = String(str);
						break;
					
					default:
						result = '';
				}
				
				return result;
			},
			
			/**
			 * Extract a Relative URL from a URL
			 * @param {String} url
			 */
			extractRelativeUrl: function (url){
				var Ajaxy = $.Ajaxy; var History = $.History;
				
				// Prepare
				url = Ajaxy.ensureString(url);
				
				// Strip urls
				var relative_url = url.stripLeft(Ajaxy.options.root_url).stripLeft(Ajaxy.options.base_url);
				
				// Check
				if ( relative_url === '/' ) relative_url = ''; 
				
				// Return relative_url
				return relative_url;
			},
			
			/**
			 * Extract the State from a URL
			 * Alias for extractRelativeUrl
			 * @param {String} state
			 */
			extractState: function (url) {
				var Ajaxy = $.Ajaxy;
				
				// Strip urls
				var state = Ajaxy.extractRelativeUrl(url);
				
				// Return state
				return state;
			},
			
			/**
			 * Extract the Hash from a State
			 * @param {String} state
			 * @return {String}
			 */
			extractHash: function (state) {
				var Ajaxy = $.Ajaxy;
				
				// Strip urls
				var state = Ajaxy.extractState(state);
				
				// Extract the anchor
				var hash = state.match(/^([^#?]*)/)||'';
				if ( hash && hash.length||false === 2 ) {
					hash = hash[1]||'';
				}
				
				// Return hash
				return hash;
			},
			
			/**
			 * Extract a Anchor from a State
			 * @param {String} state
			 * @return {String}
			 */
			extractAnchor: function (state) {
				var Ajaxy = $.Ajaxy;
				
				// Strip urls
				var state = Ajaxy.extractState(state);
				
				// Extract the anchor
				var anchor = state.replace(/[^#]+#/g,'#').match(/#+([^#\?]*)/)||'';
				if ( anchor && anchor.length||false === 2 ) {
					anchor = anchor[1]||'';
				}
				
				// Check
				if ( anchor === state ) {
					anchor = '';
				}
				
				// Check
				if ( !anchor ) {
					// Extract anchor from QueryString
					var anchor = state.match(/anchor=([a-zA-Z0-9-_]+)/)||'';
					if ( anchor && anchor.length||false === 2 ) {
						anchor = anchor[1]||'';
					}
				}
				
				// Return anchor
				return anchor;
			},
			
			/**
			 * Extract a Querystring from a State
			 * @param {String} state
			 * @return {String}
			 */
			extractQuerystring: function (state) {
				var Ajaxy = $.Ajaxy;
				
				// Strip urls
				var state = Ajaxy.extractState(state);
				
				// Extract the querystring
				var querystring = state.match(/\?(.*)$/)||'';
				if ( querystring && querystring.length||false === 2 ) {
					querystring = querystring[1]||'';
				}
				
				// Return querystring
				return querystring;
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
						url: UserState
					};
				}
				
				// Prepare State
				var State = Ajaxy.getState(false,true);
				$.extend(true,State,UserState);
				
				// --------------------------
				// Ensure parts
				
				// Check for !state and url
				if ( !(State.state||false) && (State.url||false) ) {
					State.state	= Ajaxy.extractState(State.url);
				}
				
				// Rebuild the state
				Ajaxy.rebuildState(State);
				
				// Fix anchor
				if ( State.anchor === State.state || State.anchor === State.hash ) {
					State.anchor = '';
				}
				
				// Check for !hash and !querystring and anchor
				var querystring = (State.querystring||'').replace(/anchor=([a-zA-Z0-9-_]+)/g,'');
				if ( !(State.hash||false) && !querystring && (State.anchor||'') ) {
					// We are just an anchor change
					// Let's grab the currentState's hash and use that, as we want to modify the state so we don't actually go to the anchor in the url
					State.hash = Ajaxy.currentState.hash||'';
					State.querystring = querystring;
					
					// Rebuild the state
					Ajaxy.rebuildState(State);
				}
				
				// Check state
				if ( !State.state || (!State.hash && !querystring) ) {
					window.console.warn('Ajaxy.go: No state or (hash and querystring)', [this, arguments], [State]);
					return false;
				}
				delete querystring;
				
				// Ensure mode
				if ( State.mode||false ) {
					State.mode = State.form ? 'silent' : 'default';
				}
				
				// Store it
				Ajaxy.storeState(State);
			
				// --------------------------
				
				// Trigger state
				switch ( State.mode ) {
					case 'silent':
						// Don't log
						// Trigger manually
						Ajaxy.stateChange(State.state)
						break;
					
					case 'default':
					default:
						// Log the history
						// Trigger automaticly
						History.go(State.state);
						break;
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
			 * Rebuild a State
			 * @param {&State} State
			 * @return {State}
			 */
			rebuildState: function(State,mode){
				var Ajaxy = $.Ajaxy;
				
				// Extract
				var state = Ajaxy.extractState(State.state),
					hash = Ajaxy.ensureString(State.hash) || Ajaxy.extractHash(state),
					anchor = Ajaxy.ensureString(State.anchor) || Ajaxy.extractAnchor(state),
					querystring = Ajaxy.ensureString(State.querystring) || Ajaxy.extractQuerystring(state);
				
				// Assign the state
				State.state = hash;
				
				// Anchor
				if ( anchor ) {
					// Place anchor into querystring
					var params = querystring.queryStringToJSON();
					params.anchor = anchor;
					querystring = unescape($.param(params));
					delete params;
				}
				
				// Querystring
				if ( querystring ) {
					// Add querystring
					State.state += '?'+querystring;
				}
				
				// Assign the rest
				State.hash = hash;
				State.anchor = anchor;
				State.querystring = querystring; // this may have been updated in the anchor code a few lines above
				
				// Return State
				return State;
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
				
				// Rebuild State
				Ajaxy.rebuildState(State);
				
				// Fetch
				if ( stateType === 'object' && typeof State.state === 'string' ) {
					result = Ajaxy.States[State.state] = State;
				}
				else {
					window.console.error('Ajaxy.storeState: Unkown State Format', [this, arguments]);
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
				state = Ajaxy.extractState((state||{}).state||state);
				var State = undefined,
					type = typeof (state||undefined);
				
				// Fetch
				if ( (type === 'number' || type === 'string') && typeof Ajaxy.States[state] !== 'undefined' ) {
					State = Ajaxy.States[state];
				}
				else if ( create ) {
					State = Ajaxy.createState(state);
				}
				else if ( create === false ) {
					// Don't report couldn't find
				}
				else {
					// Report couldn't find
					window.console.error('Ajaxy.getState: State does not exist', [this, arguments]);
					window.console.trace();
				}
				
				// Rebuild State
				Ajaxy.rebuildState(State);
				
				// Return State
				return State;
			},
			
			/**
			 * Create a new State Object
			 * @param {String|Object} state
			 * @return {Object|undefined}
			 */
			createState: function ( state ) {
				var Ajaxy = $.Ajaxy;
				
				// Prepare
				state = Ajaxy.extractState((state||{}).state||state);
				
				// Create State
				State = $.extend(true,{},Ajaxy.defaults.State,{
					state: state
				});
				
				// Rebuild State
				Ajaxy.rebuildState(State);
				
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
					var url = Ajaxy.options.base_url+(state || '?');
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.track', [this,arguments], [url]);
					pageTracker._trackPageview(url);
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
			
			stateCompleted: function(State,$content){
				var Ajaxy = $.Ajaxy;
				
				// Prepare
				var ajaxify = Ajaxy.options.auto_ajaxify_documentReady;
				
				// Prepare Content
				if ( !(($content||{}).length||false) ) {
					$content = $('body');
				}
				
				// Auto Sparkle
				if ( Ajaxy.options.auto_sparkle_documentReady && $.Sparkle||false ) {
					if ( Ajaxy.options.add_sparkle_extension ) ajaxify = false; // as the sparkle extension will handle this
					$content.sparkle();
				}
				
				// Auto Ajaxify
				if ( ajaxify ) {
					$content.ajaxify();
				}
				
				// Check for Anchor
				var anchor = State.anchor||false;
				if ( anchor ) {
					// Reset the anchor
					State.anchor = false;
					$('.target').removeClass('target');
					// Fire the anchor
					$('#'+anchor).addClass('target').ScrollTo(Ajaxy.options.scrollto_options);
				}
				
				// Return true
				return true;
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
				// Initialise State
				
				// Determine State
				var State = Ajaxy.getState(state,true);
				
				// Check if we were a redirect
				if ( Ajaxy.redirected !== false ) {
					// We were, ignore as we have already been fired
					Ajaxy.redirected = false;
					return;
				}
				
				
				// --------------------------
				// Current State
				
				// Are we a repeat request
				var currentQuerystring = (Ajaxy.currentState.querystring||'').replace(/anchor=([a-zA-Z0-9-_]+)/g,''),
					newQuerystring = State.querystring.replace(/anchor=([a-zA-Z0-9-_]+)/g,'');
				if ( (Ajaxy.currentState.state||false) && Ajaxy.currentState.hash === State.hash && currentQuerystring === newQuerystring ) {
					// We are the same hash and querystring
					
					// Are we the same anchor
					if ( Ajaxy.currentState.anchor !== State.anchor ) {
						// Only the anchor has changed
						// So we only need to fire the stateCompleted to relocate the anchor
						if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.request: There has only been an anchor change', [this, arguments], [Ajaxy.currentState,State,state]);
						Ajaxy.stateCompleted(State);
					}
					
					// Update the currentState
					Ajaxy.currentState = State;
					
					// There has been no considerate state change
					if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.request: There has been no considerable change', [this, arguments], [Ajaxy.currentState,State,state]);
					return true;
				}
				delete currentQuerystring;
				delete newQuerystring;
				
				// Add to AJAX queue
				Ajaxy.ajaxQueue.push(state);
				if ( Ajaxy.ajaxQueue.length !== 1 ) {
					// Already processing an event
					// We will call stateChange when that event finishes
					// Which will call request
					return false;
				}
				// We are now the current event
			
				// Fire the analytics
				if ( Ajaxy.options.analytics ) {
					Ajaxy.track(state);
				}
				
				// Update the currentState
				Ajaxy.currentState = State;
				
				
				// --------------------------
				// Update the State
				
				// Determine controller
				var controller = State.controller || Ajaxy.match(state) || undefined;
				
				// Prepare the State
				State.controller = controller;
				State.Request.url = (State.Request.url || Ajaxy.options.root_url+Ajaxy.options.base_url+(state || '?'));
				
				// Store the State (in case it hasn't been stored yet - eg. we came through somewhere else other than go)
				Ajaxy.storeState(State);
				
				
				// --------------------------
				// Trigger State
				
				// Trigger Request
				Ajaxy.trigger(controller, 'request');
				
				
				// --------------------------
				// Handle Request
				
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
							var newState = Ajaxy.extractState(responseData.Ajaxy.redirected.to);
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
						Ajaxy.ajaxQueue.shift();
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
							var newState = Ajaxy.extractState(XMLHttpRequest.channel.name);
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
								json = $.parseJSON(text);
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
			 * Convert a HTML document into one compatiable with jQuery
			 * Will remove doctype, and convert html,head,body,title,meta elements to divs.
			 * @param {String} html
			 */
			htmlCompat: function(html){
				var result = String(html)
					.replace(/<\!DOCTYPE[^>]*>/i, '')
					.replace(/<(html|head|body|title|meta)/gi,'<div id="ajaxy-$1"')
					.replace(/<\/(html|head|body|title|meta)/gi,'</div')
				;
				
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
							responseData = $.parseJSON(responseText);
						}
						// Invalid JSON
						catch (e) {
							// Extract details
							var html = Ajaxy.htmlCompat(responseText),
								$html = $(html),
								$head = $html.find('#ajaxy-head'),
								$body = $html.find('#ajaxy-body'),
								$title = $html.find('#ajaxy-title'),
								$controller = $html.find('#ajaxy-controller'), /* special case support for controller in html pages */
								title = ($title.length ? $title.text() : ''),
								head = ($head.length ? $head.htmlAndSelf() : ''),
								body = ($body.length ? $body.htmlAndSelf() : ''),
								content = ($body.length ? $body.html() : html),
								controller = ($controller.length ? $controller.text().trim() : null);
							
							// Create
							responseData = {
								"controller": controller,
								"responseText": responseText,
								"html": html,
								"title": title,
								"head": head,
								"body": body,
								"content": content
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
							responseData = $.parseJSON(responseText);
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
				Ajaxy.options = $.extend(true, Ajaxy.options, options.options||options);
			
				// Set params
				Ajaxy.bind(Controllers);
				
				// --------------------------
				
				// URLs
				Ajaxy.options.root_url = (Ajaxy.options.root_url || document.location.protocol.toString()+'//'+document.location.hostname.toString()).replace(/\/+$/, '')+'/';
				Ajaxy.options.base_url = (Ajaxy.options.base_url || '');
				Ajaxy.options.relative_url = Ajaxy.extractState(Ajaxy.options.relative_url ||  document.location.pathname.toString());
				
				// Relative as Base
				if ( Ajaxy.options.relative_as_base ) {
					if ( Ajaxy.options.base_url.length === 0 ) {
						Ajaxy.options.base_url = Ajaxy.options.relative_url;
						Ajaxy.options.relative_url = '';
					}
				}
				
				// Adjust finals urls
				Ajaxy.options.root_url = Ajaxy.options.root_url.replace(/\/+$/, '');
				Ajaxy.options.base_url = Ajaxy.options.base_url.replace(/\/+$/, '');
				Ajaxy.options.relative_url = Ajaxy.extractRelativeUrl(Ajaxy.options.relative_url);
				
				// Check
				if ( Ajaxy.options.root_url === '/' ) Ajaxy.options.root_url = ''; 
				if ( Ajaxy.options.base_url === '/' ) Ajaxy.options.base_url = ''; 
				if ( Ajaxy.options.relative_url === '/' ) Ajaxy.options.relative_url = ''; 
				
				// --------------------------
				
				// Debug
				if ( Ajaxy.options.debug ) window.console.debug('Ajaxy.configure:', [this, arguments]);
				
				// Initial redirect
				if ( Ajaxy.options.redirect && Ajaxy.options.relative_url && Ajaxy.options.relative_url !== null  ) {
					var location = Ajaxy.options.root_url+Ajaxy.options.base_url+'#'+Ajaxy.options.relative_url,
						hash = History.getHash();
					if ( hash ) {
						location += '?anchor='+hash;
					}
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
				
				// Check for Sparkle
				if ( $.Sparkle||false && Ajaxy.options.add_sparkle_extension ) {
					// Add Ajaxify to Sparkle
					$.Sparkle.addExtension('ajaxy', function(){
						// Find all internal links, mark them as Ajaxy links
						$(this).ajaxify();
					});
				}
				
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
				
				// Handle special cases
				if ( Ajaxy.options.track_all_internal_links ) {
					$el.findAndSelf('a[href^=/],a[href^=./]').filter(':not(.ajaxy,.no-ajaxy)').addClass('ajaxy');
				}
				if ( Ajaxy.options.track_all_anchors ) {
					$el.findAndSelf('a[href^=#]:not(.ajaxy,.no-ajaxy)').addClass('ajaxy');
				}
				
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
					var href = Ajaxy.extractRelativeUrl($a.attr('href')).replace(/^\/?\.\//,'/');
					var state = Ajaxy.extractState(href);
					var anchor = Ajaxy.extractAnchor(href);
					if ( '/'+anchor === state || anchor === state ) anchor = '';
					var log = !$a.hasClass(Ajaxy.options.no_log_class);
					var controller = $a.data('ajaxy-controller')||null;
					
					// Perform the request
					Ajaxy.go({
						'state': state,
						'controller': controller,
						'log': log,
						'anchor': anchor
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
					var state = Ajaxy.extractState($form.attr('action'));//.replace(/[?\.]?\/?/, '#/');
					
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
