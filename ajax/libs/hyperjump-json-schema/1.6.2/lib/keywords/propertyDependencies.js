import { pipe, asyncMap, asyncCollectObject } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/propertyDependencies";
const experimental = true;

const compile = (schema, ast) => {
  return pipe(
    Schema.entries(schema),
    asyncMap(async ([propertyName, valueMappings]) => {
      return [propertyName, await pipe(
        Schema.entries(valueMappings),
        asyncMap(async ([propertyValue, conditionalSchema]) => [propertyValue, await Validation.compile(conditionalSchema, ast)]),
        asyncCollectObject
      )];
    }),
    asyncCollectObject
  );
};

const interpret = (propertyDependencies, instance, ast, dynamicAnchors, quiet) => {
  return !Instance.typeOf(instance, "object") || Object.entries(propertyDependencies).every(([propertyName, valueMappings]) => {
    const propertyValue = Instance.value(instance)[propertyName];
    return !Instance.has(propertyName, instance)
      || !(propertyValue in valueMappings)
      || Validation.interpret(valueMappings[propertyValue], instance, ast, dynamicAnchors, quiet);
  });
};

const collectEvaluatedProperties = (propertyDependencies, instance, ast, dynamicAnchors) => {
  return Object.entries(propertyDependencies)
    .reduce((acc, [propertyName, valueMappings]) => {
      const propertyValue = Instance.value(instance)[propertyName];

      if (Instance.has(propertyName, instance) && propertyValue in valueMappings) {
        const propertyNames = Validation.collectEvaluatedProperties(valueMappings[propertyValue], instance, ast, dynamicAnchors);
        return propertyNames !== false && acc.concat(propertyNames);
      } else {
        return acc;
      }
    }, []);
};

export default { id, experimental, compile, interpret, collectEvaluatedProperties };
