function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Transferables {
  constructor(transferables) {
    this.transferables = transferables.map(transferable => {
      if (!(transferable instanceof ArrayBuffer) && transferable && transferable.buffer instanceof ArrayBuffer) {
        return transferable.buffer;
      } else if (transferable instanceof ArrayBuffer) {
        return transferable;
      } else {
        throw new Error('Task.js: invalid transferable argument (ensure its a buffer backed array, or a buffer)');
      }
    });
  }

  toArray() {
    return this.transferables;
  }

}

class WorkerManager {
  constructor($config, WorkerProxies) {
    _defineProperty(this, "_next", () => {
      if (this._terminated) {
        return;
      }

      if (this._taskTimeout) {
        this._reissueTasksInTimedoutWorkers();
      }

      if (!this._queue.length) {
        return;
      }

      let worker = this._getWorker();

      if (!worker) {
        setTimeout(this._next, 0);
        return;
      }

      let task = this._queue.shift();

      if (this._debug) {
        this._log({
          action: 'send_task_to_worker',
          taskId: task.id,
          workerId: worker.id,
          message: `sending taskId(${task.id}) to workerId(${worker.id})`
        });
      }

      worker.run(task);
    });

    _defineProperty(this, "_onWorkerTaskComplete", () => {
      this._next();
    });

    _defineProperty(this, "_onWorkerExit", worker => {
      if (this._debug) {
        this._log({
          action: 'worker_died',
          workerId: worker.id,
          message: `worker died, reissuing tasks`
        });
      } // purge dead worker from pool


      this._workers = this._workers.filter(item => item != worker); // add work back to queue

      worker.tasks.forEach(task => {
        this._queue.push(task.$options);
      }); // run tick

      this._next();
    });

    $config = $config || {};
    this.id = ++WorkerManager.managerCount;
    this._workerType = $config.workerType;

    if (this._workerType === 'worker_threads') {
      try {
        require('worker_threads');
      } catch (error) {
        throw new Error('Your current version, or configuration of Node.js does not support worker_threads.');
      }

      this._WorkerProxy = WorkerProxies.NodeWorkerThread;
    } else if (this._workerType === 'simulated_worker') {
      this._WorkerProxy = WorkerProxies.SimulatedWorker;
    } else {
      this._WorkerProxy = WorkerProxies.DefaultWorkerProxy;
    }

    this._logger = $config.logger || console.log;
    this._requires = $config.requires;
    this._workerTaskConcurrency = ($config.workerTaskConcurrency || 1) - 1;
    this._maxWorkers = $config.maxWorkers || 1;
    this._idleTimeout = $config.idleTimeout === false ? false : $config.idleTimeout;
    this._taskTimeout = $config.taskTimeout || 0;
    this._idleCheckInterval = 1000;
    this._warmStart = $config.warmStart || false;
    this._warmStartCompleted = false;
    this._globals = $config.globals;
    this._env = $config.env;
    this._globalsInitializationFunction = $config.initialize;
    this._debug = $config.debug;
    this._terminated = false;

    if (this._debug) {
      this._log({
        action: 'create_new_pool',
        message: `creating new pool : ${JSON.stringify($config)}`,
        config: $config
      });
    }

    this._workers = [];
    this._workersInitializing = [];
    this._queue = [];
    this._onWorkerTaskComplete = this._onWorkerTaskComplete.bind(this);
    this._flushIdleWorkers = this._flushIdleWorkers.bind(this);
    this._totalWorkersCreated = 0;
    this._lastTaskTimeoutCheck = new Date();

    if (this._warmStart) {
      setTimeout(() => {
        if (this._debug) {
          this._log({
            action: 'warmstart',
            message: 'warm starting workers'
          });
        }

        for (let i = 0; i < this._maxWorkers; i++) {
          this._createWorker();
        }

        this._warmStartCompleted = true;

        if (this._debug) {
          this._log({
            action: 'warmstart_completed',
            message: 'started workers'
          });
        }
      }, 0);
    }
  }

  _log(data) {
    let event = {
      source: 'manager',
      managerId: this.id
    };
    Object.keys(data).forEach(key => {
      event[key] = data[key];
    });

    if (!event.message) {
      event.message = event.action;
    }

    this._logger(event, this);
  }

  getActiveWorkerCount() {
    return this._workersInitializing.length + this._workers.length;
  }

  _run(task) {
    if (this._terminated) {
      return;
    }

    if (this._idleTimeout && typeof this._idleCheckIntervalID !== 'number') {
      this._idleCheckIntervalID = setInterval(this._flushIdleWorkers, this._idleCheckInterval);
    }

    if (!task.arguments || typeof task.arguments.length === 'undefined') {
      throw new Error('task.js: "arguments" is required property, and it must be an array/array-like');
    }

    if (!task.function && (typeof task.function !== 'function' || typeof task.function !== 'string')) {
      throw new Error('task.js: "function" is required property, and it must be a string or a function');
    }

    if (typeof task.arguments === 'object') {
      task.arguments = Array.prototype.slice.call(task.arguments);
    }

    task.id = ++WorkerManager.taskCount;

    if (this._debug) {
      this._log({
        action: 'add_to_queue',
        taskId: task.id,
        message: `added taskId(${task.id}) to the queue`
      });
    }

    return new Promise(function (resolve, reject) {
      task.resolve = resolve;
      task.reject = reject;

      this._queue.push(task);

      this._next();
    }.bind(this));
  }

  _runOnWorker(worker, args, func) {
    return new Promise(function (resolve, reject) {
      worker.run({
        id: ++WorkerManager.taskCount,
        arguments: args,
        function: func,
        resolve: resolve,
        reject: reject
      });
    });
  }

  static transferables(...args) {
    return new Transferables(args);
  }

  run(func, ...args) {
    let wrappedFunc = this.wrap(func);
    return wrappedFunc(...args);
  }

  wrap(func) {
    return function () {
      let args = Array.from(arguments),
          transferables = null,
          lastArg = args.slice(-1)[0];

      if (lastArg instanceof Transferables) {
        transferables = lastArg.toArray();
        args = args.slice(0, -1);
      }

      return this._run({
        arguments: args,
        transferables,
        function: func
      });
    }.bind(this);
  }

  terminate() {
    if (this._debug) {
      this._log({
        action: 'terminated',
        message: 'terminated'
      });
    }

    this._terminated = true; // kill idle timeout (if it exists)

    if (this._idleTimeout && typeof this._idleCheckIntervalID == 'number') {
      clearInterval(this._idleCheckIntervalID);
      this._idleCheckIntervalID = null;
    } // terminate all existing workers


    this._workers.forEach(function (worker) {
      worker.terminate();
    }); // flush worker pool


    this._workers = [];
    this._queue = [];
  }

  _reissueTasksInTimedoutWorkers() {
    if (new Date() - this._lastTaskTimeoutCheck < 5000) {
      return;
    }

    this._lastTaskTimeoutCheck = new Date();

    this._workers.forEach(worker => {
      worker.tasks.some(task => {
        if (new Date() - task.startTime >= this._taskTimeout) {
          worker.forceExit();
          return true;
        }
      });
    });
  }

  _flushIdleWorkers() {
    if (this._debug) {
      this._log({
        action: 'flush_idle_workers',
        message: `flushing idle workers`
      });
    }

    this._workers = this._workers.filter(function (worker) {
      if (worker.tasks.length === 0 && new Date() - worker.lastTaskTimestamp > this._idleTimeout) {
        worker.terminate();
        return false;
      } else {
        return true;
      }
    }, this);
  }

  _getWorker() {
    let idleWorkers = this._workers.filter(worker => worker.tasks.length <= this._workerTaskConcurrency).sort((a, b) => a.tasks.length - b.tasks.length);

    if (idleWorkers.length) {
      return idleWorkers[0];
    } else if (this._workers.length < this._maxWorkers && this._workersInitializing.length === 0 && !(this._warmStart && !this._warmStartCompleted)) {
      return this._createWorker();
    } else {
      return null;
    }
  }

  _createWorker() {
    let workerId = ++this._totalWorkersCreated;
    let worker = new this._WorkerProxy({
      debug: this._debug,
      logger: this._logger,
      env: this._env,
      id: workerId,
      managerId: this.id,
      onTaskComplete: this._onWorkerTaskComplete,
      onExit: this._onWorkerExit
    });

    if (this._globalsInitializationFunction || this._globals || this._requires) {
      if (this._debug) {
        this._log({
          action: 'run_global_initialize',
          message: `running global initialization code`
        });
      }

      let requireCode;

      if (this._workerType === 'web_worker') {
        requireCode = `
				if (Object.keys(requires).length) {
					importScripts(...Object.values(requires));

					Object.keys(requires).forEach(key => {
						if (typeof self[key] === 'undefined') {
							throw new Error('Task.js: require failed importing ' + key + ' ("' + requires[key] + '")');
						}
					});
				}
				`;
      } else {
        requireCode = `
				Object.keys(requires).forEach(key => {
					global[key] = require(requires[key]);
				});
				`;
      }

      let globalsInitializationFunction = `function (_globals) {
				let requires = ${JSON.stringify(this._requires || {})};

				${requireCode}

				if (typeof _globals != 'undefined') {
					Object.keys(_globals).forEach(key => {
						global[key] = _globals[key];
					});
				}

				(${(this._globalsInitializationFunction || (() => {})).toString()})();
			}`.trim();

      this._workersInitializing.push(worker);

      this._runOnWorker(worker, [this._globals || {}], globalsInitializationFunction).then(function () {
        this._workersInitializing = this._workersInitializing.filter(item => item != worker);

        this._workers.push(worker);
      }.bind(this));

      return null;
    } else {
      this._workers.push(worker);

      return worker;
    }
  }

}

_defineProperty(WorkerManager, "managerCount", 0);

_defineProperty(WorkerManager, "taskCount", 0);

module.exports = WorkerManager;