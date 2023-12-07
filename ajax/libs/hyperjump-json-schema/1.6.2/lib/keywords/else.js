import * as Schema from "../schema.js";
import { getKeywordName } from "../keywords.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/else";

const compile = async (schema, ast, parentSchema) => {
  const ifKeyword = getKeywordName(schema.dialectId, "https://json-schema.org/keyword/if");
  if (Schema.has(ifKeyword, parentSchema)) {
    const ifSchema = await Schema.step(ifKeyword, parentSchema);
    return [await Validation.compile(ifSchema, ast), await Validation.compile(schema, ast)];
  } else {
    return [];
  }
};

const interpret = ([ifSchema, elseSchema], instance, ast, dynamicAnchors, quiet) => {
  return ifSchema === undefined
    || Validation.interpret(ifSchema, instance, ast, dynamicAnchors, true)
    || Validation.interpret(elseSchema, instance, ast, dynamicAnchors, quiet);
};

const collectEvaluatedProperties = ([ifSchema, elseSchema], instance, ast, dynamicAnchors) => {
  if (ifSchema === undefined || Validation.interpret(ifSchema, instance, ast, dynamicAnchors, true)) {
    return new Set();
  }

  return Validation.collectEvaluatedProperties(elseSchema, instance, ast, dynamicAnchors);
};

const collectEvaluatedItems = ([ifSchema, elseSchema], instance, ast, dynamicAnchors) => {
  if (ifSchema === undefined || Validation.interpret(ifSchema, instance, ast, dynamicAnchors, true)) {
    return new Set();
  }

  return Validation.collectEvaluatedItems(elseSchema, instance, ast, dynamicAnchors);
};

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
