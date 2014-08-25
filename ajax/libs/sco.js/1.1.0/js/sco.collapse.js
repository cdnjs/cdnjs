/* ==========================================================
 * sco.collapse.js
 * http://github.com/terebentina/sco.js
 * ==========================================================
 * Copyright 2013 Dan Caragea.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */

/*jshint laxcomma:true, sub:true, browser:true, jquery:true, devel:true, eqeqeq:false */

;(function($, undefined) {
	"use strict";

	var pluginName = 'scojs_collapse';

	function Collapse($trigger, options) {
		this.options = $.extend({}, $.fn[pluginName].defaults, options);
		this.$trigger = $trigger;
		if (this.options.target !== null) {
			this.$target = $(this.options.target);
		} else {
			this.$target = this.$trigger[this.options.mode](this.options.collapseSelector);
		}
		if (this.options.parent !== null) {
			this.$parent = this.$trigger.closest(this.options.parent);
		}
	}

	$.extend(Collapse.prototype, {
		toggle: function() {
			//this.$target.toggleClass(this.options.activeTargetClass);
			if (this.options.ease) {
				this.$target[$.camelCase(this.options.ease + '-toggle')]();
			} else {
				this.$target.toggle();
			}
			if (this.$parent && !this.$trigger.hasClass(this.options.activeTriggerClass)) {
				this.$parent.find(this.options.triggerSelector + '.' + this.options.activeTriggerClass)[pluginName](this.options);
			}
			this.$trigger.toggleClass(this.options.activeTriggerClass);
			if (this.options.triggerHtml !== null) {
				var self = this;
				this.$trigger.html(function() {
					if (self.$trigger.hasClass(self.options.activeTriggerClass)) {
						return self.options.triggerHtml.on;
					} else {
						return self.options.triggerHtml.off;
					}
				});
			}
			return this;
		}
	});


	$.fn[pluginName] = function(options) {
		return this.each(function() {
			var obj;
			if (!(obj = $.data(this, pluginName))) {
				var $this = $(this)
					,data = $this.data()
					,opts = $.extend({}, $.fn[pluginName].defaults, options, data)
					;
				obj = new Collapse($this, opts);
				$.data(this, pluginName, obj);
			}
			obj.toggle();
		});
	};


	$[pluginName] = function(trigger, options) {
		if (typeof trigger === 'string') {
			trigger = $(trigger);
		}
		return new Collapse(trigger, options);
	};


	$.fn[pluginName].defaults = {
		parent: null                        // having a parent activates the accordion mode behaviour
		,target: null                       // the element to show/hide. If null, the target is chosen based on the "mode" selector
		,activeTriggerClass: 'active'       // class to add to the trigger in active (on) state
		//,activeTargetClass: 'in'          // class to add to the target in active (on) state
		,triggerHtml: null                  // if not null, this should be a hash like {off: 'more', on: 'less'}. This text is set on the trigger.
		,mode: 'next'                       // "next" means target is after trigger, "prev" means target is before trigger in html source
		,collapseSelector: '.collapsible'   // used in accordion to find out what to collapse when the current target expands or if the target is null
		,triggerSelector: '[data-trigger="collapse"]'		// used in accordion to find out all triggers
		,ease: 'slide'                      // the animation effect to use. Must support toggle (like slideToggle/fadeToggle or even empty string :))
	};

	$(document).on('click.' + pluginName, '[data-trigger="collapse"]', function(e) {
		$(this)[pluginName]({triggerSelector: e.handleObj.selector});
		if ($(this).is('a')) {
			return false;
		}
	});
})(jQuery);
