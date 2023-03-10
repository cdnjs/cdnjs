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
    "emptyTable": "Cədvəldə heç bir məlumat yoxdur",
    "infoEmpty": "Nəticə Yoxdur",
    "infoFiltered": "( _MAX_ Nəticə İçindən Tapılanlar)",
    "loadingRecords": "Yüklənir...",
    "processing": "Gözləyin...",
    "search": "Axtarış:",
    "zeroRecords": "Nəticə Tapılmadı.",
    "paginate": {
        "first": "İlk",
        "last": "Axırıncı",
        "previous": "Öncəki",
        "next": "Sonrakı"
    },
    "aria": {
        "sortDescending": ": sütunu azalma sırası üzərə aktiv etmək",
        "sortAscending": ": sütunu artma sırası üzərə aktiv etmək"
    },
    "autoFill": {
        "fill": "Bütün hücrələri <i>%d<\/i> ile doldur",
        "fillHorizontal": "Hücrələri üfiqi olaraq doldur",
        "fillVertical": "Hücrələri şaquli olara1 doldur",
        "cancel": "Ləğv et"
    },
    "buttons": {
        "collection": "Kolleksiya <span class=\"\\\"><\/span>",
        "colvis": "Sütun baxışı",
        "colvisRestore": "Baxışı əvvəlki vəziyyətinə gətir",
        "copy": "Kopyala",
        "copyKeys": "Cədvəldəki qeydi kopyalamaq üçün CTRL və ya u2318 + C düymələrinə basın. Ləğv etmək üçün bu mesajı vurun və ya ESC düyməsini vurun.",
        "copySuccess": {
            "1": "1 sətir panoya kopyalandı",
            "_": "%ds sətir panoya kopyalandı"
        },
        "copyTitle": "Panoya kopyala",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Bütün sətirlari göstər",
            "_": "%d sətir göstər"
        },
        "pdf": "PDF",
        "print": "Çap Et"
    },
    "decimal": ",",
    "info": "_TOTAL_ Nəticədən _START_ - _END_ Arası Nəticələr",
    "infoThousands": ".",
    "searchBuilder": {
        "add": "Koşul Ekle",
        "button": {
            "0": "Axtarış Yaradıcı",
            "_": "Axtarış Yaradıcı (%d)"
        },
        "clearAll": "Filtrləri Təmizlə",
        "condition": "Şərt",
        "conditions": {
            "date": {
                "after": "Növbəti",
                "before": "Öncəki",
                "between": "Arasında",
                "empty": "Boş",
                "equals": "Bərabərdir",
                "not": "Deyildir",
                "notBetween": "Xaricində",
                "notEmpty": "Dolu"
            },
            "number": {
                "between": "Arasında",
                "empty": "Boş",
                "equals": "Bərabərdir",
                "gt": "Böyükdür",
                "gte": "Böyük bərabərdir",
                "lt": "Kiçikdir",
                "lte": "Kiçik bərabərdir",
                "not": "Deyildir",
                "notBetween": "Xaricində",
                "notEmpty": "Dolu"
            },
            "string": {
                "contains": "Tərkibində",
                "empty": "Boş",
                "endsWith": "İlə bitər",
                "equals": "Bərabərdir",
                "not": "Deyildir",
                "notEmpty": "Dolu",
                "startsWith": "İlə başlayar"
            },
            "array": {
                "equals": "Bərabərdir",
                "empty": "Boş",
                "contains": "Tərkibində",
                "not": "Deyildir",
                "notEmpty": "Dolu",
                "without": "Xaric"
            }
        },
        "data": "Qeyd",
        "deleteTitle": "Filtrləmə qaydasını silin",
        "leftTitle": "Meyarı xaricə çıxarmaq",
        "logicAnd": "və",
        "logicOr": "vəya",
        "rightTitle": "Meyarı içəri al",
        "title": {
            "0": "Axtarış Yaradıcı",
            "_": "Axtarış Yaradıcı (%d)"
        },
        "value": "Değer"
    },
    "searchPanes": {
        "clearMessage": "Hamısını Təmizlə",
        "collapse": {
            "0": "Axtarış Bölməsi",
            "_": "Axtarış Bölməsi (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown}\/{total}",
        "emptyPanes": "Axtarış Bölməsi yoxdur",
        "loadMessage": "Axtarış Bölməsi yüklənir ...",
        "title": "Aktiv filtrlər - %d"
    },
    "select": {
        "cells": {
            "1": "1 hücrə seçildi",
            "_": "%d hücrə seçildi"
        },
        "columns": {
            "1": "1 sütun seçildi",
            "_": "%d sütun seçildi"
        },
        "rows": {
            "1": "1 qeyd seçildi",
            "_": "%d qeyd seçildi"
        }
    },
    "thousands": ".",
    "datetime": {
        "previous": "Öncəki",
        "next": "Növbəti",
        "hours": "Saat",
        "minutes": "Dəqiqə",
        "seconds": "Saniyə",
        "unknown": "Naməlum",
        "amPm": [
            "am",
            "pm"
        ]
    },
    "editor": {
        "close": "Bağla",
        "create": {
            "button": "Təzə",
            "title": "Yeni qeyd yarat",
            "submit": "Qeyd Et"
        },
        "edit": {
            "button": "Redaktə Et",
            "title": "Qeydi Redaktə Et",
            "submit": "Yeniləyin"
        },
        "remove": {
            "button": "Sil",
            "title": "Qeydləri sil",
            "submit": "Sil",
            "confirm": {
                "_": "%d ədəd qeydi silmək istədiyinizə əminsiniz?",
                "1": "Bu qeydi silmək istədiyinizə əminsiniz?"
            }
        },
        "error": {
            "system": "Sistem xətası baş verdi (Ətraflı Məlumat)"
        },
        "multi": {
            "title": "Çox dəyər",
            "info": "Seçilmiş qeydlər bu sahədə fərqli dəyərlər ehtiva edir. Bütün seçilmiş qeydlər üçün bu sahəyə eyni dəyəri təyin etmək üçün buraya vurun; əks halda hər qeyd öz dəyərini saxlayacaqdır.",
            "restore": "Dəyişiklikləri geri qaytarın",
            "noMulti": "Bu sahə qrup şəklində deyil, ayrı-ayrılıqda təşkil edilə bilər."
        }
    },
    "lengthMenu": "Səhifədə _MENU_ nəticə göstər",
    "searchPlaceholder": "Nəyi axtarırsınız?"
};
}));
