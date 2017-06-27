(function() {
  var paradeiser_open;

  paradeiser_open = false;

  $('.paradeiser_dropdown').on('click', function(event) {
    var target;
    target = $(event.target);
    if (!target.parents('.paradeiser_children').length) {
      event.preventDefault();
    }
    return $('.paradeiser_dropdown .paradeiser_children, #paradeiser-greybox').toggleClass('visible');
  });

  $('<div id="paradeiser-greybox"></div>').insertAfter('.paradeiser').on('click', function(event) {
    return $('.paradeiser_dropdown .paradeiser_children, #paradeiser-greybox').removeClass('visible');
  });

}).call(this);
