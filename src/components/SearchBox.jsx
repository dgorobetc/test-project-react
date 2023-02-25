import { useState, useEffect } from 'react'
import { TextField, Typography } from '@mui/material';

import { HEAD_RAWS_CONFIG } from '../constant'

import styles from '../App.module.css'

function SearchBox(props) {
  const { data, setFilteredData, activeSearchKey } = props
  console.log("🚀 ~ file: SearchBox.jsx:10 ~ SearchBox ~ data:", data)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSearch('')
  }, [activeSearchKey])

  const searchKeyData = HEAD_RAWS_CONFIG[activeSearchKey]

  useEffect(() => {

    const debounceTimer = setTimeout(() => {
      const isAgeCell = activeSearchKey === 'age'
      if (search) {
        const filteredData = data.filter((item) => {
          if (isAgeCell) {
            return item[activeSearchKey] === Number(search)
          }
          return item[activeSearchKey].toLowerCase().includes(search.toLowerCase());
        });
        setFilteredData(filteredData)
      } else {
        setFilteredData(data)
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [activeSearchKey, data, search, setFilteredData]);

  if(!searchKeyData) return null
  
  return (
    <div className={styles['search-container']}>
      <Typography variant="h4" >
        {searchKeyData.label} :
      </Typography>
      <TextField value={search} onChange={(e) => setSearch(e.target.value)} className={styles['search-fild']} label={searchKeyData.label} variant="outlined" width={100} />
    </div>
  )
}

export default SearchBox