'use strict';

// PlaidError wraps API errors to implement the Error class.
class PlaidError extends Error {
  constructor(body) {
    super(body.error_code);
    this.name = 'PlaidError';

    if (typeof body === 'object') {
      Object.assign(this, body);
    }
  }
}

module.exports = PlaidError;
