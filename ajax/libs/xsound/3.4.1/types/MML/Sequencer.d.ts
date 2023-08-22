import { MMLSyntaxError } from '/src/MML/Tree';
import { TreeConstructor } from '/src/MML/TreeConstructor';
import { Sequence } from '/src/MML/Sequence';
/**
 * This class converts syntax tree to array that contains musical note.
 * @constructor
 */
export declare class Sequencer {
    private sequences;
    private treeConstructor;
    private syntaxTree;
    private timeOf4note;
    private octave;
    private currentTime;
    private errorCallback;
    /**
     * @param {TreeConstructor} treeConstructor This argument is instance of `TreeConstructor`.
     * @param {function} errorCallback This argument is invoked on error.
     */
    constructor(treeConstructor: TreeConstructor, errorCallback?: (error: MMLSyntaxError) => void);
    /**
     * This method calculates pitch and music time from Parse Tree.
     * @return {Array<Sequence>} Return value is array that contains instance of `Sequence`.
     *     If error occurs, error handler is invoked. Return value is `undefined`.
     */
    get(): Sequence[] | void;
    /**
     * This method returns string that represents MML syntax tree.
     * @return {string}
     */
    getSyntaxTree(): string;
    /**
     * This method constructs syntax tree.
     * @param {Tree|null} tree This argument is instance of `Tree` that is added to syntax tree.
     */
    private push;
    /**
     * This method concatenates previous sequence and current sequence in case of tie.
     */
    private concat;
}
//# sourceMappingURL=Sequencer.d.ts.map