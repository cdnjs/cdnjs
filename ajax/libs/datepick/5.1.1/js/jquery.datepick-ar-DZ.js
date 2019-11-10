/* http://keith-wood.name/datepick.html
   Algerian (and Tunisian) Arabic localisation for jQuery Datepicker.
   Mohamed Cherif BOUCHELAGHEM -- cherifbouchelaghem@yahoo.fr */
(function($) {
	'use strict';
	$.datepick.regionalOptions['ar-DZ'] = {
		monthNames: ['جانفي','فيفري','مارس','أفريل','ماي','جوان',
		'جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'],
		monthNamesShort: ['1','2','3','4','5','6',
		'7','8','9','10','11','12'],
		dayNames: ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
		dayNamesShort: ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
		dayNamesMin: ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 6,
		renderer: $.datepick.defaultRenderer,
		prevText: '&#x3c;السابق',
		prevStatus: 'عرض الشهر السابق',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'التالي&#x3e;',
		nextStatus: 'عرض الشهر القادم',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'اليوم',
		currentStatus: 'عرض الشهر الحالي',
		todayText: 'اليوم',
		todayStatus: 'عرض الشهر الحالي',
		clearText: 'مسح',
		clearStatus: 'امسح التاريخ الحالي',
		closeText: 'إغلاق',
		closeStatus: 'إغلاق بدون حفظ',
		yearStatus: 'عرض سنة آخرى',
		monthStatus: 'عرض شهر آخر',
		weekText: 'أسبوع',
		weekStatus: 'أسبوع السنة',
		dayStatus: 'اختر D, M d',
		defaultStatus: 'اختر يوم',
		isRTL: true
	};
	$.datepick.setDefaults($.datepick.regionalOptions['ar-DZ']);
})(jQuery);
