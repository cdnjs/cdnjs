(function($) {
	function SlickColumnPicker(columns,grid,options)
	{
		var $menu;

		var defaults = {
			fadeSpeed: 250
		};

		function init() {
			grid.onHeaderContextMenu = displayContextMenu;
			options = $.extend({}, defaults, options);

			$menu = $("<span class='slick-columnpicker' style='display:none;position:absolute;z-index:20;' />").appendTo(document.body);

			$menu.bind("mouseleave", function(e) { $(this).fadeOut(options.fadeSpeed) });
			$menu.bind("click", updateColumn);

		}

		function displayContextMenu(e)
		{
			$menu.empty();

            var visibleColumns = grid.getColumns();
			var $li, $input;
			for (var i=0; i<columns.length; i++) {
				$li = $("<li />").appendTo($menu);

				$input = $("<input type='checkbox' />")
                        .attr("id", "columnpicker_" + i)
                        .data("id", columns[i].id)
                        .appendTo($li);

                if (grid.getColumnIndex(columns[i].id) != null)
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
				.fadeIn(options.fadeSpeed);
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

                var visibleColumns = [];
                $menu.find(":checkbox[id^=columnpicker]").each(function(i,e) {
                    if ($(this).is(":checked")) {
                        visibleColumns.push(columns[i]);
                    }
                });
                grid.setColumns(visibleColumns);
			}
		}


		init();
	}

	// Slick.Controls.ColumnPicker
	$.extend(true, window, { Slick: { Controls: { ColumnPicker: SlickColumnPicker }}});
})(jQuery);
