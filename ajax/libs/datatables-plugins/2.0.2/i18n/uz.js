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
    "emptyTable": "Ma'lumot yo'q",
    "info": "Umumiy _TOTAL_ yozuvlarlardan _START_ dan _END_ gachasi ko'rsatilmoqda",
    "infoEmpty": "Umumiy 0 yozuvlardan 0 dan 0 gachasi ko'rsatilmoqda",
    "infoFiltered": "(_MAX_ yozuvlardan filtrlandi)",
    "lengthMenu": "_MENU_ ta yozuvlarni ko'rsat",
    "loadingRecords": "Yozuvlar yuklanmoqda...",
    "processing": "Ishlayapman...",
    "search": "Izlash:",
    "zeroRecords": "Ma'lumot yo'q.",
    "paginate": {
        "first": "Birinchi",
        "previous": "Avvalgi",
        "next": "Keyingi",
        "last": "Son'ggi"
    },
    "aria": {
        "sortAscending": ": to'g'ri tartiblash",
        "sortDescending": ": teskari tartiblash"
    }
};
}));
