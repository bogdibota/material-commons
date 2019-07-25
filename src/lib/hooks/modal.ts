import { useState } from 'react';

export type ModalState = {
  open: boolean,
  data: any | undefined
};

export type ModalStates = {
  [key: string]: ModalState
}

export function useModal() {
  const [{open, data}, setModalState] = useState({open: false} as ModalState);

  function show(data: any) {
    setModalState({open: true, data});
  }

  function close() {
    setModalState({open: false, data: undefined});
  }

  return {
    open,
    data,
    show,
    close,
  };
}

export function useModals(modalNames: string[]) {
  const [modalState, setModalState] = useState(
    modalNames.reduce((acc, modalName) => ({
      ...acc,
      [modalName]: {open: false},
    } as ModalStates), {} as ModalStates));

  const show = (modalName: string) => (data: any) =>
    setModalState((oldState: ModalStates) => ({...oldState, [modalName]: {open: true, data}}));

  const close = (modalName: any) => () =>
    setModalState((oldState: ModalStates) => ({...oldState, [modalName]: {open: false}}));

  return modalNames.reduce((acc, modalName: string) => ({
    ...acc, [modalName]: {
      open: modalState[modalName].open,
      data: modalState[modalName].data,
      show: show(modalName),
      close: close(modalName),
    },
  }), {});
}
