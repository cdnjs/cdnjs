export type CBOptions = {
    /**
     * a unique class name for the checkbox to find the input
     */
    className?: string;
    /**
     * class name to add if checkbox is checked and remove otherwise
     */
    checkedClassNames?: string[];
    /**
     * class name to add if checkbox was not checked and remove otherwise
     */
    uncheckedClassNames?: string[];
};
