import { ClazzOrModelSchema, RefLookupFunction, AdditionalPropArgs, PropSchema } from "../api/types";
/**
 * `reference` can be used to (de)serialize references that point to other models.
 *
 * The first parameter should be either a ModelSchema that has an `identifier()` property (see identifier)
 * or a string that represents which attribute in the target object represents the identifier of the object.
 *
 * The second parameter is a lookup function that is invoked during deserialization to resolve an identifier to
 * an object. Its signature should be as follows:
 *
 * `lookupFunction(identifier, callback, context)` where:
 * 1. `identifier` is the identifier being resolved
 * 2. `callback` is a node style calblack function to be invoked with the found object (as second arg) or an error (first arg)
 * 3. `context` see context.
 *
 * The lookupFunction is optional. If it is not provided, it will try to find an object of the expected type and required identifier within the same JSON document
 *
 * N.B. mind issues with circular dependencies when importing model schemas from other files! The module resolve algorithm might expose classes before `createModelSchema` is executed for the target class.
 *
 * @example
 * class User {}
 * class Post {}
 *
 * createModelSchema(User, {
 *     uuid: identifier(),
 *     displayname: primitive(),
 * })
 *
 * createModelSchema(Post, {
 *     author: reference(User, findUserById),
 *     message: primitive(),
 * })
 *
 * function findUserById(uuid, callback) {
 *     fetch('http://host/user/' + uuid)
 *         .then(userData => {
 *             deserialize(User, userData, callback)
 *         })
 *         .catch(callback)
 * }
 *
 * deserialize(
 *     Post,
 *     {
 *         message: 'Hello World',
 *         author: 234,
 *     },
 *     (err, post) => {
 *         console.log(post)
 *     }
 * )
 *
 * @param target: ModelSchema or string
 * @param lookupFn optional function or additionalArgs object
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function reference(modelSchema: ClazzOrModelSchema<any>, lookupFn?: RefLookupFunction, additionalArgs?: AdditionalPropArgs): PropSchema;
export default function reference(modelSchema: ClazzOrModelSchema<any>, additionalArgs?: AdditionalPropArgs): PropSchema;
export default function reference(identifierAttr: string, lookupFn: RefLookupFunction, additionalArgs?: AdditionalPropArgs): PropSchema;
