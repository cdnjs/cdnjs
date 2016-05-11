/*
 * bootstrap-filestyle
 * http://dev.tudosobreweb.com.br/bootstrap-filestyle/
 *
 * Copyright (c) 2014 Markus Vinicius da Silva Lima
 * Version 1.0.5
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
                    this.$elementFilestyle.find('i').remove();
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
                    
                    this.$elementFilestyle.find('.quant-files-filestyle').remove();

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
	                	var style;
	                	if (this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i) !== -1) {
		                    style = 'style="background-color: #fff !important; color: 000;"';
		                } else {
		                	style = 'style="background-color: #000 !important; color: fff;"';
		                }
	                	this.$elementFilestyle.find('label').append(' <span '+style+' class="quant-files-filestyle badge">'+files.length+'</span>');
	                }
                }
            } else {
                return this.options.input;
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

        classButton: function (value) {
            if (value !== undefined) {
                this.options.classButton = value;
                this.$elementFilestyle.find('label').attr({'class': this.options.classButton});
                if (this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i) !== -1) {
                    this.$elementFilestyle.find('label i').addClass('icon-white');
                } else {
                    this.$elementFilestyle.find('label i').removeClass('icon-white');
                }
            } else {
                return this.options.classButton;
            }
        },

        classIcon: function (value) {
            if (value !== undefined) {
                this.options.classIcon = value;
                if (this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i) !== -1) {
                    this.$elementFilestyle.find('label').find('i').attr({'class': 'icon-white '+this.options.classIcon});
                } else {
                    this.$elementFilestyle.find('label').find('i').attr({'class': this.options.classIcon});
                }
            } else {
                return this.options.classIcon;
            }
        },

        classInput: function (value) {
            if (value !== undefined) {
                this.options.classInput = value;
                this.$elementFilestyle.find(':text').addClass(this.options.classInput);
            } else {
                return this.options.classInput;
            }
        },

        htmlIcon: function () {
            if (this.options.icon) {
                var colorIcon = '';
                if (this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i) !== -1) {
                    colorIcon = ' icon-white ';
                }

                return '<i class="'+colorIcon+this.options.classIcon+'"></i> ';
            } else {
                return '';
            }
        },

        htmlInput: function () {
            if (this.options.input) {
                return '<input type="text" class="'+this.options.classInput+'" disabled> ';
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
                files = [];

            if (id === '' || !id) {
                id = 'filestyle-'+$('.bootstrap-filestyle').length;
                this.$element.attr({'id': id});
            }

            if(this.options.buttonBefore) {
                html = '<label for="'+id+'" style="margin-right: 4px;" class="'+this.options.classButton+'" '+(this.options.disabled?'disabled="true"':'')+'>'+
                           this.htmlIcon()+
                           '<span>'+this.options.buttonText+'</span>'+
                       '</label>'+
                   	   this.htmlInput();
            } else {
                html = this.htmlInput()+
                       '<label for="'+id+'" class="'+this.options.classButton+'" '+(this.options.disabled?'disabled="true"':'')+'> '+
                           this.htmlIcon()+
                    	   '<span>'+this.options.buttonText+'</span>'+
                	   '</label>';
            }

            this.$elementFilestyle = $('<div class="bootstrap-filestyle" style="display: inline-block;">'+html+'</div>');

            var $label = this.$elementFilestyle.find('label');
            var $labelFocusableContainer = $label.parent();

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
                	var style;
                	if (_self.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i) !== -1) {
	                    style = 'style="background-color: #fff !important; color: #000;"';
	                } else {
	                	style = 'style="background-color: #000 !important; color: #fff;"';
	                }
                	if (_self.$elementFilestyle.find('.quant-files-filestyle').length == 0) {
                		_self.$elementFilestyle.find('label').append(' <span '+style+' class="quant-files-filestyle badge">'+files.length+'</span>');
                	} else if (files.length == 0) {
                		_self.$elementFilestyle.find('.quant-files-filestyle').remove();
                	} else {
                		_self.$elementFilestyle.find('.quant-files-filestyle').html(files.length);
                	}
                } else {
                	_self.$elementFilestyle.find('.quant-files-filestyle').remove();
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
        'input': true,
        'icon': true,
        'buttonBefore': false,
        'disabled': false,

        'classButton': 'btn btn-default',
        'classInput': 'input-large',
        'classIcon': 'icon-folder-open'
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
                    
                    'buttonText': $this.attr('data-buttonText'),
                    'classButton': $this.attr('data-classButton'),
                    'classInput': $this.attr('data-classInput'),
                    'classIcon': $this.attr('data-classIcon'),
                    'disabled': $this.attr('data-disabled') === 'true' ? true : false,
                };
    
            $this.filestyle(options);
        });
    });
})(window.jQuery);
