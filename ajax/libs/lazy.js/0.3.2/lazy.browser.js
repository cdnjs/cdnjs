(function(Lazy) {

  /**
   * A seqence of DOM nodes.
   *
   * You can get a `DomSequence` by wrapping a `NodeList` or `HTMLCollection`
   * with `Lazy`:
   *
   *     var paragraphs = Lazy(document.querySelectorAll('p'));
   *
   * @public
   * @constructor
   * @param {NodeList|HTMLCollection} source The underlying collection of DOM
   *     nodes.
   */
  function DomSequence(source) {
    this.source = source;
  }

  DomSequence.prototype = new Lazy.ArrayLikeSequence();

  DomSequence.prototype.get = function(i) {
    return this.source[i];
  };

  DomSequence.prototype.length = function() {
    return this.source.length;
  };

  /**
   * Provides a sequence comprising all of this sequence's nodes and their
   * descendents (children, grandchildren, etc.).
   *
   * @public
   * @returns {Sequence}
   */
  DomSequence.prototype.flatten = function() {
    return new FlattenedDomSequence(this.source);
  };

  function FlattenedDomSequence(source) {
    this.source = source;
  }

  FlattenedDomSequence.prototype = new Lazy.Sequence();

  FlattenedDomSequence.prototype.each = function(fn) {
    var i    = 0,
        done = false;

    Lazy(this.source).each(function(child) {
      if (fn(child, i++) === false) {
        return false;
      }

      Lazy(child.children).flatten().each(function(descendent) {
        if (fn(descendent, i++) === false) {
          done = true;
          return false;
        }
      });

      if (done) {
        return false;
      }
    });
  };

  /**
   * Creates a sequence comprising all of the `Event` objects from the given
   * event propagating through the node(s) in the current sequence.
   *
   * @public
   * @param {string} eventName The name of the event to catch.
   * @returns {AsyncSequence}
   */
  DomSequence.prototype.on = function(eventName) {
    return new DomEventSequence(this.source, eventName);
  };

  function DomEventSequence(element, eventName) {
    this.element = element;
    this.eventName = eventName;
  }

  DomEventSequence.prototype = new Lazy.Sequence();

  /**
   * Handles every event in this sequence.
   *
   * @param {function(Event):*} fn The function to call on each event in the
   *     sequence. Return false from the function to stop handling the events.
   */
  DomEventSequence.prototype.each = function(fn) {
    var element = this.element,
        eventName = this.eventName;

    var listener = function(e) {
      if (fn(e) === false) {
        element.removeEventListener(eventName, listener);
      }
    };

    this.element.addEventListener(this.eventName, listener);
  };

  /**
   * Creates a {@link Sequence} from the specified DOM events triggered on the
   * given element. This sequence works asynchronously, so synchronous methods
   * such as {@code indexOf}, {@code any}, and {@code toArray} won't work.
   *
   * @param {Element} element The DOM element to capture events from.
   * @param {string} eventName The name of the event type (e.g., 'keypress')
   *     that will make up this sequence.
   * @return {Sequence} The sequence of events.
   */
  Lazy.events = Lazy.deprecate(
    "Lazy.events is deprecated. Use Lazy('selector').on('event') instead",
    function(element, eventName) {
      return new DomEventSequence(element, eventName);
    }
  );

  /**
   * A `StreamingHttpSequence` is a {@link StreamLikeSequence} comprising the
   * chunks of data that are streamed in response to an HTTP request.
   *
   * @public
   * @param {string} url The URL of the HTTP request.
   * @constructor
   */
  function StreamingHttpSequence(url) {
    this.url = url;
  }

  StreamingHttpSequence.prototype = new Lazy.StreamLikeSequence();

  StreamingHttpSequence.prototype.each = function each(fn) {
    var request = new XMLHttpRequest(),
        index   = 0,
        aborted = false;

    request.open("GET", this.url);

    var listener = function listener(data) {
      if (!aborted) {
        data = request.responseText.substring(index);
        if (fn(data) === false) {
          request.removeEventListener("progress", listener, false);
          request.abort();
          aborted = true;
        }
        index += data.length;
      }
    };

    request.addEventListener("progress", listener, false);

    request.send();
  };

  /*
   * Add support for `Lazy(NodeList)` and `Lazy(HTMLCollection)`.
   */
  Lazy.extensions || (Lazy.extensions = []);

  Lazy.extensions.push(function(source) {
    if (source instanceof NodeList || source instanceof HTMLCollection) {
      return new DomSequence(source);
    }
  });

}(window.Lazy));
