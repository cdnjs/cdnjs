(function() {
  var paradeiser_open;

  paradeiser_open = false;

  $('.paradeiser_dropdown :not(.children)').on('click', function(event) {
    console.log('preventing link');
    event.preventDefault();
    return $('.paradeiser_dropdown .paradeiser_children, #paradeiser-greybox').toggleClass('visible');
  });

  $('<div id="paradeiser-greybox"></div>').insertAfter('.paradeiser').on('click', function(event) {
    return $('.paradeiser_dropdown .paradeiser_children, #paradeiser-greybox').removeClass('visible');
  });

}).call(this);
