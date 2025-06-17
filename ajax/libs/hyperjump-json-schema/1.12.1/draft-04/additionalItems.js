import { pipe, drop, every } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../lib/instance.js";
import { getKeywordName, Validation } from "../lib/experimental.js";


const id = "https://json-schema.org/keyword/draft-04/additionalItems";

const compile = async (schema, ast, parentSchema) => {
  const itemsKeywordName = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/draft-04/items");
  const items = await Browser.step(itemsKeywordName, parentSchema);
  const numberOfItems = Browser.typeOf(items) === "array" ? Browser.length(items) : Number.MAX_SAFE_INTEGER;

  return [numberOfItems, await Validation.compile(schema, ast)];
};

const interpret = ([numberOfItems, additionalItems], instance, context) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  return pipe(
    Instance.iter(instance),
    drop(numberOfItems),
    every((item) => Validation.interpret(additionalItems, item, context))
  );
};

const simpleApplicator = true;

const collectEvaluatedItems = (keywordValue, instance, context) => {
  if (!interpret(keywordValue, instance, context)) {
    return false;
  }

  const evaluatedIndexes = new Set();
  for (let ndx = keywordValue[0]; ndx < Instance.length(instance); ndx++) {
    evaluatedIndexes.add(ndx);
  }

  return evaluatedIndexes;
};

export default { id, compile, interpret, simpleApplicator, collectEvaluatedItems };
