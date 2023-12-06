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

const interpret = ([id, fragment, ref], instance, ast, dynamicAnchors, quiet) => {
  if (fragment in ast.metaData[id].dynamicAnchors) {
    dynamicAnchors = { ...ast.metaData[id].dynamicAnchors, ...dynamicAnchors };
    return Validation.interpret(dynamicAnchors[fragment], instance, ast, dynamicAnchors, quiet);
  } else {
    return Validation.interpret(ref, instance, ast, dynamicAnchors, quiet);
  }
};

const collectEvaluatedProperties = Validation.collectEvaluatedProperties;
const collectEvaluatedItems = Validation.collectEvaluatedItems;

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
