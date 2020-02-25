const os = require('os');

const NodeWorker = require('./NodeWorker');

const NodeWorkerThread = require('./NodeWorkerThread');

const SimulatedWorker = require('./SimulatedWorker');

const WorkerManager = require('../WorkerManager');

const generateTaskFactoryMethod = require('../generateTaskFactoryMethod');

const defaults = {
  maxWorkers: os.cpus().length
};
module.exports = class ServerWorkerManager extends WorkerManager {
  constructor($config = {}) {
    let config = {
      workerType: 'fork_worker'
    };
    Object.keys($config).forEach(key => config[key] = $config[key]);
    super(config, {
      DefaultWorkerProxy: NodeWorker,
      NodeWorkerThread,
      SimulatedWorker
    });
  }

};