/*
 * jQuery MultiSelect UI Widget 1.4.1
 * Copyright (c) 2010 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
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
		multiple: true,
		position: {}
	},

	_create: function(){
		var self = this,
			el = this.element,
			o = this.options,
			html = [],
			optgroups = [], 
			title = el.attr('title'),
			id = el.id || multiselectID++; // unique ID for the label & option tags
		
		this.speed = 400; // default speed for effects. UI's default is 400. TODO move to options?
		this._isOpen = false; // assume no
	
		// the actual button
		html.push('<button type="button" class="ui-multiselect ui-widget ui-state-default ui-corner-all"');
		if(title.length){
			html.push(' title="'+title+'"');
		}
		html.push('><span class="ui-icon ui-icon-triangle-2-n-s"></span><span>'+ o.noneSelectedText +'</span></button>');
		
		// start menu container
		html.push('<div class="ui-multiselect-menu ui-widget ui-widget-content ui-corner-all">');
	
		// header
		html.push('<div class="ui-widget-header ui-corner-all ui-multiselect-header ui-helper-clearfix">');
		html.push('<ul class="ui-helper-reset">');
		if(o.header === true){
			html.push('<li><a class="ui-multiselect-all" href="#"><span class="ui-icon ui-icon-check"></span><span>' + o.checkAllText + '</span></a></li>');
			html.push('<li><a class="ui-multiselect-none" href="#"><span class="ui-icon ui-icon-closethick"></span><span>' + o.uncheckAllText + '</span></a></li>');
		} else if(typeof o.header === "string"){
			html.push('<li>'+o.header+'</li>');
		}
		html.push('<li class="ui-multiselect-close"><a href="#" class="ui-multiselect-close"><span class="ui-icon ui-icon-circle-close"></span></a></li>');
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
				html.push('<label for="'+inputID+'" class="'+labelClasses.join(' ')+ '"><input id="'+inputID+'" type="'+(o.multiple ? "checkbox" : "radio")+'" value="'+value+'" title="'+title+'"');
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
		this.button			= el.hide().after( html.join('') ).next('button');
		this.menu			= this.button.next('div.ui-multiselect-menu');
		this.labels			= this.menu.find('label');
		this.buttonlabel 	= this.button.find('span').eq(-1);

		// set widths
		this._setButtonWidth();
		this._setMenuWidth();
		
		// perform event bindings
		this._bindEvents();
		
		// update the number of selected elements when the page initially loads,
		// and use that as the defaultValue.  necessary for form resets when
		// options are pre-selected.
		this.button[0].defaultValue = this.update();
	},
	
	_init: function(){
		if(!this.options.header){
			this.menu.find('div.ui-multiselect-header').hide();
		}
		if(this.options.autoOpen){
			this.open();
		}
		if(this.element.is(':disabled')){
			this.disable();
		}
	},
	
	// binds events
	_bindEvents: function(){
		var self = this;
		
		function clickHandler( e ){
			self[ self._isOpen ? 'close' : 'open' ]();
			e.preventDefault();
		}
		
		// webkit doesn't like it when you click on the span :(
		this.button.find('span').bind('click', clickHandler);
		
		// button events
		this.button.bind({
			click: clickHandler,
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
				$inputs = $this.parent().nextUntil('li.ui-multiselect-optgroup-label').find('input:visible');
				
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
			if( !$(this).hasClass('ui-state-disabled') ){
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
			var $this = $(this),
				val = this.value,
				checked = this.checked;
			
			// bail if this input is disabled or the event is cancelled
			if( $this.is(':disabled') || self._trigger('click', e, { value:this.value, text:this.title, checked:checked }) === false ){
				e.preventDefault();
				return;
			}
			
			// set the original option tag to selected
			self.element.find('option').filter(function(){
				return this.value === val;
			}).attr('selected', (checked ? 'selected' : ''));
			
			// issue 14: if this event is natively fired, the box will be checked
			// before running the update.  using trigger(), the events fire BEFORE
			// the box is checked. http://dev.jquery.com/ticket/3827
			self.update( !e.originalEvent ? checked ? -1 : 1 : 0 );
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
		var $inputs = (group && group.length) 
			? group
			: this.labels.find('input');
		
		// toggle state on inputs
		$inputs.not(':disabled').attr('checked', (flag ? 'checked' : '')); 
		
		this.update();
		
		// toggle state on original option tags
		this.element.find('option').not(':disabled').attr('selected', (flag ? 'selected' : ''));
	},

	_toggleDisabled: function(flag){
		this.button.attr('disabled', (flag ? 'disabled' : ''))[ flag ? 'addClass' : 'removeClass' ]('ui-state-disabled');
		this.menu.find('input').attr('disabled', (flag ? 'disabled' : '')).parent()[ flag ? 'addClass' : 'removeClass' ]('ui-state-disabled');
		this.element.attr('disabled', (flag ? 'disabled' : ''));
	},

	// updates the number of selected items in the button
	update: function( offset ){
		var o = this.options,
			$inputs = this.labels.find('input'),
			$checked = $inputs.filter(':checked'),
			numChecked = $checked.length,
			value;
		
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
		
		this.buttonlabel.html( value );
		return value;
	},
	
	// open the menu
	open: function(e){
		var self = this;
	
		// bail if the multiselectopen event returns false, this widget is disabled, or is already open 
		if( this._trigger('beforeopen') === false || this.button.hasClass('ui-state-disabled') || this._isOpen ){
			return;
		}
		
		// close other instances
		$(':ech-multiselect').not(this.element).each(function(){
			var $this = $(this);
			
			if( $this.multiselect('isOpen') ){
				$this.multiselect('close');
			}
		});

		var $container = this.menu.find('ul:last'),
			o = this.options,
			effect = o.show,
			speed = this.speed,
			pos = this.button.position();
		
		// figure out opening effects/speeds
		if( $.isArray(o.show) ){
			effect = o.show[0];
			speed = o.show[1] || self.speed;
		}
		
		// set the scroll of the checkbox container
		$container.scrollTop(0).height(o.height);
		
		// position and show menu
		if( $.ui.position && !$.isEmptyObject(o.position) ){
			o.position.of = o.position.of || this.button;
			
			this.menu
				.show()
				.position( o.position )
				.hide()
				.show( effect, speed );
		
		// if position utility is not available...
		} else {
			this.menu.css({ 
				top: pos.top+this.button.outerHeight(),
				left: pos.left
			}).show( effect, speed );
		}
		
		// select the first option
		// triggering both mouseover and mouseover because 1.4.2+ has a bug where triggering mouseover
		// will actually trigger mouseenter.  the mouseenter trigger is there for when it's eventually fixed
		this.labels.eq(0).trigger('mouseover').trigger('mouseenter').find('input').trigger('focus');
		
		this.button.addClass('ui-state-active');
		this._isOpen = true;
		this._trigger('open');
	},
	
	// close the menu
	close: function(){
		if(this._trigger('beforeclose') === false){
			return;
		}
	
		var self = this, o = this.options, effect = o.hide, speed = this.speed;
		
		// figure out opening effects/speeds
		if( $.isArray(o.hide) ){
			effect = o.hide[0];
			speed = o.hide[1] || this.speed;
		}
	
		this.menu.hide(effect, speed);
		this.button.removeClass('ui-state-active').trigger('blur').trigger('mouseleave');
		this._trigger('close');
		this._isOpen = false;
	},

	enable: function(){
		this._toggleDisabled(false);
	},
	
	disable: function(){
		this._toggleDisabled(true);
	},
	
	checkAll: function(e){
		this._toggleChecked(true);
		this._trigger('checkAll');
	},
	
	uncheckAll: function(){
		this._toggleChecked(false);
		this._trigger('uncheckAll');
	},
	
	getChecked: function(){
		return this.menu.find('input').filter(':checked');
	},
	
	destroy: function(){
		// remove classes + data
		$.Widget.prototype.destroy.call( this );
		
		this.button.remove();
		this.menu.remove();
		this.element.show();
		
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

})(jQuery);
