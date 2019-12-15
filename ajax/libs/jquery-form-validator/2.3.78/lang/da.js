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
 * jQuery Form Validator
 * ------------------------------------------
 *
 * Danish language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function($, window) {

  'use strict';

  $.formUtils.registerLoadedModule('lang/da');

  $(window).bind('validatorsLoaded', function() {

      $.formUtils.LANG = {
          andSpaces: ' og mellemrum ',
          badAlphaNumeric: 'Det indtastede kan kun indeholde alfanumeriske karakter ',
          badAlphaNumericExtra: ' og ',
          badCVV: 'Det angivne CVV nummer er ugyldigt',
          badCreditCard:'Det angivne kortnummer er ugyldigt',
          badCustomVal: 'Den indtastede værdi er ugyldig',
          badDate: 'Den angivne dato er ugyldig',
          badDomain: 'Det angivne domæne er ugyldigt',
          badEmail: 'Den angivne email adresse er ugyldig',
          badInt: 'Det angivne tal er ugyldigt',
          badNumberOfSelectedOptionsEnd: ' svar',
          badNumberOfSelectedOptionsStart: 'Du skal vælge mindst ',
          badSecurityAnswer: 'Du har ikke angivet et korrekt svar til sikkerhedsspørgsmålet',
          badSecurityNumber: 'Dit CPR nummer er ikke korrekt',
          badStrength: 'Det angivne password er ikke stærkt nok',
          badTelephone: 'Det angivne telefonnummer er ugyldigt',
          badTime: 'Det angivne tidspunkt er ugyldigt',
          badUrl: 'Den angivne URL er ugyldig',
          badreCaptcha: 'Verificer venligst at du ikke er en bot',
          errorTitle: 'Formular forespørgslen fejlede!',
          groupCheckedEnd: ' ting',
          groupCheckedRangeStart: 'Vælg venligst mellem ',
          groupCheckedTooFewStart: 'Vælg mindst ',
          groupCheckedTooManyStart: 'Vælg højst ',
          imageRatioNotAccepted: 'Billedets dimensioner er ikke acceptable',
          imageTooSmall: 'Billedet er for lille',
          imageTooTall: 'Billedet må ikke være højere end',
          imageTooWide: 'Billedet må ikke være bredere end',
          lengthBadEnd: ' tegn',
          lengthBadStart: 'Feltets værdi skal være mellem ',
          lengthTooLongStart: 'Feltets værdi må ikke være længere end ',
          lengthTooShortStart: 'Feltets værdi må ikke være kortere end ',
          max: 'max',
          min: 'min',
          notConfirmed: 'Feltværdierne kunne ikke bekræftes',
          requiredField: 'Dette felt er påkrævet',
          requiredFields: 'Du har ikke udfyldt alle påkrævede felter',
          wrongFileDim: 'Forkerte billede dimensioner,',
          wrongFileSize: 'Filen du forsøger at uploade er for stor (max %s)',
          wrongFileType: 'Udelukkende filer at følgedne type er tilladt %s'
      };

  });

})(jQuery, window);





}));
