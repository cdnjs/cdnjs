/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('sv', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Kolumnfilter',
            removeFilter: 'Ta bort filter',
            columnMenuButtonLabel: 'Kolumnmeny',
            column: 'Kolumn'
          },
          priority: 'Prioritet:',
          filterLabel: "Filter för kolumn: "
        },
        aggregate: {
          label: 'Poster'
        },
        groupPanel: {
          description: 'Dra en kolumnrubrik hit och släpp den för att gruppera efter den kolumnen.'
        },
        search: {
          aria: {
            selected: 'Rad är vald',
            notSelected: 'Rad är inte vald'
          },
          placeholder: 'Sök...',
          showingItems: 'Visar:',
          selectedItems: 'Valda:',
          totalItems: 'Antal:',
          size: 'Sidstorlek:',
          first: 'Första sidan',
          next: 'Nästa sida',
          previous: 'Föregående sida',
          last: 'Sista sidan'
        },
        menu: {
          text: 'Välj kolumner:'
        },
        sort: {
          ascending: 'Sortera stigande',
          descending: 'Sortera fallande',
          none: 'Ingen sortering',
          remove: 'Inaktivera sortering'
        },
        column: {
          hide: 'Göm kolumn'
        },
        aggregation: {
          count: 'Antal rader: ',
          sum: 'Summa: ',
          avg: 'Genomsnitt: ',
          min: 'Min: ',
          max: 'Max: '
        },
        pinning: {
          pinLeft: 'Fäst vänster',
          pinRight: 'Fäst höger',
          unpin: 'Lösgör'
        },
        columnMenu: {
          close: 'Stäng'
        },
        gridMenu: {
          aria: {
              buttonLabel: 'Meny'
          },
          columns: 'Kolumner:',
          importerTitle: 'Importera fil',
          exporterAllAsCsv: 'Exportera all data som CSV',
          exporterVisibleAsCsv: 'Exportera synlig data som CSV',
          exporterSelectedAsCsv: 'Exportera markerad data som CSV',
          exporterAllAsPdf: 'Exportera all data som PDF',
          exporterVisibleAsPdf: 'Exportera synlig data som PDF',
          exporterSelectedAsPdf: 'Exportera markerad data som PDF',
          exporterAllAsExcel: 'Exportera all data till Excel',
          exporterVisibleAsExcel: 'Exportera synlig data till Excel',
          exporterSelectedAsExcel: 'Exportera markerad data till Excel',
          clearAllFilters: 'Nollställ alla filter'
        },
        importer: {
          noHeaders: 'Kolumnnamn kunde inte härledas. Har filen ett sidhuvud?',
          noObjects: 'Objekt kunde inte härledas. Har filen data undantaget sidhuvud?',
          invalidCsv: 'Filen kunde inte behandlas, är den en giltig CSV?',
          invalidJson: 'Filen kunde inte behandlas, är den en giltig JSON?',
          jsonNotArray: 'Importerad JSON-fil måste innehålla ett fält. Import avbruten.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Gå till första sidan',
            pageBack: 'Gå en sida bakåt',
            pageSelected: 'Vald sida',
            pageForward: 'Gå en sida framåt',
            pageToLast: 'Gå till sista sidan'
          },
          sizes: 'Poster per sida',
          totalItems: 'Poster',
          through: 'genom',
          of: 'av'
        },
        grouping: {
          group: 'Gruppera',
          ungroup: 'Dela upp',
          aggregate_count: 'Agg: Antal',
          aggregate_sum: 'Agg: Summa',
          aggregate_max: 'Agg: Max',
          aggregate_min: 'Agg: Min',
          aggregate_avg: 'Agg: Genomsnitt',
          aggregate_remove: 'Agg: Ta bort'
        },
        validate: {
          error: 'Error:',
          minLength: 'Värdet borde vara minst THRESHOLD tecken långt.',
          maxLength: 'Värdet borde vara max THRESHOLD tecken långt.',
          required: 'Ett värde krävs.'
        }
      });
      return $delegate;
    }]);
  }]);
})();
