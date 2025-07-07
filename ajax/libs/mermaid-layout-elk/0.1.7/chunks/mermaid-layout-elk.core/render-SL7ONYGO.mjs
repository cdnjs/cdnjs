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
        ...node
      };
      graph.children.push(child);
      nodeDb[node.id] = child;
      const childNodeEl = await insertNode(nodeEl2, node, { config, dir: node.dir });
      const boundingBox = childNodeEl.node().getBBox();
      child.domId = childNodeEl;
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
            log.debug("Id abc88 subgraph = ", node.id, node.x, node.y, node.labelData);
            const subgraphEl = subgraphsEl.insert("g").attr("class", "subgraph");
            const clusterNode = JSON.parse(JSON.stringify(node));
            clusterNode.x = node.offset.posX + node.width / 2;
            clusterNode.y = node.offset.posY + node.height / 2;
            clusterNode.width = Math.max(clusterNode.width, node.labelData.width);
            await insertCluster(subgraphEl, clusterNode);
            log.debug("Id (UIO)= ", node.id, node.width, node.shape, node.labels);
          } else {
            log.info(
              "Id NODE = ",
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
  function intersectLine(p1, p2, q1, q2) {
    log.debug("UIO intersectLine", p1, p2, q1, q2);
    const a1 = p2.y - p1.y;
    const b1 = p1.x - p2.x;
    const c1 = p2.x * p1.y - p1.x * p2.y;
    const r3 = a1 * q1.x + b1 * q1.y + c1;
    const r4 = a1 * q2.x + b1 * q2.y + c1;
    const epsilon = 1e-6;
    if (r3 !== 0 && r4 !== 0 && sameSign(r3, r4)) {
      return;
    }
    const a2 = q2.y - q1.y;
    const b2 = q1.x - q2.x;
    const c2 = q2.x * q1.y - q1.x * q2.y;
    const r1 = a2 * p1.x + b2 * p1.y + c2;
    const r2 = a2 * p2.x + b2 * p2.y + c2;
    if (Math.abs(r1) < epsilon && Math.abs(r2) < epsilon && sameSign(r1, r2)) {
      return;
    }
    const denom = a1 * b2 - a2 * b1;
    if (denom === 0) {
      return;
    }
    const offset = Math.abs(denom / 2);
    let num = b1 * c2 - b2 * c1;
    const x = num < 0 ? (num - offset) / denom : (num + offset) / denom;
    num = a2 * c1 - a1 * c2;
    const y = num < 0 ? (num - offset) / denom : (num + offset) / denom;
    return { x, y };
  }
  __name(intersectLine, "intersectLine");
  function sameSign(r1, r2) {
    return r1 * r2 > 0;
  }
  __name(sameSign, "sameSign");
  const diamondIntersection = /* @__PURE__ */ __name((bounds, outsidePoint, insidePoint) => {
    const x1 = bounds.x;
    const y1 = bounds.y;
    const w = bounds.width;
    const h = bounds.height;
    const polyPoints = [
      { x: x1, y: y1 - h / 2 },
      { x: x1 + w / 2, y: y1 },
      { x: x1, y: y1 + h / 2 },
      { x: x1 - w / 2, y: y1 }
    ];
    log.debug(
      `APA16 diamondIntersection calc abc89:
  outsidePoint: ${JSON.stringify(outsidePoint)}
  insidePoint : ${JSON.stringify(insidePoint)}
  node-bounds       : x:${bounds.x} y:${bounds.y} w:${bounds.width} h:${bounds.height}`,
      JSON.stringify(polyPoints)
    );
    const intersections = [];
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    polyPoints.forEach(function(entry) {
      minX = Math.min(minX, entry.x);
      minY = Math.min(minY, entry.y);
    });
    const left = x1 - w / 2 - minX;
    const top = y1 - h / 2 - minY;
    for (let i = 0; i < polyPoints.length; i++) {
      const p1 = polyPoints[i];
      const p2 = polyPoints[i < polyPoints.length - 1 ? i + 1 : 0];
      const intersect = intersectLine(
        bounds,
        outsidePoint,
        { x: left + p1.x, y: top + p1.y },
        { x: left + p2.x, y: top + p2.y }
      );
      if (intersect) {
        intersections.push(intersect);
      }
    }
    if (!intersections.length) {
      return bounds;
    }
    log.debug("UIO intersections", intersections);
    if (intersections.length > 1) {
      intersections.sort(function(p, q) {
        const pdx = p.x - outsidePoint.x;
        const pdy = p.y - outsidePoint.y;
        const distp = Math.sqrt(pdx * pdx + pdy * pdy);
        const qdx = q.x - outsidePoint.x;
        const qdy = q.y - outsidePoint.y;
        const distq = Math.sqrt(qdx * qdx + qdy * qdy);
        return distp < distq ? -1 : distp === distq ? 0 : 1;
      });
    }
    return intersections[0];
  }, "diamondIntersection");
  const intersection = /* @__PURE__ */ __name((node, outsidePoint, insidePoint) => {
    log.debug(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(outsidePoint)}
  insidePoint : ${JSON.stringify(insidePoint)}
  node        : x:${node.x} y:${node.y} w:${node.width} h:${node.height}`);
    const x = node.x;
    const y = node.y;
    const dx = Math.abs(x - insidePoint.x);
    const w = node.width / 2;
    let r = insidePoint.x < outsidePoint.x ? w - dx : w + dx;
    const h = node.height / 2;
    const Q = Math.abs(outsidePoint.y - insidePoint.y);
    const R = Math.abs(outsidePoint.x - insidePoint.x);
    if (Math.abs(y - outsidePoint.y) * w > Math.abs(x - outsidePoint.x) * h) {
      const q = insidePoint.y < outsidePoint.y ? outsidePoint.y - h - y : y - h - outsidePoint.y;
      r = R * q / Q;
      const res = {
        x: insidePoint.x < outsidePoint.x ? insidePoint.x + r : insidePoint.x - R + r,
        y: insidePoint.y < outsidePoint.y ? insidePoint.y + Q - q : insidePoint.y - Q + q
      };
      if (r === 0) {
        res.x = outsidePoint.x;
        res.y = outsidePoint.y;
      }
      if (R === 0) {
        res.x = outsidePoint.x;
      }
      if (Q === 0) {
        res.y = outsidePoint.y;
      }
      log.debug(`abc89 topp/bott calc, Q ${Q}, q ${q}, R ${R}, r ${r}`, res);
      return res;
    } else {
      if (insidePoint.x < outsidePoint.x) {
        r = outsidePoint.x - w - x;
      } else {
        r = x - w - outsidePoint.x;
      }
      const q = Q * r / R;
      let _x = insidePoint.x < outsidePoint.x ? insidePoint.x + R - r : insidePoint.x - R + r;
      let _y = insidePoint.y < outsidePoint.y ? insidePoint.y + q : insidePoint.y - q;
      log.debug(`sides calc abc89, Q ${Q}, q ${q}, R ${R}, r ${r}`, { _x, _y });
      if (r === 0) {
        _x = outsidePoint.x;
        _y = outsidePoint.y;
      }
      if (R === 0) {
        _x = outsidePoint.x;
      }
      if (Q === 0) {
        _y = outsidePoint.y;
      }
      return { x: _x, y: _y };
    }
  }, "intersection");
  const outsideNode = /* @__PURE__ */ __name((node, point) => {
    const x = node.x;
    const y = node.y;
    const dx = Math.abs(point.x - x);
    const dy = Math.abs(point.y - y);
    const w = node.width / 2;
    const h = node.height / 2;
    if (dx >= w || dy >= h) {
      return true;
    }
    return false;
  }, "outsideNode");
  const cutPathAtIntersect = /* @__PURE__ */ __name((_points, bounds, isDiamond) => {
    log.debug("APA18 cutPathAtIntersect Points:", _points, "node:", bounds, "isDiamond", isDiamond);
    const points = [];
    let lastPointOutside = _points[0];
    let isInside = false;
    _points.forEach((point) => {
      if (!outsideNode(bounds, point) && !isInside) {
        let inter;
        if (isDiamond) {
          const inter2 = diamondIntersection(bounds, lastPointOutside, point);
          const distance = Math.sqrt(
            (lastPointOutside.x - inter2.x) ** 2 + (lastPointOutside.y - inter2.y) ** 2
          );
          if (distance > 1) {
            inter = inter2;
          }
        }
        if (!inter) {
          inter = intersection(bounds, lastPointOutside, point);
        }
        let pointPresent = false;
        points.forEach((p) => {
          pointPresent = pointPresent || p.x === inter.x && p.y === inter.y;
        });
        if (!points.some((e) => e.x === inter.x && e.y === inter.y)) {
          points.push(inter);
        } else {
          log.debug("abc88 no intersect", inter, points);
        }
        isInside = true;
      } else {
        log.debug("abc88 outside", point, lastPointOutside, points);
        lastPointOutside = point;
        if (!isInside) {
          points.push(point);
        }
      }
    });
    return points;
  }, "cutPathAtIntersect");
  const elk = new ELK();
  const element = svg.select("g");
  insertMarkers(element, data4Layout.markers, data4Layout.type, data4Layout.diagramId);
  let elkGraph = {
    id: "root",
    layoutOptions: {
      "elk.hierarchyHandling": "INCLUDE_CHILDREN",
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
  elkGraph.edges.forEach((edge) => {
    const source = edge.sources[0];
    const target = edge.targets[0];
    if (nodeDb[source].parentId !== nodeDb[target].parentId) {
      const ancestorId = findCommonAncestor(source, target, parentLookupDb);
      setIncludeChildrenPolicy(source, ancestorId);
      setIncludeChildrenPolicy(target, ancestorId);
    }
  });
  const g = await elk.layout(elkGraph);
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
        if (startNode.shape === "diamond" || startNode.shape === "diam") {
          edge.points.unshift({
            x: startNode.offset.posX + startNode.width / 2,
            y: startNode.offset.posY + startNode.height / 2
          });
        }
        if (endNode.shape === "diamond" || endNode.shape === "diam") {
          edge.points.push({
            x: endNode.offset.posX + endNode.width / 2,
            y: endNode.offset.posY + endNode.height / 2
          });
        }
        edge.points = cutPathAtIntersect(
          edge.points.reverse(),
          {
            x: startNode.offset.posX + startNode.width / 2,
            y: startNode.offset.posY + startNode.height / 2,
            width: sw,
            height: startNode.height,
            padding: startNode.padding
          },
          startNode.shape === "diamond" || startNode.shape === "diam"
        ).reverse();
        edge.points = cutPathAtIntersect(
          edge.points,
          {
            x: endNode.offset.posX + endNode.width / 2,
            y: endNode.offset.posY + endNode.height / 2,
            width: ew,
            height: endNode.height,
            padding: endNode.padding
          },
          endNode.shape === "diamond" || endNode.shape === "diam"
        );
        const paths = insertEdge(
          edgesEl,
          edge,
          clusterDb,
          data4Layout.type,
          startNode,
          endNode,
          data4Layout.diagramId
        );
        log.info("APA12 edge points after insert", JSON.stringify(edge.points));
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
