webshims.register('form-datalist-lazy', function($, webshims, window, document, undefined, options){
	
	var optionID = 0;
	var formsCFG = $.webshims.cfg.forms;
	var globStoredOptions = {};
	var getStoredOptions = function(name){
		if(!name){return [];}
		if(globStoredOptions[name]){
			return globStoredOptions[name];
		}
		var data;
		try {
			data = JSON.parse(localStorage.getItem('storedDatalistOptions'+name));
		} catch(e){}
		globStoredOptions[name] = data || [];
		return data || [];
	};
	var storeOptions = function(name, val){
		if(!name){return;}
		val = val || [];
		try {
			localStorage.setItem( 'storedDatalistOptions'+name, JSON.stringify(val) );
		} catch(e){}
	};
	
	var lReg = /</g;
	var gReg = />/g;
	var splitReg = /\s*,\s*/g;

	webshims.getDataListVal = function(element){
		var datalist = $.data(element, 'datalistWidget');
		return (datalist) ? datalist.getPartialValue() : $.prop(element, 'value');
	};
	
	$.extend(options.shadowListProto, {
		_lazyCreate: function(opts){
			var that = this;
			this.hideList = $.proxy(that, 'hideList');
			
			this.index = -1;
			this.input = opts.input;
			this.arrayOptions = [];
			
			this._updateOptions();
			
			this.popover = webshims.objectCreate(webshims.wsPopover, {}, this.options.popover);
			this.shadowList = this.popover.element.addClass('datalist-polyfill');
			
			this.shadowList
				.on('mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget', 'li', function(e){
					if(that._stopMouseOver && e && e.type == 'mouseenter'){return;}
					var items = $('li:not(.hidden-item)', that.shadowList);
					var select = (e.type == 'mousedown' || e.type == 'click');
					if(select && $(opts.input).getNativeElement().triggerHandler('beforeselect', [$(e.currentTarget).find('.option-value').text()]) === false){
						return (e.type != 'mousedown');
					}
					that.markItem(items.index(e.currentTarget), select, items);
					if(e.type == 'click'){
						that.hideList();
						if(formsCFG.customDatalist){
							$(opts.input).getNativeElement().trigger('datalistselect');
						}
					}
					return (e.type != 'mousedown');
				})
			;
			
			opts.input.setAttribute('autocomplete', 'off');
			this.lastCompletedValue = "";
			
			$(opts.input)
				.attr({
					//role: 'combobox',
					'aria-haspopup': 'true',
					'aria-autocomplete': 'both' //support only list?
				})
				.on({
					'input.datalistWidget': function(){
						if(!that.triggeredByDatalist){
							that.changedValue = false;
							that.showHideOptions();
						}
					},
					'keydown.datalistWidget': function(e){
						var keyCode = e.keyCode;
						var activeItem;
						var items;
						var doValue = !!that.options.inlineValue || 'onlyScroll';

						if(keyCode == 40 && !that.showList()){
							that.markItem(that.index + 1, doValue);
							return false;
						}
						
						if(!that.popover.isVisible){return;}
						
						 
						if(keyCode == 38){
							that.markItem(that.index - 1, doValue);
							return false;
						} 
						if(!e.shiftKey && (keyCode == 33 || keyCode == 36)){
							that.markItem(0, doValue);
							return false;
						} 
						if(!e.shiftKey && (keyCode == 34 || keyCode == 35)){
							items = $('li:not(.hidden-item)', that.shadowList);
							that.markItem(items.length - 1, true, items);
							return false;
						} 
						if(keyCode == 13 || keyCode == 27){
							if (keyCode == 13){
								activeItem = $('li.active-item:not(.hidden-item)', that.shadowList);
								if(that.isCompleted){
									$.prop(opts.input, 'selectionStart', $.prop(opts.input, 'value').length);
									if(that.lastCompletedValue && !activeItem[0]){
										that.lastCompletedValue = "";
										that.isCompleted = false;
									}
								}

								if($(opts.input).getNativeElement().triggerHandler('beforeselect', [activeItem.find('.option-value').text()]) === false){
									return;
								}

								that.changeValue( activeItem );
							}
							that.hideList();
							if(formsCFG.customDatalist && activeItem && activeItem[0]){
								$(opts.input).getNativeElement().trigger('datalistselect');
							}
							if(e.keyCode != 13 || (activeItem && activeItem[0])){
								return false;
							}
							
						}
					},
					'focus.datalistWidget': function(){
						that.lastCompletedValue = "";
						if(that.options.focus){
							that.showList();
						}
					},
					'mousedown.datalistWidget': function(){
						if($(this).is(':focus')){
							that.showList();
						}
					}
				})
			;
			
			$(this.datalist)
				.off('updateDatalist.datalistWidget')
				.on('updateDatalist.datalistWidget', $.proxy(this, '_resetListCached'))
				.on('remove', function(e){
					if(!e.originalEvent){
						that.destroy();
					}
				})
			;
			
			this._resetListCached();
			
			if(opts.input.form && (opts.input.name || opts.input.id)){
				$(opts.input.form).on('submit.datalistWidget'+opts.input.id, function(){
					if(!$(opts.input).hasClass('no-datalist-cache') && that._autocomplete != 'off'){
						var val = $.prop(opts.input, 'value');
						var name = (opts.input.name || opts.input.id) + $.prop(opts.input, 'type');
						if(!that.storedOptions){
							that.storedOptions = getStoredOptions( name );
						}
						if(val && that.storedOptions.indexOf(val) == -1){
							that.storedOptions.push(val);
							storeOptions(name, that.storedOptions );
						}
					}
				});
			}
			$(window).on('unload.datalist'+this.id +' beforeunload.datalist'+this.id, function(e){
				that.destroy(e);
			});
		},
		_resetListCached: function(e){
			var that = this;
			var forceShow;
			this.needsUpdate = true;
			this.lastUpdatedValue = false;
			this.lastUnfoundValue = '';

			if(!this.updateTimer){
				if(window.QUnit || (forceShow = ($(that.input).is(':focus') && (that.options.focus || $.prop(that.input, 'value'))) )){
					that.updateListOptions(forceShow);
				} else {
					that.updateTimer = setTimeout(function(){
						that.updateListOptions();
						that = null;
					}, 200);
				}
			}
		},
		_updateOptions: function(){
			this.options = webshims.getOptions(this.input, 'list', options.list);
			
			if($(this.input).prop('multiple')){
				if($(this.input).prop('type') != 'email'){
					webshims.warn('multiple only used on email and file type. Use data-list-multiple instead.');
				} else {
					this.options.multiple = true;
				}
			}

			if(!this.options.inlineValue && !this.options.valueCompletion){
				$.attr(this.input, 'aria-autocomplete', 'list');
				$.attr(this.input, 'aria-expanded', 'false');
			}

			
			if( this.options.getOptionContent && !$.isFunction(this.options.getOptionContent) ){
				this.options.getOptionContent = false;	
			}
			
		},
		updateListOptions: function(_forceShow){
			this.needsUpdate = false;
			clearTimeout(this.updateTimer);
			this.updateTimer = false;

			
			var list = [];
			
			var values = [];
			var allOptions = [];
			var rElem, rItem, rOptions, rI, rLen, item, value;
			for(rOptions = $.prop(this.datalist, 'options'), rI = 0, rLen = rOptions.length; rI < rLen; rI++){
				rElem = rOptions[rI];
				if(!rElem.disabled && (value = $(rElem).val())){
					rItem = {
						value: this.options.noHtmlEscape ? value : value.replace(lReg, '&lt;').replace(gReg, '&gt;'),
						label: $.trim($.attr(rElem, 'label')) || '',
						className: rElem.className || '',
						elem: rElem
					};
					
					if(rItem.label){
						rItem.className += ' has-option-label';
					}
					values.push(rItem.value);
					allOptions.push(rItem);
				}
			}
			
			if(!this.storedOptions){
				this.storedOptions = ($(this.input).hasClass('no-datalist-cache') || this._autocomplete == 'off') ? [] : getStoredOptions((this.input.name || this.input.id) + $.prop(this.input, 'type'));
			}
			
			this.storedOptions.forEach(function(val, i){
				if(values.indexOf(val) == -1){
					allOptions.push({value: val, label: '', className: 'stored-suggest', style: ''});
				}
			});
			
			for(rI = 0, rLen = allOptions.length; rI < rLen; rI++){
				item = allOptions[rI];
				list[rI] = '<li class="'+ item.className +'" tabindex="-1" role="listitem" id="wsoption-'+ (optionID++) +'">'+ this.getOptionContent(item) +'</li>';
			}
			
			this.arrayOptions = allOptions;
			this.popover.contentElement.html('<div class="datalist-box"><ul role="listbox">'+ list.join("\n") +'</ul></div>');
			
			$(this.input).removeAttr('aria-activedescendant').triggerHandler('datalistcreated', [{instance: this}]);

			if(_forceShow || this.popover.isVisible){

				if(this.options.valueCompletion && this.lastCompletedValue && (value = $.prop(this.input, 'value')) && !value.indexOf(this.lastCompletedValue)){
					$.prop(this.input, 'value', this.lastCompletedValue);
					$(this.input).triggerHandler('updateInput');
				}

				if(value != this.lastCompletedValue){
					this.lastCompletedValue = "";
				}
				this.showHideOptions();
			} else {
				this.lastCompletedValue = "";
				this.isCompleted = false;
			}
		},
		getOptionContent: function(item){
			var content;
			var args = [{instance: this, item: item}];
			if( ( content = $(this.input).triggerHandler('getoptioncontent', args) ) && content.indexOf && content.indexOf('option-value') == -1 ){
				content += '<span class="option-value" style="display: none;">'+ item.value +'</span>';
			} 
			if(content == null){
				content = '<span class="option-value">'+ item.value +'</span>';
				if(item.label){
					content += ' <span class="option-label">'+ item.label +'</span>';
				}
			}
			return content || '';
		},
		setCompletedValue: function(value, foundItem, length){
			this.isCompleted = false;
			
			if(!this.options.valueCompletion || !foundItem || this.lastCompletedValue.length >= value.length ){
				this.lastCompletedValue = value;
				return;
			}
			
			var newValue;
			var input = this.input;
			var end = $.prop(input, 'selectionEnd');
			
			this.lastCompletedValue = value;
			
			if(value.length == end){
				
				newValue = value + foundItem.value.substr(length.length);
				
				$(input).triggerHandler('triggerinput');
				$.prop(input, 'value', newValue);
				$(input).triggerHandler('updateInput');
				$(input).callProp('setSelectionRange', [value.length, newValue.length]);
				
				//safari workaround || needs more investigation
				setTimeout(function(){
					if(newValue == $.prop(input, 'value') && $.prop(input, 'selectionEnd') != newValue.length){
						$.prop(input, 'selectionEnd', newValue.length);
					}
				}, 0);
				this.isCompleted = true;
			}
		},
		getPartialValue: function(){
			var value = $.prop(this.input, 'value');
			if(this.options.valueCompletion && this.lastCompletedValue && !$.prop(this.input, 'value').indexOf(this.lastCompletedValue)){
				value = this.lastCompletedValue;
			}
			if(this.options.multiple){
				value = value.split(splitReg);
				value = value[value.length - 1] || '';
			}
			return value;
		},
		showHideOptions: function(_fromShowList){
			var lis, firstFoundValue;
			var inputValue = $.prop(this.input, 'value');
			var value = inputValue.toLowerCase();
			var found = false;
			var startSearch = this.options.filter == '^';
			var that = this;
			
			//first check prevent infinite loop, second creates simple lazy optimization
			if(value === this.lastUpdatedValue){
				return;
			}

			if(this.options.multiple){
				value = value.split(splitReg);
				value = value[value.length - 1] || '';
			}
			
			if(this.lastUnfoundValue && value.indexOf(this.lastUnfoundValue) === 0){
				this.hideList();
				return;
			}
			
			
			this.lastUpdatedValue = value;
			lis = $('li', this.shadowList);
			
			
			
			if(value && this.options.filter != '!'){
				
				
				this.arrayOptions.forEach(function(item, i){
					var search, searchIndex, foundName;
					if(!('lowerValue' in item)){
						item.lowerValue = item.value.toLowerCase();
						if(item.label && item.label != item.value ){
							item.lowerLabel = item.label.toLowerCase();
						}
					}
					
					if(value != item.lowerValue && item.lowerLabel != value){
						searchIndex = item.lowerValue.indexOf(value);
						search = startSearch ? !searchIndex : searchIndex !== -1;
						if(search){
							foundName = 'value';
							if(!firstFoundValue && !searchIndex){
								firstFoundValue = item;
							}
						} else if(item.lowerLabel){
							searchIndex = item.lowerLabel.indexOf(value);
							search = startSearch ? !searchIndex : searchIndex !== -1;
							foundName = 'label';
						}
					}
					
					if(search){
						that.addMark($(lis[i]).removeClass('hidden-item'), item, foundName, searchIndex, value.length);
						found = true;
					} else {
						$(lis[i]).addClass('hidden-item');
					}
				});
			} else if(lis.length) {
				this.removeMark(lis.removeClass('hidden-item'));
				found = true;
			}

			this.hasViewableData = found;
			if(!_fromShowList && found){
				if(this.popover.isVisible && this.popover.element.attr('data-vertical') == 'bottom'){
					that._stopMouseOver = true;
					this.popover.element.triggerHandler('pospopover');
					setTimeout(function(){
						that._stopMouseOver = false;
					}, 9);
				}
				this.showList();
			}
			
			if(!found){
				this.lastUnfoundValue = value;
				this.hideList();
			} else {
				$(this.input).removeAttr('aria-activedescendant');
				this.setCompletedValue(inputValue, firstFoundValue, value);
				this.lastUnfoundValue = false;
			}
		},
		otherType: {
			value: 'label',
			label: 'value'
		},
		addMark: function(elem, item, prop, start, length){
			if(this.options.highlight){
				var text = item[prop].substr(start, length);
				text = item[prop].replace(text ,'<mark>'+ text +'</mark>');
				$('.option-'+ this.otherType[prop] +' > mark', elem).each(this._replaceMark);
				$('.option-'+prop, elem).html(text);
				
			}
		},
		_replaceMark: function(){
			var content = $(this).html();
			$(this).replaceWith(content);
		},
		removeMark: function(lis){
			if(this.options.highlight){
				$('mark', lis).each(this._replaceMark);
			}
		},
		showList: function(){
			if(this.popover.isVisible){return false;}
			if(this.needsUpdate){
				this.updateListOptions();
			}
			this.showHideOptions(true);
			if(!this.hasViewableData){return false;}
			var that = this;
			
			that.shadowList.find('li.active-item').removeClass('active-item');
			that.popover.show(this.input);
			$(this.input)
				.attr({'aria-expanded': 'true'})
			;
			
			return true;
		},
		hideList: function(){
			if(!this.popover.isVisible){return false;}
			var that = this;
			$(this.input)
				.attr({'aria-expanded': 'false'})
				.removeAttr('aria-activedescendant')
			;
			
			this.popover.hide();
			that.shadowList.removeClass('datalist-visible list-item-active');
			that.index = -1;
			if(that.changedValue){
				that.triggeredByDatalist = true;
				$(that.input).trigger('input').trigger('change');
				that.changedValue = false;
				that.triggeredByDatalist = false;
			}
			
			return true;
		},
		scrollIntoView: function(elem){
			var ul = $('ul', this.shadowList);
			var div = $('div.datalist-box', this.shadowList);
			var elemPos = elem.position();
			var containerHeight;
			elemPos.top -=  (parseInt(ul.css('paddingTop'), 10) || 0) + (parseInt(ul.css('marginTop'), 10) || 0) + (parseInt(ul.css('borderTopWidth'), 10) || 0);
			if(elemPos.top < 0){
				div.scrollTop( div.scrollTop() + elemPos.top - 2);
				return;
			}
			elemPos.top += elem.outerHeight();
			containerHeight = div.height();
			if(elemPos.top > containerHeight){
				div.scrollTop( div.scrollTop() + (elemPos.top - containerHeight) + 2);
			}
		},
		changeValue: function(activeItem){
			if(!activeItem[0]){return;}
			var spinner, tmpValue;
			var newValue = $('span.option-value', activeItem).text();
			var oldValue = $.prop(this.input, 'value');
			
			if(this.options.multiple){
				tmpValue = oldValue.split(splitReg);
				tmpValue[tmpValue.length - 1] = newValue;
				
				newValue = tmpValue.join(', ');
			}

			if(this.options.valueCompletion && this.lastCompletedValue && !oldValue.indexOf(this.lastCompletedValue)){
				oldValue = this.lastCompletedValue;
				this.lastCompletedValue = "";
			}

			if(newValue != oldValue){
				
				$(this.input)
					.prop('value', newValue)
					.triggerHandler('updateInput')
				;
				this.changedValue = true;
				if((spinner = $.data(this.input, 'wsspinner')) && spinner.setInput){
					spinner.setInput(newValue);
				}
			}
		},
		markItem: function(index, doValue, items){
			var activeItem;
			var goesUp;
			
			items = items || $('li:not(.hidden-item)', this.shadowList);
			if(!items.length){return;}
			if(index < 0){
				index = items.length - 1;
			} else if(index >= items.length){
				index = 0;
			}
			items.removeClass('active-item');
			this.shadowList.addClass('list-item-active');
			activeItem = items.eq(index).addClass('active-item');

			if(doValue){
				if(doValue != 'onlyScroll'){
					this.changeValue(activeItem);
				} else {
					$(this.input).attr('aria-activedescendant', activeItem.prop('id'));
				}
				this.scrollIntoView(activeItem);
			}
			this.index = index;
		}
	});
});
