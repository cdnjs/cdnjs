/* http://keith-wood.name/datepick.html
   Georgian localisation for jQuery Datepicker.
   Andrei Gorbushkin. */
(function($) {
	$.datepick.regional['ka'] = {
		monthNames: ['იანვარი','თებერვალი','მარტი','აპრილი','მაისი','ივნისი',
		'ივლისი','აგვისტო','სექტემბერი','ოქტომბერი','ნოემბერი','დეკემბერი'],
		monthNamesShort: ['იან', 'თებ', 'მარ', 'აპრ', 'მაისი', 'ივნ',
		'ივლ', 'აგვ', 'სექ', 'ოქტ', 'ნოე', 'დეკ'],
		dayNames: ['კვირა', 'ორშაბათი', 'სამშაბათი', 'ოთხშაბათი', 'ხუთშაბათი', 'პარასკევი', 'შაბათი'],
		dayNamesShort: ['კვ', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ'],
		dayNamesMin: ['კვ','ორ','სმ','ოთ', 'ხშ', 'პრ','შბ'],
		dateFormat: 'dd/mm/yyyy', firstDay: 1,
		renderer: $.datepick.defaultRenderer,
		prevText: '<უკან', prevStatus: 'წინა თვე',
		prevJumpText: '&#x3c;&#x3c;', prevJumpStatus: 'წინა წელი',
		nextText: 'წინ>', nextStatus: 'შემდეგი თვე',
		nextJumpText: '&#x3e;&#x3e;', nextJumpStatus: 'შემდეგი წელი',
		currentText: 'მიმდინარე', currentStatus: 'მიმდინარე თვე',
		todayText: 'დღეს', todayStatus: 'მიმდინარე დღე',
		clearText: 'გასუფთავება', clearStatus: 'მიმდინარე თარიღის წაშლა',
		closeText: 'არის', closeStatus: 'დახურვა უცვლილებოდ',
		yearStatus: 'სხვა წელი', monthStatus: 'სხვა თვე',
		weekText: 'კვ', weekStatus: 'წლის კვირა',
		dayStatus: 'აირჩიეთ DD, M d', defaultStatus: 'აიღჩიეთ თარიღი',
		isRTL: false
	};
	$.datepick.setDefaults($.datepick.regional['ka']);
})(jQuery);
