/*
 * bootstrap-filestyle
 * doc: http://dev.tudosobreweb.com.br/bootstrap-filestyle/
 * github: https://github.com/markusslima/bootstrap-filestyle
 *
 * Copyright (c) 2014 Markus Vinicius da Silva Lima
 * Version 1.1.0
 * Licensed under the MIT license.
 */
(function ($) {
    "use strict";

    var Filestyle = function (element, options) {
        this.options = options;
        this.$elementFilestyle = [];
        this.$element = $(element);
    };

    Filestyle.prototype = {
        clear: function () {
            this.$element.val('');
            this.$elementFilestyle.find(':text').val('');
        },

        destroy: function () {
            this.$element
                .removeAttr('style')
                .removeData('filestyle')
                .val('');
            this.$elementFilestyle.remove();
        },
        
        disabled: function (value) {
        	if (value === true) {
        		if (!this.options.disabled) {
	        		this.$element
		                .attr('disabled', 'true');
		            this.$elementFilestyle.find('label').attr('disabled', 'true');
		            this.options.disabled = true;
		        }
        	} else if (value === false) {
        		if (this.options.disabled) {
		            this.$element
		                .removeAttr('disabled');
		            this.$elementFilestyle.find('label').removeAttr('disabled');
		            this.options.disabled = false;
		        }
            } else {
                return this.options.disabled;
            }
        },
        
        buttonBefore: function (value) {
        	if (value === true) {
        		if (!this.options.buttonBefore) {
	        		this.options.buttonBefore = true;
	        		if (this.options.input) {
	        			this.$elementFilestyle.remove();
	        			this.constructor();
	        			this.pushNameFiles();
	        		}
	        	}
        	} else if (value === false) {
        		if (this.options.buttonBefore) {
		            this.options.buttonBefore = false;
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

        icon: function (value) {
            if (value === true) {
                if (!this.options.icon) {
                    this.options.icon = true;
                    this.$elementFilestyle.find('label').prepend(this.htmlIcon());
                }
            } else if (value === false) {
                if (this.options.icon) {
                    this.options.icon = false;
                    this.$elementFilestyle.find('.glyphicon').remove();
                }
            } else {
                return this.options.icon;
            }
        },

        input: function (value) {
            if (value === true) {
                if (!this.options.input) {
                    this.options.input = true;
                    
                    if (this.options.buttonBefore) {
                    	this.$elementFilestyle.append(this.htmlInput());
                    } else {
                    	this.$elementFilestyle.prepend(this.htmlInput());
                    }
                    
                    this.$elementFilestyle.find('.badge').remove();

                    var content = '',
                        files = [];
                    if (this.$element[0].files === undefined) {
                        files[0] = {'name': this.$element[0].value};
                    } else {
                        files = this.$element[0].files;
                    }

                    for (var i = 0; i < files.length; i++) {
                        content += files[i].name.split("\\").pop() + ', ';
                    }
                    if (content !== '') {
                        this.$elementFilestyle.find(':text').val(content.replace(/\, $/g, ''));
                    }
                    
                    this.$elementFilestyle.find('.group-span-filestyle').addClass('input-group-btn');
                }
            } else if (value === false) {
                if (this.options.input) {
                    this.options.input = false;
                    this.$elementFilestyle.find(':text').remove();
                    var files = [];
	                if (this.$element[0].files === undefined) {
	                    files[0] = {'name': this.$element[0].value};
	                } else {
	                    files = this.$element[0].files;
	                }
	                if (files.length > 0) {
	                	this.$elementFilestyle.find('label').append(' <span class="badge">'+files.length+'</span>');
	                }
	                this.$elementFilestyle.find('.group-span-filestyle').removeClass('input-group-btn');
                }
            } else {
                return this.options.input;
            }
        },
        
        size: function (value) {
        	if (value !== undefined) {
                var btn = this.$elementFilestyle.find('label'),
                    input = this.$elementFilestyle.find('input');
                    
                btn.removeClass('btn-lg btn-sm');
                input.removeClass('input-lg input-sm');
                if (value != 'nr') {
                	btn.addClass('btn-'+value);
                	input.addClass('input-'+value);
                }
            } else {
                return this.options.size;
            }
        },

        buttonText: function (value) {
            if (value !== undefined) {
                this.options.buttonText = value;
                this.$elementFilestyle.find('label span').html(this.options.buttonText);
            } else {
                return this.options.buttonText;
            }
        },

        buttonName: function (value) {
            if (value !== undefined) {
                this.options.buttonName = value;
                this.$elementFilestyle.find('label').attr({'class': 'btn '+this.options.buttonName});
            } else {
                return this.options.buttonName;
            }
        },

        iconName: function (value) {
            if (value !== undefined) {
                this.$elementFilestyle.find('.glyphicon').attr({'class': '.glyphicon ' + this.options.iconName});
            } else {
                return this.options.iconName;
            }
        },

        htmlIcon: function () {
            if (this.options.icon) {
                return '<span class="glyphicon '+this.options.iconName+'"></span> ';
            } else {
                return '';
            }
        },

        htmlInput: function () {
            if (this.options.input) {
                return '<input type="text" class="form-control '+(this.options.size=='nr'?'':'input-'+this.options.size)+'" disabled> ';
            } else {
                return '';
            }
        },
        
        // puts the name of the input files
        pushNameFiles: function () {
        	var content = '',
        	    files = [];
            if (this.$element[0].files === undefined) {
                files[0] = {'name': this.$element.value};
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
        },

        constructor: function () {
            var _self = this,
                html = '',
                id = this.$element.attr('id'),
                files = [],
                btn = '',
                $label,
                $labelFocusableContainer;

            if (id === '' || !id) {
                id = 'filestyle-'+$('.bootstrap-filestyle').length;
                this.$element.attr({'id': id});
            }
            
            btn = '<span class="group-span-filestyle '+(this.options.input ? 'input-group-btn' : '') +'">'+
            		  '<label for="'+id+'" class="btn '+this.options.buttonName+' '+(this.options.size=='nr'?'':'btn-'+this.options.size)+'" '+(this.options.disabled?'disabled="true"':'')+'>'+
                          this.htmlIcon()+this.options.buttonText+
                      '</label>'+
                  '</span>';

            html = this.options.buttonBefore ? btn+this.htmlInput() : this.htmlInput()+btn;

            this.$elementFilestyle = $('<div class="bootstrap-filestyle input-group">'+html+'</div>');

            $label = this.$elementFilestyle.find('label');
            $labelFocusableContainer = $label.parent();

            $labelFocusableContainer
                .attr('tabindex', "0")
                .keypress(function(e) {
                    if (e.keyCode === 13 || e.charCode === 32) {
                        $label.click();
                    }
                });

            // hidding input file and add filestyle
            this.$element
                .css({'position':'absolute','clip':'rect(0,0,0,0)'})
                .attr('tabindex', "-1")
                .after(this.$elementFilestyle);
                
            if (this.options.disabled) {
            	this.$element.attr('disabled', 'true');
            }

            // Getting input file value
            this.$element.change(function () {
                var content = '';
                if (this.files === undefined) {
                    files[0] = {'name': this.value};
                } else {
                    files = this.files;
                }

                for (var i = 0; i < files.length; i++) {
                    content += files[i].name.split("\\").pop() + ', ';
                }

                if (content !== '') {
                    _self.$elementFilestyle.find(':text').val(content.replace(/\, $/g, ''));
                } else {
                	_self.$elementFilestyle.find(':text').val('');
                }
                
                if (_self.options.input == false) {
                	if (_self.$elementFilestyle.find('.badge').length == 0) {
                		_self.$elementFilestyle.find('label').append(' <span class="badge">'+files.length+'</span>');
                	} else if (files.length == 0) {
                		_self.$elementFilestyle.find('.badge').remove();
                	} else {
                		_self.$elementFilestyle.find('.badge').html(files.length);
                	}
                } else {
                	_self.$elementFilestyle.find('.badge').remove();
                }
            });

            // Check if browser is Firefox
            if (window.navigator.userAgent.search(/firefox/i) > -1) {
                // Simulating choose file for firefox
                this.$elementFilestyle.find('label').click(function () {
                    _self.$element.click();
                    return false;
                });
            }
        }
    };

    var old = $.fn.filestyle;

    $.fn.filestyle = function (option, value) {
        var get = '',
            element = this.each(function () {
                if ($(this).attr('type') === 'file') {
                    var $this = $(this),
                        data = $this.data('filestyle'),
                        options = $.extend({}, $.fn.filestyle.defaults, option, typeof option === 'object' && option);

                    if (!data) {
                        $this.data('filestyle', (data = new Filestyle(this, options)));
                        data.constructor();
                    }

                    if (typeof option === 'string') {
                        get = data[option](value);
                    }
                }
            });

        if (typeof get !== undefined) {
            return get;
        } else {
            return element;
        }
    };

    $.fn.filestyle.defaults = {
        'buttonText': 'Choose file',
        'iconName': 'glyphicon-folder-open',
        'buttonName': 'btn-default',
        'size': 'nr',
        'input': true,
        'icon': true,
        'buttonBefore': false,
        'disabled': false
    };

    $.fn.filestyle.noConflict = function () {
        $.fn.filestyle = old;
        return this;
    };

    // Data attributes register
    $(function() {
        $('.filestyle').each(function () {
            var $this = $(this),
                options = {
                    
                    'input': $this.attr('data-input') === 'false' ? false : true,
                    'icon': $this.attr('data-icon') === 'false' ? false : true,
                    'buttonBefore': $this.attr('data-buttonBefore') === 'true' ? true : false,
                    'disabled': $this.attr('data-disabled') === 'true' ? true : false,
                    'size': $this.attr('data-size'),
                    'buttonText': $this.attr('data-buttonText'),
                    'buttonName': $this.attr('data-buttonName'),
                    'iconName': $this.attr('data-iconName')
                };
    
            $this.filestyle(options);
        });
    });
})(window.jQuery);
