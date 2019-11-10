(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

/**
 * jQuery Form Validator Module: Logic
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * - data-validation-depends-on
 * - data-validation-if-answered
 *
 * @website http://formvalidator.net/#logic
 * @license MIT
 */
(function($) {

	'use strict';

  $.formUtils.registerLoadedModule('logic');

  var setupValidationDependsOn = function($form, conf) {

      var dependingOnBeforeValidation = function() {

          var $input = $(this),
            nameOfDependingInput = $input.valAttr('depends-on') || $input.valAttr('if-checked');

          // Whether or not this input should be validated depends on if another input has a value
          if (nameOfDependingInput) {

            // Set the boolean telling us that the validation depends
            // on another input being checked
            var valueOfDependingInput = $.formUtils.getValue('[name="' + nameOfDependingInput + '"]', $form),
              listWithRequiredValues = $.split($input.valAttr('depends-on-value'), false, false),
              dependingInputIsMissingValueOrHasIncorrectValue = !valueOfDependingInput || (
                  listWithRequiredValues.length &&
                    !valueIsInList(valueOfDependingInput, listWithRequiredValues)
                );

            if (dependingInputIsMissingValueOrHasIncorrectValue) {
              $input.valAttr('skipped', '1');
            }
          }
        },
        valueIsInList = function(value, valueList) {
          var isInList = false,
            lowerCaseValue = value.toLocaleLowerCase();

          $.each(valueList, function(i, otherValue) {
            if (lowerCaseValue === otherValue.toLocaleLowerCase()) {
              isInList = true;
              return false;
            }
          });
          return isInList;
        },
        dependingOnValueChanged = function() {
          var $input = $(this),
            inputValue = $.formUtils.getValue($input),
            requiredValueOfDependingInput = $input.valAttr('depending-value');
          $.each(this.dependingInputs, function (i, $otherInput) {
            var otherInputHasValue = $.formUtils.getValue($otherInput) ? true:false,
              dependingInputIsMissingValueOrHasIncorrectValue = !inputValue || (
                  requiredValueOfDependingInput &&
                  requiredValueOfDependingInput !== inputValue
                );

            if (dependingInputIsMissingValueOrHasIncorrectValue && !otherInputHasValue) {
              $.formUtils.dialogs.removeInputStylingAndMessage($otherInput, conf);
            }
          });
        };

      $form.find('[data-validation-depends-on]')
        .off('beforeValidation', dependingOnBeforeValidation)
        .on('beforeValidation', dependingOnBeforeValidation)
        .each(function() {
          // Remove validation when on depending input
          var $dependingInput = $(this);
          $form.find('[name="'+$dependingInput.valAttr('depends-on')+'"]').each(function() {
            $(this)
              .off('change', dependingOnValueChanged)
              .on('change', dependingOnValueChanged)
              .valAttr('depending-value', $dependingInput.valAttr('depends-on-value'));

            this.dependingInputs = this.dependingInputs || [];
            this.dependingInputs.push($dependingInput);
          });
        });

    },
    setupValidationTogetherWith = function($form, conf) {

      var optionalBeforeValidation = function() {
          var $input = $(this),
            dependingInputs = $input.valAttr('optional-if-answered'),
            dependingInputsHasValue = false,
            thisInputHasAnswer = $.formUtils.getValue($input) ? true:false;

          if (!thisInputHasAnswer) {
            $.each($.split(dependingInputs), function(i, inputName) {
              var $dependingInput = $form.find('[name="'+inputName+'"]');
              dependingInputsHasValue = $.formUtils.getValue($dependingInput) ? true:false;
              if (dependingInputsHasValue) {
                return false;
              }
            });

            if (dependingInputsHasValue) {
              $input.valAttr('skipped', 1);
            }
          }
        },
        optionalInputOnChange = function() {
          var $input = $(this),
            dependingInputs = $input.valAttr('optional-if-answered');

          $.each($.split(dependingInputs), function(i, inputName) {
            var $dependingInput = $form.find('[name="'+inputName+'"]'),
                dependingInputsHasValue = $.formUtils.getValue($dependingInput) ? true:false;
            if (!dependingInputsHasValue) {
              $.formUtils.dialogs.removeInputStylingAndMessage($dependingInput, conf);
            }
          });
        };

      $form.find('[data-validation-optional-if-answered]')
        .off('beforeValidation', optionalBeforeValidation)
        .on('beforeValidation', optionalBeforeValidation)
        .each(function() {
          $(this)
            .off('change', optionalInputOnChange)
            .on('change', optionalInputOnChange);
        });
    };

  $.formUtils.$win.bind('validatorsLoaded formValidationSetup', function(evt, $form, conf) {
    if( !$form ) {
      $form = $('form');
    }
    setupValidationDependsOn($form, conf);
    setupValidationTogetherWith($form, conf);
  });

})(jQuery);


}));
