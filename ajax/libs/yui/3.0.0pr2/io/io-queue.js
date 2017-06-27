YUI.add('io-queue', function(Y) {

   /*
    * Extends the IO base class to include basic queue interfaces for transaction
    * queuing.
	* @module io-base
	* @submodule io-queue
	*/

   /**
	* @description Array of transactions queued for processing
	*
	* @property _q
	* @private
	* @static
	* @type array
	*/
	var _q = [],

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
	_qState = 1,

   /**
	* @description Queue property to set a maximum queue storage size.  When
	* this property is set, the queue will not store any more transactions
	* until the queue size os reduced below this threshold. There is no
	* maximum queue size until it is explicitly set.
	*
	* @property _qMaxSize
	* @private
	* @static
	* @type int
	*/
	_qMaxSize = false;

   /**
	* @description Method for requesting a transaction, and queueing the
	* request before it is sent to the resource.
	*
	* @method _queue
	* @private
	* @static
	* @return int
	*/
	function _queue(uri, c) {

		if (_qMaxSize === false || _q.length < _qMaxSize) {
			var id = Y.io._id();
			_q.push({ uri: uri, id: id, cfg:c });
		}
		else {
			return false;
		}

		if (_qState === 1) {
			_shift();
		}

		return id;
	};

   /**
	* @description Method for promoting a transaction to the top of the queue.
	*
	* @method _unshift
	* @private
	* @static
	* @return void
	*/
	function _unshift(id) {
		var r;

		for (var i = 0; i < _q.length; i++) {
			if (_q[i].id === id) {
				r = _q.splice(i, 1);
				var p = _q.unshift(r[0]);
				break;
			}
		}
	};

   /**
	* @description Method for removing a transaction from the top of the
	* queue, and sending the transaction to _io().
	*
	* @method _shift
	* @private
	* @static
	* @return void
	*/
	function _shift() {
		var c = _q.shift();
		Y.io(c.uri, c.cfg, c.id);
	};

   /**
	* @description Method to query the current size of the queue, or to
	* set a maximum queue size.
	*
	* @method _size
	* @private
	* @static
	* @return int
	*/
	function _size(i) {
		if (i) {
			_qMaxSize = i;
			return i;
		}
		else {
			return _q.length;
		}
	};

   /**
	* @description Method for setting the queue to active. If there are
	* transactions pending in the queue, they will be processed from the
	* queue in FIFO order.
	*
	* @method _start
	* @private
	* @static
	* @return void
	*/
	function _start() {
		var len = (_q.length > _qMaxSize > 0) ? _qMaxSize : _q.length;

		if (len > 1) {
			for (var i=0; i < len; i++) {
				_shift();
			}
		}
		else {
			_shift();
		}

	};

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
	};

   /**
	* @description Method for removing a specific, pending transaction from
	* the queue.
	*
	* @method _purge
	* @private
	* @static
	* @return void
	*/
	function _purge(id) {
		if (Y.Lang.isNumber(id)) {
			for (var i = 0; i < _q.length; i++) {
				if (_q[i].id === id) {
					_q.splice(i, 1);
					break;
				}
			}
		}
	};

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
	* @description Method for setting the queue to "active". If there are
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
	* not processed until the queue is set to "active". This is the
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
	* @param {number} i - ID of queued transaction.
    * @return void
	*/
	_queue.promote = _unshift;

   /**
	* @description Method for removing a specific, pending transaction from
	* the queue. This is the interface for _purge().
	*
	* @method purge
	* @public
	* @static
	* @param {number} i - ID of queued transaction.
    * @return void
	*/
	_queue.purge = _purge;

    Y.mix(Y.io, {
		queue: _queue,
    }, true);



}, '@VERSION@' ,{requires:['io-base']});
