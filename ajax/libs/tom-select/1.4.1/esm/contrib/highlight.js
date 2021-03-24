/**
* Tom Select v1.4.1
* Licensed under the Apache License, Version 2.0 (the "License");
*/

/**
 * highlight v3 | MIT license | Johann Burkard <jb@eaio.com>
 * Highlights arbitrary terms in a node.
 *
 * - Modified by Marshal <beatgates@gmail.com> 2011-6-24 (added regex)
 * - Modified by Brian Reavis <brian@thirdroute.com> 2012-8-27 (cleanup)
 */
function highlight(element, pattern) {
  if (typeof pattern === 'string' && !pattern.length) return;
  var regex = typeof pattern === 'string' ? new RegExp(pattern, 'i') : pattern;

  var highlight = function highlight(node) {
    var skip = 0; // Wrap matching part of text node with highlighting <span>, e.g.
    // Soccer  ->  <span class="highlight">Soc</span>cer  for regex = /soc/i

    if (node.nodeType === 3) {
      var pos = node.data.search(regex);

      if (pos >= 0 && node.data.length > 0) {
        var match = node.data.match(regex);
        var spannode = document.createElement('span');
        spannode.className = 'highlight';
        var middlebit = node.splitText(pos);
        middlebit.splitText(match[0].length);
        var middleclone = middlebit.cloneNode(true);
        spannode.appendChild(middleclone);
        middlebit.parentNode.replaceChild(spannode, middlebit);
        skip = 1;
      }
    } // Recurse element node, looking for child text nodes to highlight, unless element
    // is childless, <script>, <style>, or already highlighted: <span class="hightlight">
    else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== 'highlight' || node.tagName !== 'SPAN')) {
        for (var i = 0; i < node.childNodes.length; ++i) {
          i += highlight(node.childNodes[i]);
        }
      }

    return skip;
  };

  highlight(element);
}
/**
 * removeHighlight fn copied from highlight v5 and
 * edited to remove with(), pass js strict mode, and use without jquery
 */

function removeHighlight(el) {
  var elements = document.querySelectorAll("span.highlight");
  Array.prototype.forEach.call(elements, function (el, i) {
    var parent = el.parentNode;
    parent.replaceChild(el.firstChild, el);
    parent.normalize();
  });
}

export { highlight, removeHighlight };
//# sourceMappingURL=highlight.js.map
