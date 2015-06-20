///<reference path="../reference.ts" />

module Plottable {
export module Utils {
  export class ClientToSVGTranslator {
    private static _TRANSLATOR_KEY = "__Plottable_ClientToSVGTranslator";
    private _svg: SVGElement;
    private _measureRect: SVGElement;

    /**
     * Returns the ClientToSVGTranslator for the <svg> containing elem.
     * If one already exists on that <svg>, it will be returned; otherwise, a new one will be created.
     */
    public static getTranslator(elem: SVGElement): ClientToSVGTranslator {
      var svg = Utils.DOM.boundingSVG(elem);

      var translator: ClientToSVGTranslator = (<any> svg)[ClientToSVGTranslator._TRANSLATOR_KEY];
      if (translator == null) {
        translator = new ClientToSVGTranslator(svg);
        (<any> svg)[ClientToSVGTranslator._TRANSLATOR_KEY] = translator;
      }
      return translator;
    }

    constructor(svg: SVGElement) {
      this._svg = svg;
      this._measureRect = <SVGElement> <any>document.createElementNS(svg.namespaceURI, "rect");
      this._measureRect.setAttribute("class", "measure-rect");
      this._measureRect.setAttribute("style", "opacity: 0; visibility: hidden;");
      this._measureRect.setAttribute("width", "1");
      this._measureRect.setAttribute("height", "1");
      this._svg.appendChild(this._measureRect);
    }

    /**
     * Computes the position relative to the <svg> in svg-coordinate-space.
     */
    public computePosition(clientX: number, clientY: number): Point {
      // get the origin
      this._measureRect.setAttribute("x", "0");
      this._measureRect.setAttribute("y", "0");
      var mrBCR = this._measureRect.getBoundingClientRect();
      var origin = { x: mrBCR.left, y: mrBCR.top };

      // calculate the scale
      var sampleDistance = 100;
      this._measureRect.setAttribute("x", String(sampleDistance));
      this._measureRect.setAttribute("y", String(sampleDistance));
      mrBCR = this._measureRect.getBoundingClientRect();
      var testPoint = { x: mrBCR.left, y: mrBCR.top };

      // invalid measurements -- SVG might not be in the DOM
      if (origin.x === testPoint.x || origin.y === testPoint.y) {
        return null;
      }

      var scaleX = (testPoint.x - origin.x) / sampleDistance;
      var scaleY = (testPoint.y - origin.y) / sampleDistance;

      // get the true cursor position
      this._measureRect.setAttribute("x", String((clientX - origin.x) / scaleX));
      this._measureRect.setAttribute("y", String((clientY - origin.y) / scaleY));
      mrBCR = this._measureRect.getBoundingClientRect();
      var trueCursorPosition = { x: mrBCR.left, y: mrBCR.top };

      var scaledPosition = {
        x: (trueCursorPosition.x - origin.x) / scaleX,
        y: (trueCursorPosition.y - origin.y) / scaleY
      };

      return scaledPosition;
    }
  }
}
}
