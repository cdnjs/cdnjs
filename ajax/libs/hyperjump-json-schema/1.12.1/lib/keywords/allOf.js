import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/allOf";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (allOf, instance, ast, dynamicAnchors, quiet) => {
  let isValid = true;
  for (const schemaUri of allOf) {
    if (!Validation.interpret(schemaUri, instance, ast, dynamicAnchors, quiet)) {
      isValid = false;
    }
  }
  return isValid;
};

const simpleApplicator = true;

const collectEvaluatedProperties = (allOf, instance, context) => {
  const evaluatedPropertyNames = new Set();
  for (const schemaUrl of allOf) {
    const propertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, context);
    if (!propertyNames) {
      return false;
    }

    propertyNames.forEach(evaluatedPropertyNames.add, evaluatedPropertyNames);
  }

  return evaluatedPropertyNames;
};

const collectEvaluatedItems = (allOf, instance, context) => {
  const evaluatedItemIndexes = new Set();
  for (const schemaUrl of allOf) {
    const itemIndexes = Validation.collectEvaluatedItems(schemaUrl, instance, context);
    if (!itemIndexes) {
      return false;
    }

    itemIndexes.forEach(evaluatedItemIndexes.add, evaluatedItemIndexes);
  }

  return evaluatedItemIndexes;
};

export default { id, compile, interpret, simpleApplicator, collectEvaluatedProperties, collectEvaluatedItems };
