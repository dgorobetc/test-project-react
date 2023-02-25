import { memo } from 'react'

import { TableHead, TableCell, TableRow } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import { HEAD_RAWS_CONFIG } from '../constant';

import styles from '../App.module.css';

function HeaderCell(props) {
  const { onSortHandler, sortConfig, setActiveSearchKey } = props;
  return (
    <TableHead className={styles['wrapper']}>
      <TableRow>
        {Object.entries(HEAD_RAWS_CONFIG).map(([key, headerCell]) => (
          <TableCell key={key}>
            <div className={styles['header-cell-box']}>
              <TableSortLabel
                active={sortConfig.key === key}
                direction={sortConfig.key === key ? sortConfig.direction : 'asc'}
                onClick={() => onSortHandler(key)}
              >
                {headerCell.label}
              </TableSortLabel>
              <ManageSearchIcon onClick={() => setActiveSearchKey(key)} className={styles['search-icon']} />
            </div>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default memo(HeaderCell);