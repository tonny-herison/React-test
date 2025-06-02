import React from "react";
import { Button, Flex } from "../styled";

const Pagination = ({
  currentPage,
  handleCurrentPage,
  recordsPerPage,
  totalRecords,
  totalPages,
}) => {
  return (
    <Flex
      style={{
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <div>{`Showing ${recordsPerPage} of ${totalRecords}`}</div>
      <Flex style={{ alignItems: "center" }}>
        <Button
          onClick={() => handleCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handleCurrentPage(index + 1)}
            disabled={currentPage === index + 1}
            style={{
              padding: "5px 20px",
              minWidth: "30px",
              margin: "0 5px",
              backgroundColor:
                currentPage === index + 1 ? "#007bff" : "#f8f9fa",
              color: currentPage === index + 1 ? "#fff" : "#000",
            }}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          onClick={() => handleCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
