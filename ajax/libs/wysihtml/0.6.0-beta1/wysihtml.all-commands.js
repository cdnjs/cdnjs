wysihtml.commands.alignCenterStyle = (function() {
  var nodeOptions = {
    styleProperty: "textAlign",
    styleValue: "center",
    toggle: true
  };
  
  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
})();

wysihtml.commands.alignJustifyStyle = (function() {
  var nodeOptions = {
    styleProperty: "textAlign",
    styleValue: "justify",
    toggle: true
  };

  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
})();

wysihtml.commands.alignLeftStyle = (function() {
  var nodeOptions = {
    styleProperty: "textAlign",
    styleValue: "left",
    toggle: true
  };

  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
})();

wysihtml.commands.alignRightStyle = (function() {
  var nodeOptions = {
    styleProperty: "textAlign",
    styleValue: "right",
    toggle: true
  };

  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
})();

/* Sets text background color by inline styles */
wysihtml.commands.bgColorStyle = (function() {
  return {
    exec: function(composer, command, color) {
      var colorVals  = wysihtml.quirks.styleParser.parseColor("background-color:" + (color.color || color), "background-color"),
          colString;

      if (colorVals) {
        colString = (colorVals[3] === 1 ? "rgb(" + [colorVals[0], colorVals[1], colorVals[2]].join(', ') : "rgba(" + colorVals.join(', ')) + ')';
        wysihtml.commands.formatInline.exec(composer, command, {styleProperty: 'backgroundColor', styleValue: colString});
      }
    },

    state: function(composer, command, color) {
      var colorVals  = color ? wysihtml.quirks.styleParser.parseColor("background-color:" + (color.color || color), "background-color") : null,
          colString;

      if (colorVals) {
        colString = (colorVals[3] === 1 ? "rgb(" + [colorVals[0], colorVals[1], colorVals[2]].join(', ') : "rgba(" + colorVals.join(', ')) + ')';
      }

      return wysihtml.commands.formatInline.state(composer, command, {styleProperty: 'backgroundColor', styleValue: colString});
    },

    remove: function(composer, command) {
      return wysihtml.commands.formatInline.remove(composer, command, {styleProperty: 'backgroundColor'});
    },

    stateValue: function(composer, command, props) {
      var st = this.state(composer, command),
          colorStr,
          val = false;

      if (st && wysihtml.lang.object(st).isArray()) {
        st = st[0];
      }

      if (st) {
        colorStr = st.getAttribute('style');
        if (colorStr) {
          val = wysihtml.quirks.styleParser.parseColor(colorStr, "background-color");
          return wysihtml.quirks.styleParser.unparseColor(val, props);
        }
      }
      return false;
    }
  };
})();

wysihtml.commands.bold = (function() {
  var nodeOptions = {
    nodeName: "B",
    toggle: true
  };
  
  return {
    exec: function(composer, command) {
      wysihtml.commands.formatInline.exec(composer, command, nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatInline.state(composer, command, nodeOptions);
    }
  };
})();

/* Formats block for as a <pre><code class="classname"></code></pre> block
 * Useful in conjuction for sytax highlight utility: highlight.js
 *
 * Usage:
 *
 * editorInstance.composer.commands.exec("formatCode", "language-html");
*/
wysihtml.commands.formatCode = (function() {
  return {
    exec: function(composer, command, classname) {
      var pre = this.state(composer)[0],
          code, range, selectedNodes;

      if (pre) {
        // caret is already within a <pre><code>...</code></pre>
        composer.selection.executeAndRestore(function() {
          code = pre.querySelector("code");
          wysihtml.dom.replaceWithChildNodes(pre);
          if (code) {
            wysihtml.dom.replaceWithChildNodes(code);
          }
        });
      } else {
        // Wrap in <pre><code>...</code></pre>
        range = composer.selection.getRange();
        selectedNodes = range.extractContents();
        pre = composer.doc.createElement("pre");
        code = composer.doc.createElement("code");

        if (classname) {
          code.className = classname;
        }

        pre.appendChild(code);
        code.appendChild(selectedNodes);
        range.insertNode(pre);
        composer.selection.selectNode(pre);
      }
    },

    state: function(composer) {
      var selectedNode = composer.selection.getSelectedNode(), node;
      if (selectedNode && selectedNode.nodeName && selectedNode.nodeName == "PRE"&&
          selectedNode.firstChild && selectedNode.firstChild.nodeName && selectedNode.firstChild.nodeName == "CODE") {
        return [selectedNode];
      } else {
        node = wysihtml.dom.getParentElement(selectedNode, { query: "pre code" });
        return node ? [node.parentNode] : false;
      }
    }
  };
})();

/**
 * Inserts an <img>
 * If selection is already an image link, it removes it
 *
 * @example
 *    // either ...
 *    wysihtml.commands.insertImage.exec(composer, "insertImage", "http://www.google.de/logo.jpg");
 *    // ... or ...
 *    wysihtml.commands.insertImage.exec(composer, "insertImage", { src: "http://www.google.de/logo.jpg", title: "foo" });
 */
wysihtml.commands.insertImage = (function() {
  var NODE_NAME = "IMG";
  return {
    exec: function(composer, command, value) {
      value = typeof(value) === "object" ? value : { src: value };

      var doc     = composer.doc,
          image   = this.state(composer),
          textNode,
          parent;

      // If image is selected and src ie empty, set the caret before it and delete the image
      if (image && !value.src) {
        composer.selection.setBefore(image);
        parent = image.parentNode;
        parent.removeChild(image);

        // and it's parent <a> too if it hasn't got any other relevant child nodes
        wysihtml.dom.removeEmptyTextNodes(parent);
        if (parent.nodeName === "A" && !parent.firstChild) {
          composer.selection.setAfter(parent);
          parent.parentNode.removeChild(parent);
        }

        // firefox and ie sometimes don't remove the image handles, even though the image got removed
        wysihtml.quirks.redraw(composer.element);
        return;
      }

      // If image selected change attributes accordingly
      if (image) {
        for (var key in value) {
          if (value.hasOwnProperty(key)) {
            image.setAttribute(key === "className" ? "class" : key, value[key]);
          }
        }
        return;
      }

      // Otherwise lets create the image
      image = doc.createElement(NODE_NAME);

      for (var i in value) {
        image.setAttribute(i === "className" ? "class" : i, value[i]);
      }

      composer.selection.insertNode(image);
      if (wysihtml.browser.hasProblemsSettingCaretAfterImg()) {
        textNode = doc.createTextNode(wysihtml.INVISIBLE_SPACE);
        composer.selection.insertNode(textNode);
        composer.selection.setAfter(textNode);
      } else {
        composer.selection.setAfter(image);
      }
    },

    state: function(composer) {
      var doc = composer.doc,
          selectedNode,
          text,
          imagesInSelection;

      if (!wysihtml.dom.hasElementWithTagName(doc, NODE_NAME)) {
        return false;
      }

      selectedNode = composer.selection.getSelectedNode();
      if (!selectedNode) {
        return false;
      }

      if (selectedNode.nodeName === NODE_NAME) {
        // This works perfectly in IE
        return selectedNode;
      }

      if (selectedNode.nodeType !== wysihtml.ELEMENT_NODE) {
        return false;
      }

      text = composer.selection.getText();
      text = wysihtml.lang.string(text).trim();
      if (text) {
        return false;
      }

      imagesInSelection = composer.selection.getNodes(wysihtml.ELEMENT_NODE, function(node) {
        return node.nodeName === "IMG";
      });

      if (imagesInSelection.length !== 1) {
        return false;
      }

      return imagesInSelection[0];
    }
  };
})();

wysihtml.commands.fontSize = (function() {
  var REG_EXP = /wysiwyg-font-size-[0-9a-z\-]+/g;

  return {
    exec: function(composer, command, size) {
      wysihtml.commands.formatInline.exec(composer, command, {className: "wysiwyg-font-size-" + size, classRegExp: REG_EXP, toggle: true});
    },

    state: function(composer, command, size) {
      return wysihtml.commands.formatInline.state(composer, command, {className: "wysiwyg-font-size-" + size});
    }
  };
})();

/* Set font size by inline style */
wysihtml.commands.fontSizeStyle = (function() {
  return {
    exec: function(composer, command, size) {
      size = size.size || size;
      if (!(/^\s*$/).test(size)) {
        wysihtml.commands.formatInline.exec(composer, command, {styleProperty: "fontSize", styleValue: size, toggle: false});
      }
    },

    state: function(composer, command, size) {
      return wysihtml.commands.formatInline.state(composer, command, {styleProperty: "fontSize", styleValue: size || undefined});
    },

    remove: function(composer, command) {
      return wysihtml.commands.formatInline.remove(composer, command, {styleProperty: "fontSize"});
    },

    stateValue: function(composer, command) {
      var styleStr,
          st = this.state(composer, command);

      if (st && wysihtml.lang.object(st).isArray()) {
          st = st[0];
      }
      if (st) {
        styleStr = st.getAttribute("style");
        if (styleStr) {
          return wysihtml.quirks.styleParser.parseFontSize(styleStr);
        }
      }
      return false;
    }
  };
})();

wysihtml.commands.foreColor = (function() {
  var REG_EXP = /wysiwyg-color-[0-9a-z]+/g;

  return {
    exec: function(composer, command, color) {
      wysihtml.commands.formatInline.exec(composer, command, {className: "wysiwyg-color-" + color, classRegExp: REG_EXP, toggle: true});
    },

    state: function(composer, command, color) {
      return wysihtml.commands.formatInline.state(composer, command, {className: "wysiwyg-color-" + color});
    }
  };
})();

/* Sets text color by inline styles */
wysihtml.commands.foreColorStyle = (function() {
  return {
    exec: function(composer, command, color) {
      var colorVals, colString;

      if (!color) { return; }

      colorVals = wysihtml.quirks.styleParser.parseColor("color:" + (color.color || color), "color");

      if (colorVals) {
        colString = (colorVals[3] === 1 ? "rgb(" + [colorVals[0], colorVals[1], colorVals[2]].join(", ") : "rgba(" + colorVals.join(', ')) + ')';
        wysihtml.commands.formatInline.exec(composer, command, {styleProperty: "color", styleValue: colString});
      }
    },

    state: function(composer, command, color) {
      var colorVals  = color ? wysihtml.quirks.styleParser.parseColor("color:" + (color.color || color), "color") : null,
          colString;


      if (colorVals) {
        colString = (colorVals[3] === 1 ? "rgb(" + [colorVals[0], colorVals[1], colorVals[2]].join(", ") : "rgba(" + colorVals.join(', ')) + ')';
      }

      return wysihtml.commands.formatInline.state(composer, command, {styleProperty: "color", styleValue: colString});
    },

    remove: function(composer, command) {
      return wysihtml.commands.formatInline.remove(composer, command, {styleProperty: "color"});
    },

    stateValue: function(composer, command, props) {
      var st = this.state(composer, command),
          colorStr,
          val = false;

      if (st && wysihtml.lang.object(st).isArray()) {
        st = st[0];
      }

      if (st) {
        colorStr = st.getAttribute("style");
        if (colorStr) {
          val = wysihtml.quirks.styleParser.parseColor(colorStr, "color");
          return wysihtml.quirks.styleParser.unparseColor(val, props);
        }
      }
      return false;
    }
  };
})();

wysihtml.commands.insertBlockQuote = (function() {
  var nodeOptions = {
    nodeName: "BLOCKQUOTE",
    toggle: true
  };
  
  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
})();

wysihtml.commands.insertHorizontalRule = (function() {
  return {
    exec: function(composer) {
      var node = composer.selection.getSelectedNode(),
          phrasingOnlyParent = wysihtml.dom.getParentElement(node, { query: wysihtml.PERMITTED_PHRASING_CONTENT_ONLY }, null, composer.editableArea),
          elem = document.createElement('hr'),
          range, idx;

      // HR is not allowed into some elements (where only phrasing content is allowed)
      // thus the HR insertion must break out of those https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories
      if (phrasingOnlyParent) {
        composer.selection.splitElementAtCaret(phrasingOnlyParent, elem);
      } else {
        composer.selection.insertNode(elem);
      }

      if (elem.nextSibling) {
        composer.selection.setBefore(elem.nextSibling);
      } else {
        composer.selection.setAfter(elem);
      }
    },
    state: function() {
      return false; // :(
    }
  };
})();

wysihtml.commands.insertOrderedList = (function() {
  return {
    exec: function(composer, command) {
      wysihtml.commands.insertList.exec(composer, command, "OL");
    },

    state: function(composer, command) {
      return wysihtml.commands.insertList.state(composer, command, "OL");
    }
  };
})();

wysihtml.commands.insertUnorderedList = (function() {
  return {
    exec: function(composer, command) {
      wysihtml.commands.insertList.exec(composer, command, "UL");
    },

    state: function(composer, command) {
      return wysihtml.commands.insertList.state(composer, command, "UL");
    }
  };
})();

wysihtml.commands.italic = (function() { 
  var nodeOptions = {
    nodeName: "I",
    toggle: true
  };

  return {
    exec: function(composer, command) {
      wysihtml.commands.formatInline.exec(composer, command, nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatInline.state(composer, command, nodeOptions);
    }
  };

})();

wysihtml.commands.justifyCenter = (function() {
  var nodeOptions = {
    className: "wysiwyg-text-align-center",
    classRegExp: /wysiwyg-text-align-[0-9a-z]+/g,
    toggle: true
  };

  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
  
})();

wysihtml.commands.justifyFull = (function() {
  var nodeOptions = {
    className: "wysiwyg-text-align-justify",
    classRegExp: /wysiwyg-text-align-[0-9a-z]+/g,
    toggle: true
  };

  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
})();

wysihtml.commands.justifyLeft = (function() {
  var nodeOptions = {
    className: "wysiwyg-text-align-left",
    classRegExp: /wysiwyg-text-align-[0-9a-z]+/g,
    toggle: true
  };

  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
})();

wysihtml.commands.justifyRight = (function() {
  var nodeOptions = {
    className: "wysiwyg-text-align-right",
    classRegExp: /wysiwyg-text-align-[0-9a-z]+/g,
    toggle: true
  };

  return {
    exec: function(composer, command) {
      return wysihtml.commands.formatBlock.exec(composer, "formatBlock", nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatBlock.state(composer, "formatBlock", nodeOptions);
    }
  };
})();

wysihtml.commands.subscript = (function() {
  var nodeOptions = {
    nodeName: "SUB",
    toggle: true
  };

  return {
    exec: function(composer, command) {
      wysihtml.commands.formatInline.exec(composer, command, nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatInline.state(composer, command, nodeOptions);
    }
  };

})();

wysihtml.commands.superscript = (function() {
  var nodeOptions = {
    nodeName: "SUP",
    toggle: true
  };

  return {
    exec: function(composer, command) {
      wysihtml.commands.formatInline.exec(composer, command, nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatInline.state(composer, command, nodeOptions);
    }
  };

})();

wysihtml.commands.underline = (function() {
  var nodeOptions = {
    nodeName: "U",
    toggle: true
  };

  return {
    exec: function(composer, command) {
      wysihtml.commands.formatInline.exec(composer, command, nodeOptions);
    },

    state: function(composer, command) {
      return wysihtml.commands.formatInline.state(composer, command, nodeOptions);
    }
  };

})();
