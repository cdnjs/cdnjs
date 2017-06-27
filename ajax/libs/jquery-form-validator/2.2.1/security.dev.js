/**
 * jQuery Form Validator Module: Security
 * ------------------------------------------
 * Created by Victor Jonsson <http://victorjonsson.se>
 *
 * This module adds validators typically used in registration forms.
 * This module adds the following validators:
 *  - spamcheck
 *  - confirmation
 *  - strength
 *  - backend
 *  - credit card
 *  - cvv
 *
 * @website http://formvalidator.net/#security-validators
 * @version 2.2.1
 */
(function($, window) {

    'use strict';

    /*
     * Simple spam check
     */
    $.formUtils.addValidator({
        name : 'spamcheck',
        validatorFunction : function(val, $el, config) {
            var attr = $el.valAttr('captcha');
            return attr === val;
        },
        errorMessage : '',
        errorMessageKey: 'badSecurityAnswer'
    });


    /*
     * Validate confirmation
     */
    $.formUtils.addValidator({
        name : 'confirmation',
        validatorFunction : function(value, $el, config, language, $form) {
            var conf = '',
                confInputName = $el.valAttr('confirm') || ($el.attr('name') + '_confirmation'),
                confInput = $form.find('input[name="' +confInputName+ '"]').eq(0);

            if (confInput) {
                conf = confInput.val();
            } else {
                alert('Could not find an input with name "'+confInputName+'"');
            }

            return value === conf;
        },
        errorMessage : '',
        errorMessageKey: 'notConfirmed'
    });

    var creditCards = {
            'amex' : [15,15],
            'diners_club' : [14,14],
            'cjb' : [16,16],
            'laser' : [16,19],
            'visa' : [16,16],
            'mastercard' : [16,16],
            'maestro' : [12,19],
            'discover' : [16,16]
        },
        checkOnlyAmex = false,
        allowsAmex = false;

    /*
     * Credit card
     */
    $.formUtils.addValidator({
        name : 'creditcard',
        validatorFunction : function(value, $el, config, language, $form) {
            var allowing = $.split( $el.valAttr('allowing') || '' );

            // Setup for cvv validation
            allowsAmex = $.inArray('amex', allowing) > -1;
            checkOnlyAmex = allowsAmex && allowing.length == 1;

            // Correct length
            if( allowing.length > 0 ) {
                var hasValidLength = false;
                $.each(allowing, function(i, cardName) {
                    if( cardName in creditCards) {
                        if( value.length >= creditCards[cardName][0] && value.length <= creditCards[cardName][1]) {
                            hasValidLength = true;
                            return false;
                        }
                    } else if( window.console ) {
                        console.warn('Use of unknown credit card "'+cardName+'"');
                    }
                });

                if( !hasValidLength )
                    return false;
            }

            // only numbers
            if( value.replace(new RegExp('[0-9]', 'g'), '') !== '' ) {
                return false
            }

            // http://en.wikipedia.org/wiki/Luhn_algorithm
            // http://www.brainjar.com/js/validation/default2.asp
            var checkSum = 0;
            $.each(value.split('').reverse(), function(i, digit) {
                digit = parseInt(digit, 10);
                if( i%2 === 0 ) {
                    checkSum += digit;
                } else {
                    digit *= 2;
                    if (digit < 10) {
                        checkSum += digit;
                    } else {
                        checkSum += digit - 9;
                    }
                }
            });
            return checkSum % 10 === 0;
        },
        errorMessage : '',
        errorMessageKey: 'badCreditCard'
    });


    /*
     * Credit card number
     */
    $.formUtils.addValidator({
        name : 'cvv',
        validatorFunction : function(val) {
            if( val.replace(/[0-9]/g, '') === '' ) {
                val = val + '';
                if( checkOnlyAmex ) {
                    return val.length == 4;
                } else if( allowsAmex ) {
                    return val.length == 3 || val.length == 4;
                } else {
                    return val.length == 3;
                }
            }
            return false;
        },
        errorMessage : '',
        errorMessageKey: 'badCVV'
    });

    /*
     * Validate password strength
     */
    $.formUtils.addValidator({
        name : 'strength',
        validatorFunction : function(val, $el, conf) {
            var requiredStrength = $el.valAttr('strength') || 2;
            if(requiredStrength && requiredStrength > 3)
                requiredStrength = 3;

            return $.formUtils.validators.validate_strength.calculatePasswordStrength(val) >= requiredStrength;
        },
        errorMessage : '',
        errorMessageKey: 'badStrength',

        /**
         * Code more or less borrowed from jQuery plugin "Password Strength Meter"
         * written by Darren Mason (djmason9@gmail.com), myPocket technologies (www.mypocket-technologies.com)
         * @param {String} password
         * @return {Number}
         */
        calculatePasswordStrength : function(password) {

            if (password.length < 4) {
                return 0;
            }

            var score = 0;

            var checkRepetition = function (pLen, str) {
                var res = "";
                for (var i = 0; i < str.length; i++) {
                    var repeated = true;

                    for (var j = 0; j < pLen && (j + i + pLen) < str.length; j++) {
                        repeated = repeated && (str.charAt(j + i) == str.charAt(j + i + pLen));
                    }
                    if (j < pLen) {
                        repeated = false;
                    }
                    if (repeated) {
                        i += pLen - 1;
                        repeated = false;
                    }
                    else {
                        res += str.charAt(i);
                    }
                }
                return res;
            };

            //password length
            score += password.length * 4;
            score += ( checkRepetition(1, password).length - password.length ) * 1;
            score += ( checkRepetition(2, password).length - password.length ) * 1;
            score += ( checkRepetition(3, password).length - password.length ) * 1;
            score += ( checkRepetition(4, password).length - password.length ) * 1;

            //password has 3 numbers
            if (password.match(/(.*[0-9].*[0-9].*[0-9])/)) {
                score += 5;
            }

            //password has 2 symbols
            if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
                score += 5;
            }

            //password has Upper and Lower chars
            if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                score += 10;
            }

            //password has number and chars
            if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
                score += 15;
            }
            //
            //password has number and symbol
            if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)) {
                score += 15;
            }

            //password has char and symbol
            if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)) {
                score += 15;
            }

            //password is just a numbers or chars
            if (password.match(/^\w+$/) || password.match(/^\d+$/)) {
                score -= 10;
            }

            //verifying 0 < score < 100
            if (score < 0) {
                score = 0;
            }
            if (score > 100) {
                score = 100;
            }

            if (score < 20) {
                return 0;
            }
            else if (score < 40) {
                return 1;
            }
            else if(score <= 60) {
                return 2;
            }
            else {
                return 3;
            }
        },

        strengthDisplay : function($el, options) {
            var config = {
                fontSize: '12pt',
                padding: '4px',
                bad : 'Very bad',
                weak : 'Weak',
                good : 'Good',
                strong : 'Strong'
            };

            if (options) {
                $.extend(config, options);
            }

            $el.bind('keyup', function() {
                var val = $(this).val(),
                    $parent = typeof config.parent == 'undefined' ? $(this).parent() : $(config.parent),
                    $displayContainer = $parent.find('.strength-meter'),
                    strength = $.formUtils.validators.validate_strength.calculatePasswordStrength(val),
                    css = {
                      background: 'pink',
                      color : '#FF0000',
                      fontWeight : 'bold',
                      border : 'red solid 1px',
                      borderWidth : '0px 0px 4px',
                      display : 'inline-block',
                      fontSize : config.fontSize,
                      padding : config.padding
                    },
                    text = config.bad;

                if($displayContainer.length == 0) {
                    $displayContainer = $('<span></span>');
                    $displayContainer
                        .addClass('strength-meter')
                        .appendTo($parent);
                }

                if( !val ) {
                    $displayContainer.hide();
                } else {
                    $displayContainer.show();
                }

                if(strength == 1) {
                    text = config.weak;
                }
                else if(strength == 2) {
                    css.background = 'lightyellow';
                    css.borderColor = 'yellow';
                    css.color = 'goldenrod';
                    text = config.good;
                }
                else if(strength >= 3) {
                    css.background = 'lightgreen';
                    css.borderColor = 'darkgreen';
                    css.color = 'darkgreen';
                    text = config.strong;
                }

                $displayContainer
                    .css(css)
                    .text(text);
            });
        }
    });

    var requestServer = function(serverURL, $element, val, conf, callback) {
        var reqParams = $element.valAttr('req-params') || $element.data('validation-req-params') || {},
            handleResponse = function(response, callback) {
              if(response.valid) {
                $element.valAttr('backend-valid', 'true');
              }
              else {
                $element.valAttr('backend-invalid', 'true');
                if(response.message)
                  $element.attr(conf.validationErrorMsgAttribute, response.message);
              }

              if( !$element.valAttr('has-keyup-event') ) {
                $element
                  .valAttr('has-keyup-event', '1')
                  .bind('keyup change', function(evt) {
                    if( evt.keyCode != 9 && evt.keyCode != 16 ) {
                      $(this)
                        .valAttr('backend-valid', false)
                        .valAttr('backend-invalid', false);
                    }
                  });
              }

              callback();
            };

        if( !reqParams )
            reqParams = {};
        if( typeof reqParams == 'string' ) {
            reqParams = $.parseJSON(reqParams);
        }
        reqParams[$element.valAttr('param-name') || $element.attr('name')] = val;

        $.ajax({
            url : serverURL,
            type : 'POST',
            cache : false,
            data : reqParams,
            dataType : 'json',
            error : function(error, err) {
              handleResponse({valid: false, message:'Connection failed with status: '+error.statusText}, callback);
              return false;
            },
            success : function(response) {
              handleResponse(response, callback);
            }
        });
    },
    disableFormSubmit = function() {
        return false;
    };

    /*
     * Server validation
     * Flow (form submission):
     *  1) Check if the value already has been validated on the server. If so, display the validation
     *     result and continue the validation process, otherwise continue to step 2
     *  2) Return false as if the value is invalid and set $.formUtils.haltValidation to true
     *  3) Disable form submission on the form being validated
     *  4) Request the server with value and input name and add class 'validating-server-side' to the form
     *  5) When the server responds an attribute will be added to the element
     *      telling the validator that the input has a valid/invalid value and enable form submission
     *  6) Run form submission again (back to step 1)
     */
    $.formUtils.addValidator({
        name : 'server',
        validatorFunction : function(val, $el, conf, lang, $form) {

            var backendValid = $el.valAttr('backend-valid'),
                backendInvalid = $el.valAttr('backend-invalid'),
                serverURL = document.location.href;

            if($el.valAttr('url')) {
                serverURL = $el.valAttr('url');
            } else if('serverURL' in conf) {
                serverURL = conf.backendUrl;
            }

            if(backendValid)
                return true;
            else if(backendInvalid)
                return false;
            else if($.formUtils.eventType == 'keyup')
                return null;

            if($.formUtils.isValidatingEntireForm) {

                $form
                    .bind('submit', disableFormSubmit)
                    .addClass('validating-server-side')
                    .addClass('on-blur');

                $el.addClass('validating-server-side');
                $.formUtils.haltValidation = true;

                requestServer(serverURL, $el, val, conf, function() {

                    $form
                        .removeClass('validating-server-side')
                        .removeClass('on-blur')
                        .get(0).onsubmit = function() {};

                    $form.unbind('submit', disableFormSubmit);
                    $el.removeClass('validating-server-side');

                    $el.valAttr('value-length', val.length);

                    // fire submission again!
                    $.formUtils.haltValidation = false;
                    $form.trigger('submit');
                });

                return null;

            } else {
                // validaiton on blur
                $form.addClass('validating-server-side');
                $el.addClass('validating-server-side');
                requestServer(serverURL, $el, val, conf, function() {
                    $form.removeClass('validating-server-side');
                    $el.removeClass('validating-server-side');
                    $el.trigger('blur');
                });
                return null;
            }
        },
        errorMessage : '',
        errorMessageKey: 'badBackend',
        validateOnKeyUp : false
    });

    $.fn.displayPasswordStrength = function(conf) {
        new $.formUtils.validators.validate_strength.strengthDisplay(this, conf);
        return this;
    };

})(jQuery, window);
