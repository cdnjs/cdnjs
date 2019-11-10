/*!
 * angular-translate - v2.4.1 - 2014-10-03
 * http://github.com/PascalPrecht/angular-translate
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