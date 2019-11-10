/* http://keith-wood.name/datepick.html
   Gujarati (ગુજરાતી) localisation for jQuery Datepicker.
   Naymesh Mistry (naymesh@yahoo.com). */
(function($) {
	$.datepick.regional['gu'] = {
		monthNames: ['જાન્યુઆરી','ફેબ્રુઆરી','માર્ચ','એપ્રિલ','મે','જૂન',
		'જુલાઈ','ઑગસ્ટ','સપ્ટેમ્બર','ઑક્ટોબર','નવેમ્બર','ડિસેમ્બર'],
		monthNamesShort: ['જાન્યુ','ફેબ્રુ','માર્ચ','એપ્રિલ','મે','જૂન',
		'જુલાઈ','ઑગસ્ટ','સપ્ટે','ઑક્ટો','નવે','ડિસે'],
		dayNames: ['રવિવાર','સોમવાર','મંગળવાર','બુધવાર','ગુરુવાર','શુક્રવાર','શનિવાર'],
		dayNamesShort: ['રવિ','સોમ','મંગળ','બુધ','ગુરુ','શુક્ર','શનિ'],
		dayNamesMin: ['ર','સો','મં','બુ','ગુ','શુ','શ'],
		dateFormat: 'dd-M-yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;પાછળ', prevStatus: 'પાછલો મહિનો બતાવો',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'પાછળ',
		nextText: 'આગળ&#x3e;', nextStatus: 'આગલો મહિનો બતાવો',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'આગળ',
		currentText: 'આજે', currentStatus: 'આજનો દિવસ બતાવો',
		todayText: 'આજે', todayStatus: 'આજનો દિવસ',
		clearText: 'ભૂંસો', clearStatus: 'હાલ પસંદ કરેલી તારીખ ભૂંસો',
		closeText: 'બંધ કરો', closeStatus: 'તારીખ પસંદ કર્યા વગર બંધ કરો',
		yearStatus: 'જુદુ વર્ષ બતાવો', monthStatus: 'જુદો મહિનો બતાવો',
		weekText: 'અઠવાડિયું', weekStatus: 'અઠવાડિયું',
		dayStatus: 'અઠવાડિયાનો પહેલો દિવસ પસંદ કરો', defaultStatus: 'તારીખ પસંદ કરો',		
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['gu']);
})(jQuery);
