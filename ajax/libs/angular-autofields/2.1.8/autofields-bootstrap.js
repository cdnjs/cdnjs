/**
 * @license Autofields v2.1.8
 * (c) 2014 Justin Maier http://justmaier.github.io/angular-autoFields-bootstrap
 * License: MIT
 */
'use strict';

/**
 * @ngdoc overview
 * @name autofields.bootstrap
 * Adds bootstrap classes and support for bootstrap fields
 */
angular.module('autofields.bootstrap', ['autofields.standard','ui.bootstrap'])
	.config(['$autofieldsProvider', function($autofieldsProvider){
		// Add Bootstrap classes
		$autofieldsProvider.settings.classes.container.push('form-group');
		$autofieldsProvider.settings.classes.input.push('form-control');
		$autofieldsProvider.settings.classes.label.push('control-label');

		// Override Checkbox Field Handler
		$autofieldsProvider.registerHandler('checkbox', function(directive, field, index){
			var fieldElements = $autofieldsProvider.field(directive, field, '<input/>');

			if(fieldElements.label) fieldElements.label.prepend(fieldElements.input);
			fieldElements.input.removeClass('form-control');

			return fieldElements.fieldContainer;
		});

		// Date Handler with Bootstrap Popover
		$autofieldsProvider.settings.dateSettings = {
			showWeeks:false,
			datepickerPopup: 'MMMM dd, yyyy'
		};
		$autofieldsProvider.settings.scope.datepickerOptions = {
			showWeeks:false
		};
		$autofieldsProvider.settings.scope.openCalendar = function($scope, property, e){
			e.preventDefault();
			e.stopPropagation();

			$scope[property] = !$scope[property];
		};
		$autofieldsProvider.registerHandler('date', function(directive, field, index){
			var showWeeks = field.showWeeks ? field.showWeeks : directive.options.dateSettings.showWeeks;
			var datepickerPopup = field.datepickerPopup ? field.datepickerPopup : directive.options.dateSettings.datepickerPopup;

			var inputAttrs = {
				type:'text',
				showWeeks: showWeeks,
				datepickerPopup: datepickerPopup,
				datepickerOptions: 'datepickerOptions',
				isOpen: '$property_cleanOpen'
			};

			if (!(field.attr && field.attr.disabled == true)) {
				field.$addons = [{
					button: true,
					icon: 'glyphicon glyphicon-calendar',
					attr: { ngClick: 'openCalendar("$property_cleanOpen",$event)' }
				}];
			}

			var fieldElements = $autofieldsProvider.field(directive, field, '<input/>', inputAttrs);

			return fieldElements.fieldContainer;
		});

		// Static Field Handler
		$autofieldsProvider.registerHandler('static', function(directive, field, index){
			var showWeeks = field.showWeeks ? field.showWeeks : directive.options.dateSettings.showWeeks;
			var datepickerPopup = field.datepickerPopup ? field.datepickerPopup : directive.options.dateSettings.datepickerPopup;

			var fieldElements = $autofieldsProvider.field(directive, field, '<p/>');

			//Remove Classes & Attributes
			var input = angular.element('<p/>');
			input.attr('ng-bind', fieldElements.input.attr('ng-model'));
			input.addClass('form-control-static');
			fieldElements.input.replaceWith(input);
			
			return fieldElements.fieldContainer;
		});

		// Multiple Per Row Handler
		$autofieldsProvider.settings.classes.row = $autofieldsProvider.settings.classes.row || [];
		$autofieldsProvider.settings.classes.row.push('row');
		$autofieldsProvider.settings.classes.col = $autofieldsProvider.settings.classes.col || [];
		$autofieldsProvider.settings.classes.col.push('col-sm-$size');
		$autofieldsProvider.settings.classes.colOffset = $autofieldsProvider.settings.classes.colOffset || [];
		$autofieldsProvider.settings.classes.colOffset.push('col-sm-offset-$size');
		$autofieldsProvider.registerHandler('multiple', function(directive, field, index){
			var row = angular.element('<div/>');
			row.addClass(directive.options.classes.row.join(' '));

			angular.forEach(field.fields, function(cell, cellIndex){
				var cellContainer = angular.element('<div/>')
				var cellSize = cell.type != 'multiple' ? cell.columns || field.columns : field.columns;
				cellContainer.addClass(directive.options.classes.col.join(' ').replace(/\$size/g,cellSize));

				cellContainer.append($autofieldsProvider.createField(directive, cell, cellIndex));

				row.append(cellContainer);
			})

			return row;
		});

		// Register Help Block Support
		$autofieldsProvider.settings.classes.helpBlock = $autofieldsProvider.settings.classes.helpBlock || [];
		$autofieldsProvider.settings.classes.helpBlock.push('help-block');
		$autofieldsProvider.registerMutator('helpBlock', function(directive, field, fieldElements){
			if(!field.help) return fieldElements;
			
			fieldElements.helpBlock = angular.element('<p/>');
			fieldElements.helpBlock.addClass(directive.options.classes.helpBlock.join(' '))
			fieldElements.helpBlock.html(field.help);
			fieldElements.fieldContainer.append(fieldElements.helpBlock);

			return fieldElements;
		});

		// Register Addon Support
		$autofieldsProvider.settings.classes.inputGroup = ['input-group'];
		$autofieldsProvider.settings.classes.inputGroupAddon = ['input-group-addon'];
		$autofieldsProvider.settings.classes.inputGroupAddonButton = ['input-group-btn'];
		$autofieldsProvider.settings.classes.button = ['btn','btn-default'];
		$autofieldsProvider.registerMutator('addons', function(directive, field, fieldElements){
			if(!(field.$addons || field.addons)) return fieldElements;

			fieldElements.inputGroup = angular.element('<div/>');
			fieldElements.inputGroup.addClass($autofieldsProvider.settings.classes.inputGroup.join(' '));

			var toAppend = [];
			angular.forEach(field.$addons || field.addons, function(addon){
				var inputGroupAddon = angular.element('<span/>'),
					button = null;
				inputGroupAddon.addClass($autofieldsProvider.settings.classes.inputGroupAddon.join(' '));

				if(addon.button){
					inputGroupAddon.attr('class',$autofieldsProvider.settings.classes.inputGroupAddonButton.join(' '));
					button = angular.element('<button type="button"/>');
					button.addClass($autofieldsProvider.settings.classes.button.join(' '));
					inputGroupAddon.append(button);
				}
				if(addon.icon != null){
					var icon = angular.element('<i/>');
					icon.addClass(addon.icon);
					(button||inputGroupAddon).append(icon);
				}
				if(addon.content != null) (button||inputGroupAddon).html(addon.content);
				if(addon.attr) $autofieldsProvider.setAttributes(directive, field, (button||inputGroupAddon), addon.attr);

				if(addon.before) fieldElements.inputGroup.append(inputGroupAddon);
				else toAppend.push(inputGroupAddon);
			})

			fieldElements.inputGroup.append(fieldElements.input);
			angular.forEach(toAppend, function(el){fieldElements.inputGroup.append(el)});

			fieldElements.fieldContainer.append(fieldElements.inputGroup);
			return fieldElements;
		})

		// Register Horizontal Form Support
		$autofieldsProvider.settings.layout = {
			type: 'basic',
			labelSize: 2,
			inputSize: 10
		};
		$autofieldsProvider.registerMutator('horizontalForm', function(directive, field, fieldElements){
			if(!(directive.options.layout && directive.options.layout.type == 'horizontal')){
				directive.container.removeClass('form-horizontal');
				return fieldElements;
			}

			// Classes & sizing
			var col = $autofieldsProvider.settings.classes.col[0];
			var colOffset = $autofieldsProvider.settings.classes.colOffset[0];
			var labelSize = field.labelSize ? field.labelSize : directive.options.layout.labelSize;
			var inputSize = field.inputSize ? field.inputSize : directive.options.layout.inputSize;
			
			//Add class to container
			directive.container.addClass('form-horizontal');

			// Add input container & sizing class
			var inputContainer = angular.element('<div/>');
			inputContainer.addClass(col.replace(/\$size/gi, inputSize));
			

			// Add label sizing class
			if(fieldElements.label && field.type != 'checkbox'){
				fieldElements.label.addClass(col.replace(/\$size/gi, labelSize));
				fieldElements.label.after(inputContainer);
			}else{
				fieldElements.fieldContainer.prepend(inputContainer);
				inputContainer.addClass(colOffset.replace(/\$size/g,labelSize));
			}

			// Add input container sizing class
			if(field.type == 'checkbox'){
				fieldElements.fieldContainer.removeClass('checkbox');
				var checkboxContainer = angular.element('<div/>');
				checkboxContainer.addClass('checkbox');
				checkboxContainer.append(fieldElements.label);
				inputContainer.append(checkboxContainer);
			}else{
				inputContainer.append(fieldElements.inputGroup || fieldElements.input);
			}


			// Move Help Block
			if(field.help){
				inputContainer.append(fieldElements.helpBlock);
			}

			return fieldElements;
		}, {require:'helpBlock'});
	}]);

/**
 * @ngdoc overview
 * @name autofields.bootstrap.validation
 * Uses autofields validation hooks to display
 * validation popovers and highlight valid/invalid fields
 */
angular.module('autofields.bootstrap.validation',['autofields.validation'])
	.config(['$tooltipProvider', function($tooltipProvider){
		$tooltipProvider.setTriggers({'keyup focus':'blur'});
		$tooltipProvider.options({
			placement:'top',
			animation:false
		});
	}])
	.config(['$autofieldsProvider', function($autofieldsProvider){
		// Add Validation Attributes
		$autofieldsProvider.settings.attributes.container.ngClass = "{'has-error':"+$autofieldsProvider.settings.validation.invalid+", 'has-success':"+$autofieldsProvider.settings.validation.valid+"}";
		$autofieldsProvider.settings.attributes.input.popover = "{{("+$autofieldsProvider.settings.validation.valid+") ? '$validMsg' : ($errorMsgs)}}";

		// Dont show popovers on these types
		// this is to avoid multiple scope errors with UI Bootstrap
		$autofieldsProvider.settings.noPopover = ['date'];

		// Validation Mutator
		$autofieldsProvider.registerMutator('bootstrap-validation', function(directive, field, fieldElements){
			//Check to see if validation should be added
			if(!fieldElements.validation || $autofieldsProvider.settings.noPopover.indexOf(field.type) != -1){
				//If not enabled, remove validation hooks
				fieldElements.input.removeAttr('popover');
				return fieldElements;
			}

			// Add validation attributes
			if(fieldElements.msgs.length){
				var popoverAttr = fieldElements.input.attr('popover')
									.replace(/\$validMsg/gi, fieldElements.validMsg)
									.replace(/\$errorMsgs/gi, fieldElements.msgs.join('+'));
				fieldElements.input.attr({
					'popover-trigger':'keyup focus',
					'popover':popoverAttr
				});
			}else{
				fieldElements.input.removeAttr('popover');
			}

			return fieldElements;
		}, {require:'validation', override:true});
	}]);

angular.module('autofields',['autofields.bootstrap','autofields.bootstrap.validation']);
