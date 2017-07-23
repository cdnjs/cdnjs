//
// Pending approvals listing object
// Lists pending approvals and get pending approval objects
//
// Copyright 2015, BitGo, Inc.  All Rights Reserved.
//

var common = require('./common');
var Util = require('./util');
var PendingApproval = require('./pendingapproval');

//
// Constructor
//
var PendingApprovals = function(bitgo) {
  this.bitgo = bitgo;
};

//
// list
// List the pending approvals available to the user
//
PendingApprovals.prototype.list = function(params, callback) {
  params = params || {};
  common.validateParams(params, [], ['walletId', 'enterpriseId'], callback);

  var args = [];
  var queryParams = {};
  if (typeof(params.walletId) == 'string') {
    queryParams.walletId = params.walletId;
  }
  if (typeof(params.enterpriseId) == 'string') {
    queryParams.enterprise = params.enterpriseId;
  }

  if (Object.keys(queryParams).length !== 1) {
    throw new Error('must provide exactly 1 of walletId or enterpriseId to get pending approvals on');
  }

  var self = this;
  return this.bitgo.get(this.bitgo.url('/pendingapprovals'))
  .query(queryParams)
  .result()
  .then(function(body) {
    body.pendingApprovals = body.pendingApprovals.map(function(p) { return new PendingApproval(self.bitgo, p); });
    return body;
  })
  .nodeify(callback);
};

//
// get
// Fetch an existing pending approval
// Parameters include:
//   id:  the pending approval id
//
PendingApprovals.prototype.get = function(params, callback) {
  params = params || {};
  common.validateParams(params, ['id'], [], callback);

  var self = this;
  return this.bitgo.get(this.bitgo.url('/pendingapprovals/' + params.id))
  .result()
  .then(function(body) {
    return new PendingApproval(self.bitgo, body);
  })
  .nodeify(callback);
};

module.exports = PendingApprovals;
