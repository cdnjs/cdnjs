var Util = module.exports;
var Crypto = require('bitcoinjs-lib/src/crypto');
var Scripts = require('bitcoinjs-lib/src/scripts');

Util.bnToByteArrayUnsigned = function(bn) {
  var ba = bn.abs().toByteArray();
  if (ba.length) {
    if (ba[0] == 0) {
      ba = ba.slice(1);
    }
    return ba.map(function (v) {
      return (v < 0) ? v + 256 : v;
    });
  } else {
    // Empty array, nothing to do
    return ba;
  }
}

Util.p2shMultisigOutputScript = function(m, pubKeys) {
  var redeemScript = Scripts.multisigOutput(2, pubKeys);
  var hash = Crypto.ripemd160(Crypto.sha256(redeemScript.toBuffer()));
  return Scripts.scriptHashOutput(hash);
};
