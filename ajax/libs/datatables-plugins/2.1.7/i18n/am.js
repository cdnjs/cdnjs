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
    "emptyTable": "ባዶ ሰንጠረዥ",
    "info": "ከጠቅላላው _TOTAL_ ዝርዝሮች ውስጥ ከ _START_ እስከ _END_ ያሉት ዝርዝር",
    "infoEmpty": "ከጠቅላላው 0 ዝርዝሮች ውስጥ ከ 0 እስከ 0 ያሉት ዝርዝር",
    "infoFiltered": "(ከጠቅላላው _MAX_ የተመረጡ ዝርዝሮች)",
    "infoThousands": ",",
    "lengthMenu": "የዝርዝሮች ብዛት _MENU_",
    "loadingRecords": "በማቅረብ ላይ...",
    "processing": "በማቀናበር ላይ...",
    "search": "ፈልግ:",
    "zeroRecords": "ከሚፈለገው ጋር የሚሚሳሰል ዝርዝር አልተገኘም",
    "paginate": {
        "first": "መጀመሪያ",
        "last": "መጨረሻ",
        "next": "ቀጣዩ",
        "previous": "የበፊቱ"
    },
    "aria": {
        "sortAscending": ": ከመጀመሪያ ወደ መጨረሻ(ወጪ) አደራደር",
        "sortDescending": ": ከመጨረሻ ወደ መጀመሪያ(ወራጅ) አደራደር"
    }
};
}));
