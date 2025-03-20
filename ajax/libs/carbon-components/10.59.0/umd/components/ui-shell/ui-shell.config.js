(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.uiShellConfig = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function () {
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var _require = require('../../globals/js/settings'),
      prefix = _require.prefix;

  var navigationMenu = {
    state: {
      expanded: false
    },
    sections: [{
      items: [{
        type: 'link',
        title: 'Item link',
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        // href: '/component/ui-shell--platform-navigation-expanded',
        hasIcon: true
      }, {
        type: 'link',
        title: 'Item link',
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        // href: '/component/ui-shell--platform-navigation-expanded',
        hasIcon: true
      }]
    }, {
      items: [{
        type: 'link',
        title: 'Item link',
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        // href: '/component/ui-shell--platform-navigation-expanded',
        hasIcon: true,
        active: true
      }, {
        type: 'link',
        title: 'Item link',
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        // href: '/component/ui-shell--platform-navigation-expanded',
        hasIcon: true
      }, {
        type: 'link',
        title: 'Item link',
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        // href: '/component/ui-shell--platform-navigation-expanded',
        hasIcon: true
      }, {
        type: 'category',
        title: 'L1 category',
        hasIcon: true,
        links: [{
          title: 'Nested link',
          href: 'javascript:void(0)' // eslint-disable-line no-script-url
          // href: '/component/ui-shell--platform-navigation-expanded',

        }, {
          title: 'Nested link',
          href: 'javascript:void(0)',
          // eslint-disable-line no-script-url
          // href: '/component/ui-shell--platform-navigation-expanded',
          active: true
        }, {
          title: 'Nested link',
          href: 'javascript:void(0)' // eslint-disable-line no-script-url
          // href: '/component/ui-shell--platform-navigation-expanded',

        }]
      }]
    }],
    idSuffix: Math.random().toString(36).substr(2)
  };
  var switcher = {
    state: {
      expanded: false,
      showAll: false
    },
    links: [{
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'My Product'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'My Product 2'
    }],
    allLinks: [{
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'All Products'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'All Products'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'All Products'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'All Products'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'All Products'
    }],
    idSuffix: Math.random().toString(36).substr(2)
  };
  var header = {
    company: 'IBM',
    platform: '[Platform]',
    links: [{
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'L1 link 1'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'L1 link 2'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'L1 link 3'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'L1 link 4'
    }],
    actions: [{
      title: 'Action 1',
      switcher: switcher
    }, {
      title: 'Action 2',
      switcher: switcher
    }, {
      title: 'Action 3',
      switcher: switcher
    }, {
      title: 'Action 4',
      switcher: switcher
    }],
    navLinks: [{
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'L1 link 1'
    }, {
      href: 'javascript:void(0)',
      // eslint-disable-line no-script-url
      title: 'L1 link 2'
    }, {
      title: 'L1 link 3',
      state: {
        expanded: true
      },
      items: [{
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        title: 'Link 1'
      }, {
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        title: 'Link 2'
      }, {
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        title: 'Ipsum architecto voluptatem'
      }]
    }, {
      title: 'L1 link 4',
      state: {
        expanded: false
      },
      items: [{
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        title: 'Link 1'
      }, {
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        title: 'Link 2'
      }, {
        href: 'javascript:void(0)',
        // eslint-disable-line no-script-url
        title: 'Ipsum architecto voluptatem'
      }]
    }]
  };

  function createSidebarLinks(count, activeIndex) {
    return Array.from({
      length: count
    }, function (_, i) {
      var link = {
        title: 'Nested link',
        href: 'javascript:void(0)' // eslint-disable-line no-script-url

      };

      if (i === activeIndex) {
        link.active = true;
      }

      return link;
    });
  }

  var sidenav = {
    state: {
      expanded: false,
      hasIcons: false,
      fixed: false
    },
    title: {
      text: '[L1 name here]'
    },
    links: [{
      category: 'Category label',
      links: createSidebarLinks(2)
    }, {
      category: 'Category label',
      links: createSidebarLinks(3, 1),
      active: true
    }, {
      category: 'Category label',
      links: createSidebarLinks(4)
    }]
  };
  module.exports = {
    preview: 'ui-shell-preview',
    meta: {
      linkOnly: true
    },
    context: {
      prefix: prefix,
      header: header,
      navigationMenu: navigationMenu,
      sidenav: sidenav,
      switcher: switcher,
      content: Array.from({
        length: 10
      })
    },
    variants: [{
      name: 'Side-nav fixed',
      context: {
        sidenav: {
          state: {
            hasIcons: false,
            expanded: true,
            fixed: true
          }
        }
      }
    }, {
      name: 'Navigation with no icons',
      context: {
        navigationMenu: {
          state: {
            expanded: true,
            category: true
          },
          sections: navigationMenu.sections.map(function (section) {
            return {
              items: section.items.map(function (item) {
                return _objectSpread(_objectSpread({}, item), {}, {
                  hasIcon: false
                });
              })
            };
          }),
          idSuffix: Math.random().toString(36).substr(2)
        }
      }
    }]
  };
});