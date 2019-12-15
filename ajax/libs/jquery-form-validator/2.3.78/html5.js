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
 * jQuery Form Validator Module: html5
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * The following module will make this jQuery plugin serve as a
 * html5 fallback. It makes older browsers support the following
 *  - validation when type="email"
 *  - validation when type="url"
 *  - validation when type="time"
 *  - validation when type="date"
 *  - validation when type="number" and max="" min=""
 *  - validation when pattern="REGEXP"
 *  - validation when using maxlength
 *  - Using datalist element for creating suggestions
 *  - placeholders
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function ($) {

  'use strict';

  $.formUtils.registerLoadedModule('html5');

  var SUPPORTS_PLACEHOLDER = 'placeholder' in document.createElement('INPUT'),
    SUPPORTS_DATALIST = 'options' in document.createElement('DATALIST'),
    hasLoadedDateModule = false,
    setupValidationUsingHTML5Attr = function ($form) {

      $form.each(function () {
        var $f = $(this),
          $formInputs = $f.find('input,textarea,select'),
          foundHtml5Rule = false;

        $formInputs.each(function () {
          var validation = [],
            $input = $(this),
            isRequired = $input.attr('required'),
            attrs = {};

          if (isRequired) {
            validation.push('required');
          }

          switch (($input.attr('type') || '').toLowerCase()) {
            case 'time':
              validation.push('time');
              if (!$.formUtils.validators.validate_date && !hasLoadedDateModule) {
                hasLoadedDateModule = true;
                $.formUtils.loadModules('date');
              }
              break;
            case 'url':
              validation.push('url');
              break;
            case 'email':
              validation.push('email');
              break;
            case 'date':
              validation.push('date');
              break;
            case 'number':
              validation.push('number');
              var max = $input.attr('max'),
                min = $input.attr('min'),
                step = $input.attr('step');
              if (min || max) {
                if (!min) {
                  min = '0';
                }
                if (!max) {
                  max = '9007199254740992'; // js max int
                }
                if (!step) {
                  step = '1'; // default value
                }

                attrs['data-validation-allowing'] = 'range[' + min + ';' + max + ']';
                if (min.indexOf('-') === 0 || max.indexOf('-') === 0) {
                  attrs['data-validation-allowing'] += ',negative';
                }
                if (min.indexOf('.') > -1 || max.indexOf('.') > -1 || step.indexOf('.') > -1) {
                  attrs['data-validation-allowing'] += ',float';
                }
              } else {
                attrs['data-validation-allowing'] += ',float,negative';
              }
              break;
          }

          if ($input.attr('pattern')) {
            validation.push('custom');
            attrs['data-validation-regexp'] = $input.attr('pattern');
          }
          if ($input.attr('maxlength')) {
            validation.push('length');
            attrs['data-validation-length'] = 'max' + $input.attr('maxlength');
          }

          if (!SUPPORTS_DATALIST && $input.attr('list')) {
            var suggestions = [],
              $list = $('#' + $input.attr('list'));

            $list.find('option').each(function () {
              suggestions.push($(this).text());
            });

            if (suggestions.length === 0) {
              // IE fix
              var opts = $.trim($('#' + $input.attr('list')).text()).split('\n');
              $.each(opts, function (i, option) {
                suggestions.push($.trim(option));
              });
            }

            $list.remove();

            $.formUtils.suggest($input, suggestions);
          }

          if (validation.length) {
            if (!isRequired) {
              attrs['data-validation-optional'] = 'true';
            }

            foundHtml5Rule = true;

            var validationRules = ($input.attr('data-validation') || '') + ' ' + validation.join(' ');
            $input.attr('data-validation', $.trim(validationRules));

            $.each(attrs, function (attrName, attrVal) {
              $input.attr(attrName, attrVal);
            });
          }
        });

        if (foundHtml5Rule) {
          $f.trigger('html5ValidationAttrsFound');
        }

        if (!SUPPORTS_PLACEHOLDER) {
          $formInputs.filter('input[placeholder]').each(function () {
            this.__defaultValue = this.getAttribute('placeholder');
            $(this)
              .bind('focus', function () {
                if (this.value === this.__defaultValue) {
                  this.value = '';
                  $(this).removeClass('showing-placeholder');
                }
              })
              .bind('blur', function () {
                if ($.trim(this.value) === '') {
                  this.value = this.__defaultValue;
                  $(this).addClass('showing-placeholder');
                }
              });
          });
        }

      });
    };

  $.formUtils.$win.bind('validatorsLoaded formValidationSetup', function (evt, $form) {
    if (!$form) {
      $form = $('form');
    }
    setupValidationUsingHTML5Attr($form);
  });

  // Make this method available outside the module
  $.formUtils.setupValidationUsingHTML5Attr = setupValidationUsingHTML5Attr;

})(jQuery, window);


}));
