/*!
 * jQuery.floatThead
 * Copyright (c) 2012 - 2013 Misha Koryak - https://github.com/mkoryak/floatThead
 * Licensed under Creative Commons Attribution-NonCommercial 3.0 Unported - http://creativecommons.org/licenses/by-sa/3.0/
 * Date: 10/2/13
 *
 * @projectDescription lock a table header in place while scrolling - without breaking styles or events bound to the header
 *
 * Dependencies:
 * jquery 1.9.0 + [required] OR jquery 1.7.0 + jquery UI core
 * underscore.js 1.3.0 + [required]
 *
 * http://mkoryak.github.io/floatThead/
 *
 * Tested on FF13+, Chrome 21+, IE9, IE8
 *
 * @author Misha Koryak
 * @version 1.1.1
 */
// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name jquery.floatThead.min.js
// ==/ClosureCompiler==
/**
 * @preserve jQuery.floatThead 1.1.1
 * Copyright (c) 2013 Misha Koryak - http://mkoryak.github.io/floatThead/
 * Licensed under Creative Commons Attribution-NonCommercial 3.0 Unported - http://creativecommons.org/licenses/by-sa/3.0/
 */
(function( $ ) {

//browser stuff
  var ieVersion = function(){for(var a=3,b=document.createElement("b"),c=b.all||[];b.innerHTML="<!--[if gt IE "+ ++a+"]><i><![endif]-->",c[0];);return 4<a?a:document.documentMode}();
  var isChrome = null;
  var isChromeCheck = function(){
    if(ieVersion){
      return false;
    }
    var $table = $("<table><colgroup><col></colgroup><tbody><tr><td style='width:10px'></td></tbody></table>");
    $('body').append($table);
    var width = $table.find('col').width();
    $table.remove();
    return width == 0;
  };

  /**
   * provides a default config object. You can modify this after including this script if you want to change the init defaults
   * @type {Object}
   */
  $.floatThead = {
    defaults: {
      cellTag: 'th',
      zIndex: 1001, //zindex of the floating thead (actually a container div)
      debounceResizeMs: 1,
      useAbsolutePositioning: true, //if set to NULL - defaults: has scrollContainer=true, doesnt have scrollContainer=false
      scrollingTop: 0, //String or function($table) - offset from top of window where the header should not pass above
      //TODO: this got lost somewhere - needs to be re-implemented
      scrollingBottom: 0, //String or function($table) - offset from the bottom of the table where the header should stop scrolling
      scrollContainer: function($table){
        return $([]); //if the table has horizontal scroll bars then this is the container that has overflow:auto and causes those scroll bars
      },
      getSizingRow: function($table, $cols, $fthCells){ // this is only called when using IE8,
        // override it if the first row of the table is going to contain colgroups (any cell spans greater then one col)
        // it should return a jquery object containing a wrapped set of table cells comprising a row that contains no col spans and is visible
        return $table.find('tbody tr:visible:first>td');
      },
      floatTableClass: 'floatThead-table'
    }
  };

  var $window = $(window);
  var floatTheadCreated = 0;


  /**
   * debounce and fix window resize event for ie7. ie7 is evil and will fire window resize event when ANY dom element is resized.
   * @param debounceMs
   * @param cb
   */

  function windowResize(debounceMs, cb){
    var winWidth = $window.width();
    var debouncedCb = _.debounce(function(){
      var winWidthNew = $window.width();
      if(winWidth != winWidthNew){
        winWidth = winWidthNew;
        cb();
      }
    }, debounceMs);
    $window.bind('resize.floatTHead', debouncedCb);
  }

  /**
   * try to calculate the scrollbar width for your browser/os
   * @return {Number}
   */
  function scrollbarWidth() {
    var $div = $( //borrowed from anti-scroll
      '<div style="width:50px;height:50px;overflow-y:scroll;'
        + 'position:absolute;top:-200px;left:-200px;"><div style="height:100px;width:100%">'
        + '</div>'
    );
    $('body').append($div);
    var w1 = $div.innerWidth();
    var w2 = $('div', $div).innerWidth();
    $div.remove();
    return w1 - w2;
  }
  /**
   * Check if a given table has been datatableized (http://datatables.net)
   * @param $table
   * @return {Boolean}
   */
  function isDatatable($table){
    if($table.dataTableSettings){
      for(var i = 0; i < $table.dataTableSettings.length; i++){
        var table = $table.dataTableSettings[i].nTable;
        if($table[0] == table){
          return true;
        }
      }
    }
    return false;
  }
  $.fn.floatThead = function(map){
    if(ieVersion < 8){
      return this; //no more crappy browser support.
    }

    if(isChrome == null){ //make sure this is done only once no matter how many times you call the plugin fn
      isChrome = isChromeCheck(); //need to call this after dom ready, and now it is.
      if(isChrome){
        //because chrome cant read <col> width, these elements are used for sizing the table. Need to create new elements because they must be unstyled by user's css.
        document.createElement('fthtr'); //tr
        document.createElement('fthtd'); //td
        document.createElement('fthfoot'); //tfoot
      }
    }
    if(_.isString(map)){
      var command = map;
      var ret = this;
      this.filter('table').each(function(){
        var obj = $(this).data('floatThead-attached');
        if(obj && _.isFunction(obj[command])){
          r = obj[command]();
          if(typeof r !== 'undefined'){
            ret = r;
          }
        }
      });
      return ret;
    }
    var opts = $.extend({}, $.floatThead.defaults, map);


    this.filter(':not(.'+opts.floatTableClass+')').each(function(){
      var $table = $(this);
      if($table.data('floatThead-attached')){
        return true; //continue the each loop
      }
      if(!$table.is('table')){
        throw new Error('jQuery.floatThead must be run on a table element. ex: $("table").floatThead();');
      }
      var $header = $table.find('thead:first');
      var $tbody = $table.find('tbody:first');
      if($header.length == 0){
        throw new Error('jQuery.floatThead must be run on a table that contains a <thead> element');
      }
      var headerFloated = true;
      var scrollingTop, scrollingBottom;
      var scrollbarOffset = {vertical: 0, horizontal: 0};
      var scWidth = scrollbarWidth();
      var lastColumnCount = 0; //used by columnNum()
      var $scrollContainer = opts.scrollContainer($table) || $([]); //guard against returned nulls

      var useAbsolutePositioning = opts.useAbsolutePositioning;
      if(useAbsolutePositioning == null){ //defaults: locked=true, !locked=false
        useAbsolutePositioning = opts.scrollContainer($table).length;
      }

      var $fthGrp = $('<fthfoot style="display:table-footer-group;"/>');

      var locked = $scrollContainer.length > 0;
      var wrappedContainer = false; //used with absolute positioning enabled. did we need to wrap the scrollContainer/table with a relative div?
      var absoluteToFixedOnScroll = ieVersion && !locked && useAbsolutePositioning; //on ie using absolute positioning doesnt look good with window scrolling, so we change positon to fixed on scroll, and then change it back to absolute when done.
      var $floatTable = $("<table/>");
      var $floatColGroup = $("<colgroup/>");
      var $tableColGroup = $("<colgroup/>");
      var $fthRow = $('<fthrow style="display:table-row;height:0;"/>'); //created unstyled elements
      var $floatContainer = $('<div style="overflow: hidden;"></div>');
      var $newHeader = $("<thead/>");
      var $sizerRow = $('<tr class="size-row"/>');
      var $sizerCells = $([]);
      var $tableCells = $([]); //used for sizing - either $sizerCells or $tableColGroup cols. $tableColGroup cols are only created in chrome for borderCollapse:collapse because of a chrome bug.
      var $headerCells = $([]);
      var $fthCells = $([]); //created elements

      $newHeader.append($sizerRow);
      $header.detach();

      $table.prepend($newHeader);
      $table.prepend($tableColGroup);
      if(isChrome){
        $fthGrp.append($fthRow);
        $table.append($fthGrp);
      }

      $floatTable.append($floatColGroup);
      $floatContainer.append($floatTable);
      $floatTable.attr('class', $table.attr('class'));
      $floatTable.addClass(opts.floatTableClass).css('margin', 0); //must have no margins or you wont be able to click on things under floating table

      if(useAbsolutePositioning){
        var makeRelative = function($container, alwaysWrap){
          var positionCss = $container.css('position');
          var relativeToScrollContainer = (positionCss == "relative" || positionCss == "absolute");
          if(!relativeToScrollContainer || alwaysWrap){
            var css = {"paddingLeft": $container.css('paddingLeft'), "paddingRight": $container.css('paddingRight')};
            $floatContainer.css(css);
            $container = $container.wrap("<div style='position: relative; clear:both;'></div>").parent();
            wrappedContainer = true;
          }
          return $container;
        };
        if(locked){
          var $relative = makeRelative($scrollContainer, true);
          $relative.append($floatContainer);
        } else {
          makeRelative($table);
          $table.after($floatContainer);
        }
      } else {
        $table.after($floatContainer);
      }


      $floatContainer.css({
        position: useAbsolutePositioning ? 'absolute' : 'fixed',
        marginTop: 0,
        top:  useAbsolutePositioning ? 0 : 'auto',
        zIndex: opts.zIndex
      });
      updateScrollingOffsets();

      var layoutFixed = {'table-layout': 'fixed'};
      var layoutAuto = {'table-layout': $table.css('tableLayout') || 'auto'};

      function setHeaderHeight(){
        var headerHeight = $header.outerHeight(true);
        $sizerRow.outerHeight(headerHeight);
        $sizerCells.outerHeight(headerHeight);
      }


      function setFloatWidth(){
        var tableWidth = $table.outerWidth();
        var width = $scrollContainer.width() || tableWidth;
        $floatContainer.width(width - scrollbarOffset.vertical);
        if(locked){
          var percent = 100 * tableWidth / (width - scrollbarOffset.vertical);
          $floatTable.css('width', percent+'%');
        } else {
          $floatTable.outerWidth(tableWidth);
        }
      }

      function updateScrollingOffsets(){
        scrollingTop = (_.isFunction(opts.scrollingTop) ? opts.scrollingTop($table) : opts.scrollingTop) || 0;
        scrollingBottom = (_.isFunction(opts.scrollingBottom) ? opts.scrollingBottom($table) : opts.scrollingBottom) || 0;
      }

      /**
       * get the number of columns and also rebuild resizer rows if the count is different then the last count
       */
      function columnNum(){
        var $headerColumns = $header.find('tr:first>'+opts.cellTag);

        var count =  _.reduce($headerColumns, function(sum, cell){
          var colspan = parseInt(($(cell).attr('colspan') || 1), 10);
          return sum + colspan;
        }, 0);
        if(count != lastColumnCount){
          lastColumnCount = count;
          var cells = [], cols = [], psuedo = [];
          for(var x = 0; x < count; x++){
            cells.push('<'+opts.cellTag+' class="floatThead-col-'+x+'"/>');
            cols.push('<col/>');
            psuedo.push("<fthtd style='display:table-cell;height:0;width:auto;'/>");
          }

          cols = cols.join('');
          cells = cells.join('');

          if(isChrome){
            psuedo = psuedo.join('');
            $fthRow.html(psuedo);
            $fthCells = $fthRow.find('fthtd');
          }

          $sizerRow.html(cells);
          $tableColGroup.html(cols);
          $tableCells = $tableColGroup.find('col');
          $floatColGroup.html(cols);
          $headerCells = $floatColGroup.find("col");

        }
        return count;
      }


      function refloat(){ //make the thing float
        if(!headerFloated){
          headerFloated = true;
          $table.css(layoutFixed);
          $floatTable.css(layoutFixed);
          $floatTable.append($header); //append because colgroup must go first in chrome
          $tbody.before($newHeader);
          setHeaderHeight();
        }
      }
      function unfloat(){ //put the header back into the table
        if(headerFloated){
          headerFloated = false;
          $newHeader.detach();
          $table.prepend($header);
          $table.css(layoutAuto);
          $floatTable.css(layoutAuto);
        }
      }
      function changePositioning(isAbsolute){
        if(useAbsolutePositioning != isAbsolute){
          useAbsolutePositioning = isAbsolute;
          $floatContainer.css({
            position: useAbsolutePositioning ? 'absolute' : 'fixed'
          });
        }
      }
      function getSizingRow($table, $cols, $fthCells, ieVersion){
        if(isChrome){
          return $fthCells;
        } else if(ieVersion) {
          return opts.getSizingRow($table, $cols, $fthCells);
        } else {
          return $cols;
        }
      }

      /**
       * returns a function that updates the floating header's cell widths.
       * @return {Function}
       */
      function reflow(){
        var i;
        var numCols = columnNum(); //if the tables columns change dynamically since last time (datatables) we need to rebuild the sizer rows and get new count
        return function(){
          var badReflow = false;

          var $rowCells = getSizingRow($table, $tableCells, $fthCells, ieVersion);
          if($rowCells.length == numCols && numCols > 0){
            unfloat();
            for(i=0; i < numCols; i++){
              var $rowCell = $rowCells.eq(i);
              var rowWidth = $rowCell.outerWidth(true);
              $headerCells.eq(i).outerWidth(rowWidth);
              $tableCells.eq(i).outerWidth(rowWidth);
            }
            refloat();
            for(i=0; i < numCols; i++){
              var hw = $headerCells.eq(i).outerWidth(true);
              var tw = $tableCells.eq(i).outerWidth(true);
              if(hw != tw){
                badReflow = true;
                break;
              }
            }
          } else {
            $floatTable.append($header);
            $table.css(layoutAuto);
            $floatTable.css(layoutAuto);
            setHeaderHeight();
          }
          return badReflow;
        };
      }

      /**
       * first performs initial calculations that we expect to not change when the table, window, or scrolling container are scrolled.
       * returns a function that calculates the floating container's top and left coords. takes into account if we are using page scrolling or inner scrolling
       * @return {Function}
       */
      function calculateFloatContainerPosFn(){
        var scrollingContainerTop = $scrollContainer.scrollTop();

        //this floatEnd calc was moved out of the returned function because we assume the table height doesnt change (otherwise we must reinit by calling calculateFloatContainerPosFn)
        var floatEnd;
        var tableContainerGap = 0;

        var floatContainerHeight = $floatContainer.height();
        var tableOffset = $table.offset();
        if(locked){
          var containerOffset = $scrollContainer.offset();
          tableContainerGap = tableOffset.top - containerOffset.top + scrollingContainerTop;
        } else {
          floatEnd = tableOffset.top - scrollingTop - floatContainerHeight + scrollingBottom + scrollbarOffset.horizontal;
        }
        var windowTop = $window.scrollTop();
        var windowLeft = $window.scrollLeft();
        var scrollContainerLeft =  $scrollContainer.scrollLeft();
        scrollingContainerTop = $scrollContainer.scrollTop();



        return function(eventType){
          if(eventType == 'windowScroll'){
            windowTop = $window.scrollTop();
            windowLeft = $window.scrollLeft();
          } else if(eventType == 'containerScroll'){
            scrollingContainerTop = $scrollContainer.scrollTop();
            scrollContainerLeft =  $scrollContainer.scrollLeft();
          } else if(eventType != 'init') {
            windowTop = $window.scrollTop();
            windowLeft = $window.scrollLeft();
            scrollingContainerTop = $scrollContainer.scrollTop();
            scrollContainerLeft =  $scrollContainer.scrollLeft();
          }
          if(isChrome && (windowTop < 0 || windowLeft < 0)){ //chrome overscroll effect at the top of the page - breaks fixed positioned floated headers
            return;
          }

          if(absoluteToFixedOnScroll){
            if(eventType == 'windowScrollDone'){
              changePositioning(true); //change to absolute
            } else {
              changePositioning(false); //change to fixed
            }
          } else if(eventType == 'windowScrollDone'){
            return null; //event is fired when they stop scrolling. ignore it if not 'absoluteToFixedOnScroll'
          }

          tableOffset = $table.offset();
          var top, left, tableHeight;
//        console.log("locked: "+locked+" use abs: "+useAbsolutePositioning)

          if(locked && useAbsolutePositioning){ //inner scrolling, absolute positioning
            if (tableContainerGap >= scrollingContainerTop) {
              var gap = tableContainerGap - scrollingContainerTop;
              gap = gap > 0 ? gap : 0;
              top = gap;
            } else {
              top = wrappedContainer ? 0 : scrollingContainerTop;
              //headers stop at the top of the viewport
            }
            left = 0;
          } else if(!locked && useAbsolutePositioning) { //window scrolling, absolute positioning
            tableHeight = $table.outerHeight();
            if(windowTop > floatEnd + tableHeight){
              top = tableHeight - floatContainerHeight; //scrolled past table
            } else if (tableOffset.top > windowTop + scrollingTop) {
              top = 0; //scrolling to table
              unfloat();
            } else {
              top = scrollingTop + windowTop - tableOffset.top + tableContainerGap;
              refloat(); //scrolling within table. header floated
            }
            left =  0;
          } else if(locked && !useAbsolutePositioning){ //inner scrolling, fixed positioning
            if (tableContainerGap > scrollingContainerTop) {
              top = tableOffset.top - windowTop;
              unfloat();
            } else {
              top = tableOffset.top + scrollingContainerTop  - windowTop - tableContainerGap;
              refloat();
              //headers stop at the top of the viewport
            }
            left = tableOffset.left + scrollContainerLeft - windowLeft;
          } else if(!locked && !useAbsolutePositioning) { //window scrolling, fixed positioning
            tableHeight = $table.outerHeight();
            if(windowTop > floatEnd + tableHeight){
              top = tableHeight + scrollingTop - windowTop + floatEnd;
              //scrolled past the bottom of the table
            } else if (tableOffset.top > windowTop + scrollingTop) {
              top = tableOffset.top - windowTop;
              refloat();
              //scrolled past the top of the table
            } else {
              //scrolling within the table
              top = scrollingTop;
            }
            left = tableOffset.left - windowLeft;
          }
          return {top: top, left: left};
        };
      }
      /**
       * returns a function that caches old floating container position and only updates css when the position changes
       * @return {Function}
       */
      function repositionFloatContainerFn(){
        var oldTop = null;
        var oldLeft = null;
        var oldScrollLeft = null;
        return function(pos, setWidth, setHeight){
          if(pos != null && (oldTop != pos.top || oldLeft != pos.left)){
            $floatContainer.css({
              top: pos.top,
              left: pos.left
            });
            oldTop = pos.top;
            oldLeft = pos.left;
          }
          if(setWidth){
            setFloatWidth();
          }
          if(setHeight){
            setHeaderHeight();
          }
          var scrollLeft = $scrollContainer.scrollLeft();
          if(oldScrollLeft != scrollLeft){
            $floatContainer.scrollLeft(scrollLeft);
            oldScrollLeft = scrollLeft;
          }
        }
      }

      /**
       * checks if THIS table has scrollbars, and finds their widths
       */
      function calculateScrollBarSize(){ //this should happen after the floating table has been positioned
        if($scrollContainer.length){
          scrollbarOffset.horizontal = $scrollContainer.width() < $table.width() ? scWidth : 0;
          scrollbarOffset.vertical =  $scrollContainer.height() < $table.height() ? scWidth: 0;
        }
      }
      //finish up. create all calculation functions and bind them to events
      calculateScrollBarSize();

      var flow = reflow();
      flow();
      var calculateFloatContainerPos = calculateFloatContainerPosFn();
      var repositionFloatContainer = repositionFloatContainerFn();

      repositionFloatContainer(calculateFloatContainerPos('init'), true); //this must come after reflow because reflow changes scrollLeft back to 0 when it rips out the thead

      var windowScrollDoneEvent = _.debounce(function(){
        repositionFloatContainer(calculateFloatContainerPos('windowScrollDone'), false);
      }, 300);

      var windowScrollEvent = function(){
        repositionFloatContainer(calculateFloatContainerPos('windowScroll'), false);
        windowScrollDoneEvent();
      };
      var containerScrollEvent = function(){
        repositionFloatContainer(calculateFloatContainerPos('containerScroll'), false);
      };

      var ensureReflow = function(){
        flow = reflow();
        var badReflow = flow();
        if(badReflow){
          flow();
        }
      };

      var windowResizeEvent = function(){
        updateScrollingOffsets();
        calculateScrollBarSize();
        ensureReflow();
        calculateFloatContainerPos = calculateFloatContainerPosFn();
        repositionFloatContainer = repositionFloatContainerFn();
        repositionFloatContainer(calculateFloatContainerPos('resize'), true, true);
      };
      var reflowEvent = _.debounce(function(){
        calculateScrollBarSize();
        updateScrollingOffsets();
        ensureReflow();
        calculateFloatContainerPos = calculateFloatContainerPosFn();
        repositionFloatContainer(calculateFloatContainerPos('reflow'), true);
      }, 1);
      if(locked){ //internal scrolling
        if(useAbsolutePositioning){
          $scrollContainer.bind('scroll.floatTHead', containerScrollEvent);
        } else {
          $scrollContainer.bind('scroll.floatTHead', containerScrollEvent);
          $window.bind('scroll.floatTHead', windowScrollEvent);
        }
      } else { //window scrolling
        $window.bind('scroll.floatTHead', windowScrollEvent);
      }

      $window.bind('load.floatTHead', reflowEvent); //for tables with images

      windowResize(opts.debounceResizeMs, windowResizeEvent);
      $table.bind('reflow', reflowEvent);
      if(isDatatable($table)){
        $table
          .bind('filter', reflowEvent)
          .bind('sort',   reflowEvent)
          .bind('page',   reflowEvent);
      }

      //attach some useful functions to the table.
      $table.data('floatThead-attached', {
        destroy: function(){
          $table.css(layoutAuto);
          $tableColGroup.remove();
          isChrome && $fthGrp.remove();
          if($newHeader.parent().length){ //only if its in the dom
            $newHeader.replaceWith($header);
          }
          $table.unbind('reflow');
          reflowEvent = windowResizeEvent = containerScrollEvent = windowScrollEvent = function() {};
          $scrollContainer.unbind('scroll.floatTHead');
          $floatContainer.remove();
          $table.data('floatThead-attached', false);
          floatTheadCreated--;
          if(floatTheadCreated == 0){
            $window.unbind('scroll.floatTHead');
            $window.unbind('resize.floatTHead');
            $window.unbind('load.floatTHead');
          }
        },
        reflow: function(){
          reflowEvent();
        },
        setHeaderHeight: function(){
          setHeaderHeight();
        },
        getFloatContainer: function(){
          return $floatContainer;
        }
      });
      floatTheadCreated++;
    });
    return this;
  };
})(jQuery);
