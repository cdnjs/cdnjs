/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ru', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Фильтр столбца',
            removeFilter: 'Удалить фильтр',
            columnMenuButtonLabel: 'Меню столбца'
          },
          priority: 'Приоритет:',
          filterLabel: "Фильтр столбца: "
        },
        aggregate: {
          label: 'элементы'
        },
        groupPanel: {
          description: 'Для группировки по столбцу перетащите сюда его название.'
        },
        search: {
          placeholder: 'Поиск...',
          showingItems: 'Показать элементы:',
          selectedItems: 'Выбранные элементы:',
          totalItems: 'Всего элементов:',
          size: 'Размер страницы:',
          first: 'Первая страница',
          next: 'Следующая страница',
          previous: 'Предыдущая страница',
          last: 'Последняя страница'
        },
        menu: {
          text: 'Выбрать столбцы:'
        },
        sort: {
          ascending: 'По возрастанию',
          descending: 'По убыванию',
          none: 'Без сортировки',
          remove: 'Убрать сортировку'
        },
        column: {
          hide: 'Спрятать столбец'
        },
        aggregation: {
          count: 'всего строк: ',
          sum: 'итого: ',
          avg: 'среднее: ',
          min: 'мин: ',
          max: 'макс: '
        },
				pinning: {
					pinLeft: 'Закрепить слева',
					pinRight: 'Закрепить справа',
					unpin: 'Открепить'
				},
        columnMenu: {
          close: 'Закрыть'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Меню'
          },
          columns: 'Столбцы:',
          importerTitle: 'Импортировать файл',
          exporterAllAsCsv: 'Экспортировать всё в CSV',
          exporterVisibleAsCsv: 'Экспортировать видимые данные в CSV',
          exporterSelectedAsCsv: 'Экспортировать выбранные данные в CSV',
          exporterAllAsPdf: 'Экспортировать всё в PDF',
          exporterVisibleAsPdf: 'Экспортировать видимые данные в PDF',
          exporterSelectedAsPdf: 'Экспортировать выбранные данные в PDF',
          exporterAllAsExcel: 'Экспортировать всё в Excel',
          exporterVisibleAsExcel: 'Экспортировать видимые данные в Excel',
          exporterSelectedAsExcel: 'Экспортировать выбранные данные в Excel',
          clearAllFilters: 'Очистить все фильтры'
        },
        importer: {
          noHeaders: 'Не удалось получить названия столбцов, есть ли в файле заголовок?',
          noObjects: 'Не удалось получить данные, есть ли в файле строки кроме заголовка?',
          invalidCsv: 'Не удалось обработать файл, это правильный CSV-файл?',
          invalidJson: 'Не удалось обработать файл, это правильный JSON?',
          jsonNotArray: 'Импортируемый JSON-файл должен содержать массив, операция отменена.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Первая страница',
            pageBack: 'Предыдущая страница',
            pageSelected: 'Выбранная страница',
            pageForward: 'Следующая страница',
            pageToLast: 'Последняя страница'
          },
          sizes: 'строк на страницу',
          totalItems: 'строк',
          through: 'по',
          of: 'из'
        },
        grouping: {
          group: 'Группировать',
          ungroup: 'Разгруппировать',
          aggregate_count: 'Группировать: Count',
          aggregate_sum: 'Для группы: Сумма',
          aggregate_max: 'Для группы: Максимум',
          aggregate_min: 'Для группы: Минимум',
          aggregate_avg: 'Для группы: Среднее',
          aggregate_remove: 'Для группы: Пусто'
        }
      });
      return $delegate;
    }]);
  }]);
})();
