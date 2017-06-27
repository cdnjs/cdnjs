webshims.register('form-fixrangechange', function($, webshims){
	"use strict";
	var rangeChange = {

		trigger: function(e){
			if(rangeChange.blockElement){
				rangeChange.blockElement = false;
				setTimeout(function(){
					if(rangeChange.requestedChange && rangeChange.value != rangeChange.requestedChange.value){
						$(rangeChange.requestedChange).trigger('change');
					}
					rangeChange.value = false;
				}, 9);
			}

		},
		lastValue: false,
		updateInputValue: function(e){
			rangeChange.lastValue = e.target.value;
		},
		triggerInput: function(e){
			if(rangeChange.lastValue !== false && rangeChange.lastValue != e.target.value){
				$(e.target).trigger('input');
			}
		},
		inputTeardown: function(e){
			$(e.target)
				.off('input', rangeChange.updateInputValue)
				.off('blur', rangeChange.inputTeardown)
			;
			rangeChange.lastValue = false;
		},
		inputSetup: function(e){

			if(e.target.type == 'range'){
				rangeChange.inputTeardown(e);
				rangeChange.lastValue = e.target.value;
				$(e.target)
					.on('input', rangeChange.updateInputValue)
					.on('blur', rangeChange.inputTeardown)
				;
			}
		}
	};


	$.each([{name: 'key', evt: 'keyup'}, {name: 'mouse', evt: 'mouseup'}, {name: 'touch', evt: 'touchend'}], function(i, obj){
		var setup = obj.name + 'Setup';
		var commit = obj.name + 'Commit';
		rangeChange[obj.name+'Block'] = function(e){

			if(!rangeChange.blockElement && e.target.type == 'range'){

				rangeChange.blockElement = e.target;
				rangeChange.value = e.target.value;
				$(rangeChange.blockElement)
					.off('blur', rangeChange.trigger)
					.on('blur', rangeChange.trigger)
				;

				$(document.body)
					.off(obj.evt, rangeChange[commit])
					.on(obj.evt, rangeChange[commit])
				;
			}
		};

		rangeChange[commit] = function(e){
			$(document.body).off(obj.evt, rangeChange[commit]);
			rangeChange.trigger();
		};

	});

	$(document.body || 'html').on({
		mousedown: rangeChange.mouseBlock,
		'keydown kepress': function(e){
			if(e.keyCode < 45 && e.keyCode > 30){
				rangeChange.keyBlock(e);
			}
		},
		'touchstart': rangeChange.touchBlock,
		focusin: rangeChange.inputSetup
	});

	$.extend(true, $.event.special, {
		change: {
			handle: function(e){

				if(!e.isTrigger && rangeChange.blockElement == e.target){
					rangeChange.requestedChange = e.target;
					rangeChange.triggerInput(e);
					return false;
				} else if(rangeChange.requestedChange == e.target){
					rangeChange.requestedChange = false;
				}
				e.handleObj.handler.apply(this, arguments);
			}
		},
		input: {
			handle: (function(){
				var lastValue, lastElement;

				var remove = function(){
					if(lastElement){
						$(lastElement).off('change', remove);
					}
					lastValue = false;
					lastElement = false;
				};

				var setup = function(e){
					remove(e);
					lastElement = e.target;
					lastValue = e.target.value;
					$(e.target).on('change', remove);
				};

				return function(e){
					var value;
					if(!e.isTrigger && e.target.type == 'range'){

						if(lastElement != e.target){
							setup(e);
						} else if(lastElement == e.target){
							if(lastValue == (value = e.target.value)){
								return false;
							}
							lastValue = e.target.value;
						}
					}
					e.handleObj.handler.apply(this, arguments);
				};
			})()
		}
	});
});
