/**
 * Paper class just like the white sheet of pressed fiber it draws its name
 * inspiration from is used as a starting point to start a drawing.
 *
 * Before we can start adding elements (drawing) we need to take out a new sheet
 * of paper, or in this instance create a blank SVG element.
 *
 * This class creates such element, as well as implements methods needed to
 * start adding elements to it.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { AMElement } from "./AMElement";
import { Group } from "./Group";
import { SVGContainer } from "./SVGContainer";
import * as $dom from "../utils/DOM";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Paper class which when instantiated will create an SVG element as well as
 * some of the sub-elements like `<desc>`, `<defs>`.
 *
 * Use its methods like `addGroup` and `append` to add elements to the paper.
 */
var Paper = /** @class */ (function () {
    /**
     * Creates main `<svg>` container and related elements.
     *
     * @param container A reference to HTML element to create `<svg>` in
     */
    function Paper(container, id) {
        // Store container reference
        this.container = container;
        this.id = id;
        // Create SVG element
        var svg = document.createElementNS($dom.SVGNS, "svg");
        svg.setAttribute("version", "1.1");
        svg.setAttributeNS($dom.XMLNS, "xmlns", $dom.SVGNS);
        svg.setAttributeNS($dom.XMLNS, "xmlns:xlink", $dom.XLINK);
        svg.setAttribute("role", "group");
        this.container.appendChild(svg);
        // Add description
        //let desc: SVGElement = <SVGElement>document.createElementNS($dom.SVGNS, "desc");
        //desc.appendChild(document.createTextNode("JavaScript chart by amCharts"));
        //svg.appendChild(desc);
        // Add defs
        this.defs = document.createElementNS($dom.SVGNS, "defs");
        svg.appendChild(this.defs);
        // Set width and height to fit container
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.overflow = "visible";
        // Store variable
        this.svg = svg;
    }
    /**
     * Creates and returns a new element. Does not attach it to Paper yet.
     *
     * @param elementName  Element name
     * @return New element
     */
    Paper.prototype.add = function (elementName) {
        return new AMElement(elementName);
    };
    /**
     * Creates and returns a new Group element. Does not attach it to Paper.
     *
     * @param groupName  Element name
     * @return New Group
     */
    Paper.prototype.addGroup = function (groupName) {
        return new Group(groupName);
    };
    /**
     * Appends an element to Paper.
     *
     * @param element Element to append
     */
    Paper.prototype.append = function (element) {
        if (element) {
            this.svg.appendChild(element.node);
        }
    };
    /**
     * Appends an element to `<defs>` block of the Paper.
     *
     * @param element  Element
     */
    Paper.prototype.appendDef = function (element) {
        if (element) {
            this.defs.appendChild(element.node);
        }
    };
    /**
     * Creates and returns new `<foreignObject>` element. Does not append it to
     * Paper.
     *
     * @return A foreignObject element
     */
    Paper.prototype.foreignObject = function () {
        var element = new AMElement("foreignObject");
        //this.append(element);
        return element;
    };
    /**
     * Checks if browser supports `<foreignObject>` elements.
     *
     * @return Supports `foreignObject`?
     */
    Paper.prototype.supportsForeignObject = function () {
        return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Extensibility", "1.1");
    };
    return Paper;
}());
export { Paper };
var ghostPaper = null;
/**
 * A [[Paper]] instance to create elements, that are not yet ready to be
 * placed in visible DOM.
 *
 * @ignore Exclude from docs
 */
export function getGhostPaper() {
    if (ghostPaper === null) {
        // ghost is used to draw elements while real paper is not yet created or Sprite doesn't know parent yet
        var ghostDiv = document.createElement("div");
        ghostDiv.hidden = true;
        ghostDiv.style.width = "1px";
        ghostDiv.style.height = "1px";
        ghostDiv.style.position = "absolute";
        ghostDiv.style.zIndex = "-1000000";
        document.body.appendChild(ghostDiv);
        var ghostSvgContainer = new SVGContainer(ghostDiv, true);
        ghostPaper = new Paper(ghostSvgContainer.SVGContainer, "ghost");
    }
    return ghostPaper;
}
//# sourceMappingURL=Paper.js.map