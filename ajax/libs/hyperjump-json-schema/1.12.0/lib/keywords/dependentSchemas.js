import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/dependentSchemas";

const compile = (schema, ast) => pipe(
  Browser.entries(schema),
  asyncMap(async ([key, dependentSchema]) => [key, await Validation.compile(dependentSchema, ast)]),
  asyncCollectArray
);

const interpret = (dependentSchemas, instance, context) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  let isValid = true;
  for (const [propertyName, dependentSchema] of dependentSchemas) {
    if (Instance.has(propertyName, instance) && !Validation.interpret(dependentSchema, instance, context)) {
      isValid = false;
    }
  }

  return isValid;
};

const simpleApplicator = true;

const collectEvaluatedProperties = (dependentSchemas, instance, context) => {
  if (Instance.typeOf(instance) !== "object") {
    return false;
  }

  const evaluatedPropertyNames = new Set();
  for (const [propertyName, dependentSchema] of dependentSchemas) {
    if (Instance.has(propertyName, instance)) {
      const propertyNames = Validation.collectEvaluatedProperties(dependentSchema, instance, context);
      if (propertyNames === false) {
        return false;
      }

      propertyNames.forEach(Set.prototype.add.bind(evaluatedPropertyNames));
    }
  }

  return evaluatedPropertyNames;
};

export default { id, compile, interpret, simpleApplicator, collectEvaluatedProperties };
