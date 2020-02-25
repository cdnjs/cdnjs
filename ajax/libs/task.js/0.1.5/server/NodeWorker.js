function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const cp = require('child_process');

const GeneralWorker = require('../GeneralWorker');

class NodeWorker extends GeneralWorker {
  constructor($config) {
    super(...arguments);

    _defineProperty(this, "_onExit", () => {
      if (!this._alive) {
        return;
      }

      if (this._debug) {
        this._log({
          action: 'killed'
        });
      }

      this._alive = false;
      this.handleWorkerExit();
    });

    _defineProperty(this, "_onMessage", message => {
      this.handleWorkerMessage(message);
    });

    _defineProperty(this, "postMessage", message => {
      if (this._debug) {
        this._log({
          taskId: message.id,
          action: 'send_task_to_actual_worker',
          message: `sending taskId(${message.id}) to worker process`
        });
      }

      this._worker.send(message);
    });

    _defineProperty(this, "terminate", () => {
      if (this._debug) {
        this._log({
          action: 'terminated'
        });
      }

      this._worker.kill();
    });

    $config = $config || {};
    this._worker = cp.fork(`${__dirname}/EvalWorker.js`, {
      env: $config.env
    });

    this._worker.on('message', this._onMessage);

    this._worker.on('exit', this._onExit);

    this._worker.on('close', this._onExit);

    this._worker.on('disconnect', this._onExit);

    this._worker.on('error', this._onExit);

    this._alive = true;

    if (this._debug) {
      this._log({
        action: 'initialized'
      });
    }
  }

  _log(data) {
    let event = {
      source: 'worker_thread',
      managerId: this.managerId,
      workerId: this.id,
      processId: this._worker.pid
    };
    Object.keys(data).forEach(key => {
      event[key] = data[key];
    });

    if (!event.message) {
      event.message = event.action;
    }

    this._logger(event);
  }

}

module.exports = NodeWorker;