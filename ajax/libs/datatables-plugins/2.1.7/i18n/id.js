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
    "emptyTable": "Tidak ada data yang tersedia pada tabel ini",
    "info": "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
    "infoEmpty": "Menampilkan 0 sampai 0 dari 0 entri",
    "infoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
    "lengthMenu": "Tampilkan _MENU_ entri",
    "loadingRecords": "Sedang memuat...",
    "processing": "Sedang memproses...",
    "search": "Cari:",
    "zeroRecords": "Tidak ditemukan data yang sesuai",
    "paginate": {
        "first": "Pertama",
        "last": "Terakhir",
        "next": "Selanjutnya",
        "previous": "Sebelumnya"
    },
    "aria": {
        "sortAscending": ": aktifkan untuk mengurutkan kolom ke atas",
        "sortDescending": ": aktifkan untuk mengurutkan kolom menurun"
    },
    "autoFill": {
        "fill": "Isi semua sel dengan <i>%d<\/i>",
        "fillHorizontal": "Isi sel secara horizontal",
        "fillVertical": "Isi sel secara vertikal",
        "cancel": "Batal",
        "info": "Info"
    },
    "buttons": {
        "collection": "Kumpulan <span class='ui-button-icon-primary ui-icon ui-icon-triangle-1-s'\/>",
        "colvis": "Visibilitas Kolom",
        "colvisRestore": "Kembalikan visibilitas",
        "copy": "Salin",
        "copySuccess": {
            "_": "%d baris disalin ke papan klip",
            "1": "satu baris disalin ke papan klip"
        },
        "copyTitle": "Salin ke Papan klip",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Tampilkan semua baris",
            "_": "Tampilkan %d baris",
            "1": "Tampilkan satu baris"
        },
        "pdf": "PDF",
        "print": "Cetak",
        "copyKeys": "Tekan ctrl atau u2318 + C untuk menyalin tabel ke papan klip.<br \/><br \/>Untuk membatalkan, klik pesan ini atau tekan esc.",
        "createState": "Tambahkan Data",
        "removeAllStates": "Hapus Semua Data",
        "removeState": "Hapus Data",
        "renameState": "Rubah Nama",
        "savedStates": "SImpan Data",
        "stateRestore": "Publihkan Data",
        "updateState": "Perbaharui data"
    },
    "searchBuilder": {
        "add": "Tambah Kondisi",
        "button": {
            "0": "Cari Builder",
            "_": "Cari Builder (%d)"
        },
        "clearAll": "Bersihkan Semua",
        "condition": "Kondisi",
        "data": "Data",
        "deleteTitle": "Hapus filter",
        "leftTitle": "Ke Kiri",
        "logicAnd": "Dan",
        "logicOr": "Atau",
        "rightTitle": "Ke Kanan",
        "title": {
            "0": "Cari Builder",
            "_": "Cari Builder (%d)"
        },
        "value": "Nilai",
        "conditions": {
            "date": {
                "after": "Setelah",
                "before": "Sebelum",
                "between": "Diantara",
                "empty": "Kosong",
                "equals": "Sama dengan",
                "not": "Tidak sama",
                "notBetween": "Tidak diantara",
                "notEmpty": "Tidak kosong"
            },
            "number": {
                "empty": "Kosong",
                "equals": "Sama dengan",
                "gt": "Lebih besar dari",
                "gte": "Lebih besar atau sama dengan",
                "lt": "Lebih kecil dari",
                "lte": "Lebih kecil atau sama dengan",
                "not": "Tidak sama",
                "notEmpty": "Tidak kosong",
                "between": "Di antara",
                "notBetween": "Tidak di antara"
            },
            "string": {
                "contains": "Berisi",
                "empty": "Kosong",
                "endsWith": "Diakhiri dengan",
                "not": "Tidak sama",
                "notEmpty": "Tidak kosong",
                "startsWith": "Diawali dengan",
                "equals": "Sama dengan",
                "notContains": "Tidak Berisi",
                "notStartsWith": "Tidak diawali Dengan",
                "notEndsWith": "Tidak diakhiri Dengan"
            },
            "array": {
                "equals": "Sama dengan",
                "empty": "Kosong",
                "contains": "Berisi",
                "not": "Tidak",
                "notEmpty": "Tidak kosong",
                "without": "Tanpa"
            }
        }
    },
    "searchPanes": {
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "collapse": {
            "0": "Panel Pencarian",
            "_": "Panel Pencarian (%d)"
        },
        "emptyPanes": "Tidak Ada Panel Pencarian",
        "loadMessage": "Memuat Panel Pencarian",
        "clearMessage": "Bersihkan",
        "title": "Saringan Aktif - %d",
        "showMessage": "Tampilkan",
        "collapseMessage": "Ciutkan"
    },
    "infoThousands": ",",
    "datetime": {
        "previous": "Sebelumnya",
        "next": "Selanjutnya",
        "hours": "Jam",
        "minutes": "Menit",
        "seconds": "Detik",
        "unknown": "-",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "Min",
            "Sen",
            "Sel",
            "Rab",
            "Kam",
            "Jum",
            "Sab"
        ],
        "months": [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember"
        ]
    },
    "editor": {
        "close": "Tutup",
        "create": {
            "button": "Tambah",
            "submit": "Tambah",
            "title": "Tambah inputan baru"
        },
        "remove": {
            "button": "Hapus",
            "submit": "Hapus",
            "confirm": {
                "_": "Apakah Anda yakin untuk menghapus %d baris?",
                "1": "Apakah Anda yakin untuk menghapus 1 baris?"
            },
            "title": "Hapus inputan"
        },
        "multi": {
            "title": "Beberapa Nilai",
            "info": "Item yang dipilih berisi nilai yang berbeda untuk input ini. Untuk mengedit dan mengatur semua item untuk input ini ke nilai yang sama, klik atau tekan di sini, jika tidak maka akan mempertahankan nilai masing-masing.",
            "restore": "Batalkan Perubahan",
            "noMulti": "Masukan ini dapat diubah satu per satu, tetapi bukan bagian dari grup."
        },
        "edit": {
            "title": "Edit inputan",
            "submit": "Edit",
            "button": "Edit"
        },
        "error": {
            "system": "Terjadi kesalahan pada system. (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Informasi Selebihnya<\/a>)."
        }
    },
    "stateRestore": {
        "creationModal": {
            "button": "Buat",
            "columns": {
                "search": "Pencarian Kolom",
                "visible": "Visibilitas Kolom"
            },
            "name": "Nama:",
            "order": "Penyortiran",
            "search": "Pencarian",
            "select": "Pemilihan",
            "title": "Buat State Baru",
            "toggleLabel": "Termasuk:",
            "paging": "Nomor Halaman",
            "scroller": "Posisi Skrol",
            "searchBuilder": "Cari Builder"
        },
        "emptyError": "Nama tidak boleh kosong.",
        "removeConfirm": "Apakah Anda yakin ingin menghapus %s?",
        "removeJoiner": "dan",
        "removeSubmit": "Hapus",
        "renameButton": "Ganti Nama",
        "renameLabel": "Nama Baru untuk %s:",
        "duplicateError": "Nama State ini sudah ada.",
        "emptyStates": "Tidak ada State yang disimpan.",
        "removeError": "Gagal menghapus State.",
        "removeTitle": "Penghapusan State",
        "renameTitle": "Ganti nama State"
    },
    "decimal": ",",
    "searchPlaceholder": "kata kunci pencarian",
    "select": {
        "cells": {
            "1": "1 sel dipilih",
            "_": "%d sel dipilih"
        },
        "columns": {
            "1": "1 kolom dirpilih",
            "_": "%d kolom dipilih"
        },
        "rows": {
            "1": "1 baris dipilih",
            "_": "%d baris dipilih"
        }
    },
    "thousands": "."
};
}));
