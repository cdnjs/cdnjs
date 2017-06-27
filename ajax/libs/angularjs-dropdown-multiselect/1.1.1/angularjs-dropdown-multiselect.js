'use strict';

var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', function ($filter, $document, $compile) {

	return {
		restrict: 'AE',
		scope:{
			selectedModel: '=',
			options: '=',
			extraSettings: '='
		},
		template: function(element, attrs)
		{
			var checkboxes = attrs.checkboxes ? true : false;

			var template = '<div class="multiselect-parent btn-group dropdown-multiselect" data-ng-class="{open: open}">';
			template +='<button type="button" class="btn btn-default dropdown-toggle" ng-click="toggleDropdown()">{{getButtonText()}}<span class="caret"></span></button>';
			template += '<ul class="dropdown-menu dropdown-menu-form">';
			template += '<li><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  Check All</a>';
			template += '<li><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>  Uncheck All</a></li>';
			template += '<li class="divider"></li>';

			if(checkboxes)
			{
				template += '<li data-ng-repeat="option in watchedOptions"><a ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))"><div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a></li>';
			}
			else {
				template += '<li data-ng-repeat="option in watchedOptions"><a ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))"><span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a></li>';
			}

			template += '</ul>';
			template += '</div>';

			element.html(template);
		},
		link: function($scope, $element, $attrs){
			$scope.toggleDropdown = function()
			{
				$scope.open = !$scope.open;
			};

			$scope.checkboxClick = function($event, id)
			{
				$scope.setSelectedItem(id);
				$event.stopImmediatePropagation();
			};

			$scope.$watch('options', function(newValue)
			{
				$scope.watchedOptions = angular.copy($scope.options);
			}, true);

			$scope.settings = {
				dynamicTitle: true,
				defaultText: 'Select',
				closeOnBlur: true,
				displayProp: 'label',
				idProp: 'id',
				externalIdProp: 'id'};

			angular.extend($scope.settings, $scope.extraSettings || []);

			function getFindObj(id)
			{
				var findObj = {};

				if ($scope.settings.externalIdProp === '')
				{
					findObj[$scope.settings.idProp] = id;
				}
				else {
					findObj[$scope.settings.externalIdProp] = id;
				}

				return findObj;
			}

			if ($scope.settings.closeOnBlur) {
				$document.on('click', function (e) {
					var target = e.target.parentElement;
					var parentFound = false;

					while (angular.isDefined(target) && target !== null && !parentFound) {
						if (_.contains(target.classList, 'multiselect-parent') && !parentFound) {
							parentFound = true;
						}
						target = target.parentElement;
					}

					if (!parentFound) {
						$scope.$apply(function () {
							$scope.open = false;
						});
					}
				});
			}

			$scope.getButtonText = function()
			{
				if ($scope.settings.dynamicTitle)
				{
					var totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;

					if (totalSelected === 0)
					{
						return $scope.settings.defaultText;
					}
					else
					{
						return totalSelected + ' selected';
					}
				}
				else
				{
					return $scope.settings.defaultText;
				}
			};

			$scope.getPropertyForObject = function(object, property)
			{
				if (object.hasOwnProperty(property)) {
					return object[property];
				}

				return '';
			};

			$scope.selectAll = function () {
				$scope.deselectAll();

				angular.forEach($scope.options, function(value)
				{
					$scope.setSelectedItem(value[$scope.settings.idProp], true);
				});
			};

			$scope.deselectAll = function() {
				$scope.selectedModel=[];
			};

			$scope.setSelectedItem = function(id, dontRemove){
				dontRemove = dontRemove || false;
				var findObj = getFindObj(id);

				var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

				if (!dontRemove && exists) {
					$scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
				} else if (!exists) {
					if ($scope.settings.externalIdProp === '')
					{
						var fullObjFind = getFindObj(id);
						var fullObj = _.find($scope.options, fullObjFind);
						$scope.selectedModel.push(fullObj);
					}
					else
					{
						$scope.selectedModel.push(findObj);
					}

				}

				return false;
			};

			$scope.isChecked = function (id) {
				if (_.findIndex($scope.selectedModel, getFindObj(id)) !== -1) {
					return true;
				}

				return false;
			};
		}
	};
}]);