import React, { useEffect } from "react";
import { lockStatus, lockStatusNoLoading, selectLock } from "../redux/lockSlice";
import { useDispatch, useSelector } from "react-redux";

import "./Lock.css";
import LockContent from "../components/LockContent";
import LockStatus from "../components/LockStatus";
import { useTranslation } from "react-i18next";

import { Box, Paper, Grid } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

const Luck = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { lockList } = useSelector(selectLock);
  const handleClickRefresh = () => {
    dispatch(lockStatus());
  };

  useEffect(() => {
    if (lockList.length === 0) dispatch(lockStatus());
    let refresh = setInterval(() => {
      dispatch(lockStatusNoLoading());
    }, 3000);
    return () => clearInterval(refresh);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="Lock">
      <div className="lockHeader">
        {t("lockerCurrentStatus")}
        <RefreshIcon sx={{ cursor: "pointer" }} onClick={handleClickRefresh} />
      </div>
      <Grid
        container
        direction={{ xs: "column", lg: "row" }}
        wrap="nowrap"
        justifyContent="center"
        gap={4}
        alignItems={{ xs: "center", lg: "flex-end" }}
        padding={{ xs: 2, sm: 1 }}
      >
        <div className="lockStatusDisable">
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              flexWrap: "wrap",
              "& > :not(style)": {
                width: 128,
                height: 176,
                borderRadius: "10%",
                borderColor: "#000000",
                border: "1px solid ",
              },
            }}
          >
            <Paper className="lockStatusPaper" elevation={0}></Paper>
          </Box>
        </div>
        <LockContent />
        <LockStatus />
      </Grid>
    </div>
  );
};

export default Luck;
