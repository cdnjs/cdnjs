Ext.require([
    "*"
]);
Ext.onReady(function () {
    if (/loadSpecs=true/i.test(location.search)) {
        Ext.Loader.loadScripts({
            url: ["../bootstrap-specs.js"]
        });
    } else if(Ext.cmd && Ext.cmd.api) {
        Ext.cmd.api.startTests();
    }
});
