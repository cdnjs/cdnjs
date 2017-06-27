/*
 * Wrapped stacktrace
 *
 * We need this because in some implementations, constructing a trace is slow
 * and so we want to defer accessing the trace for as long as possible
 */
Zone.Stacktrace = function (e) {
  this._e = e;
};
Zone.Stacktrace.prototype.get = function () {
  var frames = this._e.stack.split('\n');

  var markerIndex;
  for (var markerIndex = frames.length - 1; markerIndex >= 0; markerIndex -= 1) {
    if (frames[markerIndex].indexOf('marker@') === 0) {
      return frames.slice(markerIndex+1).join('\n');
    }
  }
  return this._e.stack;
}

Zone.getStacktrace = function () {
  function getStacktraceWithUncaughtError () {
    return new Zone.Stacktrace(new Error());
  }

  function getStacktraceWithCaughtError () {
    try {
      throw new Error();
    } catch (e) {
      return new Zone.Stacktrace(e);
    }
  }

  // Some implementations of exception handling don't create a stack trace if the exception
  // isn't thrown, however it's faster not to actually throw the exception.
  var stack = getStacktraceWithUncaughtError();
  if (stack && stack._e.stack) {
    Zone.getStacktrace = getStacktraceWithUncaughtError;
    return stack;
  } else {
    Zone.getStacktrace = getStacktraceWithCaughtError;
    return Zone.getStacktrace();
  }
};

Zone.longStackTraceZone = {
  getLongStacktrace: function (exception) {
    var trace = [exception.stack];
    var zone = this;
    var now = Date.now();
    while (zone && zone.constructedAtException) {
      trace.push(
          '--- ' + (Date(zone.constructedAtTime)).toString() +
            ' - ' + (now - zone.constructedAtTime) + 'ms ago',
          zone.constructedAtException.get());
      zone = zone.parent;
    }
    return trace.join('\n');
  },

  onError: function (exception) {
    var reporter = this.reporter || console.log.bind(console);
    reporter(exception.toString());
    reporter(this.getLongStacktrace(exception));
  },

  fork: function (locals) {
    var newZone = this._fork(locals);
    newZone.constructedAtException = Zone.getStacktrace();
    newZone.constructedAtTime = Date.now();
    return newZone;
  },

  _fork: zone.fork
};

