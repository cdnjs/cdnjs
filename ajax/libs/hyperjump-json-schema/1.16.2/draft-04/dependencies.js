import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../lib/instance.js";
import { Validation } from "../lib/experimental.js";


const id = "https://json-schema.org/keyword/draft-04/dependencies";

const compile = (schema, ast) => pipe(
  Browser.entries(schema),
  asyncMap(async ([key, dependency]) => [
    key,
    Browser.typeOf(dependency) === "array" ? Browser.value(dependency) : await Validation.compile(dependency, ast)
  ]),
  asyncCollectArray
);

const interpret = (dependencies, instance, context) => {
  if (Instance.typeOf(instance) !== "object") {
    return true;
  }

  return dependencies.every(([propertyName, dependency]) => {
    if (!Instance.has(propertyName, instance)) {
      return true;
    }

    if (Array.isArray(dependency)) {
      return dependency.every((key) => Instance.has(key, instance));
    } else {
      return Validation.interpret(dependency, instance, context);
    }
  });
};

export default { id, compile, interpret };
