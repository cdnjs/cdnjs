'use strict';

var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule.directive('mfDropdownStaticInclude', ['$compile', function ($compile) {
    return function (scope, element, attrs) {
        var template = attrs.mfDropdownStaticInclude;
        var contents = element.html(template).contents();
        $compile(contents)(scope);
    };
}]);

directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',
    function ($filter, $document, $compile, $parse) {

        return {
            restrict: 'AE',
            scope: {
                selectedModel: '=',
                options: '=',
                extraSettings: '=',
                events: '=',
                searchFilter: '=?',
                translationTexts: '=',
                groupBy: '@'
            },
            template: function (element, attrs) {
                var checkboxes = attrs.checkboxes ? true : false;
                var groups = attrs.groupBy ? true : false;

                var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
                template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
                template += '<ul class="dropdown-menu dropdown-menu-form" ng-if="open" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\' }" style="overflow: auto" >';
                template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()" tabindex="-1" id="selectAll"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
                template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();" tabindex="-1" id="deselectAll"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
                template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
                template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control searchField" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
                template += '<li ng-show="settings.enableSearch" class="divider"></li>';

                if (groups) {
                	template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                	template += '<li ng-class="{\'active\': isChecked(getPropertyForObject(option,settings.idProp)) && settings.styleActive}" ng-repeat-end role="presentation">';
                } else {
                	template += '<li ng-class="{\'active\': isChecked(getPropertyForObject(option,settings.idProp)) && settings.styleActive}" role="presentation" ng-repeat="option in options | filter: searchFilter">';
                }

                template += '<a role="menuitem" class="option" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

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
            link: function ($scope, $element, $attrs) {
            	var $dropdownTrigger = $element.children()[0];

            	$scope.toggleDropdown = function() {
                	$scope.open = !$scope.open;
                	if ($scope.settings.keyboardControls) {
                		if ($scope.open) {
                			Array.prototype.slice.call(angular.element($element)[0].querySelectorAll('a'))
											.forEach(function(optionElement) {
												optionElement.addEventListener('keydown', keyDownLink);
											});
                			angular.element($element)[0].querySelector('.searchField').addEventListener('keydown', keyDownSearchDefault);
                			if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
                				angular.element($element)[0].querySelector('.searchField').addEventListener('keydown', keyDownSearchSingle);
                				setTimeout(function() {
                					angular.element($element)[0].querySelector('.searchField').focus();
                				}, 0);
                			} else {
                				setTimeout(function() {
                					angular.element($element)[0].querySelector('.option').focus();
                				}, 0);
											}
                		} else {
                			Array.prototype.slice.call(angular.element($element)[0].querySelectorAll('a'))
											.forEach(function(optionElement) {
												optionElement.removeEventListener('keydown', keyDownLink);
											});
                			angular.element($element)[0].querySelector('.searchField').removeEventListener('keydown', keyDownSearchDefault);
                			if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
                				angular.element($element)[0].querySelector('.searchField').removeEventListener('keydown', keyDownSearchSingle);
                			}
                		}
                	}
                };

                $scope.checkboxClick = function ($event, id) {
                    $scope.setSelectedItem(id);
                    $event.stopImmediatePropagation();
                };

                $scope.externalEvents = {
                    onItemSelect: angular.noop,
                    onItemDeselect: angular.noop,
                    onSelectAll: angular.noop,
                    onDeselectAll: angular.noop,
                    onInitDone: angular.noop,
                    onMaxSelectionReached: angular.noop
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
                    closeOnSelect: false,
                    buttonClasses: 'btn btn-default',
                    closeOnDeselect: false,
                    groupBy: $attrs.groupBy || undefined,
                    groupByTextProvider: null,
                    smartButtonMaxItems: 0,
                    smartButtonTextConverter: angular.noop,
                    styleActive: false,
                    keyboardControls: false,
                    template: '{{getPropertyForObject(option, settings.displayProp)}}'
                };

                $scope.texts = {
                    checkAll: 'Check All',
                    uncheckAll: 'Uncheck All',
                    selectionCount: 'checked',
                    selectionOf: '/',
                    searchPlaceholder: 'Search...',
                    buttonDefaultText: 'Select',
                    dynamicButtonTextSuffix: 'checked'
                };

                $scope.searchFilter = $scope.searchFilter || '';

                if (angular.isDefined($scope.settings.groupBy)) {
                    $scope.$watch('options', function (newValue) {
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
                    $document.on('click', function (e) {
                        if ($scope.open) {
                            var target = e.target.parentElement;
                            var parentFound = false;

                            while (angular.isDefined(target) && target !== null && !parentFound) {
                                if (!!target.className.split && contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                                    if(target === $dropdownTrigger) {
                                        parentFound = true;
                                    }
                                }
                                target = target.parentElement;
                            }

                            if (!parentFound) {
                                $scope.$apply(function () {
                                    $scope.open = false;
                                });
                            }
                        }
                    });
                }

                $scope.getGroupTitle = function (groupValue) {
                    if ($scope.settings.groupByTextProvider !== null) {
                        return $scope.settings.groupByTextProvider(groupValue);
                    }

                    return groupValue;
                };

                $scope.getButtonText = function () {
                    if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && Object.keys($scope.selectedModel).length > 0))) {
                        if ($scope.settings.smartButtonMaxItems > 0) {
                            var itemsText = [];

                            angular.forEach($scope.options, function (optionItem) {
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

                $scope.getPropertyForObject = function (object, property) {
                    if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                        return object[property];
                    }

                    return '';
                };

                $scope.selectAll = function () {
                    $scope.deselectAll(false);
                    $scope.externalEvents.onSelectAll();

                    angular.forEach($scope.options, function (value) {
                        $scope.setSelectedItem(value[$scope.settings.idProp], true);
                    });
                };

                $scope.deselectAll = function (sendEvent) {
                    sendEvent = sendEvent || true;

                    if (sendEvent) {
                        $scope.externalEvents.onDeselectAll();
                    }

                    if ($scope.singleSelection) {
                        clearObject($scope.selectedModel);
                    } else {
                        $scope.selectedModel.splice(0, $scope.selectedModel.length);
                    }
                };

                $scope.setSelectedItem = function (id, dontRemove) {
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

                        return;
                    }

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
                    }
                };

                $scope.isChecked = function (id) {
                    if ($scope.singleSelection) {
                        return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                    }

                    return findIndex($scope.selectedModel, getFindObj(id)) !== -1;
                };

                $scope.externalEvents.onInitDone();

                function keyDownLink(event) {
                	var sourceScope = angular.element(event.target).scope();
                	var nextOption;
                	var parent = event.srcElement.parentNode;
                	if (event.keyCode === 13 || event.keyCode === 32) { // enter
                		event.preventDefault();
                		if (!!sourceScope.option) {
                			$scope.$apply($scope.setSelectedItem($scope.getPropertyForObject(sourceScope.option, $scope.settings.idProp)));
                		} else if (event.srcElement.id === 'deselectAll') {
                			$scope.$apply($scope.deselectAll());
                		} else if (event.srcElement.id === 'selectAll') {
                			$scope.$apply($scope.selectAll());
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

                		$scope.$apply($scope.toggleDropdown());
                	}
                }

                function keyDownSearchDefault(event) {
                	var parent = event.srcElement.parentNode.parentNode;
                	var nextOption;
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

                		$scope.$apply($scope.toggleDropdown());
                	}
                }

                function keyDownSearchSingle(event) {
                	var searchResult;
                	if (event.keyCode === 13) {
                		searchResult = $filter('filter')($scope.options, $scope.searchFilter);
                		if (searchResult.length === 1) {
                			$scope.$apply($scope.setSelectedItem($scope.getPropertyForObject(searchResult[0], $scope.settings.idProp)));
                		}
                	}
                }
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
