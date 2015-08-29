/* jQRangeSlider
 * A javascript slider selector that supports dates
 * 
 * Copyright (C) Guillaume Gautreau 2010
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
			arrows: true
		},
		
		_values: {min:20, max:50},
		
		// Created elements
		bar: null,
		leftHandle: null,
		rightHandle: null,
		innerBar: null,
		container: null,
		leftArrow:null,
		rightArrow:null,
		
		// Scroll management
		lastWheel : 0,
		lastScroll: 0,
		scrollCount: 0,
		
		_create: function(){
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
			
			this.bar = $("<div class='ui-rangeSlider-Bar' />")
				.draggable({axis:"x", containment: "parent",
					drag: $.proxy(this._barMoved, this), 
					stop: $.proxy(this._barStop, this),
					containment: this.container})
				.css("position", "absolute")
				.bind("mousewheel", $.proxy(this._wheelOnBar, this));
			
			this.leftArrow = $("<div class='ui-rangeSlider-arrow ui-rangeSlider-leftArrow' />")
				.css("position", "absolute")
				.css("left", 0)
				.bind("mousedown", $.proxy(this._startScrollLeft, this))
				.bind("mouseup", $.proxy(this._stopScroll, this));
			
			this.rightArrow = $("<div class='ui-rangeSlider-arrow ui-rangeSlider-rightArrow' />")
				.css("position", "absolute")
				.css("right", 0)
				.bind("mousedown", $.proxy(this._startScrollRight, this))
				.bind("mouseup", $.proxy(this._stopScroll, this));
			
			this.container
				.append(this.leftHandle)
				.append(this.rightHandle)
				.append(this.innerBar)
				.append(this.bar);
			
			this.element
				.append(this.container)
				.append(this.leftArrow)
				.append(this.rightArrow)
				.addClass("ui-rangeSlider")
				.bind("mousewheel", $.proxy(this._wheelOnContainer, this));
			
			if (this.element.css("position") != "absolute"){
				this.element.css("position", "relative");
			}
			
			if (!this.options.arrows){
				this.leftArrow.css("display", "none");
				this.rightArrow.css("display", "none");
				this.element.addClass("ui-rangeSlider-noArrow");
			}else{
				this.element.addClass("ui-rangeSlider-arrow");
			}
			
			// Seems that all the elements are not ready, outerWidth does not return the good value
			setTimeout($.proxy(this._initWidth, this), 1);
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
					this.values(value.min, value.max);
				}
			}else if (key == "wheelMode" && (value == "zoom" || value == "scroll" || value===null)){
				this.options.wheelMode = value;
			}else if (key == "wheelSpeed" && parseFloat(value) !== NaN && Math.abs(parseFloat(value)) <= 100){
				this.options.wheelSpeed = parseFloat(value);
			}else if (key == "arrows" && (value === true || value === false) && value != this.options.arrows){
				if (value){
					this.element
						.removeClass("ui-rangeSlider-noArrow")
						.addClass("ui-rangeSlider-arrow");
					this.leftArrow.css("display", "block");
					this.rightArrow.css("display", "block");
				}else{
					this.element
						.addClass("ui-rangeSlider-noArrow")
						.removeClass("ui-rangeSlider-arrow");
					this.leftArrow.css("display", "none");
					this.rightArrow.css("display", "none");
				}
				
				this.options.arrows = value;
				this._initWidth();
				this._position();
			}
		},
		
		_getPosition: function(value){
			return (value - this.options.bounds.min) * (this.container.innerWidth() - 1) / (this.options.bounds.max - this.options.bounds.min);
		},
		
		_getValue: function(position){
			return position * (this.options.bounds.max - this.options.bounds.min) / (this.container.innerWidth() - 1) + this.options.bounds.min;
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
			this.leftHandle.css("left", this._getPosition(this._values.min));
			this.rightHandle.css("left", this._getPosition(this._values.max) - this.rightHandle.outerWidth(true) + 1);
		},
		
		_barMoved: function(event, ui){
			var left = ui.position.left;
			var right = left + this.bar.outerWidth(true) - 1;
			
			this._setValues(this._getValue(left), this._getValue(right));
			this._positionHandles();
		},
		
		_barStop: function(event, ui){
			this._position();
			this._trigger("valuesChanged");
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
				
			this.values(min, max);
		},
		
		_handleStop: function(event, ui){
			this._position();
		},
		
		_prepareFiringChanged: function(){
			this.lastWheel = Math.random();
			var last = this.lastWheel;
			setTimeout($.proxy(function(){this._fireChanged(last);}, this), 200);
		},
		
		_fireChanged: function(last){
			if (this.lastWheel == last){
				this._trigger("valuesChanged");
			}
		},
		
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
		
		_setValuesHandles: function(min, max){	
			this._setValues(min, max);
			this._positionHandles();
		},
	
		_setValues: function(min, max){	
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
			
			this._trigger("valuesChanging");
			this._prepareFiringChanged();
		},
		
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
		
		
		values: function(min, max){
			if (typeof min != "undefined" 
				&& typeof max != "undefined")
			{
				this._setValues(min, max);
				this._position();
			}
			
			return this._values;
		},
		
		zoomIn: function(quantity){
			var diff = this._values.max - this._values.min;
					
			min = this._values.min + quantity * this.options.wheelSpeed * diff / 200;
			max = this._values.max - quantity * this.options.wheelSpeed * diff / 200;
			
			this.values(min, max);
		},
		
		zoomOut: function(quantity){
			this.zoom(-quantity);
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
			
			this.values(min, max);
		},
		
		destroy: function(){
			this.bar.detach();
			this.leftHandle.detach();
			this.rightHandle.detach();
			this.innerBar.detach();
			this.container.detach();
			this.leftArrow.detach();
			this.rightArrow.detach();
			this.element.removeClass("ui-rangeSlider");
		}
	});
})(jQuery);