import { Stack, Box } from "@mui/material";
import React from "react";
import MenuComponent from "../menu/MenuComponent";

const LeftNav = () => {
  return (
    <Stack direction="row" spacing={2}>
      <MenuComponent labelValue="Author" />
      <MenuComponent labelValue="Label" />
      <MenuComponent labelValue="Projects" />
      <Stack direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
        <MenuComponent labelValue="Milestones" />
        <MenuComponent labelValue="Assignee" />
      </Stack>
      <MenuComponent labelValue="Sort" />
    </Stack>
  );
};

export default LeftNav;
