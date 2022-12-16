import React from "react";
import {
  TableCell,
  Stack,
  TableRow,
  Box,
  Grid,
  Typography,
  Avatar,
} from "@mui/material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { calculateCreatedTime } from "../../util/calculateCreateTime";
import ChipComponent from "../chip/ChipComponent";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { IGithubData } from "../../types/Github";

const TableRowComponent = ({ data }: { data: IGithubData }) => {
  const { title, comments, url, number, created_at, labels } = data;
  const { login, avatar_url } = data?.user;
  return (
    <TableRow hover>
      <TableCell component="th" scope="row">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <Box>
              <AdjustIcon className="open-action" />
            </Box>
            <Stack direction="column">
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Typography>
                  <a href={url}>{title}</a>
                </Typography>
                <Box>
                  <ChipComponent labels={labels} />
                </Box>
              </Stack>
              <Box>
                <Typography>
                  #{number} opened on {calculateCreatedTime(created_at)} by{" "}
                  {login}
                </Typography>
              </Box>
            </Stack>
          </Stack>
          {comments > 0 && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ display: { md: "flex", xs: "none" } }}
            >
              <ChatBubbleOutlineIcon />
              <Typography>{comments}</Typography>
            </Stack>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
