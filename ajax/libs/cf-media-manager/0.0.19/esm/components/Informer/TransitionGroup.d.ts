/**
 * @source https://github.com/developit/preact-transition-group
 */
import { Component, h } from "preact";
declare class TransitionGroup extends Component {
    constructor(props: any, context: any);
    componentWillMount(): void;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: any): void;
    componentDidUpdate(): void;
    _finishAbort(key: any): void;
    performAppear(key: any): void;
    _handleDoneAppearing(key: any): void;
    performEnter(key: any): void;
    _handleDoneEntering(key: any): void;
    performLeave(key: any): void;
    _handleDoneLeaving(key: any): void;
    render({ childFactory, transitionLeave, transitionName, transitionAppear, transitionEnter, transitionLeaveTimeout, transitionEnterTimeout, transitionAppearTimeout, component, ...props }: {
        [x: string]: any;
        childFactory: any;
        transitionLeave: any;
        transitionName: any;
        transitionAppear: any;
        transitionEnter: any;
        transitionLeaveTimeout: any;
        transitionEnterTimeout: any;
        transitionAppearTimeout: any;
        component: any;
    }, { children }: {
        children: any;
    }): import("preact").VNode<h.JSX.DOMAttributes<HTMLInputElement> & import("preact").ClassAttributes<HTMLInputElement>>;
}
export default TransitionGroup;
//# sourceMappingURL=TransitionGroup.d.ts.map