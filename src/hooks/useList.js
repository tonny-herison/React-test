import React from "react";
import { useSelector } from "react-redux";

const UseList = () => {
  const records = useSelector(state => state.employees);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("ALL");
  const [recordsPerPage] = React.useState(10);

  const handlePage = page => {
    setCurrentPage(page);
  };

  const handleSearch = event => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = event => {
    setStatusFilter(event.target.value);
    setCurrentPage(1);
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
    let filteredRecords = records.employees_records || [];

    if (search) {
      filteredRecords = filteredRecords.filter(record =>
        record.firstName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filteredRecords = filteredRecords.filter(
        record => record.status === statusFilter
      );
    }

    return filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  }, [
    records.employees_records,
    indexOfFirstRecord,
    indexOfLastRecord,
    search,
    statusFilter,
  ]);

  return {
    currentRecords,
    currentPage,
    recordsPerPage,
    handlePage,
    totalRecords,
    totalPages,
    search,
    handleSearch,
    handleStatusFilter,
  };
};

export default UseList;
