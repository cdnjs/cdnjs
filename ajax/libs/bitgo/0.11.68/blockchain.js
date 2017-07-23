//
// Blockchain Object
// BitGo accessor to a any Bitcoin address.
// Using this does not require authentication and is unrelated to BitGo wallet management.
//
// Copyright 2014, BitGo, Inc.  All Rights Reserved.
//

var request = require('superagent');
var common = require('./common');

//
// Constructor
//
var Blockchain = function(bitgo) {
  this.bitgo = bitgo;
};

//
// Get an address
// Fetch an address summary information.
// Includes balance and pending balance.
//
// Parameters include:
//   address: the address to get
//
Blockchain.prototype.getAddress = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['address'], [], callback);

  return this.bitgo.get(this.bitgo.url("/address/" + params.address))
  .result()
  .nodeify(callback);
};

//
// Get address transactions
// List the transactions for a given address
// Parameters include:
//   address: the address to get transactions for
//
Blockchain.prototype.getAddressTransactions = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['address'], [], callback);

  // TODO: support start and limit params
  return this.bitgo.get(this.bitgo.url("/address/" + params.address + "/tx"))
  .result()
  .nodeify(callback);
};

//
// Unspent Transactions
// List the unspent outputs for a given address
// Parameters include:
//   address: the address to get unspent transactions
//   limit: return enough unspents to accumulate to at least this amount (in satoshis).
//
Blockchain.prototype.getAddressUnspents = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['address'], [], callback);

  var url = this.bitgo.url("/address/" + params.address + '/unspents');
  if (params.limit) {
    if (typeof(params.limit) != 'number') {
      throw new Error('invalid limit - number expected');
    }
    url += '?limit=' + (params.limit * 1e8);
  }

  return this.bitgo.get(url)
  .result()
  .then(function(body) {
    return body.unspents;
  })
  .nodeify(callback);
};

//
// Get transaction
// Fetch transaction details.
//
// Parameters include:
//   id: the transaction id to get
//
Blockchain.prototype.getTransaction = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['id'], [], callback);

  return this.bitgo.get(this.bitgo.url("/tx/" + params.id))
  .result()
  .nodeify(callback);
};

//
// Get block
// Fetch block details.
//
// Parameters include:
//   id: the block hash to get, or latest for the latest
//
Blockchain.prototype.getBlock = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['id'], [], callback);

  return this.bitgo.get(this.bitgo.url("/block/" + params.id))
  .result()
  .nodeify(callback);
};

module.exports = Blockchain;
