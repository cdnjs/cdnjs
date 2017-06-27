/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */
 /* DurationBox Mode */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeButton: 'a',
		themeInput: 'a',
		useSetButton: true,
		repButton: true,
		durationSteppers: {'d': 1, 'h': 1, 'i': 1, 's': 1}
	});
	$.extend( $.mobile.datebox.prototype, {
		_durbox_run: function() {
			var w = this;
			w.drag.didRun = true;
			w._offset(w.drag.target[0], w.drag.target[1], false);
			w._durbox_run_update();
			w.runButton = setTimeout(function() {w._durbox_run();}, 100);
		},
		_durbox_run_update: function () {
			var w = this, i, cDur = [],
				ival = {'d': 60*60*24, 'h': 60*60, 'i': 60};

			i = w.theDate.getEpoch() - w.initDate.getEpoch();
			if ( i<0 ) { i = 0; w.theDate.setTime(w.initDate.getTime()); }
			w.lastDuration = i; // Let the number of seconds be sort of public.
			
			// DAYS 
			cDur[0] = parseInt( i / ival.d,10); i = i % ival.d;
			// HOURS 
			cDur[1] = parseInt( i / ival.h, 10); i = i % ival.h;
			// MINS AND SECS 
			cDur[2] = parseInt( i / ival.i, 10);
			cDur[3] = i % ival.i;

			w.d.divIn.find('input').each(function () {
				switch ( $(this).parent().jqmData('field') ) {
					case 'd':
						$(this).val(cDur[0]); break;
					case 'h':
						$(this).val(cDur[1]); break;
					case 'i':
						$(this).val(cDur[2]); break;
					case 's':
						$(this).val(cDur[3]); break;
				}
			});
		},
		_durbox_valid: function (num) {
			if ( num.toString().search(/^[0-9]+$/) === 0 ) { return parseInt(num,10); }
			return 0;
		},
		_durbox_enter: function (item) {
			var w = this,
				t = w.initDate.getEpoch();
				
			w.d.intHTML.find('input').each( function() {
				switch ( $(this).parent().jqmData('field') ) {
					case 'd':
						t += (60*60*24) * w._durbox_valid($(this).val()); break;
					case 'h':
						t += (60*60) * w._durbox_valid($(this).val()); break;
					case 'i':
						t += (60) * w._durbox_valid($(this).val()); break;
					case 's':
						t += w._durbox_valid($(this).val()); break;
				}
			});
			w.theDate.setTime( t * 1000 );
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'durationbox': function () {
			var w = this,
				g = this.drag,
				o = this.options, i, y, cDur = [0,0,0,0], tmp,
				ival = {'d': 60*60*24, 'h': 60*60, 'i': 60},
				uid = 'ui-datebox-',
				divBase = $("<div>"),
				divPlus = $('<fieldset>'),
				divIn = divBase.clone().addClass('ui-datebox-dboxin'),
				divMinus = divPlus.clone(),
				inBase = $("<input type='"+w.inputType+"' />").addClass('ui-input-text ui-corner-all ui-shadow-inset ui-body-'+o.themeInput),
				butBase = $("<div><a href='#'> </a></div>"),
				butPTheme = {theme: o.themeButton, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true},
				butMTheme = $.extend({}, butPTheme, {icon: 'minus', iconpos: 'top'});
			
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():w.__('titleDateDialogLabel'));
			w.d.intHTML = $('<span>');
			
			if ( w.inputType !== 'number' ) { inBase.attr('pattern', '[0-9]*'); }
			
			w.fldOrder = w.__('durationOrder');
			
			for(i=0; i<=w.fldOrder.length; i++) {
				switch (w.fldOrder[i]) {
					case 'd':
					case 'h':
					case 'i':
					case 's':
						y = $.inArray(w.fldOrder[i], ['d','h','i','s']);
						$('<div>').jqmData('field', w.fldOrder[i]).addClass('ui-block-'+['a','b','c','d'][i]).append(inBase.clone()).appendTo(divIn).prepend('<label>'+w.__('durationLabel')[y]+'</label>');
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i]}}).addClass('ui-block-'+['a','b','c','d'][i]).buttonMarkup(butPTheme).appendTo(divPlus);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i]}}).addClass('ui-block-'+['a','b','c','d'][i]).buttonMarkup(butMTheme).appendTo(divMinus);
						break;
				}
			}
			
			i = w.theDate.getEpoch() - w.initDate.getEpoch();
			if ( i<0 ) { i = 0; w.theDate.setTime(w.initDate.getTime()); }
			w.lastDuration = i; // Let the number of seconds be sort of public.
			
			// DAYS 
			cDur[0] = parseInt( i / ival.d,10); i = i % ival.d;
			// HOURS 
			cDur[1] = parseInt( i / ival.h, 10); i = i % ival.h;
			// MINS AND SECS 
			cDur[2] = parseInt( i / ival.i, 10);
			cDur[3] = i % ival.i;
			
			divIn.find('input').each(function () {
				switch ( $(this).parent().jqmData('field') ) {
					case 'd':
						$(this).val(cDur[0]); break;
					case 'h':
						$(this).val(cDur[1]); break;
					case 'i':
						$(this).val(cDur[2]); break;
					case 's':
						$(this).val(cDur[3]); break;
				}
			});

			w.d.divIn = divIn;
			
			divPlus.addClass('ui-grid-'+['a','b','c'][w.fldOrder.length-2]).appendTo(w.d.intHTML);
			divIn.addClass('ui-grid-'+['a','b','c'][w.fldOrder.length-2]).appendTo(w.d.intHTML);
			divMinus.addClass('ui-grid-'+['a','b','c'][w.fldOrder.length-2]).appendTo(w.d.intHTML);

			if (o.mobVer >= 140) {
				divMinus.find('div').css({'min-height': '2.3em'});
				divPlus.find('div').css({'min-height': '2.3em'});
			}
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $('<div>', {'class':uid+'controls'});
				
				if ( o.useSetButton ) {
					$('<a href="#">'+w.__('setDurationButtonLabel')+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(w.__fmt(),w.theDate), 'date':w.theDate});
							w.d.input.trigger('datebox', {'method':'close'});
						});
				}
				if ( o.useClearButton ) {
					$('<a href="#">'+w.__('clearButton')+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'delete', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.val('');
							w.d.input.trigger('datebox',{'method':'clear'});
							w.d.input.trigger('datebox',{'method':'close'});
						});
				}
				if ( o.useCollapsedBut ) {
					y.addClass('ui-datebox-collapse');
				}
				y.appendTo(w.d.intHTML);
			}
			
			if ( o.repButton === false ) {
				divPlus.on(o.clickEvent, 'div', function(e) {
					e.preventDefault();
					w._offset($(this).jqmData('field'), o.durationSteppers[$(this).jqmData('field')]);
				});
				divMinus.on(o.clickEvent, 'div', function(e) {
					e.preventDefault();
					w._offset($(this).jqmData('field'), o.durationSteppers[$(this).jqmData('field')]*-1);
				});
			}
			
			divIn.on('change', 'input', function() { w._durbox_enter($(this)); });
					
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				divIn.on('mousewheel', 'input', function(e,d) {
					e.preventDefault();
					w._offset($(this).parent().jqmData('field'), ((d<0)?-1:1)*o.durationSteppers[$(this).parent().jqmData('field')]);
				});
			}
			
			if ( o.repButton === true ) {
				divPlus.on(w.drag.eStart, 'div', function(e) {
					tmp = [$(this).jqmData('field'), o.durationSteppers[$(this).jqmData('field')]];
					w.drag.move = true;
					w._dbox_delta = 1;
					w._offset(tmp[0], tmp[1], false);
					w._durbox_run_update();
					if ( !w.runButton ) {
						w.drag.target = tmp;
						w.runButton = setTimeout(function() {w._durbox_run();}, 500);
					}
				});
				
				divMinus.on(w.drag.eStart, 'div', function(e) {
					tmp = [$(this).jqmData('field'), o.durationSteppers[$(this).jqmData('field')]*-1];
					w.drag.move = true;
					w._dbox_delta = -1;
					w._offset(tmp[0], tmp[1], false);
					w._durbox_run_update();
					if ( !w.runButton ) {
						w.drag.target = tmp;
						w.runButton = setTimeout(function() {w._durbox_run();}, 500);
					}
				});
				
				divPlus.on(g.eEndA, function(e) {
					if ( g.move ) {
						e.preventDefault();
						clearTimeout(w.runButton);
						w.runButton = false;
						g.move = false;
					}
				});
				divMinus.on(g.eEndA, function(e) {
					if ( g.move ) {
						e.preventDefault();
						clearTimeout(w.runButton);
						w.runButton = false;
						g.move = false;
					}
				});
			}
		}
	});
})( jQuery );
