;(function($) {

	$.noty.layouts.inline = {
		name: 'inline',
		options: {},
		container: {
			object: '<ul id="noty_inline_layout_container" />',
			selector: 'ul#noty_inline_layout_container',
			style: function() {
				$(this).css({
					width: '100%',
					height: 'auto',
					margin: 0,
					padding: 0,
					listStyleType: 'none',
					zIndex: 9999999
				});
			}
		},
		parent: {
			object: '<li />',
			selector: 'li',
			css: {}
		},
		css: {
			display: 'none'
		},
		addClass: ''
	};

})(jQuery);