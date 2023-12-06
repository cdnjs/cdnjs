import * as Schema from "../schema.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/ref";

const compile = async (ref, ast) => {
  const referencedSchema = await Schema.get(Schema.value(ref), ref);
  return Validation.compile(referencedSchema, ast);
};

const interpret = Validation.interpret;
const collectEvaluatedProperties = Validation.collectEvaluatedProperties;
const collectEvaluatedItems = Validation.collectEvaluatedItems;

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
