import { pipe, asyncMap, asyncCollectArray, every, zip, take } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";
import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/prefixItems";

const compile = (schema, ast) => pipe(
  Browser.iter(schema),
  asyncMap((itemSchema) => Validation.compile(itemSchema, ast)),
  asyncCollectArray
);

const interpret = (prefixItems, instance, ast, dynamicAnchors, quiet) => {
  return Instance.typeOf(instance) !== "array" || pipe(
    zip(prefixItems, Instance.iter(instance)),
    take(Instance.length(instance)),
    every(([prefixItem, item]) => Validation.interpret(prefixItem, item, ast, dynamicAnchors, quiet))
  );
};

const collectEvaluatedItems = (items, instance, ast, dynamicAnchors) => {
  return interpret(items, instance, ast, dynamicAnchors, true) && new Set(items.map((_item, ndx) => ndx));
};

export default { id, compile, interpret, collectEvaluatedItems };
