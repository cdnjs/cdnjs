/* http://keith-wood.name/datepick.html
   Maltese localisation for jQuery Datepicker.
   Written by Chritian Sciberras (uuf6429@gmail.com). */
(function($) {
	$.datepick.regionalOptions['mt'] = {
		monthNames: ['Jannar','Frar','Marzu','April','Mejju','Ġunju',
		'Lulju','Awissu','Settembru','Ottubru','Novembru','Diċembru'],
		monthNamesShort: ['Jan', 'Fra', 'Mar', 'Apr', 'Mej', 'Ġun',
		'Lul', 'Awi', 'Set', 'Ott', 'Nov', 'Diċ'],
		dayNames: ['Il-Ħadd', 'It-Tnejn', 'It-Tlieta', 'L-Erbgħa', 'Il-Ħamis', 'Il-Ġimgħa', 'Is-Sibt'],
		dayNamesShort: ['Ħad', 'Tne', 'Tli', 'Erb', 'Ħam', 'Ġim', 'Sib'],
		dayNamesMin: ['Ħ','T','T','E','Ħ','Ġ','S'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
 		renderer: $.datepick.defaultRenderer,
		prevText: 'Ta Qabel', prevStatus: 'Ix-xahar ta qabel',
 		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'Is-sena ta qabel',
 		nextText: 'Li Jmiss', nextStatus: 'Ix-xahar li jmiss',
 		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'Is-sena li jmiss',
 		currentText: 'Illum', currentStatus: 'Ix-xahar ta llum',
 		todayText: 'Illum', todayStatus: 'Uri ix-xahar ta llum',
 		clearText: 'Ħassar', clearStatus: 'Ħassar id-data',
 		closeText: 'Lest', closeStatus: 'Għalaq mingħajr tibdiliet',
 		yearStatus: 'Uri sena differenti', monthStatus: 'Uri xahar differenti',
		weekText: 'Ġm', weekStatus: 'Il-Ġimgħa fis-sena',
		dayStatus: 'Għazel DD, M d', defaultStatus: 'Għazel data',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['mt']);
})(jQuery);
