/*
 * bootstrap-filestyle
 * doc: http://markusslima.github.io/bootstrap-filestyle/
 * github: https://github.com/markusslima/bootstrap-filestyle
 *
 * Copyright (c) 2017 Markus Vinicius da Silva Lima
 * Version 1.3.0
 * Licensed under the MIT license.
 */
(function($) {
	"use strict";

    var nextId = 0;

	var Filestyle = function(element, options) {
		this.options = options;
		this.$elementFilestyle = [];
		this.$element = $(element);
	};

	Filestyle.prototype = {
		clear : function() {
			this.$element.val('');
			this.$elementFilestyle.find(':text').val('');
			this.$elementFilestyle.find('.badge').remove();
		},

		destroy : function() {
			this.$element.removeAttr('style').removeData('filestyle');
			this.$elementFilestyle.remove();
		},

		disabled : function(value) {
			if (value === true || value === false) {
				this.options.disabled = value;
				this.$element.prop('disabled', this.options.disabled);
				this.$elementFilestyle.find('label').prop('disabled', this.options.disabled);

				if (this.options.disabled)
					this.$elementFilestyle.find('label').css('opacity', '0.65');
				else
					this.$elementFilestyle.find('label').css('opacity', '1');
			} else {
				return this.options.disabled;
			}
		},

		buttonBefore : function(value) {
			if (value === true) {
				if (!this.options.buttonBefore) {
					this.options.buttonBefore = value;
					if (this.options.input) {
						this.$elementFilestyle.remove();
						this.constructor();
						this.pushNameFiles();
					}
				}
			} else if (value === false) {
				if (this.options.buttonBefore) {
					this.options.buttonBefore = value;
					if (this.options.input) {
						this.$elementFilestyle.remove();
						this.constructor();
						this.pushNameFiles();
					}
				}
			} else {
				return this.options.buttonBefore;
			}
		},
		
		input : function(value) {
			if (value === true) {
				if (!this.options.input) {
					this.options.input = value;

					if (this.options.buttonBefore) {
						this.$elementFilestyle.append(this.htmlInput());
					} else {
						this.$elementFilestyle.prepend(this.htmlInput());
					}

					this.pushNameFiles();
					this.$elementFilestyle.find('.group-span-filestyle').addClass('input-group-btn');
				}
			} else if (value === false) {
				if (this.options.input) {
					this.options.input = value;
					this.$elementFilestyle.find(':text').remove();
					this.$elementFilestyle.find('.group-span-filestyle').removeClass('input-group-btn');
				}
			} else {
				return this.options.input;
			}
		},

		size : function(value) {
			if (value !== undefined) {
				this.options.size = value;
				var btn = this.$elementFilestyle.find('label'), input = this.$elementFilestyle.find('input');

				btn.removeClass('btn-lg btn-sm');
				input.removeClass('form-control-lg form-control-sm');
				if (this.options.size != 'nr') {
					btn.addClass('btn-' + this.options.size);
					input.addClass('form-control-' + this.options.size);
				}
			} else {
				return this.options.size;
			}
		},
		
		placeholder : function(value) {
			if (value !== undefined) {
				this.options.placeholder = value;
				this.$elementFilestyle.find('input').attr('placeholder', value);
			} else {
				return this.options.placeholder;
			}
		},		

		text : function(value) {
			if (value !== undefined) {
				this.options.text = value;
				this.$elementFilestyle.find('label .text').html(this.options.text);
			} else {
				return this.options.text;
			}
		},
		
		btnClass : function(value) {
			if (value !== undefined) {
				this.options.btnClass = value;
				this.$elementFilestyle.find('label').attr({
					'class' : 'btn ' + this.options.btnClass + ' btn-' + this.options.size
				});
			} else {
				return this.options.btnClass;
			}
		},

		badge : function(value) {
			if (value === true) {
				this.options.badge = value;
				var files = this.pushNameFiles();
				this.$elementFilestyle.find('label').append(' <span class="badge '+this.options.badgeName+'">' + files.length + '</span>');
			} else if (value === false) {
				this.options.badge = value;
				this.$elementFilestyle.find('.badge').remove();
			} else {
				return this.options.badge;
			}
		},

		badgeName : function(value) {
			if (value !== undefined) {
				this.options.badgeName = value;
				this.$elementFilestyle.find('.badge').attr({
					'class' : 'badge ' + this.options.badgeName
				});
			} else {
				return this.options.badgeName;
			}
		},

		htmlIcon : function(value) {
			if (value !== undefined) {
				this.options.htmlIcon = value;
			}

			return this.options.htmlIcon;
		},

		htmlInput : function() {
			if (this.options.input) {
				return '<input type="text" class="form-control ' + (this.options.size == 'nr' ? '' : 'form-control-' + this.options.size) + '" placeholder="'+ this.options.placeholder +'" disabled> ';
			} else {
				return '';
			}
		},

		// puts the name of the input files
		// return files
		pushNameFiles : function() {
			var content = '', files = [];
			if (this.$element[0].files === undefined) {
				files[0] = {
					'name' : this.$element[0] && this.$element[0].value
				};
			} else {
				files = this.$element[0].files;
			}

			for (var i = 0; i < files.length; i++) {
				content += files[i].name.split("\\").pop() + ', ';
			}

			if (content !== '') {
				this.$elementFilestyle.find(':text').val(content.replace(/\, $/g, ''));
			} else {
				this.$elementFilestyle.find(':text').val('');
			}
			
			return files;
		},

		constructor : function() {
			var _self = this, 
				html = '', 
				id = _self.$element.attr('id'), 
				files = [], 
				btn = '', 
				$label;

			if (id === '' || !id) {
				id = 'filestyle-' + nextId;
				_self.$element.attr({
					'id' : id
				});
                nextId++;
			}

			btn = '<span class="group-span-filestyle ' + (_self.options.input ? 'input-group-btn' : '') + '">' + 
			  '<label for="' + id + '" style="margin-bottom: 0;" class="btn ' + _self.options.btnClass + ' ' +
			(_self.options.size == 'nr' ? '' : 'btn-' + _self.options.size) + '" ' + 
			(_self.options.disabled || _self.$element.attr('disabled') ? ' disabled="true"' : '') + '>' + 
			_self.htmlIcon() + '<span class="buttonText">' + _self.options.text + '</span>' + 
			  '</label>' + 
			  '</span>';
			
			html = _self.options.buttonBefore ? btn + _self.htmlInput() : _self.htmlInput() + btn;
			
			_self.$elementFilestyle = $('<div class="bootstrap-filestyle input-group">' + html + '</div>');
			_self.$elementFilestyle.find('.group-span-filestyle').attr('tabindex', "0").keypress(function(e) {
			if (e.keyCode === 13 || e.charCode === 32) {
				_self.$elementFilestyle.find('label').click();
					return false;
				}
			});

			// hidding input file and add filestyle
			_self.$element.css({
				'position' : 'absolute',
				'clip' : 'rect(0px 0px 0px 0px)' // using 0px for work in IE8
			}).attr('tabindex', "-1").after(_self.$elementFilestyle);

			if (_self.options.disabled || _self.$element.attr('disabled')) {
				_self.$element.attr('disabled', 'true');
				if (_self.options.disabled)
					_self.$elementFilestyle.find('label').css('opacity', '0.65');
				else
					_self.$elementFilestyle.find('label').css('opacity', '1');
			}

			// Getting input file value
			_self.$element.change(function() {
				var files = _self.pushNameFiles();
				if (_self.options.badge) {
					if (_self.$elementFilestyle.find('.badge').length == 0) {
						_self.$elementFilestyle.find('label').append(' <span class="badge '+_self.options.badgeName+'">' + files.length + '</span>');
					} else if (files.length == 0) {
						_self.$elementFilestyle.find('.badge').remove();
					} else {
						_self.$elementFilestyle.find('.badge').html(files.length);
					}
				} else {
					_self.$elementFilestyle.find('.badge').remove();
				}

				_self.options.onChange(files);
			});

			// Check if browser is Firefox
			if (window.navigator.userAgent.search(/firefox/i) > -1) {
				// Simulating choose file for firefox
				_self.$elementFilestyle.find('label').click(function() {
					_self.$element.click();
					return false;
				});
			}
		}
	};

	var old = $.fn.filestyle;

	$.fn.filestyle = function(option, value) {
		var get = '', element = this.each(function() {
			if ($(this).attr('type') === 'file') {
				var $this = $(this), data = $this.data('filestyle'), options = $.extend({}, $.fn.filestyle.defaults, option, typeof option === 'object' && option);

				if (!data) {
					$this.data('filestyle', ( data = new Filestyle(this, options)));
					data.constructor();
				}

				if ( typeof option === 'string') {
					get = data[option](value);
				}
			}
		});

		if ( typeof get !== undefined) {
			return get;
		} else {
			return element;
		}
	};

	$.fn.filestyle.defaults = {
		'text' : 'Choose file',
		'htmlIcon' : '',
		'btnClass' : 'btn-secondary',
		'size' : 'nr',
		'input' : true,
		'badge' : false,
		'badgeName': 'badge-light',
		'buttonBefore' : false,
		'disabled' : false,
		'placeholder': '',
		'onChange': function () {}
	};

	$.fn.filestyle.noConflict = function() {
		$.fn.filestyle = old;
		return this;
	};

	$(function() {
		$('.filestyle').each(function() {
			var $this = $(this), options = {
				'input' : $this.attr('data-input') !== 'false',
				'htmlIcon' : $this.attr('data-icon'),
				'buttonBefore' : $this.attr('data-buttonBefore') === 'true',
				'disabled' : $this.attr('data-disabled') === 'true',
				'size' : $this.attr('data-size'),
				'text' : $this.attr('data-text'),
				'btnClass' : $this.attr('data-btnClass'),
				'badge' : $this.attr('data-badge') === 'true',
				'badgeName' : $this.attr('data-badgeName'),
				'placeholder': $this.attr('data-placeholder')
			};

			$this.filestyle(options);
		});
	});
})(window.jQuery);
