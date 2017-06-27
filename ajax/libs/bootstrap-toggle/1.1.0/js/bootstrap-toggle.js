/*
* bootstrap-toggle v1.1
* -----------------------------------
* Copyright 2013 Min Hur, The New York Times Company
* This content is released under the MIT License.
*/
!function ($) {
	$(document).on('click.bootstrap-toggle', '[data-toggle^=toggle]', function() {
		var $toggle = $(this);
		var $input = $(this).find('input[type=checkbox]');
		if ($toggle.hasClass('off')) {
			$toggle.attr('class', 'toggle ' + $toggle.find('.toggle-on').attr('class').replace(/toggle-on/g,''));
			$input.prop('checked', true);
			$toggle.removeClass('off');
		} else {
			$toggle.attr('class', 'toggle ' + $toggle.find('.toggle-off').attr('class').replace(/toggle-off/g,''));
			$input.prop('checked', false);
			$toggle.addClass('off');
		}
		$input.change();
	});
}(window.jQuery);
