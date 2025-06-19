import * as Browser from "@hyperjump/browser";
import { FLAG } from "../index.js";
import { getKeywordName, Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/else";

const compile = async (schema, ast, parentSchema) => {
  const ifKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/if");
  if (Browser.has(ifKeyword, parentSchema)) {
    const ifSchema = await Browser.step(ifKeyword, parentSchema);
    return [await Validation.compile(ifSchema, ast), await Validation.compile(schema, ast)];
  } else {
    return [];
  }
};

const interpret = ([ifSchema, elseSchema], instance, context) => {
  return ifSchema === undefined
    || Validation.interpret(ifSchema, instance, { ...context, errors: [], annotations: [], oututFormat: FLAG })
    || Validation.interpret(elseSchema, instance, context);
};

const simpleApplicator = true;

const collectEvaluatedProperties = ([ifSchema, elseSchema], instance, context) => {
  if (ifSchema === undefined || Validation.interpret(ifSchema, instance, context)) {
    return new Set();
  }

  return Validation.collectEvaluatedProperties(elseSchema, instance, context);
};

const collectEvaluatedItems = ([ifSchema, elseSchema], instance, context) => {
  if (ifSchema === undefined || Validation.interpret(ifSchema, instance, context)) {
    return new Set();
  }

  return Validation.collectEvaluatedItems(elseSchema, instance, context);
};

export default { id, compile, interpret, simpleApplicator, collectEvaluatedProperties, collectEvaluatedItems };
