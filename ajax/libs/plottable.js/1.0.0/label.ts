///<reference path="../reference.ts" />

module Plottable {
export module Components {
  export class Label extends Component {
    private _textContainer: d3.Selection<void>;
    private _text: string; // text assigned to the Label; may not be the actual text displayed due to truncation
    private _angle: number;
    private _measurer: SVGTypewriter.Measurers.Measurer;
    private _wrapper: SVGTypewriter.Wrappers.Wrapper;
    private _writer: SVGTypewriter.Writers.Writer;
    private _padding: number;

    /**
     * A Label is a Component that displays a single line of text.
     *
     * @constructor
     * @param {string} [displayText=""] The text of the Label.
     * @param {number} [angle=0] The angle of the Label in degrees (-90/0/90). 0 is horizontal.
     */
    constructor(displayText = "", angle = 0) {
      super();
      this.addClass("label");
      this.text(displayText);
      this.angle(angle);
      this.xAlignment("center").yAlignment("center");
      this._padding = 0;
    }

    public requestedSpace(offeredWidth: number, offeredHeight: number): SpaceRequest {
      var desiredWH = this._measurer.measure(this._text);
      var desiredWidth = (this.angle() === 0 ? desiredWH.width : desiredWH.height) + 2 * this.padding();
      var desiredHeight = (this.angle() === 0 ? desiredWH.height : desiredWH.width) + 2 * this.padding();

      return {
        minWidth: desiredWidth,
        minHeight: desiredHeight
      };
    }

    protected _setup() {
      super._setup();
      this._textContainer = this.content().append("g");
      this._measurer = new SVGTypewriter.Measurers.Measurer(this._textContainer);
      this._wrapper = new SVGTypewriter.Wrappers.Wrapper();
      this._writer = new SVGTypewriter.Writers.Writer(this._measurer, this._wrapper);
      this.text(this._text);
    }

    /**
     * Gets the Label's text.
     */
    public text(): string;
    /**
     * Sets the Label's text.
     *
     * @param {string} displayText
     * @returns {Label} The calling Label.
     */
    public text(displayText: string): Label;
    public text(displayText?: string): any {
      if (displayText === undefined) {
        return this._text;
      } else {
        this._text = displayText;
        this.redraw();
        return this;
      }
    }

    /**
     * Gets the angle of the Label in degrees.
     */
    public angle(): number;
    /**
     * Sets the angle of the Label in degrees.
     *
     * @param {number} angle One of -90/0/90. 0 is horizontal.
     * @returns {Label} The calling Label.
     */
    public angle(angle: number): Label;
    public angle(angle?: number): any {
      if (angle == null) {
        return this._angle;
      } else {
        angle %= 360;
        if (angle > 180) {
          angle -= 360;
        } else if (angle < -180) {
          angle += 360;
        }
        if (angle === -90 || angle === 0 || angle === 90) {
          this._angle = angle;
        } else {
          throw new Error(angle + " is not a valid angle for Label");
        }
        this.redraw();
        return this;
      }
    }

    /**
     * Gets the amount of padding around the Label in pixels.
     */
    public padding(): number;
    /**
     * Sets the amount of padding around the Label in pixels.
     *
     * @param {number} padAmount
     * @returns {Label} The calling Label.
     */
    public padding(padAmount: number): Label;
    public padding(padAmount?: number): any {
      if (padAmount == null) {
        return this._padding;
      } else {
        padAmount = +padAmount;
        if (padAmount < 0) {
          throw new Error(padAmount + " is not a valid padding value. Cannot be less than 0.");
        }
        this._padding = padAmount;
        this.redraw();
        return this;
      }
    }

    public fixedWidth() {
      return true;
    }

    public fixedHeight() {
      return true;
    }

    public renderImmediately() {
      super.renderImmediately();
      // HACKHACK SVGTypewriter should remove existing content - #21 on SVGTypewriter.
      this._textContainer.selectAll("g").remove();
      var textMeasurement = this._measurer.measure(this._text);
      var heightPadding = Math.max(Math.min((this.height() - textMeasurement.height) / 2, this.padding()), 0);
      var widthPadding = Math.max(Math.min((this.width() - textMeasurement.width) / 2, this.padding()), 0);
      this._textContainer.attr("transform", "translate(" + widthPadding + "," + heightPadding + ")");
      var writeWidth = this.width() - 2 * widthPadding;
      var writeHeight = this.height() - 2 * heightPadding;
      var writeOptions = {
                        selection: this._textContainer,
                        xAlign: this.xAlignment(),
                        yAlign: this.yAlignment(),
                        textRotation: this.angle()
                    };
      this._writer.write(this._text, writeWidth, writeHeight, writeOptions);
      return this;
    }
  }

  export class TitleLabel extends Label {
    public static TITLE_LABEL_CLASS = "title-label";
    /**
     * @constructor
     * @param {string} [text]
     * @param {number} [angle] One of -90/0/90. 0 is horizontal.
     */
    constructor(text?: string, angle?: number) {
      super(text, angle);
      this.addClass(TitleLabel.TITLE_LABEL_CLASS);
    }
  }

  export class AxisLabel extends Label {
    public static AXIS_LABEL_CLASS = "axis-label";
    /**
     * @constructor
     * @param {string} [text]
     * @param {number} [angle] One of -90/0/90. 0 is horizontal.
     */
    constructor(text?: string, angle?: number) {
      super(text, angle);
      this.addClass(AxisLabel.AXIS_LABEL_CLASS);
    }
  }
}
}
