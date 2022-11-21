/**
 * Every dflow item has an identifier unique in its scope.
 * A node or edge id is unique in its graph.
 * An input or output id is unique in its node.
 */
export declare type DflowId = string;
/**
 * Every dflow item, e.g. `DflowNode`, `DflowEdge`, etc. is
 * serializable into JSON and must implement `DflowItem` interface.
 */
export interface DflowItem<Serializable extends DflowData> {
  /** Item identifier. */
  readonly id: DflowId;
  /**
   * Return serializable item,
   * i.e. an object that can be converted to JSON format.
   */
  toObject(): Serializable;
}
/**
 * A `DflowData` represents any data that can be serialized into JSON.
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
  /**
   * Infer `DflowDataType` of given argument.
   */
  static inferDataType(arg: unknown): DflowDataType[];
  /**
   * Type guard for `DflowArray`.
   * It checks recursively that every element is some `DflowData`.
   */
  static isArray(arg: unknown): arg is DflowArray;
  /**
   * Type guard for `boolean`.
   */
  static isBoolean(arg: unknown): arg is boolean;
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
   * Type guard for a valid dflow `number`, i.e. finite and not `NaN`.
   */
  static isNumber(arg: unknown): arg is number;
  /**
   * Type guard for `string`.
   */
  static isString(arg: unknown): arg is string;
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
 * `DflowPin` is a base class for `DflowInput` and `DflowOutput`.
 */
export declare class DflowPin {
  readonly name?: string;
  readonly nodeId: DflowId;
  readonly types: DflowDataType[];
  constructor(
    { nodeId, name, types }:
      & Pick<DflowPin, "nodeId" | "types">
      & Partial<Pick<DflowPin, "name">>,
  );
  /**
   * Check that types of output source are compatible with types of input target.
   */
  static canConnect(
    sourceTypes: DflowDataType[],
    targetTypes: DflowDataType[],
  ): boolean;
  /**
   * If `types` is an empty list, it is equivalent to an `any` type.
   */
  get hasTypeAny(): boolean;
  /**
   * Check that given type is compatible with pin types.
   */
  hasType(type: DflowDataType): boolean;
}
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
export declare type DflowInputDefinition = {
  name?: string;
  types: DflowDataType[];
  optional?: boolean;
};
export declare type DflowSerializableInput = {
  id: DflowId;
};
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
   * By default an input is **not** `optional`.
   * If an input is not `optional` and its data is not defined then its node will not be executed.
   * If an input is `optional`, then its node will be executed even if the inputs has no data.
   */
  optional?: boolean;
  constructor({ id, optional, ...pin }: {
    id: DflowId;
    nodeId: DflowId;
  } & DflowInputDefinition);
  /**
   * An input data is a reference to its connected output data, if any.
   */
  get data(): DflowData | undefined;
  get isConnected(): boolean;
  /**
   * Connect input to given output.
   */
  connectTo(pin: DflowOutput): void;
  /**
   * Disconnect from current output.
   */
  disconnect(): void;
  /**
   * Return serializable item.
   */
  toObject(): DflowSerializableInput;
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
export declare type DflowOutputDefinition = {
  name?: string;
  types: DflowDataType[];
  data?: DflowData;
};
export declare type DflowSerializableOutput = {
  id: DflowId;
  /** data */
  d?: DflowData;
};
/**
 * A `DflowOutput` is a node output pin.
 *
 * @implements DflowItem<DflowSerializableOutput>
 */
export declare class DflowOutput extends DflowPin
  implements DflowItem<DflowSerializableOutput> {
  readonly id: DflowId;
  private value;
  constructor({ id, data, ...pin }: {
    id: DflowId;
    nodeId: DflowId;
  } & DflowOutputDefinition);
  get data(): DflowData | undefined;
  set data(arg: unknown);
  clear(): void;
  /**
   * Return serializable item.
   */
  toObject(): DflowSerializableOutput;
}
export declare type DflowSerializableNode = {
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
export declare type DflowNodeConstructorArg =
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
  /**
   * Every dflow node must have its own `kind` that is used as *key*
   * to address it in the nodes catalog.
   */
  readonly kind: string;
  /**
   * `DflowNode` has a reference to its `DflowHost`.
   * It can be used in the node `run()` implementation.
   */
  readonly host: DflowHost;
  constructor({ id, kind, inputs, outputs, host }: DflowNodeConstructorArg);
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
  /**
   * Return serializable item.
   */
  toObject(): DflowSerializableNode;
}
export declare type DflowSerializableEdge = {
  id: DflowId;
  s: DflowEdge["source"];
  t: DflowEdge["target"];
};
/**
 * `DflowEdge` connects an `DflowOutput` to a `DflowInput`.
 *
 * @implements DflowItem<DflowSerializableEdge>
 */
export declare class DflowEdge implements DflowItem<DflowSerializableEdge> {
  readonly id: DflowId;
  /**
   * Path to output pin.
   */
  readonly source: [nodeId: DflowId, pinId: DflowId];
  /**
   * Path to input pin.
   */
  readonly target: [nodeId: DflowId, pinId: DflowId];
  constructor(
    { source, target, id }: Pick<DflowEdge, "id" | "source" | "target">,
  );
  /**
   * Return serializable item.
   */
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
  & Pick<DflowSerializableNode, "id" | "k" | "o">
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
  /** @ignore */
  static executionNodeInfo: (
    node: DflowSerializableNode,
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
  /**
   * Return serializable item.
   */
  toObject(): DflowSerializableGraph;
}
export declare type DflowHostConstructorArg = DflowGraphConstructorArg;
export declare class DflowHost {
  private graph;
  readonly context: Record<string, unknown>;
  constructor(arg: DflowHostConstructorArg);
  get executionReport(): DflowGraphExecutionReport | null;
  /**
   * List edge objects.
   */
  get edges(): Pick<DflowEdge, "id" | "source" | "target">[];
  /**
   * List node objects.
   */
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
   * Return serializable item.
   */
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
export declare class DflowErrorCannotConnectPins extends Error {
  constructor({ source, target }: Pick<DflowEdge, "source" | "target">);
}
export declare class DflowErrorInvalidInputData extends Error {
  constructor(nodeId: DflowId);
}
export declare class DflowErrorItemNotFound extends Error {
  constructor(
    item: "node" | "edge" | "input" | "output",
    { id, nodeId, position }: Partial<{
      id: DflowId;
      nodeId: DflowId;
      position: number;
    }>,
  );
}
export {};
