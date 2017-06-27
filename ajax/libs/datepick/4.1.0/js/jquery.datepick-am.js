/* http://keith-wood.name/datepick.html
   Amharic (አማርኛ) localisation for jQuery datepicker.
   Leyu Sisay. */
(function($) {
	$.datepick.regional['am'] = {
		monthNames: ['ጃንዋሪ','ፈብርዋሪ','ማርች','አፕሪል','ሜይ','ጁን',
		'ጁላይ','ኦገስት','ሴፕቴምበር','ኦክቶበር','ኖቬምበር','ዲሴምበር'],
		monthNamesShort: ['ጃንዋ', 'ፈብር', 'ማርች', 'አፕሪ', 'ሜይ', 'ጁን',
		'ጁላይ', 'ኦገስ', 'ሴፕቴ', 'ኦክቶ', 'ኖቬም', 'ዲሴም'],
		dayNames: ['ሰንዴይ', 'መንዴይ', 'ትዩስዴይ', 'ዌንስዴይ', 'ተርሰዴይ', 'ፍራይዴይ', 'ሳተርዴይ'],
		dayNamesShort: ['ሰንዴ', 'መንዴ', 'ትዩስ', 'ዌንስ', 'ተርሰ', 'ፍራይ', 'ሳተር'],
		dayNamesMin: ['ሰን', 'መን', 'ትዩ', 'ዌን', 'ተር', 'ፍራ', 'ሳተ'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'ያለፈ', prevStatus: 'ያለፈውን ወር አሳይ',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'ያለፈውን ዓመት አሳይ',
		nextText: 'ቀጣይ', nextStatus: 'ቀጣዩን ወር አሳይ',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'ቀጣዩን ዓመት አሳይ',
		currentText: 'አሁን', currentStatus: 'የአሁኑን ወር አሳይ',
		todayText: 'ዛሬ', todayStatus: 'የዛሬን ወር አሳይ',
		clearText: 'አጥፋ', clearStatus: 'የተመረጠውን ቀን አጥፋ',
		closeText: 'ዝጋ', closeStatus: 'የቀን መምረጫውን ዝጋ',
		yearStatus: 'ዓመቱን ቀይር', monthStatus: 'ወሩን ቀይር',
		weekText: 'ሳም', weekStatus: 'የዓመቱ ሳምንት ',
		dayStatus: 'DD, M d, yyyy ምረጥ', defaultStatus: 'ቀን ምረጥ',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['am']);
})(jQuery);
