import { pipe, drop, every } from "@hyperjump/pact";
import * as Instance from "../lib/instance.js";
import * as Schema from "../lib/schema.js";
import Validation from "../lib/keywords/validation.js";
import { getKeywordName } from "../lib/keywords.js";


const id = "https://json-schema.org/keyword/draft-04/additionalItems";

const compile = async (schema, ast, parentSchema) => {
  const itemsKeywordName = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/draft-04/items");
  const items = await Schema.step(itemsKeywordName, parentSchema);
  const numberOfItems = Schema.typeOf(items, "array") ? Schema.length(items) : Number.MAX_SAFE_INTEGER;

  return [numberOfItems, await Validation.compile(schema, ast)];
};

const interpret = ([numberOfItems, additionalItems], instance, ast, dynamicAnchors, quiet) => {
  if (!Instance.typeOf(instance, "array")) {
    return true;
  }

  return pipe(
    Instance.iter(instance),
    drop(numberOfItems),
    every((item) => Validation.interpret(additionalItems, item, ast, dynamicAnchors, quiet))
  );
};

const collectEvaluatedItems = (keywordValue, instance, ast, dynamicAnchors) => {
  if (!interpret(keywordValue, instance, ast, dynamicAnchors)) {
    return false;
  }

  const evaluatedIndexes = new Set();
  for (let ndx = keywordValue[0]; ndx < Instance.length(instance); ndx++) {
    evaluatedIndexes.add(ndx);
  }

  return evaluatedIndexes;
};

export default { id, compile, interpret, collectEvaluatedItems };
