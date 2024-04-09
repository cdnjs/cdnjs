import { ComponentProps } from "preact";
interface ButtonProps extends Omit<ComponentProps<"button">, "size"> {
    size?: "md" | "sm" | "lg";
    type?: "solid" | "ghost" | "outline";
    isLoading?: boolean;
}
export declare function Button({ children, className, size, type, isLoading, disabled, ...rest }: ButtonProps): import("preact").JSX.Element;
export {};
