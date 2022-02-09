import {AbstractGraph, Attributes} from 'graphology-types';

export default class Graph<
  NodeAttributes extends Attributes = Attributes,
  EdgeAttributes extends Attributes = Attributes,
  GraphAttributes extends Attributes = Attributes
> extends AbstractGraph<NodeAttributes, EdgeAttributes, GraphAttributes> {}
export class DirectedGraph<
  NodeAttributes extends Attributes = Attributes,
  EdgeAttributes extends Attributes = Attributes,
  GraphAttributes extends Attributes = Attributes
> extends Graph<NodeAttributes, EdgeAttributes, GraphAttributes> {}
export class UndirectedGraph<
  NodeAttributes extends Attributes = Attributes,
  EdgeAttributes extends Attributes = Attributes,
  GraphAttributes extends Attributes = Attributes
> extends Graph<NodeAttributes, EdgeAttributes, GraphAttributes> {}
export class MultiGraph<
  NodeAttributes extends Attributes = Attributes,
  EdgeAttributes extends Attributes = Attributes,
  GraphAttributes extends Attributes = Attributes
> extends Graph<NodeAttributes, EdgeAttributes, GraphAttributes> {}
export class MultiDirectedGraph<
  NodeAttributes extends Attributes = Attributes,
  EdgeAttributes extends Attributes = Attributes,
  GraphAttributes extends Attributes = Attributes
> extends Graph<NodeAttributes, EdgeAttributes, GraphAttributes> {}
export class MultiUndirectedGraph<
  NodeAttributes extends Attributes = Attributes,
  EdgeAttributes extends Attributes = Attributes,
  GraphAttributes extends Attributes = Attributes
> extends Graph<NodeAttributes, EdgeAttributes, GraphAttributes> {}

export class InvalidArgumentsGraphError extends Error {}
export class NotFoundGraphError extends Error {}
export class UsageGraphError extends Error {}
