import { Stack, Grid, Box } from "@mui/material";
import React from "react";
import Header from "./components/header/Header";
import TableComponent from "./components/table/TableComponent";
import "./_assets/styles/github.scss";
const GithubIndex = () => {
  return (
    <>
      <Header />
      <Stack mt={5} justifyContent="center" alignItems="center">
        <Box maxWidth="90%">
          <TableComponent />
        </Box>
      </Stack>
    </>
  );
};

export default GithubIndex;
