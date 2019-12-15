/**
 * Copyright (c) Tiny Technologies, Inc. All rights reserved.
 * Licensed under the LGPL or a commercial license.
 * For LGPL see License.txt in the project root for license information.
 * For commercial licenses see https://www.tiny.cloud/
 *
 * Version: 5.0.6 (2019-05-22)
 */
(function () {
var colorpicker = (function (domGlobals) {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    global.add('colorpicker', function () {
      domGlobals.console.warn('Color picker plugin is now built in to the core editor, please remove it from your editor configuration');
    });
    function Plugin () {
    }

    return Plugin;

}(window));
})();
