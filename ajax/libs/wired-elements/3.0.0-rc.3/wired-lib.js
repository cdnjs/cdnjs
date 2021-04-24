import { line as roughLine, rectangle as roughRectangle, ellipse as roughEllipse, polygon as roughPolygon, doubleLineFillOps, generateEllipseParams } from 'roughjs/bin/renderer';
import { ZigZagFiller } from 'roughjs/bin/fillers/zigzag-filler';
const fillHelper = {
    randOffset(x, _o) {
        return x;
    },
    randOffsetWithRange(min, max, _o) {
        return (min + max) / 2;
    },
    ellipse(x, y, width, height, o) {
        return roughEllipse(x, y, width, height, o);
    },
    doubleLineOps(x1, y1, x2, y2, o) {
        return doubleLineFillOps(x1, y1, x2, y2, o);
    }
};
function options(seed) {
    return {
        maxRandomnessOffset: 2,
        roughness: 1,
        bowing: 0.85,
        stroke: '#000',
        strokeWidth: 1.5,
        curveTightness: 0,
        curveFitting: 0.95,
        curveStepCount: 9,
        fillStyle: 'hachure',
        fillWeight: 3.5,
        hachureAngle: -41,
        hachureGap: 5,
        dashOffset: -1,
        dashGap: -1,
        zigzagOffset: 0,
        combineNestedSvgPaths: false,
        disableMultiStroke: false,
        disableMultiStrokeFill: false,
        seed
    };
}
function opsToPath(drawing, joinPaths) {
    let path = '';
    for (const item of drawing.ops) {
        const data = item.data;
        switch (item.op) {
            case 'move':
                if (joinPaths && path) {
                    break;
                }
                path += `M${data[0]} ${data[1]} `;
                break;
            case 'bcurveTo':
                path += `C${data[0]} ${data[1]}, ${data[2]} ${data[3]}, ${data[4]} ${data[5]} `;
                break;
            case 'lineTo':
                path += `L${data[0]} ${data[1]} `;
                break;
        }
    }
    return path.trim();
}
export function svgNode(tagName, attributes) {
    const n = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    if (attributes) {
        for (const p in attributes) {
            n.setAttributeNS(null, p, attributes[p]);
        }
    }
    return n;
}
function createPathNode(ops, parent, joinPaths = false) {
    const path = svgNode('path', { d: opsToPath(ops, joinPaths) });
    if (parent) {
        parent.appendChild(path);
    }
    return path;
}
export function rectangle(parent, x, y, width, height, seed) {
    return createPathNode(roughRectangle(x + 2, y + 2, width - 4, height - 4, options(seed)), parent);
}
export function line(parent, x1, y1, x2, y2, seed) {
    return createPathNode(roughLine(x1, y1, x2, y2, options(seed)), parent);
}
export function polygon(parent, vertices, seed) {
    return createPathNode(roughPolygon(vertices, options(seed)), parent, true);
}
export function ellipse(parent, x, y, width, height, seed) {
    width = Math.max(width > 10 ? width - 4 : width - 1, 1);
    height = Math.max(height > 10 ? height - 4 : height - 1, 1);
    return createPathNode(roughEllipse(x, y, width, height, options(seed)), parent);
}
export function hachureFill(points, seed) {
    const hf = new ZigZagFiller(fillHelper);
    const ops = hf.fillPolygon(points, options(seed));
    return createPathNode(ops, null);
}
export function hachureEllipseFill(cx, cy, width, height, seed) {
    const o = options(seed);
    const ep = generateEllipseParams(width, height, o);
    const vertices = [];
    let angle = 0;
    while (angle <= (Math.PI * 2)) {
        vertices.push([
            cx + ep.rx * Math.cos(angle),
            cy + ep.ry * Math.sin(angle)
        ]);
        angle += ep.increment;
    }
    return hachureFill(vertices, seed);
}
