/*!
 * ui-grid - v4.8.3 - 2019-10-21
 * Copyright (c) 2019 ; License: MIT 
 */

(function() {
	angular.module('ui.grid').config(['$provide', function($provide) {
		$provide.decorator('i18nService', ['$delegate', function($delegate) {
			$delegate.add('ar', {
				"headerCell": {
					"aria": {
						"defaultFilterLabel": "التصفيه بالعمود",
						"removeFilter": "محو التصفيه",
						"columnMenuButtonLabel": "قاءمه الاعمده"
					},
					"priority": "أولويه : ",
					"filterLabel": "تصفيه بالاعمده :"
				},
				"aggregate": {
					"label": "العناصر"
				},
				"groupPanel": {
					"description": "اسحب رأس العمود هنا وأسقطه لإنشاء مجموعه"
				},
				"search": {
					"placeholder": "بحث  ...",
					"showingItems": "العناصر الظاهره :",
					"selectedItems": "العناصر المحدده :",
					"totalItems": "عدد العناصر :",
					"size": "حجم الصفحه :",
					"first": "اول صفحه",
					"next": "الصفحه التاليه",
					"previous": "الصفحه الصابقه",
					"last": "الصفحه الاخيره"
				},
				"menu": {
					"text": "اختيار العمود :"
				},
				"sort": {
					"ascending": "ترتيب تصاعدى",
					"descending": "ترتيب تنازلى",
					"none": "عدم التحديد",
					"remove": "حذف الترتيب"
				},
				"column": {
					"hide": "إخفاء عمود"
				},
				"aggregation": {
					"count": "عدد الصفوف: ",
					"sum": "جمع: ",
					"avg": "المتوسط الحسابى: ",
					"min": "الادنى: ",
					"max": "الاقصى: "
				},
				"pinning": {
					"pinLeft": "تثبيت لليسار",
					"pinRight": "تثبيت لليمين",
					"unpin": "فك التثبيت"
				},
				"columnMenu": {
					"close": "غلق"
				},
				"gridMenu": {
					"aria": {
						"buttonLabel": "قائمه الجدول"
					},
					"columns": "الاعمده:",
					"importerTitle": "إدخال ملف",
					"exporterAllAsCsv": "إخراج كل البيانات ك(csv)",
					"exporterVisibleAsCsv": "إخراج كل البيانات الواضحه ك (csv)",
					"exporterSelectedAsCsv": "إخراج كل البيانات المحدده ك (csv)",
					"exporterAllAsPdf": "إخراج كل البيانات ك(pdf)",
					"exporterVisibleAsPdf": "إخراج كل البيانات الواضحه ك (pdf)",
					"exporterSelectedAsPdf": "إخراج كل البيانات المحدده ك (pdf)",
					"clearAllFilters": "محو كل الترشيح"
				},
				"importer": {
					"noHeaders": "اسماء هؤلاء الاعمده غير واضحه، هل يوجد رأس للملف؟",
					"noObjects": "Objects were not able to be derived, was there data in the file other than headers?",
					"invalidCsv": "الملف غير قادر على الاتمام ، هل ال (CSV) صحيح؟",
					"invalidJson": "الملف غير قادر على الاتمام ، هل ال (JSON) صحيح؟",
					"jsonNotArray": "Imported json file must contain an array, aborting."
				},
				"pagination": {
					"aria": {
						"pageToFirst": "الصفحه الاولى",
						"pageBack": "الصفه السابقه",
						"pageSelected": "الصفحه المحدده",
						"pageForward": "الصفحه التاليه",
						"pageToLast": "الصفحه الاخيره"
					},
					"sizes": "عدد العناصر فى الصفحه",
					"totalItems": "عناصر",
					"through": "إلى",
					"of": "من"
				},
				"grouping": {
					"group": "جمع",
					"ungroup": "فك الجمع",
					"aggregate_count": "جمله : العدد",
					"aggregate_sum": "جمله : الحاصل",
					"aggregate_max": "جمله : الاقصى",
					"aggregate_min": "جمله : الاقل",
					"aggregate_avg": "جمله :المتوسط ",
					"aggregate_remove": "جمله : حذف"
				},
				"validate": {
					"error": "خطأ :",
					"minLength": "القيمه لابد ان لا تقل عن THRESHOLD حرف.",
					"maxLength": "القيمه لابد ان لا تزيد عن THRESHOLD حرف.",
					"required": "مطلوب قيمه"
				}
			});
			return $delegate;
		}]);
	}]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('bg', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Филттър за колоната',
            removeFilter: 'Премахни филтър',
            columnMenuButtonLabel: 'Меню на колоната'
          },
          priority: 'Приоритет:',
          filterLabel: "Филтър за колоната: "
        },
        aggregate: {
          label: 'обекти'
        },
        search: {
          placeholder: 'Търсене...',
          showingItems: 'Показани обекти:',
          selectedItems: 'избрани обекти:',
          totalItems: 'Общо:',
          size: 'Размер на страницата:',
          first: 'Първа страница',
          next: 'Следваща страница',
          previous: 'Предишна страница',
          last: 'Последна страница'
        },
        menu: {
          text: 'Избери колони:'
        },
        sort: {
          ascending: 'Сортиране по възходящ ред',
          descending: 'Сортиране по низходящ ред',
          none: 'Без сортиране',
          remove: 'Премахни сортирането'
        },
        column: {
          hide: 'Скрий колоната'
        },
        aggregation: {
          count: 'Общо редове: ',
          sum: 'общо: ',
          avg: 'средно: ',
          min: 'най-малко: ',
          max: 'най-много: '
        },
        pinning: {
          pinLeft: 'Прикрепи вляво',
          pinRight: 'Прикрепи вдясно',
          unpin: 'Премахване'
        },
        columnMenu: {
          close: 'Затвори'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Меню на таблицата'
          },
          columns: 'Колони:',
          importerTitle: 'Импортиране на файл',
          exporterAllAsCsv: 'Експортиране на данните като csv',
          exporterVisibleAsCsv: 'Експортиране на видимите данни като csv',
          exporterSelectedAsCsv: 'Експортиране на избраните данни като csv',
          exporterAllAsPdf: 'Експортиране на данните като pdf',
          exporterVisibleAsPdf: 'Експортиране на видимите данни като pdf',
          exporterSelectedAsPdf: 'Експортиране на избраните данни като pdf',
          clearAllFilters: 'Премахни всички филтри'
        },
        importer: {
          noHeaders: 'Имената на колоните не успяха да бъдат извлечени, файлът има ли хедър?',
          noObjects: 'Обектите не успяха да бъдат извлечени, файлът съдържа ли данни, различни от хедър?',
          invalidCsv: 'Файлът не може да бъде обработеб, уверете се, че е валиден CSV файл',
          invalidJson: 'Файлът не може да бъде обработеб, уверете се, че е валиден JSON файл',
          jsonNotArray: 'Импортираният JSON файл трябва да съдържа масив, прекратяване.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Към първа страница',
            pageBack: 'Страница назад',
            pageSelected: 'Избрана страница',
            pageForward: 'Страница напред',
            pageToLast: 'Към последна страница'
          },
          sizes: 'обекта на страница',
          totalItems: 'обекта',
          through: 'до',
          of: 'от'
        },
        grouping: {
          group: 'Групиране',
          ungroup: 'Премахване на групирането',
          aggregate_count: 'Сбор: Брой',
          aggregate_sum: 'Сбор: Сума',
          aggregate_max: 'Сбор: Максимум',
          aggregate_min: 'Сбор: Минимум',
          aggregate_avg: 'Сбор: Средно',
          aggregate_remove: 'Сбор: Премахване'
        },
        validate: {
          error: 'Грешка:',
          minLength: 'Стойността трябва да съдържа поне THRESHOLD символа.',
          maxLength: 'Стойността не трябва да съдържа повече от THRESHOLD символа.',
          required: 'Необходима е стойност.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      var lang = {
              aggregate: {
                  label: 'položky'
              },
              groupPanel: {
                  description: 'Přesuňte záhlaví zde pro vytvoření skupiny dle sloupce.'
              },
              search: {
                  placeholder: 'Hledat...',
                  showingItems: 'Zobrazuji položky:',
                  selectedItems: 'Vybrané položky:',
                  totalItems: 'Celkem položek:',
                  size: 'Velikost strany:',
                  first: 'První strana',
                  next: 'Další strana',
                  previous: 'Předchozí strana',
                  last: 'Poslední strana'
              },
              menu: {
                  text: 'Vyberte sloupec:'
              },
              sort: {
                  ascending: 'Seřadit od A-Z',
                  descending: 'Seřadit od Z-A',
                  remove: 'Odebrat seřazení'
              },
              column: {
                  hide: 'Schovat sloupec'
              },
              aggregation: {
                  count: 'celkem řádků: ',
                  sum: 'celkem: ',
                  avg: 'avg: ',
                  min: 'min.: ',
                  max: 'max.: '
              },
              pinning: {
                  pinLeft: 'Zamknout vlevo',
                  pinRight: 'Zamknout vpravo',
                  unpin: 'Odemknout'
              },
              gridMenu: {
                  columns: 'Sloupce:',
                  importerTitle: 'Importovat soubor',
                  exporterAllAsCsv: 'Exportovat všechna data do csv',
                  exporterVisibleAsCsv: 'Exportovat viditelná data do csv',
                  exporterSelectedAsCsv: 'Exportovat vybraná data do csv',
                  exporterAllAsPdf: 'Exportovat všechna data do pdf',
                  exporterVisibleAsPdf: 'Exportovat viditelná data do pdf',
                  exporterSelectedAsPdf: 'Exportovat vybraná data do pdf',
                  exporterAllAsExcel: 'Exportovat všechna data do excel',
                  exporterVisibleAsExcel: 'Exportovat viditelná data do excel',
                  exporterSelectedAsExcel: 'Exportovat vybraná data do excel',
                  clearAllFilters: 'Odstranit všechny filtry'
              },
              importer: {
                  noHeaders: 'Názvy sloupců se nepodařilo získat, obsahuje soubor záhlaví?',
                  noObjects: 'Data se nepodařilo zpracovat, obsahuje soubor řádky mimo záhlaví?',
                  invalidCsv: 'Soubor nelze zpracovat, jedná se o CSV?',
                  invalidJson: 'Soubor nelze zpracovat, je to JSON?',
                  jsonNotArray: 'Soubor musí obsahovat json. Ukončuji..'
              },
              pagination: {
                  sizes: 'položek na stránku',
                  totalItems: 'položek'
              },
              grouping: {
                  group: 'Seskupit',
                  ungroup: 'Odebrat seskupení',
                  aggregate_count: 'Agregace: Count',
                  aggregate_sum: 'Agregace: Sum',
                  aggregate_max: 'Agregace: Max',
                  aggregate_min: 'Agregace: Min',
                  aggregate_avg: 'Agregace: Avg',
                  aggregate_remove: 'Agregace: Odebrat'
              }
          };

          // support varianty of different czech keys.
          $delegate.add('cs', lang);
          $delegate.add('cz', lang);
          $delegate.add('cs-cz', lang);
          $delegate.add('cs-CZ', lang);
      return $delegate;
    }]);
  }]);
})();

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

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('es-ct', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filtre per columna',
            removeFilter: 'Elimina el filtre',
            columnMenuButtonLabel: 'Menú de Columna',
            column: 'Columna'
          },
          priority: 'Priority:',
          filterLabel: 'Filtre per columna: '
        },
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'Arrossegueu una capçalera de columna aquí i deixeu-lo anar per agrupar per aquesta columna.'
        },
        search: {
          aria: {
            selected: 'Fila seleccionada',
            notSelected: 'Fila no seleccionada'
          },
          placeholder: 'Cerca...',
          showingItems: 'Ítems Mostrats:',
          selectedItems: 'Ítems Seleccionats:',
          totalItems: 'Ítems Totals:',
          size: 'Mida de la pàgina:',
          first: 'Primera Pàgina',
          next: 'Propera Pàgina',
          previous: 'Pàgina Anterior',
          last: 'Última Pàgina'
        },
        menu: {
          text: 'Triar Columnes:'
        },
        sort: {
          ascending: 'Ordena Ascendent',
          descending: 'Ordena Descendent',
          none: 'Sense Ordre',
          remove: 'Eliminar Ordre'
        },
        column: {
          hide: 'Amaga la Columna'
        },
        aggregation: {
          count: 'Files Totals: ',
          sum: 'total: ',
          avg: 'mitjà: ',
          min: 'mín: ',
          max: 'màx: '
        },
        pinning: {
          pinLeft: "Fixar a l'Esquerra",
          pinRight: 'Fixar a la Dreta',
          unpin: 'Treure Fixació'
        },
        columnMenu: {
          close: 'Tanca'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Menú de Quadrícula'
          },
          columns: 'Columnes:',
          importerTitle: 'Importa el fitxer',
          exporterAllAsCsv: 'Exporta tot com CSV',
          exporterVisibleAsCsv: 'Exporta les dades visibles com a CSV',
          exporterSelectedAsCsv: 'Exporta les dades seleccionades com a CSV',
          exporterAllAsPdf: 'Exporta tot com PDF',
          exporterVisibleAsPdf: 'Exporta les dades visibles com a PDF',
          exporterSelectedAsPdf: 'Exporta les dades seleccionades com a PDF',
          exporterAllAsExcel: 'Exporta tot com Excel',
          exporterVisibleAsExcel: 'Exporta les dades visibles com Excel',
          exporterSelectedAsExcel: 'Exporta les dades seleccionades com Excel',
          clearAllFilters: 'Netejar tots els filtres'
        },
        importer: {
          noHeaders: "No va ser possible derivar els noms de les columnes, té encapçalats l'arxiu?",
          noObjects: "No va ser possible obtenir registres, conté dades l'arxiu, a part de les capçaleres?",
          invalidCsv: "No va ser possible processar l'arxiu, ¿és un CSV vàlid?",
          invalidJson: "No va ser possible processar l'arxiu, ¿és un JSON vàlid?",
          jsonNotArray: 'El fitxer json importat ha de contenir una matriu, avortant.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Page to first',
            pageBack: 'Page back',
            pageSelected: 'Selected page',
            pageForward: 'Page forward',
            pageToLast: 'Page to last'
          },
          sizes: 'ítems per pàgina',
          totalItems: 'ítems',
          through: 'a',
          of: 'de'
        },
        grouping: {
          group: 'Agrupar',
          ungroup: 'Desagrupar',
          aggregate_count: 'Agr: Compte',
          aggregate_sum: 'Agr: Sum',
          aggregate_max: 'Agr: Máx',
          aggregate_min: 'Agr: Mín',
          aggregate_avg: 'Agr: Mitjà',
          aggregate_remove: 'Agr: Treure'
        },
        validate: {
          error: 'Error:',
          minLength: 'El valor ha de tenir almenys caràcters THRESHOLD.',
          maxLength: 'El valor ha de tenir com a màxim caràcters THRESHOLD.',
          required: 'Un valor és necessari.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('es', {
        aggregate: {
          label: 'Artículos'
        },
        groupPanel: {
          description: 'Arrastre un encabezado de columna aquí y suéltelo para agrupar por esa columna.'
        },
        search: {
          placeholder: 'Buscar...',
          showingItems: 'Artículos Mostrados:',
          selectedItems: 'Artículos Seleccionados:',
          totalItems: 'Artículos Totales:',
          size: 'Tamaño de Página:',
          first: 'Primera Página',
          next: 'Página Siguiente',
          previous: 'Página Anterior',
          last: 'Última Página'
        },
        menu: {
          text: 'Elegir columnas:'
        },
        sort: {
          ascending: 'Orden Ascendente',
          descending: 'Orden Descendente',
          remove: 'Sin Ordenar'
        },
        column: {
          hide: 'Ocultar la columna'
        },
        aggregation: {
          count: 'filas totales: ',
          sum: 'total: ',
          avg: 'media: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Fijar a la Izquierda',
          pinRight: 'Fijar a la Derecha',
          unpin: 'Quitar Fijación'
        },
        gridMenu: {
          columns: 'Columnas:',
          importerTitle: 'Importar archivo',
          exporterAllAsCsv: 'Exportar todo como csv',
          exporterVisibleAsCsv: 'Exportar vista como csv',
          exporterSelectedAsCsv: 'Exportar selección como csv',
          exporterAllAsPdf: 'Exportar todo como pdf',
          exporterVisibleAsPdf: 'Exportar vista como pdf',
          exporterSelectedAsPdf: 'Exportar selección como pdf',
          exporterAllAsExcel: 'Exportar todo como excel',
          exporterVisibleAsExcel: 'Exportar vista como excel',
          exporterSelectedAsExcel: 'Exportar selección como excel',
          clearAllFilters: 'Limpiar todos los filtros'
        },
        importer: {
          noHeaders: 'No fue posible derivar los nombres de las columnas, ¿tiene encabezados el archivo?',
          noObjects: 'No fue posible obtener registros, ¿contiene datos el archivo, aparte de los encabezados?',
          invalidCsv: 'No fue posible procesar el archivo, ¿es un CSV válido?',
          invalidJson: 'No fue posible procesar el archivo, ¿es un Json válido?',
          jsonNotArray: 'El archivo json importado debe contener un array, abortando.'
        },
        pagination: {
          aria: {
										pageToFirst: 'Página para primero',
										pageBack: 'Página atrás',
										pageSelected: 'Página seleccionada',
										pageForward: 'Avance de página',
										pageToLast: 'Página para durar'
									},
          through: 'mediante',
          sizes: 'registros por página',
          totalItems: 'registros',
          of: 'de'
        },
        grouping: {
          group: 'Agrupar',
          ungroup: 'Desagrupar',
          aggregate_count: 'Agr: Cont',
          aggregate_sum: 'Agr: Sum',
          aggregate_max: 'Agr: Máx',
          aggregate_min: 'Agr: Min',
          aggregate_avg: 'Agr: Prom',
          aggregate_remove: 'Agr: Quitar'
        }
      });
      return $delegate;
    }]);
}]);
})();

/**
 * Translated by: R. Salarmehr
 *                M. Hosseynzade
 *                Using Vajje.com online dictionary.
 */
(function () {
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('i18nService', ['$delegate', function ($delegate) {
      $delegate.add('fa', {
        aggregate: {
          label: 'قلم'
        },
        groupPanel: {
          description: 'عنوان یک ستون را بگیر و به گروهی از آن ستون رها کن.'
        },
        search: {
          placeholder: 'جستجو...',
          showingItems: 'نمایش اقلام:',
          selectedItems: 'قلم\u200cهای انتخاب شده:',
          totalItems: 'مجموع اقلام:',
          size: 'اندازه\u200cی صفحه:',
          first: 'اولین صفحه',
          next: 'صفحه\u200cی\u200cبعدی',
          previous: 'صفحه\u200cی\u200c قبلی',
          last: 'آخرین صفحه'
        },
        menu: {
          text: 'ستون\u200cهای انتخابی:'
        },
        sort: {
          ascending: 'ترتیب صعودی',
          descending: 'ترتیب نزولی',
          remove: 'حذف مرتب کردن'
        },
        column: {
          hide: 'پنهان\u200cکردن ستون'
        },
        aggregation: {
          count: 'تعداد: ',
          sum: 'مجموع: ',
          avg: 'میانگین: ',
          min: 'کمترین: ',
          max: 'بیشترین: '
        },
        pinning: {
          pinLeft: 'پین کردن سمت چپ',
          pinRight: 'پین کردن سمت راست',
          unpin: 'حذف پین'
        },
        gridMenu: {
          columns: 'ستون\u200cها:',
          importerTitle: 'وارد کردن فایل',
          exporterAllAsCsv: 'خروجی تمام داده\u200cها در فایل csv',
          exporterVisibleAsCsv: 'خروجی داده\u200cهای قابل مشاهده در فایل csv',
          exporterSelectedAsCsv: 'خروجی داده\u200cهای انتخاب\u200cشده در فایل csv',
          exporterAllAsPdf: 'خروجی تمام داده\u200cها در فایل pdf',
          exporterVisibleAsPdf: 'خروجی داده\u200cهای قابل مشاهده در فایل pdf',
          exporterSelectedAsPdf: 'خروجی داده\u200cهای انتخاب\u200cشده در فایل pdf',
          clearAllFilters: 'پاک کردن تمام فیلتر'
        },
        importer: {
          noHeaders: 'نام ستون قابل استخراج نیست. آیا فایل عنوان دارد؟',
          noObjects: 'اشیا قابل استخراج نیستند. آیا به جز عنوان\u200cها در فایل داده وجود دارد؟',
          invalidCsv: 'فایل قابل پردازش نیست. آیا فرمت  csv  معتبر است؟',
          invalidJson: 'فایل قابل پردازش نیست. آیا فرمت json   معتبر است؟',
          jsonNotArray: 'فایل json وارد شده باید حاوی آرایه باشد. عملیات ساقط شد.'
        },
        pagination: {
          sizes: 'اقلام در هر صفحه',
          totalItems: 'اقلام',
          of: 'از'
        },
        grouping: {
          group: 'گروه\u200cبندی',
          ungroup: 'حذف گروه\u200cبندی',
          aggregate_count: 'Agg: تعداد',
          aggregate_sum: 'Agg: جمع',
          aggregate_max: 'Agg: بیشینه',
          aggregate_min: 'Agg: کمینه',
          aggregate_avg: 'Agg: میانگین',
          aggregate_remove: 'Agg: حذف'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('fi', {
        aggregate: {
          label: 'rivit'
        },
        groupPanel: {
          description: 'Raahaa ja pudota otsikko tähän ryhmittääksesi sarakkeen mukaan.'
        },
        search: {
          placeholder: 'Hae...',
          showingItems: 'Näytetään rivejä:',
          selectedItems: 'Valitut rivit:',
          totalItems: 'Rivejä yht.:',
          size: 'Näytä:',
          first: 'Ensimmäinen sivu',
          next: 'Seuraava sivu',
          previous: 'Edellinen sivu',
          last: 'Viimeinen sivu'
        },
        menu: {
          text: 'Valitse sarakkeet:'
        },
        sort: {
          ascending: 'Järjestä nouseva',
          descending: 'Järjestä laskeva',
          remove: 'Poista järjestys'
        },
        column: {
          hide: 'Piilota sarake'
        },
        aggregation: {
          count: 'Rivejä yht.: ',
          sum: 'Summa: ',
          avg: 'K.a.: ',
          min: 'Min: ',
          max: 'Max: '
        },
        pinning: {
         pinLeft: 'Lukitse vasemmalle',
          pinRight: 'Lukitse oikealle',
          unpin: 'Poista lukitus'
        },
        gridMenu: {
          columns: 'Sarakkeet:',
          importerTitle: 'Tuo tiedosto',
          exporterAllAsCsv: 'Vie tiedot csv-muodossa',
          exporterVisibleAsCsv: 'Vie näkyvä tieto csv-muodossa',
          exporterSelectedAsCsv: 'Vie valittu tieto csv-muodossa',
          exporterAllAsPdf: 'Vie tiedot pdf-muodossa',
          exporterVisibleAsPdf: 'Vie näkyvä tieto pdf-muodossa',
          exporterSelectedAsPdf: 'Vie valittu tieto pdf-muodossa',
          exporterAllAsExcel: 'Vie tiedot excel-muodossa',
          exporterVisibleAsExcel: 'Vie näkyvä tieto excel-muodossa',
          exporterSelectedAsExcel: 'Vie valittu tieto excel-muodossa',
          clearAllFilters: 'Puhdista kaikki suodattimet'
        },
        importer: {
          noHeaders: 'Sarakkeen nimiä ei voitu päätellä, onko tiedostossa otsikkoriviä?',
          noObjects: 'Tietoja ei voitu lukea, onko tiedostossa muuta kuin otsikkot?',
          invalidCsv: 'Tiedostoa ei voitu käsitellä, oliko se CSV-muodossa?',
          invalidJson: 'Tiedostoa ei voitu käsitellä, oliko se JSON-muodossa?',
          jsonNotArray: 'Tiedosto ei sisältänyt taulukkoa, lopetetaan.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

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

(function () {
  angular.module('ui.grid').config(['$provide', function ($provide) {
    $provide.decorator('i18nService', ['$delegate', function ($delegate) {
      $delegate.add('he', {
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'גרור עמודה לכאן ושחרר בכדי לקבץ עמודה זו.'
        },
        search: {
          placeholder: 'חפש...',
          showingItems: 'מציג:',
          selectedItems: 'סה"כ נבחרו:',
          totalItems: 'סה"כ רשומות:',
          size: 'תוצאות בדף:',
          first: 'דף ראשון',
          next: 'דף הבא',
          previous: 'דף קודם',
          last: 'דף אחרון'
        },
        menu: {
          text: 'בחר עמודות:'
        },
        sort: {
          ascending: 'סדר עולה',
          descending: 'סדר יורד',
          remove: 'בטל'
        },
        column: {
          hide: 'טור הסתר'
        },
        aggregation: {
          count: 'total rows: ',
          sum: 'total: ',
          avg: 'avg: ',
          min: 'min: ',
          max: 'max: '
        },
        gridMenu: {
          columns: 'Columns:',
          importerTitle: 'Import file',
          exporterAllAsCsv: 'Export all data as csv',
          exporterVisibleAsCsv: 'Export visible data as csv',
          exporterSelectedAsCsv: 'Export selected data as csv',
          exporterAllAsPdf: 'Export all data as pdf',
          exporterVisibleAsPdf: 'Export visible data as pdf',
          exporterSelectedAsPdf: 'Export selected data as pdf',
          exporterAllAsExcel: 'Export all data as excel',
          exporterVisibleAsExcel: 'Export visible data as excel',
          exporterSelectedAsExcel: 'Export selected data as excel',
          clearAllFilters: 'Clean all filters'
        },
        importer: {
          noHeaders: 'Column names were unable to be derived, does the file have a header?',
          noObjects: 'Objects were not able to be derived, was there data in the file other than headers?',
          invalidCsv: 'File was unable to be processed, is it valid CSV?',
          invalidJson: 'File was unable to be processed, is it valid Json?',
          jsonNotArray: 'Imported json file must contain an array, aborting.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('hy', {
        aggregate: {
          label: 'տվյալներ'
        },
        groupPanel: {
          description: 'Ըստ սյան խմբավորելու համար քաշեք և գցեք վերնագիրն այստեղ։'
        },
        search: {
          placeholder: 'Փնտրում...',
          showingItems: 'Ցուցադրված տվյալներ՝',
          selectedItems: 'Ընտրված:',
          totalItems: 'Ընդամենը՝',
          size: 'Տողերի քանակը էջում՝',
          first: 'Առաջին էջ',
          next: 'Հաջորդ էջ',
          previous: 'Նախորդ էջ',
          last: 'Վերջին էջ'
        },
        menu: {
          text: 'Ընտրել սյուները:'
        },
        sort: {
          ascending: 'Աճման կարգով',
          descending: 'Նվազման կարգով',
          remove: 'Հանել '
        },
        column: {
          hide: 'Թաքցնել սյունը'
        },
        aggregation: {
          count: 'ընդամենը տող՝ ',
          sum: 'ընդամենը՝ ',
          avg: 'միջին՝ ',
          min: 'մին՝ ',
          max: 'մաքս՝ '
        },
        pinning: {
          pinLeft: 'Կպցնել ձախ կողմում',
          pinRight: 'Կպցնել աջ կողմում',
          unpin: 'Արձակել'
        },
        gridMenu: {
          columns: 'Սյուներ:',
          importerTitle: 'Ներմուծել ֆայլ',
          exporterAllAsCsv: 'Արտահանել ամբողջը CSV',
          exporterVisibleAsCsv: 'Արտահանել երևացող տվյալները CSV',
          exporterSelectedAsCsv: 'Արտահանել ընտրված տվյալները CSV',
          exporterAllAsPdf: 'Արտահանել PDF',
          exporterVisibleAsPdf: 'Արտահանել երևացող տվյալները PDF',
          exporterSelectedAsPdf: 'Արտահանել ընտրված տվյալները PDF',
          exporterAllAsExcel: 'Արտահանել excel',
          exporterVisibleAsExcel: 'Արտահանել երևացող տվյալները excel',
          exporterSelectedAsExcel: 'Արտահանել ընտրված տվյալները excel',
          clearAllFilters: 'Մաքրել բոլոր ֆիլտրերը'
        },
        importer: {
          noHeaders: 'Հնարավոր չեղավ որոշել սյան վերնագրերը։ Արդյո՞ք ֆայլը ունի վերնագրեր։',
          noObjects: 'Հնարավոր չեղավ կարդալ տվյալները։ Արդյո՞ք ֆայլում կան տվյալներ։',
          invalidCsv: 'Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր CSV է։',
          invalidJson: 'Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր Json է։',
          jsonNotArray: 'Ներմուծված json ֆայլը պետք է պարունակի զանգված, կասեցվում է։'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('is', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Sía fyrir dálk',
            removeFilter: 'Fjarlægja síu',
            columnMenuButtonLabel: 'Dálkavalmynd'
          },
          priority: 'Forgangsröðun:',
          filterLabel: "Sía fyrir dálka: "
        },
        aggregate: {
          label: 'hlutir'
        },
        groupPanel: {
          description: 'Dragðu dálkhaus hingað til að flokka saman eftir þeim dálki.'
        },
        search: {
          placeholder: 'Leita...',
          showingItems: 'Sýni hluti:',
          selectedItems: 'Valdir hlutir:',
          totalItems: 'Hlutir alls:',
          size: 'Stærð síðu:',
          first: 'Fyrsta síða',
          next: 'Næsta síða',
          previous: 'Fyrri síða',
          last: 'Síðasta síða'
        },
        menu: {
          text: 'Veldu dálka:'
        },
        sort: {
          ascending: 'Raða hækkandi',
          descending: 'Raða lækkandi',
          none: 'Engin röðun',
          remove: 'Fjarlægja röðun'
        },
        column: {
          hide: 'Fela dálk'
        },
        aggregation: {
          count: 'fjöldi raða: ',
          sum: 'summa: ',
          avg: 'meðaltal: ',
          min: 'lágmark: ',
          max: 'hámark: '
        },
        pinning: {
          pinLeft: 'Festa til vinstri',
          pinRight: 'Festa til hægri',
          unpin: 'Losa'
        },
        columnMenu: {
          close: 'Loka'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Töflu valmynd'
          },
          columns: 'Dálkar:',
          importerTitle: 'Flytja inn skjal',
          exporterAllAsCsv: 'Flytja út gögn sem csv',
          exporterVisibleAsCsv: 'Flytja út sýnileg gögn sem csv',
          exporterSelectedAsCsv: 'Flytja út valin gögn sem csv',
          exporterAllAsPdf: 'Flytja út öll gögn sem pdf',
          exporterVisibleAsPdf: 'Flytja út sýnileg gögn sem pdf',
          exporterSelectedAsPdf: 'Flytja út valin gögn sem pdf',
          clearAllFilters: 'Hreinsa allar síur'
        },
        importer: {
          noHeaders: 'Ekki hægt að vinna dálkanöfn úr skjalinu, er skjalið örugglega með haus?',
          noObjects: 'Ekki hægt að vinna hluti úr skjalinu, voru örugglega gögn í skjalinu önnur en hausinn?',
          invalidCsv: 'Tókst ekki að vinna skjal, er það örggulega gilt CSV?',
          invalidJson: 'Tókst ekki að vinna skjal, er það örugglega gilt Json?',
          jsonNotArray: 'Innflutt json skjal verður að innihalda fylki, hætti við.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Fletta að fyrstu',
            pageBack: 'Fletta til baka',
            pageSelected: 'Valin síða',
            pageForward: 'Fletta áfram',
            pageToLast: 'Fletta að síðustu'
          },
          sizes: 'hlutir á síðu',
          totalItems: 'hlutir',
          through: 'gegnum',
          of: 'af'
        },
        grouping: {
          group: 'Flokka',
          ungroup: 'Sundurliða',
          aggregate_count: 'Fjöldi: ',
          aggregate_sum: 'Summa: ',
          aggregate_max: 'Hámark: ',
          aggregate_min: 'Lágmark: ',
          aggregate_avg: 'Meðaltal: ',
          aggregate_remove: 'Fjarlægja: '
        },
        validate: {
          error: 'Villa:',
          minLength: 'Gildi ætti að vera a.m.k. THRESHOLD stafa langt.',
          maxLength: 'Gildi ætti að vera í mesta lagi THRESHOLD stafa langt.',
          required: 'Þarf að hafa gildi.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('it', {
        aggregate: {
          label: 'elementi'
        },
        groupPanel: {
          description: 'Trascina un\'intestazione all\'interno del gruppo della colonna.'
        },
        search: {
          placeholder: 'Ricerca...',
          showingItems: 'Mostra:',
          selectedItems: 'Selezionati:',
          totalItems: 'Totali:',
          size: 'Tot Pagine:',
          first: 'Prima',
          next: 'Prossima',
          previous: 'Precedente',
          last: 'Ultima'
        },
        menu: {
          text: 'Scegli le colonne:'
        },
        sort: {
          ascending: 'Asc.',
          descending: 'Desc.',
          remove: 'Annulla ordinamento'
        },
        column: {
          hide: 'Nascondi'
        },
        aggregation: {
          count: 'righe totali: ',
          sum: 'tot: ',
          avg: 'media: ',
          min: 'minimo: ',
          max: 'massimo: '
        },
        pinning: {
         pinLeft: 'Blocca a sx',
          pinRight: 'Blocca a dx',
          unpin: 'Blocca in alto'
        },
        gridMenu: {
          columns: 'Colonne:',
          importerTitle: 'Importa',
          exporterAllAsCsv: 'Esporta tutti i dati in CSV',
          exporterVisibleAsCsv: 'Esporta i dati visibili in CSV',
          exporterSelectedAsCsv: 'Esporta i dati selezionati in CSV',
          exporterAllAsPdf: 'Esporta tutti i dati in PDF',
          exporterVisibleAsPdf: 'Esporta i dati visibili in PDF',
          exporterSelectedAsPdf: 'Esporta i dati selezionati in PDF',
          exporterAllAsExcel: 'Esporta tutti i dati in excel',
          exporterVisibleAsExcel: 'Esporta i dati visibili in excel',
          exporterSelectedAsExcel: 'Esporta i dati selezionati in excel',
          clearAllFilters: 'Pulire tutti i filtri'
        },
        importer: {
          noHeaders: 'Impossibile reperire i nomi delle colonne, sicuro che siano indicati all\'interno del file?',
          noObjects: 'Impossibile reperire gli oggetti, sicuro che siano indicati all\'interno del file?',
          invalidCsv: 'Impossibile elaborare il file, sicuro che sia un CSV?',
          invalidJson: 'Impossibile elaborare il file, sicuro che sia un JSON valido?',
          jsonNotArray: 'Errore! Il file JSON da importare deve contenere un array.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Prima',
            pageBack: 'Indietro',
            pageSelected: 'Pagina selezionata',
            pageForward: 'Avanti',
            pageToLast: 'Ultima'
          },
          sizes: 'elementi per pagina',
          totalItems: 'elementi',
          through: 'a',
          of: 'di'
        },
        grouping: {
          group: 'Raggruppa',
          ungroup: 'Separa',
          aggregate_count: 'Agg: N. Elem.',
          aggregate_sum: 'Agg: Somma',
          aggregate_max: 'Agg: Massimo',
          aggregate_min: 'Agg: Minimo',
          aggregate_avg: 'Agg: Media',
          aggregate_remove: 'Agg: Rimuovi'
        },
        validate: {
          error: 'Errore:',
          minLength: 'Lunghezza minima pari a THRESHOLD caratteri.',
          maxLength: 'Lunghezza massima pari a THRESHOLD caratteri.',
          required: 'Necessario inserire un valore.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function() {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ja', {
        headerCell: {
          aria: {
            defaultFilterLabel: '列のフィルター',
            removeFilter: 'フィルターの解除',
            columnMenuButtonLabel: '列のメニュー'
          },
          priority: '優先度:',
          filterLabel: "列フィルター: "
        },
        aggregate: {
          label: '項目'
        },
        groupPanel: {
          description: 'ここに列ヘッダをドラッグアンドドロップして、その列でグループ化します。'
        },
        search: {
          placeholder: '検索...',
          showingItems: '表示中の項目:',
          selectedItems: '選択した項目:',
          totalItems: '項目の総数:',
          size: 'ページサイズ:',
          first: '最初のページ',
          next: '次のページ',
          previous: '前のページ',
          last: '前のページ'
        },
        menu: {
          text: '列の選択:'
        },
        sort: {
          ascending: '昇順に並べ替え',
          descending: '降順に並べ替え',
          none: '並べ替え無し',
          remove: '並べ替えの解除'
        },
        column: {
          hide: '列の非表示'
        },
        aggregation: {
          count: '行数: ',
          sum: '合計: ',
          avg: '平均: ',
          min: '最小: ',
          max: '最大: '
        },
        pinning: {
          pinLeft: '左に固定',
          pinRight: '右に固定',
          unpin: '固定解除'
        },
        columnMenu: {
          close: '閉じる'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'グリッドメニュー'
          },
          columns: '列の表示/非表示:',
          importerTitle: 'ファイルのインポート',
          exporterAllAsCsv: 'すべてのデータをCSV形式でエクスポート',
          exporterVisibleAsCsv: '表示中のデータをCSV形式でエクスポート',
          exporterSelectedAsCsv: '選択したデータをCSV形式でエクスポート',
          exporterAllAsPdf: 'すべてのデータをPDF形式でエクスポート',
          exporterVisibleAsPdf: '表示中のデータをPDF形式でエクスポート',
          exporterSelectedAsPdf: '選択したデータをPDF形式でエクスポート',
          clearAllFilters: 'すべてのフィルタをクリア'
        },
        importer: {
          noHeaders: '列名を取得できません。ファイルにヘッダが含まれていることを確認してください。',
          noObjects: 'オブジェクトを取得できません。ファイルにヘッダ以外のデータが含まれていることを確認してください。',
          invalidCsv: 'ファイルを処理できません。ファイルが有効なCSV形式であることを確認してください。',
          invalidJson: 'ファイルを処理できません。ファイルが有効なJSON形式であることを確認してください。',
          jsonNotArray: 'インポートしたJSONファイルには配列が含まれている必要があります。処理を中止します。'
        },
        pagination: {
          aria: {
            pageToFirst: '最初のページ',
            pageBack: '前のページ',
            pageSelected: '現在のページ',
            pageForward: '次のページ',
            pageToLast: '最後のページ'
          },
          sizes: '件/ページ',
          totalItems: '件',
          through: 'から',
          of: '件/全'
        },
        grouping: {
          group: 'グループ化',
          ungroup: 'グループ化の解除',
          aggregate_count: '集計表示: 行数',
          aggregate_sum: '集計表示: 合計',
          aggregate_max: '集計表示: 最大',
          aggregate_min: '集計表示: 最小',
          aggregate_avg: '集計表示: 平均',
          aggregate_remove: '集計表示: 解除'
        },
        validate: {
          error: 'Error:',
          minLength: 'THRESHOLD 文字以上で入力してください。',
          maxLength: 'THRESHOLD 文字以下で入力してください。',
          required: '値が必要です。'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ko', {
        aggregate: {
          label: '아이템'
        },
        groupPanel: {
          description: '컬럼으로 그룹핑하기 위해서는 컬럼 헤더를 끌어 떨어뜨려 주세요.'
        },
        search: {
          placeholder: '검색...',
          showingItems: '항목 보여주기:',
          selectedItems: '선택 항목:',
          totalItems: '전체 항목:',
          size: '페이지 크기:',
          first: '첫번째 페이지',
          next: '다음 페이지',
          previous: '이전 페이지',
          last: '마지막 페이지'
        },
        menu: {
          text: '컬럼을 선택하세요:'
        },
        sort: {
          ascending: '오름차순 정렬',
          descending: '내림차순 정렬',
          remove: '소팅 제거'
        },
        column: {
          hide: '컬럼 제거'
        },
        aggregation: {
          count: '전체 갯수: ',
          sum: '전체: ',
          avg: '평균: ',
          min: '최소: ',
          max: '최대: '
        },
        pinning: {
         pinLeft: '왼쪽 핀',
          pinRight: '오른쪽 핀',
          unpin: '핀 제거'
        },
        gridMenu: {
          columns: '컬럼:',
          importerTitle: '파일 가져오기',
          exporterAllAsCsv: 'csv로 모든 데이터 내보내기',
          exporterVisibleAsCsv: 'csv로 보이는 데이터 내보내기',
          exporterSelectedAsCsv: 'csv로 선택된 데이터 내보내기',
          exporterAllAsPdf: 'pdf로 모든 데이터 내보내기',
          exporterVisibleAsPdf: 'pdf로 보이는 데이터 내보내기',
          exporterSelectedAsPdf: 'pdf로 선택 데이터 내보내기',
          clearAllFilters: '모든 필터를 청소'
        },
        importer: {
          noHeaders: '컬럼명이 지정되어 있지 않습니다. 파일에 헤더가 명시되어 있는지 확인해 주세요.',
          noObjects: '데이터가 지정되어 있지 않습니다. 데이터가 파일에 있는지 확인해 주세요.',
          invalidCsv: '파일을 처리할 수 없습니다. 올바른 csv인지 확인해 주세요.',
          invalidJson: '파일을 처리할 수 없습니다. 올바른 json인지 확인해 주세요.',
          jsonNotArray: 'json 파일은 배열을 포함해야 합니다.'
        },
        pagination: {
          sizes: '페이지당 항목',
          totalItems: '전체 항목'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('nl', {
        aggregate: {
          label: 'items'
        },
        groupPanel: {
          description: 'Sleep hier een kolomnaam heen om op te groeperen.'
        },
        search: {
          placeholder: 'Zoeken...',
          showingItems: 'Getoonde items:',
          selectedItems: 'Geselecteerde items:',
          totalItems: 'Totaal aantal items:',
          size: 'Items per pagina:',
          first: 'Eerste pagina',
          next: 'Volgende pagina',
          previous: 'Vorige pagina',
          last: 'Laatste pagina'
        },
        menu: {
          text: 'Kies kolommen:'
        },
        sort: {
          ascending: 'Sorteer oplopend',
          descending: 'Sorteer aflopend',
          remove: 'Verwijder sortering'
        },
        column: {
          hide: 'Verberg kolom'
        },
        aggregation: {
          count: 'Aantal rijen: ',
          sum: 'Som: ',
          avg: 'Gemiddelde: ',
          min: 'Min: ',
          max: 'Max: '
        },
        pinning: {
          pinLeft: 'Zet links vast',
          pinRight: 'Zet rechts vast',
          unpin: 'Maak los'
        },
        gridMenu: {
          columns: 'Kolommen:',
          importerTitle: 'Importeer bestand',
          exporterAllAsCsv: 'Exporteer alle data als csv',
          exporterVisibleAsCsv: 'Exporteer zichtbare data als csv',
          exporterSelectedAsCsv: 'Exporteer geselecteerde data als csv',
          exporterAllAsPdf: 'Exporteer alle data als pdf',
          exporterVisibleAsPdf: 'Exporteer zichtbare data als pdf',
          exporterSelectedAsPdf: 'Exporteer geselecteerde data als pdf',
          exporterAllAsExcel: 'Exporteer alle data als excel',
          exporterVisibleAsExcel: 'Exporteer zichtbare data als excel',
          exporterSelectedAsExcel: 'Exporteer alle data als excel',
          clearAllFilters: 'Alle filters wissen'
        },
        importer: {
          noHeaders: 'Kolomnamen kunnen niet worden afgeleid. Heeft het bestand een header?',
          noObjects: 'Objecten kunnen niet worden afgeleid. Bevat het bestand data naast de headers?',
          invalidCsv: 'Het bestand kan niet verwerkt worden. Is het een valide csv bestand?',
          invalidJson: 'Het bestand kan niet verwerkt worden. Is het valide json?',
          jsonNotArray: 'Het json bestand moet een array bevatten. De actie wordt geannuleerd.'
        },
        pagination: {
            sizes: 'items per pagina',
            totalItems: 'items',
            of: 'van de'
        },
        grouping: {
            group: 'Groepeer',
            ungroup: 'Groepering opheffen',
            aggregate_count: 'Agg: Aantal',
            aggregate_sum: 'Agg: Som',
            aggregate_max: 'Agg: Max',
            aggregate_min: 'Agg: Min',
            aggregate_avg: 'Agg: Gem',
            aggregate_remove: 'Agg: Verwijder'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('no', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filter for kolonne',
            removeFilter: 'Fjern filter',
            columnMenuButtonLabel: 'Kolonnemeny'
          },
          priority: 'Prioritet:',
          filterLabel: "Filter for kolonne: "
        },
        aggregate: {
          label: 'elementer'
        },
        groupPanel: {
          description: 'Trekk en kolonneoverskrift hit og slipp den for å gruppere etter den kolonnen.'
        },
        search: {
          placeholder: 'Søk...',
          showingItems: 'Viste elementer:',
          selectedItems: 'Valgte elementer:',
          totalItems: 'Antall elementer:',
          size: 'Sidestørrelse:',
          first: 'Første side',
          next: 'Neste side',
          previous: 'Forrige side',
          last: 'Siste side'
        },
        menu: {
          text: 'Velg kolonner:'
        },
        sort: {
          ascending: 'Sortere stigende',
          descending: 'Sortere fallende',
          none: 'Ingen sortering',
          remove: 'Fjern sortering'
        },
        column: {
          hide: 'Skjul kolonne'
        },
        aggregation: {
          count: 'antall rader: ',
          sum: 'total: ',
          avg: 'gjennomsnitt: ',
          min: 'minimum: ',
          max: 'maksimum: '
        },
        pinning: {
          pinLeft: 'Fest til venstre',
          pinRight: 'Fest til høyre',
          unpin: 'Løsne'
        },
        columnMenu: {
          close: 'Lukk'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Grid Menu'
          },
          columns: 'Kolonner:',
          importerTitle: 'Importer fil',
          exporterAllAsCsv: 'Eksporter alle data som csv',
          exporterVisibleAsCsv: 'Eksporter synlige data som csv',
          exporterSelectedAsCsv: 'Eksporter utvalgte data som csv',
          exporterAllAsPdf: 'Eksporter alle data som pdf',
          exporterVisibleAsPdf: 'Eksporter synlige data som pdf',
          exporterSelectedAsPdf: 'Eksporter utvalgte data som pdf',
          exporterAllAsExcel: 'Eksporter alle data som excel',
          exporterVisibleAsExcel: 'Eksporter synlige data som excel',
          exporterSelectedAsExcel: 'Eksporter utvalgte data som excel',
          clearAllFilters: 'Clear all filters'
        },
        importer: {
          noHeaders: 'Kolonnenavn kunne ikke avledes. Har filen en overskrift?',
          noObjects: 'Objekter kunne ikke avledes. Er der andre data i filen enn overskriften?',
          invalidCsv: 'Filen kunne ikke behandles. Er den gyldig CSV?',
          invalidJson: 'Filen kunne ikke behandles. Er den gyldig JSON?',
          jsonNotArray: 'Importert JSON-fil må inneholde en liste. Avbryter.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Gå til første side',
            pageBack: 'Gå til forrige side',
            pageSelected: 'Valgte side',
            pageForward: 'Gå til neste side',
            pageToLast: 'Gå til siste side'
          },
          sizes: 'elementer per side',
          totalItems: 'elementer',
          through: 'til',
          of: 'av'
        },
        grouping: {
          group: 'Gruppere',
          ungroup: 'Fjerne gruppering',
          aggregate_count: 'Agr: Antall',
          aggregate_sum: 'Agr: Sum',
          aggregate_max: 'Agr: Maksimum',
          aggregate_min: 'Agr: Minimum',
          aggregate_avg: 'Agr: Gjennomsnitt',
          aggregate_remove: 'Agr: Fjern'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('pl', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filtr dla kolumny',
            removeFilter: 'Usuń filtr',
            columnMenuButtonLabel: 'Opcje kolumny',
            column: 'Kolumna'
          },
          priority: 'Priorytet:',
          filterLabel: "Filtr dla kolumny: "
        },
        aggregate: {
          label: 'pozycji'
        },
        groupPanel: {
          description: 'Przeciągnij nagłówek kolumny tutaj, aby pogrupować według niej.'
        },
        search: {
          aria: {
            selected: 'Wiersz zaznaczony',
            notSelected: 'Wiersz niezaznaczony'
          },
          placeholder: 'Szukaj...',
          showingItems: 'Widoczne pozycje:',
          selectedItems: 'Zaznaczone pozycje:',
          totalItems: 'Wszystkich pozycji:',
          size: 'Rozmiar strony:',
          first: 'Pierwsza strona',
          next: 'Następna strona',
          previous: 'Poprzednia strona',
          last: 'Ostatnia strona'
        },
        menu: {
          text: 'Wybierz kolumny:'
        },
        sort: {
          ascending: 'Sortuj rosnąco',
          descending: 'Sortuj malejąco',
          none: 'Brak sortowania',
          remove: 'Wyłącz sortowanie'
        },
        column: {
          hide: 'Ukryj kolumnę'
        },
        aggregation: {
          count: 'Razem pozycji: ',
            sum: 'Razem: ',
            avg: 'Średnia: ',
            min: 'Min: ',
            max: 'Max: '
        },
        pinning: {
          pinLeft: 'Przypnij do lewej',
          pinRight: 'Przypnij do prawej',
          unpin: 'Odepnij'
        },
        columnMenu: {
          close: 'Zamknij'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Opcje tabeli'
          },
          columns: 'Kolumny:',
          importerTitle: 'Importuj plik',
          exporterAllAsCsv: 'Eksportuj wszystkie dane do csv',
          exporterVisibleAsCsv: 'Eksportuj widoczne dane do csv',
          exporterSelectedAsCsv: 'Eksportuj zaznaczone dane do csv',
          exporterAllAsPdf: 'Eksportuj wszystkie dane do pdf',
          exporterVisibleAsPdf: 'Eksportuj widoczne dane do pdf',
          exporterSelectedAsPdf: 'Eksportuj zaznaczone dane do pdf',
          exporterAllAsExcel: 'Eksportuj wszystkie dane do excel',
          exporterVisibleAsExcel: 'Eksportuj widoczne dane do excel',
          exporterSelectedAsExcel: 'Eksportuj zaznaczone dane do excel',
          clearAllFilters: 'Wyczyść filtry'
        },
        importer: {
          noHeaders: 'Nie udało się wczytać nazw kolumn. Czy plik posiada nagłówek?',
          noObjects: 'Nie udalo się wczytać pozycji. Czy plik zawiera dane?',
          invalidCsv: 'Nie udało się przetworzyć pliku. Czy to prawidłowy plik CSV?',
          invalidJson: 'Nie udało się przetworzyć pliku. Czy to prawidłowy plik JSON?',
          jsonNotArray: 'Importowany plik JSON musi zawierać tablicę. Importowanie przerwane.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Pierwsza strona',
            pageBack: 'Poprzednia strona',
            pageSelected: 'Wybrana strona',
            pageForward: 'Następna strona',
            pageToLast: 'Ostatnia strona'
          },
          sizes: 'pozycji na stronę',
          totalItems: 'pozycji',
          through: 'do',
          of: 'z'
        },
        grouping: {
          group: 'Grupuj',
          ungroup: 'Rozgrupuj',
          aggregate_count: 'Zbiorczo: Razem',
          aggregate_sum: 'Zbiorczo: Suma',
          aggregate_max: 'Zbiorczo: Max',
          aggregate_min: 'Zbiorczo: Min',
          aggregate_avg: 'Zbiorczo: Średnia',
          aggregate_remove: 'Zbiorczo: Usuń'
        },
        validate: {
          error: 'Błąd:',
          minLength: 'Wartość powinna składać się z co najmniej THRESHOLD znaków.',
          maxLength: 'Wartość powinna składać się z przynajmniej THRESHOLD znaków.',
          required: 'Wartość jest wymagana.'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('pt-br', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filtro por coluna',
            removeFilter: 'Remover filtro',
            columnMenuButtonLabel: 'Menu coluna',
            column: 'Coluna'
          },
          priority: 'Prioridade:',
          filterLabel: "Filtro por coluna: "
        },
        aggregate: {
          label: 'itens'
        },
        groupPanel: {
          description: 'Arraste e solte uma coluna aqui para agrupar por essa coluna'
        },
        search: {
          aria: {
            selected: 'Linha selecionada',
            notSelected: 'Linha não está selecionada'
          },
          placeholder: 'Procurar...',
          showingItems: 'Mostrando os Itens:',
          selectedItems: 'Items Selecionados:',
          totalItems: 'Total de Itens:',
          size: 'Tamanho da Página:',
          first: 'Primeira Página',
          next: 'Próxima Página',
          previous: 'Página Anterior',
          last: 'Última Página'
        },
        menu: {
          text: 'Selecione as colunas:'
        },
        sort: {
          ascending: 'Ordenar Ascendente',
          descending: 'Ordenar Descendente',
          none: 'Nenhuma Ordem',
          remove: 'Remover Ordenação'
        },
        column: {
          hide: 'Esconder coluna'
        },
        aggregation: {
          count: 'total de linhas: ',
          sum: 'total: ',
          avg: 'med: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Fixar Esquerda',
          pinRight: 'Fixar Direita',
          unpin: 'Desprender'
        },
        columnMenu: {
          close: 'Fechar'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Menu Grid'
          },
          columns: 'Colunas:',
          importerTitle: 'Importar arquivo',
          exporterAllAsCsv: 'Exportar todos os dados como csv',
          exporterVisibleAsCsv: 'Exportar dados visíveis como csv',
          exporterSelectedAsCsv: 'Exportar dados selecionados como csv',
          exporterAllAsPdf: 'Exportar todos os dados como pdf',
          exporterVisibleAsPdf: 'Exportar dados visíveis como pdf',
          exporterSelectedAsPdf: 'Exportar dados selecionados como pdf',
          exporterAllAsExcel: 'Exportar todos os dados como excel',
          exporterVisibleAsExcel: 'Exportar dados visíveis como excel',
          exporterSelectedAsExcel: 'Exportar dados selecionados como excel',
          clearAllFilters: 'Limpar todos os filtros'
        },
        importer: {
          noHeaders: 'Nomes de colunas não puderam ser derivados. O arquivo tem um cabeçalho?',
          noObjects: 'Objetos não puderam ser derivados. Havia dados no arquivo, além dos cabeçalhos?',
          invalidCsv: 'Arquivo não pode ser processado. É um CSV válido?',
          invalidJson: 'Arquivo não pode ser processado. É um Json válido?',
          jsonNotArray: 'Arquivo json importado tem que conter um array. Abortando.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Primeira página',
            pageBack: 'Página anterior',
            pageSelected: 'Página Selecionada',
            pageForward: 'Proxima',
            pageToLast: 'Anterior'
          },
          sizes: 'itens por página',
          totalItems: 'itens',
          through: 'através dos',
          of: 'de'
        },
        grouping: {
          group: 'Agrupar',
          ungroup: 'Desagrupar',
          aggregate_count: 'Agr: Contar',
          aggregate_sum: 'Agr: Soma',
          aggregate_max: 'Agr: Max',
          aggregate_min: 'Agr: Min',
          aggregate_avg: 'Agr: Med',
          aggregate_remove: 'Agr: Remover'
        },
        validate: {
          error: 'Erro:',
          minLength: 'O valor deve ter, no minimo, THRESHOLD caracteres.',
          maxLength: 'O valor deve ter, no máximo, THRESHOLD caracteres.',
          required: 'Um valor é necessário.'
        }
      });
      return $delegate;
    }]);
}]);
})();

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('pt', {
        headerCell: {
          aria: {
            defaultFilterLabel: 'Filtro por coluna',
            removeFilter: 'Remover filtro',
            columnMenuButtonLabel: 'Menu coluna',
            column: 'Coluna'
          },
          priority: 'Prioridade:',
          filterLabel: "Filtro por coluna: "
        },
        aggregate: {
          label: 'itens'
        },
        groupPanel: {
          description: 'Arraste e solte uma coluna aqui para agrupar por essa coluna'
        },
        search: {
          aria: {
            selected: 'Linha selecionada',
            notSelected: 'Linha não está selecionada'
          },
          placeholder: 'Procurar...',
          showingItems: 'Mostrando os Itens:',
          selectedItems: 'Itens Selecionados:',
          totalItems: 'Total de Itens:',
          size: 'Tamanho da Página:',
          first: 'Primeira Página',
          next: 'Próxima Página',
          previous: 'Página Anterior',
          last: 'Última Página'
        },
        menu: {
          text: 'Selecione as colunas:'
        },
        sort: {
          ascending: 'Ordenar Ascendente',
          descending: 'Ordenar Descendente',
          none: 'Nenhuma Ordem',
          remove: 'Remover Ordenação'
        },
        column: {
          hide: 'Esconder coluna'
        },
        aggregation: {
          count: 'total de linhas: ',
          sum: 'total: ',
          avg: 'med: ',
          min: 'min: ',
          max: 'max: '
        },
        pinning: {
          pinLeft: 'Fixar Esquerda',
          pinRight: 'Fixar Direita',
          unpin: 'Desprender'
        },
        columnMenu: {
          close: 'Fechar'
        },
        gridMenu: {
          aria: {
            buttonLabel: 'Menu Grid'
          },
          columns: 'Colunas:',
          importerTitle: 'Importar ficheiro',
          exporterAllAsCsv: 'Exportar todos os dados como csv',
          exporterVisibleAsCsv: 'Exportar dados visíveis como csv',
          exporterSelectedAsCsv: 'Exportar dados selecionados como csv',
          exporterAllAsPdf: 'Exportar todos os dados como pdf',
          exporterVisibleAsPdf: 'Exportar dados visíveis como pdf',
          exporterSelectedAsPdf: 'Exportar dados selecionados como pdf',
          exporterAllAsExcel: 'Exportar todos os dados como excel',
          exporterVisibleAsExcel: 'Exportar dados visíveis como excel',
          exporterSelectedAsExcel: 'Exportar dados selecionados como excel',
          clearAllFilters: 'Limpar todos os filtros'
        },
        importer: {
          noHeaders: 'Nomes de colunas não puderam ser derivados. O ficheiro tem um cabeçalho?',
          noObjects: 'Objetos não puderam ser derivados. Havia dados no ficheiro, além dos cabeçalhos?',
          invalidCsv: 'Ficheiro não pode ser processado. É um CSV válido?',
          invalidJson: 'Ficheiro não pode ser processado. É um Json válido?',
          jsonNotArray: 'Ficheiro json importado tem que conter um array. Interrompendo.'
        },
        pagination: {
          aria: {
            pageToFirst: 'Primeira página',
            pageBack: 'Página anterior',
            pageSelected: 'Página Selecionada',
            pageForward: 'Próxima',
            pageToLast: 'Anterior'
          },
          sizes: 'itens por página',
          totalItems: 'itens',
          through: 'a',
          of: 'de'
        },
        grouping: {
          group: 'Agrupar',
          ungroup: 'Desagrupar',
          aggregate_count: 'Agr: Contar',
          aggregate_sum: 'Agr: Soma',
          aggregate_max: 'Agr: Max',
          aggregate_min: 'Agr: Min',
          aggregate_avg: 'Agr: Med',
          aggregate_remove: 'Agr: Remover'
        },
        validate: {
          error: 'Erro:',
          minLength: 'O valor deve ter, no minimo, THRESHOLD caracteres.',
          maxLength: 'O valor deve ter, no máximo, THRESHOLD caracteres.',
          required: 'Um valor é necessário.'
        }
      });
      return $delegate;
    }]);
}]);
})();

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

(function () {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('ta', {
        aggregate: {
          label: 'உருப்படிகள்'
        },
        groupPanel: {
          description: 'ஒரு பத்தியை குழுவாக அமைக்க அப்பத்தியின் தலைப்பை இங்கே  இழுத்து வரவும் '
        },
        search: {
          placeholder: 'தேடல் ...',
          showingItems: 'உருப்படிகளை காண்பித்தல்:',
          selectedItems: 'தேர்ந்தெடுக்கப்பட்ட  உருப்படிகள்:',
          totalItems: 'மொத்த உருப்படிகள்:',
          size: 'பக்க அளவு: ',
          first: 'முதல் பக்கம்',
          next: 'அடுத்த பக்கம்',
          previous: 'முந்தைய பக்கம் ',
          last: 'இறுதி பக்கம்'
        },
        menu: {
          text: 'பத்திகளை தேர்ந்தெடு:'
        },
        sort: {
          ascending: 'மேலிருந்து கீழாக',
          descending: 'கீழிருந்து மேலாக',
          remove: 'வரிசையை நீக்கு'
        },
        column: {
          hide: 'பத்தியை மறைத்து வை '
        },
        aggregation: {
          count: 'மொத்த வரிகள்:',
          sum: 'மொத்தம்: ',
          avg: 'சராசரி: ',
          min: 'குறைந்தபட்ச: ',
          max: 'அதிகபட்ச: '
        },
        pinning: {
         pinLeft: 'இடதுபுறமாக தைக்க ',
          pinRight: 'வலதுபுறமாக தைக்க',
          unpin: 'பிரி'
        },
        gridMenu: {
          columns: 'பத்திகள்:',
          importerTitle: 'கோப்பு : படித்தல்',
          exporterAllAsCsv: 'எல்லா தரவுகளையும் கோப்பாக்கு: csv',
          exporterVisibleAsCsv: 'இருக்கும் தரவுகளை கோப்பாக்கு: csv',
          exporterSelectedAsCsv: 'தேர்ந்தெடுத்த தரவுகளை கோப்பாக்கு: csv',
          exporterAllAsPdf: 'எல்லா தரவுகளையும் கோப்பாக்கு: pdf',
          exporterVisibleAsPdf: 'இருக்கும் தரவுகளை கோப்பாக்கு: pdf',
          exporterSelectedAsPdf: 'தேர்ந்தெடுத்த தரவுகளை கோப்பாக்கு: pdf',
          clearAllFilters: 'Clear all filters'
        },
        importer: {
          noHeaders: 'பத்தியின் தலைப்புகளை பெற இயலவில்லை, கோப்பிற்கு தலைப்பு உள்ளதா?',
          noObjects: 'இலக்குகளை உருவாக்க முடியவில்லை, கோப்பில் தலைப்புகளை தவிர தரவு ஏதேனும் உள்ளதா? ',
          invalidCsv:	'சரிவர நடைமுறை படுத்த இயலவில்லை, கோப்பு சரிதானா? - csv',
          invalidJson: 'சரிவர நடைமுறை படுத்த இயலவில்லை, கோப்பு சரிதானா? - json',
          jsonNotArray: 'படித்த கோப்பில் வரிசைகள் உள்ளது, நடைமுறை ரத்து செய் : json'
        },
        pagination: {
          sizes		: 'உருப்படிகள் / பக்கம்',
          totalItems	: 'உருப்படிகள் '
        },
        grouping: {
          group	: 'குழு',
          ungroup : 'பிரி',
          aggregate_count	: 'மதிப்பீட்டு : எண்ணு',
          aggregate_sum : 'மதிப்பீட்டு : கூட்டல்',
          aggregate_max	: 'மதிப்பீட்டு : அதிகபட்சம்',
          aggregate_min	: 'மதிப்பீட்டு : குறைந்தபட்சம்',
          aggregate_avg	: 'மதிப்பீட்டு : சராசரி',
          aggregate_remove : 'மதிப்பீட்டு : நீக்கு'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function() {
	angular.module('ui.grid').config(['$provide', function($provide) {
		$provide.decorator('i18nService', ['$delegate', function($delegate) {
			$delegate.add('tr', {
				headerCell: {
					aria: {
						defaultFilterLabel: 'Sütun için filtre',
						removeFilter: 'Filtreyi Kaldır',
						columnMenuButtonLabel: 'Sütun Menüsü'
					},
					priority: 'Öncelik:',
					filterLabel: "Sütun için filtre: "
				},
				aggregate: {
					label: 'kayıtlar'
				},
				groupPanel: {
					description: 'Sütuna göre gruplamak için sütun başlığını buraya sürükleyin ve bırakın.'
				},
				search: {
					placeholder: 'Arama...',
					showingItems: 'Gösterilen Kayıt:',
					selectedItems: 'Seçili Kayıt:',
					totalItems: 'Toplam Kayıt:',
					size: 'Sayfa Boyutu:',
					first: 'İlk Sayfa',
					next: 'Sonraki Sayfa',
					previous: 'Önceki Sayfa',
					last: 'Son Sayfa'
				},
				menu: {
					text: 'Sütunları Seç:'
				},
				sort: {
					ascending: 'Artan Sırada Sırala',
					descending: 'Azalan Sırada Sırala',
					none: 'Sıralama Yapma',
					remove: 'Sıralamayı Kaldır'
				},
				column: {
					hide: 'Sütunu Gizle'
				},
				aggregation: {
					count: 'toplam satır: ',
					sum: 'toplam: ',
					avg: 'ort: ',
					min: 'min: ',
					max: 'maks: '
				},
				pinning: {
					pinLeft: 'Sola Sabitle',
					pinRight: 'Sağa Sabitle',
					unpin: 'Sabitlemeyi Kaldır'
				},
				columnMenu: {
					close: 'Kapat'
				},
				gridMenu: {
					aria: {
						buttonLabel: 'Tablo Menü'
					},
					columns: 'Sütunlar:',
					importerTitle: 'Dosya içeri aktar',
					exporterAllAsCsv: 'Bütün veriyi CSV olarak dışarı aktar',
					exporterVisibleAsCsv: 'Görünen veriyi CSV olarak dışarı aktar',
					exporterSelectedAsCsv: 'Seçili veriyi CSV olarak dışarı aktar',
					exporterAllAsPdf: 'Bütün veriyi PDF olarak dışarı aktar',
					exporterVisibleAsPdf: 'Görünen veriyi PDF olarak dışarı aktar',
					exporterSelectedAsPdf: 'Seçili veriyi PDF olarak dışarı aktar',
					clearAllFilters: 'Bütün filtreleri kaldır'
				},
				importer: {
					noHeaders: 'Sütun isimleri üretilemiyor, dosyanın bir başlığı var mı?',
					noObjects: 'Nesneler üretilemiyor, dosyada başlıktan başka bir veri var mı?',
					invalidCsv: 'Dosya işlenemedi, geçerli bir CSV dosyası mı?',
					invalidJson: 'Dosya işlenemedi, geçerli bir Json dosyası mı?',
					jsonNotArray: 'Alınan Json dosyasında bir dizi bulunmalıdır, işlem iptal ediliyor.'
				},
				pagination: {
					aria: {
						pageToFirst: 'İlk sayfaya',
						pageBack: 'Geri git',
						pageSelected: 'Seçili sayfa',
						pageForward: 'İleri git',
						pageToLast: 'Sona git'
					},
					sizes: 'Sayfadaki nesne sayısı',
					totalItems: 'kayıtlar',
					through: '', // note(fsw) : turkish dont have this preposition
					of: '' // note(fsw) : turkish dont have this preposition
				},
				grouping: {
					group: 'Grupla',
					ungroup: 'Gruplama',
					aggregate_count: 'Yekun: Sayı',
					aggregate_sum: 'Yekun: Toplam',
					aggregate_max: 'Yekun: Maks',
					aggregate_min: 'Yekun: Min',
					aggregate_avg: 'Yekun: Ort',
					aggregate_remove: 'Yekun: Sil'
				}
			});
			return $delegate;
		}]);
	}]);
})();

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

(function() {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('zh-cn', {
        headerCell: {
          aria: {
            defaultFilterLabel: '列过滤器',
            removeFilter: '移除过滤器',
            columnMenuButtonLabel: '列菜单'
          },
          priority: '优先级:',
          filterLabel: "列过滤器: "
        },
        aggregate: {
          label: '行'
        },
        groupPanel: {
          description: '拖曳表头到此处进行分组'
        },
        search: {
          placeholder: '查找',
          showingItems: '已显示行数：',
          selectedItems: '已选择行数：',
          totalItems: '总行数：',
          size: '每页显示行数：',
          first: '首页',
          next: '下一页',
          previous: '上一页',
          last: '末页'
        },
        menu: {
          text: '选择列：'
        },
        sort: {
          ascending: '升序',
          descending: '降序',
          none: '无序',
          remove: '取消排序'
        },
        column: {
          hide: '隐藏列'
        },
        aggregation: {
          count: '计数：',
          sum: '求和：',
          avg: '均值：',
          min: '最小值：',
          max: '最大值：'
        },
        pinning: {
          pinLeft: '左侧固定',
          pinRight: '右侧固定',
          unpin: '取消固定'
        },
        columnMenu: {
          close: '关闭'
        },
        gridMenu: {
          aria: {
            buttonLabel: '表格菜单'
          },
          columns: '列：',
          importerTitle: '导入文件',
          exporterAllAsCsv: '导出全部数据到CSV',
          exporterVisibleAsCsv: '导出可见数据到CSV',
          exporterSelectedAsCsv: '导出已选数据到CSV',
          exporterAllAsPdf: '导出全部数据到PDF',
          exporterVisibleAsPdf: '导出可见数据到PDF',
          exporterSelectedAsPdf: '导出已选数据到PDF',
          clearAllFilters: '清除所有过滤器'
        },
        importer: {
          noHeaders: '无法获取列名，确定文件包含表头？',
          noObjects: '无法获取数据，确定文件包含数据？',
          invalidCsv: '无法处理文件，确定是合法的CSV文件？',
          invalidJson: '无法处理文件，确定是合法的JSON文件？',
          jsonNotArray: '导入的文件不是JSON数组！'
        },
        pagination: {
          aria: {
            pageToFirst: '第一页',
            pageBack: '上一页',
            pageSelected: '当前页',
            pageForward: '下一页',
            pageToLast: '最后一页'
          },
          sizes: '行每页',
          totalItems: '行',
          through: '至',
          of: '共'
        },
        grouping: {
          group: '分组',
          ungroup: '取消分组',
          aggregate_count: '合计: 计数',
          aggregate_sum: '合计: 求和',
          aggregate_max: '合计: 最大',
          aggregate_min: '合计: 最小',
          aggregate_avg: '合计: 平均',
          aggregate_remove: '合计: 移除'
        }
      });
      return $delegate;
    }]);
  }]);
})();

(function() {
  angular.module('ui.grid').config(['$provide', function($provide) {
    $provide.decorator('i18nService', ['$delegate', function($delegate) {
      $delegate.add('zh-tw', {
        aggregate: {
          label: '行'
        },
        groupPanel: {
          description: '拖曳表頭到此處進行分組'
        },
        search: {
          placeholder: '查找',
          showingItems: '已顯示行數：',
          selectedItems: '已選擇行數：',
          totalItems: '總行數：',
          size: '每頁顯示行數：',
          first: '首頁',
          next: '下壹頁',
          previous: '上壹頁',
          last: '末頁'
        },
        menu: {
          text: '選擇列：'
        },
        sort: {
          ascending: '升序',
          descending: '降序',
          remove: '取消排序'
        },
        column: {
          hide: '隱藏列'
        },
        aggregation: {
          count: '計數：',
          sum: '求和：',
          avg: '均值：',
          min: '最小值：',
          max: '最大值：'
        },
        pinning: {
          pinLeft: '左側固定',
          pinRight: '右側固定',
          unpin: '取消固定'
        },
        gridMenu: {
          columns: '列：',
          importerTitle: '導入文件',
          exporterAllAsCsv: '導出全部數據到CSV',
          exporterVisibleAsCsv: '導出可見數據到CSV',
          exporterSelectedAsCsv: '導出已選數據到CSV',
          exporterAllAsPdf: '導出全部數據到PDF',
          exporterVisibleAsPdf: '導出可見數據到PDF',
          exporterSelectedAsPdf: '導出已選數據到PDF',
          clearAllFilters: '清除所有过滤器'
        },
        importer: {
          noHeaders: '無法獲取列名，確定文件包含表頭？',
          noObjects: '無法獲取數據，確定文件包含數據？',
          invalidCsv: '無法處理文件，確定是合法的CSV文件？',
          invalidJson: '無法處理文件，確定是合法的JSON文件？',
          jsonNotArray: '導入的文件不是JSON數組！'
        },
        pagination: {
          sizes: '行每頁',
          totalItems: '行'
        }
      });
      return $delegate;
    }]);
  }]);
})();
