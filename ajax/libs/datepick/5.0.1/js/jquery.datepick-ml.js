/* http://keith-wood.name/datepick.html
   Malayalam localisation for jQuery Datepicker.
   Saji Nediyanchath (saji89@gmail.com). */
(function($) {
	$.datepick.regionalOptions['ml'] = {
		monthNames: ['ജനുവരി','ഫെബ്രുവരി','മാര്‍ച്ച്','ഏപ്രില്‍','മേയ്','ജൂണ്‍',
		'ജൂലൈ','ആഗസ്റ്റ്','സെപ്റ്റംബര്‍','ഒക്ടോബര്‍','നവംബര്‍','ഡിസംബര്‍'],
		monthNamesShort: ['ജനു', 'ഫെബ്', 'മാര്‍', 'ഏപ്രി', 'മേയ്', 'ജൂണ്‍',
		'ജൂലാ', 'ആഗ', 'സെപ്', 'ഒക്ടോ', 'നവം', 'ഡിസ'],
		dayNames: ['ഞായര്‍', 'തിങ്കള്‍', 'ചൊവ്വ', 'ബുധന്‍', 'വ്യാഴം', 'വെള്ളി', 'ശനി'],
		dayNamesShort: ['ഞായ', 'തിങ്ക', 'ചൊവ്വ', 'ബുധ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'],
		dayNamesMin: ['ഞാ','തി','ചൊ','ബു','വ്യാ','വെ','ശ'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'മുന്നത്തെ', prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: '',
		nextText: 'അടുത്തത് ', nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: '',
		currentText: 'ഇന്ന്', currentStatus: '',
		todayText: 'ഇന്ന്', todayStatus: '',
		clearText: 'X', clearStatus: '',
		closeText: 'ശരി', closeStatus: '',
		yearStatus: '', monthStatus: '',
		weekText: 'ആ', weekStatus: '',
		dayStatus: 'DD d MM', defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions['ml']);
})(jQuery);
