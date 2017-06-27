/* http://keith-wood.name/datepick.html
   Hindi INDIA localisation for jQuery Datepicker.
   Written by Pawan Kumar Singh. */
(function($) {
	'use strict';
	$.datepick.regionalOptions['hi-IN'] = {
		monthNames: ['जनवरी',' फरवरी','मार्च','अप्रैल','मई','जून',
		'जुलाई','अगस्त','सितम्बर','अक्टूबर','नवम्बर','दिसम्बर'],
		monthNamesShort: ['जन','फर','मार्च','अप्रै','मई','जून',
		'जुलाई','अग','सित','अक्टू','नव','दिस'],
		dayNames: ['रविवार','सोमवार','मंगलवार','बुधवार','गुरुवार','शुक्रवार','शनिवार'],
		dayNamesShort: ['रवि','सोम','मंगल','बुध','गुरु','शुक्र','शनि'],
		dayNamesMin: ['र','सो','मं','बु','गु','शु','श'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'पिछला',
		prevStatus: 'पिछला महीना देखें',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: 'पिछला वर्ष देखें',
		nextText: 'अगला',
		nextStatus: 'अगला महीना देखें',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: 'अगला वर्ष देखें',
		currentText: 'वर्तमान',
		currentStatus: 'वर्तमान महीना देखें',
		todayText: 'आज',
		todayStatus: 'वर्तमान दिन देखें',
		clearText: 'साफ',
		clearStatus: 'वर्तमान दिनांक मिटाए',
		closeText: 'समाप्त',
		closeStatus: 'बदलाव के बिना बंद',
		yearStatus: 'एक अलग वर्ष का चयन करें',
		monthStatus: 'एक अलग महीने का चयन करें',
		weekText: 'Wk',
		weekStatus: 'वर्ष का सप्ताह',
		dayStatus: 'चुने DD, M d',
		defaultStatus: 'एक तिथि का चयन करें',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['hi-IN']);
})(jQuery);
