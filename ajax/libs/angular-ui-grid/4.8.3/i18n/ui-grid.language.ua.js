/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ua', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Фільтр стовпчика',
            removeFilter: 'Видалити фільтр',
            columnMenuButtonLabel: 'Меню ствпчика'
          },
          priority: 'Пріоритет:',
          filterLabel: "Фільтр стовпчика: "
        },
        aggregate: {
          label: 'елементи'
        },
        groupPanel: {
          description: 'Для групування за стовпчиком перетягніть сюди його назву.'
        },
        search: {
          placeholder: 'Пошук...',
          showingItems: 'Показати елементи:',
          selectedItems: 'Обрані елементи:',
          totalItems: 'Усього елементів:',
          size: 'Розмір сторінки:',
          first: 'Перша сторінка',
          next: 'Наступна сторінка',
          previous: 'Попередня сторінка',
          last: 'Остання сторінка'
        },
        menu: {
          text: 'Обрати ствпчики:'
        },
        sort: {
          ascending: 'За зростанням',
          descending: 'За спаданням',
          none: 'Без сортування',
          remove: 'Прибрати сортування'
        },
        column: {
          hide: 'Приховати стовпчик'
        },
        aggregation: {
          count: 'усього рядків: ',
          sum: 'ітого: ',
          avg: 'середнє: ',
          min: 'мін: ',
          max: 'макс: '
        },
				pinning: {
					pinLeft: 'Закріпити ліворуч',
					pinRight: 'Закріпити праворуч',
					unpin: 'Відкріпити'
				},
        columnMenu: {
          close: 'Закрити'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Меню'
          },
          columns: 'Стовпчики:',
          importerTitle: 'Імпортувати файл',
          exporterAllAsCsv: 'Експортувати все в CSV',
          exporterVisibleAsCsv: 'Експортувати видимі дані в CSV',
          exporterSelectedAsCsv: 'Експортувати обрані дані в CSV',
          exporterAllAsPdf: 'Експортувати все в PDF',
          exporterVisibleAsPdf: 'Експортувати видимі дані в PDF',
          exporterSelectedAsPdf: 'Експортувати обрані дані в PDF',
          clearAllFilters: 'Очистити всі фільтри'
        },
        importer: {
          noHeaders: 'Не вдалося отримати назви стовпчиків, чи є в файлі заголовок?',
          noObjects: 'Не вдалося отримати дані, чи є в файлі рядки окрім заголовка?',
          invalidCsv: 'Не вдалося обробити файл, чи це коректний CSV-файл?',
          invalidJson: 'Не вдалося обробити файл, чи це коректний JSON?',
          jsonNotArray: 'JSON-файл що імпортується повинен містити масив, операцію скасовано.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Перша сторінка',
            pageBack: 'Попередня сторінка',
            pageSelected: 'Обрана сторінка',
            pageForward: 'Наступна сторінка',
            pageToLast: 'Остання сторінка'
          },
          sizes: 'рядків на сторінку',
          totalItems: 'рядків',
          through: 'по',
          of: 'з'
        },
        grouping: {
          group: 'Групувати',
          ungroup: 'Розгрупувати',
          aggregate_count: 'Групувати: Кількість',
          aggregate_sum: 'Для групи: Сума',
          aggregate_max: 'Для групи: Максимум',
          aggregate_min: 'Для групи: Мінімум',
          aggregate_avg: 'Для групи: Серднє',
          aggregate_remove: 'Для групи: Пусто'
        }
      });
      return $delegate;
    }]);
  }]);
})();
