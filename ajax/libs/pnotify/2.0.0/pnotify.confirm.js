// Confirm
(function($){
	PNotify.prototype.options.confirm = {
		// Make a confirmation box.
		confirm: false,
		// Where to align the buttons. (right, center, left, justify)
		align: "right",
		// The buttons to display, and their callbacks.
		buttons: [
			{
				text: "Ok",
				addClass: "",
				click: function(notice){
					notice.get().trigger("pnotify.confirm");
					notice.remove();
				}
			},
			{
				text: "Cancel",
				addClass: "",
				click: function(notice){
					notice.get().trigger("pnotify.cancel");
					notice.remove();
				}
			}
		]
	};
	PNotify.prototype.modules.confirm = {
		// The div that contains the buttons.
		buttonContainer: null,

		init: function(notice, options){
			this.buttonContainer = $('<div style="margin-top:5px;clear:both;text-align:'+options.align+';" />').appendTo(notice.container);

			if (options.confirm)
				this.makeButtons(notice, options);
			else
				this.buttonContainer.hide();
		},

		update: function(notice, options){
			if (options.confirm) {
				this.makeButtons(notice, options);
				this.buttonContainer.show();
			} else {
				this.buttonContainer.hide().empty();
			}
		},

		makeButtons: function(notice, options) {
			var already = false, btn, elem;
			this.buttonContainer.empty();
			for (var i in options.buttons) {
				btn = options.buttons[i];
				if (already)
					this.buttonContainer.append(' ');
				else
					already = true;
				elem = $('<button type="button" class="'+notice.styles.btn+' '+btn.addClass+'">'+btn.text+'</button>')
				.appendTo(this.buttonContainer)
				.on("click", (function(btn){ return function(){
					if (typeof btn.click == "function") {
						btn.click(notice);
					}
				}})(btn));
				if (notice.styles.text) {
					elem.wrapInner('<span class="'+notice.styles.text+'"></span>');
				}
				if (notice.styles.btnhover) {
					elem.hover((function(elem){ return function(){
						elem.addClass(notice.styles.btnhover);
					}})(elem), (function(elem){ return function(){
						elem.removeClass(notice.styles.btnhover);
					}})(elem));
				}
				if (notice.styles.btnactive) {
					elem.on("mousedown", (function(elem){ return function(){
						elem.addClass(notice.styles.btnactive);
					}})(elem)).on("mouseup", (function(elem){ return function(){
						elem.removeClass(notice.styles.btnactive);
					}})(elem));
				}
				if (notice.styles.btnfocus) {
					elem.on("focus", (function(elem){ return function(){
						elem.addClass(notice.styles.btnfocus);
					}})(elem)).on("blur", (function(elem){ return function(){
						elem.removeClass(notice.styles.btnfocus);
					}})(elem));
				}
			}
		}
	};
	$.extend(PNotify.styling.jqueryui, {
		btn: "ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only",
		btnhover: "ui-state-hover",
		btnactive: "ui-state-active",
		btnfocus: "ui-state-focus",
		text: "ui-button-text"
	});
	$.extend(PNotify.styling.bootstrap2, {
		btn: "btn"
	});
	$.extend(PNotify.styling.bootstrap3, {
		btn: "btn btn-default"
	});
	$.extend(PNotify.styling.fontawesome, {
		btn: "btn btn-default"
	});
})(jQuery);
