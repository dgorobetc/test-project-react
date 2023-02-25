import { useState, useMemo, useEffect, useRef } from 'react';
import { Table, TableBody, TableContainer, Paper } from '@mui/material';
import RowCell from './Row'
import SearchBox from './SearchBox'
import HeaderCell from './HeaderCell'
import EmptyState from './EmptyState'

import { ROW_HEIGHT, VISIBLE_ROWS } from '../constant'

import useTableHook from '../hooks/useTable'

import styles from '../App.module.css'

const BasicTable = () => {
  const {
    data,
    setFilteredData,
    activeSearchKey,
    setActiveSearchKey,
    changeCellHandler,
    onSortHandler,
    sortedData,
    sortConfig,
  } = useTableHook()

  const rootRef = useRef();
  const [start, setStart] = useState(0);

  const topHeight = useMemo(() => {
    return ROW_HEIGHT * start;
  }, [start]);

  const bottomHeight = useMemo(() => {
    return ROW_HEIGHT * (sortedData.length - (start + VISIBLE_ROWS + 1));
  }, [sortedData.length, start]);

  useEffect(() => {
    function onScroll(e) {
      setStart(Math.min(
        sortedData.length - VISIBLE_ROWS - 1,
        Math.floor(e.target.scrollTop / ROW_HEIGHT)
      ));
    }
    rootRef.current.addEventListener('scroll', onScroll);

    return () => {
      rootRef.current.removeEventListener('scroll', onScroll);
    }
  }, [sortedData.length]);
  return (
    <>
      <SearchBox data={data} setFilteredData={setFilteredData} activeSearchKey={activeSearchKey} />
      <div
        style={{ height: ROW_HEIGHT * VISIBLE_ROWS + 1, overflow: 'auto' }}
        ref={rootRef}
        className={styles['table-wrapper']}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <HeaderCell
              onSortHandler={onSortHandler}
              sortConfig={sortConfig}
              setActiveSearchKey={setActiveSearchKey}
            />

            <TableBody>
              {!sortedData.length && <EmptyState />}
              <tr style={{ height: topHeight }} />
              {sortedData.slice(start, start + VISIBLE_ROWS + 1).map((row, rowIndex) => (
                <RowCell
                  rowData={row}
                  style={{ height: ROW_HEIGHT }}
                  key={start + rowIndex}
                  changeCellHandler={changeCellHandler}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ height: bottomHeight }} />
      </div>
    </>
  );
}
export default BasicTable;