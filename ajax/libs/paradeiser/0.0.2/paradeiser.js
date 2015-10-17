(function() {
  var paradeiser_open;

  paradeiser_open = false;

  $('.dropdown').on('click touch', function(event) {
    var greybox, paradeiser_link;
    event.preventDefault();
    paradeiser_link = $(this);
    greybox = $('#paradeiser-greybox');
    if (greybox.is('.visible')) {
      paradeiser_open = false;
      paradeiser_link.find('.children').removeClass('visible');
      return greybox.removeClass('visible');
    } else {
      paradeiser_open = true;
      paradeiser_link.find('.children').addClass('visible');
      return greybox.addClass('visible');
    }
  });

  $('<div id="paradeiser-greybox"></div>').insertAfter('.paradeiser').on('click touch', function(event) {
    if (paradeiser_open === true) {
      $('#paradeiser-greybox').removeClass('visible');
      return $('.children').removeClass('visible');
    }
  });

}).call(this);
