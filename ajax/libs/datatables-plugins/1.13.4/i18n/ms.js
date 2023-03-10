(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [], factory);
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = factory();
	}
	// No browser loader - use JSON, ESM, CJS or AMD
}
(function() {
    return {
    "emptyTable": "Tiada data",
    "info": "Paparan dari _START_ hingga _END_ dari _TOTAL_ rekod",
    "infoEmpty": "Paparan 0 hingga 0 dari 0 rekod",
    "infoFiltered": "(Ditapis dari jumlah _MAX_ rekod)",
    "infoThousands": ",",
    "lengthMenu": "Papar _MENU_ rekod",
    "loadingRecords": "Diproses...",
    "processing": "Sedang diproses...",
    "search": "Carian:",
    "zeroRecords": "Tiada padanan rekod yang dijumpai.",
    "paginate": {
        "first": "Pertama",
        "previous": "Sebelum",
        "next": "Seterusnya",
        "last": "Akhir"
    },
    "aria": {
        "sortAscending": ": diaktifkan kepada susunan lajur menaik",
        "sortDescending": ": diaktifkan kepada susunan lajur menurun"
    },
    "autoFill": {
        "cancel": "batal",
        "fill": "Isi semua sel dengan <i>%d<\/i>",
        "fillHorizontal": "Isi sel secara mendatar",
        "fillVertical": "Isi sel secara menegak"
    },
    "buttons": {
        "collection": "Koleksi <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "copy": "Salin",
        "print": "Cetak",
        "colvis": "Kolum Pilihan"
    },
    "thousands": ",",
    "select": {
        "cells": {
            "1": "1 sel terpilih",
            "_": "%d sel terpilih"
        },
        "columns": {
            "1": "1 kolum terpilih",
            "_": "%d kolum terpilih"
        },
        "rows": {
            "1": "1 baris terpilih",
            "_": "%d baris terpilih"
        }
    },
    "editor": {
        "close": "Tutup"
    }
};
}));
