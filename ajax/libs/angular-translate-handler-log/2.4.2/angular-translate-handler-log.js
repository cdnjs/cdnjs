/*!
 * angular-translate - v2.4.2 - 2014-10-21
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module('pascalprecht.translate').factory('$translateMissingTranslationHandlerLog', [
  '$log',
  function ($log) {
    return function (translationId) {
      $log.warn('Translation for ' + translationId + ' doesn\'t exist');
    };
  }
]);