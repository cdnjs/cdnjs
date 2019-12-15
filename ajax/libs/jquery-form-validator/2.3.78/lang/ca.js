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
 * Catalan language package
 *
 * @website http://formvalidator.net/
 * @license MIT
 */
(function($, window) {

  'use strict';

  $.formUtils.registerLoadedModule('lang/ca');

  $(window).bind('validatorsLoaded', function() {

    $.formUtils.LANG = {
      errorTitle: 'El formulari no s\'ha pogut enviar!',
      requiredField: 'Aquest camp és obligatori',
      requiredFields: 'No ha contestat tots els camps requerits',
      badTime: 'L\'hora proporcionada no és vàlida',
      badEmail: 'La direcció d\'e-mail no és vàlida',
      badTelephone: 'El número de telèfon proporcionat no és vàlid',
      badSecurityAnswer: 'La resposta a la seva pregunta de seguretat és incorrecte',
      badDate: 'La data proporcionada no és vàlida',
      lengthBadStart: 'La seva resposta s\'ha d\'incloure entre ',
      lengthBadEnd: ' caràcters',
      lengthTooLongStart: 'La seva resposta ha de ser menor a ',
      lengthTooShortStart: 'La seva resposta ha de ser major a ',
      notConfirmed: 'Els valors proporcionats no poden ser confirmats',
      badDomain: 'Ha introduït un domini incorrecte',
      badUrl: 'La URL proporcionada no és vàlida',
      badCustomVal: 'Els valors proporcionats no són vàlids',
      andSpaces: ' i espais ',
      badInt: 'El valor proporcionat no és un número vàlid',
      badSecurityNumber: 'El número de seguretat social proporcionat és incorrecte',
      badUKVatAnswer: 'El número VAT proporcionat no és vàlid pel Regne Unit',
      badStrength: 'La contrasenya proporcionada no és suficientment segura',
      badNumberOfSelectedOptionsStart: 'Ha de seleccionar almenys',
      badNumberOfSelectedOptionsEnd: ' resposta(es)',
      badAlphaNumeric: 'El valor proporcionat només ha de contenir caràcters alfanumèrics (a-z i números)',
      badAlphaNumericExtra: ' i',
      wrongFileSize: 'L\'arxiu que està tractant de pujar és massa gran (màx. %s)',
      wrongFileType: 'Només els arxius de tipus %s estan permesos',
      groupCheckedRangeStart: 'Si us plau, triï entre ',
      groupCheckedTooFewStart: 'Si us plau, triï almenys ',
      groupCheckedTooManyStart: 'Si us plau, triï un màxim de ',
      groupCheckedEnd: ' element(s)',
      badCreditCard: 'El número de targeta de crèdit proporcionat no és vàlid',
      badCVV: 'CVV proporcionat no és vàlid',
      wrongFileDim: 'Les dimensions de la imatge no són vàlides,',
      imageTooTall: 'l\'alçada de la imatge no pot ser major a',
      imageTooWide: 'l\'amplada de la imatge no pot ser major a',
      imageTooSmall: 'la imatge és massa petita',
      min: 'min.',
      max: 'màx.',
      imageRatioNotAccepted : 'La proporció de la imatge (alçada x amplada) no és vàlida'
    };

  });

})(jQuery, window);


}));
