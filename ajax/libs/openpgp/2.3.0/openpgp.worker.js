(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// GPG4Browsers - An OpenPGP implementation in javascript
// Copyright (C) 2011 Recurity Labs GmbH
//
// This library is free software; you can redistribute it and/or
// modify it under the terms of the GNU Lesser General Public
// License as published by the Free Software Foundation; either
// version 3.0 of the License, or (at your option) any later version.
//
// This library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
// Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public
// License along with this library; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA

/* globals self: true */

self.window = {}; // to make UMD bundles work

importScripts('openpgp.js');
var openpgp = window.openpgp;

var MIN_SIZE_RANDOM_BUFFER = 40000;
var MAX_SIZE_RANDOM_BUFFER = 60000;

openpgp.crypto.random.randomBuffer.init(MAX_SIZE_RANDOM_BUFFER);

self.onmessage = function (event) {
  var msg = event.data || {},
      options = msg.options || {};

  switch (msg.event) {
    case 'configure':
      for (var i in msg.config) {
        openpgp.config[i] = msg.config[i];
      }
      break;

    case 'seed-random':
      if (!(msg.buf instanceof Uint8Array)) {
        msg.buf = new Uint8Array(msg.buf);
      }
      openpgp.crypto.random.randomBuffer.set(msg.buf);
      break;

    default:
      if (typeof openpgp[msg.event] !== 'function') {
        throw new Error('Unknown Worker Event');
      }

      // parse cloned packets
      openpgp[msg.event](openpgp.packet.clone.parseClonedPackets(options, msg.event)).then(function(data) {
        // clone packets (for web worker structured cloning algorithm)
        response({ event:'method-return', data:openpgp.packet.clone.clonePackets(data) });
      }).catch(function(e) {
        response({ event:'method-return', err:e.message });
      });
  }
};

function response(event) {
  if (openpgp.crypto.random.randomBuffer.size < MIN_SIZE_RANDOM_BUFFER) {
    self.postMessage({event: 'request-seed'});
  }
  self.postMessage(event, openpgp.util.getTransferables.call(openpgp.util, event.data));
}
},{}]},{},[1]);
