///<reference path="../reference.ts" />

module Plottable {
export module Animators {

  /**
   * An Animator with easing and configurable durations and delays.
   */
  export class Easing implements Animator {
    /**
     * The default starting delay of the animation in milliseconds
     */
    private static _DEFAULT_START_DELAY_MILLISECONDS = 0;
    /**
     * The default duration of one animation step in milliseconds
     */
    private static _DEFAULT_STEP_DURATION_MILLISECONDS = 300;
    /**
     * The default maximum start delay between each step of an animation
     */
    private static _DEFAULT_ITERATIVE_DELAY_MILLISECONDS = 15;
    /**
     * The default maximum total animation duration
     */
    private static _DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS = Infinity;
    /**
     * The default easing of the animation
     */
    private static _DEFAULT_EASING_MODE = "exp-out";

    private _startDelay: number;
    private _stepDuration: number;
    private _stepDelay: number;
    private _maxTotalDuration: number;
    private _easingMode: string;

    /**
     * Constructs the default animator
     *
     * @constructor
     */
    constructor() {
      this._startDelay = Easing._DEFAULT_START_DELAY_MILLISECONDS;
      this._stepDuration = Easing._DEFAULT_STEP_DURATION_MILLISECONDS;
      this._stepDelay = Easing._DEFAULT_ITERATIVE_DELAY_MILLISECONDS;
      this._maxTotalDuration = Easing._DEFAULT_MAX_TOTAL_DURATION_MILLISECONDS;
      this._easingMode = Easing._DEFAULT_EASING_MODE;
    }

    public totalTime(numberOfSteps: number) {
      var adjustedIterativeDelay = this._getAdjustedIterativeDelay(numberOfSteps);
      return this.startDelay() + adjustedIterativeDelay * (Math.max(numberOfSteps - 1, 0)) + this.stepDuration();
    }

    public animate(selection: d3.Selection<any>, attrToAppliedProjector: AttributeToAppliedProjector) {
      var numberOfSteps = selection[0].length;
      var adjustedIterativeDelay = this._getAdjustedIterativeDelay(numberOfSteps);

      return selection.transition()
        .ease(this.easingMode())
        .duration(this.stepDuration())
        .delay((d: any, i: number) => this.startDelay() + adjustedIterativeDelay * i)
        .attr(attrToAppliedProjector);
    }

    /**
     * Gets the start delay of the animation in milliseconds.
     *
     * @returns {number} The current start delay.
     */
    public startDelay(): number;
    /**
     * Sets the start delay of the animation in milliseconds.
     *
     * @param {number} startDelay The start delay in milliseconds.
     * @returns {Easing} The calling Easing Animator.
     */
    public startDelay(startDelay: number): Easing;
    public startDelay(startDelay?: number): any {
      if (startDelay == null) {
        return this._startDelay;
      } else {
        this._startDelay = startDelay;
        return this;
      }
    }

    /**
     * Gets the duration of one animation step in milliseconds.
     *
     * @returns {number} The current duration.
     */
    public stepDuration(): number;
    /**
     * Sets the duration of one animation step in milliseconds.
     *
     * @param {number} stepDuration The duration in milliseconds.
     * @returns {Easing} The calling Easing Animator.
     */
    public stepDuration(stepDuration: number): Easing;
    public stepDuration(stepDuration?: number): any {
      if (stepDuration == null) {
        return Math.min(this._stepDuration, this._maxTotalDuration);
      } else {
        this._stepDuration = stepDuration;
        return this;
      }
    }

    /**
     * Gets the maximum start delay between animation steps in milliseconds.
     *
     * @returns {number} The current maximum iterative delay.
     */
    public stepDelay(): number;
    /**
     * Sets the maximum start delay between animation steps in milliseconds.
     *
     * @param {number} stepDelay The maximum iterative delay in milliseconds.
     * @returns {Easing} The calling Easing Animator.
     */
    public stepDelay(stepDelay: number): Easing;
    public stepDelay(stepDelay?: number): any {
      if (stepDelay == null) {
        return this._stepDelay;
      } else {
        this._stepDelay = stepDelay;
        return this;
      }
    }

    /**
     * Gets the maximum total animation duration constraint in milliseconds.
     *
     * If the animation time would exceed the specified time, the duration of each step
     * and the delay between each step will be reduced until the animation fits within
     * the specified time.
     * 
     * @returns {number} The current maximum total animation duration.
     */
    public maxTotalDuration(): number;
    /**
     * Sets the maximum total animation duration constraint in miliseconds.
     * 
     * If the animation time would exceed the specified time, the duration of each step
     * and the delay between each step will be reduced until the animation fits within
     * the specified time.
     *
     * @param {number} maxTotalDuration The maximum total animation duration in milliseconds.
     * @returns {Easing} The calling Easing Animator.
     */
    public maxTotalDuration(maxTotalDuration: number): Easing;
    public maxTotalDuration(maxTotalDuration?: number): any {
      if (maxTotalDuration == null) {
        return this._maxTotalDuration;
      } else {
        this._maxTotalDuration = maxTotalDuration;
        return this;
      }
    }

    /**
     * Gets the current easing mode of the animation.
     *
     * @returns {string} the current easing mode.
     */
    public easingMode(): string;
    /**
     * Sets the easing mode of the animation.
     *
     * @param {string} easingMode The desired easing mode.
     * @returns {Easing} The calling Easing Animator.
     */
    public easingMode(easingMode: string): Easing;
    public easingMode(easingMode?: string): any {
      if (easingMode == null) {
        return this._easingMode;
      } else {
        this._easingMode = easingMode;
        return this;
      }
    }

    /**
     * Adjust the iterative delay, such that it takes into account the maxTotalDuration constraint
     */
    private _getAdjustedIterativeDelay(numberOfSteps: number) {
      var stepStartTimeInterval = this.maxTotalDuration() - this.stepDuration();
      stepStartTimeInterval = Math.max(stepStartTimeInterval, 0);
      var maxPossibleIterativeDelay = stepStartTimeInterval / Math.max(numberOfSteps - 1, 1);
      return Math.min(this.stepDelay(), maxPossibleIterativeDelay);
    }
  }
}
}
