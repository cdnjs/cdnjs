'use strict';

var environments = require('./plaidEnvironments');
var Client = require('./PlaidClient');
var PlaidError = require('./PlaidError');

module.exports = {
  environments: environments,
  Client: Client,
  PlaidError: PlaidError,
};
