export type ButtonType = "submit" | "reset" | "button";
declare function adjustButton(buttonElement: HTMLButtonElement, show?: boolean, type?: ButtonType, disabled?: boolean): HTMLButtonElement;
export default adjustButton;
