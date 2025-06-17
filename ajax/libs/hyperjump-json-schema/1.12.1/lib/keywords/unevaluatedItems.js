import { zip, range } from "@hyperjump/pact";
import { FLAG } from "../index.js";
import { canonicalUri, Validation } from "../experimental.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/unevaluatedItems";

const compile = async (schema, ast, parentSchema) => {
  return [canonicalUri(parentSchema), await Validation.compile(schema, ast)];
};

const interpret = ([schemaUrl, unevaluatedItems], instance, context) => {
  if (Instance.typeOf(instance) !== "array") {
    return true;
  }

  const keywordContext = { ...context, errors: [], annotations: [], outputFormat: FLAG };
  const itemIndexes = Validation.collectEvaluatedItems(schemaUrl, instance, keywordContext, true);
  if (itemIndexes === false) {
    return true;
  }

  let isValid = true;
  for (const [item, index] of zip(Instance.iter(instance), range(0))) {
    if (!itemIndexes.has(index) && !Validation.interpret(unevaluatedItems, item, context)) {
      isValid = false;
    }
  }

  return isValid;
};

const simpleApplicator = true;

const collectEvaluatedItems = (keywordValue, instance, context) => {
  const itemIndexes = Validation.collectEvaluatedItems(keywordValue[0], instance, context, true);
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

export default { id, compile, interpret, simpleApplicator, collectEvaluatedItems };
