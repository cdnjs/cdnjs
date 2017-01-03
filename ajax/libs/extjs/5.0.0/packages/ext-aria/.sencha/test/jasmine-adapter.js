SenchaTestRunner.bindings = {
        
    setCurrentScript : function(script) {
        jasmine.setCurrentScript(script);
    },
    
    waitUntilPageIsReady : function(callbackFunction) {
        var args = arguments;
        if (typeof Ext !== 'undefined') {
            Ext.require('*');
            Ext.onReady(function() {
                callbackFunction();
            });
        } else {
            callbackFunction();
        }
    },
    
    startTestRunner : function(jsonOptions, contextDirectoryMapping) {
//        jasmine.contextMapping = JSON.parse(contextDirectoryMapping);
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
        
};
