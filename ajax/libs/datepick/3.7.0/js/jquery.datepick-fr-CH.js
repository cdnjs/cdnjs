/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Martin Voelkle (martin.voelkle@e-tc.ch). */
(function($) {
	$.datepick.regional['fr-CH'] =
		$.extend({}, $.datepick.regional['fr'], {dateFormat: 'dd.mm.yy'});
	$.datepick.setDefaults($.datepick.regional['fr-CH']);
})(jQuery);
