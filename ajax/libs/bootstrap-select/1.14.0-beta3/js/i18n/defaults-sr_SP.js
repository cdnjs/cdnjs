/*!
 * Bootstrap-select v1.14.0-beta3 (https://developer.snapappointments.com/bootstrap-select)
 *
 * Copyright 2012-2022 SnapAppointments, LLC
 * Licensed under MIT (https://github.com/snapappointments/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return (factory(a0));
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
}(this, function (jQuery) {

(function ($) {
  $.fn.selectpicker.defaults = {
    noneSelectedText: 'Izaberite',
    noneResultsText: 'Nema rezultata za {0}',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? '{0} izabrana' : '{0} izabrane';
    },
    maxOptionsText: function (numAll, numGroup) {
      return [
        (numAll == 1) ? 'Limit je dostignut ({n} stvar maximalno)' : 'Limit je dostignut ({n} stavke maksimalno)',
        (numGroup == 1) ? 'Grupni limit je dostignut ({n} stvar maksimalno)' : 'Grupni limit je dostignut ({n} stavke maksimalno)'
      ];
    },
    selectAllText: 'Izaberi sve',
    deselectAllText: 'Obrisi sve',
    multipleSeparator: ', '
  };
})(jQuery);


}));
//# sourceMappingURL=defaults-sr_SP.js.map