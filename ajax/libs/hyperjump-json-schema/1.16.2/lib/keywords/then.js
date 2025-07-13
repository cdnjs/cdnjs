import * as Browser from "@hyperjump/browser";
import { getKeywordName, Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/then";

const compile = async (schema, ast, parentSchema) => {
  const ifKeyword = getKeywordName(schema.document.dialectId, "https://json-schema.org/keyword/if");
  if (Browser.has(ifKeyword, parentSchema)) {
    const ifSchema = await Browser.step(ifKeyword, parentSchema);
    return [await Validation.compile(ifSchema, ast), await Validation.compile(schema, ast)];
  } else {
    return [];
  }
};

const interpret = ([ifSchema, thenSchema], instance, context) => {
  return ifSchema === undefined
    || !Validation.interpret(ifSchema, instance, { ...context, plugins: context.ast.plugins })
    || Validation.interpret(thenSchema, instance, context);
};

const simpleApplicator = true;

export default { id, compile, interpret, simpleApplicator };
