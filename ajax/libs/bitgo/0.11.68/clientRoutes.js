var bodyParser = require('body-parser');

var BitGoJS = require('./index');
var common = require('./common');
var Q = require('q');
var url = require('url');
var _ = require('lodash');
var pjson = require('../package.json');

var BITGOEXPRESS_USER_AGENT = "BitGoExpress/" + pjson.version;

var handleDecrypt = function(req) {
  return {
    decrypted: req.bitgo.decrypt(req.body)
  };
};

var handleEncrypt = function(req) {
  return {
    encrypted: req.bitgo.encrypt(req.body)
  };
};

var handleVerifyAddress = function(req) {
  return {
    verified: req.bitgo.verifyAddress(req.body)
  };
};

var handleCreateLocalKeyChain = function(req) {
  return req.bitgo.keychains().create(req.body);
};

var handleCreateWalletWithKeychains = function(req) {
  return req.bitgo.wallets().createWalletWithKeychains(req.body);
};

var handleSendCoins = function(req) {
  return req.bitgo.wallets().get({id: req.params.id})
  .then(function(wallet) {
    return wallet.sendCoins(req.body);
  })
  .then(function(result) {
    if (result.status === 'pendingApproval') {
      throw apiResponse(202, result);
    }
    return result;
  });
};

var handleSendMany = function(req) {
  return req.bitgo.wallets().get({id: req.params.id})
  .then(function(wallet) {
    return wallet.sendMany(req.body);
  })
  .then(function(result) {
    if (result.status === 'pendingApproval') {
      throw apiResponse(202, result);
    }
    return result;
  });
};

var handleCreateTransaction = function(req) {
  return req.bitgo.wallets().get({id: req.params.id})
  .then(function(wallet) {
    return wallet.createTransaction(req.body);
  })
  .catch(function(err) {
    if (err.message === "Insufficient funds") {
      throw apiResponse(400, err, "Insufficient funds");
    }
    throw err;
  })
};

var handleSignTransaction = function(req) {
  return req.bitgo.wallets().get({id: req.params.id})
  .then(function(wallet) {
    return wallet.signTransaction(req.body);
  });
};

var handleShareWallet = function(req) {
  return req.bitgo.wallets().get({id: req.params.id})
  .then(function(wallet) {
    return wallet.shareWallet(req.body);
  });
};

var handleAcceptShare = function(req) {
  var params = req.body || {};
  params.walletShareId = req.params.shareId;
  return req.bitgo.wallets().acceptShare(params);
};

var handleApproveTransaction = function(req) {
  var params = req.body || {};
  return req.bitgo.pendingApprovals().get({id: req.params.id})
  .then(function(pendingApproval) {
    if (params.state === 'approved') {
      return pendingApproval.approve(params);
    }
    return pendingApproval.reject(params);
  });
};

var handleConstructApprovalTx = function(req) {
  var params = req.body || {};
  return req.bitgo.pendingApprovals().get({id: req.params.id})
  .then(function(pendingApproval) {
    return pendingApproval.constructApprovalTx(params);
  });
};

var apiResponse = function(status, result, message) {
  var err = new Error(message);
  err.status = status;
  err.result = result;
  return err;
};

// Perform body parsing here only on routes we want
var parseBody = bodyParser.json();
// Create the bitgo object in the request
var prepareBitGo = function(args) {
  return function(req, res, next){
    // Get access token
    var accessToken;
    if (req.headers.authorization) {
      var authSplit = req.headers.authorization.split(" ");
      if (authSplit.length === 2 && authSplit[0].toLowerCase() === 'bearer') {
        accessToken = authSplit[1];
      }
    }

    var userAgent = req.headers['user-agent'] ? BITGOEXPRESS_USER_AGENT + " " + req.headers['user-agent'] : BITGOEXPRESS_USER_AGENT;
    var params = {
      accessToken: accessToken,
      userAgent: userAgent,
      env: args.env
    };

    if (args.customrooturi) {
      params.customRootURI = args.customrooturi;
    }

    if (args.custombitcoinnetwork) {
      params.customBitcoinNetwork = args.custombitcoinnetwork;
    }

    req.bitgo = new BitGoJS.BitGo(params);

    next();
  }
};

// Promise handler wrapper to handle sending responses and error cases
var promiseWrapper = function(promiseRequestHandler, args) {
  return function (req, res, next) {
    if (args.debug) {
      console.log('handle: ' + url.parse(req.url).pathname);
    }
    Q.fcall(promiseRequestHandler, req, res, next)
    .then(function (result) {
      var status = 200;
      if (result.__redirect) {
        res.redirect(result.url);
        status = 302;
      } else if (result.__render) {
        res.render(result.template, result.params);
      } else {
        res.status(status).send(result);
      }
    })
    .catch(function(caught) {
      var err;
      if (caught instanceof Error) {
        err = caught;
      } else if (typeof caught === 'string') {
        err = new Error("(string_error) " + caught);
      } else {
        err = new Error("(object_error) " + JSON.stringify(caught));
      }

      var message = err.message || 'local error';
      // use attached result, or make one
      var result = err.result || {error: message};
      result = _.extend({}, result);
      result.message = err.message;
      var status = err.status || 500;
      if (!(status >= 200 && status < 300)) {
        console.log('error %s: %s', status, err.message);
      }
      if (status == 500) {
        console.log(err.stack);
      }
      res.status(status).send(result);
    })
    .done();
  };
};

exports = module.exports = function(app, args) {
  app.post('/api/v1/decrypt', parseBody, prepareBitGo(args), promiseWrapper(handleDecrypt, args));
  app.post('/api/v1/encrypt', parseBody, prepareBitGo(args), promiseWrapper(handleEncrypt, args));
  app.post('/api/v1/verifyaddress', parseBody, prepareBitGo(args), promiseWrapper(handleVerifyAddress, args));

  app.post('/api/v1/keychain/local', parseBody, prepareBitGo(args), promiseWrapper(handleCreateLocalKeyChain, args));
  app.post('/api/v1/wallets/simplecreate', parseBody, prepareBitGo(args), promiseWrapper(handleCreateWalletWithKeychains, args));

  app.post('/api/v1/wallet/:id/sendcoins', parseBody, prepareBitGo(args), promiseWrapper(handleSendCoins, args));
  app.post('/api/v1/wallet/:id/sendmany', parseBody, prepareBitGo(args), promiseWrapper(handleSendMany, args));
  app.post('/api/v1/wallet/:id/createtransaction', parseBody, prepareBitGo(args), promiseWrapper(handleCreateTransaction, args));
  app.post('/api/v1/wallet/:id/signtransaction', parseBody, prepareBitGo(args), promiseWrapper(handleSignTransaction, args));

  app.post('/api/v1/wallet/:id/simpleshare', parseBody, prepareBitGo(args), promiseWrapper(handleShareWallet, args));
  app.post('/api/v1/walletshare/:shareId/acceptShare', parseBody, prepareBitGo(args), promiseWrapper(handleAcceptShare, args));

  app.put('/api/v1/pendingapprovals/:id/express', parseBody, prepareBitGo(args), promiseWrapper(handleApproveTransaction, args));
  app.put('/api/v1/pendingapprovals/:id/constructTx', parseBody, prepareBitGo(args), promiseWrapper(handleConstructApprovalTx, args));
};