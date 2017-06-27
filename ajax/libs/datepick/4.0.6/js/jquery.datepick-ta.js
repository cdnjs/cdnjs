/* http://keith-wood.name/datepick.html
   Tamil localisation for jQuery Datepicker.
   Written by S A Sureshkumar (saskumar@live.com). */
(function($) {
	$.datepick.regional['ta'] = {
		monthNames: ['தை','மாசி','பங்குனி','சித்திரை','வைகாசி','ஆனி',
		'ஆடி','ஆவணி','புரட்டாசி','ஐப்பசி','கார்த்திகை','மார்கழி'],
		monthNamesShort: ['தை','மாசி','பங்','சித்','வைகா','ஆனி',
		'ஆடி','ஆவ','புர','ஐப்','கார்','மார்'],
		dayNames: ['ஞாயிற்றுக்கிழமை','திங்கட்கிழமை','செவ்வாய்க்கிழமை','புதன்கிழமை','வியாழக்கிழமை','வெள்ளிக்கிழமை','சனிக்கிழமை'],
		dayNamesShort: ['ஞாயிறு','திங்கள்','செவ்வாய்','புதன்','வியாழன்','வெள்ளி','சனி'],
		dayNamesMin: ['ஞா','தி','செ','பு','வி','வெ','ச'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'முன்னையது',  prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'அடுத்தது', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'இன்று', currentStatus: '',
		todayText: 'இன்று', todayStatus: '',
		clearText: 'அழி', clearStatus: '',
		closeText: 'மூடு', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'Wk', weekStatus: '',
		dayStatus: 'D, M d', defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['ta']);
})(jQuery);
