// Util: PatternFly Sidebar
// Set height of sidebar-pf to height of document minus height of navbar-pf if not mobile
(function ($) {
  'use strict';
  $.fn.sidebar = function () {
    var documentHeight = 0,
      navbarpfHeight = 0,
      colHeight = 0;

    if ($('.navbar-pf .navbar-toggle').is(':hidden')) {
      documentHeight = $(document).height();
      navbarpfHeight = $('.navbar-pf').outerHeight();
      colHeight = documentHeight - navbarpfHeight;
    }
    $('.sidebar-pf').parent('.row').children('[class*="col-"]').css({"min-height" : colHeight});
  };

  $(document).ready(function () {
    // Call sidebar() on ready if .sidebar-pf exists and .datatable does not exist
    if ($('.sidebar-pf').length > 0 && $('.datatable').length === 0) {
      $.fn.sidebar();
    }
  });

  $(window).resize(function () {
    // Call sidebar() on resize if .sidebar-pf exists
    if ($('.sidebar-pf').length > 0) {
      $.fn.sidebar();
    }
  });
}(jQuery));

// Util: PatternFly Popovers
// Add data-close="true" to insert close X icon
(function ($) {
  'use strict';

  $.fn.popovers = function () {
    // Initialize
    this.popover();

    // Add close icons
    this.filter('[data-close=true]').each(function (index, element) {
      var $this = $(element),
        title = $this.attr('data-original-title') + '<button type="button" class="close" aria-hidden="true"><span class="pficon pficon-close"></span></button>';

      $this.attr('data-original-title', title);
    });

    // Bind Close Icon to Toggle Display
    this.on('click', function (e) {
      var $this = $(this),
        $title = $this.next('.popover').find('.popover-title');

      // Only if data-close is true add class "x" to title for right padding
      $title.find('.close').parent('.popover-title').addClass('closable');

      // Bind x icon to close popover
      $title.find('.close').on('click', function () {
        $this.popover('hide');
      });

      // Prevent href="#" page scroll to top
      e.preventDefault();
    });

    return this;
  };
}(jQuery));


// Util: DataTables Settings
(function ($) {
  'use strict';
  if ($.fn.dataTableExt) {
    /* Set the defaults for DataTables initialisation */
    $.extend(true, $.fn.dataTable.defaults, {
      "bDestroy": true,
      "bAutoWidth": false,
      "iDisplayLength": 20,
      "sDom":
        "<'dataTables_header' f i r >" +
        "<'table-responsive'  t >" +
        "<'dataTables_footer' p >",
      "oLanguage": {
        "sInfo": "Showing <b>_START_</b> to <b>_END_</b> of <b>_TOTAL_</b> Items",
        "sInfoFiltered" : "(of <b>_MAX_</b>)",
        "sInfoEmpty" : "Showing <b>0</b> Results",
        "sZeroRecords":
          "<p>Suggestions</p>" +
          "<ul>" +
            "<li>Check the syntax of the search term.</li>" +
            "<li>Check that the correct menu option is chosen (token ID vs. user ID).</li>" +
            "<li>Use wildcards (* to match zero or more characters or ? to match a single character).</li>" +
            "<li>Clear the search field, then click Search to return to the 20 most recent records.</li>" +
          "</ul>",
        "sSearch": ""
      },
      "sPaginationType": "bootstrap_input"
    });

    /* Default class modification */
    $.extend($.fn.dataTableExt.oStdClasses, {
      "sWrapper": "dataTables_wrapper"
    });

    /* API method to get paging information */
    $.fn.dataTableExt.oApi.fnPagingInfo = function (oSettings) {
      return {
        "iStart":         oSettings._iDisplayStart,
        "iEnd":           oSettings.fnDisplayEnd(),
        "iLength":        oSettings._iDisplayLength,
        "iTotal":         oSettings.fnRecordsTotal(),
        "iFilteredTotal": oSettings.fnRecordsDisplay(),
        "iPage":          oSettings._iDisplayLength === -1 ? 0 : Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength),
        "iTotalPages":    oSettings._iDisplayLength === -1 ? 0 : Math.ceil(oSettings.fnRecordsDisplay() / oSettings._iDisplayLength)
      };
    };

    /* Combination of Bootstrap + Input Text style pagination control */
    $.extend($.fn.dataTableExt.oPagination, {
      "bootstrap_input": {
        "fnInit": function (oSettings, nPaging, fnDraw) {
          var fnClickHandler = function (e) {
              e.preventDefault();
              if (oSettings.oApi._fnPageChange(oSettings, e.data.action)) {
                fnDraw(oSettings);
              }
            },
            els,
            nInput;

          $(nPaging).append(
            '<ul class="pagination">' +
              '  <li class="first disabled"><span class="i fa fa-angle-double-left"></span></li>' +
              '  <li class="prev disabled"><span class="i fa fa-angle-left"></span></li>' +
              '</ul>' +
              '<div class="pagination-input">' +
              '  <input type="text" class="paginate_input">' +
              '  <span class="paginate_of">of <b>3</b></span>' +
              '</div>' +
              '<ul class="pagination">' +
              '  <li class="next disabled"><span class="i fa fa-angle-right"></span></li>' +
              '  <li class="last disabled"><span class="i fa fa-angle-double-right"></span></li>' +
              '</ul>'
          );

          els = $('li', nPaging);
          $(els[0]).bind('click.DT', { action: "first" }, fnClickHandler);
          $(els[1]).bind('click.DT', { action: "previous" }, fnClickHandler);
          $(els[2]).bind('click.DT', { action: "next" }, fnClickHandler);
          $(els[3]).bind('click.DT', { action: "last" }, fnClickHandler);

          nInput = $('input', nPaging);
          $(nInput).keyup(function (e) {
            if (e.which === 38 || e.which === 39) {
              this.value += 1;
            } else if ((e.which === 37 || e.which === 40) && this.value > 1) {
              this.value -= 1;
            }

            if (this.value === "" || !this.value.match(/[0-9]/)) {
              /* Nothing entered or non-numeric character */
              return;
            }

            var iNewStart = oSettings._iDisplayLength * (this.value - 1);
            if (iNewStart > oSettings.fnRecordsDisplay()) {
              /* Display overrun */
              oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay() - 1) /
                oSettings._iDisplayLength) - 1) * oSettings._iDisplayLength;
              fnDraw(oSettings);
              return;
            }

            oSettings._iDisplayStart = iNewStart;
            fnDraw(oSettings);
          });
        },

        "fnUpdate": function (oSettings, fnDraw) {
          var oPaging = oSettings.oInstance.fnPagingInfo(),
            an = oSettings.aanFeatures.p,
            ien = an.length,
            iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength),
            iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1,
            i;

          for (i = 0; i < ien; i += 1) {
            $('.paginate_input').val(iCurrentPage);
            $('.paginate_of b').html(iPages);

            // Add / remove disabled classes from the static elements
            if (oPaging.iPage === 0) {
              $('li.first', an[i]).addClass('disabled');
              $('li.prev', an[i]).addClass('disabled');
            } else {
              $('li.first', an[i]).removeClass('disabled');
              $('li.prev', an[i]).removeClass('disabled');
            }

            if (oPaging.iPage === oPaging.iTotalPages - 1 || oPaging.iTotalPages === 0) {
              $('li.next', an[i]).addClass('disabled');
              $('li.last', an[i]).addClass('disabled');
            } else {
              $('li.next', an[i]).removeClass('disabled');
              $('li.last', an[i]).removeClass('disabled');
            }
          }
        }
      }
    });
  }
}(jQuery));

// Util: PatternFly Collapsible Left Hand Navigation
// Must have navbar-toggle in navbar-pf-alt for expand/collapse
(function ($) {

  'use strict';

  $.fn.navigation = function () {

    var navElement = $('.layout-pf-alt-fixed .nav-pf-vertical-alt'),
      bodyContentElement = $('.container-pf-alt-nav-pf-vertical-alt'),
      toggleNavBarButton = $('.navbar-toggle'),
      explicitCollapse = false,
      breakpoints = {
        'tablet': 768,
        'desktop': 1024
      },
      checkNavState = function () {
        var width = $(window).width();

        //Always remove the hidden & peek class
        navElement.removeClass('hidden show-mobile-nav collapsed');

        //Set the body class back to the default
        bodyContentElement.removeClass('collapsed-nav hidden-nav');

        // Check to see if the nav needs to collapse
        if (width < breakpoints.desktop || explicitCollapse) {
          navElement.addClass('collapsed');
          bodyContentElement.addClass('collapsed-nav');
        }

        // Check to see if we need to move down to the mobile state
        if (width < breakpoints.tablet) {
          //Set the nav to being hidden
          navElement.addClass('hidden');

          //Make sure this is expanded
          navElement.removeClass('collapsed');

          //Set the body class to the correct state
          bodyContentElement.removeClass('collapsed-nav');
          bodyContentElement.addClass('hidden-nav');
        }
      },
      collapseMenu = function () {
        //Make sure this is expanded
        navElement.addClass('collapsed');
        //Set the body class to the correct state
        bodyContentElement.addClass('collapsed-nav');

        explicitCollapse = true;
      },
      enableTransitions = function () {
        // enable transitions only when toggleNavBarButton is clicked or window is resized
        $('html').addClass('transitions');
      },
      expandMenu = function () {
        //Make sure this is expanded
        navElement.removeClass('collapsed');
        //Set the body class to the correct state
        bodyContentElement.removeClass('collapsed-nav');

        explicitCollapse = false;
      },
      bindMenuBehavior = function () {
        toggleNavBarButton.on('click', function (e) {
          enableTransitions();
          var inMobileState = bodyContentElement.hasClass('hidden-nav');

          if (inMobileState && navElement.hasClass('show-mobile-nav')) {
            //In mobile state just need to hide the nav
            navElement.removeClass('show-mobile-nav');
          } else if (inMobileState) {
            navElement.addClass('show-mobile-nav');
          } else if (navElement.hasClass('collapsed')) {
            expandMenu();
          } else {
            collapseMenu();
          }
        });
      },
      setTooltips = function () {
        $('.nav-pf-vertical-alt [data-toggle="tooltip"]').tooltip({'container': 'body', 'delay': { 'show': '500', 'hide': '200' }});

        $(".nav-pf-vertical-alt").on("show.bs.tooltip", function (e) {
          if (!$(this).hasClass("collapsed")) {
            return false;
          }
        });

      },
      init = function () {
        //Set correct state on load
        checkNavState();

        // Bind Top level hamburger menu with menu behavior;
        bindMenuBehavior();

        //Set tooltips
        setTooltips();
      };

    //Listen for the window resize event and collapse/hide as needed
    $(window).on('resize', function () {
      checkNavState();
      enableTransitions();
    });

    init();

  };

  $(document).ready(function () {
    if ($('.nav-pf-vertical-alt').length > 0) {
      $.fn.navigation();
    }
  });

}(jQuery));

// Count and Display Remaining Characters
(function ($) {

  'use strict';

  $.fn.countRemainingChars = function (options) {

    var settings = $.extend({
      // These are the defaults.
      charsMaxLimit: 100,
      charsWarnRemaining: 5,
      blockInputAtMaxLimit: false
    }, options),
      $taFld = this,
      $countFld = $('#'  + settings.countFld).text(settings.charsMaxLimit),
      charsRemainingFn = function (charsLength) {
        var charsRemaining = settings.charsMaxLimit - charsLength;
        $countFld.text(charsRemaining);
        $countFld.toggleClass('chars-warn-remaining-pf', charsRemaining <= settings.charsWarnRemaining);
        if (charsRemaining < 0) {
          $taFld.trigger("overCharsMaxLimitEvent", $taFld.attr('id'));
        } else {
          $taFld.trigger("underCharsMaxLimitEvent", $taFld.attr('id'));
        }
      };

    this.on('paste', function (event) {
      setTimeout(function () {
        var charsLength = $taFld.val().length, maxTxt;

        if (settings.blockInputAtMaxLimit && charsLength > settings.charsMaxLimit) {
          maxTxt = $taFld.val();
          maxTxt = maxTxt.substring(0, settings.charsMaxLimit);
          $taFld.val(maxTxt);
          charsLength = $taFld.val().length;
        }

        charsRemainingFn(charsLength);
      }, 100);
    });

    this.keyup(function (event) {
      charsRemainingFn($taFld.val().length);
    });

    this.keydown(function (event) {
      var charsLength = $taFld.val().length;

      if (settings.blockInputAtMaxLimit && charsLength >= settings.charsMaxLimit) {
        // Except backspace
        if (event.keyCode !== 8) {
          event.preventDefault();
        }
      }
    });

    return this;
  };
}(jQuery));

// Util: PatternFly C3 Chart Defaults
(function ($) {
  'use strict';

  $.fn.c3ChartDefaults = function () {
    var getDefaultColors,
      getDefaultDonut,
      getDefaultDonutSize,
      getDefaultDonutColors,
      getDefaultDonutTooltip,
      getDefaultDonutLegend,
      getDefaultDonutConfig,
      getDefaultSparklineArea,
      getDefaultSparklineSize,
      getDefaultSparklineAxis,
      getDefaultSparklineLegend,
      getDefaultSparklinePoint,
      getDefaultSparklineTooltip,
      getDefaultSparklineConfig;

    getDefaultColors = function () {
      return {
        pattern: ['#0088ce', '#00659c', '#3f9c35', '#ec7a08', '#cc0000']
      };
    };
    getDefaultDonut = function (title) {
      return {
        title: title,
        label: {
          show: false
        },
        width: 11
      };
    };
    getDefaultDonutSize = function () {
      return {
        height: 171 // produces a diameter of 150 and a centered chart
      };
    };
    getDefaultDonutColors = function () {
      return {
        pattern: ['#0088CE', '#D1D1D1']
      };
    };
    getDefaultDonutTooltip = function () {
      return {
        show: false
      };
    };
    getDefaultDonutLegend = function () {
      return {
        show: false
      };
    };
    getDefaultDonutConfig = function (title) {
      return {
        donut: this.getDefaultDonut(title),
        size: this.getDefaultDonutSize(),
        legend: this.getDefaultDonutLegend(),
        color: this.getDefaultDonutColors(),
        tooltip: this.getDefaultDonutTooltip()
      };
    };
    getDefaultSparklineArea = function () {
      return {
        zerobased: true
      };
    };
    getDefaultSparklineSize = function () {
      return {
        height: 60
      };
    };
    getDefaultSparklineAxis = function () {
      return {
        x: {
          show: false
        },
        y: {
          show: false
        }
      };
    };
    getDefaultSparklineLegend = function () {
      return {
        show: false
      };
    };
    getDefaultSparklinePoint = function () {
      return {
        r: 1,
        focus: {
          expand: {
            r: 4
          }
        }
      };
    };
    getDefaultSparklineTooltip = function () {
      return {
        // because a sparkline should only contain a single data column,
        // the tooltip will only work for a single data column
        contents: function (d) {
          return '<span class="c3-tooltip-sparkline">' + d[0].value + ' ' + d[0].name + '</span>';
        }
      };
    };
    getDefaultSparklineConfig = function () {
      return {
        area: getDefaultSparklineArea(),
        size: getDefaultSparklineSize(),
        axis: getDefaultSparklineAxis(),
        color: getDefaultColors(),
        legend: getDefaultSparklineLegend(),
        point: getDefaultSparklinePoint(),
        tooltip: getDefaultSparklineTooltip()
      };
    };

    return {
      getDefaultColors: getDefaultColors,
      getDefaultDonut: getDefaultDonut,
      getDefaultDonutSize: getDefaultDonutSize,
      getDefaultDonutColors: getDefaultDonutColors,
      getDefaultDonutTooltip: getDefaultDonutTooltip,
      getDefaultDonutLegend: getDefaultDonutLegend,
      getDefaultDonutConfig: getDefaultDonutConfig,
      getDefaultSparklineArea: getDefaultSparklineArea,
      getDefaultSparklineSize: getDefaultSparklineSize,
      getDefaultSparklineAxis: getDefaultSparklineAxis,
      getDefaultSparklineLegend: getDefaultSparklineLegend,
      getDefaultSparklinePoint: getDefaultSparklinePoint,
      getDefaultSparklineTooltip: getDefaultSparklineTooltip,
      getDefaultSparklineConfig: getDefaultSparklineConfig
    };
  };
}(jQuery));

// Util: PatternFly Collapse with fixed heights
// Update the max-height of collapse elements based on the parent container's height.
(function ($) {
  'use strict';

  $.fn.initCollapseHeights = function () {
    var parentElement = this, setCollapseHeights;

    setCollapseHeights = function () {
      var height, openPanel, contentHeight, bodyHeight, overflowY = 'hidden';

      height = parentElement.height();

      // Close any open panel
      openPanel = parentElement.find('.collapse.in');
      if (openPanel && openPanel.length > 0) {
        openPanel.removeClass('in');
      }

      // Determine the necessary height for the closed content
      contentHeight = 0;
      parentElement.children().each($.proxy(function (i, element) {
        var $element = $(element);
        contentHeight += $element.outerHeight(true);
      }, parentElement)).end();

      // Determine the height remaining for opened collapse panels
      bodyHeight = height - contentHeight;

      // Make sure we have enough height to be able to scroll the contents if necessary
      if (bodyHeight < 25) {
        bodyHeight = 25;

        // Allow the parent to scroll so the child elements are accessible
        overflowY = 'auto';
      }

      // Set the max-height for the collapse panels
      parentElement.find('[data-toggle="collapse"]').each($.proxy(function (i, element) {
        var $element, selector, $target;
        $element = $(element);

        // Determine the selector to find the target
        selector = $element.attr('data-target');
        if (!selector) {
          selector = $element.attr('href');
        }

        // Get the target and set the max-height
        $target = $(selector);
        $target.css({'max-height': bodyHeight + 'px', 'overflow-y': 'auto'});
      }, parentElement)).end();

      // Reopen the initially opened panel
      if (openPanel && openPanel.length > 0) {
        openPanel.addClass("in");
      }

      parentElement.css({'overflow-y': overflowY});
    };

    setCollapseHeights();

    // Update on window resizing
    $(window).resize(setCollapseHeights);

  };
}(jQuery));

// Util: PatternFly TreeGrid Tables
(function ($) {
  'use strict';

  function getParent(rows, node) {
    var parent = node.attr('data-parent');

    if (typeof parent === "string") {
      if (isNaN(parent)) {
        parent = rows.closest(parent);
      } else {
        parent = $(rows[parseInt(parent, 10)]);
      }
      return parent;
    }
  }

  function renderItem(item, parent) {
    if (parent) {
      parent.find('.treegrid-node > span.expand-icon')
        .toggleClass('fa-angle-right', parent.hasClass('collapsed'))
        .toggleClass('fa-angle-down', !parent.hasClass('collapsed'));
      item.toggleClass('hidden', parent.hasClass('collapsed'));
      if (parent.hasClass('collapsed')) {
        item.addClass('collapsed');
      }
    }
  }

  function reStripe(tree) {
    tree.find('tbody > tr').removeClass('odd');
    tree.find('tbody > tr:not(.hidden):odd').addClass('odd');
  }

  $.fn.treegrid = function (options) {
    var i, rows, _this;
    rows = this.find('tbody > tr');
    _this = this;
    $.each(rows, function () {
      var node, parent;
      node = $(this);
      parent = getParent(rows, node);
      // Append expand icon dummies
      node.children('.treegrid-node').prepend('<span class="icon expand-icon fa"/>');

      // Set up an event listener for the node
      node.children('.treegrid-node').on('click', function (e) {
        var icon = node.find('span.expand-icon');
        if (icon.hasClass('fa-angle-right')) {
          node.removeClass('collapsed');
        }
        if (icon.hasClass('fa-angle-down')) {
          node.addClass('collapsed');
        }
        $.each(rows.slice(rows.index(node) + 1), function () {
          renderItem($(this), getParent(rows, $(this)));
        });
        reStripe(_this);
      });

      if (parent) {
        // Calculate indentation depth
        i = parent.find('.treegrid-node > span.indent').length + 1;
        for (i; i > 0; i -= 1) {
          node.children('.treegrid-node').prepend('<span class="indent"/>');
        }
        // Render expand/collapse icons
        renderItem(node, parent);
      }
    });
    reStripe(_this);
  };
}(jQuery));

// Util: PatternFly Collapsible Vertical Navigation
// Must have navbar-toggle in navbar-pf-vertical for expand/collapse
(function ($) {
  'use strict';

  $.fn.setupVerticalNavigation = function (handleItemSelections) {

    var navElement = $('.nav-pf-vertical'),
      bodyContentElement = $('.container-pf-nav-pf-vertical'),
      toggleNavBarButton = $('.navbar-toggle'),
      explicitCollapse = false,
      subDesktop = false,
      breakpoints = {
        'tablet': 768,
        'desktop': 1200
      },

      inMobileState = function () {
        return bodyContentElement.hasClass('hidden-nav');
      },

      forceResize = function () {
        setTimeout(function () {
          if (window.dispatchEvent) {
            window.dispatchEvent(new Event('resize'));
          }
          // Special case for IE
          if ($(document).fireEvent) {
            $(document).fireEvent('onresize');
          }
        }, 100);
      },

      showSecondaryMenu = function () {
        if (inMobileState() || !subDesktop) {
          navElement.addClass('secondary-visible-pf');
          bodyContentElement.addClass('secondary-visible-pf');
        }

        // Dispatch a resize event when showing the secondary menu in non-subdesktop state to
        // allow content to adjust to the secondary menu sizing
        if (!subDesktop) {
          forceResize();
        }
      },

      hideSecondaryMenu = function () {
        navElement.removeClass('secondary-visible-pf');
        bodyContentElement.removeClass('secondary-visible-pf');
        navElement.find('.mobile-nav-item-pf').each(function (index, item) {
          $(item).removeClass('mobile-nav-item-pf');
        });
      },

      showSecondaryMenuForItem = function (item) {
        if (item.find('.nav-pf-persistent-secondary').length > 0) {
          showSecondaryMenu();
        } else {
          hideSecondaryMenu();
          navElement.removeClass('show-mobile-nav');
        }
      },

      setActiveItem = function (item) {
        // Make the clicked on item active
        $(document).find('.nav-pf-vertical > .list-group > .list-group-item').each(function (index, element) {
          if ($(element).hasClass('active')) {
            $(element).removeClass('active');
          }
        });
        if (!item.hasClass('active')) {
          item.addClass('active');
        }
      },

      setSecondaryActiveItem = function ($parent, item) {
        var parentItem = $(document).find('[data-target="#' + $parent.attr('id') + '"]');

        $parent.find('.list-group > .list-group-item').each(function (index, element) {
          $(element).removeClass('active');
        });
        item.addClass('active');

        setActiveItem($(parentItem));
      },

      updateSecondaryMenuDisplayAfterSelection = function () {
        if (inMobileState()) {
          navElement.removeClass('show-mobile-nav');
          hideSecondaryMenu();
          navElement.find('.mobile-nav-item-pf').each(function (index, item) {
            $(item).removeClass('mobile-nav-item-pf');
          });
        }
      },

      checkNavState = function () {
        var width = $(window).width(), makeSecondaryVisible;

        // Check to see if we need to enter/exit the mobile state
        if (width < breakpoints.tablet) {
          if (!navElement.hasClass('hidden')) {
            //Set the nav to being hidden
            navElement.addClass('hidden');
            navElement.removeClass('collapsed');

            //Set the body class to the correct state
            bodyContentElement.removeClass('collapsed-nav');
            bodyContentElement.addClass('hidden-nav');

            explicitCollapse = false;
          }
        } else if (navElement.hasClass('hidden')) {
          // Always remove the hidden & peek class
          navElement.removeClass('hidden show-mobile-nav');

          // Set the body class back to the default
          bodyContentElement.removeClass('hidden-nav');
        }

        // Check to see if we need to enter/exit the sub desktop state
        if (width < breakpoints.desktop) {
          if (!subDesktop) {
            // Collapse the navigation bars when entering sub desktop mode
            navElement.addClass('collapsed');
            bodyContentElement.addClass('collapsed-nav');
          }
          if (width >= breakpoints.tablet) {
            hideSecondaryMenu();
          }
          subDesktop = true;
        } else {
          makeSecondaryVisible = subDesktop && (navElement.find('.persistent-secondary.active').length > 0);
          subDesktop = false;
          if (makeSecondaryVisible) {
            showSecondaryMenu();
          }
        }

        if (explicitCollapse) {
          navElement.addClass('collapsed');
          bodyContentElement.addClass('collapsed-nav');
        } else {
          navElement.removeClass('collapsed');
          bodyContentElement.removeClass('collapsed-nav');
        }
      },

      collapseMenu = function () {
        //Make sure this is expanded
        navElement.addClass('collapsed');
        //Set the body class to the correct state
        bodyContentElement.addClass('collapsed-nav');

        if (subDesktop) {
          hideSecondaryMenu();
        }

        explicitCollapse = true;
      },

      enableTransitions = function () {
        // enable transitions only when toggleNavBarButton is clicked or window is resized
        $('html').addClass('transitions');
      },

      expandMenu = function () {
        //Make sure this is expanded
        navElement.removeClass('collapsed');
        //Set the body class to the correct state
        bodyContentElement.removeClass('collapsed-nav');

        explicitCollapse = false;

        // Dispatch a resize event when showing the expanding then menu to
        // allow content to adjust to the menu sizing
        if (!subDesktop) {
          forceResize();
        }
      },

      bindMenuBehavior = function () {
        toggleNavBarButton.on('click', function (e) {
          enableTransitions();

          if (inMobileState()) {
            // Toggle the mobile nav
            if (navElement.hasClass('show-mobile-nav')) {
              navElement.removeClass('show-mobile-nav');
            } else {
              // Always start at the primary menu
              hideSecondaryMenu();
              navElement.addClass('show-mobile-nav');
            }
          } else if (navElement.hasClass('collapsed')) {
            expandMenu();
          } else {
            collapseMenu();
          }
        });
      },

      bindMenuItemsBehavior = function (handleSelection) {
        // Set main nav active item on click, and show secondary nav if it has a secondary nav bar
        $(document).on('click.pf.secondarynav.data-api', '.nav-pf-vertical > .list-group > .list-group-item', function (element) {
          var $this = $(this);

          showSecondaryMenuForItem($this);

          if (inMobileState()) {
            if ($this.find('.nav-pf-persistent-secondary').length > 0) {
              $this.addClass('mobile-nav-item-pf');
            } else if (handleSelection) {
              setActiveItem($this);
            }
          } else if (handleSelection) {
            setActiveItem($this);
          }
        });

        // Set secondary menu click handlers
        $(document).find('.nav-pf-persistent-secondary').each(function (index, element) {
          var $e = $(element);

          // Ignore clicks that are not handled
          if (handleSelection) {
            $e.on('click.pf.secondarynav.data-api', function (event) {
              // Don't process the click on the parent item
              event.stopImmediatePropagation();
            });
          }

          // Set the active items on an item click
          $e.on('click.pf.secondarynav.data-api', '.list-group > .list-group-item', function (event) {
            var $this = $(this);
            updateSecondaryMenuDisplayAfterSelection($this);

            if (handleSelection) {
              setSecondaryActiveItem($e, $(this));
              // Don't process the click on the parent item
              event.stopImmediatePropagation();
            }
          });

          // Collapse the secondary nav bar when the toggle is clicked
          $e.on('click.pf.secondarynav.data-api', '[data-toggle="collapse-secondary-nav"]', function (e) {
            hideSecondaryMenu();
            navElement.removeClass('hover-secondary-nav-pf');
            navElement.addClass('force-hide-secondary-nav-pf');
            setTimeout(function () {
              navElement.removeClass('force-hide-secondary-nav-pf');
            }, 500);
            if (handleSelection) {
              // Don't process the click on the parent item
              e.stopImmediatePropagation();
            }
          });
        });

        // Show secondary nav bar on hover of nav items
        $(document).on('mouseover.pf.secondarynav.data-api', '.persistent-secondary', function (e) {
          if (!inMobileState()) {
            navElement.addClass('hover-secondary-nav-pf');
          }
        });
        $(document).on('mouseout.pf.secondarynav.data-api', '.persistent-secondary', function (e) {
          navElement.removeClass('hover-secondary-nav-pf');
        });
      },

      setTooltips = function () {
        $('.nav-pf-vertical [data-toggle="tooltip"]').tooltip({'container': 'body', 'delay': { 'show': '500', 'hide': '200' }});

        $(".nav-pf-vertical").on("show.bs.tooltip", function (e) {
          if (!$(this).hasClass("collapsed")) {
            return false;
          }
        });
      },

      init = function (handleItemSelections) {
        //Set correct state on load
        checkNavState();

        // Bind Top level hamburger menu with menu behavior;
        bindMenuBehavior();

        // Bind menu items
        bindMenuItemsBehavior(handleItemSelections);

        //Set tooltips
        setTooltips();
      };

    //Listen for the window resize event and collapse/hide as needed
    $(window).on('resize', function () {
      checkNavState();
      enableTransitions();
    });

    init(handleItemSelections);
  };
}(jQuery));

