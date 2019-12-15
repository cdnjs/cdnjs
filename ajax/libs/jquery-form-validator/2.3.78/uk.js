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
 * jQuery Form Validator Module: UK
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * This form validation module adds validators typically used on
 * websites in the UK. This module adds the following validators:
 *  - ukvatnumber
 *  - ukutr
 *  - uknin
 *
 * @website http://formvalidator.net/#uk-validators
 * @license MIT
 */
(function($) {

	'use strict';


  $.formUtils.registerLoadedModule('uk');

  /**
	 * UK VAT Validator
	 */
	$.formUtils.addValidator({
    name : 'ukvatnumber',
    validatorFunction : function(number) {

        // Code Adapted from http://www.codingforums.com/showthread.php?t=211967
        // TODO: Extra Checking for other VAT Numbers (Other countries and UK Government/Health Authorities)

    	number = number.replace(/[^0-9]/g, '');

    	//Check Length
    	if(number.length < 9) {
    		return false;
    	}

    	var valid = false;

    	var VATsplit = [];
    	VATsplit = number.split('');

    	var checkDigits = Number(VATsplit[7] + VATsplit[8]);  // two final digits as a number

    	var firstDigit = VATsplit[0];
    	var secondDigit = VATsplit[1];
    	if ((firstDigit === 0) && (secondDigit > 0)) {
    		return false;
    	}

    	var total = 0;
    	for (var i = 0; i < 7; i++) {  // first 7 digits
    		total += VATsplit[i]* (8-i);  // sum weighted cumulative total
    	}

    	var c = 0;
    	var j = 0;

    	for (var m = 8; m >= 2; m--) {
    		c += VATsplit[j] * m;
    		j++;
    	}

    	// Traditional Algorithm for VAT numbers issued before 2010

    	while (total > 0) {
    		total -= 97; // deduct 97 repeatedly until total is negative
    	}
    	total = Math.abs(total);  // make positive

    	if (checkDigits === total) {
    		valid = true;
    	}

    	// If not valid try the new method (introduced November 2009) by subtracting 55 from the mod 97 check digit if we can - else add 42

    	if (!valid) {
    		total = total%97;  // modulus 97

    		if (total >= 55) {
    			total = total - 55;
    		} else {
    			total = total + 42;
    		}

    		if (total === checkDigits) {
    			valid = true;
    		}
    	}

    	return valid;
    },
    errorMessage : '',
    errorMessageKey: 'badUKVatAnswer'
});

	/**
	 * UK Unique Taxpayer Reference Validator
	 */
	$.formUtils.addValidator({
		name: 'ukutr',
		validatorFunction: function (utr)
		{
			var weights = [0, 6, 7, 8, 9, 10, 5, 4, 3, 2],
				checkDigits = [2, 1, 9, 8, 7, 6, 5, 4, 3, 2, 1],
				checkSum = 0;

			if (/\d{10}/.test(utr) && utr.length === 10)
			{
				for (var i = 0; i < 10; i++) {
					checkSum += utr[ i ] * weights[ i ];
				}

				if (parseInt(utr.charAt(0)) === checkDigits[checkSum % 11])
				{
					return true;
				}
			}

			return false;
		},
		errorMessage: '',
		errorMessageKey: 'badUkUtr'
	});

	/**
	 * UK National Insurance number Validator
	 */
	$.formUtils.addValidator({
		name: 'uknin',
		validatorFunction: function(val){
			if( /^(?!BG)(?!GB)(?!NK)(?!KN)(?!TN)(?!NT)(?!ZZ)(?:[A-CEGHJ-PR-TW-Z][A-CEGHJ-NPR-TW-Z])(?:\s*\d\s*){6}([A-D]|\s)$/i.test( val ) ){
				return true;
			}

			return false;
		},
		errorMessage: '',
		errorMessageKey: 'badUkNin'
	});

})(jQuery);


}));
