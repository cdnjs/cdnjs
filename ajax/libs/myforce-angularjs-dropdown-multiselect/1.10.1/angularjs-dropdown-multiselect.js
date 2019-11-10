'use strict';

var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule.directive('mfDropdownStaticInclude', ['$compile', function($compile) {
	return function(scope, element, attrs) {
		var template = attrs.mfDropdownStaticInclude;
		var contents = element.html(template).contents();
		$compile(contents)(scope);
	};
}]);

directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse', function($filter, $document, $compile, $parse) {
	return {
		restrict: 'AE',
		scope: {
			selectedModel: '=',
			options: '=',
			extraSettings: '=',
			events: '=',
			searchFilter: '=?',
			translationTexts: '=',
			groupBy: '@',
			disabled: "="
		},
		template: function(element, attrs) {
			var checkboxes = attrs.checkboxes ? true : false;
			var groups = attrs.groupBy ? true : false;

			var template = '<div class="multiselect-parent btn-group dropdown-multiselect" ng-class="{open: open}">';
			template += '<button ng-disabled="disabled" type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
			template += '<ul class="dropdown-menu dropdown-menu-form" ng-if="open" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\', overflow: \'auto\' }" >';
			template += '<li ng-if="settings.showCheckAll && settings.selectionLimit !== 1"><a ng-keydown="keyDownLink($event)" data-ng-click="selectAll()" tabindex="-1" id="selectAll"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
			template += '<li ng-if="settings.showUncheckAll"><a ng-keydown="keyDownLink($event)" data-ng-click="deselectAll();" tabindex="-1" id="deselectAll"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
			template += '<li ng-if="settings.selectByGroups && ((settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll)" class="divider"></li>';
			template += '<li ng-if="settings.selectByGroups && ((settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll)" class="divider"></li>';
			template += '<li ng-repeat="currentGroup in settings.selectByGroups track by $index" ng-click="selectCurrentGroup(currentGroup)"><a ng-class="{\'dropdown-selected-group\': selectedGroup === currentGroup}" tabindex="-1">{{::texts.selectGroup}} {{::getGroupLabel(currentGroup)}}</a></li>';
			template += '<li ng-if="settings.selectByGroups && settings.showEnableSearchButton" class="divider"></li>';
			template += '<li ng-if="settings.showEnableSearchButton && settings.enableSearch"><a ng-keydown="keyDownLink($event); keyDownToggleSearch();" ng-click="toggleSearch($event);" tabindex="-1">{{texts.disableSearch}}</a></li>';
			template += '<li ng-if="settings.showEnableSearchButton && !settings.enableSearch"><a ng-keydown="keyDownLink($event); keyDownToggleSearch();" ng-click="toggleSearch($event);" tabindex="-1">{{texts.enableSearch}}</a></li>';
			template += '<li ng-if="(settings.showCheckAll && settings.selectionLimit > 0) || settings.showUncheckAll || settings.showEnableSearchButton" class="divider"></li>';
			template += '<li ng-if="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control searchField" ng-keydown="keyDownSearchDefault($event); keyDownSearch($event, input.searchFilter);" ng-style="{width: \'100%\'}" ng-model="input.searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
			template += '<li ng-if="settings.enableSearch" class="divider"></li>';

			if (groups) {
				template += '<li ng-repeat-start="option in orderedItems | filter:getFilter(input.searchFilter)" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupLabel(getPropertyForObject(option, settings.groupBy)) }}</li>';
				template += '<li ng-class="{\'active\': isChecked(getPropertyForObject(option,settings.idProp)) && settings.styleActive}" ng-repeat-end role="presentation">';
			} else {
				template += '<li ng-class="{\'active\': isChecked(getPropertyForObject(option,settings.idProp)) && settings.styleActive}" role="presentation" ng-repeat="option in options | filter:getFilter(input.searchFilter)">';
			}

			template += '<a ng-keydown="option.disabled || keyDownLink($event)" role="menuitem" class="option" tabindex="-1" ng-click="option.disabled || setSelectedItem(getPropertyForObject(option,settings.idProp), false, true)" ng-disabled="option.disabled">';

			if (checkboxes) {
				template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> <span mf-dropdown-static-include="{{settings.template}}"></div></label></span></a>';
			} else {
				template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"> </span> <span mf-dropdown-static-include="{{settings.template}}"></span></a>';
			}

			template += '</li>';

			template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
			template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

			template += '</ul>';
			template += '</div>';

			element.html(template);
		},
		link: function($scope, $element, $attrs) {
			var $dropdownTrigger = $element.children()[0];

			$scope.toggleDropdown = function() {
				$scope.open = !$scope.open;
				if ($scope.settings.keyboardControls) {
					if ($scope.open) {
						if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
							setTimeout(function() {
								angular.element($element)[0].querySelector('.searchField').focus();
							}, 0);
						} else {
							setTimeout(function() {
								angular.element($element)[0].querySelector('.option').focus();
							}, 0);
						}
					}
				}
			};

			$scope.checkboxClick = function($event, id) {
				$scope.setSelectedItem(id, false, true);
				$event.stopImmediatePropagation();
			};

			$scope.externalEvents = {
				onItemSelect: angular.noop,
				onItemDeselect: angular.noop,
				onSelectAll: angular.noop,
				onDeselectAll: angular.noop,
				onInitDone: angular.noop,
				onMaxSelectionReached: angular.noop,
				onSelectionChanged: angular.noop
			};

			$scope.settings = {
				dynamicTitle: true,
				scrollable: false,
				scrollableHeight: '300px',
				closeOnBlur: true,
				displayProp: 'label',
				idProp: 'id',
				externalIdProp: 'id',
				enableSearch: false,
				selectionLimit: 0,
				showCheckAll: true,
				showUncheckAll: true,
				showEnableSearchButton: false,
				closeOnSelect: false,
				buttonClasses: 'btn btn-default',
				closeOnDeselect: false,
				groupBy: $attrs.groupBy || undefined,
				groupByTextProvider: null,
				smartButtonMaxItems: 0,
				smartButtonTextConverter: angular.noop,
				styleActive: false,
				keyboardControls: false,
				template: '{{getPropertyForObject(option, settings.displayProp)}}',
				searchField: '$'
			};

			$scope.texts = {
				checkAll: 'Check All',
				uncheckAll: 'Uncheck All',
				selectionCount: 'checked',
				selectionOf: '/',
				searchPlaceholder: 'Search...',
				buttonDefaultText: 'Select',
				dynamicButtonTextSuffix: 'checked',
				disableSearch: 'Disable search',
				enableSearch: 'Enable search',
				selectGroup: 'Select all:'
			};

			$scope.input = {
				searchFilter: $scope.searchFilter || ''
			};

			if (angular.isDefined($scope.settings.groupBy)) {
				$scope.$watch('options', function(newValue) {
					if (angular.isDefined(newValue)) {
						$scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
					}
				});
			}

			$scope.$watch('selectedModel', function(newValue) {
				if (!Array.isArray(newValue)) {
					$scope.singleSelection = true;
				} else {
					$scope.singleSelection = false;
				}
			});

			$scope.selectCurrentGroup = function(currentGroup) {
				$scope.selectedModel.splice(0, $scope.selectedModel.length);
				if ($scope.orderedItems) {
					$scope.orderedItems.forEach(function(item) {
						if (item[$scope.groupBy] === currentGroup) {
							$scope.setSelectedItem($scope.getPropertyForObject(item, $scope.settings.idProp), false, false)
						}
					});
				}
				$scope.externalEvents.onSelectionChanged();
			};

			angular.extend($scope.settings, $scope.extraSettings || []);
			angular.extend($scope.externalEvents, $scope.events || []);
			angular.extend($scope.texts, $scope.translationTexts);

			$scope.singleSelection = $scope.settings.selectionLimit === 1;

			function getFindObj(id) {
				var findObj = {};

				if ($scope.settings.externalIdProp === '') {
					findObj[$scope.settings.idProp] = id;
				} else {
					findObj[$scope.settings.externalIdProp] = id;
				}

				return findObj;
			}

			function clearObject(object) {
				for (var prop in object) {
					delete object[prop];
				}
			}

			if ($scope.singleSelection) {
				if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
					clearObject($scope.selectedModel);
				}
			}

			if ($scope.settings.closeOnBlur) {
				$document.on('click', function(e) {
					if ($scope.open) {
						var target = e.target.parentElement;
						var parentFound = false;

						while (angular.isDefined(target) && target !== null && !parentFound) {
							if (!!target.className.split && contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
								if (target === $dropdownTrigger) {
									parentFound = true;
								}
							}
							target = target.parentElement;
						}

						if (!parentFound) {
							$scope.$apply(function() {
								$scope.open = false;
							});
						}
					}
				});
			}

			$scope.getGroupLabel = function(groupValue) {
				if ($scope.settings.groupByTextProvider !== null) {
					return $scope.settings.groupByTextProvider(groupValue);
				}

				return groupValue;
			};

			$scope.getButtonText = function() {
				if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && Object.keys($scope.selectedModel).length > 0))) {
					if ($scope.settings.smartButtonMaxItems > 0) {
						var itemsText = [];

						angular.forEach($scope.options, function(optionItem) {
							if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
								var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
								var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

								itemsText.push(converterResponse ? converterResponse : displayText);
							}
						});

						if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
							itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
							itemsText.push('...');
						}

						return itemsText.join(', ');
					} else {
						var totalSelected;

						if ($scope.singleSelection) {
							totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
						} else {
							totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
						}

						if (totalSelected === 0) {
							return $scope.texts.buttonDefaultText;
						} else {
							return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
						}
					}
				} else {
					return $scope.texts.buttonDefaultText;
				}
			};

			$scope.getPropertyForObject = function(object, property) {
				if (angular.isDefined(object) && object.hasOwnProperty(property)) {
					return object[property];
				}

				return '';
			};

			$scope.selectAll = function() {
				var searchResult;
				$scope.deselectAll(true);
				$scope.externalEvents.onSelectAll();

				searchResult = $filter('filter')($scope.options, $scope.getFilter($scope.input.searchFilter));
				angular.forEach(searchResult, function(value) {
					$scope.setSelectedItem(value[$scope.settings.idProp], true, false);
				});
				$scope.externalEvents.onSelectionChanged();
				$scope.selectedGroup = null;
			};

			$scope.deselectAll = function(dontSendEvent) {
				dontSendEvent = dontSendEvent || false;

				if (!dontSendEvent) {
					$scope.externalEvents.onDeselectAll();
				}

				if ($scope.singleSelection) {
					clearObject($scope.selectedModel);
				} else {
					$scope.selectedModel.splice(0, $scope.selectedModel.length);
				}
				if (!dontSendEvent) {
					$scope.externalEvents.onSelectionChanged();
				}
				$scope.selectedGroup = null;
			};

			$scope.setSelectedItem = function(id, dontRemove, fireSelectionChange) {
				var findObj = getFindObj(id);
				var finalObj = null;

				if ($scope.settings.externalIdProp === '') {
					finalObj = find($scope.options, findObj);
				} else {
					finalObj = findObj;
				}

				if ($scope.singleSelection) {
					clearObject($scope.selectedModel);
					angular.extend($scope.selectedModel, finalObj);
					$scope.externalEvents.onItemSelect(finalObj);
					if ($scope.settings.closeOnSelect || $scope.settings.closeOnDeselect) $scope.open = false;
				} else {
					dontRemove = dontRemove || false;

					var exists = findIndex($scope.selectedModel, findObj) !== -1;

					if (!dontRemove && exists) {
						$scope.selectedModel.splice(findIndex($scope.selectedModel, findObj), 1);
						$scope.externalEvents.onItemDeselect(findObj);
						if ($scope.settings.closeOnDeselect) $scope.open = false;
					} else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
						$scope.selectedModel.push(finalObj);
						$scope.externalEvents.onItemSelect(finalObj);
						if ($scope.settings.closeOnSelect) $scope.open = false;
						if ($scope.settings.selectionLimit > 0 && $scope.selectedModel.length === $scope.settings.selectionLimit) {
							$scope.externalEvents.onMaxSelectionReached();
						}
					}
				}
				if (fireSelectionChange) {
					$scope.externalEvents.onSelectionChanged();
				}
				$scope.selectedGroup = null;
			};

			$scope.isChecked = function(id) {
				if ($scope.singleSelection) {
					return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
				}

				return findIndex($scope.selectedModel, getFindObj(id)) !== -1;
			};

			$scope.externalEvents.onInitDone();

			$scope.keyDownLink = function(event) {
				var sourceScope = angular.element(event.target).scope();
				var nextOption;
				var parent = event.target.parentNode;
				if (!$scope.settings.keyboardControls) {
					return;
				}
				if (event.keyCode === 13 || event.keyCode === 32) { // enter
					event.preventDefault();
					if (!!sourceScope.option) {
						$scope.setSelectedItem($scope.getPropertyForObject(sourceScope.option, $scope.settings.idProp), false, true);
					} else if (event.target.id === 'deselectAll') {
						$scope.deselectAll();
					} else if (event.target.id === 'selectAll') {
						$scope.selectAll();
					}
				} else if (event.keyCode === 38) { // up arrow
					event.preventDefault();
					if (!!parent.previousElementSibling) {
						nextOption = parent.previousElementSibling.querySelector('a') || parent.previousElementSibling.querySelector('input');
					}
					while (!nextOption && !!parent) {
						parent = parent.previousElementSibling;
						if (!!parent) {
							nextOption = parent.querySelector('a') || parent.querySelector('input');
						}
					}
					if (!!nextOption) {
						nextOption.focus();
					}
				} else if (event.keyCode === 40) { // down arrow
					event.preventDefault();
					if (!!parent.nextElementSibling) {
						nextOption = parent.nextElementSibling.querySelector('a') || parent.nextElementSibling.querySelector('input');
					}
					while (!nextOption && !!parent) {
						parent = parent.nextElementSibling;
						if (!!parent) {
							nextOption = parent.querySelector('a') || parent.querySelector('input');
						}
					}
					if (!!nextOption) {
						nextOption.focus();
					}
				} else if (event.keyCode === 27) {
					event.preventDefault();

					$scope.toggleDropdown();
				}
			};

			$scope.keyDownSearchDefault = function(event) {
				var parent = event.target.parentNode.parentNode;
				var nextOption;
				if (!$scope.settings.keyboardControls) {
					return;
				}
				if (event.keyCode === 9 || event.keyCode === 40) { //tab
					event.preventDefault();
					setTimeout(function() {
						angular.element($element)[0].querySelector('.option').focus();
					}, 0);
				} else if (event.keyCode === 38) {
					event.preventDefault();
					if (!!parent.previousElementSibling) {
						nextOption = parent.previousElementSibling.querySelector('a') || parent.previousElementSibling.querySelector('input');
					}
					while (!nextOption && !!parent) {
						parent = parent.previousElementSibling;
						if (!!parent) {
							nextOption = parent.querySelector('a') || parent.querySelector('input');
						}
					}
					if (!!nextOption) {
						nextOption.focus();
					}
				} else if (event.keyCode === 27) {
					event.preventDefault();

					$scope.toggleDropdown();
				}
			};

			$scope.keyDownSearch = function(event, searchFilter) {
				var searchResult;
				if (!$scope.settings.keyboardControls) {
					return;
				}
				if (event.keyCode === 13) {
					if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
						searchResult = $filter('filter')($scope.options, $scope.getFilter(searchFilter));
						if (searchResult.length === 1) {
							$scope.setSelectedItem($scope.getPropertyForObject(searchResult[0], $scope.settings.idProp), false, true);
						}
					} else if ($scope.settings.enableSearch) {
						$scope.selectAll();
					}
				}
			};

			$scope.getFilter = function(searchFilter) {
				var filter = {};
				filter[$scope.settings.searchField] = searchFilter;
				return filter;
			};

			$scope.toggleSearch = function($event) {
				if ($event) {
					$event.stopPropagation();
				}
				$scope.settings.enableSearch = !$scope.settings.enableSearch;
				if (!$scope.settings.enableSearch) {
					$scope.input.searchFilter = '';
				}
			};

			$scope.keyDownToggleSearch = function() {
				if (!$scope.settings.keyboardControls) {
					return;
				}
				if (event.keyCode === 13) {
					$scope.toggleSearch();
					if ($scope.settings.enableSearch) {
						setTimeout(
							function() {
								angular.element($element)[0].querySelector('.searchField').focus();
							}, 0
						);
					} else {
						angular.element($element)[0].querySelector('.option').focus();
					}
				}
			};
		}
	};
}]);

function contains(collection, target) {
	var containsTarget = false;
	collection.some(function(object) {
		if (object === target) {
			containsTarget = true;
			return true;
		}
	});
	return containsTarget;
}

function find(collection, properties) {
	var target;

	collection.some(function(object) {
		var hasAllSameProperties = true;
		Object.keys(properties).forEach(function(key) {
			if (object[key] !== properties[key]) {
				hasAllSameProperties = false;
			}
		});
		if (hasAllSameProperties) {
			target = object;
			return true
		}
	});

	return target;
}

function findIndex(collection, properties) {
	var index = -1;
	var counter = -1;

	collection.some(function(object) {
		var hasAllSameProperties = true;
		counter += 1;
		Object.keys(properties).forEach(function(key) {
			if (object[key] !== properties[key]) {
				hasAllSameProperties = false;
			}
		});
		if (hasAllSameProperties) {
			index = counter;
			return true
		}
	});

	return index;
}
