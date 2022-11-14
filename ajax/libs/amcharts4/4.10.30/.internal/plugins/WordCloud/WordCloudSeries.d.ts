/**
 * Defines WordCloud series.
 */
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Series, SeriesDataItem, ISeriesProperties, ISeriesDataFields, ISeriesAdapters, ISeriesEvents } from "../../charts/series/Series";
import { Sprite } from "../../core/Sprite";
import { Container } from "../../core/Container";
import { Label } from "../../core/elements/Label";
import { ListTemplate } from "../../core/utils/List";
import { Animation } from "../../core/utils/Animation";
import { ColorSet } from "../../core/utils/ColorSet";
import { IPoint } from "../../core/defs/IPoint";
import { WordCloud } from "./WordCloud";
import * as $type from "../../core/utils/Type";
import { Percent } from "../../core/utils/Percent";
import { IDisposer } from "../../core/utils/Disposer";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[WordCloudSeries]].
 *
 * @see {@link DataItem}
 */
export declare class WordCloudSeriesDataItem extends SeriesDataItem {
    /**
     * A reference to a word label element.
     *
     * @ignore Exclude from docs
     */
    _label: Label;
    /**
     * Defines a type of [[Component]] this data item is used for.
     */
    _component: WordCloudSeries;
    /**
     * Constructor
     */
    constructor();
    /**
     * Hide the data item (and corresponding visual elements).
     *
     * @param  duration  Duration (ms)
     * @param  delay     Delay hiding (ms)
     * @param  toValue   Target value for animation
     * @param  fields    Fields to animate while hiding
     */
    hide(duration?: number, delay?: number, toValue?: number, fields?: string[]): $type.Optional<Animation>;
    /**
     * Sets visibility of the Data Item.
     *
     * @param value Data Item
     */
    setVisibility(value: boolean, noChangeValues?: boolean): void;
    /**
     * Show hidden data item (and corresponding visual elements).
     *
     * @param duration  Duration (ms)
     * @param delay     Delay hiding (ms)
     * @param fields    Fields to animate while hiding
     */
    show(duration?: number, delay?: number, fields?: string[]): $type.Optional<Animation>;
    /**
     * The word.
     *
     * @param  value  Word
     */
    /**
    * @return Word
    */
    word: string;
    /**
     * A [Label] element, related to this data item (word).
     *
     * @readonly
     * @return Label element
     */
    readonly label: this["_label"];
}
/**
 * ============================================================================
 * REQUISITES
 * ============================================================================
 * @hidden
 */
/**
 * Defines data fields for [[WordCloudSeries]].
 */
export interface IWordCloudSeriesDataFields extends ISeriesDataFields {
    /**
     * Name of the field in data that holds word.
     */
    word?: string;
}
/**
 * Defines properties for [[WordCloudSeries]].
 */
export interface IWordCloudSeriesProperties extends ISeriesProperties {
    /**
     * A color set to be used for words.
     */
    colors?: ColorSet;
    /**
     * Source text from which words are extracted.
     */
    text?: string;
    /**
     * Absolute or relative font size for the smallest words.
     */
    minFontSize?: number | Percent;
    /**
     * Absolute or relative font size for the biggest words.
     */
    maxFontSize?: number | Percent;
    /**
     * Minimum occurances for a word to be included into cloud.
     */
    minValue?: number;
    /**
     * Maximum number of words to show.
     */
    maxCount?: number;
    /**
     * Array of words  exclude from cloud.
     */
    excludeWords?: string[];
    /**
     * Randomness of word placement (0-1).
     */
    randomness?: number;
    /**
     * Minimum number of characters for a word to be included in the cloud.
     */
    minWordLength?: number;
    /**
     * An array of possible rotation angles for words.
     */
    angles?: number[];
    /**
     * If word's relative height is bigger than this, it won't be rotated.
     */
    rotationThreshold?: number;
    /**
     * Step for next word placement.
     */
    step?: number;
    /**
     * Accuracy of overlapping check.
     */
    accuracy?: number;
}
/**
 * Defines events for [[WordCloudSeries]].
 */
export interface IWordCloudSeriesEvents extends ISeriesEvents {
    /**
     * Invokes when word arranging starts.
     */
    arrangestarted: {};
    /**
     * Invoked when progress has been made in arranging the words.
     */
    arrangeprogress: {
        /**
         * Progress
         */
        progress: number;
    };
    /**
     * Invoked when word arranging is finished.
     */
    arrangeended: {};
}
/**
 * Defines adapters for [[WordCloudSeries]].
 *
 * @see {@link Adapter}
 */
export interface IWordCloudSeriesAdapters extends ISeriesAdapters, IWordCloudSeriesProperties {
}
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Defines [[WordCloudSeries]] which is a base class for [[PieSeries]],
 * [[FunnelSeries]], and [[PyramidSeries]].
 *
 * @see {@link IWordCloudSeriesEvents} for a list of available Events
 * @see {@link IWordCloudSeriesAdapters} for a list of available Adapters
 */
export declare class WordCloudSeries extends Series {
    /**
     * Defines type of the label elements for the series.
     *
     * @ignore Exclude from docs
     */
    _label: Label;
    /**
     * A reference to chart this series is for.
     *
     * @ignore Exclude from docs
     */
    _chart: WordCloud;
    /**
     * Defines the type of data fields used for the series.
     */
    _dataFields: IWordCloudSeriesDataFields;
    /**
     * Defines available properties.
     */
    _properties: IWordCloudSeriesProperties;
    /**
     * Defines available adapters.
     */
    _adapter: IWordCloudSeriesAdapters;
    /**
     * Defines available events.
     */
    _events: IWordCloudSeriesEvents;
    /**
     * Defines the type of data item.
     */
    _dataItem: WordCloudSeriesDataItem;
    /**
     * List of label elements.
     */
    protected _labels: ListTemplate<this["_label"]>;
    protected _ctx: CanvasRenderingContext2D;
    protected _canvas: HTMLCanvasElement;
    protected _spiral: Sprite;
    protected _points: IPoint[];
    protected _adjustedFont: number;
    protected _processTimeout: IDisposer;
    protected _currentIndex: number;
    /**
     * Holds a Sprite that acts as an intelligent mask for the serries.
     */
    protected _maskSprite: Sprite;
    /**
     * Container label elements are put in.
     */
    labelsContainer: Container;
    /**
     * Constructor
     */
    constructor();
    /**
     * Validates data range.
     *
     * @ignore
     */
    validateDataRange(): void;
    /**
     * Validates element.
     *
     * @ignore
     */
    validate(): void;
    /**
     * [processItem description]
     *
     * @param   dataItem  Data item
     */
    protected processItem(dataItem: this["_dataItem"]): void;
    /**
     * Sreates label element.
     *
     * @return label
     */
    protected createLabel(): this["_label"];
    /**
     * [[Label]] elements representing each word.
     *
     * @return  Label elements
     */
    readonly labels: ListTemplate<this["_label"]>;
    /**
     * Returns a new/empty DataItem of the type appropriate for this object.
     *
     * @see {@link DataItem}
     * @return Data Item
     */
    protected createDataItem(): this["_dataItem"];
    /**
     * A color set to be used for each new word.
     *
     * By default it's empty, so all words will be colored the same.
     *
     * If you want to automatically color each word differently, set this
     * to a new instance of a [[ColorSet]].
     *
     * ```TypeScript
     * series.colors = new am4core.ColorSet();
     * series.colors.step = 1;
     * series.colors.passOptions = {}; // makes it loop
     * ```
     * ```JavaScript
     * series.colors = new am4core.ColorSet();
     * series.colors.step = 1;
     * series.colors.passOptions = {}; // makes it loop
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "colors": {
     *       "type": "ColorSet",
     *       "step": 1,
     *       "passOptions": {}
     *     }
     *   }]
     * }
     * ```
     *
     * @param  value  Color set
     */
    /**
    * @return Color set
    */
    colors: ColorSet;
    /**
     * [updateData description]
     */
    protected updateData(): void;
    /**
     * A source text to build word cloud from.
     *
     * @param  value  Source text
     */
    /**
    * @return Source text
    */
    text: string;
    /**
     * Maximum number of words to show.
     *
     * If ther are more words in the cloud than `maxCount`, smallest words will
     * be discarded.
     *
     * NOTE: this setting is used only when you set whole text using `text`. If
     * you set `chart.data` or `series.data` directly, it won't have any effect.
     *
     * @param  value  Maximum words to show
     */
    /**
    * @return Maximum words to show
    */
    maxCount: number;
    /**
     * Minimum occurances for a word to be included in the cloud.
     *
     * NOTE: this setting is used only when you set whole text using `text`. If
     * you set `chart.data` or `series.data` directly, it won't have any effect.
     *
     * @default 1
     * @param  value  Minimum occurences
     */
    /**
    * @return  Minimum occurences
    */
    minValue: number;
    /**
     * An array of words to exclude from the cloud.
     *
     * ```TypeScript
     * series.excludeWords = ["the", "a", "an"];
     * ```
     * ```JavaScript
     * series.excludeWords = ["the", "a", "an"];
     * ```
     * ```JSON
     * {
     *   // ...
     *   "series": [{
     *     // ...
     *     "excludeWords": ["the", "a", "an"]
     *   }]
     * }
     * ```
     *
     * NOTE: this setting is used only when you set whole text using `text`. If
     * you set `chart.data` or `series.data` directly, it won't have any effect.
     *
     * @param  value  Words to exclude from the cloud
     */
    /**
    * @return Words to exclude from the cloud
    */
    excludeWords: string[];
    /**
     * Font size for the biggest words.
     *
     * This can be set either as a numeric pixel size, or as a relative
     * as `Percent`.
     *
     * When setting as percent it will use series' height or width (the one which is smaller) as a basis for
     * calculating the font size.
     *
     * NOTE: this setting might be automatically adjusted if all words do not fit
     * in the available space.
     *
     * @default 20%
     * @param  value  Font size
     */
    /**
    * @return {number} Font size
    */
    maxFontSize: number | Percent;
    /**
     * Font size for the smallest words.
     *
     * This can be set either as a numeric pixel size, or as a relative
     * as `Percent`.
     *
     * When setting as percent it will use series' height or width (the one which is smaller) as a basis for
     * calculating the font size.
     *
     * @default 2%
     * @param  value  Font size
     */
    /**
    * @return Font size
    */
    minFontSize: number | Percent;
    /**
     * Randomness of word placement.
     *
     * Available values are from 0 (no randomization) to 1 (completely random).
     *
     * The smaller the value the bigger the chance that biggest words will end up
     * closer to the center.
     *
     * @default 0.2
     * @param value Randomness
     */
    /**
    * @return Randomness
    */
    randomness: number;
    /**
     * Step by which label is moved if its space is already occupied.
     *
     * The smaller the number, the more packed labels will be.
     *
     * NOTE: smaller numbers make for more packed clouds, but will consume
     * considerably more CPU power. Use with caution with bigger clouds.
     *
     * @default 15
     * @param  value Step
     */
    /**
    * @return Step
    */
    step: number;
    /**
     * Accuracy setting when checking for overlapping of words.
     *
     * The bigger the number, the bigger chance of overlapping, but it's also
     * better for performance.
     *
     * Use smaller numbers if you are using a thin font.
     *
     * @default 5
     * @param  value  Accuracy
     */
    /**
    * @return Accuracy
    */
    accuracy: number;
    /**
     * Minimum number of characters for a word to be included in the cloud.
     *
     * NOTE: this setting is used only when you set whole text using `text`. If
     * you set `chart.data` or `series.data` directly, it won't have any effect.
     *
     * @default 1
     * @param {number} value Minimum word length
     */
    /**
    * @return Minimum word length
    */
    minWordLength: number;
    /**
     * Rotation threshold.
     *
     * Big words don't look good good when rotated, hence this setting.
     *
     * It works like this: if word's relative height is bigger
     * than `rotationThreshold`, the word will never be rotated.
     *
     * Available values are from 0 (none of the words will be rotated) to 1 (all
     * words can be rotated).
     *
     * @default 0.7
     * @param  value  Threshold
     */
    /**
    * @return Threshold
    */
    rotationThreshold: number;
    /**
     * An array of available word rotation angles.
     *
     * The only supported values are: 0 (horizontal), and 90 (vertical).
     *
     * @default [0, 0, 90]
     * @param  value  Angles
     */
    /**
    * @return Angles
    */
    angles: number[];
    /**
     * @ignore
     * Not finished yet
     */
    readonly maskSprite: Sprite;
    /**
     * Copies all properties from another instance of [[WordCloudSeries]].
     *
     * @param source  Source series
     */
    copyFrom(source: this): void;
    /**
     * Extracts words and number of their appearances from a text.
     *
     * @ignore
     * @param  input  Source text
     */
    getWords(input: string): {
        word: string;
        value: number;
    }[];
    /**
     * Checks if word is capitalized (starts with an uppercase) or not.
     *
     * @param   word  Word
     * @return        Capitalized?
     */
    isCapitalized(word: string): boolean;
}
