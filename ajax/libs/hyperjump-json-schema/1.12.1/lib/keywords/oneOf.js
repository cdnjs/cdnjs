import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/oneOf";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (oneOf, instance, context) => {
  let validCount = 0;
  for (const schemaUrl of oneOf) {
    if (Validation.interpret(schemaUrl, instance, context)) {
      validCount++;
    }
  }

  return validCount === 1;
};

const collectEvaluatedProperties = (oneOf, instance, context) => {
  let evaluatedProperties = false;
  for (const schemaUrl of oneOf) {
    const propertyNames = Validation.collectEvaluatedProperties(schemaUrl, instance, context);
    if (propertyNames) {
      if (evaluatedProperties) {
        return false;
      }

      evaluatedProperties = propertyNames;
    }
  }

  return evaluatedProperties;
};

const collectEvaluatedItems = (oneOf, instance, context) => {
  let evaluatedItemIndexes = false;
  for (const schemaUrl of oneOf) {
    const itemIndexes = Validation.collectEvaluatedItems(schemaUrl, instance, context);
    if (itemIndexes) {
      if (evaluatedItemIndexes) {
        return false;
      }

      evaluatedItemIndexes = itemIndexes;
    }
  }

  return evaluatedItemIndexes;
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
