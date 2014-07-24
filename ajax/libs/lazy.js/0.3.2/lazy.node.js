var fs     = require("fs");
var http   = require("http");
var os     = require("os");
var Stream = require("stream");
var URL    = require("url");
var util   = require("util");

// The starting point is everything that works in any environment (browser OR
// Node.js)
var Lazy = require("./lazy.js");

/**
 * @constructor
 */
function StreamedSequence(stream) {
  this.stream = stream;
}

StreamedSequence.prototype = new Lazy.StreamLikeSequence();

StreamedSequence.prototype.openStream = function(callback) {
  this.stream.resume();
  callback(this.stream);
};

/**
 * Handles every chunk of data in this sequence.
 *
 * @param {function(string):*} fn The function to call on each chunk of data as
 *     it's read from the stream. Return false from the function to stop reading
 *     the stream.
 */
StreamedSequence.prototype.each = function(fn) {
  var cancelled = false;

  var handle = new Lazy.AsyncHandle(function cancel() { cancelled = true; });

  this.openStream(function(stream) {
    if (stream.setEncoding) {
      stream.setEncoding(this.encoding || 'utf8');
    }

    var listener = function(e) {
      try {
        if (cancelled || fn(e) === false) {
          stream.removeListener("data", listener);
          handle._resolve(false);
        }
      } catch (e) {
        handle._reject(e);
      }
    };

    stream.on("data", listener);

    stream.on("end", function() {
      handle._resolve(true);
    });
  });

  return handle;
};

/**
 * Creates a {@link Sequence} of lines as they are read from a file.
 *
 * @return {Sequence} A sequence comprising the lines in the underlying file, as
 *     they are read.
 */
StreamedSequence.prototype.lines = function() {
  return this.split(os.EOL || "\n");
};

function FileStreamSequence(path, encoding) {
  this.path = path;
  this.encoding = encoding;
}

FileStreamSequence.prototype = new StreamedSequence();

FileStreamSequence.prototype.openStream = function(callback) {
  var stream = fs.createReadStream(this.path, { autoClose: true });
  callback(stream);
};

/**
 * Creates a {@link Sequence} from a file stream, whose elements are chunks of
 * data as the stream is read. This is an {@link AsyncSequence}, so methods such
 * as {@link Sequence#reduce} return an {@link AsyncHandle} rather than a value.
 *
 * @param {string} path A path to a file.
 * @param {string} encoding The text encoding of the file (e.g., "utf-8").
 * @return {Sequence} The streamed sequence.
 */
Lazy.readFile = function(path, encoding) {
  return new FileStreamSequence(path, encoding);
};

function HttpStreamSequence(url, encoding) {
  this.url = url;
  this.encoding = encoding;
}

HttpStreamSequence.prototype = new StreamedSequence();

HttpStreamSequence.prototype.openStream = function(callback) {
  http.get(URL.parse(this.url), callback);
};

/**
 * Creates a {@link Sequence} from an HTTP stream, whose elements are chunks of
 * data as the stream is read. This sequence works asynchronously, so
 * synchronous methods such as {@code indexOf}, {@code any}, and {@code toArray}
 * won't work.
 *
 * @param {string} url The URL for the HTTP request.
 * @return {Sequence} The streamed sequence.
 */
Lazy.makeHttpRequest = function(url) {
  return new HttpStreamSequence(url);
};

if (typeof Stream.Readable !== "undefined") {
  Lazy.Sequence.prototype.toStream = function toStream(options) {
    return new LazyStream(this, options);
  };

  Lazy.Sequence.prototype.pipe = function pipe(destination) {
    this.toStream().pipe(destination);
  };

  function LazyStream(sequence, options) {
    options = Lazy(options || {})
      .extend({ objectMode: true })
      .toObject();

    Stream.Readable.call(this, options);

    this.sequence = sequence;
    this.started  = false;
  }

  util.inherits(LazyStream, Stream.Readable);

  LazyStream.prototype._read = function() {
    var self = this;

    if (!this.started) {
      var handle = this.sequence.each(function(e, i) {
        return self.push(e, i);
      });
      if (handle instanceof Lazy.AsyncHandle) {
        handle.onComplete(function() {
          self.push(null);
        });
      }
      this.started = true;
    }
  };
}

/*
 * Add support for `Lazy(Stream)`.
 */
Lazy.extensions || (Lazy.extensions = []);

Lazy.extensions.push(function(source) {
  if (source instanceof Stream) {
    return new StreamedSequence(source);
  }
});

module.exports = Lazy;
