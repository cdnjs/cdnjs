import * as Browser from "@hyperjump/browser";
import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import Validation from "./validation.js";


const id = "https://json-schema.org/keyword/definitions";

const compile = (schema, ast) => pipe(
  Browser.values(schema),
  asyncMap((definitionSchema) => Validation.compile(definitionSchema, ast)),
  asyncCollectArray
);

const interpret = () => true;

export default { id, compile, interpret };
