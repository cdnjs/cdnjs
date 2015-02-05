$(document).ready(function() {
  var hash = window.location.hash.replace('#', '');

  if (hash && $('.' + hash).length) {
    var point = $('.' + hash).offset().top - 40;

    if (window.Zepto) {
      window.scrollTo(0, point);
    } else {
      $(window).scrollTop($('.' + hash).offset().top - 40);
    };
  };

  $('.skin dt').click(function() {
    $(this).siblings().removeClass('selected').end().prev('dd').andSelf().addClass('selected');
  });

  $('.arrows .top, .arrows .bottom, .features .self, .skins-info .self, .usage .self').click(function(event) {
    var target = $(this).data('to'),
      target_offset = $('.' + target).offset().top;

    event.preventDefault();
    window.location.hash = target;

    if (window.Zepto) {
      window.scrollTo(0, target_offset - 40);
    } else {
      $('html, body').stop().animate({scrollTop: target_offset - 40}, 600);
    };
  });

  $('.colors li').click(function() {
    var self = $(this);

    if (!self.hasClass('active')) {
      self.siblings().removeClass('active');

      var skin = self.closest('.skin'),
        color = self.attr('class') ? '-' + self.attr('class') : '',
        checkbox = skin.data('icheckbox'),
        radio = skin.data('iradio'),
        checkbox_default = 'icheckbox_minimal',
        radio_default = 'iradio_minimal';

      if (skin.hasClass('skin-square')) {
        checkbox_default = 'icheckbox_square', radio_default = 'iradio_square';
        checkbox == undefined && (checkbox = 'icheckbox_square-green', radio = 'iradio_square-green');
      };

      if (skin.hasClass('skin-flat')) {
        checkbox_default = 'icheckbox_flat', radio_default = 'iradio_flat';
        checkbox == undefined && (checkbox = 'icheckbox_flat-red', radio = 'iradio_flat-red');
      };

      if (skin.hasClass('skin-line')) {
        checkbox_default = 'icheckbox_line', radio_default = 'iradio_line';
        checkbox == undefined && (checkbox = 'icheckbox_line-blue', radio = 'iradio_line-blue');
      };

      checkbox == undefined && (checkbox = checkbox_default, radio = radio_default);

      skin.find('input, .skin-states .state').each(function() {
        var element = $(this).hasClass('state') ? $(this) : $(this).parent(),
          element_class = element.attr('class').replace(checkbox, checkbox_default + color).replace(radio, radio_default + color);

        element.attr('class', element_class);
      });

      skin.data('icheckbox', checkbox_default + color);
      skin.data('iradio', radio_default + color);
      self.addClass('active');
    };
  });

  $('.demo-methods dt .self').click(function() {
    var self = $(this),
      self_class = self.attr('class').replace('self ', '');

    switch (self_class) {
      case 'do-check':
        $('#input-1, #input-3').iCheck('check');
        break;
      case 'do-uncheck':
        $('#input-1, #input-3').iCheck('uncheck');
        break;
      case 'do-disable':
        $('#input-2, #input-4').iCheck('disable');
        break;
      case 'do-enable':
        $('#input-2, #input-4').iCheck('enable');
        break;
      case 'do-destroy':
        $('.demo-list input').iCheck('destroy');
        break;
      default:
        var text = self.hasClass('active') ? 'show code' : 'hide code';

        self.toggleClass('active').text(text);

        if (window.Zepto) {
          $(this).closest('dt').next().toggle();
        } else {
          $(this).closest('dt').next().slideToggle(200);
        };

        break;
    };
  });
});