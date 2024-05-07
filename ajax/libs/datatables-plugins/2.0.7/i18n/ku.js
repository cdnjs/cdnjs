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
    "emptyTable": "هیچ تۆمارێک نەدۆزرایەوە",
    "processing": "تکایە چاوەرێکە...",
    "lengthMenu": "نیشانبدە _MENU_ تۆمارەکان",
    "zeroRecords": "هیچ تۆمارێک نەدۆزرایەوە",
    "info": "نیشاندانی _START_ لە _END_ کۆی _TOTAL_ تۆمار",
    "infoEmpty": "نیشاندانی 0 لە 0 لە کۆی 0 تۆمار",
    "infoFiltered": "(پاڵێوراوە لە کۆی _MAX_ تۆمار)",
    "search": "گەران:",
    "paginate": {
        "first": "یەکەم",
        "last": "کۆتایی",
        "next": "دواتر",
        "previous": "پێشتر"
    },
    "aria": {
        "sortAscending": ": چاڵاککردن بۆ ریزکردنی سەر بەرەو ژوور",
        "sortDescending": ": چاڵاککردن بۆ ریزکردنی سەر بەرەو خوار"
    },
    "autoFill": {
        "cancel": "پاشگەزبوونەوە",
        "fill": "پڕكردنەوە",
        "fillHorizontal": "پڕكردنەوەى خانەكان بە شێوەى ئاسۆیی",
        "fillVertical": "پڕكردنەوەى خانەكان بە شێوەى ستونى",
        "info": "زانیارى"
    },
    "buttons": {
        "copy": "لەبەرگرتنەوە",
        "copyTitle": "لەبەرگرتنەوە بۆ كلیپبۆرد",
        "excel": "ئێكزڵ",
        "print": "چاپكردن",
        "collection": "کۆکردنەوە",
        "colvis": "ستوونەکان",
        "colvisRestore": "گەڕاندنەوەی ستوونەکان",
        "copyKeys": "لەبەرگرتنەوە",
        "csv": "csv",
        "pdf": "فۆرماتێکی pdf"
    },
    "loadingRecords": "وەرگرتنى تۆمارەکان...",
    "thousands": "هەزاران",
    "datetime": {
        "previous": "پێشتر",
        "next": "دواتر",
        "hours": "كاتژمێر",
        "minutes": "دەقیقە",
        "seconds": "سانیە",
        "unknown": "نەزانراو",
        "weekdays": [
            "یەك شەممە",
            "دوو شەممە",
            "سێ شەممە",
            "چوار شەممە",
            "پێنج شەممە",
            "هەینى",
            "شەممە"
        ],
        "months": [
            "ژانواری",
            "برواری",
            "مارجه",
            "ئاپرل",
            "مای",
            "ژونه",
            "ژولی",
            "ئائوگوست",
            "سه‌پته‌مبه‌ر",
            "ئۆجتۆبه‌ر",
            "نۆڤه‌مبه‌ر",
            "ده‌جه‌مبه‌ر"
        ]
    },
    "editor": {
        "close": "داخستن"
    },
    "decimal": "دەهەمی",
    "infoThousands": ",",
    "searchPlaceholder": "شوێنگرەوەی گەڕان"
};
}));
