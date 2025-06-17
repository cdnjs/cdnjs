import { value, entries } from "@hyperjump/browser";
import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import { append as pointerAppend } from "@hyperjump/json-pointer";
import { publishAsync } from "../pubsub.js";
import * as Instance from "../instance.js";
import { toAbsoluteUri } from "../common.js";
import { canonicalUri, getKeyword, getKeywordByName, BASIC, DETAILED } from "../experimental.js";
import { FLAG } from "../index.js";


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

const interpret = (url, instance, { ast, dynamicAnchors, errors, annotations, outputFormat }) => {
  dynamicAnchors = { ...ast.metaData[toAbsoluteUri(url)].dynamicAnchors, ...dynamicAnchors };

  if (typeof ast[url] === "boolean") {
    if (ast[url]) {
      return true;
    } else {
      errors.push({
        keyword: id,
        absoluteKeywordLocation: url,
        instanceLocation: Instance.uri(instance)
      });
      return false;
    }
  } else {
    const schemaAnnotations = [];

    let isSchemaValid = true;
    for (const [keywordId, schemaUri, keywordValue] of ast[url]) {
      const context = { ast, dynamicAnchors, errors: [], annotations: [], outputFormat };
      const keywordHandler = getKeyword(keywordId);
      const isKeywordValid = keywordHandler.interpret(keywordValue, instance, context);
      if (!isKeywordValid) {
        isSchemaValid = false;
      }

      switch (outputFormat) {
        case FLAG:
          break;
        case BASIC:
          if (!isKeywordValid) {
            if (!keywordHandler.simpleApplicator) {
              errors.push({
                keyword: keywordId,
                absoluteKeywordLocation: schemaUri,
                instanceLocation: Instance.uri(instance)
              });
            }
            errors.push(...context.errors);
          } else {
            if (keywordHandler.annotation) {
              schemaAnnotations.push({
                keyword: keywordId,
                absoluteKeywordLocation: schemaUri,
                instanceLocation: Instance.uri(instance),
                annotation: keywordHandler.annotation(keywordValue)
              });
            }
            schemaAnnotations.push(...context.annotations);
          }
          break;
        case DETAILED: {
          if (!isKeywordValid) {
            const outputUnit = {
              keyword: keywordId,
              absoluteKeywordLocation: schemaUri,
              instanceLocation: Instance.uri(instance)
            };

            errors.push(outputUnit);
            if (context.errors.length > 0) {
              outputUnit.errors = context.errors;
            }
          }
          break;
        }
        default:
          throw Error(`Unsupported output format '${outputFormat}'`);
      }
    }

    if (outputFormat === BASIC && isSchemaValid) {
      annotations.push(...schemaAnnotations);
    }

    return isSchemaValid;
  }
};

const emptyPropertyNames = new Set();
const collectEvaluatedProperties = (url, instance, context, isTop = false) => {
  if (typeof context.ast[url] === "boolean") {
    return context.ast[url] ? emptyPropertyNames : false;
  }

  const accumulatedPropertyNames = new Set();
  for (const [keywordId, , keywordValue] of context.ast[url]) {
    if (isTop && keywordId === "https://json-schema.org/keyword/unevaluatedProperties") {
      continue;
    }

    const keywordHandler = getKeyword(keywordId);
    const propertyNames = "collectEvaluatedProperties" in keywordHandler
      ? keywordHandler.collectEvaluatedProperties(keywordValue, instance, context, isTop)
      : keywordHandler.interpret(keywordValue, instance, context) && emptyPropertyNames;

    if (propertyNames === false) {
      return false;
    }

    propertyNames.forEach(accumulatedPropertyNames.add, accumulatedPropertyNames);
  }

  return accumulatedPropertyNames;
};

const emptyItemIndexes = new Set();
const collectEvaluatedItems = (url, instance, context, isTop = false) => {
  if (typeof context.ast[url] === "boolean") {
    return context.ast[url] ? emptyItemIndexes : false;
  }

  const accumulatedItemIndexes = new Set();
  for (const [keywordId, , keywordValue] of context.ast[url]) {
    if (isTop && keywordId === "https://json-schema.org/keyword/unevaluatedItems") {
      continue;
    }

    const keywordHandler = getKeyword(keywordId);
    const itemIndexes = "collectEvaluatedItems" in keywordHandler
      ? keywordHandler.collectEvaluatedItems(keywordValue, instance, context, isTop)
      : keywordHandler.interpret(keywordValue, instance, context) && emptyItemIndexes;

    if (itemIndexes === false) {
      return false;
    }

    itemIndexes.forEach(accumulatedItemIndexes.add, accumulatedItemIndexes);
  }

  return accumulatedItemIndexes;
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
