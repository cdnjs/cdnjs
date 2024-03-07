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
    "emptyTable": "ਸੂਚੀ ਵਿੱਚ ਕੋਈ ਕਤਾਰ ਉਪਲਬਧ ਨਹੀਂ ਹੈ",
    "info": "_TOTAL_ ਵਿੱਚੋਂ _START_ ਤੋਂ _END_ ਐਂਟਰੀਆਂ ਦਿੱਖ ਰਹੀਆਂ ਹਨ",
    "infoEmpty": "0 ਵਿੱਚੋਂ 0 ਤੋਂ 0 ਕਤਾਰਾਂ ਦਿੱਖ ਰਹੀਆਂ ਹਨ",
    "infoFiltered": "(ਕੁੱਲ _MAX_ ਵਿਚੋਂ ਛਾਂਟੀਆਂ ਗਈਆਂ ਕਤਾਰਾਂ)",
    "infoThousands": ",",
    "lengthMenu": "ਕੁੱਲ _MENU_ ਕਤਾਰਾਂ",
    "loadingRecords": "ਸੂਚੀ ਲੋਡ ਹੋ ਰਹੀ ਹੈ...",
    "processing": "ਕਾਰਵਾਈ ਚੱਲ ਰਹੀ ਹੈ...",
    "search": "ਖੋਜ ਕਰੋ:",
    "zeroRecords": "ਕੋਈ ਕਤਾਰ ਨਹੀਂ ਮਿਲੀ",
    "paginate": {
        "first": "ਪਹਿਲਾ",
        "last": "ਅਖੀਰਲਾ",
        "next": "ਅਗਲਾ",
        "previous": "ਪਿਛਲਾ"
    },
    "aria": {
        "sortAscending": ": ਕਾਲਮ ਨੂੰ ਵੱਧਦੇ ਕ੍ਰਮ ਵਿਚ ਵੇਖੋ",
        "sortDescending": ": ਕਾਲਮ ਨੂੰ ਘਟਦੇ ਕ੍ਰਮ ਵਿਚ ਵੇਖੋ"
    },
    "buttons": {
        "colvis": "ਕਾਲਮ ਦਿੱਖ"
    },
    "datetime": {
        "previous": "ਪਿਛਲਾ",
        "next": "ਅਗਲਾ",
        "hours": "ਘੰਟੇ",
        "minutes": "ਮਿੰਟ",
        "seconds": "ਸਕਿੰਟ",
        "amPm": [
            "ਸਵੇਰੇ",
            "ਸ਼ਾਮ"
        ]
    },
    "editor": {
        "close": "ਬੰਦ"
    }
};
}));
