//
// Keychains Object
// BitGo accessor to a user's keychain.
//
// Copyright 2014, BitGo, Inc.  All Rights Reserved.
//

var HDNode = require('./hdnode');
var crypto = require('crypto');
var common = require('./common');
var Util = require('./util');

//
// Constructor
//
var Keychains = function(bitgo) {
  this.bitgo = bitgo;
};

//
// isValid
// Tests a xpub or xprv string to see if it is a valid keychain.
//
Keychains.prototype.isValid = function(params) {
  params = params || {};
  common.validateParams(params, [], []);

  if (typeof(params.key) != 'string' && typeof(params.key) != 'object') {
    throw new Error('key must be a string or object');
  }

  try {
    if (!params.key.path) {
      HDNode.fromBase58(params.key);
    } else {
      HDNode.fromBase58(params.key.xpub).deriveFromPath(params.key.path);
    }
    return true;
  } catch (e) {
    return false;
  }
};

//
// create
// Create a new keychain locally.
// Does not send the keychain to bitgo, only creates locally.
// If |seed| is provided, used to seed the keychain.  Otherwise,
// a random keychain is created.
//
Keychains.prototype.create = function(params) {
  params = params || {};
  common.validateParams(params, [], []);

  var seed;
  if (!params.seed) {
    // An extended private key has both a normal 256 bit private key and a 256
    // bit chain code, both of which must be random. 512 bits is therefore the
    // maximum entropy and gives us maximum security against cracking.
    seed = crypto.randomBytes(512 / 8);
  } else {
    seed = params.seed;
  }

  var extendedKey = HDNode.fromSeedBuffer(seed);
  return {
    xpub: extendedKey.neutered().toBase58(),
    xprv: extendedKey.toBase58()
  };
};

//
// list
// List the user's keychains
//
Keychains.prototype.list = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  return this.bitgo.get(this.bitgo.url('/keychain'))
  .result('keychains')
  .nodeify(callback);
};

//
// add
// Add a new keychain
//
Keychains.prototype.add = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['xpub'], ['encryptedXprv'], callback);

  return this.bitgo.post(this.bitgo.url('/keychain'))
  .send(params)
  .result()
  .nodeify(callback);
};

//
// createBitGo
// Add a new BitGo server keychain
//
Keychains.prototype.createBitGo = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], [], callback);

  return this.bitgo.post(this.bitgo.url('/keychain/bitgo'))
  .send({})
  .result()
  .nodeify(callback);
};

//
// createBackup
// Create a new backup keychain through bitgo - often used for creating a keychain on a KRS
//
Keychains.prototype.createBackup = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['provider'], [], callback);

  return this.bitgo.post(this.bitgo.url('/keychain/backup'))
  .send(params)
  .result()
  .nodeify(callback);
};

//
// get
// Fetch an existing keychain
// Parameters include:
//   xpub:  the xpub of the key to lookup (required)
//
Keychains.prototype.get = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['xpub'], [], callback);

  return this.bitgo.post(this.bitgo.url('/keychain/' + params.xpub))
  .send({})
  .result()
  .nodeify(callback);
};

//
// update
// Update an existing keychain
// Parameters include:
//   xpub:  the xpub of the key to lookup (required)
//
Keychains.prototype.update = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['xpub'], ['encryptedXprv'], callback);

  return this.bitgo.put(this.bitgo.url('/keychain/' + params.xpub))
  .send({
    encryptedXprv: params.encryptedXprv,
  })
  .result()
  .nodeify(callback);
};


module.exports = Keychains;
