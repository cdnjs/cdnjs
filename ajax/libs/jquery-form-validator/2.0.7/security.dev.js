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
 *
 * @website http://formvalidator.net/#security-validators
 * @license Dual licensed under the MIT or GPL Version 2 licenses
 * @version 2.0.7
 */
(function($) {

    /*
     * Simple spam check
     */
    $.formUtils.addValidator({
        name : 'spamcheck',
        validate : function(val, $el, config) {
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
        validate : function(value, $el, config, language, $form) {
            var conf = '';
            var confInput = $form.find('input[name=' + $el.attr('name') + '_confirmation]').eq(0);
            if (confInput) {
                conf = confInput.val();
            }
            return value === conf;
        },
        errorMessage : '',
        errorMessageKey: 'notConfirmed'
    });

    /*
     * Validate password strength
     */
    $.formUtils.addValidator({
        name : 'strength',
        validate : function(val, $el, conf) {
            var requiredStrength = $el.valAttr('strength')
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
                var val = $(this).val();
                var $parent = typeof config.parent == 'undefined' ? $(this).parent() : $(config.parent);
                var $displayContainer = $parent.find('.strength-meter');
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

                var strength = $.formUtils.validators.validate_strength.calculatePasswordStrength(val);
                var css = {
                    background: 'pink',
                    color : '#FF0000',
                    fontWeight : 'bold',
                    border : 'red solid 1px',
                    borderWidth : '0px 0px 4px',
                    display : 'inline-block',
                    fontSize : config.fontSize,
                    padding : config.padding
                };

                var text = config.bad;

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

    $.formUtils.addValidator({
        oldKeyupEvent : false,
        oldSubmitEvent : false,
        name : 'backend',
        validate : function(val, $el, conf, lang, $form) {

            var backendValid = $el.valAttr('backend-valid'),
                backendInvalid = $el.valAttr('backend-invalid'),
                self = this;

            if(backendValid)
                return true;
            else if(backendInvalid)
                return false;


            $form
                .bind('submit', function() {return false;})
                .addClass('validating-backend');

            var backendUrl = document.location.href;

            if($el.valAttr('url')) {
                backendUrl = $el.valAttr('url');
            } else if('backendUrl' in conf) {
                backendUrl = conf.backendUrl;
            }

            $.ajax({
                url : backendUrl,
                type : 'POST',
                cache : false,
                data : $el.attr('name')+'='+val,
                dataType : 'json',
                success : function(response) {

                    if(response.valid) {
                        $el.valAttr('backend-valid', 'true');
                    }
                    else {
                        $el.valAttr('backend-invalid', 'true');
                        if(response.message)
                            $el.attr(conf.validationErrorMsgAttribute, response.message);
                        else
                            $el.removeAttr(conf.validationErrorMsgAttribute);
                    }

                    $form
                        .removeClass('validating-backend')
                        .get(0).onsubmit = function() {};

                    $el
                        .bind('keyup', function() {
                            $(this)
                                .valAttr('backend-valid', false)
                                .valAttr('backend-invalid', false)
                                .removeAttr(conf.validationErrorMsgAttribute);

                            if(self.oldKeyupEvent == 'function')
                                self.oldKeyupEvent();
                        });

                    $form.unbind('submit', function() {return false;});

                    // fire submission again!
                    $form.trigger('submit');
                }
            });

            $.formUtils.haltValidation = true;
            return false;
        },
        errorMessage : '',
        errorMessageKey: 'badBackend'
    });

    $.fn.displayPasswordStrength = function(conf) {
        new $.formUtils.validators.validate_strength.strengthDisplay(this, conf);
        return this;
    };

})(jQuery);
