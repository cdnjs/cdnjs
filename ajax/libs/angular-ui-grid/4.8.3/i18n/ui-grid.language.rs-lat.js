/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
	angular.module('ui.grid').config(['$provide', function($provide) {
		$provide.decorator('i18nService', ['$delegate', function($delegate) {
			$delegate.add('rs-lat', {
				headerCell: {
					aria: {
						defaultFilterLabel: 'Filter za kolonu',
						removeFilter: 'Ukloni Filter',
						columnMenuButtonLabel: 'Meni Kolone',
						column: 'Kolona'
					},
					priority: 'Prioritet:',
					filterLabel: "Filter za kolonu: "
				},
				aggregate: {
					label: 'stavke'
				},
				groupPanel: {
					description: 'Ovde prevuci zaglavlje kolone i spusti do grupe pored te kolone.'
				},
				search: {
					aria: {
						selected: 'Red odabran',
						notSelected: 'Red nije odabran'
					},
					placeholder: 'Pretraga...',
					showingItems: 'Prikazane Stavke:',
					selectedItems: 'Odabrane Stavke:',
					totalItems: 'Ukupno Stavki:',
					size: 'Veličina Stranice:',
					first: 'Prva Stranica',
					next: 'Sledeća Stranica',
					previous: 'Prethodna Stranica',
					last: 'Poslednja Stranica'
				},
				menu: {
					text: 'Odaberite kolonu:'
				},
				sort: {
					ascending: 'Sortiraj po rastućem redosledu',
					descending: 'Sortiraj po opadajućem redosledu',
					none: 'Bez Sortiranja',
					remove: 'Ukloni Sortiranje'
				},
				column: {
					hide: 'Sakrij Kolonu'
				},
				aggregation: {
					count: 'ukupno redova: ',
					sum: 'ukupno: ',
					avg: 'prosecno: ',
					min: 'minimum: ',
					max: 'maksimum: '
				},
				pinning: {
					pinLeft: 'Zakači Levo',
					pinRight: 'Zakači Desno',
					unpin: 'Otkači'
				},
				columnMenu: {
					close: 'Zatvori'
				},
				gridMenu: {
					aria: {
						buttonLabel: 'Rešetkasti Meni'
					},
					columns: 'Kolone:',
					importerTitle: 'Importuj fajl',
					exporterAllAsCsv: 'Eksportuj sve podatke kao csv',
					exporterVisibleAsCsv: 'Eksportuj vidljive podatke kao csv',
					exporterSelectedAsCsv: 'Eksportuj obeležene podatke kao csv',
					exporterAllAsPdf: 'Eksportuj sve podatke kao pdf',
					exporterVisibleAsPdf: 'Eksportuj vidljive podake kao pdf',
					exporterSelectedAsPdf: 'Eksportuj odabrane podatke kao pdf',
					exporterAllAsExcel: 'Eksportuj sve podatke kao excel',
					exporterVisibleAsExcel: 'Eksportuj vidljive podatke kao excel',
					exporterSelectedAsExcel: 'Eksportuj odabrane podatke kao excel',
					clearAllFilters: 'Obriši sve filtere'
				},
				importer: {
					noHeaders: 'Kolone se nisu mogle podeliti, da li fajl poseduje heder?',
					noObjects: 'Objecti nisu mogli biti podeljeni, da li je bilo i drugih podataka sem hedera?',
					invalidCsv: 'Fajl nije bilo moguće procesirati, da li je ispravni CSV?',
					invalidJson: 'Fajl nije bilo moguće procesirati, da li je ispravni JSON',
					jsonNotArray: 'Importovani json fajl mora da sadrži niz, prekidam operaciju.'
				},
				pagination: {
					aria: {
						pageToFirst: 'Prva stranica',
						pageBack: 'Stranica pre',
						pageSelected: 'Odabrana stranica',
						pageForward: 'Sledeća stranica',
						pageToLast: 'Poslednja stranica'
					},
					sizes: 'stavki po stranici',
					totalItems: 'stavke',
					through: 'kroz',
					of: 'od'
				},
				grouping: {
					group: 'Grupiši',
					ungroup: 'Odrupiši',
					aggregate_count: 'Agg: Broj',
					aggregate_sum: 'Agg: Suma',
					aggregate_max: 'Agg: Maksimum',
					aggregate_min: 'Agg: Minimum',
					aggregate_avg: 'Agg: Prosečna',
					aggregate_remove: 'Agg: Ukloni'
				},
				validate: {
					error: 'Greška:',
					minLength: 'Vrednost bi trebala da bude duga bar THRESHOLD karaktera.',
					maxLength: 'Vrednost bi trebalo da bude najviše duga THRESHOLD karaktera.',
					required: 'Portreba je vrednost.'
				}
			});
			return $delegate;
		}]);
	}]);
})();
