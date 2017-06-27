var async = require('async');
var sf = require('../lib/salesforce');

var config = {};// { logLevel: "DEBUG" };
var conn1 = new sf.Connection(config);
var conn2 = new sf.Connection(config);

async.waterfall([
  function(next) {
    async.parallel([
      function(cb) {
        conn1.login(process.env.SF_USERNAME_1, process.env.SF_PASSWORD_1, cb);
      },
      function(cb) {
        conn2.login(process.env.SF_USERNAME_2, process.env.SF_PASSWORD_2, cb);
      }
    ], next);
  },
  function(rets, next) {
    conn2.sobject('Account').count(next);
  },
  function(cnt, next) {
    console.log("Account count in conn2 : " + cnt);
    async.parallel([
      function(cb) {
        conn1.sobject('Account').describe(cb);
      },
      function(cb) {
        conn2.sobject('Account').describe(cb);
      }
    ], next);
  },
  function(sobjects, next) {
    var so1 = sobjects[0], so2 = sobjects[1];
    var fields1 = {};
    so1.fields.forEach(function(f) { fields1[f.name] = 1; });
    var fields2 = {};
    so2.fields.forEach(function(f) {
      if (fields1[f.name] && f.updateable && !f.custom && f.type !== 'reference') {
        fields2[f.name] = 1;
      }
    });

    conn1.sobject('Account').find({}, fields2)
      .pipe(conn2.bulk.load('Account', 'insert'))
      .on('response', function(res) { next(null, res); })
      .on('error', function(err){ next(err); });
  },
  function(rets, next) {
    var success = rets.filter(function(r) { return r.success; }).length;
    var failure = rets.length - success;
    console.log("bulkload sucess = " + success + ", failure = " + failure);
    conn2.sobject('Account').count(next);
  },
  function(cnt, next) {
    console.log("Account count in conn2 : " + cnt);
    conn2.sobject('Account').find({ CreatedDate : sf.Date.TODAY }).exec(next);
  },
  function(records, next) {
    console.log("deleting created records ("+records.length+")");
    conn2.bulk.load('Account', 'delete', records, next);
  },
  function(rets, next) {
    var success = rets.filter(function(r) { return r.success; }).length;
    var failure = rets.length - success;
    console.log("delete sucess = " + success + ", failure = " + failure);
    conn2.sobject('Account').count(next);
  },
  function(cnt, next) {
    console.log("Account count in conn2 : " + cnt);
    next();
  }
], function(err, res) {
  if (err) {
    console.error(err);
  } 
});
