import { useRef, useEffect } from 'react';
export function useRefObject(input) {
  var ref = useRef(input);
  useEffect(function () {
    ref.current = input;
  }, [input]);
  return ref;
}