/*
Copyright 2014, modulex@1.7.4
MIT Licensed
build time: Thu, 04 Dec 2014 20:34:09 GMT
*/
/**
 * use document.write to load external css files in block loading ways.
 * depends on loader.
 * @ignore
 * @author yiminghe@gmail.com
 */
(function (mx) {
  var method = 'writeln';

  function importStyle(modIds, __test) {
    if (typeof modIds === 'string') {
      modIds = modIds.split(',');
    }
    var Utils = mx.Loader.Utils;
    var Status = mx.Loader.Status;
    var each = Utils.each;
    var ComboLoader = mx.Loader.ComboLoader;
    var loader = new ComboLoader();
    var mods = Utils.createModules(modIds);
    var unloadedMods = [];
    each(mods, function (mod) {
      unloadedMods.push.apply(unloadedMods, mod.getNormalizedModules());
    });
    unloadedMods = loader.calculate(unloadedMods, []);
    var unloadedCssMods = [];
    each(unloadedMods, function (mod) {
      if (mod.getType() === 'css') {
        mod.status = Status.INITIALIZED;
        unloadedCssMods.push(mod);
      } else {
        mod.status = Status.UNLOADED;
      }
    });
    var comboUris = loader.getComboUris(unloadedCssMods);
    if (__test) {
      return comboUris;
    }
    // load css first to avoid page blink
    if (comboUris.css) {
      each(comboUris.css, function (rs) {
        document[method](' <link rel="stylesheet" href="' + rs.uri + '">');
      });
    }
  }

  mx.importStyle = importStyle;
})(modulex);
