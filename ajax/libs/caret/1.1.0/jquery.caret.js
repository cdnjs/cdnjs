(function($) {
  $.fn.caret = function(pos) {
    var target = this[0];
    //get
    if (arguments.length == 0) {
      //HTML5
      if (window.getSelection) {
        //contenteditable
        if (target.contentEditable == 'true') {
          target.focus();
          var range1 = window.getSelection().getRangeAt(0);
          var range2 = range1.cloneRange();
          range2.selectNodeContents(target);
          range2.setEnd(range1.endContainer, range1.endOffset);
          return range2.toString().length;
        }
        //textarea
        return target.selectionStart;
      }
      //IE<9
      if (document.selection) {
        target.focus();
        var range1 = document.selection.createRange();
        var range2 = document.body.createTextRange();
        range2.moveToElementText(target);
        range2.setEndPoint('EndToEnd', range1);
        return range2.text.length;
      }
      //not supported
      return 0;
    }
    //set
    //HTML5
    if (window.getSelection) {
      //contenteditable
      if (target.contentEditable == 'true') {
        target.focus();
        window.getSelection().collapse(target.firstChild, pos);
      }
      //textarea
      else
        target.setSelectionRange(pos, pos);
    }
    //IE<9
    else if (document.body.createTextRange) {
      var range = document.body.createTextRange();
      range.moveToElementText(target)
      range.moveStart('character', pos);
      range.collapse(true);
      range.select();
    }
  }
})(jQuery)