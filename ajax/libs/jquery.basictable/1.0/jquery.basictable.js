/*
 * jQuery Basic Table
 * Author: Jerry Low
 */

(function($) {
  $.fn.basictable = function(options) {
    var setup = function(table, data) {
      if (data.tableWrap) {
        table.wrap('<div class="bt-wrapper"></div>');
      }

      var format = '';

      if (table.find('thead th').length) {
        format = 'thead th';
      }
      else if (table.find('th').length) {
        format = 'tr:first th';
      }
      else {
        format = 'tr:first td';
      }

      $.each(table.find(format), function() {
        var $heading = $(this);

        $.each(table.find('tbody tr'), function() {
          var $cell = $(this).find('td:eq(' + $heading.index() + ')');

          if ($cell.html() === '' || $cell.html() === '&nbsp;') {
            $cell.addClass('bt-hide');
          }
          else {
            $cell.attr('data-th', $heading.text());

            if (data.contentWrap) {
              $cell.wrapInner('<span class="bt-content"></span>');
            }
          }
        });
      });
    };

    var unwrap = function(table) {
      $.each(table.find('td'), function() {
        var $cell = $(this);
        var content = $cell.children('.bt-content').html();
        $cell.html(content);
      });
    };

    var check = function(table, data) {
      // Only change when table is larger than parent if force
      // responsive is turned off.
      if (!data.forceResponsive) {
        if (table.removeClass('bt').outerWidth() > table.parent().width()) {
          start(table, data);
        }
        else {
          end(table, data);
        }
      }
      else {
        if ($(window).width() <= data.breakpoint) {
          start(table, data);
        }
        else {
          end(table, data);
        }
      }
    };

    var start = function(table, data) {
      table.addClass('bt');

      if (data.tableWrapper) {
        table.parent('.bt-wrapper').addClass('active');
      }
    };

    var end = function(table, data) {
      table.removeClass('bt');

      if (data.tableWrapper) {
        table.parent('.bt-wrapper').removeClass('active');
      }
    };

    var destroy = function(table, data) {
      table.find('td').removeAttr('data-th');

      if (data.tableWrap) {
        table.unwrap();
      }

      if (data.contentWrap) {
        unwrap(table);
      }

      table.removeData('basictable');
    };

    var resize = function(table) {
      if (table.data('basictable')) {
        check(table, table.data('basictable'));
      }
    };

    // Get table.
    var table = this;

    // If table has already executed.
    if (table.length === 0 || table.data('basictable')) {
      if (table.data('basictable')) {
        // Destroy basic table.
        if (options == 'destroy') {
          destroy(table, table.data('basictable'));
        }
        // Start responsive mode.
        else if (options === 'start') {
          start(table, table.data('basictable'));
        }
        else if (options === 'stop') {
          end(table, table.data('basictable'));
        }
        else {
          check(table);
        }
      }
      return false;
    }

    // Extend Settings.
    var settings = $.extend({}, $.fn.basictable.defaults, options);

    var vars = {
      breakpoint: settings.breakpoint,
      contentWrap: settings.contentWrap,
      disableResize: settings.disableResize,
      forceResponsive: settings.forceResponsive,
      noResize: settings.noResize,
      tableWrapper: settings.tableWrapper
    };

    // Initiate
    table.data('basictable', vars);

    setup(table, table.data('basictable'));

    if (!vars.noResize) {
      check(table, table.data('basictable'));

      $(window).bind('resize.basictable', function() {
        resize(table);
      });
    }
  };

  $.fn.basictable.defaults = {
    breakpoint: 568,
    contentWrap: true,
    disableResize: false,
    forceResponsive: true,
    noResize: false,
    tableWrap: false
  };
})(jQuery);
