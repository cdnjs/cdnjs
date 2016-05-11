/**
 * @license jqGrid Catalan Translation
 *
 * Traducció jqGrid en Català per Faserline, S.L.
 * http://www.faserline.com
 *
 * Traducció corregida i ampliada per Marc lobato
 * http://www.navigatecms.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jslint white: true */
/*global jQuery */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
"use strict";
var locInfo = {
	isRTL: false,
	defaults: {
		recordtext: "Mostrant {0} - {1} de {2}",
		emptyrecords: "Sense registres per mostrar",
		loadtext: "Carregant...",
		pgtext: "Pàgina {0} de {1}",
		pgfirst: "Primera pàgina",
		pglast: "Última pàgina",
		pgnext: "Pàgina següent",
		pgprev: "Pàgina anterior",
		pgrecs: "Registres per pàgina",
		showhide: "Alternar expandir/col·lapsar la taula",
		savetext: "S'està desant..."
	},
	search: {
		caption: "Cerca...",
		Find: "Cercar",
		Reset: "Buidar",
		odata: [
			{ oper: "eq", text: "igual" },
			{ oper: "ne", text: "no igual" },
			{ oper: "lt", text: "menor que" },
			{ oper: "le", text: "menor o igual" },
			{ oper: "gt", text: "major que" },
			{ oper: "ge", text: "major o igual" },
			{ oper: "bw", text: "comença amb" },
			{ oper: "bn", text: "no comença amb" },
			{ oper: "in", text: "està entre" },
			{ oper: "ni", text: "no està entre" },
			{ oper: "ew", text: "acaba amb" },
			{ oper: "en", text: "no acaba amb" },
			{ oper: "cn", text: "conté" },
			{ oper: "nc", text: "no conté" },
			{ oper: "nu", text: "és nul" },
			{ oper: "nn", text: "no és nul" }
		],
		groupOps: [
			{ op: "AND", text: "tot" },
			{ op: "OR",  text: "qualsevol" }
		],
		addGroupTitle: "Crear subgrup",
		deleteGroupTitle: "Eliminar grup",
		addRuleTitle: "Crear regla",
		deleteRuleTitle: "Eliminar regla",
		operandTitle: "Clic per escollir la operació de cerca.",
		resetTitle: "Reiniciar valors de la cerca"
	},
	edit: {
		addCaption: "Afegir registre",
		editCaption: "Modificar registre",
		bSubmit: "Guardar",
		bCancel: "Cancelar",
		bClose: "Tancar",
		saveData: "Les dades han canviat. Guardar canvis?",
		bYes: "Sí",
		bNo: "No",
		bExit: "Cancel·lar",
		msg: {
			required: "Camp obligatori",
			number: "Introdueixi un nombre",
			minValue: "El valor ha de ser major o igual que ",
			maxValue: "El valor ha de ser menor o igual a ",
			email: "no és una direcció de correu vàlida",
			integer: "Introdueixi un valor enter",
			date: "Introdueixi una data correcta ",
			url: "no és una URL vàlida. Prefix requerit ('http://' o 'https://')",
			nodefined: " no està definit!",
			novalue: " es requereix un valor de retorn!",
			customarray: "La funció personalitzada hauria de retornar una array!",
			customfcheck: "La funció personalitzada hauria d'estar present si es fa una comprovació personalitzada!"
		}
	},
	view: {
		caption: "Veure registre",
		bClose: "Tancar"
	},
	del: {
		caption: "Eliminar",
		msg: "¿Desitja eliminar els registres seleccionats?",
		bSubmit: "Eliminar",
		bCancel: "Cancel·lar"
	},
	nav: {
		edittext: "",
		edittitle: "Modificar fila seleccionada",
		addtext: "",
		addtitle: "Agregar nova fila",
		deltext: "",
		deltitle: "Eliminar fila seleccionada",
		searchtext: "",
		searchtitle: "Cercar informació",
		refreshtext: "",
		refreshtitle: "Refrescar taula",
		alertcap: "Avís",
		alerttext: "Seleccioni una fila",
		viewtext: "",
		viewtitle: "Veure fila seleccionada",
		savetext: "",
		savetitle: "Guardar fila",
		canceltext: "",
		canceltitle: "Cancel·lar edició de la fila"
	},
	// setcolumns module
	col: {
		caption: "Mostrar/ocultar columnes",
		bSubmit: "Enviar",
		bCancel: "Cancelar"
	},
	errors: {
		errcap: "Error",
		nourl: "No s'ha especificat una URL",
		norecords: "No hi ha dades per processar",
		model: "Les columnes de noms són diferents de les columnes del model"
	},
	formatter: {
		integer: { thousandsSeparator: ".", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2, defaultValue: "0,00" },
		currency: { decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0,00" },
		date: {
			dayNames: [
				"Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds",
				"Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"
			],
			monthNames: [
				"Gen", "Febr", "Març", "Abr", "Maig", "Juny", "Jul", "Ag", "Set", "Oct", "Nov", "Des",
				"Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
			],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function (j) {
				return j < 11 || j > 13 ? ["st", "nd", "rd", "th"][Math.min((j - 1) % 10, 3)] : "th";
			},
			srcformat: "Y-m-d",
			newformat: "d-m-Y",
			masks: {
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
		locale: "ca"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		ca: $.extend({}, locInfo, { name: "català", nameEnglish: "Catalan" }),
		"ca-ES": $.extend({}, locInfo, { name: "català (català)", nameEnglish: "Catalan (Catalan)" })
	}
});
}));
