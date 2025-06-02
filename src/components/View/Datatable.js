import React from "react";
import Pagination from "./Pagination";
import UseList from "../../hooks/useList";
import TextField from "../Create/styled/TextField";
import List from "./List";
import { Flex } from "../styled";
import SelectField from "../Create/styled/SelectField";
import StatusList from "../../default/employee";

const DataTable = () => {
  const {
    currentPage,
    currentRecords,
    totalPages,
    totalRecords,
    search,
    handlePage,
    handleSearch,
    handleStatusFilter,
  } = UseList();

  return (
    <div>
      <Flex
        style={{
          marginBottom: "20px",
        }}
      >
        <TextField
          type="search"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
        <SelectField onChange={handleStatusFilter}>
          <option value="ALL">All Status</option>
          {StatusList.map(status => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </SelectField>
      </Flex>
      <List data={currentRecords} />
      <Pagination
        currentPage={currentPage}
        recordsPerPage={currentRecords.length}
        totalRecords={totalRecords}
        totalPages={totalPages}
        handleCurrentPage={page => handlePage(page)}
      />
    </div>
  );
};

export default DataTable;
