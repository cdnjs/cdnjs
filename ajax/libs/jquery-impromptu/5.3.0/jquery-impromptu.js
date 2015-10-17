/*! jQuery-Impromptu - v5.3.0 - 2014-11-16
* http://trentrichardson.com/Impromptu
* Copyright (c) 2014 Trent Richardson; Licensed MIT */
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(root.jQuery);
	}
}(this, function($) {
	"use strict";

	/**
	* Class constructor
	* @param message String/Object - String of html or Object of states
	* @param options Object - Options to set the prompt
	* @return jQuery - container with overlay and prompt
	*/
	var imp = function(message, options) {
		// only for backwards compat, to be removed in future version
		if(options !== undefined && options.classes !== undefined && typeof options.classes === 'string'){
			options = { box: options.classes };
		}

		imp.options = $.extend({},imp.defaults,options);
		imp.currentPrefix = imp.options.prefix;

		// Be sure any previous timeouts are destroyed
		if(imp.timeout){
			clearTimeout(imp.timeout);
		}
		imp.timeout = false;

		var opts = imp.options,
			$body = $(document.body),
			$window = $(window);

		//build the box and fade
		var msgbox = '<div class="'+ imp.options.prefix +'box '+ opts.classes.box +'">';
		if(opts.useiframe && ($('object, applet').length > 0)) {
			msgbox += '<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+ opts.prefix +'fade '+ opts.classes.fade +'"></iframe>';
		} else {
			msgbox +='<div class="'+ opts.prefix +'fade '+ opts.classes.fade +'"></div>';
		}
		msgbox += '<div class="'+ opts.prefix +' '+ opts.classes.prompt +'">'+
					'<form action="javascript:false;" onsubmit="return false;" class="'+ opts.prefix +'form '+ opts.classes.form +'">'+
						'<div class="'+ opts.prefix +'close '+ opts.classes.close +'">'+ opts.closeText +'</div>'+
						'<div class="'+ opts.prefix +'states"></div>'+
					'</form>'+
				'</div>'+
			'</div>';

		imp.jqib = $(msgbox).appendTo($body);
		imp.jqi = imp.jqib.children('.'+ opts.prefix);//.data('jqi',opts);
		imp.jqif = imp.jqib.children('.'+ opts.prefix +'fade');

		//if a string was passed, convert to a single state
		if(message.constructor === String){
			message = {
				state0: {
					title: opts.title,
					html: message,
					buttons: opts.buttons,
					position: opts.position,
					focus: opts.focus,
					defaultButton: opts.defaultButton,
					submit: opts.submit
				}
			};
		}

		//build the states
		imp.options.states = {};
		var k,v;
		for(k in message){
			v = $.extend({},imp.defaults.state,{name:k},message[k]);
			imp.addState(v.name, v);

			if(imp.currentStateName === ''){
				imp.currentStateName = v.name;
			}
		}

		//Events
		imp.jqi.on('click', '.'+ opts.prefix +'buttons button', function(e){
			var $t = $(this),
				$state = $t.parents('.'+ opts.prefix +'state'),
				stateobj = imp.options.states[$state.data('jqi-name')],
				msg = $state.children('.'+ opts.prefix +'message'),
				clicked = stateobj.buttons[$t.text()] || stateobj.buttons[$t.html()],
				forminputs = {};

			// if for some reason we couldn't get the value
			if(clicked === undefined){
				for(var i in stateobj.buttons){
					if(stateobj.buttons[i].title === $t.text() || stateobj.buttons[i].title === $t.html()){
						clicked = stateobj.buttons[i].value;
					}
				}
			}

			//collect all form element values from all states.
			$.each(imp.jqi.children('form').serializeArray(),function(i,obj){
				if (forminputs[obj.name] === undefined) {
					forminputs[obj.name] = obj.value;
				} else if (typeof forminputs[obj.name] === Array || typeof forminputs[obj.name] === 'object') {
					forminputs[obj.name].push(obj.value);
				} else {
					forminputs[obj.name] = [forminputs[obj.name],obj.value];
				}
			});

			// trigger an event
			var promptsubmite = new $.Event('impromptu:submit');
			promptsubmite.stateName = stateobj.name;
			promptsubmite.state = $state;
			$state.trigger(promptsubmite, [clicked, msg, forminputs]);

			if(!promptsubmite.isDefaultPrevented()){
				imp.close(true, clicked,msg,forminputs);
			}
		});

		// if the fade is clicked blink the prompt
		var fadeClicked = function(){
			if(opts.persistent){
				var offset = (opts.top.toString().indexOf('%') >= 0? ($window.height()*(parseInt(opts.top,10)/100)) : parseInt(opts.top,10)),
					top = parseInt(imp.jqi.css('top').replace('px',''),10) - offset;

				//$window.scrollTop(top);
				$('html,body').animate({ scrollTop: top }, 'fast', function(){
					var i = 0;
					imp.jqib.addClass(opts.prefix +'warning');
					var intervalid = setInterval(function(){
						imp.jqib.toggleClass(opts.prefix +'warning');
						if(i++ > 1){
							clearInterval(intervalid);
							imp.jqib.removeClass(opts.prefix +'warning');
						}
					}, 100);
				});
			}
			else {
				imp.close(true);
			}
		};

		// listen for esc or tab keys
		var keyDownEventHandler = function(e){
			var key = (window.event) ? event.keyCode : e.keyCode;

			//escape key closes
			if(key === 27) {
				fadeClicked();
			}

			//enter key pressed trigger the default button if its not on it, ignore if it is a textarea
			if(key === 13){
				var $defBtn = imp.getCurrentState().find('.'+ opts.prefix +'defaultbutton');
				var $tgt = $(e.target);

				if($tgt.is('textarea,.'+opts.prefix+'button') === false && $defBtn.length > 0){
					e.preventDefault();
					$defBtn.click();
				}
			}

			//constrain tabs, tabs should iterate through the state and not leave
			if (key === 9){
				var $inputels = $('input,select,textarea,button',imp.getCurrentState());
				var fwd = !e.shiftKey && e.target === $inputels[$inputels.length-1];
				var back = e.shiftKey && e.target === $inputels[0];
				if (fwd || back) {
					setTimeout(function(){
						if (!$inputels){
							return;
						}
						var el = $inputels[back===true ? $inputels.length-1 : 0];

						if (el){
							el.focus();
						}
					},10);
					return false;
				}
			}
		};

		imp.position();
		imp.style();

		imp.jqif.click(fadeClicked);
		$window.resize({animate:false}, imp.position);
		imp.jqi.find('.'+ opts.prefix +'close').click(imp.close);
		imp.jqib.on("keydown",keyDownEventHandler)
					.on('impromptu:loaded', opts.loaded)
					.on('impromptu:close', opts.close)
					.on('impromptu:statechanging', opts.statechanging)
					.on('impromptu:statechanged', opts.statechanged);

		// Show it
		imp.jqif[opts.show](opts.overlayspeed);
		imp.jqi[opts.show](opts.promptspeed, function(){

			var $firstState = imp.jqi.find('.'+ opts.prefix +'states .'+ opts.prefix +'state').eq(0);
			imp.goToState($firstState.data('jqi-name'));

			imp.jqib.trigger('impromptu:loaded');
		});

		// Timeout
		if(opts.timeout > 0){
			imp.timeout = setTimeout(function(){ imp.close(true); },opts.timeout);
		}

		return imp.jqib;
	};

	imp.defaults = {
		prefix:'jqi',
		classes: {
			box: '',
			fade: '',
			prompt: '',
			form: '',
			close: '',
			title: '',
			message: '',
			buttons: '',
			button: '',
			defaultButton: ''
		},
		title: '',
		closeText: '&times;',
		buttons: {
			Ok: true
		},
		loaded: function(e){},
		submit: function(e,v,m,f){},
		close: function(e,v,m,f){},
		statechanging: function(e, from, to){},
		statechanged: function(e, to){},
		opacity: 0.6,
		zIndex: 999,
		overlayspeed: 'slow',
		promptspeed: 'fast',
		show: 'fadeIn',
		focus: 0,
		defaultButton: 0,
		useiframe: false,
		top: '15%',
		position: {
			container: null,
			x: null,
			y: null,
			arrow: null,
			width: null
		},
		persistent: true,
		timeout: 0,
		states: {},
		state: {
			name: null,
			title: '',
			html: '',
			buttons: {
				Ok: true
			},
			focus: 0,
			defaultButton: 0,
			position: {
				container: null,
				x: null,
				y: null,
				arrow: null,
				width: null
			},
			submit: function(e,v,m,f){
				return true;
			}
		}
	};

	/**
	* currentPrefix String - At any time this show be the prefix
	* of the current prompt ex: "jqi"
	*/
	imp.currentPrefix = imp.defaults.prefix;

	/**
	* currentStateName String - At any time this is the current state
	* of the current prompt ex: "state0"
	*/
	imp.currentStateName = "";

	/**
	* setDefaults - Sets the default options
	* @param o Object - Options to set as defaults
	* @return void
	*/
	imp.setDefaults = function(o) {
		imp.defaults = $.extend({}, imp.defaults, o);
	};

	/**
	* setStateDefaults - Sets the default options for a state
	* @param o Object - Options to set as defaults
	* @return void
	*/
	imp.setStateDefaults = function(o) {
		imp.defaults.state = $.extend({}, imp.defaults.state, o);
	};

	/**
	* position - Repositions the prompt (Used internally)
	* @return void
	*/
	imp.position = function(e){
		var restoreFx = $.fx.off,
			$state = imp.getCurrentState(),
			stateObj = imp.options.states[$state.data('jqi-name')],
			pos = stateObj? stateObj.position : undefined,
			$window = $(window),
			bodyHeight = document.body.scrollHeight, //$(document.body).outerHeight(true),
			windowHeight = $(window).height(),
			documentHeight = $(document).height(),
			height = bodyHeight > windowHeight ? bodyHeight : windowHeight,
			top = parseInt($window.scrollTop(),10) + (imp.options.top.toString().indexOf('%') >= 0?
					(windowHeight*(parseInt(imp.options.top,10)/100)) : parseInt(imp.options.top,10));

		// when resizing the window turn off animation
		if(e !== undefined && e.data.animate === false){
			$.fx.off = true;
		}

		imp.jqib.css({
			position: "absolute",
			height: height,
			width: "100%",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		});
		imp.jqif.css({
			position: "fixed",
			height: height,
			width: "100%",
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		});

		// tour positioning
		if(pos && pos.container){
			var offset = $(pos.container).offset();

			if($.isPlainObject(offset) && offset.top !== undefined){
				imp.jqi.css({
					position: "absolute"
				});
				imp.jqi.animate({
					top: offset.top + pos.y,
					left: offset.left + pos.x,
					marginLeft: 0,
					width: (pos.width !== undefined)? pos.width : null
				});
				top = (offset.top + pos.y) - (imp.options.top.toString().indexOf('%') >= 0? (windowHeight*(parseInt(imp.options.top,10)/100)) : parseInt(imp.options.top,10));
				$('html,body').animate({ scrollTop: top }, 'slow', 'swing', function(){});
			}
		}
		// custom state width animation
		else if(pos && pos.width){
			imp.jqi.css({
					position: "absolute",
					left: '50%'
				});
			imp.jqi.animate({
					top: pos.y || top,
					left: pos.x || '50%',
					marginLeft: ((pos.width/2)*-1),
					width: pos.width
				});
		}
		// standard prompt positioning
		else{
			imp.jqi.css({
				position: "absolute",
				top: top,
				left: '50%',//$window.width()/2,
				marginLeft: ((imp.jqi.outerWidth(false)/2)*-1)
			});
		}

		// restore fx settings
		if(e !== undefined && e.data.animate === false){
			$.fx.off = restoreFx;
		}
	};

	/**
	* style - Restyles the prompt (Used internally)
	* @return void
	*/
	imp.style = function(){
		imp.jqif.css({
			zIndex: imp.options.zIndex,
			display: "none",
			opacity: imp.options.opacity
		});
		imp.jqi.css({
			zIndex: imp.options.zIndex+1,
			display: "none"
		});
		imp.jqib.css({
			zIndex: imp.options.zIndex
		});
	};

	/**
	* get - Get the prompt
	* @return jQuery - the prompt
	*/
	imp.get = function(state) {
		return $('.'+ imp.currentPrefix);
	};

	/**
	* addState - Injects a state into the prompt
	* @param statename String - Name of the state
	* @param stateobj Object - options for the state
	* @param afterState String - selector of the state to insert after
	* @return jQuery - the newly created state
	*/
	imp.addState = function(statename, stateobj, afterState) {
		var state = "",
			$state = null,
			arrow = "",
			title = "",
			opts = imp.options,
			$jqistates = $('.'+ imp.currentPrefix +'states'),
			buttons = [],
			showHtml,defbtn,k,v,l,i=0;

		stateobj = $.extend({},imp.defaults.state, {name:statename}, stateobj);

		if(stateobj.position.arrow !== null){
			arrow = '<div class="'+ opts.prefix + 'arrow '+ opts.prefix + 'arrow'+ stateobj.position.arrow +'"></div>';
		}
		if(stateobj.title && stateobj.title !== ''){
			title = '<div class="lead '+ opts.prefix + 'title '+ opts.classes.title +'">'+  stateobj.title +'</div>';
		}

		showHtml = stateobj.html;
		if (typeof stateobj.html === 'function') {
			showHtml = 'Error: html function must return text';
		}

		state += '<div id="'+ opts.prefix +'state_'+ statename +'" class="'+ opts.prefix + 'state" data-jqi-name="'+ statename +'" style="display:none;">'+
					arrow + title +
					'<div class="'+ opts.prefix +'message '+ opts.classes.message +'">' + showHtml +'</div>'+
					'<div class="'+ opts.prefix +'buttons '+ opts.classes.buttons +'"'+ ($.isEmptyObject(stateobj.buttons)? 'style="display:none;"':'') +'>';

		// state buttons may be in object or array, lets convert objects to arrays
		if($.isArray(stateobj.buttons)){
			buttons = stateobj.buttons;
		}
		else if($.isPlainObject(stateobj.buttons)){
			for(k in stateobj.buttons){
				if(stateobj.buttons.hasOwnProperty(k)){
					buttons.push({ title: k, value: stateobj.buttons[k] });
				}
			}
		}

		// iterate over each button and create them
		for(i=0, l=buttons.length; i<l; i++){
			v = buttons[i],
			defbtn = stateobj.focus === i || (isNaN(stateobj.focus) && stateobj.defaultButton === i) ? (imp.currentPrefix + 'defaultbutton ' + opts.classes.defaultButton) : '';

			state += '<button class="'+ opts.classes.button +' '+ imp.currentPrefix + 'button '+ defbtn;

			if(typeof v.classes !== "undefined"){
				state += ' '+ ($.isArray(v.classes)? v.classes.join(' ') : v.classes) + ' ';
			}

			state += '" name="' + opts.prefix + '_' + statename + '_button' + v.title.replace(/[^a-z0-9]+/gi,'') + '" id="' + opts.prefix + '_' + statename + '_button' + v.title.replace(/[^a-z0-9]+/gi,'') + '" value="' + v.value + '">' + v.title + '</button>';
		}
		
		state += '</div></div>';

		$state = $(state);

		$state.on('impromptu:submit', stateobj.submit);

		if(afterState !== undefined){
			$jqistates.find('#'+ imp.currentPrefix +'state_'+ afterState).after($state);
		}
		else{
			$jqistates.append($state);
		}

		imp.options.states[statename] = stateobj;

		return $state;
	};

	/**
	* removeState - Removes a state from the prompt
	* @param state String - Name of the state
	* @param newState String - Name of the state to transition to
	* @return Boolean - returns true on success, false on failure
	*/
	imp.removeState = function(state, newState) {
		var $state = imp.getState(state),
			rm = function(){ $state.remove(); };

		if($state.length === 0){
			return false;
		}

		// transition away from it before deleting
		if($state.css('display') !== 'none'){
			if(newState !== undefined && imp.getState(newState).length > 0){
				imp.goToState(newState, false, rm);
			}
			else if($state.next().length > 0){
				imp.nextState(rm);
			}
			else if($state.prev().length > 0){
				imp.prevState(rm);
			}
			else{
				imp.close();
			}
		}
		else{
			$state.slideUp('slow', rm);
		}

		return true;
	};

	/**
	* getState - Get the state by its name
	* @param state String - Name of the state
	* @return jQuery - the state
	*/
	imp.getState = function(state) {
		return $('#'+ imp.currentPrefix +'state_'+ state);
	};
	imp.getStateContent = function(state) {
		return imp.getState(state);
	};

	/**
	* getCurrentState - Get the current visible state
	* @return jQuery - the current visible state
	*/
	imp.getCurrentState = function() {
		return imp.getState(imp.getCurrentStateName());
	};

	/**
	* getCurrentStateName - Get the name of the current visible state
	* @return String - the current visible state's name
	*/
	imp.getCurrentStateName = function() {
		return imp.currentStateName;
	};

	/**
	* goToState - Goto the specified state
	* @param state String - name of the state to transition to
	* @param subState Boolean - true to be a sub state within the currently open state
	* @param callback Function - called when the transition is complete
	* @return jQuery - the newly active state
	*/
	imp.goToState = function(state, subState, callback) {
		var $jqi = imp.get(),
			jqiopts = imp.options,
			$state = imp.getState(state),
			stateobj = jqiopts.states[$state.data('jqi-name')],
			promptstatechanginge = new $.Event('impromptu:statechanging'),
			opts = imp.options;

		if(stateobj !== undefined){


			if (typeof stateobj.html === 'function') {
				var contentLaterFunc = stateobj.html;
				$state.find('.' + opts.prefix +'message ').html(contentLaterFunc());
			}

			// subState can be ommitted
			if(typeof subState === 'function'){
				callback = subState;
				subState = false;
			}

			imp.jqib.trigger(promptstatechanginge, [imp.getCurrentStateName(), state]);

			if(!promptstatechanginge.isDefaultPrevented() && $state.length > 0){
				imp.jqi.find('.'+ imp.currentPrefix +'parentstate').removeClass(imp.currentPrefix +'parentstate');

				if(subState){ // hide any open substates
					// get rid of any substates
					imp.jqi.find('.'+ imp.currentPrefix +'substate').not($state)
						.slideUp(jqiopts.promptspeed)
						.removeClass('.'+ imp.currentPrefix +'substate')
						.find('.'+ imp.currentPrefix +'arrow').hide();

					// add parent state class so it can be visible, but blocked
					imp.jqi.find('.'+ imp.currentPrefix +'state:visible').addClass(imp.currentPrefix +'parentstate');

					// add substate class so we know it will be smaller
					$state.addClass(imp.currentPrefix +'substate');
				}
				else{ // hide any open states
					imp.jqi.find('.'+ imp.currentPrefix +'state').not($state)
						.slideUp(jqiopts.promptspeed)
						.find('.'+ imp.currentPrefix +'arrow').hide();
				}
				imp.currentStateName = stateobj.name;

				$state.slideDown(jqiopts.promptspeed,function(){
					var $t = $(this);

					// if focus is a selector, find it, else its button index
					if(typeof(stateobj.focus) === 'string'){
						$t.find(stateobj.focus).eq(0).focus();
					}
					else{
						$t.find('.'+ imp.currentPrefix +'defaultbutton').focus();
					}

					$t.find('.'+ imp.currentPrefix +'arrow').show(jqiopts.promptspeed);

					if (typeof callback === 'function'){
						imp.jqib.on('impromptu:statechanged', callback);
					}
					imp.jqib.trigger('impromptu:statechanged', [state]);
					if (typeof callback === 'function'){
						imp.jqib.off('impromptu:statechanged', callback);
					}
				});
				if(!subState){
					imp.position();
				}
			} // end isDefaultPrevented()	
		}// end stateobj !== undefined

		return $state;
	};

	/**
	* nextState - Transition to the next state
	* @param callback Function - called when the transition is complete
	* @return jQuery - the newly active state
	*/
	imp.nextState = function(callback) {
		var $next = $('#'+ imp.currentPrefix +'state_'+ imp.getCurrentStateName()).next();
		if($next.length > 0){
			imp.goToState( $next.attr('id').replace(imp.currentPrefix +'state_',''), callback );
		}
		return $next;
	};

	/**
	* prevState - Transition to the previous state
	* @param callback Function - called when the transition is complete
	* @return jQuery - the newly active state
	*/
	imp.prevState = function(callback) {
		var $prev = $('#'+ imp.currentPrefix +'state_'+ imp.getCurrentStateName()).prev();
		if($prev.length > 0){
			imp.goToState( $prev.attr('id').replace(imp.currentPrefix +'state_',''), callback );
		}
		return $prev;
	};

	/**
	* close - Closes the prompt
	* @param callback Function - called when the transition is complete
	* @param clicked String - value of the button clicked (only used internally)
	* @param msg jQuery - The state message body (only used internally)
	* @param forvals Object - key/value pairs of all form field names and values (only used internally)
	* @return jQuery - the newly active state
	*/
	imp.close = function(callCallback, clicked, msg, formvals){
		if(imp.timeout){
			clearTimeout(imp.timeout);
			imp.timeout = false;
		}

		if(imp.jqib){
			imp.jqib.fadeOut('fast',function(){
				
				imp.jqib.trigger('impromptu:close', [clicked,msg,formvals]);
				
				imp.jqib.remove();
				
				$(window).off('resize',imp.position);
			});
		}
		imp.currentStateName = "";
	};

	/**
	* Enable using $('.selector').prompt({});
	* This will grab the html within the prompt as the prompt message
	*/
	$.fn.prompt = function(options){
		if(options === undefined){
			options = {};
		}
		if(options.withDataAndEvents === undefined){
			options.withDataAndEvents = false;
		}

		imp($(this).clone(options.withDataAndEvents).html(),options);
	};

	$.prompt = imp;
	window.Impromptu = imp;

}));
