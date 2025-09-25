import { createContext } from 'react';

interface LoaderContextType {
  isLoading: boolean;
  showLoader: () => void;
  hideLoader: () => void;
  setLoading: (loading: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
export type { LoaderContextType };
