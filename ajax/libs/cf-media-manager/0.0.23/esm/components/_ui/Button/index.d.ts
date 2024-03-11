import { ComponentProps } from "preact";
interface ButtonProps extends Omit<ComponentProps<"button">, "size"> {
    size?: "md" | "sm";
    type?: "solid" | "ghost";
}
export declare function Button({ children, className, size, type, ...rest }: ButtonProps): import("preact").JSX.Element;
export {};
