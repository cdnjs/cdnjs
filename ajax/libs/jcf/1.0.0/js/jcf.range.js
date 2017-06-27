/*!
 * JavaScript Custom Forms : Range Module
 *
 * Copyright 2014 PSD2HTML (http://psd2html.com)
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.0.3
 */
;(function($) {
	'use strict';

	jcf.addModule({
		name: 'Range',
		selector: 'input[type="range"]',
		options: {
			realElementClass: 'jcf-real-element',
			fakeStructure: '<span class="jcf-range"><span class="jcf-range-wrapper"><span class="jcf-range-track"><span class="jcf-range-handle"></span></span></span></span>',
			dataListMark: '<span class="jcf-range-mark"></span>',
			dragValueDisplay: '<span class="jcf-drag-value"></span>',
			handleSelector: '.jcf-range-handle',
			trackSelector: '.jcf-range-track',
			verticalClass: 'jcf-vertical',
			orientation: 'horizontal',
			dragHandleCenter: true,
			snapToMarks: true,
			snapRadius: 5
		},
		matchElement: function(element) {
			return element.is(this.selector);
		},
		init: function() {
			this.initStructure();
			this.attachEvents();
			this.refresh();
		},
		initStructure: function() {
			this.page = $('html');
			this.realElement = $(this.options.element).addClass(this.options.hiddenClass);
			this.fakeElement = $(this.options.fakeStructure).insertBefore(this.realElement).prepend(this.realElement);
			this.track = this.fakeElement.find(this.options.trackSelector);
			this.handle = this.fakeElement.find(this.options.handleSelector);

			// handle orientation
			this.isVertical = (this.options.orientation === 'vertical');
			this.directionProperty = this.isVertical ? 'top' : 'left';
			this.offsetProperty = this.isVertical ? 'bottom' : 'left';
			this.eventProperty = this.isVertical ? 'pageY' : 'pageX';
			this.sizeMethod = this.isVertical ? 'innerHeight' : 'innerWidth';
			this.fakeElement.css('touchAction', this.isVertical ? 'pan-x' : 'pan-y');
			if (this.isVertical) {
				this.fakeElement.addClass(this.options.verticalClass);
			}

			// set initial values
			this.minValue = parseFloat(this.realElement.attr('min'));
			this.maxValue = parseFloat(this.realElement.attr('max'));
			this.stepValue = parseFloat(this.realElement.attr('step')) || 1;

			// check attribute values
			this.minValue = isNaN(this.minValue) ? 0 : this.minValue;
			this.maxValue = isNaN(this.maxValue) ? 100 : this.maxValue;

			// handle range
			if (this.stepValue !== 1) {
				this.maxValue -= (this.maxValue - this.minValue) % this.stepValue;
			}
			this.stepsCount = (this.maxValue - this.minValue) / this.stepValue + 1;
			this.createDataList();
		},
		attachEvents: function() {
			this.realElement.on({
				focus: this.onFocus
			});
			this.handle.on('jcf-pointerdown', this.onPress);
		},
		createDataList: function() {
			var self = this,
				dataValues = [],
				dataListId = this.realElement.attr('list');

			if (dataListId) {
				$('#' + dataListId).find('option').each(function() {
					var itemValue = parseFloat(this.value || this.innerHTML),
						mark, markOffset;

					if (!isNaN(itemValue)) {
						markOffset = self.valueToOffset(itemValue);
						dataValues.push({
							value: itemValue,
							offset: markOffset
						});
						mark = $(self.options.dataListMark).text(itemValue).attr({
							'data-mark-value': itemValue
						}).css(self.offsetProperty, markOffset + '%').appendTo(self.track);
					}
				});
				if (dataValues.length) {
					self.dataValues = dataValues;
				}
			}
		},
		onPress: function(e) {
			var trackSize, trackOffset, innerOffset;

			e.preventDefault();
			if (!this.realElement.is(':disabled')) {
				trackSize = this.track[this.sizeMethod]();
				trackOffset = this.track.offset()[this.directionProperty];
				innerOffset = this.options.dragHandleCenter ? this.handle[this.sizeMethod]() / 2 : e[this.eventProperty] - this.handle.offset()[this.directionProperty];

				this.dragData = {
					trackSize: trackSize,
					innerOffset: innerOffset,
					trackOffset: trackOffset,
					min: trackOffset,
					max: trackOffset + trackSize
				};
				this.page.on({
					'jcf-pointermove': this.onMove,
					'jcf-pointerup': this.onRelease
				});

				if (e.pointerType === 'mouse') {
					this.realElement.focus();
				}
			}
		},
		onMove: function(e) {
			var self = this,
				newOffset, dragPercent, stepIndex, valuePercent;

			// calculate offset
			if (this.isVertical) {
				newOffset = this.dragData.max + (this.dragData.min - e[this.eventProperty]) - this.dragData.innerOffset;
			} else {
				newOffset = e[this.eventProperty] - this.dragData.innerOffset;
			}

			// fit in range
			if (newOffset < this.dragData.min) {
				newOffset = this.dragData.min;
			} else if (newOffset > this.dragData.max) {
				newOffset = this.dragData.max;
			}

			e.preventDefault();
			if (this.options.snapToMarks && this.dataValues) {
				// snap handle to marks
				var dragOffset = newOffset - this.dragData.trackOffset;
				dragPercent = (newOffset - this.dragData.trackOffset) / this.dragData.trackSize * 100;

				$.each(this.dataValues, function(index, item) {
					var markOffset = item.offset / 100 * self.dragData.trackSize,
						markMin = markOffset - self.options.snapRadius,
						markMax = markOffset + self.options.snapRadius;

					if (dragOffset >= markMin && dragOffset <= markMax) {
						dragPercent = item.offset;
						return false;
					}
				});
			} else {
				// snap handle to steps
				dragPercent = (newOffset - this.dragData.trackOffset) / this.dragData.trackSize * 100;
			}
			stepIndex = Math.round(dragPercent * this.stepsCount / 100);
			valuePercent = stepIndex * (100 / this.stepsCount);

			if (this.dragData.stepIndex !== stepIndex) {
				this.dragData.stepIndex = stepIndex;
				this.dragData.offset = valuePercent;
				this.handle.css(this.offsetProperty, this.dragData.offset + '%');
			}
		},
		onRelease: function() {
			var newValue;
			if (typeof this.dragData.offset === 'number') {
				newValue = this.stepIndexToValue(this.dragData.stepIndex);
				this.realElement.val(newValue).trigger('change');
			}

			this.page.off({
				'jcf-pointermove': this.onMove,
				'jcf-pointerup': this.onRelease
			});
			delete this.dragData;
		},
		onFocus: function() {
			this.fakeElement.addClass(this.options.focusClass);
			this.realElement.on({
				blur: this.onBlur,
				keydown: this.onKeyPress
			});
		},
		onBlur: function() {
			this.fakeElement.removeClass(this.options.focusClass);
			this.realElement.off({
				blur: this.onBlur,
				keydown: this.onKeyPress
			});
		},
		onKeyPress: function(e) {
			var incValue = (e.which === 38 || e.which === 39),
				decValue = (e.which === 37 || e.which === 40);

			if (decValue || incValue) {
				e.preventDefault();
				this.step(incValue ? this.stepValue : -this.stepValue);
			}
		},
		step: function(changeValue) {
			var originalValue = parseFloat(this.realElement.val()),
				newValue = originalValue;

			if (isNaN(originalValue)) {
				newValue = 0;
			}

			newValue += changeValue;

			if (newValue > this.maxValue) {
				newValue = this.maxValue;
			} else if (newValue < this.minValue) {
				newValue = this.minValue;
			}

			if (newValue !== originalValue) {
				this.realElement.val(newValue).trigger('change');
				this.setSliderValue(newValue);
			}
		},
		stepIndexToValue: function(stepIndex) {
			return this.minValue + this.stepValue * stepIndex;
		},
		valueToOffset: function(value) {
			var range = this.maxValue - this.minValue,
				percent = (value - this.minValue) / range;

			return percent * 100;
		},
		setSliderValue: function(value) {
			// set handle position accordion according to value
			this.handle.css(this.offsetProperty, this.valueToOffset(value) + '%');
		},
		refresh: function() {
			// handle disabled state
			var isDisabled = this.realElement.is(':disabled');
			this.fakeElement.toggleClass(this.options.disabledClass, isDisabled);

			// refresh handle position according to current value
			var realValue = parseFloat(this.realElement.val()) || 0;
			this.setSliderValue(realValue);
		},
		destroy: function() {
			this.realElement.removeClass(this.options.hiddenClass).insertBefore(this.fakeElement);
			this.fakeElement.remove();

			this.realElement.off({
				keydown: this.onKeyPress,
				focus: this.onFocus,
				blur: this.onBlur
			});
		}
	});

}(jQuery));
