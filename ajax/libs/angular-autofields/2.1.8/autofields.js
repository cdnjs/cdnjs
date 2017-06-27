/**
 * @license Autofields v2.1.8
 * (c) 2014 Justin Maier http://justmaier.github.io/angular-autoFields-bootstrap
 * License: MIT
 */
'use strict';

/**
 * @ngdoc overview
 * @name autofields
 * Core provider and directive for autofields
 */
angular.module('autofields.core', [])
	.provider('$autofields', function(){
		var autofields = {};

		// Helper Methods
		var helper = {
			CamelToTitle: function (str) {
				return str
				.replace(/([A-Z])/g, ' $1')
				.replace(/^./, function (str) { return str.toUpperCase(); });
			},
			CamelToDash: function (str) {
				return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			},
			LabelText: function(field) {
				return field.label || helper.CamelToTitle(field.property);
			}
		};

		// Directive-wide Handler Default Settings
		autofields.settings = {
			classes: {
				container: [],
				input: [],
				label: []
			},
			attributes: {
				container: {
					'class': '$type'
				},
				input: {
					id: '$property_clean',
					name: '$property_clean',
					type: '$type',
					ngModel: '$data.$property',
					placeholder: '$placeholder'
				},
				label: {}
			},
			container: '<div class="autofields" ng-form name="$form"></div>',
			scope: {}
		};

		// Field Building Helpers
		// Add Attributes to Element
		var setAttributes = autofields.setAttributes = function(directive, field, el, attrs){
			angular.forEach(attrs, function(value, attr){
				if(value && typeof value == 'string'){
					value = value
						.replace(/\$form/g, directive.formStr)
						.replace(/\$schema/g, directive.schemaStr)
						.replace(/\$type/g, field.type || 'text')
						.replace(/\$property_clean/g, field.property.replace(/\[|\]|\./g, ''))
						.replace(/\$property/g, field.property)
						.replace(/\$data/g, directive.dataStr)
						.replace(/\$placeholder/g, field.placeholder != null ? field.placeholder : helper.LabelText(field));
				}
				el.attr(helper.CamelToDash(attr), value);
			});
		};
		// Standard Container for field
		var getFieldContainer = function(directive, field, attrs){
			var fieldContainer = angular.element('<div/>');
			attrs = angular.extend({}, autofields.settings.attributes.container, attrs);
			setAttributes(directive, field, fieldContainer, attrs);
			fieldContainer.addClass((directive.options||autofields.settings).classes.container.join(' '));

			return fieldContainer;
		};
		// Standard Label for field
		var getLabel = function(directive, field, attrs){
			var label = angular.element('<label/>');
			attrs = angular.extend({}, autofields.settings.attributes.label, attrs);
			setAttributes(directive, field, label, attrs);
			label.addClass((directive.options||autofields.settings).classes.label.join(' '));
			label.html(helper.LabelText(field));

			return label;
		}
		// Standard Input for field
		var getInput = function(directive, field, html, attrs){
			var input = angular.element(html);
			attrs = angular.extend({}, autofields.settings.attributes.input, attrs, field.attr);
			setAttributes(directive, field, input, attrs);
			input.addClass((directive.options||autofields.settings).classes.input.join(' '));

			return input;
		}
		// Standard Field
		autofields.field = function(directive, field, html, attrs){
			var fieldElements = {
				fieldContainer: getFieldContainer(directive, field),
				label: field.label != '' ? getLabel(directive, field) : null,
				input: getInput(directive, field, html, attrs)
			};
			fieldElements.fieldContainer.append(fieldElements.label).append(fieldElements.input);

			// Run Mutators
			var mutatorsRun = [];
			angular.forEach(mutators, function(mutator, key){
				fieldElements = mutator(directive, field, fieldElements, mutatorsRun);
				mutatorsRun.push(key);
			});

			return fieldElements;
		}

		// Update scope with items attached in settings
		autofields.updateScope = function(scope){
			angular.forEach(autofields.settings.scope, function(value, property){
				if(typeof value == 'function'){
					scope[property] = function(){
						var args = Array.prototype.slice.call(arguments, 0);
						args.unshift(scope);
						value.apply(this, args);
					}
				}else{
					scope[property] = value;
				}
			})
		}

		// Handler Container
		var handlers = {};

		// Hook for handlers
		autofields.registerHandler = function(types, fn){
			types = Array.isArray(types) ? types : [types];
			angular.forEach(types, function(type){
				handlers[type] = fn;
			});
		}

		// Mutator Container
		var mutators = {};

		// Hook for mutators
		autofields.registerMutator = function(key, fn, options){
			if(!mutators[key] || options.override){
				mutators[key] = function(directive, field, fieldElements, mutatorsRun){
					if(options && typeof options.require == 'string' && mutatorsRun.indexOf(options.require) == -1){
						fieldElements = mutators[options.require];
					}
					if(mutatorsRun.indexOf(key) == -1) return fn(directive, field, fieldElements);
				}
			}
		}

		// Field Builder
		autofields.createField = function(directive, field, index){
			var handler = field.type == null ? handlers.text : handlers[field.type];
			if(handler == null){
				console.warn(field.type+' not supported - field ignored');
				return;
			}
			return handler(directive, field, index);
		};

		autofields.$get = function(){
			return {
				settings: autofields.settings,
				createField: autofields.createField,
				updateScope: autofields.updateScope
			};
		};

		return autofields;
	})
	.directive('autoFields', ['$autofields','$compile', function($autofields, $compile){
		return {
			restrict: 'E',
			priority: 1,
			replace: true,
			compile: function(){
				return function ($scope, $element, $attr) {
					// Scope Hooks
					var directive = {
						schemaStr: $attr.fields || $attr.autoFields,
						optionsStr: $attr.options,
						dataStr: $attr.data,
						formStr: $attr.form || 'autofields',
						classes: $attr['class'],
						container: null,
						formScope: null
					};

					//Helper Functions
					var helper = {
						extendDeep: function(dst) {
							angular.forEach(arguments, function(obj) {
								if (obj !== dst) {
									angular.forEach(obj, function(value, key) {
										if (dst[key] && dst[key].constructor && dst[key].constructor === Object) {
											helper.extendDeep(dst[key], value);
										} else {
											dst[key] = value;
										}
									});
								}
							});
							return dst;
						}
					};

					// Import Directive-wide Handler Default Settings Import
					directive.options = angular.copy($autofields.settings);

					// Build fields from schema using handlers
					var build = function(schema){
						schema = schema || $scope[directive.schemaStr];

						// Create HTML
						directive.container.html('');
						angular.forEach(schema, function(field, index){
							var fieldEl = $autofields.createField(directive, field, index);
							directive.container.append(fieldEl);
						});

						// Create Scope
						if(directive.formScope != null) directive.formScope.$destroy();
						directive.formScope = $scope.$new();
						directive.formScope.data = $scope[directive.dataStr];
						directive.formScope.fields = schema;
						$autofields.updateScope(directive.formScope);

						// Compile Element with Scope
						$compile(directive.container)(directive.formScope);
					};

					// Init and Watch
					$scope.$watch(directive.optionsStr, function (newOptions, oldOptions) {
						helper.extendDeep(directive.options, newOptions);
						if(newOptions !== oldOptions) build();
					}, true);
					$scope.$watch(directive.schemaStr, function (schema) {
						build(schema);
					}, true);
					$scope.$watch(directive.formStr, function (form) {
						directive.container.attr('name',directive.formStr);
					});
					$scope.$watch(function(){return $attr['class'];}, function (form) {
						directive.classes = $attr['class'];
						directive.container.attr('class', directive.classes);
					});

					directive.container = angular.element(directive.options.container);
					directive.container.attr('name',directive.formStr);
					directive.container.attr('class',directive.classes);
					$element.replaceWith(directive.container);
				}
			}
		}
	}]);

/**
 * @ngdoc overview
 * @name autofields.standard
 * Standard input fields for autofields
 */
angular.module('autofields.standard',['autofields.core'])
	.config(['$autofieldsProvider', function($autofieldsProvider){
		// Text Field Handler
		$autofieldsProvider.settings.fixUrl = true;
		$autofieldsProvider.registerHandler(['text','email','url','date','number','password'], function(directive, field, index){
			var fieldElements = $autofieldsProvider.field(directive, field, '<input/>');

			var fixUrl = (field.fixUrl ? field.fixUrl : directive.options.fixUrl);
			if(field.type == 'url' && fixUrl) fieldElements.input.attr('fix-url','');

			return fieldElements.fieldContainer;
		});

		// Select Field Handler
		$autofieldsProvider.settings.defaultOption = 'Select One';
		$autofieldsProvider.registerHandler('select', function(directive, field, index){
			var defaultOption = (field.defaultOption ? field.defaultOption : directive.options.defaultOption);

			var inputHtml = '<select><option value="">'+defaultOption+'</option></select>';
			var inputAttrs = {
				ngOptions: field.list
			};

			var fieldElements = $autofieldsProvider.field(directive, field, inputHtml, inputAttrs);

			return fieldElements.fieldContainer;
		});

		//Textarea Field Handler
		$autofieldsProvider.settings.textareaRows = 3;
		$autofieldsProvider.registerHandler('textarea', function(directive, field, index){
			var rows = field.rows ? field.rows : directive.options.textareaRows;
			var fieldElements = $autofieldsProvider.field(directive, field, '<textarea/>', {rows: rows});

			return fieldElements.fieldContainer;
		});

		//Checkbox Field Handler
		$autofieldsProvider.registerHandler('checkbox', function(directive, field, index){
			var fieldElements = $autofieldsProvider.field(directive, field, '<input/>');

			if(fieldElements.label) fieldElements.label.prepend(fieldElements.input);

			return fieldElements.fieldContainer;
		});

		// Register Hide/Show Support
		$autofieldsProvider.settings.displayAttributes = ($autofieldsProvider.settings.displayAttributes || []).concat(['ng-if', 'ng-show', 'ng-hide']);
		$autofieldsProvider.registerMutator('displayAttributes',function(directive, field, fieldElements){
			if(!field.attr) return fieldElements;

			// Check for presence of each display attribute
			angular.forEach($autofieldsProvider.settings.displayAttributes, function(attr){
				var value = fieldElements.input.attr(attr);

				// Stop if field doesn't have attribute
				if(!value) return;

				// Move attribute to parent
				fieldElements.fieldContainer.attr(attr, value);
				fieldElements.input.removeAttr(attr);
			});

			return fieldElements;
		});
	}])
	.directive('fixUrl', [function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attr, ngModel) {
				var urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.\-\?\=\&]*)$/i;

				//Render formatters on blur...
				var render = function () {
					var viewValue = ngModel.$modelValue;
					if (viewValue == null) return;
					angular.forEach(ngModel.$formatters, function (formatter) {
						viewValue = formatter(viewValue);
					})
					ngModel.$viewValue = viewValue;
					ngModel.$render();
				};
				element.bind('blur', render);

				var formatUrl = function (value) {
					var test = urlRegex.test(value);
					if (test) {
						var matches = value.match(urlRegex);
						var reformatted = (matches[1] != null && matches[1] != '') ? matches[1] : 'http://';
						reformatted += matches[2] + '.' + matches[3];
						if (typeof matches[4] != "undefined") reformatted += matches[4]
						value = reformatted;
					}
					return value;
				}
				ngModel.$formatters.push(formatUrl);
				ngModel.$parsers.unshift(formatUrl);
			}
		};
	}]);

/**
 * @ngdoc overview
 * @name autofields.validation
 * Validation hooks for autofields
 */
angular.module('autofields.validation', ['autofields.core'])
	.config(['$autofieldsProvider', function($autofieldsProvider){
		var helper = {
			CamelToTitle: function (str) {
				return str
				.replace(/([A-Z])/g, ' $1')
				.replace(/^./, function (str) { return str.toUpperCase(); });
			}
		};

		// Add Validation Settings
		$autofieldsProvider.settings.validation = {
			enabled: true,
			showMessages: true,
			defaultMsgs: {
				required: 'This field is required',
				minlength: 'This is under minimum length',
				maxlength: 'This exceeds maximum length',
				min: 'This is under the minumum value',
				max: 'This exceeds the maximum value',
				email: 'This is not a valid email address',
				valid: ''
			},
			invalid: '$form.$property_clean.$invalid && $form.$property_clean.$dirty',
			valid: '$form.$property_clean.$valid'
		};

		// Add Validation Attributes
		$autofieldsProvider.settings.attributes.container.ngClass = "{'invalid':"+$autofieldsProvider.settings.validation.invalid+", 'valid':"+$autofieldsProvider.settings.validation.valid+"}";

		// Add Validation Mutator
		$autofieldsProvider.registerMutator('validation', function(directive, field, fieldElements){
			//Check to see if validation should be added
			fieldElements.validation = directive.options.validation.enabled && field.validate !== false;
			if(!fieldElements.validation){
				//If not enabled, remove validation hooks
				fieldElements.fieldContainer.removeAttr('ng-class');
				return fieldElements;
			}

			// Get Error Messages
			fieldElements.msgs = [];
			if(!directive.options.validation.showMessages) return fieldElements;
			angular.forEach(angular.extend({}, directive.options.validation.defaultMsgs, field.msgs), function(message, error){
				if(
					(field.msgs && field.msgs[error] != null) ||
					(field.type == error) ||
					(field.attr &&
						(field.attr[error] != null ||
						field.attr['ng'+helper.CamelToTitle(error)] != null)
					)
				){
					var $property_clean  = field.property.replace(/\[|\]|\./g, '');
          				fieldElements.msgs.push('('+directive.formStr+'.'+$property_clean+'.$error.'+error+'? \''+message+'\' : \'\')');
				}
			});
			// Get Valid Message
			fieldElements.validMsg = (field.msgs && field.msgs.valid)? field.msgs.valid : directive.options.validation.defaultMsgs.valid;

			// Add validation attributes
			if(fieldElements.msgs.length){
				// Add message display with ng-show/ng-hide
				// using a mutator that requires 'validation'
			}

			return fieldElements;
		});
	}]);

angular.module('autofields',['autofields.standard','autofields.validation']);
angular.module('autoFields',['autofields']); // Deprecated module name
