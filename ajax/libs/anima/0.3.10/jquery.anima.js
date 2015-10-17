(function ($, a) {
	var world;

	$.fn.anima = function () {
		if (!world) {
			world = a.world();
		}

		var context = this;

		var items = $.map(context, function (elem) {
			var index = world.items.indexOf(elem);
			return index !== -1 ? world.items[index] : world.add(elem);
		});

		var fcall = function (fname, args) {
			$.each(items, function (_, item) {
				item[fname].apply(item, args);
			});
		};

		return {
			pause: function () {
				fcall('pause', arguments);
				return this;
			},
			resume: function () {
				fcall('resume', arguments);
				return this;
			},
			animate: function (transform, duration, ease, delay) {
				fcall('animate', arguments);
				return this;
			},
			exit: function () {
				return context;
			}
		}
	};
}(jQuery, anima));
