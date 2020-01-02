export * from './formFields';

export const noWrap = { whiteSpace: 'nowrap' };

export const PropsTableHead = () => (
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
);

export const Table = ({ Head, children }) => (
  <table>
    <thead>
    <Head/>
    </thead>
    <tbody>
    { children }
    </tbody>
  </table>
);

export const PropsTable = ({ children }) => (
  <Table Head={ PropsTableHead }>
    { children }
  </Table>
);
