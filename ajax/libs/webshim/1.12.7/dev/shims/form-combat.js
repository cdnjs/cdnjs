//
webshims.register('form-combat', function($,webshims){
	"use strict";
	
	var replacementDatas = {
		
	};
	var addReplacement = function(pName, dataName, obj){
		if($.fn[pName]){
			if(typeof dataName == 'object'){
				obj = dataName;
				dataName = pName;
			}
			replacementDatas[dataName] = obj;
			webshims.info('detected use of '+ pName +' try to add support.');
		}
	};
	
	addReplacement('select2', {
		shadow: 'container',
		shadowFocus: 'focusser',
		_create: function(elem, shadow, shadowFocus, widgetData){
			
			if(('container' in widgetData) && $.isFunction(widgetData.opened)){
				var onValidate = function(e){
					if (!webshims.wsPopover.isInElement([elem, shadow, shadowFocus, $(widgetData.container)], e.target)) {
						$(elem).trigger('updatevalidation.webshims');
					}
				};
				
				$(shadow).on('wsallowinstantvalidation', function(e, data){
					$(document).off('focusin', onValidate);
					if(data.type == 'focusout' && data.target != elem && widgetData.opened()){
						$(document).on('focusin', onValidate);
						return false;
					}
				});
			}
		}
	});
	
	addReplacement('chosen', {
		shadow: 'container',
		shadowFocus: 'search_field'
	});
	
	addReplacement('selectpicker', {
		shadow: '$newElement',
		shadowFocus: '$button',
		_create: function(elem, shadow, shadowFocus, widgetData){
			if(('$menu' in widgetData)){
				var onValidate = function(e){
					if (!webshims.wsPopover.isInElement([elem, shadow, shadowFocus, $(widgetData.$menu)], e.target)) {
						$(elem).trigger('updatevalidation.webshims');
					}
				};
				
				$(shadow).on('wsallowinstantvalidation', function(e, data){
					$(document).off('focusin', onValidate);
					if(data.type == 'focusout' && data.target != elem){
						$(document).on('focusin', onValidate);
						return false;
					}
				});
			}
		}
	});
	
	addReplacement('selectBoxIt', {
		shadow: 'dropdownContainer',
		shadowFocus: 'dropdown'
	});
	
	addReplacement('checkboxradio', 'mobileCheckboxradio', {
		shadow: 'label',
		shadowFocus: 'element'
	});
	
	addReplacement('selectmenu', 'mobileSelectmenu', {
		shadow: 'button',
		shadowFocus: function(data, elem){
			return data.options.nativeMenu ? data.element : data.button;
		},
		_create: function(elem, shadow, shadowFocus, widgetData){
			if(('listbox' in widgetData)){
				var onValidate = function(e){
					if (!webshims.wsPopover.isInElement([elem, shadow, shadowFocus, $(widgetData.listbox).parent()], e.target)) {
						$(elem).trigger('updatevalidation.webshims');
					}
				};
				
				$(shadow).on('wsallowinstantvalidation', function(e, data){
					if(data.type == 'focusout' && data.target != elem && widgetData.isOpen){
						setTimeout(function(){
							$(document).off('focusin', onValidate).on('focusin', onValidate);
						}, 1);
						return false;
					}
				});
			}
		}
	});

	function find(context){
		$('select:not(.ui-select-nativeonly), input[type="radio"], input[type="checkbox"]', context).each(find.detectReplacement);
	}
	
	find.register = function(elem, data, pluginDescriptor, plugin){
		var shadow = typeof pluginDescriptor.shadow == 'string' ? data[pluginDescriptor.shadow] : pluginDescriptor.shadow(data, elem);
		var shadowFocus = typeof pluginDescriptor.shadowFocus == 'string' ? data[pluginDescriptor.shadowFocus] : pluginDescriptor.shadowFocus(data, elem);
		if(!shadowFocus){
			shadowFocus = shadow;
		}
		if(shadow && (replacementDatas.success || ($(shadowFocus).attr('tabindex') || $(shadowFocus).prop('tabIndex') > -1))){
			webshims.addShadowDom(elem, shadow, {shadowFocusElement: shadowFocus});
			if(pluginDescriptor._create){
				pluginDescriptor._create(elem, shadow, shadowFocus, data);
			}
			replacementDatas.success = true;
		} else {
			webshims.error("webshim could not add support for "+plugin);
			if(plugin in replacementDatas){
				delete replacementDatas[plugin];
			}
		}
	};
	
	find.detectReplacement = function(){
		var plugin;
		var data = $(this).data();
		if(data && !(webshims.data(this) || {}).hasShadow){
			for(plugin in replacementDatas){
				if(data[plugin]){
					find.register(this, data[plugin], replacementDatas[plugin], plugin);
					break;
				}
			}
		}
	};
	
	webshims.addReady(function(context){
		setTimeout(function(){
			find(context);
		}, 4);
	});
});
