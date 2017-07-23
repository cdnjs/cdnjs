exports.Environments = {
  prod: { uri: 'https://www.bitgo.com', network: 'bitcoin', signingAddress: '1BitGo3gxRZ6mQSEH52dvCKSUgVCAH4Rja' },
  staging: { uri: 'https://staging.bitgo.com', network: 'bitcoin', signingAddress: '1BitGo3gxRZ6mQSEH52dvCKSUgVCAH4Rja' },
  test: { uri: 'https://test.bitgo.com', network: 'testnet', signingAddress: 'msignBdFXteehDEgB6DNm7npRt7AcEZJP3' },
  dev: { uri: 'https://webdev.bitgo.com', network: 'testnet', signingAddress: 'msignBdFXteehDEgB6DNm7npRt7AcEZJP3' },
  local: { uri: 'http://localhost:3000', network: 'testnet', signingAddress: 'msignBdFXteehDEgB6DNm7npRt7AcEZJP3' },
  custom: { uri: process.env.BITGO_CUSTOM_ROOT_URI, network: process.env.BITGO_CUSTOM_BITCOIN_NETWORK || 'bitcoin', signingAddress: '1BitGo3gxRZ6mQSEH52dvCKSUgVCAH4Rja' }
};

var bitcoinNetwork;
exports.setNetwork = function(network) {
  if (network == 'bitcoin') {
    bitcoinNetwork = 'bitcoin';
  } else {
    // test network
    bitcoinNetwork = 'testnet';
  }
};

exports.getNetwork = function() {
  return bitcoinNetwork;
};

/**
 * Helper function to validate the input parameters to an SDK method.
 * Only validates for strings - if parameter is different, check that manually
 *
 * @param params {Object} dictionary of parameter key-value pairs
 * @param expectedParams {string[]} list of expected string parameters
 * @param optionalParams {string[]} list of optional string parameters
 * @param optionalCallback {Function} if callback provided, must be a function
 * @returns {boolean} true if validated, throws with reason otherwise
 */
exports.validateParams = function(params, expectedParams, optionalParams, optionalCallback) {
  if (typeof(params) != 'object') {
    throw new Error('Must pass in parameters dictionary');
  }

  expectedParams = expectedParams || [];

  expectedParams.forEach(function(expectedParam) {
    if (!params[expectedParam]) {
      throw new Error('Missing parameter: ' + expectedParam);
    }
    if (typeof(params[expectedParam]) != 'string') {
      throw new Error('Expecting parameter string: ' + expectedParam + ' but found ' + typeof(params[expectedParam]));
    }
  });

  optionalParams = optionalParams || [];
  optionalParams.forEach(function(optionalParam) {
    if (params[optionalParam] && typeof(params[optionalParam]) != 'string') {
      throw new Error('Expecting parameter string: ' + optionalParam + ' but found ' + typeof(params[optionalParam]));
    }
  });

  if (optionalCallback && typeof(optionalCallback) != 'function') {
    throw new Error('illegal callback argument');
  }

  return true;
};
