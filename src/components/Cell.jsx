import { memo, useState } from 'react'

import { TableCell, TextField } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

import { HEAD_RAWS_CONFIG } from '../constant'

import styles from '../App.module.css'


function Row(props) {
  const { label, rowKey, changeCellHandler, id } = props
  const isEditable = HEAD_RAWS_CONFIG[rowKey].editable
  const [value, setValue] = useState(label)
  const [isChangeMode, setIsChangeMode] = useState(false)
  const changeValueHandler = (e) => {
    setValue(e.target.value)
  }
  const setNewValue = () => {
    setIsChangeMode(false)
    changeCellHandler(value, rowKey, id)
  }
  return (
    <TableCell key={label} className={styles['cell-text']}>
      <div className={styles['cell-text-inner']}>
        {isChangeMode ? (
          <TextField
            value={value}
            onChange={changeValueHandler}
            variant="standard"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                setNewValue()
              }
            }}
          />) : (
          <>
            {label}
            {isEditable && <ChangeCircleIcon onClick={() => setIsChangeMode(!isChangeMode)} />}
          </>
        )
        }
      </div>
    </TableCell>
  )
}

export default memo(Row)