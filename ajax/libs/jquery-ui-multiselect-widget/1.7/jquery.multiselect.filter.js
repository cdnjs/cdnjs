/*
 * jQuery MultiSelect UI Widget Filtering Plugin 1.0
 * Copyright (c) 2010 Eric Hynds
 *
 * http://www.erichynds.com/jquery/jquery-ui-multiselect-widget/
 *
 * Depends:
 *   - jQuery UI MultiSelect widget
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
*/
(function($){
	$.widget("ech.multiselectfilter", {
		
		options: {
			label: "Filter:",
			width: null, /* override default width set in css file (px). null will inherit */
			placeholder: "Enter keywords"
		},
		
		_create: function(){
			var self = this,
				opts = this.options,
				instance = (this.instance = $(this.element).data("multiselect")),
				
				// store header; add filter class so the close/check all/uncheck all links can be positioned correctly
				header = (this.header = instance.menu.find(".ui-multiselect-header").addClass("ui-multiselect-hasfilter")),
				
				// wrapper elem
				wrapper = (this.wrapper = $('<div class="ui-multiselect-filter">'+(opts.label.length ? opts.label : '')+'<input placeholder="'+opts.placeholder+'" type="search"' + (/\d/.test(opts.width) ? 'style="width:'+opts.width+'px"' : '') + ' /></div>').prependTo( this.header ));

			// reference to the actual inputs
			this.inputs = instance.menu.find(":checkbox, :radio");
			
			// build the input box
			this.input = wrapper
			.find("input")
			.bind("keydown", function( e ){
				// prevent the enter key from submitting the form / closing the widget
				if( e.which === 13 ){
					e.preventDefault();
				}
			})
			.bind("keyup", $.proxy(self._handler, self) )
			.bind("click", function(){
				if( !this.value.length ){
					self._handler();
				}
			});
			
			// cache input values for searching
			this.updateCache();
			
			// each list item
			this.rows = instance.menu.find(".ui-multiselect-checkboxes li:not(.ui-multiselect-optgroup-label)");
		
			// rewrite internal _toggleChecked fn so that when checkAll/uncheckAll is fired,
			// only the currently filtered elements are checked
			instance._toggleChecked = function(flag, group){
				var $inputs = (group && group.length) 
						? group
						: this.labels.find('input'),
					
					// do not include hidden elems if the menu isn't open.
					selector = self.instance._isOpen
						? ":disabled, :hidden"
						: ":disabled";
						
				$inputs.not( selector ).attr('checked', (flag ? 'checked' : '')); 
				this.update();
				this.element.children().not('disabled').attr('selected', (flag ? 'selected' : ''));
			};
		},
		
		// thx for the logic here ben alman
		_handler: function( e ){
			var term = $.trim( this.input[0].value.toLowerCase() ),
			
				// speed up references
				rows = this.rows, inputs = this.inputs, cache = this.cache;
			
			if( !term ){
				rows.show();
			} else {
				rows.hide();

				var regex = new RegExp(term, 'gi');
				this._trigger( "filter", e, $.map(cache, function(v,i){
					if( v.search(regex) !== -1 ){
						rows.eq(i).show();
						return inputs.get(i);
					}
					
					return null;
				}));
			}
		},
		
		updateCache: function(){
			this.cache = this.element.children().map(function(){
				var self = $(this);
				
				// account for optgroups
				if( this.tagName.toLowerCase() === "optgroup" ){
					self = self.children();
				}
				
				// see _create() in jquery.multiselect.js
				if( !self.val().length ){
					return null;
				}
				
				return self.map(function(){
					return this.innerHTML.toLowerCase();
				}).get();
			}).get();
		},
		
		widget: function(){
			return this.wrapper;
		},
		
		destroy: function(){
			$.Widget.prototype.destroy.call( this );
			this.input.val('').trigger("keyup");
			this.wrapper.remove();
		}
	});
})(jQuery);
