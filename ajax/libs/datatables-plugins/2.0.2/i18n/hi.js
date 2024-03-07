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
    "processing": "प्रगति पे हैं ...",
    "lengthMenu": " _MENU_ प्रविष्टियां दिखाएं ",
    "zeroRecords": "रिकॉर्ड्स का मेल नहीं मिला",
    "info": "_START_ to _END_ of _TOTAL_ प्रविष्टियां दिखा रहे हैं",
    "infoEmpty": "0 में से 0 से 0 प्रविष्टियां दिखा रहे हैं",
    "infoFiltered": "(_MAX_ कुल प्रविष्टियों में से छठा हुआ)",
    "search": "खोजें:",
    "paginate": {
        "first": "प्रथम",
        "previous": "पिछला",
        "next": "अगला",
        "last": "अंतिम"
    },
    "emptyTable": "तालिका में आंकड़े उपलब्ध नहीं है",
    "aria": {
        "sortAscending": "आरोही क्रम",
        "sortDescending": "अवरोही क्रम"
    },
    "autoFill": {
        "cancel": "रद्द करें",
        "fill": "भरें",
        "fillHorizontal": "क्षैतिज भरें",
        "fillVertical": "लंबवत भरें",
        "info": "जानकारी"
    },
    "buttons": {
        "collection": "संग्रह",
        "colvis": "स्तंभ दृश्यता",
        "colvisRestore": "दृश्यता बहाल करें",
        "copy": "प्रतिलिपि",
        "copyTitle": "शीर्षक प्रतिलिपि",
        "csv": "सीएसवी",
        "excel": "एक्सेल",
        "pdf": "पीडीएफ",
        "print": "छपाई"
    },
    "thousands": "हज़ार",
    "decimal": "दशमलव",
    "searchBuilder": {
        "add": "जोड़ना",
        "clearAll": "सभी साफ करें",
        "condition": "शर्त",
        "data": "जानकारी",
        "leftTitle": "बायां शीर्षक",
        "rightTitle": "सही शीर्षक",
        "value": "कीमत"
    },
    "searchPanes": {
        "count": "गिनती करना",
        "title": "शीर्षक",
        "showMessage": "संदेश दिखाओ"
    },
    "datetime": {
        "previous": "पहले का",
        "next": "अगला",
        "hours": "घंटे",
        "minutes": "मिनट",
        "seconds": "सेकंड"
    },
    "editor": {
        "error": {
            "system": "त्रुटि प्रणाली"
        },
        "multi": {
            "title": "बहु शीर्षक"
        }
    },
    "loadingRecords": "प्रगति पे हैं ...",
    "searchPlaceholder": "खोजें ..."
};
}));
