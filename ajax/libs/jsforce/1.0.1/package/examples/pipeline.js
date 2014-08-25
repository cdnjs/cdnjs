var fs = require('fs');
var async = require('async');
var sf = require('../lib/salesforce');

var config = {};// { logLevel: "DEBUG" };
var conn = new sf.Connection(config);

var Opportunity = conn.sobject('Opportunity');

async.waterfall([
  function(next) {
    conn.login(process.env.SF_USERNAME, process.env.SF_PASSWORD, next);
  },
  function(sobjects, next) {
    Opportunity.find({ AccountId: { $ne: null }}, { Id: 1, Name: 1, "Account.Name": 1 })
               .pipe(sf.RecordStream.map(function(r) {
                 r.Name = r.Account.Name + ' *** ' + r.Name;
                 return r;
               }))
               .pipe(Opportunity.updateBulk())
               .on('response', function(rets) {
                 next(null, rets);
               })
               .on('error', function(err) {
                 next(err);
               });

  },
  function(rets, next) {
    var success = rets.filter(function(r) { return r.success; }).length;
    var failure = rets.length - success;
    console.log("bulk update sucess = " + success + ", failure = " + failure);
    next();
  },
  function(next) {
    Opportunity.find({ Name : { $like: '% *** %' }}, { Id: 1, Name: 1 })
        .pipe(sf.RecordStream.map(function(r) {
          r.Name = r.Name.replace(/^.+ \*\*\* /g, '');
          return r;
        }))
        .pipe(Opportunity.updateBulk())
        .on('response', function(rets) {
          next(null, rets);
        })
        .on('error', function(err) {
          next(err);
        });
  },
  function(rets, next) {
    var success = rets.filter(function(r) { return r.success; }).length;
    var failure = rets.length - success;
    console.log("bulk update sucess = " + success + ", failure = " + failure);
    next();
  },
  function(next) {
    Opportunity
      .find({}, { Id: 1, Name: 1, Amount: 1, StageName: 1, CreatedDate: 1 })
      .pipe(sf.RecordStream.filter(function(r) {
        return r.Amount > 500000;
      }))
      .stream().pipe(fs.createWriteStream("opps.csv"))
      .on('end', function() { next(); })
      .on('error', function(err) { next(err); });
  }
], function(err, res) {
  if (err) {
    console.error(err);
  } 
});
