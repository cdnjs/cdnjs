/* http://keith-wood.name/datepick.html
   Khmer initialisation for jQuery Datepicker.
   Written by Sovichet Tep (sovichet.tep@gmail.com). */
(function($){
	'use strict';
	$.datepick.regionalOptions.km = {
		monthNames: ['ខែ​មករា','ខែ​កុម្ភៈ','ខែ​មិនា','ខែ​មេសា','ខែ​ឧសភា','ខែ​មិថុនា',
		'ខែ​កក្កដា','ខែ​សីហា','ខែ​កញ្ញា','ខែ​តុលា','ខែ​វិច្ឆិកា','ខែ​ធ្នូ'],
		monthNamesShort: ['មក','កុ','មិនា','មេ','ឧស','មិថុ',
		'កក្ក','សី','កញ្ញា','តុលា','វិច្ឆិ','ធ្នូ'],
		dayNames: ['ថ្ងៃ​អាទិត្យ','ថ្ងៃ​ចន្ទ','ថ្ងៃ​អង្គារ','ថ្ងៃ​ពុធ','ថ្ងៃ​ព្រហស្បត្តិ៍','ថ្ងៃ​សុក្រ','ថ្ងៃ​សៅរ៍'],
		dayNamesShort: ['អា','ចន្ទ','អង្គ','ពុធ','ព្រហ','សុ','សៅរ៍'],
		dayNamesMin: ['អា','ច','អ','ពុ','ព្រ','សុ','ស'],
		dateFormat: 'dd/mm/yyyy',
		firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: 'ថយ​ក្រោយ',
		prevStatus: '',
		prevJumpText: '&#x3c;&#x3c;',
		prevJumpStatus: '',
		nextText: 'ទៅ​មុខ',
		nextStatus: '',
		nextJumpText: '&#x3e;&#x3e;',
		nextJumpStatus: '',
		currentText: 'ថ្ងៃ​នេះ',
		currentStatus: '',
		todayText: 'ថ្ងៃ​នេះ',
		todayStatus: '',
		clearText: 'X',
		clearStatus: '',
		closeText: 'រួច​រាល់',
		closeStatus: '',
		yearStatus: '',
		monthStatus: '',
		weekText: 'Wk',
		weekStatus: '',
		dayStatus: 'DD d MM',
		defaultStatus: '',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regionalOptions.km);
})(jQuery);
