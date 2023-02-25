import { useState, useCallback, useMemo } from 'react';
import { createData } from '../heplers'

const suggestions = [...Array(501)].map(createData);

const useTableHook = () => {
  const [data, setData] = useState(suggestions);
  const [filteredData, setFilteredData] = useState(suggestions);
  const [activeSearchKey, setActiveSearchKey] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "",
  });

  const changeCellHandler = useCallback((value, key, id) => {
    setData(prevData => {
      const newData = prevData.map(elem => {
        if (elem.id === id) {
          return { ...elem, [key]: value };
        } else {
          return elem;
        }
      });
      return newData;
    });
  }, []);

  const onSortHandler = useCallback((key) => {
    setSortConfig(prevConfig => {
      let direction = "asc";
      if (prevConfig.key === key && prevConfig.direction === "asc") {
        direction = "desc";
      }
      return { key, direction };
    });
  }, []);

  const sortedData = useMemo(() => {
    if (sortConfig.key === null) {
      return filteredData;
    }
    const isAge = sortConfig.key === 'age'
    if (isAge) {
      return sortConfig.direction === "asc" ?
        [...filteredData].sort((a, b) => a[sortConfig.key] - b[sortConfig.key]) :
        [...filteredData].sort((a, b) => b[sortConfig.key] - a[sortConfig.key]);
    }
    return [...filteredData].sort((a, b) => {
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      return direction * a[sortConfig.key].localeCompare(b[sortConfig.key]);
    });
  }, [filteredData, sortConfig]);

  return {
    data,
    setFilteredData,
    sortConfig,
    activeSearchKey,
    setActiveSearchKey,
    changeCellHandler,
    onSortHandler,
    sortedData,
  };
};

export default useTableHook;