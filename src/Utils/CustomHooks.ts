import { useEffect, useRef } from "react";

export const usePrevious = <Type>(value: Type): Type | undefined => {
  const ref = useRef<Type>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};