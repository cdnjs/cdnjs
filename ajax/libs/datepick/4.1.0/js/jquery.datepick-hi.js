/* http://keith-wood.name/datepick.html
   English Hindi localisation for jQuery Datepicker.
   Written by Tirumal Rao of designphilic.com. */
(function($) {
	$.datepick.regional['hi'] = {
		monthNames: ['जनवरी','फरवरी','मार्च','अप्रैल','मई','जून', 'जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'],
		monthNamesShort: ['जन', 'फ़र.', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई','अगस्त','सितंबर','अक्टूबर','नवंबर','दिसंबर'],
		dayNames: ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'बृहस्पतिवार', 'शुक्रवार', 'शनिवार'],
		dayNamesShort: ['रवि', 'सोम', 'मंगल', 'बुध', 'बृहस्पत', 'शुक्र', 'शनि'],
		dayNamesMin: ['रवि', 'सोम', 'मंगल', 'बुध', 'बृहस्पत', 'शुक्र', 'शनि'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'पिछला', prevStatus: 'पिछले महीने',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'पिछले वर्ष',
		nextText: 'अगला', nextStatus: 'अगले महीने',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'अगले साल',
		currentText: 'वर्तमान', currentStatus: 'चालू माह',
		todayText: 'आज', todayStatus: 'आजका महीना',
		clearText: 'साफ़', clearStatus: 'वर्तमान दिनांक मिटा',
		closeText: 'ठीक है', closeStatus: 'बदलाव के बिना बंद',
		yearStatus: 'एक अलग वर्ष दिखाएँ', monthStatus: 'दिखाएँ किसी अन्य महीने के',
		weekText: 'Wk', weekStatus: 'Week of the year',
		dayStatus: 'चयन DD, M d', defaultStatus: 'एक तिथि का चयन करें',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['hi']);
})(jQuery);