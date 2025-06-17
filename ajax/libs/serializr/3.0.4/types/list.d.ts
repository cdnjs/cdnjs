import { AdditionalPropArgs, PropSchema } from "../api/types";
/**
 * List indicates that this property contains a list of things.
 * Accepts a sub model schema to serialize the contents
 *
 * @example
 * class SubTask {}
 * class Task {}
 * class Todo {}
 *
 * createModelSchema(SubTask, {
 *     title: true,
 * })
 * createModelSchema(Todo, {
 *     title: true,
 *     subTask: list(object(SubTask)),
 * })
 *
 * const todo = deserialize(Todo, {
 *     title: 'Task',
 *     subTask: [
 *         {
 *             title: 'Sub task 1',
 *         },
 *     ],
 * })
 *
 * @param propSchema to be used to (de)serialize the contents of the array
 * @param additionalArgs optional object that contains beforeDeserialize and/or afterDeserialize handlers
 */
export default function list(propSchema: PropSchema, additionalArgs?: AdditionalPropArgs): PropSchema;
