/**
 * jQuery Form Validator Module: Security
 * ------------------------------------------
 * Created by Victor Jonsson <http://www.victorjonsson.se>
 *
 * This form validation module adds validators typically used on
 * websites in the UK. This module adds the following validators:
 *  - ukvatnumber
 *
 * @website http://formvalidator.net/#uk-validators
 * @license MIT
 * @version 2.2.81
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
    	VATsplit = number.split("");

    	var checkDigits = Number(VATsplit[7] + VATsplit[8]);  // two final digits as a number

    	var firstDigit = VATsplit[0];
    	var secondDigit = VATsplit[1];
    	if ((firstDigit == 0) && (secondDigit >0)) {
    		return false;
    	}

    	var total = 0;
    	for (var i=0; i<7; i++) {  // first 7 digits
    		total += VATsplit[i]* (8-i);  // sum weighted cumulative total
    	}

    	var c = 0;
    	var i = 0;

    	for (var m = 8; m>=2; m--) {
    		c += VATsplit[i]* m;
    		i++;
    	}

    	// Traditional Algorithm for VAT numbers issued before 2010

    	while (total > 0) {
    		total -= 97; // deduct 97 repeatedly until total is negative
    	}
    	total = Math.abs(total);  // make positive

    	if (checkDigits == total) {
    		valid = true;
    	}

    	// If not valid try the new method (introduced November 2009) by subtracting 55 from the mod 97 check digit if we can - else add 42

    	if (!valid) {
    		total = total%97  // modulus 97

    		if (total >= 55) {
    			total = total - 55
    		} else {
    			total = total + 42
    		}

    		if (total == checkDigits) {
    			valid = true;
    		}
    	}

    	return valid;
    },
    errorMessage : '',
    errorMessageKey: 'badUKVatAnswer'
});
