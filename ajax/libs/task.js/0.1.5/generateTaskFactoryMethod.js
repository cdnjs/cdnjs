module.exports = function generateTaskFactoryMethod(defaults, WorkerProxy, WorkerManager) {
  return function ($config, WorkerProxyOverride) {
    let config = {}; // clone defaults

    Object.keys(defaults).forEach(key => config[key] = defaults[key]); // apply user settings

    Object.keys($config).forEach(key => config[key] = $config[key]);
    return new WorkerManager(config, WorkerProxyOverride || WorkerProxy);
  };
};