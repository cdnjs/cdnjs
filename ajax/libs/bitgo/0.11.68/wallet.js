//
// Wallet Object
// BitGo accessor for a specific wallet
//
// Copyright 2014, BitGo, Inc.  All Rights Reserved.
//

var TransactionBuilder = require('./transactionBuilder');
var Address = require('bitcoinjs-lib/src/address');
var HDNode = require('./hdnode');
var Keychains = require('./keychains');
var PendingApproval = require('./pendingapproval');
var ECKey = require('bitcoinjs-lib/src/eckey');
var Util = require('./util');

var assert = require('assert');
var common = require('./common');
var networks = require('bitcoinjs-lib/src/networks');
var Q = require('q');
var _ = require('lodash');

//
// Constructor
//
var Wallet = function(bitgo, wallet) {
  this.bitgo = bitgo;
  this.wallet = wallet;
  this.keychains = [];

  if (wallet.private) {
    this.keychains = wallet.private.keychains;
  }
};

Wallet.prototype.toJSON = function() {
  return this.wallet;
};

//
// id
// Get the id of this wallet.
//
Wallet.prototype.id = function() {
  return this.wallet.id;
};

//
// label
// Get the label of this wallet.
//
Wallet.prototype.label = function() {
  return this.wallet.label;
};

//
// balance
// Get the balance of this wallet.
//
Wallet.prototype.balance = function() {
  return this.wallet.balance;
};

//
// balance
// Get the spendable balance of this wallet.
// This is the total of all unspents except those that are unconfirmed and external
//
Wallet.prototype.spendableBalance = function() {
  return this.wallet.spendableBalance;
};

//
// confirmedBalance
// Get the confirmedBalance of this wallet.
//
Wallet.prototype.confirmedBalance = function() {
  return this.wallet.confirmedBalance;
};

//
// canSendInstant
// Returns if the wallet can send instant transactions
// This is impacted by the choice of backup key provider
//
Wallet.prototype.canSendInstant = function() {
  return this.wallet && this.wallet.canSendInstant;
};

//
// instant balance
// Get the instant balance of this wallet.
// This is the total of all unspents that may be spent instantly.
//
Wallet.prototype.instantBalance = function() {
  if (!this.canSendInstant()) {
    throw new Error('not an instant wallet');
  }
  var minConfirms = 3;
  if (this.bitgo.env === 'test' || this.bitgo.env === 'dev') {
    minConfirms = 1;
  }
  return this.unspents({ minConfirms: minConfirms })
  .then(function(unspents) {
    return _.sum(unspents, 'value');
  });
};

//
// unconfirmedSends
// Get the balance of unconfirmedSends of this wallet.
//
Wallet.prototype.unconfirmedSends = function() {
  return this.wallet.unconfirmedSends;
};

//
// unconfirmedReceives
// Get the balance of unconfirmedReceives balance of this wallet.
//
Wallet.prototype.unconfirmedReceives = function() {
  return this.wallet.unconfirmedReceives;
};

//
// type
// Get the type of this wallet, e.g. 'safehd'
//
Wallet.prototype.type = function() {
  return this.wallet.type;
};

Wallet.prototype.url = function(extra) {
  extra = extra || '';
  return this.bitgo.url('/wallet/' + this.id() + extra);
};

//
// pendingApprovals
// returns the pending approvals list for this wallet as pending approval objects
//
Wallet.prototype.pendingApprovals = function() {
  var self = this;
  return this.wallet.pendingApprovals.map(function(p) { return new PendingApproval(self.bitgo, p, self); });
};

//
// get
// Refetches this wallet and returns it
//
Wallet.prototype.get = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  var self = this;

  return this.bitgo.get(this.url())
  .result()
  .then(function(res) {
    self.wallet = res;
    return self;
  })
  .nodeify(callback);
};

//
// createAddress
// Creates a new address for use with this wallet.
//
Wallet.prototype.createAddress = function(params, callback) {
  var self = this;
  params = params || {};
  common.validateParams(params, [], [], callback);
  if (this.type() === 'safe') {
    throw new Error('cannot create an address for safe wallet; use .id()');
  }

  // Default to client-side address validation on, for safety. Use validate=false to disable.
  var shouldValidate = params.validate !== undefined ? params.validate : this.bitgo.getValidate();

  var allowExisting = params.allowExisting;
  if (typeof(params.allowExisting) != 'boolean') {
    allowExisting = params.allowExisting === "true";
  }

  var chain = params.chain || 0;
  return this.bitgo.post(this.url('/address/' + chain))
  .send(params)
  .result()
  .then(function(addr) {
    if (shouldValidate) {
      self.validateAddress(addr);
    }
    return addr;
  })
  .nodeify(callback);
};

//
// validateAddress
// Validates an address and path by calculating it locally from the keychain xpubs
//
Wallet.prototype.validateAddress = function(params) {
  common.validateParams(params, ['address', 'path'], []);
  var self = this;

  // Function to calculate the address locally, to validate that what the server
  // gives us is an address in this wallet.
  var calcAddress = function(path) {
    var re = /^\/[01]\/\d+$/;
    if (!path.match(re)) {
      throw new Error('unsupported path: ' + path);
    }

    var pubKeys = self.keychains.map(function(k) {
      var hdnode = HDNode.fromBase58(k.xpub);
      hdnode = hdnode.deriveFromPath('m' + k.path + path);
      return hdnode.pubKey;
    });
    // TODO: use wallet 'm' value, when exposed
    var script = Util.p2shMultisigOutputScript(2, pubKeys);
    var network = networks[common.getNetwork()];
    return Address.fromOutputScript(script, network).toBase58Check();
  };

  var localAddress = calcAddress(params.path);
  if (localAddress !== params.address) {
    throw new Error('address validation failure: ' + params.address + ' vs. ' + localAddress);
  }
};

//
// addresses
// Gets the addresses of a HD wallet.
// Options include:
//  limit: the number of addresses to get
//
Wallet.prototype.addresses = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  var args = [];
  if (params.details) {
    args.push('details=1');
  }
  if (typeof(params.chain) != 'undefined') {
    if (params.chain !== 0 && params.chain !== 1) {
      throw new Error('invalid chain argument, expecting 0 or 1');
    }
    args.push('chain=' + params.chain);
  }
  if (params.limit) {
    if (typeof(params.limit) != 'number') {
      throw new Error('invalid limit argument, expecting number');
    }
    args.push('limit=' + params.limit);
  }
  if (params.skip) {
    if (typeof(params.skip) != 'number') {
      throw new Error('invalid skip argument, expecting number');
    }
    args.push('skip=' + params.skip);
  }
  if (params.sort) {
    if (typeof(params.sort) != 'number') {
      throw new Error('invalid sort argument, expecting number');
    }
    args.push('sort=' + params.sort);
  }
  var query = '';
  if (args.length) {
    query = '?' + args.join('&');
  }
  var url = this.url('/addresses' + query);

  return this.bitgo.get(url)
  .result()
  .nodeify(callback);
};

Wallet.prototype.stats = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);
  var args = [];
  if (params.limit) {
    if (typeof(params.limit) != 'number') {
      throw new Error('invalid limit argument, expecting number');
    }
    args.push('limit=' + params.limit);
  }
  var query = '';
  if (args.length) {
    query = '?' + args.join('&');
  }

  var url = this.url('/stats' + query);

  return this.bitgo.get(url)
  .result()
  .nodeify(callback);
};

//
// address
// Gets information about a single address on a HD wallet.
// Information includes index, path, redeemScript, sent, received, txCount and balance
// Options include:
//  address: the address on this wallet to get
//
Wallet.prototype.address = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['address'], [], callback);

  var url = this.url('/addresses/' + params.address);

  return this.bitgo.get(url)
  .result()
  .nodeify(callback);
};

//
// freeze
// Freeze the wallet for a duration of choice, stopping BitGo from signing any transactions
// Parameters include:
//   limit:  the duration to freeze the wallet for in seconds, defaults to 3600
//
Wallet.prototype.freeze = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  if (params.duration) {
    if (typeof(params.duration) != 'number') {
      throw new Error('invalid duration - should be number of seconds');
    }
  }

  return this.bitgo.post(this.url('/freeze'))
  .send(params)
  .result()
  .nodeify(callback);
};

//
// delete
// Deletes the wallet
//
Wallet.prototype.delete = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  return this.bitgo.del(this.url())
  .result()
  .nodeify(callback);
};

//
// labels
// List the labels for the addresses in a given wallet
//
Wallet.prototype.labels = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  var url = this.bitgo.url('/labels/' + this.id());

  return this.bitgo.get(url)
  .result('labels')
  .nodeify(callback);
};

/**
 * Rename a wallet
 * @param params
 *  - label: the wallet's intended new name
 * @param callback
 * @returns {*}
 */
Wallet.prototype.setWalletName = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['label'], [], callback);

  var url = this.bitgo.url('/wallet/' + this.id());
  return this.bitgo.put(url)
  .send({ label: params.label })
  .result()
  .nodeify(callback);
};

//
// setLabel
// Sets a label on the provided address
//
Wallet.prototype.setLabel = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['address', 'label'], [], callback);

  var self = this;

  if (!self.bitgo.verifyAddress({ address: params.address })) {
    throw new Error('Invalid bitcoin address: ' + params.address);
  }

  var url = this.bitgo.url('/labels/' + this.id() + '/' + params.address);

  return this.bitgo.put(url)
  .send({'label': params.label})
  .result()
  .nodeify(callback);
};

//
// deleteLabel
// Deletes the label associated with the provided address
//
Wallet.prototype.deleteLabel = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['address'], [], callback);

  var self = this;

  if (!self.bitgo.verifyAddress({ address: params.address })) {
    throw new Error('Invalid bitcoin address: ' + params.address);
  }

  var url = this.bitgo.url('/labels/' + this.id() + '/' + params.address);

  return this.bitgo.del(url)
  .result()
  .nodeify(callback);
};

//
// unspents
// List ALL the unspents for a given wallet
// This method will return a paged list of all unspents
//
// Parameters include:
//   limit:  the optional limit of unspents to collect in BTC
//   minConf: only include results with this number of confirmations
//   target: the amount of btc to find to spend
//   instant: only find instant transactions (must specify a target)
//
Wallet.prototype.unspents = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  if (params.minConfirms) {
    if (typeof(params.minConfirms) !== 'number') {
      throw new Error('invalid minConfirms - should be number');
    }
  }

  var allUnspents = [];
  var self = this;

  var getUnspentsBatch = function(skip, limit) {
    var url = self.url('/unspents');
    var extensions = {};
    if (params.instant) {
      extensions.instant = params.instant;
    } else if (params.minConfirms) {
      extensions.minConfirms = params.minConfirms;
    }
    if (params.target) {
      if (typeof(params.target) != 'number') {
        throw new Error('invalid argument');
      }
      extensions.target = params.target;
    } else {
      // if no target is specified, we can work with skips and limits
      if (skip > 0) {
        extensions.skip = skip;
      }
      if (limit && limit > 0) {
        extensions.limit = limit;
      }
    }
    return self.bitgo.get(url)
    .query(extensions)
    .result()
    .then(function(result) {
      // The API has its own limit handling. For example, the API does not support limits bigger than 500. If the limit
      // specified here is bigger than that, we will have to do multiple requests with necessary limit adjustment.
      for (var i = 0; i < result.unspents.length; i++) {
        var unspent = result.unspents[i];
        allUnspents.push(unspent);
      }

      // Our limit adjustment makes sure that we never fetch more unspents than we need, meaning that if we hit the
      // limit, we hit it precisely
      if (allUnspents.length >= params.limit) {
        return allUnspents; // we aren't interested in any further unspents
      }

      var totalUnspentCount = result.total;
      // if no target is specified and the SDK indicates that there has been a limit, we need to fetch another batch
      if (!params.target && totalUnspentCount && totalUnspentCount > allUnspents.length) {
        // we need to fetch the next batch
        // let's just offset the current skip by the count
        var newSkip = skip + result.count;
        var newLimit = null;
        if (limit > 0) {
          // we set the new limit to be precisely the number of missing unspents to hit our own limit
          newLimit = limit - allUnspents.length;
        }
        return getUnspentsBatch(newSkip, newLimit);
      }

      return allUnspents;

    });
  };

  return getUnspentsBatch(0, params.limit)
  .nodeify(callback);
};

//
// unspentsPaged
// List the unspents (paged) for a given wallet, returning the result as an object of unspents, count, skip and total
// This method may not return all the unspents as the list is paged by the API
//
// Parameters include:
//   limit:  the optional limit of unspents to collect in BTC
//   skip: index in list of unspents to start paging from
//   minConfirms: only include results with this number of confirmations
//   target: the amount of btc to find to spend
//   instant: only find instant transactions (must specify a target)
//
Wallet.prototype.unspentsPaged = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  if (params.limit && typeof(params.limit) != 'number') {
    throw new Error('invalid limit - should be number');
  }
  if (params.skip && typeof(params.skip) != 'number') {
    throw new Error('invalid skip - should be number');
  }
  if (params.minConfirms && typeof(params.minConfirms) !== 'number') {
    throw new Error('invalid minConfirms - should be number');
  }
  if (params.target && typeof(params.target) != 'number') {
    throw new Error('invalid target - should be number');
  }
  if (params.instant && typeof(params.instant) != 'boolean') {
    throw new Error('invalid instant flag - should be boolean');
  }

  return this.bitgo.get(this.url('/unspents'))
  .query(params)
  .result()
  .nodeify(callback);
};

//
// transactions
// List the transactions for a given wallet
// Options include:
//     TODO:  Add iterators for start/count/etc
Wallet.prototype.transactions = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  var args = [];
  if (params.limit) {
    if (typeof(params.limit) != 'number') {
      throw new Error('invalid limit argument, expecting number');
    }
    args.push('limit=' + params.limit);
  }
  if (params.skip) {
    if (typeof(params.skip) != 'number') {
      throw new Error('invalid skip argument, expecting number');
    }
    args.push('skip=' + params.skip);
  }
  if (params.minHeight) {
    if (typeof(params.minHeight) != 'number') {
      throw new Error('invalid minHeight argument, expecting number');
    }
    args.push('minHeight=' + params.minHeight);
  }
  var query = '';
  if (args.length) {
    query = '?' + args.join('&');
  }

  var url = this.url('/tx' + query);

  return this.bitgo.get(url)
  .result()
  .nodeify(callback);
};

//
// transaction
// Get a transaction by ID for a given wallet
Wallet.prototype.getTransaction = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['id'], [], callback);

  var url = this.url('/tx/' + params.id);

  return this.bitgo.get(url)
  .result()
  .nodeify(callback);
};

//
// transaction by sequence id
// Get a transaction by sequence id for a given wallet
Wallet.prototype.getWalletTransactionBySequenceId = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['sequenceId'], [], callback);

  var url = this.url('/tx/sequence/' + params.sequenceId);

  return this.bitgo.get(url)
  .result()
  .nodeify(callback);
};

//
// Key chains
// Gets the user key chain for this wallet
// The user key chain is typically the first keychain of the wallet and has the encrypted xpriv stored on BitGo.
// Useful when trying to get the users' keychain from the server before decrypting to sign a transaction.
Wallet.prototype.getEncryptedUserKeychain = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);
  var self = this;

  var tryKeyChain = function(index) {
    if (!self.keychains || index >= self.keychains.length) {
      return self.bitgo.reject('No encrypted keychains on this wallet.', callback);
    }

    var params = { "xpub": self.keychains[index].xpub };

    return self.bitgo.keychains().get(params)
    .then(function(keychain) {
      // If we find the xpriv, then this is probably the user keychain we're looking for
      keychain.walletSubPath = self.keychains[index].path;
      if (keychain.encryptedXprv) {
        return keychain;
      }
      return tryKeyChain(index + 1);
    });
  };

  return tryKeyChain(0).nodeify(callback);
};

//
// createTransaction
// Create a transaction (unsigned). To sign it, do signTransaction
// Parameters:
//   recipients - object of recipient addresses and the amount to send to each e.g. {address:1500, address2:1500}
//   fee      - the blockchain fee to send (optional)
//   feeRate  - the fee per kb to send (optional)
//   minConfirms - minimum number of confirms to use when gathering unspents
//   forceChangeAtEnd - force change address to be last output (optional)
//   splitChangeSize - optional (see transactionBuilder.createTransaction)
//   changeAddress - override the change address (optional)
//   validate - extra verification of change addresses (which are always verified server-side) (defaults to global config)
// Returns:
//   callback(err, { transactionHex: string, unspents: [inputs], fee: satoshis })
Wallet.prototype.createTransaction = function(params, callback) {
  params = _.extend({}, params);
  common.validateParams(params, [], [], callback);

  var self = this;

  if ((typeof(params.fee) != 'number' && typeof(params.fee) != 'undefined') ||
      (typeof(params.feeRate) != 'number' && typeof(params.feeRate) != 'undefined') ||
      (typeof(params.minConfirms) != 'number' && typeof(params.minConfirms) != 'undefined') ||
      (typeof(params.forceChangeAtEnd) != 'boolean' && typeof(params.forceChangeAtEnd) != 'undefined') ||
      (typeof(params.changeAddress) != 'string' && typeof(params.changeAddress) != 'undefined') ||
      (typeof(params.validate) != 'boolean' && typeof(params.validate) != 'undefined') ||
      (typeof(params.instant) != 'boolean' && typeof(params.instant) != 'undefined')) {
    throw new Error('invalid argument');
  }

  if (typeof(params.keychain) == 'object') {
    throw new Error('createTransaction no longer takes a keychain to perform signing - please use signTransaction to sign');
  }

  if (typeof(params.recipients) != 'object') {
    throw new Error('expecting recipients object');
  }

  params.validate = params.validate !== undefined ? params.validate : this.bitgo.getValidate();
  params.wallet = this;

  return TransactionBuilder.createTransaction(params)
  .nodeify(callback);
};


//
// signTransaction
// Sign a previously created transaction with a keychain
// Parameters:
// transactionHex - serialized form of the transaction in hex
// unspents - array of unspent information, where each unspent is a chainPath
//            and redeemScript with the same index as the inputs in the
//            transactionHex
// keychain - Keychain containing the xprv to sign with.
// signingKey - For legacy safe wallets, the private key string.
// validate - extra verification of signatures (which are always verified server-side) (defaults to global config)
// Returns:
//   callback(err, transaction)
Wallet.prototype.signTransaction = function(params, callback) {
  params = _.extend({}, params);
  common.validateParams(params, ['transactionHex'], [], callback);

  var self = this;

  if (!Array.isArray(params.unspents)) {
    throw new Error('expecting the unspents array');
  }

  if (typeof(params.keychain) != 'object' || !params.keychain.xprv) {
    if (typeof(params.signingKey) === 'string') {
      // allow passing in a WIF private key for legacy safe wallet support
    } else {
      throw new Error('expecting keychain object with xprv');
    }
  }

  params.validate = params.validate !== undefined ? params.validate : this.bitgo.getValidate();
  return TransactionBuilder.signTransaction(params)
  .then(function(result) {
    return {
      tx: result.transactionHex
    };
  })
  .nodeify(callback);
};

//
// send
// Send a transaction to the Bitcoin network via BitGo.
// One of the keys is typically signed, and BitGo will sign the other (if approved) and relay it to the P2P network.
// Parameters:
//   tx  - the hex encoded, signed transaction to send
// Returns:
//
Wallet.prototype.sendTransaction = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['tx'], ['message'], callback);

  var self = this;
  return this.bitgo.post(this.bitgo.url('/tx/send'))
  .send(params)
  .result()
  .then(function(body) {
    if (body.pendingApproval) {
      return _.extend(body, { status: 'pendingApproval' });
    }

    return {
      status: 'accepted',
      tx: body.transaction,
      hash: body.transactionHash,
      instant: body.instant,
      instantId: body.instantId
    };
  })
  .nodeify(callback);
};

Wallet.prototype.createShare = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['user', 'permissions'], [], callback);

  if (params.keychain && !_.isEmpty(params.keychain)) {
    if (!params.keychain.xpub || !params.keychain.encryptedXprv || !params.keychain.fromPubKey ||
      !params.keychain.toPubKey || !params.keychain.path) {
      throw new Error('requires keychain parameters - xpub, encryptedXprv, fromPubKey, toPubKey, path');
    }
  }

  var self = this;
  return this.bitgo.post(this.url('/share'))
  .send(params)
  .result()
  .nodeify(callback);
};

//
// sendCoins
// Send coins to a destination address from this wallet using the user key.
// 1. Gets the user keychain by checking the wallet for a key which has an encrypted xpriv
// 2. Decrypts user key
// 3. Creates the transaction with default fee
// 4. Signs transaction with decrypted user key
// 3. Sends the transaction to BitGo
//
// Parameters:
//   address - the destination address
//   amount - the amount in satoshis to be sent
//   message - optional message to attach to transaction
//   walletPassphrase - the passphrase to be used to decrypt the user key on this wallet
//   xprv - the private key in string form, if walletPassphrase is not available
//   (See transactionBuilder.createTransaction for other passthrough params)
// Returns:
//
Wallet.prototype.sendCoins = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['address'], ['message'], callback);

  if (typeof(params.amount) != 'number') {
    throw new Error('invalid argument for amount - number expected');
  }

  params.recipients = {};
  params.recipients[params.address] = params.amount;

  return this.sendMany(params)
  .nodeify(callback);
};

//
// sendMany
// Send coins to multiple destination addresses from this wallet using the user key.
// 1. Gets the user keychain by checking the wallet for a key which has an encrypted xpriv
// 2. Decrypts user key
// 3. Creates the transaction with default fee
// 4. Signs transaction with decrypted user key
// 3. Sends the transaction to BitGo
//
// Parameters:
//   recipients - array of { address, amount } to send to
//   walletPassphrase - the passphrase to be used to decrypt the user key on this wallet
//   xprv - the private key in string form, if walletPassphrase is not available
//   (See transactionBuilder.createTransaction for other passthrough params)
// Returns:
//
Wallet.prototype.sendMany = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], ['message'], callback);
  var self = this;

  if (typeof(params.recipients) != 'object') {
    throw new Error('expecting recipients object');
  }

  if (params.fee && typeof(params.fee) != 'number') {
    throw new Error('invalid argument for fee - number expected');
  }

  if (params.feeRate && typeof(params.feeRate) != 'number') {
    throw new Error('invalid argument for feeRate - number expected');
  }

  if (params.instant && typeof(params.instant) != 'boolean') {
    throw new Error('invalid argument for instant - boolean expected');
  }

  var keychain;
  var fee;
  var feeRate;
  var instantFee;

  // Get the user keychain
  return this.createAndSignTransaction(params)
  .then(function(transaction) {
    // Send the transaction
    fee = transaction.fee;
    feeRate = transaction.feeRate;
    instantFee = transaction.instantFee;
    return self.sendTransaction({
      tx: transaction.tx,
      message: params.message,
      sequenceId: params.sequenceId,
      instant: params.instant
    });
  })
  .then(function(result) {
    result.fee = fee;
    result.feeRate = feeRate;
    if (instantFee) {
      result.instantFee = instantFee;
    }
    return result;
  })
  .nodeify(callback);
};

//
// createAndSignTransaction
// INTERNAL function to create and sign a transaction
//
// Parameters:
//   recipients - array of { address, amount } to send to
//   walletPassphrase - the passphrase to be used to decrypt the user key on this wallet
//   (See transactionBuilder.createTransaction for other passthrough params)
// Returns:
//
Wallet.prototype.createAndSignTransaction = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);
  var self = this;

  if (typeof(params.recipients) != 'object') {
    throw new Error('expecting recipients object');
  }

  if (params.fee && typeof(params.fee) != 'number') {
    throw new Error('invalid argument for fee - number expected');
  }

  if (params.feeRate && typeof(params.feeRate) != 'number') {
    throw new Error('invalid argument for feeRate - number expected');
  }

  if (params.dynamicFeeConfirmTarget && typeof(params.dynamicFeeConfirmTarget) != 'number') {
    throw new Error('invalid argument for confirmTarget - number expected');
  }

  if (params.instant && typeof(params.instant) != 'boolean') {
    throw new Error('invalid argument for instant - boolean expected');
  }

  var keychain;
  var fee;
  var feeRate;
  var instantFee;

  return Q()
  .then(function() {
    // wrap in a Q in case one of these throws
    return Q.all([self.getAndPrepareSigningKeychain(params), self.createTransaction(params)]);
  })
  .spread(function(keychain, transaction) {
    fee = transaction.fee;
    feeRate = transaction.feeRate;
    // Sign the transaction
    transaction.keychain = keychain;
    instantFee = transaction.instantFee;
    transaction.feeSingleKeyWIF = params.feeSingleKeyWIF;
    return self.signTransaction(transaction);
  })
  .then(function(result) {
    return _.extend(result, { fee: fee, feeRate: feeRate, instant: params.instant, instantFee: instantFee });
  })
  .nodeify(callback);
};

//
// getAndPrepareSigningKeychain
// INTERNAL function to get the user keychain for signing.
// Caller must provider either walletPassphrase or xprv as a string
// If the caller provides the encrypted xprv (walletPassphrase), then fetch the keychain object and decrypt
// Otherwise if the xprv is provided, fetch the keychain object and augment it with the xprv
//
// Parameters:
//   xprv - the private key in string form
//   walletPassphrase - the passphrase to be used to decrypt the user key on this wallet
// Returns:
//   Keychain object containing xprv, xpub and paths
//
Wallet.prototype.getAndPrepareSigningKeychain = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], ['walletPassphrase', 'xprv'], callback);

  if ((params.walletPassphrase && params.xprv) || (!params.walletPassphrase && !params.xprv)) {
    throw new Error('must provide exactly one of xprv or walletPassphrase');
  }

  var self = this;

  // Caller provided a wallet passphrase
  if (params.walletPassphrase) {
    return self.getEncryptedUserKeychain()
    .then(function(keychain) {
      // Decrypt the user key with a passphrase
      try {
        keychain.xprv = self.bitgo.decrypt({password: params.walletPassphrase, input: keychain.encryptedXprv});
      } catch (e) {
        throw new Error('Unable to decrypt user keychain');
      }
      return keychain;
    });
  }

  // Caller provided an xprv - validate and construct keychain object
  var xpub;
  try {
    xpub = HDNode.fromBase58(params.xprv).neutered().toBase58();
  } catch (e) {
    throw new Error('Unable to parse the xprv');
  }

  if (xpub == params.xprv) {
    throw new Error('xprv provided was not a private key (found xpub instead)');
  }

  var walletXpubs = _.pluck(self.keychains, 'xpub');
  if (!_.includes(walletXpubs, xpub)) {
    throw new Error('xprv provided was not a keychain on this wallet!');
  }

  // get the keychain object from bitgo to find the path and (potential) wallet structure
  return self.bitgo.keychains().get({ xpub: xpub })
  .then(function(keychain) {
    keychain.xprv = params.xprv;
    return keychain;
  });
};

/**
 * Takes a wallet's unspents and fans them out into a larger number of equally sized unspents
 * @param params
 *  target: set how many unspents you want to have in the end
 *  xprv: private key to sign transaction
 *  walletPassphrase: wallet passphrase to decrypt the wallet's private key
 * @param callback
 * @returns {*}
 */
Wallet.prototype.fanOutUnspents = function(params, callback) {
  // maximum number of inputs for fanout transaction
  // (when fanning out, we take all the unspents and make a bigger number of outputs)
  var MAX_FANOUT_INPUT_COUNT = 80;
  // maximum number of outputs for fanout transaction
  var MAX_FANOUT_OUTPUT_COUNT = 300;
  params = params || {};
  common.validateParams(params, [], ['walletPassphrase', 'xprv'], callback);
  var validate = params.validate === undefined ? true : params.validate;

  var target = params.target;
  // the target must be defined, be a number, be at least two, and be a natural number
  if (typeof(target) !== 'number' || target < 2 || (target % 1) !== 0) {
    throw new Error('Target needs to be a positive integer');
  }
  if (target > MAX_FANOUT_OUTPUT_COUNT) {
    throw new Error('Fan out target too high');
  }
  var self = this;

  /**
   * Split a natural number N into n almost equally sized (±1) natural numbers.
   * In order to calculate the sizes of the parts, we calculate floor(N/n), and thus have the base size of all parts.
   * If N % n != 0, this leaves us with a remainder r where r < n. We distribute r equally among the n parts by
   * adding 1 to the first r parts.
   * @param total
   * @param partCount
   * @returns {Array}
   */
  var splitNumberIntoCloseNaturalNumbers = function(total, partCount) {
    var partSize = Math.floor(total / partCount);
    var remainder = total - partSize * partCount;
    // initialize placeholder array
    var almostEqualParts = new Array(partCount);
    // fill the first remainder parts with the value partSize+1
    _.fill(almostEqualParts, partSize + 1, 0, remainder);
    // fill the remaining parts with the value partSize
    _.fill(almostEqualParts, partSize, remainder);
    // assert the correctness of the almost equal parts
    // TODO: add check for the biggest deviation between any two parts and make sure it's <= 1
    assert.equal(_(almostEqualParts).sum(), total);
    assert.equal(_(almostEqualParts).size(), partCount);
    return almostEqualParts;
  };

  var transactionParams;
  var grossAmount = 0;

  // first, let's take all the wallet's unspents (with min confirms if necessary)
  return self.unspents({ minConfirms: params.minConfirms })
  .then(function(allUnspents) {
    if (allUnspents.length < 1) {
      throw new Error('No unspents to branch out');
    }

    // this consolidation is essentially just a waste of money
    if (allUnspents.length >= target) {
      throw new Error('Fan out target has to be bigger than current number of unspents');
    }

    // we have at the very minimum 81 inputs, and 81 outputs. That transaction will be big
    // in the medium run, this algorithm could be reworked to only work with a subset of the transactions
    if (allUnspents.length > MAX_FANOUT_INPUT_COUNT) {
      throw new Error('Too many unspents');
    }

    // this is all the money that is currently in the wallet
    grossAmount = _(allUnspents).pluck('value').sum();

    // in order to not modify the params object, we create a copy
    transactionParams = _.extend({}, params);
    transactionParams.unspents = allUnspents;
    transactionParams.recipients = {};

    // create target amount of new addresses for this wallet
    var newAddresses = [];
    return _.range(target).reduce(function(soFar) {
      return soFar
      .then(function() {
        return self.createAddress({ chain: 1, validate: validate });
      })
      .then(function(currentNewAddress) {
        newAddresses.push(currentNewAddress);
        return newAddresses;
      });
    }, Q());
  })
  .then(function(newAddresses) {
    // let's find a nice, equal distribution of our Satoshis among the new addresses
    var splitAmounts = splitNumberIntoCloseNaturalNumbers(grossAmount, target);
    // map the newly created addresses to the almost components amounts we just calculated
    transactionParams.recipients = _.zipObject(_.pluck(newAddresses, 'address'), splitAmounts);
    transactionParams.splitChangeSize = 0; // do not generate more change than needed
    // attempt to create a transaction. As it is a wallet-sweeping transaction with no fee, we expect it to fail
    return self.sendMany(transactionParams)
    .catch(function(error) {
      // as expected, the transaction creation did indeed fail due to insufficient fees
      // the error suggests a fee value which we then use for the transaction
      // however, let's make sure it wasn't something else
      if (!error.fee && (!error.result || !error.result.fee)) {
        // if the error does not contain a fee property, it is something else that has gone awry, and we throw it
        throw error;
      }
      var fee = error.fee || error.result.fee;
      transactionParams.fee = fee;
      // in order to maintain the equal distribution, we need to subtract the fee from the cumulative funds
      var netAmount = grossAmount - fee; // after fees
      // that means that the distribution has to be recalculated
      var remainingSplitAmounts = splitNumberIntoCloseNaturalNumbers(netAmount, target);
      // and the distribution again mapped to the new addresses
      transactionParams.recipients = _.zipObject(_.pluck(newAddresses, 'address'), remainingSplitAmounts);
      // this time, the transaction creation should work
      return self.sendMany(transactionParams);
    });
  })
  .nodeify(callback);
};

/**
 * Consolidate a wallet's unspents into fewer unspents
 * @param params
 *  target: set how many unspents you want to have in the end
 *  maxInputCountPerConsolidation: set how many maximum inputs are to be permitted per consolidation batch
 *  xprv: private key to sign transaction
 *  walletPassphrase: wallet passphrase to decrypt the wallet's private key
 *  progressCallback: method to be called with object outlining current progress details
 * @param callback
 * @returns {*}
 */
Wallet.prototype.consolidateUnspents = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], ['walletPassphrase', 'xprv'], callback);
  var validate = params.validate === undefined ? true : params.validate;

  var target = params.target;
  if (target === undefined) {
    target = 1;
  } else if (typeof(target) !== 'number' || target < 1 || (target % 1) !== 0) {
    // the target must be defined, be a number, be at least one, and be a natural number
    throw new Error('Target needs to be a positive integer');
  }

  // maximum number of inputs per transaction for consolidation
  var MAX_INPUT_COUNT = 85;
  var maxInputCount = params.maxInputCountPerConsolidation;
  if (maxInputCount === undefined) { // null or unidentified, because equality to zero retruns true in if(! clause
    maxInputCount = MAX_INPUT_COUNT;
  }
  if (typeof (maxInputCount) !== 'number' || maxInputCount < 2 || (maxInputCount % 1) !== 0) {
    throw new Error('Maximum consolidation input count needs to be an integer equal to or bigger than 2');
  } else if (maxInputCount > MAX_INPUT_COUNT) {
    throw new Error('Maximum consolidation input count cannot be bigger than ' + MAX_INPUT_COUNT);
  }

  var self = this;
  var consolidationIndex = 0;

  /**
   * Consolidate one batch of up to MAX_INPUT_COUNT unspents.
   * @param wallet
   * @param targetUnspentCount
   * @returns {*}
   */
  var runNextConsolidation = function() {
    var consolidationTransactions = [];
    var grossAmount;
    var isFinalConsolidation = false;
    var inputCount;
    var currentAddress;
    /*
     We take a maximum of unspentBulkSizeLimit unspents from the wallet. We want to make sure that we swipe the wallet
     clean of all excessive unspents, so we add 1 to the target unspent count to make sure we haven't missed anything.
     In case there are even more unspents than that, to make the consolidation as fast as possible, we expand our
     selection to include as many as the maximum permissible number of inputs per consolidation batch.
     Should the target number of unspents be higher than the maximum number if inputs per consolidation,
     we still want to fetch them all simply to be able to determine whether or not a consolidation can be performed
     at all, which is dependent on the number of all unspents being higher than the target.
     In the next version of the unspents version SDK, we will know the total number of unspents without having to fetch
     them, and therefore will be able to simplify this method.
     */
    return self.unspents({ limit: target + maxInputCount, minConfirms: params.minConfirms })
    .then(function(allUnspents) {
      // this consolidation is essentially just a waste of money
      if (allUnspents.length <= target) {
        throw new Error('Fewer unspents than consolidation target. Use fanOutUnspents instead.');
      }

      // how many of the unspents do we want to consolidate?
      // the +1 is because the consolidated block becomes a new unspent later
      var targetInputCount = allUnspents.length - target + 1;

      // if the targetInputCount requires more inputs than we allow per batch, we reduce the number
      inputCount = Math.min(targetInputCount, maxInputCount);
      isFinalConsolidation = (inputCount === targetInputCount);

      var currentUnspentChunk = allUnspents.splice(0, inputCount);
      return [self.createAddress({ chain: 1, validate: validate }), currentUnspentChunk];
    })
    .spread(function(newAddress, currentChunk) {
      var txParams = _.extend({}, params);
      currentAddress = newAddress;
      // the total amount that we are consolidating within this batch
      grossAmount = _(currentChunk).pluck('value').sum(); // before fees

      txParams.unspents = currentChunk;
      txParams.recipients = {};
      txParams.recipients[newAddress.address] = grossAmount;
      txParams.splitChangeSize = 0; // do not generate more change

      // let's attempt to create this transaction. We expect it to fail because no fee is set.
      return self.sendMany(txParams)
      .catch(function(error) {
        // this error should occur due to insufficient funds
        // however, let's make sure it wasn't something else
        if (!error.fee && (!error.result || !error.result.fee)) {
          // if the error does not contain a fee property, it is something else that has gone awry, and we throw it
          throw error;
        }
        var fee = error.fee || error.result.fee;
        var netAmount = grossAmount - fee; // after fees
        // Need to clear these out since only 1 may be set
        delete txParams.fee;
        delete txParams.feeRate;
        delete txParams.feeTxConfirmTarget;
        txParams.fee = fee;
        txParams.recipients[newAddress.address] = netAmount;
        // this transaction, on the other hand, should be created with no issues, because an appropriate fee is set
        return self.sendMany(txParams);
      });
    })
    .then(function(sentTx) {
      consolidationTransactions.push(sentTx);
      if (typeof(params.progressCallback) === 'function') {
        params.progressCallback({
          txid: sentTx.hash,
          destination: currentAddress,
          amount: grossAmount,
          fee: sentTx.fee,
          inputCount: inputCount,
          index: consolidationIndex
        });
      }
      consolidationIndex++;
      if (!isFinalConsolidation) {
        // this last consolidation has not yet brought the unspents count down to the target unspent count
        // therefore, we proceed by consolidating yet another batch
        // before we do that, we wait 1 second so that the newly created unspent will be fetched in the next batch
        return Q.delay(1000)
        .then(runNextConsolidation);
      }
      // this is the final consolidation transaction. We return all the ones we've had so far
      return consolidationTransactions;
    });
  };

  return runNextConsolidation(this, target)
  .nodeify(callback);
};

Wallet.prototype.shareWallet = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['email', 'permissions'], ['walletPassphrase', 'message'], callback);

  if (params.reshare !== undefined && typeof(params.reshare) != 'boolean') {
    throw new Error('Expected reshare to be a boolean.');
  }

  if (params.skipKeychain !== undefined && typeof(params.skipKeychain) != 'boolean') {
    throw new Error('Expected skipKeychain to be a boolean. ');
  }
  var needsKeychain = !params.skipKeychain && params.permissions.indexOf('spend') !== -1;

  var self = this;
  var sharing;
  var sharedKeychain;
  return this.bitgo.getSharingKey({ email: params.email })
  .then(function(result) {
    sharing = result;

    if (needsKeychain) {
      return self.getEncryptedUserKeychain({})
      .then(function(keychain) {
        // Decrypt the user key with a passphrase
        if (keychain.encryptedXprv) {
          if (!params.walletPassphrase) {
            throw new Error('Missing walletPassphrase argument');
          }
          try {
            keychain.xprv = self.bitgo.decrypt({ password: params.walletPassphrase, input: keychain.encryptedXprv });
          } catch (e) {
            throw new Error('Unable to decrypt user keychain');
          }

          var eckey = ECKey.makeRandom();
          var secret = self.bitgo.getECDHSecret({ eckey: eckey, otherPubKeyHex: sharing.pubkey });
          var newEncryptedXprv = self.bitgo.encrypt({ password: secret, input: keychain.xprv });

          sharedKeychain = {
            xpub: keychain.xpub,
            encryptedXprv: newEncryptedXprv,
            fromPubKey: eckey.pub.toHex(),
            toPubKey: sharing.pubkey,
            path: sharing.path
          };
        }
      });
    }
  })
  .then(function() {
    var options = {
      user: sharing.userId,
      permissions: params.permissions,
      reshare: params.reshare,
      message: params.message
    };
    if (sharedKeychain) {
      options.keychain = sharedKeychain;
    } else if (params.skipKeychain) {
      options.keychain = {};
    }

    return self.createShare(options);
  })
  .nodeify(callback);
};

Wallet.prototype.removeUser = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['user'], [], callback);

  return this.bitgo.del(this.url('/user/' + params.user))
  .send()
  .result()
  .nodeify(callback);
};

Wallet.prototype.getPolicy = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  return this.bitgo.get(this.url('/policy'))
  .send()
  .result()
  .nodeify(callback);
};

Wallet.prototype.getPolicyStatus = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  return this.bitgo.get(this.url('/policy/status'))
  .send()
  .result()
  .nodeify(callback);
};

Wallet.prototype.setPolicyRule = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['id', 'type'], ['message'], callback);

  if (typeof(params.condition) !== 'object') {
    throw new Error('missing parameter: conditions object');
  }

  if (typeof(params.action) !== 'object') {
    throw new Error('missing parameter: action object');
  }

  return this.bitgo.put(this.url('/policy/rule'))
  .send(params)
  .result()
  .nodeify(callback);
};

Wallet.prototype.removePolicyRule = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['id'], ['message'], callback);

  return this.bitgo.del(this.url('/policy/rule'))
  .send(params)
  .result()
  .nodeify(callback);
};

Wallet.prototype.listWebhooks = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  return this.bitgo.get(this.url('/webhooks'))
  .send()
  .result()
  .nodeify(callback);
};

Wallet.prototype.addWebhook = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['url', 'type'], [], callback);

  return this.bitgo.post(this.url('/webhooks'))
  .send(params)
  .result()
  .nodeify(callback);
};

Wallet.prototype.removeWebhook = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['url', 'type'], [], callback);

  return this.bitgo.del(this.url('/webhooks'))
  .send(params)
  .result()
  .nodeify(callback);
};

Wallet.prototype.estimateFee = function(params, callback) {
  return this.bitgo.estimateFee(params);
};

// Not fully implemented / released on SDK. Testing for now.
Wallet.prototype.updatePolicyRule = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['id', 'type'], [], callback);

  return this.bitgo.put(this.url('/policy/rule'))
  .send(params)
  .result()
  .nodeify(callback);
};

Wallet.prototype.deletePolicyRule = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['id'], [], callback);

  return this.bitgo.del(this.url('/policy/rule'))
  .send(params)
  .result()
  .nodeify(callback);
};

module.exports = Wallet;
