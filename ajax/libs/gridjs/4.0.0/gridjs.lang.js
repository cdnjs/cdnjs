(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.gridjs = {}));
}(this, (function (exports) { 'use strict';

  var en_US = {
      search: {
          placeholder: 'Type a keyword...',
      },
      sort: {
          sortAsc: 'Sort column ascending',
          sortDesc: 'Sort column descending',
      },
      pagination: {
          previous: 'Previous',
          next: 'Next',
          navigate: function (page, pages) { return "Page " + page + " of " + pages; },
          page: function (page) { return "Page " + page; },
          showing: 'Showing',
          of: 'of',
          to: 'to',
          results: 'results',
      },
      loading: 'Loading...',
      noRecordsFound: 'No matching records found',
      error: 'An error happened while fetching the data',
  };

  var es_ES = {
      search: {
          placeholder: '🔍 Busqueda...',
      },
      sort: {
          sortAsc: 'Ordenar la columna en orden ascendente',
          sortDesc: 'Ordenar la columna en orden descendente',
      },
      pagination: {
          previous: 'Anterior',
          next: 'Siguiente',
          navigate: function (page, pages) { return "P\u00E1gina " + page + " de " + pages; },
          page: function (page) { return "P\u00E1gina " + page; },
          showing: 'Mostrando los resultados',
          of: 'sobre',
          to: 'a',
          results: '',
      },
      loading: 'Cargando...',
      noRecordsFound: 'Nigún resultado encontrado',
      error: 'Se produjo un error al recuperar datos',
  };

  var fr_FR = {
      search: {
          placeholder: '🔍 Recherche...',
      },
      sort: {
          sortAsc: 'Trier la colonne dans l\'ordre croissant',
          sortDesc: 'Trier la colonne dans l\'ordre décroissant',
      },
      pagination: {
          previous: 'Précédent',
          next: 'Suivant',
          navigate: function (page, pages) { return "Page " + page + " de " + pages; },
          page: function (page) { return "Page " + page; },
          showing: 'Affichage des résultats',
          of: 'sur',
          to: 'à',
          results: '',
      },
      loading: 'Chargement...',
      noRecordsFound: 'Aucun résultat trouvé',
      error: 'Une erreur est survenue lors de la récupération des données',
  };

  var it_IT = {
      search: {
          placeholder: 'Ricerca...',
      },
      sort: {
          sortAsc: 'Ordina ascendente',
          sortDesc: 'Ordina discendente',
      },
      pagination: {
          previous: 'Precedente',
          next: 'Successivo',
          navigate: function (page, pages) { return "Pagina " + page + " di " + pages; },
          page: function (page) { return "Pagina " + page; },
          showing: 'Mostra',
          of: 'di',
          to: 'di',
          results: 'risultati',
      },
      loading: 'Caricamento...',
      noRecordsFound: 'Nessun risultato trovato',
      error: 'Errore durante il caricamento dei dati.',
  };

  exports.enUS = en_US;
  exports.esES = es_ES;
  exports.frFR = fr_FR;
  exports.itIT = it_IT;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
