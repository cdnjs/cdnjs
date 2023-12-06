import { pipe, asyncMap, asyncCollectArray, every, zip, take } from "@hyperjump/pact";
import * as Instance from "../instance.js";
import * as Schema from "../schema.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/prefixItems";

const compile = (schema, ast) => pipe(
  Schema.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (prefixItems, instance, ast, dynamicAnchors, quiet) => {
  if (!Instance.typeOf(instance, "array")) {
    return true;
  }

  return pipe(
    zip(prefixItems, Instance.iter(instance)),
    take(Instance.length(instance)),
    every(([prefixItem, item]) => Validation.interpret(prefixItem, item, ast, dynamicAnchors, quiet))
  );
};

const collectEvaluatedItems = (items, instance, ast, dynamicAnchors) => {
  return interpret(items, instance, ast, dynamicAnchors, true) && new Set(items.map((item, ndx) => ndx));
};

export default { id, compile, interpret, collectEvaluatedItems };
