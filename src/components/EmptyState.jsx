import { Typography } from '@mui/material';
import { TableCell, TableRow } from '@mui/material';

import styles from '../App.module.css';

function EmptyState() {
  return (
    <TableRow align="center">
      <TableCell colSpan="10" align="center">
        <Typography className={styles['empty-state-wrapper']} variant="h3">
          No matches found
        </Typography>
      </TableCell>
    </TableRow>
  )
}

export default EmptyState;