import React from "react";
import {
  TableCell,
  Stack,
  TableRow,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { calculateCreatedTime } from "../../util/calculateCreateTime";
import ChipComponent from "../chip/ChipComponent";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
const TableRowComponent = ({ data }: any) => {
  const { title, comments, url, number, created_at, labels } = data;
  const { login } = data?.user;
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Box>
          <Grid container justifyContent="space-between">
            <Grid item>
              <AdjustIcon />
            </Grid>
            <Grid item ml={1}>
              <Stack direction="row" spacing={2}>
                <Typography>
                  <a href={url}>{title}</a>
                </Typography>
                <ChipComponent labels={labels} />
              </Stack>
              <Typography>
                #{number} opened on {calculateCreatedTime(created_at)} by{" "}
                {login}
              </Typography>
            </Grid>
            {comments > 0 && (
              <Grid item alignItems="center">
                <Stack direction="row" spacing={0.5}>
                  <ChatBubbleOutlineIcon />
                  <Typography>{comments}</Typography>
                </Stack>
              </Grid>
            )}
          </Grid>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
