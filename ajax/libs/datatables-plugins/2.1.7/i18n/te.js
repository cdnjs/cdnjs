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
    "infoThousands": ",",
    "search": "వెతుకు:",
    "paginate": {
        "first": "మొదటి",
        "last": "చివరి",
        "next": "తర్వాత",
        "previous": "మునుపటి"
    },
    "aria": {
        "sortAscending": ": నిలువరుసను ఆరోహణ క్రమం అమర్చండి",
        "sortDescending": ": నిలువరుసను అవరోహణ క్రమం అమర్చండి"
    },
    "autoFill": {
        "cancel": "రద్దు చేయండి",
        "fill": "అన్ని గడులు <i>%d<\/i> తో నింపండి",
        "fillHorizontal": "అడ్డముగా గడులను నింపండి",
        "fillVertical": "నిలువుగా గడులను నింపండి"
    },
    "emptyTable": "పట్టికలో సమాచారం లేదు.",
    "info": "మొత్తం _TOTAL_ నమోదుల లో _START_ నుండి _END_ వరకు చూపిస్తున్నాం",
    "infoEmpty": "0 నమోదుల లో 0 నుండి 0 వరకు చూపిస్తున్నాం",
    "infoFiltered": " (_MAX_ నమోదుల లో నుండి వడపోసినవి)",
    "lengthMenu": " _MENU_ నమోదులు చూపించు",
    "loadingRecords": "సమాచారం వస్తున్నది...",
    "processing": "ప్రక్రియలో ఉన్నది...",
    "zeroRecords": "సరిపోలిన నమోదులు లేవు"
};
}));
