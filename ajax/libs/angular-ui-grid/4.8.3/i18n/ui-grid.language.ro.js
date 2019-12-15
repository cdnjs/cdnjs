/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ro', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filtru pentru coloana',
            removeFilter: 'Sterge filtru',
            columnMenuButtonLabel: 'Column Menu'
          },
          priority: 'Prioritate:',
          filterLabel: "Filtru pentru coloana:"
        },
        aggregate: {
          label: 'Elemente'
        },
        groupPanel: {
          description: 'Trage un cap de coloana aici pentru a grupa elementele dupa coloana respectiva'
        },
        search: {
          placeholder: 'Cauta...',
          showingItems: 'Arata elementele:',
          selectedItems: 'Elementele selectate:',
          totalItems: 'Total elemente:',
          size: 'Marime pagina:',
          first: 'Prima pagina',
          next: 'Pagina urmatoare',
          previous: 'Pagina anterioara',
          last: 'Ultima pagina'
        },
        menu: {
          text: 'Alege coloane:'
        },
        sort: {
          ascending: 'Ordoneaza crescator',
          descending: 'Ordoneaza descrescator',
          none: 'Fara ordonare',
          remove: 'Sterge ordonarea'
        },
        column: {
          hide: 'Ascunde coloana'
        },
        aggregation: {
          count: 'total linii: ',
          sum: 'total: ',
          avg: 'medie: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Pin la stanga',
          pinRight: 'Pin la dreapta',
          unpin: 'Sterge pinul'
        },
        columnMenu: {
          close: 'Inchide'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Grid Menu'
          },
          columns: 'Coloane:',
          importerTitle: 'Incarca fisier',
          exporterAllAsCsv: 'Exporta toate datele ca csv',
          exporterVisibleAsCsv: 'Exporta datele vizibile ca csv',
          exporterSelectedAsCsv: 'Exporta datele selectate ca csv',
          exporterAllAsPdf: 'Exporta toate datele ca pdf',
          exporterVisibleAsPdf: 'Exporta datele vizibile ca pdf',
          exporterSelectedAsPdf: 'Exporta datele selectate ca csv pdf',
          clearAllFilters: 'Sterge toate filtrele'
        },
        importer: {
          noHeaders: 'Numele coloanelor nu a putut fi incarcat, acest fisier are un header?',
          noObjects: 'Datele nu au putut fi incarcate, exista date in fisier in afara numelor de coloane?',
          invalidCsv: 'Fisierul nu a putut fi procesat, ati incarcat un CSV valid ?',
          invalidJson: 'Fisierul nu a putut fi procesat, ati incarcat un Json valid?',
          jsonNotArray: 'Json-ul incarcat trebuie sa contina un array, inchidere.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Prima pagina',
            pageBack: 'O pagina inapoi',
            pageSelected: 'Pagina selectata',
            pageForward: 'O pagina inainte',
            pageToLast: 'Ultima pagina'
          },
          sizes: 'Elemente per pagina',
          totalItems: 'elemente',
          through: 'prin',
          of: 'of'
        },
        grouping: {
          group: 'Grupeaza',
          ungroup: 'Opreste gruparea',
          aggregate_count: 'Agg: Count',
          aggregate_sum: 'Agg: Sum',
          aggregate_max: 'Agg: Max',
          aggregate_min: 'Agg: Min',
          aggregate_avg: 'Agg: Avg',
          aggregate_remove: 'Agg: Remove'
        }
      });
      return $delegate;
    }]);
  }]);
})();
