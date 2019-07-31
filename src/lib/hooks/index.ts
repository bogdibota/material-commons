import { useMemo, useState } from 'react';

export function useIncrementalKey(): [ number, () => void ] {
  const [ key, setKey ] = useState(0);
  const incrementKey = useMemo(() => () => setKey(key => key + 1), [ setKey ]);

  return [ key, incrementKey ];
}

export * from './modal';
