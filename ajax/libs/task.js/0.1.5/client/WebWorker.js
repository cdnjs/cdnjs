function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const functionToObjectURL = require('./functionToObjectURL');

const GeneralWorker = require('../GeneralWorker');

class WebWorker extends GeneralWorker {
  constructor($config) {
    super(...arguments);

    _defineProperty(this, "WORKER_SOURCE", `function () {
		let global = new Proxy(
		  {},
		  {
		    set: (obj, prop, newval) => (self[prop] = newval)
		  }
		);

		onmessage = function (event) {
			var message = event.data;

			var args = Object.keys(message).filter(function (key) {
				return key.match(/^argument/);
			}).sort(function (a, b) {
				return parseInt(a.slice(8), 10) - parseInt(b.slice(8), 10);
			}).map(function (key) {
				return message[key];
			});

			try {
				var result = eval('(' + message.func + ')').apply(null, args);

				if (result && result.then && result.catch && result.finally) {
					result.then(result => {
						self.postMessage({id: message.id, result: result});
					}).catch(error => {
						self.postMessage({id: message.id, error: error.stack});
					});
				} else {
					self.postMessage({id: message.id, result: result});
				}
			} catch (error) {
				self.postMessage({id: message.id, error: error.stack});
			}
		}
	}`);

    _defineProperty(this, "_onMessage", event => {
      let message = event.data;
      this.handleWorkerMessage(message);
    });

    _defineProperty(this, "postMessage", (message, transferables) => {
      if (this._debug) {
        this._log({
          taskId: message.id,
          action: 'send_task_to_actual_worker',
          message: `sending taskId(${message.id}) to worker process`
        });
      }

      this._worker.postMessage(message, transferables);
    });

    _defineProperty(this, "terminate", () => {
      if (this._debug) {
        this._log({
          message: 'terminated'
        });
      }

      this._worker.terminate();
    });

    this._worker = new Worker(functionToObjectURL(this.WORKER_SOURCE));

    this._worker.addEventListener('message', this._onMessage);

    if (this._debug) {
      this._log({
        action: 'initialized'
      });
    }
  }

}

module.exports = WebWorker;