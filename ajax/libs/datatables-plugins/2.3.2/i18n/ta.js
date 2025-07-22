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
    "emptyTable": "அட்டவணையில் தரவு கிடைக்கவில்லை",
    "info": "உள்ளீடுகளை் _START_ முதல _END_ உள்ள _TOTAL_ காட்டும்",
    "infoEmpty": "0 உள்ளீடுகளை 0 0 காட்டும்",
    "infoFiltered": "(_MAX_ மொத்த உள்ளீடுகளை இருந்து வடிகட்டி)",
    "infoThousands": ",",
    "lengthMenu": "_MENU_ காண்பி",
    "loadingRecords": "ஏற்றுகிறது ...",
    "processing": "செயலாக்க ...",
    "zeroRecords": "பொருத்தமான பதிவுகள் இல்லை",
    "paginate": {
        "first": "முதல்",
        "last": "இறுதி",
        "next": "அடுத்து",
        "previous": "முந்தைய"
    },
    "aria": {
        "sortAscending": ": நிரலை ஏறுவரிசையில் வரிசைப்படுத்த செயல்படுத்த",
        "sortDescending": ": நிரலை இறங்கு வரிசைப்படுத்த செயல்படுத்த"
    },
    "search": "தேடு",
    "autoFill": {
        "cancel": "ரத்து செய்",
        "fill": "சிஸ்டம் ஆர்க்கிடெக்ட் மூலம் அனைத்து செல்களையும் நிரப்பவும்",
        "fillHorizontal": "செல்களை கிடைமட்டமாக நிரப்பவும்",
        "fillVertical": "செல்களை செங்குத்தாக நிரப்பவும்",
        "info": "தகவல்"
    },
    "buttons": {
        "collection": "சேகரிப்பு",
        "colvis": "நெடுவரிசைத் தெரிவுநிலை",
        "colvisRestore": "நெடுவரிசை மீட்டமை",
        "copy": "நகல்",
        "copyKeys": "அட்டவணைத் தரவை உங்கள் கணினி கிளிப்போர்டுக்கு நகலெடுக்க &lt;i&gt; ctrl அல்லது &lt;i&gt;u2318&lt;\/i&gt; + &lt;i&gt;C&lt;\/i&gt; ctrl+C ஐ அழுத்தவும். &lt;br&gt;&lt;br&gt;  ரத்துசெய்ய, இந்தச் செய்தியைக் கிளிக் செய்யவும் அல்லது எஸ்கேப் என்பதை அழுத்தவும்.",
        "copyTitle": "கிளிப்போர்டுக்கு நகலெடுக்கவும்",
        "csv": "csv",
        "excel": "Excel",
        "pdf": "PDF",
        "print": "print"
    },
    "decimal": "தசம",
    "datetime": {
        "previous": "முந்தைய",
        "next": "அடுத்தது",
        "hours": "மணி",
        "minutes": "நிமிடம்",
        "seconds": "வினாடிகள்",
        "unknown": "-",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "ஞாயிறு",
            "திங்கள்",
            "செவ்வாய்",
            "புதன்",
            "வியாழன்",
            "வெள்ளி",
            "சனி"
        ]
    }
};
}));
