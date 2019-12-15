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
 * Italian language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 * @version 2.2.163
 */
(function($, window) {
  'use strict';

  $.formUtils.registerLoadedModule('lang/it');

  $(window).bind('validatorsLoaded', function() {

    $.formUtils.LANG = {
      errorTitle: 'Impossibile inviare il modulo!',
      requiredField: 'Campo obbligatorio',
      requiredFields: 'Non sono stati compilati tutti i campi richiesti',
      badTime: 'L\'ora scelta non &egrave; valida',
      badEmail: 'Questo indirizzo email non &egrave; valido',
      badTelephone: 'Il numero di telefono imputato non &egrave; valido',
      badSecurityAnswer: 'La risposta alla domanda di sicurezza &egrave; errata',
      badDate: 'La data scelta non &egrave; valida',
      lengthBadStart: 'La sua risposta non può essere più lunga di ',
      lengthBadEnd: ' caratteri',
      lengthTooLongStart: 'La lunghezza della risposta deve essere minore di ',
      lengthTooShortStart: 'La lunghezza della risposta deve essere maggiore di ',
      notConfirmed: 'Il valore non è stato confermato.',
      badDomain: 'Il dominio inserito non &egrave; corretto.',
      badUrl: 'L\' URL inserito non &egrave; valido',
      badCustomVal: 'I valori inseriti non sono validi',
      andSpaces: ' e spazi ',
      badInt: 'Il numero inserito non &egrave; valido',
      badSecurityNumber: 'Il numero di sicurezza inserito non &egrave; valido',
      badUKVatAnswer: 'La Partita IVA (VAT) inserita non &egrave; valida nel Regno Unito',
      badStrength: 'La password proposta non &egrave; sufficientemente sicura',
      badNumberOfSelectedOptionsStart: 'Deve selezionare almeno',
      badNumberOfSelectedOptionsEnd: ' risposta/e',
      badAlphaNumeric: 'Il valore proposto deve contenere caratteri alfanumerici (a-z e 1234...)',
      badAlphaNumericExtra: '',
      wrongFileSize: 'Il file che si sta cercando di caricare è troppo grande (massimo %s)',
      wrongFileType: 'Solo i file di tipo %s possono essere inviati',
      groupCheckedRangeStart: 'Si prega di scegliere tra ',
      groupCheckedTooFewStart: 'Si prega di selezionare un minimo di ',
      groupCheckedTooManyStart: 'Si prega di selezionare un massimo di ',
      groupCheckedEnd: ' opzione/i',
      badCreditCard: 'Il numero di carta di credito non risulta valido',
      badCVV: 'CVV non valido',
      wrongFileDim: 'La dimensione dell\'immagine non &egrave; valida,',
      imageTooTall: 'il lato alto dell\'immagine non può essere maggiore di',
      imageTooWide: 'il lato lungo dell\'immagine non può essere maggiore di',
      imageTooSmall: 'L\'immagine è troppo piccola',
      min: 'min.',
      max: 'máx.',
      imageRatioNotAccepted : 'La proporzione dell\' immagine (altezza x larghezza) non &egrave; valida'
    };

  });

})(jQuery, window);


}));
