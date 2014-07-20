SenchaTestRunner.bindings = {
        
    setCurrentScript : function(script) {
        jasmine.setCurrentScript(script);
    },
    
    waitUntilPageIsReady : function(callbackFunction) {
        var args = arguments;
        if (typeof Ext !== 'undefined') {
            Ext.require('*');
            Ext.onReady(function() {
                window.__pageIsReady = true;
            });
        } else {
            window.__pageIsReady = true;
        }
    },
    
    startTestRunner : function(jsonOptions, contextDirectoryMapping) {
        addGlobal('__pageIsReady');
        addGlobal('__injectionDone');
        jasmine.setOptions(jsonOptions);
        jasmine.initDebug();
        jasmine.getEnv().addReporter(new SenchaTestRunner.Reporter());
        jasmine.getEnv().execute();
    },
    
    testsAreRunning : function() {
        return SenchaTestRunner.isRunning();
    },
    
    getTestResultsAsJson : function() {
        return JSON.stringify(SenchaTestRunner.results);
    }
        
}
