import { pipe, asyncMap, asyncCollectObject } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/propertyDependencies";

const compile = (schema, ast) => {
  return pipe(
    Browser.entries(schema),
    asyncMap(async ([propertyName, valueMappings]) => {
      return [propertyName, await pipe(
        Browser.entries(valueMappings),
        asyncMap(async ([propertyValue, conditionalSchema]) => [propertyValue, await Validation.compile(conditionalSchema, ast)]),
        asyncCollectObject
      )];
    }),
    asyncCollectObject
  );
};

const interpret = (propertyDependencies, instance, ast, dynamicAnchors, quiet) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  let isValid = true;
  const instanceValue = Instance.value(instance);
  for (const [propertyName, valueMappings] of Object.entries(propertyDependencies)) {
    const propertyValue = instanceValue[propertyName];
    if (
      Instance.has(propertyName, instance)
      && propertyValue in valueMappings
      && !Validation.interpret(valueMappings[propertyValue], instance, ast, dynamicAnchors, quiet)
    ) {
      isValid = false;
    }
  }

  return isValid;
};

const collectEvaluatedProperties = (propertyDependencies, instance, ast, dynamicAnchors) => {
  const evaluatedPropertyNames = new Set();
  for (const propertyName in propertyDependencies) {
    const propertyValue = Instance.value(instance)[propertyName];

    const valueMappings = propertyDependencies[propertyName];
    if (Instance.has(propertyName, instance) && propertyValue in valueMappings) {
      const propertyNames = Validation.collectEvaluatedProperties(valueMappings[propertyValue], instance, ast, dynamicAnchors);
      if (!propertyNames) {
        return false;
      }

      propertyNames.forEach(evaluatedPropertyNames.add, evaluatedPropertyNames);
    }
  }

  return evaluatedPropertyNames;
};

export default { id, compile, interpret, collectEvaluatedProperties };
