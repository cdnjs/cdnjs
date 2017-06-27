

	//////////////////////////////////////
	// DATEDROPPER Version 1	    	//
	// Last Updates: 21/02/2015	    	//
	//				    				//
	// Made with love by		    	//
	// Felice Gattuso		    		//
	//////////////////////////////////////
	

$.fn.dateDropper = function( options ) { 

	// IF IS INPUT AND TYPE IS TEXT //
	
	if( this.is('input') && this.attr('type') == "text" ) {
		
		// DECLARE CURRENT VARIABLE //
		
		var
		current_year	=	 new Date().getFullYear(),
		current_day 	=	 new Date().getDate(),
		current_month	=	 new Date().getMonth(), 
		
		// SET OPTIONS //
		
		settings = $.extend({
			
			animate_current 	: true,
			animation 			: 'fadein',
			color 				: '#f87a54',
			format				: "m/d/Y",
			lang				: "en",
			lock 				: false,
			maxYear 			: current_year,
			minYear 			: 1970,
			placeholder			: "Select date",
			years_multiple 		: false
			
		}, options ),
		
		// DECLARE VARIABLE //

		input		= this,
		drop_length = $('.dd_wrap').length + 1,
		bissextile	= function(yr) {return !((yr % 4) || (!(yr % 100) && (yr % 400)));}, //bissextile year
		range 		= 100, 
		isHex  		= /^#[0-9A-F]{6}$/i.test(settings.color),
		yranger 	= function(yr) { return yr.toString().substr(0,3)+settings.years_multiple; },
		ymultiselect = 0;
		
		if(!isHex) settings.color = '#f87a54';
		if(settings.maxYear<current_year) current_year = settings.maxYear;

		// CREATE WRAP //
		
		$('<div class="dd_wrap" id="dd_'+drop_length+'"><div class="dd_overlay"></div><div class="dd_"></div></div>')
		.appendTo('body');
		
		var 
		dd_id = $('#dd_'+drop_length),
		dd_inner = dd_id.find('.dd_');
		dd_overlay = dd_id.find('.dd_overlay');
	
		// DATEDROPPER POSITION ON RESIZE //
		
		$(window).on('resize',function(){
			dd_inner.css({
				'top':input.offset().top+(input.height()+12),
				'left':(input.offset().left+((input.width()/2)-(range/2)))-2
			});
		});
		
		// SET STYLE //
		
		$( "<style>#dd_"+drop_length+" .dd_ .dd_submit,#dd_"+drop_length+" .dd_ .dd_r_ ul li { background-color: "+settings.color+"; } #dd_"+drop_length+" .dd_ .dd_d_ .dd_sl_ ul li em , #dd_"+drop_length+" .dd_ .dd_d_ .dd_sl_ ul li.dd_sunday{ color: "+settings.color+"; }</style>" ).appendTo( "head" );

		// CREATE STRUCTURE //
		
		input
		.attr({
			'readonly':'readonly'
		})
		.addClass('dd_locked');
		
		if(input.val()) {
	
			var 
			txt = input.val(),
			number_regex = txt.match(/(?:\d{4}|\d{1,2})/g),
			format_regex = settings.format.match(/[a-zA-Z]+/g),
			tempY = null,
			tempD = null,
			tempM = null;
			
			if(number_regex) {
					
				for(var i = 0; i<=number_regex.length; i++){
					if(number_regex[i]){
						if(number_regex[i].length==4) tempY = number_regex[i];
						else if(number_regex[i].length<=2&&number_regex[i].length>0){
							if(number_regex[i]<=12&&format_regex[i]=='m'||format_regex[i]=='n') tempM = number_regex[i];
							else tempD = number_regex[i]
						}
					}
				}
				
				if(tempM<10) { if(tempM.length==2) tempM = tempM.substr(1); }
				if(tempD<10) { if(tempD.length==2) tempD = tempD.substr(1); }
				
				if(tempD==null) tempD = current_day;
				if(tempM==null) tempM = current_month;
				if(tempY==null) tempY = current_year;
			
			}
			if(tempY<settings.minYear) settings.minYear = tempY;
		
		}
		
		else {
			if(settings.placeholder) input.val(settings.placeholder);
		}
		
		dd_inner.append('<div class="dd_sw_ dd_m_"><a class="dd_nav_ dd_prev_"></a><a class="dd_nav_ dd_next_"></a><div class="dd_sl_"></div></div>');
		
		dd_inner.append('<div class="dd_sw_ dd_d_"><a class="dd_nav_ dd_prev_"></a><a class="dd_nav_ dd_next_"></a><div class="dd_sl_"></div></div>');
			
		dd_inner.append('<div class="dd_sw_ dd_y_"><a class="dd_nav_ dd_prev_"></a><a class="dd_nav_ dd_next_"></a><div class="dd_sl_"></div></div>');
		
		if(settings.years_multiple) dd_inner.append('<div class="dd_r_"></div>');
		
		dd_inner.append('<div class="dd_submit"></div>');
		
		var
		month 	= dd_inner.find('.dd_m_'),
		day 	= dd_inner.find('.dd_d_'),
		yw 		= dd_inner.find('.dd_y_w'),
		year 	= dd_inner.find('.dd_y_'),
		year_r 	= dd_inner.find('.dd_r_'),
		button 	= dd_inner.find('.dd_submit');
			
		// SWITCH LANGUAGES //
		
		switch(settings.lang) {
			//italian
			case 'it': 
				var monthNames = [
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
				var dayNames = [
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
				var monthNames = [
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
				var dayNames = [
					'vasárnap',
					'hétfő',
					'kedd',
					'szerda',
					'csütörtök',
					'péntek',
					'szombat'
				];
				break;
			//espanol
			case 'es': 
				var monthNames = [
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
				var dayNames = [
					'Domingo',
					'Lunes',
					'Martes',
					'Miércoles',
					'Jueves',
					'Viernes',
					'Sábado'
				];
				break;
			//deustche
			case 'de':
				var monthNames = [
					"Januar",
					"Februar",
					"Marz",
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
				var dayNames = [
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
				var monthNames = [
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
				var dayNames = [
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
				var monthNames = [
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
				var dayNames = [
					'Dimanche',
					'Lundi',
					'Mardi',
					'Mercredi',
					'Jeudi',
					'Vendredi',
					'Samedi'
				];
				break;
			//portuguese
			case 'pt':
				var monthNames = [
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
				var dayNames = [
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
			    var monthNames = [
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
			    var dayNames = [
			        'nedelja',
			        'ponedeljek',
			        'torek',
			        'sreda',
			        'četrtek',
			        'petek',
			        'sobota'
			    ];
				break;
			//english	
			default:
				var monthNames = [
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
				var dayNames = [
					'Sunday',
					'Monday',
					'Tuesday',
					'Wednesday',
					'Thursday',
					'Friday',
					'Saturday'
				];
				break;
		}

		// MONTH //
		
		month.find('.dd_sl_').append('<ul></ul>');
		
		for ( var mm = 1; mm <= 12; mm++ ) {
			
			months = (monthNames[mm-1]).substr(0, 3);
			month.find('ul').append('<li value="'+mm+'">'+months+'</li>')
	
		}
		
		// DAY //
		
		day.find('.dd_sl_').append('<ul></ul>');
		
		for ( var dd = 1; dd <= 31; dd++ ) {
			
			if(dd<10) ddd = '0'+dd; else ddd = dd;
			day.find('ul').append('<li value="'+dd+'">'+ddd+'<em ></em></li>')
	
		}
		
		// YEAR //
		
		year.find('.dd_sl_').append('<ul></ul>');
		
		for ( var yy = settings.minYear; yy <= settings.maxYear ; yy++ ) {
			
			bissextile_return = bissextile(yy);
			year.find('ul').append('<li value="'+yy+'" data-filter="'+bissextile_return+'">'+yy+'</li>')
	
		}
		
		// YEARS MULTIPLE //
		
		if(settings.years_multiple) {
		
			year_r.append('<ul></ul>');
			
			for ( var yr = settings.minYear; yr <= settings.maxYear ; yr++ ) {
				
				var remainder = yr % settings.years_multiple;
				if (remainder == 0) year_r.find('ul').append('<li value="'+yr+'"></li>');

			}
			
			var ww = range/year_r.find('li').length;
			year_r.find('li').css({'width':ww+'%'});
			year_r.find('li[value='+yranger(current_year)+']').addClass('dd_sltd_');

		}
	
		// SET CURRENT DATE FUNCTIONS //
		
		var 
		selectCurrent 	= function() {
			day.find('li').eq(current_day-1).addClass('dd_sltd_');
			month.find('li').eq(current_month).addClass('dd_sltd_');
			year.find('li[value='+current_year+']').addClass('dd_sltd_');
			if(settings.years_multiple) year_r.find('li[value='+yranger(current_year)+']').addClass('dd_sltd_');
		},
		setValueDate = function(){
			day.find('li').eq(tempD-1).addClass('dd_sltd_');
			month.find('li').eq(tempM-1).addClass('dd_sltd_');
			year.find('li[value='+tempY+']').addClass('dd_sltd_');
			if(settings.years_multiple) year_r.find('li[value='+yranger(tempY)+']').addClass('dd_sltd_');
		},
		setDateAnimate 	= function() {
			month.find('.dd_sl_').animate({scrollLeft:month.find('li.dd_sltd_').index()*range},1200,'swing');
			setTimeout(function(){
				day.find('.dd_sl_').animate({scrollLeft:day.find('li.dd_sltd_').index()*range},1200,'swing');
				setTimeout(function(){
					year.find('.dd_sl_').animate({scrollLeft:year.find('li.dd_sltd_').index()*range},1200,'swing');
				},200);
			},400);
		},
		setSelectedDate = function() {
			month.find('.dd_sl_').scrollLeft(month.find('li.dd_sltd_').index()*range);
			day.find('.dd_sl_').scrollLeft(day.find('li.dd_sltd_').index()*range);
			year.find('.dd_sl_').scrollLeft(year.find('li.dd_sltd_').index()*range);
		}
		
		
		if(!tempD&&!tempM&&!tempY) selectCurrent(); else setValueDate();

		// SWITCH INTERFACE //
		
		switch(settings.format) {
			case 'Y': month.hide();day.hide(); break;
			case 'm': year.hide();year_r.hide();day.hide(); break;
		}
		
		// DECLARE CALC FUNCTIONS //
		
		var
		calc	= function() {
			
			var
			dd 	= day.find('li.dd_sltd_').attr('value'),
			mm 	= month.find('li.dd_sltd_').attr('value'),
			YY 	= year.find('li.dd_sltd_').attr('value'),
			YR 	= year_r.find('li.dd_sltd_'),
			bis = year.find('li.dd_sltd_').attr('data-filter');
								
			if(bis=='true'&&mm=='2') {
				day.find('ul').width(29*range);
				if(dd==30||dd==31) {
					day.find('li').removeClass('dd_sltd_')
					day.find('li[value=29]').addClass('dd_sltd_');
				}
			}
			else if(bis!='true'&&mm=='2') {
				day.find('ul').width(28*range);
				if(dd==29||dd==30||dd==31) {
					day.find('li').removeClass('dd_sltd_')
					day.find('li[value=28]').addClass('dd_sltd_');
				}
			}
			else if(mm=='11'||mm=='4'||mm=='6'||mm=='9') {
				day.find('ul').width(30*range);
				if(dd==31) {
					day.find('li').removeClass('dd_sltd_')
					day.find('li[value=30]').addClass('dd_sltd_');
				}
			}
			else {
				day.find('ul').width(31*range);
			}
	
			day.find('li').each(function(index, element) {
			
				tod = $(this).attr('value');
	
				d = new Date(mm+"/"+tod+"/"+YY); 
				x = d.getDay(); 
				
				if(x==0) $(this).addClass('dd_sunday'); else $(this).removeClass('dd_sunday');
				
				$(this).find('em').html(dayNames[x]);
	
			});
			
			if(settings.years_multiple) {
			
				next = YR.next('li');
				prev = YR.prev('li');
	
				if(YY>=next.attr('value')) {
					ymultiselect = next.attr('value');
					year_r.find('li').removeClass('dd_sltd_');
					next.addClass('dd_sltd_');
				}
				else if(YY<ymultiselect) { 
					ymultiselect = prev.attr('value');
					year_r.find('li').removeClass('dd_sltd_');
					prev.addClass('dd_sltd_');
				}		
			}
		},
		dateSubmit = function(str) {
			input.val(str);
			dd_inner.addClass('dd_fadeout').removeClass('dd_'+settings.animation);
			setTimeout(function(){dd_inner.hide().removeClass('dd_fadeout'); dd_id.hide();},300);
		},
		dropperAlert = function() {
			dd_inner.addClass('dd_alert').removeClass('dd_'+settings.animation);
			setTimeout(function(){
				dd_inner.removeClass('dd_alert')
			},500)
		};
		
		// YEARS MULTIPLE //
		
		if(settings.years_multiple) {
	
			year_r.find('li').on('click',function(){
				
				year_r.find('li').removeClass('dd_sltd_');
				$(this).addClass('dd_sltd_');
				
				var x = $(this).attr('value');
				
				ymultiselect = x;
				
				year.find('.dd_sl_').stop().animate({scrollLeft:(year.find('li[value='+x+']').index())*range},1200,'swing');
				year.find('li').removeClass('dd_sltd_');
				year.find('li[value='+x+']').addClass('dd_sltd_');
				
				calc();
			})
			
		}
		
		// DEFINE EACH DATEDROPPER SWIPER //
		
		dd_inner.find('.dd_sw_').each(function(index, element) {
			
			var 
			selector 	= $(this).find('.dd_sl_'),
			nav 		= $(this).find('.dd_nav_'),
			ls			= selector.find('li.dd_sltd_').index()*range,
			lset 		= function(){
				scroll_left = selector.scrollLeft();
				if(scroll_left>=ls+(range/2)) ls = ls+range;
				if(scroll_left<=ls-(range/2)) ls = ls-range;
			}
			
			$(this).hover(
				function(){ nav.show(); },
				function(){ nav.hide(); }
			);

			selector.find('ul').width(selector.find('li').length*range);
			
			selector.on('scroll mousemove',function(){
				lset();
			});
			
			nav.click(function(){
				
				if($(this).hasClass('dd_next_')) obj = selector.find('li.dd_sltd_').next('li');
				else obj = selector.find('li.dd_sltd_').prev('li');

				if(obj.length) { 
				
					selector.stop().animate({scrollLeft:obj.index()*range}, 200 );
	
					selector.find('li').removeClass('dd_sltd_');
					obj.addClass('dd_sltd_');
					
					calc();
				
				}
				
			});
			
			selector.on('touchend',function(){
				
				selector.stop().animate({scrollLeft:ls}, 200 );
				
				var x = (ls/range);
				
				selector.find('li').removeClass('dd_sltd_');
				selector.find('li').eq(x).addClass('dd_sltd_');
				
				calc();
			
			});
			
			selector.find('li').click(function(){
				
				selector.animate({scrollLeft:($(this).index())*range}, 200);
				selector.find('li').removeClass('dd_sltd_');
				$(this).addClass('dd_sltd_');
				
			});
			
			
			
		});
		
		calc();
		
		// INPUT CLICK TO ACTIVE DATEDROPPER //
		
		input.click(function(){
			
			dd_id.show();
			dd_inner.css({
				'top':input.offset().top+(input.height()+12),
				'left':(input.offset().left+((input.width()/2)-(range/2)))-2
			}).show().addClass('dd_'+settings.animation);
			
			if(input.hasClass('dd_locked')) {
				
				input.removeClass('dd_locked');
				
				if(settings.animate_current!=false) setDateAnimate();
				else setSelectedDate();
				
			}
			
			else setSelectedDate();
			
		});

		// ON BLUR //
		
		dd_overlay.click(function(){
			dd_inner.addClass('dd_fadeout').removeClass('dd_'+settings.animation);
			setTimeout(function(){
				dd_inner.hide().removeClass('dd_fadeout');
				dd_id.hide();
			},300);
		});
		
		// ON DATEDROPPER SUBMIT //
		 
		button.click(function(){
			
			var
			d = day.find('li.dd_sltd_').attr('value'),
			m = month.find('li.dd_sltd_').attr('value'),
			Y = year.find('li.dd_sltd_').attr('value');
			
			if(d<10) d = '0'+d;
			if(m<10) m = '0'+m;
			
			x = new Date(m+"/"+d+"/"+Y); 
			x = x.getDay();
			
			//day
			j = d.substr(1), 					// 1-31
			D = dayNames[x].substr(0,3), 		// Sun, Mon
			l = dayNames[x]; 					// Sunday, Monday
			
			//month
			if(m<10) n = m.substr(1); else n = m; 	// 1-12
			M = monthNames[n-1].substr(0, 3), 		// Jan, Feb
			F = monthNames[n-1], 					// January, February

			str = 
			settings.format
			.replace(/\b(Y)\b/i,Y)
			.replace(/\b(m)\b/i,m)
			.replace(/\b(d)\b/i,d)
			.replace(/\b(D)\b/i,D)
			.replace(/\b(j)\b/i,j)
			.replace(/\b(l)\b/i,l)
			.replace(/\b(F)\b/i,F)
			.replace(/\b(M)\b/i,M)
			.replace(/\b(n)\b/i,n);

			if(settings.lock) {
			
				d1d = current_day; if(d1d<10) d1d = '0'+d1d;
				d1m = current_month+1; if(d1m<10) d1m = '0'+d1m;
				d1y = current_year;
				
				var d1 = Date.parse(d1y+"-"+d1m+"-"+d1d) / 1000;
				var d2 = Date.parse(Y+"-"+m+"-"+d) / 1000;
				
				if(settings.lock=='from') { if(d2 < d1) dropperAlert(); else dateSubmit(str); }
				else { if(d2 > d1) dropperAlert(); else dateSubmit(str); }
			
			}
			
			else dateSubmit(str);
			
		});
	
	}
    
};
