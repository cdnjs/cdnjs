(function ($, w, undefined) {
  if (w.footable === undefined || w.foobox === null)
    throw new Error('Please check and make sure footable.js is included in the page and is loaded prior to this script.');

  var defaults = {
    striping: {
      enabled: true
    },
    classes: {
      striping: {
        odd: 'footable-odd',
        even: 'footable-even'
      }
    }
  };

  function Striping() {
    var p = this;
    p.name = 'Footable Striping';
    p.init = function (ft) {
      p.footable = ft;
      $(ft.table)
        .unbind('striping')
        .bind({
          'footable_initialized.striping footable_row_removed.striping footable_redrawn.striping footable_sorted.striping footable_filtered.striping': function () {
            
            if ($(this).data('striping') === false) return;

            p.setupStriping(ft);
          }
        });
    };

    p.setupStriping = function (ft) {

      var rowIndex = 0;
      $(ft.table).find('> tbody > tr:not(.footable-row-detail)').each(function () {

        var $row = $(this);

        //Clean off old classes
        $row.removeClass(ft.options.classes.striping.even).removeClass(ft.options.classes.striping.odd);

        if (rowIndex % 2 === 0) {
          $row.addClass(ft.options.classes.striping.even);
        } else {
          $row.addClass(ft.options.classes.striping.odd);
        }

        rowIndex++;
      });
    };
  }

  w.footable.plugins.register(Striping, defaults);

})(jQuery, window);
