// Serbian (Cyrillic)

jQuery.extend( jQuery.fn.pickadate.defaults, {
    monthsFull: [ 'јануар','фебруар','март','април','мај','јун','јул','август','септембар','октобар','новембар','децембар' ],
    monthsShort: [ 'јан.','феб.','март','апр.','мај','јун','јул','авг.','септ.','окт.','нов.','дец.' ],
    weekdaysFull: [ 'недеља', 'понедељак', 'уторак', 'среда', 'четвртак', 'петак', 'субота' ],
    weekdaysShort: [ 'нед.', 'пон.', 'ут.', 'ср.', 'чет.', 'пет.', 'суб.' ],
    today: 'данас',
    clear: 'избриши',
	close: 'затвори',
    firstDay: 1,
    format: 'd. MMMM yyyy.',
    formatSubmit: 'yyyy/mm/dd',
	labelMonthNext:"Следећи месец",
    labelMonthPrev:"Претходни месец",
    labelMonthSelect:"Изаберите месец",
    labelYearSelect:"Изаберите годину"
});

jQuery.extend( jQuery.fn.pickatime.defaults, {
    clear: 'избриши'
});
