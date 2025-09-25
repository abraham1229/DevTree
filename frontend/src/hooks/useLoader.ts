import { useContext } from 'react';
import { LoaderContext } from '../contexts/LoaderContextDefinition';

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
