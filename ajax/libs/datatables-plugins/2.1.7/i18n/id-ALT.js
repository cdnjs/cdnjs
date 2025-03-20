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
    "zeroRecords": "Tidak ditemukan data yang sesuai",
    "info": "Tampilan _START_ sampai _END_ dari _TOTAL_ entri",
    "infoFiltered": "(disaring dari _MAX_ entri keseluruhan)",
    "search": "Cari:",
    "paginate": {
        "first": "Awal",
        "previous": "Balik",
        "next": "Lanjut",
        "last": "Akhir"
    },
    "autoFill": {
        "cancel": "Batalkan",
        "fill": "Isi semua sel dengan <i>%d<i><\/i><\/i>",
        "fillHorizontal": "isi sel secara horizontal",
        "fillVertical": "isi sel secara vertikal"
    },
    "buttons": {
        "collection": "Koleksi <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Visibilitas kolom",
        "colvisRestore": "Kembalikan visibilitas",
        "copy": "Salin",
        "copyKeys": "Tekan ctrl atau u2318 + C untuk menyalin tabel data ke papan klip sistem",
        "copyTitle": "Salin ke Papan Klip",
        "copySuccess": {
            "1": "1 row berhasil disalin",
            "_": "%d row berhasil disalin ke papan klip"
        },
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Tampilkan semua row",
            "_": "Tampilkan %d row"
        },
        "pdf": "PDF",
        "print": "Cetak"
    },
    "decimal": ",",
    "emptyTable": "Tidak ada data di tabel",
    "infoEmpty": "Menampilkan 0 entri",
    "infoPostFix": "Menampilkan _START_ sampai _END_ dari _TOTAL_ entri",
    "infoThousands": ".",
    "lengthMenu": "Tampilkan _MENU_ entri",
    "loadingRecords": "Memuat . . .",
    "processing": "Sedang memproses...",
    "thousands": ".",
    "aria": {
        "sortAscending": "urutkan naik",
        "sortDescending": "urutkan turun"
    },
    "searchBuilder": {
        "add": "Tambah Kondisi",
        "clearAll": "Hapus Semua",
        "condition": "Kondisi",
        "data": "Data"
    },
    "searchPlaceholder": "Cari sesuatu disini",
    "datetime": {
        "hours": "Jam",
        "minutes": "Menit",
        "seconds": "Detik",
        "weekdays": {
            "1": "Sen",
            "2": "Sel",
            "3": "Rab",
            "4": "Kam",
            "5": "Jum",
            "6": "Sab",
            "0": "Min"
        },
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
        ],
        "previous": "Kembali",
        "next": "Lanjut",
        "unknown": "-"
    },
    "editor": {
        "close": "Tutup",
        "create": {
            "button": "Baru",
            "title": "Buat entri baru",
            "submit": "Kirim"
        },
        "edit": {
            "button": "Ubah",
            "title": "Ubah entri",
            "submit": "Kirim"
        },
        "remove": {
            "button": "Hapus",
            "title": "Hapus",
            "submit": "Kirim",
            "confirm": {
                "_": "Kamu mau hapus %d baris?",
                "1": "Kamu mau hapus 1 baris?"
            }
        },
        "error": {
            "system": "Kesalahan sistem terdeteksi (<a rel=\"nofollow\" href=\"\">Informasi Selengkapnya<\/a>)"
        },
        "multi": {
            "title": "Beberapa nilai",
            "info": "Item yang dipilih mengandung nilai yang berbeda untuk masukkan ini. Untuk mengubah dan mengaturnya semua item untuk masukkan ini untuk nilai yang sama, klik atau sentuh disini, jika tidak, mereka akan mempertahankan nilai-nilai individual mereka.",
            "restore": "Batalkan Perubahan",
            "noMulti": "Mauskkan ini tidak dapat diubah sendirian, tetapi bukan bagian di grup ini."
        }
    }
};
}));
