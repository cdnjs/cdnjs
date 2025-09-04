import {
  __name
} from "./chunk-ZW26E7AF.mjs";

// src/render.ts
import { curveLinear } from "d3";
import ELK from "elkjs/lib/elk.bundled.js";

// src/find-common-ancestor.ts
var findCommonAncestor = /* @__PURE__ */ __name((id1, id2, { parentById }) => {
  const visited = /* @__PURE__ */ new Set();
  let currentId = id1;
  if (id1 === id2) {
    return parentById[id1] || "root";
  }
  while (currentId) {
    visited.add(currentId);
    if (currentId === id2) {
      return currentId;
    }
    currentId = parentById[currentId];
  }
  currentId = id2;
  while (currentId) {
    if (visited.has(currentId)) {
      return currentId;
    }
    currentId = parentById[currentId];
  }
  return "root";
}, "findCommonAncestor");

// src/render.ts
var epsilon = 1e-4;
function distance(p1, p2) {
  if (!p1 || !p2) {
    return 0;
  }
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
__name(distance, "distance");
var render = /* @__PURE__ */ __name(async (data4Layout, svg, {
  common,
  getConfig,
  insertCluster,
  insertEdge,
  insertEdgeLabel,
  insertMarkers,
  insertNode,
  interpolateToCurve,
  labelHelper,
  log,
  positionEdgeLabel
}, { algorithm }) => {
  const nodeDb = {};
  const clusterDb = {};
  const addVertex = /* @__PURE__ */ __name(async (nodeEl2, graph, nodeArr, node) => {
    const labelData = { width: 0, height: 0 };
    const config = getConfig();
    if (!node.isGroup) {
      const child = {
        id: node.id,
        width: node.width,
        height: node.height,
        // Store the original node data for later use
        label: node.label,
        isGroup: node.isGroup,
        shape: node.shape,
        padding: node.padding,
        cssClasses: node.cssClasses,
        cssStyles: node.cssStyles,
        look: node.look,
        // Include parentId for subgraph processing
        parentId: node.parentId
      };
      graph.children.push(child);
      nodeDb[node.id] = child;
      const childNodeEl = await insertNode(nodeEl2, node, { config, dir: node.dir });
      const boundingBox = childNodeEl.node().getBBox();
      child.domId = childNodeEl;
      child.calcIntersect = node.calcIntersect;
      child.width = boundingBox.width;
      child.height = boundingBox.height;
    } else {
      const child = {
        ...node,
        children: []
      };
      graph.children.push(child);
      nodeDb[node.id] = child;
      await addVertices(nodeEl2, nodeArr, child, node.id);
      if (node.label) {
        const { shapeSvg, bbox } = await labelHelper(nodeEl2, node, void 0, true);
        labelData.width = bbox.width;
        labelData.wrappingWidth = config.flowchart.wrappingWidth;
        labelData.height = bbox.height - 2;
        labelData.labelNode = shapeSvg.node();
        shapeSvg.remove();
      } else {
        labelData.width = 0;
        labelData.height = 0;
      }
      child.labelData = labelData;
      child.domId = nodeEl2;
    }
  }, "addVertex");
  const addVertices = /* @__PURE__ */ __name(async function(nodeEl2, nodeArr, graph, parentId) {
    const siblings = nodeArr.filter((node) => node?.parentId === parentId);
    log.info("addVertices APA12", siblings, parentId);
    await Promise.all(
      siblings.map(async (node) => {
        await addVertex(nodeEl2, graph, nodeArr, node);
      })
    );
    return graph;
  }, "addVertices");
  const drawNodes = /* @__PURE__ */ __name(async (relX, relY, nodeArray, svg2, subgraphsEl, depth) => {
    await Promise.all(
      nodeArray.map(async function(node) {
        if (node) {
          nodeDb[node.id] = node;
          nodeDb[node.id].offset = {
            posX: node.x + relX,
            posY: node.y + relY,
            x: relX,
            y: relY,
            depth,
            width: Math.max(node.width, node.labels ? node.labels[0]?.width || 0 : 0),
            height: node.height
          };
          if (node.isGroup) {
            log.debug("id abc88 subgraph = ", node.id, node.x, node.y, node.labelData);
            const subgraphEl = subgraphsEl.insert("g").attr("class", "subgraph");
            const clusterNode = JSON.parse(JSON.stringify(node));
            clusterNode.x = node.offset.posX + node.width / 2;
            clusterNode.y = node.offset.posY + node.height / 2;
            clusterNode.width = Math.max(clusterNode.width, node.labelData.width);
            await insertCluster(subgraphEl, clusterNode);
            log.debug("id (UIO)= ", node.id, node.width, node.shape, node.labels);
          } else {
            log.info(
              "id NODE = ",
              node.id,
              node.x,
              node.y,
              relX,
              relY,
              node.domId.node(),
              `translate(${node.x + relX + node.width / 2}, ${node.y + relY + node.height / 2})`
            );
            node.domId.attr(
              "transform",
              `translate(${node.x + relX + node.width / 2}, ${node.y + relY + node.height / 2})`
            );
          }
        }
      })
    );
    await Promise.all(
      nodeArray.map(async function(node) {
        if (node?.isGroup) {
          await drawNodes(relX + node.x, relY + node.y, node.children, svg2, subgraphsEl, depth + 1);
        }
      })
    );
  }, "drawNodes");
  const addSubGraphs = /* @__PURE__ */ __name((nodeArr) => {
    const parentLookupDb2 = { parentById: {}, childrenById: {} };
    const subgraphs = nodeArr.filter((node) => node.isGroup);
    log.info("Subgraphs - ", subgraphs);
    subgraphs.forEach((subgraph) => {
      const children = nodeArr.filter((node) => node.parentId === subgraph.id);
      children.forEach((node) => {
        parentLookupDb2.parentById[node.id] = subgraph.id;
        if (parentLookupDb2.childrenById[subgraph.id] === void 0) {
          parentLookupDb2.childrenById[subgraph.id] = [];
        }
        parentLookupDb2.childrenById[subgraph.id].push(node);
      });
    });
    subgraphs.forEach(function(subgraph) {
      const data = { id: subgraph.id };
      if (parentLookupDb2.parentById[subgraph.id] !== void 0) {
        data.parent = parentLookupDb2.parentById[subgraph.id];
      }
    });
    return parentLookupDb2;
  }, "addSubGraphs");
  const getEdgeStartEndPoint = /* @__PURE__ */ __name((edge) => {
    const source = edge.start;
    const target = edge.end;
    const sourceId = source;
    const targetId = target;
    const startNode = nodeDb[edge.start.id];
    const endNode = nodeDb[edge.end.id];
    if (!startNode || !endNode) {
      return { source, target };
    }
    return { source, target, sourceId, targetId };
  }, "getEdgeStartEndPoint");
  const calcOffset = /* @__PURE__ */ __name(function(src, dest, parentLookupDb2) {
    const ancestor = findCommonAncestor(src, dest, parentLookupDb2);
    if (ancestor === void 0 || ancestor === "root") {
      return { x: 0, y: 0 };
    }
    const ancestorOffset = nodeDb[ancestor].offset;
    return { x: ancestorOffset.posX, y: ancestorOffset.posY };
  }, "calcOffset");
  const addEdges = /* @__PURE__ */ __name(async function(dataForLayout, graph, svg2) {
    log.info("abc78 DAGA edges = ", dataForLayout);
    const edges = dataForLayout.edges;
    const labelsEl = svg2.insert("g").attr("class", "edgeLabels");
    const linkIdCnt = {};
    const dir2 = dataForLayout.direction || "DOWN";
    let defaultStyle;
    let defaultLabelStyle;
    await Promise.all(
      edges.map(async function(edge) {
        const linkIdBase = edge.id;
        if (linkIdCnt[linkIdBase] === void 0) {
          linkIdCnt[linkIdBase] = 0;
          log.info("abc78 new entry", linkIdBase, linkIdCnt[linkIdBase]);
        } else {
          linkIdCnt[linkIdBase]++;
          log.info("abc78 new entry", linkIdBase, linkIdCnt[linkIdBase]);
        }
        const linkId = linkIdBase + "_" + linkIdCnt[linkIdBase];
        edge.id = linkId;
        log.info("abc78 new link id to be used is", linkIdBase, linkId, linkIdCnt[linkIdBase]);
        const linkNameStart = "LS_" + edge.start;
        const linkNameEnd = "LE_" + edge.end;
        const edgeData = { style: "", labelStyle: "" };
        edgeData.minlen = edge.length || 1;
        edge.text = edge.label;
        if (edge.type === "arrow_open") {
          edgeData.arrowhead = "none";
        } else {
          edgeData.arrowhead = "normal";
        }
        edgeData.arrowTypeStart = "arrow_open";
        edgeData.arrowTypeEnd = "arrow_open";
        switch (edge.type) {
          case "double_arrow_cross":
            edgeData.arrowTypeStart = "arrow_cross";
          case "arrow_cross":
            edgeData.arrowTypeEnd = "arrow_cross";
            break;
          case "double_arrow_point":
            edgeData.arrowTypeStart = "arrow_point";
          case "arrow_point":
            edgeData.arrowTypeEnd = "arrow_point";
            break;
          case "double_arrow_circle":
            edgeData.arrowTypeStart = "arrow_circle";
          case "arrow_circle":
            edgeData.arrowTypeEnd = "arrow_circle";
            break;
        }
        let style = "";
        let labelStyle = "";
        edgeData.startLabelRight = edge.startLabelRight;
        edgeData.endLabelLeft = edge.endLabelLeft;
        switch (edge.stroke) {
          case "normal":
            style = "fill:none;";
            if (defaultStyle !== void 0) {
              style = defaultStyle;
            }
            if (defaultLabelStyle !== void 0) {
              labelStyle = defaultLabelStyle;
            }
            edgeData.thickness = "normal";
            edgeData.pattern = "solid";
            break;
          case "dotted":
            edgeData.thickness = "normal";
            edgeData.pattern = "dotted";
            edgeData.style = "fill:none;stroke-width:2px;stroke-dasharray:3;";
            break;
          case "thick":
            edgeData.thickness = "thick";
            edgeData.pattern = "solid";
            edgeData.style = "stroke-width: 3.5px;fill:none;";
            break;
        }
        edgeData.style = edgeData.style += style;
        edgeData.labelStyle = edgeData.labelStyle += labelStyle;
        const conf = getConfig();
        if (edge.interpolate !== void 0) {
          edgeData.curve = interpolateToCurve(edge.interpolate, curveLinear);
        } else if (edges.defaultInterpolate !== void 0) {
          edgeData.curve = interpolateToCurve(edges.defaultInterpolate, curveLinear);
        } else {
          edgeData.curve = interpolateToCurve(conf.curve, curveLinear);
        }
        if (edge.text === void 0) {
          if (edge.style !== void 0) {
            edgeData.arrowheadStyle = "fill: #333";
          }
        } else {
          edgeData.arrowheadStyle = "fill: #333";
          edgeData.labelpos = "c";
        }
        edgeData.labelType = edge.labelType;
        edgeData.label = (edge?.text || "").replace(common.lineBreakRegex, "\n");
        if (edge.style === void 0) {
          edgeData.style = edgeData.style || "stroke: #333; stroke-width: 1.5px;fill:none;";
        }
        edgeData.labelStyle = edgeData.labelStyle.replace("color:", "fill:");
        edgeData.id = linkId;
        edgeData.classes = "flowchart-link " + linkNameStart + " " + linkNameEnd;
        const labelEl = await insertEdgeLabel(labelsEl, edgeData);
        const { source, target, sourceId, targetId } = getEdgeStartEndPoint(edge, dir2);
        log.debug("abc78 source and target", source, target);
        graph.edges.push({
          // @ts-ignore TODO: fix this
          id: "e" + edge.start + edge.end,
          ...edge,
          sources: [source],
          targets: [target],
          sourceId,
          targetId,
          labelEl,
          labels: [
            {
              width: edgeData.width,
              height: edgeData.height,
              orgWidth: edgeData.width,
              orgHeight: edgeData.height,
              text: edgeData.label,
              layoutOptions: {
                "edgeLabels.inline": "true",
                "edgeLabels.placement": "CENTER"
              }
            }
          ],
          edgeData
        });
      })
    );
    return graph;
  }, "addEdges");
  function dir2ElkDirection(dir2) {
    switch (dir2) {
      case "LR":
        return "RIGHT";
      case "RL":
        return "LEFT";
      case "TB":
        return "DOWN";
      case "BT":
        return "UP";
      default:
        return "DOWN";
    }
  }
  __name(dir2ElkDirection, "dir2ElkDirection");
  function setIncludeChildrenPolicy(nodeId, ancestorId) {
    const node = nodeDb[nodeId];
    if (!node) {
      return;
    }
    if (node?.layoutOptions === void 0) {
      node.layoutOptions = {};
    }
    node.layoutOptions["elk.hierarchyHandling"] = "INCLUDE_CHILDREN";
    if (node.id !== ancestorId) {
      setIncludeChildrenPolicy(node.parentId, ancestorId);
    }
  }
  __name(setIncludeChildrenPolicy, "setIncludeChildrenPolicy");
  const elk = new ELK();
  const element = svg.select("g");
  insertMarkers(element, data4Layout.markers, data4Layout.type, data4Layout.diagramId);
  let elkGraph = {
    id: "root",
    layoutOptions: {
      "elk.hierarchyHandling": "INCLUDE_CHILDREN",
      "elk.layered.crossingMinimization.forceNodeModelOrder": data4Layout.config.elk?.forceNodeModelOrder,
      "elk.layered.considerModelOrder.strategy": data4Layout.config.elk?.considerModelOrder,
      "elk.algorithm": algorithm,
      "nodePlacement.strategy": data4Layout.config.elk?.nodePlacementStrategy,
      "elk.layered.mergeEdges": data4Layout.config.elk?.mergeEdges,
      "elk.direction": "DOWN",
      "spacing.baseValue": 35,
      "elk.layered.unnecessaryBendpoints": true,
      "elk.layered.cycleBreaking.strategy": data4Layout.config.elk?.cycleBreakingStrategy
      // 'spacing.nodeNode': 20,
      // 'spacing.nodeNodeBetweenLayers': 25,
      // 'spacing.edgeNode': 20,
      // 'spacing.edgeNodeBetweenLayers': 10,
      // 'spacing.edgeEdge': 10,
      // 'spacing.edgeEdgeBetweenLayers': 20,
      // 'spacing.nodeSelfLoop': 20,
      // Tweaking options
      // 'elk.layered.nodePlacement.favorStraightEdges': true,
      // 'nodePlacement.feedbackEdges': true,
      // 'elk.layered.wrapping.multiEdge.improveCuts': true,
      // 'elk.layered.wrapping.multiEdge.improveWrappedEdges': true,
      // 'elk.layered.wrapping.strategy': 'MULTI_EDGE',
      // 'elk.layered.edgeRouting.selfLoopDistribution': 'EQUALLY',
      // 'elk.layered.mergeHierarchyEdges': true,
      // 'elk.layered.feedbackEdges': true,
      // 'elk.layered.crossingMinimization.semiInteractive': true,
      // 'elk.layered.edgeRouting.splines.sloppy.layerSpacingFactor': 1,
      // 'elk.layered.edgeRouting.polyline.slopedEdgeZoneWidth': 4.0,
      // 'elk.layered.wrapping.validify.strategy': 'LOOK_BACK',
      // 'elk.insideSelfLoops.activate': true,
      // 'elk.alg.layered.options.EdgeStraighteningStrategy': 'NONE',
      // 'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES', // NODES_AND_EDGES
      // 'elk.layered.wrapping.cutting.strategy': 'ARD', // NODES_AND_EDGES
    },
    children: [],
    edges: []
  };
  log.info("Drawing flowchart using v4 renderer", elk);
  const dir = data4Layout.direction || "DOWN";
  elkGraph.layoutOptions["elk.direction"] = dir2ElkDirection(dir);
  const parentLookupDb = addSubGraphs(data4Layout.nodes);
  const subGraphsEl = svg.insert("g").attr("class", "subgraphs");
  const nodeEl = svg.insert("g").attr("class", "nodes");
  elkGraph = await addVertices(nodeEl, data4Layout.nodes, elkGraph);
  const edgesEl = svg.insert("g").attr("class", "edges edgePaths");
  elkGraph = await addEdges(data4Layout, elkGraph, svg);
  const nodes = data4Layout.nodes;
  nodes.forEach((n) => {
    const node = nodeDb[n.id];
    if (parentLookupDb.childrenById[node.id] !== void 0) {
      node.labels = [
        {
          text: node.label,
          width: node?.labelData?.width || 50,
          height: node?.labelData?.height || 50
        },
        node.width = node.width + 2 * node.padding,
        log.debug("UIO node label", node?.labelData?.width, node.padding)
      ];
      node.layoutOptions = {
        "spacing.baseValue": 30,
        "nodeLabels.placement": "[H_CENTER V_TOP, INSIDE]"
      };
      if (node.dir) {
        node.layoutOptions = {
          ...node.layoutOptions,
          "elk.algorithm": algorithm,
          "elk.direction": dir2ElkDirection(node.dir),
          "nodePlacement.strategy": data4Layout.config.elk?.nodePlacementStrategy,
          "elk.layered.mergeEdges": data4Layout.config.elk?.mergeEdges,
          "elk.hierarchyHandling": "SEPARATE_CHILDREN"
        };
      }
      delete node.x;
      delete node.y;
      delete node.width;
      delete node.height;
    }
  });
  log.debug("APA01 processing edges, count:", elkGraph.edges.length);
  elkGraph.edges.forEach((edge, index) => {
    log.debug("APA01 processing edge", index, ":", edge);
    const source = edge.sources[0];
    const target = edge.targets[0];
    log.debug("APA01 source:", source, "target:", target);
    log.debug("APA01 nodeDb[source]:", nodeDb[source]);
    log.debug("APA01 nodeDb[target]:", nodeDb[target]);
    if (nodeDb[source] && nodeDb[target] && nodeDb[source].parentId !== nodeDb[target].parentId) {
      const ancestorId = findCommonAncestor(source, target, parentLookupDb);
      setIncludeChildrenPolicy(source, ancestorId);
      setIncludeChildrenPolicy(target, ancestorId);
    }
  });
  log.debug("APA01 before");
  log.debug("APA01 elkGraph structure:", JSON.stringify(elkGraph, null, 2));
  log.debug("APA01 elkGraph.children length:", elkGraph.children?.length);
  log.debug("APA01 elkGraph.edges length:", elkGraph.edges?.length);
  elkGraph.edges?.forEach((edge, index) => {
    log.debug(`APA01 validating edge ${index}:`, edge);
    if (edge.sources) {
      edge.sources.forEach((sourceId) => {
        const sourceExists = elkGraph.children?.some((child) => child.id === sourceId);
        log.debug(`APA01 source ${sourceId} exists:`, sourceExists);
      });
    }
    if (edge.targets) {
      edge.targets.forEach((targetId) => {
        const targetExists = elkGraph.children?.some((child) => child.id === targetId);
        log.debug(`APA01 target ${targetId} exists:`, targetExists);
      });
    }
  });
  let g;
  try {
    g = await elk.layout(elkGraph);
    log.debug("APA01 after - success");
    log.debug("APA01 layout result:", JSON.stringify(g, null, 2));
  } catch (error) {
    log.error("APA01 ELK layout error:", error);
    throw error;
  }
  await drawNodes(0, 0, g.children, svg, subGraphsEl, 0);
  g.edges?.map(
    (edge) => {
      const startNode = nodeDb[edge.sources[0]];
      const startCluster = parentLookupDb[edge.sources[0]];
      const endNode = nodeDb[edge.targets[0]];
      const sourceId = edge.start;
      const targetId = edge.end;
      const offset = calcOffset(sourceId, targetId, parentLookupDb);
      log.debug(
        "APA18 offset",
        offset,
        sourceId,
        " ==> ",
        targetId,
        "edge:",
        edge,
        "cluster:",
        startCluster,
        startNode
      );
      if (edge.sections) {
        const src = edge.sections[0].startPoint;
        const dest = edge.sections[0].endPoint;
        const segments = edge.sections[0].bendPoints ? edge.sections[0].bendPoints : [];
        const segPoints = segments.map((segment) => {
          return { x: segment.x + offset.x, y: segment.y + offset.y };
        });
        edge.points = [
          { x: src.x + offset.x, y: src.y + offset.y },
          ...segPoints,
          { x: dest.x + offset.x, y: dest.y + offset.y }
        ];
        let sw = startNode.width;
        let ew = endNode.width;
        if (startNode.isGroup) {
          const bbox = startNode.domId.node().getBBox();
          sw = Math.max(startNode.width, startNode.labels[0].width + startNode.padding);
          log.debug(
            "UIO width",
            startNode.id,
            startNode.with,
            "bbox.width=",
            bbox.width,
            "lw=",
            startNode.labels[0].width,
            "node:",
            startNode.width,
            "SW = ",
            sw
            // 'HTML:',
            // startNode.domId.node().innerHTML
          );
        }
        if (endNode.isGroup) {
          const bbox = endNode.domId.node().getBBox();
          ew = Math.max(endNode.width, endNode.labels[0].width + endNode.padding);
          log.debug(
            "UIO width",
            startNode.id,
            startNode.with,
            bbox.width,
            "EW = ",
            ew,
            "HTML:",
            startNode.innerHTML
          );
        }
        if (startNode.calcIntersect) {
          const intersection = startNode.calcIntersect(
            {
              x: startNode.offset.posX + startNode.width / 2,
              y: startNode.offset.posY + startNode.height / 2,
              width: startNode.width,
              height: startNode.height
            },
            edge.points[0]
          );
          if (distance(intersection, edge.points[0]) > epsilon) {
            edge.points.unshift(intersection);
          }
        }
        if (endNode.calcIntersect) {
          const intersection = endNode.calcIntersect(
            {
              x: endNode.offset.posX + endNode.width / 2,
              y: endNode.offset.posY + endNode.height / 2,
              width: endNode.width,
              height: endNode.height
            },
            edge.points[edge.points.length - 1]
          );
          if (distance(intersection, edge.points[edge.points.length - 1]) > epsilon) {
            edge.points.push(intersection);
          }
        }
        const paths = insertEdge(
          edgesEl,
          edge,
          clusterDb,
          data4Layout.type,
          startNode,
          endNode,
          data4Layout.diagramId
        );
        edge.x = edge.labels[0].x + offset.x + edge.labels[0].width / 2;
        edge.y = edge.labels[0].y + offset.y + edge.labels[0].height / 2;
        positionEdgeLabel(edge, paths);
      }
    }
  );
}, "render");
export {
  render
};
