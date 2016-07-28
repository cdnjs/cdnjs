/**
 * @license jqGrid Brazilian-Portuguese Translation
 * Sergio Righi sergio.righi@gmail.com
 * http://curve.com.br
 *
 * Updated by Jonnas Fonini
 * http://fonini.net
 *
 *
 * Updated by Fabio Ferreira da Silva fabio_ferreiradasilva@yahoo.com.br
 *
 *
 * Updated by Anderson Pimentel anderson.pimentel[at]gmail.com
 *
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
	name: "Português (Brasil)",
	nameEnglish: "Portuguese (Brazil)",
	isRTL: false,
	defaults: {
		recordtext: "Ver {0} - {1} de {2}",
		emptyrecords: "Nenhum registro para visualizar",
		loadtext: "Carregando...",
		pgtext: "Página {0} de {1}",
		pgfirst: "Primeira Página",
		pglast: "Última Página",
		pgnext: "Próxima Página",
		pgprev: "Página Anterior",
		pgrecs: "Registros por Página",
		showhide: "Exibir/Ocultar Grid",
		savetext: "Salvando..."
	},
	search: {
		caption: "Procurar...",
		Find: "Procurar",
		Reset: "Limpar",
		odata: [
			{ oper: "eq", text: "igual" },
			{ oper: "ne", text: "diferente" },
			{ oper: "lt", text: "menor" },
			{ oper: "le", text: "menor ou igual" },
			{ oper: "gt", text: "maior" },
			{ oper: "ge", text: "maior ou igual" },
			{ oper: "bw", text: "inicia com" },
			{ oper: "bn", text: "não inicia com" },
			{ oper: "in", text: "está em" },
			{ oper: "ni", text: "não está em" },
			{ oper: "ew", text: "termina com" },
			{ oper: "en", text: "não termina com" },
			{ oper: "cn", text: "contém" },
			{ oper: "nc", text: "não contém" },
			{ oper: "nu", text: "nulo" },
			{ oper: "nn", text: "não nulo" }
		],
		groupOps: [
			{ op: "AND", text: "todos" },
			{ op: "OR",  text: "qualquer um" }
		],
		addGroupTitle: "Add subgroup",
		deleteGroupTitle: "Delete group",
		addRuleTitle: "Add rule",
		deleteRuleTitle: "Delete rule",
		operandTitle: "Clique para escolher a operação de pesquisa.",
		resetTitle: "Limpar valor da pesquisa"
	},
	edit: {
		addCaption: "Incluir",
		editCaption: "Alterar",
		bSubmit: "Enviar",
		bCancel: "Cancelar",
		bClose: "Fechar",
		saveData: "Os dados foram alterados! Salvar alterações?",
		bYes: "Sim",
		bNo: "Não",
		bExit: "Cancelar",
		msg: {
			required: "Campo obrigatório",
			number: "Por favor, informe um número válido",
			minValue: "valor deve ser igual ou maior que ",
			maxValue: "valor deve ser menor ou igual a",
			email: "este e-mail não é válido",
			integer: "Por favor, informe um valor inteiro",
			date: "Por favor, informe uma data válida",
			url: "não é uma URL válida. Prefixo obrigatório ('http://' or 'https://')",
			nodefined: " não está definido!",
			novalue: " um valor de retorno é obrigatório!",
			customarray: "Função customizada deve retornar um array!",
			customfcheck: "Função customizada deve estar presente em caso de validação customizada!"
		}
	},
	view: {
		caption: "Ver Registro",
		bClose: "Fechar"
	},
	del: {
		caption: "Apagar",
		msg: "Apagar registro(s) selecionado(s)?",
		bSubmit: "Apagar",
		bCancel: "Cancelar"
	},
	nav: {
		edittext: "",
		edittitle: "Alterar registro selecionado",
		addtext: "",
		addtitle: "Incluir novo registro",
		deltext: "",
		deltitle: "Apagar registro selecionado",
		searchtext: "",
		searchtitle: "Procurar registros",
		refreshtext: "",
		refreshtitle: "Recarregar tabela",
		alertcap: "Aviso",
		alerttext: "Por favor, selecione um registro",
		viewtext: "",
		viewtitle: "Ver linha selecionada",
		savetext: "",
		savetitle: "Salvar linha",
		canceltext: "",
		canceltitle: "Cancelar edição da linha"
	},
	col: {
		caption: "Mostrar/Esconder Colunas",
		bSubmit: "Enviar",
		bCancel: "Cancelar"
	},
	errors: {
		errcap: "Erro",
		nourl: "Nenhuma URL definida",
		norecords: "Sem registros para exibir",
		model: "Comprimento de colNames <> colModel!"
	},
	formatter: {
		integer: { thousandsSeparator: " ", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: "0,00" },
		currency: { decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2, prefix: "R$ ", suffix: "", defaultValue: "0,00" },
		date: {
			dayNames:   [
				"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb",
				"Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"
			],
			monthNames: [
				"Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",
				"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
			],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function (j) {
				return j < 11 || j > 13 ? ["º", "º", "º", "º"][Math.min((j - 1) % 10, 3)] : "º";
			},
			srcformat: "Y-m-d",
			newformat: "d/m/Y",
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
		locale: "pt-BR"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		"pt-BR": locInfo
	}
});
}));
