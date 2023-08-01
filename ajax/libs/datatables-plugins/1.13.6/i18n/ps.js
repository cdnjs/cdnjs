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
    "emptyTable": "جدول خالي دی",
    "info": "د _START_ څخه تر _END_ پوري، له ټولو _TOTAL_ څخه",
    "infoEmpty": "د 0 څخه تر 0 پوري، له ټولو 0 څخه",
    "infoFiltered": "(لټول سوي له ټولو _MAX_ څخه)",
    "infoThousands": ",",
    "lengthMenu": "_MENU_ کتاره وښايه",
    "loadingRecords": "منتظر اوسئ...",
    "processing": "منتظر اوسئ...",
    "search": "لټون:",
    "zeroRecords": "د لټون مطابق م؀�لومات و نه موندل سول",
    "paginate": {
        "first": "لومړۍ",
        "last": "وروستۍ",
        "next": "بله",
        "previous": "شاته"
    },
    "aria": {
        "sortAscending": ": په صعودي ډول مرتبول",
        "sortDescending": ": په نزولي ډول مرتبول"
    }
};
}));
