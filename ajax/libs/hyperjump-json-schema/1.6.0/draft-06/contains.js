import { some } from "@hyperjump/pact";
import * as Instance from "../lib/instance.js";
import Validation from "../lib/keywords/validation.js";


const id = "https://json-schema.org/keyword/draft-06/contains";

const compile = (schema, ast) => Validation.compile(schema, ast);

const interpret = (contains, instance, ast, dynamicAnchors, quiet) => {
  return !Instance.typeOf(instance, "array") || some((item) => Validation.interpret(contains, item, ast, dynamicAnchors, quiet), Instance.iter(instance));
};

export default { id, compile, interpret };
