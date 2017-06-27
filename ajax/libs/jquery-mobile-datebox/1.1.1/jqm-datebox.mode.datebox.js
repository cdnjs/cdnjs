/*
 * jQuery Mobile Framework : plugin to provide a date and time picker.
 * Copyright (c) JTSage
 * CC 3.0 Attribution.  May be relicensed without permission/notification.
 * https://github.com/jtsage/jquery-mobile-datebox
 */

(function($) {
	$.extend( $.mobile.datebox.prototype.options, {
		themeButton: 'a',
		themeInput: 'a',
		useSetButton: true,
		validHours: false,
		repButton: true
		
	});
	$.extend( $.mobile.datebox.prototype, {
		_dbox_run: function() {
			var w = this;
			w.drag.didRun = true;
			w._offset(w.drag.target[0], w.drag.target[1], false);
			w._dbox_run_update();
			w.runButton = setTimeout(function() {w._dbox_run();}, 150);
		},
		_dbox_run_update: function() {
			var w = this,
				o = this.options;
			
			if ( o.mode === 'datebox' ) {
				w.d.intHTML.find('.ui-datebox-header').find('h4').text(w._formatter(w.__('headerFormat'), w.theDate));
			}
			
			w.d.divIn.find('input').each(function () {
				switch ( $(this).jqmData('field') ) {
					case 'y':
						$(this).val(w.theDate.getFullYear()); break;
					case 'm':
						$(this).val(w.theDate.getMonth() + 1); break;
					case 'd':
						$(this).val(w.theDate.getDate()); break;
					case 'h':
						if ( w.__('timeFormat') === 12 ) {
							if ( w.theDate.getHours() > 12 ) {
								$(this).val(w.theDate.getHours()-12); break;
							} else if ( w.theDate.getHours() === 0 ) {
								$(this).val(12); break;
							}
						}		
						$(this).val(w.theDate.getHours()); break;
					case 'i':
						$(this).val(w._zPad(w.theDate.getMinutes())); break;
					case 'M':
						$(this).val(w.__('monthsOfYearShort')[w.theDate.getMonth()]); break;
					case 'a':
						$(this).val((w.theDate.getHours() > 11)?w.__('meridiem')[1]:w.__('meridiem')[0]);
						break;
				}
			});
		},
		_dbox_vhour: function (delta) {
			var w = this,
				o = this.options, tmp, 
				closeya = [25,0],
				closenay = [25,0];
				
			if ( o.validHours === false ) { return true; }
			if ( $.inArray(w.theDate.getHours(), o.validHours) > -1 ) { return true; }
			
			tmp = w.theDate.getHours();
			$.each(o.validHours, function(){
				if ( ((tmp < this)?1:-1) === delta ) {
					if ( closeya[0] > Math.abs(this-tmp) ) {
						closeya = [Math.abs(this-tmp),parseInt(this,10)];
					}
				} else {
					if ( closenay[0] > Math.abs(this-tmp) ) {
						closenay = [Math.abs(this-tmp),parseInt(this,10)];
					}
				}
			});
			if ( closeya[1] !== 0 ) { w.theDate.setHours(closeya[1]); }
			else { w.theDate.setHours(closenay[1]); }
		},
		_dbox_enter: function (item) {
			var w = this;
			
			if ( item.jqmData('field') === 'M' && $.inArray(item.val(), w.__('monthsOfYearShort')) > -1 ) {
				w.theDate.setMonth($.inArray(item.val(), w.__('monthsOfYearShort')));
			}
			
			if ( item.val() !== '' && item.val().toString().search(/^[0-9]+$/) === 0 ) {
				switch ( item.jqmData('field') ) {
					case 'y':
						w.theDate.setFullYear(parseInt(item.val(),10)); break;
					case 'm':
						w.theDate.setMonth(parseInt(item.val(),10)-1); break;
					case 'd':
						w.theDate.setDate(parseInt(item.val(),10)); break;
					case 'h':
						w.theDate.setHours(parseInt(item.val(),10)); break;
					case 'i':
						w.theDate.setMinutes(parseInt(item.val(),10)); break;
				}
			}
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'timebox': function () {
			this._build.datebox.apply(this,[]);
		},
		'datebox': function () {
			var w = this,
				g = this.drag,
				o = this.options, i, y, tmp, cnt = -2,
				uid = 'ui-datebox-',
				divBase = $("<div>"),
				divPlus = $('<fieldset>'),
				divIn = divBase.clone(),
				divMinus = divPlus.clone(),
				inBase = $("<input type='"+w.inputType+"' />").addClass('ui-input-text ui-corner-all ui-shadow-inset ui-body-'+o.themeInput),
				inBaseT = $("<input type='text' />").addClass('ui-input-text ui-corner-all ui-shadow-inset ui-body-'+o.themeInput),
				butBase = $("<div></div>"),
				butPTheme = {theme: o.themeButton, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true, inline:true},
				butMTheme = $.extend({}, butPTheme, {icon: 'minus', iconpos: 'top'});
			
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():((o.mode==='datebox')?w.__('titleDateDialogLabel'):w.__('titleTimeDialogLabel')));
			w.d.intHTML = $('<span>');

			if ( w.inputType !== 'number' ) { inBase.attr('pattern', '[0-9]*'); }
			
			w.fldOrder = ((o.mode==='datebox')?w.__('dateFieldOrder'):w.__('timeFieldOrder'));
			w._check();
			w._minStepFix();
			w._dbox_vhour(typeof w._dbox_delta !== 'undefined'?w._dbox_delta:1);
			
			if ( o.mode === 'datebox' ) { $('<div class="'+uid+'header"><h4>'+w._formatter(w.__('headerFormat'), w.theDate)+'</h4></div>').appendTo(w.d.intHTML); }
			
			for(i=0; i<=w.fldOrder.length; i++) {
				tmp = ['a','b','c','d','e','f'][i];
				switch (w.fldOrder[i]) {
					case 'y':
					case 'm':
					case 'd':
					case 'h':
						$('<div>').append(w._makeEl(inBase, {'attr': {'field':w.fldOrder[i], 'amount':1}})).addClass('ui-block-'+tmp).appendTo(divIn);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).addClass('ui-block-'+tmp).buttonMarkup(butPTheme).appendTo(divPlus);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).addClass('ui-block-'+tmp).buttonMarkup(butMTheme).appendTo(divMinus);
						cnt++;
						break;
					case 'a':
						if ( w.__('timeFormat') === 12 ) {
							$('<div>').append(w._makeEl(inBaseT, {'attr': {'field':w.fldOrder[i], 'amount':1}})).addClass('ui-block-'+tmp).appendTo(divIn);
							w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).addClass('ui-block-'+tmp).buttonMarkup(butPTheme).appendTo(divPlus);
							w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).addClass('ui-block-'+tmp).buttonMarkup(butMTheme).appendTo(divMinus);
							cnt++;
						} 
						break;
					case 'M':
						$('<div>').append(w._makeEl(inBaseT, {'attr': {'field':w.fldOrder[i], 'amount':1}})).addClass('ui-block-'+tmp).appendTo(divIn);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).addClass('ui-block-'+tmp).buttonMarkup(butPTheme).appendTo(divPlus);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':1}}).addClass('ui-block-'+tmp).buttonMarkup(butMTheme).appendTo(divMinus);
						cnt++;
						break;
					case 'i':
						$('<div>').append(w._makeEl(inBase, {'attr': {'field':w.fldOrder[i], 'amount':o.minuteStep}})).addClass('ui-block-'+tmp).appendTo(divIn);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':o.minuteStep}}).addClass('ui-block-'+tmp).buttonMarkup(butPTheme).appendTo(divPlus);
						w._makeEl(butBase, {'attr': {'field':w.fldOrder[i], 'amount':o.minuteStep}}).addClass('ui-block-'+tmp).buttonMarkup(butMTheme).appendTo(divMinus);
						cnt++;
						break;
				}
			}
			
			divPlus.addClass('ui-grid-'+['a','b','c','d','e'][cnt]).appendTo(w.d.intHTML);
			divIn.addClass('ui-datebox-dboxin').addClass('ui-grid-'+['a','b','c','d','e'][cnt]).appendTo(w.d.intHTML);
			divMinus.addClass('ui-grid-'+['a','b','c','d','e'][cnt]).appendTo(w.d.intHTML);

			if ( o.mobVer >= 140 ) {
				divMinus.find('div').css({'min-height':'2.3em'});
				divPlus.find('div').css({'min-height':'2.3em'});
			}
			
			divIn.find('input').each(function () {
				switch ( $(this).jqmData('field') ) {
					case 'y':
						$(this).val(w.theDate.getFullYear()); break;
					case 'm':
						$(this).val(w.theDate.getMonth() + 1); break;
					case 'd':
						$(this).val(w.theDate.getDate()); break;
					case 'h':
						if ( w.__('timeFormat') === 12 ) {
							if ( w.theDate.getHours() > 12 ) {
								$(this).val(w.theDate.getHours()-12); break;
							} else if ( w.theDate.getHours() === 0 ) {
								$(this).val(12); break;
							}
						}		
						$(this).val(w.theDate.getHours()); break;
					case 'i':
						$(this).val(w._zPad(w.theDate.getMinutes())); break;
					case 'M':
						$(this).val(w.__('monthsOfYearShort')[w.theDate.getMonth()]); break;
					case 'a':
						$(this).val((w.theDate.getHours() > 11)?w.__('meridiem')[1]:w.__('meridiem')[0]);
						break;
				}
			});

			w.d.divIn = divIn;
			
			if ( w.dateOK !== true ) {
				divIn.find('input').addClass(uid+'griddate-disable');
			} else {
				divIn.find('.'+uid+'griddate-disable').removeClass(uid+'griddate-disable');
			}
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $('<div>', {'class':uid+'controls'});
				
				if ( o.useSetButton ) {
					$('<a href="#">'+((o.mode==='datebox')?w.__('setDateButtonLabel'):w.__('setTimeButtonLabel'))+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							if ( w.dateOK === true ) {
								w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(w.__fmt(),w.theDate), 'date':w.theDate});
								w.d.input.trigger('datebox', {'method':'close'});
							}
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
					w._dbox_delta = 1;
					w._offset($(this).jqmData('field'), $(this).jqmData('amount'));
				});
				divMinus.on(o.clickEvent, 'div', function(e) {
					e.preventDefault();
					w._dbox_delta = -1;
					w._offset($(this).jqmData('field'), $(this).jqmData('amount')*-1);
				});
			}
			
			divIn.on('change', 'input', function() { w._dbox_enter($(this)); });
					
			if ( w.wheelExists ) { // Mousewheel operation, if plugin is loaded
				divIn.on('mousewheel', 'input', function(e,d) {
					e.preventDefault();
					w._dbox_delta = d<0?-1:1;
					w._offset($(this).jqmData('field'), ((d<0)?-1:1)*$(this).jqmData('amount'));
				});
			}
			
			if ( o.repButton === true ) {
				divPlus.on(w.drag.eStart, 'div', function(e) {
					tmp = [$(this).jqmData('field'), $(this).jqmData('amount')];
					w.drag.move = true;
					w._dbox_delta = 1;
					w._offset(tmp[0], tmp[1], false);
					w._dbox_run_update();
					if ( !w.runButton ) {
						w.drag.target = tmp;
						w.runButton = setTimeout(function() {w._dbox_run();}, 500);
					}
				});
				
				divMinus.on(w.drag.eStart, 'div', function(e) {
					tmp = [$(this).jqmData('field'), $(this).jqmData('amount')*-1];
					w.drag.move = true;
					w._dbox_delta = -1;
					w._offset(tmp[0], tmp[1], false);
					w._dbox_run_update();
					if ( !w.runButton ) {
						w.drag.target = tmp;
						w.runButton = setTimeout(function() {w._dbox_run();}, 500);
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
