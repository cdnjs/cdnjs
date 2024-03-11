import { Step } from "../../MediaManager";
export interface StepperElementProps {
    name: "Add images" | "Upload";
    status: "passive" | "active" | "done";
}
interface StepperProps {
    step: Step;
}
export declare function Stepper(props: StepperProps): import("preact").JSX.Element;
export {};
