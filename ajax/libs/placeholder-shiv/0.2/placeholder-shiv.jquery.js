$(document).ready(function() {
  var _test = document.createElement('input');
  if( ! ('placeholder' in _test) ){
  //we are in the presence of a less-capable browser
    $(document).on({
      focus: function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
          input.removeClass('placeholder');
        }
      },
      blur: function() {
        var input = $(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
          input.addClass('placeholder');
          input.val(input.attr('placeholder'));
        }
      }
    },"input[placeholder]");
    $(document).on("submit","form",function() {
      $(this).find('input[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      });
    });
  }
});
