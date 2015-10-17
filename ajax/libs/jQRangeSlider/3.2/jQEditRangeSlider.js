/**!
 * @license jQRangeSlider
 * A javascript slider selector that supports dates
 *
 * Copyright (C) Guillaume Gautreau 2012
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

 (function ($, undefined) {
	"use strict";
	
	$.widget("ui.editRangeSlider", $.ui.rangeSlider, {
		options:{
			type: "text",
			round: 1
		},

		_inputs: [],

		_create: function(){
			$.ui.rangeSlider.prototype._create.apply(this);

			this.element.addClass("ui-editRangeSlider");
		},

		destroy: function(){
			this.element.removeClass("ui-editRangeSlider");

			$.ui.rangeSlider.prototype.destroy.apply(this);
		},

		_setOption: function(key, value){
			if (key === "type" && this._isValidInputType(value)){
				this.options.type = value;

				if (this.labels != null){
					this._destroyLabels();
					this._createLabels();
				}
			} else if (key === "round" && this._isValidRoundValue(value)){
				this.options.round = value;
				this._fillInLabels();
			}

			$.ui.rangeSlider.prototype._setOption.apply(this, [key, value]);
		},

		_isValidInputType: function(type){
			return (type =="text" || type == "number") && type != this.options.type;
		},

		_isValidRoundValue: function(value){
			return (typeof value === "number" && value > 0 )
				|| value === false;
		},

		_createLabel: function(label, whichOne){
			if (label == null){
				label = $.ui.rangeSlider.prototype._createLabel.apply(this, [label, whichOne]);

				var input = $("<input type='" + this.options.type + "' class='ui-editRangeSlider-inputValue' />")
					.attr("name", this._getInputName(whichOne));

				this._inputs.push(input);

				if (this.options.type === "number"){
					input.click($.proxy(this._onChange, this));
				}

				input.keyup($.proxy(this._onKeyUp, this));
				input.blur($.proxy(this._onChange, this));

				label.append(input);
			}

			return label;
		},
		
		_getInputName: function(whichOne){
			return (this.element.attr("id") || "") + whichOne;
		},

		_onChange: function(){
			if (this._inputs.length == 2){
				var first = this._returnCheckedValue(this._inputs[0].val()),
					second = this._returnCheckedValue(this._inputs[1].val()),
					values;

				if (first !== false && second !== false){
					values = this._returnCheckedValues(first, second);

					this.values(values.min, values.max);
				}
			}
		},

		_returnCheckedValue: function(val){
			var floatValue = parseFloat(val);

			if (isNaN(floatValue) || floatValue.toString() != val){
				return false;
			}

			floatValue = Math.min(this.options.bounds.max, floatValue);
			floatValue = Math.max(this.options.bounds.min, floatValue);

			return floatValue;
		},

		_returnCheckedValues: function(first, second){
			var values = {min: Math.min(first, second), max: Math.max(first, second)},
				difference = values.max - values.min,
				current = this.values(),
				moveMax = false;

			if (Math.abs(values.min - current.min) < Math.abs(values.max - current.max)){
				moveMax = true;
			}	

			if (this.options.range.min !== false && this.options.range.min > difference){
				if (moveMax){
					values.max = values.min + this.options.range.min;
				}else{
					values.min = values.max - this.options.range.min;
				}
			} else if (this.options.range.max !== false && this.options.range.max < difference){
				if (moveMax){
					values.max = values.min + this.options.range.max;
				}else{
					values.min = values.max - this.options.range.max;
				}
			}			

			return values;
		},

		_onKeyUp: function(e){
			if (e.which == 13){
				this._onChange(e);
				return false;
			}
		},

		_destroyLabels: function(){
			this._inputs = [];
			$.ui.rangeSlider.prototype._destroyLabels.apply(this);
		},

		_fillInLabel: function(label, value){
			label.find("input").val(this._format(value));
		},

		_defaultFormat: function(value){
			if (this.options.round !== false){
				return Math.round(value / this.options.round) * this.options.round;
			}

			return value;
		}
	});

})(jQuery);