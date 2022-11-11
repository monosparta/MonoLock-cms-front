import React from "react";

import { Box, Grid } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useTranslation } from "react-i18next";

const LockStatus = () => {
  const { t } = useTranslation();
  const statusList = [
    {
      icon: (
        <LockOpenIcon
          sx={{
            color: "#363F4E",
            height: "16px",
            width: "16px",
          }}
        ></LockOpenIcon>
      ),
      text: t("unlocked"),
    },
    {
      icon: (
        <LockIcon
          sx={{
            color: "#363F4E",
            height: "16px",
            width: "16px",
          }}
        ></LockIcon>
      ),
      text: t("locked"),
    },
    {
      icon: (
        <CircleIcon
          sx={{
            color: "#363F4E",
            height: "16px",
            width: "16px",
          }}
        ></CircleIcon>
      ),
      text: t("using"),
    },
    {
      icon: (
        <CircleIcon
          sx={{
            color: "#FFFFFF",
            borderRadius: "50%",
            height: "13.33px",
            width: "13.33px",
            margin: "1px",
            boxSizing: "border-box",
            border: "1px solid #000",
          }}
        ></CircleIcon>
      ),
      text: t("canUse"),
    },
    {
      icon: (
        <CircleIcon
          sx={{
            color: "#FF5A5A",
            height: "16px",
            width: "16px",
          }}
        ></CircleIcon>
      ),
      text: t("error"),
    },
  ];

  return (
    <Box
      sx={{
        borderRadius: "10px",
        borderColor: "#000000",
        border: "1px solid ",
        padding: "10px 16px",
      }}
    >
      <Grid
        container
        gap={1}
        direction={{ xs: "column", sm: "row", md: "column" }}
        wrap="nowrap"
        className="lockStatusGrid"
      >
        {statusList.map((status) => {
          return (
            <Grid container gap={1} direction="row" wrap="nowrap">
              {status.icon}
              <span style={{ whiteSpace: "nowrap" }}>{status.text}</span>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default LockStatus;