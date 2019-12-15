/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
	angular.module('ui.grid').config(['$provide', function($provide) {
		$provide.decorator('i18nService', ['$delegate', function($delegate) {
			$delegate.add('da', {
				aggregate: {
					label: 'artikler'
				},
				groupPanel: {
					description: 'Grupér rækker udfra en kolonne ved at trække dens overskift hertil.'
				},
				search: {
					placeholder: 'Søg...',
					showingItems: 'Viste rækker:',
					selectedItems: 'Valgte rækker:',
					totalItems: 'Rækker totalt:',
					size: 'Side størrelse:',
					first: 'Første side',
					next: 'Næste side',
					previous: 'Forrige side',
					last: 'Sidste side'
				},
				menu: {
					text: 'Vælg kolonner:'
				},
				sort: {
					ascending: 'Sorter stigende',
					descending: 'Sorter faldende',
					none: 'Sorter ingen',
					remove: 'Fjern sortering'
				},
				column: {
					hide: 'Skjul kolonne'
				},
				aggregation: {
					count: 'antal rækker: ',
					sum: 'sum: ',
					avg: 'gns: ',
					min: 'min: ',
					max: 'max: '
				},
				pinning: {
					pinLeft: 'Fastgør til venstre',
					pinRight: 'Fastgør til højre',
					unpin: 'Frigør'
				},
				gridMenu: {
					columns: 'Kolonner:',
					importerTitle: 'Importer fil',
					exporterAllAsCsv: 'Eksporter alle data som csv',
					exporterVisibleAsCsv: 'Eksporter synlige data som csv',
					exporterSelectedAsCsv: 'Eksporter markerede data som csv',
					exporterAllAsPdf: 'Eksporter alle data som pdf',
					exporterVisibleAsPdf: 'Eksporter synlige data som pdf',
					exporterSelectedAsPdf: 'Eksporter markerede data som pdf',
					exporterAllAsExcel: 'Eksporter alle data som excel',
					exporterVisibleAsExcel: 'Eksporter synlige data som excel',
					exporterSelectedAsExcel: 'Eksporter markerede data som excel',
					clearAllFilters: 'Clear all filters'
				},
				importer: {
					noHeaders: 'Column names were unable to be derived, does the file have a header?',
					noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
					invalidCsv: 'File was unable to be processed, is it valid CSV?',
					invalidJson: 'File was unable to be processed, is it valid Json?',
					jsonNotArray: 'Imported json file must contain an array, aborting.'
				},
				pagination: {
					aria: {
						pageToFirst: 'Gå til første',
						pageBack: 'Gå tilbage',
						pageSelected: 'Valgte side',
						pageForward: 'Gå frem',
						pageToLast: 'Gå til sidste'
					},
					sizes: 'genstande per side',
					totalItems: 'genstande',
					through: 'gennem',
					of: 'af'
				}
			});
			return $delegate;
		}]);
	}]);
})();
