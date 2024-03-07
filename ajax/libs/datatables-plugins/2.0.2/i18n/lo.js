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
    "emptyTable": "ບໍ່ພົບຂໍ້ມູນໃນຕາຕະລາງ",
    "info": "ສະແດງ _START_ ເຖິງ _END_ ຈາກ _TOTAL_ ແຖວ",
    "infoEmpty": "ສະແດງ 0 ເຖິງ 0 ຈາກ 0 ແຖວ",
    "infoFiltered": "(ກັ່ນຕອງຂໍ້ມູນ _MAX_ ທຸກແຖວ)",
    "infoThousands": ",",
    "lengthMenu": "ສະແດງ _MENU_ ແຖວ",
    "loadingRecords": "ກຳລັງໂຫຼດຂໍ້ມູນ...",
    "processing": "ກຳລັງດຳເນີນການ...",
    "search": "ຄົ້ນຫາ: ",
    "zeroRecords": "ບໍ່ພົບຂໍ້ມູນ",
    "paginate": {
        "first": "ໜ້າທຳອິດ",
        "previous": "ກ່ອນໜ້ານີ້",
        "next": "ໜ້າຕໍ່ໄປ",
        "last": "ໜ້າສຸດທ້າຍ"
    },
    "aria": {
        "sortAscending": ": ເປີດໃຊ້ການຈັດລຽງຂໍ້ມູນແຕ່ນ້ອຍຫາໃຫຍ່",
        "sortDescending": ": ເປີດໃຊ້ການຈັດລຽງຂໍ້ມູນແຕ່ໃຫຍ່ຫານ້ອຍ"
    }
};
}));
