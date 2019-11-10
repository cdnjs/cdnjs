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
 * Norwegian language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function ($, window) {

  'use strict';

  $.formUtils.registerLoadedModule('lang/no');

  $(window).bind('validatorsLoaded', function () {

    $.formUtils.LANG = {
      andSpaces: ' og mellomrom ',
      badAlphaNumeric: 'Inntastningsverdien kan kun inneholde alfanumeriske tegn ',
      badAlphaNumericExtra: ' og ',
      badCVV: 'CVV-nummeret var ikke korrekt',
      badCreditCard: 'Kredittkortnummeret er ikke korrekt',
      badCustomVal: 'Inntastingsverdien er ikke korrekt',
      badDate: 'Du har ikke oppgitt en korrekt dato',
      badDomain: 'Ukorrekt domeneverdi',
      badEmail: 'Du har ikke oppgitt en korrekt e-postadresse',
      badInt: 'Inntastingsverdien er ikke et korrekt tall',
      badNumberOfSelectedOptionsEnd: ' svar',
      badNumberOfSelectedOptionsStart: 'Du må velge minst ',
      badSecurityAnswer: 'Du har ikke oppgitt et korrekt svar på sikkerhetsspørsmålet',
      badSecurityNumber: 'Ditt personnummer var ukorrekt',
      badStrength: 'Passordet er ikke sterkt nok',
      badTelephone: 'Du har ikke oppgitt et korrekt telefonnummer',
      badTime: 'Du har ikke oppgitt en korrekt tid',
      badUrl: 'Inntastingsverdien er ikke en korrekt URL',
      badreCaptcha: 'Vennligst bekreft at du ikke er en robot',
      errorTitle: 'Innsending av skjemaet feilet!',
      groupCheckedEnd: ' ting',
      groupCheckedRangeStart: 'Vennligst velg mellom ',
      groupCheckedTooFewStart: 'Vennligst velg minst ',
      groupCheckedTooManyStart: 'Vennligst velg maksimum ',
      imageRatioNotAccepted: 'Bildestørrelse ikke akseptert',
      imageTooSmall: 'bildet er for lite',
      imageTooTall: 'bildet kan ikke være høyere enn',
      imageTooWide: 'bildet kan ikke være bredere enn',
      lengthBadEnd: 'tegn',
      lengthBadStart: 'Inntastingsverdien må være mellom ',
      lengthTooLongStart: 'Inntastingsverdien er lenger enn ',
      lengthTooShortStart: 'Inntastingsverdien er kortere enn ',
      max: 'maks',
      min: 'min',
      notConfirmed: 'Inntastingsverdier kunne ikke bekreftes',
      requiredField: 'Dette er et obligatorisk felt',
      requiredFields: 'Du har ikke besvart alle obligatoriske felt',
      wrongFileDim: 'Ukorrekte bildedimensjoner,',
      wrongFileSize: 'Bildet du prøver å laste opp er for stort (max %s)',
      wrongFileType: 'Kun filer av type %s er tillatt'
    };

  });

})(jQuery, window);


}));
