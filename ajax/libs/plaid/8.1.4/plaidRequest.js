'use strict';

var R = require('ramda');
var axios = require('axios');
var pjson = require('../package.json');

var PlaidError = require('./PlaidError');
var wrapPromise = require('./wrapPromise');


// Max timeout of ten minutes
var DEFAULT_TIMEOUT_IN_MILLIS = 10 * 60 * 1000;

var rejectWithPlaidError = function(reject, res) {
  // plaid error
  if (R.type(res.data) === 'Object') {
    res.data.status_code = res.status;
    return reject(new PlaidError(res.data));
  }

  // Unknown body type returned, return a standard API_ERROR
  return reject(new PlaidError({
    error_type: 'API_ERROR',
    status_code: res.status,
    error_code: 'INTERNAL_SERVER_ERROR',
    error_message: String(res.data),
    display_message: null,
    request_id: null,
  }));
};

var handleApiResponse = function(resolve, reject, res, isMfa) {
  var $body = res.data;

  if (res != null && R.type($body) === 'Object') {
    $body.status_code = res.status;
  }

  // success response (MFA)
  if (isMfa && res.status === 200) {
    return resolve([null, $body]);

  // mfa response (MFA)
  } else if (isMfa && res.status === 210) {
    return resolve([$body, null]);

  // success response (non mfa)
  } else if (res.status === 200) {
    // extract request id from header for binary data,
    // i.e. mime type application/*
    if (res.headers['plaid-request-id'] != null &&
        res.headers['content-type'] != null &&
        res.headers['content-type'].indexOf('application') === 0) {
      return resolve({
        request_id: res.headers['plaid-request-id'],
        buffer: $body
      });
    }
    return resolve($body);

  } else {
    return rejectWithPlaidError(reject, res);
  }
};

var plaidRequest = function(context, requestSpec, clientRequestOptions, cb) {
  var uri = context.env + requestSpec.path;
  var method = 'POST';
  var requestJSON = R.merge(R.dissoc('env', context), requestSpec.body);
  var headers = {
    'User-Agent': 'Plaid Node v' + pjson.version
  };

  if (clientRequestOptions.version != null) {
    headers['Plaid-Version'] = clientRequestOptions.version;
  }

  if (clientRequestOptions.clientApp != null) {
    headers['Plaid-Client-App'] = clientRequestOptions.clientApp;
  }

  // merge the default request options with the client specified options,
  // this allows for clients to supply extra options to the request function
  var requestOptions = R.merge({
    url: uri,
    method: method,
    data: requestJSON,
    headers: headers,
    timeout: DEFAULT_TIMEOUT_IN_MILLIS,
    responseType: requestSpec.binary ? 'arraybuffer' : 'json'
  }, clientRequestOptions);

  return wrapPromise(new Promise(function(resolve, reject) {
    axios(requestOptions)
      .then((res) => {
        handleApiResponse(resolve, reject, res,
          requestSpec.includeMfaResponse);
      })
      .catch((error) => {
        if (error.response) {
          return rejectWithPlaidError(reject, error.response);
        } else {
          return reject(error);
        }
      });
  }), cb);
};

module.exports = plaidRequest;
