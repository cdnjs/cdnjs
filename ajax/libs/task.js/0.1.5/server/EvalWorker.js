process.on('message', message => {
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
        process.send({
          id: message.id,
          result: result
        });
      }).catch(function (error) {
        process.send({
          id: message.id,
          error: error.stack
        });
      });
    } else {
      process.send({
        id: message.id,
        result: result
      });
    }
  } catch (error) {
    process.send({
      id: message.id,
      error: error.stack
    });
  }
});