// Stupid jQuery table plugin.

(function($) {
  $.fn.stupidtable = function(sortFns) {
    return this.each(function() {
      var $table = $(this);
      sortFns = sortFns || {};
      sortFns = $.extend({}, $.fn.stupidtable.default_sort_fns, sortFns);
      $table.data('sortFns', sortFns);

      $table.on("click.stupidtable", "thead th", function() {
          $(this).stupidsort();
      });

      // Sort th immediately if data-sort-onload="yes" is specified. Limit to
      // the first one found - only one default sort column makes sense anyway.
      var $th_onload_sort = $table.find("th[data-sort-onload=yes]").eq(0);
      $th_onload_sort.stupidsort();
    });
  };

  // Allow specification of settings on a per-table basis. Call on a table
  // jquery object. Call *before* calling .stuidtable();
  $.fn.stupidtable_settings = function(settings) {
    return this.each(function() {
      var $table = $(this);
      var final_settings = $.extend({}, $.fn.stupidtable.default_settings, settings);
      $table.stupidtable.settings = final_settings;
    });
  };


  // Expects $("#mytable").stupidtable() to have already been called.
  // Call on a table header.
  $.fn.stupidsort = function(force_direction){
    var $this_th = $(this);
    var th_index = 0; // we'll increment this soon
    var dir = $.fn.stupidtable.dir;
    var $table = $this_th.closest("table");
    var datatype = $this_th.data("sort") || null;

    // Bring in default settings if none provided
    if(!$table.stupidtable.settings){
        $table.stupidtable.settings = $.extend({}, $.fn.stupidtable.default_settings);
    }

    // No datatype? Nothing to do.
    if (datatype === null) {
      return;
    }

    var sortFns = $table.data('sortFns');
    var sortMethod = sortFns[datatype];

    // =========================================================
    // End var setup, begin sorting procedures
    // =========================================================

    // Account for colspans
    $this_th.parents("tr").find("th").slice(0, $(this).index()).each(function() {
      var cols = $(this).attr("colspan") || 1;
      th_index += parseInt(cols,10);
    });

    var sort_dir;
    if(arguments.length == 1){
        sort_dir = force_direction;
    }
    else{
        sort_dir = force_direction || $this_th.data("sort-default") || dir.ASC;
        if ($this_th.data("sort-dir"))
           sort_dir = $this_th.data("sort-dir") === dir.ASC ? dir.DESC : dir.ASC;
    }

    $this_th.data("sort-dir", sort_dir);

    $table.trigger("beforetablesort", {column: th_index, direction: sort_dir, $th: $this_th});

    // More reliable method of forcing a redraw
    $table.css("display");

    // Run sorting asynchronously on a timout to force browser redraw after
    // `beforetablesort` callback. Also avoids locking up the browser too much.
    setTimeout(function() {
      // Gather the elements for this column
      var column = [];
      var trs = $table.children("tbody").children("tr");

      // Extract the data for the column that needs to be sorted and pair it up
      // with the TR itself into a tuple. This way sorting the values will
      // incidentally sort the trs.
      trs.each(function(index,tr) {
        var $e = $(tr).children().eq(th_index);
        var sort_val = $e.data("sort-value");

        // Store and read from the .data cache for display text only sorts
        // instead of looking through the DOM every time
        if(typeof(sort_val) === "undefined"){
          var txt = $e.text();
          $e.data('sort-value', txt);
          sort_val = txt;
        }
        column.push([sort_val, tr, index]);
      });

      // Sort by the data-order-by value. Sort by position in the table if
      // values are the same. This enforces a stable sort across all browsers.
      // See https://bugs.chromium.org/p/v8/issues/detail?id=90
      column.sort(function(a, b) {
        var diff = sortMethod(a[0], b[0]);
        if (diff === 0)
          return a[2] - b[2];
        else
          return diff;
      });
      if (sort_dir != dir.ASC)
        column.reverse();

      var sort_info = {
        column: column,
        sort_dir: sort_dir,
        $th: $this_th,
        th_index: th_index,
        $table: $table,
        datatype: datatype,
        compare_fn: sortMethod
      }

      if(!$table.stupidtable.settings.should_redraw(sort_info)){
        return;
      }

      // Replace the content of tbody with the sorted rows. Strangely
      // enough, .append accomplishes this for us.
      trs = $.map(column, function(kv) { return kv[1]; });
      $table.children("tbody").append(trs);

      // Reset siblings
      $table.find("th").data("sort-dir", null).removeClass("sorting-desc sorting-asc");
      $this_th.data("sort-dir", sort_dir).addClass("sorting-"+sort_dir);

      $table.trigger("aftertablesort", {column: th_index, direction: sort_dir, $th: $this_th});
      $table.css("display");
    }, 10);

    return $this_th;
  };

  // Call on a sortable td to update its value in the sort. This should be the
  // only mechanism used to update a cell's sort value. If your display value is
  // different from your sort value, use jQuery's .text() or .html() to update
  // the td contents, Assumes stupidtable has already been called for the table.
  $.fn.updateSortVal = function(new_sort_val){
  var $this_td = $(this);
    if($this_td.is('[data-sort-value]')){
      // For visual consistency with the .data cache
      $this_td.attr('data-sort-value', new_sort_val);
    }
    $this_td.data("sort-value", new_sort_val);
    return $this_td;
  };

  // ------------------------------------------------------------------
  // Default settings
  // ------------------------------------------------------------------
  $.fn.stupidtable.default_settings = {
    should_redraw: function(sort_info){
      return true;
    }
  };
  $.fn.stupidtable.dir = {ASC: "asc", DESC: "desc"};
  $.fn.stupidtable.default_sort_fns = {
    "int": function(a, b) {
      return parseInt(a, 10) - parseInt(b, 10);
    },
    "float": function(a, b) {
      return parseFloat(a) - parseFloat(b);
    },
    "string": function(a, b) {
      return a.toString().localeCompare(b.toString());
    },
    "string-ins": function(a, b) {
      a = a.toString().toLocaleLowerCase();
      b = b.toString().toLocaleLowerCase();
      return a.localeCompare(b);
    }
  };
})(jQuery);
