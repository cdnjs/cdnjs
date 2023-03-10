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
    "emptyTable": "වගුවේ දත්ත කිසිවක් නොමැත",
    "info": "_TOTAL_ න් _START_ සිට _END_ දක්වා",
    "infoEmpty": "0 න් 0 සිට 0 දක්වා",
    "infoFiltered": "(_MAX_ න් තෝරාගත් )",
    "infoThousands": ",",
    "lengthMenu": "_MENU_ ක් පෙන්වන්න",
    "loadingRecords": "පූරණය වෙමින් පවතී...",
    "processing": "සැකසෙමින් පවතී...",
    "search": "සොයන්න :",
    "zeroRecords": "ගැලපෙන වාර්තා නොමැත.",
    "paginate": {
        "first": "පළමු",
        "last": "අන්තිම",
        "next": "ඊළග",
        "previous": "පසුගිය"
    },
    "aria": {
        "sortAscending": ": තීරුව ආරෝහනව තෝරන්න",
        "sortDescending": ": තීරුව අවරෝහනව තෝරන්න"
    }
};
}));
