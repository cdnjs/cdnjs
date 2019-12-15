/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('bg', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Филттър за колоната',
            removeFilter: 'Премахни филтър',
            columnMenuButtonLabel: 'Меню на колоната'
          },
          priority: 'Приоритет:',
          filterLabel: "Филтър за колоната: "
        },
        aggregate: {
          label: 'обекти'
        },
        search: {
          placeholder: 'Търсене...',
          showingItems: 'Показани обекти:',
          selectedItems: 'избрани обекти:',
          totalItems: 'Общо:',
          size: 'Размер на страницата:',
          first: 'Първа страница',
          next: 'Следваща страница',
          previous: 'Предишна страница',
          last: 'Последна страница'
        },
        menu: {
          text: 'Избери колони:'
        },
        sort: {
          ascending: 'Сортиране по възходящ ред',
          descending: 'Сортиране по низходящ ред',
          none: 'Без сортиране',
          remove: 'Премахни сортирането'
        },
        column: {
          hide: 'Скрий колоната'
        },
        aggregation: {
          count: 'Общо редове: ',
          sum: 'общо: ',
          avg: 'средно: ',
          min: 'най-малко: ',
          max: 'най-много: '
        },
        pinning: {
          pinLeft: 'Прикрепи вляво',
          pinRight: 'Прикрепи вдясно',
          unpin: 'Премахване'
        },
        columnMenu: {
          close: 'Затвори'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Меню на таблицата'
          },
          columns: 'Колони:',
          importerTitle: 'Импортиране на файл',
          exporterAllAsCsv: 'Експортиране на данните като csv',
          exporterVisibleAsCsv: 'Експортиране на видимите данни като csv',
          exporterSelectedAsCsv: 'Експортиране на избраните данни като csv',
          exporterAllAsPdf: 'Експортиране на данните като pdf',
          exporterVisibleAsPdf: 'Експортиране на видимите данни като pdf',
          exporterSelectedAsPdf: 'Експортиране на избраните данни като pdf',
          clearAllFilters: 'Премахни всички филтри'
        },
        importer: {
          noHeaders: 'Имената на колоните не успяха да бъдат извлечени, файлът има ли хедър?',
          noObjects: 'Обектите не успяха да бъдат извлечени, файлът съдържа ли данни, различни от хедър?',
          invalidCsv: 'Файлът не може да бъде обработеб, уверете се, че е валиден CSV файл',
          invalidJson: 'Файлът не може да бъде обработеб, уверете се, че е валиден JSON файл',
          jsonNotArray: 'Импортираният JSON файл трябва да съдържа масив, прекратяване.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Към първа страница',
            pageBack: 'Страница назад',
            pageSelected: 'Избрана страница',
            pageForward: 'Страница напред',
            pageToLast: 'Към последна страница'
          },
          sizes: 'обекта на страница',
          totalItems: 'обекта',
          through: 'до',
          of: 'от'
        },
        grouping: {
          group: 'Групиране',
          ungroup: 'Премахване на групирането',
          aggregate_count: 'Сбор: Брой',
          aggregate_sum: 'Сбор: Сума',
          aggregate_max: 'Сбор: Максимум',
          aggregate_min: 'Сбор: Минимум',
          aggregate_avg: 'Сбор: Средно',
          aggregate_remove: 'Сбор: Премахване'
        },
        validate: {
          error: 'Грешка:',
          minLength: 'Стойността трябва да съдържа поне THRESHOLD символа.',
          maxLength: 'Стойността не трябва да съдържа повече от THRESHOLD символа.',
          required: 'Необходима е стойност.'
        }
      });
      return $delegate;
    }]);
  }]);
})();
