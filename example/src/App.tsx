import { Typography } from '@material-ui/core';
import React, { FC } from 'react';
import Playground from './Playground';
import FormSection from './sections/Form';
import ModalSection from './sections/Modal';
import TableSection from './sections/Table';

const App: FC = () => {
  return <>
    <Typography variant="h4">Playground</Typography>
    <Playground/>

    <Typography variant="h4">Table section</Typography>
    <TableSection/>

    <Typography variant="h4">Modal section</Typography>
    <ModalSection/>

    <Typography variant="h4">Form section</Typography>
    <FormSection/>
  </>;
};

export default App;
