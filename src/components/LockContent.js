import React from "react";
import { selectLock } from "../redux/lockSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Lock from "./Lock";
import _ from "lodash";

import { Box, Skeleton, Tooltip, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import { useTranslation } from "react-i18next";

const LockContent = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { lockIsFetching, lockList } = useSelector(selectLock);

  const handleClick = (lockerNum) => {
    // console.log('===test handleClick===', lockerNum)
    if (lockerNum)
      navigate("/Info?No=" + lockerNum, {
        state: lockerNum,
      });
  };

  const handleClickStop = (e) => {
    e.preventDefault();
  };

  let loadingArray = new Array(42);

  const lockerColor = {
    noLocker: {
      background: "#FFF",
      foreground: "#FFF",
      border: "1px dashed #363F4E"
    },
    error: {
      background: "#FF5A5A",
      foreground: "#FFF",
      border: "1px solid #FF5A5A"
    },
    empty: {
      background: "#FFF",
      foreground: "#000",
      border: "1px solid #363F4E"
    },
    inUse: {
      background: "#363F4E",
      foreground: "#FFF",
      border: "1px solid #363F4E"
    }
  }

  const iconStyle = {
    position: "absolute",
    top: { xs: "4px", sm: "8px" },
    right: { xs: "2px", sm: "5px" },
    height: { xs: "10px", sm: "16px" },
    width: { xs: "10px", sm: "16px" },
  };

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7, auto)" }}>
      {lockIsFetching
        ? _.map(loadingArray, (_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{
              width: "12vw",
              height: "12vw",
              minWidth: "30px",
              minHeight: "30px",
              maxWidth: "120px",
              maxHeight: "120px",
              borderRadius: "12%",
              padding: "1px",
              margin: { xs: "2px", sm: "3px", md: "4px", lg: "5px" },
            }}
          />
        ))
        : _.map(lockList, (item) => {
          let status = "empty";
          if (item.error === 1) {
            status = "error";
          } else if (item.lockerNo === null) {
            status = "noLocker";
          } else if (item.user !== null) {
            status = "inUse";
          } 
          return (
            <Lock
              key={item.id}
              onClickCapture={
                item.lockerNo !== null
                  ? () => handleClick(item.lockerNo)
                  : () => handleClickStop
              }
              sx={{
                cursor: item.lockerNo !== null ? "pointer" : "",
                position: "relative",
                background: lockerColor[status].background,
                color: lockerColor[status].foreground,
                border: lockerColor[status].border,
              }}
            >
              <Typography fontFamily="Mulish" fontWeight="bold" fontSize={{ xs: "h6.fontSize", md: "h5.fontSize" }}>{item.lockerNo}</Typography>
              <Typography fontFamily="Mulish" sx={{ display: { xs: "none", sm: "block" } }} fontSize={{ xs: "6px", md: "12px" }} >{item.lockerEncoding}</Typography>
              <Typography fontFamily="Mulish" sx={{ display: { xs: "none", sm: "block" } }} fontWeight="bold">{item.user?.name || ''}</Typography>
              <Typography fontFamily="Mulish" sx={{ display: { xs: "none", sm: "block" } }} fontSize={{ xs: "6px", md: "12px" }}>{item.user?.cardId || ''}</Typography>
              {item.user !== null && item.lockerNo !== null
                ? <Tooltip title={(item.lockUp === 1) ? t("locked") : t("unlocked")} placement="top">
                  {
                    item.lockUp === 1
                      ? <LockIcon sx={iconStyle} />
                      : <LockOpenIcon sx={iconStyle} />
                  }
                </Tooltip>
                : ""}
            </Lock>
          );
        })}
    </Box>
  );
};

export default LockContent;
