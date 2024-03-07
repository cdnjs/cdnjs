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
    "emptyTable": "Տվյալները բացակայում են",
    "processing": "Կատարվում է...",
    "infoThousands": ",",
    "lengthMenu": "Ցուցադրել _MENU_ արդյունքներ մեկ էջում",
    "loadingRecords": "Բեռնվում է ...",
    "zeroRecords": "Հարցմանը համապատասխանող արդյունքներ չկան",
    "info": "Ցուցադրված են _START_-ից _END_ արդյունքները ընդհանուր _TOTAL_-ից",
    "infoEmpty": "Արդյունքներ գտնված չեն",
    "infoFiltered": "(ֆիլտրվել է ընդհանուր _MAX_ արդյունքներից)",
    "search": "Փնտրել",
    "paginate": {
        "first": "Առաջին էջ",
        "previous": "Նախորդ էջ",
        "next": "Հաջորդ էջ",
        "last": "Վերջին էջ"
    },
    "aria": {
        "sortAscending": ": ակտիվացրեք աճման կարգով դասավորելու համար",
        "sortDescending": ": ակտիվացրեք նվազման կարգով դասավորելու համար"
    }
};
}));
