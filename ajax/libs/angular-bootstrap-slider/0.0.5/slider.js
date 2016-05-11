angular.module('ui.bootstrap-slider', [])
	.directive('slider', ['$parse', '$timeout', function ($parse, $timeout) {
		return {
			restrict: 'AE',
			replace: true,
			template: '<input type="text" />',
			link: function ($scope, element, attrs) {
				var model = $parse(attrs.ngModel);

				$.fn.slider.Constructor.prototype.disable = function () {
					this.picker.off();
				}
				$.fn.slider.Constructor.prototype.enable = function () {
					if (this.touchCapable) {
						// Touch: Bind touch events:
						this.picker.on({
							touchstart: $.proxy(this.mousedown, this)
						});
					} else {
						this.picker.on({
							mousedown: $.proxy(this.mousedown, this)
						});
					}
				}

				var options = {};
				if(attrs.sliderId) options.id = attrs.sliderId;
				if(attrs.min) options.min = parseFloat(attrs.min);
				if(attrs.max) options.max = parseFloat(attrs.max);
				if(attrs.step) options.step = parseFloat(attrs.step);
				if(attrs.precision) options.precision = parseFloat(attrs.precision);
				if(attrs.orientation) options.orientation = attrs.orientation;
				if(attrs.value) {
					if (angular.isNumber(attrs.value) || angular.isArray(attrs.value)) {
						options.value = attrs.value;
					} else if (angular.isString(attrs.value)) {
						if (attrs.value.indexOf("[") === 0) {
							options.value = angular.fromJson(attrs.value);
						} else {
							options.value = parseFloat(attrs.value);
						}
					}

				}
				if(attrs.range) options.range = attrs.range === 'true';
				if(attrs.selection) options.selection = attrs.selection;
				if(attrs.tooltip) options.tooltip = attrs.tooltip;
				if(attrs.tooltipSeparator) options.tooltip_separator = attrs.tooltipSeparator;
				if(attrs.tooltipSplit) options.tooltip_split = attrs.tooltipSplit === 'true';
				if(attrs.handle) options.handle = attrs.handle;
				if(attrs.reversed) options.reversed = attrs.reversed === 'true';
				if(attrs.enabled) options.enabled = attrs.enabled === 'true';
				if(attrs.naturalArrowKeys) options.natural_arrow_keys = attrs.naturalArrowKeys === 'true';

				if (options.range && !options.value) {
					options.value = [0,0]; // This is needed, because of value defined at $.fn.slider.defaults - default value 5 prevents creating range slider
				}

				var slider = $(element[0]).slider(options);
        var updateEvent = attrs.updateEvent || 'slide';

				slider.on(updateEvent, function(ev) {
					model.assign($scope, ev.value);
					$timeout(function() {
						$scope.$apply();
					});
				});

				$scope.$watch(attrs.ngModel, function(value) {
					if(value) {
						slider.slider('setValue', value, false);
					}
				});

				$scope.$watch(attrs.ngDisabled, function (value) {
					if (value) {
						slider.slider('disable');
					} else {
						slider.slider('enable');
					}
				});
			}
		};
	}])
;
