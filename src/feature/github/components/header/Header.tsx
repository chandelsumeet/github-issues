import React from "react";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import UsbOutlinedIcon from "@mui/icons-material/UsbOutlined";
import { Stack, Box, Chip, Grid } from "@mui/material";
import Nav from "./Nav";
const Header = () => {
  return (
    <header>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Stack direction="row" spacing={1} alignItems="center">
            <CardMembershipOutlinedIcon />
            <Box sx={{ fontSize: "30px" }} className="header-link">
              <a href="">facebook</a>
              <span className="separator">/</span>
              <a href="">react</a>
            </Box>
            <Chip size="small" label="public" variant="outlined" />
          </Stack>
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "block" } }}>
          <Stack direction="row" spacing={1}>
            <Chip
              size="small"
              icon={<NotificationsNoneOutlinedIcon />}
              label="Notifications"
              variant="outlined"
            />
            <Chip
              size="small"
              icon={<StarBorderOutlinedIcon />}
              label="Star"
              variant="outlined"
            />
            <Chip
              size="small"
              icon={<UsbOutlinedIcon />}
              label="Fork"
              variant="outlined"
            />
            <Chip size="small" label="35.3k" variant="outlined" />
          </Stack>
        </Grid>
      </Grid>
      <Nav />
    </header>
  );
};

export default Header;
