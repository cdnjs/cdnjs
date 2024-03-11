import { value, entries } from "@hyperjump/browser";
import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import { append as pointerAppend } from "@hyperjump/json-pointer";
import { publishAsync, publish } from "../pubsub.js";
import * as Instance from "../instance.js";
import { toAbsoluteUri } from "../common.js";
import { canonicalUri, getKeyword, getKeywordByName } from "../experimental.js";


const id = "https://json-schema.org/evaluation/validate";

const compile = async (schema, ast) => {
  // Meta validation
  await publishAsync("validate.metaValidate", schema);

  // Dynamic Scope
  if (!(schema.document.baseUri in ast.metaData)) {
    ast.metaData[schema.document.baseUri] = {
      dynamicAnchors: schema.document.dynamicAnchors
    };
  }

  // Compile
  const url = canonicalUri(schema);
  if (!(url in ast)) {
    ast[url] = false; // Place dummy entry in ast to avoid recursive loops

    const schemaValue = value(schema);
    if (!["object", "boolean"].includes(typeof schemaValue)) {
      throw Error(`No schema found at '${url}'`);
    }

    ast[url] = typeof schemaValue === "boolean" ? schemaValue : await pipe(
      entries(schema),
      asyncMap(async ([keyword, keywordSchema]) => {
        const keywordHandler = getKeywordByName(keyword, schema.document.dialectId);
        const keywordAst = await keywordHandler.compile(keywordSchema, ast, schema);
        return [keywordHandler.id, pointerAppend(keyword, canonicalUri(schema)), keywordAst];
      }),
      asyncCollectArray
    );
  }

  return url;
};

const interpret = (url, instance, ast, dynamicAnchors, quiet = false) => {
  dynamicAnchors = { ...ast.metaData[toAbsoluteUri(url)].dynamicAnchors, ...dynamicAnchors };

  !quiet && publish("result.start");
  const isValid = typeof ast[url] === "boolean" ? ast[url] : ast[url].every(([keywordId, schemaUrl, keywordValue]) => {
    !quiet && publish("result.start");
    const isValid = getKeyword(keywordId).interpret(keywordValue, instance, ast, dynamicAnchors, quiet);

    !quiet && publish("result", {
      keyword: keywordId,
      absoluteKeywordLocation: schemaUrl,
      instanceLocation: Instance.uri(instance),
      valid: isValid,
      ast: keywordValue
    });
    !quiet && publish("result.end");
    return isValid;
  });

  !quiet && publish("result", {
    keyword: id,
    absoluteKeywordLocation: url,
    instanceLocation: Instance.uri(instance),
    valid: isValid,
    ast: url
  });
  !quiet && publish("result.end");
  return isValid;
};

const emptyPropertyNames = new Set();
const collectEvaluatedProperties = (url, instance, ast, dynamicAnchors, isTop = false) => {
  if (typeof ast[url] === "boolean") {
    return ast[url] ? new Set() : false;
  }

  const accumulatedPropertyNames = new Set();
  for (const [keywordId, , keywordValue] of ast[url]) {
    if (isTop && keywordId === "https://json-schema.org/keyword/unevaluatedProperties") {
      continue;
    }

    const keywordHandler = getKeyword(keywordId);
    const propertyNames = "collectEvaluatedProperties" in keywordHandler
      ? keywordHandler.collectEvaluatedProperties(keywordValue, instance, ast, dynamicAnchors, isTop)
      : keywordHandler.interpret(keywordValue, instance, ast, dynamicAnchors, true) && emptyPropertyNames;

    if (propertyNames === false) {
      return false;
    }

    propertyNames.forEach(accumulatedPropertyNames.add, accumulatedPropertyNames);
  }

  return accumulatedPropertyNames;
};

const emptyItemIndexes = new Set();
const collectEvaluatedItems = (url, instance, ast, dynamicAnchors, isTop = false) => {
  if (typeof ast[url] === "boolean") {
    return ast[url] ? new Set() : false;
  }

  const accumulatedItemIndexes = new Set();
  for (const [keywordId, , keywordValue] of ast[url]) {
    if (isTop && keywordId === "https://json-schema.org/keyword/unevaluatedItems") {
      continue;
    }

    const keywordHandler = getKeyword(keywordId);
    const itemIndexes = "collectEvaluatedItems" in keywordHandler
      ? keywordHandler.collectEvaluatedItems(keywordValue, instance, ast, dynamicAnchors, isTop)
      : keywordHandler.interpret(keywordValue, instance, ast, dynamicAnchors, true) && emptyItemIndexes;

    if (itemIndexes === false) {
      return false;
    }

    itemIndexes.forEach(accumulatedItemIndexes.add, accumulatedItemIndexes);
  }

  return accumulatedItemIndexes;
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
