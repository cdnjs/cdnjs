import { value, entries } from "@hyperjump/browser";
import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import { append as pointerAppend } from "@hyperjump/json-pointer";
import { publishAsync } from "../pubsub.js";
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
        if (keywordHandler.plugin) {
          ast.plugins.add(keywordHandler.plugin);
        }
        const keywordAst = await keywordHandler.compile(keywordSchema, ast, schema);
        return [keywordHandler.id, pointerAppend(keyword, canonicalUri(schema)), keywordAst];
      }),
      asyncCollectArray
    );
  }

  return url;
};

const interpret = (url, instance, context) => {
  let valid = true;

  for (const plugin of context.plugins) {
    plugin.beforeSchema?.(url, instance, context);
  }

  if (typeof context.ast[url] === "boolean") {
    valid = context.ast[url];
  } else {
    for (const node of context.ast[url]) {
      const [keywordId, , keywordValue] = node;
      const keyword = getKeyword(keywordId);

      const keywordContext = {
        ast: context.ast,
        plugins: context.plugins
      };
      for (const plugin of context.plugins) {
        plugin.beforeKeyword?.(node, instance, keywordContext, context, keyword);
      }
      const isKeywordValid = keyword.interpret(keywordValue, instance, keywordContext);
      if (!isKeywordValid) {
        valid = false;
      }

      for (const plugin of context.plugins) {
        plugin.afterKeyword?.(node, instance, keywordContext, isKeywordValid, context, keyword);
      }
    }
  }

  for (const plugin of context.plugins) {
    plugin.afterSchema?.(url, instance, context, valid);
  }
  return valid;
};

export default { id, compile, interpret };
