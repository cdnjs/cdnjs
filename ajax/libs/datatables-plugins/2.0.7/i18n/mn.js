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
    "emptyTable": "Хүснэгт хоосон байна",
    "info": "Нийт _TOTAL_ бичлэгээс _START_ - _END_ харуулж байна",
    "infoEmpty": "Тохирох үр дүн алга",
    "infoFiltered": "(нийт _MAX_ бичлэгээс шүүв)",
    "infoThousands": ",",
    "lengthMenu": "Дэлгэцэд _MENU_ бичлэг харуулна",
    "loadingRecords": "Ачааллаж байна...",
    "processing": "Боловсруулж байна...",
    "search": "Хайлт:",
    "zeroRecords": "Тохирох бичлэг олдсонгүй",
    "paginate": {
        "first": "Эхнийх",
        "last": "Сүүлийнх",
        "next": "Дараах",
        "previous": "Өмнөх"
    },
    "aria": {
        "sortAscending": ": цагаан толгойн дарааллаар эрэмбэлэх",
        "sortDescending": ": цагаан толгойн эсрэг дарааллаар эрэмбэлэх"
    }
};
}));
