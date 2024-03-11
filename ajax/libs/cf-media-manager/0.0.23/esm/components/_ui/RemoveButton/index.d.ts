import { ComponentProps } from "preact";
interface RemoveButtonProps extends ComponentProps<"button"> {
    isHidden?: boolean;
}
export default function RemoveButton({ children, isHidden, className, ...rest }: RemoveButtonProps): import("preact").JSX.Element;
export {};
