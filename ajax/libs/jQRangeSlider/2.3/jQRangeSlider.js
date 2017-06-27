/**
 * @license jQRangeSlider Copyright (C) Guillaume Gautreau 2010, 2011
 * A javascript slider selector that supports dates
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
	"use strict";

	$.widget("ui.rangeSlider", {
		options: {
			bounds: {min:0, max:100},
			defaultValues: {min:20, max:50},
			wheelMode: null,
			wheelSpeed: 4,
			arrows: true,
			valueLabels: "show",
			formatter: null,
			durationIn: 0,
			durationOut: 400,
			delayOut: 200,
			range: {min: false, max: false}
		},

		_values: null,

		// Created elements
		bar: null,
		leftHandle: null,
		rightHandle: null,
		innerBar: null,
		container: null,
		arrows: null,
		labels: null,
		changing: {min:false, max:false},
		changed: {min:false, max:false},

		// Scroll management
		lastWheel : 0,
		lastScroll: 0,
		scrollCount: 0,

		_create: function(){
			this._values = this.options.defaultValues;
			this.labels = {left: null, right:null, leftDisplayed:true, rightDisplayed:true};
			this.arrows = {left:null, right:null};
			this.changing = {min:false, max:false};
			this.changed = {min:false, max:false};
			
			this.leftContainment = $("<div class='ui-rangeSlider-handleContainment ui-rangeSlider-leftContainment' />")
				.css("position", "absolute")
				.css("top", 0)
				.css("left", 0);
			
			this.rightContainment = $("<div class='ui-rangeSlider-handleContainment ui-rangeSlider-rightContainment' />")
				.css("top", 0)
				.css("left", 0);

			this.leftHandle = $("<div class='ui-rangeSlider-handle  ui-rangeSlider-leftHandle' />")
				.draggable({axis:"x", containment: this.leftContainment,
					drag: $.proxy(this._handleMoved, this),
					stop: $.proxy(this._handleStop, this)})
				.css("position", "absolute")
				.css("top", 0);
			this.rightHandle = $("<div class='ui-rangeSlider-handle ui-rangeSlider-rightHandle' />")
				.draggable({axis:"x", containment: this.rightContainment,
					drag: $.proxy(this._handleMoved, this),
					stop: $.proxy(this._handleStop, this)})
				.css("position", "absolute")
				.css("top", 0);
			
			this.innerBar = $("<div class='ui-rangeSlider-innerBar' />")
				.css("position", "absolute")
				.css("top", 0)
				.css("left", 0);

			this.container = $("<div class='ui-rangeSlider-container' />")
				.css("position", "absolute");

			this.bar = $("<div class='ui-rangeSlider-bar' />")
				.draggable({axis:"x",
					drag: $.proxy(this._barMoved, this),
					stop: $.proxy(this._barStop, this),
					containment: this.container})
				.css("position", "absolute")
				.css("top", 0)
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
				.append(this.leftContainment)
				.append(this.rightContainment)
				.append(this.innerBar)
				.append(this.bar)
				.append(this.leftHandle)
			  .append(this.rightHandle);

			this.element
				.append(this.container)
				.append(this.arrows.left)
				.append(this.arrows.right)
				.addClass("ui-rangeSlider")
				.bind("mousewheel", $.proxy(this._wheelOnContainer, this));

			if (this.element.css("position") !== "absolute"){
				this.element.css("position", "relative");
			}

			if (!this.options.arrows){
				this.arrows.left.css("display", "none");
				this.arrows.right.css("display", "none");
				this.element.addClass("ui-rangeSlider-noArrow");
			}else{
				this.element.addClass("ui-rangeSlider-withArrows");
			}

			if (this.options.valueLabels !== "hide"){
				this._createLabels();
			}else{
				this._destroyLabels();
			}

			$(window).resize($.proxy(this.resize, this));

			this.option(this.options);

			setTimeout($.proxy(this.resize, this), 1);
			setTimeout($.proxy(this._initValues, this), 1);
		},

		_initWidth: function(){
			this.container.css("width", this.element.width() - this.container.outerWidth(true) + this.container.width());
			this.innerBar.css("width", this.container.width() - this.innerBar.outerWidth(true) + this.innerBar.width());
			this.leftContainment.css("width", this.container.innerWidth())
				.css("height", this.container.innerHeight());
			this.rightContainment.css("width", this.container.innerWidth())
				.css("height", this.container.innerHeight());
		},

		_initValues: function(){
			this.values(this.options.defaultValues.min, this.options.defaultValues.max);
		},

		_setOption: function(key, value) {
			var option = this.options;
			
			if (key === "defaultValues")
			{
				if ((typeof value.min !== "undefined") && (typeof value.max !== "undefined") && parseFloat(value.min) === value.min && parseFloat(value.max) === value.max)
				{
					this.options.defaultValues = value;
				}
			}else if (key === "wheelMode" && (value === "zoom" || value === "scroll" || value===null)){
				this.options.wheelMode = value;
			}else if (key === "wheelSpeed" && !isNaN(parseFloat(value)) && Math.abs(parseFloat(value)) <= 100){
				this.options.wheelSpeed = parseFloat(value);
			}else if (key === "arrows" && (value === true || value === false) && value !== this.options.arrows){
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
			}else if (key === "valueLabels" && (value === "hide" || value === "show" || value === "change")){
				this.options.valueLabels = value;

				if (value !== "hide"){
					this._createLabels();
				}else{
					this._destroyLabels();
				}
			}else if (key === "formatter" && value !== null && typeof value === "function"){
				this.options.formatter = value;
				this._position();
			}else if (key === "bounds" && typeof value.min !== "undefined" && typeof value.max !== "undefined")
			{
				this.bounds(value.min, value.max);
			}else if (key === "range"){
				if (value === false){
					option.range = {min: false, max: false};
					return;
				}
				
				var newVal = value || {};
				newVal.min = (parseFloat(newVal.min) === newVal.min || newVal.min === false ? newVal.min : option.range.min);
				newVal.max = (parseFloat(newVal.max) === newVal.max || newVal.max === false ? newVal.max : option.range.max);
				
				option.range = newVal;
				this._initWidth();
				this._position();
			}
		},

		_getPosition: function(value, handle){
			return this._getLeftPosition(value, handle) + (handle === this.rightHandle ? handle.outerWidth(true) : 0);
		},
		
		_getLeftPosition: function(value, handle){
			return (value - this.options.bounds.min) * (this.container.innerWidth() - handle.outerWidth(true)) / (this.options.bounds.max - this.options.bounds.min);
		},

		_getValue: function(position, handle){
			if (handle === this.rightHandle){	
				position = position - handle.outerWidth();
			}
			
			return position * (this.options.bounds.max - this.options.bounds.min) / (this.container.innerWidth() - handle.outerWidth(true)) + this.options.bounds.min;
		},

		_privateValues: function(min, max){
			this._setValues(min, max);
			this._position();

			return this._values;
		},

		_trigger: function(eventName){
			this.element.trigger(eventName, {
					label: this.element,
					values: this.values()
			  });
		},

		_position: function(){
			var leftPosition = this._getPosition(this._values.min, this.leftHandle),
				rightPosition = this._getPosition(this._values.max, this.rightHandle);

			this._positionHandles();
			this.bar
				.css("left", leftPosition)
				.css("width", rightPosition- leftPosition + this.bar.width() - this.bar.outerWidth(true));
		},

		_positionHandles: function(){
			var left = this._getPosition(this._values.min, this.leftHandle),
				right = this._getPosition(this._values.max, this.rightHandle) - this.rightHandle.outerWidth(true),
				leftBounds = {min : this.options.bounds.min, max: this.options.bounds.max},
				rightBounds = {min : this.options.bounds.min, max: this.options.bounds.max};
				
			this.leftHandle.css("left", left);
			this.rightHandle.css("left", right);
			
			// Set min and max position according to range constraints
			if (this.options.range.min !== false){
				leftBounds.max = Math.max(this._values.max - this.options.range.min, this.options.bounds.min);
				rightBounds.min = Math.min(this._values.min + this.options.range.min, this.options.bounds.max);
			}
			
			if(this.options.range.max !== false){
				leftBounds.min = Math.max(this._values.max - this.options.range.max, this.options.bounds.min);
				rightBounds.max = Math.min(this._values.min + this.options.range.max, this.options.bounds.max);
			}

			left = Math.round(this._getLeftPosition(leftBounds.min, this.leftHandle));
			this.leftContainment.css("margin-left", left)
				.css("width", Math.round(this._getLeftPosition(leftBounds.max, this.leftHandle) + this.leftHandle.outerWidth(true)) - left);

			left = Math.round(this._getLeftPosition(rightBounds.min, this.rightHandle));
			this.rightContainment.css("margin-left", left)
				.css("width", Math.round(this._getLeftPosition(rightBounds.max, this.rightHandle) + this.rightHandle.outerWidth(true)) - left);
			this._positionLabels();
		},

		_barMoved: function(event, ui){
			var left = ui.position.left,
				right = left + this.bar.outerWidth(true);

			this._setValues(this._getValue(left, this.leftHandle), this._getValue(right, this.rightHandle));
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
			var min = this._values.min,
				max = this._values.max;

			if (ui.helper[0] === this.leftHandle[0]){
					min = this._getValue(ui.position.left, this.leftHandle);
			}else if (ui.helper[0] === this.rightHandle[0])
			{
				max = this._getValue(ui.position.left + ui.helper.outerWidth(true), this.rightHandle);
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
				this._showLabels();
			}
		},

		_prepareFiringChanged: function(){
			this.lastWheel = Math.random();
			var last = this.lastWheel;
			setTimeout($.proxy(function(){this._fireChanged(last);}, this), 200);
		},

		_fireChanged: function(last){
			if (this.lastWheel === last && !this.bar.hasClass("ui-draggable-dragging") && !this.leftHandle.hasClass("ui-draggable-dragging") && !this.rightHandle.hasClass("ui-draggable-dragging")){
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

				this._hideLabels();
			}
		},

		_setValuesHandles: function(min, max){
			this._setValues(min, max);
			this._positionHandles();
		},

		_setValues: function(min, max){
			var oldValues = this._values,
				difference = Math.abs(max-min);

			if (difference >= this.options.bounds.max - this.options.bounds.min){
				this._values.min = this.options.bounds.min;
				this._values.max = this.options.bounds.max;
			}else{
				var values = {min: Math.min(max, min), max:Math.max(min, max)};

				if (values.min < this.options.bounds.min){
					values.min = this.options.bounds.min;
					values.max = values.min + difference;
				}else if (values.max > this.options.bounds.max){
					values.max = this.options.bounds.max;
					values.min = values.max - difference;
				}

				this._values = values;
			}

			this._changing(oldValues.min !== this._values.min, oldValues.max !== this._values.max);
			this._prepareFiringChanged();
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
			if (last === this.lastScroll){
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
			if (this.options.wheelMode === "zoom"){
				this.zoomIn(-deltaY);

				return false;
			}
		},

		_wheelOnContainer: function(event, delta, deltaX, deltaY){
			if (this.options.wheelMode === "scroll"){
				this.scrollRight(-deltaY);

				return false;
			}
		},

		/*
		 * Value labels
		 */
		_createLabel: function(label, classes){
			if (label === null){
				label = $("<div class='ui-rangeSlider-label'/>")
					.addClass(classes)
					.css("position", "absolute");
				this.element.append(label);

				this._positionLabels();
			}

			return label;
		},

		_destroyLabel: function(label){
			if (label !== null){
				label.remove();
				label = null;
			}

			return label;
		},

		_createLabels: function(){
			this.labels.left = this._createLabel(this.labels.left, "ui-rangeSlider-leftLabel");
			this.labels.right = this._createLabel(this.labels.right, "ui-rangeSlider-rightLabel");

			if (this.options.valueLabels === "change"){
				this.labels.left.css("display", "none");
				this.labels.right.css("display", "none");
				this.labels.leftDisplayed = false;
				this.labels.rightDisplayed = false;
			}else{
				this.labels.leftDisplayed = true;
				this.labels.rightDisplayed = true;
				this.labels.left.css("display", "block");
				this.labels.right.css("display", "block");

				this._position();
			}
		},

		_destroyLabels: function(){
			this.labels.left = this._destroyLabel(this.labels.left);
			this.labels.right = this._destroyLabel(this.labels.right);
		},

		_positionLabel: function(label, position){
			var topPos = this.leftHandle.offset().top - label.outerHeight(true),
				parent = label.offsetParent(),
				leftPos = position - parent.offset().left;

			topPos = topPos - parent.offset().top;

			label
				.css("left", leftPos)
				.css("top", topPos);
		},

		_positionLabels: function(){
			if (this.labels.left !== null && this.labels.right !== null){
				this.labels.left.text(this._format(this._values.min));
				this.labels.right.text(this._format(this._values.max));

				var minSize = this.labels.leftDisplayed ? this.labels.left.outerWidth(true) : 0,
					maxSize = this.labels.rightDisplayed ? this.labels.right.outerWidth(true) : 0,
					leftBound = 0,
					rightBound = $(window).width() - maxSize,
					minLeft = Math.max(leftBound, this.leftHandle.offset().left + this.leftHandle.outerWidth(true) / 2 - minSize / 2),
					maxLeft = Math.min(rightBound, this.rightHandle.offset().left + this.rightHandle.outerWidth(true) / 2 - maxSize / 2);

				// Need to find a better position
				if (minLeft + minSize >= maxLeft){
					var diff =  minLeft + minSize - maxLeft;
					minLeft = Math.max(leftBound, minLeft - diff / 2);
					maxLeft = Math.min(rightBound, minLeft + minSize);
					minLeft = Math.max(leftBound, maxLeft - minSize);
				}

				if (this.labels.leftDisplayed) this._positionLabel(this.labels.left, minLeft);
				if (this.labels.rightDisplayed) this._positionLabel(this.labels.right, maxLeft);
			}
		},

		_format: function(value){
			if (typeof this.options.formatter !== "undefined" && this.options.formatter !== null){
				return this.options.formatter(value);
			}else{
				return this._defaultFormat(value);
			}
		},

		_defaultFormat: function(value){
			return Math.round(value);
		},

		_showLabels: function(){
			if (this.options.valueLabels === "change" && !this.privateChange){
				if (this.changing.min && !this.labels.leftDisplayed){
					this.labels.left.stop(true, true).fadeIn(this.options.durationIn);
					this.labels.leftDisplayed = true;
				}

				if (this.changing.max && !this.labels.rightDisplayed){
					this.labels.rightDisplayed = true;
					this.labels.right.stop(true, true).fadeIn(this.options.durationIn);
				}
			}
		},

		_hideLabels: function(){
			if (this.options.valueLabels === "change" && this.labels.left !== null && this.labels.right !== null){
				this.labels.leftDisplayed = false;
				this.labels.rightDisplayed = false;
				this.labels.left.stop(true, true).delay(this.options.delayOut).fadeOut(this.options.durationOut);
				this.labels.right.stop(true, true).delay(this.options.delayOut).fadeOut(this.options.durationOut);
			}
		},

		/*
		 * Public methods
		 */
		values: function(min, max){
			if (typeof min !== "undefined" && typeof max !== "undefined")
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
		
		bounds: function(min, max){
			if ((typeof min !== "undefined") && (typeof max !== "undefined") 
				&& parseFloat(min) === min && parseFloat(max) === max && min < max){
				this.options.bounds = {min: min, max: max};
				this.values(this._values.min, this._values.max);
			}
			
			return this.options.bounds;
		},

		zoomIn: function(quantity){
			var diff = this._values.max - this._values.min,
				min = this._values.min + quantity * this.options.wheelSpeed * diff / 200,
				max = this._values.max - quantity * this.options.wheelSpeed * diff / 200;

			this._privateValues(min, max);
		},

		zoomOut: function(quantity){
			this.zoomIn(-quantity);
		},

		scrollLeft: function(quantity){
			if (typeof quantity === 'undefined')
				quantity = 1;
			this.scrollRight(-quantity);
		},

		scrollRight: function(quantity){
			if (typeof quantity === "undefined")
				quantity = 1;

			var diff = this._values.max - this._values.min,
				min = this._values.min + quantity * this.options.wheelSpeed * diff / 100,
				max = this._values.max + quantity * this.options.wheelSpeed * diff / 100;

			this._privateValues(min, max);
		},
		
		/**
		 * Resize
		 */
		resize: function(){
			this._initWidth();
			this._position();
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
			this._destroyLabels();
			delete this.options;

			$.Widget.prototype.destroy.apply(this, arguments);
		}
	});
})(jQuery);