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
		customData: [
			{'input': true, 'name':'Letter', 'data':['a','b','c','d','e']},
			{'input': true, 'name':'Text', 'data':['some','bull','shtuff','here']},
			{'input': false, 'name':'Image', 'data':['<img src="img/slot1.png" />','<img src="img/slot2.png" />','<img src="img/slot3.png" />','<img src="img/slot4.png" />']}
		],
		customDefault: [0,0,0],
		customFormat: false,
		customboxlang: {
			// This structure interfaces with __() -> if it exists, strings are looked up here after i8n fails,
			// and before going to 'default' - the name syntax is <mode>lang
			'customSet':'Looks Good'
		}
		
	});
	$.extend( $.mobile.datebox.prototype, {
		_cbox_offset: function (fld,amount) {
			// This is *not* an automatic override, used below specificly.
			var w = this, x,
				o = this.options;
				
			tmp = (w.customCurrent[fld] + amount) % o.customData[fld]['data'].length;
			if ( tmp < 0 ) { tmp = o.customData[fld]['data'].length + tmp; }
			
			w.customCurrent[fld] = tmp;
			if ( o.useImmediate ) { w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(o.customFormat,w.customCurrent), 'date':w.customCurrent}); }
			w.refresh();
		}
	});
	$.extend( $.mobile.datebox.prototype._parser, {
		// If this stucture exists, it is called instead of the usual date input parser.
		// The name of the structure is the same as the mode name - it recieves a string
		// as the input, which is the current value of the input element, pre-sanitized
		'custombox' : function ( str ) { 
			return ( str.length < 1 || ! str.match(/,/) ) ? this.options.customDefault : str.split(",");
		}
	});
	$.extend( $.mobile.datebox.prototype._customformat, {
		// If this stucture exists, the formatter will call it when it encounters a special string
		// %X<whatever> - it recieves the single letter operater, and the current "date" value
		'custombox' : function ( oper, val ) { 
			return val[oper-1];
		}
	});
	$.extend( $.mobile.datebox.prototype._build, {
		'custombox': function () {
			var w = this,
				o = this.options, i, y, tmp, cnt = -2,
				uid = 'ui-datebox-',
				divBase = $("<div>"),
				divPlus = $('<fieldset>'),
				divIn = divBase.clone(),
				divMinus = divPlus.clone(),
				customCurrent = this._makeDate(this.d.input.val()),
				inBase = $("<input type='text' />").addClass('ui-input-text ui-corner-all ui-shadow-inset ui-body-'+o.themeInput),
				inDiv = $("<div>").addClass('ui-input-text ui-corner-all ui-shadow-inset ui-body-'+o.themeInput).css({'padding':'.4em','margin':'.5em 0','text-align':'center'}),
				butBase = $("<div>"),
				butPTheme = {theme: o.themeButton, icon: 'plus', iconpos: 'bottom', corners:true, shadow:true},
				butMTheme = $.extend({}, butPTheme, {icon: 'minus', iconpos: 'top'});
			
			if ( typeof w.customCurrent === "undefined" ) { w.customCurrent = customCurrent; }
			
			if ( o.customFormat === false ) {
				tmp = [];
				for ( i = 0; i<o.customData.length; i++ ) {
					tmp.push('%X'+(i+1));
				} 
				o.customFormat = tmp.join(',');
			}
			
			if ( typeof w.d.intHTML !== 'boolean' ) {
				w.d.intHTML.empty().remove();
			}
			
			w.d.headerText = ((w._grabLabel() !== false)?w._grabLabel():((o.mode==='datebox')?w.__('titleDateDialogLabel'):w.__('titleTimeDialogLabel')));
			w.d.intHTML = $('<span>');
			
			
			for(i=0; i<o.customData.length; i++) {
				tmp = ['a','b','c','d','e','f'][i];
				if ( o.customData[i]['input'] === true ) {
					$('<div>').append(inBase.clone().attr('value', o.customData[i]['data'][w.customCurrent[i]])).addClass('ui-block-'+tmp).appendTo(divIn);
				} else {
					$('<div>').append(inDiv.clone().html(o.customData[i]['data'][w.customCurrent[i]])).addClass('ui-block-'+tmp).appendTo(divIn);
				}
				w._makeEl(butBase, {'attr': {'field':i, 'amount':1}}).addClass('ui-block-'+tmp).buttonMarkup(butPTheme).appendTo(divPlus);
				w._makeEl(butBase, {'attr': {'field':i, 'amount':1}}).addClass('ui-block-'+tmp).buttonMarkup(butMTheme).appendTo(divMinus);
				cnt++;
			}
			
			divPlus.addClass('ui-grid-'+['a','b','c','d','e'][cnt]).appendTo(w.d.intHTML);
			divIn.addClass('ui-datebox-dboxin').addClass('ui-grid-'+['a','b','c','d','e'][cnt]).appendTo(w.d.intHTML);
			divMinus.addClass('ui-grid-'+['a','b','c','d','e'][cnt]).appendTo(w.d.intHTML);

			if (o.mobVer >= 140) {
				divMinus.find('div').css({'min-height': '2.3em'});
				divPlus.find('div').css({'min-height': '2.3em'});
			}

			if (o.mobVer >= 140) {
				divMinus.find('div').css({'min-height': '2.3em'});
				divPlus.find('div').css({'min-height': '2.3em'});
			}
			
			if ( o.useSetButton || o.useClearButton ) {
				y = $('<div>', {'class':uid+'controls'});
				
				if ( o.useSetButton ) {
					$('<a href="#">'+w.__('customSet')+'</a>')
						.appendTo(y).buttonMarkup({theme: o.theme, icon: 'check', iconpos: 'left', corners:true, shadow:true})
						.on(o.clickEventAlt, function(e) {
							e.preventDefault();
							w.d.input.trigger('datebox', {'method':'set', 'value':w._formatter(o.customFormat,w.customCurrent), 'date':w.customCurrent});
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
			
			divIn.on('change', 'input', function() { w.refresh(); });
			
			divPlus.on(o.clickEvent, 'div', function(e) {
				e.preventDefault();
				w._cbox_offset($(this).jqmData('field'), $(this).jqmData('amount'));
			});
			divMinus.on(o.clickEvent, 'div', function(e) {
				e.preventDefault();
				w._cbox_offset($(this).jqmData('field'), $(this).jqmData('amount')*-1);
			});
			
		}
	});
})( jQuery );
