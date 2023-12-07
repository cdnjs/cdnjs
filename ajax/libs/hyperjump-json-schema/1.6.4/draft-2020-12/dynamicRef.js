import Validation from "../lib/keywords/validation.js";
import * as Schema from "../lib/schema.js";
import { uriFragment } from "../lib/common.js";


const id = "https://json-schema.org/keyword/draft-2020-12/dynamicRef";

const compile = async (dynamicRef, ast) => {
  const fragment = uriFragment(Schema.value(dynamicRef));
  const referencedSchema = await Schema.get(Schema.value(dynamicRef), dynamicRef);
  await Validation.compile(referencedSchema, ast);
  return [referencedSchema.id, fragment, Schema.uri(referencedSchema)];
};

const evaluate = (strategy) => ([id, fragment, ref], instance, ast, dynamicAnchors, quiet) => {
  if (fragment in ast.metaData[id].dynamicAnchors) {
    dynamicAnchors = { ...ast.metaData[id].dynamicAnchors, ...dynamicAnchors };
    return strategy(dynamicAnchors[fragment], instance, ast, dynamicAnchors, quiet);
  } else {
    return strategy(ref, instance, ast, dynamicAnchors, quiet);
  }
};

const interpret = evaluate(Validation.interpret);
const collectEvaluatedProperties = evaluate(Validation.collectEvaluatedProperties);
const collectEvaluatedItems = evaluate(Validation.collectEvaluatedItems);

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
