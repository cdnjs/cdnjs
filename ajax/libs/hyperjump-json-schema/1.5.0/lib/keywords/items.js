import { pipe, drop, every } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";
import { getKeywordName } from "../keywords.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/items";

const compile = async (schema, ast, parentSchema) => {
  const prefixItemKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/prefixItems");
  const prefixItems = await Schema.step(prefixItemKeyword, parentSchema);
  const numberOfPrefixItems = Schema.typeOf(prefixItems, "array") ? Schema.length(prefixItems) : 0;

  return [numberOfPrefixItems, await Validation.compile(schema, ast)];
};

const interpret = ([numberOfPrefixItems, items], instance, ast, dynamicAnchors, quiet) => {
  if (!Instance.typeOf(instance, "array")) {
    return true;
  }

  return pipe(
    Instance.iter(instance),
    drop(numberOfPrefixItems),
    every((item) => Validation.interpret(items, item, ast, dynamicAnchors, quiet))
  );
};

const collectEvaluatedItems = (keywordValue, instance, ast, dynamicAnchors) => {
  if (!interpret(keywordValue, instance, ast, dynamicAnchors, true)) {
    return false;
  }

  const evaluatedIndexes = new Set();
  for (let ndx = keywordValue[0]; ndx < Instance.length(instance); ndx++) {
    evaluatedIndexes.add(ndx);
  }

  return evaluatedIndexes;
};

export default { id, compile, interpret, collectEvaluatedItems };
