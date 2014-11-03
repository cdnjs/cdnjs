(function ($, a) {
	var world;

	$.fn.anima = function () {
		if (!world) {
			world = a.world();
		}

		var index = world.items.indexOf(this[0]),
		    item = index !== -1 ? world.items[index] : world.add(this[0]);

		return item;
	};
}(jQuery, anima));
