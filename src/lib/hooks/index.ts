import { useReducer } from 'react';

export function useIncrementalKey(): [ number, () => void ] {
  const [ key, incrementKey ] = useReducer(oldKey => oldKey + 1, 0);

  return [ key, incrementKey as () => void ];
}

export * from './modal';
