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
	 * @version 1.3.0
	 * @date August 01, 2010
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
			 * Format a hash into a proper state
			 * @param {String} hash
			 */
			format: function ( hash ) {
				// Format the hash
				hash = hash
					.replace(/^.*#/g, '') /* strip anything before the anchor in case we were passed a url */
					;
			
				// Return the hash
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
				state = History.format(state)
			
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
				var hash = History.format(window.location.hash || location.hash);
			
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
				hash = History.format(hash);
			
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
				to = History.format(to);
			
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
			 * Enable hashchange for all browsers
			 */
			hashchangeLoader: function () {
				var History = $.History;
			
				// More is needed for non IE8 browsers
				if ( !($.browser.msie && parseInt($.browser.version) >= 8) ) {	
					// We are not IE8
			
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
							var iframeHash = History.format(History.$iframe.contentWindow.document.location.hash);
						
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
					// We are IE8
				
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
