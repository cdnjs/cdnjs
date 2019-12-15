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
 * jQuery Form Validator Module: Toggle Disabled
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * This module will take care of disabling/enabling submit buttons
 * in forms, depending on if the inputs of the form is valid or not.
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function($, window, undefined) {

  'use strict';

  $.formUtils.registerLoadedModule('toggleDisabled');

  // Function that can enable/disable form
  var toggleFormState = function($form, state) {
      if( state === 'disabled' ) {
        $form.find('*[type="submit"]')
          .addClass('disabled')
          .attr('disabled', 'disabled');
      } else {
        $form.find('*[type="submit"]')
          .removeClass('disabled')
          .removeAttr('disabled');
      }
    },
    isCheckingIfFormValid = false;

  $.formUtils.$win.bind('validatorsLoaded formValidationSetup', function(evt, $forms, conf) {

      var $formsToDisable = conf.disabledFormFilter ? $forms.filter(conf.disabledFormFilter) : $forms,
          showErrorDialogs = conf.showErrorDialogs === undefined || conf.showErrorDialogs,
          afterValidationCallback = function(evt, result, evtContext) {
            var $this = $(this);
            if (evtContext && evtContext.indexOf('blur') > -1) {
              $this.unbind('afterValidation', afterValidationCallback);
            } else {
              if (result.isValid) {
                $this.unbind('afterValidation', afterValidationCallback);
              } else if (!$this.valAttr('have-been-blurred')) {
                result.shouldChangeDisplay = false;
              }
            }
          };

      // Toggle form state depending on if it has only valid inputs or not.
      $formsToDisable
        .addClass(showErrorDialogs ? 'disabled-with-errors' : 'disabled-without-errors')
        .on('reset', function() {
          toggleFormState($(this), 'disabled');
        })
        .find('*[data-validation]')
          .valAttr('event','keyup change')
          .on('validation', function(evt, valid) {
            if (!isCheckingIfFormValid) {
              isCheckingIfFormValid = true;
              var $form = $(this).closest('form');
              if(valid && peekIfFormIsSuccessfullyValidated($form, this, conf)) {
                toggleFormState($form, 'enabled');
              } else {
                toggleFormState($form, 'disabled');
              }
              isCheckingIfFormValid = false;
            }
          })
          .on('afterValidation', afterValidationCallback)
          .on('blur', function() {
            $(this).valAttr('have-been-blurred', 1);
          })
          .each(function() {
            var $input = $(this),
              validationRules = $input.attr('data-validation');
            if (validationRules.indexOf('checkbox_group') > -1) {
              $input.closest('form').find('input[name="'+$input.attr('name')+'"]').each(function() {
                $(this).on('change', function() {
                  $input.validate();
                });
              });
            }
          });

      // Notice! Async validator can't be validated onkeyup
      $formsToDisable.find('[data-validation-async]').valAttr('event', 'change');

      // Make all inputs validated on keyup, require validateOnEvent in validation config
      toggleFormState($formsToDisable, 'disabled');

      $formsToDisable.validateOnEvent(conf.language, conf);

  })
  .on('validationErrorDisplay', function(evt, $input, $elem) {
      if ( $input.closest('form').hasClass('disabled-without-errors') ) {
        $elem.hide();
      }
  });

  // We want to peek at the form to check if all is valid, we don't want to trigger
  // the validators since that seems to cause unwanted side effects, that's hard to foresee
  function peekIfFormIsSuccessfullyValidated($form, excludeInputElement, config) {
    var allValid = true;
    $form.find('[data-validation]').each(function() {
      if (this !== excludeInputElement) {
        var $elem = $(this),
          hasSuccessfullyValidated = $elem.hasClass(config.successElementClass),
          isOptional = $elem.valAttr('optional') === 'true',
          isInvalid = $elem.hasClass(config.errorElementClass);
        if (isInvalid || (!hasSuccessfullyValidated && !isOptional)) {
          allValid = false;
          return false;
        }
      }
    });
    return allValid;
  }

})(jQuery, window);


}));
