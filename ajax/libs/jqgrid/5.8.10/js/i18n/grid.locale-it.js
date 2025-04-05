/*global jQuery, define */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"../grid.base"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

$.jgrid = $.jgrid || {};
if(!$.jgrid.hasOwnProperty("regional")) {
	$.jgrid.regional = [];
}
$.jgrid.regional["it"] = {
	defaults : {
		recordtext: "Mostra {0} - {1} di {2}",
		emptyrecords: "Non ci sono record da mostrare",
		loadtext: "Caricamento...",
		savetext: "Salvataggio...",
		pgtext : "Pagina {0} di {1}",
		pgfirst : "Prima Pagina",
		pglast : "Ultima Pagina",
		pgnext : "Pagina Successiva",
		pgprev : "Pagina Precedente",
		pgrecs : "Records per Pagina",
		showhide: "Espandi o collassa griglia",
		// mobile
		pagerCaption : "Griglia::Impostazioni della pagina",
		pageText : "Pagina:",
		recordPage : "Records per Pagina",
		nomorerecs : "Non ci sono altri record...",
		scrollPullup: "Trascina verso l'alto per altri...",
		scrollPulldown : "Trascina verso il basso per aggiornare...",
		scrollRefresh : "Rilascia per aggiornare...",
		valT : "checked",
		valF : "unchecked",
		selectLine : "Select row",
		selectAllLines : "Select all rows"
	},
	search : {
		caption: "Cerca...",
		Find: "Trova",
		Reset: "Reset",
		odata: [{ oper:'eq', text:'uguale'},{ oper:'ne', text:'diverso'},{ oper:'lt', text:'minore'},{ oper:'le', text:'minore o uguale'},{ oper:'gt', text:'maggiore'},{ oper:'ge', text:'maggiore o uguale'},{ oper:'bw', text:'inizia per'},{ oper:'bn', text:'non inizia per'},{ oper:'in', text:'è in'},{ oper:'ni', text:'non è in'},{ oper:'ew', text:'finisce per'},{ oper:'en', text:'non finisce per'},{ oper:'cn', text:'contiene'},{ oper:'nc', text:'non contiene'},{ oper:'nu', text:'è null'},{ oper:'nn', text:'non è null'}, {oper:'bt', text:'between'}],
		groupOps: [{ op: "AND", text: "tutti" },{ op: "OR",  text: "ciascuno" }],
		operandTitle : "Clicca sull'opzione di ricerca scelta.",
		resetTitle : "Resetta valori di ricerca",
		addsubgrup : "Aggiungi Sottogruppo",
		addrule : "Aggiungi Regola",
		delgroup : "Cancella Sottogruppo",
		delrule : "Cancella Regola",
		Close : "Close",
		Operand : "Operand : ",
		Operation : "Oper : ",
		filterFor : "filter for"
	},
	edit : {
		addCaption: "Aggiungi Record",
		editCaption: "Modifica Record",
		bSubmit: "Invia",
		bCancel: "Annulla",
		bClose: "Chiudi",
		saveData: "I dati sono stati modificati! Salvare le modifiche?",
		bYes : "Si",
		bNo : "No",
		bExit : "Annulla",
		msg: {
			required:"Campo obbligatorio",
			number:"Per favore, inserisci un numero valido",
			minValue:"il valore deve essere maggiore o uguale a ",
			maxValue:"il valore deve essere minore o uguale a ",
			email: "non è una e-mail valida",
			integer: "Per favore, inserisci un intero valido",
			date: "Per favore, inserisci una data valida",
			url: "non è un URL valido. Prefissi richiesti ('http://' o 'https://')",
			nodefined : " non è definito!",
			novalue : " valore di ritorno richiesto!",
			customarray : "La funzione personalizzata deve restituire un array!",
			customfcheck : "La funzione personalizzata deve essere presente in caso di controlli personalizzati!"
			
		}
	},
	view : {
		caption: "Visualizza Record",
		bClose: "Chiudi"
	},
	del : {
		caption: "Cancella",
		msg: "Cancellare i record selezionati?",
		bSubmit: "Cancella",
		bCancel: "Annulla"
	},
	nav : {
		edittext: "",
		edittitle: "Modifica riga selezionata",
		addtext:"",
		addtitle: "Aggiungi riga",
		deltext: "",
		deltitle: "Cancella riga",
		searchtext: "",
		searchtitle: "Trova record",
		refreshtext: "",
		refreshtitle: "Ricarica tabella",
		alertcap: "Attenzione",
		alerttext: "Per favore, seleziona un record",
		viewtext: "",
		viewtitle: "Visualizza riga selezionata",
		savetext: "",
		savetitle: "Salva riga",
		canceltext: "",
		canceltitle : "Annulla modifica riga",
		selectcaption : "Azioni..."
	},
	col : {
		caption: "Seleziona colonne",
		bSubmit: "Ok",
		bCancel: "Annulla"
	},
	errors : {
		errcap : "Errore",
		nourl : "Nessun url impostato",
		norecords: "Non ci sono record da elaborare",
		model : "Lunghezza dei colNames <> colModel!"
	},
	formatter:{
		integer:{ 
			thousandsSeparator:".",
			defaultValue:"0"
		},
		number:{
			decimalSeparator:",",
			thousandsSeparator:".",
			decimalPlaces:2,
			defaultValue:"0,00"
		},
		currency:{
			decimalSeparator:",",
			thousandsSeparator:".",
			decimalPlaces:2,
			prefix:"€ ",
			suffix:"",
			defaultValue:"0,00"
		},
		date:{
			dayNames:["Dom","Lun","Mar","Mer","Gio","Ven","Sab","Domenica","Lunedì","Martedì","Mercoledì","Giovedì","Venerdì","Sabato"],
			monthNames:["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic","Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],
			AmPm:["am","pm","AM","PM"],
			S:function(b){return b<11||b>13?["st","nd","rd","th"][Math.min((b-1)%10,3)]:"th"},
			srcformat:"Y-m-d",
			newformat:"d/m/Y",
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks:{
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d", 
				ShortDate:"d/m/Y", 
				LongDate:"l d F Y",
				FullDateTime:"l d F Y G:i:s",
				MonthDay:"F d",
				ShortTime:"H:i",
				LongTime:"H:i:s",
				SortableDateTime:"Y-m-d\\TH:i:s",
				UniversalSortableDateTime:"Y-m-d H:i:sO",
				YearMonth:"F, Y"
			},
			reformatAfterEdit:false,
			userLocalTime : false
		},
		baseLinkUrl:"",
		showAction:"",
		target:"",
		checkbox:{ disabled:true},
		idName:"id"
	},
	colmenu : {
		sortasc : "Ordinamento Ascendente",
		sortdesc : "Ordinamento Discendente",
		columns : "Colonne",
		filter : "Filtro",
		grouping : "Raggruppa",
		ungrouping : "Separa",
		searchTitle : "Cerca righe con i valori:",
		freeze : "Blocca",
		unfreeze : "Sblocca",
		reorder : "Sposta per riordinare",
		hovermenu: "Click for column quick actions"
	},
	clipboard : {
		menus : {
			copy_act : "Copy Selected to Clipboard",
			paste_act : "Paste Update from Clipboard",
			paste_act_add: "Paste Add from Clipboard",
			undo_act : "Undo",
			repeat_act_row : "Repeat row vertically",
			repeat_act_col : "Repeat column horizontally",
			cancel_act : "Cancel"
		},
		msg : {
			text_c : "Text copied to clipboard.",
			select_pos : "Please click position to paste!",
			info_cap : "Information",
			total_row : "Total rows: ",
			insert_row: "Inserted: ",
			update_row: "Updated: "
		},
		errors : {
			enb_prm : "Copy paste disabled in browser, please enable it!",
			copy_err : "Failed to copy to clipboard: ",
			read_err : "Failed to read clipboard contents: ",
			get_data_err : "Can not get data from clipboard or empty!",
			start_ind_err : "Start index of the cell is not valid!",
			local_stor_err : "Local storage not available! Can not store data for undo changes!",
			not_array_err: "Data can not be converted to array"
		}
	}
};
}));
