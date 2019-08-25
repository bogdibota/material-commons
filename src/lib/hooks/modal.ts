import { useCallback, useState } from 'react';

export type ModalState<TData> = {
  open: boolean,
  data: TData | undefined
};

export type ModalStates<TData = any> = {
  [key: string]: ModalState<TData>
}

export function useModal<TData = any>(): {
  open: boolean,
  data?: TData,
  show: (data?: TData) => void,
  close: () => void,
} {
  const [ { open, data }, setModalState ] = useState({ open: false } as ModalState<TData>);

  const show = useCallback((data?: TData) => {
    setModalState({ open: true, data });
  }, [ setModalState ]);

  const close = useCallback(() => {
    setModalState({ open: false, data: undefined });
  }, [ setModalState ]);

  return {
    open,
    data,
    show,
    close,
  };
}

export function useModals(modalNames: string[]) {
  const [ modalState, setModalState ] = useState(
    modalNames.reduce((acc, modalName) => ({
      ...acc,
      [modalName]: { open: false },
    } as ModalStates), {} as ModalStates));

  const show = (modalName: string) => (data: any) =>
    setModalState((oldState: ModalStates) => ({ ...oldState, [modalName]: { open: true, data } }));

  const close = (modalName: any) => () =>
    setModalState((oldState: ModalStates) => ({ ...oldState, [modalName]: { open: false } }));

  return modalNames.reduce((acc, modalName: string) => ({
    ...acc, [modalName]: {
      open: modalState[modalName].open,
      data: modalState[modalName].data,
      show: show(modalName),
      close: close(modalName),
    },
  }), {});
}
