/**
 * highlight v3 | MIT license | Johann Burkard <jb@eaio.com>
 * Highlights arbitrary terms in a node.
 *
 * - Modified by Marshal <beatgates@gmail.com> 2011-6-24 (added regex)
 * - Modified by Brian Reavis <brian@thirdroute.com> 2012-8-27 (cleanup)
 */
import { replaceNode } from "../vanilla.js";
export const highlight = (element, regex) => {
    if (regex === null)
        return;
    // convet string to regex
    if (typeof regex === 'string') {
        if (!regex.length)
            return;
        regex = new RegExp(regex, 'i');
    }
    // Wrap matching part of text node with highlighting <span>, e.g.
    // Soccer  ->  <span class="highlight">Soc</span>cer  for regex = /soc/i
    const highlightText = (node) => {
        var match = node.data.match(regex);
        if (match && node.data.length > 0) {
            var spannode = document.createElement('span');
            spannode.className = 'highlight';
            var middlebit = node.splitText(match.index);
            middlebit.splitText(match[0].length);
            var middleclone = middlebit.cloneNode(true);
            spannode.appendChild(middleclone);
            replaceNode(middlebit, spannode);
            return 1;
        }
        return 0;
    };
    // Recurse element node, looking for child text nodes to highlight, unless element
    // is childless, <script>, <style>, or already highlighted: <span class="hightlight">
    const highlightChildren = (node) => {
        if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName) && (node.className !== 'highlight' || node.tagName !== 'SPAN')) {
            Array.from(node.childNodes).forEach(element => {
                highlightRecursive(element);
            });
        }
    };
    const highlightRecursive = (node) => {
        if (node.nodeType === 3) {
            return highlightText(node);
        }
        highlightChildren(node);
        return 0;
    };
    highlightRecursive(element);
};
/**
 * removeHighlight fn copied from highlight v5 and
 * edited to remove with(), pass js strict mode, and use without jquery
 */
export const removeHighlight = (el) => {
    var elements = el.querySelectorAll("span.highlight");
    Array.prototype.forEach.call(elements, function (el) {
        var parent = el.parentNode;
        parent.replaceChild(el.firstChild, el);
        parent.normalize();
    });
};
//# sourceMappingURL=highlight.js.map