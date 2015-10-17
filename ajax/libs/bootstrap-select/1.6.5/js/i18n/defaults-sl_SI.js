/*!
 * Bootstrap-select v1.6.5 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2015 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: 'Nič izbranega',
    noneResultsText: 'Ni zadetkov za {0}',
    countSelectedText: function (numSelected, numTotal) {
      "Število izbranih: {0}";
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        'Omejitev dosežena (max. izbranih: {n})',
        'Omejitev skupine dosežena (max. izbranih: {n})'
      ];
    },
    selectAllText: 'Izberi vse',
    deselectAllText: 'Počisti izbor',
    multipleSeparator: ', '
  };
})(jQuery);
