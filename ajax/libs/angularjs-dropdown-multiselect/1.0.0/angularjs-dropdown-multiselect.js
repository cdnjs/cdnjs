'use strict';

var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule.run(['$templateCache', function($templateCache)
{
	var template = '<div class="multiselect-parent btn-group dropdown-multiselect" data-ng-class="{open: open}">';
	template +='<button type="button" class="btn btn-default dropdown-toggle" data-ng-click="open=!open;">{{getButtonText()}}<span class="caret"></span></button>';
	template += '<ul class="dropdown-menu">';
	template += '<li><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  Check All</a>';
	template += '<li><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>  Uncheck All</a></li>';
	template += '<li class="divider"></li>';
	template += '<li data-ng-repeat="option in options"><a data-ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))"><span data-ng-class="isChecked(getPropertyForObject(option,settings.idProp))"></span>{{getPropertyForObject(option, settings.displayProp)}}</a></li>';
	template += '</ul>';
	template += '</div>';

	$templateCache.put('dropdown-multiselect-template.html', template);
}]);

directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', function ($filter, $document) {

	return {
		restrict: 'AE',
		scope:{
			selectedModel: '=',
			options: '=',
			extraSettings: '='
		},
		templateUrl: 'dropdown-multiselect-template.html',
		link: function($scope, $element){
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
					return 'glyphicon glyphicon-ok';
				}
				return '';
			};
		}
	};
}]);