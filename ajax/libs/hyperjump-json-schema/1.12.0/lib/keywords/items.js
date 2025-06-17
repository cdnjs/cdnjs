import { drop } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { getKeywordName, Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/items";

const compile = async (schema, ast, parentSchema) => {
  const prefixItemKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/prefixItems");
  const prefixItems = await Browser.step(prefixItemKeyword, parentSchema);
  const numberOfPrefixItems = Browser.typeOf(prefixItems) === "array" ? Browser.length(prefixItems) : 0;

  return [numberOfPrefixItems, await Validation.compile(schema, ast)];
};

const interpret = ([numberOfPrefixItems, items], instance, context) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  let isValid = true;
  for (const item of drop(numberOfPrefixItems, Instance.iter(instance))) {
    if (!Validation.interpret(items, item, context)) {
      isValid = false;
    }
  }

  return isValid;
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
