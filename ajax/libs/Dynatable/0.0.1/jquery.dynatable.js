/*
 * jQuery Dynatable plugin 0.0.1
 *
 * Copyright (c) 2011 Steve Schwartz (JangoSteve)
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Date: Thu Jul 15 11:40:00 2011 -0500
 */
//

(function($) {
  var globalDefaults = {};

  $.dynatableSetup = function(options) {
    $.extend(true, globalDefaults, options);
  }

  $.dynatable = function(element, options) {

    var defaults = {
          features: {
            paginate: true,
            sort: true,
            pushState: true,
            search: true,
            recordCount: true,
            perPageSelect: true
          },
          table: {
            defaultColumnIdStyle: 'camelCase',
            columns: null,
            headRowSelector: 'thead tr', // or e.g. tr:first-child
            bodyRowSelector: 'tbody tr',
            headRowClass: null,
            rowFilter: null
          },
          inputs: {
            queries: null,
            sorts: null,
            multisort: ['ctrlKey', 'shiftKey', 'metaKey'],
            page: null,
            queryEvent: 'blur change',
            recordCountPlacement: 'after',
            paginationLinkPlacement: 'after',
            paginationPrev: 'Previous',
            paginationNext: 'Next',
            paginationGap: [1,2,2,1],
            searchPlacement: 'before',
            perPagePlacement: 'before'
          },
          dataset: {
            ajax: false,
            ajaxUrl: null,
            ajaxCache: null,
            ajaxOnLoad: false,
            ajaxMethod: 'GET',
            ajaxDataType: 'json',
            totalRecordCount: null,
            queries: null,
            queryRecordCount: null,
            page: null,
            perPage: 10,
            perPageOptions: [10,20,50,100],
            sorts: null,
            sortsKeys: null,
            sortTypes: {},
            records: null
          },
          filters: {},
          unfilters: {},
          params: {
            dynatable: 'dynatable',
            queries: 'queries',
            sorts: 'sorts',
            page: 'page',
            perPage: 'perPage',
            offset: 'offset',
            records: 'records',
            queryRecordCount: 'queryRecordCount',
            totalRecordCount: 'totalRecordCount'
          }
        },
        plugin = this,
        $element = $(element),
        settings;

    plugin.settings = {};

    plugin.init = function() {
      // TODO: figure out a better way to do this.
      // Doing `extend(true)` causes any elements that are arrays
      // to merge the default and options arrays instead of overriding the defaults.
      if (options) {
        if (options.inputs) {
          if (options.inputs.multisort) {
            defaults.inputs.multisort = undefined;
            if (globalDefaults.inputs && globalDefaults.inputs.multisort) {
              globalDefaults.inputs.multisort = undefined;
            }
          }
          if (options.inputs.paginationGap) {
            defaults.inputs.paginationGap = undefined;
            if (globalDefaults.inputs && globalDefaults.inputs.paginationGap) {
              globalDefaults.inputs.paginationGap = undefined;
            }
          }
        }
        if (options.dataset && options.dataset.perPageOptions) {
          defaults.dataset.perPageOptions = undefined;
          if (globalDefaults.dataset && globalDefaults.dataset.perPageOptions) {
            globalDefaults.dataset.perPageOptions = undefined;
          }
        }
      }
      plugin.settings = settings = $.extend(true, {}, defaults, globalDefaults, options);

      plugin.processingIndicator.attach();

      settings.table.columns = [];
      plugin.columns.getFromTable();
      settings.dataset.records = plugin.records.getFromTable();

      if (!settings.dataset.queryRecordCount) {
        settings.dataset.queryRecordCount = plugin.records.count();
      }

      if (!settings.dataset.totalRecordCount){
        settings.dataset.totalRecordCount = settings.dataset.queryRecordCount;
      }

      var sortsUrl = window.location.search.match(new RegExp(settings.params.sorts + '[^&=]*=[^&]*', 'g')),
          queriesUrl = window.location.search.match(new RegExp(settings.params.queries + '[^&=]*=[^&]*', 'g')),
          pageUrl = window.location.search.match(new RegExp(settings.params.page + '=([^&]*)')),
          perPageUrl = window.location.search.match(new RegExp(settings.params.perPage + '=([^&]*)'));

      settings.dataset.queries = queriesUrl ? plugin.utility.deserialize(queriesUrl)[settings.params.queries] : {};
      if (settings.dataset.queries === "") { settings.dataset.queries = {}; }

      if (settings.features.recordCount) {
        plugin.recordCount.attach();
      }

      if (settings.features.search) {
        plugin.search.attach();
      }

      // Create cache of original full recordset (unpaginated and unqueried)
      if (!settings.dataset.ajax) {
        settings.dataset.originalRecords = $.extend(true, [], settings.dataset.records);
      }

      if (settings.features.paginate) {
        plugin.page.set(pageUrl ? pageUrl[1] : 1);
        if (perPageUrl) { plugin.perPage.set(perPageUrl[1]); }
        plugin.paginationLinks.attach();

        if (settings.features.perPageSelect) {
          plugin.perPage.attach();
        }
      }

      if (settings.features.sort) {
        settings.dataset.sorts = sortsUrl ? plugin.utility.deserialize(sortsUrl)[settings.params.sorts] : {};
        settings.dataset.sortsKeys = sortsUrl ? plugin.utility.keysFromObject(settings.dataset.sorts) : [];
        plugin.sortHeaders.attach();
      }

      if (settings.inputs.queries) {
        plugin.queries.setupInputs();
      }

      if (!settings.dataset.ajax || (settings.dataset.ajax && settings.dataset.ajaxOnLoad) || settings.features.paginate) {
        plugin.process();
      }

      // Check if pushState option is true, and if browser supports it
      if (settings.features.pushState && history.pushState) {
        window.onpopstate = function(event) {
          if (event.state && event.state.dynatable) {
            plugin.state.pop(event);
          }
        }
      }
    };

    // if non-ajax, executes queries and sorts on in-page data
    // otherwise, sends query to ajaxUrl with queries and sorts serialized and appended in ajax data
    plugin.process = function(skipPushState) {
      var data = {};

      if (!$.isEmptyObject(settings.dataset.queries)) { data[settings.params.queries] = settings.dataset.queries; }
      // TODO: Wrap this in a try/rescue block to hide the processing indicator and indicate something went wrong if error
      plugin.processingIndicator.show();

      if (settings.features.sort && !$.isEmptyObject(settings.dataset.sorts)) { data[settings.params.sorts] = settings.dataset.sorts; }
      if (settings.features.paginate && settings.dataset.page) {
        var page = settings.dataset.page,
            perPage = settings.dataset.perPage;
        data[settings.params.page] = page;
        data[settings.params.perPage] = perPage;
        data[settings.params.offset] = (page - 1) * perPage;
      }
      if (settings.dataset.ajaxData) { $.extend(data, settings.dataset.ajaxData); }

      if (settings.dataset.ajax) {
        var options = {
          type: settings.dataset.ajaxMethod,
          data: data,
          success: function(response) {
            // Merge ajax results and meta-data into dynatables cached data
            plugin.records.updateFromJson(response);
            // update table with new records
            plugin.table.update();

            if (settings.features.pushState && !skipPushState && history.pushState) {
              plugin.state.push(data);
            }
          },
          complete: function() {
            plugin.processingIndicator.hide();
          }
        };
        // Do not pass url to `ajax` options if blank
        if (settings.dataset.ajaxUrl) { options.url = settings.dataset.ajaxUrl; }
        if (settings.dataset.ajaxCache !== null) { options.cache = settings.dataset.ajaxCache; }

        $.ajax(options);
      } else {
        plugin.records.resetOriginal();
        plugin.queries.run();
        if (settings.features.sort) {
          plugin.records.sort();
        }
        if (settings.features.paginate) {
          plugin.records.paginate();
        }
        plugin.table.update();
        plugin.processingIndicator.hide();

        if (settings.features.pushState && !skipPushState && history.pushState) {
          plugin.state.push(data);
        }
      }
    };

    plugin.state = {
      push: function(data) {
        var urlString = window.location.search,
            urlOptions,
            newParams,
            cacheStr,
            cache;

        if (urlString && /^\?/.test(urlString)) { urlString = urlString.substring(1); }
        urlOptions = plugin.utility.deserialize(urlString);
        $.extend(urlOptions, data);
        $.each(settings.params, function(attr, label) {
          if (data[label]) {
            urlOptions[label] = data[label];
          } else {
            delete urlOptions[label];
          }
        });
        params = $.param(urlOptions);

        cache = { dynatable: { dataset: settings.dataset } };
        cacheStr = JSON.stringify(cache);

        // Mozilla has a 640k char limit on what can be stored in pushState.
        // See "limit" in https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history#The_pushState().C2.A0method
        // and "dataStr.length" in http://wine.git.sourceforge.net/git/gitweb.cgi?p=wine/wine-gecko;a=patch;h=43a11bdddc5fc1ff102278a120be66a7b90afe28
        //
        // Likewise, other browsers may have varying (undocumented) limits.
        // Also, Firefox's limit can be changed in about:config as browser.history.maxStateObjectSize
        // Since we don't know what the actual limit will be in any given situation, we'll just try caching and rescue
        // any exceptions by retrying pushState without caching the records.
        try {
          window.history.pushState(cache, "Dynatable state", '?' + params);
        } catch(error) {
          // Make cached records = null, so that `pop` will rerun process to retrieve records
          cache.dynatable.dataset.records = null;
          window.history.pushState(cache, "Dynatable state", '?' + params);
        }
      },
      pop: function(event) {
        var data = event.state.dynatable;
        settings.dataset = data.dataset;

        // If dataset.records is cached from pushState
        if ( data.dataset.records ) {
          plugin.table.update();
        } else {
          plugin.process(true);
        }
      }
    }

    plugin.table = {
      // update table contents with new records array
      // from query (whether ajax or not)
      update: function() {
        var $rows = $(),
            columns = settings.table.columns,
            rowFilter = typeof(settings.table.rowFilter) === "function" ? settings.table.rowFilter : plugin.table.row;

        // loop through records
        $.each(settings.dataset.records, function(rowIndex, record){
          var $tr = rowFilter(rowIndex, record);

          // grab the record's attribute for each column
          $.each(columns, function(colIndex, column) {
            var html = column.dataFilter(record),
                $td = $('<td></td>', {
                  html: html
                });

            if (column.hidden) {
              $td.hide();
            }
            $tr.append($td);
          });
          $rows = $rows.add($tr);
        });

        if (settings.features.recordCount) {
          $('#dynatable-record-count-' + element.id).replaceWith(plugin.recordCount.create());
        }
        if (settings.features.paginate) {
          $('#dynatable-pagination-links-' + element.id).replaceWith(plugin.paginationLinks.create());
          if (settings.features.perPageSelect) {
            $('#dynatable-per-page-' + element.id).val(parseInt(settings.dataset.perPage));
          }
        }
        if (settings.features.sort) {
          plugin.sortHeaders.removeAllArrows();
          $.each(columns, function() {
            var column = this,
                sortedByColumn = plugin.utility.allMatch(settings.dataset.sorts, column.sorts, function(sorts, sort) { return sort in sorts; }),
                value = settings.dataset.sorts[column.sorts[0]];

            if (sortedByColumn) {
              $element.find('[data-dynatable-column="' + column.id + '"]').find('.dynatable-sort-header').each(function(){
                if (value == 1) {
                  plugin.sortHeaders.appendArrowUp($(this));
                } else {
                  plugin.sortHeaders.appendArrowDown($(this));
                }
              });
            }
          });
        }
        if (settings.inputs.queries) {
          settings.inputs.queries.each(function() {
            var $this = $(this),
                q = settings.dataset.queries[$this.data('dynatable-query')];
            $(this).val(q || '');
          });
        }
        $element.find(settings.table.bodyRowSelector).remove();
        $element.append($rows);
      },
      row: function(rowIndex, record) {
        return $('<tr></tr>');
      }
    };

    // turn table headers into links which add sort to sorts array
    plugin.sortHeaders = {
      create: function(cell) {
        var $cell = $(cell),
            $link = $('<a></a>', {
              'class': 'dynatable-sort-header',
              href: '#',
              html: $cell.html()
            }),
            id = $cell.data('dynatable-column'),
            column = plugin.utility.findObjectInArray(settings.table.columns, {id: id});

        $link.bind('click', function(e) {
          plugin.sortHeaders.toggleSort(e, $link, column);
          plugin.process();

          e.preventDefault();
        });

        return $link;
      },
      attach: function() {
        $element.find(settings.table.headRowSelector).children('th,td').each(function(){
          plugin.sortHeaders.attachOne(this);
        });
      },
      attachOne: function(cell) {
        var $cell = $(cell);
        if (!$cell.data('dynatable-no-sort')) {
          $cell.html(plugin.sortHeaders.create(cell));
        }
      },
      appendArrowUp: function($link) {
        plugin.sortHeaders.removeArrow($link);
        $link.append("<span class='dynatable-arrow'> &#9650;</span>");
      },
      appendArrowDown: function($link) {
        plugin.sortHeaders.removeArrow($link);
        $link.append("<span class='dynatable-arrow'> &#9660;</span>");
      },
      removeArrow: function($link) {
        // Not sure why `parent()` is needed, the arrow should be inside the link from `append()` above
        $link.find('.dynatable-arrow').remove();
      },
      removeAllArrows: function() {
        $element.find('.dynatable-arrow').remove();
      },
      toggleSort: function(e, $link, column) {
        var sortedByColumn = plugin.utility.allMatch(settings.dataset.sorts, column.sorts, function(sorts, sort) { return sort in sorts; }),
            value = settings.dataset.sorts[column.sorts[0]];

        // Clear existing sorts unless this is a multisort event
        if (!settings.inputs.multisort || !plugin.utility.anyMatch(e, settings.inputs.multisort, function(evt, key) { return e[key]; })) {
          plugin.sortHeaders.removeAllArrows();
          plugin.sorts.clear();
        }

        // If sorts for this column are already set
        if (sortedByColumn) {
          // If ascending, then make descending
          if (value == 1) {
            $.each(column.sorts, function(index,key) { plugin.sorts.add(key, -1); });
            plugin.sortHeaders.appendArrowDown($link);
          // If descending, remove sort
          } else {
            $.each(column.sorts, function(index,key) { plugin.sorts.remove(key); });
            plugin.sortHeaders.removeArrow($link);
          }
        // Otherwise, if not already set, set to ascending
        } else {
          $.each(column.sorts, function(index,key) { plugin.sorts.add(key, 1); });
          plugin.sortHeaders.appendArrowUp($link);
        }
      }
    };

    plugin.sorts = {
      add: function(attr, direction) {
        var sortsKeys = settings.dataset.sortsKeys,
            index = $.inArray(attr, sortsKeys);
        settings.dataset.sorts[attr] = direction;
        if (index === -1) { sortsKeys.push(attr); }
        return plugin;
      },
      remove: function(attr) {
        var sortsKeys = settings.dataset.sortsKeys,
            index = $.inArray(attr, sortsKeys);
        delete settings.dataset.sorts[attr];
        if (index !== -1) { sortsKeys.splice(index, 1); }
        return plugin;
      },
      clear: function() {
        settings.dataset.sorts = {};
        settings.dataset.sortsKeys.length = 0;
      },
      // Try to intelligently guess which sort function to use
      // based on the type of attribute values.
      // Consider using something more robust than `typeof` (http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/)
      guessType: function(a, b, attr) {
        var types = {
              string: 'string',
              number: 'number',
              'boolean': 'number',
              object: 'number' // dates and null values are also objects, this works...
            },
            attrType = a[attr] ? typeof(a[attr]) : typeof(b[attr]),
            type = types[attrType] || 'number';
        return type;
      },
      // Built-in sort functions
      // (the most common use-cases I could think of)
      functions: {
        number: function(a, b, attr, direction) {
          return a[attr] === b[attr] ? 0 : (direction > 0 ? a[attr] - b[attr] : b[attr] - a[attr]);
        },
        string: function(a, b, attr, direction) {
          var aAttr = (a['dynatable-sortable-text'] && a['dynatable-sortable-text'][attr]) ? a['dynatable-sortable-text'][attr] : a[attr],
              bAttr = (b['dynatable-sortable-text'] && b['dynatable-sortable-text'][attr]) ? b['dynatable-sortable-text'][attr] : b[attr],
              comparison;
          aAttr = aAttr.toLowerCase();
          bAttr = bAttr.toLowerCase();
          comparison = aAttr === bAttr ? 0 : (direction > 0 ? aAttr > bAttr : bAttr > aAttr);
          // force false boolean value to -1, true to 1, and tie to 0
          return comparison === false ? -1 : (comparison - 0);
        },
        originalPlacement: function(a, b) {
          return a['dynatable-original-index'] - b['dynatable-original-index'];
        }
      }
    };

    // provide a public function for selecting page
    plugin.page = {
      set: function(page) {
        settings.dataset.page = parseInt(page, 10);
      }
    };

    // For ajax, to add a query, just do
    plugin.queries = {
      add: function(name, value) {
        // reset to first page since query will change records
        if (settings.features.paginate) {
          settings.dataset.page = 1;
        }
        settings.dataset.queries[name] = value;
        return plugin;
      },
      remove: function(name) {
        delete settings.dataset.queries[name];
        return plugin;
      },
      run: function() {
        $.each(settings.dataset.queries, function(query, value) {
          if (plugin.queries.functions[query] === undefined) {
            // Try to lazily evaluate query from column names if not explictly defined
            var queryColumn = plugin.utility.findObjectInArray(settings.table.columns, {id: query});
            if (queryColumn) {
              plugin.queries.functions[query] = function(record, queryValue) {
                return record[query] == queryValue;
              };
            } else {
              $.error("Query named '" + query + "' called, but not defined in queries.functions");
              return true; // to skip to next query
            }
          }
          // collect all records that return true for query
          settings.dataset.records = $.map(settings.dataset.records, function(record) {
            return plugin.queries.functions[query](record, value) ? record : null;
          });
        });
        settings.dataset.queryRecordCount = settings.dataset.records.length;
      },
      // Shortcut for performing simple query from built-in search
      runSearch: function(q) {
        var origQueries = $.extend({}, settings.dataset.queries);
        if (q) {
          plugin.queries.add('search', q);
        } else {
          plugin.queries.remove('search');
        }
        if (!plugin.utility.objectsEqual(settings.dataset.queries, origQueries)) {
          plugin.process();
        }
      },
      setupInputs: function() {
        settings.inputs.queries.each(function() {
          var $this = $(this),
              event = $this.data('dynatable-query-event') || settings.inputs.queryEvent,
              query = $this.data('dynatable-query') || $this.attr('name') || this.id,
              queryFunction = function(e) {
                var q = $(this).val();
                if (q === "") { q = undefined; }
                if (q === settings.dataset.queries[query]) { return false; }
                if (q) {
                  plugin.queries.add(query, q);
                } else {
                  plugin.queries.remove(query);
                }
                plugin.process();
                e.preventDefault();
              };

          $this
            .attr('data-dynatable-query', query)
            .bind(event, queryFunction)
            .bind('keypress', function(e) {
              if (e.which == 13) {
                queryFunction.call(this, e);
              }
            });

          if (settings.dataset.queries[query]) { $this.val(decodeURIComponent(settings.dataset.queries[query])); }
        });
      },
      // Query functions for in-page querying
      // each function should take a record and a value as input
      // and output true of false as to whether the record is a match or not
      functions: {
        search: function(record, queryValue) {
          var contains = false;
          // Loop through each attribute of record
          $.each(record, function(attr, attrValue) {
            if (typeof(attrValue) === "string" && attrValue.toLowerCase().indexOf(queryValue.toLowerCase()) !== -1) {
              contains = true;
              // Don't need to keep searching attributes once found
              return false;
            } else {
              return true;
            }
          });
          return contains;
        }
      }
    };

    // pagination links which update dataset.page attribute
    plugin.paginationLinks = {
      create: function() {
        var $pageLinks = $('<ul></ul>', {
              id: 'dynatable-pagination-links-' + element.id,
              'class': 'dynatable-pagination-links',
              html: '<span>Pages: </span>'
            }),
            pageLinkClass = 'dynatable-page-link',
            activePageClass = 'dynatable-active-page',
            pages = Math.ceil(settings.dataset.queryRecordCount / settings.dataset.perPage),
            page = settings.dataset.page,
            breaks = [
              settings.inputs.paginationGap[0],
              settings.dataset.page - settings.inputs.paginationGap[1],
              settings.dataset.page + settings.inputs.paginationGap[2],
              (pages + 1) - settings.inputs.paginationGap[3]
            ],
            $link;

        for (var i = 1; i <= pages; i++) {
          if ( (i > breaks[0] && i < breaks[1]) || (i > breaks[2] && i < breaks[3])) {
            // skip to next iteration in loop
            continue;
          } else {
            $link = $('<a></a>',{
              html: i,
              'class': pageLinkClass,
              'data-dynatable-page': i
            });

            if (page == i) { $link.addClass(activePageClass); }

            // If i is not between one of the following
            // (1 + (settings.paginationGap[0]))
            // (page - settings.paginationGap[1])
            // (page + settings.paginationGap[2])
            // (pages - settings.paginationGap[3])
            var breakIndex = $.inArray(i, breaks),
                nextBreak = breaks[breakIndex + 1];
            if (breakIndex > 0 && i !== 1 && nextBreak && nextBreak > (i + 1)) {
              var $ellip = $('<span>&hellip;</span>');
              $link = breakIndex < 2 ? $link.before($ellip) : $link.after($ellip);
            }

          }

          if (settings.inputs.paginationPrev && i === 1) {
            var $prevLink = $('<a></a>',{
              html: settings.inputs.paginationPrev,
              'class': pageLinkClass,
              'data-dynatable-page': page - 1
            });
            if (page === 1) { $prevLink.addClass(activePageClass); }
            $link = $link.before($prevLink);
          }
          if (settings.inputs.paginationNext && i === pages) {
            var $nextLink = $('<a></a>',{
              html: settings.inputs.paginationNext,
              'class': pageLinkClass,
              'data-dynatable-page': page + 1
            });
            if (page === pages) { $nextLink.addClass(activePageClass); }
            $link = $link.after($nextLink);
          }

          $pageLinks.append($link.wrap('<li></li>'));
        }

        // only bind page handler to non-active pages
        var selector = '.' + pageLinkClass + ':not(.' + activePageClass + ')';
        // kill any existing live-bindings so they don't stack up
        $(selector).die('click.dynatable');
        $(selector).live('click.dynatable', function(e) {
          $this = $(this);
          $('#dynatable-pagination-links').find('.' + activePageClass).removeClass(activePageClass);
          $this.addClass(activePageClass);

          plugin.page.set($this.data('dynatable-page'));
          plugin.process();
          e.preventDefault();
        });

        return $pageLinks;
      },
      attach: function() {
        // append page liks *after* live-event-binding so it doesn't need to
        // find and select all page links to bind event
        $element[settings.inputs.paginationLinkPlacement](plugin.paginationLinks.create());
      }
    };

    plugin.search = {
      create: function() {
        var $search = $('<input />', {
              type: 'search',
              id: 'dynatable-query-search-' + element.id,
              value: settings.dataset.queries.search
            }),
            $searchSpan = $('<span></span>', {
              id: 'dynatable-search-' + element.id,
              'class': 'dynatable-search',
              text: 'Search: '
            }).append($search);

        $search
          .bind(settings.inputs.queryEvent, function() {
            plugin.queries.runSearch($(this).val());
          })
          .bind('keypress', function(e) {
            if (e.which == 13) {
              plugin.queries.runSearch($(this).val());
              e.preventDefault();
            }
          });
        return $searchSpan;
      },
      attach: function() {
        $element[settings.inputs.searchPlacement](plugin.search.create());
      }
    };

    plugin.perPage = {
      create: function() {
        var $select = $('<select>', {
              id: 'dynatable-per-page-' + element.id,
              'class': 'dynatable-per-page'
            });

        $.each(settings.dataset.perPageOptions, function(index, number) {
          var selected = settings.dataset.perPage == number ? 'selected="selected"' : '';
          $select.append('<option value="' + number + '" ' + selected + '>' + number + '</option>');
        })

        $select.bind('change', function(e) {
          plugin.perPage.set($(this).val());
          plugin.process();
        });

        return $select.before("<span>Show: </span>");
      },
      attach: function() {
        $element[settings.inputs.perPagePlacement](plugin.perPage.create());
      },
      set: function(number) {
        plugin.page.set(1);
        settings.dataset.perPage = parseInt(number);
      }
    };

    plugin.recordCount = {
      create: function() {
        var recordsShown = settings.dataset.records.length,
            recordsQueryCount = settings.dataset.queryRecordCount,
            recordsTotal = settings.dataset.totalRecordCount,
            text = "Showing ",
            collection_name = settings.params.records;

        if (recordsShown < recordsQueryCount && settings.features.paginate) {
          var bounds = plugin.records.pageBounds();
          text += (bounds[0] + 1) + " to " + bounds[1] + " of ";
        } else if (recordsShown === recordsQueryCount && settings.features.paginate) {
          text += recordsShown + " of ";
        }
        text += recordsQueryCount + " " + collection_name;
        if (recordsQueryCount < recordsTotal) {
          text += " (filtered from " + recordsTotal + " total records)";
        }

        return $('<span></span>', {
                  id: 'dynatable-record-count-' + element.id,
                  'class': 'dynatable-record-count',
                  text: text
                });
      },
      attach: function() {
        $element[settings.inputs.recordCountPlacement](plugin.recordCount.create());
      }
    };

    plugin.processingIndicator = {
      create: function() {
        var $processing = $('<div></div>', {
              html: '<span>Processing...</span>',
              id: 'dynatable-processing-' + element.id,
              'class': 'dynatable-processing',
              style: 'position: absolute; display: none;'
            });

        return $processing;
      },
      position: function() {
        var $processing = $('#dynatable-processing-' + element.id),
            $span = $processing.children('span'),
            spanHeight = $span.outerHeight(),
            spanWidth = $span.outerWidth(),
            $covered = $element,
            offset = $covered.offset(),
            height = $covered.outerHeight(), width = $covered.outerWidth();

        $processing
          .offset({left: offset.left, top: offset.top})
          .width(width)
          .height(height)
        $span
          .offset({left: offset.left + ( (width - spanWidth) / 2 ), top: offset.top + ( (height - spanHeight) / 2 )});

        return $processing;
      },
      attach: function() {
        $element.before(plugin.processingIndicator.create());
      },
      show: function() {
        $('#dynatable-processing-' + element.id).show();
        plugin.processingIndicator.position();
      },
      hide: function() {
        $('#dynatable-processing-' + element.id).hide();
      }
    };

    plugin.records = {
      // merge ajax response json with cached data including
      // meta-data and records
      updateFromJson: function(data) {
        if (settings.params.queryRecordCount in data) {
          settings.dataset.queryRecordCount = data[settings.params.queryRecordCount];
        }
        if (settings.params.totalRecordCount in data) {
          settings.dataset.totalRecordCount = data[settings.params.totalRecordCount];
        }
        if (settings.params.records in data) {
          settings.dataset.records = data[settings.params.records];
        }
      },
      // For really advanced sorting,
      // see http://james.padolsey.com/javascript/sorting-elements-with-jquery/
      sort: function() {
        var sort = [].sort,
            sorts = settings.dataset.sorts,
            sortsKeys = settings.dataset.sortsKeys,
            sortTypes = settings.dataset.sortTypes;

        var sortFunction = function(a, b) {
          var comparison;
          if ($.isEmptyObject(sorts)) {
            comparison = plugin.sorts.functions['originalPlacement'](a, b);
          } else {
            $.each(sortsKeys, function(index, attr) {
              var direction = sorts[attr],
                  sortType = sortTypes[attr] || plugin.sorts.guessType(a, b, attr);
              comparison = plugin.sorts.functions[sortType](a, b, attr, direction);
              // Don't need to sort any further unless this sort is a tie between a and b,
              // so return false to break the $.each() loop unless tied
              return comparison == 0;
            });
          }
          return comparison;
        }

        return sort.call(settings.dataset.records, sortFunction);
      },
      paginate: function() {
        var bounds = plugin.records.pageBounds(),
            first = bounds[0], last = bounds[1];
        settings.dataset.records = settings.dataset.records.slice(first, last);
      },
      resetOriginal: function() {
        settings.dataset.records = $.extend(true, [], settings.dataset.originalRecords);
      },
      pageBounds: function() {
        var page = settings.dataset.page || 1,
            first = (page - 1) * settings.dataset.perPage,
            last = first + Math.min(settings.dataset.perPage, settings.dataset.queryRecordCount);
        return [first,last];
      },
      // get initial recordset to populate table
      // if ajax, call ajaxUrl
      // otherwise, initialize from in-table records
      getFromTable: function() {
        var records = [],
            columns = settings.table.columns,
            tableRecords = $element.find(settings.table.bodyRowSelector);

        tableRecords.each(function(index){
          var record = {};
          record['dynatable-original-index'] = index;
          $(this).find('th,td').each(function(index) {
            if (columns[index] === undefined) {
              // Header cell didn't exist for this column, so let's generate and append
              // a new header cell with a randomly generated name (so we can store and
              // retrieve the contents of this column for each record)
              plugin.columns.add(plugin.columns.generate(), columns.length, false, true); // don't skipAppend, do skipUpdate
            }
            var value = columns[index].dataUnfilter(this, record),
                attr = columns[index].id;

            // If value from table is HTML, let's get and cache the text equivalent for
            // the default string sorting, since it rarely makes sense for sort headers
            // to sort based on HTML tags.
            if (typeof(value) === "string" && value.match(/\s*\<.+\>/)) {
              if (! record['dynatable-sortable-text']) {
                record['dynatable-sortable-text'] = {};
              }
              record['dynatable-sortable-text'][attr] = $($.trim(value)).text();
            }

            record[attr] = value;
          });
          // Allow configuration function which alters record based on attributes of
          // table row (e.g. from html5 data- attributes)
          if (typeof(settings.table.rowUnfilter) === "function") {
            settings.table.rowUnfilter(index, this, record);
          }
          records.push(record);
        });
        return records; // 1st row is header
      },
      // count records from table
      count: function() {
        return settings.dataset.records.length;
      }
    };

    plugin.columns = {
      // initialize table[columns] array
      getFromTable: function() {
        var $columns = $element.find(settings.table.headRowSelector).children('th,td');
        if ($columns.length) {
          $columns.each(function(index){
            plugin.columns.add($(this), index, true);
          });
        } else {
          return $.error("Couldn't find any columns headers in '" + settings.table.headRowSelector + " th,td'. If your header row is different, specify the selector in the table: headRowSelector option.");
        }
      },
      add: function($column, position, skipAppend, skipUpdate) {
        var columns = settings.table.columns,
            label = $column.text(),
            id = $column.data('dynatable-column') || plugin.utility.normalizeText(label),
            sorts = $column.data('dynatable-sorts') ? $.map($column.data('dynatable-sorts').split(','), function(text) { return $.trim(text); }) : [id];

        // Add column data to plugin instance
        columns.splice(position, 0, {
          index: position,
          label: label,
          id: id,
          dataFilter: settings.filters[id] || plugin.columns.defaultFilter,
          dataUnfilter: settings.unfilters[id] || plugin.columns.defaultUnfilter,
          sorts: sorts,
          hidden: $column.css('display') === 'none'
        });

        // Modify header cell
        $column
          .attr('data-dynatable-column', id)
          .addClass('dynatable-head');
        if (settings.table.headRowClass) { $column.addClass(settings.table.headRowClass); }

        // Append column header to table
        if (!skipAppend) {
          var domPosition = position + 1,
              $sibling = $element.find(settings.table.headRowSelector)
                .children('th:nth-child(' + domPosition + '),td:nth-child(' + domPosition + ')').first(),
              columnsAfter = columns.slice(position + 1, columns.length);

          if ($sibling.length) {
            $sibling.before($column);
          // sibling column doesn't yet exist (maybe this is the last column in the header row)
          } else {
            $element.find(settings.table.headRowSelector).append($column);
          }

          plugin.sortHeaders.attachOne($column.get());

          // increment the index of all columns after this one that was just inserted
          if (columnsAfter.length) {
            $.each(columnsAfter, function() {
              this.index += 1;
            });
          }

          if (!skipUpdate) {
            plugin.table.update();
          }
        }

        return plugin;
      },
      remove: function(columnIndexOrId) {
        var columns = settings.table.columns,
            length = columns.length;

        if (typeof(columnIndexOrId) === "number") {
          var column = columns[columnIndexOrId];
          plugin.columns.removeFromTable(column.id);
          plugin.columns.removeFromArray(columnIndexOrId);
        } else {
          // Traverse columns array in reverse order so that subsequent indices
          // don't get messed up when we delete an item from the array in an iteration
          for (var i = columns.length - 1; i >= 0; i--) {
            var column = columns[i];

            if (column.id === columnIndexOrId) {
              plugin.columns.removeFromTable(columnIndexOrId);
              plugin.columns.removeFromArray(i);
            }
          }
        }

        plugin.table.update();
      },
      removeFromTable: function(columnId) {
        $element.find(settings.table.headRowSelector).children('[data-dynatable-column="' + columnId + '"]').first()
          .remove();
      },
      removeFromArray: function(index) {
        var columns = settings.table.columns;
        columns.splice(index, 1);
        $.each(columns.slice(index, columns.length), function() {
          this.index -= 1;
        });
      },
      defaultFilter: function(record) {
        // `this` is the column object in settings.columns
        // TODO: automatically convert common types, such as arrays and objects, to string
        return record[this.id];
      },
      defaultUnfilter: function(cell, record) {
        return $(cell).html();
      },
      generate: function() {
        // Use increment to create unique column name that is the same each time the page is reloaded,
        // in order to avoid errors with mismatched attribute names when loading cached `dataset.records` array
        var increment = $element.find(settings.table.headRowSelector).children('th[data-dynatable-generated]').length;
        return $('<th></th>', {
          'data-dynatable-column': 'dynatable-generated-' + increment, //+ plugin.utility.randomHash(),
          'data-dynatable-no-sort': 'true',
          'data-dynatable-generated': increment
        });
      }
    };

    plugin.utility = {
      normalizeText: function(text) {
        var style = settings.table.defaultColumnIdStyle;
        text = plugin.utility.textTransform[style](text);
        return text;
      },
      textTransform: {
        trimDash: function(text) {
          return text.replace(/^\s+|\s+$/g, "").replace(/\s+/g, "-");
        },
        camelCase: function(text) {
          text = plugin.utility.textTransform.trimDash(text);
          return text
            .replace(/(\-[a-zA-Z])/g, function($1){return $1.toUpperCase().replace('-','');})
            .replace(/([A-Z])([A-Z]+)/g, function($1,$2,$3){return $2 + $3.toLowerCase();})
            .replace(/^[A-Z]/, function($1){return $1.toLowerCase();});
        },
        dashed: function(text) {
          text = plugin.utility.textTransform.trimDash(text);
          return plugin.utility.textTransform.lowercase(text);
        },
        underscore: function(text) {
          text = plugin.utility.textTransform.trimDash(text);
          return plugin.utility.textTransform.lowercase(text.replace(/(-)/g, '_'));
        },
        lowercase: function(text) {
          return text.replace(/([A-Z])/g, function($1){return $1.toLowerCase();});
        }
      },
      // Deserialize params in URL to object
      // see http://stackoverflow.com/questions/1131630/javascript-jquery-param-inverse-function/3401265#3401265
      deserialize: function(query) {
        if (!query) return {};
        // modified to accept an array of partial URL strings
        if (typeof(query) === "object") { query = query.join('&'); }

        var hash = {},
            vars = query.split("&");

        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split("="),
              k = decodeURIComponent(pair[0]),
              v = decodeURIComponent(pair[1].replace(/\+/g, ' ')),
              m;

          // modified to parse multi-level parameters (e.g. "hi[there][dude]=whatsup" => hi: {there: {dude: "whatsup"}})
          while (m = k.match(/([^&=]+)\[([^&=]+)\]$/)) {
            var origV = v;
            k = m[1];
            v = {};
            v[m[2]] = origV;
          }

          // If it is the first entry with this name
          if (typeof hash[k] === "undefined") {
            if (k.substr(k.length-2) != '[]')  // not end with []. cannot use negative index as IE doesn't understand it
              hash[k] = v;
            else
              hash[k] = [v];
          // If subsequent entry with this name and not array
          } else if (typeof hash[k] === "string") {
            hash[k] = v;  // replace it
          // modified to add support for objects
          } else if (typeof hash[k] === "object") {
            hash[k] = $.extend({}, hash[k], v);
          // If subsequent entry with this name and is array
          } else {
            hash[k].push(v);
          }
        }
        return hash;
      },
      // Get array of keys from object
      // see http://stackoverflow.com/questions/208016/how-to-list-the-properties-of-a-javascript-object/208020#208020
      keysFromObject: function(obj){
        var keys = [];
        for(var key in obj){
          keys.push(key);
        }
        return keys;
      },
      // Find an object in an array of objects by attributes.
      // E.g. find object with {id: 'hi', name: 'there'} in an array of objects
      findObjectInArray: function(array, objectAttr) {
        var foundObject;
        $.each(array, function(index, item) {
          // For each object in array, test to make sure all attributes in objectAttr match
          if (plugin.utility.allMatch(item, objectAttr, function(item, key, value) { return item[key] == value; })) {
            foundObject = item;
            return false;
          }
        });
        return foundObject;
      },
      // Return true if supplied test function passes for ALL items in an array
      allMatch: function(item, arrayOrObject, test) {
        // start off with true result by default
        var match = true,
            isArray = $.isArray(arrayOrObject);
        // Loop through all items in array
        $.each(arrayOrObject, function(key, value) {
          var result = isArray ? test(item, value) : test(item, key, value);
          // If a single item tests false, go ahead and break the array by returning false
          // and return false as result,
          // otherwise, continue with next iteration in loop
          // (if we make it through all iterations without overriding match with false,
          // then we can return the true result we started with by default)
          if (!result) { return match = false; }
        });
        return match;
      },
      // Return true if supplied test function passes for ANY items in an array
      anyMatch: function(item, arrayOrObject, test) {
        var match = false,
            isArray = $.isArray(arrayOrObject);

        $.each(arrayOrObject, function(key, value) {
          var result = isArray ? test(item, value) : test(item, key, value);
          if (result) {
            // As soon as a match is found, set match to true, and return false to stop the `$.each` loop
            match = true;
            return false;
          }
        });
        return match;
      },
      // Return true if two objects are equal
      // (i.e. have the same attributes and attribute values)
      objectsEqual: function(a, b) {
        for (attr in a) {
          if (a.hasOwnProperty(attr)) {
            if (!b.hasOwnProperty(attr) || a[attr] !== b[attr]) {
              return false;
            }
          }
        }
        for (attr in b) {
          if (b.hasOwnProperty(attr) && !a.hasOwnProperty(attr)) {
            return false;
          }
        }
        return true;
      },
      // Taken from http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/105074#105074
      randomHash: function() {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
    };

    plugin.init();

  };

  $.fn.dynatable = function(options) {

      return this.each(function() {
          if (undefined == $(this).data('dynatable')) {
              var plugin = new $.dynatable(this, options);
              $(this).data('dynatable', plugin);
          }
      });

  };

})(jQuery);
