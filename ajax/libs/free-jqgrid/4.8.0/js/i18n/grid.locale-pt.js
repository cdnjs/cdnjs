/**
 * jqGrid Portuguese Translation
 * Tradução da jqGrid em Portugues por Frederico Carvalho, http://www.eyeviewdesign.pt
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jslint white: true */
/*global jQuery */
(function($){
"use strict";
var locInfo = {
	isRTL: false,
	defaults : {
		recordtext: "View {0} - {1} of {2}",
	    emptyrecords: "No records to view",
		loadtext: "A carregar...",
		pgtext : "Página {0} de {1}",
		pgfirst : "First Page",
		pglast : "Last Page",
		pgnext : "Next Page",
		pgprev : "Previous Page",
		pgrecs : "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "A guardar..."
	},
	search : {
	    caption: "Busca...",
	    Find: "Procurar",
	    Reset: "Limpar",
	    odata: [{ oper:'eq', text:'equal'},{ oper:'ne', text:'not equal'},{ oper:'lt', text:'less'},{ oper:'le', text:'less or equal'},{ oper:'gt', text:'greater'},{ oper:'ge', text:'greater or equal'},{ oper:'bw', text:'begins with'},{ oper:'bn', text:'does not begin with'},{ oper:'in', text:'is in'},{ oper:'ni', text:'is not in'},{ oper:'ew', text:'ends with'},{ oper:'en', text:'does not end with'},{ oper:'cn', text:'contains'},{ oper:'nc', text:'does not contain'},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}],
	    groupOps: [	{ op: "AND", text: "all" },	{ op: "OR",  text: "any" }	],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value"
	},
	edit : {
	    addCaption: "Adicionar Registo",
	    editCaption: "Modificar Registo",
	    bSubmit: "Submeter",
	    bCancel: "Cancelar",
		bClose: "Fechar",
		saveData: "Data has been changed! Save changes?",
		bYes : "Yes",
		bNo : "No",
		bExit : "Cancel",
	    msg: {
	        required:"Campo obrigatório",
	        number:"Por favor, introduza um numero",
	        minValue:"O valor deve ser maior ou igual que",
	        maxValue:"O valor deve ser menor ou igual a",
	        email: "Não é um endereço de email válido",
	        integer: "Por favor, introduza um numero inteiro",
			url: "is not a valid URL. Prefix required ('http://' or 'https://')",
			nodefined : " is not defined!",
			novalue : " return value is required!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
		}
	},
	view : {
	    caption: "View Record",
	    bClose: "Close"
	},
	del : {
	    caption: "Eliminar",
	    msg: "Deseja eliminar o(s) registo(s) seleccionado(s)?",
	    bSubmit: "Eliminar",
	    bCancel: "Cancelar"
	},
	nav : {
		edittext: "",
	    edittitle: "Modificar registo seleccionado",
		addtext: "",
	    addtitle: "Adicionar novo registo",
	    deltext: "",
	    deltitle: "Eliminar registo seleccionado",
	    searchtext: "",
	    searchtitle: "Procurar",
	    refreshtext: "",
	    refreshtitle: "Actualizar",
	    alertcap: "Aviso",
	    alerttext: "Por favor, seleccione um registo",
		viewtext: "",
		viewtitle: "View selected row"
	},
	col : {
	    caption: "Mostrar/Ocultar Colunas",
	    bSubmit: "Enviar",
	    bCancel: "Cancelar"	
	},
	errors : {
		errcap : "Erro",
		nourl : "Não especificou um url",
		norecords: "Não existem dados para processar",
	    model : "Tamanho do colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb",
				"Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"
			],
			monthNames: [
				"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",
				"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['º', 'º', 'º', 'º'][Math.min((j - 1) % 10, 3)] : 'º';},
			srcformat: 'Y-m-d',
			newformat: 'd/m/Y',
			masks : {
	            ShortDate: "n/j/Y",
	            LongDate: "l, F d, Y",
	            FullDateTime: "l, F d, Y g:i:s A",
	            MonthDay: "F d",
	            ShortTime: "g:i A",
	            LongTime: "g:i:s A",
	            YearMonth: "F, Y"
	        }
		}
	}
};
$.jgrid = $.jgrid || {};
$.extend(true, $.jgrid, {
	defaults: {
		locale: "pt"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		pt: $.extend({}, locInfo, { name: "Português", nameEnglish: "Portuguese" }),
		"pt-PT": $.extend({}, locInfo, { name: "português (Portugal)", nameEnglish: "Portuguese (Portugal)" })
	}
});
}(jQuery));
