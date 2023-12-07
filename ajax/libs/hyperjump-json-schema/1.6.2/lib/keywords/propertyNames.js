import { every } from "@hyperjump/pact";
import * as Instance from "../instance.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/propertyNames";

const compile = (schema, ast) => Validation.compile(schema, ast);

const interpret = (propertyNames, instance, ast, dynamicAnchors) => {
  return !Instance.typeOf(instance, "object") || every((key) => {
    return Validation.interpret(propertyNames, Instance.cons(key), ast, dynamicAnchors, true);
  }, Instance.keys(instance));
};

export default { id, compile, interpret };
