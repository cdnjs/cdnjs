const {
  parentPort,
  workerData
} = require('worker_threads');

parentPort.on('message', message => {
  let args = Object.keys(message).filter(function (key) {
    return key.match(/^argument/);
  }).sort(function (a, b) {
    return parseInt(a.slice(8), 10) - parseInt(b.slice(8), 10);
  }).map(function (key) {
    return message[key];
  });

  try {
    let result = eval('(' + message.func + ')').apply(null, args);

    if (typeof Promise != 'undefined' && result instanceof Promise) {
      result.then(function (result) {
        parentPort.postMessage({
          id: message.id,
          result: result
        });
      }).catch(function (error) {
        parentPort.postMessage({
          id: message.id,
          error: error.stack
        });
      });
    } else {
      parentPort.postMessage({
        id: message.id,
        result: result
      });
    }
  } catch (error) {
    parentPort.postMessage({
      id: message.id,
      error: error.stack
    });
  }
});