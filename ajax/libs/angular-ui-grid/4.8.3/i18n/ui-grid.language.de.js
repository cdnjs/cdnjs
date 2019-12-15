/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('i18nService', ['$delegate', function ($delegate) {
      $delegate.add('de', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filter für Spalte',
            removeFilter: 'Filter löschen',
            columnMenuButtonLabel: 'Spaltenmenü',
            column: 'Spalte'
          },
          priority: 'Priorität:',
          filterLabel: "Filter für Spalte: "
        },
        aggregate: {
          label: 'Eintrag'
        },
        groupPanel: {
          description: 'Ziehen Sie eine Spaltenüberschrift hierhin, um nach dieser Spalte zu gruppieren.'
        },
        search: {
          aria: {
            selected: 'Zeile markiert',
            notSelected: 'Zeile nicht markiert'
          },
          placeholder: 'Suche...',
          showingItems: 'Zeige Einträge:',
          selectedItems: 'Ausgewählte Einträge:',
          totalItems: 'Einträge gesamt:',
          size: 'Einträge pro Seite:',
          first: 'Erste Seite',
          next: 'Nächste Seite',
          previous: 'Vorherige Seite',
          last: 'Letzte Seite'
        },
        menu: {
          text: 'Spalten auswählen:'
        },
        sort: {
          ascending: 'aufsteigend sortieren',
          descending: 'absteigend sortieren',
          none: 'keine Sortierung',
          remove: 'Sortierung zurücksetzen'
        },
        column: {
          hide: 'Spalte ausblenden'
        },
        aggregation: {
          count: 'Zeilen insgesamt: ',
          sum: 'gesamt: ',
          avg: 'Durchschnitt: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
            pinLeft: 'Links anheften',
            pinRight: 'Rechts anheften',
            unpin: 'Lösen'
        },
        columnMenu: {
          close: 'Schließen'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Tabellenmenü'
          },
          columns: 'Spalten:',
          importerTitle: 'Datei importieren',
          exporterAllAsCsv: 'Alle Daten als CSV exportieren',
          exporterVisibleAsCsv: 'Sichtbare Daten als CSV exportieren',
          exporterSelectedAsCsv: 'Markierte Daten als CSV exportieren',
          exporterAllAsPdf: 'Alle Daten als PDF exportieren',
          exporterVisibleAsPdf: 'Sichtbare Daten als PDF exportieren',
          exporterSelectedAsPdf: 'Markierte Daten als PDF exportieren',
          exporterAllAsExcel: 'Alle Daten als Excel exportieren',
          exporterVisibleAsExcel: 'Sichtbare Daten als Excel exportieren',
          exporterSelectedAsExcel: 'Markierte Daten als Excel exportieren',
          clearAllFilters: 'Alle Filter zurücksetzen'
        },
        importer: {
          noHeaders: 'Es konnten keine Spaltennamen ermittelt werden. Sind in der Datei Spaltendefinitionen enthalten?',
          noObjects: 'Es konnten keine Zeileninformationen gelesen werden, Sind in der Datei außer den Spaltendefinitionen auch Daten enthalten?',
          invalidCsv: 'Die Datei konnte nicht eingelesen werden, ist es eine gültige CSV-Datei?',
          invalidJson: 'Die Datei konnte nicht eingelesen werden. Enthält sie gültiges JSON?',
          jsonNotArray: 'Die importierte JSON-Datei muß ein Array enthalten. Breche Import ab.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Zum Anfang',
            pageBack: 'Seite zurück',
            pageSelected: 'Ausgewählte Seite',
            pageForward: 'Seite vor',
            pageToLast: 'Zum Ende'
          },
          sizes: 'Einträge pro Seite',
          totalItems: 'Einträgen',
          through: 'bis',
          of: 'von'
        },
        grouping: {
            group: 'Gruppieren',
            ungroup: 'Gruppierung aufheben',
            aggregate_count: 'Agg: Anzahl',
            aggregate_sum: 'Agg: Summe',
            aggregate_max: 'Agg: Maximum',
            aggregate_min: 'Agg: Minimum',
            aggregate_avg: 'Agg: Mittelwert',
            aggregate_remove: 'Aggregation entfernen'
        }
      });
      return $delegate;
    }]);
  }]);
})();
