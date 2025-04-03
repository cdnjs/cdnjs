import { zip, range } from "@hyperjump/pact";
import * as Instance from "../instance.js";
import { canonicalUri } from "../schema.js";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/unevaluatedItems";

const compile = async (schema, ast, parentSchema) => {
  return [canonicalUri(parentSchema), await Validation.compile(schema, ast)];
};

const interpret = ([schemaUrl, unevaluatedItems], instance, ast, dynamicAnchors, quiet) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  const itemIndexes = Validation.collectEvaluatedItems(schemaUrl, instance, ast, dynamicAnchors, true);
  if (itemIndexes === false) {
    return true;
  }

  let isValid = true;
  for (const [item, index] of zip(Instance.iter(instance), range(0))) {
    if (!itemIndexes.has(index) && !Validation.interpret(unevaluatedItems, item, ast, dynamicAnchors, quiet)) {
      isValid = false;
    }
  }

  return isValid;
};

const collectEvaluatedItems = (keywordValue, instance, ast, dynamicAnchors) => {
  const itemIndexes = Validation.collectEvaluatedItems(keywordValue[0], instance, ast, dynamicAnchors, true);
  if (!itemIndexes) {
    return false;
  }

  const evaluatedIndexes = new Set();
  for (let ndx = 0; ndx < Instance.length(instance); ndx++) {
    if (!itemIndexes.has(ndx)) {
      evaluatedIndexes.add(ndx);
    }
  }
  return evaluatedIndexes;
};

export default { id, compile, interpret, collectEvaluatedItems };
