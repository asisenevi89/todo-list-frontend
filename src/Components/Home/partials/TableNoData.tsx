import React, { memo } from "react";
import { 
  TableRow, 
  TableCell,
  Stack,
  Alert,
  Typography
} from "@mui/material";

const TableNoData = () => {
  return (
    <TableRow className="table-no-data">
        <TableCell colSpan={4}>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity="info" className="alert-message">
                  <Typography variant="h4">No Data !</Typography>
                  <Typography>
                    No Todo record found. Refine your search or add new todo item.
                  </Typography>
                </Alert>
            </Stack>
        </TableCell>
    </TableRow>
  );
};

export default memo(TableNoData);
