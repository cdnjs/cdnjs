(function($) {
	function SlickColumnPicker(columns,grid)
	{
		var $menu;

		function init() {
			grid.onHeaderContextMenu = displayContextMenu;

			$menu = $("<span class='slick-columnpicker' style='display:none;position:absolute;z-index:20;' />").appendTo(document.body);

			$menu.bind("mouseleave", function(e) { $(this).fadeOut() });
			$menu.bind("click", updateColumn);

		}

		function displayContextMenu(e)
		{
			$menu.empty();

			var $li, $input;
			for (var i=0; i<columns.length; i++) {
				$li = $("<li />").appendTo($menu);

				$input = $("<input type='checkbox' />")
                        .attr("id", "columnpicker_" + i)
                        .data("id", columns[i].id)
                        .appendTo($li);

				if (!columns[i].hidden)
					$input.attr("checked","checked");

				$("<label for='columnpicker_" + i + "' />")
					.text(columns[i].name)
					.appendTo($li);
			}

			$("<hr/>").appendTo($menu);
			$li = $("<li />").appendTo($menu);
			$input = $("<input type='checkbox' id='autoresize' />").appendTo($li);
			$("<label for='autoresize'>Force Fit Columns</label>").appendTo($li);
			if (grid.getOptions().forceFitColumns)
				$input.attr("checked", "checked");

			$li = $("<li />").appendTo($menu);
			$input = $("<input type='checkbox' id='syncresize' />").appendTo($li);
			$("<label for='syncresize'>Synchronous Resizing</label>").appendTo($li);
			if (grid.getOptions().syncColumnCellResize)
				$input.attr("checked", "checked");

			$menu
				.css("top", e.pageY - 10)
				.css("left", e.pageX - 10)
				.fadeIn();
		}

		function updateColumn(e)
		{
			if (e.target.id == 'autoresize') {
				if (e.target.checked) {
					grid.setOptions({forceFitColumns: true});
					grid.autosizeColumns();
				} else {
					grid.setOptions({forceFitColumns: false});
				}
				return;
			}

			if (e.target.id == 'syncresize') {
				if (e.target.checked) {
					grid.setOptions({syncColumnCellResize: true});
				} else {
					grid.setOptions({syncColumnCellResize: false});
				}
				return;
			}

			if ($(e.target).is(":checkbox")) {
				if ($menu.find(":checkbox:checked").length == 0) {
					$(e.target).attr("checked","checked");
					return;
				}

				var id =$(e.target).data("id");
				for (var i=0; i<columns.length; i++) {
					if (columns[i].id == id) {
						columns[i].hidden = !$(e.target).is(":checked");
						grid.setColumnVisibility(columns[i], $(e.target).is(":checked"));
						return;
					}
				}
			}
		}


		init();
	}

	// Slick.Controls.ColumnPicker
	$.extend(true, window, { Slick: { Controls: { ColumnPicker: SlickColumnPicker }}});
})(jQuery);
