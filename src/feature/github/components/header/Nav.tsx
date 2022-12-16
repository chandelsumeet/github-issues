import { Box, Grid, Chip, Stack, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import AdjustIcon from "@mui/icons-material/Adjust";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import PrivacyTipOutlinedIcon from "@mui/icons-material/PrivacyTipOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import ContextNav from "./ContextNav";
const Nav = () => {
  return (
    <Stack
      direction="row"
      spacing={3}
      mt={3}
      className="nav"
      alignItems="center"
      flexWrap="wrap"
    >
      <Stack direction="row" spacing={1}>
        <CodeIcon />
        <Typography component="span">Code</Typography>
      </Stack>
      <Stack direction="row" spacing={1} className="active">
        <AdjustIcon />
        <Typography>Issues</Typography>
        <Chip size="small" label="884" />
      </Stack>
      <Stack direction="row" spacing={1} className="display-md">
        <AdjustIcon />
        <Typography>Pull requests</Typography>
        <Chip size="small" label="244" />
      </Stack>
      <Stack direction="row" spacing={1} className="display-md">
        <PlayCircleOutlineOutlinedIcon />
        <Typography component="span">Action</Typography>
      </Stack>
      <Stack direction="row" spacing={1} className="display-md">
        <AccountTreeOutlinedIcon />
        <Typography component="span">Projects</Typography>
      </Stack>
      <Stack direction="row" spacing={1} className="display-md">
        <ImportContactsOutlinedIcon />
        <Typography component="span">Wiki</Typography>
      </Stack>
      <Stack direction="row" spacing={1} className="display-md">
        <PrivacyTipOutlinedIcon />
        <Typography component="span">Security</Typography>
      </Stack>
      <Stack direction="row" spacing={1} className="display-md">
        <QueryStatsOutlinedIcon />
        <Typography component="span">Insights</Typography>
      </Stack>
      <Stack className="context-container" sx={{ display: "none" }}>
        <ContextNav />
      </Stack>
    </Stack>
  );
};

export default Nav;
