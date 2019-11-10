/* http://keith-wood.name/countdown.html
   Estonian initialisation for the jQuery countdown extension
   Written by Helmer <helmer{at}city.ee> */
(function($) {
    $.countdown.regional['et'] = {
        labels: ['Aastat', 'Kuud', 'Nädalat', 'Päeva', 'Tundi', 'Minutit', 'Sekundit'],
        labels1: ['Aasta', 'Kuu', 'Nädal', 'Päev', 'Tund', 'Minut', 'Sekund'],
        compactLabels: ['a', 'k', 'n', 'p'],
        whichLabels: null,
        timeSeparator: ':', isRTL: false};
    $.countdown.setDefaults($.countdown.regional['et']);
})(jQuery);
