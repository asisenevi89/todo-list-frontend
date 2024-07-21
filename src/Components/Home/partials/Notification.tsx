import React, { ReactNode, memo, useEffect, useState } from "react";
import { 
  Stack,
  Typography
} from "@mui/material";
import Alert, { AlertProps } from "@mui/material/Alert";
import Snackbar, { SnackbarProps} from "@mui/material/Snackbar";

const duration = 5000;

type NotificationType = {
  message: ReactNode,
  lastMessageTime: number,
  alertProps?: AlertProps,
  snackBarProps?: SnackbarProps,
};

const defaultAlertProps: AlertProps = {
  severity: 'info',
};

const defaultSnackBarProps: SnackbarProps = {
  autoHideDuration: duration,
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
};

const Notification = ({
  message,
  lastMessageTime,
  alertProps,
  snackBarProps,
}: NotificationType) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!lastMessageTime) return;

    setOpen(true);
  }, [lastMessageTime]);


  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false)
      }, duration);
    }   
  }, [open]);

  return (
    <Stack spacing={2} className="notification-wrapper">
      <Snackbar open={open} {...defaultSnackBarProps} {...snackBarProps}>
        <Alert {...defaultAlertProps} {...alertProps}>
          <Typography className="message">{message}</Typography>
        </Alert>
      </Snackbar>
  </Stack>
  );
};

export default memo(Notification);
