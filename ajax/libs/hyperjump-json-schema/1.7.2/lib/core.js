import curry from "just-curry-it";
import { resolveIri, toAbsoluteIri } from "@hyperjump/uri";
import { subscribe, unsubscribe } from "./pubsub.js";
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


export const FLAG = "FLAG", BASIC = "BASIC", DETAILED = "DETAILED", VERBOSE = "VERBOSE";
setMetaSchemaOutputFormat(FLAG);

export const validate = async (url, value = undefined, outputFormat = undefined) => {
  const schema = await getSchema(url);
  const compiled = await compile(schema);
  const interpretAst = (value, outputFormat) => interpret(compiled, Instance.cons(value), outputFormat);

  return value === undefined ? interpretAst : interpretAst(value, outputFormat);
};

export const compile = async (schema) => {
  const ast = { metaData: {} };
  const schemaUri = await Validation.compile(schema, ast);
  return { ast, schemaUri };
};

export const interpret = curry(({ ast, schemaUri }, value, outputFormat = FLAG) => {
  if (![FLAG, BASIC, DETAILED, VERBOSE].includes(outputFormat)) {
    throw Error(`The '${outputFormat}' error format is not supported`);
  }

  const output = [];
  const subscriptionToken = subscribe("result", outputHandler(outputFormat, output));
  try {
    Validation.interpret(schemaUri, value, ast, {});
  } finally {
    unsubscribe("result", subscriptionToken);
  }

  return output[0];
});

const outputHandler = (outputFormat, output) => {
  const resultStack = [];

  return (message, keywordResult) => {
    if (message === "result") {
      const { keyword, absoluteKeywordLocation, instanceLocation, valid } = keywordResult;
      const result = { keyword, absoluteKeywordLocation, instanceLocation, valid, errors: [] };
      resultStack.push(result);
    } else if (message === "result.start") {
      resultStack.push(message);
    } else if (message === "result.end") {
      const result = resultStack.pop();
      while (resultStack[resultStack.length - 1] !== "result.start") {
        const topResult = resultStack.pop();

        const errors = [topResult];
        if (outputFormat === BASIC) {
          errors.push(...topResult.errors);
          delete topResult.errors;
        }

        if (outputFormat === VERBOSE || (outputFormat !== FLAG && !topResult.valid)) {
          result.errors.unshift(...errors);
        }
      }
      resultStack[resultStack.length - 1] = result;

      output[0] = result;
    }
  };
};

const metaValidators = {};
subscribe("validate.metaValidate", async (_message, schema) => {
  if (getShouldValidateSchema() && !schema.document.validated) {
    schema.document.validated = true;

    // Compile
    if (!(schema.document.dialectId in metaValidators)) {
      const metaSchema = await getSchema(schema.document.dialectId);
      const compiledSchema = await compile(metaSchema);
      metaValidators[schema.document.dialectId] = interpret(compiledSchema);
    }

    // Interpret
    const schemaInstance = Instance.cons(schema.document.root, schema.document.baseUri);
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
