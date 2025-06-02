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

  const indexOfLastRecord = React.useMemo(() => {
    return currentPage * recordsPerPage;
  }, [currentPage, recordsPerPage]);

  const indexOfFirstRecord = React.useMemo(
    () => indexOfLastRecord - recordsPerPage,
    [indexOfLastRecord, recordsPerPage]
  );

  const filteredRecords = React.useMemo(() => {
    let filtered = records.employees_records || [];

    if (search) {
      filtered = filtered.filter(record =>
        record.firstName.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    return filtered;
  }, [records.employees_records, search, statusFilter]);

  const totalRecords = React.useMemo(() => {
    return filteredRecords ? filteredRecords.length : 0;
  }, [filteredRecords]);

  const totalPages = React.useMemo(() => {
    return Math.ceil(totalRecords / recordsPerPage);
  }, [totalRecords, recordsPerPage, search, statusFilter]);

  const currentRecords = React.useMemo(() => {
    return filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  }, [
    records.employees_records,
    indexOfFirstRecord,
    indexOfLastRecord,
    filteredRecords,
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
