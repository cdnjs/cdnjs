/**
 * Every dflow item has an identifier unique in its scope.
 * A node or edge id is unique in its graph.
 * An input or output id is unique in its node.
 */
export type DflowId = number | string;
/**
 * A `DflowData` represents any data that can be serialized into JSON.
 */
export type DflowData =
  | null
  | boolean
  | number
  | string
  | DflowArray
  | DflowObject;
/** @ignore */
export type DflowObject = {
  [Key in string]?: DflowData;
};
/** @ignore */
export type DflowArray = DflowData[];
export type DflowDataType = (typeof Dflow.dataTypes)[number];
/**
 * Every dflow item (`DflowNode`, `DflowEdge`, etc.) and
 * every dflow error (`DflowErrorItemNotFound`, `DflowErrorInvalidInputData`, etc.)
 * is serializable into JSON.
 */
export interface DflowSerializable<Data extends DflowData> {
  /**
   * Return serializable data,
   * i.e. an object that can be converted to JSON format.
   * It will be called by `JSON.stringify`.
   */
  toJSON(): Data;
}
export type DflowConstructorArg = {
  nodesCatalog: DflowNodesCatalog;
};
/**
 * `Dflow` represents a program as an executable graph.
 * A graph can contain nodes and edges.
 * Nodes are executed, sorted by their connections.
 */
export declare class Dflow
  implements DflowSerializable<DflowSerializableGraph> {
  readonly context: Record<string, unknown>;
  readonly nodesCatalog: DflowNodesCatalog;
  /** @ignore */
  private nodesMap;
  /** @ignore */
  private edgesMap;
  runStatus: "running" | "success" | "failure" | null;
  executionReport: DflowExecutionReport | null;
  constructor({ nodesCatalog }: DflowConstructorArg);
  static dataTypes: string[];
  /**
   * Empty graph.
   */
  clear(): void;
  /**
   * Connect node A to node B.
   *
   * @example
   * ```ts
   * dflow.connect(nodeA).to(nodeB);
   * ```
   *
   * Both `connect()` and `to()` accept an optional second parameter:
   * the *position*, which defaults to 0.
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
  newNode(arg: {
    kind: string;
    id?: DflowId;
    inputs?: {
      id?: DflowId;
    }[];
    outputs?: {
      id?: DflowId;
      data?: DflowData;
    }[];
  }): DflowNode;
  /**
   * @throws {DflowErrorItemNotFound}
   */
  newEdge(
    arg: {
      id?: DflowId;
    } & Pick<DflowEdge, "source" | "target">,
  ): DflowEdge;
  /**
   * List edge objects.
   */
  get edges(): Pick<DflowEdge, "id" | "source" | "target">[];
  /**
   * List node objects.
   */
  get nodes(): DflowSerializableNode[];
  /** @ignore */
  get nodeConnections(): DflowNodeConnection[];
  /** @ignore */
  get nodeIdsInsideFunctions(): DflowId[];
  /**
   * Execute all nodes, sorted by their connections.
   */
  run(): Promise<void>;
  /** @ignore */
  toJSON(): DflowSerializableGraph;
  /** @ignore */
  static ancestorsOfNodeId(
    nodeId: DflowId,
    nodeConnections: DflowNodeConnection[],
  ): DflowId[];
  /**
   * Check that types of source are compatible with types of target.
   * @ignore
   */
  static canConnect(
    sourceTypes: DflowDataType[],
    targetTypes: DflowDataType[],
  ): boolean;
  /** @ignore */
  static childrenOfNodeId(nodeId: DflowId, nodeConnections: {
    sourceId: DflowId;
    targetId: DflowId;
  }[]): DflowId[];
  /** @ignore */
  static executionNodeInfo: (
    node: DflowNode,
    error?: DflowSerializableError,
  ) => DflowExecutionNodeInfo;
  /**
   * Infer `DflowDataType` of given argument.
   */
  static inferDataType(arg: unknown): DflowDataType[];
  /** @ignore */
  static levelOfNodeId(
    nodeId: DflowId,
    nodeConnections: DflowNodeConnection[],
  ): number;
  /**
   * `Dlow.input()` is a `DflowInputDefinition` helper.
   *
   * @example
   * ```ts
   * const { input } = Dflow;
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
   * Dflow.input("number")
   * ```
   *
   * Optional `number` input.
   *
   * @example
   *
   * ```ts
   * Dflow.input("number", { optional: true })
   * ```
   *
   * Input that accepts both `number` and `string` type.
   *
   * @example
   *
   * ```ts
   * Dflow.input(["number", "string"])
   * ```
   *
   * Input with any type.
   *
   * @example
   * ```ts
   * Dflow.input()
   * ```
   *
   * Input with type `array` and name.
   *
   * @example
   * ```ts
   * Dflow.input("array", { name: "list" })
   * ```
   *
   * Input with any type and named "foo".
   *
   * @example
   * ```ts
   * Dflow.input([], { name: "foo" })
   * ```
   */
  static input(
    typing?: DflowDataType | DflowDataType[],
    rest?: Omit<DflowInputDefinition, "types">,
  ): DflowInputDefinition;
  /**
   * `Dflow.output()` is a `DflowOutputDefinition` helper.
   *
   * @example
   * ```ts
   * const { output } = Dflow;
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
   * Dflow.output("number", { name: "answer" })
   * ```
   *
   * @see {@link Dflow.input} for other similar examples.
   *
   * `DflowOutputDefinition` has also an optional `data` attribute.
   *
   * @example
   * ```ts
   * Dflow.output("number", { data: 42, name: "answer" })
   * ```
   */
  static output(
    typing?: DflowDataType | DflowDataType[],
    rest?: Omit<DflowOutputDefinition, "types">,
  ): DflowOutputDefinition;
  /** @ignore */
  static parentsOfNodeId(nodeId: DflowId, nodeConnections: {
    sourceId: DflowId;
    targetId: DflowId;
  }[]): DflowId[];
  /** @ignore */
  static sortNodesByLevel(
    nodeIds: DflowId[],
    nodeConnections: DflowNodeConnection[],
  ): DflowId[];
  /**
   * Type guard for `DflowArray`.
   * It checks recursively that every element is some `DflowData`.
   */
  static isArray(arg: unknown): arg is DflowArray;
  /**
   * Type guard for `DflowId`.
   */
  static isDflowId(arg: unknown): arg is DflowId;
  /**
   * Type guard for `DflowObject`.
   * It checks recursively that every value is some `DflowData`.
   */
  static isObject(arg: unknown): arg is DflowObject;
  /**
   * Type guard for a valid number, i.e. finite and not `NaN`.
   */
  static isNumber(arg: unknown): arg is number;
  /**
   * Type guard for `DflowData`.
   */
  static isDflowData(arg: unknown): arg is DflowData;
  /**
   * Validate that data belongs to some of given types.
   */
  static isValidDataType(types: DflowDataType[], data: unknown): boolean;
}
/**
 * `DflowIO` is a base type for `DflowInput` and `DflowOutput`.
 */
type DflowIO = {
  readonly id: DflowId;
  readonly name?: string;
  readonly nodeId: DflowId;
  readonly types: DflowDataType[];
};
/**
 * A `DflowNode` describes its inputs as a list of `DflowInputDefinition`.
 * @example
 * ```json
 *   {
 *     "name": "label",
 *     "types": ["string"],
 *     "optional": true
 *   }
 * ```
 */
export type DflowInputDefinition = {
  name?: string;
  types: DflowDataType[];
  optional?: boolean;
};
export type DflowSerializableInput = {
  id: DflowId;
};
/**
 * A `DflowInput` is a node input.
 *
 * @implements DflowSerializable<DflowSerializableInput>
 */
export declare class DflowInput
  implements DflowIO, DflowSerializable<DflowSerializableInput> {
  readonly id: DflowId;
  readonly name?: string;
  readonly nodeId: DflowId;
  readonly types: DflowDataType[];
  source?: DflowOutput;
  /**
   * By default an input is **not** `optional`.
   * If an input is not `optional` and its data is not defined then its node will not be executed.
   * If an input is `optional`, then its node will be executed even if the inputs has no data.
   */
  optional?: boolean;
  constructor({ id, name, nodeId, optional, types }: {
    id: DflowId;
    nodeId: DflowId;
  } & DflowInputDefinition);
  /**
   * An input data is a reference to its connected output data, if any.
   */
  get data(): DflowData | undefined;
  /** @ignore */
  toJSON(): DflowSerializableInput;
}
/**
 * A `DflowNode` describes its outputs as a list of `DflowOutputDefinition`.
 * @example
 * ```json
 *   {
 *     "name": "sum",
 *     "types": ["number"],
 *   }
 * ```
 */
export type DflowOutputDefinition = {
  name?: string;
  types: DflowDataType[];
  data?: DflowData;
};
export type DflowSerializableOutput = {
  id: DflowId;
  /** data */
  d?: DflowData;
};
/**
 * A `DflowOutput` is a node output.
 *
 * @implements DflowSerializable<DflowSerializableOutput>
 */
export declare class DflowOutput
  implements DflowIO, DflowSerializable<DflowSerializableOutput> {
  readonly id: DflowId;
  readonly name?: string;
  readonly nodeId: DflowId;
  readonly types: DflowDataType[];
  private value;
  constructor({ id, data, name, nodeId, types }: {
    id: DflowId;
    nodeId: DflowId;
  } & DflowOutputDefinition);
  get data(): DflowData | undefined;
  set data(arg: unknown);
  clear(): void;
  /** @ignore */
  toJSON(): DflowSerializableOutput;
}
export type DflowSerializableNode = {
  id: DflowId;
  /** kind */
  k: DflowNode["kind"];
  /** inputs */
  i?: DflowSerializableInput[];
  /** outputs */
  o?: DflowSerializableOutput[];
};
/**
 * `DflowNode` constructor accepts a single argument.
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
export type DflowNodeConstructorArg =
  & Pick<DflowNode, "id" | "kind" | "host">
  & {
    inputs?: ({
      id?: DflowId;
    } & DflowInputDefinition)[];
    outputs?: ({
      id?: DflowId;
    } & DflowOutputDefinition)[];
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
 * @implements DflowSerializable<DflowSerializableNode>
 */
export declare class DflowNode
  implements DflowSerializable<DflowSerializableNode> {
  readonly id: DflowId;
  /** @ignore */
  private inputsMap;
  /** @ignore */
  private outputsMap;
  /** @ignore */
  private inputPosition;
  /** @ignore */
  private outputPosition;
  /**
   * Every dflow node must have its own `kind` that is used as *key*
   * to address it in the nodes catalog.
   */
  readonly kind: string;
  /**
   * `DflowNode` has a reference to its `Dflow` host.
   * It can be used in the node `run()` implementation.
   */
  readonly host: Dflow;
  constructor({ id, kind, inputs, outputs, host }: DflowNodeConstructorArg);
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
  /** @ignore */
  toJSON(): DflowSerializableNode;
}
export type DflowSerializableEdge = {
  id: DflowId;
  s: DflowEdge["source"];
  t: DflowEdge["target"];
};
/**
 * `DflowEdge` connects an `DflowOutput` to a `DflowInput`.
 */
export type DflowEdge = {
  readonly id: DflowId;
  /**
   * Path to output.
   */
  readonly source: [nodeId: DflowId, outputId: DflowId];
  /**
   * Path to input.
   */
  readonly target: [nodeId: DflowId, inputId: DflowId];
};
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
export type DflowNodesCatalog = Record<DflowNode["kind"], DflowNodeDefinition>;
/**
 * Contains info about node execution, that is:
 * the serialized node except its inputs; an error, if any.
 */
export type DflowExecutionNodeInfo = Omit<DflowSerializableNode, "i"> & {
  /** Error during execution */
  err?: DflowSerializableError;
};
export type DflowExecutionReport = {
  status: Exclude<Dflow["runStatus"], null>;
  start: number;
  end: number;
  steps: DflowExecutionNodeInfo[];
};
export type DflowSerializableGraph = {
  nodes: DflowSerializableNode[];
  edges: DflowSerializableEdge[];
};
type DflowNodeConnection = {
  sourceId: DflowId;
  targetId: DflowId;
};
/**
 * This class is used to instantiate a new node which `kind` was not found in `nodesCatalog`.
 * The "unknown" node class is not included in `coreNodesCatalog`.
 */
export declare class DflowNodeUnknown extends DflowNode {
}
/** Builtin nodes, always included in `nodesCatalog`. */
export declare const coreNodesCatalog: DflowNodesCatalog;
export type DflowSerializableErrorCode = {
  /** error code */
  _: string;
};
export type DflowSerializableError =
  | DflowSerializableErrorItemNotFound
  | DflowSerializableErrorInvalidInputData
  | DflowSerializableErrorCannotConnectSourceToTarget
  | DflowSerializableErrorCannotExecuteAsyncFunction;
export type DflowSerializableErrorCannotConnectSourceToTarget =
  & DflowSerializableErrorCode
  & {
    /** source */
    s: DflowErrorCannotConnectSourceToTarget["source"];
    /** target */
    t: DflowErrorCannotConnectSourceToTarget["target"];
  };
export declare class DflowErrorCannotConnectSourceToTarget extends Error
  implements
    DflowSerializable<DflowSerializableErrorCannotConnectSourceToTarget> {
  readonly source: DflowEdge["source"];
  readonly target: DflowEdge["target"];
  static code: string;
  static message(
    { s, t }: Omit<DflowSerializableErrorCannotConnectSourceToTarget, "_">,
  ): string;
  constructor(
    { source, target }: Pick<
      DflowErrorCannotConnectSourceToTarget,
      "source" | "target"
    >,
  );
  /** @ignore */
  toJSON(): DflowSerializableErrorCannotConnectSourceToTarget;
}
export type DflowSerializableErrorInvalidInputData =
  & DflowSerializableErrorCode
  & {
    /** nodeId */
    nId: DflowErrorInvalidInputData["nodeId"];
  };
export declare class DflowErrorInvalidInputData extends Error
  implements DflowSerializable<DflowSerializableErrorInvalidInputData> {
  static code: string;
  readonly nodeId: DflowId;
  static message(
    { nId: nodeId }: Omit<DflowSerializableErrorInvalidInputData, "_">,
  ): string;
  constructor(nodeId: DflowErrorInvalidInputData["nodeId"]);
  /** @ignore */
  toJSON(): DflowSerializableErrorInvalidInputData;
}
export type DflowSerializableErrorItemNotFound = DflowSerializableErrorCode & {
  item: DflowErrorItemNotFound["item"];
  id?: DflowErrorItemNotFound["info"]["id"];
  /** nodeId */
  nId?: DflowErrorItemNotFound["info"]["nodeId"];
  /** position */
  p?: DflowErrorItemNotFound["info"]["position"];
};
export declare class DflowErrorItemNotFound extends Error
  implements DflowSerializable<DflowSerializableErrorItemNotFound> {
  static code: string;
  readonly item: "node" | "edge" | "input" | "output";
  readonly info: Partial<{
    id: DflowId;
    nodeId: DflowId;
    position: number;
  }>;
  static message(
    { item, id, nId: nodeId, p: position }: Omit<
      DflowSerializableErrorItemNotFound,
      "_"
    >,
  ): string;
  constructor(
    item: DflowErrorItemNotFound["item"],
    info?: DflowErrorItemNotFound["info"],
  );
  /** @ignore */
  toJSON(): DflowSerializableErrorItemNotFound;
}
export type DflowSerializableErrorCannotExecuteAsyncFunction =
  DflowSerializableErrorCode;
export declare class DflowErrorCannotExecuteAsyncFunction extends Error
  implements
    DflowSerializable<DflowSerializableErrorCannotExecuteAsyncFunction> {
  static code: string;
  static message(): string;
  constructor();
  /** @ignore */
  toJSON(): DflowSerializableErrorCode;
}
export {};
