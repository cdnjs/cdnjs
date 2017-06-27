/*
 * jQuery MultiSelect UI Widget 1.2
 * Copyright (c) 2010 Eric Hynds
 *
 * http://www.erichynds.com/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery 1.4.2
 *   - jQuery UI 1.8 (widget factory and effects if you want to use them)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function($){

var multiselectID = 0;

$.widget("ech.multiselect", {
	
	// default options
	options: {
		header: true,
		height: 175, /* height of the checkbox container (scroll) in pixels */
		minWidth: 225, /* min width of the entire widget in pixels. setting to 'auto' will disable */
		checkAllText: 'Check all',
		uncheckAllText: 'Uncheck all',
		noneSelectedText: 'Select options',
		selectedText: '# selected',
		selectedList: 0,
		show: '',
		hide: '',
		autoOpen: false,
		multiple: true
	},

	_create: function(){
		var self = this,
			el = this.element,
			o = this.options,
			html = [],
			optgroups = [], 
			title = el.attr('title')
			id = el.id || multiselectID++, // unique ID for the label & option tags
			name = el.attr('name');
		
		this.speed = 400; // default speed for effects. UI's default is 400. TODO move to options?
		this._isOpen = false; // assume no
		this.optiontags = el.children(); // remember the original options/optgroups
		
		// the actual button
		html.push('<button type="button" class="ui-multiselect ui-widget ui-state-default ui-corner-all"');
		if(title.length){
			html.push(' title="'+title+'"');
		}
		html.push('><span class="ui-icon ui-icon-triangle-1-s"></span>'+ o.noneSelectedText +'</button>');
		
		// start menu container
		html.push('<div class="ui-multiselect-menu ui-widget ui-widget-content ui-corner-all">');
	
		// header
		html.push('<div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix">');
		html.push('<ul class="ui-helper-reset">');
		if(o.header === true){
			html.push('<li><a class="ui-multiselect-all" href=""><span class="ui-icon ui-icon-check"></span><span>' + o.checkAllText + '</span></a></li>');
			html.push('<li><a class="ui-multiselect-none" href=""><span class="ui-icon ui-icon-closethick"></span><span>' + o.uncheckAllText + '</span></a></li>');
		} else if(typeof o.header === "string"){
			html.push('<li>'+o.header+'</li>');
		}
		html.push('<li class="ui-multiselect-close"><a href="" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>');
		html.push('</ul>');
		html.push('</div>');

		// checkboxes
		html.push('<ul class="ui-multiselect-checkboxes ui-helper-reset">');
		
		// loop through each option tag
		el.find('option').each(function(i){
			var $this = $(this), 
				title = $this.html(),
				value = this.value, 
				inputID = this.id || "ui-multiselect-"+id+"-option-"+i, 
				$parent = $this.parent(), 
				isDisabled = $this.is(':disabled'), 
				labelClasses = ['ui-corner-all'];
			
			if($parent.is('optgroup')){
				var label = $parent.attr('label');
				
				if($.inArray(label,optgroups) === -1){
					html.push('<li class="ui-multiselect-optgroup-label"><a href="#">' + label + '</a></li>');
					optgroups.push(label);
				}
			}
		
			if(value.length > 0){
				if(isDisabled){
					labelClasses.push('ui-state-disabled');
				}
				
				html.push('<li class="'+(isDisabled ? 'ui-multiselect-disabled' : '')+'">');
				html.push('<label for="'+inputID+'" class="'+labelClasses.join(' ')+ '"><input id="'+inputID+'" type="'+(o.multiple ? "checkbox" : "radio")+'" name="'+name+'" value="'+value+'" title="'+title+'"');
				if($this.is(':selected')){
					html.push(' checked="checked"');
				}
				if(isDisabled){
					html.push(' disabled="disabled"');
				}
				html.push(' />'+title+'</label></li>');
			}
		});
		
		// close everything off
		html.push('</ul></div>');
		
		// cache elements
		this.button		= el.children().remove().end().after( html.join('') ).hide().next('button');
		this.menu		= this.button.next('div.ui-multiselect-menu');
		this.labels		= this.menu.find('label');

		// set widths
		this._setButtonWidth();
		this._setMenuWidth();
		
		// perform event bindings
		this._bindEvents();
		
		// remember instance
		$.ech.multiselect.instances.push(this.element);

		// update the number of selected elements when the page initially loads, and use that as the defaultValue.  necessary for form resets when options are pre-selected.
		this.button[0].defaultValue = this.update();
	},
	
	_init: function(){
		if(!this.options.header){
			this.menu.find('div.ui-multiselect-header').hide();
		}
		if(this.options.autoOpen){
			this.open();
		}
		if(this.element.is(":disabled")){
			this.disable();
		}
	},
	
	// binds events
	_bindEvents: function(){
		var self = this;
		
		// button events
		this.button.bind({
			click: function(){
				// FIXME: webkit doesn't like it when you click on arrow span inside the button
				self[ self._isOpen ? 'close' : 'open' ]();
			},
			keypress: function(e){
				switch(e.keyCode){
					case 27: // esc
					case 38: // up
					case 37: // left
						self.close();
						break;
					case 39: // right
					case 40: // down
						self.open();
						break;
				}
			},
			mouseenter: function(){
				if(!self.button.hasClass('ui-state-disabled')){
					$(this).addClass('ui-state-hover');
				}
			},
			mouseleave: function(){
				$(this).removeClass('ui-state-hover');
			},
			focus: function(){
				if(!self.button.hasClass('ui-state-disabled')){
					$(this).addClass('ui-state-focus');
				}
			},
			blur: function(){
				$(this).removeClass('ui-state-focus');
			}
		});

		// header links
		this.menu.find('div.ui-multiselect-header a').bind('click', function(e){
	
			// close link
			if($(this).hasClass('ui-multiselect-close')){
				self.close();
		
			// check all / uncheck all
			} else {
				self[ $(this).hasClass('ui-multiselect-all') ? 'checkAll' : 'uncheckAll' ]();
			}
		
			e.preventDefault();
		})
		
		// optgroup label toggle support
		.end()
		.find('li.ui-multiselect-optgroup-label a').bind('click', function(e){
			var $this = $(this),
				$inputs = $this.parent().nextUntil('li.ui-multiselect-optgroup-label').find('input');
				
			self._toggleChecked( $inputs.filter(':checked').length !== $inputs.length, $inputs );
			self._trigger('optgrouptoggle', e, {
				inputs: $inputs.get(),
				label: $this.parent().text(),
				checked: $inputs[0].checked
			});
			
			e.preventDefault();
		})
		
		// labels/checkbox events
		.end()
		.delegate('label', 'mouseenter', function(){
			if(!$(this).hasClass('ui-state-disabled')){
				self.labels.removeClass('ui-state-hover');
				$(this).addClass('ui-state-hover').find('input').focus();
			}
		})
		.delegate('label', 'keydown', function(e){
			switch(e.keyCode){
				case 9: // tab
				case 27: // esc
					self.close();
					break;
				case 38: // up
				case 40: // down
				case 37: // left
				case 39: // right
					self._traverse(e.keyCode, this);
					break;
				case 13: // enter
					e.preventDefault();
					$(this).find('input').trigger('click');
					break;
			}
		})
		.delegate('input', 'click', function(e){
			var $this = $(this), val = this.value;

			// bail if this input is disabled or the event is cancelled
			// TODO rename click - it can fire on keyboard events as well
			if( $this.is(':disabled') || self._trigger('click', e, { value:this.value, text:this.title, checked:this.checked }) === false ){
				e.preventDefault();
				return;
			}
			
			self.update();
			
			// set the original option tag to selected
			$(self.optiontags).filter(function(){ return this.value === val; }).attr('selected', $this.is(':checked') );
		});
		
		// close each widget when clicking on any other element/anywhere else on the page
		$(document).bind('click', function(e){
			var $target = $(e.target);

			if(self._isOpen && !$target.closest('div.ui-multiselect-menu').length && !$target.is('button.ui-multiselect')){
				self.close();
			}
		});
	},

	// set button width
	_setButtonWidth: function(){
		var width = this.element.outerWidth(),
			o = this.options;
			
		if( /\d/.test(o.minWidth) && width < o.minWidth){
			width = o.minWidth;
		}
		
		// set widths
		this.button.width( width );
	},
	
	// set menu width
	_setMenuWidth: function(){
		var m = this.menu,
			width = this.button.outerWidth()
				-parseInt(m.css('padding-left'),10)
				-parseInt(m.css('padding-right'),10)
				-parseInt(m.css('border-right-width'),10)
				-parseInt(m.css('border-left-width'),10);
				
		m.width( width || this.button.outerWidth() );
	},
	
	// updates the number of selected items in the button
	update: function(){
		var o = this.options,
			$inputs = this.labels.find('input'),
			$checked = $inputs.filter(':checked'),
			value, numChecked = $checked.length;
		
		if(numChecked === 0){
			value = o.noneSelectedText;
		} else {
			if($.isFunction(o.selectedText)){
				value = o.selectedText.call(this, numChecked, $inputs.length, $checked.get());
			} else if( /\d/.test(o.selectedList) && o.selectedList > 0 && numChecked <= o.selectedList){
				value = $checked.map(function(){ return this.title; }).get().join(', ');
			} else {
				value = o.selectedText.replace('#', numChecked).replace('#', $inputs.length);
			}
		}
		this.button.contents()[1].nodeValue = value;
		return value;
	},

	// move up or down within the menu
	_traverse: function(keycode, start){
		var $start = $(start),
			moveToLast = (keycode === 38 || keycode === 37) ? true : false,
			
			// select the first li that isn't an optgroup label / disabled
			$next = $start.parent()[moveToLast ? 'prevAll' : 'nextAll']('li:not(.ui-multiselect-disabled, .ui-multiselect-optgroup-label)')[ moveToLast ? 'last' : 'first']();
		
		// if at the first/last element
		if(!$next.length){
			var $container = this.menu.find('ul:last');
			
			// move to the first/last
			this.menu.find('label')[ moveToLast ? 'last' : 'first' ]().trigger('mouseover');
			
			// set scroll position
			$container.scrollTop( moveToLast ? $container.height() : 0 );
			
		} else {
			$next.find('label').trigger('mouseover');
		}
	},

	_toggleChecked: function(flag, group){
		var $inputs = (group && group.length) ? group : this.labels.find('input');
		$inputs.not(':disabled').attr('checked', (flag ? 'checked' : '')); 
		this.optiontags.not('disabled').attr('selected', (flag ? 'selected' : ''));
		this.update();
	},

	_toggleDisabled: function(flag){
		this.button.attr('disabled', (flag ? 'disabled' : ''))[ flag ? 'addClass' : 'removeClass' ]('ui-state-disabled');
		this.menu.find('input').attr('disabled', (flag ? 'disabled' : '')).parent()[ flag ? 'addClass' : 'removeClass' ]('ui-state-disabled');
		this.element.attr('disabled', (flag ? 'disabled' : ''));
	},

	_getOtherInstances: function(){
		var element = this.element;

		return $.grep($.ech.multiselect.instances, function(el){
			return el !== element;
		});
	},
	
	// open the menu
	open: function(e){
		var self = this;
		
		// bail if the multiselectopen event returns false, this widget is disabled, or is already open 
		if( this._trigger('beforeopen') === false || this.button.hasClass('ui-state-disabled') || this._isOpen ){
			return;
		}
		
		// close other instances
		$.each(this._getOtherInstances(), function(){
			var $this = $(this);
			if($this.multiselect('isOpen')){
				$this.multiselect('close');
			}
		});

		var $container = this.menu.find('ul:last'),
			o = this.options,
			effect = o.show,
			speed = this.speed,
			pos = this.button.position();
		
		// calling select is active
		this.button.addClass('ui-state-active');
		
		// select the first option
		// triggering both mouseover and mouseover because 1.4.2+ has a bug where triggering mouseover
		// will actually trigger mouseenter.  the mouseenter trigger is there for when it's eventually fixed
		this.labels.first().trigger('mouseover').trigger('mouseenter').find('input').trigger('focus');
		
		// figure out opening effects/speeds
		if($.isArray(o.show)){
			effect = o.show[0];
			speed = o.show[1] || self.speed;
		}
		
		// position and show menu
		this.menu.css({ 
			top: pos.top+this.button.outerHeight(),
			left: pos.left
		}).show(effect, speed);
		
		this._isOpen = true;
		
		// set the scroll of the checkbox container
		$container.scrollTop(0).height(o.height);
		
		this._trigger('open');
		
		return this;
	},
	
	// close the menu
	close: function(){
		if(this._trigger('beforeclose') === false){
			return;
		}
	
		var self = this, o = this.options, effect = o.hide, speed = this.speed;
		
		// figure out opening effects/speeds
		if($.isArray(o.hide)){
			effect = o.hide[0];
			speed = o.hide[1] || this.speed;
		}
	
		this.menu.hide(effect, speed);
		this.button.removeClass('ui-state-active').trigger('blur').trigger('mouseleave');
		self._isOpen = false;
		
		this._trigger('close');
		
		return this;
	},

	enable: function(){
		this._toggleDisabled(false);
		return this;
	},
	
	disable: function(){
		this._toggleDisabled(true);
		return this;
	},
	
	checkAll: function(e){
		this._toggleChecked(true);
		this._trigger('checkAll');
	},
	
	uncheckAll: function(){
		this._toggleChecked(false);
		this._trigger('uncheckAll');
		return this;
	},
	
	destroy: function(){
		// remove classes + data
		$.Widget.prototype.destroy.call( this );

		// remove from instances array
		var element = this.element,
			position = $.inArray(element, $.ech.multiselect.instances);
	 
		// if this instance was found, splice it off
		if(position > -1){
			$.ech.multiselect.instances.splice(position, 1);
		}
		
		this.button.remove();
		this.menu.remove();
		this.element.show().find("option").removeAttr("disabled");
		this.element.append( this.optiontags );
		
		return this;
	},
	
	isOpen: function(){
		return this._isOpen;
	},
	
	widget: function(){
		return this.menu;
	},
	
	// react to option changes after initialization
	_setOption: function( key, value ){
		this.options[ key ] = value;
		
		switch(key){
			case "header":
				this.menu.find('div.ui-multiselect-header')[ value ? 'show' : 'hide' ]();
				break;
			case "checkAllText":
				this.menu.find('a.ui-multiselect-all span').eq(-1).text(value);
				break;
			case "uncheckAllText":
				this.menu.find('a.ui-multiselect-none span').eq(-1).text(value);
				break;
			case "height":
				this.menu.find('ul:last').height( parseInt(value,10) );
				break;
			case "minWidth":
				this.options[ key ] = parseInt(value,10);
				this._setButtonWidth();
				this._setMenuWidth();
				break;
			case "selectedText":
			case "selectedList":
			case "noneSelectedText":
				this.update();
				break;
		}
	}
});

$.extend($.ech.multiselect, {
	instances: []
});

})(jQuery);
