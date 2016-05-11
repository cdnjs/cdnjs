/*
 * Filestyle-bootstrap
 * http://markusslima.github.com/Filestyle-bootstrap/
 *
 * Copyright (c) 2012 Markus Lima
 * Licensed under the MIT license.
 */

(function ($) {
    "use strict";
    // Register plugin
    $.fn.filestyle = function (options) {
		if (typeof options === 'object' || typeof options === 'undefined'){
			var defaults = {
					buttonText : 'Choose file',
					textField : true,
					icon : false,
					classButton : '',
					classText : '',
					classIcon : 'icon-folder-open'
				};

			options = $.extend(defaults, options);

			return this.each(function () {
				var $this = $(this);

				$this.data('filestyle', true);

				$this
					.css({'position':'fixed','top':'-100px','left':'-100px'})
					.parent()
					.addClass("form-search")
					.append(
						(options.textField ? '<input type="text" class="'+options.classText+'" disabled size="40" /> ' : '')+
						'<button type="button" class="btn '+options.classButton+'" >'+
							(options.icon ? '<i class="'+options.classIcon+'"></i> ' : '')+
							options.buttonText+
						'</button>'
					);

				$this.change(function () {
					$this.parent().children(':text').val($(this).val());
				});

				
				// Add event click
				$this.parent().children(':button').click(function () {
					$this.click();
				});
			});
		} else {
			return this.each(function () {
				var $this = $(this);
				if ($this.data('filestyle') === true && options === 'clear') {
					$this.parent().children(':text').val('');
					$this.val('');
				} else {
					window.console.error('Method filestyle not defined!');
				}
			});
		}
    };
}(jQuery));
