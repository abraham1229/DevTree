import { useState, ReactNode } from 'react';
import { LoaderContext } from './LoaderContextDefinition';

interface LoaderProviderProps {
  children: ReactNode;
}

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);
  const setLoading = (loading: boolean) => setIsLoading(loading);

  return (
    <LoaderContext.Provider value={{ isLoading, showLoader, hideLoader, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}

