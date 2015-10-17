/* jQRangeSlider
 * A javascript slider selector that supports dates
 * 
 * Copyright (C) Guillaume Gautreau 2010, 2011
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
 (function ($, undefined) {
	$.widget("ui.rangeSlider", {
		options: {
			bounds: {min:0, max:100},
			defaultValues: {min:20, max:50},
			wheelMode: null,
			wheelSpeed: 4,
			arrows: true,
			valueHelpers: "show",
			formatter: null,
			durationIn: 0,
			durationOut: 400,
			delayOut: 200
		},
		
		_values: null,
		
		// Created elements
		bar: null,
		leftHandle: null,
		rightHandle: null,
		innerBar: null,
		container: null,
		arrows: null,
		helpers: null,
		changing: {min:false, max:false},
		changed: {min:false, max:false},
		
		// Scroll management
		lastWheel : 0,
		lastScroll: 0,
		scrollCount: 0,
		
		_create: function(){
			this._values = this.options.defaultValues;
			this.helpers = {left: null, right:null, leftDisplayed:true, rightDisplayed:true};
			this.arrows = {left:null, right:null};
			this.changing = {min:false, max:false};
			this.changed = {min:false, max:false};
      		
			this.leftHandle = $("<div class='ui-rangeSlider-handle  ui-rangeSlider-leftHandle' />")
				.draggable({axis:"x", containment: "parent",
					drag: $.proxy(this._handleMoved, this), 
					stop: $.proxy(this._handleStop, this),
					containment: "parent"})
				.css("position", "absolute");
			this.rightHandle = $("<div class='ui-rangeSlider-handle ui-rangeSlider-rightHandle' />")
				.draggable({axis:"x", containment: "parent",
					drag: $.proxy(this._handleMoved, this), 
					stop: $.proxy(this._handleStop, this),
					containment: "parent"})
				.css("position", "absolute");
			
			this.innerBar = $("<div class='ui-rangeSlider-innerBar' />")
				.css("position", "absolute")
				.css("top", 0)
				.css("left", 0);
		
			this.container = $("<div class='ui-rangeSlider-container' />")
				.css("position", "absolute");
			
			this.bar = $("<div class='ui-rangeSlider-bar' />")
				.draggable({axis:"x", containment: "parent",
					drag: $.proxy(this._barMoved, this), 
					stop: $.proxy(this._barStop, this),
					containment: this.container})
				.css("position", "absolute")
				.bind("mousewheel", $.proxy(this._wheelOnBar, this));
			
			this.arrows.left = $("<div class='ui-rangeSlider-arrow ui-rangeSlider-leftArrow' />")
				.css("position", "absolute")
				.css("left", 0)
				.bind("mousedown", $.proxy(this._startScrollLeft, this));
			
			this.arrows.right = $("<div class='ui-rangeSlider-arrow ui-rangeSlider-rightArrow' />")
				.css("position", "absolute")
				.css("right", 0)
				.bind("mousedown", $.proxy(this._startScrollRight, this));
			
			$(document).bind("mouseup", $.proxy(this._stopScroll, this));
			
			this.container
				.append(this.leftHandle)
				.append(this.rightHandle)
				.append(this.innerBar)
				.append(this.bar);
			
			this.element
				.append(this.container)
				.append(this.arrows.left)
				.append(this.arrows.right)
				.addClass("ui-rangeSlider")
				.bind("mousewheel", $.proxy(this._wheelOnContainer, this));
			
			if (this.element.css("position") != "absolute"){
				this.element.css("position", "relative");
			}
			
			if (!this.options.arrows){
				this.arrows.left.css("display", "none");
				this.arrows.right.css("display", "none");
				this.element.addClass("ui-rangeSlider-noArrow");
			}else{
				this.element.addClass("ui-rangeSlider-withArrows");
			}
			
			if (this.options.valueHelpers != "hide"){
				this._createHelpers();
			}else{
				this._destroyHelpers();
			}
			
			$(window).resize($.proxy(this._resize, this));
			
			this.option(this.options);
						
			// Seems that when all the elements are not ready, outerWidth does not return the good value
			setTimeout($.proxy(this._initWidth, this), 1);
			//this._initWidth();
			setTimeout($.proxy(this._initValues, this), 1);
		},
		
		_initWidth: function(){
			this.container.css("width", this.element.width() - this.container.outerWidth(true) + this.container.width());
			this.innerBar.css("width", this.container.width() - this.innerBar.outerWidth(true) + this.innerBar.width());
		},
		
		_initValues: function(){
			this.values(this.options.defaultValues.min, this.options.defaultValues.max);
		},
		
		_setOption: function(key, value) {
			if (key == "defaultValues")
			{
				if ((typeof value.min != "undefined") 
					&& (typeof value.max != "undefined") 
					&& parseFloat(value.min) === value.min 
					&& parseFloat(value.max) === value.max)
				{
					this.options.defaultValues = value;
				}
			}else if (key == "wheelMode" && (value == "zoom" || value == "scroll" || value===null)){
				this.options.wheelMode = value;
			}else if (key == "wheelSpeed" && parseFloat(value) !== NaN && Math.abs(parseFloat(value)) <= 100){
				this.options.wheelSpeed = parseFloat(value);
			}else if (key == "arrows" && (value === true || value === false) && value != this.options.arrows){
				if (value){
					this.element
						.removeClass("ui-rangeSlider-noArrow")
						.addClass("ui-rangeSlider-withArrows");
					this.arrows.left.css("display", "block");
					this.arrows.right.css("display", "block");
				}else{
					this.element
						.addClass("ui-rangeSlider-noArrow")
						.removeClass("ui-rangeSlider-withArrows");
					this.arrows.left.css("display", "none");
					this.arrows.right.css("display", "none");
				}
				
				this.options.arrows = value;
				this._initWidth();
				this._position();
			}else if (key == "valueHelpers" && (value == "hide" || value == "show" || value == "change")){
				this.options.valueHelpers = value;
				
				if (value != "hide"){
					this._createHelpers();
				}else{
					this._destroyHelpers();
				}
			}else if (key == "formatter" && value != null && typeof value == "function"){
				this.options.formatter = value;
				this._position();
			}else if (key == "bounds" 
					&& (typeof value.min != "undefined") 
					&& (typeof value.max != "undefined") 
					&& parseFloat(value.min) === value.min 
					&& parseFloat(value.max) === value.max
					&& value.min < value.max)
			{
				this.options.bounds = value;
				this.values(this._values.min, this._values.max);
			}
		},
		
		_getPosition: function(value){
			return (value - this.options.bounds.min) * (this.container.innerWidth() - 1) / (this.options.bounds.max - this.options.bounds.min);
		},
		
		_getValue: function(position){
			return position * (this.options.bounds.max - this.options.bounds.min) / (this.container.innerWidth() - 1) + this.options.bounds.min;
		},
		
		_privateValues: function(min, max){
			this._setValues(min, max);
			this._position();
			
			return this._values;
		},
		
		_trigger: function(eventName){
			this.element.trigger(eventName, {
			  	helper: this.element,
			  	values: this.values()
			  });
		},
		
		_position: function(){
			var leftPosition = this._getPosition(this._values.min);
			var rightPosition = this._getPosition(this._values.max);
			
			this._positionHandles();
			this.bar
				.css("left", leftPosition)
				.css("width", rightPosition- leftPosition + this.bar.width() - this.bar.outerWidth(true) + 1);
		},
		
		_positionHandles: function(){
			var left = this._getPosition(this._values.min);
			var right = this._getPosition(this._values.max) - this.rightHandle.outerWidth(true) + 1;
			this.leftHandle.css("left", left);
			this.rightHandle.css("left", right);
			
			this._positionHelpers(left, right);
		},
		
		_barMoved: function(event, ui){
			var left = ui.position.left;
			var right = left + this.bar.outerWidth(true) - 1;
			
			this._setValues(this._getValue(left), this._getValue(right));
			this._positionHandles();
		},
		
		_barStop: function(event, ui){
			this._position();
			this._prepareFiringChanged();
		},
		
		_switchHandles: function(){
				var temp = this.leftHandle;
				this.leftHandle = this.rightHandle;
				this.rightHandle = temp;
				
				this.leftHandle
					.removeClass("ui-rangeSlider-rightHandle")
					.addClass("ui-rangeSlider-leftHandle");
				this.rightHandle
					.addClass("ui-rangeSlider-rightHandle")
					.removeClass("ui-rangeSlider-leftHandle");
		},
		
		_handleMoved: function(event, ui){
			var min = this._values.min;
			var max = this._values.max;

			if (ui.helper[0] == this.leftHandle[0]){
					min = this._getValue(ui.position.left);
			}else if (ui.helper[0] == this.rightHandle[0])
			{
				max = this._getValue(ui.position.left - 1 + ui.helper.outerWidth(true));
			}else{
				return;
			}
			
			if (min > max){
				this._switchHandles();
				var temp = min;
				min = max;
				max = temp;
			}
				
			this._privateValues(min, max);
		},
		
		_handleStop: function(event, ui){
			this._position();
			this._prepareFiringChanged();
		},
		
		_changing: function(min, max){
			this._trigger("valuesChanging");
			
			var show = false;
			if (min && !this.changing.min){
				this._trigger("minValueChanging");
				this.changing.min = true;
				show = true;
			}
			
			if (max && !this.changing.max){
				this._trigger("maxValueChanging");
				this.changing.max = true;
				show = true;
			}
			
			if (show){
				this._showHelpers();
			}
		},
		
		_prepareFiringChanged: function(){
			this.lastWheel = Math.random();
			var last = this.lastWheel;
			setTimeout($.proxy(function(){this._fireChanged(last);}, this), 200);
		},
		
		_fireChanged: function(last){
			if (this.lastWheel == last && !this.bar.hasClass("ui-draggable-dragging") && !this.leftHandle.hasClass("ui-draggable-dragging") && !this.rightHandle.hasClass("ui-draggable-dragging")){
				var changed = false;
				if (this.changing.min){
					this.changing.min = false;
					this._trigger("minValueChanged");
					changed = true;
				}
				
				if (this.changing.max){
					this.changing.max = false;
					this._trigger("maxValueChanged");
					changed = true;
				}
				
				if (changed){
					this._trigger("valuesChanged");
				}
				
				this._hideHelpers();
			}
		},
		
		_setValuesHandles: function(min, max){	
			this._setValues(min, max);
			this._positionHandles();
		},
	
		_setValues: function(min, max){
			var oldValues = this._values;
			var difference = Math.abs(max-min);
			
			if (difference >= this.options.bounds.max - this.options.bounds.min){
				this._values.min = this.options.bounds.min;
				this._values.max = this.options.bounds.max;
			}else{
				values = {min: Math.min(max, min), max:Math.max(min, max)};
				
				if (values.min < this.options.bounds.min){
					values.min = this.options.bounds.min;
					values.max = values.min + difference;
				}else if (values.max > this.options.bounds.max){
					values.max = this.options.bounds.max;
					values.min = values.max - difference;
				}
				
				this._values = values;
			}
			
			this._changing(oldValues.min != this._values.min, oldValues.max != this._values.max);
			this._prepareFiringChanged();
		},
		
		_resize: function(){
			this._initWidth();
			this._position();
		},
		
		/*
		 * Scrolling
		 */
		
		_startScrollLeft: function(event, ui){
			this.lastScroll = Math.random();
			this.scrollCount = 0;
			this._continueScrollingRight(-1, this.lastScroll);
		},
		
		_startScrollRight: function(event, ui){
			this.lastScroll = Math.random();
			this.scrollCount = 0;
			this._continueScrollingRight(1, this.lastScroll);
		},
		
		_continueScrollingRight: function(quantity, last){
			if (last == this.lastScroll){
				var factor = Math.min(Math.floor(this.scrollCount / 5) + 1, 4) / 4;
				
				this.scrollRight(quantity * factor);
				this.scrollCount++;
				setTimeout($.proxy(function(){this._continueScrollingRight(quantity, last);}, this), 50);
			}
		},
		
		_stopScroll: function(event, ui){
			this.lastScroll = Math.random();
		},
		
		/*
		 * Mouse wheel
		 */
		
		_wheelOnBar: function(event, delta, deltaX, deltaY){
			if (this.options.wheelMode == "zoom"){
				this.zoomIn(-deltaY);
				
				return false;
			}
		},
		
		_wheelOnContainer: function(event, delta, deltaX, deltaY){
			if (this.options.wheelMode == "scroll"){
				this.scrollRight(-deltaY);
				
				return false;
			}
		},
		
		/*
		 * Value helpers
		 */
		_createHelper: function(helper, classes){
			if (helper == null){
				helper = $("<div class='ui-rangeSlider-helper'/>")
					.addClass(classes)
					.css("position", "absolute");
				$("body").append(helper);
				
				this._positionHelpers(0, 0);
			}
			
			return helper;
		},
		
		_destroyHelper: function(helper){
			if (helper != null){
				helper.remove();
				helper = null;
			}
			
			return helper;
		},
		
		_createHelpers: function(){
			this.helpers.left = this._createHelper(this.helpers.left, "ui-rangeSlider-leftHelper");
			this.helpers.right = this._createHelper(this.helpers.right, "ui-rangeSlider-rightHelper");
			
			if (this.options.valueHelpers == "change"){
				this.helpers.left.css("display", "none");
				this.helpers.right.css("display", "none");
				this.helpers.leftDisplayed = false;
				this.helpers.rightDisplayed = false;
			}else{
				this.helpers.leftDisplayed = true;
				this.helpers.rightDisplayed = true;
				this.helpers.left.css("display", "block");
				this.helpers.right.css("display", "block");
				
				this._position();
			}
		},
		
		_destroyHelpers: function(){
			this.helpers.left = this._destroyHelper(this.helpers.left);
			this.helpers.right = this._destroyHelper(this.helpers.right);
		},
		
		_positionHelper: function(helper, position, value){
				helper.css("left", position)
					.css("top", this.leftHandle.offset().top - helper.outerHeight(true));
		},
		
		_positionHelpers: function(){
			if (this.helpers.left != null && this.helpers.right != null){
				this.helpers.left.text(this._format(this._values.min));
				this.helpers.right.text(this._format(this._values.max));
				
				var minSize = this.helpers.leftDisplayed ? this.helpers.left.outerWidth(true) : 0;
				var maxSize = this.helpers.rightDisplayed ? this.helpers.right.outerWidth(true) : 0;
				var leftBound = 0;
				var rightBound = $(window).width() - maxSize;
				var minLeft = Math.max(leftBound, this.leftHandle.offset().left + this.leftHandle.outerWidth(true) / 2 - minSize / 2);
				var maxLeft = Math.min(rightBound, this.rightHandle.offset().left + this.rightHandle.outerWidth(true) / 2 - maxSize / 2);
				
				// Need to find a better position
				if (minLeft + minSize >= maxLeft){
					var diff =  minLeft + minSize - maxLeft;
					minLeft = Math.max(leftBound, minLeft - diff / 2);
					maxLeft = Math.min(rightBound, minLeft + minSize);
					minLeft = Math.max(leftBound, maxLeft - minSize);
				}
				
				if (this.helpers.leftDisplayed) this._positionHelper(this.helpers.left, minLeft, this._values.min);
				if (this.helpers.rightDisplayed) this._positionHelper(this.helpers.right, maxLeft, this._values.max);
			}
		},
		
		_format: function(value){
			if (typeof this.options.formatter != "undefined" && this.options.formatter != null){
				return this.options.formatter(value);
			}else{
				return this._defaultFormat(value);
			}
		},
		
		_defaultFormat: function(value){
			return Math.round(value);
		},
		
		_showHelpers: function(){
			if (this.options.valueHelpers == "change" && !this.privateChange){
				if (this.changing.min && !this.helpers.leftDisplayed){
					this.helpers.left.stop(true, true).fadeIn(this.options.durationIn);
					this.helpers.leftDisplayed = true;
				}
				
				if (this.changing.max && !this.helpers.rightDisplayed){
					this.helpers.rightDisplayed = true;
					this.helpers.right.stop(true, true).fadeIn(this.options.durationIn);
				}
			}
		},
		
		_hideHelpers: function(){
			if (this.options.valueHelpers == "change" && this.helpers.left != null && this.helpers.right != null){
				this.helpers.leftDisplayed = false;
				this.helpers.rightDisplayed = false;
				this.helpers.left.stop(true, true).delay(this.options.delayOut).fadeOut(this.options.durationOut);
				this.helpers.right.stop(true, true).delay(this.options.delayOut).fadeOut(this.options.durationOut);
			}
		},
		
		/*
		 * Public methods
		 */
		
		values: function(min, max){
			if (typeof min != "undefined" 
				&& typeof max != "undefined")
			{
				this.internalChange = false;
				this._privateValues(min,max);
				this.internalChange = true;
			}
			
			return this._values;
		},
		
		min: function(min){
			return this.values(min, this._values.max).min;
		},
		
		max: function(max){
			return this.values(this._values.min, max).max;
		},
		
		zoomIn: function(quantity){
			var diff = this._values.max - this._values.min;
					
			min = this._values.min + quantity * this.options.wheelSpeed * diff / 200;
			max = this._values.max - quantity * this.options.wheelSpeed * diff / 200;
			
			this._privateValues(min, max);
		},
		
		zoomOut: function(quantity){
			this.zoomIn(-quantity);
		},
		
		scrollLeft: function(quantity){
			if (typeof quantity == 'undefined')
				quantity = 1;
			this.scrollRight(-quantity);
		},
		
		scrollRight: function(quantity){
			if (typeof quantity == "undefined")
				quantity = 1;
			var diff = this._values.max - this._values.min;
		
			min = this._values.min + quantity * this.options.wheelSpeed * diff / 100;
			max = this._values.max + quantity * this.options.wheelSpeed * diff / 100;
			
			this._privateValues(min, max);
		},
		
		destroy: function(){
			this.element.removeClass("ui-rangeSlider-withArrows")
			.removeClass("ui-rangeSlider-noArrow");
			this.bar.detach();
			this.leftHandle.detach();
			this.rightHandle.detach();
			this.innerBar.detach();
			this.container.detach();
			this.arrows.left.detach();
			this.arrows.right.detach();
			this.element.removeClass("ui-rangeSlider");
			this._destroyHelpers();
			delete this.options;
			
			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);