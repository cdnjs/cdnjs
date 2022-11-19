// src/shim/server/index.ts
import htmlparser2Tokenizer from "htmlparser2/lib/Tokenizer";
import {tw as defaultTW} from "twind";
export * from "twind";
export * from "twind/sheets";
var Tokenizer = htmlparser2Tokenizer.default || htmlparser2Tokenizer;
var noop = () => void 0;
var shim = (markup, options = {}) => {
  const {tw = defaultTW} = typeof options == "function" ? {tw: options} : options;
  let lastAttribName = "";
  let lastChunkStart = 0;
  const chunks = [];
  const tokenizer = new Tokenizer({
    decodeEntities: false,
    xmlMode: false
  }, {
    onattribend: noop,
    onattribdata: (value) => {
      if (lastAttribName == "class") {
        const currentIndex = tokenizer.getAbsoluteIndex();
        const startIndex = currentIndex - value.length;
        const parsedClassNames = tw(value);
        if (parsedClassNames !== value) {
          chunks.push(markup.slice(lastChunkStart, startIndex));
          chunks.push(parsedClassNames);
          lastChunkStart = currentIndex;
        }
      }
      lastAttribName = "";
    },
    onattribname: (name) => {
      lastAttribName = name;
    },
    oncdata: noop,
    onclosetag: noop,
    oncomment: noop,
    ondeclaration: noop,
    onend: noop,
    onerror: noop,
    onopentagend: noop,
    onopentagname: noop,
    onprocessinginstruction: noop,
    onselfclosingtag: noop,
    ontext: noop
  });
  tokenizer.end(markup);
  if (!chunks.length) {
    return markup;
  }
  return chunks.join("") + markup.slice(lastChunkStart || 0, markup.length);
};
export {
  shim
};
//# sourceMappingURL=server.esnext.js.map
