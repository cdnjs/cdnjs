import "d3";
import { l as log } from "./commonDb-573409be.js";
import { d as decodeEntities } from "./mermaidAPI-3ae0f2f0.js";
import SimpleMarkdown from "@khanacademy/simple-markdown";
function preprocessMarkdown(markdown) {
  const withoutMultipleNewlines = markdown.replace(/\n{2,}/g, "\n");
  const withoutExtraSpaces = withoutMultipleNewlines.replace(/^\s+/gm, "");
  return withoutExtraSpaces;
}
function markdownToLines(markdown) {
  const preprocessedMarkdown = preprocessMarkdown(markdown);
  const mdParse = SimpleMarkdown.defaultBlockParse;
  const syntaxTree = mdParse(preprocessedMarkdown);
  let lines = [[]];
  let currentLine = 0;
  function processNode(node, parentType) {
    if (node.type === "text") {
      const textLines = node.content.split("\n");
      textLines.forEach((textLine, index) => {
        if (index !== 0) {
          currentLine++;
          lines.push([]);
        }
        textLine.split(" ").forEach((word) => {
          if (word) {
            lines[currentLine].push({ content: word, type: parentType || "normal" });
          }
        });
      });
    } else if (node.type === "strong" || node.type === "em") {
      node.content.forEach((contentNode) => {
        processNode(contentNode, node.type);
      });
    }
  }
  syntaxTree.forEach((treeNode) => {
    if (treeNode.type === "paragraph") {
      treeNode.content.forEach((contentNode) => {
        processNode(contentNode);
      });
    }
  });
  return lines;
}
function markdownToHTML(markdown) {
  const mdParse = SimpleMarkdown.defaultBlockParse;
  const syntaxTree = mdParse(markdown);
  function output(node) {
    if (node.type === "text") {
      return node.content.replace(/\n/g, "<br/>");
    } else if (node.type === "strong") {
      return `<strong>${node.content.map(output).join("")}</strong>`;
    } else if (node.type === "em") {
      return `<em>${node.content.map(output).join("")}</em>`;
    } else if (node.type === "paragraph") {
      return `<p>${node.content.map(output).join("")}</p>`;
    } else {
      return "";
    }
  }
  return syntaxTree.map(output).join("");
}
function applyStyle(dom, styleFn) {
  if (styleFn) {
    dom.attr("style", styleFn);
  }
}
function addHtmlSpan(element, node, width, classes) {
  const fo = element.append("foreignObject");
  const div = fo.append("xhtml:div");
  const label = node.label;
  const labelClass = node.isNode ? "nodeLabel" : "edgeLabel";
  div.html(
    `<span class="${labelClass} ${classes}" ` + (node.labelStyle ? 'style="' + node.labelStyle + '"' : "") + ">" + label + "</span>"
  );
  applyStyle(div, node.labelStyle);
  div.style("display", "table-cell");
  div.style("white-space", "nowrap");
  div.style("max-width", width + "px");
  div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  let bbox = div.node().getBoundingClientRect();
  if (bbox.width === width) {
    div.style("display", "table");
    div.style("white-space", "break-spaces");
    div.style("width", width + "px");
    bbox = div.node().getBoundingClientRect();
  }
  fo.style("width", bbox.width);
  fo.style("height", bbox.height);
  return fo.node();
}
function createTspan(textElement, lineIndex, lineHeight) {
  return textElement.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", lineIndex * lineHeight - 0.1 + "em").attr("dy", lineHeight + "em");
}
function createFormattedText(width, g, structuredText, addBackground = false) {
  const lineHeight = 1.1;
  const labelGroup = g.append("g");
  let bkg = labelGroup.insert("rect").attr("class", "background");
  const textElement = labelGroup.append("text").attr("y", "-10.1");
  let lineIndex = -1;
  structuredText.forEach((line) => {
    lineIndex++;
    let tspan = createTspan(textElement, lineIndex, lineHeight);
    let words = [...line].reverse();
    let currentWord;
    let wrappedLine = [];
    while (words.length) {
      currentWord = words.pop();
      wrappedLine.push(currentWord);
      updateTextContentAndStyles(tspan, wrappedLine);
      if (tspan.node().getComputedTextLength() > width) {
        wrappedLine.pop();
        words.push(currentWord);
        updateTextContentAndStyles(tspan, wrappedLine);
        wrappedLine = [];
        lineIndex++;
        tspan = createTspan(textElement, lineIndex, lineHeight);
      }
    }
  });
  if (addBackground) {
    const bbox = textElement.node().getBBox();
    const padding = 2;
    bkg.attr("x", -padding).attr("y", -padding).attr("width", bbox.width + 2 * padding).attr("height", bbox.height + 2 * padding);
    return labelGroup.node();
  } else {
    return textElement.node();
  }
}
function updateTextContentAndStyles(tspan, wrappedLine) {
  tspan.text("");
  wrappedLine.forEach((word, index) => {
    const innerTspan = tspan.append("tspan").attr("font-style", word.type === "em" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", word.type === "strong" ? "bold" : "normal");
    if (index === 0) {
      innerTspan.text(word.content);
    } else {
      innerTspan.text(" " + word.content);
    }
  });
}
const createText = (el, text = "", {
  style = "",
  isTitle = false,
  classes = "",
  useHtmlLabels = true,
  isNode = true,
  width,
  addSvgBackground = false
} = {}) => {
  log.info("createText", text, style, isTitle, classes, useHtmlLabels, isNode, addSvgBackground);
  if (useHtmlLabels) {
    const htmlText = markdownToHTML(text);
    const node = {
      isNode,
      label: decodeEntities(htmlText).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (s) => `<i class='${s.replace(":", " ")}'></i>`
      ),
      labelStyle: style.replace("fill:", "color:")
    };
    let vertexNode = addHtmlSpan(el, node, width, classes);
    return vertexNode;
  } else {
    const structuredText = markdownToLines(text);
    const special = ['"', "'", ".", ",", ":", ";", "!", "?", "(", ")", "[", "]", "{", "}"];
    let lastWord;
    structuredText.forEach((line) => {
      line.forEach((word) => {
        if (special.includes(word.content) && lastWord) {
          lastWord.content += word.content;
          word.content = "";
        }
        lastWord = word;
      });
    });
    const svgLabel = createFormattedText(width, el, structuredText, addSvgBackground);
    return svgLabel;
  }
};
export {
  createText as c
};
//# sourceMappingURL=createText-1f5f8f92.js.map
