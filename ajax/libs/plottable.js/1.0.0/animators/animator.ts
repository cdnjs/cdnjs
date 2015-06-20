///<reference path="../reference.ts" />

module Plottable {

export interface Animator {
  /**
   * Applies the supplied attributes to a d3.Selection with some animation.
   *
   * @param {d3.Selection} selection The update selection or transition selection that we wish to animate.
   * @param {AttributeToAppliedProjector} attrToAppliedProjector The set of
   *     AppliedProjectors that we will use to set attributes on the selection.
   * @return {any} Animators should return the selection or
   *     transition object so that plots may chain the transitions between
   *     animators.
   */
  animate(selection: d3.Selection<any>, attrToAppliedProjector: AttributeToAppliedProjector): d3.Selection<any> | d3.Transition<any>;

  /**
   * Given the number of elements, return the total time the animation requires
   *
   * @param {number} numberofIterations The number of elements that will be drawn
   * @returns {number}
   */
  totalTime(numberOfIterations: number): number;
}

}
