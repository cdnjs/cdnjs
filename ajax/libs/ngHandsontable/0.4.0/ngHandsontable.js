/**
 * ngHandsontable 0.4.0
 * 
 * Copyright 2012-2014 Marcin Warpechowski
 * Licensed under the MIT license.
 * https://github.com/handsontable/ngHandsontable
 * Date: Wed Oct 01 2014 23:36:56 GMT+0200 (CEST)
*/

if (document.all && !document.addEventListener) { // IE 8 and lower
  document.createElement('hot-table');
  document.createElement('hot-column');
  document.createElement('hot-autocomplete');
}
angular.module('ngHandsontable',
	[
		'ngHandsontable.services',
		'ngHandsontable.directives'
	]);

angular.module('ngHandsontable.services', [])
/***
 *
 */
	.factory(
	'settingFactory',
	[
		function () {

			return {

				containerClassName: 'handsontable-container',

				/***
				 * Append handsontable container div and initialize handsontable instance inside element
				 * @param element
				 * @param htSettings
				 */
				initializeHandsontable: function (element, htSettings) {
					var container = $('<div class="'+ this.containerClassName +'"></div>');
					element.append(container);
					container.handsontable(htSettings);
				},

				/***
				 * Set new settings to handsontable instance
				 * @param element
				 * @param settings
				 */
				updateHandsontableSettings: function (element, settings) {
					var container = $(element).find('.' + this.containerClassName);
					container.handsontable('updateSettings', settings);
				},

				/***
				 * Render handsontable instance inside element
				 * @param element
				 */
				renderHandsontable: function (element) {
					var container = $(element).find('.' + this.containerClassName);
					container.handsontable('render');
				},

				/***
				 *
				 * @param htOptions
				 * @param scopeOptions
				 * @return {{}}
				 */
				setHandsontableSettingsFromScope: function (htOptions, scopeOptions) {
					var i,
						settings = {},
						allOptions = angular.extend({}, scopeOptions);

					angular.extend(allOptions, scopeOptions.settings);

					for (i in htOptions) {
						if (htOptions.hasOwnProperty(i) && typeof allOptions[htOptions[i]] !== 'undefined') {
							settings[htOptions[i]] = allOptions[htOptions[i]];
						}
					}

					return settings;
				},

				/***
				 *
				 * @param options
				 * @return {{datarows: String("="), settings: String("=")}}
				 */
				getScopeDefinition: function (options) {
					var scopeDefinition = {
						datarows: '=',
						settings: '='
					};

					for (var i = 0, length = options.length; i < length; i++) {
						scopeDefinition[options[i]] = '=' + options[i].toLowerCase();
					}

					return scopeDefinition;
				}
			}
		}
	]
)
/***
 *
 */
	.factory(
	'autoCompleteFactory',

		function (settingFactory) {
			return {
				parseAutoComplete: function (element, column, dataSet, propertyOnly) {

					column.source = function (query, process) {
						var container = $(element).find('.' + settingFactory.containerClassName),
							hotInstance = container.data('handsontable'),
							row = hotInstance.getSelected()[0];

						var data = dataSet[row];
						if (data) {
							var options = column.optionList;
							if(options.object) {
								var objKeys = options.object.split('.')
									,paramObject = data;

								while(objKeys.length > 0) {
									var key = objKeys.shift();
									paramObject = paramObject[key];
								}

								var source = [];
								if (propertyOnly) {
									for(var i = 0, length = paramObject.length; i < length; i++) {
										source.push(paramObject[i][options.property]);
									}
								} else{
									source = paramObject;
								}
								process(source);
							}
						}
					};
				}
			}
		}
);
angular.module('ngHandsontable.directives', [])
/***
 * Main Angular Handsontable directive
 */
	.directive(
	'hotTable',
	[
		'settingFactory',
		'autoCompleteFactory',
		'$rootScope',
		function (settingFactory, autoCompleteFactory, $rootScope) {
			var publicProperties = Object.keys(Handsontable.DefaultSettings.prototype),
				publicHooks = Object.keys(Handsontable.PluginHooks.hooks),
				htOptions = publicProperties.concat(publicHooks);

			return {
				restrict: 'EA',
				scope: settingFactory.getScopeDefinition(htOptions),
				controller: function ($scope) {
					this.setColumnSetting = function (column) {
						if (!$scope.htSettings) {
							$scope.htSettings = {};
						}
						if (!$scope.htSettings['columns']) {
							$scope.htSettings.columns = [];
						}
						$scope.htSettings['columns'].push(column);
					}
				},
				link: function (scope, element, attrs) {
					if (!scope.htSettings) {
						scope.htSettings = {};
					}
					scope.htSettings['data'] = scope.datarows;

					angular.extend(scope.htSettings, settingFactory.setHandsontableSettingsFromScope(htOptions, scope));

					if(scope.htSettings.columns) {
						for (var i = 0, length = scope.htSettings.columns.length; i < length; i++) {

							if (scope.htSettings.columns[i].type == 'autocomplete') {
								if(typeof scope.htSettings.columns[i].optionList === 'string'){
									var optionList = {};
									var match = scope.htSettings.columns[i].optionList.match(/^\s*(.+)\s+in\s+(.*)\s*$/);
									if (match) {
										optionList.property = match[1];
										optionList.object = match[2];
									} else {
										optionList.object = options;
									}
									scope.htSettings.columns[i].optionList = optionList;
								}

								autoCompleteFactory.parseAutoComplete(element, scope.htSettings.columns[i], scope.datarows, true);
							}
						}
					}

					scope.htSettings.afterChange = function () {
						if (!$rootScope.$$phase){
							scope.$apply();
						}
					};


					var columnSetting = attrs.columns;

					/***
					 * Check if settings has been changed
					 */
					scope.$parent.$watch(
						function () {

							var settingToCheck = scope.$parent;

							if (columnSetting) {
								var settingKeys = columnSetting.split('.');
								while (settingKeys.length > 0) {
									var key = settingKeys.shift();
									settingToCheck = settingToCheck[key];
								}
								return angular.toJson([settingToCheck]);
							}

						},
						function () {
							angular.extend(scope.htSettings, settingFactory.setHandsontableSettingsFromScope(htOptions, scope.$parent));
							settingFactory.updateHandsontableSettings(element, scope.htSettings);
						}
					);


					/***
					 * Check if data has been changed
					 */
					scope.$parent.$watch(
						function () {
							var objKeys = attrs.datarows.split('.'),
								objToCheck = scope.$parent;

							while(objKeys.length > 0) {
								var key = objKeys.shift();
								objToCheck = objToCheck[key];
							}

							return angular.toJson([objToCheck]);
						},
						function () {
							settingFactory.renderHandsontable(element);
						});

					settingFactory.initializeHandsontable(element, scope.htSettings);
				}
			}
		}
	]
)
/***
 * Angular Handsontable directive for single column settings
 */
	.directive(
	'hotColumn',
	[
		function () {
			return {
				restrict: 'E',
				require:'^hotTable',
				scope:{},
				controller: function ($scope) {
					this.setColumnOptionList = function (options) {
						if (!$scope.column) {
							$scope.column = {}
						}

						var optionList = {};
						var match = options.match(/^\s*(.+)\s+in\s+(.*)\s*$/);
						if (match) {
							optionList.property = match[1];
							optionList.object = match[2];
						} else {
							optionList.object = options;
						}
						$scope.column['optionList'] = optionList;
					}
				},
				link: function (scope, element, attributes, controllerInstance) {
					var column = {};

					for (var i in attributes) {
						if (attributes.hasOwnProperty(i)) {
							if (i.charAt(0) !== '$' && typeof column[i] === 'undefined') {
								if (i === 'data') {
									column['data'] = attributes[i];
								}
								else {
									column[i] = scope.$eval(attributes[i]);
								}
							}
						}
					}

					switch (column.type) {
						case 'checkbox':
							if (typeof attributes['checkedtemplate'] !== 'undefined') {
								column.checkedTemplate = scope.$eval(attributes['checkedtemplate']); //if undefined then defaults to Boolean true
							}
							if (typeof attributes['uncheckedtemplate'] !== 'undefined') {
								column.uncheckedTemplate = scope.$eval(attributes['uncheckedtemplate']); //if undefined then defaults to Boolean true
							}
							break;
					}

					if (typeof attributes.readonly !== 'undefined') {
						column.readOnly = true;
					}

					if (!scope.column) {
						scope.column = {};
					}

					angular.extend(scope.column, column);
					controllerInstance.setColumnSetting(scope.column);
				}
			}
		}
	]
)
/***
 * Angular Handsontable directive for autocomplete settings
 */
	.directive(
	'hotAutocomplete',
	[
		function () {
			return {
				restrict: 'E',
				scope: true,
				require:'^hotColumn',
				link: function (scope, element, attrs, controllerInstance) {
					var options = attrs.datarows;
					controllerInstance.setColumnOptionList(options);
				}
			}
		}
	]
)
;