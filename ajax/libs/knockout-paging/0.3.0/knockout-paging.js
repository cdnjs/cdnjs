/*!
  Knockout paged extender 0.2.3
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

  function createRange(min, max) {
    var list = [];

    for (var i = min; i <= max; i++) {
        list.push(i);
    }

    return list;
  }

  // This page generator just returns a integer for all pages in the pages 
  // observable. For a large number of pages, this soon becomes impractical 
  // and you are better of with the sliding window page generator or your 
  // own, custom one. 
  function DefaultPageGenerator() {
    this.generate = function(pagedObservable) {
      return createRange(1, pagedObservable.pageCount());
    }
  }

  // This page generators presents a sliding window that displays the current
  // page and the windows around it. The default window displays 5 pages, but 
  // you can customize it through by settings the windowSize observable
  function SlidingPageGenerator() {
    var self = this;
    self.windowSize = ko.observable(5);

    self.generate = function(pagedObservable) {
      var leftBasedStartIndex = pagedObservable.pageNumber() - Math.floor(self.windowSize() / 2),
          rightBasedStartIndex = pagedObservable.pageCount() - self.windowSize() + 1,
          startIndex = Math.max(1, Math.min(leftBasedStartIndex, rightBasedStartIndex)),
          stopIndex = Math.min(pagedObservable.pageCount(), startIndex + self.windowSize() - 1);

      return createRange(startIndex, stopIndex);
    }
  }

  // This object contains global paging options as well as page generators.
  //
  // There are two default paging options:
  // ko.paging.defaults.pageNumber: the default page number (1)
  // ko.paging.defaults.pageSize: the default page size (50)
  //
  // The paging generators are stored as followed:
  // ko.paging.generators.default: default page generator that returns all pages
  // ko.paging.generators.sliding: sliding page generator that displays a sliding 
  // window with the current page and the pages around it
  //
  // You can extend the available page generators by simply adding a property to
  // the generators object:
  //
  // // This generator uses a zero-based paged index
  // ko.paging.generators.zeroBased = {
  //   generate: function(pagedObservable) {
  //     return [createRange(0, pagedObservable.pageCount() - 1)];
  //   }
  // }
  //
  // You can then use this custom pager by supplying the name of the custom generator
  // when extending the observable array:
  // target.extend({ paged: { pageGenerator: 'zeroBased' } });
  ko.paging = {
    defaults: {
      pageNumber: 1,
      pageSize: 50
    },
    generators: {
      'default': new DefaultPageGenerator(),
      'sliding': new SlidingPageGenerator()
    }
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
    
    if (options && options['pageGenerator'] !== undefined && ko.paging.generators[options['pageGenerator']] === undefined) {
      throw new Error('The page generator could not be found.');
    }

    target.pageNumber = ko.observable(options && options['pageNumber'] || ko.paging.defaults.pageNumber || 1);
    target.pageSize = ko.observable(options && options['pageSize'] || ko.paging.defaults.pageSize || 50);
    target.pageGenerator = ko.paging.generators[options && options['pageGenerator'] || 'default'];

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

    target.pages = ko.pureComputed(function() {
      return target.pageGenerator.generate(target);
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
  };

  // Add a wrapper function to the main ko object to allow for easier creation of
  // paged observable arrays
  ko.pagedObservableArray = function (initialValue, options) {
    return ko.observableArray(initialValue).extend({ paged: options });    
  };
}));