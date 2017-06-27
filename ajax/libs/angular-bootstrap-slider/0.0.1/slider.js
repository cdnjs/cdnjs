angular.module('ui.bootstrap-slider', [])
	.directive('slider', function ($parse, $timeout) {
		return {
			restrict: 'AE',
			replace: true,
			template: '<input type="text" />',
			link: function ($scope, element, attrs) {
				var model = $parse(attrs.ngModel);

				var options = {};
				if(attrs.sliderId) options.id = attrs.sliderId;
				if(attrs.min) options.min = parseFloat(attrs.min);
				if(attrs.max) options.max = parseFloat(attrs.max);
				if(attrs.step) options.step = parseFloat(attrs.step);
				if(attrs.precision) options.precision = parseFloat(attrs.precision);
				if(attrs.orientation) options.orientation = attrs.orientation;
				if(attrs.value) options.value = parseFloat(attrs.value);
				if(attrs.range) options.range = attrs.range === 'true';
				if(attrs.selection) options.selection = attrs.selection;
				if(attrs.tooltip) options.tooltip = attrs.tooltip;
				if(attrs.tooltipSeparator) options.tooltip_separator = attrs.tooltipSeparator;
				if(attrs.tooltipSplit) options.tooltip_split = attrs.tooltipSplit === 'true';
				if(attrs.handle) options.handle = attrs.handle;
				if(attrs.reversed) options.reversed = attrs.reversed === 'true';
				if(attrs.enabled) options.enabled = attrs.enabled === 'true';
				if(attrs.naturalArrowKeys) options.natural_arrow_keys = attrs.naturalArrowKeys === 'true';

				var slider = $(element[0]).slider(options);

				slider.on('slide', function(ev) {
					model.assign($scope, ev.value);
					$timeout(function() {
						$scope.$apply();
					});
				});

				$scope.$watch(attrs.ngModel, function(value) {
					if(value) 
						slider.slider('setValue', value, false);
				});
			}
		}
	})
;