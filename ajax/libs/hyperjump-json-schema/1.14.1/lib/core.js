import curry from "just-curry-it";
import { resolveIri, toAbsoluteIri } from "@hyperjump/uri";
import { subscribe } from "./pubsub.js";
import {
  setMetaSchemaOutputFormat,
  getShouldValidateSchema,
  getMetaSchemaOutputFormat
} from "./configuration.js";
import * as Instance from "./instance.js";
import { InvalidSchemaError } from "./invalid-schema-error.js";
import { getSchema, registerSchema, unregisterSchema as schemaUnregister } from "./schema.js";
import { getKeywordName } from "./keywords.js";
import Validation from "./keywords/validation.js";
import { basicOutputPlugin } from "./evaluation-plugins/basic-output.js";
import { detailedOutputPlugin } from "./evaluation-plugins/detailed-output.js";


export const FLAG = "FLAG", BASIC = "BASIC", DETAILED = "DETAILED";
setMetaSchemaOutputFormat(FLAG);

export const validate = async (url, value = undefined, outputFormat = undefined) => {
  const schema = await getSchema(url);
  const compiled = await compile(schema);
  const interpretAst = (value, outputFormat) => interpret(compiled, Instance.fromJs(value), outputFormat);

  return value === undefined ? interpretAst : interpretAst(value, outputFormat);
};

export const compile = async (schema) => {
  const ast = { metaData: {}, plugins: new Set() };
  const schemaUri = await Validation.compile(schema, ast);
  return { ast, schemaUri };
};

export const interpret = curry(({ ast, schemaUri }, instance, outputFormat = FLAG) => {
  const context = { ast, plugins: [...ast.plugins] };

  switch (outputFormat) {
    case FLAG:
      break;
    case BASIC:
      context.plugins.push(basicOutputPlugin);
      break;
    case DETAILED:
      context.plugins.push(detailedOutputPlugin);
      break;
    default:
      throw Error(`Unsupported output format '${outputFormat}'`);
  }

  const valid = Validation.interpret(schemaUri, instance, context);
  return !valid && "errors" in context ? { valid, errors: context.errors } : { valid };
});

const metaValidators = {};
subscribe("validate.metaValidate", async (_message, schema) => {
  if (getShouldValidateSchema() && !schema.document.validated) {
    schema.document.validated = true;

    // Compile
    if (!(schema.document.dialectId in metaValidators)) {
      const metaSchema = await getSchema(schema.document.dialectId, schema);
      const compiledSchema = await compile(metaSchema);
      metaValidators[schema.document.dialectId] = interpret(compiledSchema);
    }

    // Interpret
    const schemaInstance = Instance.fromJs(schema.document.root, schema.document.baseUri);
    const metaResults = metaValidators[schema.document.dialectId](schemaInstance, getMetaSchemaOutputFormat());
    if (!metaResults.valid) {
      throw new InvalidSchemaError(metaResults);
    }
  }
});

/**
 * @deprecated since 1.7.0. Use registerSchema instead.
 */
export const addSchema = (schema, retrievalUri = undefined, contextDialectId = undefined) => {
  const dialectId = typeof schema.$schema === "string" ? toAbsoluteIri(schema.$schema) : contextDialectId;
  const idToken = getKeywordName(dialectId, "https://json-schema.org/keyword/id")
    || getKeywordName(dialectId, "https://json-schema.org/keyword/draft-04/id");
  const id = typeof schema[idToken] === "string" ? resolveIri(schema[idToken], retrievalUri) : retrievalUri;

  unregisterSchema(id);

  registerSchema(schema, retrievalUri, contextDialectId);
};

export const unregisterSchema = (uri) => {
  schemaUnregister(uri);
  delete metaValidators[uri];
};
