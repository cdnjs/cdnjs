/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('fr', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filtre de la colonne',
            removeFilter: 'Supprimer le filtre',
            columnMenuButtonLabel: 'Menu de la colonne'
          },
          priority: 'Priorité:',
          filterLabel: "Filtre de la colonne: "
        },
        aggregate: {
          label: 'éléments'
        },
        groupPanel: {
          description: 'Faites glisser une en-tête de colonne ici pour créer un groupe de colonnes.'
        },
        search: {
          placeholder: 'Recherche...',
          showingItems: 'Affichage des éléments :',
          selectedItems: 'Éléments sélectionnés :',
          totalItems: 'Nombre total d\'éléments:',
          size: 'Taille de page:',
          first: 'Première page',
          next: 'Page Suivante',
          previous: 'Page précédente',
          last: 'Dernière page'
        },
        menu: {
          text: 'Choisir des colonnes :'
        },
        sort: {
          ascending: 'Trier par ordre croissant',
          descending: 'Trier par ordre décroissant',
          none: 'Aucun tri',
          remove: 'Enlever le tri'
        },
        column: {
          hide: 'Cacher la colonne'
        },
        aggregation: {
          count: 'lignes totales: ',
          sum: 'total: ',
          avg: 'moy: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Épingler à gauche',
          pinRight: 'Épingler à droite',
          unpin: 'Détacher'
        },
        columnMenu: {
          close: 'Fermer'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Menu du tableau'
          },
          columns: 'Colonnes:',
          importerTitle: 'Importer un fichier',
          exporterAllAsCsv: 'Exporter toutes les données en CSV',
          exporterVisibleAsCsv: 'Exporter les données visibles en CSV',
          exporterSelectedAsCsv: 'Exporter les données sélectionnées en CSV',
          exporterAllAsPdf: 'Exporter toutes les données en PDF',
          exporterVisibleAsPdf: 'Exporter les données visibles en PDF',
          exporterSelectedAsPdf: 'Exporter les données sélectionnées en PDF',
          exporterAllAsExcel: 'Exporter toutes les données en Excel',
          exporterVisibleAsExcel: 'Exporter les données visibles en Excel',
          exporterSelectedAsExcel: 'Exporter les données sélectionnées en Excel',
          clearAllFilters: 'Nettoyez tous les filtres'
        },
        importer: {
          noHeaders: 'Impossible de déterminer le nom des colonnes, le fichier possède-t-il une en-tête ?',
          noObjects: 'Aucun objet trouvé, le fichier possède-t-il des données autres que l\'en-tête ?',
          invalidCsv: 'Le fichier n\'a pas pu être traité, le CSV est-il valide ?',
          invalidJson: 'Le fichier n\'a pas pu être traité, le JSON est-il valide ?',
          jsonNotArray: 'Le fichier JSON importé doit contenir un tableau, abandon.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Aller à la première page',
            pageBack: 'Page précédente',
            pageSelected: 'Page sélectionnée',
            pageForward: 'Page suivante',
            pageToLast: 'Aller à la dernière page'
          },
          sizes: 'éléments par page',
          totalItems: 'éléments',
          through: 'à',
          of: 'sur'
        },
        grouping: {
          group: 'Grouper',
          ungroup: 'Dégrouper',
          aggregate_count: 'Agg: Compter',
          aggregate_sum: 'Agg: Somme',
          aggregate_max: 'Agg: Max',
          aggregate_min: 'Agg: Min',
          aggregate_avg: 'Agg: Moy',
          aggregate_remove: 'Agg: Retirer'
        },
        validate: {
          error: 'Erreur:',
          minLength: 'La valeur doit être supérieure ou égale à THRESHOLD caractères.',
          maxLength: 'La valeur doit être inférieure ou égale à THRESHOLD caractères.',
          required: 'Une valeur est nécéssaire.'
        }
      });
      return $delegate;
    }]);
  }]);
})();
