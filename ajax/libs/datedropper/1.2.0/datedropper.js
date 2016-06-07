

	//////////////////////////////////////
	// DATEDROPPER Version 1.2	    	//
	// Last Updates: 26/02/2015	    	//
	//				    				//
	// Made with love by		    	//
	// Felice Gattuso		    		//
	//////////////////////////////////////
	

$.fn.dateDropper = function( options ) { 

	// IF IS INPUT AND TYPE IS TEXT //
	
	if( this.is('input') && this.attr('type') == "text" ) {
		
		// DECLARE CURRENT VARIABLE //
		
		var
		dd_y_current	=	 new Date().getFullYear(),
		dd_d_current 	=	 new Date().getDate(),
		dd_m_current	=	 new Date().getMonth(), 
		
		// SET OPTIONS //
		
		settings = $.extend({
			
			animate_current 	: true,
			animation 			: "fadein",
			format				: "m/d/Y",
			lang				: "en",
			lock 				: false,
			maxYear 			: dd_y_current,
			minYear 			: 1970,
			placeholder			: false,
			years_multiple 		: 10,
			
			//style
			color 				: "#f87a54",
			textColor 			: "#000000",
			bgColor 			: "#FFFFFF",
			borderColor 		: "#000000",
			borderRadius 		: 8,
			boxShadow 			: "0 0px 0px 6px rgba(0,0,0,0.05)",
			
		}, options ),
		
		// DECLARE VARIABLE //

		dd_input			= this,
		drop_length 	= $('.dd_wrap').length + 1,
		bissextile		= function(yr) {return !((yr % 4) || (!(yr % 100) && (yr % 400)));}, //bissextile year
		range 			= 100, 
		isHex  			= /^#[0-9A-F]{6}$/i.test(settings.color),
		ymultiselect 	= 0;
		
		if(!isHex) settings.color = '#f87a54';
		if(settings.maxYear<dd_y_current) dd_y_current = settings.maxYear;
		
		var
		yranger 	= function(yr) { 
			for ( var yy = settings.minYear; yy <= settings.maxYear ; yy++ ) {
				
				var remainder = yy % settings.years_multiple;
				if (remainder == 0) 
				if(yr>=yy&&yr<(yy+settings.years_multiple)||yr < yy) {		
					ymultiselect = yy;
					return yy;
				}

			}
		};
		
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
		};


		// CREATE WRAP //
		
		$('<div class="dd_wrap" id="dd_'+drop_length+'"><div class="dd_overlay"></div><div class="dd_"></div></div>')
		.appendTo('body');
		
		var 
		dd_id 		= $('#dd_'+drop_length),
		dd_inner 	= dd_id.find('.dd_');
		dd_overlay 	= dd_id.find('.dd_overlay');
	
		// DATEDROPPER POSITION ON RESIZE //
		
		$(window).on('resize',function(){
			dd_inner.css({
				'top':dd_input.offset().top+(dd_input.height()+12),
				'left':(dd_input.offset().left+((dd_input.outerWidth()/2)-(range/2)))-2
			});
		});
		
		// SET STYLE //
		
		$( "<style>#dd_"+drop_length+" .dd_ {border-color: "+settings.borderColor+"; background: "+settings.bgColor+"; border-radius: "+settings.borderRadius+"px; -moz-border-radius: "+settings.borderRadius+"px; -webkit-border-radius: "+settings.borderRadius+"px; color: "+settings.textColor+";box-shadow: "+settings.boxShadow+";-webkit-box-shadow: "+settings.boxShadow+";-moz-box-shadow: "+settings.boxShadow+";}#dd_"+drop_length+" .dd_ .dd_submit,#dd_"+drop_length+" .dd_ .dd_r_ ul li.dd_sltd_  { background-color: "+settings.color+"; } #dd_"+drop_length+" .dd_ .dd_d_ .dd_sl_ ul li em , #dd_"+drop_length+" .dd_ .dd_d_ .dd_sl_ ul li.dd_sunday,#dd_"+drop_length+" .dd_ .dd_all_ ul li.dd_sunday{ color: "+settings.color+"; }#dd_"+drop_length+" .dd_ .dd_all_ ul li.dd_sunday{ border-bottom: 2px solid "+settings.color+"; } #dd_"+drop_length+" .dd_ .dd_r_ ul li:hover,#dd_"+drop_length+" .dd_ .dd_r_ ul li.dd_sltd_,#dd_"+drop_length+" .dd_ .dd_r_ ul li {border-color: "+settings.color+"; } #dd_"+drop_length+" .dd_ .dd_submit {-webkit-border-bottom-right-radius: "+((settings.borderRadius)-3)+"px;-webkit-border-bottom-left-radius: "+((settings.borderRadius)-3)+"px;-moz-border-radius-bottomright: "+((settings.borderRadius)-3)+"px;-moz-border-radius-bottomleft: "+((settings.borderRadius)-3)+"px;border-bottom-right-radius: "+((settings.borderRadius)-3)+"px;border-bottom-left-radius: "+((settings.borderRadius)-3)+"px;}#dd_"+drop_length+" .dd_:after {background:"+settings.bgColor+";border-top-color:"+settings.borderColor+";border-left-color:"+settings.borderColor+";}#dd_"+drop_length+" .dd_ .dd_r_ ul li,#dd_"+drop_length+" .dd_ .dd_all_ {background:"+settings.bgColor+";}#dd_"+drop_length+" .dd_ .dd_all_{box-shadow: inset 0 -2px 0 "+settings.color+";}#dd_"+drop_length+" .dd_ .dd_r_:after{border-bottom: 2px solid "+settings.color+"}</style>" ).appendTo( "head" );

		// CREATE STRUCTURE //
		
		dd_input
		.attr({
			'readonly':'readonly'
		})
		.addClass('dd_locked');
		
		if(dd_input.val()) {
	
			var 
			txt = dd_input.val(),
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
				
				if(tempD==null) tempD = dd_d_current;
				if(tempM==null) tempM = dd_m_current;
				if(tempY==null) tempY = dd_y_current;
			
			}
			if(tempY<settings.minYear) settings.minYear = tempY;
			if(tempY>settings.maxYear) settings.maxYear = tempY;
		
		}
		
		else {
			if(settings.placeholder) dd_input.val(settings.placeholder);
		}
		
		
		dd_inner.append('<div class="dd_sw_ dd_m_"><a class="dd_nav_ dd_prev_"></a><a class="dd_nav_ dd_next_"></a><div class="dd_sl_"></div></div>');
		dd_inner.append('<div class="dd_sw_ dd_d_"><a class="dd_nav_ dd_prev_"></a><a class="dd_nav_ dd_next_"></a><div class="dd_sl_"></div></div>');
		dd_inner.append('<div class="dd_sw_ dd_y_"><a class="dd_nav_ dd_prev_"></a><a class="dd_nav_ dd_next_"></a><div class="dd_sl_"></div></div>');
		dd_inner.append('<div class="dd_all_ dd_a_d_"></div>');
		dd_inner.append('<div class="dd_all_ dd_a_m_"></div>');
		dd_inner.append('<div class="dd_all_ dd_a_y_"></div>');
		if(settings.years_multiple) dd_inner.append('<div class="dd_r_"></div>');
		dd_inner.append('<div class="dd_submit"></div>');
		
		var
		dd_m 	= dd_inner.find('.dd_m_'),
		dd_d 	= dd_inner.find('.dd_d_'),
		dd_y 	= dd_inner.find('.dd_y_'),
		dd_a_d 	= dd_inner.find('.dd_a_d_'),
		dd_a_m 	= dd_inner.find('.dd_a_m_'),
		dd_a_y 	= dd_inner.find('.dd_a_y_'),
		dd_y_r 	= dd_inner.find('.dd_r_'),
		dd_submit 	= dd_inner.find('.dd_submit');	
		
		// MONTH //
		
		dd_m.find('.dd_sl_').append('<ul></ul>');
		dd_a_m.append('<ul></ul>');
		
		for ( var mm = 1; mm <= 12; mm++ ) {
			
			months = (monthNames[mm-1]).substr(0, 3);
			dd_m.find('ul').append('<li value="'+mm+'">'+months+'</li>');
			dd_a_m.find('ul').append('<li value="'+mm+'">'+mm+'</li>')
	
		}
				
		// DAY //
		
		dd_d.find('.dd_sl_').append('<ul></ul>');
		dd_a_d.append('<ul></ul>');
		
		for ( var dd = 1; dd <= 31; dd++ ) {
			
			if(dd<10) ddd = '0'+dd; else ddd = dd;
			dd_d.find('ul').append('<li value="'+dd+'">'+ddd+'<em ></em></li>');
			dd_a_d.find('ul').append('<li value="'+dd+'">'+ddd+'</li>')
	
		}
		
		// YEAR //
		
		dd_y.find('.dd_sl_').append('<ul></ul>');
		
		for ( var yy = settings.minYear; yy <= settings.maxYear ; yy++ ) {
			
			bissextile_return = bissextile(yy);
			dd_y.find('ul').append('<li value="'+yy+'" data-filter="'+bissextile_return+'">'+yy+'</li>')
	
		}

		// YEARS MULTIPLE //
		
		if(settings.years_multiple) {
		
			dd_y_r.append('<ul></ul>');
			dd_a_y.append('<ul></ul>');
			
			for ( var yr = settings.minYear; yr <= settings.maxYear ; yr++ ) {
				
				var remainder = yr % settings.years_multiple;
				if (remainder == 0) {
						dd_y_r.find('ul').append('<li value="'+yr+'"></li>');						
				}
			}
			
			var ww = range/dd_y_r.find('li').length;

		}
	
		// SET CURRENT DATE FUNCTIONS //
		
		var 
		selectCurrent 	= function() {
			dd_d.find('li').eq(dd_d_current-1).addClass('dd_sltd_');
			dd_m.find('li').eq(dd_m_current).addClass('dd_sltd_');
			dd_y.find('li[value='+dd_y_current+']').addClass('dd_sltd_');
			if(settings.years_multiple) dd_y_r.find('li[value='+yranger(dd_y_current)+']').addClass('dd_sltd_');
		},
		setValueDate = function(){
			dd_d.find('li').eq(tempD-1).addClass('dd_sltd_');
			dd_m.find('li').eq(tempM-1).addClass('dd_sltd_');
			dd_y.find('li[value='+tempY+']').addClass('dd_sltd_');
			if(settings.years_multiple) dd_y_r.find('li[value='+yranger(tempY)+']').addClass('dd_sltd_');
		},
		setDateAnimate 	= function() {
			dd_m.find('.dd_sl_').animate({scrollLeft:dd_m.find('li.dd_sltd_').index()*range},1200,'swing');
			setTimeout(function(){
				dd_d.find('.dd_sl_').animate({scrollLeft:dd_d.find('li.dd_sltd_').index()*range},1200,'swing');
				setTimeout(function(){
					dd_y.find('.dd_sl_').animate({scrollLeft:dd_y.find('li.dd_sltd_').index()*range},1200,'swing');
				},200);
			},400);
		},
		setSelectedDate = function() {
			dd_m.find('.dd_sl_').scrollLeft(dd_m.find('li.dd_sltd_').index()*range);
			dd_d.find('.dd_sl_').scrollLeft(dd_d.find('li.dd_sltd_').index()*range);
			dd_y.find('.dd_sl_').scrollLeft(dd_y.find('li.dd_sltd_').index()*range);
		}
		
		
		if(!tempD&&!tempM&&!tempY) selectCurrent(); else setValueDate();
		
		if(settings.format!='Y'&&settings.format!='m') {
		
			dd_d.find('li').click(function(){
				var
				dd = dd_d.find('li.dd_sltd_').attr('value');
				dd_a_d.find('li').removeClass('dd_sltd_')
				dd_a_d.find('li[value='+dd+']').addClass('dd_sltd_');
				dd_a_d.addClass('dd_open_');
			});
			dd_a_d.find('li').click(function(){
				var
				dd = $(this).attr('value');
				dd_d.find('li[value='+dd+']').click();
				dd_a_d.removeClass('dd_open_');
				calc();
			});
			dd_m.find('li').click(function(){
				var
				dd = dd_m.find('li.dd_sltd_').attr('value');
				dd_a_m.find('li').removeClass('dd_sltd_')
				dd_a_m.find('li[value='+dd+']').addClass('dd_sltd_');
				dd_a_m.addClass('dd_open_');
			});
			dd_a_m.find('li').click(function(){
				var
				dd = $(this).attr('value');
				dd_m.find('li[value='+dd+']').click();
				dd_a_m.removeClass('dd_open_');
				calc();
			});
			dd_y.find('li').click(function(){
				dd_a_y.find('ul').empty();
				var
				dd = dd_y_r.find('li.dd_sltd_').attr('value'),
				dd2 = dd_y.find('li.dd_sltd_').attr('value'),
				dd10 = parseInt(dd) + 9;
				if(dd10>settings.maxYear) dd10=settings.maxYear;
				dd_a_y.find('li').removeClass('dd_sltd_');
				
				for ( var yr = dd; yr <= dd10 ; yr++ ) {
					dd_a_y.find('ul').append('<li value="'+yr+'">'+yr+'</li>')
				}
				dd_a_y.find('li[value='+dd2+']').addClass('dd_sltd_');
				dd_a_y.addClass('dd_open_');
				
				dd_a_y.find('li').click(function(){
					var
					dd = $(this).attr('value');
					dd_y.find('li[value='+dd+']').click();
					dd_a_y.removeClass('dd_open_');
					calc();
				})
			});
		
		}
		

		// SWITCH INTERFACE //
		
		switch(settings.format) {
			case 'Y': dd_m.hide();dd_d.hide(); break;
			case 'm': dd_y.hide();dd_y_r.hide();dd_d.hide(); break;
		}
		
		// DECLARE CALC FUNCTIONS //
		
		var
		calc	= function() {
			
			var
			dd 	= dd_d.find('li.dd_sltd_').attr('value'),
			mm 	= dd_m.find('li.dd_sltd_').attr('value'),
			YY 	= dd_y.find('li.dd_sltd_').attr('value'),
			YR 	= dd_y_r.find('li.dd_sltd_'),
			bis = dd_y.find('li.dd_sltd_').attr('data-filter');
			
			dd_a_d.find('li').show();					
			if(bis=='true'&&mm=='2') {
				dd_d.find('ul').width(29*range);
				if(dd==30||dd==31) {
					dd_d.find('li').removeClass('dd_sltd_')
					dd_d.find('li[value=29]').addClass('dd_sltd_');
				}
				dd_a_d.find('li[value=30],li[value=31]').hide();
			}
			else if(bis!='true'&&mm=='2') {
				dd_d.find('ul').width(28*range);
				if(dd==29||dd==30||dd==31) {
					dd_d.find('li').removeClass('dd_sltd_')
					dd_d.find('li[value=28]').addClass('dd_sltd_');
				}
				dd_a_d.find('li[value=29],li[value=30],li[value=31]').hide();
			}
			else if(mm=='11'||mm=='4'||mm=='6'||mm=='9') {
				dd_d.find('ul').width(30*range);
				if(dd==31) {
					dd_d.find('li').removeClass('dd_sltd_')
					dd_d.find('li[value=30]').addClass('dd_sltd_');
				}
				dd_a_d.find('li[value=31]').hide();
			}
			else {
				dd_d.find('ul').width(31*range);
			}
	
			dd_d.find('li').each(function(index, element) {
			
				tod = $(this).attr('value');
	
				d = new Date(mm+"/"+tod+"/"+YY); 
				x = d.getDay(); 
				
				if(x==0) $(this).addClass('dd_sunday'); else $(this).removeClass('dd_sunday');
				
				$(this).find('em').html(dayNames[x]);
	
			});
			dd_a_d.find('li').each(function(index, element) {
			
				tod = $(this).attr('value');
	
				d = new Date(mm+"/"+tod+"/"+YY); 
				x = d.getDay(); 
				
				if(x==0) $(this).addClass('dd_sunday'); else $(this).removeClass('dd_sunday');
	
			});
			
			if(settings.years_multiple) {
			
				next = YR.next('li');
				prev = YR.prev('li');
	
				if(YY>=next.attr('value')&&next.length) {
					ymultiselect = next.attr('value');
					dd_y_r.find('li').removeClass('dd_sltd_');
					next.addClass('dd_sltd_');
				}
				else if(YY<ymultiselect&&prev.length) { 
					ymultiselect = prev.attr('value');
					dd_y_r.find('li').removeClass('dd_sltd_');
					prev.addClass('dd_sltd_');
				}		
			}
		},
		dropperSubmit = function(str) {
			dd_input.val(str).change();
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
	
			dd_y_r.find('li').on('click',function(){
				
				dd_y_r.find('li').removeClass('dd_sltd_');
				$(this).addClass('dd_sltd_');
				
				var x = $(this).attr('value');
				
				ymultiselect = x;
				
				dd_y.find('.dd_sl_').stop().animate({scrollLeft:(dd_y.find('li[value='+x+']').index())*range},600,'swing');
				dd_y.find('li').removeClass('dd_sltd_');
				dd_y.find('li[value='+x+']').addClass('dd_sltd_');
				
				calc();
			})
			
		}
		
		// DEFINE EACH DATEDROPPER SWIPER //
		
		dd_inner.find('.dd_sw_').each(function(index, element) {
			
			var 
			dd_sel 		= $(this).find('.dd_sl_'),
			dd_nav 		= $(this).find('.dd_nav_'),
			ls			= dd_sel.find('li.dd_sltd_').index()*range,
			lset 		= function(){
				scroll_left = dd_sel.scrollLeft();
				if(scroll_left>=ls+(range/2)) ls = ls+range;
				if(scroll_left<=ls-(range/2)) ls = ls-range;
			}
			
			dd_sel.find('ul').width(dd_sel.find('li').length*range);
			
			dd_sel.on('scroll mousemove',function(){
				lset();
			});
			
			dd_nav.click(function(){
				
				if($(this).hasClass('dd_next_')) obj = dd_sel.find('li.dd_sltd_').next('li');
				else obj = dd_sel.find('li.dd_sltd_').prev('li');

				if(obj.length) { 
				
					dd_sel.stop().animate({scrollLeft:obj.index()*range}, 200 );
					dd_sel.find('li').removeClass('dd_sltd_');
					obj.addClass('dd_sltd_');
					calc();
				}
			});
			
			dd_sel.on('touchend',function(){
				
				dd_sel.stop().animate({scrollLeft:ls}, 200 );
				
				var x = (ls/range);
				
				dd_sel.find('li').removeClass('dd_sltd_');
				dd_sel.find('li').eq(x).addClass('dd_sltd_');
				
				calc();
			
			});
			
			dd_sel.find('li').click(function(){
				dd_sel.animate({scrollLeft:($(this).index())*range}, 200);
				dd_sel.find('li').removeClass('dd_sltd_');
				$(this).addClass('dd_sltd_');
			});

		});
		
		calc();
		
		// INPUT CLICK TO ACTIVE DATEDROPPER //
		
		dd_input.click(function(){
			
			dd_id.show();
			dd_inner.css({
				'top':dd_input.offset().top+(dd_input.height()+12),
				'left':(dd_input.offset().left+((dd_input.outerWidth()/2)-(range/2)))-2
			}).show().addClass('dd_'+settings.animation);
			
			if(dd_input.hasClass('dd_locked')) {
				
				dd_input.removeClass('dd_locked');
				
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
			dd_inner.find('.dd_all_').removeClass('dd_open_');
		});
		
		// ON DATEDROPPER SUBMIT //
		 
		dd_submit.click(function(){
			
			var
			d = dd_d.find('li.dd_sltd_').attr('value'),
			m = dd_m.find('li.dd_sltd_').attr('value'),
			Y = dd_y.find('li.dd_sltd_').attr('value');
			
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
			
				d1d = dd_d_current; if(d1d<10) d1d = '0'+d1d;
				d1m = dd_m_current+1; if(d1m<10) d1m = '0'+d1m;
				d1y = dd_y_current;
				
				var d1 = Date.parse(d1y+"-"+d1m+"-"+d1d) / 1000;
				var d2 = Date.parse(Y+"-"+m+"-"+d) / 1000;
				
				if(settings.lock=='from') { if(d2 < d1) dropperAlert(); else dropperSubmit(str); }
				else { if(d2 > d1) dropperAlert(); else dropperSubmit(str); }
			
			}
			
			else dropperSubmit(str);
			
		});
	
	}
    
};
