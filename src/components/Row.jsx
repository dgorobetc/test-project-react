import { memo } from 'react';

import { TableRow } from '@mui/material';
import Cell from './Cell';

function RowCell({ rowData, changeCellHandler }) {
  const { id } = rowData;
  return (
    <TableRow>
      {Object.entries(rowData)
        .map(([key, label]) => (
          <Cell label={label} key={label} rowKey={key} id={id} changeCellHandler={changeCellHandler} />
        ))}
    </TableRow>
  )
}

export default memo(RowCell);