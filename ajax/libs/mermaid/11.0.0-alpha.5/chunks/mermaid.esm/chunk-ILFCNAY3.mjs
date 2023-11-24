import {
  dedent
} from "./chunk-UBK4ATPH.mjs";
import {
  decodeEntities
} from "./chunk-43ZLPYW7.mjs";
import {
  __export,
  __name,
  log
} from "./chunk-T24N4LJA.mjs";

// ../../node_modules/.pnpm/mdast-util-to-string@3.2.0/node_modules/mdast-util-to-string/lib/index.js
var emptyOptions = {};
function toString(value, options) {
  const settings = options || emptyOptions;
  const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
  const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;
  return one(value, includeImageAlt, includeHtml);
}
__name(toString, "toString");
function one(value, includeImageAlt, includeHtml) {
  if (node(value)) {
    if ("value" in value) {
      return value.type === "html" && !includeHtml ? "" : value.value;
    }
    if (includeImageAlt && "alt" in value && value.alt) {
      return value.alt;
    }
    if ("children" in value) {
      return all(value.children, includeImageAlt, includeHtml);
    }
  }
  if (Array.isArray(value)) {
    return all(value, includeImageAlt, includeHtml);
  }
  return "";
}
__name(one, "one");
function all(values, includeImageAlt, includeHtml) {
  const result = [];
  let index2 = -1;
  while (++index2 < values.length) {
    result[index2] = one(values[index2], includeImageAlt, includeHtml);
  }
  return result.join("");
}
__name(all, "all");
function node(value) {
  return Boolean(value && typeof value === "object");
}
__name(node, "node");

// ../../node_modules/.pnpm/micromark-util-chunked@1.1.0/node_modules/micromark-util-chunked/index.js
function splice(list2, start, remove, items) {
  const end = list2.length;
  let chunkStart = 0;
  let parameters;
  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }
  remove = remove > 0 ? remove : 0;
  if (items.length < 1e4) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    list2.splice(...parameters);
  } else {
    if (remove)
      list2.splice(start, remove);
    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 1e4);
      parameters.unshift(start, 0);
      list2.splice(...parameters);
      chunkStart += 1e4;
      start += 1e4;
    }
  }
}
__name(splice, "splice");
function push(list2, items) {
  if (list2.length > 0) {
    splice(list2, list2.length, 0, items);
    return list2;
  }
  return items;
}
__name(push, "push");

// ../../node_modules/.pnpm/micromark-util-combine-extensions@1.1.0/node_modules/micromark-util-combine-extensions/index.js
var hasOwnProperty = {}.hasOwnProperty;
function combineExtensions(extensions) {
  const all2 = {};
  let index2 = -1;
  while (++index2 < extensions.length) {
    syntaxExtension(all2, extensions[index2]);
  }
  return all2;
}
__name(combineExtensions, "combineExtensions");
function syntaxExtension(all2, extension2) {
  let hook;
  for (hook in extension2) {
    const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : void 0;
    const left = maybe || (all2[hook] = {});
    const right = extension2[hook];
    let code;
    if (right) {
      for (code in right) {
        if (!hasOwnProperty.call(left, code))
          left[code] = [];
        const value = right[code];
        constructs(
          // @ts-expect-error Looks like a list.
          left[code],
          Array.isArray(value) ? value : value ? [value] : []
        );
      }
    }
  }
}
__name(syntaxExtension, "syntaxExtension");
function constructs(existing, list2) {
  let index2 = -1;
  const before = [];
  while (++index2 < list2.length) {
    ;
    (list2[index2].add === "after" ? existing : before).push(list2[index2]);
  }
  splice(existing, 0, 0, before);
}
__name(constructs, "constructs");

// ../../node_modules/.pnpm/micromark-util-character@1.2.0/node_modules/micromark-util-character/lib/unicode-punctuation-regex.js
var unicodePunctuationRegex = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

// ../../node_modules/.pnpm/micromark-util-character@1.2.0/node_modules/micromark-util-character/index.js
var asciiAlpha = regexCheck(/[A-Za-z]/);
var asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
var asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
function asciiControl(code) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code !== null && (code < 32 || code === 127)
  );
}
__name(asciiControl, "asciiControl");
var asciiDigit = regexCheck(/\d/);
var asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
var asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
function markdownLineEnding(code) {
  return code !== null && code < -2;
}
__name(markdownLineEnding, "markdownLineEnding");
function markdownLineEndingOrSpace(code) {
  return code !== null && (code < 0 || code === 32);
}
__name(markdownLineEndingOrSpace, "markdownLineEndingOrSpace");
function markdownSpace(code) {
  return code === -2 || code === -1 || code === 32;
}
__name(markdownSpace, "markdownSpace");
var unicodePunctuation = regexCheck(unicodePunctuationRegex);
var unicodeWhitespace = regexCheck(/\s/);
function regexCheck(regex) {
  return check;
  function check(code) {
    return code !== null && regex.test(String.fromCharCode(code));
  }
  __name(check, "check");
}
__name(regexCheck, "regexCheck");

// ../../node_modules/.pnpm/micromark-factory-space@1.1.0/node_modules/micromark-factory-space/index.js
function factorySpace(effects, ok, type, max) {
  const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
  let size = 0;
  return start;
  function start(code) {
    if (markdownSpace(code)) {
      effects.enter(type);
      return prefix(code);
    }
    return ok(code);
  }
  __name(start, "start");
  function prefix(code) {
    if (markdownSpace(code) && size++ < limit) {
      effects.consume(code);
      return prefix;
    }
    effects.exit(type);
    return ok(code);
  }
  __name(prefix, "prefix");
}
__name(factorySpace, "factorySpace");

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/initialize/content.js
var content = {
  tokenize: initializeContent
};
function initializeContent(effects) {
  const contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  );
  let previous2;
  return contentStart;
  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, contentStart, "linePrefix");
  }
  __name(afterContentStartConstruct, "afterContentStartConstruct");
  function paragraphInitial(code) {
    effects.enter("paragraph");
    return lineStart(code);
  }
  __name(paragraphInitial, "paragraphInitial");
  function lineStart(code) {
    const token = effects.enter("chunkText", {
      contentType: "text",
      previous: previous2
    });
    if (previous2) {
      previous2.next = token;
    }
    previous2 = token;
    return data(code);
  }
  __name(lineStart, "lineStart");
  function data(code) {
    if (code === null) {
      effects.exit("chunkText");
      effects.exit("paragraph");
      effects.consume(code);
      return;
    }
    if (markdownLineEnding(code)) {
      effects.consume(code);
      effects.exit("chunkText");
      return lineStart;
    }
    effects.consume(code);
    return data;
  }
  __name(data, "data");
}
__name(initializeContent, "initializeContent");

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/initialize/document.js
var document2 = {
  tokenize: initializeDocument
};
var containerConstruct = {
  tokenize: tokenizeContainer
};
function initializeDocument(effects) {
  const self = this;
  const stack = [];
  let continued = 0;
  let childFlow;
  let childToken;
  let lineStartOffset;
  return start;
  function start(code) {
    if (continued < stack.length) {
      const item = stack[continued];
      self.containerState = item[1];
      return effects.attempt(
        item[0].continuation,
        documentContinue,
        checkNewContainers
      )(code);
    }
    return checkNewContainers(code);
  }
  __name(start, "start");
  function documentContinue(code) {
    continued++;
    if (self.containerState._closeFlow) {
      self.containerState._closeFlow = void 0;
      if (childFlow) {
        closeFlow();
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let point3;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          point3 = self.events[indexBeforeFlow][1].end;
          break;
        }
      }
      exitContainers(continued);
      let index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = Object.assign({}, point3);
        index2++;
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      );
      self.events.length = index2;
      return checkNewContainers(code);
    }
    return start(code);
  }
  __name(documentContinue, "documentContinue");
  function checkNewContainers(code) {
    if (continued === stack.length) {
      if (!childFlow) {
        return documentContinued(code);
      }
      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        return flowStart(code);
      }
      self.interrupt = Boolean(
        childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack
      );
    }
    self.containerState = {};
    return effects.check(
      containerConstruct,
      thereIsANewContainer,
      thereIsNoNewContainer
    )(code);
  }
  __name(checkNewContainers, "checkNewContainers");
  function thereIsANewContainer(code) {
    if (childFlow)
      closeFlow();
    exitContainers(continued);
    return documentContinued(code);
  }
  __name(thereIsANewContainer, "thereIsANewContainer");
  function thereIsNoNewContainer(code) {
    self.parser.lazy[self.now().line] = continued !== stack.length;
    lineStartOffset = self.now().offset;
    return flowStart(code);
  }
  __name(thereIsNoNewContainer, "thereIsNoNewContainer");
  function documentContinued(code) {
    self.containerState = {};
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code);
  }
  __name(documentContinued, "documentContinued");
  function containerContinue(code) {
    continued++;
    stack.push([self.currentConstruct, self.containerState]);
    return documentContinued(code);
  }
  __name(containerContinue, "containerContinue");
  function flowStart(code) {
    if (code === null) {
      if (childFlow)
        closeFlow();
      exitContainers(0);
      effects.consume(code);
      return;
    }
    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter("chunkFlow", {
      contentType: "flow",
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code);
  }
  __name(flowStart, "flowStart");
  function flowContinue(code) {
    if (code === null) {
      writeToChild(effects.exit("chunkFlow"), true);
      exitContainers(0);
      effects.consume(code);
      return;
    }
    if (markdownLineEnding(code)) {
      effects.consume(code);
      writeToChild(effects.exit("chunkFlow"));
      continued = 0;
      self.interrupt = void 0;
      return start;
    }
    effects.consume(code);
    return flowContinue;
  }
  __name(flowContinue, "flowContinue");
  function writeToChild(token, eof) {
    const stream = self.sliceStream(token);
    if (eof)
      stream.push(null);
    token.previous = childToken;
    if (childToken)
      childToken.next = token;
    childToken = token;
    childFlow.defineSkip(token.start);
    childFlow.write(stream);
    if (self.parser.lazy[token.start.line]) {
      let index2 = childFlow.events.length;
      while (index2--) {
        if (
          // The token starts before the line ending…
          childFlow.events[index2][1].start.offset < lineStartOffset && // …and either is not ended yet…
          (!childFlow.events[index2][1].end || // …or ends after it.
          childFlow.events[index2][1].end.offset > lineStartOffset)
        ) {
          return;
        }
      }
      const indexBeforeExits = self.events.length;
      let indexBeforeFlow = indexBeforeExits;
      let seen;
      let point3;
      while (indexBeforeFlow--) {
        if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === "chunkFlow") {
          if (seen) {
            point3 = self.events[indexBeforeFlow][1].end;
            break;
          }
          seen = true;
        }
      }
      exitContainers(continued);
      index2 = indexBeforeExits;
      while (index2 < self.events.length) {
        self.events[index2][1].end = Object.assign({}, point3);
        index2++;
      }
      splice(
        self.events,
        indexBeforeFlow + 1,
        0,
        self.events.slice(indexBeforeExits)
      );
      self.events.length = index2;
    }
  }
  __name(writeToChild, "writeToChild");
  function exitContainers(size) {
    let index2 = stack.length;
    while (index2-- > size) {
      const entry = stack[index2];
      self.containerState = entry[1];
      entry[0].exit.call(self, effects);
    }
    stack.length = size;
  }
  __name(exitContainers, "exitContainers");
  function closeFlow() {
    childFlow.write([null]);
    childToken = void 0;
    childFlow = void 0;
    self.containerState._closeFlow = void 0;
  }
  __name(closeFlow, "closeFlow");
}
__name(initializeDocument, "initializeDocument");
function tokenizeContainer(effects, ok, nok) {
  return factorySpace(
    effects,
    effects.attempt(this.parser.constructs.document, ok, nok),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
__name(tokenizeContainer, "tokenizeContainer");

// ../../node_modules/.pnpm/micromark-util-classify-character@1.1.0/node_modules/micromark-util-classify-character/index.js
function classifyCharacter(code) {
  if (code === null || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
    return 1;
  }
  if (unicodePunctuation(code)) {
    return 2;
  }
}
__name(classifyCharacter, "classifyCharacter");

// ../../node_modules/.pnpm/micromark-util-resolve-all@1.1.0/node_modules/micromark-util-resolve-all/index.js
function resolveAll(constructs2, events, context) {
  const called = [];
  let index2 = -1;
  while (++index2 < constructs2.length) {
    const resolve = constructs2[index2].resolveAll;
    if (resolve && !called.includes(resolve)) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }
  return events;
}
__name(resolveAll, "resolveAll");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/attention.js
var attention = {
  name: "attention",
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};
function resolveAllAttention(events, context) {
  let index2 = -1;
  let open;
  let group;
  let text3;
  let openingSequence;
  let closingSequence;
  let use;
  let nextEvents;
  let offset;
  while (++index2 < events.length) {
    if (events[index2][0] === "enter" && events[index2][1].type === "attentionSequence" && events[index2][1]._close) {
      open = index2;
      while (open--) {
        if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && // If the markers are the same:
        context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index2][1]).charCodeAt(0)) {
          if ((events[open][1]._close || events[index2][1]._open) && (events[index2][1].end.offset - events[index2][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index2][1].end.offset - events[index2][1].start.offset) % 3)) {
            continue;
          }
          use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index2][1].end.offset - events[index2][1].start.offset > 1 ? 2 : 1;
          const start = Object.assign({}, events[open][1].end);
          const end = Object.assign({}, events[index2][1].start);
          movePoint(start, -use);
          movePoint(end, use);
          openingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start,
            end: Object.assign({}, events[open][1].end)
          };
          closingSequence = {
            type: use > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, events[index2][1].start),
            end
          };
          text3 = {
            type: use > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, events[open][1].end),
            end: Object.assign({}, events[index2][1].start)
          };
          group = {
            type: use > 1 ? "strong" : "emphasis",
            start: Object.assign({}, openingSequence.start),
            end: Object.assign({}, closingSequence.end)
          };
          events[open][1].end = Object.assign({}, openingSequence.start);
          events[index2][1].start = Object.assign({}, closingSequence.end);
          nextEvents = [];
          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = push(nextEvents, [
              ["enter", events[open][1], context],
              ["exit", events[open][1], context]
            ]);
          }
          nextEvents = push(nextEvents, [
            ["enter", group, context],
            ["enter", openingSequence, context],
            ["exit", openingSequence, context],
            ["enter", text3, context]
          ]);
          nextEvents = push(
            nextEvents,
            resolveAll(
              context.parser.constructs.insideSpan.null,
              events.slice(open + 1, index2),
              context
            )
          );
          nextEvents = push(nextEvents, [
            ["exit", text3, context],
            ["enter", closingSequence, context],
            ["exit", closingSequence, context],
            ["exit", group, context]
          ]);
          if (events[index2][1].end.offset - events[index2][1].start.offset) {
            offset = 2;
            nextEvents = push(nextEvents, [
              ["enter", events[index2][1], context],
              ["exit", events[index2][1], context]
            ]);
          } else {
            offset = 0;
          }
          splice(events, open - 1, index2 - open + 3, nextEvents);
          index2 = open + nextEvents.length - offset - 2;
          break;
        }
      }
    }
  }
  index2 = -1;
  while (++index2 < events.length) {
    if (events[index2][1].type === "attentionSequence") {
      events[index2][1].type = "data";
    }
  }
  return events;
}
__name(resolveAllAttention, "resolveAllAttention");
function tokenizeAttention(effects, ok) {
  const attentionMarkers2 = this.parser.constructs.attentionMarkers.null;
  const previous2 = this.previous;
  const before = classifyCharacter(previous2);
  let marker;
  return start;
  function start(code) {
    marker = code;
    effects.enter("attentionSequence");
    return inside(code);
  }
  __name(start, "start");
  function inside(code) {
    if (code === marker) {
      effects.consume(code);
      return inside;
    }
    const token = effects.exit("attentionSequence");
    const after = classifyCharacter(code);
    const open = !after || after === 2 && before || attentionMarkers2.includes(code);
    const close = !before || before === 2 && after || attentionMarkers2.includes(previous2);
    token._open = Boolean(marker === 42 ? open : open && (before || !close));
    token._close = Boolean(marker === 42 ? close : close && (after || !open));
    return ok(code);
  }
  __name(inside, "inside");
}
__name(tokenizeAttention, "tokenizeAttention");
function movePoint(point3, offset) {
  point3.column += offset;
  point3.offset += offset;
  point3._bufferIndex += offset;
}
__name(movePoint, "movePoint");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/autolink.js
var autolink = {
  name: "autolink",
  tokenize: tokenizeAutolink
};
function tokenizeAutolink(effects, ok, nok) {
  let size = 0;
  return start;
  function start(code) {
    effects.enter("autolink");
    effects.enter("autolinkMarker");
    effects.consume(code);
    effects.exit("autolinkMarker");
    effects.enter("autolinkProtocol");
    return open;
  }
  __name(start, "start");
  function open(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      return schemeOrEmailAtext;
    }
    return emailAtext(code);
  }
  __name(open, "open");
  function schemeOrEmailAtext(code) {
    if (code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) {
      size = 1;
      return schemeInsideOrEmailAtext(code);
    }
    return emailAtext(code);
  }
  __name(schemeOrEmailAtext, "schemeOrEmailAtext");
  function schemeInsideOrEmailAtext(code) {
    if (code === 58) {
      effects.consume(code);
      size = 0;
      return urlInside;
    }
    if ((code === 43 || code === 45 || code === 46 || asciiAlphanumeric(code)) && size++ < 32) {
      effects.consume(code);
      return schemeInsideOrEmailAtext;
    }
    size = 0;
    return emailAtext(code);
  }
  __name(schemeInsideOrEmailAtext, "schemeInsideOrEmailAtext");
  function urlInside(code) {
    if (code === 62) {
      effects.exit("autolinkProtocol");
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok;
    }
    if (code === null || code === 32 || code === 60 || asciiControl(code)) {
      return nok(code);
    }
    effects.consume(code);
    return urlInside;
  }
  __name(urlInside, "urlInside");
  function emailAtext(code) {
    if (code === 64) {
      effects.consume(code);
      return emailAtSignOrDot;
    }
    if (asciiAtext(code)) {
      effects.consume(code);
      return emailAtext;
    }
    return nok(code);
  }
  __name(emailAtext, "emailAtext");
  function emailAtSignOrDot(code) {
    return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
  }
  __name(emailAtSignOrDot, "emailAtSignOrDot");
  function emailLabel(code) {
    if (code === 46) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot;
    }
    if (code === 62) {
      effects.exit("autolinkProtocol").type = "autolinkEmail";
      effects.enter("autolinkMarker");
      effects.consume(code);
      effects.exit("autolinkMarker");
      effects.exit("autolink");
      return ok;
    }
    return emailValue(code);
  }
  __name(emailLabel, "emailLabel");
  function emailValue(code) {
    if ((code === 45 || asciiAlphanumeric(code)) && size++ < 63) {
      const next = code === 45 ? emailValue : emailLabel;
      effects.consume(code);
      return next;
    }
    return nok(code);
  }
  __name(emailValue, "emailValue");
}
__name(tokenizeAutolink, "tokenizeAutolink");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/blank-line.js
var blankLine = {
  tokenize: tokenizeBlankLine,
  partial: true
};
function tokenizeBlankLine(effects, ok, nok) {
  return start;
  function start(code) {
    return markdownSpace(code) ? factorySpace(effects, after, "linePrefix")(code) : after(code);
  }
  __name(start, "start");
  function after(code) {
    return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
  }
  __name(after, "after");
}
__name(tokenizeBlankLine, "tokenizeBlankLine");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/block-quote.js
var blockQuote = {
  name: "blockQuote",
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit
};
function tokenizeBlockQuoteStart(effects, ok, nok) {
  const self = this;
  return start;
  function start(code) {
    if (code === 62) {
      const state = self.containerState;
      if (!state.open) {
        effects.enter("blockQuote", {
          _container: true
        });
        state.open = true;
      }
      effects.enter("blockQuotePrefix");
      effects.enter("blockQuoteMarker");
      effects.consume(code);
      effects.exit("blockQuoteMarker");
      return after;
    }
    return nok(code);
  }
  __name(start, "start");
  function after(code) {
    if (markdownSpace(code)) {
      effects.enter("blockQuotePrefixWhitespace");
      effects.consume(code);
      effects.exit("blockQuotePrefixWhitespace");
      effects.exit("blockQuotePrefix");
      return ok;
    }
    effects.exit("blockQuotePrefix");
    return ok(code);
  }
  __name(after, "after");
}
__name(tokenizeBlockQuoteStart, "tokenizeBlockQuoteStart");
function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  const self = this;
  return contStart;
  function contStart(code) {
    if (markdownSpace(code)) {
      return factorySpace(
        effects,
        contBefore,
        "linePrefix",
        self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(code);
    }
    return contBefore(code);
  }
  __name(contStart, "contStart");
  function contBefore(code) {
    return effects.attempt(blockQuote, ok, nok)(code);
  }
  __name(contBefore, "contBefore");
}
__name(tokenizeBlockQuoteContinuation, "tokenizeBlockQuoteContinuation");
function exit(effects) {
  effects.exit("blockQuote");
}
__name(exit, "exit");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/character-escape.js
var characterEscape = {
  name: "characterEscape",
  tokenize: tokenizeCharacterEscape
};
function tokenizeCharacterEscape(effects, ok, nok) {
  return start;
  function start(code) {
    effects.enter("characterEscape");
    effects.enter("escapeMarker");
    effects.consume(code);
    effects.exit("escapeMarker");
    return inside;
  }
  __name(start, "start");
  function inside(code) {
    if (asciiPunctuation(code)) {
      effects.enter("characterEscapeValue");
      effects.consume(code);
      effects.exit("characterEscapeValue");
      effects.exit("characterEscape");
      return ok;
    }
    return nok(code);
  }
  __name(inside, "inside");
}
__name(tokenizeCharacterEscape, "tokenizeCharacterEscape");

// ../../node_modules/.pnpm/decode-named-character-reference@1.0.2/node_modules/decode-named-character-reference/index.dom.js
var element = document.createElement("i");
function decodeNamedCharacterReference(value) {
  const characterReference2 = "&" + value + ";";
  element.innerHTML = characterReference2;
  const char = element.textContent;
  if (char.charCodeAt(char.length - 1) === 59 && value !== "semi") {
    return false;
  }
  return char === characterReference2 ? false : char;
}
__name(decodeNamedCharacterReference, "decodeNamedCharacterReference");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/character-reference.js
var characterReference = {
  name: "characterReference",
  tokenize: tokenizeCharacterReference
};
function tokenizeCharacterReference(effects, ok, nok) {
  const self = this;
  let size = 0;
  let max;
  let test;
  return start;
  function start(code) {
    effects.enter("characterReference");
    effects.enter("characterReferenceMarker");
    effects.consume(code);
    effects.exit("characterReferenceMarker");
    return open;
  }
  __name(start, "start");
  function open(code) {
    if (code === 35) {
      effects.enter("characterReferenceMarkerNumeric");
      effects.consume(code);
      effects.exit("characterReferenceMarkerNumeric");
      return numeric;
    }
    effects.enter("characterReferenceValue");
    max = 31;
    test = asciiAlphanumeric;
    return value(code);
  }
  __name(open, "open");
  function numeric(code) {
    if (code === 88 || code === 120) {
      effects.enter("characterReferenceMarkerHexadecimal");
      effects.consume(code);
      effects.exit("characterReferenceMarkerHexadecimal");
      effects.enter("characterReferenceValue");
      max = 6;
      test = asciiHexDigit;
      return value;
    }
    effects.enter("characterReferenceValue");
    max = 7;
    test = asciiDigit;
    return value(code);
  }
  __name(numeric, "numeric");
  function value(code) {
    if (code === 59 && size) {
      const token = effects.exit("characterReferenceValue");
      if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
        return nok(code);
      }
      effects.enter("characterReferenceMarker");
      effects.consume(code);
      effects.exit("characterReferenceMarker");
      effects.exit("characterReference");
      return ok;
    }
    if (test(code) && size++ < max) {
      effects.consume(code);
      return value;
    }
    return nok(code);
  }
  __name(value, "value");
}
__name(tokenizeCharacterReference, "tokenizeCharacterReference");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/code-fenced.js
var nonLazyContinuation = {
  tokenize: tokenizeNonLazyContinuation,
  partial: true
};
var codeFenced = {
  name: "codeFenced",
  tokenize: tokenizeCodeFenced,
  concrete: true
};
function tokenizeCodeFenced(effects, ok, nok) {
  const self = this;
  const closeStart = {
    tokenize: tokenizeCloseStart,
    partial: true
  };
  let initialPrefix = 0;
  let sizeOpen = 0;
  let marker;
  return start;
  function start(code) {
    return beforeSequenceOpen(code);
  }
  __name(start, "start");
  function beforeSequenceOpen(code) {
    const tail = self.events[self.events.length - 1];
    initialPrefix = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
    marker = code;
    effects.enter("codeFenced");
    effects.enter("codeFencedFence");
    effects.enter("codeFencedFenceSequence");
    return sequenceOpen(code);
  }
  __name(beforeSequenceOpen, "beforeSequenceOpen");
  function sequenceOpen(code) {
    if (code === marker) {
      sizeOpen++;
      effects.consume(code);
      return sequenceOpen;
    }
    if (sizeOpen < 3) {
      return nok(code);
    }
    effects.exit("codeFencedFenceSequence");
    return markdownSpace(code) ? factorySpace(effects, infoBefore, "whitespace")(code) : infoBefore(code);
  }
  __name(sequenceOpen, "sequenceOpen");
  function infoBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFencedFence");
      return self.interrupt ? ok(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
    }
    effects.enter("codeFencedFenceInfo");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return info(code);
  }
  __name(infoBefore, "infoBefore");
  function info(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return infoBefore(code);
    }
    if (markdownSpace(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceInfo");
      return factorySpace(effects, metaBefore, "whitespace")(code);
    }
    if (code === 96 && code === marker) {
      return nok(code);
    }
    effects.consume(code);
    return info;
  }
  __name(info, "info");
  function metaBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      return infoBefore(code);
    }
    effects.enter("codeFencedFenceMeta");
    effects.enter("chunkString", {
      contentType: "string"
    });
    return meta(code);
  }
  __name(metaBefore, "metaBefore");
  function meta(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      effects.exit("codeFencedFenceMeta");
      return infoBefore(code);
    }
    if (code === 96 && code === marker) {
      return nok(code);
    }
    effects.consume(code);
    return meta;
  }
  __name(meta, "meta");
  function atNonLazyBreak(code) {
    return effects.attempt(closeStart, after, contentBefore)(code);
  }
  __name(atNonLazyBreak, "atNonLazyBreak");
  function contentBefore(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return contentStart;
  }
  __name(contentBefore, "contentBefore");
  function contentStart(code) {
    return initialPrefix > 0 && markdownSpace(code) ? factorySpace(
      effects,
      beforeContentChunk,
      "linePrefix",
      initialPrefix + 1
    )(code) : beforeContentChunk(code);
  }
  __name(contentStart, "contentStart");
  function beforeContentChunk(code) {
    if (code === null || markdownLineEnding(code)) {
      return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
    }
    effects.enter("codeFlowValue");
    return contentChunk(code);
  }
  __name(beforeContentChunk, "beforeContentChunk");
  function contentChunk(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFlowValue");
      return beforeContentChunk(code);
    }
    effects.consume(code);
    return contentChunk;
  }
  __name(contentChunk, "contentChunk");
  function after(code) {
    effects.exit("codeFenced");
    return ok(code);
  }
  __name(after, "after");
  function tokenizeCloseStart(effects2, ok2, nok2) {
    let size = 0;
    return startBefore;
    function startBefore(code) {
      effects2.enter("lineEnding");
      effects2.consume(code);
      effects2.exit("lineEnding");
      return start2;
    }
    __name(startBefore, "startBefore");
    function start2(code) {
      effects2.enter("codeFencedFence");
      return markdownSpace(code) ? factorySpace(
        effects2,
        beforeSequenceClose,
        "linePrefix",
        self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(code) : beforeSequenceClose(code);
    }
    __name(start2, "start");
    function beforeSequenceClose(code) {
      if (code === marker) {
        effects2.enter("codeFencedFenceSequence");
        return sequenceClose(code);
      }
      return nok2(code);
    }
    __name(beforeSequenceClose, "beforeSequenceClose");
    function sequenceClose(code) {
      if (code === marker) {
        size++;
        effects2.consume(code);
        return sequenceClose;
      }
      if (size >= sizeOpen) {
        effects2.exit("codeFencedFenceSequence");
        return markdownSpace(code) ? factorySpace(effects2, sequenceCloseAfter, "whitespace")(code) : sequenceCloseAfter(code);
      }
      return nok2(code);
    }
    __name(sequenceClose, "sequenceClose");
    function sequenceCloseAfter(code) {
      if (code === null || markdownLineEnding(code)) {
        effects2.exit("codeFencedFence");
        return ok2(code);
      }
      return nok2(code);
    }
    __name(sequenceCloseAfter, "sequenceCloseAfter");
  }
  __name(tokenizeCloseStart, "tokenizeCloseStart");
}
__name(tokenizeCodeFenced, "tokenizeCodeFenced");
function tokenizeNonLazyContinuation(effects, ok, nok) {
  const self = this;
  return start;
  function start(code) {
    if (code === null) {
      return nok(code);
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return lineStart;
  }
  __name(start, "start");
  function lineStart(code) {
    return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
  }
  __name(lineStart, "lineStart");
}
__name(tokenizeNonLazyContinuation, "tokenizeNonLazyContinuation");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/code-indented.js
var codeIndented = {
  name: "codeIndented",
  tokenize: tokenizeCodeIndented
};
var furtherStart = {
  tokenize: tokenizeFurtherStart,
  partial: true
};
function tokenizeCodeIndented(effects, ok, nok) {
  const self = this;
  return start;
  function start(code) {
    effects.enter("codeIndented");
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code);
  }
  __name(start, "start");
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? atBreak(code) : nok(code);
  }
  __name(afterPrefix, "afterPrefix");
  function atBreak(code) {
    if (code === null) {
      return after(code);
    }
    if (markdownLineEnding(code)) {
      return effects.attempt(furtherStart, atBreak, after)(code);
    }
    effects.enter("codeFlowValue");
    return inside(code);
  }
  __name(atBreak, "atBreak");
  function inside(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("codeFlowValue");
      return atBreak(code);
    }
    effects.consume(code);
    return inside;
  }
  __name(inside, "inside");
  function after(code) {
    effects.exit("codeIndented");
    return ok(code);
  }
  __name(after, "after");
}
__name(tokenizeCodeIndented, "tokenizeCodeIndented");
function tokenizeFurtherStart(effects, ok, nok) {
  const self = this;
  return furtherStart2;
  function furtherStart2(code) {
    if (self.parser.lazy[self.now().line]) {
      return nok(code);
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return furtherStart2;
    }
    return factorySpace(effects, afterPrefix, "linePrefix", 4 + 1)(code);
  }
  __name(furtherStart2, "furtherStart");
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4 ? ok(code) : markdownLineEnding(code) ? furtherStart2(code) : nok(code);
  }
  __name(afterPrefix, "afterPrefix");
}
__name(tokenizeFurtherStart, "tokenizeFurtherStart");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/code-text.js
var codeText = {
  name: "codeText",
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous
};
function resolveCodeText(events) {
  let tailExitIndex = events.length - 4;
  let headEnterIndex = 3;
  let index2;
  let enter;
  if ((events[headEnterIndex][1].type === "lineEnding" || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === "lineEnding" || events[tailExitIndex][1].type === "space")) {
    index2 = headEnterIndex;
    while (++index2 < tailExitIndex) {
      if (events[index2][1].type === "codeTextData") {
        events[headEnterIndex][1].type = "codeTextPadding";
        events[tailExitIndex][1].type = "codeTextPadding";
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break;
      }
    }
  }
  index2 = headEnterIndex - 1;
  tailExitIndex++;
  while (++index2 <= tailExitIndex) {
    if (enter === void 0) {
      if (index2 !== tailExitIndex && events[index2][1].type !== "lineEnding") {
        enter = index2;
      }
    } else if (index2 === tailExitIndex || events[index2][1].type === "lineEnding") {
      events[enter][1].type = "codeTextData";
      if (index2 !== enter + 2) {
        events[enter][1].end = events[index2 - 1][1].end;
        events.splice(enter + 2, index2 - enter - 2);
        tailExitIndex -= index2 - enter - 2;
        index2 = enter + 2;
      }
      enter = void 0;
    }
  }
  return events;
}
__name(resolveCodeText, "resolveCodeText");
function previous(code) {
  return code !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
__name(previous, "previous");
function tokenizeCodeText(effects, ok, nok) {
  const self = this;
  let sizeOpen = 0;
  let size;
  let token;
  return start;
  function start(code) {
    effects.enter("codeText");
    effects.enter("codeTextSequence");
    return sequenceOpen(code);
  }
  __name(start, "start");
  function sequenceOpen(code) {
    if (code === 96) {
      effects.consume(code);
      sizeOpen++;
      return sequenceOpen;
    }
    effects.exit("codeTextSequence");
    return between(code);
  }
  __name(sequenceOpen, "sequenceOpen");
  function between(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 32) {
      effects.enter("space");
      effects.consume(code);
      effects.exit("space");
      return between;
    }
    if (code === 96) {
      token = effects.enter("codeTextSequence");
      size = 0;
      return sequenceClose(code);
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return between;
    }
    effects.enter("codeTextData");
    return data(code);
  }
  __name(between, "between");
  function data(code) {
    if (code === null || code === 32 || code === 96 || markdownLineEnding(code)) {
      effects.exit("codeTextData");
      return between(code);
    }
    effects.consume(code);
    return data;
  }
  __name(data, "data");
  function sequenceClose(code) {
    if (code === 96) {
      effects.consume(code);
      size++;
      return sequenceClose;
    }
    if (size === sizeOpen) {
      effects.exit("codeTextSequence");
      effects.exit("codeText");
      return ok(code);
    }
    token.type = "codeTextData";
    return data(code);
  }
  __name(sequenceClose, "sequenceClose");
}
__name(tokenizeCodeText, "tokenizeCodeText");

// ../../node_modules/.pnpm/micromark-util-subtokenize@1.1.0/node_modules/micromark-util-subtokenize/index.js
function subtokenize(events) {
  const jumps = {};
  let index2 = -1;
  let event;
  let lineIndex;
  let otherIndex;
  let otherEvent;
  let parameters;
  let subevents;
  let more;
  while (++index2 < events.length) {
    while (index2 in jumps) {
      index2 = jumps[index2];
    }
    event = events[index2];
    if (index2 && event[1].type === "chunkFlow" && events[index2 - 1][1].type === "listItemPrefix") {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "lineEndingBlank") {
        otherIndex += 2;
      }
      if (otherIndex < subevents.length && subevents[otherIndex][1].type === "content") {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === "content") {
            break;
          }
          if (subevents[otherIndex][1].type === "chunkText") {
            subevents[otherIndex][1]._isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    }
    if (event[0] === "enter") {
      if (event[1].contentType) {
        Object.assign(jumps, subcontent(events, index2));
        index2 = jumps[index2];
        more = true;
      }
    } else if (event[1]._container) {
      otherIndex = index2;
      lineIndex = void 0;
      while (otherIndex--) {
        otherEvent = events[otherIndex];
        if (otherEvent[1].type === "lineEnding" || otherEvent[1].type === "lineEndingBlank") {
          if (otherEvent[0] === "enter") {
            if (lineIndex) {
              events[lineIndex][1].type = "lineEndingBlank";
            }
            otherEvent[1].type = "lineEnding";
            lineIndex = otherIndex;
          }
        } else {
          break;
        }
      }
      if (lineIndex) {
        event[1].end = Object.assign({}, events[lineIndex][1].start);
        parameters = events.slice(lineIndex, index2);
        parameters.unshift(event);
        splice(events, lineIndex, index2 - lineIndex + 1, parameters);
      }
    }
  }
  return !more;
}
__name(subtokenize, "subtokenize");
function subcontent(events, eventIndex) {
  const token = events[eventIndex][1];
  const context = events[eventIndex][2];
  let startPosition = eventIndex - 1;
  const startPositions = [];
  const tokenizer = token._tokenizer || context.parser[token.contentType](token.start);
  const childEvents = tokenizer.events;
  const jumps = [];
  const gaps = {};
  let stream;
  let previous2;
  let index2 = -1;
  let current = token;
  let adjust = 0;
  let start = 0;
  const breaks = [start];
  while (current) {
    while (events[++startPosition][1] !== current) {
    }
    startPositions.push(startPosition);
    if (!current._tokenizer) {
      stream = context.sliceStream(current);
      if (!current.next) {
        stream.push(null);
      }
      if (previous2) {
        tokenizer.defineSkip(current.start);
      }
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }
      tokenizer.write(stream);
      if (current._isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = void 0;
      }
    }
    previous2 = current;
    current = current.next;
  }
  current = token;
  while (++index2 < childEvents.length) {
    if (
      // Find a void token that includes a break.
      childEvents[index2][0] === "exit" && childEvents[index2 - 1][0] === "enter" && childEvents[index2][1].type === childEvents[index2 - 1][1].type && childEvents[index2][1].start.line !== childEvents[index2][1].end.line
    ) {
      start = index2 + 1;
      breaks.push(start);
      current._tokenizer = void 0;
      current.previous = void 0;
      current = current.next;
    }
  }
  tokenizer.events = [];
  if (current) {
    current._tokenizer = void 0;
    current.previous = void 0;
  } else {
    breaks.pop();
  }
  index2 = breaks.length;
  while (index2--) {
    const slice = childEvents.slice(breaks[index2], breaks[index2 + 1]);
    const start2 = startPositions.pop();
    jumps.unshift([start2, start2 + slice.length - 1]);
    splice(events, start2, 2, slice);
  }
  index2 = -1;
  while (++index2 < jumps.length) {
    gaps[adjust + jumps[index2][0]] = adjust + jumps[index2][1];
    adjust += jumps[index2][1] - jumps[index2][0] - 1;
  }
  return gaps;
}
__name(subcontent, "subcontent");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/content.js
var content2 = {
  tokenize: tokenizeContent,
  resolve: resolveContent
};
var continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
};
function resolveContent(events) {
  subtokenize(events);
  return events;
}
__name(resolveContent, "resolveContent");
function tokenizeContent(effects, ok) {
  let previous2;
  return chunkStart;
  function chunkStart(code) {
    effects.enter("content");
    previous2 = effects.enter("chunkContent", {
      contentType: "content"
    });
    return chunkInside(code);
  }
  __name(chunkStart, "chunkStart");
  function chunkInside(code) {
    if (code === null) {
      return contentEnd(code);
    }
    if (markdownLineEnding(code)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd
      )(code);
    }
    effects.consume(code);
    return chunkInside;
  }
  __name(chunkInside, "chunkInside");
  function contentEnd(code) {
    effects.exit("chunkContent");
    effects.exit("content");
    return ok(code);
  }
  __name(contentEnd, "contentEnd");
  function contentContinue(code) {
    effects.consume(code);
    effects.exit("chunkContent");
    previous2.next = effects.enter("chunkContent", {
      contentType: "content",
      previous: previous2
    });
    previous2 = previous2.next;
    return chunkInside;
  }
  __name(contentContinue, "contentContinue");
}
__name(tokenizeContent, "tokenizeContent");
function tokenizeContinuation(effects, ok, nok) {
  const self = this;
  return startLookahead;
  function startLookahead(code) {
    effects.exit("chunkContent");
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, prefixed, "linePrefix");
  }
  __name(startLookahead, "startLookahead");
  function prefixed(code) {
    if (code === null || markdownLineEnding(code)) {
      return nok(code);
    }
    const tail = self.events[self.events.length - 1];
    if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === "linePrefix" && tail[2].sliceSerialize(tail[1], true).length >= 4) {
      return ok(code);
    }
    return effects.interrupt(self.parser.constructs.flow, nok, ok)(code);
  }
  __name(prefixed, "prefixed");
}
__name(tokenizeContinuation, "tokenizeContinuation");

// ../../node_modules/.pnpm/micromark-factory-destination@1.1.0/node_modules/micromark-factory-destination/index.js
function factoryDestination(effects, ok, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
  const limit = max || Number.POSITIVE_INFINITY;
  let balance = 0;
  return start;
  function start(code) {
    if (code === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      return enclosedBefore;
    }
    if (code === null || code === 32 || code === 41 || asciiControl(code)) {
      return nok(code);
    }
    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return raw(code);
  }
  __name(start, "start");
  function enclosedBefore(code) {
    if (code === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok;
    }
    effects.enter(stringType);
    effects.enter("chunkString", {
      contentType: "string"
    });
    return enclosed(code);
  }
  __name(enclosedBefore, "enclosedBefore");
  function enclosed(code) {
    if (code === 62) {
      effects.exit("chunkString");
      effects.exit(stringType);
      return enclosedBefore(code);
    }
    if (code === null || code === 60 || markdownLineEnding(code)) {
      return nok(code);
    }
    effects.consume(code);
    return code === 92 ? enclosedEscape : enclosed;
  }
  __name(enclosed, "enclosed");
  function enclosedEscape(code) {
    if (code === 60 || code === 62 || code === 92) {
      effects.consume(code);
      return enclosed;
    }
    return enclosed(code);
  }
  __name(enclosedEscape, "enclosedEscape");
  function raw(code) {
    if (!balance && (code === null || code === 41 || markdownLineEndingOrSpace(code))) {
      effects.exit("chunkString");
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok(code);
    }
    if (balance < limit && code === 40) {
      effects.consume(code);
      balance++;
      return raw;
    }
    if (code === 41) {
      effects.consume(code);
      balance--;
      return raw;
    }
    if (code === null || code === 32 || code === 40 || asciiControl(code)) {
      return nok(code);
    }
    effects.consume(code);
    return code === 92 ? rawEscape : raw;
  }
  __name(raw, "raw");
  function rawEscape(code) {
    if (code === 40 || code === 41 || code === 92) {
      effects.consume(code);
      return raw;
    }
    return raw(code);
  }
  __name(rawEscape, "rawEscape");
}
__name(factoryDestination, "factoryDestination");

// ../../node_modules/.pnpm/micromark-factory-label@1.1.0/node_modules/micromark-factory-label/index.js
function factoryLabel(effects, ok, nok, type, markerType, stringType) {
  const self = this;
  let size = 0;
  let seen;
  return start;
  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak;
  }
  __name(start, "start");
  function atBreak(code) {
    if (size > 999 || code === null || code === 91 || code === 93 && !seen || // To do: remove in the future once we’ve switched from
    // `micromark-extension-footnote` to `micromark-extension-gfm-footnote`,
    // which doesn’t need this.
    // Hidden footnotes hook.
    /* c8 ignore next 3 */
    code === 94 && !size && "_hiddenFootnoteSupport" in self.parser.constructs) {
      return nok(code);
    }
    if (code === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok;
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return atBreak;
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return labelInside(code);
  }
  __name(atBreak, "atBreak");
  function labelInside(code) {
    if (code === null || code === 91 || code === 93 || markdownLineEnding(code) || size++ > 999) {
      effects.exit("chunkString");
      return atBreak(code);
    }
    effects.consume(code);
    if (!seen)
      seen = !markdownSpace(code);
    return code === 92 ? labelEscape : labelInside;
  }
  __name(labelInside, "labelInside");
  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return labelInside;
    }
    return labelInside(code);
  }
  __name(labelEscape, "labelEscape");
}
__name(factoryLabel, "factoryLabel");

// ../../node_modules/.pnpm/micromark-factory-title@1.1.0/node_modules/micromark-factory-title/index.js
function factoryTitle(effects, ok, nok, type, markerType, stringType) {
  let marker;
  return start;
  function start(code) {
    if (code === 34 || code === 39 || code === 40) {
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      marker = code === 40 ? 41 : code;
      return begin;
    }
    return nok(code);
  }
  __name(start, "start");
  function begin(code) {
    if (code === marker) {
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok;
    }
    effects.enter(stringType);
    return atBreak(code);
  }
  __name(begin, "begin");
  function atBreak(code) {
    if (code === marker) {
      effects.exit(stringType);
      return begin(marker);
    }
    if (code === null) {
      return nok(code);
    }
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return factorySpace(effects, atBreak, "linePrefix");
    }
    effects.enter("chunkString", {
      contentType: "string"
    });
    return inside(code);
  }
  __name(atBreak, "atBreak");
  function inside(code) {
    if (code === marker || code === null || markdownLineEnding(code)) {
      effects.exit("chunkString");
      return atBreak(code);
    }
    effects.consume(code);
    return code === 92 ? escape : inside;
  }
  __name(inside, "inside");
  function escape(code) {
    if (code === marker || code === 92) {
      effects.consume(code);
      return inside;
    }
    return inside(code);
  }
  __name(escape, "escape");
}
__name(factoryTitle, "factoryTitle");

// ../../node_modules/.pnpm/micromark-factory-whitespace@1.1.0/node_modules/micromark-factory-whitespace/index.js
function factoryWhitespace(effects, ok) {
  let seen;
  return start;
  function start(code) {
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      seen = true;
      return start;
    }
    if (markdownSpace(code)) {
      return factorySpace(
        effects,
        start,
        seen ? "linePrefix" : "lineSuffix"
      )(code);
    }
    return ok(code);
  }
  __name(start, "start");
}
__name(factoryWhitespace, "factoryWhitespace");

// ../../node_modules/.pnpm/micromark-util-normalize-identifier@1.1.0/node_modules/micromark-util-normalize-identifier/index.js
function normalizeIdentifier(value) {
  return value.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
__name(normalizeIdentifier, "normalizeIdentifier");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/definition.js
var definition = {
  name: "definition",
  tokenize: tokenizeDefinition
};
var titleBefore = {
  tokenize: tokenizeTitleBefore,
  partial: true
};
function tokenizeDefinition(effects, ok, nok) {
  const self = this;
  let identifier;
  return start;
  function start(code) {
    effects.enter("definition");
    return before(code);
  }
  __name(start, "start");
  function before(code) {
    return factoryLabel.call(
      self,
      effects,
      labelAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(code);
  }
  __name(before, "before");
  function labelAfter(code) {
    identifier = normalizeIdentifier(
      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
    );
    if (code === 58) {
      effects.enter("definitionMarker");
      effects.consume(code);
      effects.exit("definitionMarker");
      return markerAfter;
    }
    return nok(code);
  }
  __name(labelAfter, "labelAfter");
  function markerAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
  }
  __name(markerAfter, "markerAfter");
  function destinationBefore(code) {
    return factoryDestination(
      effects,
      destinationAfter,
      // Note: we don’t need to reset the way `markdown-rs` does.
      nok,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(code);
  }
  __name(destinationBefore, "destinationBefore");
  function destinationAfter(code) {
    return effects.attempt(titleBefore, after, after)(code);
  }
  __name(destinationAfter, "destinationAfter");
  function after(code) {
    return markdownSpace(code) ? factorySpace(effects, afterWhitespace, "whitespace")(code) : afterWhitespace(code);
  }
  __name(after, "after");
  function afterWhitespace(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("definition");
      self.parser.defined.push(identifier);
      return ok(code);
    }
    return nok(code);
  }
  __name(afterWhitespace, "afterWhitespace");
}
__name(tokenizeDefinition, "tokenizeDefinition");
function tokenizeTitleBefore(effects, ok, nok) {
  return titleBefore2;
  function titleBefore2(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
  }
  __name(titleBefore2, "titleBefore");
  function beforeMarker(code) {
    return factoryTitle(
      effects,
      titleAfter,
      nok,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(code);
  }
  __name(beforeMarker, "beforeMarker");
  function titleAfter(code) {
    return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, "whitespace")(code) : titleAfterOptionalWhitespace(code);
  }
  __name(titleAfter, "titleAfter");
  function titleAfterOptionalWhitespace(code) {
    return code === null || markdownLineEnding(code) ? ok(code) : nok(code);
  }
  __name(titleAfterOptionalWhitespace, "titleAfterOptionalWhitespace");
}
__name(tokenizeTitleBefore, "tokenizeTitleBefore");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/hard-break-escape.js
var hardBreakEscape = {
  name: "hardBreakEscape",
  tokenize: tokenizeHardBreakEscape
};
function tokenizeHardBreakEscape(effects, ok, nok) {
  return start;
  function start(code) {
    effects.enter("hardBreakEscape");
    effects.consume(code);
    return after;
  }
  __name(start, "start");
  function after(code) {
    if (markdownLineEnding(code)) {
      effects.exit("hardBreakEscape");
      return ok(code);
    }
    return nok(code);
  }
  __name(after, "after");
}
__name(tokenizeHardBreakEscape, "tokenizeHardBreakEscape");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/heading-atx.js
var headingAtx = {
  name: "headingAtx",
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};
function resolveHeadingAtx(events, context) {
  let contentEnd = events.length - 2;
  let contentStart = 3;
  let content3;
  let text3;
  if (events[contentStart][1].type === "whitespace") {
    contentStart += 2;
  }
  if (contentEnd - 2 > contentStart && events[contentEnd][1].type === "whitespace") {
    contentEnd -= 2;
  }
  if (events[contentEnd][1].type === "atxHeadingSequence" && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === "whitespace")) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }
  if (contentEnd > contentStart) {
    content3 = {
      type: "atxHeadingText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text3 = {
      type: "chunkText",
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: "text"
    };
    splice(events, contentStart, contentEnd - contentStart + 1, [
      ["enter", content3, context],
      ["enter", text3, context],
      ["exit", text3, context],
      ["exit", content3, context]
    ]);
  }
  return events;
}
__name(resolveHeadingAtx, "resolveHeadingAtx");
function tokenizeHeadingAtx(effects, ok, nok) {
  let size = 0;
  return start;
  function start(code) {
    effects.enter("atxHeading");
    return before(code);
  }
  __name(start, "start");
  function before(code) {
    effects.enter("atxHeadingSequence");
    return sequenceOpen(code);
  }
  __name(before, "before");
  function sequenceOpen(code) {
    if (code === 35 && size++ < 6) {
      effects.consume(code);
      return sequenceOpen;
    }
    if (code === null || markdownLineEndingOrSpace(code)) {
      effects.exit("atxHeadingSequence");
      return atBreak(code);
    }
    return nok(code);
  }
  __name(sequenceOpen, "sequenceOpen");
  function atBreak(code) {
    if (code === 35) {
      effects.enter("atxHeadingSequence");
      return sequenceFurther(code);
    }
    if (code === null || markdownLineEnding(code)) {
      effects.exit("atxHeading");
      return ok(code);
    }
    if (markdownSpace(code)) {
      return factorySpace(effects, atBreak, "whitespace")(code);
    }
    effects.enter("atxHeadingText");
    return data(code);
  }
  __name(atBreak, "atBreak");
  function sequenceFurther(code) {
    if (code === 35) {
      effects.consume(code);
      return sequenceFurther;
    }
    effects.exit("atxHeadingSequence");
    return atBreak(code);
  }
  __name(sequenceFurther, "sequenceFurther");
  function data(code) {
    if (code === null || code === 35 || markdownLineEndingOrSpace(code)) {
      effects.exit("atxHeadingText");
      return atBreak(code);
    }
    effects.consume(code);
    return data;
  }
  __name(data, "data");
}
__name(tokenizeHeadingAtx, "tokenizeHeadingAtx");

// ../../node_modules/.pnpm/micromark-util-html-tag-name@1.2.0/node_modules/micromark-util-html-tag-name/index.js
var htmlBlockNames = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
];
var htmlRawNames = ["pre", "script", "style", "textarea"];

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/html-flow.js
var htmlFlow = {
  name: "htmlFlow",
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
var blankLineBefore = {
  tokenize: tokenizeBlankLineBefore,
  partial: true
};
var nonLazyContinuationStart = {
  tokenize: tokenizeNonLazyContinuationStart,
  partial: true
};
function resolveToHtmlFlow(events) {
  let index2 = events.length;
  while (index2--) {
    if (events[index2][0] === "enter" && events[index2][1].type === "htmlFlow") {
      break;
    }
  }
  if (index2 > 1 && events[index2 - 2][1].type === "linePrefix") {
    events[index2][1].start = events[index2 - 2][1].start;
    events[index2 + 1][1].start = events[index2 - 2][1].start;
    events.splice(index2 - 2, 2);
  }
  return events;
}
__name(resolveToHtmlFlow, "resolveToHtmlFlow");
function tokenizeHtmlFlow(effects, ok, nok) {
  const self = this;
  let marker;
  let closingTag;
  let buffer;
  let index2;
  let markerB;
  return start;
  function start(code) {
    return before(code);
  }
  __name(start, "start");
  function before(code) {
    effects.enter("htmlFlow");
    effects.enter("htmlFlowData");
    effects.consume(code);
    return open;
  }
  __name(before, "before");
  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen;
    }
    if (code === 47) {
      effects.consume(code);
      closingTag = true;
      return tagCloseStart;
    }
    if (code === 63) {
      effects.consume(code);
      marker = 3;
      return self.interrupt ? ok : continuationDeclarationInside;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      buffer = String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }
  __name(open, "open");
  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      marker = 2;
      return commentOpenInside;
    }
    if (code === 91) {
      effects.consume(code);
      marker = 5;
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      marker = 4;
      return self.interrupt ? ok : continuationDeclarationInside;
    }
    return nok(code);
  }
  __name(declarationOpen, "declarationOpen");
  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return self.interrupt ? ok : continuationDeclarationInside;
    }
    return nok(code);
  }
  __name(commentOpenInside, "commentOpenInside");
  function cdataOpenInside(code) {
    const value = "CDATA[";
    if (code === value.charCodeAt(index2++)) {
      effects.consume(code);
      if (index2 === value.length) {
        return self.interrupt ? ok : continuation;
      }
      return cdataOpenInside;
    }
    return nok(code);
  }
  __name(cdataOpenInside, "cdataOpenInside");
  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      buffer = String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }
  __name(tagCloseStart, "tagCloseStart");
  function tagName(code) {
    if (code === null || code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      const slash = code === 47;
      const name = buffer.toLowerCase();
      if (!slash && !closingTag && htmlRawNames.includes(name)) {
        marker = 1;
        return self.interrupt ? ok(code) : continuation(code);
      }
      if (htmlBlockNames.includes(buffer.toLowerCase())) {
        marker = 6;
        if (slash) {
          effects.consume(code);
          return basicSelfClosing;
        }
        return self.interrupt ? ok(code) : continuation(code);
      }
      marker = 7;
      return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
    }
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      buffer += String.fromCharCode(code);
      return tagName;
    }
    return nok(code);
  }
  __name(tagName, "tagName");
  function basicSelfClosing(code) {
    if (code === 62) {
      effects.consume(code);
      return self.interrupt ? ok : continuation;
    }
    return nok(code);
  }
  __name(basicSelfClosing, "basicSelfClosing");
  function completeClosingTagAfter(code) {
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeClosingTagAfter;
    }
    return completeEnd(code);
  }
  __name(completeClosingTagAfter, "completeClosingTagAfter");
  function completeAttributeNameBefore(code) {
    if (code === 47) {
      effects.consume(code);
      return completeEnd;
    }
    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code);
      return completeAttributeName;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeNameBefore;
    }
    return completeEnd(code);
  }
  __name(completeAttributeNameBefore, "completeAttributeNameBefore");
  function completeAttributeName(code) {
    if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return completeAttributeName;
    }
    return completeAttributeNameAfter(code);
  }
  __name(completeAttributeName, "completeAttributeName");
  function completeAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return completeAttributeValueBefore;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeNameAfter;
    }
    return completeAttributeNameBefore(code);
  }
  __name(completeAttributeNameAfter, "completeAttributeNameAfter");
  function completeAttributeValueBefore(code) {
    if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
      return nok(code);
    }
    if (code === 34 || code === 39) {
      effects.consume(code);
      markerB = code;
      return completeAttributeValueQuoted;
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAttributeValueBefore;
    }
    return completeAttributeValueUnquoted(code);
  }
  __name(completeAttributeValueBefore, "completeAttributeValueBefore");
  function completeAttributeValueQuoted(code) {
    if (code === markerB) {
      effects.consume(code);
      markerB = null;
      return completeAttributeValueQuotedAfter;
    }
    if (code === null || markdownLineEnding(code)) {
      return nok(code);
    }
    effects.consume(code);
    return completeAttributeValueQuoted;
  }
  __name(completeAttributeValueQuoted, "completeAttributeValueQuoted");
  function completeAttributeValueUnquoted(code) {
    if (code === null || code === 34 || code === 39 || code === 47 || code === 60 || code === 61 || code === 62 || code === 96 || markdownLineEndingOrSpace(code)) {
      return completeAttributeNameAfter(code);
    }
    effects.consume(code);
    return completeAttributeValueUnquoted;
  }
  __name(completeAttributeValueUnquoted, "completeAttributeValueUnquoted");
  function completeAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownSpace(code)) {
      return completeAttributeNameBefore(code);
    }
    return nok(code);
  }
  __name(completeAttributeValueQuotedAfter, "completeAttributeValueQuotedAfter");
  function completeEnd(code) {
    if (code === 62) {
      effects.consume(code);
      return completeAfter;
    }
    return nok(code);
  }
  __name(completeEnd, "completeEnd");
  function completeAfter(code) {
    if (code === null || markdownLineEnding(code)) {
      return continuation(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return completeAfter;
    }
    return nok(code);
  }
  __name(completeAfter, "completeAfter");
  function continuation(code) {
    if (code === 45 && marker === 2) {
      effects.consume(code);
      return continuationCommentInside;
    }
    if (code === 60 && marker === 1) {
      effects.consume(code);
      return continuationRawTagOpen;
    }
    if (code === 62 && marker === 4) {
      effects.consume(code);
      return continuationClose;
    }
    if (code === 63 && marker === 3) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    if (code === 93 && marker === 5) {
      effects.consume(code);
      return continuationCdataInside;
    }
    if (markdownLineEnding(code) && (marker === 6 || marker === 7)) {
      effects.exit("htmlFlowData");
      return effects.check(
        blankLineBefore,
        continuationAfter,
        continuationStart
      )(code);
    }
    if (code === null || markdownLineEnding(code)) {
      effects.exit("htmlFlowData");
      return continuationStart(code);
    }
    effects.consume(code);
    return continuation;
  }
  __name(continuation, "continuation");
  function continuationStart(code) {
    return effects.check(
      nonLazyContinuationStart,
      continuationStartNonLazy,
      continuationAfter
    )(code);
  }
  __name(continuationStart, "continuationStart");
  function continuationStartNonLazy(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return continuationBefore;
  }
  __name(continuationStartNonLazy, "continuationStartNonLazy");
  function continuationBefore(code) {
    if (code === null || markdownLineEnding(code)) {
      return continuationStart(code);
    }
    effects.enter("htmlFlowData");
    return continuation(code);
  }
  __name(continuationBefore, "continuationBefore");
  function continuationCommentInside(code) {
    if (code === 45) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }
  __name(continuationCommentInside, "continuationCommentInside");
  function continuationRawTagOpen(code) {
    if (code === 47) {
      effects.consume(code);
      buffer = "";
      return continuationRawEndTag;
    }
    return continuation(code);
  }
  __name(continuationRawTagOpen, "continuationRawTagOpen");
  function continuationRawEndTag(code) {
    if (code === 62) {
      const name = buffer.toLowerCase();
      if (htmlRawNames.includes(name)) {
        effects.consume(code);
        return continuationClose;
      }
      return continuation(code);
    }
    if (asciiAlpha(code) && buffer.length < 8) {
      effects.consume(code);
      buffer += String.fromCharCode(code);
      return continuationRawEndTag;
    }
    return continuation(code);
  }
  __name(continuationRawEndTag, "continuationRawEndTag");
  function continuationCdataInside(code) {
    if (code === 93) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }
  __name(continuationCdataInside, "continuationCdataInside");
  function continuationDeclarationInside(code) {
    if (code === 62) {
      effects.consume(code);
      return continuationClose;
    }
    if (code === 45 && marker === 2) {
      effects.consume(code);
      return continuationDeclarationInside;
    }
    return continuation(code);
  }
  __name(continuationDeclarationInside, "continuationDeclarationInside");
  function continuationClose(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("htmlFlowData");
      return continuationAfter(code);
    }
    effects.consume(code);
    return continuationClose;
  }
  __name(continuationClose, "continuationClose");
  function continuationAfter(code) {
    effects.exit("htmlFlow");
    return ok(code);
  }
  __name(continuationAfter, "continuationAfter");
}
__name(tokenizeHtmlFlow, "tokenizeHtmlFlow");
function tokenizeNonLazyContinuationStart(effects, ok, nok) {
  const self = this;
  return start;
  function start(code) {
    if (markdownLineEnding(code)) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return after;
    }
    return nok(code);
  }
  __name(start, "start");
  function after(code) {
    return self.parser.lazy[self.now().line] ? nok(code) : ok(code);
  }
  __name(after, "after");
}
__name(tokenizeNonLazyContinuationStart, "tokenizeNonLazyContinuationStart");
function tokenizeBlankLineBefore(effects, ok, nok) {
  return start;
  function start(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return effects.attempt(blankLine, ok, nok);
  }
  __name(start, "start");
}
__name(tokenizeBlankLineBefore, "tokenizeBlankLineBefore");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/html-text.js
var htmlText = {
  name: "htmlText",
  tokenize: tokenizeHtmlText
};
function tokenizeHtmlText(effects, ok, nok) {
  const self = this;
  let marker;
  let index2;
  let returnState;
  return start;
  function start(code) {
    effects.enter("htmlText");
    effects.enter("htmlTextData");
    effects.consume(code);
    return open;
  }
  __name(start, "start");
  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen;
    }
    if (code === 47) {
      effects.consume(code);
      return tagCloseStart;
    }
    if (code === 63) {
      effects.consume(code);
      return instruction;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagOpen;
    }
    return nok(code);
  }
  __name(open, "open");
  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentOpenInside;
    }
    if (code === 91) {
      effects.consume(code);
      index2 = 0;
      return cdataOpenInside;
    }
    if (asciiAlpha(code)) {
      effects.consume(code);
      return declaration;
    }
    return nok(code);
  }
  __name(declarationOpen, "declarationOpen");
  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return commentEnd;
    }
    return nok(code);
  }
  __name(commentOpenInside, "commentOpenInside");
  function comment(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 45) {
      effects.consume(code);
      return commentClose;
    }
    if (markdownLineEnding(code)) {
      returnState = comment;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return comment;
  }
  __name(comment, "comment");
  function commentClose(code) {
    if (code === 45) {
      effects.consume(code);
      return commentEnd;
    }
    return comment(code);
  }
  __name(commentClose, "commentClose");
  function commentEnd(code) {
    return code === 62 ? end(code) : code === 45 ? commentClose(code) : comment(code);
  }
  __name(commentEnd, "commentEnd");
  function cdataOpenInside(code) {
    const value = "CDATA[";
    if (code === value.charCodeAt(index2++)) {
      effects.consume(code);
      return index2 === value.length ? cdata : cdataOpenInside;
    }
    return nok(code);
  }
  __name(cdataOpenInside, "cdataOpenInside");
  function cdata(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 93) {
      effects.consume(code);
      return cdataClose;
    }
    if (markdownLineEnding(code)) {
      returnState = cdata;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return cdata;
  }
  __name(cdata, "cdata");
  function cdataClose(code) {
    if (code === 93) {
      effects.consume(code);
      return cdataEnd;
    }
    return cdata(code);
  }
  __name(cdataClose, "cdataClose");
  function cdataEnd(code) {
    if (code === 62) {
      return end(code);
    }
    if (code === 93) {
      effects.consume(code);
      return cdataEnd;
    }
    return cdata(code);
  }
  __name(cdataEnd, "cdataEnd");
  function declaration(code) {
    if (code === null || code === 62) {
      return end(code);
    }
    if (markdownLineEnding(code)) {
      returnState = declaration;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return declaration;
  }
  __name(declaration, "declaration");
  function instruction(code) {
    if (code === null) {
      return nok(code);
    }
    if (code === 63) {
      effects.consume(code);
      return instructionClose;
    }
    if (markdownLineEnding(code)) {
      returnState = instruction;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return instruction;
  }
  __name(instruction, "instruction");
  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code);
  }
  __name(instructionClose, "instructionClose");
  function tagCloseStart(code) {
    if (asciiAlpha(code)) {
      effects.consume(code);
      return tagClose;
    }
    return nok(code);
  }
  __name(tagCloseStart, "tagCloseStart");
  function tagClose(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagClose;
    }
    return tagCloseBetween(code);
  }
  __name(tagClose, "tagClose");
  function tagCloseBetween(code) {
    if (markdownLineEnding(code)) {
      returnState = tagCloseBetween;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagCloseBetween;
    }
    return end(code);
  }
  __name(tagCloseBetween, "tagCloseBetween");
  function tagOpen(code) {
    if (code === 45 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagOpen;
    }
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    return nok(code);
  }
  __name(tagOpen, "tagOpen");
  function tagOpenBetween(code) {
    if (code === 47) {
      effects.consume(code);
      return end;
    }
    if (code === 58 || code === 95 || asciiAlpha(code)) {
      effects.consume(code);
      return tagOpenAttributeName;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenBetween;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenBetween;
    }
    return end(code);
  }
  __name(tagOpenBetween, "tagOpenBetween");
  function tagOpenAttributeName(code) {
    if (code === 45 || code === 46 || code === 58 || code === 95 || asciiAlphanumeric(code)) {
      effects.consume(code);
      return tagOpenAttributeName;
    }
    return tagOpenAttributeNameAfter(code);
  }
  __name(tagOpenAttributeName, "tagOpenAttributeName");
  function tagOpenAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return tagOpenAttributeValueBefore;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeNameAfter;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenAttributeNameAfter;
    }
    return tagOpenBetween(code);
  }
  __name(tagOpenAttributeNameAfter, "tagOpenAttributeNameAfter");
  function tagOpenAttributeValueBefore(code) {
    if (code === null || code === 60 || code === 61 || code === 62 || code === 96) {
      return nok(code);
    }
    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return tagOpenAttributeValueQuoted;
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeValueBefore;
      return lineEndingBefore(code);
    }
    if (markdownSpace(code)) {
      effects.consume(code);
      return tagOpenAttributeValueBefore;
    }
    effects.consume(code);
    return tagOpenAttributeValueUnquoted;
  }
  __name(tagOpenAttributeValueBefore, "tagOpenAttributeValueBefore");
  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      marker = void 0;
      return tagOpenAttributeValueQuotedAfter;
    }
    if (code === null) {
      return nok(code);
    }
    if (markdownLineEnding(code)) {
      returnState = tagOpenAttributeValueQuoted;
      return lineEndingBefore(code);
    }
    effects.consume(code);
    return tagOpenAttributeValueQuoted;
  }
  __name(tagOpenAttributeValueQuoted, "tagOpenAttributeValueQuoted");
  function tagOpenAttributeValueUnquoted(code) {
    if (code === null || code === 34 || code === 39 || code === 60 || code === 61 || code === 96) {
      return nok(code);
    }
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    effects.consume(code);
    return tagOpenAttributeValueUnquoted;
  }
  __name(tagOpenAttributeValueUnquoted, "tagOpenAttributeValueUnquoted");
  function tagOpenAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownLineEndingOrSpace(code)) {
      return tagOpenBetween(code);
    }
    return nok(code);
  }
  __name(tagOpenAttributeValueQuotedAfter, "tagOpenAttributeValueQuotedAfter");
  function end(code) {
    if (code === 62) {
      effects.consume(code);
      effects.exit("htmlTextData");
      effects.exit("htmlText");
      return ok;
    }
    return nok(code);
  }
  __name(end, "end");
  function lineEndingBefore(code) {
    effects.exit("htmlTextData");
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return lineEndingAfter;
  }
  __name(lineEndingBefore, "lineEndingBefore");
  function lineEndingAfter(code) {
    return markdownSpace(code) ? factorySpace(
      effects,
      lineEndingAfterPrefix,
      "linePrefix",
      self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(code) : lineEndingAfterPrefix(code);
  }
  __name(lineEndingAfter, "lineEndingAfter");
  function lineEndingAfterPrefix(code) {
    effects.enter("htmlTextData");
    return returnState(code);
  }
  __name(lineEndingAfterPrefix, "lineEndingAfterPrefix");
}
__name(tokenizeHtmlText, "tokenizeHtmlText");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/label-end.js
var labelEnd = {
  name: "labelEnd",
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var referenceFullConstruct = {
  tokenize: tokenizeReferenceFull
};
var referenceCollapsedConstruct = {
  tokenize: tokenizeReferenceCollapsed
};
function resolveAllLabelEnd(events) {
  let index2 = -1;
  while (++index2 < events.length) {
    const token = events[index2][1];
    if (token.type === "labelImage" || token.type === "labelLink" || token.type === "labelEnd") {
      events.splice(index2 + 1, token.type === "labelImage" ? 4 : 2);
      token.type = "data";
      index2++;
    }
  }
  return events;
}
__name(resolveAllLabelEnd, "resolveAllLabelEnd");
function resolveToLabelEnd(events, context) {
  let index2 = events.length;
  let offset = 0;
  let token;
  let open;
  let close;
  let media;
  while (index2--) {
    token = events[index2][1];
    if (open) {
      if (token.type === "link" || token.type === "labelLink" && token._inactive) {
        break;
      }
      if (events[index2][0] === "enter" && token.type === "labelLink") {
        token._inactive = true;
      }
    } else if (close) {
      if (events[index2][0] === "enter" && (token.type === "labelImage" || token.type === "labelLink") && !token._balanced) {
        open = index2;
        if (token.type !== "labelLink") {
          offset = 2;
          break;
        }
      }
    } else if (token.type === "labelEnd") {
      close = index2;
    }
  }
  const group = {
    type: events[open][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  const label = {
    type: "label",
    start: Object.assign({}, events[open][1].start),
    end: Object.assign({}, events[close][1].end)
  };
  const text3 = {
    type: "labelText",
    start: Object.assign({}, events[open + offset + 2][1].end),
    end: Object.assign({}, events[close - 2][1].start)
  };
  media = [
    ["enter", group, context],
    ["enter", label, context]
  ];
  media = push(media, events.slice(open + 1, open + offset + 3));
  media = push(media, [["enter", text3, context]]);
  media = push(
    media,
    resolveAll(
      context.parser.constructs.insideSpan.null,
      events.slice(open + offset + 4, close - 3),
      context
    )
  );
  media = push(media, [
    ["exit", text3, context],
    events[close - 2],
    events[close - 1],
    ["exit", label, context]
  ]);
  media = push(media, events.slice(close + 1));
  media = push(media, [["exit", group, context]]);
  splice(events, open, events.length, media);
  return events;
}
__name(resolveToLabelEnd, "resolveToLabelEnd");
function tokenizeLabelEnd(effects, ok, nok) {
  const self = this;
  let index2 = self.events.length;
  let labelStart;
  let defined;
  while (index2--) {
    if ((self.events[index2][1].type === "labelImage" || self.events[index2][1].type === "labelLink") && !self.events[index2][1]._balanced) {
      labelStart = self.events[index2][1];
      break;
    }
  }
  return start;
  function start(code) {
    if (!labelStart) {
      return nok(code);
    }
    if (labelStart._inactive) {
      return labelEndNok(code);
    }
    defined = self.parser.defined.includes(
      normalizeIdentifier(
        self.sliceSerialize({
          start: labelStart.end,
          end: self.now()
        })
      )
    );
    effects.enter("labelEnd");
    effects.enter("labelMarker");
    effects.consume(code);
    effects.exit("labelMarker");
    effects.exit("labelEnd");
    return after;
  }
  __name(start, "start");
  function after(code) {
    if (code === 40) {
      return effects.attempt(
        resourceConstruct,
        labelEndOk,
        defined ? labelEndOk : labelEndNok
      )(code);
    }
    if (code === 91) {
      return effects.attempt(
        referenceFullConstruct,
        labelEndOk,
        defined ? referenceNotFull : labelEndNok
      )(code);
    }
    return defined ? labelEndOk(code) : labelEndNok(code);
  }
  __name(after, "after");
  function referenceNotFull(code) {
    return effects.attempt(
      referenceCollapsedConstruct,
      labelEndOk,
      labelEndNok
    )(code);
  }
  __name(referenceNotFull, "referenceNotFull");
  function labelEndOk(code) {
    return ok(code);
  }
  __name(labelEndOk, "labelEndOk");
  function labelEndNok(code) {
    labelStart._balanced = true;
    return nok(code);
  }
  __name(labelEndNok, "labelEndNok");
}
__name(tokenizeLabelEnd, "tokenizeLabelEnd");
function tokenizeResource(effects, ok, nok) {
  return resourceStart;
  function resourceStart(code) {
    effects.enter("resource");
    effects.enter("resourceMarker");
    effects.consume(code);
    effects.exit("resourceMarker");
    return resourceBefore;
  }
  __name(resourceStart, "resourceStart");
  function resourceBefore(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
  }
  __name(resourceBefore, "resourceBefore");
  function resourceOpen(code) {
    if (code === 41) {
      return resourceEnd(code);
    }
    return factoryDestination(
      effects,
      resourceDestinationAfter,
      resourceDestinationMissing,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      32
    )(code);
  }
  __name(resourceOpen, "resourceOpen");
  function resourceDestinationAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
  }
  __name(resourceDestinationAfter, "resourceDestinationAfter");
  function resourceDestinationMissing(code) {
    return nok(code);
  }
  __name(resourceDestinationMissing, "resourceDestinationMissing");
  function resourceBetween(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(
        effects,
        resourceTitleAfter,
        nok,
        "resourceTitle",
        "resourceTitleMarker",
        "resourceTitleString"
      )(code);
    }
    return resourceEnd(code);
  }
  __name(resourceBetween, "resourceBetween");
  function resourceTitleAfter(code) {
    return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
  }
  __name(resourceTitleAfter, "resourceTitleAfter");
  function resourceEnd(code) {
    if (code === 41) {
      effects.enter("resourceMarker");
      effects.consume(code);
      effects.exit("resourceMarker");
      effects.exit("resource");
      return ok;
    }
    return nok(code);
  }
  __name(resourceEnd, "resourceEnd");
}
__name(tokenizeResource, "tokenizeResource");
function tokenizeReferenceFull(effects, ok, nok) {
  const self = this;
  return referenceFull;
  function referenceFull(code) {
    return factoryLabel.call(
      self,
      effects,
      referenceFullAfter,
      referenceFullMissing,
      "reference",
      "referenceMarker",
      "referenceString"
    )(code);
  }
  __name(referenceFull, "referenceFull");
  function referenceFullAfter(code) {
    return self.parser.defined.includes(
      normalizeIdentifier(
        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
      )
    ) ? ok(code) : nok(code);
  }
  __name(referenceFullAfter, "referenceFullAfter");
  function referenceFullMissing(code) {
    return nok(code);
  }
  __name(referenceFullMissing, "referenceFullMissing");
}
__name(tokenizeReferenceFull, "tokenizeReferenceFull");
function tokenizeReferenceCollapsed(effects, ok, nok) {
  return referenceCollapsedStart;
  function referenceCollapsedStart(code) {
    effects.enter("reference");
    effects.enter("referenceMarker");
    effects.consume(code);
    effects.exit("referenceMarker");
    return referenceCollapsedOpen;
  }
  __name(referenceCollapsedStart, "referenceCollapsedStart");
  function referenceCollapsedOpen(code) {
    if (code === 93) {
      effects.enter("referenceMarker");
      effects.consume(code);
      effects.exit("referenceMarker");
      effects.exit("reference");
      return ok;
    }
    return nok(code);
  }
  __name(referenceCollapsedOpen, "referenceCollapsedOpen");
}
__name(tokenizeReferenceCollapsed, "tokenizeReferenceCollapsed");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/label-start-image.js
var labelStartImage = {
  name: "labelStartImage",
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartImage(effects, ok, nok) {
  const self = this;
  return start;
  function start(code) {
    effects.enter("labelImage");
    effects.enter("labelImageMarker");
    effects.consume(code);
    effects.exit("labelImageMarker");
    return open;
  }
  __name(start, "start");
  function open(code) {
    if (code === 91) {
      effects.enter("labelMarker");
      effects.consume(code);
      effects.exit("labelMarker");
      effects.exit("labelImage");
      return after;
    }
    return nok(code);
  }
  __name(open, "open");
  function after(code) {
    return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
  }
  __name(after, "after");
}
__name(tokenizeLabelStartImage, "tokenizeLabelStartImage");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/label-start-link.js
var labelStartLink = {
  name: "labelStartLink",
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd.resolveAll
};
function tokenizeLabelStartLink(effects, ok, nok) {
  const self = this;
  return start;
  function start(code) {
    effects.enter("labelLink");
    effects.enter("labelMarker");
    effects.consume(code);
    effects.exit("labelMarker");
    effects.exit("labelLink");
    return after;
  }
  __name(start, "start");
  function after(code) {
    return code === 94 && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok(code);
  }
  __name(after, "after");
}
__name(tokenizeLabelStartLink, "tokenizeLabelStartLink");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/line-ending.js
var lineEnding = {
  name: "lineEnding",
  tokenize: tokenizeLineEnding
};
function tokenizeLineEnding(effects, ok) {
  return start;
  function start(code) {
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    return factorySpace(effects, ok, "linePrefix");
  }
  __name(start, "start");
}
__name(tokenizeLineEnding, "tokenizeLineEnding");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/thematic-break.js
var thematicBreak = {
  name: "thematicBreak",
  tokenize: tokenizeThematicBreak
};
function tokenizeThematicBreak(effects, ok, nok) {
  let size = 0;
  let marker;
  return start;
  function start(code) {
    effects.enter("thematicBreak");
    return before(code);
  }
  __name(start, "start");
  function before(code) {
    marker = code;
    return atBreak(code);
  }
  __name(before, "before");
  function atBreak(code) {
    if (code === marker) {
      effects.enter("thematicBreakSequence");
      return sequence(code);
    }
    if (size >= 3 && (code === null || markdownLineEnding(code))) {
      effects.exit("thematicBreak");
      return ok(code);
    }
    return nok(code);
  }
  __name(atBreak, "atBreak");
  function sequence(code) {
    if (code === marker) {
      effects.consume(code);
      size++;
      return sequence;
    }
    effects.exit("thematicBreakSequence");
    return markdownSpace(code) ? factorySpace(effects, atBreak, "whitespace")(code) : atBreak(code);
  }
  __name(sequence, "sequence");
}
__name(tokenizeThematicBreak, "tokenizeThematicBreak");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/list.js
var list = {
  name: "list",
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
var listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
var indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};
function tokenizeListStart(effects, ok, nok) {
  const self = this;
  const tail = self.events[self.events.length - 1];
  let initialSize = tail && tail[1].type === "linePrefix" ? tail[2].sliceSerialize(tail[1], true).length : 0;
  let size = 0;
  return start;
  function start(code) {
    const kind = self.containerState.type || (code === 42 || code === 43 || code === 45 ? "listUnordered" : "listOrdered");
    if (kind === "listUnordered" ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }
      if (kind === "listUnordered") {
        effects.enter("listItemPrefix");
        return code === 42 || code === 45 ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
      }
      if (!self.interrupt || code === 49) {
        effects.enter("listItemPrefix");
        effects.enter("listItemValue");
        return inside(code);
      }
    }
    return nok(code);
  }
  __name(start, "start");
  function inside(code) {
    if (asciiDigit(code) && ++size < 10) {
      effects.consume(code);
      return inside;
    }
    if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === 41 || code === 46)) {
      effects.exit("listItemValue");
      return atMarker(code);
    }
    return nok(code);
  }
  __name(inside, "inside");
  function atMarker(code) {
    effects.enter("listItemMarker");
    effects.consume(code);
    effects.exit("listItemMarker");
    self.containerState.marker = self.containerState.marker || code;
    return effects.check(
      blankLine,
      // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    );
  }
  __name(atMarker, "atMarker");
  function onBlank(code) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code);
  }
  __name(onBlank, "onBlank");
  function otherPrefix(code) {
    if (markdownSpace(code)) {
      effects.enter("listItemPrefixWhitespace");
      effects.consume(code);
      effects.exit("listItemPrefixWhitespace");
      return endOfPrefix;
    }
    return nok(code);
  }
  __name(otherPrefix, "otherPrefix");
  function endOfPrefix(code) {
    self.containerState.size = initialSize + self.sliceSerialize(effects.exit("listItemPrefix"), true).length;
    return ok(code);
  }
  __name(endOfPrefix, "endOfPrefix");
}
__name(tokenizeListStart, "tokenizeListStart");
function tokenizeListContinuation(effects, ok, nok) {
  const self = this;
  self.containerState._closeFlow = void 0;
  return effects.check(blankLine, onBlank, notBlank);
  function onBlank(code) {
    self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
    return factorySpace(
      effects,
      ok,
      "listItemIndent",
      self.containerState.size + 1
    )(code);
  }
  __name(onBlank, "onBlank");
  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
      self.containerState.furtherBlankLines = void 0;
      self.containerState.initialBlankLine = void 0;
      return notInCurrentItem(code);
    }
    self.containerState.furtherBlankLines = void 0;
    self.containerState.initialBlankLine = void 0;
    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code);
  }
  __name(notBlank, "notBlank");
  function notInCurrentItem(code) {
    self.containerState._closeFlow = true;
    self.interrupt = void 0;
    return factorySpace(
      effects,
      effects.attempt(list, ok, nok),
      "linePrefix",
      self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(code);
  }
  __name(notInCurrentItem, "notInCurrentItem");
}
__name(tokenizeListContinuation, "tokenizeListContinuation");
function tokenizeIndent(effects, ok, nok) {
  const self = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemIndent",
    self.containerState.size + 1
  );
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return tail && tail[1].type === "listItemIndent" && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok(code) : nok(code);
  }
  __name(afterPrefix, "afterPrefix");
}
__name(tokenizeIndent, "tokenizeIndent");
function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}
__name(tokenizeListEnd, "tokenizeListEnd");
function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  const self = this;
  return factorySpace(
    effects,
    afterPrefix,
    "listItemPrefixWhitespace",
    self.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function afterPrefix(code) {
    const tail = self.events[self.events.length - 1];
    return !markdownSpace(code) && tail && tail[1].type === "listItemPrefixWhitespace" ? ok(code) : nok(code);
  }
  __name(afterPrefix, "afterPrefix");
}
__name(tokenizeListItemPrefixWhitespace, "tokenizeListItemPrefixWhitespace");

// ../../node_modules/.pnpm/micromark-core-commonmark@1.1.0/node_modules/micromark-core-commonmark/lib/setext-underline.js
var setextUnderline = {
  name: "setextUnderline",
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};
function resolveToSetextUnderline(events, context) {
  let index2 = events.length;
  let content3;
  let text3;
  let definition2;
  while (index2--) {
    if (events[index2][0] === "enter") {
      if (events[index2][1].type === "content") {
        content3 = index2;
        break;
      }
      if (events[index2][1].type === "paragraph") {
        text3 = index2;
      }
    } else {
      if (events[index2][1].type === "content") {
        events.splice(index2, 1);
      }
      if (!definition2 && events[index2][1].type === "definition") {
        definition2 = index2;
      }
    }
  }
  const heading = {
    type: "setextHeading",
    start: Object.assign({}, events[text3][1].start),
    end: Object.assign({}, events[events.length - 1][1].end)
  };
  events[text3][1].type = "setextHeadingText";
  if (definition2) {
    events.splice(text3, 0, ["enter", heading, context]);
    events.splice(definition2 + 1, 0, ["exit", events[content3][1], context]);
    events[content3][1].end = Object.assign({}, events[definition2][1].end);
  } else {
    events[content3][1] = heading;
  }
  events.push(["exit", heading, context]);
  return events;
}
__name(resolveToSetextUnderline, "resolveToSetextUnderline");
function tokenizeSetextUnderline(effects, ok, nok) {
  const self = this;
  let marker;
  return start;
  function start(code) {
    let index2 = self.events.length;
    let paragraph;
    while (index2--) {
      if (self.events[index2][1].type !== "lineEnding" && self.events[index2][1].type !== "linePrefix" && self.events[index2][1].type !== "content") {
        paragraph = self.events[index2][1].type === "paragraph";
        break;
      }
    }
    if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
      effects.enter("setextHeadingLine");
      marker = code;
      return before(code);
    }
    return nok(code);
  }
  __name(start, "start");
  function before(code) {
    effects.enter("setextHeadingLineSequence");
    return inside(code);
  }
  __name(before, "before");
  function inside(code) {
    if (code === marker) {
      effects.consume(code);
      return inside;
    }
    effects.exit("setextHeadingLineSequence");
    return markdownSpace(code) ? factorySpace(effects, after, "lineSuffix")(code) : after(code);
  }
  __name(inside, "inside");
  function after(code) {
    if (code === null || markdownLineEnding(code)) {
      effects.exit("setextHeadingLine");
      return ok(code);
    }
    return nok(code);
  }
  __name(after, "after");
}
__name(tokenizeSetextUnderline, "tokenizeSetextUnderline");

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/initialize/flow.js
var flow = {
  tokenize: initializeFlow
};
function initializeFlow(effects) {
  const self = this;
  const initial = effects.attempt(
    // Try to parse a blank line.
    blankLine,
    atBlankEnding,
    // Try to parse initial flow (essentially, only code).
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content2, afterConstruct)
        ),
        "linePrefix"
      )
    )
  );
  return initial;
  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEndingBlank");
    effects.consume(code);
    effects.exit("lineEndingBlank");
    self.currentConstruct = void 0;
    return initial;
  }
  __name(atBlankEnding, "atBlankEnding");
  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return;
    }
    effects.enter("lineEnding");
    effects.consume(code);
    effects.exit("lineEnding");
    self.currentConstruct = void 0;
    return initial;
  }
  __name(afterConstruct, "afterConstruct");
}
__name(initializeFlow, "initializeFlow");

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/initialize/text.js
var resolver = {
  resolveAll: createResolver()
};
var string = initializeFactory("string");
var text = initializeFactory("text");
function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === "text" ? resolveAllLineSuffixes : void 0
    )
  };
  function initializeText(effects) {
    const self = this;
    const constructs2 = this.parser.constructs[field];
    const text3 = effects.attempt(constructs2, start, notText);
    return start;
    function start(code) {
      return atBreak(code) ? text3(code) : notText(code);
    }
    __name(start, "start");
    function notText(code) {
      if (code === null) {
        effects.consume(code);
        return;
      }
      effects.enter("data");
      effects.consume(code);
      return data;
    }
    __name(notText, "notText");
    function data(code) {
      if (atBreak(code)) {
        effects.exit("data");
        return text3(code);
      }
      effects.consume(code);
      return data;
    }
    __name(data, "data");
    function atBreak(code) {
      if (code === null) {
        return true;
      }
      const list2 = constructs2[code];
      let index2 = -1;
      if (list2) {
        while (++index2 < list2.length) {
          const item = list2[index2];
          if (!item.previous || item.previous.call(self, self.previous)) {
            return true;
          }
        }
      }
      return false;
    }
    __name(atBreak, "atBreak");
  }
  __name(initializeText, "initializeText");
}
__name(initializeFactory, "initializeFactory");
function createResolver(extraResolver) {
  return resolveAllText;
  function resolveAllText(events, context) {
    let index2 = -1;
    let enter;
    while (++index2 <= events.length) {
      if (enter === void 0) {
        if (events[index2] && events[index2][1].type === "data") {
          enter = index2;
          index2++;
        }
      } else if (!events[index2] || events[index2][1].type !== "data") {
        if (index2 !== enter + 2) {
          events[enter][1].end = events[index2 - 1][1].end;
          events.splice(enter + 2, index2 - enter - 2);
          index2 = enter + 2;
        }
        enter = void 0;
      }
    }
    return extraResolver ? extraResolver(events, context) : events;
  }
  __name(resolveAllText, "resolveAllText");
}
__name(createResolver, "createResolver");
function resolveAllLineSuffixes(events, context) {
  let eventIndex = 0;
  while (++eventIndex <= events.length) {
    if ((eventIndex === events.length || events[eventIndex][1].type === "lineEnding") && events[eventIndex - 1][1].type === "data") {
      const data = events[eventIndex - 1][1];
      const chunks = context.sliceStream(data);
      let index2 = chunks.length;
      let bufferIndex = -1;
      let size = 0;
      let tabs;
      while (index2--) {
        const chunk = chunks[index2];
        if (typeof chunk === "string") {
          bufferIndex = chunk.length;
          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }
          if (bufferIndex)
            break;
          bufferIndex = -1;
        } else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1) {
        } else {
          index2++;
          break;
        }
      }
      if (size) {
        const token = {
          type: eventIndex === events.length || tabs || size < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index2,
            _bufferIndex: index2 ? bufferIndex : data.start._bufferIndex + bufferIndex
          },
          end: Object.assign({}, data.end)
        };
        data.end = Object.assign({}, token.start);
        if (data.start.offset === data.end.offset) {
          Object.assign(data, token);
        } else {
          events.splice(
            eventIndex,
            0,
            ["enter", token, context],
            ["exit", token, context]
          );
          eventIndex += 2;
        }
      }
      eventIndex++;
    }
  }
  return events;
}
__name(resolveAllLineSuffixes, "resolveAllLineSuffixes");

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/create-tokenizer.js
function createTokenizer(parser, initialize, from) {
  let point3 = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  let consumed = true;
  const effects = {
    consume,
    enter,
    exit: exit2,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  let expectedCode;
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  __name(write, "write");
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  __name(sliceSerialize, "sliceSerialize");
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  __name(sliceStream, "sliceStream");
  function now() {
    const { line, column, offset, _index, _bufferIndex } = point3;
    return {
      line,
      column,
      offset,
      _index,
      _bufferIndex
    };
  }
  __name(now, "now");
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  __name(defineSkip, "defineSkip");
  function main() {
    let chunkIndex;
    while (point3._index < chunks.length) {
      const chunk = chunks[point3._index];
      if (typeof chunk === "string") {
        chunkIndex = point3._index;
        if (point3._bufferIndex < 0) {
          point3._bufferIndex = 0;
        }
        while (point3._index === chunkIndex && point3._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point3._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  __name(main, "main");
  function go(code) {
    consumed = void 0;
    expectedCode = code;
    state = state(code);
  }
  __name(go, "go");
  function consume(code) {
    if (markdownLineEnding(code)) {
      point3.line++;
      point3.column = 1;
      point3.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point3.column++;
      point3.offset++;
    }
    if (point3._bufferIndex < 0) {
      point3._index++;
    } else {
      point3._bufferIndex++;
      if (point3._bufferIndex === chunks[point3._index].length) {
        point3._bufferIndex = -1;
        point3._index++;
      }
    }
    context.previous = code;
    consumed = true;
  }
  __name(consume, "consume");
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  __name(enter, "enter");
  function exit2(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  __name(exit2, "exit");
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  __name(onsuccessfulconstruct, "onsuccessfulconstruct");
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  __name(onsuccessfulcheck, "onsuccessfulcheck");
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs2, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : "tokenize" in constructs2 ? (
        // @ts-expect-error Looks like a construct.
        handleListOfConstructs([constructs2])
      ) : handleMapOfConstructs(constructs2);
      function handleMapOfConstructs(map) {
        return start;
        function start(code) {
          const def = code !== null && map[code];
          const all2 = code !== null && map.null;
          const list2 = [
            // To do: add more extension tests.
            /* c8 ignore next 2 */
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
          ];
          return handleListOfConstructs(list2)(code);
        }
        __name(start, "start");
      }
      __name(handleMapOfConstructs, "handleMapOfConstructs");
      function handleListOfConstructs(list2) {
        listOfConstructs = list2;
        constructIndex = 0;
        if (list2.length === 0) {
          return bogusState;
        }
        return handleConstruct(list2[constructIndex]);
      }
      __name(handleListOfConstructs, "handleListOfConstructs");
      function handleConstruct(construct) {
        return start;
        function start(code) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok(code);
          }
          return construct.tokenize.call(
            // If we do have fields, create an object w/ `context` as its
            // prototype.
            // This allows a “live binding”, which is needed for `interrupt`.
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok,
            nok
          )(code);
        }
        __name(start, "start");
      }
      __name(handleConstruct, "handleConstruct");
      function ok(code) {
        consumed = true;
        onreturn(currentConstruct, info);
        return returnState;
      }
      __name(ok, "ok");
      function nok(code) {
        consumed = true;
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
      __name(nok, "nok");
    }
    __name(hook, "hook");
  }
  __name(constructFactory, "constructFactory");
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  __name(addResult, "addResult");
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point3 = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
    __name(restore, "restore");
  }
  __name(store, "store");
  function accountForPotentialSkip() {
    if (point3.line in columnStart && point3.column < 2) {
      point3.column = columnStart[point3.line];
      point3.offset += columnStart[point3.line] - 1;
    }
  }
  __name(accountForPotentialSkip, "accountForPotentialSkip");
}
__name(createTokenizer, "createTokenizer");
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      const head = view[0];
      if (typeof head === "string") {
        view[0] = head.slice(startBufferIndex);
      } else {
        view.shift();
      }
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
__name(sliceChunks, "sliceChunks");
function serializeChunks(chunks, expandTabs) {
  let index2 = -1;
  const result = [];
  let atTab;
  while (++index2 < chunks.length) {
    const chunk = chunks[index2];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}
__name(serializeChunks, "serializeChunks");

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/constructs.js
var constructs_exports = {};
__export(constructs_exports, {
  attentionMarkers: () => attentionMarkers,
  contentInitial: () => contentInitial,
  disable: () => disable,
  document: () => document3,
  flow: () => flow2,
  flowInitial: () => flowInitial,
  insideSpan: () => insideSpan,
  string: () => string2,
  text: () => text2
});
var document3 = {
  [42]: list,
  [43]: list,
  [45]: list,
  [48]: list,
  [49]: list,
  [50]: list,
  [51]: list,
  [52]: list,
  [53]: list,
  [54]: list,
  [55]: list,
  [56]: list,
  [57]: list,
  [62]: blockQuote
};
var contentInitial = {
  [91]: definition
};
var flowInitial = {
  [-2]: codeIndented,
  [-1]: codeIndented,
  [32]: codeIndented
};
var flow2 = {
  [35]: headingAtx,
  [42]: thematicBreak,
  [45]: [setextUnderline, thematicBreak],
  [60]: htmlFlow,
  [61]: setextUnderline,
  [95]: thematicBreak,
  [96]: codeFenced,
  [126]: codeFenced
};
var string2 = {
  [38]: characterReference,
  [92]: characterEscape
};
var text2 = {
  [-5]: lineEnding,
  [-4]: lineEnding,
  [-3]: lineEnding,
  [33]: labelStartImage,
  [38]: characterReference,
  [42]: attention,
  [60]: [autolink, htmlText],
  [91]: labelStartLink,
  [92]: [hardBreakEscape, characterEscape],
  [93]: labelEnd,
  [95]: attention,
  [96]: codeText
};
var insideSpan = {
  null: [attention, resolver]
};
var attentionMarkers = {
  null: [42, 95]
};
var disable = {
  null: []
};

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/parse.js
function parse(options) {
  const settings = options || {};
  const constructs2 = (
    /** @type {FullNormalizedExtension} */
    combineExtensions([constructs_exports, ...settings.extensions || []])
  );
  const parser = {
    defined: [],
    lazy: {},
    constructs: constructs2,
    content: create(content),
    document: create(document2),
    flow: create(flow),
    string: create(string),
    text: create(text)
  };
  return parser;
  function create(initial) {
    return creator;
    function creator(from) {
      return createTokenizer(parser, initial, from);
    }
    __name(creator, "creator");
  }
  __name(create, "create");
}
__name(parse, "parse");

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/preprocess.js
var search = /[\0\t\n\r]/g;
function preprocess() {
  let column = 1;
  let buffer = "";
  let start = true;
  let atCarriageReturn;
  return preprocessor;
  function preprocessor(value, encoding, end) {
    const chunks = [];
    let match;
    let next;
    let startPosition;
    let endPosition;
    let code;
    value = buffer + value.toString(encoding);
    startPosition = 0;
    buffer = "";
    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }
      start = void 0;
    }
    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match && match.index !== void 0 ? match.index : value.length;
      code = value.charCodeAt(endPosition);
      if (!match) {
        buffer = value.slice(startPosition);
        break;
      }
      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = void 0;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = void 0;
        }
        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }
        switch (code) {
          case 0: {
            chunks.push(65533);
            column++;
            break;
          }
          case 9: {
            next = Math.ceil(column / 4) * 4;
            chunks.push(-2);
            while (column++ < next)
              chunks.push(-1);
            break;
          }
          case 10: {
            chunks.push(-4);
            column = 1;
            break;
          }
          default: {
            atCarriageReturn = true;
            column = 1;
          }
        }
      }
      startPosition = endPosition + 1;
    }
    if (end) {
      if (atCarriageReturn)
        chunks.push(-5);
      if (buffer)
        chunks.push(buffer);
      chunks.push(null);
    }
    return chunks;
  }
  __name(preprocessor, "preprocessor");
}
__name(preprocess, "preprocess");

// ../../node_modules/.pnpm/micromark@3.2.0/node_modules/micromark/lib/postprocess.js
function postprocess(events) {
  while (!subtokenize(events)) {
  }
  return events;
}
__name(postprocess, "postprocess");

// ../../node_modules/.pnpm/micromark-util-decode-numeric-character-reference@1.1.0/node_modules/micromark-util-decode-numeric-character-reference/index.js
function decodeNumericCharacterReference(value, base) {
  const code = Number.parseInt(value, base);
  if (
    // C0 except for HT, LF, FF, CR, space.
    code < 9 || code === 11 || code > 13 && code < 32 || // Control character (DEL) of C0, and C1 controls.
    code > 126 && code < 160 || // Lone high surrogates and low surrogates.
    code > 55295 && code < 57344 || // Noncharacters.
    code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || // Out of range
    code > 1114111
  ) {
    return "\uFFFD";
  }
  return String.fromCharCode(code);
}
__name(decodeNumericCharacterReference, "decodeNumericCharacterReference");

// ../../node_modules/.pnpm/micromark-util-decode-string@1.1.0/node_modules/micromark-util-decode-string/index.js
var characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function decodeString(value) {
  return value.replace(characterEscapeOrReference, decode);
}
__name(decodeString, "decodeString");
function decode($0, $1, $2) {
  if ($1) {
    return $1;
  }
  const head = $2.charCodeAt(0);
  if (head === 35) {
    const head2 = $2.charCodeAt(1);
    const hex = head2 === 120 || head2 === 88;
    return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? 16 : 10);
  }
  return decodeNamedCharacterReference($2) || $0;
}
__name(decode, "decode");

// ../../node_modules/.pnpm/unist-util-stringify-position@3.0.3/node_modules/unist-util-stringify-position/lib/index.js
function stringifyPosition(value) {
  if (!value || typeof value !== "object") {
    return "";
  }
  if ("position" in value || "type" in value) {
    return position(value.position);
  }
  if ("start" in value || "end" in value) {
    return position(value);
  }
  if ("line" in value || "column" in value) {
    return point(value);
  }
  return "";
}
__name(stringifyPosition, "stringifyPosition");
function point(point3) {
  return index(point3 && point3.line) + ":" + index(point3 && point3.column);
}
__name(point, "point");
function position(pos) {
  return point(pos && pos.start) + "-" + point(pos && pos.end);
}
__name(position, "position");
function index(value) {
  return value && typeof value === "number" ? value : 1;
}
__name(index, "index");

// ../../node_modules/.pnpm/mdast-util-from-markdown@1.3.0/node_modules/mdast-util-from-markdown/lib/index.js
var own = {}.hasOwnProperty;
var fromMarkdown = (
  /**
   * @type {(
   *   ((value: Value, encoding: Encoding, options?: Options | null | undefined) => Root) &
   *   ((value: Value, options?: Options | null | undefined) => Root)
   * )}
   */
  /**
   * @param {Value} value
   * @param {Encoding | Options | null | undefined} [encoding]
   * @param {Options | null | undefined} [options]
   * @returns {Root}
   */
  /* @__PURE__ */ __name(function(value, encoding, options) {
    if (typeof encoding !== "string") {
      options = encoding;
      encoding = void 0;
    }
    return compiler(options)(
      postprocess(
        // @ts-expect-error: micromark types need to accept `null`.
        parse(options).document().write(preprocess()(value, encoding, true))
      )
    );
  }, "fromMarkdown")
);
function compiler(options) {
  const config = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: opener(link),
      autolinkProtocol: onenterdata,
      autolinkEmail: onenterdata,
      atxHeading: opener(heading),
      blockQuote: opener(blockQuote2),
      characterEscape: onenterdata,
      characterReference: onenterdata,
      codeFenced: opener(codeFlow),
      codeFencedFenceInfo: buffer,
      codeFencedFenceMeta: buffer,
      codeIndented: opener(codeFlow, buffer),
      codeText: opener(codeText2, buffer),
      codeTextData: onenterdata,
      data: onenterdata,
      codeFlowValue: onenterdata,
      definition: opener(definition2),
      definitionDestinationString: buffer,
      definitionLabelString: buffer,
      definitionTitleString: buffer,
      emphasis: opener(emphasis),
      hardBreakEscape: opener(hardBreak),
      hardBreakTrailing: opener(hardBreak),
      htmlFlow: opener(html, buffer),
      htmlFlowData: onenterdata,
      htmlText: opener(html, buffer),
      htmlTextData: onenterdata,
      image: opener(image),
      label: buffer,
      link: opener(link),
      listItem: opener(listItem),
      listItemValue: onenterlistitemvalue,
      listOrdered: opener(list2, onenterlistordered),
      listUnordered: opener(list2),
      paragraph: opener(paragraph),
      reference: onenterreference,
      referenceString: buffer,
      resourceDestinationString: buffer,
      resourceTitleString: buffer,
      setextHeading: opener(heading),
      strong: opener(strong),
      thematicBreak: opener(thematicBreak2)
    },
    exit: {
      atxHeading: closer(),
      atxHeadingSequence: onexitatxheadingsequence,
      autolink: closer(),
      autolinkEmail: onexitautolinkemail,
      autolinkProtocol: onexitautolinkprotocol,
      blockQuote: closer(),
      characterEscapeValue: onexitdata,
      characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
      characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
      characterReferenceValue: onexitcharacterreferencevalue,
      codeFenced: closer(onexitcodefenced),
      codeFencedFence: onexitcodefencedfence,
      codeFencedFenceInfo: onexitcodefencedfenceinfo,
      codeFencedFenceMeta: onexitcodefencedfencemeta,
      codeFlowValue: onexitdata,
      codeIndented: closer(onexitcodeindented),
      codeText: closer(onexitcodetext),
      codeTextData: onexitdata,
      data: onexitdata,
      definition: closer(),
      definitionDestinationString: onexitdefinitiondestinationstring,
      definitionLabelString: onexitdefinitionlabelstring,
      definitionTitleString: onexitdefinitiontitlestring,
      emphasis: closer(),
      hardBreakEscape: closer(onexithardbreak),
      hardBreakTrailing: closer(onexithardbreak),
      htmlFlow: closer(onexithtmlflow),
      htmlFlowData: onexitdata,
      htmlText: closer(onexithtmltext),
      htmlTextData: onexitdata,
      image: closer(onexitimage),
      label: onexitlabel,
      labelText: onexitlabeltext,
      lineEnding: onexitlineending,
      link: closer(onexitlink),
      listItem: closer(),
      listOrdered: closer(),
      listUnordered: closer(),
      paragraph: closer(),
      referenceString: onexitreferencestring,
      resourceDestinationString: onexitresourcedestinationstring,
      resourceTitleString: onexitresourcetitlestring,
      resource: onexitresource,
      setextHeading: closer(onexitsetextheading),
      setextHeadingLineSequence: onexitsetextheadinglinesequence,
      setextHeadingText: onexitsetextheadingtext,
      strong: closer(),
      thematicBreak: closer()
    }
  };
  configure(config, (options || {}).mdastExtensions || []);
  const data = {};
  return compile;
  function compile(events) {
    let tree = {
      type: "root",
      children: []
    };
    const context = {
      stack: [tree],
      tokenStack: [],
      config,
      enter,
      exit: exit2,
      buffer,
      resume,
      setData,
      getData
    };
    const listStack = [];
    let index2 = -1;
    while (++index2 < events.length) {
      if (events[index2][1].type === "listOrdered" || events[index2][1].type === "listUnordered") {
        if (events[index2][0] === "enter") {
          listStack.push(index2);
        } else {
          const tail = listStack.pop();
          index2 = prepareList(events, tail, index2);
        }
      }
    }
    index2 = -1;
    while (++index2 < events.length) {
      const handler = config[events[index2][0]];
      if (own.call(handler, events[index2][1].type)) {
        handler[events[index2][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index2][2].sliceSerialize
            },
            context
          ),
          events[index2][1]
        );
      }
    }
    if (context.tokenStack.length > 0) {
      const tail = context.tokenStack[context.tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point2(
        events.length > 0 ? events[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: point2(
        events.length > 0 ? events[events.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    };
    index2 = -1;
    while (++index2 < config.transforms.length) {
      tree = config.transforms[index2](tree) || tree;
    }
    return tree;
  }
  __name(compile, "compile");
  function prepareList(events, start, length) {
    let index2 = start - 1;
    let containerBalance = -1;
    let listSpread = false;
    let listItem2;
    let lineIndex;
    let firstBlankLineIndex;
    let atMarker;
    while (++index2 <= length) {
      const event = events[index2];
      if (event[1].type === "listUnordered" || event[1].type === "listOrdered" || event[1].type === "blockQuote") {
        if (event[0] === "enter") {
          containerBalance++;
        } else {
          containerBalance--;
        }
        atMarker = void 0;
      } else if (event[1].type === "lineEndingBlank") {
        if (event[0] === "enter") {
          if (listItem2 && !atMarker && !containerBalance && !firstBlankLineIndex) {
            firstBlankLineIndex = index2;
          }
          atMarker = void 0;
        }
      } else if (event[1].type === "linePrefix" || event[1].type === "listItemValue" || event[1].type === "listItemMarker" || event[1].type === "listItemPrefix" || event[1].type === "listItemPrefixWhitespace") {
      } else {
        atMarker = void 0;
      }
      if (!containerBalance && event[0] === "enter" && event[1].type === "listItemPrefix" || containerBalance === -1 && event[0] === "exit" && (event[1].type === "listUnordered" || event[1].type === "listOrdered")) {
        if (listItem2) {
          let tailIndex = index2;
          lineIndex = void 0;
          while (tailIndex--) {
            const tailEvent = events[tailIndex];
            if (tailEvent[1].type === "lineEnding" || tailEvent[1].type === "lineEndingBlank") {
              if (tailEvent[0] === "exit")
                continue;
              if (lineIndex) {
                events[lineIndex][1].type = "lineEndingBlank";
                listSpread = true;
              }
              tailEvent[1].type = "lineEnding";
              lineIndex = tailIndex;
            } else if (tailEvent[1].type === "linePrefix" || tailEvent[1].type === "blockQuotePrefix" || tailEvent[1].type === "blockQuotePrefixWhitespace" || tailEvent[1].type === "blockQuoteMarker" || tailEvent[1].type === "listItemIndent") {
            } else {
              break;
            }
          }
          if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
            listItem2._spread = true;
          }
          listItem2.end = Object.assign(
            {},
            lineIndex ? events[lineIndex][1].start : event[1].end
          );
          events.splice(lineIndex || index2, 0, ["exit", listItem2, event[2]]);
          index2++;
          length++;
        }
        if (event[1].type === "listItemPrefix") {
          listItem2 = {
            type: "listItem",
            // @ts-expect-error Patched
            _spread: false,
            start: Object.assign({}, event[1].start)
          };
          events.splice(index2, 0, ["enter", listItem2, event[2]]);
          index2++;
          length++;
          firstBlankLineIndex = void 0;
          atMarker = true;
        }
      }
    }
    events[start][1]._spread = listSpread;
    return length;
  }
  __name(prepareList, "prepareList");
  function setData(key, value) {
    data[key] = value;
  }
  __name(setData, "setData");
  function getData(key) {
    return data[key];
  }
  __name(getData, "getData");
  function opener(create, and) {
    return open;
    function open(token) {
      enter.call(this, create(token), token);
      if (and)
        and.call(this, token);
    }
    __name(open, "open");
  }
  __name(opener, "opener");
  function buffer() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  __name(buffer, "buffer");
  function enter(node2, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node2);
    this.stack.push(node2);
    this.tokenStack.push([token, errorHandler]);
    node2.position = {
      start: point2(token.start)
    };
    return node2;
  }
  __name(enter, "enter");
  function closer(and) {
    return close;
    function close(token) {
      if (and)
        and.call(this, token);
      exit2.call(this, token);
    }
    __name(close, "close");
  }
  __name(closer, "closer");
  function exit2(token, onExitError) {
    const node2 = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node2.position.end = point2(token.end);
    return node2;
  }
  __name(exit2, "exit");
  function resume() {
    return toString(this.stack.pop());
  }
  __name(resume, "resume");
  function onenterlistordered() {
    setData("expectingFirstListItemValue", true);
  }
  __name(onenterlistordered, "onenterlistordered");
  function onenterlistitemvalue(token) {
    if (getData("expectingFirstListItemValue")) {
      const ancestor = this.stack[this.stack.length - 2];
      ancestor.start = Number.parseInt(this.sliceSerialize(token), 10);
      setData("expectingFirstListItemValue");
    }
  }
  __name(onenterlistitemvalue, "onenterlistitemvalue");
  function onexitcodefencedfenceinfo() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.lang = data2;
  }
  __name(onexitcodefencedfenceinfo, "onexitcodefencedfenceinfo");
  function onexitcodefencedfencemeta() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.meta = data2;
  }
  __name(onexitcodefencedfencemeta, "onexitcodefencedfencemeta");
  function onexitcodefencedfence() {
    if (getData("flowCodeInside"))
      return;
    this.buffer();
    setData("flowCodeInside", true);
  }
  __name(onexitcodefencedfence, "onexitcodefencedfence");
  function onexitcodefenced() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
    setData("flowCodeInside");
  }
  __name(onexitcodefenced, "onexitcodefenced");
  function onexitcodeindented() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2.replace(/(\r?\n|\r)$/g, "");
  }
  __name(onexitcodeindented, "onexitcodeindented");
  function onexitdefinitionlabelstring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
  }
  __name(onexitdefinitionlabelstring, "onexitdefinitionlabelstring");
  function onexitdefinitiontitlestring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data2;
  }
  __name(onexitdefinitiontitlestring, "onexitdefinitiontitlestring");
  function onexitdefinitiondestinationstring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data2;
  }
  __name(onexitdefinitiondestinationstring, "onexitdefinitiondestinationstring");
  function onexitatxheadingsequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    if (!node2.depth) {
      const depth = this.sliceSerialize(token).length;
      node2.depth = depth;
    }
  }
  __name(onexitatxheadingsequence, "onexitatxheadingsequence");
  function onexitsetextheadingtext() {
    setData("setextHeadingSlurpLineEnding", true);
  }
  __name(onexitsetextheadingtext, "onexitsetextheadingtext");
  function onexitsetextheadinglinesequence(token) {
    const node2 = this.stack[this.stack.length - 1];
    node2.depth = this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
  }
  __name(onexitsetextheadinglinesequence, "onexitsetextheadinglinesequence");
  function onexitsetextheading() {
    setData("setextHeadingSlurpLineEnding");
  }
  __name(onexitsetextheading, "onexitsetextheading");
  function onenterdata(token) {
    const node2 = this.stack[this.stack.length - 1];
    let tail = node2.children[node2.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text3();
      tail.position = {
        start: point2(token.start)
      };
      node2.children.push(tail);
    }
    this.stack.push(tail);
  }
  __name(onenterdata, "onenterdata");
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point2(token.end);
  }
  __name(onexitdata, "onexitdata");
  function onexitlineending(token) {
    const context = this.stack[this.stack.length - 1];
    if (getData("atHardBreak")) {
      const tail = context.children[context.children.length - 1];
      tail.position.end = point2(token.end);
      setData("atHardBreak");
      return;
    }
    if (!getData("setextHeadingSlurpLineEnding") && config.canContainEols.includes(context.type)) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }
  __name(onexitlineending, "onexitlineending");
  function onexithardbreak() {
    setData("atHardBreak", true);
  }
  __name(onexithardbreak, "onexithardbreak");
  function onexithtmlflow() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  __name(onexithtmlflow, "onexithtmlflow");
  function onexithtmltext() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  __name(onexithtmltext, "onexithtmltext");
  function onexitcodetext() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.value = data2;
  }
  __name(onexitcodetext, "onexitcodetext");
  function onexitlink() {
    const node2 = this.stack[this.stack.length - 1];
    if (getData("inReference")) {
      const referenceType = getData("referenceType") || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    setData("referenceType");
  }
  __name(onexitlink, "onexitlink");
  function onexitimage() {
    const node2 = this.stack[this.stack.length - 1];
    if (getData("inReference")) {
      const referenceType = getData("referenceType") || "shortcut";
      node2.type += "Reference";
      node2.referenceType = referenceType;
      delete node2.url;
      delete node2.title;
    } else {
      delete node2.identifier;
      delete node2.label;
    }
    setData("referenceType");
  }
  __name(onexitimage, "onexitimage");
  function onexitlabeltext(token) {
    const string3 = this.sliceSerialize(token);
    const ancestor = this.stack[this.stack.length - 2];
    ancestor.label = decodeString(string3);
    ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
  }
  __name(onexitlabeltext, "onexitlabeltext");
  function onexitlabel() {
    const fragment = this.stack[this.stack.length - 1];
    const value = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    setData("inReference", true);
    if (node2.type === "link") {
      const children = fragment.children;
      node2.children = children;
    } else {
      node2.alt = value;
    }
  }
  __name(onexitlabel, "onexitlabel");
  function onexitresourcedestinationstring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.url = data2;
  }
  __name(onexitresourcedestinationstring, "onexitresourcedestinationstring");
  function onexitresourcetitlestring() {
    const data2 = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.title = data2;
  }
  __name(onexitresourcetitlestring, "onexitresourcetitlestring");
  function onexitresource() {
    setData("inReference");
  }
  __name(onexitresource, "onexitresource");
  function onenterreference() {
    setData("referenceType", "collapsed");
  }
  __name(onenterreference, "onenterreference");
  function onexitreferencestring(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    node2.label = label;
    node2.identifier = normalizeIdentifier(
      this.sliceSerialize(token)
    ).toLowerCase();
    setData("referenceType", "full");
  }
  __name(onexitreferencestring, "onexitreferencestring");
  function onexitcharacterreferencemarker(token) {
    setData("characterReferenceType", token.type);
  }
  __name(onexitcharacterreferencemarker, "onexitcharacterreferencemarker");
  function onexitcharacterreferencevalue(token) {
    const data2 = this.sliceSerialize(token);
    const type = getData("characterReferenceType");
    let value;
    if (type) {
      value = decodeNumericCharacterReference(
        data2,
        type === "characterReferenceMarkerNumeric" ? 10 : 16
      );
      setData("characterReferenceType");
    } else {
      const result = decodeNamedCharacterReference(data2);
      value = result;
    }
    const tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point2(token.end);
  }
  __name(onexitcharacterreferencevalue, "onexitcharacterreferencevalue");
  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = this.sliceSerialize(token);
  }
  __name(onexitautolinkprotocol, "onexitautolinkprotocol");
  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    node2.url = "mailto:" + this.sliceSerialize(token);
  }
  __name(onexitautolinkemail, "onexitautolinkemail");
  function blockQuote2() {
    return {
      type: "blockquote",
      children: []
    };
  }
  __name(blockQuote2, "blockQuote");
  function codeFlow() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  __name(codeFlow, "codeFlow");
  function codeText2() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  __name(codeText2, "codeText");
  function definition2() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  __name(definition2, "definition");
  function emphasis() {
    return {
      type: "emphasis",
      children: []
    };
  }
  __name(emphasis, "emphasis");
  function heading() {
    return {
      type: "heading",
      depth: void 0,
      children: []
    };
  }
  __name(heading, "heading");
  function hardBreak() {
    return {
      type: "break"
    };
  }
  __name(hardBreak, "hardBreak");
  function html() {
    return {
      type: "html",
      value: ""
    };
  }
  __name(html, "html");
  function image() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  __name(image, "image");
  function link() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  __name(link, "link");
  function list2(token) {
    return {
      type: "list",
      ordered: token.type === "listOrdered",
      start: null,
      // @ts-expect-error Patched.
      spread: token._spread,
      children: []
    };
  }
  __name(list2, "list");
  function listItem(token) {
    return {
      type: "listItem",
      // @ts-expect-error Patched.
      spread: token._spread,
      checked: null,
      children: []
    };
  }
  __name(listItem, "listItem");
  function paragraph() {
    return {
      type: "paragraph",
      children: []
    };
  }
  __name(paragraph, "paragraph");
  function strong() {
    return {
      type: "strong",
      children: []
    };
  }
  __name(strong, "strong");
  function text3() {
    return {
      type: "text",
      value: ""
    };
  }
  __name(text3, "text");
  function thematicBreak2() {
    return {
      type: "thematicBreak"
    };
  }
  __name(thematicBreak2, "thematicBreak");
}
__name(compiler, "compiler");
function point2(d) {
  return {
    line: d.line,
    column: d.column,
    offset: d.offset
  };
}
__name(point2, "point");
function configure(combined, extensions) {
  let index2 = -1;
  while (++index2 < extensions.length) {
    const value = extensions[index2];
    if (Array.isArray(value)) {
      configure(combined, value);
    } else {
      extension(combined, value);
    }
  }
}
__name(configure, "configure");
function extension(combined, extension2) {
  let key;
  for (key in extension2) {
    if (own.call(extension2, key)) {
      if (key === "canContainEols") {
        const right = extension2[key];
        if (right) {
          combined[key].push(...right);
        }
      } else if (key === "transforms") {
        const right = extension2[key];
        if (right) {
          combined[key].push(...right);
        }
      } else if (key === "enter" || key === "exit") {
        const right = extension2[key];
        if (right) {
          Object.assign(combined[key], right);
        }
      }
    }
  }
}
__name(extension, "extension");
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      "Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open"
    );
  }
}
__name(defaultOnError, "defaultOnError");

// src/rendering-util/handle-markdown-text.ts
function preprocessMarkdown(markdown) {
  const withoutMultipleNewlines = markdown.replace(/\n{2,}/g, "\n");
  const withoutExtraSpaces = dedent(withoutMultipleNewlines);
  return withoutExtraSpaces;
}
__name(preprocessMarkdown, "preprocessMarkdown");
function markdownToLines(markdown) {
  const preprocessedMarkdown = preprocessMarkdown(markdown);
  const { children } = fromMarkdown(preprocessedMarkdown);
  const lines = [[]];
  let currentLine = 0;
  function processNode(node2, parentType = "normal") {
    if (node2.type === "text") {
      const textLines = node2.value.split("\n");
      textLines.forEach((textLine, index2) => {
        if (index2 !== 0) {
          currentLine++;
          lines.push([]);
        }
        textLine.split(" ").forEach((word) => {
          if (word) {
            lines[currentLine].push({ content: word, type: parentType });
          }
        });
      });
    } else if (node2.type === "strong" || node2.type === "emphasis") {
      node2.children.forEach((contentNode) => {
        processNode(contentNode, node2.type);
      });
    }
  }
  __name(processNode, "processNode");
  children.forEach((treeNode) => {
    if (treeNode.type === "paragraph") {
      treeNode.children.forEach((contentNode) => {
        processNode(contentNode);
      });
    }
  });
  return lines;
}
__name(markdownToLines, "markdownToLines");
function markdownToHTML(markdown) {
  const { children } = fromMarkdown(markdown);
  function output(node2) {
    if (node2.type === "text") {
      return node2.value.replace(/\n/g, "<br/>");
    } else if (node2.type === "strong") {
      return `<strong>${node2.children.map(output).join("")}</strong>`;
    } else if (node2.type === "emphasis") {
      return `<em>${node2.children.map(output).join("")}</em>`;
    } else if (node2.type === "paragraph") {
      return `<p>${node2.children.map(output).join("")}</p>`;
    }
    return `Unsupported markdown: ${node2.type}`;
  }
  __name(output, "output");
  return children.map(output).join("");
}
__name(markdownToHTML, "markdownToHTML");

// src/rendering-util/splitText.ts
function splitTextToChars(text3) {
  if (Intl.Segmenter) {
    return [...new Intl.Segmenter().segment(text3)].map((s) => s.segment);
  }
  return [...text3];
}
__name(splitTextToChars, "splitTextToChars");
function splitWordToFitWidth(checkFit, word) {
  const characters = splitTextToChars(word.content);
  return splitWordToFitWidthRecursion(checkFit, [], characters, word.type);
}
__name(splitWordToFitWidth, "splitWordToFitWidth");
function splitWordToFitWidthRecursion(checkFit, usedChars, remainingChars, type) {
  if (remainingChars.length === 0) {
    return [
      { content: usedChars.join(""), type },
      { content: "", type }
    ];
  }
  const [nextChar, ...rest] = remainingChars;
  const newWord = [...usedChars, nextChar];
  if (checkFit([{ content: newWord.join(""), type }])) {
    return splitWordToFitWidthRecursion(checkFit, newWord, rest, type);
  }
  if (usedChars.length === 0 && nextChar) {
    usedChars.push(nextChar);
    remainingChars.shift();
  }
  return [
    { content: usedChars.join(""), type },
    { content: remainingChars.join(""), type }
  ];
}
__name(splitWordToFitWidthRecursion, "splitWordToFitWidthRecursion");
function splitLineToFitWidth(line, checkFit) {
  if (line.some(({ content: content3 }) => content3.includes("\n"))) {
    throw new Error("splitLineToFitWidth does not support newlines in the line");
  }
  return splitLineToFitWidthRecursion(line, checkFit);
}
__name(splitLineToFitWidth, "splitLineToFitWidth");
function splitLineToFitWidthRecursion(words, checkFit, lines = [], newLine = []) {
  if (words.length === 0) {
    if (newLine.length > 0) {
      lines.push(newLine);
    }
    return lines.length > 0 ? lines : [];
  }
  let joiner = "";
  if (words[0].content === " ") {
    joiner = " ";
    words.shift();
  }
  const nextWord = words.shift() ?? { content: " ", type: "normal" };
  const lineWithNextWord = [...newLine];
  if (joiner !== "") {
    lineWithNextWord.push({ content: joiner, type: "normal" });
  }
  lineWithNextWord.push(nextWord);
  if (checkFit(lineWithNextWord)) {
    return splitLineToFitWidthRecursion(words, checkFit, lines, lineWithNextWord);
  }
  if (newLine.length > 0) {
    lines.push(newLine);
    words.unshift(nextWord);
  } else if (nextWord.content) {
    const [line, rest] = splitWordToFitWidth(checkFit, nextWord);
    lines.push([line]);
    if (rest.content) {
      words.unshift(rest);
    }
  }
  return splitLineToFitWidthRecursion(words, checkFit, lines);
}
__name(splitLineToFitWidthRecursion, "splitLineToFitWidthRecursion");

// src/rendering-util/createText.ts
function applyStyle(dom, styleFn) {
  if (styleFn) {
    dom.attr("style", styleFn);
  }
}
__name(applyStyle, "applyStyle");
function addHtmlSpan(element2, node2, width, classes, addBackground = false) {
  const fo = element2.append("foreignObject");
  const div = fo.append("xhtml:div");
  const label = node2.label;
  const labelClass = node2.isNode ? "nodeLabel" : "edgeLabel";
  div.html(
    `
    <span class="${labelClass} ${classes}" ` + (node2.labelStyle ? 'style="' + node2.labelStyle + '"' : "") + ">" + label + "</span>"
  );
  applyStyle(div, node2.labelStyle);
  div.style("display", "table-cell");
  div.style("white-space", "nowrap");
  div.style("max-width", width + "px");
  div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  if (addBackground) {
    div.attr("class", "labelBkg");
  }
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
__name(addHtmlSpan, "addHtmlSpan");
function createTspan(textElement, lineIndex, lineHeight) {
  return textElement.append("tspan").attr("class", "text-outer-tspan").attr("x", 0).attr("y", lineIndex * lineHeight - 0.1 + "em").attr("dy", lineHeight + "em");
}
__name(createTspan, "createTspan");
function computeWidthOfText(parentNode, lineHeight, line) {
  const testElement = parentNode.append("text");
  const testSpan = createTspan(testElement, 1, lineHeight);
  updateTextContentAndStyles(testSpan, line);
  const textLength = testSpan.node().getComputedTextLength();
  testElement.remove();
  return textLength;
}
__name(computeWidthOfText, "computeWidthOfText");
function computeDimensionOfText(parentNode, lineHeight, text3) {
  const testElement = parentNode.append("text");
  const testSpan = createTspan(testElement, 1, lineHeight);
  updateTextContentAndStyles(testSpan, [{ content: text3, type: "normal" }]);
  const textDimension = testSpan.node()?.getBoundingClientRect();
  if (textDimension) {
    testElement.remove();
  }
  return textDimension;
}
__name(computeDimensionOfText, "computeDimensionOfText");
function createFormattedText(width, g, structuredText, addBackground = false) {
  const lineHeight = 1.1;
  const labelGroup = g.append("g");
  const bkg = labelGroup.insert("rect").attr("class", "background");
  const textElement = labelGroup.append("text").attr("y", "-10.1");
  let lineIndex = 0;
  for (const line of structuredText) {
    const checkWidth = /* @__PURE__ */ __name((line2) => computeWidthOfText(labelGroup, lineHeight, line2) <= width, "checkWidth");
    const linesUnderWidth = checkWidth(line) ? [line] : splitLineToFitWidth(line, checkWidth);
    for (const preparedLine of linesUnderWidth) {
      const tspan = createTspan(textElement, lineIndex, lineHeight);
      updateTextContentAndStyles(tspan, preparedLine);
      lineIndex++;
    }
  }
  if (addBackground) {
    const bbox = textElement.node().getBBox();
    const padding = 2;
    bkg.attr("x", -padding).attr("y", -padding).attr("width", bbox.width + 2 * padding).attr("height", bbox.height + 2 * padding);
    return labelGroup.node();
  } else {
    return textElement.node();
  }
}
__name(createFormattedText, "createFormattedText");
function updateTextContentAndStyles(tspan, wrappedLine) {
  tspan.text("");
  wrappedLine.forEach((word, index2) => {
    const innerTspan = tspan.append("tspan").attr("font-style", word.type === "emphasis" ? "italic" : "normal").attr("class", "text-inner-tspan").attr("font-weight", word.type === "strong" ? "bold" : "normal");
    if (index2 === 0) {
      innerTspan.text(word.content);
    } else {
      innerTspan.text(" " + word.content);
    }
  });
}
__name(updateTextContentAndStyles, "updateTextContentAndStyles");
var createText = /* @__PURE__ */ __name((el, text3 = "", {
  style = "",
  isTitle = false,
  classes = "",
  useHtmlLabels = true,
  isNode = true,
  width = 200,
  addSvgBackground = false
} = {}) => {
  log.info("createText", text3, style, isTitle, classes, useHtmlLabels, isNode, addSvgBackground);
  if (useHtmlLabels) {
    const htmlText2 = markdownToHTML(text3);
    const node2 = {
      isNode,
      label: decodeEntities(htmlText2).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (s) => `<i class='${s.replace(":", " ")}'></i>`
      ),
      labelStyle: style.replace("fill:", "color:")
    };
    const vertexNode = addHtmlSpan(el, node2, width, classes, addSvgBackground);
    return vertexNode;
  } else {
    const structuredText = markdownToLines(text3);
    const svgLabel = createFormattedText(width, el, structuredText, addSvgBackground);
    return svgLabel;
  }
}, "createText");

export {
  computeDimensionOfText,
  createText
};
