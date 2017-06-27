jQuery.easing._dd_easing = function(x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
};

(function($) {
    $.fn.dateDropper = function(options) {
        return $(this).each(function() {
            if ($(this).is('input') && $(this).attr('type') == "text") {

                var
                    t_y_cur = new Date().getFullYear(),
                    t_d_cur = new Date().getDate(),
                    t_m_cur = new Date().getMonth();

                var
                    _dd_m,
                    _dd_d,
                    _dd_y,
                    _dd_sub_y;

                var
                    _dd_id = $('.dd-w').length;

                var _structure = '<div class="dd-w dd-init" id="dd-w-' + _dd_id + '"><div class="dd-o"></div><div class="dd-c"><div class="dd-w-c"><div class="dd-b dd-m"><div class="dd-ul"><a class="dd-n dd-n-left"><i class="dd-icon-left" ></i></a><a class="dd-n dd-n-right"><i class="dd-icon-right" ></i></a><ul></ul></div></div><div class="dd-b dd-d"><div class="dd-ul"><a class="dd-n dd-n-left"><i class="dd-icon-left" ></i></a><a class="dd-n dd-n-right"><i class="dd-icon-right" ></i></a><ul></ul></div></div><div class="dd-b dd-y"><div class="dd-ul"><a class="dd-n dd-n-left"><i class="dd-icon-left" ></i></a><a class="dd-n dd-n-right"><i class="dd-icon-right" ></i></a><ul></ul></div></div><div class="dd-s-b dd-s-b-m dd-trans"><div class="dd-s-b-ul"><ul></ul></div></div><div class="dd-s-b dd-s-b-d dd-trans"><div class="dd-s-b-ul"><ul></ul></div></div><div class="dd-s-b dd-s-b-y dd-trans"><div class="dd-s-b-ul"><ul></ul></div></div><div class="dd-s-b dd-s-b-s-y dd-trans"><div class="dd-s-b-ul"><ul></ul></div></div><div class="dd-s-b-s"><i class="dd-icon-close" ></i></div><div class="dd-b dd-sub-y"><div class="dd-ul"><a class="dd-n dd-n-left"><i class="dd-icon-left" ></i></a><a class="dd-n dd-n-right"><i class="dd-icon-right" ></i></a><ul></ul></div></div><div class="dd-s"><a><i class="dd-icon-check" ></i></a></div></div></div></div>';

                $('body').append(_structure);

                var
                    _dd_input = $(this),
                    _dd = $('#dd-w-' + _dd_id),
                    _dd_isB = function(y) {
                        return !((y % 4) || (!(y % 100) && (y % 400)))
                    },
                    _dd_0 = function(n) {
                        return n < 10 ? '0' + n : n
                    },
                    _dd_settings = $.extend({

                        animate: true,
                        init_animation: "fadein",
                        format: "m/d/Y",
                        lang: "en",
                        lock: false,
                        maxYear: t_y_cur,
                        minYear: 1970,
                        yearsRange: 10,

                        //CSS PRIOPRIETIES//
                        dropPrimaryColor: "#01CEFF",
                        dropTextColor: "#333333",
                        dropBackgroundColor: "#FFFFFF",
                        dropBorder: "1px solid #08C",
                        dropBorderRadius: 8,
                        dropShadow: "0 0 10px 0 rgba(0, 136, 204, 0.45)",
                        dropWidth: 124,
						dropTextWeight: 'bold'

                    }, options),
                    _dd_event = null,
					_dd_init_state = false,
					_dd_buffer = false;
					
				var _dd_color = function (col, amt) {
  
					var usePound = false;
				  
					if (col[0] == "#") {
						col = col.slice(1);
						usePound = true;
					}
				 
					var num = parseInt(col,16);
				 
					var r = (num >> 16) + amt;
				 
					if (r > 255) r = 255;
					else if  (r < 0) r = 0;
				 
					var b = ((num >> 8) & 0x00FF) + amt;
				 
					if (b > 255) b = 255;
					else if  (b < 0) b = 0;
				 
					var g = (num & 0x0000FF) + amt;
				 
					if (g > 255) g = 255;
					else if (g < 0) g = 0;
				 
					return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
				  
				};
				
				var _dd_c_invert = function (hexTripletColor) {
					var color = hexTripletColor;
					color = color.substring(1);           // remove #
					color = parseInt(color, 16);          // convert to integer
					color = 0xFFFFFF ^ color;             // invert three bytes
					color = color.toString(16);           // convert to hex
					color = ("000000" + color).slice(-6); // pad with leading zeros
					color = "#" + color;                  // prepend #
					return color;
				}


                $('<style>#dd-w-' + _dd_id + ' { font-weight: ' + _dd_settings.dropTextWeight + '; } #dd-w-' + _dd_id + ' .dd-w-c,#dd-w-' + _dd_id + ' .dd-ul li,#dd-w-' + _dd_id + ' .dd-s-b-ul ul { width:' + _dd_settings.dropWidth + 'px; } #dd-w-' + _dd_id + ' .dd-w-c{color:' + _dd_settings.dropTextColor + ';background:' + _dd_settings.dropBackgroundColor + ';border:' + _dd_settings.dropBorder + ';box-shadow:' + _dd_settings.dropShadow + ';border-radius:' + _dd_settings.dropBorderRadius + 'px}#dd-w-' + _dd_id + ' .dd-w-c,#dd-w-' + _dd_id + ' .dd-s-b{background:' + _dd_settings.dropBackgroundColor + '}#dd-w-' + _dd_id + ' .dd-sun,#dd-w-' + _dd_id + ' .dd-s-b-ul li.dd-on{color:' + _dd_settings.dropPrimaryColor + '}#dd-w-' + _dd_id + ' .dd-c .dd-s,#dd-w-' + _dd_id + ' .dd-s-b-s,#dd-w-' + _dd_id + ' .dd-s-b-sub-y,#dd-w-' + _dd_id + ' .dd-sub-y{background:' + _dd_settings.dropPrimaryColor + ';color:' + _dd_settings.dropBackgroundColor + '}#dd-w-' + _dd_id + ' .dd-c .dd-s a,#dd-w-' + _dd_id + ' .dd-c .dd-s a:hover{color:' + _dd_settings.dropBackgroundColor + '}#dd-w-' + _dd_id + ' .dd-c:after{border-left:' + _dd_settings.dropBorder + ';border-top:' + _dd_settings.dropBorder + '}#dd-w-' + _dd_id + '.dd-bottom .dd-c:after{background:' + _dd_settings.dropBackgroundColor + '}#dd-w-' + _dd_id + '.dd-top .dd-c:after{background:' + _dd_settings.dropPrimaryColor + '}#dd-w-' + _dd_id + ' .dd-n,#dd-w-' + _dd_id + ' .dd-sun{color:' + _dd_settings.dropPrimaryColor + '}#dd-w-' + _dd_id + ' .dd-sub-y .dd-n{color:' + _dd_settings.dropBackgroundColor + '} #dd-w-' + _dd_id + ' .dd-c .dd-s:hover,#dd-w-' + _dd_id + ' .dd-s-b-s:hover { background:' + _dd_color(_dd_settings.dropPrimaryColor,-20) + '; }</style>').appendTo('head');

                switch (_dd_settings.lang) {

                    //Arabic
                    case 'ar':
                        var mn = [
                            "جانفي",
                            "فيفري",
                            "مارس",
                            "أفريل",
                            "ماي",
                            "جوان",
                            "جويلية",
                            "أوت",
                            "سبتمبر",
                            "أكتوبر",
                            "نوفمبر",
                            "ديسمبر"
                        ];
                        var dn = [
                            'الأحد',
                            'الإثنين',
                            'الثلثاء',
                            'الأربعاء',
                            'الخميس',
                            'الجمعة',
                            'السبت'
                        ];
                        break;
                        //italian
                    case 'it':
                        var mn = [
                            "Gennaio",
                            "Febbraio",
                            "Marzo",
                            "Aprile",
                            "Maggio",
                            "Giugno",
                            "Luglio",
                            "Agosto",
                            "Settembre",
                            "Ottobre",
                            "Novembre",
                            "Dicembre"
                        ];
                        var dn = [
                            'Domenica',
                            'Lunedì',
                            'Martedì',
                            'Mercoledì',
                            'Giovedì',
                            'Venerdì',
                            'Sabato'
                        ];
                        break;
                        //hungarian	
                    case 'hu':
                        var mn = [
                            "január",
                            "február",
                            "március",
                            "április",
                            "május",
                            "június",
                            "július",
                            "augusztus",
                            "szeptember",
                            "október",
                            "november",
                            "december"
                        ];
                        var dn = [
                            'vasárnap',
                            'hétfő',
                            'kedd',
                            'szerda',
                            'csütörtök',
                            'péntek',
                            'szombat'
                        ];
                        break;
                        //greek
                    case 'gr':
                        var mn = [
                            "Ιανουάριος",
                            "Φεβρουάριος",
                            "Μάρτιος",
                            "Απρίλιος",
                            "Μάιος",
                            "Ιούνιος",
                            "Ιούλιος",
                            "Αύγουστος",
                            "Σεπτέμβριος",
                            "Οκτώβριος",
                            "Νοέμβριος",
                            "Δεκέμβριος"
                        ];
                        var dn = [
                            'Κυριακή',
                            'Δευτέρα',
                            'Τρίτη',
                            'Τετάρτη',
                            'Πέμπτη',
                            'Παρασκευή',
                            'Σάββατο'
                        ];
                        break;
                        //espanol
                    case 'es':
                        var mn = [
                            "Enero",
                            "Febrero",
                            "Marzo",
                            "Abril",
                            "Mayo",
                            "Junio",
                            "Julio",
                            "Agosto",
                            "Septiembre",
                            "Octubre",
                            "Noviembre",
                            "Diciembre"
                        ];
                        var dn = [
                            'Domingo',
                            'Lunes',
                            'Martes',
                            'Miércoles',
                            'Jueves',
                            'Viernes',
                            'Sábado'
                        ];
                        break;
                        //dansk
                    case 'da':
                        var mn = [
                            "januar",
                            "februar",
                            "marts",
                            "april",
                            "maj",
                            "juni",
                            "juli",
                            "august",
                            "september",
                            "oktober",
                            "november",
                            "december"
                        ];
                        var dn = [
                            'søndag',
                            'mandag',
                            'tirsdag',
                            'onsdag',
                            'torsdag',
                            'fredag',
                            'lørdag'
                        ];
                        break;
                        //deutsch
                    case 'de':
                        var mn = [
                            "Januar",
                            "Februar",
                            "März",
                            "April",
                            "Mai",
                            "Juni",
                            "Juli",
                            "August",
                            "September",
                            "Oktober",
                            "November",
                            "Dezember"
                        ];
                        var dn = [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag'
                        ];
                        break;
                        //dutch
                    case 'nl':
                        var mn = [
                            "januari",
                            "februari",
                            "maart",
                            "april",
                            "mei",
                            "juni",
                            "juli",
                            "augustus",
                            "september",
                            "oktober",
                            "november",
                            "december"
                        ];
                        var dn = [
                            'zondag',
                            'maandag',
                            'dinsdag',
                            'woensdag',
                            'donderdag',
                            'vrijdag',
                            'zaterdag'
                        ];
                        break;
                        //francais
                    case 'fr':
                        var mn = [
                            "Janvier",
                            "Février",
                            "Mars",
                            "Avril",
                            "Mai",
                            "Juin",
                            "Juillet",
                            "Août",
                            "Septembre",
                            "Octobre",
                            "Novembre",
                            "Décembre"
                        ];
                        var dn = [
                            'Dimanche',
                            'Lundi',
                            'Mardi',
                            'Mercredi',
                            'Jeudi',
                            'Vendredi',
                            'Samedi'
                        ];
                        break;
                        //polski
                    case 'pl':
                        var mn = [
                            "styczeń",
                            "luty",
                            "marzec",
                            "kwiecień",
                            "maj",
                            "czerwiec",
                            "lipiec",
                            "sierpień",
                            "wrzesień",
                            "październik",
                            "listopad",
                            "grudzień"
                        ];
                        var dn = [
                            'niedziela',
                            'poniedziałek',
                            'wtorek',
                            'środa',
                            'czwartek',
                            'piątek',
                            'sobota'
                        ];
                        break;
                        //portuguese
                    case 'pt':
                        var mn = [
                            "Janeiro",
                            "Fevereiro",
                            "Março",
                            "Abril",
                            "Maio",
                            "Junho",
                            "Julho",
                            "Agosto",
                            "Setembro",
                            "Outubro",
                            "Novembro",
                            "Dezembro"
                        ];
                        var dn = [
                            "Domingo",
                            "Segunda",
                            "Terça",
                            "Quarta",
                            "Quinta",
                            "Sexta",
                            "Sábado"
                        ];
                        break;
                        //slovenian
                    case 'si':
                        var mn = [
                            "januar",
                            "februar",
                            "marec",
                            "april",
                            "maj",
                            "junij",
                            "julij",
                            "avgust",
                            "september",
                            "oktober",
                            "november",
                            "december"
                        ];
                        var dn = [
                            'nedelja',
                            'ponedeljek',
                            'torek',
                            'sreda',
                            'četrtek',
                            'petek',
                            'sobota'
                        ];
                        break;
                        //ukrainian
                    case 'uk':
                        var mn = [
                            "січень",
                            "лютий",
                            "березень",
                            "квітень",
                            "травень",
                            "червень",
                            "липень",
                            "серпень",
                            "вересень",
                            "жовтень",
                            "листопад",
                            "грудень"
                        ];
                        var dn = [
                            'неділя',
                            'понеділок',
                            'вівторок',
                            'середа',
                            'четвер',
                            'п\'ятниця',
                            'субота'
                        ];
                        break;
                        //russian
                    case 'ru':
                        var mn = [
                            "январь",
                            "февраль",
                            "март",
                            "апрель",
                            "май",
                            "июнь",
                            "июль",
                            "август",
                            "сентябрь",
                            "октябрь",
                            "ноябрь",
                            "декабрь"
                        ];
                        var dn = [
                            'воскресенье',
                            'понедельник',
                            'вторник',
                            'среда',
                            'четверг',
                            'пятница',
                            'суббота'
                        ];
                        break;
                        //turkish
                    case 'tr':
                        var mn = [
                            "Ocak",
                            "Şubat",
                            "Mart",
                            "Nisan",
                            "Mayıs",
                            "Haziran",
                            "Temmuz",
                            "Ağustos",
                            "Eylül",
                            "Ekim",
                            "Kasım",
                            "Aralık"
                        ];
                        var dn = [
                            'Pazar',
                            'Pazartesi',
                            'Sali',
                            'Çarşamba',
                            'Perşembe',
                            'Cuma',
                            'Cumartesi'
                        ];
                        break;
                        //korean	
                    case 'ko':
                        var mn = [
                            "1월",
                            "2월",
                            "3월",
                            "4월",
                            "5월",
                            "6월",
                            "7월",
                            "8월",
                            "9월",
                            "10월",
                            "11월",
                            "12월"
                        ];
                        var dn = [
                            '일요일',
                            '월요일',
                            '화요일',
                            '수요일',
                            '목요일',
                            '금요일',
                            '토요일'
                        ];
                        break;
                        //finnish
                    case 'fi':
                        var mn = [
                            "Tammikuu",
                            "Helmikuu",
                            "Maaliskuu",
                            "Huhtikuu",
                            "Toukokuu",
                            "Kesäkuu",
                            "Heinäkuu",
                            "Elokuu",
                            "Syyskuu",
                            "Lokakuu",
                            "Marraskuu",
                            "Joulukuu"
                        ];
                        var dn = [
                            'Sunnuntai',
                            'Maanantai',
                            'Tiistai',
                            'Keskiviikko',
                            'Torstai',
                            'Perjantai',
                            'Lauantai'
                        ];
                        break;
                        //english	
                    default:
                        var mn = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "June",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                            "December"
                        ];
                        var dn = [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday'
                        ];
                        break;
                };




                var
                    _dd_init = function() {

                        _dd.find('.dd-d li,.dd-s-b li').show();

                        if (_dd_isB(_dd_y) && _dd_m == 2) {

                            _dd.find('.dd-d ul').width(29 * _dd_settings.dropWidth);
                            if (_dd_d == 30 || _dd_d == 31) {
                                _dd_d = 29;
                            }
                            _dd.find('li[data-id=30],li[data-id=31]').hide();

                        } else if (!_dd_isB(_dd_y) && _dd_m == 2) {

                            _dd.find('.dd-d ul').width(28 * _dd_settings.dropWidth);
                            if (_dd_d == 29 || _dd_d == 30 || _dd_d == 31) {
                                _dd_d = 28;
                            }
                            _dd.find('li[data-id=29],li[data-id=30],li[data-id=31]').hide();

                        } else if (_dd_m == 4 || _dd_m == 6 || _dd_m == 9 || _dd_m == 11) {

                            _dd.find('.dd-d ul').width(30 * _dd_settings.dropWidth);
                            if (_dd_d == 31) {
                                _dd_d = 30;
                            }
                            _dd.find('li[data-id=31]').hide();

                        } else {

                            _dd.find('.dd-d ul').width(31 * _dd_settings.dropWidth);

                        }

                        _dd.find('.dd-d li').each(function(index, element) {

                            var
                                _d = $(this).attr('data-id'),
                                _d = new Date(_dd_m + "/" + _d + "/" + _dd_y),
                                _d = _d.getDay();

                            if (_d == 0 || _d == 6) $(this).addClass('dd-sun');
                            else $(this).removeClass('dd-sun');

                            $(this).find('span').html(dn[_d]);

                        });

                        _dd.find('.dd-s-b-d li').each(function(index, element) {

                            var
                                _d = $(this).attr('data-id'),
                                _d = new Date(_dd_m + "/" + _d + "/" + _dd_y),
                                _d = _d.getDay();

                            if (_d == 0 || _d == 6) $(this).addClass('dd-sun');
                            else $(this).removeClass('dd-sun');

                            $(this).find('span').html(dn[_d].substr(0, 3));

                        });


                        _dd.find('.dd-s-b li').removeClass('dd-on');
                        _dd.find('.dd-s-b-d li[data-id="' + _dd_d + '"],.dd-s-b-m li[data-id="' + _dd_m + '"],.dd-s-b-s-y li[data-id="' + _dd_y + '"],.dd-s-b-y li[data-id="' + _dd_sub_y + '"]').addClass('dd-on');

                        if (!_dd_settings.animate) {
							
							setTimeout(function(){
								
								_dd.find('.dd-d .dd-ul').scrollLeft(_dd.find('.dd-d li[data-id="' + _dd_d + '"]').index() * _dd_settings.dropWidth);
								_dd.find('.dd-m .dd-ul').scrollLeft(_dd.find('.dd-m li[data-id="' + _dd_m + '"]').index() * _dd_settings.dropWidth);
								_dd.find('.dd-y .dd-ul').scrollLeft(_dd.find('.dd-y li[data-id="' + _dd_y + '"]').index() * _dd_settings.dropWidth);
								_dd.find('.dd-sub-y .dd-ul').scrollLeft(_dd.find('.dd-sub-y li[data-id="' + _dd_sub_y + '"]').index() * _dd_settings.dropWidth);
							
							},1);
							
							if (_dd.hasClass('dd-init')) {
								
								_dd.removeClass('dd-init');
								_dd_init_state = true;
							}
	
                        } else {

                            if (_dd.hasClass('dd-init')) {

                                _dd.find('.dd-m .dd-ul').animate({
									
                                    scrollLeft: _dd.find('.dd-m li[data-id="' + _dd_m + '"]').index() * _dd_settings.dropWidth
                                }, 1200, 'swing');
                                setTimeout(function() {
                                    _dd.find('.dd-d .dd-ul').animate({
                                        scrollLeft: _dd.find('.dd-d li[data-id="' + _dd_d + '"]').index() * _dd_settings.dropWidth
                                    }, 1200, 'swing');
                                    setTimeout(function() {
                                        _dd.find('.dd-y .dd-ul').animate({
                                            scrollLeft: _dd.find('.dd-y li[data-id="' + _dd_y + '"]').index() * _dd_settings.dropWidth
                                        }, 1200, 'swing',function(){
											_dd_init_state = true;
											_dd.removeClass('dd-init');
										});
                                    }, 200);
                                }, 400);

                                

                            } else {

                                _dd.find('.dd-d .dd-ul').stop().animate({
                                    scrollLeft: _dd.find('.dd-d li[data-id="' + _dd_d + '"]').index() * _dd_settings.dropWidth
                                }, 260);
                                _dd.find('.dd-m .dd-ul').stop().animate({
                                    scrollLeft: _dd.find('.dd-m li[data-id="' + _dd_m + '"]').index() * _dd_settings.dropWidth
                                }, 260);
                                _dd.find('.dd-y .dd-ul').stop().animate({
                                    scrollLeft: _dd.find('.dd-y li[data-id="' + _dd_y + '"]').index() * _dd_settings.dropWidth
                                }, 260);
                                _dd.find('.dd-sub-y .dd-ul').stop().animate({
                                    scrollLeft: _dd.find('.dd-sub-y li[data-id="' + _dd_sub_y + '"]').index() * _dd_settings.dropWidth
                                }, 260);

                            }
                        }

                        _dd_calculate(_dd_sub_y);


                    },
                    _dd_placement = function() {
						
						/*
						
                        var
                            l1 = _dd_input.offset().top + _dd_input.innerHeight() + _dd.find('.dd-c').innerHeight(),
                            l2 = $(window).scrollTop() + $(window).height(),
                            dd_top,
                            dd_left;
	
                        _dd.removeClass('dd-top dd-bottom');

                        if (l1 > l2) {
                            dd_top = _dd_input.offset().top - (_dd.find('.dd-c').innerHeight()) - 6;
                            _dd.addClass('dd-top');
                        } else {
                            dd_top = _dd_input.offset().top + (_dd_input.innerHeight()) - 6;
                            _dd.addClass('dd-bottom');
                        }
						
						*/
						
						_dd.addClass('dd-bottom');

                        _dd.find('.dd-c').css({
                            'top': _dd_input.offset().top + (_dd_input.innerHeight()) - 6,
                            'left': (_dd_input.offset().left + ((_dd_input.innerWidth() / 2) - (_dd_settings.dropWidth / 2)))
                        }).addClass('dd-' + _dd_settings.init_animation);


                    },
                    _dd_alert = function() {

                        _dd.find('.dd-c').addClass('dd-alert').removeClass('dd-' + _dd_settings.init_animation);
                        setTimeout(function() {
                            _dd.find('.dd-c').removeClass('dd-alert');
                        }, 500);

                    },
                    _dd_submit = function() {

                        if (_dd_settings.lock) {

                            var
                                d1 = Date.parse(t_y_cur + "-" + (t_m_cur + 1) + "-" + t_d_cur) / 1000,
                                d2 = Date.parse(_dd_y + "-" + _dd_m + "-" + _dd_d) / 1000;

                            if (_dd_settings.lock == 'from') {
                                if (d2 < d1) {
                                    _dd_alert();
                                    return false;
                                }
                            } else {
                                if (d2 > d1) {
                                    _dd_alert();
                                    return false;
                                }
                            }

                        }

                        var
                            x = new Date(_dd_m + "/" + _dd_d + "/" + _dd_y),
                            x = x.getDay();

                        var
                            str =
                            _dd_settings.format
                            .replace(/\b(d)\b/g, _dd_0(_dd_d))
                            .replace(/\b(m)\b/g, _dd_0(_dd_m))
                            .replace(/\b(Y)\b/g, _dd_y)
                            .replace(/\b(D)\b/g, dn[x].substr(0, 3))
                            .replace(/\b(l)\b/g, dn[x])
                            .replace(/\b(F)\b/g, mn[_dd_m - 1])
                            .replace(/\b(M)\b/g, mn[_dd_m - 1].substr(0, 3))
                            .replace(/\b(n)\b/g, _dd_m)
                            .replace(/\b(j)\b/g, _dd_d);

                        _dd_input.val(str);

                        _dd.find('.dd-c')
                            .addClass('dd-fadeout')
                            .removeClass('dd-' + _dd_settings.init_animation);

                        _dd_event = setTimeout(function() {
                            _dd.hide()
                            _dd.find('.dd-c').removeClass('dd-fadeout');
                        }, 400);
						
						_dd_input.change();


                    },
                    _dd_calculate = function(y) {

                        _dd.find('.dd-s-b-s-y ul').empty();

                        var
                            _i = parseInt(y),
                            _i_max = _i + (_dd_settings.yearsRange - 1);

                        if (_i_max > _dd_settings.maxYear) _i_max = _dd_settings.maxYear;

                        for (var i = _i; i <= _i_max; i++) {

                            if (i % _dd_settings.yearsRange == 0) var _d_c_y = i;

                            _dd.find('.dd-s-b-s-y ul').append('<li data-id="' + i + '" data-filter="' + _d_c_y + '">' + i + '</li>');

                        }

                        _dd.find('.dd-s-b-s-y ul').append('<div class="dd-clear"></div>');


                        _dd_sub_y = parseInt(y);

                        _dd.find('.dd-sub-y .dd-ul')
                            .scrollLeft(_dd.find('.dd-sub-y li[data-id="' + _dd_sub_y + '"]').index() * _dd_settings.dropWidth);

                        _dd.find('.dd-s-b-s-y li').each(function(index, element) {

                            $(this).click(function() {

                                _dd.find('.dd-s-b-s-y li').removeClass('dd-on');
                                $(this).addClass('dd-on');

                                _dd_y = parseInt($(this).attr('data-id'));

                                _dd.find('.dd-s-b-y,.dd-s-b-s-y').removeClass('dd-show');
                                _dd.find('.dd-s-b-s,.dd-sub-y').hide();

                                _dd_init();

                            });

                        });

                    },
                    _dd_construct = function() {

                        _dd.find('.dd-s-b').each(function(index, element) {

                            var
                                _dd_el = $(this),
                                i_min = 0;

                            if (_dd_el.hasClass('dd-s-b-m') || _dd_el.hasClass('dd-s-b-d')) {


                                if (_dd_el.hasClass('dd-s-b-m')) {
                                    var
                                        i_max = 12,
                                        _class = 'm';
										
									for (var i = i_min; i < i_max; i++) {
	
										_dd_el.find('ul')
											.append('<li data-id="' + (i + 1) + '">' + mn[i].substr(0, 3) + '<span>' + _dd_0(i + 1) + '</span></li>');
	
									}
                                }
                                if (_dd_el.hasClass('dd-s-b-d')) {
                                    var
                                        i_max = 31,
                                        _class = 'd';
										
									for (var i = i_min; i < i_max; i++) {
	
										_dd_el.find('ul')
											.append('<li data-id="' + (i + 1) + '">' + _dd_0(i + 1) + '<span></span></li>');
									}
                                }

                                

                            }

                            if (_dd_el.hasClass('dd-s-b-y')) {

                                for (var i = _dd_settings.minYear; i <= _dd_settings.maxYear; i++) {
                                    if (i % _dd_settings.yearsRange == 0)
                                        _dd_el.find('ul').append('<li data-id="' + i + '">' + i + '</li>');
                                }
                            }

                            _dd_el.find('ul').append('<div class="dd-clear"></div>');

                            _dd_el.find('ul li').click(function() {

                                if (_dd_el.hasClass('dd-s-b-m') || _dd_el.hasClass('dd-s-b-d')) {

                                    if (_dd_el.hasClass('dd-s-b-m')) _dd_m = parseInt($(this).attr('data-id'));
                                    if (_dd_el.hasClass('dd-s-b-d')) _dd_d = parseInt($(this).attr('data-id'));

                                    _dd_init();

                                    _dd_el.removeClass('dd-show');
                                    _dd.find('.dd-s-b-s').hide();

                                }
                                if (_dd_el.hasClass('dd-s-b-y')) {

                                    _dd.find('.dd-sub-y').show();
                                    _dd_calculate($(this).attr('data-id'));
                                    _dd.find('.dd-s-b-s-y').addClass('dd-show');

                                }

                            });


                            var
                                top = 0,
                                scroll = false;

                            _dd_el.on('mousewheel DOMMouseScroll', function(e) {

                                scroll = true;

                                if (e.originalEvent.wheelDeltaY < 0 || e.originalEvent.detail > 0)

                                    top = _dd_el.scrollTop() + 100;

                                if (e.originalEvent.wheelDeltaY > 0 || e.originalEvent.detail < 0)

                                    top = _dd_el.scrollTop() - 100;

                                _dd_el.stop().animate({

                                    scrollTop: top

                                }, 600, '_dd_easing', function() {

                                    scroll = false;

                                });


                            }).on('scroll', function() {

                                if (!scroll) top = _dd_el.scrollTop();

                            });

                        });


                        _dd.find('.dd-b').each(function(index, element) {

                            var
                                _dd_el = $(this),
                                _d_ps = 0,
                                _te_event;

                            if (_dd_el.hasClass('dd-m')) {

                                for (var i = 0; i < 12; i++) {
                                    _dd_el.find('ul').append('<li data-id="' + (i + 1) + '">' + mn[i].substr(0, 3) + '</li>');
                                }

                                _dd_el.find('li').click(function() {
                                    if (_dd_settings.format == 'm' || _dd_settings.format == 'n' || _dd_settings.format == 'F' || _dd_settings.format == 'M')
                                        return false;
                                    _dd.find('.dd-s-b-m').addClass('dd-show');
                                });

                            }

                            if (_dd_el.hasClass('dd-d')) {

                                for (var i = 1; i <= 31; i++) {
                                    _dd_el.find('ul').append('<li data-id="' + i + '"><strong>' + _dd_0(i) + '</strong><br><span></span></li>');
                                }
                                _dd_el.find('li').click(function() {
                                    _dd.find('.dd-s-b-d').addClass('dd-show');
                                });
                            }

                            if (_dd_el.hasClass('dd-y')) {

                                for (var i = _dd_settings.minYear; i <= _dd_settings.maxYear; i++) {

                                    var _d_c_y;
                                    if (i % _dd_settings.yearsRange == 0) _d_c_y = 'data-filter="' + i + '"';

                                    _dd_el.find('ul').append('<li data-id="' + i + '" ' + _d_c_y + '>' + i + '</li>');

                                }

                                _dd_el.find('li').click(function() {
                                    if (_dd_settings.format == 'Y')
                                        return false;
                                    _dd.find('.dd-s-b-y').addClass('dd-show');
                                });

                            }
                            if (_dd_el.hasClass('dd-sub-y')) {

                                for (var i = _dd_settings.minYear; i <= _dd_settings.maxYear; i++) {

                                    if (i % _dd_settings.yearsRange == 0)
                                        _dd_el.find('ul').append('<li data-id="' + i + '">' + i + '</li>');

                                }

                            }

                            _dd_el.find('ul').width(_dd_el.find('li').length * _dd_settings.dropWidth);


                            ////////////////////// NAV ///////////////////////


                            _dd_el.find('.dd-n').click(function() {

                                clearInterval(_te_event);

                                var
                                    __dd_el,
                                    x,
                                    y;

                                if (_dd_el.hasClass('dd-y')) x = _dd_y;
                                if (_dd_el.hasClass('dd-m')) x = _dd_m;
                                if (_dd_el.hasClass('dd-d')) x = _dd_d;
                                if (_dd_el.hasClass('dd-sub-y')) x = _dd_sub_y;



                                if ($(this).hasClass('dd-n-left')) {

                                    __dd_el = _dd_el.find('li[data-id="' + x + '"]').prev('li');

                                    if (__dd_el.length && __dd_el.is(":visible"))
                                        y = parseInt(__dd_el.attr('data-id'));

                                    else
                                        y = parseInt(_dd_el.find('li:visible:last').attr('data-id'));


                                } else {

                                    __dd_el = _dd_el.find('li[data-id="' + x + '"]').next('li');

                                    if (__dd_el.length && __dd_el.is(":visible"))
                                        y = parseInt(__dd_el.attr('data-id'));
                                    else
                                        y = parseInt(_dd_el.find('li:first').attr('data-id'));
                                }


                                if (_dd_el.hasClass('dd-y')) _dd_y = y;
                                if (_dd_el.hasClass('dd-m')) _dd_m = y;
                                if (_dd_el.hasClass('dd-d')) _dd_d = y;
                                if (_dd_el.hasClass('dd-sub-y')) _dd_sub_y = y;

                                _dd_init();

                            });

                            var _detect = function() {

                                if (_dd_init_state) {
									
                                    _d_ps = Math.round(_dd_el.find('.dd-ul').scrollLeft() / _dd_settings.dropWidth);
                                    var value = parseInt(_dd_el.find('li').eq(_d_ps).attr('data-id'));

                                    if (_dd_el.hasClass('dd-y')) _dd_y = value;
                                    if (_dd_el.hasClass('dd-m')) _dd_m = value;
                                    if (_dd_el.hasClass('dd-d')) _dd_d = value;
                                    if (_dd_el.hasClass('dd-sub-y')) _dd_sub_y = value;
	
                                }

                            };

                            _dd_el.find('.dd-ul').on('scroll', function() {
								
                                _detect();
	
                            });
							
							var _dd_user = false;
							
							_dd_el.find('.dd-ul').on('mousedown touchstart', function() {
								
								if(!_dd_user) _dd_user = true;
                                clearInterval(_te_event);
								
								$(window).on('mouseup touchend touchmove', function() {
								
									if(_dd_user) {
									
										clearInterval(_te_event);
										_te_event = setTimeout(function() {
											
											_dd_init();
											_dd_user = false;
											
										}, 780);
									
									}
		
								});
								
                            });
							
                            if (_dd_settings.format == 'Y') _dd.find('.dd-m,.dd-d').hide();
                            if (_dd_settings.format == 'm' || _dd_settings.format == 'n' || _dd_settings.format == 'F' || _dd_settings.format == 'M') _dd.find('.dd-y,.dd-d').hide();

                        });

                        _dd.find('.dd-b li').click(function() {

                            if (_dd_settings.format == 'm' || _dd_settings.format == 'n' || _dd_settings.format == 'F' || _dd_settings.format == 'M' || _dd_settings.format == 'Y')
                                return false;

                            _dd.find('.dd-s-b-s').show();

                        });

                        _dd.find('.dd-s-b-s').click(function() {

                            _dd.find('.dd-s-b').removeClass('dd-show');
                            _dd.find('.dd-s-b-s').hide();

                        });

                        _dd.find('.dd-s').click(function() {

                            _dd_submit();

                        });
                        _dd.find('.dd-o').click(function() {

                            _dd.find('.dd-c')
                                .addClass('dd-fadeout')
                                .removeClass('dd-' + _dd_settings.init_animation);

                            _dd_event = setTimeout(function() {
                                _dd.hide()
                                _dd.find('.dd-c').removeClass('dd-fadeout');
                            }, 400);

                        });

                        _dd_init();

                    },
                    _dd_set = function() {
						
						clearInterval(_dd_event);

                        if (_dd.hasClass('dd-init')) {
							
							_dd_input
							.attr({
								'readonly': 'readonly'
							})
							.blur();

                            _dd_m = t_m_cur + 1,
							_dd_d = t_d_cur,
							_dd_y = t_y_cur;

                            if (parseInt(_dd_input.attr('data-d')) && parseInt(_dd_input.attr('data-d')) <= 31)
                                _dd_d = parseInt(_dd_input.attr('data-d'));

                            if (parseInt(_dd_input.attr('data-m')) && parseInt(_dd_input.attr('data-m')) <= 11)
                                _dd_m = parseInt(_dd_input.attr('data-m')) + 1;

                            if (parseInt(_dd_input.attr('data-y')) && _dd_input.attr('data-y').length == 4)
                                _dd_y = parseInt(_dd_input.attr('data-y'));

                            if (_dd_y > _dd_settings.maxYear) _dd_settings.maxYear = _dd_y;
                            if (_dd_y < _dd_settings.minYear) _dd_settings.minYear = _dd_y;

                            _dd_construct();

                        }
						
						_dd.show();
						_dd_placement();
						

                    };

                _dd_input.click(function() {
					
                    _dd_set();

                });

				_dd_input.bind('focusin focus', function(e){
				  e.preventDefault();
				})

                $(window).resize(function() {

                    _dd_placement();

                });


            }
        });
    };
}(jQuery));