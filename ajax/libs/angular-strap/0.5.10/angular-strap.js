/**
 * AngularStrap - Twitter Bootstrap directives for AngularJS
 * @version v0.5.10 - 2013-01-07
 * @link http://angular-strap.github.com
 * @author Olivier Louvignes
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */


angular.module('$strap.config', []).value('$strap.config', {});
angular.module('$strap.filters', ['$strap.config']);
angular.module('$strap.directives', ['$strap.config']);
angular.module('$strap', ['$strap.filters', '$strap.directives', '$strap.config']);


angular.module('$strap.directives')

.directive('bsButton', ['$parse', function($parse) {
	'use strict';

	return {
		restrict: 'A',
		require: 'ngModel',
		link: function postLink(scope, element, attr, ctrl) {

			var getter = $parse(attr.ngModel),
				setter = getter.assign;

			// Disable bootstrap embedded button toggling
			if(element.attr('data-toggle') === 'button') {
				element.removeAttr('data-toggle');
			}
			if(element.parent().attr('data-toggle') === 'buttons-checkbox') {
				element.parent().removeAttr('data-toggle');
			}

			// Watch model for changes instead
			scope.$watch(attr.ngModel, function(newValue, oldValue) {
				if(!newValue) {
					element.removeClass('active');
				} else {
					element.addClass('active');
				}
			});

			// Click handling
			element.on('click', function(ev) {
				scope.$apply(function() {
					setter(scope, !getter(scope));
				});
			});

			// Initial state
			if(getter(scope)) {
				element.addClass('active');
			}

		}
	};

}]);


angular.module('$strap.directives')

.directive('bsButtonSelect', ['$parse', '$timeout', function($parse, $timeout) {
	'use strict';

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function postLink(scope, element, attr, ctrl) {

			var getter = $parse(attr.bsButtonSelect),
				setter = getter.assign;

			// Bind ngModelController
			if(ctrl) {
				element.text(scope.$eval(attr.ngModel));
				// Watch model for changes
				scope.$watch(attr.ngModel, function(newValue, oldValue) {
					element.text(newValue);
				});
			}


			// Click handling
			var values, value, index, newValue;
			element.on('click', function onClick() {
				values = getter(scope);
				value = ctrl ? scope.$eval(attr.ngModel) : element.text();
				index = values.indexOf(value);
				newValue = index > values.length - 2 ? values[0] : values[index + 1];

				scope.$apply(function() {
					element.text(newValue);
					if(ctrl) {
						ctrl.$setViewValue(newValue);
					}
				});
			});
		}
	};
}]);

// https://github.com/eternicode/bootstrap-datepicker

angular.module('$strap.directives')

.directive('bsDatepicker', ['$timeout', function($timeout) {
	'use strict';

	var isTouch = 'ontouchstart' in window && !window.navigator.userAgent.match(/PhantomJS/i);

	var DATE_REGEXP_MAP = {
		'/'    : '[\\/]',
		'-'    : '[-]',
		'.'    : '[.]',
		'dd'   : '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
		'd'   : '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
		'mm'   : '(?:[0]?[1-9]|[1][012])',
		'm'   : '(?:[0]?[1-9]|[1][012])',
		'yyyy' : '(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])',
		'yy'   : '(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])'
	};

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function postLink(scope, element, attrs, controller) {
			//console.log('postLink', this, arguments); window.element = element;

			var regexpForDateFormat = function(dateFormat, options) {
				options || (options = {});
				var re = dateFormat, regexpMap = DATE_REGEXP_MAP;
				/*if(options.mask) {
					regexpMap['/'] = '';
					regexpMap['-'] = '';
				}*/
				angular.forEach(regexpMap, function(v, k) { re = re.split(k).join(v); });
				return new RegExp('^' + re + '$', ['i']);
			};

			var dateFormatRegexp = isTouch ? 'yyyy/mm/dd' : regexpForDateFormat(attrs.dateFormat || 'mm/dd/yyyy'/*, {mask: !!attrs.uiMask}*/);

			// Handle date validity according to dateFormat
			if(controller) {
				controller.$parsers.unshift(function(viewValue) {
					//console.warn('viewValue', viewValue, dateFormatRegexp,  dateFormatRegexp.test(viewValue));
					if (!viewValue || dateFormatRegexp.test(viewValue)) {
						controller.$setValidity('date', true);
						return viewValue;
					} else {
						controller.$setValidity('date', false);
						return undefined;
					}
				});
			}

			// Support add-on
			var component = element.next('[data-toggle="datepicker"]');
			if(component.length) {
				component.on('click', function() { isTouch ? element.trigger('focus') : element.datepicker('show'); });
			}

			// Use native interface for touch devices
			if(isTouch && element.prop('type') === 'text') {

				element.prop('type', 'date');
				element.on('change', function(ev) {
					scope.$apply(function () {
						controller.$setViewValue(element.val());
					});
				});

			} else {

				// If we have a controller (i.e. ngModelController) then wire it up
				if(controller) {
					element.on('changeDate', function(ev) {
						scope.$apply(function () {
							controller.$setViewValue(element.val());
						});
					});
				}

				// Popover GarbageCollection
				var $popover = element.closest('.popover');
				if($popover) {
					$popover.on('hide', function(e) {
						var datepicker = element.data('datepicker');
						if(datepicker) {
							datepicker.picker.remove();
							element.data('datepicker', null);
						}
					});
				}

				// Create datepicker
				element.attr('data-toggle', 'datepicker');
				element.datepicker({
					autoclose: true
				});

			}

		}

	};

}]);


angular.module('$strap.directives')

.directive('bsDropdown', ['$parse', '$compile', function($parse, $compile) {
  'use strict';

  var slice = Array.prototype.slice;

  var template = '' +
  '<ul class="dropdown-menu" role="menu" aria-labelledby="drop1">' +
    '<li ng-repeat="item in items" ng-class="{divider: !!item.divider, \'dropdown-submenu\': !!item.submenu && item.submenu.length}">' +
      '<a ng-hide="!!item.divider" tabindex="-1" ng-href="{{item.href}}" ng-click="{{item.click}}">{{item.text}}</a>' +
    '</li>' +
  '</ul>';

  var linkSubmenu = function(items, parent, scope) {
    var subitems, submenu, subscope;
    for (var i = 0, l = items.length; i < l; i++) {
      if(subitems = items[i].submenu) {
        subscope = scope.$new();
        subscope.items = subitems;
        submenu = $compile(template)(subscope);
        submenu = submenu.appendTo(parent.children('li:nth-child(' + (i+1) + ')'));
        asyncLinkSubmenu(subitems, submenu, subscope);
      }
    }
  };

  var asyncLinkSubmenu = function() {
    var args = slice.call(arguments);
    setTimeout(function() {
      linkSubmenu.apply(null, args);
    });
  };

  return {
    restrict: 'EA',
    scope: true,
    link: function postLink(scope, element, attr) {

      var getter = $parse(attr.bsDropdown);

      scope.items = getter(scope);
      var dropdown = $compile(template)(scope);
      asyncLinkSubmenu(scope.items, dropdown, scope);
      dropdown.insertAfter(element);

      element
        .addClass('dropdown-toggle')
        .attr('data-toggle', "dropdown");

    }
  };

}]);


angular.module('$strap.directives')

.directive('bsModal', ['$parse', '$compile', '$http', '$timeout', '$q', '$templateCache', function($parse, $compile, $http, $timeout, $q, $templateCache) {
	'use strict';

	return {
		restrict: 'A',
		scope: true,
		link: function postLink(scope, element, attr, ctrl) {

			var getter = $parse(attr.bsModal),
				setter = getter.assign,
				value = getter(scope);

			$q.when($templateCache.get(value) || $http.get(value, {cache: true})).then(function onSuccess(template) {

				// Handle response from $http promise
				if(angular.isObject(template)) {
					template = template.data;
				}

				// Provide scope display functions
				scope.dismiss = function() {
					$modal.modal('hide');
				};
				scope.show = function() {
					$modal.modal('show');
				};

				// Build modal object
				var id = getter(scope).replace(/\//g, '-').replace(/\./g, '-').replace('html', scope.$id);
				var $modal = $('<div></div>').attr('id', id).addClass('modal hide fade').html(template);
				$('body').append($modal);

				// Configure element
				element.attr('href', '#' + id).attr('data-toggle', 'modal');

				// Compile modal content
				$timeout(function(){
					$compile($modal)(scope);
				});

				// $modal.on('hidden', function() {
				// });

			});
		}
	};
}]);


angular.module('$strap.directives')

.directive('bsNavbar', ['$location', function($location) {
	'use strict';

	return {
		restrict: 'A',
		link: function postLink($scope, element, attrs, controller) {
			// Watch for the $location
			$scope.$watch(function() {
				return $location.path();
			}, function(newValue, oldValue) {

				element.find('li[data-match-route]').each(function(k, li) {
					var $li = angular.element(li),
						pattern = $li.data('match-route'),
						regexp = new RegExp('^' + pattern + '$', ["i"]);

					if(regexp.test(newValue)) {
						$li.addClass('active');
					} else {
						$li.removeClass('active');
					}

				});
			});
		}
	};
}]);


angular.module('$strap.directives')

.directive('bsPopover', ['$parse', '$compile', '$http', '$timeout', '$q', '$templateCache', function($parse, $compile, $http, $timeout, $q, $templateCache) {
	'use strict';

	// Hide popovers when pressing esc
	$("body").on("keyup", function(ev) {
		if(ev.keyCode === 27) {
			$(".popover.in").each(function() {
				var $this = $(this);
				$this.popover('hide');
			});
		}
	});

	return {
		restrict: 'A',
		scope: true,
		link: function postLink(scope, element, attr, ctrl) {

			var getter = $parse(attr.bsPopover),
				setter = getter.assign,
				value = getter(scope);

			$q.when($templateCache.get(value) || $http.get(value, {cache: true})).then(function onSuccess(template) {

				// Handle response from $http promise
				if(angular.isObject(template)) {
					template = template.data;
				}

				// Provide scope display functions
				scope.dismiss = function() {
					element.popover('hide');
				};
				scope.show = function() {
					element.popover('show');
				};

				// Handle `data-unique` attribute
				if(!!attr.unique) {
					element.on('show', function(ev) {
						// Hide any active popover except self
						$(".popover.in").each(function() {
							var $this = $(this),
								popover = $this.data('popover');
							if(popover && !popover.$element.is(element)) {
								$this.popover('hide');
							}
						});
					});
				}
				// Initialize popover
				element.popover({
					content: function() {
						$timeout(function() { // use async $apply

							var popover = element.data('popover'),
								$tip = popover.tip();

							$compile($tip)(scope);

							setTimeout(function() { // refresh position on nextTick
								popover.refresh();
							});

						});

						return template;
					},
					html: true
				});

				// Bootstrap override to provide events & tip() reference & refresh positions
				var popover = element.data('popover');
				popover.refresh = function() {
					var $tip = this.tip(), inside, pos, actualWidth, actualHeight, placement, tp;

					placement = typeof this.options.placement === 'function' ?
						this.options.placement.call(this, $tip[0], this.$element[0]) :
						this.options.placement;

					inside = /in/.test(placement);

					pos = this.getPosition(inside);

					actualWidth = $tip[0].offsetWidth;
					actualHeight = $tip[0].offsetHeight;

					switch (inside ? placement.split(' ')[1] : placement) {
						case 'bottom':
						tp = {top: pos.top + pos.height + 10, left: pos.left + pos.width / 2 - actualWidth / 2};
						break;
						case 'top':
						tp = {top: pos.top - actualHeight - 10, left: pos.left + pos.width / 2 - actualWidth / 2};
						break;
						case 'left':
						tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth - 10};
						break;
						case 'right':
						tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width + 10};
						break;
					}

					$tip.offset(tp);
				};
				popover.show = function() {
					var e = $.Event('show');
					this.$element.trigger(e);
					if (e.isDefaultPrevented()) {
						return;
					}
					var r = $.fn.popover.Constructor.prototype.show.apply(this, arguments);
					// Bind popover to the tip()
					this.$tip.data('popover', this);
					return r;
				};
				popover.hide = function() {
					var e = $.Event('hide');
					this.$element.trigger(e);
					if (e.isDefaultPrevented()) {
						return;
					}
					return $.fn.popover.Constructor.prototype.hide.apply(this, arguments);
				};

			}, function onError(err) {
			});

		}
	};

}]);


// https://github.com/jdewit/bootstrap-timepicker
// https://github.com/kla/bootstrap-timepicker

angular.module('$strap.directives')

.directive('bsTimepicker', ['$timeout', function($timeout) {
	'use strict';

	var TIME_REGEXP = '((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)';

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function postLink(scope, element, attrs, controller) {

			// If we have a controller (i.e. ngModelController) then wire it up
			if(controller) {
				element.on('change', function(ev) {
					scope.$apply(function () {
						controller.$setViewValue(element.val());
					});
				});
			}

			// Handle input time validity
			var timeRegExp = new RegExp('^' + TIME_REGEXP + '$', ['i']);
			controller.$parsers.unshift(function(viewValue) {
				//console.warn('viewValue', viewValue, timeRegExp,  timeRegExp.test(viewValue));
				if (!viewValue || timeRegExp.test(viewValue)) {
					controller.$setValidity('time', true);
					return viewValue;
				} else {
					controller.$setValidity('time', false);
					return undefined;
				}
			});

			// Support add-on
			// var component = element.siblings('[data-toggle="timepicker"]');
			// if(component.length) {
			//  component.on('click', function() {
			//    var $widget = element.data('timepicker').$widget;
			//   });
			// }

			// Popover GarbageCollection
			var $popover = element.closest('.popover');
			if($popover) {
				$popover.on('hide', function(e) {
					var timepicker = element.data('timepicker');
					if(timepicker) {
						timepicker.$widget.remove();
						element.data('timepicker', null);
					}
				});
			}

			// Create datepicker
			element.attr('data-toggle', 'timepicker');
			//$timeout(function () {
				element.timepicker();
			//});

		}
	};

}]);


angular.module('$strap.directives')

.directive('bsTooltip', ['$parse', '$compile', '$http', '$timeout',  function($parse, $compile, $http, $timeout) {
	'use strict';

	return {
		restrict: 'A',
		scope: true,
		link: function postLink(scope, element, attr, ctrl) {

			var getter = $parse(attr.bsTooltip),
				setter = getter.assign;

			if(!!attr.unique) {
				element.on('show', function(ev) {
					// Hide any active popover except self
					$(".tooltip.in").each(function() {
						var $this = $(this),
							tooltip = $this.data('tooltip');
						if(tooltip && !tooltip.$element.is(element)) {
							$this.tooltip('hide');
						}
					});
				});
			}

			// Initialize tooltip
			element.tooltip({
				title: getter(scope),
				html: true
			});

			// Bootstrap override to provide events & tip() reference & refresh positions
			var tooltip = element.data('tooltip');
			tooltip.show = function() {
				var e = $.Event('show');
				this.$element.trigger(e);
				if (e.isDefaultPrevented()) {
					return;
				}
				var r = $.fn.tooltip.Constructor.prototype.show.apply(this, arguments);
				// Bind popover to the tip()
				this.$tip.data('tooltip', this);
				return r;
			};
			tooltip.hide = function() {
				var e = $.Event('hide');
				this.$element.trigger(e);
				if (e.isDefaultPrevented()) {
					return;
				}
				return $.fn.tooltip.Constructor.prototype.hide.apply(this, arguments);
			};

			// Provide scope display functions
			scope.dismiss = function() {
				element.tooltip('hide');
			};
			scope.show = function() {
				element.tooltip('show');
			};

		}
	};

}]);


angular.module('$strap.directives')

.directive('bsTypeahead', ['$parse', function($parse) {
	'use strict';

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function postLink(scope, element, attr, controller) {

			var getter = $parse(attr.bsTypeahead),
					setter = getter.assign,
					value = getter(scope);

			// Watch bsTypeahead for changes
			scope.$watch(attr.bsTypeahead, function(newValue, oldValue) {
				if(newValue !== oldValue) {
					value = newValue;
				}
			});

			element.attr('data-provide', 'typeahead');
			element.typeahead({
				source: function(query) { return value; },
				items: attr.items,
				updater: function(value) {
					// If we have a controller (i.e. ngModelController) then wire it up
					if(controller) {
						scope.$apply(function () {
							controller.$setViewValue(value);
						});
					}
					return value;
				}
			});

		}
	};

}]);
