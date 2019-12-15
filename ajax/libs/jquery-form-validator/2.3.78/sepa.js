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

// jQuery Form Validator Module: SEPA
// Author: PispalanIT, Joni Saarinen
//
// Code based on https://github.com/arhs/iban.js/blob/master/iban.js

(function($) {

  'use strict';

  $.formUtils.registerLoadedModule('sepa');

  var ibanCountryList = [
    ['AD', 24, 'F04F04A12'],
    ['AE', 23, 'F03F16'],
    ['AL', 28, 'F08A16'],
    ['AT', 20, 'F05F11'],
    ['AZ', 28, 'U04A20'],
    ['BA', 20, 'F03F03F08F02'],
    ['BE', 16, 'F03F07F02'],
    ['BG', 22, 'U04F04F02A08'],
    ['BH', 22, 'U04A14'],
    ['BR', 29, 'F08F05F10U01A01'],
    ['CH', 21, 'F05A12'],
    ['CR', 21, 'F03F14'],
    ['CY', 28, 'F03F05A16'],
    ['CZ', 24, 'F04F06F10'],
    ['DE', 22, 'F08F10'],
    ['DK', 18, 'F04F09F01'],
    ['DO', 28, 'U04F20'],
    ['EE', 20, 'F02F02F11F01'],
    ['ES', 24, 'F04F04F01F01F10'],
    ['FI', 18, 'F06F07F01'],
    ['FO', 18, 'F04F09F01'],
    ['FR', 27, 'F05F05A11F02'],
    ['GB', 22, 'U04F06F08'],
    ['GE', 22, 'U02F16'],
    ['GI', 23, 'U04A15'],
    ['GL', 18, 'F04F09F01'],
    ['GR', 27, 'F03F04A16'],
    ['GT', 28, 'A04A20'],
    ['HR', 21, 'F07F10'],
    ['HU', 28, 'F03F04F01F15F01'],
    ['IE', 22, 'U04F06F08'],
    ['IL', 23, 'F03F03F13'],
    ['IS', 26, 'F04F02F06F10'],
    ['IT', 27, 'U01F05F05A12'],
    ['KW', 30, 'U04A22'],
    ['KZ', 20, 'F03A13'],
    ['LB', 28, 'F04A20'],
    ['LC', 32, 'U04F24'],
    ['LI', 21, 'F05A12'],
    ['LT', 20, 'F05F11'],
    ['LU', 20, 'F03A13'],
    ['LV', 21, 'U04A13'],
    ['MC', 27, 'F05F05A11F02'],
    ['MD', 24, 'U02A18'],
    ['ME', 22, 'F03F13F02'],
    ['MK', 19, 'F03A10F02'],
    ['MR', 27, 'F05F05F11F02'],
    ['MT', 31, 'U04F05A18'],
    ['MU', 30, 'U04F02F02F12F03U03'],
    ['NL', 18, 'U04F10'],
    ['NO', 15, 'F04F06F01'],
    ['PK', 24, 'U04A16'],
    ['PL', 28, 'F08F16'],
    ['PS', 29, 'U04A21'],
    ['PT', 25, 'F04F04F11F02'],
    ['RO', 24, 'U04A16'],
    ['RS', 22, 'F03F13F02'],
    ['SA', 24, 'F02A18'],
    ['SE', 24, 'F03F16F01'],
    ['SI', 19, 'F05F08F02'],
    ['SK', 24, 'F04F06F10'],
    ['SM', 27, 'U01F05F05A12'],
    ['ST', 25, 'F08F11F02'],
    ['TL', 23, 'F03F14F02'],
    ['TN', 24, 'F02F03F13F02'],
    ['TR', 26, 'F05F01A16'],
    ['VG', 24, 'U04F16'],
    ['XK', 20, 'F04F10F02'],
    ['AO', 25, 'F21'],
    ['BF', 27, 'F23'],
    ['BI', 16, 'F12'],
    ['BJ', 28, 'F24'],
    ['CI', 28, 'U01F23'],
    ['CM', 27, 'F23'],
    ['CV', 25, 'F21'],
    ['DZ', 24, 'F20'],
    ['IR', 26, 'F22'],
    ['JO', 30, 'A04F22'],
    ['MG', 27, 'F23'],
    ['ML', 28, 'U01F23'],
    ['MZ', 25, 'F21'],
    ['QA', 29, 'U04A21'],
    ['SN', 28, 'U01F23'],
    ['UA', 29, 'F25']
  ];

  var generalValidatorFunction = function (sepa) {
    sepa = sepa.replace(/\s+/g, '');
    sepa = sepa.substr(4) + sepa.substr(0,4);

    sepa = sepa.split('').map(function(n){
      var code = n.charCodeAt(0);
      if (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0)){
        //A = 10, B = 11, ... Z = 35
          return code - 'A'.charCodeAt(0) + 10;
      } else {
        return n;
      }
    }).join('');

    var remainder = sepa;
    var block;

    while (remainder.length > 2) {
      block = remainder.slice(0, 9);
      remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
    }

    if (parseInt(remainder, 10) % 97 === 1){
      return true;
    } else {
      return false;
    }
  };

  var countryIBAN = function(sepa) {
    sepa = sepa.toUpperCase();
    sepa = sepa.replace(/\s+/g, '');

    var countryCode = sepa.slice(0,2);
    var i = 0;
    var structure = '';

    for (i = 0; i < ibanCountryList.length; ++i){
      if (ibanCountryList[i][0] === countryCode){
        structure = ibanCountryList[i][2];
        break;
      }
    }

    if (structure === ''){
      return false;
    }

    var regex = structure.match(/(.{3})/g).map(function(block){

      // parse each structure block (1-char + 2-digits)
      var format;
      var pattern = block.slice(0, 1);
      var repeats = parseInt(block.slice(1), 10);

      switch (pattern){
        case 'A': format = '0-9A-Za-z'; break;
        case 'B': format = '0-9A-Z'; break;
        case 'C': format = 'A-Za-z'; break;
        case 'F': format = '0-9'; break;
        case 'L': format = 'a-z'; break;
        case 'U': format = 'A-Z'; break;
        case 'W': format = '0-9a-z'; break;
      }

      return '([' + format + ']{' + repeats + '})';
    });

    var regextest = new RegExp('^' + regex.join('') + '$');

    return sepa.length === ibanCountryList[i][1] && regextest.test(sepa.slice(4));
  };


  $.formUtils.addValidator({
    name: 'sepa',
    validatorFunction: generalValidatorFunction,
    errorMessage: '',
    errorMessageKey:'badSepa'
  });

  $.formUtils.addValidator({
    name: 'iban',
    validatorFunction: function(sepa) {
      return countryIBAN(sepa) && generalValidatorFunction(sepa);
    },
    errorMessage: '',
    errorMessageKey:'badIban'
  });

  $.formUtils.addValidator({
    name: 'bic',
    validatorFunction: function(bic) {
      var regextest = new RegExp('^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$');
      return regextest.test(bic);
    },
    errorMessage: '',
    errorMessageKey:'badBic'
  });

})(jQuery);


}));
