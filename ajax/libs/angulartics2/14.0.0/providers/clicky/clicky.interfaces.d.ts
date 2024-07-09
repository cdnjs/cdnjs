/**
 * Properties passed through angulartics2-clicky and fed into clicky itself
 */
export interface ClickyProperties {
    /** Title of the page for page tracking, or name of the event for event tracking */
    title: string;
    /** The limited set of things that can be tracked with clicky */
    type: string;
    /** The id / name of a clicky goal against which revenue can be tracked */
    goal: string;
    /** The revenue that is tracked against a given clicky goal */
    revenue: number;
    /** Whether or not to bypass the clicky queue -- tracking may not occur on pageloads if 'true'  */
    noQueue: boolean;
}
