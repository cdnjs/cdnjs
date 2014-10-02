/**
 * AngularStrap - Twitter Bootstrap directives for AngularJS
 * @version v0.6.4 - 2013-02-03
 * @link http://mgcrea.github.com/angular-strap
 * @author Olivier Louvignes
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */


angular.module('$strap.config', []).value('$strap.config', {});
angular.module('$strap.filters', ['$strap.config']);
angular.module('$strap.directives', ['$strap.config']);
angular.module('$strap', ['$strap.filters', '$strap.directives', '$strap.config']);


angular.module('$strap.directives')

.directive('bsAlert', ['$parse', '$timeout', '$compile', function($parse, $timeout, $compile) {
	'use strict';

	return {
		restrict: 'A',
		link: function postLink(scope, element, attrs) {

			scope.$watch(attrs.bsAlert, function(newValue, oldValue) {

				if(typeof newValue === 'undefined') {
					if(typeof oldValue !== 'undefined') {
						element.remove();
					}
					return;
				}

				// Set alert content
				element.html((newValue.title ? '<strong>' + newValue.title + '</strong>&nbsp;' : '') + newValue.content || '');

				// Compile alert content
				$timeout(function(){
					$compile(element.contents())(scope);
				});

				// Add proper class
				if(newValue.type || oldValue.type) {
					oldValue.type && element.removeClass('alert-' + oldValue.type);
					newValue.type && element.addClass('alert-' + newValue.type);
				}

				// Setup close button
				if(newValue.close !== false) {
					element.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>');
				}

			}, true);

			// For basic alerts
			if(!attrs.bsAlert && attrs.close !== '0') {
				element.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>');
			}

			element.addClass('alert').alert();

			// element.on('close', function() {
			// });

		}
	};
}]);


angular.module('$strap.directives')

.directive('bsButton', ['$parse', '$timeout', function($parse, $timeout) {
	'use strict';

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function postLink(scope, element, attrs, controller) {

			// If we have a controller (i.e. ngModelController) then wire it up
			if(controller) {

				// Set as single toggler if not part of a btn-group
				if(!element.parent('[data-toggle="buttons-checkbox"], [data-toggle="buttons-radio"]').length) {
					element.attr('data-toggle', 'button');
				}

				// Handle start state
				var startValue = !!scope.$eval(attrs.ngModel);
				if(startValue) {
					element.addClass('active');
				}

				// Watch model for changes
				scope.$watch(attrs.ngModel, function(newValue, oldValue) {
					var bNew = !!newValue, bOld = !!oldValue;
					if(bNew !== bOld) {
						$.fn.button.Constructor.prototype.toggle.call(button);
					// Handle $q promises
					} else if(bNew && !startValue) {
						element.addClass('active');
					}
				});

			}

			// Support buttons without .btn class
			if(!element.hasClass('btn')) {
				element.on('click.button.data-api', function (e) {
					element.button('toggle');
				});
			}

			// Initialize button
			element.button();

			// Bootstrap override to handle toggling
			var button = element.data('button');
			button.toggle = function() {

				if(!controller) {
					return $.fn.button.Constructor.prototype.toggle.call(this);
				}

				var $parent = element.parent('[data-toggle="buttons-radio"]');

				if($parent.length) {
					element.siblings('[ng-model]').each(function(k, v) {
						$parse($(v).attr('ng-model')).assign(scope, false);
					});
					scope.$digest();
					if(!controller.$modelValue) {
						controller.$setViewValue(!controller.$modelValue);
						scope.$digest();
					}
				} else {
					scope.$apply(function () {
						controller.$setViewValue(!controller.$modelValue);
					});
				}

			};

			/*Provide scope display functions
			scope._button = function(event) {
				element.button(event);
			};
			scope.loading = function() {
				element.tooltip('loading');
			};
			scope.reset = function() {
				element.tooltip('reset');
			};

			if(attrs.loadingText) element.click(function () {
				//var btn = $(this)
				element.button('loading')
				setTimeout(function () {
				element.button('reset')
				}, 1000)
			});*/

		}
	};

}])

.directive('bsButtonsCheckbox', ['$parse', function($parse) {
	'use strict';
	return {
		restrict: 'A',
		require: '?ngModel',
		compile: function compile(tElement, tAttrs, transclude) {
			tElement.attr('data-toggle', 'buttons-checkbox').find('a, button').each(function(k, v) {
				$(v).attr('bs-button', '');
			});
		}
	};

}])

.directive('bsButtonsRadio', ['$parse', function($parse) {
	'use strict';
	return {
		restrict: 'A',
		require: '?ngModel',
		compile: function compile(tElement, tAttrs, transclude) {

			tElement.attr('data-toggle', 'buttons-radio');

			// Delegate to children ngModel
			if(!tAttrs.ngModel) {
				tElement.find('a, button').each(function(k, v) {
					$(v).attr('bs-button', '');
				});
			}

			return function postLink(scope, iElement, iAttrs, controller) {

				// If we have a controller (i.e. ngModelController) then wire it up
				if(controller) {

					iElement
						.find('[value]').button()
						.filter('[value="' + scope.$eval(iAttrs.ngModel) + '"]')
						.addClass('active');

					iElement.on('click.button.data-api', function (ev) {
						scope.$apply(function () {
							controller.$setViewValue($(ev.target).closest('button').attr('value'));
						});
					});

					// Watch model for changes
					scope.$watch(iAttrs.ngModel, function(newValue, oldValue) {
						if(newValue !== oldValue) {
							var $btn = iElement.find('[value="' + scope.$eval(iAttrs.ngModel) + '"]');
							$.fn.button.Constructor.prototype.toggle.call($btn.data('button'));
						}
					});

				}

			};
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
					autoclose: true,
					language: attrs.language || 'en'
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
      '<a ng-hide="!!item.divider" tabindex="-1" ng-href="{{item.href}}" ng-click="{{item.click}}" target="{{item.target}}" ng-bind-html-unsafe="item.text"></a>' +
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

				// Build modal object
				var id = getter(scope).replace('.html', '').replace(/\//g, '-').replace(/\./g, '-') + '-' + scope.$id;
				var $modal = $('<div class="modal hide" tabindex="-1"></div>')
					.attr('id', id)
					.attr('data-backdrop', attr.backdrop || true)
					.attr('data-keyboard', attr.keyboard || true)
					.addClass(attr.modalClass ? 'fade ' + attr.modalClass : 'fade')
					.html(template);

				$('body').append($modal);

				// Configure element
				element.attr('href', '#' + id).attr('data-toggle', 'modal');

				// Compile modal content
				$timeout(function(){
					$compile($modal)(scope);
				});

				// Provide scope display functions
				scope._modal = function(name) {
					$modal.modal(name);
				};
				scope.hide = function() {
					$modal.modal('hide');
				};
				scope.show = function() {
					$modal.modal('show');
				};
				scope.dismiss = scope.hide;

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
				value = getter(scope),
				options = {};

			if(angular.isObject(value)) {
				options = value;
			}

			$q.when(options.content || $templateCache.get(value) || $http.get(value, {cache: true})).then(function onSuccess(template) {

				// Handle response from $http promise
				if(angular.isObject(template)) {
					template = template.data;
				}

				// Handle data-unique attribute
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

				// Handle data-hide attribute (requires dot-notation model)
				if(!!attr.hide) {
					scope.$watch(attr.hide, function(newValue, oldValue) {
						if(!!newValue) {
							popover.hide();
						}
					});
				}

				// Initialize popover
				element.popover(angular.extend({}, options, {
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
				}));

				// Bootstrap override to provide events, tip() reference, refreshable positions
				var popover = element.data('popover');
				popover.hasContent = function() {
					return this.getTitle() || template; // fix multiple $compile()
				};
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

				// Provide scope display functions
				scope._popover = function(name) {
					element.popover(name);
				};
				scope.hide = function() {
					element.popover('hide');
				};
				scope.show = function() {
					element.popover('show');
				};
				scope.dismiss = scope.hide;

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

.directive('bsTooltip', ['$parse', '$compile',  function($parse, $compile) {
	'use strict';

	return {
		restrict: 'A',
		scope: true,
		link: function postLink(scope, element, attrs, ctrl) {

			if(!!attrs.unique) {
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
				title: scope.$eval(attrs.bsTooltip),
				html: true
			});

			// Bootstrap override to provide events & tip() reference
			var tooltip = element.data('tooltip');
			tooltip.show = function() {
				var e = $.Event('show');
				this.$element.trigger(e);
				if (e.isDefaultPrevented()) {
					return;
				}
				var r = $.fn.tooltip.Constructor.prototype.show.apply(this, arguments);
				// Bind popover to the tip()
				this.tip().data('tooltip', this);
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

			//Provide scope display functions
			scope._tooltip = function(event) {
				element.tooltip(event);
			};
			scope.hide = function() {
				element.tooltip('hide');
			};
			scope.show = function() {
				element.tooltip('show');
			};
			scope.dismiss = scope.hide;

		}
	};

}]);

angular.module('$strap.directives')

.directive('bsTypeahead', ['$parse', function($parse) {
	'use strict';

	return {
		restrict: 'A',
		require: '?ngModel',
		link: function postLink(scope, element, attrs, controller) {

			var getter = $parse(attrs.bsTypeahead),
					setter = getter.assign,
					value = getter(scope);

			// Watch bsTypeahead for changes
			scope.$watch(attrs.bsTypeahead, function(newValue, oldValue) {
				if(newValue !== oldValue) {
					value = newValue;
				}
			});

			element.attr('data-provide', 'typeahead');
			element.typeahead({
				source: function(query) { return angular.isFunction(value) ? value.apply(null, arguments) : value; },
				minLength: attrs.minLength || 1,
				items: attrs.items,
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

			// Bootstrap override
			var typeahead = element.data('typeahead');
			// Fixes #2043: allows minLength of zero to enable show all for typeahead
			typeahead.lookup = function (ev) {
				var items;
				this.query = this.$element.val() || '';
				if (this.query.length < this.options.minLength) {
					return this.shown ? this.hide() : this;
				}
				items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source;
				return items ? this.process(items) : this;
			};

			// Support 0-minLength
			if(attrs.minLength === "0") {
				setTimeout(function() { // Push to the event loop to make sure element.typeahead is defined (breaks tests otherwise)
					element.on('focus', function() {
						setTimeout(element.typeahead.bind(element, 'lookup'), 200);
					});
				});
			}

		}
	};

}]);
