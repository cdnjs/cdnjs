(function() {
  var paradeiser_open;

  paradeiser_open = false;

  $('.paradeiser_dropdown :not(.children)').on('click', function(event) {
    var greybox;
    console.log('preventing link');
    event.preventDefault();
    greybox = $('#paradeiser-greybox');
    if (greybox.is('.visible')) {
      $('.paradeiser_dropdown .paradeiser_children').removeClass('visible');
      return greybox.removeClass('visible');
    } else {
      $('.paradeiser_dropdown .paradeiser_children').addClass('visible');
      return greybox.addClass('visible');
    }
  });

  $('<div id="paradeiser-greybox"></div>').insertAfter('.paradeiser').on('click', function(event) {
    $('#paradeiser-greybox').removeClass('visible');
    return $('.paradeiser_children').removeClass('visible');
  });

}).call(this);
