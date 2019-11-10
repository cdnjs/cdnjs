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
 * jQuery Form Validator Module: Poland
 * ------------------------------------------
 * Created by simivar <https://github.com/simivar>
 *
 * This form validation module adds validators typically used on
 * websites in Poland. This module adds the following validators:
 *  - plpesel
 *
 * @website http://formvalidator.net/#poland-validators
 * @license MIT
 */
(function($) {

  $.formUtils.registerLoadedModule('poland');

  /**
	 * PL PESEL - polish personal identity number (in Polish identity cards) validator
	 */
	$.formUtils.addValidator({
		name: 'plpesel',
		validatorFunction: function(pesel){
			var weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3],
				checkSum = 0, checkDigit = 0;

			if( /\d{11}/.test( pesel ) && pesel.length === 11 ){
				for (var i = 0; i < 10; i++) {
					checkSum += pesel[ i ] * weights[ i ];
				}

				if( checkSum % 10 !== 0 ){
					checkDigit = 10 - (checkSum % 10);
				}

				if( parseInt( pesel.charAt( 10 ) ) === checkDigit ){
					return true;
				}
			}

			return false;
		},
		errorMessage: '',
		errorMessageKey: 'badPlPesel'
	});

	/**
	 * PL NIP - polish VAT identification number validator
	 */
	$.formUtils.addValidator({
		name: 'plnip',
		validatorFunction: function(nip){
			var weights = [6, 5, 7, 2, 3, 4, 5, 6, 7],
				checkSum = 0;

			if( /\d{10}/.test( nip ) && nip.length === 10 ){
				for (var i = 0; i < 9; i++) {
					checkSum += nip[ i ] * weights[ i ];
				}

				if( parseInt( nip.charAt( 9 ) ) === checkSum % 11 ){
					return true;
				}
			}

			return false;
		},
		errorMessage: '',
		errorMessageKey: 'badPlNip'
	});

	/**
	 * PL REGON - polish bussiness identity number validator
	 */
	$.formUtils.addValidator({
		name: 'plregon',
		validatorFunction: function(regon){
			var weightsNine = [8, 9, 2, 3, 4, 5, 6, 7],
				weightsFourteen = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8],
				checkSum = 0, checkDigit = 0;

			if( /(\d{14}|\d{9})/.test( regon ) && ( regon.length === 9 || regon.length === 14 ) ){
				for (var i = 0; i < 8; i++) {
					checkSum += regon[ i ] * weightsNine[ i ];
				}

				if( checkSum % 11 !== 10 ){
					checkDigit = checkSum % 11;
				}

				if( parseInt( regon.charAt( 8 ) ) === checkDigit ){
					if( regon.length === 14 ){
						checkSum = 0;

						for (i = 0; i < 13; i++) {
							checkSum += regon[ i ] * weightsFourteen[ i ];
						}

						if( checkSum % 11 !== 10 ){
							checkDigit = checkSum % 11;
						}

						if( parseInt( regon.charAt( 13 ) ) === checkDigit ){
							return true;
						}
					} else {
						return true;
					}
				}
			}

			return false;
		},
		errorMessage: '',
		errorMessageKey: 'badPlRegon'
	});

})(jQuery);


}));
