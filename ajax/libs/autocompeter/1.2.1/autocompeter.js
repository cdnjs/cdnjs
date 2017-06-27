/*!
*
* Copyright (c) 2015, Peter Bengtsson
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
*
*/

/*
 * How to use it
 * -------------
 *
 * Load this file and then call it like this:
 *
 *     Autocomplete(document.getElementById('searchthing'));
 *
 * More to come...
 */

;(function(window, document) {
  'use strict';

  /* utility function to create DOM elements */
  function createDomElement(tag, options) {
    var e = document.createElement(tag);
    for (var key in options) {
      e[key] = options[key];
    }
    return e;
  }

  /* utility function to attach event handlers to elements */
  function attachHandler(target, type, handler) {
    if (target.addEventListener) {
      target.addEventListener(type, handler, false);
    } else {
      target.attachEvent(type, handler);
    }
  }

  function extend() {
    var key, object, objects, target, val, i, len, slice = [].slice;
    target = arguments[0];
    objects = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    for (i = 0, len = objects.length; i < len; i++) {
      object = objects[i];
      for (key in object) {
        val = object[key];
        target[key] = val;
      }
    }
    return target;
  }

  function setUp(q, options) {
    options = extend({
      url: 'https://autocompeter.com/v1',
      domain: location.host,
      groups: null,
      ping: true,
    }, options || {});

    options.url += options.url.indexOf('?') > -1 ? '&' : '?';
    if (options.number) {
      options.url += 'n=' + options.number + '&';
    }
    if (options.groups) {
      if (Array.isArray(options.groups)) {
        options.groups = options.groups.join(',');
      }
      options.url += 'g=' + encodeURIComponent(options.groups) + '&';
    }
    options.url += 'd=' + options.domain + '&q=';

    var results_ps = [];
    var selected_pointer = 0;
    var actually_selected_pointer = false;
    q.spellcheck = false;
    q.autocomplete = 'off';

    // wrap the input
    var wrapper = createDomElement('span', {className: '_ac-wrap'});
    var hint = createDomElement('input', {
      tabindex: -1,
      spellcheck: false,
      autocomplete: 'off',
      readonly: 'readonly',
      type: q.type || 'text',
      className: q.className + ' _ac-hint'
    });

    // The hint is a clone of the original but the original has some
    // requirements of its own.
    q.classList.add('_ac-foreground');
    wrapper.appendChild(hint);
    var clone = q.cloneNode(true);
    wrapper.appendChild(clone);

    var r = createDomElement('div', {className: '_ac-results'});
    attachHandler(r, 'mouseover', mouseoverResults);
    wrapper.appendChild(r);

    q.parentElement.insertBefore(wrapper, q);
    q.parentNode.removeChild(q);
    q = clone;

    function escapeRegExp(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    function highlightText(text) {
      var search_terms = terms.map(escapeRegExp);
      var re = new RegExp('\\b((' + search_terms.join('|') + ')[\\S\']*)', 'gi');
      return text.replace(re, '<b>$1</b>');
    }

    function mouseoverResults(e) {
      if (e.target.tagName === 'P') {
        if (selected_pointer !== +e.target.dataset.i) {
          selected_pointer = +e.target.dataset.i;
          displayResults();
        }
      }
    }

    function filterResults(results, terms) {
      // Return a new array where all results are matched
      // on all of the terms.
      var new_results = [];
      var search_terms = terms.map(escapeRegExp);
      var re = new RegExp('\\b(' + search_terms.join('|') + ')', 'gi');
      for (var i=0, len=results.length; i < len; i++) {
        if (results[i][1].search(re) > -1) {
          new_results.push(results[i]);
        }
      }
      return new_results;
    }

    var results = null;
    var preAjaxDisplayTimer = null;
    var terms;

    function displayResults(preAjax) {
      preAjax = preAjax || false;
      if (!preAjax && preAjaxDisplayTimer) {
        // This function has been called because we have new results.
        // If we had started a whilst-waiting-for-ajax filtering based
        // on what little we have, then we can now kill that effort.
        window.clearTimeout(preAjaxDisplayTimer);
      }
      var i, len;
      if (results === null) return;
      if (preAjax) {
        // filter the results with the new terms manually
        results = filterResults(results, terms);
      }
      if (results.length) {
        r.style.display = 'block';
        var ps = r.getElementsByTagName('p');
        for (i=ps.length - 1; i >= 0; i--) {
          ps[i].remove();
        }
      } else {
        r.style.display = 'none';
        return;
      }
      results_ps = [];
      var p, a;
      var hint_candidate = null;
      var hint_candidates = [];
      if (!results.length) {
        // If there are no results for the current query, we make
        // sure the is no hint underneath that you can tab-complete
        // because since there are no results, there's no point
        // tab completing.
        hint.value = '';
      }

      var search_terms = terms.map(escapeRegExp);
      var re = new RegExp('\\b(' + search_terms.join('|') + ')(\\w+)\\b', 'gi');

      // Because `r` is a DOM element that has already been inserted into
      // the DOM we collect all the `<p>` tags into a Document Fragment
      // and add the whole thing later into the `r` element.
      var p_fragments = document.createDocumentFragment();
      for (i=0, len=results.length; i < len; i++) {
        var found;
        var matched;

        while ((found = re.exec(results[i][1])) !== null) {
          matched = new RegExp('\\b' + escapeRegExp(found[0]) + '\\b', 'gi');

          hint_candidate = found[found.length - 1];
          if (hint_candidate !== undefined && !matched.test(q.value))  {

            if (selected_pointer === i) {
              hint_candidates.push(hint_candidate);
            }
          }
        }

        p = createDomElement('p');
        if (i === selected_pointer && actually_selected_pointer) {
          p.classList.add('selected');
        }
        p.dataset.i = i;  // needed by the onmouseover event handler

        a = createDomElement('a', {
          innerHTML: highlightText(results[i][1]),
          href: results[i][0]
        });
        p.appendChild(a);
        p_fragments.appendChild(p);
        results_ps.push(p);
      }
      r.appendChild(p_fragments);
      if (hint_candidates.length && q.value.charAt(q.value.length - 1) !== ' ') {
        hint_candidate = hint_candidates[selected_pointer % hint_candidates.length];
        hint.value = q.value + hint_candidate;
      } else {
        // If there are no candidates there's no point putting the
        // hint value to be anything.
        // Also, this solves the problem that if the q.value is so long
        // that it's typing exceeds the input box, the text alignment
        // (assuming the caret is on the right) becomes right aligned.
        hint.value = '';
      }
    }

    function findParentForm(element) {
      var parent = element.parentNode;
      if (parent === null) {
        console.warn("Form can not be found. Nothing to submit");
        return;
      }
      if (parent.nodeName === 'FORM') {
        return parent;
      }
      return findParentForm(parent);
    }

    function handleKeyboardEvent(name) {
      var i, len;
      if (name === 'tab') {
        if (hint.value !== q.value) {
          q.value = hint.value + ' ';
        }
        if (q.value !== hint.value) {
          handler();  // this starts a new ajax request
        }
        actually_selected_pointer = true;
      } else if (name === 'down' || name === 'up') {
        if (name === 'down') {
          selected_pointer = Math.min(results_ps.length - 1, ++selected_pointer);
        } else if (name === 'up') {
          selected_pointer = Math.max(0, --selected_pointer);
        }
        for (i=0, len=results_ps.length; i < len; i++) {
          if (i === selected_pointer && actually_selected_pointer) {
            results_ps[i].classList.add('selected');
          } else {
            results_ps[i].classList.remove('selected');
          }
        }
        actually_selected_pointer = true;
        displayResults();
      } else if (name === 'enter') {
        if (results_ps.length && actually_selected_pointer) {
          var p = results_ps[selected_pointer];
          var a = p.getElementsByTagName('a')[0];
          q.value = hint.value = a.textContent;
          r.style.display = 'none';
          window.location = a.href;
        } else {
          // We need to submit the form but we can't simply `return true`
          // because the event we're returning to isn't a form submission.
          var form = findParentForm(q);
          if (form) {
            form.submit();
          }
          return true;
        }
      } else if (name === 'esc') {
        r.style.display = 'none';
      }
      return false;
    }

    function handleKeyEvent(e) {
      var relevant_keycodes = {
        13: 'enter',
        9: 'tab',
        38: 'up',
        40: 'down',
        27: 'esc'
      };
      if (!relevant_keycodes[e.keyCode]) return false;
      e.preventDefault();
      return handleKeyboardEvent(relevant_keycodes[e.keyCode]);
    }

    function handleAjaxError() {
      r.style.display = 'none';
    }

    var cache = {};
    var req;
    var req_value;

    function handler() {
      if (!q.value.trim()) {
        hint.value = '';
        r.style.display = 'none';
        return;
      } else if (hint.value.length) {
        // perhaps the hint.value no longer is applicable, in that case
        // unset the hint.value
        if (hint.value.indexOf(q.value.trim()) === -1) {
          hint.value = q.value;
        }
        if (r.style.display === 'block') {
          // display the results again because the displays are shown
          // but the typed value is not visible
          terms = q.value.trim().split(/\s+/);
          preAjaxDisplayTimer = window.setTimeout(function() {
            // now display results PRE-ajax
            displayResults(true);
          }, 150);

        }
      }
      // New character, let's reset the selected_pointer
      selected_pointer = 0;
      // Also, reset that none of the results have been explicitly
      // selected yet.
      actually_selected_pointer = false;
      if (cache[q.value.trim()]) {
        var response = cache[q.value.trim()];
        terms = response.terms;
        results = response.results;
        displayResults();
      } else {
        if (req) {
          req.abort();
        }
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
            req = new window.XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE 8 and older
            req = new window.ActiveXObject("Microsoft.XMLHTTP");
        } else {
          return;
        }

        if (q.value.trim().length) {
          // Suppose you have typed in "Pytho", then your
          // previously typed in search is likely to be "Pyth".
          // I.e. the same minus the last character.
          // If that search is in the cache and had 0 results, then
          // there's no point also searching for "Pytho"
          var previous_value = q.value.trim().substring(
            0, q.value.trim().length - 1
          );
          if (cache[previous_value] && !cache[previous_value].results.length) {
            // don't bother sending this search then
            cache[q.value.trim()] = {results: []};
            return;
          }
        }

        req.onreadystatechange = function() {
          if (req.readyState === 4) {
            if (req.status === 200) {
              if (req_value === q.value) {
                var response = JSON.parse(req.responseText);
                cache[q.value.trim()] = response;
                terms = response.terms;
                results = response.results;
                displayResults();
              }
            } else {
              // if the req.status is 0, it's because the request was aborted
              if (req.status !== 0) {
                console.warn(req.status, req.responseText);
                handleAjaxError();
              }

            }
          }
        };
        req.open('GET', options.url + encodeURIComponent(q.value.trim()), true);
        req_value = q.value;
        req.send();
      }
    }

    function handleBlur(event) {
      hint.value = q.value;
      // Necessary so it becomes possible to click the links before they
      // disappear too quickly.
      setTimeout(function() {
        r.style.display = 'none';
      }, 200);
      event.preventDefault();
    }

    // Used to know the search widget has been focused once and only once.
    var firstFocus = true;

    function handleFocus() {
      if (firstFocus) {
        // The input field is focussed for the first time in this
        // session. That gives us an optimization opportunity to
        // warm up with a quick and simply little ping.
        if (options.ping && window.XMLHttpRequest) {
          // For the really web performance conscientious implementors,
          // you can make it send a ping by AJAX first. This will pre-emptively
          // do a DNS look up and cert checking so that that's taken care of
          // when you later do the actual AJAX.
          var ping = new window.XMLHttpRequest();
          ping.open('GET', options.url.split('?')[0] + '/ping');
          ping.send();
          firstFocus = false;
        }
      }
      if (q.value.length && results_ps.length) {
        r.style.display = 'block';
      }
    }

    attachHandler(q, 'input', handler);
    attachHandler(q, 'keydown', handleKeyEvent);
    attachHandler(q, 'blur', handleBlur);
    attachHandler(q, 'focus', handleFocus);

  }  // end of setUp

  window.Autocompeter = setUp;

})(window, document);
