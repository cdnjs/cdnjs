import * as React from 'react';
/**
 * Хук для two-pass рендеринга.
 *
 * ВНИМАНИЕ: Этот подход сделает ваши компоненты медленнее, потому что они
 * должны рендериться дважды, поэтому используйте хук с осторожностью.
 *
 * @see {@link https://beta.reactjs.org/apis/react-dom/hydrate#handling-different-client-and-server-content React Docs}
 */ export function useIsClient(initial = false) {
    const [isClient, setIsClient] = React.useState(initial);
    React.useEffect(()=>{
        setIsClient(true);
    }, []);
    return isClient;
}

//# sourceMappingURL=useIsClient.js.map