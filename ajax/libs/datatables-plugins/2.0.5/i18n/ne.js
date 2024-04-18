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
    "emptyTable": "टेबलमा डाटा उपलब्ध भएन",
    "info": "_TOTAL_ रेकर्ड मध्य _START_ देखि _END_ रेकर्ड देखाउंदै",
    "infoEmpty": "0 मध्य 0 देखि 0 रेकर्ड देखाउंदै",
    "infoFiltered": "(_MAX_ कुल रेकर्डबाट छनौट गरिएको)",
    "infoThousands": ",",
    "lengthMenu": " _MENU_ रेकर्ड देखाउने ",
    "loadingRecords": "लोड हुँदैछ...",
    "processing": "प्रगति हुदैंछ ...",
    "search": "खोजी:",
    "zeroRecords": "कुनै मिल्ने रेकर्ड फेला परेन",
    "paginate": {
        "first": "प्रथम",
        "previous": "पछिल्लो",
        "next": "अघिल्लो",
        "last": "अन्तिम"
    },
    "aria": {
        "sortAscending": ": अगाडिबाट अक्षरात्मक रूपमा क्रमबद्ध गराउने",
        "sortDescending": ": पछाडिबाट अक्षरात्मक रूपमा क्रमबद्ध गराउने"
    }
};
}));
