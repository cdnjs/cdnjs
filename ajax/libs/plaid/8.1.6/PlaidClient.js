'use strict';

var P = require('bluebird');
var R = require('ramda');

var plaidEnvironments = require('./plaidEnvironments');
var plaidRequest = require('./plaidRequest');
var wrapPromise = require('./wrapPromise');

// Default version of Plaid API, if not specified by the client.
const DEFAULT_VERSION = '2020-09-14';

// Client(String, String, String, String, Object?)
function Client(configs) {
  if (!R.is(Object, configs)) {
    throw new Error('Unexpected parameter type. ' +
    'Refer to https://github.com/plaid/plaid-node ' +
    'for how to create a Plaid client.');
  }

  if (R.isNil(configs.clientID)) {
    throw new Error('Missing Plaid "clientID"');
  }

  if (R.isNil(configs.secret)) {
    throw new Error('Missing Plaid "secret"');
  }

  if (!R.any(R.equals(configs.env), R.values(plaidEnvironments))) {
    throw new Error('Invalid Plaid environment');
  }

  if (arguments.length > 1) {
    throw new Error('Too many arguments to constructor');
  }

  this.client_id = configs.clientID;
  this.secret = configs.secret;
  this.env = configs.env;

  if (configs.options == null) {
    configs.options = {};
  }

  if (configs.options.version == null) {
    configs.options.version = DEFAULT_VERSION;
  }

  this.client_request_opts = configs.options;
}

// Private
var requestWithAccessToken = function(path) {
  return function(access_token, options, cb) {
    return this._authenticatedRequest({
      path: path,
      body: {
        access_token: access_token,
      }
    }, options, cb);
  };
};

var requestWithIncomeVerificationId = function(path) {
  return function(incomeVerificationId, options, cb) {
    return this._authenticatedRequest({
      path: path,
      body: {
        income_verification_id: incomeVerificationId,
      }
    }, cb);
  };
};

Client.prototype._authenticatedRequest =
  function _authenticatedRequest(requestSpec, options, cb) {
    // juggle arguments
    if (typeof options === 'function') {
      cb = options;
      options = {};
    } else {
      requestSpec.body.options = options;
    }

    var context = R.merge({env: this.env}, {
      client_id: this.client_id,
      secret: this.secret,
    });

    return plaidRequest(context, requestSpec, this.client_request_opts, cb);
  };

// createPublicToken(String, Object, Function)
Client.prototype.createPublicToken = function(access_token, options, cb) {
  const createPublicTokenRequest =
  requestWithAccessToken('/item/public_token/create', false);
  console.warn(`Warning: this method will be deprecated in a future version.
  To replace the public_token for initializing Link,
  look into the link_token at
  https://plaid.com/docs/api/tokens/#linktokencreate`);
  return createPublicTokenRequest.call(this, access_token, options, cb);
};

const linkTokenConfigFields = [
  'user',
  'client_name',
  'products',
  'country_codes',
  'language',
  'webhook',
  'access_token',
  'link_customization_name',
  'redirect_uri',
  'android_package_name',
  'account_filters',
  'cross_app_item_add',
  'payment_initiation',
];

// createLinkToken(CreateLinkTokenOptions, Function)
Client.prototype.createLinkToken =
  function(options, cb) {
    const body = linkTokenConfigFields.reduce((body, field) => {
      body[field] = options[field];
      return body;
    }, {});

    return this._authenticatedRequest({
      path: '/link/token/create',
      body: body,
    }, cb);
  };

// getLinkToken(CreateLinkTokenOptions, Function)
Client.prototype.getLinkToken =
  function(link_token, cb) {
    return this._authenticatedRequest({
      path: '/link/token/get',
      body: { link_token },
    }, cb);
  };

// exchangePublicToken(String, Function)
Client.prototype.exchangePublicToken =
  function(public_token, cb) {
    return this._authenticatedRequest({
      path: '/item/public_token/exchange',
      body: {
        public_token: public_token,
      }
    }, cb);
  };

// updateItemWebhook(String, String, Function)
Client.prototype.updateItemWebhook =
  function(access_token, webhook, cb) {
    return this._authenticatedRequest({
      path: '/item/webhook/update',
      body: {
        access_token: access_token,
        webhook: webhook,
      }
    }, cb);
  };

// createProcessorToken(String, String, String, Function)
Client.prototype.createProcessorToken =
  function(access_token, account_id, processor, cb) {
    var endpoint = '/processor/token/create';
    const options = {
      access_token,
      account_id,
      processor,
    };

    if (processor === 'stripe') {
      endpoint = '/processor/stripe/bank_account_token/create';
      delete options.processor;
    } else if (processor === 'apex') {
      endpoint = '/processor/apex/processor_token/create';
      delete options.processor;
    }

    return this._authenticatedRequest({
      path: endpoint,
      body: options,
    }, cb);
  };

Client.prototype.createStripeToken = function(access_token, account_id, cb) {
  return this.createProcessorToken(access_token, account_id, 'stripe', cb);
};

// invalidateAccessToken(String, Function)
Client.prototype.invalidateAccessToken =
  requestWithAccessToken('/item/access_token/invalidate');

// removeItem(String, Function)
Client.prototype.removeItem =
  requestWithAccessToken('/item/remove');

// getItem(String, Function)
Client.prototype.getItem =
  requestWithAccessToken('/item/get');

// importItem([String], Object, Object?, Function)
Client.prototype.importItem =
  function(products, user_auth, options, cb) {
    return this._authenticatedRequest({
      path: '/item/import',
      body: {
        products: products,
        user_auth: user_auth,
      }
    }, options, cb);
  };

// getAccounts(String, Object?, Function)
Client.prototype.getAccounts =
  requestWithAccessToken('/accounts/get');

// getBalance(String, Object?, Function)
Client.prototype.getBalance =
  requestWithAccessToken('/accounts/balance/get');

// getAuth(String, Object?, Function)
Client.prototype.getAuth =
  requestWithAccessToken('/auth/get');

// getIncome(String, Function)
// getIdentity(String, Function)
Client.prototype.getIdentity =
  requestWithAccessToken('/identity/get');

// getIncome(String, Function)
Client.prototype.getIncome =
  requestWithAccessToken('/income/get');

// getTransactions(String, Date, Date, Object?, Function)
Client.prototype.getTransactions =
  function(access_token, start_date, end_date, options, cb) {
    return this._authenticatedRequest({
      path: '/transactions/get',
      body: {
        access_token: access_token,
        start_date: start_date,
        end_date: end_date,
      },
    }, options, cb);
  };

// getAllTransactions(String, Date, Date, Object?, Function)
Client.prototype.getAllTransactions =
  function(access_token, start_date, end_date, options, cb) {
    // juggle arguments
    if (typeof options === 'function') {
      cb = options;
      options = {};
    } else {
      options = R.defaultTo({}, options);
    }

    var self = this;

    return wrapPromise(P.coroutine(function*() {
      var transactions = [];
      var transactionsCount = 0;
      var response = {};
      while (true) {
        const transactionsResponse = yield self.getTransactions(
          access_token,
          start_date,
          end_date,
          R.merge(options, {
            count: 500, // largest allowed value
            offset: transactions.length,
          })
        );

        response.accounts = transactionsResponse.accounts;
        response.item  = transactionsResponse.item;

        if (transactionsResponse.transactions != null) {
          transactions = R.concat(
            transactions, transactionsResponse.transactions);
          transactionsCount += transactionsResponse.transactions.length;
        }

        if (transactionsCount >= transactionsResponse.total_transactions) {
          break;
        }
      }

      response.total_transactions = transactionsCount;
      response.transactions = transactions;

      return response;
    })(), cb, {no_spread: true});
  };

// transactionsRefresh(String, Function)
Client.prototype.refreshTransactions =
  requestWithAccessToken('/transactions/refresh');

// getCreditDetails(String, Function)
Client.prototype.getCreditDetails =
  requestWithAccessToken('/credit_details/get');

// getHoldings(String, Function)
Client.prototype.getHoldings =
  requestWithAccessToken('/investments/holdings/get');

// getPaystub(String, Function)
Client.prototype.getPaystub =
  requestWithIncomeVerificationId('/income/verification/paystub/get');

// getSummary(String, Function)
Client.prototype.getSummary =
  requestWithIncomeVerificationId('/income/verification/summary/get');

// getInvestmentTransactions(String, Date, Date, Object?, Function)
Client.prototype.getInvestmentTransactions =
  function(access_token, start_date, end_date, options, cb) {
    return this._authenticatedRequest({
      path: '/investments/transactions/get',
      body: {
        access_token: access_token,
        start_date: start_date,
        end_date: end_date,
      },
    }, options, cb);
  };

// getLiabilities(String, Function)
Client.prototype.getLiabilities = requestWithAccessToken('/liabilities/get');

// createAssetReport([String], Number, Object, Function)
Client.prototype.createAssetReport =
  function(access_tokens, days_requested, options, cb) {
    return this._authenticatedRequest({
      path: '/asset_report/create',
      body: {
        access_tokens: access_tokens,
        days_requested: days_requested,
      },
    }, options, cb);
  };

// filterAssetReport(String, [String], Function)
Client.prototype.filterAssetReport =
  function(asset_report_token, account_ids_to_exclude, cb) {
    return this._authenticatedRequest({
      path: '/asset_report/filter',
      body: {
        asset_report_token: asset_report_token,
        account_ids_to_exclude: account_ids_to_exclude,
      },
    }, cb);
  };

// refreshAssetReport(String, Number, Object?, Function)
Client.prototype.refreshAssetReport =
  function(asset_report_token, days_requested, options, cb) {
    return this._authenticatedRequest({
      path: '/asset_report/refresh',
      body: {
        asset_report_token: asset_report_token,
        days_requested: days_requested,
      },
    }, options, cb);
  };


// getAssetReport(String, Boolean, Function)
Client.prototype.getAssetReport =
  function(asset_report_token, include_insights, cb) {
    return this._authenticatedRequest({
      path: '/asset_report/get',
      body: {
        asset_report_token: asset_report_token,
        include_insights: include_insights,
      },
    }, cb);
  };

// getAssetReportPdf(String, Function)
Client.prototype.getAssetReportPdf =
function(asset_report_token, cb) {
  return this._authenticatedRequest({
    path: '/asset_report/pdf/get',
    body: {
      asset_report_token: asset_report_token,
    },
    binary: true,
  }, cb);
};

// createAuditCopy(String, String, Function)
Client.prototype.createAuditCopy =
function(asset_report_token, auditor_id, cb) {
  return this._authenticatedRequest({
    path: '/asset_report/audit_copy/create',
    body: {
      asset_report_token: asset_report_token,
      auditor_id: auditor_id,
    },
  }, cb);
};

// getAuditCopy(String, Function)
Client.prototype.getAuditCopy =
  function(audit_copy_token, cb) {
    return this._authenticatedRequest({
      path: '/asset_report/audit_copy/get',
      body: {
        audit_copy_token: audit_copy_token,
      },
    }, cb);
  };

// removeAuditCopy(String, Function)
Client.prototype.removeAuditCopy =
function(audit_copy_token, cb) {
  return this._authenticatedRequest({
    path: '/asset_report/audit_copy/remove',
    body: {
      audit_copy_token: audit_copy_token,
    },
  }, cb);
};

// removeAssetReport(String, Function)
Client.prototype.removeAssetReport =
function(asset_report_token, cb) {
  return this._authenticatedRequest({
    path: '/asset_report/remove',
    body: {
      asset_report_token: asset_report_token,
    },
  }, cb);
};

// createPaymentRecipient(String, String, Object, Object, Function)
Client.prototype.createPaymentRecipient =
  function(name, iban, address, bacs, cb) {
    return this._authenticatedRequest({
      path: '/payment_initiation/recipient/create',
      body: {
        name: name,
        iban: iban != null ? iban : undefined,
        address: address,
        bacs: bacs != null ? bacs : undefined,
      },
    }, cb);
  };

// getPaymentRecipient(String, Function)
Client.prototype.getPaymentRecipient =
  function(recipient_id, cb) {
    return this._authenticatedRequest({
      path: '/payment_initiation/recipient/get',
      body: {recipient_id: recipient_id},
    }, cb);
  };

// listPaymentRecipients(Function)
Client.prototype.listPaymentRecipients =
  function(cb) {
    return this._authenticatedRequest({
      path: '/payment_initiation/recipient/list',
    }, cb);
  };

// createPayment(String, String, Object, Function)
Client.prototype.createPayment =
  function(recipient_id, reference, amount, cb) {
    return this._authenticatedRequest({
      path: '/payment_initiation/payment/create',
      body: {
        recipient_id: recipient_id,
        reference: reference,
        amount: amount,
      },
    }, cb);
  };

// createPaymentToken(String, Function)
Client.prototype.createPaymentToken =
  function(payment_id, cb) {
    console.warn(`Warning: this method will be deprecated in a future version.
    To replace the payment_token,
    look into the link_token at
    https://plaid.com/docs/api/tokens/#linktokencreate.`);

    return this._authenticatedRequest({
      path: '/payment_initiation/payment/token/create',
      body: {
        payment_id: payment_id,
      },
    }, cb);
  };

// getPayment(String, Function)
Client.prototype.getPayment =
  function(payment_id, cb) {
    return this._authenticatedRequest({
      path: '/payment_initiation/payment/get',
      body: {payment_id: payment_id},
    }, cb);
  };

// listPayments(Object, Function)
Client.prototype.listPayments =
  function(options, cb) {
    return this._authenticatedRequest({
      path: '/payment_initiation/payment/list',
      body: options,
    }, cb);
  };

// getDepositSwitch(String, Object?, Function)
Client.prototype.getDepositSwitch =
  function(deposit_switch_id, options, cb) {
    return this._authenticatedRequest({
      path: '/deposit_switch/get',
      body: {
        deposit_switch_id: deposit_switch_id,
      },
    }, options, cb);
  };

// createDepositSwitch(String, String, Object?, Function)
Client.prototype.createDepositSwitch =
  function(target_account_id, target_access_token, options, cb) {
    return this._authenticatedRequest({
      path: '/deposit_switch/create',
      body: {
        target_account_id: target_account_id,
        target_access_token: target_access_token,
      },
    }, options, cb);
  };

// createDepositSwitchToken(String, Object?, Function)
Client.prototype.createDepositSwitchToken =
  function(deposit_switch_id, options, cb) {
    return this._authenticatedRequest({
      path: '/deposit_switch/token/create',
      body: {
        deposit_switch_id: deposit_switch_id,
      },
    }, options, cb);
  };

// getInstitutions(Number, Number, [String], Object?, Function);
Client.prototype.getInstitutions =
  function(count, offset, country_codes, options, cb) {
    return this._authenticatedRequest({
      path: '/institutions/get',
      body: {
        count: count,
        offset: offset,
        country_codes: country_codes
      },
    }, options, cb);
  };

// getInstitutionById(String, [String], Object?, Function);
Client.prototype.getInstitutionById =
  function(institution_id, country_codes, options, cb) {
    return this._authenticatedRequest({
      path: '/institutions/get_by_id',
      body: {
        institution_id: institution_id,
        country_codes: country_codes
      }
    }, options, cb);
  };

// searchInstitutionsByName(String, [String], Object?, Function)
Client.prototype.searchInstitutionsByName =
 function(query, products, country_codes, options, cb) {
   return this._authenticatedRequest({
     path: '/institutions/search',
     body: {
       query: query,
       products: products,
       country_codes: country_codes
     }
   }, options, cb);
 };

// getCategories(Function)
Client.prototype.getCategories =
  function(cb) {
    return plaidRequest({
      env: this.env
    }, {
      path: '/categories/get'
    }, this.client_request_opts, cb);
  };

// resetLogin(String, Function) - sandbox only
Client.prototype.resetLogin =
  requestWithAccessToken('/sandbox/item/reset_login');

// getWebhookVerificationKey(String, Function)
Client.prototype.getWebhookVerificationKey =
function(key_id, cb) {
  return this._authenticatedRequest({
    path: '/webhook_verification_key/get',
    body: {
      key_id: key_id,
    },
  }, cb);
};

// sandboxPublicTokenCreate(String, Array, Object?, Function) - sandbox only
Client.prototype.sandboxPublicTokenCreate =
function(institution_id, initial_products, options, cb) {
  return this._authenticatedRequest({
    path: '/sandbox/public_token/create',
    body: {
      institution_id: institution_id,
      initial_products: initial_products,
    },
  }, options, cb);
};

// sandboxItemFireWebhook(String, String, Function) - sandbox only
Client.prototype.sandboxItemFireWebhook =
function(access_token, webhook_code, cb) {
  return this._authenticatedRequest({
    path: '/sandbox/item/fire_webhook',
    body: {
      access_token: access_token,
      webhook_code: webhook_code,
    },
  }, cb);
};

// sandboxItemSetVerificationStatus(String, String, String, Function)
// - sandbox only
Client.prototype.sandboxItemSetVerificationStatus =
function(access_token, account_id, verification_status, cb) {
  return this._authenticatedRequest({
    path: '/sandbox/item/set_verification_status',
    body: {
      access_token: access_token,
      account_id: account_id,
      verification_status: verification_status,
    },
  }, cb);
};

module.exports = Client;
