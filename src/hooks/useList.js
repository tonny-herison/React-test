import React from "react";
import { useSelector } from "react-redux";

const UseList = () => {
  const records = useSelector(state => state.employees);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [recordsPerPage] = React.useState(10);

  const handlePage = page => {
    setCurrentPage(page);
  };

  const indexOfLastRecord = React.useMemo(
    () => currentPage * recordsPerPage,
    [currentPage, recordsPerPage]
  );
  const indexOfFirstRecord = React.useMemo(
    () => indexOfLastRecord - recordsPerPage,
    [indexOfLastRecord, recordsPerPage]
  );

  const totalRecords = React.useMemo(() => {
    return records.employees_records ? records.employees_records.length : 0;
  }, [records.employees_records]);

  const totalPages = React.useMemo(() => {
    return Math.ceil(totalRecords / recordsPerPage);
  }, [totalRecords, recordsPerPage]);

  const currentRecords = React.useMemo(() => {
    if (records.employees_records && records.employees_records.length) {
      return records.employees_records.slice(
        indexOfFirstRecord,
        indexOfLastRecord
      );
    }
    return [];
  }, [records.employees_records, indexOfFirstRecord, indexOfLastRecord]);

  return {
    currentRecords,
    currentPage,
    recordsPerPage,
    handlePage,
    totalRecords,
    totalPages,
  };
};

export default UseList;
