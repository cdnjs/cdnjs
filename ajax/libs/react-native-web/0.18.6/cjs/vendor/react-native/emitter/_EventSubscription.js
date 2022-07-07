/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

exports.__esModule = true;
exports.default = void 0;

/**
 * EventSubscription represents a subscription to a particular event. It can
 * remove its own subscription.
 */
class _EventSubscription {
  /**
   * @param {EventSubscriptionVendor} subscriber the subscriber that controls
   *   this subscription.
   */
  constructor(subscriber) {
    this.subscriber = subscriber;
  }
  /**
   * Removes this subscription from the subscriber that controls it.
   */


  remove() {
    this.subscriber.removeSubscription(this);
  }

}

var _default = _EventSubscription;
exports.default = _default;
module.exports = exports.default;