(function() {
    var env = jasmine.getEnv();
    env.addReporter(parent.Test.SandBox.reporter);
    env.execute();
})();