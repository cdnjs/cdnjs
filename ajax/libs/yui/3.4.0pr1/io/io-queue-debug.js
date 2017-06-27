YUI.add('io-queue', function(Y) {

   /**
    * Extends the IO base class to implement Queue for synchronous
    * transaction processing.
    * @module io
    * @submodule io-queue
    */

   /**
    * @description Array of transactions queued for processing
    *
    * @property _yQ
    * @private
    * @static
    * @type Object
    */
    var _q = new Y.Queue(),

    _activeId,
   /**
    * @description Property to determine whether the queue is set to
    * 1 (active) or 0 (inactive).  When inactive, transactions
    * will be stored in the queue until the queue is set to active.
    *
    * @property _qState
    * @private
    * @static
    * @type int
    */
    _qState = 1;

   /**
    * @description Method Process the first transaction from the
    * queue in FIFO order.
    *
    * @method _shift
    * @private
    * @static
    * @return void
    */
    function _shift() {
        var o = _q.next();

        _activeId = o.id;
        _qState = 0;
        Y.io(o.uri, o.cfg, o.id);
    }

   /**
    * @description Method for promoting a transaction to the top of the queue.
    *
    * @method _unshift
    * @private
    * @static
    * @return void
    */
    function _unshift(o) {
        _q.promote(o);
    }

   /**
    * @description Method for requesting a transaction, and queueing the
    * request before it is sent to the resource.
    *
    * @method _queue
    * @private
    * @static
    * @return Object
    */
    function _queue(uri, c) {
        var o = { uri: uri, id: Y.io._id(), cfg:c };

        _q.add(o);
        if (_qState === 1) {
            _shift();
        }

        Y.log('Object queued.  Transaction id is' + o.id, 'info', 'io');
        return o;
    }

    function _next(id) {
        _qState = 1;
        if (_activeId === id && _q.size() > 0) {
            _shift();
        }
    }

   /**
    * @description Method for removing a specific, pending transaction from
    * the queue.
    *
    * @method _remove
    * @private
    * @static
    * @return void
    */
    function _remove(o) {
        _q.remove(o);
    }

    function _start() {
        _qState = 1;

        if (_q.size() > 0) {
            _shift();
        }
        Y.log('Queue started.', 'info', 'io');
    }

   /**
    * @description Method for setting queue processing to inactive.
    * Transaction requests to YUI.io.queue() will be stored in the queue, but
    * not processed until the queue is reset to "active".
    *
    * @method _stop
    * @private
    * @static
    * @return void
    */
    function _stop() {
        _qState = 0;
        Y.log('Queue stopped.', 'info', 'io');
    }

   /**
    * @description Method to query the current size of the queue.
    *
    * @method _size
    * @private
    * @static
    * @return int
    */
    function _size() {
        return _q.size();
    }

   /**
    * @description Method to query the current size of the queue, or to
    * set a maximum queue size.  This is the interface for _size().
    *
    * @method size
    * @public
    * @static
    * @param {number} i - Specified maximum size of queue.
    * @return number
    */
    _queue.size = _size;

   /**
    * @description Method for setting the queue to active. If there are
    * transactions pending in the queue, they will be processed from the
    * queue in FIFO order. This is the interface for _start().
    *
    * @method start
    * @public
    * @static
    * @return void
    */
    _queue.start = _start;

   /**
    * @description Method for setting queue processing to inactive.
    * Transaction requests to YUI.io.queue() will be stored in the queue, but
    * not processed until the queue is restarted. This is the
    * interface for _stop().
    *
    * @method stop
    * @public
    * @static
    * @return void
    */
    _queue.stop = _stop;

   /**
    * @description Method for promoting a transaction to the top of the queue.
    * This is the interface for _unshift().
    *
    * @method promote
    * @public
    * @static
    * @param {Object} o - Reference to queued transaction.
    * @return void
    */
    _queue.promote = _unshift;

   /**
    * @description Method for removing a specific, pending transaction from
    * the queue. This is the interface for _remove().
    *
    * @method remove
    * @public
    * @static
    * @param {Object} o - Reference to queued transaction.
    * @return void
    */
    _queue.remove = _remove;

    Y.on('io:complete', function(id) { _next(id); }, Y.io);

    Y.mix(Y.io, {
        queue: _queue
    }, true);


}, '@VERSION@' ,{requires:['io-base','queue-promote']});
