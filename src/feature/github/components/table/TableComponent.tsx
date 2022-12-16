import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TableRowComponent from "./TableRowComponent";
import TableToolbar from "./TableToolbar";
import { useFetch } from "../../hooks/useFetch";
import CircularProgress from "@mui/material/CircularProgress";
const TableComponent = () => {
  const { data, loading, error } = useFetch();
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          borderRadius: "6px",
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableToolbar />
          </TableHead>
          <TableBody>
            {data &&
              data.map((row: any, index: number) => (
                <TableRowComponent key={index} data={row} />
              ))}
            {loading ? <CircularProgress /> : null}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableComponent;
