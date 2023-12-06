import * as Schema from "../schema.js";
import { getKeywordName } from "../keywords.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/then";

const compile = async (schema, ast, parentSchema) => {
  const ifKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/if");
  if (Schema.has(ifKeyword, parentSchema)) {
    const ifSchema = await Schema.step(ifKeyword, parentSchema);
    return [await Validation.compile(ifSchema, ast), await Validation.compile(schema, ast)];
  } else {
    return [];
  }
};

const interpret = ([ifSchema, thenSchema], instance, ast, dynamicAnchors, quiet) => {
  return ifSchema === undefined
    || !Validation.interpret(ifSchema, instance, ast, dynamicAnchors, true)
    || Validation.interpret(thenSchema, instance, ast, dynamicAnchors, quiet);
};

const collectEvaluatedProperties = ([ifSchema, thenSchema], instance, ast, dynamicAnchors) => {
  if (ifSchema === undefined || !Validation.interpret(ifSchema, instance, ast, dynamicAnchors, true)) {
    return new Set();
  }

  return Validation.collectEvaluatedProperties(thenSchema, instance, ast, dynamicAnchors);
};

const collectEvaluatedItems = ([ifSchema, thenSchema], instance, ast, dynamicAnchors) => {
  if (ifSchema === undefined || !Validation.interpret(ifSchema, instance, ast, dynamicAnchors, true)) {
    return new Set();
  }

  return Validation.collectEvaluatedItems(thenSchema, instance, ast, dynamicAnchors);
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
