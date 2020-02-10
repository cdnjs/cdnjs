/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
	angular.module('ui.grid').config(['$provide', function($provide) {
		$provide.decorator('i18nService', ['$delegate', function($delegate) {
			$delegate.add('sk', {
				headerCell: {
					aria: {
						defaultFilterLabel: 'Filter pre stĺpec',
						removeFilter: 'Odstrániť filter',
						columnMenuButtonLabel: 'Menu pre stĺpec',
						column: 'Stĺpec'
					},
					priority: 'Priorita:',
					filterLabel: "Filter pre stĺpec: "
				},
				aggregate: {
					label: 'položky'
				},
				groupPanel: {
					description: 'Pretiahni sem názov stĺpca pre zoskupenie podľa toho stĺpca.'
				},
				search: {
					aria: {
						selected: 'Označený riadok',
						notSelected: 'Neoznačený riadok'
					},
					placeholder: 'Hľadaj...',
					showingItems: 'Zobrazujem položky:',
					selectedItems: 'Vybraté položky:',
					totalItems: 'Počet položiek:',
					size: 'Počet:',
					first: 'Prvá strana',
					next: 'Ďalšia strana',
					previous: 'Predchádzajúca strana',
					last: 'Posledná strana'
				},
				menu: {
					text: 'Vyberte stĺpce:'
				},
				sort: {
					ascending: 'Zotriediť vzostupne',
					descending: 'Zotriediť zostupne',
					none: 'Nezotriediť',
					remove: 'Vymazať triedenie'
				},
				column: {
					hide: 'Skryť stĺpec'
				},
				aggregation: {
					count: 'počet riadkov: ',
					sum: 'spolu: ',
					avg: 'avg: ',
					min: 'min: ',
					max: 'max: '
				},
				pinning: {
					pinLeft: 'Pripnúť vľavo',
					pinRight: 'Pripnúť vpravo',
					unpin: 'Odopnúť'
				},
				columnMenu: {
					close: 'Zavrieť'
				},
				gridMenu: {
					aria: {
						buttonLabel: 'Grid Menu'
					},
					columns: 'Stĺpce:',
					importerTitle: 'Importovať súbor',
					exporterAllAsCsv: 'Exportovať všetky údaje ako CSV',
					exporterVisibleAsCsv: 'Exportovť viditeľné údaje ako CSV',
					exporterSelectedAsCsv: 'Exportovať označené údaje ako CSV',
					exporterAllAsPdf: 'Exportovať všetky údaje ako pdf',
					exporterVisibleAsPdf: 'Exportovať viditeľné údaje ako pdf',
					exporterSelectedAsPdf: 'Exportovať označené údaje ako pdf',
					exporterAllAsExcel: 'Exportovať všetky údaje ako excel',
					exporterVisibleAsExcel: 'Exportovať viditeľné údaje ako excel',
					exporterSelectedAsExcel: 'Exportovať označené údaje ako excel',
					clearAllFilters: 'Zrušiť všetky filtre'
				},
				importer: {
					noHeaders: 'Názvy stĺpcov sa nedali odvodiť, má súbor hlavičku?',
					noObjects: 'Objekty nebolo možné odvodiť, existovali iné údaje v súbore ako hlavičky?',
					invalidCsv: 'Súbor sa nepodarilo spracovať, je to platný súbor CSV?',
					invalidJson: 'Súbor nebolo možné spracovať, je to platný súbor typu Json?',
					jsonNotArray: 'Importovaný súbor json musí obsahovať pole, ukončujem.'
				},
				pagination: {
					aria: {
						pageToFirst: 'Strana na začiatok',
						pageBack: 'Strana dozadu',
						pageSelected: 'Označená strana',
						pageForward: 'Strana dopredu',
						pageToLast: 'Strana na koniec'
					},
					sizes: 'položky na stranu',
					totalItems: 'položky spolu',
					through: 'do konca',
					of: 'z'
				},
				grouping: {
					group: 'Zoskupiť',
					ungroup: 'Zrušiť zoskupenie',
					aggregate_count: 'Agg: Počet',

					aggregate_sum: 'Agg: Suma',
					aggregate_max: 'Agg: Max',
					aggregate_min: 'Agg: Min',
					aggregate_avg: 'Agg: Avg',
					aggregate_remove: 'Agg: Zrušiť'
				},
				validate: {
					error: 'Chyba:',
					minLength: 'Hodnota by mala mať aspoň THRESHOLD znakov dlhá.',
					maxLength: 'Hodnota by mala byť maximálne THRESHOLD znakov dlhá.',
					required: 'Vyžaduje sa hodnota.'
				}
			});
			return $delegate;
		}]);
	}]);
})();
