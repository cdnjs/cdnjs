const isModern = require('./isModern');

const WorkerManager = require('../WorkerManager');

const generateTaskFactoryMethod = require('../generateTaskFactoryMethod');

let WorkerProxies;

if (isModern()) {
  WorkerProxies = {
    DefaultWorkerProxy: require('./WebWorker')
  };
}

module.exports = class ClientWorkerManager extends WorkerManager {
  constructor($config = {}) {
    if (!WorkerProxies) {
      throw new Error('The browser does not support Workers');
    }

    let config = {
      workerType: 'web_worker'
    };
    Object.keys($config).forEach(key => config[key] = $config[key]);
    super(config, WorkerProxies);
  }

};