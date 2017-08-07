;(function($){
/**
 * jqGrid Polish Translation
 * Łukasz Schab lukasz@freetree.pl
 * http://FreeTree.pl
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/
$.jgrid = $.jgrid || {};
$.extend($.jgrid,{
	defaults : {
		recordtext: "Pokaż {0} - {1} z {2}",
	    emptyrecords: "Brak rekordów do pokazania",
		loadtext: "\u0142adowanie...",
		pgtext : "Strona {0} z {1}"
	},
	search : {
	    caption: "Wyszukiwanie...",
	    Find: "Szukaj",
	    Reset: "Czyść",
	    odata : ['dok\u0142adnie', 'różne od', 'mniejsze od', 'mniejsze lub równe','większe od','większe lub równe', 'zaczyna się od','nie zaczyna się od','jest w','nie jest w','kończy się na','nie kończy się na','zawiera','nie zawiera'],
	    groupOps: [	{ op: "AND", text: "oraz" },	{ op: "OR",  text: "lub" }	],
		matchText: " pasuje",
		rulesText: " regu\u0142y"
	},
	edit : {
	    addCaption: "Dodaj rekord",
	    editCaption: "Edytuj rekord",
	    bSubmit: "Zapisz",
	    bCancel: "Anuluj",
		bClose: "Zamknij",
		saveData: "Dane zosta\u0142y zmienione! Zapisać zmiany?",
		bYes : "Tak",
		bNo : "Nie",
		bExit : "Anuluj",
	    msg: {
	        required:"Pole jest wymagane",
	        number:"Proszę wpisać poprawną liczbę",
	        minValue:"wartość musi być większa lub równa od",
	        maxValue:"wartość musi być mniejsza lub równa od",
	        email: "nie jest poprawnym adresem e-mail",
	        integer: "Proszę wpisać poprawną liczbę",
			date: "Proszę podaj poprawną datę",
			url: "jest niew\u0142aściwym adresem URL. Pamiętaj o prefiksie ('http://' lub 'https://')",
			nodefined : " nie zdefiniowane!",
			novalue : " wymagana jest wartość zwracana !",
			customarray : "Funkcja niestandardowa powinna zwracać tablicę!",
			customfcheck : "Funkcja niestandardowa powinna być obecna w przypadku niestandardowego sprawdzania !"
			
		}
	},
	view : {
	    caption: "Pokaż rekord",
	    bClose: "Zamknij"
	},
	del : {
	    caption: "Usuń",
	    msg: "Czy usunąć wybrany rekord(y)?",
	    bSubmit: "Usuń",
	    bCancel: "Anuluj"
	},
	nav : {
		edittext: " ",
	    edittitle: "Edytuj wybrany wiersz",
		addtext:" ",
	    addtitle: "Dodaj nowy wiersz",
	    deltext: " ",
	    deltitle: "Usuń wybrany wiersz",
	    searchtext: " ",
	    searchtitle: "Wyszukaj rekord",
	    refreshtext: "",
	    refreshtitle: "Prze\u0142aduj",
	    alertcap: "Uwaga",
	    alerttext: "Proszę wybrać wiersz",
		viewtext: "",
		viewtitle: "Pokaż wybrany wiersz"
	},
	col : {
	    caption: "Pokaż/Ukryj kolumny",
	    bSubmit: "Zatwierdź",
	    bCancel: "Anuluj"	
	},
	errors : {
		errcap : "B\u0142ąd",
		nourl : "Brak adresu url",
		norecords: "Brak danych",
	    model : "D\u0142ugość colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"Nie", "Pon", "Wt", "Śr", "Cz", "Pi", "So",
				"Niedziela", "Poniedzia\u0142ek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"
			],
			monthNames: [
				"Sty", "Lu", "Mar", "Kwie", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru",
				"Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"
				],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['', '', '', ''][Math.min((j - 1) % 10, 3)] : ''},
			srcformat: 'Y-m-d',
			newformat: 'd/m/Y',
			masks : {
			    ISO8601Long:"Y-m-d H:i:s",
			    ISO8601Short:"Y-m-d",
			    ShortDate: "n/j/Y",
			    LongDate: "l, F d, Y",
			    FullDateTime: "l, F d, Y g:i:s A",
			    MonthDay: "F d",
			    ShortTime: "g:i A",
			    LongTime: "g:i:s A",
			    SortableDateTime: "Y-m-d\\TH:i:s",
			    UniversalSortableDateTime: "Y-m-d H:i:sO",
			    YearMonth: "F, Y"
			},
			reformatAfterEdit : false
		},	
		baseLinkUrl: '',
		showAction: '',
	    target: '',
	    checkbox : {disabled:true},
		idName : 'id'
	}
});
})(jQuery);