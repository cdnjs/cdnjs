/*!
 * tabcomplete
 * Lightweight tab completion for inputs and textareas
 *
 * Source:
 * https://github.com/erming/tabcomplete
 *
 * Copyright (c) 2014 Mattias Erming <mattias@mattiaserming.com>
 * Licensed under the MIT License.
 *
 * Version 1.2.2
 */
(function($) {
	var keys = {
		backspace: 8,
		tab: 9,
		up: 38,
		down: 40
	};
	
	$.fn.tabcomplete = // Alias
	$.fn.tabComplete = function(args, options) {
		if (this.length > 1) {
			return this.each(function() {
				$(this).tabComplete(args, options);
			});
		}
		
		// Only enable the plugin on <input> and <textarea> elements.
		var tag = this.prop("tagName");
		if (tag != "INPUT" && tag != "TEXTAREA") {
			return;
		}
		
		// Set default options.
		options = $.extend({
			after: "",
			arrowKeys: tag == "INPUT" ? true : false,
			caseSensitive: false,
			hint: true,
			minLength: 1,
			onTabComplete: $.noop
		}, options);
		
		// Unbind namespace.
		// This allows us to override the plugin if necessary.
		this.unbind(".tabComplete");
		
		var self = this;
		var i = -1;
		var words = [];
		var last = "";
		
		this.on("input.tabComplete", function(e) {
			var input = self.val();
			var word = input.split(/ |\n/).pop();

			if (!word) {
				i = -1;
				words = [];
				last = "";
			} else if (typeof args === "function") {
				// If the user supplies a function, invoke it
				// and keep the result.
				words = args(word);
			} else {
				// Otherwise, call the .match() function.
				words = match(args, word, options.caseSensitive);
			}
			
			// Emit the number of matching words with the 'match' event.
			self.trigger("match", words.length);
			
			if (options.hint) {
				if (word.length >= options.minLength && words.length) {
					hint.call(self, words[0]);
				} else {
					// Clear hinting.
					// This call is needed when using backspace.
					hint.call(self, "");
				}
			}
		});
		
		this.on("keydown.tabComplete", function(e) {
			var key = e.which;
			if (key == keys.tab || (options.arrowKeys && (key == keys.up || key == keys.down))) { 
				// Don't lose focus on tab click.
				e.preventDefault();
				
				// Iterate the matches with tab and the up and down keys by incrementing
				// or decrementing the 'i' variable.
				if (key != keys.up) {
					i++;
				} else {
					if (i == -1) return;
					if (i == 0) {
						// Jump to the last word.
						i = words.length - 1;
					} else {
						i--;
					}
				}
					
				// Get next match.
				var word = words[i % words.length];
				if (!word) {
					return;
				}
				
				var input = self.val().trim();
				last = last || input.split(/ |\n/).pop();
				
				if (last.length < options.minLength) {
					return;
				}
				
				self.val(
					input.substr(0, input.lastIndexOf(last))
							+ word
							+ options.after
				);
				
				// Remember the word until next time.
				last = word;
				
				// Trigger callback.
				options.onTabComplete(last);
				
				// Trigger the 'tabComplete' event on a successful complete.
				self.trigger("tabComplete", last);
				
				if (options.hint) {
					// Turn off any additional hinting.
					hint.call(self, "");
				}
			} else if (e.which == keys.backspace) {
				// Reset iteration.
				i = -1;
				last = "";
			}
		});
		
		if (options.hint) {
			// If enabled, turn on hinting.
			hint.call(this, "");
		}
		
		return this;
	}
	
	// Simple matching.
	// Filter the array and return the items that begins with `word`.
	function match(array, word, caseSensitive) {
		return $.grep(
			array,
			function(w) {
				if (caseSensitive) {
					return !w.indexOf(word);
				} else {
					return !w.toLowerCase().indexOf(word.toLowerCase());
				}
			}
		);
	}

	// Input hinting.
	// This works by creating a copy of the input and placing it behind
	// the real input.
	function hint(word) {
		var input = this;
		var clone = input.prev(".hint");
		
		input.css({
			backgroundColor: "transparent",
			position: "relative",
		});
		
		// Lets create a clone of the input if it does
		// not already exist.
		if (!clone.length) {
			input.wrap(
				$("<div>").css({position: "relative"})
			);
			clone = input
				.clone()
				.attr("tabindex", -1)
				.removeAttr("id name placeholder")
				.addClass("hint")
				.insertBefore(input);
			clone.css({
				position: "absolute",
			});
		}
		
		var hint = "";
		if (typeof word !== "undefined") {
			var text = input.val();
			hint = text + word.substr(text.split(/ |\n/).pop().length);
		}
		
		clone.val(hint);
	}
})(jQuery);
