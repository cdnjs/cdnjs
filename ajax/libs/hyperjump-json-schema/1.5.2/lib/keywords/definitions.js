import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Schema from "../schema.js";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/definitions";

const compile = (schema, ast) => pipe(
  Schema.values(schema),
  asyncMap((definitionSchema) => Validation.compile(definitionSchema, ast)),
  asyncCollectArray
);

const interpret = () => true;

export default { id, compile, interpret };
