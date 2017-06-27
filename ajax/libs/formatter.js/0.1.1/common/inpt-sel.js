/*
 * inpt-sel.js
 *
 * Cross browser implementation to get and set input selections
 *
 */





// Define module
var inptSel = {};

//
// Get begin and end positions of selected input. Return 0's
// if there is no selectiion data
//
inptSel.get = function (el) {
  // If normal browser return with result
  if (typeof el.selectionStart === 'number') {
    return { 
      begin: el.selectionStart,
      end: el.selectionEnd
    };
  }

  // Uh-Oh. We must be IE. Fun with TextRange!!
  var range = document.selection.createRange();
  // Determine if there is a selection
  if (range && range.parentElement() === el) {
    var inputRange = el.createTextRange(),
        endRange   = el.createTextRange(),
        length     = el.value.length;

    // Create a working TextRange for the input selection
    inputRange.moveToBookmark(range.getBookmark());

    // Move endRange begin pos to end pos (hence endRange)
    endRange.collapse(false);
    
    // If we are at the very end of the input, begin and end
    // must both be the length of the el.value
    if (inputRange.compareEndPoints('StartToEnd', endRange) > -1) {
      return { begin: length, end: length };
    }

    // Note: moveStart usually returns the units moved, which 
    // one may think is -length, however, it will stop when it
    // gets to the begin of the range, thus giving us the
    // negative value of the pos.
    return {
      begin: -inputRange.moveStart('character', -length),
      end: -inputRange.moveEnd('character', -length)
    };
  }

  //Return 0's on no selection data
  return { begin: 0, end: 0 };
};

//
// Set the caret position at a specified location
//
inptSel.set = function (el, pos) {
  // Normalize pos
  if (typeof pos !== 'object') {
    pos = { begin: pos, end: pos };
  }

  // If normal browser
  if (el.setSelectionRange) {
    el.focus();
    el.setSelectionRange(pos.begin, pos.end);

  // IE = TextRange fun
  } else if (el.createTextRange) {
    var range = el.createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos.end);
    range.moveStart('character', pos.begin);
    range.select();
  }
};


// Expose
module.exports = inptSel;


