/**
 * Every DflowItem has an identifier unique in its scope.
 * A node or edge id is unique in its graph.
 * An input or output id is unique in its node.
 */
export declare type DflowId = string;
/**
 * A pin can be of kind "input" or "output"
 */
declare type DflowPinKind = "input" | "output";
/**
 * An item can be a pin, node or edge
 */
declare type DflowItemKind = DflowPinKind | "node" | "edge";
declare type DflowSerializableItem = {
  id: DflowId;
};
declare type DflowItemConstructorArg = DflowSerializableItem;
interface DflowItem<Serializable extends DflowData> {
  /** Item identifier */
  readonly id: DflowId;
  /**
   * Return serializable item,
   * i.e. an object that can be converted to JSON format.
   */
  toObject(): Serializable;
}
/**
 * A `DflowData` represents input or output data and can be serialized into JSON.
 */
export declare type DflowData =
  | string
  | number
  | boolean
  | DflowArray
  | DflowObject;
/** @ignore */
export declare type DflowObject = {
  [Key in string]?: DflowData;
};
/** @ignore */
export declare type DflowArray = DflowData[];
export declare type DflowDataType = typeof Dflow.dataTypes[number];
/**
 * `Dflow` is a static class with methods to handle Dflow data.
 */
export declare class Dflow {
  static dataTypes: string[];
  static inferDataType(data: unknown): DflowDataType[];
  static isArray(arg: unknown): arg is DflowArray;
  static isBoolean(arg: unknown): arg is boolean;
  static isDflowId(arg: unknown): arg is DflowId;
  static isObject(arg: unknown): arg is DflowObject;
  static isNumber(arg: unknown): arg is number;
  static isString(arg: unknown): arg is string;
  static isDflowData(arg: unknown): arg is DflowData;
  static isValidDataType(types: DflowDataType[], data: unknown): boolean;
}
declare type DflowSerializablePin =
  & DflowSerializableItem
  & Partial<Pick<DflowPin, "name">>;
declare type DflowPinDefinition =
  & Pick<DflowPin, "types">
  & Partial<Pick<DflowPin, "name">>;
declare type DflowPinConstructorArg = Partial<Pick<DflowPin, "name" | "types">>;
export declare class DflowPin {
  readonly name?: string;
  readonly types: DflowDataType[];
  constructor({ name, types }: DflowPinConstructorArg);
  static canConnect(
    sourceTypes: DflowDataType[],
    targetTypes: DflowDataType[],
  ): boolean;
  get hasTypeAny(): boolean;
  hasType(type: DflowDataType): boolean;
}
declare type DflowInputDefinition =
  & DflowPinDefinition
  & Partial<Pick<DflowInput, "optional">>;
declare type DflowInputConstructorArg =
  & DflowItemConstructorArg
  & DflowPinConstructorArg
  & Pick<DflowInputDefinition, "optional">;
export declare type DflowSerializableInput = DflowSerializablePin;
/**
 * A `DflowInput` is a node input pin.
 *
 * @implements DflowItem<DflowSerializableInput>
 */
export declare class DflowInput extends DflowPin
  implements DflowItem<DflowSerializableInput> {
  readonly id: DflowId;
  private source?;
  /**
   * If an input is not optional and its data is not defined then its node will not be executed.
   * If an input is optional, then its node will be executed even if the inputs has no data.
   * By default an input is not optional.
   */
  optional?: boolean;
  constructor({ id, optional, ...pin }: DflowInputConstructorArg);
  /**
   * An input data is a reference to its connected output data, if any.
   */
  get data(): DflowData | undefined;
  get isConnected(): boolean;
  connectTo(pin: DflowOutput): void;
  disconnect(): void;
  /** Return serializable item. */
  toObject(): DflowSerializableInput;
}
declare type DflowOutputDefinition = DflowPinDefinition & {
  data?: DflowData;
};
declare type DflowOutputData = {
  data?: DflowData | undefined;
};
export declare type DflowSerializableOutput =
  & DflowSerializablePin
  & DflowOutputData;
declare type DflowOutputConstructorArg =
  & DflowItemConstructorArg
  & DflowPinConstructorArg
  & DflowOutputData;
/**
 * A `DflowOutput` is a node output pin.
 *
 * @implements DflowItem<DflowSerializableOutput>
 */
export declare class DflowOutput extends DflowPin
  implements DflowItem<DflowSerializableOutput> {
  readonly id: DflowId;
  private value;
  constructor({ id, data, ...pin }: DflowOutputConstructorArg);
  get data(): DflowData | undefined;
  set data(arg: unknown);
  clear(): void;
  /** Return serializable item. */
  toObject(): DflowSerializableOutput;
}
export declare type DflowSerializableNode =
  & DflowSerializableItem
  & Pick<DflowNode, "kind">
  & {
    inputs?: DflowSerializableInput[];
    outputs?: DflowSerializableOutput[];
  };
/**
 * DflowNode constructor accepts a single argument.
 *
 * You can import `DflowNodeConstructorArg` type as a helper,
 * for example if you need to create a node that does something in the constructor.
 *
 * @example
 * ```ts
 * class DflowNodeFunction extends DflowNode {
 *   static kind = "function";
 *   static outputs = [output("DflowId", { name: "id" })];
 *   constructor(arg: DflowNodeConstructorArg) {
 *     super(arg);
 *     this.output(0).data = this.id;
 *   }
 * }
 * ```
 */
export declare type DflowNodeConstructorArg = {
  node: DflowSerializableNode;
  host: DflowHost;
};
/**
 * `DflowNode` represents a block of code: it can have inputs and outputs.
 *
 * Extend it to create a node.
 *
 * @example
 * ```ts
 * const { input, output } = DflowNode;

 * class Addition extends DflowNode {
 *   static kind = "addition";
 *   static inputs = [input("number"), input("number")];
 *   static outputs = [output("number")];
 *   run() {
 *     this.output(0).data = (this.input(0).data as number) +
 *       (this.input(1).data as number);
 *   }
 * }
 * ```
 *
 * @implements DflowItem<DflowSerializableNode>
 */
export declare class DflowNode implements DflowItem<DflowSerializableNode> {
  readonly id: DflowId;
  /** @ignore */
  private inputsMap;
  /** @ignore */
  private outputsMap;
  /** @ignore */
  private inputPosition;
  /** @ignore */
  private outputPosition;
  readonly kind: string;
  readonly host: DflowHost;
  constructor(
    { node: { id, kind, inputs, outputs }, host }: DflowNodeConstructorArg,
  );
  /**
   * `DlowNode.input()` is a `DflowInputDefinition` helper.
   *
   * @example
   * ```ts
   * const { input } = DflowNode;
   *
   * export class Echo extends DflowNode {
   *   static kind = "echo";
   *   static inputs = [input("string")];
   *   run () {
   *     console.log(this.input(0).data as string);
   *   }
   * }
   * ```
   *
   * Input with `number` type.
   *
   * @example
   * ```ts
   * input("number")
   * ```
   *
   * Optional `number` input.
   *
   * @example
   *
   * ```ts
   * input("number", { optional: true })
   * ```
   *
   * Input that accepts both `number` and `string` type.
   *
   * @example
   *
   * ```ts
   * input(["number", "string"])
   * ```
   *
   * Input with any type.
   *
   * @example
   * ```ts
   * input()
   * ```
   *
   * Input with type `array` and name.
   *
   * @example
   * ```ts
   * input("array", { name: "list" })
   * ```
   *
   * Input with any type and named "foo".
   *
   * @example
   * ```ts
   * input([], { name: "foo" })
   * ```
   */
  static input(
    typing?: DflowDataType | DflowDataType[],
    rest?: Omit<DflowInputDefinition, "types">,
  ): DflowInputDefinition;
  /**
   * `DflowNode.output()` is a `DflowOutputDefinition` helper.
   *
   * @example
   * ```ts
   * const { output } = DflowNode;
   *
   * export class MathPI extends DflowNode {
   *   static kind = "mathPI";
   *   static outputs = [output("number", { name: "π", data: Math.PI })];
   * }
   * ```
   *
   * Named output with `number` type.
   *
   * @example
   * ```ts
   * input("number", { name: "answer" })
   * ```
   *
   * @see {@link DflowNode.input} for other similar examples.
   *
   * `DflowOutputDefinition` has also an optional `data` attribute.
   *
   * @example
   * ```ts
   * input("number", { data: 42, name: "answer" })
   * ```
   */
  static output(
    typing?: DflowDataType | DflowDataType[],
    rest?: Omit<DflowOutputDefinition, "types">,
  ): DflowOutputDefinition;
  get inputsDataAreValid(): boolean;
  clearOutputs(): void;
  /**
   * @throws {DflowErrorItemNotFound}
   */
  getInputById(id: DflowId): DflowInput;
  /**
   * Get input by position.
   *
   * @throws {DflowErrorItemNotFound}
   */
  input(position: number): DflowInput;
  /**
   * @throws {DflowErrorItemNotFound}
   */
  getOutputById(id: DflowId): DflowOutput;
  /**
   * Get output by position.
   *
   * @throws {DflowErrorItemNotFound}
   */
  output(position: number): DflowOutput;
  /** @ignore this method, it should be overridden. */
  run(): void | Promise<void>;
  /** Return serializable item. */
  toObject(): DflowSerializableNode;
}
declare type DflowSerializablePinPath = [nodeId: DflowId, pinId: DflowId];
export declare type DflowSerializableEdge = DflowSerializableItem & {
  source: DflowSerializablePinPath;
  target: DflowSerializablePinPath;
};
declare type DflowEdgeConstructorArg = DflowSerializableEdge;
/**
 * `DflowEdge` connects an input to an output.
 *
 * @implements DflowItem<DflowSerializableEdge>
 */
export declare class DflowEdge implements DflowItem<DflowSerializableEdge> {
  readonly id: DflowId;
  /** Path to output pin. */
  readonly source: DflowSerializablePinPath;
  /** Path to input pin. */
  readonly target: DflowSerializablePinPath;
  constructor({ source, target, id }: DflowEdgeConstructorArg);
  /** Return serializable item. */
  toObject(): DflowSerializableEdge;
}
/**
 * A class extending `DflowNode` must implement `DflowNodeDefinition` interface,
 * to be used as a value in a `DflowNodesCatalog`.
 */
export interface DflowNodeDefinition {
  new (arg: DflowNodeConstructorArg): DflowNode;
  kind: DflowNode["kind"];
  inputs?: DflowInputDefinition[];
  outputs?: DflowOutputDefinition[];
}
/**
 * A `DflowNodesCatalog` is a record containing node classes indexed by their kind.
 *
 * @example
 * ```ts
 * const nodesCatalog: DflowNodesCatalog = {
 *   myNode: MyNodeClass
 * }
 * ```
 */
export declare type DflowNodesCatalog = Record<
  DflowNode["kind"],
  DflowNodeDefinition
>;
export declare type DflowGraphRunStatus = "running" | "success" | "failure";
export declare type DflowExecutionNodeInfo =
  & Pick<DflowSerializableNode, "id" | "kind" | "outputs">
  & {
    error?: string;
  };
export declare type DflowGraphExecutionReport = {
  status: DflowGraphRunStatus;
  start: string;
  end: string;
  steps: DflowExecutionNodeInfo[];
};
export declare type DflowSerializableGraph = {
  nodes: DflowSerializableNode[];
  edges: DflowSerializableEdge[];
};
declare type DflowNodeConnection = {
  sourceId: DflowId;
  targetId: DflowId;
};
declare type DflowGraphConstructorArg = {
  nodesCatalog: DflowNodesCatalog;
};
/**
 * `DflowGraph` represents a program.
 * It can contain nodes and edges. Nodes are executed, sorted by their connections.
 */
export declare class DflowGraph {
  readonly nodesCatalog: DflowNodesCatalog;
  /** @ignore */
  readonly nodesMap: Map<DflowId, DflowNode>;
  /** @ignore */
  readonly edgesMap: Map<DflowId, DflowEdge>;
  runStatus: DflowGraphRunStatus | null;
  executionReport: DflowGraphExecutionReport | null;
  constructor({ nodesCatalog }: DflowGraphConstructorArg);
  /** @ignore */
  static childrenOfNodeId(nodeId: DflowId, nodeConnections: {
    sourceId: DflowId;
    targetId: DflowId;
  }[]): string[];
  static executionNodeInfo: (
    { id, kind, outputs }: DflowSerializableNode,
    error?: string,
  ) => DflowExecutionNodeInfo;
  /** @ignore */
  static parentsOfNodeId(nodeId: DflowId, nodeConnections: {
    sourceId: DflowId;
    targetId: DflowId;
  }[]): string[];
  /** @ignore */
  static ancestorsOfNodeId(
    nodeId: DflowId,
    nodeConnections: DflowNodeConnection[],
  ): DflowId[];
  /** @ignore */
  static levelOfNodeId(
    nodeId: DflowId,
    nodeConnections: DflowNodeConnection[],
  ): number;
  /** @ignore */
  get nodeConnections(): DflowNodeConnection[];
  /** @ignore */
  get nodeIdsInsideFunctions(): DflowId[];
  /** @ignore */
  static sortNodesByLevel(
    nodeIds: DflowId[],
    nodeConnections: DflowNodeConnection[],
  ): DflowId[];
  /**
   * Execute all nodes, sorted by their connections.
   */
  run(): Promise<void>;
  /** Return serializable item. */
  toObject(): DflowSerializableGraph;
}
declare type DflowNewItem = Partial<Pick<DflowSerializableItem, "id">>;
declare type DflowNewInput = DflowNewItem;
declare type DflowNewOutput =
  & DflowNewItem
  & Partial<Pick<DflowOutputConstructorArg, "data">>;
declare type DflowNewNode =
  & DflowNewItem
  & Pick<DflowSerializableNode, "kind">
  & {
    inputs?: DflowNewInput[];
    outputs?: DflowNewOutput[];
  };
declare type DflowNewEdge =
  & DflowNewItem
  & Pick<DflowSerializableEdge, "source" | "target">;
export declare type DflowHostConstructorArg = DflowGraphConstructorArg;
export declare class DflowHost {
  private graph;
  readonly context: Record<string, unknown>;
  constructor(arg: DflowHostConstructorArg);
  get executionReport(): DflowGraphExecutionReport | null;
  /** List edge objects. */
  get edges(): DflowSerializableEdge[];
  /** List node objects. */
  get nodes(): DflowSerializableNode[];
  get nodesCatalog(): DflowNodesCatalog;
  get runStatus(): DflowGraphRunStatus | null;
  /**
   * Empty graph.
   *
   * @example
   * ```ts
   * const previousGraph = dflow.graph;
   * dflow.clearGraph();
   * ```
   */
  clearGraph(): void;
  /**
   * Connect node A to node B.
   *
   * @example
   * ```ts
   * dflow.connect(nodeA).to(nodeB);
   * ```
   *
   * Both `connect()` and `to()` accept an optional second parameter:
   * the *pin position*, which defaults to 0.
   *
   * @example
   * ```ts
   * dflow.connect(nodeA, outputPosition).to(nodeB, inputPosition);
   * ```
   *
   * @throws {DflowErrorItemNotFound}
   */
  connect(sourceNode: DflowNode, sourcePosition?: number): {
    to: (targetNode: DflowNode, targetPosition?: number) => void;
  };
  /**
   * Delete edge with given id.
   * @throws {DflowErrorItemNotFound}
   */
  deleteEdge(edgeId: DflowId): void;
  /**
   * Delete node with given id.
   * @throws {DflowErrorItemNotFound}
   */
  deleteNode(nodeId: DflowId): void;
  executeFunction(functionId: DflowId, args: DflowArray): DflowData | undefined;
  /**
   * @throws {DflowErrorItemNotFound}
   */
  getEdgeById(id: DflowId): DflowEdge;
  /**
   * @throws {DflowErrorItemNotFound}
   */
  getNodeById(id: DflowId): DflowNode;
  newNode(obj: DflowNewNode): DflowNode;
  /**
   * @throws {DflowErrorItemNotFound}
   */
  newEdge(obj: DflowNewEdge): DflowEdge;
  /** Return serializable graph. */
  toObject(): DflowSerializableGraph;
  /** Execute graph. */
  run(): Promise<void>;
}
/**
 * This class is used to instantiate a new node which `kind` was not found in `nodesCatalog`.
 * The "unknown" node class is not included in `coreNodesCatalog`.
 */
export declare class DflowNodeUnknown extends DflowNode {
}
/** Builtin nodes, always included in `nodesCatalog`. */
export declare const coreNodesCatalog: DflowNodesCatalog;
declare const dflowErrors: readonly [
  "CannotConnectPins",
  "InvalidInputData",
  "ItemNotFound",
];
declare type DflowErrorName = typeof dflowErrors[number];
/**
 * DflowError is an abstract class extending Error.
 * Its message is a JSON string.
 */
export declare class DflowError extends Error {
  constructor(arg: DflowObject, errorName: DflowErrorName);
}
export declare type DflowSerializableErrorCannotConnectPins = {
  source: DflowSerializableOutput;
  target: DflowSerializableInput;
};
export declare class DflowErrorCannotConnectPins extends DflowError {
  constructor(arg: DflowSerializableErrorCannotConnectPins);
}
export declare class DflowErrorInvalidInputData extends DflowError {
  constructor(arg: DflowSerializableErrorInvalidInputData);
}
export declare type DflowSerializableErrorInvalidInputData = {
  nodeId: DflowSerializableNode["id"];
};
export declare class DflowErrorItemNotFound extends DflowError {
  constructor(arg: DflowSerializableErrorItemNotFound);
}
export declare type DflowSerializableErrorItemNotFound = {
  kind: DflowItemKind;
  id?: DflowId;
  nodeId?: DflowId;
  position?: number;
};
export {};
