// Desktop
(function($){
	var permission;
	var notify = function(title, options){
		// Memoize based on feature detection.
		if ("Notification" in window) {
			notify = function (title, options) {
				return new Notification(title, options);
			};
		} else if ("mozNotification" in navigator) {
			notify = function (title, options) {
				// Gecko < 22
				return navigator.mozNotification
					.createNotification(title, options.body, options.icon)
					.show();
			};
		} else if ("webkitNotifications" in window) {
			notify = function (title, options) {
				return window.webkitNotifications.createNotification(
					options.icon,
					title,
					options.body
				);
			};
		} else {
			notify = function (title, options) {
				return null;
			};
		}
		return notify(title, options);
	};


	PNotify.prototype.options.desktop = {
		// Display the notification as a desktop notification.
		desktop: false,
		// The URL of the icon to display. If false, no icon will show. If null, a default icon will show.
		icon: null
	};
	PNotify.prototype.modules.desktop = {
		init: function(notice, options){
			if (!options.desktop)
				return;
			permission = PNotify.desktop.checkPermission();
			if (permission != 0)
				return;
			if (options.icon === null) {
				options.icon = "http://sciactive.com/pnotify/includes/desktop/"+notice.options.type+".png";
			} else if (options.icon === false) {
				options.icon = null;
			}
			notice.desktop = notify(notice.options.title, {
				icon: options.icon,
				body: notice.options.text
			});
			if (!("close" in notice.desktop)) {
				notice.desktop = function(){
					notice.desktop.cancel();
				};
			}
			notice.desktop.onclick = function(){
				notice.elem.trigger("click");
			};
			notice.desktop.onclose = function(){
				if (notice.state !== "closing" && notice.state !== "closed") {
					notice.remove();
				}
			};
		},
		update: function(notice, options, oldOpts){
			if (permission != 0 || !options.desktop)
				return;
		},
		beforeOpen: function(notice, options){
			if (permission != 0 || !options.desktop)
				return;
			notice.elem.css({'left': '-10000px', 'display': 'none'});
		},
		afterOpen: function(notice, options){
			if (permission != 0 || !options.desktop)
				return;
			notice.elem.css({'left': '-10000px', 'display': 'none'});
			if ("show" in notice.desktop) {
				notice.desktop.show();
			}
		},
		beforeClose: function(notice, options){
			if (permission != 0 || !options.desktop)
				return;
			notice.elem.css({'left': '-10000px', 'display': 'none'});
		},
		afterClose: function(notice, options){
			if (permission != 0 || !options.desktop)
				return;
			notice.elem.css({'left': '-10000px', 'display': 'none'});
			notice.desktop.close();
		}
	};
	PNotify.desktop = {
		permission: function(){
			if (typeof Notification !== "undefined" && "requestPermission" in Notification) {
				Notification.requestPermission();
			} else if ("webkitNotifications" in window) {
				window.webkitNotifications.requestPermission();
			}
		},
		checkPermission: function(){
			if (typeof Notification !== "undefined" && "permission" in Notification) {
				return (Notification.permission == "granted" ? 0 : 1);
			} else if ("webkitNotifications" in window) {
				return window.webkitNotifications.checkPermission();
			} else {
				return 1;
			}
		}
	};
	permission = PNotify.desktop.checkPermission()
})(jQuery);
