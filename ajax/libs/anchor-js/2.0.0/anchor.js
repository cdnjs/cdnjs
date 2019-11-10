/**
 * AnchorJS - v2.0.0 - 2015-10-31
 * https://github.com/bryanbraun/anchorjs
 * Copyright (c) 2015 Bryan Braun; Licensed MIT
 */

function AnchorJS(options) {
  'use strict';
  var that = this;

  this.options = options || {};

  /**
   * Assigns options to the internal options object, and provides defaults.
   * @param {Object} opts - Options object
   */
  function _applyRemainingDefaultOptions(opts) {
    that.options.icon = that.options.hasOwnProperty('icon') ? opts.icon : '\ue9cb'; // Accepts characters (and also URLs?), like  '#', '¶', '❡', or '§'.
    that.options.visible = that.options.hasOwnProperty('visible') ? opts.visible : 'hover'; // Also accepts 'always'
    that.options.placement = that.options.hasOwnProperty('placement') ? opts.placement : 'right'; // Also accepts 'left'
    that.options.class = that.options.hasOwnProperty('class') ? opts.class : ''; // Accepts any class name.
    // Using Math.floor here will ensure the value is Number-cast and an integer.
    that.options.truncate = that.options.hasOwnProperty('truncate') ? Math.floor(opts.truncate) : 64; // Accepts any value that can be typecast to a number.
  }

  _applyRemainingDefaultOptions(options);

  /**
   * Add anchor links to page elements.
   * @param  {String} selector  A CSS selector for targeting the elements you wish to add anchor links to.
   * @return {this}             The AnchorJS object
   */
  this.add = function(selector) {
    var elements,
        elsWithIds,
        idList,
        elementID,
        i,
        index,
        count,
        tidyText,
        newTidyText,
        readableID,
        anchor;

    // We reapply options here because somebody may have overwritten the default options object when setting options.
    // For example, this overwrites all options but visible:
    //
    // anchors.options = { visible: 'always'; }
    _applyRemainingDefaultOptions(this.options);

    // Provide a sensible default selector, if none is given.
    if (!selector) {
      selector = 'h1, h2, h3, h4, h5, h6';
    } else if (typeof selector !== 'string') {
      throw new Error('The selector provided to AnchorJS was invalid.');
    }

    elements = document.querySelectorAll(selector);
    if (elements.length === 0) {
      return false;
    }

    _addBaselineStyles();

    // We produce a list of existing IDs so we don't generate a duplicate.
    elsWithIds = document.querySelectorAll('[id]');
    idList = [].map.call(elsWithIds, function assign(el) {
      return el.id;
    });

    for (i = 0; i < elements.length; i++) {

      if (elements[i].hasAttribute('id')) {
        elementID = elements[i].getAttribute('id');
      } else {
        tidyText = this.urlify(elements[i].textContent);

        // Compare our generated ID to existing IDs (and increment it if needed)
        // before we add it to the page.
        newTidyText = tidyText;
        count = 0;
        do {
          if (index !== undefined) {
            newTidyText = tidyText + '-' + count;
          }

          // .indexOf is only supported in IE9+.
          index = idList.indexOf(newTidyText);
          count += 1;
        } while (index !== -1);
        index = undefined;
        idList.push(newTidyText);

        // Assign it to our element.
        // Currently the setAttribute element is only supported in IE9 and above.
        elements[i].setAttribute('id', newTidyText);

        elementID = newTidyText;
      }

      readableID = elementID.replace(/-/g, ' ');

      // The following code builds the following DOM structure in a more effiecient (albeit opaque) way.
      // '<a class="anchorjs-link ' + this.options.class + '" href="#' + elementID + '" aria-label="Anchor link for: ' + readableID + '" data-anchorjs-icon="' + this.options.icon + '"></a>';
      anchor = document.createElement('a');
      anchor.className = 'anchorjs-link ' + this.options.class;
      anchor.href = '#' + elementID;
      anchor.setAttribute('aria-label', 'Anchor link for: ' + readableID);
      anchor.setAttribute('data-anchorjs-icon', this.options.icon);

      if (this.options.visible === 'always') {
        anchor.style.opacity = '1';
      }

      if (this.options.icon === '\ue9cb') {
        anchor.style.fontFamily = 'anchorjs-icons';
        anchor.style.fontStyle = 'normal';
        anchor.style.fontVariant = 'normal';
        anchor.style.fontWeight = 'normal';
        anchor.style.lineHeight = 1;

        // We set lineHeight = 1 here because the `anchorjs-icons` font family could otherwise affect the
        // height of the heading. This isn't the case for icons with `placement: left`, so we restore
        // line-height: inherit in that case, ensuring they remain positioned correctly. For more info,
        // see https://github.com/bryanbraun/anchorjs/issues/39.
        if (this.options.placement === 'left') {
          anchor.style.lineHeight = 'inherit';
        }
      }

      if (this.options.placement === 'left') {
        anchor.style.position = 'absolute';
        anchor.style.marginLeft = '-1em';
        anchor.style.paddingRight = '0.5em';
        elements[i].insertBefore(anchor, elements[i].firstChild);
      } else { // if the option provided is `right` (or anything else).
        anchor.style.paddingLeft = '0.375em';
        elements[i].appendChild(anchor);
      }
    }

    return this;
  };

  /**
   * Removes all anchorjs-links from elements targed by the selector.
   * @param  {String} selector  A CSS selector used to target elements containing anchor links.
   * @return {this}             The AnchorJS object
   */
  this.remove = function(selector) {
    var domAnchor,
        elements = document.querySelectorAll(selector);
    for (var i = 0; i < elements.length; i++) {
      domAnchor = elements[i].querySelector('.anchorjs-link');
      if (domAnchor) {
        elements[i].removeChild(domAnchor);
      }
    }
    return this;
  };

  /**
   * Urlify - Refine text so it makes a good ID.
   *
   * To do this, we remove apostrophes, replace nonsafe characters with hyphens,
   * remove extra hyphens, truncate, trim hyphens, and make lowercase.
   *
   * @param  {String} text - Any text. Usually pulled from the webpage element we are linking to.
   * @return {String}      - hyphen-delimited text for use in IDs and URLs.
   */
  this.urlify = function(text) {
    // Regex for finding the nonsafe URL characters (many need escaping): & +$,:;=?@"#{}|^~[`%!']./()*\
    var nonsafeChars = /[& +$,:;=?@"#{}|^~[`%!'\]\.\/\(\)\*\\]/g,
        urlText;

    if (!this.options.truncate) {
      _applyRemainingDefaultOptions(this.options);
    }

    // Note: we trim hyphens after truncating because truncating can cause dangling hyphens.
    // Example string:                                  // " ⚡ Don't forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
    urlText = text.replace(/\'/gi, '')                  // " ⚡ Dont forget: URL fragments should be i18n-friendly, hyphenated, short, and clean."
                  .replace(nonsafeChars, '-')           // "-⚡-Dont-forget--URL-fragments-should-be-i18n-friendly--hyphenated--short--and-clean-"
                  .replace(/-{2,}/g, '-')               // "-⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-short-and-clean-"
                  .substring(0, this.options.truncate)  // "-⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated-"
                  .replace(/^-+|-+$/gm, '')             // "⚡-Dont-forget-URL-fragments-should-be-i18n-friendly-hyphenated"
                  .toLowerCase();                       // "⚡-dont-forget-url-fragments-should-be-i18n-friendly-hyphenated"

    return urlText;
  };

  /**
   * _addBaselineStyles
   * Adds baseline styles to the page, used by all AnchorJS links irregardless of configuration.
   */
  function _addBaselineStyles() {
    // We don't want to add global baseline styles if they've been added before.
    if (document.head.querySelector('style.anchorjs') !== null) {
      return;
    }

    var style = document.createElement('style'),
        linkRule =
        ' .anchorjs-link {'                       +
        '   opacity: 0;'                          +
        '   text-decoration: none;'               +
        '   -webkit-font-smoothing: antialiased;' +
        '   -moz-osx-font-smoothing: grayscale;'  +
        ' }',
        hoverRule =
        ' *:hover > .anchorjs-link,'              +
        ' .anchorjs-link:focus  {'                +
        '   opacity: 1;'                          +
        ' }',
        anchorjsLinkFontFace =
        ' @font-face {'                           +
        '   font-family: "anchorjs-icons";'       +
        '   font-style: normal;'                  +
        '   font-weight: normal;'                 + // Icon from icomoon; 10px wide & 10px tall; 2 empty below & 4 above
        '   src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAALAIAAAwAwT1MvMg8SBTUAAAC8AAAAYGNtYXAWi9QdAAABHAAAAFRnYXNwAAAAEAAAAXAAAAAIZ2x5Zgq29TcAAAF4AAABNGhlYWQEZM3pAAACrAAAADZoaGVhBhUDxgAAAuQAAAAkaG10eASAADEAAAMIAAAAFGxvY2EAKACuAAADHAAAAAxtYXhwAAgAVwAAAygAAAAgbmFtZQ5yJ3cAAANIAAAB2nBvc3QAAwAAAAAFJAAAACAAAwJAAZAABQAAApkCzAAAAI8CmQLMAAAB6wAzAQkAAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAABAAADpywPA/8AAQAPAAEAAAAABAAAAAAAAAAAAAAAgAAAAAAADAAAAAwAAABwAAQADAAAAHAADAAEAAAAcAAQAOAAAAAoACAACAAIAAQAg6cv//f//AAAAAAAg6cv//f//AAH/4xY5AAMAAQAAAAAAAAAAAAAAAQAB//8ADwABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAQAAAAAAAAAAAAIAADc5AQAAAAACADEARAJTAsAAKwBUAAABIiYnJjQ/AT4BMzIWFxYUDwEGIicmND8BNjQnLgEjIgYPAQYUFxYUBw4BIwciJicmND8BNjIXFhQPAQYUFx4BMzI2PwE2NCcmNDc2MhcWFA8BDgEjARQGDAUtLXoWOR8fORYtLTgKGwoKCjgaGg0gEhIgDXoaGgkJBQwHdR85Fi0tOAobCgoKOBoaDSASEiANehoaCQkKGwotLXoWOR8BMwUFLYEuehYXFxYugC44CQkKGwo4GkoaDQ0NDXoaShoKGwoFBe8XFi6ALjgJCQobCjgaShoNDQ0NehpKGgobCgoKLYEuehYXAAEAAAABAACiToc1Xw889QALBAAAAAAA0XnFFgAAAADRecUWAAAAAAJTAsAAAAAIAAIAAAAAAAAAAQAAA8D/wAAABAAAAAAAAlMAAQAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAACAAAAAoAAMQAAAAAACgAUAB4AmgABAAAABQBVAAIAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEADgAAAAEAAAAAAAIABwCfAAEAAAAAAAMADgBLAAEAAAAAAAQADgC0AAEAAAAAAAUACwAqAAEAAAAAAAYADgB1AAEAAAAAAAoAGgDeAAMAAQQJAAEAHAAOAAMAAQQJAAIADgCmAAMAAQQJAAMAHABZAAMAAQQJAAQAHADCAAMAAQQJAAUAFgA1AAMAAQQJAAYAHACDAAMAAQQJAAoANAD4YW5jaG9yanMtaWNvbnMAYQBuAGMAaABvAHIAagBzAC0AaQBjAG8AbgBzVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwYW5jaG9yanMtaWNvbnMAYQBuAGMAaABvAHIAagBzAC0AaQBjAG8AbgBzYW5jaG9yanMtaWNvbnMAYQBuAGMAaABvAHIAagBzAC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQByYW5jaG9yanMtaWNvbnMAYQBuAGMAaABvAHIAagBzAC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format("truetype");' +
        ' }',
        pseudoElContent =
        ' [data-anchorjs-icon]::after {'          +
        '   content: attr(data-anchorjs-icon);'   +
        ' }',
        firstStyleEl;

    style.className = 'anchorjs';
    style.appendChild(document.createTextNode('')); // Necessary for Webkit.

    // We place it in the head with the other style tags, if possible, so as to
    // not look out of place. We insert before the others so these styles can be
    // overridden if necessary.
    firstStyleEl = document.head.querySelector('[rel="stylesheet"], style');
    if (firstStyleEl === undefined) {
      document.head.appendChild(style);
    } else {
      document.head.insertBefore(style, firstStyleEl);
    }

    style.sheet.insertRule(linkRule, style.sheet.cssRules.length);
    style.sheet.insertRule(hoverRule, style.sheet.cssRules.length);
    style.sheet.insertRule(pseudoElContent, style.sheet.cssRules.length);
    style.sheet.insertRule(anchorjsLinkFontFace, style.sheet.cssRules.length);
  }
}

var anchors = new AnchorJS();
