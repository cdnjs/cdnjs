import { pipe, filter, reduce, zip, range, map, collectSet } from "@hyperjump/pact";
import * as Instance from "../lib/instance.js";
import * as Schema from "../lib/schema.js";
import { getKeywordName } from "../lib/keywords.js";
import Validation from "../lib/keywords/validation.js";


const id = "https://json-schema.org/keyword/draft-2019-09/contains";

const compile = async (schema, ast, parentSchema) => {
  const contains = await Validation.compile(schema, ast);

  const minContainsKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/minContains");
  const minContainsSchema = await Schema.step(minContainsKeyword, parentSchema);
  const minContains = Schema.typeOf(minContainsSchema, "number") ? Schema.value(minContainsSchema) : 1;

  const maxContainsKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/maxContains");
  const maxContainsSchema = await Schema.step(maxContainsKeyword, parentSchema);
  const maxContains = Schema.typeOf(maxContainsSchema, "number") ? Schema.value(maxContainsSchema) : Number.MAX_SAFE_INTEGER;

  return { contains, minContains, maxContains };
};

const interpret = ({ contains, minContains, maxContains }, instance, ast, dynamicAnchors, quiet) => {
  const matches = !Instance.typeOf(instance, "array") || pipe(
    Instance.iter(instance),
    filter((item) => Validation.interpret(contains, item, ast, dynamicAnchors, quiet)),
    reduce((matches) => matches + 1, 0)
  );
  return matches >= minContains && matches <= maxContains;
};

const collectEvaluatedItems = (keywordValue, instance, ast, dynamicAnchors) => {
  return interpret(keywordValue, instance, ast, dynamicAnchors, true)
    && Instance.typeOf(instance, "array")
    && pipe(
      zip(Instance.iter(instance), range(0)),
      filter(([item]) => Validation.interpret(keywordValue.contains, item, ast, dynamicAnchors, true)),
      map(([, itemIndex]) => itemIndex),
      collectSet
    );
};

export default { id, compile, interpret, collectEvaluatedItems };
