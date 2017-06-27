/*!
  Knockout paged extender v0.1.0
  By: Erik Schierboom (C) 2015
  License: Apache 2

  Adds the paged extender that can add paging functionality to an
  observable array.
*/
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['knockout'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('knockout'));
  } else {
    root.KnockoutElse = factory(root.ko);
  }
}(this, function (ko) {
// index.js
// --------
// paged extender. 
// --------
"use strict";

// Utilities
function isObservableArray(value) {
  return ko.isObservable(value) && 'push' in value;
}

// This extender adds paging functionality to a Knockout observable array.
// The target must be an observable array, otherwise an error is thrown.
// The options parameter can contain two values: the page number and/or 
// the page size:
// { pageNumber: the current page number, pageSize: the page size }
ko.extenders.paged = function(target, options) {

  if (!isObservableArray(target)) {
    throw new Error('The paged extender can only be applied to observable arrays.');
  }
  
  if (options && options['pageNumber'] < 1) {
    throw new Error('The page number must be greater than zero.');
  }
  
  if (options && options['pageSize'] < 1) {
    throw new Error('The page size must be greater than zero.');
  }  

  target.pageNumber = ko.observable(options && options['pageNumber'] || 1);
  target.pageSize = ko.observable(options && options['pageSize'] || 50);

  target.pageItems = ko.pureComputed(function() {
    return target().slice(target.firstItemOnPage() - 1, target.lastItemOnPage());
  });

  target.pageCount = ko.pureComputed(function() {
    if (target.itemCount() <= 0) {
        return 1;
    }

    return Math.ceil(target.itemCount() / target.pageSize());
  });

  target.itemCount = ko.pureComputed(function() {
    return target().length;
  });

  target.firstItemOnPage = ko.pureComputed(function() {
    return (target.pageNumber() - 1) * target.pageSize() + 1;
  });

  target.lastItemOnPage = ko.pureComputed(function() {
    if (target.itemCount() == 0) {
      return 1;
    }
  
    return Math.min(target.pageNumber() * target.pageSize(), target.itemCount());
  });

  target.hasPreviousPage = ko.pureComputed(function() {
    return !target.isFirstPage();
  });

  target.hasNextPage = ko.pureComputed(function() {
    return !target.isLastPage();
  });

  target.isFirstPage = ko.pureComputed(function() {
    return target.pageNumber() == 1;
  });

  target.isLastPage = ko.pureComputed(function() {
    return target.pageNumber() == target.pageCount();  
  });

  target.toNextPage = function() {
    if (target.hasNextPage()) {
      target.pageNumber(target.pageNumber() + 1);
    }
  };

  target.toPreviousPage = function() {
    if (target.hasPreviousPage()) {
      target.pageNumber(target.pageNumber() - 1);
    }
  };
  
  target.toFirstPage = function() {
    if (!target.isFirstPage()) {
      target.pageNumber(1);
    }
  };
  
  target.toLastPage = function() {
    if (!target.isLastPage()) {
      target.pageNumber(target.pageCount());
    }
  };

  return target;
};}));
