//
// TransactionBuilder
// A utility for building and signing transactions
//
// Copyright 2014, BitGo, Inc.  All Rights Reserved.
//

var Q = require('q');
var Address = require('bitcoinjs-lib/src/address');
var HDNode = require('./hdnode');
var ECKey = require('bitcoinjs-lib/src/eckey');
var Transaction = require('bitcoinjs-lib/src/transaction');
var _TransactionBuilder = require('bitcoinjs-lib/src/transaction_builder');
var Script = require('bitcoinjs-lib/src/script');
var Scripts = require('bitcoinjs-lib/src/scripts');
var ECPubkey = require('bitcoinjs-lib/src/ecpubkey');
var ECSignature = require('bitcoinjs-lib/src/ecsignature');
var Opcodes = require('bitcoinjs-lib/src/opcodes');
var networks = require('bitcoinjs-lib/src/networks');
var common = require('./common');
var Util = require('./util');
var _ = require('lodash');

// Setup some fee constants.
var MAX_FEE = 1e8 * 0.1;        // The maximum fee we'll allow before declaring an error
var MAX_FEE_RATE = 1e8 * 0.001;        // The maximum fee we'll allow before declaring an error
var MIN_FEE_RATE = 1e8 * 0.00001;      // The minimum fee we'll allow before declaring an error
var FEE_PER_KB = 0.0001 * 1e8;  // The blockchain required fee-per-kb of transaction size
var MINIMUM_BTC_DUST = 5460;    // The blockchain will reject any output for less than this. (dust - give it to the miner)
var MIN_SPLIT_AMOUNT = 0.01 * 1e8; // When splitting change, don't bother splitting if it results in change under this amount
var FALLBACK_DEFAULT_UNSPENTS_TARGET = 8; // If splitChangeSize was -1 but we didn't have enough data, fallback to targeting this number of unspents

//
// TransactionBuilder
// @params:
//   wallet:  a wallet object to send from
//   recipients: array of recipient objects and the amount to send to each e.g. [{address: '38BKDNZbPcLogvVbcx2ekJ9E6Vv94DqDqw', amount: 1500}, {address: '36eL8yQqCn1HMRmVFFo49t2PJ3pai8wQam', amount: 2000}]
//   fee: the fee to use with this transaction.  if not provided, a default, minimum fee will be used.
//   feeRate: the amount of fee per kilobyte - optional - specify either fee, feeRate, or feeTxConfirmTarget but not more than one
//   feeTxConfirmTarget: calculate the fees per kilobyte such that the transaction will be confirmed in this number of blocks
//   maxFeeRate: The maximum fee per kb to use in satoshis, for safety purposes when using dynamic fees
//   minConfirms: the minimum confirmations an output must have before spending
//   forceChangeAtEnd: force the change address to be the last output
//   changeAddress: specify the change address rather than generate a new one
//   splitChangeSize: specify a target change size for splitting change (positive = #satoshis, 0 = never split, negative = automatic splitting)
//   minUnspentsTarget: specify number of unspents to target after this transaction is created
//   validate: extra verification of the change addresses, which is always done server-side and is redundant client-side (defaults true)
//   minUnspentSize: The minimum use of unspent to use (don't spend dust transactions). Defaults to MINIMUM_BTC_DUST.
//   feeSingleKeySourceAddress: Use this single key address to pay fees
//   feeSingleKeyWIF: Use the address based on this private key to pay fees
exports.createTransaction = function(params) {
  var minConfirms = params.minConfirms || 0;
  var validate = params.validate === undefined ? true : params.validate;
  var recipients = [];

  // Sanity check the arguments passed in
  if (typeof(params.wallet) != 'object' ||
     (params.fee && typeof(params.fee) != 'number') ||
     (params.feeRate && typeof(params.feeRate) != 'number') ||
     typeof(minConfirms) != 'number' ||
     (params.forceChangeAtEnd && typeof(params.forceChangeAtEnd) !== 'boolean') ||
     (params.changeAddress && typeof(params.changeAddress) !== 'string') ||
     (params.splitChangeSize !== undefined && typeof(params.splitChangeSize) !== 'number') ||
     (params.minUnspentsTarget !== undefined && typeof(params.minUnspentsTarget) !== 'number') ||
     (validate && typeof(validate) !== 'boolean') ||
     (params.enforceMinConfirmsForChange && typeof(params.enforceMinConfirmsForChange) !== 'boolean') ||
     (params.minUnspentSize && typeof(params.minUnspentSize) !== 'number') ||
     (params.maxFeeRate && typeof(params.maxFeeRate) !== 'number') ||
     (params.unspents && params.unspents.length < 1) || // this should be an array and its length must be at least 1
     (params.feeTxConfirmTarget && typeof(params.feeTxConfirmTarget) !== 'number') ||
     (params.instant && typeof(params.instant) !== 'boolean') ||
     (params.instantFee && typeof(params.instantFee) !== 'object')
  ) {
    throw new Error('invalid argument');
  }

  var self = this;

  // The user can specify a seperate, single-key wallet for the purposes of paying miner's fees
  // When creating a transaction this can be specified as an input address or the private key in WIF
  var feeSingleKeySourceAddress;
  var feeSingleKeyInputAmount = 0;
  if (params.feeSingleKeySourceAddress) {
    try {
      Address.fromBase58Check(params.feeSingleKeySourceAddress);
      feeSingleKeySourceAddress = params.feeSingleKeySourceAddress;
    } catch (e) {
      throw new Error('invalid bitcoin address: ' + params.feeSingleKeySourceAddress);
    }
  }

  if (params.feeSingleKeyWIF) {
    var feeSingleKey;
    try {
      feeSingleKey = ECKey.fromWIF(params.feeSingleKeyWIF);
    } catch(e) {
      throw new Error('Failed to parse key when importing feeSingleKeyWIF');
    }
    feeSingleKeySourceAddress = feeSingleKey.pub.getAddress(networks[common.getNetwork()]).toString();
    // If the user specifies both, check to make sure the feeSingleKeySourceAddress corresponds to the address of feeSingleKeyWIF
    if (params.feeSingleKeySourceAddress &&
        params.feeSingleKeySourceAddress !== feeSingleKeySourceAddress) {
      throw new Error('feeSingleKeySourceAddress did not correspond to address of feeSingleKeyWIF');
    }
  }

  if (typeof(params.minUnspentsTarget) != 'undefined') {
    if (params.splitChangeSize) {
      throw new Error('cannot specify both splitChangeSize as well as target number of unspents');
    }
    if (params.unspents) {
      throw new Error('cannot specify both minUnspentsTarget as well as custom unspents');
    }
    if (params.minUnspentsTarget > 50) {
      throw new Error('cannot target more than 50 unspents - use wallet.fanOutUnspents instead');
    }
  } else if (typeof(params.splitChangeSize) === 'undefined') {
    params.splitChangeSize = -1; // reasonable default for new wallets
  }

  if (typeof(params.recipients) != 'object') {
    throw new Error('recipients must be array of { address: abc, amount: 100000 } objects');
  }

  var feeParamsDefined = (typeof(params.fee) !== 'undefined') +
                          (typeof(params.feeRate) !== 'undefined') +
                          (typeof(params.feeTxConfirmTarget) !== 'undefined');
  if (feeParamsDefined > 1) {
    throw new Error('cannot specify more than one of fee, feeRate and feeTxConfirmTarget');
  } else if (feeParamsDefined === 0) {
    // no fee params were specified, so try to get the best estimate based on network conditions
    params.feeTxConfirmTarget = 2;
  }

  if (typeof(params.maxFeeRate) === 'undefined') {
    params.maxFeeRate = MAX_FEE_RATE;
  }

  // Convert the old format of params.recipients (dictionary of address:amount) to new format: { destinationAddress, amount }
  if (!(params.recipients instanceof Array)) {
    recipients = [];
    Object.keys(params.recipients).forEach(function(destinationAddress) {
      var amount = params.recipients[destinationAddress];
      recipients.push({address: destinationAddress, amount: amount});
    });
  } else {
    recipients = params.recipients;
  }

  if (recipients.length === 0) {
    throw new Error('must have at least one recipient');
  }

  var fee = params.fee;
  var feeRate = params.feeRate;

  // Flag indicating whether this class will compute the fee
  var shouldComputeBestFee = (typeof(fee) == 'undefined');

  if (fee > MAX_FEE) {
    throw new Error('fee too generous');  // Protection against bad inputs
  }
  if (feeRate > MAX_FEE_RATE) {
    throw new Error('fee rate too generous');  // Protection against bad inputs
  }

  var totalOutputAmount = 0;

  recipients.forEach(function(recipient) {
    if (typeof(recipient.address) == 'string') {
      var addressObj;
      try {
        addressObj = Address.fromBase58Check(recipient.address);
      } catch (e) {
        throw new Error('invalid bitcoin address: ' + recipient.address);
      }
      if (!!recipient.script) {
        // A script was provided as well - validate that the address corresponds to that
        if (addressObj.toOutputScript().toHex() != recipient.script) {
          throw new Error('both script and address provided but they did not match: ' + recipient.address + " " + recipient.script);
        }
      }
    }
    if (typeof(recipient.amount) != 'number' || isNaN(recipient.amount) || recipient.amount < 0) {
      throw new Error('invalid amount for ' + recipient.address + ': ' + recipient.amount);
    }
    totalOutputAmount += recipient.amount;
  });

  var instantFeeInfo = params.instantFee;
  if (instantFeeInfo &&
    (typeof(instantFeeInfo.amount) !== 'number' || typeof(instantFeeInfo.address) !== 'string')) {
    throw new Error('invalid instantFee');
  }

  // The total amount needed for this transaction.
  var totalAmount = totalOutputAmount + (fee || 0);

  // The list of unspent transactions being used in this transaction.
  var unspents;

  // The sum of the input values for this transaction.
  var inputAmount;

  var changeOutputs = [];

  // The transaction.
  var transaction = new Transaction();

  var getInstantFee = function() {
    return Q().then(function() {
      // If we're not sending instant, or instantFeeInfo is already set, don't fetch fee
      if (!params.instant || instantFeeInfo) {
        return;
      }
      return params.wallet.bitgo.instantFee({ amount: totalOutputAmount, wallet: params.wallet.id() })
      .then(function(feeInfo) {
        if (feeInfo && feeInfo.fee > 0) {
          instantFeeInfo = {
            amount: feeInfo.fee
          };
        }
      });
    })
    .then(function() {
      if (instantFeeInfo && instantFeeInfo.amount > 0) {
        totalAmount += instantFeeInfo.amount;
      }
    });
  };

  var getInstantFeeAddress = function() {
    // If we don't have instantFeeInfo, or address is already set, don't get a new one
    if (!instantFeeInfo || instantFeeInfo.address) {
      return;
    }
    return params.wallet.bitgo.instantFeeAddress()
    .then(function(addressInfo) {
      instantFeeInfo.address = addressInfo.address;
    });
  };

  var numChangeOutputs = 1;
  var numUnspentsAfterTx = 0;

  // Get a dynamic fee estimate from the BitGo server if feeTxConfirmTarget is specified
  var getDynamicFeeEstimate = function () {
    if (params.feeTxConfirmTarget) {
      return params.wallet.estimateFee({ numBlocks: params.feeTxConfirmTarget, maxFee: params.maxFeeRate })
      .then(function(result) {
        var estimatedFeeRate = result.feePerKb;
        if (estimatedFeeRate < MIN_FEE_RATE) {
          feeRate = MIN_FEE_RATE;
        } else if (estimatedFeeRate > params.maxFeeRate) {
          feeRate = params.maxFeeRate;
        } else {
          feeRate = estimatedFeeRate;
        }
      })
      .catch(function() {
        // some error happened estimating the fee, so use the default
        feeRate = FEE_PER_KB;
      });
    }
    // always return a promise
    return Q();
  };

  // Get the unspents for the sending wallet.
  var getUnspents = function () {

    if (params.unspents) { // we just wanna use custom unspents
      unspents = params.unspents;
      return;
    }

    // Get enough unspents for the requested amount, plus a little more in case we need to pay an increased fee
    var options = {
      target: totalAmount + 0.01e8,  // fee @ 0.0001/kb for a 100kb tx
      minSize: params.minUnspentSize || MINIMUM_BTC_DUST, // don't bother to use unspents smaller than dust
      instant: params.instant // insist on instant unspents only
    };

    return params.wallet.unspentsPaged(options)
    .then(function(results) {
      unspents = results.unspents.filter(function (u) {
        var confirms = u.confirmations || 0;
        if (!params.enforceMinConfirmsForChange && u.isChange) {
          return true;
        }
        return confirms >= minConfirms;
      });
      numUnspentsAfterTx = results.total - results.count;
      if (params.minUnspentsTarget) {
        // number of unspents left after this tx will be total - count (which we will use now)
        numChangeOutputs = Math.max(params.minUnspentsTarget - numUnspentsAfterTx, 1);
      }
    });
  };

  // Get the unspents for the single key fee address
  var feeSingleKeyUnspents = [];
  var getUnspentsForSingleKey = function() {
    if (feeSingleKeySourceAddress) {
      var feeTarget = 0.01e8;
      if (params.instant) {
        feeTarget += totalAmount * 0.001;
      }
      return params.wallet.bitgo.get(params.wallet.bitgo.url('/address/' + feeSingleKeySourceAddress + '/unspents?target=' + feeTarget))
      .then(function(response) {
        if (response.body.total <= 0) {
          throw new Error("No unspents available in single key fee source");
        }
        feeSingleKeyUnspents = response.body.unspents;
      });
    }
  };

  var estimateTxSizeKb = function () {
    // Tx size is dominated by signatures.
    // Use the rough formula of 6 signatures per KB.
    var signaturesPerInput = 2;  // 2-of-3 wallets

    // Add 1 output for change, possibly 1 output for instant fee, and 1 output for the single key change if needed
    var outputSizeKb = (recipients.length + 1 + (instantFeeInfo ? 1 : 0) + (feeSingleKeySourceAddress ? 1 : 0)) * 34 / 1000;

    // Add 1 output potentially for the single key fee
    var inputSizeKb = (transaction.ins.length * signaturesPerInput * 170) / 1000;

    return inputSizeKb + outputSizeKb;
  };

  // Approximate the fee based on number of inputs
  var calculateApproximateFee = function () {
    var feeRateToUse = typeof(feeRate) !== 'undefined' ? feeRate : FEE_PER_KB;
    return Math.ceil(estimateTxSizeKb() * feeRateToUse);
  };

  // Iterate unspents, sum the inputs, and save _inputs with the total
  // input amound and final list of inputs to use with the transaction.
  var feeSingleKeyUnspentsUsed = [];
  var collectInputs = function () {
    inputAmount = 0;
    unspents.every(function (unspent) {
      inputAmount += unspent.value;
      var hash = new Buffer(unspent.tx_hash, 'hex');
      hash = new Buffer(Array.prototype.reverse.call(hash));
      var script = Script.fromHex(unspent.script);
      transaction.addInput(hash, unspent.tx_output_n, 0xffffffff, script);
      return (inputAmount < (feeSingleKeySourceAddress ? totalOutputAmount : totalAmount));
    });

    // if paying fees from an external single key wallet, add the inputs
    if (feeSingleKeySourceAddress) {
      // collect the amount used in the fee inputs so we can get change later
      feeSingleKeyInputAmount = 0;
      feeSingleKeyUnspentsUsed = [];
      feeSingleKeyUnspents.every(function (unspent) {
        feeSingleKeyInputAmount += unspent.value;
        inputAmount += unspent.value;
        transaction.addInput(unspent.tx_hash, unspent.tx_output_n);
        feeSingleKeyUnspentsUsed.push(unspent);
        // use the fee wallet to pay miner fees and potentially instant fees
        return (feeSingleKeyInputAmount < (fee + (instantFeeInfo ? instantFeeInfo.amount : 0)));
      });
    }

    if (shouldComputeBestFee) {
      var approximateFee = calculateApproximateFee();
      var shouldRecurse = typeof(fee) === 'undefined' || approximateFee > fee;
      fee = approximateFee;
      // Recompute totalAmount from scratch
      totalAmount = fee + totalOutputAmount;
      if (instantFeeInfo) {
        totalAmount += instantFeeInfo.amount;
      }
      if (shouldRecurse) {
        // if fee changed, re-collect inputs
        inputAmount = 0;
        transaction.ins = [];
        return collectInputs();
      }
    }

    var totalFee = fee + (instantFeeInfo ? instantFeeInfo.amount : 0);

    if (feeSingleKeySourceAddress) {
      if (totalFee > _.sum(feeSingleKeyUnspents, 'value')) {
        var err = new Error('Insufficient fee amount available in single key fee source');
        err.result = {
          fee: fee,
          available: inputAmount,
          instantFee: instantFeeInfo
        };
        return Q.reject(err);
      }
    }

    if (inputAmount < (feeSingleKeySourceAddress ? totalOutputAmount : totalAmount)) {
      var err = new Error('Insufficient funds');
      err.result = {
        fee: fee,
        available: inputAmount,
        instantFee: instantFeeInfo
      };
      return Q.reject(err);
    }
  };

  // Add the outputs for this transaction.
  var collectOutputs = function () {
    var estimatedTxSize = estimateTxSizeKb();
    if (estimatedTxSize >= 90) {
      throw new Error('transaction too large: estimated size ' + estimatedTxSize + 'kb');
    }

    var outputs = [];

    recipients.forEach(function (recipient) {
      var script;
      if (typeof(recipient.address) == 'string') {
        var addr = Address.fromBase58Check(recipient.address);
        script = addr.toOutputScript();
      } else if(typeof(recipient.script) === 'object') {
        script = recipient.script;
      } else {
        throw new Error('neither recipient address nor script was provided');
      }
      outputs.push({
        script: script,
        amount: recipient.amount
      });
    });

    var getSplitChangeSize = function() {
      if (typeof(params.splitChangeSize) !== 'number') {
        return 0;
      }
      if (params.splitChangeSize >= 0) {
        return params.splitChangeSize;
      }
      // negative values => auto change splitting
      return params.wallet.stats()
      .then(function(stats) {
        // If we have at least 25 data points, choose a size which is equal to the 75th percentile of tx spend sizes,
        // but put a floor of max(1% of the wallet balance, 0.1 BTC)
        var minAutoSplitSize = Math.max(params.wallet.balance() / 100, 1e7);
        var STATS_MIN_SENDS = 25;
        var SEND_SIZE_PERCENTILE = 75;
        if (stats.nSends >= STATS_MIN_SENDS && stats.sendSizes && stats.sendSizes[SEND_SIZE_PERCENTILE]) {
          return Math.floor(Math.max(stats.sendSizes[SEND_SIZE_PERCENTILE], minAutoSplitSize));
        }
        // Don't split
        return 0;
      })
      .catch(function(err) {
        console.log(err);
        // In case of any error, don't split
        return 0;
      });
    };

    var getChangeOutputs = function(changeAmount) {
      if (changeAmount < 0) {
        throw new Error('negative change amount');
      }
      if (changeAmount < MINIMUM_BTC_DUST) {
        // Give it to the miners
        return [];
      }

      var result = [];
      // if we paid fees from a single key wallet, return the fee change first
      if (feeSingleKeySourceAddress) {
        var feeSingleKeyWalletChangeAmount = feeSingleKeyInputAmount - (fee + (instantFeeInfo ? instantFeeInfo.amount : 0));
        if (feeSingleKeyWalletChangeAmount >= MINIMUM_BTC_DUST) {
          result.push({ address: feeSingleKeySourceAddress, amount: feeSingleKeyWalletChangeAmount });
          changeAmount = changeAmount - feeSingleKeyWalletChangeAmount;
        }
      }

      // If user specified directly, just return it
      if (params.changeAddress) {
        result.push({ address: params.changeAddress, amount: changeAmount });
        return result;
      }
      if (params.wallet.type() === 'safe') {
        return params.wallet.addresses()
        .then(function(response) {
          result.push({ address: response.addresses[0].address, amount: changeAmount });
          return result;
        });
      }

      var splitAmount;

      // Recursive method to keep adding outputs as long as we haven't hit our desired numChangeOutputs
      var numExtraChangeOutputs = numChangeOutputs - 1;
      var addChangeOutputs = function() {
        if (result.length >= numExtraChangeOutputs) {
          // Base case
          // One more change output will be added later, we now have enough
          return;
        }
        // This algorithm will attempt to make a roughly even split of the outputs,
        // with a +/- 1/6 randomization of the output at each step
        // The change amount is 1 / (remaining amount of change to be spent)
        var thisChangeAmount = changeAmount / (numChangeOutputs - result.length);
        var randomAdjustment = ((2 * Math.random() - 1) / 6) * thisChangeAmount;
        thisChangeAmount = 10000 * Math.floor((thisChangeAmount + randomAdjustment) / 10000);
        if (thisChangeAmount <= MIN_SPLIT_AMOUNT) {
          // we're dealing in amounts too small here, don't bother splitting
          return;
        }
        // create an additional change address
        return params.wallet.createAddress({chain: 1, validate: validate})
        .then(function (changeAddress) {
          // add the new output and then keep going
          changeAmount = changeAmount - thisChangeAmount;
          changeAddress.amount = thisChangeAmount;
          result.push(changeAddress);
          return addChangeOutputs();
        });
      };

      return Q()
      .then(function() {
        if (params.minUnspentsTarget) {
          // Caller wants to target a minimum number of unspents on the wallet.
          // Potentially this can help mitigate spending long unconfirmed chains.
          return addChangeOutputs();
        } else if (params.splitChangeSize) {
          return Q()
          .then(getSplitChangeSize)
          .then(function(splitChangeSize) {
            if (splitChangeSize > 0) {
              if (changeAmount > 2 * splitChangeSize) {
                // Start with an even split
                splitAmount = changeAmount / 2;
                // Adjust split amount by a random amount between -1/6 and 1/6 of the total change amount
                // This results in max ratio of the sizes of 2:1
                var adjustment = ((2 * Math.random() - 1) / 6) * changeAmount;
                // Make at least one of the two change outputs end in 0000
                splitAmount = 10000 * Math.floor((splitAmount + adjustment) / 10000);

                // adjust changeAmount to account for the split
                changeAmount = changeAmount - splitAmount;

                // create an additional change address
                return params.wallet.createAddress({chain: 1, validate: validate})
                .then(function (changeAddress) {
                  changeAddress.amount = splitAmount;
                  result.push(changeAddress);
                });
              }
            } else {
              // We wanted to use splitChangeSize but there were not enough stats to do that, let's fall back to
              // ensuring we have a minimum amount of change
              numChangeOutputs = Math.max(FALLBACK_DEFAULT_UNSPENTS_TARGET - numUnspentsAfterTx, 1);
              numExtraChangeOutputs = numChangeOutputs - 1;
              return addChangeOutputs();
            }
          });
        }
      })
      .then(function() {
        return params.wallet.createAddress({chain: 1, validate: validate});
      })
      .then(function(changeAddress) {
        changeAddress.amount = changeAmount;
        result.push(changeAddress);
        return result;
      });
    };

    // Add change output(s) and instant fee output if applicable
    return Q().then(function() {
      return getChangeOutputs(inputAmount - totalAmount);
    })
    .then(function(result) {
      changeOutputs = result;
      var extraOutputs = changeOutputs.concat([]); // copy the array
      if (instantFeeInfo && instantFeeInfo.amount > 0) {
        extraOutputs.push(instantFeeInfo);
      }
      extraOutputs.forEach(function(output) {
        output.script = Address.fromBase58Check(output.address).toOutputScript();

        // decide where to put the outputs - default is to randomize unless forced to end
        var outputIndex = params.forceChangeAtEnd ? outputs.length : _.random(0, outputs.length);
        outputs.splice(outputIndex, 0, output);
      });

      // Add all outputs to the transaction
      outputs.forEach(function(output) {
        transaction.addOutput(output.script, output.amount);
      });
    });
  };

  // Serialize the transaction, returning what is needed to sign it
  var serialize = function () {
    // only need to return the unspents that were used and just the chainPath, redeemScript, and instant flag
    var pickedUnspents = _.map(unspents, function (unspent) { return _.pick(unspent, ['chainPath', 'redeemScript', 'instant']); });
    var prunedUnspents = _.slice(pickedUnspents, 0, transaction.ins.length - feeSingleKeyUnspentsUsed.length);
    _.every(feeSingleKeyUnspentsUsed, function(feeUnspent) {
      prunedUnspents.push({ redeemScript: false, chainPath: false }); // mark as false to signify a non-multisig address
    });
    var result = {
      transactionHex: transaction.toBuffer().toString('hex'),
      unspents: prunedUnspents,
      fee: fee,
      changeAddresses: changeOutputs.map(function(co) { return _.pick(co, ['address', 'path', 'amount']); }),
      walletId: params.wallet.id(),
      walletKeychains: params.wallet.keychains,
      feeRate: feeRate,
      instant: params.instant,
      instantFee: instantFeeInfo
    };

    return result;
  };

  return Q().then(function() {
    return getInstantFee();
  })
  .then(function() {
    return Q.all([getInstantFeeAddress(), getDynamicFeeEstimate(), getUnspents(), getUnspentsForSingleKey()]);
  })
  .then(collectInputs)
  .then(collectOutputs)
  .then(serialize);
};

/*
 * Given a transaction hex, unspent information (chain path and redeem scripts), and the keychain xprv,
 * perform key derivation and sign the inputs in the transaction based on the unspent information provided
 *
 * @params:
 *  transactionHex serialized form of the transaction in hex
 *  unspents array of unspent information, where each unspent is a chainPath and redeemScript with the same
 *  index as the inputs in the transactionHex
 *  keychain Keychain containing the xprv to sign with. For legacy support of safe wallets, keychain can
    also be a WIF private key.
 *  signingKey private key in WIF for safe wallets, when keychain is unavailable
 *  validate client-side signature verification - can be disabled for improved performance (signatures
 *           are still validated server-side).
 *  feeSingleKeyWIF Use the address based on this private key to pay fees
 * @returns {*}
 */
exports.signTransaction = function(params) {
  var keychain = params.keychain; // duplicate so as to not mutate below

  var validate = (params.validate === undefined) ? true : params.validate;
  var privKey;
  if (typeof(params.transactionHex) != 'string') {
    throw new Error('expecting the transaction hex as a string');
  }
  if (!Array.isArray(params.unspents)) {
    throw new Error('expecting the unspents array');
  }
  if (typeof(validate) != 'boolean') {
    throw new Error('expecting validate to be a boolean');
  }
  if (typeof(keychain) != 'object' || typeof(keychain.xprv) != 'string') {
    if (typeof(params.signingKey) === 'string') {
      privKey = ECKey.fromWIF(params.signingKey);
      keychain = undefined;
    } else {
      throw new Error('expecting the keychain object with xprv');
    }
  }

  var feeSingleKey;
  if (params.feeSingleKeyWIF) {
    feeSingleKey = ECKey.fromWIF(params.feeSingleKeyWIF);
  }

  var transaction = Transaction.fromHex(params.transactionHex);
  if (transaction.ins.length !== params.unspents.length) {
    throw new Error('length of unspents array should equal to the number of transaction inputs');
  }

  var rootExtKey;
  if (keychain) {
    rootExtKey = HDNode.fromBase58(keychain.xprv);
  }
  for (var index = 0; index < transaction.ins.length; ++index) {
    if (params.unspents[index].redeemScript === false) {
      // this is the input from a single key fee address
      if (!feeSingleKey) {
        throw new Error('single key address used in input but feeSingleKeyWIF not provided');
      }

      var txb = _TransactionBuilder.fromTransaction(transaction);
      txb.sign(index, feeSingleKey);
      transaction = txb.buildIncomplete();
      continue;
    }

    if (keychain) {
      var subPath = keychain.walletSubPath || '/0/0';
      var path = keychain.path + subPath + params.unspents[index].chainPath;
      var extKey = rootExtKey.deriveFromPath(path);
      privKey = extKey.privKey;
    }

    // subscript is the part of the output script after the OP_CODESEPARATOR.
    // Since we are only ever signing p2sh outputs, which do not have
    // OP_CODESEPARATORS, it is always the output script.
    var subscript  = Script.fromHex(params.unspents[index].redeemScript);

    // In order to sign with bitcoinjs-lib, we must use its transaction
    // builder, confusingly named the same exact thing as our transaction
    // builder, but with inequivalent behavior.
    var txb = _TransactionBuilder.fromTransaction(transaction);
    try {
      txb.sign(index, privKey, subscript, Transaction.SIGHASH_ALL);
    } catch (e) {
      return Q.reject('Failed to sign input #' + index);
    }

    // Build the "incomplete" transaction, i.e. one that does not have all
    // the signatures (since we are only signing the first of 2 signatures in
    // a 2-of-3 multisig).
    transaction = txb.buildIncomplete();

    // bitcoinjs-lib adds one more OP_0 than we need. It creates one OP_0 for
    // every n public keys in an m-of-n multisig, and replaces the OP_0s with
    // the signature of the nth public key, then removes any remaining OP_0s
    // at the end. This behavior is not incorrect and valid for some use
    // cases, particularly if you do not know which keys will be signing the
    // transaction and the signatures may be added to the transaction in any
    // chronological order, but is not compatible with the BitGo API, which
    // assumes m OP_0s for m-of-n multisig (or m-1 after the first signature
    // is created). Thus we need to remove the superfluous OP_0.
    var chunks = transaction.ins[index].script.chunks;
    if (chunks.length !== 5) {
      throw new Error('unexpected number of chunks in the OP_CHECKMULTISIG script after signing');
    }
    if (chunks[1]) {
      chunks.splice(2, 1); // The extra OP_0 is the third chunk
    } else if (chunks[2]) {
      chunks.splice(1, 1); // The extra OP_0 is the second chunk
    }

    transaction.ins[index].script = Script.fromChunks(chunks);

    // The signatures are validated server side and on the bitcoin network, so
    // the signature validation is optional and can be disabled by setting:
    // validate = false
    if (validate) {
      if (exports.verifyInputSignatures(transaction, index, subscript) !== -1) {
        throw new Error('number of signatures is invalid - something went wrong when signing');
      }
    }
  }

  return Q.when({
    transactionHex: transaction.toBuffer().toString('hex')
  });
};

/**
 * Verify the signature on an input.
 *
 * If the transaction is fully signed, returns a positive number representing the number of valid signatures.
 * If the transaction is partially signed, returns a negative number representing the number of valid signatures.
 * @param transaction The bitcoinjs-lib transaction object
 * @param inputIndex the input index to verify
 * @param pubScript the redeem script to verify with
 * @returns {number}
 */
exports.verifyInputSignatures = function(transaction, inputIndex, pubScript) {
  if (inputIndex < 0 || inputIndex >= transaction.ins.length) {
    throw new Error('illegal index');
  }
  if (!(pubScript instanceof Script)) {
    throw new Error('illegal argument');
  }

  var sigScript = transaction.ins[inputIndex].script;
  var sigsNeeded = 1;
  var sigs = [];
  var pubKeys = [];

  // Check the script type to determine number of signatures, the pub keys, and the script to hash.
  switch(Scripts.classifyInput(sigScript, true)) {
    case 'scripthash':
      // Replace the pubScript with the P2SH Script.
      var p2shBytes = sigScript.chunks[sigScript.chunks.length -1];
      pubScript = Script.fromBuffer(p2shBytes);
      sigsNeeded = pubScript.chunks[0] - Opcodes.OP_1 + 1;
      for (var index = 1; index < sigScript.chunks.length -1; ++index) {
        sigs.push(sigScript.chunks[index]);
      }
      for (var index = 1; index < pubScript.chunks.length - 2; ++index) {
        pubKeys.push(pubScript.chunks[index]);
      }
      break;
    case 'pubkeyhash':
      sigsNeeded = 1;
      sigs.push(sigScript.chunks[0]);
      pubKeys.push(sigScript.chunks[1]);
      break;
    default:
      return 0;
      break;
  }

  var numVerifiedSignatures = 0;
  for (var sigIndex = 0; sigIndex < sigs.length; ++sigIndex) {
    // If this is an OP_0, then its been left as a placeholder for a future sig.
    if (sigs[sigIndex] == Opcodes.OP_0) {
      continue;
    }

    var hashType = sigs[sigIndex][sigs[sigIndex].length - 1];
    sigs[sigIndex] = sigs[sigIndex].slice(0, sigs[sigIndex].length - 1); // pop hash type from end
    var signatureHash = transaction.hashForSignature(inputIndex, pubScript, hashType);
    var signature = ECSignature.fromDER(sigs[sigIndex]);


    var validSig = false;

    // Enumerate the possible public keys
    for (var pubKeyIndex = 0; pubKeyIndex < pubKeys.length; ++pubKeyIndex) {
      var pubKey = ECPubkey.fromBuffer(pubKeys[pubKeyIndex]);

      validSig = pubKey.verify(signatureHash, signature);
      if (validSig) {
        pubKeys.splice(pubKeyIndex, 1);  // remove the pubkey so we can't match 2 sigs against the same pubkey
        break;
      }
    }
    if (!validSig) {
      throw new Error('invalid signature');
    }
    numVerifiedSignatures++;
  }

  if (numVerifiedSignatures < sigsNeeded) {
    numVerifiedSignatures = -numVerifiedSignatures;
  }
  return numVerifiedSignatures;
};
