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
    "processing": "Пачакайце...",
    "lengthMenu": "Паказваць _MENU_ запісаў",
    "zeroRecords": "Запісы адсутнічаюць.",
    "info": "Запісы з _START_ па _END_ з _TOTAL_ запісаў",
    "infoEmpty": "Запісы з 0 па 0 з 0 запісаў",
    "infoFiltered": "(адфільтравана з _MAX_ запісаў)",
    "search": "Пошук:",
    "paginate": {
        "first": "Першая",
        "previous": "Папярэдняя",
        "next": "Наступная",
        "last": "Апошняя"
    },
    "aria": {
        "sortAscending": ": актываваць для сартавання слупка па ўзрастанні",
        "sortDescending": ": актываваць для сартавання слупка па змяншэнні"
    }
};
}));
