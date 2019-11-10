/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('hy', {
        aggregate: {
          label: 'տվյալներ'
        },
        groupPanel: {
          description: 'Ըստ սյան խմբավորելու համար քաշեք և գցեք վերնագիրն այստեղ։'
        },
        search: {
          placeholder: 'Փնտրում...',
          showingItems: 'Ցուցադրված տվյալներ՝',
          selectedItems: 'Ընտրված:',
          totalItems: 'Ընդամենը՝',
          size: 'Տողերի քանակը էջում՝',
          first: 'Առաջին էջ',
          next: 'Հաջորդ էջ',
          previous: 'Նախորդ էջ',
          last: 'Վերջին էջ'
        },
        menu: {
          text: 'Ընտրել սյուները:'
        },
        sort: {
          ascending: 'Աճման կարգով',
          descending: 'Նվազման կարգով',
          remove: 'Հանել '
        },
        column: {
          hide: 'Թաքցնել սյունը'
        },
        aggregation: {
          count: 'ընդամենը տող՝ ',
          sum: 'ընդամենը՝ ',
          avg: 'միջին՝ ',
          min: 'մին՝ ',
          max: 'մաքս՝ '
        },
        pinning: {
          pinLeft: 'Կպցնել ձախ կողմում',
          pinRight: 'Կպցնել աջ կողմում',
          unpin: 'Արձակել'
        },
        gridMenu: {
          columns: 'Սյուներ:',
          importerTitle: 'Ներմուծել ֆայլ',
          exporterAllAsCsv: 'Արտահանել ամբողջը CSV',
          exporterVisibleAsCsv: 'Արտահանել երևացող տվյալները CSV',
          exporterSelectedAsCsv: 'Արտահանել ընտրված տվյալները CSV',
          exporterAllAsPdf: 'Արտահանել PDF',
          exporterVisibleAsPdf: 'Արտահանել երևացող տվյալները PDF',
          exporterSelectedAsPdf: 'Արտահանել ընտրված տվյալները PDF',
          exporterAllAsExcel: 'Արտահանել excel',
          exporterVisibleAsExcel: 'Արտահանել երևացող տվյալները excel',
          exporterSelectedAsExcel: 'Արտահանել ընտրված տվյալները excel',
          clearAllFilters: 'Մաքրել բոլոր ֆիլտրերը'
        },
        importer: {
          noHeaders: 'Հնարավոր չեղավ որոշել սյան վերնագրերը։ Արդյո՞ք ֆայլը ունի վերնագրեր։',
          noObjects: 'Հնարավոր չեղավ կարդալ տվյալները։ Արդյո՞ք ֆայլում կան տվյալներ։',
          invalidCsv: 'Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր CSV է։',
          invalidJson: 'Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր Json է։',
          jsonNotArray: 'Ներմուծված json ֆայլը պետք է պարունակի զանգված, կասեցվում է։'
        }
      });
      return $delegate;
    }]);
  }]);
})();
