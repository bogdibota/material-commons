import { useCallback, useState } from 'react';

export type ModalState<TData> = {
  isOpen: boolean,
  data: TData | undefined
};

export type ModalStates<TData = any> = {
  [key: string]: ModalState<TData>
}

export function useModal<TData = any>(): {
  isOpen: boolean,
  data?: TData,
  open: (data?: TData) => void,
  close: () => void,
} {
  const [ { isOpen, data }, setModalState ] = useState({ isOpen: false } as ModalState<TData>);

  const open = useCallback((data?: TData) => {
    setModalState({ isOpen: true, data });
  }, [ setModalState ]);

  const close = useCallback(() => {
    setModalState({ isOpen: false, data: undefined });
  }, [ setModalState ]);

  return {
    isOpen,
    data,
    open,
    close,
  };
}

export function useModals(modalNames: string[]) {
  const [ modalState, setModalState ] = useState(
    modalNames.reduce((acc, modalName) => ({
      ...acc,
      [modalName]: { isOpen: false },
    } as ModalStates), {} as ModalStates));

  const open = (modalName: string) => (data: any) =>
    setModalState((oldState: ModalStates) => ({ ...oldState, [modalName]: { isOpen: true, data } }));

  const close = (modalName: any) => () =>
    setModalState((oldState: ModalStates) => ({ ...oldState, [modalName]: { isOpen: false } }));

  return modalNames.reduce((acc, modalName: string) => ({
    ...acc, [modalName]: {
      isOpen: modalState[modalName].isOpen,
      data: modalState[modalName].data,
      open: open(modalName),
      close: close(modalName),
    },
  }), {});
}
