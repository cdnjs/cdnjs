(function() {
  var paradeiser_open;

  paradeiser_open = false;

  $('.paradeiser_dropdown :not(.children)').on('click touch', function(event) {
    var greybox, paradeiser_link;
    console.log('preventing link');
    event.preventDefault();
    paradeiser_link = $(this);
    greybox = $('#paradeiser-greybox');
    if (greybox.is('.visible')) {
      paradeiser_open = false;
      $('.paradeiser_dropdown .paradeiser_children').removeClass('visible');
      return greybox.removeClass('visible');
    } else {
      paradeiser_open = true;
      $('.paradeiser_dropdown .paradeiser_children').addClass('visible');
      return greybox.addClass('visible');
    }
  });

  $('<div id="paradeiser-greybox"></div>').insertAfter('.paradeiser').on('click touch', function(event) {
    if (paradeiser_open === true) {
      paradeiser_open = false;
      $('#paradeiser-greybox').removeClass('visible');
      return $('.paradeiser_children').removeClass('visible');
    }
  });

}).call(this);
