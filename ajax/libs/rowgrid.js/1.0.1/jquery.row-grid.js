(function($){
  $.fn.rowGrid = function( options ) {
    return this.each(function() {
      $this = $(this);
      if(options === 'appended') {
        options = $this.data('grid-options');
        var $lastRow = $this.children('.' + options.lastRowClass);
        var items = $lastRow.nextAll(options.itemSelector).add($lastRow);
        layout(this, options, items);
      } else {
        options = $.extend( {}, $.fn.rowGrid.defaults, options );
        $this.data('grid-options', options);
        layout(this, options);
        
        if(options.resize) {
          $(window).on('resize.rowGrid', {container: this}, function(event) {
            layout(event.data.container, options);
          });
        }
      }
    });
  };
  
  $.fn.rowGrid.defaults = {
    minMargin: null,
    maxMargin: null,
    resize: true,
    lastRowClass: 'last-row',
    firstItemClass: null
  };
 
  function layout(container, options, items) {
    var rowWidth = 0,
        rowElems = [],
        items = jQuery.makeArray(items || container.querySelectorAll(options.itemSelector)),
        itemsSize = items.length;
    // read
    var containerWidth = container.clientWidth-parseFloat($(container).css('padding-left'))-parseFloat($(container).css('padding-right'));
    var itemAttrs = [];
    var theImage;
    for(var i = 0; i < itemsSize; ++i) {
      theImage = items[i].getElementsByTagName('img')[0];
      if (!theImage) {
        items.splice(i, 1);
        --i;
        --itemsSize;
        continue;
      }
      // get width and height via attribute or js value
      itemAttrs[i] = {
        width: parseInt(theImage.getAttribute('width')) || theImage.offsetWidth,
        height: parseInt(theImage.getAttribute('height')) || theImage.offsetHeight
      };
    }
    itemsSize = items.length;

    // write
    for(var index = 0; index < itemsSize; ++index) {
      if (items[index].classList) {
        items[index].classList.remove(options.firstItemClass);
        items[index].classList.remove(options.lastRowClass);
      } else {
        // IE <10
        items[index].className = items[index].className.replace(new RegExp('(^|\\b)' + options.firstItemClass + '|' + options.lastRowClass + '(\\b|$)', 'gi'), ' ');
      }

      rowWidth += itemAttrs[index].width;
      rowElems.push(items[index]);
      
      // check if it is the last element
      if(index === itemsSize - 1) {
        for(var rowElemIndex = 0; rowElemIndex<rowElems.length; rowElemIndex++) {
          // if first element in row
          if(rowElemIndex === 0) {
            rowElems[rowElemIndex].className += ' ' + options.lastRowClass;
          }
          rowElems[rowElemIndex].style.cssText = 'margin-right:' + ((rowElemIndex < rowElems.length - 1)?options.minMargin+'px' : 0);
        }
      }      
      
      // check whether width of row is too high
      if(rowWidth + options.maxMargin * (rowElems.length - 1) > containerWidth) {
        var diff = rowWidth + options.maxMargin * (rowElems.length - 1) - containerWidth;
        var nrOfElems = rowElems.length;
        // change margin
        var maxSave = (options.maxMargin - options.minMargin) * (nrOfElems - 1);
        if(maxSave < diff) {
          var rowMargin = options.minMargin;
          diff -= (options.maxMargin - options.minMargin) * (nrOfElems - 1);
        } else {
          var rowMargin = options.maxMargin - diff / (nrOfElems - 1);
          diff = 0;
        }
        var rowElem,
          widthDiff = 0;
        for(var rowElemIndex = 0; rowElemIndex<rowElems.length; rowElemIndex++) {
          rowElem = rowElems[rowElemIndex];
          var rowElemWidth = itemAttrs[index+parseInt(rowElemIndex)-rowElems.length+1].width;
          var newWidth = rowElemWidth - (rowElemWidth / rowWidth) * diff;
          var newHeight = Math.round(itemAttrs[index+parseInt(rowElemIndex)-rowElems.length+1].height * (newWidth / rowElemWidth));
          if (widthDiff + 1 - newWidth % 1 >= 0.5 ) {
            widthDiff -= newWidth % 1;
            newWidth = Math.floor(newWidth);
          } else {
            widthDiff += 1 - newWidth % 1;
            newWidth = Math.ceil(newWidth);
          }
          rowElem.style.cssText =
              'width: ' + newWidth + 'px;' +
              'height: ' + newHeight + 'px;' +
              'margin-right: ' + ((rowElemIndex < rowElems.length - 1)?rowMargin : 0) + 'px';
          if(rowElemIndex === 0) {
            rowElem.className += ' ' + options.firstItemClass;
          }
        }
        rowElems = [],
          rowWidth = 0;
      }
    }
  }
})(jQuery);