import { Grid, Stack } from "@mui/material";
import { TableCell, TableRow, Box } from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import MenuComponent from "../menu/MenuComponent";
import LeftNav from "../leftNav/LeftNav";
const TableToolbar = () => {
  return (
    <TableRow sx={{ background: "#f6f8fa" }}>
      <TableCell>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item sx={{ display: { lg: "block", xs: "none" } }}>
            <Stack direction="row" alignItems="center" spacing={3}>
              <Stack direction="row" spacing="1">
                <AdjustIcon />
                <Box sx={{ marginLeft: "10px !important" }}>
                  <Typography>883 Open</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                <CheckIcon />
                <Typography component="span">11,052 Closed</Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid item>
            <LeftNav />
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
};

export default TableToolbar;
