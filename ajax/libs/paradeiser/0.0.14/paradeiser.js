(function() {
  var paradeiser_open;

  paradeiser_open = false;

  $('.paradeiser_dropdown :not(.paradeiser_children)').on('click', function(event) {
    var paradeiser_dropdown;
    paradeiser_dropdown = $(this);
    if (paradeiser_dropdown.parents('.paradeiser_children').length) {

    } else {
      event.preventDefault();
    }
    return $('.paradeiser_dropdown .paradeiser_children, #paradeiser-greybox').toggleClass('visible');
  });

  $('<div id="paradeiser-greybox"></div>').insertAfter('.paradeiser').on('click', function(event) {
    return $('.paradeiser_dropdown .paradeiser_children, #paradeiser-greybox').removeClass('visible');
  });

}).call(this);
