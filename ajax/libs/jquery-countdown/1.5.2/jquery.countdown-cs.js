/* http://keith-wood.name/countdown.html
 * Czech initialisation for the jQuery countdown extension
 * Written by Roman Chlebec (creamd@c64.sk) (2008) */
(function($) {
	$.countdown.regional['cs'] = {
		labels: ['Roků', 'Měsíců', 'Týdnů', 'Dní', 'Hodin', 'Minut', 'Sekund'],
		labels1: ['Rok', 'Měsíc', 'Týden', 'Den', 'Hodina', 'Minuta', 'Sekunda'],
		labels2: ['Roky', 'Měsíce', 'Týdny', 'Dny', 'Hodiny', 'Minuty', 'Sekundy'],
		labels3: ['Roky', 'Měsíce', 'Týdny', 'Dny', 'Hodiny', 'Minuty', 'Sekundy'],
		labels4: ['Roky', 'Měsíce', 'Týdny', 'Dny', 'Hodiny', 'Minuty', 'Sekundy'],
		compactLabels: ['r', 'm', 't', 'd'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['cs']);
})(jQuery);
