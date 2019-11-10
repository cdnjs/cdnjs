/*
 * Mailcheck https://github.com/Kicksend/mailcheck
 * Author
 * Derrick Ko (@derrickko)
 *
 * License
 * Copyright (c) 2012 Receivd, Inc.
 *
 * Licensed under the MIT License.
 *
 * v 1.1
 */

var Kicksend = {
  mailcheck : {
    threshold: 3,

    defaultDomains: ["yahoo.com", "google.com", "hotmail.com", "gmail.com", "me.com", "aol.com", "mac.com",
      "live.com", "comcast.net", "googlemail.com", "msn.com", "hotmail.co.uk", "yahoo.co.uk",
      "facebook.com", "verizon.net", "sbcglobal.net", "att.net", "gmx.com", "mail.com", "outlook.com", "icloud.com"],

    defaultTopLevelDomains: ["co.jp", "co.uk", "com", "net", "org", "info", "edu", "gov", "mil", "ca"],

    run: function(opts) {
      opts.domains = opts.domains || Kicksend.mailcheck.defaultDomains;
      opts.topLevelDomains = opts.topLevelDomains || Kicksend.mailcheck.defaultTopLevelDomains;
      opts.distanceFunction = opts.distanceFunction || Kicksend.sift3Distance;

      var defaultCallback = function(result){ return result }
      var suggestedCallback = opts.suggested || defaultCallback
      var emptyCallback = opts.empty || defaultCallback

      var result = Kicksend.mailcheck.suggest(encodeURI(opts.email), opts.domains, opts.topLevelDomains, opts.distanceFunction);

      return result ? suggestedCallback(result) : emptyCallback()
    },

    suggest: function(email, domains, topLevelDomains, distanceFunction) {
      email = email.toLowerCase();

      var emailParts = this.splitEmail(email);

      var closestDomain = this.findClosestDomain(emailParts.domain, domains, distanceFunction);

      if (closestDomain) {
        if (closestDomain != emailParts.domain) {
          // The email address closely matches one of the supplied domains; return a suggestion
          return { address: emailParts.address, domain: closestDomain, full: emailParts.address + "@" + closestDomain };
        }
      } else {
        // The email address does not closely match one of the supplied domains
        var closestTopLevelDomain = this.findClosestDomain(emailParts.topLevelDomain, topLevelDomains);
        if (emailParts.domain && closestTopLevelDomain && closestTopLevelDomain != emailParts.topLevelDomain) {
          // The email address may have a mispelled top-level domain; return a suggestion
          var domain = emailParts.domain;
          closestDomain = domain.substring(0, domain.lastIndexOf(emailParts.topLevelDomain)) + closestTopLevelDomain;
          return { address: emailParts.address, domain: closestDomain, full: emailParts.address + "@" + closestDomain };
        }
      }
      /* The email address exactly matches one of the supplied domains, does not closely
       * match any domain and does not appear to simply have a mispelled top-level domain,
       * or is an invalid email address; do not return a suggestion.
       */
      return false;
    },

    findClosestDomain: function(domain, domains, distanceFunction) {
      var dist;
      var minDist = 99;
      var closestDomain = null;

      if (!domain || !domains) {
        return false;
      }
      if(!distanceFunction) {
        distanceFunction = this.sift3Distance;
      }

      for (var i = 0; i < domains.length; i++) {
        if (domain === domains[i]) {
          return domain;
        }
        dist = distanceFunction(domain, domains[i]);
        if (dist < minDist) {
          minDist = dist;
          closestDomain = domains[i];
        }
      }

      if (minDist <= this.threshold && closestDomain !== null) {
        return closestDomain;
      } else {
        return false;
      }
    },

    sift3Distance: function(s1, s2) {
      // sift3: http://siderite.blogspot.com/2007/04/super-fast-and-accurate-string-distance.html
      if (s1 == null || s1.length === 0) {
        if (s2 == null || s2.length === 0) {
          return 0;
        } else {
          return s2.length;
        }
      }

      if (s2 == null || s2.length === 0) {
        return s1.length;
      }

      var c = 0;
      var offset1 = 0;
      var offset2 = 0;
      var lcs = 0;
      var maxOffset = 5;

      while ((c + offset1 < s1.length) && (c + offset2 < s2.length)) {
        if (s1.charAt(c + offset1) == s2.charAt(c + offset2)) {
          lcs++;
        } else {
          offset1 = 0;
          offset2 = 0;
          for (var i = 0; i < maxOffset; i++) {
            if ((c + i < s1.length) && (s1.charAt(c + i) == s2.charAt(c))) {
              offset1 = i;
              break;
            }
            if ((c + i < s2.length) && (s1.charAt(c) == s2.charAt(c + i))) {
              offset2 = i;
              break;
            }
          }
        }
        c++;
      }
      return (s1.length + s2.length) /2 - lcs;
    },

    splitEmail: function(email) {
      var parts = email.split('@');

      if (parts.length < 2) {
        return false;
      }

      for (var i = 0; i < parts.length; i++) {
        if (parts[i] === '') {
          return false;
        }
      }

      var domain = parts.pop();
      var domainParts = domain.split('.');
      var tld = '';

      if (domainParts.length == 0) {
        // The address does not have a top-level domain
        return false;
      } else if (domainParts.length == 1) {
        // The address has only a top-level domain (valid under RFC)
        tld = domainParts[0];
      } else {
        // The address has a domain and a top-level domain
        for (var i = 1; i < domainParts.length; i++) {
          tld += domainParts[i] + '.';
        }
        if (domainParts.length >= 2) {
          tld = tld.substring(0, tld.length - 1);
        }
      }

      return {
        topLevelDomain: tld,
        domain: domain,
        address: parts.join('@')
      }
    }
  }
};

// Export the mailcheck object if we're in a CommonJS env (e.g. Node).
// Modeled off of Underscore.js.
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Kicksend.mailcheck;
}

if (typeof window !== 'undefined' && window.jQuery) {
  (function($){
    $.fn.mailcheck = function(opts) {
      var self = this;
      if (opts.suggested) {
        var oldSuggested = opts.suggested;
        opts.suggested = function(result) {
          oldSuggested(self, result);
        };
      }

      if (opts.empty) {
        var oldEmpty = opts.empty;
        opts.empty = function() {
          oldEmpty.call(null, self);
        };
      }

      opts.email = this.val();
      Kicksend.mailcheck.run(opts);
    }
  })(jQuery);
}
