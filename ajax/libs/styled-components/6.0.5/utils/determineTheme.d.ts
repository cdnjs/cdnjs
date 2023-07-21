import { DefaultTheme, ExecutionProps } from '../types';
export default function determineTheme(props: ExecutionProps, providedTheme?: DefaultTheme, defaultProps?: {
    theme?: DefaultTheme;
}): DefaultTheme | undefined;
